var C002_FirstClass_Mildred_CurrentStage = 0;
var C002_FirstClass_Mildred_DisturbCount = 0;
var C002_FirstClass_Mildred_SearchAvail = true;
var C002_FirstClass_Mildred_BeatingDone = false;
var C002_FirstClass_Mildred_WhipDone = false;
var C002_FirstClass_Mildred_ConfirmUnlock = false;

// Chapter 2 - Mildred Load
function C002_FirstClass_Mildred_Load() {

	// Load the scene parameters	
	ActorLoad("Mildred", "Classroom");
	LoadInteractions();
	C002_FirstClass_Mildred_ConfirmUnlock = false;
	if (C002_FirstClass_Mildred_CurrentStage == 0) StartTimer(8.5 * 60 * 60 * 1000, "C002_FirstClass", "SarahIntro");
	
	// When re-entering, jump from 50 to 200 and stop any whipping
	if (C002_FirstClass_Mildred_CurrentStage == 50) C002_FirstClass_Mildred_CurrentStage = 200;
	if ((C002_FirstClass_Mildred_CurrentStage >= 410) && (C002_FirstClass_Mildred_CurrentStage <= 440)) C002_FirstClass_Mildred_CurrentStage = C002_FirstClass_Mildred_CurrentStage - 100;
	
	// When the talk is over, allow the player to leave
	if (C002_FirstClass_Mildred_CurrentStage >= 200) LeaveIcon = "Leave";
	else LeaveIcon = "";
	
}

// Chapter 2 - Mildred Run
function C002_FirstClass_Mildred_Run() {
	BuildInteraction(C002_FirstClass_Mildred_CurrentStage);
}

