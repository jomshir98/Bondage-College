var C010_Revenge_SidneyJennifer_CurrentStage = 0;
var C010_Revenge_SidneyJennifer_SidneyVictim = true;
var C010_Revenge_SidneyJennifer_CurrentActor = "Sidney";
var C010_Revenge_SidneyJennifer_IntroText = "";
var C010_Revenge_SidneyJennifer_ItemStolen = false;
var C010_Revenge_SidneyJennifer_AllowFight = true;
var C010_Revenge_SidneyJennifer_CanBribe = false;
var C010_Revenge_SidneyJennifer_CuteDone = false;
var C010_Revenge_SidneyJennifer_SidneyGone = false;
var C010_Revenge_SidneyJennifer_JenniferGone = false;
var C010_Revenge_SidneyJennifer_FightVictory = false;
var C010_Revenge_SidneyJennifer_RaceVictory = false;
var C010_Revenge_SidneyJennifer_CropDone = false;
var C010_Revenge_SidneyJennifer_IsGagged = false;
var C010_Revenge_SidneyJennifer_OrgasmDone = false;
var C010_Revenge_SidneyJennifer_MastubateCount = 0;

// Chapter 10 - Sidney and Jennifer Revenge Load
function C010_Revenge_SidneyJennifer_Load() {

	// Set the timer limits at 15:15
	StartTimer(15.25 * 60 * 60 * 1000, "C010_Revenge", "Outro");
	
	// Load the scene parameters (loads Jennifer first in case we are starting directly in chapter 10)
	ActorLoad("Jennifer", "");
	ActorLoad(C010_Revenge_SidneyJennifer_CurrentActor, "");
	if (C010_Revenge_SidneyJennifer_CurrentStage == 0) { ActorSpecificSetPose("Sidney", "Angry"); ActorSpecificSetPose("Jennifer", "Angry"); }	
	LoadInteractions();
	LeaveIcon = "";
	Common_SelfBondageAllowed = false;
	C010_Revenge_SidneyJennifer_SidneyVictim = GameLogQuery("C007_LunchBreak", "Sidney", "Stranded");
	C010_Revenge_SidneyJennifer_CanBribe = (PlayerInventoryTotalQuantity() >= 10);

	// If we must put the previous text back
	if (C010_Revenge_SidneyJennifer_IntroText != "") OverridenIntroText = C010_Revenge_SidneyJennifer_IntroText;

}

// Chapter 10 - Sidney and Jennifer Revenge Run
function C010_Revenge_SidneyJennifer_Run() {
	
	// Build the text interactions
	BuildInteraction(C010_Revenge_SidneyJennifer_CurrentStage);

	// Draw the actors with a different zoom based on who's focused
	if (C010_Revenge_SidneyJennifer_CurrentStage < 155) {
		if (!C010_Revenge_SidneyJennifer_SidneyGone && !C010_Revenge_SidneyJennifer_JenniferGone) {
			if (CurrentActor == "Sidney") {
				DrawActor("Jennifer", 800, 50, 0.8);
				DrawActor("Sidney", 500, 0, 1.0);
			} else {
				DrawActor("Sidney", 525, 50, 0.8);
				DrawActor("Jennifer", 700, 0, 1.0);		
			}
		} else {
			if ((C010_Revenge_SidneyJennifer_CurrentStage == 38) || (C010_Revenge_SidneyJennifer_CurrentStage == 142)) DrawActor(CurrentActor, 650, -100, 0.833);
			else DrawActor(CurrentActor, 600, 0, 1.0);
		}			
	}

	// Include the player once she's naked
	if (C010_Revenge_SidneyJennifer_CurrentStage in {155:true, 160:true, 170:true, 180:true, 310:true, 320:true}) {
		DrawActor("Jennifer", 870, 35, 0.75);
		DrawActor("Sidney", 500, 35, 0.75);
		DrawActor("Player", 625, 100, 1);
	}

	// The player tied as a dog at both girls feet
	if ((C010_Revenge_SidneyJennifer_CurrentStage >= 190) && (C010_Revenge_SidneyJennifer_CurrentStage <= 300)) {
		DrawActor("Jennifer", 870, -350, 0.75);
		DrawActor("Sidney", 500, -350, 0.75);
		DrawActor("Player", 600, -150, 1);
	}
	
}

