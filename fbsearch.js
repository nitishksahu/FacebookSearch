var myApp = angular.module('fbApp', ['ngAnimate']);

myApp.controller('fbCtrl', function ($scope, $http) {
    $scope.query="";
    $scope.page1=true;
    $scope.page2=false;
    $scope.myValue=false;
    $scope.tableData=false;
    $scope.albumPostLoading=false;
    $scope.imageUrl;
    $scope.id;
    $scope.page2Data="";
    $scope.favIcon;
    $scope.albumSlide=false;
    $scope.tableSlide=false;
    $scope.lastResponse;
    $scope.fbPostName="USC";
    $scope.fbPostUrl="a.jpg";
    $scope.isActive = function (navCaption) {
     var active = ($scope.type === navCaption);
     return active;
    };
    
  
    
    $scope.loadFavData = function(queryString,queryType){
            
            $scope.tableSlide=true;
            $scope.albumSlide=false;
//            $scope.tableSlide=false;
            $scope.tableData=false;
            $scope.loading=true;
            $scope.query=queryString;
            $scope.type=queryType
            //console.log('Seacrh for '+$scope.query+ ' type is '+ $scope.type);
            $scope.page1=true;
            $scope.page2=false; 
            $scope.includedKeys;
            $scope.favouritesData="";
            if(queryType=='favourites'){
                $scope.favDataShow=true;
                 
                for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                    if(i==0 && i==len-1){
                        $scope.favouritesData="["+$scope.favouritesData+localStorage.getItem(localStorage.key(i)) ;
                    }
                    else if(i==0){
                         $scope.favouritesData="["+localStorage.getItem(localStorage.key(i))+"," ;   
                    }
                    else if(i==len-1){
                         $scope.favouritesData+=localStorage.getItem(localStorage.key(i));  
                    }
                        
                    else {
                         $scope.favouritesData=$scope.favouritesData+localStorage.getItem(localStorage.key(i))+",";
                    }
                       
                }
                if(localStorage.length>0){
                     $scope.favouritesData+="]";
                console.log($scope.favouritesData);
                //$scope.detailsData = localStorage.getItem('favData'); 
                //console.log(JSON.parse( $scope.favouritesData));
                $scope.favouritesData=JSON.parse( $scope.favouritesData);
                    
                }
               
                $scope.pagingData=null;
                
                $scope.loading=false;
            }
    }
    
    $scope.loadData= function(queryString,queryType){
           $scope.tableSlide=false;
            if($scope.query=="" || queryString=="" ){
                return false;
            }
            console.log(queryType+" q");
            if(!queryType || queryType=='favourites'){
                queryType="user";
            }
            
            $scope.tableData=false;
            $scope.favDataShow=false;
            
            $scope.loading=true;
            $scope.query=queryString;
            $scope.type=queryType
            //console.log('Seacrh for '+$scope.query+ ' type is '+ $scope.type);
            $scope.page1=true;
            $scope.page2=false;
            if( $scope.type=='place'){
                $http({
                method: 'GET',
                url: 'index.php?queryString='+$scope.query +'&type='+ $scope.type+'&lat='+$scope.latitide+'&lon='+$scope.longitute
                }).then(function successCallback(response) {
                 $scope.favData=false;
                //$scope.dataFlag=true;
                 for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                     console.log(localStorage.getItem(localStorage.key(i)));
                     for( var j=0; j<response.data.data.length;j++){
                         if(localStorage.key(i)==response.data.data[j].id){
                             console.log("Match Found: "+ response.data.data[j]);
                             response.data.data[j].bookMarked="true";
                             console.log(response.data.data[j]);
                         }
                         
                     }
                 }
                $scope.detailsData = response.data.data; 
                console.log($scope.detailsData);
                $scope.pagingData=response.data.paging;
                //console.log(response.data.paging);
                $scope.tableData=true;
                $scope.loading=false;
                }, function errorCallback(response) {
                console.log("Error");
                });    
            }
        
            else{
              $http({
                method: 'GET',
                url: 'index.php?queryString='+$scope.query +'&type='+ $scope.type
                }).then(function successCallback(response) {
                 $scope.favData=false;
                //$scope.dataFlag=true;
                 for ( var i = 0, len = localStorage.length; i < len; ++i ) {
                     console.log(localStorage.getItem(localStorage.key(i)));
                     for( var j=0; j<response.data.data.length;j++){
                         if(localStorage.key(i)==response.data.data[j].id){
                             console.log("Match Found: "+ response.data.data[j]);
                             response.data.data[j].bookMarked="true";
                             console.log(response.data.data[j]);
                         }
                         
                     }
                 }
                $scope.detailsData = response.data.data; 
                console.log($scope.detailsData);
                $scope.pagingData=response.data.paging;
                //console.log(response.data.paging);
                $scope.tableData=true;
                $scope.loading=false;
                }, function errorCallback(response) {
                console.log("Error");
                });      
            }
                
           
    }
    
    $scope.loadDetails = function (id,fbImageUrl,name){
        $scope.fbPostUrl=fbImageUrl;
        $scope.fbPostName=name;
        console.log($scope.fbPostUrl);
        $scope.albumSlide=true;
//        if($('#page2bookMarkButton').clicked){
//            $('#page2bookMarkButton').childNodes[1].toggleClass('glyphicon-star glyphicon-star-empty');
//         $('#page2bookMarkButton').childNodes[1].toggleClass('filledStar emptyStar');             $('#page2bookMarkButton').childNodes[1].css('color','yellow');
//        }
        var count=0;
        for(var i = 0, len = localStorage.length; i < len; ++i ){
              console.log(localStorage.key(i));
                if(localStorage.key(i)==id){
                    count=1;
                }
                if(count==1){
                    $scope.favIcon=true;
                }
                else if(count==0){
                   $scope.favIcon=false; 
                }
//                else if(count==1 && $('#page2bookMarkButton').clicked){
//                    $('#page2bookMarkButton').childNodes[1].toggleClass(' glyphicon-star-empty glyphicon-star');
//                    $('#page2bookMarkButton').childNodes[1].toggleClass(' emptyStar filledStar');             $('#page2bookMarkButton').childNodes[1].css('color','grey');
//                }
//            else if($('#page2bookMarkButton').clicked){
//                 $('#page2bookMarkButton').childNodes[1].toggleClass('glyphicon-star glyphicon-star-empty ');
//                    $('#page2bookMarkButton').childNodes[1].toggleClass('  filledStar emptyStar');             $('#page2bookMarkButton').childNodes[1].css('color','yellow');
//                
//            }
                
        }
        console.log("id is: "+ id);
        $scope.id=id;
        $scope.page1=false;
        $scope.favDataShow=false;
        $scope.page2=true; 
        $scope.tableData=false;
        $scope.albumPostLoading=true;
        var index=0;
        $scope.imageUrl=[];
        var newUrl='index.php?id='+id;
        if($scope.type=='event'){
            newUrl='index.php?id='+id+'&type=event&q='+$scope.type;
        }
        $http({
        method: 'GET',
        url: newUrl
        }).then(function successCallback(response) {
        //console.log("page2:" +page2);
        $scope.posterName="";
        $scope.posterUrl=""; 
        if(response.data.picture){
         $scope.posterUrl= response.data.picture.data.url;   
            $scope.posterName=response.data.name;
        }
        
        
       // console.log("Poster name: "+response.data.name);
        //console.log(" $scope.posterUrl: "+ $scope.posterUrl);
        console.log(response.data);
        $scope.lastResponse=response.data;
        if(!response.data.albums){
           
            $scope.albumPostLoading=false;
            $scope.noAlbum=true;
            console.log("No Albums");
        }
        if(!response.data.posts){
           
            $scope.albumPostLoading=false;
            $scope.noPost=true;
            console.log("No Posts");
        }
        if(response.data.albums){
//            for( var a=0;a<response.data.albums.data.length;a++){
//             //console.log(response.data.albums.data[a]);
//            //console.log(response.data.albums.data[a].length);
//            for( var b=0; b<2;b++ ){
//                 var higDefImageId=response.data.albums.data[a].photos.data[b].id;
//                 //var url=$scope.getHighDefSrc(higDefImageId);
//                 $http({
//                    method: 'GET',
//                    url: 'index.php?imageId='+higDefImageId
//                    }).then(function successCallback(imageResponse) {
//                     //console.log(imageResponse.data);
//                     $scope.imageUrl[index]=imageResponse.data;
//                     
////                     console.log($scope.imageUrl[index]);
//                     index++;
//                     //response.data.albums.data[0].photos.data[b].higDefUrl=imageResponse.data;
//                    //return response.data;
//                    }, function errorCallback(imageResponse) {
//                    console.log("Error");
//                 });    
//                 //console.log(url);
//            }
//            
//        }
//            
//            for(var c=0,s=0;c<response.data.albums.data.length;c++){
//            response.data.albums.data[c].photos.data[0].higDefUrl= $scope.imageUrl[s];
//            //console.log(response.data.albums.data[c].photos.data[0].picture);
//            s++;
//            response.data.albums.data[c].photos.data[1].higDefUrl= $scope.imageUrl[s];
//            s++;
//        }
        $scope.page2Data="";
        $scope.postData="";
        $scope.page2Data = response.data.albums.data;
        if(response.data.posts)  {
            $scope.noPost=false;
           $scope.postData = response.data.posts.data;
           console.log($scope.postData);
            for(var p=0;p<response.data.posts.data.length;p++){
//                console.log(response.data.posts.data[p].created_time);
                var d=response.data.posts.data[p].created_time;
                var converted=moment(d).format('YYYY-MM-DD HH:MM:SS');
//                console.log(converted.toString());
                response.data.posts.data[p].created_time=converted.toString();
            }  
        }  
       
        console.log($scope.page2Data);
        $scope.albumPostLoading=false;
        $scope.noAlbum=false;
        $scope.page2=true; 
        
        
        }
        
//        console.log($scope.imageUrl);
//        console.log($scope.imageUrl[0]);
//        console.log(JSON.stringify($scope.imageUrl));
        
      
        }, function errorCallback(response) {
        console.log("Error");
        });    
        }
    
    
    // Function called when Go Back is clicked
       $scope.goBack = function (){
           $scope.albumSlide=false;
           $scope.tableSlide=true;
        console.log("inside goBack()");
          $scope.tableData=false;
            $scope.loading=true;
            console.log('Seacrh for '+$scope.query+ ' type is '+ $scope.type);
            $scope.page1=true;
            $scope.page2=false;
           if($scope.type=='favourites'){
               $scope.loadFavData($scope.query,'favourites');
               
            }
           else{
               $scope.loadData($scope.query,$scope.type);
           }
//           else{
//             $http({
//            method: 'GET',
//            url: 'index.php?queryString='+$scope.query +'&type='+ $scope.type
//            }).then(function successCallback(response) {
//            console.log(response.data);
//            $scope.dataFlag=true;
//            $scope.detailsData = response.data.data; 
//            $scope.tableData=true;
//            $scope.loading=false;
//            }, function errorCallback(response) {
//            console.log("Error");
//            });   
//           }
            
        }
       
       
       //Function called when next page is clicked
       
       $scope.nextPage = function (nextUrl){
        //console.log("inside nextPage()");
           $scope.tableData=false;
            $scope.loading=true;
            
            $scope.page2=false; 
            $http({
            method: 'GET',
            url: nextUrl
            }).then(function successCallback(response) {
            //console.log(response.data);
            $scope.dataFlag=true;
            $scope.detailsData = response.data.data; 
            $scope.pagingData=response.data.paging;
            //console.log(response.data.paging);
            $scope.tableData=true;
            $scope.loading=false;
            }, function errorCallback(response) {
            console.log("Error");
            });    
        }
       
       $scope.prevPage = function (prevUrl){
        //console.log("inside prevPage()");
           $scope.tableData=false;
            $scope.loading=true;
            $scope.page2=false; 
            $http({
            method: 'GET',
            url: prevUrl
            }).then(function successCallback(response) {
            //console.log(response.data);
            $scope.dataFlag=true;
            $scope.detailsData = response.data.data; 
            $scope.pagingData=response.data.paging;
            console.log(response.data.paging);
            $scope.tableData=true;
            $scope.loading=false;
            }, function errorCallback(response) {
            console.log("Error");
            });    
        }
       
       $scope.removeFromBookMark= function(removalData) {
           
           console.log( removalData);
           if(!removalData){
               removalData=$scope.id;
               localStorage.removeItem(removalData);
               return false;
           }
           else{
             localStorage.removeItem(removalData.id);  
           }
           
           if($scope.type=='favourites')
                $scope.loadFavData($scope.query,'favourites');
       }
       
       
       $scope.getHighDefSrc = function getHighDefSrc(imageId){
            console.log("inside function to fetch high def image for imageId : "+imageId);
            $scope.page1=false;
            $scope.page2=true; 
            $scope.tableData=false;
            $scope.albumPostLoading=true;
            $http({
            method: 'GET',
            url: 'index.php?imageId='+imageId
            }).then(function successCallback(response) {
            console.log(response.data);
            return response.data;
            }, function errorCallback(response) {
            console.log("Error");
            });    
      }
           
      $scope.saveToBookMark= function(myData){
//               $(this).toggleClass('glyphicon-star-empty glyphicon-star');
               console.log( myData);
            if(!myData){
                console.log("No My data");
                myData=$scope.lastResponse;
            }
            console.log($scope.lastResponse);
       
              var obj = {
                  
                id: myData.id,
                name: myData.name,
                type: $scope.type,
                star: true,
                bookMarked:true,  
                   picture: {
                      data:{
                           url: myData.picture.data.url
                      }   
                    
                } 
                
                
               };
              
               localStorage.setItem(myData.id, JSON.stringify(obj));
               //localStorage.setItem(myData.id, JSON.stringify(storedArray));
               //console.log(localStorage);
     }
      
      $scope.toggleStar = function(){
          console.log(this.childNodes);
      }   
      
     $scope.toggleAlbum = function(id) {
            var x = document.getElementById(id);
            if (x.style.display === 'none') {
                x.style.display = 'block';
            } else {
                x.style.display = 'none';
            }
     }
     
     $scope.clear = function(){
           document.location.href = "index.html";
            return false;
     }
     
