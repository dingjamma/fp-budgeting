import React from 'react'
import AV from 'leancloud-storage'
import ExpenseInput from '../components/ExpenseInput'

export default class Expense extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userExpenses: [],
      ExpenseEntry: '',
      month: new Date().getMonth(),
      userCategories: [],
      isLoading: false
    }
    this.user = AV.User.current()
    this.fetchCategories = this.fetchCategories.bind(this)
    // this.addExpense = this.addExpense.bind(this)
    // this.updateDbExpense = this.updateDbExpense.bind(this)
    // this.removeExpense = this.removeExpense.bind(this)
    // this.updateExpense = this.updateExpense.bind(this)
    // this.handleExpenseEntry = this.handleExpenseEntry.bind(this)
  }

  componentDidMount () {
    this.fetchCategories()
  }

  async fetchCategories () {
    console.log('BACK')
    try {
      var query = new AV.Query('Categories')
      query.equalTo('user', this.user.id)
      await query.first().then(queryResult => {
        // Define Category Array
        let categoryList = []
        // If Query is Valid
        if (queryResult !== undefined) {
          // Grab Categories
          var theCategories = queryResult.attributes.userCategories
          console.log(theCategories.length)
          for (let i = 0; i < theCategories.length; i++) {
            categoryList = [...categoryList, theCategories[i].Category]
          }
        }
        console.log(categoryList)
        // Update State
        this.setState({
          userCategories: categoryList
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  // async updateDbExpense (newExpenseArray) {
  //  var UserExpense = AV.Object.extend('Expense')
    //var userExpense = new UserExpense()
//
  //  try {
    //  var query = new AV.Query('Expense')
      //query.equalTo('user', this.user.id)
//
  //    await query.first().then(queryResult => {
    //    userExpense = queryResult
      //  console.log(userExpense.attributes)
      //})
//
  //    userExpense.set('userExpense', newExpenseArray)
    //  console.log(userExpense)
    //} catch (error) {
     // console.log(JSON.stringify(error))
    //}

 //   userExpense.save().then(response => this.fetchCategories())
  // } 

  // async removeExpense (expenseToRemove) {
  //   var newExpenseArray = []

  //   newExpenseArray = this.state.userExpense.filter(
  //     userExpense => userExpense.Expense !== expenseToRemove.Expense
  //   )

  //   this.updateDbExpense(newExpenseArray)
  // }

  // updateExpense (expenseToUpdate, newExpenseAmount) {
  //   var newExpenseArray = []

  //   for (const userExpense of this.state.userExpenses) {
  //     if (userExpense.Expense !== expenseToUpdate) {
  //       newExpenseArray = [...newExpenseArray, userExpense]
  //     } else {
  //       newExpenseArray = [
  //         ...newExpenseArray,
  //         { Expense: expenseToUpdate, Expenses: parseFloat(newExpenseAmount) }
  //       ]
  //     }
  //   }

  //   this.updateDbExpense(newExpenseArray)
  // }

  // handleExpenseEntry (e) {
  //   this.setState({
  //     newExpenseEntry: e.target.value
  //   })
  //
  render () {
    return (
      <div className='container '>
        <div className='d-flex align-items-center justify-content-center category'>
          <div>
            <h3>Enter Expense for {this.user.getUsername()}</h3>
            <br />
            <br />
            <h5>Add Expense</h5>
            <br />
            <div>
              <select>
                <option value='Select'> Select Category </option>
                {this.state.userCategories !== undefined && this.state.userCategories.map((category, index) => (
                  <option key={index} value={category}> {category}</option>
                ))}
              </select>
            </div>
            <br />
            <input type='date' />
            <br />
            <input type='number' placeholder='Amount' />
            <br />
            <button>
              <i className='far fa-plus-square' /> Add Expense
            </button>
            <br />
            <br />
            {this.state.isLoading && <h5>Loading...</h5>}

            {!this.state.isLoading && (
              <>
                {this.state.userCategories.length === 0 &&
                !this.state.isLoading && (
                  <p>No Categories Yet... Add One Below</p>
                )}
                <table className='table table-striped table-dark text-center'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
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
