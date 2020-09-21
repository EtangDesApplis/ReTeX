import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import MyForm from './MyForm';
//import MyOutput from './MyOutput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
        <MyForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))