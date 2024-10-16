(function(A){typeof define=="function"&&define.amd?define(A):A()})(function(){"use strict";const A=class R{constructor(t,e){this.low=t,this.high=e}clone(){return new R(this.low,this.high)}get max(){return this.clone()}less_than(t){return this.low<t.low||this.low===t.low&&this.high<t.high}equal_to(t){return this.low===t.low&&this.high===t.high}intersect(t){return!this.not_intersect(t)}not_intersect(t){return this.high<t.low||t.high<this.low}merge(t){return new R(this.low===void 0?t.low:this.low<t.low?this.low:t.low,this.high===void 0?t.high:this.high>t.high?this.high:t.high)}output(){return[this.low,this.high]}static comparable_max(t,e){return t.merge(e)}static comparable_less_than(t,e){return t<e}},g=0,f=1;class x{constructor(t=void 0,e=void 0,n=null,r=null,l=null,a=f){if(this.left=n,this.right=r,this.parent=l,this.color=a,this.item={key:t,value:e},t&&t instanceof Array&&t.length===2&&!Number.isNaN(t[0])&&!Number.isNaN(t[1])){let[s,o]=t;s>o&&([s,o]=[o,s]),this.item.key=new A(s,o)}this.max=this.item.key?this.item.key.max:void 0}isNil(){return this.item.key===void 0&&this.item.value===void 0&&this.left===null&&this.right===null&&this.color===f}_value_less_than(t){return this.item.value&&t.item.value&&this.item.value.less_than?this.item.value.less_than(t.item.value):this.item.value<t.item.value}less_than(t){return this.item.value===this.item.key&&t.item.value===t.item.key?this.item.key.less_than(t.item.key):this.item.key.less_than(t.item.key)||this.item.key.equal_to(t.item.key)&&this._value_less_than(t)}_value_equal(t){return this.item.value&&t.item.value&&this.item.value.equal_to?this.item.value.equal_to(t.item.value):this.item.value===t.item.value}equal_to(t){return this.item.value===this.item.key&&t.item.value===t.item.key?this.item.key.equal_to(t.item.key):this.item.key.equal_to(t.item.key)&&this._value_equal(t)}intersect(t){return this.item.key.intersect(t.item.key)}copy_data(t){this.item.key=t.item.key,this.item.value=t.item.value}update_max(){if(this.max=this.item.key?this.item.key.max:void 0,this.right&&this.right.max){const t=this.item.key.constructor.comparable_max;this.max=t(this.max,this.right.max)}if(this.left&&this.left.max){const t=this.item.key.constructor.comparable_max;this.max=t(this.max,this.left.max)}}not_intersect_left_subtree(t){const e=this.item.key.constructor.comparable_less_than;let n=this.left.max.high!==void 0?this.left.max.high:this.left.max;return e(n,t.item.key.low)}not_intersect_right_subtree(t){const e=this.item.key.constructor.comparable_less_than;let n=this.right.max.low!==void 0?this.right.max.low:this.right.item.key.low;return e(t.item.key.high,n)}}class C{constructor(){this.root=null,this.nil_node=new x}get size(){let t=0;return this.tree_walk(this.root,()=>t++),t}get keys(){let t=[];return this.tree_walk(this.root,e=>t.push(e.item.key.output?e.item.key.output():e.item.key)),t}get values(){let t=[];return this.tree_walk(this.root,e=>t.push(e.item.value)),t}get items(){let t=[];return this.tree_walk(this.root,e=>t.push({key:e.item.key.output?e.item.key.output():e.item.key,value:e.item.value})),t}isEmpty(){return this.root==null||this.root===this.nil_node}clear(){this.root=null}insert(t,e=t){if(t===void 0)return;let n=new x(t,e,this.nil_node,this.nil_node,null,g);return this.tree_insert(n),this.recalc_max(n),n}exist(t,e=t){let n=new x(t,e);return!!this.tree_search(this.root,n)}remove(t,e=t){let n=new x(t,e),r=this.tree_search(this.root,n);return r&&this.tree_delete(r),r}search(t,e=(n,r)=>n===r?r.output():n){let n=new x(t),r=[];return this.tree_search_interval(this.root,n,r),r.map(l=>e(l.item.value,l.item.key))}intersect_any(t){let e=new x(t);return this.tree_find_any_interval(this.root,e)}forEach(t){this.tree_walk(this.root,e=>t(e.item.key,e.item.value))}map(t){const e=new C;return this.tree_walk(this.root,n=>e.insert(n.item.key,t(n.item.value,n.item.key))),e}*iterate(t,e=(n,r)=>n===r?r.output():n){let n;for(t?n=this.tree_search_nearest_forward(this.root,new x(t)):this.root&&(n=this.local_minimum(this.root));n;)yield e(n.item.value,n.item.key),n=this.tree_successor(n)}recalc_max(t){let e=t;for(;e.parent!=null;)e.parent.update_max(),e=e.parent}tree_insert(t){let e=this.root,n=null;if(this.root==null||this.root===this.nil_node)this.root=t;else{for(;e!==this.nil_node;)n=e,t.less_than(e)?e=e.left:e=e.right;t.parent=n,t.less_than(n)?n.left=t:n.right=t}this.insert_fixup(t)}insert_fixup(t){let e,n;for(e=t;e!==this.root&&e.parent.color===g;)e.parent===e.parent.parent.left?(n=e.parent.parent.right,n.color===g?(e.parent.color=f,n.color=f,e.parent.parent.color=g,e=e.parent.parent):(e===e.parent.right&&(e=e.parent,this.rotate_left(e)),e.parent.color=f,e.parent.parent.color=g,this.rotate_right(e.parent.parent))):(n=e.parent.parent.left,n.color===g?(e.parent.color=f,n.color=f,e.parent.parent.color=g,e=e.parent.parent):(e===e.parent.left&&(e=e.parent,this.rotate_right(e)),e.parent.color=f,e.parent.parent.color=g,this.rotate_left(e.parent.parent)));this.root.color=f}tree_delete(t){let e,n;t.left===this.nil_node||t.right===this.nil_node?e=t:e=this.tree_successor(t),e.left!==this.nil_node?n=e.left:n=e.right,n.parent=e.parent,e===this.root?this.root=n:(e===e.parent.left?e.parent.left=n:e.parent.right=n,e.parent.update_max()),this.recalc_max(n),e!==t&&(t.copy_data(e),t.update_max(),this.recalc_max(t)),e.color===f&&this.delete_fixup(n)}delete_fixup(t){let e=t,n;for(;e!==this.root&&e.parent!=null&&e.color===f;)e===e.parent.left?(n=e.parent.right,n.color===g&&(n.color=f,e.parent.color=g,this.rotate_left(e.parent),n=e.parent.right),n.left.color===f&&n.right.color===f?(n.color=g,e=e.parent):(n.right.color===f&&(n.color=g,n.left.color=f,this.rotate_right(n),n=e.parent.right),n.color=e.parent.color,e.parent.color=f,n.right.color=f,this.rotate_left(e.parent),e=this.root)):(n=e.parent.left,n.color===g&&(n.color=f,e.parent.color=g,this.rotate_right(e.parent),n=e.parent.left),n.left.color===f&&n.right.color===f?(n.color=g,e=e.parent):(n.left.color===f&&(n.color=g,n.right.color=f,this.rotate_left(n),n=e.parent.left),n.color=e.parent.color,e.parent.color=f,n.left.color=f,this.rotate_right(e.parent),e=this.root));e.color=f}tree_search(t,e){if(!(t==null||t===this.nil_node))return e.equal_to(t)?t:e.less_than(t)?this.tree_search(t.left,e):this.tree_search(t.right,e)}tree_search_nearest_forward(t,e){let n,r=t;for(;r&&r!==this.nil_node;)r.less_than(e)?r.intersect(e)?(n=r,r=r.left):r=r.right:((!n||r.less_than(n))&&(n=r),r=r.left);return n||null}tree_search_interval(t,e,n){t!=null&&t!==this.nil_node&&(t.left!==this.nil_node&&!t.not_intersect_left_subtree(e)&&this.tree_search_interval(t.left,e,n),t.intersect(e)&&n.push(t),t.right!==this.nil_node&&!t.not_intersect_right_subtree(e)&&this.tree_search_interval(t.right,e,n))}tree_find_any_interval(t,e){let n=!1;return t!=null&&t!==this.nil_node&&(t.left!==this.nil_node&&!t.not_intersect_left_subtree(e)&&(n=this.tree_find_any_interval(t.left,e)),n||(n=t.intersect(e)),!n&&t.right!==this.nil_node&&!t.not_intersect_right_subtree(e)&&(n=this.tree_find_any_interval(t.right,e))),n}local_minimum(t){let e=t;for(;e.left!=null&&e.left!==this.nil_node;)e=e.left;return e}local_maximum(t){let e=t;for(;e.right!=null&&e.right!==this.nil_node;)e=e.right;return e}tree_successor(t){let e,n,r;if(t.right!==this.nil_node)e=this.local_minimum(t.right);else{for(n=t,r=t.parent;r!=null&&r.right===n;)n=r,r=r.parent;e=r}return e}rotate_left(t){let e=t.right;t.right=e.left,e.left!==this.nil_node&&(e.left.parent=t),e.parent=t.parent,t===this.root?this.root=e:t===t.parent.left?t.parent.left=e:t.parent.right=e,e.left=t,t.parent=e,t!=null&&t!==this.nil_node&&t.update_max(),e=t.parent,e!=null&&e!==this.nil_node&&e.update_max()}rotate_right(t){let e=t.left;t.left=e.right,e.right!==this.nil_node&&(e.right.parent=t),e.parent=t.parent,t===this.root?this.root=e:t===t.parent.left?t.parent.left=e:t.parent.right=e,e.right=t,t.parent=e,t!==null&&t!==this.nil_node&&t.update_max(),e=t.parent,e!=null&&e!==this.nil_node&&e.update_max()}tree_walk(t,e){t!=null&&t!==this.nil_node&&(this.tree_walk(t.left,e),e(t),this.tree_walk(t.right,e))}testRedBlackProperty(){let t=!0;return this.tree_walk(this.root,function(e){e.color===g&&(e.left.color===f&&e.right.color===f||(t=!1))}),t}testBlackHeightProperty(t){let e=0,n=0,r=0;if(t.color===f&&e++,t.left!==this.nil_node?n=this.testBlackHeightProperty(t.left):n=1,t.right!==this.nil_node?r=this.testBlackHeightProperty(t.right):r=1,n!==r)throw new Error("Red-black height property violated");return e+=n,e}}function S(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var E={exports:{}},b={exports:{}};(function(i,t){(function(e){t=e(),i.exports=t})(function(){var e=function(s){return s instanceof Function},n=function(s){var o=Array.prototype.slice.call(arguments,1);for(var c in o){var h=o[c];if(typeof h=="object")for(var u in h)s[u]=h[u]}return s},r={_isClassObject:!1},l=!1,a=function(){};return a._subClasses=[],a.prototype.init=function(){},a._extend=function(s,o,c){s===void 0&&(s={}),o===void 0&&(o={}),c===void 0&&(c={}),c=n({},r,c);var h=function(){l||(this._class=h,this.init instanceof Function&&this.init.apply(this,arguments))},u=this;l=!0;var d=new u;l=!1;var p=u.prototype;h.prototype=d,h.prototype.constructor=h,h._superClass=u,h._subClasses=[],u._subClasses.push(h),h._extend=u._extend,h._extends=function(k){return this._superClass==a?!1:k==this._superClass||k==a?!0:this._superClass._extends(k)};for(var _ in s){var m=Object.getOwnPropertyDescriptor(s,_),v=m.value;if(v!==null&&typeof v=="object"&&v.descriptor)Object.defineProperty(d,_,v);else if(!("value"in m)&&("set"in m||"get"in m))Object.defineProperty(d,_,m);else{d[_]=v;var F=p[_];e(v)&&e(F)&&v!==F&&(v._super=F)}}if(!c._isClassObject){var U=u._members===void 0?a:u._members._class,K=n({},c,{_isClassObject:!0}),T=U._extend(o,{},K);T._instanceClass=h,h._members=new T}return h},a._convert=function(s,o){var c=s.prototype;return c.init=function(){var h=this._origin=a._construct(s,arguments);Object.keys(h).forEach(function(u){h.hasOwnProperty(u)&&Object.defineProperty(this,u,{get:function(){return h[u]}})},this)},a._extend(c,{},o)},a._construct=function(s,o){o===void 0&&(o=[]);var c=function(){return s.apply(this,o)};return c.prototype=s.prototype,new c},a._superDescriptor=function(s,o){if("_class"in s&&s instanceof s._class&&(s=s._class),"_extends"in s&&s._extends instanceof Function&&s._extends(this))return Object.getOwnPropertyDescriptor(s._superClass.prototype,o)},a})})(b,b.exports);var H=b.exports,N=H,w=N._extend({init:function(i,t,e){i=i instanceof Array?i:[i],this._map={},this._list=[],this.callback=t,this.keyFields=i,this.isHashArray=!0,this.options=e||{ignoreDuplicates:!1},t&&t("construct")},addOne:function(i){var t=!1;for(var e in this.keyFields){e=this.keyFields[e];var n=this.objectAt(i,e);if(n)if(this.has(n)){if(this.options.ignoreDuplicates)return;if(this._map[n].indexOf(i)!=-1){t=!0;continue}this._map[n].push(i)}else this._map[n]=[i]}(!t||this._list.indexOf(i)==-1)&&this._list.push(i)},add:function(){for(var i=0;i<arguments.length;i++)this.addOne(arguments[i]);return this.callback&&this.callback("add",Array.prototype.slice.call(arguments,0)),this},addAll:function(i){if(i.length<100)this.add.apply(this,i);else for(var t=0;t<i.length;t++)this.add(i[t]);return this},addMap:function(i,t){return this._map[i]=t,this.callback&&this.callback("addMap",{key:i,obj:t}),this},intersection:function(i){var t=this;if(!i||!i.isHashArray)throw Error("Cannot HashArray.intersection() on a non-hasharray object. You passed in: ",i);var e=this.clone(null,!0),n=this.clone(null,!0).addAll(this.all.concat(i.all));return n.all.forEach(function(r){t.collides(r)&&i.collides(r)&&e.add(r)}),e},complement:function(i){if(!i||!i.isHashArray)throw Error("Cannot HashArray.complement() on a non-hasharray object. You passed in: ",i);var t=this.clone(null,!0);return this.all.forEach(function(e){i.collides(e)||t.add(e)}),t},get:function(i){if(this.has(i))return!(this._map[i]instanceof Array)||this._map[i].length!=1?this._map[i]:this._map[i][0]},getAll:function(i){if(i=i instanceof Array?i:[i],i[0]=="*")return this.all;var t=new w(this.keyFields);for(var e in i)t.add.apply(t,this.getAsArray(i[e]));return t.all},getAsArray:function(i){return this._map[i]||[]},getUniqueRandomIntegers:function(i,t,e){var n=[],r={};for(i=Math.min(Math.max(e-t,1),i);n.length<i;){var l=Math.floor(t+Math.random()*(e+1));r[l]||(r[l]=!0,n.push(l))}return n},sample:function(i,t){var e=this.all,n=[];t&&(e=this.getAll(t));for(var r=this.getUniqueRandomIntegers(i,0,e.length-1),l=0;l<r.length;l++)n.push(e[r[l]]);return n},has:function(i){return this._map.hasOwnProperty(i)},collides:function(i){for(var t in this.keyFields)if(this.has(this.objectAt(i,this.keyFields[t])))return!0;return!1},hasMultiple:function(i){return this._map[i]instanceof Array},removeByKey:function(){for(var i=[],t=0;t<arguments.length;t++){var e=arguments[t],n=this._map[e].concat();if(n){i=i.concat(n);for(var r in n){var l=n[r];for(var a in this.keyFields){var s=this.objectAt(l,this.keyFields[a]);if(s&&this.has(s)){var a=this._map[s].indexOf(l);a!=-1&&this._map[s].splice(a,1),this._map[s].length==0&&delete this._map[s]}}this._list.splice(this._list.indexOf(l),1)}}delete this._map[e]}return this.callback&&this.callback("removeByKey",i),this},remove:function(){for(var i=0;i<arguments.length;i++){var t=arguments[i];for(var n in this.keyFields){var e=this.objectAt(t,this.keyFields[n]);if(e){var n=this._map[e].indexOf(t);if(n!=-1)this._map[e].splice(n,1);else throw new Error("HashArray: attempting to remove an object that was never added!"+e);this._map[e].length==0&&delete this._map[e]}}var n=this._list.indexOf(t);if(n!=-1)this._list.splice(n,1);else throw new Error("HashArray: attempting to remove an object that was never added!"+e)}return this.callback&&this.callback("remove",arguments),this},removeAll:function(){var i=this._list.concat();return this._map={},this._list=[],this.callback&&this.callback("remove",i),this},objectAt:function(i,t){if(typeof t=="string")return i[t];for(var e=t.concat();e.length&&i;)i=i[e.shift()];return i},forEach:function(i,t){i=i instanceof Array?i:[i];var e=this.getAll(i);return e.forEach(t),this},forEachDeep:function(i,t,e){i=i instanceof Array?i:[i];var n=this,r=this.getAll(i);return r.forEach(function(l){e(n.objectAt(l,t),l)}),this},clone:function(i,t){var e=new w(this.keyFields.concat(),i||this.callback);return t||e.add.apply(e,this.all.concat()),e},sum:function(i,t,e){var n=this,r=0;return this.forEachDeep(i,t,function(l,a){e!==void 0&&(l*=n.objectAt(a,e)),r+=l}),r},average:function(i,t,e){var n=0,r=0,l=0,a=this;return e!==void 0&&this.forEachDeep(i,e,function(s){l+=s}),this.forEachDeep(i,t,function(s,o){e!==void 0&&(s*=a.objectAt(o,e)/l),n+=s,r++}),e!==void 0?n:n/r},filter:function(i,t){var e=this,n=typeof t=="function"?t:l,r=new w(this.keyFields);return r.addAll(this.getAll(i).filter(n)),r;function l(a){var s=e.objectAt(a,t);return s!==void 0&&s!==!1}}});Object.defineProperty(w.prototype,"all",{get:function(){return this._list}}),Object.defineProperty(w.prototype,"map",{get:function(){return this._map}});var I=w;typeof window<"u"&&(window.HashArray=w);var D=I,y=D,q=64,P=/^[\s]*$/,B=[{regex:/[åäàáâãæ]/ig,alternate:"a"},{regex:/[èéêë]/ig,alternate:"e"},{regex:/[ìíîï]/ig,alternate:"i"},{regex:/[òóôõö]/ig,alternate:"o"},{regex:/[ùúûü]/ig,alternate:"u"},{regex:/[æ]/ig,alternate:"ae"}];String.prototype.replaceCharAt=function(i,t){return this.substr(0,i)+t+this.substr(i+t.length)};var O=function(i,t){this.options=t||{},this.options.ignoreCase=this.options.ignoreCase===void 0?!0:this.options.ignoreCase,this.options.maxCacheSize=this.options.maxCacheSize||q,this.options.cache=this.options.hasOwnProperty("cache")?this.options.cache:!0,this.options.splitOnRegEx=this.options.hasOwnProperty("splitOnRegEx")?this.options.splitOnRegEx:/\s/g,this.options.splitOnGetRegEx=this.options.hasOwnProperty("splitOnGetRegEx")?this.options.splitOnGetRegEx:this.options.splitOnRegEx,this.options.min=this.options.min||1,this.options.keepAll=this.options.hasOwnProperty("keepAll")?this.options.keepAll:!1,this.options.keepAllKey=this.options.hasOwnProperty("keepAllKey")?this.options.keepAllKey:"id",this.options.idFieldOrFunction=this.options.hasOwnProperty("idFieldOrFunction")?this.options.idFieldOrFunction:void 0,this.options.expandRegexes=this.options.expandRegexes||B,this.options.insertFullUnsplitKey=this.options.hasOwnProperty("insertFullUnsplitKey")?this.options.insertFullUnsplitKey:!1,this.keyFields=i?i instanceof Array?i:[i]:[],this.root={},this.size=0,this.options.cache&&(this.getCache=new y("key"))};function j(i,t){return t.length===1?i[t[0]]:j(i[t[0]],t.slice(1,t.length))}O.prototype={add:function(i,t){this.options.cache&&this.clearCache(),typeof t=="number"&&(t=void 0);var e=t||this.keyFields;for(var n in e){var r=e[n],l=r instanceof Array,a=l?j(i,r):i[r];if(a){a=a.toString();for(var s=this.expandString(a),o=0;o<s.length;o++){var c=s[o];this.map(c,i)}}}},expandString:function(i){var t=[i];if(this.options.expandRegexes&&this.options.expandRegexes.length)for(var e=0;e<this.options.expandRegexes.length;e++)for(var n=this.options.expandRegexes[e],r;(r=n.regex.exec(i))!==null;){var l=i.replaceCharAt(r.index,n.alternate);t.push(l)}return t},addAll:function(i,t){for(var e=0;e<i.length;e++)this.add(i[e],t)},reset:function(){this.root={},this.size=0},clearCache:function(){this.getCache=new y("key")},cleanCache:function(){for(;this.getCache.all.length>this.options.maxCacheSize;)this.getCache.remove(this.getCache.all[0])},addFromObject:function(i,t){this.options.cache&&this.clearCache(),t=t||"value",this.keyFields.indexOf("_key_")==-1&&this.keyFields.push("_key_");for(var e in i){var n={_key_:e};n[t]=i[e],this.add(n)}},map:function(i,t){if(this.options.splitOnRegEx&&this.options.splitOnRegEx.test(i)){var e=i.split(this.options.splitOnRegEx),n=e.filter(function(u){return P.test(u)}),r=e.filter(function(u){return u===i}),l=r.length+n.length===e.length;if(!l){for(var a=0,s=e.length;a<s;a++)P.test(e[a])||this.map(e[a],t);if(!this.options.insertFullUnsplitKey)return}}this.options.cache&&this.clearCache(),this.options.keepAll&&(this.indexed=this.indexed||new y([this.options.keepAllKey]),this.indexed.add(t)),this.options.ignoreCase&&(i=i.toLowerCase());var o=this.keyToArr(i),c=this;h(o,t,this.root);function h(u,d,p){if(u.length==0){p.value=p.value||[],p.value.push(d);return}var _=u.shift();p[_]||c.size++,p[_]=p[_]||{},h(u,d,p[_])}},keyToArr:function(i){var t;if(this.options.min&&this.options.min>1){if(i.length<this.options.min)return[];t=[i.substr(0,this.options.min)],t=t.concat(i.substr(this.options.min).split(""))}else t=i.split("");return t},findNode:function(i){return t(this.keyToArr(i),this.root);function t(e,n){if(n){if(e.length==0)return n;var r=e.shift();return t(e,n[r])}}},_getCacheKey:function(i,t){var e=i;return t&&(e=i+"_"+t),e},_get:function(i,t){i=this.options.ignoreCase?i.toLowerCase():i;var e,n;if(this.options.cache&&(e=this.getCache.get(this._getCacheKey(i,t))))return e.value;for(var r=void 0,l=this.options.indexField?[this.options.indexField]:this.keyFields,a=this.options.splitOnGetRegEx?i.split(this.options.splitOnGetRegEx):[i],s=0,o=a.length;s<o;s++)if(!(this.options.min&&a[s].length<this.options.min)){var c=new y(l);(n=this.findNode(a[s]))&&d(n,c),r=r?r.intersection(c):c}var h=r?r.all:[];if(this.options.cache){var u=this._getCacheKey(i,t);this.getCache.add({key:u,value:h}),this.cleanCache()}return h;function d(p,_){if(!(t&&_.all.length===t)){if(p.value&&p.value.length)if(!t||_.all.length+p.value.length<t)_.addAll(p.value);else{_.addAll(p.value.slice(0,t-_.all.length));return}for(var m in p){if(t&&_.all.length===t)return;m!="value"&&d(p[m],_)}}}},get:function(i,t,e){var n=this.options.indexField?[this.options.indexField]:this.keyFields,r=void 0,l=void 0;if(t&&!this.options.idFieldOrFunction)throw new Error("To use the accumulator, you must specify and idFieldOrFunction");i=i instanceof Array?i:[i];for(var a=0,s=i.length;a<s;a++){var o=this._get(i[a],e);t?l=t(l,i[a],o,this):r=r?r.addAll(o):new y(n).addAll(o)}return t?l:r.all},search:function(i,t,e){return this.get(i,t,e)},getId:function(i){return typeof this.options.idFieldOrFunction=="function"?this.options.idFieldOrFunction(i):i[this.options.idFieldOrFunction]}},O.UNION_REDUCER=function(i,t,e,n){if(i===void 0)return e;var r={},l,a,s=Math.max(i.length,e.length),o=[],c=0;for(l=0;l<s;l++)l<i.length&&(a=n.getId(i[l]),r[a]=r[a]?r[a]:0,r[a]++,r[a]===2&&(o[c++]=i[l])),l<e.length&&(a=n.getId(e[l]),r[a]=r[a]?r[a]:0,r[a]++,r[a]===2&&(o[c++]=e[l]));return o},E.exports=O,E.exports.default=O;var L=E.exports,$=L;const z=S($);(function(){function i(l){const a=document.getElementById(l);if(a!==null)try{return JSON.parse(a.textContent)}catch(s){console.warn(`could not parse json element '${l}'. Error: ${s}`)}}function t(l){const a=document.getElementById("instance-text");if(a===null){console.warn("cannot find instance text");return}const s=a.textContent;if(!s||s===""){console.log("text content in instance");return}console.log(s);const o=new z;l.map(p=>o.map(p,p));const c=s.split(" ");let h=!1,u="",d="";for(const p of c){const _=u+p,m=o.search(_);if(m.length===0&&h){d+=`
                <mark aria-hidden="true" class="emphasis">${u}</mark>                 
                `,d+=p,u="",h=!1;continue}if(m.length===0){d+=p+" ",u="";continue}if(m.length===1){d+=`
                <mark aria-hidden="true" class="emphasis">${_}</mark>              
                `,u="",h=!1;continue}m.includes(_)&&(h=!0),u=_+" "}a.innerHTML=d}function e(l){console.log(l)}const n=i("emphasis");n!==void 0&&(console.log(n),t(n));const r=i("suggestions");r!==void 0&&e(r)})(),document.potato={IntervalTree:C}});
