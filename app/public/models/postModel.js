define([
    'app'
    ,'libs'
], function(App, libs, undefined){
    //-- private -----------------------------------------------------------------------------------
    var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone;
    //-- public ------------------------------------------------------------------------------------
    var PostModel = Backbone.Model.extend({
        initialize: function (options) {
            //App.log('PostModel.init(',arguments,');');
			App.models.postModel = postModel = this
        }
    });
  return PostModel;
});

