import React from 'react'
import AV from 'leancloud-storage'
import ExpenseInput from '../components/ExpenseInput'

export default class Expense extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userExpense: [],
      ExpenseEntry: '',
      isLoading: false
    }
    this.user = AV.User.current()
    this.fetchExpense = this.fetchExpense.bind(this)
    // this.addExpense = this.addExpense.bind(this)
    this.updateDbExpense = this.updateDbExpense.bind(this)
    this.removeExpense = this.removeExpense.bind(this)
    this.updateExpense = this.updateExpense.bind(this)
    this.handleExpenseEntry = this.handleExpenseEntry.bind(this)
  }

  async fetchExpense () {
    this.setState({ isLoading: true })

    try {
      var query = new AV.Query('Categories')
      query.equalTo('user', this.user.id)

      await query.find().then(queryResult => {
        console.log(queryResult[0].attributes.userExpense)
        this.setState({
          userExpense: queryResult[0].attributes.userExpense
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  async updateDbExpense (newExpenseArray) {
    var UserExpense = AV.Object.extend('Expense')
    var userExpense = new UserExpense()

    try {
      var query = new AV.Query('Expense')
      query.equalTo('user', this.user.id)

      await query.first().then(queryResult => {
        userExpense = queryResult
        console.log(userExpense.attributes)
      })

      userExpense.set('userExpense', newExpenseArray)
      console.log(userExpense)
    } catch (error) {
      console.log(JSON.stringify(error))
    }

    userExpense.save().then(response => this.fetchExpense())
  }

  async removeExpense (expenseToRemove) {
    var newExpenseArray = []

    newExpenseArray = this.state.userExpense.filter(
      userExpense => userExpense.Expense !== expenseToRemove.Expense
    )

    this.updateDbExpense(newExpenseArray)
  }

  updateExpense (expenseToUpdate, newExpenseAmount) {
    var newExpenseArray = []

    for (const userExpense of this.state.userExpenses) {
      if (userExpense.Expense !== expenseToUpdate) {
        newExpenseArray = [...newExpenseArray, userExpense]
      } else {
        newExpenseArray = [
          ...newExpenseArray,
          { Expense: expenseToUpdate, Expenses: parseFloat(newExpenseAmount) }
        ]
      }
    }

    this.updateDbExpense(newExpenseArray)
  }

  handleExpenseEntry (e) {
    this.setState({
      newExpenseEntry: e.target.value
    })
  }

  render () {
    return (
      <div className='container '>
        <div className='d-flex align-items-center justify-content-center category'>
          <div>
            <h3>Enter Expense for {this.user.getUsername()}</h3>
            <br />
            <br />
            {this.state.isLoading && <h5>Loading...</h5>}

            {this.state.userExpense.length > 0 && !this.state.isLoading && (
              <>
                <table className='table table-striped table-dark text-center'>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Expense</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userCategories.map((userExpense, index) => (
                      <tr key={index}>
                        <td>{userExpense.Expense}</td>
                        <td>
                          <ExpenseInput
                            userExpense={userExpense}
                            updateBudget={this.updateBudget}
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => this.removeExpense(userExpense)}
                          >
                            <i className='far fa-trash-alt' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}
