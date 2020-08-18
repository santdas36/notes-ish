import React, { useState } from "react";
import "./App.css";
import Note from "./Note";

function App() {
  const [todos, setTodos] = useState(['one', 'two', 'three']);
  const [inputVal, setInputVal] = useState('');
  const handleAdd = () => {
    setTodos([...todos, inputVal]);
  }
  return (
    <div className="app">
    		<div class="app__header">
			<h1>TuDu</h1>
			<div class="avatar"></div>
		</div>
		<div class="app__input">
			<form>
				<textarea placeholder="Write here..."></textarea>
				<button class="submit" type="submit">Add to Notes</button>
			</form>
		</div>
		<div class="app__notes">
		{ todos.map((todo) => (
			<Note todo={todo} />
		))}
		</div>
    </div>
  );
}

export default App;