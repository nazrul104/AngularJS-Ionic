angular.module('restuarent.services', [])

.factory('basket', function() {
 var loginStatus=false;
 var policy_id=0;
 var policy_name='';
 var payMentOption=-1;
 var api_url="http://chefonline.co.uk/mobileapi-v2/";
 //var cms_url="http://localhost/_allproject/mobileapi-v2/";
 var cms_url="http://chefonline.co.uk/mobile/cms-api/";
 var restuarent_id=57;
 var pop=0;
 var temp="";
 var discount=0.00;
 var grand_amount=0.00;
 var offer="";
 var config=0;
 var buzTel='';
 var paypal_success=0;
 var paypal_id='';
 var order_id=0;
 var delivery_time='';
 var isRestuarentOpen=false;
 var setPrvOrder=[];
 var total_cart_item=0;
    return {
             isLoggedIn: function($scope,$http){
        	if (window.localStorage.getItem("isLogged")) 
        	{
        		loginStatus=window.localStorage.getItem("isLogged");
        		return loginStatus;
        	}
        	else
        	{
        		return loginStatus;
        	}
        
        },
        setLoggedIn:function(flag)
        {
        	window.localStorage.setItem("isLogged",flag);

        },
        setConfiguration:function(conf)
        {
            config=conf;
        },
        isConfigured:function()
        {
            return config;
        },
        setOrderOption:function(id,policy_name)
        {
            policy_id=id;
            policy_name=policy_name;
        },
        getOrderOption:function()
        {
            return policy_id;
        },
        getPolicyName:function()
        {
            return policy_name;
        },
        setPaymentOption:function(option)
        {
            payMentOption=option;
        },
        getPaymentOption:function()
        {
            return payMentOption;
        },
        API:function()
        {
            return api_url;
        },
        CMS_API:function()
        {
            return cms_url;
        },
        restuarent_setting:function()
        {
            
        },
        REST_ID:function()
        {
            return restuarent_id;
        },
        POPUP:function()
        {
            pop=pop+1;
        },
        popup_data:function()
        {
            return pop;
        },
        SetTemp:function(p)
        {
                temp=p;
        },
        GetTemp:function()
        {
            return temp;
        },
        SetDiscount:function(dis)
        {
            discount=dis;
        },
        GetDiscount:function()
        {
            return discount;
        },
        SetOfferText:function(o)
        {
            offer=o;
        },
        GetOfferText:function()
        {
            return offer;
        },
        setBuzTel:function(tel)
        {
            buzTel=tel;
        },
        getBuzTel:function()
        {
            return buzTel;
        },
        setPayPalStatus:function(status)
        {
            paypal_success=status;
        },
        getPayPalStatus:function()
        {
            return paypal_success;
        },
        setPayPalId:function(pid)
        {
            paypal_id=pid;
        },
        getPayPalId:function()
        {
            return paypal_id;
        },
        setOrderId:function(oid)
        {
            order_id=oid;
        },
        getOrderId:function()
        {
            return order_id;
        },
        setDeliveryTime:function(dtime)
        {
            delivery_time=dtime;
        },
        getDeliveryTime:function()
        {
            return delivery_time;

        },
        setIsRestuarentOpen:function(isOpen)
        {
            isRestuarentOpen=isOpen;
        },
        getIsRestuarentOpen:function()
        {
            return isRestuarentOpen;
        },
        setNumOfCartItem:function(no)
        {
            total_cart_item=no;
        },
       getNumOfCartItem:function()
        {
            return total_cart_item;
        }
    }
     
});
