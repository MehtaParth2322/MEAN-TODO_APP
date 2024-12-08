import { TodoServiceService } from './../service/todo-service.service';
import { Component, OnInit } from '@angular/core';
import { todo } from '../app.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  todos: any[] = [];
  mode = 0; // add
  constructor(private route: Router, private todoService: TodoServiceService) {
    this.refreshList();
  }

  ngOnInit(): void {

  }
  refreshList() {
    this.todoService.getTodos().subscribe((todos: any) => {
      console.log(todos);
      this.todos = todos;
    }, (err) => {
      console.log(err);
    })
  }
  edit(item: string) {
    console.log(item)
    // const id = this.todos.find((i) => i.title == item.title);
    this.route.navigateByUrl('/addTodo?id=' + item);
  }
  delete(item: todo) {
    const sure = confirm("Are you sure ?");
    if (sure) {
      this.todoService.deleteTodo(item._id).subscribe(
        (res) => {
          console.log(res);
          setTimeout(() => {
            alert("Task Deleted Sucessfully");
          }, 300);
          this.refreshList();
        }, (err) => {
          console.log(err);

        }
      )
    }


  }
}
