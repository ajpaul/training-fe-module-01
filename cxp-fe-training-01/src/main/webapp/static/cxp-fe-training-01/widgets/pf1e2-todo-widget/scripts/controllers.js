/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function() {
        var ctrl = this;

        ctrl.tasks = [];

        ctrl.addTask = function(data) {
            var newTask = {
                done: false,
                description: data.description
            };

            ctrl.tasks.push(newTask);
        };

        ctrl.removeTask = function(taskId) {
            ctrl.tasks.splice(taskId, 1);
        };
    };
});
