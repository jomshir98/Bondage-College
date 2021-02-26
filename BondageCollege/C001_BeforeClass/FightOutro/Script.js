// 4 animation phases, separated by clicks
var C001_BeforeClass_FightOutro_FightResult = 0; // 0 = No winner, 1 = Victory, 2 = Defeat

// Chapter 1 - Fight Outro Load
function C001_BeforeClass_FightOutro_Load() {
	
	// Sidney attitude changes if the player won or not
	CurrentActor = "Sidney";
	if (C001_BeforeClass_FightOutro_FightResult == 1) { GameLogAdd("FightVictory"); ActorChangeAttitude(0, 2); }
	if (C001_BeforeClass_FightOutro_FightResult == 2) { GameLogAdd("FightDefeat"); ActorChangeAttitude(0, -2); }
	CurrentActor = "";

	// Time is always 8:00 on the fight outro, no timer
	StopTimer(8 * 60 * 60 * 1000);
	
}

// Chapter 1 - Fight Outro Run
function C001_BeforeClass_FightOutro_Run() {
	
	// Paints the background
	DrawRect(0, 0, 800, 600, "black");
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Mildred.jpg", 800, 0);
	
	// Each animation show an additional line of text
	if (C001_BeforeClass_FightOutro_FightResult == 0) DrawText(GetText("Intro1A"), 400, 150, "White");
	if (C001_BeforeClass_FightOutro_FightResult == 1) DrawText(GetText("Intro1B"), 400, 150, "White");
	if (C001_BeforeClass_FightOutro_FightResult == 2) DrawText(GetText("Intro1C"), 400, 150, "White");	
	if (TextPhase >= 1) DrawText(GetText("Intro2"), 400, 300, "White");
	if (TextPhase >= 2) DrawText(GetText("Intro3"), 400, 450, "White");

}

// Chapter 1 - Fight Outro Click
function C001_BeforeClass_FightOutro_Click() {
	TextPhase++;
	if (TextPhase >= 3) SaveMenu("C003_MorningDetention", "Intro");
}