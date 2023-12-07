import { createTableRow, addTableRow, getData } from "./functions.js";

export class Library {
  constructor() {
    this.users = [];
    this.collection = [];
    this.populateUsers();
    this.populatCollection();
  }

  async populateUsers() {
    const data = await getData(
      "https://api-biblioteca-mb6w.onrender.com/users"
    );

    data.forEach((el) => {
      const user = new User(el.nome, el.registroAcademico, el.dataNascimento);
      this.users.push(user);
    });
  }

  async populatCollection() {
    const data = await getData(
      "https://api-biblioteca-mb6w.onrender.com/acervo"
    );

    data.forEach((el) => {
      this.addItem(el);
    });
  }

  listCollection() {
    this.collection.forEach((entity) => {
      const tableRow = createTableRow(
        entity.title,
        entity.author,
        entity.publicationYear,
        entity.code
      );
      addTableRow(tableRow);
    });

    document.getElementById("closeCollection").addEventListener("click", () => {
      const tbody = document.getElementById("tbodyCollection");
      tbody.innerHTML = "";
    });
  }

  addUser(user) {
    this.users.push(user);
  }

  addItem(el) {
    if (el.entidadeBibliografica == "Livro") {
      const entity = new Book(
        el.titulo,
        el.autor,
        el.anoPublicacao,
        el.codigo,
        el.entidadeBibliografica,
        el.genero
      );
      this.collection.push(entity);
    } else if (el.entidadeBibliografica == "Revista") {
      const entity = new Magazine(
        el.titulo,
        el.autor,
        el.anoPublicacao,
        el.codigo,
        el.entidadeBibliografica,
        el.edicao
      );
      this.collection.push(entity);
    }
  }

  lendItem(code, registry) {
    const foundItem = this.collection.find((item) => item.code === code);
    const user = this.users.find((user) => user.registry === registry);

    if (user) {
      foundItem.lend(user);
    } else {
      console.log("erro");
    }
  }

  returnItem(code) {
    const foundedItem = this.collection.find((item) => item.code === code);

    if (foundedItem) {
      foundedItem.returnEntity();
    } else {
      console.log("Item não encontrado.");
    }
  }
}

export class User {
  constructor(name, registry, birth) {
    this.name = name;
    this.registry = registry;
    this.birth = birth;
  }
}

export class bibliographicEntity {
  constructor(title, author, publicationYear, code, entityType) {
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.code = code;
    this.entityType = entityType;
    this.borrowed = false;
    this.borrowedUser = null;
  }

  lend(user) {
    if (this.borrowed === true) {
      console.log("Já se econtra emprestado");
    } else {
      this.borrowed = true;
      console.log(`Emprestado para ${user.name}`);
      this.borrowedUser = user;
    }
  }

  returnEntity() {
    if (this.borrowed === true) {
      this.borrowed = false;
      this.borrowedUser = null;
      console.log("Livro devolvido");
    } else {
      console.log("Livro não foi Emprestado");
    }
  }
}

export class Book extends bibliographicEntity {
  constructor(title, author, publicationYear, code, entityType, genre) {
    super(title, author, publicationYear, code, entityType);
    this.genre = genre;
  }

  info() {
    console.log(this);
  }
}

export class Magazine extends bibliographicEntity {
  constructor(title, author, publicationYear, code, entityType, edition) {
    super(title, author, publicationYear, code, entityType);
    this.edition = edition;
  }

  info() {
    console.log(this);
  }
}
