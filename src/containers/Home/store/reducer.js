const defaultState = {
    name:'jack',
    newsList: []
}

export default (state = defaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}