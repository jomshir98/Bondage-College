var C007_LunchBreak_Jennifer_CurrentStage = 0;
var C007_LunchBreak_Jennifer_MatchCount = 0; // At 4 or more, there's a good match
var C007_LunchBreak_Jennifer_IntroText = "";
var C007_LunchBreak_Jennifer_LeaveIcon = "";
var C007_LunchBreak_Jennifer_NoOption = false;
var C007_LunchBreak_Jennifer_HasEgg = false;
var C007_LunchBreak_Jennifer_EggRemarkAvail = false;
var C007_LunchBreak_Jennifer_EggRemarkDone = false;
var C007_LunchBreak_Jennifer_TennisDifficulty = "";
var C007_LunchBreak_Jennifer_TennisVictory = false;
var C007_LunchBreak_Jennifer_AllowObey = false;
var C007_LunchBreak_Jennifer_IsGagged = false;
var C007_LunchBreak_Jennifer_IsRoped = false;
var C007_LunchBreak_Jennifer_IsBoundAndGagged = false;
var C007_LunchBreak_Jennifer_ExerciseCount = 0;
var C007_LunchBreak_Jennifer_NeverHurtAvail = true;
var C007_LunchBreak_Jennifer_TickleDone = false;
var C007_LunchBreak_Jennifer_SpankDone = false;
var C007_LunchBreak_Jennifer_ConfirmEvil = false;
var C007_LunchBreak_Jennifer_MasturbateCount = 0;
var C007_LunchBreak_Jennifer_OrgasmDone = false;
var C007_LunchBreak_Jennifer_OrgasmCommentAvail = false;
var C007_LunchBreak_Jennifer_PushUpQuality = 0;
var C007_LunchBreak_Jennifer_PushUpCount = 0;
var C007_LunchBreak_Jennifer_RacketQuality = 0;
var C007_LunchBreak_Jennifer_HasRestrainsAvail = false;
var C007_LunchBreak_Jennifer_HasSeduction = false;
var	C007_LunchBreak_Jennifer_JudoVictory = false;
var C007_LunchBreak_Jennifer_JudoDefeat = false;

// Calculates the screen parameters
function C007_LunchBreak_Jennifer_CalcParams() {

	// No special images by default
	OverridenIntroImage = "";

	// Between 100 and 199, the image evolves with the number of matches
	if ((C007_LunchBreak_Jennifer_CurrentStage >= 100) && (C007_LunchBreak_Jennifer_CurrentStage <= 199)) {
		var Img = "0";
		if ((C007_LunchBreak_Jennifer_MatchCount == 2) || (C007_LunchBreak_Jennifer_MatchCount == 3)) Img = "1";
		if (C007_LunchBreak_Jennifer_MatchCount >= 4) Img = "2";
		OverridenIntroImage = "JenniferPlayerLunch" + Img + ".jpg";
	}
	
	// At 240 the player can restrain Jennifer
	if (C007_LunchBreak_Jennifer_CurrentStage == 240) {
		var Img = "";
		if (ActorHasInventory("Rope")) Img = Img + "Rope";
		if (ActorHasInventory("Cuffs")) Img = Img + "Cuffs";
		if (ActorHasInventory("BallGag")) Img = Img + "BallGag";
		if (ActorHasInventory("TapeGag")) Img = Img + "TapeGag";
		OverridenIntroImage = "JenniferStrip" + Img + ".jpg";
	}

	// At 460 the player can be restrained
	if (C007_LunchBreak_Jennifer_CurrentStage == 460) {
		var Img = "";
		if (PlayerHasLockedInventory("Rope")) Img = Img + "Rope";
		if (PlayerHasLockedInventory("Cuffs")) Img = Img + "Cuffs";
		if (PlayerHasLockedInventory("BallGag")) Img = Img + "BallGag";
		if (PlayerHasLockedInventory("TapeGag")) Img = Img + "TapeGag";
		OverridenIntroImage = "JenniferPlayerPunishRacket" + Img + ".jpg";
	}
	
	// If love and submission are below 4, there's no option for lunch
	C007_LunchBreak_Jennifer_IsBoundAndGagged = ((ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) && (ActorHasInventory("BallGag") || ActorHasInventory("TapeGag")));
	C007_LunchBreak_Jennifer_NoOption = ((ActorGetValue(ActorLove) <= 3) && (ActorGetValue(ActorSubmission) <= 3));
	C007_LunchBreak_Jennifer_HasEgg = ActorHasInventory("VibratingEgg");
	C007_LunchBreak_Jennifer_HasRestrainsAvail = ((PlayerHasInventory("Rope") || (PlayerHasInventory("Cuffs") && PlayerHasInventory("CuffsKey"))) && Common_PlayerNotRestrained)

}

