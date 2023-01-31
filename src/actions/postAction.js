import * as PostApi from '../api/PostRequest'


export const getTimelinePosts = (id)=> async(dispatch)=>{
    dispatch({type:"RETREIVING_START"});
    try {
        const {data} = await PostApi.getTimelinePosts(id);
        dispatch({type:"RETREIVING_SUCCESS", data:data});
    } catch (error) {
        dispatch({type:"RETREIVING_FAIL"})
        console.log(error)
        
    }
}

export const removePost = (postId,userId)=>async(dispatch)=>{
    dispatch({type:"REMOVE_START"});
    try {
        const {data} = await PostApi.removePost(postId,userId);
        dispatch({type:"REMOVE_SUCCESS", data:data});
    } catch (error) {
        dispatch({type:"REMOVE_FAIL"})
        console.log(error)
        
    }
}