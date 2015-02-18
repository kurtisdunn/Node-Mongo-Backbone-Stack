//connect to Google now so the app loads on time...
WebFontConfig = {
    google: { families: [ 'Open+Sans:400,300,700,600:latin' ] }
 };
 (function() {
   var wf = document.createElement('script');
   wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
     '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
   wf.type = 'text/javascript';
   wf.async = 'true';
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(wf, s);
 })();


require.config({
    paths: {
        //-- templates
        templates: ('templates')
        //-- config
        //appConf: ('templates/app.conf')
    }
    //--Turn off caching - Uncomment while in development
    ,urlArgs: 'bust=' +  (new Date()).getTime()
});

require(['libs', 'app'], function (libs, App) {
    var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone,
        console = window.console = window.console || { log: function () {} };
//-- jQuery config and extensions ------------------------------------------

    //-- Simple check object exists
    $.fn.exists = function () { return this.length > 0; };

    //-- traditional param serialization
    $.ajaxSettings.traditional = true;

//-- Init app ------------------------------------------
    console.log('$(document).ready();');
    $(document).ready(App.init);
});