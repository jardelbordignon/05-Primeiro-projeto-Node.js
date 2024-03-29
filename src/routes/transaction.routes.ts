import { Router } from 'express'

import TransactionsRepository from '../repositories/TransactionsRepository'
import CreateTransactionService from '../services/CreateTransactionService'

const transactionRouter = Router()

const repository = new TransactionsRepository()

transactionRouter.get('/', (req, res) => {
  try {
    const transactions = repository.all()
    const balance = repository.getBalance()
    return res.json({transactions, balance})
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

transactionRouter.post('/', (req, res) => {
  try {
    const { title, value, type } = req.body

    const createTransaction = new CreateTransactionService(repository)

    const transaction = createTransaction.execute({ title, value, type }) 

    return res.json(transaction)

  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
})

export default transactionRouter
