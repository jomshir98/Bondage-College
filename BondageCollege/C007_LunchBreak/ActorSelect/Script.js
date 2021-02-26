var C007_LunchBreak_ActorSelect_CurrentStage = 0;
var C007_LunchBreak_ActorSelect_AmandaAvail = true;
var C007_LunchBreak_ActorSelect_SarahAvail = true;
var C007_LunchBreak_ActorSelect_SidneyAvail = true;
var C007_LunchBreak_ActorSelect_JenniferAvail = true;
var C007_LunchBreak_ActorSelect_NatalieAvail = true;
var C007_LunchBreak_ActorSelect_Actor = "";
var C007_LunchBreak_ActorSelect_BonusDone = false;
var C007_LunchBreak_ActorSelect_EarlyLeave = false;
var C007_LunchBreak_ActorSelect_EvilEnding = false;
var C007_LunchBreak_ActorSelect_NoFood = false;
var C007_LunchBreak_ActorSelect_Kinbaku = false;

// Chapter 7 - Lunch Break - Actor Select Load
function C007_LunchBreak_ActorSelect_Load() {
	
	// 1 hour is allowed for lunch, starts the timer
	StartTimer(12.75 * 60 * 60 * 1000, CurrentChapter, "Outro");
	
	// Allow the player to invite a student
	LeaveIcon = "";
	LeaveScreen = "";
	Common_SelfBondageAllowed = false;
	LoadInteractions();
	
}

// Chapter 7 - Lunch Break - Actor Select Run
function C007_LunchBreak_ActorSelect_Run() {
	BuildInteraction(C007_LunchBreak_ActorSelect_CurrentStage);
}

// Chapter 7 - Lunch Break - Actor Select Click
function C007_LunchBreak_ActorSelect_Click() {	
	ClickInteraction(C007_LunchBreak_ActorSelect_CurrentStage);
	InventoryClick(GetClickedInventory(), CurrentChapter, "ActorSelect");
}

// When the user selects an actor, we load it
function C007_LunchBreak_ActorSelect_LoadActor(ActorToLoad) {	
	C007_LunchBreak_ActorSelect_Actor = ActorToLoad;
	SetScene(CurrentChapter, ActorToLoad)
}

// Skip the lunch break, eat alone
function C007_LunchBreak_ActorSelect_SkipLunch() {
	C007_LunchBreak_ActorSelect_Actor = "";
	SetScene(CurrentChapter, "Outro");
}
