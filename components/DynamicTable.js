import React from 'react';

const DynamicTable = ({ fields, data }) => {
  return (
    <table className="table-auto border-collapse border border-gray-500 w-full">
      <thead>
        <tr>
          {fields.map((field, index) => (
            <th key={index} className="border border-gray-500 px-4 py-2">
              {field.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {fields.map((field, colIndex) => (
              <td key={colIndex} className="border border-gray-500 px-4 py-2">
                {row[field.name] || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
