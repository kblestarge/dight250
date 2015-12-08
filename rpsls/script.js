var weapons = ['rock','paper','scissors','lizard','spock'];

var body = document.querySelector('body');
body.innerHTML = `
	<header>
		<h1>Rock, Paper, Scissors, Lizard, Spock</h1>
		<h1>RPSLP</h1>
		<h2>Choose your weapon!</h2>
		<div style="display:none;">
			<p>Score</p>
			<h3></h3>
			<h3></h3>
		</div>
	</header>

	<section id="main">

		<button id="rock" class="img-contain">
		</button>

		<button id="paper" class="img-contain">
		</button>

		<button id="scissors" class="img-contain">
		</button>

		<button id="lizard" class="img-contain">
		</button>

		<button id="spock" class="img-contain">
		</button>

	</section>

	<section id="results" style="display:none;">
		<h1>results</h1>
		<div>
			<img src='#'>
			<img src='#'>
		</div>
	</section>`;

var playerPoints = 0;
var computerPoints = 0;

function Weapon (name, winnerAgainst) {
    this.name = name;
    this.winnerAgainst = winnerAgainst;
}

Weapon.prototype = {
    constructor: Weapon,
    init: function() {
    	var button = document.getElementById(this.name);
    	var self = this;
    	button.onclick = function(){
    		var rando = Math.floor((Math.random() * 5));
    		var opponent = weapons[rando];
    		//console.log('rando:',rando)
    		var result = self.fight(opponent);
    		console.log(result);
    		self.showResults(opponent, result);
    	};
    },
    fight : function(opponent) {
		console.log('opponent:',opponent);
		for(var i = 0; i < this.winnerAgainst.length; i++){
			if( this.winnerAgainst[i] == opponent){
				return 'won';
			}else if(this.name == opponent){
				return 'tied';
			}
		}
		//if not win or tie, lose
		return 'lost';
	},
	showResults : function(opponent, result) {
		var resultTitle = document.querySelector('#results h1');
		resultTitle.innerText = 'You ' + result +' against ' + opponent;

		var player = document.querySelector('#results img:first-of-type');
		player.setAttribute('src', 'img/' + this.name + '.png');
		var playerOpponent = document.querySelector('#results img:nth-of-type(2)');
		playerOpponent.setAttribute('src', 'img/' + opponent + '.png');
		var resSlate = document.querySelector('#results');

		if(result == 'tied'){
			player.setAttribute('class', 'tie');
			resSlate.style.backgroundColor = '#585858';
		}else if(result == 'lost'){
			computerPoints ++;
			player.setAttribute('class', 'lose');
			resSlate.style.backgroundColor = '#7F0000';
		}else{ //won
			playerPoints ++;
			playerOpponent.setAttribute('class', 'lose');
			resSlate.style.backgroundColor = '#004000';
		} 

		resSlate.style.display = 'flex';
	}
};

var rock = new Weapon('rock', ['lizard','scissors']);
rock.init();

var paper = new Weapon('paper', ['rock','spock']);
paper.init();

var scissors = new Weapon('scissors', ['paper','lizard']);
scissors.init();

var lizard = new Weapon('lizard', ['spock','paper']);
lizard.init();

var spock = new Weapon('spock', ['rock','paper']);
spock.init();

//clear results on-click
var res = document.getElementById('results');
res.onclick = function(){
	this.style.display = 'none';
	var player = document.querySelector('#results img:first-of-type');
	player.setAttribute('class', '');
	var playerOpponent = document.querySelector('#results img:nth-of-type(2)');
	playerOpponent.setAttribute('class', '');
	document.querySelector('header>div').style.display = 'block';
	var player = document.querySelector('header h3:first-of-type');
	player.innerText = 'You: ' + playerPoints;
	var computer = document.querySelector('header h3:nth-of-type(2)');
	computer.innerText = 'Computer: ' + computerPoints;
};
