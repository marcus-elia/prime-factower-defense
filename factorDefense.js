// ===================================
//
//       Leaderboard Functions
//
// ===================================


    
// ===================================
//
//          Functions for the
//        Canvas and Background
//
// ===================================

// This creates the canvas object, declares global height and width
// variables, and ctx as the canvas' 2d context
function initializeCanvas()
{
	canvas = document.querySelector('canvas');
	canvas.style.display = 'block';
	width = 800;
	height = 400;
	canvas.width = width;
	canvas.height = height + 100; // add an extra 100 displaying score and lives
	ctx = canvas.getContext("2d");
}

function drawBackground()
{
	ctx.globalAlpha = 1;
    ctx.fillStyle = "chartreuse";
    ctx.fillRect(0, 0, width, height);
}

function getHighlightableSquares(road)
{
	let squares = [];
	let borderSquares = road.getBorderSquares();
	for(let i = 0; i < borderSquares.length; i++)
	{
		let borderSquare = borderSquares[i];
		if(!containsTuple(turretSquares, borderSquare))
		{
			squares.push(borderSquare);
		}
	}
	return squares;
}

// Given that the mouse is at (x, y), this highlights the 50x50 square around it
function highlightSquare(x, y)
{
	// refill the previous square with green
	ctx.globalAlpha = 1;
	ctx.fillStyle = "chartreuse";
	ctx.fillRect(highlightedSquare[0], highlightedSquare[1], 50, 50);
	let recX = Math.floor(x/50)*50;
	let recY = Math.floor(y/50)*50;
	if(containsTuple(highlightableSquares, [recX, recY]))
	{
		ctx.clearRect(recX, recY, 50, 50);
		ctx.globalAlpha = .5;
		ctx.fillRect(recX, recY, 50, 50);
		highlightedSquare = [recX, recY];
	}
	if(playButtonHighlighted)
	{
		drawPlayButton(1);
		playButtonHighlighted = false;
	}
	if(!activeWave && x >= 300 && x <= 500 && y >= height && y <= height + 50)
	{
		playButtonHighlighted = true;
		drawPlayButton(.7);
	}
}

function displayMoney(amount)
{
	ctx.globalAlpha = 1;
	ctx.clearRect(0, height, 250, 50);
	ctx.font = "35px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Money: " + amount.toString(), 25, height + 40);
}
function displayLives(amount)
{
	ctx.globalAlpha = 1;
	ctx.clearRect(600, height, 250, 50);
	ctx.font = "35px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Lives: " + amount.toString(), 625, height + 40);
}

function drawPlayButton(alpha)
{
	ctx.clearRect(300, height, 200, 50);
	ctx.globalAlpha = alpha;
	ctx.fillStyle = "red";
	ctx.fillRect(300, height, 200, 50);
	ctx.font = "26px Arial";
	ctx.fillStyle = "blue";
	ctx.fillText("Start Next Wave", 305, height + 35);
}

function displayWaves(amount)
{
	ctx.globalAlpha = 1;
	ctx.clearRect(25, height + 50, 350, 50);
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Waves Completed: " + amount.toString(), 25, height + 85);
}

function displayScore(amount)
{
	ctx.globalAlpha = 1;
	ctx.clearRect(625, height + 50, 200, 50);
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + amount.toString(), 625, height + 85);
}

// =======================================
//
//        Assorted Helper Functions
//
// =======================================
//Returns the number of decimal digits that n has,
//assuming n is positive
function numDigits(n)
{
	if(n == 0)
	{
		return 1;
	}
	else if(n > 0)
	{
	    return Math.floor(Math.log(n)/Math.LN10) + 1;
	}
	else
	{
		return Math.floor(Math.log(Math.abs(n))/Math.LN10) + 2;
	}
}