// Chapter 7 - Jennifer Load
function C007_LunchBreak_Jennifer_Load() {

	// Load the scene parameters
	ActorLoad("Jennifer", "ActorSelect");
	LoadInteractions();
	C007_LunchBreak_Jennifer_CalcParams();
	C007_LunchBreak_Jennifer_HasSeduction = (PlayerGetSkillLevel("Seduction") >= 1);
	C007_LunchBreak_Jennifer_JudoVictory = GameLogQuery("C005_GymClass", "Jennifer", "FightVictory");
	C007_LunchBreak_Jennifer_JudoDefeat = GameLogQuery("C005_GymClass", "Jennifer", "FightDefeat");

	// If Jennifer doesn't like the player, she will run away from the start
	if ((ActorGetValue(ActorLove) <= -3) && (ActorGetValue(ActorSubmission) <= 3)) {
		OverridenIntroText = GetText("SkipIntro");
		C007_LunchBreak_Jennifer_CurrentStage = 90;
		C007_LunchBreak_ActorSelect_JenniferAvail = false;
	}

	// If Jennifer had the egg from before chapter 7, there's a special intro
	if ((C007_LunchBreak_Jennifer_CurrentStage == 0) && ActorHasInventory("VibratingEgg")) {
		OverridenIntroText = GetText("IntroEgg");
		C007_LunchBreak_Jennifer_EggRemarkAvail = !C007_LunchBreak_Jennifer_EggRemarkDone;
	}

	// If we must put the previous text back
	if ((C007_LunchBreak_Jennifer_IntroText != "") && (C007_LunchBreak_Jennifer_CurrentStage > 0)) {
		OverridenIntroText = C007_LunchBreak_Jennifer_IntroText;
		LeaveIcon = C007_LunchBreak_Jennifer_LeaveIcon;
	}

	// From lunch an up, the player cannot leave directly
	if (C007_LunchBreak_Jennifer_CurrentStage >= 100) {
		LeaveIcon = "";		
	}

}

// Chapter 7 - Jennifer Run
function C007_LunchBreak_Jennifer_Run() {
	BuildInteraction(C007_LunchBreak_Jennifer_CurrentStage);
}

