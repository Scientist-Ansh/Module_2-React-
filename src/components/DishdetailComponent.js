import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import CommentForm from './CommentForm';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';


const RenderComments = ({comments,postComment,dishId}) => {
    if (comments != null) {
        return (
            <div>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <ul key={comment.id} className="list-unstyled">
                            <li>{comment.comment}</li>
                            <br></br>
                            <li>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>

                        </ul>
                    )
                })}
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>

        )

    }
    else{
        return(
        <div>
            <h2>NO comments</h2>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>)
    }   

}

const RenderDish = ({dish}) => {
    if (dish != null) {
        return (
            <Card>
                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return <div></div>
    }
}

const dishdetail = (props) => {
    if(props.isLoading){
        return(
            <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
        );
    }
    else if(props.errMess){
        return(
            <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
        );
    }
    else if(props.dish!=null){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
    
        );
    }
    else{
        return <div></div>
    }
    
}

export default dishdetail;