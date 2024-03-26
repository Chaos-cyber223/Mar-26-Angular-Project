import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo.model';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  private todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      tap(todos => this.todos = todos),
      catchError(this.handleError<Todo[]>('getAllTodos', []))
    );
  }

  getTodoById(id: number): Observable<Todo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      catchError(this.handleError<Todo>(`getTodoById id=${id}`))
    );
  }

  deleteTodoById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      }),
      catchError(this.handleError('deleteTodoById'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
