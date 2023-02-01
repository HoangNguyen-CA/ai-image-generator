# ai-image-generator

## setting up auth0 authentication

no clear guides to set up, auth0 service manages users themselves. I set up using auth0 sdk for react and sdk for nodejs.

## uploading and storing images in S3 bucket

Proper IAM policy and a separate user for this app, can only perform necessary S3 operations

docker exec -it ai-image-db-1 psql -U postgres

TODO: Server input validation
