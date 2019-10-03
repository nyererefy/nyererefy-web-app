import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function NavHeader() {
  return (
    <Segment>
      <Menu secondary>
        <Menu.Item as={Link} to="/" name="home" />
        <Menu.Item as={Link} to="/logout" position="right" name="logout" />
      </Menu>
    </Segment>
  );
}

export default NavHeader;
