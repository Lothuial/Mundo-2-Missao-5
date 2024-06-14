const banco = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const URI = "mongodb://localhost:27017/livraria";

banco.connect(URI);

module.exports = banco;