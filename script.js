// EXAMINANDO O OBJECTO DOCUMENTO

/*console.dir(document);
console.dir(document.domain);
console.dir(document.URL);
console.dir(document.title);
// document.title = 123;
console.dir(document.doctype);
console.dir(document.head);
console.dir(document.body);
console.dir(document.all);
console.dir(document.all[10]);
console.dir(document.forms[0]);
console.dir(document.links); 
console.log(document.images);

// SELETORES E MODIFICAÇÕES

// GET ELEMENT BY ID
const heading = document.getElementById("title");
heading.textContent = "Item Lister";
// heading.innerText = "Listador de Elementos";
//heading.innerHTML = '<h3>Listador de Elementos</h3>';

// textContent vs innerText vs innerHTML:
// - textContent mostra o conteúdo independente do estilo aplicado no elemento
// - innerText mostra de acordo com o CSS;
// - Não é recomendado utilizar por questões de segurança;

heading.style.color = "orange";

// GET ELEMENTS BY CLASSNAME
const items = document.getElementsByClassName("list-item");

for (let index = 0; index < items.length; index++) {
  items[index].style.backgroundColor = "#f4f4f4";
  items[index].style.color = "#333";
}

// GET ELEMENTS BY TAG NAME
const listItems = document.getElementsByTagName("li");
console.log(listItems);

// QUERY SELECTOR -> Se mais de um elemento corresponder à busca, retorna apenas o primeiro.
const input = document.querySelector("input");
input.placeholder = "Type something...";

const lastItem = document.querySelector(".list-item:last-child");
lastItem.style.color = "red";

// QUERY SELECTOR ALL
const oddLis = document.querySelectorAll("li:nth-child(odd)");

// Not gonna work - error!
//subheaders.style.color = "blue";

for (let index = 0; index < oddLis.length; index++) {
  oddLis[index].style.fontWeight = "bold";
}
*/

// TRAVERSING THE DOM

// Parent Node e Parent Element -> Subir o nível baseado no elemento atual;
/* const itemsList = document.querySelector("#items");
itemsList.parentNode.parentNode.style.backgroundColor = "#f4f4f4";

// Child Nodes e Children -> Descer o nível baseado no elemento atual;
console.log(itemsList.children);

// First Child / First Element Child / Last Child / Last Element Child -> Auto-explicativo
console.log(itemsList.firstElementChild);

// Previous Sibling / Previous Element Sibling / NextSibling / Next Element Sibling -> Ir para elemento anterior ou posterior no mesmo nível

console.log(itemsList.previousElementSibling); */

// CRIAÇÃO DE ELEMENTOS

/* const newDiv = document.createElement("div");

newDiv.classList.add("example");
newDiv.setAttribute("title", "example");
newDiv.id = "example";

const newDivText = document.createTextNode("Example");
newDiv.appendChild(newDivText);

console.log(newDiv);

const container = document.querySelector("header .container");
const h1 = document.querySelector("header h1");

container.insertBefore(newDiv, h1); */

// EVENTOS

/* function buttonClick(e) {
  //Posição do mouse com relação à janela
  console.log(e.clientX);
  console.log(e.clientY);

  //Posição do mouse com relação ao alvo do evento
  console.log(e.offsetX);
  console.log(e.offsetY);

  // Verificar se esses botões foram apertados junto com o evento
  console.log(e.altKey);
  console.log(e.ctrlKey);
  console.log(e.shiftKey);

  // Eventos de botão
  // - Click, dbclick, mousedown (assim que clicar), mouseup (assim que soltar o botão de click),

  // Eventos de mouse -> Considerando uma div (pai) e h3 (filho)
  // - mouseenter -> Apenas roda quando entra na div
  // - mouseleave -> Apenas roda quando sai da div
  // - mouseover -> Roda assim que entra na div e/ou em seus elementos filhos
  // - mouseout -> Roda assim que sai da div e/ou seus elementos filhos
  // - mousemove -> Roda sempre que o mouse se movimentar dentro do alvo do evento (pai, nesse exemplo);

  // Eventos de teclado
  // - Keydown -> cada vez que a tecla é pressionada
  // - keyup -> cada vez que a tecla é solta
  // - Keypress -> Enquanto a tecla está sendo pressionada o evento se repete

  // Eventos de Input
  // - Focus -> Ao clicar dentro do input;
  // - Blur -> Ao clicar fora do input;
  // - Cut -> Recortar conteúdo do input; 
  // - Paste -> Colar conteúdo no input;
  // - Input -> Evento que engloba todos os outros e, se usado, qualquer evento que ocorra vai ser entendido como 'input'
} */

const itemsList = document.getElementById("items");

// Add New Li

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const input = document.querySelector("#itemInput");

  const newLi = createListItem();
  const newSpan = createSpanElement(input.value);
  const newRemoveButton = createRemoveButton();

  newLi.appendChild(newSpan);
  newLi.appendChild(newRemoveButton);

  itemsList.appendChild(newLi);
  input.value = "";
}

function createListItem() {
  const newLi = document.createElement("li");
  newLi.classList.add = "list-item";
  return newLi;
}

function createSpanElement(inputValue) {
  const newSpan = document.createElement("span");
  const newSpanContent = document.createTextNode(inputValue);
  newSpan.append(newSpanContent);

  return newSpan;
}

function createRemoveButton() {
  const removeButton = document.createElement("button");
  removeButtonContent = document.createTextNode("Remove");
  removeButton.className = "btn remove";
  removeButton.appendChild(removeButtonContent);

  return removeButton;
}

// --------------------------------------------------------

// Remove Li

itemsList.addEventListener("click", removeListItem);

function removeListItem(e) {
  //Checar se, dentro da área da LI, o botão com classe 'remove' foi clicado:
  if (e.target.classList.contains("remove")) {
    // Confirmação;
    if (confirm("Are you sure?")) {
      // Se sim, obtém a Li correspondente;
      let li = e.target.parentElement;

      // Remoção através do elemento pai;
      itemsList.removeChild(li);
    }
  }
}

// --------------------------------------------------------

// Clear all list items

const clearAllBtn = document.querySelector(".clear");

clearAllBtn.addEventListener("click", clearAllItems);

function clearAllItems() {
  const items = itemsList.getElementsByTagName("li");

  if (items.length === 0) {
    alert("There are no items left to remove!");
    return;
  }

  Array.from(items).forEach((item) => item.remove());
}

// -------------------------------------------------

// Search Items

const filter = document.getElementById("filter");
filter.addEventListener("keyup", filterItems);

function filterItems(e) {
  let filterValue = e.target.value.toLowerCase();

  let items = itemsList.getElementsByTagName("li");

  Array.from(items).forEach((item) => {
    let itemName = item.firstElementChild.textContent;

    if (!itemName.toLowerCase().includes(filterValue)) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
}

// Requisições/Fetch API

/* function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
} */
