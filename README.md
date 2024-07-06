In this simple project, I set up salting and hashing password system through which a hacker will not  able to find out it's password.
Here I use an website named node.bcript.js
Following code are used:
const bcrypt = require('bcrypt');
const saltRounds = 10;
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
    // result == true
});
