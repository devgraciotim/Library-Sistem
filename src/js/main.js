import { Library } from "./classes.js";
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
