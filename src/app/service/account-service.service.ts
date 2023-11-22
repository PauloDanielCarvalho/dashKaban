import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchQuerySubject.asObservable();
  
 

  constructor(private apollo: Apollo) { }

  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query);
  }
  signin(email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
      mutation signin($email: String!, $password: String!) {
        signin(email: $email, password: $password) {
          token
          user {
            name
          }
        }
      }
    `,
      variables: { email, password }
    })
  }
  signup (name: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation  {
          signup(email: "${email}", password: "${password}", name: "${name}") {
            token
          }
        }
      `
    })
  }

  getProjects() {
    return this.apollo.query({
      query: gql`
      query GetProjects {
        projects {
          
          id
          name
          description
        }
      }
    `
    })
  }
  getProjectsFilters(matching: string) {
    const filterObj = { matching: matching }
    return this.apollo.query({
      query: gql`
      query  {
        projects(filter:{ matching: "${matching}" }) {
          id
          name
          description
        }
      }
    `,
    variables: {filterObj}
    })
  }

  getTask(project_id: number) {
    return this.apollo.query({
      query: gql`
      query {
        tasks(project_id: ${project_id}) {
          id
          name
          status
          description
        }
      }
      `
    })
  }

  changeStatusTask(taskId: number, status: string) {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        change_task(task_id: ${taskId}, new_status: "${status}") {
          id
          name
          description
        }
      }

      `
    })
  }

  createProject(name: string, description:string, creationDate: Date) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        create_project(name: "${name}", description: "${description}", creation_date: "${creationDate}"){
          id
        }
      }
      `
    })
  }
  createTask(name: string, status: string, description: string, projectId: number) {
    return this.apollo.mutate({
      mutation: gql`
      mutation{
        create_task(name: "${name}", status: "${status}",description: "${description}",project_id: ${projectId} ){
          id
        }
      }
      `
    })
  }

  subscribeToUpdates(projectId: Number) {
    return this.apollo.subscribe({
      query: gql`
      subscription{
        task_change(project_id: ${projectId}) {
          id
          name
          status
          description
        }
      }
      `
    })
  }
}
