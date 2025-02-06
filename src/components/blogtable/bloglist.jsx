import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchBlogById } from "../../redux/blogSlice/blogSlice";
import { db } from "../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import AddBlogForm from "./addBlogfrom";
import { useNavigate } from "react-router-dom";
import { convert } from "html-to-text";

export default function Bloglist() {
  const dispatch = useDispatch();
  const { blogs, status, error, currentBlog } = useSelector((state) => state.blog);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewBlog, setViewBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

    const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
      dispatch(fetchBlogs());
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };

  
  const viewItem = (id) => {
    dispatch(fetchBlogById(id))
      .then((action) => {
        if (action.payload) {
          setViewBlog(action.payload);
        }
      })
      .then(() => navigate("/viewblog"))
      .catch((error) => console.error("Error fetching blog by ID: ", error));
  };

 
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div>
      <section className="intro">
        <div style={{ backgroundColor: "#f5f7fa" }}>
          <div className="mask d-flex align-items-center h-100">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <div className="table-responsive table-scroll" style={{ position: "relative", height: "700px" }}>
                        {status === "loading" && <p>Loading blogs...</p>}
                        {status === "failed" && <p>Error: {error}</p>}
                        {status === "succeeded" && (
                          <table className="table table-striped mb-0 table-hover table-bordered">
                            <thead style={{ backgroundColor: "#002d72", color: "white" }}>
                              <tr>
                                <th>Sr No</th>
                                <th>Blog Title</th>
                                <th>Blog Description</th>
                                <th>Image</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
  {currentBlogs.map((blog, index) => {
    const truncatedDescription =
      blog.description && blog.description.length > 100
        ? convert(blog.description, { wordwrap: false }).slice(0, 100) + "..."
        : convert(blog.description || "", { wordwrap: false });

    return (
      <tr key={blog.id}>
        <td>{index + 1 + (currentPage - 1) * blogsPerPage}</td>
        <td>{blog.title}</td>
        <td>
          <div
            dangerouslySetInnerHTML={{ __html: truncatedDescription }}
            className="blog-description"
          />
        </td>
        <td>
          {blog.image ? (
            <img src={blog.image} alt="Blog" style={{ width: "100px" }} />
          ) : (
            "No Image"
          )}
        </td>
        <td>
          <div className="d-flex align-items-center gap-2 justify-content-center h-100">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={() => viewItem(blog.id)}
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => deleteItem(blog.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-warning btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setEditingBlog(blog)}
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>

                          </table>
                        )}
                        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage - 1)}>
              Previous
            </a>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
              <a className="page-link" href="#" onClick={() => paginate(index + 1)}>
                {index + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <a className="page-link" href="#" onClick={() => paginate(currentPage + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </section>

     
      

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <AddBlogForm editingBlog={editingBlog} setEditingBlog={setEditingBlog} />
          </div>
        </div>
      </div>
    </div>
  );
}