// Chapter 7 - Jennifer Click
function C007_LunchBreak_Jennifer_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C007_LunchBreak_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C007_LunchBreak_Jennifer_IntroText = OverridenIntroText;
		C007_LunchBreak_Jennifer_LeaveIcon = LeaveIcon;
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
	// When the user wants to use the rope
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Rope");
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Jennifer_IsRoped = true;
	}
	
	// When the user wants to use the cuffs
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "Cuffs") && !ActorHasInventory("Rope") && !ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Cuffs");
		ActorAddInventory("Cuffs");
		PlayerRemoveInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the BallGag
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "BallGag") && !ActorHasInventory("BallGag")) {
		OverridenIntroText = GetText("BallGag");
		ActorRemoveInventory("TapeGag");
		ActorAddInventory("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Jennifer_IsGagged = true;
	}
	
	// When the user wants to use the tape gag
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "TapeGag") && !ActorHasInventory("TapeGag")) {
		OverridenIntroText = GetText("TapeGag");		
		C007_LunchBreak_Jennifer_Ungag();
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
		C007_LunchBreak_Jennifer_IsGagged = true;
	}
	
	// When the user wants to use the cuffs keys
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "CuffsKey") && ActorHasInventory("Cuffs")) {
		OverridenIntroText = GetText("Uncuff");
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the crop
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "Crop")) {
		OverridenIntroText = GetText("Crop");
		if (C007_LunchBreak_Jennifer_CropDone == false) { C007_LunchBreak_Jennifer_CropDone = true; ActorChangeAttitude(-1, 1); }
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the egg
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg")) {
		
		// It only works if Jennifer is restrained
		if (ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) {
			OverridenIntroText = GetText("VibratingEgg");
			ActorAddInventory("VibratingEgg");
			PlayerRemoveInventory("VibratingEgg", 1);
			ActorChangeAttitude(-1, 0);
		} else {
			OverridenIntroText = GetText("VibratingEggFail");
		}
		CurrentTime = CurrentTime + 60000;
	}	

	// When the user wants to use the collar (+20 submission and a ceremony is required)
	if ((C007_LunchBreak_Jennifer_CurrentStage == 240) && (ClickInv == "Collar") && !ActorHasInventory("Collar"))
		OverridenIntroText = GetText("Collar");
		
	// Recalculates the scene parameters
	C007_LunchBreak_Jennifer_CalcParams();

}

// Chapter 7 - Jennifer Egg Remark
function C007_LunchBreak_Jennifer_EggRemark() {
	C007_LunchBreak_Jennifer_EggRemarkDone = true;
	C007_LunchBreak_Jennifer_EggRemarkAvail = false;
}

// Chapter 7 - Jennifer End Lunch
function C007_LunchBreak_Jennifer_EndLunch() {
	C007_LunchBreak_ActorSelect_JenniferAvail = false;
}

// Chapter 7 - Jennifer Play Tennis (adds 5 minutes)
function C007_LunchBreak_Jennifer_PlayTennis(Difficulty) {
	GameLogAdd("Lunch");
	CurrentTime = CurrentTime + 300000;
	C007_LunchBreak_Jennifer_IntroText = "";
	C007_LunchBreak_Jennifer_LeaveIcon = "";
	PlayerClothes("Tennis");
	C007_LunchBreak_Jennifer_TennisDifficulty = Difficulty;
	SetScene(CurrentChapter, "JenniferTennis");
}

// Chapter 7 - Jennifer Good Match
function C007_LunchBreak_Jennifer_GoodMatch() {
	C007_LunchBreak_Jennifer_MatchCount++;
	C007_LunchBreak_Jennifer_CalcParams();
}

// Chapter 7 - Jennifer Bad Match
function C007_LunchBreak_Jennifer_BadMatch() {
	C007_LunchBreak_Jennifer_MatchCount--;
	C007_LunchBreak_Jennifer_CalcParams();
}

// Chapter 7 - Jennifer Eat Lunch (Adds 15 minutes)
function C007_LunchBreak_Jennifer_EatLunch() {	
	CurrentTime = CurrentTime + 900000;
}

// Chapter 7 - Jennifer - Test if Jennifer/Player can obey for the bonus scene
function C007_LunchBreak_Jennifer_TestObey() {
	if (C007_LunchBreak_Jennifer_MatchCount >= 4) {
		C007_LunchBreak_Jennifer_AllowObey = true;
		if (C007_LunchBreak_Jennifer_TennisVictory) OverridenIntroText = GetText("JenniferObey");
		else OverridenIntroText = GetText("PlayerObey");
	}
}

