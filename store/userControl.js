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
        state.islogin = true;
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
                // avoid cookies save by supabase
                document.cookie=`sb-access-token=; expires=${new Date(0).toUTCString()}`;
                document.cookie=`sb-refresh-token=; expires=${new Date(0).toUTCString()}`;
            });
        } catch (error) {
            console.log(error.message);
        }
    },

    async logIn(context,data){
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
                
                context.commit('SET_USER_STORE', user);
                context.commit('LOG_IN');
                // set cookies
                document.cookie = `sb-refresh-token=; expires=${new Date(0).toUTCString()}`;
                const date = new Date();
                date.setTime(date.getTime() + 60*60*24*1000);
                document.cookie = `id=${this.state.userControl.user.id};expires=${date.toUTCString()};path=/`;
                document.cookie = `acc=${this.state.userControl.user.userToken};expires=${date.toUTCString()};path=/`;
            });
        } catch (error) {
            console.log(error.message);
            return 'Invalid email or password';
        }
    },

    async checkIsLogin(context){
        const cookie = document.cookie.split(';');
        const cookieData = {...this.state.userControl.user}
        
        cookie.forEach(itm=>{
            const itmData = itm.trim().split('=');
            if (itmData[0] === 'id' && (itmData[1] !== '' || itmData[1] !== null)){
                cookieData.id = itmData[1];
            }
            else if (itmData[0] === 'acc' && (itmData[1] !== '' || itmData[1] !== null)){
                console.log(itmData[1]);
                cookieData.userToken = itmData[1];
            }else{
                return false;
            }
        });

        const userData = await context.dispatch('getUserFromServer', cookieData);
        if (userData !== undefined) {
            cookieData.name = userData.username;
            cookieData.image = userData.image;
            cookieData.bio = userData.bio;
        }else{
            return false;
        }

        context.commit('SET_USER_STORE', cookieData);
        return true;
    },

    
    // ---------------------------system---------------------------
    async updateStore(context, data){
        const storeData = {...this.state.userControl.user}
        const dtserver = await context.dispatch('getUserFromServer', data);
        storeData.name = dtserver.username;
        storeData.image = dtserver.image;
        storeData.bio = dtserver.bio;
        
        context.commit('SET_USER_STORE', storeData);
    },
    
    async createUserData(context, data){
        try {
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
            console.log(error.message);
        }
    },

    async getUserFromServer(context,identity={id: this.state.userControl.user.id, userToken: this.state.userControl.user.userToken}){
        try {
            let resdata;
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
            console.log(error.message);
            document.cookie=`sb-access-token=; expires=${new Date(0).toUTCString()}`;
            document.cookie=`sb-refresh-token=; expires=${new Date(0).toUTCString()}`;
        }
    }
}


