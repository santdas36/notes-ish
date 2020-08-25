import React, { useState } from "react";
import "./Note.css";
import formatTime from "./formatTime.js";
import db from "./firebase";
import { CSSTransition } from "react-transition-group";

function Note({ note, uid, id }) {
	const [editable, setEditable] = useState("false");
	const [title, setTitle] = useState('');
	console.log('yo >>>',editable);
	const handleDelete = () => {
		db.collection('users').doc(uid).collection('notes').doc(id).delete();
	}

	const handleSave = () => {
		setEditable("false");
	}

	return (
		<div className={"note " + (editable === 'true' ? 'isEditable' : "")}>
			<div className="note__header">
				<button className="note__edit" onClick={() => setEditable("true")}>Edit</button>
				<button className="note__delete" onClick={handleDelete}>Delete</button>
			</div>
			<div className="note__body">
				<h2 className="note__title" contenteditable={editable}>{note.note}</h2>
				<p className="note__content" contenteditable={editable}>note</p>
				<p className="note__time">{ note.time && formatTime('%l:%M%P - %b %d', new Date(note.time.toDate())) }</p>
			</div>
			{editable ==='true' && 
			(<CSSTransition in={editable} timeout={200} classNames="footerTransition">
				<div className="note__footer">
					<button className="note__save" onClick={handleSave}>Save</button>
				</div>
			</CSSTransition> )}
		</div>	
	);
}

export default Note;