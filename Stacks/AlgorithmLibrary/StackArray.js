

var ARRAY_START_X = 400;
var ARRAY_START_Y = 200;
var ARRAY_ELEM_WIDTH = 60;
var ARRAY_ELEM_HEIGHT = 70;

var ARRRAY_ELEMS_PER_LINE = 20;
var ARRAY_LINE_SPACING = 150;

var TOP_POS_X = 900;
var TOP_POS_Y = 100;
var TOP_LABEL_X = 830;
var TOP_LABEL_Y =  100;

var PUSH_LABEL_X = 430;
var PUSH_LABEL_Y = 30;
var PUSH_ELEMENT_X = 510;
var PUSH_ELEMENT_Y = 30;

var SIZE = 60;

function StackArray(am, w, h)
{
	this.init(am, w, h);
	
}

StackArray.prototype = new Algorithm();
StackArray.prototype.constructor = StackArray;
StackArray.superclass = Algorithm.prototype;


StackArray.prototype.init = function(am, w, h)
{
	StackArray.superclass.init.call(this, am, w, h);
	this.addControls();
	this.nextIndex = 0;
	this.commands = [];
	this.setup();
	this.initialIndex = this.nextIndex;
}


StackArray.prototype.addControls =  function()
{
	this.controls = [];
	// TEXT FIELD //
	this.pushField = addControlToAlgorithmBar("Text", "");
	this.pushField.onkeydown = this.returnSubmit(this.pushField,  this.pushCallback.bind(this), 10);
	this.pushField.style.height = '35px'; // setting the height to 35px
	this.pushField.style.width = '100px'; // setting width to 100px
    this.pushField.style.background = 'white'; // setting the background color to whitw
    this.pushField.style.color = 'Black'; // setting the color to black
    this.pushField.style.fontSize = '20px'; // setting the font size to 20px
	
	
	// PUSH BUTTON //
	this.pushButton = addControlToAlgorithmBar("Button", "Push");
    this.pushButton.style.height = '35px'; // setting the height to 35px
	this.pushButton.style.width = '80px'; // setting width to 80px
    this.pushButton.style.background = 'white'; // setting the background color to whitw
    this.pushButton.style.color = 'Black'; // setting the color to black
	this.pushButton.style.borderRadius='6px';
    this.pushButton.style.fontSize = '20px'; // setting the font size to 20px

	this.pushButton.onclick = this.pushCallback.bind(this);
	this.controls.push(this.pushField);
	this.controls.push(this.pushButton);

    // POP BUTTON//
	this.popButton = addControlToAlgorithmBar("Button", "Pop");
    this.popButton.style.height = '35px'; // setting the height to 35px
	this.popButton.style.width = '80px'; // setting width to 80px
    this.popButton.style.background = 'white'; // setting the background color to whitw
    this.popButton.style.color = 'Black'; // setting the color to black
	this.popButton.style.borderRadius='6px';
    this.popButton.style.fontSize = '20px'; // setting the font size to 20px

	this.popButton.onclick = this.popCallback.bind(this);
	this.controls.push(this.popButton);
	
	// CLEAR STACK BUTTON //
	this.clearButton = addControlToAlgorithmBar("Button", "Clear Stack");
    this.clearButton.style.height = '35px'; // setting the height to 35px
	this.clearButton.style.width = '120px'; // setting width to 80px
    this.clearButton.style.background = 'white'; // setting the background color to whitw
    this.clearButton.style.color = 'Black'; // setting the color to black
    this.clearButton.style.fontSize = '20px'; // setting the font size to 20px
	this.clearButton.style.borderRadius='6px';
	this.clearButton.onclick = this.clearCallback.bind(this);
	this.controls.push(this.clearButton);
	
}

StackArray.prototype.enableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = false;
	}
	
	
}
StackArray.prototype.disableUI = function(event)
{
	for (var i = 0; i < this.controls.length; i++)
	{
		this.controls[i].disabled = true;
	}
}


