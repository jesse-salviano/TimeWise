let usuarios = [{email: "user", password: "1234"}];
let atividadesGlobal = [];
let usuarioAtual = null;
let dataSelecionadaAtual = null;
let graficoInstance = null;

window.addEventListener('DOMContentLoaded', function() {
    carregarDados();
    verificarAutenticacao();
    verificarTutorial();
    atualizarListaAtividades();
    
    if (window.location.href.includes('calendario.html')) {
        gerarCalendario();
        selecionarDiaAtual();
    }
});

// === TUTORIAL ===
function verificarTutorial() {
    const tutorialVisto = localStorage.getItem('tutorialVisto');
    const modalTutorial = document.getElementById('tutorial-modal');
    
    if (!tutorialVisto && modalTutorial && window.location.href.includes('index.html')) {
        modalTutorial.classList.add('active');
        localStorage.setItem('tutorialVisto', 'true');
    }
}

function fecharTutorial() {
    const modalTutorial = document.getElementById('tutorial-modal');
    if (modalTutorial) {
        modalTutorial.classList.remove('active');
    }
}

// === AUTENTICAÇÃO ===
function fazerLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
        usuarioAtual = usuario;
        localStorage.setItem('usuarioAtual', JSON.stringify(usuario));
        window.location.href = 'index.html';
    } else {
        alert('E-mail ou senha incorretos!');
    }
}

function fazerRegistro(event) {
    event.preventDefault();
    const nome = document.getElementById('registro-nome').value;
    const email = document.getElementById('registro-email').value;
    const password = document.getElementById('registro-password').value;
    const passwordConfirm = document.getElementById('registro-password-confirm').value;
    const ocupacao = document.getElementById('registro-ocupacao').value;

    if (password !== passwordConfirm) {
        alert('As senhas não conferem!');
        return;
    }

    if (usuarios.find(u => u.email === email)) {
        alert('E-mail já cadastrado!');
        return;
    }

    const novoUsuario = {
        id: Math.random(),
        nome,
        email,
        password,
        ocupacao,
        dataCriacao: new Date().toISOString()
    };

    usuarios.push(novoUsuario);
    salvarDados();
    alert('Conta criada com sucesso!');
    window.location.href = 'login.html';
}

function verificarAutenticacao() {
    const usuarioJSON = localStorage.getItem('usuarioAtual');
    if (!usuarioJSON && !window.location.href.includes('login.html') && !window.location.href.includes('registro.html')) {
        window.location.href = 'login.html';
    } else if (usuarioJSON) {
        usuarioAtual = JSON.parse(usuarioJSON);
    }
}

function logout() {
    localStorage.removeItem('usuarioAtual');
    window.location.href = 'login.html';
}

function confirmarLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        logout();
    }
}

// === MENU ===
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function irParaDashboard() {
    window.location.href = 'dashboard.html';
}

function irParaHome() {
    window.location.href = 'index.html';
}

function irParaCalendario() {
    window.location.href = 'calendario.html';
}

function irParaPerfil() {
    window.location.href = 'perfil.html';
}

function irParaPreferencias() {
    window.location.href = 'preferencias.html';
}

function navigateTo(page) {
    window.location.href = page;
}

// === ATIVIDADES ===
function atualizarListaAtividades() {
    const listElement = document.getElementById('atividades-list');
    if (!listElement) return;

    const minhasAtividades = atividadesGlobal.filter(a => a.usuarioId === (usuarioAtual ? usuarioAtual.id : null));
    minhasAtividades.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

    if (minhasAtividades.length === 0) {
        listElement.innerHTML = '<p style="padding: 16px; text-align: center; color: #999;">Nenhuma atividade adicionada ainda.</p>';
        return;
    }

    listElement.innerHTML = minhasAtividades.map(atividade => `
        <div class="atividade-item">
            <div class="atividade-info">
                <span class="atividade-titulo">${atividade.nome}</span>
                <span class="atividade-hora">${atividade.horaInicio} - ${atividade.horaFim}</span>
            </div>
            <button class="btn-delete" onclick="deletarAtividade(${atividade.id})" title="Deletar atividade">🗑️</button>
        </div>
    `).join('');
}

