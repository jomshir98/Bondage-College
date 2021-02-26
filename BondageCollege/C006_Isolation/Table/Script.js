var C006_Isolation_Table_CurrentStage = 0;

// Chapter 6 - Cell Table Load
function C006_Isolation_Table_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "IsolationRoom";
	LoadInteractions();
}

// Chapter 6 - Cell Table Run
function C006_Isolation_Table_Run() {
	BuildInteraction(C006_Isolation_Table_CurrentStage);
}

// Chapter 6 - Cell Table Click
function C006_Isolation_Table_Click() {	

	// Regular interactions
	ClickInteraction(C006_Isolation_Table_CurrentStage);

	// The metal sheet can be used on the table
	if (GetClickedInventory() == "MetalSheet") {
		C006_Isolation_Table_CurrentStage = 10;
		OverridenIntroText = GetText("UseSheet");
		PlayerRemoveInventory("MetalSheet", 1);
		C006_Isolation_IsolationRoom_AllowCutRope = true;
	}

}

// Starts the rope cutting process from the menu
function C006_Isolation_Table_CutRope() {
	SetScene(CurrentChapter, LeaveScreen);
	MouseX = 910;
	MouseY = 220;
	C006_Isolation_IsolationRoom_Click();
}