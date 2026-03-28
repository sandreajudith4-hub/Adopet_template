function sendAPI() {
    fetch('/testjson', {
        method: 'GET' 
    })
    .then(response => {
        if (!response.ok){
            throw new Error('The response from server is not OK!');
        }
        return response.json(); // FIXED: added parentheses ()
    })
    .then(obj => {
        console.log(obj); 
        var portElement = document.getElementById("animals-port"); 
        
        // FIXED: Accessing the first animal's name from the list
        portElement.innerHTML = obj.message; 
    })
    .catch(error => {
        console.error('Error encountered:', error); 
    });
}

function sendAPIText() {
    fetch('/testtext', {
        method: 'GET' //use HTTP GET method
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('The response from server is not OK!');
        }
        return response.text(); //Parse the text response
    })
    .then(obj => {
        console.log(obj); //Print out the response using console.log.
        var paraElement = document.getElementById("animals-port");
        paraElement.innerHTML = obj;
    })
    .catch(error => {
        console.error('Error encountered:', error); // Handle errors
    });
}



