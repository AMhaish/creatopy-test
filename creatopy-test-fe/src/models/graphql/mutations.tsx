import gql from "graphql-tag";

export const ADD_ITEM_MUTATION: any = gql`
mutation($title:String!){
    addItem(title: $title){
      id
      title
    }
  }
`;