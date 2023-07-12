//task.entity.ts
export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

// NOS AYUDARIA A DEFINIR MODELOS EN NUESTRA BASE DE DATOS

export class Task {
    id : string;
    title : string;
    description : string;
    status : TaskStatus;
}

// PARA QUE SIRVE LAS ENTIDADES???
// SIRVEN PARA DEFINIR DATOS Y GENERAR LAS TABLAS EN LAS BASES DE DATOS, RELACIONADO CON LAS TYPEORM

//const task = new Task()
// task.description
// task.id
// task.status
// task.title