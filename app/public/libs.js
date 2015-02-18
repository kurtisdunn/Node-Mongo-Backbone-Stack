require.config({
    paths: {
        text:                 'assets/js/require/_plugins/text/2.0.5/text.min',
		jquery:               '/assets/js/jquery/1.8.2/jquery.min',
		underscore:           'assets/js/underscore/1.4.4/underscore.min',
		json:                 'assets/js/json/json2-amd.min',
		backbone:             'assets/js/backbone/1.1.2/backbone',
		bootstrap:            'assets/js/bootstrap/3.0.1/bootstrap.min',
		paginator:      	  'assets/js/backbone/_plugins/paginator/2.0.0/backbone-paginator'
	
    },
	wrapShim: true,
    shim: {
        jquery: { exports: '$, jQuery' },
		underscore: { exports: '_' },
		json: { exports: 'JSON' },
		backbone: { exports: 'Backbone', deps: ['jquery', 'underscore', 'json'] },
		bootstrap: {exports: 'bootstrap', deps: ['jquery'] },
		paginator: { exports: 'paginator', deps: ['backbone', 'underscore'] },

    }
});
define(
    [
        'jquery','underscore','json','backbone','bootstrap', 'paginator', 
    ],
    function ($, _, JSON, Backbone) {
        $ = $.noConflict(true);
        _ = _.noConflict();
        Backbone = Backbone.noConflict();
        if (!window.$ && !window.jQuery) { window.$ = window.jQuery = $; }
        if (!window._) { window._ = _; }
        if (!window.JSON) { window.JSON = json; }
        if (!window.Backbone) { window.Backbone = Backbone; }
        return { $:$, _:_, JSON:JSON, Backbone:Backbone };
    }
);

