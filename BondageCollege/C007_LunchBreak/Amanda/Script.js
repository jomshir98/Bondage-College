var C007_LunchBreak_Amanda_CurrentStage = 0;
var C007_LunchBreak_Amanda_NoOption = false; // NoOption means that there's no options to go eat with her
var C007_LunchBreak_Amanda_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Amanda_TickleDone = false;
var C007_LunchBreak_Amanda_MasturbateCount = 0;
var C007_LunchBreak_Amanda_OrgasmDone = false;
var C007_LunchBreak_Amanda_CropDone = false;
var C007_LunchBreak_Amanda_IsRoped = false;
var C007_LunchBreak_Amanda_IsGagged = false;
var C007_LunchBreak_Amanda_MakeLoveReady = true;
var C007_LunchBreak_Amanda_TeethClenchDone = false;
var C007_LunchBreak_Amanda_IntroText = "";
var C007_LunchBreak_Amanda_LeaveIcon = "";
var C007_LunchBreak_Amanda_IsBoundAndGagged = false;
var C007_LunchBreak_Amanda_ConfirmEvil = false;
var C007_LunchBreak_Amanda_HasSeduction = false;
var C007_LunchBreak_Amanda_TeamAgainstMildred = false;
var C007_LunchBreak_Amanda_TeamFailAgainstMildred = false;

// Calculates the screen parameters
function C007_LunchBreak_Amanda_CalcParams() {

	// Check if there's no options to go eat
	C007_LunchBreak_Amanda_NoOption = ((ActorGetValue(ActorLove) < 5) && (ActorGetValue(ActorSubmission) < 5) && ((ActorGetValue(ActorLove) < 1) || (ActorGetValue(ActorSubmission) > -3)));

	// No special images by default
	OverridenIntroImage = "";
	
	// Between 100 and 200, the image evolves with the number of matches
	if ((C007_LunchBreak_Amanda_CurrentStage >= 100) && (C007_LunchBreak_Amanda_CurrentStage < 200)) {
		var Img = "0";
		if ((C007_LunchBreak_Amanda_MatchCount == 2) || (C007_LunchBreak_Amanda_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Amanda_MatchCount >= 4) Img = "2";
		OverridenIntroImage = "AmandaPlayerLunch" + Img + ".jpg";
	}

	// At 330, the player can dominate Amanda with many restrains, the image changes accordingly
	if (C007_LunchBreak_Amanda_CurrentStage == 330) {
		var Img = "";
		if (ActorHasInventory("Rope")) Img = Img + "Rope";
		if (ActorHasInventory("Cuffs")) Img = Img + "Cuffs";
		if (ActorHasInventory("BallGag")) Img = Img + "BallGag";
		if (ActorHasInventory("TapeGag")) Img = Img + "TapeGag";
		OverridenIntroImage = "AmandaPlayerIsDommeTouch" + Img + ".jpg";
	}

	// Keep the status of Amanda
	C007_LunchBreak_Amanda_IsBoundAndGagged = ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("BallGag") || ActorHasInventory("TapeGag")));
	
}

// Chapter 7 - Amanda Load
function C007_LunchBreak_Amanda_Load() {

	// Load the scene parameters
	ActorLoad("Amanda", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Amanda_CalcParams();
	C007_LunchBreak_Amanda_HasSeduction = (PlayerGetSkillLevel("Seduction") >= 1);
	C007_LunchBreak_Amanda_TeamAgainstMildred = GameLogQuery("C002_FirstClass", "Mildred", "SubdueWithAmanda");
	C007_LunchBreak_Amanda_TeamFailAgainstMildred = GameLogQuery("C002_FirstClass", "Mildred", "SubdueFailWithAmanda");

	// If Amanda doesn't like the player and isn't subbie enough, she leaves and don't talk
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 2) && (C007_LunchBreak_Amanda_CurrentStage == 0)) {
		C007_LunchBreak_Amanda_CurrentStage = 5;
		C007_LunchBreak_ActorSelect_AmandaAvail = false;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Amanda_IntroText != "") && (C007_LunchBreak_Amanda_CurrentStage > 0)) {
		OverridenIntroText = C007_LunchBreak_Amanda_IntroText;
		LeaveIcon = C007_LunchBreak_Amanda_LeaveIcon;
	}

}

// Chapter 7 - Amanda Run
function C007_LunchBreak_Amanda_Run() {
	BuildInteraction(C007_LunchBreak_Amanda_CurrentStage);
}

