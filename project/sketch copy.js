let rectx1; //x anchor
let recty1; //y anchor
let rectw; //rectangle width
let recth; //rectangle height
let draggable; //indicates if OBJECT can be dragged
let resizeable; //indicates if OBJECT can be resized (circle)
let shape; //indicates which shape cursor is in 


let topleftcorner;
let toprightcorner;
let bottomleftcorner;
let bottomrightcorner;
let midtop;
let midbot;
let midleft;
let midright;

function setup() {
  // put setup code here
	createCanvas(1450, 720);
	//OBJECT: rectangle default values
	rectx1 = 100; 
	recty1 = 100; 
	rectw = 100; 
	recth = 200; 
	topleftcorner = false;
	toprightcorner = false;
	bottomleftcorner = false;
	bottomrightcorner = false;
	midtop = false;
	midbot = false;
	midleft = false;
	midright = false;
	inshape = false;

	noFill();

	//OBJECT default values
	draggable = false;
	resizeable  = false;
	shape = "Unknown"
}

function draw() {
  // put drawing code here
  	//set up background
  	background(210, 254, 245);
	stroke(20, 20, 20);
	//draw rectangle
	rect(rectx1, recty1, rectw, recth);
	//call Rectangle modification method "dragRect"
	dragRect(rectx1, recty1, rectw, recth);

	//display text
	fill(0);
	text("The area of the rectangle is " + rectw * recth + " pixels squared.", 10, 10, 100, 100);
	noFill();

	redraw();
	}

function dragRect(rectx1, recty1, rectw, recth){
	//is the mouse inside the rectangle?
	if (mouseX >= rectx1 && mouseX <= rectx1 + rectw && mouseY >= recty1 && mouseY <= recty1 + recth){
		shape = "Rectangle"
		strokeWeight(3);
		point(rectx1,recty1); //topleftcorner
    	point(rectx1 +rectw/2,recty1); //mid top
    	point(rectx1 +rectw,recty1 + recth/2); //right half
    	point(rectx1,recty1 + recth/2); //left half
    	point(rectx1 +rectw/2,recty1 + recth); //mid bottom
    	point(rectx1,recty1+recth); //bottom left
    	point(rectx1 + rectw,recty1); //topright
    	point(rectx1 + rectw,recty1+recth); //bottom right
    	point(rectx1+(rectw)/2,recty1+(recth)/2) //midpoint
    	noFill();
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
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1 +rectw,recty1 + recth/2) < 8){
	    	resizeable = true;
	    	midright = true;
	    }
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
	    else if(mouseIsPressed && dist(mouseX,mouseY,rectx1+(rectw)/2,recty1+(recth)/2) < 5){
	    	//rectangle can be dragged if middle point is clicked
	    	draggable = true;
		}
	}
}

function mouseDragged(){
	if (shape == "Rectangle"){
		if(draggable){
			rectx1 = mouseX - (rectw / 2);
			recty1 = mouseY - (recth / 2);
			draggable = false;
		}
		else if(topleftcorner){
			let tempx = rectx1;
			let tempy = recty1;
			rectx1 = mouseX;
			recty1 = mouseY;
			rectw = (tempx - rectx1) + rectw;
			recth = (tempy - recty1) + recth;
			topleftcorner = false;
		}
		else if(midtop){ 
			let tempy = recty1;
			recty1 = mouseY;
			recth = (tempy - recty1) + recth;
			midtop = false;
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
			let tempy = recty1;
			recty1 = mouseY;
			rectw = mouseX - rectx1;
			recth = (tempy - recty1) + recth;
		}
		else if(bottomrightcorner){
			rectw = mouseX - rectx1;
			recth = mouseY - recty1;
		}
	}
}

function  mouseReleased(){
	shape = ('unknown');
    draggable = false;
    resizeable = false;
    topleftcorner = false;
	toprightcorner = false;
	bottomleftcorner = false;
	bottomrightcorner = false;
	midtop = false;	
	midbot = false;
	midleft = false;
	midright = false;
	inshape = false;
  
}



