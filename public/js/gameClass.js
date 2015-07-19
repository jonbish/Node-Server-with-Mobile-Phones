function player(id){
  this.id            = id;
  this.smoothingLR   = new Array();
  this.smoothingFB   = new Array();
  this.smoothedLR    = 0;
  this.smoothedFB    = 0;

  this.colors = ['#FF0000','#FFFF00','#FF00FF','#00FF00','#00FFFF','#0000FF'];
  this.states = ['circle','square'];
  
  this.x = CANVAS_WIDTH/2;
  this.y = CANVAS_HEIGHT/2;
  this.width = 100;
  this.height = 100;
  this.color = this.colors[Math.floor(Math.random()*this.colors.length)];
  this.state = this.states[Math.floor(Math.random()*this.states.length)];

  this.draw = function(num) {
    canvas.save();

    if(this.state='square'){
      canvas.fillStyle=this.color;
      canvas.fillRect(this.x,this.y,this.width,this.height);
    } else {
      canvas.beginPath();
      canvas.arc(this.x, this.y, this.width, 0, 2 * Math.PI, false);
      canvas.fillStyle = this.color;
      canvas.fill();
    }

    canvas.restore();
  }

  this.update = function(){
    //Stay within Bounds
    if(this.x < 0){
      this.x = 0;
    }else if(this.x > CANVAS_WIDTH-this.width){
      this.x = CANVAS_WIDTH-this.width;
    }

    if(this.y < 0){
      this.y = 0;
    }else if(this.y > CANVAS_HEIGHT-this.height){
      this.y = CANVAS_HEIGHT-this.height;
    }
  }
}
