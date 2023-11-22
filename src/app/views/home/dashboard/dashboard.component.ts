import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { CreateTaskComponent } from 'src/app/components/create-task/create-task.component';

enum TaskStatus {
  ToDo = 'to-do',
  InProgress = 'in-progress',
  Done = 'done',
}

interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(
    private accountService: AccountServiceService,
    private route: ActivatedRoute,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['projectId'];
    this.loadTasks(projectId);
    this.subscribeToUpdates(projectId);
  }

  private loadTasks(projectId: number): void {
    this.accountService.getTask(projectId).subscribe(({ data }: any) => {
      if (data.tasks.length > 0) {
        this.organizeTasksByStatus(data.tasks);
      }
    });
  }

  private subscribeToUpdates(projectId: number): void {
    this.accountService.subscribeToUpdates(projectId).subscribe(({ data }: any) => {
      const task: Task = this.convertToTask(data.task_change);
      let foundTask: Task | undefined;

      for (const array of [this.todo, this.inProgress, this.done]) {
        foundTask = array.find(taskData => taskData.id == task.id);
        if (foundTask) break;
      }
      
      if (!foundTask) {
        this.organizeTasksByStatus([task]);
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.syncTasks(event.container.data[event.previousIndex]);
    }
  }

  syncTasks(task: Task) {
    for (const array of [this.todo, this.inProgress, this.done]) {
      const foundTask = array.find(taskData => task && taskData.id == task.id);
      if (foundTask) {
        this.accountService.changeStatusTask(foundTask.id, this.getTaskStatusForArray(array)).subscribe(() => {});
      }
    }
  }

  openDialog() {
    const projectId = this.route.snapshot.params['projectId'];
    this.dialog.open(CreateTaskComponent, {
      height: '400px',
      width: '600px',
      data: { projectId: projectId }
    });
  }

  organizeTasksByStatus(data: Task[]) {
    for (let task of data) {
      switch (task.status) {
        case TaskStatus.ToDo:
          this.todo.push(task);
          break;
        case TaskStatus.InProgress:
          this.inProgress.push(task);
          break;
        case TaskStatus.Done:
          this.done.push(task);
          break;
      }
    }
  }

  convertToTask = (obj: any): Task => {
    return {
      id: parseInt(obj.id),
      name: obj.name,
      status: obj.status,
      description: obj.description,
    };
  };

  private getTaskStatusForArray(array: Task[]): TaskStatus {
    if (array === this.todo) {
      return TaskStatus.ToDo;
    } else if (array === this.inProgress) {
      return TaskStatus.InProgress;
    } else if (array === this.done) {
      return TaskStatus.Done;
    } else {
      throw new Error('Invalid task array.');
    }
  }
}
