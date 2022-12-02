// var startGame= {
//      background1: [{bg:'blue'}, {bg:'black'}, {bg:'assets/images/background2.png'}, {bg:'assets/images/background2.png'}, {bg:'assets/images/background2.png'}, {bg:'assets/images/background2.png'}],
//      animate: function () {
//           var lastBgImage = this.background1.pop();
//           this.background1.unshift(lastBgImage);
//      }
// };
//
// backgroundAnimation();
// function backgroundAnimation() {
//      $("#bgImage").empty();
//      for (let i=0; i<startGame.background1.length; i++) {
//           $("#bgImage").append(`<section class="bg" style="background: url("${startGame.background1[i].bg}")"> </section>`)
//      }
//      startGame.animate();
// }
//
// var id = "";
//


// var backgroundPositionX = 0;
// var moveBackgroundAnimationID1 = 0;
// var moveBackgroundAnimationID2 = 0;

$("#btnStartGame").click(function () {
     // clearInterval(id);
     // id = setInterval(backgroundAnimation,500);
     // $("#bgImage, .bg, #bgContent1, #enemyArea, #bgContent2").css('animation-play-state','running');
     $("#btnStartGame").css('display','none');
     keyEvents();
});

var b=0;

function keyEvents() {
     $(window).on('keydown', function (event) {
          if (event.key == "Tab") {
               event.preventDefault();
          }

          // console.log(event);

          if (event.key == "ArrowRight") {
               $("#bgImage, .bg, #bgImageContent1, .bg1, #bgImageContent2, .bg2, #bgContent1, #enemyArea, #bgContent2").css('animation-play-state', 'running');


               // if (moveBackgroundAnimationID1 === 0) {
               //      moveBackgroundAnimationID1 = setInterval(moveBackground1, 100);
               // }
               // if (moveBackgroundAnimationID2 === 0) {
               //      moveBackgroundAnimationID2 = setInterval(moveBackground2, 200);
               // }
          }

          if (event.key == "ArrowUp") {
               // $("#avatarImage").css("top","-=50px");
               $("#avatarImage").finish().animate({
                    top: "-=30px"
               });
          }

          if (event.key == "ArrowDown") {
               // $("#avatarImage").css("bottom","-=50px");

               $("#avatarImage").finish().animate({
                    bottom: "-=30px"
               });
          }

          b = parseInt($("#c1").css("left"));
          console.log(b);

          checkCollectCoins();

     });
}

function checkCollectCoins() {
     // var a = $("#avatarImage").prop("right");
     // var b = parseInt($(".coins>div").prop("left"));


     // var a = document.getElementById("avatarImage").getPropertyValue("right");
     // var b = document.querySelector(".coins>div").getPropertyValue("left");


     var a = parseInt($("#avatarImage").css("right"));
     // var b = parseInt($(".c").css("left"));


     console.log(a + "/" + b);

     if (b === a ) {
          alert("Win");
          console.log("Win");
     }
}


// function moveBackground1() {
//      backgroundPositionX = backgroundPositionX - 20;
//      document.querySelector(".bg>div:nth-child(1)").style.backgroundPositionX = backgroundPositionX + "px";
//      document.querySelector(".bg>div:nth-child(2)").style.backgroundPositionX = backgroundPositionX + "px";
//      document.querySelector(".bg>div:nth-child(3)").style.backgroundPositionX = backgroundPositionX + "px";
//      // document.querySelector(".bg1>div").style.backgroundPositionX = backgroundPositionX + "px";
//      // document.querySelector(".bg2>div").style.backgroundPositionX = backgroundPositionX + "px";
// }
//
// function moveBackground2() {
//      document.querySelector(".bg1>div").style.backgroundPositionX = backgroundPositionX + "px";
//      document.querySelector(".bg2>div").style.backgroundPositionX = backgroundPositionX + "px";
// }
