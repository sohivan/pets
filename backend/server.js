let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');


const PORT = 3001;
let app = express();

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '*', //TO REPLACE
  port: 5432,
});

function rollback(client) {
    client.query('ROLLBACK', function() {
        client.end();
        response.status(400).send(err);
    });
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(morgan('dev'));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST,DELETE")
  next();
})


app.post('/user/profile', async (request, response) => {
  const { id } = request.body;
  console.log(request.body);
  try {
    const table = await pool.query(`
    SELECT *,
    CASE 
      WHEN USERS.ID NOT IN (SELECT OID FROM PETOWNERS) THEN 'Caretaker' 
      WHEN  USERS.ID NOT IN (SELECT CID FROM CARETAKER) THEN 'Petowner' 
      ELSE 'Both' END AS USERTYPE
    FROM USERS
    WHERE id=$1
  `, [id])

    return response.status(200).send({
      status: "success", data: {
        name: table.rows[0].name, pageEmail: table.rows[0].email,
        type: table.rows[0].usertype, id: table.rows[0].id,
        desc: table.rows[0].description, lastlogin: table.rows[0].lastlogintimestamp,
        homeid: table.rows[0].homeid, img: table.rows[0].image
      }
    })
  } catch (e) {
    return response.status(400).send(e);
  }
})

app.post('/user/petowner', async (request, response) => {
  const { id } = request.body;

  try {
    const table = await pool.query(`
    SELECT *
    FROM PETOWNERS LEFT OUTER JOIN PETS ON PETOWNERS.OID=PETS.OID
    WHERE PETOWNERS.OID=$1
    `, [id])

    return response.status(200).send({ status: "success", data: { info: table.rows } })
  } catch(e) {
    return response.status(400).send(e);
  }
})


app.post('/user/caretaker', async (request, response) => {
  const { id } = request.body;

  try {
    const table = await pool.query(`
   SELECT *
   FROM CARETAKER LEFT OUTER JOIN SERVICES ON CARETAKER.CID = SERVICES.CID
   WHERE CARETAKER.CID=$1
    `, [id])

    return response.status(200).send({ status: "success", data: { info: table.rows } })
  } catch(e) {
    return response.status(400).send(e);
  }
})

app.post('/login', (request, response) => {
  const { email, password } = request.body;
  var id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    }

    db.query(`
      SELECT * FROM USERS
      WHERE EMAIL=$1
    `, [email], (err, table) => {
        if (err) {
          return response.status(400).send(err);
        }
        if (table.rows.length < 1) {
          return response.status(403).send({ status: "failed", message: "No user found" })
        }
        id = table.rows[0].id;
        // bcrypt.compare(password, table.rows[0].password, function(err, res) {
        //   console.log(res)
        //   if (res==true) {
        //     console.log("success!");
             var dateNow = new Date();
            db.query(`
              UPDATE USERS
              SET lastlogintimestamp=$1
              where email=$2
              `, [dateNow, email], (err, res) => {
                if (!err) {
                  return response.cookie('userId', id, {expires: new Date(Date.now() + 60*60*60*24*5) }).status(200).send({ status: "success" });
                } else {
                  return response.status(403).send({ status: "failed", message: "Something went wrong" });
                }
              })
          // }
          //  else {
          //   return response.status(403).send({ status: "failed", message: "Wrong username/password" })
          // }
        });
      })
  })
// });

app.post('/logout', function(request, response) {
  var cookie = request.cookies.userId;
  console.log(cookie);
  return response.clearCookie('userId', {expires: new Date(Date.now())}).status(200).send({message: "cookie deleted"});
})


app.post('/signup', function(request, response) {
  console.log(request.body);
  var name = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var dateNow = new Date();
  var hashedPw, id;
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    bcrypt
    .hash(password, 10)
    .then(hash => {
      console.log(`Hash: ${hash}`);
      hashedPw=hash;
        db.query(`
          INSERT INTO USERS(name, email, password, lastlogintimestamp)
          VALUES($1, $2, $3, $4) RETURNING id`, [name, email, hashedPw, dateNow], (err, result) => {
          if (err) {
            console.log(err);
            return response.status(400).send(err);
          }
          response.cookie('userId', result.rows[0].id, {expires: new Date(Date.now() + 60*60*60*24*5) });
          return response.status(200).send({id: result.rows[0].id});
        })
      })
    .catch(err => console.error(err.message));
    })
  })

