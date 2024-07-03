
const uri = '/User';
function checkToken() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
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

    function addUser() {
        const addNameTextbox = document.getElementById('add-name');
        const addPasswordTextbox = document.getElementById('password');
        const addTypeTextbox = document.getElementById('add-Type');
        const item = {
            id: 0,
            name: addNameTextbox.value.trim(),
            password: addPasswordTextbox.value.trim(),
            type: addTypeTextbox.value.trim()

        };


        fetch(uri, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(item)
        })
            .then(response => response.json())
            .then(() => {
                getItems();
                addNameTextbox.value = '';
                addPasswordTextbox.value = '';
                addTypeTextbox.value = '';
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    function deleteItem(id) {
        debugger
        fetch(`${uri}/${id}`, {
            method: 'DELETE',
            headers: headers // Include authorization header in the DELETE request
        })
            .then(() => getItems())
            .catch(error => console.error('Unable to delete item.', error));
    }



    function _displayCount(itemCount) {
        const name = (itemCount === 1) ? 'User' : 'User kinds';

        document.getElementById('counter').innerText = `${itemCount} ${name}`;
    }

    function _displayItems(data) {
        console.log(data);
        const tBody = document.getElementById('Users');
        tBody.innerHTML = '';

        _displayCount(data.length);

        const button = document.createElement('button');
        console.log(data);

        data.forEach(item => {
            console.log("kjhgfdfghjkl");
            console.log(item);
            let deleteButton = button.cloneNode(false);
            deleteButton.innerText = 'Delete';
            deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);
            deleteButton.setAttribute('id', 'deleteButtonId');


            let tr = tBody.insertRow();
            console.log(tr);
            let td = tr.insertCell(0);
            let textNodeId = document.createTextNode(item.id);
            td.appendChild(textNodeId);

            let td1 = tr.insertCell(1);
            let textNodeName = document.createTextNode(item.name);
            td1.appendChild(textNodeName);

            let td2 = tr.insertCell(2);
            let textNodePassword = document.createTextNode(item.password);
            td2.appendChild(textNodePassword);

            let td3 = tr.insertCell(3);
            let textNodeType = document.createTextNode(item.type);
            td3.appendChild(textNodeType);

            let td4 = tr.insertCell(4);
            td4.appendChild(deleteButton);
        });


    }

    function toUsers() {
        window.location.href = "User.html";
    }
}
