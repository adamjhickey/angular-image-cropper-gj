if (ON_TEST) {
  require('./imageCropperDirective.test.js')(angular);
}

module.exports = function(angular, Cropper) {
  require('./angular-image-cropper.scss');
  angular
    .module('imageCropper')
    .directive('imageCropper', function() {
      return {
        restrict: 'E',
        scope: {
          centerOnInit: '@',
          checkCrossOrigin: '@',
          cropCallback: '&',
          api: '&',
          fitOnInit: '@',
          height: '@',
          imageUrl: '@',
          showControls: '@',
          width: '@',
          zoomStep: '@',
          actionLabels: '&'
        }, 
        controllerAs: 'vm',
        controller: ['$scope', function($scope) {
          var self = this;

        //get values for non eval boolean variables
				this.imageUrl = $scope.imageUrl;
				this.width = $scope.width;
				this.height = $scope.height;
				this.zoomStep = $scope.zoomStep;

        // Get action labels.
        this.actionLabels = $scope.actionLabels();

        // Get callback.
        this.apiCallback = $scope.api();
        this.cropCallback = $scope.cropCallback();

       // Eval for boolean values.
        this.fitOnInit = eval($scope.fitOnInit);
        this.centerOnInit = eval($scope.centerOnInit);
        this.checkCrossOrigin = eval($scope.checkCrossOrigin);
        this.showControls = eval($scope.showControls);

        this.init = function() {
            this.target = this.element;
            this.api = new Cropper(self);
          }
        }],
        'link': function(scope, element, attributes, controller) {
          controller.element = element[0];
          controller.init();
        }
      };
    });
};
