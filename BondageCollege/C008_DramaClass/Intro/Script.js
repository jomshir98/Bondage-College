// Chapter 8 - Drama Class Load
function C008_DramaClass_Intro_Load() {

	// Time is always 13:00 on the intro, no timer
	StopTimer(13.00 * 60 * 60 * 1000);
	
}

// Chapter 8 - Drama Class Run
function C008_DramaClass_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 450, 150, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 450, 250, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 350, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 450, "White");

}

// Chapter 8 - Drama Class Click
function C008_DramaClass_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, "JuliaIntro");
}