StackArray.prototype.setup = function()
{
	this.nextIndex = 0;
	
	this.arrayID = new Array(SIZE);
	this.arrayLabelID = new Array(SIZE);
	for (var i = 0; i < SIZE; i++)
	{
		
		this.arrayID[i]= this.nextIndex++;
		this.arrayLabelID[i]= this.nextIndex++;
	}
	this.topID = this.nextIndex++;
	this.topLabelID = this.nextIndex++;
	
	this.arrayData = new Array(SIZE);
	this.top = 0;
	this.leftoverLabelID = this.nextIndex++;
	this.commands = new Array();
	
	for (var i = 0; i < SIZE; i++)
	{
		var xpos = (i  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
		var ypos = Math.floor(i / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
		this.cmd("CreateRectangle", this.arrayID[i],"", ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT,xpos, ypos);
		this.cmd("CreateLabel",this.arrayLabelID[i],  i,  xpos, ypos + ARRAY_ELEM_HEIGHT);
	
		
	/* index label color change*/
		this.cmd("SetForegroundColor", this.arrayLabelID[i], "#ffffff");
		
	}
	this.cmd("CreateLabel", this.topLabelID, "TOP", TOP_LABEL_X, TOP_LABEL_Y);
	this.cmd("CreateRectangle", this.topID, 0, ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT, TOP_POS_X, TOP_POS_Y);
	this.cmd("CreateLabel", this.leftoverLabelID, "", PUSH_LABEL_X, PUSH_LABEL_Y);
	
	/*  top label color change*/
	
	this.cmd("SetForegroundColor", this.topLabelID, "#ffffff");
	this.highlight1ID = this.nextIndex++;
	this.highlight2ID = this.nextIndex++;

	this.animationManager.StartNewAnimation(this.commands);
	this.animationManager.skipForward();
	this.animationManager.clearHistory();
	
}

		
		
StackArray.prototype.reset = function()
{
	this.top = 0;
	this.nextIndex = this.initialIndex;

}
		
		
StackArray.prototype.pushCallback = function(event)
{
	if (this.top < SIZE && this.pushField.value != "")
	{
		var pushVal = this.pushField.value;
		this.pushField.value = ""
		this.implementAction(this.push.bind(this), pushVal);
	}
}
		
		
StackArray.prototype.popCallback = function(event)
{
	if (this.top > 0)
	{
		this.implementAction(this.pop.bind(this), "");
	}
}
		

StackArray.prototype.clearCallback = function(event)
{
	this.implementAction(this.clearData.bind(this), "");
}

StackArray.prototype.clearData = function(ignored)
{
	this.commands = new Array();
	this.clearAll();
	return this.commands;			
}
		

StackArray.prototype.push = function(elemToPush)
{
	this.commands = new Array();
	
	var labPushID = this.nextIndex++;
	var labPushValID = this.nextIndex++;
	this.arrayData[this.top] = elemToPush;
	
	this.cmd("SetText", this.leftoverLabelID, "");
	
	this.cmd("CreateLabel", labPushID, "Pushing Value: ", PUSH_LABEL_X, PUSH_LABEL_Y);
	this.cmd("CreateLabel", labPushValID,elemToPush, PUSH_ELEMENT_X, PUSH_ELEMENT_Y);
	
	this.cmd("Step");			
	this.cmd("CreateHighlightCircle", this.highlight1ID, "#0000FF",  TOP_POS_X, TOP_POS_Y);
	this.cmd("Step");
	
	var xpos = (this.top  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
	var ypos = Math.floor(this.top / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
	
	this.cmd("Move", this.highlight1ID, xpos, ypos + ARRAY_ELEM_HEIGHT); 				
	this.cmd("Step");
	
	this.cmd("Move", labPushValID, xpos, ypos);
	this.cmd("Step");
	
	this.cmd("Settext", this.arrayID[this.top], elemToPush);
	this.cmd("Delete", labPushValID);
	
	this.cmd("Delete", this.highlight1ID);
	
	this.cmd("SetHighlight", this.topID, 1);
	this.cmd("Step");
	this.top = this.top + 1;
	this.cmd("SetText", this.topID, this.top)
	this.cmd("Delete", labPushID);
	this.cmd("Step");
	this.cmd("SetHighlight", this.topID, 0);
	
	return this.commands;
}

StackArray.prototype.pop = function(ignored)
{
	this.commands = new Array();
	
	var labPopID = this.nextIndex++;
	var labPopValID = this.nextIndex++;
	
	this.cmd("SetText", this.leftoverLabelID, "");

	
	this.cmd("CreateLabel", labPopID, "Popped Value: ", PUSH_LABEL_X, PUSH_LABEL_Y);
	
	
	this.cmd("SetHighlight", this.topID, 1);
	this.cmd("Step");
	this.top = this.top - 1;
	this.cmd("SetText", this.topID, this.top)
	this.cmd("Step");
	this.cmd("SetHighlight", this.topID, 0);
	
	this.cmd("CreateHighlightCircle", this.highlight1ID, "#0000FF",  TOP_POS_X, TOP_POS_Y);
	this.cmd("Step");
	
	var xpos = (this.top  % ARRRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
	var ypos = Math.floor(this.top / ARRRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y;
	
	this.cmd("Move", this.highlight1ID, xpos, ypos + ARRAY_ELEM_HEIGHT); 				
	this.cmd("Step");
	
	this.cmd("CreateLabel", labPopValID,this.arrayData[this.top], xpos, ypos);
	this.cmd("Settext", this.arrayID[this.top], "");
	this.cmd("Move", labPopValID,  PUSH_ELEMENT_X, PUSH_ELEMENT_Y);
	this.cmd("Step");
	this.cmd("Delete", labPopValID)
	this.cmd("Delete", labPopID);
	this.cmd("Delete", this.highlight1ID);
	this.cmd("SetForegroundColor", this.leftoverLabelID, "#ffffff");
	this.cmd("SetText", this.leftoverLabelID, "Popped Value: " + this.arrayData[this.top]);


	
	return this.commands;
}



StackArray.prototype.clearAll = function()
{
	this.commands = new Array();
	for (var i = 0; i < this.top; i++)
	{
		this.cmd("SetText", this.arrayID[i], "");
	}
	this.top = 0;
	this.cmd("SetText", this.topID, "0");
	return this.commands;
			
}
	


var currentAlg;

function init()
{
	var animManag = initCanvas();
	currentAlg = new StackArray(animManag, canvas.width, canvas.height);
}
