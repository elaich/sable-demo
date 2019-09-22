import gql from 'graphql-tag';

export const GET_SUSPICIOUS = gql`
  query getSuspiciousTransactions {
    getSuspiciousTransactions {
      id
      from
      to
      amount
      state
    }
  }
`;

