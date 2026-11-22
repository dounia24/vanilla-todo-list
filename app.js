const STORAGE_KEY = 'todos';
const input = document.querySelector('#new-todo');
const addButton = document.querySelector('#add-todo');
const list = document.querySelector('#todo-list');

let todos = [];

// LST
function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
	console.log('Tâches sauvegardées :', todos);
}

function createTodoElement(todo) {
	const item = document.createElement('li');
	item.classList.add('todo-item');

	const label = document.createElement('span');
	label.textContent = todo.text;

	const checkButton = document.createElement('button');

	if (todo.done) {
		item.classList.add('done');
		checkButton.textContent = 'À faire';
	} else {
		checkButton.textContent = 'Terminée';
	}

	checkButton.addEventListener('click', () => {
		todo.done = !todo.done;
		console.log('Statut changé :', todo);
		item.classList.toggle('done');

		if (todo.done) {
			checkButton.textContent = 'À faire';
		} else {
			checkButton.textContent = 'Terminée';
		}

		saveTodos();
	});

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'Supprimer';

	deleteButton.addEventListener('click', () => {
		const index = todos.indexOf(todo);

		if (index !== -1) {
			todos.splice(index, 1);
		}

		console.log('Tâche supprimée :', todo.text);
		item.remove();
		saveTodos();
	});

	item.append(label, checkButton, deleteButton);

	return item;
}

function addTodo() {
	const text = input.value.trim();

	if (text === '') {
		return;
	}

	const todo = { text: text, done: false };
	todos.push(todo);
	console.log('Tâche ajoutée :', todo);
	list.append(createTodoElement(todo));

	input.value = '';
	saveTodos();
}
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM chargé, application prête');
	addButton.addEventListener('click', addTodo);

	input.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
			addTodo();
		}
	});
});
//STORAGE_KEY = le nom de la clé.
//setItem = sauvegarder.
//getItem = récupérer.
//JSON.stringify = convertir en string.
//JSON.parse = reconvertir en JavaScript.
