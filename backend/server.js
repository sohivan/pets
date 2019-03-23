let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
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
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})



app.post('/signup', function(request, response) {
  console.log(request.body);
  var name = request.body.username;
  var email = request.body.email;
  var password = request.body.password;
  var roles = request.body.role;
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
      db.query('BEGIN', function(err) {
        if(err) {
          console.log('Problem starting transaction', err);
          response.status(400).send(err);
          return rollback(db);
        }
        db.query(`
          INSERT INTO USERS(name, email, password)
          VALUES($1, $2, $3) RETURNING id`, [name, email, password], (err, result) => {
          if (err) {
            response.status(400).send(err);
            return rollback(db);
          }
            let id = result.rows[0].id;
            console.log("i have been inserted into users");
            if (roles.includes("Caretaker")) {
              db.query(`
                INSERT INTO CARETAKER(cid, name, Preference, Description)
                VALUES($1, $2, $3, $4)`, [id, name, "hi", "hi2"], (err, result) => {
                  if (err) {
                    console.error(err);
                    return rollback(db);
                  }
              })
            }
              if (roles.includes("Pet Owner")) {
                db.query(`
                  INSERT INTO PETOWNERS (oid, owner_name, description, numofpets)
                  VALUES($1, $2, $3, $4)`, [id, name, "hi", 1], (err, result) => {
                    if (err) {
                      console.error(err);
                      return rollback(db);
                    }
                    })
              }
              db.query('COMMIT', (err) => {
                console.log("hello");
                db.end.bind(db);
                if (err) {
                  console.error('Error committing transaction', err.stack)
                }
                response.status(200).send({message: "good"});
              })
              })
            })
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
  var petoid = 255;
  let values = [petname, petage, petgender, pettype, petbreed, petdesc, petmed, petoid];
  console.log("i am here in serverjs")
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(`
        INSERT INTO PETS(name, weight, age, breed, typeofpet, gender, descrip, med, oid)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [petname, petsize, petage, petbreed, pettype, petgender, petdesc, petmed, petoid], (err, table) => {
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


app.get('/getCaretakers', function(request, response) {
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    } else {
      db.query("SELECT * from caretaker natural join services", function(err, table) {
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

app.listen(PORT, () => console.log("listening on port " + PORT));
