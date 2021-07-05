import React, { useState } from "react";

const NewThreadForm = ({ handleSubmitForm }) => {
  const [threadTitle, setTitle] = useState("");
  const [threadBody, setBody] = useState("");

  return (
    <div className="newThreadForm">
      <div className="header">
        <span className="title">Neuen Thread hinzufügen</span>
      </div>

      <form
        className="body"
        onSubmit={(e) => {
          handleSubmitForm(e, threadTitle, threadBody);
          setTitle("");
          setBody("");
        }}
      >
        <label>Thread-Titel</label>
        <input
          type="text"
          required
          value={threadTitle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <label>
          <span>Thread-Inhalt</span>
        </label>
        <textarea
          required
          rows="10"
          value={threadBody}
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
