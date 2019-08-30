import React, { Component } from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import About from './AboutComponent';
import {addComment} from '../redux/actionCreator';

const mapStateToProps = state =>{
  return{
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch=>({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
})

class Main extends Component {
  constructor(props) {
    super(props);
  }

  
  render() {
    console.log(this.props.match);

    const HomePage=()=>{
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId=(props)=>{
      console.log(props,"mainprops");
      console.log(this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10)));
      return(
        <DishDetail dish={this.props.dishes.filter(dish=>dish.id===parseInt(props.match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))}
        addComment={this.props.addComment}>

        </DishDetail>
      )
    }
    return (
    
      <div className="App">
        
        <Header></Header>
          <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}></Menu>} />
            <Route path='/menu/:dishId' component={DishWithId}></Route>
            <Route path='/contactus' component={Contact}/>
            <Route path='/aboutus' component={()=><About leaders={this.props.leaders}></About>}/>
            <Redirect to='/home'></Redirect>
          </Switch>
        <Footer></Footer>
        

      </div>
    );

  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
