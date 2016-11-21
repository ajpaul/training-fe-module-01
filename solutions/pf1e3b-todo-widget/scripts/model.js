/**
 * Models
 * @module models
 */
define( function (require, exports, module) {

    'use strict';
    
    var angular = require('angular');
    var uniqueTasksId = 0;

    function isAllowedToAddTask(tasks, limit) {
        // Get all the tasks that are not marked as done
        var undoneTasks = tasks.filter(function (task) {
            return !task.done;
        });

        // Return whether the undone tasks is below the limit to allow adding new the task
        return undoneTasks.length < limit;
    }

    function getUniqueId() {
      return ++uniqueTasksId;
    }

    /**
     * @constructor
     * @ngInject
     */
    function TasksService() {
        this.tasks = [];
        this.limit = 0;
    }

    TasksService.prototype.setLimit = function (limit) {
      this.limit = limit;
    };

    TasksService.prototype.getTasks = function () {
      return angular.copy(this.tasks);
    }

    TasksService.prototype.addTask = function (task) {
      if(isAllowedToAddTask(this.tasks, this.limit)) {                    
        task.id = getUniqueId();      
        this.tasks.push(task);
      }

      return angular.copy(this.tasks);
    }

    TasksService.prototype.toggleTask = function (task) {  
      var foundTask;       
      var foundTasks = this.tasks.filter(function (_task) {
        return _task.id === task.id;
      });

      foundTask = foundTasks.length ? foundTasks[0] : null;

      if(foundTask) {
        foundTask.done = !foundTask.done;
      }

      return angular.copy(this.tasks);
    }

    TasksService.prototype.removeTask = function (task){
      this.tasks = this.tasks.filter(function (_task) {
        return _task.id !== task.id;
      });
      
      return angular.copy(this.tasks);
    };

    module.exports = TasksService;
});
