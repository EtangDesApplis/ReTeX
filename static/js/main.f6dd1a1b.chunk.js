(this["webpackJsonpreact-latex"]=this["webpackJsonpreact-latex"]||[]).push([[0],[,,,,,,function(e){e.exports=JSON.parse('{"backend":"https://retex-api.chefphan.com","info":"https://raw.githubusercontent.com/EtangDesApplis/network-info/master/retex.json","target":"extIP","port":"5000"}')},,,function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},function(e,t,n){e.exports=n.p+"static/media/ko-fi.e1440a6f.png"},function(e,t,n){e.exports=n(18)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(2),l=n(3),i=n(5),o=n(4),s=n(0),r=n.n(s),c=n(8),u=n.n(c),h=(n(16),n(1)),p=n(9),m=n.n(p);n(17);var d=function(){return r.a.createElement("p",null," Please wait ... ",r.a.createElement("img",{src:m.a,className:"App-logo",alt:"logo"}))},f=n(6),b=n(10),g=n.n(b),E=function(e){return 1===e.state.response?r.a.createElement("br",null):2===e.state.response?r.a.createElement(d,null):"OK"===e.state.response.Status?(fetch(e.state.backend+e.state.response.LogFile).then((function(e){return e.text()})).then((function(e){console.log(e)})),r.a.createElement("div",null,r.a.createElement("label",null," Log:",r.a.createElement("object",{style:{width:"100%"},type:"text/plain",data:e.state.backend+e.state.response.LogFile},"Job failed")),r.a.createElement("button",{onClick:function(){fetch(e.state.backend+e.state.response.OutputFile).then((function(t){t.blob().then((function(t){var n=window.URL.createObjectURL(t),a=document.createElement("a");a.href=n,a.download=e.state.response.OutputFile.split("/").pop(),a.click()}))}))}},"Download Here"),r.a.createElement("br",null),r.a.createElement("p",null,"If you appreciate this App, you could buy me a coffee here :",r.a.createElement("a",{href:"https://ko-fi.com/nguyen31"},r.a.createElement("img",{src:g.a,alt:"Ko-fi link",height:"40"}))))):r.a.createElement("p",null," ",e.state.response.Status," ")},v=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(e){var l;return Object(a.a)(this,n),(l=t.call(this,e)).state={giturl:"https://github.com/EtangDesApplis/ReTeX.git",texfile:"test/cv_homer.tex",response:1,backend:""},l.handleChange1=l.handleChange1.bind(Object(h.a)(l)),l.handleChange2=l.handleChange2.bind(Object(h.a)(l)),l.handleSubmit=l.handleSubmit.bind(Object(h.a)(l)),l}return Object(l.a)(n,[{key:"handleChange1",value:function(e){this.setState({giturl:e.target.value})}},{key:"handleChange2",value:function(e){this.setState({texfile:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;console.log(this.state.texfile),this.setState({response:2});var n={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:this.state.giturl,main:this.state.texfile})};this.setState({backend:f.backend}),console.log(f.backend),console.log(this.state.backend),fetch(f.backend+"/api",n).then((function(e){return e.json()})).then((function(e){console.log(e),t.setState({response:e})})),e.preventDefault()}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("label",null,"Git repo URL:",r.a.createElement("input",{type:"text",value:this.state.giturl,onChange:this.handleChange1}),"        "),r.a.createElement("label",null,"Main .tex file:",r.a.createElement("input",{type:"text",value:this.state.texfile,onChange:this.handleChange2}),"        "),r.a.createElement("input",{type:"submit",value:"Build project"})),r.a.createElement(E,{state:this.state}))}}]),n}(s.Component),k=function(e){Object(i.a)(n,e);var t=Object(o.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Build your LaTeX project on the fly with ReTeX"),r.a.createElement(v,{handleSubmit:this.handleSubmit}))}}]),n}(s.Component);u.a.render(r.a.createElement(k,null),document.getElementById("root"))}],[[11,1,2]]]);
//# sourceMappingURL=main.f6dd1a1b.chunk.js.map