import React, { useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const SearchBar = ({ getUsers }) => {
  const [keyword, setKeyword] = useState("");

  const searchUserHanlder = () => {
    getUsers(keyword);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter username or email"
        onChange={(event) => setKeyword(event.target.value)}
      />
      <InputGroup.Text onClick={searchUserHanlder}>Search</InputGroup.Text>
    </InputGroup>
  );
};

export default SearchBar;
