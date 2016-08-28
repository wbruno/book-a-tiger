# Book a Tiger


Installation
```
$ npm i
```

Exports debug env var
```
$ export DEBUG=tag:*
```


Create table `book_a_tiger.cleaners`
```
book_a_tiger=# CREATE TABLE cleaners (id char(20), name varchar(255), country_code char(2), latitude numeric, longitude numeric, gender char(1), preferences varchar(255));
book_a_tiger=# ALTER TABLE cleaners ADD CONSTRAINT cleaners_pk PRIMARY KEY (id);
```


Usage Example:
```
$ gulp get-matches --country=de --geo=52.5126466,13.4154251
$ gulp get-matches -c de -g 52.5126466,13.4154251
```


Tests
```
$ npm test
```
