import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

const dishdetail = (props) => {
    const renderComments = (dish) => {
        if (dish != null) {
            return (
                <div>
                    <h4>Comments</h4>
                    {dish.comments.map(comment => {
                        return (
                            <ul key={comment.id} className="list-unstyled">
                                <li>{comment.comment}</li>
                                <br></br>
                                <li>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</li>

                            </ul>
                        )
                    })}
                </div>

            )

        }

    }
    const renderDish = (dish) => {
        if (dish != null) {
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
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
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {renderDish(props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {renderComments(props.dish)}
                </div>
            </div>
        </div>



    );
}

export default dishdetail;