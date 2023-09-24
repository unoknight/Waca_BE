(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13755adf"],{6070:function(n,t,o){"use strict";o("cfa0")},"93f5":function(n,t,o){"use strict";o.r(t);var a=function(){var n=this,t=n._self._c;return t("div",{attrs:{id:"loading-demo"}},[t("loading-default"),t("loading-type"),t("loading-color"),t("loading-background"),t("loading-contained")],1)},e=[],i=function(){var n=this,t=n._self._c;return t("vx-card",{attrs:{title:"Default","code-toggler":""}},[t("p",[n._v("To add a loading in any part of your application we have the global function "),t("code",[n._v("$vs.loading()")]),n._v(", and then when you want to remove it we have "),t("code",[n._v("$vs.loading.close()")])]),t("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[t("p",[n._v("For the examples, the request or the delay is simulated with "),t("code",[n._v("setTimeout")])])]),t("div",{staticClass:"mt-5"},[t("vs-button",{attrs:{type:"filled",color:"primary"},on:{click:n.openLoading}},[n._v("Loading Default")])],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="demo-alignment">\n    <vs-button @click="openLoading" type="filled" color="primary">Loading Default</vs-button>\n  </div>\n</template>\n\n<script>\nexport default {\n  methods:{\n    openLoading(){\n      this.$vs.loading()\n      setTimeout( ()=> {\n        this.$vs.loading.close()\n      }, 2000);\n    },\n  }\n}\n<\/script>\n        ')])],2)},l=[],s={methods:{openLoading:function(){var n=this;this.$vs.loading(),setTimeout((function(){n.$vs.loading.close()}),2e3)}}},d=s,c=o("2877"),r=Object(c["a"])(d,i,l,!1,null,null,null),g=r.exports,u=function(){var n=this,t=n._self._c;return t("vx-card",{attrs:{title:"Type","code-toggler":""}},[t("p",[n._v("You can change the type of animation with the type property and the animations so far are:")]),t("div",{staticClass:"demo-alignment"},[t("div",{staticClass:"fill-row-loading"},n._l(n.types,(function(o){return t("div",{key:o,staticClass:"vs-con-loading__container loading-example",class:{activeLoading:n.activeLoading},attrs:{id:["loading-".concat(o)]},on:{click:function(t){return n.openLoading(o)}}})})),0)]),t("template",{slot:"codeContainer"},[n._v('\n<template lang="html">\n  <div class="demo-alignment">\n      <div class="fill-row-loading">\n        <div :class="{\'activeLoading\':activeLoading}" @click="openLoading(type)" v-for="type in types" :id="[`loading-${type}`]" class="vs-con-loading__container loading-example">\n        </div>\n      </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data:()=>({\n    types:[\n      \'default\',\n      \'point\',\n      \'radius\',\n      \'corners\',\n      \'border\',\n      \'sound\',\n      \'material\',\n    ],\n    activeLoading:false,\n  }),\n  mounted(){\n    this.types.forEach((type)=>{\n      this.$vs.loading({\n        container: `#loading-${type}`,\n        type,\n        text:type\n      })\n    })\n  },\n  methods:{\n    openLoading(type){\n      this.activeLoading = true\n      this.$vs.loading({\n        type:type,\n      })\n      setTimeout( ()=> {\n        this.activeLoading = false\n        this.$vs.loading.close()\n      }, 3000);\n    },\n  }\n}\n<\/script>\n\n<style lang="scss">\n.fill-row-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: wrap;\n  .loading-example {\n    width: 120px;\n    float: left;\n    height: 120px;\n    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.05);\n    border-radius: 10px;\n    margin: 8px;\n    transition: all 0.3s ease;\n    cursor: pointer;\n    &:hover {\n      box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.05);\n      transform: translate(0, 4px);\n    }\n    h4 {\n      z-index: 40000;\n      position: relative;\n      text-align: center;\n      padding: 10px;\n    }\n    &.activeLoading {\n      opacity: 0 !important;\n      transform: scale(0.5);\n    }\n  }\n}\n</style>\n\t\t')])],2)},v=[],p=(o("ac6a"),{data:function(){return{types:["default","point","radius","corners","border","sound","material"],activeLoading:!1}},mounted:function(){var n=this;this.types.forEach((function(t){n.$vs.loading({container:"#loading-".concat(t),type:t,text:t})}))},methods:{openLoading:function(n){var t=this;this.activeLoading=!0,this.$vs.loading({type:n}),setTimeout((function(){t.activeLoading=!1,t.$vs.loading.close()}),3e3)}}}),h=p,m=Object(c["a"])(h,u,v,!1,null,null,null),f=m.exports,L=function(){var n=this,t=n._self._c;return t("vx-card",{attrs:{title:"Color","code-toggler":""}},[t("p",[n._v("You can change the color of the loading with the property "),t("code",[n._v("color")])]),t("div",{staticClass:"demo-alignment mt-3"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.colorLoading,expression:"colorLoading"}],attrs:{type:"color",name:"",value:""},domProps:{value:n.colorLoading},on:{input:function(t){t.target.composing||(n.colorLoading=t.target.value)}}}),t("vs-button",{attrs:{type:"filled",color:n.colorLoading},on:{click:n.openLoadingColor}},[n._v("Loading")])],1),t("template",{slot:"codeContainer"},[n._v('\n<template lang="html">\n  <div class="demo-alignment">\n\n    <input type="color" v-model="colorLoading" name="" value="">\n    <vs-button @click="openLoadingColor" type="filled" :color="colorLoading">Loading</vs-button>\n\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      colorLoading: \'#ff8000\',\n    }\n  },\n  methods: {\n    openLoadingColor() {\n      this.$vs.loading({ color: this.colorLoading })\n      setTimeout(() => {\n        this.$vs.loading.close()\n      }, 2000);\n    },\n  }\n}\n<\/script>\n        ')])],2)},_=[],b={data:function(){return{colorLoading:"#ff8000"}},methods:{openLoadingColor:function(){var n=this;this.$vs.loading({color:this.colorLoading}),setTimeout((function(){n.$vs.loading.close()}),2e3)}}},y=b,w=Object(c["a"])(y,L,_,!1,null,null,null),x=w.exports,k=function(){var n=this,t=n._self._c;return t("vx-card",{attrs:{title:"Background","code-toggler":""}},[t("p",[n._v("If you need to change the background of the loading, you can use the property "),t("code",[n._v("background")])]),t("vs-alert",{staticClass:"mt-5",attrs:{icon:"warning",active:"true",color:"warning"}},[t("span",[n._v("Only "),t("strong",[n._v("RGB")]),n._v(" and "),t("strong",[n._v("HEX")]),n._v(" colors are supported.")])]),t("div",{staticClass:"demo-alignment mt-3"},[t("input",{directives:[{name:"model",rawName:"v-model",value:n.backgroundLoading,expression:"backgroundLoading"}],attrs:{type:"color",name:"",value:""},domProps:{value:n.backgroundLoading},on:{input:function(t){t.target.composing||(n.backgroundLoading=t.target.value)}}}),t("vs-button",{attrs:{type:"gradient",color:"success"},on:{click:n.openLoadingBackground}},[n._v("Success")])],1),t("template",{slot:"codeContainer"},[n._v('\n<template lang="html">\n  <div class="demo-alignment">\n\n    <input type="color" v-model="backgroundLoading" name="" value="">\n    <vs-button @click="openLoadingBackground" type="gradient" color="success">Success</vs-button>\n\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      backgroundLoading: \'#22c16b\',\n    }\n  },\n  methods: {\n    openLoadingBackground() {\n      this.$vs.loading({ background: this.backgroundLoading, color: \'rgb(255, 255, 255)\' })\n      setTimeout(() => {\n        this.$vs.loading.close()\n      }, 3000);\n    },\n  }\n}\n<\/script>\n        ')])],2)},$=[],C={data:function(){return{backgroundLoading:"#22c16b"}},methods:{openLoadingBackground:function(){var n=this;this.$vs.loading({background:this.backgroundLoading,color:"rgb(255, 255, 255)"}),setTimeout((function(){n.$vs.loading.close()}),3e3)}}},T=C,B=Object(c["a"])(T,k,$,!1,null,null,null),D=B.exports,j=function(){var n=this,t=n._self._c;return t("vx-card",{attrs:{title:"Contained","code-toggler":""}},[t("p",[n._v("To add a loading within a container, call the "),t("code",[n._v("$vs.loading()")]),n._v(" global function passing the "),t("code",[n._v("container")]),n._v(" and the "),t("code",[n._v("scale")]),n._v(" parameters. When you want to remove it we have "),t("code",[n._v("$vs.loading.close()")]),n._v(", passing the same "),t("code",[n._v("container")]),n._v(" parameter")]),t("vs-alert",{staticClass:"mt-5",attrs:{icon:"new_releases",active:"true"}},[t("p",[n._v("For the examples, the request or the delay is simulated with "),t("code",[n._v("setTimeout")])])]),t("div",{staticClass:"demo-alignment mt-3"},[t("vs-button",{ref:"loadableButton",staticClass:"vs-con-loading__container",attrs:{id:"button-with-loading",type:"relief"},on:{click:n.openLoadingContained}},[n._v("\n\t\t\t\tButton with Loading\n\t\t\t")]),t("vs-button",{attrs:{type:"relief"},on:{click:n.openLoadingInDiv}},[n._v("Div with Loading")]),t("div",{staticClass:"contained-example-container"},[t("div",{staticClass:"vs-con-loading__container",attrs:{id:"div-with-loading"}},[n._v("Load Me!")])])],1),t("template",{slot:"codeContainer"},[n._v('\n<template>\n  <vs-button ref="loadableButton" id="button-with-loading" class="vs-con-loading__container" @click="openLoadingContained" type="relief">\n    Button with Loading\n  </vs-button>\n  <vs-button @click="openLoadingInDiv" type="relief">Div with Loading</vs-button>\n\n  <div class="contained-example-container">\n    <div id="div-with-loading" class="vs-con-loading__container">Load Me!</div>\n  </div>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      backgroundLoading:\'primary\',\n      colorLoading:\'#fff\',\n    }\n  },\n  methods:{\n    openLoadingContained(){\n      this.$vs.loading({\n        background: this.backgroundLoading,\n        color: this.colorLoading,\n        container: "#button-with-loading",\n        scale: 0.45\n      })\n      setTimeout( ()=> {\n        this.$vs.loading.close("#button-with-loading > .con-vs-loading")\n      }, 3000);\n    },\n    openLoadingInDiv(){\n      this.$vs.loading({\n        container: \'#div-with-loading\',\n        scale: 0.6\n      })\n      setTimeout( ()=> {\n        this.$vs.loading.close(\'#div-with-loading > .con-vs-loading\')\n      }, 3000);\n    },\n  }\n}\n<\/script>\n\t\t')])],2)},O=[],I={data:function(){return{backgroundLoading:"primary",colorLoading:"#fff"}},methods:{openLoadingContained:function(){var n=this;this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:"#button-with-loading",scale:.45}),setTimeout((function(){n.$vs.loading.close("#button-with-loading > .con-vs-loading")}),3e3)},openLoadingInDiv:function(){var n=this;this.$vs.loading({container:"#div-with-loading",scale:.6}),setTimeout((function(){n.$vs.loading.close("#div-with-loading > .con-vs-loading")}),3e3)}}},E=I,q=Object(c["a"])(E,j,O,!1,null,null,null),F=q.exports,J={components:{LoadingDefault:g,LoadingType:f,LoadingColor:x,LoadingBackground:D,LoadingContained:F}},M=J,N=(o("6070"),Object(c["a"])(M,a,e,!1,null,null,null));t["default"]=N.exports},cfa0:function(n,t,o){}}]);