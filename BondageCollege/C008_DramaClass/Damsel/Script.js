var C008_DramaClass_Damsel_CurrentStage = 0;
var C008_DramaClass_Damsel_PlayerIsDamsel = false;
var C008_DramaClass_Damsel_PlayerIsHeroine = false;
var C008_DramaClass_Damsel_PlayerIsVillain = false;
var C008_DramaClass_Damsel_ForgetLineDone = false;
var C008_DramaClass_Damsel_SnapFingersDone = false;
var C008_DramaClass_Damsel_KnightSelection = "";
var C008_DramaClass_Damsel_CanKissHeroine = false;
var C008_DramaClass_Damsel_CanKissVillain = false;
var C008_DramaClass_Damsel_CanKneelHeroine = false;
var C008_DramaClass_Damsel_CanKneelVillain = false;
var C008_DramaClass_Damsel_CanHugHeroine = false;
var C008_DramaClass_Damsel_CanHugVillain = false;
var C008_DramaClass_Damsel_IsGagged = false;
var C008_DramaClass_Damsel_IsRestrained = false;
var C008_DramaClass_Damsel_CanUntie = false;
var C008_DramaClass_Damsel_CanUnstrap = false;
var C008_DramaClass_Damsel_CanUngag = false;
var C008_DramaClass_Damsel_CanAbuse = false;
var C008_DramaClass_Damsel_CanKiss = false;
var C008_DramaClass_Damsel_OrgasmDone = false;
var C008_DramaClass_Damsel_ViolenceDone = false;
var C008_DramaClass_Damsel_MastubateCount = 0;

// Calculates the scene parameters
function C008_DramaClass_Damsel_CalcParams() {
	C008_DramaClass_Damsel_IsGagged = ActorIsGagged();
	C008_DramaClass_Damsel_IsRestrained = ActorIsRestrained();
	C008_DramaClass_Damsel_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C008_DramaClass_Damsel_CanUnstrap = (ActorHasInventory("Armbinder") && !Common_PlayerRestrained);
	C008_DramaClass_Damsel_CanUngag = (C008_DramaClass_Damsel_IsGagged && !Common_PlayerRestrained);
	C008_DramaClass_Damsel_CanAbuse = (C008_DramaClass_Damsel_IsRestrained && !Common_PlayerRestrained);
	C008_DramaClass_Damsel_CanKiss = ((C008_DramaClass_Damsel_IsRestrained || (ActorGetValue(ActorLove) >= 5)) && !Common_PlayerGagged && !C008_DramaClass_Damsel_IsGagged);
	OverridenIntroImage = "";
}

