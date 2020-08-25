import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Note from "./Note";
import firebase from "firebase";
import db, { auth, provider } from "./firebase";
import Masonary from "react-masonary-css";

function App() {
  const [notes, setNotes] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [titleVal, setTitleVal] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    let localUser = localStorage.getItem('localUser');
    if (localUser) setUser(JSON.parse(localUser));
  }, []);

  useEffect(() => {
    if (user) {
    	db.collection('users').doc(user.uid).collection('notes').orderBy('time', 'desc').onSnapshot((snapshot) => {
		setNotes(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
		console.log(snapshot.docs[0].data());
      });
    }
  }, [user]);

  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
		setUser(result.user);
		localStorage.setItem('localUser', JSON.stringify(result.user));
	}).catch((err) => alert(err.message));
  };

  const signout = () => {
	setUser(null);
	localStorage.setItem('localUser', null);
  };

  const handleAdd = (event) => {
	event.preventDefault();
	if (inputVal && user) {
		setInputVal('');
		console.log(user);
    		db.collection('users').doc(user.uid).collection('notes').add({
			title: titleVal,
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
			<div onClick={signout} className="app__avatar"></div>
		</div>
		<div className="app__input">
			<form>
				<input className={inputVal && "input-expand"} type="text" value={titleVal} onChange={(event) => (setTitleVal(event.target.value))} placeholder="Add a title" />
				<textarea className={inputVal && "textarea-expand"} value={inputVal} onChange={(event) => (setInputVal(event.target.value))} placeholder="Write here..."></textarea>
				<button className="app__submit" onClick={handleAdd} type="submit">Add to Notes</button>
			</form>
		</div>
		<Masonry
  			breakpointCols={{default: 2, 480: 1}}
 			className="app__notes"
 			columnClassName="app__notes-column">

				{ notes?.map((note) => (
					<Note uid={user.uid} id={note.id} note={note.data} />
				))}

		</Masonary>
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