import { useEffect, useState } from "react";
import { keys, capitalize, escape, startCase } from "lodash";
import classNames from "classnames";

type items = {
  age: number;
  first_name: string;
  last_name: string;
};

export default function Table({
  items,
  hover,
  striped,
  dark,
  fields,
}: {
  items: items[];
  hover?: boolean;
  striped?: boolean;
  fields?: string[];
  dark?: boolean;
}) {
  const [cField, setCField] = useState<string[]>([]);

  useEffect(() => {
    if (fields) {
      setCField(fields);
    } else if (items.length > 0) {
      const arr = keys(items[0]);
      setCField(arr);
    }
  }, [items, fields]);

  function FormatFieldTitle(string: string) {
    return startCase(string);
  }

  return (
    <div className="table-responsive">
      <table
        className={classNames({
          table: true,
          "table-hover": hover,
          "table-striped": striped,
          "table-dark": dark,
        })}
      >
        <thead>
          <tr>
            {cField.map((item, index) => (
              <th scope="col" key={index}>
                {FormatFieldTitle(item)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index, itemArr) => {
            return (
              <tr key={index}>
                {cField.length > 0 &&
                  cField.map((fieldItem, fieldIndex) => {
                    return (
                      <td key={fieldIndex}>{item[fieldItem as keyof items]}</td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
