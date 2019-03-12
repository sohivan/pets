DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	id 				SERIAL primary key,
	name 			text not null,
	email			VARCHAR(100) not null unique,
	password 		text not null
);


INSERT INTO Users (id, name, email, password) VALUES
(255,'Renee','tempor.bibendum@vel.com','BUZ77LFA2JY');
(810,'Paki','vehicula.aliquet@Aeneaneuismod.ca','BVJ15SCT9SU');
(525,'Minerva','tincidunt@facilisismagnatellus.net','CFE88RYX6BJ');
(332,'Patrick','ipsum.leo.elementum@dignissimMaecenas.co.uk','RKS50SHP9GG');
(548,'Iona','venenatis.vel@Aeneaneuismod.org','WSU52DBI7QE');
(489,'Karyn','erat.vitae@disparturientmontes.ca','MHK80XPP7CK');
(932,'Solomon','quam.quis.diam@molestie.co.uk','QGT17PZZ2IJ');
(508,'Octavius','Phasellus@Aliquamadipiscing.ca','LIO34VZC2UV');
(673,'Violet','Quisque.tincidunt.pede@vitaenibh.com','UFK59FOD0YT');
(640,'Jolie','sem.ut@faucibusorci.ca','ZZT15HBV5XT');
(725,'Heather','nunc.risus@acturpis.com','JBK85ODN5PL');
(941,'Yoshio','Nulla.eget.metus@magnis.net','BTD17WGQ1UB');
(950,'Keane','dignissim.Maecenas@interdumenimnon.org','STX76YFI9BG');


DROP TABLE if exists PetOwners;
CREATE TABLE PetOwners (
	oid				SERIAL not null REFERENCES Users(id),
	name			VARCHAR(100) not null REFERENCES Users(name)
	description 	text not null,
	numofpets		smallint(100) not null,
	PRIMARY KEY (oid)
);

INSERT INTO PetOwners (oid, name, description, numofpets) VALUES
(255,'Renee','aaaaaa',5);
(810,'Paki','aaaaaaa',3);
(525,'Minerva','aaaaaaa',2);
(332,'Patrick','aaaaaaaa',1);
(548,'Iona','aaaaaaaa',2);
(489,'Karyn','aaaaaaaa',1);

DROP TABLE if exists Pets;
CREATE TABLE Pets (
	PetID			SERIAL primary key,
	name			VARCHAR(100) not null,
	weight			smallint(200) not null,
	age				smallint(200) not null,
	breed			VARCHAR(100) not null,
	name			VARCHAR(100) not null,
	typeofpet		VARCHAR(100) not null,
	oid				SERIAL not null REFERENCES PetOwners(oid)
	PRIMARY KEY (pid)
);

INSERT INTO Pets (PetID, name, weight, age, breed, typeofpet, oid) VALUES
(1166,'Hop','2.7556552703','3.8885158019','Poodle','dog',255);
(1177,'Rebecca','2.9118732289','4.7711281473','Husky','dog',255);
(1379,'Xandra','2.9936743322','2.8173021695','Shitzu','dog',255);
(3590,'Lana','2.4297842701','4.9697348125','Corgi','dog',255);
(9176,'Zeph','2.9718911422','5.3035622243','Husky','dog',255);
(5664,'Leilani','3.8819051889','3.5992421957','Poodle','dog',810);
(9056,'Kaye','2.3296668095','3.4407839171','Terrier','dog',810);
(5014,'Sydney','2.6870185783','4.629419826','Corgi','dog',810);
(8600,'Jack','3.2861363197','3.5036991688','Husky','dog',525);
(2594,'Constance','2.9453932727','3.8632163484','Poodle','dog',525);
(9108,'Dalton','3.6034310875','3.3706082931','Husky','dog',332);
(4152,'Maxine','2.6234841657','6.066543142','Corgi','dog',548);
(6373,'Walter','4.3843708009','5.2702815954','Shitzu','dog',548);
(8627,'Joel','3.9528381721','3.9515375944','Corgi','dog',489);


DROP TABLE if exists Homes;
CREATE TABLE Homes (
	address			text not null,
	area			integer not null,
	type 			text not null,
	home_owner		SERIAL not null REFERENCES Users(id)
	primary key (address, home_owner)
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
	-- address			text not null REFERENCES Homes(address)
	PRIMARY KEY (cid)
);

INSERT INTO CareTaker (cid, name, Preference, Description) VALUES
(932,'Solomon','aaaaaaaa','bbbb');
(508,'Octavius','aaaaaaaa','bbbbb');
(673,'Violet','aaaaaaa','bbbbb');
(640,'Jolie','aaaaaaa','bbbbb');
(725,'Heather','aaaaaaa','bbbbb');
(941,'Yoshio','aaaaaaa','bbbbbb');
(950,'Keane','aaaaaaa','bbbbb');

DROP TABLE if exists Review;
CREATE TABLE Review (
	ReviewID		SERIAL primary key,
	RevieweeID		SERIAL not null REFERENCES Users(id),
	ReviewerID		SERIAL not null REFERENCES Users(id),
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
	Rate			smallint(200) not null,
	cid				SERIAL not null REFERENCES CareTaker(cid)
);

INSERT INTO Services (Service, StartDate, EndDate, Rate, cid) VALUES
("Overnight","30-01-2019","23-02-2019",81,932);
("Overnight","24-01-2019","25-01-2019",50,508);
("Washing","23-01-2019","20-02-2019",92,932);
("Walking","25-01-2019","20-02-2019",87,932);
("Walking","30-01-2019","25-01-2019",90,508);
("Overnight","30-01-2019","23-02-2019",93,950);
("Walking","22-01-2019","20-02-2019",87,950);
("Feeding","23-01-2019","20-02-2019",88,508);
("Overnight","22-01-2019","23-02-2019",61,941);
("Walking","30-01-2019","27-02-2019",71,941);
("Vet Visitation","22-01-2019","10-02-2019",67,950);
("Vet Visitation","27-01-2019","20-02-2019",98,950);
("Feeding","10-01-2019","27-02-2019",57,725);
("Washing","20-01-2019","26-01-2019",99,725);
("Vet Visitation","10-01-2019","23-02-2019",96,725);
("Feeding","24-01-2019","24-02-2019",81,640);
("Overnight","20-01-2019","24-02-2019",51,640);
("Walking","25-01-2019","26-01-2019",53,640);


DROP TABLE if exists ChatHistory;
CREATE TABLE ChatHistory (
	MessageID		SERIAL primary key,
	Text 			text,
	User1			SERIAL not null REFERENCES Users(id),
	User2			SERIAL not null REFERENCES Users(id),
	Attachments		text,
	MessageTimestamp	timestamp not null		
);