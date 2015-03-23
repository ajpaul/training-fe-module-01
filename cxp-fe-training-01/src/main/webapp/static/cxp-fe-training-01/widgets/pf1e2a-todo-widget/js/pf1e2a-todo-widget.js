define(['jquery'], function($) {
	"use strict";

	var self;

	function Todo(widget) {
		self = this;

		self.widget = widget;
		self.$widget = $(widget.body);

		return self;
	}

	Todo.prototype.init = function() {
		window.alert('it works!');
	}

	return function(widget) {
		var todo = new Todo(widget);
		todo.init();
	}
});
