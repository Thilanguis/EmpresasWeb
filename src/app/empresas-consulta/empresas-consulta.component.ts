import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-empresas-consulta',
  templateUrl: './empresas-consulta.component.html',
  styleUrls: ['./empresas-consulta.component.css']
})
export class EmpresasConsultaComponent implements OnInit {

  //atributos
  // !!any qualquer conteudo json!!
  empresas: any[] = [];
  mensagem_sucesso: string = "";
  mensagem_erro: string = ""
  pagina: number = 1;

  constructor(private httpClient: HttpClient) { }

  //método executado sempre que o componente é aberto
  ngOnInit(): void {

    //Executar o serviço de consulta de emrpesas na API
    this.httpClient.get(environment.apiEmpresas).
      subscribe({

        next: (result) => {

          console.log(result);
          this.empresas = result as any[];

        },
        error: (e) => {

          console.log(e);

        },

      });

  }

  //função que vai ser executada ao clicar no botão de exclusão de empresa
  onDelete(idEmpresa: number): void {

    if (window.confirm('Deseja realmente excluir a empresa selecionada?')) {

      console.log(idEmpresa);

      //executando o serviço de exclusão na API
      this.httpClient.delete(environment.apiEmpresas + "/" + idEmpresa,
        { responseType: 'text' }).subscribe({

          next: (result) => {

            console.log(result);
            this.mensagem_sucesso = result
            this.ngOnInit();

          },
          error: (e) => {

            console.log(e);
            this.mensagem_erro = e

          },

        })

    }

  }

  //função para fazer a paginação
  handlePageChange(event: any): void {

    this.pagina = event;

  }

}
