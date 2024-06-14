const controleLivros = require("../modelo/livro-dao");
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const livros = await controleLivros.obterLivros();
        res.json(livros);
    } catch (error) {
        res.status(500).json({mensagem: "Ocorreu um erro ao retornar os livros."});
    }
});

router.post('/', async (req, res) => {
    try {
        const livro = req.body;
        await controleLivros.incluir(livro);
        res.json({mensagem: "O livro foi cadastrado com sucesso."});
    } catch (error) {
        res.status(500).json({mensagem: "Ocorreu um erro ao adicionar o livro."})
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const codigo = req.params.id;
        await controleLivros.excluir(codigo);
        res.json({mensagem: "O livro foi excluído com sucesso."});
    } catch (error) {
        res.status(500).json({mensagem: "Ocorreu um erro ao excluir o livro."})
    }
});

module.exports = router