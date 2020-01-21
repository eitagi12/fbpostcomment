import React, { Component } from "react";
import Axios from "../config/axios.setup";
import { Input, Button, Card } from "antd";

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: [],
      postTextValue: "",
      postPictureValue: "",
      postAuthorValue: ""
    };
  }

  componentDidMount () {
    Axios.get("/posts").then(result => {
      this.setState({
        postList: result.data
      })
    });
  }

  // componentDidMount = async () => {
  //   let result = await Axios.get("http://localhost:8080/posts")
  //   this.setState({postList: result.data})
  // } อันนี้เป็นวิธีใช้ async await ได้เหมือนกัน


  handleClick(){
    Axios.post('/post',{
      text: this.state.postTextValue,
      picture :this.state.postPictureValue,
      author: this.state.postAuthorValue
    }).then((result)=>{
      console.log(result)
      // this.setState({
      //   postList: [result.data,...this.state.postList]
      // }) ****ได้ทั้ง2วิธีเลยนะ****
      Axios.get("/posts").then(result => {
      this.setState({
        postList: result.data
      });
    })

    })
  }

  render() {
    return (
      <div>
        <Input onChange={(e)=>this.setState({postTextValue: e.target.value})} placeholder="Text" />
        <Input onChange={(e)=>this.setState({postPictureValue: e.target.value})} placeholder="Picture" />
        <Input onChange={(e)=>this.setState({postAuthorValue: e.target.value})} placeholder="Author"/>
        <Button onClick={()=>this.handleClick()}>Post</Button>
        {this.state.postList.map(post => (
          <Card key={post.id} style={{ width: 300 }}>
            <p>{post.author}</p>
            <p>{post.text}</p>
            <img src={post.picture} width="100%"/>
          </Card>
        ))}
      </div>
    );
  }
}
