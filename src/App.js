import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Form, Button} from 'react-bootstrap';

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
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <div>
          <div><Form.Label htmlFor="name">Business Keyword:</Form.Label></div>
        <div><Form.Control
          type="text"
          id="businessKeyword"
          name="businessKeyword"
          value={formData.businessKeyword}
          onChange={handleChange}
        /> 
        <Button variant="dark" onClick={handleChangeBusiness}>Add Business Keyword</Button>
        </div>
        </div></Form.Group>

        <div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <div><Form.Label htmlFor="age">Client Keyword:</Form.Label></div>
        <div><Form.Control
          type="text"
          id="clientKeyword"
          name="clientKeyword"
          value={formData.clientKeyword}
          onChange={handleChange}
        /></div><Button variant="dark" onClick={handleChangeClient}>Add Client Keyword</Button>
        </Form.Group>
        </div>

        <br />
        <div><Button variant="dark" type="submit">
          Generate
        </Button>
        </div>
        
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
      {console.log('line 128', responseData.map((res) => {
        console.log(res)
        return res
      }))}
      {responseData && (
        <div>
        <h2>Response Data:</h2>
            {responseData.map((res) => (
              <div>
                <p>Subject:
                  <textarea defaultValue={res.subject} rows={3} cols={100}></textarea>
                </p>
                <p>Body:
                  <textarea defaultValue={res.body} rows={10} cols={100}></textarea>
                </p>
                Enter email id: <input type={"text"}></input>
                <button>Send Email</button>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
