import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from '../pages/pages.module';
import { FormsModule } from '@angular/forms';
import { HumanizePipe } from '../shared/pipes';
import { LanguageSelectorComponent } from '../i18n';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule,
    AuthModule,
    RouterModule,
    FormsModule,
    PagesModule,
    HumanizePipe,
    LanguageSelectorComponent
  ]
})
export class OrchestratorModule { }
