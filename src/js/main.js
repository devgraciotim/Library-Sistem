import { Library, User, bibliographicEntity, Book, Magazine } from './classes.js'

var lib = new Library;

document.getElementById('listCollectionBtn').addEventListener('click', () => {
    lib.listCollection();
})