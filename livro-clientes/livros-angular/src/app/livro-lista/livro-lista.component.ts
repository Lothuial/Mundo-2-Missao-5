import { Component, OnInit } from '@angular/core';
import Editora from '../editora';
import Livro from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrl: './livro-lista.component.css'
})

export class LivroListaComponent implements OnInit{
  editoras: Array<Editora> = [];
  livros: Array<Livro> = [];

  constructor (private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) {
    this.servEditora = servEditora;
    this.servLivros = servLivros;
  }

  async ngOnInit() {
    this.editoras = this.servEditora.getEditoras();
    this.livros = await this.servLivros.obterLivros();
  }

  excluir(codigo: string): void {
    this.servLivros.excluir(codigo)
      .then(() => this.servLivros.obterLivros())
      .then(livros => this.livros = livros);
  }

  obterNome = (codEditora: number): string => {
    return this.servEditora.getNomeEditora(codEditora);
  }
}