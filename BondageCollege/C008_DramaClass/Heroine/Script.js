var C008_DramaClass_Heroine_CurrentStage = 100;
var C008_DramaClass_Heroine_PlayerIsHeroine = false;
var C008_DramaClass_Heroine_PlayerIsDamsel = false;
var C008_DramaClass_Heroine_PlayerIsVillain = false;
var C008_DramaClass_Heroine_ForgetLineDone = false;
var C008_DramaClass_Heroine_SnapFingersDone = false;
var C008_DramaClass_Heroine_VillainCanTaunt = false;
var C008_DramaClass_Heroine_CanProposeTrio = false;
var C008_DramaClass_Heroine_IsGagged = false;
var C008_DramaClass_Heroine_DamselCanInteract = false;
var C008_DramaClass_Heroine_DamselCanBeg = false;
var C008_DramaClass_Heroine_CanConvinceJuliaToStrip = false;
var C008_DramaClass_Heroine_CanUntie = false;
var C008_DramaClass_Heroine_CanUnstrap = false;
var C008_DramaClass_Heroine_CanUngag = false;
var C008_DramaClass_Heroine_CanAbuse = false;
var C008_DramaClass_Heroine_CanKiss = false;
var C008_DramaClass_Heroine_KissDone = false;
var C008_DramaClass_Heroine_TickleDone = false;
var C008_DramaClass_Heroine_OrgasmDone = false;
var C008_DramaClass_Heroine_ViolenceDone = false;
var C008_DramaClass_Heroine_MastubateCount = 0;
var C008_DramaClass_Heroine_CanBeg = false;

// Calculates the scene parameters
function C008_DramaClass_Heroine_CalcParams() {
	C008_DramaClass_Heroine_IsGagged = ActorIsGagged();
	C008_DramaClass_Heroine_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C008_DramaClass_Heroine_CanUnstrap = (ActorHasInventory("Armbinder") && !Common_PlayerRestrained);
	C008_DramaClass_Heroine_CanUngag = (C008_DramaClass_Heroine_IsGagged && !Common_PlayerRestrained);
	C008_DramaClass_Heroine_CanAbuse = (ActorIsRestrained() && !Common_PlayerRestrained);
	C008_DramaClass_Heroine_CanKiss = ((ActorIsRestrained() || (ActorGetValue(ActorLove) >= 5)) && !Common_PlayerGagged && !C008_DramaClass_Heroine_IsGagged);
	C008_DramaClass_Heroine_CanConvinceJuliaToStrip = (C008_DramaClass_Heroine_PlayerIsDamsel && !C008_DramaClass_Heroine_IsGagged && (C008_DramaClass_Julia_CurrentStage == 400) && ((ActorSpecificGetValue("Sarah", ActorLove) >= 10) || (ActorSpecificGetValue("Sarah", ActorSubmission) >= 10)));
	C008_DramaClass_Heroine_DamselCanInteract = (C008_DramaClass_Heroine_PlayerIsDamsel && !Common_PlayerGagged);
	C008_DramaClass_Heroine_DamselCanBeg = (C008_DramaClass_Heroine_PlayerIsDamsel && Common_PlayerGagged);
	C008_DramaClass_Heroine_CanBeg = ((Common_PlayerGagged || Common_PlayerRestrained) && !C008_DramaClass_Heroine_IsGagged && !ActorIsRestrained());
	OverridenIntroImage = "";
}

