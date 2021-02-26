// Intro Load
function C000_Intro_Intro_Load() {

	// Time is always 7:40 on the intro, no timer
	StopTimer(7.66666667 * 60 * 60 * 1000);
	
}

// Intro Run
function C000_Intro_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Draw the intro text
	DrawText(GetText("Intro1"), 450, 100, "White");
	DrawText(GetText("Intro2"), 450, 200, "White");
	DrawText(GetText("Intro3"), 450, 300, "White");
	DrawText(GetText("Intro4"), 450, 400, "White");
	DrawText(GetText("Intro5"), 450, 500, "White");

}

// Intro Click, jump to chapter selection
function C000_Intro_Intro_Click() {
	SetScene(CurrentChapter, "ChapterSelect");
}

// Intro Key Down
function C000_Intro_Intro_KeyDown() {

	// Special "z" cheat to get lots of items, only used for developers
	if ((KeyPress == 122) && (window.location.hostname != "ben987.x10host.com")) {
		PlayerRemoveAllInventory();
		PlayerAddInventory("Cuffs", 4);
		PlayerAddInventory("CuffsKey", 1);
		PlayerAddInventory("Rope", 4);
		PlayerAddInventory("BallGag", 4);
		PlayerAddInventory("TapeGag", 8);
		PlayerAddInventory("ClothGag", 4);
		PlayerAddInventory("Collar", 4);
		PlayerAddInventory("Crop", 1);
		PlayerAddInventory("VibratingEgg", 4);
		PlayerAddInventory("ChastityBelt", 4);
	}
	
}