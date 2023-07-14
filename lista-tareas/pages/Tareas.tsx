import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Button, Container, Typography, Grid, TextField, Input } from '@mui/material';
import { styled } from '@mui/system';

interface Task {
  id: string;
  title: string;
  description: string;
}

const FormContainer = styled(Container)({
  border: '1px solid',
  borderColor: 'primary.main',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '16px',
});

const TaskContainer = styled('div')({
  border: '1px solid',
  borderColor: 'primary.main',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '16px',
});

const MarginButton = styled(Button)({
  margin: '5px',
});

const PaddedTextField = styled(TextField)({
  marginRight: '16px',
});

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
      <Typography variant="h3" component="h1" align="center" m={4}>
        App de Tareas
      </Typography>
      <Grid container spacing={2}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} key={task.id}>
              <TaskContainer>
                <Typography variant="h5" component="h3">
                  {task.title}
                </Typography>
                <Typography variant="body1" component="p">
                  {task.description}
                </Typography>
                {task.id === taskIdToEdit ? (
                  <>
                    <Input
                      type="text"
                      name="editTitle"
                      value={editTitle}
                      onChange={handleEditInputChange}
                      placeholder="Nuevo título"
                      required
                    />
                    <Input
                      type="text"
                      name="editDescription"
                      value={editDescription}
                      onChange={handleEditInputChange}
                      placeholder="Nueva descripción"
                      required
                    />
                  </>
                ) : null}
                <MarginButton variant="contained" color="error" onClick={() => deleteTask(task.id)}>
                  Eliminar
                </MarginButton>
                {task.id === taskIdToEdit ? (
                  <MarginButton variant="contained" color="success" onClick={() => updateTask(task.id)}>
                    Guardar
                  </MarginButton>
                ) : (
                  <MarginButton variant="contained" onClick={() => setTaskIdToEdit(task.id)}>
                    Modificar
                  </MarginButton>
                )}
              </TaskContainer>
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
      <FormContainer>
        <form onSubmit={addTask}>
          <PaddedTextField
            type="text"
            id="outlined-basic"
            variant="outlined"
            name="title"
            placeholder="Título"
            value={newTask.title}
            onChange={handleInputChange}
            required
          />
          <PaddedTextField
            id="outlined-basic"
            label="Descripción"
            type="text"
            variant="outlined"
            name="description"
            placeholder="Descripción"
            value={newTask.description}
            onChange={handleInputChange}
            required
          />
          <MarginButton variant="contained" color="success" type="submit">
            Agregar
          </MarginButton>
        </form>
      </FormContainer>
    </Container>
  );
};

export default Tareas;
