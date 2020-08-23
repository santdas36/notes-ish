import React, { useState } from "react";
import "./Note.css";

function Note({ note }) {
	return (
		<div className="note">
			<div className="note__header">
				<button className="note__edit">Edit</button>
				<button className="note__delete">Delete</button>
			</div>
			<div className="note__body">
				<h2 className="note__title">{note.note}</h2>
				<p className="note__content">note</p>
				<p className="note__time">{new Date(note.note}</p>
			</div>
			<div className="note__footer">
				<button className="note__save">Save</button>
			</div>
		</div>	
	);
}

export default Note;