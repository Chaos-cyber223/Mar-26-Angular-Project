import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  searchId: string = '';

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(data => {
      this.todos = data.slice(0, 15);
    });
  }

  searchTodoById() {
    if (this.searchId) {
      this.router.navigate(['/todo', this.searchId]);
    }
  }
}
