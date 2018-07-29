use url_shortener;

CREATE TABLE url_shortener.dictionary (
  hash        VARCHAR(20)    NOT NULL,
  description VARCHAR(250),
  available   BOOL DEFAULT 0 NOT NULL,
  language    VARCHAR(2),
  registered  TIMESTAMP,
  url         TEXT
);

ALTER TABLE url_shortener.dictionary
  ADD CONSTRAINT dictionary_pkey PRIMARY KEY (hash);

INSERT INTO url_shortener.dictionary
VALUES ('askance             ',
        'with a side or oblique glance; "did not quite turn all the way back but looked askance at me with her dark eyes"                                                                                                                                          ',
        true,
        'en',
        NULL,
        NULL);
INSERT INTO url_shortener.dictionary
VALUES ('awry                ',
        'away from the correct or expected course; "something has gone awry in our plans"; "something went badly amiss in the preparations"                                                                                                                        ',
        true,
        'en',
        NULL,
        NULL);
INSERT INTO url_shortener.dictionary
VALUES ('askew               ',
        'turned or twisted to one side; "rugs lying askew"; "with his necktie twisted awry"                                                                                                                                                                        ',
        true,
        'en',
        NULL,
        NULL);
INSERT INTO url_shortener.dictionary
VALUES ('astutely            ',
        'in a shrewd manner; "he invested his fortune astutely"; "he was acutely insightful"                                                                                                                                                                       ',
        true,
        'en',
        NULL,
        NULL);
INSERT INTO url_shortener.dictionary
VALUES ('amain               ',
        'with all your strength; "he pulled the ropes amain"                                                                                                                                                                                                       ',
        true,
        'en',
        NULL,
        NULL);
INSERT INTO url_shortener.dictionary
VALUES ('something           ', 'some arbitrary explanation...', false, 'en', NULL, 'http://www.google.com');

