import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Debit = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");

  const [userData, setUserData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formBalance, setFormBalance] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/getData");
        console.log(res.data);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleCreditClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!formName || !formBalance) {
      console.log("Name and balance are required.");
      return;
    }

    try {
      const res = await axios.put("http://127.0.0.1:5000/debitData", {
        name: formName,
        amount: formBalance,
      });
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user.name === formName ? { ...user, amount: res.data.amount } : user
        )
      );
      setFormName("");
      setFormBalance("");
      setShowForm(false);
    } catch (err) {
      console.log("Error submitting form:", err);
    }
  };

  return (
    <div className="container">
      <div className="welcome">
        {username ? <p>Welcome, {username}!</p> : <p>Welcome!</p>}
      </div>
      <div className="cont-1">
        <table className="balance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Updated Time</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{new Date(item.updatedAt).toLocaleString()}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <button className="credit-button" onClick={handleCreditClick}>
          Debit
        </button>

        {showForm && (
          <form className="credit-form" onSubmit={handleFormSubmit}>
            <div>
              <label>Name:</label>
              <select
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select user
                </option>
                {userData &&
                  userData.map((user, index) => (
                    <option key={index} value={user.name}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Amount:</label>
              <input
                type="number"
                value={formBalance}
                onChange={(e) => setFormBalance(e.target.value)}
                required
              />
            </div>
            <button type="submit">Update Balance</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Debit;
