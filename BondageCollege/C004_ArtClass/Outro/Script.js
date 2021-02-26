var C004_ArtClass_Outro_Restrained = false;
var C004_ArtClass_Outro_Crime = "";

// Chapter 4 - Outro Load
function C004_ArtClass_Outro_Load() {
	
	// Time is always 10:15:00 in the outro
	StopTimer(10.25 * 60 * 60 * 1000);
	C004_ArtClass_Outro_Restrained = Common_PlayerRestrained;
	ActorSpecificClearInventory("Jennifer", false);
	ActorSpecificClearInventory("Julia", false);
	ActorSpecificClearInventory("Sarah", false);
	
	// Gets the player crime chapter 2 or 3.  If there's any, we go to chapter 6 instead of 5.
	if (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && !GameLogQuery("C002_FirstClass", "Mildred", "Release")) C004_ArtClass_Outro_Crime = "RestrainMildred";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Drug") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugAwake")) C004_ArtClass_Outro_Crime = "DrugYuki";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Drug") && GameLogQuery("C003_MorningDetention", "Yuki", "DrugAwake") && !GameLogQuery("C003_MorningDetention", "Yuki", "DetentionFull") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugAdmit") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugSidney")) C004_ArtClass_Outro_Crime = "DrugYuki";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Escape") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugSidney")) C004_ArtClass_Outro_Crime = "DrugYuki";

}

// Chapter 4 - Outro Run
function C004_ArtClass_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
		
	// Write the chapter outro
	if (C004_ArtClass_Outro_Crime == "") {

		// No crime outro
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		DrawText(GetText("NoCrime1"), 400, 150, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(GetText("NoCrime2A"), 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(GetText("NoCrime2B"), 400, 300, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(GetText("NoCrime2C"), 400, 300, "White");
		if (TextPhase >= 2) DrawText(GetText("NoCrime3"), 400, 450, "White");
		
	} else {

		// Crime outro
		if (TextPhase <= 1) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		if ((TextPhase >= 2) && (C004_ArtClass_Outro_Crime == "RestrainMildred")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Mildred.jpg", 800, 0);
		if ((TextPhase >= 2) && (C004_ArtClass_Outro_Crime == "DrugYuki")) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Yuki.jpg", 800, 0);
		DrawText(GetText("Crime1"), 400, 100, "White");
		if ((TextPhase >= 1) && C004_ArtClass_Outro_Restrained) DrawText(GetText("Crime2A"), 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel == "Player")) DrawText(GetText("Crime2B"), 400, 200, "White");
		if ((TextPhase >= 1) && !C004_ArtClass_Outro_Restrained && (C004_ArtClass_ArtRoom_ExtraModel != "Player")) DrawText(GetText("Crime2C"), 400, 200, "White");
		if ((TextPhase >= 2) && (C004_ArtClass_Outro_Crime == "RestrainMildred")) DrawText(GetText("Crime3A"), 400, 300, "White");
		if ((TextPhase >= 2) && (C004_ArtClass_Outro_Crime == "DrugYuki")) DrawText(GetText("Crime3B"), 400, 300, "White");
		if (TextPhase >= 3) DrawText(GetText("Crime4"), 400, 400, "White");
		if (TextPhase >= 4) DrawText(GetText("Crime5"), 400, 500, "White");

	}

}

// Chapter 4 - Outro Click
function C004_ArtClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if ((TextPhase >= 3) && (C004_ArtClass_Outro_Crime == "")) SaveMenu("C005_GymClass", "Intro");
	if ((TextPhase >= 5) && (C004_ArtClass_Outro_Crime != "")) SaveMenu("C006_Isolation", "Intro");

	// Release the player on phase 2
	if (TextPhase == 2) PlayerReleaseBondage();

}