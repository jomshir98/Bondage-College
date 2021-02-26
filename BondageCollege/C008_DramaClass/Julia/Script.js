var C008_DramaClass_Julia_CurrentStage = 0;
var C008_DramaClass_Julia_IsDamsel = false;
var C008_DramaClass_Julia_IsHeroine = false;
var C008_DramaClass_Julia_IsVillain = false;
var C008_DramaClass_Julia_ScriptRefused = false;
var C008_DramaClass_Julia_EndingKiss = false;
var C008_DramaClass_Julia_EndingHug = false;
var C008_DramaClass_Julia_EndingDomme = false;
var C008_DramaClass_Julia_EndingTwoPrisoners = false;
var C008_DramaClass_Julia_EndingTrio = false;
var C008_DramaClass_Julia_IsGagged = false;
var C008_DramaClass_Julia_CanUntie = false;
var C008_DramaClass_Julia_CanUngag = false;
var C008_DramaClass_Julia_CanAbuse = false;
var C008_DramaClass_Julia_CanKiss = false;
var C008_DramaClass_Julia_CropDone = false;
var C008_DramaClass_Julia_KissDone = false;
var C008_DramaClass_Julia_TickleDone = false;
var C008_DramaClass_Julia_SpankDone = false;
var C008_DramaClass_Julia_OrgasmDone = false;
var C008_DramaClass_Julia_MastubateCount = 0;
var C008_DramaClass_Julia_QuaintCommentDone = false;
var C008_DramaClass_Julia_WeightCommentDone = false;
var C008_DramaClass_Julia_RebellionAvail = true;

// Calculates the scene parameters
function C008_DramaClass_Julia_CalcParams() {
	C008_DramaClass_Julia_IsGagged = ActorIsGagged();
	C008_DramaClass_Julia_CanUntie = (ActorHasInventory("Rope") && !Common_PlayerRestrained);
	C008_DramaClass_Julia_CanUngag = (C008_DramaClass_Julia_IsGagged && !Common_PlayerRestrained);
	C008_DramaClass_Julia_CanAbuse = (ActorIsRestrained() && !Common_PlayerRestrained);
	C008_DramaClass_Julia_CanKiss = ((ActorIsRestrained() || (ActorGetValue(ActorLove) >= 5)) && !Common_PlayerGagged && !C008_DramaClass_Julia_IsGagged);
	OverridenIntroImage = "";
}

