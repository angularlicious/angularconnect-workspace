import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogComponent } from './blog/blog.component';
import { LicenseComponent } from './license/license.component';
import { SharedModule } from '../modules/shared/shared.module';
import { UserImageComponent } from './user-image/user-image.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    LoginComponent,
    ContactUsComponent,
    AboutUsComponent,
    BlogComponent,
    LicenseComponent,
    UserImageComponent,
    ErrorComponent,
  ],
  exports: [NavbarComponent, SidebarComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
})
export class SiteModule {}
