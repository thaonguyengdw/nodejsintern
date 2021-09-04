import React, { useState, useEffect } from "react";

import { BASE_URL } from "./utils/utils";
import SearchBar from "./components/SearchBar";
import ListUser from "./components/ListUser";
import Loading from "./components/Loading";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsersByKeyword();
  }, []);

  const getUsersByKeyword = (keyword = "") => {
    // Call API
    setLoading(true);
    fetch(`${BASE_URL}/users/${keyword}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  return (
    <div className="App container-fluid">
      <div className="container mt-5">
        {/* Search Bar */}
        <SearchBar getUsers={(keyword) => getUsersByKeyword(keyword)} />

        {/* Loading */}
        {loading && <Loading />}

        {/* List User */}
        {!loading && users.length > 0 && (
          <ListUser
            users={users}
            onSetUsers={(updatedUsers) => setUsers(updatedUsers)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
