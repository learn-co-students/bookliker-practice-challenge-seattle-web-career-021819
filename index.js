const bookURL = "http://localhost:3000/books";
const list = document.getElementById("list");
const showPanel = document.getElementById("show-panel")


fetch(bookURL).then(res => res.json()).then(data => {
    data.forEach(book => {
      renderBooks(book)
    })
  })

function renderBooks(book){
  let li = document.createElement('li')
  li.textContent = book.title;
  li.addEventListener('click', () => {
    bookInfo(book);
  })
  list.appendChild(li);
}

function bookInfo(book){

  while (showPanel.firstChild) {
     showPanel.firstChild.remove();
   }

   let title = document.createElement('h2');
   let image = document.createElement('img');
   let description = document.createElement('p');
   let button = document.createElement('button');

   button.addEventListener('click', () => {
     likeBook(book);
   })

   title.textContent = book.title;
   image.src = book.img_url;
   description.textContent = book.description;
   button.textContent = "<3 Like <3";

   showPanel.appendChild(title);
   showPanel.appendChild(image);
   showPanel.appendChild(description);
   usersList(book);
   showPanel.appendChild(button);
}

function usersList(book){
  let usersList = document.createElement('ul');

  book.users.forEach(user => {
    let li = document.createElement('li')
    li.textContent = user.username;
    usersList.appendChild(li);
    showPanel.appendChild(usersList);
  })
}

function likeBook(book){
  let newList = book.users.push({id: 1, username:"pouros"})
  let config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    body: JSON.stringify({users: book.users})
  }

  fetch(bookURL + '/' + book.id, config).then(resp => resp.json()).then(data => {
    bookInfo(book)
  })
}
