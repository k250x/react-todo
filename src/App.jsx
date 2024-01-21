import { useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form/Form';
import { TodoItem } from './components/TodoItem/TodoItem';
import { getSubheading } from './utils/getSubheading';

function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState([
		{ name: 'Zapłacone rachunki', done: false, id: 1 },
		{ name: 'Wyrzucić śmieci', done: true, id: 2 },
	]);

	function addItem(newTodoName) {
		setTodos((prevTodoes) => [
			...prevTodoes,
			{
				name: newTodoName,
				done: false,
				id: prevTodoes.at(-1).id + 1,
			},
		]);
		setIsFormShown(false);
	}

	function deleteItem(id) {
		setTodos((prevTodoes) => prevTodoes.filter((todo) => todo.id !== id));
	}

	function finishItem(id) {
		setTodos((prev) =>
			prev.map((todo) => {
				if (todo.id !== id) {
					return todo;
				}

				return {
					...todo,
					done: true,
				};
			})
		);
	}

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div>
					<h1>TODO</h1>
					<h2>{getSubheading(todos.length)}</h2>
				</div>
				{!isFormShown && (
					<button onClick={() => setIsFormShown(true)} className={styles.button}>
						+
					</button>
				)}
			</header>
			{isFormShown && <Form onFormSubmit={(newTodoName) => addItem(newTodoName)} />}
			<ul>
				{todos.map(({ id, name, done }) => (
					<TodoItem
						key={id}
						name={name}
						done={done}
						onDeleteButtonClick={() => deleteItem(id)}
						onDoneButtonClick={() => finishItem(id)}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