// Chapter 8 - Heroine Load
function C008_DramaClass_Heroine_Load() {

	// Checks if the player is the heroine & set the stage to the current global stage
	C008_DramaClass_Heroine_PlayerIsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Heroine_PlayerIsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Heroine_PlayerIsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	if (C008_DramaClass_Heroine_CurrentStage < 300) C008_DramaClass_Heroine_CurrentStage = C008_DramaClass_Theater_GlobalStage;
	C008_DramaClass_Heroine_VillainCanTaunt = (C008_DramaClass_Heroine_PlayerIsVillain && ActorSpecificInBondage("Sarah"));
	C008_DramaClass_Heroine_CanProposeTrio = (C008_DramaClass_Heroine_PlayerIsHeroine && (ActorSpecificGetValue("Sarah", ActorLove) >= 10) && (ActorSpecificGetValue("Amanda", ActorLove) >= 10))

	// Load the scene parameters
	if (!C008_DramaClass_Heroine_PlayerIsHeroine) ActorLoad(C008_DramaClass_Theater_Heroine, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";
	C008_DramaClass_Heroine_CalcParams();

}

// Chapter 8 - Heroine Run
function C008_DramaClass_Heroine_Run() {
	BuildInteraction(C008_DramaClass_Heroine_CurrentStage);
	if ((C008_DramaClass_Heroine_CurrentStage != 226) && (C008_DramaClass_Heroine_CurrentStage != 260) && (C008_DramaClass_Heroine_CurrentStage != 290)) DrawInteractionActor();
}

// Chapter 8 - Heroine Click
function C008_DramaClass_Heroine_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Heroine_CurrentStage);
	var ClickInv = GetClickedInventory();

	// A second rope can be applied on the fight loser before the play is over
	if ((ClickInv == "Rope") && (C008_DramaClass_Heroine_CurrentStage == 280) && C008_DramaClass_Heroine_PlayerIsVillain)
		ActorApplyRestrain(ClickInv);

	// The heroine can be restrained on stage 400
	if ((C008_DramaClass_Heroine_CurrentStage == 400) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained) {

		// The damsel can tie up a knight if she's +10 submissive, the other knight can tie up a knight if she's +5 submissive
		if ((ActorGetValue(ActorSubmission) < 10) && C008_DramaClass_Heroine_PlayerIsDamsel && !ActorIsRestrained() && (ClickInv != "CuffsKey")) { OverridenIntroText = GetText("RefuseBondageFromDamsel"); return; }
		if ((ActorGetValue(ActorSubmission) < 5) && C008_DramaClass_Heroine_PlayerIsVillain && !ActorIsRestrained() && (ClickInv != "CuffsKey")) { OverridenIntroText = GetText("RefuseBondageFromKnight"); return; }	

		// Both heroines react differently to the crop
		if ((ClickInv == "Crop") && !C008_DramaClass_Heroine_ViolenceDone) {
			C008_DramaClass_Heroine_ViolenceDone = true;
			if (CurrentActor == "Amanda") ActorChangeAttitude(-1, 0);
			if (CurrentActor == "Sarah") ActorChangeAttitude(1, 0);
		}

		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		if (ActorHasInventory("Rope")) ActorSetCloth("Underwear");
		if (ActorHasInventory("Armbinder")) ActorSetCloth("Underwear");
		C008_DramaClass_Heroine_CalcParams();

	}

}

// Chapter 8 - Heroine - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Heroine_GlobalStage(GlobalStage, LoveMod, SubMod) {
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	if (!C008_DramaClass_Heroine_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Heroine_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
	C008_DramaClass_Theater_SetPose();
}

// Chapter 8 - Heroine - When the player forgets her line
function C008_DramaClass_Heroine_ForgetLine() {
	if (!C008_DramaClass_Heroine_ForgetLineDone) {
		C008_DramaClass_Heroine_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}

// Chapter 8 - Heroine - When the heroine kisses the damsel, it finishes the play
function C008_DramaClass_Heroine_FinalKiss() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalKiss");
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerKiss.jpg";
	ActorSpecificChangeAttitude("Sarah", 2, 0);
	ActorSpecificChangeAttitude("Amanda", -3, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Kiss";
}

// Chapter 8 - Heroine - When the heroine hugs the damsel, it finishes the play
function C008_DramaClass_Heroine_FinalHug() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalHug");
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerHug.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, 0);
	ActorSpecificChangeAttitude("Amanda", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Hug";
}

// Chapter 8 - Heroine - When the damsel kneels for the heroine, it finishes the play
function C008_DramaClass_Heroine_FinalDomme() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalDomme");
	OverridenIntroImage = "../HugImages/HeroineSarahDamselPlayerDomme.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, -2);
	ActorSpecificChangeAttitude("Amanda", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Domme";
}

// Chapter 8 - Heroine - When the heroine proposes a menage a trois, it finishes the play
function C008_DramaClass_Heroine_FinalTrio() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalTrio");
	OverridenIntroImage = "../HugImages/HeroinePlayerVillainAmandaDamselSarahKiss.jpg";
	ActorSpecificChangeAttitude("Sarah", 1, 0);
	ActorSpecificChangeAttitude("Amanda", 1, 0);
	CurrentActor = "Sarah";
	ActorUntie();
	ActorUngag();
	ActorSetCloth("Damsel");
	CurrentActor = "";
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Trio";
}

