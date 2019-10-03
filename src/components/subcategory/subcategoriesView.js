import React from "react";
import "./subcategoriesView.css";
import { Query } from "react-apollo";
import { Divider, Grid, Card } from "semantic-ui-react";
import { ProgressBar } from "../../layout/progressBar";
import ErrorMessage from "../../layout/errorMessage";
import { SUBCATEGORY_QUERY } from "../../utils/quaries";
import { CandidateItem } from "../candidate/candidateItem";

function SubcategoriesView(props) {
  const subcategoryId = parseInt(props.match.params.subcategoryId);

  return (
    <Query query={SUBCATEGORY_QUERY} variables={{ subcategoryId }}>
      {({ loading, data, error }) => {
        if (loading) return <ProgressBar />;
        if (error) return <ErrorMessage message={error.message} />;

        const { subcategory } = data;
        const { candidates } = subcategory;

        return (
          <div className="SubcategoriesView">
            <h2>{subcategory.title}</h2>
            <Divider />
            <Grid columns="equal">
              <Grid.Row>
                <Grid.Column>
                  {candidates !== [] ? (
                    <Card.Group>
                      {candidates.map(c => (
                        <CandidateItem candidate={c} />
                      ))}
                    </Card.Group>
                  ) : (
                    <h5>No Candidates</h5>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
}

export default SubcategoriesView;
