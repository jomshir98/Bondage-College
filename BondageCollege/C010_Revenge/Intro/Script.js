// Chapter 10 - Revenge Load
function C010_Revenge_Intro_Load() {

	// If nobody was left stranded, it means the player started on chapter 10, in that case we assign a random girl as being stranded
	if (!GameLogQuery("C007_LunchBreak", "Amanda", "Stranded") && !GameLogQuery("C007_LunchBreak", "Sarah", "Stranded") && !GameLogQuery("C007_LunchBreak", "Sidney", "Stranded") && !GameLogQuery("C007_LunchBreak", "Jennifer", "Stranded")) {
		var R = Math.floor(Math.random() * 4);
		if (R == 0) GameLogSpecificAdd("C007_LunchBreak", "Amanda", "Stranded");
		if (R == 1) GameLogSpecificAdd("C007_LunchBreak", "Sarah", "Stranded");
		if (R == 2) GameLogSpecificAdd("C007_LunchBreak", "Sidney", "Stranded");
		if (R == 3) GameLogSpecificAdd("C007_LunchBreak", "Jennifer", "Stranded");
	}

	// Time is always 14:15 on the intro, no timer
	StopTimer(14.25 * 60 * 60 * 1000);
	
}

// Chapter 10 - Revenge Run
function C010_Revenge_Intro_Run() {

	// Amanda or Sarah intro
	if (GameLogQuery("C007_LunchBreak", "Amanda", "Stranded") || GameLogQuery("C007_LunchBreak", "Sarah", "Stranded")) {
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/BackgroundAmandaSarah.jpg", 0, 0);
		DrawPlayerTransition();
		DrawText(GetText("AmandaSarah1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(GetText("AmandaSarah2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(GetText("AmandaSarah3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(GetText("AmandaSarah4"), 400, 450, "White");
	}
	
	// Sidney or Jennifer intro	
	if (GameLogQuery("C007_LunchBreak", "Sidney", "Stranded") || GameLogQuery("C007_LunchBreak", "Jennifer", "Stranded")) {
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/BackgroundSidneyJennifer.jpg", 0, 0);
		DrawPlayerTransition();
		DrawText(GetText("SidneyJennifer1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(GetText("SidneyJennifer2"), 400, 250, "White");
		if (TextPhase >= 2) DrawText(GetText("SidneyJennifer3"), 400, 350, "White");
		if (TextPhase >= 3) DrawText(GetText("SidneyJennifer4"), 400, 450, "White");
	}

}

// Chapter 10 - Revenge Click
function C010_Revenge_Intro_Click() {
	TextPhase++;
	if ((TextPhase >= 4) && (GameLogQuery("C007_LunchBreak", "Amanda", "Stranded") || GameLogQuery("C007_LunchBreak", "Sarah", "Stranded"))) SetScene(CurrentChapter, "AmandaSarah");
	if ((TextPhase >= 4) && (GameLogQuery("C007_LunchBreak", "Sidney", "Stranded") || GameLogQuery("C007_LunchBreak", "Jennifer", "Stranded"))) SetScene(CurrentChapter, "SidneyJennifer");
}