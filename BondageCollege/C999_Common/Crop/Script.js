var C999_Common_Crop_CurrentStage = 0;

// Chapter Common - Crop Load
function C999_Common_Crop_Load() {
	LeaveIcon = "Leave";
	LoadInteractions();
}

// Chapter Common - Crop Run
function C999_Common_Crop_Run() {
	BuildInteraction(C999_Common_Crop_CurrentStage);
}

// Chapter Common - Crop Click, allow regular interactions and clicking on another item
function C999_Common_Crop_Click() {
	ClickInteraction(C999_Common_Crop_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}