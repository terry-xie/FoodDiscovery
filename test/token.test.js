const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const token = require("../security/token.js");

chai.use(chaiAsPromised);
const { expect } = chai;

describe("token Tests", () => {
  describe("verifyToken()", () => {
    it("Should resolve with payload value when verify is successful.", () => {
      sinon.stub(jwt, "verify").callsArgWith(3, null, "some payload");

      expect(
        token.verifyToken("some token", "some private key", "some options")
      ).to.eventually.be.equal("some payload");

      jwt.verify.restore();
    });

    it("Should reject with error when verify fails.", () => {
      sinon.stub(jwt, "verify").callsArgWith(3, "some error", null);

      expect(
        token.verifyToken("some token", "some private key", "some options")
      ).to.eventually.be.rejectedWith("some error");

      jwt.verify.restore();
    });
  });

  describe("generateToken()", () => {
    it("Should resolve with token value when sign is successful.", () => {
      sinon.stub(jwt, "sign").callsArgWith(3, null, "some token");

      expect(
        token.generateToken("some payload", "some private key", "some options")
      ).to.eventually.be.equal("some token");

      jwt.sign.restore();
    });

    it("Should reject with error when sign fails.", () => {
      sinon.stub(jwt, "sign").callsArgWith(3, "some error", null);

      expect(
        token.generateToken("some payload", "some private key", "some options")
      ).to.eventually.be.rejectedWith("some error");

      jwt.sign.restore();
    });
  });
});
