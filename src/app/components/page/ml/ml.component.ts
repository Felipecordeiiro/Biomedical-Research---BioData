import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ml',
  templateUrl: './ml.component.html',
  styleUrls: ['./ml.component.css']
})

export class MLComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  selectedFileName = 'Demo image loaded: pes.jpg';
  angleResult: number | null = null;
  selectedMethod: 'processing' | 'ml' | 'manual' = 'manual';
  statusMessage = 'Manual demo mode active. Click two points to draw the first strategic line.';

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private lastClick: [number, number] | null = null;
  private firstLine: [number, number, number, number] | null = null;
  private image = new Image(600, 300);
  private objectUrl: string | null = null;
  private imageLoaded = false;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    const context = this.canvas.getContext('2d');

    if (!context) {
      return;
    }

    this.ctx = context;

    this.image.onload = () => {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
      this.imageLoaded = true;
      this.drawImage();
    };

    this.image.src = "assets/pes.jpg";
  }

  selectMethod(method: 'processing' | 'ml' | 'manual'): void {
    this.selectedMethod = method;
    this.lastClick = null;
    this.firstLine = null;
    this.angleResult = null;
    this.drawImage();

    if (method === 'processing') {
      this.statusMessage = 'Processing image mode selected. Use it as a visual preparation step before defining orthopedic lines.';
      return;
    }

    if (method === 'ml') {
      this.statusMessage = 'Machine Learning mode selected. This demo currently highlights the image and supports manual validation of strategic lines.';
      return;
    }

    this.statusMessage = 'Manual demo mode active. Click two points to draw the first strategic line.';
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }

    this.objectUrl = URL.createObjectURL(file);
    this.selectedFileName = file.name;
    this.angleResult = null;
    this.lastClick = null;
    this.firstLine = null;
    this.statusMessage = this.selectedMethod === 'manual'
      ? 'Image uploaded. Click two points to define the first orthopedic reference line.'
      : 'Image uploaded. Review it visually and switch to Manual when you want to measure the angle.';
    this.image.src = this.objectUrl;
  }

  resetMeasurements(): void {
    this.lastClick = null;
    this.firstLine = null;
    this.angleResult = null;
    this.statusMessage = this.selectedMethod === 'manual'
      ? 'Measurements cleared. Click two points to begin a new line.'
      : 'Measurements cleared. Select Manual to define strategic orthopedic lines.';

    if (this.imageLoaded) {
      this.drawImage();
    }
  }

  handleCanvasClick(event: MouseEvent): void {
    if (!this.imageLoaded || this.selectedMethod !== 'manual') {
      return;
    }

    const rect = this.canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * this.canvas.width;
    const y = ((event.clientY - rect.top) / rect.height) * this.canvas.height;

    if (!this.lastClick) {
      this.lastClick = [x, y];
      this.statusMessage = this.firstLine
        ? 'Second line started. Click one more point to calculate the angle.'
        : 'First line started. Click one more point to complete it.';
      return;
    }

    this.drawLine(...this.lastClick, x, y);

    if (!this.firstLine) {
      this.firstLine = [...this.lastClick, x, y];
      this.statusMessage = 'First line completed. Click two new points to define the second line.';
    } else {
      this.calculateAngle(...this.firstLine, ...this.lastClick, x, y);
      this.firstLine = null;
      this.statusMessage = 'Angular result updated. You can keep drawing new strategic lines if needed.';
    }

    this.lastClick = null;
  }

  private drawLine(xImg1: number, yImg1: number, xImg2: number, yImg2: number): void {
    this.ctx.strokeStyle = '#ff4d4d';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(xImg1, yImg1);
    this.ctx.lineTo(xImg2, yImg2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private calculateAngle(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): void {
    const vector1 = [x2 - x1, y2 - y1];
    const vector2 = [x4 - x3, y4 - y3];
    const prodInter = vector2[0] * vector1[0] + vector2[1] * vector1[1];
    const magnitude1 = Math.sqrt(vector1[0] * vector1[0] + vector1[1] * vector1[1]);
    const magnitude2 = Math.sqrt(vector2[0] * vector2[0] + vector2[1] * vector2[1]);

    if (!magnitude1 || !magnitude2) {
      this.angleResult = null;
      return;
    }

    const ratio = prodInter / (magnitude1 * magnitude2);
    const safeRatio = Math.min(1, Math.max(-1, ratio));
    const angleInRadians = Math.acos(safeRatio);
    const angleInDegrees = angleInRadians * (180 / Math.PI);
    this.angleResult = Number.isFinite(angleInDegrees) ? angleInDegrees : null;
  }

  private drawImage(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
  }
}
