import React, { useState } from 'react';
import axios from 'axios';

function Prompt() {
  const [content, setContent] = useState('');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = JSON.stringify({
        query: `mutation($question: String!) {
            updatePrompt(question: $question)
            }`,
            variables: {
                question: content
            }
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
        .then(() => {
            alert('Prompt updated successfully');
        })
        .catch((error) => {
            alert(`Error updating prompt: ${error.message}`);
        });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <textarea value={content} onChange={handleContentChange} />
      </label>
      <button type="submit">Update Prompt</button>
    </form>
  );
}

export default Prompt;