app.post('/makeABidCheck', function(request, response) {
    var id = request.cookies.userId;
    pool.connect((err, db, done) => {
      if(err) {
        return response.status(400).send(err);
      }
      else {
        db.query(`
      SELECT *
      FROM PETOWNERS
      WHERE oid=$1`, [id], (err, results) => {
      done();
      if (err) {
        console.log(err)
        return response.status(400).send(err);
      }
      else {
        response.status(200).send({isValidBidder: results.rows.length > 0});
      }
     })
    }
  })
})



app.post('/addpet', function(request, response) {
  var petname = request.body.petname;
  var petage = request.body.petage;
  var petsize = request.body.petsize;
  var petgender = request.body.petgender;
  var pettype = request.body.pettype;
  var petbreed = request.body.petbreed;
  var petdesc = request.body.petdesc;
  var petmed = request.body.petmed;
  var petoid = request.body.oid;
  var userId = request.cookies.userId;
  console.log(userId);
  var image1 = request.body.image1;
  var image2 = request.body.image2;
  var image3 = request.body.image3;
  let values = [petname, petage, petgender, pettype, petbreed, petdesc, petmed, petoid, image1, image2, image3];
  console.log("i am here in serverjs")
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(`
        INSERT INTO PETS(name, weight, age, breed, PetType, gender, description, medical_conditions, oid, image1, image2, image3)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, [petname, petsize, petage, petbreed, pettype, petgender, petdesc, petmed, userId, image1, image2, image3], (err, table) => {
        done();
        if (err) {
          console.log(err)
          return response.status(400).send(err);
        }
        else {
          console.log("i added a new pet");
          response.status(200).send({message:"new pet added"});
        }
      })
    }
  })
})
app.post('/addService', function(request, response) {
  var service = request.body.service[0];
  var startDate = request.body.date[0];
  var endDate = request.body.date[1];
  var rate = request.body.rate;
  var userId = request.cookies.userId;
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(`
        INSERT INTO Services(service, startDate, enddate, rate, cid)
        VALUES($1, $2, $3, $4, $5)`, [service, startDate, endDate, rate, userId], (err, table) => {
        done();
        if (err) {
          console.log(err)
          return response.status(400).send(err);
        }
        else {
          console.log("new service added");
          response.status(200).send({message:"new service added"});
        }
      })
    }
  })
})


app.post('/addCaretakerPrefsAndServices', function(request, response) {
  var service = request.body.service[0];
  var startDate = request.body.date[0];
  var endDate = request.body.date[1];
  var rate = request.body.rate;
  var userId = request.cookies.userId;
  var pettype =  request.body.pettype;
  var petsize = request.body.petsize;
  var numofpet =  request.body.numofpet;
  var housingopt = request.body.housingopt;
  var miscopt = request.body.miscopt;

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query('BEGIN', function(err) {
           if(err) {
                console.log('Problem starting transaction', err);
             	   response.status(400).send(err);
                return rollback(db);
            }
            db.query(`
              INSERT INTO Services(service, startDate, enddate, rate, cid)
              VALUES($1, $2, $3, $4, $5)`, [service, startDate, endDate, rate, userId], (err, result) => {
               if (err) {
                 return rollback(db);
               }
                 console.log("i have been inserted into caretakers");
                 db.query(`
                     UPDATE CARETAKER
                     SET PetType = $1,
      	             PetSize = $2,
      	             housingOptions	=$3,
      	             miscOptions	= $4,
      	             NumOfPet	= $5
                     WHERE cid = $6`, [pettype, petsize, housingopt, miscopt, numofpet, userId], (err, result) => {
                       if (err) {
                         console.error(err);
                         return rollback(db);
                       }
                       db.query('COMMIT', (err) => {
                          db.end.bind(db);
                          if (err) {
                            console.error('Error committing transaction', err.stack)
                            return rollback(db);
                          }
                          response.status(200).send({message:"new service added"});
                        })
                  })
                })
              })
    }
  })
})






app.post('/addbid', function(request, response) {
  var bidstartdate = request.body.bidstartdate;
  var bidenddate = request.body.bidenddate;
  var bidtimestamp = request.body.bidtimestamp;
  var bidamt = request.body.bidamt;
  var bidpet = request.body.bidpet;
  var bidowner = request.body.bidowner;
  var bidsitter = request.body.bidsitter;
  var bidservice = request.body.bidservice;
  var bidreq = request.body.bidreq;
  let values = [bidstartdate, bidenddate, bidtimestamp, bidamt, bidpet, bidowner, bidsitter, bidservice, bidreq];
  console.log("i am here in serverjs")
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(`
        INSERT INTO BID(BidStartDate, BidEndDate, BidTimestamp, BidAmount, PetID, PetOwnerID, CareTakerID, ServiceID, bidrequest)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [bidstartdate, bidenddate, bidtimestamp, bidamt, bidpet, bidowner, bidsitter, bidservice, bidreq], (err, table) => {
        done();
        if (err) {
          console.log(err)
          return response.status(400).send(err);
        }
        else {
          console.log("i added a new bid");
          response.status(200).send({message:"new bid added"});
        }
      })
    }
  })
})

