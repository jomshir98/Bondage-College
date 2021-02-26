// Chapter 5 - Gym Fight Load
function C005_GymClass_GymFight_Load() {
	if (C005_GymClass_Jennifer_PracticeMode) LoadFight("Jennifer", "Easy", Icons.Fight.Punch, PlayerGetSkillLevel("Fighting"));
	else LoadFight("Jennifer", "Normal", Icons.Fight.Punch, PlayerGetSkillLevel("Fighting"));
}

// Chapter 5 - Gym Fight Run
function C005_GymClass_GymFight_Run() {
	RenderFight();
}

// Chapter 5 - Gym Fight Click
function C005_GymClass_GymFight_Click() {
	FightClick();
}

// Chapter 5 - Gym Fight Key Down
function C005_GymClass_GymFight_KeyDown() {
	FightKeyDown();
}

// Chapter 5 - Gym Fight End
function C005_GymClass_GymFight_FightEnd(Victory) {
	
	// The first fight counts if it wasn't on practice mode
	if (!C005_GymClass_Jennifer_PracticeMode) {
		if (Victory) C005_GymClass_Jennifer_CurrentStage = 100;
		else C005_GymClass_Jennifer_CurrentStage = 200;
	}

}