// Chapter 8 - Heroine - When the damsel begs to be released
function C008_DramaClass_Heroine_ReleasePlayer() {
	PlayerClothes("Damsel");
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("ClothGag");
	C008_DramaClass_Heroine_DamselCanInteract = true;
	C008_DramaClass_Heroine_DamselCanBeg = false;
}

// Chapter 8 - Heroine - When the damsel surrenders and the play ends with two prisoners
function C008_DramaClass_Heroine_FinalTwoPrisoners() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalTwoPrisoners");
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "TwoPrisoners";
}

// Chapter 8 - Heroine - The knight can convince Julia to strip for the player
function C008_DramaClass_Heroine_JuliaStrip() {
	ActorSpecificSetCloth("Julia", "Underwear");
	C008_DramaClass_Heroine_CanConvinceJuliaToStrip = false;
	C008_DramaClass_Julia_CurrentStage = 410;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 8 - Heroine Untie
function C008_DramaClass_Heroine_Untie() {
	ActorUntie();
	C008_DramaClass_Heroine_CalcParams();
	ActorSetCloth("Heroine");
}

// Chapter 8 - Heroine Ungag
function C008_DramaClass_Heroine_Ungag() {
	ActorUngag();
	C008_DramaClass_Heroine_CalcParams();
}

// Chapter 8 - Heroine Kiss
function C008_DramaClass_Heroine_Kiss() {
	GameLogAdd("Kiss");
	if ((CurrentActor == "Amanda") && !C008_DramaClass_Heroine_KissDone) { C008_DramaClass_Heroine_KissDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Heroine_CalcParams();
}

// Chapter 8 - Heroine Tickle
function C008_DramaClass_Heroine_Tickle() {
	if ((CurrentActor == "Amanda") && !C008_DramaClass_Heroine_TickleDone) { C008_DramaClass_Heroine_TickleDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Heroine_CalcParams();
}

// Chapter 8 - Heroine Spank
function C008_DramaClass_Heroine_Spank() {
	if ((CurrentActor == "Amanda") && !C008_DramaClass_Heroine_ViolenceDone) { C008_DramaClass_Heroine_ViolenceDone = true; ActorChangeAttitude(-1, 0); }
	if ((CurrentActor == "Sarah") && !C008_DramaClass_Heroine_ViolenceDone) { C008_DramaClass_Heroine_ViolenceDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Heroine_CalcParams();
}

// Chapter 8 - Heroine Masturbate, Sarah or Amanda can climax with different parameters
function C008_DramaClass_Heroine_Masturbate() {

	// Cannot work if the girl is locked in a chastity belt
	if (ActorIsChaste()) { OverridenIntroText = GetText("MasturbateChaste"); return; }	
	OverridenIntroImage = "";
	C008_DramaClass_Heroine_MastubateCount++;
	
	// Amanda will climax if she's properly tied up
	if ((CurrentActor == "Amanda") && (C008_DramaClass_Heroine_MastubateCount >= 3) && !C008_DramaClass_Heroine_OrgasmDone && ActorIsGagged() && ActorHasInventory("TwoRopes")) { 
		C008_DramaClass_Heroine_OrgasmDone = true;
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		OverridenIntroText = GetText("Orgasm");
		OverridenIntroImage = "BackgroundOrgasm.jpg";
	}
	
	// Sarah will climax if she was beaten up
	if ((CurrentActor == "Sarah") && (C008_DramaClass_Heroine_MastubateCount >= 3) && !C008_DramaClass_Heroine_OrgasmDone && C008_DramaClass_Heroine_ViolenceDone) { 
		C008_DramaClass_Heroine_OrgasmDone = true;
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		OverridenIntroText = GetText("Orgasm");
		OverridenIntroImage = "BackgroundOrgasm.jpg";
	}

}

// Chapter 8 - The heroine can release the player depending of the relationship
function C008_DramaClass_Heroine_BegRelease() {
	if ((ActorGetValue(ActorLove) > 0) && (ActorGetValue(ActorSubmission) > 0)) {
		OverridenIntroText = GetText("AcceptRelease");
		PlayerClothes(C008_DramaClass_JuliaIntro_PlayerRole);
		PlayerReleaseBondage();
		C008_DramaClass_Heroine_CalcParams();
	}
}