// Chapter 7 - Jennifer Untie
function C007_LunchBreak_Jennifer_Untie() {
	if (ActorHasInventory("Rope")) {
		ActorRemoveInventory("Rope");
		PlayerAddInventory("Rope", 1);		
		C007_LunchBreak_Jennifer_IsRoped = false;
	}
}

// Chapter 7 - Jennifer Ungag
function C007_LunchBreak_Jennifer_Ungag() {
	ActorRemoveInventory("TapeGag");
	if (ActorHasInventory("BallGag")) {
		ActorRemoveInventory("BallGag");
		PlayerAddInventory("BallGag", 1);
	}
	C007_LunchBreak_Jennifer_IsGagged = false;
}

// Chapter 7 - Jennifer Release
function C007_LunchBreak_Jennifer_Release() {
	C007_LunchBreak_Jennifer_Untie();
	C007_LunchBreak_Jennifer_Ungag();	
	if (ActorHasInventory("Cuffs")) {
		ActorRemoveInventory("Cuffs");
		PlayerAddInventory("Cuffs", 1);
	}
}

// Chapter 7 - Jennifer Enter Tennis Court (Adds 5 minutes)
function C007_LunchBreak_Jennifer_EnterTennis() {
	GameLogAdd("LunchBonus");
	CurrentTime = CurrentTime + 300000;
}

// Chapter 7 - Jennifer Exercise (Can raise the Domme level twice)
function C007_LunchBreak_Jennifer_Exercise() {
	C007_LunchBreak_Jennifer_ExerciseCount++;
	if (C007_LunchBreak_Jennifer_ExerciseCount <= 2) ActorChangeAttitude(0, 1);
}

// Chapter 7 - Jennifer - Flag the bonus as done
function C007_LunchBreak_Jennifer_BonusDone() {
	C007_LunchBreak_ActorSelect_BonusDone = true;
}

// Chapter 7 - Jennifer - Never hurt comment
function C007_LunchBreak_Jennifer_NeverHurtComment() {
	C007_LunchBreak_Jennifer_NeverHurtAvail = false;
	ActorChangeAttitude(1, 0);
}

// Chapter 7 - Jennifer - Orgasm Comment
function C007_LunchBreak_Jennifer_OrgasmComment() {
	C007_LunchBreak_Jennifer_OrgasmCommentAvail = false;
}

// Chapter 7 - Jennifer - Tickle
function C007_LunchBreak_Jennifer_Tickle() {
	if (!C007_LunchBreak_Jennifer_TickleDone) {
		ActorChangeAttitude(-1, 0);
		C007_LunchBreak_Jennifer_TickleDone = true;
	}
}

// Chapter 7 - Jennifer - Spank
function C007_LunchBreak_Jennifer_Spank() {
	if (ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) {
		if (!C007_LunchBreak_Jennifer_SpankDone) {
			ActorChangeAttitude(0, 1);
			C007_LunchBreak_Jennifer_SpankDone = true;
		}
		OverridenIntroText = GetText("Spank");
	}
}

// Chapter 7 - Jennifer - Masturbate (requires an egg and 3 tries)
function C007_LunchBreak_Jennifer_Masturbate() {
	if (ActorHasInventory("Rope") || ActorHasInventory("Cuffs")) {
		C007_LunchBreak_Jennifer_MasturbateCount++;
		if (ActorHasInventory("VibratingEgg")) {
			if ((C007_LunchBreak_Jennifer_MasturbateCount >= 3) && !C007_LunchBreak_Jennifer_OrgasmDone) {
				ActorAddOrgasm();
				ActorChangeAttitude(1, 0);
				C007_LunchBreak_ActorSelect_BonusDone = true;
				C007_LunchBreak_Jennifer_OrgasmDone = true;
				C007_LunchBreak_Jennifer_OrgasmCommentAvail = true;
				OverridenIntroText = GetText("MasturbateOrgasm");
			} else OverridenIntroText = GetText("MasturbateEgg");
		} else OverridenIntroText = GetText("MasturbateNoEgg");
	}
}