//     $(function() {
//            $(document).on('click', '#bookMarkButton', function(){
////                $('#bookMarkButton').hide();
////                $('#notBookMarkButton').show();
//
//                $(this.childNodes[1]).toggleClass('glyphicon-star-empty glyphicon-star');
////                $(this.childNodes[1]).toggleClass('emptyStar filledStar');
//                $(this.childNodes[1]).css('color','yellow');
//                
//            });
//      });
//    $(function() {
//            $(document).on('click', '#notBookMarkButton', function(){
////                $('#bookMarkButton').hide();
////                $('#notBookMarkButton').show();
//
//                $(this.childNodes[1]).toggleClass('glyphicon-star glyphicon-star-empty ');
////                $(this.childNodes[1]).toggleClass('emptyStar filledStar');
//                $(this.childNodes[1]).css('color','grey');
//                
//            });
//      });
           
//      $(function() {
//            $(document).on('click', '#page2bookMarkButton', function(){
////                $('#bookMarkButton').hide();
////                $('#notBookMarkButton').show();
//
//                $(this.childNodes[1]).toggleClass('glyphicon-star glyphicon-star-empty ');
////                $(this.childNodes[1]).toggleClass('emptyStar filledStar');
//                $(this.childNodes[1]).css('color','grey');
//                
//            });
//      });
//        $(function() {
//            $(document).on('click', '#notBookMarkButton', function(){
////                $('#notBookMarkButton').hide();
////                $('#bookMarkButton').show();
//
//                $(this.childNodes[1]).toggleClass(' glyphicon-star-empty glyphicon-star ');
////                $(this.childNodes[1]).toggleClass('filledStar emptyStar');
//                $(this.childNodes[1]).css('color','yellow');
//                
//            });
//      });
    
        var options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };

        function success(pos) {
          var crd = pos.coords;
            $scope.latitide=crd.latitude;
            $scope.longitute= crd.longitude;
          console.log('Your current position is:');
          console.log('Latitude :'+ $scope.latitide);
          console.log('Longitude:'+ $scope.longitute);
//          console.log('More or less ${crd.accuracy} meters.');
        };

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
    
    $scope.postToFb= function (){
    FB.init({
      appId      : '251399428657813',
      xfbml      : true,
      version    : 'v2.8'
    });
        
//         (function(d, s, id){
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) {return;}
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/all.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));

        
        FB.ui({
    app_id: 251399428657813,
    method: 'feed',
    link: window.location.href,
    picture: $scope.fbPostUrl,
    name: $scope.fbPostName,
    caption: "FB SEARCH FROM USC CSCI571",
    href:"https://developers.facebook.com/docs/",
    }, function(response){
    if (response && !response.error_message)
        alert("Successfully Posted");
    else
        alert("Not Posted");
    });
    }

    
    
    
});












