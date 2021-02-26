var C003_MorningDetention_Intro_Fighting = false;

// Chapter 3 - Intro Load
function C003_MorningDetention_Intro_Load() {
	
	// Time is always 8:20 on the intro + remove any remaining rope
	StopTimer(8.33333334 * 60 * 60 * 1000);
	PlayerRemoveAllInventory();
	
	// Set the fighting variable based on if the player fought Sidney in the 1st chapter
	C003_MorningDetention_Intro_Fighting = (GameLogQuery("C001_BeforeClass", "Sidney", "FightVictory") || GameLogQuery("C001_BeforeClass", "Sidney", "FightDefeat"));	
	if (!C003_MorningDetention_Intro_Fighting) GameLogSpecificAdd("C001_BeforeClass", "", "PublicBondage");

}

// Chapter 3 - Intro Run
function C003_MorningDetention_Intro_Run() {

	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 450, 50, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 450, 150, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 250, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 350, "White");
	if (TextPhase >= 4) DrawText(GetText("Intro5"), 450, 450, "White");
	if (TextPhase >= 5) DrawText(GetText("Intro6"), 450, 550, "White");
		
}

// Chapter 3 - Intro Click
function C003_MorningDetention_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 6)
		SetScene(CurrentChapter, "DetentionRoom");
}