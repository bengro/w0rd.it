# Word-based Url Shortener
Word-based URL shortener, deployed at [w0rd.it](https://w0rd.it). It is written in PHP (because it can be hosted for free, and I'm cheap) and MySQL.
[WordNet](https://wordnet.princeton.edu/download/current-version) is a great word dictionary.

## Development
Boots up MySQL and Apache webserver on http://localhost:8888. Deploys source and tests in on Apache.
```
docker-compose up
```

Libraries:
* [Meekro](https://meekro.com/index.php) for MySQL connection and queries
* [Flight](http://flightphp.com/learn/) for simple REST endpoints

## Deployment
To generate a deployable unit, run:
```
./prepare-deployment.sh
```
The generated directory, can be deployed on a Apache webserver supporting *htaccess*.
