define([
    'app'
    ,'libs'
	,'text!templates/post.tpl'
], function(App, libs, post, undefined) {
    //-- private -----------------------------------------------------------------------------------
    var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone, templateData;
    //-- public ------------------------------------------------------------------------------------
    var PostView = Backbone.View.extend({
        initialize: function (options) {
            App.log('PostView.init(',arguments,');');
            App.views.postView = postView =  this;
			this.render();
			templateData = {
				
			}
        },

        render: function(options){
			App.log('PostView.render(',arguments,');');
			 $('#post1').html(_.template(post)).hide().slideDown(1000);
			 $('#post2').html(_.template(post)).hide().slideDown(1000);
		}
 
    });
    return PostView;
});