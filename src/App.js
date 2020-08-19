import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Note from "./Note";
import db, { auth, provider } from "./firebase";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [user, setUser] = useState({});
  const signin = () => {
    auth.signInWithPopup(provider).then((result) => setUser(result)).catch((err) => alert(err.message));
  };

  const handleAdd = (event) => {
	event.preventDefault();
	if (inputVal) {
     	setNotes([...notes, inputVal]);
		setInputVal('');
	}
  }
  return (
    {!user ? (
    <div className="app">
    		<div class="app__header">
			<img onClick={login} src={logo} className="app__logo" />
			<div class="app__avatar"></div>
		</div>
		<div class="app__input">
			<form>
				<textarea value={inputVal} onChange={(event) => (setInputVal(event.target.value))} placeholder="Write here..."></textarea>
				<button class="app__submit" onClick={handleAdd} type="submit">Add to Notes</button>
			</form>
		</div>
		<div class="app__notes">
		{ notes?.map((note) => (
			<Note note={note} />
		))}
		</div>
    </div> )
	: (
	<div className="login">
		<button onClick={signin}>Sign In with Google</button>
	</div>
	)
  });
}

export default App;