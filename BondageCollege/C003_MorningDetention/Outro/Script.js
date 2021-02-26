var C003_MorningDetention_Outro_EscapedDetention = false;

// Chapter 3 - Outro Load
function C003_MorningDetention_Outro_Load() {
	
	// Time is always 9:15:00 in the outro
	C003_MorningDetention_Outro_EscapedDetention = (CurrentTime < 9 * 60 * 60 * 1000);
	if (C003_MorningDetention_Outro_EscapedDetention) GameLogSpecificAdd(CurrentChapter, "Yuki", "Escape");
	if (!C003_MorningDetention_Outro_EscapedDetention && ((C003_MorningDetention_Yuki_CurrentStage == 250) || (C003_MorningDetention_Yuki_CurrentStage == 260))) GameLogSpecificAdd(CurrentChapter, "Yuki", "DetentionFull");
	if (C003_MorningDetention_Yuki_CurrentStage == 270) GameLogSpecificAdd(CurrentChapter, "Yuki", "DrugSidney");
	StopTimer(9 * 60 * 60 * 1000);
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Sidney", false);
	ActorSpecificClearInventory("Yuki", false);

}

// Chapter 3 - Outro Run
function C003_MorningDetention_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
			
	// Write the chapter outro
	if (C003_MorningDetention_Outro_EscapedDetention == false) DrawText(GetText("Outro1A"), 400, 150, "White");
	if (C003_MorningDetention_Outro_EscapedDetention == true) DrawText(GetText("Outro1B"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(GetText("Outro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(GetText("Outro3"), 400, 450, "White");

}

// Chapter 3 - Outro Click
function C003_MorningDetention_Outro_Click() {
	TextPhase++;
	if (TextPhase >= 3)
		SaveMenu("C004_ArtClass", "Intro");
}