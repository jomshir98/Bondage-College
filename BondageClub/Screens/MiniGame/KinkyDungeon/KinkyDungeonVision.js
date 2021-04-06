"use strict";
// Lots of good info here: http://www.adammil.net/blog/v125_Roguelike_Vision_Algorithms.html#permissivecode
// For this implementation I decided that ray calculations are too much so I just did a terraria style lighting system
// -Ada

var KinkyDungeonTransparentObjects = KinkyDungeonMovableTiles.replace("D", "") // Light does not pass thru doors

function KinkyDungeonMakeLightMap(width, height, Lights) {
	KinkyDungeonLightGrid = ""
	// Generate the grid
	for (let X = 0; X < KinkyDungeonGridHeight; X++) {
		for (let Y = 0; Y < KinkyDungeonGridWidth; Y++)
			KinkyDungeonLightGrid = KinkyDungeonLightGrid + '0' // 0 = pitch dark
		KinkyDungeonLightGrid = KinkyDungeonLightGrid + '\n'
	}
	
	var maxPass = 0
	
	for (let L = 0; L < Lights.length; L++) {
		maxPass = Math.max(maxPass, Lights[L].brightness)
		KinkyDungeonLightSet(Lights[L].x, Lights[L].y, "" + Lights[L].brightness)
	}
	
	for (let L = maxPass; L > 0; L--) {
		// if a grid square is next to a brighter transparent object, it gets that light minus one, or minus two if diagonal
		
		// Main grid square loop
		for (let X = 0; X < KinkyDungeonGridWidth; X++) {
			for (let Y = 0; Y < KinkyDungeonGridHeight; Y++) {
				var tile = KinkyDungeonMapGet(X, Y)
				if (KinkyDungeonTransparentObjects.includes(tile)) {
					var brightness = KinkyDungeonLightGet(X, Y)
					if (brightness > 0) {
						var nearbywalls = 0
						for (let XX = X-1; XX <= X+1; XX++)
							for (let YY = Y-1; YY <= Y+1; YY++)
								if (!KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(XX, YY))) nearbywalls += 1
						
						if (nearbywalls > 3 && brightness <= 3 && X != KinkyDungeonPlayerEntity.x && Y != KinkyDungeonPlayerEntity.y) brightness -= 1
						
						if (brightness > 0) {
							if (Number(KinkyDungeonLightGet(X-1, Y)) < brightness) KinkyDungeonLightSet(X-1, Y, "" + (brightness - 1))
							if (Number(KinkyDungeonLightGet(X+1, Y)) < brightness) KinkyDungeonLightSet(X+1, Y, "" + (brightness - 1))
							if (Number(KinkyDungeonLightGet(X, Y-1)) < brightness) KinkyDungeonLightSet(X, Y-1, "" + (brightness - 1))
							if (Number(KinkyDungeonLightGet(X, Y+1)) < brightness) KinkyDungeonLightSet(X, Y+1, "" + (brightness - 1))
								
							if (brightness > 1) {
								if (Number(KinkyDungeonLightGet(X-1, Y-1)) < brightness) KinkyDungeonLightSet(X-1, Y-1, "" + (brightness - 1-(Math.random() > 0.4 ? 1 : 0)))
								if (Number(KinkyDungeonLightGet(X-1, Y+1)) < brightness) KinkyDungeonLightSet(X-1, Y+1, "" + (brightness - 1-(Math.random() > 0.4 ? 1 : 0)))
								if (Number(KinkyDungeonLightGet(X+1, Y-1)) < brightness) KinkyDungeonLightSet(X+1, Y-1, "" + (brightness - 1-(Math.random() > 0.4 ? 1 : 0)))
								if (Number(KinkyDungeonLightGet(X+1, Y+1)) < brightness) KinkyDungeonLightSet(X+1, Y+1, "" + (brightness - 1-(Math.random() > 0.4 ? 1 : 0)))
							}
						}
					}
				}
			}
		}
				
				/*var currBrightness = Number(KinkyDungeonLightGet(X, Y))
				var brighestNeighbor = currBrightness
				
				// Light doesn't travel efficiently along walls
				var againstWall = 0
				
				// Check neighbors
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X-1, Y)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X-1, Y))); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X+1, Y)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X+1, Y))); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X, Y-1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X, Y-1))); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X, Y+1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X, Y+1))); else againstWall += 1
				
				
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X-1, Y-1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X-1, Y-1))-(Math.random() > 0.4 ? 1 : 0)); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X+1, Y+1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X+1, Y+1))-(Math.random() > 0.4 ? 1 : 0)); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X+1, Y-1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X+1, Y-1))-(Math.random() > 0.4 ? 1 : 0)); else againstWall += 1
				if (KinkyDungeonTransparentObjects.includes(KinkyDungeonMapGet(X-1, Y+1)))
					brighestNeighbor = Math.max(brighestNeighbor, Number(KinkyDungeonLightGet(X-1, Y+1))-(Math.random() > 0.4 ? 1 : 0)); else againstWall += 1
				
				if (againstWall > 4)
					brighestNeighbor -= 1
				
				if (brighestNeighbor > currBrightness && brighestNeighbor > 1) {
					KinkyDungeonLightSet(X, Y, "" + (brighestNeighbor-1))
				}*/
			
	}
	
}


