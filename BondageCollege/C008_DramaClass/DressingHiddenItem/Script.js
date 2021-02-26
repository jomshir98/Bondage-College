var C008_DramaClass_DressingHiddenItem_CurrentStage = 0;
var C008_DramaClass_DressingHiddenItem_SearchCount = 0;

// Chapter 8 - Hidden Item - Load
function C008_DramaClass_DressingHiddenItem_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "DressingRoom";
	LoadInteractions();
}

// Chapter 8 - Hidden Item - Run
function C008_DramaClass_DressingHiddenItem_Run() {
	BuildInteraction(C008_DramaClass_DressingHiddenItem_CurrentStage);
}

// Chapter 8 - Hidden Item - Click
function C008_DramaClass_DressingHiddenItem_Click() {
	ClickInteraction(C008_DramaClass_DressingHiddenItem_CurrentStage);
}

// Chapter 8 - Hidden Item - Search
function C008_DramaClass_DressingHiddenItem_Search() {
	
	// After 1 search, a cloth gag, after 3 searches, a random item
	C008_DramaClass_DressingHiddenItem_SearchCount++;
	if (C008_DramaClass_DressingHiddenItem_SearchCount == 1) {
		OverridenIntroText = GetText("FindClothGag");
		PlayerAddInventory("ClothGag", 1);
	}
	if (C008_DramaClass_DressingHiddenItem_SearchCount == 3) {
		OverridenIntroText = GetText("FindItem");
		PlayerAddRandomItem();
	}
}