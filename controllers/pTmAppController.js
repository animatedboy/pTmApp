var pTmAppController = function($scope,pTmAppService) {

    var init = function() {
        _getFolders($scope.vdo);
    };

    var _addBoard = function(vdo) {
        pTmAppService.addBoard(vdo);
    };

    var _getFolders = function(vdo) {
        pTmAppService.getFolders(vdo);
    };

    var _deleteBoard = function(vdo,index) {
        pTmAppService.deleteBoard(vdo,index);
    };


    var _addList =function (board) {
        pTmAppService.addList(board);
    };

     var _deleteList =function (board,index) {
        pTmAppService.deleteList(board,index);
    };

    var _addCard = function (list) {
       pTmAppService.addCard(list);
    };

    var _deleteCard = function(list,index) {
        pTmAppService.deleteCard(list,index);
    }

    var _editCard = function(card){
        pTmAppService.editCard(card);
    }

    var _editList = function(list){
        pTmAppService.editList(list);
    }

    $scope.vdo = {
        addBoard: _addBoard,
        getFolders: _getFolders,
        deleteBoard: _deleteBoard,
        boards: [],
        addList:_addList,
        deleteList:_deleteList,
        addCard:_addCard,
        deleteCard:_deleteCard,
        editCard:_editCard,
        editList:_editList
    }

    init();

};



angular.module('pTmApp').controller('pTmAppController', ['$scope','pTmAppService', pTmAppController]);
