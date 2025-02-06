import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem } from "../../redux/blogSlice/blogSlice";
import { db } from "../../firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';
function AddBlogForm({ editingBlog, setEditingBlog }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const editMode = Boolean(editingBlog);


  useEffect(() => {
    if (editingBlog) {
      setForm({
        title: editingBlog.title,
        description: editingBlog.description,
        image: editingBlog.image || "",
      });
      setUploadedImage(editingBlog.image || null);
    }
  }, [editingBlog]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Update existing blog
        const blogRef = doc(db, "blogs", editingBlog.id);
        await updateDoc(blogRef, form);
        dispatch(updateItem({ id: editingBlog.id, ...form }));
        setEditingBlog(null);
      } else {
        // Add new blog
        const docRef = await addDoc(collection(db, "blogs"), form);
        dispatch(addItem({ id: docRef.id, ...form }));
      }

      // Reset form
      setForm({ title: "", description: "", image: "" });
      setUploadedImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="p-1 h-100" style={{ backgroundImage: "url(https://pub-static.fotor.com/assets/bg/bf9a415f-b758-4c0d-a820-334370772ec3.jpg)" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-9">
            <div className="card p-5" style={{ borderRadius: '15px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Blog Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    type="text"
                    placeholder="Blog Title"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Blog Description</label>
                  <EditorProvider>
                    <Editor value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}>
                      <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnUnderline />
                        <BtnStrikeThrough />
                        <BtnBulletList/>
                        <BtnClearFormatting/>
                        <BtnStyles/>
                        <BtnUndo/>
                        <BtnNumberedList/>
                      </Toolbar>
                    </Editor>
                  </EditorProvider>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  {uploadedImage && (
                    <div className="mt-3">
                      <img src={uploadedImage} alt="Uploaded Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  {editMode ? "Update Blog" : "Submit"}
                </button>
                {editMode && (
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingBlog(null)}>
                    Cancel Edit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddBlogForm;
