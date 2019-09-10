const express = require('express');
const router = express.Router();
const fileSys = require('fs');


// Routes in Routes directory go here. Filenames of JS files will be used as a Base Path 
fileSys.readdirSync( __dirname+'/routes' ).forEach( function( route ) {
    route = route.split( '.' )[ 0 ] ;
    if ( route === 'mainRoutes' ) return ;
    console.log( 'LOADING ROUTER MIDDLEWARE ' + route.toUpperCase() ) ;
    const childRouter = require( './routes/' + route  );
    try{router.use( '/' + route, childRouter )} 
    catch(err){console.error({message:"ERROR LOADING ROUTER",error:err})}
  } ) ;

module.exports = router;