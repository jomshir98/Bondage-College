var C007_LunchBreak_Sarah_CurrentStage = 0;
var C007_LunchBreak_Sarah_NoOption = false; // NoOption means that there's no options to go eat with her
var C007_LunchBreak_Sarah_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Sarah_IntroText = "";
var C007_LunchBreak_Sarah_LeaveIcon = "";
var C007_LunchBreak_Sarah_RestroomTimer = 0;
var C007_LunchBreak_Sarah_LoveCount = 0;
var C007_LunchBreak_Sarah_ViolenceDone = 0;
var C007_LunchBreak_Sarah_IsRoped = false;
var C007_LunchBreak_Sarah_IsGagged = false;
var C007_LunchBreak_Sarah_IsBoundAndGagged = false;
var C007_LunchBreak_Sarah_HasEgg = false;
var C007_LunchBreak_Sarah_TwoRopes = false;
var C007_LunchBreak_Sarah_ConfirmEvil = false;
var C007_LunchBreak_Sarah_SubdueMildred = false;

// Calculates the screen parameters
function C007_LunchBreak_Sarah_CalcParams() {

	// Check if there's no options to go eat
	C007_LunchBreak_Sarah_NoOption = ((ActorGetValue(ActorLove) < 5) && (ActorGetValue(ActorSubmission) < 5));

	// No special images by default
	OverridenIntroImage = "";
	
	// Between 100 and 200, the image evolves with the number of matches
	if ((C007_LunchBreak_Sarah_CurrentStage == 100) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 110) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 120) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 130) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 140) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 150) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 160) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 190) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 300) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 310) ||
	    (C007_LunchBreak_Sarah_CurrentStage == 320)) {
		var Img = "0";
		if ((C007_LunchBreak_Sarah_MatchCount == 2) || (C007_LunchBreak_Sarah_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Sarah_MatchCount >= 4) Img = "2";
		OverridenIntroImage = "SarahPlayerLunch" + Img + ".jpg";
	}

	// At 250 & 260 the player and Sarah make love, many restrains can be applied
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) || (C007_LunchBreak_Sarah_CurrentStage == 260)) {
		var Img = "";
		if (ActorHasInventory("Rope") && !C007_LunchBreak_Sarah_TwoRopes) Img = Img + "Rope";
		if (ActorHasInventory("Rope") && C007_LunchBreak_Sarah_TwoRopes) Img = Img + "TwoRopes";
		if (ActorHasInventory("Cuffs")) Img = Img + "Cuffs";
		if (ActorHasInventory("BallGag")) Img = Img + "BallGag";
		if (ActorHasInventory("TapeGag")) Img = Img + "TapeGag";
		OverridenIntroImage = "SarahPlayerRestroomLove" + Img + ".jpg";
	}
	
	// Keep the status of Sarah
	C007_LunchBreak_Sarah_IsBoundAndGagged = ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("BallGag") || ActorHasInventory("TapeGag")));
	C007_LunchBreak_Sarah_HasEgg = ActorHasInventory("VibratingEgg");
	
}

// Chapter 7 - Sarah Load
function C007_LunchBreak_Sarah_Load() {

	// Load the scene parameters
	ActorLoad("Sarah", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Sarah_CalcParams();
	C007_LunchBreak_Sarah_SubdueMildred = (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && !GameLogQuery("C002_FirstClass", "Mildred", "Release"));
	
	// If Sarah doesn't like the player and isn't subbie enough, she leaves and don't talk
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 2) && (C007_LunchBreak_Sarah_CurrentStage == 0)) {
		C007_LunchBreak_Sarah_CurrentStage = 5;
		C007_LunchBreak_ActorSelect_SarahAvail = false;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Sarah_IntroText != "") && (C007_LunchBreak_Sarah_CurrentStage > 0)) {
		OverridenIntroText = C007_LunchBreak_Sarah_IntroText;
		LeaveIcon = C007_LunchBreak_Sarah_LeaveIcon;
	}

}

// Chapter 7 - Sarah Run
function C007_LunchBreak_Sarah_Run() {
	BuildInteraction(C007_LunchBreak_Sarah_CurrentStage);
}

