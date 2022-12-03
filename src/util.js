export function getUserData(){
    const data = JSON.parse(sessionStorage.getItem("userData"));
    return data;
}

export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData(data){
    sessionStorage.removeItem('userData');
}

export function createSubmitHandler(callback){
    return function (e){
        e.preventDefault();
        // if (e.target.tagName === 'A'){
        //    return e.target.href;
        // }

        if (e.target.tagName === 'FORM'){
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            callback(data);

            
        } else if (e.target.tagName === 'A'){
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            callback(data);
        } else{
            const formData = new FormData(e.target.parentElement);
            const data = Object.fromEntries(formData);
            callback(data);
        }
        
    }

}