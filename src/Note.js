import React from "react";
import "./Note.css";
import formatTime from "./formatTime.js";
import db from "./firebase";

function Note({ note, uid, id }) {
	const handleDelete = () => {
		db.collection('users').doc(uid).collection('notes').doc(id).delete();
	}

	return (
		<div className="note">
			<div className="note__header">
				<button className="note__edit" onClick={(event) => console.log(event)}>Edit</button>
				<button className="note__delete" onClick={handleDelete}>Delete</button>
			</div>
			<div className="note__body">
				<h2 className="note__title">{note.note}</h2>
				<p className="note__content">note</p>
				<p className="note__time">{ note.time && formatTime('%l:%M%P - %b %d', new Date(note.time.toDate())) }</p>
			</div>
			<div className="note__footer">
				<button className="note__save">Save</button>
			</div>
		</div>	
	);
}

export default Note;