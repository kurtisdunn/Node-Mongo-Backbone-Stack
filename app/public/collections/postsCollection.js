define([
	'app'
	,'libs'
	,'models/postModel'
	], function(App, libs, PostModel, undefined){
		//-- private -----------------------------------------------------------------------------------
		var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone;

		//-- public ------------------------------------------------------------------------------------
		var PostsCollection  = Backbone.PageableCollection.extend({
	        initialize: function(options) {
	            App.log('PostsCollection.init(',arguments,');');
	        },
			model: PostModel
			
		});
		
		
		return PostsCollection;
	});	
	
	