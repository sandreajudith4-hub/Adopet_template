function loadAnimalData() {
    var AnimalArray = [];
    fetch('/adopt', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error: The response was unacceptable');
        }
        return response.json();
    })
    .then(data => {
        AnimalArray = data;
        insertDynamicAnimals(AnimalArray);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function AnimalDetailsforEdit() {
    var params = new URLSearchParams(location.search);
    var id = params.get("id"); 
    var api_url = '/adopt/' + id;

    fetch(api_url, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            
            var animal = data[0]; 
            document.getElementById('name').value = animal.name;
            document.getElementById('breed').value = animal.breed;
            document.getElementById('age').value = animal.age;
            document.getElementById('gender').value = animal.gender;
            document.getElementById('status').value = animal.status;
            document.getElementById('description').value = animal.description;
            document.getElementById('image_url').value = animal.image_url;
            document.getElementById('animal_id').value = animal.animal_id; 
        })
        .catch(error => console.error('Error:', error));
}

function updateAnimalDetails() {
    var params = new URLSearchParams(location.search);
    var id = params.get("id");
    var api_url = '/adopt/' + id; 

    var formElement = document.getElementById('updateAnimalForm');
    var formData = new FormData(formElement);
    var animalData = Object.fromEntries(formData.entries());
    var jsonString = JSON.stringify(animalData);

    fetch(api_url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: jsonString
    })
    .then(response => {
        if (!response.ok) throw new Error('Update failed');
        return response.json();
    })
    .then(data => {
        alert("Animal profile Updated Successfully!");
        location.href = "/Pet-gallery.html";

    })
    .catch(error => console.error('Error:', error));
}

function updateAnimal(btnElement) {
    var id = btnElement.getAttribute("animalId");
    location.href = "update_ani.html?id=" + id;
}

function insertDynamicAnimals(arrayOfAnimals) {
    var list = document.getElementById("dynamicAnimalsDataList");
    list.innerHTML = ""; 

    for (var i = 0; i < arrayOfAnimals.length; i++) {
        var animal = arrayOfAnimals[i]; 
        
        list.innerHTML += 
            '<div class="prof-card">' +
                '<img src="' + animal.image_url + '" class="pet-img">' +
                '<div class="container">' +
                    '<h4><b>' + animal.name + '</b></h4>' +
                    '<p>' + animal.breed + '</p>' +
                    '<button class="view-btn" onclick=\'openPopup(' + JSON.stringify(animal) + ')\'>View Details</button>' +
                '</div>' +
            '</div>';
    }
}

function addAnimalData() {

    var formElement = document.getElementById('insertForm');
    var formData = new FormData(formElement);
    var animalData = Object.fromEntries(formData.entries());
    var jsonString = JSON.stringify(animalData);

    fetch('/adopt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonString,
    })
    .then(response => {
        if (!response.ok) {
           
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        
        location.href = "/Pet-gallery.html"; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error adding the animal. Please check your inputs.");
    });
}

function deleteAnimalData(buttonElement) {
    
    var id = buttonElement.getAttribute("animalId");
    var api_url = "/adopt/" + id; 

    if (confirm("Are you sure you want to delete this pet?")) {
        fetch(api_url, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) throw new Error('Delete failed');
                return response.json();
            })
            .then(() => {
            
                location.href = "/developer.html";
            })
            .catch(error => console.error('Error:', error));
    }
}

function openPopup(animal) {
    document.getElementById("PopupBody").innerHTML = 
        "<h2>" + animal.name + "</h2>" +
        "<img src='" + animal.image_url + "' width='200'>" +
        "<p>" + "Breed: " + animal.breed + "</p>" +
        "<p>" + "Age: " + animal.age + "</p>" +
        "<p>" + "Gender: " + animal.gender + "</p>" +
        "<p>" + "About: " + animal.description + "</p>"+
        "<p>" + "Status: " + animal.status + "<p>";
        

    
    document.getElementById("meetButton").onclick = function() {
        window.location.href = "meet-pet.html?id=" + animal.animal_id + "&name=" + animal.name;
       
    };
    document.getElementById("petPopup").style.display = "block";
}

function closePopup() {
    document.getElementById("petPopup").style.display = "none";
}

function DeveloperManage() {
    fetch('/adopt')
        .then(response => response.json())
        .then(data => {
            var container = document.getElementById("adminAnimalsList");
            var html = "<table class = 'admins-table'>" +
                            "<tr>" +
                                "<th>Name</th>" +
                                "<th>Breed</th>" +
                                "<th>Action</th>" +
                            "</tr>";

            data.forEach(animal => {
                html += "<tr>" +
                            "<td>" + animal.name + "</td>" +
                            "<td>" + animal.breed + "</td>" +
                            "<td>" +
                                "<div class='editdelete-buttons'>" + 
                                    "<button type='button' onclick='updateAnimal(this)' animalId='" + animal.animal_id + "'>Edit</button>" +
                                    "<button type='button' onclick='deleteAnimalData(this)' animalId='" + animal.animal_id + "'>Delete</button>" +
                                "</div>" +
                            "</td>" +
                        "</tr>";
            });

            html += "</table>";
            container.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching animal data:', error);
        });
}

function deleteAnimal(id) {
    if (confirm("Confirm delete this pet profile?")) {
        fetch(`/adopt/${id}`, { method: 'DELETE' })
            .then(() => {
                alert("Deleted!");
                DeveloperManage(); 
            });
    }
}

function LoginUser() {
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    var userData = {
        user_name: user,
        password: pass,
        email: email,
    };

    fetch('/user', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            
            throw new Error('Server responded with an error');
        }
        return response.json();
    })
    .then(data => {
        window.alert("Successfully logged in! Welcome, " + user);
        location.href = "/Pet-gallery.html";
    })
    .catch(error => {
        console.error('Error detail:', error);
        window.alert("Login failed. Check if your server is running or if the user exists.");
    });

    return false; 
}
function loadBookingPageData() {
    
    var params = new URLSearchParams(window.location.search);
    var idFromUrl = params.get('id'); 
    var nameFromUrl = params.get('name');

    if (idFromUrl) {
        document.getElementById("petId").value = idFromUrl;
        console.log("Pet ID loaded: " + idFromUrl);
    }

    if (nameFromUrl) {
        document.getElementById("petNameLabel")
    }
}


function saveBooking() {
    var petIdValue = document.getElementById("petId").value;
    var dateValue = document.getElementById("meetingDate").value;

    var data = {
        animal_id: petIdValue, 
        date: dateValue,
        user_id: 1,
        status: "Pending"
    };

    fetch('/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        if (response.ok) {
            alert("Successfully booked! wait for response from staff in ur email");
            window.location.href = "Pet-gallery.html";
        }
    });

    return false; 
}