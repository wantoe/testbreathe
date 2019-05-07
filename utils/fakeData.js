//all fake data goes here

const faker = require('faker');

fakeUser = {
    username: 'tester1',
    password: 'tester1'
};

fakeClinician = {
    username: 'sid11',
    password: 'sid'
};

fakeAdmin = {
    username: 'sidadmin',
    password: 'sid'
};

fakeAdminSignup = {
	firstname: 'uncle',
	lastname: 'rice',
	email: 'idontexist@nonexistent.com',
	username: 'chancellor',
	password: 'chancellor1'
}

module.exports = fakeUser, fakeClinician, fakeAdmin, fakeAdminSignup;