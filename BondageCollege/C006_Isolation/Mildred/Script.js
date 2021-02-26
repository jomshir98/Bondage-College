var C006_Isolation_Mildred_CurrentStage = 0;
var C006_Isolation_Mildred_CropCount = 0;
var C006_Isolation_Mildred_CropMaxCount = 0;

// Chapter 6 - Mildred Load
function C006_Isolation_Mildred_Load() {

	// Load the scene parameters
	StartTimer(11.5 * 60 * 60 * 1000, CurrentChapter, "Outro");
	ActorLoad("Mildred", "IsolationRoom");
	LoadInteractions();
	LeaveIcon = "";

}

// Chapter 6 - Mildred Run
function C006_Isolation_Mildred_Run() {
	BuildInteraction(C006_Isolation_Mildred_CurrentStage);
}

// Chapter 6 - Mildred Click
function C006_Isolation_Mildred_Click() {	
	ClickInteraction(C006_Isolation_Mildred_CurrentStage);
}

// Chapter 6 - Mildred Steal Items
function C006_Isolation_Mildred_StealItems() {
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
}

// Chapter 6 - Mildred Add Collar
function C006_Isolation_Mildred_AddCollar() {
	PlayerLockInventory("Collar");
}

// Chapter 6 - Mildred Add Rope
function C006_Isolation_Mildred_AddRope() {
	PlayerClothes("Underwear");
	PlayerLockInventory("Rope");
}

// Chapter 6 - Mildred Add Gag
function C006_Isolation_Mildred_AddGag() {
	PlayerLockInventory("BallGag");
}

// Chapter 6 - Mildred Release
function C006_Isolation_Mildred_Release() {
	PlayerUnlockInventory("Collar");
	PlayerUnlockInventory("Rope");
	PlayerUnlockInventory("BallGag");
}

// Chapter 6 - Mildred Leave Isolation
function C006_Isolation_Mildred_LeaveIsolation() {
	C006_Isolation_Outro_EarlyRelease = true;
	SetScene(CurrentChapter, "Outro");	
}

// Chapter 6 - Mildred Allow Leave
function C006_Isolation_Mildred_AllowLeave() {
	LeaveIcon = "Leave";
}

// Chapter 6 - Mildred, if she doesn't like the player, she crops
function C006_Isolation_Mildred_CheckForCrop() {	
	if (ActorGetValue(ActorLove) <= -3) {
		OverridenIntroText = GetText("CropStartHate");
		C006_Isolation_Mildred_CurrentStage = 300;
		GameLogAdd("CropPlayer");
		C006_Isolation_Mildred_CropMaxCount = ActorGetValue(ActorLove) * -2;
		if (C006_Isolation_Mildred_CropMaxCount > 12) C006_Isolation_Mildred_CropMaxCount = 12;
	} else {
		if (ActorGetValue(ActorSubmission) <= -3) {
			OverridenIntroText = GetText("CropStartSub");
			C006_Isolation_Mildred_CurrentStage = 300;
			GameLogAdd("CropPlayer");
			C006_Isolation_Mildred_CropMaxCount = ActorGetValue(ActorSubmission) * -2;
			if (C006_Isolation_Mildred_CropMaxCount > 12) C006_Isolation_Mildred_CropMaxCount = 12;
		}
	}
}

// Chapter 6 - Mildred, crop the player
function C006_Isolation_Mildred_DoCrop() {
	
	// If there's still cropping to be done
	if (C006_Isolation_Mildred_CropCount < C006_Isolation_Mildred_CropMaxCount) {
		
		// The text is random and the image rotates
		C006_Isolation_Mildred_CropCount++;
		var P = Math.floor(Math.random() * 6);
		OverridenIntroText = GetText("Count" + C006_Isolation_Mildred_CropCount) + " !  " + GetText("CropEvent" + P.toString());
		OverridenIntroImage = "MildredPlayerHorseCrop" + (C006_Isolation_Mildred_CropCount % 3).toString() + ".jpg";
		
	} else {
		OverridenIntroText = GetText("CropStop");
		C006_Isolation_Mildred_CurrentStage = 330;
		OverridenIntroImage = "";
	}
	
}