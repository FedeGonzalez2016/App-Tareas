import { useEffect, useState } from 'react';

const Tareas = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks',{ mode: 'cors' }); // Ruta a tu endpoint en task.controller.ts
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      const data = await response.json();
      //setTasks([...tasks, data]);
      setNewTaskTitle('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  //const deleteTask = async (taskId) => {
  //  try {
  //    await fetch(`/api/tasks/${taskId}`, {
  //      method: 'DELETE',
  //    });
  //    const updatedTasks = tasks.filter((task) => task.id !== taskId);
  //    setTasks(updatedTasks);
  //  } catch (error) {
  //    console.error('Error deleting task:', error);
  //  }
  //};

  return (
    <div>
      <h1>App de tareas</h1>
      <h2>Lista de tareas</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task}>
              {task}
              <button>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <button onClick={addTask}>Enviar</button>
    </div>
  );
};

export default Tareas;
