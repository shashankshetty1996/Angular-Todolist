import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Todo } from "../models/Todo";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  todoLimits: string = "?_limit=5";

  constructor(private http: HttpClient) {}

  // Get Todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todoLimits}`);
  }

  // Delete Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add todo
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  toggleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
