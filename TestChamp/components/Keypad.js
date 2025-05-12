import React, { useState } from 'react';

const NumPadInput = () => {
  const [screenValue, setScreenValue] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setScreenValue('');
    } else {
      setScreenValue(prev => prev + value);
    }
  };

  const buttons = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'C']
  ];

  return (
    <div id="input-response" className="block"> {/* Remove 'hide' if you want it visible */}
      <div id="input-field" className="mb-4">
        <input
          type="text"
          placeholder="Enter your value"
          id="input-value"
          value={screenValue}
          readOnly
          className="border p-2 rounded w-full"
        />
      </div>
      <div id="key-pad">
        <table className="mx-auto">
          <tbody>
            {buttons.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((btn, colIndex) => (
                  <td key={colIndex}>
                    <button
                      onClick={() => handleClick(btn)}
                      className="num-pad-btn border m-1 p-3 rounded bg-gray-200 hover:bg-gray-300"
                    >
                      {btn}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NumPadInput;
