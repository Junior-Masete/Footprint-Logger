const form = document.querySelector('.formtosubmit');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

form.removeEventListener('submit', handleSubmit);

async function handleSubmit(e){
    e.preventDefault();

    console.log("Email " + email.value.trim())
    console.log("Password " + password.value.trim())

    const errorElements = form.querySelectorAll('#thename, #thesurname, #themail, #thepass');
    errorElements.forEach(function(element) {
        element.style.color = "";
        element.textContent = "";
    });

    let isValid = true;

    if(!validateEmail(email)){
        const error = form.querySelector('#themail');
        error.style.color = "red";
        error.textContent = "Enter valid email"

        // e.preventDefault();
        isValid = false;
    }


    if(!validatePassword(password)){
        const error = form.querySelector('#thepass');
        error.style.color = "red";
        error.textContent = "Password should be 8-15, atleast 1 lowercase letter, 1 uppercase and 1 special character";

        // e.preventDefault();
        isValid = false;
    }

    if(!isValid) return;


    ///////////////////////
    try{
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value.trim(),
                password: password.value.trim()
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.user.token);
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("usersurname", data.user.surname);
        localStorage.setItem("usermail", data.user.email);

        window.location.href = "/add_activity.html";

    }
    catch(error){
        const errorBox = form.querySelector('#themail'); // or general error container
        errorBox.style.color = "red";
        errorBox.textContent = error.message;
    }

};

form.addEventListener('submit', handleSubmit);

const validateEmail = function(email){
    var regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.value.match(regemail)){
        return true;
    
    }
    else{
        return false;
    }

}

const validatePassword = function(password){
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    return regex.test(password.value);
}

const clearInput = function(){
    theName.value = "";
    surname.value = "";
    email.value = "";
    password.value = "";
}