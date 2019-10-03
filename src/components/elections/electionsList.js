import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Query } from "react-apollo";
import { ElectionItem } from "./electionItem";
import { ProgressBar } from "../../layout/progressBar";
import ErrorMessage from "../../layout/errorMessage";
import { ELECTIONS_QUERY } from "../../utils/quaries";

const ElectionsList = () => (
  <Query query={ELECTIONS_QUERY}>
    {({ loading, data, error }) => {
      if (loading) return <ProgressBar />;
      if (error) return <ErrorMessage message={error.message} />;

      const { elections } = data;

      return (
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              {elections ? (
                <List divided verticalAlign="middle" size="huge">
                  {elections.map(e => (
                    <ElectionItem election={e} />
                  ))}
                </List>
              ) : (
                <div>
                  <h2>No elections found</h2>
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }}
  </Query>
);

export default ElectionsList;
