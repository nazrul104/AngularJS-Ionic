angular.module('smartrestaurantsolutions', ['ionic','ngCordova','ionicApp.controllers','restuarent.services'])

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/text; charset=utf-8';
  /*  $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';*/
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
delete $httpProvider.defaults.headers.common['X-Requested-With'];
   $stateProvider
    .state('search', {
      url: '/search',
      templateUrl: 'templates/search.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'templates/settings.html'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    .state('tabs.home', {
      url: "/home",
      views: {
        'user-tab': {
          templateUrl: "templates/home.html",
          controller: 'PayPalSuccess'
        }
      }
    })

    .state('tabs.page', {
      url: "/page/:id",
      views: {
        'home-tab': {
            templateUrl: "templates/about.html",
            controller: 'HomeTabCtrl'
        }
      }
    })


    .state('tabs.menu', {
      url: "/menu",
      views: {
        'menu-tab': {
          templateUrl: "templates/menu.html",
          controller: 'OrderOnlineTabCtrl'
        }
      }
    })
     .state('tabs.login', {
      url: "/login/:id",
      views: {
        'user-tab': {
          templateUrl: "templates/login.html",
           controller: 'ManageUser'
        }
      }
    })
    .state('tabs.cart', {
      url: "/cart",
      views: {
        'cart-tab': {
          templateUrl: "templates/cart.html",
           controller: 'cart'
        }
      }
    })
    .state('tabs.navstack', {
      url: "/navstack",
      views: {
        'about-tab': {
          templateUrl: "templates/nav-stack.html"
        }
      }
    })

      .state('tabs.registration', {
      url: "/registration/:id",
      views: {
        'user-tab': {
           templateUrl: "templates/login.html",
           controller: 'ManageUser'
        }
      }
    })

    .state('tabs.reservation', {
      url: "/reservation",
      views: {
        'reservation-tab': {
          templateUrl: "templates/reservation.html",
           controller: 'ReservationCtrl'
        }
      }
    })

    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html",
           controller: 'ContactCtrl'
        }
      }
    })

    .state('tabs.process', {
      url: "/process",
      views: {
        'user-tab': {
          templateUrl: "templates/cart_preview.html",
           controller: 'cart'

        }
      }
    })
    .state('tabs.success', {
      url: "/success",
      views: {
        'user-tab': {
          templateUrl: "templates/cart_success.html",
           controller: 'cart'

        }
      }
    })

    .state('tabs.reset', {
      url: "/reset/:id",
      views: {
        'user-tab': {
          templateUrl: "templates/login.html",
           controller: 'ManageUser'

        }
      }
    })

    .state('tabs.about', {
      url: "/about/:id",
      views: {
        'user-tab': {
          templateUrl: "templates/login.html",
           controller: 'ManageUser'

        }
      }
    })
        .state('tabs.gallery', {
      url: "/gallery/:id",
      views: {
        'user-tab': {
          templateUrl: "templates/login.html",
           controller: 'ManageUser'

        }
      }
    })
    .state('tabs.favourite', {
      url: "/favourite/:id",
      views: {
        'user-tab': {
          templateUrl: "templates/login.html",
           controller: 'ManageUser'

        }
      }
    })

     .state('tabs.myaccount', {
      url: "/myaccount/:id",
      views: {
        'user-tab': {
           templateUrl: "templates/login.html",
           controller: 'ManageUser'
        }
      }
    });
     
   $urlRouterProvider.otherwise("/tab/menu");
})
.directive('ngDraggable', function($document) {
  return {
    restrict: 'A',
    scope: {
      dragOptions: '=ngDraggable'
    },
    link: function(scope, elem, attr) {
      var startX, startY, x = 0, y = 0,
          start, stop, drag, container;

      var width  = elem[0].offsetWidth,
          height = elem[0].offsetHeight;

      // Obtain drag options
      if (scope.dragOptions) {
        start  = scope.dragOptions.start;
        drag   = scope.dragOptions.drag;
        stop   = scope.dragOptions.stop;
        var id = scope.dragOptions.container;
        if (id) {
            container = document.getElementById(id).getBoundingClientRect();
        }
      }

      // Bind mousedown event
      elem.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.clientX - elem[0].offsetLeft;
        startY = e.clientY - elem[0].offsetTop;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        if (start) start(e);
      });

      // Handle drag event
      function mousemove(e) {
        y = e.clientY - startY;
        x = e.clientX - startX;
        setPosition();
        if (drag) drag(e);
      }

      // Unbind drag events
      function mouseup(e) {
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
        if (stop) stop(e);
      }

      // Move element, within container if provided
    // Bind mousedown event
      elem.on('mousedown', function(e) {
        e.preventDefault();
        startX = e.clientX - elem[0].offsetLeft;
        startY = e.clientY - elem[0].offsetTop;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        if (start) start(e);
      });
      
      function setPosition() {
        if (container) {
          if (x < container.left) {
            x = container.left;
          } else if (x > container.right - width) {
            x = container.right - width;
          }
          if (y < container.top) {
            y = container.top;
          } else if (y > container.bottom - height) {
            y = container.bottom - height;
          }
        }

        elem.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }
    }
  }

})
.directive('test', function () {
    return{
        restrict: 'E',
        templateUrl: "templates/"+abc(),
        controller: 'ManageUser',
        scope: {
            content: '=' 
        },
        link:function(scope,element,attrs)
        {
          scope.abc=function()
          {
            return attrs.content;
          }
        }
    };
});

