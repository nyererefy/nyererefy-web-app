import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

function SubcategoryItem({ subcategory }) {
  return (
    <List.Item key={subcategory.id}>
      <List.Content>
        <List.Header as={Link} to={`/subcategory/${subcategory.id}`}>
          {subcategory.title}
        </List.Header>
        {subcategory.suffix}
      </List.Content>
    </List.Item>
  );
}

export default SubcategoryItem;
