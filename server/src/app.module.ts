import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransactionModule } from './suspicious/transactions.module'

@Module({
  imports: [
    TransactionModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})
export class AppModule {}
