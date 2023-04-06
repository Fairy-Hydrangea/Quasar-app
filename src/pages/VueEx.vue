<template class="q-pa-md q-gutter-md">
  <q-card-section>Message: {{ msg }}</q-card-section>
  <q-separator />
  <q-card-section>Using Text interpolation: {{ rawHtml }}</q-card-section>
    <q-card-section>Using v-html directive: <span v-html="rawHtml"></span></q-card-section>
    <q-separator />
  <q-card-section>
      <q-btn
        unelevated
        color="primary"
        type="a"
        target="_blank"
        v-bind:id="linkId"
        v-bind:href="link.to"
        :title="link.title"
        :label="link.label"
      ></q-btn>
  </q-card-section>
  <q-separator />
  <q-card-section>
    <q-btn :disable="isButtonDisabled" label="버튼 보이기"></q-btn>
  </q-card-section>
  <q-separator />
  <q-card-section>
    {{ number + 1 }}
  </q-card-section>
  <q-separator />
  <q-card-section>{{ ok ? "Yes" : "No" }}</q-card-section>
  <q-separator />
  <q-card-section>
    {{ Message.split("").reverse().join("") }}
  </q-card-section>
  <q-separator />
  <q-card-section :id="'list-${id}'">list-{{ id }}</q-card-section>
  <q-separator />
  <q-card-section class="text-h6">
    {{ calculateDate() }}
</q-card-section>
<q-separator />
<q-card-section v-if="!seen">Now You See me</q-card-section>
<q-card-section v-else>oh no!</q-card-section>
<q-separator />
<q-btn @click="awesome = !awesome" label="toggle"></q-btn>
<q-card-section v-if="awesome"> Vue is awesome! </q-card-section>
<q-card-section v-else> on no! </q-card-section>
<q-separator />
<q-card-section v-if="type == 'A'"> A </q-card-section>
<q-card-section v-else-if="type === 'B'"> B </q-card-section>
<q-card-section v-else-if="type === 'C'"> C </q-card-section>
<q-card-section v-else> Not A/B/C </q-card-section>
<q-separator />
<q-card-section>책을 가지고 있다: {{ pulisheBooksMessage }}</q-card-section>
<q-separator />
<q-card-section>책을 가지고 있다: {{ calculateBooksMessage() }}</q-card-section>
<q-separator />
<q-card-section class="text-h6">
  {{ toTitleDate }}
  {{ calculateDate() }}
</q-card-section>
<q-separator />
<q-card-section class="text-h6">
  {{ fullName }}
</q-card-section>
<q-separator />

<q-card-section :class="{active:isActive, 'text-3': hasError}">Change Color</q-card-section>
<q-separator />
<q-card-section class:="static" :class="{active:isActive, 'text-h3': hasError}">change Color</q-card-section>
  <div class="static active"></div>
<q-separator />
<q-card-section :class="classObject">change Color</q-card-section>
<q-separator />

<q-card-section :class="[activeClass, errorClass]">change Color</q-card-section>
<div class="active text-danger"></div>
<q-separator />

<q-card-section :class="[isActive ? activeClass :'', errorClass]">change Color</q-card-section>
<q-separator />

<q-card-section :class="[{active:isActive}, errorClass]"></q-card-section>
<q-separator />

<class-child></class-child>
<class-child :class="[baz, foo]"></class-child>
<class-child :class="{ active: isActive}"></class-child>
<div class="foo bar"></div>
<div class="foo bar baz boo"></div>
<div class="foo bar active"></div>

</template>

<script>
import { date } from "quasar";
import ClassChild from "components/ClassChild.vue";

  export default {
    name:'VueEx',
    title:"Vue Basic",
    components:{ClassChild},
    data(){
      return{
        msg: "Hello Vue",
        rawHtml: '<span style="color: red">빨간색이어야 합니다</span>',
        linkId: "vue",
        link: {
          to: "http://vuejs.org",
          title: "뷰 공식 사이트",
          label: "Vuejs.org",
        },
        isButtonDisabled: true,
        number: 1000,
        ok: true,
        Message:
          "지금까지 템플릿의 단순한 속성만 있었습니다.그러나 Vue는 실제로 모든 데이터가 내에서 Javascript 강화의 모든 기능을 지원합니다.",
        id: "Hydrangea",
        seen: true,
        awesome: true,
        type: "B",
        author: {
          name: 'John Doe',
          books: [
            'Vue 2 - Advanced Guide',
            'Vue 3 - Basic Guide',
            'Vue 4 - The Mystery'
          ]
        },
        str: '',
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        hasError: false,
        error: null,
        classObject: {
          active: true,
          'text-h3': false,
        },

        activeClass: 'active',
        errorClass: 'text-danger'
      }
    },
    computed:{
      // 계산된 값을 반환하는 속성
      pulisheBooksMessage() {
        // 'this'는 컴포넌트 인스턴스를 가리킴
        return this.author.books.length > 0 ? 'Yes' : 'No'
      },
      toTitleDate() {
        const timeStamp = Date.now();
        const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
        return formattedString;
      },

      fullName: {
        // getter
        get() {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set(newValue) {
          // 참고: 분해 할당 문법을 사용함.
          [this.firstName, this.lastName] = newValue.split(' ')
        }
      },

      classObj() {
        return {
          active: this.isActive && !this.error,
          'text-h3': this.error && this.error.type === 'fatal',
        }
      }
    },
    watch:{

    },
    mounted(){
      // 인스턴스 생성시 this.error 데이터 넣어서 에러처리
      this.error = {};
      this.error.type = 'fatal';
    },
    methods:{
      calculateDate() {
        setInterval(()=> {
          const timeStamp = Date.now();
          const formattedString = date.formatDate(timeStamp, "YYYY-MM-DD HH:mm");
          this.str = formattedString;
        }, 1000)
        return this.str; //binding 되는 변수 필요
      },
      calculateBooksMessage() {
        return this.author.books.length > 0 ? 'Yes' : 'No';
      },
    }
  }

</script>

<style scoped>
  .active{
    color:red;
  }
</style>
