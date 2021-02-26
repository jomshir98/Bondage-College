var C006_Isolation_Yuki_CurrentStage = 0;
var C006_Isolation_Yuki_EggInside = false;
var C006_Isolation_Yuki_AllowPullBack = true;
var C006_Isolation_Yuki_Pleasure1 = 0;
var C006_Isolation_Yuki_Pleasure2 = 0;
var C006_Isolation_Yuki_Pleasure3 = 0;

// Chapter 6 - Yuki Load
function C006_Isolation_Yuki_Load() {

	// Load the scene parameters	
	StartTimer(11.5 * 60 * 60 * 1000, CurrentChapter, "Outro");
	ActorLoad("Yuki", "IsolationRoom");
	LoadInteractions();
	LeaveIcon = "";
	C006_Isolation_Yuki_EggInside = (ActorHasInventory("VibratingEgg"));

}

// Chapter 6 - Yuki Run
function C006_Isolation_Yuki_Run() {
	BuildInteraction(C006_Isolation_Yuki_CurrentStage);
}

// Chapter 6 - Yuki Click
function C006_Isolation_Yuki_Click() {	
	ClickInteraction(C006_Isolation_Yuki_CurrentStage);
}

// Chapter 6 - Yuki Steal Items
function C006_Isolation_Yuki_StealItems() {	
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
}

// Chapter 6 - Yuki Add Collar
function C006_Isolation_Yuki_AddCollar() {
	PlayerLockInventory("Collar");
}

// Chapter 6 - Yuki Add Rope
function C006_Isolation_Yuki_AddRope() {
	PlayerClothes("Underwear");
	PlayerLockInventory("Rope");
}

// Chapter 6 - Yuki Add Gag
function C006_Isolation_Yuki_AddGag() {
	PlayerLockInventory("BallGag");
}

// Chapter 6 - Yuki Pleasure 
function C006_Isolation_Yuki_Pleasure(PleasureType) {
	
	// The player must pleasure her in 3 different ways and at least 5 times to make her climax)
	if (PleasureType == 1) C006_Isolation_Yuki_Pleasure1++;
	if (PleasureType == 2) C006_Isolation_Yuki_Pleasure2++;
	if (PleasureType == 3) C006_Isolation_Yuki_Pleasure3++;
	if ((C006_Isolation_Yuki_Pleasure1 > 0) && (C006_Isolation_Yuki_Pleasure2 > 0) && (C006_Isolation_Yuki_Pleasure3 > 0) && (C006_Isolation_Yuki_Pleasure1 + C006_Isolation_Yuki_Pleasure2 + C006_Isolation_Yuki_Pleasure3 >= 5)) {
		
		// Yuki gets an orgasm
		OverridenIntroText = GetText("Orgasm");
		C006_Isolation_Yuki_CurrentStage = 220;
		ActorChangeAttitude(2, 0);
		ActorAddOrgasm();
		
	} else {
		
		// If the player took too long to try all 3 pleasures, she gives up
		if (C006_Isolation_Yuki_Pleasure1 + C006_Isolation_Yuki_Pleasure2 + C006_Isolation_Yuki_Pleasure3 >= 7) {
			OverridenIntroText = GetText("StopPleasure");
			C006_Isolation_Yuki_CurrentStage = 250;
		}
		
	}
}

// Chapter 6 - Yuki Check to Eat
function C006_Isolation_Yuki_CheckToEat() {
	
	// Yuki forces the player if she has the egg
	if (C006_Isolation_Yuki_EggInside) {
		OverridenIntroText = GetText("LickEgg");
		GameLogAdd("Pleasure");
		C006_Isolation_Yuki_CurrentStage = 200;
	}

	// Yuki forces the player if she's dominant
	if (ActorGetValue(ActorSubmission) <= -3) {
		OverridenIntroText = GetText("LickSub");
		GameLogAdd("Pleasure");
		C006_Isolation_Yuki_CurrentStage = 200;
	}

}

// Chapter 6 - Yuki Check to Stop
function C006_Isolation_Yuki_CheckToStop() {

	// Yuki doesn't allow the player to stop if she has the egg
	if (C006_Isolation_Yuki_EggInside) {
		OverridenIntroText = GetText("NoPullEgg");
		C006_Isolation_Yuki_CurrentStage = 200;
		C006_Isolation_Yuki_AllowPullBack = false;
	}

	// Yuki doesn't allow the player to stop if she's dominant
	if (ActorGetValue(ActorSubmission) <= -3) {
		OverridenIntroText = GetText("NoPullSub");
		C006_Isolation_Yuki_CurrentStage = 200;
		C006_Isolation_Yuki_AllowPullBack = false;
	}
	
}

// Chapter 6 - Yuki Release
function C006_Isolation_Yuki_Release() {
	PlayerUnlockInventory("Collar");
	PlayerUnlockInventory("Rope");
}

// Chapter 6 - Yuki Leave Isolation
function C006_Isolation_Yuki_LeaveIsolation() {
	C006_Isolation_Outro_EarlyRelease = true;
	SetScene(CurrentChapter, "Outro");	
}

// Chapter 6 - Yuki Allow Leave
function C006_Isolation_Yuki_AllowLeave() {
	LeaveIcon = "Leave";
}
