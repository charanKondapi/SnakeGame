const fs = require('fs')
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');


let ID = 0;

function createAssets( fileName ){
    const content = fs.readFileSync( fileName, 'utf-8' );
    const ast = babylon.parse( content, {
        sourceType: "module"
    });

    const depensencies = [];

    traverse( ast, {
        ImportDeclaration : ({ node }) => {
            depensencies.push( node.source.value );
        }
    });

    const id = ID++;

    let { code } = babel.transformFromAst( ast, null, {
        presets : ['env']
    })

    return {
        id,
        fileName,
        depensencies,
        code
    }
}


function createGraph( entry ){
    const mainAsset = createAssets( entry );
    
    const queue = [ mainAsset ];

    for( let asset of queue ){
        const dirname = path.dirname( asset.fileName );
        
        asset.mapping = {};

        asset.depensencies.forEach( relativePath => {
            const absolutePath = path.join( dirname, relativePath );

            const child = createAssets( absolutePath+".js" );
            asset.mapping[ relativePath ]  = child.id;

            queue.push( child );
        })
    }

    return queue;
}

function bundle( graph ){
    let modules = ``;

    graph.forEach( mod => {
        modules += `${ mod.id }:[
            function(require,module,exports){ 
                ${ mod.code }
            },
            ${ JSON.stringify( mod.mapping ) }
        ],`
    });

    return `
        (function( modules ){

            function require( id ){

                const [ fn, mapping ] = modules[id];

                function localRequire( relativePath ){
                    return require(mapping[relativePath])
                }

                const module = { exports : {} };

                fn( localRequire, module, module.exports );

                return module.exports;

            }

            require( 0 );
        })({
            ${ modules }
        });
    `;
}

const graph = createGraph( __dirname + "/entry.js" );
const result = bundle( graph );

fs.mkdir(__dirname+'/dist', { recursive: true }, (err) => {
    if (err) throw err;
    fs.writeFile(__dirname+'/dist/build.js',result, () => {});
});
