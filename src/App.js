import { useState, useEffect } from "react";
import "./assets/css/App.css";
import Navbar from "./components/Navbar";
import { BiTransferAlt } from "react-icons/bi";

function App() {
  const [text, setText] = useState("");
  const [lang, setLanguage] = useState("");
  const [output, setOutput] = useState({});

  async function handleLanguageSelection(event) {
    setLanguage(event.target.value);
    const response = await fetch(
      "https://translator-server-two.vercel.app/translate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_text: text,
          target_lang: event.target.value,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setOutput(data);
  }

  function handleInputTextChange(event) {
    setText(event.target.value);
  }

  // useEffect(()=>{console.log(lang);console.log(text)},[lang]);
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <div className="row">
          <div className="col">
            <div className="input-lang">
              <p>
                {JSON.stringify(output) === "{}"
                  ? "Auto Detect Language"
                  : output.source_lang}
              </p>
            </div>
            <div class="form-floating">
              <textarea
                class="input-text"
                placeholder="Enter Text"
                onChange={(e) => {
                  handleInputTextChange(e);
                }}
              ></textarea>
            </div>
          </div>
          <div className="col transfer-icon">
            <BiTransferAlt />
          </div>
          <div className="col">
            <select
              className="lang"
              aria-label="Default select example"
              onChange={(e) => {
                handleLanguageSelection(e);
              }}
            >
              <option selected>Select Language</option>
              <option value="en">English</option>
              <option value="gu">Gujarati</option>
              <option value="hi">Hindi</option>
            </select>
            <div class="form-floating">
              <textarea
                value={output.translated_text}
                class="input-text"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
