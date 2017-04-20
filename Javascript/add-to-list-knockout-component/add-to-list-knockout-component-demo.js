		
ko.components.register('add-to-list', {
	viewModel: function(params) {

		this.selectedValue = ko.observable(null);

		this.list = params.list;

		this.limitMsg = params.limitMsg || "List limit reached";

		this.optionsText = params.optionsText || "Text";
		this.optionsValue = params.optionsValue || "ID";
		this.newValue = ko.observable(null);

		this.disable = params.disable;

		this.submitFn = params.submit || function() {console.warn('Add To List Widget: No submit function provided;'); };
		console.log('disable', this.disable());
		this.addToList = function() { 
			var value = this.selectedValue();

			this.selectedValue(null);

			this.submitFn(value);

		}.bind(this);

	},
	template: 
		'<div class="add-to-list-widget"><div class="row"><div class="col-sm-10">' +
		'<select class="form-control" data-bind="options: list(), value: selectedValue, optionsText: optionsText,  optionsCaption: \'Add to list...\', enable: !disable()"></select>' +
		'</div><div class="col-sm-2"><button class="btn" data-bind="enable: (selectedValue() && !disable()), click: addToList">+</button>' +
		'</div></div>' +
		'<div data-bind="visible: disable()"><strong style="color: red; text-align: center" data-bind="text: limitMsg"></strong>' +
		'</div>'
});


function Team(teamID, teamName) {
	this.ID = teamID;
	this.name = teamName;
}


function User(userObj) {
	var self = this;

	self.List = ko.observableArray([]);


}


function ViewModel(userObj) {
	var self = this;

	/* Array to hold data of list */
	self.allDataList = ko.observableArray([]);

	/* Object representing with selectedUser */
	self.selectedUser = ko.observable(new User(userObj));

	/* function to filter the main data list depending on what the user has selected */
	self.filteredItems = function() {
		return ko.utils.arrayFilter(self.allDataList(), function(listItem) {
			var match = -1;
			ko.utils.arrayForEach(self.selectedUser().allDataList(), function(item) {
				if(t.ID == team.ID)
					match = 1;
			
			});
			return match <= 0;
		});
		
	};



	/* Function that grabs data list from remote source */
	self.loadList = function(callback) {
	};

	self.addItem = function(item) {
		console.log('adding team: ', item);
		self.selectedUser().favTeams.push(item);
	};

	self.removeItem = function(obj) {
		//var index = self.favTeams.indexOf(obj);
		self.selectedUser().favTeams.remove(obj);
	};

}


var myUser = {
	favTeams: []
};


$(function() {

	var vm = new ViewModel(myUser);
	ko.applyBindings(vm);
	

	$.ajax({
		//url: 'http://mlb.com/lookup/json/named.team_all.bam',
		url: 'http://mlb.com/lookup/json/named.team_all.bam?sport_code=%27mlb%27&active_sw=%27Y%27&all_star_sw=%27N%27',
		success: function(data) {
			console.log(data);
			var teams = data.team_all.queryResults.row;
			var count = teams.length;
			teams.forEach(function(team) {
				vm.dataList.push(new Team(team.team_id, team.name_display_long));
			});

		}
	});



});
