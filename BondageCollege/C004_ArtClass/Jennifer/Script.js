var C004_ArtClass_Jennifer_CurrentStage = 0;
var C004_ArtClass_Jennifer_JuliaStrip = false;
var C004_ArtClass_Jennifer_UnderwearDone = false;
var C004_ArtClass_Jennifer_NakedDone = false;
var C004_ArtClass_Jennifer_RopeDone = false;
var C004_ArtClass_Jennifer_GagDone = false;
var C004_ArtClass_Jennifer_KissReady = true;
var C004_ArtClass_Jennifer_TightenDone = false;
var C004_ArtClass_Jennifer_TickleDone = false;
var C004_ArtClass_Jennifer_CropDone = false;
var C004_ArtClass_Jennifer_TrustCommentDone = false;
var C004_ArtClass_Jennifer_EggCommentDone = false;
var C004_ArtClass_Jennifer_CanBegForRelease = false;
var C004_ArtClass_Jennifer_PityDone = false;
var C004_ArtClass_Jennifer_EggConfirm = false;
var C004_ArtClass_Jennifer_EggInside = false;
var C004_ArtClass_Jennifer_StunningBeautyReady = true;
var C004_ArtClass_Jennifer_PaintAvail = true;

// Chapter 4 - Jennifer Load
function C004_ArtClass_Jennifer_Load() {

	// Load the scene parameters	
	ActorLoad("Jennifer", "ArtRoom");
	LoadInteractions();
	C004_ArtClass_Jennifer_EggConfirm = false;
	C004_ArtClass_Jennifer_JuliaStrip = (C004_ArtClass_ArtRoom_JuliaStage >= 2);
	
	// Jumps to the correct stage
	if ((C004_ArtClass_ArtRoom_ExtraModel == "Jennifer") && (C004_ArtClass_Jennifer_CurrentStage < 100)) C004_ArtClass_Jennifer_CurrentStage = 100;
	if ((C004_ArtClass_ArtRoom_ExtraModel != "") && (C004_ArtClass_ArtRoom_ExtraModel != "Jennifer")) C004_ArtClass_Jennifer_CurrentStage = 80;

	// If we allow the player to beg to be released
	C004_ArtClass_Jennifer_CanBegForRelease = ((C004_ArtClass_ArtRoom_ExtraModel == "Player") && Common_PlayerRestrained && Common_PlayerNotGagged);
	
	// A player with seduction has an extra option
	if (PlayerGetSkillLevel("Seduction") == 0) C004_ArtClass_Jennifer_StunningBeautyReady = false;
	
}

// Chapter 4 - Jennifer Run
function C004_ArtClass_Jennifer_Run() {
	BuildInteraction(C004_ArtClass_Jennifer_CurrentStage);
}

