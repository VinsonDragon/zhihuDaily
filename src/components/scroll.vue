<template>
    <a class="backtoTop" @click="backtoTop()"><i class="iconfont icon-rocket"></i></a>
</template>

<script>
export default {
    name: 'scroll',
    mounted: function () {
        this.$nextTick(function () {
            document.querySelector('.app-view').addEventListener('scroll', this.needtoTop);
        })
    },
    methods: {
        backtoTop() {
            document.querySelector('.app-view').scrollTop = 0;
        },
        needtoTop: function () {
            let curHeight = document.querySelector('.app-view').scrollTop;
            let viewHeight = document.documentElement.clientHeight;
            if (curHeight > viewHeight) {
                this.$store.commit('topShow', 1);
            } else {
                this.$store.commit('topShow');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.backtoTop {
    position: fixed;
    right: 5%;
    bottom: 5%;
    z-index: 3;
    background: #fff;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    border: none;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.50);
    i {
        font-size: 0.5rem;
        position: absolute;
        top: 52%;
        transform: translate(-50%, -50%);
        left: 52%;
    }
}
</style>
