var C003_MorningDetention_Yuki_CurrentStage = 0;
var C003_MorningDetention_Yuki_Fighting = false;
var C003_MorningDetention_Yuki_Bondage = false;
var C003_MorningDetention_Yuki_Sleepy = false;
var C003_MorningDetention_Yuki_CanSearch = true;
var C003_MorningDetention_Yuki_EggReady = false;
var C003_MorningDetention_Yuki_EggInside = false;
var C003_MorningDetention_Yuki_SidneyGone = false;
var C003_MorningDetention_Yuki_TickleDone = false;

// Chapter 3 - Yuki Load
function C003_MorningDetention_Yuki_Load() {

	// Jump directly to stage 100 if the teacher was drugged and sleeping
	if ((C003_MorningDetention_DetentionRoom_SleepTimer > 0) && (CurrentTime >= C003_MorningDetention_DetentionRoom_SleepTimer) && (C003_MorningDetention_Yuki_CurrentStage < 100)) 
		C003_MorningDetention_Yuki_CurrentStage = 100;

	// Flag if Yuki is sleepy or Sidney is gone
	C003_MorningDetention_Yuki_Sleepy = (C003_MorningDetention_DetentionRoom_SleepTimer > 0);
	C003_MorningDetention_Yuki_SidneyGone = C003_MorningDetention_DetentionRoom_SidneyGone;	
	
	// Load the scene parameters
	C003_MorningDetention_Yuki_EggReady = false;
	C003_MorningDetention_Yuki_Fighting = C003_MorningDetention_Intro_Fighting;
	C003_MorningDetention_Yuki_Bondage = !C003_MorningDetention_Intro_Fighting;
	ActorLoad("Yuki", "DetentionRoom");
	LoadInteractions();
	if (C003_MorningDetention_Yuki_CurrentStage == 40) C003_MorningDetention_Yuki_CurrentStage = 50;
	if ((C003_MorningDetention_Yuki_CurrentStage == 50) && Common_PlayerRestrained) C003_MorningDetention_Yuki_CurrentStage = 60;
	if ((C003_MorningDetention_Yuki_CurrentStage == 60) && Common_PlayerGagged) C003_MorningDetention_Yuki_CurrentStage = 70;

}

// Chapter 3 - Yuki Run
function C003_MorningDetention_Yuki_Run() {
	BuildInteraction(C003_MorningDetention_Yuki_CurrentStage);
}

