import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ControleLivros from './controle/ControleLivros';
import ControleEditora from './controle/ControleEditora';
import './App.css';

const controleLivro = new ControleLivros();
const controleEditora = new ControleEditora();

const LivroDados = props => {
    const opcoes = controleEditora.getEditoras();
    const [titulo, setTitulo] = useState("");
    const [resumo, setResumo] = useState("");
    const [autores, setAutores] = useState("");
    const [codEditora, setCodEditora] = useState(opcoes[0].value);
    const navigate = useNavigate();

    const tratarCombo = (event) => {
        const numerointeiro = parseInt(event.target.value);
        setCodEditora(numerointeiro);
    };

    const incluir = (event) => {
        event.preventDefault();
        const livro = {
          codigo: "",
          codEditora: codEditora,
          titulo: titulo,
          resumo: resumo,
          autores: autores.split("\n")
        };
        controleLivro.incluir(livro)
          .then(() => navigate("/"));
    };

    return (
        <main className='container-fluid'>
            <h1>Dados do Livro</h1>
            <form onSubmit={incluir}>
                <div className='form-group'>
                    <label htmlFor='title'>Título</label>
                    <input className='form-control' id='title' type='text' value={titulo}onChange= {(temp) => setTitulo(temp.target.value)}/>
                    <label className='mt-2' htmlFor='summary'>Resumo</label>
                    <textarea className='form-control' id='summary' rows="3" value={resumo}onChange=   {(temp) => setResumo(temp.target.value)}/>
                    <label className='mt-2' htmlFor='publisher'>Editora</label>
                    <select  className='form-control' id='publisher' value={codEditora}onChange= {tratarCombo}>
                        {opcoes.map((items) => (<option key={items.codEditora} value={items.codEditora}>{items.nome}</option>))}
                    </select>
                    <label className='mt-2' htmlFor='authors'>Autores</label>
                    <textarea className='form-control' id='authors' rows="3" value={autores}   onChange={(temp) => setAutores(temp.target.value)}/>
                    <button className='btn btn-primary mt-2' type='submit'>Salvar Livro</button>
                </div>
            </form>
        </main>
    )
};

export default LivroDados;