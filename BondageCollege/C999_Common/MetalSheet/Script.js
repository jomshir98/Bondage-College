var C999_Common_MetalSheet_CurrentStage = 0;

// Chapter Common - MetalSheet Load
function C999_Common_MetalSheet_Load() {
	LeaveIcon = "Leave";
	LoadInteractions();
}

// Chapter Common - MetalSheet Run
function C999_Common_MetalSheet_Run() {
	BuildInteraction(C999_Common_MetalSheet_CurrentStage);
}

// Chapter Common - MetalSheet Click, allow regular interactions and clicking on another item
function C999_Common_MetalSheet_Click() {
	ClickInteraction(C999_Common_MetalSheet_CurrentStage);
	InventoryClick(GetClickedInventory(), LeaveChapter, LeaveScreen);
}