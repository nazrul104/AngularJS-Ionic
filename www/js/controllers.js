/*******Author N@zrul; May 2015*******/
angular.module('ionicApp.controllers', ['pickadate'])

.controller('NavCtrl', function($scope, $ionicSideMenuDelegate,$ionicModal, basket) 
{

    $scope.showMenu = function ()
     {
      $ionicSideMenuDelegate.toggleLeft();
    };
    $scope.showRightMenu = function () 
    {
      $ionicSideMenuDelegate.toggleRight();
    };
    /*show modal*/
/*  $ionicModal.fromTemplateUrl('templates/right_menu.html',
   {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });*/
    // Triggered in the login modal to close it
/*  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.showmodal = function() {
    $scope.modal.show();
  };*/
/*end of modal part*/
})
.controller('Navleft', function($scope, $ionicSideMenuDelegate,$ionicModal,$http, basket) 
{
    $http.get(basket.CMS_API()+'config.php?x=LeftNavigation',{cache:true}).
    success(function(data, status, headers, config)
     {
        $scope.menu=data;
     }).
     error(function(data, status, headers, config)
     {
     
    });
})
.controller('HomeTabCtrl', function($scope, basket,$stateParams,$http, $ionicSideMenuDelegate, $ionicPopup, $timeout) 
{

var temp="";
 // Triggered on a button click, or some other target
 $scope.showPopup = function() {
 /*  $scope.data = {}*/
  $http.get(basket.API()+'Tigger.php?funId=2&rest_id='+basket.REST_ID(),{cache:true}).
   success(function(data, status, headers, config) 
   {
    var t='';
    t+='<div class="list">';
     $scope.datalist=data.app; 
     $scope.datalist.forEach(function(e, i){
        e.offer.offer_list.forEach(function(element, index){
        //  temp+=element.description;
        t+='<a class="item item-avatar" href="#"><img style="width:60px" src='+element.thumb_name+'> <h2>'+element.offer_title+'</h2><p>'+element.description+'</p></a>';
        console.log(element.description);
        });
     });
     t+='</div>';
        // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template:t ,
     title: 'Special Offers!',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' }
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 4000);
  }).
  error(function(data, status, headers, config)
   {

  });


  };
   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };
  if($ionicSideMenuDelegate.isOpenRight()===true)
  {
    
  } 
     $scope.page={}
     $scope.pageTitle="";
     var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
      element.html(createHTML_1());

     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }

 var cms_page = angular.element(document.querySelector('#pagecontent'));
 var home_page = angular.element(document.querySelector('#homePageContent'));


   $http.get(basket.CMS_API()+'config.php?x=HomePage',{cache:true}).
    success(function(data, status, headers, config)
    {
       // $scope.data=data;     
       home_page.html(data);
    }).
     error(function(data, status, headers, config)
     {
     
    });

 $http.get(basket.CMS_API()+'config.php?x=GetPageContent&rid='+$stateParams.id,{cache:true}).
    success(function(data, status, headers, config)
    {
       // $scope.data=data;     
       cms_page.html(data);
    }).
     error(function(data, status, headers, config)
     {
     
    });

})

.controller('OrderOnlineTabCtrl', function($scope,$http, $ionicPopup,$ionicModal, $timeout,$ionicSlideBoxDelegate, $location, $ionicLoading,basket,$filter, $ionicSideMenuDelegate)
 {
 /* window.localStorage.clear();*/
   $scope.message='';
   $scope.slider=[];
  $scope.dish_allergence=["Fish"," ","Nuts","Egg","Milk"," "," ","CRUSTACEANS"];

  console.log($scope.dish_allergence[2]);
   var css = angular.element(document.querySelector('#mystyle'));
/*   $http.get(basket.CMS_API()+'config.php?x=MobileCMSSetting').success(function(data){
    css.html(data);
    basket.setConfiguration(1);
   });*/
   
  /*###########Create Right Menu##########*/
    var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
      element.html(createHTML_1());
     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }
  /*end*/

  /*Restuarent setting*/

  if (!window.localStorage.getItem("Rsetting"))
   {
      $http.get(basket.API()+'Tigger.php?funId=19&rest_id='+basket.REST_ID(),{cache:true}).success(function(data, status, headers, config)
      {
         window.localStorage.setItem("Rsetting",JSON.stringify(data.app[0]));
         $scope.setting=JSON.parse(window.localStorage.getItem("Rsetting"));  
         basket.setBuzTel($scope.setting.business_tel);
          var logo = angular.element(document.querySelector('#logo'));
      logo.html('<img src='+$scope.setting.logo+' style="width:100px;height:50px">');
      var sliderImage=$scope.setting.slider_image;
      //console.log(sliderImage);
      var splitImages=sliderImage.split(',');
      splitImages.forEach(function(element, index){
      $scope.slider.push(element);
      });
       $scope.bizzTel=$scope.setting.business_tel;
      });
    }else{
      $scope.setting=JSON.parse(window.localStorage.getItem("Rsetting"));
       basket.setBuzTel($scope.setting.business_tel);
       var logo = angular.element(document.querySelector('#logo'));
      logo.html('<img src='+$scope.setting.logo+' style="width:100px;height:50px">');
      var sliderImage=$scope.setting.slider_image;
      //console.log(sliderImage);
      var splitImages=sliderImage.split(',');
      splitImages.forEach(function(element, index){
      $scope.slider.push(element);
      });
       $scope.bizzTel=$scope.setting.business_tel;
    }
  /*end*/
   $scope.cart=[];
   $ionicLoading.show({
      template: 'Loading...'
    });
    $http.get(basket.API()+'Tigger.php?funId=19&rest_id='+basket.REST_ID(),{cache:true}).
    success(function(data, status, headers, config) { 
      console.log(data.app);
    $ionicLoading.hide();
    $scope.datalist=data.app; 
    window.localStorage.setItem("schedule",JSON.stringify(data.app[0].restuarent_schedule));
    window.localStorage.setItem("policy",JSON.stringify(data.app[0].order_policy.policy));
    if (data.app[0].discount.status==1) {
        window.localStorage.setItem("discount",JSON.stringify(data.app[0].discount.off));
    };
    if (data.app[0].offer.status==1&&basket.popup_data()==0) {
      window.localStorage.setItem("offer",JSON.stringify(data.app[0].offer.offer_list));

    var t='';
    t+='<div class="list">';
     $scope.datalist=data.app; 
     $scope.datalist.forEach(function(e, i){
        e.offer.offer_list.forEach(function(element, index){
        //  temp+=element.description;
        t+='<a class="item item-avatar" href="#"><img style="width:60px" src='+element.thumb_name+'> <h2>'+element.offer_title+'</h2><p>'+element.description+'</p></a>';
        console.log(element.description);
        });
     });
     t+='</div>';
        // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template:t ,
     title: 'Special Offers!',
     subTitle: 'Please use normal things',
     scope: $scope,
     buttons: [
       { text: 'Cancel' }
     ]
   });
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
   $timeout(function() {
      myPopup.close(); //close the popup after 3 seconds for some reason
   }, 4000);
    basket.POPUP();
 }

  }).
  error(function(data, status, headers, config)
   {
    $scope.networkerror=1;
   $ionicLoading.hide();
   console.log(status);
  });
