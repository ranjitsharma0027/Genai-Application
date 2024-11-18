import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DocumentComponent } from './document/document.component';
import { QnaComponent } from './qna/qna.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentComponent },
  { path: 'qna', component: QnaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
