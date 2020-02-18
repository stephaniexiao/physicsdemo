let firstPhase;
let secondPhase;

let angle;

let xvel;
let yvel;

let canvasx;
let canvasy;
let slope;
let potential1; //initial potential
let kinetic;
let potential;
let mass;

//RECTANGLE
let rectx1; //x anchor
let recty1; //y anchor
let rectw; //rectangle width
let recth; //rectangle height
let shape; //indicates which shape cursor is in 

let topleftcorner;
let toprightcorner;
let bottomleftcorner;
let bottomrightcorner;
let midtop;
let midbot;
let midleft;
let midright;

//CIRCLE
let centerx;
let centery;
let radiusy;
let radiusx;

let draggable; //indicates if OBJECT can be dragged
let resizeable; //indicates if OBJECT can be resized (circle)

function setup() {
  // put setup code here
  	firstPhase = true;
  	secondPhase = false;
  	xvel = 0;
  	yvel = 0;
  	angle = 0;
	canvasx = 720  ;
	canvasy = 500;
	createCanvas(canvasx, canvasy);
	//RECTANGLE default values
	rectx1 = -50; 
	recty1 = canvasy-50; 
	rectw = 100; 
	recth = 100; 
	topleftcorner = false;
	toprightcorner = false;
	bottomleftcorner = false;
	bottomrightcorner = false;
	midtop = false;
	midbot = false;
	midleft = false;
	midright = false;
	inshape = false;

	//CIRCLE default values
	centerx = 300;
	centery = 250;
	radiusx = 70;
	radiusy = 70;

	kinetic = 0;
	potential = 0;


	//OBJECT default values
	draggable = false;
	resizeable  = false;
	shape = "Unknown"
}

function draw() {
  // 0 phase
  	//set up background
  	background(167, 213, 250);
	stroke(0);

	//text
	textSize(20);
	fill(0);

	mass = round(PI * ((radiusx/2)**2));
	
	text("Potential Energy: " + potential/100 + " J", 8, 70, 500, 100);
	text("Kinetic Energy: " + kinetic/100 + " J", 8, 100, 500, 100);
	text("Ball Mass: " + mass/100 + " kg", 8, 12  , 500, 100);
	text("Ramp Slope: " + slope + " m^2" ,8,40,500,100);
	//text("Total Energy: " + (potential/100 + kinetic/100) + " J", 8, 130,500,100);

	//RECTANGLE 
	fill(50, 168, 82);
	rect(rectx1, recty1, rectw, recth);
	dragRect(rectx1, recty1, rectw, recth);

	//RAMP or Triangle
	triangle(rectx1+rectw,recty1+recth,rectx1+rectw,recty1,canvasx,canvasy);
	slope = (recth-50)/(canvasx-50);
	potential1 = 10* (recth-50) * mass + 1000000;
	angle = atan((recth-50)/(canvasx-50));

	//CIRCLE
	fill(255, 84, 84);
	ellipse(centerx, centery, radiusy, radiusx);
	//dragCircle(centerx, centery, radiusy, radiusx);

	redraw();

	if(firstPhase){ //height and size of ball
		dragRect(rectx1, recty1, rectw, recth);	
		dragCircle(centerx, centery, radiusy, radiusx);
	}
	else if(secondPhase){ //animation of ball falling
		potential = potential1 - kinetic;
		kinetic = mass/2 * (sq(xvel) + sq(yvel));

		centerx += (slope*cos(angle)) * xvel;
		centery += (slope*sin(angle)) * yvel;

		xvel += 0.1;
		yvel += 0.1;

		if (potential <= 0){
			firstPhase = true;
			secondPhase = false;
			potential = 0;
			kinetic = potential1;
			xvel = 0;
			yvel = 0;
		}

	}
}

function dragRect(rectx1, recty1, rectw, recth){
	//is the mouse inside th e rectangle?
	if (mouseX >= rectx1 && mouseX <= rectx1 + rectw && mouseY >= recty1 && mouseY <= recty1 + recth){
		shape = "Rectangle"
		strokeWeight(3);
		point(rectx1,recty1); //topleftcorner
    	//point(rectx1 +rectw/2,recty1); //mid top
    	//point(rectx1 +rectw,recty1 + recth/2); //right half
    	point(rectx1,recty1 + recth/2); //left half
    	point(rectx1 +rectw/2,recty1 + recth); //mid bottom
    	point(rectx1,recty1+recth); //bottom left
    	point(rectx1 + rectw,recty1); //topright
    	point(rectx1 + rectw,recty1+recth); //bottom right
    	//point(rectx1+(rectw)/2,recty1+(recth)/2) //midpoint
    	strokeWeight(1);

    	//various rectangle resizing points, sets booleans to true if clicked on
    	if(mouseIsPressed && dist(mouseX,mouseY,rectx1,recty1) < 8){
      		resizeable = true;
      		topleftcorner = true;
    	}
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 +rectw/2,recty1) < 8){
	    	resizeable = true;
	    	midtop = true; 
	    }
	    // else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 +rectw,recty1 + recth/2) < 8){
	    // 	resizeable = true;
	    // 	midright = true;
	    // }
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1,recty1 + recth/2) < 8){
	    	resizeable = true;
	    	midleft = true;
	    }
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 +rectw/2,recty1 + recth) < 8){
	    	resizeable = true;
	    	midbot = true;
	    }
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1,recty1+recth) < 8){
	    	resizeable = true;
	    	bottomleftcorner = true; 
	    }
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 + rectw,recty1) < 8){
	    	resizeable = true;
	    	toprightcorner = true; 
	    }
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 + rectw,recty1+recth) < 8){
	    	resizeable = true;
	    	bottomrightcorner = true; 
	    }
	    //else if(mouseIsPressed && dist(mouseX,mouseY,rectx1+(rectw)/2,recty1+(recth)/2) < 5){
	    	//rectangle can be dragged if middle point is clicked
	    	//draggable = true;
		//}
	}
}

