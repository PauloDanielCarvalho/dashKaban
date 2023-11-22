import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountServiceService } from 'src/app/service/account-service.service';
import { Router } from '@angular/router';
import { DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {
  

  constructor(private fb: FormBuilder, private AccountService: AccountServiceService, private router: Router, public dialogRef: DialogRef) { }
  
  creteProject: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    creationDate: ['', [Validators.required]]
  })

  onCreateProject() {
    if (this.creteProject.valid) {
      const name = this.creteProject.value.name
      const description = this.creteProject.value.description
      const creationDate = this.creteProject.value.creationDate
      this.AccountService.createProject(name, description, creationDate).subscribe(({ data }: any) => {
        const projectId = data.create_project.id;
        this.dialogRef.close();
        this.router.navigate([`/home/dashboard/${projectId}`])
      })
    }
    
  }
}
