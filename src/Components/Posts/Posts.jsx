import React, { useState } from "react";

export default function Posts() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  const handleAddPost = (index) => {
    console.log("hii");
  };

  return (
    <>
      <input
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        type="text"
        placeholder="post"
        className="form-control my-2"
      />
      <button onClick={handleAddPost} className="btn btn-primary">
        Add
      </button>
      <div id="tst" className="w-100 cont">
        post1
      </div>
    </>
  );
}
