"use strict";

var MiniGameKinkyDungeonCheckpoint = 0;
var MiniGameKinkyDungeonLevel = 1;
var KinkyDungeonMapIndex = [];

var KinkyDungeonLightGrid = ""
var KinkyDungeonUpdateLightGrid = true
var KinkyDungeonGrid = ""
var KinkyDungeonGrid_Last = ""
var KinkyDungeonGridSize = 50
var KinkyDungeonGridWidth = 31
var KinkyDungeonGridHeight = 19

var KinkyDungeonGridSizeDisplay = 72
var KinkyDungeonGridWidthDisplay = 17
var KinkyDungeonGridHeightDisplay = 9

var KinkyDungeonMoveDirection = KinkyDungeonGetDirection(0, 0)

var KinkyDungeonTextMessagePriority = 0
var KinkyDungeonTextMessage = ""
var KinkyDungeonTextMessageTime = 0
var KinkyDungeonTextMessageColor = "white"

var KinkyDungeonActionMessagePriority = 0
var KinkyDungeonActionMessage = ""
var KinkyDungeonActionMessageTime = 0
var KinkyDungeonActionMessageColor = "white"

var KinkyDungeonSpriteSize = 72

var KinkyDungeonCanvas = document.createElement("canvas");
var KinkyDungeonContext = null
var KinkyDungeonCanvasFow = document.createElement("canvas");
var KinkyDungeonContextFow = null
var KinkyDungeonCanvasPlayer = document.createElement("canvas");
var KinkyDungeonContextPlayer = null

var KinkyDungeonEntities = []
var KinkyDungeonTerrain = []
var KinkyDungeonPlayerEntity = null

var KinkyDungeonMapBrightness = 5

var KinkyDungeonMovableTilesEnemy = "0SsRrd" // Objects which can be moved into: floors, debris, open doors, staircases
var KinkyDungeonMovableTilesSmartEnemy = "D" + KinkyDungeonMovableTilesEnemy //Smart enemies can open doors as well
var KinkyDungeonMovableTiles = "C" + KinkyDungeonMovableTilesSmartEnemy // Player can open chests





var KinkyDungeonTargetingSpell = null

function KinkyDungeonSetCheckPoint() {
	MiniGameKinkyDungeonCheckpoint = Math.floor(MiniGameKinkyDungeonLevel / 10)
}

