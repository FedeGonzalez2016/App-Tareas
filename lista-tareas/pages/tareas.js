import { useEffect, useState } from 'react';

const Tareas = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks',{ mode: 'cors' });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div>
      <h1>App de tareas</h1>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <button>Modificar</button>
              <button>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </ul>
      <button>Agregar</button>
    </div>
  );
};

export default Tareas;
