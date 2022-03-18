<template>
  <div class="home-container">
    <!-- fixed固定到头部 -->

    <van-nav-bar title="头条" :fixed="true" />

    <!-- 上拉刷新 -->
    <van-pull-refresh
      v-model="isloading"
      @refresh="onRefresh"
      :disabled="finished"
      :success-text="succesed"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 导入注册，并使用ArticleInfo组件 -->

        <ArticleInfo
          v-for="item in artlist"
          :key="item.id"
          :title="item.title"
          :author="item.aut_name"
          :pubdate="item.pubdate"
          :comments="item.comm_count"
          :cover="item.cover"
        ></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
//导入request

//按需导入
import { getAListAPI } from "@/api/articleAPI.js";
import ArticleInfo from "@/components/Article/ArticleInfo.vue";
export default {
  name: "Home",
  data() {
    return {
      //页码值
      page: 1,
      //每页显示多少数据
      limit: 10,
      //文章数组
      artlist: [],
      //是否正在加载下一页 为true就不会反复刷新
      loading: true,
      //所有数据是否加载完，如果没有更多的数据，一定要把finished改成true
      finished: false,
      //是否正在下来刷新
      isloading: false,
      succesed: "刷新成功",

      themeVars: {
        navBarBackgroundColor: "skyblue",
      },
    };
  },
  methods: {
    //封装获取列表数据的方法
    async Arlist(isRefresh) {
      console.log("成功");
      //发送GET请求，并且传递请求参数
      const { data: res } = await getAListAPI(this.page, this.limit);
      //如果下拉加载更多，应该是
      //this.artlist = [新数据在前，旧数据在后]
      // this.artlist = res;
      if (isRefresh) {
        this.artlist = [...res, ...this.artlist];
        //拿到数据就结束刷新
        this.isloading = false;
      } else {
        //如果上拉加载更多，应该是
        //this.artlist = [旧数据在前，新数据在后]
        this.artlist = [...this.artlist, ...res];
        this.loading = false;
      }
      //拿到第一页数据才出发

      if (res.length === 0) {
        //证明没有下一页shujule
        this.finished = true;
      }
    },
    //只要onload被触发就请求下一页数据
    onLoad() {
      console.log("出发了");
      //让页码+1
      this.page++;
      //请求接口重新获取数据
      this.Arlist();
    },
    //下拉刷新处理函数
    onRefresh() {
      this.page++;
      this.Arlist(true);
    },
  },
  created() {
    this.Arlist();
  },
  components: {
    ArticleInfo,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
}

:root {
  --van-nav-bar-background-color: blue;
}
</style>
