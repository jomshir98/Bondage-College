var C999_Common_RustyHook_CurrentStage = 0;

// Chapter Common - RustyHook Load
function C999_Common_RustyHook_Load() {
	LeaveIcon = "Leave";
	LoadInteractions();
}

// Chapter Common - RustyHook Run
function C999_Common_RustyHook_Run() {
	BuildInteraction(C999_Common_RustyHook_CurrentStage);
}

// Chapter Common - RustyHook Click, allow regular interactions and clicking on another item
function C999_Common_RustyHook_Click() {
	ClickInteraction(C999_Common_RustyHook_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}