//CONTROLERS

angular.module('tweetSmartSearch')
    
    .controller('TwitterController', function($scope, $q, twitterService) {

    $scope.tweets; //array of tweets
    
    twitterService.initialize();
    
    $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) { //.then implemento el regreso de la promise recibido en el return del servicio
            $scope.tweets = data;
        });
    }
    
     $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                    $scope.refreshTimeline();
                };
        });
    }
     
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $scope.refreshTimeline();
    }

});                                 