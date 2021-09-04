import React, { useState } from "react";
import { Table } from "react-bootstrap";

import { formatDateYYYYMMDD } from "../utils/utils";
import { UserModel } from "../models/UserModel";
import UserModal from "./UserModal";

const ListUser = ({ users, onSetUsers }) => {
  const [modal, setModal] = useState({
    show: false,
    user: new UserModel(),
  });

  const openModalHandler = (user) => {
    setModal({ show: true, user: user });
  };

  const closeModalHandler = () => {
    setModal({ show: false, user: new UserModel() });
  };

  const updatedUserHandler = (updatedUser) => {
    const updatedUsers = [...users];
    const updatedUserIndex = updatedUsers.findIndex(
      (user) => user.id === updatedUser.id
    );
    if (updatedUserIndex < 0) return;
    updatedUsers[updatedUserIndex] = updatedUser;
    onSetUsers(updatedUsers);
    closeModalHandler();
  };

  return (
    <React.Fragment>
      <UserModal
        show={modal.show}
        user={modal.user}
        onClose={closeModalHandler}
        onSave={updatedUserHandler}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Birthday</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{formatDateYYYYMMDD(user.birthday)}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => openModalHandler(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default ListUser;