// Given a number of digits a number has (including the - sign), this returns the
// fontsize we should use to make it fit in an r = 20 circle
function numDigitsToFontSize(numDigits)
{
	if(numDigits == 1)
	{
		return 30;
	}
	if(numDigits == 2)
	{
		return 25;
	}
	if(numDigits == 3)
	{
		return 20;
	}
	if(numDigits == 4)
	{
		return 15;
	}
	if(numDigits == 5)
	{
		return 13;
	}
}
function numDigitsToXLoc(numDigits)
{
	if(numDigits == 1)
	{
		return 2.5;
	}
	if(numDigits == 2)
	{
		return 2.8;
	}
	if(numDigits == 3)
	{
		return 3.5;
	}
	if(numDigits == 4)
	{
		return 4.5;
	}
	if(numDigits == 5)
	{
		return 5.7;
	}
}
function numDigitsToYLoc(numDigits)
{
	if(numDigits == 1)
	{
		return 1.8;
	}
	if(numDigits == 2)
	{
		return 2.3;
	}
	if(numDigits == 3)
	{
		return 3;
	}
	if(numDigits == 4)
	{
		return 3.8;
	}
	if(numDigits == 5)
	{
		return 5;
	}
}

// Assuming array contains 2-tuples, this checks if array contains tuple
function containsTuple(array, tuple)
{
	for(let i = 0; i < array.length; i++)
	{
		if(array[i][0] == tuple[0] && array[i][1] == tuple[1])
		{
			return true;
		}
	}
	return false;
}

function isPrime(n)
{
	if(n == 1)
	{
		return false;
	}
	else if (n < 4)
	{
		return true;
	}
	for(let i = 2; i < Math.floor(Math.sqrt(n)) + 1; i++)
	{
		if(n % i == 0)
		{
			return false;
		}
	}
	return true;
}

function nextPrime(n)
{
	let x = n + 1;
	while(!isPrime(x))
	{
		x++;
	}
	return x;
}
function prevPrime(n)
{
	let x = n - 1;
	while(!isPrime(x))
	{
		x--;
	}
	return x;
}

// ===================================
//
//          The Bloon Object
//
// ===================================

function Bloon(road, bloons, value)
{
	this.value = value;
	this.radius = 20;
	this.speed = 1;
	this.road = road;
	this.bloons = bloons;
	this.x = this.road.getCenterPoint(0)[0];
	this.y = this.road.getCenterPoint(0)[1];
	this.targetPointIndex = 1;   // Keeps track of which point in the road this bloon is
                                 // currently aiming for
	this.targetX = this.road.getCenterPoint(this.targetPointIndex)[0];
	this.targetY = this.road.getCenterPoint(this.targetPointIndex)[1];
	
	// If the bloon has reached a target point, update the target to the next point
	this.nextTarget = function()
	{
		this.targetPointIndex++;
		if(this.targetPointIndex == this.road.getNumSquares())
		{
			lives -= Math.abs(this.value);
			this.remove();
			return;
		}
		this.targetX = this.road.getCenterPoint(this.targetPointIndex)[0];
		this.targetY = this.road.getCenterPoint(this.targetPointIndex)[1];
		
	}
	
	// Move along the road
	this.update = function()
	{
		// if it needs to go down
		if(this.targetY > this.y)
		{
			if(this.targetY - this.y <= this.speed)
			{
				this.y = this.targetY;
				this.nextTarget();
			}
			else
			{
				this.y += this.speed;
			}
		}
		// if it needs to go up
		if(this.targetY < this.y)
		{
			if(this.y - this.targetY <= this.speed)
			{
				this.y = this.targetY;
				this.nextTarget();
			}
			else
			{
				this.y -= this.speed;
			}
		}
		// if it needs to go right
		if(this.targetX > this.x)
		{
			if(this.targetX - this.x <= this.speed)
			{
				this.x = this.targetX;
				this.nextTarget();
			}
			else
			{
				this.x += this.speed;
			}
		}
		// if it needs to go left
		if(this.targetX < this.x)
		{
			if(this.x - this.targetX <= this.speed)
			{
				this.x = this.targetX;
				this.nextTarget();
			}
			else
			{
				this.x -= this.speed;
			}
		}
	}
	
	
	this.draw = function()
	{
		// Make the circle
		ctx.globalAlpha = .65;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = "black";
		ctx.fill();
		
		// Put the number in the circle
	    let numLength = numDigits(this.value);
	    ctx.fillStyle = 'white';
	    if(numLength > 5)  // if the number is too long, just show a question mark
	    {
	    	ctx.font = "30px Arial";
	        ctx.fillText("?", this.x - this.radius/numDigitsToXLoc(1), 
	        		this.y + this.radius/numDigitsToYLoc(1));
	    }
	    else
	    {	
	        ctx.font = numDigitsToFontSize(numLength).toString() + "px Arial";
            ctx.fillText(this.value.toString(), this.x - numLength*this.radius/numDigitsToXLoc(numLength), 
        		         this.y + this.radius/numDigitsToYLoc(numLength));
	    }
	}	
	
    // Returns the coordinates of the upper left corner of the square this is in
	this.getCurrentSquare = function()
	{
		return [50*Math.floor(this.x/50), 50*Math.floor(this.y/50)];
	}
	this.getValue = function()
	{
		return this.value;
	}
	
	this.shot = function(prime)
	{
		if(prime == -1)
		{
			if(this.value < 0)
			{
				score++;
				this.value = -this.value;
			}
		}
		else if(this.value % prime == 0)
		{
			score++;
			this.value = this.value / prime;
		}
		if(this.value == 1)
		{
			money++;  // get 1 money for killing a bloon
			this.remove();
		}
	}
	
	// removes itself from the list bloons
	this.remove = function()
	{
		for(let i = 0; i < this.bloons.length; i++)
		{
			if(this.bloons[i] == this)
			{
				this.bloons.splice(i, 1);
				return;
			}
		}
	}
}



