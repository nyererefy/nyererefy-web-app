import React from "react";
import { Query } from "react-apollo";
import { List } from "semantic-ui-react";
import { ProgressBar } from "../../layout/progressBar";
import ErrorMessage from "../../layout/errorMessage";
import SubcategoryItem from "./subcategoryItem";
import { SUBCATEGORIES_QUERY } from "../../utils/quaries";

function SubcategoriesList({ match }) {
  return (
    <Query
      query={SUBCATEGORIES_QUERY}
      variables={{ electionId: parseInt(match.params.electionId) }}
    >
      {({ loading, data, error }) => {
        if (loading) return <ProgressBar />;
        if (error) return <ErrorMessage message={error.message} />;

        return (
          <div>
            <List size="huge" celled>
              {data.subcategories.map(c => (
                <SubcategoryItem subcategory={c} />
              ))}
            </List>
          </div>
        );
      }}
    </Query>
  );
}

export default SubcategoriesList;
