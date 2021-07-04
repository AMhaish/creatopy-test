import gql from "graphql-tag";

export const GET_ITEMS_QUERY = gql`
  query {
    items {
      id
      title
    }
  }
`;