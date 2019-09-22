import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';

import { TaskState } from '../store/reducers';
import { getTaskSelector } from '../store/selector';
import { ftTaskModel } from '../shared/task.model';
import { HelperService } from '../shared/helper.service';
import { HelperText, TaskAction } from '../shared/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('frame', {static: true}) frameModal: ModalDirective;
  private allTodoList: ftTaskModel[] = [];
  private allDoneList: ftTaskModel[];
  todo: ftTaskModel[] = [];
  done: ftTaskModel[];
  newTask: ftTaskModel = new ftTaskModel();
  loaded: boolean = false;
  taskAction = TaskAction;
  currentDate = new Date();
  counter: number = 0;
  taskForm = new FormGroup({
    taskAction: new FormControl('', Validators.required),
    taskTitle: new FormControl('', Validators.required),
    taskDate: new FormControl(this.currentDate, Validators.required),
    taskDescription: new FormControl('', Validators.required)
  });


  constructor( private store: Store<TaskState>,
               private helperService: HelperService) { }

  ngOnInit() {
    this.getTaskList();
  }

  ngAfterViewInit() {
    this.showModal();
  }

  private getTaskList() {
    this.store.select(getTaskSelector)
      .subscribe ((taskList) => {
        if (taskList && taskList.length) {
          this.todo = taskList.filter(item => item.status === HelperText.statusNew);
          this.done = taskList.filter(item => item.status === HelperText.statusCompleted);
          this.allTodoList = this.todo;
          this.allDoneList = this.done;
          this.loaded = true;
        }
      });
  }

  drop(event: CdkDragDrop<ftTaskModel[]>) {
    transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    const completedTask = event.container.data.map(item => {
      item.status = HelperText.statusCompleted;
      return item;
    });
    this.store.dispatch({type: 'GetTaskList', payload: [...completedTask, ...event.previousContainer.data]});
    this.helperService.openSnackBar(HelperText.task, HelperText.statusCompleted);
  }

  addNewTask(task) {
    if (!task.status) {
      task.id = this.counter;
      this.counter++;
      task.status = HelperText.statusNew;
      this.allTodoList.push(...[task]);
      this.newTask = new ftTaskModel();
      this.store.dispatch({type: 'GetTaskList', payload: this.allTodoList});
      this.helperService.openSnackBar(HelperText.newTask, HelperText.added);
    } else {
      this.updateTaskList(task);
    }
  }

  filterTask(value) {
    if (value !== 'none') {
      this.todo = this.allTodoList.filter(item => item.action === value);
      this.done = this.allDoneList.filter(item => item.action === value);
      (this.todo.length || this.done.length) ?
        this.helperService.openSnackBar(HelperText.task, HelperText.taskFilter) :
        this.resetAllTasks();
    } else {
      this.resetAllTasks();
    }
  }

  resetAllTasks() {
    this.helperService.openSnackBar(HelperText.taskNotFound, HelperText.error);
    this.getTaskList();
  }

  openDialog(task) {
    this.newTask = Object.assign({}, task);
    this.showModal();
  }

  showModal(): void {
    this.frameModal.show();
  }

  updateTaskList(updatedTask) {
    const updatedTaskIndex = this.allTodoList.findIndex(item => item.id === updatedTask.id);
    this.allTodoList[updatedTaskIndex] = updatedTask;
    this.store.dispatch({type: 'GetTaskList', payload: this.allTodoList});
    this.helperService.openSnackBar(HelperText.task, HelperText.updateTask);
  }
}
