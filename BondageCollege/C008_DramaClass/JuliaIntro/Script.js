var C008_DramaClass_JuliaIntro_CurrentStage = 0;
var C008_DramaClass_JuliaIntro_PlayerRole = "";
var C008_DramaClass_JuliaIntro_AmandaRole = "";
var C008_DramaClass_JuliaIntro_SarahRole = "";
var C008_DramaClass_JuliaIntro_Painted = false;

// Chapter 8 - Julia Intro Load
function C008_DramaClass_JuliaIntro_Load() {

	// Set the timer limits at 13:30
	StartTimer(13.5 * 60 * 60 * 1000, "C008_DramaClass", "Transition");

	// Load the scene parameters
	ActorLoad("Julia", "");
	LoadInteractions();
	LeaveIcon = "";
	C008_DramaClass_JuliaIntro_Painted = GameLogQuery("C004_ArtClass", "Julia", "Paint");
	
	// If Julia doesn't like the player, we skip the "hug" intro
	if (ActorGetValue(ActorLove) < 1) C008_DramaClass_JuliaIntro_CurrentStage = 20;

}

// Chapter 8 - Julia Intro Run
function C008_DramaClass_JuliaIntro_Run() {
	BuildInteraction(C008_DramaClass_JuliaIntro_CurrentStage);
}

// Chapter 8 - Julia Intro Click
function C008_DramaClass_JuliaIntro_Click() {	
	ClickInteraction(C008_DramaClass_JuliaIntro_CurrentStage);
}

// Chapter 8 - Julia Intro - Check if the player should be forced to play a role
function C008_DramaClass_JuliaIntro_CheckRole() {
	
	// If the player is submissive, she will be forced to play the damsel in Distress
	if (ActorGetValue(ActorSubmission) <= -3) {
		C008_DramaClass_JuliaIntro_SetRole("Damsel");
		OverridenIntroText = GetText("ForceDamsel");
	} else {

		// If the player is loved, she will be forced to play the heroine
		if (ActorGetValue(ActorLove) >= 3) {
			C008_DramaClass_JuliaIntro_SetRole("Heroine");
			OverridenIntroText = GetText("ForceHeroine");
		}

		// If the player is hated, she will be forced to play the villain
		if (ActorGetValue(ActorLove) <= -3) {
			C008_DramaClass_JuliaIntro_SetRole("Villain");
			OverridenIntroText = GetText("ForceVillain");
		}
		
	}
}	

// Chapter 8 - Julia Intro - Set all the roles for the play
function C008_DramaClass_JuliaIntro_SetRole(NewRole) {
	C008_DramaClass_JuliaIntro_PlayerRole = NewRole;
	if (NewRole != "Villain") C008_DramaClass_JuliaIntro_AmandaRole = "Villain";
	else C008_DramaClass_JuliaIntro_AmandaRole = "Heroine";
	if (NewRole != "Damsel") C008_DramaClass_JuliaIntro_SarahRole = "Damsel";
	else C008_DramaClass_JuliaIntro_SarahRole = "Heroine";
	C008_DramaClass_JuliaIntro_CurrentStage = 60;
}

// Chapter 8 - Julia Intro - Jump to the dressing room scene
function C008_DramaClass_JuliaIntro_DressingRoom() {
	SetScene("C008_DramaClass", "DressingRoom");
}

// Chapter 8 - Julia Intro - Hug
function C008_DramaClass_JuliaIntro_Hug() {
	GameLogAdd("Hug");
}