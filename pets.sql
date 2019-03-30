DROP TABLE if exists users cascade;
DROP TABLE if exists PetOwners cascade;
DROP TABLE if exists Pets cascade;
DROP TABLE if exists Homes cascade;
DROP TABLE if exists Bid cascade;
DROP TABLE if exists History cascade;
DROP TABLE if exists CareTaker cascade;
DROP TABLE if exists Services cascade;
DROP TABLE if exists admins cascade;


CREATE TABLE admins (
	id 			SERIAL PRIMARY KEY
);


CREATE TABLE users (
	id 					SERIAL primary key,
	name 				text not null,
	email				VARCHAR(100) not null unique,
	password 			text not null,
	lastlogintimestamp	TIMESTAMP not null,
	unique(id,name)
);

INSERT INTO users (id, name, email, password,lastlogintimestamp) VALUES
(255,'Renee','tempor.bibendum@vel.com','BUZ77LFA2JY','1990-09-26 00:16:06'),
(810,'Paki','vehicula.aliquet@Aeneaneuismod.ca','BVJ15SCT9SU','1990-09-26 00:16:06'),
(525,'Minerva','tincidunt@facilisismagnatellus.net','CFE88RYX6BJ','1990-09-26 00:16:06'),
(332,'Patrick','ipsum.leo.elementum@dignissimMaecenas.co.uk','RKS50SHP9GG','1990-09-26 00:16:06'),
(548,'Iona','venenatis.vel@Aeneaneuismod.org','WSU52DBI7QE','1990-09-26 00:16:06'),
(489,'Karyn','erat.vitae@disparturientmontes.ca','MHK80XPP7CK','1990-09-26 00:16:06'),
(932,'Solomon','quam.quis.diam@molestie.co.uk','QGT17PZZ2IJ','1990-09-26 00:16:06'),
(508,'Octavius','Phasellus@Aliquamadipiscing.ca','LIO34VZC2UV','1990-09-26 00:16:06'),
(673,'Violet','Quisque.tincidunt.pede@vitaenibh.com','UFK59FOD0YT','1990-09-26 00:16:06'),
(639,'Gina','sem.ut@farrucibusorci.ca','ZZZ15HBV5XT', '1990-09-26 00:16:06'),
(640,'Jolie','sem.ut@faucibusorci.ca','ZZT15HBV5XT','1990-09-26 00:16:06'),
(725,'Heather','nunc.risus@acturpis.com','JBK85ODN5PL','1990-09-26 00:16:06'),
(941,'Yoshio','Nulla.eget.metus@magnis.net','BTD17WGQ1UB','1990-09-26 00:16:06'),
(950,'Keane','dignissim.Maecenas@interdumenimnon.org','STX76YFI9BG','1990-09-26 00:16:06'),
(123, 'W', 'hello123@gmail.com', '12341234','1990-09-26 00:16:06');

CREATE TABLE PetOwners (
	oid				serial primary key,
	owner_name		text not null,
	description 	text not null,
	foreign key (oid, owner_name) references users(id,name)
);


INSERT INTO PetOwners (oid, owner_name, description) VALUES
(255,'Renee','aaaaaa'),
(810,'Paki','aaaaaaa'),
(525,'Minerva','aaaaaaa'),
(332,'Patrick','aaaaaaaa'),
(548,'Iona','aaaaaaaa'),
(489,'Karyn','aaaaaaaa');


CREATE TABLE Pets (
	PetID				SERIAL primary key,
	name				VARCHAR(100) not null,
	weight				smallint not null,
	age					smallint not null,
	breed				VARCHAR(100) not null,
	PetType				VARCHAR(100) not null,
	gender				VARCHAR (100) not null, 
	description			text,
	medical_conditions	text,
	oid					SERIAL not null REFERENCES PetOwners(oid)
);


