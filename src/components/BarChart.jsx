import React from 'react'
import Chart from "react-google-charts";
import AV from 'leancloud-storage';
import Carosel from './Carousel'

export default class BarChart extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      userCategories: [],
      userExpense: [],
      isLoading: true,
      hasCategory: false,
      data : []  
    }
    this.user = AV.User.current()
  }

  componentDidMount () {
    this.fetchCategories()
  }

  fetchCategories = async () => {
    this.setState({ isLoading: true })
    let categoryName = []
    let categoryBudget =[]
  //  let expense=[150,200,500]
    let newData=[]
    
    try {
      var query = new AV.Query('Categories')
      var queryExpense = new AV.Query('Expenses')

      query.equalTo('user', this.user.id)
      await query.first().then(queryResult => {
        //Define New Arrays
        let theCategories = []
        //If Query is Valid
        if (queryResult !== undefined) {
          //Grab Categories
          theCategories = queryResult.attributes.userCategories

          if(theCategories.length > 0){
            this.setState({hasCategory : true})
          }
          //First Add The Legend Fields
          for (let i = 0; i < theCategories.length; i++) {
            categoryName =[...categoryName,theCategories[i].Category]
            categoryBudget =[...categoryBudget,theCategories[i].Budget]
          }
        }
     
      })

      queryExpense.equalTo('user', this.user.id)
      await queryExpense.find().then(queryExpenseResult => {
       
        //If Query is Valid
        if (queryExpenseResult !== undefined) {
          //Grab Expenses
          this.setState({
            userExpense: queryExpenseResult
          })
          //First Add The Legend Fields
           //Define New Arrays
          let theExpenses = this.state.userExpense


          console.log("Category Name" + categoryName + " length: " +categoryName.length)
          console.log("Category Budget" + categoryBudget)
          console.log("expense length" + theExpenses.length)

          newData = [...newData, ["Category", "Expense", "Budget"]];

          for ( let cn = 0 ; cn < categoryName.length ; cn++){
              let expense = 0

             // Loop through the theExpense array, count the sum of all entries 
              // for one category
              for (let i = 0; i < theExpenses.length; i++) {
                  if(theExpenses[i].attributes.category === categoryName[cn]){
                    expense = expense + parseFloat(theExpenses[i].attributes.amount)
                  }
              }

              //add that to the newData
              newData = [
                  ...newData,
                  [categoryName[cn], expense, categoryBudget[cn]]
                ];

               }
        }

        this.setState({
          data: newData
        })
      })

    } catch (error) {
      console.log(JSON.stringify(error))
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render () {
    return (
      <div>
      <div className='container d-flex flex-column align-items-center home'>
        <br/><br/>

          {!this.state.hasCategory ? (
            // <div container d-flex flex-column align-items-center home>
            //     <h4> Please add your expense and budget</h4>
                <Carosel></Carosel>
            // </div>
          ) : (
            <Chart
              width={900}
              height={500}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data={this.state.data}
              options={{
                title: 'Monthly Expense vs Budget Chart',
                fontSize:15,
                chartArea: { width: '70%' },
                hAxis: {
                  title: 'Expense',
                  minValue: 0,
                },
                vAxis: {
                  title: 'Budget',
                  minValue: 0
                },
              }}
              legendToggle
            />
          )}
            
         
      </div>
      </div>
    )
  }
}
