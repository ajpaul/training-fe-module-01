define(['portal!jquery'], function($) {
	'use strict';

	var SELECTORS = {
		MAIN: "[data-js=bt-todo-notification-main]",
		TEMPLATE: "[data-template=bt-todo-notification-template]"
	};

	function TodoNotification(widget) {
		this.widget = widget;
		this.$widgetBody = $(widget.body);

		this.$main = this.$widgetBody.find(SELECTORS.MAIN);

		this.template = this.$widgetBody.find(SELECTORS.TEMPLATE).text();
	}

	TodoNotification.prototype.init = function() {
		var self = this;

		//listen for events on the todos-updated channel
		gadgets.pubsub.subscribe('todos-updated', function(data) {
			var $message = $(Mustache.render(self.template, data));
			self.$main.append($message);
			
			//clear after 5s
			setTimeout(function() {
				$message.remove();
			}, 5000);
		});
	};

	return function(widget) {
		var widgetInstance = new TodoNotification(widget);
		widgetInstance.init();
	};
});