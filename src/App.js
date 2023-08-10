import { useState } from 'react';
import './App.css';

function TextArea(props) {

  function handleChange(event) {
    props.onChange(props.name, event.target.value)
  }

  return (
      <textarea placeholder={props.defaultText} onChange={handleChange} value={props.jsonString}></textarea>
  );
}

function App() {
  const [state, setState] = useState({
    originalJson:"",
    formattedJson:""
  })

  function changeValue(name, value) {
    setState(prevState => ({
      [name]: value,
      formattedJson: format(value)
    }));
  }

  function format(value) {
    if (value === "") return "";
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch (e) {
      return "Invalid Json"
    }
  }

  function copy() {
    navigator.clipboard.writeText(state.formattedJson)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TextArea onChange={changeValue} name="originalJson" jsonString={state.originalJson} defaultText="Paste your unformatted Json here"/>
          <TextArea onChange={()=>{}} name="formattedJson" jsonString={state.formattedJson} defaultText="This is where your new Json will print"/>
        </div>
        <button onClick={copy}>Copy new JSON</button>
      </header>
    </div>
  );
}

export default App;