function KinkyDungeonInitialize(Level, Random) {
	CharacterReleaseTotal(KinkyDungeonPlayer)
	KinkyDungeonDressPlayer()
	KinkyDungeonDrawState = "Game"
	
	KinkyDungeonTextMessage = "" 
	KinkyDungeonActionMessage = "" 
	KinkyDungeonDefaultStats()
	MiniGameKinkyDungeonLevel = Level
	KinkyDungeonSetCheckPoint()
	
	for (let I = 1; I < 10; I++)
		KinkyDungeonMapIndex.push(I)

	// Option to shuffle the dungeon types besides the initial one (graveyard)
	if (Random) {
		/* Randomize array in-place using Durstenfeld shuffle algorithm */
		// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		for (var i = KinkyDungeonMapIndex.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = KinkyDungeonMapIndex[i];
			KinkyDungeonMapIndex[i] = KinkyDungeonMapIndex[j];
			KinkyDungeonMapIndex[j] = temp;
		}
	}
	KinkyDungeonMapIndex.unshift(0)
	KinkyDungeonMapIndex.push(10)
	
	
	KinkyDungeonContextPlayer = KinkyDungeonCanvasPlayer.getContext("2d")
	KinkyDungeonCanvasPlayer.width = KinkyDungeonGridSizeDisplay
	KinkyDungeonCanvasPlayer.height = KinkyDungeonGridSizeDisplay;
		
	KinkyDungeonContext = KinkyDungeonCanvas.getContext("2d")
	KinkyDungeonCanvas.height = KinkyDungeonCanvasPlayer.height*KinkyDungeonGridHeightDisplay;

	KinkyDungeonContextFow = KinkyDungeonCanvasFow.getContext("2d")
	KinkyDungeonCanvasFow.width = KinkyDungeonCanvas.width
	KinkyDungeonCanvasFow.height = KinkyDungeonCanvas.height;
	
	
	// Set up the first level
	KinkyDungeonCreateMap(KinkyDungeonMapParams[KinkyDungeonMapIndex[0]], 0)
}
// Starts the the game at a specified level
function KinkyDungeonCreateMap(MapParams, Floor) {
	KinkyDungeonGrid = ""
	
	var height = MapParams.min_height + 2*Math.floor(0.5*Math.random() * (MapParams.max_height - MapParams.min_height))
	var width = MapParams.min_width + 2*Math.floor(0.5*Math.random() * (MapParams.max_width - MapParams.min_width))
	
	KinkyDungeonCanvas.width = KinkyDungeonCanvasPlayer.width*KinkyDungeonGridWidthDisplay;
	KinkyDungeonGridHeight = height
	KinkyDungeonGridWidth = width
	
	// Generate the grid
	for (let X = 0; X < height; X++) {
		for (let Y = 0; Y < width; Y++)
			KinkyDungeonGrid = KinkyDungeonGrid + '1'
		KinkyDungeonGrid = KinkyDungeonGrid + '\n'
	}
	
	// We only rerender the map when the grid changes
	KinkyDungeonGrid_Last = ""
	KinkyDungeonUpdateLightGrid = true
	
	// Setup variables
	
	var rows = KinkyDungeonGrid.split('\n')
	var startpos = 1 + 2*Math.floor(Math.random()*0.5 * (height - 2))
	
	// MAP GENERATION
	
	var VisitedRooms = []
	KinkyDungeonMapSet(1, startpos, '0', VisitedRooms)
	//KinkyDungeonMapSet(rows[0].length-2, endpos, '0')
	
	// Use primm algorithm with modification to spawn random rooms in the maze
	
	var openness = MapParams.openness
	var density = MapParams.density
	var doodadchance = MapParams.doodadchance
	var treasurechance = 0.5 // Chance for an extra chest
	var treasurecount = MapParams.chestcount // Max treasure chest count
	var rubblechance = MapParams.rubblechance // Chance of lootable rubble
	var doorchance = MapParams.doorchance // Max treasure chest count
	KinkyDungeonCreateMaze(VisitedRooms, width, height, openness, density)	
	
	KinkyDungeonGroundItems = [] // Clear items on the ground
	KinkyDungeonBullets = [] // Clear all bullets
	
	KinkyDungeonReplaceDoodads(doodadchance, width, height) // Replace random internal walls with doodads
	KinkyDungeonPlaceStairs(startpos, width, height) // Place the start and end locations
	KinkyDungeonPlaceChests(treasurechance, treasurecount, rubblechance, width, height) // Place treasure chests inside dead ends
	KinkyDungeonPlaceDoors(doorchance, width, height) // Place treasure chests inside dead ends
	
	// Place the player!
	KinkyDungeonPlayerEntity = {Type:"Player", x: 1, y:startpos}
	KinkyDungeonUpdateStats(0)
	
	// Place enemies after player
	KinkyDungeonPlaceEnemies(MapParams.enemytags, Floor, width, height)
	
	// Set map brightness
	KinkyDungeonMapBrightness = MapParams.brightness
	
}

