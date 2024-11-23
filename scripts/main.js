let addBtn = document.getElementById('addBtn')
let closeBtn = document.getElementById('closeBtn')
let dataForm = document.getElementById('dataForm')
let addBtnInput = document.getElementById('addBtnInput')

let inputs = document.querySelectorAll('.inputAdd')
let tbody = document.querySelector('tbody')
let tableBox = document.querySelector('.table-box')

let editUserBox = document.querySelector('.editUserBox')
let editBtn = document.getElementById('editBtn')
let editInputs = document.querySelectorAll('.editInput')
let id_edit = null

let data = [
]

let obj = {
    name: '',
    lastName: '',
    age: '',
    email: '',
    id: '',
}

function aktivFunksiya() {
    closeBtn.classList.toggle('active');
    dataForm.classList.toggle('active');
    addBtnInput.classList.toggle('active');
}

addBtn.addEventListener('click', aktivFunksiya);
closeBtn.addEventListener('click', aktivFunksiya);

function dataYangila() {
    tbody.innerHTML = '';
    data.forEach((objItem, index) => {
        objItem.id = index + 1;
        tbody.innerHTML += `
        <tr>
            <td>${objItem.id}</td>
            <td>${objItem.name}</td>
            <td>${objItem.lastName}</td>
            <td>${objItem.age}</td>
            <td>${objItem.email}</td>
            <td><button class="editBtn" onclick="EditFunction(${objItem.id})">Edit</button></td>
            <td><button class="deleteBtn" onclick="DeleteFunction(${objItem.id})">Delete</button></td>
        </tr>
        `;
    });
}

addBtnInput.addEventListener('click', (e) => {
    obj.name = inputs[0].value;
    obj.lastName = inputs[1].value;
    obj.age = inputs[2].value;
    obj.email = inputs[3].value;
    obj.id = data.length + 1;

    if (obj.name && obj.lastName && obj.age && obj.email) {
        data.push({ ...obj });
        inputs.forEach(input => input.value = '');
        tableBox.classList.remove('active');
        dataYangila();
        obj = {
            name: '',
            lastName: '',
            age: '',
            email: '',
            id: ''
        };
    } else {
        alert("Iltimos, barcha maydonlarni to‘ldiring");
    }
});

function EditFunction(id) {
    id_edit = id - 1;
    let editItem = data[id_edit];
    editInputs[0].value = editItem.name;
    editInputs[1].value = editItem.lastName;
    editInputs[2].value = editItem.age;
    editInputs[3].value = editItem.email;

    editUserBox.classList.remove('active');
}

editBtn.addEventListener('click', () => {
    data[id_edit] = {
        name: editInputs[0].value,
        lastName: editInputs[1].value,
        age: editInputs[2].value,
        email: editInputs[3].value,
        id: id_edit + 1,
    };

    dataYangila();
    id_edit = null;
    editInputs.forEach(input => input.value = '');
    editUserBox.classList.add('active');
});

function DeleteFunction(id) {
    data.splice(id - 1, 1);
    data.forEach((item, index) => item.id = index + 1);
    dataYangila();
    if (data.length === 0) {
        tableBox.classList.add('active');
    }
}
