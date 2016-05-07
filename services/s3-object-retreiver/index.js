'use strict';
const AWS = require('aws-sdk');
const bucket = process.env.S3_BUCKET;
AWS.config.region = 'eu-west-1';
const s3 = new AWS.S3();
var Promise = require('promise');

exports.handler = function (event, context, callback) {
  const params = { Bucket: bucket };
  return s3Promise(params, 'listObjects').then(data => {
    Promise.all(createS3Promises(data.Contents))
      .then(values => {
        return callback(null, values);
      })
      .catch(err => {
        return callback(err);
      });
  }).catch(err => {
    console.log('error in retrieve playlist', err);
    return callback(err);
  });
};

function createS3Promises (objects) {
  return objects.map((obj) => {
    const p = { Bucket: bucket, Key: obj.Key };
    return s3Promise(p, 'getObject').then(file => {
      return JSON.parse(file.Body.toString());
    })
    .catch(err => {
      console.log('key', obj.key, 'err', err);
    });
  });
}

function s3Promise (params, method) {
  return new Promise(function (resolve, reject) {
    s3[method](params, function (err, data) {
      console.log('err in s3', method, err);
      if (err) return reject(err);
      console.info('incoming data:', data);
      resolve(data);
    });
  });
}