function KinkyDungeonPlaceEnemies(Tags, Floor, width, height) {
	KinkyDungeonEntities = []
	
	var enemyCount = 4 + Math.floor(Floor/10 + width/20 + height/20)
	var count = 0
	var tries = 0
	
	// Create this number of enemies
	while (count < enemyCount && tries < 1000) {
		var X = 1 + Math.floor(Math.random()*(width - 1))
		var Y = 1 + Math.floor(Math.random()*(height - 1))
		var playerDist = 4
		
		if (Math.sqrt((X - KinkyDungeonPlayerEntity.x) * (X - KinkyDungeonPlayerEntity.x) + (Y - KinkyDungeonPlayerEntity.y) * (Y - KinkyDungeonPlayerEntity.y)) > playerDist && KinkyDungeonMovableTilesEnemy.includes(KinkyDungeonMapGet(X, Y))) {
			var tags = []
			if (KinkyDungeonMapGet(X, Y) == 'R' || KinkyDungeonMapGet(X, Y) == 'r') tags.push("rubble")
			if (Floor % 10 >= 5) tags.push("secondhalf")
			if (Floor % 10 >= 8) tags.push("lastthird")
			
			var Enemy = KinkyDungeonGetEnemy(tags, Floor, KinkyDungeonMapIndex[MiniGameKinkyDungeonCheckpoint])
			if (Enemy) {
				KinkyDungeonEntities.push({Enemy: Enemy, x:X, y:Y, hp: Enemy.maxhp, movePoints: 0, attackPoints: 0})
				if (Enemy.tags.includes("minor")) count += 0.2; else count += 1; // Minor enemies count as 1/5th of an enemy
				if (Enemy.tags.includes("elite")) count += 1 // Elite enemies count as 2 normal enemies
				//console.log("Created a " + Enemy.name)
			}
		}
		tries += 1
	}
}

function KinkyDungeonPlaceChests(treasurechance, treasurecount, rubblechance, width, height) {
	var chestlist = []

	// Populate the chests
	for (let X = 1; X < width; X += 1)
		for (let Y = 1; Y < height; Y += 1)
			if (KinkyDungeonMapGet(X, Y) == '0' && Math.random()) {
				// Check the 3x3 area
				var wallcount = 0
				for (let XX = X-1; XX <= X+1; XX += 1)
					for (let YY = Y-1; YY <= Y+1; YY += 1)
						if (!(XX == X && YY == Y) && (KinkyDungeonMapGet(XX, YY) == '1' || KinkyDungeonMapGet(XX, YY) == 'X'))
							wallcount += 1
				if (wallcount == 7) {
					chestlist.push({x:X, y:Y})
				}
			}
	
	// Truncate down to max chest count in a location-neutral way
    var count = 0;
	treasurecount += ((Math.random() < treasurechance) ? 1 : 0)
    while (chestlist.length > 0) {
		if (count < treasurecount) {
			let N = Math.floor(Math.random()*chestlist.length)
			let chest = chestlist[N]
			KinkyDungeonMapSet(chest.x, chest.y, 'C')
			chestlist.splice(N, 1)
			count += 1;
		} else {
			let N = Math.floor(Math.random()*chestlist.length)
			let chest = chestlist[N]
			if (Math.random() < rubblechance) KinkyDungeonMapSet(chest.x, chest.y, 'R')
				else KinkyDungeonMapSet(chest.x, chest.y, 'r')
			chestlist.splice(N, 1)
		}
    }

    //console.log("Created " + count + " chests")
}


function KinkyDungeonPlaceDoors(doorchance, width, height) {
	// Populate the doors
	for (let X = 1; X < width; X += 1)
		for (let Y = 1; Y < height; Y += 1)
			if (KinkyDungeonMapGet(X, Y) == '0' && Math.random() < doorchance) {
				// Check the 3x3 area
				var wallcount = 0
				var up = false
				var down = false
				var left = false
				var right = false
				for (let XX = X-1; XX <= X+1; XX += 1)
					for (let YY = Y-1; YY <= Y+1; YY += 1) {
						var get = KinkyDungeonMapGet(XX, YY)
						if (!(XX == X && YY == Y) && (get == '1' || get == 'X' || get == 'C')) {
							wallcount += 1 // Get number of adjacent walls
							if (XX == X+1 && YY == Y && get == '1') right = true
							else if (XX == X-1 && YY == Y && get == '1') left = true
							else if (XX == X && YY == Y+1 && get == '1') down = true
							else if (XX == X && YY == Y-1 && get == '1') up = true
						} else if (get == 'D') // No adjacent doors
							wallcount = 100
					}
				if (wallcount < 5 && ((up && down) != (left && right))) { // Requirements: 4 doors and either a set in up/down or left/right but not both
					KinkyDungeonMapSet(X, Y, 'D')
				}
			}
}

