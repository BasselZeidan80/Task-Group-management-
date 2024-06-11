import React from 'react';
import './BodyBosts.css'
export default function BodyPosts({ posts, DeletePost, updatePost }) {
  return (
    <>
      {posts.map((post, idx) => (
        <div key={idx} className="w-100  PostContainer">
          <p>{post.postName}</p>
          <button onClick={() => updatePost(idx)} className="btn btn-warning">
          <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button onClick={() => DeletePost(idx)} className="btn btn-danger">
          <i  className="fa-solid fa-trash deleIcon"></i>
          </button>
        </div>
      ))}
    </>
  );
}
