class bibliographicEntity {
    constructor(title, author, publicationYear, code) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.code = code;
        this.borrowed = false;
        this.borrowedUser = null;
    }

    emprestar(usuario) {
        if (this.borrowed === true) {
            console.log('Esta Emprestado');
        }
        else {
            this.borrowed = true;
            console.log('Emprestado');
            this.borrowedUser = usuario;
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

const users = [];

class User {
    constructor(name, registry, birth) {
        this.name = name;
        this.registry = registry;
        this.birth = birth;

        this.saveUser();
    }

    userInfo() {
        return { name: this.name, registry: this.registry, birth: this.birth };
    }

    saveUser() {
        users.push(this.userInfo());
        localStorage.setItem('usersInfo', JSON.stringify(users));
    }
}

function validateInputs() {
    const nameInput = document.getElementById('userForm').querySelector('.name');
    const registryInput = document.getElementById('userForm').querySelector('.registry');
    const birthInput = document.getElementById('userForm').querySelector('.birth');

    if (nameInput.value.trim() === '' || registryInput.value.trim() === '' || birthInput.value.trim() === '') {
        alert('Preencha todos os campos');
        return;
    }

    createUser(nameInput, registryInput, birthInput);
}

function createUser(name, registry, birth) {
    const newUser = new User(name.value, registry.value, birth.value);

    name.value = '';
    registry.value = '';
    birth.value = '';
}










