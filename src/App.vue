<template>
  <div id="app">
    <header>
      <i v-if="!drawer" class="iconfont icon-menu" @click="more()"></i>
      <i v-if="drawer" class="iconfont icon-back" @click="back()"></i>
    </header>
    <transition name="fade">
      <aside v-show="open">
        <ul>
          <li :class="{chose:num == 1}" @click="change(1)"><span>首页</span></li>
          <li :class="{chose:num == index+2}" v-for="(x, index) in list" @click="change(index+2,x.id)">
            <span>{{x.name}}</span>
          </li>
        </ul>
        <i class="iconfont icon-close" @click="more()"></i>
      </aside>
    </transition>
    <keep-alive>
      <router-view class="app-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from './api/index';
export default {
  computed: {
    ...mapState({
      drawer: state => state.drawer,
      top: state => state.top,
    })
  },
  data() {
    return {
      num: 1,
      list: '',
      open: false,
    }
  },
  mounted: function () {
    const vue = this;
    api.getTopics().then(function (data) {
      const result = JSON.parse(data.request.response);
      vue.list = result.THEMES.others;
    });
  },
  methods: {
    more() {
      if (!this.open) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
    back(x) {
      if (x) {
        this.$router.push({
          path: 'home'
        });
      } else {
        window.history.back()
      }
    },
    change(n, id) {
      this.num = n;
      this.open = false;
      let path = n == 1 ? 'home' : 'theme';
      this.$router.push({
        path: path,
        query: {
          id: id || ""
        }
      });
      this.$store.commit('changeNum', n);
    },
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.app-view {
  z-index: 1;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: absolute;
  transition: transform 0.3s ease;
  -webkit-overflow-scrolling: touch;
}

header {
  z-index: 9;
  padding-left: 5%;
  width: 100%;
  height: 1.5rem;
  position: fixed;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.51) 95%);
  color: #fff;
  i {
    line-height: 1.5rem;
    font-size: 0.6rem;
  }
}

aside {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 18;
  background-image: linear-gradient(-180deg, #F5F7FA 0%, #C3CFE2 100%);
  ul {
    margin: 0;
    float: left;
    width: 100%;
    padding: 0.3rem 0.8rem 0.5rem;
    overflow: auto;
  }
  li {
    list-style: none;
    font-size: 0.43rem;
    margin-top: 20px;
    color: #666666;
    &.chose {
      color: #A1C4FD;
    }
  }
  .icon-close {
    position: absolute;
    font-size: 0.8rem;
    bottom: 8%;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

.backtoTop {
  position: fixed;
  right: 5%;
  bottom: 1rem;
  z-index: 1;
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

@media screen and (min-width: 640px) {
  .app-view {
    width: 640px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  aside ul {
    width: 350px;
  }
}
</style>