INSERT INTO Pets (PetID, name, weight, age, breed, PetType, gender, description, medical_conditions, oid) VALUES
(1166,'Hop',2,3,'Poodle','dog', 'male', 'hop likes to chew things', 'teething', 255),
(1177,'Rebecca',3,4,'Husky','dog', 'female', 'bec is socialable dog and loves hanging out with other animals', 'none', 255),
(1379,'Xandra',1,5,'Shitzu','dog', 'female', 'xandra loves sports!', null, 255),
(3590,'Lana',2,7,'Corgi','dog','female', 'lana loves humans', null, 255),
(9176,'Zeph',3,2,'Husky','dog','male', 'zeph is afraid of thunder', null, 255),
(5664,'Leilani',2,5,'Poodle','dog','female', 'leilani love children. she is very child-friendly and does not bite', 'NA', 810),
(9056,'Kaye',1,8,'Terrier','dog','female', null, null,  810),
(5014,'Sydney',2,10,'Corgi','dog', 'male', 'syd loves walks in the park', 'do not feed him chocolate', 810),
(8600,'Jack',3,12,'Husky','dog','male', null, 'jack does not eat human food',525),
(2594,'Constance',3,5,'Poodle','dog','female',null, null, 525),
(9108,'Dalton',3,6,'Husky','dog','male', null, 'keep him cool', 332),
(4152,'Maxine',1,9,'Corgi','dog','female', 'maxine is very friendly but she is afraid of cats', null, 548),
(6373,'Walter',1,3,'Shitzu','dog','male', 'walter loves playing by the beach!', 'walter is scared of seagulls',  548),
(8627,'Joel',2,6,'Corgi','dog','male', 'joel loves to swim', null,  489);


CREATE TABLE Homes (
	address			text not null,
	area			integer not null,
	type 			text not null,
	home_owner		SERIAL not null REFERENCES users(id),
	primary key (address, home_owner)
);


CREATE TABLE CareTaker (
	cid				SERIAL unique not null,
	name 			text not null,
	PetType			text not null,
	PetSize			smallint not null,
	housingOptions	smallint not null,
	miscOptions		text,
	description 	text not null,
	NumOfPet		smallint not null, 
	-- address			text not null REFERENCES Homes(address)
	foreign key (cid, name) references users(id, name)
);


INSERT INTO CareTaker (cid, name, PetType, PetSize, housingOptions, miscOptions, description, NumOfPet) VALUES
(932,'Solomon','Dog', 1,0,3,'likes to eat', 1),
(508,'Octavius','Dog', 1,1,2,'likes to sleep', 2),
(673,'Violet','Dog', 1,2,1,'vegetarian',1),
(640,'Jolie','Dog',2,3,0,'likes to sing',3),
(639,'Gina','Dog',2,3,0,'likes to sing',3),
(725,'Heather','Dog',2,1,3,'i am writing a book',2),
(941,'Yoshio','Dog',2,2,2,'i love shows',3),
(950,'Keane','Cat',2,3,1,'i love shows',4);


CREATE TABLE Services (
	Service 		VARCHAR(100) not null,
	StartDate 		DATE not null,
	EndDate 		DATE not null,
	Rate			smallint not null,
	cid				SERIAL not null REFERENCES CareTaker(cid),
	serviceid		serial primary key,
	unique(cid, serviceid)
);

set datestyle = 'DMY';

INSERT INTO Services (Service, StartDate, EndDate, Rate, cid, serviceid) VALUES
('Pet Boarding','24-01-2019','25-01-2019',50,508,1),
('Washing','23-01-2019','20-02-2019',92,932,2),
('Walking','25-01-2019','20-02-2019',87,932,3),
('Walking','30-01-2019','25-01-2019',90,508,4),
('Overnight','30-01-2019','23-02-2019',93,950,5),
('Walking','22-01-2019','20-02-2019',87,950,6),
('Feeding','23-01-2019','20-02-2019',88,508,7),
('Overnight','22-01-2019','23-02-2019',61,941,8),
('Walking','30-01-2019','27-02-2019',71,941,9),
('Vet Visitation','22-01-2019','10-02-2019',98,950,10),
('Vet Visitation','27-01-2019','20-02-2019',67,950,11),
('Feeding','10-01-2019','27-02-2019',57,725,12),
('Washing','20-01-2019','26-01-2019',99,725,13),
('Vet Visitation','10-01-2019','23-02-2019',96,725,14),
('Feeding','24-01-2019','24-02-2019',81,640,15),
('Overnight','20-01-2019','01-05-2019',51,640,16),
('Walking','25-01-2019','26-01-2019',53,640,17),
('Feeding','24-01-2019','24-02-2019',75,639,18);

