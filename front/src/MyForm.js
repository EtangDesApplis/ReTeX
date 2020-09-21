import React, {Component} from 'react';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {giturl: 'https://github.com/EtangDesApplis/ReTeX.git',texfile: 'test.tex',log: ''};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange1(event) {    this.setState({giturl: event.target.value});  }
    handleChange2(event) {    this.setState({texfile: event.target.value});  }
    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.texfile);
        //processing code is here

        //POST RESTFUL TO BACK END {repo: url, main: main.tex}
        //https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          //body: JSON.stringify({ title: 'React POST Request Example' })
          body: JSON.stringify({ url: this.state.giturl, main: this.state.texfile })
        };
        fetch('http://localhost:5000',requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ log: JSON.stringify(data) }));

        //{pdf:base64,log:base64}
        //https://stackoverflow.com/questions/38070373/how-to-send-and-receive-http-post-requests-in-python
        //wait til semaphore is delete

        //create semaphore file epoch.job in /tmp
        //return an URL to download & log of build
        //set log of build
        //this.setState({log: "Built "+this.state.giturl});

        event.preventDefault();
    }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Git repo URL:
              <input type="text" value={this.state.giturl} onChange={this.handleChange1} />        </label>
              <label>
              Main .tex file:
              <input type="text" value={this.state.texfile} onChange={this.handleChange2} />        </label>
            <input type="submit" value="Build project" />
            <br />
            <a href="/cv.pdf" download="My_File.pdf"> Download Here </a>
            <label>
              Log:
              <textarea value={this.state.log} />        </label>
          </form>
          
        );
    }
}

export default MyForm;