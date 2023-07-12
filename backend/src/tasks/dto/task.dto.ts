import { TaskStatus } from "../task.entity"

//task.dto.ts
// SIRVE PARA DETALLAR LOS DATOS QUE ESTAN LLEGANDO AL BACKEND
export class CreateTaskDto {
    title: string
    description: string
}

export class UpdateTaskDto {
    title?: string // EL SIGNO DE INTERROGACION SIGNIFICA QUE EL ARGUMENTO ES OPCIONAL
    description?: string
    status?: TaskStatus
}