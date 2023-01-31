import * as UserApi from "../api/userRequest"

export const updateUser = (id, formData) => async (dispatch) => {
    console.log(id, formData, 'id and form data ausrAcdtion.........')
    dispatch({ type: "UPDATING_START" })
    try {
        const { data } = await UserApi.updateUser(id, formData);
        console.log(data, 'data.......ata ustrAtctin')
        dispatch({ type: "UPDATING_SUCCESS", data: data })
    } catch (error) {
        dispatch({ type: "UPDATING_FAIL" })
    }

}
export const followUser = (id, data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER", data: id })
    UserApi.followUser(id, data)
}

export const unFollowUser = (id, data) => async (dispatch) => {
    dispatch({ type: "UNFOLLOW_USER", data: id })
    UserApi.unFollowUser(id, data)
}