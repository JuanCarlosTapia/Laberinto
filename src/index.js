
import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import './index.css';

var labVar =  {
    laberinto : []
} ;
var posx = 1 ;
var posy = 1 ;
var App = React.createClass({
  
  getInitialState: function() {

    return {
      labt: []
    }
  },
  
  componentDidMount: function() {
    var th = this;
    this.serverRequest = 
      axios.get(this.props.source)
        .then(function(result) {    
          th.setState({
            labt: result.data
          });
        })
  },
  
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  
  move : function (event) {


    if (event.key === "ArrowRight") {

        if (labVar.laberinto[posy][posx+1] == "0") {
            posx++;
        } else if (labVar.laberinto[posy][posx+1] == "2")  {
            posx++;
            alert("ganaste");
        }

    } else if (event.key === "ArrowLeft") {
        if (labVar.laberinto[posy][posx-1]== "0") {
            posx--;
        }
        else if (labVar.laberinto[posy][posx-1] == "2")  {
            posx--;
            alert("ganaste");
        }
    } else if (event.key === "ArrowUp") {
        if (labVar.laberinto[posy-1][posx] == "0") {
            posy--;
        } else if (labVar.laberinto[posy-1][posx] == "2") {
            posy--;
            alert("ganaste");
        }
    } else if (event.key === "ArrowDown") {
        if (labVar.laberinto[posy+1][posx]== "0") {
            posy++;
        } else if (labVar.laberinto[posy+1][posx]== "2") {
            posy++;
            alert("ganaste");
        }
    }

        
    this.setState({
            labt: labVar.laberinto
        })

  } ,
  render: function() {
    labVar.laberinto = [];
    var j = 0;
    return (
      <div onKeyDown={this.move} tabIndex={1}>
        {this.state.labt.map(function(lab) {
            var i;
            j++;
            var array = [];
            
            var fila = [];
            for (i = 0; i < lab.length; i++) { 
                var el = lab[i];
                if (i == posx  && j == (posy+1)) {
                    array.push(<div className='jugador'></div>) ;
                    fila.push("3");  
                }
                else if (el == "|" || el == "1") {
                    array.push(<div className='paredVer'></div>) ;
                    fila.push("1");
                } else if (el== "+" || el == "1") {
                    array.push(<div className='esquina'></div>) ;
                    fila.push("1");
                } else if (el == "-" || el == "1") {
                     array.push(<div className='paredHor'></div>) ;
                     fila.push("1");
                }
                else if (el == " " || el == "0" || el == "3") {
                     array.push(<div className='espacio'></div>) ;
                     fila.push("0");
                } else if (el == "g" || el == "2") {
                    array.push(<div className='objetivo'></div>) ;
                    fila.push("2");
                } else if (el == "p" || el == "0") {
                    array.push(<div className='espacio'></div>) ;
                    fila.push("0");
                }                    
            }
            labVar.laberinto.push(fila);
            
            return (
                    <div className='fila'>{array}</div>
                );
            

        })}

      </div>
    )

  }


});

ReactDOM.render(<App source="http://52.88.26.79:7000/?type=json&w=10&h=10" />, document.querySelector("#root"));