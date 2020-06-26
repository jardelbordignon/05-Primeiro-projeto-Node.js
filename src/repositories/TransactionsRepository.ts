import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((accumulator: Balance, transation: Transaction) => {
      switch (transation.type) {
        case 'income':
          accumulator.income += transation.value
          break
        case 'outcome':
          accumulator.outcome += transation.value
          break
        default:
          break
      }
      accumulator.total = accumulator.income - accumulator.outcome
      return accumulator
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    return balance
  }

  public create({ title, value, type }:RequestDTO): Transaction {
    const transation = new Transaction({ title, value, type })

    this.transactions.push(transation)

    return transation
  }
}

export default TransactionsRepository;
