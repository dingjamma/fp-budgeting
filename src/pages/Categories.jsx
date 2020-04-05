import React from "react";
import AV from "leancloud-storage";
import { Redirect, Link } from "react-router-dom";
import BudgetInput from "../components/BudgetInput";

export default class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCategories: [],
      newCategoryEntry: "",
      isLoading: true,
    };
    this.user = AV.User.current();
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    this.setState({ isLoading: true });
    var UserCategories = AV.Object.extend("Categories");

    try {
      var query = new AV.Query("Categories");
      query.equalTo("username", this.user.getUsername());

      await query.find().then((queryResult) => {
        console.log(queryResult[0].attributes.userCategories);
        this.setState({
          userCategories: queryResult[0].attributes.userCategories,
        });
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    } finally {
      this.setState({ isLoading: false });
    }
  };

  addCategory = async () => {
    let firstInsert = true;
    var UserCategories = AV.Object.extend("Categories");
    var userCategories = new UserCategories();

    let categoryNameToAdd = this.state.newCategoryEntry.trim();
    if (categoryNameToAdd.length === 0) {
      alert("Please Enter A Category Before Adding");
      return;
    } else {
      categoryNameToAdd =
        categoryNameToAdd[0].toUpperCase() +
        categoryNameToAdd.slice(1).toLowerCase();
    }

    try {
      var query = new AV.Query("Categories");
      query.equalTo("username", this.user.getUsername());

      await query.first().then((queryResult) => {
        if (queryResult !== undefined) {
          userCategories = queryResult;
          console.log(userCategories.attributes);
          firstInsert = false;
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    if (firstInsert) {
      userCategories.set("username", this.user.getUsername());
    }

    var categoryToAdd = { Category: categoryNameToAdd, Budget: 0 };
    userCategories.addUnique("userCategories", categoryToAdd);

    console.log(userCategories);
    userCategories.save().then((response) => {
      this.fetchCategories();
      this.setState({
        newCategoryEntry: "",
      });
    });
  };

  updateDbCategory = async (newCategoryArray) => {
    var UserCategories = AV.Object.extend("Categories");
    var userCategories = new UserCategories();

    try {
      var query = new AV.Query("Categories");
      query.equalTo("username", this.user.getUsername());

      await query.first().then((queryResult) => {
        userCategories = queryResult;
        console.log(userCategories.attributes);
      });

      userCategories.set("userCategories", newCategoryArray);
      console.log(userCategories);
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    userCategories.save().then((response) => this.fetchCategories());
  };

  removeCategory = async (categoryToRemove) => {
    var newCategoryArray = [];

    newCategoryArray = this.state.userCategories.filter(
      (userCategory) => userCategory.Category != categoryToRemove.Category
    );

    this.updateDbCategory(newCategoryArray);
  };

  updateBudget = (categoryToUpdate, newBudgetAmount) => {
    var newCategoryArray = [];

    this.state.userCategories.map((userCategory) => {
      if (userCategory.Category != categoryToUpdate) {
        newCategoryArray = [...newCategoryArray, userCategory];
      } else {
        newCategoryArray = [
          ...newCategoryArray,
          { Category: categoryToUpdate, Budget: parseFloat(newBudgetAmount) },
        ];
      }
    });

    this.updateDbCategory(newCategoryArray);
  };

  handleCategoryEntry = (e) => {
    this.setState({
      newCategoryEntry: e.target.value,
    });
  };

  render() {
    if (!this.user) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h3>Manage Categories for {this.user.getUsername()}</h3>

        <br />
        <input
          value={this.state.newCategoryEntry}
          onChange={this.handleCategoryEntry}
        />
        <button onClick={this.addCategory}>Add</button>

        {this.state.isLoading && <h5>Loading...</h5>}

        {this.state.userCategories.length > 0 && !this.state.isLoading && (
          <React.Fragment>
            <h4>My Categories</h4>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Del</th>
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
                      <button onClick={() => this.removeCategory(userCategory)}>
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        )}

        {this.state.userCategories.length == 0 && !this.state.isLoading && (
          <h4>No Categories</h4>
        )}
      </div>
    );
  }
}
