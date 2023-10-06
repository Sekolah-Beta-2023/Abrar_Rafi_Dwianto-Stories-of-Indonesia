export const state = ()=>({
    user: {
        name: 'Abrar Rafi',
        id: 'bhvhjvvjhvhvvjvjhvjhvjhvyfuguyghjbvj',
        image: require('@/static/img/bedawang.jpg'),
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGluanNnZXJtY25qcGN1cG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1MTY2NjAsImV4cCI6MjAxMTA5MjY2MH0.rzWwsADWDWlMoG8FAqRGi_axGHX9PNhENhXBMgbZuto'
    },
})

export const mutation = {
    SIGN_UP(state, data){
        this.$axios.post('/auth/vi/signup', data,{
            'headers': {
                'apikey': state.user.token,
            }
        })
    },
    LOG_IN(state,data){

    }
}

export const action = {
    signUp(context,data){
        context.commit('SIGN_UP', data);
    },
    logIn(context,data){
        context.commit('LOG_IN', data);
    }
}

export const getters = {
    getUserData: (state)=>{
        return state.user;
    },
    signUP: async (action, data)=>{

        await action.dispatch('signUp', data);
    },
    logIn: async (action, data)=>{
        await action.dispatch('logIn', data);
    }
}


