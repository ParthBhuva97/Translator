import { useState, useEffect } from "react";
import "./assets/css/App.css";
import Navbar from "./components/Navbar";
import { BiTransferAlt, BiMicrophone } from "react-icons/bi";
import { RxSpeakerLoud, RxSpeakerModerate } from "react-icons/rx";

function App() {
  const [text, setText] = useState("");
  const [lang, setLanguage] = useState("");
  const [output, setOutput] = useState({});
  const [clicked, setClicked] = useState(false);
  const [url,setUrl] = useState("");

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

  async function handleTextToSpeech(in_text,in_lang) {
    const response = await fetch("https://translator-server-two.vercel.app/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    responseType: 'blob',
    body: JSON.stringify({ text: in_text, language: in_lang }),
    });
    const data = await response.blob();
    console.log(data);
    const url = URL.createObjectURL(data);
    console.log(url);
    setUrl(url);
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
              <div
                className="speaker"
                style={
                  JSON.stringify(output) === "{}"
                    ? { display: "none" }
                    : { display: "block" }
                }
                onClick={() => {
                  setClicked(!clicked);
                  handleTextToSpeech(text,output.source_lang);
                }}
              >
                {clicked ? <RxSpeakerLoud /> : <RxSpeakerModerate />}
              </div>
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
              <div
                className="speaker"
                style={
                  JSON.stringify(output) === "{}"
                    ? { display: "none" }
                    : { display: "block" }
                }
                onClick={() => {
                  setClicked(!clicked);
                  handleTextToSpeech(output.translated_text,output.target_lang);
                }}
              >
                {clicked ? <RxSpeakerLoud /> : <RxSpeakerModerate />}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
        <audio controls src={url} autoplay="true"/>
        </div>
      </div>
    </>
  );
}

export default App;
