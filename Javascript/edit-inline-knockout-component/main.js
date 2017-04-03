

function ViewModel(userObj) {
	this.name = ko.observable(userObj.name);
	this.email = ko.observable(userObj.email);
}


var myUser = {
	name: 'Peter',
	email: 'peter@familyguy.com'
};

var vm = new ViewModel(myUser);
ko.applyBindings(vm);