function dragCircle(centerx, centery, radiusx, radiusy){
	if (dist(mouseX, mouseY, centerx, centery) <= radiusx/2){
		shape = "Circle"
		strokeWeight(3);
		point(centerx, centery);//center
		//point(centerx + radiusx/2, centery)//right
		strokeWeight(1);

		//circle draggable, sets boolean to true if clicked on
		if(mouseIsPressed && dist(mouseX, mouseY, centerx, centery) < 8){
			draggable = true;
			resizeable = false;
		}

		//circle resizable, sets boolean to true if clicked on
		if(mouseIsPressed && dist(mouseX, mouseY, centerx, centery) >= radiusx/2 - 8){
			resizeable = true;
			draggable = false;
		}
	}
}

// function dragTri(trix1, triy1, trix2, triy2, trix3, triy3){
// 	//is the mouse inside the triangle?
// 	let condition1 = dfdf // **UNFINISHED**
// 	let condition2 = dfdf // **UNFINISHED**
// 	let condition3 = dfdf // **UNFINISHED**
// 	if (condition1 && condition2 && condition3){
// 		shape = "Triangle"
// 		strokeWeight(3);
// 		point(trix1, triy1); //point1
// 		point(trix2, triy2); //point2
// 		point(trix3, triy3); //point3
// 		noFill();
// 		strokeWeight(1);
// 	}
// }

function mouseDragged(){
	if (shape == "Rectangle"){
		if(draggable){
			rectx1 = mouseX - (rectw / 2);
			recty1 = mouseY - (recth / 2);
		}
		else if(topleftcorner){
			let tempx = rectx1;
			let tempy = recty1;
			rectx1 = mouseX;
			recty1 = mouseY;
			rectw = (tempx - rectx1) + rectw;
			recth = (tempy - recty1) + recth;
		}
		else if(midtop){ 
			let tempy = recty1;
			recty1 = mouseY;
			recth = (tempy - recty1) + recth;
		}
		else if(midright){
			let tempx = rectw;
			rectw = mouseX - rectx1;
		}
		else if (midleft){
			let tempx = rectx1;
			rectx1 = mouseX;
			rectw = (tempx - rectx1) + rectw;
		}
		else if(midbot){
			recth = mouseY - recty1;
		}
		else if(bottomleftcorner){
			let tempx = rectx1;
			rectx1 = mouseX;
			rectw = (tempx - rectx1) + rectw;
			recth = mouseY - recty1;
		}
		else if(toprightcorner){
			// let tempy = recty1;
			// recty1 = mouseY;
			// rectw = mouseX - rectx1;
			// recth = (tempy - recty1) + recth;
			let tempy = recty1;
			recty1 = mouseY;
			recth = (tempy - recty1) + recth;
		}
		else if(bottomrightcorner){
			rectw = mouseX - rectx1;
			recth = mouseY - recty1;
		}
	}
	if (shape == "Circle"){
		if(draggable){
			centerx = mouseX;
			centery = mouseY;
			draggable = false;
		}
		else if(resizeable){
			radiusx = 2 * dist(mouseX, mouseY, centerx, centery);
			radiusy = radiusx;
		}
	}
	// else if (shape == "Triangle"){
	// 	if (draggable){ // **UNFINISHED**
	// 		trix1 = mouseX - 
	// 		triy1 = mouseY - 
	// 		trix2 = mouseX - 
	// 		triy2 = mouseY - 
	// 		trix3 = mouseX - 
	// 		triy3 = mouseY - 
	// 	}
	// 	//UNFINISHED: Do for each of the points!
	// 	else if(point1){
	// 		let //**UNFINISHED**
	// 	}
	// 	else if(point2){
	// 		let //**UNFINISHED**
	// 	}
	// 	else if(point3){
	// 		let //**UNFINISHED**
	// 	}
	
}

function  mouseReleased(){
	shape = ("Unknown");
    draggable = false;
    resizeable = false;
    inshape = false;
    //RECTANGLE
    topleftcorner = false;
	toprightcorner = false;
	bottomleftcorner = false;
	bottomrightcorner = false;
	midtop = false;	
	midbot = false;
	midleft = false;
	midright = false;

}

function keyTyped(){
	if (key === ' ' && firstPhase){
		firstPhase = false;
		secondPhase = true;
		potential = potential1;
		centerx = rectx1 + rectw;
		centery = recty1 - radiusx/2;
	}
	else if (key === ' ' && secondPhase){
		firstPhase = true;
		secondPhase = false;
		centerx = 450;
		centery = 150;
		radiusx = 100;
		radiusy = 100;
		potential = 0;
		kinetic = 0;
		xvel = 0;
		yvel = 0;
	}
}



