var C006_Isolation_IsolationRoom_Stage = 0;
var C006_Isolation_IsolationRoom_OrgasmReady = false;
var C006_Isolation_IsolationRoom_StruggleMessageBlink = true;
var C006_Isolation_IsolationRoom_AllowPickLock = false;
var C006_Isolation_IsolationRoom_AllowCutRope = false;

// Remove all cell ground inventory
function C006_Isolation_IsolationRoom_DropInventory() {
	C006_Isolation_CellGround_RopeAvail = true;
	C006_Isolation_CellGround_CollarAvail = true;
	C006_Isolation_CellGround_HookAvail = !C006_Isolation_IsolationRoom_AllowPickLock;
	C006_Isolation_Horse_MetalAvail = (C006_Isolation_Horse_BoltUndone && !C006_Isolation_IsolationRoom_AllowCutRope);
	PlayerRemoveInventory("Rope", 1);
	PlayerRemoveInventory("Collar", 1);
	PlayerRemoveInventory("RustyHook", 1);
	PlayerRemoveInventory("MetalSheet", 1);
}

// Chapter 6 - Isolation Room Load
function C006_Isolation_IsolationRoom_Load() {
	LeaveIcon = "Wait";
	StruggleLoad();
	C006_Isolation_IsolationRoom_OrgasmReady = (PlayerHasLockedInventory("VibratingEgg"));
	LoadText();
}

// Chapter 6 - Isolation Room Run
function C006_Isolation_IsolationRoom_Run() {
	StruggleRun(GetText("Struggle" + C006_Isolation_IsolationRoom_Stage.toString()), C006_Isolation_IsolationRoom_Stage);
}

// Chapter 6 - Isolation Room Click - The player can try to struggle out of the restrains
function C006_Isolation_IsolationRoom_Click() {

	// On stage 0, only the leg ropes can be removed, the crotch rope also works with an egg
	if ((C006_Isolation_IsolationRoom_Stage == 0) && (!StruggleDone)) {
		StruggleClick("C006_Legs", "Normal", GetText("Legs"), GetText("LegsSuccess"), 260, 315, 100);
		StruggleClick("C006_Crotch", "Easy", GetText("Crotch"), (C006_Isolation_IsolationRoom_OrgasmReady ? GetText("CrotchSuccess1") : GetText("CrotchSuccess2")), 435, 285, 70);
		StruggleClick("C006_Arms", "Impossible", GetText("ArmsImpossible"), "", 700, 240, 100);
		StruggleClick("C006_Collar", "Impossible", GetText("CollarImpossible"), "", 930, 320, 50);
		StruggleClick("C006_BallGag", "Impossible", GetText("BallGagImpossible"), "", 1055, 355, 70);
	}

	// On stage 1, only the collar can be unstrapped, the crotch rope also works with an egg
	if ((C006_Isolation_IsolationRoom_Stage == 1) && (!StruggleDone)) {
		StruggleClick("C006_Crotch", "Easy", GetText("Crotch"), (C006_Isolation_IsolationRoom_OrgasmReady ? GetText("CrotchSuccess1") : GetText("CrotchSuccess2")), 435, 285, 70);
		StruggleClick("C006_Arms", "Impossible", GetText("ArmsImpossible"), "", 700, 240, 100);
		StruggleClick("C006_Collar", "Hard", GetText("Collar"), GetText("CollarSuccess"), 910, 310, 50);
		StruggleClick("C006_BallGag", "Impossible", GetText("BallGagImpossible"), "", 1055, 355, 70);
	}

	// On stage 2, no real struggling can be done
	if ((C006_Isolation_IsolationRoom_Stage == 2) && (!StruggleDone)) {
		StruggleClick("C006_Crotch", "Easy", GetText("Crotch"), (C006_Isolation_IsolationRoom_OrgasmReady ? GetText("CrotchSuccess1") : GetText("CrotchSuccess2")), 575, 490, 65);
		StruggleClick("C006_Arms", "Impossible", GetText("ArmsImpossible"), "", 575, 350, 65);
		StruggleClick("C006_BallGag", "Impossible", GetText("BallGagImpossible"), "", 575, 210, 65);
		if ((MouseX >= 1) && (MouseX <= 450) && (MouseY >= 450) && (MouseY <= 599)) SetScene(CurrentChapter, "CellGround");
		if ((MouseX >= 750) && (MouseX <= 1150) && (MouseY >= 1) && (MouseY <= 599) && !C006_Isolation_IsolationRoom_AllowPickLock) SetScene(CurrentChapter, "CellDoor");
		if (C006_Isolation_IsolationRoom_AllowPickLock) StruggleClick("C006_CellDoor", "Normal", GetText("PickLock"), GetText("PickLockSuccess"), 900, 300, 200);
	}

	// On stage 3, no real struggling can be done
	if ((C006_Isolation_IsolationRoom_Stage == 3) && (!StruggleDone)) {
		StruggleClick("C006_Arms", "Impossible", GetText("ArmsImpossible"), "", 390, 320, 80);
		if ((MouseX >= 1) && (MouseX <= 300) && (MouseY >= 300) && (MouseY <= 599)) SetScene(CurrentChapter, "CellGround");
		if ((MouseX >= 1035) && (MouseX <= 1200) && (MouseY >= 250) && (MouseY <= 599)) SetScene(CurrentChapter, "Pillory");
		if ((MouseX >= 540) && (MouseX <= 825) && (MouseY >= 290) && (MouseY <= 450)) SetScene(CurrentChapter, "Horse");
		if ((MouseX >= 460) && (MouseX <= 630) && (MouseY >= 30) && (MouseY <= 289)) SetScene(CurrentChapter, "Cross");
		if ((MouseX >= 830) && (MouseX <= 1000) && (MouseY >= 180) && (MouseY <= 300) && (!C006_Isolation_IsolationRoom_AllowCutRope)) SetScene(CurrentChapter, "Table");
		if (C006_Isolation_IsolationRoom_AllowCutRope) StruggleClick("C006_CutRope", "Hard", GetText("CutRope"), GetText("CutRopeSuccess"), 910, 220, 100);
	}
	
	// Opens the inventory screen 
	InventoryClick(GetClickedInventory(), CurrentChapter, "IsolationRoom");

}

// Chapter 6 - Isolation Room Click
function C006_Isolation_IsolationRoom_StruggleDone() {

	// If we must move from one screen stage to another
	if ((C006_Isolation_IsolationRoom_Stage == 0) && (StruggleType == "C006_Legs")) C006_Isolation_IsolationRoom_Stage++;
	if ((C006_Isolation_IsolationRoom_Stage == 1) && (StruggleType == "C006_Collar")) { PlayerUnlockInventory("Collar"); C006_Isolation_IsolationRoom_Stage++; }
	if ((C006_Isolation_IsolationRoom_Stage == 2) && (StruggleType == "C006_CellDoor")) C006_Isolation_IsolationRoom_Stage++;
	if ((C006_Isolation_IsolationRoom_Stage == 3) && (StruggleType == "C006_CutRope")) SetScene(CurrentChapter, "Outro");
	
	// Can only have one orgasm from the crotch rope at any stage
	if (StruggleType == "C006_Crotch") C006_Isolation_IsolationRoom_OrgasmReady = false;
	
}
