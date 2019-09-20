import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteModule } from '../../site/site.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SiteModule],
  exports: [SiteModule],
})
export class CoreModule {
  /**
   * Use the check to determine if the [CoreModule] has been loaded in the parentModule (AppModule root).
   */
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
