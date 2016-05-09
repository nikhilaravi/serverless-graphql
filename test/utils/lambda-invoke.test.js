var AWS = require('aws-sdk-mock');
var assert = require('assert');
var lambdaInvoke = require('../../lib/utils/lambda-invoke');

describe('lambda invoke promise util', function () {
  afterEach(function (done) {
    AWS.restore();
    done();
  });

  it('will invoke a lambda and return a promise', function (done) {
    AWS.mock('Lambda', 'invoke', {Payload: '{}'});

    lambdaInvoke.invoke({some: 'params'}).then(function (data) {
      assert.deepEqual(data, {});
      done();
    }).catch(done);
  });

  it('will throw an error when the lambda.invoke failed', function (done) {
    AWS.mock('Lambda', 'invoke', function (params, cb) {
      return cb('Big Error');
    });

    lambdaInvoke.invoke({some: 'params'}).catch(function (error) {
      assert.equal(error, 'Big Error');
      done();
    });
  });
});