//===================================
//
//            The Road
//
// ===================================
function Road(xCoords, yCoords)
{
	this.xCoords = xCoords;
	this.yCoords = yCoords;
	this.numSquares = xCoords.length;
	this.color = "blue";
	this.squareSize = 50;
	
	this.fill = function()
	{
		ctx.fillStyle = this.color;
		ctx.globalAlpha = 1;
		for(let i = 0; i < this.numSquares; i++)
		{
			let x = this.xCoords[i], y = this.yCoords[i];
			ctx.fillRect(x, y, this.squareSize, this.squareSize);
		}
	}
	
	// Returns the center point of the indexth square in the road
	this.getCenterPoint = function(index)
	{
		return [this.xCoords[index] + this.squareSize/2, this.yCoords[index]  + this.squareSize/2];
	}
	this.getNumSquares = function()
	{
		return this.numSquares;
	}
	// returns a list of (x,y) pairs for the top left corners of the squares
	this.getCoordinates = function()
	{
        let coordinates = [];
        for(let i = 0; i < this.numSquares; i++)
        {
        	coordinates.push([this.xCoords[i], this.yCoords[i]]);
        }
        return coordinates;
	}
	this.getBorderSquares = function()
	{
		let borderSquares = [];
		let roadCoordinates = this.getCoordinates();
        for(let i = 0; i < roadCoordinates.length; i++)
		{
			// check up, down, left and right for open space
			let x = roadCoordinates[i][0], y = roadCoordinates[i][1];
			if(!containsTuple(roadCoordinates, [x - 50, y]))
			{
				borderSquares.push([x - 50, y]);
			}
			if(!containsTuple(roadCoordinates, [x + 50, y]))
			{
				borderSquares.push([x + 50, y]);
			}
			if(!containsTuple(roadCoordinates, [x, y - 50]))
			{
				borderSquares.push([x, y - 50]);
			}
			if(!containsTuple(roadCoordinates, [x, y + 50]))
			{
				borderSquares.push([x, y + 50]);
			}
		}
		return borderSquares;
	}
	
	// Given a square, this returns any neighboring squares on the road
	this.returnNeighboringRoadSquares = function(x, y)
	{
		let neighboringRoadSquares = [];
		let roadCoordinates = this.getCoordinates();
     	if(containsTuple(roadCoordinates, [x + 50, y]))
		{
			neighboringRoadSquares.push([x + 50, y]);
		}
		if(containsTuple(roadCoordinates, [x - 50, y]))
		{
			neighboringRoadSquares.push([x - 50, y]);
		}
		if(containsTuple(roadCoordinates, [x, y + 50]))
		{
			neighboringRoadSquares.push([x, y + 50]);
		}
		if(containsTuple(roadCoordinates, [x, y - 50]))
		{
			neighboringRoadSquares.push([x, y - 50]);
		}
		return neighboringRoadSquares;
	}
	
	// Returns a list of all bloons in the given square
	this.getBloonsInSquare = function(bloons, square)
	{
		let bloonsInSquare = [];
		for(let i = 0; i < bloons.length; i++)
		{
			if(bloons[i].getCurrentSquare()[0] == square[0] && bloons[i].getCurrentSquare()[1] == square[1])
			{
				bloonsInSquare.push(bloons[i]);
			}
		}
		return bloonsInSquare;
	}
	
	
}

