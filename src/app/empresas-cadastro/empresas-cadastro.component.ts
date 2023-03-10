import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})

export class EmpresasCadastroComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = "";
  mensagem_erro: string = ""

  constructor(
    //Declarando um atributo auto-inicializado (injeção de dependência)
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

  }

  //Criando o modelo de dados do formulário
  formCadastro = new FormGroup({

    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', Validators.required)

  });

  //funcão para exibir as validações dos campos na página
  get form(): any {

    return this.formCadastro.controls

  }

  //Função para processar o evento SUBMIT do formulário
  onSubmit(): void {
    // console.log(this.formCadastro.value);

    this.mensagem_sucesso = "";
    this.mensagem_erro = "";

    const url = environment.apiEmpresas;

    const dados = this.formCadastro.value;

    this.httpClient.post(url, dados, { responseType: 'text' }).
      subscribe({
        next: (result) => {
          this.mensagem_sucesso = result;
          this.formCadastro.reset();
        },
        error: (e) => {
          console.log(e)
          this.mensagem_erro = e.error;
        }
      });
  }

}
