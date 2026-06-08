import React from 'react';
import './Table.css';

const Table = ({ columns, data }) => {
  return (
    <div className="table-scroll">
      <table className="table-component">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id || row.key || JSON.stringify(row)}>
              {columns.map((column) => (
                <td key={column.key} className={column.className || ''}>
                  {column.render ? column.render(row) : row[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
