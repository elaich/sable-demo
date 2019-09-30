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
    const filtered = transactions.filter((transaction: Transaction) => transaction.state !== TransactionState.Suspicious);

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i].from === id) {
        filtered[i].state = TransactionState.Suspicious;
        return this.blockFrom(filtered, transactions[i].to);
      }
    }
    
    return filtered;
  }

  blockSuspicious(): void {
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