$scope.alergensInfo=function(i)
{
  $scope.datalist.forEach(function(element, index){
    statements
  });
}
/*push item in cart*/
$scope.addItemInCart=function(item_id,item_name,item_price)
{
    $scope.qty=1;
    $scope.session_id='';
    $scope.session_id=window.localStorage.getItem("session_id");

    $ionicLoading.show({
        template: 'Adding to cart...'
      });
    $http.post(basket.CMS_API()+'config.php?x=CartProcess&session_id='+$scope.session_id+'&item_id='+item_id+'&item_name='+item_name+'&item_qty='+$scope.qty+'&item_price='+item_price).
    success(function(data, status, headers, config) 
    {
      $scope.message="Successfully added";
    
       $ionicLoading.hide();
        if (data.status=="success")
        {
         window.localStorage.setItem("session_id",data.session_id);
        };
          $scope.session_id=window.localStorage.getItem("session_id");
          $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
          success(function(data, status, headers, config) 
          {
              window.localStorage.setItem('total_amount',data.total_amount);
              $scope.total_item=parseFloat(data.total_item);
              basket.setNumOfCartItem($scope.total_item);
            
            var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+basket.getNumOfCartItem()+"</span>");
          }).
          error(function(data, status, headers, config)
          {
              $ionicLoading.hide();
              
          });
    }).
    error(function(data, status, headers, config)
    {
     $ionicLoading.hide();
             
    });
}
/*end*/

/*Item list toggle*/
   $scope.toggleGroup = function(group)
    {
      if ($scope.isGroupShown(group)) 
      {
        $scope.shownGroup = null;
      } 
      else
      {
        $scope.shownGroup = group;
      }
    };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
 /*end*/

/*show modal*/
  $ionicModal.fromTemplateUrl('templates/my-modal.html',
   {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal_option.hide();
  };

  // Open the login modal
  $scope.showmodal = function() {
    $scope.modal.show();
  };

  /*modal for selecting option*/
    $ionicModal.fromTemplateUrl('templates/modal-option.html',
   {
    scope: $scope
   }).then(function(modal) {
    $scope.modal_option = modal;
  });
    // Triggered in the login modal to close it

  $scope.closeOption = function() {
    $scope.modal.hide();
  };


  // Open the login modal
  $scope.showOption = function(option_id) {
    $scope.option_item=[];
    $scope.modal_option.show();
  /* $scope.showmodal();*/
    $scope.datalist.forEach(function(e, i){
          e.category.forEach(function(element, index){
            element.Dish_Information.ItemList.forEach(function(x, y){
              if(x.Dish_id===option_id)
              {
                $scope.option_item.push(x.options.OptionList);
                
              }
            });
          });
    });
    console.log($scope.option_item[0].length);
  };
  


/*###########show cart item number#########*/
    $scope.session_id=window.localStorage.getItem("session_id");
     $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
  success(function(data, status, headers, config) 
  {
    $scope.total_item=parseFloat(data.total_item);
       var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+$scope.total_item+"</span>");
  }).
  error(function(data, status, headers, config)
  {
      $ionicLoading.hide();
  });

  /*end*/
})
.controller('cart', function($scope,$cordovaInAppBrowser,$filter,$rootScope,$http,$ionicPopup, $ionicModal,$timeout,$ionicSlideBoxDelegate, $location, $ionicLoading,basket,$ionicSideMenuDelegate) 
{

  var currentdate = new Date();
  var weekday_id=currentdate.getDay();
  var arr=[];
 /* if(basket.isConfigured()==0)
  {
    $location.path('/tab/menu');
  }*/
  $scope.session_id='';
  $scope.my={};
  $scope.total_amount=0.00;
  $scope.grand_amount=0.00;
  $scope.min_order=0.00;
  $scope.session_id=window.localStorage.getItem("session_id");
  $scope.isLogged=false;
  $scope.datalist={};
  $scope.dev_option="";
 
  var tel=basket.getBuzTel().split(',');
  $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
  $scope.restTel=tel[0];
  console.log($scope.restTel);
  $scope.isRestuarentOpen=basket.getIsRestuarentOpen();
  $scope.open_time='';
  $scope.closed_time='';
  $scope.arrTime=[];
  $scope.timeSegment=0;
  $scope.policy_time=0;
  $scope.inc=0;
   $scope.networkerror=0;
  /* returent Schedule management*/
  /*check is restuaent open or not and get Delivery time*/
  /*  var element = angular.element(document.querySelector('.ion-ios7-cart'));
   element.html("<span class='cartbadge'>"+basket.getNumOfCartItem()+"</span>");

*/  /*end*/
    $scope.generateTimeFormate=function()
    {
      var hours = currentdate.getHours();
      var minutes = currentdate.getMinutes();
      var seconds = currentdate.getSeconds();
      var ampm = hours >= 12 ? 'PM' : 'PM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes +':'+'00'+ ' ' + ampm;
      return strTime;
    }

  $scope.generateDeliveryOpenTime=function(open)
  {
      var currentdate = new Date();
      var str=open.split(':');
      var inc=parseInt(str[1])+30;
      currentdate.setHours(str[0], inc, 00);
      var h=currentdate.getHours();
      var m=currentdate.getMinutes();
      var s=currentdate.getSeconds();
  }
  /*end of time*/
   $scope.paypal_transection_id='';
    /*###########Create Right Menu##########*/
     var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
       element.html(createHTML_1());
     }
      if(angular.equals($scope.isLogged,"true")==false)
      {
       element.html(createHTML_0());
      }
  /*end*/


  if ($scope.user!=null)
   {
     $scope.my.address=$scope.user.address1;
  }
  $scope.policy=JSON.parse(window.localStorage.getItem("policy")); 

  $ionicLoading.show({
      template: 'processing...'
    });


  $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
  success(function(data, status, headers, config) 
  {
      $ionicLoading.hide();
      $scope.restatus=data.status;
      if(data.status==1)
      {
       $scope.total_amount=parseFloat(data.total_amount);
       $scope.datalist=data.OrderList;

       if(basket.GetDiscount()!=0){
          $scope.grand_amount=data.total_amount-basket.GetDiscount();
       $scope.obtained_discount=basket.GetDiscount();
       }else{
          $scope.grand_amount=data.total_amount;
       } 
        var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+data.total_item+"</span>");
      }
    
  }).
  error(function(data, status, headers, config)
  {
       $ionicLoading.hide();
        $scope.networkerror=1;
  });
