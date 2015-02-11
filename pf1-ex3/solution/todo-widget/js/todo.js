define(['portal!jquery','portal!launchpad/lib/ui/responsive'], function($, Responsive) {
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

		this.narrow = false;
	}

	Todo.prototype.init = function() {
		var self = this;

		self.$widgetBody.on('click', SELECTORS.ADD, function(event) {
			var limit = self.widget.getPreference('limit');
			if (self.$list.children(":not(." + CLASSES.COMPLETED + ")").length < limit) {
				var text = self.$text.val(),
				    item = Mustache.render(self.itemTemplate, {text: text, narrow: self.narrow, hidden: CLASSES.HIDDEN});
				self.toggleMain();
				self.$list.append(item);
				gadgets.pubsub.publish('todos-updated', {totalTodos: self.$list.children(SELECTORS.ITEM).length});
			}
		});

		var toggleCompleted = function(event) {
			var $item = $(this).closest(SELECTORS.ITEM);
			$item.toggleClass(CLASSES.COMPLETED);
			var $checkbox = $(this).find(SELECTORS.TOGGLE_ITEM);
			$checkbox.prop("checked", !$checkbox.prop("checked"));
		};

		//self.$widgetBody.on('change', SELECTORS.TOGGLE_ITEM, toggleCompleted);

		self.$widgetBody.on('click', SELECTORS.REMOVE_ITEM, function(event) {
			var $item = $(this).closest(SELECTORS.ITEM);
			$item.remove();
			self.toggleMain();
		});

		Responsive.enable(self.$widgetBody).rule({
			'max-width': 399,
			then: function() {
				self.narrow = true;
				self.$list.find(SELECTORS.TOGGLE_ITEM).addClass(CLASSES.HIDDEN);
				self.$widgetBody.off('change', SELECTORS.TOGGLE_ITEM, toggleCompleted);
				self.$widgetBody.on('click', SELECTORS.ITEM, toggleCompleted);
			}
		}).rule({
			'min-width': 400,
			then: function() {
				self.narrow = false;
				self.$list.find(SELECTORS.TOGGLE_ITEM).removeClass(CLASSES.HIDDEN);
				self.$widgetBody.on('change', SELECTORS.TOGGLE_ITEM, toggleCompleted);
				self.$widgetBody.off('click', SELECTORS.ITEM, toggleCompleted);
			}
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