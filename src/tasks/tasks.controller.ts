import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    const task = this.tasksService.create(createTaskDto);
    return {
      message: 'Tarea creada exitosamente',
      data: task,
    };
  }

  @Get()
  getTasks() {
    const tasks = this.tasksService.findAll();
    return {
      message: 'Lista de tareas',
      data: tasks,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.update(id, updateTaskDto);
    return {
      message: 'Tarea actualizada correctamente',
      data: task,
    };
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    this.tasksService.remove(id);
    return {
      message: 'Tarea eliminada correctamente',
    };
  }
}
