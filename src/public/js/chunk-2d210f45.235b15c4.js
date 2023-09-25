(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d210f45"],{b9a9:function(n,e,t){"use strict";t.r(e);var s=function(){var n=this,e=n._self._c;return e("div",{attrs:{id:"chip-demo"}},[e("chip-default"),e("chip-color"),e("chip-icon"),e("chip-closable"),e("chip-add-remove"),e("chip-customize-close-clear-chip-icon")],1)},c=[],a=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Default","code-toggler":""}},[e("p",[n._v("Helps you represent simple data with colorful options")]),e("div",{staticClass:"demo-alignment"},[e("vs-chip",[n._v("Basic Chip")]),e("vs-chip",[e("vs-avatar",{attrs:{text:"LD"}}),n._v("\n                Avatar Text\n            ")],1),e("vs-chip",[e("vs-avatar"),n._v("\n                Avatar Icon\n            ")],1),e("vs-chip",[e("vs-avatar",{attrs:{src:"https://randomuser.me/api/portraits/men/4.jpg"}}),n._v("\n                Avatar Image\n            ")],1),n.isDeleted?n._e():e("vs-chip",{attrs:{closable:""},on:{click:function(e){n.isDeleted=!0}}},[n._v("\n                Closable chip\n            ")])],1),e("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="demo-alignment">\n\n    <vs-chip>Basic Chip</vs-chip>\n\n    <vs-chip>\n      <vs-avatar text="LD"/>\n      Avatar Text\n    </vs-chip>\n\n    <vs-chip>\n      <vs-avatar />\n      Avatar Icon\n    </vs-chip>\n\n    <vs-chip>\n      <vs-avatar src="https://randomuser.me/api/portraits/men/4.jpg"/>\n      Avatar Image\n    </vs-chip>\n\n    <vs-chip @click="isDeleted=true" v-if="!isDeleted" closable>\n      Closable chip\n    </vs-chip>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      isDeleted: false,\n    }\n  }\n}\n<\/script>\n        ')])],2)},i=[],o={data:function(){return{isDeleted:!1}}},r=o,l=t("2877"),p=Object(l["a"])(r,a,i,!1,null,null,null),h=p.exports,v=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Color","code-toggler":""}},[e("p",[n._v("Change the background color of the chip")]),e("vs-alert",{staticClass:"my-3",attrs:{icon:"warning",active:"true",color:"warning"}},[e("span",[n._v("Only "),e("strong",[n._v("RGB")]),n._v(" and "),e("strong",[n._v("HEX")]),n._v(" colors are supported.")])]),e("div",{staticClass:"demo-alignment"},[e("vs-chip",{attrs:{color:"primary"}},[n._v("\n                Basic Chip\n            ")]),e("vs-chip",{attrs:{color:"success"}},[e("vs-avatar",{attrs:{text:"LD"}}),n._v("\n                Avatar Text\n            ")],1),e("vs-chip",{attrs:{color:"danger"}},[e("vs-avatar"),n._v("\n                Avatar Icon\n            ")],1),e("vs-chip",{attrs:{color:"warning"}},[e("vs-avatar",{attrs:{src:"https://randomuser.me/api/portraits/men/4.jpg"}}),n._v("\n                Avatar Image\n            ")],1),n.isDeleted?n._e():e("vs-chip",{attrs:{closable:"",color:"dark"},on:{click:function(e){n.isDeleted=!0}}},[n._v("\n                Closable chip\n            ")]),n.isDeleted2?n._e():e("vs-chip",{attrs:{closable:"",color:"#24c1a0","close-icon":"close"},on:{click:function(e){n.isDeleted2=!0}}},[e("vs-avatar",{attrs:{src:"https://randomuser.me/api/portraits/men/16.jpg"}}),n._v("\n                Closable chip\n            ")],1)],1),e("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="demo-alignment">\n\n    <vs-chip color="primary">Basic Chip</vs-chip>\n\n    <vs-chip color="success">\n      <vs-avatar text="LD" />\n      Avatar Text\n    </vs-chip>\n\n    <vs-chip color="danger">\n      <vs-avatar />\n      Avatar Icon\n    </vs-chip>\n\n    <vs-chip color="warning">\n      <vs-avatar src="https://randomuser.me/api/portraits/men/4.jpg" />\n      Avatar Image\n    </vs-chip>\n\n    <vs-chip @click="isDeleted=true" v-if="!isDeleted" closable color="dark">\n      Closable chip\n    </vs-chip>\n\n    <vs-chip @click="isDeleted2=true" v-if="!isDeleted2" closable color="#24c1a0" close-icon="close">\n      <vs-avatar src="https://randomuser.me/api/portraits/men/16.jpg" />\n      Closable chip\n    </vs-chip>\n  </div>\n</template>\n\n<script>\nexport default {\n  data() {\n    return {\n      isDeleted: false,\n      isDeleted2: false,\n    }\n  }\n}\n<\/script>\n        ')])],2)},d=[],u={data:function(){return{isDeleted:!1,isDeleted2:!1}}},m=u,b=Object(l["a"])(m,v,d,!1,null,null,null),f=b.exports,_=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Icon","code-toggler":""}},[e("p",[n._v("Add a nice icon to the chip")]),e("div",{staticClass:"demo-alignment"},[e("vs-chip",[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-user"}}),e("span",[n._v("Icon Default")])],1),e("vs-chip",{attrs:{color:"primary"}},[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-send"}}),e("span",[n._v("Icon send")])],1),e("vs-chip",{attrs:{color:"success"}},[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-mail"}}),e("span",[n._v("Icon markunread")])],1),e("vs-chip",{attrs:{color:"danger"}},[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-slash"}}),e("span",[n._v("Icon block")])],1),e("vs-chip",{attrs:{color:"warning"}},[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-battery"}}),e("span",[n._v("Icon battery_alert")])],1),e("vs-chip",{attrs:{color:"dark"}},[e("vs-avatar",{attrs:{"icon-pack":"feather",icon:"icon-edit"}}),e("span",[n._v("Icon edit")])],1)],1),e("template",{slot:"codeContainer"},[n._v('\n<div class="demo-alignment">\n\n  <vs-chip>\n    <vs-avatar icon-pack="feather" icon="icon-user" />\n    <span>Icon Default</span>\n  </vs-chip>\n\n  <vs-chip color="primary">\n    <vs-avatar icon-pack="feather" icon="icon-send" />\n    <span>Icon send</span>\n  </vs-chip>\n\n  <vs-chip color="success">\n    <vs-avatar icon-pack="feather" icon="icon-mail" />\n    <span>Icon markunread</span>\n  </vs-chip>\n\n  <vs-chip color="danger">\n    <vs-avatar icon-pack="feather" icon="icon-slash" />\n    <span>Icon block</span>\n  </vs-chip>\n\n  <vs-chip color="warning">\n    <vs-avatar icon-pack="feather" icon="icon-battery" />\n    <span>Icon battery_alert</span>\n  </vs-chip>\n\n  <vs-chip color="dark">\n    <vs-avatar icon-pack="feather" icon="icon-edit" />\n    <span>Icon edit</span>\n  </vs-chip>\n</div>\n        ')])],2)},g=[],k={},C=Object(l["a"])(k,_,g,!1,null,null,null),x=C.exports,y=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Closable","code-toggler":""}},[e("p",[n._v("For making a chip closable")]),e("div",{staticClass:"demo-alignment"},[0==n.chips.length?e("vs-button",{attrs:{type:"filled"},on:{click:n.reset}},[n._v("Reset Chips")]):n._e(),n._l(n.chips,(function(t,s){return e("vs-chip",{key:s,attrs:{closable:""},on:{click:function(e){return n.remove(t)}}},[n._v(" "+n._s(t)+" ")])}))],2),e("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="demo-alignment">\n\n    <vs-button v-if="chips.length == 0" @click="reset" type="filled">Reset Chips</vs-button>\n    <vs-chip @click="remove(chip)" v-for="(chip, index) in chips" :key="index" closable> '+n._s("{{ chip }}")+"} </vs-chip>\n\n  </div>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      chips:[\n        'Dribbble',\n        'GitHub',\n        'Behance',\n        'Vuejs',\n        'Vuexy',\n      ],\n    }\n  },\n  methods: {\n    reset () {\n      this.chips = [\n        'Dribbble',\n        'GitHub',\n        'Behance',\n        'Vuejs',\n        'Vuexy',\n      ]\n    },\n    remove (item) {\n      this.chips.splice(this.chips.indexOf(item), 1)\n    }\n  }\n}\n<\/script>\n        ")])],2)},D=[],w={data:function(){return{chips:["Dribbble","GitHub","Behance","Vuejs","Vuexy"]}},methods:{reset:function(){this.chips=["Dribbble","GitHub","Behance","Vuejs","Vuexy"]},remove:function(n){this.chips.splice(this.chips.indexOf(n),1)}}},I=w,j=Object(l["a"])(I,y,D,!1,null,null,null),A=j.exports,V=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Add and Remove Items","code-toggler":""}},[e("p",[n._v("You can add and remove chips with the "),e("code",[n._v("vs-chips")]),n._v(" component. For the main parameter, pass the "),e("code",[n._v("items")]),n._v(" property, which is an array representing each chip")]),e("div",{staticClass:"mt-5"},[e("div",{staticClass:"op-block mb-5"},[n._v(" "+n._s(n.chips)+" ")]),e("vs-chips",{attrs:{color:"rgb(145, 32, 159)",placeholder:"New Element"},model:{value:n.chips,callback:function(e){n.chips=e},expression:"chips"}},n._l(n.chips,(function(t,s){return e("vs-chip",{key:"".concat(t,"-").concat(s),attrs:{closable:""},on:{click:function(e){return n.remove(t)}}},[n._v("\n                    "+n._s(t)+"\n                ")])})),1)],1),e("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="op-block mb-4"> '+n._s("{{ chips }}")+' </div>\n  <vs-chips color="rgb(145, 32, 159)" placeholder="New Element" v-model="chips">\n    <vs-chip\n      :key="chip"\n      @click="remove(chip)"\n      v-for="chip in chips"\n      closable>\n      '+n._s("{{ chip }}")+"}\n    </vs-chip>\n  </vs-chips>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      chips:[\n        'Dribbble',\n        'GitHub',\n        'Behance',\n        'Vuejs',\n        'Vuexy',\n      ],\n    }\n  },\n  methods: {\n    remove (item) {\n      this.chips.splice(this.chips.indexOf(item), 1)\n    }\n  }\n}\n<\/script>\n        ")])],2)},O=[],B={data:function(){return{chips:["Dribbble","GitHub","Behance","Vuejs","Vuexy"]}},methods:{remove:function(n){this.chips.splice(this.chips.indexOf(n),1)}}},G=B,H=Object(l["a"])(G,V,O,!1,null,null,null),F=H.exports,E=function(){var n=this,e=n._self._c;return e("vx-card",{attrs:{title:"Customize Close and Clear Chips Icons","code-toggler":""}},[e("p",[n._v("You can change the icons used for the close button and the clear button when using multiple chips with the "),e("code",[n._v("vs-chips")]),n._v(" component.")]),e("p",[n._v("For the main parameter, pass the "),e("code",[n._v("close-icon")]),n._v(" property, which is the close icon that appears on each chip. You can change the Clear Chips button with the "),e("code",[n._v("remove-icon")]),n._v(" property")]),e("vs-alert",{staticClass:"mt-5",attrs:{color:"primary",icon:"new_releases",active:"true"}},[e("p",[n._v("Vuesax uses the Google Material Icons font library by default. For a list of all available icons, visit the official "),e("a",{attrs:{href:"https://material.io/icons/",target:"_blank"}},[n._v("Material Icons page")]),n._v(".")]),e("p",[n._v("FontAwesome and other fonts library are supported. Simply use the icon-pack with fa or fas. You still need to include the Font Awesome icons in your project.")])]),e("div",{staticClass:"mt-5"},[e("div",{staticClass:"op-block mb-5"},[n._v(" "+n._s(n.chips)+" ")]),e("vs-chips",{attrs:{color:"rgb(145, 32, 159)",placeholder:"New Element","icon-pack":"feather","remove-icon":"icon-trash-2"},model:{value:n.chips,callback:function(e){n.chips=e},expression:"chips"}},n._l(n.chips,(function(t,s){return e("vs-chip",{key:"".concat(t,"-").concat(s),attrs:{closable:"","icon-pack":"feather","close-icon":"icon-trash-2"},on:{click:function(e){return n.remove(t)}}},[n._v("\n                    "+n._s(t)+"\n                ")])})),1)],1),e("template",{slot:"codeContainer"},[n._v('\n<template>\n  <div class="op-block mb-4"> '+n._s("{{ chips }}")+' </div>\n  <vs-chips color="rgb(145, 32, 159)" placeholder="New Element" v-model="chips" icon-pack="feather" remove-icon="icon-trash-2">\n    <vs-chip\n      :key="chip"\n      @click="remove(chip)"\n      v-for="chip in chips"\n      closable\n      icon-pack="feather"\n      close-icon="icon-trash-2">\n      '+n._s("{{ chip }}")+"\n    </vs-chip>\n  </vs-chips>\n</template>\n\n<script>\nexport default {\n  data(){\n    return {\n      chips:[\n        'Dribbble',\n        'GitHub',\n        'Behance',\n        'Vuejs',\n        'Vuexy',\n      ],\n    }\n  },\n  methods: {\n    remove (item) {\n      this.chips.splice(this.chips.indexOf(item), 1)\n    }\n  }\n}\n<\/script>\n        ")])],2)},R=[],L={data:function(){return{chips:["Dribbble","GitHub","Behance","Vuejs","Vuexy"]}},methods:{remove:function(n){this.chips.splice(this.chips.indexOf(n),1)}}},N=L,T=Object(l["a"])(N,E,R,!1,null,null,null),Y=T.exports,z={components:{ChipDefault:h,ChipColor:f,ChipIcon:x,ChipClosable:A,ChipAddRemove:F,ChipCustomizeCloseClearChipIcon:Y}},J=z,M=Object(l["a"])(J,s,c,!1,null,null,null);e["default"]=M.exports}}]);