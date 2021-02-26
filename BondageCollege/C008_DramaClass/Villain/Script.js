var C008_DramaClass_Villain_CurrentStage = 100;
var C008_DramaClass_Villain_PlayerIsVillain = false;
var C008_DramaClass_Villain_PlayerIsHeroine = false;
var C008_DramaClass_Villain_PlayerIsDamsel = false;
var C008_DramaClass_Villain_ForgetLineDone = false;
var C008_DramaClass_Villain_SnapFingersDone = false;
var C008_DramaClass_Villain_CanDisarm = false;
var C008_DramaClass_Villain_CanIntimidate = false;
var C008_DramaClass_Villain_IsGagged = false;
var C008_DramaClass_Villain_DamselCanInteract = false;
var C008_DramaClass_Villain_DamselCanBeg = false;
var C008_DramaClass_Villain_CanConvinceJuliaToStrip = false;
var C008_DramaClass_Villain_CanUntie = false;
var C008_DramaClass_Villain_CanUnstrap = false;
var C008_DramaClass_Villain_CanUngag = false;
var C008_DramaClass_Villain_CanAbuse = false;
var C008_DramaClass_Villain_CanKiss = false;
var C008_DramaClass_Villain_CropDone = false;
var C008_DramaClass_Villain_KissDone = false;
var C008_DramaClass_Villain_TickleDone = false;
var C008_DramaClass_Villain_SpankDone = false;
var C008_DramaClass_Villain_OrgasmDone = false;
var C008_DramaClass_Villain_MastubateCount = 0;
var C008_DramaClass_Villain_RavishDone = false;
var C008_DramaClass_Villain_CanDoSwordDance = false;

// Calculates the scene parameters
function C008_DramaClass_Villain_CalcParams() {
	C008_DramaClass_Villain_IsGagged = ActorIsGagged();
	C008_DramaClass_Villain_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C008_DramaClass_Villain_CanUnstrap = (ActorHasInventory("Armbinder") && !Common_PlayerRestrained);
	C008_DramaClass_Villain_CanUngag = (C008_DramaClass_Villain_IsGagged && !Common_PlayerRestrained);
	C008_DramaClass_Villain_CanAbuse = (ActorIsRestrained() && !Common_PlayerRestrained);
	C008_DramaClass_Villain_CanKiss = ((ActorIsRestrained() || (ActorGetValue(ActorLove) >= 5)) && !Common_PlayerGagged && !C008_DramaClass_Villain_IsGagged);
	C008_DramaClass_Villain_CanConvinceJuliaToStrip = (C008_DramaClass_Villain_PlayerIsDamsel && !C008_DramaClass_Villain_IsGagged && (C008_DramaClass_Julia_CurrentStage == 400) && ((ActorSpecificGetValue("Amanda", ActorLove) >= 10) || (ActorSpecificGetValue("Amanda", ActorSubmission) >= 10)));
	C008_DramaClass_Villain_DamselCanInteract = (C008_DramaClass_Villain_PlayerIsDamsel && !Common_PlayerGagged);
	C008_DramaClass_Villain_DamselCanBeg = (C008_DramaClass_Villain_PlayerIsDamsel && Common_PlayerGagged);
	C008_DramaClass_Villain_CanDoSwordDance = (!C008_DramaClass_Villain_PlayerIsDamsel && PlayerGetSkillLevel("Arts"));
	OverridenIntroImage = "";
}

