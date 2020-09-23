import React, {Component} from 'react';
import Wait from './Wait';
import conf from './conf.json';
import kofi from './ko-fi.png';
const OutputZone = props => {
  if (props.result ===1){
    //fresh session
    return <br />
  }else if (props.result ===2){
    //awaiting response from back-end since POST request
    return <Wait />
  }else{
    //receive response from back-end
    if (props.result.Status==="OK"){
      fetch(props.result.LogFile)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        })
      return (
        <div>
            <label> Log:
            <object style={{ width: '100%' }} type="text/plain" alt="Job failed" data={props.result.LogFile} ></object>
            </label>
            <a href={props.result.OutputFile} download="output.pdf"> Download Here </a>
            <br/>
            <p>If you appreciate this App, you could buy me a coffee here : 
              <a href="https://ko-fi.com/nguyen31"><img src={kofi} alt="Ko-fi link" height="40"/></a>
            </p>
        </div>
      );
    }else{
      return <p> {props.result.Status} </p>;
    }
  }
}

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {giturl: 'https://github.com/EtangDesApplis/ReTeX.git',
                      texfile: 'test/cv_homer.tex',
                      response: 1};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange1(event) {    this.setState({giturl: event.target.value});  }
    handleChange2(event) {    this.setState({texfile: event.target.value});  }
    handleSubmit(event) {

        //set to awating status
        this.setState({ response: 2 })

        //POST RESTFUL TO BACK END {repo: url, main: main.tex}
        //https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
        //for timeout https://www.npmjs.com/package/fetch-timeout
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //body: JSON.stringify({ title: 'React POST Request Example' })
          body: JSON.stringify({ url: this.state.giturl, main: this.state.texfile })
        };
        fetch(conf.backend,requestOptions)
          .then(response => response.json())
          //wait til the reponse from back end
          .then(data => this.setState({ response: data }));

        event.preventDefault();
    }
    
    render() {
        return (
          <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Git repo URL:
              <input type="text" value={this.state.giturl} onChange={this.handleChange1} />        </label>
              <label>
              Main .tex file:
              <input type="text" value={this.state.texfile} onChange={this.handleChange2} />        </label>
            <input type="submit" value="Build project" />
          </form>
          <OutputZone result={this.state.response} />
          </div>
        );
    }
}

export default MyForm;