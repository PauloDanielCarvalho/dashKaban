import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from 'src/app/service/account-service.service';
import {Dialog} from '@angular/cdk/dialog';
import { CreateProjectComponent } from 'src/app/components/create-project/create-project.component';
@Component({
  selector: 'app-prjects',
  templateUrl: './prjects.component.html',
  styleUrls: ['./prjects.component.scss']
})
export class PrjectsComponent implements OnInit {
  projectsObservable: any
  
  constructor(private AccountService: AccountServiceService, private dialog: Dialog) { }
  projects: any 
  ngOnInit(): void {
    this.AccountService.searchQuery$.subscribe((query) => {
      console.log(query)
      if (query) {
        this.AccountService.getProjectsFilters(query).subscribe(({ data }: any) => {
          
          this.projects = data.projects
          console.log(this.projects)
      })
      }
      
    })
    this.projectsObservable = this.AccountService.getProjects()
    if (this.projectsObservable) {
      this.projectsObservable.subscribe(({ data }: any) => {
        
        this.projects = data.projects
        
      })
    }
  }
  openDialog() {
    this.dialog.open(CreateProjectComponent, {
      height: '400px',
      width: '600px',
    })
  }
}
