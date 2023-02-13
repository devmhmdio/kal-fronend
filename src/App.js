import React, { useState } from 'react';
import createConnection from './config';
import getData from './config';

function App() {
  const [formData, setFormData] = useState({
    businessKeyword: '',
    clientKeyword: []
  });

  const [businessKeywords, setBusinessKeywords] = useState([]);
  const [clientKeywords, setClientKeywords] = useState([]);
  const [gettingData, setGettingData] = useState();

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeBusiness = event => {
    event.preventDefault();
    setBusinessKeywords(prevState => {
      return [...prevState, formData.businessKeyword]
    });
    setFormData({ businessKeyword: ''});
  };

  const handleChangeClient = event => {
    event.preventDefault();
    setClientKeywords(prevState => [...prevState, formData.clientKeyword]);
    setFormData({ clientKeyword: [] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    createConnection(businessKeywords[0], clientKeywords);
    setGettingData(createConnection)
    setFormData({ businessKeyword: '', clientKeyword: [] });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Business Keyword:</label>
        <input
          type="text"
          id="businessKeyword"
          name="businessKeyword"
          value={formData.businessKeyword}
          onChange={handleChange}
        />
        <button onClick={handleChangeBusiness}>Add Business Keyword</button>
        <label htmlFor="age">Client Keyword:</label>
        <input
          type="text"
          id="clientKeyword"
          name="clientKeyword"
          value={formData.clientKeyword}
          onChange={handleChange}
        />
        <button onClick={handleChangeClient}>Add Client Keyword</button>
        <br />
        <br />
        <button type="submit">Add Entry</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Business Keywords</th>
          </tr>
        </thead>
        <tbody>
          {businessKeywords.map((keyword, index) => (
            <tr key={index}>
              <td>{keyword}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Client Keywords</th>
          </tr>
        </thead>
        <tbody>
          {clientKeywords.map((keyword, index) => (
            <tr key={index}>
              <td>{keyword}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Get the create connection</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{gettingData}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
