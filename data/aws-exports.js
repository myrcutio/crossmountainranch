const prodApiEndpoint = "https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod"
const s3FileEndpoint = "https://s3-us-west-2.amazonaws.com/cmr-cms-prod-uploads/public/"
const buildEndpoint = "https://is0oiqxqh3.execute-api.us-west-2.amazonaws.com/prod/build"
const codeBuildProject = "cmr-cms-prod"
const codeBuildBranch = "master"

module.exports.prodApiEndpoint = prodApiEndpoint
module.exports.s3FileEndpoint = s3FileEndpoint
module.exports.buildEndpoint = buildEndpoint
module.exports.codeBuildBranch = codeBuildBranch
module.exports.codeBuildProject = codeBuildProject
module.exports.amplifyConfig = {
  Auth: {
    userPoolId: "us-west-2_EZct9F6QU",
    identityPoolId: "us-west-2:aeb43f0c-11cc-4ef7-851e-8b660d8afc8e",
    region: "us-west-2",
    userPoolWebClientId: "7hfaoesu22u2daj97l4ugs6pdg"
  },
  API: {
    endpoints: [
      {
        name: "ProdAPI",
        endpoint: prodApiEndpoint,
        region: "us-west-2",
        service: "execute-api"
      },
      {
        name: "BuildAPI",
        endpoint: buildEndpoint,
        region: "us-west-2",
        service: "execute-api"
      }
    ]
  },
  Storage: {
    bucket: 'cmr-cms-prod-uploads',
    region: 'us-west-2'
  }
}
