<template>
    <div>
        <pacman v-if="!list"></pacman>
        <div v-if="list" class="title">
            <img :src="list.background">
            <div></div>
            <h3><p>{{list.description}}</p>
                <p>{{list.name}}</p></h3>
        </div>
        <div class="list">
            <div class="listCon" v-for="x in list.stories" @click="go(x.id)">
                <img v-if="x.images" :src="x.images[0]">
                <p>{{x.title}}</p>
            </div>
        </div>
            <scroll v-show="top"></scroll>
    </div>
</template>

<script>
import api from '../api/index.js'
import { mapState } from 'vuex';
export default {
    name: 'theme',
    computed: {
        ...mapState({
            num: state => state.num,
            top:state => state.top,
        })
    },
    data() {
        return {
            list: "",
        }
    },
    mounted: function () {
        this.getTopicsList();
    },
    watch: {
        num: function () {
            this.getTopicsList();
        }
    },
    methods: {
        go(id) {
            this.$router.push({
                path: "content",
                query: {
                    id: id
                }
            });
        },
        getTopicsList() {
            this.list = "";
            const vue = this;
            api.getTopicsById(this.$route.query.id).then(function (data) {
                const result = JSON.parse(data.request.response);
                vue.list = result.THEMEDES;
                document.querySelector('.app-view').scrollTop = 0;
            });
        }
    }
}
</script>

<style lang="scss" scope>
.title {
    width: 100%;
    height: 8rem;
    overflow: hidden;
    position: relative;
    div {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.4;
        position: absolute;
        background-color: #5B7492;
    }
    img {
        top: 50%;
        width: 100%;
        position: relative;
        transform: translate(0, -50%);
    }
    h3 {
        width: 70%;
        color: #fff;
        margin: 0;
        font-size: 0.5rem;
        line-height: 1rem;
        right: 5%;
        bottom: 1.6rem;
        text-align: right;
        position: absolute;
        text-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
        &:before {
            content: "";
            width: 3rem;
            bottom: 1.2rem;
            right: 0;
            display: block;
            position: absolute;
            height: 4px;
            background: linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 95%);
        }
        p {
            margin: 0;
        }
        p:first-child {
            margin-bottom: .5rem;
        }
    }
}

.list {
    width: 90%;
    z-index: 1;
    position: relative;
    margin: .3rem auto 0;
    .listCon {
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(142, 197, 252, 0.30);
        border-radius: 12px;
        padding: 0.3rem;
        margin: 0.4rem auto 0.4rem;
        display: flex;
        img {
            width: 2rem;
            min-width: 2rem;
            margin-right: 0.4rem;
        }
        p {
            font-size: 0.4rem;
            color: #5B7492;
        }
    }
}
</style>