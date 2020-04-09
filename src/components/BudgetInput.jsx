import React, { useState } from 'react'

export default function BudgetInput (props) {
  const [budgetInput, setBudgetInput] = useState(props.userCategory.Budget)

  function handleBudgetInputChange (e) {
    setBudgetInput(e.target.value)
  }

  return (
    <>
      <input
        type='number'
        value={budgetInput}
        onChange={handleBudgetInputChange}
      />
      <button
        onClick={() =>
          props.updateBudget(props.userCategory.Category, budgetInput)}
      >
        <i className='far fa-edit' />
      </button>
    </>
  )
}
