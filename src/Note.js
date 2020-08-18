import "./Note.css";

function Note({ todo }) {
	return (
		<div class="note">
			<div class="note__header">
				<button class="edit">Edit</button>
				<button class="delete">Delete</button>
			</div>
			<div class="note__body">
				<h2 class="title">title</h2>
				<p class="content">{todo}</p>
				<p class="time">2.40pm Saturday</p>
			</div>
			<div class="note__footer">
				<button class="save">Save</button>
			</div>
		</div>	
	);
}

export default Note;