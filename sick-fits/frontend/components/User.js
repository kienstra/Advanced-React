import { gql, useQuery } from '@apollo/client';

// On is because it could be of many types, so it only looks for User.
const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # Todo: query cart when have it
      }
    }
  }
`;

function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);

  return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY, useUser };
