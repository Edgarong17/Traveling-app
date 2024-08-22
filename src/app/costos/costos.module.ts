import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostosPageRoutingModule } from './costos-routing.module';

import { CostosPage } from './costos.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostosPageRoutingModule
  ],
  declarations: [CostosPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CostosPageModule {}
