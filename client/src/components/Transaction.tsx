import * as React from 'react';
import {useMutation} from '@apollo/react-hooks';
import {TransactionModel} from '../models/Transaction';
import { UPDATE_SUSPICIOUS } from '../queries/updateSuspicious'
import Styles from './Transaction.module.css';

interface IProps {
  transaction: TransactionModel;
}

interface SuspiciousTransactionData {
  updateSuspiciousTransaction: TransactionModel;
}

export const Transaction: React.FC<IProps> = props => {
  const [updateSuspiciousTransaction] = useMutation<SuspiciousTransactionData>(
    UPDATE_SUSPICIOUS,
    {refetchQueries: ['getSuspiciousTransactions']},
  );

  const updateTransaction = (id: string, state: string) =>
    updateSuspiciousTransaction({
      variables: {input: {id, state}},
    });

  return (
    <div className={Styles.transaction}>
      <div>Transaction ID: {props.transaction.id}</div>
      <div>From User: {props.transaction.from}</div>
      <div>To User: {props.transaction.to}</div>
      <div>Amount: ${props.transaction.amount}</div>
      <div className={Styles['transaction-buttons']}>
        <button
          onClick={() => updateTransaction(props.transaction.id, 'Declined')}>
          Block
        </button>
        <button
          onClick={() => updateTransaction(props.transaction.id, 'Approved')}>
          Allow
        </button>
      </div>
    </div>
  );
};
