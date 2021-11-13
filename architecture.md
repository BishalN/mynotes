Master Branch --> Production code
Staging Branch --> Feature Preview Branch

Coding is done in the staging branch
On commit - Staging Branch
The code is deployed to herku dyno whenever the tests passes
Manually test the heroku dyno
If everything looks good then make the pull request to the master branch
On pullrequest - Master Branch
The code is deployed to production heroku dyno whenever the tests passes
