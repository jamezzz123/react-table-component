import { useEffect, useState, ReactNode } from "react";
import { keys, startCase, orderBy } from "lodash";
import classNames from "classnames";
import '../scss/custom.scss'

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
  sortable?: boolean;
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
  fields?:  (string | fields )[];
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
  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
          <tr onClick={() => onRowClicked ? onRowClicked(item) : '' } key={index}>
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
      );
    }
  }

  function toggleSorting(key: string) {
    if (sortOrder === "asc") {
      setSortKey(key);
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortKey(key);
      setSortOrder("asc");
    }else {
      setSortKey("");
    }
  }

  function computeAriaSort(key:string): 'descending' | 'ascending' | 'other'  | 'none'{
    if(sortKey  === key){
      if(sortOrder === 'asc'){
        return 'descending'
      }else{
        return 'ascending'
      }
    }else{
      return 'other'
    }
  }

  function computedItem(item: items[]) {
    if (sortKey === "") {
      return item;
    }
    return orderBy(items, sortKey, sortOrder);
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
          "table-sm": small,
        })}
      >
        <thead>
          <tr>
            {cField.map((item, index) => (
              <th
                scope="col"
                key={index}
                onClick={() => item.sortable ? toggleSorting(item.key) : toggleSorting('')}
                aria-sort={item.sortable ? computeAriaSort(item.key) : 'none'}
              >
                {item.label}

                {/* <span>
                  <img src={downArrow} alt="" />
                </span>
                <span>
                  <img src={upArrow} alt="" />
                </span> */}
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
            displayRow(computedItem(items))
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
  _fieldItem: fields,
  arr: items[],
  cell: cells
) {
  if (cell[key]) {
    return cell[key](value, item, arr);
  }
  return value;
}
