import React from "react";
import { useState } from "react";

export default function BudgetInput(props) {
  const [budgetInput, setBudgetInput] = useState(props.userCategory.Budget);

  function handleBudgetInputChange(e) {
    setBudgetInput(e.target.value);
  }

  return (
    <React.Fragment>
      <input
        type="number"
        value={budgetInput}
        onChange={handleBudgetInputChange}
      />
      <button
        onClick={() =>
          props.updateBudget(props.userCategory.Category, budgetInput)
        }
      >
        Update
      </button>
    </React.Fragment>
  );
}
