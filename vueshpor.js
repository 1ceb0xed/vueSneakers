// - ВЫВОД СЧЕТЧИКА
// const CounterConst = {
//   data(){
//     return {
//       messageText: 0
//     }
//   },
//   mounted() {
//     setInterval(() => {
//       this.messageText++;
//     }, 100)
//   }
// }
// Vue.createApp(CounterConst).mount('#counterId')
// -------------------------
// V-ON  
// ПЕРЕВОРОТ ТЕКСТА и текст и кнопка находятся в одном div

{/* <div id="textMessageId">
    <p>{{ messageText }}</p>
    <button v-on:click = 'reverseMessage'>reverse this message
    </button>
  </div> */}

// const revmess = {
//   data(){
//     return{
//       messageText: "Привет пенис"
//     }
//   },
//   methods:{
//     reverseMessage(){
//       this.messageText = this.messageText
//         .split('')
//         .reverse()
//         .join('')
//     }
//   }
// }
// Vue.createApp(revmess).mount('#textMessageId')
//-------------------------------
//V-MODEL ПРИМЕР ВВОДА ТЕКСТА ИЗ ИМПУТА ОНЛАЙН

{/* <div id="VModelTest">
    <p>{{ messageText }}</p>
    <input v-model="messageText" />
  </div> */}

// const vmodel = {
//   data() {
//     return {
//       messageText: "Text"
//     }
//   }
// }
// Vue.createApp(vmodel).mount('#VModelTest')
///////////////////////////
// ref - для обработки чтения и тд значений и чего либо
// //import { ref } from 'vue'
// let count = ref(0)
// function increment() {
//   count.value++
// }
