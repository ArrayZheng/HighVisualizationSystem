<template>
  <div class="hello">
  	<pie-ec></pie-ec>
    <h1>{{ msg }}</h1>
    <h2>Essential Links!!!!!! {{ author }}</h2>
    <div class="">
    <input v-if="click" placeholder="please input your name" @keyup.enter="change" v-model="input"/>
    <button @click="showInput">commit</button>
    	<p>{{ local }}</p>
    	<p>{{ storeValue }}</p>
    </div>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
	import PieEc from './common/ec/PieEc'
	import store from '../vuex/store.js'
	import { mapState } from 'vuex'
	export default {
	  name: 'hello',
	  data () {
	    return {
	      msg: 'Welcome to Your Vue.js App',
	      click:false,
	      input:''
	    }
	  },
	  computed : {
	  	local(){
	  		return "this is a local value";
	  	},
	  	storeValue(){
	  		return this.$store.state.hehe
	  	},
	  	...mapState([
	  		'author',
	  		'bar4HorData',
	  		'barVerData',
	  		'pieData',
	  		'pie3Data',
	  		'pieSemiData']
	  )
	  },
	  components:{
	  	PieEc
	  },
	  methods:{
	  	init(){
	  		console.log("mounted");
	  	},
	  	showInput(){
	  	var f1=function(callback){
	  		setTimeout(function(){
	  			console.log("this.is f1");
	  			callback();
	  		},0)
	  	};
	  	var f2=function(){
	  		console.log("this is f2");
	  	};
	  	var f3=function(){
	  		console.log('this is f3')
	  	}
	  		if(this.click)
	  			this.click=false;
	  		else{
	  			this.click=true;
	  		}
	  		/*console.log(this.bar4HorData);
	  		console.log(this.barVerData);
	  		console.log(this.pieData);
	  		console.log(this.pie3Data);
	  		console.log(this.pieSemiData)*/
	  		f1(f2);
	  		f3();
	  		
	  	},
	  	change(){
	  		this.click=true;
	  		console.log(this);
	  		this.$store.commit('setRandomData',2000);
	  		
	  	}
	  },
	  mounted(){
	  	this.init();
	  }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello{
		color:#000
	}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
