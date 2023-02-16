import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const UploadCSV = () => {
    const navigate = useNavigate();
    let file;
    const [csvData, setCSVData] = useState(null);
    const [columnData, setColumnData] = useState(null);
    // const [name, setName] = useState(null);
    // const [email, setEmail] = useState(null);
    let clientKeywords = [];
    const [responseData, setResponseData] = useState([]);

  const handleFileUpload = (event) => {
    file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csv = reader.result;
      setCSVData(csv);
      const parsedCSV = Papa.parse(csv, { header: true, dynamicTyping: true });
      setColumnData(parsedCSV.data);
      parsedCSV.data.forEach((d) => {
        if (typeof d['Client Keywords'] == 'string') {
          console.log('line 27',d['Client Keywords']);
          clientKeywords.push(d['Client Keywords'])
        }
      })

      const data = JSON.stringify({
        query: `mutation($businessKeyword: String!, $clientKeyword: [String!]!) {
          createConnection(input: {
              businessKeyword: $businessKeyword
              clientKeyword: $clientKeyword
          }) {
              subject
              body
          }
        }`,
        variables: {
          businessKeyword: parsedCSV.data[0]['Business Keyword'],
          clientKeyword: clientKeywords,
        },
      });

      const config = {
        method: 'post',
        url: 'https://starfish-app-fzf2t.ondigitalocean.app/graphql',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
      .then((response) => {
        console.log('line 63', response.data.data.createConnection);
        setResponseData(response.data.data.createConnection);
      })
      .catch((error) => {
        console.log(error);
      });

      // parsedCSV.data.map((rowData) => {
      //   console.log('these are names',rowData['Names']);
      //   console.log('these are emails',rowData['Emails']);
      // })
    };

    reader.onerror = () => {
      console.error('Error reading CSV file');
    };
  };

  return (
    <div>
      <input type="file" accept='.csv' onChange={handleFileUpload} />
      {csvData && (
        <table>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Subject</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((rowData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{rowData.subject}</td>
                <td>{rowData.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigate('/send')}>Send Email Page</button>
    </div>
  );
};

export default UploadCSV;
