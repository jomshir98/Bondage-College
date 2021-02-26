var C999_Common_Armbinder_CurrentStage = 0;
var C999_Common_Armbinder_HasLooseArmbinder = 0;

// Chapter Common - Armbinder Load
function C999_Common_Armbinder_Load() {
	
	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct starting stage
	if (PlayerHasLockedInventory("Armbinder") == true) C999_Common_Armbinder_CurrentStage = 10;
	else C999_Common_Armbinder_CurrentStage = 0;
	
	// If the player has a loose Armbinder
	C999_Common_Armbinder_HasLooseArmbinder = PlayerHasInventory("Armbinder");
	
}

// Chapter Common - Armbinder Run, we draw the regular player image if the item is on
function C999_Common_Armbinder_Run() {
	BuildInteraction(C999_Common_Armbinder_CurrentStage);
	if (PlayerHasLockedInventory("Armbinder") && (OverridenIntroImage == "")) DrawPlayerImage(150, 240);
}

// Chapter Common - Armbinder Click, allow regular interactions and clicking on another item
function C999_Common_Armbinder_Click() {
	OverridenIntroImage = "";
	ClickInteraction(C999_Common_Armbinder_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Show the item image
function C999_Common_Armbinder_ShowImage() {
	OverridenIntroImage = "Armbinder.jpg";
}

// Chapter Common - When the player wants to strap herself
function C999_Common_Armbinder_QuerySelfBondage() {
	if (!Common_BondageAllowed || !Common_SelfBondageAllowed)
		OverridenIntroText = GetText("BadTiming");
}