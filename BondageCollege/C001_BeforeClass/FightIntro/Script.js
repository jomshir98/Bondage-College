// Chapter 1 - Fight Load
function C001_BeforeClass_FightIntro_Load() {	

	// Set the timer limits at 8:00
	StartTimer(8 * 60 * 60 * 1000, "C001_BeforeClass", "FightOutro");
	LoadText();
	LeaveIcon = "";

}

// Chapter 1 - Fight Run
function C001_BeforeClass_FightIntro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
	
	// Each animation show an additional line of text
	DrawText(GetText("Intro1"), 400, 150, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 400, 250, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 400, 350, "White");
	if ((TextPhase >= 3) && !IsMobile) DrawText(GetText("Intro4A"), 400, 450, "White");
	if ((TextPhase >= 3) && IsMobile) DrawText(GetText("Intro4B"), 400, 450, "White");

}

// Chapter 1 - Fight Click
function C001_BeforeClass_FightIntro_Click() {
	TextPhase++;
	if (TextPhase >= 4)
		SetScene(CurrentChapter, "Fight");
}