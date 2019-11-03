var userService = require('../service/user');

/**
 **_ Function to create the user in user collection.
 _**/
exports.create = function (req, res, next) {
    var body = new User(req.body);
    if (!body.emailId) {
        res.status(400).send('emailId is missing');
        return;
    }else if(body.emailId){

        var query = {
            emailId: body.emailId
        };
        if (!query) {
            res.status(400).send('Bad Request');
            return;
        }
        userService.findUser(query, function (error, response) {
            if (error) {
                res.status(404).send(error);
                return;
            }
            if (response) {
                res.status(200).send({"message":"user already exist"});
                return;
            }
            if (!response) {
                //res.status(204).send('No Data Found');
                userService.createUser(body, function (error, response) {
                    if (response) {
                        res.status(201).send(response);
                    } else if (error) {
                        res.status(400).send(error);
                    }
                });
            }
        });
   return
    }

    
      
    
}

exports.findAll = function (req, res) {
    
    userService.findAll(function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}

// _ Function to find user from user collection.
 //_/
exports.find = function (req, res) {
    var params = req.params || {};
    console.log("get",params);
    var query = {
        emailId: params.emailId
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.findUser(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}

/**
 **_ Function to update the user data  by their ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;
    console.log("bodyyyyyyyyyy",body.data);

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    userService.updateUserById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}


// _ Function to uodate the user data by filter condition.
// _/
exports.update = function (req, res) {
    var body = req.body;
    var query = body.query;
    var data = body.data;
    var options = body.options
    if (!query) {
        res.status(400).send('Bad request');
        return;
    }

    userService.updateUser(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
        }
    });
}


// _ Function to delete the user from collection.
 //*/
exports.delete = function (req, res) {
    var body = req.body || {};
    var query = body.query;
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    userService.deleteUser(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send("deleted successfully");
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}
//TODO: 
// Model.find()
// Model.findById()

class User {
    constructor(userData) {
        this.emailId = userData.emailId || '';
        this.firstName = userData.firstName || '';
        this.lastName = userData.lastName || '';
        this.dob = userData.dob || '';
        this.address = userData.address || '';
        this.phone = userData.phone || '';
        this.department = userData.department || '';
        this.password = userData.password || '';
    }
}