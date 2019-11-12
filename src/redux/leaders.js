import * as ActionTypes from './actionTypes';

export const Leaders = (state ={
    isLoading:true,
    errmess:null,
    leaders:[]
},action)=>{
    switch(action.type){
       
            case ActionTypes.ADD_LEADERS:
                return{...state, isLoading:false, errmess:null, leaders:action.payload}
            case ActionTypes.LEADERS_LOADING:
                return{...state, isLoading:true}
            case ActionTypes.LEADERS_FAILED:
                return{...state,isLoading:false,errmess:action.payload,leaders:null}
            default:
            return state;
    }
}