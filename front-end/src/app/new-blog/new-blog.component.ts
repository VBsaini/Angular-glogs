import { Component, OnInit } from '@angular/core';
import { Blogs } from '../shared/blogs-interface';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BlogsService } from '../blogs.service';
@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css'],
})
export class NewBlogComponent implements OnInit {
  constructor(
    private BlogsService: BlogsService,
    private router: Router,
    private FlashMessagesService: FlashMessagesService
  ) {}
  name: string;
  heading: string;
  content: string;
  imageUrl: string;
  id: number;
  contentChange(value: string) {
    this.content = value;
  }
  headingChange(value: string) {
    this.heading = value;
  }
  imageUrlChange(value: string) {
    this.imageUrl = value;
  }
  ngOnInit(): void {
    this.getId();
    this.getuser();
  }
  getId() {
    this.BlogsService.getBlogs().subscribe((data) => {
      this.id = data.length + 1;
    });
  }
  getuser() {
    this.BlogsService.isValid().subscribe((data) => {
      this.name = data.user.username;
    });
  }
  Submit() {
    this.getId();
    if (this.content.length < 3) {
      this.FlashMessagesService.show('content can not be less than 3 letters', {
        cssClass: 'alert alert-danger ',
        timeout: 2000,
      });
    } else if (this.heading.length < 3) {
      this.FlashMessagesService.show('heading can not be less than 3 letters', {
        cssClass: 'alert alert-danger ',
        timeout: 2000,
      });
    } else if (this.imageUrl.length < 3) {
      this.FlashMessagesService.show(
        'imageUrl can not be less than 3 letters',
        {
          cssClass: 'alert alert-danger ',
          timeout: 2000,
        }
      );
    } else {
      let data = {
        author: this.name,
        heading: this.heading,
        content: this.content,
        img: this.imageUrl,
        id: this.id,
      };
      console.log(data);
      this.FlashMessagesService.show('Glog created successfully', {
        cssClass: 'alert alert-success',
        timeout: 2000,
      });
      this.BlogsService.newBlog(data);
      this.router.navigate(['/blogs']);
    }
  }
}
