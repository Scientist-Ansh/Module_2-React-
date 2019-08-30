import React, { Component } from 'react';
import {Modal, ModalBody, ModalHeader,Button,Label,Row,Col} from 'reactstrap';
import {LocalForm,Control,Errors} from 'react-redux-form';


const minLength = (len) =>(value)=> value && (value.length >= len);
const maxLength = (len) =>(value)=> !(value) || (value.length <= len);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            modal:false
        }
        this.toggle=this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
      handleSubmit=(values)=>{
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
      }


    render() {
        return (
            <div>
              
                <Button outline color="secondary" onClick={this.toggle}> Submit Comment</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values=>this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlfor="ratings">Rating</Label>
                            
                                <Control.select model=".ratings"  id="ratings" 
                                       className="form-control"
                                       >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </Control.select>
                        
                            </div>
                            <div className="form-group">
                                <Label htmlfor="name">Your Name</Label>
                                
                                <Control.text model=".name"  id="name" 
                                       className="form-control" 
                                       placeholder="Your Name"
                                       validators={{
                                           minLength:minLength(2),maxLength: maxLength(15)
                                       }}
                                       />
                                       <Errors 
                                       className="text-danger"
                                       show="touched"
                                       model=".name"
                                       messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                       }}
                                       />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" 
                                        rows="6" className="form-control"
                                        />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </LocalForm>
                    
                       
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default CommentForm;