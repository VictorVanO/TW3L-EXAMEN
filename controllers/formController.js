let Reservation = require('../models/userModel.js');
let User = require('../models/userModel.js');

let userList = [];

exports.reservationForm = function(req, res) {
    let destination = req.params.destination;
    req.session.destination = destination;
    let seats = req.body.nbseat;
    let reservation = new Reservation(destination, seats);
    res.render('person.ejs', {userNumber: seats});
}


exports.validationForm = function(req, res) {
    res.render('validation.ejs', {destination: req.session.destination});
}

exports.confirmationForm = function(req, res) {
    res.render('confirmation.ejs');
}

exports.cancelForm = function(req, res) {
    userNumber = 0;
    req.session.destroy();
    res.redirect('/');
}

exports.personsForm = function(req, res) {
    let firstname = req.body.firstname;
    let age = req.body.age;

    let user = new User(firstname, age);
    userList.push(user);

    res.render('validation.ejs', {users: userList, destination: req.session.destination});
}