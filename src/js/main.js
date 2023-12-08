import { Library, User } from "./classes.js";
import {
  getUserData,
  getItemInfo,
  getLendInfo,
  getReturnCode,
  getSearchCode,
} from "./functions.js";

var lib = new Library();

document.getElementById("listCollectionBtn").addEventListener("click", () => {
  lib.listCollection();
});

document.getElementById("addUserBtn").addEventListener("click", () => {
  const user = getUserData();
  lib.addUser(user);

  console.log(lib.users);
});

document.getElementById("addItemBtn").addEventListener("click", () => {
  const entity = getItemInfo();
  lib.addItem(entity);

  console.log(lib.collection);
});

document.getElementById("lendItemBtn").addEventListener("click", () => {
  const entity = getLendInfo();
  lib.lendItem(entity.code, entity.registry);
});

document.getElementById("returnItemBtn").addEventListener("click", () => {
  const code = getReturnCode();
  lib.returnItem(code);
});

document.getElementById("infoBtn").addEventListener("click", () => {
  const code = getSearchCode();
  const foundItem = lib.collection.find((item) => item.code === code);

  if (foundItem) {
    foundItem.info();
  }
});

const user1 = new User('Matheus', '829171', '2003-01-09');
lib.addUser(user1);
const user2 = new User('Paulo', '392014', '2001-07-03');
lib.addUser(user2);
const user3 = new User('Henrique', '492819', '2004-02-13');
lib.addUser(user3);
const user4 = new User('Vitor', '975636', '2003-03-05');
lib.addUser(user4);
const user5 = new User('Felipe', '810384', '2002-02-22');
lib.addUser(user5);

console.log(lib.users);