/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function(lpWidget, $scope, $timeout) {
        var ctrl = this;

        ctrl.tasks = [];

        ctrl.limit = lpWidget.model.getPreference('limit') || 5;

        ctrl.narrow = false;

        // listen to pref changes
        lpWidget.addEventListener('preferencesSaved', function() {
            ctrl.limit = lpWidget.model.getPreference('limit') || 5;
        });

        /**
         * @method checkSize
         * callback method for element-resize directive
         * @return undefined
         */
        ctrl.checkSize = function(data) {
            if(data.width && data.width < 400) {
                ctrl.narrow = true;
            } else {
                ctrl.narrow = false;
            }

            // TODO: improve this temporary fix
            window.setTimeout(function() {
                $scope.$apply();
            }, 0);
        };

        /**
         * @method rowAction
         * if ctrl.narrow = true, then it updates the done property of the current item
         * else, it does nothing
         * @return {Boolean} item.done
         */
        ctrl.rowAction = function(taskIdx) {
            if(ctrl.narrow) {
                ctrl.tasks[taskIdx].done = !ctrl.tasks[taskIdx].done;
            }

            return ctrl.tasks[taskIdx].done;
        };

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

        /**
         * @method addTask
         * adds a new task in the array of tasks
         * @return {Object} newTask || undefined
         */
        ctrl.addTask = function(data) {
            if(checkLimit()) {
                var newTask = {
                    done: false,
                    description: data.description
                };

                ctrl.tasks.push(newTask);

                return newTask;
            }
        };

        /**
         * @method removeTask
         * removes a task from the array of tasks
         * @return undefined
         */
        ctrl.removeTask = function(taskId) {
            ctrl.tasks.splice(taskId, 1);
        };
    };
});
