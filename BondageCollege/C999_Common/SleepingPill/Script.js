var C999_Common_SleepingPill_CurrentStage = 0;

// Chapter Common - SleepingPill Load
function C999_Common_SleepingPill_Load() {
	LeaveIcon = "Leave";
	LoadInteractions();
}

// Chapter Common - SleepingPill Run
function C999_Common_SleepingPill_Run() {
	BuildInteraction(C999_Common_SleepingPill_CurrentStage);
}

// Chapter Common - SleepingPill Click, allow regular interactions and clicking on another item
function C999_Common_SleepingPill_Click() {
	ClickInteraction(C999_Common_SleepingPill_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}