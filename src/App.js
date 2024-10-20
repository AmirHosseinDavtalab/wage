import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [wage, setWage] = useState("");
  const [name, setName] = useState("");
  const [names, setNames] = useState(() => {
    const storedValue = localStorage.getItem("names");
    return storedValue ? JSON.parse(storedValue) : [];
  });

  function handleAddName(e) {
    e.preventDefault();
    if (name) {
      if (names.some((person) => person.name === name)) {
        alert(`The name ${name} already exists.`);
      } else {
        const timeInDate = new Date(`1970-01-01T${timeIn}:00`);
        const timeOutDate = new Date(`1970-01-01T${timeOut}:00`);
        const differenceInMilliseconds = timeOutDate - timeInDate;

        if (differenceInMilliseconds > 0) {
          const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
          const calculatedWage = parseFloat(wage);
          const calculatedProfit = differenceInHours * calculatedWage;

          const newPerson = {
            name: name,
            hoursWorked: differenceInHours,
            profit: calculatedProfit,
          };

          setNames([...names, newPerson]);
          setName("");
          setTimeIn("");
          setTimeOut("");
          setWage("");
        } else {
          alert("Time out must be later than time in!");
        }
      }
    }
  }

  useEffect(() => {
    localStorage.setItem("names", JSON.stringify(names));
  }, [names]);

  return (
    <div className="container">
      <h1>Submit Name</h1>
      <form onSubmit={handleAddName}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />
        <input
          type="number"
          value={wage}
          onChange={(e) => setWage(e.target.value)}
          placeholder="Enter The Wage per hour"
          required
        />
        <input
          type="time"
          value={timeIn}
          onChange={(e) => setTimeIn(e.target.value)}
          required
        />
        <input
          type="time"
          value={timeOut}
          onChange={(e) => setTimeOut(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Hours Worked</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {names.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.hoursWorked?.toFixed(2) || "N/A"} hours</td>
              <td>${person.profit?.toFixed(2) || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
