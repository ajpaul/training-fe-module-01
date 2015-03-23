define(['jquery'], function($) {
	'use strict';

	var self = null,
		SELECTORS = {
			'WRAPPER': '[data-js="message-wrapper"]',
			'TEMPLATE': '[data-template="message"]'
		};

	/**
	 * @constructor Notification
	 * @return this
	 */
	function Notification(widget) {
		self = this;

		self.widget = widget;

		self.$widget = $(widget.body);
		self.$wrapper = self.$widget.find(SELECTORS.WRAPPER);

		self.template = self.$widget.find(SELECTORS.TEMPLATE).text();

		self.timeout = null;
		self.delay = 5000;

		return self;
	}

	/**
	 * @method init
	 * @return undefined
	 */
	Notification.prototype.init = function() {
		gadgets.pubsub.subscribe('todo:notification', function(data) {
			if(self.timeout) {
				window.clearTimeout(self.timeout);
				self.$wrapper.html('');
			}

			self.$wrapper.html(Mustache.render(self.template, data));

			self.timeout = window.setTimeout(function() {
				self.$wrapper.html('');
			}, self.delay);
		});
	};

	return function(widget) {
		var notification = new Notification(widget);
		notification.init();
	}
})
