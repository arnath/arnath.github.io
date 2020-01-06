# How To: Multiple WordPress sites on one VPS using Docker Compose

This week I was trying to figure out how to setup multiple WordPress sites on a single VPS (I used the smallest DigitalOcean droplet) so I could set up some blogs for my wife without paying for multiple instances. This turned into much more of an ordeal than I was expecting so I wanted to document what I found to help anyone trying to do the same thing. 

I gave myself three additional constraints going in:

- I wanted to use Docker Compose to setup the droplet. This is partially because I just haven't played with Docker all that much professionally and partially because it makes it easier to drop the same configuration on a VPS hosted by someone other than DigitalOcean (as opposed to having to redo all the command line config manually). 
- I wanted all the WordPress instances to share a single instance of MySQL (I ended up using MariaDB instead because boo Oracle). MySQL and MariaDB are pretty resource heavy and there didn't seem to be a good reason to run two database containers. 
- All the websites needed to use HTTPs because this is just good practice nowadays. I also wanted HTTP to redirect to HTTPs and both `example.com` and `www.example.com` to work as addresses.

To pull this off, I made use of two projects I found on GitHub, [nginx-proxy](https://github.com/jwilder/nginx-proxy) and [docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion). I attempted to use the nginx Docker image directly but for some reason could never get WordPress to correctly handle requests. The nginx-proxy image automatically generates nginx reverse proxy configs for containers as they are created. The companion image handles the automatic creation, renewal, and use of SSL certificates from Let's Encrypt for proxied containers. JrCs (the creater of the proxy companion) has created a good diagram that explains how they work together: 


![Nginx proxy schema](../_assets/nginx_proxy_schema_2.png)

### docker-compose.yml

I posted the completed scripts and some instructions in the [multiple-wordpress-containers](https://github.com/arnath/multiple-wordpress-containers) repo. Below I'll go through each part of the docker-compose.yml file to provide some detailed explanations of what's going on. 

#### Database

```yml
services:
    db:
        image: mariadb:10
        container_name: db
        restart: unless-stopped
        env_file: .env
        volumes:
            - database:/var/lib/mysql
            - ./mariadb:/docker-entrypoint-initdb.d
        networks:
            - proxy-network
```
This block sets up the database container based off the [mariadb:10](https://hub.docker.com/_/mariadb) image. 

```yml
env_file: .env
```
The repo contains a sample .env file that defines some environment variables for use in the docker-compose.yml file. In this service, they are used to create the WordPress databases and assign permissions to the user account.

```yml
volumes:
    - database:/var/lib/mysql
    - ./mariadb:/docker-entrypoint-initdb.d
```
When you define a volume with a name instead of a path like `database:...`, this creates a named, Docker-managed volume. I used this to map the `/var/lib/mysql` folder from the container to the named volume because this is where the databases are stored on disk.

The second line copies the `mariadb/init.sh` script to the `/docker-entrypoint-initdb.d` directory in the container. Scripts in this container are run by the mariadb image on startup. The image provides a way to create a database and provide permissions using an environment variable but this only works for a single database. I wanted to use a database per site so I had to create the shell script below to do this for me:

```bash
#!/bin/bash

mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $SITE1_DB_NAME; GRANT ALL ON $SITE1_DB_NAME.* TO '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';"
mysql -uroot -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $SITE2_DB_NAME; GRANT ALL ON $SITE2_DB_NAME.* TO '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';"
```
This file uses the environment variables defined in the .env file to create databases for each site and assign permissions to the WordPress user account.

```yml
networks:
- proxy-network
```
I put all the containers on a shared bridge network to allow them to communicate with each other. 

#### Nginx proxy and Let's Encrypt companion

```yml
services:
    nginx-proxy:
        image: jwilder/nginx-proxy:alpine
        container_name: nginx-proxy
        restart: unless-stopped
        ports:
            - 80:80
            - 443:443
        volumes:
            - conf:/etc/nginx/conf.d
            - vhost:/etc/nginx/vhost.d
            - html:/usr/share/nginx/html
            - dhparam:/etc/nginx/dhparam
            - certs:/etc/nginx/certs:ro
            - /var/run/docker.sock:/tmp/docker.sock:ro
        networks:
            - proxy-network

    nginx-proxy-le:
        depends_on:
            - nginx-proxy
        image: jrcs/letsencrypt-nginx-proxy-companion:latest
        container_name: nginx-proxy-le
        restart: unless-stopped
        environment:
            NGINX_PROXY_CONTAINER: nginx-proxy
        volumes:
            - vhost:/etc/nginx/vhost.d
            - html:/usr/share/nginx/html
            - dhparam:/etc/nginx/dhparam:ro
            - certs:/etc/nginx/certs
            - /var/run/docker.sock:/var/run/docker.sock:ro
        networks:
            - proxy-network
```
These two blocks setup the nginx-proxy and nginx-proxy-le containers to start the Nginx reverse proxy and acquire and maintain SSL certificates. 

```yml
ports:
    - 80:80
    - 443:443
```
The proxy has to listen on both ports 80 and 443 in order to handle HTTP -> HTTPs redirects. 

```yml
volumes:
    - conf:/etc/nginx/conf.d
    - vhost:/etc/nginx/vhost.d
    - html:/usr/share/nginx/html
    - dhparam:/etc/nginx/dhparam
    - certs:/etc/nginx/certs:ro
    - /var/run/docker.sock:/tmp/docker.sock:ro
```
The proxy and the companion require a bunch of volumes to pass configuration to and from Nginx. The last line, `/var/run/docker.sock:/tmp/docker.sock:ro`, is used by docker-gen to listen to new containers being created and update reverse proxy configs. 

#### WordPress

```yml
services:
    wp-site1:
        depends_on:
            - db
            - nginx-proxy-le
        image: wordpress:5-php7.2
        container_name: wp-site1
        restart: unless-stopped
        env_file: .env
        environment:
            WORDPRESS_DB_HOST: db:3306
            WORDPRESS_DB_NAME: ${SITE1_DB_NAME}
            WORDPRESS_DB_USER: ${MYSQL_USER}
            WORDPRESS_DB_PASSWORD: ${MYSQL_PASSWORD}
            VIRTUAL_HOST: ${SITE1_HOST_NAME}
            VIRTUAL_PORT: 443
            LETSENCRYPT_HOST: ${SITE2_HOST_NAME}
        volumes:
            - wp-site1:/var/www/html
        networks:
            - proxy-network

    wp-site2:
        depends_on:
            - db
            - nginx-proxy-le
        image: wordpress:5-php7.2
        container_name: wp-site2
        restart: unless-stopped
        env_file: .env
        environment:
            WORDPRESS_DB_HOST: db:3306
            WORDPRESS_DB_NAME: ${SITE2_DB_NAME}
            WORDPRESS_DB_USER: ${MYSQL_USER}
            WORDPRESS_DB_PASSWORD: ${MYSQL_PASSWORD}
            VIRTUAL_HOST: ${SITE2_HOST_NAME}
            VIRTUAL_PORT: 443
            LETSENCRYPT_HOST: ${SITE2_HOST_NAME}
        volumes:
            - wp-site2:/var/www/html
        networks:
            - proxy-network
```

These two blocks setup the WordPress sites. You can add additional sites by copying one of these, adding the required environment variables to the .env file, and adding the volume to the top-level volumes list that will be discussed below. 

```yml
image: wordpress:5-php7.2
```
I used the standard WordPress Apache image for this because the nginx-proxy doesn't support FastCGI right now. Unfortunately there's not a WordPress image that uses Alpine and not FastCGI and I didn't feel like making one just for this.  

```yml
env_file: .env
environment:
    WORDPRESS_DB_HOST: db:3306
    WORDPRESS_DB_NAME: ${SITE1_DB_NAME}
    WORDPRESS_DB_USER: ${MYSQL_USER}
    WORDPRESS_DB_PASSWORD: ${MYSQL_PASSWORD}
    VIRTUAL_HOST: ${SITE1_HOST_NAME}
    VIRTUAL_PORT: 443
    LETSENCRYPT_HOST: ${SITE2_HOST_NAME}
```
The WordPress image requires the `WORDPRESS_DB_HOST`, `WORDPRESS_DB_NAME`, `WORDPRESS_DB_USER`, and `WORDPRESS_DB_PASSWORD` environment variables to be initialized. It also assumes that the user you specify has full access to the database (which we setup using the MariaDB init.sh script from earlier). 

The other environment variables are required by the proxy and the companion. `VIRTUAL_HOST` is a comma-separated list of hostnames that your site responds to. This should be set to `site1.com, www.site1.com` (replacing site1 with your actual domain). `VIRTUAL_PORT` is set to 443 to use HTTPs. `LETSENCRYPT_HOST` is a comma-separated list of the addresses for which you want SSL certificates. It doesn't currently support wildcard certificates (e.g., *.site1.com that covers both the root domain and the www subdomain) so it's set to the same value as `VIRTUAL_HOST`.

```yml
volumes:
    - wp-site1:/var/www/html
```
WordPress saves its files in /var/www/html so I setup a Docker-managed volume for each site to make those files accessible on the host VPS. 

#### Networks and Volumes
```yml
networks:
    proxy-network:
        driver: bridge

volumes:
    database:
    conf:
    vhost:
    html:
    dhparam:
    certs:
    wordpress-site1:
    wordpress-site2:
```
The networks section of this block creates the network that all the containers are connected to as a bridge network (so the containers can talk to each other). The volumes section indicates that I want these Docker-managed volumes to be shared among containers. Defining the volumes at the top-level like this also allows specifying additional configuration for the volumes without copying it in each container that uses them (although I didn't do this here).

### Conclusion
That's basically it! The [multiple-wordpress-containers](https://github.com/arnath/multiple-wordpress-containers) repo has the finished scripts as well as instructions on how to use them. Let me know in the comments if you have any problems getting this working or if there's something I'm doing wrong.