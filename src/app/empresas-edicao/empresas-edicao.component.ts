import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})
export class EmpresasEdicaoComponent implements OnInit {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  constructor(
    private httpCliente: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  //Criando a estrutura do formulário
  formEdicao = new FormGroup({

    idEmpresa: new FormControl('', [Validators.required]),
    nomeFantasia: new FormControl('', Validators.required),
    razaoSocial: new FormControl('', Validators.required),
    cnpj: new FormControl('', Validators.required),

  })

  //funcão para exibir as validações dos campos na página
  get form(): any {

    return this.formEdicao.controls

  }

  ngOnInit(): void {

    //capturar o id da empresa enviado pela URL
    var idEmpresa = this.activatedRoute.snapshot.paramMap.get('idEmpresa');

    //consultar os dados da empresa na API
    this.httpCliente.get(environment.apiEmpresas + "/" + idEmpresa).subscribe({

      next: (result) => {

        console.log(result)

        //preencher os campos do formulário com os dados obtidos na consulta feita na API
        this.formEdicao.patchValue(result);

      },
      error: (e) => {

        console.log(e)

      }

    });

  }

  //função para executar a atualização dos dados da empresa
  onSubmit(): void {

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpCliente.put(environment.apiEmpresas, this.formEdicao.value, { responseType: 'text' }).subscribe({

      next: (result) => {

        this.mensagem_sucesso = result

      },
      error: (e) => {

        this.mensagem_erro = e.error

      }

    })

  }

}
