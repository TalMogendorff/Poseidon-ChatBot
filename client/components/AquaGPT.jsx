import React, { useState } from "react";
import axios from "axios";

function AquaGPT({ clicked }) {
  const [prompt, setPrompt] = useState("");
  const [newPrompt, setNewPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNewPrompt(prompt);
    try {
      const res = await axios.post("http://localhost:8080/answer", {
        prompt,
      });
      const code = res.data
        .split("\n")
        .map((line) => "  " + line) // Add two spaces at the beginning of each line
        .join("\n");

      // Send the formatted code back to the client

      setResponse(`\n\`\`\`\n${code}\n\`\`\`\n`);
    } catch (error) {
      console.log(error);
    }
  };

  const onMessage = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div>
      <div className="chat-window">
        <div className="chat-header">
          <div>
            <h2>Chat with Poseidon</h2>
          </div>
          <span>x</span>
        </div>
        <div className="chat-body">
          <div className="message received">
            <p>Hello, how can I serve you today?</p>
          </div>
          {newPrompt && (
            <div className="message sent">
              <p>{newPrompt}</p>
            </div>
          )}
          {response && (
            <div className="message received">
              <p>{response}</p>
            </div>
          )}
        </div>

        <div className="chat-footer">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask Poseidon a question!"
              value={prompt}
              onChange={onMessage}
              className="input"
            />
            <button className="button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AquaGPT;
