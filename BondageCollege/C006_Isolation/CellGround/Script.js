var C006_Isolation_CellGround_CurrentStage = 0;
var C006_Isolation_CellGround_RopeAvail = true;
var C006_Isolation_CellGround_CollarAvail = true;
var C006_Isolation_CellGround_HookAvail = true;

// Chapter 6 - Cell Ground Load
function C006_Isolation_CellGround_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "IsolationRoom";
	LoadInteractions();
}

// Chapter 6 - Cell Ground Run
function C006_Isolation_CellGround_Run() {
	BuildInteraction(C006_Isolation_CellGround_CurrentStage);
}

// Chapter 6 - Cell Ground Click
function C006_Isolation_CellGround_Click() {	
	ClickInteraction(C006_Isolation_CellGround_CurrentStage);
}

// Chapter 6 - Cell Ground Take Rope
function C006_Isolation_CellGround_TakeRope() {
	C006_Isolation_IsolationRoom_DropInventory();
	PlayerAddInventory("Rope", 1);
	C006_Isolation_CellGround_RopeAvail = false;
}

// Chapter 6 - Cell Ground Take Collar
function C006_Isolation_CellGround_TakeCollar() {
	C006_Isolation_IsolationRoom_DropInventory();
	PlayerAddInventory("Collar", 1);
	C006_Isolation_CellGround_CollarAvail = false;
}

// Chapter 6 - Cell Ground Take Hook
function C006_Isolation_CellGround_TakeHook() {
	C006_Isolation_IsolationRoom_DropInventory();
	PlayerAddInventory("RustyHook", 1);
	C006_Isolation_CellGround_HookAvail = false;
}