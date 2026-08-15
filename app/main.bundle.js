var Ac=Object.create;var ks=Object.defineProperty;var Tc=Object.getOwnPropertyDescriptor;var Ec=Object.getOwnPropertyNames;var Cc=Object.getPrototypeOf,Rc=Object.prototype.hasOwnProperty;var Ic=(e,t,r)=>t in e?ks(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var $s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Lc=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ec(t))!Rc.call(e,s)&&s!==r&&ks(e,s,{get:()=>t[s],enumerable:!(n=Tc(t,s))||n.enumerable});return e};var Oc=(e,t,r)=>(r=e!=null?Ac(Cc(e)):{},Lc(t||!e||!e.__esModule?ks(r,"default",{value:e,enumerable:!0}):r,e));var rt=(e,t,r)=>Ic(e,typeof t!="symbol"?t+"":t,r);var va=$s((o_,ba)=>{var Or=1e3,Dr=Or*60,Mr=Dr*60,$r=Mr*24,Fc=$r*7,qc=$r*365.25;ba.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Bc(e);if(r==="number"&&isFinite(e))return t.long?jc(e):Uc(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Bc(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*qc;case"weeks":case"week":case"w":return r*Fc;case"days":case"day":case"d":return r*$r;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Dr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Or;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Uc(e){var t=Math.abs(e);return t>=$r?Math.round(e/$r)+"d":t>=Mr?Math.round(e/Mr)+"h":t>=Dr?Math.round(e/Dr)+"m":t>=Or?Math.round(e/Or)+"s":e+"ms"}function jc(e){var t=Math.abs(e);return t>=$r?Rn(e,t,$r,"day"):t>=Mr?Rn(e,t,Mr,"hour"):t>=Dr?Rn(e,t,Dr,"minute"):t>=Or?Rn(e,t,Or,"second"):e+" ms"}function Rn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var wa=$s((a_,ya)=>{function zc(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=va(),r.destroy=u,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let h=0;h<f.length;h++)_=(_<<5)-_+f.charCodeAt(h),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,h=null,T,$;function E(...B){if(!E.enabled)return;let x=E,G=Number(new Date),ee=G-(_||G);x.diff=ee,x.prev=_,x.curr=G,_=G,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let I=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(A,j)=>{if(A==="%%")return"%";I++;let N=r.formatters[j];if(typeof N=="function"){let ne=B[I];A=N.call(x,ne),B.splice(I,1),I--}return A}),r.formatArgs.call(x,B),(x.log||r.log).apply(x,B)}return E.namespace=f,E.useColors=r.useColors(),E.color=r.selectColor(f),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,$=r.enabled(f)),$),set:B=>{h=B}}),typeof r.init=="function"&&r.init(E),E}function n(f,_){let h=r(this.namespace+(typeof _>"u"?":":_)+f);return h.log=this.log,h}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(f,_){let h=0,T=0,$=-1,E=0;for(;h<f.length;)if(T<_.length&&(_[T]===f[h]||_[T]==="*"))_[T]==="*"?($=T,E=h,T++):(h++,T++);else if($!==-1)T=$+1,E++,h=E;else return!1;for(;T<_.length&&_[T]==="*";)T++;return T===_.length}function a(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function i(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function c(f){return f instanceof Error?f.stack||f.message:f}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}ya.exports=zc});var ka=$s((St,In)=>{St.formatArgs=Wc;St.save=Gc;St.load=Yc;St.useColors=Hc;St.storage=Vc();St.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();St.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Hc(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Wc(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+In.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}St.log=console.debug||console.log||(()=>{});function Gc(e){try{e?St.storage.setItem("debug",e):St.storage.removeItem("debug")}catch{}}function Yc(){let e;try{e=St.storage.getItem("debug")||St.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Vc(){try{return localStorage}catch{}}In.exports=wa()(St);var{formatters:Kc}=In.exports;Kc.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Vr=globalThis,Cn=Vr.trustedTypes,sa=Cn?Cn.createPolicy("lit-html",{createHTML:e=>e}):void 0,da="$lit$",ir=`lit$${Math.random().toFixed(9).slice(2)}$`,ua="?"+ir,Dc=`<${ua}>`,yr=document,Kr=()=>yr.createComment(""),Zr=e=>e===null||typeof e!="object"&&typeof e!="function",Rs=Array.isArray,Mc=e=>Rs(e)||typeof e?.[Symbol.iterator]=="function",xs=`[ 	
\f\r]`,Yr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oa=/-->/g,aa=/>/g,br=RegExp(`>|${xs}(?:([^\\s"'>=/]+)(${xs}*=${xs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ia=/'/g,la=/"/g,pa=/^(?:script|style|textarea|title)$/i,Is=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Is(1),Xt=Is(2),Qf=Is(3),wr=Symbol.for("lit-noChange"),dt=Symbol.for("lit-nothing"),ca=new WeakMap,vr=yr.createTreeWalker(yr,129);function fa(e,t){if(!Rs(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return sa!==void 0?sa.createHTML(t):t}var Nc=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Yr;for(let i=0;i<r;i++){let c=e[i],u,f,_=-1,h=0;for(;h<c.length&&(a.lastIndex=h,f=a.exec(c),f!==null);)h=a.lastIndex,a===Yr?f[1]==="!--"?a=oa:f[1]!==void 0?a=aa:f[2]!==void 0?(pa.test(f[2])&&(s=RegExp("</"+f[2],"g")),a=br):f[3]!==void 0&&(a=br):a===br?f[0]===">"?(a=s??Yr,_=-1):f[1]===void 0?_=-2:(_=a.lastIndex-f[2].length,u=f[1],a=f[3]===void 0?br:f[3]==='"'?la:ia):a===la||a===ia?a=br:a===oa||a===aa?a=Yr:(a=br,s=void 0);let T=a===br&&e[i+1].startsWith("/>")?" ":"";o+=a===Yr?c+Dc:_>=0?(n.push(u),c.slice(0,_)+da+c.slice(_)+ir+T):c+ir+(_===-2?i:T)}return[fa(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Xr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,f]=Nc(t,r);if(this.el=e.createElement(u,n),vr.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=vr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(da)){let h=f[a++],T=s.getAttribute(_).split(ir),$=/([.?@])?(.*)/.exec(h);c.push({type:1,index:o,name:$[2],strings:T,ctor:$[1]==="."?As:$[1]==="?"?Ts:$[1]==="@"?Es:Lr}),s.removeAttribute(_)}else _.startsWith(ir)&&(c.push({type:6,index:o}),s.removeAttribute(_));if(pa.test(s.tagName)){let _=s.textContent.split(ir),h=_.length-1;if(h>0){s.textContent=Cn?Cn.emptyScript:"";for(let T=0;T<h;T++)s.append(_[T],Kr()),vr.nextNode(),c.push({type:2,index:++o});s.append(_[h],Kr())}}}else if(s.nodeType===8)if(s.data===ua)c.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(ir,_+1))!==-1;)c.push({type:7,index:o}),_+=ir.length-1}o++}}static createElement(t,r){let n=yr.createElement("template");return n.innerHTML=t,n}};function Ir(e,t,r=e,n){if(t===wr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Zr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Ir(e,s._$AS(e,t.values),s,n)),t}var Ss=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??yr).importNode(r,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new Qr(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Cs(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=yr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=dt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Ir(this,t,r),Zr(t)?t===dt||t==null||t===""?(this._$AH!==dt&&this._$AR(),this._$AH=dt):t!==this._$AH&&t!==wr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==dt&&Zr(this._$AH)?this._$AA.nextSibling.data=t:this.T(yr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Xr.createElement(fa(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ss(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ca.get(t.strings);return r===void 0&&ca.set(t.strings,r=new Xr(t)),r}k(t){Rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Kr()),this.O(Kr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Lr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=dt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=dt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Ir(this,t,r,0),a=!Zr(t)||t!==this._$AH&&t!==wr,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Ir(this,i[n+c],r,c),u===wr&&(u=this._$AH[c]),a||(a=!Zr(u)||u!==this._$AH[c]),u===dt?t=dt:t!==dt&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===dt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},As=class extends Lr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===dt?void 0:t}},Ts=class extends Lr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==dt)}},Es=class extends Lr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Ir(this,t,r,0)??dt)===wr)return;let n=this._$AH,s=t===dt&&n!==dt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==dt&&(n===dt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Ir(this,t)}};var Pc=Vr.litHtmlPolyfillSupport;Pc?.(Xr,Qr),(Vr.litHtmlVersions??(Vr.litHtmlVersions=[])).push("3.3.1");var ze=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Qr(t.insertBefore(Kr(),o),o,void 0,r??{})}return s._$AI(e),s};var At="today",Ht=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Rt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function kr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function _a(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ma(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ga(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ha(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var $a=Oc(ka(),1);function lt(e){return(0,$a.default)(`beads-ui:${e}`)}function Mt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function xr(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Aa(e,t){let r=Mt(e.created_at),n=Mt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ta(e,t){let r=Mt(e.updated_at),n=Mt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Ea(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Mt(e.created_at),o=Mt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ca(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zc=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function xa(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Sa(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Zc.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ra(e,t){let r=xa(e),n=xa(t);if(r!==n)return r<n?-1:1;let s=Sa(e),o=Sa(t);if(s!==o)return s<o?-1:1;let a=Mt(e&&e.created_at),i=Mt(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var Ls=2**20;function Nr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Mt(e&&e.created_at)}function Ln(e){return(t,r)=>{let n=Nr(t,e),s=Nr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Os(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Nr(i,r)-Ls};if(!i)return{rank:Nr(a,r)+Ls};let c=Nr(a,r),u=Nr(i,r),f=(c+u)/2;return c<f&&f<u?{rank:f}:{renormalize:n.map((_,h)=>({bead_id:_.id,rank:h*Ls}))}}function Ds(e,t={}){let r=lt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||xr;function u(){for(let h of Array.from(a))try{h()}catch{}}function f(){s=Array.from(n.values()).sort(c)}function _(h){if(i||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let E of $)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);f(),o=T,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let E=n.get($.id);if(!E)n.set($.id,$);else{let B=Number.isFinite(E.updated_at)?E.updated_at:0,x=Number.isFinite($.updated_at)?$.updated_at:0;if(B<=x){for(let G of Object.keys(E))G in $||delete E[G];for(let[G,ee]of Object.entries($))E[G]=ee}}f()}o=T,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),f()),o=T,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function On(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ia(e){let t=lt("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let f=Array.isArray(c.added)?c.added:[],_=Array.isArray(c.updated)?c.updated:[],h=Array.isArray(c.removed)?c.removed:[];for(let T of Array.from(u)){let $=r.get(T);if(!$)continue;let E=$.itemsById;for(let B of f)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&E.delete(B)}}async function o(i,c){let u=On(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let _=r.get(i);if(_&&_.key!==u){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let f=n.get(u);f&&f.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(_){let h=r.get(i)||null;if(h){let T=n.get(h.key);T&&(T.delete(i),T.size===0&&n.delete(h.key))}throw r.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:On,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let f of c.itemsById.keys())u[f]=!0;return u}}}}function La(){let e=lt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,f){let _=u?On(u):"",h=r.get(c)||"",T=t.has(c);if(e("register %s key=%s (prev=%s)",c,_,h),T&&h&&_&&h!==_){let $=t.get(c);if($)try{$.dispose()}catch{}let E=s.get(c);if(E){try{E()}catch{}s.delete(c)}let B=Ds(c,f);t.set(c,B);let x=B.subscribe(()=>o());s.set(c,x)}else if(!T){let $=Ds(c,f);t.set(c,$);let E=$.subscribe(()=>o());s.set(c,E)}return r.set(c,_),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let f=s.get(c);if(f){try{f()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function Oa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Da(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ms(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Xc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Qc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ma(e){let t=lt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Xc(n),a=Qc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Ms(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Ms(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Jc=Object.freeze({workspace_config:{default_workspace:null}});function Na(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jc.workspace_config.default_workspace}}}function Pa(e={}){let t=lt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Na(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Na(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,f)=>u!==r.workspace.hidden[f]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,f)=>u===r.worker.show_closed_children[f])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Fa(e){let t=lt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(_,h)=>{let T=s++,$=Date.now();n.set(T,{type:_,start_ts:$}),t("request start id=%d type=%s count=%d",T,_,r+1),a();let E=!1,B=()=>{E||(E=!0,n.delete(T),i())},x=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,_,Date.now()-$),B())},3e4);try{let G=await u(_,h),ee=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",T,_,ee),G}catch(G){let ee=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,_,ee,G),G}finally{clearTimeout(x),B()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:u-_.start_ts}))}}}function J(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Dn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(Ca),c;switch(i){case"created_desc":return c.sort(xr),c;case"created_asc":return c.sort(Aa),c;case"updated_desc":return c.sort(Ta),c;case"priority":return c.sort(Ea),c;case"manual":default:{let u=r();return u?c.sort(Ln(u)):c.sort(xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Qt(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pt(e){let t=Qt(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Tt(e,t){let r=Qt(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Mn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Qt(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Nn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},f=n(Os(i,c,u.order),a);s(u,f);let _=await t("ui-order-set",{expected_revision:u.revision,entries:f});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(h);let T=n(Os(i,c,h.order),a);s(h,T);let $=await t("ui-order-set",{expected_revision:h.revision,entries:T});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Pn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ns(e,t){return!t||typeof e!="string"||e.length===0||Pn(t.visible_labels).includes(e)?!0:Pn(t.hidden_labels).includes(e)?!1:!Pn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Fn(e,t){return Pn(e).filter(r=>Ns(r,t))}function lr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var ed={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ba={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},qa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},td={review:"\u2713",skip:"\u2298"},cr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function rd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ua(e){let t=e&&e.fill||"none";return t==="none"?cr.none:e&&e.stale===!0?cr.stale:t==="dim"?cr.dim:e&&e.glyph==="review"?cr.review:e&&e.glyph==="skip"?cr.skip:cr.done}function nd(e){if(!e||e.fill==="none"||!e.approval_state)return Ua(e);let t=[];return e.glyph==="review"?t.push(cr.review):e.glyph==="skip"&&t.push(cr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function sd(e,t,r){let n=ed[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=td[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ba[e]||e}
      </div>
    </div>
  `}function qn(e,t){if(!e||!e.stages)return"";let r=qa[e.route]||qa.spec_backed,n=e.stages,s=rd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ba[a]||a} ${a==="plan"?nd(n[a]||{}):Ua(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>sd(a,n[a]||{},a===s))}
    </div>
  `}function od(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ja=2;function ad(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ja).join(", "),s=r.length-ja,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function id(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&lr(r,"route")){let a=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&lr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&lr(r,"pr")){let a=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}if(n.exec_receipt){let a=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${a.kind}:${a.actor}@${a.sha}`}
        >${`exec ${a.kind==="delegated"?a.actor:`main:${a.actor}`} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let a=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${a.actor}@${a.sha}`}
        >${`impl ${a.actor} \xB7 ${a.sha.slice(0,7)}`}</span
      >`)}for(let a of Fn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${a}</span>`);return e.from_id&&lr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),lr(r,"blocked")&&s.push(...ad(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&lr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function ld(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function cd(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function dd(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ra):r.children;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?l`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:l`<span class="board-card__roll-none">children 없음</span>`}
        ${cd(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,i)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${ld(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Bn(e,t){let r=od(e.priority);return l`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>t.onCardClick(n,e.id)}
      @dragstart=${n=>t.onDragStart(n,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${n=>t.onCopyId(n,e.id)}
        >
          ${e.id}
        </button>
        ${r?l`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${id(e,t)}
      ${e.workflow&&lr(t.policy||null,"stepper")?qn(e.workflow,e.status):""}
      ${dd(e,t)}
    </article>
  `}function Pr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?l`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Ht.map(o=>l`<option
                    value=${o.value}
                    ?selected=${o.value===e.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(o=>Bn(o,t))}
      </div>
    </section>
  `}function za(e,t,r){return l`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${r.onOverlayClick}
      @cancel=${r.onClose}
    >
      <div class="deferred-popup__container">
        <header class="deferred-popup__header">
          <div class="deferred-popup__title" id="deferred-popup-title">
            Deferred ${e.count}
          </div>
          <button
            type="button"
            class="deferred-popup__close"
            aria-label="닫기"
            @click=${r.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Bn(n,t))}
        </div>
      </div>
    </dialog>
  `}var ud=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],pd=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],fd=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function _d(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?l`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?l`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>l`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?l`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Ha(e,t,r){return l`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${e.search}
        @input=${t.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${t.onPriorityChange}
      >
        ${ud.map(n=>l`<option
              value=${n.value}
              ?selected=${e.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${pd.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${_d(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${r.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${fd.map(n=>l`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${t.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var md=200,gd={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},hd=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Wa="beads-ui.board.sort",Ga=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function bd(){try{let e=window.localStorage.getItem(Wa);if(e&&Ga.has(e))return e}catch{}return"created_desc"}function Ya(e,t){let r=lt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,f=t.onNewIssue,_=t.closedRange||At,h=s?Dn(s,a):null,T=Nn({transport:o,uiOrderStore:a}),$=[],E=[],B=[],x=[],G=[],ee=[],I=!1,L=0,A=bd(),j=new Map,N=new Map,ne=new Map,Ae=new Set,le={search:"",priority:"",type:"",labels:[]},ve=!1,$e=null;function et(q){return String(q.status||"open")==="open"}function nt(q){let Y=String(q.status||"open");return Y==="open"||Y==="blocked"}function De(q){let Y=le.search.trim().toLowerCase(),K=le.priority,_e=le.type,we=le.labels;return q.filter(Te=>{if(Y){let Ve=String(Te.id||"").toLowerCase(),ot=String(Te.title||"").toLowerCase();if(!Ve.includes(Y)&&!ot.includes(Y))return!1}if(K!==""&&String(Te.priority)!==K||_e!==""&&String(Te.issue_type||"")!==_e)return!1;if(we.length>0){let Ve=Array.isArray(Te.labels)?Te.labels:[];if(!we.some(ot=>Ve.includes(ot)))return!1}return!0})}function Fe(){let q=new Set;for(let Y of[$,E,B,x,G,ee])for(let K of Y){let _e=Array.isArray(K.labels)?K.labels:[];for(let we of _e)typeof we=="string"&&we.length>0&&q.add(we)}return Array.from(q).sort()}function xe(){return le.search.trim()!==""||le.priority!==""||le.type!==""||le.labels.length>0}function me(){try{if(h){let q=h.selectBoardColumn("tab:board:in-progress","in_progress",A),Y=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(nt),K=new Set(q.map(ke=>ke.id)),_e=h.selectBoardColumn("tab:board:ready","ready",A).filter(ke=>et(ke)&&!K.has(ke.id)),we=h.selectBoardColumn("tab:board:resolved","resolved",A),Te=h.selectBoardColumn("tab:board:deferred","deferred",A),Ve=h.selectBoardColumn("tab:board:closed","closed").slice(0,md),ot=[...Y,..._e,...q,...we,...Ve];ye(ot);let Se=new Set;for(let ke of ot)ke&&ke.id&&!Ps(ke)&&Se.add(ke.id);let Ke=!xe();$=Ke?Jr(Y,Se):Y,E=Ke?Jr(_e,Se):_e,B=Ke?Jr(q,Se):q,x=Ke?Jr(we,Se):we,G=Te,L=Te.length,ee=Ke?Jr(Ve,Se):Ve,j=new Map;for(let ke of $)j.set(ke.id,"open");for(let ke of E)j.set(ke.id,"open");for(let ke of B)j.set(ke.id,"in_progress");for(let ke of x)j.set(ke.id,"resolved");for(let ke of G)j.set(ke.id,"deferred");for(let ke of ee)j.set(ke.id,"closed");N=new Map;for(let ke of $)N.set(ke.id,"blocked-col");for(let ke of E)N.set(ke.id,"ready-col");for(let ke of B)N.set(ke.id,"in-progress-col");for(let ke of x)N.set(ke.id,"resolved-col");for(let ke of ee)N.set(ke.id,"closed-col")}Ie()}catch{$=[],E=[],B=[],x=[],G=[],ee=[],ne=new Map,Ie()}}function ye(q){let Y=new Map;for(let _e of q)_e&&_e.id&&!Y.has(_e.id)&&Y.set(_e.id,_e);let K=new Map;for(let _e of Y.values()){let we=Ps(_e);if(!we)continue;let Te=K.get(we);Te||(Te=[],K.set(we,Te)),Te.push({id:_e.id,title:_e.title,status:_e.status,metadata:_e.metadata,created_at:_e.created_at,updated_at:_e.updated_at})}ne=K}function he(q){let Y=ne.get(q)||[],K=0;for(let we of Y)(we.status==="resolved"||we.status==="closed")&&(K+=1);let _e=Mn(Y);return{total:Y.length,count:K,current:_e,children:Y}}function W(q){return!Ae.has(q)}function V(q,Y){q.preventDefault(),q.stopPropagation(),Ae.has(Y)?Ae.delete(Y):Ae.add(Y),Ie()}function Le(q,Y){q.preventDefault(),q.stopPropagation(),n(Y)}function de(q,Y){q.preventDefault(),q.stopPropagation(),n(Y)}function ie(q,Y){$e||n(Y)}function R(q,Y){q.preventDefault(),q.stopPropagation(),vd(Y).then(K=>{K&&J("\uBCF5\uC0AC\uB428","success",1200)})}function F(q,Y){$e=Y,q.dataTransfer&&(q.dataTransfer.setData("text/plain",Y),q.dataTransfer.effectAllowed="move"),q.target.classList.add("board-card--dragging")}function ce(q){q.target.classList.remove("board-card--dragging"),mt(),setTimeout(()=>{$e=null},0)}function Me(q){let Y=String(q.target.value||"");!Y||Y===_||(_=Y,u&&u(Y),Ie())}function Ee(){return i?i.get():null}function He(q){let Y=c?c.get():null,K=Y?Y.cleanup_failed:null;if(!K||typeof K!="object"||Array.isArray(K))return null;let _e=K[q];return!_e||typeof _e!="object"||Array.isArray(_e)?null:_e}let Oe={onCardClick:ie,onCopyId:R,onDragStart:F,onDragEnd:ce,onClosedRangeChange:Me,rollupFor:he,isExpanded:W,onRollupToggle:V,onChildClick:Le,onFromChipClick:de,cleanupFailureFor:He,get policy(){return Ee()}};function Ce(q,Y){$e||(C(),n(Y))}function Re(q,Y){q.preventDefault(),q.stopPropagation(),C(),n(Y)}let Ye={...Oe,onCardClick:Ce,onChildClick:Re,onFromChipClick:Re,get policy(){return Ee()}};function M(q){let Y=q.target,K=e.querySelector(".board-filter__labels");Y&&K&&K.contains(Y)||Q()}function U(q){q.key==="Escape"&&Q()}function P(){ve||(ve=!0,document.addEventListener("mousedown",M),document.addEventListener("keydown",U),Ie())}function Q(){ve&&(ve=!1,document.removeEventListener("mousedown",M),document.removeEventListener("keydown",U),Ie())}function fe(q){q.key==="Escape"&&C()}function w(){I||(I=!0,document.addEventListener("keydown",fe),Ie())}function C(){I&&(I=!1,document.removeEventListener("keydown",fe),Ie())}let z={onClose:C,onOverlayClick(q){q.target===q.currentTarget&&C()}},ue={onSearchInput(q){le.search=String(q.target.value||""),me()},onPriorityChange(q){le.priority=String(q.target.value||""),me()},onTypeChange(q){le.type=String(q.target.value||""),me()},onSortChange(q){let Y=String(q.target.value||"");if(!(!Ga.has(Y)||Y===A)){A=Y;try{window.localStorage.setItem(Wa,Y)}catch{}me()}},onDeferredToggle(){I?C():w()},onLabelMenuToggle(){ve?Q():P()},onLabelToggle(q){let Y=le.labels.indexOf(q);Y===-1?le.labels.push(q):le.labels.splice(Y,1),me()},onLabelClear(){le.labels.length!==0&&(le.labels=[],me())},onNewIssue(){f&&f()}};function ae(){return l`
      <div class="board-view">
        ${Ha(le,ue,{sort_mode:A,deferred_popup_open:I,deferred_count:L,label_options:Fe(),label_menu_open:ve})}
        <div class="board-root">
          ${Pr({title:"Blocked",id:"blocked-col",items:De($)},Oe)}
          ${Pr({title:"Ready",id:"ready-col",items:De(E)},Oe)}
          ${Pr({title:"In progress",id:"in-progress-col",items:De(B)},Oe)}
          ${Pr({title:"Resolved",id:"resolved-col",items:De(x)},Oe)}
          ${Pr({title:"Closed",id:"closed-col",items:De(ee),is_closed:!0,closed_range:_},Oe)}
        </div>
        ${I?za({items:De(G),count:L},Ye,z):""}
      </div>
    `}function Ie(){ze(ae(),e),Ne()}function Ne(){try{let q=e.querySelector("#deferred-popup");q&&!q.open&&(typeof q.showModal=="function"?q.showModal():q.setAttribute("open",""));let Y=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let K of Y)Array.from(K.querySelectorAll(".board-card")).forEach((we,Te)=>{we.tabIndex=Te===0?0:-1})}catch{}}async function tt(q,Y){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:q,status:Y}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(K){r("update-status failed: %o",K),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Be(q){switch(q){case"blocked-col":return $;case"ready-col":return E;case"in-progress-col":return B;case"resolved-col":return x;default:return[]}}function _t(q,Y,K){if(!o||!a)return;let _e=Be(q),we=_e.find(Ke=>Ke.id===Y);if(!we)return;let Te=_e.filter(Ke=>Ke.id!==Y),Ve=K.closest?K.closest(".board-card"):null,ot=Te.length;if(Ve){let Ke=Ve.getAttribute("data-issue-id");if(Ke===Y)return;let ke=Te.findIndex(ut=>ut.id===Ke);ke>=0&&(ot=ke)}let Se=Te.slice();Se.splice(ot,0,we),T.applyReorder(Y,Se,ot)}function mt(){for(let q of Array.from(e.querySelectorAll(".board-column--drag-over")))q.classList.remove("board-column--drag-over")}let st=null;e.addEventListener("dragover",q=>{q.preventDefault(),q.dataTransfer&&(q.dataTransfer.dropEffect="move");let K=q.target.closest(".board-column");K&&K!==st&&(st&&st.classList.remove("board-column--drag-over"),K.classList.add("board-column--drag-over"),st=K)}),e.addEventListener("dragleave",q=>{let Y=q.relatedTarget;(!Y||!e.contains(Y))&&st&&(st.classList.remove("board-column--drag-over"),st=null)}),e.addEventListener("drop",q=>{q.preventDefault(),st&&(st.classList.remove("board-column--drag-over"),st=null);let Y=q.target,K=Y.closest(".board-column");if(!K)return;let _e=q.dataTransfer?.getData("text/plain")||"";if(!_e)return;let we=K.id,Te=N.get(_e);if(Te&&Te===we){if(hd.has(we)){if(A!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}_t(we,_e,Y)}return}let Ve=gd[we];if(!Ve){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}j.get(_e)!==Ve&&tt(_e,Ve)}),e.addEventListener("keydown",q=>{let Y=q.target;if(!(Y instanceof HTMLElement))return;let K=String(Y.tagName||"").toLowerCase();if(K==="input"||K==="textarea"||K==="select"||K==="button"||K==="a"||Y.isContentEditable===!0)return;let _e=Y.closest(".board-card");if(!_e)return;let we=String(q.key||"");if(we==="Enter"||we===" "){q.preventDefault();let Se=_e.getAttribute("data-issue-id");Se&&n(Se);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;q.preventDefault();let Te=_e.closest(".board-column");if(!Te)return;let Ve=Array.from(Te.querySelectorAll(".board-card")),ot=Ve.indexOf(_e);if(we==="ArrowDown"&&ot<Ve.length-1){at(_e,Ve[ot+1]);return}if(we==="ArrowUp"&&ot>0){at(_e,Ve[ot-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let Se=Array.from(e.querySelectorAll(".board-column")),Ke=Se.indexOf(Te),ke=we==="ArrowRight"?1:-1,ut=Ke+ke;for(;ut>=0&&ut<Se.length;){let vt=Se[ut].querySelector(".board-card");if(vt){at(_e,vt);return}ut+=ke}}});function at(q,Y){try{q.tabIndex=-1,Y.tabIndex=0,Y.focus()}catch{}}let it=null;h&&h.subscribe&&(it=h.subscribe(()=>{try{me()}catch{}}));let ct=null;i&&i.subscribe&&(ct=i.subscribe(()=>{try{me()}catch{}}));let bt=null;return c&&c.subscribe&&(bt=c.subscribe(()=>{Ie()})),{async load(){r("load"),me()},clear(){Q(),C(),it&&(it(),it=null),ct&&(ct(),ct=null),bt&&(bt(),bt=null),e.replaceChildren(),$=[],E=[],B=[],x=[],G=[],ee=[],j=new Map,N=new Map}}}function Ps(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Jr(e,t){return e.filter(r=>{let n=Ps(r);return!(n&&t.has(n))})}async function vd(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Sr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Wt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function dr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function yd(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Wt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Wt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=f=>{typeof r.close=="function"&&r.close(),r.remove(),c(f)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",f=>{f.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function Jt(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await yd(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Qa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ft(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var er=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],en=[...er,"reasoning_output_tokens"],wd=["implementation","review-consult"];function Fs(e){let t=0;for(let r of er)t+=ft(e?.[r]);return t}function kd(e){return!e||typeof e!="object"?!1:er.some(t=>Number.isFinite(e[t]))}function Va(e){return!e||typeof e!="object"?!1:en.some(t=>Number.isFinite(e[t]))}function $d(e){let t={};for(let r of en)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ka(e){let t={};for(let r of en)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Za(e,t){return e==="codex"?ft(t.input_tokens)+ft(t.output_tokens):Fs(t)}function xd(e){return e==="claude"?"Claude":"Codex"}function Sd(e){return`\u03C4 ${Ja(e)}`}function Ad(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${ft(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${ft(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${ft(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${ft(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Qa),o.join(`
`)}function ht(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${xd(r)} ${Sd(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Ad(r,n)})}return t}function jn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of en)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=ft(i.breakdown[c])+ft(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function qs(e){return!e||typeof e!="object"?null:It({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Td(e){return e==="codex"?"codex":"claude"}function ur(){return{subtotal:0,breakdown:$d(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Un(e,t,r){e.subtotal+=t.subtotal;for(let n of en)Number.isFinite(t.usage[n])&&(e.breakdown[n]=ft(e.breakdown[n])+ft(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Xa(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Ja(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Fr(e){return kd(e)?`\u03C4 ${Ja(Fs(e))}`:null}function Nt(e){let t=Fr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function qr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ft(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ft(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ft(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ft(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Fs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Qa),r.join(`
`)}function It(e,t){let r={claude:ur(),codex:ur()},n={orchestrator:{claude:ur(),codex:ur()},implementation:{claude:ur(),codex:ur()},"review-consult":{claude:ur(),codex:ur()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Va(c)){let f=Td(i.runner),_=Ka(c),h={provider:f,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:Za(f,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Un(r[f],h,!0),Un(n.orchestrator[f],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let f of u){if(!f||f.provider!=="codex"||!wd.includes(f.role)||!Va(f.usage))continue;let _=typeof f.receipt_id=="string"&&f.receipt_id.length>0?f.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=Ka(f.usage),T={provider:"codex",role:f.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Za("codex",h)};T.receipt_id=_,typeof f.model=="string"&&(T.model=f.model),typeof f.session_id=="string"?T.session_id=f.session_id:typeof f.thread_id=="string"&&(T.session_id=f.thread_id),typeof f.turn_id=="string"&&(T.turn_id=f.turn_id),typeof f.completed_at=="string"&&(T.completed_at=f.completed_at),h.replayed===!0&&(T.replayed=!0),Un(r.codex,T,!1),Un(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Xa(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let c={};for(let u of["claude","codex"]){let f=n[i][u];f.legs.length>0&&(c[u]={...Xa(f,!0),legs:f.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:li,setPrototypeOf:ei,isFrozen:Ed,getPrototypeOf:Cd,getOwnPropertyDescriptor:Rd}=Object,{freeze:wt,seal:Lt,create:Gs}=Object,{apply:Ys,construct:Vs}=typeof Reflect<"u"&&Reflect;wt||(wt=function(t){return t});Lt||(Lt=function(t){return t});Ys||(Ys=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Vs||(Vs=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var zn=kt(Array.prototype.forEach),Id=kt(Array.prototype.lastIndexOf),ti=kt(Array.prototype.pop),tn=kt(Array.prototype.push),Ld=kt(Array.prototype.splice),Wn=kt(String.prototype.toLowerCase),Bs=kt(String.prototype.toString),Us=kt(String.prototype.match),rn=kt(String.prototype.replace),Od=kt(String.prototype.indexOf),Dd=kt(String.prototype.trim),Pt=kt(Object.prototype.hasOwnProperty),yt=kt(RegExp.prototype.test),nn=Md(TypeError);function kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ys(e,t,n)}}function Md(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Vs(e,r)}}function je(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Wn;ei&&ei(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ed(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nd(e){for(let t=0;t<e.length;t++)Pt(e,t)||(e[t]=null);return e}function tr(e){let t=Gs(null);for(let[r,n]of li(e))Pt(e,r)&&(Array.isArray(n)?t[r]=Nd(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=tr(n):t[r]=n);return t}function sn(e,t){for(;e!==null;){let n=Rd(e,t);if(n){if(n.get)return kt(n.get);if(typeof n.value=="function")return kt(n.value)}e=Cd(e)}function r(){return null}return r}var ri=wt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),js=wt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),zs=wt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pd=wt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Hs=wt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fd=wt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ni=wt(["#text"]),si=wt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ws=wt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),oi=wt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Hn=wt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),qd=Lt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bd=Lt(/<%[\w\W]*|[\w\W]*%>/gm),Ud=Lt(/\$\{[\w\W]*/gm),jd=Lt(/^data-[\-\w.\u00B7-\uFFFF]+$/),zd=Lt(/^aria-[\-\w]+$/),ci=Lt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Hd=Lt(/^(?:\w+script|data):/i),Wd=Lt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),di=Lt(/^html$/i),Gd=Lt(/^[a-z][.\w]*(-[.\w]+)+$/i),ai=Object.freeze({__proto__:null,ARIA_ATTR:zd,ATTR_WHITESPACE:Wd,CUSTOM_ELEMENT:Gd,DATA_ATTR:jd,DOCTYPE_NAME:di,ERB_EXPR:Bd,IS_ALLOWED_URI:ci,IS_SCRIPT_OR_DATA:Hd,MUSTACHE_EXPR:qd,TMPLIT_EXPR:Ud}),on={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yd=function(){return typeof window>"u"?null:window},Vd=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ii=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ui(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yd(),t=Z=>ui(Z);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==on.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:T}=e,$=c.prototype,E=sn($,"cloneNode"),B=sn($,"remove"),x=sn($,"nextSibling"),G=sn($,"childNodes"),ee=sn($,"parentNode");if(typeof a=="function"){let Z=r.createElement("template");Z.content&&Z.content.ownerDocument&&(r=Z.content.ownerDocument)}let I,L="",{implementation:A,createNodeIterator:j,createDocumentFragment:N,getElementsByTagName:ne}=r,{importNode:Ae}=n,le=ii();t.isSupported=typeof li=="function"&&typeof ee=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ve,ERB_EXPR:$e,TMPLIT_EXPR:et,DATA_ATTR:nt,ARIA_ATTR:De,IS_SCRIPT_OR_DATA:Fe,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:me}=ai,{IS_ALLOWED_URI:ye}=ai,he=null,W=je({},[...ri,...js,...zs,...Hs,...ni]),V=null,Le=je({},[...si,...Ws,...oi,...Hn]),de=Object.seal(Gs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ie=null,R=null,F=Object.seal(Gs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ce=!0,Me=!0,Ee=!1,He=!0,Oe=!1,Ce=!0,Re=!1,Ye=!1,M=!1,U=!1,P=!1,Q=!1,fe=!0,w=!1,C="user-content-",z=!0,ue=!1,ae={},Ie=null,Ne=je({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),tt=null,Be=je({},["audio","video","img","source","image","track"]),_t=null,mt=je({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),st="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",it="http://www.w3.org/1999/xhtml",ct=it,bt=!1,q=null,Y=je({},[st,at,it],Bs),K=je({},["mi","mo","mn","ms","mtext"]),_e=je({},["annotation-xml"]),we=je({},["title","style","font","a","script"]),Te=null,Ve=["application/xhtml+xml","text/html"],ot="text/html",Se=null,Ke=null,ke=r.createElement("form"),ut=function(v){return v instanceof RegExp||v instanceof Function},vt=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ke&&Ke===v)){if((!v||typeof v!="object")&&(v={}),v=tr(v),Te=Ve.indexOf(v.PARSER_MEDIA_TYPE)===-1?ot:v.PARSER_MEDIA_TYPE,Se=Te==="application/xhtml+xml"?Bs:Wn,he=Pt(v,"ALLOWED_TAGS")?je({},v.ALLOWED_TAGS,Se):W,V=Pt(v,"ALLOWED_ATTR")?je({},v.ALLOWED_ATTR,Se):Le,q=Pt(v,"ALLOWED_NAMESPACES")?je({},v.ALLOWED_NAMESPACES,Bs):Y,_t=Pt(v,"ADD_URI_SAFE_ATTR")?je(tr(mt),v.ADD_URI_SAFE_ATTR,Se):mt,tt=Pt(v,"ADD_DATA_URI_TAGS")?je(tr(Be),v.ADD_DATA_URI_TAGS,Se):Be,Ie=Pt(v,"FORBID_CONTENTS")?je({},v.FORBID_CONTENTS,Se):Ne,ie=Pt(v,"FORBID_TAGS")?je({},v.FORBID_TAGS,Se):tr({}),R=Pt(v,"FORBID_ATTR")?je({},v.FORBID_ATTR,Se):tr({}),ae=Pt(v,"USE_PROFILES")?v.USE_PROFILES:!1,ce=v.ALLOW_ARIA_ATTR!==!1,Me=v.ALLOW_DATA_ATTR!==!1,Ee=v.ALLOW_UNKNOWN_PROTOCOLS||!1,He=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=v.SAFE_FOR_TEMPLATES||!1,Ce=v.SAFE_FOR_XML!==!1,Re=v.WHOLE_DOCUMENT||!1,U=v.RETURN_DOM||!1,P=v.RETURN_DOM_FRAGMENT||!1,Q=v.RETURN_TRUSTED_TYPE||!1,M=v.FORCE_BODY||!1,fe=v.SANITIZE_DOM!==!1,w=v.SANITIZE_NAMED_PROPS||!1,z=v.KEEP_CONTENT!==!1,ue=v.IN_PLACE||!1,ye=v.ALLOWED_URI_REGEXP||ci,ct=v.NAMESPACE||it,K=v.MATHML_TEXT_INTEGRATION_POINTS||K,_e=v.HTML_INTEGRATION_POINTS||_e,de=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&ut(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(Me=!1),P&&(U=!0),ae&&(he=je({},ni),V=[],ae.html===!0&&(je(he,ri),je(V,si)),ae.svg===!0&&(je(he,js),je(V,Ws),je(V,Hn)),ae.svgFilters===!0&&(je(he,zs),je(V,Ws),je(V,Hn)),ae.mathMl===!0&&(je(he,Hs),je(V,oi),je(V,Hn))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?F.tagCheck=v.ADD_TAGS:(he===W&&(he=tr(he)),je(he,v.ADD_TAGS,Se))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?F.attributeCheck=v.ADD_ATTR:(V===Le&&(V=tr(V)),je(V,v.ADD_ATTR,Se))),v.ADD_URI_SAFE_ATTR&&je(_t,v.ADD_URI_SAFE_ATTR,Se),v.FORBID_CONTENTS&&(Ie===Ne&&(Ie=tr(Ie)),je(Ie,v.FORBID_CONTENTS,Se)),z&&(he["#text"]=!0),Re&&je(he,["html","head","body"]),he.table&&(je(he,["tbody"]),delete ie.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw nn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');I=v.TRUSTED_TYPES_POLICY,L=I.createHTML("")}else I===void 0&&(I=Vd(T,s)),I!==null&&typeof L=="string"&&(L=I.createHTML(""));wt&&wt(v),Ke=v}},Vt=je({},[...js,...zs,...Pd]),Bt=je({},[...Hs,...Fd]),Ut=function(v){let H=ee(v);(!H||!H.tagName)&&(H={namespaceURI:ct,tagName:"template"});let se=Wn(v.tagName),Pe=Wn(H.tagName);return q[v.namespaceURI]?v.namespaceURI===at?H.namespaceURI===it?se==="svg":H.namespaceURI===st?se==="svg"&&(Pe==="annotation-xml"||K[Pe]):!!Vt[se]:v.namespaceURI===st?H.namespaceURI===it?se==="math":H.namespaceURI===at?se==="math"&&_e[Pe]:!!Bt[se]:v.namespaceURI===it?H.namespaceURI===at&&!_e[Pe]||H.namespaceURI===st&&!K[Pe]?!1:!Bt[se]&&(we[se]||!Vt[se]):!!(Te==="application/xhtml+xml"&&q[v.namespaceURI]):!1},gt=function(v){tn(t.removed,{element:v});try{ee(v).removeChild(v)}catch{B(v)}},xt=function(v,H){try{tn(t.removed,{attribute:H.getAttributeNode(v),from:H})}catch{tn(t.removed,{attribute:null,from:H})}if(H.removeAttribute(v),v==="is")if(U||P)try{gt(H)}catch{}else try{H.setAttribute(v,"")}catch{}},jt=function(v){let H=null,se=null;if(M)v="<remove></remove>"+v;else{let Ze=Us(v,/^[\r\n\t ]+/);se=Ze&&Ze[0]}Te==="application/xhtml+xml"&&ct===it&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let Pe=I?I.createHTML(v):v;if(ct===it)try{H=new h().parseFromString(Pe,Te)}catch{}if(!H||!H.documentElement){H=A.createDocument(ct,"template",null);try{H.documentElement.innerHTML=bt?L:Pe}catch{}}let Qe=H.body||H.documentElement;return v&&se&&Qe.insertBefore(r.createTextNode(se),Qe.childNodes[0]||null),ct===it?ne.call(H,Re?"html":"body")[0]:Re?H.documentElement:Qe},Ot=function(v){return j.call(v.ownerDocument||v,v,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},p=function(v){return v instanceof _&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof f)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},y=function(v){return typeof i=="function"&&v instanceof i};function S(Z,v,H){zn(Z,se=>{se.call(t,v,H,Ke)})}let re=function(v){let H=null;if(S(le.beforeSanitizeElements,v,null),p(v))return gt(v),!0;let se=Se(v.nodeName);if(S(le.uponSanitizeElement,v,{tagName:se,allowedTags:he}),Ce&&v.hasChildNodes()&&!y(v.firstElementChild)&&yt(/<[/\w!]/g,v.innerHTML)&&yt(/<[/\w!]/g,v.textContent)||v.nodeType===on.progressingInstruction||Ce&&v.nodeType===on.comment&&yt(/<[/\w]/g,v.data))return gt(v),!0;if(!(F.tagCheck instanceof Function&&F.tagCheck(se))&&(!he[se]||ie[se])){if(!ie[se]&&be(se)&&(de.tagNameCheck instanceof RegExp&&yt(de.tagNameCheck,se)||de.tagNameCheck instanceof Function&&de.tagNameCheck(se)))return!1;if(z&&!Ie[se]){let Pe=ee(v)||v.parentNode,Qe=G(v)||v.childNodes;if(Qe&&Pe){let Ze=Qe.length;for(let m=Ze-1;m>=0;--m){let d=E(Qe[m],!0);d.__removalCount=(v.__removalCount||0)+1,Pe.insertBefore(d,x(v))}}}return gt(v),!0}return v instanceof c&&!Ut(v)||(se==="noscript"||se==="noembed"||se==="noframes")&&yt(/<\/no(script|embed|frames)/i,v.innerHTML)?(gt(v),!0):(Oe&&v.nodeType===on.text&&(H=v.textContent,zn([ve,$e,et],Pe=>{H=rn(H,Pe," ")}),v.textContent!==H&&(tn(t.removed,{element:v.cloneNode()}),v.textContent=H)),S(le.afterSanitizeElements,v,null),!1)},ge=function(v,H,se){if(fe&&(H==="id"||H==="name")&&(se in r||se in ke))return!1;if(!(Me&&!R[H]&&yt(nt,H))){if(!(ce&&yt(De,H))){if(!(F.attributeCheck instanceof Function&&F.attributeCheck(H,v))){if(!V[H]||R[H]){if(!(be(v)&&(de.tagNameCheck instanceof RegExp&&yt(de.tagNameCheck,v)||de.tagNameCheck instanceof Function&&de.tagNameCheck(v))&&(de.attributeNameCheck instanceof RegExp&&yt(de.attributeNameCheck,H)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(H,v))||H==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&yt(de.tagNameCheck,se)||de.tagNameCheck instanceof Function&&de.tagNameCheck(se))))return!1}else if(!_t[H]){if(!yt(ye,rn(se,xe,""))){if(!((H==="src"||H==="xlink:href"||H==="href")&&v!=="script"&&Od(se,"data:")===0&&tt[v])){if(!(Ee&&!yt(Fe,rn(se,xe,"")))){if(se)return!1}}}}}}}return!0},be=function(v){return v!=="annotation-xml"&&Us(v,me)},pe=function(v){S(le.beforeSanitizeAttributes,v,null);let{attributes:H}=v;if(!H||p(v))return;let se={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:V,forceKeepAttr:void 0},Pe=H.length;for(;Pe--;){let Qe=H[Pe],{name:Ze,namespaceURI:m,value:d}=Qe,k=Se(Ze),b=d,D=Ze==="value"?b:Dd(b);if(se.attrName=k,se.attrValue=D,se.keepAttr=!0,se.forceKeepAttr=void 0,S(le.uponSanitizeAttribute,v,se),D=se.attrValue,w&&(k==="id"||k==="name")&&(xt(Ze,v),D=C+D),Ce&&yt(/((--!?|])>)|<\/(style|title|textarea)/i,D)){xt(Ze,v);continue}if(k==="attributename"&&Us(D,"href")){xt(Ze,v);continue}if(se.forceKeepAttr)continue;if(!se.keepAttr){xt(Ze,v);continue}if(!He&&yt(/\/>/i,D)){xt(Ze,v);continue}Oe&&zn([ve,$e,et],X=>{D=rn(D,X," ")});let te=Se(v.nodeName);if(!ge(te,k,D)){xt(Ze,v);continue}if(I&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!m)switch(T.getAttributeType(te,k)){case"TrustedHTML":{D=I.createHTML(D);break}case"TrustedScriptURL":{D=I.createScriptURL(D);break}}if(D!==b)try{m?v.setAttributeNS(m,Ze,D):v.setAttribute(Ze,D),p(v)?gt(v):ti(t.removed)}catch{xt(Ze,v)}}S(le.afterSanitizeAttributes,v,null)},We=function Z(v){let H=null,se=Ot(v);for(S(le.beforeSanitizeShadowDOM,v,null);H=se.nextNode();)S(le.uponSanitizeShadowNode,H,null),re(H),pe(H),H.content instanceof o&&Z(H.content);S(le.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(Z){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},H=null,se=null,Pe=null,Qe=null;if(bt=!Z,bt&&(Z="<!-->"),typeof Z!="string"&&!y(Z))if(typeof Z.toString=="function"){if(Z=Z.toString(),typeof Z!="string")throw nn("dirty is not a string, aborting")}else throw nn("toString is not a function");if(!t.isSupported)return Z;if(Ye||vt(v),t.removed=[],typeof Z=="string"&&(ue=!1),ue){if(Z.nodeName){let d=Se(Z.nodeName);if(!he[d]||ie[d])throw nn("root node is forbidden and cannot be sanitized in-place")}}else if(Z instanceof i)H=jt("<!---->"),se=H.ownerDocument.importNode(Z,!0),se.nodeType===on.element&&se.nodeName==="BODY"||se.nodeName==="HTML"?H=se:H.appendChild(se);else{if(!U&&!Oe&&!Re&&Z.indexOf("<")===-1)return I&&Q?I.createHTML(Z):Z;if(H=jt(Z),!H)return U?null:Q?L:""}H&&M&&gt(H.firstChild);let Ze=Ot(ue?Z:H);for(;Pe=Ze.nextNode();)re(Pe),pe(Pe),Pe.content instanceof o&&We(Pe.content);if(ue)return Z;if(U){if(P)for(Qe=N.call(H.ownerDocument);H.firstChild;)Qe.appendChild(H.firstChild);else Qe=H;return(V.shadowroot||V.shadowrootmode)&&(Qe=Ae.call(n,Qe,!0)),Qe}let m=Re?H.outerHTML:H.innerHTML;return Re&&he["!doctype"]&&H.ownerDocument&&H.ownerDocument.doctype&&H.ownerDocument.doctype.name&&yt(di,H.ownerDocument.doctype.name)&&(m="<!DOCTYPE "+H.ownerDocument.doctype.name+`>
`+m),Oe&&zn([ve,$e,et],d=>{m=rn(m,d," ")}),I&&Q?I.createHTML(m):m},t.setConfig=function(){let Z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};vt(Z),Ye=!0},t.clearConfig=function(){Ke=null,Ye=!1},t.isValidAttribute=function(Z,v,H){Ke||vt({});let se=Se(Z),Pe=Se(v);return ge(se,Pe,H)},t.addHook=function(Z,v){typeof v=="function"&&tn(le[Z],v)},t.removeHook=function(Z,v){if(v!==void 0){let H=Id(le[Z],v);return H===-1?void 0:Ld(le[Z],H,1)[0]}return ti(le[Z])},t.removeHooks=function(Z){le[Z]=[]},t.removeAllHooks=function(){le=ii()},t}var pi=ui();var fi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},_i=e=>(...t)=>({_$litDirective$:e,values:t}),Gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var an=class extends Gn{constructor(t){if(super(t),this.it=dt,t.type!==fi.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===dt||t==null)return this._t=void 0,this.it=t;if(t===wr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};an.directiveName="unsafeHTML",an.resultType=1;var mi=_i(an);function Qs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tr=Qs();function ki(e){Tr=e}var un={exec:()=>null};function Ge(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($t.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kd=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$t={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zd=/^(?:[ \t]*(?:\n|$))+/,Xd=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Qd=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,pn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Js=/(?:[*+-]|\d{1,9}[.)])/,$i=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,xi=Ge($i).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),eu=Ge($i).replace(/bull/g,Js).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),eo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tu=/^[^\n]+/,to=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ru=Ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",to).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nu=Ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Js).getRegex(),Qn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,su=Ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ro).replace("tag",Qn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Si=Ge(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),ou=Ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Si).getRegex(),no={blockquote:ou,code:Xd,def:ru,fences:Qd,heading:Jd,hr:pn,html:su,lheading:xi,list:nu,newline:Zd,paragraph:Si,table:un,text:tu},gi=Ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex(),au={...no,lheading:eu,table:gi,paragraph:Ge(eo).replace("hr",pn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",gi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qn).getRegex()},iu={...no,html:Ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:un,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ge(eo).replace("hr",pn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",xi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cu=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ai=/^( {2,}|\\)\n(?!\s*$)/,du=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jn=/[\p{P}\p{S}]/u,so=/[\s\p{P}\p{S}]/u,Ti=/[^\s\p{P}\p{S}]/u,uu=Ge(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,so).getRegex(),Ei=/(?!~)[\p{P}\p{S}]/u,pu=/(?!~)[\s\p{P}\p{S}]/u,fu=/(?:[^\s\p{P}\p{S}]|~)/u,_u=Ge(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kd?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ci=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mu=Ge(Ci,"u").replace(/punct/g,Jn).getRegex(),gu=Ge(Ci,"u").replace(/punct/g,Ei).getRegex(),Ri="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",hu=Ge(Ri,"gu").replace(/notPunctSpace/g,Ti).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),bu=Ge(Ri,"gu").replace(/notPunctSpace/g,fu).replace(/punctSpace/g,pu).replace(/punct/g,Ei).getRegex(),vu=Ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ti).replace(/punctSpace/g,so).replace(/punct/g,Jn).getRegex(),yu=Ge(/\\(punct)/,"gu").replace(/punct/g,Jn).getRegex(),wu=Ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ku=Ge(ro).replace("(?:-->|$)","-->").getRegex(),$u=Ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ku).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Kn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xu=Ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Kn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ii=Ge(/^!?\[(label)\]\[(ref)\]/).replace("label",Kn).replace("ref",to).getRegex(),Li=Ge(/^!?\[(ref)\](?:\[\])?/).replace("ref",to).getRegex(),Su=Ge("reflink|nolink(?!\\()","g").replace("reflink",Ii).replace("nolink",Li).getRegex(),hi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,oo={_backpedal:un,anyPunctuation:yu,autolink:wu,blockSkip:_u,br:Ai,code:cu,del:un,emStrongLDelim:mu,emStrongRDelimAst:hu,emStrongRDelimUnd:vu,escape:lu,link:xu,nolink:Li,punctuation:uu,reflink:Ii,reflinkSearch:Su,tag:$u,text:du,url:un},Au={...oo,link:Ge(/^!?\[(label)\]\((.*?)\)/).replace("label",Kn).getRegex(),reflink:Ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Kn).getRegex()},Ks={...oo,emStrongRDelimAst:bu,emStrongLDelim:gu,url:Ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",hi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",hi).getRegex()},Tu={...Ks,br:Ge(Ai).replace("{2,}","*").getRegex(),text:Ge(Ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yn={normal:no,gfm:au,pedantic:iu},ln={normal:oo,gfm:Ks,breaks:Tu,pedantic:Au},Eu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},bi=e=>Eu[e];function rr(e,t){if(t){if($t.escapeTest.test(e))return e.replace($t.escapeReplace,bi)}else if($t.escapeTestNoEncode.test(e))return e.replace($t.escapeReplaceNoEncode,bi);return e}function vi(e){try{e=encodeURI(e).replace($t.percentDecode,"%")}catch{return null}return e}function yi(e,t){let r=e.replace($t.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split($t.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace($t.slashPipe,"|");return n}function cn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cu(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function wi(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function Ru(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zn=class{constructor(e){rt(this,"options");rt(this,"rules");rt(this,"lexer");this.options=e||Tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:cn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Ru(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=cn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:cn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=cn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),f=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.blockquote($);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(h?.type==="list"){let T=h,$=T.raw+`
`+r.join(`
`),E=this.list($);o[o.length-1]=E,n=n.substring(0,n.length-h.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],T=!_.trim(),$=0;if(this.options.pedantic?($=2,f=_.trimStart()):T?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,f=_.slice($),$+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),c=!0),!c){let E=this.rules.other.nextBulletRegex($),B=this.rules.other.hrRegex($),x=this.rules.other.fencesBeginRegex($),G=this.rules.other.headingBeginRegex($),ee=this.rules.other.htmlBeginRegex($);for(;e;){let I=e.split(`
`,1)[0],L;if(h=I,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),L=h):L=h.replace(this.rules.other.tabCharGlobal,"    "),x.test(h)||G.test(h)||ee.test(h)||E.test(h)||B.test(h))break;if(L.search(this.rules.other.nonSpaceChar)>=$||!h.trim())f+=`
`+L.slice($);else{if(T||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||x.test(_)||G.test(_)||B.test(_))break;f+=`
`+h}!T&&!h.trim()&&(T=!0),u+=I+`
`,e=e.substring(I.length+1),_=L.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let f={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=f.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=f.raw+c.tokens[0].raw,c.tokens[0].text=f.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(f)):c.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):c.tokens.unshift(f)}}if(!s.loose){let u=c.tokens.filter(_=>_.type==="space"),f=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=yi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(yi(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=cn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cu(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),wi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return wi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+a);if(Math.min(s,a)%2){let T=_.slice(1,-1);return{type:"em",raw:_,text:T,tokens:this.lexer.inlineTokens(T)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Zs{constructor(t){rt(this,"tokens");rt(this,"options");rt(this,"state");rt(this,"inlineQueue");rt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Tr,this.options.tokenizer=this.options.tokenizer||new Zn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:$t,block:Yn.normal,inline:ln.normal};this.options.pedantic?(r.block=Yn.pedantic,r.inline=ln.pedantic):this.options.gfm&&(r.block=Yn.gfm,this.options.breaks?r.inline=ln.breaks:r.inline=ln.gfm),this.tokenizer.rules=r}static get rules(){return{block:Yn,inline:ln}}static lex(t,r){return new Zs(r).lex(t)}static lexInline(t,r){return new Zs(r).inlineTokens(t)}lex(t){t=t.replace($t.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace($t.tabCharGlobal,"    ").replace($t.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(f=>(c=f.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let f=r.at(-1);c.type==="text"&&f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},_),typeof h=="number"&&h>=0&&(f=Math.min(f,h))}),f<1/0&&f>=0&&(u=t.substring(0,f+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=c.raw,f.text+=c.text):r.push(c);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},Xn=class{constructor(e){rt(this,"options");rt(this,"parser");this.options=e||Tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match($t.notSpaceStart)?.[0],s=e.replace($t.endingNewline,"")+`
`;return n?'<pre><code class="language-'+rr(n)+'">'+(r?s:rr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:rr(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let a=0;a<o.length;a++)r+=this.tablecell(o[a]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${rr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=vi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+rr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=vi(e);if(s===null)return rr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${rr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:rr(e.text)}},ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Xs{constructor(t){rt(this,"options");rt(this,"renderer");rt(this,"textRenderer");this.options=t||Tr,this.options.renderer=this.options.renderer||new Xn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ao}static parse(t,r){return new Xs(r).parse(t)}static parseInline(t,r){return new Xs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},Vn,dn=(Vn=class{constructor(e){rt(this,"options");rt(this,"block");this.options=e||Tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},rt(Vn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),rt(Vn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vn),Iu=class{constructor(...e){rt(this,"defaults",Qs());rt(this,"options",this.setOptions);rt(this,"parse",this.parseMarkdown(!0));rt(this,"parseInline",this.parseMarkdown(!1));rt(this,"Parser",qt);rt(this,"Renderer",Xn);rt(this,"TextRenderer",ao);rt(this,"Lexer",Ft);rt(this,"Tokenizer",Zn);rt(this,"Hooks",dn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Xn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new dn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];dn.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&dn.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return c.call(s,_)})();let f=i.call(s,u);return c.call(s,f)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await c.apply(s,u)),_})();let f=i.apply(s,u);return f===!1&&(f=c.apply(s,u)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+rr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ar=new Iu;function Je(e,t){return Ar.parse(e,t)}Je.options=Je.setOptions=function(e){return Ar.setOptions(e),Je.defaults=Ar.defaults,ki(Je.defaults),Je};Je.getDefaults=Qs;Je.defaults=Tr;Je.use=function(...e){return Ar.use(...e),Je.defaults=Ar.defaults,ki(Je.defaults),Je};Je.walkTokens=function(e,t){return Ar.walkTokens(e,t)};Je.parseInline=Ar.parseInline;Je.Parser=qt;Je.parser=qt.parse;Je.Renderer=Xn;Je.TextRenderer=ao;Je.Lexer=Ft;Je.lexer=Ft.lex;Je.Tokenizer=Zn;Je.Hooks=dn;Je.parse=Je;var wm=Je.options,km=Je.setOptions,$m=Je.use,xm=Je.walkTokens,Sm=Je.parseInline;var Am=qt.parse,Tm=Ft.lex;function pr(e){let t=Je.parse(e),r=pi.sanitize(t);return mi(r)}function nr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Br(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function es(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Lu={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Ou=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Du=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function fr(e){return!!e&&typeof e=="object"}function io(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Oi(e,t){let r=io(e),n=io(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Mu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>fr(s)&&typeof s.text=="string"?s.text:"").join(""):fr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nu(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Lu[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=io(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Oi(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=Oi(fr(i)?i.old_string:"",fr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Di(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Mi(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Ou.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Du.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Pu(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(fr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Mi(o.text));else if(o.type==="thinking"){let a=Di(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nu(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(fr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Mu(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Fu(e){if(e.type==="item.completed"&&fr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Mi(t.text)];if(t.type==="reasoning"){let r=Di(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function qu(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ni(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!fr(o))continue;let a=qu(o)?Fu(o):Pu(o,r);for(let i of a)t.push(i)}return t}var Bu=5,Uu=10,ju=/Task\s+#(\d+)/,zu=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Hu=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function ts(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Wu(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Gu(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Yu(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=ju.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Vu(e){if(e.tool==="Bash"){let t=e.command||"";return zu.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Hu.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Ku(e){let t=e.filter(s=>s.kind==="tool").slice(-Uu),r=new Map;t.forEach((s,o)=>{let a=Vu(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Zu(e){let t=Gu(e);if(t)return{text:t,guess:!1};let r=Yu(e);if(r)return{text:r,guess:!1};let n=Ku(e);return n?{text:n,guess:!0}:null}function Xu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Tt(e,t)}function rs(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,c=new Set,u=new Set,f=null,_=null,h=!1,T=!1,$=!1,E=null,B=null;function x(){h=!1,T=!1,$=!1,E=null,B=null}async function G(R){if(r){T=!0,$=!1,xe();try{let F=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!F||typeof F!="object"||Array.isArray(F)?$=!0:(E=F,B=R)}catch{o===R&&($=!0)}finally{o===R&&(T=!1,xe())}}}function ee(){if(h=!h,h&&o&&B!==o){G(o);return}xe()}function I(){if(!h)return"";let R=Br({loading:T,error:$});if(R)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!E)return"";if(E.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let F=es(E.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${F?l`<div class="prompt-block__meta">${F} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function L(){if(!o||!n)return[];let R=n.get(o);return Ni(R?R.lines:[])}function A(){if(!o||!n)return null;let R=n.get(o),F=R?R.last_event_at:null;return typeof F=="number"?F:null}function j(){return a.status==="running"}function N(){if(j()&&o){_||(_=setInterval(()=>xe(),1e3));return}ne()}function ne(){_&&(clearInterval(_),_=null)}function Ae(R){let F=[],ce=0;for(;ce<R.length;){let Me=R[ce];if(Me.kind==="tool"){let Ee=ce;for(;Ee<R.length&&R[Ee].kind==="tool"&&R[Ee].tool===Me.tool;)Ee+=1;if(Ee-ce>=Bu&&!u.has(ce)){F.push({kind:"group",idx:ce,tool:Me.tool||"",lines:R.slice(ce,Ee).map((He,Oe)=>({idx:ce+Oe,line:He}))}),ce=Ee;continue}}F.push({kind:"line",idx:ce,line:Me}),ce+=1}return F}function le(R){for(let F=R.length-1;F>=0;F-=1){let ce=R[F];if(ce.kind==="result"||ce.kind==="error")return null;if(ce.kind==="tool"&&!Object.hasOwn(ce,"result"))return ce}return null}function ve(R){for(let F=R.length-1;F>=0;F-=1)if(R[F].kind==="thinking")return R[F];return null}function $e(R,F){if(F.kind==="gate")return l`<div class="sv__gate">${F.text}</div>`;if(F.kind==="phase")return l`<div class="sv__phase">${F.text}</div>`;if(F.kind==="result")return l`<div
        class="sv__result${F.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${F.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${pr(F.text||(F.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(F.kind==="thinking"){let ce=c.has(R);return l`<div
        class="sv__think${ce?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(R)}
      >
        <span class="sv__think-line">💭 ${ts(F.text)}</span>
        ${ce?l`<pre class="sv__think-expand">${F.text}</pre>`:""}
      </div>`}if(F.kind==="error")return l`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="blocker")return l`<div class="sv__error">⛔ ${F.text}</div>`;if(F.kind==="tool"){let ce=c.has(R),Me=F.tool==="Bash"?Wu(F.command):0,Ee=F.tool==="Bash"?Me>1?ts(F.command):F.command:F.path||F.command||"";return l`<div
        class="sv__tool${ce?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ye(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${F.icon}</span>
          <span class="sv__tool-name">${F.tool}</span>
          ${Ee?l`<span class="sv__tool-detail">${Ee}</span>`:""}
          ${Me>1?l`<span class="sv__tool-more">⋯ ${Me}줄</span>`:""}
          ${typeof F.added=="number"?l`<span class="sv__diff-add">+${F.added}</span>`:""}
          ${typeof F.removed=="number"?l`<span class="sv__diff-del">−${F.removed}</span>`:""}
          ${F.result?l`<span class="sv__tool-ok">→ ${F.result}</span>`:""}
        </span>
        ${ce?l`<pre class="sv__tool-expand">${et(F)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${pr(F.text||"")}</div>`}function et(R){let F=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)F.push(R.command);else if(R.input!==void 0)try{F.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&F.push(`output:
${R.output}`),F.join(`

`)}function nt(){if(!o)return l``;let R=L(),F=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ce=a.session_id||"",Me=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Ee=j(),He=Ee?Xu(A(),Date.now()):"",Oe=Ee?le(R):null,Ce=Ee?ve(R):null,Re=Zu(R);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${Re?l`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${Ee?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${He?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${He}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${He?l`<span class="sv__live-ago">${He}</span>`:""}</span
            >`:""}
        ${ce?l`<button
              type="button"
              class="sv__session"
              title=${ce}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ce}`}
              @click=${()=>W(ce)}
            >
              ⧉ ${ce.slice(0,8)}
            </button>`:""}
        ${F?l`<span class="sv__meta">${F}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${ee}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${Me}
          @click=${he}
        >
          <span class="sv__follow-full">⇣ ${Me}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ie()}
        >
          ✕
        </button>
      </div>
      ${I()}
      <div class="sv__body">
        ${R.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Ae(R).map(Ye=>Ye.kind==="group"?De(Ye):$e(Ye.idx,Ye.line))}
      </div>
      ${Oe||Ce?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Oe?l`<span class="sv__now-icon">${Oe.icon}</span>
                  <span class="sv__now-name">${Oe.tool}</span>
                  <span class="sv__now-detail"
                    >${Oe.tool==="Bash"?ts(Oe.command):Oe.path||Oe.command||""}</span
                  >`:""}
            ${Ce?l`<span class="sv__now-think"
                  >💭 ${ts(Ce.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function De(R){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Fe(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Fe(R){u.add(R),xe()}function xe(){ze(nt(),e),N(),i&&me()}function me(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function ye(R){c.has(R)?c.delete(R):c.add(R),xe()}function he(){i=!i,xe()}function W(R){Sr(R).then(F=>{F?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function V(R){!o||!R||(a={...a,...R},xe())}function Le(R){let F=R.target;if(!F||!F.classList||!F.classList.contains("sv__body"))return;!(F.scrollHeight-F.scrollTop-F.clientHeight<=4)&&i&&(i=!1,xe())}e.addEventListener("scroll",Le,!0);function de(R){let F=R&&R.attempt_id;F&&(o=F,a=R.meta||{},i=!0,c.clear(),u.clear(),x(),!f&&n&&(f=n.subscribe(xe)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),xe())}function ie(){let R=o;o=null,c.clear(),u.clear(),x(),ne(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),ze(l``,e),s&&s()}return{open:de,updateMeta:V,close:ie,isOpen(){return o!==null},destroy(){ne(),f&&(f(),f=null),e.removeEventListener("scroll",Le,!0),o=null,ze(l``,e)}}}function fn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Pi(t.spec_id),s=Pi(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Pi(e){return typeof e=="string"?e.trim():""}function Qu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Ju(e){let t=e&&e.metadata||{},r=fn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Qu(t)?null:"plan_pending"}),n}function Fi(e,t){let r=Ju(e);return l`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?l`<div class="detail-empty">산출물 없음</div>`:l`
          ${r.map(n=>l`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,n.path,n.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var ep="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",tp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,rp=/^\*\*결론\*\* — (.+)$/;function ns(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ep)return null;let r=tp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?rp.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var qi=20;function Bi(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function np(e){return e.length>qi?`${e.slice(0,qi)}\u2026`:e}function sp(e,t,r,n){let s=`${t.lane} ${np(t.identifier)}`;return l`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${n?"true":"false"}
      @click=${()=>r.onToggle&&r.onToggle(e.id)}
    >
      <span class="detail-report__tri">${n?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${Bi(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${pr(t.body)}
        </div>`:""}
  </div>`}function op(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Bi(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${pr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ui(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=ns(typeof c.text=="string"?c.text:"");return u?sp(c,u,t,s.has(c.id)):op(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${a||o.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var ap=["codex","opus","fable","self","skip"],ip=["codex","fable","skip"],lp=["low","medium","high","xhigh"],cp=["standard","fast_track"],Er=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],co=["impl_runtime","orchestration_model"],_n=[{id:"worker-detail",label:"\uC6CC\uCEE4 \uC0C1\uC138",keys:["orchestration_effort","orchestration_speed"]},{id:"implementation-detail",label:"\uAD6C\uD604 \uC0C1\uC138",keys:["impl_model","impl_effort"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]}],uo={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ji={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},dp=["self","skip"],up="opus",po={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function fo(e){let t=uo[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function pp(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:po[e]||"(\uAE30\uBCF8)"}function Ur(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cr(e){if(!Ur(e)||!Ur(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ur(r)&&Ur(r.models));return t.length>0?t:null}function lo(e){return{value:e,label:e}}function _o(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function zi(e,t,r=null){let n=Cr(e);if(!n)return t?[{label:null,options:[lo(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(lo)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[_o(t),...s]:s}function _r(e,t){let r={label:null,options:e.map(lo)};return t&&!e.includes(t)?[_o(t),r]:[r]}function sr(e,t){let r=Cr(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function mo(e,t){return Ur(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function fp(e,t){return Ur(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():mo(e,t)}function _p(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return fp(n,n.models[t]);return[]}function mp(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function go(e,t){let r=Cr(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return mo(n,n.models[t]);return[]}function Gi(e){let t=Cr(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of mo(n,s))r.includes(o)||r.push(o);return r}function Yi(e,t){if(!t)return Gi(e);let n=Cr(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of go(e,o))s.includes(a)||s.push(a);return s}function os(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=sr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?go(t,n.impl_model):Yi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function jr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||up,a=r("impl_model"),i=r("impl_runtime"),c=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?sr(n,o):s:null;return Er.map(u=>{let f=t(u),_,h=!1;return u==="orchestration_model"?_=zi(n,f):u==="impl_runtime"?_=_r(["inherit","claude","codex"],f):u==="impl_model"?(_=c?zi(n,f,c):f?[_o(f)]:[],h=i==="inherit"&&c===null):u==="orchestration_effort"?_=_r(_p(n,o),f):u==="orchestration_speed"?_=gp(mp(n,o),f):u==="impl_effort"?(_=_r(a?go(n,a):c?Yi(n,c):Gi(n),f),h=i==="inherit"&&c===null):u==="plan_review_model"?_=_r(ip,f):Object.hasOwn(ji,u)?(_=_r(lp,f),h=dp.includes(r(ji[u]))):_=_r(ap,f),{key:u,groups:_,selected:f,disabled:h,runner:u==="orchestration_model"?sr(n,o):null}})}function ss(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Hi(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Hi(s,t))}
          </optgroup>`)}
  `}function gp(e,t){return _r(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function Hi(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Wi(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${fo(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?l`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function hp(e,t,r,n){return e.some(s=>t(s))?"\uC774\uC288 \uD540":e.some(s=>r(s))?`\uD504\uB9AC\uC14B \u300C${n||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"}\u300D`:"\uAE30\uBCF8"}function bp(e,t,r){let n=[t("orchestration_model")||"opus"],s=t("orchestration_effort"),o=t("orchestration_speed");s&&n.push(`effort ${s}`),o&&o!=="default"&&n.push(`speed ${o==="fast"?"Fast":o}`);let a=`${t("impl_runtime")||"inherit"} \xB7 ${t("impl_model")||"auto"}`,i=[["\uC2A4\uD399","spec_review_model","spec_review_effort"],["\uACC4\uD68D","plan_review_model","plan_review_effort"],["\uAD6C\uD604","impl_review_model","impl_review_effort"]].map(([u,f,_])=>{let h=t(f)||"codex",T=t(_);return`${u} ${h}${T?`/${T}`:""}`}),c=[{id:"worker",label:"\uC6CC\uCEE4",keys:Er.slice(0,3),value:n.join(" \xB7 ")},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_runtime","impl_model","impl_effort"],value:a},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"],value:i.join(" \xB7 ")}];return l`<section
    class="detail-exec-presets exec-settings-summary"
    data-exec-settings-summary
  >
    ${c.map(u=>l`<div
          class="workflow-summary__row exec-settings-summary__row"
          data-exec-summary=${u.id}
        >
          <span class="workflow-summary__label">${u.label}</span>
          <span class="detail-kv__vgroup">
            <span class="workflow-summary__value">${u.value}</span>
            <span class="detail-kv__v" data-exec-source
              >${hp(u.keys,e,t,r)}</span
            >
          </span>
        </div>`)}
  </section>`}function Vi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=$=>typeof o[$]=="string"?o[$]:"",c=$=>{let E=i($);return E||(typeof a[$]=="string"?a[$]:"")},u=jr({selectedOf:i,effectiveOf:c,runner_catalog:n}),f=o.workflow_mode==="fast_track"?"fast_track":"standard",_=new Map(u.map($=>[$.key,$])),h=_n.flatMap($=>$.keys).filter($=>i($)).length,T=$=>{let E=_.get($);return E?Wi(E.key,ss(E.groups,E.selected,pp(E.key,a,s)),E.selected,!!E.selected,E.disabled,E.runner,t):""};return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${bp(i,c,s)}
    <section class="exec-settings-core" data-exec-settings-core>
      ${Wi("workflow_mode",ss(_r(cp,f),f),f,o.workflow_mode==="fast_track",!1,null,t)}
      ${co.map(T)}
    </section>
    <details
      class="detail-exec-presets exec-settings-advanced"
      data-exec-settings-advanced
    >
      <summary>고급 설정 — ${h}개 변경됨</summary>
      ${_n.map($=>l`<section
            class="exec-settings-advanced__group"
            data-exec-settings-group=${$.id}
          >
            <h4>${$.label}</h4>
            ${$.keys.map(T)}
          </section>`)}
    </details>
  `}function vp(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ki(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function c($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",c);function u(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${vp(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${i}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:pr(a)}
          </div>
        </div>
      </div>
    `:l``}function f(){ze(u(),e)}async function _($,E={}){s=$,o="loading",a="",i="",f();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let x="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent($);try{let G=await n(x),ee=await G.json().catch(()=>({}));if(!G.ok||!ee||ee.ok!==!0){if(ee?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ee&&ee.error||G.status)+")",f();return}a=String(ee.content||""),o="ready",f()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function h(){s=null,ze(l``,e)}function T(){document.removeEventListener("keydown",c),h()}return{open:_,close:h,destroy:T}}var yp=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Qi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wp(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function kp(e){let t=ht(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Fr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Qi}
          >부분 집계</span
        >`:""}`}function Zi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Xi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ji(t):""}function $p(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=ht({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?l`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${Xi(s.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
              >${Xi(s.completed_at)}</span
            >`:""}
        ${a?l`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function xp(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...yp,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${wp(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Qi}</span>`:""}
  </div>`}var Sp={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ji(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ap(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function el(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let _=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),T=_&&!h,$=_?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${$}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let _=u.cause_detail,h=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:u.cause;return l`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},c=u=>{let f=Zi(qs(u));if(ht(f).length===0&&!Fr(u.usage))return"";let _=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${kp(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let f=qs(u),_=Zi(f),h=ht(_);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Sp[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${dr(u)?l`<span
                  class="detail-session__resumed"
                  title=${dr(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Wt(u)}</span>
            ${h.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(T=>l`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Fr(u.usage)?l`<span class="detail-session__usage"
                    >${Fr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ji(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Ap(u)}
          ${s.has(u.attempt_id)&&u.usage?xp(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${$p(f)}
        </div>`})}
    </div>
  `}function tl(e,t={}){return l`
    <div class="detail-section-label">
      과업 프롬프트
      <button
        type="button"
        class="detail-prompt__toggle"
        data-seam="task-prompt-toggle"
        aria-expanded=${e.expanded?"true":"false"}
        title=${e.expanded?"\uC811\uAE30":"\uC6CC\uCEE4\uAC00 \uBCF4\uB0B8 \uD504\uB86C\uD504\uD2B8 \uBCF4\uAE30"}
        @click=${()=>t.onToggle&&t.onToggle()}
      >
        ${e.expanded?"\uC811\uAE30":"\uD3BC\uCE58\uAE30"}
      </button>
    </div>
    ${e.expanded?l`<div class="detail-prompt" data-seam="task-prompt">
          ${Tp(e)}
        </div>`:""}
  `}function Tp(e){let t=Br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?nr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=es(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?nr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?nr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Ep=["open","in_progress","deferred","resolved","closed"],Cp=[0,1,2,3,4];function rl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,f=null,_={},h="",T=!1,$=!1,E=!1,B="",x="",G="";function ee(){$=!1,E=!1,B="",x="",G=""}let I=[],L=null,A=null,j=!1,N="",ne=!1,Ae=0,le=new Set;function ve(){I=[],L=null,A=null,j=!1,N="",ne=!1,Ae+=1,le.clear()}async function $e(d){if(!s)return;let k=++Ae;try{let b=await Promise.resolve(s("get-comments",{id:d}));if(k!==Ae||d!==u)return;I=Array.isArray(b)?b:[],j=!1}catch{if(k!==Ae||d!==u)return;j=!0}m()}function et(){if(!s||!u)return;let d=f&&typeof f.comment_count=="number"?f.comment_count:null;if(L!==u){L=u,A=d,$e(u);return}d!==null&&d!==A&&(A=d,$e(u))}function nt(d){le.has(d)?le.delete(d):le.add(d),m()}function De(d){let k=N.trim().length===0;N=d,k!==(d.trim().length===0)&&m()}async function Fe(){let d=N.trim();if(!s||!u||d.length===0||ne)return;let k=u;ne=!0,m();let b=!1;try{let D=await Promise.resolve(s("add-comment",{id:k,text:d}));Array.isArray(D)&&D.length>0&&(b=!0,k===u&&(I=D,j=!1,N="",A=D.length))}catch{b=!1}b||J("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),k===u&&(ne=!1),m()}let xe={onToggle:nt,onDraftInput:De,onSubmit:Fe},me=document.createElement("div");me.className="md-viewer-root",document.body.appendChild(me);let ye=Ki(me,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),he=document.createElement("div");he.className="session-log-root",document.body.appendChild(he);let W=rs(he,{transport:s?(d,k)=>Promise.resolve(s(d,k)):void 0,sessionLogStore:c}),V=!1,Le=!1,de=!1,ie=null,R=null,F=0;function ce(d){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${d}`}function Me(){V=!1,Le=!1,de=!1,ie=null,R=null,F+=1}async function Ee(d){if(!s)return;let k=++F;Le=!0,de=!1,m();try{let b=await Promise.resolve(s("get-bead-prompt",{bead_id:d}));if(k!==F)return;!b||typeof b!="object"||Array.isArray(b)?de=!0:(ie=b,R=ce(d))}catch{k===F&&(de=!0)}finally{k===F&&(Le=!1,m())}}function He(){if(V=!V,V&&u&&R!==ce(u)){ie=null,Ee(u);return}m()}function Oe(){if(!a||!u)return[];let d=a.get();return(d&&d.attempts?Object.values(d.attempts):[]).filter(b=>b&&b.bead_id===u).sort((b,D)=>(D.started_at||0)-(b.started_at||0)).map(b=>({attempt_id:b.attempt_id,bead_id:b.bead_id,status:b.status,started_at:typeof b.started_at=="number"?b.started_at:null,runner:b.runner||null,model:b.model||null,effort:b.effort||null,speed:b.speed||null,session_id:b.session_id||null,resumed_from:b.resumed_from||null,continuation_mode:b.continuation_mode||null,dismissed_at:typeof b.dismissed_at=="number"?b.dismissed_at:null,cause:typeof b.cause=="string"?b.cause:null,cause_detail:b.cause_detail||null,exec_default_preset_id:typeof b.exec_default_preset_id=="string"?b.exec_default_preset_id:null,exec_default_preset_revision:typeof b.exec_default_preset_revision=="number"?b.exec_default_preset_revision:null,exec_values:b.exec_values&&typeof b.exec_values=="object"?b.exec_values:null,usage:b.usage||null,usage_legs:Array.isArray(b.usage_legs)?b.usage_legs:[]}))}function Ce(){if(!a||!u)return null;let d=a.get();return It(d&&d.attempts||{},u)}let Re=new Set;function Ye(d){Re.has(d)?Re.delete(d):Re.add(d),m()}function M(d){let k=a?a.get():null,b=k&&k.attempts?k.attempts[d]:null;W.open({attempt_id:d,meta:b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}})}async function U(d){if(!s||!d)return;let k=()=>{let X=a?a.get():null;return X&&typeof X.revision=="number"?X.revision:0},b=async(X={})=>await s("worker-attempt-resume",{attempt_id:d,expected_revision:k(),...X}),D=X=>{X?.queue&&a?.set&&a.set(X.queue)},te=await b();if(D(te),te&&te.conflict){let X=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:k();te=await s("worker-attempt-resume",{attempt_id:d,expected_revision:X}),D(te)}te=await Jt(te,(X,Ue)=>b({continuation:X,decision_token:Ue}),{onResult:D,refresh:()=>b()}),te&&te.resumed===!1&&!te.conflict&&te.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${te.reason}`,"error",2400)}let P={onOpen:M,onResume:U,onToggleUsage:Ye};function Q(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,b=typeof k=="string"?z()?.presets.find(D=>D.id===k):null;return b&&b.compatible!==!1&&b.settings?b.settings:{}}function fe(){let d=a?a.get():null,k=d&&d.default_exec_preset_id,b=typeof k=="string"?z()?.presets.find(D=>D.id===k):null;return b&&b.compatible!==!1&&typeof b.name=="string"?b.name:""}function w(){let d=a?a.get():null;return d&&d.runner_catalog||null}function C(){let d=f?.metadata&&typeof f.metadata=="object"?f.metadata:{},b=(Object.hasOwn(_,"orchestration_model")?_.orchestration_model:void 0)||(typeof d.orchestration_model=="string"?d.orchestration_model:"")||(typeof Q().orchestration_model=="string"?Q().orchestration_model:"")||"opus";return sr(w(),b)}function z(){let d=i?i.get():null;return!d||typeof d.revision!="number"?null:{revision:d.revision,presets:Array.isArray(d.presets)?d.presets:[]}}function ue(d){let k=d&&d.settings&&typeof d.settings=="object"?d.settings:{},b=D=>typeof k[D]=="string"?k[D]:D==="impl_runtime"&&typeof k.impl_model=="string"&&sr(w(),k.impl_model)||"";return jr({selectedOf:b,effectiveOf:b,runner_catalog:w()}).some(D=>D.groups.some(te=>te.options.some(X=>X.value===D.selected&&X.label.endsWith("(\uBE44\uD638\uD658)"))))}function ae(d){i&&d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&i.set({revision:d.revision,presets:d.presets})}async function Ie(){let d=z(),k=d?.presets.find(b=>b.id===h);if(!(!s||!u||!d||!k||ue(k)||T)){T=!0,m();try{let b=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:k.id,expected_revision:d.revision}));if(b&&b.conflict){ae(b),J("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let D=b&&Array.isArray(b.issue)?b.issue[0]:b?.issue;if(b&&b.applied&&D&&typeof D=="object"){f=D;for(let te of Er)delete _[te];J("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}b&&b.error==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(b){b&&typeof b=="object"&&b.code==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,m()}}}function Ne(){let d=z();if(d&&d.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let k=d?d.presets:[],b=k.find(te=>te.id===h),D=b?ue(b):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${d===null||T}
          @change=${te=>{h=te.target.value,m()}}
        >
          <option value="" ?selected=${h===""}>
            ${d===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${k.map(te=>{let X=ue(te);return l`<option
              value=${te.id}
              ?selected=${te.id===h}
            >
              ${te.name}${X?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${d===null||!b||D||T}
          @click=${()=>{Ie()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let tt=null;r&&r.subscribe&&(tt=r.subscribe(()=>st()));let Be=null;a&&typeof a.subscribe=="function"&&(Be=a.subscribe(()=>{u&&m()}));let _t=null;i&&typeof i.subscribe=="function"&&(_t=i.subscribe(()=>{u&&m()}));function mt(d){d.key==="Escape"&&u&&(d.preventDefault(),n())}document.addEventListener("keydown",mt);function st(){if(u){if(r&&typeof r.snapshotFor=="function"){let d=r.snapshotFor("detail:"+u)||[];f=d.find(b=>b&&b.id===u)||d[0]||f}et(),m()}}function at(d){Sr(d).then(k=>{k?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function it(d){d.preventDefault(),d.stopPropagation(),u&&at(u)}function ct(d,k){d.preventDefault(),d.stopPropagation(),at(k)}function bt(d,k,b){d.preventDefault(),d.stopPropagation(),ye.open(k,{missing_state:b})}function q(d,k){_[d]=k,m(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:d,value:k})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function Y(d,k){let b=f||{},D=b.metadata&&typeof b.metadata=="object"?b.metadata:{},te={};for(let qe of["impl_runtime","impl_model","impl_effort"])te[qe]=Object.hasOwn(_,qe)?_[qe]:typeof D[qe]=="string"?D[qe]:"";te[d]=k;let X=os(te,w(),C()),Ue={};for(let qe of["impl_runtime","impl_model","impl_effort"])Ue[qe]=_[qe],_[qe]=X[qe]||"";m(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...X,orchestration_runtime:C()})).then(qe=>{let Kt=Array.isArray(qe)?qe[0]:qe;if(!Kt||typeof Kt!="object"||!Kt.id)throw new Error("implementation target readback failed");f=Kt;for(let _s of["impl_runtime","impl_model","impl_effort"])delete _[_s];m()}).catch(()=>{for(let qe of["impl_runtime","impl_model","impl_effort"])Ue[qe]===void 0?delete _[qe]:_[qe]=Ue[qe];m(),J("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function K(d,k,b){if(!s||!u)return!1;try{let D=await Promise.resolve(s(d,k)),te=Array.isArray(D)?D[0]:D;return te&&typeof te=="object"&&te.id?(f=te,!0):(J(b,"error"),!1)}catch{return J(b,"error"),!1}}function _e(d){setTimeout(()=>{try{let k=e.querySelector(d);k&&typeof k.focus=="function"&&k.focus()}catch{}},0)}function we(){$=!0,B=f&&f.title||"",m(),_e('.detail-edit__input[data-edit="title"]')}function Te(d){B=d.target.value}function Ve(){$=!1,B="",m()}function ot(){K("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&($=!1,B=""),m()})}function Se(){E=!0,x=f&&f.description||"",m(),_e('.detail-edit__textarea[data-edit="description"]')}function Ke(d){x=d.target.value}function ke(){E=!1,x="",m()}function ut(){K("edit-text",{id:u,field:"description",value:x},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(k=>{k&&(E=!1,x=""),m()})}function vt(d,k,b,D){if(d.key==="Escape"){d.stopPropagation(),b();return}d.key==="Enter"&&(!D||d.ctrlKey||d.metaKey)&&(d.preventDefault(),k())}function Vt(d){let k=d.target.value;K("update-status",{id:u,status:k},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Bt(d){let k=Number(d.target.value);K("update-priority",{id:u,priority:k},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Ut(d){G=d.target.value}function gt(){let d=G.trim();d.length!==0&&K("label-add",{id:u,label:d},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(k=>{k&&(G=""),m()})}function xt(d){if(d.key==="Escape"){d.stopPropagation(),G="",m();return}d.key==="Enter"&&(d.preventDefault(),gt())}function jt(d){K("label-remove",{id:u,label:d},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Ot={onCopyPath:ct,onOpenDoc:bt},p={onChange:q,onImplTargetChange:Y};function y(d){return typeof d=="string"?d:d&&typeof d=="object"?String(d.id||d.to||d.issue_id||d.depends_on||""):""}function S(d){switch(d&&typeof d=="object"?String(d.dependency_type||d.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function re(d){let b=(Array.isArray(d.dependencies)?d.dependencies:[]).map(D=>({id:y(D),icon:S(D)})).filter(D=>D.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${b.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${b.map(D=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(D.id)}
                  >
                    ${D.icon?`${D.icon} `:""}${D.id}
                  </button>`:l`<span class="detail-dep"
                    >${D.icon?`${D.icon} `:""}${D.id}</span
                  >`)}
          </div>`}
    `}function ge(d){let k=d.metadata||{},b=d.workflow||{},D=b.stages||{},te=D.spec&&D.spec.stale,X=D.impl&&D.impl.stale,Ue=D.plan||null,qe=b.route_source==="derived",Kt=b.route||k.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${qe?" detail-kv__v--derived":""}"
          title=${qe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${qe?"unset":Kt}</span
        >
      </div>
      ${b.route!=="quick_fix"||Object.hasOwn(k,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${k.spec_review||"\uC5C6\uC74C"}${te?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ue?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ue?.approval_receipt||"\uC5C6\uC74C"}${Ue?.approval_state==="stale"?" \xB7 stale":Ue?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${b.route!=="quick_fix"||Object.hasOwn(k,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${k.impl_review||"\uC5C6\uC74C"}${X?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${b.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${b.exec_receipt.kind}:${b.exec_receipt.actor}@${b.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${b.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${b.impl_entry.actor}@${b.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${k.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${k.pr_url}</span>
          </div>`:""}
    `}let be={route:["quick_fix","spec_backed","full_plan"]};async function pe(d,k){let b=k.target.value;if(d==="route"&&f&&f.metadata&&f.metadata.route==="full_plan"&&b!=="full_plan"&&!window.confirm(`full_plan \u2192 ${b||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await K("update-workflow-meta",{id:u,key:d,value:b},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function We(d){let k=d.metadata||{};return l` ${((D,te)=>{let X=be[D],Ue=typeof k[D]=="string"?k[D]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${D}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${D}
          data-edit=${`wfmeta-${D}`}
          @change=${qe=>pe(D,qe)}
        >
          <option value="" ?selected=${!X.includes(Ue)}>
            ${te}
          </option>
          ${X.map(qe=>l`<option value=${qe} ?selected=${Ue===qe}>${qe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Z(d,k){return $?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${Te}
            @keydown=${b=>vt(b,ot,Ve,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ot}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ve}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${d}</h2>
        ${ht(k).map(b=>l`<span class="detail-usage-total" title=${b.tooltip}
              >${b.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${we}
        >
          ✎
        </button>
      </div>
    `}function v(d){let k=pt(d.created_at),b=pt(d.updated_at);return!k&&!b?l``:l`
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
      ${b?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${b}</span>
          </div>`:""}
    `}function H(d,k){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Vt}
        >
          ${Ep.map(b=>l`<option value=${b} ?selected=${b===d}>${b}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Bt}
        >
          ${Cp.map(b=>l`<option value=${String(b)} ?selected=${b===k}>
                P${b}
              </option>`)}
        </select>
      </div>
    `}function se(d){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Se}
            >
              ✎
            </button>`}
      </div>
      ${E?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${x}
              @input=${Ke}
              @keydown=${k=>vt(k,ut,ke,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ut}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ke}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${d||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Pe(d){let k=typeof d.notes=="string"?d.notes:"";return k.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${k}</div>
    `}function Qe(d){let k=Array.isArray(d.labels)?d.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${k.map(b=>l`<span class="detail-label-chip"
              >${b}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${b}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+b}
                @click=${()=>jt(b)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${G}
            @input=${Ut}
            @keydown=${xt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${gt}
          >
            추가
          </button>
        </span>
      </div>
    `}function Ze(){if(!u)return l``;let d=f||{},k=String(d.id||u),b=d.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",D=Ce(),te=d.status||"open",X=typeof d.priority=="number"?Math.max(0,Math.min(4,d.priority)):"",Ue=d.description||"",qe={...d,metadata:{...d.metadata||{},..._}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <button
            type="button"
            class="detail-overlay__close"
            aria-label="닫기"
            @click=${()=>n()}
          >
            ✕
          </button>
          <button
            type="button"
            class="detail-overlay__id"
            title="ID 복사"
            @click=${it}
          >
            ${k}
          </button>
          ${Z(b,D)}
          ${H(te,X)} ${v(d)}
          ${se(Ue)}
          ${Ui(I,xe,{expanded:le,draft:N,sending:ne,error:j})}
          ${Pe(d)} ${Qe(d)} ${re(d)}
          ${ge(d)} ${We(d)}
          ${Fi(d,Ot)}
          ${Ne()}
          ${Vi(qe,p,Q(),w(),fe())}
          ${tl({expanded:V,loading:Le,error:de,data:ie},{onToggle:He})}
          ${el(Oe(),P,{total:D,expanded:Re})}
        </div>
      </div>
    `}function m(){ze(Ze(),e)}return{load(d){d!==u&&(_={},h="",ee(),ve(),Me()),u=d,f=null,st()},clear(){u=null,f=null,_={},h="",T=!1,ee(),ve(),Me(),ye.close(),W.close(),ze(l``,e)},destroy(){tt&&(tt(),tt=null),Be&&(Be(),Be=null),_t&&(_t(),_t=null),document.removeEventListener("keydown",mt),ye.destroy(),me.parentNode&&me.parentNode.removeChild(me),W.destroy(),he.parentNode&&he.parentNode.removeChild(he),u=null,f=null,h="",T=!1,ve(),Me(),ze(l``,e)}}}var Rp=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function nl(e,t){return Ns(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ip(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function sl(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(A){let j=r.get();if(j)try{let N=await n("display-policy-set",{expected_revision:j.revision,policy:A(j)});c(N),N&&N.conflict&&N.policy&&(N=await n("display-policy-set",{expected_revision:N.policy.revision,policy:A(N.policy)}),c(N)),N&&N.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function c(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let j=r.get();if(!j)return;let N=nl(A,j)!=="shown";i(ne=>Ip(A,ne,N))}function f(){let A=a.trim();A.length!==0&&(a="",i(j=>j.hidden_prefixes.includes(A)?{hidden_prefixes:j.hidden_prefixes}:{hidden_prefixes:[...j.hidden_prefixes,A]}),B())}function _(A){i(j=>({hidden_prefixes:j.hidden_prefixes.filter(N=>N!==A)}))}function h(A){let j=r.get();if(!j)return;let N=j.chips[A]===!1;i(()=>({chips:{[A]:N}}))}function T(A){let j=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${j.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${j.map(N=>{let ne=nl(N,A);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ne}`}
                  data-label=${N}
                  data-state=${ne}
                  @click=${()=>u(N)}
                >
                  ${N}
                </button>`})}
            </div>`}
      </section>
    `}function $(A){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(j=>l`<span class="display-settings__prefix">
                ${j}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${j} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(j)}
                >
                  ×
                </button>
              </span>`)}
        </div>
        <div class="display-settings__prefix-add">
          <input
            type="text"
            class="display-settings__prefix-input"
            aria-label="숨길 prefix"
            placeholder="예: reviewed:"
            .value=${a}
            @input=${j=>{a=String(j.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function E(A){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Rp.map(([j,N])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${j}
                  .checked=${A.chips[j]!==!1}
                  @change=${()=>h(j)}
                />
                <span>${N}</span>
              </label>`)}
        </div>
      </section>
    `}function B(){let A=r.get();ze(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${L}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${A?l`${T(A)} ${$(A)}
                ${E(A)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let x=!1,G=()=>{x=!1};o.addEventListener("close",G),o.addEventListener("cancel",G);let ee=null;r.subscribe&&(ee=r.subscribe(()=>{x&&B()}));function I(){x||(a="",x=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function L(){x&&(x=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:I,close:L,destroy(){x=!1,o.removeEventListener("close",G),o.removeEventListener("cancel",G),ee&&(ee(),ee=null),o.remove()}}}function ol(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
    <div class="fatal-error">
      <div class="fatal-error__icon" aria-hidden="true">!</div>
      <div class="fatal-error__body">
        <p class="fatal-error__eyebrow">Critical</p>
        <h2 class="fatal-error__title" id="fatal-error-title">Command failed</h2>
        <p class="fatal-error__message" id="fatal-error-message"></p>
        <pre class="fatal-error__detail" id="fatal-error-detail"></pre>
        <div class="fatal-error__actions">
          <button type="button" class="btn primary" id="fatal-error-reload">Reload</button>
          <button type="button" class="btn" id="fatal-error-close">Dismiss</button>
        </div>
      </div>
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,f,_="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function Lp(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Op(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}function as(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,c=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function f(){let w=u();return typeof w.revision=="number"?w.revision:0}function _(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function h(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function T(w){w&&w.queue&&r&&r.set(w.queue)}function $(){return u().runner_catalog??null}let E=null;function B(){if(E!==null)return E;let w=u().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function x(w){if(!s)return;let C=_();if(!C)return;E=w||"";let z=L(w);if(Ce(),!z.viable){J(z.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3),E=null,Ce();return}try{let ue=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:f(),expected_preset_revision:C.revision});T(ue),ue&&ue.presets&&n&&n.set(ue.presets),ue&&ue.conflict?J("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3):ue&&ue.applied||J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}E=null,Ce()}function G(w){i={id:w.id,name:w.name,settings:{...w.settings||{}}},j(),c=!1,Ce()}function ee(){i={id:null,name:"",settings:{}},c=!1,Ce()}function I(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},z=ue=>typeof C[ue]=="string"?C[ue]:ue==="impl_runtime"&&typeof C.impl_model=="string"&&sr($(),C.impl_model)||"";return jr({selectedOf:z,effectiveOf:z,runner_catalog:$()}).some(ue=>ue.groups.some(ae=>ae.options.some(Ie=>Ie.value===ue.selected&&Ie.label.endsWith("(\uBE44\uD638\uD658)"))))}function L(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let z=_()?.presets.find(ae=>ae.id===w);if(!z||z.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let ue=z.compatible===!1||I(z);return{viable:!ue,missing:!1,incompatible:ue,preset:z}}function A(){let w=i?.settings.orchestration_model;return typeof w!="string"?null:sr($(),w)}function j(){if(!i)return;let w=os({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),A());for(let C of["impl_runtime","impl_model","impl_effort"])w[C]?i.settings[C]=w[C]:delete i.settings[C]}function N(w){let C=w&&w.settings&&typeof w.settings=="object"?w.settings:{},z=Er.filter(ae=>typeof C[ae]=="string").length,ue=Er.filter(ae=>typeof C[ae]=="string").map(ae=>`${uo[ae]?.title||ae}: ${C[ae]}`);return{count:`${z}/12 \uC9C0\uC815`,choices:ue.length>0?ue.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function ne(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let C=_();if(C)try{let z=await s("exec-preset-delete",{expected_revision:C.revision,id:w.id});h(z),z&&z.conflict&&J("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function Ae(w=!1){if(!s||!i)return;let C=_();if(!C)return;let z=w||i.id===null,ue={expected_revision:C.revision,...z?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let ae=await s(z?"exec-preset-create":"exec-preset-update",ue);if(h(ae),ae&&ae.conflict){c=!0,Ce();return}if(ae&&ae.applied){i=null,c=!1,Ce();return}J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function le(w){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${fo(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${C=>{if(!i)return;let z=C.target.value;z?i.settings[w.key]=z:delete i.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&j(),c=!1,Ce()}}
      >
        ${ss(w.groups,w.selected,po[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ve(){if(!i)return"";let w=Ne=>typeof i?.settings[Ne]=="string"?i.settings[Ne]:"",C=jr({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:A()}),z=_n.flatMap(Ne=>Ne.keys).filter(Ne=>typeof i?.settings[Ne]=="string").length,ue=Ne=>{let tt=C.find(Be=>Be.key===Ne);return tt?le(tt):""},ae=_(),Ie=i.id!==null&&ae!==null&&!ae.presets.some(Ne=>Ne.id===i?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${Ne=>{i&&(i.name=Ne.target.value,c=!1)}}
        />
      </label>
      ${c?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Ie?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      <section class="exec-preset-editor__core" data-preset-core>
        ${co.map(ue)}
      </section>
      <details class="exec-preset-editor__advanced" data-preset-advanced>
        <summary>고급 설정 — ${z}개 변경됨</summary>
        ${_n.map(Ne=>l`<section
              class="exec-preset-editor__group"
              data-preset-group=${Ne.id}
            >
              <h4>${Ne.label}</h4>
              ${Ne.keys.map(ue)}
            </section>`)}
      </details>
      <div class="exec-preset-editor__actions">
        ${Ie?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{Ae(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{Ae(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,c=!1,Ce()}}
        >
          취소
        </button>
      </div>
    </div>`}function $e(){let w=_(),C=w?w.presets.filter(ae=>ae?.migration_pending!==!0):[],z=B()||"",ue=L(z);return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ee}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:C.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:C.map(ae=>{let Ie=N(ae),Ne=L(ae.id),tt=ae.id===z,Be=Ne.missing?"\uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ne.incompatible?"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uAE30\uBCF8\uC73C\uB85C \uC9C0\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"",_t=typeof ae.reference_count=="number",mt=_t?ae.reference_count:null,st=Array.isArray(ae.reference_summary)?ae.reference_summary.map(at=>at?.display_name||at?.workspace_key).filter(Boolean).join(", "):"";return l`<article
                class="exec-preset-card"
                data-preset-id=${ae.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${ae.name}</strong>
                  ${tt?l`<span
                        class="exec-defaults__vd-badge"
                        data-workspace-default-badge
                        >워크스페이스 기본</span
                      >`:""}
                  <span>${Ie.count}</span>
                  <span data-preset-references=${ae.id}
                    >${_t?`\uCC38\uC870 ${mt}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${Ne.incompatible?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Ie.choices}</small>
                  ${st?l`<small data-preset-impact=${ae.id}
                        >업데이트 영향: ${st}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  ${tt?l`<button
                        type="button"
                        data-workspace-preset-release=${ae.id}
                        @click=${()=>{x("")}}
                      >
                        기본 해제
                      </button>`:l`<button
                        type="button"
                        data-workspace-preset-assign=${ae.id}
                        ?disabled=${!Ne.viable}
                        title=${Be}
                        @click=${()=>{x(ae.id)}}
                      >
                        기본으로
                      </button>`}
                  <button
                    type="button"
                    data-preset-edit=${ae.id}
                    @click=${()=>G(ae)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${ae.id}
                    ?disabled=${mt===null||mt>0||ae.reference_scan_complete===!1}
                    title=${mt===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":mt>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ae.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{ne(ae)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${w!==null&&z&&ue.missing?l`<article class="exec-preset-card" data-workspace-preset-missing>
            <div class="exec-preset-card__main">
              <strong>워크스페이스 기본 프리셋을 찾을 수 없습니다</strong>
              <span class="exec-defaults__vd-badge" data-workspace-default-badge
                >워크스페이스 기본</span
              >
              <small>
                참조 ${z} · 실행이 차단됩니다. 기본을 해제하거나 다른
                프리셋을 지정하세요.
              </small>
            </div>
            <div class="exec-preset-card__actions">
              <button
                type="button"
                data-workspace-preset-release=${z}
                @click=${()=>{x("")}}
              >
                기본 해제
              </button>
            </div>
          </article>`:""}
      ${ve()}
    </section>`}function et(){let w=u().workspace_info;return w&&typeof w=="object"?w:{}}function nt(w,C){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${C}</span
    >`}function De(w){let C=w?Op(w.cmd):"",z=w?Lp(w.timeout_ms):"",ue=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${C?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${nt("config","config")}
            ${z?l`<span class="exec-defaults__vd-meta"
                  >timeout ${z}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            ${nt("absent","\uC548 \uD568")} 검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${ue}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}let Fe=!1,xe=!1,me=!1,ye=null;async function he(){if(s){xe=!0,me=!1,Ce();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?me=!0:ye=w}catch{me=!0}finally{xe=!1,Ce()}}}function W(){if(Fe=!Fe,Fe&&!ye){he();return}Ce()}function V(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Fe?"true":"false"}
          @click=${W}
        >
          ${Fe?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Fe?Le():""}
    </section>`}function Le(){let w=Br({loading:xe,error:me});if(w)return w;if(!ye)return"";let C=Array.isArray(ye.variants)?ye.variants:[];return l`<div class="exec-defaults__sp-body">
      ${ye.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${ye.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(z=>l`<div class="exec-defaults__sp-variant" data-variant=${z.key}>
            <div class="exec-defaults__sp-cond">${z.condition}</div>
            ${nr(z.label,z.system_prompt)}
          </div>`)}
    </div>`}function de(w){if(typeof w!="number"||!Number.isFinite(w))return"";let C=w/6e4;return Number.isInteger(C)?`timeout ${C}\uBD84`:`timeout ${Math.round(w/1e3)}\uCD08`}function ie(w){let C=de(w);return C?nt("config",C):""}function R(w){let C=typeof w.base_sha=="string"?w.base_sha:"",z=`${w.source_path||"repo-ops/config.toml"} @ ${w.base_ref||"?"}${C?`@${C.slice(0,7)}`:""}`;return l`<section class="exec-defaults__vd" data-seam="repo-ops">
      <p class="exec-defaults__vd-title">
        저장소 작업 선언
        <span class="exec-defaults__vd-src">${z}</span>
      </p>
      <div class="exec-defaults__lane" data-lane="verify">
        <span class="exec-defaults__lane-k">머지 전 검증</span>
        <span class="exec-defaults__lane-v"
          >${w.verify?l`<code class="exec-defaults__vd-cmd"
                  >${w.verify.script}</code
                >${ie(w.verify.timeout_ms)}`:l`선언 없음${nt("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="exec-defaults__lane" data-lane="deploy">
        <span class="exec-defaults__lane-k">머지 후 배포</span>
        <span class="exec-defaults__lane-v"
          >${w.deploy?l`<code class="exec-defaults__vd-cmd"
                  >${w.deploy.script}</code
                >${ie(w.deploy.timeout_ms)}`:l`선언 없음${nt("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="exec-defaults__lane-d"
          >${w.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function F(w){let C=w.repo_ops&&typeof w.repo_ops=="object"?w.repo_ops:null;return C&&C.status==="resolved"?R(C):C&&(C.status==="pending"||C.status==="error")?l`<section class="exec-defaults__vd" data-seam="repo-ops">
        <p class="exec-defaults__vd-title">
          저장소 작업 선언
          <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
        </p>
        <div
          class="exec-defaults__vd-line exec-defaults__vd-absent"
          data-seam="repo-ops-status"
        >
          ${C.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${C.error_code?l` — <code>${C.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증 설정
        <span class="exec-defaults__vd-ro">읽기 전용 — config에서 정의</span>
      </p>
      ${De(w.verify_cmd)}
    </section>`}async function ce(w){if(!s)return;let C=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});if(T(C),C&&C.conflict){let z=await s("worker-auto-repair-toggle",{on:w,expected_revision:f()});T(z)}Ce()}let Me={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function Ee(w,C,z){return l`<div class="exec-defaults__policy-group" data-policy=${z}>
      <div class="exec-defaults__policy-label">${w}</div>
      <ul class="exec-defaults__policy-list">
        ${C.map(ue=>l`<li data-token=${ue}>
              ${Me[ue]||ue}
            </li>`)}
      </ul>
    </div>`}function He(w){return l`<div
      class="exec-defaults__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="exec-defaults__policy-label">해결 사다리</div>
      <ol class="exec-defaults__policy-list">
        ${w.map(C=>{let z=[Me[C.trigger]||C.trigger];return Number.isInteger(C.attempts_per_operation_attempt)?z.push(`operation\uB2F9 ${C.attempts_per_operation_attempt}\uD68C`):Number.isInteger(C.attempts)?z.push(`${Me[C.budget]||C.budget} ${C.attempts}\uD68C`):Number.isInteger(C.sessions_per_user_action)&&z.push(`${C.sessions_per_user_action}\uD68C`,Me[C.user_actions]||C.user_actions),C.applies_when&&z.push(Me[C.applies_when]||C.applies_when),l`<li data-token=${C.id}>
            <strong>${Me[C.id]||C.id}</strong>
            <span>${z.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function Oe(){let w=u(),C=w.auto_repair!==!1,z=w.repo_operation_policy&&typeof w.repo_operation_policy=="object"?w.repo_operation_policy:null,ue=Array.isArray(w.repo_operations)?w.repo_operations:[],ae=ue.find(Be=>Be.state==="repairing"),Ie=ue.filter(Be=>Be.state==="failed"||Be.state==="repairing"),Ne=Ie.length?Math.min(...Ie.map(Be=>typeof Be.repair?.remaining=="number"?Be.repair.remaining:0)):z?.auto_repair?.resolution_ladder?.find(Be=>Be.id==="auto_repair_session")?.attempts??1,tt=Array.isArray(z?.auto_repair?.resolution_ladder)?z.auto_repair.resolution_ladder:[];return l`<section class="exec-defaults__repair" data-seam="auto-repair">
      <p class="exec-defaults__vd-title">
        자동 해결
        <span class="exec-defaults__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="exec-defaults__repair-toggle">
        <input
          type="checkbox"
          class="exec-defaults__repair-input"
          .checked=${C}
          @change=${Be=>{ce(Be.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="exec-defaults__repair-state">
        <span class="exec-defaults__repair-value" data-seam="auto-repair-value"
          >${C?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="exec-defaults__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${Ne}회</span
        >
        <span
          class="exec-defaults__repair-session"
          data-seam="auto-repair-session"
          >${ae?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ae.repair?.owner_bead||ae.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${z?l`<details class="exec-defaults__policy" data-seam="policy-lists">
            <summary>
              Worker 자동 처리 기준
              <span class="exec-defaults__policy-count"
                >자동 ${(z.worker_automatic||[]).length} · 해결 사다리
                ${tt.length} · 금지
                ${(z.never_automatic||[]).length}</span
              >
            </summary>
            ${Ee("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",z.worker_automatic||[],"worker-automatic")}
            ${z.supported===!1||z.schema_version!==2?l`<div
                  class="exec-defaults__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${z.schema_version})`}
                </div>`:He(tt)}
            ${Ee("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",z.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}function Ce(){ze(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${fe}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${$e()} ${F(et())}
            ${Oe()} ${V()}
          </div>
        </div>
      `,a)}let Re=!1,Ye=()=>{Re=!1},M=w=>{w.target===w.currentTarget&&fe()};a.addEventListener("close",Ye),a.addEventListener("cancel",Ye),a.addEventListener("click",M);let U=null;r&&r.subscribe&&(U=r.subscribe(()=>{Re&&Ce()}));let P=null;n&&n.subscribe&&(P=n.subscribe(()=>{Re&&Ce()}));function Q(){Re||(Re=!0,Ce(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function fe(){Re&&(Re=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Q,close:fe,destroy(){Re=!1,a.removeEventListener("close",Ye),a.removeEventListener("cancel",Ye),a.removeEventListener("click",M),U&&(U(),U=null),P&&(P(),P=null),a.remove()}}}function is(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ho(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Dp(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:is(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function al(e,t){let r=Dp(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?pt(r.deploy.at):""}
            >${ls(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ho(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function zr(e){let t=Tt(e.created_at),r=Tt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${pt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Mp(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function mn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function cs(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Gt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(f=>f&&f.bead_id===t&&f.phase!=="done").sort((f,_)=>(f.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?Mp(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:u}}function or(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function bo(e){let t=e.draggable&&!e.done,r=t&&e.lane==="queue",n=Array.isArray(e.badges)?e.badges:[],s=ht(e.usage),o=Nt(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action,c=e.lane==="done"&&!i,u=c?Tt(e.done_at):"",f=e.selectable?l`<input
        class="worker-mini__select"
        type="checkbox"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC120\uD0DD`}
        .checked=${e.selected===!0}
      />`:"",_=r?l`<button
        type="button"
        class="worker-mini__grip"
        draggable="true"
        data-bead-id=${e.id}
        aria-label=${`${e.id} \uC21C\uC11C \uBCC0\uACBD`}
        title="순서 변경"
      >
        ⠿
      </button>`:t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",h=e.worker_serial===!0?l`<span class="worker-mini__serial">머지까지 단독</span>`:e.worker_serial===null?l`<span class="worker-mini__serial worker-mini__serial--unknown"
            >실행 방식 확인 중</span
          >`:"",T=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",$=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,E=l`<span class="worker-mini__title">${e.title}</span>`,B=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",G=n.map($e=>$e===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${$e}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${$e===e.completion_badge&&e.completion_title||""}
          >${$e}</span
        >`),ee=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",I=s.length>0?s.map($e=>l`<span class="worker-usage" title=${$e.tooltip}
              >${$e.label}</span
            >`):o?l`<span class="worker-usage" title=${qr(e.usage)}
            >${o}</span
          >`:"",L=a?l`<span class="merge-step"
        >${a.label}<span class="merge-step__n"
          >${a.index}/${a.total}</span
        ></span
      >`:"",A=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",j=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ne=e.discard,Ae=ne?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ne?.attempt_id||""}
          data-operation-id=${ne?.operation?.operation_id||""}
          data-discard-mode=${ne?.confirmation||"unmerged"}
          ?disabled=${ne?!ne.enabled:e.discard_enabled===!1}
          title=${ne?ne.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ne?.label||"\uD3D0\uAE30"}
        </button>`:"",le=e.revise_action?l`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title=${e.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${e.id}
          ?disabled=${e.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",ve=!!(o||a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ne?.operation||e.revise_action);return l`<div
    class="worker-mini${i?" worker-mini--card":""}${e.selected?" worker-mini--selected":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${a?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${t&&!r?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?l`<div class="worker-mini__row1">${T}${$}${E}</div>
          <div class="worker-mini__row2">
            ${I}${u?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pt(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${G}${L}
            <span class="worker-mini__actions"
              >${A}${j}${N}${Ae}</span
            >
            ${zr(e)}
          </div>`:i?l`<div class="worker-mini__head">
              ${f}${_}${T}${$}${B}${x}${G}${h}${ee}
            </div>
            <div class="worker-mini__body">${E}</div>
            ${ve?l`<div class="worker-mini__foot">
                  ${I}${L}
                  <span class="worker-mini__actions"
                    >${A}${j}${N}${Ae}${le}</span
                  >
                  ${or(e)}
                </div>`:""}
            ${zr(e)}`:l`<div class="worker-mini__line">
              ${f}${_}${T}${$}${E}${B}${x}${G}${h}${ee}${I}${L}${A}${j}${N}${Ae}
            </div>
            ${or(e)} ${zr(e)}`}
  </div>`}function Np(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?l`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?qn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${e.id}
        ?disabled=${!t}
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${zr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?l`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return l`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?l`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:l`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":l`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?l`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Np(n):bo(n))}
          </div>`}
  </section>`}var il=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],gn=il.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function vo(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=il.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function ll(e){let t=gn.findIndex(r=>r.step===e);return gn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Rr(e){let t=gn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Pp(e){let t=gn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:gn.length}}function ds(e){let t=Pp(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var cl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},dl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4."};function ul(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function yo(e){for(let t of ul(e))if(Object.hasOwn(cl,t))return cl[t];return null}function wo(e){let t=null;for(let r of ul(e))Object.hasOwn(dl,r)&&(t=dl[r]);return t}function us(e){let t=yo(e),r=wo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function pl(e,t){let r=yo(e)??yo(t),n=wo(t)??wo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var fl=160;function Fp(e){return e.length>fl?`${e.slice(0,fl)}\u2026`:e}function qp(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${Fp(e.command)}</code>`:""}
  </div>`}function Bp(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ko(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function _l(e){let t=e.failure?us(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
                type="button"
                class="worker-banner__discard"
                data-bead-id=${e.failure.bead_id}
                data-attempt-id=${e.failure.resume_attempt_id||""}
                data-operation-id=${e.failure.discard.operation?.operation_id||""}
                data-confirmation=${e.failure.discard.confirmation}
                ?disabled=${!e.failure.discard.enabled}
                title=${e.failure.discard.title}
              >
                ${e.failure.discard.label}
              </button>`:""}
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${qp(e.failure.cause_detail)}
          ${Bp(e.failure.reason)}
          ${or({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Up(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ko(t-e.started_at):"\u2014",a=Wt(e),i=dr(e),c=ht(e.usage),u=Nt(e.usage),f=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,_=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,T=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${i?l`<span class="rtile__resumed" title=${i}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?l`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${T}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:l`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?l`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:l`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${T}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||c.length>0||u||f||_?l`<div class="rtile__meta">
          ${f?l`<span class="worker-mini__badge">${f}</span>`:""}
          ${_?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${_}</span
              >`:""}
          ${a?l`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map($=>l`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):u?l`<span
                  class="worker-usage"
                  title=${qr(e.usage)}
                  >${u}</span
                >`:""}
        </div>`:""}
    ${zr(e)} ${or(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function $o(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Up(s,t,r))}
  </div>`}function mr(e){return l`<svg
    class="mon-i"
    viewBox="0 0 16 16"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    stroke-width="1.4"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    ${e}
  </svg>`}function xo(){return mr(Xt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function So(){return mr(Xt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ml(){return mr(Xt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function gl(){return mr(Xt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function hl(){return mr(Xt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function bl(){return mr(Xt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function vl(){return mr(Xt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function yl(){return mr(Xt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var hn=1,jp=6e4,zp={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Hp=new Set(["auto_merge","merged","merge","done"]),wl={running:3,paused:2,failed:1};function Wp(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Gp(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let _=t.get(a.bead_id),h=typeof _=="number"&&_>0&&typeof a.finished_at=="number"&&_>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let _=wl[u.run_state],h=wl[i];if(_>h||_===h&&(u.started_at??0)>(c??0))continue}let f=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:It(e,a.bead_id),can_pause:i==="running"&&f,can_resume:i!=="running"&&f&&!n.has(a.attempt_id)})}return o}function kl(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Et(e){return e&&typeof e=="object"?e:{}}function Ao(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&a.set(x.root_dir,x);let i=[],c=[],u=[],f=[],_=[],h=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let G=x.root_dir,ee=x.name||G,I=a.get(G),L=I&&typeof I.revision=="number"?I.revision:typeof x.revision=="number"?x.revision:0,A=Et(x.attempts),j=Et(x.bead_titles),N=Et(x.pr_observations),ne=Et(x.admission),Ae=Et(x.revise_parked),le=Et(x.merge_queue_state),ve=Et(x.cleanup_failed),$e=Et(x.discard_operations),et=Array.isArray(x.merge_queue)?x.merge_queue:[],nt=new Set(et.filter(W=>W&&typeof W.bead_id=="string").map(W=>W.bead_id)),De=new Map(et.filter(W=>W&&typeof W.bead_id=="string").map(W=>[W.bead_id,W])),Fe=Array.isArray(x.queue)?x.queue:[],xe=Array.isArray(x.done)?x.done:[],me=new Map;for(let W of xe)W&&typeof W.bead_id=="string"&&typeof W.added_at=="number"&&me.set(W.bead_id,W.added_at);let ye=W=>({id:W,title:j[W]||W,root_dir:G,workspace_name:ee,expected_revision:L,draggable:!1}),he=new Set;for(let[W,V]of Gp(A,me))he.add(W),c.push({...ye(W),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:Gt($e,W,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let W of Array.isArray(x.pr_wait)?x.pr_wait:[]){let V=W&&W.bead_id;if(typeof V!="string"||he.has(V))continue;he.add(V);let Le=Et(N[V]),de=Et(Le.pr),ie=Le.gate?Et(Le.gate):null,R=nt.has(V),F=De.get(V)?.continuation_action||null,ce=!!F&&F.continuation===null,Me=le.active===V,Ee=W.external===!0,He=ve[V]||null,Oe=!!ie&&ie.base_badge==="\uCDA9\uB3CC",Ce=!!He&&["child_sweep","branch_cleanup","parent_close"].includes(He.step)&&!!ie&&ie.tier==="merged",Re=Ee&&!!He&&!!ie&&ie.tier==="merged",Ye=!!ie&&["closed_unmerged","review","undecidable"].includes(ie.tier),M=Gt($e,V,{external:Ee,merge_active:Me,merge_queued:R,merged:!!He||ie?.tier==="merged"}),U=!!M.operation;u.push({...ye(V),lane:"pr_wait",pr_number:typeof de.number=="number"?de.number:null,pr_url:typeof de.url=="string"?de.url:void 0,external:Ee,usage:It(A,V),badges:ce?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:He?[Rr(He.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(He.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ie?.gate_badge=="string"&&ie.gate_badge.length>0?[ie.gate_badge]:[],alert:!!He||Ye,reason:He?ds(He.step):"PR \uB300\uAE30",merge_action:!R||ce,merge_enabled:!U&&(ce||ie?.enabled===!0||Oe||Ce||Re),merge_label:ce?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Re||Ce?"\uC815\uB9AC \uC7AC\uAC1C":Oe&&!Ce?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ce?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":U?M.error?`\uD3D0\uAE30 \uC2E4\uD328: ${M.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${M.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Re?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ce?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Oe?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ie?.enabled===!0?`\uBA38\uC9C0 (${ie.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ie?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:R&&!ce,cancel_enabled:!Me,continuation_mismatch:F?.mismatch||null,discard:M,discard_action:M.action,discard_enabled:M.enabled,discard_title:M.title})}for(let W=0;W<Fe.length;W++){let V=Fe[W],Le=V&&V.bead_id;if(typeof Le!="string"||he.has(Le))continue;he.add(Le);let de=Ae[Le],ie=Gt($e,Le),R=ie.operation?ie:null,F={...ye(Le),lane:"queue",draggable:!R,discard:R||void 0,reason:kl(ne,Le),queue_position:W+1,queue_index:W,queue_length:Fe.length,badges:de?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!de,revise_action:!!de,revise_enabled:!!de&&!R,revise_title:de?de.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${de.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(F);let ce=h.get(G);ce?ce.push(F):h.set(G,[F])}for(let W of Array.isArray(x.runnable)?x.runnable:[]){let V=W&&W.bead_id;typeof V!="string"||he.has(V)||(he.add(V),i.push({...ye(V),title:W.title||j[V]||V,lane:"runnable",draggable:!0,reason:kl(ne,V),created_at:W.created_at??void 0,updated_at:W.updated_at??void 0,labels:Array.isArray(W.labels)?W.labels:[],spec_reviewer:typeof W.spec_reviewer=="string"?W.spec_reviewer:void 0,plan_state:W.plan_state==="approved"||W.plan_state==="authored"?W.plan_state:"none",workflow:W.route?{route:W.route,chips:{route:W.route}}:null,place_index:Fe.length}))}for(let W of xe){let V=W&&W.bead_id;if(typeof V!="string"||he.has(V)||(he.add(V),o!==void 0&&typeof W.added_at=="number"&&W.added_at<o))continue;let Le=Wp(A,V);_.push({...ye(V),lane:"done",done:!0,usage:It(A,V),done_at:typeof W.added_at=="number"?W.added_at:void 0,done_kind:Le&&typeof Le.done_kind=="string"?Le.done_kind:null})}}let T=new Map;s.forEach((x,G)=>{x&&typeof x.root_dir=="string"&&T.set(x.root_dir,G)});let $=r&&r.running_sort==="repo"?"repo":"started";c.sort((x,G)=>{if($==="repo"){let L=T.get(x.root_dir)??Number.MAX_SAFE_INTEGER,A=T.get(G.root_dir)??Number.MAX_SAFE_INTEGER;if(L!==A)return L-A}let ee=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,I=typeof G.started_at=="number"&&Number.isFinite(G.started_at)?G.started_at:null;return ee!==null&&I!==null&&ee!==I?ee-I:ee===null&&I!==null?1:ee!==null&&I===null?-1:x.id.localeCompare(G.id)}),_.sort((x,G)=>(G.done_at??0)-(x.done_at??0));let E=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,exec_defaults:x&&x.exec_defaults,default_exec_preset_id:x&&x.default_exec_preset_id,runner_catalog:x&&x.runner_catalog})),B=[];for(let x of E)!x||typeof x.root_dir!="string"||B.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=hn?x.slots:hn,revision:typeof x.revision=="number"?x.revision:0,exec_defaults:Et(x.exec_defaults),default_exec_preset_id:typeof x.default_exec_preset_id=="string"?x.default_exec_preset_id:null,runner_catalog:Et(x.runner_catalog),items:h.get(x.root_dir)||[]});return{runnable:i,queue:f,queue_groups:B,running:c,pr_wait:u,done:_,automation:{total:B.length,both_on:B.filter(x=>x.auto_advance&&x.auto_merge).length}}}function Yp(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<jp;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${Tt(e,t)}</span
        >`}</span
  >`}function bn(e){return l`<div class="mon-c__title">${e.title}</div>`}function vn(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function ps(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function To(e){let t=ht(e.usage),r=Nt(e.usage);return t.length>0?t.map(n=>l`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?l`<span class="mon-c__usage" title=${qr(e.usage)}
        >${r}</span
      >`:""}function Eo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Vp(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${So()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${xo()}
        </button>`}
    ${e.discard?.action?l`<button
          type="button"
          class="mon-op mon-op--discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-discard-mode=${e.discard.confirmation}
          ?disabled=${!e.discard.enabled}
          aria-label=${e.discard.label}
          title=${e.discard.title}
        >
          ${e.discard.label}
        </button>`:""}
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${gl()}
        </button>`:""}
  </span>`}function Kp(e,t){let r=typeof e.started_at=="number"?ko(t-e.started_at):"";return l`${bn(e)}
    <div class="mon-c__meta">
      ${Eo(e)}${Yp(e.last_event_at,t)}${vn(e)}${ps(e)}
      ${Wt(e)?l`<span class="mon-c__model">${Wt(e)}</span>`:""}
      ${dr(e)?l`<span
            class="rtile__resumed"
            title=${dr(e)}
            >↻</span
          >`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${To(e)}${Vp(e)}${or(e)}
    </div>`}function Zp(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Tt(e.updated_at);return l`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${vn(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?l`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?l`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Fn(e.labels,null).map(c=>l`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${ps(e)}
      ${i?l`<span title=${`\uC218\uC815 ${pt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${a?" mon-c__reason--danger":""}"
            >${e.reason}</span
          >`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="worker-card__place"
          data-bead-id=${e.id}
          title="대기 큐 맨 뒤에 추가"
        >
          대기로 ↴
        </button>
      </span>
    </div>`}function Xp(e){let t=!!e.discard?.operation;return l`${bn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${vn(e)}
      ${Eo(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${t||(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${t||(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          ?disabled=${t}
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
        ${t?l`<button
              type="button"
              class="worker-mini__discard"
              data-bead-id=${e.id}
              data-attempt-id=${e.discard?.attempt_id||""}
              data-operation-id=${e.discard?.operation?.operation_id||""}
              data-discard-mode=${e.discard?.confirmation||"unmerged"}
              ?disabled=${!e.discard?.enabled}
              aria-label=${e.discard?.label||"\uD3D0\uAE30"}
              title=${e.discard?.title||""}
            >
              ${e.discard?.label||"\uD3D0\uAE30"}
            </button>`:""}
      </span>
    </div>
    ${or(e)}
    ${e.revise_action?l`<div class="mon-c__tail">
          <button
            type="button"
            class="worker-mini__revise-fix"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title=${e.revise_title||""}
          >
            finding 수용·수정
          </button>
          <button
            type="button"
            class="worker-mini__revise-approve"
            data-bead-id=${e.id}
            ?disabled=${e.revise_enabled===!1}
            title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
          >
            승인하고 진행
          </button>
        </div>`:""}`}function Qp(e){let t=!!(Nt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Eo(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${To(e)}
          ${e.merge_action?l`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?l`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?l`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${or(e)}
        </div>`:""}`}function Jp(e,t){let r=e.done_kind||"",n=r?zp[r]||r:"",s=Tt(e.done_at,t);return l`${bn(e)}
    <div class="mon-c__meta">
      ${vn(e)}${ps(e)}
      ${n?l`<span
            class="mon-live__kind${Hp.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${To(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${pt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function $l(e,t){return e.lane==="running"?Kp(e,t):e.lane==="runnable"?Zp(e):e.lane==="queue"?Xp(e):e.lane==="pr_wait"?Qp(e):Jp(e,t)}function xl(e){let t=String(e.revision);return l`<header
    class="mon-group__hd${e.items.length===0?" is-empty":""}"
    data-root-dir=${e.root_dir}
    data-revision=${t}
  >
    <span class="mon-group__name" title=${e.root_dir}>${e.name}</span>
    <span class="mon-group__count">${e.items.length}</span>
    <span class="mon-group__ops">
      <button
        type="button"
        class="mon-ctl mon-ctl--advance${e.auto_advance?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_advance?"false":"true"}
        aria-pressed=${e.auto_advance?"true":"false"}
        title=${e.auto_advance?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      >
        ${e.auto_advance?So():xo()}
        <span class="mon-ctl__label">자동화</span>
      </button>
      <button
        type="button"
        class="mon-ctl mon-ctl--merge-auto${e.auto_merge?" is-active":""}"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        data-on=${e.auto_merge?"false":"true"}
        aria-pressed=${e.auto_merge?"true":"false"}
        title=${e.auto_merge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB044\uACE0 \uC774 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uC744 \uBE44\uC6C1\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4"}
      >
        ${hl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${bl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${hn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
      <button
        type="button"
        class="mon-ctl mon-ctl--exec"
        data-root-dir=${e.root_dir}
        data-revision=${t}
        aria-haspopup="dialog"
        aria-label=${`${e.name} \uC2E4\uD589 \uAE30\uBCF8\uAC12`}
        title="실행 기본값"
      >
        ${vl()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Sl(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Ht.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ml():yl()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
    </button>
    <div class="mon-kpi">
      <span
        class="mon-running-sort-group"
        role="group"
        aria-label="실행중 정렬"
      >
        <button
          type="button"
          class="mon-running-sort${s==="started"?" is-active":""}"
          data-sort="started"
          aria-pressed=${s==="started"?"true":"false"}
        >
          시작순
        </button>
        <span aria-hidden="true">|</span>
        <button
          type="button"
          class="mon-running-sort${s==="repo"?" is-active":""}"
          data-sort="repo"
          aria-pressed=${s==="repo"?"true":"false"}
        >
          레포순
        </button>
      </span>
      <span class="mon-kpi__chip mon-kpi__chip--running"
        >실행 <b>${e.counts.running}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--queue"
        >대기 <b>${e.counts.queue}</b></span
      >
      <span class="mon-kpi__chip mon-kpi__chip--pr"
        >PR <b>${e.counts.pr_wait}</b></span
      >
      <select
        class="mon-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${e.done_range}
      >
        ${Ht.map(i=>l`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function Al(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Tl(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return ht(jn(t));let r={};for(let i of er)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let f of er){let _=c[f];typeof _=="number"&&Number.isFinite(_)&&(r[f]+=_,n=!0,u=!0)}if(u){o+=1;let f=c.total_cost_usd;typeof f=="number"&&Number.isFinite(f)&&(s+=f,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Nt(r):null}var Cl="bdui.monitor.done-range",Rl="bdui.monitor.running_sort";function ef(){try{let e=window.localStorage.getItem(Cl);return Rt(e)?e:At}catch{return At}}function tf(e){try{window.localStorage.setItem(Cl,e)}catch{}}function rf(){try{return window.localStorage.getItem(Rl)==="repo"?"repo":"started"}catch{return"started"}}function nf(e){try{window.localStorage.setItem(Rl,e)}catch{}}var Il="tab:monitor:pipeline",sf=1e3,of=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function El(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return l`<div
    class="mon-card mon-card--${e.lane}${e.alert?" mon-card--alert":""}"
    draggable=${r?"true":"false"}
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
    data-queue-length=${String(e.queue_length??"")}
  >
    ${$l(e,t)}
  </div>`}function Ll(e,t){let r=lt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,c=t.switchWorkspace,u=t.now||(()=>Date.now()),f=t.confirm||(M=>typeof globalThis.confirm!="function"||globalThis.confirm(M)),_=ef(),h=rf();function T(){let M=Ht.find(U=>U.value===_);return M?M.label:""}let $=document.createElement("div");$.className="mon",e.appendChild($);let E=Ao(null,null),B=null,x=new Map,G=new Set;function ee(M){return E.queue_groups.find(U=>U.root_dir===M)||null}let L=as(e,{queueStore:{get(){if(!B)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let M=x.get(B);if(M)return M;let U=ee(B),P=s&&s.get?s.get():null,Q=(Array.isArray(P)?P:[]).find(fe=>fe&&fe.root_dir===B);return{revision:U?U.revision:0,exec_defaults:U?U.exec_defaults:{},default_exec_preset_id:U?U.default_exec_preset_id:null,runner_catalog:U?U.runner_catalog:null,workspace_info:Q?Q.workspace_info:void 0}},set(M){B&&x.set(B,M);for(let U of Array.from(G))U()},subscribe(M){return G.add(M),()=>G.delete(M)}},presetStore:a,transport:o?(M,U)=>o(M,M==="worker-queue-set-default-exec-preset"||M==="get-worker-system-prompt"?{...U||{},root_dir:B}:U):void 0,getWorkspacePath:()=>B||void 0}),A=null,j=null;async function N(M,U,P,Q,fe=!0){if(!o||!P)return null;let w=await o(M,{...U,root_dir:P,expected_revision:Q});if(w&&w.conflict&&fe){w.queue&&x.set(P,w.queue);let C=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:Q;w=await o(M,{...U,root_dir:P,expected_revision:C})}return w&&w.queue&&P&&x.set(P,w.queue),w}function ne(M,U){let P=x.get(M),Q=s&&s.get?s.get():null,fe=(Array.isArray(Q)?Q:[]).find(C=>C?.root_dir===M);return(P||fe)?.merge_queue?.find(C=>C.bead_id===U)?.continuation_action}async function Ae(M,U,P,Q){let fe=await N(M,U,P,Q),w=x.get(P)?.revision??fe?.queue?.revision??Q;return Jt(fe,(C,z)=>N(M,{...U,continuation:C,decision_token:z},P,w,!1),{refresh:C=>N(M,U,P,C?.queue?.revision??x.get(P)?.revision??w,!1)})}async function le(M,U,P,Q){let fe=await Jt({continuation_mismatch:Q},(C,z)=>N("worker-merge-queue-add",{bead_id:U,continuation:C,decision_token:z},M,P,!1)),w=fe?.queue?.merge_queue?.find(C=>C.bead_id===U)?.continuation_action;fe?.applied!==!0&&w?.continuation===null&&w.mismatch&&await le(M,U,fe.queue.revision,w.mismatch)}async function ve(M,U,P){let Q=await N("worker-discard",M,U,P);if(Q&&Q.discarded===!0){J(cs(Q),"success",5e3);return}if(Q&&Q.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){J(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function $e(M,U,P){return!o||!P?null:await o(M,{...U,root_dir:P})}async function et(M){if(!o||!M&&!f("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let U=await o("monitor-auto-toggle",{on:M}),P=U&&Array.isArray(U.failed)?U.failed:[];P.length>0&&J(`\uC790\uB3D9\uD654 ${M?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function nt(){let M=new Map;for(let U of E.pr_wait)M.has(U.root_dir)||M.set(U.root_dir,U.expected_revision);for(let[U,P]of M)await N("worker-merge-queue-add-all",{},U,P)}let De=null,Fe=!1,xe=null;function me(){xe!==null&&clearTimeout(xe),xe=setTimeout(()=>{xe=null,Fe=!1},0)}function ye(M){let U=M.target;return typeof U?.closest=="function"?U.closest(".mon-group"):null}function he(M){let U=ye(M);return!U||!De?null:(U.getAttribute("data-root-dir")||"")===De.root_dir?U:null}function W(){for(let M of Array.from($.querySelectorAll(".mon-group--drag-over")))M.classList.remove("mon-group--drag-over")}function V(M){let U=M.target,P=typeof U?.closest=="function"?U.closest('.mon-card[draggable="true"]'):null;if(P){De={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},Fe=!0;try{M.dataTransfer?.setData("text/plain",De.bead_id),M.dataTransfer&&(M.dataTransfer.effectAllowed="move")}catch{}}}function Le(M){let U=he(M);U&&(M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move"),U.classList.add("mon-group--drag-over"))}function de(M){ye(M)?.classList.remove("mon-group--drag-over")}function ie(){De=null,W(),me()}function R(M){let U=he(M),P=De;if(De=null,W(),!U||!P||!P.bead_id)return;M.preventDefault();let Q=M.target,fe=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,w=fe&&U.contains(fe)?Number(fe.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let ue=Number.isFinite(w)?w:P.place_index;if(!Number.isFinite(ue))return;N("worker-queue-place",{bead_id:P.bead_id,index:ue},P.root_dir,P.revision);return}if(P.lane!=="queue"||fe&&fe.getAttribute("data-issue-id")===P.bead_id)return;let C=P.queue_index,z=Number.isFinite(w)?C>w?w:w-1:P.queue_length-1;!Number.isFinite(z)||z<0||z===C||N("worker-queue-reorder",{bead_id:P.bead_id,to_index:z},P.root_dir,P.revision)}function F(M){let U={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return l`${Sl({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:h,done_range:_,token_total:Tl(E.done),token_tooltip:Al(T())})}
      <div class="worker-lanes mon-lanes">
        ${of.map(P=>{let Q=U[P.lane],fe=P.lane==="queue"?E.queue_groups.length>0?l`${E.queue_groups.map(w=>l`<div
                        class="mon-group"
                        data-root-dir=${w.root_dir}
                      >
                        ${xl(w)}
                        <div class="mon-group__list">
                          ${w.items.map(C=>El(C,M))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?l`${Q.map(w=>El(w,M))}`:void 0;return Yt({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${T()}`:P.title,items:Q,empty:P.empty,body:fe,live:P.lane==="running"&&Q.length>0,header_control:P.lane==="pr_wait"&&Q.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function ce(){let M=s&&s.get?s.get():null,U=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=u();E=Ao(M,U,{done_since:kr(_,P),running_sort:h}),ze(F(P),$)}function Me(M,U){let P=i?i():void 0;if(!U||!P||U===P||!c){n(M);return}c(U).then(()=>{n(M)}).catch(Q=>{r("workspace switch for %s failed: %o",U,Q)})}function Ee(M){return{root_dir:M.getAttribute("data-root-dir")||"",revision:Number(M.getAttribute("data-revision")||0)||0}}function He(M,U){let{root_dir:P,revision:Q}=Ee(M),fe=M.getAttribute("data-issue-id")||"",w=U.dataset.attemptId||M.getAttribute("data-attempt-id")||"",C=U.classList;if(C.contains("worker-card__place")){N("worker-queue-place",{bead_id:fe,index:Number(M.getAttribute("data-place-index")||0)||0},P,Q);return}if(C.contains("mon-op--up")||C.contains("mon-op--down")){let z=Number(M.getAttribute("data-queue-index")||0)||0,ue=C.contains("mon-op--up")?z-1:z+1;if(ue<0)return;N("worker-queue-reorder",{bead_id:fe,to_index:ue},P,Q);return}if(C.contains("mon-op--remove")){N("worker-queue-remove",{bead_id:fe},P,Q);return}if(C.contains("mon-op--pause")){$e("worker-attempt-pause",{attempt_id:w},P);return}if(C.contains("mon-op--discard")){if(!f(mn(fe,"unmerged")))return;ve({bead_id:fe,...w?{attempt_id:w}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},P,Q);return}if(C.contains("mon-op--resume")){Ae("worker-attempt-resume",{attempt_id:w},P,Q);return}if(C.contains("mon-op--dismiss")){N("worker-attempt-dismiss",{attempt_id:w},P,Q);return}if(C.contains("worker-mini__merge")){let z=ne(P,fe);z?.mismatch&&z.continuation===null?le(P,fe,Q,z.mismatch):N("worker-merge-queue-add",{bead_id:fe},P,Q);return}if(C.contains("worker-mini__merge-cancel")){N("worker-merge-queue-remove",{bead_id:fe},P,Q);return}if(C.contains("worker-mini__discard")){let z=U.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(mn(fe,z)))return;ve({bead_id:fe,...w?{attempt_id:w}:{},...U.dataset.operationId?{operation_id:U.dataset.operationId}:{}},P,Q);return}if(C.contains("worker-mini__revise-fix")){Ae("worker-revise-fix",{bead_id:fe},P,Q);return}C.contains("worker-mini__revise-approve")&&N("worker-revise-approve",{bead_id:fe},P,Q)}function Oe(M){let U=Fe;Fe=!1;let P=M.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let Q=P.closest(".mon-running-sort");if(Q){M.preventDefault(),h=Q.getAttribute("data-sort")==="repo"?"repo":"started",nf(h),ce();return}let fe=P.closest(".mon-auto-all");if(fe){M.preventDefault(),et(fe.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){M.preventDefault(),nt();return}let C=P.closest(".mon-ctl--advance");if(C){M.preventDefault();let{root_dir:tt,revision:Be}=Ee(C);N("worker-automation-toggle",{on:C.getAttribute("data-on")==="true"},tt,Be);return}let z=P.closest(".mon-ctl--merge-auto");if(z){M.preventDefault();let{root_dir:tt,revision:Be}=Ee(z);N("worker-merge-auto-toggle",{on:z.getAttribute("data-on")==="true"},tt,Be);return}let ue=P.closest(".mon-ctl--exec");if(ue){M.preventDefault(),B=ue.getAttribute("data-root-dir")||null,x.delete(B||""),L.open();return}let ae=P.closest(".mon-card");if(!ae)return;let Ie=P.closest("button");if(Ie){M.preventDefault(),He(ae,Ie);return}let Ne=ae.getAttribute("data-issue-id");Ne&&!U&&(M.preventDefault(),Me(Ne,ae.getAttribute("data-root-dir")||""))}function Ce(M){let U=M.target;if(!U||typeof U.closest!="function")return;let P=U.closest(".mon-done-range");if(P){_=Rt(P.value)?P.value:At,tf(_),ce();return}let Q=U.closest(".mon-slots__input");if(!Q)return;let{root_dir:fe,revision:w}=Ee(Q),C=Number(Q.value);if(!Number.isFinite(C))return;let z=Math.max(hn,Math.floor(C));N("worker-queue-set-slots",{slots:z},fe,w)}e.addEventListener("click",Oe),e.addEventListener("change",Ce),e.addEventListener("dragstart",V),e.addEventListener("dragover",Le),e.addEventListener("dragleave",de),e.addEventListener("drop",R),e.addEventListener("dragend",ie),s&&typeof s.subscribe=="function"&&(A=s.subscribe(()=>{try{x.clear(),ce();for(let M of Array.from(G))M()}catch{}}));function Re(){j!==null&&(clearInterval(j),j=null)}function Ye(){xe!==null&&(clearTimeout(xe),xe=null)}return{load(){r("load"),ce(),j===null&&(j=setInterval(()=>{try{ce()}catch{}},sf))},pause(){Re()},clear(){Re(),Ye(),A&&(A(),A=null),e.removeEventListener("click",Oe),e.removeEventListener("change",Ce),e.removeEventListener("dragstart",V),e.removeEventListener("dragover",Le),e.removeEventListener("dragleave",de),e.removeEventListener("drop",R),e.removeEventListener("dragend",ie),L.destroy(),G.clear(),e.replaceChildren()}}}function Ol(e,t,r){let n=lt("views:nav"),s=null;function o(c){return u=>{u.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),u=c.view==="worker"||c.view==="monitor"?c.view:"board";return l`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){ze(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),ze(l``,e)}}}var Dl=["bug","feature","task","epic","chore"];function Ml(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Nl=["Critical","High","Medium","Low","Backlog"];function Pl(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
    <div class="new-issue__container" part="container">
      <header class="new-issue__header">
        <div class="new-issue__title">New Issue</div>
        <button type="button" class="new-issue__close" aria-label="Close">\xD7</button>
      </header>
      <div class="new-issue__body">
        <form id="new-issue-form" class="new-issue__form">
          <label for="new-title">Title</label>
          <input id="new-title" name="title" type="text" required placeholder="Short summary" />

          <label for="new-type">Type</label>
          <select id="new-type" name="type" aria-label="Issue type"></select>

          <label for="new-priority">Priority</label>
          <select id="new-priority" name="priority" aria-label="Priority"></select>

          <label for="new-labels">Labels</label>
          <input id="new-labels" name="labels" type="text" placeholder="comma,separated" />

          <label for="new-description">Description</label>
          <textarea id="new-description" name="description" rows="6" placeholder="Optional markdown description"></textarea>

          <div aria-live="polite" role="status" class="new-issue__error" id="new-issue-error"></div>

          <div class="new-issue__actions" style="grid-column: 1 / -1">
            <button type="button" id="btn-cancel">Cancel (Esc)</button>
            <button type="submit" id="btn-create">Create</button>
          </div>
        </form>
      </div>
    </div>
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let L=document.createElement("option");L.value="",L.textContent="\u2014 Select \u2014",o.appendChild(L);for(let A of Dl){let j=document.createElement("option");j.value=A,j.textContent=Ml(A),o.appendChild(j)}a.replaceChildren();for(let A=0;A<=4;A+=1){let j=document.createElement("option");j.value=String(A);let N=Nl[A]||"Medium";j.textContent=`${A} \u2013 ${N}`,a.appendChild(j)}}T();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(L){s.disabled=L,o.disabled=L,a.disabled=L,i.disabled=L,c.disabled=L,f.disabled=L,_.disabled=L,_.textContent=L?"Creating\u2026":"Create"}function B(){u.textContent=""}function x(L){u.textContent=L}function G(){try{let L=window.localStorage.getItem("beads-ui.new.type");L?o.value=L:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?a.value=A:a.value="2"}catch{o.value="",a.value="2"}}function ee(){let L=o.value||"",A=a.value||"";L.length>0&&window.localStorage.setItem("beads-ui.new.type",L),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function I(){B();let L=String(s.value||"").trim();if(L.length===0){x("Title is required"),s.focus();return}let A=Number(a.value||"2");if(!(A>=0&&A<=4)){x("Priority must be 0..4"),a.focus();return}let j=String(o.value||""),N=String(c.value||""),ne={title:L};j.length>0&&(ne.type=j),String(A).length>0&&(ne.priority=A),N.length>0&&(ne.description=N),E(!0);try{await t("create-issue",ne)}catch{E(!1),x("Failed to create issue");return}ee(),E(!1),$()}return r.addEventListener("cancel",L=>{L.preventDefault(),$()}),h.addEventListener("click",()=>$()),f.addEventListener("click",()=>$()),r.addEventListener("keydown",L=>{L.key==="Enter"&&(L.ctrlKey||L.metaKey)&&(L.preventDefault(),I())}),n.addEventListener("submit",L=>{L.preventDefault(),I()}),{open(){n.reset(),B(),G();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var af=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Fl(e){return String(e).padStart(2,"0")}function lf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function cf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Fl(n.getHours())}:${Fl(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${af[n.getMonth()]} ${n.getDate()} ${o}`;return`${lf(r,t)} \xB7 ${i}`}function df(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var ql=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Bl(e){let t=!1,r=null,n=new Map;function s(){ze(l``,e),e.hidden=!0}function o(){let c=ql.filter(f=>n.has(f.key));if(c.length===0){s();return}let u=Date.now();ze(l`<div class="usage-meter" aria-label="Usage">
        ${c.map(f=>{let _=n.get(f.key),h=typeof _.ageSeconds=="number"&&_.ageSeconds>600,T=h?`${Math.floor(_.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return l`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${f.label} usage`}
          >
            <span class="usage-meter__provider">${f.label}</span>
            ${_.windows.map($=>{let E=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,B=Math.min(100,Math.max(0,E)),G=`resets ${cf($.resetsAt,u)}${h?` \xB7 ${T}`:""}`;return l`<span
                class="usage-meter__window ${df(B)}"
                style=${`--progress: ${B}%`}
                title=${G}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let u=await fetch(c.endpoint);if(!u.ok)return null;let f=await u.json();return!f||f.available!==!0||!Array.isArray(f.windows)?null:f}catch{return null}}async function i(){let c=await Promise.all(ql.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of c)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var uf="worker-ineligible";function Co(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ul(e){return Co(e).includes(uf)}var Ro="worker-serial";function yn(e){return Co(e).includes(Ro)}var pf=20,jl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},zl={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function ff(e,t,r=pf){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Hl(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function _f(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Wl(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Gl(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function mf(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(zl,n)?zl[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function gf(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Hl(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(jl,t.kind)?jl[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${is(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ho(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Hl(e)}"
          >${_f(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Gl(pl(t.failure_kind,n)):""}
      ${mf(t)}
      ${Wl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${is(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hf(e){let t=e.cleanup,r=Rr(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pt(e.at):""}
      >${ls(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--warn"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${t.bead_id} 머지 후 정리</span>
        <span class="worker-ev__st worker-ev__st--warn">멈춤</span>
      </div>
      <ol class="worker-stepper" aria-label="정리 단계">
        ${ll(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Gl(us(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Wl([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function bf(e){return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
    <div class="worker-repo-drawer__hd">
      <h3>저장소 작업 타임라인</h3>
      <span class="worker-repo-drawer__hint">${e.repo}</span>
      <span class="worker-repo-drawer__spacer"></span>
      <button
        type="button"
        class="worker-repo-drawer__close"
        aria-label="닫기"
        data-seam="repo-ops-close"
      >
        ✕
      </button>
    </div>
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?hf(t):gf(t))}
        </ul>`}
  </section>`}function Yl(e,t={}){let r=null;function n(){ze(r?bf(r):l``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:ff(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var vf="tab:worker:ready",yf="tab:worker:blocked",wf="tab:worker:in-progress",kf="tab:worker:closed",wn=1,$f=new Set(["done","failed","orphaned","stopped","discarded"]);function Vl(e){return fn(e).path.length>0}var Xl="beads-ui.worker.candidate-filter",Io={show_blocked:!1,spec:"all"};function xf(){try{let e=window.localStorage.getItem(Xl);if(!e)return{...Io};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Io};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Io}}}function Sf(e){try{window.localStorage.setItem(Xl,JSON.stringify(e))}catch{}}function Af(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Tf=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ql="bdui.worker.candidate_sort",Ef=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],fs="spec";function Cf(){try{let e=window.localStorage.getItem(Ql);return e==="board"||e==="created"||e==="spec"?e:fs}catch{return fs}}function Rf(e){try{window.localStorage.setItem(Ql,e)}catch{}}var Jl="bdui.worker.done-range";function If(){try{let e=window.localStorage.getItem(Jl);return Rt(e)?e:At}catch{return At}}function Lf(e){try{window.localStorage.setItem(Jl,e)}catch{}}var Of="(max-width: 640px)",ec="beads-ui.worker.lane-collapsed",kn={queue:!0,done:!0};function Df(){try{let e=window.localStorage.getItem(ec);if(!e)return{...kn};let t=JSON.parse(e);return!t||typeof t!="object"?{...kn}:{queue:typeof t.queue=="boolean"?t.queue:kn.queue,done:typeof t.done=="boolean"?t.done:kn.done}}catch{return{...kn}}}function Mf(e){try{window.localStorage.setItem(ec,JSON.stringify(e))}catch{}}function Kl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Nf(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(xr):(n.sort(Ln(r)),t==="board"?n:[...n.filter(Vl),...n.filter(s=>!Vl(s))])}function Pf(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ff(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function qf(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Bf=["closed_unmerged","review","undecidable"],Uf=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uAC80\uC99D \uC911"}];function jf(e,t){for(let r of Uf)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}function Zl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function zf(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function Lo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Hf(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Wf(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,f=null,_=null,h=null,T={},$=!1){let E=!!c&&c.position>0,B=!!c?.continuation_action&&c.continuation_action.continuation===null,x=!!c&&c.active===!0,G=c&&c.failure||null,ee=r[e]||null,I=ee&&ee.gate?ee.gate:null,L=ee&&ee.pr?ee.pr:null,A=Hf(h),j=zf(c?c.resolution:null),N=[];i&&N.push("\uC138\uC158");let ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":j?j.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,Ae=jf(i&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",ne?null:o&&o.activity||null);if(ne&&N.push(ne),Ae.label&&N.push(Ae.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&N.push(I.base_badge),_&&N.push(_),n){let ye=Rr(n.step);N.push(ye?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${ye}`:"\uC815\uB9AC \uBA48\uCDA4")}A&&N.push(A.badge),E&&!x&&N.push(`\uBA38\uC9C0 \uB300\uAE30 #${c.position}`),G&&N.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Zl(G)}`),B&&N.push("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"),f&&N.push(`\uC790\uB3D9 \uC81C\uC678: ${Zl(f)}`);let le=!!I&&I.base_badge==="\uCDA9\uB3CC",ve=!!I&&I.enabled===!0,$e=vo(o&&o.merge_progress?o.merge_progress.step:null),et=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!I&&I.tier==="merged",nt=i&&!!n&&!!I&&I.tier==="merged",De=i&&le&&u===!1,Fe=Gt(T,e,{external:i,merge_active:x||!!$e,merge_queued:E,conflict_active:!!a,cleanup_active:!1,merged:!!n||I?.tier==="merged"}),xe=!!Fe.operation,me=!et&&!!n&&n.step==="repo_operations";return{id:e,title:t,reason:n?ds(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:L&&typeof L.number=="number"?L.number:null,pr_url:L&&typeof L.url=="string"?L.url:"",completion_badge:A?A.badge:null,completion_title:A?A.title:"",completion_repair_pr_url:A?A.repair_pr_url:"",completion_repair_pr_number:A?A.repair_pr_number:null,badges:N,live_badge:a==="paused"?null:j?.live||a==="running"?ne:Ae.live?Ae.label:null,usage:s,alert:!!I&&Bf.includes(I.tier)||!!n||!!G||!!(A&&A.alert),merge_action:me?!1:!E||B,timeline_action:me,cancel_action:E&&!B,cancel_enabled:!x&&!(A&&A.lock_actions),cancel_title:A&&A.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Fe,discard_action:Fe.action,merge_step:$e,discard_enabled:Fe.enabled,discard_title:Fe.title,merge_enabled:!$e&&!a&&!xe&&!(A&&A.lock_actions)&&!De&&!me&&(ve||le||et||nt),merge_label:B?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":et||nt?"\uC815\uB9AC \uC7AC\uAC1C":le&&!$e&&!et?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:xe?Fe.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Fe.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Fe.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$e?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${$e.label}`:nt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":et?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":le?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ve?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Oo(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:f,onDoneRangeChange:_}=t,h=n?Dn(n,i):null,T=Nn({transport:r,uiOrderStore:i}),$=null,E=[],B=xf(),x=Cf(),G=Rt(f)?f:If(),ee=new Map;function I(){let p=Ht.find(y=>y.value===G);return p?p.label:"\uC624\uB298"}let L=Df(),A=!1,j=new Set,N=new Set,ne=new Set,Ae="ordinary",le=!1,ve=new Map,$e=[],et=document.createElement("div");et.className="worker-console";let nt=document.createElement("div");nt.className="worker-top";let De=document.createElement("div");De.className="worker-drawer-overlay",De.hidden=!0;let Fe=document.createElement("div");Fe.className="worker-drawer-overlay__backdrop";let xe=document.createElement("div");xe.className="worker-drawer-host";let me=document.createElement("div");me.className="worker-drawer-host",me.hidden=!0,De.append(Fe,xe,me);let ye=document.createElement("div");ye.className="worker-lanes-host",et.append(nt,De,ye),e.appendChild(et);let he=null,W=rs(xe,{transport:r,sessionLogStore:a,onClose:()=>{he=null,De.hidden=!0,K()}}),V=Yl(me,{onClose:()=>{me.hidden=!0,De.hidden=!0,K()}}),Le=as(et,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function de(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:wn,queue:[],pr_wait:[],done:[]}}function ie(){let p=de();return typeof p.revision=="number"?p.revision:0}function R(p){p&&p.queue&&s&&s.set(p.queue)}function F(){let p=de().queue;return Array.isArray(p)?p.length:0}async function ce(p,y){if(!r)return;let S=await r("worker-queue-place",{bead_id:p,index:y,expected_revision:ie()});R(S),S&&S.conflict&&await r("worker-queue-place",{bead_id:p,index:y,expected_revision:ie()}).then(R)}async function Me(p,y){if(!r)return;let S=await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:ie()});R(S),S&&S.conflict&&await r("worker-queue-reorder",{bead_id:p,to_index:y,expected_revision:ie()}).then(R)}async function Ee(p){if(!r)return;let y=await r("worker-queue-remove",{bead_id:p,expected_revision:ie()});R(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:ie()}).then(R)}async function He(){if(!r||le)return;let y=(Array.isArray(de().queue)?de().queue:[]).map(pe=>pe.bead_id).filter(pe=>ne.has(pe));if(y.length===0)return;if(y.some(pe=>{let We=ve.get(pe);return We!==!0&&We!==!1})){J("\uC2E4\uD589 \uBC29\uC2DD \uD655\uC778 \uC911","warning");return}let S=Ae==="serial",re=y.filter(pe=>ve.get(pe)!==S);if(re.length===0){ne.clear(),K(),J("\uC774\uBBF8 \uAC19\uC740 \uC2E4\uD589 \uBC29\uC2DD\uC785\uB2C8\uB2E4","info");return}le=!0,K();let ge=[],be=0;try{for(let pe of re){let We=await Promise.resolve(r(S?"label-add":"label-remove",{id:pe,label:Ro})).catch(()=>[]),Z=Array.isArray(We)?We[0]:We,v=Z&&typeof Z=="object"?Z.labels:null;Z&&typeof Z=="object"&&Z.id===pe&&Array.isArray(v)&&yn(v)===S?be+=1:ge.push(pe)}if(ge.length===0){ne.clear(),J(`${be}\uAC1C \uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD`,"success");return}ne.clear();for(let pe of ge)ne.add(pe);J(`${re.length}\uAC1C \uC911 ${be}\uAC1C \uBCC0\uACBD \xB7 ${ge.length}\uAC1C \uC2E4\uD328 (${ge.join(", ")})`,"error")}finally{le=!1,K()}}async function Oe(p){if(!r||!p)return;let y=await r("worker-attempt-pause",{attempt_id:p});y&&y.paused===!1&&y.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ce(p){if(!r||!p)return;let y=async(re={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:ie(),...re}),S=await y();R(S),S&&S.conflict&&(S=await r("worker-attempt-resume",{attempt_id:p,expected_revision:ie()}),R(S)),S=await Jt(S,(re,ge)=>y({continuation:re,decision_token:ge}),{onResult:R,refresh:()=>y()}),S&&S.resumed===!1&&!S.conflict&&S.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}async function Re(p){if(!r||!p)return;let y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ie()});R(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:ie()}),R(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ye(p,y,S=!0){if(!r)return null;let re=r,ge=await re(p,{...y,expected_revision:ie()});return R(ge),ge&&ge.conflict&&S&&(ge=await re(p,{...y,expected_revision:ie()}),R(ge)),ge}async function M(p){if(!r||!p)return;let y=de().merge_queue?.find(re=>re.bead_id===p)?.continuation_action;if(y?.mismatch&&y.continuation===null){await U(p,y.mismatch);return}j.add(p),K();let S;try{S=await Ye("worker-merge-queue-add",{bead_id:p})}finally{j.delete(p),K()}!S||S.conflict||S.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function U(p,y){let S=await Jt({continuation_mismatch:y},(ge,be)=>Ye("worker-merge-queue-add",{bead_id:p,continuation:ge,decision_token:be},!1)),re=S?.queue?.merge_queue?.find(ge=>ge.bead_id===p)?.continuation_action;if(S?.applied!==!0&&re?.continuation===null&&re.mismatch){await U(p,re.mismatch);return}S&&S.applied===!1&&!S.conflict&&J("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(p){if(!r)return;let y=await Ye("worker-merge-auto-toggle",{on:p});!y||y.conflict||J(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Q(p){if(!r||!p)return;let y=await Ye("worker-merge-queue-remove",{bead_id:p});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function fe(){await Ye("worker-merge-queue-remove",{all:!0})}async function w(p,y=null,S="unmerged",re=null){if(!r||!p)return;let ge=mn(p,S);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ge)))return;let pe=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...re?{operation_id:re}:{},expected_revision:ie()});if(R(pe),pe&&pe.conflict&&(pe=await r("worker-discard",{bead_id:p,...y?{attempt_id:y}:{},...re?{operation_id:re}:{},expected_revision:ie()}),R(pe)),pe&&pe.discarded===!0){J(cs(pe),"success",5e3);return}if(pe&&pe.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${pe.reason}`,"error",2800);return}if(pe&&pe.accepted&&pe.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(pe&&pe.accepted&&!pe.discarded){J(`\uD3D0\uAE30 \uC9C4\uD589: ${pe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}pe&&!pe.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function C(p,y){if(!r||!y||N.has(y))return;N.add(y),K();let S;try{let re=async(ge={})=>await r(p,{bead_id:y,expected_revision:ie(),...ge});S=await re(),R(S),S&&S.conflict&&(S=await r(p,{bead_id:y,expected_revision:ie()}),R(S)),p==="worker-revise-fix"&&(S=await Jt(S,(ge,be)=>re({continuation:ge,decision_token:be}),{onResult:R,refresh:()=>re()}))}finally{N.delete(y),K()}if(!(!S||S.conflict)){if(S.ok){J(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${S.reason||""}`,"error",3e3)}}async function z(p){if(!r)return;let y=await r("worker-automation-toggle",{on:p,expected_revision:ie()});R(y),y&&y.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:ie()}).then(R)}async function ue(p){if(!r||!p)return;let y=await r("worker-repo-operation-repair",{operation_id:p});if(R(y),y&&y.ok===!1){J(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&J("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function ae(p){if(!r||!p)return;let y=await r("worker-repo-operation-dismiss",{operation_id:p});R(y),y&&y.ok===!1&&J(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Ie(p){if(!r||!Number.isFinite(p))return;let y=Math.max(wn,Math.floor(p)),S=await r("worker-queue-set-slots",{slots:y,expected_revision:ie()});R(S),S&&S.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:ie()}).then(R)}async function Ne(p){if(!r)return;let y=await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ie()});R(y),y&&y.conflict&&await r("worker-queue-set-pr-wait-hold",{on:p,expected_revision:ie()}).then(R)}function tt(){let p=de(),y=h?h.selectBoardColumn(vf,"ready"):[],S=h?h.selectBoardColumn(yf,"blocked"):[],re=h?h.selectBoardColumn(kf,"closed"):[],ge=h?h.selectBoardColumn(wf,"in_progress"):[],be=new Map;for(let g of ge){let O=Ff(g);if(!O)continue;let oe=be.get(O);oe?oe.push(g):be.set(O,[g])}let pe=g=>{let O=Mn(be.get(g)||[]);return O?O.title||O.id:null},We=p.bead_titles||{},Z=new Map;for(let[g,O]of Object.entries(We))typeof O=="string"&&O.length>0&&Z.set(g,O);for(let g of[...y,...S])Z.set(g.id,g.title||g.id);ve.clear();let v=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},H=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{};for(let[g,O]of Object.entries(H))Array.isArray(O)&&ve.set(g,yn(O));for(let g of[...y,...S]){let O=g.labels;if(!Array.isArray(O))continue;if(!ve.has(g.id)){ve.set(g.id,yn(O));continue}let oe=v[g.id],Xe=Qt(oe&&typeof oe=="object"?oe.updated_at:null),zt=Qt(g.updated_at);zt!==null&&Xe!==null&&zt>Xe&&ve.set(g.id,yn(O))}let se=new Map;for(let[g,O]of Object.entries(v))O&&typeof O=="object"&&se.set(g,O);for(let g of[...y,...S])se.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let Pe=g=>se.get(g)||{},Qe=p.pr_wait||[],Ze=p.pr_observations||{},m=p.pr_activity||{},d=p.cleanup_failed||{},k=Object.entries(d).map(([g,O])=>({bead_id:g,step:O&&O.step?O.step:"",reason:O&&O.reason?O.reason:"",at:O&&typeof O.at=="number"?O.at:null,detail:O&&typeof O.detail=="string"?O.detail:null,output_tail:O&&typeof O.output_tail=="string"&&O.output_tail?O.output_tail:void 0,log_path:O&&typeof O.log_path=="string"&&O.log_path?O.log_path:void 0,retry_count:O&&typeof O.retry_count=="number"&&Number.isInteger(O.retry_count)&&O.retry_count>0?O.retry_count:0,failure_code:O&&typeof O.failure_code=="string"?O.failure_code:void 0,subject_id:O&&typeof O.subject_id=="string"?O.subject_id:void 0,repair_eligible:!!(O&&O.repair_eligible),repair:O&&O.repair?O.repair:void 0})),b=p.queue||[],D=new Set(b.map(g=>g.bead_id));for(let g of ne)D.has(g)||ne.delete(g);let te=new Set([...b.map(g=>g.bead_id),...Qe.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),X=new Set(S.map(g=>g.id)),Ue=i?i.get()?.order||{}:{},qe=new Set,Kt=[];for(let g of[...y,...S])te.has(g.id)||qe.has(g.id)||Pf(g)||Ul(g.labels)||(qe.add(g.id),Kt.push(g));E=Nf(Kt,x,Ue);let _s=p.admission||{},Po=g=>{let O=_s[g];if(!O)return"";if(O.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof O.reason=="string"?O.reason:"",Xe=oe.indexOf(":");return Xe>0&&Xe<oe.length-1?`\u26D4 ${oe.slice(0,Xe)} (${oe.slice(Xe+1)})`:`\u26D4 ${oe}`},pc=E.map(g=>{let O=fn(g),oe=O.path.length>0,Xe=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",zt=!Xe&&oe&&!O.conflict,ar=X.has(g.id),Ct=[];ar&&Ct.push(qf(g)),Xe?Ct.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):O.conflict?Ct.push("spec_id_conflict"):oe||Ct.push("spec \uC5C6\uC74C");let En=Po(g.id);return En&&Ct.push(En),{id:g.id,title:g.title||g.id,reason:Ct.join(" \xB7 "),draggable:zt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Xe,status:g.status,blocked:ar,has_spec:oe}}),ms=Af(pc,B),fc=ms.visible,_c=p.revise_parked||{},Hr=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Fo=(g,O)=>g.map(oe=>{let Xe=O==="queue"?_c[oe.bead_id]:null,zt=O==="queue"?Gt(Hr,oe.bead_id):null,ar=zt?.operation?zt:null,Ct=O==="queue"?ve.has(oe.bead_id)?ve.get(oe.bead_id)||!1:null:!1,En=Ct===!0&&(Object.values(p.attempts||{}).some(Zt=>Zt&&Zt.bead_id!==oe.bead_id&&!$f.has(Zt.status))||Qe.some(Zt=>Zt.bead_id!==oe.bead_id)||Object.values(Hr).some(Zt=>Zt&&Zt.bead_id!==oe.bead_id&&Zt.phase!=="done")),na=O==="done"?[]:[Po(oe.bead_id)];return En&&na.unshift("\uB2E4\uB978 \uC791\uC5C5 \uC885\uB8CC \uB300\uAE30 \xB7 \uBA38\uC9C0\uAE4C\uC9C0 \uB2E8\uB3C5"),{id:oe.bead_id,title:Z.get(oe.bead_id)||oe.bead_id,reason:na.filter(Boolean).join(" \xB7 "),draggable:O!=="done"&&!ar,done:O==="done",lane:O,selectable:O==="queue",selected:O==="queue"&&ne.has(oe.bead_id),worker_serial:Ct,discard:ar,badges:Xe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Xe,revise_action:!!Xe,revise_enabled:!!Xe&&!ar&&!N.has(oe.bead_id),revise_title:Xe?Xe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Xe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:O==="done"?It(p.attempts||{},oe.bead_id):null,done_at:O==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,...Pe(oe.bead_id)}}),qo=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&qo.set(g.bead_id,g.added_at);let Wr=p.attempts?Object.values(p.attempts):[],gs=new Set;for(let g of Wr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&gs.add(g.resumed_from);let hs=new Map;for(let g of Wr)hs.set(g.bead_id,g.attempt_id);let bs=new Map;for(let g of Wr)bs.set(g.attempt_id,g);function vs(g){let O=new Set,oe=g;for(;oe&&!O.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;O.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&bs.get(oe.resumed_from)||null}return!1}let $n=typeof p.declared_base=="string"?p.declared_base:null;function mc(g){let O=null;for(let oe of Wr)!oe||oe.bead_id!==g||vs(oe)||(O===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof O.started_at=="number"?O.started_at:0))&&(O=oe);return O&&typeof O.target_base=="string"?O.target_base:null}let Bo=[],Uo=[],gc=g=>{let O=hs.get(g.bead_id)!==g.attempt_id,oe=qo.get(g.bead_id),Xe=typeof oe=="number"&&oe>0&&typeof g.finished_at=="number"&&oe>=g.finished_at;return!O&&!Xe&&typeof g.dismissed_at!="number"},jo=g=>{let O=typeof g.session_id=="string"&&g.session_id.length>0,oe=gs.has(g.attempt_id);return{eligible:O&&!oe,reason:O?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dt=null;for(let g of Wr){let O=g.status==="paused"&&!gs.has(g.attempt_id);if(g.status==="running"||O)Uo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Z.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:O,conflict_resolution:vs(g),base_exception:Lo($n,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),usage:It(p.attempts||{},g.bead_id),current_child:pe(g.bead_id),...Pe(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&gc(g)){let oe=jo(g);Bo.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Z.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Gt(Hr,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:vs(g),base_exception:Lo($n,g.target_base),usage:It(p.attempts||{},g.bead_id),current_child:pe(g.bead_id),...Pe(g.bead_id)}),Dt=g}}let xn=[...Bo,...Uo],zo=null;if(Dt){let g=jo(Dt),O=Dt.cause_detail;zo={bead_id:Dt.bead_id,repo:Dt.repo||"",reason:Dt.cause||Dt.status,cause_detail:O&&typeof O.reason=="string"?{reason:O.reason,command:typeof O.command=="string"?O.command:null}:null,resume_attempt_id:Dt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Gt(Hr,Dt.bead_id,{attempt_id:Dt.attempt_id})}}let hc=new Set(xn.map(g=>g.bead_id)),ys=Array.isArray(p.merge_queue)?p.merge_queue:[],Ho=new Map,Wo=new Map,Go=new Map;ys.forEach((g,O)=>{g&&typeof g.bead_id=="string"&&(Ho.set(g.bead_id,O+1),Wo.set(g.bead_id,g.resolution),Go.set(g.bead_id,g.continuation_action||null))});let Yo=p.merge_queue_state||{active:null,failures:{}},bc=Yo.failures||{},vc=p.auto_merge_skips||{},Vo=g=>{let O=vc[g];if(!O)return null;let oe=Ze[g],Xe=oe&&oe.pr?oe.pr.head_sha:null;return Xe&&Xe===O.head_sha?O.reason||"":null},Sn=new Map;for(let g of xn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Sn.has(g.bead_id)||Sn.set(g.bead_id,"paused"):Sn.set(g.bead_id,"running"));let Ko=xn.filter(g=>!g.paused&&g.failed!==!0).length,Zo=(p.workspace_info||{}).slots,yc=typeof Zo=="number"?Zo:typeof p.slots=="number"?p.slots:wn,Xo=p.pr_wait_holds_slot===!0?wn:yc,wc=Ko>Xo,An=kr(G),kc=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>An===void 0||typeof g.added_at!="number"||g.added_at>=An).sort((g,O)=>(O.added_at||0)-(g.added_at||0)),Gr=Fo(kc,"done"),$c=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Qo=[],xc=u?.()||"";for(let g of re){let O=Qt(g.closed_at);if(typeof g.id!="string"||$c.has(g.id)||O===null||An!==void 0&&O<An||typeof g.comment_count!="number"||g.comment_count<=0)continue;let oe=`${xc}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Xe=ee.get(oe);Xe===void 0&&r&&(ee.set(oe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(zt=>{let ar=Array.isArray(zt)&&zt.some(Ct=>ns(typeof Ct?.text=="string"?Ct.text:"")?.lane==="session");ee.set(oe,ar?"session":"not-session"),K()}).catch(()=>{ee.set(oe,"failed"),K()})),Xe==="session"&&Qo.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:O,created_at:g.created_at,updated_at:g.updated_at})}Gr.push(...Qo),Gr.sort((g,O)=>(O.done_at||0)-(g.done_at||0));let Tn={};for(let g of er)Tn[g]=0;let Jo=!1,ea=0,ws=0,ta=0;for(let g of Gr){let O=g.usage;if(O&&typeof O=="object"){let oe=!1;for(let Xe of er)Number.isFinite(O[Xe])&&(Tn[Xe]+=O[Xe],Jo=!0,oe=!0);oe&&(ws+=1,Number.isFinite(O.total_cost_usd)&&(ea+=O.total_cost_usd,ta+=1))}}ws>0&&ta===ws&&(Tn.total_cost_usd=ea);let ra=Gr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Sc=ra.length>0?ht(jn(ra)):Jo?Nt(Tn):null;return{queue:p,idToTitle:Z,candidates:fc,candidate_hidden:{blocked:ms.hidden_blocked,spec:ms.hidden_spec},running:xn,live_count:Ko,slots:Xo,over_cap:wc,failure:zo,waiting:Fo(b.filter(g=>!hc.has(g.bead_id)),"queue"),pr_wait:Qe.map(g=>Wf(g.bead_id,Z.get(g.bead_id)||g.bead_id,Ze,d[g.bead_id]||null,It(p.attempts||{},g.bead_id),m[g.bead_id]||(j.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Sn.get(g.bead_id)||null,g.external===!0,{position:Ho.get(g.bead_id)||0,active:Yo.active===g.bead_id,failure:bc[g.bead_id]||null,resolution:Wo.get(g.bead_id),continuation_action:Go.get(g.bead_id)},g.wt_present!==!1,p.auto_merge===!0?Vo(g.bead_id):null,Lo($n,mc(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},bs.get(hs.get(g.bead_id)||"")?.worker_serial===!0)).map(g=>({...g,...Pe(g.id)})),merge_queue_length:ys.length,merge_queue_running:ys.length>0,auto_excluded:Qe.map(g=>g.bead_id).filter(g=>Vo(g)!==null),verify_cmd_present:!!(p.workspace_info||{}).verify_cmd,declared_base:$n,done:Gr,token_total:Sc,cleanup_failures:k,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function Be(p){let y=p.waiting.length>0?p.waiting[0].id:"\u2014",S=l`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,re=bt(p),ge=p.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",be=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${p.done.length}</b></span
      >`,pe=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,We=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${wn}
          step="1"
          .value=${String(p.slots)}
          ?disabled=${p.queue.pr_wait_holds_slot===!0}
          title=${p.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${p.queue.pr_wait_holds_slot===!0}
        />
        머지까지 순차 실행
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,Z=_l({failure:p.failure}),v=al(p.repo_operations,p.cleanup_failures);return A?l`<div class="worker-ribbon">
          ${S} ${re}
          <div class="worker-kpi worker-kpi--ribbon">${ge}${be}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${We}</div>
          <div class="worker-kpi">${pe}</div>
        </div>
        ${v}${Z}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${S}${re}${We}</div>
        <div class="worker-kpi">
          ${ge}${be}${pe}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(H=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${H.tooltip}
                >${I()} 완료 · 누적 ${H.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${v}${Z}`}function _t(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let y=p.running.some(S=>!S.paused&&S.failed!==!0);return l`<section
      class="worker-now${y?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?$o(p.running,Date.now(),he):""}
      ${p.pr_wait.map(S=>bo(S))}
    </section>`}function mt(p){let y=p.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${B.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Tf.map(S=>l`<button
              type="button"
              class="worker-filter__chip${B.spec===S.value?" is-active":""}"
              data-spec=${S.value}
              aria-pressed=${B.spec===S.value?"true":"false"}
            >
              ${S.label}
            </button>`)}
        ${y.spec>0?l`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function st(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${x}
    >
      ${Ef.map(p=>l`<option value=${p.value} ?selected=${x===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function at(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${G}
      >
        ${Ht.map(p=>l`<option value=${p.value} ?selected=${G===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function it(){if(ne.size===0)return"";let p=Array.from(ne),y=p.some(S=>{let re=ve.get(S);return re!==!0&&re!==!1});return l`<div
      class="worker-bulk"
      role="group"
      aria-label="실행 방식 일괄 변경"
    >
      <span class="worker-bulk__count">${p.length}개 선택</span>
      <select
        class="worker-bulk__mode"
        aria-label="실행 방식"
        .value=${Ae}
        ?disabled=${le}
      >
        <option value="ordinary">일반 병렬</option>
        <option value="serial">🔒 머지까지 단독</option>
      </select>
      <button
        type="button"
        class="worker-bulk__apply"
        ?disabled=${y||le}
        title=${y?"\uC120\uD0DD\uD55C \uC791\uC5C5\uC758 \uC2E4\uD589 \uBC29\uC2DD\uC744 \uD655\uC778\uD558\uB294 \uC911\uC785\uB2C8\uB2E4":le?"\uC2E4\uD589 \uBC29\uC2DD \uBCC0\uACBD \uC911\uC785\uB2C8\uB2E4":"\uC120\uD0DD\uD55C \uC791\uC5C5\uC5D0 \uC801\uC6A9"}
      >
        적용
      </button>
      <span class="worker-bulk__hint">선택한 대기 작업에만 적용됩니다</span>
    </div>`}function ct(p){let y=(p.queue.pr_wait||[]).filter(be=>be&&be.external!==!0&&typeof be.bead_id=="string"),S=new Set(p.running.filter(be=>!be.paused&&be.failed!==!0).map(be=>be.bead_id));for(let be of y)S.add(be.bead_id);let re=!(p.queue.pr_wait_holds_slot!==!0||p.queue.auto_advance!==!0||p.queue.auto_merge===!0||y.length===0||p.waiting.length===0||S.size<p.slots),ge=p.pr_wait.some(be=>be.worker_serial===!0);if(!(!re&&!(ge&&p.queue.auto_merge!==!0)))return l`${re?l`<div class="worker-stat worker-pr-wait-hint">
          PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
          꺼짐)
        </div>`:""}${ge&&p.queue.auto_merge!==!0?l`<div
          class="worker-stat worker-pr-wait-hint worker-pr-wait-hint--serial"
        >
          단독 실행 작업의 PR 머지·정리가 끝날 때까지 다음 작업이 시작되지
          않습니다 (자동 머지 꺼짐)
        </div>`:""}`}function bt(p){let y=p.queue.auto_merge===!0;if(p.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(y)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let S=new Set(p.auto_excluded),re=p.pr_wait.filter(ge=>ge.merge_action&&ge.merge_enabled&&!S.has(ge.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${p.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 verify \uC120\uC5B8\uC774 \uC5C6\uC5B4 \uCD94\uAC00 \uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${re>0?` ${re}`:""}
    </button>`}function q(p){let y=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:mt(p)});return A?l`<div class="worker-lanes worker-lanes--mobile">
        ${_t(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:l`${it()}${ct(p)}`,collapsible:!0,collapsed:L.queue,preview:Kl(p.waiting)})}
        ${y}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:at(),collapsible:!0,collapsed:L.done,preview:Array.isArray(p.token_total)?p.token_total.map(S=>S.label).join(" \xB7 "):p.token_total||Kl(p.done)})}
      </div>`:l`<div class="worker-lanes">
      ${y}
      ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:l`${it()}${ct(p)}`})}
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(S=>!S.paused&&S.failed!==!0),body:$o(p.running,Date.now(),he)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${p.done.length}`,items:p.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:at()})}
    </div>`}function Y(p){L={...L,[p]:!L[p]},Mf(L),K()}function K(){let p=tt();ze(Be(p),nt),ze(q(p),ye)}function _e(){let p=document.querySelector(".app-header");if(!p)return;let y=()=>{let S=Math.round(p.getBoundingClientRect().height);et.style.setProperty("--worker-ribbon-top",`${S}px`)};if(y(),typeof ResizeObserver=="function"){let S=new ResizeObserver(y);S.observe(p),$e.push(()=>S.disconnect())}else window.addEventListener("resize",y),$e.push(()=>window.removeEventListener("resize",y))}function we(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia(Of);A=!!p.matches;let y=S=>{let re=!!(S&&typeof S.matches=="boolean"?S.matches:p.matches);re!==A&&(A=re,K())};typeof p.addEventListener=="function"?(p.addEventListener("change",y),$e.push(()=>p.removeEventListener("change",y))):typeof p.addListener=="function"&&(p.addListener(y),$e.push(()=>p.removeListener(y)))}function Te(p){let y=p.target,S=y?.closest?.(".worker-mini__grip"),re=S?S.closest('.worker-mini[data-lane="queue"]'):y?.closest?.('.worker-card[draggable="true"]');if(!re)return;let ge=re.dataset.beadId||"",be=re.dataset.lane||"";$={bead_id:ge,from_lane:be};try{p.dataTransfer?.setData("text/plain",ge),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ve(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;let S=y.dataset.lane||"";S!=="candidate"&&S!=="queue"||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function ot(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Se(p,y){let S=E.find(pe=>pe.id===p);if(!S)return;let re=E.filter(pe=>pe.id!==p),ge=re.length;if(y){let pe=y.dataset.beadId;if(pe===p)return;let We=re.findIndex(Z=>Z.id===pe);We>=0&&(ge=We)}let be=re.slice();be.splice(ge,0,S),T.applyReorder(p,be,ge)}function Ke(p){let y=p.target?.closest?.(".worker-pane");if(!y)return;p.preventDefault(),y.classList.remove("worker-pane--drag-over");let S=y.dataset.lane||"",re=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",ge=$?.from_lane||"";if($=null,!re)return;let be=p.target?.closest?.(".worker-mini, .worker-card"),pe=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),We=pe.length;if(be){let Z=pe.indexOf(be);Z>=0&&(We=Z)}if(y.classList.contains("worker-pane--collapsed")&&(We=F()),S==="candidate"){if(ge==="candidate"){Se(re,be);return}ge==="queue"&&Ee(re);return}S==="queue"&&(ge==="queue"?Me(re,We):ce(re,We))}function ke(p){B=p,Sf(p),K()}function ut(p){x=p==="board"||p==="created"||p==="spec"?p:fs,Rf(x),K()}function vt(p){G=Rt(p)?p:At,Lf(G),_?.(G),K()}function Vt(p){let y=p.target?.closest?.(".worker-mini__select");if(y){let v=y.dataset.beadId||"";v&&(y.checked?ne.add(v):ne.delete(v),K());return}let S=p.target?.closest?.(".worker-bulk__mode");if(S){Ae=S.value==="serial"?"serial":"ordinary";return}let re=p.target?.closest?.(".worker-filter__blocked");if(re){ke({...B,show_blocked:re.checked});return}let ge=p.target?.closest?.(".worker-done-range");if(ge){vt(ge.value);return}let be=p.target?.closest?.(".worker-sort");if(be){ut(be.value||fs);return}let pe=p.target?.closest?.(".worker-pr-wait-hold");if(pe){Ne(pe.checked);return}let We=p.target?.closest?.(".worker-slots__input");if(!We)return;let Z=Number.parseInt(We.value,10);if(!Number.isFinite(Z)){K();return}Ie(Z).then(K)}function Bt(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function Ut(){let p=tt();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:u&&u()||""}}function gt(){he&&W.close(),me.hidden=!1,De.hidden=!1,V.open(Ut()),K()}function xt(p){let y=de(),S=y.attempts?y.attempts[p]:null;he=p,V.close(),me.hidden=!0,De.hidden=!1,W.open({attempt_id:p,meta:Bt(S)}),K()}function jt(){if(V.isOpen()&&V.refresh(Ut()),!he)return;let p=de(),y=p.attempts?p.attempts[he]:null;if(y){W.updateMeta(Bt(y));return}W.close()}function Ot(p){let y=p.target,S=y?.closest?.(".worker-bulk__apply");if(S){S.disabled||He();return}if(y?.closest?.(".worker-mini__select, .worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-exec-defaults-dialog"))return;if(y?.closest?.(".worker-exec-defaults-btn")){Le.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){gt();return}let re=y?.closest?.(".worker-repo-op__session");if(re){let X=re.dataset.attemptId;X&&xt(X);return}let ge=y?.closest?.(".worker-repo-op__resolve");if(ge){ue(ge.dataset.operationId||"");return}let be=y?.closest?.(".worker-repo-op__dismiss");if(be){ae(be.dataset.operationId||"");return}let pe=y?.closest?.(".worker-cleanup__resume");if(pe){let X=pe.dataset.beadId;X&&M(X);return}let We=y?.closest?.(".worker-banner__resume");if(We){let X=We.dataset.attemptId;X&&Ce(X);return}let Z=y?.closest?.(".worker-banner__discard");if(Z){let X=Z.dataset.confirmation==="merged"?"merged":"unmerged";w(Z.dataset.beadId||"",Z.dataset.attemptId||null,X,Z.dataset.operationId||null);return}let v=y?.closest?.(".worker-banner__dismiss");if(v){let X=v.dataset.attemptId;X&&Re(X);return}if(y?.closest?.(".worker-play")){z(!de().auto_advance);return}let H=y?.closest?.(".worker-merge-all");if(H){H.classList.contains("worker-merge-all--stop")?de().auto_merge===!0?P(!1):fe():P(!0);return}let se=y?.closest?.(".worker-pane__hd--toggle");if(se){let X=se.dataset.lane;(X==="queue"||X==="done")&&Y(X);return}let Pe=y?.closest?.(".worker-card__place");if(Pe){let X=Pe.dataset.beadId;X&&!Pe.disabled&&ce(X,F());return}let Qe=y?.closest?.(".worker-filter__chip");if(Qe){let X=Qe.dataset.spec;(X==="all"||X==="with"||X==="without")&&ke({...B,spec:X});return}let Ze=y?.closest?.(".worker-mini__merge");if(Ze){M(Ze.dataset.beadId||"");return}let m=y?.closest?.(".worker-mini__merge-cancel");if(m){Q(m.dataset.beadId||"");return}let d=y?.closest?.(".worker-mini__discard");if(d){w(d.dataset.beadId||"",d.dataset.attemptId||null,d.dataset.discardMode==="merged"?"merged":"unmerged",d.dataset.operationId||null);return}let k=y?.closest?.(".worker-mini__revise-fix");if(k){C("worker-revise-fix",k.dataset.beadId||"");return}let b=y?.closest?.(".worker-mini__revise-approve");if(b){C("worker-revise-approve",b.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let X=y?.closest?.(".rtile"),Ue=X?.dataset?.beadId,qe=X?.dataset?.attemptId;Ue&&w(Ue,qe||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let Ue=y?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Re(Ue);return}if(y?.closest?.(".rtile__pause")){let Ue=y?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Oe(Ue);return}if(y?.closest?.(".rtile__resume")){let Ue=y?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Ce(Ue);return}if(y?.closest?.(".rtile__session")){let Ue=y?.closest?.(".rtile")?.dataset?.attemptId;Ue&&xt(Ue);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){V.close(),W.close();return}if(y?.closest?.(".worker-drawer-host"))return;let D=y?.closest?.(".rtile");if(D){if(y?.closest?.(".rtile__id")){let Ue=D.dataset.beadId;Ue&&Sr(Ue).then(qe=>{qe?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let X=D.dataset.beadId;X&&c&&c(X);return}let te=y?.closest?.(".worker-mini, .worker-card");if(te){let X=te.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){X&&Sr(X).then(Ue=>{Ue?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}X&&c&&c(X)}}return e.addEventListener("dragstart",Te),e.addEventListener("dragover",Ve),e.addEventListener("dragleave",ot),e.addEventListener("drop",Ke),e.addEventListener("click",Ot),e.addEventListener("change",Vt),we(),_e(),h&&$e.push(h.subscribe(()=>{for(let[p,y]of ee)y==="failed"&&ee.delete(p);K()})),s&&$e.push(s.subscribe(()=>{K(),jt()})),K(),{load(){K()},openExecDefaults(){Le.open()},destroy(){for(let p of $e.splice(0))try{p()}catch{}e.removeEventListener("dragstart",Te),e.removeEventListener("dragover",Ve),e.removeEventListener("dragleave",ot),e.removeEventListener("drop",Ke),e.removeEventListener("click",Ot),e.removeEventListener("change",Vt);try{W.destroy()}catch{}De.hidden=!0;try{Le.destroy()}catch{}ze(l``,e)}}}function Do(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function tc(e,t,r,n=async()=>{},s=async()=>{}){let o=lt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function f(A){let N=A.target.value,Ae=t.getState().workspace?.current?.path||"";if(N&&N!==Ae){o("switching workspace to %s",N),i=!0,L();try{await r(N)}catch(le){o("workspace switch failed: %o",le)}finally{i=!1,L()}}}async function _(){let A=t.getState(),j=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!j||c)){o("git-pulling workspace %s",j),c=!0,L();try{await n(j)}catch(N){o("workspace git pull failed: %o",N)}finally{c=!1,L()}}}function h(A){let j=A.target;j&&e.contains(j)||E()}function T(A){A.key==="Escape"&&E()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),L())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),L())}function B(){u?E():$()}async function x(A){let j=A.target,N=j.value,ne=j.checked;o("toggling visibility %s \u2192 %s",N,String(ne));try{await s(N,ne)}catch(Ae){o("workspace visibility toggle failed: %o",Ae)}}function G(A){return A?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function ee(A,j){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${A.map(N=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!j.has(N.path)}
                        @change=${x}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Do(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function I(){let A=t.getState(),j=A.workspace?.current,N=A.workspace?.available||[],ne=new Set(A.workspace?.hidden||[]),Ae=j?.path||N[0]?.path||"";if(N.length===0)return l``;let le=N.filter(ve=>!ne.has(ve.path)||ve.path===Ae);if(le.length<=1){let ve=le[0]||N[0],$e=Do(ve.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ve.path}"
            >${$e}</span
          >
          ${ee(N,ne)}
          ${G(Ae)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${le.map(ve=>l`
              <option
                value="${ve.path}"
                ?selected=${ve.path===Ae}
                title="${ve.path}"
              >
                ${Do(ve.path)}
              </option>
            `)}
        </select>
        ${ee(N,ne)}
        ${G(Ae)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function L(){ze(I(),e)}return L(),a=t.subscribe(()=>L()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),ze(l``,e)}}}var rc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Mo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function nc(e,t,r=Mo()){return{id:r,type:e,payload:t}}function sc(e={}){let t=lt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,f=[],_=new Map,h=new Set;function T(I){for(let L of Array.from(h))try{L(I)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let I=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),L=(r.jitterRatio||0)*I,A=Math.max(0,Math.round(I+(Math.random()*2-1)*L));t("ws retry in %d ms (attempt %d)",A,a+1),i=setTimeout(()=>{i=null,ee()},A)}function E(I){try{s?.send(JSON.stringify(I))}catch(L){t("ws send failed",L)}}function B(){for(o="open",t("ws open"),T(o),a=0;f.length;){let I=f.shift();I&&E(I)}}function x(I){let L;try{L=JSON.parse(String(I.data))}catch{t("ws received non-JSON message");return}if(!L||typeof L.id!="string"||typeof L.type!="string"){t("ws received invalid envelope");return}if(u.has(L.id)){let j=u.get(L.id);u.delete(L.id),L.ok?j?.resolve(L.payload):j?.reject(L.error||new Error("ws error"));return}let A=_.get(L.type);if(A&&A.size>0)for(let j of Array.from(A))try{j(L.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",L.type)}function G(){o="closed",t("ws closed"),T(o);for(let[I,L]of u.entries())L.reject(new Error("ws disconnected")),u.delete(I);a+=1,$()}function ee(){if(!c)return;let I=n();try{s=new WebSocket(I),t("ws connecting %s",I),o="connecting",T(o),s.addEventListener("open",B),s.addEventListener("message",x),s.addEventListener("error",()=>{}),s.addEventListener("close",G)}catch(L){t("ws connect failed %o",L),$()}}return ee(),{send(I,L){if(!rc.includes(I))return Promise.reject(new Error(`unknown message type: ${I}`));let A=Mo(),j=nc(I,L,A);return t("send %s id=%s",I,A),new Promise((N,ne)=>{u.set(A,{resolve:N,reject:ne,type:I}),s&&s.readyState===s.OPEN?E(j):(t("queue %s id=%s (state=%s)",I,A,o),f.push(j))})},on(I,L){_.has(I)||_.set(I,new Set);let A=_.get(I);return A?.add(L),()=>{A?.delete(L)}},onConnection(I){return h.add(I),()=>{h.delete(I)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,ee()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Gf(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Yf(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var No=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],oc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],gr="tab:worker:closed",Vf="bdui.worker.done-range",ac=Il,ic="worker:queue",lc="ui:order",cc="ui:display-policy",dc="exec:presets",hr="tab:board:closed",uc="beads-ui.board.closed-range";function Kf(e){let t=lt("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ze(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Bl(s),o&&a&&i&&c){let xe=function(m,d){let k="Request failed",b="";if(m&&typeof m=="object"){let te=m;if(typeof te.message=="string"&&te.message.length>0&&(k=te.message),typeof te.details=="string")b=te.details;else if(te.details&&typeof te.details=="object")try{b=JSON.stringify(te.details,null,2)}catch{b=""}}else typeof m=="string"&&m.length>0&&(k=m);let D=d&&d.length>0?`Failed to load ${d}`:"Request failed";Fe.open(D,k,b)},M=function(m){return`${S.getState().workspace.current?.path||""}\0${m}`},U=function(){ce&&(ce().catch(()=>{}),ce=null),Me=null,Ee=null},Q=function(m){He=m;let d=()=>{He!==m||S.getState().selected_id!==m||(He=null,P(m))};if(!Re){Ce.then(d);return}d()},z=function(m,d,k,b,D){return k!==C[d]?(D().catch(()=>{}),!1):(m.set(b,D),!0)},ue=function(){let m=S.getState();Be(m.view==="board"),ct(m.view==="worker"),_e(m.view==="monitor"),q(m.view==="board"||m.view==="worker"||!!m.selected_id)},Ne=function(){let m=kr(ae);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},tt=function(){let m=kr(Ie);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Be=function(m){if(m)for(let[d,k]of No){if(fe.has(d)||w.has(d))continue;let b=d===hr?Ne():{type:k};try{W.register(d,b)}catch(X){t("register %s store failed: %o",d,X)}w.add(d);let D=C.board,te=!1;he.subscribeList(d,b).then(X=>{te=!z(fe,"board",D,d,X)}).catch(X=>{t("subscribe %s failed: %o",d,X),xe(X,"board")}).finally(()=>{w.delete(d),te&&ue()})}else st()},st=function(){C.board+=1;for(let[m]of No){let d=fe.get(m);d&&(d().catch(()=>{}),fe.delete(m));try{W.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},ct=function(m){if(!m){bt();return}for(let[d,k]of oc){if(at.has(d)||w.has(d))continue;let b=d===gr?tt():{type:k};try{W.register(d,b)}catch(X){t("register %s store failed: %o",d,X)}w.add(d);let D=C.worker,te=!1;he.subscribeList(d,b).then(X=>{te=!z(at,"worker",D,d,X)}).catch(X=>{t("subscribe %s failed: %o",d,X),xe(X,"worker")}).finally(()=>{w.delete(d),te&&ue()})}},bt=function(){C.worker+=1;for(let[m]of oc){let d=at.get(m);d&&(d().catch(()=>{}),at.delete(m));try{W.unregister(m)}catch(k){t("unregister %s failed: %o",m,k)}}},q=function(m){if(!m){Y();return}it||(ye("subscribe-worker-queue",{id:ic}).catch(d=>{t("subscribe-worker-queue failed: %o",d)}),it=()=>ye("unsubscribe-worker-queue",{id:ic}))},Y=function(){it&&(it().catch(()=>{}),it=null)},_e=function(m){if(!m){we();return}K||(ye("subscribe-monitor-pipeline",{id:ac}).catch(d=>{t("subscribe-monitor-pipeline failed: %o",d)}),K=()=>ye("unsubscribe-monitor-pipeline",{id:ac}))},we=function(){K&&(K().catch(()=>{}),K=null)},Ve=function(){Te||(ye("subscribe-ui-order",{id:lc}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Te=()=>ye("unsubscribe-ui-order",{id:lc}))},ot=function(){Te&&(Te().catch(()=>{}),Te=null),de.clear()},Ke=function(){Se||(ye("subscribe-display-policy",{id:cc}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),Se=()=>ye("unsubscribe-display-policy",{id:cc}))},ke=function(){Se&&(Se().catch(()=>{}),Se=null),ie.clear()},vt=function(){ut||(ye("subscribe-exec-presets",{id:dc}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),ut=()=>ye("unsubscribe-exec-presets",{id:dc}))},jt=function(m){if(!m)return"Unknown";let d=m.split("/").filter(Boolean);return d.length>0?d[d.length-1]:"Unknown"};var u=xe,f=M,_=U,h=Q,T=z,$=ue,E=Ne,B=tt,x=Be,G=st,ee=ct,I=bt,L=q,A=Y,j=_e,N=we,ne=Ve,Ae=ot,le=Ke,ve=ke,$e=vt,et=jt;let nt=document.getElementById("header-loading"),De=Fa(nt),Fe=ol(e),me=sc(),ye=De.wrapSend((m,d)=>me.send(m,d)),he=Ia(ye),W=La(),V=Da(),Le=ga(),de=Oa(),ie=_a(),R=ma(),F=ha();me.on("exec-presets-snapshot",m=>{let d=m;d&&typeof d.revision=="number"&&Array.isArray(d.presets)&&R.set({revision:d.revision,presets:d.presets})}),me.on("monitor-pipeline-snapshot",m=>{let d=m;if(!(!d||!Array.isArray(d.workspaces)))try{Le.set(d.workspaces,d.workspaces_state)}catch{}}),me.on("ui-order-snapshot",m=>{let d=m;if(d&&typeof d.revision=="number")try{de.set({revision:d.revision,order:d.order&&typeof d.order=="object"?d.order:{}})}catch{}}),me.on("display-policy-snapshot",m=>{let d=m;if(d&&d.policy&&typeof d.policy=="object")try{ie.set(d.policy)}catch{}}),me.on("session-log-snapshot",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{F.set(d.attempt_id,Array.isArray(d.lines)?d.lines:[],typeof d.last_event_at=="number"?d.last_event_at:null)}catch{}}),me.on("session-log-append",m=>{let d=m;if(d&&typeof d.attempt_id=="string")try{F.append(d.attempt_id,d.event)}catch{}}),me.on("snapshot",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",b=k?W.getStore(k):null;if(b&&d&&d.type==="snapshot")try{b.applyPush(d)}catch{}}),me.on("upsert",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",b=k?W.getStore(k):null;if(b&&d&&d.type==="upsert")try{b.applyPush(d)}catch{}}),me.on("delete",m=>{let d=m,k=d&&typeof d.id=="string"?d.id:"",b=k?W.getStore(k):null;if(b&&d&&d.type==="delete")try{b.applyPush(d)}catch{}});let ce=null,Me=null,Ee=null,He=null,Oe=()=>{},Ce=new Promise(m=>{Oe=()=>m(void 0)}),Re=!1,Ye=!1;async function P(m){let d=M(m);if(d===Me||d===Ee)return;Ee=d;let k=`detail:${m}`,b={type:"issue-detail",params:{id:m}};try{W.register(k,b)}catch(D){t("register detail store failed: %o",D)}try{let D=await he.subscribeList(k,b);if(S.getState().selected_id!==m||M(m)!==d){await D().catch(()=>{});return}ce&&await ce().catch(()=>{}),ce=D,Me=d}catch(D){t("detail subscribe failed: %o",D),xe(D,"issue details")}finally{Ee===d&&(Ee=null)}}let fe=new Map,w=new Set,C={board:0,worker:0},ae=At;try{let m=window.localStorage.getItem(uc);Rt(m)&&(ae=m)}catch{}let Ie=At;try{let m=window.localStorage.getItem(Vf);Rt(m)&&(Ie=m)}catch{}async function _t(m){if(!Rt(m)||m===ae)return;ae=m;try{window.localStorage.setItem(uc,m)}catch{}let d=fe.get(hr);if(!d)return;fe.delete(hr),await d().catch(()=>{});let k=Ne();try{W.register(hr,k)}catch(b){t("register %s store failed: %o",hr,b)}try{let b=await he.subscribeList(hr,k);fe.set(hr,b)}catch(b){t("re-subscribe %s failed: %o",hr,b),xe(b,"board")}}async function mt(m){if(!Rt(m)||m===Ie)return;Ie=m;let d=at.get(gr);if(!d)return;at.delete(gr),await d().catch(()=>{});let k=tt();try{W.register(gr,k)}catch(b){t("register %s store failed: %o",gr,b)}try{let b=await he.subscribeList(gr,k);at.set(gr,b)}catch(b){t("re-subscribe %s failed: %o",gr,b),xe(b,"worker")}}let at=new Map,it=null,K=null,Te=null,Se=null,ut=null;async function Vt(){Se=null,ie.clear(),ut=null,R.clear(),it=null,K=null,fe.clear(),at.clear(),C.board+=1,C.worker+=1,vt();let m=S.getState().workspace.current?.path;if(m)try{await me.send("set-workspace",{path:m})}catch(k){t("workspace restore after reconnect failed: %o",k);return}Ke();let d=S.getState();Be(d.view==="board"),ct(d.view==="worker"),_e(d.view==="monitor"),q(d.view==="board"||d.view==="worker"||!!d.selected_id)}async function Bt(){t("clearing all subscriptions for workspace switch"),st(),bt(),Y(),V.clear(),ot(),Ve(),ke(),Ke(),U();let m=S.getState();if(m.selected_id)try{W.unregister(`detail:${m.selected_id}`)}catch{}let d=S.getState();Be(d.view==="board"),ct(d.view==="worker"),_e(d.view==="monitor"),q(d.view==="board"||d.view==="worker"||!!d.selected_id),d.selected_id&&Q(d.selected_id)}async function Ut(m){t("requesting workspace switch to %s",m),Ye=!0;try{let d=await me.send("set-workspace",{path:m});t("workspace switch result: %o",d),d&&d.workspace&&(S.setState({workspace:{current:{path:d.workspace.root_dir,database:d.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),d.changed&&(await Bt(),J("Switched to "+jt(m),"success",2e3)))}catch(d){throw t("workspace switch failed: %o",d),J("Failed to switch workspace","error",3e3),d}finally{Ye=!1}}async function gt(m){t("requesting workspace git pull for %s",m);try{let d=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",d);let k=d?.status;if(k==="up_to_date"){J("Already up to date","success",2e3);return}if(k==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+jt(m),"success",2e3)}catch(d){t("workspace git pull failed: %o",d);let k=d?.code,b=d?.message;if(k==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(k==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(k==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let D=b?`: ${b}`:"";throw J(`Git pull failed${D}`,"error",3e3),d}}async function xt(m,d){t("setting workspace visibility %s \u2192 %s",m,String(d));try{await me.send("set-workspace-visibility",{path:m,visible:d}),await Ot()}catch(k){t("workspace visibility update failed: %o",k),J("Failed to update project visibility","error",3e3)}}async function Ot(){try{let m=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let d=m.workspaces.map(te=>({path:te.path,database:te.database,pid:te.pid,version:te.version})),k=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,b=Array.isArray(m.hidden)?m.hidden.filter(te=>typeof te=="string"):[];S.setState({workspace:{current:k,available:d,hidden:b}});let D=window.localStorage.getItem("beads-ui.workspace");D&&(!d.some(X=>X.path===D)||b.includes(D)?window.localStorage.removeItem("beads-ui.workspace"):k&&D!==k.path&&(t("restoring saved workspace preference: %s",D),await Ut(D)))}}catch(m){t("failed to load workspaces: %o",m)}}me.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(S.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Ot(),Bt())});let p=!1;if(typeof me.onConnection=="function"){let m=d=>{t("ws state %s",d),d==="reconnecting"||d==="closed"?(p=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):d==="open"&&p&&(p=!1,J("Reconnected","success",2200),Yf(S,(k,b)=>{t(`${k}: %o`,b)}),Vt())};me.onConnection(m)}let y="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(y=m)}catch(m){t("view parse error: %o",m)}let S=Pa({config:Gf(),view:y});me.on("worker-queue-snapshot",m=>{let d=m;if(!d||!d.queue)return;let k=S.getState().workspace.current?.path;if(typeof k=="string"&&k.length>0&&d.root_dir!==k){t("dropping worker-queue snapshot for %s",String(d.root_dir));return}try{V.set(d.queue)}catch{}});let re=Ma(S);re.start();let ge=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),be=async(m,d)=>{try{return await ye(m,d)}catch(k){if(ge.has(m))throw k;return[]}};n&&Ol(n,S,re);let pe=document.getElementById("workspace-picker");pe&&tc(pe,S,Ut,gt,xt);let We=Pl(e,(m,d)=>ye(m,d));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>We.open())}catch{}let Z=sl(e,{policyStore:ie,transport:(m,d)=>ye(m,d),labelOptions:()=>{let m=new Set;for(let[d]of No)for(let k of W.snapshotFor(d)||[]){let b=k.labels;if(Array.isArray(b))for(let D of b)typeof D=="string"&&D.length>0&&m.add(D)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>Z.open())}catch{}let v=Ya(o,{gotoIssue:m=>re.gotoIssue(m),issueStores:W,transport:be,workerQueueStore:V,uiOrderStore:de,displayPolicyStore:ie,closedRange:ae,onClosedRangeChange:m=>{_t(m)},onNewIssue:()=>We.open()}),H=Oo(a,{transport:be,issueStores:W,queueStore:V,execPresetStore:R,sessionLogStore:F,uiOrderStore:de,gotoIssue:m=>S.setState({selected_id:m}),getWorkspacePath:()=>S.getState().workspace.current?.path,doneRange:Ie,onDoneRangeChange:m=>{mt(m)}}),se=Ll(i,{transport:be,pipelineStore:Le,execPresetStore:R,gotoIssue:m=>re.gotoIssue(m),getWorkspacePath:()=>S.getState().workspace.current?.path,switchWorkspace:m=>Ut(m)}),Pe=rl(c,{issueStores:W,transport:be,queueStore:V,execPresetStore:R,sessionLogStore:F,getWorkspacePath:()=>S.getState().workspace.current?.path,onNavigate:m=>{S.getState().view==="worker"?S.setState({selected_id:m}):re.gotoIssue(m)},onClose:()=>{let m=S.getState();S.setState({selected_id:null});try{re.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{S.setState({selected_id:null}),re.gotoView("worker"),H.openExecDefaults()}}),Qe=S.getState().selected_id;Qe&&(c.hidden=!1,Pe.load(Qe),Q(Qe)),S.subscribe(m=>{let d=m.selected_id;d?(c.hidden=!1,Pe.load(d),Ye||Q(d)):(Pe.clear(),c.hidden=!0,U())});let Ze=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",Be(m.view==="board"),ct(m.view==="worker"),_e(m.view==="monitor"),q(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&v.load(),m.view==="worker"&&H.load(),m.view==="monitor"?se.load():se.pause(),window.localStorage.setItem("beads-ui.view",m.view)};S.subscribe(Ze),Ze(S.getState()),Ve(),Ke(),vt(),Ot().finally(()=>{Re=!0,Oe()}),window.addEventListener("keydown",m=>{let d=m.ctrlKey||m.metaKey,k=String(m.key||"").toLowerCase(),b=m.target,D=b&&b.tagName?String(b.tagName).toLowerCase():"",te=D==="input"||D==="textarea"||D==="select"||b&&typeof b.isContentEditable=="boolean"&&b.isContentEditable;d&&k==="n"&&(te||(m.preventDefault(),We.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Kf(t)});export{Kf as bootstrap,Gf as readBootstrapConfig,Yf as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
