import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})

export class MLComponent implements OnInit, AfterViewInit{

  @ViewChild("canvas", { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;
  private image!: HTMLImageElement;

  ngOnInit() {
  }

  ngAfterViewInit(){
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext("2d")

    this.image = new Image(350, 350);
    this.image.src = "../../../../../assets/pes.jpg";
    this.image.onload = () => {
      canvas.width = this.image.width;
      canvas.height = this.image.height;
      if(this.ctx){
        this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
      }
    };
  }

  drawLine(xImg1: number, yImg1: number, xImg2: number, yImg2: number) {
    if (!this.ctx) return;
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    const scaleX = this.canvasRef.nativeElement.width / this.image.width;
    const scaleY = this.canvasRef.nativeElement.height / this.image.height;
    const x1 = xImg1 * scaleX;
    const y1 = yImg1 * scaleY;
    const x2 = xImg2 * scaleX;
    const y2 = yImg2 * scaleY;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  calculateAngle(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
    const vector1 = [x2 - x1, y2 - y1];
    const vector2 = [x4 - x3, y4 - y3];
    const prodInter = vector2[0] * vector1[0] + vector2[1] * vector1[1];
    const magnitude1 = Math.sqrt(vector1[0] * vector1[0] + vector1[1] * vector1[1]);
    const magnitude2 = Math.sqrt(vector2[0] * vector2[0] + vector2[1] * vector2[1]);
    const angleInRadians = Math.acos(prodInter / (magnitude1 * magnitude2));
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    const angleElement = document.getElementById("angle");
    if (angleElement) {
      angleElement.textContent = angleInDegrees.toFixed(2) + " graus";
    }
  }

  private lastClick: [number, number] | null = null;
  private firstLine: [number, number, number, number] | null = null;

  handleClick(event: MouseEvent) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!this.lastClick) {
      this.lastClick = [x, y];
    } else {
      this.drawLine(...this.lastClick, x, y);
      if (!this.firstLine) {
        this.firstLine = [...this.lastClick, x, y];
      } else {
        this.calculateAngle(...this.firstLine, ...this.lastClick, x, y);
        this.firstLine = null;
      }
      this.lastClick = null;
    }
  }
}