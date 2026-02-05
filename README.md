# 📚 Books CRUD

Este projeto foi desenvolvido como parte de um **teste técnico frontend**, proposto pela empresa **Contato Seguro**, utilizando **React 18 + TypeScript**, com foco em organização de código, clareza de regras de negócio e boa experiência de uso.

---

## 🚀 Tecnologias utilizadas

- **React 18**
- **TypeScript**
- **Vite**
- **Ant Design** para lidar com UI
- **localForage** para gerenciamento dos dados localmente no IndexedDB
- **DayJS** para lidar com datas

---

## 🧩 Funcionalidades

### Autores

- Criar autor
- Visualizar autor em **modal dedicado**
- Excluir autor
  - ⚠️ Ao excluir um autor, **todos os livros associados a ele também são removidos**
- Exibição da **data de criação** no modal de visualização

### Livros

- Criar livro vinculado a um autor
- Visualizar livro em **modal dedicado**
- Excluir livro
- Exibição da **data de criação** no modal de visualização

---

## 🧠 Decisões técnicas

- Optei por **TypeScript**, por já ser a tecnologia que utilizo no meu dia a dia e por trazer mais segurança, legibilidade e manutenção ao código.
- A exclusão em cascata (autor → livros) foi implementada para manter **consistência dos dados**.
- As datas de criação são geradas automaticamente no momento do cadastro, garantindo rastreabilidade.

---

## ⚙️ Como rodar o projeto (Docker)

### Pré-requisitos

- Docker Desktop instalado e em execução

### Passos para execução

```bash
docker compose up --build
```

Após a finalização do build, a aplicação estará disponível em:

```bash
http://localhost:5173
```

### Encerrar a execução

```bash
docker compose down
```
