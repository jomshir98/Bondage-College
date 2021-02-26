var C004_ArtClass_Sarah_CurrentStage = 0;
var C004_ArtClass_Sarah_IsModel = false;
var C004_ArtClass_Sarah_BondageDone = false;
var C004_ArtClass_Sarah_UnderwearDone = false;
var C004_ArtClass_Sarah_NakedDone = false;
var C004_ArtClass_Sarah_RopeDone = false;
var C004_ArtClass_Sarah_GagDone = false;
var C004_ArtClass_Sarah_GetTapeDone = false;
var C004_ArtClass_Sarah_GetTapeAvail = false;
var C004_ArtClass_Sarah_CropDone = false;
var C004_ArtClass_Sarah_CollarRemarkReady = true;
var C004_ArtClass_Sarah_TightenDone = false;
var C004_ArtClass_Sarah_CanBegForRelease = false;
var C004_ArtClass_Sarah_CanBeTied = false;
var C004_ArtClass_Sarah_CanBeBallGagged = false;
var C004_ArtClass_Sarah_BowHeadDone = false;
var C004_ArtClass_Sarah_EggConfirm = false;
var C004_ArtClass_Sarah_EggInside = false;
var C004_ArtClass_Sarah_CrotchRopeReady = false;
var C004_ArtClass_Sarah_OrgasmDone = false;
var C004_ArtClass_Sarah_PaintAvail = true;

// Chapter 4 - Sarah Load
function C004_ArtClass_Sarah_Load() {

	// Load the scene parameters	
	ActorLoad("Sarah", "ArtRoom");
	LoadInteractions();
	C004_ArtClass_Sarah_EggConfirm = false;
	C004_ArtClass_Sarah_BondageDone = ActorGetValue(ActorBondageCount);
	C004_ArtClass_Sarah_GetTapeAvail = (!C004_ArtClass_Sarah_GetTapeDone && Common_BondageAllowed && (C004_ArtClass_Sarah_CurrentStage >= 130));
	C004_ArtClass_Sarah_CanBegForRelease = ((C004_ArtClass_ArtRoom_ExtraModel == "Player") && Common_PlayerRestrained && Common_PlayerNotGagged);
	C004_ArtClass_Sarah_CanBeTied = ((C004_ArtClass_ArtRoom_ExtraModel == "Player") && Common_BondageAllowed && Common_PlayerNotRestrained && Common_PlayerNotGagged && Common_PlayerNaked && PlayerHasInventory("Rope"));
	C004_ArtClass_Sarah_CanBeBallGagged = ((C004_ArtClass_ArtRoom_ExtraModel == "Player") && Common_BondageAllowed && Common_PlayerRestrained && Common_PlayerNotGagged && Common_PlayerNaked && PlayerHasInventory("BallGag"));

	// Set the correct stage
	if ((C004_ArtClass_ArtRoom_JuliaStage == 2) && (C004_ArtClass_Sarah_CurrentStage < 50)) C004_ArtClass_Sarah_CurrentStage = 50;
	if ((C004_ArtClass_ArtRoom_JuliaStage == 3) && (C004_ArtClass_Sarah_CurrentStage < 100)) C004_ArtClass_Sarah_CurrentStage = 100;
	C004_ArtClass_Sarah_IsModel = (C004_ArtClass_ArtRoom_ExtraModel == "Sarah");
	if (C004_ArtClass_Sarah_IsModel && (C004_ArtClass_Sarah_CurrentStage <= 130)) OverridenIntroImage = "SarahPose.jpg";
	if (!C004_ArtClass_Sarah_IsModel && (C004_ArtClass_Sarah_CurrentStage > 130)) C004_ArtClass_Sarah_CurrentStage = 130;
	if ((C004_ArtClass_Sarah_CurrentStage >= 200) && (C004_ArtClass_Sarah_CurrentStage < 250)) C004_ArtClass_Sarah_CurrentStage = 170;
	if ((C004_ArtClass_Sarah_CurrentStage >= 250) && (C004_ArtClass_Sarah_CurrentStage < 300)) C004_ArtClass_Sarah_CurrentStage = 180;

}

// Chapter 4 - Sarah Run
function C004_ArtClass_Sarah_Run() {
	BuildInteraction(C004_ArtClass_Sarah_CurrentStage);
}