$scope.updateQuantity=function(a,cart_id,item_price,single_price)
{
  var qtn=document.querySelector('#itemQtn'+a).value;
  console.log(cart_id);
  $scope.update(cart_id,qtn,item_price,single_price);
}
   $scope.update=function(cart_id,item_qty,item_price,single_price)
   {
        $scope.session_id=window.localStorage.getItem("session_id");
        $http.post(basket.CMS_API()+'config.php?x=RemoveItemFromCart&session_id='+$scope.session_id+'&cart_id='+cart_id+'&item_qty='+item_qty+'&item_price='+item_price+'&single_price='+single_price).
        success(function(data, status, headers, config) 
        {
          $scope.restatus=data.status;
          $scope.total_amount=parseFloat(data.total_amount);
          $scope.datalist=data.OrderList;
           $scope.total_item=parseFloat(data.total_item);
              var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+$scope.total_item+"</span>");
                window.localStorage.setItem('total_amount',data.total_amount);
        }).
        error(function(data, status, headers, config)
        {
        });
   }

      $scope.removecartItem=function(cart_id)
     {
         $scope.session_id=window.localStorage.getItem("session_id");
        $http.post(basket.CMS_API()+'config.php?x=RemovItem&cart_id='+cart_id+'&session_id='+$scope.session_id).
        success(function(data, status, headers, config) 
        {
          console.log(data);
          $scope.restatus=data.status;
          $scope.total_amount=parseFloat(data.total_amount);
          $scope.datalist=data.OrderList;
          $scope.total_item=parseFloat(data.total_item);
          var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+$scope.total_item+"</span>");
           window.localStorage.setItem('total_amount',data.total_amount);
        }).
        error(function(data, status, headers, config)
        {
          
        });
    }

        /*offer*/
       $scope.orderOffer=function(order_policy_id)
       {
       
            $scope.offers=[];
            if(window.localStorage.getItem("offer")){
            $scope.offer=JSON.parse(window.localStorage.getItem("offer"));
            if(window.localStorage.getItem("total_amount"))
            {
              $scope.total_amount=JSON.parse(window.localStorage.getItem("total_amount"));
            
            $scope.offer.forEach(function(e, i){
              if(order_policy_id==e.restaurant_order_policy_id)
              {
                if ($scope.total_amount>=e.eligible_amount)
                 {
                  
                  $scope.offers.push(e);  
                 }
              }
            });

            
         }
        }
       } /*offerEnd*/
       /*Discount function*/
       $scope.orderDiscount=function(order_policy_id)
       {

             $scope.discounts=[];
             if(window.localStorage.getItem("discount"))
             {
            $scope.discount=JSON.parse(window.localStorage.getItem("discount"));
            $scope.total_amount=JSON.parse(window.localStorage.getItem("total_amount"));
            $scope.discount.forEach(function(e, i){
              console.log(e);
              if(order_policy_id==e.restaurant_order_policy_id)
              {
                if ($scope.total_amount>=e.eligible_amount)
                 {
                    $scope.discounts.push(e);
                 }
              }
            });
          }
       }
       /*##End of discount##*/

       $scope.DoAccept=function(acceptType,OfferText)
       {
        /*###
              1=accepted offer;
              2=accepted discount;
        ###*/

        if (acceptType==1 && OfferText!='') 
        {

                basket.SetOfferText(OfferText);
                $scope.qty=1;
                var item_id=0;
                var item_price=0;
                  $scope.session_id='';
                  $scope.session_id=window.localStorage.getItem("session_id");

                  $ionicLoading.show({
                      template: 'wait...'
                    });
                  $http.post(basket.CMS_API()+'config.php?x=CartProcess&session_id='+$scope.session_id+'&item_id='+item_id+'&item_name='+OfferText+'&item_qty='+$scope.qty+'&item_price='+item_price).
                  success(function(data, status, headers, config) 
                  {
                 
                     $ionicLoading.hide();
                      if (data.status=="success")
                      {
                        $scope.offers=[];
                        window.localStorage.setItem("session_id",data.session_id);
                      };
                        $scope.session_id=window.localStorage.getItem("session_id");
                        $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
                        success(function(data, status, headers, config) 
                        {
                            window.localStorage.removeItem('total_amount');
                            $scope.datalist=data.OrderList;
                            $scope.total_item=parseFloat(data.total_item);
                           var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>"+$scope.total_item+"</span>");
                        }).
                        error(function(data, status, headers, config)
                        {
                            $ionicLoading.hide();
                             var alertPopup = $ionicPopup.alert({
                               title: 'Alert!',
                               template: data+" "+status
                             });
                             alertPopup.then(function(res) {
                            //   console.log('Exception!'+status);
                             });
                        });
                  }).
                  error(function(data, status, headers, config)
                  {
                
                             var alertPopup = $ionicPopup.alert({
                               title: 'Alert!',
                               template: data+" "+status
                             });
                             alertPopup.then(function(res) {
                               console.log('Exception!'+status);
                             });
                  });
        };
        if (acceptType==2)
         {
            $scope.discounts=[];
           if ($scope.discounts[0].e.discount_type=="Percentage")
            {
              $scope.dis=$scope.total_amount*parseFloat($scope.discounts[0].e.discount_amount);
              $scope.obtained_discount=$scope.dis/100;
              $scope.grand_amount=$scope.total_amount-$scope.obtained_discount; 
              basket.SetDiscount($scope.obtained_discount);
           };
            if ($scope.discounts[0].e.discount_type=="Fixed") {
              $scope.total_amount=$scope.total_amount-parseFloat($scope.discounts[0].e.discount_amount);
           };
        };
       }
             $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
     $scope.opendateModal = function() { $scope.datemodal.show();};
     $scope.closedateModal = function(modal) {$scope.datemodal.hide();$scope.my.datepicker = modal;};
     $scope.changeOrderOptionOnSelect=function(policy_id,policy_name,policy_time)
      {
        $scope.policy_time=policy_time;
        basket.setOrderOption(policy_id,policy_name);
        window.localStorage.setItem("selected_policy",policy_name);
        window.localStorage.setItem("selected_policy_time",policy_time);

         $scope.dev_option=policy_name;
        $scope.orderOffer(policy_id);
        $scope.orderDiscount(policy_id);
        
        $scope.policy=JSON.parse(window.localStorage.getItem("policy")); 
        $scope.policy.forEach(function(e, i){
          if(e.policy_id==policy_id)
          {
            $scope.min_order=e.min_order;
          }
        });

      }
     $scope.confirmOrderOPtion=function(){$scope.my.order_option=window.localStorage.getItem('selected_policy');}

     $scope.showMSg=function(data)
      {
         var alertPopup = $ionicPopup.alert({
                 title: 'Alert',
                 cssClass:'btnsubmit',
                 template: data
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
      }
     $scope.placeOrder=function()
    {

      /*check whether cart has data or not*/
      if($scope.restatus==0)
      {
          $scope.showMSg('Empty Shopping Cart');
          return false;
      }
         $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
         if($scope.user==null)
         {
           // $scope.showMSg('Please make sure your are logined in! ');
            $location.path('/tab/login/1');
            return false;
         };
         if($scope.dev_option==null)
          {
            $scope.showMSg('Please select  delivery or collection option');
            return false;
          }
          else
          {
            $scope.scheduleProcess();
              $location.path('/tab/process');    
          } 
    }

    $scope.scheduleProcess=function()
    {
        $scope.schedule=JSON.parse(window.localStorage.getItem("schedule"));
          for (var i = 0; i <$scope.schedule.schedule.length; i++) 
          {

            if($scope.schedule.schedule[i]['weekday_id']==weekday_id)
            {
               

                if($scope.schedule.schedule[i]['list'].length==1)
                {
                  var opening=$scope.schedule.schedule[i]['list'][0]['opening_time'];
                  var closing=$scope.schedule.schedule[i]['list'][0]['closing_time'];     
                }

                if($scope.schedule.schedule[i]['list'].length==2)
                {

                  var opening1=$scope.schedule.schedule[i]['list'][0]['opening_time'];
                  var closing1=$scope.schedule.schedule[i]['list'][0]['closing_time'];     
                  var opening2=$scope.schedule.schedule[i]['list'][1]['opening_time'];
                  var closing2=$scope.schedule.schedule[i]['list'][1]['closing_time'];  

                  $scope.policy_time=window.localStorage.getItem("selected_policy_time");

                  $http.post(basket.CMS_API()+"config.php?x=TimeProcess&opening1="+opening1+"&opening2="+opening2+"&closing1="+closing1+"&closing2="+closing2+"&current_time="+$scope.generateTimeFormate()+"&policy_time="+$scope.policy_time).
                  success(function(data, status, headers, config) 
                  {
                   
                    if(data!="false")
                    {
                      basket.setDeliveryTime(data);  
                      basket.setIsRestuarentOpen(true);
                    } 
                  });
                }    
            }
          } 
    }

    $scope.checkPaymentOption=function(option) {
     basket.setPaymentOption(option);
    if(option==111)
    {

       $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
       success(function(data, status, headers, config) 
       {
         
          $scope.total_amount=data.total_amount;
          $scope.grand_amount=data.total_amount-basket.GetDiscount();
          $scope.discount=basket.GetDiscount();
          $scope.offer_text=basket.GetOfferText();
          $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
          $scope.payment_status=basket.getPaymentOption();


       });

    }

    if(option==0){
      $scope.paypal_transection_id='';
    }
   }
   /*########Check Paypal Payment status after back########*/
        if(basket.getPayPalStatus()==1)
        {
          var v=window.localStorage.getItem('paypal_status');
       
           //$location.path('/tab/success');
        }
    /*end*/

    $scope.confirmPlaceOrder=function()
    {
        if(basket.getPaymentOption()==-1)
        {
           $scope.showMSg('Please Select Payment Option');
           return false;
        }
        if(!$scope.my.datepicker){
          $scope.showMSg('Please delivery date');
           return false;
        }
       $ionicLoading.show({
              template: 'Processing...'
            });

        $http.post(basket.CMS_API()+'config.php?x=ShowCartData&session_id='+$scope.session_id).
        success(function(data, status, headers, config) 
        {
           /* $scope.paypal_transection_id='';*/
            $scope.total_amount=data.total_amount;
            $scope.grand_amount=data.total_amount-basket.GetDiscount();
            $scope.discount=basket.GetDiscount();
            $scope.offer_text=basket.GetOfferText();
            $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
            $scope.payment_status=basket.getPaymentOption();
            if($scope.payment_status==0)
            {

             if($scope.my.devtime)
             {
              $scope.my.pre_order_delivery_time=$scope.my.devtime;
             }
               $http.post(basket.API()+'Tigger.php?funId=12&rest_id='+basket.REST_ID()+'&user_id='+$scope.user.userid+'&order_policy_id='+basket.getOrderOption()+'&post_code='+$scope.user.postcode+'&OrderList='+JSON.stringify(data)+'&address='+$scope.address+'&city='+$scope.user.city+'&payment_option='+basket.getPaymentOption()+'&total_amount='+$scope.total_amount+'&grand_total='+$scope.grand_amount+'&discount='+$scope.discount+'&offer_text='+$scope.offer_text+'&pre_order_delivery_time='+$scope.my.pre_order_delivery_time+'&comments='+$scope.my.comments+'&payment_status=0&paypal_transection_id='+$scope.paypal_transection_id).success(function(data)
                {
                 if (data.status=="Success")
                 {
                    $ionicLoading.hide();
                     var element = angular.element(document.querySelector('.ion-ios7-cart'));
            element.html("<span class='cartbadge'>0</span>");
                      window.localStorage.removeItem("selected_policy");
                      window.localStorage.removeItem("session_id");
                      window.localStorage.removeItem("policy"); 
                      window.localStorage.removeItem("total_amount");
                      basket.setOrderId(data.order_ID);
                      $location.path('/tab/success');
                 };
                });

            }
            /*For Paypal*/
             if($scope.payment_status==1)
             {
                 basket.setPayPalStatus(1);

                 $ionicLoading.hide();
                var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'no'
              };
           $ionicLoading.show({
              template: 'Redirecting to Paypal...'
            });

           $http.post(basket.CMS_API()+'payment.php',{user_id:$scope.user.userid,total_amount: $scope.total_amount,grand_total:$scope.grand_amount,rest_id:basket.REST_ID()}).success(function(paypalurl)
           {

            var p_url=paypalurl.split("|");
            $scope.paypal_transection_id=p_url[1];
            basket.setPayPalId($scope.paypal_transection_id);
            $cordovaInAppBrowser.open(p_url[0], '_blank', options)
            .then(function(event)
            {

            })
            .catch(function(event) {
            
            });

               $http.post(basket.API()+'Tigger.php?funId=12&rest_id='+basket.REST_ID()+'&user_id='+$scope.user.userid+'&order_policy_id='+basket.getOrderOption()+'&post_code='+$scope.user.postcode+'&OrderList='+JSON.stringify(data)+'&address='+$scope.address+'&city='+$scope.user.city+'&payment_option='+basket.getPaymentOption()+'&total_amount='+$scope.total_amount+'&grand_total='+$scope.grand_amount+'&discount='+$scope.discount+'&offer_text='+$scope.offer_text+'&pre_order_delivery_time='+$scope.my.pre_order_delivery_time+'&comments='+$scope.my.comments+'&payment_status=0&paypal_transection_id='+$scope.paypal_transection_id).success(function(data)
                {
                 if (data.status=="Success")
                 {
                  console.log(data.order_ID);
                  console.log(data.payment_status);
                 };
            });
                window.localStorage.removeItem("selected_policy");
                window.localStorage.removeItem("session_id");
                window.localStorage.removeItem("policy"); 
                $ionicLoading.hide();
               $location.path('/tab/success');
           });

                
            }
        }).
        error(function(data, status, headers, config)
        {
             var alertPopup = $ionicPopup.alert({
                   title: 'Alert!',
                   template: data+" "+status
                 });
                 alertPopup.then(function(res) {
                   console.log('Exception!'+status);
                 });
        });
    }
    /*####Cash success in details####*/
    if(basket.getOrderId()!=0)
    {
        $http.get(basket.API()+'Tigger.php?funId=14&order_id='+basket.getOrderId()).success(function (data) 
        {
           $scope.orderdetails=data;
          $scope.grand_total=parseFloat($scope.orderdetails.order[0].grand_total);
         });
    }
    /*it's for process page*/
    $scope.my.order_option=window.localStorage.getItem('selected_policy');
    $scope.dev_option= $scope.my.order_option;
    if ($scope.my.order_option==0) {
      $location.path('/tab/cart');    
    };

    /*######################PayPal Functions##################*/

  $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
console.log('starting....');
  });

  $rootScope.$on('$cordovaInAppBrowser:loadstop', function(e, event){
    // insert CSS via code / file
    $cordovaInAppBrowser.insertCSS({
      code: 'body {background-color:blue;}'
    });

    // insert Javascript via code / file
    $cordovaInAppBrowser.executeScript({
      file: 'script.js'
    });
  });

  $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){

  });

  $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
 $cordovaInAppBrowser.close();
  });
    $scope.initialize=function()
    {
       $scope.initPaymentUI();
    }
    $scope.initPaymentUI=function()
    {
       var clientIDs = {
       "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
       "PayPalEnvironmentSandbox": "AZAi0RFtvUH1cM2fIg1FJYbmDcM1WIMmnTm8y14j8h0l3kKF9mfehHXUo2CQQi7uqZc3V7_r-FBwKu_9"
     };
     $scope.PayPalMobileObj.init(clientIDs, $scope.onPayPalMobileInit);
     $scope.DoSinglePayment();
    }
    $scope.createPayment=function()
    {
          var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
          var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
          return payment;
    }
    $scope.DoSinglePayment=function()
    {
        $scope.PayPalMobileObj.renderSinglePaymentUI($scope.createPayment(), $scope.onSuccesfulPayment, $scope.onUserCanceled);
    }
    $scope.onSuccesfulPayment=function(payment)
    {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
    }
    $scope.onUserCanceled=function(result)
    {
       console.log(result);
    }

    $scope.configuration=function()
    {
        var config = new PayPalConfiguration({merchantName: "My test shop", merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
        return config;
    }
    $scope.onPrepareRender=function()
    {
        var element = angular.element(document.querySelector('#buyNowBtn'));
    }
    $scope.onPayPalMobileInit=function()
    {
       $scope.PayPalMobileObj.prepareToRender("PayPalEnvironmentSandbox", $scope.configuration(),$scope.onPrepareRender);
    }
    /*######################end of paypal#####################*/
    /*paypal check payment by watch in db and dynamically redirect the page to success*/
    $scope.checkpaypal_status=0;
     $scope.paypal_transection_id=basket.getPayPalId();
     console.log($scope.paypal_transection_id);
     console.log('');
     if($scope.paypal_transection_id!='')
     {
        $scope.$watch('checkpaypal_status', function(newVal, oldVal)
         {
          if(newVal!==1)
          {
             $http.get(basket.API()+'Tigger.php?funId=29&rest_id='+basket.REST_ID()+'&transaction_id='+$scope.paypal_transection_id).success(function (largeLoad) {
                $scope.checkpaypal_status=largeLoad;
                console.log(largeLoad);
                console.log(largeLoad.orders[0].payment_status);
                if(largeLoad.orders[0].payment_status==1)
                {
                   basket.setPayPalId('');
                   basket.setOrderId(largeLoad.orders[0].order_no);
                   $location.path('/tab/home');    
                }
            });
          }
       
         // console.log($scope.checkpaypal_status);
        });
     }
     /*restuarent schedule and get delivery time*/
  $scope.scheduleProcess();
  if(basket.getDeliveryTime()!="")
  {
    $scope.my.devtime=basket.getDeliveryTime(); 
  }
})

