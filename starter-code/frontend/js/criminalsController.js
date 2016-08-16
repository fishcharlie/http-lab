angular.module('CriminalsApp')
  .controller('criminalsController', criminalsController);

criminalsController.$inject = ["$http", "$scope"];
function criminalsController($http, $scope){
  var self = this;
  // self.criminals = [
  //   {name: "The bad guy", location: "World", status: "Dead"},
  //   {name: "The bad guy 2", location: "World", status: "Alive"},
  //   {name: "The bad guy 3", location: "World", status: "dead"},
  //   {name: "The bad guy 4", location: "World", status: "alive"},
  //   {name: "The bad guy 5", location: "World", status: "unknown"},
  //   {name: "The bad guy 6", location: "World", status: "Unknown"},
  // ];

  function getCriminals(){
    $http
      .get('http://localhost:3000/criminals')
      .then(function(response){
        self.criminals = response.data.criminals;
    });
  }
  getCriminals();


  $scope.submit = function () {
    if (!self.newCriminal.status) {
      self.newCriminal.status = "Unknown";
    }
    var data = self.newCriminal;
    $http
      .post('http://localhost:3000/criminals', data)
      .then(function(response){
        self.newCriminal = {};
        self.newCriminal.status = "Unknown";
        getCriminals();
      });
  };

  $scope.delete = function (id) {
    console.log(id);
    $http
      .delete('http://localhost:3000/criminals/'+id)
      .then(function(response){
        getCriminals();
      });
  };



}