function KinkyDungeonPlaceStairs(startpos, width, height) {
	// Starting stairs are predetermined and guaranteed to be open
	KinkyDungeonMapSet(1, startpos, 'S')
	

	// Ending stairs are not. 
	var placed = false
	for (let L = 100; L > 0; L -= 1) { // Try up to 100 times
		let X = width - 2
		let Y = 1 + 2*Math.floor(Math.random()*0.5 * (height - 2))
		if (KinkyDungeonMapGet(X, Y) == '0') {
			// Check the 3x3 area
			var wallcount = 0
			for (let XX = X-1; XX <= X+1; XX += 1)
				for (let YY = Y-1; YY <= Y+1; YY += 1)
					if (!(XX == X && YY == Y) && (KinkyDungeonMapGet(XX, YY) == '1' || KinkyDungeonMapGet(XX, YY) == 'X'))
						wallcount += 1
			if (wallcount == 7) {
				placed = true
				KinkyDungeonMapSet(X, Y, 's')
				L = 0
			}
		}
	}
	
	if (!placed) // Loosen the constraints
		for (let L = 100; L > 0; L -= 1) { // Try up to 100 times
			let X = width - 2 - Math.floor(Math.random() * width/4)
			let Y = 1 + Math.floor(Math.random() * (height - 2))
			if (KinkyDungeonMapGet(X, Y) == '0') {
				KinkyDungeonMapSet(X, Y, 's')
				L = 0
			}
		}
	
}


function KinkyDungeonReplaceDoodads(Chance, width, height) {
	for (let X = 1; X < width; X += 1)
		for (let Y = 1; Y < height; Y += 1)
			if (KinkyDungeonMapGet(X, Y) == '1' && Math.random() < Chance) {
				KinkyDungeonMapSet(X, Y, 'X')
			}
				
}

function KinkyDungeonCreateMaze(VisitedRooms, width, height, openness, density) {
	// Variable setup
	
	var Walls = {}
	var WallsList = {}
	var VisitedCells = {}
	
	// Initialize the first cell in our Visited Cells list
	
	VisitedCells[VisitedRooms[0].x + "," + VisitedRooms[0].y] = {x:VisitedRooms[0].x, y:VisitedRooms[0].y}
	
	// Walls are basically even/odd pairs.
	for (let X = 2; X < width; X += 2)
		for (let Y = 1; Y < height; Y += 2)
			if (KinkyDungeonMapGet(X, Y) == '1') {
				Walls[X + "," + Y] = {x:X, y:Y}
			}
	for (let X = 1; X < width; X += 2)
		for (let Y = 2; Y < height; Y += 2)
			if (KinkyDungeonMapGet(X, Y) == '1') {
				Walls[X + "," + Y] = {x:X, y:Y}
			}
		
	// Setup the wallslist for the first room
	KinkyDungeonMazeWalls(VisitedRooms[0], Walls, WallsList)
	
	// Per a randomized primm algorithm from Wikipedia, we loop through the list of walls until there are no more walls
	
	var WallKeys = Object.keys(WallsList)
	var CellKeys = Object.keys(VisitedCells)
			
	while (WallKeys.length > 0) {
		var I = Math.floor(Math.random() * WallKeys.length)
		var wall = Walls[WallKeys[I]]
		var unvisitedCell = null
		
		// Check if wall is horizontal or vertical and determine if there is a single unvisited cell on the other side of the wall
		if (wall.x % 2 == 0) { //horizontal wall
			if (!VisitedCells[(wall.x-1) + "," + wall.y]) unvisitedCell = {x:wall.x-1, y:wall.y}
			if (!VisitedCells[(wall.x+1) + "," + wall.y]) {
				if (unvisitedCell) unvisitedCell = null
				else unvisitedCell = {x:wall.x+1, y:wall.y}
			}
		} else { //vertical wall
			if (!VisitedCells[wall.x + "," + (wall.y-1)]) unvisitedCell = {x:wall.x, y:wall.y-1}
			if (!VisitedCells[wall.x + "," + (wall.y+1)]) {
				if (unvisitedCell) unvisitedCell = null
				else unvisitedCell = {x:wall.x, y:wall.y+1}
			}
		}
		
		// We only add a new cell if only one of the cells is unvisited
		if (unvisitedCell) {
			delete Walls[wall.x + "," + wall.y]

			KinkyDungeonMapSet(wall.x, wall.y, '0')
			KinkyDungeonMapSet(unvisitedCell.x, unvisitedCell.y, '0')
			VisitedCells[unvisitedCell.x + "," + unvisitedCell.y] = unvisitedCell
			
			KinkyDungeonMazeWalls(unvisitedCell, Walls, WallsList)
		}

		// Either way we remove this wall from consideration
		delete WallsList[wall.x + "," + wall.y]
		
		// Chance of spawning a room!
		if (Math.random() < 0.1 - 0.015*density) {
			var size = 1+Math.ceil(Math.random() * (openness))
			
			// We open up the tiles
			for (let XX = wall.x; XX < wall.x +size; XX++)
				for (let YY = wall.y; YY < wall.y+size; YY++) {
					KinkyDungeonMapSet(XX, YY, '0')
					VisitedCells[XX + "," + YY] = {x:XX, y:YY}
					KinkyDungeonMazeWalls({x:XX, y:YY}, Walls, WallsList)
					delete Walls[XX + "," + YY]
				}
				
			// We also remove all walls inside the room from consideration!
			for (let XX = wall.x; XX < wall.x +size; XX++)
				for (let YY = wall.y; YY < wall.y+size; YY++) {
					delete WallsList[XX + "," + YY]
				}
		}
		
		// Update keys
		
		WallKeys = Object.keys(WallsList)
		CellKeys = Object.keys(VisitedCells)
	}

}

