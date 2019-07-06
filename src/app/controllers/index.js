const fs = require('fs');
const path = require('path');

// ler todos os arquivos do diretorio atual excluindo os que comecam com '.' e o arquivo atual
// faz require de todos os arquivos passando o app como parametro
module.exports = app => {
    fs
        .readdirSync(__dirname)
        .filter(file => ( (file.indexOf('.')) !== 0 && (file !== 'index.js') ))
        .forEach(file => require(path.resolve(__dirname, file))(app));
}