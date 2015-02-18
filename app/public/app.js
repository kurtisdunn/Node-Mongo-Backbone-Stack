define([
    'libs'
],function (libs, undefined) {
    //-- private -----------------------------------------------------------------------------------
    var $ = libs.$, _ = libs._, JSON = libs.JSON, Backbone = libs.Backbone,
        console = window.console = window.console || { log: function () {} },
        App;
    //-- public ------------------------------------------------------------------------------------
    App = (function () {
        var config = {
                debug: true,
                focusSpeed: 50,
                ajaxTimeout: 15000,
                ajaxSessionTimeout: 5000,
				root: "html"
            },
			localStorage = {
				initalLoad: undefined 
			},
            init = function () {
                App.log('App.init()');
                App.main();
            },
            main = function () {
                App.log('Main.init()');
                require(['router'], function (Router) { App.router = new Router(); });
            },

            log = function () { if (config.debug) { console.log(arguments); } };
        //-- object defintion ------------------------------------------------------------------
        return {
            libs: libs,
            config: config,
			localStorage: localStorage,
            init: init,
            main: main,
            log: log,
            router: undefined,
            views: {},
            collections: {},
            models: {},
			templateData: {},
			temp: undefined
        };
    }());
	
    //- global namespace --------------------
    if (App.config.debug) {
        Example = window.Example = window.Example || {},
        Example.app || {},
        Example.app = App;
    }
	return App;
});