const axios = require('axios');
const createConnection = async (businessKeyword, clientKeyword) => {
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
      businessKeyword: `${businessKeyword}`,
      clientKeyword: `${clientKeyword}`,
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
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = createConnection;
