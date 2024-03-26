// src/app/models/todo.model.ts
export class Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;

  constructor(id: number, title: string, userId: number, completed: boolean) {
    this.id = id;
    this.title = title;
    this.userId = userId;
    this.completed = completed;
  }
}
