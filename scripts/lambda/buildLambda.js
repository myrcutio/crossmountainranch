const projectName = require('../../data/aws-exports').codeBuildProject
const projectBranch = require('../../data/aws-exports').codeBuildBranch

const AWS = require('aws-sdk')
AWS.config.update({region: 'us-west-2'})
const codebuild = new AWS.CodeBuild({apiVersion: '2016-10-06'})

module.exports.build = (event, context) => {
  var params = {
    projectName: projectName,
    sourceVersion: projectBranch
  };
  codebuild.startBuild(params, function(err, data) {
    let message;
    if (err) message = err; // an error occurred
    else     message = data;           // successful response
    let response = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message
      }),
      statusCode: 200
    }

    context.succeed(response)
  });
}