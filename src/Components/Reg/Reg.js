export const errorMessages = [
    {
        "uzenet" : "Rossz email cím",
        "ertek" : false
    },
    {
        "uzenet" : "Nem megfelelő formátumú telefonszám",
        "ertek" : false
    },  
    {
        "uzenet" : "A jelszónak tartalmaznia kell legalább egy kis és nagy betűt, legalább egy számot és 8-14 karakter hosszúságúnak kell lennie.",
        "ertek" : false
    },
    {
        "uzenet" : "A jelszók nem egyeznek",
        "ertek" : false
    }

]
export function showHide(){
    const password = document.querySelector('#password1');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

export function showHide2(){
    const password = document.querySelector('#old-password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

export function showHide3(){
    const password = document.querySelector('#change-old-password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

export function showHide4(){
    const password = document.querySelector('#change-new-password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}