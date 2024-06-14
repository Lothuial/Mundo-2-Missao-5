const Livro = require("./livro-schema");

const obterLivros = async () => {
    try {
        const listaLivros = await Livro.find();
        return listaLivros;
    } catch (error) {
        console.error("Ocorreu um erro ao retornar os livros: ", error);
        throw error;
    }
};

const incluir = async (livro) => {
    try {
        const novoLivro = await Livro.create(livro);
        console.log(novoLivro);
        return novoLivro;
    } catch (error) {
        console.log("Ocorreu um erro ao adicionar o livro: ", error);
        throw error;
    }
};

const excluir = async (codigo) => {
    try {
        const deletarLivro = await Livro.deleteOne({_id:codigo})
        return deletarLivro;
    } catch (error) {
        console.error("Ocorreu um erro ao excluir o livro: ", error);
        throw error;
    }
};

module.exports = {obterLivros, incluir, excluir}