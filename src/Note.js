import React, { useState, useRef, useEffect } from "react";
import "./Note.css";
import formatTime from "./formatTime.js";
import db from "./firebase";
import { CSSTransition } from "react-transition-group";

function Note({ note, uid, id }) {
	const [editable, setEditable] = useState("false");
	const [popIn, setPopIn] = useState(false);
	const noteInput = useRef(null);
	const titleInput = useRef(null);

	const handleDelete = () => {
		db.collection('users').doc(uid).collection('notes').doc(id).delete();
	}

	const handleEdit = () => {
		setEditable("true");
		setPopIn(true);
		setTimeout(() => {
			titleInput.current.focus();
			titleInput.current.selectionStart = titleInput.current.innerText.length;
			titleInput.current.selectionEnd = titleInput.current.innerText.length; 
		}, 10);
	}

	const handleSave = () => {
		setEditable("false");
		setPopIn(false);
		db.collection('users').doc(uid).collection('notes').doc(id).set({
			title: titleInput.current.innerText,
			note: noteInput.current.innerText
		}, {merge: true});
	}

	return (
		<div className={"note " + (editable === 'true' ? 'isEditable' : "")}>
			<div className="note__header">
				<button className="note__edit" onClick={handleEdit}>Edit</button>
				<button className="note__delete" onClick={handleDelete}>Delete</button>
			</div>
			<div className="note__body">
				{note.title ? (<h2 ref={titleInput} className="note__title" contenteditable={editable}>{note.title}</h2>) : (<h2 ref={titleInput} className="note__title addtitle" contenteditable={editable} onClick={handleEdit}>Add a title</h2>) }
				<p ref={noteInput} className="note__content" contenteditable={editable}>{note.note}</p>
				<p className="note__time">{ note.time && formatTime('%l:%M%P - %b %d', new Date(note.time.toDate())) }</p>
			</div>
			<CSSTransition in={popIn} timeout={200} classNames="footerTransition" unmountOnExit>
				<button className="note__save" onClick={handleSave}>Save</button>
			</CSSTransition>
		</div>	
	);
}

export default Note;