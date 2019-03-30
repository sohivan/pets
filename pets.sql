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

CREATE TABLE PetOwners (
	oid				serial primary key,
	owner_name		text not null,
	description 	text not null,
	foreign key (oid, owner_name) references users(id,name)
);

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
	oid					SERIAL not null REFERENCES PetOwners(oid),
	unique(petid,oid)
);
--
--
--CREATE TABLE Homes (
--	address			text not null,
--	area			integer not null,
--	type 			text not null,
--	home_owner		SERIAL not null REFERENCES users(id),
--	primary key (address, home_owner)
--);
--

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


CREATE TABLE Services (
	Service 		VARCHAR(100) not null,
	StartDate 		DATE not null,
	EndDate 		DATE not null,
	Rate			smallint not null,
	cid				SERIAL not null REFERENCES CareTaker(cid),
	serviceid		serial primary key,
	unique(serviceid,cid)
);

---- set datestyle = 'DMY';

CREATE TABLE Bid (
	ServiceStartDate	date not null,
	ServiceEndDate		date not null,
	BidID			SERIAL primary key,
	BidTimestamp	timestamp not null ,
	BidAmount		smallint not null,
	PetID 			SERIAL not null,
	PetOwnerID		SERIAL not null,
	CareTakerID		SERIAL not null,
	ServiceID		serial not null,
	bidrequest		text,
	bidstatus		varchar(20) default 'pending' not null,
	foreign key (petid, petownerid) references pets(petid,oid),
	foreign key (CareTakerID,ServiceID) references services(cid,serviceid)
);
	
--CREATE Table History (
--	BookingID		SERIAL primary key,
--	BidderID		SERIAL not null REFERENCES CareTaker(cid),
--	PetOnwner 		SERIAL not null REFERENCES Pets(oid),
--	PetID 			SERIAL not null REFERENCES Pets(PetID),
--	--BookingTimestamp	timestamp not null references Bid(BidTimestamp),
--	-- PaymentID		SERIAL not null REFERENCES Payment(PaymentID),
--	serviceid 		serial not null REFERENCES Services(serviceid)
--);