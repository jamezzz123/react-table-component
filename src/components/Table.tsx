import { useEffect, useState, FC, ReactNode } from "react";
import { keys, startCase } from "lodash";
import classNames from "classnames";

type items = {
  [key: string]: string | number | boolean;
};

type cells = {
  [key: string]: template;
};

type template = (
  value: string | number | boolean,
  item: items,
  arr: items[]
) => string | number | boolean | ReactNode;

type fields = {
  key: string;
  label?: string;
  formatter?: (
    value: string | number | boolean,
    item: items,
    arr: items[]
  ) => string | number | boolean;
};

export default function Table({
  items,
  hover,
  striped,
  dark,
  fields,
  responsive,
  bordered,
  small,
  TableBusy,
  busy,
  cell,
  onRowClicked,
}: {
  items: items[];
  hover?: boolean;
  striped?: boolean;
  fields?: fields[] | string[];
  dark?: boolean;
  responsive?: boolean;
  bordered?: boolean;
  small?: boolean;
  busy?: boolean;
  onRowClicked?: (value: items) => unknown;
  TableBusy?: ReactNode;
  cell?: cells;
}) {
  const [cField, setCField] = useState<fields[]>([]);

  console.log(cell);
  useEffect(() => {
    // if (fields) {
    //   setCField(fields);
    // } else if (items.length > 0) {
    //   const arr = keys(items[0]);
    //   setCField(arr);
    // }

    if (!fields) {
      const arr = keys(items[0]);
      setCField(formatFieldFromString(arr));
    } else {
      const result = fields.map((item) => {
        if (typeof item === "string") {
          return {
            label: startCase(item),
            key: item,
          };
        } else if (typeof item === "object") {
          return {
            label: item.label ? item.label : startCase(item.key),
            ...item,
          };
        }
      }) as fields[];

      setCField(result);
    }
  }, [items, fields]);

  function FormatFieldTitle(string: string) {
    return startCase(string);
  }

  function formatFieldFromString(arr: string[]): fields[] {
    return arr.map((item) => ({
      key: item,
      label: FormatFieldTitle(item),
    }));
  }

  function displayRow(items: items[]): ReactNode {
    if (items.length > 0) {
      return items.map((item, index, arr) => {
        return (
          <tr onClick={() => onRowClicked(item)} key={index}>
            {cField.map((fieldItem, fieldIndex) => {
              return (
                <td key={fieldIndex}>
                  {cell
                    ? displayValueCell(
                        displayValue(fieldItem.key, item, fieldItem, arr),
                        fieldItem.key,
                        item,
                        fieldItem,
                        arr,
                        cell
                      )
                    : displayValue(fieldItem.key, item, fieldItem, arr)}
                </td>
              );
            })}
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={4}>
            <h1 className="text-center">No data to display</h1>;
          </td>
        </tr>
      ) 
    }
  }

  return (
    <div
      className={classNames({
        "table-responsive": responsive,
      })}
    >
      <table
        className={classNames({
          table: true,
          "table-hover": hover,
          "table-striped": striped,
          "table-dark": dark,
          "table-bordered": bordered,
          "table-small": small,
        })}
      >
        <thead>
          <tr>
            {cField.map((item, index) => (
              <th scope="col" key={index}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TableBusy && busy ? (
            <tr>
              <td colSpan={cField.length}>{TableBusy}</td>
            </tr>
          ) : (
            displayRow(items)
          )}
        </tbody>
      </table>
    </div>
  );
}

function displayValue(
  key: string,
  item: items,
  fieldItem: fields,
  arr: items[]
) {
  if (fieldItem.formatter) {
    return fieldItem.formatter(item[key], item, arr);
  }
  return item[key];
}

function displayValueCell(
  value: any,
  key: string,
  item: items,
  fieldItem: fields,
  arr: items[],
  cell: cells
) {
  if (cell[key]) {
    return cell[key](value, item, arr);
  }
  return value;
}
