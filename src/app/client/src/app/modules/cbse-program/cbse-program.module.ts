import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';
import { QuestionListComponent, SelectTextbookComponent, CbseComponent,
  QuestionCreationComponent, ChapterListComponent, McqCreationComponent, McqTemplateSelectionComponent,
   QuestionPreviewComponent } from './components';
import { SuiTabsModule, SuiModule } from 'ng2-semantic-ui';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '@sunbird/shared';
import { QuestionCreationHeaderComponent } from './components/question-creation-header/question-creation-header.component';
import { TextbookListComponent } from './components/textbook-list/textbook-list.component';
import { TelemetryModule } from '@sunbird/telemetry';
import { PlayerHelperModule } from '@sunbird/player-helper';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';
import { CertificateModule } from './../certificate/certificate.module';
import { CertificateDashboardComponent } from './components/certificate-dashboard/certificate-dashboard.component';
import {CKEditorModule} from "ng2-ckeditor";
@NgModule({
  declarations: [CsvUploadComponent, QuestionListComponent, SelectTextbookComponent, CbseComponent, QuestionCreationComponent,
    ChapterListComponent,
    McqCreationComponent ,
    McqTemplateSelectionComponent,
    QuestionPreviewComponent, SanitizeHtmlPipe, QuestionCreationHeaderComponent, TextbookListComponent, DashboardComponent,
    CertificateDashboardComponent],
  imports: [
    CommonModule,
    SuiTabsModule,
    SuiModule,
    ReactiveFormsModule, FormsModule, SharedModule,
    InfiniteScrollModule,
    PlayerHelperModule,
    TelemetryModule,
    CertificateModule,
    CKEditorModule
  ],
  exports: [ CbseComponent, SanitizeHtmlPipe ]
})
export class CbseProgramModule { }
