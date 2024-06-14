import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Editora from '../editora';
import Livro from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrl: './livro-dados.component.css'
})

export class LivroDadosComponent implements OnInit {
livro: Livro;
autoresForm: string = "";
editoras: Array<Editora> = [];
tempEditora: number = 0;

constructor (private servEditora: ControleEditoraService, private servLivros: ControleLivrosService, private router: Router) {
  this.livro = new Livro ("0", 0, "", "", [])
}

ngOnInit(): void {
  this.editoras = this.servEditora.getEditoras();
}

incluir = async () => {
  this.livro.autores = this.autoresForm.split('\n');
  await this.servLivros.incluir(this.livro);
  this.livro.codEditora = Number(this.tempEditora);
  this.router.navigateByUrl("/lista");
}
}