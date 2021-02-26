var C001_BeforeClass_Classroom_Mode = 0;

// Chapter 1 - Classroom Load
function C001_BeforeClass_Classroom_Load() {
	
	// Set the timer limits
	StartTimer(8 * 60 * 60 * 1000, "C001_BeforeClass", "Outro");
	Common_SelfBondageAllowed = false;
	
	// Set the screen background
	if (ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Classroom_Mode = 3;
	if (!ActorSpecificHasInventory("Amanda", "Rope") && ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Classroom_Mode = 2;
	if (ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Classroom_Mode = 1;
	if (!ActorSpecificHasInventory("Amanda", "Rope") && !ActorSpecificHasInventory("Sidney", "Rope")) C001_BeforeClass_Classroom_Mode = 0;
}

// Chapter 1 - Classroom Run
function C001_BeforeClass_Classroom_Run() {
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background" + C001_BeforeClass_Classroom_Mode.toString() + ".jpg", 0, 0);
}

// Chapter 1 - Classroom Click
function C001_BeforeClass_Classroom_Click() {

	// When the user clicks on the bag
	if ((MouseX >= 45) && (MouseX <= 315) && (MouseY >= 305) && (MouseY <= 505) && (C001_BeforeClass_Classroom_Mode == 0)) SetScene(CurrentChapter, "Bag");

	// When the user clicks on Sidney
	if ((MouseX >= 80) && (MouseX <= 320) && (MouseY >= 40) && (MouseY <= 304) && (C001_BeforeClass_Classroom_Mode == 0)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 321) && (MouseX <= 426) && (MouseY >= 284) && (MouseY <= 390) && (C001_BeforeClass_Classroom_Mode == 0)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 150) && (MouseX <= 440) && (MouseY >= 20) && (MouseY <= 550) && (C001_BeforeClass_Classroom_Mode == 1)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 125) && (MouseX <= 450) && (MouseY >= 40) && (MouseY <= 570) && (C001_BeforeClass_Classroom_Mode == 2)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 130) && (MouseX <= 455) && (MouseY >= 0) && (MouseY <= 535) && (C001_BeforeClass_Classroom_Mode == 3)) SetScene(CurrentChapter, "Sidney");

	// When the user clicks on Amanda
	if ((MouseX >= 900) && (MouseX <= 1100) && (MouseY >= 100) && (MouseY <= 505) && (C001_BeforeClass_Classroom_Mode == 0)) SetScene(CurrentChapter, "Amanda");
	if ((MouseX >= 800) && (MouseX <= 980) && (MouseY >= 30) && (MouseY <= 580) && (C001_BeforeClass_Classroom_Mode == 1)) SetScene(CurrentChapter, "Amanda");
	if ((MouseX >= 900) && (MouseX <= 1080) && (MouseY >= 50) && (MouseY <= 395) && (C001_BeforeClass_Classroom_Mode == 2)) SetScene(CurrentChapter, "Amanda");
	if ((MouseX >= 760) && (MouseX <= 900) && (MouseY >= 310) && (MouseY <= 480) && (C001_BeforeClass_Classroom_Mode == 2)) SetScene(CurrentChapter, "Amanda");
	if ((MouseX >= 860) && (MouseX <= 1030) && (MouseY >= 25) && (MouseY <= 600) && (C001_BeforeClass_Classroom_Mode == 3)) SetScene(CurrentChapter, "Amanda");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C001_BeforeClass", "Classroom");

}