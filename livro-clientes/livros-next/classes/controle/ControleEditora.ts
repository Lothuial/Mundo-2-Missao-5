import Editora from '../modelo/Editora'

const editoras: Array<Editora> = [
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

export default class ControleEditora {
  getNomeEditora(codEditora: number): string {
      const editorapequisada = editoras.filter((editora) => editora.codEditora === codEditora);
      return editorapequisada.length > 0 ? editorapequisada[0].nome : 'Desconhecida';
  }

  getEditoras(): Array<Editora> {
      return editoras;
  }

  incluir(editora: Editora):void{
      const codigoNovo = editoras.length > 0 ?
          Math.max(...editoras.map(e => e.codEditora)) + 1:
          1;
      editora.codEditora = codigoNovo;
      editoras.push(editora);
  }
}