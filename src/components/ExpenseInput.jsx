import { React, useState } from 'react'

export default function ExpenseInput (props) {
  const [ExpenseInput, setExpenseInput] = useState(props.userCategory.Expense)

  function handleExpenseInputChange (e) {
    setExpenseInput(e.target.value)
  }

  return (
    <>
      <input
        type='number'
        value={ExpenseInput}
        onChange={handleExpenseInputChange}
      />
      <button
        onClick={() =>
          props.updateExpense(props.userCategory.Category, ExpenseInput)}
      >
        <i className='hfar fa-edit' />
      </button>
    </>
  )
}
