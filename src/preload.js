const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '..', 'database', 'gastos.json');
const caminhoCategorias = path.join(__dirname, '..', 'database', 'categorias.json');

const lerGastos = () => {
    if (!fs.existsSync(caminhoArquivo)) return [];
    const dados = fs.readFileSync(caminhoArquivo);
    return JSON.parse(dados);
}

const lerCategorias = () => {
    try {
        let dados = fs.readFileSync(caminhoCategorias)
        let categorias = JSON.parse(dados) 
        return categorias
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}


const salvarGastos = (gastos) => {
    try {
        const dir = path.dirname(caminhoArquivo);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(caminhoArquivo, JSON.stringify(gastos, null, 2));
    } catch (error) {
        console.error('Erro ao salvar gastos:', error);
    }
}

const adicionarCategoria = (categorias) => {
    try{
        fs.writeFileSync(caminhoCategorias, JSON.stringify(categorias, null, 2));
    }catch(err){
        console.log("Erro ao criar categoria: " + err)
    }
}




contextBridge.exposeInMainWorld('gastosAPI', {
    obter: lerGastos,
    salvar: salvarGastos,
    obterCategorias: lerCategorias,
    adicionarCategoria: adicionarCategoria
});
