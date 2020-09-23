import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyForm from './MyForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Build your LaTeX project on the fly with ReTeX</h2>
        <MyForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))