// Chapter 7 - Amanda Click
function C007_LunchBreak_Amanda_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Amanda_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Amanda_IntroText = OverridenIntroText;
		C007_LunchBreak_Amanda_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// When the user wants to use the rope on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OverridenIntroText = GetText("Rope");
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsRoped = true;
	}

	// When the user wants to use cuffs on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Cuffs") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OverridenIntroText = GetText("Cuffs");
		ActorAddInventory("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the BallGag on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "BallGag") && !ActorHasInventory("BallGag")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OverridenIntroText = GetText("BallGag");
		ActorRemoveInventory("TapeGag");
		ActorAddInventory("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsGagged = true;
	}

	// When the user wants to use the tape gag on Amanda - Time and item are consumed
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "TapeGag") && !ActorHasInventory("TapeGag")) {
		C007_LunchBreak_Amanda_CurrentStage = 330;
		OverridenIntroText = GetText("TapeGag");
		C007_LunchBreak_Amanda_Ungag();
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Amanda_IsGagged = true;
	}

	// When the user wants to use the crop on Amanda
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Crop")) {
		OverridenIntroText = GetText("Crop");
		if (!C007_LunchBreak_Amanda_CropDone) {
			C007_LunchBreak_Amanda_CropDone = true;
			ActorChangeAttitude(-1, 0);
		}
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the egg on Amanda (Amanda isn't affected by the egg but can still have one)
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg")) {
		OverridenIntroText = GetText("VibratingEgg");
		ActorChangeAttitude(-1, 1);
		ActorAddInventory("VibratingEgg");
		PlayerRemoveInventory("VibratingEgg", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the cuffs keys
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Uncuff");
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the collar (+20 submission and a ceremony is required)
	if ((C007_LunchBreak_Amanda_CurrentStage >= 300) && (C007_LunchBreak_Amanda_CurrentStage <= 330) && (ClickInv == "Collar") && !ActorHasInventory("Collar"))
		OverridenIntroText = GetText("Collar");

	// When the user wants to use a bondage item in the love scenes
	if ((C007_LunchBreak_Amanda_CurrentStage >= 200) && (C007_LunchBreak_Amanda_CurrentStage < 300) && ((ClickInv == "Collar") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg") || (ClickInv == "Crop") || (ClickInv == "TapeGag") || (ClickInv == "BallGag") || (ClickInv == "Cuffs") || (ClickInv == "Rope")))
		OverridenIntroText = GetText("LoveNoItem");

	// When the user wants to use a bondage item when subbie
	if ((C007_LunchBreak_Amanda_CurrentStage >= 400) && (C007_LunchBreak_Amanda_CurrentStage < 440) && ((ClickInv == "Collar") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg") || (ClickInv == "Crop") || (ClickInv == "TapeGag") || (ClickInv == "BallGag") || (ClickInv == "Cuffs") || (ClickInv == "Rope")))
		OverridenIntroText = GetText("SubbieNoItem");
	
	// Recalculates the scene parameters
	C007_LunchBreak_Amanda_CalcParams();
	
}

// Chapter 7 - Amanda No Leave
function C007_LunchBreak_Amanda_NoLeave() {
	LeaveIcon = "";
}

// Chapter 7 - Amanda Start Lunch
function C007_LunchBreak_Amanda_StartLunch() {
	GameLogAdd("Lunch");
	CurrentTime = CurrentTime + 480000;
	LeaveIcon = "";
}

// Chapter 7 - Amanda Eat Lunch (adds 20 minutes)
function C007_LunchBreak_Amanda_EatLunch() {	
	CurrentTime = CurrentTime + 1800000;
}

// Chapter 7 - Amanda End Lunch
function C007_LunchBreak_Amanda_EndLunch() {
	C007_LunchBreak_ActorSelect_AmandaAvail = false;
}

// Chapter 7 - Amanda Good Match
function C007_LunchBreak_Amanda_GoodMatch() {
	C007_LunchBreak_Amanda_MatchCount++;
	C007_LunchBreak_Amanda_CalcParams();
}

// Chapter 7 - Amanda Bad Match
function C007_LunchBreak_Amanda_BadMatch() {
	C007_LunchBreak_Amanda_MatchCount--;
	C007_LunchBreak_Amanda_CalcParams();
}

// Chapter 7 - Amanda Test Match - if the match is 4 or better, we go to a bonus part
function C007_LunchBreak_Amanda_TestMatch() {
	C007_LunchBreak_Amanda_CurrentStage = -1; // No mode
	if ((ActorGetValue(ActorLove) >= 5) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 200; // Lovers mode
	if ((ActorGetValue(ActorSubmission) >= 5) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 300; // Player is Domme mode
	if (ActorGetValue(ActorSubmission) >= 10) C007_LunchBreak_Amanda_CurrentStage = 300; // Player is Domme mode (10 is so high that we don't check for a match)
	if ((ActorGetValue(ActorLove) >= 1) && (ActorGetValue(ActorSubmission) <= -3) && (C007_LunchBreak_Amanda_MatchCount >= 4)) C007_LunchBreak_Amanda_CurrentStage = 400; // Player is subbie mode
	if (C007_LunchBreak_Amanda_CurrentStage == -1) SetScene(CurrentChapter, "Outro"); // No mode, we end the chapter
	else { GameLogAdd("LunchBonus"); C007_LunchBreak_ActorSelect_BonusDone = true; } // With a mode, we flag the bonus scene
	OverridenIntroImage = "";
}

// Chapter 7 - Amanda Tickle
function C007_LunchBreak_Amanda_Tickle() {
	if (!C007_LunchBreak_Amanda_TickleDone) {
		C007_LunchBreak_Amanda_TickleDone = true;
		ActorChangeAttitude(1, 0);
	}
}

// Chapter 7 - Amanda Masturbate
function C007_LunchBreak_Amanda_Masturbate() {
	
	// The count goes up, after 3 times she can have an orgasm but only if she's bound and gagged
	C007_LunchBreak_Amanda_MasturbateCount++;
	if ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("BallGag") || ActorHasInventory("TapeGag"))) {
		if ((C007_LunchBreak_Amanda_MasturbateCount >= 3) && !C007_LunchBreak_Amanda_OrgasmDone) {
			OverridenIntroText = GetText("Orgasm");
			ActorAddOrgasm();
			ActorChangeAttitude(1, 1);
			C007_LunchBreak_Amanda_OrgasmDone = true;
		} else {
			OverridenIntroText = GetText("Masturbate");
		}
	}
	
}

// Chapter 7 - Amanda Untie
function C007_LunchBreak_Amanda_Untie() {
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
	C007_LunchBreak_Amanda_IsRoped = false;
}

// Chapter 7 - Amanda Ungag
function C007_LunchBreak_Amanda_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("BallGag")) {
		ActorRemoveInventory("BallGag");
		PlayerAddInventory("BallGag", 1);
	}
	C007_LunchBreak_Amanda_IsGagged = false;
}

// Chapter 7 - Amanda Test Make Love (Amanda will only make love if +8 or more)
function C007_LunchBreak_Amanda_TestMakeLove() {
	if (ActorGetValue(ActorLove) >= 8) {
		OverridenIntroText = GetText("LoveStart");
		C007_LunchBreak_Amanda_CurrentStage = 240;
	} else {
		C007_LunchBreak_Amanda_MakeLoveReady = false;
		ActorChangeAttitude(-1, 0);
	}
}

// Chapter 7 - Amanda Love Masturbate (After 3 times, the player cums)
function C007_LunchBreak_Amanda_LoveMasturbate() {
	C007_LunchBreak_Amanda_MasturbateCount++;
	if (C007_LunchBreak_Amanda_MasturbateCount >= 3) {
		OverridenIntroText = GetText("LoveMasturbate");
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		PlayerAddSkill("Seduction", 1);
		C007_LunchBreak_Amanda_CurrentStage = 250;
	}
}

// Chapter 7 - Amanda Subbie Masturbate (After 3 times, the player cums)
function C007_LunchBreak_Amanda_SubbieMasturbate() {
	C007_LunchBreak_Amanda_MasturbateCount++;
	if (C007_LunchBreak_Amanda_MasturbateCount >= 3) {
		OverridenIntroText = GetText("SubbieMasturbate");
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		C007_LunchBreak_Amanda_CurrentStage = 470;
	}
}

// Chapter 7 - Amanda Teeth Clench (Amanda doesn't like it)
function C007_LunchBreak_Amanda_ClenchTeeth() {
	if (!C007_LunchBreak_Amanda_TeethClenchDone) {
		ActorChangeAttitude(-1, 1);
		C007_LunchBreak_Amanda_TeethClenchDone = true;
	}
}

// Chapter 7 - Amanda - Player Subbie Strip
function C007_LunchBreak_Amanda_SubbieStrip() {
	PlayerClothes("Underwear");
}

// Chapter 7 - Amanda - Player Subbie Rope
function C007_LunchBreak_Amanda_SubbieRope() {
	PlayerLockInventory("Rope");
}

// Chapter 7 - Amanda - Player Subbie Gag
function C007_LunchBreak_Amanda_SubbieGag() {
	PlayerLockInventory("BallGag");
}

// Chapter 7 - Amanda - Player Subbie Ungag
function C007_LunchBreak_Amanda_SubbieUngag() {
	PlayerUnlockInventory("BallGag");
}

// Chapter 7 - Amanda - Player Release
function C007_LunchBreak_Amanda_SubbieRelease() {
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");
}

// Chapter 7 - Amanda End Bonus Scene
function C007_LunchBreak_Amanda_EndBonus() {
	SetScene(CurrentChapter, "Outro");
}

// Chapter 7 - Amanda Evil End Chapter (Leave her bound and gagged)
function C007_LunchBreak_Amanda_EvilEnd() {
	if (C007_LunchBreak_Amanda_ConfirmEvil) {
		C007_LunchBreak_ActorSelect_EvilEnding = true;
		GameLogAdd("Stranded");
		ActorChangeAttitude(-5, 1);
		SetScene(CurrentChapter, "Outro");		
	} else {
		OverridenIntroText = GetText("LeaveBoundAndGagged");
		C007_LunchBreak_Amanda_ConfirmEvil = true;
	}
}

// Chapter 7 - Amanda Kiss
function C007_LunchBreak_Amanda_Kiss() {
	GameLogAdd("Kiss");
}