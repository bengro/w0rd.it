# Word-based Url Shortener
Word-based URL shortener, deployed at [w0rd.it](https://w0rd.it). 

## Dictionary
[WordNet](https://wordnet.princeton.edu/download/current-version) is a great word dictionary and can be used to fill the database.

## Development 
Run:
```
docker-compose up
```
MySQL will be polulated with some sample data, and an Apache webserver will serve the files on [localhost:8888]().

## Implementation
The code is written in PHP, because it's cheap/free to host and I wanted to see for myself whether PHP really is as bad as everybody says - it *is*. Please notice, that this is a quick-and-dirty fun project and I do not recommend running it in production.

### Libraries:
* [Meekro](https://meekro.com/index.php) for MySQL connection and queries
* [Flight](http://flightphp.com/learn/) for simple REST endpoints

## Deployment
To generate a deployable unit, run:
```
./prepare-deployment.sh
```
The generated directory, can be deployed on a Apache webserver supporting *htaccess*.
