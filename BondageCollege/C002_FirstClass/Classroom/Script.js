var C002_FirstClass_Classroom_Sidney = "";
var C002_FirstClass_Classroom_Mildred = "";
var C002_FirstClass_Classroom_Amanda = "";
var C002_FirstClass_Classroom_Sarah = "SarahEmpty";
var C002_FirstClass_Classroom_SidneyAgree = false;
var C002_FirstClass_Classroom_AmandaAgree = false;
var C002_FirstClass_Classroom_SarahAgree = false;
var C002_FirstClass_Classroom_MildredSubdueSuccess = false;
var C002_FirstClass_Classroom_MildredSubdueFailed = false;

// Calculate the current stage depending on what the actor is wearing
function C002_FirstClass_Classroom_CalcStage() {
	var NewStage = 100;
	if (ActorHasInventory("BallGag")) NewStage = NewStage + 10;
	if (ActorHasInventory("Cuffs")) NewStage = NewStage + 20;
	if (ActorHasInventory("Rope")) NewStage = NewStage + 40;
	return NewStage;
}

// Chapter 2 - Classroom Load
function C002_FirstClass_Classroom_Load() {
		
	// Set the classroom timer limits at 8:30 or 9:00
	if (C002_FirstClass_Classroom_Sarah == "SarahEmpty") StartTimer(8.5 * 60 * 60 * 1000, "C002_FirstClass", "SarahIntro");
	else StartTimer(9 * 60 * 60 * 1000, "C002_FirstClass", "Outro");
	
	// Self bondage is only allowed if Mildred was subdued
	Common_SelfBondageAllowed = C002_FirstClass_Classroom_MildredSubdueSuccess;
	
	// Get the image file for each girls
	C002_FirstClass_Classroom_Sidney = ActorSpecificGetImage("Sidney");
	C002_FirstClass_Classroom_Mildred = ActorSpecificGetImage("Mildred");
	C002_FirstClass_Classroom_Amanda = ActorSpecificGetImage("Amanda");
	if (C002_FirstClass_Classroom_Sarah != "SarahEmpty") C002_FirstClass_Classroom_Sarah = ActorSpecificGetImage("Sarah");

}

// Chapter 2 - Classroom Run
function C002_FirstClass_Classroom_Run() {

	// Draw the background image and the wait button on the bottom right of the image
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/" + C002_FirstClass_Classroom_Sidney.toString() + ".jpg", 0, 0);
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/" + C002_FirstClass_Classroom_Mildred.toString() + ".jpg", 300, 0);
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/" + C002_FirstClass_Classroom_Amanda.toString() + ".jpg", 600, 0);
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/" + C002_FirstClass_Classroom_Sarah.toString() + ".jpg", 900, 0);
	
}

// Chapter 2 - Classroom Click
function C002_FirstClass_Classroom_Click() {

	// When the user clicks on any character (screen is divided in 4)
	if ((MouseX >= 30) && (MouseX <= 270) && (MouseY >= 10) && (MouseY <= 590)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 330) && (MouseX <= 570) && (MouseY >= 10) && (MouseY <= 590)) SetScene(CurrentChapter, "Mildred");
	if ((MouseX >= 630) && (MouseX <= 870) && (MouseY >= 10) && (MouseY <= 590)) SetScene(CurrentChapter, "Amanda");
	if ((MouseX >= 930) && (MouseX <= 1170) && (MouseY >= 10) && (MouseY <= 590) && (C002_FirstClass_Classroom_Sarah != "SarahEmpty")) SetScene(CurrentChapter, "Sarah");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C002_FirstClass", "Classroom");

}