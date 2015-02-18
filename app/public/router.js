define([
    'app',
	'libs',
	'views/postView'
], function(App,libs,PostView,undefined) {
    //-- private -----------------------------------------------------------------------------------
    var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone, postView;
    var Router, router  = Backbone.Model.extend({
            defaults: {
                
            }
        });
    //-- public ------------------------------------------------------------------------------------
    	var Router = Backbone.Router.extend({
            initialize: function (options) {
                App.log('Router.init(',arguments,');');
                App.router = router = this;
                //-- history.start, must be last line of initialize
                Backbone.history.start({ root: location.pathname });
				this.index();
				
            },

        //-- router -------------------------------
            router: {
                '': 'index',
                '*actions': 'defaultAction'
            },
			
            index: function () {
				App.log('index.init(',arguments,');');
				
				if (!postView) { postView = new PostView({ el: ".marketing" }); }
				
            },

            defaultAction: function () {
                App.log('Router.defaultAction(',arguments,');');
                App.router.navigate('index', { trigger: true, replace:true });
            }

      
        });
    return Router;
});