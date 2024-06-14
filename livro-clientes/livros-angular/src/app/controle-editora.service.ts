import { Injectable } from '@angular/core';
import Editora from './editora';

@Injectable({
  providedIn: 'root'
})

export class ControleEditoraService {
    editoras: Array<Editora> = [];

    constructor() {
        this.editoras = [
          {
              codEditora: 1,
              nome: 'Alta Books',
            },
            {
              codEditora: 2,
              nome: 'Pearson',
            },
            {
              codEditora: 3,
              nome: 'Addison Wesley',
            },
          ];
    }
    
    getNomeEditora(codEditora: number): string {
      const resultados = this.editoras.filter((editora) => editora.codEditora === codEditora);
      return resultados[0].nome;
  }

    getEditoras() {
        return this.editoras;
    }
}