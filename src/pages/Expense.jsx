import React from 'react'
import AV from 'leancloud-storage'
import ExpenseInput from '../components/ExpenseInput'

export default class Expense extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userExpenses: [],
      userCategories: [],
      isLoading: true,
      formCategory: 'Select',
      formDate: '',
      formDescription: '',
      formAmount: 0
    }
    this.user = AV.User.current()
    this.fetchCategories = this.fetchCategories.bind(this)
    this.fetchExpenses = this.fetchExpenses.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
    this.addExpense = this.addExpense.bind(this)
    this.parseDate = this.parseDate.bind(this)
    this.formatCurrency = this.formatCurrency.bind(this)
  }

  componentDidMount () {
    this.fetchCategories()
    this.fetchExpenses()
  }

  async fetchCategories () {
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

  async addExpense () {
    // Initialize Object
    var UserExpense = AV.Object.extend('Expenses')
    var userExpense = new UserExpense()

    // Add Validation Here

    // Adjust Date
    var adjustedDate = new Date(this.state.formDate)
    adjustedDate.setTime(
      adjustedDate.getTime() +
        Math.abs(adjustedDate.getTimezoneOffset() * 60000)
    )

    // Set Values of Fields
    userExpense.set('user', this.user.id)
    userExpense.set('date', adjustedDate)
    userExpense.set('category', this.state.formCategory)
    userExpense.set('description', this.state.formDescription)
    userExpense.set('amount', this.state.formAmount)

    userExpense.save().then(() => {
      console.log(userExpense)
      this.fetchExpenses()
    })
  }

  async fetchExpenses () {
    this.setState({ isLoading: true })
    try {
      var query = new AV.Query('Expenses')
      query.equalTo('user', this.user.id)

      await query.find().then(queryResult => {
        console.log(queryResult)
        this.setState({
          userExpenses: queryResult
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  async removeExpense (id) {
    try {
      var userExpense = AV.Object.createWithoutData('Expenses', id)
      await userExpense.destroy().then(() => this.fetchExpenses())
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  }

  // Utility
  parseDate (date) {
    var parsed = new Date(date)
    parsed.setHours(0, 0, 0, 0)
    return `${parsed.getMonth() +
      1}-${parsed.getDate()}-${parsed.getFullYear()}`
  }

  formatCurrency (amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    return formatter.format(amount)
  }

  // Form Entries
  handleSelect (e) {
    this.setState({
      formCategory: e.target.value
    })

    console.log('Select: ' + e.target.value)
  }

  handleDate (e) {
    this.setState({
      formDate: e.target.value
    })

    console.log('Date: ' + e.target.value)
  }

  handleDescription (e) {
    this.setState({
      formDescription: e.target.value
    })

    console.log('Description: ' + e.target.value)
  }

  handleAmount (e) {
    this.setState({
      formAmount: e.target.value
    })

    console.log('Amount: ' + e.target.value)
  }

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
              <select
                value={this.state.formCategory}
                onChange={this.handleSelect}
              >
                <option value='Select'> Select Category </option>
                {this.state.userCategories !== undefined &&
                  this.state.userCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {' '}
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <br />
            <input
              type='date'
              value={this.state.formDate}
              onChange={this.handleDate}
            />
            <br />
            <input
              placeholder='Description'
              value={this.state.formDescription}
              onChange={this.handleDescription}
            />
            <br />
            <input
              type='number'
              placeholder='Amount'
              value={this.state.formAmount}
              onChange={this.handleAmount}
            />
            <br />
            <button onClick={() => this.addExpense()}>
              <i className='far fa-plus-square' /> Add Expense
            </button>
            <br />
            <br />
            {this.state.isLoading && <h5>Loading...</h5>}

            {!this.state.isLoading && (
              <>
                <table className='table table-striped table-dark text-center'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userExpenses.map((userExpense, index) => (
                      <tr key={index}>
                        <td>{this.parseDate(userExpense.attributes.date)}</td>
                        <td>{userExpense.attributes.category}</td>
                        <td>{userExpense.attributes.description}</td>
                        <td>
                          {this.formatCurrency(userExpense.attributes.amount)}
                        </td>
                        <td>
                          <button
                            onClick={() => this.removeExpense(userExpense.id)}
                          >
                            <i className='far fa-trash-alt' />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {this.state.userExpenses.length === 0 &&
                  !this.state.isLoading && <p>No Expenses Yet...</p>}
              </>
            )}
          </div>
        </div>
      </div>
    )
  }
}
