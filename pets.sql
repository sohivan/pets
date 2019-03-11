DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id 				SERIAL primary key,
	name 			text not null,
	email			VARCHAR(50) not null unique,
	password 		text not null
);

DROP TABLE if exists PetOwners;
CREATE TABLE PetOwners (
	oid				SERIAL not null REFERENCES Users(id)
	description 	text not null,
	numofpets		smallint(100) not null,
	name			VARCHAR(100) not null REFERENCES Users(name)
	PRIMARY KEY (oid)
);

DROP TABLE if exists Pets;
CREATE TABLE Pets (
	PetID			SERIAL primary key,
	weight			smallint(200) not null,
	age				smallint(200) not null,
	breed			VARCHAR(100) not null,
	name			VARCHAR(100) not null,
	typeofpet		VARCHAR(100) not null,
	oid				SERIAL not null REFERENCES PetOwners(oid)
	PRIMARY KEY (pid)
);

DROP TABLE if exists Homes;
CREATE TABLE Homes (
	address			text primary key,
	area			integer not null,
	type 			text not null,
	home_owner		SERIAL not null REFERENCES Users(id)
);

DROP TABLE if exists Bid;
CREATE TABLE Bid (
	BidStartDate	date not null,
	BidEndDate		date not null,
	BidID			SERIAL primary key,
	BidTimestamp	timestamp not null,
	BidAmount		smallint(1000) not null,
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	PetOnwner		SERIAL not null REFERENCES PetOwners(oid),
	BidderID		SERIAL not null REFERENCES CareTaker(cid),
	Services		text not null REFERENCES Services
);

DROP TABLE if exists History;
CREATE Table History (
	BookingID		SERIAL primary key,
	BidderID		SERIAL not null REFERENCES CareTaker(cid),
	PetOnwner 		SERIAL not null REFERENCES PetOwners(oid),
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	BookingTimestamp	timestamp not null,
	PaymentID		SERIAL not null REFERENCES Payment(PaymentID),
	Services 		text not null REFERENCES Services
);

DROP TABLE if exists Payment;
CREATE TABLE Payment (
	PaymentID		SERIAL primary key,
	PaymentMode		VARCHAR(500) not null,
	Amount 			smallint not null,
	Status			VARCHAR(50) not null,
	PaymentTo		SERIAL not null REFERENCES CareTaker(cid),
	PaymentFrom		SERIAL not null REFERENCES PetOwners(oid)
);

DROP TABLE if exists CareTaker;
CREATE TABLE CareTaker (
	cid				SERIAL REFERENCES Users(id),
	name 			text not null REFERENCES Users(name),
	Preference		text not null,
	Description 	text not null,
	address			text not null REFERENCES Homes(address)
	PRIMARY KEY (cid)
);

DROP TABLE if exists Review;
CREATE TABLE Review (
	ReviewID		SERIAL primary key,
	RevieweeID		SERIAL not null REFERENCES CareTaker(cid),
	ReviewerID		SERIAL not null REFERENCES PetOwners(oid),
	BookingID		SERIAL not null REFERENCES History(BookingID),
	Overall			smallint(10),
	Convenience		smallint(10),
	Friendliness	smallint(10)
);

DROP TABLE if exists Services;
CREATE TABLE Services (
	Service 		VARCHAR(100) not null,
	StartDate 		DATE not null,
	EndDate 		DATE not null,
	Rate			smallint(200) not null
);

DROP TABLE if exists ChatHistory;
CREATE TABLE ChatHistory (
	MessageID		SERIAL primary key,
	Text 			text,
	User1			SERIAL not null REFERENCES Users(id),
	User2			SERIAL not null REFERENCES Users(id),
	Attachments		text,
	MessageTimestamp	timestamp not null		
);