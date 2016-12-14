
(function (ng) {

    ng.module('myapp', []).factory('IdleTimeout', function ($timeout, $document) {

        return function (delay, onIdle, playOnce) {

            var idleTimeout = function (delay, onIdle) {
                var $this = this;
                $this.idleTime = delay;
                $this.goneIdle = function () {
                    console.log('Gone Idle');
                    onIdle();
                    $timeout.cancel($this.timeout);
                };
                return {
                    cancel: function () {
                        console.log('cancelTimeout');
                        return $timeout.cancel($this.timeout);
                    },
                    start: function (event) {
                        console.log('startTimeout', $this.idleTime);
                        $this.timeout = $timeout(function () {
                            $this.goneIdle();
                        }, $this.idleTime);
                    }
                };
            };

            var events = ['keydown', 'keyup', 'click', 'mousemove', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'focus'];
            var $body = angular.element($document);
            var reset = function () {
                idleTimer.cancel();
                idleTimer.start();
            };
            var idleTimer = idleTimeout(delay, onIdle);
            


            return {
                active: true,
                cancel: function () {
                    idleTimer.cancel();
                    ng.forEach(events, function (event) {
                        $body.off(event, reset);
                    });
                },
                start: function () {
                    idleTimer.start();
                    ng.forEach(events, function (event) {
                        $body.on(event, reset);
                    });
                }
            };
        };

    }).directive('timeoutTest', ['IdleTimeout', function (IdleTimeout) {
        return {
            restrict: 'AC',
            controller: function($scope) {
                $scope.msg = '';
                $scope.timer = null;
                $scope.active = false;
                $scope.start = function(timer) {
                    $scope.timer = new IdleTimeout(3000, $scope.cancel);
                    $scope.timer.start();
                    $scope.msg = 'Timer is running';
                    $scope.active = true;
                };
                $scope.cancel = function() {
                    console.log('app has gone idle');
                        
                    $scope.timer.cancel();
                    $scope.msg = 'Timer has stopped.';
                    $scope.active = false;
                };
            },
            link: function($scope, $el, $attrs) {
                $scope.start();
            }
        };
    }]);
}(angular));