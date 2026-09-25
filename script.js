// Estrutura de dados: cada rua define sua própria quantidade/lista de quadras.
// "quadras" aceita número (gera "01".."N") ou array explícito (numeração não sequencial).
const RUAS = [
  { nome: "1", quadras: 12 },
  { nome: "2", quadras: 8 },
  { nome: "3", quadras: 20 },
  { nome: "4", quadras: 15 },
  { nome: "5", quadras: 6 },
  // { nome: "F", quadras: ["01", "02", "05", "06", "10"] },
];

const app = document.getElementById('mainArea');
const title = document.getElementById('screenTitle');
const backBtn = document.getElementById('backBtn');
const footerNote = document.getElementById('footerNote');

// Estado da navegação: qual tela está ativa e o contexto (rua/quadra) selecionado.
let state = { screen: 'ruas', rua: null, quadra: null };

// Normaliza rua.quadras (número ou array) numa lista de strings.
function listaQuadras(rua) {
  if (Array.isArray(rua.quadras)) {
    return rua.quadras;
  }
  const total = Number(rua.quadras) || 0;
  const lista = [];
  for (let i = 1; i <= total; i++) {
    lista.push(String(i).padStart(2, '0'));
  }
  return lista;
}

function encontrarRua(nome) {
  return RUAS.find(r => r.nome === nome);
}

// Re-renderiza a tela atual com base em `state`. Chamado a cada mudança de estado.
function render() {
  app.innerHTML = '';
  footerNote.textContent = '';

  if (state.screen === 'ruas') {
    title.textContent = 'Ruas';
    backBtn.style.visibility = 'hidden';

    const grid = document.createElement('div');
    grid.className = 'grid ruas';

    RUAS.forEach(rua => {
      const qtd = listaQuadras(rua).length;
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `Rua ${rua.nome}<span class="sub">${qtd} quadra${qtd === 1 ? '' : 's'}</span>`;
      card.onclick = () => { state = { screen: 'quadras', rua: rua.nome, quadra: null }; render(); };
      grid.appendChild(card);
    });

    app.appendChild(grid);
  }

  if (state.screen === 'quadras') {
    const rua = encontrarRua(state.rua);
    title.textContent = 'Rua ' + rua.nome;
    backBtn.style.visibility = 'visible';

    const grid = document.createElement('div');
    grid.className = 'grid quadras';

    listaQuadras(rua).forEach(num => {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = num;
      card.onclick = () => { state = { screen: 'qrcode', rua: rua.nome, quadra: num }; render(); };
      grid.appendChild(card);
    });

    app.appendChild(grid);
  }

  if (state.screen === 'qrcode') {
    const codigo = state.rua + '-' + state.quadra;
    title.textContent = 'Quadra ' + state.quadra;
    backBtn.style.visibility = 'visible';

    const screen = document.createElement('div');
    screen.className = 'qr-screen';

    const box = document.createElement('div');
    box.className = 'qr-box';

    const qrDiv = document.createElement('div');
    qrDiv.id = 'qrcode';
    box.appendChild(qrDiv);

    const label = document.createElement('div');
    label.className = 'qr-code-label';
    label.textContent = codigo;
    box.appendChild(label);

    screen.appendChild(box);

    const btnRow = document.createElement('div');
    btnRow.className = 'btn-row';

    const voltarBtn = document.createElement('button');
    voltarBtn.className = 'btn secondary';
    voltarBtn.textContent = '⬅ Voltar';
    voltarBtn.onclick = () => { state = { screen: 'quadras', rua: state.rua, quadra: null }; render(); };

    const menuBtn = document.createElement('button');
    menuBtn.className = 'btn primary';
    menuBtn.textContent = '🏠 Menu Principal';
    menuBtn.onclick = () => { state = { screen: 'ruas', rua: null, quadra: null }; render(); };

    btnRow.appendChild(voltarBtn);
    btnRow.appendChild(menuBtn);
    screen.appendChild(btnRow);

    app.appendChild(screen);

    // Imagem esperada em qrcodes/<rua>-<quadra>.png (minúsculo).
    const img = document.createElement('img');
    img.src = `qrcodes/${codigo.toLowerCase()}.png`;
    img.width = 220;
    img.height = 220;
    img.alt = 'QR code ' + codigo;
    img.onerror = () => {
      qrDiv.textContent = 'Imagem não encontrada: qrcodes/' + codigo.toLowerCase() + '.png';
    };
    qrDiv.appendChild(img);
  }
}

// Volta um nível na navegação (qrcode -> quadras -> ruas).
backBtn.onclick = () => {
  if (state.screen === 'qrcode') { state = { screen: 'quadras', rua: state.rua, quadra: null }; }
  else if (state.screen === 'quadras') { state = { screen: 'ruas', rua: null, quadra: null }; }
  render();
};

render();