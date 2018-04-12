function SetupUniversalEventHandlers(){$(".form-control").on("input",function(){var e=$("#widthInput").val(),s=$("#heightInput").val(),o=$("#bombInput").val();minWidth>e&&(e=minWidth),e>maxWidth&&($("#widthInput").val(maxWidth),e=maxWidth),minHeight>s&&(s=minHeight),s>maxHeight&&($("#heightInput").val(maxHeight),s=maxHeight),0>o&&($("#bombInput").val(0),o=0),o>e*s&&($("#bombInput").val(e*s),o=e*s),o>999&&($("#bombInput").val(999),o=999),boardHeight=s,boardWidth=e,bombs=o,SetDifficultyLabel(),StartGame()}),$(function(){$(document).mouseup(function(e){1===e.which&&(lmb=!1,$(".fa-meh-o").addClass("fa-smile-o"),$(".fa-smile-o").removeClass("fa-meh-o"))})}),$(function(){$(document).mousedown(function(e){1===e.which&&(lmb=!0)})}),$(function(){$(".smiley-box").mousedown(function(e){1===e.which&&$(this).addClass("smiley-box-pressed")})}),$(function(){$(".smiley-box").mouseup(function(e){1===e.which&&($(".smiley-box").removeClass("smiley-box-pressed"),StartGame())})}),$(function(){$(".smiley-box").mouseleave(function(){1===event.which&&$(".smiley-box").removeClass("smiley-box-pressed")})}),$(window).keydown(function(e){(0===e.keyCode||32===e.keyCode||13===e.keyCode)&&(e.preventDefault(),$(".smiley-box").addClass("smiley-box-pressed"))}),$(window).keyup(function(e){0===e.keyCode||32===e.keyCode||13===e.keyCode?(e.preventDefault(),$(".smiley-box").removeClass("smiley-box-pressed"),paused||StartGame()):80===e.keyCode&&(e.preventDefault(),TogglePause())})}function TogglePause(){paused?(paused=!1,freezeControls=!1,started=!0,$(".minesweeper-container").removeClass("pause")):started&&(paused=!0,freezeControls=!0,started=!1,$(".minesweeper-container").addClass("pause"))}function SetDifficultyLabel(){var e=$("#difficulty-label");e.removeClass("firetextOUTLINE");var s="Intermediate",o=Math.round((boardHeight*boardWidth-bombs)/bombs*10)/10;$(".bomb-subtext").text("("+o+" : 1)"),210>boardHeight*boardWidth&&o>0&&(o+=(210-boardHeight*boardWidth)/8*.1),o>9.5?s="Beginner":4.5>o&&(s="Expert",2.5>o&&(e.addClass("firetextOUTLINE"),s="Impossible")),e.removeClass("Beginner"),e.removeClass("Intermediate"),e.removeClass("Expert"),e.removeClass("Impossible"),e.addClass(s),e.text(s)}function StartGame(){connectingZerosQueue=[],$(".fa-sun-o").addClass("hidden-important"),started=!1,clearInterval(timer),freezeControls=!1,bombsRemaining=bombs,spacesRemaining=boardWidth*boardHeight-bombsRemaining,UpdateDisplays(),$("#timeSpentDiv").text("000"),$(".fa-frown-o").addClass("fa-smile-o"),$(".fa-smile-o").removeClass("fa-frown-o"),DrawBoard(),SetBombs(),SetupBoardValues(),AttachElementHandlers()}function DrawBoard(){var e=32*boardWidth-62-16;$("#timeSpentDiv").css("margin-left",e),$("#timer-led-box").css("margin-left",e);var s=-1*(boardWidth/2*32+21.5);$("#smiley-container").css("right",s),$("#board").html("");for(var o=1;boardHeight>=o;o++){for(var a=1;boardWidth>=a;a++){var t=$("<div>").attr("class","board-cell").attr("id","row"+o+"col"+a);t.appendTo("#board")}$("<br>").appendTo("#board")}}function SetBombs(){for(var e=0;bombs>e;){var s=Math.floor(Math.random()*boardHeight+1),o=Math.floor(Math.random()*boardWidth+1),a=$("#row"+s+"col"+o);a.hasClass("bomb")||(a.addClass("bomb"),e++)}}function SetupBoardValues(){for(var e=1;boardHeight>=e;e++)for(var s=1;boardWidth>=s;s++){var o=$("#row"+e+"col"+s);if(!o.hasClass("bomb")){var a=0;$("#row"+(e+1)+"col"+(s+1)).hasClass("bomb")&&a++,$("#row"+(e-1)+"col"+(s-1)).hasClass("bomb")&&a++,$("#row"+(e+1)+"col"+(s+0)).hasClass("bomb")&&a++,$("#row"+(e+0)+"col"+(s+1)).hasClass("bomb")&&a++,$("#row"+(e-1)+"col"+(s+0)).hasClass("bomb")&&a++,$("#row"+(e+0)+"col"+(s-1)).hasClass("bomb")&&a++,$("#row"+(e+1)+"col"+(s-1)).hasClass("bomb")&&a++,$("#row"+(e-1)+"col"+(s+1)).hasClass("bomb")&&a++;var t="eight";0===a?t="zero":1===a?t="one":2===a?t="two":3===a?t="three":4===a?t="four":5===a?t="five":6===a?t="six":7===a&&(t="seven"),o.addClass(t)}}}function AttachElementHandlers(){$(function(){$(".board-cell").mousedown(function(e){if(!freezeControls&&!$(this).hasClass("exposed"))switch(e.which){case 1:$(this).hasClass("flag")||$(this).hasClass("questionmark")||($(this).addClass("pressed"),$(".fa-smile-o").addClass("fa-meh-o"),$(".fa-meh-o").removeClass("fa-smile-o"));break;case 2:break;case 3:$(this).hasClass("flag")?(bombsRemaining++,UpdateDisplays(),$(this).removeClass("flag"),$(this).addClass("questionmark")):$(this).hasClass("questionmark")?$(this).removeClass("questionmark"):(bombsRemaining--,UpdateDisplays(),$(this).addClass("flag"),0===bombsRemaining&&0===spacesRemaining&&YouWin())}})}),$(function(){$(".board-cell").mouseup(function(e){if(!freezeControls&&!$(this).hasClass("exposed"))switch(e.which){case 1:$(this).hasClass("flag")||$(this).hasClass("questionmark")||(started||(started=!0,StartTimer()),$(this).removeClass("pressed"),$(".fa-meh-o").addClass("fa-smile-o"),$(".fa-smile-o").removeClass("fa-meh-o"),ExposeCell($(this)));break;case 2:break;case 3:}})}),$(function(){$(".board-cell").mouseleave(function(){$(this).removeClass("pressed")})}),$(function(){$(".board-cell").mouseenter(function(){lmb&&$(this).addClass("pressed")})})}function ExposeCell(e){if(null!=e&&!e.hasClass("exposed")){if(ExposeCellDetails(e),e.hasClass("bomb")&&freezeControls===!1)e.attr("style","background-color:red;"),YouLose();else if(e.hasClass("zero"))for(RevealConnectingZeros(e);connectingZerosQueue.length>0;){var s=connectingZerosQueue.shift();s.hasClass("exposed")||(ExposeCellDetails(s),s.hasClass("zero")&&RevealConnectingZeros(s))}spacesRemaining=boardWidth*boardHeight-bombs-$(".exposed").length,0===bombsRemaining&&0===spacesRemaining&&0==freezeControls&&YouWin()}}function ExposeCellDetails(e){e.addClass("exposed"),e.hasClass("flag")&&(e.removeClass("flag"),bombsRemaining++,UpdateDisplays()),e.removeClass("questionmark")}function RevealConnectingZeros(e){var s=e.attr("id"),o=parseInt(s.split("row")[1].split("col")[0]),a=parseInt(s.split("col")[1]);connectingZerosQueue.push($("#row"+(o-1)+"col"+(a+0))),connectingZerosQueue.push($("#row"+(o+1)+"col"+(a+0))),connectingZerosQueue.push($("#row"+(o+0)+"col"+(a-1))),connectingZerosQueue.push($("#row"+(o+0)+"col"+(a+1))),connectingZerosQueue.push($("#row"+(o+1)+"col"+(a+1))),connectingZerosQueue.push($("#row"+(o-1)+"col"+(a-1))),connectingZerosQueue.push($("#row"+(o+1)+"col"+(a-1))),connectingZerosQueue.push($("#row"+(o-1)+"col"+(a+1)))}function YouWin(){$(".fa-sun-o").removeClass("hidden-important"),started=!1,freezeControls=!0}function YouLose(){started=!1,freezeControls=!0,$(".bomb").each(function(e,s){$(this).hasClass("flag")||ExposeCell($(this))}),$(".flag").each(function(e,s){$(this).hasClass("bomb")||($(this).removeClass("flag"),$(this).addClass("bombWrong"))}),$(".fa-smile-o").addClass("fa-frown-o"),$(".fa-meh-o").addClass("fa-frown-o"),$(".fa-frown-o").removeClass("fa-smile-o"),$(".fa-frown-o").removeClass("fa-meh-o")}function UpdateDisplays(){for(var e=bombsRemaining;e.toString().length<3;)e="0"+e;e.toString().length<=3&&$("#bombsRemainingDiv").text(e)}function ExposeBoard(){freezeControls=!0,$(".board-cell").each(function(e,s){ExposeCell($(this))})}function StartTimer(){timer=setInterval(function(){TimerTick()},1e3)}function TimerTick(){if(started){var e=$("#timeSpentDiv").text();if(e=parseInt(e),999>e){for(e++;e.toString().length<3;)e="0"+e;$("#timeSpentDiv").text(e)}}}var boardWidth=16,boardHeight=16,bombs=40,freezeControls=!1,bombsRemaining,spacesRemaining,maxWidth=99,minWidth=8,minHeight=1,maxHeight=99,started,timer,lmb=!1,connectingZerosQueue,paused=!1,main=function(){SetupUniversalEventHandlers(),StartGame()};$(window).load(),$(document).ready(main);