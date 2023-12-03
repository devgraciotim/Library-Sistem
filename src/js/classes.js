import { createTableRow, addTableRow } from './functions.js'

export class Library {
    constructor() {
        this.users = [];
        this.collection = [];
        this.populateUsers();
        this.populatCollection(); 
    }

    async populateUsers() {
        try {
            const response = await fetch('https://api-biblioteca-mb6w.onrender.com/users');
            const data = await response.json();

            data.forEach(el => {
                const user = new User(el.nome, el.registroAcademico, el.dataNascimento);
                this.users.push(user);
            })
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    async populatCollection() {
        try {
            const response = await fetch('https://api-biblioteca-mb6w.onrender.com/acervo');
            const data = await response.json();

            data.forEach(el => {
                if(el.entidadeBibliografica == 'Livro') {
                    const entity = new Book(
                        el.titulo, el.autor, el.anoPublicacao, el.codigo, el.entidadeBibliografica, el.genero
                    );
                    this.collection.push(entity);
                }
                else if(el.entidadeBibliografica == 'Revista') {
                    const entity = new Magazine(
                        el.titulo, el.autor, el.anoPublicacao, el.codigo, el.entidadeBibliografica, el.edicao
                    );
                    this.collection.push(entity);
                }
            });
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    listCollection() {
        this.collection.forEach(entity => {
            const tableRow = createTableRow(entity.title, entity.author, entity.publicationYear, entity.code);
            addTableRow(tableRow);
        })

        document.getElementById('closeCollection').addEventListener('click', () => {
            const tbody = document.getElementById('tbodyCollection');
            tbody.innerHTML = '';
        });
    }

    addUser(user) {
        this.users.push(user);
    }

    addItem(item) {
        this.collection.push(item);
    }

    lendItem(code, registry) {
        this.collection.find();
    }

    returnItem(code) {
        this.collection.find();
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
            console.log('Esta Emprestado');
        }
        else {
            this.borrowed = true;
            console.log('Emprestado');
            this.borrowedUser = user;
        }
    }

    return() {
        if (this.borrowed === true) {
            this.borrowed = false;
            this.borrowedUser = null;
            console.log('Livro devolvido');
        }
        else {
            console.log('Livro não foi Emprestado');
        }
    }
}

export class Book extends bibliographicEntity {
    constructor(title, author, publicationYear, code, entityType, genre) {
        super(title, author, publicationYear, code, entityType);
        this.genre = genre;
    }
}

export class Magazine extends bibliographicEntity {
    constructor(title, author, publicationYear, code, entityType, edition) {
        super(title, author, publicationYear, code, entityType);
        this.edition = edition;
    }
}