var addBoardController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.vdo = data.vdo;
    $scope.vdo.boardName = '';

    $scope.ok = function(vdo) {
        if ($scope.addBoardName.$valid) {
            $uibModalInstance.close(vdo)
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss("")
    }
}];

var addListController = ['$scope', 'data', '$uibModalInstance', function($scope, data, $uibModalInstance) {
    $scope.vdo = data;
    $scope.vdo.editList = {
        listName:data.list.listName?data.list.listName:""
    };

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
    $scope.vdo = data;
    var card = angular.copy(data.card)
    $scope.vdo.editCard = {
        cardName: data.isEdit ? card.cardName : "",
        cardDesc: data.isEdit ? card.cardDesc : ""
    }

    $scope.ok = function(vdo) {
        if ($scope.addCardForm.$valid) {
            $uibModalInstance.close(vdo)
        }
    };

    $scope.close = function() {
        $uibModalInstance.dismiss()
    }
}];


var pTmAppService = function(dialogService,$state) {
    var pTmAppServiceRef = this,
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

    pTmAppServiceRef.getFolders = function(vdo) {
        privateStore.data = privateStore.data ? privateStore.data : {
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
        };
        vdo.board = privateStore.data
    };

    var addBoardCallBack = function(data) {
        var board = new Board();
        board.boardName = data.boardName;
        data.boards.push(board);
    };

    pTmAppServiceRef.addBoard = function(vdo) {
        dialogService.showCustomDialog('../partials/addBoard.html', addBoardController, {
            data: {
                vdo: vdo
            }
        }, addBoardCallBack, 'sm');
    };

    var addListCallBack = function(data) {
        if (data.isEdit) {
             angular.extend(data.list, data.editList);
        } else {
            var list = new List();
            list.listName = data.editList.listName;
            data.board.lists.push(list);
        }
    };

    pTmAppServiceRef.addList = function(board) {
        dialogService.showCustomDialog('../partials/addList.html', addListController, {
            data: {
                board: board,
                list: {},
                isEdit: false
            }
        }, addListCallBack, 'sm');
    };

    pTmAppServiceRef.editList = function(list) {
        dialogService.showCustomDialog('../partials/addList.html', addListController, {
            data: {
                board: {},
                list: list,
                isEdit: true
            }
        }, addListCallBack, 'sm');
    };

    var addCardCallBack = function(data) {
        if (data.isEdit) {
            angular.extend(data.card, data.editCard);
        } else {
            var card = new Card();
            card = data.editCard
            data.list.cards.push(card);
        }
    };

    pTmAppServiceRef.addCard = function(list) {
        dialogService.showCustomDialog('../partials/addCard.html', addCardController, {
            data: {
                list: list,
                card: {},
                isEdit: false
            }
        }, addCardCallBack, 'sm');
    };

    pTmAppServiceRef.editCard = function(card) {
        dialogService.showCustomDialog('../partials/addCard.html', addCardController, {
            data: {
                list: {},
                card: card,
                isEdit: true
            }
        }, addCardCallBack, 'sm');
    }

    pTmAppServiceRef.deleteBoard = function(vdo, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this board?', true).result.then(function(value) {
            if (value) {
                vdo.boards.splice(index, 1)
            }
        });
    };

    pTmAppServiceRef.deleteList = function(board, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this list?', true).result.then(function(value) {
            if (value) {
                board.lists.splice(index, 1)
            }
        });
    }

    pTmAppServiceRef.deleteCard = function(list, index) {
        dialogService.confirm('info', 'Warning!', 'Are you sure you want to delete this card?', true).result.then(function(value) {
            if (value) {
                list.cards.splice(index, 1)
            }
        });
    };

    pTmAppServiceRef.backToFolders = function() {
        $state.go('folders');
    }

};




angular.module('pTmApp').service('pTmAppService', ['dialogService','$state', pTmAppService])
