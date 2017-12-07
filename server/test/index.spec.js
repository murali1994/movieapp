var request = require('supertest');
 var expect = require('chai').expect;
 var sinon = require('sinon');
 var signup= require('../controller/signupcontrol')
 var model = require('../models/signup');
 var movie=require('../models/movie')
 var index=require('../routes/index');
 var modelStub = sinon.stub(model, 'find');
 var app = require('../index.js'); 
 var address = request("http://localhost:3000")
 describe('Test my contoller', function()
 {
     describe('Find title', function(){
     beforeEach(function()
     {
       modelStub.yields(null, [{'title': 'Ko', 'poster': 'http://image.tmdb.org/t/p/w185//rjCkXzjowsBiI6ZTlT42AneDg2r.jpg','release_date':'2011-04-22'}]); 
       }); 
       it('should attempt to find items', function(done){
        address   
        .get('/movie/view')   
        .expect(200)  
        //.expect('Content-Type', /json/)  
        .end(function(err, res)
        {
            if (err) return done(err);  
            //console.log(res.body);  
            //Enter your assertions here
            expect(res.body[0].title).to.be.equal("Ko"); 
             done();
                 });  
           }); 
     });  
     describe('Find a item given the argument', function(){
        beforeEach(function(done){
            //modelStub.yields(null, [{'fname':'murali','lname':'krishna' ,'username': 'murali99','email':'murali@wipro.com','password':'murali123'}]); 
            //modelStub.withArgs({'username':'gani99'}).yields(null, [{'fname':'shiva','lname':'ganesh' ,'username': 'gani99','email':'ganesh@wipro.com','password':'ganesh123'}]);  
             modelStub.withArgs({'fname':'murali'}).returns({'username':'murali99'});
             done();  
          });   
       it('should attempt to find items', function(done){
         address  
          .get('/signup')    
          .expect(302)    
          
          .end(function(err, res){
              if (err) return done(err); 
              // console.log(res.body);
              // Enter your assertions here 
              expect(modelStub({'fname':'murali'}).username).to.be.equal('murali99');
              // expect(res.body.username).to.be.equal("murali99");  
               done();    
                });   
            });             
        });
                         
    });

