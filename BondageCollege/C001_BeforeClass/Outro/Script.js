var C001_BeforeClass_Outro_Mode = 0;

// Chapter 1 - Outro Load
function C001_BeforeClass_Outro_Load() {

	// Change the mode depending if there were girls left tied up
	if (!ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 0;
	if (ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 1;
	if (!ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 2;
	if (ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Outro_Mode = 3;

	// Logs the player crime
	if (C001_BeforeClass_Outro_Mode >= 1) GameLogAdd("PublicBondage");

	// Time is always 8:00:00, no timer
	StopTimer(8 * 60 * 60 * 1000);
	ActorSpecificClearInventory("Sidney", false);
	ActorSpecificClearInventory("Amanda", false);

}

// Chapter 1 - Outro Run
function C001_BeforeClass_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 800, 0);
	
	// The text changes based on the trouble that was done
	if (TextPhase >= 0) DrawText(GetText("Intro1"), 400, 100, "White");
	if ((C001_BeforeClass_Outro_Mode == 0) && (TextPhase >= 1)) DrawText(GetText("Intro2A"), 400, 250, "White");
	if ((C001_BeforeClass_Outro_Mode == 1) && (TextPhase >= 1)) DrawText(GetText("Intro2B"), 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode == 2) && (TextPhase >= 1)) DrawText(GetText("Intro2C"), 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode == 3) && (TextPhase >= 1)) DrawText(GetText("Intro2D"), 400, 200, "White");
	if ((C001_BeforeClass_Outro_Mode == 0) && (TextPhase >= 2)) DrawText(GetText("Intro3A"), 400, 400, "White");	
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 2)) DrawText(GetText("Intro3B"), 400, 300, "White");
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 3)) DrawText(GetText("Intro4"), 400, 400, "White");
	if ((C001_BeforeClass_Outro_Mode >= 1) && (TextPhase >= 4)) DrawText(GetText("Intro5"), 400, 500, "White");
		
}

// Chapter 1 - Outro Click
function C001_BeforeClass_Outro_Click() {
	TextPhase++;
	if ((TextPhase >= 5) && (C001_BeforeClass_Outro_Mode >= 1)) SaveMenu("C003_MorningDetention", "Intro");
	if ((TextPhase >= 3) && (C001_BeforeClass_Outro_Mode < 1)) SaveMenu("C002_FirstClass", "Intro");			
}