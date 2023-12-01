class Library {
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

            console.log(this.users);
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

            console.log(this.collection);
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }

    listCollection() {
        
        this.collection.forEach(entity => {
            console.log(entity);
        })
    }

    addUser(user) {
        
    }
}

class User {
    constructor(name, registry, birth) {
        this.name = name;
        this.registry = registry;
        this.birth = birth;
    }
}

class bibliographicEntity {
    constructor(title, author, publicationYear, code, entityType) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.code = code;
        this.entityType = entityType;
        this.borrowed = false;
        this.borrowedUser = null;
    }

    emprestar(user) {
        if (this.borrowed === true) {
            console.log('Esta Emprestado');
        }
        else {
            this.borrowed = true;
            console.log('Emprestado');
            this.borrowedUser = user;
        }
    }

    devolver() {
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

class Book extends bibliographicEntity {
    constructor(title, author, publicationYear, code, entityType, genre) {
        super(title, author, publicationYear, code, entityType);
        this.genre = genre;
    }
}

class Magazine extends bibliographicEntity {
    constructor(title, author, publicationYear, code, entityType, edition) {
        super(title, author, publicationYear, code, entityType);
        this.edition = edition;
    }
}

var lib = new Library;