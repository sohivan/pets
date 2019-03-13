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
  var name = request.body.name;
  var email = request.body.email;
  var password = request.body.password;
  let values = [name, email, password];
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err);
    }
    else {
      db.query(`
        INSERT INTO USERS(name, email, password)
        VALUES($1, $2, $3)`, [name, email, password], (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        }
        else {
          console.log("i have been inserted");
          response.status(200).send({message:"data inserted"});
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
