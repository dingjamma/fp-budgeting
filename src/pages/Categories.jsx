/* global alert */
import React from 'react'
import AV from 'leancloud-storage'
import BudgetInput from '../components/BudgetInput'
import Footer from './Footer'

export default class Categories extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userCategories: [],
      newCategoryEntry: '',
      isLoading: true
    }
    this.user = AV.User.current()
  }

  componentDidMount () {
    this.fetchCategories()
  }

  fetchCategories = async () => {
    this.setState({ isLoading: true })

    try {
      var query = new AV.Query('Categories')
      query.equalTo('user', this.user.id)

      await query.find().then(queryResult => {
        this.setState({
          userCategories: queryResult[0].attributes.userCategories
        })
      })
    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  handleAddCategory = async () => {
    let firstInsert = true
    let duplicate = false
    var UserCategories = AV.Object.extend('Categories')
    var userCategories = new UserCategories()

    let categoryNameToAdd = this.state.newCategoryEntry.trim()
    if (categoryNameToAdd.length === 0) {
      alert('Please Enter A Category Before Adding')
      return
    } else {
      categoryNameToAdd =
        categoryNameToAdd[0].toUpperCase() +
        categoryNameToAdd.slice(1).toLowerCase()
    }

    for (const userCategory of this.state.userCategories) {
      if (userCategory.Category === categoryNameToAdd) {
        duplicate = true
      }
    }

    if (!duplicate) {
      try {
        var query = new AV.Query('Categories')
        query.equalTo('user', this.user.id)

        await query.first().then(queryResult => {
          if (queryResult !== undefined) {
            userCategories = queryResult
            firstInsert = false
          }
        })
      } catch (error) {
        console.log(JSON.stringify(error))
      }

      if (firstInsert) {
        userCategories.set('user', this.user.id)
      }

      var categoryToAdd = { Category: categoryNameToAdd, Budget: 0 }
      userCategories.addUnique('userCategories', categoryToAdd)

      userCategories.save().then(response => {
        this.fetchCategories()
        this.setState({
          newCategoryEntry: ''
        })
      })
    } else {
      alert('Category Already Exists!')
    }
  }

  updateDbCategory = async newCategoryArray => {
    var UserCategories = AV.Object.extend('Categories')
    var userCategories = new UserCategories()

    try {
      var query = new AV.Query('Categories')
      query.equalTo('user', this.user.id)

      await query.first().then(queryResult => {
        userCategories = queryResult
      })

      userCategories.set('userCategories', newCategoryArray)
    } catch (error) {
      console.log(JSON.stringify(error))
    }

    userCategories.save().then(response => this.fetchCategories())
  }

  removeCategory = async categoryToRemove => {
    var newCategoryArray = []

    newCategoryArray = this.state.userCategories.filter(
      userCategory => userCategory.Category !== categoryToRemove.Category
    )

    this.updateDbCategory(newCategoryArray)
  }

  updateBudget = (categoryToUpdate, newBudgetAmount) => {
    var newCategoryArray = []

    for (const userCategory of this.state.userCategories) {
      if (userCategory.Category !== categoryToUpdate) {
        newCategoryArray = [...newCategoryArray, userCategory]
      } else {
        newCategoryArray = [
          ...newCategoryArray,
          { Category: categoryToUpdate, Budget: parseFloat(newBudgetAmount) }
        ]
      }
    }

    this.updateDbCategory(newCategoryArray)
  }

  handleCategoryEntry = e => {
    this.setState({
      newCategoryEntry: e.target.value
    })
  }

  render () {
    return (
      <div>
        <div className='container '>
          <div className='d-flex align-items-center justify-content-center category'>
            <div>
              {AV.User.current().isAnonymous() ? (
                <h3>Manage Categories for Demo User</h3>
              ) : (
                <h3>Manage Categories for {this.user.getUsername()}</h3>
              )}

              <br />
              <br />
              {this.state.isLoading && <h5>Loading...</h5>}

              {this.state.userCategories.length > 0 && !this.state.isLoading && (
                <>
                  <table className='table table-striped table-dark text-center'>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Budget</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.userCategories.map((userCategory, index) => (
                        <tr key={index}>
                          <td>{userCategory.Category}</td>
                          <td>
                            <BudgetInput
                              userCategory={userCategory}
                              updateBudget={this.updateBudget}
                            />
                          </td>
                          <td>
                            <button
                              onClick={() => this.removeCategory(userCategory)}
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

              {this.state.userCategories.length === 0 &&
                !this.state.isLoading && <p>No Categories Yet... Add One Below</p>}

              <input
                value={this.state.newCategoryEntry}
                onChange={this.handleCategoryEntry}
                placeholder='Add Category'
              />

              <button onClick={this.handleAddCategory}>
                {' '}
                <i className='far fa-plus-square' />{' '}
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
