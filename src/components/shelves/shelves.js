'use strict';

angular.module('polestar')
  .directive('shelves', function() {

    return {
      templateUrl: 'components/shelves/shelves.html',
      restrict: 'E',
      scope: {},
      replace: true,
      controller: function($scope, $timeout, vl, Spec, Config, Dataset, Logger, Pills) {
        $scope.Spec = Spec;
        $scope.schema = vl.schema.schema;
        $scope.pills = Pills;

        // $scope.markChange = function() {
        //   Logger.logInteraction(Logger.actions.MARK_CHANGE, Spec.spec.marktype);
        // };

        $timeout(function(){
          var marktypePop = new Drop({
          content: document.querySelector('.marktypePop-content'), 
          target: document.querySelector('.marktypePop-target'),
          position: 'bottom left',
          openOn: 'click'
          });  

          $scope.markChange = function(marktype) {
          Spec.spec.marktype = marktype;
          Logger.logInteraction(Logger.actions.MARK_CHANGE, Spec.spec.marktype);
          marktypePop.close();
        };
        },0);

        $scope.marktypeicons = {
          'point': {marktype: 'point', icon: 'fa fa-circle-o'}, 
          'tick': {marktype: 'tick', icon: 'fa fa-square'},
          'bar': {marktype: 'bar', icon: 'fa fa-bar-chart'},
          'line': {marktype: 'line', icon: 'fa fa-line-chart'},
          'area': {marktype: 'area', icon: 'fa fa-area-chart'},
          'text': {marktype: 'text', icon: 'fa fa-table'}
        };

        

        $scope.transpose = function(){
          vl.Encoding.transpose(Spec.spec);
        };

        $scope.clear = function(){
          Spec.reset();
        };

        $scope.$watch('Spec.spec', function(spec) {
          Logger.logInteraction(Logger.actions.SPEC_CHANGE, spec);

          Spec.update(spec);
        }, true /* watch equality rather than reference */);
      }
    };
  });
