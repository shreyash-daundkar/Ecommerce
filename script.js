// Selcting elements

const form = document.querySelector('#add-form');
const price = document.querySelector('#form-price');
const name = document.querySelector('#form-name');
const category = document.querySelector('#form-category');
const elist = document.querySelector('#e-list');
const flist = document.querySelector('#f-list');
const slist = document.querySelector('#s-list');
const total = document.querySelector('#total');




// Url

const link = 'https://crudcrud.com/api/';
const id = '6c7a08f60cf24ceca5f33a4fa4cf98b9';
const route = '/Ecommerce';
const url = link + id + route;




// On refresh

window.addEventListener('DOMContentLoaded', onRefresh);
function onRefresh(e) {
    axios.get(url).then(res => {
        for(item of res.data) addProduct(item);
    }).catch(e => console.log(e.message));
}




// Add products

form.addEventListener('submit', onSubmit);
function onSubmit(e) {
    e.preventDefault();
    const obj = {
        price : price.value,
        name : name.value,
        category : category.value,
    }
    console.log(obj);
    axios.post(url, obj).then(res => addProduct(res.data))
    .catch(e => console.log(e.message));
    price.value = '';
    name.value = '';
}

function addProduct(obj) {
    let parent;
    if(obj.category == 'electronic') parent = elist;
    else if(obj.category == 'food') parent = flist;
    else if(obj.category == 'skin-care') parent = slist;
    const li = addElement('li', parent, null, 'list-group-item');
    const cat = addElement('span', li, obj.price);
    const spc =  addElement('span', li, " ");
    const amt =  addElement('span', li, obj.name);
    const dlt = addElement('button', li, 'X', 'btn-danger', 'btn-sm', 'float-right', 'delete');
    li.setAttribute('data-id', obj._id);
    total.textContent = parseInt(parseInt(total.textContent) + parseInt(obj.price));
}

function addElement(type, parent, text, ...classes) {
    const element = document.createElement(type);
    classes.forEach(c => element.classList.add(c));
    if(text) element.textContent = text;
    parent.append(element);
    return element;
}




// delete Product

list.addEventListener('click', listEvent);
function listEvent(e) {
    if(e.target.classList.contains('delete')) dltUser(e.target.parentElement);
}

function dltUser(li) {
    const id = li.getAttribute('data-id');
    const price = parseInt(li.children[0].textContent);
    axios.delete( url + "/" + id).then(() => {
        li.style.display = 'none'
        total.textContent = parseInt(total.textContent) - price;
    })
    .catch(e => console.log(e.message));
}