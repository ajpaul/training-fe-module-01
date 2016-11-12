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
     *  The function getLimit and get getNotificationEventName function implements the Lazy Pattern.
     *  The first time the function is executed it gets the preference from Widget,
     *  but during the whole life flow of the widget it will not change, so we keep
     *  a reference to that preference and the next time the function is executed it
     *  will not ask the Widget again.
     */ 
    function getLimit(lpWidget) {
        var limit = lpWidget.getPreference('limit');
        // Override the function to not get it from the Widget Object
        function getLimit() {
            return limit;
        }
        return limit;
    }

    function getNotificationEventName(lpWidget) {
        var notificationEventName = lpWidget.getPreference('showNotificationEventName');
        // Override the function to not get it from the Widget Object
        function getNotificationEventName() {
            return notificationEventName;
        }
        return notificationEventName;
    }

    function sendNotification(lpCoreBus, lpWidget, notificationType, tasksLength) {
        if(notificationType) {
            lpCoreBus.publish(getNotificationEventName(lpWidget), {
                item: 'todo',
                action: notificationType,
                amount: tasksLength,
                limit: getLimit(lpWidget)
            });
        }
    }

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(TasksService, lpWidget, lpCoreBus, $scope) {
        var ctrl = this;

        ctrl.TasksService = TasksService;
        ctrl.lpWidget = lpWidget;
        ctrl.lpCoreBus = lpCoreBus;
        ctrl.$scope = $scope;
    }

    MainCtrl.prototype.$onInit = function () {
        // Do initialization here
        var ctrl = this;

        ctrl.narrow = false;
        ctrl.TasksService.setLimit(getLimit(ctrl.lpWidget));
        ctrl.tasks = ctrl.TasksService.getTasks();
        setupEmptyModel(ctrl);
        
        // Reinitialize when preferenced has been saved
        ctrl.lpWidget.addEventListener('preferencesSaved', function () {
            ctrl.lpWidget.refreshHTML();
        });
    };
    
    MainCtrl.prototype.checkSize = function (data) {
        var ctrl = this;
        ctrl.$scope.$evalAsync(function () {
            ctrl.narrow = data.width && data.width < 500;
        });
    };

    MainCtrl.prototype.addTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.addTask(task);
        setupEmptyModel(ctrl);
        sendNotification(ctrl.lpCoreBus, ctrl.lpWidget, 'added', ctrl.tasks.length); 
    };

    MainCtrl.prototype.removeTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.removeTask(task);
        sendNotification(ctrl.lpCoreBus, ctrl.lpWidget, 'removed', ctrl.tasks.length);
    }

    MainCtrl.prototype.toggleTask = function (task) {
        var ctrl = this;
        ctrl.tasks = ctrl.TasksService.toggleTask(task);
        sendNotification(ctrl.lpCoreBus, ctrl.lpWidget, 'updated', ctrl.tasks.length);
    }

    module.exports = MainCtrl;
});

        