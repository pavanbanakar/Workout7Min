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
            $scope.workoutPlan = createWorkout();
            restExercise = {
                details: new Exercise({
                    name: "rest",
                    title: " Relax!",
                    description: " Relax a bit!",
                    image: "img/rest.png"
                }),
                duration: $scope.workoutPlan.restBetweenExercise
            };
            $scope.workoutTimeRemaining =
                $scope.workoutPlan.totalWorkoutDuration();
            $interval(function () {
                $scope.workoutTimeRemaining = $scope.workoutTimeRemaining
                - 1;
            }, 1000, $scope.workoutTimeRemaining);
            startExercise($scope.workoutPlan.exercises.shift());
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
                    procedure: "Assume an erect position, with feet <br/>Slightly bend your knees, and propel yourself <br/>While in air, bring your legs out to the side about "
                }),
                duration: 30
            });

             workout.exercises.push({
                 details: new Exercise({
                      name: "wallSit",
                      title: "Wall Sit",
                      description: "Wall Sit.",
                      image: "img/wallsit.png",
                      videos: [],
                      variations: []

                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "pushUp",
                      title: "Push Up",
                      description: "Discription about pushup.",
                      image: "img/pushup.png",
                      videos: ["https://www.youtube.com/watch?v=Eh00_rniF8E", "https://www.youtube.com/watch?v=ZWdBqFLNljc", "https://www.youtube.com/watch?v=UwRLWMcOdwI", "https://www.youtube.com/watch?v=ynPwl6qyUNM", "https://www.youtube.com/watch?v=OicNTT2xzMI"],
                      variations: ["Planche push-ups", "Knuckle push-ups", "Maltese push-ups", "One arm versions"],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "crunches",
                      title: "Abdominal Crunches",
                      description: "Abdominal Crunches.",
                      image: "img/crunches.png",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "stepUpOntoChair",
                      title: "Step Up Onto Chair",
                      description: "Step Up Onto Chair.",
                      image: "img/stepUpOntoChair.jpeg",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "squat",
                      title: "Squat",
                      description: "Squat.",
                      image: "img/squat.png",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "tricepdips",
                      title: "Tricep Dips On Chair",
                      description: "Tricep Dips On Chair.",
                      image: "img/tricepdips.jpg",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "plank",
                      title: "Plank",
                      description: "Plank.",
                      image: "img/plank.png",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "highKnees",
                      title: "High Knees",
                      description: "High Knees.",
                      image: "img/highknees.png",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "lunges",
                      title: "Lunges",
                      description: "Lunges.",
                      image: "img/lunges.png",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "pushupNRotate",
                      title: "Pushup And Rotate",
                      description: "Pushup And Rotate.",
                      image: "img/pushupNRotate.jpg",
                      videos: [],
                      variations: [],
                      procedure: ""
                  }),
                  duration: 30
              });
              workout.exercises.push({
                  details: new Exercise({
                      name: "sidePlank",
                      title: "Side Plank",
                      description: "Side Plank.",
                      image: "img/sideplank.png",
                      videos: [],
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
                                                nextExercise = $scope.workoutPlan.exercises.shift();
                                                } else {
                                                if ($scope.workoutPlan.exercises.length != 0) {
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


    function WorkoutAudioController($scope,$timeout){
    $scope.exercisesAudio = [];


            var workoutPlanWatch = $scope.$watch('workoutPlan',function(newValue,oldValue){

                if(newValue){
                    angular.forEach($scope.workoutPlan.exercises,function(exercise){
                        $scope.exercisesAudio.push({
                            src:exercise.details.nameSound,
                            type:"audio/wav"
                        });
                    });
                    workoutPlanWatch();
                }
            });

            $scope.$watch('currentExercise',function(newValue,oldValue){
               if(newValue && (newValue !== oldValue)){
                   if($scope.currentExercise.details.name == 'rest'){
                       $timeout(function(){
                           $scope.nextUpAudio.play();
                       },2000);

                       $timeout(function(){
                           $scope.nextUpExerciseAudio.play($scope.currentExerciseIndex + 1,true);
                       },3000);
                       }
                   }
               });

            $scope.$watch('currentExerciseDuration',function(newValue,oldValue){

                if(newValue){
                    if(newValue == Math.floor($scope.currentExerciseDuration/2) && $scope.currentExercise.name !== 'rest'){
                        $scope.halfWayAudio.play();
                    }
                    else if(newValue === $scope.currentExerciseDuration -3){
                        $scope.aboutToCompleteAudio.play();
                    }
                }
            });
        var init =function(){
            };
            init();
    }
    WorkoutAudioController['$inject'] = ['$scope','$timeout'];
    angular.module('7minWorkout').controller('WorkoutAudioController',WorkoutAudioController);