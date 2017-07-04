
var request = require("request");

var requestOptions = {
  headers: {
    "User-Agent": "GitHub Avatar Downloader - Student Project"
  }
};

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb){
  var requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  request.get(requestURL, requestOptions, function(error, response, body){
    var data = JSON.parse(body);
    cb(data);
  })
}

// getRepoContributors("jquery", "jquery", function(err, result){
//   console.log("Errors: ", err);
//   console.log("Result: ", result);
// });

getRepoContributors("jquery", "jquery", findAvatar);

function findAvatar(someJSON){
  someJSON.forEach(function(contributor){
    console.log(contributor.avatar_url)
  })
}
