<template>
    <div>
        <div class="popupEdit" v-show="isedit">
            <form v-if="islogin" class="wrap" @submit.prevent="handleServerEdit">   
                <div class="row">
                    <div class="col">   
                        <textarea v-model="commentEdit" class="form-control shadow" name="edit" id="edit" rows="3" placeholder="leave a comment..." required></textarea>
                    </div>
                </div>
                <div class="row mt-2">
                    <button type="submit" class="send btn btn-primary ">save</button>
                    <button @click="handleCancle" class="cancle btn btn-danger ">cancle</button>
                </div>
            </form>
        </div>
        <section class="comments">
            <form v-if="islogin" class="wrap" @submit.prevent="handleSubmit">   
                <div class="row">
                    <div class="col">   
                        <textarea v-model="form.comment" class="form-control shadow" name="comment" id="comment" rows="3" placeholder="leave a comment..." required></textarea>
                    </div>
                </div>
                <div class="row mt-2">
                    <button type="submit" class="send btn btn-primary ">send</button>
                </div>
            </form>

            <div class="wrap mt-4">
                <h4>Recent comments</h4>
                <div class="rcncomnt rounded shadow">
                    <div class="row justify-content-center mb-2" v-for="(comment, i) in comments" :key="i">
                        <div class="row justify-content-start mb-2">
                            <img :src="comment.profilePhoto" class="rounded-circle col-1" alt="">
                            <div class="col-9">
                                <h6> {{ comment.user }} </h6>
                                <p> {{ comment.comment }} </p>
                            </div>
                        </div>
                        <div v-if="islogin && comment.userId === user.id" class="row" :style="{borderBottom: '3px solid rgb(214, 214, 214)'}">
                            <button type="button" class="btn btn-primary mb-3 " @click="handleEdit(comment)">Edit</button>
                            <button type="button" class="btn btn-danger mb-3" @click="handleDelete(comment)">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return {
            comments: [],
            form: {
                comment: '',
                user: '',
                userId: '',
                stories: '',
                profilePhoto: '',
            },
            commentEdit: '',
            commentEditId: '',
            range: 0,
            isedit: false,
        }
    },
    props:{
        stories: String,
        user: Object,
        islogin: Boolean,
    },
    mounted(){
        setInterval(async ()=>{
            await this.$axios.get(`/rest/v1/comments?stories=eq.${this.stories}&order=created_at.asc&select=*`, {
                'headers':{
                    'apikey': this.user.token,
                    'Authorization': this.user.userToken,
                    'Range': `${this.range}-${this.range + 9}`,
                }
            }).then(res=>{
                this.comments = res.data;
                this.comments = this.comments.reverse();
            });
        }, 100)
    },
    methods:{
        async handleSubmit(){
            try {
                this.form.user = this.user.name;
                this.form.userId = this.user.id;
                this.form.stories = this.stories;
                this.form.profilePhoto = `https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${this.user.id}/profile/${this.user.image}`;
                await this.$axios.post('/rest/v1/comments',this.form,{
                    'headers':{
                        'apikey': this.user.token,
                        'Authorization': `Bearer ${this.user.userToken}`,
                    }
                });
            } catch (error) {
                console.log(error.message);
            }
        },
        async handleServerEdit(){
            try {
                await this.$axios.patch(`/rest/v1/comments?id=eq.${this.commentEditId}`,{
                    comment: this.commentEdit,
                    user: this.user.name,
                    userId: this.user.id,
                    stories: this.stories,
                    profilePhoto: `https://wytinjsgermcnjpcupns.supabase.co/storage/v1/object/public/storiesoi/${this.user.id}/profile/${this.user.image}`,
                },{
                    'headers':{
                        'apikey': `${this.user.token}`,
                        'Authorization': `Bearer ${this.user.userToken}`,
                    },
                });
            } catch (error) {
                console.log(error.message);
            }
            this.commentEdit = '';
            this.commentEditId = '';
            this.isedit = false;
        },
        async handleDelete(data){
            try {
                await this.$axios.delete(`/rest/v1/comments?id=eq.${data.id}`,{
                    'headers':{
                        'apikey': `${this.user.token}`,
                        'Authorization': `Bearer ${this.user.userToken}`,
                    },
                });
            } catch (error) {
                console.log(error.message);
            }
        },
        handleEdit(data){
            this.commentEdit = data.comment;
            this.commentEditId = data.id;
            this.isedit = true;
        },
        handleCancle(){
            this.commentEdit = '';
            this.commentEditId = '';
            this.isedit = false;
        },
    }
}
</script>

<style scoped>
    .col{
        padding: 0%;
        margin: 0%;
    }
    .send{
        width: auto;
    }
    #comment{
        width: 100%;
        height: fit-content;
        background-color: whitesmoke;
    }
    .wrap{
        width: 100%;
        height: auto;
        padding: 0%;
        margin: 0%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: left;
    }
    .rcncomnt{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: whitesmoke;
        padding: 2%;
    }
    .row{
        width: 100%;
    }

    h4{
        width: 100%;
    }
    button{
        width: fit-content;
        margin-right: 2%;
    }
    img{
        padding: 0%;
        width: 3rem;
        height: 3rem;
    }
    .popupEdit{
        position: absolute;
        width: 100vw;
        height: 100vh;
        background-color: #00000066;
        top: calc(50% - 50vh);
        left: calc(50% - 50vw);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .popupEdit .wrap{
        width: 50%;
    }
</style>