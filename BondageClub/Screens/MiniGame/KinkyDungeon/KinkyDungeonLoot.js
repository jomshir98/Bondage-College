"use strict";
var KinkyDungeonLootTable = {
	"rubble": [
		{name: "nothing", minLevel: 0, weight:2, message:"LootRubbleFail", messageColor:"#aaaaaa", messageTime: 2, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
		{name: "smallgold", minLevel: 0, weight:10, message:"LootRubbleSmallGold", messageColor:"yellow", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
		{name: "knife", minLevel: 0, weight:3, message:"LootRubbleKnife", messageColor:"lightgreen", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
	],
	"chest": [
		{name: "gold", minLevel: 0, weight:4, message:"LootChestGold", messageColor:"yellow", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]},
		{name: "spell_illusion_low", minLevel: 0, weight:1, message:"LootChestSpell", messageColor:"lightblue", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], prerequisites: ["UnlearnedIllusion", "lowlevel"]}, // lowlevel is spell levels 1-7
		{name: "spell_conjuration_low", minLevel: 0, weight:1, message:"LootChestSpell", messageColor:"lightblue", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], prerequisites: ["UnlearnedConjure", "lowlevel"]}, // lowlevel is spell levels 1-7
		{name: "spell_elemental_low", minLevel: 0, weight:1, message:"LootChestSpell", messageColor:"lightblue", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], prerequisites: ["UnlearnedElements", "lowlevel"]}, // lowlevel is spell levels 1-7
		{name: "trap_armbinder", minLevel: 1, weight:1, message:"LootChestTrapMagic", messageColor:"red", messageTime: 3, floors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], prerequisites: ["Group_ItemArms"], power: 8},
	],
	
	
}

function KinkyDungeonLoot(Level, Index, Type) {
	var lootWeightTotal = 0
	var lootWeights = []
	
	var lootType = KinkyDungeonLootTable[Type]
	for (let L = 0; L < lootType.length; L++) {
		var loot = lootType[L]
		if (Level >= loot.minLevel && loot.floors.includes(Index)) {
			var prereqs = true
			
			if (loot.prerequisites) {
				
				var maxlevel = 999
				var minlevel = 0
				var SpellList = null
				if (loot.prerequisites.includes("lowlevel")) maxlevel = 7
				if (loot.prerequisites.includes("UnlearnedElements")) SpellList = KinkyDungeonSpellList["Elements"]
				if (loot.prerequisites.includes("UnlearnedConjure")) SpellList = KinkyDungeonSpellList["Conjure"]
				if (loot.prerequisites.includes("UnlearnedIllusion")) SpellList = KinkyDungeonSpellList["Illusion"]
				
				for (let P = 0; P < loot.prerequisites.length; P++) {
					if (loot.prerequisites[P].startsWith("Group_")) {
						var group = loot.prerequisites[P].substring(6)
						var item = KinkyDungeonGetRestraintItem(group)
						if (item && item.power > loot.power) {
							prereqs = false
							break;
						}
					}
				}



				if (SpellList != null && KinkyDungeonGetUnlearnedSpells(minlevel, maxlevel, SpellList).length == 0) {
					prereqs = false
				}
			}
			
			if (prereqs) {
				lootWeights.push({loot: loot, weight: lootWeightTotal})
				lootWeightTotal += loot.weight
			}
		}
	}
	
	var selection = Math.random() * lootWeightTotal
	
	for (let L = lootWeights.length - 1; L >= 0; L--) {
		if (selection > lootWeights[L].weight) {
			var replace = false
			
			if (6 > KinkyDungeonActionMessagePriority) {
				KinkyDungeonActionMessageTime = lootWeights[L].loot.messageTime
				KinkyDungeonActionMessage = TextGet(lootWeights[L].loot.message)
				KinkyDungeonActionMessageColor = lootWeights[L].loot.messageColor
				KinkyDungeonActionMessagePriority = 6
				replace = true
			}

			KinkyDungeonLootEvent(lootWeights[L].loot, Index, replace)
			
			break;
		}
	}
	
}

function KinkyDungeonGetUnlearnedSpells(minlevel, maxlevel, SpellList) {
	var SpellsUnlearned = []
	
	for (let S = 0; S < SpellList.length; S++) {
		if (SpellList[S].level >= minlevel && SpellList[S].level <= maxlevel) {
			SpellsUnlearned.push(SpellList[S])
		}
	}
	for (let SS = 0; SS < KinkyDungeonSpells.length; SS++) {
		for (let S = 0; S < SpellsUnlearned.length; S++) {
			if (KinkyDungeonSpells[SS].name == SpellsUnlearned[S].name) {
				SpellsUnlearned.splice(S, 1)
			}
		}
	}
	
	return SpellsUnlearned
}

function KinkyDungeonLootEvent(Loot, Index, Replacemsg) {
	// 
	if (Loot.name == "spell_illusion_low") {
		let SpellsUnlearned = KinkyDungeonGetUnlearnedSpells(0, 7, KinkyDungeonSpellList.Illusion)
		let spellIndex = Math.floor(Math.random()*SpellsUnlearned.length)
		
		let spell = SpellsUnlearned[spellIndex]		
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("SpellLearned", TextGet("KinkyDungeonSpell" + spell.name))
		KinkyDungeonSpells.push(spell)
	} else if (Loot.name == "spell_conjuration_low") {
		let SpellsUnlearned = KinkyDungeonGetUnlearnedSpells(0, 7, KinkyDungeonSpellList.Conjure)
		let spellIndex = Math.floor(Math.random()*SpellsUnlearned.length)
		
		let spell = SpellsUnlearned[spellIndex]		
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("SpellLearned", TextGet("KinkyDungeonSpell" + spell.name))
		KinkyDungeonSpells.push(spell)
	} else if (Loot.name == "spell_elemental_low") {
		let SpellsUnlearned = KinkyDungeonGetUnlearnedSpells(0, 7, KinkyDungeonSpellList.Elements)
		let spellIndex = Math.floor(Math.random()*SpellsUnlearned.length)
		
		let spell = SpellsUnlearned[spellIndex]		
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("SpellLearned", TextGet("KinkyDungeonSpell" + spell.name))
		KinkyDungeonSpells.push(spell)
	} else if (Loot.name == "gold") {
		let value = Math.ceil((25 + 25 * Math.random()) * (1 + Index/2))
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("XXX", value)
		KinkyDungeonAddGold(value)
	} else if (Loot.name == "smallgold") {
		let value = Math.ceil((1 + 4 * Math.random()) * (1 + Index))
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("XXX", value)
		KinkyDungeonAddGold(value)
	} else if (Loot.name == "knife") {
		KinkyDungeonNormalBlades += 1
	} else if (Loot.name == "trap_armbinder") {
		KinkyDungeonAddRestraint(KinkyDungeonGetRestraintByName("TrapArmbinder"))
		if (Replacemsg)
			KinkyDungeonActionMessage = KinkyDungeonActionMessage.replace("RestraintType", TextGet("RestraintTrapArmbinder"))
	}
}


function KinkyDungeonAddGold(value) {
	KinkyDungeonGold += value
	if (ArcadeDeviousChallenge && KinkyDungeonDeviousDungeonAvailable()) CharacterChangeMoney(Player, Math.round(value/10))
}