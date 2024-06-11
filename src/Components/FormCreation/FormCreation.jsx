import React, { useState } from "react";
import Swal from "sweetalert2";
function getDataFromLs() {
  const data = localStorage.getItem("Forms");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}
export default function FormCreation() {
  const [Forms, setForms] = useState(getDataFromLs());

  const [name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddFrm = (e) => {
    e.preventDefault();

    //  To Check if any of the fields are empty
    if (!name || !Description) {
      Swal.fire("All inputs Are Required!");

      return;
    }

    if (name.length > 20) {
      Swal.fire("length of name cannot be more than 20 characters");
      return;
    }
    //to handle Date
    const currentDate = new Date().toLocaleString();
    //create obj
    let Forme = {
      name: name,
      Description: Description,
      date: currentDate,
    };
    console.log(Forme);
    if (editIndex !== null) {
      const updatedForms = Forms.map((frm, index) =>
        index === editIndex ? Forme : frm
      );
      setForms(updatedForms);
      setEditIndex(null);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your Form has been updated",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      // Add new Form
      setForms([...Forms, Forme]);
    }

    // Clear input fields
    setName("");
    setDescription("");
  };

  return (
    <>
      <form onSubmit={handleAddFrm}>
        <div className="row align-items-center justify-content-between ">
          <div className="col-md-3 w-25 col-lg-3">
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                placeholder="Enter Your Name"
                name="name"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-3 w-25 col-lg-3">
            <div className="form-group mb-3">
              <label htmlFor="Description">Description</label>
              <input
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="Description"
                placeholder="Enter Your Description"
                name="Description"
                className="form-control"
              />
            </div>
          </div>

          <div className="col-md-3 w-25 col-lg-3">
            <button className="AddBtn btn btn-outline-success w-50">
              {editIndex != null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
