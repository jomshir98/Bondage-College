var C999_Common_DoubleOpenGag_CurrentStage = 0;

// Chapter Common - DoubleOpenGag Load
function C999_Common_DoubleOpenGag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();

	// Set the correct stage
    if (PlayerHasLockedInventory("DoubleOpenGag") == true) C999_Common_DoubleOpenGag_CurrentStage = 10;
    else C999_Common_DoubleOpenGag_CurrentStage = 0;

}

// Chapter Common - DoubleOpenGag Run, we draw the regular player image if the item is on
function C999_Common_DoubleOpenGag_Run() {
    BuildInteraction(C999_Common_DoubleOpenGag_CurrentStage);
    if (PlayerHasLockedInventory("DoubleOpenGag")) DrawPlayerImage(150, 0);
}

// Chapter Common - DoubleOpenGag Click, allow regular interactions and clicking on another item
function C999_Common_DoubleOpenGag_Click() {
    ClickInteraction(C999_Common_DoubleOpenGag_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Self DoubleOpenGag
function C999_Common_DoubleOpenGag_SelfGag() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
        PlayerUnlockInventory("TapeGag");
        PlayerUnlockInventory("BallGag");
        PlayerRemoveInventory("DoubleOpenGag", 1);
        PlayerLockInventory("DoubleOpenGag");
	} else {
		OverridenIntroText = GetText("BadTiming");
		C999_Common_DoubleOpenGag_CurrentStage = 0;
	}
}

// Chapter Common - Self Ung«g
function C999_Common_DoubleOpenGag_SelfUngag() {
    PlayerUnlockInventory("DoubleOpenGag");
    PlayerAddInventory("DoubleOpenGag", 1);
}