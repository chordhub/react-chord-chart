import React from 'react';
import './App.css';

import {ReactChordChart} from "../package/ReactChordChart";

interface AppState {
  points: string
}

class App extends React.Component {
  state: AppState = {
    points: 'x 0 7 6 8 0'
  };

  constructor(props: any) {
    super(props);

    this.handleCheck = this.handleCheck.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
  }

  private handleChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({points: e.target.value})
  }

  private handleCheck() {

  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <div className="app__input-form">
            <input value={this.state.points} type="text" onChange={this.handleChangeCode}/>
            <button onClick={this.handleCheck}>Check</button>
          </div>
          <ReactChordChart name='Am' points={this.state.points}/>
        </div>
      </div>
    )
  }
}

export default App;
