
const uri = '/Taskk';
const uriUser = '/User';
let Tasking = [];
function showEdit() {
    const editFormUser = document.getElementById('editFormUser');
    editFormUser.style.display = "block";
}


function checkToken() {
    console.log("dfghjkl;");
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html'; 
    }
    IsAdmin();
}

window.addEventListener('load', checkToken);


const token = localStorage.getItem('token');

if (!token) {
    console.error('Token not found in localStorage. User is not logged in.');
} else {
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    function getItems() {
        fetch(uri, {
            headers: headers // Include authorization header in the GET request
        })
            .then(response => response.json())
            .then(data => _displayItems(data))
            .catch(error => console.error('Unable to get items.', error));
    }
    function editUser(){
    
        const EnterName = document.getElementById('edit_name').value;
        const EnterPassword = document.getElementById('edit_password').value;

    const item = {
        Name: EnterName,
        Password: EnterPassword
        };
        fetch(uriUser, {
                method: 'PUT',
                headers: headers ,
                body: JSON.stringify(item)
            })
            .then(console.log("oooooooooooooooo"))
            .catch(error => console.error('Unable to update item.', error));
        closeInput();
        return false;
}
    function addItem() {
        const addNameTextbox = document.getElementById('add-name');

        const item = {
            TaskkName: addNameTextbox.value.trim(),
            IsDo: false,
            ID: 1,
            
        };

        fetch(uri, {
            method: 'POST',
            headers: headers, // Include authorization and content type headers in the POST request
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                getItems();
                addNameTextbox.value = '';
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    function deleteItem(id) {
        fetch(`${uri}/${id}`, {
            method: 'DELETE',
            headers: headers // Include authorization header in the DELETE request
        })
            .then(() => getItems())
            .catch(error => console.error('Unable to delete item.', error));
    }

    function updateItem() {
        const itemId = document.getElementById('edit-id').value;
        const UserTask = document.getElementById('edit-userId').value;
        const item = {
            Id: itemId,
            IsDo: document.getElementById('edit-isGlutenFree').checked,
            TaskkName: document.getElementById('edit-name').value.trim(),
            UserId:UserTask
        };
    console.log(UserTask+"userid");
    console.log(itemId);
    console.log("item.TaskkName");

        fetch(`${uri}/${itemId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(item)
            })
            .then(() => getItems())
            .catch(error => console.error('Unable to update item.', error));
        closeInput();
        return false;
    }
    function _displayCount(itemCount) {
        const name = (itemCount === 1) ? 'Task' : 'Task kinds';

        document.getElementById('counter').innerText = `${itemCount} ${name}`;
    }
    function displayEditForm(id) {
        const item = Tasking.find(item => item.id === id);
        document.getElementById('edit-name').value = item.taskkName;
        document.getElementById('edit-id').value = item.id;
        document.getElementById('edit-userId').value = item.userId;
        document.getElementById('edit-isGlutenFree').checked = item.isDo;
        document.getElementById('editForm').style.display = 'block';
       
    }
    
    function _displayItems(data) {
        const tBody = document.getElementById('Tasks');
        tBody.innerHTML = '';

        _displayCount(data.length);
        
        const button = document.createElement('button');

        data.forEach(item => {
            let isGlutenFreeCheckbox = document.createElement('input');
            isGlutenFreeCheckbox.type = 'checkbox';
            isGlutenFreeCheckbox.disabled = true;
            isGlutenFreeCheckbox.checked = item.isDo;
            console.log(item);
            console.log(item.taskkName);
            console.log(item.id);
            let editButton = button.cloneNode(false);
            editButton.innerText = 'Edit';
            editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
            editButton.setAttribute('id', 'editButtonId');
            let deleteButton = button.cloneNode(false);
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
            deleteButton.setAttribute('id', 'deleteButtonId');
            let tr = tBody.insertRow();
            console.log("sxcvbnm");
            console.log(tr);
            let td1 = tr.insertCell(0);
            td1.appendChild(isGlutenFreeCheckbox);

            let td2 = tr.insertCell(1);
            let textNode = document.createTextNode(item.taskkName);
            td2.appendChild(textNode);

            let td3 = tr.insertCell(2);
            td3.appendChild(editButton);

            let td4 = tr.insertCell(3);
            td4.appendChild(deleteButton);
        });

        Tasking = data;
    }

    function toUsrers(){
        window.location.href = "User.html";
    }

    function IsAdmin() {
        console.log("Ayala");
        fetch('/Admin', {
            method: 'GET',
            headers:  headers ,
            body: JSON.stringify()
        })
            .then(res => {
                if (res.status == 200)
                    usersLink();
                else
                {
                    console.log("esti");
                    const linkToUsers = document.getElementById('buttonUsers');
                    console.log("Etty Leiman");
                    console.log(linkToUsers);
                    linkToUsers.style.display = "none";
                }
            })
            .catch()
    }
    
    const usersLink = () => {
        const linkToUsers = document.getElementById('buttonUsers');
        linkToUsers.hidden = false;
    }
    function closeInput() {
        document.getElementById('editForm').style.display = 'none';
        console.log("tttttttttttttt");
    }
    function closeInputUser(){
        document.getElementById('editFormUser').style.display = 'none'; 
    }
}
