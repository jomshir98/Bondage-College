var C010_Revenge_AmandaSarah_CurrentStage = 0;
var C010_Revenge_AmandaSarah_AmandaVictim = true;
var C010_Revenge_AmandaSarah_AmandaGone = false;
var C010_Revenge_AmandaSarah_SarahGone = false;
var C010_Revenge_AmandaSarah_ItemStolen = false;
var C010_Revenge_AmandaSarah_WasBelted = false;
var C010_Revenge_AmandaSarah_MasturbateCount = 0;
var C010_Revenge_AmandaSarah_IntroText = "";
var C010_Revenge_AmandaSarah_AllowFight = true;
var C010_Revenge_AmandaSarah_LockerListenStage = 0;
var C010_Revenge_AmandaSarah_CurrentActor = "Amanda";

// Chapter 10 - Amanda and Sarah Revenge Load
function C010_Revenge_AmandaSarah_Load() {

	// Set the timer limits at 15:15
	StartTimer(15.25 * 60 * 60 * 1000, "C010_Revenge", "Outro");
	
	// Load the scene parameters (loads Sarah first in case we are starting directly in chapter 10)
	ActorLoad("Sarah", "");
	ActorLoad(C010_Revenge_AmandaSarah_CurrentActor, "");
	if (C010_Revenge_AmandaSarah_CurrentStage == 0) { ActorSpecificSetPose("Amanda", "Furious"); ActorSpecificSetPose("Sarah", "Angry"); }	
	LoadInteractions();
	LeaveIcon = "";
	Common_SelfBondageAllowed = false;
	C010_Revenge_AmandaSarah_AmandaVictim = GameLogQuery("C007_LunchBreak", "Amanda", "Stranded");

	// If we must put the previous text back
	if (C010_Revenge_AmandaSarah_IntroText != "") OverridenIntroText = C010_Revenge_AmandaSarah_IntroText;

}

// Chapter 10 - Amanda and Sarah Revenge Run
function C010_Revenge_AmandaSarah_Run() {
	
	// Build the text interactions
	BuildInteraction(C010_Revenge_AmandaSarah_CurrentStage);

	// Before 100 we don't show the player and the girls can leave, same for 400 or up
	if ((C010_Revenge_AmandaSarah_CurrentStage < 100) || ((C010_Revenge_AmandaSarah_CurrentStage >= 400) && (C010_Revenge_AmandaSarah_CurrentStage <= 440))) {
		if (!C010_Revenge_AmandaSarah_AmandaGone && !C010_Revenge_AmandaSarah_SarahGone) {
			if (CurrentActor == "Amanda") {
				DrawActor("Sarah", 800, 50, 0.8);
				DrawActor("Amanda", 500, 0, 1.0);
			} else {
				DrawActor("Amanda", 525, 50, 0.8);
				DrawActor("Sarah", 675, 0, 1.0);		
			}
		} else {
			if (!C010_Revenge_AmandaSarah_AmandaGone || !C010_Revenge_AmandaSarah_SarahGone) {
				if ((C010_Revenge_AmandaSarah_CurrentStage == 55) || (C010_Revenge_AmandaSarah_CurrentStage == 75))
					DrawActor(CurrentActor, 690, 20, 0.75);
				else
					DrawInteractionActor();
			}
		}		
	}
	
	// Between 100 and 160, draw the player in the middle of the girls
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 100) && (C010_Revenge_AmandaSarah_CurrentStage <= 160)) {
		DrawActor("Amanda", 525, 50, 0.8);
		DrawActor("Sarah", 800, 50, 0.8);
		DrawActor("Player", 600, 0, 1.0);
	}

	// Between 170 and 190, 210 and 300, Amanda & Sarah are leaning on the lockers
	if (((C010_Revenge_AmandaSarah_CurrentStage >= 170) && (C010_Revenge_AmandaSarah_CurrentStage <= 190)) || ((C010_Revenge_AmandaSarah_CurrentStage >= 210) && (C010_Revenge_AmandaSarah_CurrentStage <= 300))) {
		ActorSpecificSetPose("Amanda", "LeaningRight");
		ActorSpecificSetPose("Sarah", "LeaningLeft");
		DrawActor("Amanda", 475, 25, 0.8);
		DrawActor("Sarah", 850, 30, 0.8);
	}
	
	// Between 170 and 180, draw the player in front of the locker, at 190 or more she's inside
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 170) && (C010_Revenge_AmandaSarah_CurrentStage <= 180)) DrawActor("Player", 600, 150, 1.0);
	if ((C010_Revenge_AmandaSarah_CurrentStage >= 190) && (C010_Revenge_AmandaSarah_CurrentStage <= 300)) DrawActor("Player", 690, 20, 0.75);

	// If both of them are squeezed in lockers on stage 450
	if (C010_Revenge_AmandaSarah_CurrentStage == 450) {
		DrawActor("Sarah", 600, 20, 0.75);
		DrawActor("Amanda", 767, 25, 0.75);
	}
	
}

