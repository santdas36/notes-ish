import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Note from "./Note";
import { db, auth, provider } from "./firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const login = () => {
    auth.signInWithPopup(provider).then((result) => console.log(result)).catch((err) => alert(err.message));
  };

  const handleAdd = (event) => {
	event.preventDefault();
	if (inputVal) {
     	setTodos([...todos, inputVal]);
		setInputVal('');
	}
  }
  return (
    <div className="app">
    		<div class="app__header">
			<img ocClick={login} src={logo} className="app__logo" />
			<div class="app__avatar"></div>
		</div>
		<div class="app__input">
			<form>
				<textarea value={inputVal} onChange={(event) => (setInputVal(event.target.value))} placeholder="Write here..."></textarea>
				<button class="app__submit" onClick={handleAdd} type="submit">Add to Notes</button>
			</form>
		</div>
		<div class="app__notes">
		{ todos?.map((todo) => (
			<Note todo={todo} />
		))}
		</div>
    </div>
  );
}

export default App;