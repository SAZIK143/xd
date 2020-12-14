function showLogIn() {
    document.getElementById("email").style.display = "none"
    document.getElementById("upButton").style.display = "none"
    document.getElementById("nick").style.display = "block"
    document.getElementById("pass").style.display = "block"
    document.getElementById("inButton").style.display = "block"
    document.getElementById("status").innerHTML = "Login to your account";
    // document.getElementById("LoginRegisterScreen").style.display = "none"
    // document.getElementById("Game").style.display = "block"
}

function showSignUp() {
    document.getElementById("email").style.display = "block"
    document.getElementById("upButton").style.display = "block"
    document.getElementById("nick").style.display = "block"
    document.getElementById("pass").style.display = "block"
    document.getElementById("inButton").style.display = "none"
    document.getElementById("status").innerHTML = "Register your new account";
}
