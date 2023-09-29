import React from "react";
import { useState } from "react";

const Search = ({ search }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    search(input);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);

    if (!e.target.value.trim()) {
      search(""); // Pass an empty string to trigger a reset
    }
  };

  return (
    <div className="mb-4"> {/* Added margin-bottom for better spacing */}
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <input
            className="form-control mr-2"
            type="text"
            name="Pokemon"
            placeholder="Search Pokemon..."
            onChange={handleInputChange}
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