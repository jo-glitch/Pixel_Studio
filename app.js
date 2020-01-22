
const app = {
    
        ctx : null,
        colors : ['#6DD3CE','#C8E9A0','#F7A278','#A13D63','#351E29'],
        colorSelected : 0,
        drawing: false,
        start: function(){
        this.initCanvas();
        this.drawToolbar();
        this.prepareUserActions();

        console.log('Pixel Studio is ready to rock!')
    },
    initCanvas: function(){
        const canvas = document.createElement('canvas');
		canvas.id= 'dessin';
		canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

		this.ctx = canvas.getContext('2d');
    },
    drawToolbar: function(){
        // toolbar
        this.ctx.fillStyle = '#bbb';
        this.ctx.fillRect(0, 0, window.innerWidth, 50);

        // Couleurs
        
        for(let i = 0; i < this.colors.length; i++){
            this.ctx.fillStyle = this.colors[i];
            this.ctx.beginPath();
            this.ctx.arc(40 + i * 50 , 25 , 20 , 0 , 2*Math.PI);
            this.ctx.fill();
        }
        this.selectColor(this.colorSelected);
    },
    selectColor: function(nb){
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(40 + nb * 50 , 25 , 20 , 0 , 2*Math.PI);
        this.ctx.stroke();
    },
    prepareUserActions: function(){
        document.addEventListener('mousedown', function(event){
            if(event.clientY < 50){
                const n = Math.round((event.clientX - 40) / 50);
                if(n >= app.colors.length) return;
                app.colorSelected = n;
                app.drawToolbar();
            }
            app.drawing = true;
            
        });
        document.addEventListener('mouseup', function(event){
            app.drawing = false;
        });
        document.addEventListener('mousemove', function(event){
            if(app.drawing == true && event.clientY > 60){
                app.ctx.fillStyle = app.colors[app.colorSelected];
                app.ctx.beginPath();
                app.ctx.arc(event.clientX,event.clientY,25,20,0,2*Math.PI);
                app.ctx.fill();
            }
        });
    }
};

