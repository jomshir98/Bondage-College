var C006_Isolation_Horse_CurrentStage = 0;
var C006_Isolation_Horse_BoltSeen = false;
var C006_Isolation_Horse_BoltUndone = false;
var C006_Isolation_Horse_MetalAvail = false;

// Chapter 6 - Horse Load
function C006_Isolation_Horse_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "IsolationRoom";
	LoadInteractions();
}

// Chapter 6 - Horse Run
function C006_Isolation_Horse_Run() {
	BuildInteraction(C006_Isolation_Horse_CurrentStage);
}

// Chapter 6 - Horse Click
function C006_Isolation_Horse_Click() {	

	// Regular interactions
	ClickInteraction(C006_Isolation_Horse_CurrentStage);
	
	// The collar can be used to get a better grip on the bolt
	if ((GetClickedInventory() == "Collar") && C006_Isolation_Horse_BoltSeen && !C006_Isolation_Horse_BoltUndone) {
		OverridenIntroText = GetText("UndoBolt");		
		C006_Isolation_Horse_BoltSeen = false;
		C006_Isolation_Horse_BoltUndone = true;
		C006_Isolation_Horse_MetalAvail = true;
		CurrentTime = CurrentTime + 10000;
	}
	
}

// Chapter 6 - Horse Allow Bolt
function C006_Isolation_Horse_AllowBolt() {
	if (!C006_Isolation_Horse_BoltUndone) 
		C006_Isolation_Horse_BoltSeen = true;
}

// Chapter 6 - Horse Take Metal
function C006_Isolation_Horse_TakeMetal() {
	C006_Isolation_IsolationRoom_DropInventory();
	PlayerAddInventory("MetalSheet", 1);
	C006_Isolation_Horse_MetalAvail = false;
}
