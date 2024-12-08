import { TodoServiceService } from './../service/todo-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title = 'todo-app';
  todos: todo[] = [];
  mode = false; // add
  id: string = " ";
  submitted = false;
  checkoutForm: any;

  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private todoService: TodoServiceService,
  ) { }
  ngOnInit(): void {
    this.checkoutForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Discription: ['', Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Status: ['', Validators.required],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id'] == '') {
        this._router.navigateByUrl("/");
      }
      if (params['id']) {
        console.log(params['id']);
        this.id = params['id'];
        this.mode = true; //edit
        this.todoService.getTodosbyId(this.id).subscribe(
          (data: any) => {
            const todo: any = data;
            // console.log( );
            var date1 = new Date(todo.StartDate);
            const month = date1.getMonth() < 10 ? ('0' + (date1.getMonth() + 1)) : date1.getMonth() + 1;
            const date = date1.getDate() < 10 ? ('0' + (date1.getDate())) : date1.getDate();
            let formatted_date = date1.getFullYear() + "-" + (month) + "-" + (date)

            var date2 = new Date(todo.EndDate);
            const Endmonth = date2.getMonth() < 10 ? ('0' + (date2.getMonth() + 1)) : date2.getMonth() + 1;
            const Enddate = date2.getDate() < 10 ? ('0' + (date2.getDate())) : date2.getDate();
            let formatted_date1 = date2.getFullYear() + "-" + (Endmonth) + "-" + (Enddate)
           
            console.log(formatted_date);
            this.checkoutForm.controls['Title'].setValue(todo.Title);
            this.checkoutForm.controls['Discription'].setValue(todo.Discription);
            this.checkoutForm.controls['StartDate'].setValue(formatted_date);
            this.checkoutForm.controls['EndDate'].setValue(formatted_date1);
            this.checkoutForm.controls['Status'].setValue(todo.Status);
            console.log(data);
          }
        )

      }
    });
  }

  get formControl() {
    return this.checkoutForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      if(this.checkoutForm.value.Discription >= 20){
        alert("Discription ahd only 60 character")
      }
      if (this.checkoutForm.value.StartDate > this.checkoutForm.value.EndDate) {
        alert("Enter Valid End Date")
      } else {


        if (!this.mode) {
          this.todoService.addTodo(this.checkoutForm.value).subscribe(
            (res) => {
              console.log(res);
              setTimeout(() => {
                alert("Task Added Sucessfully");
              }, 300);
            }, (err) => {
              console.log(err);
            }
          )
        } else {
          this.todoService.editTodo(this.id, this.checkoutForm.value).subscribe(
            (res) => {
              console.log(res);
              setTimeout(() => {
                alert("Task updated Sucessfully");
              }, 300);
            }, (err) => {
              console.log(err);
            }

          );

          //this.todos[this.id] = this.checkoutForm.value; //call edit api
        }
        // localStorage.setItem('todos', JSON.stringify(this.todos));

        this._router.navigateByUrl('/');
      }
    }
  }
}


export interface todo {
  Discription: string;
  Title: string;
  Status: string;
  StartDate: string;
  EndDate: string;
}