app.post('/getCaretakers', function(request, response) {
  var service = request.body.service;
  var pettype = request.body.pettype;
  var petsize = request.body.petsize;
  var numofpet = request.body.numofpet;
  var marks = request.body.marks;
  var housingopt = request.body.housingopt;
  var miscopt = request.body.miscopt;
  var startdate = request.body.startdate;
  var enddate = request.body.enddate;
  var filter = request.body.filter;
  console.log(request.body)
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      if(filter === 1) {
        db.query(`with PopCareTaker as
                  	(SELECT cid, count(BidID) as NumOfBid
                  	from caretaker natural join services natural join bid
                  	group by cid
                  	order by NumOfBid desc)
                SELECT distinct * from PopCareTaker natural join caretaker natural join services
                where service = $1 and PetType = $2 and PetSize = $3
                and numofpet >= $4 and rate <= $5
                and housingoptions = $6
                and miscoptions = $7
                and startDate <= $8
                and endDate >= $9
                order by NumOfBid desc
                `, [service, pettype, petsize, numofpet, marks, housingopt, miscopt, startdate, enddate], function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
      else if(filter === 2) {
        db.query(`SELECT distinct * from caretaker natural join services
                where service = $1 and PetType = $2 and PetSize = $3
                and NumOfPet >= $4 and rate <= $5
                and housingOptions = $6
                and miscOptions = $7
                and StartDate <= $8
                and EndDate >= $9
                order by rate asc`, [service, pettype, petsize, numofpet, marks, housingopt, miscopt, startdate, enddate], function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
      else {
        db.query(`SELECT distinct * from caretaker natural join services
                where service = $1 and PetType = $2 and PetSize = $3
                and NumOfPet >= $4 and rate <= $5
                and housingOptions = $6
                and miscOptions = $7
                and StartDate <= $8
                and EndDate >= $9`, [service, pettype, petsize, numofpet, marks, housingopt, miscopt, startdate, enddate], function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
    }
  })
});

app.post('/getPendingBids', function(request, response) {
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * from Services S inner join (PetOwners inner join (Bid B inner join Pets P on B.PetID = P.PetID) B2 on PetOwners.oid = B2.PetOwnerID) P2 on S.serviceid = P2.serviceid where P2.bidstatus = 'pending' and P2.servicestartdate > now()", function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
  })
});

app.post('/getUpcomingBids', function(request, response) {

  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * from Services S inner join (PetOwners inner join (Bid B inner join Pets P on B.PetID = P.PetID) B2 on PetOwners.oid = B2.PetOwnerID) P2 on S.serviceid = P2.serviceid where P2.bidstatus = 'accept' and P2.servicestartdate > now() ", function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
  })
});

app.post('/getPastBids', function(request, response) {
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * from Services S inner join (PetOwners inner join (Bid B inner join Pets P on B.PetID = P.PetID) B2 on PetOwners.oid = B2.PetOwnerID) P2 on S.serviceid = P2.ServiceID where P2.bidstatus = 'accept' and P2.servicestartdate < now()", function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
  })
});

// TO BE COMPLETED
app.delete('/deleteBid', function(request, response) {
  var deletebid = request.body.deletebid;
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      console.log("I am trying to delete")
      db.query(`DELETE from Bid B
                where B.BidID = $1`, [deletebid], function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send({message:"bid deleted"});
        }
      })
    }
  })
});

app.post('/acceptBid', function(request, response) {
  console.log(request.body);
  var acceptedbid = request.body.acceptbid;
  console.log("i am here in serverjs")
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(
        `UPDATE Bid B set bidstatus = 'accepted'
        where B.BidID = $1`, [acceptedbid], (err, table) => {
        done();
        if (err) {
          console.log(err)
          return response.status(400).send(err);
        }
        else {
          console.log("i accepted a new bid");
          response.status(200).send({message:"new bid accepted"});
        }
      })
    }
  })
})

app.listen(PORT, () => console.log("listening on port " + PORT));


// get average bid value
app.get('/getAvgBid', function(request, response) {
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      db.query(`select c.name, serviceid, avg(bidamount) from bid join caretaker c on caretakerid = c.cid group by c.name, serviceid`, function(err, table) {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          return response.status(200).send(table.rows);
        }
      })
    }
  })
});
