module.exports = function(config){
    config.set({
        browsers:['PhantomJS'],//virtual browser
        frameworks:['mocha'],
        preprocessors:{//code coverage conf
            'app/**/*.js':['coverage']
        },
        coverageReporter:{//code coverage reporters
            includeAllSources : true,
            reporters:[{
                type : 'html',
                dir : 'test/coverage',
                subdir : '.'
            },
            {
                type : 'text'
            }]
        },
        files:[
            "bower_components/angular/angular.js",
            "bower_components/angular-mocks/angular-mocks.js",
            "bower_components/chai/chai.js",
            "app/**/*.js",
            "test/*.js",
        ]
    })
}