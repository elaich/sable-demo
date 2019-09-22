import { Injectable } from '@nestjs/common';
import { Transaction, TransactionState } from './models/transaction';

@Injectable()
export class TransactionsService {

  private readonly transactions: Transaction[] = [
    {
      id: '1',
      from: 'a3ad',
      to: 'h4n2',
      amount: 309,
      state: TransactionState.Suspicious,
    },
    {
      id: '2',
      from: 'h7s9',
      to: 'ys3m',
      state: TransactionState.Suspicious,
      amount: 30
    },
    {
      id: '3',
      from: 'ju87',
      to: 'hd63',
      state: TransactionState.Suspicious,
      amount: 139
    },
    {
      id: '4',
      from: 'hod2',
      to: '6dk3',
      state: TransactionState.Suspicious,
      amount: 200
    },
    {
      id: '5',
      from: '8dk2',
      to: 'lk82',
      state: TransactionState.Suspicious,
      amount: 90
    },
  ]

  findSuspicious(): Transaction[] {
    return this.transactions;
  }
}
