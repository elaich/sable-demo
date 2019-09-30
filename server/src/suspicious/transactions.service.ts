import { Injectable } from '@nestjs/common';
import { Transaction, TransactionState } from './models/transaction';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [
    {
      id: '1',
      from: 'a3ad',
      to: 'h4n2',
      amount: 309,
      state: TransactionState.Suspicious,
      createdAt: new Date('2019-08-06'),
    },
    {
      id: '2',
      from: 'h7s9',
      to: 'ys3m',
      state: TransactionState.Suspicious,
      amount: 30,
      createdAt: new Date('2019-06-06'),
    },
    {
      id: '3',
      from: 'ju87',
      to: 'hd63',
      state: TransactionState.Suspicious,
      amount: 139,
      createdAt: new Date('2019-12-06'),
    },
    {
      id: '4',
      from: 'hod2',
      to: '6dk3',
      state: TransactionState.Suspicious,
      amount: 200,
      createdAt: new Date('2019-11-06'),
    },
    {
      id: '5',
      from: '8dk2',
      to: 'lk82',
      state: TransactionState.Suspicious,
      amount: 90,
      createdAt: new Date('2019-10-06'),
    },
  ];

  findSuspicious(): Transaction[] {
    return this.transactions.filter(
      transaction => transaction.state === TransactionState.Suspicious,
    ).sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
  }

  blockFrom(transactions: Transaction[], id: string): Transaction[] {
    console.log("Block from: ", id);
    const children = [];

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].from === id && transactions[i].state !== TransactionState.Suspicious) {
        transactions[i].state = TransactionState.Suspicious;
        children.push(transactions[i].to);
      }
    }

    children.forEach(child => {
      // Block only if there is a non suspicious transaction from a child.
      if (transactions.filter(t => t.from === child && t.state !== TransactionState.Suspicious).length > 0)
        this.blockFrom(transactions, child)
    });

    return transactions;
  }

  updateSuspiciousTransactionState(
    id: string,
    state: TransactionState,
  ): Transaction {
    this.transactions = this.transactions.map(transaction =>
      transaction.id === id ? { ...transaction, state } : transaction,
    );
    return this.transactions.find(transaction => transaction.id === id);
  }
}
