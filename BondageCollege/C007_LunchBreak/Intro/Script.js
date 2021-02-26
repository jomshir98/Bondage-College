// Chapter 7 - Lunch Break Load
function C007_LunchBreak_Intro_Load() {

	// Time is always 11:45 on the intro, no timer
	StopTimer(11.75 * 60 * 60 * 1000);
	
}

// Chapter 7 - Lunch Break Run
function C007_LunchBreak_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 450, 150, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 450, 250, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 350, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 450, "White");

}

// Chapter 7 - Lunch Break Click
function C007_LunchBreak_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, "ActorSelect");
}