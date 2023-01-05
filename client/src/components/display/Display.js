import React, { useState, useEffect } from 'react';
import styles from './display.module.css'

function Desp() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000');
      const data = await response.json();
      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      {data ?(<div>
        <h1>Success!!!</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Hobby</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data[Object.keys(data)[0]]}</td>
              <td>{data[Object.keys(data)[1]]}</td>
              <td>{data[Object.keys(data)[2]]}</td>
            </tr>
          </tbody>
        </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Desp;
