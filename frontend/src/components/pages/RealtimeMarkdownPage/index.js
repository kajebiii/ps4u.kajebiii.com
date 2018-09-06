import React from 'react'
import ReactMarkdown from 'react-markdown';
import Textarea from 'react-textarea-autosize';

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

const example_content = `# hello, This is Markdown Live Preview

----
## what is Markdown?
see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)

> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".

----
## usage
1. Write markdown text in this textarea.
2. Click 'HTML Preview' button.

----
## mathjax quick reference
* $ x = \frac{b \pm \sqrt{b^2-4ac} }{2a}$
* $$ x = \frac{b \pm \sqrt{b^2-4ac} }{2a}$$
* //TODO

## markdown quick reference
# headers

*emphasis*

**strong**

* list

>block quote

    code (4 spaces indent)
[links](http://wikipedia.org)

----
## thanks
* [react-markdown](https://github.com/rexxars/react-markdown)
* [react-textarea-autosize](https://github.com/andreypopp/react-textarea-autosize)
`

class RealtimeMarkdownPage extends React.Component {
  constructor( props ){
    super(props)
    this.state = { markdown_content: example_content };
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    this.setState({markdown_content: value});
  }
  render(){
    var { boj_source, children, ...props } = this.props
    return (
      <PageTemplate {...props}>
        <h1>RealtimeMarkdownPage</h1>
        <div className="row">
        <Textarea
          minRows={10}
          value={this.state.markdown_content} 
          onChange={this.handleInputChange}
          style={{'width': '100%'}} 
          className="col-sm"
        />
        <ReactMarkdown className="border col-sm markdown-body" source={this.state.markdown_content}/>
        </div>
        <br/>
        {children}
      </PageTemplate>
    )
  }
}

export default RealtimeMarkdownPage
