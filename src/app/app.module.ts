import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_helpers/interceptor.helper';

import { AppComponent } from './app.component';
import { EmpresasCadastroComponent } from './empresas-cadastro/empresas-cadastro.component';
import { EmpresasConsultaComponent } from './empresas-consulta/empresas-consulta.component';
import { EmpresasEdicaoComponent } from './empresas-edicao/empresas-edicao.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { PasswordRecoverComponent } from './password-recover/password-recover.component';

//para criar páginas no ANGULAR vc tem componentes
// CSS, HTML, TS, SPEC.TS (PARA TESTE) 
//ng g(enerate !opicional escrever tudo!) components nomeDaPasta

//para gerar componentes para conectar a api local ou servidor 
//ng generate environments

//mapeamento das rotas no projeto
const routes: Routes = [

  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'password-recover', component: PasswordRecoverComponent },
  { path: 'empresas-cadastro', component: EmpresasCadastroComponent },
  { path: 'empresas-consulta', component: EmpresasConsultaComponent },
  { path: 'empresas-edicao/:idEmpresa', component: EmpresasEdicaoComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    EmpresasCadastroComponent,
    EmpresasConsultaComponent,
    EmpresasEdicaoComponent,
    LoginComponent,
    RegisterUserComponent,
    PasswordRecoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
