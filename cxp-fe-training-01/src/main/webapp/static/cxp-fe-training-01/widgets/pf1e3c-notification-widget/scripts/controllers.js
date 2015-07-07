/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    // @ngInject
    exports.MainCtrl = function(Gadgets, lpWidget, $scope, $timeout) {
        var ctrl = this; //self this controller
        var activeTimeout = null;

        ctrl.message = null;

        ctrl.timeout = lpWidget.model.getPreference('timeout') || 5000;

        // listen to pref changes
        lpWidget.addEventListener('preferencesSaved', function() {
            ctrl.timeout = lpWidget.model.getPreference('timeout') || 5000;
        });

        Gadgets.pubsub.subscribe('todo:event', function(data) {
            ctrl.message = data;
            $scope.$apply(); //async stuff, we need to refresh the scope...

            // reset display timeout if any
            if(activeTimeout) {
                $timeout.cancel(activeTimeout);
                activeTimeout = null;
            }

            activeTimeout = $timeout(function() {
                ctrl.message = null; // reste message
                $scope.$apply(); //again, refresh scope...
                activeTimeout = null; // remove the timeout
            }, ctrl.timeout);
        });
    };
});
