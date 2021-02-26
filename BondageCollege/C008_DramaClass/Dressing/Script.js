var C008_DramaClass_Dressing_CurrentStage = 0;
var C008_DramaClass_Dressing_SearchCount = 0;

// Chapter 8 - Dressing Load
function C008_DramaClass_Dressing_Load() {
	LeaveIcon = "Leave";
	LeaveScreen = "DressingRoom";
	LoadInteractions();
}

// Chapter 8 - Dressing Run
function C008_DramaClass_Dressing_Run() {
	BuildInteraction(C008_DramaClass_Dressing_CurrentStage);
	if (C008_DramaClass_Dressing_CurrentStage >= 20)
		DrawPlayerImage(0, 0);
}

// Chapter 8 - Dressing Click
function C008_DramaClass_Dressing_Click() {
	ClickInteraction(C008_DramaClass_Dressing_CurrentStage);
}

// Chapter 8 - Dressing Search
function C008_DramaClass_Dressing_Search() {
	
	// On the first search, we find the costume
	C008_DramaClass_Dressing_SearchCount++;
	if (C008_DramaClass_Dressing_SearchCount == 1) {
		OverridenIntroText = GetText("FindCostume");
	}
	
	// On the third search, we find a chastity belt
	if (C008_DramaClass_Dressing_SearchCount == 3) {
		OverridenIntroText = GetText("FindBelt");
		PlayerAddInventory("ChastityBelt", 1);
	}
	
}

// Chapter 8 - Dressing - Dress back up
function C008_DramaClass_Dressing_DressBack() {
	PlayerClothes("Clothed");
}

// Chapter 8 - Dressing - Strip
function C008_DramaClass_Dressing_Strip() {
	PlayerClothes("Underwear");
}

// Chapter 8 - Dressing - Wear Costume
function C008_DramaClass_Dressing_Costume() {
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Damsel") PlayerClothes("Damsel");
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Villain") PlayerClothes("Villain");
	if (C008_DramaClass_JuliaIntro_PlayerRole == "Heroine") PlayerClothes("Heroine");
}
