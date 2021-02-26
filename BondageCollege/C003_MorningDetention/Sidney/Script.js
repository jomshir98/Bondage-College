var C003_MorningDetention_Sidney_CurrentStage = 0;
var C003_MorningDetention_Sidney_FightVictory = false;
var C003_MorningDetention_Sidney_FightDefeat = false;
var C003_MorningDetention_Sidney_TickleDone = false;
var C003_MorningDetention_Sidney_EggReady = false;
var C003_MorningDetention_Sidney_EggInside = false;

// Chapter 3 - Sidney Load
function C003_MorningDetention_Sidney_Load() {

	// Jump directly to stage 100 if the teacher was drugged but is not sleeping
	if ((C003_MorningDetention_DetentionRoom_SleepTimer > 0) && (CurrentTime < C003_MorningDetention_DetentionRoom_SleepTimer) && (C003_MorningDetention_Sidney_CurrentStage < 100)) 
		C003_MorningDetention_Sidney_CurrentStage = 100;

	// Jump directly to stage 200 if the teacher was drugged and is sleeping
	if ((C003_MorningDetention_DetentionRoom_SleepTimer > 0) && (CurrentTime >= C003_MorningDetention_DetentionRoom_SleepTimer) && (C003_MorningDetention_Sidney_CurrentStage < 200)) 
		C003_MorningDetention_Sidney_CurrentStage = 200;
	
	// If Sidney isn't gone and the teacher woke up, there's a special dialog
	if ((C003_MorningDetention_Yuki_CurrentStage >= 200) && (C003_MorningDetention_Sidney_CurrentStage != 160) && (C003_MorningDetention_Sidney_CurrentStage < 300) && (C003_MorningDetention_Yuki_CurrentStage != 230))
		C003_MorningDetention_Sidney_CurrentStage = 150;

	// Load the scene parameters
	C003_MorningDetention_Sidney_EggReady = false;		
	C003_MorningDetention_Sidney_FightVictory = GameLogQuery("C001_BeforeClass", "Sidney", "FightVictory");
	C003_MorningDetention_Sidney_FightDefeat = GameLogQuery("C001_BeforeClass", "Sidney", "FightDefeat");
	ActorLoad("Sidney", "DetentionRoom");
	LoadInteractions();

}

// Chapter 3 - Sidney Run
function C003_MorningDetention_Sidney_Run() {
	BuildInteraction(C003_MorningDetention_Sidney_CurrentStage);
}

// Chapter 3 - Sidney Click
function C003_MorningDetention_Sidney_Click() {	

	// Regular interaction
	ClickInteraction(C003_MorningDetention_Sidney_CurrentStage);
	var ClickInv = GetClickedInventory();
	
	// Special code for when the user wants to unlock Sidney
	if ((ClickInv == "CuffsKey") && (C003_MorningDetention_Sidney_CurrentStage < 300) && Common_PlayerNotRestrained) {
		PlayerAddInventory("Cuffs", 1);
		ActorChangeAttitude(2, 0);
		OverridenIntroText = GetText("UnlockGone");
		GameLogAdd("Unlock");
		C003_MorningDetention_Sidney_CurrentStage = 300;
		C003_MorningDetention_DetentionRoom_SidneyGone = true;
		CurrentTime = CurrentTime + 60000;
	}

	// Special code for when the user wants to use the vibrating egg on Sidney
	if ((ClickInv == "VibratingEgg") && (C003_MorningDetention_Sidney_CurrentStage < 200) && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("VibratingEggTeacher");

	// Special code for when the user wants to use the vibrating egg on Sidney
	if ((ClickInv == "SleepingPill") && (C003_MorningDetention_Sidney_CurrentStage < 200) && Common_PlayerNotRestrained)
		OverridenIntroText = GetText("SleepingPill");
	
	// Special code for when the user wants to use the vibrating egg on Sidney
	if ((ClickInv == "VibratingEgg") && (C003_MorningDetention_Sidney_CurrentStage >= 200) && (C003_MorningDetention_Sidney_CurrentStage < 300) && Common_PlayerNotRestrained) {
		OverridenIntroText = GetText("VibratingEggReady");
		C003_MorningDetention_Sidney_EggReady = true;
	}
	
}

// Chapter 3 - Sidney Strip
function C003_MorningDetention_Sidney_Strip() {	
	C003_MorningDetention_DetentionRoom_SidneyStrip = true;
}

// Chapter 3 - Sidney Dress
function C003_MorningDetention_Sidney_Dress() {	
	C003_MorningDetention_DetentionRoom_SidneyStrip = false;
}

// Chapter 3 - Sidney Unlock
function C003_MorningDetention_Sidney_Unlock() {	
	C003_MorningDetention_DetentionRoom_SidneyGone = true;
}

// Chapter 3 - Sidney Insert
function C003_MorningDetention_Sidney_Insert() {
	C003_MorningDetention_Sidney_EggReady = false;
	C003_MorningDetention_Sidney_EggInside = true;
	PlayerRemoveInventory("VibratingEgg", 1);
	ActorAddInventory("VibratingEgg");
}

// Chapter 3 - Sidney Tickle
function C003_MorningDetention_Sidney_Tickle() {
	if (C003_MorningDetention_Sidney_TickleDone == false) {
		ActorChangeAttitude(-1, 0);
		OverridenIntroText = GetText("Tickle");
		C003_MorningDetention_Sidney_TickleDone = true;
	}
}

// Chapter 3 - Sidney Kiss
function C003_MorningDetention_Sidney_Kiss() {
	GameLogAdd("Kiss");
}