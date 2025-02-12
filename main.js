
const CounterConst = {
  data(){
    return {
      messageText: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.messageText++;
    }, 100)
  }
}
Vue.createApp(CounterConst).mount('#counterId')
const revmess = {
  data(){
    return{
      messageText: "Привет пенис"
    }
  },
  methods:{
    reverseMessage(){
      this.messageText = this.messageText
        .split('')
        .reverse()
        .join('')
    }
  }
}
Vue.createApp(revmess).mount('#textMessageId')
const vmodel = {
  data() {
    return {
      messageText: "Text"
    }
  }
}
Vue.createApp(vmodel).mount('#VModelTest')

