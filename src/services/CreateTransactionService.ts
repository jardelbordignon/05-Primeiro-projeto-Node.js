import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface RequestDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}

class CreateTransactionService {
  private repository: TransactionsRepository;

  constructor(repository: TransactionsRepository) {
    this.repository = repository
  }

  public execute( { title, value, type }:RequestDTO ): Transaction {
    if(!['income', 'outcome'].includes(type))
      throw new Error('Tipo de transação inválido')

    const { total } = this.repository.getBalance()

    if(type === 'outcome' && value > total)
      throw new Error('Saldo insuficiente')

    const transaction = this.repository.create({ title, value, type })
    return transaction
  }
}

export default CreateTransactionService
