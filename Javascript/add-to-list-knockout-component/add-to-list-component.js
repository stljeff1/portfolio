		
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
