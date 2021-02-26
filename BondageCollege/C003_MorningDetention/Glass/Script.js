var C003_MorningDetention_Glass_CurrentStage = 0;

// Chapter 3 - Glass Load
function C003_MorningDetention_Glass_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "DetentionRoom";
	LoadInteractions();
}

// Chapter 3 - Glass Run
function C003_MorningDetention_Glass_Run() {
	BuildInteraction(C003_MorningDetention_Glass_CurrentStage);
}

// Chapter 3 - Glass Click
function C003_MorningDetention_Glass_Click() {	

	// Regular interaction
	ClickInteraction(C003_MorningDetention_Glass_CurrentStage);
	
	// Special code for when the user wants to use the sleeping pills
	if ((C003_MorningDetention_Glass_CurrentStage == 0) && (GetClickedInventory() == "SleepingPill"))
		C003_MorningDetention_Glass_CurrentStage = 10;

}

// Chapter 3 - Glass Break Pill
function C003_MorningDetention_Glass_BreakPill() {	

	// Remove the pill from the player and starts the timer for 10 minutes
	if (Common_PlayerNotRestrained) {
		C003_MorningDetention_DetentionRoom_SleepTimer = CurrentTime + 600000;
		PlayerRemoveInventory("SleepingPill", 1);
		GameLogSpecificAdd(CurrentChapter, "Yuki", "Drug");
	} else {
		OverridenIntroText = GetText("CannotWithCuffs");
	}
	
}