.controller('PayPalSuccess', function($scope,$http, $ionicModal,basket) 
{
$scope.grand_total=0.00;
 $http.get(basket.API()+'Tigger.php?funId=14&order_id='+basket.getOrderId()).success(function (data) {
   $scope.orderdetails=data;
  console.log($scope.orderdetails);
  $scope.grand_total=parseFloat($scope.orderdetails.order[0].grand_total);
 });
})

.controller('ManageUser', function($scope,$http,$location,$ionicPopup, $ionicLoading,basket,$ionicSideMenuDelegate,$stateParams,$ionicModal) 
{
  $scope.pageName="";
   /* if(basket.isConfigured()==0){
    $location.path('/tab/menu');
  }*/
     $scope.isLogged=basket.isLoggedIn();
    $scope.pageid=$stateParams.id;
    console.log($scope.pageid);
    basket.SetTemp($scope.pageid);
    $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
    if($scope.pageid==1){
      $scope.pageName="Login";
    }
if($scope.pageid==2){
   $location.path('/tab/login/2');
   $scope.pageName="Registration";
}
    if($scope.pageid==3)
    {
      console.log('asdf');
       $scope.msg=0;
       $scope.pageName="My Account";
    if($scope.isLogged=='false')
    {
     $location.path('/tab/login/1');
    }
         $http.get(basket.API()+'Tigger.php?funId=13&userid='+$scope.user.userid).success(function(data, status, headers, config)
      {

          if (data.orders[0].status=="Failed") {
             $scope.msg=1;
          }else{
             $scope.previousOrders=data.orders; 
          }
    }).
   error(function(data, status, headers, config)
   {
                var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
   });
    }
    if($scope.pageid==4){
       $scope.pageName="Change Password";
    }
        if($scope.pageid==8)
        {
           $ionicLoading.show({
      template: 'Loading...'
    });
         $scope.pageName="About us";
         $http.get(basket.CMS_API()+"config.php?x=getAboutUs").success(function(data){
         
         var element = angular.element(document.querySelector('#aboutus'));
         element.html(data);
          $ionicLoading.hide();
         });
    }
        if($scope.pageid==9)
        {
                  $ionicLoading.show({
      template: 'Loading...'
    });
         $scope.pageName="Gallery";
         $http.get(basket.CMS_API()+"config.php?x=getGalleryImage").success(function(data){
          $scope.gimage=data;
            $ionicLoading.hide();
         });
        }
if($scope.pageid==5)
    {
      
       $scope.pageName="Favourites";
       $ionicLoading.show({
       template: 'Loading...'
    });
    $scope.msg=0;
    $http.get(basket.API()+'Tigger.php?funId=16&customer_id=4285&rest_id='+basket.REST_ID(),{cache:true}).
    success(function(data, status, headers, config)
    {
         
           $ionicLoading.hide();
           $scope.datalist=data.favourite; 
           if($scope.datalist[0].status=="Failed")
           {
            $scope.msg=1;
           }
    }).
     error(function(data, status, headers, config)
     {
         $ionicLoading.hide();
    });
   }
   if($scope.pageid==7)
   {
       basket.setLoggedIn(false);
       $location.path('/tab/login/1');
   }
  if($ionicSideMenuDelegate.isOpenRight()===true)
    {
         $ionicSideMenuDelegate.toggleRight();
    } 
  
/*   if($scope.isLogged==false)
   {
     $location.path('/tab/login/1');
      if($scope.pageid==2)
      {
        $location.path('/tab/login/2');
      }
  }*/
  /*###########Create Right Menu##########*/
    var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true){
     element.html(createHTML_1());
     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }

  /*end*/

  $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
/*  if(!window.localStorage.getItem('isLogged'))
  {
     $location.path('/tab/login/1');
  }*/

  $scope.login={};
  $scope.registration={};



  $scope.loginAuthorization=function()
  {

    $http.post(basket.API()+'Tigger.php?funId=3&username='+$scope.login.username+'&password='+$scope.login.password).success(function(data, status, headers, config)
    {
        if (data.status=="Success")
         {
            basket.setLoggedIn(true);
            window.localStorage.setItem("UserDetails",JSON.stringify(data.UserDetails));
            $location.path('/tab/myaccount/3');
          }
          else
          {
          /*  alert("Invalid Username/password");*/
             var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: "Invalid Username/password"
               });
            return false;
          }
    }).
     error(function(data, status, headers, config)
     {
             var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
     });
  }
    $scope.reset={};
  $scope.ResetPassword=function()
  {
    
     $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));

     if($scope.reset.oldpassword==null)
    {
      $scope.showMSg("Please enter old password");
      return false;
    }
        if($scope.reset.newpassword==null)
    {
      $scope.showMSg("Please enter new passowrd");
      return false;
    }

     $http.post(basket.API()+'Tigger.php?funId=10&email='+$scope.user.email+'&previouspassword='+$scope.reset.oldpassword+'&newpassword='+$scope.reset.newpassword).success(function(data, status, headers, config)
     {
         $ionicPopup.alert({
                 title: 'Alert!',
                 template: data.msg
               });
        $scope.reset.oldpassword="";
        $scope.reset.newpassword="";
    }).
     error(function(data, status, headers, config)
     {
            $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
              
     });
  }
