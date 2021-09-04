import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { UserModel } from "../models/UserModel";
import { BASE_URL, formatDateYYYYMMDD } from "../utils/utils";

const UserModal = ({ show, user, onClose, onSave }) => {
  const [updatedUser, setUpdatedUser] = useState(new UserModel());

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const updateUserHandler = () => {
    fetch(`${BASE_URL}/users/${updatedUser.id}`, {
      method: "POST",
      body: JSON.stringify({
        username: updatedUser.username,
        email: updatedUser.email,
        birthday: new Date(updatedUser.birthday).toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => onSave(data))
      .catch((err) => console.log(err));
  };

  const inputChangeHandler = (name, value) => {
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Username */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              value={updatedUser.username}
              onChange={(event) =>
                inputChangeHandler("username", event.target.value)
              }
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={updatedUser.email}
              onChange={(event) =>
                inputChangeHandler("email", event.target.value)
              }
            />
          </Form.Group>

          {/* Birthday */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              name="birthday"
              type="date"
              value={formatDateYYYYMMDD(updatedUser.birthday)}
              onChange={(event) =>
                inputChangeHandler("birthday", event.target.value)
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={updateUserHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
