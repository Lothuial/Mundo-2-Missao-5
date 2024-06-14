import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Menu } from '../componentes/Menu';
import Livro from '../classes/modelo/Livros';
import { useRouter } from 'next/router';
import ControleEditora from '../classes/controle/ControleEditora';
import 'bootstrap/dist/css/bootstrap.css';
import { NextPage } from 'next';
import {router} from 'next/client'
import ControleLivros from '@/classes/controle/ControleLivros';

const controleEditora = new ControleEditora()


const LivroDados: NextPage = () => {

    //metodo que pega o array de editora e modifica colocando value e text
    const opcoes = controleEditora.getEditoras().map((editora) => ({
        value: editora.codEditora,
        text: editora.nome
    }));
    //Defini as States inicial
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);


    //redirecionar
    const navigate = (pagina: string) => router.push(pagina);

    const tratarCombo = (evento: any) => {
        const numerointeiro = parseInt(evento.target.value)
        setCodEditora(numerointeiro)
    }

    const incluir = (evento: any) => {
        evento.preventDefault();
        const livro = {
            _id: null,
            codEditora: codEditora,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split("\n")
        };

        incluirLivro(livro);
    };

    const incluirLivro = async (livro: any) => {
        ControleLivros.incluir(livro)
            .then(()=>{
                navigate("/LivroLista")
            })
    };

    return (
        <div>
            <Head>
                <title>Adicionar Livros</title>
            </Head>
            <Menu/>
            <main>
                <div className='container-fluid'>
                    <h1>Dados do Livro</h1>
                    <form onSubmit={incluir}>
                        <div className='form-group'>
                            <label htmlFor='title'>Título</label>
                            <input className='form-control' id='title' type='text'  value={titulo} onChange= {(temp) => setTitulo(temp.target.value)}/>
                            <label className='mt-2' htmlFor='summary'>Resumo</label>
                            <textarea className='form-control' id='summary' rows={3} value= {resumo} onChange={(temp) => setResumo(temp.target.value)}/>
                            <label className='mt-2' htmlFor='publisher'>Editora</label>
                            <select className='form-control' id='publisher' value= {codEditora} onChange= {tratarCombo}>
                                {opcoes.map((items) => (<option key={items.value}  value={items.value}>{items.text}</option>))}
                            </select>
                            <label className='mt-2' htmlFor='authors'>Autores</label>
                            <textarea className='form-control' id='authors' rows={3}    value= {autores}   onChange={(temp) => setAutores(temp.target.value)}/>
                            <button className='btn btn-primary mt-2' type='submit'>Salvar   Livro</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default LivroDados;