// Chapter 2 - Mildred Click
function C002_FirstClass_Mildred_Click() {	

	// Regular interactions
	ClickInteraction(C002_FirstClass_Mildred_CurrentStage);
	var ClickedInv = GetClickedInventory();
	
	// Beyond -3 love, the teacher spank the player
	if ((C002_FirstClass_Mildred_CurrentStage <= 50) && (ActorGetValue(ActorLove) <= -3) && !C002_FirstClass_Mildred_BeatingDone) {
		OverridenIntroText = GetText("SurpriseAttack");
		C002_FirstClass_Mildred_CurrentStage = 100;
		C002_FirstClass_Mildred_BeatingDone = true;
	}	

	// When the user wants to use the gag
	if ((C002_FirstClass_Mildred_CurrentStage >= 310) && (ClickedInv == "BallGag") && (ActorHasInventory("BallGag") == false) && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 10;
		OverridenIntroText = GetText("BallGag");
		PlayerRemoveInventory("BallGag", 1);
		ActorAddInventory("BallGag");
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the key
	if (((C002_FirstClass_Mildred_CurrentStage == 310) || (C002_FirstClass_Mildred_CurrentStage == 320) || (C002_FirstClass_Mildred_CurrentStage == 410) || (C002_FirstClass_Mildred_CurrentStage == 420)) && (ClickedInv == "CuffsKey")) {
		if (C002_FirstClass_Mildred_ConfirmUnlock == false) {
			OverridenIntroText = GetText("UnlockWarning");
			C002_FirstClass_Mildred_ConfirmUnlock = true;
		} else {
			OverridenIntroText = GetText("Unlock");
			CurrentTime = CurrentTime + 60000;
			ActorRemoveInventory("Cuffs");
			ActorRemoveInventory("BallGag");
			ActorChangeAttitude(2, 0);
			C002_FirstClass_Mildred_RestrainPlayer();
			GameLogAdd("Release");
		}
	}

	// When the user wants to use the crop
	if ((C002_FirstClass_Mildred_CurrentStage >= 310) && (C002_FirstClass_Mildred_CurrentStage <= 340) && (ClickedInv == "Crop") && (Common_PlayerNotRestrained) && (Common_PlayerNotGagged)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 100;
		OverridenIntroText = ""
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the rope
	if (((C002_FirstClass_Mildred_CurrentStage == 310) || (C002_FirstClass_Mildred_CurrentStage == 320) || (C002_FirstClass_Mildred_CurrentStage == 410) || (C002_FirstClass_Mildred_CurrentStage == 420)) && (ClickedInv == "Rope") && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) + 20;
		OverridenIntroText = GetText("Rope");
		PlayerRemoveInventory("Rope", 1);
		ActorAddInventory("Rope");
		PlayerAddInventory("Cuffs", 1);
		ActorRemoveInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}

	// When the user wants to use the cuffs
	if (((C002_FirstClass_Mildred_CurrentStage == 330) || (C002_FirstClass_Mildred_CurrentStage == 340) || (C002_FirstClass_Mildred_CurrentStage == 430) || (C002_FirstClass_Mildred_CurrentStage == 440)) && (ClickedInv == "Cuffs") && (Common_PlayerNotRestrained)) {
		C002_FirstClass_Mildred_CurrentStage = parseInt(C002_FirstClass_Mildred_CurrentStage) - 20;
		OverridenIntroText = GetText("Cuffs");
		PlayerAddInventory("Rope", 1);
		ActorRemoveInventory("Rope");
		PlayerRemoveInventory("Cuffs", 1);
		ActorAddInventory("Cuffs");
		CurrentTime = CurrentTime + 60000;
	}
	
	// When the talk is over, allow the player to leave
	if (C002_FirstClass_Mildred_CurrentStage == 50)
		LeaveIcon = "Leave";
	
}

// Chapter 2 - Mildred Restrain Player
function C002_FirstClass_Mildred_RestrainPlayer() {
	PlayerReleaseBondage();
	PlayerLockInventory("Cuffs");
	PlayerLockInventory("BallGag");
	PlayerRemoveAllInventory();
	C002_FirstClass_Classroom_MildredSubdueFailed = true;
	C002_FirstClass_Mildred_CurrentStage = 200;
	OverridenIntroImage = "MildredGagPlayer.jpg";
	LeaveIcon = "Leave";
}

// Chapter 2 - Mildred Disturb Class
function C002_FirstClass_Mildred_Disturb() {
	
	// After 4 attempts to disturb Mildred, she cuffs and gags the player
	C002_FirstClass_Mildred_DisturbCount++;
	if (C002_FirstClass_Mildred_DisturbCount == 1) OverridenIntroText = GetText("Disturb1");
	if (C002_FirstClass_Mildred_DisturbCount == 2) OverridenIntroText = GetText("Disturb2");
	if (C002_FirstClass_Mildred_DisturbCount == 3) OverridenIntroText = GetText("Disturb3");
	if (C002_FirstClass_Mildred_DisturbCount == 4) {
		OverridenIntroText = GetText("Disturb4");
		C002_FirstClass_Mildred_CurrentStage = 220;
		LeaveIcon = "";
	}

}

// Chapter 2 - Mildred Subdue
function C002_FirstClass_Mildred_Subdue() {
	
	// Count the number of girls who agree
	var AgreeCount = 0;
	if (C002_FirstClass_Classroom_SidneyAgree) AgreeCount++;
	if (C002_FirstClass_Classroom_AmandaAgree) AgreeCount++;
	if (C002_FirstClass_Classroom_SarahAgree) AgreeCount++;

	// With no helper
	if (AgreeCount == 0) {
		OverridenIntroText = GetText("SubdueAlone");
		C002_FirstClass_Mildred_CurrentStage = 220;
		GameLogAdd("SubdueFail");
		LeaveIcon = "";		
	}
	
	// With one helper, both the player and the helper end up bound and gagged
	if (AgreeCount == 1) {
		if (C002_FirstClass_Classroom_SidneyAgree) { OverridenIntroText = GetText("SubdueSidney"); CurrentActor = "Sidney"; ActorAddInventory("Cuffs"); ActorAddInventory("BallGag"); }
		if (C002_FirstClass_Classroom_AmandaAgree) { OverridenIntroText = GetText("SubdueAmanda"); CurrentActor = "Amanda"; ActorAddInventory("Cuffs"); ActorAddInventory("BallGag"); }
		if (C002_FirstClass_Classroom_SarahAgree) { OverridenIntroText = GetText("SubdueSarah"); CurrentActor = "Sarah"; ActorAddInventory("Cuffs"); ActorAddInventory("BallGag"); }
		CurrentActor = "Mildred";
		C002_FirstClass_Mildred_CurrentStage = 220;
		LeaveIcon = "";
		GameLogAdd("SubdueFail");
		if (C002_FirstClass_Classroom_SidneyAgree) GameLogAdd("SubdueFailWithSidney");
		if (C002_FirstClass_Classroom_AmandaAgree) GameLogAdd("SubdueFailWithAmanda");
		if (C002_FirstClass_Classroom_SarahAgree) GameLogAdd("SubdueFailWithSarah");
	}

	// With many helpers
	if (AgreeCount >= 2) {
		OverridenIntroText = GetText("SubdueSuccess");
		ActorAddInventory("Cuffs");
		C002_FirstClass_Classroom_MildredSubdueSuccess = true;
		C002_FirstClass_Mildred_CurrentStage = 300;
		GameLogAdd("Subdue");
		if (C002_FirstClass_Classroom_SidneyAgree) GameLogAdd("SubdueWithSidney");
		if (C002_FirstClass_Classroom_AmandaAgree) GameLogAdd("SubdueWithAmanda");
		if (C002_FirstClass_Classroom_SarahAgree) GameLogAdd("SubdueWithSarah");
	}

}

// Chapter 2 - Mildred Search
function C002_FirstClass_Mildred_Search() {
	C002_FirstClass_Mildred_SearchAvail = false;
	PlayerAddInventory("Crop", 1);
	PlayerAddInventory("Cuffs", 1);
	PlayerAddInventory("CuffsKey", 1);
	PlayerAddInventory("BallGag", 2);
}

// Chapter 2 - Mildred Ungag
function C002_FirstClass_Mildred_Ungag() {
	ActorRemoveInventory("BallGag");
	PlayerAddInventory("BallGag", 1);
}

// Chapter 2 - Mildred Whip, it only changes her attitude once
function C002_FirstClass_Mildred_Whip() {
	if (C002_FirstClass_Mildred_WhipDone == false) {
		ActorChangeAttitude(-1, 1);
		C002_FirstClass_Mildred_WhipDone = true;
		GameLogAdd("Crop");
	}
}