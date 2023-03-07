import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  //Criando o modelo de dados do formulário
  formCadastro = new FormGroup({

    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', Validators.required)
    
  });

  //funcão para exibir as validações ndos campos na página
  get form(): any {

    return this.formCadastro.controls

  }

    //Função para processar o evento SUBMIT do formulário
    onSubmit(): void{
      console.log(this.formCadastro.value);
    }

}