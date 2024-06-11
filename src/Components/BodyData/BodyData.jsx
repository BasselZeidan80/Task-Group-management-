import React, { useState } from "react";
import "./BodyData.css";
import Swal from "sweetalert2";
import Posts from "../Posts/Posts";
export default function BodyData({ Forms, DeleteForm, updateForm }) {
  return (
    <>
      <div className="container">
        <div className="cards">
          {Forms.map((form, index) => (
            <div key={index} className="card" style={{ width: "18rem" }}>
              <p className="card-date"> {form.date}</p>
              <div className="card-body">
                <h5 className="card-title">{form.name} </h5>
                <p className="card-text">{form.Description}</p>
                <button
                  onClick={() => updateForm(index)}
                  className="btn btn-outline-warning"
                >
                  Edit
                </button>
                <button
                  onClick={() => DeleteForm(index)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
                <hr />
                <Posts />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