$scope.showMSg=function(data)
{
         var alertPopup = $ionicPopup.alert({
                 title: 'Alert',
                 cssClass:'btnsubmit',
                 template: data
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
}

    $scope.matchPassword=function()
    {
      if($scope.registration.password!=$scope.registration.confirm.password)
      {
        $scope.showMSg("Password does not match");
        return false;
      }
    }

$scope.checkString=function(myData)
{

  var stringOnly = /^[A-Za-z]+$/;
  if(!stringOnly.test(myData))
  {
    $scope.showMSg("Invalid name, do not use number or any special character");
    return false;
  }
}
  $scope.registration=function()
  {
    /*Form Validation*/
    

    if($scope.registration.fname==null)
    {
      $scope.showMSg("Please enter your full name");
      return false;
    }
        if($scope.registration.email==null)
    {
      $scope.showMSg("Please enter valid email address");
      return false;
    }
    if($scope.registration.mobile==null)
    {
      $scope.showMSg("Please put your Mobile no");
      return false;
    }
     if($scope.registration.postcode==null)
    {
      $scope.showMSg("Please enter your postcode");
      return false;
    }
     if($scope.registration.address1==null)
    {
      $scope.showMSg("Please enter address");
      return false;
    }
     if($scope.registration.postcode==null)
    {
      $scope.showMSg("Please enter your postcode");
      return false;
    }
    var dob=$scope.registration.dobmonth+" "+$scope.registration.dobday;
    var doa=$scope.registration.admonth+" "+$scope.registration.adday;
  /*Form validation end*/
    $ionicLoading.show({
       template: 'Creating your account...'
      });
      $http.post(basket.API()+'Tigger.php?funId=8&fname='+$scope.registration.fname+'&lname='+$scope.registration.lname+'&email='+$scope.registration.email+'&mobile_no='+$scope.registration.mobile+'&telephone_no='+$scope.registration.tel+'&postcode='+$scope.registration.postcode+'&address1='+$scope.registration.address1+'&address2='+$scope.registration.address2+'&city='+$scope.registration.city+'&country='+$scope.registration.country+'&password='+$scope.registration.password+"&dob_date="+dob+"&doa="+doa).success(function(data, status, headers, config)
      {
           $ionicLoading.hide();
           if (data.status=="Success")
           {
               basket.setLoggedIn(true);
              window.localStorage.setItem("UserDetails",JSON.stringify(data.UserDetails));
               var alertPopup = $ionicPopup.alert({
                 title: 'Confirmation',
                 template: data.msg
               });
               alertPopup.then(function(res) {
                $location.path('/tab/myaccount/3');
               });   
            }


           if (data.status=="Failed")
           {
                   var alertPopup = $ionicPopup.alert({
                     title: 'Alert',
                     template: data.msg
                   });
                   alertPopup.then(function(res) {
                     $location.path('/tab/login/1');
                     console.log('Exception!'+status);
                   });

           }
      }).
     error(function(data, status, headers, config)
     {
       $ionicLoading.hide();
           var alertPopup = $ionicPopup.alert({
                   title: 'Alert!',
                   template: data+" "+status
                 });
                 alertPopup.then(function(res) {
                   console.log('Exception!'+status);
                 });  
     });
  }
  if($scope.pageid==2){
   $location.path('/tab/login/2');
    return false;
}

if($scope.pageid==6){
   $scope.pageName="Order Details";
   $scope.grand_total=0.00;
  $http.get(basket.API()+'Tigger.php?funId=14&order_id='+basket.getOrderId()).success(function (data) {
  $scope.orderdetails=data;
  $scope.grand_total=parseFloat($scope.orderdetails.order[0].grand_total);
   });
}
$scope.PreviousOrderInDetails=function(oid)
{
  basket.setOrderId(oid);
}
/*show modal*/
  $ionicModal.fromTemplateUrl('templates/my-modal.html',
   {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showmodal = function() {
    $scope.modal.show();
  };
/*end of modal part*/
})

.controller('AccountCtrl', function($scope,$http,  $location, $ionicModal, $ionicLoading,basket,$ionicSideMenuDelegate) 
{
   /* if(basket.isConfigured()==0){
    $location.path('/tab/menu');
  }*/
  if($ionicSideMenuDelegate.isOpenRight()===true)
    {
         $ionicSideMenuDelegate.toggleRight();
    } 
   $scope.isLogged=basket.isLoggedIn();
   if($scope.isLogged==false){
     $location.path('/tab/login');
     return false;
  }
  /*###########Create Right Menu##########*/
    var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true){
     element.html(createHTML_1());
     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }

  /*end*/

  $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));

  if(!window.localStorage.getItem('isLogged'))
  {
     $location.path('/tab/login/1');
     return false;
  }

   $http.get(basket.API()+'Tigger.php?funId=13&userid='+$scope.user.userid).success(function(data, status, headers, config)
    {
        if (data.results.status="Success") 
        {
           $scope.msg=data.results.msg;
           $scope.previousOrders=data.orders; 
        }else{
          $scope.msg="You have no orders";
        }   
    }).
   error(function(data, status, headers, config)
   {
        var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });   
   });
