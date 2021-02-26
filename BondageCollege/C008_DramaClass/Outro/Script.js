var C008_DramaClass_Outro_Crime = "";

// Chapter 8 - Outro Load
function C008_DramaClass_Outro_Load() {
	
	// Time is always 14:00:00 in the outro, unlock if needed
	StopTimer(14 * 60 * 60 * 1000);
	PlayerReleaseBondage();
	PlayerUnlockAllInventory();
	ActorSpecificClearInventory("Amanda", true);
	ActorSpecificClearInventory("Sarah", true);
	ActorSpecificClearInventory("Julia", true);
	PlayerClothes("Clothed");
	ActorSpecificSetCloth("Amanda", "Clothed");
	ActorSpecificSetCloth("Sarah", "Clothed");
	ActorSpecificSetCloth("Julia", "Clothed");
	ActorSpecificSetPose("Amanda", "");
	ActorSpecificSetPose("Sarah", "");
	ActorSpecificSetPose("Julia", "");
	
	// Gets the correct crime in chapter 7 for text and next chapter
	if (GameLogQuery("C007_LunchBreak", "Amanda", "Stranded")) C008_DramaClass_Outro_Crime = "AmandaStranded";
	if (GameLogQuery("C007_LunchBreak", "Sarah", "Stranded")) C008_DramaClass_Outro_Crime = "SarahStranded";
	if (GameLogQuery("C007_LunchBreak", "Sidney", "Stranded")) C008_DramaClass_Outro_Crime = "SidneyStranded";
	if (GameLogQuery("C007_LunchBreak", "Jennifer", "Stranded")) C008_DramaClass_Outro_Crime = "JenniferStranded";

}

// Chapter 8 - Outro Run
function C008_DramaClass_Outro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	
	// If there was a crime that leads to chapter 10
	if ((C008_DramaClass_Outro_Crime == "AmandaStranded") || (C008_DramaClass_Outro_Crime == "SarahStranded") || (C008_DramaClass_Outro_Crime == "SidneyStranded") || (C008_DramaClass_Outro_Crime == "JenniferStranded")) {

		// Draw the outro text to lead to chapter 10
		DrawText(GetText("Outro1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(GetText("Outro2"), 400, 250, "White");
		if ((TextPhase >= 2) && ((C008_DramaClass_Outro_Crime == "AmandaStranded") || (C008_DramaClass_Outro_Crime == "SarahStranded"))) DrawText(GetText("AmandaSarah3"), 400, 350, "White");
		if ((TextPhase >= 3) && ((C008_DramaClass_Outro_Crime == "AmandaStranded") || (C008_DramaClass_Outro_Crime == "SarahStranded"))) DrawText(GetText("AmandaSarah4"), 400, 450, "White");
		if ((TextPhase >= 2) && ((C008_DramaClass_Outro_Crime == "SidneyStranded") || (C008_DramaClass_Outro_Crime == "JenniferStranded"))) DrawText(GetText("SidneyJennifer3"), 400, 350, "White");
		if ((TextPhase >= 3) && ((C008_DramaClass_Outro_Crime == "SidneyStranded") || (C008_DramaClass_Outro_Crime == "JenniferStranded"))) DrawText(GetText("SidneyJennifer4"), 400, 450, "White");

		// The image changes to show the girls
		if (TextPhase <= 1) DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		if ((TextPhase >= 2) && ((C008_DramaClass_Outro_Crime == "AmandaStranded") || (C008_DramaClass_Outro_Crime == "SarahStranded"))) DrawImage(CurrentChapter + "/" + CurrentScreen + "/AmandaSarah.jpg", 800, 0);
		if ((TextPhase >= 2) && ((C008_DramaClass_Outro_Crime == "SidneyStranded") || (C008_DramaClass_Outro_Crime == "JenniferStranded"))) DrawImage(CurrentChapter + "/" + CurrentScreen + "/SidneyJennifer.jpg", 800, 0);
		
	} else {

		// Draw the outro text to lead to chapter 9
		DrawImage(CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);
		DrawText(GetText("Outro1"), 400, 200, "White");
		if (TextPhase >= 1) DrawText(GetText("Outro2"), 400, 400, "White");

	}

}

// Chapter 8 - Outro Click
function C008_DramaClass_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
	if ((C008_DramaClass_Outro_Crime == "AmandaStranded") || (C008_DramaClass_Outro_Crime == "SarahStranded") || (C008_DramaClass_Outro_Crime == "SidneyStranded") || (C008_DramaClass_Outro_Crime == "JenniferStranded")) {
		if (TextPhase >= 4) SaveMenu("C010_Revenge", "Intro");
	} else {
		if (TextPhase >= 2) SaveMenu("C009_Library", "Intro");
	}

}