// Chapter 8 - Villain Load
function C008_DramaClass_Villain_Load() {

	// Checks if the player is the villain & set the stage to the current global stage
	C008_DramaClass_Villain_PlayerIsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	C008_DramaClass_Villain_PlayerIsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Villain_PlayerIsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	if (C008_DramaClass_Villain_CurrentStage < 300) C008_DramaClass_Villain_CurrentStage = C008_DramaClass_Theater_GlobalStage;

	// Load the scene parameters
	if (!C008_DramaClass_Villain_PlayerIsVillain) ActorLoad(C008_DramaClass_Theater_Villain, "Theater");
	LoadInteractions();
	LeaveIcon = "Leave";
	LeaveScreen = "Theater";
	C008_DramaClass_Villain_CalcParams();
	
	// The player can disarm if sub +2 vs Amanda and intimidate if sub + 10
	C008_DramaClass_Villain_CanDisarm = (C008_DramaClass_Villain_PlayerIsVillain && (ActorSpecificGetValue("Amanda", ActorSubmission) >= 2));
	C008_DramaClass_Villain_CanIntimidate = (C008_DramaClass_Villain_PlayerIsVillain && (ActorSpecificGetValue("Amanda", ActorSubmission) >= 10));

}

// Chapter 8 - Villain Run
function C008_DramaClass_Villain_Run() {
	BuildInteraction(C008_DramaClass_Villain_CurrentStage);
	if ((C008_DramaClass_Villain_CurrentStage != 260) && (C008_DramaClass_Villain_CurrentStage != 290)) DrawInteractionActor();
}

// Chapter 8 - Villain Click
function C008_DramaClass_Villain_Click() {	

	// Regular and inventory interactions
	ClickInteraction(C008_DramaClass_Villain_CurrentStage);
	var ClickInv = GetClickedInventory();

	// A second rope can be applied on the fight loser before the play is over
	if ((ClickInv == "Rope") && (C008_DramaClass_Villain_CurrentStage == 250) && C008_DramaClass_Villain_PlayerIsHeroine)
		ActorApplyRestrain(ClickInv);

	// The villain can be restrained on stage 400
	if ((C008_DramaClass_Villain_CurrentStage == 400) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained) {

		// The damsel can tie up a knight if she's +10 submissive, the other knight can tie up a knight if she's +5 submissive
		if ((ActorGetValue(ActorSubmission) < 10) && C008_DramaClass_Villain_PlayerIsDamsel && !ActorIsRestrained() && (ClickInv != "CuffsKey")) { OverridenIntroText = GetText("RefuseBondageFromDamsel"); return; }
		if ((ActorGetValue(ActorSubmission) < 5) && C008_DramaClass_Villain_PlayerIsHeroine && !ActorIsRestrained() && (ClickInv != "CuffsKey")) { OverridenIntroText = GetText("RefuseBondageFromKnight"); return; }
	
		// A few items can change the actor attitude
		if ((ClickInv == "Crop") && !C008_DramaClass_Villain_CropDone) { C008_DramaClass_Villain_CropDone = true; ActorChangeAttitude(-1, 1); }
	
		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		if (ActorHasInventory("Rope")) ActorSetCloth("Underwear");
		if (ActorHasInventory("Armbinder")) ActorSetCloth("Underwear");
		C008_DramaClass_Villain_CalcParams();

	}

}

// Chapter 8 - Villain - Sets the global stage and can alter Julia's mood
function C008_DramaClass_Villain_GlobalStage(GlobalStage, LoveMod, SubMod) {
	C008_DramaClass_Theater_GlobalStage = GlobalStage;
	LeaveIcon = "Leave";
	if (!C008_DramaClass_Villain_SnapFingersDone || (SubMod <= 0)) ActorSpecificChangeAttitude("Julia", LoveMod, SubMod);
	if (SubMod > 0) C008_DramaClass_Villain_SnapFingersDone = true;
	if (LoveMod < 0) C008_DramaClass_Theater_PerfectPlay = false;
	C008_DramaClass_Theater_SetPose();
}

// Chapter 8 - Villain - When the player forgets her line
function C008_DramaClass_Villain_ForgetLine() {
	if (!C008_DramaClass_Villain_ForgetLineDone) {
		C008_DramaClass_Villain_ForgetLineDone = true;
		C008_DramaClass_Theater_PerfectPlay = false;
		ActorSpecificChangeAttitude("Julia", 0, -1);
	}
}

