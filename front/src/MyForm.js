import React, {Component} from 'react';
import Wait from './Wait';
import conf from './conf.json';
import kofi from './ko-fi.png';

const OutputZone = props => {

  // <a href={props.result.OutputFile} download="output.pdf"> Download Here </a>
  const downloadPdf = () => {
    fetch(props.state.backend+props.state.response.OutputFile)
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = props.state.response.OutputFile.split("/").pop();
          a.click();
        });
    });
  }

  if (props.state.response ===1){
    //fresh session
    return <br />
  }else if (props.state.response ===2){
    //awaiting response from back-end since POST request
    return <Wait />
  }else{
    //receive response from back-end
    if (props.state.response.Status==="OK"){
      fetch(props.state.backend+props.state.response.LogFile)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        })
      //console.log(conf.backend+props.result.LogFile)
      return (
        <div>
            <label> Log:
              <object style={{ width: '100%' }} type="text/plain" data={props.state.backend+props.state.response.LogFile} >Job failed</object>
            </label>
            <button onClick={downloadPdf}>Download Here</button>
            <br/>
            <p>If you appreciate this App, you could buy me a coffee here : 
              <a href="https://ko-fi.com/nguyen31"><img src={kofi} alt="Ko-fi link" height="40"/></a>
            </p>
        </div>
      );
    }else{
      return <p> {props.state.response.Status} </p>;
    }
  }
}

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {giturl: 'https://github.com/EtangDesApplis/ReTeX.git',
                      texfile: 'test/cv_homer.tex',
                      response: 1,
                      backend:''};
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange1(event) { 
      this.setState({giturl: event.target.value});  
    }

    handleChange2(event) { 
      this.setState({texfile: event.target.value});  
    }
    //
    handleSubmit(event) {
        console.log(this.state.texfile);
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

        /*
        try{
        // THIS TRY AND CATCH IS USELESS
        //  if (conf.info===undefined){
        //    throw "use default backend"
        //  }
          //get ip of backend from github
          //curl https://raw.githubusercontent.com/EtangDesApplis/network-info/master/retex.json
        
          fetch(conf.info)
            .then(reponse => reponse.json())
            .then(data => {
              if (conf.target==="intIP"){
                this.setState({backend: "http://"+data.intIP+":"+conf.port});
              }else{
                this.setState({backend: "http://"+data.extIP+":"+conf.port});
              }
              console.log(this.state.backend)
              //request backend to do the job
              fetch(this.state.backend,requestOptions)
                .then(backres => backres.json())
                //wait til the reponse from back end
                .then(backdata => {
                  console.log(backdata)
                  this.setState({ response: backdata })
                });
            });
        }catch(e){
          //use ip of backend from conf.json
          this.setState({backend: conf.backend});
          console.log(conf.backend);
          console.log(this.state.backend);
          fetch(this.state.backend,requestOptions)
            .then(response => response.json())
            //wait til the reponse from back end
            .then(data => {
              //print out reponse to debug
              console.log(data)
              this.setState({ response: data })
            });
        }
        */
        this.setState({backend: conf.backend});
        console.log(conf.backend);
        console.log(this.state.backend);
        fetch(conf.backend,requestOptions)
          .then(response => response.json())
          //wait til the reponse from back end
          .then(data => {
            //print out reponse to debug
            console.log(data)
            this.setState({ response: data })
          });

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
            <OutputZone state={this.state} />
          </div>
        );
    }
}

export default MyForm;