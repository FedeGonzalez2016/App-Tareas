import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

interface Tarea {
  id: number;
  titulo: string;
}

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledTitle = styled(Typography)({
  fontSize: '2rem',
  color: 'black',
  fontFamily: 'Roboto',
  marginBottom: '1rem', // Espacio inferior entre el título y el párrafo
});

const StyledParagraph = styled(Typography)({
  marginBottom: '1rem', // Espacio inferior entre el párrafo y el cuadro de ingreso de texto
});

const StyledButton = styled(Button)({
  backgroundColor: 'blue',
  color: 'white',
});

const StyledTextField = styled(TextField)({
  borderRadius: '8px',
  width: '300px',
  margin: '10px',
});

const StyledInputContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const ListaTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get('/api/tareas');
        setTareas(response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    obtenerTareas();
  }, []);

  const agregarTarea = async (nuevaTarea: string) => {
    if (nuevaTarea.trim() !== '') {
      try {
        const response = await axios.post('/api/tareas', { titulo: nuevaTarea });
        const nuevaTareaItem: Tarea = response.data;
        setTareas([...tareas, nuevaTareaItem]);
      } catch (error) {
        console.error('Error al agregar la tarea:', error);
      }
    }
  };

  const eliminarTarea = async (id: number) => {
    try {
      await axios.delete(`/api/tareas/${id}`);
      const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
      setTareas(tareasActualizadas);
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const mostrarContenido = (contenido: string) => {
    alert(contenido);
  };

  return (
    <StyledContainer maxWidth="sm">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <StyledTitle variant="h2">Lista de Tareas</StyledTitle>
        {tareas.length > 0 ? (
          <ul>
            {tareas.map((tarea) => (
              <li key={tarea.id}>
                <span onClick={() => mostrarContenido(tarea.titulo)}>{tarea.titulo}</span>
                <StyledButton onClick={() => eliminarTarea(tarea.id)}>Eliminar</StyledButton>
              </li>
            ))}
          </ul>
        ) : (
          <StyledParagraph>No hay tareas.</StyledParagraph>
        )}
        <EntradaTarea agregarTarea={agregarTarea} />
      </div>
    </StyledContainer>
  );
};

interface EntradaTareaProps {
  agregarTarea: (tarea: string) => void;
}

const EntradaTarea: React.FC<EntradaTareaProps> = ({ agregarTarea }) => {
  const [nuevaTarea, setNuevaTarea] = useState<string>('');

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      agregarTarea(nuevaTarea);
      setNuevaTarea('');
    }
  };

  return (
    <StyledInputContainer>
      <StyledTextField
        variant="outlined"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Agregar tarea"
      />
      <StyledButton
        variant="contained"
        onClick={handleAgregarTarea}
        disabled={nuevaTarea.trim() === ''}
      >
        Agregar
      </StyledButton>
    </StyledInputContainer>
  );
};

export default ListaTareas;