// =============================================
//
//             The Turret Object
//
// =============================================

function Turret(coords, value, road, bloons)
{
	this.coords = coords;
	this.value = value;
	this.x = this.coords[0];
	this.y = this.coords[1];
	this.timeSinceLastShot = 0;
	this.road = road;
	this.bloons = bloons;
	this.neighboringRoadSquares = this.road.returnNeighboringRoadSquares(this.x, this.y);
	this.targetBloons = [];
	
	// Update the time for when this can shoot again
	this.update = function()
	{
		this.timeSinceLastShot++;
		this.targetBloons = this.getTargets();
		if(this.timeSinceLastShot > 60 && this.targetBloons.length > 0)
		{
			this.timeSinceLastShot = 0;
			this.shoot();
		}
	}
	
	// for debugging, clear the road squares this turret touches
	this.showSquares = function()
	{
		for(let i = 0; i < this.neighboringRoadSquares.length; i++)
		{
			let x = this.neighboringRoadSquares[i][0];
			let y = this.neighboringRoadSquares[i][1];
			ctx.clearRect(x , y, 50, 50);
		}
	}
	
	this.draw = function()
	{
		// Fill the square
		ctx.globalAlpha = 1;
		ctx.fillStyle = "mediumorchid";
		ctx.fillRect(this.x, this.y, 50, 50);
		
		if(numDigits(this.value) == 1)
		{
		    ctx.font = "30px Arial";
		    ctx.fillStyle = "white";
		    ctx.fillText(this.value, this.x + 17, this.y + 35);
		}
		else if(numDigits(this.value) == 2)
		{
			ctx.font = "27px Arial";
		    ctx.fillStyle = "white";
		    ctx.fillText(this.value, this.x + 10, this.y + 38);
		}
	}
	
	this.getTargets = function()
	{
		let targets = [];
		for(let i = 0; i < this.neighboringRoadSquares.length; i++)
		{
			let targetBloons = this.road.getBloonsInSquare(this.bloons, this.neighboringRoadSquares[i]);
			for(let j = 0; j < targetBloons.length; j++)
			{
				targets.push(targetBloons[j]);
			}
		}
		return targets;
	}
		
	this.shoot = function()
	{
		for(let i = 0; i < this.targetBloons.length; i++)
		{
			this.targetBloons[i].shot(this.value);
		}
	}
	
	this.getCoords = function()
	{
		return this.coords;
	}
	this.getValue = function()
	{
		return this.value;
	}
	// For moving this turret's value around between primes
	this.increment = function()
	{
		if(this.value == -1)
		{
			this.value = 2;
			this.draw();
			return;
		}
		if(this.value == 97)
		{
			this.value = -1;
			this.draw();
			return;
		}
		this.value = nextPrime(this.value);
		this.draw();
	}
	this.decrement = function()
	{
		if(this.value == 2)
		{
			this.value = -1;
			this.draw();
			return;
		}
		if(this.value == -1)
		{
			this.value = 97;
			this.draw();
			return;
		}
		this.value = prevPrime(this.value);
	}
}

function addTurret(coords, value, road, bloons)
{
	let t = new Turret(coords, value, road, bloons);
    turrets.push(t);
    t.draw();
    turretSquares.push(coords);
}

//===================================
//
//           The Waves
//
// ===================================

