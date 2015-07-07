/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function(lpWidget) {
        var ctrl = this;

        ctrl.tasks = [];

        ctrl.limit = lpWidget.model.getPreference('limit') || 5;

        // listen to pref changes
        lpWidget.addEventListener('preferencesSaved', function() {
            ctrl.limit = lpWidget.model.getPreference('limit') || 5;
        });

        /**
         * @method checkLimit
         * Checks if you can post more todo tasks
         * @return {Boolean} true|false
         */
        function checkLimit() {
            if(ctrl.tasks.length >= ctrl.limit) {
                var leftToDo = ctrl.tasks.filter(function(t) {
                    return !t.done;
                });

                // check if we have less open todos than the current limit
                return leftToDo.length < ctrl.limit;
            } else {
                return true;
            }
        }

        ctrl.addTask = function(data) {
            if(checkLimit()) {
                var newTask = {
                    done: false,
                    description: data.description
                };

                ctrl.tasks.push(newTask);
            }
        };

        ctrl.removeTask = function(taskId) {
            ctrl.tasks.splice(taskId, 1);
        };
    };
});
