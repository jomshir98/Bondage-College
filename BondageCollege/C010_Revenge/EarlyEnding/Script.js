var C010_Revenge_EarlyEnding_Type = "";

// Chapter 10 - Early Ending Load
function C010_Revenge_EarlyEnding_Load() {

	// Stop the timer for the transition
	StopTimer(CurrentTime);
	PlayerReleaseBondage();
	PlayerClothes("Clothed");
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);
	ActorSpecificClearInventory("Sidney", true);
	ActorSpecificClearInventory("Jennifer", true);
	ActorSpecificSetPose("Amanda", "");
	ActorSpecificSetPose("Sarah", "");
	ActorSpecificSetPose("Sidney", "");
	ActorSpecificSetPose("Jennifer", "");
	LeaveIcon = "";
	Common_PlayerPose = "";

}

// Chapter 10 - Early Ending Run
function C010_Revenge_EarlyEnding_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Draw the outro text
	DrawText(GetText(C010_Revenge_EarlyEnding_Type + "1"), 450, 150, "White");
	if (TextPhase >= 1) DrawText(GetText(C010_Revenge_EarlyEnding_Type + "2"), 450, 300, "White");
	if (TextPhase >= 2) DrawText(GetText(C010_Revenge_EarlyEnding_Type + "3"), 450, 450, "White");

}

// Chapter 10 - Early Ending Click
function C010_Revenge_EarlyEnding_Click() {

	// Jump to the next animation
	TextPhase++;
	if (TextPhase >= 3) SaveMenu("C009_Library", "Intro");

}