import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(['one', 'two', 'three']);
  const [inputVal, setInputVal] = useState('');
  const handleAdd = () => {
    setTodos(...todos, inputVal);
  }
  return (
    <div className="app">
    <input value={inputVal} onChange={ (event) => {setInputVal(event.target.value)} } />
<button onClick={handleAdd}>Add</button>

      <ul>
        { todos?.map(todo => {
            <li>{ todo }</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;