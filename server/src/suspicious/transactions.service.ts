import { Injectable } from '@nestjs/common';
import { Transaction } from './models/transaction';

@Injectable()
export class TransactionsService {

  findSuspicious(): Transaction[] {
    return [];
  }
}
