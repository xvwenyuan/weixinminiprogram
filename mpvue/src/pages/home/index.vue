<template>
  <div>
    <ul>
      <li v-for="data in goodsList" :key="data.goods_id">
        <div>
          <img :src="data.goods_url">
          <span>{{data.goods_name}}</span>
        </div>
          
      </li>
    </ul>
    <!-- <ul>
      <li v-for="data in goodsList" :key="data.goods_id">
        {{data.goods_id}}
        {{data.goods_url}}

      </li>
    </ul> -->
   
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      goodsList:[]
  
    }
  },
  mounted () {
    this.$http.get('/goods').then(res => {
      this.goodsList = res.data
      console.log(this.goodsList,typeof res.data)
    });
  // wx.request({
  //   url: 'http://localhost:3000/goods', 
  //   data: {},
  //   success: res=>{
  //     this.goodsList = res.data
  //     console.log(this.goodsList)
  //   }
    
  // })
  }
}

    
</script>

<style scoped lang="scss">
li{
  div{
    width: 200px;
    overflow: hidden;
    img{
      width: 200px;

    }
  }
}

</style>
