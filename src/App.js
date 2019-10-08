import React from "react";
import "./App.css";
import { Container } from "semantic-ui-react";
import { BrowserRouter, Route } from "react-router-dom";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { split } from "apollo-link";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import ElectionsList from "./components/elections/electionsList";
import NavHeader from "./layout/navHeader";
import SubcategoriesList from "./components/subcategory/subcategoriesList";
import SubcategoriesView from "./components/subcategory/subcategoriesView";
import Login from "./components/auth/login";
import Logout from "./components/auth/logout";

// Create an http link:
const httpLink = new HttpLink({
  uri: "http://localhost:2000/graphql",
  credentials: "include"
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:2000/graphql",
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <BrowserRouter>
        <NavHeader />
        <Container>
          <Route path="/" exact component={ElectionsList} />
          <Route
            path="/subcategories/:electionId"
            component={SubcategoriesList}
          />
          <Route
            path="/subcategory/:subcategoryId"
            component={SubcategoriesView}
          />
          <Route path="/login/" component={Login} />
          <Route path="/logout/" component={Logout} />
        </Container>
      </BrowserRouter>
    </div>
  </ApolloProvider>
);

export default App;
