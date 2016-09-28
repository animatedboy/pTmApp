var addBoardController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.vdo = data.vdo;
    $scope.vdo.boardName = '';

    $scope.ok = function(vdo) {
        if ($scope.addBoardName.$valid) {
            $uibModalInstance.close(vdo)
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss()
    }
}];

var addListController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.vdo = data.board;
    $scope.vdo.listName = '';

    $scope.ok = function(vdo) {
        if ($scope.addListForm.$valid) {
            $uibModalInstance.close(vdo)
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss()
    }
}];

var addCardController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.vdo = data.list;
    $scope.vdo.cardName = '';
    $scope.vdo.cardDesc = "";

    $scope.ok = function(vdo) {
        if ($scope.addCardForm.$valid) {
            $uibModalInstance.close(vdo)
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss()
    }
}];


var bookMarkService = function(dialogService, serRestApi, $state) {
    var bookMarkServiceRef = this,
        privateStore = {};

    var Board = function() {
        this.boardName = "";
        this.lists = [];
    };

    var List = function() {
        this.listName = "";
        this.cards = [];
    }

    var Card = function() {
        this.cardName = '';
        this.cardDesc = "";
    }

    bookMarkServiceRef.getFolders = function(vdo) {
        privateStore.data = privateStore.data ? privateStore.data : [{
            "boardName": "Todo",
            "boardID": "101",
            "lists": [{
                "listName": "quick",
                "listID": 1,
                "cards": [{
                    "cardName": "Do work",
                    "cardDesc": "asdasf",
                    "cardID": 3
                }, {
                    "cardName": "asfdasfasf",
                    "cardID": 4
                }]
            }]
        }, {
            "boardName": "Todo",
            "boardID": "102",
            "lists": [{
                "listName": "quick",
                "listID": 2,
                "cards": [{
                    "cardName": "Do work",
                    "cardDesc": "asdasf",
                    "cardID": 1
                }, {
                    "cardName": "asfdasfasf",
                    "cardDesc": "asdasf",
                    "cardID": 2
                }]
            }]
        }];
        vdo.boards = privateStore.data
            /*serRestApi.getApi('/api/bookMarks', '').then(function(response) {
                vdo.lists = [{cardName:"asfdasfasf"},{cardName:"asfdasfasf"}];
            },defaultErrorHandler)*/
    };

    var addBoardCallBack = function(data) {
        var board = new Board();
        board.boardName = data.boardName;
        data.boards.push(board);
    };

    bookMarkServiceRef.addBoard = function(vdo) {
        dialogService.showCustomDialog('../partials/addBoard.html', addBoardController, {
            data: {
                vdo: vdo
            }
        }, addBoardCallBack, 'sm');
    };

    var addListCallBack = function(data) {
        var list = new List();
        list.listName = data.listName;
        data.lists.push(list);
    };

    bookMarkServiceRef.addList = function(board) {
        dialogService.showCustomDialog('../partials/addList.html', addListController, {
            data: {
                board: board
            }
        }, addListCallBack, 'sm');
    };

    var addCardCallBack = function(data) {
        var card = new Card();
        card.cardName = data.cardName;
        card.cardDesc = data.cardDesc;
        data.cards.push(card);
    };

    bookMarkServiceRef.addCard = function(list) {
        dialogService.showCustomDialog('../partials/addCard.html', addCardController, {
            data: {
                list: list
            }
        }, addCardCallBack, 'sm');
    };

    bookMarkServiceRef.deleteBoard = function(vdo, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this board?', true).result.then(function(value) {
            if (value) {
                vdo.boards.splice(index, 1)
            }
        });
    };

    bookMarkServiceRef.deleteList = function(board, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this list?', true).result.then(function(value) {
            if (value) {
                board.lists.splice(index, 1)
            }
        });
    }

     bookMarkServiceRef.deleteCard = function(list, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this card?', true).result.then(function(value) {
            if (value) {
                list.cards.splice(index, 1)
            }
        });
    };

    bookMarkServiceRef.backToFolders = function() {
        $state.go('folders');
    }

};




angular.module('pinitapp').service('bookMarkService', ['dialogService', 'serRestApi', '$state', bookMarkService])
