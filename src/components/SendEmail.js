import React, { useEffect, useState } from 'react';
import './SendEmail.css';
import axios from 'axios';

const SendEmail = () => {
  const [emailDatas, setEmailDatas] = useState([]);
  const d = [{ name: '', email: '' }];

  useEffect(() => {
    const data = JSON.stringify({
      query: `query {
                getEmails {
                    subject
                    body
                    name
                    emailId
                }
              }`,
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
        console.log('line 33', response.data.data.getEmails);
        setEmailDatas(response.data.data.getEmails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formFieldsArray = Array.from({ length: emailDatas.length }, () => [
    ...d,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let name = [];
    let email = [];
    let emailSubject = [];
    let emailBody = [];
    let o = [];
    console.log(JSON.stringify(formFieldsArray))
    for (let i = 0; i <= event.target.length - 1; i++) {
        if (event.target[i].name === 'name') {
          name.push(event.target[i].value)
      }
      if (event.target[i].name === 'email') {
        email.push(event.target[i].value)
      }
      if (event.target[i].name === 'subject') {
          emailSubject.push(event.target[i].value)
      }
      if (event.target[i].name === 'body') {
          emailBody.push(event.target[i].value)
      }
    }
    for (let j = 0;j<=name.length-1 && j<=email.length;j++) {
        o.push(formFieldsArray[j][0] = {subject: emailSubject[j], body: emailBody[j], name: name[j], email: email[j]})
    }

    for(let i=0;i<=o.length-1;i++) {
        const data = JSON.stringify({
            query: `mutation($subject: String!, $body: String!, $name: String!, $email: String!) {
                      sendEmail(input: [{
                        subject: $subject
                        body: $body
                        name: $name
                        toEmail: $email
                    }])
                    }`,
                    variables: {
                        subject: o[i].subject,
                        body: o[i].body,
                        name: o[i].name,
                        email: o[i].email
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
              console.log('line 33', response.data.data.sendEmail);
            //   setEmailDatas(response.data.data.getEmails);
            })
            .catch((error) => {
              console.log(error);
            });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table className="table">
          <thead>
            <tr>
              <td>S. No.</td>
              <td>Subject</td>
              <td>Body</td>
              <td>Name</td>
              <td>Email Id</td>
            </tr>
          </thead>
          <tbody>
            {emailDatas.map((each, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <textarea
                    id={`subject-${index}`}
                    name="subject"
                    defaultValue={each.subject}
                  ></textarea>
                </td>
                <td>
                  <textarea
                    id={`body-${index}`}
                    name="body"
                    defaultValue={each.body}
                    cols={50}
                    rows={5}
                  ></textarea>
                </td>
                <td>
                  <input
                    type="text"
                    id={`name-${index}`}
                    name="name"
                    value={each.name}
                  ></input>
                </td>
                <td>
                  <input
                    type="text"
                    id={`email-${index}`}
                    name="email"
                    value={each.emailId}
                  ></input>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Send Emails</button>
      </form>
    </div>
  );
};

export default SendEmail;
