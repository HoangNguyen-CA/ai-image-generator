# ai-image-generator

- [Website](https://hnca-ai-image-generator.netlify.app/)
- [Server Code](https://github.com/HoangNguyen-CA/ai-image-generator-server/)
- [Client Code](https://github.com/HoangNguyen-CA/ai-image-generator-client/) 

## Deploying my NodeJS backend on AWS for free (almost)

features:
- custom domain name
- nginx reverse proxy with SSL certificate
- HTTPS supported

deploying on AWS was diffcult with my incomplete knowledge about networking topics, especially with trying to stay in the limits of the free tier. 

Here are the steps I took to deploy on AWS, I hope readers can learn from my experience and avoid the mistakes that I made.

- I followed this concise [guide](https://gist.github.com/clodal/f19fc9f57e9c419f523164a145777d69), which is similar to what most sources will tell you to do.
  - The guide says to create an application load balancer to connect with Route53 (along with an ACM certificate for HTTPS support).
  - Do NOT use a load balancer if you want to save money, ELB is listed in the [free tier](https://aws.amazon.com/free/), it only gives 15 LCUs for application load balancers, which will run out QUICK.
  - For my first month of using application load balancer on 1 EC2 instance I was charged $50 😱😱😱 (refunded later with amazon support).
  
- Instead of using an AWS load balancer, use a NGINX reverse proxy instead.
  - Install nginx on your server. 
  - You can use [certbot](https://certbot.eff.org/) to automatically set up and renew your SSL certificate.
  - Certbot automatically changes your nginx configuration, but does not set up the reverse proxy.
  - Manually change Nginx config to route ports 80 and 443 to localhost.
  - In AWS Route53, create a type A record that points to your EC2's public IPv4 address.
  - (Optional) setup and use elastic IP address instead of public IPv4 address since public addresses can change.
  
- Hooking up RDS to EC2 is relatively simple, make sure you connect the RDS instance to the EC2 instance during RDS setup, or else EC2 will not be able to access the database.

- Make sure S3 items are publically accessible so images can be rendered.
 
 DONE, you can now access your EC2 instance from a public domain, using HTTPS. 
 
### Monthly cost breakdown

 Runtime: ~730 hours in a month
 Resources used:
 - 1 t3.micro EC2 instance (free tier, ~$7.5).
 - 1 db.t3.micro	RDS instance (free tier, ~$13).
 - (OPTIONAL) RDS backup snapshots (~$0.10)
 - AWS Route53 (~$0.70)
 - S3 bucket (free tier).
 
 total cost per month (free tier): ~$0.70.
 
 
 
  
