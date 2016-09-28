
var bookMarkController = function($scope, $state, bookMarkService) {
    var init = function() {
        $scope.vdo.boardID = $state.params.boardID
        _getFolderBookMarks($scope.vdo)
    };
    var _getFolderBookMarks = function(vdo) {
        $scope.board=bookMarkService.getFolderBookMarks(vdo);
    };
    var _deleteBookMark = function(vdo,bookMark) {
    	bookMarkService.deleteBookMark(vdo,bookMark)
    };
    var _addBookMark = function(vdo) {
    	bookMarkService.addBookMark(vdo);
    };
    var _editBoard = function(boardID) {
        bookMarkService.editBoard(boardID);
    }
    var _backToFolders = function() {
        bookMarkService.backToFolders();
    }
    $scope.vdo = {
        folderID: '',
        board: {},
        deleteBookMark: _deleteBookMark,
        addBookMark: _addBookMark,
        editBoard: _editBoard,
        getFolderBookMarks: _getFolderBookMarks,
        backToFolders:_backToFolders,
        regEx:'^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$'
    }

    init();

};



angular.module('pinitapp').controller('bookMarkController', ['$scope', '$state', 'bookMarkService', bookMarkController]);