// Chapter 8 - Julia Load
function C008_DramaClass_Julia_Load() {

	// Set the timer limits at 14:00
	StartTimer(14 * 60 * 60 * 1000, "C008_DramaClass", "Outro");

	// Load the scene parameters
	if (C008_DramaClass_Julia_CurrentStage < 300) C008_DramaClass_Julia_CurrentStage = C008_DramaClass_Theater_GlobalStage;
	ActorLoad("Julia", "Theater");
	LoadInteractions();
	
	// On a perfect play, the player gains a level in arts
	if ((C008_DramaClass_Julia_CurrentStage == 300) && C008_DramaClass_Theater_PerfectPlay) {
		C008_DramaClass_Theater_PerfectPlay = false;
		GameLogSpecificAdd(CurrentChapter, "", "PerfectPlay");
		PlayerAddSkill("Arts", 1);
	}
	
	// Cannot leave before Julia gave her instructions
	if (C008_DramaClass_Julia_CurrentStage < 100) LeaveIcon = "";
	if (C008_DramaClass_Julia_CurrentStage == 330) C008_DramaClass_Julia_CurrentStage = 400;
	if (C008_DramaClass_Julia_CurrentStage == 340) C008_DramaClass_Julia_CurrentStage = 500;
	
	// Set the role variables
	C008_DramaClass_Julia_IsDamsel = (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel");
	C008_DramaClass_Julia_IsHeroine = (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine");
	C008_DramaClass_Julia_IsVillain = (C008_DramaClass_JuliaIntro_PlayerRole == "Villain");
	C008_DramaClass_Julia_CalcParams();
	
	// Keep the ending type
	C008_DramaClass_Julia_EndingKiss = (C008_DramaClass_Theater_Ending == "Kiss");
	C008_DramaClass_Julia_EndingHug = (C008_DramaClass_Theater_Ending == "Hug");
	C008_DramaClass_Julia_EndingDomme = (C008_DramaClass_Theater_Ending == "Domme");
	C008_DramaClass_Julia_EndingTwoPrisoners = (C008_DramaClass_Theater_Ending == "TwoPrisoners");
	C008_DramaClass_Julia_EndingTrio = (C008_DramaClass_Theater_Ending == "Trio");

}

// Chapter 8 - Julia Run (beyond 300, she's on stage with the students)
function C008_DramaClass_Julia_Run() {
	BuildInteraction(C008_DramaClass_Julia_CurrentStage);
	if (C008_DramaClass_Julia_CurrentStage >= 300) DrawInteractionActor();
}

// Chapter 8 - Julia Click
function C008_DramaClass_Julia_Click() {	

	// Regular interaction click
	ClickInteraction(C008_DramaClass_Julia_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// Julia can be restrained on stage 410
	if ((C008_DramaClass_Julia_CurrentStage == 410) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained) {
	
		// The damsel cannot tie up the other damsel unless she's +5 submissive
		if ((ActorGetValue(ActorSubmission) < 5) && (C008_DramaClass_Julia_IsDamsel) && !ActorIsRestrained() && (ClickInv != "CuffsKey")) {
			OverridenIntroText = GetText("RefuseBondage");
			return;			
		}

		// Julia cannot wear a belt or a collar
		if (ClickInv == "ChastityBelt") { OverridenIntroText = GetText("CannotWearBelt"); return; }
		if (ClickInv == "Collar") { OverridenIntroText = GetText("CannotWearCollar"); return; }
		if (ClickInv == "Armbinder") { OverridenIntroText = GetText("Armbinder"); return; }

		// A few items can change the actor attitude
		if ((ClickInv == "Crop") && !C008_DramaClass_Julia_CropDone) { GameLogAdd("Crop"); C008_DramaClass_Julia_CropDone = true; ActorChangeAttitude(0, 1); }

		// Apply the clicked restrain
		ActorApplyRestrain(ClickInv);
		C008_DramaClass_Julia_CalcParams();

	}

	// Julia will turn the tables on the player on stage 500
	if ((C008_DramaClass_Julia_CurrentStage == 500) && (ClickInv != "") && (ClickInv != "Player") && !Common_PlayerRestrained && (PlayerHasInventory("Rope") || PlayerHasInventory("Cuffs"))) {
		OverridenIntroText = GetText("QueenTurnTables");
		GameLogAdd("TurnTables");
		PlayerRandomBondage();
		CurrentTime = CurrentTime + 60000;
	}
	
}

// Chapter 8 - Julia Refuse Script
function C008_DramaClass_Julia_RefuseScript() {
	ActorChangeAttitude(-1, 0);
	C008_DramaClass_Julia_ScriptRefused = true;
}

// Chapter 8 - Julia Start Drama (Global stage becomes 100)
function C008_DramaClass_Julia_StartDrama() {
	C008_DramaClass_Theater_GlobalStage = 100;
	SetScene(CurrentChapter, "Theater");
}

// Chapter 8 - Julia - Julia will always release the player at the end of the play
function C008_DramaClass_Julia_ReleasePlayer() {
	PlayerClothes(C008_DramaClass_JuliaIntro_PlayerRole);
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("ClothGag");
}

// Chapter 8 - Julia - Sets the global stage of the play
function C008_DramaClass_Julia_GlobalStage(GlobalStage) {
	C008_DramaClass_Theater_GlobalStage	= GlobalStage;
}

// Chapter 8 - Julia - Julia can become a Damsel or the queen for some extra acting (400 can interact. 500 cannot, it's the player.)
function C008_DramaClass_Julia_JuliaEntersPlay() {
	C008_DramaClass_Theater_GlobalStage = 400;
	if (C008_DramaClass_Julia_CurrentStage == 340) ActorSetPose("Queen");
	if (C008_DramaClass_Julia_IsHeroine) C008_DramaClass_Heroine_CurrentStage = 500; else C008_DramaClass_Heroine_CurrentStage = 400;
	if (C008_DramaClass_Julia_IsVillain) C008_DramaClass_Villain_CurrentStage = 500; else C008_DramaClass_Villain_CurrentStage = 400;
	if (C008_DramaClass_Julia_IsDamsel) C008_DramaClass_Damsel_CurrentStage = 500; else C008_DramaClass_Damsel_CurrentStage = 400;
}

// Chapter 8 - Julia - Julia as a damsel can strip to be tied up
function C008_DramaClass_Julia_Strip() {
	ActorSetCloth("Underwear");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 8 - Julia Untie
function C008_DramaClass_Julia_Untie() {
	ActorUntie();
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia Ungag
function C008_DramaClass_Julia_Ungag() {
	ActorUngag();
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia Kiss
function C008_DramaClass_Julia_Kiss() {
	if (!C008_DramaClass_Julia_KissDone) { GameLogAdd("Kiss"); C008_DramaClass_Julia_KissDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia Tickle
function C008_DramaClass_Julia_Tickle() {
	if (!C008_DramaClass_Julia_TickleDone) { C008_DramaClass_Julia_TickleDone = true; ActorChangeAttitude(1, 0); }
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia Spank
function C008_DramaClass_Julia_Spank() {
	if (!C008_DramaClass_Julia_SpankDone) { C008_DramaClass_Julia_SpankDone = true; ActorChangeAttitude(-1, 0); }
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia Masturbate, she can climax if she has the vibrating egg
function C008_DramaClass_Julia_Masturbate() {
	OverridenIntroImage = "";
	C008_DramaClass_Julia_MastubateCount++;
	if (C008_DramaClass_Julia_MastubateCount <= 3) ActorChangeAttitude(-1, 0);
	if ((C008_DramaClass_Julia_MastubateCount >= 3) && !C008_DramaClass_Julia_OrgasmDone && ActorHasInventory("VibratingEgg")) { 
		C008_DramaClass_Julia_OrgasmDone = true;
		ActorAddOrgasm(); 
		ActorChangeAttitude(2, 0); 
		OverridenIntroText = GetText("Orgasm");
		OverridenIntroImage = "BackgroundOrgasm.jpg";
	}
}

// Chapter 8 - Julia can be flattered with a "quiant" comment
function C008_DramaClass_Julia_QuaintComment() {
	if (!C008_DramaClass_Julia_QuaintCommentDone) {
		C008_DramaClass_Julia_QuaintCommentDone = true;
		ActorChangeAttitude(1 + PlayerGetSkillLevel("Seduction"), 0);
	}
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia can be insulted with a weight comment
function C008_DramaClass_Julia_WeightComment() {
	if (!C008_DramaClass_Julia_WeightCommentDone) { C008_DramaClass_Julia_WeightCommentDone = true; ActorChangeAttitude(-2, 0); }
	PlayerRandomBondage();
	if (!Common_PlayerRestrained) { PlayerLockInventory("Rope"); PlayerClothes("Underwear"); }
	if (!Common_PlayerGagged) PlayerLockInventory("ClothGag");
	CurrentTime = CurrentTime + 50000;
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia the queen will not accept a rebellion and put everyone in bondage
function C008_DramaClass_Julia_Rebellion() {
	GameLogAdd("Rebellion");
	C008_DramaClass_Julia_RebellionAvail = false;
	CurrentTime = CurrentTime + 170000;
	PlayerRandomBondage();
	if (!Common_PlayerRestrained) { PlayerLockInventory("Rope"); PlayerClothes("Underwear"); }
	if (!Common_PlayerGagged) PlayerLockInventory("ClothGag");
	CurrentActor = "Sarah";
	if (!ActorIsRestrained()) { ActorAddInventory("Rope"); ActorSetCloth("Underwear"); }
	if (!ActorIsGagged()) ActorAddInventory("ClothGag");	
	CurrentActor = "Amanda";
	if (!ActorIsRestrained()) { ActorAddInventory("Rope"); ActorSetCloth("Underwear"); }
	if (!ActorIsGagged()) ActorAddInventory("ClothGag");
	CurrentActor = "Julia";
	C008_DramaClass_Julia_CalcParams();
}

// Chapter 8 - Julia can release the player depending of the relationship
function C008_DramaClass_Julia_BegRelease() {
	if (!C008_DramaClass_Julia_WeightCommentDone && C008_DramaClass_Julia_RebellionAvail && (ActorGetValue(ActorLove) > 0)) {
		OverridenIntroText = GetText("AcceptRelease");
		PlayerClothes(C008_DramaClass_JuliaIntro_PlayerRole);
		PlayerReleaseBondage();
		C008_DramaClass_Julia_CalcParams();
	}
}