// Chapter 7 - Jennifer Evil End Chapter (Leave her bound and gagged)
function C007_LunchBreak_Jennifer_EvilEnd() {
	if (C007_LunchBreak_Jennifer_ConfirmEvil) {
		C007_LunchBreak_ActorSelect_EvilEnding = true;
		GameLogAdd("Stranded");
		ActorChangeAttitude(-5, 1);
		SetScene(CurrentChapter, "Outro");
	} else {
		OverridenIntroText = GetText("LeaveBoundAndGagged");
		C007_LunchBreak_Jennifer_ConfirmEvil = true;
	}
}

// Chapter 7 - Jennifer - Dress her back
function C007_LunchBreak_Jennifer_DressHerBack() {
	C007_LunchBreak_Jennifer_Release();
	CurrentTime = CurrentTime + 60000;
}

// Chapter 7 - Jennifer ask the player to do 10 push-up, the parameter is the push-up quality
function C007_LunchBreak_Jennifer_PushUp(Quality) {
	
	// Keeps the count and shows it
	C007_LunchBreak_Jennifer_PushUpQuality = C007_LunchBreak_Jennifer_PushUpQuality + Quality;
	C007_LunchBreak_Jennifer_PushUpCount++;
	OverridenIntroText = GetText("Count" + C007_LunchBreak_Jennifer_PushUpCount.toString()) + " " + GetText("PushUpQuality" + Quality.toString());

	// Stops at 10, if quality isn't great the player gets punished
	if (C007_LunchBreak_Jennifer_PushUpCount >= 10) {
		if (C007_LunchBreak_Jennifer_PushUpQuality >= 20) {
			C007_LunchBreak_Jennifer_CurrentStage = 340;
			C007_LunchBreak_ActorSelect_BonusDone = true;
			GameLogAdd("PushUpSuccess");
			OverridenIntroText = GetText("PushUpSuccess");
		} else {
			C007_LunchBreak_Jennifer_CurrentStage = 400;
			GameLogAdd("PushUpFail");
			OverridenIntroText = GetText("PushUpFail");			
		}
	}

}

// Chapter 7 - Jennifer - When the player strips
function C007_LunchBreak_Jennifer_Strip() {
	PlayerClothes("Underwear");
}

// Chapter 7 - Jennifer - When the player dress back
function C007_LunchBreak_Jennifer_DressBack() {
	PlayerClothes("Tennis");
}

// Chapter 7 - Jennifer - When Jennifer hits the player with her racket
function C007_LunchBreak_Jennifer_RacketHit(Quality) {
	C007_LunchBreak_Jennifer_RacketQuality = C007_LunchBreak_Jennifer_RacketQuality + Quality;
	if (C007_LunchBreak_Jennifer_RacketQuality >= 10) {
		C007_LunchBreak_Jennifer_CurrentStage = 470;
		C007_LunchBreak_ActorSelect_BonusDone = true;
		ActorChangeAttitude(0, -1);
		if (PlayerHasLockedInventory("Cuffs") || PlayerHasLockedInventory("Rope")) OverridenIntroText = GetText("ReleaseRacket");
		else OverridenIntroText = GetText("StopRacket");
		PlayerReleaseBondage();
	}
}

// Chapter 7 - Jennifer - When Jennifer checks the player bag
function C007_LunchBreak_Jennifer_CheckBag() {
	HasRestrainsAvail = false;
	PlayerRandomBondage();
}

// Chapter 7 - Jennifer End Chapter
function C007_LunchBreak_Jennifer_EndChapter() {
	C007_LunchBreak_Jennifer_Release();
	SetScene(CurrentChapter, "Outro");
}

// Chapter 7 - Jennifer Kiss
function C007_LunchBreak_Jennifer_Kiss() {
	GameLogAdd("Kiss");
}