// So, waveList contains tuples [launch time, value] specifying
// which bloons to launch when. It must be sorted by time in
// increasing order
function Wave(waveList, road, bloons)
{
	this.waveList = waveList;
	this.road = road;
	this.bloons = bloons;
	this.timeElapsed = 0;
	this.bloonsToSend = this.waveList.length;
	this.indexToSend = 0;
	
	this.update = function()
	{   
		while(this.waveList[this.indexToSend][0] == this.timeElapsed)
		{
			this.bloons.push(new Bloon(this.road, this.bloons, this.waveList[this.indexToSend][1]));
			this.indexToSend++;
			this.bloonsToSend--;
			if(this.bloonsToSend == 0)
			{
				
				wavesCompleted++;
				waveHasMore = false;
				break;
			}
		}
		this.timeElapsed++;
		
	}
}








// ===================================
//
//          User Input
//
// ===================================

//onmousemove = function(e){highlightSquare(e.clientX, e.clientY);}
onmousemove = function(e){highlightSquare(e.offsetX, e.offsetY);}

window.onmouseup = function()
{
    let x = 50*Math.floor(event.offsetX/50), y = 50*Math.floor(event.offsetY/50);
        
    // if you clicked on an available square, try to buy a new turret
    if(containsTuple(highlightableSquares, [x, y]))
    {
    	if(money >= 10)
    	{
    		money -= 10;
	        addTurret([x, y], 2, r, blns);
	    	// update the list of squares we can highlight
	        highlightedSquare = [0, 0];
	    	highlightableSquares = getHighlightableSquares(r);
    	}
    }
    
    // if you clicked on a turret, try to upgrade it
    else if(containsTuple(turretSquares, [x, y]))
    {
    	if(money >= 5)
    	{
	    	for(let i = 0; i < turrets.length; i++)
	    	{
	    		if(turrets[i].getCoords()[0] == x && turrets[i].getCoords()[1] == y)
	    		{
	    			turrets[i].increment();
	    			money -= 5;
	    			return;
	    		}
	    	}
	    }
    }
    // If you clicked the play button
    else if(x >= 300 && x <= 500 && y >= height && y <= height + 50)
    {
    	playButtonHighlighted = false;
    	activeWave = true;
    	currentWave = new Wave(waves[waveIndex], r, blns);
    	waveHasMore = true;
    	waveIndex++;
    }
}


function animate()
{
	if(frameNumber < frameLimit)
	{
		requestAnimationFrame(animate);
	}
	// Redraw the road since the bloons are moving on it
	r.fill();
	
	// If a wave is in progress, check when to launch the next bloon
	if(activeWave)
	{
		if(blns.length == 0 && !waveHasMore)
		{
			activeWave = false;
			displayWaves(wavesCompleted);
			drawPlayButton(1);
		}
		else if(waveHasMore)
		{
			currentWave.update();
		}
	}
	
	// update and draw all bloons (in reverse order so the leading bloons is visible)
	for(let i = blns.length - 1; i >= 0; i--)
	{
		blns[i].update();
		blns[i].draw();
	}
	
	// Have the turrets shoot
	for(let i = 0; i < turrets.length; i++)
	{
		turrets[i].update();
	}
	
	// redraw the money and lives
	displayMoney(money);
	displayLives(lives);
	displayScore(score);
	
	if(activeWave)
	{
	    drawPlayButton(.5);
	}
	frameNumber++;
	
	if(lives <= 0  || waveIndex == waves.length + 1)
	{
		endGame();
	}
}