/*show modal*/
  $ionicModal.fromTemplateUrl('templates/my-modal.html',
   {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showmodal = function() {
    $scope.modal.show();
  };
/*end of modal part*/
})


.controller('ContactCtrl', function($scope, basket,$stateParams,$http, $ionicSideMenuDelegate,$location) 
{
   /* if(basket.isConfigured()==0){
    $location.path('/tab/menu');
  }*/
     $scope.page={}

     $scope.pageTitle="";
     var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
      element.html(createHTML_1());

     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }

 var contact_page = angular.element(document.querySelector('#contactpage'));


   $http.get(basket.CMS_API()+'config.php?x=ContactPage',{cache:true}).
    success(function(data, status, headers, config)
    {
       // $scope.data=data;     
       contact_page.html(data);
    }).
     error(function(data, status, headers, config)
     {
                var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
    });

       /*Restuarent setting*/
  if (!window.localStorage.getItem("Rsetting")) {
      $http.get(basket.API()+'Tigger.php?funId=19&rest_id='+basket.REST_ID(),{cache:true}).success(function(data, status, headers, config)
      {
         window.localStorage.setItem("Rsetting",JSON.stringify(data.app[0]));
      });
    }else{
      $scope.setting=JSON.parse(window.localStorage.getItem("Rsetting"));
      $scope.bizzTel=$scope.setting.business_tel;
      $scope.address=$scope.setting.address.replace(/<[^>]+>/gm, '');

    }
  /*end*/

})

