'use strict';
const AWS = require('aws-sdk');
const bucket = require('../../config.json').bucket;
AWS.config.region = 'eu-west-1';
const s3 = new AWS.S3();
var Promise = require('promise');

exports.addTrack = function (params) {
  const id = new Date().getTime();
  const json = Object.assign({}, params, {
    id: id
  });
  const p = {
    Bucket: bucket,
    Key: `${id}.json`,
    Body: JSON.stringify(json),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  return s3Promise(p, 'upload').then(data => {
    console.log('id', data, { id: id.toString() });
    return ({ id: id.toString() });
  }).catch(err => {
    return err;
    console.log('error in s3 upload', err);
  });
};

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

exports.retrievePlaylist = function (param) {
  const p = { Bucket: bucket };
  return s3Promise(p, 'listObjects').then(data => {
    return data.Contents.map((obj) => {
      const p = { Bucket: bucket, Key: obj.Key };
      return s3Promise(p, 'getObject').then(file => {
        return JSON.parse(file.Body.toString());
      })
      .catch(err => {
        console.log('key', obj.key, 'err', err);
      });
    });
  }).catch(err => {
    return err;
    console.log('error in retrieve playlist', err);
  });
};
