var C000_Intro_CreatePlayer_ChapterToLoad = "C001_BeforeClass";
var C000_Intro_CreatePlayer_SkillCount = 5;
var C000_Intro_CreatePlayer_ControlLoaded = false;

// Create Player Load
function C000_Intro_CreatePlayer_Load() {

	// No leave, the player must enter a name
	LeaveIcon = "";
	LeaveScreen = "";
	LoadText();

}

// Create Player Run
function C000_Intro_CreatePlayer_Run() {

	// If we load the controls
	if ((C000_Intro_CreatePlayer_ControlLoaded == false) && (GetText("Skill" + C000_Intro_CreatePlayer_SkillCount.toString()) != "")) {

		// Creates a text box to enter the player name
		var InputName = document.createElement('input');
		InputName.setAttribute("ID", "InputName");
		InputName.setAttribute("name", "InputName");
		InputName.setAttribute("type", "text");
		InputName.setAttribute("value", "");
		InputName.setAttribute("maxlength", "20");
		InputName.setAttribute("style", "font-size:24px; font-family:Arial; position:absolute; padding-left:10px; left:200px; top:240px; width:500px; height:50px;");
		InputName.addEventListener("keypress", KeyDown);
		document.body.appendChild(InputName);
		InputName.focus();

		// Creates a select box to pick a starting skill
		var SelectSkill = document.createElement('select');
		SelectSkill.setAttribute("ID", "SelectSkill");
		SelectSkill.setAttribute("name", "SelectSkill");
		SelectSkill.setAttribute("style", "font-size:24px; font-family:Arial; position:absolute; padding-left:10px; left:300px; top:330px; width:300px; height:50px;");
		for(var S = 0; S <= 5; S++)
			SelectSkill.appendChild(new Option(GetText("Skill" + S.toString()), S.toString()));
		document.body.appendChild(SelectSkill);
		C000_Intro_CreatePlayer_ControlLoaded = true;
	
	}
	
	// Draw the player image and the text input for the name
	DrawImage(CurrentChapter + "/" + CurrentScreen + "/Player.jpg", 900, 0);
	DrawRect(0, 0, 900, 600, "white");
	DrawText(GetText("EnterName"), 450, 100, "black");
	DrawText(GetText("ValidChars"), 450, 180, "black");

	// Creates the "validate" button
	DrawRect(300, 450, 300, 70, "#8c304e");
	DrawText(GetText("Validate"), 450, 485, "white");
	
}

// Validate the name and starts the game
function C000_Intro_CreatePlayer_Validate() {
	var NewName = document.getElementById("InputName").value.trim();
	var StartingSkill = document.getElementById("SelectSkill").value.trim();
	var letters = /^[a-zA-Z ]+$/;
	if (NewName.match(letters) && (NewName.length > 0) && (NewName.length <= 20)) {
		if (StartingSkill == "1") PlayerAddSkill("Arts", 1);
		if (StartingSkill == "2") PlayerAddSkill("Fighting", 1);
		if (StartingSkill == "3") PlayerAddSkill("RopeMastery", 1);
		if (StartingSkill == "4") PlayerAddSkill("Sports", 1);
		if (StartingSkill == "5") PlayerAddSkill("Seduction", 1);
		PlayerSkillShowLevelUp = 0;
		Common_PlayerName = NewName;
		document.getElementById("InputName").parentNode.removeChild(document.getElementById("InputName"));
		document.getElementById("SelectSkill").parentNode.removeChild(document.getElementById("SelectSkill"));
		SetScene(C000_Intro_CreatePlayer_ChapterToLoad, "Intro");
	}
}

// Create Player Key Down
function C000_Intro_CreatePlayer_KeyDown() {
	//if (KeyPress == 13) C000_Intro_CreatePlayer_Validate();
}

// Create Player Click
function C000_Intro_CreatePlayer_Click() {	
	if ((MouseX >= 300) && (MouseX <= 600) && (MouseY >= 450) && (MouseY <= 520)) C000_Intro_CreatePlayer_Validate();
}