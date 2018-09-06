import React from 'react'
import Textarea from 'react-textarea-autosize';

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

const default_code = `#include <bits/stdc++.h>
using namespace std;
vector<int> test(42, 1910);
int main(int argc, char **argv)
{
  //* Test
  printf("%c%c'\\"\\\\",'"','\\\\'); // /* Wow!

  return 0;
  /*/
    And this Is comment
  //*/
}`

var keyword = "alignas alignof and and_eq asm atomic_cancel atomic_commit atomic_noexcept auto bitand bitor bool break case catch char char16_t char32_t class compl concept const constexpr const_cast continue decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if import inline int long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch synchronized template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq".split(" ")
//var source , sourceline, canvas = document.getElementById("canvas1"), ctx;
var source , sourceline, canvas, ctx;
var normal = 0;
var pre = 1;
var onelinecomment = 2;
var multilinecomment = 3;
var multip = 11;
var multip2 = 12;
var normalc = 4;
var doublequote = 5;
var doublequotex = 6;
var doubleignore = 9;
var singlequote = 7;
var singlequotex = 8;
var singleignore = 10;
var COLOR_WHITE = "white";
var COLOR_BLACK = "black";
var COLOR_BROWN = "brown";
var COLOR_DARKDARKBLUE = "#004444";
var COLOR_GRAY = "gray";
var COLOR_GREEN = "green";
var COLOR_BLUE = "blue";
var COLOR_PURPLE = "purple";

function next(nowState, b, c, d) {
  //alert(nowState + "" + b + c + d);
  if(nowState == pre) {
    if(c=='\n') return normal;
    return pre;
  }
  if(nowState == normal) {
    if(c=='#') return pre;
    if(c=='/' && d=='/') return onelinecomment;
    if(c=='/' && d=='*') return multip;
    if(c=='"') return doublequote;
    if(c=="'") return singlequote;
    return normal;
  }
  if(nowState == doublequote) {
    if(c=='"' && b!='\\') return doublequotex;
    if(b=='\\' && c=='\\') return doubleignore;
    return doublequote;
  }
  if(nowState == doublequotex)
    return normal;
  if(nowState == doubleignore) {
    if(c=='"') return doublequotex;
    return doublequote;
  }
  if(nowState == singlequote) {
    if(c=="'" && b!='\\') return singlequotex;
    if(b=='\\' && c=='\\') return singleignore;
    return singlequote;
  }
  if(nowState == singlequotex)
    return normal;
  if(nowState == singleignore) {
    if(c=="'") return singlequotex;
    return singlequote;
  }
  if(nowState == onelinecomment) {
    if(c == '\n') return normal;
    return onelinecomment;
  }
  if(nowState == multip)
    return multip2;
  if(nowState == multip2)
    return multilinecomment;
  if(nowState == multilinecomment) {
    if(b == '*' && c == '/') return normalc;
    return multilinecomment;
  }
  if(nowState == normalc)
    return normal;
}
function inv(a, b) {
  for(var i=0; i<b.length; i++)
    if(b[i]==a) return true;
  return false;
}
function color(State) {
  if(State == normal) return COLOR_BLACK;
  if(State == pre) return COLOR_BROWN;
  if(State == onelinecomment) return COLOR_GREEN;
  if(State == multilinecomment) return COLOR_GREEN;
  if(State == multip) return COLOR_GREEN;
  if(State == multip2) return COLOR_GREEN;
  if(State == normalc) return COLOR_GREEN;
  if(State == doublequote) return COLOR_GRAY;
  if(State == doublequotex) return COLOR_GRAY;
  if(State == doubleignore) return COLOR_GRAY;
  if(State == singlequote) return COLOR_GRAY;
  if(State == singleignore) return COLOR_GRAY;
  if(State == singlequotex) return COLOR_GRAY;
}
function tf(x) {
  var res = "";
  for(var i=0; i<x.length; ++i) {
    if(x[i]=='\t') {
      res += " ";
      while(res.length%4!=0) res += " ";
    }
    else res += x[i];
  }
  return res;
}
function mylength(x) {
  var ret = 0;
  for(var i = 0; i< x.length; ++i) {
    ret += 1;
    if(x[i]=='\t')
      while(ret%4!=0) ++ret;
  }
  return ret;
}  