// Chapter 8 - Villain - If the player surrenders without fighting, she becomes more sub toward everyone
function C008_DramaClass_Villain_Surrender() {
	ActorSpecificChangeAttitude("Amanda", 0, -2);
	ActorSpecificChangeAttitude("Sarah", 0, -2);
	ActorSpecificChangeAttitude("Julia", 0, -2);
	GameLogSpecificAdd(CurrentChapter, "", "FightSurrender");
	C008_DramaClass_Theater_GlobalStage = C008_DramaClass_Villain_CurrentStage;
	C008_DramaClass_Theater_SetPose();
}

// Chapter 8 - Villain - Prevent the player from leaving
function C008_DramaClass_Villain_NoLeave() {
	LeaveIcon = "";
}

// Chapter 8 - Villain - Do the fight between Amanda as the villain and Sarah as the heroine
function C008_DramaClass_Villain_AmandaSarahFight(CheerFactor) {
	
	// Victory depends on who's more Domme and the cheering from the player
	if ((ActorSpecificGetValue("Amanda", ActorSubmission) * -1) - (ActorSpecificGetValue("Sarah", ActorSubmission) * -1) + CheerFactor >= 0) {
		
		// Amanda the villain wins
		C008_DramaClass_Villain_CurrentStage = 270;
		C008_DramaClass_Theater_GlobalStage = 270;
		OverridenIntroText = GetText("PlayerDamselVillainWin");

	} else {

		// Sarah the heroine wins
		C008_DramaClass_Villain_CurrentStage = 240;
		C008_DramaClass_Theater_GlobalStage = 240;
		OverridenIntroText = GetText("PlayerDamselHeroineWin");

	}

	// Allows the player to leave once the fight is over
	C008_DramaClass_Theater_SetPose();
	LeaveIcon = "Leave";
	
}

// Chapter 8 - Villain - When the villain kisses the damsel, it finishes the play
function C008_DramaClass_Villain_FinalKiss() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalKiss");
	OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerKiss.jpg"; 
	ActorSpecificChangeAttitude("Amanda", 2, 0); 
	ActorSpecificChangeAttitude("Sarah", -3, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Kiss";
}

// Chapter 8 - Villain - When the villain hugs the damsel, it finishes the play
function C008_DramaClass_Villain_FinalHug() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalHug");
	OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerHug.jpg"; 
	ActorSpecificChangeAttitude("Amanda", 1, 0); 
	ActorSpecificChangeAttitude("Sarah", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Hug";
}

// Chapter 8 - Villain - When the damsel kneels for the villain, it finishes the play
function C008_DramaClass_Villain_FinalDomme() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalDomme");
	OverridenIntroImage = "../HugImages/VillainAmandaDamselPlayerDomme.jpg"; 
	ActorSpecificChangeAttitude("Amanda", 1, -2);
	ActorSpecificChangeAttitude("Sarah", -1, 0);
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "Domme";
}

// Chapter 8 - Villain - When the damsel begs to be released
function C008_DramaClass_Villain_ReleasePlayer() {
	PlayerClothes("Damsel");
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("ClothGag");
	C008_DramaClass_Villain_DamselCanInteract = true;
	C008_DramaClass_Villain_DamselCanBeg = false;
}

// Chapter 8 - Villain - When the damsel surrenders and the play ends with two prisoners
function C008_DramaClass_Villain_FinalTwoPrisoners() {
	GameLogSpecificAdd(CurrentChapter, "", "FinalTwoPrisoners");
	C008_DramaClass_Theater_GlobalStage = 300;
	C008_DramaClass_Theater_Ending = "TwoPrisoners";
}

