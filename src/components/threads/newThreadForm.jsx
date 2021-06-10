import React, { useState } from "react";

const NewThreadForm = ({ handleSubmitForm }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentUser, setCurrentUser] = useState("Squidy1701");

  return (
    <div className="newThreadForm">
      <div className="header">
        <span className="title">Neuen Thread hinzufügen</span>
      </div>

      <form className="body"
        onSubmit={(e) => {
          handleSubmitForm(e, title, body, currentUser);
          setTitle("");
          setBody("");
        }}
      >
        <label>Titel</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* TODO: Should be Replaced with more advanced component to allow more than just simple text inputs */}
        <label>
          <span>Nachricht</span>
        </label>
        <textarea
          required
          rows="10"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>

        <button>Absenden</button>
      </form>
    </div>
  );
};

export default NewThreadForm;
