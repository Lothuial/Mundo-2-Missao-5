import Livro from '../modelo/Livros'

const baseURL = "http://localhost:3030/livros"

interface LivroMongo{
  _id: string;
  titulo: string;
  codEditora: number;
  resumo: string;
  autores: string[];
};

export default class ControleLivros {
  async obterLivros(): Promise<Livro[]> {
    try {
      const resposta = await fetch(baseURL, {method: "GET"});
      const dados = await resposta.json();
      return dados.map((livro: LivroMongo) => new Livro(livro._id, livro.codEditora, livro.titulo, livro.resumo, livro.autores));
    } catch (error) {
        console.error("Ocorreu um erro ao recuperar os livros: ", error);
        return [];
    }
  };

  async excluir(codigo: string): Promise<boolean> {
    try {
      const resposta = await fetch(`${baseURL}/${codigo}`, {method: "DELETE"});
      const dados = await resposta.json();
      return dados.ok;
    } catch (error) {
      console.error("Ocorreu um erro ao deletar o livro: ", error)
      return false;
    }
  };

  incluir = async (livro: Livro)=>{
    const resposta = await fetch(baseURL,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro)
    })
    const respostaJson =  await resposta.json();

    return respostaJson.ok;
  }
}