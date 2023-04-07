import React, { useState } from "react";
import classes from "./AddUser.module.css";

//Components
import Wrapper from "../Helper/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non empty values)",
      });
      return;
    }

    if (enteredAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (non empty values)",
      });
      return;
    }

    setEnteredUsername("");
    setEnteredAge("");
    props.onAddUser(enteredUsername, enteredAge);
  };

  const userChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label>Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={userChangeHandler}
          />
          <label>Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
