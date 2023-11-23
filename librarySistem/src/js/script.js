class bibliographicEntity{
    constructor(title, author, publicationYear, code) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.code = code;
        this.borrowed = false;
        this.borrowedUser = null;
    }

    emprestar(usuario){
        if(this.borrowed === true){
            console.log('Esta Emprestado');
        }
        else{
            this.borrowed = true;
            console.log('Emprestado');
            this.borrowedUser = usuario;
        }
    }

    devolver(){
        if(this.borrowed === true){
            this.borrowed = false;
            this.borrowedUser = null;
            console.log('Livro devolvido');
        }
        else{
            console.log('Livro não foi Emprestado');
        }
    }
}

class Book extends bibliographicEntity{
    constructor(title, author, publicationYear, code, genre){
        super(title, author, publicationYear, code);
        this.genre = genre;
    }
}

class Magazine extends bibliographicEntity{
    constructor(title, author, publicationYear, code){
        super(title, author, publicationYear, code);
    }
}

const users = [];

class User{
    constructor(name, registry, birth){
        this.name = name;
        this.registry = registry;
        this.birth = birth;
    }
}