// Chapter 8 - Villain - The knight can convince Julia to strip for the player
function C008_DramaClass_Villain_JuliaStrip() {
	ActorSpecificSetCloth("Julia", "Underwear");
	C008_DramaClass_Villain_CanConvinceJuliaToStrip = false;
	C008_DramaClass_Julia_CurrentStage = 410;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 8 - Villain Untie
function C008_DramaClass_Villain_Untie() {
	ActorUntie();
	C008_DramaClass_Villain_CalcParams();
	ActorSetCloth("Villain");
}

// Chapter 8 - Villain Ungag
function C008_DramaClass_Villain_Ungag() {
	ActorUngag();
	C008_DramaClass_Villain_CalcParams();
}

// Chapter 8 - Villain Kiss
function C008_DramaClass_Villain_Kiss() {	
	if (!C008_DramaClass_Villain_KissDone) { GameLogAdd("Kiss"); C008_DramaClass_Villain_KissDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Villain_CalcParams();
}

// Chapter 8 - Villain Tickle
function C008_DramaClass_Villain_Tickle() {
	if (!C008_DramaClass_Villain_TickleDone) { C008_DramaClass_Villain_TickleDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Villain_CalcParams();
}

// Chapter 8 - Villain Spank
function C008_DramaClass_Villain_Spank() {
	if (!C008_DramaClass_Villain_SpankDone) { C008_DramaClass_Villain_SpankDone = true; ActorChangeAttitude(-1, 0); }
	C008_DramaClass_Villain_CalcParams();
}

// Chapter 8 - Villain Masturbate, Amanda can climax if she's bound with two ropes and gagged
function C008_DramaClass_Villain_Masturbate() {

	// Cannot work if the girl is locked in a chastity belt
	if (ActorIsChaste()) { OverridenIntroText = GetText("MasturbateChaste"); return; }
	OverridenIntroImage = "";
	C008_DramaClass_Villain_MastubateCount++;

	// Amanda will climax if she's properly tied up
	if ((C008_DramaClass_Villain_MastubateCount >= 3) && !C008_DramaClass_Villain_OrgasmDone && ActorIsGagged() && (ActorHasInventory("TwoRopes") || ActorHasInventory("Armbinder"))) { 
		C008_DramaClass_Villain_OrgasmDone = true;
		ActorAddOrgasm();
		ActorChangeAttitude(1, 0);
		OverridenIntroText = GetText("Orgasm");
		OverridenIntroImage = "BackgroundOrgasm.jpg";
	}

}

// Chapter 8 - Villain Ravish
function C008_DramaClass_Villain_Ravish() {
	if (!C008_DramaClass_Villain_RavishDone) { C008_DramaClass_Villain_RavishDone = true; ActorChangeAttitude(0, -1); }
	if ((ActorGetValue(ActorSubmission) < 5) && !ActorIsRestrained() && !ActorIsGagged() && (PlayerHasInventory("Rope") || PlayerHasInventory("Armbinder") || PlayerHasInventory("Cuffs"))) {
		CurrentTime = CurrentTime + 50000;
		PlayerRandomBondage();
		OverridenIntroText = GetText("Ravish");
	}
	C008_DramaClass_Villain_CalcParams();
}

// Chapter 8 - Sword Dance, a special option to disarm the opponent using art
function C008_DramaClass_Villain_SwordDance() {
	if (C008_DramaClass_Villain_PlayerIsHeroine) { C008_DramaClass_Villain_CurrentStage = 240; C008_DramaClass_Theater_GlobalStage = 240; }
	if (C008_DramaClass_Villain_PlayerIsVillain) { C008_DramaClass_Villain_CurrentStage = 270; C008_DramaClass_Theater_GlobalStage = 270; }
	GameLogSpecificAdd(CurrentChapter, "", "FightSwordDance");
	ActorSpecificChangeAttitude("Julia", PlayerGetSkillLevel("Arts"), 0);
	ActorSpecificChangeAttitude("Amanda", 0, 1);
	ActorSpecificChangeAttitude("Sarah", 0, 1);
	LeaveIcon = "Leave";
	C008_DramaClass_Theater_SetPose();
}