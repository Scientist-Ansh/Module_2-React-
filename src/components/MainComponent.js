import React, { Component } from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
      
    }

  }

  
  render() {
    console.log(this.props.match);

    const HomePage=()=>{
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId=(props)=>{
      console.log(props);
      return(
        <DishDetail dish={this.state.dishes.filter(dish=>dish.id===parseInt(props.match.params.dishId,10))[0]}
        comments={this.state.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))}>

        </DishDetail>
      )
    }
    return (
    
      <div className="App">
        
        <Header></Header>
          <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={()=> <Menu dishes={this.state.dishes}></Menu>} />
            <Route path='/menu/:dishId' component={DishWithId}></Route>
            <Route path='/contactus' component={Contact}/>
            <Redirect to='/home'></Redirect>
          </Switch>
        <Footer></Footer>
        

      </div>
    );

  }

}

export default Main;
