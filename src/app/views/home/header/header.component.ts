import { Component } from '@angular/core';
import { AccountServiceService } from 'src/app/service/account-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchValue: string = ''
  constructor(private accountService: AccountServiceService) {}
  onSearch(action: string) {
    if (action === 'click' || action === 'enter' ) {
      this.accountService.updateSearchQuery(this.searchValue)
      console.log('Valor da pesquisa:', this.searchValue);
    }
  }
}
