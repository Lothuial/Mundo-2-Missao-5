import ControleEditora from "../classes/controle/ControleEditora";
import ControleLivros from "@/classes/controle/ControleLivros";
import Livro from "../classes/modelo/Livros";

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: string) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const {livro, excluir} = props;
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            <td>
                <p>{props.livro.titulo}</p>
                <button className='btn btn-danger btn-sm' type='button' onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
            </td>
            <td>
                {livro.resumo}
            </td>
            <td>
                {nomeEditora}
            </td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (<li key={index}>{autor}</li>))}
                </ul>
            </td>
        </tr>
    );
}