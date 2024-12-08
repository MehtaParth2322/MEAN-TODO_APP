import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { todo } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  private api_url: string = "http://localhost:3000/api/todo/";

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(this.api_url);
  }

  getTodosbyId(id: string){
    return this.http.get(this.api_url+ id);
  }

  addTodo(todoBody: todo) {
    return this.http.post(this.api_url, todoBody);
  }

  deleteTodo(id: string) {
    return this.http.delete(this.api_url + id);
  }

  editTodo(id: string, body: todo) {
    return this.http.patch(this.api_url + id,body);
  }
}