class CppToImagePage extends React.Component {
  constructor( props ){
    super(props)
    this.ffxx = this.ffxx.bind(this)
    this.morning = this.morning.bind(this)
    this.evening = this.evening.bind(this)
    this.update = this.update.bind(this)
    this.f = this.f.bind(this)
    this.dlCanvas = this.dlCanvas.bind(this)
  }
  ffxx(){
    document.getElementById("white").value = COLOR_WHITE ;
    document.getElementById("black").value = COLOR_BLACK;
    document.getElementById("brown").value = COLOR_BROWN;
    document.getElementById("darkdarkblue").value = COLOR_DARKDARKBLUE;
    document.getElementById("gray").value = COLOR_GRAY;
    document.getElementById("green").value = COLOR_GREEN;
    document.getElementById("blue").value = COLOR_BLUE;
    document.getElementById("purple").value = COLOR_PURPLE;
  }
  morning() {
    COLOR_WHITE = "white";
    COLOR_BLACK = "black";
    COLOR_BROWN = "brown";
    COLOR_DARKDARKBLUE = "#004444";
    COLOR_GRAY = "gray";
    COLOR_GREEN = "green";
    COLOR_BLUE = "blue";
    COLOR_PURPLE = "purple";
    this.ffxx();
  }
  evening() {
    COLOR_WHITE = "black";
    COLOR_BLACK = "white";
    COLOR_BROWN = "brown";
    COLOR_DARKDARKBLUE = "#c0ffee";
    COLOR_GRAY = "#cccccc";
    COLOR_GREEN = "#22ff22";
    COLOR_BLUE = "#00cccc";
    COLOR_PURPLE = "#aaaa00";
    this.ffxx();
  }
  update() {
    COLOR_WHITE = document.getElementById("white").value;
    COLOR_BLACK = document.getElementById("black").value;
    COLOR_BROWN = document.getElementById("brown").value;
    COLOR_DARKDARKBLUE = document.getElementById("darkdarkblue").value;
    COLOR_GRAY  = document.getElementById("gray").value;
    COLOR_GREEN = document.getElementById("green").value;
    COLOR_BLUE  = document.getElementById("blue").value;
    COLOR_PURPLE = document.getElementById("purple").value;
  } 
  f() {
    this.update()
    var xx = document.getElementById("fs").value;
    var heightv = xx*2+2;
    var widthv = xx*1+1;
    source = document.getElementById("source").value;
    sourceline = source.split("\n");
    for(var i =0; i<sourceline.length; ++i)
      sourceline[i] = tf(sourceline[i]);
    canvas = document.getElementById("canvas1");
    ctx = document.getElementById("canvas1").getContext("2d");
    canvas.height = heightv*(sourceline.length+1);
    var ml = 0;
    for(var i = 0; i<sourceline.length; i++)
      if(ml<mylength(sourceline[i])) ml = mylength(sourceline[i]);
    canvas.width = widthv*ml+100;
    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = (xx*2)+"px "+ document.getElementById("ff").value;
    ctx.color = COLOR_BLACK;
  
    var automata = 0;
    for(var i = 0; i<sourceline.length; ++i) {
      ctx.fillStyle = COLOR_BLACK;
      ctx.fillText(i+1, 5*widthv-(""+(i+1)).length*widthv, heightv*(i+1));
      var ff = sourceline[i].split(/\s|\<|\>|\(|\)|\[|\]|\*|\+|\-|\/|\||\!|\&|\^|\;|\=|\"|\#|\%|\'|\,|\.|\`|\{|\}|\~/)
      var xx = 6*widthv;
      var ind = 0;
      for(var j=0; j<ff.length; j++) {
        for(var k=0; k<ff[j].length; k++) {
          automata = next(automata, sourceline[i][ind-1], sourceline[i][ind], sourceline[i][ind+1]);
          ctx.fillStyle = color(automata);
          if(color(automata)!=COLOR_GREEN && color(automata)!=COLOR_BROWN && color(automata)!=COLOR_GRAY && inv(ff[j],keyword)) ctx.fillStyle = COLOR_BLUE;
          if(color(automata)!=COLOR_GREEN && color(automata)!=COLOR_BROWN && color(automata)!=COLOR_GRAY && /^\+?\d+$/.test(ff[j])) ctx.fillStyle = COLOR_PURPLE;
          ctx.fillText(sourceline[i][ind], xx, heightv*(i+1));
          xx += widthv;
          ++ind;
        }
        if(sourceline[i][ind]) {
          automata = next(automata, sourceline[i][ind-1], sourceline[i][ind], sourceline[i][ind+1]);
          ctx.fillStyle = color(automata);
          if(color(automata)!=COLOR_GREEN && color(automata)!=COLOR_BROWN && color(automata)!=COLOR_GRAY )
            ctx.fillStyle = COLOR_DARKDARKBLUE;
          ctx.fillText(sourceline[i][ind], xx, heightv*(i+1));
        }
        xx += widthv;
        ++ind;
        //alert(ff[j]);
      }
      xx += widthv;
      if(sourceline[i+1])
        automata = next(automata, sourceline[i][i.length-1], '\n', sourceline[i+1][0]);
      else
        automata = next(automata, sourceline[i][i.length-1], '\n', null);
    }
  }
  dlCanvas() {
    if (canvas.msToBlob) { //for IE
      var blob = canvas.msToBlob();
      window.navigator.msSaveBlob(blob, 'download.png');
    }
    else
    {
      var dt = canvas.toDataURL('image/png');
      this.href = dt;
    }
  }
  componentDidMount() {
    this.ffxx();
    document.getElementById("fs").value = "10";
    this.f();
    //document.getElementById("test").addEventListener('click', this.dlCanvas, false);
  }
  render(){
    var { children, ...props } = this.props
    return (
      <PageTemplate {...props}>
      <h1>CppToImagePage</h1>
      <div className="row">
        <div className="col-sm">
          <Textarea 
            minRows={10} 
            id="source" 
            name="source" 
            style={{'width': '100%'}} 
            defaultValue={default_code}/>
          <br/>
          Theme:
          {/*004444*/}
          <input size="5" id="white" type="text" defaultValue={COLOR_WHITE}/>
          <input size="5" id="black" type="text" defaultValue={COLOR_BLACK}/>
          <input size="5" id="brown" type="text" defaultValue={COLOR_BROWN}/>
          <input size="5" id="darkdarkblue" type="text" defaultValue={COLOR_DARKDARKBLUE}/>
          <input size="5" id="gray" type="text" defaultValue={COLOR_GRAY}/>
          <input size="5" id="green" type="text" defaultValue={COLOR_GREEN}/>
          <input size="5" id="blue" type="text" defaultValue={COLOR_BLUE}/>
          <input size="5" id="purple" type="text" defaultValue={COLOR_PURPLE}/>
          <br/>
          <a href="#" onClick={this.morning}>Morning</a>&nbsp;
          <a href="#" onClick={this.evening}>Evening</a>
          <br/>
          Font size: <input id="fs" defaultValue="10" type="text"/> 
          <br/>
          Font face: <input id="ff" defaultValue="Consolas" type="text"/>
          <br/>
          <a href="#" onClick={this.f}>Generate</a>
        </div>
        <div className="col-sm">
          {/*<a href="#" id="test" onClick={this.dlCanvas} download="download.png">Download</a><br/>*/}
          <canvas id="canvas1" style={{'width': '100%'}}>Browser does not support canvas</canvas>
        </div>
      </div>
      {children}
      </PageTemplate>
    )
  }
}

export default CppToImagePage