// Chapter 8 - Damsel Load
function C008_DramaClass_Damsel_Load() {

	// Checks if the player is the damsel & set the stage to the current global stage
	C008_DramaClass_Damsel_PlayerIsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Damsel_PlayerIsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Damsel_PlayerIsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	if (C008_DramaClass_Damsel_CurrentStage < 300) C008_DramaClass_Damsel_CurrentStage = C008_DramaClass_Theater_GlobalStage;
	C008_DramaClass_Damsel_CanKissHeroine = (C008_DramaClass_Damsel_PlayerIsDamsel && (ActorSpecificGetValue("Sarah", ActorLove) >= 10) && !Common_PlayerGagged);
	C008_DramaClass_Damsel_CanKissVillain = (C008_DramaClass_Damsel_PlayerIsDamsel && (ActorSpecificGetValue("Amanda", ActorLove) >= 10) && !Common_PlayerGagged);
	C008_DramaClass_Damsel_CanKneelHeroine = (C008_DramaClass_Damsel_PlayerIsDamsel && (ActorSpecificGetValue("Sarah", ActorLove) <= -5) && !Common_PlayerGagged);
	C008_DramaClass_Damsel_CanKneelVillain = (C008_DramaClass_Damsel_PlayerIsDamsel && (ActorSpecificGetValue("Amanda", ActorLove) <= -5) && !Common_PlayerGagged);
	C008_DramaClass_Damsel_CanHugVillain = (C008_DramaClass_Damsel_PlayerIsDamsel && !Common_PlayerGagged);
	C008_DramaClass_Damsel_CanHugHeroine = (C008_DramaClass_Damsel_PlayerIsDamsel && !Common_PlayerGagged);

	// Load the scene parameters
	if (!C008_DramaClass_Damsel_PlayerIsDamsel) ActorLoad(C008_DramaClass_Theater_Damsel, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";
	C008_DramaClass_Damsel_CalcParams();

	// Other options for the villains & heroine when Sarah is in bondage
	if (C008_DramaClass_Damsel_PlayerIsHeroine && (C008_DramaClass_Damsel_CurrentStage == 250) && ActorSpecificInBondage("Sarah")) C008_DramaClass_Damsel_CurrentStage = 255;
	if (C008_DramaClass_Damsel_PlayerIsVillain && (C008_DramaClass_Damsel_CurrentStage == 280) && ActorSpecificInBondage("Sarah")) C008_DramaClass_Damsel_CurrentStage = 285;
	if ((C008_DramaClass_Damsel_CurrentStage == 400) && C008_DramaClass_Damsel_IsGagged) C008_DramaClass_Damsel_CurrentStage = 410;

}

// Chapter 8 - Damsel Run
function C008_DramaClass_Damsel_Run() {
	BuildInteraction(C008_DramaClass_Damsel_CurrentStage);
	if ((C008_DramaClass_Damsel_CurrentStage != 260) && (C008_DramaClass_Damsel_CurrentStage != 290)) DrawInteractionActor();
}

// Chapter 8 - Damsel Click
function C008_DramaClass_Damsel_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Damsel_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// If the player is the villain, she can restrain Sarah once stage 140 is reached.  Stage 220 becomes the minimum stage if she's gagged.
	if (((ClickInv == "Rope") || (ClickInv == "BallGag") || (ClickInv == "TapeGag") || (ClickInv == "ClothGag")) && C008_DramaClass_Damsel_PlayerIsVillain && (C008_DramaClass_Damsel_CurrentStage >= 140) && (C008_DramaClass_Damsel_CurrentStage < 300) && !Common_PlayerRestrained) {
		var HadRope = ActorHasInventory("Rope");
		ActorSetCloth("Underwear");
		ActorApplyRestrain(ClickInv);
		if ((ClickInv == "Rope") && !HadRope) OverridenIntroText = GetText("VillainRope");
		if ((ActorHasInventory("BallGag") || ActorHasInventory("TapeGag") || ActorHasInventory("ClothGag")) && (C008_DramaClass_Damsel_CurrentStage < 220)) {
			C008_DramaClass_Damsel_CurrentStage = 220;
			C008_DramaClass_Theater_GlobalStage = 220;
		}
		if (C008_DramaClass_Damsel_CurrentStage == 250) C008_DramaClass_Damsel_CurrentStage = 255;
		if (C008_DramaClass_Damsel_CurrentStage == 280) C008_DramaClass_Damsel_CurrentStage = 285;
		C008_DramaClass_Theater_SetPose();
	}

	// The damsel can be restrained on stage 410
	if ((C008_DramaClass_Damsel_CurrentStage == 410) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained) {

		// A few items can change the actor attitude
		if ((ClickInv == "Crop") && !C008_DramaClass_Damsel_ViolenceDone) { C008_DramaClass_Damsel_ViolenceDone = true; ActorChangeAttitude(1, 0); }
	
		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		C008_DramaClass_Damsel_CalcParams();

	}
	
}

// Chapter 8 - Damsel - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Damsel_GlobalStage(GlobalStage, LoveMod, SubMod) {
	
	// We can also flag for snapped fingers and a perfect play
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Damsel_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Damsel_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
	C008_DramaClass_Theater_SetPose();
	
	// Remember who was picked for later
	if (GlobalStage == 200) C008_DramaClass_Damsel_KnightSelection = "Heroine";
	if (GlobalStage == 210) C008_DramaClass_Damsel_KnightSelection = "Villain";
	
	// If the player is the Damsel, Amanda can restrain her if she's in a Domme mood and wasn't selected
	if ((GlobalStage == 200) && (C008_DramaClass_Theater_Damsel == "Player") && (C008_DramaClass_Theater_Villain == "Amanda") && (ActorSpecificGetValue("Amanda", ActorSubmission) < 0)) {
		PlayerClothes("Underwear");
		PlayerLockInventory("Rope");
		PlayerLockInventory("ClothGag");
		Common_PlayerPose = "";
		OverridenIntroText = GetText("AmandaRestrainPlayer");
	}

}