// Chapter 10 - Amanda and Sarah Revenge Click
function C010_Revenge_AmandaSarah_Click() {	

	// Regular interactions
	ClickInteraction(C010_Revenge_AmandaSarah_CurrentStage);
	
	// The player can click on herself
	var ClickInv = GetClickedInventory();
	if (ClickInv == "Player") {
		C010_Revenge_AmandaSarah_IntroText = OverridenIntroText;
		C010_Revenge_AmandaSarah_CurrentActor = CurrentActor; 
		InventoryClick(ClickInv, CurrentChapter, CurrentScreen);
	}
	
}

// Chapter 10 - Amanda and Sarah Revenge - Switch the focus to another actor
function C010_Revenge_AmandaSarah_SwitchFocus(ActorToFocus) {	
	if (C010_Revenge_AmandaSarah_CurrentStage < 400) ActorSetPose("Angry");
	ActorLoad(ActorToFocus, "");
	if (C010_Revenge_AmandaSarah_CurrentStage < 400) ActorSetPose("Furious");
	LeaveIcon = "";
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda kneels
function C010_Revenge_AmandaSarah_AmandaKneel() {
	ActorSpecificSetPose("Amanda", "Kneeling");
	ActorSpecificSetPose("Sarah", "Furious");
	GameLogSpecificAdd("C010_Revenge", "Amanda", "Kneel");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah kneels
function C010_Revenge_AmandaSarah_SarahKneel() {
	ActorSpecificSetPose("Sarah", "Kneeling");
	ActorSpecificSetPose("Amanda", "Furious");
	GameLogSpecificAdd("C010_Revenge", "Sarah", "Kneel");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Amanda leaves
function C010_Revenge_AmandaSarah_AmandaLeave() {
	C010_Revenge_AmandaSarah_AmandaGone = true;
	C010_Revenge_Outro_GoodEnding = true;
	if (!C010_Revenge_AmandaSarah_SarahGone) C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Sarah leaves
function C010_Revenge_AmandaSarah_SarahLeave() {
	C010_Revenge_AmandaSarah_SarahGone = true;
	C010_Revenge_Outro_GoodEnding = true;
	if (!C010_Revenge_AmandaSarah_AmandaGone) C010_Revenge_AmandaSarah_SwitchFocus("Amanda");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Actor calms down (stops the pose)
function C010_Revenge_AmandaSarah_CalmDown(ActorToCalm) {
	ActorSpecificSetPose(ActorToCalm, "");
}

// Chapter 10 - Amanda and Sarah Revenge - When the actor enters the locker
function C010_Revenge_AmandaSarah_EnterLocker(ActorInLocker) {
	
	// Puts the actor(s) in the locker
	if ((ActorInLocker == "Amanda") || (ActorInLocker == "Both")) ActorSpecificSetPose("Amanda", "Locker");
	if ((ActorInLocker == "Sarah") || (ActorInLocker == "Both")) ActorSpecificSetPose("Sarah", "Locker");
	if (ActorInLocker == "Player") Common_PlayerPose = "Locker";
	CurrentTime = CurrentTime + 50000;
	if ((ActorInLocker != "Amanda") && (ActorInLocker != "Sarah")) CurrentActor = "";

	// Saves the log
	if (ActorInLocker == "Both") { GameLogSpecificAdd("C010_Revenge", "Amanda", "Locker"); GameLogSpecificAdd("C010_Revenge", "Sarah", "Locker"); }
	else GameLogSpecificAdd("C010_Revenge", ActorInLocker, "Locker");

}

// Chapter 10 - Amanda and Sarah Revenge - When the player opens the locker
function C010_Revenge_AmandaSarah_OpenLocker(ActorInLocker) {
	if ((ActorInLocker == "Amanda") || (ActorInLocker == "Both")) C010_Revenge_AmandaSarah_AmandaGone = false;
	if ((ActorInLocker == "Sarah") || (ActorInLocker == "Both")) C010_Revenge_AmandaSarah_SarahGone = false;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - When the player closer the locker
function C010_Revenge_AmandaSarah_CloseLocker(ActorInLocker) {
	if ((ActorInLocker == "Amanda") || (ActorInLocker == "Both")) C010_Revenge_AmandaSarah_AmandaGone = true;
	if ((ActorInLocker == "Sarah") || (ActorInLocker == "Both")) C010_Revenge_AmandaSarah_SarahGone = true;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Steal Items
function C010_Revenge_AmandaSarah_StealItems() {
	
	// Backup the player inventory
	PlayerSaveAllInventory();
	PlayerRemoveAllInventory();
	C010_Revenge_AmandaSarah_ItemStolen = true;
	CurrentTime = CurrentTime + 50000;
	
	// If Sarah and Amanda are not in belt, and they like (+20 total) or submit (+20 total) to the player, we skip the stripping part
	if (!ActorSpecificHasInventory("Amanda", "ChastityBelt") && !ActorSpecificHasInventory("Sarah", "ChastityBelt") && ((ActorSpecificGetValue("Amanda", ActorLove) + ActorSpecificGetValue("Sarah", ActorLove) >= 20) || (ActorSpecificGetValue("Amanda", ActorSubmission) + ActorSpecificGetValue("Sarah", ActorSubmission) >= 20))) {
		C010_Revenge_AmandaSarah_CurrentStage = 160;
		C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
		Common_PlayerPose = "BackShy";
		OverridenIntroText = GetText("LockerNoStrip");
	}
	
}

// Chapter 10 - Amanda and Sarah Revenge - Recover the stolen items and clothes
function C010_Revenge_AmandaSarah_RecoverItems() {
	C010_Revenge_AmandaSarah_ItemStolen = false;
	PlayerRestoreAllInventory();
	CurrentTime = CurrentTime + 50000;
	PlayerClothes("Clothed");
}

// Chapter 10 - Amanda and Sarah Revenge - Starts the fight 2 VS 1
function C010_Revenge_AmandaSarah_StartFight() {
		
	// Sets the fight difficulty
	var AmandaDifficulty = "Normal";
	var SarahDifficulty = "Easy";
	if (ActorSpecificGetValue("Amanda", ActorSubmission) < 0) AmandaDifficulty = "Hard";
	if (ActorSpecificGetValue("Sarah", ActorSubmission) < 0) SarahDifficulty = "Normal";

	// Launch the double fight
	C010_Revenge_AmandaSarah_IntroText = "";
	DoubleFightLoad("Amanda", AmandaDifficulty, Icons.Fight.Punch, "Sarah", SarahDifficulty, Icons.Fight.Punch, "Lockers", "C010_Revenge_AmandaSarah_EndFight", PlayerGetSkillLevel("Fighting"));

}

// Chapter 10 - Amanda and Sarah Revenge - When the fight ends
function C010_Revenge_AmandaSarah_EndFight(Victory) {
	
	// Change the girls attitude depending on the victory or defeat	
	ActorSpecificChangeAttitude("Amanda", -2, Victory ? 2 : -2);
	ActorSpecificChangeAttitude("Sarah", -2, Victory ? 2 : -2);
	GameLogSpecificAdd("C010_Revenge", "Amanda", Victory ? "FightVictory" : "FightDefeat");
	GameLogSpecificAdd("C010_Revenge", "Sarah", Victory ? "FightVictory" : "FightDefeat");
	C010_Revenge_AmandaSarah_AllowFight = false;
	
	// On a victory, we jump to stage 400 right away, on a defeat, we show a custom text
	if (Victory) {
		C010_Revenge_Outro_GoodEnding = true;
		ActorLoad("Amanda", "");
		LeaveIcon = "";
		ActorSpecificSetPose("Amanda", "Surrender");
		ActorSpecificSetPose("Sarah", "Surrender");
		C010_Revenge_AmandaSarah_CurrentStage = 400;
	} else OverridenIntroText = GetText("FightDefeat" + C010_Revenge_AmandaSarah_CurrentStage.toString());

}

// Chapter 10 - Amanda and Sarah Revenge - When the player strips
function C010_Revenge_AmandaSarah_PlayerStrip() {
	PlayerClothes("Naked");
	Common_PlayerPose = "BackShy";
	C010_Revenge_AmandaSarah_SwitchFocus("Sarah");
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - Tests if they want the player in a chastity belt or not
function C010_Revenge_AmandaSarah_TestForBelt() {

	// If they don't like the player, the play is sub or the player locked a belt on them, she gets a chastity belt
	if (ActorSpecificHasInventory("Amanda", "ChastityBelt")) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForAmandaBelt"); return; }
	if (ActorSpecificHasInventory("Sarah", "ChastityBelt")) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForSarahBelt"); return; }
	if (ActorSpecificGetValue("Amanda", ActorLove) + ActorSpecificGetValue("Sarah", ActorLove) < 0) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForHate"); return; } 
	if (ActorSpecificGetValue("Amanda", ActorSubmission) + ActorSpecificGetValue("Sarah", ActorSubmission) < 0) { C010_Revenge_AmandaSarah_CurrentStage = 130; OverridenIntroText = GetText("BeltForSub"); return; }

}

// Chapter 10 - Amanda and Sarah Revenge - When the player gets locked in a chastity belt
function C010_Revenge_AmandaSarah_LockBelt() {
	PlayerLockInventory("ChastityBelt");
	GameLogSpecificAdd("C010_Revenge", "Amanda", "ChastityBeltPlayer");
	GameLogSpecificAdd("C010_Revenge", "Sarah", "ChastityBeltPlayer");
	C010_Revenge_AmandaSarah_WasBelted = true;
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - If Sarah needs to do a special comment on chastity belts
function C010_Revenge_AmandaSarah_BeltComment() {
	if (ActorSpecificHasInventory("Sarah", "ChastityBelt")) OverridenIntroText = GetText("BeltSarah");
	if (ActorSpecificHasInventory("Amanada", "ChastityBelt")) OverridenIntroText = GetText("BeltAmanda");
}

// At 15:10, Amanda & Sarah return to the locker
function C010_Revenge_AmandaSarah_ReturnToLocker() {
	
	// The player can be caught masturbating while she waits
	OverridenIntroImage = "";
	if (Common_PlayerPose == "LockerMasturbate") {
		ActorLoad("Sarah", "");
		ActorChangeAttitude(1, 0);
		GameLogSpecificAdd("C010_Revenge", "", "CaughtMasturbating");
		OverridenIntroText = GetText("CaughtMasturbating");
		C010_Revenge_AmandaSarah_CurrentStage = 210;
	} else {
		ActorLoad("Amanda", "");
		OverridenIntroText = GetText("LearnLesson");
		C010_Revenge_AmandaSarah_CurrentStage = 250;
	}
	LeaveIcon = "";
	
}

// Chapter 10 - Amanda and Sarah Revenge - Wait in the locker (Spends 2 minutes)
function C010_Revenge_AmandaSarah_WaitLocker() {
	OverridenIntroImage = "";
	Common_PlayerPose = "Locker";
	CurrentTime = CurrentTime + 110000;
	if (CurrentTime >= 15.16667 * 60 * 60 * 1000) C010_Revenge_AmandaSarah_ReturnToLocker();
}

// Chapter 10 - Amanda and Sarah Revenge - When the player masturbates from inside the locker
function C010_Revenge_AmandaSarah_MasturbateLocker() {

	// Under a belt, not much can happen
	OverridenIntroImage = "";
	if (Common_PlayerChaste) {
		OverridenIntroText = GetText("CannotMasturbate");
	} else {

		// If the player has the egg, she can climax multiple times, if not, only 1 time
		C010_Revenge_AmandaSarah_MasturbateCount++;
		Common_PlayerPose = "LockerMasturbate";
		if (C010_Revenge_AmandaSarah_MasturbateCount == 3) { GameLogSpecificAdd("C010_Revenge", "", "LockerOrgasm"); OverridenIntroText = GetText("Orgasm"); OverridenIntroImage = "LockerInsideOrgasm.jpg"; }
		if ((C010_Revenge_AmandaSarah_MasturbateCount >= 4) && !PlayerHasLockedInventory("VibratingEgg")) OverridenIntroText = GetText("OrgasmEnough");
		if ((C010_Revenge_AmandaSarah_MasturbateCount >= 4) && PlayerHasLockedInventory("VibratingEgg")) {
			OverridenIntroText = GetText("OrgasmRepeat");
			C010_Revenge_AmandaSarah_MasturbateCount = 0;
		}

	}
	
	// Spends 2 minutes
	CurrentTime = CurrentTime + 110000;
	if (CurrentTime >= 15.16667 * 60 * 60 * 1000) C010_Revenge_AmandaSarah_ReturnToLocker();
}

// Chapter 10 - Amanda and Sarah Revenge - When the player is caught and stops masturbating
function C010_Revenge_AmandaSarah_StopMasturbating() {
	Common_PlayerPose = "Locker";
}

// Chapter 10 - Amanda and Sarah Revenge - Remove the WasBelted dialog option
function C010_Revenge_AmandaSarah_RemoveWasBelted() {
	C010_Revenge_AmandaSarah_WasBelted = false;
}

// Chapter 10 - Amanda and Sarah Revenge - When the player listens in the locker
function C010_Revenge_AmandaSarah_LockerListen() {
	C010_Revenge_AmandaSarah_LockerListenStage++;
	if (C010_Revenge_AmandaSarah_LockerListenStage > 4) C010_Revenge_AmandaSarah_LockerListenStage = 1;
	OverridenIntroText = GetText("LockerListen" + C010_Revenge_AmandaSarah_LockerListenStage.toString());
	CurrentTime = CurrentTime + 50000;
}

// Chapter 10 - Amanda and Sarah Revenge - End the revenge and flag the end
function C010_Revenge_AmandaSarah_EarlyEnding(EndingType) {
	if (EndingType == "DoubleLocker") {
		GameLogSpecificAdd("C010_Revenge", "Amanda", "LockerStuck");
		GameLogSpecificAdd("C010_Revenge", "Sarah", "LockerStuck");
		ActorSpecificChangeAttitude("Amanda", -2, 1);
		ActorSpecificChangeAttitude("Sarah", 0, 1);
	}
	C010_Revenge_EarlyEnding_Type = EndingType;
	SetScene(CurrentChapter, "EarlyEnding");
}

// Chapter 10 - Amanda and Sarah Revenge - End the chapter, the player is liberated
function C010_Revenge_AmandaSarah_EndChapter() {
	SetScene(CurrentChapter, "Outro");
}