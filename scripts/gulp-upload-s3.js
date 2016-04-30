var AWS = require('aws-sdk');
var gulp = require('gulp');
var fs = require('fs');
var exec = require('child_process').exec;

/*
* config values
*
*/

var bucketName = 'gql-v1';
/**
 * building the bundle
 */

gulp.task('deploy', function () {
  return exec('npm run build', function (error, stdout, stderr) {
    if (error === null) {
      var s3 = new AWS.S3({region: 'eu-west-1'});
      var filesToUpload = fs.readdirSync(__dirname + '/public');

      console.log('>>>>>>>>> Files:', filesToUpload);
      console.log('>>>>>>>>> Bucket folder', bucketfolder);

      filesToUpload.forEach(function (filename) {
        var params = {
          Bucket: bucketName,
          Key: bucketfolder + filename,
          Body: fs.readFileSync(__dirname + '/public/' + filename),
          ContentType: 'text/html'
        };
        s3.putObject(params, function (err, data) {
          if (err) console.log('Object upload unsuccessful!', err);
          else console.log('Object ' + filename + ' was created!');
        });
      });
    }
  });
});