// This is the function that calls everything and plays the game
function playGame()
{
	document.getElementById("title").style.display = "none";
	initializeCanvas();
	drawBackground();
	
	// the x and y coordinates of the path for this game
	let roadX = [100, 100, 100, 100, 100, 150, 200, 250, 250, 250, 300, 350, 350, 350, 400, 450, 450, 450, 500,
		550, 600, 650, 650, 650, 650, 700, 700, 700, 650, 600, 600, 550, 500, 450, 450, 400, 350, 300, 250, 200,
		150, 100, 50, 50, 50, 0, -50];
	let roadY = [-50, 0, 50, 100, 150, 150, 150, 150, 100, 50, 50, 50, 100, 150, 150, 150, 100, 50, 50,
		 50,  50,  50, 100, 150, 200, 200, 250, 300, 300, 300, 250, 250, 250, 250, 300, 300, 300, 300, 300, 300,
		300, 300, 300, 250, 200, 200, 200];
	// the road itself
	r = new Road(roadX, roadY);
	
	// the list of bloons
	blns = [];
	
	// a list of the turrets
	turrets = [];
	// the current locations of turrets
	turretSquares = [];
   
	// a list of squares that we can highlight at the moment (and put a turret on)
	highlightableSquares = getHighlightableSquares(r);
	// the square the mouse is on
	highlightedSquare = [0, 0];
	
	// is the play button highlighted?
	playButtonHighlighted = false;
	drawPlayButton(1);
	
	// money
	money = 200;
	
	// lives
	lives = 500;
	
	// score
	score = 0;
	
	// is there a wave?
	activeWave = false;
	// does the wave have more bloons to send?
	waveHasMore = false;
	
	// the waves themselves
	// Note to wavemaker: the threshold is 11. If you send two bloons 11 frames apart or less, a single 
	// turret will not reload fast enough to shoot both of them in the same square
	waves = [];
	waveIndex = 0;
	waves.push([[5,2], [55,2], [105,2], [125,3], [175,2], [185,3], [275,3], [285,3], [300,2], [310,2], [320,2]]);
	waves.push([[20,2], [30,2], [40,2], [50,3], [55,2], [60,2], [100,3], [150,3], [200,3], [250,3], [300,3],
		        [320, 4], [350,2], [360,2], [450,9], [470,3], [490,9], [510,3], [600,6]]);
	waves.push([[10, 4], [15,3], [20,4], [25,3], [30,4], [35,2], [65,2], [95,2], [125,2], [165,4], [205,4], [245,4],
		        [295,12], [400,9], [450, 9], [500,9], [550,9], [600,9], [650,9], [670,12], [800,8]]);
	waves.push([[50,5], [150,18], [190,2], [195,3], [215,6], [230,6], [245,6], [280,8], [400,16], [440,18], 
		       [460,15], [490,3], [510,3], [530,9], [550,27], [570,5], [650,8], [660,8], [680,8], [700,8],
		       [720,8], [740,8], [800,20], [830,60], [860,30], [875,18], [905,18], [920,24], [935,24]]);
	waves.push([[10, 720], [60,720], [110,720], [160,720], [200,720], [240,720], [280,720]]);
	waves.push([[1,5], [3,5], [5,5], [7,5], [9,5], [11,5], [13,5], [15,5], [17,5], [20,5]]);
	waves.push([[10,800],[15,625], [25,600], [45,243], [50,70], [52,32], [100,500], [130, 400], [160,300],
		        [190,200], [220,100], [300,7]]);
	waves.push([[10,8],[30,8],[50,8],[70,8],[90,8],[110,8],[130,8],[150,8],[170,8],[190,8],[210,8],[230,8],
		        [250,8],[270,8],[290,8],[310,8],[330,8],[350,8], [500,64], [600,27], [620,27], [640,27],
		        [660,27],[680,27], [700,27], [720,27], [740,27], [760,27], [780,27], [800,27], [850,243],
		        [950,125],[970,125],[990,125],[1010,125],[1030,125],[1100,216],[1150,216],[1200,216],
		        [1270,128],[1300,128],[1330,128],[1360,128],[1390,128],[1500,21], [1550,64], [1570,64],
		        [1590,64],[1610,64],[1630,64],[1650,64],[1670,64],[1690,64]]);
	waves.push([[10,22], [80,39],[300,800],[340,729],[380,16],[400,16],[420,16],[440,16],[490,70],[510,720],
		        [540,33],[560,125],[580,49],[600,120],[630,120],[660,120],[690,120],[720,120],[750,120],
	            [800,132],[820,121],[840,110],[860,99],[880,88],[900,77],[920,66],[940,55],[960,44],[980,33],
	            [1000,22],[1050,11]]);
	waves.push([[10,5040], [50,5040], [90,5040], [130,5040], [170,5040], [210,5040], [250,5040], [300,225],
		        [310,8],[320,8],[330,8],[340,8],[350,8],[360,8],[370,8],[380,8],[390,8],[400,8],[410,8],
		        [420,8],[430,8],[440,8],[450,8],[500,324], [540,330], [560,512], [650,220], [680,225],
		        [710,216],[740,220],[770,225],[800,216],[830,220],[860,225],[1000,999],[1020,999],[1040,999],
		        [1060,999],[1080,999],[1100,999],[1120,999],[1140,999],[1160,999],[1180,999],[1200,999]]);
	waves.push([[0,4096], [100, 4096], [200,4096], [300,4096], [500,17], [530,34], [560,38], [600,2],[610,3],
		       [620,2], [630,3], [640,4], [650,9], [660,4], [670,9], [680,8], [690,27]]);
	waves.push([[1,361], [10,2], [21,361], [30,2], [41,361], [50,2], [61,361], [70,2]]);
	let moneyWave = [];
	for(let i = 10; i < 2000; i += 10)
	{
		moneyWave.push([i,8]);
	}
	waves.push(moneyWave);
	waves.push([[10,2], [30,3], [50,4], [70,5], [90,6], [110,7], [130,8],[150,9],[170,10],[190,11],[210,12],
			[230,13],[250,14], [270,15], [290,16], [310,17],[330,18],[350,19],[370,20],[390,21],[410,22],
			[430,23], [450,24], [470,25], [490,26], [510,27], [530,28], [550,29]]);
	waves.push([[10,1024], [40,2048], [70,4096], [100,256], [160,65536], [200,729], [250,729], [300,729],
		        [350,2], [400,38], [420,34], [440,5040], [460,65536], [480,2187], [500,625], [520,625],
		        [540,625], [560, 4096], [580,31], [600,50], [700,77], [740,77], [780,77], [820,77], [860,77],
		        [900,77], [1000, 65536], [1050,384], [1100, 46], [1200,82], [1220,51]]);
	waves.push([[0,361], [100,216], [140,216], [180,216], [220,216], [250,216], [280,216], [300,216], [310,216],
		        [350,41], [370,39], [400,196], [410,243], [420,243], [430,243], [460,40320], [500,1024],
		        [550,37], [590,37], [630,37], [700,22], [750,77], [800,125],[805,125],[810,125],[815,125],
		        [820,125], [825,125], [1000,51], [1040,53], [1080,51], [1120,53], [1160,51], [1200,53]]);
	waves.push([[30, -5], [300, 24], [320,27], [340,30], [360,39], [380, 82], [400, 65536], [420,7], [440,9],
			   [460,10], [480,625], [600,1024], [640,1024], [680,1024], [700, 40320], [750, 40320], [800, 37],
			   [820,6561], [850,6561], [880,6561], [910,6561], [940,6561], [970,121], [980,144], [1000,2],
			   [1100,3], [1110,2], [1120,3], [1130,4], [1150,5], [1200, 53], [1250,55], [1290,89]]);
	waves.push([[10,5], [15,15], [30,20], [40,100], [50,121], [100,999], [120,999], [140,999], [160,999],
		        [180,999], [210,256], [220,256], [230,256], [300,243], [350,343], [360,243], [365,343], [400,4096],
		        [440, 65536], [480,33], [500,41], [520,43], [540,41], [600,-66], [620,66], [640,-99], [660,25],
		        [680,350], [750,106], [800,106], [850,106], [900,106], [950,106], [1000,-400]]);
	moneyWave = [];
	for(let i = 10; i < 2000; i += 20)
	{
		moneyWave.push([i,11]);
	}
	waves.push(moneyWave);
	let lastWave = [];
	for(let i = 1; i < 100; i++)
	{
		lastWave.push([10*i, i]);
	}
	waves.push(lastWave);
	
	currentWave = 0;  // null
	
	// how many waves you have survived
	wavesCompleted = 0;
	displayWaves(wavesCompleted);
	
    frameNumber = 0;
    frameLimit = 1000000;
    animate();
}

function endGame()
{
    frameNumber = frameLimit;
    canvas.style.display = "none";
    document.getElementById("conclusion").style.display = "block";
    document.getElementById("score").innerHTML = score;
}
function playAgain()
{
	document.getElementById("conclusion").style.display = "none";
	document.getElementById("title").style.display = "block";
}