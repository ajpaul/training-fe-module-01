define(['portal!jquery'], function($) {
	'use strict';

	function Todo(widget) {
		this.widget = widget;
		this.$widgetBody = $(widget.body);
	}

	Todo.prototype.init = function() {
		console.log('Widget initialized');

		console.log(this.widget.model.getPreference('limit'));

		this.widget.model.addEventListener('PrefModified', function(event) {
		    console.log(event);
		});
	};

	return function(widget) {
		var widgetInstance = new Todo(widget);
		widgetInstance.init();
	};
});
