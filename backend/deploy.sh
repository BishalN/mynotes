ssh bishal@20.198.84.61

sudo docker pull bsal/mynotes_staging:latest
 && sudo docker tag bsal/mynotes_staging:latest
  dokku/mynotestage:latest && sudo dokku tags:deploy mynotestage latest