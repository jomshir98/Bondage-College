// Chapter 101 - Erica Fight Load
function C101_KinbakuClub_Fight_Load() {
	LoadFight("Erica", "Hard", Icons.Fight.Punch, PlayerGetSkillLevel("Fighting"));
}

// Chapter 101 - Erica Fight Run
function C101_KinbakuClub_Fight_Run() {
	RenderFight();
}

// Chapter 101 - Erica Fight Click
function C101_KinbakuClub_Fight_Click() {
	FightClick();
}

// Chapter 101 - Erica Fight Key Down
function C101_KinbakuClub_Fight_KeyDown() {
	FightKeyDown();
}

// Chapter 101 - Erica Fight End
function C101_KinbakuClub_Fight_FightEnd(Victory) {
	if (Victory) C101_KinbakuClub_Erica_CurrentStage = 300;
	else C101_KinbakuClub_Erica_CurrentStage = 150;
}