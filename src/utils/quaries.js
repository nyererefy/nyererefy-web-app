import gql from "graphql-tag";

export const ELECTIONS_QUERY = gql`
  {
    elections {
      id
      title
    }
  }
`;

export const SUBCATEGORIES_QUERY = gql`
  query($electionId: Int!) {
    subcategories(electionId: $electionId) {
      id
      title
      suffix
    }
  }
`;

export const SUBCATEGORY_QUERY = gql`
  query($subcategoryId: Int!) {
    subcategory(id: $subcategoryId) {
      id
      title
      candidates {
        id
        avatar
        user {
          name
        }
      }
    }
  }
`;
