import React, { useState, useRef } from "react";

const App = () => {
  const creditAmount = useRef();
  const cashFlow = useRef();
  const category = useRef();
  const description = useRef();

  const [cashin, setCashin] = useState(0);
  const [cashout, setCashout] = useState(0);
  const [balance, setBalance] = useState(0);

  const [transaction, setTransaction] = useState([]);

  const Submit = (event) => {
    event.preventDefault();

    const creditamount = +creditAmount.current.value;
    const cashflow = cashFlow.current.value;
    const Category = category.current.value;
    const Description = description.current.value;

    if (creditamount > 0 && cashflow === "cashin") {
      setBalance(balance + creditamount);
      setCashin(cashin + creditamount);
      creditAmount.current.value = "";
    } else if (creditamount > 0 && cashflow === "cashout") {
      setBalance(balance - creditamount);
      setCashout(cashout + creditamount);
    }

    const data = {
      creditamount,
      cashflow,
      Category,
      Description,
    };

    setTransaction([...transaction, data]);
  };

  return (
    <>
      {/* Header */}
      <div className="text-center mt-6 text-4xl font-bold text-indigo-600">
        <h1>Expense Tracker</h1>
      </div>

      {/* Main Container */}
      <div className="bg-gray-50 mt-12 py-8">
        {/* Balance Section */}
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row gap-4 p-6 justify-around w-full max-w-[40rem] border border-gray-200 rounded-lg bg-white shadow-lg">
            <div className="text-2xl font-bold text-center">
              CashIn <br />
              <span className="text-emerald-600">${cashin}</span>
            </div>
            <div className="text-2xl font-bold text-center">
              CashOut <br />
              <span className="text-red-500">${cashout}</span>
            </div>
            <div className="text-2xl font-bold text-center">
              Balance <br />
              <span className="text-indigo-500">${balance}</span>
            </div>
          </div>
        </div>
        <form onSubmit={Submit}>
          {/* Form Section */}
          <div className="flex flex-wrap justify-around gap-6 mt-8">
            {/* Credit */}
            <label className="form-control w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text font-medium text-xl text-gray-700">
                  Credit $
                </span>
              </div>
              <input
                type="number"
                ref={creditAmount}
                placeholder="Enter amount"
                className="input input-bordered w-full bg-gray-100 border-gray-300"
              />
            </label>

            {/* Cash Flow */}
            <label className="form-control w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text font-medium text-xl text-gray-700">
                  Cash Flow
                </span>
              </div>
              <select
                className="select select-bordered w-full bg-gray-100 border-gray-300"
                ref={cashFlow}
                defaultValue=""
              >
                <option disabled value="">
                  Select an option
                </option>
                <option value="cashin">CashIn</option>
                <option value="cashout">CashOut</option>
              </select>
            </label>

            {/* Categories */}
            <label className="form-control w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text font-medium text-xl text-gray-700">
                  Categories
                </span>
              </div>
              <select
                className="select select-bordered w-full bg-gray-100 border-gray-300"
                ref={category}
                defaultValue=""
              >
                <option disabled value="">
                  Select a Category
                </option>
                <option value="grocery">Grocery</option>
                <option value="petrol">Petrol</option>
                <option value="transportation">Transportation</option>
                <option value="utility">Utility Bills</option>
                <option value="shopping">Shopping</option>
                <option value="food">Food</option>
              </select>
            </label>
          </div>

          {/* Organization */}
          <div className="flex justify-center mt-8">
            <label className="form-control w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text font-medium text-xl text-gray-700">
                  Organization
                </span>
              </div>
              <input
                type="text"
                ref={description}
                placeholder="Enter Source of Income"
                className="input input-bordered w-full bg-gray-100 border-gray-300"
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-md">
              DONE
            </button>
          </div>
        </form>

       {/* Transaction List */}
       <div className="mt-12 flex justify-center px-6">
          {transaction.length > 0 ? (
            <div className="flex  flex-col w-[400px] gap-6">
              {transaction.map((item, index) => (
                <div key={index} className="card bg-white shadow-xl border border-gray-200 rounded-lg p-4">
                  <h2 className="text-lg font-bold text-indigo-600 mb-2">
                    {item.cashflow === "cashin" ? "Cash In" : "Cash Out"}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-semibold">Credit Amount:</span> ${item.creditamount}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Category:</span> {item.Category}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Description:</span> {item.Description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-2xl text-gray-500">No transactions history.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
