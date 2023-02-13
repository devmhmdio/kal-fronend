import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    businessKeyword: '',
    clientKeyword: [],
  });

  const [businessKeywords, setBusinessKeywords] = useState([]);
  const [clientKeywords, setClientKeywords] = useState([]);
  const [responseData, setResponseData] = useState([]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleChangeBusiness = (event) => {
    event.preventDefault();
    setBusinessKeywords((prevState) => {
      return [...prevState, formData.businessKeyword];
    });
    setFormData({ businessKeyword: '' });
  };

  const handleChangeClient = (event) => {
    event.preventDefault();
    setClientKeywords((prevState) => [...prevState, formData.clientKeyword]);
    setFormData({ clientKeyword: [] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('this is business keywords', businessKeywords[0].toString());
    console.log('this is client keywords', clientKeywords);
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
        businessKeyword: businessKeywords[0],
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
        <button type="submit">
          Add Entry
        </button>
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
      <div>
      {responseData && (
        <div>
        <h2>Response Data:</h2>
            {responseData.map((res) => {
              return (<div>
                <p>
                  <textarea defaultValue={res.subject}>{res.subject}</textarea>
                </p>
                <p>
                  <textarea defaultValue={res.body}>{res.body}</textarea>
                </p>
              </div>)
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
