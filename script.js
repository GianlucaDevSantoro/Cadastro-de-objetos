let produtos = [];
let editando = -1;

const btnAbrir = document.getElementById("btnAbrirCadastro");
const form = document.getElementById("formCadastro");
const btnSalvar = document.getElementById("btnSalvar");
const btnCancelar = document.getElementById("btnCancelar");
const tabela = document.getElementById("tabelaProdutos");
const totalGeral = document.getElementById("totalGeral");

btnAbrir.onclick = () => {
    form.style.display = "block";
    limparCampos();
    editando = -1;
};

btnCancelar.onclick = () => {
    form.style.display = "none";
    limparCampos();
    editando = -1;
};

btnSalvar.onclick = () => {
    const nome = document.getElementById("nome").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (!nome || isNaN(preco) || isNaN(quantidade)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const produto = {
        nome,
        preco,
        quantidade,
        total: preco * quantidade
    };
    if (editando === -1) {
        produtos.push(produto);
    } else {
        produtos[editando] = produto;
        editando = -1;
    
    }
    atualizarTabela();
    limparCampos();
    form.style.display = "none";
};
function atualizarTabela() {
    tabela.innerHTML = "";
    let somaTotal = 0;
    
    produtos.forEach((p, i) => {
        somaTotal += p.total;

        const linha = `
        <tr>
            <td>${p.nome}</td>
            <td>R$ ${p.preco.toFixed(2)}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.total.toFixed(2)}</td>
            <td>
                <button onclick="editar(${i})">Editar</button>
                <button onclick="excluir(${i})">Excluir</button>
            </td>
        </tr>
        `;
        tabela.innerHTML += linha;
    });

    totalGeral.textContent = "R$ " + somaTotal.toFixed(2);
}

function limparCampos() {
    document.getElementById('nome').value = "";
    document.getElementById('preco').value = "";
    document.getElementById('quantidade').value = "";
}

function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}

function editarProduto(index) {
    const p = produtos[index];
    document.getElementById('nome').value = p.nome;
    document.getElementById('preco').value = p.preco;
    document.getElementById('quantidade').value = p.quantidade;
    editando = index;
    form.style.display = 'block';
}

