var C003_MorningDetention_DetentionRoom_Yuki = 1;
var C003_MorningDetention_DetentionRoom_Sidney = 1;
var C003_MorningDetention_DetentionRoom_SleepTimer = 0;
var C003_MorningDetention_DetentionRoom_SidneyStrip = false;
var C003_MorningDetention_DetentionRoom_SidneyGone = false;

// Chapter 3 - Detention Room Load
function C003_MorningDetention_DetentionRoom_Load() {

	// Set the timer limits
	StartTimer(9 * 60 * 60 * 1000, "C003_MorningDetention", "Outro");
	
}

// Chapter 3 - Detention Room Run
function C003_MorningDetention_DetentionRoom_Run() {
	
	// Yuki mode changes with time or if she's in trouble
	C003_MorningDetention_DetentionRoom_Yuki = (Math.round((CurrentTime - 180000) / 120000) % 3) + 1;
	if ((C003_MorningDetention_DetentionRoom_SleepTimer > 0) && (CurrentTime >= C003_MorningDetention_DetentionRoom_SleepTimer)) C003_MorningDetention_DetentionRoom_Yuki = 4; // Sleeping
	if (C003_MorningDetention_Yuki_CurrentStage == 110) C003_MorningDetention_DetentionRoom_Yuki = 5; // Sleeping stripped
	if (C003_MorningDetention_Yuki_CurrentStage == 120) C003_MorningDetention_DetentionRoom_Yuki = 6; // Sleeping cuffed
	if (C003_MorningDetention_Yuki_CurrentStage == 130) C003_MorningDetention_DetentionRoom_Yuki = 7; // Sleeping laying
	if (C003_MorningDetention_Yuki_CurrentStage == 230) C003_MorningDetention_DetentionRoom_Yuki = 8; // Underwear cuffs
	if (C003_MorningDetention_Yuki_CurrentStage == 270) C003_MorningDetention_DetentionRoom_Yuki = 9; // Gone

	// Sidney mode changes with time or if she's in trouble
	C003_MorningDetention_DetentionRoom_Sidney = (Math.round(CurrentTime / 50000) % 3) + 1;
	if ((C003_MorningDetention_DetentionRoom_SleepTimer > 0) && (CurrentTime >= C003_MorningDetention_DetentionRoom_SleepTimer)) C003_MorningDetention_DetentionRoom_Sidney = 4;
	if (C003_MorningDetention_DetentionRoom_SidneyStrip == true) C003_MorningDetention_DetentionRoom_Sidney = 5;
	if (C003_MorningDetention_DetentionRoom_SidneyGone == true) C003_MorningDetention_DetentionRoom_Sidney = 6;

	// Draw the background image and the wait button on the bottom right of the image
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Yuki" + C003_MorningDetention_DetentionRoom_Yuki.toString() + ".jpg", 0, 0);
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Sidney" + C003_MorningDetention_DetentionRoom_Sidney.toString() + ".jpg", 600, 0);

}

// Chapter 3 - Detention Room Click
function C003_MorningDetention_DetentionRoom_Click() {

	// When the user clicks on the glass of water or the bag when the teacher isn't looking
	if ((MouseX >= 0) && (MouseX <= 205) && (MouseY >= 370) && (MouseY <= 525) && (C003_MorningDetention_DetentionRoom_Yuki == 3)) SetScene(CurrentChapter, "Bag");
	if ((MouseX >= 255) && (MouseX <= 305) && (MouseY >= 455) && (MouseY <= 520) && ((C003_MorningDetention_DetentionRoom_Yuki == 2) || (C003_MorningDetention_DetentionRoom_Yuki == 3))) SetScene(CurrentChapter, "Glass");

	// When the user clicks on Sidney or Yuki
	if ((MouseX >= 30) && (MouseX <= 230) && (MouseY >= 150) && (MouseY <= 490) && (C003_MorningDetention_DetentionRoom_Yuki != 3) && (C003_MorningDetention_DetentionRoom_Yuki != 7)) SetScene(CurrentChapter, "Yuki");
	if ((MouseX >= 30) && (MouseX <= 570) && (MouseY >= 340) && (MouseY <= 550) && (C003_MorningDetention_DetentionRoom_Yuki == 7)) SetScene(CurrentChapter, "Yuki");
	if ((MouseX >= 950) && (MouseX <= 1170) && (MouseY >= 120) && (MouseY <= 490) && (C003_MorningDetention_DetentionRoom_Sidney <= 3)) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 910) && (MouseX <= 1070) && (MouseY >= 25) && (MouseY <= 480) && ((C003_MorningDetention_DetentionRoom_Sidney == 4) || (C003_MorningDetention_DetentionRoom_Sidney == 5))) SetScene(CurrentChapter, "Sidney");
	if ((MouseX >= 900) && (MouseX <= 1200) && (MouseY >= 120) && (MouseY <= 485) && (C003_MorningDetention_DetentionRoom_Sidney == 6)) SetScene(CurrentChapter, "Sidney");

	// Checks if the user clicks on any regular item
	InventoryClick(GetClickedInventory(), "C003_MorningDetention", "DetentionRoom");

}