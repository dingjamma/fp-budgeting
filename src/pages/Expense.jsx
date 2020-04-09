/* global alert */

import React from 'react'
import AV from 'leancloud-storage'

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
      formAmount: '0'
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
          for (let i = 0; i < theCategories.length; i++) {
            categoryList = [...categoryList, theCategories[i].Category]
          }
        }
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
    if (this.state.formCategory === 'Select') {
      alert('Please Select a Category')
      return
    }

    if (this.state.formDate.trim().length === 0) {
      alert('Please Select a Date')
      return
    } else {
      var validateDate = new Date(this.state.formDate)
      if (validateDate.getFullYear() < 1980) {
        alert('Year Must Be > 1980')
        return
      }
    }

    if (this.state.formDescription.trim().length === 0) {
      alert('Please enter a description')
      return
    }

    if (
      this.state.formAmount.trim().length === 0 ||
      this.state.formAmount < 0
    ) {
      alert('Invalid Expense Amount - Must Be Greater Than 0')
      return
    }

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
      this.fetchExpenses()
    })
  }

  async fetchExpenses () {
    this.setState({ isLoading: true })
    try {
      var query = new AV.Query('Expenses')
      query.equalTo('user', this.user.id)
      query.ascending('date')

      await query.find().then(queryResult => {
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
  }

  handleDate (e) {
    this.setState({
      formDate: e.target.value
    })
  }

  handleDescription (e) {
    this.setState({
      formDescription: e.target.value
    })
  }

  handleAmount (e) {
    this.setState({
      formAmount: e.target.value
    })
  }

  render () {
    return (
      <div className='container size'>
        
          <br/>
          <br/>
          <div className='row'>
              <div className='col text-center'>
                    {AV.User.current().isAnonymous() ? (
                      <h3>Manage Expenses for Demo User</h3>
                    ) : (
                      <h3>Manage Expenses for {this.user.getUsername()}</h3>
                    )}
              </div>
          </div>
          <br/>
          <br/>
          <div className='row'>
            <div className='col-6'>
                <h5 className='text-center'>Add Expense</h5>
                <form className='expenseForm'>
                  <div className="form-group">
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

                  <div className="form-group">

                    <input
                      type='date'
                      value={this.state.formDate}
                      onChange={this.handleDate}
                    /> 
                  </div>

                  <div className="form-group">
                      <label htmlFor='description' className='font-weight-bold'>Description : </label>
                      <input
                      id='description'
                      className='form-control'
                      placeholder='Description'
                      value={this.state.formDescription}
                      onChange={this.handleDescription}
                    />
                  </div>

                  
                  <div className="form-group">
                      <label htmlFor='amount' className='font-weight-bold'>Amount : </label>
                      <input
                        id='amount'
                        className='form-control'
                        type='number'
                        placeholder='Amount'
                        value={this.state.formAmount}
                        onChange={this.handleAmount}
                      />
                  </div>
                  
                  <div className="form-group">
                      <button onClick={() => this.addExpense()}>
                      <i className='far fa-plus-square' /> Add Expense
                    </button>
                  </div>
            </form>
            {/* Form ended */}
            </div>
            <div className='col-6'>
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
                {/*  table ended*/}
            </div> 
          </div>

      </div>
    )
  }
}
