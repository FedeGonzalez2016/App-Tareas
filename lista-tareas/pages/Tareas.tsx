import React, { useState } from 'react';
import { Container } from '@mui/material';
import { Button } from '@mui/material';

interface Tarea {
  id: number;
  titulo: string;
}

const ListaTareas: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const agregarTarea = (nuevaTarea: string) => {
    if (nuevaTarea.trim() !== '') {
      const nuevaTareaItem: Tarea = {
        id: Date.now(),
        titulo: nuevaTarea
      };

      setTareas([...tareas, nuevaTareaItem]);
    }
  };

  const eliminarTarea = (id: number) => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas);
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
            {tareas.map(tarea => (
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
// AGREGAR NUEVAS TAREAS
const EntradaTarea: React.FC<EntradaTareaProps> = ({ agregarTarea }) => {
  const [nuevaTarea, setNuevaTarea] = useState<string>('');

  const handleAgregarTarea = () => {
    if (nuevaTarea.trim() !== '') {
      agregarTarea(nuevaTarea);
      setNuevaTarea('');
    }
  };
  // RENDERIZADO DE TAREAS
  return (
    <div>
      <input type="text" value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)} />
      <button onClick={handleAgregarTarea} disabled={nuevaTarea.trim() === ''}>
        Agregar
      </button>
    </div>
  );
};

export default ListaTareas;