function adicionarAtividade() {
    const nome = document.getElementById('atividade-nome').value;
    const horaInicio = document.getElementById('atividade-hora-inicio').value;
    const horaFim = document.getElementById('atividade-hora-fim').value;

    if (!nome || !horaInicio || !horaFim) {
        alert('Preencha todos os campos!');
        return;
    }

    const atividade = {
        id: Math.random(),
        nome,
        horaInicio,
        horaFim,
        usuarioId: usuarioAtual.id,
        dataCriacao: new Date().toISOString()
    };

    atividadesGlobal.push(atividade);
    salvarDados();

    document.getElementById('atividade-nome').value = '';
    document.getElementById('atividade-hora-inicio').value = '';
    document.getElementById('atividade-hora-fim').value = '';

    atualizarListaAtividades();
    atualizarGrafico();
    alert('Atividade adicionada com sucesso!');
}

function deletarAtividade(id) {
    if (confirm('Tem certeza que deseja deletar essa atividade?')) {
        atividadesGlobal = atividadesGlobal.filter(a => a.id !== id);
        salvarDados();
        atualizarListaAtividades();
        atualizarAtividadesDia();
        atualizarGrafico();
        alert('Atividade deletada com sucesso!');
    }
}

function atualizarAtividadesDia() {
    const listElement = document.getElementById('atividades-dia-list');
    if (!listElement) return;

    const minhasAtividades = atividadesGlobal.filter(a => a.usuarioId === (usuarioAtual ? usuarioAtual.id : null));
    minhasAtividades.sort((a, b) => a.horaInicio.localeCompare(b.horaInicio));

    if (minhasAtividades.length === 0) {
        listElement.innerHTML = '<p style="padding: 16px; text-align: center; color: #999;">Nenhuma atividade para este dia.</p>';
        return;
    }

    listElement.innerHTML = minhasAtividades.map(atividade => `
        <div class="atividade-item">
            <div class="atividade-info">
                <span class="atividade-titulo">${atividade.nome}</span>
                <span class="atividade-hora">${atividade.horaInicio} - ${atividade.horaFim}</span>
            </div>
            <button class="btn-delete" onclick="deletarAtividade(${atividade.id})" title="Deletar atividade">🗑️</button>
        </div>
    `).join('');
}

function adicionarAtividadeDia() {
    if (!dataSelecionadaAtual) {
        alert('Selecione uma data primeiro!');
        return;
    }

    const nome = document.getElementById('atividade-dia-nome').value;
    const horaInicio = document.getElementById('atividade-dia-hora-inicio').value;
    const horaFim = document.getElementById('atividade-dia-hora-fim').value;

    if (!nome || !horaInicio || !horaFim) {
        alert('Preencha todos os campos!');
        return;
    }

    const atividade = {
        id: Math.random(),
        nome,
        horaInicio,
        horaFim,
        usuarioId: usuarioAtual.id,
        dataSelecionada: dataSelecionadaAtual,
        dataCriacao: new Date().toISOString()
    };

    atividadesGlobal.push(atividade);
    salvarDados();

    document.getElementById('atividade-dia-nome').value = '';
    document.getElementById('atividade-dia-hora-inicio').value = '';
    document.getElementById('atividade-dia-hora-fim').value = '';

    atualizarAtividadesDia();
    atualizarGrafico();
    marcarDiasComAtividades();
    alert('Atividade adicionada com sucesso!');
}

// === CALENDÁRIO ===
let dataAtual = new Date();

function gerarCalendario() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    
    const mesNomes = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const mesElement = document.getElementById('mes-ano');
    if (mesElement) mesElement.textContent = `${mesNomes[mes]} ${ano}`;
    
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasDoMesAnterior = primeiroDia.getDay();
    const diasDoMes = ultimoDia.getDate();
    
    const calendario = document.getElementById('calendario-dias');
    if (!calendario) return;
    
    calendario.innerHTML = '';
    
    const ultimoDiaAnterior = new Date(ano, mes, 0).getDate();
    for (let i = diasDoMesAnterior - 1; i >= 0; i--) {
        const dia = document.createElement('div');
        dia.className = 'dia outro-mes';
        dia.textContent = ultimoDiaAnterior - i;
        calendario.appendChild(dia);
    }
    
    const hoje = new Date();
    for (let i = 1; i <= diasDoMes; i++) {
        const dia = document.createElement('div');
        dia.className = 'dia';
        dia.textContent = i;
        
        if (ano === hoje.getFullYear() && mes === hoje.getMonth() && i === hoje.getDate()) {
            dia.classList.add('hoje');
        }
        
        dia.onclick = () => selecionarDia(i);
        calendario.appendChild(dia);
    }
    
    const proximosMeses = 42 - diasDoMesAnterior - diasDoMes;
    for (let i = 1; i <= proximosMeses; i++) {
        const dia = document.createElement('div');
        dia.className = 'dia outro-mes';
        dia.textContent = i;
        calendario.appendChild(dia);
    }
    
    marcarDiasComAtividades();
}

