import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
}

const Tareas = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [taskIdToEdit, setTaskIdToEdit] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks', { mode: 'cors' });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const addTask = async (event: FormEvent) => {
    event.preventDefault();
    if (!newTask.title || !newTask.description) {
      console.error('Please enter both title and description');
      return;
    }
    try {
      await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'editTitle') {
      setEditTitle(value);
    } else if (name === 'editDescription') {
      setEditDescription(value);
    }
  };

  const updateTask = async (taskId: string) => {
    try {
      await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });
      setTaskIdToEdit('');
      setEditTitle('');
      setEditDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h1>APP - NOTAS</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {task.id === taskIdToEdit ? (
                <>
                  <input
                    type="text"
                    name="editTitle"
                    value={editTitle}
                    onChange={handleEditInputChange}
                    placeholder="Nuevo título"
                  />
                  <input
                    type="text"
                    name="editDescription"
                    value={editDescription}
                    onChange={handleEditInputChange}
                    placeholder="Nueva descripción"
                  />
                </>
              ) : null}
              <button onClick={() => deleteTask(task.id)}>Eliminar</button>
              {task.id === taskIdToEdit ? (
                <button onClick={() => updateTask(task.id)}>Guardar</button>
              ) : (
                <button onClick={() => setTaskIdToEdit(task.id)}>Modificar</button>
              )}
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
      <div>
        <form onSubmit={addTask}>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Título"
          />
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Descripción"
          ></textarea>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};

export default Tareas;
