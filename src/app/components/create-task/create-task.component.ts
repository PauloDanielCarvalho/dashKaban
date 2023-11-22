import { Component,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import {DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
export interface DialogData {
  projectId: number
}

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {

  constructor(private fb: FormBuilder, private AccountService: AccountServiceService, private router: Router, private route: ActivatedRoute, public dialogRef: DialogRef<DialogData>,
    @Inject(DIALOG_DATA) public data: DialogData) { }

  creteTask: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
  })

  onCreateTask() {
    if (this.creteTask.valid) {
      const name = this.creteTask.value.name
      const description = this.creteTask.value.description
      this.AccountService.createTask(name, "to-do", description, this.data.projectId).subscribe(({ data }: any) => {
        this.dialogRef.close();
      })
    }
  }
}
