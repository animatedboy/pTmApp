var bookMarkFolderController = function($scope,bookMarkService) {

    var init = function() {
        _getFolders($scope.vdo);
    };

    var _addBoard = function(vdo) {
        bookMarkService.addBoard(vdo);
    };

    var _getFolders = function(vdo) {
        bookMarkService.getFolders(vdo);
    };

    var _deleteBoard = function(vdo,index) {
        bookMarkService.deleteBoard(vdo,index);
    };


    var _addList =function (board) {
        bookMarkService.addList(board);
    };

     var _deleteList =function (board,index) {
        bookMarkService.deleteList(board,index);
    };

    var _addCard = function (list) {
       bookMarkService.addCard(list);
    };

    var _deleteCard = function(list,index) {
        bookMarkService.deleteCard(list,index);
    }

    $scope.vdo = {
        addBoard: _addBoard,
        getFolders: _getFolders,
        deleteBoard: _deleteBoard,
        boards: [],
        addList:_addList,
        deleteList:_deleteList,
        addCard:_addCard,
        deleteCard:_deleteCard
    }

    init();

};



angular.module('pinitapp').controller('bookMarkFolderController', ['$scope','bookMarkService', bookMarkFolderController]);
