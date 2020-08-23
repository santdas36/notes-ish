import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Note from "./Note";
import firebase from "firebase";
import db, { auth, provider } from "./firebase";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [user, setUser] = useState(null);

  const signin = () => {
    auth.signInWithPopup(provider).then((result) => setUser(result)).catch((err) => alert(err.message));
	console.log('usr>>', user);
  };

  const handleAdd = (event) => {
	event.preventDefault();
	if (inputVal && user) {
		setInputVal('');
    		db.collection('users').doc(user.id).collection('notes').add({
      		note: inputVal,
			time: firebase.firestore.FieldValue.serverTimestamp(),
    		});
	}
  }
  return (
  <div className="main">
   {user ? (
	<div className="app">
    		<div className="app__header">
			<img src={logo} className="app__logo" />
			<div className="app__avatar"></div>
		</div>
		<div className="app__input">
			<form>
				<textarea value={inputVal} onChange={(event) => (setInputVal(event.target.value))} placeholder="Write here..."></textarea>
				<button className="app__submit" onClick={handleAdd} type="submit">Add to Notes</button>
			</form>
		</div>
		<div className="app__notes">
		{ notes?.map((note) => (
			<Note note={note} />
		))}
		</div>
    </div> )
	: (
	<div className="login">
		<button onClick={signin}>Sign In with Google</button>
	</div>
	)}
	</div>
);
}

export default App;