function KinkyDungeonMazeWalls(Cell, Walls, WallsList) {
	if (Walls[(Cell.x+1) + "," + Cell.y]) WallsList[(Cell.x+1) + "," + Cell.y] = {x:Cell.x+1, y:Cell.y}
	if (Walls[(Cell.x-1) + "," + Cell.y]) WallsList[(Cell.x-1) + "," + Cell.y] = {x:Cell.x-1, y:Cell.y}
	if (Walls[Cell.x + "," + (Cell.y+1)]) WallsList[Cell.x + "," + (Cell.y+1)] = {x:Cell.x, y:Cell.y+1}
	if (Walls[Cell.x + "," + (Cell.y-1)]) WallsList[Cell.x + "," + (Cell.y-1)] = {x:Cell.x, y:Cell.y-1}
}

function KinkyDungeonMapSet(X, Y, SetTo, VisitedRooms) {
	var height = KinkyDungeonGridHeight
	var width = KinkyDungeonGridWidth
	
	if (X > 0 && X < width-1 && Y > 0 && Y < height-1) {
		KinkyDungeonGrid = KinkyDungeonGrid.replaceAt(X + Y*(width+1), SetTo)
		if (VisitedRooms)
			VisitedRooms.push({x: X, y: Y})
		return true;
	}
	return false;
}

function KinkyDungeonMapGet(X, Y) {
	var height = KinkyDungeonGrid.split('\n').length
	var width = KinkyDungeonGrid.split('\n')[0].length
	
	return KinkyDungeonGrid[X + Y*(width+1)]
}

function KinkyDungeonLightSet(X, Y, SetTo) {
	var height = KinkyDungeonGridHeight
	var width = KinkyDungeonGridWidth
	
	if (X >= 0 && X <= width-1 && Y >= 0 && Y <= height-1) {
		KinkyDungeonLightGrid = KinkyDungeonLightGrid.replaceAt(X + Y*(width+1), SetTo)
		return true;
	}
	return false;
}

function KinkyDungeonLightGet(X, Y) {
	var height = KinkyDungeonLightGrid.split('\n').length
	var width = KinkyDungeonLightGrid.split('\n')[0].length
	
	return KinkyDungeonLightGrid[X + Y*(width+1)]
}

const canvasOffsetX = 500
const canvasOffsetY = 164



