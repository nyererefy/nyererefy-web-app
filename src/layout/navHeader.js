import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AVATAR, IS_LOGGED_IN, NAME, STUDENT_DATA } from "../utils/consts";

function NavHeader() {
  let studentData =
    localStorage.getItem(STUDENT_DATA) ||
    JSON.stringify({
      [IS_LOGGED_IN]: false,
      [NAME]: "",
      [AVATAR]: ""
    });

  studentData = JSON.parse(studentData);

  return (
    <Segment>
      <Menu secondary>
        <Menu.Item as={Link} to="/" name="home" />
        {studentData[IS_LOGGED_IN] && (
          <Menu.Item
            as={Link}
            to="/profile"
            position="right"
            name={studentData[NAME]}
          />
        )}

        {studentData[IS_LOGGED_IN] && (
          <Menu.Item as={Link} to="/logout" position="right" name="logout" />
        )}

        {!studentData[IS_LOGGED_IN] && (
          <Menu.Item as={Link} to="/login" position="right" name="login" />
        )}
      </Menu>
    </Segment>
  );
}

export default NavHeader;
