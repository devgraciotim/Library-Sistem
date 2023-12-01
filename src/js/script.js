class Library {
    constructor() {
        this.users = [];
        this.collection = [];
        this.populateCollection();
        this.populateUsers(); 
    }

    async populateCollection() {
        fetch('https://api-biblioteca-mb6w.onrender.com/acervo')
            .then(response => response.json())
            .then(data => {
                data.forEach(el => {
                    const entity = new bibliographicEntity(
                        el.titulo, el.autor, el.anoPublicacao, el.codigo
                    )
                    this.collection.push(entity);
                });
                console.log(this.collection);
            })
    }

    async populateUsers() {
        try {
            const response = await fetch('https://api-biblioteca-mb6w.onrender.com/users');
            const data = await response.json();

            data.forEach(el => {
                const user = new User(el.nome, el.registroAcademico, el.dataNascimento);
                this.users.push(user);
            })

            console.log(users);
        }
        catch(error) {
            console.error(`Error: ${error}`);
        }
    }
}

class bibliographicEntity {
    constructor(title, author, publicationYear, code) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.code = code;
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
    constructor(title, author, publicationYear, code, genre) {
        super(title, author, publicationYear, code);
        this.genre = genre;
    }
}

class Magazine extends bibliographicEntity {
    constructor(title, author, publicationYear, code) {
        super(title, author, publicationYear, code);
    }
}

class User {
    constructor(name, registry, birth) {
        this.name = name;
        this.registry = registry;
        this.birth = birth;
    }
}