// returns an object containing coordinates of which direction the player will move after a click, plus a time multiplier
function KinkyDungeonGetDirection(dx, dy) {
	
	var X = 0;
	var Y = 0;
	
	if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5)
		return {x:0, y:0, delta:1}
	
	// Cardinal directions first - up down left right
	if (dy > 0 && Math.abs(dx) < Math.abs(dy)/2.61312593) Y = 1
	else if (dy < 0 && Math.abs(dx) < Math.abs(dy)/2.61312593) Y = -1
	else if (dx > 0 && Math.abs(dy) < Math.abs(dx)/2.61312593) X = 1
	else if (dx < 0 && Math.abs(dy) < Math.abs(dx)/2.61312593) X = -1
	
	// Diagonals
	else if (dy > 0 && dx > dy/2.61312593) {Y = 1; X = 1}
	else if (dy > 0 && -dx > dy/2.61312593) {Y = 1; X = -1}
	else if (dy < 0 && dx > -dy/2.61312593) {Y = -1; X = 1}
	else if (dy < 0 && -dx > -dy/2.61312593) {Y = -1; X = -1}
	
	return {x:X, y:Y, delta:Math.round(Math.sqrt(X*X+Y*Y)*2)/2} // Delta is always in increments of 0.5
}

// GetDirection, but it also pivots randomly 45 degrees to either side
function KinkyDungeonGetDirectionRandom(dx, dy) {
	var dir = KinkyDungeonGetDirection(dx, dy)
	var pivot = Math.floor(Math.random()*3)-1
	
	if (dir.x == 0 && dir.y == 1) dir.x = pivot
	else if (dir.x == 0 && dir.y == -1) dir.x = -pivot
	else if (dir.x == 1 && dir.y == 0) dir.y = pivot
	else if (dir.x == -1 && dir.y == 0) dir.y = -pivot
	else if (dir.x == 1 && dir.y == 1) {if (pivot == 1) {dir.y = 0} else if (pivot == -1) {dir.x = 0}}
	else if (dir.x == 1 && dir.y == -1) {if (pivot == 1) {dir.x = 0} else if (pivot == -1) {dir.y = 0}}
	else if (dir.x == -1 && dir.y == 1) {if (pivot == 1) {dir.x = 0} else if (pivot == -1) {dir.y = 0}}
	else if (dir.x == -1 && dir.y == -1) {if (pivot == 1) {dir.y = 0} else if (pivot == -1) {dir.x = 0}}
	
	dir.delta = Math.round(Math.sqrt(dir.x*dir.x+dir.y*dir.y)*2)/2
	return dir // Delta is always in increments of 0.5
}


// Click function for the game portion
function KinkyDungeonClickGame(Level) {
	// First we handle buttons
	if (KinkyDungeonHandleHUD()) {
		return;
	}
	// beep
	
	// If no buttons are clicked then we handle move
	else if (KinkyDungeonTargetingSpell) {
		if (MouseIn(canvasOffsetX, canvasOffsetY, KinkyDungeonCanvas.width, KinkyDungeonCanvas.height)) {
			if (KinkyDungeonSpellValid) {
				KinkyDungeonCastSpell(KinkyDungeonTargetX, KinkyDungeonTargetY, KinkyDungeonTargetingSpell)
				KinkyDungeonAdvanceTime(1)
				KinkyDungeonTargetingSpell = null
			}
		} else KinkyDungeonTargetingSpell = null
	} else if (MouseIn(canvasOffsetX, canvasOffsetY, KinkyDungeonCanvas.width, KinkyDungeonCanvas.height)) {
		KinkyDungeonMove(KinkyDungeonMoveDirection)
	}
}

