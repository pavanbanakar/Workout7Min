/**
 * Created by Pavan on 1/16/2016.
 */

function WorkoutController($scope,$interval,$location){


    function Exercise(args) {
        this.name = args.name;
        this.title = args.title;
        this.description = args.description;
        this.image = args.image;
        this.related = {};
        this.related.videos = args.videos;
        this.nameSound = args.nameSound;
        this.procedure=args.procedure;
    };

    function WorkoutPlan(args) {
        this.exercises = [];
        this.name = args.name;
        this.title = args.title;
        this.restBetweenExercise = args.restBetweenExercise;

        this.totalWorkoutDuration = function () {
            if (this.exercises.length == 0) return 0;
            var total = 0;
            angular.forEach(this.exercises, function (exercise) {
                total = total + exercise.duration;
            });
            return this.restBetweenExercise * (this.exercises.length - 1)
                + total;
            };
    };

    var restExercise;
    var workoutPlan;

    var startWorkout = function () {
        workoutPlan = createWorkout();
        restExercise = {
            details: new Exercise({
                name: "rest",
                title: " Relax!",
                description: " Relax a bit!",
                image: "img/rest.png"
            }),
            duration: workoutPlan.restBetweenExercise
        };
        $scope.workoutTimeRemaining =
            workoutPlan.totalWorkoutDuration();
        $interval(function () {
            $scope.workoutTimeRemaining = $scope.workoutTimeRemaining
            - 1;
        }, 1000, $scope.workoutTimeRemaining);
        startExercise(workoutPlan.exercises.shift());
    };

    var createWorkout = function () {
        var workout = new WorkoutPlan({
            name: "7minWorkout",
            title: "7 Minute Workout",
            restBetweenExercise: 10
        });
        workout.exercises.push({
            details: new Exercise({
                name: "jumpingJacks",
                title: "Jumping Jacks",
                description: "Jumping Jacks.",
                image: "img/JumpingJacks.png",
                videos: ['//www.youtube.com/embed/MMV3v4ap4ro'],
                variations: [],
                procedure: ""
            }),
            duration: 30
        });
        return workout;
    };
	var getNextExercise = function (currentExercisePlan) {
											var nextExercise = null;
											if (currentExercisePlan === restExercise) {
											nextExercise = workoutPlan.exercises.shift();
											} else {
											if (workoutPlan.exercises.length != 0) {
											nextExercise = restExercise;
											}
											}
											return nextExercise;
};

    var startExercise = function (exercisePlan) {
        $scope.currentExercise = exercisePlan;
		$scope.currentExerciseDuration = 0;
		
		
        $interval(function () {
        ++$scope.currentExerciseDuration;
        },1000,$scope.currentExercise.duration ).then(
					function () {
					var next = getNextExercise(exercisePlan);
					if (next) {
					startExercise(next);
					} else {
                        $location.path('/finish');
					console.log("Workout complete!")
					}
					});
		
		
		
		// $scope.$watch('currentExerciseDuration',function(nval){
			// if (nval == $scope.currentExercise.duration) {
				// var next = getNextExercise($scope.currentExercise);
				// if (next) {
				// startExercise(next);
				// } else {
				// console.log("Workout complete!")
				// }
			// }else
			// {
				
			// }
		// })
    
		
        };
    var init = function () {
        startWorkout();
    };
    init();

};

WorkoutController['$inject'] = ['$scope','$interval','$location'];
angular.module('7minWorkout').controller('WorkoutController',WorkoutController);
