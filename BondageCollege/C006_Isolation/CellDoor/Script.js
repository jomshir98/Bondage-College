var C006_Isolation_CellDoor_CurrentStage = 0;

// Chapter 6 - Cell Door Load
function C006_Isolation_CellDoor_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "IsolationRoom";
	LoadInteractions();
}

// Chapter 6 - Cell Door Run
function C006_Isolation_CellDoor_Run() {
	BuildInteraction(C006_Isolation_CellDoor_CurrentStage);
}

// Chapter 6 - Cell Door Click
function C006_Isolation_CellDoor_Click() {	

	// Regular interactions
	ClickInteraction(C006_Isolation_CellDoor_CurrentStage);

	// The hook can be used to pick the lock
	if (GetClickedInventory() == "RustyHook") {
		C006_Isolation_CellDoor_CurrentStage = 10;
		OverridenIntroText = GetText("PickLock");
		PlayerRemoveInventory("RustyHook", 1);
		C006_Isolation_IsolationRoom_AllowPickLock = true;
	}

}

// Starts the lock picking process from the cell door menu
function C006_Isolation_CellDoor_PickLock() {
	SetScene(CurrentChapter, LeaveScreen);
	MouseX = 900;
	MouseY = 300;
	C006_Isolation_IsolationRoom_Click();
}