// Chapter 10 - Sidney and Jennifer Revenge Click
function C010_Revenge_SidneyJennifer_Click() {	

	// Regular interactions
	ClickInteraction(C010_Revenge_SidneyJennifer_CurrentStage);
	
	// The player can click on herself in most stages
	var ClickInv = GetClickedInventory();
	if ((ClickInv == "Player") && (C010_Revenge_SidneyJennifer_CurrentStage <= 170)) {
		C010_Revenge_SidneyJennifer_IntroText = OverridenIntroText;
		C010_Revenge_SidneyJennifer_CurrentActor = CurrentActor; 
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// Can be restrained at stage 38 (Jennifer) or 142 (Sidney)
	if (((C010_Revenge_SidneyJennifer_CurrentStage == 38) || (C010_Revenge_SidneyJennifer_CurrentStage == 142)) && (ClickInv != "") && (ClickInv != "Player")) {

		// Both heroines react differently to the crop
		if ((ClickInv == "Crop") && !C010_Revenge_SidneyJennifer_CropDone) {
			C010_Revenge_SidneyJennifer_CropDone = true;
			if (C010_Revenge_SidneyJennifer_CurrentStage == 38) ActorChangeAttitude(-1, 1);
			if (C010_Revenge_SidneyJennifer_CurrentStage == 142) ActorChangeAttitude(0, 1);
		}

		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		OverridenIntroImage = "";
		C010_Revenge_SidneyJennifer_IsGagged = ActorIsGagged();
		if (C010_Revenge_SidneyJennifer_IsGagged && (C010_Revenge_SidneyJennifer_CurrentStage == 38)) ActorSpecificSetPose("Jennifer", "Dog");
		if ((ClickInv == "Crop") && (C010_Revenge_SidneyJennifer_CurrentStage == 38)) OverridenIntroText = GetText("CropJennifer");
		if ((ClickInv == "Crop") && (C010_Revenge_SidneyJennifer_CurrentStage == 142)) OverridenIntroText = GetText("CropSidney");

	}
	
}

// Chapter 10 - Sidney and Jennifer Revenge - Switch to a provoking pose 
function C010_Revenge_SidneyJennifer_ProvokePose() {
	ActorSpecificSetPose("Sidney", "Furious");
	ActorSpecificSetPose("Jennifer", "Furious");
}

// When the user bribes Sidney, she leaves with half the items
function C010_Revenge_SidneyJennifer_Bribe() {
	GameLogSpecificAdd("C010_Revenge", "Sidney", "Leave");
	ActorLoad("Jennifer", "");
	LeaveIcon = "";
	C010_Revenge_SidneyJennifer_SidneyGone = true;
	C010_Revenge_Outro_GoodEnding = true;
	PlayerRemoveHalfInventory();
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Actor calms down (stops the pose)
function C010_Revenge_SidneyJennifer_CalmDown(ActorToCalm) {
	ActorSpecificSetPose(ActorToCalm, "");
}

// Chapter 10 - Sidney and Jennifer Revenge - The player can get two ropes from Sidney or Jennifer
function C010_Revenge_SidneyJennifer_GetTwoRopes() {
	PlayerAddInventory("Rope", 2);
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer will strip if she's +5 sub or more
function C010_Revenge_SidneyJennifer_JenniferTestStrip() {
	if (ActorGetValue(ActorSubmission) >= 5) {
		GameLogAdd("Naked");
		OverridenIntroText = GetText("JenniferStrips");
		ActorSpecificSetCloth("Jennifer", "Naked");
		ActorChangeAttitude(-2, 1);
		CurrentTime = CurrentTime + 50000;
		C010_Revenge_SidneyJennifer_CurrentStage = 37;
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer can be tied up like a dog
function C010_Revenge_SidneyJennifer_JenniferDog() {
	GameLogAdd("Dog");
	ActorAddInventory("Rope");
	ActorAddInventory("TwoRopes");
	PlayerRemoveInventory("Rope", 2);
	ActorSetPose("Dog");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer cute
function C010_Revenge_SidneyJennifer_JenniferCute() {
	OverridenIntroImage = "";
	if (!C010_Revenge_SidneyJennifer_CuteDone) {
		C010_Revenge_SidneyJennifer_CuteDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer bark
function C010_Revenge_SidneyJennifer_JenniferBark() {
	OverridenIntroImage = "";
	ActorSetPose("Bark");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer crawl
function C010_Revenge_SidneyJennifer_JenniferCrawl() {
	OverridenIntroImage = "";
	ActorSetPose("Dog");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Jennifer untie
function C010_Revenge_SidneyJennifer_Untie() {
	OverridenIntroImage = "";
	ActorUntie();
	ActorUngag();
	ActorSetPose("");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Steal Items
function C010_Revenge_SidneyJennifer_StealItems() {
	
	// Backup and remove the player inventory
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
	C010_Revenge_SidneyJennifer_ItemStolen = true;
	CurrentTime = CurrentTime + 50000;
	
}

// Chapter 10 - Sidney and Jennifer Revenge - Recover the stolen items and clothes
function C010_Revenge_SidneyJennifer_RecoverItems() {
	C010_Revenge_SidneyJennifer_ItemStolen = false;
	PlayerRestoreAllInventory();
	CurrentTime = CurrentTime + 50000;
	PlayerClothes("Clothed");
}

// Chapter 10 - Sidney and Jennifer Revenge - Starts the fight 2 VS 1
function C010_Revenge_SidneyJennifer_StartFight() {
		
	// Sets the fight difficulty
	var SidneyDifficulty = "Hard";
	var JenniferDifficulty = "Normal";
	if (ActorSpecificGetValue("Jennifer", ActorSubmission) < 0) JenniferDifficulty = "Hard";

	// Launch the double fight
	C010_Revenge_SidneyJennifer_IntroText = "";
	DoubleFightLoad("Sidney", SidneyDifficulty, Icons.Fight.Punch, "Jennifer", JenniferDifficulty, Icons.Fight.Punch, (C010_Revenge_SidneyJennifer_CurrentStage < 100)?"Hallway":"RunningTrack", "C010_Revenge_SidneyJennifer_EndFight", PlayerGetSkillLevel("Fighting"));

}

// Chapter 10 - Sidney and Jennifer Revenge - When the fight ends
function C010_Revenge_SidneyJennifer_EndFight(Victory) {
	
	// Change the girls attitude depending on the victory or defeat
	ActorSpecificChangeAttitude("Sidney", 0, Victory ? 2 : -2);
	ActorSpecificChangeAttitude("Jennifer", -1, Victory ? 2 : -2);
	GameLogSpecificAdd("C010_Revenge", "Sidney", Victory ? "FightVictory" : "FightDefeat");
	GameLogSpecificAdd("C010_Revenge", "Jennifer", Victory ? "FightVictory" : "FightDefeat");
	ActorSpecificSetPose("Sidney", "Angry");
	ActorSpecificSetPose("Jennifer", "Angry");
	C010_Revenge_SidneyJennifer_FightVictory = Victory;
	C010_Revenge_SidneyJennifer_AllowFight = false;
	
	// If this was the hallway fight
	if (C010_Revenge_SidneyJennifer_CurrentStage <= 100) {

		// On a victory Sidney runs away, on a defeat we show a custom text
		if (Victory) {
			OverridenIntroText = GetText("FightVictorySidneyRun");
			ActorLoad("Jennifer", "");
			LeaveIcon = "";
			C010_Revenge_SidneyJennifer_SidneyGone = true;
			C010_Revenge_Outro_GoodEnding = true;
			C010_Revenge_SidneyJennifer_CurrentStage = 32;
		} else {
			OverridenIntroText = GetText("FightDefeatHallway");
			C010_Revenge_SidneyJennifer_CurrentStage = 40;
		}
		
	}
	
	// If this was the outside fight
	if ((C010_Revenge_SidneyJennifer_CurrentStage >= 150) && (C010_Revenge_SidneyJennifer_CurrentStage <= 180)) {

		// On a victory Jennifer runs away, on a defeat we show a custom text
		if (Victory) {
			PlayerUngag();
			PlayerClothes("Clothed");
			OverridenIntroText = GetText("FightVictoryJenniferRun");
			C010_Revenge_SidneyJennifer_JenniferLeave();
			C010_Revenge_SidneyJennifer_CurrentStage = 133;
		} else OverridenIntroText = GetText("FightDefeatTrack");

	}

}

// Chapter 10 - Sidney and Jennifer Revenge - Going outside to the running track
function C010_Revenge_SidneyJennifer_GoOutside() {
	CurrentTime = CurrentTime + 300000;
	ActorLoad("Jennifer", "");
	LeaveIcon = "";
	ActorSpecificSetPose("Sidney", "Angry");
	ActorSpecificSetPose("Jennifer", "Angry");
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player strips
function C010_Revenge_SidneyJennifer_PlayerStrip() {
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Ungag the current actor
function C010_Revenge_SidneyJennifer_Ungag() {
	OverridenIntroImage = "";
	ActorUngag();
	CurrentTime = CurrentTime + 50000;
	C010_Revenge_SidneyJennifer_IsGagged = false;
}

// Chapter 10 - Sidney and Jennifer Revenge - Masturbate Jennifer
function C010_Revenge_SidneyJennifer_MasturbateJennifer() {

	// Doesn't work if she's wearing a chastity belt or if she doesn't like the player, after 3 tries, she will orgasm
	CurrentTime = CurrentTime + 50000;
	OverridenIntroImage = "";
	if (!ActorIsChaste()) {
		C010_Revenge_SidneyJennifer_MastubateCount++;
		if (ActorGetValue(ActorLove) >= 5) {
			if ((C010_Revenge_SidneyJennifer_MastubateCount >= 3) && !C010_Revenge_SidneyJennifer_OrgasmDone) {
				ActorAddOrgasm();
				ActorChangeAttitude(1, 0);
				C010_Revenge_SidneyJennifer_OrgasmDone = true;
				OverridenIntroImage = "HallwayFloorOrgasm.jpg";
				OverridenIntroText = GetText("MasturbateJenniferOrgasm");
			} else OverridenIntroText = GetText("MasturbateJenniferLove");
		} else OverridenIntroText = GetText("MasturbateJenniferNoLove");
	}

}

// Chapter 10 - Sidney and Jennifer Revenge - When Jennifer is convinced to leave
function C010_Revenge_SidneyJennifer_JenniferLeave() {
	GameLogSpecificAdd("C010_Revenge", "Jennifer", "Leave");
	ActorLoad("Sidney", "");
	LeaveIcon = "";
	C010_Revenge_SidneyJennifer_JenniferGone = true;
	C010_Revenge_Outro_GoodEnding = true;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Checks if Sidney will strip to her underwear (+5 submission is required)
function C010_Revenge_SidneyJennifer_SidneyUnderwear() {
	if (ActorGetValue(ActorSubmission) >= 5) {
		OverridenIntroText = GetText("SidneyUnderwear");
		ActorSpecificSetCloth("Sidney", "Underwear");
		CurrentTime = CurrentTime + 50000;
		C010_Revenge_SidneyJennifer_CurrentStage = 136;
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - When Sidney gets naked
function C010_Revenge_SidneyJennifer_SidneyNaked() {
	ActorSpecificSetCloth("Sidney", "Naked");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player searches in Sidney's bag
function C010_Revenge_SidneyJennifer_SearchSidneyBag() {
	PlayerAddInventory("Rope", 2);
	PlayerAddInventory("TapeGag", 6);
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player searches in Sidney's bag
function C010_Revenge_SidneyJennifer_SidneyPig() {
	GameLogAdd("Pig");
	ActorSpecificSetPose("Sidney", "Pig");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - When applies the two ropes on Sidney
function C010_Revenge_SidneyJennifer_SidneyRope() {
	ActorAddInventory("Rope");
	ActorAddInventory("TwoRopes");
	PlayerRemoveInventory("Rope", 2);
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - Sidney doesn't like to be called a cute little piggy
function C010_Revenge_SidneyJennifer_SidneyCute() {
	OverridenIntroImage = "";
	if (C010_Revenge_SidneyJennifer_CuteDone) {
		C010_Revenge_SidneyJennifer_CuteDone = true;
		ActorChangeAttitude(-1, 1);		
	}
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player asks Sidney to walk
function C010_Revenge_SidneyJennifer_SidneyWalk() {
	OverridenIntroImage = "";
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player asks Sidney to say "Sooowee", at +10 submission she will do it
function C010_Revenge_SidneyJennifer_SidneyPigTalk() {
	OverridenIntroImage = "";
	if (ActorGetValue(ActorSubmission) >= 10)
		OverridenIntroText = GetText("SidneyPigTalk");
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player masturbates Sidney
function C010_Revenge_SidneyJennifer_MasturbateSidney() {

	// Doesn't work if she's wearing a chastity belt, with the egg and 3 tries, she will orgasm
	CurrentTime = CurrentTime + 50000;
	OverridenIntroImage = "";
	if (!ActorIsChaste()) {
		C010_Revenge_SidneyJennifer_MastubateCount++;
		if (ActorHasInventory("VibratingEgg")) {
			if ((C010_Revenge_SidneyJennifer_MastubateCount >= 3) && !C010_Revenge_SidneyJennifer_OrgasmDone) {
				ActorAddOrgasm();
				ActorChangeAttitude(1, 0);
				C010_Revenge_SidneyJennifer_OrgasmDone = true;
				OverridenIntroImage = "TrackDownOrgasm.jpg";
				OverridenIntroText = GetText("MasturbateSidneyOrgasm");
			} else OverridenIntroText = GetText("MasturbateSidneyEgg");
		} else OverridenIntroText = GetText("MasturbateSidneyNoEgg");
	}

}

// Chapter 10 - Sidney and Jennifer Revenge - When the player gets gagged
function C010_Revenge_SidneyJennifer_GagPlayer() {
	CurrentTime = CurrentTime + 50000;
	PlayerLockInventory("TapeGag");
	ActorLoad("Sidney", "");
	LeaveIcon = "";
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player gets bound
function C010_Revenge_SidneyJennifer_RopePlayer() {
	CurrentTime = CurrentTime + 50000;
	PlayerLockInventory("Rope");
	Common_PlayerPose = "Dog";
}

// Chapter 10 - Sidney and Jennifer Revenge - When the player starts the race (5 minutes race)
function C010_Revenge_SidneyJennifer_StartRace() {
	CurrentTime = CurrentTime + 50000;
	C010_Revenge_SidneyJennifer_IntroText = "";
	RaceLoad("Player", DrawGetPlayerImageName(true), 10, "Normal", 2640, GetText("RaceGoal"), Icons.Race.KneeBound, Icons.Race.ElbowBound, "RunningTrack", "C010_Revenge_SidneyJennifer_EndRace", PlayerGetSkillLevel("Sports"));
}

// Chapter 10 - Sidney and Jennifer Revenge - When the race ends
function C010_Revenge_SidneyJennifer_EndRace(Victory) {
	
	// Change the girls attitude depending on the victory or defeat
	ActorSpecificChangeAttitude("Sidney", 0, Victory ? 2 : -2);
	ActorSpecificChangeAttitude("Jennifer", Victory ? 2 : -2, 0);
	GameLogSpecificAdd("C010_Revenge", "Sidney", Victory ? "RaceVictory" : "RaceDefeat");
	GameLogSpecificAdd("C010_Revenge", "Jennifer", Victory ? "RaceVictory" : "RaceDefeat");
	ActorSpecificSetPose("Sidney", "Camera");
	ActorSpecificSetPose("Jennifer", "");
	C010_Revenge_SidneyJennifer_RaceVictory = Victory;
	C010_Revenge_SidneyJennifer_CurrentStage = 300;
	OverridenIntroText = GetText(Victory ? "RaceVictory" : "RaceDefeat");
	if (Victory) PlayerAddSkill("Sports", 1);
	ActorLoad("Jennifer", "");
	LeaveIcon = "";

}

// Chapter 10 - Sidney and Jennifer Revenge - When the player gets untied
function C010_Revenge_SidneyJennifer_ReleasePlayer() {
	CurrentTime = CurrentTime + 50000;
	Common_PlayerPose = "BackShy";
	PlayerUnlockInventory("Rope");
	PlayerUngag();
}

// Chapter 10 - Sidney and Jennifer Revenge - End the revenge and flag the end
function C010_Revenge_SidneyJennifer_EarlyEnding(EndingType) {
	CurrentTime = CurrentTime + 300000;
	C010_Revenge_EarlyEnding_Type = EndingType;
	if (C010_Revenge_SidneyJennifer_FightVictory) C010_Revenge_EarlyEnding_Type = "SidneyJenniferFightVictory";
	SetScene(CurrentChapter, "EarlyEnding");
}