function KinkyDungeonGameKeyDown() {
	var moveDirection = null;
	
	
	// Cardinal moves
	if ((KeyPress == KinkyDungeonKey[0])) moveDirection = KinkyDungeonGetDirection(0, -1);
	else if ((KeyPress == KinkyDungeonKey[1])) moveDirection = KinkyDungeonGetDirection(-1, 0);
	else if ((KeyPress == KinkyDungeonKey[2])) moveDirection = KinkyDungeonGetDirection(0, 1);
	else if ((KeyPress == KinkyDungeonKey[3])) moveDirection = KinkyDungeonGetDirection(1, 0);
	// Diagonal moves
	else if ((KeyPress == KinkyDungeonKey[4])) moveDirection = KinkyDungeonGetDirection(-1, -1);
	else if ((KeyPress == KinkyDungeonKey[5])) moveDirection = KinkyDungeonGetDirection(1, -1);
	else if ((KeyPress == KinkyDungeonKey[6])) moveDirection = KinkyDungeonGetDirection(-1, 1);
	else if ((KeyPress == KinkyDungeonKey[7])) moveDirection = KinkyDungeonGetDirection(1, 1);
	
	
	/*	if ((KeyPress == KinkyDungeonKey[0]) || (KeyPress == KinkyDungeonKeyLower[0]) || (KeyPress == KinkyDungeonKeyNumpad[0])) moveDirection = KinkyDungeonGetDirection(0, -1);
	else if ((KeyPress == KinkyDungeonKey[1]) || (KeyPress == KinkyDungeonKeyLower[1]) || (KeyPress == KinkyDungeonKeyNumpad[1])) moveDirection = KinkyDungeonGetDirection(-1, 0);
	else if ((KeyPress == KinkyDungeonKey[2]) || (KeyPress == KinkyDungeonKeyLower[2]) || (KeyPress == KinkyDungeonKeyNumpad[2])) moveDirection = KinkyDungeonGetDirection(0, 1);
	else if ((KeyPress == KinkyDungeonKey[3]) || (KeyPress == KinkyDungeonKeyLower[3]) || (KeyPress == KinkyDungeonKeyNumpad[3])) moveDirection = KinkyDungeonGetDirection(1, 0);
	// Diagonal moves
	else if ((KeyPress == KinkyDungeonKey[4]) || (KeyPress == KinkyDungeonKeyLower[4]) || (KeyPress == KinkyDungeonKeyNumpad[4])) moveDirection = KinkyDungeonGetDirection(-1, -1);
	else if ((KeyPress == KinkyDungeonKey[5]) || (KeyPress == KinkyDungeonKeyLower[5]) || (KeyPress == KinkyDungeonKeyNumpad[5])) moveDirection = KinkyDungeonGetDirection(1, -1);
	else if ((KeyPress == KinkyDungeonKey[6]) || (KeyPress == KinkyDungeonKeyLower[6]) || (KeyPress == KinkyDungeonKeyNumpad[6])) moveDirection = KinkyDungeonGetDirection(-1, 1);
	else if ((KeyPress == KinkyDungeonKey[7]) || (KeyPress == KinkyDungeonKeyLower[7]) || (KeyPress == KinkyDungeonKeyNumpad[7])) moveDirection = KinkyDungeonGetDirection(1, 1);
	*/
	else if (KinkyDungeonKeyWait.includes(KeyPress)) moveDirection = KinkyDungeonGetDirection(0, 0);
	
	if (moveDirection) {
		KinkyDungeonMove(moveDirection)
	} else if (KinkyDungeonKeySpell.includes(KeyPress)) {
		KinkyDungeonSpellPress = KeyPress
		KinkyDungeonHandleSpell()
	}
	
	
	
	
}

