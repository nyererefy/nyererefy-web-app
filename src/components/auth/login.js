import React, { useState } from "react";
import { Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import GoogleLogin from "react-google-login";
import { LOGIN } from "../../utils/mutations";
import { AVATAR, IS_LOGGED_IN, NAME, STUDENT_DATA } from "../../utils/consts";
import ErrorMessage from "../../layout/errorMessage";
import { Redirect } from "react-router-dom";

function Login() {
  const [err, setError] = useState(null);

  return (
    <Mutation mutation={LOGIN}>
      {(mutate, { loading, error, data }) => {
        if (error) return <ErrorMessage message={error.message} />;

        if (data) {
          const studentData = {
            [IS_LOGGED_IN]: true,
            [NAME]: data.login.name,
            [AVATAR]: data.login.avatar
          };

          localStorage.setItem(STUDENT_DATA, JSON.stringify(studentData));
          return <Redirect to="/" />;
        }

        return (
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" color="teal" textAlign="center">
                <Image src="/logo192.png" /> Log-in to your account
              </Header>
              <Form loading={loading}>
                <Segment stacked>
                  <GoogleLogin
                    clientId="888907700282-akq10n9hvdrft4e7pnsj3fqrs73ar9f1.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={obj => {
                      mutate({
                        variables: {
                          input: { token: obj.tokenId, strategy: "GOOGLE" }
                        }
                      });
                    }}
                    onFailure={e => setError(e)}
                    cookiePolicy={"single_host_origin"}
                  />
                </Segment>
              </Form>
              {err && <Message>{error}</Message>}
            </Grid.Column>
          </Grid>
        );
      }}
    </Mutation>
  );
}

export default Login;
