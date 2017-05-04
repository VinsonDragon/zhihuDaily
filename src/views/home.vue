<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- 轮播图 -->
      <swiper-slide @click.native="go(x.id)" v-for="x in tops" :key="x.id">
        <img :src="x.image">
        <div></div>
        <h3>{{x.title}}</h3>
      </swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="list" v-for="x in list">
      <div class="listTime">{{x.date.substring(0,4)+" / "+x.date.substring(4,6)+" / "+x.date.substring(6,8)}}</div>
      <div class="listCon" v-for="y in x.stories" @click="go(y.id)">
        <img :src="y.images[0]">
        <p>{{y.title}}</p>
      </div>
    </div>
    <transition name="fade">
      <pacman v-show="refresh"></pacman>
    </transition>
    <a v-show="!refresh" class="moreButton" @click="getMoreNews()">更多</a>
    <scroll v-show="top"></scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import api from '../api/index';
export default {
  computed: {
    ...mapState({
      top: state => state.top
    })
  },
  name: 'home',
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
      },
      tops: '',
      date: '',
      list: [],
      refresh: true
    }
  },
  mounted: function () {
    const vue = this;
    api.getNews().then(function (data) {
      let result = JSON.parse(data.request.response);
      vue.list.push(result.STORIES);
      vue.tops = result.STORIES.top_stories;
      vue.date = result.STORIES.date;
      vue.refresh = false;
    });
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
    getMoreNews() {
      const vue = this;
      vue.refresh = true;
      api.getNewsByDate(this.date).then(function (data) {
        const result = JSON.parse(data.request.response);
        vue.list.push(result.STORIES);
        vue.date = result.STORIES.date;
        vue.refresh = false;
      });
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.app-view {
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    height: 8rem;
    overflow: hidden;
    position: relative;
  }
  .swiper-container-horizontal>.swiper-pagination-bullets {
    bottom: 1rem;
    width: 95%;
    text-align: right;
  }
}

.swiper-slide {
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
    bottom: 2.6rem;
    text-align: right;
    position: absolute;
    text-shadow: 1px 1px 10px rgba(0, 0, 0, .5);
    &:before {
      content: "";
      width: 3rem;
      bottom: -0.6rem;
      right: 0;
      display: block;
      position: absolute;
      height: 4px;
      background: linear-gradient(90deg, rgba(161, 196, 253, 1) 0%, rgba(194, 233, 251, 1) 95%);
    }
  }
}

.swiper-pagination-bullet-active {
  background: #fff;
}

.list {
  width: 90%;
  z-index: 1;
  position: relative;
  margin: .3rem auto 0;
  .listTime {
    width: 100%;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.5rem;
    background-image: linear-gradient(-180deg, #E0C3FC 0%, #8EC5FC 100%);
    box-shadow: 0 1px 5px 0 #8EC5FC;
    border-radius: 100px;
    color: #FFFFFF;
    margin-top: 0.4rem;
  }
  .listCon {
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(142, 197, 252, 0.30);
    border-radius: 12px;
    padding: 0.3rem;
    margin-top: 0.4rem;
    align-items: center;
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
  +.pacman {
    margin-top: 0.5rem;
  }
}

.moreButton {
  width: 90%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 0.45rem;
  background-image: linear-gradient(-180deg, #E0C3FC 0%, #8EC5FC 100%);
  box-shadow: 0 1px 5px 0 #8EC5FC;
  border-radius: 100px;
  color: #FFFFFF;
  margin: .4rem auto 0.4rem;
  border: none;
  display: block;
}
</style>