// Chapter 3 - Yuki Click
function C003_MorningDetention_Yuki_Click() {	

	// Regular interaction
	ClickInteraction(C003_MorningDetention_Yuki_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// Special code for when the user wants to lock Yuki
	if ((ClickInv == "Cuffs") && (C003_MorningDetention_Yuki_CurrentStage == 110) && Common_PlayerNotRestrained) {
		PlayerRemoveInventory("Cuffs", 1);
		ActorAddInventory("Cuffs");
		OverridenIntroText = GetText("Cuffs");
		C003_MorningDetention_Yuki_CurrentStage = 120;
		CurrentTime = CurrentTime + 60000;
	} 
	
	// Special code for when the user wants to unlock Yuki when she sleeps
	if ((ClickInv == "CuffsKey") && ((C003_MorningDetention_Yuki_CurrentStage == 120) || (C003_MorningDetention_Yuki_CurrentStage == 130)) && Common_PlayerNotRestrained) {
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		OverridenIntroText = GetText("Unlock");
		C003_MorningDetention_Yuki_CurrentStage = 110;
		CurrentTime = CurrentTime + 60000;
	} 

	// Special code for when the user wants to unlock Yuki when she's awake
	if ((ClickInv == "CuffsKey") && (C003_MorningDetention_Yuki_CurrentStage == 230) && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("UnlockTurnTables");
		ActorRemoveInventory("Cuffs");
		C003_MorningDetention_Yuki_CurrentStage = 260;
		C003_MorningDetention_Yuki_FullRestrain();
		CurrentTime = CurrentTime + 60000;
	}

	// Special code for when the user wants to use the egg on sleeping Yuki
	if ((ClickInv == "VibratingEgg") && (C003_MorningDetention_Yuki_CurrentStage >= 110) && (C003_MorningDetention_Yuki_CurrentStage <= 130) && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("VibratingEggReady");
		C003_MorningDetention_Yuki_EggReady = true;
	} 

	// Special code for when the user wants to use an item when Yuki is awake
	if (((ClickInv == "VibratingEgg") || (ClickInv == "SleepingPill")) && (C003_MorningDetention_Yuki_CurrentStage < 100) && Common_PlayerNotRestrained)
		C003_MorningDetention_Yuki_CurrentStage = 30;
	
}

// Chapter 3 - Yuki Confiscate
function C003_MorningDetention_Yuki_Confiscate() {	
	PlayerRemoveInventory("VibratingEgg", 1);
	PlayerRemoveInventory("SleepingPill", 1);	
}

// Chapter 3 - Yuki Search
function C003_MorningDetention_Yuki_Search() {	
	C003_MorningDetention_Yuki_CanSearch = false;
	PlayerAddInventory("Cuffs", 1);
	if (PlayerHasInventory("CuffsKey") == false) PlayerAddInventory("CuffsKey", 1);
}

// Chapter 3 - Yuki Search for Cuff Keys
function C003_MorningDetention_Yuki_SearchCuffKeys() {
	if (PlayerHasInventory("CuffsKey") == false) {
		PlayerAddInventory("CuffsKey", 1);
		OverridenIntroText = GetText("FindKey");
	}
}

// Chapter 3 - Yuki Insert
function C003_MorningDetention_Yuki_Insert() {	
	C003_MorningDetention_Yuki_EggReady = false;
	C003_MorningDetention_Yuki_EggInside = true;
	PlayerRemoveInventory("VibratingEgg", 1);
	ActorAddInventory("VibratingEgg");
}

// Chapter 3 - Yuki Escape
function C003_MorningDetention_Yuki_Escape() {	
	SetScene(CurrentChapter, "Outro");
}

// Chapter 3 - Yuki Annoyed
function C003_MorningDetention_Yuki_Annoyed() {
	if (ActorGetValue(ActorLove) <= -4) {
		PlayerLockInventory("Cuffs");
		OverridenIntroText = GetText("Annoyed");
	}
}

// Chapter 3 - Yuki Gag Player
function C003_MorningDetention_Yuki_GagPlayer() {
	PlayerLockInventory("TapeGag");
	CurrentTime = CurrentTime + 60000;
}

// Chapter 3 - Yuki No Crime
function C003_MorningDetention_Yuki_NoCrime() {
	C003_MorningDetention_DetentionRoom_SidneyStrip = false;
	GameLogAdd("DrugAwake");
	LeaveIcon = "Leave";
}

// Chapter 3 - Yuki No Leave (when she's woke up)
function C003_MorningDetention_Yuki_NoLeave() {
	LeaveIcon = "";
	C003_MorningDetention_DetentionRoom_SleepTimer = 0;
}

// Chapter 3 - Yuki Allow Leave
function C003_MorningDetention_Yuki_AllowLeave() {
	LeaveIcon = "Leave";
}

// Chapter 3 - Yuki Tickle
function C003_MorningDetention_Yuki_Tickle() {
	if (!C003_MorningDetention_Yuki_TickleDone) {
		C003_MorningDetention_Yuki_TickleDone = true;
		ActorChangeAttitude(-1, 1);
	}
}

// Chapter 3 - Yuki Full Restrain
function C003_MorningDetention_Yuki_FullRestrain() {
	PlayerRemoveAllInventory();
	PlayerLockInventory("Cuffs");
	PlayerLockInventory("TapeGag");
	C003_MorningDetention_Yuki_NoCrime();
	GameLogAdd("DrugAdmit");
}

// Chapter 3 - Yuki Ungag Player
function C003_MorningDetention_Yuki_Ungag() {
	PlayerUnlockInventory("TapeGag");
}