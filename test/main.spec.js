var assert = chai.assert;
var expect = chai.expect;

describe("The Address Book App", function(){
  /*  it("should work", function(){
        chai.assert.isArray([]);
    })
  */          
    
    describe("the contact service", function(){
        beforeEach(function(){
          module('AddressBook');//angular mocks will make this module available for us
          inject(function($injector){
                contactService = $injector.get("contactService");//access the contact service from injector in above module
                $httpBackend = $injector.get("$httpBackend"); //access backend calls
          });
          
        });
        it("should have contacts property, an array", function(){
            expect(contactService.contacts).to.be.an('array');
        });
        
        it("should call the backend", function(){
            $httpBackend.expectGET("http://localhost:9001/contacts")
            .respond(200,[]);//expect a get request is being made with the specified URL
            $httpBackend.flush();
        });
    })
    
    describe("the contact controller", function(){
        beforeEach(function(){
          module('AddressBook');//angular mocks will make this module available for us
          inject(function($injector, $rootScope){
                $scope = $rootScope.$new();
                contactService = $injector.get("contactService");
                $httpBackend = $injector.get("$httpBackend");  
                $controller = $injector.get("$controller");               
          });
          
        });
        
        it("should store contacts in scope", function(){
            $controller("contactController",{$scope:$scope, contactService : contactService});
            assert.isArray($scope.contacts);
        });
    });
    
    describe("the proper filter", function(){
        beforeEach(function(){
             module('AddressBook');
            inject(function($injector){
               proper = $injector.get("$filter")("proper");
            });
        });
        
        it("should proper case a string", function(){
            expect(proper("ned stark")).to.equal("Ned Stark");
            //expect(proper("hi appi")).to.equal("Hi Apple");
            expect(proper("hi appi")).to.equal("Hi Appi");
        });
        
        it("should take number and return as a string", function(){
            expect(proper(42)).to.equal("42");
        });
        
        it("should throw an error when it is not string and number", function(){
            assert.throws(function(){//for throwing error we need to pass a function
                proper(undefined);
            });
        });
    });
    
    describe("avatar", function(){
        beforeEach(function(){
             module('AddressBook');
        });
        
        it("should display the first letter as capital letter", function(){
            inject(function($rootScope, $compile){
                $rootScope.contact = {name : "joe marini"}
                var element = $compile('<avatar name="contact.name"/>')($rootScope);
                $rootScope.$digest();
                var dirText = element.text();
                expect(dirText).to.equal("J");
            });
        });
    });
})

