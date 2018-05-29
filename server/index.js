const pg = require('pg');
var express=require('express');
var app=express();
var router = express.Router();
// var cors = require('cors')
var bodyParser = require('body-parser')

// app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const pool = new pg.Pool({
user: 'postgres',
host: '127.0.0.1',
database: 'family',
password: 'password',
port: '5432'});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Query Execution
function test(req, res) {
	pool.query("SELECT NOW()", (err, resp) => {
		console.log(res.rows);			
		if(!err) {
			res.status(200).send(resp);
		}
	});
	//res.send('Wiki home page');
}

//Query Execution
function getRelationships(req, res) {
	let query = " select r_id, m1.m_name as m1,m2.m_name as m2, r_parent_id as parentId from relationships" +
				" left join members m1 on r_m_id1=m1.m_id" +
				" left join members m2 on r_m_id2=m2.m_id" +
				" where f_id=" + req.query.familyId;

	

	pool.query(query, (err, resp) => {			
		if(!err) {
			console.log(resp);
			res.status(200).send(resp);
		} else {
			console.log(err);
		}

	});
	//res.send('Wiki home page');
}

//Query Execution
function getfamily(req, res) {
	let query = " select f_id, f_name from family";	
	pool.query(query, (err, resp) => {			
		if(!err) {
			res.status(200).send(resp);
		} else {
			console.log(err);
		}

	});
	//res.send('Wiki home page');
}

//Query Execution
function getUser(req, res) {
	let query = "select u_id from users where u_email='"+ req.query.emailId + "'";	
	pool.query(query, (err, resp) => {			
		if(!err) {
			res.status(200).send(resp);
		} else {
			console.log(err);
		}

	});
	//res.send('Wiki home page');
}

//Query Execution
function newUser(req, res) {
	//console.log(req.body.email);

	let query = "select u_id from users where u_email='"+ req.body.email + "'";	
	pool.query(query, (err, resp) => {			
		if(!err) {			
			if (resp.rows.length === 0) {
				query = "insert into users(u_name,u_email,u_created_date) " +
					" values('"+req.body.name+"','"+ req.body.email + "',now())";							
				pool.query(query, (e, r) => {					
					if(!e) {
						res.status(200).send(r);
					}
				});
			} else {
				res.status(200).send(resp);
			}
		} else {
			console.log(err);
		}
	});
	//res.send('Wiki home page');
}

//Query Execution
function newMember(req, res) {
	//console.log(req.body.email);

	if(req.body.m_id != "" & req.body.m_id != null) {
		let query = "update members set m_name='" + req.body.name + "' where m_id=" + req.body.m_id;					
				pool.query(query, (e, r) => {					
					if(!e) {
						res.status(200).send(r);
					} else {
			console.log(e);
		}
				});

	} else {
		let query = "select m_id from members where m_name='"+ req.body.name + "' and u_id='"+ req.body.u_id +"'";	
		pool.query(query, (err, resp) => {			
			if(!err) {			
				if (resp.rows.length === 0) {
					query = "insert into members(u_id,m_name,m_created_date) " +
						" values('"+ req.body.u_id +"','"+req.body.name+"',now())";							
					pool.query(query, (e, r) => {					
						if(!e) {
							res.status(200).send(r);
						}
					});
				} else {
					res.status(200).send(resp);
				}
			} else {
				console.log(err);
			}
		});
		//res.send('Wiki home page');
	}
}

//Query Execution
function newFamily(req, res) {
	//console.log(req.body.email);

	let query = "select f_id from family where f_name='"+ req.body.f_name + "' and f_u_id='"+ req.body.f_u_id +"'";	
	pool.query(query, (err, resp) => {			
		if(!err) {			
			if (resp.rows.length === 0) {
				query = "insert into family(f_u_id,f_name,f_created_date) " +
					" values('"+ req.body.f_u_id +"','"+req.body.f_name+"',now())";							
				pool.query(query, (e, r) => {					
					if(!e) {
						res.status(200).send(r);
					}
				});
			} else {
				res.status(200).send(resp);
			}
		} else {
			console.log(err);
		}
	});
	//res.send('Wiki home page');
}

//Query Execution
function newRelationship(req, res) {
	
	req.body.r_parent_id = req.body.r_parent_id == null ? 0:req.body.r_parent_id;

	let query = "insert into relationships(f_id,r_m_id1,r_m_id2,r_parent_id,r_created_date) " +
					" values("+ req.body.f_id +","+req.body.r_m_id1+","+req.body.r_m_id2+","+req.body.r_parent_id+",now())";							
				pool.query(query, (e, r) => {					
					if(!e) {
						res.status(200).send(r);
					} else {
			console.log(e);
		}
				});


}

//Query Execution
function getMembers(req, res) {
	let query = "select m_id, m_name from members where u_id='"+ req.query.familyId + "'";	
	pool.query(query, (err, resp) => {			
		if(!err) {
			res.status(200).send(resp);
		} else {
			console.log(err);
		}

	});
	//res.send('Wiki home page');
}


//Routes
router.get('/', test);
router.get('/relationships', getRelationships);
router.get('/family', getfamily);
router.get('/user', getUser);
router.post('/new-user', newUser);
router.post('/new-member', newMember);
router.post('/family', newFamily);
router.get('/members', getMembers);
router.post('/new-relationship', newRelationship);


module.exports = router;
app.use('/api', router)
// //app.use(cors());

const port = process.env.PORT || 8080;

var server=app.listen(port,function() {
	console.log("Live at Port 3000");
});
