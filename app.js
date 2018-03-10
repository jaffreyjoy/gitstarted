var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.use(express.static(__dirname));

server.listen(process.env.PORT || 3000,function(){
    console.log('Listening on '+server.address().port);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var GitHub = require('github-api');
var gh = new GitHub();

app.post('/rep_info',function(req,res){
      // basic auth
    var username = req.body.username;
    var password = req.body.password;

    var gh = new GitHub({
        username: username,
        password: password
        /* also acceptable:
        token: 'MY_OAUTH_TOKEN'
        */
    });

    var userrepos = gh.getUser();

    userrepos.listRepos(function(error,result){
        console.log(result);
        return res.send(JSON.stringify({"res":result}));
    });

});