function KinkyDungeonMove(moveDirection) {
	var moveX = moveDirection.x + KinkyDungeonPlayerEntity.x
	var moveY = moveDirection.y + KinkyDungeonPlayerEntity.y
	var Enemy = KinkyDungeonEnemyAt(moveX, moveY)
	if (Enemy && KinkyDungeonStatStamina + KinkyDungeonStaminaRate >= KinkyDungeonStatStaminaCostAttack) {
		KinkyDungeonAttackEnemy(Enemy, {damage: KinkyDungeonPlayerDamage, type: KinkyDungeonPlayerDamageType})
		
		KinkyDungeonStatStamina += KinkyDungeonStatStaminaCostAttack
				
		KinkyDungeonAdvanceTime(1)
	} else {
		var moveObject = KinkyDungeonMapGet(moveX, moveY)
		if (KinkyDungeonMovableTiles.includes(moveObject) && KinkyDungeonNoEnemy(moveX, moveY)) { // If the player can move to an empy space or a door
		
			if (moveObject == 'D') { // Open the door
				KinkyDungeonMapSet(moveX, moveY, 'd')
			} else if (moveObject == 'C') { // Open the chest
				KinkyDungeonLoot(MiniGameKinkyDungeonLevel, KinkyDungeonMapIndex[MiniGameKinkyDungeonCheckpoint], "chest")
				KinkyDungeonMapSet(moveX, moveY, 'c')
			} else {// Move
				if (KinkyDungeonStatStamina > 0) {
					KinkyDungeonMovePoints += moveDirection.delta
					
					if (KinkyDungeonMovePoints >= KinkyDungeonSlowLevel+1) {
						KinkyDungeonPlayerEntity.x = moveX
						KinkyDungeonPlayerEntity.y = moveY
						KinkyDungeonMovePoints = 0
					}
					
					if (KinkyDungeonSlowLevel > 0) {
						if ((moveDirection.x != 0 || moveDirection.y != 0))
							KinkyDungeonStatStamina += (KinkyDungeonStatStaminaRegenPerSlowLevel * KinkyDungeonSlowLevel - KinkyDungeonStatStaminaRegen) * moveDirection.delta
						else if (KinkyDungeonStatStamina < KinkyDungeonStatStaminaMax && 1 > KinkyDungeonTextMessagePriority) {
							KinkyDungeonActionMessageTime = 2
							
							KinkyDungeonActionMessage = TextGet("Wait")
							KinkyDungeonActionMessagePriority = 0
							KinkyDungeonActionMessageColor = "lightgreen"
						}
					}
					
					if (moveObject == 'R') {
						KinkyDungeonLoot(MiniGameKinkyDungeonLevel, MiniGameKinkyDungeonCheckpoint, "rubble")
						
						KinkyDungeonMapSet(moveX, moveY, 'r')
					}
				}
			}
			KinkyDungeonAdvanceTime(moveDirection.delta)
		} else {
			if (KinkyDungeonGetVisionRadius() <= 1) KinkyDungeonAdvanceTime(1)
		}
	}
}


function KinkyDungeonAdvanceTime(delta) {
	// Here we move enemies and such
	KinkyDungeonUpdateLightGrid = true
	if (KinkyDungeonTextMessageTime > 0) KinkyDungeonTextMessageTime -= 1
	if (KinkyDungeonTextMessageTime <= 0) KinkyDungeonTextMessagePriority = 0
	if (KinkyDungeonActionMessageTime > 0) KinkyDungeonActionMessageTime -= 1
	if (KinkyDungeonActionMessageTime <= 0) KinkyDungeonActionMessagePriority = 0
	
	// Updates the character's stats
	KinkyDungeonItemCheck(KinkyDungeonPlayerEntity.x, KinkyDungeonPlayerEntity.y, MiniGameKinkyDungeonLevel)
	KinkyDungeonUpdateBullets(delta)
	KinkyDungeonUpdateEnemies(delta)
	KinkyDungeonUpdateBulletsCollisions(delta)
	KinkyDungeonUpdateStats(delta)
	
	
	if (KinkyDungeonMapGet(KinkyDungeonPlayerEntity.x, KinkyDungeonPlayerEntity.y) == 's') { // Go down the next stairs
		MiniGameKinkyDungeonLevel += 1
		KinkyDungeonSetCheckPoint()
		
		
		KinkyDungeonActionMessagePriority = 10
		KinkyDungeonActionMessageTime = 1
		KinkyDungeonActionMessage = TextGet("ClimbDown")
		KinkyDungeonActionMessageColor = "#ffffff"
		
		if (MiniGameKinkyDungeonCheckpoint >= 1) {
			KinkyDungeonState = "End"
			MiniGameVictory = true
		} else 
			KinkyDungeonCreateMap(KinkyDungeonMapParams[KinkyDungeonMapIndex[MiniGameKinkyDungeonCheckpoint]], MiniGameKinkyDungeonLevel, KinkyDungeonMapIndex[MiniGameKinkyDungeonCheckpoint])
	} else if (KinkyDungeonStatWillpower == 0) {
		KinkyDungeonState = "Lose"
	}
	
	
}

