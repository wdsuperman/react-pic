import React, { Component } from 'react';
import onePic from '../assets/1.jpg'
import twoPic from '../assets/2.jpg'
import thrPic from '../assets/3.jpg'
import forPic from '../assets/4.jpg'
import fivPic from '../assets/5.jpg'
import styled from "styled-components";
import '../assets/banner.css'

class Banner extends Component {
  state = {
    pic:[
      {
        id:1,
        src:onePic
      },
      {
        id:2,
        src:twoPic
      },
      {
        id:3,
        src:thrPic
      },
      {
        id:4,
        src:forPic
      },
      {
        id:5,
        src:fivPic
      },
    ],
    show:0
  }
  componentDidMount(){
    this.timeId = setInterval(()=>{
      const { show,pic } = this.state
      this.setState({
        show:this.state.show >= pic.length - 1 ? 0 : show + 1
      })
    },2000)
  }
  time= ()=>{
    this.timeId = setInterval(()=>{
      const { show,pic } = this.state
      this.setState({
        show:this.state.show >= pic.length - 1 ? 0 : show + 1
      })
    },2000)
  }
  stop = () =>{
    clearInterval(this.timeId)
  }
  go = () => {
    this.time()
  }
  handleClick = ind => {
    this.setState({
      show:ind
    })
  }
  change= arrow => {
    const { show,pic } = this.state
    if(arrow === 'left'){
      this.setState({
        show:this.state.show <= 0 ? pic.length - 1 : show - 1
      })
    }else{
      this.setState({
        show:this.state.show >= pic.length - 1 ? 0 : show + 1
      })
    }
  }
  render() {
    const{ pic } = this.state
    const picWidth = 100 * pic.length + '%'
    const imgWidth = 100 / pic.length + '%'
    const left = this.state.show * -100 + '%'
    const showPic = pic.map(pic => (
      <img src={pic.src} alt='' style={{width:imgWidth}} key={pic.id}/>
    ))
    const buttonList = pic.map( (pic,index) => <Button style={{ backgroundColor: this.state.show === index ? '#ccc':''}} onClick={() => this.handleClick(index)} key={pic.id}></Button>)
    return (
      <Bigbox  onMouseEnter={ this.stop } onMouseLeave={ this.go }>
        <div style={{width:picWidth,transition:'all .7s linear',marginLeft:left}}>
          {showPic}
        </div>
        <List>
          {buttonList}
        </List>
        <ArrowLeft onClick={()=>this.change('left')}> ← </ArrowLeft>
        <ArrowRight onClick={()=>this.change('right')}> → </ArrowRight>
      </Bigbox>
    );
  }
}

export default Banner;
const Bigbox = styled.div`
  overflow:hidden;
  width:60%;
  margin:0 auto;
  margin-top:100px;
  position:relative;
`
const List = styled.ul`
  list-style:none;
  margin:0;
  padding:0;
  position:absolute;
  width:40%;
  display:flex;
  bottom:18px;
  left:50%;
  margin-left:-20%;
  justify-content: space-between;
`
const Button = styled.li`
  width:20px;
  height:20px;
  opacity:0.8;
  background-color:teal;
  border-radius:50%;
  cursor:pointer;
`
const Arrow = styled.div`
  width:50px;
  height:50px;
  font-size:26px;
  background-color:#fff;
  line-height: 50px;
  text-align: center;
  opacity: .6;
  top:50%;
  margin-top:-25px;
  position: absolute;
  cursor:pointer;
`
const ArrowLeft = styled(Arrow)`
left:10px;
`
const ArrowRight = styled(Arrow)`
right:10px;
`