import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BodyPosts from "../BodyPosts/BodyPosts";
import './Posts.css'

export default function Posts({ cardId }) {
  const [posts, setPosts] = useState(() => {
    const data = localStorage.getItem("Posts");
    if (data) {
      try {
        return JSON.parse(data)[cardId] || [];
      } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
      }
    }
    return [];
  });
  const [postName, setPostName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const savePostsToLocalStorage = (updatedPosts) => {
    localStorage.setItem("Posts", JSON.stringify({ ...posts, [cardId]: updatedPosts }));
  };

  const handleAddPost = (e) => {
    if (!postName) {
      Swal.fire("Input is Required!");
      return;
    }

    if (postName.length > 20) {
      Swal.fire("Length of name cannot be more than 20 characters");
      return;
    }

    const newPost = { id: Date.now(), postName };

    if (editIndex !== null) {
      const updatedPost = posts.map((pst, index) =>
        index === editIndex ? newPost : pst
      );
      setPosts(updatedPost);
      setEditIndex(null);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Post has been updated",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      setPosts([...posts, newPost]);
    }

    setPostName("");
  };

  useEffect(() => {
    savePostsToLocalStorage(posts);
  }, [posts]);

  const updatePost = (index) => {
    const postToUpdate = posts[index];
    setPostName(postToUpdate.postName);
    setEditIndex(index);
  };

  function DeletePost(idx) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedPost = posts.filter((_, index) => index !== idx);
        setPosts(updatedPost);

        Swal.fire({
          title: "Deleted!",
          text: "Your Post has been deleted.",
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <input
        value={postName}
        onChange={(e) => setPostName(e.target.value)}
        type="text"
        placeholder="Enter Your post"
        className="form-control my-2"
      />
      <button onClick={handleAddPost} className="btn btn-primary">
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <div className="containerPst">
      <BodyPosts
        posts={posts}
        DeletePost={DeletePost}
        updatePost={updatePost}
      />
      </div>
    </>
  );
}