// Chapter 8 - Damsel - When the player forgets her line
function C008_DramaClass_Damsel_ForgetLine() {
	if (!C008_DramaClass_Damsel_ForgetLineDone) {
		C008_DramaClass_Damsel_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}

// Chapter 8 - Damsel - When Sarah must choose a knight
function C008_DramaClass_Damsel_SarahChooseKnight() {
	
	// Sarah chooses the player if love is 10 or better
	if (((ActorGetValue(ActorLove) >= 10) && (C008_DramaClass_Theater_Heroine == "Player")) || ((ActorGetValue(ActorLove) < 10) && (C008_DramaClass_Theater_Heroine == "Amanda"))) {
		
		// Stage 200 means the hero was selected
		C008_DramaClass_Damsel_CurrentStage = 200;
		C008_DramaClass_Theater_GlobalStage = 200;
		C008_DramaClass_Damsel_KnightSelection = "Heroine";
		
		// If Amanda is the villain, she will restrain Sarah
		if (C008_DramaClass_Theater_Villain == "Amanda") {
			ActorSetCloth("Underwear");
			ActorSpecificSetPose("Sarah", "");
			ActorAddInventory("Rope");
			ActorAddInventory("ClothGag");
			OverridenIntroText = GetText("SarahChooseWhiteKnightRestrained");
		} else OverridenIntroText = GetText("SarahChooseWhiteKnight");

	} else {

		// Stage 210 means the villain was selected
		C008_DramaClass_Damsel_CurrentStage = 210;
		C008_DramaClass_Theater_GlobalStage = 210;
		C008_DramaClass_Damsel_KnightSelection = "Villain";
		OverridenIntroText = GetText("SarahChooseBlackKnight");

	}

}

// Chapter 8 - Damsel - The player can release the Damsel for the final act
function C008_DramaClass_Damsel_ReleaseDamsel() {
	ActorUntie();
	ActorUngag();
	ActorSetCloth("Damsel");
	C008_DramaClass_Theater_SetPose();	
}

// Chapter 8 - Damsel - When the damsel kisses the victor, it finishes the play
function C008_DramaClass_Damsel_FinalKiss() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalKiss");
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsVillain && ActorSpecificHasInventory("Sarah", "Rope")) { C008_DramaClass_Damsel_ReleaseDamsel(); OverridenIntroText = GetText("AmandaReleaseForKiss"); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsHeroine && ActorSpecificHasInventory("Sarah", "Rope")) { C008_DramaClass_Damsel_ReleaseDamsel(); OverridenIntroText = GetText("AmandaReleaseForKiss"); }
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerKiss.jpg"; ActorSpecificChangeAttitude("Sarah", 2, 0); ActorSpecificChangeAttitude("Amanda", -3, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsHeroine) { OverridenIntroImage = "../HugImages/HeroinePlayerDamselSarahKiss.jpg"; ActorSpecificChangeAttitude("Sarah", 2, 0); ActorSpecificChangeAttitude("Amanda", -3, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsVillain) { OverridenIntroImage = "../HugImages/HeroineAmandaDamselSarahKiss.jpg"; }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerKiss.jpg"; ActorSpecificChangeAttitude("Amanda", 2, 0); ActorSpecificChangeAttitude("Sarah", -3, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsHeroine) { OverridenIntroImage = "../HugImages/VillainAmandaDamselSarahKiss.jpg"; }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsVillain) { OverridenIntroImage = "../HugImages/VillainPlayerDamselSarahKiss.jpg"; ActorSpecificChangeAttitude("Sarah", 2, 0); ActorSpecificChangeAttitude("Amanda", -3, 0); }
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Kiss";
}

