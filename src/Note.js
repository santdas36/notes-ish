import React, { useState, useRef, useEffect } from "react";
import "./Note.css";
import formatTime from "./formatTime.js";
import db from "./firebase";
import { CSSTransition } from "react-transition-group";

function Note({ note, uid, id }) {
	const [editable, setEditable] = useState("false");
	const [popIn, setPopIn] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const pInput = useRef(null);

	useEffect(() => {
		setTitle(note.title);
		setContent(note.note);
	}, [note]);

	const handleDelete = () => {
		db.collection('users').doc(uid).collection('notes').doc(id).delete();
	}

	const handleSave = () => {
		setEditable("false");
		setPopIn(false);
	}

	const handleEdit = () => {
		db.collection('users').doc(uid).collection('notes').doc(id).set({
			title: title,
			note: content
		}, {merge: true});
	}

	return (
		<div className={"note " + (editable === 'true' ? 'isEditable' : "")}>
			<div className="note__header">
				<button className="note__edit" onClick={() => {setEditable("true"); setPopIn(true);}}>Edit</button>
				<button className="note__delete" onClick={handleDelete}>Delete</button>
			</div>
			<div className="note__body">
				{note.title ? (<h2 className="note__title" contenteditable={editable}>{title}</h2>) : (<h2 className="note__title addtitle" contenteditable={editable}>Add a title</h2>) }
				<p ref={pInput} className="note__content" contenteditable={editable}>{content}</p>
				<p className="note__time">{ note.time && formatTime('%l:%M%P - %b %d', new Date(note.time.toDate())) }</p>
			</div>
			<CSSTransition in={popIn} timeout={200} classNames="footerTransition" unmountOnExit>
				<button className="note__save" onClick={handleSave}>Save</button>
			</CSSTransition>
		</div>	
	);
}

export default Note;