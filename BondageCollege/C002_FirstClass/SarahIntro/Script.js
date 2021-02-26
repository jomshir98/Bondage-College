// Chapter 2 - SarahIntro Load
function C002_FirstClass_SarahIntro_Load() {

	// Sarah can now be shown
	C002_FirstClass_Classroom_Sarah = "Sarah";

	// Skip the intro if Mildred was subdued, else we stop the time and show the intro
	if (C002_FirstClass_Classroom_MildredSubdueSuccess)
		SetScene(CurrentChapter, "Classroom");
	else 
		StopTimer(8.5 * 60 * 60 * 1000);
	
}

// Chapter 2 - SarahIntro Run
function C002_FirstClass_SarahIntro_Run() {
	
	// Paints the background
	if (ActorSpecificHasInventory("Amanda", "BallGag"))
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background_AmandaGag.jpg", 0, 0);
	else
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 600, 100, "White");
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 600, 200, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 600, 300, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 600, 400, "White");
	if (TextPhase >= 4) DrawText(GetText("Intro5"), 600, 500, "White");
		
}

// Chapter 2 - SarahIntro Click
function C002_FirstClass_SarahIntro_Click() {
	TextPhase++;
	if (TextPhase >= 5)
		SetScene(CurrentChapter, "Classroom");
}