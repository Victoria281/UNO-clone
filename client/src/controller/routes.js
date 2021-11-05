// Check login
app.post('/login', function (req, res, next) {
    const uname = req.body.uname;
    const password = req.body.password;
   
    return pool.query(`SELECT * FROM uno_userdetails WHERE username=$1 AND password=$2`,
        [uname, password],
        function (error, result) {
            
            console.log(result.rows)

            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            try{
               if(result.rows[0].username == uname && result.rows[0].password == password){
                    console.log("IN THE SUCCESS!!")
                    return res.status(200).send("Authorized!");
                }
                    
                
            } catch(err){
                console.log("THERES AN ERROR!!")
                return res.status(401).send("UNAUTHORIZED");
            }
            
            
        },
    );
});

// Register
app.post('/register', printingRequestMessage, function (req, res, next) {
    const uname = req.body.uname;
    const password = req.body.password;
    const email = req.body.email;
   
    return pool.query(`INSERT INTO uno_userdetails(username, password, email) VALUES ($1, $2, $3)`,
        [uname, password, email],
        function (error, result) {
            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            try{
                console.log("SUCCESS!!")
                console.log("The result is " + result);
                return res.status(201).send("Successfully Inserted");

            } catch(err){
                console.log("THERES AN ERROR!!");
                console.log("The error is " + error);
                return res.status(401).send("UNAUTHORIZED");
            }
        },
    );
});



// GET USER INFO
app.get('/getUsers/:id', function (req, res, next) {
    const userid = req.params.id;

    return pool.query(`SELECT * FROM uno_userdetails WHERE user_id=$1`,
        [userid],
        function (error, result) {
            console.log("IM HEREEEE")
            console.log(result)

            // if (error) {
            //     console.log("THERES AN ERROR!!")
            //     return res.status(401).send("UNAUTHORIZED");
            // }

            // if(result.rows == null){
            //     console.log("IN NULL AREA")
            //     return res.status(500);
            // } 

            if (error) {
                console.log("ERROR IS HERE!!")
                throw error
            }
            res.status(200).json(result.rows)
            
        },
    );
});