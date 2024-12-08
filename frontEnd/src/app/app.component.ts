import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
//   title = 'todo-app';
//   todos: todo[] = [];
  constructor() {
    // if (localStorage.getItem('todos')) {
    //   console.log(localStorage.getItem('todos'));
    //   const oldTodos: any = localStorage.getItem('todos');
    //   this.todos = JSON.parse(oldTodos);
    // }
  }

//   onSubmit(f: NgForm) {
//     console.log(f.value);
//     this.todos.push(f.value);
//     localStorage.setItem('todos', JSON.stringify(this.todos));
//     // window.location.reload();
//   }
}

export interface todo {
  _id: string;
  description: string;
  title: string;
  status: string;
  sdate: any;
  edate: any;
}
