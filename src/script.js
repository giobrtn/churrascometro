// Passo 1: Verifica campos e avança para o próximo passo
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const cepInput = document.getElementById('cep');
const promocoesCheckbox = document.getElementById('promocoes');
const proximo1Button = document.getElementById('avancar-validacao');

proximo1Button.addEventListener('click', () => {
    if (validarCamposFormulario()) {
        // Armazena informações no Local Storage
        localStorage.setItem('nome', nomeInput.value);
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('cep', cepInput.value);
        localStorage.setItem('promocoes', promocoesCheckbox.checked);

        // Avança para o próximo passo
        document.getElementById('formulario-registro').style.display = 'none';
        document.getElementById('formulario-qntd').style.display = 'block';
    }
});

function validarCamposFormulario() {
    let isValid = true;

    if (!nomeInput.value.trim()) {
        nomeInput.classList.add('error');
        isValid = false;
    } else {
        nomeInput.classList.remove('error');
    }

    if (!validarEmail(emailInput.value)) {
        emailInput.classList.add('error');
        isValid = false;
    } else {
        emailInput.classList.remove('error');
    }

    if (!cepInput.value.trim()) {
        cepInput.classList.add('error');
        isValid = false;
    } else {
        cepInput.classList.remove('error');
    }

    return isValid;
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Passo 2: Calcula quantidade de itens
const homensInput = document.getElementById('homens');
const mulheresInput = document.getElementById('mulheres');
const criancasInput = document.getElementById('criancas');
const bebidasInput = document.getElementById('bebidas');
const calcularButton = document.getElementById('calcular');

calcularButton.addEventListener('click', calcularItens);

function calcularItens() {
    const quantidadeHomens = parseInt(homensInput.value, 10);
    const quantidadeMulheres = parseInt(mulheresInput.value, 10);
    const quantidadeCriancas = parseInt(criancasInput.value, 10);
    const quantidadeBebidas = parseInt(bebidasInput.value, 10);

    const quantidadeCarne = quantidadeHomens * 0.4 + quantidadeMulheres * 0.32 + quantidadeCriancas * 0.2;
    const quantidadePaoDeAlho = quantidadeHomens * 2 + quantidadeCriancas;
    const quantidadeCarvao = quantidadeHomens + quantidadeMulheres + quantidadeCriancas + quantidadeBebidas;
    const quantidadeSal = (quantidadeHomens + quantidadeMulheres + quantidadeCriancas + quantidadeBebidas) * 0.04;
    const quantidadeGelo = Math.ceil((quantidadeHomens + quantidadeMulheres + quantidadeCriancas + quantidadeBebidas) / 10) * 5;
    const quantidadeRefrigerante = Math.ceil((quantidadeHomens + quantidadeMulheres + quantidadeCriancas + quantidadeBebidas) / 5);
    const quantidadeAgua = Math.ceil((quantidadeHomens + quantidadeMulheres + quantidadeCriancas + quantidadeBebidas) / 5);
    const quantidadeCerveja = quantidadeBebidas * 3;


    // Atualiza a tabela com os resultados
    const resultadoTable = document.getElementById('resultado');
    resultadoTable.innerHTML = `
        <tr>
            <td>Carne</td>
            <td>${quantidadeCarne.toFixed(2)} KG</td>
        </tr>
        <tr>
            <td>Pão de Alho</td>
            <td>${quantidadePaoDeAlho}</td>
        </tr>
        <tr>
            <td>Carvão</td>
            <td>${quantidadeCarvao} KG</td>
        </tr>
        <tr>
            <td>Sal</td>
            <td>${quantidadeSal.toFixed(2)} KG</td>
        </tr>
        <tr>
            <td>Gelo</td>
            <td>${quantidadeGelo} KG</td>
        </tr>
        <tr>
            <td>Refrigerante</td>
            <td>${quantidadeRefrigerante} garrafas de 2L</td>
        </tr>
        <tr>
            <td>Água</td>
            <td>${quantidadeAgua} garrafas de 1L</td>
        </tr>
        <tr>
            <td>Cerveja</td>
            <td>${quantidadeCerveja} garrafas de 600ml</td>
        </tr>
    `;

    // Avança para o próximo passo
    document.getElementById('formulario-qntd').style.display = 'none';
    document.getElementById('resultado-calculo').style.display = 'block';
}

// Verifica se há dados armazenados no Local Storage e preenche campos
const storedNome = localStorage.getItem('nome');
const storedEmail = localStorage.getItem('email');
const storedCep = localStorage.getItem('cep');
const storedPromocoes = localStorage.getItem('promocoes');

if (storedNome) {
    nomeInput.value = storedNome;
}
if (storedEmail) {
    emailInput.value = storedEmail;
}
if (storedCep) {
    cepInput.value = storedCep;
}
if (storedPromocoes === 'true') {
    promocoesCheckbox.checked = true;
}

const limparDadosButton = document.getElementById('limparDados');
limparDadosButton.addEventListener('click', () => {
    // Remove os dados do Local Storage
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('cep');
    localStorage.removeItem('promocoes');

    // Limpa os campos no formulário (opcional)
    nomeInput.value = '';
    emailInput.value = '';
    cepInput.value = '';
    promocoesCheckbox.checked = false;
});