'use strict';
const AWS = require('aws-sdk');
const bucket = require('../../config.json').bucket;
AWS.config.region = 'eu-west-1';
const s3 = new AWS.S3();
var Promise = require('promise');

exports.addTrack = function (params) {
  const id = new Date().getTime();
  console.log('id', id, 'params', params);
  const p = {
    Bucket: bucket,
    Key: `${id}.json`,
    Body: JSON.stringify(params),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3Promise(p).then(data => {
    console.log('id', data, { id: id.toString() });
    return { id: id.toString() };
  }).catch(err => {
    throw err;
    console.log('error', err);
  });
};

function s3Promise (params) {
  return new Promise(function (resolve, reject) {
    resolve('success');
    s3.upload(params, function (err, data) {
      console.log('err', err);
      if (err) return reject(err);
      console.info('incoming data:', data);
      resolve(data);
    });
  });
}
