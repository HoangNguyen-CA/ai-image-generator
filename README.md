# ai-image-generator

- [Website](https://hnca-ai-image-generator.netlify.app/)
- [Server Code](https://github.com/HoangNguyen-CA/ai-image-generator-server/)
- [Client Code](https://github.com/HoangNguyen-CA/ai-image-generator-client/) 

## Deploying my NodeJS backend on AWS for free (almost)

- EC2 instance publically accessible using a custom domain name
- EC2 uses Nginx internally as a reverse proxy
- Nginx supports SSL certificate renewal (enables HTTPS)

Deploying on AWS was difficult with my incomplete knowledge of networking topics, especially with trying to stay within the limits of the free tier. 

Here are the steps I took to deploy on AWS, and I hope readers can learn from my experience and avoid my mistakes.

- I followed this concise [guide](https://gist.github.com/clodal/f19fc9f57e9c419f523164a145777d69), which is similar to what most sources will tell you to do.
  - The guide says to create an application load balancer to connect with Route53 (along with an ACM certificate for HTTPS support).
  - Do NOT use a load balancer if you want to save money, ELB is listed in the [free tier](https://aws.amazon.com/free/), and it only gives 15 LCUs for application load balancers, which will run out QUICK.
  - For my first month of using the application load balancer on 1 EC2 instance I was charged $50 😱😱😱 (refunded later with Amazon support).
  
- Instead of using an AWS load balancer, I used an NGINX reverse proxy. A load balancer is not required for a small-scale personal project.
  - Install Nginx on your EC2 instance. 
  - You can use [certbot](https://certbot.eff.org/) to automatically set up and renew your SSL certificate. Certbot automatically changes your Nginx configuration but does not set up the reverse proxy.
  - Manually change Nginx config to route ports 80 and 443 to localhost (reverse proxy).
  - In AWS Route53, create a type A record that points to your EC2's public IPv4 address.
  - (Optional) Setup and use an elastic IP address instead of a public IPv4 address since IP can change.
  
- Hooking up RDS to EC2 was relatively simple, you have to connect the RDS instance to the EC2 instance during RDS setup, or else EC2 will not be able to access the database.

- I made sure my images in my S3 bucket are publically accessible via URL so they can be stored and rendered easily.
 
### Monthly cost breakdown

 Runtime: ~730 hours in a month 

 AWS resources used:
 - 1 t3.micro EC2 instance (free tier, ~$7.5).
 - 1 db.t3.micro	RDS instance (free tier, ~$13).
 - (OPTIONAL) RDS backup snapshots (~$0.10)
 - AWS Route53 (~$0.70)
 - S3 bucket (free tier).
 
 Total cost per month (free tier): ~$0.70.

 ## Migrating away from AWS to DigitalOcean and supabase, adding rate-limiting for AI Image generation

 My 12-month free tier with AWS expired so I decided to migrate away since monthly costs were too high.

 Digital Ocean waas really easy to use, I used their app service, which functions similarly to heroku. It was painless to deploy my nodejs server from my github repository with a few clicks.

 I used supabase for its PostgreSQL database and file storage since it has a generous free tier, I had to write a small script to use the supabase client for uploading images into buckets, but the database was an easy plug-in solution. 

 Finally, I decided to add rate-liming to my image generation endpoint. Using the express-rate-limit library, I could see up rate limiting by IP using an in-memory data store (good since I only have 1 small backend server). This let me rate limit based on clients' IP addresses. 

 
