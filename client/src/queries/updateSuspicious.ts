import gql from 'graphql-tag';

export const UPDATE_SUSPICIOUS = gql`
  mutation UpdateSuspiciousTransaction($input: UpdateTransactionInput!) {
    updateSuspiciousTransaction(input: $input) {
      id
      from
      to
      amount
      state
    }
  }
`;

