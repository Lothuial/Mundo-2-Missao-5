import {useState, useEffect} from 'react';
import ControleEditora from './controle/ControleEditora';
import ControleLivros from './controle/ControleLivros';

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros();

const LinhaLivro = (props) => {
    const {livro, excluir} = props;
    const nomeEditora = controleEditora.getNomeEditora;
    
    return (
        <tr>
            <td>
                <p>{livro.titulo}</p>
                <button className='btn btn-danger btn-sm' type='button' onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>
                {livro.resumo}
            </td>
            <td>
                {nomeEditora(livro.codEditora)}
            </td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (<li key={index}>{autor}</li>))}
                </ul>
            </td>
        </tr>
    );
};

const LivroLista = () => {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);
    useEffect( () => {
        document.title = "Lista de Livros";
        controleLivros.obterLivros().then((livros)=>{
            setLivros(livros);
            setCarregado(true);
        })
            .catch((error) => {
                console.error("Erro ao Carregar os livros:", error);
                setCarregado(true);
            });

    }, []);

    const excluirlivro = (codigo) => {
        setCarregado(false);
        controleLivros.excluir(codigo).then(()=>{
            controleLivros.obterLivros().then((livros)=>{
                setLivros(livros)
            })
        })
        setCarregado(true);
    };

    return (
        <main className='container-fluid px-5 mt-1'>
            <h1>Catálogo de Livros</h1>
            <table className='table'>
                <thead>
                    <tr className='table-dark'>
                        <th className='col-2'>Título</th>
                        <th className='col-4'>Resumo</th>
                        <th className='col-2'>Editora</th>
                        <th className='col-2'>Autores</th>
                    </tr>
                    </thead>
                    <tbody>
                        {livros.map(livro => (
                            <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluirlivro}
                            getNomeEditora={controleEditora.getNomeEditora}
                            />
                        ))}
                    </tbody>
            </table>
        </main>
    )
};

export default LivroLista