## ✅ Instalação e Configuração do Ambiente

### 1. Instale o **NVM** (Node Version Manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Depois, carregue o NVM no terminal atual:

```bash
source ~/.bashrc
```

### 2. Instale a versão correta do Node.js

```bash
nvm install v22.17.0
```

### 3. Instale o **Yarn** globalmente

```bash
npm install --global yarn
```

---

## 🚀 Rodando o Projeto

Na raiz do projeto, execute:

```bash
yarn
```

> Isso irá instalar todas as dependências definidas no `package.json`.

Para iniciar a aplicação em ambiente de desenvolvimento:

```bash
yarn dev
```

---

## 🧹 Lint — Análise de Código Estático

Para verificar erros de estilo, problemas de sintaxe e más práticas de código, use:

```bash
yarn lint
```

---

## 🎨 Format — Formatação Automática com Prettier

Para aplicar automaticamente o estilo de código definido no projeto, execute:

```bash
yarn format
```