function marcarDiasComAtividades() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    
    const diasComAtividades = new Set();
    atividadesGlobal.forEach(a => {
        if (a.usuarioId === usuarioAtual.id && a.dataSelecionada) {
            const dataParts = a.dataSelecionada.split('/');
            if (parseInt(dataParts[2]) === ano && parseInt(dataParts[1]) === mes + 1) {
                diasComAtividades.add(parseInt(dataParts[0]));
            }
        }
    });
    
    const diasElements = document.querySelectorAll('.calendario-dias .dia:not(.outro-mes)');
    diasElements.forEach((el, index) => {
        const dia = index + 1 - (dataAtual.getDay());
        if (diasComAtividades.has(dia)) {
            el.classList.add('com-atividades');
        }
    });
}

function mesAnterior() {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    gerarCalendario();
}

function mesProximo() {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    gerarCalendario();
}

function selecionarDiaAtual() {
    const hoje = new Date();
    selecionarDia(hoje.getDate());
}

function selecionarDia(dia) {
    const mesNomes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const data = `${dia} de ${mesNomes[dataAtual.getMonth()]} de ${dataAtual.getFullYear()}`;
    const dataSelecionada = document.getElementById('data-selecionada');
    if (dataSelecionada) dataSelecionada.textContent = `Atividades - ${data}`;
    
    dataSelecionadaAtual = `${dia}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
    atualizarAtividadesDia();
}

function criarGrafico() {
    const ctx = document.getElementById('tempoChart');
    if (!ctx) return;

    atualizarGrafico();
}

function atualizarGrafico() {
    const ctx = document.getElementById('tempoChart');
    if (!ctx) return;

    const minhasAtividades = atividadesGlobal.filter(a => a.usuarioId === (usuarioAtual ? usuarioAtual.id : null));
    
    const categoriasContagem = {};
    minhasAtividades.forEach(a => {
        const nome = a.nome.toLowerCase();
        if (nome.includes('trabalho') || nome.includes('trabalho')) {
            categoriasContagem['Trabalho'] = (categoriasContagem['Trabalho'] || 0) + 1;
        } else if (nome.includes('estudo') || nome.includes('aula') || nome.includes('aprender')) {
            categoriasContagem['Estudos'] = (categoriasContagem['Estudos'] || 0) + 1;
        } else if (nome.includes('exercício') || nome.includes('esporte') || nome.includes('corrida')) {
            categoriasContagem['Exercício'] = (categoriasContagem['Exercício'] || 0) + 1;
        } else if (nome.includes('lazer') || nome.includes('filme') || nome.includes('jogo')) {
            categoriasContagem['Lazer'] = (categoriasContagem['Lazer'] || 0) + 1;
        } else {
            categoriasContagem['Outros'] = (categoriasContagem['Outros'] || 0) + 1;
        }
    });

    const labels = Object.keys(categoriasContagem);
    const dados = Object.values(categoriasContagem);
    
    if (labels.length === 0) {
        labels.push('Sem atividades');
        dados.push(1);
    }

    const cores = ['#FF4444', '#4CAF50', '#FFD700', '#9C27B0', '#00BCD4'];
    const backgroundColor = cores.slice(0, labels.length);

    if (graficoInstance) {
        graficoInstance.destroy();
    }

    graficoInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dados,
                backgroundColor: backgroundColor,
                borderColor: '#FFFFFF',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    atualizarLegenda(labels, backgroundColor);
}

function atualizarLegenda(labels, cores) {
    const legendElement = document.getElementById('legend-section');
    if (!legendElement) return;

    legendElement.innerHTML = labels.map((label, index) => `
        <div class="legend-item">
            <div class="legend-color" style="background-color: ${cores[index]};"></div>
            <span>${label}</span>
        </div>
    `).join('');
}

// === PREFERÊNCIAS ===
function salvarPreferencias() {
    const preferencias = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        ocupacao: document.getElementById('ocupacao').value,
        horaDormir: document.getElementById('hora-dormir').value,
        horaAcordar: document.getElementById('hora-acordar').value,
        notificacoes: document.getElementById('notificacoes').checked,
        modoEscuro: document.getElementById('modo-escuro').checked
    };

    localStorage.setItem('preferencias', JSON.stringify(preferencias));
    alert('Preferências salvas com sucesso!');
}

function carregarPreferencias() {
    const preferencias = JSON.parse(localStorage.getItem('preferencias') || '{}');
    if (preferencias.nome) {
        document.getElementById('nome').value = preferencias.nome || '';
        document.getElementById('email').value = preferencias.email || '';
        document.getElementById('ocupacao').value = preferencias.ocupacao || '';
        document.getElementById('hora-dormir').value = preferencias.horaDormir || '';
        document.getElementById('hora-acordar').value = preferencias.horaAcordar || '';
        document.getElementById('notificacoes').checked = preferencias.notificacoes || false;
        document.getElementById('modo-escuro').checked = preferencias.modoEscuro || false;
    }
}

function toggleModoEscuro() {
    document.body.classList.toggle('dark-mode');
}

function carregarPerfil() {
    if (!usuarioAtual) return;
    
    const minhasAtividades = atividadesGlobal.filter(a => a.usuarioId === usuarioAtual.id);
    const hoje = new Date();
    const atividadesHoje = minhasAtividades.filter(a => {
        const dataCriacao = new Date(a.dataCriacao);
        return dataCriacao.toDateString() === hoje.toDateString();
    });
    
    document.getElementById('profile-nome').textContent = usuarioAtual.nome;
    document.getElementById('profile-email').textContent = usuarioAtual.email;
    
    document.getElementById('detail-nome').textContent = usuarioAtual.nome;
    document.getElementById('detail-email').textContent = usuarioAtual.email;
    document.getElementById('detail-ocupacao').textContent = usuarioAtual.ocupacao;
    
    const dataCriacao = new Date(usuarioAtual.dataCriacao);
    document.getElementById('detail-data').textContent = dataCriacao.toLocaleDateString('pt-BR');
    
    document.getElementById('detail-atividades').textContent = minhasAtividades.length;
    document.getElementById('detail-atividades-hoje').textContent = atividadesHoje.length;
}

function openProfile() {
    irParaPerfil();
}

// === STORAGE ===
function salvarDados() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('atividades', JSON.stringify(atividadesGlobal));
}

function carregarDados() {
    const usuariosJSON = localStorage.getItem('usuarios');
    const atividadesJSON = localStorage.getItem('atividades');
    
    if (usuariosJSON) usuarios = JSON.parse(usuariosJSON);
    if (atividadesJSON) atividadesGlobal = JSON.parse(atividadesJSON);
}

// === DICAS ===
const dicas = [
    'Separe um tempo para esvaziar a mente antes de iniciar uma nova atividade.',
    'A Tríade do Tempo divide as atividades em três esferas: importantes, urgentes e circunstanciais.',
    'Durma entre 7 a 8 horas por noite para manter a produtividade.',
    'Faça pausas curtas a cada 25 minutos de trabalho (Técnica Pomodoro).',
    'Organize suas tarefas por prioridade para maximizar o rendimento.',
    'Elimine distrações durante o trabalho focado.',
    'Reserve horários específicos para lazer e descanso.',
    'Acompanhe seu progresso com relatórios semanais.',
    'Use modos foco para concentração máxima.',
    'Recompense-se quando atingir metas importantes.'
];

function obterDicaAleatoria() {
    return dicas[Math.floor(Math.random() * dicas.length)];
}

window.addEventListener('load', function() {
    const dicaElement = document.getElementById('dica-text');
    const dicaDashboard = document.getElementById('dica-dashboard');
    
    if (dicaElement) dicaElement.textContent = obterDicaAleatoria();
    if (dicaDashboard) dicaDashboard.textContent = obterDicaAleatoria();
    
    if (window.location.href.includes('preferencias.html')) {
        carregarPreferencias();
    }
    
    if (window.location.href.includes('dashboard.html')) {
        criarGrafico();
    }
    
    if (window.location.href.includes('perfil.html')) {
        carregarPerfil();
    }
});
