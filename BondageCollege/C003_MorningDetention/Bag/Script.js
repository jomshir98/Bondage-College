var C003_MorningDetention_Bag_CurrentStage = 0;
var C003_MorningDetention_Bag_PillInBag = true;
var C003_MorningDetention_Bag_EggInBag = true;
var C003_MorningDetention_Bag_PillInBagAvail = true;
var C003_MorningDetention_Bag_EggInBagAvail = true;

// Chapter 3 - Bag Load
function C003_MorningDetention_Bag_Load() {

	// Load the scene parameters
	LeaveIcon = "Leave";
	LeaveScreen = "DetentionRoom";
	LoadInteractions();
	C003_MorningDetention_Bag_PillInBagAvail = (C003_MorningDetention_Bag_PillInBag && Common_PlayerNotRestrained);
	C003_MorningDetention_Bag_EggInBagAvail = (C003_MorningDetention_Bag_EggInBag && Common_PlayerNotRestrained);

}

// Chapter 3 - Bag Run
function C003_MorningDetention_Bag_Run() {
	BuildInteraction(C003_MorningDetention_Bag_CurrentStage);
}

// Chapter 3 - Bag Click
function C003_MorningDetention_Bag_Click() {
	ClickInteraction(C003_MorningDetention_Bag_CurrentStage);
}

// Chapter 3 - Bag Steal Pill
function C003_MorningDetention_Bag_StealPill() {	

	// Steal the sleeping pill from the bag
	PlayerAddInventory("SleepingPill", 1);
	C003_MorningDetention_Bag_PillInBag = false;
	C003_MorningDetention_Bag_PillInBagAvail = false;
	GameLogSpecificAdd(CurrentChapter, "Yuki", "StealSleepingPill");

}

// Chapter 3 - Bag Steal Egg
function C003_MorningDetention_Bag_StealEgg() {	

	// Steal the vibrating egg from the bag
	PlayerAddInventory("VibratingEgg", 1);
	C003_MorningDetention_Bag_EggInBag = false;
	C003_MorningDetention_Bag_EggInBagAvail = false;
	GameLogSpecificAdd(CurrentChapter, "Yuki", "StealVibratingEgg");

}
