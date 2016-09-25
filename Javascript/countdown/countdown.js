(function() {
    var app = angular.module('ngCountdown', []);
    app.directive('countdown', [
        'timeUtil',
        '$interval',
        function (Util, $interval) {

            return {
                scope: { date: '@' },
                controller: function($scope) {

                    $scope.timeLeft = true;
                    $scope.counting = -1;

                    var stop;

                    $scope.start = function() {
                        stop = $interval($scope.countdown, 1000);
                    };
                    $scope.stop = function() {
                        $interval.cancel(stop);
                    }
                    $scope.countdown = function () {
                        var diff, time, html;
                        diff = Math.floor(($scope.future.getTime() - new Date().getTime()) / 1000);

                        if(diff > 0) {
                            time = Util.convertTime(diff);
                            $scope.time = time;                        
                        }
                        else {
                            $scope.time  = {days: 0, hours: 0, minutes: 0, seconds:0};
                            $scope.stop();
                        }

                    };

                    $scope.time = {
                        days: 0,
                        hours: 0,
                        minutes: 0,
                        seconds: 0
                    };

                },
                template: '<div class="col">' +
                            '<div class="digit-block">' +
                                '<div class="number-block">Days</div>' +
                                '<div class="label-block">{{time.days}}</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col">' +
                            '<div class="digit-block">' +
                                '<div class="number-block">Hours</div>' +
                                '<div class="label-block">{{time.hours}}</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col">' +
                            '<div class="digit-block">' +
                                '<div class="number-block">Minutes</div>' +
                                '<div class="label-block">{{time.minutes}}</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="col">' +
                            '<div class="digit-block">' +
                                '<div class="number-block">Seconds</div>' +
                                '<div class="label-block">{{time.seconds}}</div>' +
                            '</div>' +
                        '</div>',
                restrict: 'AC',
                link: function ($scope, element) {
                    $scope.future = new Date($scope.date);

                    if($scope.future instanceof Date) {
                        $scope.start();
                    }
                }
            };
        }
    ]).factory('timeUtil', [function () {

        return {
            convertTime: function (t) {
                var days, hours, minutes, seconds;
                days = Math.floor(t / 86400);
                t -= days * 86400;
                hours = Math.floor(t / 3600) % 24;
                t -= hours * 3600;
                minutes = Math.floor(t / 60) % 60;
                t -= minutes * 60;
                seconds = t % 60;
                return {
                    days: days,
                    hours: hours,
                    minutes: minutes,
                    seconds: seconds
                };
            }
        };
    }]);
})();