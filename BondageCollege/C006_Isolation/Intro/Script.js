var C006_Isolation_Intro_Teacher = "";

// Chapter 6 - Intro Load
function C006_Isolation_Intro_Load() {

	// Time is always 10:30 on the intro, no timer
	StopTimer(10.5 * 60 * 60 * 1000);
	
	// Do not allow bondage when we begin
	Common_BondageAllowed = true;
	Common_SelfBondageAllowed = true;
	
	// Gets the player crime chapter 2 or 3.  If there's any, we go to chapter 6 instead of 5.
	if (GameLogQuery("C002_FirstClass", "Mildred", "Subdue") && !GameLogQuery("C002_FirstClass", "Mildred", "Release")) C006_Isolation_Intro_Teacher = "Mildred";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Drug") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugAwake")) C006_Isolation_Intro_Teacher = "Yuki";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Drug") && GameLogQuery("C003_MorningDetention", "Yuki", "DrugAwake") && !GameLogQuery("C003_MorningDetention", "Yuki", "DetentionFull") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugAdmit") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugSidney")) C006_Isolation_Intro_Teacher = "Yuki";
	if (GameLogQuery("C003_MorningDetention", "Yuki", "Escape") && !GameLogQuery("C003_MorningDetention", "Yuki", "DrugSidney")) C006_Isolation_Intro_Teacher = "Yuki";

	// If there's no crime, it means the player started on chapter 6, we pick a teacher at random
	if (C006_Isolation_Intro_Teacher == "") {
		if (Math.floor(Math.random() * 2) == 1) C006_Isolation_Intro_Teacher = "Mildred";
		else C006_Isolation_Intro_Teacher = "Yuki";
	}
	
	// Logs the isolation for the teacher
	GameLogSpecificAdd(CurrentChapter, C006_Isolation_Intro_Teacher, "Isolation");

}

// Chapter 6 - Intro Run
function C006_Isolation_Intro_Run() {
	
	// Paints the background
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Background.jpg", 0, 0);
	DrawPlayerTransition();

	// Write the chapter introduction
	DrawText(GetText("Intro1"), 450, 150, "White");
	if ((TextPhase >= 1) && (C006_Isolation_Intro_Teacher == "Mildred")) DrawText(GetText("Intro2Mildred"), 450, 250, "White");
	if ((TextPhase >= 1) && (C006_Isolation_Intro_Teacher == "Yuki")) DrawText(GetText("Intro2Yuki"), 450, 250, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 450, 350, "White");
	if (TextPhase >= 3) DrawText(GetText("Intro4"), 450, 450, "White");

}

// Chapter 6 - Intro Click
function C006_Isolation_Intro_Click() {
	TextPhase++;
	if (TextPhase >= 4) SetScene(CurrentChapter, C006_Isolation_Intro_Teacher);
}