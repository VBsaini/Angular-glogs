import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BlogsPageComponent } from './blogs-page/blogs-page.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { UserComponent } from './user/user.component';
import { YourBlogsComponent } from './your-blogs/your-blogs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blogs', component: BlogsPageComponent },
  { path: 'update/:id', component: UpdateBlogComponent },
  { path: 'Newblog', component: NewBlogComponent },
  { path: 'user/:method', component: UserComponent },
  { path: 'your-blogs', component: YourBlogsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
