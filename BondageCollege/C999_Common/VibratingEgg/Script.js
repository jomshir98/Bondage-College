var C999_Common_VibratingEgg_CurrentStage = 0;
var C999_Common_VibratingEgg_HasLooseEgg = false;
var C999_Common_VibratingEgg_ConfirmInsert = false;

// Chapter Common - Egg Load
function C999_Common_VibratingEgg_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LoadInteractions();
	
	// Set the correct stage
	C999_Common_VibratingEgg_ConfirmInsert = false;
	C999_Common_VibratingEgg_CurrentStage = 0;
	if (PlayerHasLockedInventory("VibratingEgg")) C999_Common_VibratingEgg_CurrentStage = 10;
	if ((PlayerHasLockedInventory("VibratingEgg")) && Common_PlayerRestrained) C999_Common_VibratingEgg_CurrentStage = 20;

	// If the player has a loose egg
	C999_Common_VibratingEgg_HasLooseEgg = PlayerHasInventory("VibratingEgg");

}

// Chapter Common - Egg Run, we draw the regular player image if the item is on
function C999_Common_VibratingEgg_Run() {
	BuildInteraction(C999_Common_VibratingEgg_CurrentStage);
	if (PlayerHasLockedInventory("VibratingEgg") && (OverridenIntroImage == "")) DrawPlayerImage(0, 0);
}

// Chapter Common - Egg Click, allow regular interactions and clicking on another item
function C999_Common_VibratingEgg_Click() {
	OverridenIntroImage = "";
	ClickInteraction(C999_Common_VibratingEgg_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}

// Chapter Common - Egg Insert, it doesn't work with a chastity belt and the player must confirm
function C999_Common_VibratingEgg_Insert() {
	if (!Common_PlayerChaste) {
		if (!C999_Common_VibratingEgg_ConfirmInsert) {
			C999_Common_VibratingEgg_ConfirmInsert = true;
			OverridenIntroText = GetText("ConfirmInsert");
		} else {
			PlayerRemoveInventory("VibratingEgg", 1);
			PlayerLockInventory("VibratingEgg");
			C999_Common_VibratingEgg_CurrentStage = 10;
			C999_Common_VibratingEgg_HasLooseEgg = PlayerHasInventory("VibratingEgg");
		}		
	} else {
		OverridenIntroText = GetText("ChastityBelt");
	}
}

// Chapter Common - Egg Contract, the egg can be removed if the player isn't chaste and has "Sports" at level 1 or more
function C999_Common_VibratingEgg_Contract() {
	if (!Common_PlayerChaste) {
		if (PlayerGetSkillLevel("Sports") >= 1) {
			PlayerUnlockInventory("VibratingEgg");
			PlayerAddInventory("VibratingEgg", 1);
			C999_Common_VibratingEgg_CurrentStage = 0;
			C999_Common_VibratingEgg_HasLooseEgg = true;
			OverridenIntroText = GetText("ContractSuccess");
		}
	}
	else OverridenIntroText = GetText("ContractBelt");
}

// Chapter Common - Show the item image
function C999_Common_VibratingEgg_ShowImage() {
	OverridenIntroImage = "Egg.jpg";
}