import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './site/contact-us/contact-us.component';
import { AboutUsComponent } from './site/about-us/about-us.component';
import { LicenseComponent } from './site/license/license.component';
import { BlogComponent } from './site/blog/blog.component';
import { ErrorComponent } from './site/error/error.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: './features/courses/courses.module#CoursesModule',
      },
    ],
  },
  {
    path: 'documentation',
    children: [
      {
        path: '',
        loadChildren: './features/documentation/documentation.module#DocumentationModule',
      },
    ],
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'license',
    component: LicenseComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: false })],
})
export class AppRoutingModule {}
