<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" plain @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" :src="getImgSrc('user')" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from "vue-demi";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store = useStore();
    const getImgSrc = (user) => {
      return new URL(`../assets/images/${user}.png`, import.meta.url).href;
    };
    const handleCollapse = () => {
      store.commit('updateIsCollapse')
    };

    const current = computed(() => {
      return store.state.currentMenu;
    });

    const router = useRouter();

    const handleLoginOut = () => {
      store.commit("cleanMenu");
      store.commit("clearToken");
      router.push({
        name: 'login'
      });
    }
    return {
      getImgSrc,
      handleCollapse,
      current,
      handleLoginOut
    };
  }
}

</script>
<style lang="less" scoped>
header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-content{
  .el-dropdown-link:focus{
    outline: none;
  }
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
  h3{
    color: #fff;
  }
}
:deep(.bread span) {
  color:#fff !important;
  cursor: pointer !important;
}
</style>
