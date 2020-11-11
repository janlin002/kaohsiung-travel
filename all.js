let app = new Vue({
  el: "#app",
  data: {
      data:[],
      currentPage:0 ,//目前果在頁數
      locations:[],
      currentLocation:''
  },
  computed: {
      filterData(){
        const vm=this;
        //過濾
        let items=[];
        if(vm.currentLocation !== ''){
            items=vm.data.filter(function(item,i){
                return item.Zone == vm.currentLocation
            })
        }else{
            items=vm.data
        }


        //分頁
        const newData=[];
          console.log(vm.currentLocation)
          items.forEach(function(item,i){
              if(i % 10 === 0){
                  newData.push([])
              }
              const page=parseInt(i/10);
              newData[page].push(item)
          })
          console.log(newData);
          return newData;
      }
  },
  methods: {
      geyUniqueList(){
          //確保地區只顯示一次
          const vm=this;
          const locations =new Set();//陣列不得重複
          vm.data.forEach(function(item,i){
              locations.add(item.Zone);
          })
          console.log(locations);
          vm.locations=Array.from(locations);
      }
  },
  created() {
      const vm=this;
    axios
      .get("https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json")
      .then(function (response) {
        console.log(response);
        console.log(vm);
        vm.data=response.data.result.records;
        console.log(vm.data);
        vm.geyUniqueList();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
});
