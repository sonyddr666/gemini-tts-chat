# Gemini TTS & Chat

Uma aplicação web para gerar fala a partir de texto usando os modelos TTS do Google Gemini, com suporte a múltiplos locutores e chat interativo.

## ✨ Funcionalidades

- **Texto para Fala (TTS)**: Converta texto em áudio usando modelos Gemini 2.5 Flash ou Pro
- **Múltiplos Locutores**: Suporte a até 2 locutores com vozes diferentes
- **30 Vozes Disponíveis**: Escolha entre vozes masculinas e femininas
- **Chat com IA**: Converse com Gemini para ajuda na criação de prompts TTS expressivos
- **Visualizador de Áudio**: Visualização em tempo real durante reprodução
- **Tema Claro/Escuro**: Alterne entre temas com um clique
- **Download de Áudio**: Baixe os áudios gerados em formato WAV

## 🚀 Como Usar

### 1. Obter uma Chave API

1. Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Crie uma chave API gratuita (Free Tier)
3. Cole a chave no campo "Chave API Gemini" na aplicação

### 2. Instalação

```bash
npm install
npm run dev
```

### 3. Gerar Fala

1. Digite seu roteiro na área de texto
2. Configure o(s) locutor(es) e suas vozes
3. Clique em "Gerar Fala"

**Para múltiplos locutores**, use tags no roteiro:
```
Locutor 1: Olá, como vai?
Locutor 2: Tudo bem, obrigado!
```

## 🛠️ Tecnologias

- TypeScript
- Vite
- Google Gemini AI SDK (`@google/genai`)
- Marked (renderização Markdown)

## 📁 Estrutura

```
├── index.html      # Página principal
├── index.tsx       # Lógica da aplicação
├── index.css       # Estilos
├── ttsManual.ts    # Manual de TTS expressivo
├── vite.config.ts  # Configuração Vite
└── package.json    # Dependências
```

## 📝 Licença

MIT