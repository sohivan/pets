
DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id 				SERIAL primary key,
	name 			text not null,
	email			VARCHAR(50) not null unique,
	password 		text not null
);

DROP TABLE if exists PetOwners;
CREATE TABLE PetOwners (
	id 				SERIAL,
	description 	text not null,
	numofpets		integer not null,
	name			text not null
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES Users
);

DROP TABLE if exists Pets;
CREATE TABLE Pets (
	pid				SERIAL,
	size			integer not null,
	age				integer not null,
	breed			text not null,
	name			text not null,
	typeofpet		text not null,
	id				SERIAL
	PRIMARY KEY (pid),
	FOREIGN KEY (id) REFERENCES PetOwners
);

DROP TABLE if exists Homes;
CREATE TABLE Homes (
	address			text,
	area			integer not null,
	type 			text not null,
	id				SERIAL
	PRIMARY KEY (address),
	FOREIGN KEY (id) REFERENCES Users
);