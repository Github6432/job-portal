import { useState } from 'react';

const AddJob = () => {
  const [title, setTitle] = useState('');
  const [fields, setFields] = useState([]);
  const [data, setData] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: '', type: 'string' }]);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const handleAddRow = () => {
    setData([...data, {}]);
  };

  const handleRowChange = (index, key, value) => {
    const newData = [...data];
    newData[index][key] = value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/jobs/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, fields, data }),
      });

      if (response.ok) {
        alert('Job added successfully');
        setTitle('');
        setFields([]);
        setData([]);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error submitting job:', err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Job Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-500 px-4 py-2 w-full"
          />
        </div>
        
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Fields:</h2>
          {fields.map((field, index) => (
            <div key={index} className="mb-2 flex space-x-2">
              <input
                type="text"
                placeholder="Field Name"
                value={field.name}
                onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                className="border border-gray-500 px-4 py-2"
              />
              <select
                value={field.type}
                onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                className="border border-gray-500 px-4 py-2"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
              </select>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddField}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Field
          </button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Data:</h2>
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-2 flex space-x-2">
              {fields.map((field, fieldIndex) => (
                <input
                  key={fieldIndex}
                  type="text"
                  placeholder={field.name}
                  value={row[field.name] || ''}
                  onChange={(e) =>
                    handleRowChange(rowIndex, field.name, e.target.value)
                  }
                  className="border border-gray-500 px-4 py-2"
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Row
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJob;
