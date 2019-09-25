const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const httpMocks = require("node-mocks-http");
chai.use(chaiAsPromised);
const expect = chai.expect;
const proxyquire = require("proxyquire").noCallThru();	//noCallThru speeds up test by not loading all objects from dependencies

describe("sessionController Tests", function(){
	let mockHttpRequest;
	let mockHttpResponse;
	let userStub;
	let compareStub;
	let tokenStub;

	describe("createSession()", function(){
		beforeEach(function(){
			mockHttpRequest = httpMocks.createRequest();
			mockHttpResponse = httpMocks.createResponse();

			userStub = {};
			compareStub = {};
			tokenStub = {}
		});

		it("Should return HTTP 400 and error when user is not found.", async function(){
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().resolves(null)
			});
			compareStub.compare = sinon.stub();
			tokenStub.generateToken = sinon.stub();
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});

			await sessionController.createSession(mockHttpRequest, mockHttpResponse, null);
			let data = mockHttpResponse._getData();

			expect(mockHttpResponse.statusCode).to.equal(400);
			expect(data.Error).to.exist;

		});
		it("Should call next() once when user retrieval fails.", async function() {
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().rejects({})
			});
			compareStub.compare = sinon.stub();
			tokenStub.generateToken = sinon.stub();
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});
			let nextSpy = sinon.spy();

			await sessionController.createSession(mockHttpRequest, mockHttpResponse, nextSpy);

			expect(nextSpy.calledOnce).to.equal(true);
		});
		it("Should return HTTP 400 and error when password does not match.", async function(){ 
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().resolves({  username: "someUserName", password: "somePassword" })
			});
			compareStub.compare = sinon.stub().resolves(false);
			tokenStub.generateToken = sinon.stub();
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});

			await sessionController.createSession(mockHttpRequest, mockHttpResponse, null);
			let data = mockHttpResponse._getData();

			expect(mockHttpResponse.statusCode).to.equal(400);
			expect(data.Error).to.exist;
		});
		it("Should call next() once when compare fails.", async function(){ 
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().resolves({  username: "someUserName", password: "somePassword" })
			});
			compareStub.compare = sinon.stub().rejects({});
			tokenStub.generateToken = sinon.stub();
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});
			let nextSpy = sinon.spy();

			await sessionController.createSession(mockHttpRequest, mockHttpResponse, nextSpy);

			expect(nextSpy.calledOnce).to.equal(true);
		});
		it("Should return HTTP 201 and a token on success.", async function() {
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().resolves({  username: "someUserName", password: "somePassword" })
			});
			compareStub.compare = sinon.stub().resolves(true);
			tokenStub.generateToken = sinon.stub().resolves("a token");
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});
			
			await sessionController.createSession(mockHttpRequest,mockHttpResponse,null);
			let data = mockHttpResponse._getData();
			
			expect(mockHttpResponse.statusCode).to.equal(201);
			expect(data.Token).to.equal("a token");
			
		});
		it("Should call next() once when token generation fails.", async function(){
			userStub.findOne = sinon.stub().returns({
				exec: sinon.stub().resolves({  username: "someUserName", password: "somePassword" })
			});
			compareStub.compare = sinon.stub().resolves(true);
			tokenStub.generateToken = sinon.stub().rejects({});
			let sessionController = proxyquire("../controllers/sessionController.js", {
				"../models/user.js": userStub,
				"../security/encryptdecrypt.js": compareStub,
				"../security/token.js": tokenStub
			});
			let nextSpy = sinon.spy();

			await sessionController.createSession(mockHttpRequest, mockHttpResponse, nextSpy);

			expect(nextSpy.calledOnce).to.equal(true);
		});

	});


});
