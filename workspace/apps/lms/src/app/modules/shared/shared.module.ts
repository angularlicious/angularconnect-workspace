import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '@angularlicious/components';

/**
 * Use the [SharedModule] to manage Angular and other 3rd-party modules/libraries/packages
 * used by the application. For example:
 *
 * Material Design
 * RouterModule
 * ReactiveFormsModule
 *
 * Note: DO NOT include any items related to the application features or domain.
 */
@NgModule({
  declarations: [],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule, FormsModule, MaterialDesignModule, RouterModule],
  exports: [ComponentsModule, MaterialDesignModule, RouterModule],
  bootstrap: [],
})
export class SharedModule {}
