// Chapter 101 - Club Room 2 Load
function C101_KinbakuClub_ClubRoom2_Load() {
	if (PlayerHasLockedInventory("Blindfold")) SetScene(CurrentChapter, "BlindMansBuff");
	LeaveIcon = "Wait";
}

// Chapter  101 - Club Room 2 Run
function C101_KinbakuClub_ClubRoom2_Run() {

	// Draw the background image 
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/ClubRoom2Arrows.jpg", 0, 0);
	
	// Draw erica when tied
	if (C101_KinbakuClub_Erica_EricaTied) {
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/EricaBoundBackground.png", 0, 0);
		DrawActor("Erica", 0, 265, 0.4);
	}
	if (C101_KinbakuClub_Erica_EricaLeftCuffed) {
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/EricaBoundBackground.png", 0, 0);
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/EricaLeftCollaredCuffs.jpg", 0, 0);
	}
	if (!C101_KinbakuClub_Erica_EricaTied && !C101_KinbakuClub_Erica_EricaLeftCuffed) DrawImage(CurrentChapter + "/" + CurrentScreen + "/EricaStart.png", 0, 0);

	// Draw Cassidy and Alyssa
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/CassidyAlyssa.jpg", 800, 100);

}

// Chapter 101 - Club Room 2 Click
function C101_KinbakuClub_ClubRoom2_Click() {

	// When the user clicks on any character (screen is divided in 4, 3rd can be the player)
	if ((MouseX >= 15) && (MouseX <= 115) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom1");
	if (!C101_KinbakuClub_Erica_Kidnapper && (MouseX >= 1085) && (MouseX <= 1185) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom3");
	if (C101_KinbakuClub_Erica_Kidnapper && (MouseX >= 1085) && (MouseX <= 1185) && (MouseY >= 520) && (MouseY <= 580)) SetScene(CurrentChapter, "ClubRoom4");
	if ((MouseX >= 30) && (MouseX <= 715) && (MouseY >= 20) && (MouseY <= 520)) SetScene(CurrentChapter, "Erica");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C101_KinbakuClub", "ClubRoom2");

}