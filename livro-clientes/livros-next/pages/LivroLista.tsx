import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Menu } from '../componentes/Menu';
import Livro from '../classes/modelo/Livros';
import { LinhaLivro } from '../componentes/LinhaLivro';
import 'bootstrap/dist/css/bootstrap.css';
import type { NextPage } from 'next';
import ControleLivros from '@/classes/controle/ControleLivros';
import {router} from "next/client";
import ControleEditora from '@/classes/controle/ControleEditora';

const baseURL = "http://localhost:3030/livros"

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Array<Livro>>([])
    const [carregado, setCarregado] = useState(false);


    const obterLivros = async () => {
        return await fetch(baseURL)
            .then((resposta) => resposta.json())
            .then((resposta) => resposta);
    }
    const excluirLivro = async (codigo: string) => {
        setCarregado(false);
        await ControleLivros.excluir(codigo)
        setLivros(await ControleLivros.obterLivros());
        setCarregado(true);

    }

    useEffect(() => {
        const carregaLivros = async () => {
            setLivros(await ControleLivros.obterLivros());
            setCarregado(true)
            return livros;
        };

        carregaLivros();
    }, []);

        return (
            <div>
                <Head>
                    <title>Catálogo de Livros</title>
                </Head>
                <Menu/>
                <main>
                    <div className="container-fluid">
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
                            {livros.map((livro, index) => (<LinhaLivro key={index} livro={livro} excluir={excluirLivro}/>))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        )
}

export default LivroLista