const carregarGastos = () => {
    const gastos = window.gastosAPI.obter();
    const corpo = document.querySelector('#tabelaGastos tbody');
    corpo.innerHTML = '';
    let total = 0;

    gastos.forEach((gasto, i) => {
        total += gasto.valor;

        const linha = `
            <tr>
                <td>${gasto.categoria}</td>
                <td>${gasto.descricao}</td>
                <td>R$: ${gasto.valor.toFixed(2)}</td>
                <td>${gasto.data}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removerGasto(${i})">Excluir</button></td>
            </tr>
        `;

        corpo.innerHTML += linha;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

const gerarId = (gastos) => gastos.length ? Math.max(...gastos.map(g => g.id || 0)) + 1 : 1;

const adicionarGasto = () => {
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    console.log(window.gastosAPI);
    if (!descricao || isNaN(valor) || !data) return alert('Preencha todos os campos');

    const gastos = window.gastosAPI.obter();
    gastos.push({ id: gerarId(gastos), categoria, descricao, valor, data });
    window.gastosAPI.salvar(gastos);
    carregarGastos();

    window.href = 'index.html';
}

function removerGasto(indice) {
    const gastos = window.gastosAPI.obter();
    gastos.splice(indice, 1);
    window.gastosAPI.salvar(gastos);
    carregarGastos();
}

window.gastosAPI.obterCategorias();

const buscarCategorias = () => {
    var categorias = window.gastosAPI.obterCategorias();
    const accordion = document.getElementById('categoria')
    accordion.innerHTML = '<option selected disabled>Selecione a categoria</option>'; // limpa antes
    categorias.forEach(item => {
        accordion.innerHTML += `
        <option value="${item.nome}">${item.nome}</option>
        `
    })
    console.log(categorias)
}

const adicionarCategoria = () => {
    var categoria = document.getElementById('nomeCategoria').value
    var status = true
    categoria = categoria.trim();
    if (categoria.length == 0 || categoria.trim() === '') {
        return alert('A categoria não pode ser vazia')
    }

    var categoriasExistentes = window.gastosAPI.obterCategorias();

    categoriasExistentes.forEach(ExistCategoria => {
        if (ExistCategoria.nome.toUpperCase() == categoria.toUpperCase()) {
            alert('Categoria já cadastrada');
            status = false
            return
        }
    })

    if (status) {
        categoriasExistentes.push({ nome: categoria });
        window.gastosAPI.adicionarCategoria(categoriasExistentes)
        console.log("CATEGORIA ADICIONADA: " + categoria)
    }

}

const effect = () => {
    carregarGastos();
    buscarCategorias();
}

document.getElementById('collapseGasto').addEventListener('click', () => {
    console.log('cliquei no acordeao')
    buscarCategorias();
})

window.onload = effect;
