var express = require('express');
var db = require('./db-connections');
var app = express();

app.use(express.json());
app.use(express.static("./public"));

app.route('/testjson').get(function (req, res) {
    res.json({ message: 'Welcome to my server' });
});

app.route('/testtext').get(function (req, res) {
    res.send("This message is not a json");
});

app.route('/adopt').get(function (req, res) {
    try {
        var sql = "SELECT * FROM ani_adopt.Animal;";
        db.query(sql, function(error, result){
            if(error != null){ 
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error:", error);
        res.send("An error occurred while fetching animals.");
    }
});

app.route('/adopt/:id').get(function (req, res) {
    try {
        var sql = "SELECT * FROM ani_adopt.Animal WHERE animal_id = ?;";
        var parameters = [req.params.id];

        db.query(sql, parameters, function(error, result){
            if(error != null){ 
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error:", error);
        res.send("An error occurred while fetching the animal.");
    }
});

app.route('/adopt').post(function (req, res) {
    try {
        if (!req.body.name || !req.body.species_id) {
            return res.send("Error: Name and Species ID are required.");
        }

        var sql = "INSERT INTO ani_adopt.Animal VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var parameters = [0, req.body.name, req.body.species_id, req.body.breed, req.body.age, req.body.gender, req.body.status, req.body.image_url, req.body.description];
        
        db.query(sql, parameters, function (error, result) {
            if (error != null) {
                throw error; 
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error: ", error);
        res.send("An error occurred while saving the data.");
    }
});

app.route('/adopt/:id').put(function (req, res) {
    try {
        if (!req.body.name || isNaN(req.params.id)) {
            return res.send("Error: Name is required and Invalid ID!");
        }

        var sql = "UPDATE ani_adopt.Animal SET name = ?, breed = ?, age = ?, status = ?, description = ? WHERE animal_id = ?";
        var parameters = [req.body.name, req.body.breed, req.body.age, req.body.status, req.body.description, req.params.id];
        
        db.query(sql, parameters, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
        
    } catch (error) {
        console.log("Error: ", error);
        res.send("An error occurred while updating the data.");
    }
});

app.route('/adopt/:id').delete(function (req, res) {
    try {
        if (isNaN(req.params.id)) {
            return res.send("Invalid ID");
        }

        var sql = "DELETE FROM ani_adopt.Animal WHERE animal_id = ?";
        var parameters = [req.params.id];

        db.query(sql, parameters, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error: ", error);
        res.send("An error occurred while deleting the data.");
    }
});

app.route('/request').get(function (req, res) {
    try {
        var sql = "SELECT * FROM ani_adopt.meet_req;"
        db.query(sql, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error identified:", error);
        res.send("An error occurred while fetching requests.");
    }
});

app.route('/request').post(function (req, res) {
    try { 
        if (!req.body.date) {
            return res.send("Error: date is required!");
        }

        var sql = "INSERT INTO ani_adopt.meet_req VALUES (?, ?, ?, ?, ?)";
        var parameters = [0, req.body.date, req.body.status, req.body.user_id, req.body.animal_id];
        
        db.query(sql, parameters, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error identified:", error);
        res.send("An error occurred while sending your request.");
    }
});

app.route('/user').post(function (req, res) {
    try {
        if (!req.body.user_name || !req.body.password || !req.body.email){
            return res.send("Error: username, password and email is required!");
        }
        var sql = "INSERT INTO ani_adopt.user (user_id, user_name, password, email) VALUES (?, ?, ?, ?)";
        var parameters = [0, req.body.user_name, req.body.password, req.body.email];
        db.query(sql, parameters, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error identified:", error);
        res.send("An error occurred while creating the user.");
    }
});

app.route('/user').get(function (req, res) {
    try {
        var sql = "SELECT * FROM ani_adopt.user";
        
        db.query(sql, function (error, results) {
            if (error != null) {
                
                throw error;
            } else {
                
                res.json(results);
            }
        });
    } catch (error) {
        console.log("Error: ", error);
        res.send("An error occurred while retrieving users.");
    }
});

app.route('/species').get(function (req, res) {
    try {
        var sql = "SELECT * FROM ani_adopt.species;";
        db.query(sql, function (error, result) {
            if (error != null) {
                throw error;
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error identified:", error);
        res.send("An error occurred while fetching species.");
    }
});

app.listen(8080, "127.0.0.1");
console.log("Server is running @ http://127.0.0.1:8080");