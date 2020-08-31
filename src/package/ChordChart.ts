class ChordChart {
  private ctx: CanvasRenderingContext2D;
  private points: Array<string>;
  private name: string;
  private width: number;
  private height: number;

  constructor(ctx: CanvasRenderingContext2D, points: string, name: string, width: number, height: number) {
    this.ctx = ctx;
    this.points = ChordChart.parsePoints(points);
    this.name = name;
    this.width = width;
    this.height = height;
    this.draw();
  }

  private static parsePoints(points: string) {
    if (/( )/.test(points)) {
      return points.split(' ')
    } else {
      return points.split('')
    }
  }

  public draw() {
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, 140, 140 * 1.6)

    this.drawGrid();
    this.drawPoints();
  }

  private drawGrid() {
    const colSpan = 20;
    const rowSpan = 25;

    this.ctx.beginPath();
    this.ctx.lineCap = 'square';
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#777';

    // Painting rows
    for (let row = 25; row <= 6 * rowSpan; row += rowSpan) {
      this.ctx.moveTo(20.5, row + 0.5);
      this.ctx.lineTo(this.points.length * colSpan + 0.5, row + 0.5);
    }
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.lineCap = 'square';
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;

    // Painting columns
    for (let column = 20; column <= this.points.length * colSpan; column += colSpan) {
      this.ctx.moveTo(column + 0.5, 25.05);
      this.ctx.lineTo(column+0.5, 150.05);
    }

    this.ctx.stroke();
  }

  private drawPoints() {
    const pointsArr: string[] = this.points;
    const numberPoints: number[] = pointsArr
      .filter(point => point !== 'x' && point !== "0")
      .map(numStr => parseInt(numStr));

    const min: number = Math.min(...numberPoints);

    if (min <= 5) {
      this.drawUpperThreshold();
    }

    pointsArr.forEach((point, index, array) => {
      if (point === 'x' || point === "0") {
        this.drawHeaderPoint(index + 1, point)
      } else if (point !== 'x' && point !== "0") {
        if(min > 5) {
          this.drawPoint(parseInt(point) - min + 1, index + 1);
          this.drawFretCount(min);
        } else {
          this.drawPoint(parseInt(point), index + 1)
        }
      }
    });

    if (pointsArr.every(point => point !== 'x' && point !== "0")) {
      const duplicated: Set<number> = new Set()

      for (let point of numberPoints) {
        if (numberPoints.filter(p => p === point).length > 1) {
          duplicated.add(point)
        }
      }

      const pointY: number = Array.from(duplicated.values()).sort()[0];
      this.drawBare(pointY - min + 1)
    }
  }

  private drawUpperThreshold() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 5;
    this.ctx.moveTo(20.5, 25);
    this.ctx.lineTo(this.points.length * 20 + 0.5, 25);
    this.ctx.stroke();
  }

  private drawFretCount(fretCount: number) {
    this.ctx.fillStyle = '#333';
    this.ctx.font = 'bold 13px sans-serif';
    this.ctx.fillText(`${fretCount}`, 5, 40);
  }

  private drawHeaderPoint(pointX: number, content: string) {
    this.ctx.fillStyle = '#333';
    this.ctx.font = 'bold 13px sans-serif';
    this.ctx.fillText(content, pointX * 20 - 3, 20);

  }

  private drawPoint(pointY: number, pointX: number) {
    this.ctx.beginPath();
    this.ctx.arc(pointX * 20, (pointY * 25) + 12, 5, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#333';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#333';
    this.ctx.stroke();
  }

  private drawBare(pointY: number) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#333';
    this.ctx.lineCap = 'round';
    this.ctx.lineWidth = 10;
    this.ctx.moveTo(20, (pointY * 25) + 12);
    this.ctx.lineTo(this.points.length * 20, (pointY * 25) + 12);
    this.ctx.stroke();
  }

  private drawCircle()
}

export default ChordChart
