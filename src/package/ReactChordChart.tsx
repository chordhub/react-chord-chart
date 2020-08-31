import React from 'react';
import ChordChart from "./ChordChart";

interface ReactChordChartProps {
  name: string;
  points: string;
  width?: number;
}

class ReactChordChart extends React.Component<ReactChordChartProps> {
  private readonly canvas: React.RefObject<HTMLCanvasElement>;
  private readonly width: number;
  private readonly height: number;

  constructor(props: ReactChordChartProps) {
    super(props);
    this.canvas = React.createRef();

    this.width = props.width || 140;
    this.height = (props.width || 140) * 1.6;
  }

  componentDidMount() {
    this.initChordChart()
  }

  componentDidUpdate() {
    this.initChordChart()
  }

  render() {
    return <canvas className='react-chord-chart' ref={this.canvas} width={this.width} height={this.height}/>
  }

  private initChordChart() {
    const ctx = this.canvas.current?.getContext('2d');

    if (ctx) {
      new ChordChart(ctx, this.props.points, this.props.name, this.width, this.height);
    } else {
      throw new Error('Где контекст епт')
    }
  }
}

export {ReactChordChart};
