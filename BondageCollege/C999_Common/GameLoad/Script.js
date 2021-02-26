var C999_Common_GameLoad_CurrentStage = 0;

// Chapter Common - GameLoad Load
function C999_Common_GameLoad_Load() {
	LeaveIcon = "";
	LoadInteractions();
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// Chapter Common - GameLoad Run
function C999_Common_GameLoad_Run() {
	
	// Build the game loading screen
	SaveStateSlotSummary();
	BuildInteraction(C999_Common_GameLoad_CurrentStage);
	DrawText(GetText("LoadGame"), 900, 420, "black");
	
}

// Chapter Common - GameLoad Click
function C999_Common_GameLoad_Click() {
	ClickInteraction(C999_Common_GameLoad_CurrentStage);
}

// Chapter Common - GameLoad, load the game on a specific slot
function C999_Common_GameLoad_LoadGame(SlotNumber) {
	LoadState(SlotNumber);
}

// Chapter Common - GameLoad, go back to the main menu
function C999_Common_GameLoad_MainMenu() {
	SetScene("C000_Intro", "ChapterSelect");
}
