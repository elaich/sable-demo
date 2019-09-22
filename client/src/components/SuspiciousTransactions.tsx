import * as React from 'react';
import {useQuery} from '@apollo/react-hooks';
import { Transaction } from './Transaction';
import { TransactionModel } from '../models/Transaction';
import { GET_SUSPICIOUS } from '../queries/getSuspicious'

interface SuspiciousTransactionsData {
  getSuspiciousTransactions: TransactionModel[];
}

export const SuspiciousTransactions: React.FC = () => {
  const {loading, error, data} = useQuery<SuspiciousTransactionsData>(
    GET_SUSPICIOUS,
  );

  if (loading) return <>'Loading...'</>;
  if (error) return <>`Error! ${error.message}`</>;

  return (
    <>
      <h1>Suspicious transactions</h1>
      {data &&
        data.getSuspiciousTransactions.map(transaction => (
          <Transaction transaction={transaction} />
        ))}
    </>
  );
};
