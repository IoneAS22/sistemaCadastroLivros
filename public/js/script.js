var tableBooks = document.getElementById('table')
let btnShow = document.getElementById('showTable');
let btnHide = document.getElementById('displayTable');

function showTable () {
    tableBooks.classList.add('theadAdd');
}

btnShow.addEventListener('click', showTable)