// Chapter 4 - Sarah Click
function C004_ArtClass_Sarah_Click() {

	// Regular interactions
	ClickInteraction(C004_ArtClass_Sarah_CurrentStage);	
	if (C004_ArtClass_Sarah_CurrentStage > 130) OverridenIntroImage = "";
	var ClickInv = GetClickedInventory();

	// When the user wants to use any item and bondage isn't allowed
	if (!Common_BondageAllowed && ((ClickInv == "Rope") || (ClickInv == "BallGag") || (ClickInv == "TapeGag") || (ClickInv == "Crop") || (ClickInv == "Cuffs") || (ClickInv == "VibratingEgg")) && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("NoBondage");
	
	// When the user wants to use the rope
	if (Common_BondageAllowed && (C004_ArtClass_Sarah_CurrentStage >= 150) && (ClickInv == "Rope") && !ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("Rope");
		C004_ArtClass_Sarah_CurrentStage = 160;
		C004_ArtClass_ArtRoom_SarahStage = 3;
		ActorAddInventory("Rope");
		PlayerRemoveInventory("Rope", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use a gag without tying her
	if (Common_BondageAllowed && ((ClickInv == "BallGag") || (ClickInv == "TapeGag")) && !ActorHasInventory("Rope") && !ActorHasInventory("BallGag") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("BondageBeforeGag");
		
	// When the user wants to use a BallGag	
	if (Common_BondageAllowed && (ClickInv == "BallGag") && ActorHasInventory("Rope") && !ActorHasInventory("BallGag") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("BallGag");
		C004_ArtClass_Sarah_CurrentStage = 170;
		C004_ArtClass_Sarah_Ungag();
		C004_ArtClass_ArtRoom_SarahStage = 4;
		ActorAddInventory("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use a tape gag
	if (Common_BondageAllowed && (ClickInv == "TapeGag") && ActorHasInventory("Rope") && !ActorHasInventory("TapeGag") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("TapeGag");
		C004_ArtClass_Sarah_CurrentStage = 180;
		C004_ArtClass_Sarah_Ungag();
		C004_ArtClass_ArtRoom_SarahStage = 5;
		ActorAddInventory("TapeGag");
		PlayerRemoveInventory("TapeGag", 1);
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the crop
	if (Common_BondageAllowed && (ClickInv == "Crop") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("Crop");
		if (C004_ArtClass_Sarah_CropDone == false) { C004_ArtClass_Sarah_CropDone = true; ActorChangeAttitude(1, 1); }
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the vibrating egg on Sarah
	if (Common_BondageAllowed && (ClickInv == "VibratingEgg") && !ActorHasInventory("VibratingEgg") && ActorHasInventory("Rope") && Common_PlayerNotRestrained) {		
		if (C004_ArtClass_Sarah_EggConfirm == false) {
			C004_ArtClass_Sarah_EggConfirm = true;
			OverridenIntroText = GetText("VibratingEggWarning");
		} else {
			ActorAddInventory("VibratingEgg");
			PlayerRemoveInventory("VibratingEgg", 1);
			ActorChangeAttitude(1, 0);
			OverridenIntroText = GetText("VibratingEggInsert");
			C004_ArtClass_Sarah_EggInside = true;
		}
	}
	
	// Set if the crotch robe/orgasm mode is ready
	C004_ArtClass_Sarah_CrotchRopeReady = (C004_ArtClass_Sarah_IsModel && ActorHasInventory("VibratingEgg") && !C004_ArtClass_Sarah_OrgasmDone);

}

// Chapter 4 - Sarah Shibari Comment - Start Julia Stage 4
function C004_ArtClass_Sarah_ShibariComment() {
	if (C004_ArtClass_ArtRoom_JuliaStage == 3) 
		C004_ArtClass_ArtRoom_JuliaStage = 4;
}

// Chapter 4 - Sarah Set Clothes Level
function C004_ArtClass_Sarah_SetCloth(Stage, LoveMod, SubMod) {
	C004_ArtClass_ArtRoom_SarahStage = Stage;
	if ((Stage == 1) && (C004_ArtClass_Sarah_UnderwearDone == false)) { C004_ArtClass_Sarah_UnderwearDone = true; ActorChangeAttitude(LoveMod, SubMod); }
	if ((Stage == 2) && (C004_ArtClass_Sarah_NakedDone == false)) { C004_ArtClass_Sarah_NakedDone = true; ActorChangeAttitude(LoveMod, SubMod); }
}

// Chapter 4 - Sarah Get Tape
function C004_ArtClass_Sarah_GetTape() {
	C004_ArtClass_Sarah_GetTapeDone = true;
	C004_ArtClass_Sarah_GetTapeAvail = false;
	PlayerAddInventory("TapeGag", 8);
}

// Chapter 4 - Sarah Untie
function C004_ArtClass_Sarah_Untie() {
	C004_ArtClass_ArtRoom_SarahStage = 2;
	ActorRemoveInventory("Rope");
	PlayerAddInventory("Rope", 1);
}

// Chapter 4 - Sarah Ungag
function C004_ArtClass_Sarah_Ungag() {
	C004_ArtClass_ArtRoom_SarahStage = 3;
	if (ActorHasInventory("BallGag")) {
		PlayerAddInventory("BallGag", 1);
		ActorRemoveInventory("BallGag");
	}
	ActorRemoveInventory("TapeGag");
}

// Chapter 4 - Sarah Collar Remark
function C004_ArtClass_Sarah_CollarRemark() {
	C004_ArtClass_Sarah_CollarRemarkReady = false;
}

// Chapter 4 - Sarah Tighten
function C004_ArtClass_Sarah_Tighten() {
	if (Common_PlayerNotRestrained) {
		if (C004_ArtClass_Sarah_TightenDone == false) {
			if (ActorHasInventory("BallGag") || ActorHasInventory("TapeGag")) OverridenIntroText = GetText("TightenGagged");
			else OverridenIntroText = GetText("Tighten");
			ActorChangeAttitude(1, 0);
			C004_ArtClass_Sarah_TightenDone = true;
		}
	} else {
		OverridenIntroText = GetText("TightenFail");
	}
}

// Chapter 4 - Sarah Beg For Release, it can trick the player
function C004_ArtClass_Sarah_BegForRelease() {
	if (ActorGetValue(ActorSubmission) >= 4) {
		OverridenIntroText = GetText("PlayerRelease");
		PlayerUnlockInventory("Rope");
		PlayerAddInventory("Rope", 1);
		C004_ArtClass_Sarah_CanBeBallGagged = false;
		CurrentTime = CurrentTime + 60000;
	} else {
		OverridenIntroText = GetText("PlayerGag");
		C004_ArtClass_Sarah_CanBegForRelease = false;
		C004_ArtClass_Sarah_CanBeBallGagged = false;
		PlayerLockInventory("TapeGag");
		CurrentTime = CurrentTime + 60000;
	}
}

// Chapter 4 - Sarah Tie Player
function C004_ArtClass_Sarah_TiePlayer() {
	PlayerRemoveInventory("Rope", 1);
	PlayerLockInventory("Rope");
	C004_ArtClass_Sarah_CanBeTied = false;
}

// Chapter 4 - Sarah BallGag Player
function C004_ArtClass_Sarah_BallGagPlayer() {
	PlayerRemoveInventory("BallGag", 1);
	PlayerLockInventory("BallGag");
	C004_ArtClass_Sarah_CanBeBallGagged = false;
}

// Chapter 4 - Sarah Bow Head
function C004_ArtClass_Sarah_BowHead() {
	if (C004_ArtClass_Sarah_BowHeadDone == false) {
		ActorChangeAttitude(0, -1);
		C004_ArtClass_Sarah_BowHeadDone = true;
	}
}

// Chapter 4 - Orgasm Phase Start, the player only has 1 shot for it
function C004_ArtClass_Sarah_OrgasmStart() {
	C004_ArtClass_Sarah_OrgasmDone = true;
	C004_ArtClass_Sarah_CrotchRopeReady = false;
}

// Chapter 4 - Sarah Orgasm
function C004_ArtClass_Sarah_Orgasm() {
	ActorAddOrgasm();
}

// Chapter 4 - Sarah Paint, can only be done if there's 30 minutes left for the class
function C004_ArtClass_Sarah_Paint() {
	if (CurrentTime <= 9.75 * 60 * 60 * 1000) {
		C004_ArtClass_Sarah_PaintAvail = false;
		C004_ArtClass_Jennifer_PaintAvail = false;
		C004_ArtClass_Julia_PaintAvail = false;
		ActorChangeAttitude(1, 1);
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

// Chapter 4 - Sarah Kiss
function C004_ArtClass_Sarah_Kiss() {
	GameLogAdd("Kiss");
}