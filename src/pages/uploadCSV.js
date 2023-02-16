import React, { useState } from 'react';
import axios from 'axios';

const UploadCSV = () => {
//   const [file, setFile] = useState(null);
    let file;

  const handleFileChange = (event) => {
    file = event.target.files[0];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('this is file', file);
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const data = JSON.stringify({
        query: `mutation {
                            uploadCSV(file: ${file})
                        }`,
      });

      const config = {
        method: 'post',
        // url: 'https://starfish-app-fzf2t.ondigitalocean.app/graphql',
        url: 'http://localhost:4000/graphql',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          console.log('line 33', JSON.stringify(response.data));
          //   setEmailDatas(response.data.data.getEmails);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload CSV</button>
    </form>
  );
};

export default UploadCSV;
