var simple = require('simple-mock');
var AwsHelper = require('aws-lambda-helper');
var Code = require('code');
var expect = Code.expect;
var lambdaInvoke = require('../../lib/utils/lambda-invoke-promise');

describe('lambda invoke promise util', function () {
  afterEach(function (done) {
    simple.restore();
    done();
  });

  it('will invoke a lambda and return a promise', function (done) {
    simple.mock(AwsHelper.Lambda, 'invoke').callbackWith(null, 'some data');

    lambdaInvoke.invoke({some: 'params'}).then(function (data) {
      expect(data).equals('some data');
      done();
    }).catch(done);
  });

  it('will throw an error when the lambda.invoke failed', function (done) {
    simple.mock(AwsHelper.Lambda, 'invoke').callbackWith('Big error');

    lambdaInvoke.invoke({some: 'params'}).catch(function (error) {
      expect(error).equals('Big error');
      done();
    });
  });
});
