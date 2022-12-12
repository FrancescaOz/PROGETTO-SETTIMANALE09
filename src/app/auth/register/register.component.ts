import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router:Router) { }

  ngOnInit(): void {}

  async login(form: NgForm) {
    try {
      await this.authSrv.register(form.value).toPromise();
      this.router.navigate(['/login'])
    } catch (error) {
      alert('error')
    }
  }
}
