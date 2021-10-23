const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
let items = [];

class ListItem {
    constructor(text, checkedVal, id) {
      this.text = text;
      this.checkedVal = checkedVal;
      this.id = id;
    }
}

function reloadItems(){
    if(JSON.parse(window.localStorage.getItem('items')) == null){
        itemsList.innerHTML = "<li>Add some Tapas...</li>"
    } else {
        items = (JSON.parse(window.localStorage.getItem('items')));
        itemsList.innerHTML = "";
        for(let i = 0; i < items.length; i++){
            items[i].id = i;
            const listItem = document.createElement("li");
            listItem.setAttribute('class', 'actualItem');
            itemsList.appendChild(listItem);
            const checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            checkbox.id = `checkbox-${items[i].id}`;
            checkbox.setAttribute('data-id', `${items[i].id}`);
            listItem.appendChild(checkbox);
            const label = document.createElement('label');
            label.setAttribute('for', `checkbox-${items[i].id}`)
            label.textContent = items[i].text;
            listItem.appendChild(label);
            const delBtn = document.createElement('button');
            delBtn.classList.add("delete-button");
            delBtn.textContent = "Delete";
            delBtn.setAttribute('data-id', `${items[i].id}`);
            delBtn.addEventListener('click', deleteItem);
            listItem.appendChild(delBtn);
        }
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for(i=0; i < checkboxes.length; i++){
            if(items[i].checkedVal)checkboxes[i].checked = true;
        }
        itemsList.addEventListener('click', event => {
            if(event.target.localName == 'input' && event.target.type == "checkbox"){
                checkboxCheck(event.target.dataset.id, event.target.checked);
            }
        });

    }
}

function createItem(){
        event.preventDefault();
        const item = new ListItem(this.elements[0].value, false, null);
        items.push(item);
        window.localStorage.setItem('items', JSON.stringify(items));
        reloadItems();
}

function deleteItem(){
    this.removeEventListener('click', deleteItem);
    items.splice(this.dataset.id, 1);
    window.localStorage.setItem('items', JSON.stringify(items));
    reloadItems();
}

function checkboxCheck(id, check){
    items[id].checkedVal = check; 
    window.localStorage.setItem('items', JSON.stringify(items));
}

window.addEventListener('load', reloadItems);
addItems.addEventListener('submit', createItem);



//Ikonka taco