import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/implementations/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public identity: any;
  public token: any;

  constructor(private _authService: AuthService) {
    this.identity = this._authService.getIdentity();
    this.token = this._authService.getToken();
  }

  ngOnInit(): void {

  }
}
