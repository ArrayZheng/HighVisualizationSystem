import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//定义状态
	state:{
		author:'zhengm',
		hehe :'this is from store',
		pieSemiData:[{name:'Despanchado',value:327},{name:'Procesando',value:96},{name:'Esperando',value:58}],
		pieData:[{name:'Policía',value:Math.ceil(100*Math.random())},{name:'Bomberos',value:Math.ceil(100*Math.random())},{name:'tráfico',value:Math.ceil(100*Math.random())},{name:'Médicols',value:Math.ceil(100*Math.random())}],
		pie3Data:[{name:'Normal',value:50+(Math.ceil(50*Math.random()))},{name:'Inválido',value:50+(Math.ceil(50*Math.random()))},{name:'Consulta',value:50+(Math.ceil(50*Math.random()))}],
		bar4HorData:[{name:'Policía',value:Math.ceil(10180*Math.random())},{name:'Bomberos',value:Math.ceil(8990*Math.random())},{name:'tráfico',value:Math.ceil(960*Math.random())},{name:'Médicols',value:Math.ceil(43300*Math.random())}],
		barVerData:[{name:'Area1',value:(Math.ceil(Math.random()*100))},{name:'Area2',value:(Math.ceil(Math.random()*100))},{name:'Area3',value:(Math.ceil(Math.random()*100))},
					{name:'Area4',value:(Math.ceil(Math.random()*100))},{name:'Area5',value:(Math.ceil(Math.random()*100))}],
		
		
		
		general:{
			notice:{
				title:'Notificación',
				content:'Mañana el alcalde va a venir a vistar, por favor,prendas de vestir formalmente,de llegar atiempo al trabajo.'
			}
		}
	},
	mutations:{
		setRandomData : function(state,time){
			setTimeout(function(){
				state.pieSemiData=[{name:'Despanchado',value:327},{name:'Procesando',value:96},{name:'Esperando',value:58}];
				state.pieData=[{name:'Policía',value:Math.ceil(100*Math.random())},{name:'Bomberos',value:Math.ceil(100*Math.random())},{name:'tráfico',value:Math.ceil(100*Math.random())},{name:'Médicols',value:Math.ceil(100*Math.random())}];
				state.pie3Data=[{name:'Normal',value:50+(Math.ceil(50*Math.random()))},{name:'Inválido',value:50+(Math.ceil(50*Math.random()))},{name:'Consulta',value:50+(Math.ceil(50*Math.random()))}];
				state.bar4HorData=[{name:'Policía',value:Math.ceil(10180*Math.random())},{name:'Bomberos',value:Math.ceil(8990*Math.random())},{name:'tráfico',value:Math.ceil(960*Math.random())},{name:'Médicols',value:Math.ceil(43300*Math.random())}],
				state.barVerData=[{name:'Area1',value:(Math.ceil(Math.random()*100))},{name:'Area2',value:(Math.ceil(Math.random()*100))},{name:'Area3',value:(Math.ceil(Math.random()*100))},
							{name:'Area4',value:(Math.ceil(Math.random()*100))},{name:'Area5',value:(Math.ceil(Math.random()*100))}];
					},time)
		},
		setGeneral:function(state,data){
			state.general=data;
		}
	}
})

export default store