define(['jquery', 'launchpad/modules/ui/scripts/components/responsive/scripts/libs/responsive'], function($, Responsive) {
    'use strict';

    var self = null,
        SELECTORS = {
            'FORM': '[data-js="bt-pf1e3b-todo-form"]',
            'LIST': '[data-js="bt-pf1e3b-todo-list"]',
            'TEMPLATE': '[data-template="bt-pf1e3b-task"]',
            'UPDATE': '[data-js="bt-pf1e3b-update-task"]',
            'REMOVE': '[data-js="bt-pf1e3b-remove-task"]',
            'INPUT': ':input[name="task"]',
            'ROW': '[data-js="bt-pf1e3b-todo-row"]'
        };

    /**
     * @constructor Todo
     * @param {Object} widget
     * @return this
     */
    function Todo(widget) {
        self = this;

        // storing the widget object
        self.widget = widget;

        // the task collector
        // acts as a factory
        self.tasks = [];

        // caching dom elements
        self.$widget = $(widget.body);
        self.$form = self.$widget.find(SELECTORS.FORM);
        self.$list = self.$widget.find(SELECTORS.LIST);

        // retrieve the task template
        self.template = self.$widget.find(SELECTORS.TEMPLATE).text();

        // responsiveness flag
        self.narrow = false;

        // get the limit preference
        self.getLimit();

        return self;
    }

    /**
     * @method init
     * @return undefined
     */
    Todo.prototype.init = function() {
        // handles submit events on the form
        self.$form.on('submit', self.addTask);
        // handles click events on the remove buttons
        self.$widget.on('click', SELECTORS.REMOVE, self.removeTask);
        // handles preference changes
        self.widget.addEventListener('preferencesSaved', self.getLimit);
        // custom behaviors based on viewport size
        self.handleResponsiveLayout();
    };

    /**
     * @method handleResponsiveLayout
     * enables responsiveness on the widget using Launchpad's Responsive lib
     * @return undefined
     */
    Todo.prototype.handleResponsiveLayout = function() {
        Responsive
            .enable(self.widget.body)
            .rule({
                'max-width': 399,
                then: function() {
                    self.narrow = true;
                    // disable click events on the checkboxes
                    self.$widget.off('click', SELECTORS.UPDATE, self.updateTask);
                    // handles click on the whole row
                    self.$widget.on('click', SELECTORS.ROW, self.updateTask);
                    // refresh the view
                    self.updateList();
                }
            })
            .rule({
                'min-width': 400,
                then: function() {
                    self.narrow = false;
                    // handles click on the whole row
                    self.$widget.off('click', SELECTORS.ROW, self.updateTask);
                    // handles click events on the checkboxes
                    self.$widget.on('click', SELECTORS.UPDATE, self.updateTask);
                    // refresh the view
                    self.updateList();
                }
            });
    };

    /**
    * @method getLimit
    * Retrieves and stores the limit preference
    * @return undefined
    */
    Todo.prototype.getLimit = function() {
        self.limit = self.widget.model.getPreference('limit');
    };

    /**
     * @method addTask
     * adds a new task to the array of tasks
     * @param {object} Event
     * @return undefined
     */
    Todo.prototype.addTask = function(e) {
        //prevent submission of the form
        e.preventDefault();

        function insert() {
            // check if there is a value in the input field
            // otherwise, discard
            if(self.$form.find(SELECTORS.INPUT).val()) {
                // we go a new task
                var task = {
                    idx: 'todo-' + Math.floor(Math.random() * 10000), // random id for the task
                    description: self.$form.find(SELECTORS.INPUT).val(), // task description
                    done: false // by default, task is `not` done
                };

                // add the task to the task's list
                self.tasks.push(task);

                // refresh the view
                self.updateList();
            }
        }

        // if the amount of task is superior or equal to the limit
        if(self.tasks.length >= self.limit) {
            // only if the amount of done todos is inferior to the limit
            // we add a new task
            if($.grep(self.tasks, function(el) {return !el.done;}).length < self.limit) {
                insert();
            }
        } else {
            insert();
        }
    };

    /**
     * @method updateTask
     * Updates the status of an exisiting task
     * @param {Object} Event
     * @return undefined
     */
    Todo.prototype.updateTask = function(e) {
        // iterate through the tasks and update the status of the matching task
        $(self.tasks).map(function(id, el) {
            if(el.idx === e.currentTarget.dataset.taskid) {
                el.done = !el.done;
            }

            return el;
        });

        self.updateList();
    };

    /**
     * @method removeTask
     * Removes a task from the current array of tasks
     * and updates the view
     * @param {Object} Event
     * @return undefined
     */
    Todo.prototype.removeTask = function(e) {
        // prevent the click event on the link element
        e.preventDefault();

        // filter the current task array, and remove the matching item
        self.tasks = $.grep(self.tasks, function(el) {
            return el.idx !== e.currentTarget.dataset.taskid;
        });

        // refresh the view
        self.updateList();
    };

    /**
     * @method updateList
     * Updates the view
     * @return undefined
     */
    Todo.prototype.updateList = function() {
        // render the Mustache template based on the current array of tasks
        // only render if there are tasks in the task array!
        if(self.tasks.length > 0) {
            self.$list.html(Mustache.render(self.template, {tasks: self.tasks, narrow: self.narrow}));
        } else {
            self.$list.html('');
        }
    };

    return function(widget) {
        var todo = new Todo(widget);
        todo.init();
    };
});