DROP TABLE if exists Payment;
CREATE TABLE Payment (
	PaymentID		SERIAL primary key,
	PaymentMode		VARCHAR(500) not null,
	Amount 			smallint not null,
	Status			VARCHAR(50) not null,
	PaymentTo		SERIAL not null REFERENCES CareTaker(cid),
	PaymentFrom		SERIAL not null REFERENCES PetOwners(oid)
);

DROP TABLE if exists ChatHistory;
CREATE TABLE ChatHistory (
	MessageID		SERIAL primary key,
	Text 			text,
	User1			SERIAL not null REFERENCES users(id),
	User2			SERIAL not null REFERENCES users(id),
	Attachments		text,
	MessageTimestamp	timestamp not null		
);

CREATE TABLE Bid (
	ServiceStartDate	date not null,
	ServiceEndDate		date not null,
	BidID			SERIAL primary key,
	BidTimestamp	timestamp not null ,
	BidAmount		smallint not null,
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	PetOwnerID		SERIAL not null REFERENCES PetOwners(oid),
	CareTakerID		SERIAL not null REFERENCES CareTaker(cid),
	ServiceID		serial not null REFERENCES Services(serviceid),
	bidrequest		text,
	bidstatus		varchar(20) default 'pending' not null 
);

INSERT INTO Bid (ServiceStartDate, ServiceEndDate, BidID, BidTimestamp , BidAmount, PetID, PetOwnerID, CareTakerID, ServiceID, bidrequest, bidstatus) VALUES
('20-01-2019','31-01-2019',  1234455,'2018-12-25', 35,  8627,  489, 640,  16, 'please take good care of my pet', 'pending'),
('30-05-2019','30-06-2019',  1234459,'2018-12-25', 35,  8627,  489, 640,  16, 'please take good care of my pet', 'pending'),
('20-01-2019','31-01-2019',  1234456,'2018-12-26', 35,  8627,  489, 640,  16, 'please take good care of my pet', 'accepted'),
('29-04-2019','31-05-2019',  1234457,'2018-12-26', 35,  8627,  489, 640,  16, 'please take good care of my pet', 'accepted'),
('30-04-2019','31-05-2019',  1234458,'2018-12-26', 35,  8627,  489, 639,  18, 'please take good care of my pet', 'accepted');


CREATE Table History (
	BookingID		SERIAL primary key,
	BidderID		SERIAL not null REFERENCES CareTaker(cid),
	PetOnwner 		SERIAL not null REFERENCES PetOwners(oid),
	PetID 			SERIAL not null REFERENCES Pets(PetID),
	--BookingTimestamp	timestamp not null references Bid(BidTimestamp),
	-- PaymentID		SERIAL not null REFERENCES Payment(PaymentID),
	serviceid 		serial not null REFERENCES Services(serviceid)
);

DROP TABLE if exists Review;
CREATE TABLE Review (
	ReviewID		SERIAL primary key,
	RevieweeID		SERIAL not null REFERENCES users(id),
	ReviewerID		SERIAL not null REFERENCES users(id),
	BookingID		SERIAL not null REFERENCES History(BookingID),
	Overall			smallint,
	Convenience		smallint,
	Friendliness	smallint
);



-- Triggers 
CREATE OR REPLACE FUNCTION mustBe_petOwner() 
RETURNS TRIGGER as $$
DECLARE count numeric; name text;
BEGIN
SELECT COUNT (*) INTO count FROM petowners
WHERE NEW.oid = petowners.oid; 
IF count > 0 THEN
RETURN NEW; 
else
select users.name into name 
from users 
where users.id = new.oid;
insert into petowners values (new.oid, name, 'aaaa');
RETURN NEW; 
END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER 
add_pets 
BEFORE INSERT OR UPDATE ON Pets
FOR EACH ROW
EXECUTE PROCEDURE mustBe_petOwner();

select * from petowners;
select * from users;
