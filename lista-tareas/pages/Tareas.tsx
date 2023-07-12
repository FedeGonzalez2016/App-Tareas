//Tareas.tsx
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import axios from 'axios';

interface Tarea {
  id: number;
  titulo: string;
}

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
    <Container
      maxWidth="sm"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
    >
      <div>
        <h2>LISTA DE TAREAS</h2>
        {tareas.length > 0 ? (
          <ul>
            {tareas.map((tarea) => (
              <li key={tarea.id}>
                <span onClick={() => mostrarContenido(tarea.titulo)}>{tarea.titulo}</span>
                <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas.</p>
        )}
        <EntradaTarea agregarTarea={agregarTarea} />
      </div>
    </Container>
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
    <div>
      <input type="text" value={nuevaTarea} onChange={(e) => setNuevaTarea(e.target.value)} />
      <button onClick={handleAgregarTarea} disabled={nuevaTarea.trim() === ''}>
        Agregar
      </button>
    </div>
  );
};

export default ListaTareas;
