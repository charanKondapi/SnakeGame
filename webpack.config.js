const path = require('path')

module.exports = {
    mode : "development",
    entry : './src/js/index.js',
    output : {
        path : path.resolve(__dirname+"/src/",'dist'),
        filename : 'build.js'
    }
}