// Chapter 8 - Damsel - When the damsel hugs the victor, it finishes the play
function C008_DramaClass_Damsel_FinalHug() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalHug");
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerHug.jpg"; ActorSpecificChangeAttitude("Sarah", 1, 0); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsHeroine) { OverridenIntroImage = "../HugImages/HeroinePlayerDamselSarahHug.jpg"; ActorSpecificChangeAttitude("Sarah", 1, 0); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerHug.jpg"; ActorSpecificChangeAttitude("Amanda", 1, 0); ActorSpecificChangeAttitude("Sarah", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsVillain) { OverridenIntroImage = "../HugImages/VillainPlayerDamselSarahHug.jpg"; ActorSpecificChangeAttitude("Sarah", 1, 0); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Hug";
}

// Chapter 8 - Damsel - When the damsel kneels for the victor, it finishes the play
function C008_DramaClass_Damsel_FinalDomme() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalDomme");
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerDomme.jpg"; ActorSpecificChangeAttitude("Sarah", 1, -2); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 260) && C008_DramaClass_Damsel_PlayerIsHeroine) { OverridenIntroImage = "../HugImages/HeroinePlayerDamselSarahDomme.jpg"; ActorSpecificChangeAttitude("Sarah", 1, 2); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsDamsel) { OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerDomme.jpg"; ActorSpecificChangeAttitude("Amanda", 1, -2); ActorSpecificChangeAttitude("Sarah", -1, 0); }
	if ((C008_DramaClass_Damsel_CurrentStage == 290) && C008_DramaClass_Damsel_PlayerIsVillain) { OverridenIntroImage = "../HugImages/VillainPlayerDamselSarahDomme.jpg"; ActorSpecificChangeAttitude("Sarah", 1, 2); ActorSpecificChangeAttitude("Amanda", -1, 0); }
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Domme";
}

// Chapter 8 - Damsel - The villain can take both girls as prisoners for the final act
function C008_DramaClass_Damsel_FinalTwoPrisoners() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalTwoPrisoners");
	ActorSpecificChangeAttitude("Sarah", 0, 1);
	ActorSpecificChangeAttitude("Amanda", 0, 1);
	ActorSpecificChangeAttitude("Julia", 0, 1);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "TwoPrisoners";
}

// Chapter 8 - Damsel Strip
function C008_DramaClass_Damsel_Strip() {
	ActorSetCloth("Underwear");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 8 - Damsel Untie
function C008_DramaClass_Damsel_Untie() {
	ActorUntie();
	C008_DramaClass_Damsel_CalcParams();
}

// Chapter 8 - Damsel Ungag
function C008_DramaClass_Damsel_Ungag() {
	ActorUngag();
	C008_DramaClass_Damsel_CalcParams();
}

// Chapter 8 - Damsel Spank
function C008_DramaClass_Damsel_Spank() {
	if (!C008_DramaClass_Damsel_ViolenceDone) { C008_DramaClass_Damsel_ViolenceDone = true; ActorChangeAttitude(1, 0); }
}

// Chapter 8 - Damsel Kiss
function C008_DramaClass_Damsel_Kiss() {
	GameLogAdd("Kiss");
}

// Chapter 8 - Damsel Masturbate, Sarah can climax if she was hit before (Spank or Crop)
function C008_DramaClass_Damsel_Masturbate() {

	// Cannot work if the girl is locked in a chastity belt
	if (ActorIsChaste()) { OverridenIntroText = GetText("MasturbateChaste"); return; }
	OverridenIntroImage = "";
	C008_DramaClass_Damsel_MastubateCount++;

	// Sarah will climax if she was beaten up
	if ((C008_DramaClass_Damsel_MastubateCount >= 3) && !C008_DramaClass_Damsel_OrgasmDone && C008_DramaClass_Damsel_ViolenceDone) {
		C008_DramaClass_Damsel_OrgasmDone = true;
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		OverridenIntroText = GetText("Orgasm");
		OverridenIntroImage = "BackgroundOrgasm.jpg";
	}

}