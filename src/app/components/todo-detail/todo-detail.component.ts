import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  todo: Todo = new Todo(0, '', 0, false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.todoService.getTodoById(id).subscribe({
        next: (data) => {
          this.todo = data;
        },
        error: (e) => console.error(e),
      });
    } else {
      console.error('No ID provided');
    }
  }
  deleteTodo() {
    if (this.todo && this.todo.id) {
      this.todoService.deleteTodoById(this.todo.id).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        },
        error: (e) => console.error(e),
      });
    }
  }
}
