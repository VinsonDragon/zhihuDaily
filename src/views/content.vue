<template>
    <div class="content-page">
        <pacman v-if="!data"></pacman>
        <div v-if="data.image" class="contentImg">
            <img :src="data.image">
            <p>{{data.title}}</p>
        </div>
        <div class="contentBody" v-html="data.body"></div>
        <scroll v-show="top"></scroll>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../api/index'
export default {
    computed: {
        ...mapState({
            top: state => state.top
        })
    },
    name: 'content',
    data() {
        return {
            data: '',
        }
    },
    activated: function () {
        const vue = this;
        api.getNewsById(this.$route.query.id).then(function (data) {
            const result = JSON.parse(data.request.response);
            vue.data = result.CONTENTS;
        });
    },
    deactivated: function () {
        this.data = ''
    },
}
</script>

<style lang="scss">
.content-page {
    width: 100%;
    height: 100%;
    overflow: auto;
    .contentImg {
        height: 6rem;
        overflow: hidden;
        position: relative;
        img {
            top: 50%;
            width: 100%;
            position: relative;
            transform: translate(0, -50%);
            filter: blur(4px)
        }
        p {
            width: 70%;
            margin: 0;
            padding: 0;
            right: 5%;
            bottom: 1rem;
            text-align: right;
            font-size: 0.5rem;
            color: rgba(255, 255, 255, .9);
            position: absolute;
            text-shadow: 0 0 5px rgba(0, 0, 0, .5);
        }
    }
    .contentBody {
        color: #666666;
        padding: 5%;
        position: relative;
        h2,
        li,
        p {
            text-align: justify!important;
        }
        h2 {
            color: #606d80;
            position: relative;
            z-index: 1;
        }
        a {
            color: #8EC5FC;
            word-break: break-word;
        }
        img {
            width: 100%;
        }
        p {
            font-size: .3rem;
        }
        .headline-title {
            color: #3761bd;
        }
        .meta {
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .avatar {
                vertical-align: middle;
                display: inline-block;
                width: 0.6rem;
                margin-right: 0.1rem;
            }
            span {
                color: #666;
            }
            .author {
                color: #8EC5FC;
                display: inline-table;
            }
        }
        .content {
            font-size: 0.35rem;
        }
        .question {
            blockquote {
                text-align: justify;
                position: relative;
                &::before {
                    content: '';
                    left: -.5rem;
                    display: block;
                    height: 100%;
                    border-left: .1rem solid #8EC5FC;
                    position: absolute;
                }
            }
            &:first-child {
                padding-top: 0;
            }
            &:last-child {
                padding-bottom: 0;
                &::before {
                    display: none;
                }
            }
            ul {
                padding-left: 0.3rem;
                li {
                    text-align: left;
                }
            }
        }
        .content-image {
            max-width: 100%;
        }
        .view-more {
            text-align: center;
            margin-bottom: .5rem;
            a {
                z-index: 1;
                position: relative;
            }
        }
    }
}
</style>