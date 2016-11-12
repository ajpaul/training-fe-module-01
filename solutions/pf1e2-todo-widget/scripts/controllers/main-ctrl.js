/**
 * Controllers
 * @module controllers
 */
define(function (require, exports, module) {

    'use strict';

    var emptyModel = {
        done: false,
        description: ''
    };

    function setupEmptyModel(ctrl) {
        ctrl.newTask = angular.copy(emptyModel);
    }

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(TasksService) {
        var ctrl = this;

        ctrl.TasksService = TasksService;
    }

    MainCtrl.prototype.$onInit = function () {
        // Do initialization here
        var ctrl = this;

        ctrl.narrow = false;
        ctrl.tasks = ctrl.TasksService.getTasks();
        setupEmptyModel(ctrl);
    };

    MainCtrl.prototype.addTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.addTask(task);
        setupEmptyModel(ctrl);
    };

    MainCtrl.prototype.removeTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.removeTask(task);
    }

    MainCtrl.prototype.toggleTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.toggleTask(task);
    }

    module.exports = MainCtrl;
});