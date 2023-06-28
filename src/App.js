import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar";
import Budget from "./component/Budget";
import Remaining from "./component/Remaining";
import Spent from "./component/Spent";
import ExpenseList from "./component/ExpenseList";

function App() {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  // fetch data from json server when the page first load
  useEffect(() => {
    fetch("http://localhost:3000/budget")
      .then((r) => r.json())
      .then((data) => setBudget(data.total))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/expenses")
      .then((r) => r.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.log(error));
  }, []);

  // calculate total spent
  const totalExpenses = expenses.map((expense) => expense.cost).reduce((total, cost) => total + cost, 0)

  // calculate the remaining balance
  const remainingBalance = budget - totalExpenses

  const handleUpdateBudget = (newBudget) => {
    setBudget(newBudget)
  }

  return (
    <div className="container">
      <Navbar />
      <div className="row mt-4">
        <div className="col-sm">
          <Budget budget={budget} onUpdateBudget={handleUpdateBudget}/>
        </div>
        <div className="col-sm">
          <Remaining remainingBalance={remainingBalance}/>
        </div>
        <div className="col-sm">
          <Spent totalExpenses={totalExpenses}/>
        </div>
      </div>
      <h3 className="mt-4">Expenses</h3>
      <div className="row mt-3">
        <div className="col-sm">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
