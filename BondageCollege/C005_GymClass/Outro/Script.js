// Chapter 5 - Outro Load
function C005_GymClass_Outro_Load() {
	
	// Time is always 11:30:00 in the outro, unlock if needed
	StopTimer(11.5 * 60 * 60 * 1000);
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Jennifer", true);
	PlayerClothes("Clothed");

}

// Chapter 5 - Outro Run
function C005_GymClass_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		
	// Draw the outro text
	DrawText(GetText("Outro1"), 400, 200, "White");
	if (TextPhase >= 1) DrawText(GetText("Outro2"), 400, 400, "White");

}

// Chapter 5 - Outro Click
function C005_GymClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 2) SaveMenu("C007_LunchBreak", "Intro");

}