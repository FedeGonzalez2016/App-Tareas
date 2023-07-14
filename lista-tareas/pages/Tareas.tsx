import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';

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
    <Container maxWidth="sm">
      <Typography variant="h3" component="h1" align="center">
        Lista de Tareas
      </Typography>
      <Grid container spacing={2}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <Typography variant="h5" component="h3">
                {task.title}
              </Typography>
              <Typography variant="body1" component="p">
                {task.description}
              </Typography>
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
              <Button variant="contained" onClick={() => deleteTask(task.id)}>
                Eliminar
              </Button>
              {task.id === taskIdToEdit ? (
                <Button variant="contained" onClick={() => updateTask(task.id)}>
                  Guardar
                </Button>
              ) : (
                <Button variant="contained" onClick={() => setTaskIdToEdit(task.id)}>
                  Modificar
                </Button>
              )}
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" component="p">
              No hay tareas disponibles.
            </Typography>
          </Grid>
        )}
      </Grid>
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
          <Button variant="contained" type="submit">
            Agregar
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Tareas;

