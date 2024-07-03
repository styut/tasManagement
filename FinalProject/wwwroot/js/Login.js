

const uri = '/Login'; 
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    LoginUser();
});

function LoginUser(EnterName,EnterPassword) {
    

    const item = {
        Name: EnterName,
        Password: EnterPassword
    };
    console.log(item);
    fetch(uri, {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
        
    })
    .then(response => {
        
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.text();
    })
    .then(data => {
        console.log("kkkkkkk");
        saveToken(data);
        })
    .catch(error => {
        console.error('Error:', error);
    });
}
function saveToken(token) {
    console.log("wwwwwwwww");
    localStorage.setItem("token", token);
    var homePagePath = "Taskk.html";
    window.location.href = homePagePath;
}
function login(){
    const EnterName = document.getElementById('enter-name').value;
    const EnterPassword = document.getElementById('enter-password').value;
    LoginUser(EnterName,EnterPassword)
}
function handleCredentialResponse(response) {
    if (response.credential) {
        var idToken = response.credential;
        var decodedToken = parseJwt(idToken);
        var userName = decodedToken.name;
        var userPassword = decodedToken.sub;
        LoginUser(userName, userPassword);
    } else {
        alert('Google Sign-In was cancelled.');
    }
}


//Parses JWT token from Google Sign-In
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


