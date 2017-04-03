

ko.bindingHandlers.executeOnEnter = {
	init: function (element, valueAccessor, allBindings, viewModel) {
		var callback = valueAccessor();
		$(element).keypress(function (event) {
			var keyCode = (event.which ? event.which : event.keyCode);
			if (keyCode === 13) {
				callback.call(viewModel);
				return false;
			}
			return true;
		});
	}
};


ko.components.register('edit-inline', {
	viewModel: function(params) {

		var widget = this;

		var origVal = params.value();

		this.value = params.value;
		this.labelText = params.labelText

		this.isEditing = ko.observable(false);

		this.edittedValue = ko.observable(null);

		this.msg = ko.observable('');
		console.log(this.value, this.edittedValue, this.edittedValue(), origVal)

		this.startEdit = function() {
			this.edittedValue(origVal);
			console.log('begin', this.value(), this.edittedValue());
			this.isEditing(true);
			this.msg('');
		}.bind(this);
		this.finishEdit = function() {
			this.isEditing(false);
			this.edittedValue(null);
		}.bind(this);
		this.save = function() {
			origVal = this.edittedValue();
			this.value(origVal);
			console.log('save', this.value(), origVal);
			this.msg('Saved!');
			this.finishEdit();
		}.bind(this);

		this.onKeyPress = function(vm, e) {
			console.log(this.edittedValue());
			var keyCode = (e.which ? e.which : e.keyCode);
			if (keyCode === 13) {
				this.save();
				return false;
			}
			return true;

		}.bind(this);

		this.toggle = function() {
			if(!this.isEditing())
				this.startEdit();
			//else
				//this.finishEdit();
		}.bind(this);


	},
	template: 
		'<div class="inline-edit-widget" data-bind="click: toggle">' +
			'<div class="form-group">' +
				'<label class="col-sm-3 control-label" data-bind="text: labelText + \':\'"></label>' +
				'<div class="col-sm-9" data-bind="css: {\'editing\': isEditing}">' +
					'<a href="#" data-bind="text: value()"></a>' +
					'<div class="inline-edit-form-field">' + 
						'<input type="text" class="form-control" data-bind="value: edittedValue, valueUpdate: \'keyup\', hasFocus: isEditing, event: {blur: finishEdit }, executeOnEnter: save"/>' +
						'<small>Press \'Enter\' to save value</small>' +
					'</div>' +
				'</div>' + 
			'</div></div>'
});
