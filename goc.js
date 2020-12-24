
//create by GOC_OF_CODING
//dont steal :-)

//alert(window.innerHeight); //546, 457

window.goc = (function () {
    var totalPreloades = 0;
    var randomShit = true;
    var progressLoaded = 0;
    var timeTonHelperTrueVariable = true;
    var assetsLoadedTrue = false, jLift = false;
    var some = {};
    var testArray = [];
    
    function GOC_PRELOADER(array, type, noOfImages) {
        if (noOfImages == undefined) {
            noOfImages = array.length;
        }
        this.loadedImages = 0;
        this.loaded = [];
        this.temperoryArray = [];
        if (type[0] == "seperate" || type[0] == "s" || type[0] == "different" || type[0] == "diff") {
            for (let i = 0; i < array.length; i++) {
                this.loadedImages++;
                for (let j = 0; j < (noOfImages); j++) {
                    this.temperoryArray[j] = new Image();
                    this.temperoryArray[j].src = array[i] + "_" + j + "." + type[1];
                    if (j > (noOfImages - 2)) {
                        this.loaded.push(this.temperoryArray);
                        this.temperoryArray = [];
                    }
                }
                if (this.loadedImages == array.length) {
                    progressLoaded++;
                }
            }
        } else if (type[0] == "combined" || type[0] == "single" || type[0] == "c") {
            for (let i = 0; i < array.length; i++) {
                this.loadedImages++;
                this.temperoryArray[i] = new Image();
                this.temperoryArray[i].src = array[i];
                if (i > (array.length - 2)) {
                    this.loaded = this.temperoryArray;
                    this.temperoryArray = [];
                }
                if (this.loadedImages == array.length) {
                    progressLoaded++;
                }
            }
        }
        
        testArray = this.loaded;

        return this.loaded;
    }
    class Preloader{
        constructor(src){
            this.src = src;
            this.loadedA = 0;
            this.finalArray = [];
            var p = new Promise((res, rej)=>{
                this.src.forEach(sr=>{
                    let a = new Image();
                    a.src = sr;
                    a.onload =()=>{
                        this.loadedA++;
                        this.finalArray.push(a);
                        if(this.loadedA == (this.src.length - 1)){
                            res(this.finalArray);
                        }
                    }
                });
            });
            goc.promises.push(p);
            return p;
        }
    }

class PreloaderMultiple{
    constructor(src, type){
        this.src = src;
        this.type = type;
        this.loadedArray = [];
        this.testArray = [];
        this.noOfLoaded = 0;
        var bj = new Promise((res, rej)=>{
            for(let i = 0; i < this.src.length; i++){
                for(let j = 0; j < this.type[i]; j++){
                    this.loadedArray[i] = new Image();
                    this.loadedArray[i].src = this.src[i] + "_" + j + "." + this.type[1];
                    this.loadedArray[i].onload = () =>{
                        this.testArray.push(this.loadedArray[i]);
                        this.noOfLoaded++;
                        if(this.noOfLoaded == this.type[0]){
                            res(this.testArray);
                            this.testArray = [];
                        }
                    }
                }
            }
        });
        goc.promises.push(bj);
        return bj;
    }
}
    
    function GOC_SPRITE_ANIMATOR(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.i = 0;
        this.imagesStack = [];
        this.setOptions = function (options) {
            this.options = options || {
                imageCount: 10
                , flip: false
                , speed: 5
            };
        }
    }
    
    function GOC_SPRITE_ANIMATOR2(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.setOptions = function (options) {
            this.options = options || {};
        }
        this.currentFrame = 0;
    }
    
    
    GOC_SPRITE_ANIMATOR.prototype.src = function (src) {
        for (var i = 0; i < (this.options.imageCount); i++) {
            this.imagesStack[i] = src[i];
        }
    }
    GOC_SPRITE_ANIMATOR.prototype.draw = function (ctx, elapsed, options) {
        this.setOptions(options);
        this.i += 10 * (elapsed / (this.options.speed * 100));
        if (this.i > (this.options.imageCount - 1)) {
            this.i = 0;
        }
        ctx.save();
        if (this.options.flip && this.imagesStack[Math.ceil(this.i)] != undefined) {
            ctx.translate(this.x + this.height, this.y);
            ctx.scale(-1, 1);
            ctx.drawImage(this.imagesStack[Math.ceil(this.i)], 0, 0, options.imageWidth, options.imageHeight, 0, 0, options.width || this.width, options.height || this.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
            if(this.imagesStack[Math.ceil(this.i)] != undefined){
                ctx.translate(this.x, this.y);
                ctx.drawImage(this.imagesStack[Math.ceil(this.i)], 0, 0, options.imageWidth, options.imageHeight, 0, 0, options.width || this.width, options.height || this.height);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
        ctx.restore();
    }
    GOC_SPRITE_ANIMATOR2.prototype.updateFrame = function (elapsed) {
        this.currentFrame += (this.options.cols - 1) * (elapsed / (this.options.speed * 100 || 500));
        if (this.currentFrame > (this.options.cols - 1)) {
            this.currentFrame = 0;
        }
        //this.currentFrame = ++this.currentFrame % this.options.cols;
        this.srcX = Math.ceil(this.currentFrame) * this.widthI;
        this.srcY = this.options.pose * (this.heightI + (this.options.fix || 0)) || 0;
    }
    GOC_SPRITE_ANIMATOR2.prototype.draw = function (ctx, elapsed, options) {
        this.setOptions(options);
        this.widthI = this.options.imageWidth / this.options.cols;
        this.heightI = this.options.imageHeight / this.options.rows;
        this.updateFrame(elapsed);
        ctx.drawImage(this.options.image, this.srcX, this.srcY, this.widthI, this.heightI, this.x, this.y, this.width, this.height);
    }

    class Vector2{
        constructor(x, y){
            this.x = x || 0;
            this.y = y || 0;
        }
        magnitude(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        squaredMagnitude(){
            return this.x * this.x + this.y * this.y;
        }
        equal(vector){
            if(this.x == vector.x && this.y == vector.y) return true 
            else return false;
        }
        addVector(vector){
            return new Vector2(this.x + vector.x, this.y + vector.y);
        }
        addVectorToThis(vector){
            this.x += vector.x;
            this.y += vector.y;
        }
        addMagnitude(vector){
            let aMagnitude = Math.sqrt(this.x * this.x + this.y * this.y);
            let bMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            return Math.sqrt(aMagnitude * aMagnitude + bMagnitude * bMagnitude + 2 * aMagnitude * bMagnitude * Math.cos(this.angle(vector)));
        }
        invert(){
            new Vector2(-this.x, -this.y);
        }
        invertThis(){
            this.x = -this.x;
            this.y = -this.y;
        }
        reduce(dt){
            this.x *= dt;
            this.y *= dt;
        }
        subtractMagnitude(vector){
            let invertedVector = vector.invert();
            return this.addMagnitude(invertedVector);
        }
        subtractVector(vector){
            return new Vector2(this.x - vector.x, this.y - vector.y);
        }
        subtractVectorToThis(vector){
            this.x - vector.x;
            this.y - vector.y;
        }
        dotProductMagnitude(vector){
            return this.magnitude() * vector.magnitude() * Math.cos(this.angle(vector));
        }
        dotProduct(vector){
            return this.x * vector.x + this.y * vector.y;
        }
        crossProduct(vector){
            console.log("Note cross product not possible in 2D plane");
            return this.magnitude() * vector.magnitude() * Math.sin(this.angle(vector));
        }
        angle(vector){
            let ro = this.dotProduct(vector) / (this.magnitude() * vector.magnitude());
            return Math.acos(ro);
        }
        normalize(){
            return new Vector2(this.x / this.magnitude(), this.y / this.magnitude());
        }
    }    

    class Pendulum{
        constructor(origin, length, radius, options){
            this.origin = origin || new Vector2(window.innerWidth / 2, 0);
            this.length = length || 150;
            this.radius = radius || 30;
            this.options = options || {};
            this.velocity = 0;
            this.angle = this.options.startAngle || Math.PI / 4;
            this.acceleration = 0;
            this.dampling = this.options.dampling || 0.995;
        }
        swing(dt, c){
            this.update(dt);
            this.draw(c);
        }
        update(dt){
            this.gravity = 9.81;
            this.acceleration = -1 * this.gravity * Math.sin(this.angle) * dt;
            this.velocity += this.acceleration;
            this.velocity *= this.dampling;
            this.position = new Vector2(
                this.length * Math.sin(this.angle),
                this.length * Math.cos(this.angle)
            );
            this.position.addVectorToThis(this.origin);
            this.angle += this.velocity;
        }
        draw(c){
            c.beginPath();
            c.moveTo(this.origin.x, this.origin.y);
            c.lineTo(this.position.x, this.position.y);
            c.stroke();
            c.closePath();
            c.beginPath();
            c.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            c.fill();
            c.closePath();
        }
    }
    
    /*********************
     * JOY STICK
     **********************/
    function JoyStick(radius, innerRadius, options, outerX, outerY, innerX, innerY) {
        this.radius = radius;
        options = options || {};
        this.innerRadius = innerRadius;
        this.outerX = outerX;
        this.outerY = outerY;
        this.innerX = innerX;
        this.innerY = innerY;
        this.draw = (ctx) => {
            if(options.outerImage == undefined){
                ctx.beginPath();
                ctx.fillStyle = options.outerFillStyle || 'rgb(255,165,0)';
                ctx.strokeStyle = 'black';
                ctx.arc(this.outerX, this.outerY, this.radius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = options.innerFillStyle || 'red';
                ctx.strokeStyle = 'black';
                ctx.arc(this.innerX, this.innerY, this.innerRadius, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
            }else{
                ctx.drawImage(options.outerImage, this.outerX - (options.outerWidth / 2 || options.outerImage.height/2), this.outerY - (options.outerHeight / 2 || options.outerImage.width/2), options.outerWidth || options.outerImage.width, options.outerHeight || options.outerImage.height);
                ctx.drawImage(options.innerImage, this.innerX - (options.innerHeight / 2 ||options.innerImage.width/2), this.innerY - (options.innerHeight / 2 || options.innerImage.height/2), options.innerWidth || options.innerImage.width, options.innerHeight || options.innerImage.height);
            }
        }
    }
    
    function Vfp(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.update = () => {
            this.x = this.x2 - this.x1;
            this.y = this.y2 - this.y1;
        }
    }
    
    function Box(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.draw = (ctx) => {
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    var ended = false;
    var posX, posY, startX, startY, endX, endY, shootX, shootY, shootStartX, shootStartY;
    var shootEnded = false, shootMove = false, shootStart = false;
    var angle , fireAngle, move = false
        , startA = false;
    var dirX;
    var dirY;
    var dirFireX, dirFireY;
    var joyStick;
    var fireStick;
    var jUp = false, jDown = false, jLeft = false, jRight = false;
    var xAxis = new Vfp();
    var fxAxis = new Vfp();
    var fingerVector = new Vfp();
    var ffingerVector = new Vfp();
    
    function dotProduct(x1, y1, x2, y2) {
        return (x1 * x2) + (y1 * y2);
    }

    function  distance(x1, y1, x2, y2){
        return Math.sqrt( (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) );
    }
    
    function magnitude(x, y) {
        return Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2)));
    }
    
    function handleMove(e) {
        if(e.touches.length == 1){
            ended = false;
            move = true;
            startA = false;
            jLift = false;
            //display.innerHTML = 'X;- ' + posX + ' Y;- ' + posY;
        }
        if(e.touches.length == 2){
            shootEnded = false;
            shootMove = true;
            shootStart = false;
            shootX = Math.floor(e.touches[1].clientX);
            shootY = Math.floor(e.touches[1].clientY);
        }
        e.preventDefault();
        posX = Math.floor(e.touches[0].clientX);
        posY = Math.floor(e.touches[0].clientY);
    }
    
    var totalFingers;
    
    function handleStart(e) {
        totalFingers = e.touches.length;
        if(e.touches.length == 1){
            ended = false;
            move = false;
            startA = true;
            e.preventDefault();
            startX = Math.floor(e.touches[0].clientX);
            startY = Math.floor(e.touches[0].clientY);
            if(startY < ctx.canvas.height/2){
                jLift = false;
            }
            //start.innerHTML = 'Sx:- ' + startX + ' Sy:- ' + startY;
        }
        if(e.touches.length == 2){
            shootEnded = false;
            shootStart = true;
            shootMove = false;
            shootStartX = Math.floor(e.touches[1].clientX);
            shootStartY = Math.floor(e.touches[1].clientY);
        }
    }
    
    function handleEnd(e) {
        endY = Math.floor(e.changedTouches[event.changedTouches.length - 1].pageY);
        if(endY < ctx.canvas.height/2){
            ended = true;
            move = false;
            startA = false;
            jLift = true;
            
        }
            e.preventDefault();
            endX = Math.floor(e.changedTouches[event.changedTouches.length - 1].pageX);
            
            //end.innerHTML = 'eX:- ' + endX + ' eY:- '+ endY;

        if(e.touches.length == 1){
            shootEnded = true;
            shootMove = false;
            shootStart = false;
        }
    }
    
    function update(elapsed, player, def) {
            if (startA) {
                joyStick.outerX = startX;
                joyStick.outerY = startY;
                joyStick.innerX = startX;
                joyStick.innerY = startY;
            }
            if (move) {
                joyStick.innerX = posX;
                joyStick.innerY = posY;
            } 
            if (ended) {
                joyStick.innerX = startX;
                joyStick.innerY = startY;
            }
        
        xAxis.x1 = joyStick.outerX;
        xAxis.y1 = joyStick.outerY;
        xAxis.x2 = joyStick.outerX + joyStick.radius;
        xAxis.y2 = joyStick.outerY;
        fingerVector.x1 = joyStick.outerX;
        fingerVector.y1 = joyStick.outerY;
        fingerVector.x2 = joyStick.innerX;
        fingerVector.y2 = joyStick.innerY;
        fingerVector.update();
        xAxis.update();
        angle = Math.acos((dotProduct(xAxis.x, xAxis.y, fingerVector.x, fingerVector.y)) / (magnitude(xAxis.x, xAxis.y) * (magnitude(fingerVector.x, fingerVector.y))));
        
        if(joyStick.innerY > joyStick.outerY){
            if(distance(joyStick.innerX, joyStick.innerY, joyStick.outerX, joyStick.outerY) > joyStick.radius){
                joyStick.innerX = joyStick.outerX + Math.cos(angle) * joyStick.radius;
                joyStick.innerY = joyStick.outerY + Math.sin(angle) * joyStick.radius;
            }
        }else{
            if(distance(joyStick.innerX, joyStick.innerY, joyStick.outerX, joyStick.outerY) > joyStick.radius){
                joyStick.innerX = joyStick.outerX + Math.cos(-angle) * joyStick.radius;
                joyStick.innerY = joyStick.outerY + Math.sin(-angle) * joyStick.radius;
            }  
        }
        if(goc.def){
            dirX = Math.abs(Math.cos(angle)) * magnitude(fingerVector.x, fingerVector.y) / goc.joyStickPower / 50;
            dirY = Math.abs(Math.sin(angle)) * magnitude(fingerVector.x, fingerVector.y) / goc.joyStickPower / 50;
        }else{
            dirX = Math.abs(Math.cos(angle)) * goc.joyStickPower;
            dirY = Math.abs(Math.sin(angle)) * goc.joyStickPower;
        }
        if (isNaN(dirX)) {
            if (isNaN(dirY)) {
                dirX = 0;
                dirY = 0;
            }
        }
        if (ended == true) {
            dirX = 0;
            dirY = 0;
            joyStick.innerX = joyStick.outerX;
            joyStick.innerY = joyStick.outerY;
        }
        
        if (fingerVector.y2 < xAxis.y2 && (startX - fingerVector.x2) < 0) {
            player.x += dirX;
            player.y -= dirY;
            if(dirX > dirY){
                jRight = true;
                jLeft = false;
                jUp = false;
                jDown = false;
            }else{
                jUp = true;
                jLeft = false;
                jRight = false;
                jDown = false;
            }
        }
        if (fingerVector.y2 > xAxis.y2 && (startX - fingerVector.x2) < 0) {
            player.x += dirX;
            player.y += dirY;
            if(dirX > dirY){
                jRight = true;
                jLeft = false;
                jUp = false;
                jDown = false;
            }else{
                jUp = false;
                jLeft = false;
                jRight = false;
                jDown = true;
            }
        }
        if (fingerVector.y2 < xAxis.y2 && (startX - fingerVector.x2) > 0) {
            player.x -= dirX;
            player.y -= dirY;
            if(dirX > dirY){
                jRight = false;
                jLeft = true;
                jUp = false;
                jDown = false;
            }else{
                jUp = true;
                jLeft = false;
                jRight = false;
                jDown = false;
            }
        }
        if (fingerVector.y2 > xAxis.y2 && (startX - fingerVector.x2) > 0) {
            player.x -= dirX;
            player.y += dirY;
            if(dirX > dirY){
                jRight = false;
                jLeft = true;
                jUp = false;
                jDown = false;
            }else{
                jUp = false;
                jLeft = false;
                jRight = false;
                jDown = true;
            }
        }
        
    }
    
    function draw(ctx) {
        joyStick.draw(ctx);
    }
    
    
    
    
    /********************
     * JOY STICK
     ****************/
    function updateFireStick(elapsed, player, def) {
        if (shootStart) {
            fireStick.outerX = shootStartX;
            fireStick.outerY = shootStartY;
            fireStick.innerX = shootStartX;
            fireStick.innerY = shootStartY;
        }
        if (shootMove) {
            fireStick.innerX = shootX;
            fireStick.innerY = shootY;
        }

        if (shootEnded) {
            fireStick.innerX = shootStartX;
            fireStick.innerY = shootStartY;
        }
        
        fxAxis.x1 = fireStick.outerX;
        fxAxis.y1 = fireStick.outerY;
        fxAxis.x2 = fireStick.outerX + fireStick.radius;
        fxAxis.y2 = fireStick.outerY;
        ffingerVector.x1 = fireStick.outerX;
        ffingerVector.y1 = fireStick.outerY;
        ffingerVector.x2 = fireStick.innerX;
        ffingerVector.y2 = fireStick.innerY;
        ffingerVector.update();
        fxAxis.update();
        fireAngle = Math.acos((dotProduct(fxAxis.x, fxAxis.y, ffingerVector.x, ffingerVector.y)) / (magnitude(fxAxis.x, fxAxis.y) * (magnitude(ffingerVector.x, ffingerVector.y))));
        
        if(fireStick.innerY > fireStick.outerY){
            if(distance(fireStick.innerX, fireStick.innerY, fireStick.outerX, fireStick.outerY) > fireStick.radius){
                fireStick.innerX = fireStick.outerX + Math.cos(fireAngle) * fireStick.radius;
                fireStick.innerY = fireStick.outerY + Math.sin(fireAngle) * fireStick.radius;
            }
        }else{
            if(distance(fireStick.innerX, fireStick.innerY, fireStick.outerX, fireStick.outerY) > fireStick.radius){
                fireStick.innerX = fireStick.outerX + Math.cos(-fireAngle) * fireStick.radius;
                fireStick.innerY = fireStick.outerY + Math.sin(-fireAngle) * fireStick.radius;
            }  
        }
        if(goc.fdef){
            dirFireX = Math.abs(Math.cos(fireAngle)) * magnitude(ffingerVector.x, ffingerVector.y) / goc.fireStickPower / 50;
            dirFireY = Math.abs(Math.sin(fireAngle)) * magnitude(ffingerVector.x, ffingerVector.y) / goc.fireStickPower / 50;
        }else{
            dirFireX = Math.abs(Math.cos(fireAngle)) * goc.fireStickPower;
            dirFireY = Math.abs(Math.sin(fireAngle)) * goc.fireStickPower;
        }
        if (isNaN(dirFireX)) {
            if (isNaN(dirFireY)) {
                dirFireX = 0;
                dirFireY = 0;
            }
        }
        if (shootEnded == true) {
            dirFireX = 0;
            dirFireY = 0;
            fireStick.innerX = fireStick.outerX;
            fireStick.innerY = fireStick.outerY;
        }
        
        if (ffingerVector.y2 < fxAxis.y2 && (shootStartX - ffingerVector.x2) < 0) {
            player.x += dirFireX;
            player.y -= dirFireY;
        }
        if (ffingerVector.y2 > fxAxis.y2 && (shootStartX - ffingerVector.x2) < 0) {
            player.x += dirFireX;
            player.y += dirFireY;
        }
        if (ffingerVector.y2 < fxAxis.y2 && (shootStartX - ffingerVector.x2) > 0) {
            player.x -= dirFireX;
            player.y -= dirFireY;
        }
        if (ffingerVector.y2 > fxAxis.y2 && (shootStartX - ffingerVector.x2) > 0) {
            player.x -= dirFireX;
            player.y += dirFireY;
        }
        
    }
    
    function drawFireStick(ctx) {
        fireStick.draw(ctx);
    }



    /*****************
     * FIRE STICK END
     * ********************** */

    /*************
     *  BUTTON
     * ********* */

    var cX, cY;

    class Button{
        constructor(x, y, width, height, src){
            this.x = x;
            this.y = y;
            this.src = src;
            this.width = width;
            this.touch = false;
            this.height = height;
            this.makeTouch = false;
            if(this.src){
                this.image = new Image();
                this.image.src = this.src;
            }
        }
        draw(c){
            if(this.src){
                c.drawImage(this.image, this.x, this.y, this.width, this.height);
            }else{
                c.beginPath();
                c.fillRect(this.x, this.y, this.width, this.height);
            }

        }
        touched(c, time){
            this.time = time || 0;
            this.canvas = c;
            c.addEventListener("touchstart", (e)=>{
            e.preventDefault();
            for(let i = 0; i < e.touches.length; i++){
                let x = e.touches[i].clientX;
                let y = e.touches[i].clientY;
                if(x > this.x && y > this.y && x < this.x + this.width && y < this.y + this.height){
                    if(this.touch == false && this.makeTouch == false){
                        this.touch = true; 
                    }
                }
            }
            
            c.addEventListener("touchend", (e)=>{
                let x = Math.floor(e.changedTouches[event.changedTouches.length - 1].pageX);
                let y = Math.floor(e.changedTouches[event.changedTouches.length - 1].pageY);
                if(this.makeTouch == false){
                    this.makeTouch = true; 
                    this.endedTime = Date.now();
                }
            });

            });
        }
        handle(e){
            cX = e.touches[0].clientX;
            cY = e.touches[0].clientY;
        }
        customize(){
            this.canvas.addEventListener("touchstart", this.handle)
            goc.createJoystick(this, {
                def : false,
                power : 3
            });
            this.custom = true;
        }
        doneCustom(){
            goc.removeJoystick();
            this.custom = false;
        }
        update(c){
            if(this.custom){
                c.strokeRect(c.canvas.width / 2, 10, 80, 20);
                c.font = "20px Verdana";
                var gradient = c.createLinearGradient(0, 0, c.canvas.width, 0);
                gradient.addColorStop("0"," magenta");
                gradient.addColorStop("0.5", "blue");
                gradient.addColorStop("1.0", "red");
                c.fillStyle = gradient;
                c.fillText("Done", c.canvas.width / 2 + 18, 28);
                if(cX > c.canvas.width / 2 && cY > 10 && cX < c.canvas.width/2 + 80 && cY < 40){
                    this.doneCustom();
                    c.canvas.removeEventListener("touchstart",this.handle);
                    cX = 0;
                    cY = 0;
                 }
            }
            if(this.makeTouch){
                let now = Date.now();
                if(now - this.endedTime > this.time){
                    this.makeTouch = false;
                    this.touch = false;
                }
            }
        }
    }



      /*************
     *  BUTTON END 
     * ********* */   

    //HealthBar
    class HealthBar{
        constructor(x, y, width, height, health){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.health = health;
            this.healthLevel = health;
            this.oneTime = 0;
        }
        draw(c){
            //outerBar
            c.beginPath();
            c.fillStyle = "white";
            c.strokeStyle = "black";
            c.fillRect(this.x, this.y, this.width, this.height);
            c.strokeRect(this.x, this.y, this.width, this.height);
            c.closePath();
            //innerBar
            c.beginPath();
            c.fillStyle = "green";
            c.strokeStyle = "black";
            c.fillRect(this.x, this.y, (this.width *  this.healthLevel) / this.health , this.height);
            c.closePath();
        }
        restart(health){
            if(this.healthLevel < ( health || 0)){
                this.healthLevel = this.health;
            }
        }
        restore(){
            this.healthLevel = this.health;
        }
        decrease(level){
            this.healthLevel -= level;
        }
        decreaseAnim(level, e, time){
            time = time || 2000;
            randomShit = goc.singleTon(randomShit, ()=>{ window.timeChecker = Date.now() });
            let nowRJH = Date.now();
            if((nowRJH - timeChecker) < time){
                this.healthLevel -= level * (e / time);
            }
        }
    }

    //Health Bar End

    /*************ALL-PRELOADER*************/

    function allPromisesLoaded(names){
        let weirdPromise = new Promise((res, rej)=>{
        Promise.all(goc.promises).then(data => {
                let obj = {};
                for(let i = 0; i < data.length; i++){
                    obj[names[i]] = data[i];
                    if(i == (data.length - 1)){
                        res(obj);
                        goc.loadingFinish = true;
                    }
                }
            });
        });
        return weirdPromise;
    }

    /****SINGLETON*****/

    
    function single(a, cb){
        if(a){
            cb();
            a = false;
        }
        return a;
    }

    function timeBased(currentTime, time, cb){
        let now = Date.now();
        if((now - currentTime) < time){
            cb();
        }
    }
        
    var someRandomShit;
    var joystickActive = false;
    var fireStickActive = false;
    var then = Date.now();
    var now = 0;
    var elapsed = 0;
    var ctx, count = 0;
    var goc = {
        promises : []
        ,loadingFinish : false
        ,createCanvas: function (width, height, id) {
            let canvas = document.createElement("canvas");
            canvas.style.border = "2px solid black";
            canvas.id = id || "canvas";
            canvas.width = width;
            canvas.height = height;
            document.body.appendChild(canvas);
            ctx = canvas.getContext("2d");
            return canvas;
        }
        , preload: function (array, type, noOfImages) {
            if (typeof (array) == "object" && array.length > 0) {
                return new GOC_PRELOADER(array, type, noOfImages);
            }
        }
        , update: function (update) {
            goc.update = update;
        }
        , draw: function (draw) {
            goc.draw = draw;
        }
        , empty: function () {
            
        }
        , start: function (oneTime) {
            now = Date.now();
            elapsed = now - then;
            count++;
            if (count < 2) {
                oneTime = oneTime || goc.empty;
                oneTime();
            }
            goc.update(elapsed, ctx);
            goc.draw(ctx, elapsed);
            if (joystickActive) {
                update(elapsed, goc.player, goc.def);
                draw(ctx);
            }
            if (fireStickActive) {
                updateFireStick(elapsed, goc.firePlayer, goc.fdef);
                drawFireStick(ctx);
            }
            goc.dirX = dirX;
            goc.dirY = dirY;
            then = now;
            someRandomShit = requestAnimationFrame(goc.start);
        }
        , stop: function () {
            cancelAnimationFrame(someRandomShit);
        }
        , seperateSprite: function (x, y, width, height, options) {
            return new GOC_SPRITE_ANIMATOR(x, y, width, height, options);
        }
        , combinedSprite: function (x, y, width, height, options) {
            return new GOC_SPRITE_ANIMATOR2(x, y, width, height, options);
        },
        d : false
        , createJoystick: function (obj, opt) {
            opt = opt || {};
            goc.def = opt.def;

            joystickActive = true;

            joyStick = new JoyStick(opt.outerRadius || 30, opt.innerRadius || 10, {
                innerFillStyle: opt.innerFillStyle
                , outerFillStyle: opt.outerFillStyle,
                outerImage : opt.outerImage,
                innerImage : opt.innerImage,
                outerWidth : opt.outerWidth,
                outerHeight : opt.outerHeight,
                innerWidth : opt.innerWidth,
                innerHeight : opt.innerHeight

            });
            goc.player = obj;
            goc.joyStickPower = opt.power || 2;

            canvas.addEventListener('touchmove', handleMove, {
                passive: false
            });
            canvas.addEventListener('touchstart', handleStart, {
                passive: false
            });
        
            canvas.addEventListener('touchend', handleEnd, {
                passive: false
            });
        }
        , removeJoystick: function () {
            joystickActive = false;
            canvas.removeEventListener('touchmove', handleMove, {
                passive: false
            });
            canvas.removeEventListener('touchstart', handleStart, {
                passive: false
            });
        
            canvas.removeEventListener('touchend', handleEnd, {
                passive: false
            });
        }
        , box: function (x, y) {
            return new Box(x, y);
        }
        , pendulum : function(origin, length, radius, options){
            return new Pendulum(origin, length, radius, options);
        }
        ,vector2 : function(x, y){
            return new Vector2(x, y);
        }
        ,jUp(cb){
            if(jUp){
                cb();
                this.jR = false;
                this.jL = false;
                this.jU = true;
                this.jD = false;
            }else{
                this.jU = false;
            }
        }
        ,jDown(cb){
            if(jDown){
                cb();
                this.jR = false;
                this.jL = false;
                this.jU = false;
                this.jD = true;
            }else{
                this.jD = false;
            }
        }
        ,jLeft(cb){
            if(jLeft){
                cb();
                this.jR = false;
                this.jL = true;
                this.jU = false;
                this.jD = false;
            }else{
                this.jL = false;
            }
        }
        ,jRight(cb){
            if(jRight){
                cb();
                this.jR = true;
                this.jL = false;
                this.jU = false;
                this.jD = false;
            }else{
                this.jR = false;
            }
        }
        ,jLift(cb){
            if(jLift){
                cb();
                this.jLif = true;
                this.jR = false;
                this.jL = false;
                this.jU = false;
                this.jD = false;
            }else{
                this.jLif = false;
            }
        }
        ,basic : function(){
            document.write("goc.createCanvas(500, 500); " + "<br>" + "goc.update((e, c)=>{});" + "<br>" + "goc.draw((c, e)=>{}); <br> goc.start();");
        }
        ,sprite : function(){
            document.write("<br> var image = goc.preload(['src'], ['c', 'png']) <br> var options = { <br> image : ,<br> imageWidth : ,<br> imageHeight : ,<br> cols : , <br> rows : , <br> //speed : , <br> } <br> var char = goc.combinedSprite(100, 100, 80, 100, options); <br> char.setOptions(options) <br> char.draw(c, e, options)");
        },
        js : function(){
            document.write("var b = goc.box(10, 10) <br> goc.createJoystick(b)");
        }
        , createFirestick: function (obj, opt) {
            opt = opt || {};
            goc.fdef = opt.def;

            fireStickActive = true;

            fireStick = new JoyStick(opt.outerRadius || 30, opt.innerRadius || 10, {
                innerFillStyle: opt.innerFillStyle
                , outerFillStyle: opt.outerFillStyle,
                outerImage : opt.outerImage,
                innerImage : opt.innerImage,
                outerWidth : opt.outerWidth,
                outerHeight : opt.outerHeight,
                innerWidth : opt.innerWidth,
                innerHeight : opt.innerHeight

            });
            goc.firePlayer = obj;
            goc.fireStickPower = opt.power || 2;

            canvas.addEventListener('touchmove', handleMove, {
                passive: false
            });
            canvas.addEventListener('touchstart', handleStart, {
                passive: false
            });
        
            canvas.addEventListener('touchend', handleEnd, {
                passive: false
            });
        }
        , removeFirestick: function () {
            fireStickActive = false;
            canvas.removeEventListener('touchmove', handleMove, {
                passive: false
            });
            canvas.removeEventListener('touchstart', handleStart, {
                passive: false
            });
        
            canvas.removeEventListener('touchend', handleEnd, {
                passive: false
            });
        }
        ,button : function(x, y, width, height, src){
            return new Button(x, y, width, height, src);
        }
        ,healthBar : function(x, y, width, height, health){
            return new HealthBar(x, y, width, height, health);
        }
        ,singleTon : function(a, cb){
            return single(a, cb);
        }
        ,timeTon : function(time, cb){
            timeTonHelperTrueVariable = goc.singleTon(timeTonHelperTrueVariable, ()=>{ window.ct = Date.now() });
            return timeBased(ct, time, cb);
        }
        ,preloadTon : function(src){
            return new Preloader(src);
        }
        ,preloadMultiple : function(src, type){
            return new PreloaderMultiple(src, type);
        }
        ,allAssetsLoaded : function(names){
            return allPromisesLoaded(names);
        }
    }
    return goc;
}());
