/**
 * Controllers
 * @module controllers
 */
define(function (require, exports, module) {

    'use strict';

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    function MainCtrl(lpWidget, $scope, $timeout, lpCoreBus) {
        var ctrl = this;
        
        ctrl.lpWidget = lpWidget;
        ctrl.$scope = $scope;
        ctrl.$timeout = $timeout;
        ctrl.lpCoreBus = lpCoreBus;
    }

    MainCtrl.prototype.$onInit = function() {
        // Do initialization here
        var ctrl = this;        
        var activeTimeout = null;
        var eventName = ctrl.lpWidget.getPreference('showNotificationEventName');
        var timeout = ctrl.lpWidget.model.getPreference('timeout') || 5000;

        ctrl.message = null;

        ctrl.lpCoreBus.subscribe(eventName, function(data) {
            // Update the $scope when setting message
            ctrl.$scope.$evalAsync(function() {                
                ctrl.message = data;
            });

            // Cancel the activeTimeout when it is still active
            if(activeTimeout) {
                // Cancel and clear the activeTimeout
                ctrl.$timeout.cancel(activeTimeout);
                activeTimeout = null;
            }

            // Set the timeout to clear the message after a certain amount of time
            activeTimeout = ctrl.$timeout(function() {
                ctrl.message = null;
                activeTimeout = null;
            }, timeout);
        });     

        // Reinitialize when preferenced has been saved
        ctrl.lpWidget.addEventListener('preferencesSaved', function() {
            ctrl.lpWidget.refreshHTML();
        });
    };

    module.exports = MainCtrl;
});
