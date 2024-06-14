import Livro from '../modelo/Livros'
interface LivroMongo {
    _id: string;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}

const baseURL = 'http://localhost:3030/livros'


class ControleLivros {

    static obterLivros = async () => {
        const resposta = await fetch(baseURL, {
            method: "GET"
        });
        const respostaJson = await resposta.json()
        return respostaJson.map((livro: LivroMongo) => {
            return new Livro(livro._id, livro.codEditora, livro.titulo, livro.resumo, livro.autores)
        });
    }

    static incluir = async (livro: Livro) => {
        const resposta = await fetch(baseURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        })
        const respostaJson = await resposta.json();

        return respostaJson.ok;
    }
    static excluir = async (codigo: string) => {

        const resposta = await fetch(`${baseURL}/${codigo}`, {
            method: "DELETE"
        })

        const resposaJson = await resposta.json()

        return resposaJson.ok;
    }

}

export default ControleLivros;