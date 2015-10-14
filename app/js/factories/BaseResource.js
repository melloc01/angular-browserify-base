'use strict';

function BaseResource(uri, $resource, AppSettings, defaultParams) {

 	var url = AppSettings.apiUrl + uri + '/:id';
	var factory = $resource(url, defaultParams,  {
        'update': { method:'PUT' }
    });

	factory.cached = false;
	factory.cachedParams = {};

	factory.all = function (uri, params, cb) {

		if (factory.cached && (JSON.stringify(params) == JSON.stringify(factory.cachedParams))) {

			typeof(cb) == 'function' &&  cb(factory.cached);
			
			return factory.cached;

		} else {
			
			return this.query(params, {}, function (products) {

				factory.cached = products;
				factory.cachedParams = params;
				
				typeof(cb) == 'function' &&  cb(products);
				
				return this;

			});
		} 

	};

	return factory;

}

module.exports = BaseResource;