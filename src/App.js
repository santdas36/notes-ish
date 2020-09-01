import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import avatar from "./assets/user.png";
import "./App.css";
import Note from "./Note";
import firebase from "firebase";
import db, { auth, provider } from "./firebase";
import { CSSTransition } from "react-transition-group";

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
	console.log(user);
    	db.collection('users').doc(user.uid).collection('notes').orderBy('time', 'desc').onSnapshot((snapshot) => {
		setNotes(snapshot.docs.map((doc) => ({id: doc.id, data: doc.data()})));
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
    		db.collection('users').doc(user.uid).collection('notes').add({
			title: titleVal,
      		note: inputVal,
			time: firebase.firestore.FieldValue.serverTimestamp(),
    		});
		setInputVal('');
		setTitleVal('');
	}
  }
  return (
  <div className="main">
   {user ? (
	<div className="app">
    		<div className="app__header">
			<img src={logo} className="app__logo" />
			<div onClick={signout} className="app__avatar">
				<div><h6>{user.display_name}</h6><p>SignOut</p></div>
				<img src={user.photoURL || avatar} alt="userAvatar" />
			</div>
		</div>
		<div className="app__input">
			<form>
				<input className={inputVal && "input-expand"} type="text" value={titleVal} onChange={(event) => (setTitleVal(event.target.value))} placeholder="Add a title" />
				<textarea className={inputVal && "textarea-expand"} value={inputVal} onChange={(event) => (setInputVal(event.target.value))} placeholder="Write here..."></textarea>
				<button className="app__submit" onClick={handleAdd} type="submit">Add to Notes</button>
			</form>
		</div>
		<div className="app__notes">
				{ notes?.map((note) => (
					<CSSTransition in={true} appear={true} timeout={300} classNames="footerTransition">
						<Note uid={user.uid} id={note.id} note={note.data} />
					</CSSTransition>
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