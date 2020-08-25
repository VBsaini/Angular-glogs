import { Component, OnInit, Input } from '@angular/core';
import { Blogs } from '../shared/blogs-interface';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogsService } from '../blogs.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css'],
})
export class UpdateBlogComponent implements OnInit {
  constructor(
    private BlogsService: BlogsService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private FlashMessagesService: FlashMessagesService
  ) {}
  id = +this.ActivatedRoute.snapshot.params.id;
  @Input()
  blog: Blogs;
  heading: string;
  content: string;
  imageUrl: string;
  userData;
  contentUpdate(value: string) {
    this.content = value;
  }
  headingUpdate(value: string) {
    this.heading = value;
  }
  imageUrlUpdate(value: string) {
    this.imageUrl = value;
  }
  ngOnInit(): void {
    this.BlogsService.getblog(this.id).subscribe((data) => {
      console.log(data);
      this.blog = data;
    });
    this.BlogsService.isValid().subscribe((data) => {
      this.userData = data.user;
    });
    this.headingUpdate(this.blog.heading);
    this.imageUrlUpdate(this.blog.img);
    this.contentUpdate(this.blog.content);
  }

  update() {
    if (this.content.length < 3) {
      this.FlashMessagesService.show('content can not be less than 3 letters', {
        cssClass: 'alert alert-danger ',
        timeout: 2000,
      });
    } else if (this.heading.length <= 3) {
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
        author: this.userData.username,
        heading: this.heading,
        content: this.content,
        img: this.imageUrl,
        id: this.id,
      };
      this.BlogsService.updateBlog(
        this.ActivatedRoute.snapshot.params.id,
        data
      );
      this.FlashMessagesService.show('Glog updated successfully', {
        cssClass: 'alert alert-success',
        timeout: 2000,
      });
      this.router.navigate(['/blogs']);
    }
  }
}
