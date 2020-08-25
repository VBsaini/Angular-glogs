import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  valid = false;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private blogservice: BlogsService,
    private FlashMessagesService: FlashMessagesService
  ) {
    router.events.subscribe((val) => {
      this.blogservice.isValid().subscribe((data) => {
        if (data.user) {
          this.valid = true;
        } else {
          this.valid = false;
        }
        this.data = data;
      });
    });
  }
  data;
  logout() {
    this.blogservice.logout();
    this.FlashMessagesService.show('logout successful', {
      cssClass: 'alert alert-success',
      timeout: 2000,
    });
    this.router.navigate(['/user/login']);
  }
  ngOnInit(): void {
    this.blogservice.isValid().subscribe((data) => {
      if (data.user) {
        this.valid = true;
      } else {
        this.valid = false;
      }
    });
  }
}
