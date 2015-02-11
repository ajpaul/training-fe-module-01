define(['portal!jquery'], function($) {
	'use strict';

	var SELECTORS = {
		TEXT: "[data-js=bt-todo-text]",
		ADD: "[data-js=bt-todo-add]",
		NOTODOS: "[data-js=bt-todo-notodos]",
		LIST: "[data-js=bt-todo-list]",
		ITEM: "[data-js=bt-todo-item]",
		TOGGLE_ITEM: "[data-js=bt-todo-toggle-item]",
		REMOVE_ITEM: "[data-js=bt-todo-remove-item]",
		ITEM_TEMPLATE: "[data-template=bt-todo-item-template]"
	};

	var CLASSES = {
		COMPLETED: "bt-todo-completed",
		HIDDEN: "hidden"
	};

	function Todo(widget) {
		this.widget = widget;
		this.$widgetBody = $(widget.body);

		this.$text = this.$widgetBody.find(SELECTORS.TEXT);
		this.$notodos = this.$widgetBody.find(SELECTORS.NOTODOS);
		this.$list = this.$widgetBody.find(SELECTORS.LIST);

		this.itemTemplate = this.$widgetBody.find(SELECTORS.ITEM_TEMPLATE).text();
	}

	Todo.prototype.init = function() {
		var self = this;

		self.$widgetBody.on('click', SELECTORS.ADD, function(event) {
			var text = self.$text.val(),
			    item = Mustache.render(self.itemTemplate, {text: text});
			self.toggleMain();
			self.$list.append(item);
		});

		self.$widgetBody.on('change', SELECTORS.TOGGLE_ITEM, function(event) {
			var $item = $(this).closest(SELECTORS.ITEM);
			$item.toggleClass(CLASSES.COMPLETED);
		});

		self.$widgetBody.on('click', SELECTORS.REMOVE_ITEM, function(event) {
			var $item = $(this).closest(SELECTORS.ITEM);
			$item.remove();
			self.toggleMain();
		});
	};

	Todo.prototype.toggleMain = function() {
		if (this.$list.children(SELECTORS.ITEM).length == 0) {
			this.$notodos.toggleClass(CLASSES.HIDDEN);
			this.$list.toggleClass(CLASSES.HIDDEN);
		}
	}

	return function(widget) {
		var widgetInstance = new Todo(widget);
		widgetInstance.init();
	};
});