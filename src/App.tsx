import { useState, useEffect } from "react";
import Table from "./components/Table";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const fields = ["first_name", "last_name", "age"];
  const items = [
    {
      isActive: true,
      age: 40,
      first_name: "Dickerson",
      last_name: "Macdonald",
    },
    { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
    { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
    { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
  ];
  return (
    <>
      <div className="container">
        <Table hover dark striped fields={fields} items={items} />
      </div>
    </>
  );
}

export default App;
