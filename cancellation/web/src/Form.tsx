import React, { useState } from "react";

import "./Form.css";

export interface FormProps {
  title: string;
  onSubmit: (id: string) => void;
  onStop: VoidFunction;
  message: string | null;
  idSuffix: string;
}

const Form: React.FC<FormProps> = ({
  title,
  onSubmit,
  onStop,
  message,
  idSuffix,
}) => {
  const [id, setId] = useState("");

  return (
    <main className="form-main">
      <h1>{title}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(id);
        }}
      >
        <div className="input-group">
          <label htmlFor={`resourceId-${idSuffix}`}>Enter some text</label>
          <input
            id={`resourceId-${idSuffix}`}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button type="submit">Do some really important stuff</button>
      </form>
      {message ? <p>{message}</p> : <p>No content yet!</p>}
      <button type="button" onClick={onStop}>
        Stop for some reason
      </button>
    </main>
  );
};

export default Form;
