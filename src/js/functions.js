export function createTableRow(title, author, publicationYear, code) {
    const tableRow = document.createElement('tr');
    
    const tdTitle = document.createElement('td');
    tdTitle.innerText = title;
    const tdAuthor = document.createElement('td');
    tdAuthor.innerText = author;
    const tdYear = document.createElement('td');
    tdYear.innerText = publicationYear;
    const tdCode = document.createElement('td');
    tdCode.innerText = code;

    tableRow.append(tdTitle, tdAuthor, tdYear, tdCode);
    return tableRow;
}

export function addTableRow(row) {
    const tbody = document.getElementById('tbodyCollection');
    tbody.appendChild(row);
}

