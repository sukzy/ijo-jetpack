/*
 * Ijo Jetpack 😄
 * remake from Android Jetpack: https://developer.android.com/10/?linkId=58619083 😅
 * using JavaScript
 * Library: p5.js
 * 
 * https://github.com/hilmizul/ijo-jetpack
 * https://hilmizul.github.io/ijo-jetpack
 * 
 * 29 Oktober 2018.
 * Zul Hilmi
 */
var player;
var capcakes = [];
var donuts = [];
var gingerbreads = [];
var oreos = [];
var bugs = [];
var capcake;
var donut;
var gingerbread;
var oreo;
var bug;
var bg;
var theme;

var pause = false;
var play = true;
let gasCapacity = 100;
var gas = 100;
var distance = 0;

var jump, flying, eat, gameover, hitbug, sfxEat;
var droidImg, cupcakeImg, donutImg, bugImg, oreoImg, base, bgImg, bg2Img, bgNightImg, bg2NightImg, awan;

var font;

function preload() {
	droidImg = loadImage('assets/img/droid.png');
	capcakeImg = loadImage('assets/img/capcake.png');
	donutImg = loadImage('assets/img/donut.png');
	gingerbreadImg = loadImage('assets/img/gingerbread.png');
	oreoImg = loadImage('assets/img/oreo.png');

	bugImg = loadImage('assets/img/bug.png');
	bgImg = loadImage('assets/img/bg-small.png');
	bgNightImg = loadImage('assets/img/bg-small-night.png');
	bg2Img = loadImage('assets/img/bg2.png');
	bg2NightImg = loadImage('assets/img/bg2-night.png');
	base = loadImage('assets/img/base.png');
	awan = loadImage('assets/img/awan.png');

	flying = loadSound('assets/sfx/flying.mp3');
	gameover = loadSound('assets/sfx/gameover.mp3');
	hitbug = loadSound('assets/sfx/hitbug.mp3');
	sfxEat = loadSound('assets/sfx/eat.wav');

	font = loadFont('assets/font/FredokaOne.ttf');
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function setup() {
	var canvas;
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.style('z-index', '-1');
	theme = color(216, 236, 255);

	droid = new Droid();
	capcake = new Capcake();
	donut = new Donut();
	gingerbread = new GingerBread();
	oreo = new Oreo();
	bug = new Bugs();
	bg = new Latar();

	for (let i = 0; i < capcake.total; i++) {
		capcakes.push(new Capcake());
	}

	for (let i = 0; i < donut.total; i++) {
		donuts.push(new Donut());
	}

	for (let i = 0; i < gingerbread.total; i++) {
		gingerbreads.push(new GingerBread());
	}

	for (let i = 0; i < oreo.total; i++) {
		oreos.push(new Oreo());
	}

	for (let i = 0; i < bug.total; i++) {
		bugs.push(new Bugs());
	}
}

function draw() {
	if (play) {
		background(theme);
		textFont(font);

		bg.showSun();
		bg.updateSun();
		bg.edgeSun();

		bg.showAwan();
		bg.updateAwan();
		bg.edgeAwan();

		bg.showBg2();
		bg.updateBg2();
		bg.edgeBg2();

		bg.showBg();
		bg.updateBg();
		bg.edgeBg();

		for (let i = 0; i < width; i++) {
			image(base, i, height - base.height, base.width, base.height);
			i += base.height;
		}

		// SELAMA MASIH IDUP, JARAK (DISTANCE) BERTAMAH 8m (meter)
		if (frameCount % 60 == 0) {
			distance += 8;
			// GAS JUGA BERKURANG... :D
			gas--;
		}

		// NGAMBIL CAPCAKE DARI ARRAY
		for (let i = 0; i < capcakes.length; i++) {
			capcakes[i].show();
			capcakes[i].update();
			capcakes[i].edges();

			// CEK APAKAH SI ROBOT IJO MAKAN BISKUIT?
			if (droid.eat(capcakes[i])) {
				sfxEat.play();
				// JIKA MAKAN, HAPUS MAKANANNYA
				capcakes.splice(i, 1);
				// BUAT LAGI MAKANAN BARU DENGAN POSISI ACAK
				capcakes.push(new Capcake());
				if (gas < gasCapacity) {
					gas += Math.round(capcakes[i].r / 20);
				}
			}
		}

		// NGAMBIL DONUT DARI ARRAY
		for (let i = 0; i < donuts.length; i++) {
			donuts[i].show();
			donuts[i].update();
			donuts[i].edges();

			// CEK APAKAH SI ROBOT IJO MAKAN BISKUIT?
			if (droid.eat(donuts[i])) {
				sfxEat.play();
				// JIKA MAKAN, HAPUS MAKANANNYA
				donuts.splice(i, 1);
				// BUAT LAGI MAKANAN BARU DENGAN POSISI ACAK
				donuts.push(new Donut());
				if (gas < gasCapacity) {
					gas += Math.round(donuts[i].r / 20);
				}
			}
		}

		// NGAMBIL GINGERBREAD DARI ARRAY
		for (let i = 0; i < gingerbreads.length; i++) {
			gingerbreads[i].show();
			gingerbreads[i].update();
			gingerbreads[i].edges();

			// CEK APAKAH SI ROBOT IJO MAKAN BISKUIT?
			if (droid.eat(gingerbreads[i])) {
				sfxEat.play();
				// JIKA MAKAN, HAPUS MAKANANNYA
				gingerbreads.splice(i, 1);
				// BUAT LAGI MAKANAN BARU DENGAN POSISI ACAK
				gingerbreads.push(new GingerBread());
				if (gas < gasCapacity) {
					gas += Math.round(gingerbreads[i].r / 10);
				}
			}
		}

		// NGAMBIL OREO DARI ARRAY
		for (let i = 0; i < oreos.length; i++) {
			oreos[i].show();
			oreos[i].update();
			oreos[i].edges();

			// CEK APAKAH SI ROBOT IJO MAKAN BISKUIT?
			if (droid.eat(oreos[i])) {
				sfxEat.play();
				// JIKA MAKAN, HAPUS MAKANANNYA
				oreos.splice(i, 1);
				// BUAT LAGI MAKANAN BARU DENGAN POSISI ACAK
				oreos.push(new Oreo());
				if (gas < gasCapacity) {
					gas += Math.round(oreos[i].r / 10);
				}
			}
		}

		// NGAMBIL BUGS DARI ARRAY
		for (let i = 0; i < bugs.length; i++) {
			bugs[i].show();
			bugs[i].update();
			bugs[i].edges();
			bugs[i].jiggling();

			// CEK APAKAH SI ROBOT IJO MAKAN BISKUIT?
			if (droid.hit(bugs[i])) {
				hitbug.play();
				// JIKA MAKAN, HAPUS MAKANANNYA
				bugs.splice(i, 1);
				// BUAT LAGI MAKANAN BARU DENGAN POSISI ACAK
				bugs.push(new Bugs());
				if (gas < gasCapacity) {
					gas -= 5;
				}
			}
		}

		// AKTOR UTAMA :D
		droid.show();
		droid.update();
		droid.jumping();
		droid.jatohKeTanah();

		// LOGIC KAPASITAS GAS
		// JIKA KAPASITAS < 1 MAKA GAME OVER dan PLAY SOUND EFFECT NYA
		// JIKA GAS SAMA DENGAN KAPASITAS, MAKA GAS PENUH GABOLEH LEBIH 100
		// JIKA GAS LEBIH DARI KAPASITAS (SAAT BERTAMBAH) MAKA KEMBALIKAN KE NILAI KAPASITAS (100)
		if (gas <= 0) {
			play = false;
			gas = gas;
		} else if (gas >= gasCapacity) {
			gas = gasCapacity;
		}

		// KAPASITAS GAS
		// label
		push();
		fill(0, 100);
		stroke(255);
		strokeWeight(5);
		textSize(30);
		textAlign(CENTER);
		text(gas, 30, 40);
		pop();

		// BAR GAS YANG DINAMIS
		push();
		var barColor;
		if (gas < 40) {
			barColor = color(250, 0, 0);
		} else if (gas < 70) {
			barColor = color(250, 250, 0);
		} else {
			barColor = color(0, 250, 0);
		}
		fill(barColor);
		noStroke();
		rect(70, 15, gas * 2, 30, 9);
		pop();

		// BAR GAS STATIS. (FRAME-NYA CEUNAH)
		push();
		noFill();
		stroke(255);
		strokeWeight(3);
		rect(70, 15, 100 * 2, 30, 10);
		pop();

		// DISTANCE DALAM SATUAN m (METER)
		push();
		fill(0, 100);
		stroke(255);
		strokeWeight(5);
		textSize(50);
		textAlign(CENTER);
		text(distance + 'm', width - 100, 50);
		pop();

		// GAME PAUSED
		if (pause) {
			push();
			background(250, 50, 100, 90);
			stroke(255);
			strokeWeight(10);
			fill(250, 70, 150);
			textSize(100);
			textAlign(CENTER);
			text("BENTAR", width / 2, height / 2);
			pop();
		}

	} else {
		gameover.play();
		push();
		background(250, 50, 100, 90);
		fill(250, 70, 150, 100);
		stroke(255);
		strokeWeight(5);
		rectMode(CENTER);
		rect(width / 2, height / 2 - 50, 700, 400, 20);

		stroke(255);
		strokeWeight(10);
		fill(250, 70, 150);
		textSize(100);
		textAlign(CENTER);
		text('GAME OVER', width / 2, height / 2 - 100);

		textSize(50);
		text('Jarak Terbang: ' + distance + 'm', width / 2, height / 2);
		text('-------------------------', width / 2, height / 2 + 50);
		
		fill(100, 70, 255, 200);
		text('TEKAN ENTER 2x', width / 2, height / 2 + 120);
		pop();
		noLoop();
	}
}

function keyPressed() {
	if (key == ' ') {
		if (play) {
			flying.play();
			droid.jump = true;
			gas--;
		}
		if (pause) {
			flying.stop();
		}
	}
	if (keyCode === ESCAPE) {
		pause = true;
		noLoop();
	} else if (keyCode === RETURN) {
		if (!play) {
			droid.reset();
			capcake.reset();
			bug.reset();
			gas = 100;
			distance = 0;
			play = true;
		} else {
			pause = false;
			loop();
		}
	}
}

function keyReleased() {
	droid.jump = false;
}