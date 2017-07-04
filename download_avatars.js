// required modules
var request = require("request");
var fs = require("fs");

var requestOptions = {
  headers: {
    "User-Agent": "GitHub Avatar Downloader - Student Project"
  }
};

console.log("Welcome to the GitHub Avatar Downloader!");

// gets stream from string/url created by requestURL and logs the URL to stout
// parses body into array of objects, letting us access its properties, ie. avatar_url
function getRepoContributors(repoOwner, repoName, cb){
  // will let user know if they have passed in arguments incorrectly, and which ones
  if(repoOwner === "undefined") {
    console.log("Name of Repo Owner Required.");
    return;
  }
  if(repoName === "undefined"){
    console.log("Repo Name Required.");
    return;
  }
  var requestURL = 'https://'+ process.env.GITHUB_USER + ':' + process.env.GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  request.get(requestURL, requestOptions, function(error, response, body){
    var data = JSON.parse(body);
    cb(data);
  })
}

// turns readable stream into writeable, to be able to save images to our created filepath
function downloadImageByURL(url, filepath){
  request.get(url)
         .pipe(fs.createWriteStream(filepath));
}

// calls above function to download images to filepath created -> avatars/
function findAvatar(someJSON){
  someJSON.forEach(function(contributor){
    downloadImageByURL(contributor.avatar_url, ("avatars/" + contributor.login + ".jpg"))
  })
}

//arguments for repoOwner and repoName now passed in from command line
getRepoContributors(`${process.argv[2]}`, `${process.argv[3]}`, findAvatar);


