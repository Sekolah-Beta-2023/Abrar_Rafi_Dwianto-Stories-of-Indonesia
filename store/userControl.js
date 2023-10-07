export const state = ()=>({
    user: {
        name: 'user',
        id: '',
        image: '',
        bio:'',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGluanNnZXJtY25qcGN1cG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1MTY2NjAsImV4cCI6MjAxMTA5MjY2MH0.rzWwsADWDWlMoG8FAqRGi_axGHX9PNhENhXBMgbZuto',
        userToken: ''
    },
    message: false,
    islogin: false,
})

export const mutations = {
    LOG_IN(state){
        state.islogin = true;
        this.$router.push('/explore');
    },
    SET_USER_STORE(state, data){
        const user = data;

        state.user = {
            name: user.name,
            id: user.id,
            image: user.image,
            bio: user.bio,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGluanNnZXJtY25qcGN1cG5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU1MTY2NjAsImV4cCI6MjAxMTA5MjY2MH0.rzWwsADWDWlMoG8FAqRGi_axGHX9PNhENhXBMgbZuto',
            userToken: user.userToken,
        }

        console.log(state.user);
    }
}

export const actions = {
    async signUp(context,data){
        try {
            await this.$axios.post('/auth/v1/signup', {
                email: data.email,
                password: data.password,
            },{
                'headers': {
                    'apikey': this.state.userControl.user.token,
                }
            }).then(async(res)=>{
                await context.dispatch('createUserData', res.data);
            });
        } catch (error) {
            console.log(error);
        }
    },

    async logIn(context,data){
        console.log('run');
        try {
            await this.$axios.post('/auth/v1/token?grant_type=password', {
                email: data.email,
                password: data.password,
            },{
                'headers': {
                    'apikey': this.state.userControl.user.token,
                }
            }).then(async res=>{
                const data = res.data;
                const user = {...this.state.userControl.user};

                user.id = data.user.id;
                user.userToken = data.access_token;

                const userData = await context.dispatch('getUserFromServer', user);
                
                user.name = userData.username;
                user.image = userData.image;
                user.bio = userData.bio;
                
                console.log(user);
                context.commit('SET_USER_STORE', user);
                console.log(this.state.userControl.user);
                context.commit('LOG_IN');
            });
        } catch (error) {
            console.log(error);
            return 'Invalid email or password';
        }
    },

    async updateStore(context, data){
        const storeData = {...this.state.userControl.user}
        const dtserver = await context.dispatch('getUserFromServer', data);
        
        storeData.name = dtserver.username;
        storeData.image = dtserver.image;
        storeData.bio = dtserver.bio;
        
        console.log(storeData);
        context.commit('SET_USER_STORE', storeData);
    },

// ---------------------------system---------------------------

    async createUserData(context, data){
        try {
            console.log(data);
            await this.$axios.post('/rest/v1/users', {
                id: data.user.id,
                username: 'user',
            },{
                'headers': {
                    'apikey': this.state.userControl.user.token,
                    'Authorization': `Bearer ${data.access_token}`,
                }
            }).then(()=>{
                this.$router.push('/logIn');
            })
        } catch (error) {
            console.log(error);
        }
    },

    async getUserFromServer(context,identity={id: this.state.userControl.user.id, userToken: this.state.userControl.user.userToken}){
        try {
            let resdata;
            console.log(identity);
            await this.$axios.get(`/rest/v1/users?id=eq.${identity.id}&select=*`,{
                'headers': {
                    'apikey': this.state.userControl.user.token,
                    'Authorization': `Bearer ${identity.userToken}`,
                }
            }).then((ress)=>{
                resdata = ress.data[0];
            })
            return resdata;
        } catch (error) {
            console.log(error);
        }
    }
}


