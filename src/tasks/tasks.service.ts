import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private id = 1;

  create(dto: CreateTaskDto): Task {
    const task: Task = { id: this.id++, ...dto };
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  update(id: number, dto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  remove(id: number): Task {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException('Task not found');
    const deleted = this.tasks[index];
    this.tasks.splice(index, 1);
    return deleted;
  }
}
