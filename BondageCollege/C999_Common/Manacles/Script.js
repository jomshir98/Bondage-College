var C999_Common_Manacles_CurrentStage = 0;
var C999_Common_Manacles_HasLooseManacles = 0;
var C999_Common_Manacles_HasKey = false;

// Chapter Common - Manacles Load
function C999_Common_Manacles_Load() {
	
	// Load the scene parameters
	LeaveIcon = "Leave";
	C999_Common_Manacles_HasKey = (PlayerHasInventory("PadlockKey"))
	LoadInteractions();
	
	// Set the correct starting stage
	if (PlayerHasLockedInventory("Manacles") == true) C999_Common_Manacles_CurrentStage = 10;
	else C999_Common_Manacles_CurrentStage = 0;
	
	// If the player has a loose Manacles
	C999_Common_Manacles_HasLooseManacles = PlayerHasInventory("Manacles");
	
}

// Chapter Common - Manacles Run, we draw the regular player image if the item is on
function C999_Common_Manacles_Run() {
	BuildInteraction(C999_Common_Manacles_CurrentStage);
	if (PlayerHasLockedInventory("Manacles") && (OverridenIntroImage == "")) DrawPlayerImage(150, 240);
}

// Chapter Common - Manacles Click, allow regular interactions and clicking on another item
function C999_Common_Manacles_Click() {
	OverridenIntroImage = "";
	ClickInteraction(C999_Common_Manacles_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Player shackles herself with the manacles
function C999_Common_Manacles_SelfShackle() {
	if ((Common_BondageAllowed) && (Common_SelfBondageAllowed)) {
		PlayerRemoveInventory("Manacles", 1);
		PlayerLockInventory("Manacles");
		C999_Common_Manacles_HasLooseManacles = PlayerHasInventory("Manacles");
	} else {
		OverridenIntroText = GetText("BadTiming");
		C999_Common_Manacles_CurrentStage = 0;
	}
}

// Chapter Common - Unlock
function C999_Common_Manacles_Unlock() {
	PlayerAddInventory("Manacles", 1);
	PlayerUnlockInventory("Manacles");
}

// Chapter Common - Show the item image
function C999_Common_Manacles_ShowImage() {
	OverridenIntroImage = "Manacles.jpg";
}