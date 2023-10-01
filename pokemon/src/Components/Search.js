import React from "react";
import { useState } from "react";

const Search = ({ search }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    search(input);
    setInput('')
  };

  return (
    <div className="mb-4 d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            className="form-control mr-2"
            type="text"
            name="Pokemon"
            placeholder="Search Pokemon By Name.."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "1000px" }} 
          />
          <button
            className="btn btn-primary"
            type="submit"
            name="submit"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;