// Chapter 7 - Sarah Click
function C007_LunchBreak_Sarah_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Sarah_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Sarah_IntroText = OverridenIntroText;
		C007_LunchBreak_Sarah_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}

	// When the user wants to use a second rope
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "Rope") && ActorHasInventory("Rope") && !ActorHasInventory("Cuffs") && !C007_LunchBreak_Sarah_TwoRopes) {
		OverridenIntroText = GetText("SecondRope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sarah_TwoRopes = true;
	}
	
	// When the user wants to use the rope
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("FirstRope");
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sarah_IsRoped = true;
	}
	
	// When the user wants to use the cuffs
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "Cuffs") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Cuffs");
		ActorAddInventory("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the BallGag
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "BallGag") && !ActorHasInventory("BallGag")) {
		OverridenIntroText = GetText("BallGag");
		ActorRemoveInventory("TapeGag");
		ActorAddInventory("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sarah_IsGagged = true;
	}
	
	// When the user wants to use the tape gag
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "TapeGag") && !ActorHasInventory("TapeGag")) {
		OverridenIntroText = GetText("TapeGag");		
		C007_LunchBreak_Sarah_Ungag();
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Sarah_IsGagged = true;
	}
	
	// When the user wants to use the cuffs keys
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Uncuff");
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the crop
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "Crop")) {
		OverridenIntroText = GetText("Crop");
		C007_LunchBreak_Sarah_Violence();
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the egg
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg")) {
		OverridenIntroText = GetText("VibratingEgg");
		ActorChangeAttitude(1, 0);
		ActorAddInventory("VibratingEgg");
		PlayerRemoveInventory("VibratingEgg", 1);
		CurrentTime = CurrentTime + 60000;
	}	

	// When the user wants to use the collar (+20 submission and a ceremony is required)
	if ((C007_LunchBreak_Sarah_CurrentStage == 250) && (ClickInv == "Collar") && !ActorHasInventory("Collar"))
		OverridenIntroText = GetText("Collar");

	// Recalculates the scene parameters
	C007_LunchBreak_Sarah_CalcParams();

}

// Chapter 7 - Sarah Start Lunch
function C007_LunchBreak_Sarah_StartLunch() {	
	GameLogAdd("Lunch");
	CurrentTime = CurrentTime + 480000;
	LeaveIcon = "";
}

// Chapter 7 - Sarah End Lunch
function C007_LunchBreak_Sarah_EndLunch() {
	C007_LunchBreak_ActorSelect_SarahAvail = false;
}

// Chapter 7 - Sarah Good Match
function C007_LunchBreak_Sarah_GoodMatch() {
	C007_LunchBreak_Sarah_MatchCount++;
	C007_LunchBreak_Sarah_CalcParams();
}

// Chapter 7 - Sarah Bad Match
function C007_LunchBreak_Sarah_BadMatch() {
	C007_LunchBreak_Sarah_MatchCount--;
	C007_LunchBreak_Sarah_CalcParams();
}

// Chapter 7 - Sarah Leave Stranded
function C007_LunchBreak_Sarah_LeaveStranded() {
	C007_LunchBreak_ActorSelect_EarlyLeave = true;
	SetScene(CurrentChapter, "Outro");
}

// Chapter 7 - Sarah Restroom Timer Start (it will run for 7 minutes)
function C007_LunchBreak_Sarah_RestroomTimerStart(GoodMatch) {
	if (GoodMatch) C007_LunchBreak_Sarah_MatchCount++;
	else C007_LunchBreak_Sarah_MatchCount--;
	C007_LunchBreak_Sarah_RestroomTimer = CurrentTime + 420000;
}

// Chapter 7 - Sarah Restroom Timer Run (it will run for 7 minutes)
function C007_LunchBreak_Sarah_RestroomTimerRun() {
	if (CurrentTime >= C007_LunchBreak_Sarah_RestroomTimer) {
		OverridenIntroText = GetText("BackFromRestroom");
		C007_LunchBreak_Sarah_CurrentStage = 190;
		C007_LunchBreak_Sarah_CalcParams();
	}
}

// Chapter 7 - Sarah Test Restroom door (Sarah will let the player enter if there's a good match +3 or more)
function C007_LunchBreak_Sarah_RestroomTestDoor() {
	if (C007_LunchBreak_Sarah_MatchCount >= 4) {
		GameLogAdd("LunchBonus");
		OverridenIntroText = GetText("OpenRestroomDoor");
		C007_LunchBreak_Sarah_CurrentStage = 200;
		C007_LunchBreak_Sarah_CalcParams();
	}
}