// Chapter 4 - Jennifer Click
function C004_ArtClass_Jennifer_Click() {

	// Regular interactions
	ClickInteraction(C004_ArtClass_Jennifer_CurrentStage);
	var ClickInv = GetClickedInventory();

	// When the user wants to use any item and bondage isn't allowed
	if (!Common_BondageAllowed && ((ClickInv == "Rope") || (ClickInv == "BallGag") || (ClickInv == "TapeGag") || (ClickInv == "Crop") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg")) && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("NoBondage");

	// The player can convince Jennifer to help with a crop
	if (!Common_BondageAllowed && (C004_ArtClass_Jennifer_CurrentStage == 50) && (ClickInv == "Crop") && Common_PlayerNotRestrained) {
		C004_ArtClass_Jennifer_SandroComment();
		OverridenIntroText = GetText("CropForInfo");
		ActorChangeAttitude(-1, 1);
		C004_ArtClass_Jennifer_CurrentStage = 60;
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the rope
	if (Common_BondageAllowed && (C004_ArtClass_Jennifer_CurrentStage >= 120) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		if (ActorGetValue(ActorSubmission) < 3) {
			OverridenIntroText = GetText("RefuseBondage");
		} else {
			OverridenIntroText = GetText("Bondage");
			C004_ArtClass_Jennifer_CurrentStage = 130;
			C004_ArtClass_ArtRoom_JenniferStage = 3;
			ActorAddInventory("Rope");
			PlayerRemoveInventory("Rope", 1);
			CurrentTime = CurrentTime + 60000;
		}
	}
	
	// When the user wants to use a gag without tying her
	if (Common_BondageAllowed && ((ClickInv == "BallGag") || (ClickInv == "TapeGag")) && !ActorHasInventory("Rope") && !ActorHasInventory("BallGag") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("NoGag");
		
	// When the user wants to use a BallGag	
	if (Common_BondageAllowed && (ClickInv == "BallGag") && ActorHasInventory("Rope") && !ActorHasInventory("BallGag") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("BallGag");
		C004_ArtClass_Jennifer_CurrentStage = 140;
		C004_ArtClass_Jennifer_Ungag();
		C004_ArtClass_ArtRoom_JenniferStage = 4;
		ActorAddInventory("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use a tape gag
	if (Common_BondageAllowed && (ClickInv == "TapeGag") && ActorHasInventory("Rope") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("TapeGag");
		C004_ArtClass_Jennifer_CurrentStage = 150;
		C004_ArtClass_Jennifer_Ungag();
		C004_ArtClass_ArtRoom_JenniferStage = 5;
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the crop
	if (Common_BondageAllowed && (ClickInv == "Crop") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("Crop");
		if (C004_ArtClass_Jennifer_CropDone == false) { C004_ArtClass_Jennifer_CropDone = true; ActorChangeAttitude(-1, 1); }
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the user wants to use the vibrating egg on Jennifer
	if (Common_BondageAllowed && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {		
		if (C004_ArtClass_Jennifer_EggConfirm == false) {
			C004_ArtClass_Jennifer_EggConfirm = true;
			OverridenIntroText = GetText("VibratingEggWarning");
		} else {
			ActorAddInventory("VibratingEgg");
			PlayerRemoveInventory("VibratingEgg", 1);
			ActorChangeAttitude(-1, 0);
			OverridenIntroText = GetText("VibratingEggInsert");
			C004_ArtClass_Jennifer_EggInside = true;
		}
	}

}

// Chapter 4 - Jennifer Sandro Comment - Start Julia Stage 1
function C004_ArtClass_Jennifer_SandroComment() {
	if (C004_ArtClass_ArtRoom_JuliaStage == 0) 
		C004_ArtClass_ArtRoom_JuliaStage = 1;
}

// Chapter 4 - Jennifer Set Clothes Level
function C004_ArtClass_Jennifer_SetCloth(Stage, LoveMod, SubMod) {
	C004_ArtClass_ArtRoom_JenniferStage = Stage;
	if ((Stage == 1) && (C004_ArtClass_Jennifer_UnderwearDone == false)) { C004_ArtClass_Jennifer_UnderwearDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 2) && (C004_ArtClass_Jennifer_NakedDone == false)) { C004_ArtClass_Jennifer_NakedDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 3) && (C004_ArtClass_Jennifer_RopeDone == false)) { C004_ArtClass_Jennifer_RopeDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 4) && (C004_ArtClass_Jennifer_GagDone == false)) { C004_ArtClass_Jennifer_GagDone = true; ActorChangeAttitude(LoveMod, SubMod); }
}

// Chapter 4 - Jennifer Untie
function C004_ArtClass_Jennifer_Untie() {
	C004_ArtClass_ArtRoom_JenniferStage = 2;
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
}

// Chapter 4 - Jennifer Ungag
function C004_ArtClass_Jennifer_Ungag() {
	C004_ArtClass_ArtRoom_JenniferStage = 3;
	if (ActorHasInventory("BallGag")) {
		PlayerAddInventory("BallGag", 1);
		ActorRemoveInventory("BallGag");
	}
	ActorRemoveInventory("TapeGag");
}

// Chapter 4 - Jennifer Kiss
function C004_ArtClass_Jennifer_Kiss() {
	C004_ArtClass_Jennifer_KissReady = false;
	if (Common_PlayerGagged) OverridenIntroText = GetText("GaggedKiss");
	GameLogAdd("Kiss");
}

// Chapter 4 - Jennifer Tighten
function C004_ArtClass_Jennifer_Tighten() {
	if (Common_PlayerNotRestrained) {
		if (C004_ArtClass_Jennifer_TightenDone == false) {
			if (C004_ArtClass_Jennifer_CurrentStage >= 140) OverridenIntroText = GetText("TightenGagged");
			else OverridenIntroText = GetText("Tighten");
			ActorChangeAttitude(-1, 1);
			C004_ArtClass_Jennifer_TightenDone = true;
		}
	} else {
		OverridenIntroText = GetText("TightenFail");
	}
}

// Chapter 4 - Jennifer Tickle
function C004_ArtClass_Jennifer_Tickle() {
	if (C004_ArtClass_Jennifer_TickleDone == false) {
		if (Common_PlayerNotRestrained) OverridenIntroText = GetText("Tickle");
		else OverridenIntroText = GetText("TickleFail");
		ActorChangeAttitude(-1, 0);
		C004_ArtClass_Jennifer_TickleDone = true;
	}
}

// Chapter 4 - Jennifer Trust Comment
function C004_ArtClass_Jennifer_TrustComment() {
	if (C004_ArtClass_Jennifer_TrustCommentDone == false) {
		C004_ArtClass_Jennifer_TrustCommentDone = true;
		ActorChangeAttitude(1, 0);
		OverridenIntroText = GetText("EarnTrust");
	}
}

// Chapter 4 - Jennifer Egg Comment
function C004_ArtClass_Jennifer_EggComment() {
	if (C004_ArtClass_Jennifer_EggCommentDone == false) {
		C004_ArtClass_Jennifer_EggCommentDone = true;
		ActorChangeAttitude(0, 1);
		OverridenIntroText = GetText("EggComment");
	}
}

// Chapter 4 - Jennifer Beg for Release
function C004_ArtClass_Jennifer_BegForRelease() {
	if (ActorGetValue(ActorLove) >= 3) {
		OverridenIntroText = GetText("PlayerUntie");
		PlayerUnlockInventory("Rope");
		PlayerAddInventory("Rope", 1);
		C004_ArtClass_Jennifer_CanBegForRelease = false;
		CurrentTime = CurrentTime + 60000;
	} else {
		OverridenIntroText = GetText("PlayerStayTied");
	}
}

// Chapter 4 - Jennifer Pity
function C004_ArtClass_Jennifer_PityComment() {
	if (C004_ArtClass_Jennifer_PityDone == false) {
		ActorChangeAttitude(1, 0);
		C004_ArtClass_Jennifer_PityDone = true;
	}
}

// Chapter 4 - Jennifer stunning beauty comment
function C004_ArtClass_Jennifer_StunningBeauty() {
	C004_ArtClass_Jennifer_StunningBeautyReady = false;
	ActorChangeAttitude(1, 0);
}

// Chapter 4 - Jennifer Paint, can only be done if there's 30 minutes left for the class
function C004_ArtClass_Jennifer_Paint() {
	if (CurrentTime <= 9.75 * 60 * 60 * 1000) {
		C004_ArtClass_Sarah_PaintAvail = false;
		C004_ArtClass_Jennifer_PaintAvail = false;
		C004_ArtClass_Julia_PaintAvail = false;
		ActorChangeAttitude(0, 2);
		GameLogAdd("Paint");
		CurrentTime = CurrentTime + 0.5 * 60 * 60 * 1000;
		if (PlayerGetSkillLevel("Arts") >= 1) {
			ActorSpecificChangeAttitude("Julia", PlayerGetSkillLevel("Arts"), 0);
			ActorSpecificChangeAttitude("Sarah", PlayerGetSkillLevel("Arts"), 0);
			ActorSpecificChangeAttitude("Jennifer", PlayerGetSkillLevel("Arts"), 0);
		}
		PlayerAddSkill("Arts", 1);
	} else OverridenIntroText = GetText("NoTimeToPaint");
}