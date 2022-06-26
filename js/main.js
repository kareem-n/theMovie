$("#close").click(function () {
  let boxWidth = $("#sideBar").innerWidth();
  if ($("#sideBar").css("left") == "0px") {
    $("#close").attr("class", "fa-solid fa-bars");
    $("#lisst").animate({ top: `100%` }, 200);
    $("#sideBar").animate({ left: `-${boxWidth}` }, 500);
  } else {
    console.log(000);
    $("#close").attr("class", "fa-solid fa-x");
    $("#sideBar").animate({ left: `0px` }, 400, function () {
      $("#lisst").animate({ top: `0px` }, 500);
    });
  }
});

// api
let cont = [];
let lightBoxItem = [];

async function api(typp) {
  var response = await fetch(
    `https://api.themoviedb.org/3/movie/${typp}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&page=1`
  );
  var final = await response.json();
  cont = final.results;
  display(cont);
}

async function apiT() {
  var response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`
  );
  var final = await response.json();
  cont = final.results;
  display(cont);
}

async function apiWord(x) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&query=${x}&page=1&include_adult=false`
  );
  var final = await response.json();
  cont = final.results;
  display(cont);
}
async function apiMovieDetails(idd) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${idd}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`
  );
  var final = await response.json();
  lightBoxDiplay(final);
}

function lightBoxDiplay(data) {
  $(".lightItem").css(
    "backgroundImage",
    `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`
  );
  let temp1 = ``;
  for (let i = 0; i < data.genres.length; i++) {
    temp1 += `
        <span class="me-2">${data.genres[i].name}</span>
      `;
  }
  let temp = `

  <div class="col-lg-5">
    <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="w-100 rounded-3" alt="" />
  </div>
  <div class="col-lg-7 text-white pt-3">
  <h2>${data.original_title}</h2>
  <p>${data.overview}</p>
  <div class="mb-2">${temp1}</div>
  <div class="d-flex flex-column">
    <p >Country : ${data.production_countries[0].iso_3166_1}</p>
    <p >Release Date : ${data.release_date}</p>
    <p >Release Date : ${data.spoken_languages[0].name}</p>
    <p>Vote Avg : ${data.vote_average}</p>
  <p>Vote Count : ${data.vote_count}</p>
  </div>
  </div>
  `;
  document.querySelector("#lightBox_content").innerHTML = temp;
  $("#lightBox_content").slideDown(600);
}

let word = document.querySelector("#word");
$("#word").keyup(function () {
  apiWord(word.value.toLowerCase());
});
let seko = document.querySelector("#seko");
$("#seko").keyup(function () {
  if (seko.value == "") {
    $("#search_content").html("");
  } else {
    displaySearch(seko.value);
  }
});

(function () {
  api("now_playing");
  let varr = document.querySelectorAll("#lisst a");
  $(varr).click(function (e) {
    api($(e.target).attr("category"));
    if ($(e.target).attr("category") == "trending") {
      apiT();
    }
  });
})();

function display(x) {
  var temp = ``;
  for (let i = 0; i < x.length; i++) {
    temp += `
    <div  class="col-lg-4 col-md-6">
    <div index="${i}" class="itemmm rounded-3 position-relative overflow-hidden">
        <img src="https://image.tmdb.org/t/p/w500${x[i].poster_path}" class="w-100" alt="">
        <div class="caption p-4">
            <h3>${x[i].original_title}</h3>
            <p>${x[i].overview}</p>
            <p>Rate: ${x[i].vote_average}</p>
            <p>${x[i].release_date}</p>
        </div>
    </div>
</div>
        `;
  }
  document.querySelector("#content").innerHTML = temp;

  $(".itemmm").click(function () {
    $("#lightBox_content").css("display", "none");
    console.log(11);
    let indexx = Number($(this).attr("index"));
    apiMovieDetails(cont[indexx].id);
    $("#lightBox").css("display", "flex");
  });
}

function displaySearch(x) {
  temp = ``;
  for (var i = 0; i < cont.length; i++) {
    if (
      cont[i].original_title.toLowerCase().includes(x.toLowerCase()) == true
    ) {
      temp += `
            <div class="col-lg-4 col-md-6">
            <div index="${i}" class="itemmm rounded-3 position-relative overflow-hidden">
                <img src="https://image.tmdb.org/t/p/w500${cont[i].poster_path}" class="w-100" alt="">
                <div class="caption p-4">
                    <h3>${cont[i].original_title}</h3>
                    <p>${cont[i].overview}</p>
                    <p>Rate: ${cont[i].vote_average}</p>
                    <p>${cont[i].release_date}</p>
                </div>
            </div>
        </div>
            `;
    }
  }
  document.querySelector("#search_content").innerHTML = temp;
  $(".itemmm").click(function () {
    $("#lightBox_content").css("display", "none");
    let indexx = Number($(this).attr("index"));
    apiMovieDetails(cont[indexx].id);
    $("#lightBox").css("display", "flex");
  });
}

let name1 = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone");
let age = document.querySelector("#age");
let password = document.querySelector("#password");
let repassword = document.querySelector("#repassword");

function submit(xxx) {
  if (
    xxx == true &&
    name1.value != "" &&
    email.value != "" &&
    phone.value != "" &&
    age.value != "" &&
    password.value != "" &&
    repassword.value != ""
  ) {
    $("#lorem").removeClass("disabled");
  } else {
    $("#lorem").addClass("disabled");
  }
}

function nameCheack() {
  let regexNamw = /^\S*$/;
  $(name1).keyup(function (e) {
    if (regexNamw.test(name1.value) == false || name1.value == "") {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

function emailCheack() {
  let regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  $(email).keyup(function (e) {
    if (regexEmail.test(email.value) == false || email.value == "") {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

function phoneCheack() {
  let regexPhone = /^01[0125][0-9]{8}$/;
  $(phone).keyup(function (e) {
    if (regexPhone.test(phone.value || phone.value == "") == false) {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

function ageCheck() {
  let regexAge = /^[0-9]*$/;

  $(age).keyup(function (e) {
    if (
      age.value <= 16 ||
      age.value >= 100 ||
      regexAge.test(age.value) == false ||
      age.value == ""
    ) {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

function passCheck() {
  let regexPass =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  $(password).keyup(function (e) {
    if (regexPass.test(password.value) == false) {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

function repassCheck() {
  $(repassword).keyup(function (e) {
    if (password.value != repassword.value) {
      $(e.target).siblings().css("display", "block");
      submit(false);
    } else {
      $(e.target).siblings().css("display", "none");
      submit(true);
    }
  });
}

$("#exit i").click(function () {
  $("#lightBox").css("display", "none");
  $("#lightBox_content").html("");
  $("#lightItem").css("backgroundImage", "none");
});

nameCheack();
ageCheck();
emailCheack();
phoneCheack();
passCheck();
repassCheck();
