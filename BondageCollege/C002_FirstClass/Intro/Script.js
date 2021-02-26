// Chapter 2 - Intro Load
function C002_FirstClass_Intro_Load() {

	// Time is always 8:00 on the intro, no timer
	StopTimer(8 * 60 * 60 * 1000);

}

// Chapter 2 - Intro Run
function C002_FirstClass_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 450, 100, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 450, 200, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 300, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 400, "White");
	if (TextPhase >= 4) DrawText(GetText("Intro5"), 450, 500, "White");

}

// Chapter 2 - Intro Click
function C002_FirstClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 5)
		SetScene(CurrentChapter, "Mildred");
}