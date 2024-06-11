import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BodyData from "../BodyData/BodyData";

function getDataFromLs() {
  const data = localStorage.getItem("Forms");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

export default function Home() {
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
      posts: [],
    };

    if (editIndex !== null) {
      const updatedForms = Forms.map((frm, index) =>
        index === editIndex ? Forme : frm
      );
      setForms(updatedForms);
      setEditIndex(null);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your product has been updated",
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

  useEffect(() => {
    localStorage.setItem("Forms", JSON.stringify(Forms));
  }, [Forms]);

  //Update Form from local storage
  function updateForm(index) {
    const Form = Forms[index];
    console.log("======Form=====", Form);
    setName(Form.name);
    setDescription(Form.Description);
    const currentDate = new Date().toLocaleString();
    console.log("Current Date:", currentDate);

    setEditIndex(index);
    setIsEditing(true);
  }

  //Delete Form from local storage

  function DeleteForm(idx) {
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
        const UpdatedForm = Forms.filter((_, index) => index !== idx);

        setForms(UpdatedForm);
        console.log("UpdatedForm=======", UpdatedForm);

        // Reset the form fields and button status
        setName("");
        setDescription("");

        setEditIndex(null);
        setIsEditing(false);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  return (
    <>
      <>
        <div className="container mt-5 ">
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
          <hr />

          <div className="tableCst text-center ">
            <BodyData
              Forms={Forms}
              DeleteForm={DeleteForm}
              updateForm={updateForm}
            />

            {Forms.length < 1 && (
              <p className="text-center mt-5 alert alert-warning">
                No Forms are added yet
              </p>
            )}
          </div>
        </div>
      </>
    </>
  );
}
