import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ViewBlog() {
    const { currentBlog } = useSelector((state) => state.blog);
    

    if (!currentBlog) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#f5f7fa" }}>
            <div>
                <Link to="/home"  style={{ position: 'absolute', top: '20px', left: '20px' }} className="btn btn-primary   backbutton">Go Back</Link>
            </div>
            <div className="card1" style={{ width: '40rem', padding: '20px', borderRadius: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)',backgroundColor:'white',position:'relative'}}>
                <h5>Image</h5>
                <br/>
                {currentBlog.image && <img className="card-img-top" src={currentBlog.image} alt="Card image cap" />}
                <hr class='w-100 border border-primary border-1'/>
                <div className="card-body">
                    <h5>Title:</h5>
                    <p className="card-title">{currentBlog.title}</p>
                <hr class='w-100 border border-primary border-1'/>

                    <p className="card-text">
                        <h5>Description:</h5>
                        <div
                            dangerouslySetInnerHTML={{ __html: currentBlog.description }}
                            className="blog-description"
                        />
                <hr class='w-100 border border-primary border-1'/>

                    </p>
                </div>
            </div>
        </div>
    );
};
