
# React Table Component

React Table Component is a lightweight and customizable table component built with React, using Bootstrap 5 CSS. It is inspired by the Bootstrap Vue Table component.

## Installation

You can install the package via npm:

```bash
npm install react-table-component
```

## Usage

To use the `Table` component, import it from the package:

```jsx
import Table from "react-table-component";
import "react-bootstrap-vue-table/dist/style.css"
```

Then, you can use the `Table` component in your React application like this:

```jsx
import Table from "react-table-component";

function App() {
  type items = {
    [key: string]: string | number | boolean;
  };

  const fields = [
    "first_name",
    "last_name",
    {
      key: "age",
      label: "My Age",
      sortable: true,
      formatter: (value: string | number): number => {
        return Number(value) + 500;
      },
    },
    {
      key: "full_name",
      label: "Full Name",
      formatter: (_value: string | number, item: any): any => {
        return item.first_name + " " + item.last_name;
      },
    },
  ] as any;


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

  return (
    <div className="container">
      <Table
        TableBusy={<h1 className="text-center">Loading</h1>}
        busy={false}
        hover
        small
        bordered
        fields={fields}
        items={items}
        onRowClicked={(e) => console.log(e)}
        cell={{
          first_name: (value: string | number | boolean) => {
            return <button className="btn btn-primary">{value}</button>;
          },
          full_name: (value: string | number | boolean, _item: any) => {
            return <a href={value as string}>{value}</a>
          },
        }}
      />
    </div>
  );
}

export default App;
```

## Props

Here is a list of the props that the `Table` component accepts:

- `fields` - an array of objects that describe the columns in the table. Each object should have a `key` property that corresponds to the key in the data object, and may also have a `label`, `sortable`, and `formatter` property.
- `items` - an array of data objects to be displayed in the table.
- `busy` - a boolean that determines whether to show a loading spinner or not.
- `TableBusy` - a custom element to be displayed instead of the default loading spinner.
- `hover` - a boolean that determines whether to show a hover effect on the table rows.
- `small` - a boolean that determines whether to make the table smaller.
- `bordered` - a boolean that determines whether to add borders to the table.
- `cell` - an object that maps column keys to custom cell renderers. Each value should be a function that takes the cell value and returns a React element
- `onRowClicked` - a function that return the row data when its being clicked

