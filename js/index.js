$(document).ready(function(){

	$("#submit").click(function(){

		var username = $("#username").val();
		var password = $("#password").val();

		var languages = []; // All langs of user
		var sizes = []; // All lang sizes of user
		var stars = 0; //All stars in reps of user
		var forks = 0; //All forks in reps of user
		var followers = 0;

		$.ajax({
			type:'POST',
			url:'/rep_info',
			data:{username:username,password:password},
			dataType:'json',
			success: function(data){

				console.log(data.res);

				var nos = [];
				var total_stars = 0;
				var total_forks = 0;

				for(var k in data.res){

					$.ajax({
						type:'GET',
						url:data.res[k].languages_url,
						dataType:'json',
						async:false,
						success: function(langinfo){
							//console.log(data.res[k].name);
							
							var langs = Object.keys(langinfo);
							//console.log(langs);
	
							var langsize = Object.values(langinfo);
							//console.log(langsize);
	
							for(var i=0;i<langs.length;i++){

								//console.log(langs[i]);

								if(languages.indexOf(langs[i]) == -1){

									languages.push(langs[i]);
									sizes.push(langsize[i]);
									nos.push(0);
								}

								else{
									var pos = languages.indexOf(langs[i]);
									//console.log("curr-size="+langsize[i])
									//console.log("b="+sizes[pos]);
									sizes[pos]+=langsize[i];
									nos[pos]+=1;
									//console.log("a="+sizes[pos]);
								}

							}
						}

					});
					
					total_stars += data.res[k].stargazers_count;
					total_forks += data.res[k].forks_count;

					console.log(data.res[k].name);
				}

				stars = Math.floor(total_stars/data.res.length);
				forks = Math.floor(total_forks/data.res.length);

				//console.log(forks);

				for(i=0;i<sizes.length;i++){
					sizes[i] = Math.floor(sizes[i]/(nos[i]+1));
				}
			}
		});

		$.ajax({
			type:'POST',
			url:'/user_info',
			data:{username:username,password:password},
			dataType:'json',
			success: function(data){
				followers = data.res.followers;
				console.log(followers);
			}
		});
	});
	
});