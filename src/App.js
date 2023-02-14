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
  const [subject, setSubject] = useState([]);
  const [body, setBody] = useState([]);

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
        responseData.forEach((res) => {
          setSubject(res.subject);
          setBody(res.body);
        });
        console.log('this is subject', subject)
        console.log('this is body', body)
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
          {businessKeywords.map((keyword) => (
            <span style={{paddingRight: 10 + 'px'}}>{keyword}</span>
          ))}
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
        {clientKeywords.map((keyword) => (
          <span style={{paddingRight: 10 + 'px'}}>{keyword}</span>
        ))}
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
      <div>
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
                <hr />
              </div>
            ))}
            <p>Response printed now you can send email. Go to <a href="/sendEmail">send email</a> page</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
