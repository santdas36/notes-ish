import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./Note.css";
import formatTime from "./formatTime.js";
import db from "./firebase";
import { CSSTransition } from "react-transition-group";

function Note({ note, uid, nid }) {
	const [editable, setEditable] = useState("false");
	const [popIn, setPopIn] = useState(false);
	const [hovered, setHovered] = useState(false);
	const noteInput = useRef(null);
	const titleInput = useRef(null);

	const handleDelete = () => {
		db.collection('users').doc(uid).collection('notes').doc(nid).delete();
	}

	const handleEdit = () => {
		setEditable("true");
		setPopIn(true);
		setTimeout(() => {
			titleInput.current.focus();
		}, 10);
	}

	const handleSave = () => {
		setEditable("false");
		setPopIn(false);
		db.collection('users').doc(uid).collection('notes').doc(nid).set({
			title: titleInput.current.innerText,
			note: noteInput.current.innerText
		}, {merge: true});
	}

	return (
		<motion.div initial={{ scale: 0.8, opacity: 0}} animate={{ scale: 1, opacity: 1}} exit={{ scale: 0.8, opacity: 0}} className={"note " + (editable === 'true' ? 'isEditable hovered ' : "") + (hovered ? 'hovered' : "")} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
			<CSSTransition in={hovered || popIn} timeout={200} classNames="footerTransition" unmountOnExit>
				<div className="note__header">
					<button className="note__edit" onClick={handleEdit}>Edit</button>
					<button className="note__delete" onClick={handleDelete}>Delete</button>
				</div>
			</CSSTransition>
			<div className="note__body">
				{note.title ? (<h2 ref={titleInput} className="note__title" contenteditable={editable}>{note.title}</h2>) : (<h2 ref={titleInput} className="note__title addtitle" contenteditable={editable} onClick={handleEdit}>Add a title</h2>) }
				<p ref={noteInput} className="note__content" contenteditable={editable}>{note.note}</p>
				<p className="note__time">{ note.time && formatTime('%l:%M%P - %b %d', new Date(note.time.toDate())) }</p>
			</div>
			<CSSTransition in={popIn} timeout={200} classNames="footerTransition" mountOnEnter unmountOnExit>
				<button className="note__save" onClick={handleSave}>Save</button>
			</CSSTransition>
		</motion.div>	
	);
}

export default Note;