.controller('ReservationCtrl', function($scope,$http, $ionicModal, $timeout,$ionicSlideBoxDelegate,$ionicPopup, $location, $ionicLoading,basket,$ionicSideMenuDelegate) 
{
   /* if(basket.isConfigured()==0){
    $location.path('/tab/menu');
  }*/
     $scope.page={}
     $scope.res={};
     $scope.pageTitle="";
     var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
      element.html(createHTML_1());

     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }
      $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
     $scope.opendateModal = function() { $scope.datemodal.show();};
     $scope.closedateModal = function(modal)
      {
        $scope.datemodal.hide();
        $scope.res.datepicker = modal;
      };
     /*add reservation*/
     $scope.showMSg=function(data)
{
         var alertPopup = $ionicPopup.alert({
                 title: 'Alert',
                 template: data
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
}
     $scope.addReservation=function()
     {


               if($scope.res.fname==null)
                {
                  $scope.showMSg("Please enter your full name");
                  return false;
                }
                if($scope.res.email==null)
                {
                  $scope.showMSg("Please enter valid email address");
                  return false;
                }

                 if($scope.res.mobile==null)
                {
                  $scope.showMSg("Please enter mobile no");
                  return false;
                }

                 if($scope.res.datepicker==null)
                {
                  $scope.showMSg("Please select date");
                  return false;
                }

         $http.post(basket.API()+'Tigger.php?funId=9&fullName='+$scope.res.fname+'&email='+$scope.res.email+'&mobile_no='+$scope.res.mobile+'&reservation_date='+$scope.res.datepicker+'&reservation_time='+$scope.res.mytime+'&guest='+$scope.res.guest+'&special_request='+$scope.res.special_req+'&rest_id='+basket.REST_ID()).success(function(data, status, headers, config)
          {
             // alert(data.msg);
               var alertPopup = $ionicPopup.alert({
               title: 'Confirmation',
               template: data.msg
             });
             alertPopup.then(function(res) {
               console.log('Thank you');
             });
          }).
         error(function(data, status, headers, config)
         {
                 var alertPopup = $ionicPopup.alert({
                 title: 'Alert!',
                 template: data+" "+status
               });
               alertPopup.then(function(res) {
                 console.log('Exception!'+status);
               });
         });
     }
     /*end*/
})

.controller('FavCtrl', function($scope,$http, $ionicModal, $timeout,$ionicSlideBoxDelegate, $location, $ionicLoading,basket,$filter, $ionicSideMenuDelegate) 
{
     $scope.user=JSON.parse(window.localStorage.getItem("UserDetails"));
     $scope.page={}
     $scope.pageTitle="";
     var element = angular.element(document.querySelector('#mymenu'));
     $scope.isLogged=basket.isLoggedIn();
     if(angular.equals($scope.isLogged,"true")==true)
     {
      element.html(createHTML_1());

     }
      if(angular.equals($scope.isLogged,"true")==false){
      element.html(createHTML_0());
     }

    var contact_page = angular.element(document.querySelector('#contactpage'));

      $ionicLoading.show({
      template: 'Loading...'
    });

    $http.get(basket.API()+'Tigger.php?funId=16&customer_id=4285',{cache:true}).
    success(function(data, status, headers, config)
    {
          $ionicLoading.hide();
       $scope.datalist=data.favourite; 
       console.log($scope.datalist);
    }).
     error(function(data, status, headers, config)
     {
         $ionicLoading.hide();
    });
})
function createHTML_0()
{
//alert(con);
var temp='';
 temp+='<ul class="list">';
                  temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/about/8"><i class="ion-ios7-home"></i> About us</a>';
              temp+='</li>';
               temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/gallery/9"><i class="ion-images"></i> Gallery</a>';
              temp+='</li>';
                temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/login/1"><i class="ion-log-in"></i> Login</a>';
              temp+='</li>';
             temp+=' <li>';
               temp+='<a class="item" menu-close nav-clear href="#/tab/registration/2"><i class="ion-compose"></i> Registration</a>';
             temp+='</li>';
            temp+='</ul>';
  return temp;
}


function createHTML_1()
{
//alert(con);
var temp='';
 temp+='<ul class="list">';
               temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/about/8"><i class="ion-ios7-home"></i> About us</a>';
              temp+='</li>';
               temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/gallery/9"><i class="ion-images"></i> Gallery</a>';
              temp+='</li>';
              temp+=' <li>';
               temp+=' <a class="item" menu-close nav-clear href="#/tab/myaccount/3"><i class="ion-ios7-person"></i> My Account</a>';
              temp+='</li>';
              temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/reset/4"><i class="ion-ios7-compose"></i> Change Password</a>';
              temp+='</li>';
            /*  temp+='<li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/registration">Order History</a>';
              temp+='</li>';*/
             temp+=' <li>';
                temp+='<a class="item" menu-close nav-clear href="#/tab/favourite/5"><i class="ion-heart"></i> My Favourite</a>';
              temp+='</li>';
               temp+='<li>';
               temp+='<a class="item" menu-close nav-clear href="#/tab/login/7"><i class="ion-log-in"></i> Logout</a>';
              temp+='</li>';
            temp+='</ul>';

  return temp;
}

