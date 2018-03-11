function show_recommendations(repo,language,ownerlist,starlist,forklist,desclist,cont)
{
    $('#loading-image').hide();

    console.log("inside show Recommended")
    var labels_array = []
    var values_array = []
    for (var i = 0; i < languages.length; i++) {
        labels_array.push(languages[i])
        var st = sizes[i]/1000;
        values_array.push(st)
    }

     console.log("labels_array: "+ labels_array)
     // console.log("lang_chart: "+ languages)
        let lang_chart = new Chart( "#lang_chart", { // or DOM element
        data: {
          labels: labels_array,

          datasets: [
            {
              // label: "Yet Another", type: 'line',
              values: values_array
            }
          ],

          // yMarkers: [{ label: "Marker", value: 70 }],
          // yRegions: [{ label: "Region", start: -10, end: 50 }]
        },

        // title: "My Awesome Chart",
        type: 'bar', // or 'bar', 'line', 'pie', 'percentage' ,'axis-mixed'
        height: 250,
        colors: ['purple', '#ffa3ef', 'red']
      });


    $('#cards').empty();

    // console.log("in")
    for (var i = 0; i < 12; i++) {
        var rep_name = repo[i];
        var main_language = language[i];
        var owner = ownerlist[i];
        var stars = starlist[i];
        var forks = forklist[i];
        var contributors = cont[i];
        var desc = desclist[i];

        if (i % 3 == 0) {
            $('#cards').append(
                '<div id="blog-homepage" class="row">'
            )
        }
        $('#cards').append(
            `<div class="col-sm-3 card rep_card" id="${rep_name}~#~#~${owner}" style="height:300px">
    		 <div class="post">
            <h4 class="rep_name"><center>${rep_name}</center></h4>
            <center>
            <div> 
            	<center class="badge" style="padding:5px;background-color: #3e78dd;padding-left:10px;padding-right:10px;margin:5px">${main_language}</center>
            </div>
            </center>
            <div class="author-category owner_name" >
            	<center>${owner}</center>
            </div>
            <hr>
            <p class="intro">${desc}</p>
            </p>
            <div class="row">
                <div class="col-md-4" style="display:inline">
                <center>
                	<svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
            		${stars}
                </center></div>
                <div class="col-md-4">
                <center>
                	<svg aria-hidden="true" class="octicon octicon-repo-forked" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            		${forks}
                </center></div>
                <div class="col-md-4">
                <center>
                	<svg aria-hidden="true" class="octicon octicon-organization" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M16 12.999c0 .439-.45 1-1 1H7.995c-.539 0-.994-.447-.995-.999H1c-.54 0-1-.561-1-1 0-2.634 3-4 3-4s.229-.409 0-1c-.841-.621-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.442.58 2.5 3c.058 2.41-.159 2.379-1 3-.229.59 0 1 0 1s1.549.711 2.42 2.088C9.196 9.369 10 8.999 10 8.999s.229-.409 0-1c-.841-.62-1.058-.59-1-3 .058-2.419 1.367-3 2.5-3s2.437.581 2.495 3c.059 2.41-.158 2.38-1 3-.229.59 0 1 0 1s3.005 1.366 3.005 4"></path></svg>
            		${contributors}
                </center></div>
            </div>
          </div>
        </div>`
        ); // end of append
        if (i % 3 == 0) {
            $('#cards').append(
                '</div>'
            )
        }
    }

    $(".rep_card").click(function () {
        alert('clicked rep card');
        var id = $(this).attr('id');
        var data = id.split('~#~#~');
        var repo_n = data[0];
        var repo_o = data[1];
        localStorage.clicked_rep_name = repo_n;
        localStorage.clicked_rep_owner = repo_o;
        $(".repository_name").html(localStorage.clicked_rep_name);
        window.open('../rep_details.html');
    })
}


var arr = [false, false, false, false, false]
var labels = ['Languages', 'Stars', 'Contributors', 'Forks', 'Topics']
function clicked(id) {
    if (!arr[id - 1]) {
        // invisible to visible
        arr[id - 1] = !arr[id - 1]
        if (id == 1 || id == 5) {
            $('#s' + id).html(
                `<br><div class="row" style="display:inline-block">
                    <div class="col-md-3"></div>
                    <div class="col-md-2" style="margin-top: 5px">
                        <center style="font-size: 18px">
                            `+ labels[id - 1] + `
                        </center>
                    </div>
                    <div class="col-md-7">
                        <div style="width: 50%">
                            <div class="input-group">
                              <input id="`+ labels[id - 1] + `" type="text" class="form-control" placeholder="Search for...">
                              <span class="input-group-btn">
                                <button class="btn btn-default" type="button">Go!</button>
                              </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>`
            )
        }
        else {
            $('#s' + id).html(
                `<br><div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-2" style="margin-top: 5px">
                    <center style="font-size: 18px">
                       `+ labels[id - 1] + `
                    </center>
                </div>
                <div class="col-md-7">
                    <div style="width: 50%">
                        <div class="input-group">
                          <input id="`+ labels[id - 1] + `" type="number" min="0" class="form-control" placeholder="Search for...">
                          <span class="input-group-btn">
                            <button class="btn btn-default" type="button">Go!</button>
                          </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-2"></div>
            </div>`
            )
        }

    }
    else {
        // visible to invisible
        arr[id - 1] = !arr[id - 1]
        $('#s' + id).html('')
    }

}


function show_function() {
    $('#show').html(
                `
                <div class="container">
                <center>
                    <h2>Your language usage</h2>
                    <div id="lang_chart"></div>
                </center>
                </div>
                <br><br>
                <div class="box text-center" data-animate="fadeInUp">
                <div class="container">
                    <div class="col-md-12">
                        <h3 style="font-style:italic;" >Recommended...</h3>
                        <p class="lead">Checkout these awesome repos we picked just for you !!</p>
                    </div>
                </div>
            </div>
            <div>
                <center>
                    <h2>Apply filters</h2>
                </center>
                <br>
            </div>
            <div class="container">
            <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-1" style="font-size:18px">
               <center>Something easy</center>
            </div>
            <div class="col-md-6">
            <center>
                <div class="slidecontainer" style="width:100%;">
                  <input type="range" min="1" max="5" value="3" class="slider" id="slider_input" onchange="slider_change()">
                </div>
            </center>
            </div>
            <div class="col-md-1" style="font-size:18px">
                <center>Something challenging</center>
            </div>
            <div class="col-md-2"></div>
            </div>


            <br>

            </div>
            <center>
             <div class="loader" id="loading-image"></div>
            </center>
            <br><br>

            <div class="container" id="cards">
                <div class="col-md-12" data-animate="fadeInUp"></div>
            </div>
            <br>
            <center>
                <button type="button" class="btn btn-success refresh_button" onclick="get_data()">
                    Show me something else!
                </button>
            </center>
            <br>
            <br>`
        )
   
}


            // <br>
            // <div class="col-md-1">Beginner</div>
            // <div class="col-md-1"></div>
            // <div class="col-md-1">Advanced beginner</div>
            // <div class="col-md-2"></div>
            // <div class="col-md-1">Intermediate</div>
            // <div class="col-md-2"></div>
            // <div class="col-md-1">Advanced intermediate</div>
            // <div class="col-md-2"></div>
            // <div class="col-md-1">Expert</div>
