# Ruas e Quadras — QR Codes

App web (HTML/CSS/JS puro, sem build) para navegar por ruas e quadras de um
barracão de logística e exibir o QR code de cada quadra.

## Fluxo

`index.html` → lista de ruas → lista de quadras da rua → QR code da quadra,
com botões de voltar e menu principal.

## Estrutura

```
index.html      estrutura da página
style.css       estilos (tokens de cor no topo, dark mode automático)
script.js       dados (RUAS) + lógica de navegação e renderização
qrcodes/        imagens dos QR codes, formato <rua>-<quadra>.png (minúsculo)
```

## Configuração

Editar o array `RUAS` no início de `script.js`:

```js
const RUAS = [
  { nome: "A", quadras: 12 },                        // 12 quadras numeradas 01..12
  { nome: "F", quadras: ["01", "02", "05", "10"] },   // numeração não sequencial
];
```

Imagens: adicionar em `qrcodes/` nomeadas como `<rua>-<quadra>.png`, tudo
minúsculo (ex: `a-05.png` para Rua A, Quadra 05). Se a imagem não existir, a
tela mostra o caminho esperado em vez de quebrar.

## Rodar localmente

Abrir `index.html` direto no navegador. Não depende de servidor nem de
conexão com internet.

## Publicar (GitHub Pages)

1. Subir o conteúdo desta pasta para um repositório no GitHub (via VS Code:
   Source Control → Publish to GitHub).
2. No repositório: Settings → Pages → Source: Deploy from a branch → main → / (root) → Save.
3. Link fica em `https://<usuario>.github.io/<repositorio>/`.
