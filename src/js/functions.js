export function createTableRow(title, author, publicationYear, code) {
  const tableRow = document.createElement("tr");

  const tdTitle = document.createElement("td");
  tdTitle.innerText = title;

  tableRow.append(tdTitle);
  return tableRow;
}

export function addTableRow(row) {
  const tbody = document.getElementById("tbodyCollection");
  tbody.appendChild(row);
}

export async function getData(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

export function getUserData() {
  const name = document.getElementById("nameInput");
  const birth = document.getElementById("birthInput");
  const registry = document.getElementById("registryInput");

  const user = {
    name: name.value,
    birth: birth.value,
    registry: registry.value,
  };

  name.value = "";
  birth.value = "";
  registry.value = "";

  return user;
}

export function getItemInfo() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const publicationYear = document.getElementById("publication");
  const code = document.getElementById("code");
  const genre = document.getElementById("genre");
  const edition = document.getElementById("edition");
  const entityType = document.getElementById("entityType");

  const entity = {
    titulo: title.value,
    autor: author.value,
    anoPublicacao: publicationYear.value,
    codigo: code.value,
    entidadeBibliografica: entityType.value,
  };

  if (entityType.value === "Livro") {
    entity.genero = genre.value;
  } else if (entityType.value === "Revista") {
    entity.edicao = edition.value;
  }

  title.value = "";
  author.value = "";
  publicationYear.value = "";
  code.value = "";
  genre.value = "";
  edition.value = "";
  entityType.value = "";

  return entity;
}

export function getLendInfo() {
  const registry = document.getElementById("registryUser");
  const code = document.getElementById("codeEntity");

  const info = {
    registry: registry.value,
    code: code.value,
  };

  return info;
}

export function getReturnCode() {
  const returnCode = document.getElementById("returnCode");
  return returnCode.value;
}

export function getSearchCode() {
  const searchCode = document.getElementById("searchCode");
  return searchCode.value;
}
