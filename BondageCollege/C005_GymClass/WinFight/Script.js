// Chapter 5 - Win Fight Load
function C005_GymClass_WinFight_Load() {
	if (C005_GymClass_Jennifer_EasyMode) LoadFight("Jennifer", "Normal", Icons.Fight.Rope, PlayerGetSkillLevel("RopeMastery"));
	else LoadFight("Jennifer", "Hard", Icons.Fight.Rope, PlayerGetSkillLevel("RopeMastery"));
}

// Chapter 5 - Win Fight Run
function C005_GymClass_WinFight_Run() {
	RenderFight();
}

// Chapter 5 - Win Fight Click
function C005_GymClass_WinFight_Click() {
	FightClick();
}

// Chapter 5 - Win Fight Key Down
function C005_GymClass_WinFight_KeyDown() {
	FightKeyDown();
}

// Chapter 5 - Win Fight End
function C005_GymClass_WinFight_FightEnd(Victory) {
	if (Victory) {
		C005_GymClass_Jennifer_CurrentStage = 400;
		if (!C005_GymClass_Jennifer_EasyMode) C005_GymClass_Jennifer_DefeatedHardMode = true;
		if (!C005_GymClass_Jennifer_EasyMode && FightPerfect) C005_GymClass_Jennifer_DefeatedHardModePerfect = true;
		GameLogSpecificAdd("C005_GymClass", "Jennifer", "FightVictory");
	}
	else {
		C005_GymClass_Jennifer_CurrentStage = 210;
		C005_GymClass_Jennifer_Turnabout = true;
	}
}