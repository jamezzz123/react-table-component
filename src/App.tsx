import { useState, useEffect } from "react";
import Table from "./components/Table";
import { first } from "lodash";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  type items = {
    [key: string]: string | number | boolean;
  };

  const fields = [
    "first_name",
    "last_name",
    {
      key: "age",
      label: "My Age",
      formatter: (value: string | number): number => {
        return Number(value) + 1000;
      },
    },
    {
      key: "full_name",
      label: "Full Name",
      formatter: (value: string | number, item: any): any => {
        return item.first_name + " " + item.last_name;
      },
    },
  ];
  const items: items[] = [
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
  // const cellFormat = {
  //   first_name: {
  //     template: (value: string | number) => {
  //       return <h1>{value}</h1>;
  //     },
  //   },
  // };
  return (
    <>
      <div className="container">
        <Table
          TableBusy={<h1 className="text-center">Loading</h1>}
          busy={false}
          hover
          fields={fields}
          items={items}
          cell={{
            first_name: (value: string | number | boolean) => {
              return <button className="btn btn-primary">{value}</button>;
            },
            full_name: (value: string | number | boolean, item: any) => {
              return <a href={value as string}>{value}</a>
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
