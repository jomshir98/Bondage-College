// Chapter 1 - Intro Load
function C001_BeforeClass_Intro_Load() {

	// Time is always 7:40 on the intro, no timer
	StopTimer(7.66666667 * 60 * 60 * 1000);
	
}

// Chapter 1 - Intro Run
function C001_BeforeClass_Intro_Run() {
	
	// Draw the background and player
	if (TextPhase <= 2) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background1.jpg", 0, 0);
	else DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background2.jpg", 0, 0);
	DrawPlayerTransition();
	
	// Introduce chapter 1 with each clicks
	DrawText(GetText("Intro1"), 450, 50, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 450, 150, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 250, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 350, "White");
	if (TextPhase >= 4) DrawText(GetText("Intro5"), 450, 450, "White");
	if (TextPhase >= 5) DrawText(GetText("Intro6"), 450, 550, "White");

}

// Chapter 1 - Intro Click
function C001_BeforeClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 6)
		SetScene(CurrentChapter, "Classroom");
}