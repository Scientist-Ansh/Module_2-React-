import React, { Component } from 'react';

import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import {actions} from 'react-redux-form'


import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import About from './AboutComponent';
import {postComment,fetchDishes,fetchComments,fetchPromos} from '../redux/actionCreator';
import {TransitionGroup,CSSTransition} from 'react-transition-group';

const mapStateToProps = state =>{
  return{
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch=>({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes:()=> dispatch(fetchDishes()),
  resetFeedbackForm:()=>dispatch(actions.reset("feedback")),
  fetchComments:()=>dispatch(fetchComments()),
  fetchPromos:()=>dispatch(fetchPromos())
})



class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  
  render() {
    console.log(this.props.match);

    const HomePage=()=>{
      console.log(this.props.dishes.dishes.filter((dish) => dish.featured)[0]+"hyhyyhyhhyyhhyyh");
      return(
        
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promosLoading = {this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]} />
      );
    }

    const DishWithId=(props)=>{
      console.log(props,"mainprops");
      
      return(
        <DishDetail dish={this.props.dishes.dishes.filter(dish=>dish.id===parseInt(props.match.params.dishId,10))[0]}
        isLoading = {this.props.dishes.isLoading}
        errMess = {this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId,10))}
        commentsErrMess = {this.props.comments.errMess}
        postComment={this.props.postComment}>

        </DishDetail>
      )
    }
    return (
    
      <div className="App">
        
        <Header></Header>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={()=> <Menu dishes={this.props.dishes}></Menu>} />
            <Route path='/menu/:dishId' component={DishWithId}></Route>
            <Route path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
            <Route path='/aboutus' component={()=><About leaders={this.props.leaders}></About>}/>
            <Redirect to='/home'></Redirect>
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        <Footer></Footer>
        

      </div>
    );

  }

}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
