import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private blogservice: BlogsService,
    private flashmessages: FlashMessagesService
  ) {
    router.events.subscribe((val) => {
      this.checkUrl();
    });
  }
  login = false;
  checkUrl() {
    if (this.ActivatedRoute.snapshot.params.method == 'login') {
      this.login = true;
    } else if (this.ActivatedRoute.snapshot.params.method == 'signup') {
      this.login = false;
    }
  }
  password;
  username;
  submit() {
    let success;
    let data = {
      username: this.username,
      password: this.password,
    };
    if (this.login) {
      this.blogservice.checkUser(data).subscribe((data) => {
        success = data;
        if (success) {
          this.flashmessages.show('Welcome Back', {
            cssClass: 'alert alert-success',
            timeout: 2000,
          });
          // this.router.navigate(['/blogs']);
          return;
        }
      });
      this.flashmessages.show('password or username is incorrect', {
        cssClass: 'alert alert-danger',
        timeout: 2000,
      });
    } else {
      this.blogservice.postUser(data).subscribe((data) => {
        success = data;
        console.log(data);
        if (success.err) {
          this.flashmessages.show(`${success.err.message}`, {
            cssClass: 'alert alert-danger',
            timeout: 3000,
          });
        } else if (success) {
          this.flashmessages.show('Welcome', {
            cssClass: 'alert alert-success',
            timeout: 2000,
          });
          this.router.navigate(['/blogs']);
        }
      });
    }
    this.username = '';
    this.password = '';
    // if(this.ActivatedRoute.url)
    // this.blogservice.postUser(data)
  }
  ngOnInit(): void {
    this.checkUrl();
  }
}