// Chapter 7 - Sarah Strip
function C007_LunchBreak_Sarah_Strip() {
	PlayerClothes("Naked");
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sarah Dress
function C007_LunchBreak_Sarah_Dress() {
	PlayerClothes("Clothed");
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sarah Bonus Done
function C007_LunchBreak_Sarah_BonusDone() {
	C007_LunchBreak_ActorSelect_BonusDone = true;
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Sarah Make Love (for Sarah to orgasm, she needs 3 stimulations and violence or the egg)
function C007_LunchBreak_Sarah_MakeLove() {
	C007_LunchBreak_Sarah_LoveCount++;
	if ((C007_LunchBreak_Sarah_LoveCount >= 3) && (C007_LunchBreak_Sarah_ViolenceDone || ActorHasInventory("VibratingEgg"))) {
		OverridenIntroText = GetText("Orgasm");
		ActorAddOrgasm();
		C007_LunchBreak_Sarah_CurrentStage = 260;
	}
}

// Chapter 7 - Sarah Violence
function C007_LunchBreak_Sarah_Violence() {
	if (C007_LunchBreak_Sarah_ViolenceDone == false) {
		C007_LunchBreak_Sarah_ViolenceDone = true;
		ActorChangeAttitude(1, 1);
	}
}

// Chapter 7 - Sarah Untie
function C007_LunchBreak_Sarah_Untie() {
	if (ActorHasInventory("Rope")) {
		ActorRemoveInventory("Rope");
		PlayerAddInventory("Rope", 1);		
		if (C007_LunchBreak_Sarah_TwoRopes) {
			PlayerAddInventory("Rope", 1);
			C007_LunchBreak_Sarah_TwoRopes = false;
		}
		C007_LunchBreak_Sarah_IsRoped = false;
	}
}

// Chapter 7 - Sarah Ungag
function C007_LunchBreak_Sarah_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("BallGag")) {
		ActorRemoveInventory("BallGag");
		PlayerAddInventory("BallGag", 1);
	}
	C007_LunchBreak_Sarah_IsGagged = false;
}

// Chapter 7 - Sarah Release
function C007_LunchBreak_Sarah_Release() {
	C007_LunchBreak_Sarah_Untie();
	C007_LunchBreak_Sarah_Ungag();	
	if (ActorHasInventory("Cuffs")) {
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
	}
}

// Chapter 7 - Sarah Eat Lunch (Requires 15 minutes)
function C007_LunchBreak_Sarah_EatLunch() {
	C007_LunchBreak_Sarah_RestroomTimer = CurrentTime + 900000;
}

// Chapter 7 - Sarah End Chapter
function C007_LunchBreak_Sarah_EndChapter() {
	SetScene(CurrentChapter, "Outro");
}

// Chapter 7 - Sarah Evil End Chapter (Leave her bound and gagged)
function C007_LunchBreak_Sarah_EvilEnd() {
	if (C007_LunchBreak_Sarah_ConfirmEvil) {
		C007_LunchBreak_ActorSelect_EvilEnding = true;
		GameLogAdd("Stranded");
		ActorChangeAttitude(-5, 1);
		SetScene(CurrentChapter, "Outro");		
	} else {
		OverridenIntroText = GetText("LeaveBoundAndGagged");
		C007_LunchBreak_Sarah_ConfirmEvil = true;
	}
}

// Chapter 7 - Sarah Kiss
function C007_LunchBreak_Sarah_Kiss() {
	GameLogAdd("Kiss");
}

// Chapter 7 - Sarah can give an armbinder at the end if she was happy at lunch
function C007_LunchBreak_Sarah_TestArmbinder() {
	if (!GameLogQuery(CurrentChapter, CurrentActor, "Orgasm"))
		C007_LunchBreak_Sarah_EndChapter();
	else
		CurrentTime = CurrentTime + 300000;
}

// Chapter 7 - Sarah  give an armbinder
function C007_LunchBreak_Sarah_AddArmbinder() {
	PlayerAddInventory("Armbinder", 1);
}