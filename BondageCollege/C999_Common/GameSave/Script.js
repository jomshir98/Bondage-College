var C999_Common_GameSave_CurrentStage = 0;

// Chapter Common - GameSave Load
function C999_Common_GameSave_Load() {

	// Load the scene parameters
	LeaveIcon = "";
	LoadInteractions();

}

// Chapter Common - GameSave Run
function C999_Common_GameSave_Run() {
	
	// Build the game saving screen	
	SaveStateSlotSummary();
	BuildInteraction(C999_Common_GameSave_CurrentStage);
	DrawText(GetText("SaveGame"), 900, 420, "black");
	
}

// Chapter Common - GameSave Click
function C999_Common_GameSave_Click() {
	ClickInteraction(C999_Common_GameSave_CurrentStage);
}

// Chapter Common - GameSave, save the game on a specific slot
function C999_Common_GameSave_SaveGame(SlotNumber) {
	SaveState(SlotNumber);
}

// Chapter Common - GameSave, save the game on a specific slot
function C999_Common_GameSave_Continue() {
	SetScene(SaveChapter, SaveScreen);
}
