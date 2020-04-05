import React from "react";
import AV from "leancloud-storage";
import { Redirect, Link } from "react-router-dom";

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

    let categoryToAdd = this.state.newCategoryEntry.trim();
    if (categoryToAdd.length === 0) {
      alert("Please Enter A Category Before Adding");
      return;
    } else {
      categoryToAdd =
        categoryToAdd[0].toUpperCase() + categoryToAdd.slice(1).toLowerCase();
    }

    try {
      var query = new AV.Query("Categories");
      query.equalTo("username", this.user.getUsername());

      await query.find().then((queryResult) => {
        userCategories = queryResult[0];
        console.log(userCategories.attributes);
      });

      firstInsert = false;
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    if (firstInsert) {
      userCategories.set("username", this.user.getUsername());
    }

    userCategories.addUnique("userCategories", categoryToAdd);

    console.log(userCategories);
    userCategories.save().then((response) => {
      this.fetchCategories();
      this.setState({
        newCategoryEntry: "",
      });
    });
  };

  removeCategory = async (categoryToRemove) => {
    var UserCategories = AV.Object.extend("Categories");
    var userCategories = new UserCategories();

    try {
      var query = new AV.Query("Categories");
      query.equalTo("username", this.user.getUsername());

      await query.find().then((queryResult) => {
        userCategories = queryResult[0];
        console.log(userCategories.attributes);
      });

      userCategories.remove("userCategories", categoryToRemove);
      console.log(userCategories);
    } catch (error) {
      console.log(JSON.stringify(error));
    }

    userCategories.save().then((response) => this.fetchCategories());
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
            <ul>
              {this.state.userCategories.map((category, index) => (
                <li key={index}>
                  {category}{" "}
                  <button onClick={() => this.removeCategory(category)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}

        {this.state.userCategories.length == 0 && !this.state.isLoading && (
          <h4>No Categories</h4>
        )}
      </div>
    );
  }
}
