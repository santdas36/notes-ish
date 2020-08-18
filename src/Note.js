import React, { useState } from "react";
import "./Note.css";

function Note({ todo }) {
	return (
		<div class="note">
			<div class="note__header">
				<button class="note__edit">Edit</button>
				<button class="note__delete">Delete</button>
			</div>
			<div class="note__body">
				<h2 class="note__title">title</h2>
				<p class="note__content">{todo}</p>
				<p class="note__time">2.40pm Saturday</p>
			</div>
			<div class="note__footer">
				<button class="note__save">Save</button>
			</div>
		</div>	
	);
}

export default Note;