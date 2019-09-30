import {TransactionsService} from './transactions.service'
import { Transaction, TransactionState } from './models/transaction';

describe('Transaction Service', () => {
    it('blocks subsequent transations', () => {
    let transactionService: TransactionsService = new TransactionsService();

    const transactions: Transaction[] = [
        {
          "id": "1",
          "from": "A",
          "to": "B",
          "amount": 100,
          createdAt: new Date(),
          "state": TransactionState.Suspicious
        },
        // Suspicious
        {
          "id": "2",
          "from": "B",
          "to": "C",
          "amount": 80,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        {
          "id": "3",
          "from": "D",
          "to": "E",
          "amount": 900,
          createdAt: new Date(),
          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "4",
          "from": "A",
          "to": "E",
          "amount": 187,
          createdAt: new Date(),
          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "5",
          "from": "E",
          "to": "F",
          "amount": 98,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "6",
          "from": "G",
          "to": "G",
          "amount": 170,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "7",
          "from": "G",
          "to": "A",
          "amount": 100,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "8",
          "from": "A",
          "to": "B",
          "amount": 3400,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "9",
          "from": "F",
          "to": "G",
          "amount": 3400,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        {
          "id": "10",
          "from": "D",
          "to": "E",
          "amount": 3400,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "11",
          "from": "B",
          "to": "F",
          "amount": 3400,
          createdAt: new Date(),

          "state": TransactionState.None
        },
        // Suspicious
        {
          "id": "12",
          "from": "C",
          "to": "B",
          "amount": 3400,
          createdAt: new Date(),

          "state": TransactionState.None
        }
      ];


    
        const result = transactionService.blockFrom(transactions, "B");
        expect(result.filter(t => t.state === TransactionState.Suspicious).length).toEqual(10);
    })
})