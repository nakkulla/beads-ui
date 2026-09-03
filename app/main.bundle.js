var N_=Object.create;var ua=Object.defineProperty;var j_=Object.getOwnPropertyDescriptor;var F_=Object.getOwnPropertyNames;var B_=Object.getPrototypeOf,U_=Object.prototype.hasOwnProperty;var W_=(e,t,n)=>t in e?ua(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var da=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var z_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of F_(t))!U_.call(e,o)&&o!==n&&ua(e,o,{get:()=>t[o],enumerable:!(r=j_(t,o))||r.enumerable});return e};var H_=(e,t,n)=>(n=e!=null?N_(B_(e)):{},z_(t||!e||!e.__esModule?ua(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>W_(e,typeof t!="symbol"?t+"":t,n);var bc=da((bw,hc)=>{var Qr=1e3,Xr=Qr*60,Zr=Xr*60,Lr=Zr*24,Y_=Lr*7,V_=Lr*365.25;hc.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return Q_(e);if(n==="number"&&isFinite(e))return t.long?Z_(e):X_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Q_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*V_;case"weeks":case"week":case"w":return n*Y_;case"days":case"day":case"d":return n*Lr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Zr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Xr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Qr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function X_(e){var t=Math.abs(e);return t>=Lr?Math.round(e/Lr)+"d":t>=Zr?Math.round(e/Zr)+"h":t>=Xr?Math.round(e/Xr)+"m":t>=Qr?Math.round(e/Qr)+"s":e+"ms"}function Z_(e){var t=Math.abs(e);return t>=Lr?Os(e,t,Lr,"day"):t>=Zr?Os(e,t,Zr,"hour"):t>=Xr?Os(e,t,Xr,"minute"):t>=Qr?Os(e,t,Qr,"second"):e+" ms"}function Os(e,t,n,r){var o=t>=n*1.5;return Math.round(e/n)+" "+r+(o?"s":"")}});var vc=da((yw,yc)=>{function J_(e){n.debug=n,n.default=n,n.coerce=a,n.disable=s,n.enable=o,n.enabled=l,n.humanize=bc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let f=0;for(let m=0;m<d.length;m++)f=(f<<5)-f+d.charCodeAt(m),f|=0;return n.colors[Math.abs(f)%n.colors.length]}n.selectColor=t;function n(d){let f,m=null,_,w;function R(...I){if(!R.enabled)return;let U=R,ie=Number(new Date),z=ie-(f||ie);U.diff=z,U.prev=f,U.curr=ie,f=ie,I[0]=n.coerce(I[0]),typeof I[0]!="string"&&I.unshift("%O");let j=0;I[0]=I[0].replace(/%([a-zA-Z%])/g,(q,W)=>{if(q==="%%")return"%";j++;let Y=n.formatters[W];if(typeof Y=="function"){let N=I[j];q=Y.call(U,N),I.splice(j,1),j--}return q}),n.formatArgs.call(U,I),(U.log||n.log).apply(U,I)}return R.namespace=d,R.useColors=n.useColors(),R.color=n.selectColor(d),R.extend=r,R.destroy=n.destroy,Object.defineProperty(R,"enabled",{enumerable:!0,configurable:!1,get:()=>m!==null?m:(_!==n.namespaces&&(_=n.namespaces,w=n.enabled(d)),w),set:I=>{m=I}}),typeof n.init=="function"&&n.init(R),R}function r(d,f){let m=n(this.namespace+(typeof f>"u"?":":f)+d);return m.log=this.log,m}function o(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let f=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let m of f)m[0]==="-"?n.skips.push(m.slice(1)):n.names.push(m)}function i(d,f){let m=0,_=0,w=-1,R=0;for(;m<d.length;)if(_<f.length&&(f[_]===d[m]||f[_]==="*"))f[_]==="*"?(w=_,R=m,_++):(m++,_++);else if(w!==-1)_=w+1,R++,m=R;else return!1;for(;_<f.length&&f[_]==="*";)_++;return _===f.length}function s(){let d=[...n.names,...n.skips.map(f=>"-"+f)].join(",");return n.enable(""),d}function l(d){for(let f of n.skips)if(i(d,f))return!1;for(let f of n.names)if(i(d,f))return!0;return!1}function a(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}yc.exports=J_});var kc=da((wn,Is)=>{wn.formatArgs=tm;wn.save=nm;wn.load=rm;wn.useColors=em;wn.storage=om();wn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();wn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function em(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function tm(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Is.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,o=>{o!=="%%"&&(n++,o==="%c"&&(r=n))}),e.splice(r,0,t)}wn.log=console.debug||console.log||(()=>{});function nm(e){try{e?wn.storage.setItem("debug",e):wn.storage.removeItem("debug")}catch{}}function rm(){let e;try{e=wn.storage.getItem("debug")||wn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function om(){try{return localStorage}catch{}}Is.exports=vc()(wn);var{formatters:sm}=Is.exports;sm.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var So=globalThis,xs=So.trustedTypes,tc=xs?xs.createPolicy("lit-html",{createHTML:e=>e}):void 0,fa="$lit$",Xn=`lit$${Math.random().toFixed(9).slice(2)}$`,_a="?"+Xn,K_=`<${_a}>`,Cr=document,Eo=()=>Cr.createComment(""),To=e=>e===null||typeof e!="object"&&typeof e!="function",ma=Array.isArray,ac=e=>ma(e)||typeof e?.[Symbol.iterator]=="function",pa=`[ 	
\f\r]`,Ao=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nc=/-->/g,rc=/>/g,Er=RegExp(`>|${pa}(?:([^\\s"'>=/]+)(${pa}*=${pa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oc=/'/g,sc=/"/g,lc=/^(?:script|style|textarea|title)$/i,ga=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ga(1),Ro=ga(2),dw=ga(3),Tn=Symbol.for("lit-noChange"),Ht=Symbol.for("lit-nothing"),ic=new WeakMap,Tr=Cr.createTreeWalker(Cr,129);function cc(e,t){if(!ma(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return tc!==void 0?tc.createHTML(t):t}var uc=(e,t)=>{let n=e.length-1,r=[],o,i=t===2?"<svg>":t===3?"<math>":"",s=Ao;for(let l=0;l<n;l++){let a=e[l],u,d,f=-1,m=0;for(;m<a.length&&(s.lastIndex=m,d=s.exec(a),d!==null);)m=s.lastIndex,s===Ao?d[1]==="!--"?s=nc:d[1]!==void 0?s=rc:d[2]!==void 0?(lc.test(d[2])&&(o=RegExp("</"+d[2],"g")),s=Er):d[3]!==void 0&&(s=Er):s===Er?d[0]===">"?(s=o??Ao,f=-1):d[1]===void 0?f=-2:(f=s.lastIndex-d[2].length,u=d[1],s=d[3]===void 0?Er:d[3]==='"'?sc:oc):s===sc||s===oc?s=Er:s===nc||s===rc?s=Ao:(s=Er,o=void 0);let _=s===Er&&e[l+1].startsWith("/>")?" ":"";i+=s===Ao?a+K_:f>=0?(r.push(u),a.slice(0,f)+fa+a.slice(f)+Xn+_):a+Xn+(f===-2?l:_)}return[cc(e,i+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Co=class e{constructor({strings:t,_$litType$:n},r){let o;this.parts=[];let i=0,s=0,l=t.length-1,a=this.parts,[u,d]=uc(t,n);if(this.el=e.createElement(u,r),Tr.currentNode=this.el.content,n===2||n===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(o=Tr.nextNode())!==null&&a.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let f of o.getAttributeNames())if(f.endsWith(fa)){let m=d[s++],_=o.getAttribute(f).split(Xn),w=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:w[2],strings:_,ctor:w[1]==="."?Ss:w[1]==="?"?Es:w[1]==="@"?Ts:Or}),o.removeAttribute(f)}else f.startsWith(Xn)&&(a.push({type:6,index:i}),o.removeAttribute(f));if(lc.test(o.tagName)){let f=o.textContent.split(Xn),m=f.length-1;if(m>0){o.textContent=xs?xs.emptyScript:"";for(let _=0;_<m;_++)o.append(f[_],Eo()),Tr.nextNode(),a.push({type:2,index:++i});o.append(f[m],Eo())}}}else if(o.nodeType===8)if(o.data===_a)a.push({type:2,index:i});else{let f=-1;for(;(f=o.data.indexOf(Xn,f+1))!==-1;)a.push({type:7,index:i}),f+=Xn.length-1}i++}}static createElement(t,n){let r=Cr.createElement("template");return r.innerHTML=t,r}};function Rr(e,t,n=e,r){if(t===Tn)return t;let o=r!==void 0?n._$Co?.[r]:n._$Cl,i=To(t)?void 0:t._$litDirective$;return o?.constructor!==i&&(o?._$AO?.(!1),i===void 0?o=void 0:(o=new i(e),o._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=o:n._$Cl=o),o!==void 0&&(t=Rr(e,o._$AS(e,t.values),o,r)),t}var As=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,o=(t?.creationScope??Cr).importNode(n,!0);Tr.currentNode=o;let i=Tr.nextNode(),s=0,l=0,a=r[0];for(;a!==void 0;){if(s===a.index){let u;a.type===2?u=new Yr(i,i.nextSibling,this,t):a.type===1?u=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(u=new Cs(i,this,t)),this._$AV.push(u),a=r[++l]}s!==a?.index&&(i=Tr.nextNode(),s++)}return Tr.currentNode=Cr,o}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Yr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,o){this.type=2,this._$AH=Ht,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=Rr(this,t,n),To(t)?t===Ht||t==null||t===""?(this._$AH!==Ht&&this._$AR(),this._$AH=Ht):t!==this._$AH&&t!==Tn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ac(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ht&&To(this._$AH)?this._$AA.nextSibling.data=t:this.T(Cr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,o=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Co.createElement(cc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===o)this._$AH.p(n);else{let i=new As(o,this),s=i.u(this.options);i.p(n),this.T(s),this._$AH=i}}_$AC(t){let n=ic.get(t.strings);return n===void 0&&ic.set(t.strings,n=new Co(t)),n}k(t){ma(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,o=0;for(let i of t)o===n.length?n.push(r=new e(this.O(Eo()),this.O(Eo()),this,this.options)):r=n[o],r._$AI(i),o++;o<n.length&&(this._$AR(r&&r._$AB.nextSibling,o),n.length=o)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,o,i){this.type=1,this._$AH=Ht,this._$AN=void 0,this.element=t,this.name=n,this._$AM=o,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Ht}_$AI(t,n=this,r,o){let i=this.strings,s=!1;if(i===void 0)t=Rr(this,t,n,0),s=!To(t)||t!==this._$AH&&t!==Tn,s&&(this._$AH=t);else{let l=t,a,u;for(t=i[0],a=0;a<i.length-1;a++)u=Rr(this,l[r+a],n,a),u===Tn&&(u=this._$AH[a]),s||(s=!To(u)||u!==this._$AH[a]),u===Ht?t=Ht:t!==Ht&&(t+=(u??"")+i[a+1]),this._$AH[a]=u}s&&!o&&this.j(t)}j(t){t===Ht?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ss=class extends Or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ht?void 0:t}},Es=class extends Or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ht)}},Ts=class extends Or{constructor(t,n,r,o,i){super(t,n,r,o,i),this.type=5}_$AI(t,n=this){if((t=Rr(this,t,n,0)??Ht)===Tn)return;let r=this._$AH,o=t===Ht&&r!==Ht||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==Ht&&(r===Ht||o);o&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Cs=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Rr(this,t)}},dc={M:fa,P:Xn,A:_a,C:1,L:uc,R:As,D:ac,V:Rr,I:Yr,H:Or,N:Es,U:Ts,B:Ss,F:Cs},G_=So.litHtmlPolyfillSupport;G_?.(Co,Yr),(So.litHtmlVersions??(So.litHtmlVersions=[])).push("3.3.1");var pt=(e,t,n)=>{let r=n?.renderBefore??t,o=r._$litPart$;if(o===void 0){let i=n?.renderBefore??null;r._$litPart$=o=new Yr(t.insertBefore(Eo(),i),i,void 0,n??{})}return o._$AI(e),o};var Rs="today",pc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Vr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function zn(e){return e==="today"?"today":"7d"}function ha(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ir(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function _c(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function mc(){let e=null,t=[],n,r=new Set;function o(){for(let i of Array.from(r))try{i()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(i,s,l){e=Array.isArray(i)?i:null,t=Array.isArray(s)?s:[],n=l===void 0?void 0:l!==null&&typeof l=="object"&&typeof l.revision=="number"&&Array.isArray(l.lanes)?{revision:l.revision,lanes:l.lanes}:null,o()},clear(){e=null,t=[],n=void 0,o()},subscribe(i){return r.add(i),()=>r.delete(i)}}}function gc(){let e=new Map,t=new Set;function n(o){return o.startsWith("session-log:")?o:`session-log:${o}`}function r(){for(let o of Array.from(t))try{o()}catch{}}return{set(o,i,s=null){e.set(n(o),{lines:Array.isArray(i)?[...i]:[],last_event_at:typeof s=="number"?s:null}),r()},append(o,i){let s=n(o),l=e.get(s)||{lines:[],last_event_at:null};l.lines=[...l.lines,i],l.last_event_at=Date.now(),e.set(s,l),r()},get(o){return e.get(n(o))||null},clear(o){typeof o=="string"?e.delete(n(o)):e.clear(),r()},subscribe(o){return t.add(o),()=>t.delete(o)}}}var wc=H_(kc(),1);function Bt(e){return(0,wc.default)(`beads-ui:${e}`)}function im(e){let n=$c((e&&typeof e=="object"?e:{}).spec_id);return n?{path:n,source:"native",conflict:!1}:{path:"",source:"none",conflict:!1}}function $c(e){return typeof e=="string"?e.trim():""}function am(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var lm=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Jr(e){let t=im(e),n=$c(am(e).spec_review),r=lm.test(n),o=r&&n.slice(0,n.indexOf("@"))==="skipped";return t.source==="none"?{...t,evidence:"none",skipped:o}:{...t,evidence:r?"published":"draft",skipped:o}}function In(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Oo(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?1:-1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Cc(e,t){let n=In(e.created_at),r=In(t.created_at);if(n!==r)return n<r?-1:1;let o=e.priority??2,i=t.priority??2;if(o!==i)return o-i;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Rc(e,t){let n=In(e.updated_at),r=In(t.updated_at);if(n!==r)return n<r?1:-1;let o=e.id,i=t.id;return o<i?-1:o>i?1:0}function Oc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let o=In(e.created_at),i=In(t.created_at);if(o!==i)return o<i?1:-1;let s=e.id,l=t.id;return s<l?-1:s>l?1:0}function Ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let o=e?.id,i=t?.id;return o<i?-1:o>i?1:0}var Ls=Object.freeze({priority:"asc",dependents:"desc",released:"desc",spec:"desc",created:"asc",updated:"desc"});function cm(e){return typeof e=="string"&&Object.prototype.hasOwnProperty.call(Ls,e)}function ya(e){if(!e||typeof e!="object")return!1;let t=e;return cm(t.key)&&(t.dir==="asc"||t.dir==="desc")}function xc(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ac(e,t){switch(t){case"priority":{let n=e.priority;return typeof n=="number"&&Number.isFinite(n)?n:null}case"dependents":{let n=e.dependents_info?e.dependents_info.count:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"released":{let n=e.release_info?e.release_info.last_released_at:null;return typeof n=="number"&&Number.isFinite(n)?n:null}case"spec":return Jr(e).evidence==="published"?1:0;case"created":return xc(e.created_at);case"updated":return xc(e.updated_at);default:return null}}function Sc(e,t,n){let r=Ac(e,n.key),o=Ac(t,n.key);if(r===null||o===null)return r===o?0:r===null?1:-1;if(r===o)return 0;let i=r<o?-1:1;return n.dir==="desc"?-i:i}function Lc(e){let t=Array.isArray(e)?e.filter(ya):[];return(n,r)=>{for(let l of t){let a=Sc(n,r,l);if(a!==0)return a}let o=Sc(n,r,{key:"created",dir:"asc"});if(o!==0)return o;let i=n.id,s=r.id;return i<s?-1:i>s?1:0}}var um=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Ec(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Tc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=um.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Pc(e,t){let n=Ec(e),r=Ec(t);if(n!==r)return n<r?-1:1;let o=Tc(e),i=Tc(t);if(o!==i)return o<i?-1:1;let s=In(e&&e.created_at),l=In(t&&t.created_at);if(s!==l)return s<l?-1:1;let a=e&&e.id,u=t&&t.id;return a===u?0:String(a)<String(u)?-1:1}var ba=2**20;function eo(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-In(e&&e.created_at)}function Dc(e){return(t,n)=>{let r=eo(t,e),o=eo(n,e);if(r!==o)return r<o?-1:1;let i=t?.id,s=n?.id;return i<s?-1:i>s?1:0}}function va(e,t,n){let r=Array.isArray(e)?e:[],o=r.length,i=Math.max(0,Math.min(t,o-1)),s=i-1>=0?r[i-1]:null,l=i+1<o?r[i+1]:null;if(!s&&!l)return{rank:0};if(!s)return{rank:eo(l,n)-ba};if(!l)return{rank:eo(s,n)+ba};let a=eo(s,n),u=eo(l,n),d=(a+u)/2;return a<d&&d<u?{rank:d}:{renormalize:r.map((f,m)=>({bead_id:f.id,rank:m*ba}))}}function ka(e,t={}){let n=Bt(`issue-store:${e}`),r=new Map,o=[],i=0,s=new Set,l=!1,a=t.sort||Oo;function u(){for(let m of Array.from(s))try{m()}catch{}}function d(){o=Array.from(r.values()).sort(a)}function f(m){if(l||!m||m.id!==e)return;let _=Number(m.revision)||0;if(n("apply %s rev=%d",m.type,_),!(_<=i&&m.type!=="snapshot")){if(m.type==="snapshot"){if(_<=i)return;r.clear();let w=Array.isArray(m.issues)?m.issues:[];for(let R of w)R&&typeof R.id=="string"&&R.id.length>0&&r.set(R.id,R);d(),i=_,u();return}if(m.type==="upsert"){let w=m.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let R=r.get(w.id);if(!R)r.set(w.id,w);else{let I=Number.isFinite(R.updated_at)?R.updated_at:0,U=Number.isFinite(w.updated_at)?w.updated_at:0;if(I<=U){for(let ie of Object.keys(R))ie in w||delete R[ie];for(let[ie,z]of Object.entries(w))R[ie]=z}}d()}i=_,u()}else if(m.type==="delete"){let w=String(m.issue_id||"");w&&(r.delete(w),d()),i=_,u()}}}return{id:e,subscribe(m){return s.add(m),()=>{s.delete(m)}},applyPush:f,snapshot(){return o},size(){return r.size},getById(m){return r.get(m)},dispose(){l=!0,r.clear(),o=[],s.clear(),i=0}}}function Ps(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let o=Object.keys(e.params).sort();for(let i of o){let s=e.params[i];n[i]=String(s)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Mc(e){let t=Bt("subs"),n=new Map,r=new Map;function o(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let u=r.get(l);if(!u||u.size===0)return;let d=Array.isArray(a.added)?a.added:[],f=Array.isArray(a.updated)?a.updated:[],m=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(u)){let w=n.get(_);if(!w)continue;let R=w.itemsById;for(let I of d)typeof I=="string"&&I.length>0&&R.set(I,!0);for(let I of f)typeof I=="string"&&I.length>0&&R.set(I,!0);for(let I of m)typeof I=="string"&&I.length>0&&R.delete(I)}}async function i(l,a){let u=Ps(a);if(t("subscribe %s key=%s",l,u),!n.has(l))n.set(l,{key:u,itemsById:new Map});else{let f=n.get(l);if(f&&f.key!==u){let m=r.get(f.key);m&&(m.delete(l),m.size===0&&r.delete(f.key)),n.set(l,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(f){let m=n.get(l)||null;if(m){let _=r.get(m.key);_&&(_.delete(l),_.size===0&&r.delete(m.key))}throw n.delete(l),f}return async()=>{t("unsubscribe %s key=%s",l,u);try{await e("unsubscribe-list",{id:l})}catch{}let f=n.get(l)||null;if(f){let m=r.get(f.key);m&&(m.delete(l),m.size===0&&r.delete(f.key))}n.delete(l)}}return{subscribeList:i,_applyDelta:o,_subKeyOf:Ps,selectors:{getIds(l){let a=n.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let u=n.get(l);return u?u.itemsById.has(a):!1},count(l){let a=n.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=n.get(l),u={};if(!a)return u;for(let d of a.itemsById.keys())u[d]=!0;return u}}}}function qc(){let e=Bt("issue-stores"),t=new Map,n=new Map,r=new Set,o=new Map;function i(){for(let a of Array.from(r))try{a()}catch{}}function s(a,u,d){let f=u?Ps(u):"",m=n.get(a)||"",_=t.has(a);if(e("register %s key=%s (prev=%s)",a,f,m),_&&m&&f&&m!==f){let w=t.get(a);if(w)try{w.dispose()}catch{}let R=o.get(a);if(R){try{R()}catch{}o.delete(a)}let I=ka(a,d);t.set(a,I);let U=I.subscribe(()=>i());o.set(a,U)}else if(!_){let w=ka(a,d);t.set(a,w);let R=w.subscribe(()=>i());o.set(a,R)}return n.set(a,f),()=>l(a)}function l(a){e("unregister %s",a),n.delete(a);let u=t.get(a);u&&(u.dispose(),t.delete(a));let d=o.get(a);if(d){try{d()}catch{}o.delete(a)}}return{register:s,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let u=t.get(a);return u?u.snapshot().slice():[]},subscribe(a){return r.add(a),()=>r.delete(a)}}}function Nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function jc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wa(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function dm(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),o=r>=0?n.slice(r+1):"";if(o){let l=new URLSearchParams(o).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(n);return i&&i[1]?decodeURIComponent(i[1]):null}function pm(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Fc(e){let t=Bt("router"),n=()=>{let r=window.location.hash||"",o=/^#\/issue\/([^\s?#]+)/.exec(r),i=o&&o[1]?decodeURIComponent(o[1]):dm(r),s=pm(r);if(t("hash change \u2192 view=%s id=%s",s,i),e.setState({selected_id:s==="worker"?null:i,view:s,worker:{selected_parent_id:s==="worker"?i:null}}),!!o||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let a=i?`#/${s}?issue=${encodeURIComponent(i)}`:`#/${s}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let o=e.getState?e.getState():{view:"board"},i=o.view==="worker"||o.view==="monitor"?o.view:"board",s=wa(i,r);t("goto issue %s (view=%s)",r,i),window.location.hash!==s?window.location.hash=s:e.setState({selected_id:i==="worker"?null:r,view:i,worker:{selected_parent_id:i==="worker"?r:null}})},gotoView(r){let o=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},i=r==="worker"?o.worker?.selected_parent_id:o.selected_id,s=i?wa(r,i):`#/${r}`;t("goto view %s (id=%s)",r,i||""),window.location.hash!==s?window.location.hash=s:e.setState({view:r,selected_id:r==="worker"?null:o.selected_id})}}}var fm=Object.freeze({workspace_config:{default_workspace:null}});function Bc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:fm.workspace_config.default_workspace}}}function Uc(e={}){let t=Bt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Bc(e.config)},r=new Set;function o(){for(let i of Array.from(r))try{i(n)}catch{}}return{getState(){return n},setState(i){let s={...n,...i,filters:{...n.filters,...i.filters||{}},board:{...n.board,...i.board||{}},worker:{...n.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:n.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:n.workspace.available,hidden:i.workspace?.hidden!==void 0?i.workspace.hidden:n.workspace.hidden},config:i.config!==void 0?Bc(i.config):n.config},l=s.workspace.current?.path!==n.workspace.current?.path||s.workspace.available.length!==n.workspace.available.length||s.workspace.hidden.length!==n.workspace.hidden.length||s.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),a=s.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;s.selected_id===n.selected_id&&s.view===n.view&&s.filters.status===n.filters.status&&s.filters.search===n.filters.search&&s.filters.type===n.filters.type&&s.board.closed_filter===n.board.closed_filter&&s.worker.selected_parent_id===n.worker.selected_parent_id&&s.worker.show_closed_children.length===n.worker.show_closed_children.length&&s.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!l&&!a||(n=s,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),o())},subscribe(i){return r.add(i),()=>r.delete(i)}}}function Wc(e){let t=Bt("activity"),n=0,r=new Map,o=1;function i(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function s(){n+=1,t("start count=%d",n),i()}function l(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),i()}function a(u){return async(f,m)=>{let _=o++,w=Date.now();r.set(_,{type:f,start_ts:w}),t("request start id=%d type=%s count=%d",_,f,n+1),s();let R=!1,I=()=>{R||(R=!0,r.delete(_),l())},U=setTimeout(()=>{R||(t("request TIMEOUT id=%d type=%s elapsed=%dms",_,f,Date.now()-w),I())},3e4);try{let ie=await u(f,m),z=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",_,f,z),ie}catch(ie){let z=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",_,f,z,ie),ie}finally{clearTimeout(U),I()}}}return i(),{wrapSend:a,start:s,done:l,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,f])=>({id:d,type:f.type,elapsed_ms:u-f.start_ts}))}}}function be(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function to(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let i=t.get();return i&&i.order?i.order:{}}function r(i,s,l){let a=e&&e.snapshotFor?e.snapshotFor(i).slice():[];if(s==="closed")return a.sort(Ic),a;switch(l){case"created_desc":return a.sort(Oo),a;case"created_asc":return a.sort(Cc),a;case"updated_desc":return a.sort(Rc),a;case"priority":return a.sort(Oc),a;case"manual":default:{let u=n();return u?a.sort(Dc(u)):a.sort(Oo),a}}}function o(i){let s=[];return e&&typeof e.subscribe=="function"&&s.push(e.subscribe(i)),t&&typeof t.subscribe=="function"&&s.push(t.subscribe(i)),()=>{for(let l of s)try{l()}catch{}}}return{selectBoardColumn:r,subscribe:o}}function ur(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function tn(e){let t=ur(e);if(t===null)return"";let n=new Date(t),r=o=>String(o).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function fn(e,t){let n=ur(e);if(n===null)return"";let o=(typeof t=="number"?t:Date.now())-n;if(o<6e4)return"\uBC29\uAE08";let i=Math.floor(o/6e4);if(i<60)return`${i}\uBD84 \uC804`;let s=Math.floor(o/36e5);if(s<24)return`${s}\uC2DC\uAC04 \uC804`;let l=Math.floor(o/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let u=Math.floor(l/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let o=ur(r.updated_at)??0;if(t===null||o>n){t=r,n=o;continue}o===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Ds(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ms(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let o=Ds(r);if(!o)continue;let i=n.get(o);i||(i=[],n.set(o,i)),i.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function qs(e,t){let n=e.get(t)||[],r=0;for(let i of n)(i.status==="resolved"||i.status==="closed")&&(r+=1);let o=zc(n);return{total:n.length,count:r,current:o,children:n}}function Hc(e){let t=e.transport,n=e.uiOrderStore;function r(s,l){return"renormalize"in s?s.renormalize:[{bead_id:l,rank:s.rank}]}function o(s,l){let a={...s.order};for(let u of l)a[u.bead_id]=u.rank;n&&n.set({revision:s.revision,order:a})}async function i(s,l,a){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(va(l,a,u.order),s);o(u,d);let f=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(f&&f.conflict){let m={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};n.set(m);let _=r(va(l,a,m.order),s);o(m,_);let w=await t("ui-order-set",{expected_revision:m.revision,entries:_});w&&w.applied&&n.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else f&&f.applied&&n.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:i}}function Kc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Zn(e,t){let n=Kc(e),r=Kc(t);return n.length===0||r.length===0?!1:n!==r}function Ns(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $a(e,t){return!t||typeof e!="string"||e.length===0||Ns(t.visible_labels).includes(e)?!0:Ns(t.hidden_labels).includes(e)?!1:!Ns(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Gc(e,t){return Ns(e).filter(n=>$a(n,t))}function dr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function _m(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function mm(e,t,n,r,o){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${o}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function gm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?o=>r(o,e.id):void 0}
  >
    <span class=${_m(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function js(e,t){let n=e.total||0,r=!!t.expanded,o=t.trailing??"",i=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&i===null)return"";let s=Array.isArray(e.children)?e.children:[],l=n>0?s.slice().sort(Pc):s;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?mm(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${i}</span>`}
        ${o}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${l.map((a,u)=>gm(a,u+1,t.childChips?t.childChips(a):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var hm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Yc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},bm={review:"\u2713",skip:"\u2298"},pr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ym(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let o of e){let i=t[o];if(i&&i.fill==="dim"&&i.stale!==!0)return o}return null}function Qc(e){let t=e&&e.fill||"none";return t==="none"?pr.none:e&&e.stale===!0?pr.stale:t==="dim"?pr.dim:e&&e.glyph==="review"?pr.review:e&&e.glyph==="skip"?pr.skip:pr.done}function vm(e){if(!e||e.fill==="none"||!e.approval_state)return Qc(e);let t=[];return e.glyph==="review"?t.push(pr.review):e.glyph==="skip"&&t.push(pr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function km(e,t,n,r){let o=hm[e]||e,i=t&&t.fill||"none",s=!!t&&t.stale===!0,l=bm[t&&t.glyph||""]||"",a="bar";i==="dim"?a+=` b-${o} dim`:i==="full"&&(a+=` b-${o} full`),s&&(a+=" stale"),n&&(a+=" cur");let u=i==="none"?"lbl":`lbl l-${o} on`,d=n?`color: var(--stage-${o}-on)`:"",f=Vc[e]||e,m=r?Xc(t):null;if(!m)return c`
      <div class="seg">
        <div class=${a} style=${d}>${l}</div>
        <div class=${u}>${f}</div>
      </div>
    `;let _=`${f} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${m.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${_}
      title=${_}
      @click=${w=>{w.preventDefault(),w.stopPropagation(),r(w,m,e)}}
    >
      <div class=${a} style=${d}>${l}</div>
      <div class=${u}>${f}</div>
    </button>
  `}function Xc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Fs(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,o=Yc[e.route]||Yc.spec_backed,i=e.stages,s=ym(o,i,String(t||"open")),l=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${o.map(u=>`${Vc[u]||u} ${u==="plan"?vm(i[u]||{}):Qc(i[u]||{})}`).join(" \xB7 ")}`,a=!!r&&o.some(u=>Xc(i[u]||{})!==null);return c`
    <div
      class="stp"
      role=${a?"group":"img"}
      aria-label=${l}
    >
      ${o.map(u=>km(u,i[u]||{},u===s,r))}
    </div>
  `}function wm(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Zc=2;function Jc(e){let t=e.slice(0,Zc).join(", "),n=e.length-Zc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function $m(e,t){if(!t)return[];let n=[],r=Array.isArray(t.blockers)?t.blockers:[],o=[],i=[];for(let s of r)(Zn(e,s)?i:o).push(s);return o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Jc(o)}</span
      >`),i.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Jc(i)}</span
      >`),n}function xm(e){if(!e||typeof e!="object")return null;let t=e.awaiting_user;if(typeof t!="string")return null;let n=t.trim();return n.length===0?null:c`<span class="ctl-chip ctl-chip--blocked"
    >${`\u23F8 \uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694: ${n}`}</span
  >`}function xa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Bs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Jn(e){return`${e.kind}:${Bs(e)}@${e.sha}`}function Us(e,t){if(!e)return null;let n=xa(e.kind),r=e.reason,o=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!o)return null;let i=xa(t?.kind),s=i!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${n}${s?` \u2192 ${i}`:""}`,a=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Jn(t)}`:"";return{kind:e.kind,label:l,title:`${a}${u}`}}function eu(e,t){let n=Us(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Am(e){if(!e)return null;let t=xa(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Jn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Sm(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},o=[];if(r.route&&dr(n,"route")){let l=r.route_source==="derived";o.push(c`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":r.route}</span
      >`)}if(r.fast_track&&dr(n,"fast_track")&&o.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&dr(n,"pr")){let l=r.pr.number;o.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let i=eu(r.planned_execution,r.exec_receipt);if(i&&o.push(i),r.exec_receipt){let l=r.exec_receipt;o.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(l)}`}
        >${`exec ${l.kind==="delegated"?Bs(l):`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let l=r.impl_entry;o.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of Gc(e.labels,n))o.push(c`<span class="ctl-chip ctl-chip--label">${l}</span>`);if(e.from_id&&dr(n,"from")&&o.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),dr(n,"blocked")){let l=xm(e.metadata);l&&o.push(l),o.push(...$m(e.id,e.blocked_info))}return t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&dr(n,"blocked")&&o.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),o.length===0?"":c`<div class="board-card__chips">${o}</div>`}function Em(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${tn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${tn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function Tm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return js(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Em(e),empty_label:"children \uC5C6\uC74C",childChips:Aa,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,o)=>t.onChildClick&&t.onChildClick(r,o)})}function Aa(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Us(t,n)?c`<span class="board-card__roll-child-chips">
    ${eu(t,n)}
    ${Am(n)}
  </span>`:null}function Ws(e,t){let n=wm(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Sm(e,t)}
      ${e.workflow&&dr(t.policy||null,"stepper")?Fs(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${Tm(e,t)}
    </article>
  `}function no(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${pc.map(i=>c`<option
                    value=${i.value}
                    ?selected=${i.value===e.closed_range}
                  >
                    ${i.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${e.id+"-header"}
      >
        ${e.items.map(i=>Ws(i,t))}
      </div>
    </section>
  `}function tu(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Ws(r,t))}
        </div>
      </div>
    </dialog>
  `}var Cm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Rm=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Om=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Im(e,t,n){let r=e.labels.length,o=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${o} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(i=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(i)}
                        @change=${()=>t.onLabelToggle(i)}
                      />
                      <span>${i}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function nu(e,t,n){return c`
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
        ${Cm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${Rm.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${Im(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${Om.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var Lm=200,Pm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Dm=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),ru="beads-ui.board.sort",ou=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Mm(){try{let e=window.localStorage.getItem(ru);if(e&&ou.has(e))return e}catch{}return"created_desc"}function su(e,t){let n=Bt("views:board"),r=t.gotoIssue,o=t.issueStores,i=t.transport,s=t.uiOrderStore,l=t.displayPolicyStore,a=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,f=t.openDoc,m=t.closedRange||Rs,_=o?to(o,s):null,w=Hc({transport:i,uiOrderStore:s}),R=[],I=[],U=[],ie=[],z=[],j=[],O=!1,q=0,W=Mm(),Y=new Map,N=new Map,F=new Map,H=new Set,G={search:"",priority:"",type:"",labels:[]},ee=!1,ye=null;function qe(ae){return String(ae.status||"open")==="open"}function B(ae){return String(ae.status||"open")==="open"}function Q(ae){let me=G.search.trim().toLowerCase(),Ge=G.priority,ut=G.type,Oe=G.labels;return ae.filter(E=>{if(me){let L=String(E.id||"").toLowerCase(),J=String(E.title||"").toLowerCase();if(!L.includes(me)&&!J.includes(me))return!1}if(Ge!==""&&String(E.priority)!==Ge||ut!==""&&String(E.issue_type||"")!==ut)return!1;if(Oe.length>0){let L=Array.isArray(E.labels)?E.labels:[];if(!Oe.some(J=>L.includes(J)))return!1}return!0})}function Ae(){let ae=new Set;for(let me of[R,I,U,ie,z,j])for(let Ge of me){let ut=Array.isArray(Ge.labels)?Ge.labels:[];for(let Oe of ut)typeof Oe=="string"&&Oe.length>0&&ae.add(Oe)}return Array.from(ae).sort()}function Se(){return G.search.trim()!==""||G.priority!==""||G.type!==""||G.labels.length>0}function C(){try{if(_){let ae=_.selectBoardColumn("tab:board:in-progress","in_progress",W),me=_.selectBoardColumn("tab:board:blocked","blocked",W).filter(B),Ge=new Set(ae.map(Pe=>Pe.id)),ut=_.selectBoardColumn("tab:board:ready","ready",W).filter(Pe=>qe(Pe)&&!Ge.has(Pe.id)),Oe=_.selectBoardColumn("tab:board:resolved","resolved",W),E=_.selectBoardColumn("tab:board:deferred","deferred",W),L=_.selectBoardColumn("tab:board:closed","closed").slice(0,Lm),J=[...me,...ut,...ae,...Oe,...L];re(J);let pe=new Set;for(let Pe of J)Pe&&Pe.id&&!Ds(Pe)&&pe.add(Pe.id);let fe=!Se();R=fe?Io(me,pe):me,I=fe?Io(ut,pe):ut,U=fe?Io(ae,pe):ae,ie=fe?Io(Oe,pe):Oe,z=E,q=E.length,j=fe?Io(L,pe):L,Y=new Map;for(let Pe of R)Y.set(Pe.id,"open");for(let Pe of I)Y.set(Pe.id,"open");for(let Pe of U)Y.set(Pe.id,"in_progress");for(let Pe of ie)Y.set(Pe.id,"resolved");for(let Pe of z)Y.set(Pe.id,"deferred");for(let Pe of j)Y.set(Pe.id,"closed");N=new Map;for(let Pe of R)N.set(Pe.id,"blocked-col");for(let Pe of I)N.set(Pe.id,"ready-col");for(let Pe of U)N.set(Pe.id,"in-progress-col");for(let Pe of ie)N.set(Pe.id,"resolved-col");for(let Pe of j)N.set(Pe.id,"closed-col")}je()}catch{R=[],I=[],U=[],ie=[],z=[],j=[],F=new Map,je()}}function re(ae){F=Ms(ae)}function ke(ae){return qs(F,ae)}function ve(ae){return!H.has(ae)}function Me(ae,me){ae.preventDefault(),ae.stopPropagation(),H.has(me)?H.delete(me):H.add(me),je()}function he(ae,me){ae.preventDefault(),ae.stopPropagation(),r(me)}function Le(ae,me){ae.preventDefault(),ae.stopPropagation(),r(me)}function Je(ae,me){ye||r(me)}function lt(ae,me){ae.preventDefault(),ae.stopPropagation(),qm(me).then(Ge=>{Ge&&be("\uBCF5\uC0AC\uB428","success",1200)})}function P(ae,me){ye=me,ae.dataTransfer&&(ae.dataTransfer.setData("text/plain",me),ae.dataTransfer.effectAllowed="move"),ae.target.classList.add("board-card--dragging")}function ce(ae){ae.target.classList.remove("board-card--dragging"),Gt(),setTimeout(()=>{ye=null},0)}function se(ae){let me=String(ae.target.value||"");!me||me===m||(m=me,u&&u(me),je())}function de(){return l?l.get():null}function Ee(ae){let me=a?a.get():null,Ge=me?me.cleanup_failed:null;if(!Ge||typeof Ge!="object"||Array.isArray(Ge))return null;let ut=Ge[ae];return!ut||typeof ut!="object"||Array.isArray(ut)?null:ut}let _e={onCardClick:Je,onCopyId:lt,onDragStart:P,onDragEnd:ce,onClosedRangeChange:se,rollupFor:ke,isExpanded:ve,onRollupToggle:Me,onChildClick:he,onFromChipClick:Le,onOpenDoc:f?(ae,me)=>f(me):void 0,cleanupFailureFor:Ee,get policy(){return de()}};function De(ae,me){ye||(Ke(),r(me))}function Ue(ae,me){ae.preventDefault(),ae.stopPropagation(),Ke(),r(me)}let Qe={..._e,onCardClick:De,onChildClick:Ue,onFromChipClick:Ue,onOpenDoc:f?(ae,me)=>{Ke(),f(me)}:void 0,get policy(){return de()}};function Fe(ae){let me=ae.target,Ge=e.querySelector(".board-filter__labels");me&&Ge&&Ge.contains(me)||$e()}function te(ae){ae.key==="Escape"&&$e()}function V(){ee||(ee=!0,document.addEventListener("mousedown",Fe),document.addEventListener("keydown",te),je())}function $e(){ee&&(ee=!1,document.removeEventListener("mousedown",Fe),document.removeEventListener("keydown",te),je())}function _t(ae){ae.key==="Escape"&&Ke()}function ct(){O||(O=!0,document.addEventListener("keydown",_t),je())}function Ke(){O&&(O=!1,document.removeEventListener("keydown",_t),je())}let $={onClose:Ke,onOverlayClick(ae){ae.target===ae.currentTarget&&Ke()}},Z={onSearchInput(ae){G.search=String(ae.target.value||""),C()},onPriorityChange(ae){G.priority=String(ae.target.value||""),C()},onTypeChange(ae){G.type=String(ae.target.value||""),C()},onSortChange(ae){let me=String(ae.target.value||"");if(!(!ou.has(me)||me===W)){W=me;try{window.localStorage.setItem(ru,me)}catch{}C()}},onDeferredToggle(){O?Ke():ct()},onLabelMenuToggle(){ee?$e():V()},onLabelToggle(ae){let me=G.labels.indexOf(ae);me===-1?G.labels.push(ae):G.labels.splice(me,1),C()},onLabelClear(){G.labels.length!==0&&(G.labels=[],C())},onNewIssue(){d&&d()}};function Re(){return c`
      <div class="board-view">
        ${nu(G,Z,{sort_mode:W,deferred_popup_open:O,deferred_count:q,label_options:Ae(),label_menu_open:ee})}
        <div class="board-root">
          ${no({title:"Blocked",id:"blocked-col",items:Q(R)},_e)}
          ${no({title:"Ready",id:"ready-col",items:Q(I)},_e)}
          ${no({title:"In progress",id:"in-progress-col",items:Q(U)},_e)}
          ${no({title:"Resolved",id:"resolved-col",items:Q(ie)},_e)}
          ${no({title:"Closed",id:"closed-col",items:Q(j),is_closed:!0,closed_range:m},_e)}
        </div>
        ${O?tu({items:Q(z),count:q},Qe,$):""}
      </div>
    `}function je(){pt(Re(),e),Xe()}function Xe(){try{let ae=e.querySelector("#deferred-popup");ae&&!ae.open&&(typeof ae.showModal=="function"?ae.showModal():ae.setAttribute("open",""));let me=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Ge of me)Array.from(Ge.querySelectorAll(".board-card")).forEach((Oe,E)=>{Oe.tabIndex=E===0?0:-1})}catch{}}async function Ze(ae,me){if(!i){be("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await i("update-status",{id:ae,status:me}),be("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Ge){n("update-status failed: %o",Ge),be("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function We(ae){switch(ae){case"blocked-col":return R;case"ready-col":return I;case"in-progress-col":return U;case"resolved-col":return ie;default:return[]}}function dt(ae,me,Ge){if(!i||!s)return;let ut=We(ae),Oe=ut.find(fe=>fe.id===me);if(!Oe)return;let E=ut.filter(fe=>fe.id!==me),L=Ge.closest?Ge.closest(".board-card"):null,J=E.length;if(L){let fe=L.getAttribute("data-issue-id");if(fe===me)return;let Pe=E.findIndex(ht=>ht.id===fe);Pe>=0&&(J=Pe)}let pe=E.slice();pe.splice(J,0,Oe),w.applyReorder(me,pe,J)}function Gt(){for(let ae of Array.from(e.querySelectorAll(".board-column--drag-over")))ae.classList.remove("board-column--drag-over")}let St=null;e.addEventListener("dragover",ae=>{ae.preventDefault(),ae.dataTransfer&&(ae.dataTransfer.dropEffect="move");let Ge=ae.target.closest(".board-column");Ge&&Ge!==St&&(St&&St.classList.remove("board-column--drag-over"),Ge.classList.add("board-column--drag-over"),St=Ge)}),e.addEventListener("dragleave",ae=>{let me=ae.relatedTarget;(!me||!e.contains(me))&&St&&(St.classList.remove("board-column--drag-over"),St=null)}),e.addEventListener("drop",ae=>{ae.preventDefault(),St&&(St.classList.remove("board-column--drag-over"),St=null);let me=ae.target,Ge=me.closest(".board-column");if(!Ge)return;let ut=ae.dataTransfer?.getData("text/plain")||"";if(!ut)return;let Oe=Ge.id,E=N.get(ut);if(E&&E===Oe){if(Dm.has(Oe)){if(W!=="manual"){be("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}dt(Oe,ut,me)}return}let L=Pm[Oe];if(!L){be("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}Y.get(ut)!==L&&Ze(ut,L)}),e.addEventListener("keydown",ae=>{let me=ae.target;if(!(me instanceof HTMLElement))return;let Ge=String(me.tagName||"").toLowerCase();if(Ge==="input"||Ge==="textarea"||Ge==="select"||Ge==="button"||Ge==="a"||me.isContentEditable===!0)return;let ut=me.closest(".board-card");if(!ut)return;let Oe=String(ae.key||"");if(Oe==="Enter"||Oe===" "){ae.preventDefault();let pe=ut.getAttribute("data-issue-id");pe&&r(pe);return}if(Oe!=="ArrowUp"&&Oe!=="ArrowDown"&&Oe!=="ArrowLeft"&&Oe!=="ArrowRight")return;ae.preventDefault();let E=ut.closest(".board-column");if(!E)return;let L=Array.from(E.querySelectorAll(".board-card")),J=L.indexOf(ut);if(Oe==="ArrowDown"&&J<L.length-1){kt(ut,L[J+1]);return}if(Oe==="ArrowUp"&&J>0){kt(ut,L[J-1]);return}if(Oe==="ArrowLeft"||Oe==="ArrowRight"){let pe=Array.from(e.querySelectorAll(".board-column")),fe=pe.indexOf(E),Pe=Oe==="ArrowRight"?1:-1,ht=fe+Pe;for(;ht>=0&&ht<pe.length;){let $t=pe[ht].querySelector(".board-card");if($t){kt(ut,$t);return}ht+=Pe}}});function kt(ae,me){try{ae.tabIndex=-1,me.tabIndex=0,me.focus()}catch{}}let wt=null;_&&_.subscribe&&(wt=_.subscribe(()=>{try{C()}catch{}}));let Ft=null;l&&l.subscribe&&(Ft=l.subscribe(()=>{try{C()}catch{}}));let Pt=null;return a&&a.subscribe&&(Pt=a.subscribe(()=>{je()})),{async load(){n("load"),C()},clear(){$e(),Ke(),wt&&(wt(),wt=null),Ft&&(Ft(),Ft=null),Pt&&(Pt(),Pt=null),e.replaceChildren(),R=[],I=[],U=[],ie=[],z=[],j=[],Y=new Map,N=new Map}}}function Io(e,t){return e.filter(n=>{let r=Ds(n);return!(r&&t.has(r))})}async function qm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var dn=e=>e??Ht;function Sn(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function Lo(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}async function _n(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}var Nm=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed","orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],cu=["orchestration_model","orchestration_effort","orchestration_speed"],uu=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],jm=[...cu,...uu],iu={quick_fix_impl_dispatch:"impl_dispatch",quick_fix_impl_runtime:"impl_runtime",quick_fix_impl_model:"impl_model",quick_fix_impl_effort:"impl_effort",quick_fix_impl_speed:"impl_speed",quick_fix_orchestration_model:"orchestration_model",quick_fix_orchestration_effort:"orchestration_effort",quick_fix_orchestration_speed:"orchestration_speed"},au={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},lu={spec_review_speed:"spec_review_model",plan_review_speed:"plan_review_model",impl_review_speed:"impl_review_model"},Fm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function Jt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Ct(e){return typeof e=="string"&&e.length>0?e:null}function ro(e){return e.startsWith("gpt-")?e.slice(4):e}function ft(e,t,n,r,o){return{value:e,source:t,display:n,full_value:r,resolution:o}}function du(e,t,n){let r=Ct(t[e]);if(r!==null)return{value:r,source:"pin"};let o=Ct(n[e]);return o===null?null:{value:o,source:"global"}}function fr(e,t,n,r){return du(e,t,n)||{value:r,source:"base"}}function Sa(e,t,n,r){let o=n?.implementation?.model_catalog;if(t&&Jt(o?.[t])){let s=Ct(o[t][e]);if(s!==null)return s}if(t&&Array.isArray(o?.[t])&&o[t].includes(e))return e;if(!t&&Jt(o)){for(let s of Object.values(o))if(Jt(s)){let l=Ct(s[e]);if(l!==null)return l}else if(Array.isArray(s)&&s.includes(e))return e}let i=r?.model_index?.[e];return Ct(r?.runners?.[i]?.models?.[e]?.id)||e}function Bm(e,t){return Ct(t?.review?.reviewers?.[e]?.model)||e}function Ln(e,t,n=!1){if(e==="default")return ft(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?ro(e):e;return ft(e,t,r,e,"explicit")}function pu(e,t,n){let r=t?.implementation?.model_catalog?.[e],o=[];Jt(r)?o.push(...Object.keys(r)):Array.isArray(r)&&o.push(...r.filter(s=>typeof s=="string"));let i=n?.runners?.[e]?.models;if(Jt(i))for(let s of Object.keys(i))o.includes(s)||o.push(s);return o}function Um(e,t){let n=[],r=e?.implementation?.model_catalog;Jt(r)&&n.push(...Object.keys(r));let o=t?.runners;if(Jt(o))for(let i of Object.keys(o))n.includes(i)||n.push(i);return n}function Wm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let o of Um(t,n)){let i=pu(o,t,n);if(i.length>0&&(r=!0),i.includes(e))return{runtime:o,offered:!0}}return{runtime:null,offered:r}}function zs(e){return ft(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function Ea(e,t,n){let r=du(e,t,n);return r?Ln(r.value,r.source):ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function En(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.execution_defaults)?e.execution_defaults:null,o=r?.supported===!0&&Jt(r.session)?r.session:null,i=r?.supported===!0&&Jt(r.orchestration)?r.orchestration:null,s=Jt(e.runner_catalog)?e.runner_catalog:null,l=Ct(n.quick_fix_impl_model),a=Wm(l,o,s),u={};if(o){let d=fr("workflow_mode",t,n,Ct(o.workflow_mode_default));u.workflow_mode=d.source==="base"?ft(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Ln(d.value,d.source);for(let z of["spec_review","plan_review","impl_review"]){let j=`${z}_model`,O=Ct(z==="plan_review"?d.value==="fast_track"?o.plan_review?.fast_track_default:o.plan_review?.standard_recommended:o.review?.default),q=fr(j,t,n,O);if(q.value===null)u[j]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(q.value!=="self"&&q.value!=="skip"&&!Jt(o.review?.reviewers?.[q.value]))u[j]=zs(ft(q.value,q.source,"",null,"explicit"));else{let W=Bm(q.value,o);u[j]=ft(q.value,q.source,ro(W),W,q.source==="base"?"default":"explicit")}}for(let[z,j]of Object.entries(au)){let O=u[j].value;if(O==="self"||O==="skip"){u[z]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let q=Ct(o.review?.reviewers?.[O||""]?.effort),W=fr(z,t,n,q);u[z]=W.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(W.value,W.source,W.value,W.value,W.source==="base"?"default":"explicit")}for(let[z,j]of Object.entries(lu)){let O=u[j];if(O.resolution==="incompatible"||O.value==="self"||O.value==="skip"){u[z]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}if(O.resolution==="unavailable"){u[z]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}let q=fr(z,t,n,"default");u[z]=q.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln(q.value,q.source)}let f=Jt(o.implementation?.default)?o.implementation.default:{},m=Ct(e.route),_=m!==null&&["quick_fix","spec_backed","full_plan"].includes(m),w=Jt(o.implementation?.route_defaults)?o.implementation.route_defaults:{},R=_&&Jt(w[m])?w[m]:{},I={},U=!1;if(m==="quick_fix"){let z=Ct(t.impl_runtime),j=Ct(n.quick_fix_impl_runtime),O=z||j,q=O==="inherit"?Ct(e.controller_runtime):O;U=l!==null&&a.runtime!==null&&(O===null||q===a.runtime);let W=Ct(t.impl_dispatch),Y=Ct(n.quick_fix_impl_dispatch);if(W!==null)u.impl_dispatch=Ln(W,"pin"),I.impl_dispatch="pin";else if(Y!==null)u.impl_dispatch=Ln(Y,"global"),I.impl_dispatch="quick_fix";else if(U)u.impl_dispatch=ft("delegated","global","\uC704\uC784 (\uBAA8\uB378 \uD568\uC758)","delegated","explicit"),I.impl_dispatch="implied";else{let N=Ct(R.dispatch)||Ct(f.dispatch);u.impl_dispatch=N?ft(N,"base",N,N,"default"):ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"),I.impl_dispatch="base"}if(z!==null)u.impl_runtime=Ln(z,"pin"),I.impl_runtime="pin";else if(j!==null)u.impl_runtime=Ln(j,"global"),I.impl_runtime="quick_fix";else if(U){let N=a.runtime;u.impl_runtime=ft(N,"global",`${N} (\uC720\uB3C4)`,N,"explicit"),I.impl_runtime="derived"}else{let N=fr("impl_runtime",{},n,Ct(f.runtime));u.impl_runtime=N.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit"),I.impl_runtime=N.source}for(let N of["impl_model","impl_effort","impl_speed"]){let F=Ct(t[N]),H=Ct(n[`quick_fix_${N}`]),G;F!==null?(G={value:F,source:"pin"},I[N]="pin"):N==="impl_model"&&U&&l!==null?(G={value:l,source:"global"},I[N]="quick_fix"):N!=="impl_model"&&H!==null?(G={value:H,source:"global"},I[N]="quick_fix"):(G=fr(N,{},n,Ct(f[N.replace("impl_","")])),I[N]=G.source),u[N]=G.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(G.value,G.source,G.value,G.value,G.source==="base"?"default":"explicit")}}else for(let z of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let j=fr(z,t,n,z==="impl_dispatch"?Ct(R.dispatch)||Ct(f.dispatch):Ct(f[z.replace("impl_","")]));u[z]=j.value===null?ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):ft(j.value,j.source,j.value,j.value,j.source==="base"?"default":"explicit")}let ie=u.impl_dispatch.value==="main";if(ie?u.impl_dispatch.display=I.impl_dispatch==="quick_fix"?"\uBA54\uC778 (quick_fix)":"\uBA54\uC778":u.impl_dispatch.value==="delegated"&&(I.impl_dispatch==="quick_fix"?u.impl_dispatch.display="\uC704\uC784 (quick_fix)":I.impl_dispatch!=="implied"&&(u.impl_dispatch.display="\uC704\uC784")),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let z=u.impl_runtime.value==="inherit"?Ct(e.controller_runtime):u.impl_runtime.value,j=z?pu(z,o,s):[];m==="quick_fix"&&I.impl_model==="base"&&I.impl_runtime!=="base"&&j.length>0&&!j.includes(u.impl_model.value)&&(u.impl_model=ft("auto","base","auto","auto","default"));let O=u.impl_model.value;if(O!=="auto"&&j.length>0&&!j.includes(O))u.impl_model=zs(u.impl_model);else{let q=Sa(O,z,o,s);u.impl_model.display=ro(q),u.impl_model.full_value=q,I.impl_model==="quick_fix"&&(u.impl_model.display=`${u.impl_model.display} (quick_fix)`)}}if(u.impl_effort.value==="auto"){let z=Ct(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),j=z?Ct(o.implementation?.effort_by_transport?.[z]?.auto):null;j&&!Fm.has(j)?(u.impl_effort.display=`${j} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=j,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}I.impl_effort==="quick_fix"&&u.impl_effort.value!==null&&(u.impl_effort=ft(u.impl_effort.value,"global",`${u.impl_effort.value} (quick_fix)`,u.impl_effort.value,"explicit")),u.impl_speed.value==="default"&&(u.impl_speed=I.impl_speed==="quick_fix"?ft("default","global","default (quick_fix)","default","explicit"):u.impl_speed.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",u.impl_speed.source));for(let z of["impl_runtime","impl_effort","impl_speed"])I[z]==="quick_fix"&&u[z].value!==null&&!u[z].display.endsWith("(quick_fix)")&&(u[z].display=`${u[z].display} (quick_fix)`);if(m==="quick_fix"){l!==null&&!U&&a.offered&&(u.quick_fix_impl_model=zs(ft(l,"global","",l,"explicit")));for(let[z,j]of Object.entries(iu))!z.startsWith("quick_fix_orchestration_")&&!Object.hasOwn(u,z)&&(u[z]={...u[j]});u.impl_dispatch.source==="base"&&u.impl_dispatch.value==="main"&&(u.quick_fix_impl_dispatch=ft("main","base","\uBA54\uC778 (\uD558\uB124\uC2A4)","main","default"))}if(ie)for(let z of["impl_runtime","impl_model","impl_effort","impl_speed"])u[z]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else for(let d of Nm.filter(f=>!jm.includes(f)))u[d]=Ea(d,t,n);if(!o){for(let[d,f]of Object.entries(au))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));for(let[d,f]of Object.entries(lu))(u[f].value==="self"||u[f].value==="skip")&&(u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=ft(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of cu){if(!i){u[d]=Ea(d,t,n);continue}let f=d.replace("orchestration_",""),m=Ct(i[f]),_=`quick_fix_${d}`,w=e.route==="quick_fix"?Ct(n[_]):null,R=Ct(t[d]),I=R!==null?{value:R,source:"pin"}:w!==null?{value:w,source:"global"}:fr(d,{},n,m),U=R===null&&w!==null;if(d==="orchestration_effort"&&I.source==="base"){u[d]=ft(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(I.value===null){u[d]=ft(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let ie=I.source==="base"?Ct(i.model_id)||I.value:Sa(I.value,null,o,s);u[d]=ft(I.value,I.source,`${ro(ie)}${U?" (quick_fix)":""}`,ie,I.source==="base"?"default":"explicit");continue}if(I.value==="default"){u[d]=U?ft("default","global","default (quick_fix)","default","explicit"):I.source==="base"?ft("default","base","default (\uC77C\uBC18)","default","default"):Ln("default",I.source);continue}u[d]=U?ft(I.value,"global",`${I.value} (quick_fix)`,I.value,"explicit"):Ln(I.value,I.source)}for(let d of uu){let f=iu[d];u[d]=u[f]?{...u[f]}:Ea(d,t,n)}if(o&&e.route!=="quick_fix")if(l===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=ft(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${ro(d)})`,null,"default")}else if(a.runtime!==null){let d=Sa(l,a.runtime,o,s);u.quick_fix_impl_model=ft(l,"global",ro(d),d,"explicit")}else a.offered?u.quick_fix_impl_model=zs(ft(l,"global","",null,"explicit")):u.quick_fix_impl_model=Ln(l,"global");return u}function zm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Hs(e){let t=Jt(e.pin)?e.pin:{},n=Jt(e.global)?e.global:{},r=Jt(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let o=f=>{let m={...r,...f};return En({pin:e.layer==="pin"?m:t,global:e.layer==="pin"?n:m,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},i=e.layer==="pin"?t:n,s={...i};delete s[e.key];let l=o(s)[e.key],a=o(i)[e.key],u=Ct(i[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:zm(l,e.layer==="pin"),full_value:l.full_value,unavailable:l.resolution==="unavailable",disabled:a?.resolution==="not_applicable",options:d.map(f=>{let m=o({...i,[e.key]:f})[e.key];return{value:f,label:m.display,full_value:m.full_value}})}}function Hm(e,t=document){let n=t.createElement("dialog");n.className="op-dialog continuation-dialog";let r=t.createElement("button"),o=t.createElement("button"),i=t.createElement("button"),s=t.createElement("h2"),l=t.createElement("p"),a=t.createElement("div");return a.className="op-dialog__actions",s.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${Sn(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Sn(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.className="op-btn",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,o.type="button",o.className="op-btn",o.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",i.type="button",i.className="op-btn",i.textContent="\uCDE8\uC18C",a.append(r,o,i),n.append(s,l,a),t.body.append(n),new Promise(u=>{let d=f=>{typeof n.close=="function"&&n.close(),n.remove(),u(f)};r.addEventListener("click",()=>d("prior_session")),o.addEventListener("click",()=>d("fresh_current")),i.addEventListener("click",()=>d(null)),n.addEventListener("cancel",f=>{f.preventDefault(),d(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function _r(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let o=r.continuation_mismatch,i=await Hm(o);if(i===null)return r;r=await t(i,o.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}function fu(e,t=document){let n=e?.kind==="settlement",r=t.createElement("dialog");r.className="op-dialog resume-instructions-dialog";let o=t.createElement("h2"),i=t.createElement("textarea"),s=t.createElement("div"),l=t.createElement("button"),a=t.createElement("button"),u=[e?.bead_id,e?.tuple].filter(d=>typeof d=="string"&&d!=="").join(" \xB7 ");if(o.textContent=n?"\uCC29\uC9C0 \uC815\uC0B0 \uC7AC\uAC1C":"\uC138\uC158 \uC774\uC5B4\uD558\uAE30",i.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",i.maxLength=4e3,s.className="op-dialog__actions resume-instructions-dialog__actions",l.type="button",l.className="op-btn op-btn--primary",l.textContent=n?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",a.type="button",a.className="op-btn",a.textContent="\uCDE8\uC18C",s.append(l,a),r.append(o),u!==""){let d=t.createElement("p");d.className="resume-instructions-dialog__target",d.textContent=u,r.append(d)}return r.append(i,s),t.body.append(r),new Promise(d=>{let f=!1,m=w=>{f||(f=!0,typeof r.close=="function"&&r.close(),r.remove(),d(w))},_=()=>m(i.value.trim());l.addEventListener("click",_),a.addEventListener("click",()=>m(null)),i.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),_())}),r.addEventListener("cancel",w=>{w.preventDefault(),m(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open",""),i.focus()})}async function oo(e){let{context:t,transport:n,adopt:r}=e,o=await fu(t);if(o===null)return null;let i=o===""?{}:{instructions:o},s=await n({...i});if(r?.(s),s&&s.conflict&&(s=await n({...i}),r?.(s)),s=await _r(s,(l,a)=>n({...i,continuation:l,decision_token:a}),{onResult:r,refresh:()=>n({...i})}),s&&s.resumed===!1&&!s.conflict&&s.reason){let l=t?.kind==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30";be(`${l} \uAC70\uBD80: ${s.reason}`,"error",2400)}return s}function Ta(e){return`session:${e.provider}:${e.session_id}`}function Po(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Km(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function so(e,t,n,r){return{attempt_id:Ta(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:Po(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Km(e,n)}}}var Ca="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Gm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",_u="\uBD84\uD574 \uC5C6\uB294 leg";function Xt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Kn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],io=[...Kn,"reasoning_output_tokens"],Ym={codex:["implementation","review-consult"],claude:["subagent"]};function Ra(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Kn.some(t=>Number.isFinite(e[t]))}function Vm(e){return!e||typeof e!="object"?!1:io.some(t=>Number.isFinite(e[t]))}function Oa(e){let t=0;for(let n of Kn)t+=Xt(e?.[n]);return t}function Qm(e){return!e||typeof e!="object"?!1:Kn.some(t=>Number.isFinite(e[t]))}function mu(e){return!e||typeof e!="object"?!1:io.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Xm(e){let t={};for(let n of io)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function gu(e){let t={};for(let n of io)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function hu(e,t){return Ra(t)?Xt(t.total_tokens):e==="codex"?Xt(t.input_tokens)+Xt(t.output_tokens):Oa(t)}function Zm(e){return e==="claude"?"Claude":"Codex"}function Jm(e){return`\u03C4 ${yu(e)}`}function eg(e,t){let n=t.breakdown||{},r=Xt(t.total_only_subtotal);if(Ra(n)||r>0&&!Vm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Gm];return t.replayed&&u.push(Ca),u.join(`
`)}let o=[`\uC785\uB825 ${Xt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(o.push(`\uCE90\uC2DC\uC77D\uAE30 ${Xt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Xt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&o.push(`\uCD94\uB860\uCD9C\uB825 ${Xt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&o.push(`${_u} ${r.toLocaleString("en-US")}`);let i=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",s=r>0?`${i} + ${_u}`:i,a=[e==="claude"?`Claude subtotal = ${s}`:`Codex subtotal = ${s}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,o.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&a.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&a.push(Ca),a.join(`
`)}function cn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Zm(n)} ${Jm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:eg(n,r)})}return t}function Gs(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let o of e)if(!(!o||!o.providers))for(let i of["claude","codex"]){let s=o.providers[i];if(!s)continue;let l=t[i];l||(l={subtotal:0,breakdown:{}},t[i]=l),l.subtotal+=s.subtotal,Number.isFinite(s.total_only_subtotal)&&(l.total_only_subtotal=Xt(l.total_only_subtotal)+Xt(s.total_only_subtotal));for(let a of io)Number.isFinite(s.breakdown[a])&&(l.breakdown[a]=Xt(l.breakdown[a])+Xt(s.breakdown[a]));s.replayed&&(l.replayed=!0),i==="claude"&&(typeof s.total_cost_usd=="number"&&Number.isFinite(s.total_cost_usd)?r.claude+=s.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function Ia(e){return!e||typeof e!="object"?null:tr({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function tg(e){return e==="codex"?"codex":"claude"}function Hn(){return{subtotal:0,breakdown:Xm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ks(e,t,n){e.subtotal+=t.subtotal,Ra(t.usage)&&(e.total_only+=t.subtotal);for(let r of io)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Xt(e.breakdown[r])+Xt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function bu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function yu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function ao(e){return Qm(e)?`\u03C4 ${yu(Oa(e))}`:null}function er(e){let t=ao(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function Do(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Xt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Xt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Xt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Xt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${Oa(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(Ca),n.join(`
`)}function tr(e,t){let n={claude:Hn(),codex:Hn()},r={orchestrator:{claude:Hn(),codex:Hn()},implementation:{claude:Hn(),codex:Hn()},"review-consult":{claude:Hn(),codex:Hn()},subagent:{claude:Hn(),codex:Hn()}},o=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(mu(a)){let d=tg(l.runner),f=gu(a),m={provider:d,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:f,subtotal:hu(d,f)};f.replayed===!0&&(m.replayed=!0),typeof l.model=="string"&&(m.model=l.model),typeof l.session_id=="string"&&(m.session_id=l.session_id),Ks(n[d],m,!0),Ks(r.orchestrator[d],m,!0)}let u=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let d of u){let f=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Ym[f].includes(d.role)||!mu(d.usage))continue;let m=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!m||o.has(m))continue;o.add(m);let _=gu(d.usage),w={provider:f,role:d.role,attempt_id:String(l.attempt_id||""),usage:_,subtotal:hu(f,_)};w.receipt_id=m,typeof d.agent_type=="string"&&(w.agent_type=d.agent_type),typeof d.agent_id=="string"&&(w.agent_id=d.agent_id),typeof d.model=="string"&&(w.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(w.effort=d.effort),typeof d.session_id=="string"?w.session_id=d.session_id:typeof d.thread_id=="string"&&(w.session_id=d.thread_id),typeof d.turn_id=="string"&&(w.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(w.completed_at=d.completed_at),_.replayed===!0&&(w.replayed=!0),Ks(n[f],w,!1),Ks(r[w.role][f],w,!1)}}let i={};for(let l of["claude","codex"]){let a=n[l];if(a.legs.length===0)continue;let u=bu(a,!1);l==="claude"&&a.outer_count>0&&a.outer_cost_count===a.outer_count&&(u.total_cost_usd=a.outer_cost),i[l]=u}if(Object.keys(i).length===0)return null;let s={};for(let l of["orchestrator","implementation","review-consult","subagent"]){let a={};for(let u of["claude","codex"]){let d=r[l][u];d.legs.length>0&&(a[u]={...bu(d,!0),legs:d.legs})}Object.keys(a).length>0&&(s[l]=a)}return{providers:i,roles:s}}var ng=".chip-popover, .judgement-chip";function lo(e){let t=null,n=!1;function r(d){return t!==null&&t.bead_id===d.bead_id&&t.chip_key===d.chip_key}function o(d){t=r(d)?null:{...d},e()}function i(){t!==null&&(t=null,e())}function s(d){let f=d.target;t!==null&&(f&&typeof f.closest=="function"&&f.closest(ng)||i())}function l(d){d.key==="Escape"&&i()}function a(){n||(n=!0,document.addEventListener("click",s),document.addEventListener("keydown",l))}function u(){n&&(n=!1,document.removeEventListener("click",s),document.removeEventListener("keydown",l))}return{toggle:o,close:i,isOpen:r,attach:a,detach:u}}function co(e){return c`<div
    class="chip-popover"
    role="dialog"
    aria-label=${e.title}
  >
    <div class="chip-popover__title">${e.title}</div>
    <ul class="chip-popover__lines">
      ${e.lines.map(t=>c`<li>${t}</li>`)}
    </ul>
  </div>`}var vu={running:3,paused:2,failed:1};function nr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function ku(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="review_session"||r.status!=="running")continue;let o=typeof r.started_at=="number"?r.started_at:null,i=n.get(r.bead_id);i&&(i.started_at??0)>(o??0)||n.set(r.bead_id,{attempt:r,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:o})}return n}function wu(e,t){let n=Object.values(e||{}),r=new Set,o=new Map;for(let s of n)!s||typeof s.bead_id!="string"||(typeof s.resumed_from=="string"&&s.resumed_from.length>0&&r.add(s.resumed_from),nr(s)&&o.set(s.bead_id,s.attempt_id));let i=new Map;for(let s of n){if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s))continue;let l=null;if(s.status==="running")l="running";else if(s.status==="paused"&&!r.has(s.attempt_id))l="paused";else if(s.status==="failed"||s.status==="orphaned"){let d=t.get(s.bead_id),f=typeof d=="number"&&d>0&&typeof s.finished_at=="number"&&d>=s.finished_at;o.get(s.bead_id)===s.attempt_id&&!f&&typeof s.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof s.started_at=="number"?s.started_at:null,u=i.get(s.bead_id);if(u){let d=vu[u.run_state],f=vu[l];if(d>f||d===f&&(u.started_at??0)>(a??0))continue}i.set(s.bead_id,{attempt:s,run_state:l,started_at:a})}return{winners:i,resumed_from_ids:r}}var Ys=["workflow_mode","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],rg=["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"],Da=[...Ys.filter(e=>e!=="impl_dispatch"),...rg,"bdui_url"];function $u(e){let t;try{t=new URL(e)}catch{return!1}return(t.protocol==="http:"||t.protocol==="https:")&&e===t.origin}var Pn=["orchestration_model","orchestration_effort","orchestration_speed"],uo=["quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"],La=Object.freeze({orchestration_model:"quick_fix_orchestration_model",orchestration_effort:"quick_fix_orchestration_effort",orchestration_speed:"quick_fix_orchestration_speed",impl_dispatch:"quick_fix_impl_dispatch",impl_runtime:"quick_fix_impl_runtime",impl_model:"quick_fix_impl_model",impl_effort:"quick_fix_impl_effort",impl_speed:"quick_fix_impl_speed"}),po=[...Ys,...Pn],og=Da.filter(e=>po.includes(e));function sg(e,t){let n={},r=[];for(let[i,s]of Object.entries(La)){let l=e[i];if(!Object.hasOwn(e,i)){n[s]=null;continue}let a=t[s];if(typeof l!="string"||!Array.isArray(a)||!a.includes(l)){n[s]=null,r.push(`lane_incompatible:${s}`);continue}n[s]=l}let o=Object.keys(e).filter(i=>!Object.hasOwn(La,i));return{values:n,warnings:r,skipped_keys:o}}var Mo=["delegated","main"],Vs=["inherit","claude","codex"],Gn=["default","fast"],qo=["standard","fast_track"],No=["codex","opus","fable","self","skip"],Qs=["codex","fable","skip"],Xs=["low","medium","high","xhigh"],xu=["default","fast"],$n="auto";function mn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Au(e){if(!mn(e)||!mn(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))mn(r)&&mn(r.models)&&t.push([n,Object.keys(r.models)]);return t}function fo(e,t){let n=Au(e),r=t&&t!=="inherit"?n.filter(([o])=>o===t):n;return[$n,...r.flatMap(([,o])=>o)]}function Su(e,t,n,r){if(!mn(e)||!mn(e.runners))return[$n];let o=[];for(let[i,s]of Object.entries(e.runners))if(!(!mn(s)||!mn(s.models))&&!(t&&t!=="inherit"&&i!==t))for(let[l,a]of Object.entries(s.models)){if(n&&n!==$n&&l!==n)continue;let u=r(s,a);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!o.includes(d)&&o.push(d)}return[$n,...o]}function Pr(e,t,n){return Su(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function Zs(e,t,n){return Su(e,t,n,(r,o)=>mn(o)&&Array.isArray(o.orchestration_efforts)?o.orchestration_efforts:mn(o)&&Array.isArray(o.efforts)?o.efforts:r.efforts)}function _o(e,t){let n=Au(e);return(t?n.filter(([o])=>o===t):n).flatMap(([,o])=>o)}function Eu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},o=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return o&&(r.impl_model&&!fo(t,o).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Pr(t,o,r.impl_model||$n).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var ig={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",spec_review_speed:"\uC2A4\uD399 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},ag={quick_fix_orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",quick_fix_orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",quick_fix_orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",quick_fix_impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",quick_fix_impl_runtime:"\uC704\uC784 \uB300\uC0C1",quick_fix_impl_model:"\uBAA8\uB378",quick_fix_impl_effort:"effort",quick_fix_impl_speed:"\uC18D\uB3C4"},Pa=[...og,...Pn],lg=[...po,...Da].filter((e,t,n)=>n.indexOf(e)===t&&!Pa.includes(e));function Tu(e,t){let n=mn(e)?e:{},r=mn(t)?t:{},o=[];for(let s of Pa){let l=n[s]??null,a=r[s]??null;l!==a&&o.push({key:s,label:ig[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}let i=[];for(let s of[...lg,...Object.keys(r)])!Pa.includes(s)&&!i.includes(s)&&Object.hasOwn(r,s)&&i.push(s);return{rows:o,ignored_keys:i}}function Cu(e,t,n){let r=mn(e)?e:{},o=sg(mn(t)?t:{},n),i=[];for(let s of Object.values(La)){let l=r[s]??null,a=o.values[s]??null;l!==a&&i.push({key:s,label:ag[s]||s,before:l,after:a,kind:l===null?"added":a===null?"removed":"changed"})}return{rows:i,ignored_keys:o.skipped_keys}}function Ma(e,t,n,r,o,i,s=null){return Hs({key:e,choices:t,layer:"global",global:n,resolution_global:i,execution_defaults:r,runner_catalog:o,route:s})}function Ru(e,t){let n={};for(let r of Da){let o=e?.[r],i=t?.[r];o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}function Ou(e,t){let n={};for(let r of[...Pn,...uo]){let o=e?.[r]??null,i=t?.[r]??null;o!==i&&(n[r]=typeof i=="string"&&i.length>0?i:null)}return n}var qa=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Pn]}],mr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",spec_review_speed:"\uC0AC\uC591 \uB9AC\uBDF0 \uC18D\uB3C4",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",plan_review_speed:"\uACC4\uD68D \uB9AC\uBDF0 \uC18D\uB3C4",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_review_speed:"\uAD6C\uD604 \uB9AC\uBDF0 \uC18D\uB3C4",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Js={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Na(e,t,n,r,o,i=null){let s=En({pin:t,global:n,execution_defaults:r,runner_catalog:o,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:i});return e.map(l=>({key:l,...s[l]}))}function Iu(e,t,n,r,o,i=null){let s={pin:0,global:0,base:0};for(let l of Na(e,t,n,r,o,i))s[l.source]+=1;return s}function Lu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Pu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var ex=[...Ys,...Pn];var Du=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","spec_review_speed","plan_review_model","plan_review_effort","plan_review_speed","impl_review_model","impl_review_effort","impl_review_speed","impl_runtime","impl_model","impl_effort"];function jo(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function ei(e){if(!jo(e)||!jo(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>jo(n)&&jo(n.models));return t.length>0?t:null}function Dn(e,t){let n=ei(e);if(!n||!t)return null;for(let[r,o]of n)if(Object.hasOwn(o.models,t))return r;return null}function Mu(e,t){return jo(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function qu(e,t){let n=ei(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Mu(r,r.models[t]);return[]}function cg(e){let t=ei(e);if(!t)return[];let n=[];for(let[,r]of t)for(let o of Object.values(r.models))for(let i of Mu(r,o))n.includes(i)||n.push(i);return n}function ug(e,t){if(!t)return cg(e);let r=ei(e)?.find(([i])=>i===t)?.[1];if(!r)return[];let o=[];for(let i of Object.keys(r.models))for(let s of qu(e,i))o.includes(s)||o.push(s);return o}function Nu(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},o=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!o)return r.impl_model="",r.impl_effort="",r;let i=Dn(t,r.impl_model);if(r.impl_model&&(!o||i!==o))return r.impl_model="",r.impl_effort="",r;let s=r.impl_model?qu(t,r.impl_model):ug(t,o);return r.impl_effort&&s.length>0&&!s.includes(r.impl_effort)&&(r.impl_effort=""),r}var ja=new Set(["unavailable","not_applicable"]);function gr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ju(e){return e.filter(t=>t!==null).join(" \xB7 ")}function hr(e,t){return t===null?null:`${mr[e]}: ${t.display} (${Js[t.source]})`}function Fa(e){return e.filter(t=>t!==null).join(`
`)}function Ba(e){if(typeof e!="object"||e===null)return null;let t=Sn(e);if(t==="")return null;let n=(r,o)=>typeof o=="string"&&o.length>0?`${r}: ${o}`:null;return{text:t,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(mr.orchestration_model,e.model),n(mr.orchestration_effort,e.effort),n(mr.orchestration_speed,e.speed)])}}function mo(e,t){let n=gr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=gr(e,"orchestration_effort"),o=gr(e,"orchestration_speed"),i=ju([Dn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,o!==null&&o.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Fa(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",hr("orchestration_model",n),hr("orchestration_effort",r),hr("orchestration_speed",o)])}}function dg(e,t){return e===null||e.value===null||ja.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function pg(e){return e===null||ja.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function fg(e){return e===null?null:e.value==="auto"?"auto":ja.has(e.resolution)?null:e.display}function Dr(e,t){if(typeof e!="object"||e===null)return null;let n=gr(e,"impl_dispatch"),r=gr(e,"impl_runtime"),o=gr(e,"impl_model"),i=gr(e,"impl_effort"),s=gr(e,"impl_speed"),l=n!==null&&n.value==="main"?"\uBA54\uC778":ju([dg(r,t??null),pg(o),fg(i),s!==null&&s.value==="fast"?"Fast":null]);return l===""?null:{text:l,title:Fa(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",hr("impl_dispatch",n),hr("impl_runtime",r),hr("impl_model",o),hr("impl_effort",i),hr("impl_speed",s)])}}var _g=Object.freeze(new Set(["push_not_contained","invalid_impl_review","premature_close","head_mismatch","foreign_deploy_unsupported","not_resolved"])),mg=Object.freeze(["delivery_unproven:"]);function ti(e){let t=e&&typeof e.reason=="string"?e.reason:"";if(t.length===0||_g.has(t))return"session";for(let n of mg)if(t.startsWith(n))return"session";return"settlement"}var gg=["hard_diagnosis","invariant_reasoning","verification_by_judgment","claude_bound"];var hg={hard_diagnosis:"\uC6D0\uC778\uC774 \uBD88\uBA85\uD655\uD558\uAC70\uB098 \uC7AC\uD604\uC774 \uBD88\uC548\uC815\uD574 \uAC00\uC124-\uAC80\uC99D \uB8E8\uD504\uAC00 \uD544\uC694\uD558\uB2E4",invariant_reasoning:"\uC815\uD569\uC131\uC774 \uC0C1\uD0DC\uAE30\uACC4\xB7\uB3D9\uC2DC\uC131\xB7\uBD88\uBCC0\uC2DD \uCD94\uB860\uC5D0 \uB2EC\uB824 \uC788\uB2E4",verification_by_judgment:"\uD14C\uC2A4\uD2B8\uAC00 \uBABB \uC7A1\uACE0 \uB9AC\uBDF0\uC5B4\uC758 \uCD94\uB860\uC73C\uB85C\uB9CC \uAC80\uC99D\uD560 \uC218 \uC788\uB2E4",claude_bound:"Claude \uC138\uC158 \uC790\uC0B0\xB7\uC758\uBBF8\uB860\uC5D0 \uAC15\uD558\uAC8C \uBB36\uC5EC \uC788\uB2E4"};function Ua(e){return(e&&Array.isArray(e.reasons)?e.reasons:[]).map(n=>hg[n]||"").filter(n=>n.length>0)}var Fu={orchestration_model:["fable"],impl_runtime:["claude"]},Wa={unapplied:"\uBBF8\uC801\uC6A9",applied:"\uC801\uC6A9\uB428",diverged:"\uCD94\uCC9C\uACFC \uB2E4\uB984"};function Bu(e){return typeof e=="object"&&e!==null?e:null}function Uu(e,t){return typeof e=="string"&&t.includes(e)?e:""}function bg(e){return typeof e!="string"?[]:e.split("+").map(t=>t.trim()).filter(t=>gg.includes(t))}function Fo(e,t=e){let n=Bu(e);if(!n)return null;let r=Uu(n.rec_orchestration_model,Fu.orchestration_model);if(r.length===0)return null;let o=Uu(n.rec_impl_runtime,Fu.impl_runtime),i={orchestration_model:r};o.length>0&&(i.impl_runtime=o);let s=Bu(t)||{},l=Object.keys(i),a=0,u=0;for(let f of l){let m=s[f];typeof m=="string"&&m.length>0&&(a+=1,m===i[f]&&(u+=1))}let d=a===0?"unapplied":u===l.length?"applied":"diverged";return{reasons:bg(n.rec_reason),rec:i,state:d}}function ni(e){if(!e||typeof e!="object")return"";let t=Ua(e),n=Wa[e.state]||"",r=["\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428"];return t.length>0&&r.push(`\uC0AC\uC720: ${t.join(" \xB7 ")}`),n.length>0&&r.push(`\uC0C1\uD0DC: ${n}`),r.join(`
`)}function ri(e){return e.replace(/\/+$/,"")}function yg(e,t){let n=ri(e),r=ri(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function oi(e,t){let n=new Set;for(let r of e)for(let o of t){if(!yg(r,o))continue;let i=ri(r),s=ri(o);n.add(i.length>=s.length?i:s)}return[...n].sort()}function za(e,t){return`${e}\0${t}`}function Wu(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let o of r)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:"parallel",position:o.queue_position});for(let o of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let i of o.items)t.set(i.id,{root_dir:i.root_dir,workspace_name:i.workspace_name,lane:o.id,position:i.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function Ha(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),o=r>0?e.slice(0,r):e;return n.some(i=>typeof i?.issue_prefix=="string"&&i.issue_prefix===o)?"internal":n.length>0&&n.every(i=>typeof i?.issue_prefix=="string")?"external":"unknown"}function Bo(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function zu(e,t,n,r){let o=n.get(e);if(!!(o&&t&&o.root_dir===t.root_dir&&o.lane===t.lane&&typeof o.position=="number"&&typeof t.position=="number"&&o.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(o)return{id:e,label:`\u{1F512} ${e} (${Bo(o)})`,location_label:Bo(o),scope:null,same_lane_ahead:!1};let s=Ha(e,r),l=s==="internal"?"\uBBF8\uC801\uC7AC":s==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${l})`,location_label:l,scope:s,same_lane_ahead:!1}}function Hu(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,o=new Map;for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=za(l.root_dir,a.id);n.set(u,{root_dir:l.root_dir,workspace_name:l.name,lane:a.id}),o.set(u,[]);for(let d of Array.isArray(a.items)?a.items:[])r.set(d.id,u)}for(let l of t)for(let a of Array.isArray(l.sublanes?.serial)?l.sublanes.serial:[]){let u=za(l.root_dir,a.id),d=Array.isArray(a.items)?a.items[0]:null,m=!!d&&d.queue_index===0&&(!Array.isArray(a.occupied_by)||a.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],_=o.get(u);if(_)for(let w of m){let R=r.get(w);R&&R!==u&&!_.includes(R)&&_.push(R)}}let i=(l,a)=>{let u=new Set,d=[l];for(;d.length>0;){let f=d.pop();if(f===a)return!0;!f||u.has(f)||(u.add(f),d.push(...o.get(f)||[]))}return!1},s=new Map;for(let[l,a]of o){let u=[];for(let d of a){let f=n.get(d);i(d,l)&&f&&u.push(f)}u.length>0&&s.set(l,u)}return s}function Ku(e,t){return za(e,t)}var vg=Object.freeze(["done","abandoned"]);function Gu(e){return!e||typeof e!="object"||Array.isArray(e)?!1:typeof e.phase=="string"&&!vg.includes(e.phase)}async function kg(e){let t=await _n(e);be(t?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",t?"success":"error",1200)}function Mr(e){return typeof e!="string"||e.length===0?"":c`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${e}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`\uB85C\uADF8 \uACBD\uB85C \uBCF5\uC0AC: ${e}`}
      @click=${()=>{kg(e)}}
    >
      ⧉
    </button></span
  >`}var Yu=Object.freeze(["spec_backed","full_plan","quick_fix"]);var wg="worker-ineligible";function Uo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Vu(e){return Uo(e).includes(wg)}var $g=new Set(Yu),Qu=new WeakMap;function go(e){return e&&typeof e=="object"?e:{}}function xg(e){let t=Qu.get(e);if(t)return t;let n=Zu(e);return Qu.set(e,n),n}function si(e,t){return(Array.isArray(e)?e:[]).findIndex(r=>r&&r.bead_id===t)}function Ag(e,t){if(e.length===0)return null;if(xg(t).has(e))return{lane:"running"};if(si(t.pr_wait,e)>=0)return{lane:"pr_wait"};let n=si(t.queue,e);if(n>=0)return{lane:"parallel",index:n};for(let r of Array.isArray(t.serial_lanes)?t.serial_lanes:[]){if(!r||typeof r.id!="string"||!/^s[1-5]$/.test(r.id))continue;let o=si(r.entries,e);if(o>=0)return{lane:r.id,index:o}}return si(t.done,e)>=0?{lane:"done"}:null}function Ka(e,t){let n=$g.has(e.route),r=e.route==="quick_fix";return{placeable:n&&!e.worker_ineligible&&!e.awaiting_user&&(r?e.has_description:e.spec==="published")&&t===null,route_ok:n,worker_ineligible:e.worker_ineligible,awaiting_user:e.awaiting_user,missing_description:r&&!e.has_description,spec:e.spec,location:t}}function Wo(e,t){let n=go(e),r=go(t),o=Jr(n),i=n.workflow?.route_source==="explicit"&&typeof n.workflow.route=="string"&&n.workflow.route||(typeof go(n.metadata).route=="string"?go(n.metadata).route:""),s=i==="quick_fix",l=!Object.hasOwn(n,"description")||typeof n.description=="string"&&n.description.trim().length>0,a=Object.hasOwn(n,"labels")&&Vu(n.labels),u=Object.hasOwn(go(n.metadata),"awaiting_user"),d=Ag(typeof n.id=="string"?n.id:"",r);return Ka({route:i,spec:s?"n/a":o.conflict?"conflict":o.evidence,has_description:l,awaiting_user:u,worker_ineligible:a},d)}function qr(e){let t=e.location;if(t)switch(t.lane){case"running":return"\uC2E4\uD589 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"pr_wait":return"PR \uB300\uAE30 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"done":return"\uC644\uB8CC \uB808\uC778\uC5D0 \uC788\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4";case"parallel":return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uBCD1\uB82C #${t.index+1}`;default:return`\uC774\uBBF8 \uB300\uAE30 \uC911 \xB7 \uC9C1\uB82C ${t.lane.slice(1)} #${t.index+1}`}return e.placeable?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":e.route_ok===!1?"route\uAC00 \uC815\uD574\uC9C0\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.worker_ineligible?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.awaiting_user?"\uC0AC\uC6A9\uC790 \uB9AC\uBDF0\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC774\uB77C \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.missing_description?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":e.spec==="conflict"?"spec \uACBD\uB85C\uAC00 \uCDA9\uB3CC\uD574 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uBC1C\uD589\uB418\uC9C0 \uC54A\uC544 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}function zo(e){let t=go(e),n=typeof t.serial_lane_count=="number"&&Number.isInteger(t.serial_lane_count)&&t.serial_lane_count>0?Math.min(t.serial_lane_count,5):0,r=Array.isArray(t.serial_lanes)?t.serial_lanes:[],o=[];for(let s of r){if(o.length>=n)break;!s||typeof s.id!="string"||!/^s[1-5]$/.test(s.id)||!Array.isArray(s.entries)||o.push({id:s.id,label:`\uC9C1\uB82C ${s.id.slice(1)}`,count:s.entries.length})}return o.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(t.queue)?t.queue:[]).length},...o]}function Xu(e){return/^s[1-5]$/.test(e)?`\uC9C1\uB82C ${e.slice(1)}`:"\uBCD1\uB82C"}function li(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function td(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Nr(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),o=n%60;return`${r}\uC2DC\uAC04 ${o}\uBD84`}function nd(e,t){if(typeof e!="object"||e===null)return[];let n=!1,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;i.bead_id!==t||i.kind!=="review_session"||(n=!0,r=r||i.origin==="auto")}return n?[r?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"]:[]}function Ju(e){return e==="auto"||e==="click"?e:null}function rd(e,t){if(typeof e!="object"||e===null)return{active:!1,failure:null,origin:null};let n=!1,r=null,o=-1,i=null,s=null,l=-1;for(let a of Object.values(e)){if(typeof a!="object"||a===null)continue;let u=a;if(u.bead_id!==t||u.kind!=="review_session")continue;if(u.status==="pending"||u.status==="running"){n=!0;let f=typeof u.started_at=="number"?u.started_at:0;f>=o&&(o=f,r=Ju(u.origin));continue}if(u.status!=="failed")continue;let d=typeof u.finished_at=="number"?u.finished_at:0;d>=l&&(l=d,i=typeof u.cause=="string"&&u.cause.length>0?u.cause:null,s=Ju(u.origin))}return n?{active:!0,failure:null,origin:r}:{active:!1,failure:i,origin:s}}function od(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let o of Object.values(e)){if(typeof o!="object"||o===null)continue;let i=o;if(i.bead_id!==t)continue;let s=i.started_at,l=i.finished_at;typeof s!="number"||typeof l!="number"||!Number.isFinite(s)||!Number.isFinite(l)||l<s||(n+=l-s,r=!0)}return r?n:null}function ci(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Sg(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let o=null;for(let s of n)s.kind!=="deploy"||s.state!=="succeeded"||typeof s.target_sha!="string"||(!o||(typeof s.finished_at=="number"?s.finished_at:0)>(typeof o.finished_at=="number"?o.finished_at:0))&&(o=s);let i=n.filter(s=>s.state==="failed"&&!s.dismissed&&!s.superseded_by).length+r.length;return{deploy:o?{sha:li(o.target_sha),at:typeof o.finished_at=="number"?o.finished_at:null,elapsed_ms:typeof o.elapsed_ms=="number"?o.elapsed_ms:null}:null,unresolved:i,badge:i>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${i}`}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function sd(e,t){let n=Sg(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?tn(n.deploy.at):""}
            >${ci(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Nr(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ho(e){let t=fn(e.created_at),n=fn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${tn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${tn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Eg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="abandoned"?"\uD3D0\uAE30 \uD3EC\uAE30\uB428":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ko(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Go(e,t){return t.kind==="stale_work_backup_fresh"?`${e}: \uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uC740 \uB9CC\uB4E4\uC5B4\uC9C0\uC9C0 \uC54A\uC558\uACE0 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4. \uBC31\uC5C5\uACFC \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function ui(e){return e.kind==="stale_work_backup_fresh"?`\uBC31\uC5C5 \uD3EC\uAE30\uB428 \xB7 \uAE30\uC874 \uC791\uC5C5\uC740 \uADF8\uB300\uB85C \uB0A8\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`:`\uD3D0\uAE30 \uD3EC\uAE30\uB428 \xB7 \uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 (\uC6D0\uC778: ${e.last_error})`}function di(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function id(e){return e?.startsWith("orphan_gitlink_content:")?`\uB9E4\uD551 \uC5C6\uB294 gitlink \uACBD\uB85C ${e.slice(23)}\uC5D0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC800\uC7A5\uC18C\uC5D0\uC11C \uADF8 \uACBD\uB85C\uB97C \uC815\uB9AC\uD55C \uB4A4 \uC7AC\uC2DC\uB3C4\uD558\uAC70\uB098 \uD3EC\uAE30\uD558\uC138\uC694`:e==="dirty_submodule"?"\uC11C\uBE0C\uBAA8\uB4C8\uC5D0 \uBBF8\uCEE4\uBC0B \uBCC0\uACBD\uC774\uB098 \uBBF8\uCD08\uAE30\uD654 \uD56D\uBAA9\uC774 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC \uD6C4 \uC7AC\uC2DC\uB3C4\uD558\uC138\uC694":e==="submodule_observation_failed"?"\uC11C\uBE0C\uBAA8\uB4C8 \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (git \uC624\uB958) \u2014 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C git \uBA85\uB839\uC744 \uC9C1\uC811 \uD655\uC778\uD558\uC138\uC694":null}function rr(e,t,n={}){let o=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&Gu(m)).sort((m,_)=>(m.requested_at||0)-(_.requested_at||0)).at(-1),i=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof o?.attempt_id=="string"?o.attempt_id:null,s=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof o?.last_error=="string"?o.last_error:null,a=o?Eg(o.phase):null,u=o?.kind==="stale_work_backup_fresh",d=id(l),f=n.merged||o?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!s&&(!o||!!l),label:u?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:s||(l?d?`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 ${d}`:u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:o?`${a||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:f==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:i,operation:o||null,progress:a,error:l,confirmation:f,abandon:{action:!!o&&o.phase==="requested"&&!!l,label:u?"\uBC31\uC5C5 \uD3EC\uAE30":"\uD3D0\uAE30 \uD3EC\uAE30",title:u?"\uC2E4\uD328\uD55C \uBC31\uC5C5 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uC6D0\uBCF8\uC740 \uADF8\uB300\uB85C \uB0A8\uACE0 \uC0C8\uB85C \uC2DC\uC791\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30 \uC791\uC5C5\uC744 \uD3EC\uAE30\uD569\uB2C8\uB2E4 \u2014 \uBC31\uC5C5\xB7\uD3D0\uAE30\uB294 \uC218\uD589\uB418\uC9C0 \uC54A\uC558\uACE0 bead\uB294 \uD3D0\uAE30 \uC774\uC804 \uC0C1\uD0DC\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4"}}}function ad(e){if(!e||e.quickfix_lane!==!0)return!1;let t=e.quickfix_landing;return!t||typeof t!="object"?!1:["repo_operations","branch_cleanup","parent_close"].includes(t.cursor)}function ai(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=id(t.error),o=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,i=n.original_pr,s=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span
          >폐기 실패: ${t.error}${r?` \u2014 ${r}`:""}</span
        >`:""}
    <code>작업: ${n.operation_id}</code>
    ${o?c`<code>백업: ${o}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${i?.url?c`<a href=${i.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${i.number||"?"}</a
        >`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${s.number||"?"} ·
          ${s.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Tg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ld(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,o=r.residue==="branch"?"branch":"worktree",i=r.state==="unique"?"unique":"unknown",s=r.summary&&typeof r.summary=="object"?r.summary:{};function l(u){return Number.isInteger(s[u])?Number(s[u]):0}let a=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:o,state:i,title:o==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":i==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Tg[a]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:o==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function pi(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Ho(e,t){let n=`worker-dep worker-dep--${t}${e.foreign?" worker-dep--foreign":""}`;return e.openable===!0?c`<button
        type="button"
        class=${`${n} worker-dep__open`}
        data-dep-id=${e.id}
        data-root-dir=${e.root_dir||""}
        title=${e.title||""}
      >
        ${e.label}
      </button>`:c`<span class=${n} title=${e.title||""}>${e.label}</span>`}function Cg(e){return{id:e.id,label:`\u29C9 ${e.id}`,title:[`\uACB9\uCE68 \xB7 ${e.location_label}`,...e.prefixes].join(`
`),openable:!0,...e.root_dir?{root_dir:e.root_dir}:{}}}function Ga(e){return Array.isArray(e)?e.slice().sort((t,n)=>t.id<n.id?-1:t.id>n.id?1:0):[]}function Rg(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker"
    data-chip-key="spec_after_blocker"
    aria-expanded=${t?"true":"false"}
    title="선행의 결과가 설계 전제라 스펙도 선행 뒤에 씁니다"
  >
    스펙 대기
  </button>`:""}function cd(e){if(!Object.hasOwn(e,"route_ok")||e.queue_placeable===!0)return null;let t="";return e.route_ok===!1&&(t="\uB77C\uC6B0\uD305 \uD544\uC694"),t.length===0&&(e.worker_ineligible===!0||e.awaiting_user===!0)||(t.length===0&&e.missing_description===!0?t="\uBCF8\uBB38 \uD544\uC694":t.length===0&&e.placement_spec==="conflict"?t="\uC2A4\uD399 \uCDA9\uB3CC":t.length===0&&Object.hasOwn(e,"placement_spec")&&e.placement_spec!=="published"&&(t="\uC2A4\uD399 \uBBF8\uBC1C\uD589"),t.length===0)?null:{label:t,title:qr({placeable:!1,route_ok:e.route_ok,worker_ineligible:e.worker_ineligible===!0,awaiting_user:e.awaiting_user===!0,missing_description:e.missing_description===!0,spec:e.placement_spec})}}function Og(e,t){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__readiness"
    data-chip-key="readiness"
    aria-expanded=${t?"true":"false"}
    title=${e.title}
  >
    ${e.label}
  </button>`:""}function fi(e,t=""){if(!e)return t===""?"":c`<div class="worker-deps worker-deps--primary">
          ${t}
        </div>`;let n=Ga(e.predecessors),r=Array.isArray(e.released)?e.released:[],o=Ga(e.dependents),i=Ga(e.overlaps),s=e.scope_missing===!0,l=e.armed_lane||null,a=!!l||n.length>0||o.length>0||t!=="",u=r.length>0||i.length>0||s;return!a&&!u?"":c`${a?c`<div class="worker-deps worker-deps--primary">
        ${l?c`<span
              class=${`worker-dep worker-dep--armed${l.orphan?" worker-dep--armed-orphan":""}`}
              title=${l.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
              >${l.orphan?c`${l.label}<button
                      type="button"
                      class="worker-dep__label mon2-arm__release"
                      data-lane-id=${l.lane_id}
                    >
                      해제
                    </button>`:l.label}</span
            >`:""}${n.map(d=>Ho(d,"pred"))}${t}${o.map(d=>Ho(d,"dependents"))}
      </div>`:""}${u?c`<div class="worker-deps worker-deps--secondary">
        ${r.map(d=>Ho(d,"released"))}${i.map(d=>Ho(Cg(d),"overlap"))}${s?c`<span
              class="worker-dep worker-dep--muted"
              title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
              >scope 없음</span
            >`:""}
      </div>`:""}`}function ud(e,t=""){let n=(Array.isArray(e)?e:[]).filter(r=>typeof r=="string"&&r!=="").slice().sort();return n.length===0?"":c`<div class="worker-deps worker-deps--secondary">
    ${n.map(r=>Ho({id:r,label:`\uC774\uC6D4 \u2192 ${r}`,title:`\uC774\uC6D4\uB41C \uD6C4\uC18D ${r} \uC5F4\uAE30`,openable:!0,...t?{root_dir:t}:{}},"dependents"))}
  </div>`}function _i(e){return e?c`<button
    type="button"
    class="worker-dep worker-dep--lane mon-lane__chip"
    data-lane-id=${e.lane_id}
    title="이 연결 레인으로 이동"
  >
    ${e.label}
  </button>`:""}function mi(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function Ig(e,t=!1){let n=e?e.quick_fix_review:null;if(!n)return"";let r=n.state;if(r!=="reviewed"&&r!=="stale")return"";let o=Array.isArray(n.missing)?n.missing:[],i=[r==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...o].join(`
`);return c`<button
    type="button"
    class="ctl-chip judgement-chip worker-card__qfr worker-card__qfr--${r}"
    data-chip-key="qfr"
    aria-expanded=${t?"true":"false"}
    title=${i}
  >
    ${r==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}
  </button>`}function dd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function gi(e,t=!1){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__rec"
    data-chip-key="rec"
    data-state=${e.state}
    aria-expanded=${t?"true":"false"}
    title=${ni(e)}
  >
    ${"\uBCF5\uC7A1"}
  </button>`:""}var Lg={absent:"\uC2E4\uD589 \uC601\uC218\uC99D\uC774 \uAE30\uB85D\uB418\uC9C0 \uC54A\uC558\uB2E4 \u2014 \uACFC\uAC70 Bead\xB7\uC678\uBD80 \uACBD\uB85C PR\uC740 \uC6D0\uB798 \uC5C6\uB2E4",unparsable:"\uC601\uC218\uC99D \uAC12\uC744 \uC77D\uC744 \uC218 \uC5C6\uB2E4 \u2014 40hex SHA\uB098 `delegated:`/`main:` \uD615\uC2DD\uC774 \uC544\uB2C8\uB2E4",effort_unknown:"effort \uD1A0\uD070\uC774 harness \uC5B4\uD718 \uBC16\uC774\uB2E4 \u2014 \uBAA8\uB378\xB7SHA\xB7unit\uC740 \uC720\uD6A8\uD558\uB2E4",main_reason_retired:"`main:` \uC0AC\uC720\uAC00 \uACE0\uC815 4\uD1A0\uD070(bead\xB7quick_fix_default\xB7phase_line\xB7takeover) \uBC16\uC774\uB2E4",main_receipt_unbacked:"`main:` \uC0AC\uC720\uB97C \uB4B7\uBC1B\uCE68\uD558\uB294 \uBA54\uD0C0\uB370\uC774\uD130(impl_dispatch\xB7route\xB7planned_execution\xB7quick_fix \uAE30\uBCF8 dispatch)\uAC00 \uC5C6\uB2E4",takeover_lineage_missing:"`main:takeover`\uC778\uB370 resolved \uBAA8\uB378\uACFC \uC77C\uCE58\uD558\uB294 \uC644\uB8CC\uB41C \uC704\uC784 \uC138\uC158\uC774 \uC5C6\uB2E4",takeover_lineage_unobservable:"`main:takeover`\uC778\uB370 \uC704\uC784 \uACC4\uBCF4\uB97C \uBAA8\uB2C8\uD130\uAC00 \uBCFC \uC218 \uC5C6\uB2E4(Codex \uBC16 \uB7F0\uD0C0\uC784)"};function Pg(e,t=!1){let n=pd(e);if(n.length===0)return"";let r=n.length>1?`\uC601\uC218\uC99D \xB7 ${n[0]} +${n.length-1}`:`\uC601\uC218\uC99D \xB7 ${n[0]}`;return c`<button
    type="button"
    class="ctl-chip ctl-chip--label judgement-chip worker-card__receipt"
    data-chip-key="receipt"
    data-bead-id=${e.id}
    aria-expanded=${t?"true":"false"}
    title=${n.join(", ")}
  >
    ${r}
  </button>`}function pd(e){let t=e.receipt_badge?e.receipt_badge.codes:null;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function fd(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function hi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function Dg(e){let t=Array.isArray(e.badges)?e.badges:[],n=cn(e.usage),r=er(e.usage),o=fn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line${e.search_match===!1?" is-dimmed":""}"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${fd(e.pr_url,e.pr_number)}${o?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${tn(e.done_at)}`}
            >완료 ${o}</span
          >`:""}
      ${t.map(i=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${i}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    ${ud(e.carried_to,e.root_dir)}
    <div class="worker-mini__row3">
      ${n.length>0?n.map(i=>c`<span class="worker-usage" title=${i.tooltip}
                >${i.label}</span
              >`):r?c`<span class="worker-usage" title=${Do(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${td(e.work_kind)}
            >작업 ${Nr(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function bo(e,t={}){if(!(e.draggable!==!0||e.done===!0))return c`<span class="worker-mini__rowops">
    ${t.nudgeable===!0?c`<button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-up"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 위로"
            aria-label="한 칸 위로"
          >
            ↑
          </button>
          <button
            type="button"
            class="op-btn op-btn--icon worker-mini__rowops-down"
            data-bead-id=${e.id}
            title="같은 레포 안에서 한 칸 아래로"
            aria-label="한 칸 아래로"
          >
            ↓
          </button>`:""}
    <button
      type="button"
      class="op-btn op-btn--icon worker-mini__rowops-remove"
      data-action="queue-remove"
      data-bead-id=${e.id}
      title="대기에서 빼기"
      aria-label="대기에서 빼기"
    >
      ✕
    </button>
  </span>`}function Mn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return Dg(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],o=cn(e.usage),i=er(e.usage),s=e.merge_step||null,l=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work||e.discard?.abandon.action===!0,a=e.lane==="done"&&!l,u=a?fn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",f=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,w=e.lane==="done"?"":mi(e.workflow),R=e.lane==="done"?"":dd(e.from_id),I=hi(e.priority),U=c`<span class="worker-mini__title">${e.title}</span>`,ie=fd(e.pr_url,e.pr_number),z=r.map(lt=>lt===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${lt}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${lt===e.completion_badge&&e.completion_title||""}
          >${lt}</span
        >`),j=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",O=o.length>0?o.map(lt=>c`<span class="worker-usage" title=${lt.tooltip}
              >${lt.label}</span
            >`):i?c`<span class="worker-usage" title=${Do(e.usage)}
            >${i}</span
          >`:"",q=s?c`<span
        class="merge-step${s.failed?" merge-step--failed":""}"
        style=${`--progress: ${s.percent}%`}
        >${s.label}${s.index>0?c`<span class="merge-step__n"
              >${s.index}/${s.total}</span
            >`:""}</span
      >`:"",W=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",Y=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",N=e.discard,F=N?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${N?.attempt_id||""}
          data-operation-id=${N?.operation?.operation_id||""}
          data-discard-mode=${N?.confirmation||"unmerged"}
          ?disabled=${N?!N.enabled:e.discard_enabled===!1}
          title=${N?N.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${N?.label||"\uD3D0\uAE30"}
        </button>`:"",H=N?.abandon.action?c`<button
        type="button"
        class="worker-mini__discard-abandon"
        data-bead-id=${e.id}
        data-operation-id=${N.operation.operation_id}
        data-operation-kind=${N.operation.kind||""}
        data-last-error=${N.error||""}
        title=${N.abandon.title}
      >
        ${N.abandon.label}
      </button>`:"",G=e.resolve_action?c`<button
        type="button"
        class="worker-mini__resolve"
        data-bead-id=${e.id}
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC2E4\uD328\uD55C \uC791\uC5C5\uC744 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork)"}
      >
        세션에서 해결
      </button>`:"",ee=N?.abandon.action?c`${F}${H}${G}`:c`${G}${F}`,ye=e.stale_work||null,qe=ye?c`${ye.can_resume||ye.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ye.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ye.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ye.action_id}
            ?disabled=${ye.locked}
          >
            다시 확인
          </button>`:""}`:"",B=ye?c`<div class="worker-mini__stale">
        <strong>${ye.title}</strong>
        <span>${ye.summary}</span>
        <span>${ye.cause}</span>
        ${ye.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Q=e.revise_action?c`<button
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
        </button>`:"",Ae=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Se=gi(e.rec,br(e,"rec")),C=Pg(e,br(e,"receipt")),re=_i(e.cross_lane_chip),ke=Mr(e.log_path),ve=m||re||w||R||Ae||Se||C||O||ke?c`<div class="worker-chips">
          ${m}${re}${w}${R}${Ae?pi(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${Se}${C}${O}${ke}${ii(e)}
        </div>`:"",Me=fi(e.dependency_chips),he=ai(e),Le=t.actions?t.actions:"",Je=!!(s||e.merge_action||e.cancel_action||e.resolve_action||e.discard_action||N?.operation||e.revise_action||ye);return c`<div
    class="worker-mini${l?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${s?" worker-mini--merging":""}${s?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}${e.search_match===!1?" is-dimmed":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">
            ${m}${_}${I}${R}${ie}${U}${Le}
          </div>
          ${ud(e.carried_to,e.root_dir)}
          <div class="worker-mini__row2">
            ${O}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${tn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${td(e.work_kind)}
                  >작업 ${Nr(e.work_ms)}</span
                >`:""}${z}${q}
            <span class="worker-mini__actions"
              >${W}${Y}${ee}</span
            >
            ${ho(e)}
          </div>`:l?c`<div class="worker-mini__head">
              ${d}${f}${_}${I}${ie}${z}${j}${Le}
            </div>
            <div class="worker-mini__body">${U}${B}</div>
            ${Me}${ve}${Je?c`<div class="worker-mini__foot">
                  ${q}
                  <span class="worker-mini__actions"
                    >${W}${Y}${ee}${Q}${qe}</span
                  >
                  ${ai(e)}
                </div>`:""}
            ${ho(e)}`:c`<div class="worker-mini__line">
              ${d}${f}${_}${I}${U}${ie}${z}${j}${q}${W}${Y}${ee}${Le}
            </div>
            ${Me}${ve}${he} ${ho(e)}`}
  </div>`}function Va(e,t){let n,r=[];for(let o of e){let i=o.group||"";i.length>0&&i!==n&&r.push(c`<div class="worker-card__place-group">${i}</div>`),n=i,r.push(c`<button
        type="button"
        class="worker-card__place-lane${i.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${o.id}
        ?disabled=${o.disabled===!0}
        title=${o.title||`${o.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${o.label}</span>
        ${typeof o.count=="number"?c`<span class="worker-card__place-count">${o.count}</span>`:""}
      </button>`)}return c`${r}`}var _d={external_roundtrip:"\uD558\uB124\uC2A4 \uBC16 \uC0C1\uB300\uC640 \uC608\uCE21 \uBD88\uAC00 \uC655\uBCF5 \uBC18\uBCF5 \u2014 \uB2E4\uB978 rig \uC138\uC158\xB7\uC0AC\uB78C\xB7\uC678\uBD80 \uC2DC\uC2A4\uD15C",user_feedback_loop:"\uC9C4\uD589 \uC911 \uC0AC\uC6A9\uC790 \uD53C\uB4DC\uBC31 \uC5C6\uC774\uB294 \uD488\uC9C8\uC774 \uB0AE\uC74C \u2014 \uBB38\uC548\xB7\uC124\uACC4 \uC138\uBD80\xB7\uBC29\uD5A5 \uC120\uD0DD"};function Qa(e,t){if(t==="rec"){let n=e.rec;if(!n)return null;let r=Wa[n.state]||"";return{title:"\uBCF5\uC7A1\uD55C \uC791\uC5C5\uC73C\uB85C \uD310\uC815\uB428",lines:[...Ua(n),...r.length>0?[`\uC0C1\uD0DC: ${r}`]:[],"\uC801\uC6A9\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uC2E4\uD589 \uC124\uC815 \uD3B8\uC9D1\uAE30\uC5D0\uC11C"]}}if(t==="session_preferred"){if(e.session_preferred!==!0)return null;let n=_d[e.session_preferred_reason||""]||"";return{title:"\uC6CC\uCEE4\uB85C \uB3CC\uB9B4 \uC218 \uC788\uC9C0\uB9CC \uC138\uC158\uC774 \uB0AB\uB2E4",lines:n.length>0?[n]:[]}}if(t==="ineligible")return e.worker_ineligible!==!0?null:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2C8\uB2E4",lines:["worker-ineligible \uB77C\uBCA8\uC774 \uBD99\uC5B4 \uC788\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="spec_after_blocker")return e.spec_after_blocker!==!0?null:{title:"\uC120\uD589 \uACB0\uACFC\uAC00 \uC124\uACC4 \uC804\uC81C \u2014 \uC2A4\uD399\uB3C4 \uC120\uD589 \uB4A4\uC5D0",lines:[`\uC120\uD589: ${(Array.isArray(e.blocked_by)?e.blocked_by:[]).join(" \xB7 ")}`,"\uC120\uD589\uC774 \uB2EB\uD788\uBA74 \uC774 \uD45C\uC2DC\uB294 \uC800\uC808\uB85C \uC0AC\uB77C\uC9C4\uB2E4 \u2014 \uB77C\uBCA8\uC740 \uC774\uC288 \uC0C1\uC138\uC758 \uB77C\uBCA8 \uC808\uC5D0\uC11C \uB5C0\uB2E4"]};if(t==="readiness"){let n=cd(e);return n?{title:n.title,lines:[]}:null}if(t==="receipt"){let n=pd(e);return n.length===0?null:{title:"\uC2E4\uD589 \uC601\uC218\uC99D \uD68C\uACC4 \uC794\uC5EC \u2014 \uBA38\uC9C0\uB294 \uC9C4\uD589",lines:[...n.map(r=>Lg[r]||r),"\uC790\uB3D9 \uBA38\uC9C0 \uD310\uC815\uC5D0\uB294 \uC601\uD5A5\uC774 \uC5C6\uB2E4 \u2014 \uC815\uC815\uC740 bd update --set-metadata exec_receipt=\u2026 \uB85C"]}}if(t==="qfr"){let n=e.workflow?e.workflow.quick_fix_review:null;if(!n||n.state!=="reviewed"&&n.state!=="stale")return null;let r=Array.isArray(n.missing)?n.missing:[];return{title:n.state==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",lines:r.length>0?r:["\uBE60\uC9C4 \uD56D\uBAA9 \uC5C6\uC74C"]}}return null}var Mg=["rec","receipt","session_preferred","ineligible","qfr","spec_after_blocker","readiness"];function bi(e,t){for(let n of Mg){if(!t(n))continue;let r=Qa(e,n);return r?{chip_key:n,content:r}:null}return null}function ii(e){return e.chip_popover?co(e.chip_popover.content):""}function br(e,t){return!!e.chip_popover&&e.chip_popover.chip_key===t}var Xa="\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694";function Za(e,t=null,n={}){let r=e.worker_ineligible===!0,o=e.draggable&&!e.done&&!r,i=e.queue_placeable===!0&&!e.done&&!r,s=i&&t&&t.bead_id===e.id,l=e.session_preferred===!0,a=_d[e.session_preferred_reason||""]||"",u=e.workflow,d=e.missing_description===!0,f=e.awaiting_user===!0,m=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=br(e,"spec_after_blocker"),w=Rg(e.spec_after_blocker===!0,_),R=cd(e),I=br(e,"readiness"),U=Og(R,I),ie=c`${w}${_?ii(e):""}${U}${I?ii(e):""}`,z=fi(e.dependency_chips,w===""&&U===""?"":ie),j=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",O=_i(e.cross_lane_chip),q=mi(u),W=dd(e.from_id),Y=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),N=e.blocked===!0||e.queue_placeable===!1||r;return c`<div
    class="worker-card${o?"":" worker-card--static"}${r?" worker-card--ineligible":""}${N?" worker-card--blocked":""}${e.search_match===!1?" is-dimmed":""}"
    draggable=${o?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${o?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${hi(e.priority)}
      ${r?c`<button
            type="button"
            class="ctl-chip ctl-chip--label judgement-chip worker-card__ineligible"
            data-chip-key="ineligible"
            aria-expanded=${br(e,"ineligible")?"true":"false"}
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
          >
            worker-ineligible
          </button>`:l?c`<button
              type="button"
              class="ctl-chip ctl-chip--label judgement-chip worker-card__session-preferred"
              data-chip-key="session_preferred"
              aria-expanded=${br(e,"session_preferred")?"true":"false"}
              title=${a}
            >
              세션 권장
            </button>`:""}${gi(e.rec,br(e,"rec"))}${Ig(u,br(e,"qfr"))}
      ${_||I?"":ii(e)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${u?Fs(u,e.status,{onOpenDoc:n.onOpenDoc}):""}${z}
    ${j||O||q||W||Y?c`<div class="worker-chips">
          ${j}${O}${q}${W}${pi(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${s?c`<div class="worker-card__place-menu">
            ${Va(t.lanes,e.id)}
            <button
              type="button"
              class="op-btn op-btn--icon worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${m?" worker-card__reason--danger":""}"
                  >${e.reason}</span
                >`:""}
            <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 후보 레인에서 대기로 가는
                 유일한 경로다 (UI-d13v §6). queue_placeable 하나가 준비도
                 세그먼트와 같은 자격을 말하며, blocked 자체는 막지 않는다.
                 포인터 종류로 감추지 않는다: 드래그라는 대체 경로가 없다. -->
            <button
              type="button"
              class="op-btn op-btn--primary worker-card__place"
              data-bead-id=${e.id}
              ?disabled=${!i}
              title=${qr({placeable:i,route_ok:e.route_ok,worker_ineligible:r,awaiting_user:f,missing_description:d,spec:e.placement_spec})}
            >
              ↴ 대기로
            </button>`}
    </div>
    ${ho(e)}
  </div>`}function Yn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>
    ${typeof e.match_count=="number"?c`<span class="worker-pane__match">일치 ${e.match_count}</span>`:""}`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${dn(e.id||void 0)}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<header class="worker-pane__hd">
          <button
            type="button"
            class="worker-pane__toggle"
            data-lane=${e.lane}
            aria-expanded=${t?"false":"true"}
          >
            <span class="worker-pane__caret" aria-hidden="true"
              >${t?"\u25B8":"\u25BE"}</span
            >
            ${r}
          </button>
          ${t||!e.header_control?"":e.header_control}
        </header>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.header_row?e.header_row:""}${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(o=>e.lane==="candidate"?Za(o,e.place_menu,{onOpenDoc:e.onOpenDoc}):Mn(o))}
          </div>`}
  </section>`}function ed(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function yi(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${ed("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${dn(r.drop)}
            data-root-dir=${dn(r.root_dir)}
            data-lane-id=${dn(r.lane_id)}
            data-lane-length=${dn(r.lane_length)}
          >
            ${t.rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:t.rows}
          </div>`}
    </section>
    <section
      class="worker-wait__area worker-wait__area--serial${n.collapsed?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="worker-wait__area-hd">
        ${ed("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(o=>qg(o))}
          </div>`}
    </section>
  </div>`}function qg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Yn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,match_count:e.match_count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${dn(t.drop)}
        data-root-dir=${dn(t.root_dir)}
        data-lane-id=${dn(t.lane_id)}
        data-lane-length=${dn(t.lane_length)}
      >
        ${e.rows.length===0?c`<div class="worker-pane__empty">
              비어 있음 — 행을 여기로 드래그
            </div>`:e.rows}
      </div>`})}
    ${e.empty?c`<div class="worker-wait__hint">${e.title} · 비어 있음</div>`:""}
    ${e.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:""}
    ${e.after?e.after:""}
  </div>`}function vi(e){return e.count?c`<section
    class="worker-now${e.live?" worker-pane--live":""}"
    id="worker-now"
  >
    <header class="worker-now__hd">
      <span
        class="worker-pane__dot worker-pane__dot--running"
        aria-hidden="true"
      ></span>
      <span class="worker-now__title">지금</span>
      <span class="worker-now__count">${e.count}</span>
    </header>
    ${e.running_body?e.running_body:""}
    ${e.pr_wait_rows?e.pr_wait_rows:""}
  </section>`:""}var md=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Yo=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"post_merge_jobs",label:"\uBA38\uC9C0 \uD6C4 \uC7A1"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function ki(e,t){let n=md.find(o=>o.step===e);if(!n)return null;let r=md.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function gd(e){let t=Yo.findIndex(n=>n.step===e);return Yo.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function jr(e){let t=Yo.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Ng(e){let t=Yo.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Yo.length}}function wi(e){let t=Ng(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var el=new Set(["queued","running","retry_pending"]),hd=new Set(["failed","succeeded"]),jg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uB300\uAE30"},Vo={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Fg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Vo.base_containment,child_sweep:Vo.child_sweep,branch_cleanup:Vo.branch_cleanup,parent_close:Vo.parent_close};function Bg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Ug(e,t,n){return!["verify","deploy"].includes(e.kind)||![...el,...hd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Wg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,o=r(t)-r(e);if(o!==0)return o;let i=typeof e.requested_at=="number"?e.requested_at:0,s=typeof t.requested_at=="number"?t.requested_at:0;if(i!==s)return s-i;let l=typeof e.operation_id=="string"?e.operation_id:"",a=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(a)}function Ja(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",o=t?"failed":e.state,i=jg[o];if(!i)return null;let s=ki(n,`${r} ${i}`);return s?{...s,active:el.has(o),failed:o==="failed"}:null}function zg(e){return!e||typeof e!="object"?null:Fg[e.step]||null}function Qo(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=zg(n),o=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,i=["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),s=!i&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),l=Bg(e.merge_sha)?e.merge_sha:null,a=!i&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(w=>w&&typeof w=="object"&&Ug(w,t,l)).sort(Wg):[],u=s?a:[],d=u.find(w=>el.has(w.state));if(d)return Ja(d);if(o)return o.step==="repo_operations"&&a[0]?Ja(a[0],!0):null;let f=u.find(w=>hd.has(w.state)?w.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(f)return Ja(f);if(r){let w=ki(r.step,r.label);return w?{...w,active:!0,failed:!1}:null}let m=typeof e.cleanup_cursor=="string"?Vo[e.cleanup_cursor]:null;if(!m)return null;let _=ki(m.step,m.label);return _?{..._,active:!0,failed:!1}:null}function $i(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Hg="\uBBF8\uC801\uC7AC";function tl(e,t){let n=Zn(e,t.id);return{id:t.id,label:`\u26D3 ${t.id}`,title:`\uC120\uD589 \u2014 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}var Kg=10080*60*1e3;function bd(e,t,n){let r=t.closed_at;if(typeof r!="number"||!Number.isFinite(r)||r<n-Kg)return null;let o=Zn(e,t.id),i=typeof t.root_dir=="string"?t.root_dir:"",s={id:t.id,label:`\u{1F513} ${t.id}`,title:`\uD574\uC81C \u2014 ${tn(r)}\uC5D0 close\uB418\uC5B4 \uC774 \uC774\uC288\uAC00 \uD480\uB838\uB2E4`,...o?{foreign:!0}:{}};return o?i.length>0&&(s.openable=!0,s.root_dir=i):s.openable=!0,s}function yd(e,t){let n=Array.isArray(t.ids)?t.ids.filter(i=>typeof i=="string"&&i.length>0):[],r=t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{},o=[];for(let i of[...new Set(n)].sort()){let s=Zn(e,i),l=typeof r[i]=="string"?r[i]:"",a={id:i,label:`\u2192 ${i}`,title:"\uD6C4\uC18D \u2014 \uC774 \uC774\uC288\uAC00 close\uB418\uBA74 \uD480\uB9B0\uB2E4",...s?{foreign:!0}:{}};l.length>0?(a.openable=!0,a.root_dir=l):s||(a.openable=!0),o.push(a)}return o}function vd(e,t,n={}){let r=new Map,o=new Map;for(let i of t)o.has(i.id)||o.set(i.id,i.location_label);for(let[i,s]of e){if(typeof i!="string"||i.length===0)continue;let l=[];for(let a of Array.isArray(s)?s:[]){if(typeof a!="string"||a.length===0)continue;let u=tl(i,{id:a,location_label:o.get(a)||Hg}),d=n[a];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),l.push(u)}l.length>0&&r.set(i,l)}return r}var Ai=1,Xo=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Zo=[{value:"all",label:"\uC804\uCCB4"},{value:"ready",label:"\uCC29\uC218 \uAC00\uB2A5"},{value:"not_ready",label:"\uC900\uBE44 \uD544\uC694"}],yo={show_blocked:!0,readiness:"all"},kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328",refuted:"\uBC18\uC99D",no_delta:"\uBB34-delta"};function Gg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!nr(r)||(n=typeof r.status=="string"?r.status:null);return n}function Yg(e,t){let n=null,r=-1/0;for(let o of Object.values(e)){if(!o||o.bead_id!==t||o.status==="running"||!nr(o))continue;let i=typeof o.finished_at=="number"?o.finished_at:typeof o.started_at=="number"?o.started_at:0;i>=r&&(r=i,n=o)}return n}function Zu(e){let t=rt(e),n=new Map;for(let r of Array.isArray(t.done)?t.done:[])r&&typeof r.bead_id=="string"&&typeof r.added_at=="number"&&n.set(r.bead_id,r.added_at);return new Set(Td(rt(t.attempts),n).keys())}function Td(e,t,n={}){let{winners:r,resumed_from_ids:o}=wu(e,t),i=new Map;for(let[s,l]of r){let a=l.attempt,u=l.run_state;if(Rd(a))continue;let d=l.started_at,f=typeof a.session_id=="string"&&a.session_id.length>0,_=ti(a.quickfix_landing)==="session",w=u!=="running"&&(f||!_)&&!o.has(a.attempt_id),R=!f&&_?"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":o.has(a.attempt_id)?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null,I=rt(n.observations?.[s]),U=rt(I.pr),ie=typeof a.merge_sha=="string"&&a.merge_sha.length>0||U.state==="MERGED",z=rr(n.discard_operations,s,{attempt_id:a.attempt_id,merged:ie}),j=u==="failed"?$d(a,{resume_eligible:w,resume_reason:R,confirmation:z.confirmation,history:n.bead_timelines?.[s]}):null;i.set(s,{...wd(a,e,u),started_at:d,...j?{failure:j}:{},can_pause:u==="running"&&f,can_resume:w})}for(let[s,l]of nh(e,t)){if(i.has(s))continue;let a=l.attempt,u=rr(n.discard_operations,s,{attempt_id:a.attempt_id}),d=Od(a),f=l.run_state==="provider_hold"?eh(a,{provider_hold:n.provider_hold,auto_resume_pending:n.auto_resume_pending,account_catalog:n.account_catalog,attempts:e,history:n.bead_timelines?.[s]}):null;i.set(s,{...wd(a,e,l.run_state),started_at:typeof a.started_at=="number"?a.started_at:null,...l.run_state==="parked"?{failure:$d(a,{resume_eligible:!1,resume_reason:"\uC138\uC158 \uB300\uAE30 \u2014 [\uC7AC\uC2DC\uB3C4]\uAC00 \uC0C8 attempt\uB97C \uB744\uC6C1\uB2C8\uB2E4",confirmation:u.confirmation,history:n.bead_timelines?.[s]})}:{},...l.run_state==="waiting"?{wait:Vg(a)}:{},...f?{hold:f}:{},...d?{retry:d}:{},can_pause:!1,can_resume:l.run_state==="provider_hold"})}return i}function wd(e,t,n){return{attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",run_state:n,last_event_at:typeof e.last_event_at=="number"?e.last_event_at:null,last_activity:e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,legs:Array.isArray(e.legs)?e.legs:[],runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,speed:typeof e.speed=="string"?e.speed:null,resumed_from:typeof e.resumed_from=="string"?e.resumed_from:null,continuation_mode:e.continuation_mode==="session"||e.continuation_mode==="fresh"?e.continuation_mode:null,status:typeof e.status=="string"?e.status:null,usage:tr(t,e.bead_id)}}function $d(e,t){let n=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null;return{cause:typeof e.cause=="string"?e.cause:null,cause_detail:n,summary:n&&typeof n.summary=="string"?n.summary:null,bead_id:typeof e.bead_id=="string"?e.bead_id:"",finished_at:typeof e.finished_at=="number"?e.finished_at:null,runner:typeof e.runner=="string"?e.runner:null,model:typeof e.model=="string"?e.model:null,effort:typeof e.effort=="string"?e.effort:null,observed_effort:typeof e.observed_effort=="string"?e.observed_effort:null,speed:typeof e.speed=="string"?e.speed:null,attempt_id:typeof e.attempt_id=="string"?e.attempt_id:"",usage:e.usage&&typeof e.usage=="object"?e.usage:null,halted_auto_advance:e.halted_auto_advance===!0,quickfix_lane:e.quickfix_lane===!0,quickfix_landing:e.quickfix_landing&&typeof e.quickfix_landing=="object"?e.quickfix_landing:null,retry:Od(e),resume_eligible:t.resume_eligible,resume_reason:t.resume_reason,landed:ad(e),confirmation:t.confirmation,...Cd(t.history)}}function Cd(e){if(!e||typeof e!="object")return{};let t=Array.isArray(e.events)?e.events:[],n=[];for(let o of t)!o||typeof o!="object"||typeof o.summary!="string"||o.summary.length===0||n.push({event_id:typeof o.event_id=="string"?o.event_id:"",kind:typeof o.kind=="string"?o.kind:"",summary:o.summary,at:typeof o.at=="number"?o.at:null});n.reverse();let r=typeof e.log_path=="string"&&e.log_path.length>0?e.log_path:null;return{...n.length>0?{timeline:n}:{},...r===null?{}:{log_path:r},...e.log_expired===!0?{log_expired:!0}:{},...e.log_unreadable===!0?{log_unreadable:!0}:{}}}function Vg(e){let t=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,n=Array.isArray(t?.blockers)?t.blockers:[],r=[];for(let o of n)!o||typeof o!="object"||typeof o.id!="string"||o.id.length===0||r.push({id:o.id,rig:typeof o.rig=="string"?o.rig:null,status:typeof o.status=="string"?o.status:""});return{summary:t&&typeof t.summary=="string"?t.summary:null,blockers:r,since:typeof e.finished_at=="number"?e.finished_at:null}}function Rd(e){return e?.status==="paused"&&typeof e.cause=="string"&&e.cause.startsWith("provider_outage:")}function Qg(e,t){let n=typeof e.runner=="string"?e.runner:"",r=rt(t)[n];return!r||!Array.isArray(r.targets)?null:r.targets.find(o=>Array.isArray(o?.attempt_ids)&&o.attempt_ids.includes(e.attempt_id))||null}function Xg(e,t){if(e===null)return null;let n=rt(t).claude;if(!Array.isArray(n))return null;let r=n.find(o=>o?.email===e);return r&&typeof r.alias=="string"&&r.alias.length>0?r.alias:null}function Zg(e,t){let n=e,r=new Set;for(;n&&!r.has(n.attempt_id);){if(r.add(n.attempt_id),n.auto_resume_kind==="provider_outage")return!0;n=typeof n.resumed_from=="string"?t[n.resumed_from]:null}return!1}function Jg(e,t,n,r){if((Array.isArray(r.auto_resume_pending)?r.auto_resume_pending:[]).some(s=>s?.attempt_id===e.attempt_id))return"pending";let i=e.auto_resume_refused;return typeof i=="string"&&i.length>0?`refused:${i}`:n.startsWith("auto_resume_disarmed:")||t?.auto_switch==="cap"||Zg(e,r.attempts)?"disarmed":null}function eh(e,t){let n=e.cause.slice(16),r=e.cause_detail&&typeof e.cause_detail=="object"?e.cause_detail:null,o=Qg(e,t.provider_hold),i=typeof o?.model=="string"&&o.model.length>0?o.model:typeof e.model=="string"&&e.model.length>0?e.model:null,s=typeof o?.account=="string"&&o.account.length>0?o.account:typeof e.claude_account=="string"&&e.claude_account.length>0?e.claude_account:null,l=typeof o?.last_error=="string"?o.last_error:"",a=Jg(e,o,l,{auto_resume_pending:t.auto_resume_pending,attempts:t.attempts}),u=typeof o?.resets_at=="number"?o.resets_at:typeof r?.resets_at=="number"?r.resets_at:null,d=typeof o?.next_probe_at=="number"?o.next_probe_at:null,f=Xg(s,t.account_catalog),m=Cd(t.history);return{kind:o?.kind==="usage_limit"||n==="usage_limit"?"usage_limit":"outage",detail:n,...typeof r?.message=="string"?{message:r.message}:{},...typeof r?.summary=="string"?{summary:r.summary}:{},...i||s?{target:{...i?{model:i}:{},...s?{account:s}:{},...f?{account_alias:f}:{}}}:{},...u===null?{}:{resets_at:u},...a===null?{}:{auto_resume:a},...o?.auto_switch==="none"||o?.auto_switch==="disabled"?{auto_switch:o.auto_switch}:{},...d===null?{}:{next_probe_at:d},...m.log_path?{log_path:m.log_path}:{}}}function Od(e){let t=e&&e.retry&&typeof e.retry=="object"?e.retry:null;return t?{cause:typeof t.cause=="string"?t.cause:null,attempts:typeof t.attempts=="number"?t.attempts:0,max:typeof t.max=="number"?t.max:0,next_at:typeof t.next_at=="number"?t.next_at:null}:null}var th=new Set(["parked","retry_wait","waiting"]);function nh(e,t){let n=Object.values(e||{}),r=new Set(n.map(s=>s?.resumed_from).filter(s=>typeof s=="string")),o=new Map;for(let s of n)s&&typeof s.bead_id=="string"&&nr(s)&&o.set(s.bead_id,s.attempt_id);let i=new Map;for(let s of n){let l=Rd(s);if(!s||typeof s.bead_id!="string"||s.bead_id.length===0||!nr(s)||!th.has(s.status)&&!l||o.get(s.bead_id)!==s.attempt_id||typeof s.dismissed_at=="number"||l&&r.has(s.attempt_id))continue;let a=t.get(s.bead_id);typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at||i.set(s.bead_id,{attempt:s,run_state:l?"provider_hold":s.status})}return i}function xd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",o=r.indexOf(":");return o>0&&o<r.length-1?`\u26D4 ${r.slice(0,o)} (${r.slice(o+1)})`:`\u26D4 ${r}`}function rt(e){return e&&typeof e=="object"?e:{}}function rh(e){let t=rt(e).badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function oh(e,t,n){let r=rt(t);if(Object.keys(r).length===0)return null;let o=e.execution_defaults,i=e.runner_catalog,s=e.session_defaults;if(!o||!i||!s)return null;let l=m=>En({pin:m,global:s,execution_defaults:o,runner_catalog:i,route:n}),a,u;try{a=l(r),u=l(null)}catch{return null}let d=Ad(mo(a,i),mo(u,i)),f=Ad(Dr(a,null),Dr(u,null));return d||f?{orchestration:d,worker:f}:null}function Ad(e,t){return!e||t&&t.text===e.text?null:e}function sh(e,t,n){let o=(t&&typeof t=="object"&&Array.isArray(t.released_by)?t.released_by:[]).filter(s=>s&&typeof s=="object"&&typeof s.id=="string").slice().sort((s,l)=>(typeof l.closed_at=="number"?l.closed_at:0)-(typeof s.closed_at=="number"?s.closed_at:0)),i=[];for(let s of o){let l=bd(e,s,n);l&&i.push(l)}return i.length===0?null:i}function ol(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var ih=new Set(["quick_fix","spec_backed","full_plan"]);function Sd(e){return typeof e=="string"&&ih.has(e)}function ah(e){let t={...rt(e.session_defaults)};for(let n of["orchestration_model","orchestration_effort","orchestration_speed","quick_fix_orchestration_model","quick_fix_orchestration_effort","quick_fix_orchestration_speed"]){let r=e[n];typeof r=="string"&&(t[n]=r)}return t}function lh(e,t,n){let r=e.runner_catalog??null,o=rl(e,t,n,null);if(!o)return null;let i=Dn(r,o.orchestration_model.value??""),s=i===null?o:rl(e,t,n,i)||o,l=mo(s,r),a=Dr(s,i);return l||a?{orchestration:l,worker:a}:null}function rl(e,t,n,r){let o=Sd(n)?n:Sd(t.route)?t.route:null;try{return En({pin:t,global:ah(e),execution_defaults:e.execution_defaults??null,runner_catalog:e.runner_catalog??null,route:o,controller_runtime:r})}catch{return null}}function ch(e,t,n){return!t||!Object.hasOwn(t,"metadata")?null:Dr(rl(e,rt(t.metadata),t.route,n),n)}function sl(e,t){let n=new Set,r=e;for(;r&&!n.has(r.attempt_id);){if(r.conflict_resolution===!0)return!0;n.add(r.attempt_id),r=typeof r.resumed_from=="string"&&r.resumed_from.length>0&&t.get(r.resumed_from)||null}return!1}function uh(e){let t={};for(let l of Kn)t[l]=0;let n=!1,r=0,o=0,i=0;for(let l of e){let a=l.usage;if(!a||typeof a!="object")continue;let u=!1;for(let d of Kn)Number.isFinite(a[d])&&(t[d]+=a[d],n=!0,u=!0);u&&(o+=1,Number.isFinite(a.total_cost_usd)&&(r+=a.total_cost_usd,i+=1))}o>0&&i===o&&(t.total_cost_usd=r);let s=e.map(l=>l.usage).filter(l=>l&&typeof l=="object"&&l.providers);return s.length>0?cn(Gs(s)):n?er(t):null}function Id(e,t){let n=Ha(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function dh(e,t,n){let r=t.get(e);if(!r)return Id(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Bo(r)}function ph(e,t,n,r){let o=t.get(e);if(!o)return{label:Id(e,n),title:""};if(typeof o.position=="number"&&(o.lane==="parallel"||/^s[1-5]$/.test(o.lane))){let s=r.get(e),l=o.lane==="parallel"?"\uBCD1\uB82C":o.lane;return{label:s&&s.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${o.workspace_name||o.root_dir} ${l} #${o.position}`}}return{label:o.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Bo(o),title:""}}function fh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function _h(e,t,n,r,o,i){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(s=>i.failed_by_bead.get(s.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:i.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(s=>i.armed_by_bead.get(s.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:o.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function mh(e,t,n,r,o,i,s){let l=[];return e.forEach((a,u)=>{let d=typeof a.id=="string"?a.id:"";if(d.length===0)return;let f=a.status==="confirmed"?"confirmed":"draft",m=Array.isArray(a.entries)?a.entries:[],_=[];m.forEach((U,ie)=>{let z=U&&typeof U.bead_id=="string"?U.bead_id:"";if(z.length===0)return;let j=U&&typeof U.root_dir=="string"?U.root_dir:"",O=n.get(z),q=O?O.state:void 0,W=q==="running"||q==="pr_wait"||q==="done",Y=!O||q==="runnable",N=O&&O.lane==="parallel"&&typeof O.position=="number"?O.position-1:null,F=ph(z,n,r,t),H=_.length>0?_[_.length-1].id:null,G=f==="confirmed"&&H!==null&&!(t.get(z)||[]).includes(H);_.push({id:z,title:o.get(z)||z,root_dir:O?O.root_dir:j,workspace_name:O?O.workspace_name:i.get(j)||"",seq:ie+1,location_label:F.label,location_title:F.title,draggable:!W,fixed:W,done:q==="done",unplaced:Y,mismatch:G,...N!==null?{queue_index:N}:{}})}),_.forEach((U,ie)=>{U.seq=ie+1});let w=_.length>0&&_.every(U=>U.done),R=_.filter(U=>!U.fixed&&s.armed_by_bead.get(U.id)!==d).map(U=>U.id),I=_h(d,f,_,w,R,s);l.push({lane_id:d,status:f,draft:f==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:_,all_done:w,can_confirm:f==="draft"&&_.length>=2,has_mismatch:f==="confirmed"&&_.some(U=>U.mismatch||U.unplaced),unlaunched:R,...I})}),l}function gh(e,t,n){if(e.lane==="runnable"){let s=n.get(e.id);return s?s.length===0?{scope:[],state:"missing"}:{scope:s,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),o=r?r[e.id]:void 0;if(!o||!Array.isArray(o.scope))return{scope:[],state:void 0};let i=o.scope.filter(s=>typeof s=="string"&&s.length>0);return{scope:i,state:i.length===0?"missing":"declared"}}function hh(e,t,n,r,o){let i=new Map;for(let a of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(a.root_dir))continue;let u=`${a.root_dir}\0${a.id}`,d=i.get(u);if(d){d.cards.push(a);continue}let{scope:f,state:m}=gh(a,t,n);m!==void 0&&(a.scope_state=m),i.set(u,{cards:[a],scope:f})}let s=new Map;for(let a of i.values()){let u=a.cards[0].scope_state;if(u!==void 0)for(let m of a.cards)m.scope_state=u;if(a.scope.length===0)continue;let d=a.cards[0].root_dir,f=s.get(d);f?f.push(a):s.set(d,[a])}let l=(a,u,d)=>{let f=u.cards[0],m={id:f.id,title:f.title,location_label:dh(f.id,r,o),prefixes:d,...typeof f.root_dir=="string"&&f.root_dir.length>0?{root_dir:f.root_dir}:{}};for(let _ of a.cards)_.overlap_chips?_.overlap_chips.push(m):_.overlap_chips=[m]};for(let a of s.values())for(let u=0;u<a.length;u+=1)for(let d=u+1;d<a.length;d+=1){let f=oi(a[u].scope,a[d].scope);f.length!==0&&(l(a[u],a[d],f),l(a[d],a[u],f))}}function Ed(e,t,n){let r=n?n.get(t)?.root_dir:void 0,o=!Zn(e.id,t),i=typeof e.root_dir=="string"?e.root_dir:"",s=typeof r=="string"&&r.length>0?r:o&&i.length>0?i:"";return s.length>0?{openable:!0,root_dir:s}:o?{openable:!0}:{}}function bh(e,t,n,r){let o=new Set(e?e.ids:[]);for(let l of t&&Array.isArray(t.ids)?t.ids:[])typeof l=="string"&&l.length>0&&o.add(l);if(o.size===0)return{ids:[]};let i={},s={...e?e.root_dirs:{},...t&&t.root_dirs&&typeof t.root_dirs=="object"?t.root_dirs:{}};for(let l of o){let a=s[l];if(typeof a=="string"&&a.length>0){i[l]=a;continue}if(!Zn(n.id,l)){n.root_dir.length>0&&(i[l]=n.root_dir);continue}let u=r.get(l)?.root_dir;typeof u=="string"&&u.length>0&&(i[l]=u)}return{ids:[...o],root_dirs:i}}function nl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function xi(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function yh(e){let t=typeof e=="string"?e.trim().toLowerCase():"";return t.length===0?null:n=>{let r=typeof n.id=="string"?n.id.toLowerCase():"",o=typeof n.title=="string"?n.title.toLowerCase():"";return r.includes(t)||o.includes(t)}}function vh(e,t){let n=[e.runnable,e.runnable_all,e.queue,e.running,e.pr_wait,e.done,e.parallel_rows];for(let o of e.runnable_sections)n.push(o.items);let r=[];for(let o of e.queue_groups){n.push(o.items,o.sublanes.parallel);for(let i of o.sublanes.serial)n.push(i.items),r.push(i.occupants)}for(let o of n)for(let i of o)i.search_match=t(i);for(let o of r)for(let i of o)i.search_match=t(i)}function yr(e,t,n){let r=Array.isArray(e)?e:[],o=Array.isArray(t)?t:[],i=n&&typeof n.done_since=="number"?n.done_since:void 0,s={...yo,...n&&n.candidate_filter?n.candidate_filter:{}},l=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,a=n&&n.candidate_sort==="as_given"?"as_given":n&&Xo.some($=>$.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=n&&n.groups==="all"?"all":"nonempty",d=n&&n.candidate_hidden_counts==="per_control"?"per_control":"sequential",f=Date.now(),m=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&m.set($.root_dir,$);let _=new Map;for(let $ of o)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);for(let $ of r)$&&typeof $.root_dir=="string"&&_.set($.root_dir,$.name||$.root_dir);let w=[],R=[],I=[],U=[],ie=[],z=[],j=new Map,O=new Map,q=new Map,W=new Map,Y=new Map,N=new Map,F=new Map,H=new Map,G=new Map,ee=new Map,ye=new Map,qe=new Map,B=new Map,Q=new Set,Ae=new Map,Se=new Map,C=new Map;for(let $ of r){if(!$||typeof $.root_dir!="string")continue;let Z=$.root_dir,Re=$.name||Z,je=m.get(Z),Xe=je&&typeof je.revision=="number"?je.revision:typeof $.revision=="number"?$.revision:0,Ze=rt($.attempts),We=rt($.bead_titles);for(let[p,g]of Object.entries(We))typeof g=="string"&&g.length>0&&C.set(p,g);let dt=rt($.bead_times),Gt=rt($.pr_observations),St=rt($.admission),kt=rt($.revise_parked),wt=rt($.merge_queue_state),Ft=rt($.cleanup_failed),Pt=rt($.discard_operations),ae=rt($.bead_timelines),me=rt($.bead_blocked_by);Object.hasOwn($,"bead_scope")&&Ae.set(Z,rt($.bead_scope));let Ge=rt($.bead_workflow),ut=rt($.pr_activity),Oe=Array.isArray($.repo_operations)?$.repo_operations:[];H.set(Z,Oe);let E=typeof $.declared_base=="string"?$.declared_base:null;F.set(Z,E),N.set(Z,Object.entries(Ft).map(([p,g])=>({bead_id:p,step:g&&g.step?g.step:"",reason:g&&g.reason?g.reason:"",at:g&&typeof g.at=="number"?g.at:null,detail:g&&typeof g.detail=="string"?g.detail:null,output_tail:g&&typeof g.output_tail=="string"&&g.output_tail?g.output_tail:void 0,log_path:g&&typeof g.log_path=="string"&&g.log_path?g.log_path:void 0,retry_count:g&&typeof g.retry_count=="number"&&Number.isInteger(g.retry_count)&&g.retry_count>0?g.retry_count:0,failure_code:g&&typeof g.failure_code=="string"?g.failure_code:void 0})));for(let[p,g]of Object.entries(rt($.bead_overlay)))g&&typeof g=="object"&&G.set(`${Z}\0${p}`,g);let L=new Map;for(let p of Object.values(Ze))p&&typeof p.attempt_id=="string"&&L.set(p.attempt_id,p);let J=Array.isArray($.merge_queue)?$.merge_queue:[],pe=new Set(J.filter(p=>p&&typeof p.bead_id=="string").map(p=>p.bead_id)),fe=new Map(J.filter(p=>p&&typeof p.bead_id=="string").map(p=>[p.bead_id,p])),Pe=new Map,ht=new Map,$t=new Map,gt=new Map;J.forEach((p,g)=>{p&&typeof p.bead_id=="string"&&(Pe.set(p.bead_id,g+1),ht.set(p.bead_id,p.resolution),$t.set(p.bead_id,p.continuation_action||null),gt.set(p.bead_id,p.authority||null))});let Ut=rt($.auto_merge_skips),yt=p=>{let g=Ut[p];if(!g)return null;let M=rt(rt(Gt[p]).pr).head_sha;return M&&M===g.head_sha?g.reason||"":null};Y.set(Z,{positions:Pe,resolutions:ht,continuations:$t,authorities:gt,state:{active:typeof wt.active=="string"?wt.active:null,failures:rt(wt.failures),waiting:wt.waiting&&typeof wt.waiting.bead_id=="string"&&typeof wt.waiting.reason=="string"?wt.waiting:null},auto_excluded:(Array.isArray($.pr_wait)?$.pr_wait:[]).map(p=>p&&p.bead_id).filter(p=>typeof p=="string"&&yt(p)!==null),running:J.length>0});let Rt=Array.isArray($.queue)?$.queue:[];for(let p of[...Rt,...Array.isArray($.pr_wait)?$.pr_wait:[]])p&&typeof p.bead_id=="string"&&typeof p.armed_by_lane=="string"&&p.armed_by_lane.length>0&&qe.set(p.bead_id,p.armed_by_lane);for(let p of Array.isArray($.disarmed_on_load)?$.disarmed_on_load:[])typeof p=="string"&&p.length>0&&Q.add(p);let Ot=(Array.isArray($.serial_lanes)?$.serial_lanes:[]).filter(p=>p&&/^s[1-5]$/.test(p.id)&&Array.isArray(p.entries)),en=rt($.lane_states),Yt=typeof $.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor($.serial_lane_count))):Math.min(5,Ot.length);q.set(Z,Yt),W.set(Z,Rt.length);let Mt=new Map(Ot.map(p=>[p.id,p])),xt=new Map;for(let p of Ot)for(let g of p.entries)g&&typeof g.bead_id=="string"&&xt.set(g.bead_id,p.id);for(let[p,g]of Object.entries(rt($.bead_dependents))){let M=Array.isArray(g?.ids)?g.ids:[],X=rt(g?.root_dirs),ne=ye.get(p)||{ids:new Set,root_dirs:{}};for(let ue of M)typeof ue=="string"&&ue.length>0&&ne.ids.add(ue);for(let[ue,ot]of Object.entries(X))typeof ot=="string"&&ot.length>0&&(ne.root_dirs[ue]=ot);ye.set(p,ne)}for(let[p,g]of Object.entries(me))Array.isArray(g)&&ee.set(p,g.filter(M=>typeof M=="string"&&M.length>0));let Kt=Array.isArray($.done)?$.done:[];for(let p of Kt)p&&typeof p.bead_id=="string"&&z.push({id:p.bead_id,root_dir:Z,workspace_name:Re});let nn=new Map;for(let p of Kt)p&&typeof p.bead_id=="string"&&typeof p.added_at=="number"&&nn.set(p.bead_id,p.added_at);let Wt=p=>({id:p,title:We[p]||p,root_dir:Z,workspace_name:Re,expected_revision:Xe,draggable:!1,...rt(dt[p]).created_at?{created_at:rt(dt[p]).created_at}:{},...rt(dt[p]).updated_at?{updated_at:rt(dt[p]).updated_at}:{}}),an=p=>{let g=Ge[p]?.chips?.pr;return g&&typeof g.number=="number"&&typeof g.url=="string"?{pr_number:g.number,pr_url:g.url}:{}},Zt=p=>Object.hasOwn(me,p)?{blocked_by:Array.isArray(me[p])?me[p].filter(g=>typeof g=="string"&&g.length>0):[]}:{},xe=(p,g)=>{let M=Zt(p),X=(g?.blockers||[]).map(ue=>ue.id);if(X.length===0)return M;let ne=[...M.blocked_by||[]];for(let ue of X)ne.includes(ue)||ne.push(ue);return{blocked_by:ne}},A=new Set;for(let[p,g]of Td(Ze,nn,{discard_operations:Pt,observations:Gt,bead_timelines:ae,provider_hold:rt($.provider_hold),auto_resume_pending:Array.isArray($.auto_resume_pending)?$.auto_resume_pending:[],account_catalog:rt($.account_catalog)})){A.add(p);let M=g.run_state==="failed"?fh(Ze,g.attempt_id):null;M!==null&&B.set(p,M);let X=L.get(g.attempt_id)||null,ne=G.get(`${Z}\0${p}`),ue=ne&&ne.rollup?ne.rollup:null,ot=ol(E,X?X.target_base:null),bt=X?sl(X,L):!1,et=X&&X.quickfix_lane===!0&&X.quickfix_landing&&typeof X.quickfix_landing=="object"?X.quickfix_landing:null,Nt=et&&typeof et.reason=="string"&&et.reason.length>0?et.reason:null,S=et?Qo({bead_id:p,merge_sha:et.head_sha,cleanup_cursor:et.cursor,cleanup_failed:Nt?{step:et.cursor,reason:Nt}:null,repo_operations:Oe}):null;R.push({...Wt(p),lane:"running",...xe(p,g.wait),...xt.has(p)?{serial_lane_id:xt.get(p)}:{},attempt_id:g.attempt_id,run_state:g.run_state,status:g.status||void 0,workflow:Ge[p]||null,can_pause:g.can_pause,can_resume:g.can_resume,started_at:g.started_at,last_event_at:g.last_event_at,last_activity:g.last_activity,legs:g.legs,runner:g.runner,model:g.model,effort:g.effort,speed:g.speed,resumed_from:g.resumed_from,continuation_mode:g.continuation_mode,usage:g.usage,failure:g.failure||null,hold:g.hold||null,wait:g.wait||null,retry:g.retry||null,exec_chips:{orchestration:Ba(g),worker:ch(rt(je),ne,g.runner||null)},discard:rr(Pt,p,{attempt_id:g.attempt_id,merged:g.failure?.confirmation==="merged"||rt(Gt[p]).pr?.state==="MERGED"}),...ue?{rollup:ue}:{},...bt?{conflict_resolution:!0}:{},...ot?{base_exception:ot}:{},...S?{landing:S}:{},badges:g.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:g.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:g.run_state==="parked"?["\u23F8 \uC138\uC158 \uB300\uAE30"]:g.run_state==="retry_wait"?["\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30"]:g.run_state==="waiting"?["\u26D3 \uC120\uD589 \uB300\uAE30"]:g.run_state==="provider_hold"?["\uACF5\uAE09\uC790 \uBCF4\uB958"]:[],alert:g.run_state==="failed"})}for(let[p,g]of ku(Ze)){if(R.some(X=>X.id===p))continue;let M=g.attempt;R.push({...Wt(p),lane:"running",kind:"session",...Zt(p),attempt_id:typeof M.attempt_id=="string"?M.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:Ge[p]||null,can_pause:!1,can_resume:!1,started_at:g.started_at,last_event_at:typeof M.last_event_at=="number"?M.last_event_at:null,last_activity:M.last_activity&&typeof M.last_activity=="object"?M.last_activity:null,legs:Array.isArray(M.legs)?M.legs:[],runner:typeof M.runner=="string"?M.runner:null,model:typeof M.model=="string"?M.model:null,effort:typeof M.effort=="string"?M.effort:null,speed:typeof M.speed=="string"?M.speed:null,resumed_from:null,continuation_mode:null,usage:M.usage&&typeof M.usage=="object"?M.usage:null,exec_chips:{orchestration:Ba(M),worker:null},discard:rr(Pt,p,{merge_queued:!0}),badges:[g.origin==="auto"?"\uB9AC\uBDF0 \xB7 \uC790\uB3D9":"\uB9AC\uBDF0"],alert:!1})}for(let p of Array.isArray($.session_active)?$.session_active:[]){let g=p&&p.bead_id;typeof g!="string"||A.has(g)||(A.add(g),Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(g,p.blocked_by.filter(M=>typeof M=="string"&&M.length>0)),typeof p.title=="string"&&p.title.length>0&&C.set(g,p.title),R.push({...Wt(g),title:p.title||We[g]||g,lane:"running",kind:"session",status:"in_progress",started_at:nl(p.started_at)??nl(p.updated_at)??void 0,updated_at:nl(p.updated_at)??void 0,workflow:p.workflow||null,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(M=>typeof M=="string"&&M.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(p.session_refs)?p.session_refs:[],badges:[],alert:!1}))}for(let p of Array.isArray($.pr_wait)?$.pr_wait:[]){let g=p&&p.bead_id;if(typeof g!="string"||A.has(g))continue;A.add(g);let M=rt(Gt[g]),X=rt(M.pr),ne=M.gate?rt(M.gate):null,ue=pe.has(g),ot=fe.get(g)?.continuation_action||null,bt=!!ot&&ot.continuation===null,et=wt.active===g,Nt=p.external===!0,S=Ft[g]||null,x=rt(ut[g]),Ce=Qo({bead_id:g,merge_sha:p.merge_sha,cleanup_cursor:p.cleanup_cursor,merge_progress:x.merge_progress||null,cleanup_failed:S,repo_operations:Oe}),Be=$i(Ce),nt=!!ne&&ne.base_badge==="\uCDA9\uB3CC",mt=!!S&&["post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(S.step)&&!!ne&&ne.tier==="merged",At=Nt&&!!S&&!!ne&&ne.tier==="merged",Hr=!!ne&&["closed_unmerged","review","undecidable"].includes(ne.tier),kn=rr(Pt,g,{external:Nt,merge_active:et||Ce?.step==="merge",merge_queued:ue,cleanup_active:Be,merged:!!S||ne?.tier==="merged"}),lr=!!kn.operation,Sr=rh(M.receipt_check);I.push({...Wt(g),lane:"pr_wait",...Zt(g),...Sr.length>0?{receipt_badge:{codes:Sr}}:{},workflow:Ge[g]||null,pr_number:typeof X.number=="number"?X.number:null,pr_url:typeof X.url=="string"?X.url:void 0,external:Nt,usage:tr(Ze,g),merge_step:Ce,badges:bt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ce?[ne?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:S?[jr(S.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${jr(S.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof ne?.gate_badge=="string"&&ne.gate_badge.length>0?[ne.gate_badge]:[],alert:Ce?Ce.failed===!0:!!S||Hr,reason:S&&Ce?.active!==!0?wi(S.step):"PR \uB300\uAE30",merge_action:ne?.tier==="merged"&&!mt&&!At?!1:!ue||bt,merge_enabled:!lr&&(bt||ne?.enabled===!0||nt||mt||At),merge_label:bt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":At||mt?"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":nt&&!mt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:bt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":lr?kn.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kn.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kn.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:At?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":mt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":nt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ne?.enabled===!0?`\uBA38\uC9C0 (${ne.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ne?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:ue&&!bt,cancel_enabled:!et,continuation_mismatch:ot?.mismatch||null,discard:kn,discard_action:kn.action,discard_enabled:kn.enabled,discard_title:kn.title})}let ge=(p,g,M,X)=>{let ne=p&&p.bead_id;if(typeof ne!="string"||A.has(ne))return null;A.add(ne);let ue=kt[ne],ot=rr(Pt,ne),bt=ot.operation?ot:null,et={...Wt(ne),lane:g,workflow:Ge[ne]||null,draggable:!bt,discard:bt||void 0,reason:xd(St,ne),seq:M+1,queue_position:M+1,queue_index:M,queue_length:X,badges:ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!ue,revise_action:!!ue,revise_enabled:!!ue&&!bt,revise_title:ue?ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Nt=Zt(ne);return Object.hasOwn(Nt,"blocked_by")&&(et.blocked_by=Nt.blocked_by),et};for(let p=0;p<Rt.length;p++){let g=ge(Rt[p],"queue",p,Rt.length);if(!g)continue;U.push(g);let M=j.get(Z);M?M.push(g):j.set(Z,[g])}let Ne=p=>{let g=I.find(ue=>ue.id===p&&ue.root_dir===Z);if(g)return{id:p,title:g.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let M=R.find(ue=>ue.id===p&&ue.root_dir===Z),X=M?M.run_state:Gg(Ze,p),ne=X==="failed"||X==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":X==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:p,title:M?M.title:Wt(p).title,badge:ne}},y=[];for(let p=0;p<Math.max(Yt,Ot.length);p++){let g=`s${p+1}`,M=Mt.get(g),X=M&&Array.isArray(M.entries)?M.entries:[],ne=rt(en[g]),ue=Array.isArray(ne.occupied_by)?ne.occupied_by.filter(et=>typeof et=="string"):[],ot=new Set(ue),bt=[];for(let et=0;et<X.length;et++){let Nt=X[et]&&X[et].bead_id;if(typeof Nt=="string"&&ot.has(Nt)){A.add(Nt);continue}let S=ge(X[et],g,et,X.length);S&&(bt.push(S),U.push(S))}bt.length===0&&ue.length===0&&(Yt<=1||p>=Yt)||y.push({id:g,index:p,items:bt,raw_length:X.length,occupied_by:ue,occupants:ue.map(et=>Ne(et)),corrections:Array.isArray(ne.corrections)?ne.corrections.length:0,cycle:ne.cycle===!0,...bt.length===0&&ue.length===0?{empty:!0}:{}})}O.set(Z,y);let v=Array.from({length:Yt},(p,g)=>{let M=`s${g+1}`,X=Mt.get(M),ne=X&&Array.isArray(X.entries)?X.entries:[],ue=rt(en[M]);return{id:M,index:ne.length,length:ne.length,occupied_by:Array.isArray(ue.occupied_by)?ue.occupied_by.filter(ot=>typeof ot=="string"):[]}});for(let p of Array.isArray($.runnable)?$.runnable:[]){let g=p&&p.bead_id;if(typeof g!="string"||A.has(g))continue;A.add(g);let M=p.workflow&&typeof p.workflow=="object"?p.workflow:null,X=M&&typeof M.route=="string"&&M.route||(typeof p.route=="string"?p.route:null),ne=oh(rt(je),p.exec_pins,X),ue=Fo(p.rec,p.exec_pins);Array.isArray(p.blocked_by)&&p.blocked_by.length>0&&ee.set(g,p.blocked_by.filter(At=>typeof At=="string"&&At.length>0)),typeof p.title=="string"&&p.title.length>0&&C.set(g,p.title),Array.isArray(p.scope)&&Se.set(g,p.scope.filter(At=>typeof At=="string"&&At.length>0));let ot=Object.hasOwn(p,"eligible"),et=!ot&&Object.hasOwn(p,"route")&&Object.hasOwn(p,"spec_state")&&Object.hasOwn(p,"has_description")&&Object.hasOwn(p,"awaiting_user")&&Object.hasOwn(p,"worker_ineligible")?Ka({route:typeof p.route=="string"?p.route:"",spec:p.spec_state,has_description:p.has_description===!0,awaiting_user:p.awaiting_user===!0,worker_ineligible:p.worker_ineligible===!0},null):null,Nt=ot?p.eligible!==!1:et?et.placeable:!0,S=et?et.worker_ineligible:p.worker_ineligible===!0,x=Nt&&!S,Ce=et?{route_ok:et.route_ok,awaiting_user:et.awaiting_user,missing_description:et.missing_description,placement_spec:et.spec}:Object.hasOwn(p,"route_ok")?{route_ok:p.route_ok===!0,awaiting_user:p.awaiting_user===!0,missing_description:p.missing_description===!0,placement_spec:p.placement_spec}:null,Be=[];!ot&&et&&!et.placeable&&Be.push(qr(et)),typeof p.reason=="string"&&p.reason.length>0&&Be.push(p.reason);let nt=xd(St,g);nt&&Be.push(nt);let mt=sh(g,p.release_info,f)?.map(At=>({...At,...Ed({id:g,root_dir:Z},At.id)}));w.push({...Wt(g),title:p.title||We[g]||g,lane:"runnable",draggable:!ot&&x,queue_placeable:x,...Ce||{},...S?{worker_ineligible:!0}:{},...p.session_preferred===!0?{session_preferred:!0,session_preferred_reason:typeof p.session_preferred_reason=="string"?p.session_preferred_reason:""}:{},...p.spec_after_blocker===!0?{spec_after_blocker:!0}:{},...mt?{dependency_chips:{released:mt}}:{},...p.dependents_info&&typeof p.dependents_info=="object"?{dependents_info:p.dependents_info}:{},reason:Be.join(" \xB7 "),created_at:p.created_at??void 0,updated_at:p.updated_at??void 0,status:typeof p.status=="string"?p.status:void 0,labels:Array.isArray(p.labels)?p.labels:[],spec_id:typeof p.spec_id=="string"?p.spec_id:"",published:p.published===!0,workflow:M||(X?{route:X,chips:{route:X}}:null),...ne?{exec_chips:ne}:{},...ue?{rec:ue}:{},blocked:p.blocked===!0,...Array.isArray(p.blocked_by)?{blocked_by:p.blocked_by.filter(At=>typeof At=="string"&&At.length>0)}:{},place_index:Rt.length,place_lanes:v})}for(let p of Kt){let g=p&&p.bead_id;if(typeof g!="string"||A.has(g)||(A.add(g),i!==void 0&&typeof p.added_at=="number"&&p.added_at<i))continue;let M=Yg(Ze,g),X=M&&typeof M.done_kind=="string"?M.done_kind:null;ie.push({...Wt(g),lane:"done",done:!0,done_layout:"three_line",usage:tr(Ze,g),work_ms:od(Ze,g),done_at:typeof p.added_at=="number"?p.added_at:void 0,done_kind:X,...an(g),badges:[...X&&kd[X]?[kd[X]]:[],...nd(Ze,g)]})}for(let p of Array.isArray($.session_done)?$.session_done:[]){let g=p&&(p.id||p.bead_id);typeof g!="string"||A.has(g)||(A.add(g),ie.push({...Wt(g),...p,id:g,root_dir:Z,workspace_name:Re,expected_revision:Xe,lane:"done",done:!0}))}}if(G.size>0)for(let $ of[...w,...U,...R,...I,...ie]){let Z=G.get(`${$.root_dir}\0${$.id}`);if(!Z||(typeof Z.priority=="number"&&($.priority=Z.priority),typeof Z.from_id=="string"&&Z.from_id.length>0&&($.from_id=Z.from_id),$.lane==="done"&&Array.isArray(Z.carried_to)&&Z.carried_to.length>0&&($.carried_to=Z.carried_to),!Object.hasOwn(Z,"metadata")))continue;let Re=rt(Z.metadata);if($.rec=Fo(Re),$.lane==="runnable"||$.lane.startsWith("s")||$.lane==="queue"){let je=lh(rt(m.get($.root_dir)),Re,typeof Z.route=="string"&&Z.route.length>0?Z.route:rt($.workflow).route);je&&($.exec_chips=je)}}let re=new Map;o.forEach(($,Z)=>{$&&typeof $.root_dir=="string"&&re.set($.root_dir,Z)});let ke=n&&n.running_sort==="repo"?"repo":"started";R.sort(($,Z)=>{let Re=$.kind==="session",je=Z.kind==="session";if(Re!==je)return Re?1:-1;if(Re&&je){let We=xi(Z.updated_at)-xi($.updated_at);return We!==0?We:$.id.localeCompare(Z.id)}if(ke==="repo"){let We=re.get($.root_dir)??Number.MAX_SAFE_INTEGER,dt=re.get(Z.root_dir)??Number.MAX_SAFE_INTEGER;if(We!==dt)return We-dt}let Xe=typeof $.started_at=="number"&&Number.isFinite($.started_at)?$.started_at:null,Ze=typeof Z.started_at=="number"&&Number.isFinite(Z.started_at)?Z.started_at:null;return Xe!==null&&Ze!==null&&Xe!==Ze?Xe-Ze:Xe===null&&Ze!==null?1:Xe!==null&&Ze===null?-1:$.id.localeCompare(Z.id)}),ie.sort(($,Z)=>(Z.done_at??0)-($.done_at??0));let ve=o.length>0?o:r.map($=>({root_dir:$&&$.root_dir,name:$&&$.name,auto_advance:$&&$.auto_advance,auto_merge:$&&$.auto_merge,slots:$&&$.slots,revision:$&&$.revision,runner_catalog:$&&$.runner_catalog})),Me=new Set(w.map($=>$.root_dir)),he=new Map;for(let $ of R)$.kind==="session"||$.run_state!=="running"||he.set($.root_dir,(he.get($.root_dir)||0)+1);let Le=new Map;for(let $ of ie){let Z=Le.get($.root_dir);Z?Z.push($):Le.set($.root_dir,[$])}let Je={positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},lt=[];for(let $ of ve){if(!$||typeof $.root_dir!="string")continue;let Z=j.get($.root_dir)||[],Re=O.get($.root_dir)||[],je=Z.length>0||Re.some(We=>We.items.length>0||We.occupied_by.length>0);if(u!=="all"&&!je&&!Me.has($.root_dir))continue;let Xe=typeof $.slots=="number"&&$.slots>=Ai?$.slots:Ai,Ze=he.get($.root_dir)||0;lt.push({live_count:Ze,over_cap:Ze>Xe,merge:Y.get($.root_dir)||Je,token_total:uh(Le.get($.root_dir)||[]),cleanup_failures:N.get($.root_dir)||[],declared_base:F.get($.root_dir)??null,repo_operations:H.get($.root_dir)||[],root_dir:$.root_dir,name:$.name||$.root_dir,auto_advance:$.auto_advance===!0,auto_merge:$.auto_merge===!0,slots:Xe,revision:typeof $.revision=="number"?$.revision:0,runner_catalog:rt($.runner_catalog),items:Z,sublanes:{parallel:Z,serial:Re},serial_lane_count:q.get($.root_dir)||0,raw_queue_length:W.get($.root_dir)||0})}let P={runnable:w,runnable_all:w,runnable_hidden:{blocked:0,readiness:0},runnable_sections:[],runnable_flat:a==="updated_flat"||a==="as_given",queue:U,queue_groups:lt,running:R,pr_wait:I,done:ie,parallel_rows:[],chain_lanes:[],cross_lanes_revision:l&&typeof l.revision=="number"?l.revision:null,cross_lanes_unreadable:l===null,parallel_raw_length:Object.fromEntries(W),owner_of:{}},ce=Wu(P);for(let $ of z)ce.has($.id)||ce.set($.id,{root_dir:$.root_dir,workspace_name:$.workspace_name,lane:"done",state:"done"});for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){if(!Object.hasOwn($,"blocked_by"))continue;let Z=ce.get($.id);$.blockers=($.blocked_by||[]).map(Re=>zu(Re,Z,ce,o))}for(let $ of[...P.queue,...P.runnable,...P.running,...P.pr_wait]){let Z=($.blockers||[]).map(Xe=>({...tl($.id,Xe),...Ed($,Xe.id,ce)})),Re=yd($.id,bh(ye.get($.id),$.dependents_info,$,ce));if(Z.length===0&&Re.length===0)continue;let je={...$.dependency_chips||{},...Z.length>0?{predecessors:Z}:{},...Re.length>0?{dependents:Re}:{}};$.dependency_chips=je}hh(P,Ae,Se,ce,o);let se=Hu(P.queue_groups);for(let $ of P.queue_groups)for(let Z of $.sublanes.serial){let Re=se.get(Ku($.root_dir,Z.id));Re&&(Z.cross_wait_peers=Re)}P.chain_lanes=mh(l&&Array.isArray(l.lanes)?l.lanes:[],ee,ce,o,C,_,{armed_by_bead:qe,failed_by_bead:B,disarmed_lanes:Q});let de=new Map;for(let $ of[...P.queue,...P.runnable])de.has($.id)||de.set($.id,$);let Ee=new Set;for(let $ of P.chain_lanes)for(let Z of $.rows){if($.status==="confirmed"&&!Z.unplaced&&!Z.fixed&&Ee.add(Z.id),!$.draft&&!Z.unplaced)continue;let Re=de.get(Z.id);Re&&(Re.cross_lane_chip={lane_id:$.lane_id,number:$.number,status:$.status,label:$.draft?`\uC5F0\uACB0 ${$.number} (draft)`:`\uC5F0\uACB0 ${$.number}`})}let _e=new Map(P.chain_lanes.map($=>[$.lane_id,$.number]));for(let $ of[...P.queue,...P.running]){let Z=qe.get($.id);if(typeof Z!="string"||Z.length===0)continue;let Re=_e.get(Z);$.armed_lane_chip=Re===void 0?{lane_id:Z,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:Z,label:`\u25B6 \uC5F0\uACB0 ${Re}`,orphan:!1}}let De=[];for(let $ of j.values())for(let Z of $)Ee.has(Z.id)||De.push(Z);De.sort(($,Z)=>{let Re=$.workspace_name.localeCompare(Z.workspace_name);return Re!==0?Re:($.queue_index??0)-(Z.queue_index??0)}),P.parallel_rows=De;let Ue={};for(let[$,Z]of ce)typeof Z.root_dir=="string"&&Z.root_dir.length>0&&(Ue[$]=Z.root_dir);for(let $ of P.chain_lanes)for(let Z of $.rows)!Object.hasOwn(Ue,Z.id)&&Z.root_dir.length>0&&_.has(Z.root_dir)&&(Ue[Z.id]=Z.root_dir);P.owner_of=Ue;let Qe=P.runnable.length;P.runnable_all=P.runnable.slice();let Fe=P.runnable,te=$=>s.show_blocked||$.blocked!==!0,V=$=>s.readiness==="all"||(s.readiness==="ready"?$.queue_placeable===!0:$.queue_placeable!==!0);if(d==="per_control"){let $=[],Z=0,Re=0;for(let je of Fe){let Xe=te(je),Ze=V(je);Xe&&Ze?$.push(je):!Xe&&Ze?Z+=1:Xe&&!Ze&&(Re+=1)}Fe=$,P.runnable_hidden={blocked:Z,readiness:Re}}else{Fe=Fe.filter(te);let $=Fe.length;Fe=Fe.filter(V),P.runnable_hidden={blocked:Qe-$,readiness:$-Fe.length}}let $e=($,Z)=>{let Re=xi(Z.updated_at)-xi($.updated_at);return Re!==0?Re:$.id.localeCompare(Z.id)},ct=a==="repo_spec"?($,Z)=>{let Re=$.queue_placeable===!0?0:1,je=Z.queue_placeable===!0?0:1;if(Re!==je)return Re-je;let Xe=$.published===!0?0:1,Ze=Z.published===!0?0:1;return Xe!==Ze?Xe-Ze:$e($,Z)}:$e;if(a==="as_given")P.runnable=Fe,P.runnable_sections=[];else if(a==="updated_flat")P.runnable=Fe.slice().sort($e),P.runnable_sections=[];else{let $=new Map;for(let je of Fe){let Xe=$.get(je.root_dir);Xe?Xe.push(je):$.set(je.root_dir,[je])}let Z=[],Re=[];for(let je of ve){if(!je||typeof je.root_dir!="string")continue;let Xe=($.get(je.root_dir)||[]).slice().sort(ct);$.delete(je.root_dir),Xe.length!==0&&(Z.push({root_dir:je.root_dir,name:je.name||je.root_dir,items:Xe.map(Ze=>({...Ze,workspace_name:""}))}),Re.push(...Xe))}for(let[je,Xe]of $){let Ze=Xe.slice().sort(ct);Z.push({root_dir:je,name:Ze[0]?.workspace_name||je,items:Ze.map(We=>({...We,workspace_name:""}))}),Re.push(...Ze)}P.runnable=Re,P.runnable_sections=Z}let Ke=yh(n?n.search:void 0);return Ke&&vh(P,Ke),P}function Ld(e,t){let n=new Map(e.map((a,u)=>[a,u])),r=new Map(e.map(a=>[a,new Set]));for(let a of t)a.blocker!==a.blockee&&n.has(a.blocker)&&n.has(a.blockee)&&r.get(a.blockee).add(a.blocker);let o=new Set,i=[];for(;i.length<e.length;){let a=e.find(u=>{if(o.has(u))return!1;for(let d of r.get(u))if(!o.has(d))return!1;return!0});if(a===void 0)return{order:[...e],corrections:[],cycle:!0};o.add(a),i.push(a)}let s=[],l=new Map(i.map((a,u)=>[a,u]));for(let a of i){let u=null;for(let d of r.get(a)){let f=Number(n.get(a))<Number(n.get(d)),m=Number(l.get(a))>Number(l.get(d));f&&m&&(u===null||Number(l.get(d))>Number(l.get(u)))&&(u=d)}u!==null&&s.push({bead_id:a,after:u})}return{order:i,corrections:s,cycle:!1}}var kh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Ei="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",wh="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",$h="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",vo="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function Jo(e,t){return`${e}\0${t}`}function xh(e,t){let n=new Set(e),r=new Map;for(let o of e){let i=t.placed_members.has(o)?t.snapshot_blocked_by:t.runnable_blocked_by,s=i instanceof Map?i.get(o):void 0;if(!Array.isArray(s))return null;r.set(o,s.filter(l=>l!==o&&n.has(l)))}return r}function Ah(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,o)=>{t.fixed_members.has(r.bead_id)&&(n=o)}),n+1}function ns(e,t){let n=e.entries,r=n.map(f=>f.bead_id),o=xh(r,t);if(o===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let i=[];for(let[f,m]of o)for(let _ of m)i.push({blocker:_,blockee:f});let s=Ah(e,t),l=new Map(r.map((f,m)=>[f,m])),a=r.slice(0,s).filter(f=>o.get(f).some(m=>Number(l.get(m))>Number(l.get(f)))),u=Ld(r.slice(s),i);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:a};let d=new Map(n.map(f=>[f.bead_id,f]));return{entries:[...n.slice(0,s),...u.order.map(f=>d.get(f))],corrections:u.corrections,cycle:!1,held:!1,mismatched:a}}function Pd(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:ns(n,t)}function Sh(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Eh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Th(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function il(e,t,n){let r=new Set([t]),o=[t];for(;o.length>0;){let i=o.pop();for(let s of e.get(i)||[]){if(s===n)return!0;r.has(s)||(r.add(s),o.push(s))}}return!1}function Ch(e,t){let n=new Set;for(let[s,l]of t)for(let a of l)n.add(Jo(s,a));let r=new Map,o=new Map;for(let s of e){let l=Jo(s.a,s.b);r.set(l,s),o.set(l,s.type==="dep-add")}let i=[];for(let s of e){let l=Jo(s.a,s.b);r.get(l)===s&&o.get(l)!==n.has(l)&&i.push(s)}return i}function Rh(e,t,n){let r=e.parallel_rows,o=Math.max(0,Math.min(r.length,n)),i=r[o];if(i&&i.root_dir===t)return i.queue_index;for(let s=o-1;s>=0;s--)if(r[s].root_dir===t)return r[s].queue_index+1;for(let s=o;s<r.length;s++)if(r[s].root_dir===t)return r[s].queue_index;return e.parallel_raw_length.get(t)??0}function Oh(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Si(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function al(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function rs(e){let t=Th(e.blocked_by_map),n=[],r=new Set,o={refusal:null},i=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(o.refusal=Eh(u),null):d};return{graph:t,dep_ops:n,state:o,ownerOf:i,addDep:(u,d,f)=>{if(o.refusal!==null||u===d)return;let m=t.get(u)||[];if(m.includes(d))return;let _=i(u);if(_!==null){if(il(t,d,u)){o.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...m,d]),f!==void 0&&r.add(Jo(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:_,...f===void 0?{}:{lane_id:f}})}},removeDep:(u,d)=>{if(o.refusal!==null||u===d)return;let f=t.get(u)||[];if(!f.includes(d))return;let m=i(u);m!==null&&(t.set(u,f.filter(_=>_!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:m}))},laneCreated:(u,d)=>r.has(Jo(u,d))}}function os(e,t,n,r,o={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let i=Ch(e.dep_ops,t.blocked_by_map),s=i.filter(d=>d.type==="dep-remove"),l=i.filter(d=>d.type==="dep-add"),a=o.disarm_ops??[],u=o.lane_id===void 0||o.correction===void 0?void 0:Sh(o.lane_id,o.correction);return{lane_ops:n,ops:[...s,...a,...l,...r],lane_op_index:s.length+a.length,...u===void 0?{}:{correction:u}}}function Dd(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function es(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Md(e,t,n,r){if(t.status!=="confirmed")return[];let o=[],i=new Map;for(let s of r){let l=e.owner_of.get(s.bead_id)||s.root_dir;typeof l!="string"||l.length===0||i.set(l,[...i.get(l)||[],s.bead_id])}for(let[s,l]of i)o.push({type:"worker-queue-disarm",payload:{bead_ids:l,lane_id:n},root_dir:s});return o}function qd(e,t,n,r){let o=new Map;for(let i of n){if(t.placed_members.has(i.bead_id))continue;let s=e.ownerOf(i.bead_id);if(s===null)return;let l=o.get(s)??0;r.push(Si(i.bead_id,s,(t.parallel_raw_length.get(s)??0)+l)),o.set(s,l+1)}}function ts(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ti(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ci(e,t,n){let r=rs(n),o=[],i=[],s=[],l,a=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??a:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:kh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:wh};if(e.kind!=="chain"&&typeof a=="string"&&a!==t.lane_id&&n.cross_lanes.has(a))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(n,a)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:vo}}if(e.kind==="chain"&&d===void 0)return{refused:vo};let f=()=>{if(d===void 0||d.status!=="confirmed")return;let w=d.entries.findIndex(z=>z.bead_id===e.bead_id);if(w<0)return;let R=w>0?d.entries[w-1]:null,I=w+1<d.entries.length?d.entries[w+1]:null,U=es(d,w),ie=I!==null&&es(d,w+1);U&&R!==null&&r.removeDep(e.bead_id,R.bead_id),ie&&I!==null&&r.removeDep(I.bead_id,e.bead_id),(U||ie)&&R!==null&&I!==null&&r.addDep(I.bead_id,R.bead_id,u)},m=(w,R)=>{let I=n.cross_lanes.get(w),U=I.entries.findIndex(F=>F.bead_id===e.bead_id),ie=I.entries.filter(F=>F.bead_id!==e.bead_id),z=Math.max(0,Math.min(ie.length,U>=0&&R>U?R-1:R)),j=-1;if(ie.forEach((F,H)=>{n.fixed_members.has(F.bead_id)&&(j=H)}),z<=j){r.state.refusal=$h;return}let O=U>=0?I.entries[U]:d?.entries.find(F=>F.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};l=ns({status:I.status,entries:[...ie.slice(0,z),O,...ie.slice(z)]},n);let q=l.entries;if(Ti(q,I.entries)||o.push({type:"monitor-lane-update",payload:{lane_id:w,entries:ts(q)}}),I.status!=="confirmed")return;let W=q.findIndex(F=>F.bead_id===e.bead_id),Y=W>0?q[W-1].bead_id:null,N=W+1<q.length?q[W+1].bead_id:null;if(Y===null){N!==null&&r.addDep(N,e.bead_id,w);return}if(r.addDep(e.bead_id,Y,w),N!==null&&(r.graph.get(N)||[]).includes(Y)){let F=I.entries.findIndex(H=>H.bead_id===N);(r.laneCreated(N,Y)||F>0&&I.entries[F-1].bead_id===Y&&es(I,F))&&r.removeDep(N,Y),r.addDep(N,e.bead_id,w)}},_=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(f(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(s.push(...Md(n,d,u,d.entries.filter(w=>w.bead_id===e.bead_id))),o.push({type:"monitor-lane-update",payload:{lane_id:u,entries:ts(d.entries.filter(w=>w.bead_id!==e.bead_id))}}))),t.kind==="chain"&&m(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&i.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let w=Rh(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")i.push(Si(e.bead_id,e.root_dir,w));else if(e.kind==="parallel"){let R=n.parallel_rows,I=R[Math.max(0,Math.min(R.length,t.marker_index))];if(!(!!I&&I.bead_id===e.bead_id)&&Oh(n,e.root_dir)&&_!==void 0){let ie=_>w?w:w-1;ie>=0&&ie!==_&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let w=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&w.status==="confirmed"&&i.push(Si(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(_!==void 0&&t.index!==_){let w=_>t.index?t.index:t.index-1;w>=0&&w!==_&&i.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:w},root_dir:e.root_dir})}}else i.push(Si(e.bead_id,e.root_dir,t.index,t.lane_id));return os(r,n,o,i,{disarm_ops:s,...t.kind==="chain"?{lane_id:t.lane_id,correction:l}:{}})}function Nd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=ns(n,t);if(r.held)return{refused:Ei};let o=r.entries,i=rs(t),s=[];Dd(i,o,e),i.state.refusal===null&&qd(i,t,o,s);let l=Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ts(o)}}];return l.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),os(i,t,l,s,{lane_id:e,correction:r})}function jd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=ns(n,t),o=r.entries,i=rs(t),s=[];Dd(i,o,e),i.state.refusal===null&&qd(i,t,o,s);let l=Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ts(o)}}];return os(i,t,l,s,{lane_id:e,correction:r})}function Fd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=ns(n,t),o=r.entries;return os(rs(t),t,Ti(o,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ts(o)}}],[],{lane_id:e,correction:r})}function Bd(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:vo};let r=rs(t);if(n.status==="confirmed")for(let o=1;o<n.entries.length;o+=1)es(n,o)&&r.removeDep(n.entries[o].bead_id,n.entries[o-1].bead_id);return os(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Md(t,n,e,n.entries)})}function Ud(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],o=[];for(let s=1;s<n.entries.length;s+=1){let l=`  ${n.entries[s].bead_id} \u2190 ${n.entries[s-1].bead_id}`;es(n,s)?r.push(l):o.push(`${l} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let i=`\uC5F0\uACB0 ${al(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${i}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[i,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...o.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...o]].join(`
`)}function Wd(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function zd(e,t){let n=new Map(e.map((r,o)=>[r.bead_id,o]));return t.filter(r=>{let o=n.get(r.bead_id);return o!==void 0&&o>0&&e[o-1].bead_id===r.after})}function ll(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${al(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Ih="\uC0AC\uC774\uD074";function Lh(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(o=>typeof o=="string"&&o.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let o=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[i,s]of Object.entries(o))Array.isArray(s)&&t.set(i,n(s));for(let i of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])i&&typeof i.bead_id=="string"&&Array.isArray(i.blocked_by)&&i.blocked_by.length>0&&t.set(i.bead_id,n(i.blocked_by))}return t}function cl(e,t,n){let r=yr(e,t),o=[],i=new Set,s=(a,u)=>{for(let d of a)i.has(d.id)||(i.add(d.id),o.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};s(r.running,"running"),s(r.pr_wait,"pr_wait"),s(r.queue,"queue"),s(r.runnable_all,"runnable");let l=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:l===null?o:o.filter(a=>a.root_dir===l),blocked_by_map:Lh(e)}}function Hd(e,t){let n=new Map;for(let s of t.issues)!s||typeof s.bead_id!="string"||s.bead_id.length===0||n.has(s.bead_id)||n.set(s.bead_id,s);let r=n.get(e)?.root_dir,o=t.blocked_by_map.get(e)||[],i=[];for(let s of n.values()){if(s.bead_id===e||s.lane==="done"||o.includes(s.bead_id))continue;let l=il(t.blocked_by_map,s.bead_id,e);i.push({...s,disabled:l,...l?{reason:Ih}:{}})}return i.sort((s,l)=>{let a=r!==void 0&&s.root_dir===r,u=r!==void 0&&l.root_dir===r;return a!==u?a?-1:1:s.bead_id.localeCompare(l.bead_id)}),i}function Kd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:tp,setPrototypeOf:Gd,isFrozen:Ph,getPrototypeOf:Dh,getOwnPropertyDescriptor:Mh}=Object,{freeze:hn,seal:Cn,create:gl}=Object,{apply:hl,construct:bl}=typeof Reflect<"u"&&Reflect;hn||(hn=function(t){return t});Cn||(Cn=function(t){return t});hl||(hl=function(t,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return t.apply(n,o)});bl||(bl=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return new t(...r)});var Ri=bn(Array.prototype.forEach),qh=bn(Array.prototype.lastIndexOf),Yd=bn(Array.prototype.pop),ss=bn(Array.prototype.push),Nh=bn(Array.prototype.splice),Ii=bn(String.prototype.toLowerCase),ul=bn(String.prototype.toString),dl=bn(String.prototype.match),is=bn(String.prototype.replace),jh=bn(String.prototype.indexOf),Fh=bn(String.prototype.trim),qn=bn(Object.prototype.hasOwnProperty),gn=bn(RegExp.prototype.test),as=Bh(TypeError);function bn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return hl(e,t,r)}}function Bh(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return bl(e,n)}}function vt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ii;Gd&&Gd(e,null);let r=t.length;for(;r--;){let o=t[r];if(typeof o=="string"){let i=n(o);i!==o&&(Ph(t)||(t[r]=i),o=i)}e[o]=!0}return e}function Uh(e){for(let t=0;t<e.length;t++)qn(e,t)||(e[t]=null);return e}function or(e){let t=gl(null);for(let[n,r]of tp(e))qn(e,n)&&(Array.isArray(r)?t[n]=Uh(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=or(r):t[n]=r);return t}function ls(e,t){for(;e!==null;){let r=Mh(e,t);if(r){if(r.get)return bn(r.get);if(typeof r.value=="function")return bn(r.value)}e=Dh(e)}function n(){return null}return n}var Vd=hn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),pl=hn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),fl=hn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wh=hn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),_l=hn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),zh=hn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qd=hn(["#text"]),Xd=hn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ml=hn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Zd=hn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Oi=hn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hh=Cn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Kh=Cn(/<%[\w\W]*|[\w\W]*%>/gm),Gh=Cn(/\$\{[\w\W]*/gm),Yh=Cn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Vh=Cn(/^aria-[\-\w]+$/),np=Cn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qh=Cn(/^(?:\w+script|data):/i),Xh=Cn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),rp=Cn(/^html$/i),Zh=Cn(/^[a-z][.\w]*(-[.\w]+)+$/i),Jd=Object.freeze({__proto__:null,ARIA_ATTR:Vh,ATTR_WHITESPACE:Xh,CUSTOM_ELEMENT:Zh,DATA_ATTR:Yh,DOCTYPE_NAME:rp,ERB_EXPR:Kh,IS_ALLOWED_URI:np,IS_SCRIPT_OR_DATA:Qh,MUSTACHE_EXPR:Hh,TMPLIT_EXPR:Gh}),cs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Jh=function(){return typeof window>"u"?null:window},eb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,o="data-tt-policy-suffix";n&&n.hasAttribute(o)&&(r=n.getAttribute(o));let i="dompurify"+(r?"#"+r:"");try{return t.createPolicy(i,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},ep=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function op(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Jh(),t=xe=>op(xe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,o=r.currentScript,{DocumentFragment:i,HTMLTemplateElement:s,Node:l,Element:a,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:m,trustedTypes:_}=e,w=a.prototype,R=ls(w,"cloneNode"),I=ls(w,"remove"),U=ls(w,"nextSibling"),ie=ls(w,"childNodes"),z=ls(w,"parentNode");if(typeof s=="function"){let xe=n.createElement("template");xe.content&&xe.content.ownerDocument&&(n=xe.content.ownerDocument)}let j,O="",{implementation:q,createNodeIterator:W,createDocumentFragment:Y,getElementsByTagName:N}=n,{importNode:F}=r,H=ep();t.isSupported=typeof tp=="function"&&typeof z=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:G,ERB_EXPR:ee,TMPLIT_EXPR:ye,DATA_ATTR:qe,ARIA_ATTR:B,IS_SCRIPT_OR_DATA:Q,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:Se}=Jd,{IS_ALLOWED_URI:C}=Jd,re=null,ke=vt({},[...Vd,...pl,...fl,..._l,...Qd]),ve=null,Me=vt({},[...Xd,...ml,...Zd,...Oi]),he=Object.seal(gl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,Je=null,lt=Object.seal(gl(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),P=!0,ce=!0,se=!1,de=!0,Ee=!1,_e=!0,De=!1,Ue=!1,Qe=!1,Fe=!1,te=!1,V=!1,$e=!0,_t=!1,ct="user-content-",Ke=!0,$=!1,Z={},Re=null,je=vt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Xe=null,Ze=vt({},["audio","video","img","source","image","track"]),We=null,dt=vt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Gt="http://www.w3.org/1998/Math/MathML",St="http://www.w3.org/2000/svg",kt="http://www.w3.org/1999/xhtml",wt=kt,Ft=!1,Pt=null,ae=vt({},[Gt,St,kt],ul),me=vt({},["mi","mo","mn","ms","mtext"]),Ge=vt({},["annotation-xml"]),ut=vt({},["title","style","font","a","script"]),Oe=null,E=["application/xhtml+xml","text/html"],L="text/html",J=null,pe=null,fe=n.createElement("form"),Pe=function(A){return A instanceof RegExp||A instanceof Function},ht=function(){let A=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(pe&&pe===A)){if((!A||typeof A!="object")&&(A={}),A=or(A),Oe=E.indexOf(A.PARSER_MEDIA_TYPE)===-1?L:A.PARSER_MEDIA_TYPE,J=Oe==="application/xhtml+xml"?ul:Ii,re=qn(A,"ALLOWED_TAGS")?vt({},A.ALLOWED_TAGS,J):ke,ve=qn(A,"ALLOWED_ATTR")?vt({},A.ALLOWED_ATTR,J):Me,Pt=qn(A,"ALLOWED_NAMESPACES")?vt({},A.ALLOWED_NAMESPACES,ul):ae,We=qn(A,"ADD_URI_SAFE_ATTR")?vt(or(dt),A.ADD_URI_SAFE_ATTR,J):dt,Xe=qn(A,"ADD_DATA_URI_TAGS")?vt(or(Ze),A.ADD_DATA_URI_TAGS,J):Ze,Re=qn(A,"FORBID_CONTENTS")?vt({},A.FORBID_CONTENTS,J):je,Le=qn(A,"FORBID_TAGS")?vt({},A.FORBID_TAGS,J):or({}),Je=qn(A,"FORBID_ATTR")?vt({},A.FORBID_ATTR,J):or({}),Z=qn(A,"USE_PROFILES")?A.USE_PROFILES:!1,P=A.ALLOW_ARIA_ATTR!==!1,ce=A.ALLOW_DATA_ATTR!==!1,se=A.ALLOW_UNKNOWN_PROTOCOLS||!1,de=A.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ee=A.SAFE_FOR_TEMPLATES||!1,_e=A.SAFE_FOR_XML!==!1,De=A.WHOLE_DOCUMENT||!1,Fe=A.RETURN_DOM||!1,te=A.RETURN_DOM_FRAGMENT||!1,V=A.RETURN_TRUSTED_TYPE||!1,Qe=A.FORCE_BODY||!1,$e=A.SANITIZE_DOM!==!1,_t=A.SANITIZE_NAMED_PROPS||!1,Ke=A.KEEP_CONTENT!==!1,$=A.IN_PLACE||!1,C=A.ALLOWED_URI_REGEXP||np,wt=A.NAMESPACE||kt,me=A.MATHML_TEXT_INTEGRATION_POINTS||me,Ge=A.HTML_INTEGRATION_POINTS||Ge,he=A.CUSTOM_ELEMENT_HANDLING||{},A.CUSTOM_ELEMENT_HANDLING&&Pe(A.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=A.CUSTOM_ELEMENT_HANDLING.tagNameCheck),A.CUSTOM_ELEMENT_HANDLING&&Pe(A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=A.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),A.CUSTOM_ELEMENT_HANDLING&&typeof A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=A.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ee&&(ce=!1),te&&(Fe=!0),Z&&(re=vt({},Qd),ve=[],Z.html===!0&&(vt(re,Vd),vt(ve,Xd)),Z.svg===!0&&(vt(re,pl),vt(ve,ml),vt(ve,Oi)),Z.svgFilters===!0&&(vt(re,fl),vt(ve,ml),vt(ve,Oi)),Z.mathMl===!0&&(vt(re,_l),vt(ve,Zd),vt(ve,Oi))),A.ADD_TAGS&&(typeof A.ADD_TAGS=="function"?lt.tagCheck=A.ADD_TAGS:(re===ke&&(re=or(re)),vt(re,A.ADD_TAGS,J))),A.ADD_ATTR&&(typeof A.ADD_ATTR=="function"?lt.attributeCheck=A.ADD_ATTR:(ve===Me&&(ve=or(ve)),vt(ve,A.ADD_ATTR,J))),A.ADD_URI_SAFE_ATTR&&vt(We,A.ADD_URI_SAFE_ATTR,J),A.FORBID_CONTENTS&&(Re===je&&(Re=or(Re)),vt(Re,A.FORBID_CONTENTS,J)),Ke&&(re["#text"]=!0),De&&vt(re,["html","head","body"]),re.table&&(vt(re,["tbody"]),delete Le.tbody),A.TRUSTED_TYPES_POLICY){if(typeof A.TRUSTED_TYPES_POLICY.createHTML!="function")throw as('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof A.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw as('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');j=A.TRUSTED_TYPES_POLICY,O=j.createHTML("")}else j===void 0&&(j=eb(_,o)),j!==null&&typeof O=="string"&&(O=j.createHTML(""));hn&&hn(A),pe=A}},$t=vt({},[...pl,...fl,...Wh]),gt=vt({},[..._l,...zh]),Ut=function(A){let ge=z(A);(!ge||!ge.tagName)&&(ge={namespaceURI:wt,tagName:"template"});let Ne=Ii(A.tagName),y=Ii(ge.tagName);return Pt[A.namespaceURI]?A.namespaceURI===St?ge.namespaceURI===kt?Ne==="svg":ge.namespaceURI===Gt?Ne==="svg"&&(y==="annotation-xml"||me[y]):!!$t[Ne]:A.namespaceURI===Gt?ge.namespaceURI===kt?Ne==="math":ge.namespaceURI===St?Ne==="math"&&Ge[y]:!!gt[Ne]:A.namespaceURI===kt?ge.namespaceURI===St&&!Ge[y]||ge.namespaceURI===Gt&&!me[y]?!1:!gt[Ne]&&(ut[Ne]||!$t[Ne]):!!(Oe==="application/xhtml+xml"&&Pt[A.namespaceURI]):!1},yt=function(A){ss(t.removed,{element:A});try{z(A).removeChild(A)}catch{I(A)}},Rt=function(A,ge){try{ss(t.removed,{attribute:ge.getAttributeNode(A),from:ge})}catch{ss(t.removed,{attribute:null,from:ge})}if(ge.removeAttribute(A),A==="is")if(Fe||te)try{yt(ge)}catch{}else try{ge.setAttribute(A,"")}catch{}},Ot=function(A){let ge=null,Ne=null;if(Qe)A="<remove></remove>"+A;else{let p=dl(A,/^[\r\n\t ]+/);Ne=p&&p[0]}Oe==="application/xhtml+xml"&&wt===kt&&(A='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+A+"</body></html>");let y=j?j.createHTML(A):A;if(wt===kt)try{ge=new m().parseFromString(y,Oe)}catch{}if(!ge||!ge.documentElement){ge=q.createDocument(wt,"template",null);try{ge.documentElement.innerHTML=Ft?O:y}catch{}}let v=ge.body||ge.documentElement;return A&&Ne&&v.insertBefore(n.createTextNode(Ne),v.childNodes[0]||null),wt===kt?N.call(ge,De?"html":"body")[0]:De?ge.documentElement:v},en=function(A){return W.call(A.ownerDocument||A,A,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Yt=function(A){return A instanceof f&&(typeof A.nodeName!="string"||typeof A.textContent!="string"||typeof A.removeChild!="function"||!(A.attributes instanceof d)||typeof A.removeAttribute!="function"||typeof A.setAttribute!="function"||typeof A.namespaceURI!="string"||typeof A.insertBefore!="function"||typeof A.hasChildNodes!="function")},Mt=function(A){return typeof l=="function"&&A instanceof l};function xt(xe,A,ge){Ri(xe,Ne=>{Ne.call(t,A,ge,pe)})}let Kt=function(A){let ge=null;if(xt(H.beforeSanitizeElements,A,null),Yt(A))return yt(A),!0;let Ne=J(A.nodeName);if(xt(H.uponSanitizeElement,A,{tagName:Ne,allowedTags:re}),_e&&A.hasChildNodes()&&!Mt(A.firstElementChild)&&gn(/<[/\w!]/g,A.innerHTML)&&gn(/<[/\w!]/g,A.textContent)||A.nodeType===cs.progressingInstruction||_e&&A.nodeType===cs.comment&&gn(/<[/\w]/g,A.data))return yt(A),!0;if(!(lt.tagCheck instanceof Function&&lt.tagCheck(Ne))&&(!re[Ne]||Le[Ne])){if(!Le[Ne]&&Wt(Ne)&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne)))return!1;if(Ke&&!Re[Ne]){let y=z(A)||A.parentNode,v=ie(A)||A.childNodes;if(v&&y){let p=v.length;for(let g=p-1;g>=0;--g){let M=R(v[g],!0);M.__removalCount=(A.__removalCount||0)+1,y.insertBefore(M,U(A))}}}return yt(A),!0}return A instanceof a&&!Ut(A)||(Ne==="noscript"||Ne==="noembed"||Ne==="noframes")&&gn(/<\/no(script|embed|frames)/i,A.innerHTML)?(yt(A),!0):(Ee&&A.nodeType===cs.text&&(ge=A.textContent,Ri([G,ee,ye],y=>{ge=is(ge,y," ")}),A.textContent!==ge&&(ss(t.removed,{element:A.cloneNode()}),A.textContent=ge)),xt(H.afterSanitizeElements,A,null),!1)},nn=function(A,ge,Ne){if($e&&(ge==="id"||ge==="name")&&(Ne in n||Ne in fe))return!1;if(!(ce&&!Je[ge]&&gn(qe,ge))){if(!(P&&gn(B,ge))){if(!(lt.attributeCheck instanceof Function&&lt.attributeCheck(ge,A))){if(!ve[ge]||Je[ge]){if(!(Wt(A)&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,A)||he.tagNameCheck instanceof Function&&he.tagNameCheck(A))&&(he.attributeNameCheck instanceof RegExp&&gn(he.attributeNameCheck,ge)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(ge,A))||ge==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&gn(he.tagNameCheck,Ne)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Ne))))return!1}else if(!We[ge]){if(!gn(C,is(Ne,Ae,""))){if(!((ge==="src"||ge==="xlink:href"||ge==="href")&&A!=="script"&&jh(Ne,"data:")===0&&Xe[A])){if(!(se&&!gn(Q,is(Ne,Ae,"")))){if(Ne)return!1}}}}}}}return!0},Wt=function(A){return A!=="annotation-xml"&&dl(A,Se)},an=function(A){xt(H.beforeSanitizeAttributes,A,null);let{attributes:ge}=A;if(!ge||Yt(A))return;let Ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ve,forceKeepAttr:void 0},y=ge.length;for(;y--;){let v=ge[y],{name:p,namespaceURI:g,value:M}=v,X=J(p),ne=M,ue=p==="value"?ne:Fh(ne);if(Ne.attrName=X,Ne.attrValue=ue,Ne.keepAttr=!0,Ne.forceKeepAttr=void 0,xt(H.uponSanitizeAttribute,A,Ne),ue=Ne.attrValue,_t&&(X==="id"||X==="name")&&(Rt(p,A),ue=ct+ue),_e&&gn(/((--!?|])>)|<\/(style|title|textarea)/i,ue)){Rt(p,A);continue}if(X==="attributename"&&dl(ue,"href")){Rt(p,A);continue}if(Ne.forceKeepAttr)continue;if(!Ne.keepAttr){Rt(p,A);continue}if(!de&&gn(/\/>/i,ue)){Rt(p,A);continue}Ee&&Ri([G,ee,ye],bt=>{ue=is(ue,bt," ")});let ot=J(A.nodeName);if(!nn(ot,X,ue)){Rt(p,A);continue}if(j&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!g)switch(_.getAttributeType(ot,X)){case"TrustedHTML":{ue=j.createHTML(ue);break}case"TrustedScriptURL":{ue=j.createScriptURL(ue);break}}if(ue!==ne)try{g?A.setAttributeNS(g,p,ue):A.setAttribute(p,ue),Yt(A)?yt(A):Yd(t.removed)}catch{Rt(p,A)}}xt(H.afterSanitizeAttributes,A,null)},Zt=function xe(A){let ge=null,Ne=en(A);for(xt(H.beforeSanitizeShadowDOM,A,null);ge=Ne.nextNode();)xt(H.uponSanitizeShadowNode,ge,null),Kt(ge),an(ge),ge.content instanceof i&&xe(ge.content);xt(H.afterSanitizeShadowDOM,A,null)};return t.sanitize=function(xe){let A=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ge=null,Ne=null,y=null,v=null;if(Ft=!xe,Ft&&(xe="<!-->"),typeof xe!="string"&&!Mt(xe))if(typeof xe.toString=="function"){if(xe=xe.toString(),typeof xe!="string")throw as("dirty is not a string, aborting")}else throw as("toString is not a function");if(!t.isSupported)return xe;if(Ue||ht(A),t.removed=[],typeof xe=="string"&&($=!1),$){if(xe.nodeName){let M=J(xe.nodeName);if(!re[M]||Le[M])throw as("root node is forbidden and cannot be sanitized in-place")}}else if(xe instanceof l)ge=Ot("<!---->"),Ne=ge.ownerDocument.importNode(xe,!0),Ne.nodeType===cs.element&&Ne.nodeName==="BODY"||Ne.nodeName==="HTML"?ge=Ne:ge.appendChild(Ne);else{if(!Fe&&!Ee&&!De&&xe.indexOf("<")===-1)return j&&V?j.createHTML(xe):xe;if(ge=Ot(xe),!ge)return Fe?null:V?O:""}ge&&Qe&&yt(ge.firstChild);let p=en($?xe:ge);for(;y=p.nextNode();)Kt(y),an(y),y.content instanceof i&&Zt(y.content);if($)return xe;if(Fe){if(te)for(v=Y.call(ge.ownerDocument);ge.firstChild;)v.appendChild(ge.firstChild);else v=ge;return(ve.shadowroot||ve.shadowrootmode)&&(v=F.call(r,v,!0)),v}let g=De?ge.outerHTML:ge.innerHTML;return De&&re["!doctype"]&&ge.ownerDocument&&ge.ownerDocument.doctype&&ge.ownerDocument.doctype.name&&gn(rp,ge.ownerDocument.doctype.name)&&(g="<!DOCTYPE "+ge.ownerDocument.doctype.name+`>
`+g),Ee&&Ri([G,ee,ye],M=>{g=is(g,M," ")}),j&&V?j.createHTML(g):g},t.setConfig=function(){let xe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ht(xe),Ue=!0},t.clearConfig=function(){pe=null,Ue=!1},t.isValidAttribute=function(xe,A,ge){pe||ht({});let Ne=J(xe),y=J(A);return nn(Ne,y,ge)},t.addHook=function(xe,A){typeof A=="function"&&ss(H[xe],A)},t.removeHook=function(xe,A){if(A!==void 0){let ge=qh(H[xe],A);return ge===-1?void 0:Nh(H[xe],ge,1)[0]}return Yd(H[xe])},t.removeHooks=function(xe){H[xe]=[]},t.removeAllHooks=function(){H=ep()},t}var sp=op();var sr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Li=e=>(...t)=>({_$litDirective$:e,values:t}),ko=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var us=class extends ko{constructor(t){if(super(t),this.it=Ht,t.type!==sr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ht||t==null)return this._t=void 0,this.it=t;if(t===Tn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};us.directiveName="unsafeHTML",us.resultType=1;var ip=Li(us);function wl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Br=wl();function fp(e){Br=e}var _s={exec:()=>null};function It(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(o,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(yn.caret,"$1"),n=n.replace(o,s),r},getRegex:()=>new RegExp(n,t)};return r}var tb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),yn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},nb=/^(?:[ \t]*(?:\n|$))+/,rb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ob=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ms=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sb=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,$l=/(?:[*+-]|\d{1,9}[.)])/,_p=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,mp=It(_p).replace(/bull/g,$l).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ib=It(_p).replace(/bull/g,$l).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ab=/^[^\n]+/,Al=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,lb=It(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Al).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),cb=It(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,$l).getRegex(),ji="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Sl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ub=It("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Sl).replace("tag",ji).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),gp=It(xl).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex(),db=It(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",gp).getRegex(),El={blockquote:db,code:rb,def:lb,fences:ob,heading:sb,hr:ms,html:ub,lheading:mp,list:cb,newline:nb,paragraph:gp,table:_s,text:ab},ap=It("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex(),pb={...El,lheading:ib,table:ap,paragraph:It(xl).replace("hr",ms).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ap).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ji).getRegex()},fb={...El,html:It(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Sl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_s,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:It(xl).replace("hr",ms).replace("heading",` *#{1,6} *[^
]`).replace("lheading",mp).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},_b=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,mb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,hp=/^( {2,}|\\)\n(?!\s*$)/,gb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fi=/[\p{P}\p{S}]/u,Tl=/[\s\p{P}\p{S}]/u,bp=/[^\s\p{P}\p{S}]/u,hb=It(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Tl).getRegex(),yp=/(?!~)[\p{P}\p{S}]/u,bb=/(?!~)[\s\p{P}\p{S}]/u,yb=/(?:[^\s\p{P}\p{S}]|~)/u,vb=It(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",tb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),vp=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kb=It(vp,"u").replace(/punct/g,Fi).getRegex(),wb=It(vp,"u").replace(/punct/g,yp).getRegex(),kp="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",$b=It(kp,"gu").replace(/notPunctSpace/g,bp).replace(/punctSpace/g,Tl).replace(/punct/g,Fi).getRegex(),xb=It(kp,"gu").replace(/notPunctSpace/g,yb).replace(/punctSpace/g,bb).replace(/punct/g,yp).getRegex(),Ab=It("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,bp).replace(/punctSpace/g,Tl).replace(/punct/g,Fi).getRegex(),Sb=It(/\\(punct)/,"gu").replace(/punct/g,Fi).getRegex(),Eb=It(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Tb=It(Sl).replace("(?:-->|$)","-->").getRegex(),Cb=It("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Tb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Mi=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Rb=It(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Mi).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wp=It(/^!?\[(label)\]\[(ref)\]/).replace("label",Mi).replace("ref",Al).getRegex(),$p=It(/^!?\[(ref)\](?:\[\])?/).replace("ref",Al).getRegex(),Ob=It("reflink|nolink(?!\\()","g").replace("reflink",wp).replace("nolink",$p).getRegex(),lp=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Cl={_backpedal:_s,anyPunctuation:Sb,autolink:Eb,blockSkip:vb,br:hp,code:mb,del:_s,emStrongLDelim:kb,emStrongRDelimAst:$b,emStrongRDelimUnd:Ab,escape:_b,link:Rb,nolink:$p,punctuation:hb,reflink:wp,reflinkSearch:Ob,tag:Cb,text:gb,url:_s},Ib={...Cl,link:It(/^!?\[(label)\]\((.*?)\)/).replace("label",Mi).getRegex(),reflink:It(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Mi).getRegex()},yl={...Cl,emStrongRDelimAst:xb,emStrongLDelim:wb,url:It(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",lp).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:It(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",lp).getRegex()},Lb={...yl,br:It(hp).replace("{2,}","*").getRegex(),text:It(yl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Pi={normal:El,gfm:pb,pedantic:fb},ds={normal:Cl,gfm:yl,breaks:Lb,pedantic:Ib},Pb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},cp=e=>Pb[e];function ir(e,t){if(t){if(yn.escapeTest.test(e))return e.replace(yn.escapeReplace,cp)}else if(yn.escapeTestNoEncode.test(e))return e.replace(yn.escapeReplaceNoEncode,cp);return e}function up(e){try{e=encodeURI(e).replace(yn.percentDecode,"%")}catch{return null}return e}function dp(e,t){let n=e.replace(yn.findPipe,(i,s,l)=>{let a=!1,u=s;for(;--u>=0&&l[u]==="\\";)a=!a;return a?"|":" |"}),r=n.split(yn.splitPipe),o=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;o<r.length;o++)r[o]=r[o].trim().replace(yn.slashPipe,"|");return r}function ps(e,t,n){let r=e.length;if(r===0)return"";let o=0;for(;o<r;){let i=e.charAt(r-o-1);if(i===t&&!n)o++;else if(i!==t&&n)o++;else break}return e.slice(0,r-o)}function Db(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function pp(e,t,n,r,o){let i=t.href,s=t.title||null,l=e[1].replace(o.other.outputLinkReplace,"$1");r.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:i,title:s,text:l,tokens:r.inlineTokens(l)};return r.state.inLink=!1,a}function Mb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let o=r[1];return t.split(`
`).map(i=>{let s=i.match(n.other.beginningSpace);if(s===null)return i;let[l]=s;return l.length>=o.length?i.slice(o.length):i}).join(`
`)}var qi=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Br}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ps(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Mb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ps(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ps(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ps(t[0],`
`).split(`
`),r="",o="",i=[];for(;n.length>0;){let s=!1,l=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))l.push(n[a]),s=!0;else if(!s)l.push(n[a]);else break;n=n.slice(a);let u=l.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,o=o?`${o}
${d}`:d;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=f,n.length===0)break;let m=i.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let _=m,w=_.raw+`
`+n.join(`
`),R=this.blockquote(w);i[i.length-1]=R,r=r.substring(0,r.length-_.raw.length)+R.raw,o=o.substring(0,o.length-_.text.length)+R.text;break}else if(m?.type==="list"){let _=m,w=_.raw+`
`+n.join(`
`),R=this.list(w);i[i.length-1]=R,r=r.substring(0,r.length-m.raw.length)+R.raw,o=o.substring(0,o.length-_.raw.length)+R.raw,n=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:i,text:o}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,o={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let i=this.rules.other.listItemRegex(n),s=!1;for(;e;){let a=!1,u="",d="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,R=>" ".repeat(3*R.length)),m=e.split(`
`,1)[0],_=!f.trim(),w=0;if(this.options.pedantic?(w=2,d=f.trimStart()):_?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,d=f.slice(w),w+=t[1].length),_&&this.rules.other.blankLine.test(m)&&(u+=m+`
`,e=e.substring(m.length+1),a=!0),!a){let R=this.rules.other.nextBulletRegex(w),I=this.rules.other.hrRegex(w),U=this.rules.other.fencesBeginRegex(w),ie=this.rules.other.headingBeginRegex(w),z=this.rules.other.htmlBeginRegex(w);for(;e;){let j=e.split(`
`,1)[0],O;if(m=j,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),O=m):O=m.replace(this.rules.other.tabCharGlobal,"    "),U.test(m)||ie.test(m)||z.test(m)||R.test(m)||I.test(m))break;if(O.search(this.rules.other.nonSpaceChar)>=w||!m.trim())d+=`
`+O.slice(w);else{if(_||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||U.test(f)||ie.test(f)||I.test(f))break;d+=`
`+m}!_&&!m.trim()&&(_=!0),u+=j+`
`,e=e.substring(j.length+1),f=O.slice(w)}}o.loose||(s?o.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(s=!0)),o.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),o.raw+=u}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=o.raw.trimEnd();for(let a of o.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(a.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};a.checked=d.checked,o.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=d.raw+a.tokens[0].raw,a.tokens[0].text=d.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(d)):a.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):a.tokens.unshift(d)}}if(!o.loose){let u=a.tokens.filter(f=>f.type==="space"),d=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));o.loose=d}}if(o.loose)for(let a of o.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return o}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",o=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:o}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=dp(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),o=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let s of r)this.rules.other.tableAlignRight.test(s)?i.align.push("right"):this.rules.other.tableAlignCenter.test(s)?i.align.push("center"):this.rules.other.tableAlignLeft.test(s)?i.align.push("left"):i.align.push(null);for(let s=0;s<n.length;s++)i.header.push({text:n[s],tokens:this.lexer.inline(n[s]),header:!0,align:i.align[s]});for(let s of o)i.rows.push(dp(s,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=ps(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=Db(t[2],"()");if(i===-2)return;if(i>-1){let s=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,s).trim(),t[3]=""}}let r=t[2],o="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(r);i&&(r=i[1],o=i[3])}else o=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),pp(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:o&&o.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),o=t[r.toLowerCase()];if(!o){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return pp(n,o,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let o=[...r[0]].length-1,i,s,l=o,a=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+o);(r=u.exec(t))!=null;){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i)continue;if(s=[...i].length,r[3]||r[4]){l+=s;continue}else if((r[5]||r[6])&&o%3&&!((o+s)%3)){a+=s;continue}if(l-=s,l>0)continue;s=Math.min(s,s+l+a);let d=[...r[0]][0].length,f=e.slice(0,o+r.index+d+s);if(Math.min(o,s)%2){let _=f.slice(1,-1);return{type:"em",raw:f,text:_,tokens:this.lexer.inlineTokens(_)}}let m=f.slice(2,-2);return{type:"strong",raw:f,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),o=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&o&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let o;do o=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(o!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Nn=class vl{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Br,this.options.tokenizer=this.options.tokenizer||new qi,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:yn,block:Pi.normal,inline:ds.normal};this.options.pedantic?(n.block=Pi.pedantic,n.inline=ds.pedantic):this.options.gfm&&(n.block=Pi.gfm,this.options.breaks?n.inline=ds.breaks:n.inline=ds.gfm),this.tokenizer.rules=n}static get rules(){return{block:Pi,inline:ds}}static lex(t,n){return new vl(n).lex(t)}static lexInline(t,n){return new vl(n).inlineTokens(t)}lex(t){t=t.replace(yn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(yn.tabCharGlobal,"    ").replace(yn.spaceLine,""));t;){let o;if(this.options.extensions?.block?.some(s=>(o=s.call({lexer:this},t,n))?(t=t.substring(o.raw.length),n.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let s=n.at(-1);o.raw.length===1&&s!==void 0?s.raw+=`
`:n.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},n.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),n.push(o);continue}let i=t;if(this.options.extensions?.startBlock){let s=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},l),typeof a=="number"&&a>=0&&(s=Math.min(s,a))}),s<1/0&&s>=0&&(i=t.substring(0,s+1))}if(this.state.top&&(o=this.tokenizer.paragraph(i))){let s=n.at(-1);r&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o),r=i.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let s=n.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+o.raw,s.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):n.push(o);continue}if(t){let s="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,o=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(o=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)a.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,o.index)+"["+"a".repeat(o[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(o=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,o.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(o=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)i=o[2]?o[2].length:0,r=r.slice(0,o.index+i)+"["+"a".repeat(o[0].length-i-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,l="";for(;t;){s||(l=""),s=!1;let a;if(this.options.extensions?.inline?.some(d=>(a=d.call({lexer:this},t,n))?(t=t.substring(a.raw.length),n.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let d=n.at(-1);a.type==="text"&&d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(a=this.tokenizer.emStrong(t,r,l)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),n.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),n.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),n.push(a);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,f=t.slice(1),m;this.options.extensions.startInline.forEach(_=>{m=_.call({lexer:this},f),typeof m=="number"&&m>=0&&(d=Math.min(d,m))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(a=this.tokenizer.inlineText(u)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),s=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=a.raw,d.text+=a.text):n.push(a);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},Ni=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Br}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(yn.notSpaceStart)?.[0],o=e.replace(yn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ir(r)+'">'+(n?o:ir(o,!0))+`</code></pre>
`:"<pre><code>"+(n?o:ir(o,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let s=0;s<e.items.length;s++){let l=e.items[s];r+=this.listitem(l)}let o=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+o+i+`>
`+r+"</"+o+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let o=0;o<e.header.length;o++)n+=this.tablecell(e.header[o]);t+=this.tablerow({text:n});let r="";for(let o=0;o<e.rows.length;o++){let i=e.rows[o];n="";for(let s=0;s<i.length;s++)n+=this.tablecell(i[s]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),o=up(e);if(o===null)return r;e=o;let i='<a href="'+e+'"';return t&&(i+=' title="'+ir(t)+'"'),i+=">"+r+"</a>",i}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let o=up(e);if(o===null)return ir(n);e=o;let i=`<img src="${e}" alt="${n}"`;return t&&(i+=` title="${ir(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},Rl=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jn=class kl{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Br,this.options.renderer=this.options.renderer||new Ni,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Rl}static parse(t,n){return new kl(n).parse(t)}static parseInline(t,n){return new kl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let o=t[r];if(this.options.extensions?.renderers?.[o.type]){let s=o,l=this.options.extensions.renderers[s.type].call({parser:this},s);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){n+=l||"";continue}}let i=o;switch(i.type){case"space":{n+=this.renderer.space(i);break}case"hr":{n+=this.renderer.hr(i);break}case"heading":{n+=this.renderer.heading(i);break}case"code":{n+=this.renderer.code(i);break}case"table":{n+=this.renderer.table(i);break}case"blockquote":{n+=this.renderer.blockquote(i);break}case"list":{n+=this.renderer.list(i);break}case"checkbox":{n+=this.renderer.checkbox(i);break}case"html":{n+=this.renderer.html(i);break}case"def":{n+=this.renderer.def(i);break}case"paragraph":{n+=this.renderer.paragraph(i);break}case"text":{n+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return n}parseInline(t,n=this.renderer){let r="";for(let o=0;o<t.length;o++){let i=t[o];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){r+=l||"";continue}}let s=i;switch(s.type){case"escape":{r+=n.text(s);break}case"html":{r+=n.html(s);break}case"link":{r+=n.link(s);break}case"image":{r+=n.image(s);break}case"checkbox":{r+=n.checkbox(s);break}case"strong":{r+=n.strong(s);break}case"em":{r+=n.em(s);break}case"codespan":{r+=n.codespan(s);break}case"br":{r+=n.br(s);break}case"del":{r+=n.del(s);break}case"text":{r+=n.text(s);break}default:{let l='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}},Di,fs=(Di=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Br}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Nn.lex:Nn.lexInline}provideParser(){return this.block?jn.parse:jn.parseInline}},qt(Di,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(Di,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Di),qb=class{constructor(...e){qt(this,"defaults",wl());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",jn);qt(this,"Renderer",Ni);qt(this,"TextRenderer",Rl);qt(this,"Lexer",Nn);qt(this,"Tokenizer",qi);qt(this,"Hooks",fs);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let o=r;for(let i of o.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of o.rows)for(let s of i)n=n.concat(this.walkTokens(s.tokens,t));break}case"list":{let o=r;n=n.concat(this.walkTokens(o.items,t));break}default:{let o=r;this.defaults.extensions?.childTokens?.[o.type]?this.defaults.extensions.childTokens[o.type].forEach(i=>{let s=o[i].flat(1/0);n=n.concat(this.walkTokens(s,t))}):o.tokens&&(n=n.concat(this.walkTokens(o.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(o=>{if(!o.name)throw new Error("extension name required");if("renderer"in o){let i=t.renderers[o.name];i?t.renderers[o.name]=function(...s){let l=o.renderer.apply(this,s);return l===!1&&(l=i.apply(this,s)),l}:t.renderers[o.name]=o.renderer}if("tokenizer"in o){if(!o.level||o.level!=="block"&&o.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[o.level];i?i.unshift(o.tokenizer):t[o.level]=[o.tokenizer],o.start&&(o.level==="block"?t.startBlock?t.startBlock.push(o.start):t.startBlock=[o.start]:o.level==="inline"&&(t.startInline?t.startInline.push(o.start):t.startInline=[o.start]))}"childTokens"in o&&o.childTokens&&(t.childTokens[o.name]=o.childTokens)}),r.extensions=t),n.renderer){let o=this.defaults.renderer||new Ni(this.defaults);for(let i in n.renderer){if(!(i in o))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let s=i,l=n.renderer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d||""}}r.renderer=o}if(n.tokenizer){let o=this.defaults.tokenizer||new qi(this.defaults);for(let i in n.tokenizer){if(!(i in o))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let s=i,l=n.tokenizer[s],a=o[s];o[s]=(...u)=>{let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.tokenizer=o}if(n.hooks){let o=this.defaults.hooks||new fs;for(let i in n.hooks){if(!(i in o))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let s=i,l=n.hooks[s],a=o[s];fs.passThroughHooks.has(i)?o[s]=u=>{if(this.defaults.async&&fs.passThroughHooksRespectAsync.has(i))return(async()=>{let f=await l.call(o,u);return a.call(o,f)})();let d=l.call(o,u);return a.call(o,d)}:o[s]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await l.apply(o,u);return f===!1&&(f=await a.apply(o,u)),f})();let d=l.apply(o,u);return d===!1&&(d=a.apply(o,u)),d}}r.hooks=o}if(n.walkTokens){let o=this.defaults.walkTokens,i=n.walkTokens;r.walkTokens=function(s){let l=[];return l.push(i.call(this,s)),o&&(l=l.concat(o.call(this,s))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Nn.lex(e,t??this.defaults)}parser(e,t){return jn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},o={...this.defaults,...r},i=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&r.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(o.hooks&&(o.hooks.options=o,o.hooks.block=e),o.async)return(async()=>{let s=o.hooks?await o.hooks.preprocess(t):t,l=await(o.hooks?await o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(s,o),a=o.hooks?await o.hooks.processAllTokens(l):l;o.walkTokens&&await Promise.all(this.walkTokens(a,o.walkTokens));let u=await(o.hooks?await o.hooks.provideParser():e?jn.parse:jn.parseInline)(a,o);return o.hooks?await o.hooks.postprocess(u):u})().catch(i);try{o.hooks&&(t=o.hooks.preprocess(t));let s=(o.hooks?o.hooks.provideLexer():e?Nn.lex:Nn.lexInline)(t,o);o.hooks&&(s=o.hooks.processAllTokens(s)),o.walkTokens&&this.walkTokens(s,o.walkTokens);let l=(o.hooks?o.hooks.provideParser():e?jn.parse:jn.parseInline)(s,o);return o.hooks&&(l=o.hooks.postprocess(l)),l}catch(s){return i(s)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Fr=new qb;function Dt(e,t){return Fr.parse(e,t)}Dt.options=Dt.setOptions=function(e){return Fr.setOptions(e),Dt.defaults=Fr.defaults,fp(Dt.defaults),Dt};Dt.getDefaults=wl;Dt.defaults=Br;Dt.use=function(...e){return Fr.use(...e),Dt.defaults=Fr.defaults,fp(Dt.defaults),Dt};Dt.walkTokens=function(e,t){return Fr.walkTokens(e,t)};Dt.parseInline=Fr.parseInline;Dt.Parser=jn;Dt.parser=jn.parse;Dt.Renderer=Ni;Dt.TextRenderer=Rl;Dt.Lexer=Nn;Dt.lexer=Nn.lex;Dt.Tokenizer=qi;Dt.Hooks=fs;Dt.parse=Dt;var m0=Dt.options,g0=Dt.setOptions,h0=Dt.use,b0=Dt.walkTokens,y0=Dt.parseInline;var v0=jn.parse,k0=Nn.lex;function vr(e){let t=Dt.parse(e),n=sp.sanitize(t);return ip(n)}function ar(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function wo(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Bi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ap={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Nb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},jb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Fb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Fn(e){return!!e&&typeof e=="object"}function Ol(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Il(e,t){let n=Ol(e),r=Ol(t),o=new Map;for(let l of n)o.set(l,(o.get(l)||0)+1);let i=0;for(let l of r){let a=o.get(l)||0;a>0?o.set(l,a-1):i+=1}let s=0;for(let l of o.values())s+=l;return{added:i,removed:s}}function Sp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(o=>Fn(o)&&typeof o.text=="string"?o.text:"").join(""):Fn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(o=>o.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Bb(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ap[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Ol(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:o,removed:i}=Il(n.old_string,n.new_string);r.added=o,r.removed=i}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let o=0,i=0,s=Array.isArray(n.edits)?n.edits:[];for(let l of s){let a=Il(Fn(l)?l.old_string:"",Fn(l)?l.new_string:"");o+=a.added,i+=a.removed}r.added=o,r.removed=i}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Ll(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Ub=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Ep(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Fn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Ub,"").trim();return n.length>0?{kind:"user",text:n}:null}function Pl(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=jb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Fb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Wb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function zb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[],i=[];for(let s of o)if(Fn(s)){if(s.type==="text"&&typeof s.text=="string")i.push(Pl(s.text));else if(s.type==="thinking"){let l=Ll(s.thinking);l&&i.push(l)}else if(s.type==="tool_use"){let l=Bb(s);typeof s.id=="string"&&t.set(s.id,l),i.push(l)}}return n?xp(i,n):i}if(e.type==="user"){let r=e.message,o=r&&Array.isArray(r.content)?r.content:[];for(let s of o)if(Fn(s)&&s.type==="tool_result"){let l=t.get(String(s.tool_use_id));if(l){let a=Sp(s.content);l.result=a,l.output=typeof s.content=="string"?s.content:a,s.is_error===!0&&(l.is_error=!0)}}let i=Ep(r&&r.content);return i?[i]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",o={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?xp([o],n):[o]}return[]}function xp(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Hb(e){let t=typeof e.command=="string"?e.command:"",n=Sp(e.aggregated_output===void 0?e.output:e.aggregated_output),o=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(s=>s.length>0).join(" \xB7 "),i={kind:"tool",tool:"shell",icon:Ap.Bash,command:t,input:{command:t},expandable:!0};return o.length>0&&(i.result=o),typeof e.aggregated_output=="string"&&(i.output=e.aggregated_output),i}function Kb(e){if(e.type==="item.completed"&&Fn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Pl(t.text)];if(t.type==="user_message"){let n=Ep(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Ll(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Hb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Gb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Fn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Fn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Pl(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let s=Ll(n.text);return s?[s]:[]}if(t.type!=="item.completed"||n.kind!=="activity"||typeof n.activity!="string")return[];let r=Nb[n.activity];if(!r)return[];let o,i;if(n.status==="completed")o="\uC644\uB8CC",i="\u2713";else if(n.status==="failed")o="\uC2E4\uD328",i="\u2717";else return[];return[{kind:"tool",tool:`${r} \xB7 ${o}`,icon:i,expandable:!1,result:""}]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Yb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Vb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Fn(t)?t:null}function Tp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(o){let i=Vb(o);if(!i)return[];if(t&&typeof i.parent_tool_use_id=="string"&&i.parent_tool_use_id.length>0)return[];if(i.type==="system"&&i.schema!=="codex-delegation-monitor-v1")return Wb(i,r);let s=i.schema==="codex-delegation-monitor-v1"?Gb(i):Yb(i)?Kb(i):zb(i,n);return s.length>0&&(r.progress=null),s}}}function Dl(e){let t=[],n=Tp(),r=Array.isArray(e)?e:[];for(let o of r)for(let i of n.push(o))t.push(i);return t}var Qb=5,Xb=10,Zb=/Task\s+#(\d+)/,Jb=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,ey=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function gs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ty(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ny(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function ry(e){let t=new Map,n=0;for(let o of e){if(o.kind!=="tool")continue;n+=1;let i=o.input||{};if(o.tool==="TaskCreate"){let a=Zb.exec(o.output||o.result||""),u=String(i.activeForm||i.subject||"").trim();if(!a||u.length===0)continue;t.set(a[1],{label:u,active:i.status==="in_progress"?n:0});continue}if(o.tool!=="TaskUpdate")continue;let s=t.get(String(i.taskId??""));if(!s)continue;let l=i.activeForm||i.subject;typeof l=="string"&&l.trim().length>0&&(s.label=l.trim()),typeof i.status=="string"&&(s.active=i.status==="in_progress"?n:0)}let r=null;for(let o of t.values())o.active>0&&(!r||o.active>r.active)&&(r=o);return r?r.label:null}function oy(e){if(e.tool==="Bash"){let t=e.command||"";return Jb.test(t)?"~ PR/\uAC8C\uC2DC \uC911":ey.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function sy(e){let t=e.filter(o=>o.kind==="tool").slice(-Xb),n=new Map;t.forEach((o,i)=>{let s=oy(o);if(!s)return;let l=n.get(s)||{count:0,last:-1};l.count+=1,l.last=i,n.set(s,l)});let r=null;for(let[o,i]of n)(!r||i.count>r.count||i.count===r.count&&i.last>r.last)&&(r={label:o,count:i.count,last:i.last});return r?r.label:null}function iy(e){let t=ny(e);if(t)return{text:t,guess:!1};let n=ry(e);if(n)return{text:n,guess:!1};let r=sy(e);return r?{text:r,guess:!0}:null}function ay(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:fn(e,t)}function $o(e,t={}){let{transport:n,sessionLogStore:r,onClose:o}=t,i=null,s=null,l=null,a=null,u=null,d=!1,f={},m=!0,_=new Set,w=new Set,R=null,I=null,U=!1,ie=!1,z=!1,j=null,O=null;function q(){U=!1,ie=!1,z=!1,j=null,O=null}async function W(te){if(n){ie=!0,z=!1,Le();try{let V=await Promise.resolve(n("get-attempt-prompt",{attempt_id:te,...u?{root_dir:u}:{}}));if(i!==te)return;!V||typeof V!="object"||Array.isArray(V)?z=!0:(j=V,O=te)}catch{i===te&&(z=!0)}finally{i===te&&(ie=!1,Le())}}}function Y(){if(U=!U,U&&i&&O!==i){W(i);return}Le()}function N(){if(!U)return"";let te=wo({loading:ie,error:z});if(te)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${te}
      </div>`;if(!j)return"";if(j.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let V=Bi(j.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${V?c`<div class="prompt-block__meta">${V} 발송</div>`:""}
      ${typeof j.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",j.task_prompt):""}
      ${typeof j.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",j.system_prompt):""}
    </div>`}function F(){if(!a||!r)return[];let te=r.get(a);return Dl(te?te.lines:[])}function H(){if(!a||!r)return null;let te=r.get(a),V=te?te.last_event_at:null;return typeof V=="number"?V:null}function G(){return f.status==="running"}function ee(){if(G()&&i){I||(I=setInterval(()=>Le(),1e3));return}ye()}function ye(){I&&(clearInterval(I),I=null)}function qe(te){let V=[],$e=0;for(;$e<te.length;){let{idx:_t,line:ct}=te[$e];if(ct.kind==="tool"){let Ke=$e;for(;Ke<te.length&&te[Ke].line.kind==="tool"&&te[Ke].line.tool===ct.tool;)Ke+=1;if(Ke-$e>=Qb&&!w.has(_t)){V.push({kind:"group",idx:_t,tool:ct.tool||"",lines:te.slice($e,Ke)}),$e=Ke;continue}}V.push({kind:"line",idx:_t,line:ct}),$e+=1}return V}function B(te){let V=[],$e=new Map;for(let Ke=0;Ke<te.length;Ke+=1){let $=te[Ke],Z=$.parent_tool_use_id;if(typeof Z=="string"&&Z.length>0){let Re=$e.get(Z);Re||(Re={kind:"subagent",idx:Ke,launch_id:Z,agent_type:null,header:null,lines:[]},$e.set(Z,Re),V.push(Re)),Re.lines.push({idx:Ke,line:$});continue}if($.kind==="tool"&&$.tool==="Agent"&&typeof $.launch_id=="string"&&$.launch_id.length>0){let Re=Q($),je=$e.get($.launch_id);if(je){je.header={idx:Ke,line:$},je.agent_type=Re;continue}let Xe={kind:"subagent",idx:Ke,launch_id:$.launch_id,agent_type:Re,header:{idx:Ke,line:$},lines:[]};$e.set($.launch_id,Xe),V.push(Xe);continue}V.push({kind:"entry",idx:Ke,line:$})}let _t=[],ct=0;for(;ct<V.length;){if(V[ct].kind!=="entry"){_t.push(V[ct]),ct+=1;continue}let Ke=ct;for(;Ke<V.length&&V[Ke].kind==="entry";)Ke+=1;_t.push(...qe(V.slice(ct,Ke))),ct=Ke}return _t}function Q(te){let V=te.input;return V&&typeof V.subagent_type=="string"?V.subagent_type:null}function Ae(te){for(let V=te.length-1;V>=0;V-=1){let $e=te[V];if($e.kind==="result"||$e.kind==="error")return null;if($e.kind==="tool"&&!Object.hasOwn($e,"result"))return $e}return null}function Se(te){for(let V=te.length-1;V>=0;V-=1)if(te[V].kind==="thinking")return te[V];return null}function C(te,V){if(V.kind==="gate")return c`<div class="sv__gate">${V.text}</div>`;if(V.kind==="phase")return c`<div class="sv__phase">${V.text}</div>`;if(V.kind==="result")return c`<div
        class="sv__result${V.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${V.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${vr(V.text||(V.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(V.kind==="thinking"){let $e=_.has(te);return c`<div
        class="sv__think${$e?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>lt(te)}
      >
        <span class="sv__think-line">💭 ${gs(V.text)}</span>
        ${$e?c`<pre class="sv__think-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="user"){let $e=_.has(te);return c`<div
        class="sv__line sv__line--user${$e?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>lt(te)}
      >
        <span class="sv__user-line">▷ ${gs(V.text)}</span>
        ${$e?c`<pre class="sv__user-expand">${V.text}</pre>`:""}
      </div>`}if(V.kind==="error")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="blocker")return c`<div class="sv__error">⛔ ${V.text}</div>`;if(V.kind==="tool"){let $e=_.has(te),_t=V.tool==="Bash"?ty(V.command):0,ct=V.tool==="Bash"?_t>1?gs(V.command):V.command:V.path||V.command||"";return c`<div
        class="sv__tool${$e?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>lt(te)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${V.icon}</span>
          <span class="sv__tool-name">${V.tool}</span>
          ${ct?c`<span class="sv__tool-detail">${ct}</span>`:""}
          ${_t>1?c`<span class="sv__tool-more">⋯ ${_t}줄</span>`:""}
          ${typeof V.added=="number"?c`<span class="sv__diff-add">+${V.added}</span>`:""}
          ${typeof V.removed=="number"?c`<span class="sv__diff-del">−${V.removed}</span>`:""}
          ${V.result?c`<span class="sv__tool-ok">→ ${V.result}</span>`:""}
        </span>
        ${$e?c`<pre class="sv__tool-expand">${re(V)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${vr(V.text||"")}</div>`}function re(te){let V=[];if(te.tool==="Bash"&&typeof te.command=="string"&&te.command.length>0)V.push(te.command);else if(te.input!==void 0)try{V.push(`input: ${JSON.stringify(te.input,null,2)}`)}catch{}return typeof te.output=="string"&&te.output.length>0&&V.push(`output:
${te.output}`),V.join(`

`)}function ke(){if(!i)return c``;let te=F(),V=(s?[f.agent_type,f.model,f.effort]:[f.runner,f.model,f.effort]).filter(Boolean).join(" \xB7 "),$e=f.session_id||"",_t=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${m?"ON":"OFF"}`,ct=G(),Ke=ct?ay(H(),Date.now()):"",$=ct?Ae(te):null,Z=ct?Se(te):null,Re=iy(te);return c`<div class="sv" data-attempt-id=${i}>
      <div class="sv__bar">
        <span class="sv__id"
          >${f.label||(s?f.role||"":i)}</span
        >
        ${Re?c`<span
              class="sv__stage${Re.guess?" sv__stage--guess":""}"
              title=${Re.text}
              >${Re.text}</span
            >`:""}
        ${ct?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${Ke?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${Ke}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${Ke?c`<span class="sv__live-ago">${Ke}</span>`:""}</span
            >`:""}
        ${$e?c`<button
              type="button"
              class="sv__session"
              title=${$e}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${$e}`}
              @click=${()=>ce($e)}
            >
              ⧉ ${$e.slice(0,8)}
            </button>`:""}
        ${f.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${f.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${f.resume_command}`}
              @click=${()=>ce(f.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${V?c`<span class="sv__meta">${V}</span>`:""}
        ${f.worktree?c`<span class="sv__wt" title=${f.worktree}
              >${f.worktree}</span
            >`:""}
        ${s||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${U?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${U?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${Y}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${m?" sv__follow--on":""}"
          aria-pressed=${m?"true":"false"}
          aria-label=${_t}
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${_t}</span>
          <span class="sv__follow-short">⇣ ${m?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Fe()}
        >
          ✕
        </button>
      </div>
      ${s||d?"":N()}
      <div class="sv__body">
        ${te.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:B(te).map(je=>je.kind==="subagent"?Me(je):je.kind==="group"?ve(je):C(je.idx,je.line))}
      </div>
      ${$||Z?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${$?c`<span class="sv__now-icon">${$.icon}</span>
                  <span class="sv__now-name">${$.tool}</span>
                  <span class="sv__now-detail"
                    >${$.tool==="Bash"?gs($.command):$.path||$.command||""}</span
                  >`:""}
            ${Z?c`<span class="sv__now-think"
                  >💭 ${gs(Z.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ve(te){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(te.idx)}
    >
      <span class="sv__group-icon">${te.lines[0].line.icon}</span>
      <span class="sv__group-name">${te.tool}</span>
      <span class="sv__group-count">${te.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Me(te){let V=w.has(te.idx),$e=te.header?te.header.line:null,_t=$e?$e.is_error===!0?"\u2717":typeof $e.result=="string"?"\u2713":"\u27F3":"",ct=$e&&$e.command?$e.command:"";return c`<div class="sv__sub${V?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(te.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${te.agent_type||"subagent"}</span>
        ${ct?c`<span class="sv__sub-detail">${ct}</span>`:""}
        <span class="sv__sub-count">${te.lines.length}줄</span>
        ${_t?c`<span class="sv__sub-state">${_t}</span>`:""}
        ${V?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${V?c`<div class="sv__sub-body">
            ${qe(te.lines).map(Ke=>Ke.kind==="group"?ve(Ke):C(Ke.idx,Ke.line))}
          </div>`:""}
    </div>`}function he(te){w.add(te),Le()}function Le(){pt(ke(),e),ee(),m&&Je()}function Je(){let te=e.querySelector(".sv__body");te&&(te.scrollTop=te.scrollHeight)}function lt(te){_.has(te)?_.delete(te):_.add(te),Le()}function P(){m=!m,Le()}function ce(te){_n(te).then(V=>{V?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function se(te){!i||!te||(f={...f,...te},Le())}function de(te){let V=te.target;if(!V||!V.classList||!V.classList.contains("sv__body"))return;!(V.scrollHeight-V.scrollTop-V.clientHeight<=4)&&m&&(m=!1,Le())}e.addEventListener("scroll",de,!0);function Ee(te){let V=te.target;!V||typeof V.closest!="function"||e.contains(V)||V.closest("dialog")||V.closest(".md-viewer-root")||Fe()}let _e=!1;function De(){_e||(document.addEventListener("mousedown",Ee),_e=!0)}function Ue(){_e&&(document.removeEventListener("mousedown",Ee),_e=!1)}function Qe(te){let V=te&&te.attempt_id;if(!V)return;let $e=typeof te.launch_id=="string"&&te.launch_id.length>0?te.launch_id:null,_t=te.session_ref&&typeof te.session_ref=="object"?te.session_ref:null;if($e&&_t)return;let ct=a;i=V,s=$e,l=_t,a=s?`session-log:${i}:${s}`:`session-log:${i}`,n&&ct&&ct!==a&&Promise.resolve(n("unsubscribe-session-log",{id:ct})).catch(()=>{}),u=typeof te.root_dir=="string"&&te.root_dir.length>0?te.root_dir:null,f=te.meta||{},d=te.hide_prompt===!0,m=!0,_.clear(),w.clear(),q(),!R&&r&&(R=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:a,attempt_id:i,...s?{launch_id:s}:{},...l?{session_ref:l}:{},...u?{root_dir:u}:{}})).catch(()=>{}),De(),Le()}function Fe(){let te=a;Ue(),i=null,s=null,l=null,a=null,u=null,d=!1,_.clear(),w.clear(),q(),ye(),n&&te&&Promise.resolve(n("unsubscribe-session-log",{id:te})).catch(()=>{}),pt(c``,e),o&&o()}return{open:Qe,updateMeta:se,close:Fe,isOpen(){return i!==null},destroy(){ye(),Ue(),R&&(R(),R=null),e.removeEventListener("scroll",de,!0),i=null,s=null,l=null,a=null,u=null,d=!1,pt(c``,e)}}}function ly(e){let t=[],n=e?.workflow?.stages,r=n?.spec?.doc;r&&t.push({kind:"spec",path:r.path,missing_state:r.missing_state});let o=n?.plan?.doc;return o&&t.push({kind:"plan",path:o.path,missing_state:o.missing_state}),t}function Cp(e,t){let n=ly(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${o=>t.onCopyPath(o,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${o=>t.onOpenDoc(o,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var cy="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",uy=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,dy=/^\*\*결론\*\* — (.+)$/;function Ui(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==cy)return null;let n=uy.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],o=n[2],i=n[3],s=2;for(;s<t.length&&t[s].trim().length===0;)s+=1;let l=s<t.length?dy.exec(t[s]):null,a=l?l[1].replace(/\s+/g," ").trim():"",u=l?s+1:s;return{lane:r,identifier:o,timestamp:i,conclusion:a,body:t.slice(u).join(`
`).trim()}}var Rp=20;function Op(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),o=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${o}:${i}`}function py(e){return e.length>Rp?`${e.slice(0,Rp)}\u2026`:e}function fy(e,t,n,r){let o=`${t.lane} ${py(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${o}</span
        >
        <span class="detail-report__time">${Op(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${vr(t.body)}
        </div>`:""}
  </div>`}function _y(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Op(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${vr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ip(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],o=n.expanded||new Set,i=typeof n.draft=="string"?n.draft:"",s=n.sending===!0,l=r.slice().sort((a,u)=>String(u.created_at||"").localeCompare(String(a.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(a=>{let u=Ui(typeof a.text=="string"?a.text:"");return u?fy(a,u,t,o.has(a.id)):_y(a)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${s}
        .value=${i}
        @input=${a=>t.onDraftInput&&t.onDraftInput(a.target.value)}
      ></textarea>
      <div class="detail-comment-compose__row">
        <button
          type="button"
          class="detail-comment-compose__btn"
          ?disabled=${s||i.trim().length===0}
          @click=${()=>t.onSubmit&&t.onSubmit()}
        >
          댓글 추가
        </button>
      </div>
    </div>
  `}var{I:eA}=dc;var Lp=e=>e.strings===void 0;var my={},Pp=(e,t=my)=>e._$AH=t;var kr=Li(class extends ko{constructor(e){if(super(e),e.type!==sr.PROPERTY&&e.type!==sr.ATTRIBUTE&&e.type!==sr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Tn||t===Ht)return t;let n=e.element,r=e.name;if(e.type===sr.PROPERTY){if(t===n[r])return Tn}else if(e.type===sr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Tn}else if(e.type===sr.ATTRIBUTE&&n.getAttribute(r)===t+"")return Tn;return Pp(e),t}});var gy=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Ml={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},Dp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},hy={pin:"pin",global:"global",base:"base"};function by(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${hy[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function yy(e,t,n){switch(e){case"workflow_mode":return qo;case"spec_review_model":case"impl_review_model":return No;case"plan_review_model":return Qs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Xs;case"spec_review_speed":case"plan_review_speed":case"impl_review_speed":return Gn;case"impl_dispatch":return Mo;case"impl_runtime":return Vs;case"impl_model":return fo(n,t.impl_runtime);case"impl_effort":return Pr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Gn;case"orchestration_model":return _o(n,null);case"orchestration_effort":return Pr(n,void 0,t.orchestration_model||$n).filter(r=>r!==$n);default:return[]}}function vy(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${by(e.source)}
    <span class="detail-effective__k"
      >${mr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Js[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${mr[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function Mp(e,t){let n=qa.flatMap(a=>a.keys),r=Na(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Iu(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),i=Object.fromEntries(r.map(a=>[a.key,a])),s=Object.fromEntries(r.filter(a=>a.value!==null).map(a=>[a.key,a.value])),l=r.filter(a=>a.full_value&&a.display!==a.full_value).map(a=>a.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${a=>t.onToggle(a.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${a=>{a.preventDefault();let u=a.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${l}
        >${ky(i)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${o.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${o.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${o.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${qa.map(a=>c`
              <div class="detail-effective__subhead">${a.label}</div>
              ${r.filter(u=>a.keys.includes(u.key)).map(u=>{let d=Hs({key:u.key,choices:yy(u.key,s,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return vy(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${kr(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${a=>t.onPresetSelect(String(a.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(a=>c`<option
                    value=${a.id}
                    ?selected=${a.id===e.preset_id}
                  >
                    ${a.name}${a.compatible===!1?" (\uBE44\uD638\uD658)":""}
                  </option>`)}
            </select>
            <button
              type="button"
              data-apply-impl-preset
              ?disabled=${e.preset_id.length===0||e.preset_busy}
              @click=${t.onPresetApply}
            >
              이 이슈에 적용
            </button>
            <span class="detail-effective__hint"
              >세션 키 15개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function ky(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function wy(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:o}=e;return typeof t!="string"||typeof n!="string"||typeof o!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:o}}function qp(e,t={}){let n=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},o=r.stages||{},i=r.route||n.route||null,s=typeof n.pr_url=="string"?n.pr_url:"",l=typeof n.exec_receipt=="string"?n.exec_receipt:"",a=wy(r.exec_receipt),u=a?Jn(a):l,d=a?`${a.kind}:${a.actor}`:l.split("@")[0],f=Us(r.planned_execution,r.exec_receipt),m=r.chips?.pr?.number,_=typeof m=="number"?`PR #${m}`:"PR",w=Fo(n),R=w!==null&&t.isChipOpen?.("rec")===!0,I=R?Qa({rec:w},"rec"):null;return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${i?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${i}</span
          >`:""}
      ${n.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${s?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${s}
            target="_blank"
            rel="noreferrer"
            >${_}</a
          >`:""}
      ${f?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${f.kind}
            title=${f.title}
            >${f.label}</span
          >`:""}
      ${u?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${u}
            >${d}${a?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${a.effort}</span
                  >`:""}</span
          >`:""}
      ${w?c`<button
            type="button"
            class="detail-summary__chip detail-summary__chip--rec judgement-chip"
            data-chip-key="rec"
            data-state=${w.state}
            aria-expanded=${R?"true":"false"}
            title=${ni(w)}
            @click=${()=>t.onChipToggle?.("rec")}
          >
            ${"\uBCF5\uC7A1"}
          </button>`:""}
    </div>
    ${I?co(I):""}
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${$y(i).map(U=>xy(U,n,o,{label:U.id==="pr"?_:U.label,href:U.id==="pr"?s:""}))}
    </div>
  </section>`}function $y(e){let n=typeof e=="string"&&Object.hasOwn(Ml,e)&&Ml[e]||Ml.spec_backed;return gy.filter(r=>n.includes(r.id))}var Wi={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function xy(e,t,n,r){let o=Ay(e,t,n),i=e.fill_stage?n[e.fill_stage]:null,s=typeof i?.fill=="string"?i.fill:null,l=s?s==="full":o.length>0,a=!l&&s==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=o&&o.split("@")[1]?.slice(0,7)||"",f=u?Wi.stale:l?Wi.on:a?Wi.current:Wi.none,m=Sy(e,n),_=`${r.label} \xB7 ${f}${m?` \xB7 ${m}`:""}${o?` \xB7 ${o}`:""}`,w=`detail-summary__gate${l?" detail-summary__gate--on":""}${a?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,R=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${w}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${_}
      >${R}</a
    >`:c`<span
    class=${w}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${_}
    >${R}</span
  >`}function Ay(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Sy(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(Dp,n)?Dp[n]:""}function zi(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Np(e){return zi(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function jp(e,t){let n=e&&e[t];if(!zi(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(Np),o=Np(n.active)?n.active:null;return{accounts:r,active:o||r.find(i=>i.active===!0)||null}}function Up(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Hi(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${Up(e)}${t}`}function xo(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${Up(e)}`}function Ey(e,t,n){if(n!==null){let o=e==="claude"?Hi:xo,i=t?t.accounts.find(s=>s.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${i?o(i):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:xo({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function Fp(e,t){if(!zi(e)||e.state!=="usable"||!zi(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function Bp(e){let t=e.provider_key==="claude"?Hi:xo,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ey(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function Wp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let o=typeof e.claude_account=="string"?e.claude_account:"",i=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${Bp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:jp(t,"claude"),selected:o,workspace_default:Fp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${Bp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:jp(t,"codex"),selected:i,workspace_default:Fp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ty(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Cy(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ki(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),o=null,i="loading",s="",l=null,a="";function u(R){R.key==="Escape"&&o&&(R.preventDefault(),_())}document.addEventListener("keydown",u);function d(){return o?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>_()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${o}
              >${Ty(o)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>_()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${i==="loading"?c`<div class="mv__status">불러오는 중…</div>`:i==="pending"?c`<div class="mv__status">${a}</div>`:i==="error"?c`<div class="mv__status mv__status--error">
                      ${a||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${l===null?null:c`<pre class="mv__front">
${l}</pre
                        >`}${vr(s)}`}
          </div>
        </div>
      </div>
    `:c``}function f(){pt(d(),e)}async function m(R,I={}){o=R,i="loading",s="",l=null,a="",f();let U=I.workspace||(n?n():"");if(!U){i="error",a="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!r){i="error",a="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let ie="/api/doc?workspace="+encodeURIComponent(U)+"&path="+encodeURIComponent(R);try{let z=await r(ie),j=await z.json().catch(()=>({}));if(!z.ok||!j||j.ok!==!0){if(j?.error==="not_found"&&I.missing_state==="plan_pending"){i="pending",a="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",f();return}i="error",a="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||z.status)+")",f();return}let O=Cy(String(j.content||""));l=O.front,s=O.body,i="ready",f()}catch{i="error",a="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function _(){o=null,pt(c``,e)}function w(){document.removeEventListener("keydown",u),_()}return{open:m,close:_,destroy:w}}var Ry=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Kp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Gi=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Oy=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function zp(e){return typeof e=="string"&&Oy.has(e)}var Iy=["running","done","failed","interrupted"],Ly={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Py(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Dy(e){let t=cn(e);if(t.length>0)return t.map(o=>c`<span class="detail-usage-total" title=${o.tooltip}
          >${o.label}</span
        >`);let n=ao(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Kp}
          >부분 집계</span
        >`:""}`}function Hp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function jl(e){if(typeof e=="number")return hs(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?hs(t):""}function My(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Gp(e,t,n){if(e.provider!=="claude"){let o=e.session_id?` \xB7 thread ${e.session_id}`:"",i=n?" \xB7 \uC774\uC804 \uB77C\uC6B4\uB4DC \uC2A4\uB808\uB4DC \uC774\uC5B4\uAC10":"";return{text:`${n?"\u21A9 ":""}${e.launch_id}`,title:`${e.launch_id}${o}${i}`}}let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function ql(e){return e===null||typeof e=="string"&&e.trim().length>0}function Nl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function qy(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Gi.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?ql(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||ql(t.effort))||!(!("agent_type"in t)||ql(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Iy.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Nl(t.started_at)||!Nl(t.last_event_at)||!Nl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Ny(e,t,n,r){let i=cn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0],s=Gp({provider:t,launch_id:n.receipt_id,session_id:typeof n.session_id=="string"?n.session_id:void 0},n,r);return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${s.title}
      >${s.text}</span
    >
    ${jl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${jl(n.completed_at)}</span
        >`:""}
    ${i?c`<span class="detail-session__usage" title=${i.tooltip}
          >${i.label}</span
        >`:""}
  </div>`}function jy(e,t,n,r,o){let i=e.status==="running"?null:t,l=(i?cn({providers:{[e.provider]:{subtotal:i.subtotal,breakdown:i.usage,...i.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],a=e.status==="running"?hs(e.last_event_at):i?jl(i.completed_at):"",u=(e.provider==="claude"?["Claude",e.agent_type,My(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),d=Gp(e,i,o);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ly[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${u}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${d.title}
      >${d.text}</span
    >
    ${a?c`<span class="detail-session__leg-time detail-session__time"
          >${a}</span
        >`:""}
    ${l?c`<span class="detail-session__usage" title=${l.tooltip}
          >${l.label}</span
        >`:""}
  </button>`}function Fy(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function By(e,t,n){let r=[],o=new Set,i=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let f of i){let m=qy(f);!m||o.has(m.launch_id)||zp(m.agent_type)||(o.add(m.launch_id),r.push(m))}r.sort((f,m)=>(f.started_at||0)-(m.started_at||0));let s={};for(let{role:f,provider:m}of Gi){let _=t?t.roles[f]?.[m]:null;s[f]=_?[..._.legs]:[]}let l=Gi.flatMap(({role:f})=>s[f]),a=new Set,u=new Set,d=[];for(let{role:f,provider:m}of Gi){for(let _ of r.filter(w=>w.role===f&&w.provider===m)){let w=l.find(I=>I.receipt_id===_.launch_id)||null;if(w&&!Fy(_,w))continue;w&&a.add(w.receipt_id);let R=m==="codex"&&u.has(_.session_id);d.push(jy(_,w,e.attempt_id,n,R)),m==="codex"&&u.add(_.session_id)}for(let _ of s[f])if(!a.has(_.receipt_id)&&!zp(_.agent_type)){let w=typeof _.session_id=="string"&&_.session_id.length>0?_.session_id:null,R=m==="codex"&&w!==null&&u.has(w);d.push(Ny(f,m,_,R)),m==="codex"&&w!==null&&u.add(w)}}return d}function Uy(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ry,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(o=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${o.label}</span
          ><span class="detail-session__usage-value"
            >${Py(e[o.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Kp}</span>`:""}
  </div>`}var Wy={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function hs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function zy(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,o])=>`${r}=${o}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Hy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Ky(e,t){let n=Hy[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${Ta(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${Po(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${hs(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="op-btn detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${o=>{o.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Yp(e,t={},n={},r=[]){let o=Array.isArray(e)?e:[],i=Array.isArray(r)?r:[],s=[...i.filter(_=>_&&_.current===!0),...i.filter(_=>_&&_.current!==!0).sort((_,w)=>w.index-_.index)],l=s.map(_=>Ky(_,t)),a=n.expanded||new Set;if(o.length===0&&s.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let _ of o)_&&typeof _.resumed_from=="string"&&_.resumed_from.length>0&&u.add(_.resumed_from);let d=_=>{if(!(_.status==="failed"||_.status==="orphaned"))return"";let R=typeof _.session_id=="string"&&_.session_id.length>0,I=u.has(_.attempt_id),U=R&&!I,ie=R?I?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="op-btn detail-session__resume"
      data-attempt-id=${_.attempt_id}
      ?disabled=${!U}
      title=${ie}
      @click=${z=>{z.stopPropagation(),U&&t.onResume&&t.onResume(_.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},f=_=>{if(!(_.status==="failed"||_.status==="orphaned")||typeof _.cause!="string"||_.cause==="")return"";let R=_.cause_detail,I=R&&typeof R.reason=="string"&&R.reason.length>0?typeof R.command=="string"&&R.command.length>0?`${R.reason} \xB7 ${R.command}`:R.reason:_.cause;return c`<div class="detail-session__cause" title=${I}>
      ${_.cause}
    </div>`},m=_=>{let w=Hp(Ia(_));if(cn(w).length===0&&!ao(_.usage))return"";let R=a.has(_.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${_.attempt_id}
      aria-expanded=${R?"true":"false"}
      title=${R?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${I=>{I.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(_.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Dy(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${l}${o.map(_=>{let w=Ia(_),R=Hp(w),I=cn(R);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${_.status||"unknown"}"
            data-attempt-id=${_.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(_.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Wy[_.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${_.attempt_id}</span>
            ${Lo(_)?c`<span
                  class="detail-session__resumed"
                  title=${Lo(_)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Sn(_)}</span>
            ${I.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${_.session_id?c`<span class="detail-session__sid" title=${_.session_id}
                  >${String(_.session_id).slice(0,8)}</span
                >`:""}
            ${I.length>0?I.map(U=>c`<span
                      class="detail-session__usage"
                      title=${U.tooltip}
                      >${U.label}</span
                    >`):ao(_.usage)?c`<span class="detail-session__usage"
                    >${ao(_.usage)}</span
                  >`:""}
            <span class="detail-session__time">${hs(_.started_at)}</span>
          </button>
          ${m(_)} ${d(_)} ${f(_)} ${zy(_)}
          ${a.has(_.attempt_id)&&_.usage?Uy(_.usage,_.runner==="codex"?"codex":"claude"):""}
          ${By(_,w,t)}
        </div>`})}
    </div>
  `}function Vp(e,t={}){return c`
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
    ${e.expanded?c`<div class="detail-prompt" data-seam="task-prompt">
          ${Gy(e)}
        </div>`:""}
  `}function Gy(e){let t=wo(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?ar("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Bi(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?ar("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?ar("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Ur=10;function Qp(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function Xp(e,t={}){let r=(Array.isArray(e?.events)?e.events:[]).filter(l=>l&&typeof l.summary=="string"&&l.summary.trim().length>0);if(r.length===0)return"";let o=typeof e.shown=="number"&&e.shown>0?e.shown:Ur,i=r.slice(0,o),s=r.length-i.length;return c`
    <div class="detail-section-label">Worker 이력 (${r.length})</div>
    <ol class="detail-timeline" data-seam="worker-timeline">
      ${i.map(l=>c`<li class="detail-timeline__row">
            ${Qp(l.at)?c`<span class="detail-timeline__at"
                  >${Qp(l.at)}</span
                >`:""}
            <span class="detail-timeline__summary">${l.summary}</span>
          </li>`)}
    </ol>
    ${s>0?c`<button
          type="button"
          class="detail-timeline__more"
          data-seam="worker-timeline-more"
          @click=${()=>t.onMore&&t.onMore()}
        >
          더 보기 (${s})
        </button>`:""}
  `}var Yy=["open","in_progress","deferred","resolved","closed"],Vy=[0,1,2,3,4];function Zp(e,t){let n=t.issueStores,r=t.onClose,o=t.transport,i=t.onNavigate,s=t.queueStore,l=t.execPresetStore,a=t.sessionLogStore,u=null,d=null,f={},m="",_=!1,w=[],R=!1,I=!1,U={},ie={claude:null,codex:null},z=null,j=null,O=0,q=!1,W=!1,Y="",N="",F="",H="",G=!1;function ee(){q=!1,W=!1,Y="",N="",F="",H="",G=!1}function ye(){ie={claude:null,codex:null},z=null,j=null,O+=1}async function qe(){if(!o)return null;try{let k=await Promise.resolve(o("get-workspace-accounts",{}));return k&&typeof k.state=="string"?k:null}catch{return null}}async function B(k){try{let D=await fetch(k);if(!D.ok)return null;let K=await D.json();if(!K||typeof K!="object"||!Array.isArray(K.accounts))return null;let we=K.accounts.filter(ze=>ze!==null&&typeof ze=="object"&&!Array.isArray(ze));return{accounts:we,active:we.find(ze=>ze.active===!0)||null}}catch{return null}}async function Q(k){j=k;let D=++O,[K,we,ze]=await Promise.all([B("/api/claude-usage"),B("/api/codex-usage"),qe()]);D!==O||k!==u||(ie={claude:K,codex:we},z=ze,tt())}let Ae=[],Se=null,C=null,re=!1,ke="",ve=!1,Me=0,he=new Set;function Le(){Ae=[],Se=null,C=null,re=!1,ke="",ve=!1,Me+=1,he.clear()}async function Je(k){if(!o)return;let D=++Me;try{let K=await Promise.resolve(o("get-comments",{id:k}));if(D!==Me||k!==u)return;Ae=Array.isArray(K)?K:[],re=!1}catch{if(D!==Me||k!==u)return;re=!0}tt()}function lt(){if(!o||!u)return;let k=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Se!==u){Se=u,C=k,Je(u);return}k!==null&&k!==C&&(C=k,Je(u))}function P(k){he.has(k)?he.delete(k):he.add(k),tt()}function ce(k){let D=ke.trim().length===0;ke=k,D!==(k.trim().length===0)&&tt()}async function se(){let k=ke.trim();if(!o||!u||k.length===0||ve)return;let D=u;ve=!0,tt();let K=!1;try{let we=await Promise.resolve(o("add-comment",{id:D,text:k}));Array.isArray(we)&&we.length>0&&(K=!0,D===u&&(Ae=we,re=!1,ke="",C=we.length))}catch{K=!1}K||be("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),D===u&&(ve=!1),tt()}let de={onToggle:P,onDraftInput:ce,onSubmit:se},Ee=t.mdViewer||null,_e=null;Ee||(_e=document.createElement("div"),_e.className="md-viewer-root",document.body.appendChild(_e));let De=Ee||Ki(_e,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ue=document.createElement("div");Ue.className="session-log-root",document.body.appendChild(Ue);let Qe=$o(Ue,{transport:o?(k,D)=>Promise.resolve(o(k,D)):void 0,sessionLogStore:a}),Fe=!1,te=!1,V=!1,$e=null,_t=null,ct=0;function Ke(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function $(){Fe=!1,te=!1,V=!1,$e=null,_t=null,ct+=1}async function Z(k){if(!o)return;let D=++ct;te=!0,V=!1,tt();try{let K=await Promise.resolve(o("get-bead-prompt",{bead_id:k}));if(D!==ct)return;!K||typeof K!="object"||Array.isArray(K)?V=!0:($e=K,_t=Ke(k))}catch{D===ct&&(V=!0)}finally{D===ct&&(te=!1,tt())}}let Re=[],je=null,Xe=0;function Ze(k,D){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}::${D}`}function We(){Re=[],je=null,Xe+=1}async function dt(k,D){if(!o)return;let K=++Xe,we;try{we=await Promise.resolve(o("get-session-refs",{bead_id:k}))}catch{we=null}K!==Xe||D!==je||(Re=we&&Array.isArray(we.sessions)?we.sessions:[],tt())}function Gt(){if(!o||!u)return;let k=d&&d.metadata,D=k&&typeof k=="object"&&typeof k.session_ref=="string"?k.session_ref:null;if(D===null){We();return}let K=Ze(u,D);je!==K&&(Re=[],je=K,dt(u,K))}let St=[],kt=[],wt=Ur,Ft=null,Pt=0;function ae(k){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${k}`}function me(){St=[],kt=[],wt=Ur,Ft=null,Pt+=1}async function Ge(k,D){if(!o)return;let K=++Pt,we;try{we=await Promise.resolve(o("get-bead-timeline",{bead_id:k}))}catch{we=null}K!==Pt||D!==Ft||(St=we&&Array.isArray(we.events)?we.events:[],kt=we&&Array.isArray(we.attempts)?we.attempts:[],wt=Ur,tt())}function ut(){if(!o||!u)return;let k=ae(u);Ft!==k&&(St=[],kt=[],wt=Ur,Ft=k,Ge(u,k))}function Oe(){wt+=Ur,tt()}function E(){if(Fe=!Fe,Fe&&u&&_t!==Ke(u)){$e=null,Z(u);return}tt()}function L(){let k={};for(let K of kt)K&&typeof K=="object"&&K.bead_id===u&&(k[String(K.attempt_id)]=K);let D=s?s.get():null;for(let K of D&&D.attempts?Object.values(D.attempts):[]){let we=K;we&&we.bead_id===u&&(k[String(we.attempt_id)]=we)}return k}function J(){return u?Object.values(L()).sort((D,K)=>(K.started_at||0)-(D.started_at||0)).map(D=>({attempt_id:D.attempt_id,bead_id:D.bead_id,status:D.status,started_at:typeof D.started_at=="number"?D.started_at:null,runner:D.runner||null,model:D.model||null,effort:D.effort||D.observed_effort||null,speed:D.speed||null,session_id:D.session_id||null,resumed_from:D.resumed_from||null,continuation_mode:D.continuation_mode||null,dismissed_at:typeof D.dismissed_at=="number"?D.dismissed_at:null,cause:typeof D.cause=="string"?D.cause:null,cause_detail:D.cause_detail||null,exec_default_preset_id:typeof D.exec_default_preset_id=="string"?D.exec_default_preset_id:null,exec_default_preset_revision:typeof D.exec_default_preset_revision=="number"?D.exec_default_preset_revision:null,exec_values:D.exec_values&&typeof D.exec_values=="object"?D.exec_values:null,usage:D.usage||null,usage_legs:Array.isArray(D.usage_legs)?D.usage_legs:[],delegation_sessions:Array.isArray(D.delegation_sessions)?D.delegation_sessions:[]})):[]}function pe(){return u?tr(L(),u):null}let fe=new Set;function Pe(k){fe.has(k)?fe.delete(k):fe.add(k),tt()}function ht(k){let D=s?s.get():null,K=D&&D.attempts?D.attempts[k]:null;Qe.open({attempt_id:k,meta:K?{runner:K.runner||void 0,model:K.model||void 0,effort:K.effort||void 0,status:K.status||void 0,session_id:K.session_id||void 0}:{}})}function $t(k,D){let K=s?s.get():null,we=K&&K.attempts?K.attempts[k]:null,st=(we&&Array.isArray(we.delegation_sessions)?we.delegation_sessions:[]).find(jt=>jt&&typeof jt=="object"&&jt.launch_id===D);st&&Qe.open({attempt_id:k,launch_id:D,meta:{runner:st.provider==="claude"?"claude":"codex",role:st.role,...typeof st.agent_type=="string"?{agent_type:st.agent_type}:{},model:st.model,effort:st.effort,session_id:st.session_id,status:st.status}})}async function gt(k){if(!o||!k)return;let D=o,K=()=>{let ze=s?s.get():null;return ze&&typeof ze.revision=="number"?ze.revision:0},we=s?.get()?.attempts?.[k]||null;await oo({context:{bead_id:we?.bead_id||u||"",kind:"session",tuple:we?Sn(we):""},transport:ze=>D("worker-attempt-resume",{attempt_id:k,expected_revision:K(),...ze}),adopt:ze=>{ze?.queue&&s?.set&&s.set(ze.queue)}})}async function Ut(k,D){if(!o||!k)return;let K=o,we=()=>{let Ve=s?s.get():null;return{bead_id:k,...D==="parallel"?{}:{lane:D},expected_revision:Ve&&typeof Ve.revision=="number"?Ve.revision:0}},ze=Ve=>{Ve?.queue&&s?.set&&s.set(Ve.queue)},st=await Promise.resolve(K("worker-queue-place",we()));if(ze(st),st&&st.conflict&&(st=await Promise.resolve(K("worker-queue-place",we())),ze(st)),tt(),!st)return;if(st.applied===!1&&typeof st.admission_reason=="string"){be(`\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: ${st.admission_reason}`,"error",2400);return}if(st.reason==="rejected"){be("\uB300\uAE30 \uC801\uC7AC \uAC70\uBD80: rejected","error",2400);return}if(st.applied===!1)return;let jt=st.queue?Wo({id:k},st.queue).location:null;jt&&"index"in jt&&be(`${Xu(jt.lane)} \uB300\uAE30 #${jt.index+1}\uC5D0 \uCD94\uAC00`,"success",2400)}function yt(k,D){if(D){I=!0,tt();return}Ut(k,"parallel")}function Rt(k,D){let ze=(k.target?.closest?.(".worker-card__place-lane")||null)?.dataset.lane;ze&&(ze!=="parallel"&&!/^s[1-5]$/.test(ze)||(I=!1,tt(),Ut(D,ze)))}function Ot(k){!k||!u||Qe.open(so(k,u,d&&d.status))}let en={onOpen:ht,onOpenDelegation:$t,onResume:gt,onToggleUsage:Pe,onOpenSessionRef:Ot,onCopyResumeCommand:X};function Yt(){let k=s?s.get():null,D={...U};for(let K of[...Pn,...uo]){let we=k&&k[K];typeof we=="string"&&(D[K]=we)}return D}async function Mt(){if(o){try{let k=await Promise.resolve(o("get-session-defaults",{}));U=k&&k.values&&typeof k.values=="object"?k.values:{}}catch{U={}}tt()}}function xt(){let k=s?s.get():null;return k&&k.runner_catalog||null}function Kt(){let k=s?s.get():null;return k&&typeof k.execution_defaults=="object"?k.execution_defaults:null}function nn(){let k=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},K=En({pin:{...k,...f},global:Yt(),execution_defaults:Kt(),runner_catalog:xt(),route:typeof k.route=="string"?k.route:null}).orchestration_model.value||"";return Dn(xt(),K)}function Wt(){let k=l?l.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function an(k){return k?.compatible===!1}function Zt(k){l&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&l.set({revision:k.revision,presets:k.presets})}async function xe(){let k=Wt(),D=k?.presets.find(K=>K.id===m);if(!(!o||!u||!k||!D||an(D)||_)){_=!0,w=[],tt();try{let K=await Promise.resolve(o("apply-impl-preset",Pu(u,D.id,k.revision)));if(K&&K.conflict){Zt(K),be("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let we=K&&Array.isArray(K.issue)?K.issue[0]:K?.issue;if(K&&K.applied&&we&&typeof we=="object"){d=we,w=Array.isArray(K.skipped_orchestration_keys)?K.skipped_orchestration_keys.filter(ze=>typeof ze=="string"):[];for(let ze of Du)delete f[ze];be(w.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}K&&K.error==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(K){K&&typeof K=="object"&&K.code==="bd_readback_failed"?be("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):be("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{_=!1,tt()}}}let A=null;n&&n.subscribe&&(A=n.subscribe(()=>M()));let ge=null;s&&typeof s.subscribe=="function"&&(ge=s.subscribe(()=>{u&&tt()}));let Ne=null,y=null;function v(){y&&(y(),y=null)}l&&typeof l.subscribe=="function"&&(Ne=l.subscribe(()=>{u&&tt()}));function p(k){k.key==="Escape"&&u&&(k.preventDefault(),r())}document.addEventListener("keydown",p);let g=lo(()=>tt());g.attach();function M(){if(u){if(n&&typeof n.snapshotFor=="function"){let k=n.snapshotFor("detail:"+u)||[];d=k.find(K=>K&&K.id===u)||k[0]||d}lt(),Gt(),ut(),tt()}}function X(k){_n(k).then(D=>{D?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function ne(k){k.preventDefault(),k.stopPropagation(),u&&X(u)}function ue(k,D){k.preventDefault(),k.stopPropagation(),X(D)}function ot(k,D,K){k.preventDefault(),k.stopPropagation(),De.open(D,{missing_state:K})}async function bt(k,D){let K=Object.hasOwn(f,k),we=f[k];if(f[k]=D,tt(),!(!o||!u))try{let ze=await Promise.resolve(o("update-exec-settings",Lu(u,k,D.length===0?null:D))),st=Array.isArray(ze)?ze[0]:ze;if(!st||typeof st!="object"||!st.id)throw new Error("exec settings readback failed");d=st,delete f[k],tt()}catch(ze){throw K?f[k]=we:delete f[k],tt(),be("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error"),ze}}function et(k){k.catch(()=>{})}async function Nt(k,D){let K=d||{},we=K.metadata&&typeof K.metadata=="object"?K.metadata:{},ze={};for(let Ve of["impl_runtime","impl_model","impl_effort"])ze[Ve]=Object.hasOwn(f,Ve)?f[Ve]:typeof we[Ve]=="string"?we[Ve]:"";ze[k]=D;let st=Nu(ze,xt(),nn()),jt={};for(let Ve of["impl_runtime","impl_model","impl_effort"])jt[Ve]=f[Ve],f[Ve]=st[Ve]||"";if(tt(),!(!o||!u))return Promise.resolve(o("update-impl-target",{id:u,...st,orchestration_runtime:nn()})).then(Ve=>{let Tt=Array.isArray(Ve)?Ve[0]:Ve;if(!Tt||typeof Tt!="object"||!Tt.id)throw new Error("implementation target readback failed");d=Tt;for(let An of["impl_runtime","impl_model","impl_effort"])delete f[An];tt()}).catch(Ve=>{for(let Tt of["impl_runtime","impl_model","impl_effort"])jt[Tt]===void 0?delete f[Tt]:f[Tt]=jt[Tt];throw tt(),be("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error"),Ve})}async function S(k,D,K){if(!o||!u)return!1;try{let we=await Promise.resolve(o(k,D)),ze=Array.isArray(we)?we[0]:we;return ze&&typeof ze=="object"&&ze.id?(d=ze,!0):(be(K,"error"),!1)}catch(we){return we&&typeof we=="object"&&we.code==="bd_readback_failed"?(be("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(be(K,"error"),!1)}}function x(k){setTimeout(()=>{try{let D=e.querySelector(k);D&&typeof D.focus=="function"&&D.focus()}catch{}},0)}function Ce(){q=!0,Y=d&&d.title||"",tt(),x('.detail-edit__input[data-edit="title"]')}function Be(k){Y=k.target.value}function nt(){q=!1,Y="",tt()}function mt(){S("edit-text",{id:u,field:"title",value:Y},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(q=!1,Y=""),tt()})}function At(){W=!0,N=d&&d.description||"",tt(),x('.detail-edit__textarea[data-edit="description"]')}function Hr(k){N=k.target.value}function kn(){W=!1,N="",tt()}function lr(){S("edit-text",{id:u,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(D=>{D===!0&&(W=!1,N=""),tt()})}function Sr(k,D,K,we){if(k.key==="Escape"){k.stopPropagation(),K();return}k.key==="Enter"&&(!we||k.ctrlKey||k.metaKey)&&(k.preventDefault(),D())}function sa(k){let D=k.target.value;S("update-status",{id:u,status:D},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function ia(k){let D=Number(k.target.value);S("update-priority",{id:u,priority:D},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>tt())}function aa(k){F=k.target.value}function ws(){let k=F.trim();k.length!==0&&S("label-add",{id:u,label:k},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(D=>{D===!0&&(F=""),tt()})}function $s(k){if(k.key==="Escape"){k.stopPropagation(),F="",tt();return}k.key==="Enter"&&(k.preventDefault(),ws())}function la(k){S("label-remove",{id:u,label:k},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>tt())}let ca={onCopyPath:ue,onOpenDoc:ot};function Kr(k){return typeof k=="string"?k:k&&typeof k=="object"?String(k.id||k.to||k.issue_id||k.depends_on||""):""}function Gr(k){return k&&typeof k=="object"?String(k.dependency_type||k.type||""):""}function b(k){switch(k){case"discovered-from":return{glyph:"\u21A9 ",relation:"\uBC1C\uACAC"};case"parent-child":return{glyph:"\u2338 ",relation:"\uC0C1\uC704"};case"related":return{glyph:"\u2194 ",relation:"\uAD00\uB828"};default:return k.length>0?{glyph:`${k} `,relation:k}:{glyph:"",relation:""}}}function h(k,D){let K=T(D),we=[];return k.length>0&&we.push(k),K&&we.push(K),we.length>0?we.join(`
`):void 0}function T(k){if(!k||typeof k!="object")return;let D=typeof k.status=="string"?k.status:"",K=typeof k.title=="string"?k.title:"";return D.length>0&&K.length>0?`${D} \xB7 ${K}`:void 0}function oe(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function le(){return t.depCandidates?t.depCandidates():null}async function Ie(k,D,K){let we=oe(),ze=u;if(!ze)return;if(we.length===0){be("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let st=await S(k,{a:ze,b:D,view_id:ze,root_dir:we},K),jt=st===!0||st!==!1&&st.saved===!0;jt&&t.onDepChanged&&t.onDepChanged({type:k,a:ze,b:D}),k==="dep-add"&&jt&&(H="",G=!1),tt()}function He(k){if(!u)return;let D=globalThis.confirm;typeof D=="function"&&!D(`${k}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Ie("dep-remove",k,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function Et(k){k.disabled||Ie("dep-add",k.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function Vt(k){H=k.target.value,G=!0,tt()}function it(){G||(G=!0,tt())}function rn(k,D){if(k.key==="Escape"){k.stopPropagation(),H="",G=!1,tt();return}k.key==="Enter"&&(k.preventDefault(),D.length===1&&!D[0].disabled&&Et(D[0]))}function ln(k){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${H}
        @focus=${it}
        @input=${Vt}
        @keydown=${D=>rn(D,k)}
      />
      ${G||H.length>0?c`<div class="detail-dep-add__list">
            ${k.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:k.map(D=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${D.bead_id}
                      ?disabled=${D.disabled}
                      title=${dn(D.reason)}
                      @click=${()=>Et(D)}
                    >
                      <span class="detail-dep-add__repo"
                        >${D.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${D.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${D.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function Un(k,D){let K=D.get(k.id),we=i?c`<button
          type="button"
          class="detail-dep__link"
          title=${dn(k.title)}
          @click=${()=>K===void 0?i(k.id):i(k.id,K)}
        >
          ${k.label}
        </button>`:c`<span class="detail-dep__link" title=${dn(k.title)}
          >${k.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${k.kind}${i?" detail-dep--link":""}`}
      >${we}${k.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${k.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+k.id}
            @click=${()=>He(k.id)}
          >
            ✕
          </button>`:""}</span
    >`}function pn(k){let D=Array.isArray(k.dependencies)?k.dependencies:[],K=Array.isArray(k.dependents)?k.dependents:[],we=[];for(let Ve of D){let Tt=Kr(Ve);Tt.length>0&&Gr(Ve)==="blocks"&&we.push({id:Tt,label:`\u26D3 ${Tt}`,kind:"pred",title:h("\uB9C9\uB294",Ve)})}for(let Ve of K){let Tt=Kr(Ve);Tt.length>0&&Gr(Ve)==="blocks"&&we.push({id:Tt,label:`\u2192 ${Tt}`,kind:"succ",title:h("\uB9C9\uD788\uB294",Ve)})}for(let Ve of D){let Tt=Kr(Ve),An=Gr(Ve);if(Tt.length>0&&An!=="blocks"){let Te=b(An);we.push({id:Tt,label:`${Te.glyph}${Tt}`,kind:"other",title:h(Te.relation,Ve)})}}let ze=le(),st=new Map;if(ze)for(let Ve of ze.issues)st.has(Ve.bead_id)||st.set(Ve.bead_id,Ve.root_dir);let jt=ze&&u?Kd(Hd(u,ze),H):[];return c`
      <div class="detail-section-label">의존성</div>
      ${we.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${we.map(Ve=>Un(Ve,st))}
          </div>`}
      ${ze===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ln(jt)}
    `}function un(k){let D=k.metadata||{},K=k.workflow||{},we=K.stages||{},ze=we.spec&&we.spec.stale,st=we.impl&&we.impl.stale,jt=K.quick_fix_review?.state==="stale",Ve=we.plan||null,Tt=K.route_source==="derived",An=K.route||D.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Tt?" detail-kv__v--derived":""}"
          title=${Tt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Tt?"unset":An}</span
        >
      </div>
      ${K.route!=="quick_fix"||Object.hasOwn(D,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${D.spec_review||"\uC5C6\uC74C"}${ze?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ve?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ve?.approval_receipt||"\uC5C6\uC74C"}${Ve?.approval_state==="stale"?" \xB7 stale":Ve?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${K.route!=="quick_fix"||Object.hasOwn(D,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${D.impl_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${K.resolver.attempt} \xB7 ${K.resolver.prior_sha} \u2192 ${K.resolver.sha}`}
              >${`${K.resolver.prior_sha.slice(0,7)} \u2192 ${K.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${K.route==="quick_fix"||Object.hasOwn(D,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${D.quick_fix_review||"\uC5C6\uC74C"}${jt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${K.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${K.planned_execution.kind}</span>
            </div>
            ${K.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${K.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${K.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Jn(K.exec_receipt)}</span
            >
          </div>`:""}
      ${K.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${K.impl_entry.actor}@${K.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${D.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${D.pr_url}</span>
          </div>`:""}
    `}let Rn={route:["quick_fix","spec_backed","full_plan"]};async function Vn(k,D){let K=D.target.value;if(k==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&K!=="full_plan"&&!window.confirm(`full_plan \u2192 ${K||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){tt();return}await S("update-workflow-meta",{id:u,key:k,value:K},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),tt()}function on(k){let D=k.metadata||{};return c` ${((we,ze)=>{let st=Rn[we],jt=typeof D[we]=="string"?D[we]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${we}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${we}
          data-edit=${`wfmeta-${we}`}
          @change=${Ve=>Vn(we,Ve)}
        >
          <option value="" ?selected=${!st.includes(jt)}>
            ${ze}
          </option>
          ${st.map(Ve=>c`<option value=${Ve} ?selected=${jt===Ve}>${Ve}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Qn(k,D){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${Y}
            @input=${Be}
            @keydown=${K=>Sr(K,mt,nt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${mt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${nt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${k}</h2>
        ${cn(D).map(K=>c`<span class="detail-usage-total" title=${K.tooltip}
              >${K.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ce}
        >
          ✎
        </button>
      </div>
    `}function cr(k){let D=tn(k.created_at),K=tn(k.updated_at);return!D&&!K?c``:c`
      ${D?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${D}</span>
          </div>`:""}
      ${K?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${K}</span>
          </div>`:""}
    `}function On(k,D){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${sa}
        >
          ${Yy.map(K=>c`<option value=${K} ?selected=${K===k}>${K}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ia}
        >
          ${Vy.map(K=>c`<option value=${String(K)} ?selected=${K===D}>
                P${K}
              </option>`)}
        </select>
      </div>
    `}function Wn(k){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${At}
            >
              ✎
            </button>`}
      </div>
      ${W?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${N}
              @input=${Hr}
              @keydown=${D=>Sr(D,lr,kn,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${lr}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${kn}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${k||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ye(k){let D=typeof k.notes=="string"?k.notes:"";return D.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${D}</div>
    `}function zt(k){let D=Array.isArray(k.labels)?k.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${D.map(K=>c`<span class="detail-label-chip"
              >${K}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${K}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+K}
                @click=${()=>la(K)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${F}
            @input=${aa}
            @keydown=${$s}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ws}
          >
            추가
          </button>
        </span>
      </div>
    `}function xn(){if(!u)return c``;let k=d||{},D=String(k.id||u),K=k.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",we=pe(),ze=k.status||"open",st=typeof k.priority=="number"?Math.max(0,Math.min(4,k.priority)):"",jt=k.description||"",Ve=s?s.get():null,Tt=Ve&&ze!=="closed"?Wo({...k,id:D},Ve):null,An=Ve?zo(Ve):null,Te={...k,metadata:{...k.metadata||{},...f}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${ne}
            >
              ${D}
            </button>
            ${Tt?c`<button
                  type="button"
                  class="op-btn op-btn--primary detail-overlay__place"
                  data-bead-id=${D}
                  ?disabled=${!Tt.placeable}
                  title=${qr(Tt)}
                  @click=${()=>yt(D,An)}
                >
                  ↴ 대기로
                </button>`:""}
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${Tt&&I&&An?c`<div
                class="place-menu detail-overlay__place-menu"
                @click=${at=>Rt(at,D)}
              >
                ${Va(An,D)}
                <button
                  type="button"
                  class="op-btn op-btn--icon worker-card__place-cancel"
                  data-bead-id=${D}
                  title="레인 선택 취소"
                  aria-label="레인 선택 취소"
                  @click=${()=>{I=!1,tt()}}
                >
                  ✕
                </button>
              </div>`:""}
          ${Qn(K,we)}
          ${qp(Te,{onChipToggle:at=>g.toggle({bead_id:D,chip_key:at}),isChipOpen:at=>g.isOpen({bead_id:D,chip_key:at})})}
          ${Mp({metadata:Te.metadata,workspace_values:Yt(),catalog:xt(),execution_defaults:Kt(),expanded:R,presets:Wt()?.presets||[],preset_id:m,preset_busy:_,skipped_orchestration_keys:w},{onToggle:at=>{R=at,tt()},onEdit:(at,Qt)=>{if(at==="impl_runtime"||at==="impl_model"||at==="impl_effort"){et(Nt(at,Qt??""));return}et(bt(at,Qt??""))},onPresetSelect:at=>{m=at,w=[],tt()},onPresetApply:()=>{xe()}})}
          ${Wp({md:Te.metadata,catalog:ie,workspace_defaults:z,handlers:{onExecChange:(at,Qt)=>et(bt(at,Qt))}})}
          ${On(ze,st)} ${cr(k)}
          ${Wn(jt)}
          ${Ip(Ae,de,{expanded:he,draft:ke,sending:ve,error:re})}
          ${Ye(k)} ${zt(k)} ${pn(k)}
          ${un(k)} ${on(k)}
          ${Cp(k,ca)}
          ${Vp({expanded:Fe,loading:te,error:V,data:$e},{onToggle:E})}
          ${Yp(J(),en,{total:we,expanded:fe},Re)}
          ${Xp({events:St,shown:wt},{onMore:Oe})}
        </div>
      </div>
    `}function tt(){pt(xn(),e)}return{load(k){k!==u&&(f={},I=!1,m="",w=[],R=!1,ee(),Le(),$(),We(),me(),ye()),u=k,d=null,!y&&t.subscribeCandidates&&(y=t.subscribeCandidates(()=>{u&&tt()})),M(),Mt(),j!==k&&Q(k)},clear(){u=null,d=null,f={},I=!1,m="",_=!1,w=[],R=!1,ee(),Le(),$(),We(),me(),ye(),v(),De.close(),Qe.close(),pt(c``,e)},destroy(){A&&(A(),A=null),ge&&(ge(),ge=null),Ne&&(Ne(),Ne=null),v(),document.removeEventListener("keydown",p),g.detach(),Ee||(De.destroy(),_e&&_e.parentNode&&_e.parentNode.removeChild(_e)),Qe.destroy(),Ue.parentNode&&Ue.parentNode.removeChild(Ue),u=null,d=null,ye(),m="",_=!1,w=[],Le(),$(),We(),me(),pt(c``,e)}}}function Jp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),o=t.querySelector("#fatal-error-detail"),i=t.querySelector("#fatal-error-reload"),s=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(u,d,f="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let m=typeof f=="string"?f.trim():"";if(o&&(m.length>0?(o.textContent=m,o.removeAttribute("hidden")):(o.textContent="No additional diagnostics available.",o.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),s&&s.addEventListener("click",()=>l()),t.addEventListener("cancel",u=>{u.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}var Qy="(max-width: 640px)";function Yi(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(Qy),n=!!t.matches;e(n);let r=o=>{let s=!!(typeof o=="object"&&o!==null&&typeof o.matches=="boolean"?o.matches:t.matches);s!==n&&(n=s,e(s))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function Xy(){return{lanes:{done:!0},areas:{}}}function bs(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function Zy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:bs(r.lanes),areas:bs(r.areas)}:{lanes:bs(r),areas:{}}}catch{return null}}function ef(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Vi(e,t=Xy()){let n={lanes:bs(t.lanes),areas:bs(t.areas)},r=Zy(e),o={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(i){return o.lanes[i]===!0},isAreaCollapsed(i){return o.areas[i]===!0},toggle(i){let s=o.lanes[i]!==!0;return o={...o,lanes:{...o.lanes,[i]:s}},ef(e,o),s},toggleArea(i){let s=o.areas[i]!==!0;return o={...o,areas:{...o.areas,[i]:s}},ef(e,o),s}}}function Fl(e){if(typeof e=="string"&&e.length>0)return e;if(e&&typeof e=="object"){let t=e;if(typeof t.message=="string"&&t.message.length>0)return t.message;if(typeof t.error=="string"&&t.error.length>0)return t.error;if(t.error&&typeof t.error=="object"&&typeof t.error.message=="string")return t.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}function Qi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"&&t.length>0):[]}function Xi(e){let{transport:t,console_el:n,getLanes:r,getWorkspaces:o,getCrossLanes:i,reproject:s,onCorrection:l,showToast:a,requestRender:u,adoptQueue:d,onDragBegin:f,candidate_drop:m}=e,_=[],w=null,R=!1,I=null,U=null,ie=null;function z(){I!==null&&clearTimeout(I),I=setTimeout(()=>{I=null,R=!1},0)}function j(){return i()??null}function O(){let P=new Map,ce=o();for(let se of Array.isArray(ce)?ce:[]){if(!se||typeof se!="object")continue;let de=se.bead_blocked_by&&typeof se.bead_blocked_by=="object"?se.bead_blocked_by:{};for(let[Ee,_e]of Object.entries(de))Array.isArray(_e)&&P.set(Ee,Qi(_e));for(let Ee of[...Array.isArray(se.runnable)?se.runnable:[],...Array.isArray(se.session_active)?se.session_active:[]])Ee&&typeof Ee.bead_id=="string"&&Array.isArray(Ee.blocked_by)&&Ee.blocked_by.length>0&&P.set(Ee.bead_id,Qi(Ee.blocked_by))}return P}function q(){let P=new Map,ce=new Map,se=o();for(let de of Array.isArray(se)?se:[]){if(!de||typeof de!="object")continue;let Ee=de.bead_blocked_by&&typeof de.bead_blocked_by=="object"?de.bead_blocked_by:{};for(let[_e,De]of Object.entries(Ee))Array.isArray(De)&&P.set(_e,Qi(De));for(let _e of Array.isArray(de.runnable)?de.runnable:[])_e&&typeof _e.bead_id=="string"&&Array.isArray(_e.blocked_by)&&ce.set(_e.bead_id,Qi(_e.blocked_by))}for(let de of _)for(let Ee of[P,ce]){let _e=Ee.get(de.a);_e!==void 0&&Ee.set(de.a,de.type==="dep-remove"?_e.filter(De=>De!==de.b):_e.includes(de.b)?_e:[..._e,de.b])}return{snapshot:P,runnable:ce}}function W(){let P=O();for(let ce of _){let se=(P.get(ce.a)||[]).slice();ce.type==="dep-remove"?P.set(ce.a,se.filter(de=>de!==ce.b)):se.includes(ce.b)||P.set(ce.a,[...se,ce.b])}return P}function Y(P=r(),ce=j()){let se=new Map;for(let Fe of Array.isArray(ce?.lanes)?ce.lanes:[]){let te=new Map;for(let V of Array.isArray(Fe?.entries)?Fe.entries:[])V&&typeof V.bead_id=="string"&&te.set(V.bead_id,V.dep_created_by_lane===!0);se.set(typeof Fe?.id=="string"?Fe.id:"",te)}let de=new Map,Ee=new Map,_e=new Set,De=new Set;for(let Fe of P.chain_lanes){let te=se.get(Fe.lane_id);de.set(Fe.lane_id,{status:Fe.status,entries:Fe.rows.map((V,$e)=>({bead_id:V.id,root_dir:V.root_dir,...$e===0?{}:{dep_created_by_lane:te?.get(V.id)===!0}}))});for(let V of Fe.rows)Ee.set(V.id,Fe.lane_id),V.fixed&&_e.add(V.id),V.unplaced||De.add(V.id)}let Ue=new Map;for(let Fe of P.parallel_rows)typeof Fe.queue_index=="number"&&Ue.set(Fe.id,Fe.queue_index);for(let Fe of P.queue_groups)for(let te of Fe.sublanes.serial)for(let V of te.items)typeof V.queue_index=="number"&&Ue.set(V.id,V.queue_index);let Qe=q();return{blocked_by_map:W(),snapshot_blocked_by:Qe.snapshot,runnable_blocked_by:Qe.runnable,owner_of:new Map(Object.entries(P.owner_of)),cross_lanes:de,owner_lane_of:Ee,fixed_members:_e,placed_members:De,parallel_rows:P.parallel_rows.map(Fe=>({bead_id:Fe.id,root_dir:Fe.root_dir,queue_index:Fe.queue_index??0})),parallel_raw_length:new Map(Object.entries(P.parallel_raw_length)),queue_index_of:Ue}}function N(P,ce){let se=r();for(let Ee of[...se.runnable,...se.queue,...se.running,...se.pr_wait,...se.done])if(!(Ee.non_occupying||Ee.id!==ce)){if(Ee.root_dir===P)return Ee.expected_revision;break}let de=se.queue_groups.find(Ee=>Ee.root_dir===P);return de?de.revision:0}async function F(P,ce,se,de){if(!t)return null;let _e=await t(P,{...ce,...se?{root_dir:se}:{},expected_revision:de});if(_e&&_e.conflict){_e.queue&&d?.(se,_e.queue);let De=_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de;_e=await t(P,{...ce,...se?{root_dir:se}:{},expected_revision:De})}return _e&&_e.queue&&d?.(se,_e.queue),_e}async function H(P,ce,se,de,Ee){try{let _e=await F(P,ce,se,de.get(se)??N(se,Ee.bead_id));return!_e||typeof _e.applied!="boolean"?(a("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(_e.queue&&typeof _e.queue.revision=="number"&&de.set(se,_e.queue.revision),_e.conflict?(a("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):_e.applied===!1?(a(_e.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${_e.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):_e.queue&&typeof _e.queue.revision=="number"?_e.queue.revision:de.get(se)??0)}catch(_e){return a(Fl(_e),"error"),null}}async function G(P,ce,se=new Map){if(P.type==="worker-queue-disarm"){try{let de=await F(P.type,P.payload,P.root_dir,se.get(P.root_dir)??N(P.root_dir,ce));de&&de.queue&&typeof de.queue.revision=="number"&&se.set(P.root_dir,de.queue.revision)}catch{}return!0}if(P.type==="worker-queue-place"||P.type==="worker-queue-reorder"||P.type==="worker-queue-remove")return await H(P.type,P.payload,P.root_dir,se,{bead_id:ce})!==null;try{return(P.type==="dep-add"||P.type==="dep-remove")&&t&&await t(P.type,{a:P.a,b:P.b,...P.root_dir?{root_dir:P.root_dir}:{}}),!0}catch(de){return a(Fl(de),"error"),!1}}function ee(P){(P.type==="dep-add"||P.type==="dep-remove")&&(_=[..._,{type:P.type,a:P.a,b:P.b}])}async function ye(P,ce){if(!t)return{ok:!1};try{let se=await t(P.type,{...P.payload,expected_revision:ce});return!se||typeof se.revision!="number"?(a("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:se.revision}}catch(se){let de=se,Ee=de&&de.code==="conflict"?de.details?.cross_lanes:null;return Ee&&typeof Ee.revision=="number"&&Array.isArray(Ee.lanes)?{ok:!1,conflict:Ee}:(a(Fl(se),"error"),{ok:!1})}}async function qe(P,ce,se){let de=new Map,Ee=[],_e=P.ops.slice(0,P.lane_op_index),De=P.ops.slice(P.lane_op_index);for(let Qe of _e){if(!await G(Qe,se,de))return{done:!0};ee(Qe)}let Ue=ce;for(let Qe of P.lane_ops){if(Ue===null)return a("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let Fe=await ye(Qe,Ue);if(!Fe.ok)return Fe.conflict?{done:!1,conflict:Fe.conflict}:{done:!0};Ue=Fe.revision}for(let Qe of De){if(!await G(Qe,se,de))return{done:!0};ee(Qe),Qe.type==="dep-add"&&Ee.push(Qe)}for(let Qe of Wd(Ee))Ue=await B(Qe,Ue);return{done:!0}}async function B(P,ce){if(ce===null||!t)return ce;let se=P.pairs,de=ce;for(let Ee=0;Ee<2;Ee+=1){if(se.length===0)return de;try{let _e=await t("monitor-lane-provenance",{lane_id:P.lane_id,pairs:se.map(De=>({bead_id:De.bead_id,after:De.after,value:!0})),expected_revision:de});return _e&&typeof _e.revision=="number"?_e.revision:de}catch(_e){let De=_e,Ue=De&&De.code==="conflict"?De.details?.cross_lanes:null;if(!Ue||typeof Ue.revision!="number"||!Array.isArray(Ue.lanes))return de;let Qe=Ue.lanes.find(Fe=>Fe&&Fe.id===P.lane_id);se=zd(Array.isArray(Qe?.entries)?Qe.entries:[],se),de=Ue.revision}}return de}async function Q(P,ce,se=[]){_=se,l("",0);let de=r(),Ee=j();for(let _e=0;;_e+=1){let De=P(Y(de,Ee));if("refused"in De){a(De.refused,"error");break}let Ue=await qe(De,de.cross_lanes_revision,ce);if(Ue.done){De.correction&&l(De.correction.lane_id,De.correction.corrected);break}if(_e>=1){a("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}let Qe=s(Ue.conflict);de=Qe.lanes,Ee=Qe.raw_lanes}_=[],u()}async function Ae(P,ce){await Q(se=>Ci(P,ce,se),P.bead_id)}function Se(P,ce){let se=ce&&typeof ce.closest=="function"?ce.closest("[data-row-index]"):null;if(se&&P.contains(se)){let de=Number(se.getAttribute("data-row-index"));return Number.isFinite(de)?de:0}return P.querySelectorAll("[data-row-index]").length}function C(P){let ce=typeof P?.closest=="function"?P.closest(".worker-pane--collapsed[data-lane]"):null;if(!ce)return null;let se=ce.getAttribute("data-lane");return se==="queue"?{zone:ce,target:{kind:"parallel",marker_index:r().parallel_rows.length}}:se==="candidate"&&m===!0?{zone:ce,target:{kind:"candidate"}}:null}function re(P){let ce=P.target;if(!w)return null;let se=typeof ce?.closest=="function"?ce.closest("[data-drop]"):null;if(!se)return C(ce);let de=se.getAttribute("data-drop");if(de==="candidate")return{zone:se,target:{kind:"candidate"}};if(de==="parallel")return{zone:se,target:{kind:"parallel",marker_index:Se(se,ce)}};if(de==="chain")return{zone:se,target:{kind:"chain",lane_id:se.getAttribute("data-lane-id")||"",marker_index:Se(se,ce)}};if(de==="repo-serial"){let Ee=se.getAttribute("data-root-dir")||"";if(Ee!==w.root_dir)return null;let _e=typeof ce?.closest=="function"?ce.closest("[data-queue-index]"):null,De=_e&&se.contains(_e)?_e.getAttribute("data-queue-index"):se.getAttribute("data-lane-length"),Ue=Number(De);return{zone:se,target:{kind:"repo-serial",root_dir:Ee,lane_id:se.getAttribute("data-lane-id")||"",index:Number.isFinite(Ue)?Ue:0}}}return null}function ke(){for(let P of Array.from(n.querySelectorAll(".is-drop-over")))P.classList.remove("is-drop-over")}function ve(P){U=P.target instanceof Element?P.target:null}function Me(P){let ce=P.target,se=typeof ce?.closest=="function"?ce.closest('[draggable="true"][data-bead-id]'):null,de=se?se.closest("[data-drag-kind]"):null;if(!de)return;if(se&&U&&se.contains(U)&&typeof U.closest=="function"&&U.closest("input, button, a")){P.preventDefault();return}let Ee=de.getAttribute("data-bead-id")||"",_e=de.getAttribute("data-drag-kind")||"",De=de.getAttribute("data-root-dir")||"";if(!Ee||!_e)return;let Ue=de.getAttribute("data-queue-index")||"",Qe=Number(Ue),Fe=de.getAttribute("data-lane-id")||"";w={kind:_e,bead_id:Ee,root_dir:De,...Ue!==""&&Number.isFinite(Qe)?{queue_index:Qe}:{},...Fe?{lane_id:Fe}:{}},R=!0,f?.(),n.classList.add("is-dragging");try{P.dataTransfer?.setData("text/plain",Ee),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}function he(P){let ce=re(P);ce&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),ce.zone.classList.add("is-drop-over"))}function Le(P){let ce=P.target;typeof ce?.closest=="function"&&(ce.closest("[data-drop]")?.classList.remove("is-drop-over"),ce.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function Je(){w=null,ke(),n.classList.remove("is-dragging"),z()}function lt(P){let ce=re(P),se=w;w=null,ke(),n.classList.remove("is-dragging"),!(!ce||!se)&&(P.preventDefault(),Ae(se,ce.target))}return{attach(P){ie||(ie=P,P.addEventListener("pointerdown",ve),P.addEventListener("dragstart",Me),P.addEventListener("dragover",he),P.addEventListener("dragleave",Le),P.addEventListener("drop",lt),P.addEventListener("dragend",Je))},detach(){I!==null&&(clearTimeout(I),I=null);let P=ie;ie=null,P&&(P.removeEventListener("pointerdown",ve),P.removeEventListener("dragstart",Me),P.removeEventListener("dragover",he),P.removeEventListener("dragleave",Le),P.removeEventListener("drop",lt),P.removeEventListener("dragend",Je))},isDragging(){return w!==null},consumeClickSuppression(){let P=R;return R=!1,P},applyDrop:Ae,runPlanned:Q,dropModel:Y,sendOp:G,sendQueueCas:H,rememberDep:ee}}var Bl=Object.freeze({repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",manual_target_missing:"\uC218\uB3D9 \uBC30\uD3EC \uAE30\uB85D\uC5D0 \uD540\uB41C \uB300\uC0C1 SHA\uAC00 \uC5C6\uC5B4 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",bootstrap_not_approved:"\uCCAB [deploy] \uC120\uC5B8\uC740 \uC0AC\uB78C \uC2B9\uC778 \uC5C6\uC774 \uC2E4\uD589\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Worker \uC124\uC815\uC758 [\uBC30\uD3EC \uC2E4\uD589]\uC73C\uB85C \uC6D0\uACA9 base tip\uC744 \uD55C \uBC88 \uBC30\uD3EC\uD55C \uB4A4 [\uC815\uC0B0 \uC7AC\uAC1C]\uB97C \uB204\uB974\uC138\uC694 \u2014 \uADF8 \uB4A4 \uBA38\uC9C0\uBD80\uD130\uB294 \uC790\uB3D9 \uBC30\uD3EC\uB429\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_red:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",cleanup_failed:"\uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",retry_exhausted:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB97C \uBAA8\uB450 \uC4F0\uACE0\uB3C4 \uAC19\uC740 \uC2E4\uD328\uAC00 \uC774\uC5B4\uC84C\uC2B5\uB2C8\uB2E4.",conflict_unresolved:"\uCDA9\uB3CC \uD574\uC18C\uAC00 \uB05D\uB098\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",internal_record_failed:"Worker \uB0B4\uBD80 \uAE30\uB85D\uC774 \uC2E4\uD328\uD574 \uC9C4\uD589\uC744 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.",foreign_landing_unpinned:"\uB2E4\uB978 \uC800\uC7A5\uC18C \uCC29\uC9C0\uC778\uB370 foreign_repo\xB7foreign_path\xB7foreign_base \uD540\uC774 \uC5C6\uAC70\uB098 \uD615\uC2DD\uC774 \uD2C0\uB9BD\uB2C8\uB2E4.",foreign_checkout_unavailable:"\uD540\uB41C \uB300\uC0C1 \uC800\uC7A5\uC18C \uCCB4\uD06C\uC544\uC6C3\uC774 \uC5C6\uAC70\uB098 foreign_repo\uC640 \uAC19\uC740 URL\uC758 remote\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",foreign_deploy_unsupported:"\uB300\uC0C1 \uC800\uC7A5\uC18C\uAC00 [deploy]\uB97C \uC120\uC5B8\uD574 Worker\uAC00 \uBC30\uD3EC \uC99D\uAC70\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC138\uC158\uC774 \uBC30\uD3EC\uC640 \uB9C8\uAC10\uC744 \uC18C\uC720\uD569\uB2C8\uB2E4.",repair_lane_retired:"\uC790\uB3D9 \uC218\uB9AC \uB808\uC778\uC774 \uC740\uD1F4\uD574 \uC0AC\uB78C \uCC98\uB9AC\uB85C \uB118\uC5B4\uC654\uC2B5\uB2C8\uB2E4."});var tf={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",job_script_failure:"\uC7A1 \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428",quickfix_landing_failed:"\uCC29\uC9C0 \uC2E4\uD328",runner_exit:"\uC138\uC158 \uC2E4\uD328",session_parked:"\uC138\uC158 \uB300\uAE30",session_ended_unresolved:"\uC138\uC158 \uC885\uB8CC",prerequisite_unmet:"\uC120\uD589 \uB300\uAE30",delivery_unproven:"\uCC29\uC9C0 \uC99D\uAC70 \uBD80\uC871"},nf={overloaded_529:"Claude API \uACFC\uBD80\uD558(529)\uB85C \uBCF4\uB958",rate_limited_429:"Claude API \uC694\uCCAD \uD55C\uB3C4(429)\uB85C \uBCF4\uB958"},rf={"session_hard_stop:failure":"\uC138\uC158\uC774 \uC2E4\uD328\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","session_hard_stop:environment":"\uC138\uC158\uC774 \uD658\uACBD \uC624\uB958\uB97C \uBCF4\uACE0\uD558\uACE0 \uC885\uB8CC","resume_failed:transcript_missing":"\uC774\uC5B4\uD558\uAE30 \uB300\uC0C1 \uC138\uC158 \uAE30\uB85D\uC774 \uC5C6\uC74C \u2014 \uC0C8 \uC138\uC158\uC73C\uB85C \uB300\uCCB4"};function Jy(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function ev(e,t){if(typeof e!="string"||!e.startsWith("provider_outage:"))return null;let n=e.slice(16);if(n==="usage_limit"){let o=t&&typeof t=="object"?t.resets_at:null,i=Jy(o);return i?`\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958 \u2014 \uB9AC\uC14B ${i}`:"\uACC4\uC815 \uC0AC\uC6A9 \uD55C\uB3C4\uB85C \uBCF4\uB958"}if(Object.hasOwn(nf,n))return nf[n];let r=/^http_(5\d\d)$/.exec(n);return r?`Claude API \uC624\uB958(${r[1]})\uB85C \uBCF4\uB958`:null}function Ji(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Zi(e){for(let t of Ji(e)){if(Object.hasOwn(tf,t))return tf[t];if(t.startsWith("session_"))return"\uC138\uC158 \uC2E4\uD328"}return null}function sf(e){return Ji(e).length===0?null:Zi(e)||"\uC2E4\uD328"}function Wr(e){let t=null;for(let n of Ji(e))Object.hasOwn(Bl,n)&&(t=Bl[n]);return t}function wr(e,t){if(typeof e=="string"&&Object.hasOwn(rf,e))return rf[e];let n=ev(e,t);if(n!==null)return n;let r=Zi(e),o=Wr(e);return r&&o?`${r} \u2014 ${o}`:r||o?r||o:typeof e=="string"?e:""}function af(e,t){let n=Zi(e)??Zi(t),r=Wr(t)??Wr(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var tv=new Set(["repo_operation_timeout_unresolved"]);function nv(e){for(let t of Ji(e))if(tv.has(t)||t.startsWith("repo_ops_"))return!0;return!1}function rv(e,t){return t.code==="interrupted"||t.interrupted===!0||e.failure_kind==="interrupted_without_terminal_exit"||t.code==="interrupted_without_terminal_exit"}function lf(e,t){if(!e||typeof e!="object")return"";let n=e.failure;if(!n||typeof n!="object"||nv(n.code))return"";if(n.code==="timeout"){let o=Number(t);return Number.isFinite(o)&&o>0?`\uD0C0\uC784\uC544\uC6C3 ${Math.round(o/1e3)}\uCD08 \uCD08\uACFC`:"\uD0C0\uC784\uC544\uC6C3 \uCD08\uACFC"}if(rv(e,n))return"\uC885\uB8CC \uAE30\uB85D \uC5C6\uC74C \u2014 \uC911\uB2E8\uB428";let r=typeof e.elapsed_ms=="number"&&Number.isFinite(e.elapsed_ms)&&e.elapsed_ms>=0?` \xB7 ${Nr(e.elapsed_ms)}`:"";return typeof e.signal=="string"&&e.signal.length>0?`signal ${e.signal}${r}`:Number.isInteger(e.exit_code)?`exit ${e.exit_code}${r}`:""}var of={schema_unsupported:"\uD540\uB41C \uC815\uCC45 \uC2A4\uD0A4\uB9C8\uB97C \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."};function cf(e){if(!e||typeof e!="object")return"";let t=e.retry;if(!t||typeof t!="object")return"";if(typeof t.blocked_reason=="string"&&t.blocked_reason)return`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uBABB \uD568 \u2014 ${Object.hasOwn(of,t.blocked_reason)?of[t.blocked_reason]:t.blocked_reason}`;if(t.status==="absorbed"){let n=t.absorbed&&typeof t.absorbed=="object"?t.absorbed:null,r=wr(n?.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428 \u2014 \uCCAB \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uB85C \uD574\uC18C\uB428"}if(e.state!=="failed")return"";if(t.status==="not_applicable")return"\uC7AC\uC2DC\uB3C4 \uB300\uC0C1 \uC544\uB2D8 \u2014 \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804 \uC2E4\uD328";if(t.status==="consumed"){let n=typeof t.first_fingerprint=="string"&&t.first_fingerprint?t.first_fingerprint:null;if(n===null)return"";if(n===e.failure?.fingerprint)return"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uAC19\uC740 \uC2E4\uD328";let r=wr(t.first_failure?.code);return r?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328: ${r}`:"\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 1\uD68C \u2014 \uB2E4\uB978 \uC2E4\uD328"}return""}function ov(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}var uf=200;function sv(e){return typeof e!="string"||e.length===0?"":e.length>uf?`${e.slice(0,uf)}\u2026`:e}function iv(e){let t=e&&e.attempts>0&&e.max>0?` ${e.attempts}/${e.max}`:"",n=e&&typeof e.next_at=="number"?` \xB7 ${new Date(e.next_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return`\u21BB \uC7AC\uC2DC\uB3C4 \uB300\uAE30${t}${n}`}function Ul(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function av(e){if(!e)return"";let t=e.auto_resume==="disarmed"?" \xB7 \uC218\uB3D9 \uC870\uCE58":"";if(e.kind==="usage_limit"){let r=Ul(e.resets_at);if(!r)return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 \xB7 \uB9AC\uC14B \uBBF8\uC0C1${t}`;let o=e.target?.account_alias||e.target?.account||"";return`\u23F3 \uD55C\uB3C4 \uB300\uAE30 ${r}${o?` \xB7 ${o}`:""}${t}`}let n=Ul(e.next_probe_at);return`\u26A0\uFE0F \uACF5\uAE09\uC790 \uC7A5\uC560${n?` \xB7 \uB2E4\uC74C \uD504\uB85C\uBE0C ${n}`:""}${t}`}function pf(e){if(!e)return"";let t=Array.isArray(e.timeline)?e.timeline:[],n=typeof e.log_path=="string"?e.log_path:"",r=e.log_expired===!0,o=e.log_unreadable===!0;return t.length===0&&n.length===0&&!r&&!o?"":c`${t.length>0?c`<ol class="rtile__history" data-seam="tile-timeline">
        ${t.map(i=>c`<li class="rtile__history-row">
              ${df(i.at)?c`<span class="rtile__history-at"
                    >${df(i.at)}</span
                  >`:""}<span class="rtile__history-summary">${i.summary}</span>
            </li>`)}
      </ol>`:""}${o?c`<p
        class="rtile__history-log"
        data-seam="tile-log-path"
        title="로그 파일을 읽을 수 없습니다 — 삭제된 것이 아닙니다"
      >
        읽기 실패
      </p>`:r?c`<p
          class="rtile__history-log"
          data-seam="tile-log-path"
          title="180일 보존 정책으로 삭제됨"
        >
          만료됨
        </p>`:n.length>0?c`<p class="rtile__history-log" data-seam="tile-log-path">
            ${Mr(n)}
          </p>`:""}`}function df(e){return typeof e!="number"||!Number.isFinite(e)?"":new Date(e).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}function lv(e,t){if(!e||e.open!==!0)return"";let n=Wr(e.cause)||wr(e.cause,e.cause_detail),r=e.retry&&e.retry.attempts>0?`\uC790\uB3D9 \uC7AC\uC2DC\uB3C4 ${e.retry.attempts}\uD68C \u2014 \uAC19\uC740 \uC624\uB958`:"",o=e.cause_detail,i=e.quickfix_lane&&e.quickfix_landing?e.quickfix_landing:null,s=i?[i.cursor||null,typeof i.head_sha=="string"?i.head_sha.slice(0,7):null,i.reason||null].filter(Boolean).join(" \xB7 "):"",l=typeof e.finished_at=="number"?`${new Date(e.finished_at).toLocaleString("ko-KR")} \xB7 ${fn(e.finished_at,t)}`:"",a=[e.runner,e.model,e.observed_effort??e.effort,e.speed].filter(m=>typeof m=="string"&&m.length>0).join(" \xB7 "),u=e.usage?.total_cost_usd,d=typeof u=="number"&&Number.isFinite(u)?`$${u.toFixed(2)}`:"",f=pf(e);return c`<div
    class="rtile__failure-pop"
    role="dialog"
    aria-label="실패 상세"
  >
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${f?c`<div>
            <dt>이력</dt>
            <dd>${f}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>원인</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>재시도 이력</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${e.cause?c`<div>
            <dt>실패 코드</dt>
            <dd><code>${e.cause}</code></dd>
          </div>`:""}
      ${o?.reason?c`<div>
            <dt>가드/원인</dt>
            <dd>${o.reason}</dd>
          </div>`:""}
      ${o?.command?c`<div>
            <dt>명령</dt>
            <dd><code>${o.command}</code></dd>
          </div>`:""}
      ${s?c`<div>
            <dt>착지 단계</dt>
            <dd>${s}</dd>
          </div>`:""}
      ${l?c`<div>
            <dt>실패 시각</dt>
            <dd>${l}</dd>
          </div>`:""}
      ${a?c`<div>
            <dt>실행</dt>
            <dd>${a}</dd>
          </div>`:""}
      ${e.attempt_id?c`<div>
            <dt>attempt id</dt>
            <dd>
              <code>${e.attempt_id}</code>
              <button
                type="button"
                class="rtile__attempt-copy"
                data-attempt-id=${e.attempt_id}
                title="attempt id 복사"
                aria-label="attempt id 복사"
              >
                ⧉
              </button>
            </dd>
          </div>`:""}
      ${d?c`<div>
            <dt>비용</dt>
            <dd>${d}</dd>
          </div>`:""}
      <div>
        <dt>재개</dt>
        <dd>
          ${e.resume_eligible?"\uC774\uC5B4\uD558\uAE30 \uAC00\uB2A5":e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
        </dd>
      </div>
    </dl>
    ${e.attempt_id?c`<button
          type="button"
          class="rtile__session"
          title="실패 세션 열기"
          aria-label="실패 세션 열기"
        >
          ▤ 세션
        </button>`:""}
    ${e.landed?c`<p class="rtile__failure-landed">
          이미 base에 착지됨 — 이어하기로 배포·정리를 재개
        </p>`:""}
  </div>`}function cv(e){return e==="pending"?"\uD68C\uBCF5 \uD6C4 \uC790\uB3D9 \uC7AC\uAC1C \uB300\uAE30":e==="disarmed"?"\uC790\uB3D9 \uC7AC\uAC1C \uC18C\uC9C4 \xB7 \uC218\uB3D9 \uC870\uCE58 \uD544\uC694":typeof e=="string"&&e.startsWith("refused:")?`\uC790\uB3D9 \uC7AC\uAC1C \uAC70\uBD80 \xB7 ${e.slice(8)}`:""}function uv(e){return e==="none"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC870\uAC74\uC744 \uB9CC\uC871\uD558\uB294 \uB2E4\uB978 \uACC4\uC815 \uC5C6\uC74C":e==="disabled"?"\uACC4\uC815 \uC804\uD658 \uC548 \uD568 \xB7 \uC790\uB3D9 \uC804\uD658 \uAEBC\uC9D0":""}function dv(e){if(!e||e.open!==!0)return"";let t=[e.target?.model,e.target?.account_alias||e.target?.account].filter(i=>typeof i=="string"&&i.length>0).join(" \xB7 "),n=Ul(e.resets_at),r=cv(e.auto_resume),o=uv(e.auto_switch);return c`<div
    class="rtile__failure-pop rtile__provider-hold-pop"
    role="dialog"
    aria-label="공급자 보류 상세"
  >
    <strong class="rtile__provider-hold-note">작업 실패 아님</strong>
    <dl class="rtile__failure-kv">
      ${e.summary?c`<div>
            <dt>보고</dt>
            <dd>${e.summary}</dd>
          </div>`:""}
      ${e.message?c`<div>
            <dt>원문</dt>
            <dd>${e.message}</dd>
          </div>`:""}
      ${t?c`<div>
            <dt>타깃</dt>
            <dd>${t}</dd>
          </div>`:""}
      ${n?c`<div>
            <dt>리셋</dt>
            <dd>${n}</dd>
          </div>`:""}
      ${r?c`<div>
            <dt>자동 재개</dt>
            <dd>${r}</dd>
          </div>`:""}
      ${o?c`<div>
            <dt>계정 전환</dt>
            <dd>${o}</dd>
          </div>`:""}
      ${e.log_path?c`<div>
            <dt>로그</dt>
            <dd>${Mr(e.log_path)}</dd>
          </div>`:""}
    </dl>
  </div>`}function pv(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var fv=new Set(["codex-runner"]);function _v(e,t,n,r=null){if(!e)return"";let o=e.last_activity||null,i=o&&typeof o.text=="string"?o.text:"",s=o&&typeof o.at=="number"?o.at:null,l=(r||!Array.isArray(e.legs)?[]:e.legs).filter(_=>_&&!(typeof _.agent_type=="string"&&fv.has(_.agent_type))),a=l.filter(_=>_&&_.state==="live"),u=l.filter(_=>_&&_.state!=="live"),d=r&&typeof r.last_event_at=="number"?fn(r.last_event_at,t):"",f=r?fn(r.updated_at,t):"",m=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:f?`\uAC31\uC2E0 ${f}`:"";return c`${i?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${i}</span>
        ${s!==null?c`<span class="rtile__activity-age"
              >${fn(s,t)}</span
            >`:""}
      </div>`:m?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${m}</span>
        </div>`:""}${a.length>0||u.length>0?c`<div class="rtile__legs">
        ${a.map(_=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${_.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(_=>_.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var mv={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function gv(e){if(!e)return"";let t=mv[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function hv(e,t,n,r=""){if(e==="provider_hold")return c`<div class="rtile__foot">
      <button
        type="button"
        class="op-btn rtile__resume"
        title="같은 세션으로 이어서 진행"
        aria-label="이어하기"
      >
        ↻ 이어하기
      </button>
      <button
        type="button"
        class="op-btn rtile__resume-alternate"
        title="러너·모델·계정을 바꾸거나 새 세션으로 이어갑니다"
        aria-label="다른 방법으로"
      >
        ⋯ 다른 방법으로
      </button>
      ${n}
    </div>`;if(e==="retry_wait")return n?c`<div class="rtile__foot">${n}</div>`:"";let o=sv(t?.summary);if(e==="waiting")return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${r}
      <div class="rtile__foot">${n}</div>`;let i=pf(t);return c`${o?c`<p class="rtile__held-summary">${o}</p>`:""}${i}
    <div class="rtile__foot">
      <button
        type="button"
        class="rtile__parked-retry"
        title="이 bead를 새 attempt로 다시 디스패치합니다 (같은 세션을 잇지 않습니다)"
        aria-label="재시도"
      >
        재시도
      </button>
      ${n}
    </div>`}function Wl(e,t,n=null,r={}){let o=e.kind==="session",i=o&&Array.isArray(e.session_refs)&&e.session_refs.find(Ee=>Ee&&Ee.current===!0)||null,s=e.failed===!0,l=s&&e.failure||null,a=e.parked===!0&&!s,u=e.retry_wait===!0&&!s&&!a,d=e.waiting===!0&&!s&&!a&&!u,f=e.provider_hold===!0&&!s&&!a&&!u&&!d,m=a&&e.failure||null,_=d&&e.wait||null,w=f&&e.hold||null,R=a||u||d||f,I=!!e.paused,U=s||R?e.status_label||(a?"\uC138\uC158 \uB300\uAE30":u?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":d?"\uC120\uD589 \uB300\uAE30":f?"\uACF5\uAE09\uC790 \uBCF4\uB958":e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):I?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ov(t-e.started_at):"\u2014",ie=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,z=Lo(e),j=cn(e.usage),O=er(e.usage),q=e.conflict_resolution?I?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,W=e.base_exception||null,Y=e.landing,N=e.attempt_id&&e.attempt_id===n,F=r.monitor||null,H=pv(F),G=_i(F?.cross_lane_chip),ee=F?fi(F.dependency_chips):"",ye=_v(F,t,I,o?{updated_at:e.updated_at??null,last_event_at:i&&i.locality==="local"?i.last_event_at:null}:null),qe=o&&e.workflow?.chips?.exec_receipt||null,B=mi(e.workflow),Q=gi(e.rec,e.chip_popover?.chip_key==="rec"),Ae=e.chip_popover?co(e.chip_popover.content):"",Se=qe?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Jn(qe)}`}
        >${`${qe.kind}:${Bs(qe)}`}</span
      >`:"",C=i?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${i.provider}:${i.session_id}@${i.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${Po(i)}</span
      >`:"",re=H||G||B||C||Se||Q?c`<div class="rtile__meta">
          ${H}${G}${B}${C}${Se}${Q}${Ae}
        </div>`:"",ke=l?c`<button
          type="button"
          class="rtile__failure-badge"
          data-attempt-id=${l.attempt_id}
          aria-expanded=${l.open===!0?"true":"false"}
          aria-label="실패 상세"
        >
          ⛔ ${sf(l.cause)||"\uC2E4\uD328"}
        </button>
        ${l.halted_auto_advance?c`<span class="rtile__auto-halted">자동 진행 꺼짐</span>`:""}`:"",ve=a?c`<span
        class="rtile__held-badge"
        title="세션이 사용자 결정을 기다리며 정상 종료했습니다 — 큐는 계속 갑니다"
        >⏸ 세션 대기</span
      >`:u?c`<span
          class="rtile__held-badge"
          title="환경성 실패의 자동 재시도를 기다립니다 — 사람이 할 일은 없습니다"
          >${iv(e.retry)}</span
        >`:d?c`<span
            class="rtile__held-badge"
            title="세션이 선행 미충족으로 착수를 거부했습니다 — 선행이 닫히면 저절로 다시 돕니다"
            >⛓ 선행 대기</span
          >`:f&&w?c`<button
              type="button"
              class="rtile__held-badge rtile__provider-hold-badge"
              data-attempt-id=${e.attempt_id}
              aria-expanded=${w.open===!0?"true":"false"}
              aria-label="공급자 보류 상세"
            >
              ${av(w)}
            </button>`:"",Me=c`${q?c`<span class="worker-mini__badge">${q}</span>`:""}${W?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${W}</span
      >`:""}${ke}${ve}`,he=o?"":ho(e),Le=ti(l?.quickfix_landing),Je=Le==="settlement"?"\uC815\uC0B0 \uC7AC\uAC1C":"\uC774\uC5B4\uD558\uAE30",lt=Le==="settlement"?"\uCC29\uC9C0 \uC815\uC0B0\uC744 \uB2E4\uC2DC \uC2E4\uD589":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589",P=e.resolve_action?c`<button
        type="button"
        class="rtile__resolve"
        ?disabled=${e.resolve_enabled===!1}
        title=${e.resolve_title||"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        aria-label="세션에서 해결"
      >
        세션에서 해결
      </button>`:"",ce=e.discard?.action&&!(s&&l?.landed===!0)?c`<button
          type="button"
          class="rtile__discard"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-confirmation=${l?.confirmation||"unmerged"}
          ?disabled=${!e.discard.enabled}
          title=${e.discard.title}
          aria-label=${e.discard.label}
        >
          ${e.discard.label}
        </button>`:"",se=ce&&e.discard?.abandon?.action===!0?c`<button
          type="button"
          class="rtile__discard-abandon"
          data-operation-id=${e.discard.operation?.operation_id||""}
          data-operation-kind=${e.discard.operation?.kind||""}
          data-last-error=${e.discard.error||""}
          title=${e.discard.abandon.title}
          aria-label=${e.discard.abandon.label}
        >
          ${e.discard.abandon.label}
        </button>`:"",de=se?c`${ce}${se}`:ce;return c`<div
    class="rtile${N?" rtile--sel":""}${I?" rtile--paused":""}${s?" rtile--failed rtile--compact":""}${R?" rtile--held rtile--compact":""}${a?" rtile--parked":""}${u?" rtile--retry-wait":""}${d?" rtile--waiting":""}${o?" rtile--session":""}${f?" rtile--provider-hold":""}${e.search_match===!1?" is-dimmed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${o?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${hi(e.priority)}${z?c`<span class="rtile__resumed" title=${z}>↻</span>`:""}${Me}
      <div class="rtile__hd-actions">
        ${o?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${U}</span>`:""}${gv(i)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${U}</span>`}
        ${o||R?"":s?c`<button
                  type="button"
                  class="op-btn rtile__resume"
                  data-resume-kind=${Le}
                  ?disabled=${l?.resume_eligible===!1}
                  title=${l?.resume_eligible===!1?l.resume_reason||`${Je} \uBD88\uAC00`:lt}
                  aria-label=${Je}
                >
                  ↻ ${Je}
                </button>
                ${de}`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${I?c`<button
                      type="button"
                      class="op-btn rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶ 재개
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${de}`}${P}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${R?hv(a?"parked":u?"retry_wait":d?"waiting":"provider_hold",a?m:d?_:w,de,d?ee:""):s?"":c`${ye}${e.rollup?js(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:Aa}):""}
            ${Y?c`<div class="rtile__landing">
                  <span
                    class="merge-step${Y.failed?" merge-step--failed":""}"
                    style=${`--progress: ${Y.percent}%`}
                    >${Y.label}${Y.index>0?c`<span class="merge-step__n"
                          >${Y.index}/${Y.total}</span
                        >`:""}</span
                  >
                </div>`:""}
            ${ee}
            ${o?re:H||G||B||ie||Q||j.length>0||O?c`<div class="rtile__meta">
                    ${H}${G}${B}${pi(e.exec_chips)}${Q}
                    ${j.length>0?j.map(Ee=>c`<span
                              class="worker-usage"
                              title=${Ee.tooltip}
                              >${Ee.label}</span
                            >`):O?c`<span
                            class="worker-usage"
                            title=${Do(e.usage)}
                            >${O}</span
                          >`:""}${Ae}
                  </div>`:""}
            ${ai(e)} ${he}
            <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
            ${s||I?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}`}
    ${lv(l,t)}${dv(w)}
  </div>`}function bv(e){let t=e.last_activity&&typeof e.last_activity=="object"?e.last_activity:null,n=Array.isArray(e.legs)?e.legs:[],r=e.dependency_chips||null;return!t&&n.length===0&&!r&&e.kind!=="session"?null:{...t?{last_activity:t}:{},...n.length>0?{legs:n}:{},...r?{dependency_chips:r}:{}}}function ff(e,t=Date.now(),n=null){let r=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${r.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:r.map(o=>Wl(o,t,n,{monitor:bv(o)}))}
  </div>`}var sn="",yv=["impl_runtime","impl_model","impl_effort"],_f=["claude","codex"],vv=["claude_account","codex_account"],kv=5,ea=1;function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function ta(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,o=t.notify||(E=>be(E,"error",4e3)),i={},s={},l={},a={},u=[],d=!1,f={state:"absent",values:{},warnings:[]},m={},_={},w=Promise.resolve(),R={claude:null,codex:null},I=!1,U=null,ie={},z="",j="general",O="",q=!1,W=!1,Y=!1,N=null,F=!1;function H(){let E=t.queue?t.queue():null;return vn(E)?E:null}function G(){let E=H();return E?E.runner_catalog:null}function ee(){let E=H();return E&&vn(E.execution_defaults)?E.execution_defaults:null}function ye(){let E=H();return!!(E&&Object.hasOwn(E,"quick_fix_orchestration_model"))}function qe(){let E=t.implPresetStore?.get();return vn(E)&&Array.isArray(E.presets)?E:null}function B(){return r===null?{}:{root_dir:r}}async function Q(E,L){return F||!n?null:await n(E,L)}function Ae(E){E&&vn(E.queue)&&t.onQueueAdopt?.(E.queue)}async function Se(E,L){let J=H();if(!J||F)return null;let pe=await Q(E,{...L,...B(),expected_revision:J.revision});if(Ae(pe),r!==null&&pe&&pe.conflict){let fe=pe.queue&&typeof pe.queue.revision=="number"?pe.queue.revision:H()?.revision??J.revision;pe=await Q(E,{...L,...B(),expected_revision:fe}),Ae(pe)}return pe}async function C(){d=!0,Oe();try{let E=await Q("get-session-defaults",{...B()});i=vn(E?.values)?{...E.values}:{},s={...i},l={},a={},u=Array.isArray(E?.warnings)?E.warnings:[]}catch(E){u=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}finally{d=!1,Oe()}}async function re(){let E=Ru(i,s);if(Object.keys(E).length!==0){try{let L=await Q("set-session-defaults",{values:E,...B()});i=vn(L?.values)?{...L.values}:{},s={...i},u=Array.isArray(L?.warnings)?L.warnings:[]}catch(L){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}function ke(E,L){if(!vn(E))return;let J=E.state;f={state:J==="usable"||J==="unusable"||J==="absent"?J:"absent",values:vn(E.values)?{...E.values}:{},warnings:Array.isArray(E.warnings)?E.warnings:[]},_={...f.values},L&&(m={..._})}async function ve(){try{ke(await Q("get-workspace-accounts",{...B()}),!0)}catch(E){f={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},m={},o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${E instanceof Error?E.message:String(E)}`)}Oe()}async function Me(E){try{let L=await fetch(E);if(!L.ok)return null;let J=await L.json();if(!vn(J)||!Array.isArray(J.accounts))return null;let pe=J.accounts.filter(fe=>vn(fe)&&typeof fe.key=="string"&&fe.key.length>0&&typeof fe.email=="string"&&fe.email.length>0);return{accounts:pe,active:pe.find(fe=>fe.active===!0)||null}}catch{return null}}async function he(){I=!0;let[E,L]=await Promise.all([Me("/api/claude-usage"),Me("/api/codex-usage")]);F||(R={claude:E,codex:L},Oe())}function Le(){let E={};for(let L of vv){let J=Object.hasOwn(m,L)?m[L]:null,pe=Object.hasOwn(_,L)?_[L]:null;J!==pe&&(E[L]=J)}return E}async function Je(){let E=Le();if(Object.keys(E).length!==0){try{ke(await Q("set-workspace-accounts",{values:E,...B()}),!1)}catch(L){o(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}function lt(E,L){L===sn?delete m[E]:m[E]=L,Oe(),w=w.then(()=>Je())}function P(E,L){if(yv.includes(E)){_e(E,L);return}L===sn?delete s[E]:s[E]=L,Oe(),re()}function ce(E,L){l[E]=L,delete a[E]}function se(E,L,J){if(l[E]=L,L.length>0&&!J(L)){a[E]=!0,Oe();return}delete l[E],delete a[E],L.length===0?delete s[E]:s[E]=L,Oe(),re()}function de(){let E=me().orchestration_model,L=En({global:{orchestration_model:E??void 0},execution_defaults:ee(),runner_catalog:G()}).orchestration_model.value;return L?Dn(G(),L):null}function Ee(E,L){typeof L=="string"&&L.length>0?s[E]=L:delete s[E]}function _e(E,L){let J=L===sn?void 0:L,pe=Eu({impl_runtime:E==="impl_runtime"?J:s.impl_runtime,impl_model:E==="impl_model"?J:s.impl_model,impl_effort:E==="impl_effort"?J:s.impl_effort},G(),de());Ee("impl_runtime",pe.impl_runtime),Ee("impl_model",pe.impl_model),Ee("impl_effort",pe.impl_effort),Oe(),re()}async function De(){let E=H();if(!E)return;let L={orchestration_model:E.orchestration_model??null,orchestration_effort:E.orchestration_effort??null,orchestration_speed:E.orchestration_speed??null,quick_fix_orchestration_model:E.quick_fix_orchestration_model??null,quick_fix_orchestration_effort:E.quick_fix_orchestration_effort??null,quick_fix_orchestration_speed:E.quick_fix_orchestration_speed??null},J=Ou(L,{...L,...ie});if(Object.keys(J).length!==0){try{let pe=await Se("worker-queue-set-orchestration-defaults",{values:J});if(pe&&pe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}ie={}}catch(pe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}Oe()}}function Ue(E,L){ie[E]=L===sn?null:L,Oe(),De()}function Qe(E){if(U=E,!E){Oe();return}let L=G(),J=me(),pe=J.orchestration_model;pe&&!_o(L,E).includes(pe)&&(ie.orchestration_model=null,pe=null);let fe=J.orchestration_effort;fe&&!Zs(L,E,pe||$n).includes(fe)&&(ie.orchestration_effort=null),Oe(),De()}async function Fe(E){if(!(!H()||E<ea)){try{await Se("worker-queue-set-slots",{slots:E})}catch(L){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}async function te(E){if(!(!H()||E<ea||E>kv)){try{await Se("worker-queue-set-serial-lane-count",{count:E})}catch(L){o(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}Oe()}}async function V(E,L){let J=E==="auto_advance"?"worker-automation-toggle":E==="auto_merge"?"worker-merge-auto-toggle":"worker-provider-auto-switch-toggle";try{await Se(J,{on:L})}catch(pe){o(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${pe instanceof Error?pe.message:String(pe)}`)}Oe()}function $e(){let E={},L=me();for(let J of po){let pe=Pn.includes(J)?L[J]:s[J];typeof pe=="string"&&pe.length>0&&(E[J]=pe)}return E}async function _t(){let E=qe();if(!E)return;let L=$e();if(Object.keys(L).length===0){o("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let J=(E.presets||[]).find(fe=>fe.id===z),pe=O.trim()||(J?J.name:"");if(!pe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let fe=J?await Q("impl-preset-update",{expected_revision:E.revision,id:J.id,name:pe,settings:L}):await Q("impl-preset-create",{expected_revision:E.revision,name:pe,settings:L});if(fe&&fe.applied){if(O="",!J&&Array.isArray(fe.presets)){let Pe=fe.presets.find(ht=>ht.name===pe);z=Pe?Pe.id:z}Oe()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Oe()}catch(fe){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}}async function ct(){let E=qe();if(!(!E||z.length===0))try{let L=await Q("impl-preset-delete",{expected_revision:E.revision,id:z});L&&L.applied?(z="",Oe()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),Oe())}catch(L){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${L instanceof Error?L.message:String(L)}`)}}function Ke(E){i=vn(E.values)?{...E.values}:{},s={...i},u=Array.isArray(E.warnings)?E.warnings:[],vn(E.queue)&&(t.onQueueAdopt?.(E.queue),ie={})}async function $(E){let L=qe(),J=H();if(!L||!J||z.length===0||E==="quick_fix"&&!ye())return;let pe=fe=>({preset_id:z,expected_revision:L.revision,expected_queue_revision:fe,...E==="quick_fix"?{lane:"quick_fix"}:{},...B()});try{let fe=await Q("apply-impl-preset-global",pe(J.revision));if(E==="quick_fix"&&fe&&fe.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Oe();return}if(fe&&fe.applied&&Ke(fe),r!==null&&fe&&fe.queue_applied===!1){let Pe=fe.queue&&typeof fe.queue.revision=="number"?fe.queue.revision:H()?.revision??J.revision;if(fe=await Q("apply-impl-preset-global",pe(Pe)),E==="quick_fix"&&fe&&fe.lane!=="quick_fix"){o("\uC11C\uBC84 \uC751\uB2F5\uC5D0 lane\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uD050 \uC2A4\uB0C5\uC0F7\uC744 \uB2E4\uC2DC \uBC1B\uC740 \uB4A4 \uD655\uC778\uD558\uC138\uC694"),Oe();return}fe&&fe.applied&&Ke(fe)}fe&&fe.applied?fe.queue_applied===!1&&o("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):fe&&fe.conflict&&o("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(fe){o(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${fe instanceof Error?fe.message:String(fe)}`)}Oe()}async function Z(){W=!0,Y=!1,Oe();try{let E=await Q("get-worker-system-prompt",{});!E||typeof E!="object"||Array.isArray(E)?Y=!0:N=E}catch{Y=!0}finally{W=!1,Oe()}}function Re(){if(q=!q,q&&!N){Z();return}Oe()}function je(){let E=wo({loading:W,error:Y});if(E)return E;if(!N)return"";let L=Array.isArray(N.variants)?N.variants:[];return c`<div class="settings-dialog__sp-body">
      ${N.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${N.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${L.map(J=>c`<div class="settings-dialog__sp-variant" data-variant=${J.key}>
            <div class="settings-dialog__sp-cond">${J.condition}</div>
            ${ar(J.label,J.system_prompt)}
          </div>`)}
    </div>`}function Xe(){return c`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${q?"true":"false"}
        @click=${Re}
      >
        ${q?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${q?je():""}
    </section>`}function Ze(E,L,J,pe,fe,Pe,ht,$t){let gt=fe[E]??sn,Ut=Ma(E,J,fe,ee(),G(),ht,$t),yt=Ut.options.find(Ot=>Ot.value===gt),Rt=gt===sn?Ut.full_value:yt?.full_value;return c`<select
        class=${gt===sn?"settings-dialog__unset":""}
        data-key=${E}
        aria-label=${L}
        title=${Rt||""}
        ?disabled=${Pe===!0||$t!=="quick_fix"&&Ut.disabled}
        .value=${kr(String(gt))}
        @change=${Ot=>pe(E,String(Ot.target.value))}
      >
        <option value=${sn} ?selected=${gt===sn}>
          ${Ut.unset_label}
        </option>
        ${Ut.options.map(Ot=>c`<option
              value=${Ot.value}
              title=${Ot.full_value||""}
              ?selected=${Ot.value===gt}
            >
              ${Ot.label}
            </option>`)}
      </select>
      ${gt===sn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function We(E,L,J,pe,fe,Pe=!1,ht,$t=null,gt=null){return c`<div
      class=${`settings-dialog__row${Pe?" settings-dialog__row--off":""}`}
      title=${Pe&&gt?gt:""}
    >
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        ${Ze(E,L,J,pe,fe,Pe,ht,$t)}
      </span>
    </div>`}function dt(E,L,J,pe,fe,Pe){let ht=Object.hasOwn(a,E),$t=l[E]??s[E]??sn;return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <input
          type="text"
          class=${`settings-dialog__text${ht?" settings-dialog__text--invalid":""}`}
          data-key=${E}
          aria-label=${L}
          aria-invalid=${String(ht)}
          placeholder=${J}
          .value=${kr($t)}
          @input=${gt=>ce(E,String(gt.target.value))}
          @change=${gt=>se(E,String(gt.target.value).trim(),Pe)}
        />
        ${$t.length===0?c`<span class="settings-dialog__source-badge">기본</span>`:""}
        <span class="settings-dialog__hint" data-key-hint=${E}
          >${ht?fe:pe}</span
        >
      </span>
    </div>`}function Gt(E,L){let J=L?L.active:null;return vn(J)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${E==="claude"?J.email:xo({...J,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function St(E,L,J){let pe=R[J],fe=Object.hasOwn(m,E)?m[E]:sn,Pe=J==="claude"?Hi:xo,ht=!!pe?.accounts.some($t=>$t.key===fe);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${L}
          data-account-key=${E}
          @change=${$t=>lt(E,String($t.target.value))}
        >
          <option value=${sn} ?selected=${fe.length===0}>
            ${Gt(J,pe)}
          </option>
          ${fe.length>0&&!ht?c`<option value=${fe} selected>
                ${fe} (목록에 없음)
              </option>`:""}
          ${pe?.accounts.map($t=>c`<option value=${$t.key} ?selected=${$t.key===fe}>
                ${Pe($t)}
              </option>`)||""}
        </select>
        ${pe?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function kt(){let E=f.warnings.join(", ");return f.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${E} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:f.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${E}`:null}function wt(E,L,J,pe,fe,Pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${L}-on)`}
        ></i>
        ${E}
      </span>
      <span class="settings-dialog__controls">
        ${Ze(J,`${E} \uBAA8\uB378`,pe,P,s,!1)}
        ${Ze(fe,`${E} effort`,Xs,P,s,!1)}
        ${Ze(Pe,`${E} \uC18D\uB3C4`,xu,P,s,!1)}
      </span>
    </div>`}function Ft(E,L,J,pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${pe?" is-on":""}`}
          data-automation=${E}
          aria-pressed=${pe?"true":"false"}
          aria-label=${L}
          @click=${()=>V(E,!pe)}
        >
          ${pe?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${J}</span>
      </span>
    </div>`}function Pt(E,L,J,pe){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${L}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${E}>
          <button
            type="button"
            aria-label=${`${L} \uAC10\uC18C`}
            @click=${()=>pe(J-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${J}</span>
          <button
            type="button"
            aria-label=${`${L} \uC99D\uAC00`}
            @click=${()=>pe(J+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function ae(E,L){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${E.rows.length>0?`\uBCC0\uACBD ${E.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${E.rows.map(J=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${J.kind}
          >
            <span class="settings-dialog__preset-diff-label">${J.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${J.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${J.after??(L==="quick_fix"?"\uAE30\uBCF8(\uD574\uC81C \u2192 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C)":"\uAE30\uBCF8(\uD574\uC81C)")}</span
            >
          </div>`)}
      ${E.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${E.ignored_keys.join(", ")}은(는)
            ${L==="quick_fix"?"quick_fix \uB808\uC778":"\uC804\uC5ED"} 적용이 쓰지 않는
            키라 무시됩니다
          </div>`:""}
    </div>`}function me(){let E=H(),L={};for(let J of[...Pn,...uo])L[J]=Object.prototype.hasOwnProperty.call(ie,J)?ie[J]:E&&typeof E[J]=="string"?E[J]:null;return L}function Ge(){let E=me(),L={};for(let J of uo)L[J]=E[J]??null;for(let J of["quick_fix_impl_dispatch","quick_fix_impl_runtime","quick_fix_impl_model","quick_fix_impl_effort","quick_fix_impl_speed"])L[J]=s[J]??null;return L}function ut(){let E=G(),L=s.impl_runtime,J=s.impl_model,pe=qe(),fe=H(),Pe=me(),ht=_o(E,U),$t=fo(E,void 0).filter(A=>A!==$n),gt=Pr(E,void 0,void 0),Ut=Zs(E,U,Pe.orchestration_model||$n).filter(A=>A!==$n),yt=z?(pe?.presets||[]).find(A=>A.id===z):null,Rt=yt?Tu($e(),vn(yt.settings)?yt.settings:{}):null,Ot={quick_fix_orchestration_model:_o(E,null),quick_fix_orchestration_effort:Zs(E,null,null).filter(A=>A!==$n),quick_fix_orchestration_speed:Gn,quick_fix_impl_dispatch:Mo,quick_fix_impl_runtime:_f,quick_fix_impl_model:$t,quick_fix_impl_effort:gt,quick_fix_impl_speed:Gn},en=yt?Cu(Ge(),vn(yt.settings)?yt.settings:{},Ot):null,Yt=j==="quick_fix"?en:Rt,Mt=ye(),xt=Mt?null:"\uC11C\uBC84\uAC00 quick_fix \uB808\uC778\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4",Kt={...s,...Pe},nn=fe&&typeof fe.slots=="number"?fe.slots:ea+1,Wt=fe&&typeof fe.serial_lane_count=="number"?fe.serial_lane_count:ea,an=ee()?.supported===!0,Zt=kt(),xe=Ma("workflow_mode",qo,s,ee(),E);return c`
      ${u.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${u.join(", ")}
          </div>`:""}
      ${Zt?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Zt}
          </div>`:""}
      ${an?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${d?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${kr(z)}
                @change=${A=>{z=String(A.target.value),Oe()}}
              >
                <option value="" ?selected=${z===""}>
                  실행 프리셋…
                </option>
                ${(pe?.presets||[]).map(A=>c`<option
                      value=${A.id}
                      ?selected=${A.id===z}
                    >
                      ${A.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary op-btn"
                data-preset-apply-global
                data-preset-apply-general
                ?disabled=${!Rt||Rt.rows.length===0}
                @click=${()=>$("general")}
              >
                일반에 적용
              </button>
              <button
                type="button"
                class="settings-dialog__btn op-btn"
                data-preset-apply-quick-fix
                title=${xt||""}
                ?disabled=${!Mt||!en||en.rows.length===0}
                @click=${()=>$("quick_fix")}
              >
                quick_fix 레인에 적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${z?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${kr(O)}
                @input=${A=>{O=String(A.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${z?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${_t}
              >
                ${z?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${z.length===0}
                @click=${ct}
              >
                삭제
              </button>
            </div>
            <div
              class="settings-dialog__seg"
              role="group"
              aria-label="프리셋 적용 레인"
              data-preset-lane-tabs
            >
              <button
                type="button"
                data-preset-lane="general"
                aria-pressed=${String(j==="general")}
                @click=${()=>{j="general",Oe()}}
              >
                일반
              </button>
              <button
                type="button"
                data-preset-lane="quick_fix"
                aria-pressed=${String(j==="quick_fix")}
                @click=${()=>{j="quick_fix",Oe()}}
              >
                quick_fix
              </button>
            </div>
            ${Yt?ae(Yt,j):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${kr(U||sn)}
                    @change=${A=>{let ge=String(A.target.value);Qe(ge===sn?null:ge)}}
                  >
                    <option value=${sn} ?selected=${!U}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${U==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${U==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${We("orchestration_model","\uBAA8\uB378",ht,Ue,Pe)}
              ${We("orchestration_effort","effort",Ut,Ue,Pe)}
              ${We("orchestration_speed","\uC18D\uB3C4",Gn,Ue,Pe)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${St("claude_account","Claude","claude")}
              ${St("codex_account","Codex","codex")}
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">한도 대응</span>
                <span class="settings-dialog__controls">
                  <label class="settings-dialog__check">
                    <input
                      type="checkbox"
                      data-provider-auto-switch
                      .checked=${fe?.provider_auto_switch!==!1}
                      @change=${A=>V("provider_auto_switch",A.target.checked)}
                    />
                    한도 시 다른 계정으로 자동 이어하기
                  </label>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${sn}
                      aria-pressed=${String(!s.workflow_mode)}
                      @click=${()=>P("workflow_mode",sn)}
                    >
                      ${xe.unset_label}
                    </button>
                    ${s.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${qo.map(A=>c`<button
                          type="button"
                          data-mode=${A}
                          aria-pressed=${String(s.workflow_mode===A)}
                          @click=${()=>P("workflow_mode",A)}
                        >
                          ${A}
                        </button>`)}
                  </span>
                </span>
              </div>
              ${dt("bdui_url","beads-ui \uC8FC\uC18C","http://\uD638\uC2A4\uD2B8:3000","\uC138\uC158\uC774 Worker \uB808\uC778 \uBC30\uCE58\uB97C \uBB3C\uC5B4\uBCFC \uB54C \uC4F0\uB294 \uC8FC\uC18C\uC785\uB2C8\uB2E4","http:// \uB610\uB294 https:// \uB85C \uC2DC\uC791\uD558\uB294 \uC8FC\uC18C\uB9CC \uC800\uC7A5\uB429\uB2C8\uB2E4 (\uACBD\uB85C \uC5C6\uC774)",$u)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort · 속도</span>
              </div>
              ${wt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",No,"spec_review_effort","spec_review_speed")}
              ${wt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Qs,"plan_review_effort","plan_review_speed")}
              ${wt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",No,"impl_review_effort","impl_review_speed")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${We("impl_runtime","\uC704\uC784 \uB300\uC0C1",Vs,P,s)}
              ${We("impl_model","\uBAA8\uB378",fo(E,L),P,s)}
              ${We("impl_effort","effort",Pr(E,L,J),P,s)}
              ${We("impl_speed","\uC18D\uB3C4",Gn,P,s)}
            </div>

            <div
              class="settings-dialog__group"
              data-quick-fix-group
              title=${xt||""}
            >
              <div class="settings-dialog__group-title">
                quick_fix 레인
                <span class="settings-dialog__hint"
                  >${"\uBE44\uC5B4 \uC788\uB294 \uAC12\uC740 \uC77C\uBC18 \uD504\uB85C\uD30C\uC77C\uB85C \uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. \uC774\uC288 \uD540\uC774 \uC788\uC73C\uBA74 \uD540\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4."}</span
                >
              </div>
              ${We("quick_fix_orchestration_model","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",Ot.quick_fix_orchestration_model,Ue,Pe,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_orchestration_effort","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",Ot.quick_fix_orchestration_effort,Ue,Pe,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_orchestration_speed","\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4",Gn,Ue,Pe,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",Mo,P,s,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_impl_runtime","\uC704\uC784 \uB300\uC0C1",_f,P,s,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_impl_model","\uBAA8\uB378",$t,P,s,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_impl_effort","effort",gt,P,s,!Mt,Kt,"quick_fix",xt)}
              ${We("quick_fix_impl_speed","\uC18D\uB3C4",Gn,P,s,!Mt,Kt,"quick_fix",xt)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Ft("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",fe?.auto_advance===!0)}
              ${Ft("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",fe?.auto_merge===!0)}
              ${Pt("slots","\uB3D9\uC2DC \uC2E4\uD589",nn,A=>Fe(A))}
              ${Pt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",Wt,A=>te(A))}
            </div>
            ${Xe()}
          `}
    `}function Oe(){F||pt(ut(),e)}return{load(){ie={},j="general",l={},a={};let E=[C(),ve()];return I||E.push(he()),Promise.all(E).then(()=>{})},render:Oe,sessionDraft:()=>({...s}),destroy(){F=!0,pt(c``,e)}}}function na(e){return c`<svg
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
  </svg>`}function mf(){return na(Ro`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function gf(){return na(Ro`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function hf(){return na(Ro`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function bf(){return na(Ro`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function yf(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function vf(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return cn(Gs(t));let n={};for(let l of Kn)n[l]=0;let r=!1,o=0,i=0,s=0;for(let l of Array.isArray(e)?e:[]){let a=l&&l.usage;if(a&&typeof a=="object"){let u=!1;for(let d of Kn){let f=a[d];typeof f=="number"&&Number.isFinite(f)&&(n[d]+=f,r=!0,u=!0)}if(u){i+=1;let d=a.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(o+=d,s+=1)}}}return i>0&&s===i&&(n.total_cost_usd=o),r?er(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function zl(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function wv(e,t){if(!Bn(t))return e;let n={...e};for(let[r,o]of Object.entries(t))o!==void 0&&(n[r]=o);return n}function $v(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let s of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[s]=="string"&&e[s].length>0&&(t[s]=e[s]);let n=En({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Dn(e.runner_catalog,n.orchestration_model.value??""),o=mo(n,e.runner_catalog),i=Dr(n,r);return o===null&&i===null?null:{orchestration:o,worker:i}}function kf(e,t){let n=t.notify||(C=>be(C,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let o=document.createElement("div");o.className="mon2-deck__panel",o.hidden=!0;let i=document.createElement("div");i.className="mon2-deck__panel-hd";let s=document.createElement("span");s.className="mon2-deck__panel-title";let l=document.createElement("button");l.type="button",l.className="mon2-deck__panel-close",l.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),l.textContent="\u2715",i.append(s,l);let a=document.createElement("div");a.className="mon2-deck__panel-body",o.append(i,a),e.appendChild(o);let u=null,d=null,f=null,m=new Map;function _(){let C=t.workspacesState?t.workspacesState():[];return Array.isArray(C)?C.filter(re=>Bn(re)):[]}function w(C){return _().find(re=>re.root_dir===C)||null}function R(C){return wv(w(C),m.get(C))}function I(){for(let C of _()){let re=m.get(C.root_dir);re&&typeof re.revision=="number"&&typeof C.revision=="number"&&C.revision>=re.revision&&m.delete(C.root_dir)}}async function U(C,re,ke){let ve=t.transport,Me=R(re);if(!(!ve||!Bn(Me))){try{let he=await ve(C,{...ke,root_dir:re,expected_revision:Me.revision});if(Bn(he?.queue)&&m.set(re,he.queue),he&&he.conflict){let Le=Bn(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:R(re)?.revision;he=await ve(C,{...ke,root_dir:re,expected_revision:Le}),Bn(he?.queue)&&m.set(re,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}Q()}}function ie(C){u!==C&&(u=C,t.onFocusChange?.(u),Q())}function z(C){ie(u===C?null:C)}function j(C){if(d===C){q();return}O(),d=C;let re=w(C);s.textContent=`${re?.name||C} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,o.hidden=!1,f=ta(a,{root_dir:C,queue:()=>R(C),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ke=>{m.set(C,ke),Q()}}),f.load(),Q()}function O(){f?.destroy(),f=null}function q(C){O(),d=null,o.hidden=!0,s.textContent="",C!==!0&&Q()}let W=()=>q();l.addEventListener("click",W);function Y(C){C.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",Y);function N(C,re){let ke=Math.max(re,C,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${re}\uAC1C \uC911 ${C}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ke},(ve,Me)=>Me<C?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function F(C){let re=C.auto_advance===!0,ke=C.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${re?" is-on":""}`}
        data-act="auto"
        aria-pressed=${re?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9\uD654`}
        title=${re?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${re?gf():mf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ke?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ke?"true":"false"}
        aria-label=${`${C.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ke?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${hf()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===C.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===C.root_dir?"true":"false"}
        aria-label=${`${C.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${bf()}
      </button>`}function H(C){let re=$v(C);return re?c`<div class="mon2-deck__chips">
      ${re.orchestration?c`<span class="mon2-deck__chip" title=${re.orchestration.title}
            >오케 ${re.orchestration.text}</span
          >`:""}
      ${re.worker?c`<span class="mon2-deck__chip" title=${re.worker.title}
            >워커 ${re.worker.text}</span
          >`:""}
    </div>`:""}function G(C){let re=[];for(let[ke,ve]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Me=zl(C,ke);Me>0&&re.push(`${ve} ${Me}`)}return re.join(" \xB7 ")}function ee(C){let re=zl(C,"running"),ke=typeof C.slots=="number"?C.slots:1;return c`<div
      class=${`mon2-deck__tile${u===C.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${C.root_dir}
      aria-pressed=${u===C.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${C.root_dir}>${C.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ke}\uAC1C \uC911 ${re}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${re}/${ke}</span>
          ${N(re,ke)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${C.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${F(C)}</div>
        <span class="mon2-deck__counts">${G(C)}</span>
        ${H(C)}
      </div>
    </div>`}function ye(C){let re=t.doneItems?t.doneItems():[],ke=t.rangeLabel?t.rangeLabel():"",ve=vf(Array.isArray(re)?re:[]),Me=he=>C.reduce((Le,Je)=>Le+zl(Je,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${C.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ke}`}
        >실행 ${Me("running")} · 대기 ${Me("queue")} · PR
        ${Me("pr_wait")}${Me("session_active")>0?` \xB7 \uC138\uC158 ${Me("session_active")}`:""}
        · ${ke} 완료
        ${Array.isArray(re)?re.length:0}</span
      >
      ${ve===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof ve=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${yf(ke)}
                  >${ve}</span
                >`:ve.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function qe(){let C=_();return C.length===0?"":c`${ye(C)}
      <div class="mon2-deck__strip">
        ${C.map(re=>ee(re))}
      </div>`}function B(){u!==null&&!w(u)&&(u=null,t.onFocusChange?.(null))}function Q(){I(),B(),d!==null&&!w(d)&&q(!0),pt(qe(),r),f?.render()}function Ae(C){let re=C.target;if(!re||typeof re.closest!="function")return;let ke=re.closest("[data-root-dir]");if(!ke)return;let ve=ke.getAttribute("data-root-dir")||"",Me=re.closest("[data-act]")?.getAttribute("data-act");if(Me==="worker"){t.gotoWorkerTab?.(ve);return}if(Me==="auto"){U("worker-automation-toggle",ve,{on:R(ve)?.auto_advance!==!0});return}if(Me==="merge"){U("worker-merge-auto-toggle",ve,{on:R(ve)?.auto_merge!==!0});return}if(Me==="gear"){j(ve);return}z(ve)}function Se(C){if(C.key!=="Enter"&&C.key!==" ")return;let re=C.target;if(!re||typeof re.closest!="function")return;let ke=re.closest('[data-root-dir][role="button"]');!ke||ke!==re||(C.preventDefault(),z(ke.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Ae),r.addEventListener("keydown",Se),{render:Q,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",Y),r.removeEventListener("click",Ae),r.removeEventListener("keydown",Se),l.removeEventListener("click",W),O(),pt(c``,r),e.replaceChildren()}}}var xv=1e4,Af="bdui.monitor.done-range",Sf="bdui.monitor.running_sort",Ef="bdui.monitor.candidate_sort",Tf="beads-ui.monitor.candidate-filter",Cf="beads-ui.monitor.sections";function Av(){try{let e=window.localStorage.getItem(Tf);if(!e)return{...yo};let t=JSON.parse(e);return!t||typeof t!="object"?{...yo}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:yo.show_blocked,readiness:Zo.some(n=>n.value===t.readiness)?t.readiness:"all"}}catch{return{...yo}}}function wf(e){try{window.localStorage.setItem(Tf,JSON.stringify({show_blocked:e.show_blocked,readiness:e.readiness}))}catch{}}function Sv(){try{let e=window.localStorage.getItem(Ef);return Xo.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Ev(e){try{window.localStorage.setItem(Ef,e)}catch{}}function Tv(){try{let e=window.localStorage.getItem(Cf);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Cv(e){try{window.localStorage.setItem(Cf,JSON.stringify(e))}catch{}}function Rv(){try{let e=window.localStorage.getItem(Af);return e===null?"today":zn(e)}catch{return"today"}}function Ov(e){try{window.localStorage.setItem(Af,e)}catch{}}function Iv(){try{return window.localStorage.getItem(Sf)==="repo"?"repo":"started"}catch{return"started"}}function Lv(e){try{window.localStorage.setItem(Sf,e)}catch{}}var Rf="tab:monitor:pipeline",Pv=1e3,$f=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Dv=["queue","runnable","done"],xf="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Mv(e){return e>=1&&e<=xf.length?xf[e-1]:`(${e})`}function Of(e,t){let n=Bt("views:monitor"),r=t.gotoIssue,o=t.pipelineStore,i=t.transport,s=t.getWorkspacePath,l=t.openDoc,a=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),f=t.confirm||(y=>typeof globalThis.confirm!="function"||globalThis.confirm(y)),m=Rv(),_=Iv(),w=Av(),R=Sv(),I=Tv(),U=Vi("beads-ui.monitor.lane-collapsed"),ie=!1,z=null,j=null,O=null,q=null,W=lo(()=>L()),Y=null,N=null,F=null,H=null;function G(y){return H===null&&(H=P()),Pd(y,H)}function ee(y,v){ye(),!(v<=0)&&(N={lane_id:y,corrected:v},F=setTimeout(()=>{F=null,N=null,L()},xv))}function ye(){F!==null&&(clearTimeout(F),F=null),N=null}function qe(){let y=Vr.find(v=>v.value===m);return y?y.label:""}let B=document.createElement("div");B.className="mon",e.appendChild(B);let Q=document.createElement("div");Q.className="worker-drawer-overlay",Q.hidden=!0;let Ae=document.createElement("div");Ae.className="worker-drawer-overlay__backdrop";let Se=document.createElement("div");Se.className="worker-drawer-host mon2-drawer",Q.append(Ae,Se),e.appendChild(Q);let C=yr(null,null),re=new Map,ke=new Map,ve=null,Me=null,he=null,Le=$o(Se,{transport:i,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,Q.hidden=!0,L()}}),Je=Xi({transport:i,console_el:B,getLanes:()=>C,getWorkspaces:()=>o&&o.get?o.get():null,getCrossLanes:yt,reproject:y=>({lanes:E(y),raw_lanes:y}),onCorrection:ee,showToast:be,requestRender:()=>L(),adoptQueue:(y,v)=>{ke.set(y,v)},onDragBegin:()=>{O=null},candidate_drop:!0}),{applyDrop:lt,dropModel:P,runPlanned:ce,sendQueueCas:se}=Je;async function de(y,v,p,g,M=!0){if(!i||!p)return null;let X=await i(y,{...v,root_dir:p,expected_revision:g});if(X&&X.conflict&&M){X.queue&&ke.set(p,X.queue);let ne=X.queue&&typeof X.queue.revision=="number"?X.queue.revision:g;X=await i(y,{...v,root_dir:p,expected_revision:ne})}return X&&X.queue&&p&&ke.set(p,X.queue),X}function Ee(y,v){let p=ke.get(y),g=o&&o.get?o.get():null,M=(Array.isArray(g)?g:[]).find(ne=>ne?.root_dir===y);return(p||M)?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action}async function _e(y,v,p,g){let M=await de(y,v,p,g),X=ke.get(p)?.revision??M?.queue?.revision??g;return _r(M,(ne,ue)=>de(y,{...v,continuation:ne,decision_token:ue},p,X,!1),{refresh:ne=>de(y,v,p,ne?.queue?.revision??ke.get(p)?.revision??X,!1)})}async function De(y,v,p,g){let M=await _r({continuation_mismatch:g},(ne,ue)=>de("worker-merge-queue-add",{bead_id:v,continuation:ne,decision_token:ue},y,p,!1)),X=M?.queue?.merge_queue?.find(ne=>ne.bead_id===v)?.continuation_action;M?.applied!==!0&&X?.continuation===null&&X.mismatch&&await De(y,v,M.queue.revision,X.mismatch)}async function Ue(y,v,p){let g=await de("worker-discard",y,v,p);if(g&&g.discarded===!0){be(di(g),"success",5e3);return}if(g&&g.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${g.reason}`,"error");return}if(g&&g.accepted&&g.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(g&&g.accepted){be(`\uD3D0\uAE30 \uC9C4\uD589: ${g.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}g&&!g.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function Qe(y,v,p,g){let M=await de("worker-discard-abandon",y,v,p);if(M&&M.abandoned===!0){be(ui(g),"success",5e3);return}if(M&&M.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${M.reason}`,"error");return}M&&!M.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error")}async function Fe(y,v,p){return!i||!p?null:await i(y,{...v,root_dir:p})}async function te(){let y=new Map;for(let v of C.pr_wait)y.has(v.root_dir)||y.set(v.root_dir,v.expected_revision);for(let[v,p]of y)await de("worker-merge-queue-add-all",{},v,p)}function V(y){let v=I[y];return!!(v&&v.runnable===!0)}function $e(y){let v={...I[y]||{}};v.runnable=!v.runnable,I={...I,[y]:v},Cv(I),L()}function _t(y){U.toggle(y),L()}function ct(y){U.toggleArea(y),L()}function Ke(y){let v=y.dependency_chips||null,p=y.overlap_chips||[],g=y.scope_state==="missing",M=y.armed_lane_chip;return!v&&p.length===0&&!g&&!M?null:{...v||{},...p.length>0?{overlaps:p}:{},...g?{scope_missing:!0}:{},...M?{armed_lane:M}:{}}}function $(y){return bi(y,v=>W.isOpen({bead_id:y.id,chip_key:v}))}function Z(y){let v=Ke(y),p=$(y);return v||p?{...y,...v?{dependency_chips:v}:{},...p?{chip_popover:p}:{}}:y}function Re(y){let v=V(y.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${y.root_dir}
        data-section="runnable"
        aria-expanded=${v?"false":"true"}
        aria-label=${`${y.name} \uC139\uC158 ${v?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${v?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${y.root_dir}>${y.name}</span>
      <span class="mon2-sec__count">${y.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function je(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="candidate"
      data-root-dir=${y.root_dir}
    >
      ${v}
    </div>`}function Xe(y){if(O!==y.id)return null;let v=C.queue_groups.find(X=>X.root_dir===y.root_dir),p=y.place_lanes||[],g=C.cross_lanes_revision!==null,M=[{id:"parallel",label:"\uBCD1\uB82C",count:y.place_index??0}];for(let X of C.chain_lanes)M.push({id:`lane:${X.lane_id}`,label:`\uC5F0\uACB0 ${X.number} (${X.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:X.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g});M.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!g,title:g?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let X of p)M.push({id:`serial:${X.id}`,label:`\uC9C1\uB82C ${Number(X.id.slice(1))}`,count:X.length,group:`${v?v.name:""} \uC9C1\uB82C`});return{bead_id:y.id,lanes:M}}function Ze(y){return je(y,c`${Za(Z(y),Xe(y),{exec_chips_mode:"pinned_only",onOpenDoc:l?(v,p)=>l(p,y.root_dir):void 0})}`)}function We(){return C.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${C.runnable.map(y=>Ze(y))}
      </div>`:c`${C.runnable_sections.map(y=>{let v=V(y.root_dir);return c`<section
        class="mon2-sec${v?" is-collapsed":""}"
        data-root-dir=${y.root_dir}
        data-section="runnable"
      >
        ${Re({root_dir:y.root_dir,name:y.name,count:y.items.length})}
        ${v?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${y.items.map(p=>Ze(p))}
            </div>`}
      </section>`})}`}function dt(y,v){return c`<div
      class="mon2-item"
      data-bead-id=${y.id}
      data-drag-kind="parallel"
      data-root-dir=${y.root_dir}
      data-row-index=${v}
      data-queue-index=${String(y.queue_index??0)}
    >
      ${Mn(Z(y),{actions:bo(y,{nudgeable:!0})})}
    </div>`}function Gt(y,v,p,g){return c`<div
      class="mon2-crow${v.fixed?" mon2-crow--fixed":""}"
      draggable=${v.draggable?"true":"false"}
      data-bead-id=${v.id}
      data-drag-kind="chain"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.lane_id}
      data-row-index=${p}
      data-queue-index=${typeof v.queue_index=="number"?String(v.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Mv(v.seq)}</span
      >
      ${v.workspace_name?c`<span class="worker-mini__repo" title=${v.root_dir}
            >${v.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${v.id}</span>
      <span class="mon2-crow__title">${v.title}</span>
      ${v.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${g.includes(v.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${v.location_title}
        >${v.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${v.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function St(y){let v=C.cross_lanes_revision!==null,p=G(y.lane_id),g=p?.held===!0,M=p?.cycle===!0,X=p?p.mismatched:[],ne=N&&N.lane_id===y.lane_id?N.corrected:0;return c`<div class="mon2-clane" data-lane-id=${y.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${y.label}</span>
        <span class="mon2-clane__count">${y.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${y.state}"
          >${y.badge}</span
        >
        ${ne>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${ne}건 자동 교정</span
            >`:""}
        ${M?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${g?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${Ei}</span
            >`:""}
        ${y.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${y.lane_id}
              ?disabled=${!v||!y.can_confirm||g}
              title=${g?Ei:y.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${y.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${y.run_label}
            </button>`:""}
        ${y.state==="confirmed"&&y.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${y.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${y.lane_id}
              ?disabled=${!v}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${y.lane_id}
          ?disabled=${!v}
          title=${y.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${y.lane_id}
      >
        ${y.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:y.rows.map((ue,ot)=>Gt(y,ue,ot,X))}
      </div>
    </div>`}function kt(y,v,p){return c`<div
      class="mon2-item"
      data-bead-id=${v.id}
      data-drag-kind="repo-serial"
      data-root-dir=${v.root_dir}
      data-lane-id=${y.id}
      data-row-index=${p}
      data-queue-index=${String(v.queue_index??0)}
    >
      ${Mn(Z(v),{actions:bo(v)})}
    </div>`}function wt(y){if(y.length===0)return"";let v=y.length-1;return`${y[0].id} \uC810\uC720${v>0?` +${v}`:""}`}function Ft(y){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${y.id}
    >
      ${Mn({id:y.id,title:y.title,lane:"running",draggable:!1,ghost:!0,badges:[y.badge]})}
    </div>`}function Pt(y,v){let p=v.occupants,g=v.cross_wait_peers||[];return{id:v.id,pane_id:"",title:`${y.name} \xB7 \uC9C1\uB82C ${v.index+1}`,rows:[...p.map(M=>Ft(M)),...v.items.map((M,X)=>kt(v,M,X))],count:v.items.length,empty:v.empty===!0,...p.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${p.map(M=>`${M.id} \u2014 ${M.badge}`).join(`
`)}
              >${wt(p)}</span
            >`,held:!0}:{},cycle:v.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${y.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...g.length>0?{after:c`${g.map(M=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${M.workspace_name}·${M.lane}과 교차 대기
                </div>`)}`}:{}}}function ae(){let y=C.cross_lanes_revision!==null,v=C.chain_lanes.some(p=>p.draft&&p.rows.length===0);return yi({parallel:{rows:C.parallel_rows.map((p,g)=>dt(p,g)),count:C.parallel_rows.length,collapsed:U.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:C.queue_groups.flatMap(p=>p.sublanes.serial.map(g=>({...Pt(p,g),drop:{drop:"repo-serial",root_dir:p.root_dir,lane_id:g.id,lane_length:String(g.raw_length)}}))),collapsed:U.isAreaCollapsed("serial"),extra_panes:C.chain_lanes.map(p=>St(p)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${v||!y}
          title=${y?v?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...C.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function me(y){return c`<div class="worker-rungrid">
      ${C.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:C.running.map(v=>Wl({bead_id:v.id,attempt_id:v.attempt_id||"",title:v.title,runner:v.runner??null,model:v.model??null,effort:v.effort??null,speed:v.speed??null,started_at:v.started_at??null,kind:v.kind,...v.kind==="session"?{updated_at:v.updated_at,session_refs:v.session_refs||[]}:{},workflow:v.workflow||null,resumed_from:v.resumed_from??null,continuation_mode:v.continuation_mode??null,paused:v.run_state==="paused",failed:v.run_state==="failed",parked:v.run_state==="parked",retry_wait:v.run_state==="retry_wait",waiting:v.run_state==="waiting",wait:v.wait||null,retry:v.retry||null,status:v.status,status_label:v.run_state==="failed"?"\uC2E4\uD328":v.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":v.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":v.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":void 0,can_pause:v.can_pause!==!1,exec_chips:v.exec_chips||null,usage:v.usage||null,chip_popover:$(v),discard:v.discard,failure:v.failure?{...v.failure,open:q===v.attempt_id}:null},y,j,{monitor:{repo:v.workspace_name,root_dir:v.root_dir,serial_lane_id:v.serial_lane_id,cross_lane_chip:v.cross_lane_chip||null,last_activity:v.last_activity||null,legs:v.legs||[],dependency_chips:Ke(v)}}))}
    </div>`}function Ge(y){let v={runnable:C.runnable,queue:C.queue,running:C.running,pr_wait:C.pr_wait,done:C.done},p=g=>{let M=v[g.lane],X=g.lane==="runnable"?C.runnable_flat?M.length>0?We():void 0:C.runnable_sections.length>0?We():void 0:g.lane==="queue"?C.queue_groups.length>0||C.chain_lanes.length>0||C.parallel_rows.length>0||C.cross_lanes_unreadable?ae():void 0:g.lane==="running"?me(y):M.length>0?c`${M.map(ne=>Mn(Z(ne)))}`:void 0;return Yn({id:`monitor-${g.lane}`,lane:g.pane,title:g.title,items:M,count:M.length,src:g.lane==="runnable",empty:g.empty,body:X,live:g.lane==="running"&&M.length>0,collapsible:!0,collapsed:U.isCollapsed(g.pane),controls:g.lane==="runnable"?ut():void 0,header_control:Oe(g.lane,M.length)})};if(ie){let g=Dv.map(M=>$f.find(X=>X.lane===M)).filter(M=>M!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${vi({live:C.running.length>0,running_body:C.running.length>0?me(y):"",pr_wait_rows:C.pr_wait.map(M=>Mn(Z(M))),count:C.running.length+C.pr_wait.length})}
            ${g.map(M=>p(M))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${$f.map(g=>p(g))}
        </div>
      </div>`}function ut(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒
        blocked${C.runnable_hidden.blocked>0?` ${C.runnable_hidden.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Zo.map(y=>c`<button
              type="button"
              class="mon-filter__readiness worker-filter__chip${w.readiness===y.value?" is-active":""}"
              data-readiness=${y.value}
              aria-pressed=${w.readiness===y.value?"true":"false"}
            >
              ${y.label}
            </button>`)}
        ${C.runnable_hidden.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${C.runnable_hidden.readiness}</span
            >`:""}
      </div>
    </div>`}function Oe(y,v){return y==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${R}
      >
        ${Xo.map(p=>c`<option
              value=${p.value}
              ?selected=${R===p.value}
            >
              ${p.label}
            </option>`)}
      </select>`:y==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:y==="pr_wait"&&v>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:y==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Vr.map(p=>c`<option value=${p.value} ?selected=${m===p.value}>
              ${p.label}
            </option>`)}
      </select>`:""}function E(y){let v=o&&o.get?o.get():null,p=o&&o.getWorkspacesState?o.getWorkspacesState():[],g=y===void 0?o&&o.crossLanes?o.crossLanes():void 0:y,M={done_since:Ir(m,d()),running_sort:_,candidate_filter:w,candidate_sort:R};return g!==void 0&&(M.cross_lanes=g),yr(v,p,M)}function L(){let y=d();C=E(),H=null,re=new Map;for(let v of[...C.runnable,...C.queue,...C.running,...C.pr_wait,...C.done])!v.non_occupying&&!re.has(v.id)&&re.set(v.id,v);pt(Ge(y),B),pe()?.render(),J(),fe()}function J(){let y=new Map;for(let v of C.queue_groups)y.set(v.root_dir,v.auto_advance);for(let v of Array.from(B.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let p=v.closest(".mon2-item")?.getAttribute("data-root-dir")||"",g=y.get(p);typeof g=="boolean"&&v.setAttribute("title",`${v.textContent||""} \xB7 ${g?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function pe(){if(he)return he;let y=B.querySelector(".mon2-deck");return y?(he=kf(y,{workspacesState:()=>o&&o.getWorkspacesState?o.getWorkspacesState():[],doneItems:()=>C.done,rangeLabel:qe,transport:i,implPresetStore:t.execPresetStore,gotoWorkerTab:ht,onFocusChange:v=>{Y=v,fe()}}),he):null}function fe(){B.classList.toggle("has-focus",Y!==null);for(let y of Array.from(B.querySelectorAll(".mon2-sec[data-root-dir]")))y.classList.toggle("is-focus",Y!==null&&y.getAttribute("data-root-dir")===Y);for(let y of Array.from(B.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let v=re.get(y.getAttribute("data-bead-id")||"");y.classList.toggle("is-focus",Y!==null&&!!v&&v.root_dir===Y)}for(let y of Array.from(B.querySelectorAll(".mon2-crow[data-root-dir]")))y.classList.toggle("is-focus",Y!==null&&y.getAttribute("data-root-dir")===Y)}function Pe(y,v){let p=s?s():void 0;if(!v||!p||v===p||!a){r(y);return}a(v).then(()=>{r(y)}).catch(g=>{n("workspace switch for %s failed: %o",v,g)})}function ht(y){if(!y)return;let v=s?s():void 0,p=()=>{try{u?.gotoView("worker")}catch(g){n("gotoView(worker) failed: %o",g)}};if(!a||v&&v===y){p();return}a(y).then(p).catch(g=>{n("workspace switch for %s failed: %o",y,g),be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function $t(y){_n(y).then(v=>{be(v?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",v?"success":"error",1400)})}function gt(y){let v=re.get(y)||null;return{item:v,root_dir:v?v.root_dir:"",revision:v?v.expected_revision:0}}async function Ut(y,v,p){if(y!=="dep-add")return;let g=C.chain_lanes.find(M=>M.rows.some(X=>X.id===v));!g||!g.rows.some(M=>M.id===p)||await ce(M=>Fd(g.lane_id,M),"",[{type:y,a:v,b:p}])}function yt(){return(o&&o.crossLanes?o.crossLanes():null)??null}async function Rt(y,v){if(y==="run"){await en(v);return}if(y==="stop"){await Yt(v);return}if(y==="create"){await ce(p=>ll(null,p),"");return}if(y==="remove"){let p=Ud(v,P());if(p!==null&&!f(p))return;await ce(g=>Bd(v,g),"");return}await ce(p=>y==="confirm"?Nd(v,p):jd(v,p),"")}function Ot(y){let v=new Map;for(let p of y.rows){let g=C.owner_of[p.id]||p.root_dir;typeof g!="string"||g.length===0||v.set(g,[...v.get(g)||[],p.id])}return v}async function en(y){let v=C.chain_lanes.find(X=>X.lane_id===y);if(!v||C.cross_lanes_revision===null){L();return}ye();let p=new Map,g=new Map,M=Ot(v);for(let X of v.rows){if(!X.unplaced)continue;let ne=C.owner_of[X.id]||X.root_dir;if(typeof ne!="string"||ne.length===0){be(`${X.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),L();return}let ue=g.get(ne)??0;if(await se("worker-queue-place",{bead_id:X.id,lane:"parallel",index:(C.parallel_raw_length[ne]??0)+ue},ne,p,{bead_id:X.id})===null){L();return}g.set(ne,ue+1)}for(let[X,ne]of M)if(await se("worker-queue-arm",{bead_ids:ne,lane_id:y},X,p,{bead_id:ne[0]})===null){be("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),L();return}L()}async function Yt(y){let v=C.chain_lanes.find(g=>g.lane_id===y);if(!v||C.cross_lanes_revision===null){L();return}ye();let p=new Map;for(let[g,M]of Ot(v))if(await se("worker-queue-disarm",{lane_id:y},g,p,{bead_id:M[0]})===null)break;L()}async function Mt(y,v){let{root_dir:p,revision:g}=gt(y);if(p.length===0){L();return}await se("worker-queue-disarm",{bead_ids:[y],lane_id:v},p,new Map([[p,g]]),{bead_id:y}),L()}async function xt(y,v){let p=re.get(y);if(!p){L();return}let g={kind:"candidate",bead_id:y,root_dir:p.root_dir};if(v==="new-lane"){await ce(M=>ll({bead_id:y,root_dir:p.root_dir},M),y);return}if(v.startsWith("lane:")){let M=v.slice(5);if(!C.chain_lanes.find(ne=>ne.lane_id===M)){L();return}await ce(ne=>Ci(g,{kind:"chain",lane_id:M,marker_index:(ne.cross_lanes.get(M)?.entries??[]).length},ne),y);return}if(v.startsWith("serial:")){let M=v.slice(7),X=(p.place_lanes||[]).find(ne=>ne.id===M);await lt(g,{kind:"repo-serial",root_dir:p.root_dir,lane_id:M,index:X?X.index:0});return}await lt(g,{kind:"parallel",marker_index:C.parallel_rows.length})}async function Kt(y,v){let p=C.parallel_rows,g=p.findIndex(bt=>bt.id===y);if(g<0)return;let M=p[g].root_dir,X=[];p.forEach((bt,et)=>{bt.root_dir===M&&X.push(et)});let ne=X.indexOf(g),ue=X[ne+v];if(typeof ue!="number")return;let ot=v===-1?ue:X[ne+2]??Math.min(p.length,ue+1);await lt({kind:"parallel",bead_id:y,root_dir:M,queue_index:p[g].queue_index??0},{kind:"parallel",marker_index:ot})}async function nn(y){for(let v of C.chain_lanes){let p=v.rows.find(g=>g.id===y);if(p){await lt({kind:"chain",bead_id:y,root_dir:p.root_dir,lane_id:v.lane_id,...typeof p.queue_index=="number"?{queue_index:p.queue_index}:{}},{kind:"parallel",marker_index:C.parallel_rows.length});return}}}function Wt(y){return{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,status:y.run_state==="running"?"running":y.run_state,worktree:y.root_dir}}function an(y,v){let{item:p,root_dir:g,revision:M}=gt(v),X=p?.attempt_id||"",ne=y.classList;if(ne.contains("worker-mini__rowops-up")||ne.contains("worker-mini__rowops-down")){Kt(v,ne.contains("worker-mini__rowops-up")?-1:1);return}if(ne.contains("worker-mini__rowops-remove")){de("worker-queue-remove",{bead_id:v},g,M);return}if(ne.contains("mon2-crow__detach")){nn(v);return}if(ne.contains("worker-dep__open")){Pe(y.getAttribute("data-dep-id")||"",y.getAttribute("data-root-dir")||"");return}if(ne.contains("mon2-arm__release")){Mt(v,y.getAttribute("data-lane-id")||"");return}if(ne.contains("mon-lane__chip")){let ue=y.getAttribute("data-lane-id")||"";B.querySelector(`.mon2-clane[data-lane-id="${ue}"]`)?.scrollIntoView({block:"nearest"});return}if(ne.contains("judgement-chip")){let ue=y.getAttribute("data-chip-key")||"";ue&&W.toggle({bead_id:v,chip_key:ue});return}if(ne.contains("rtile__failure-badge")){q=q===X?null:X,L();return}if(ne.contains("rtile__attempt-copy")){let ue=y.getAttribute("data-attempt-id")||"";ue&&_n(ue).then(ot=>{be(ot?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",ot?"success":"error",1400)});return}if(ne.contains("worker-card__place")){O=O===v?null:v,L();return}if(ne.contains("worker-card__place-cancel")){O=null,L();return}if(ne.contains("worker-card__place-lane")){let ue=y.getAttribute("data-lane")||"parallel";O=null,xt(v,ue);return}if(ne.contains("rtile__session")){if(p&&p.kind==="session"){let ue=(p.session_refs||[]).find(ot=>ot&&ot.current===!0);ue&&(Q.hidden=!1,Le.open(so(ue,v,"in_progress",g)),L());return}j=X,X&&p&&(Q.hidden=!1,Le.open({attempt_id:X,root_dir:g,meta:Wt(p)})),L();return}if(ne.contains("rtile__pause")){Fe("worker-attempt-pause",{attempt_id:X},g);return}if(ne.contains("rtile__resume")){oo({context:{bead_id:v,kind:y.dataset.resumeKind==="settlement"?"settlement":"session",tuple:p?Sn(p):""},transport:ue=>de("worker-attempt-resume",{attempt_id:X,...ue},g,ke.get(g)?.revision??gt(v).revision,!1)});return}if(ne.contains("rtile__parked-retry")){Fe("worker-parked-retry",{bead_id:v,attempt_id:X},g).then(ue=>{ue&&ue.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${ue.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":ue.reason||""}`,"error")});return}if(ne.contains("rtile__discard-abandon")){let ue={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(Go(v,ue)))return;Qe({bead_id:v,operation_id:y.dataset.operationId||""},g,M,ue);return}if(ne.contains("rtile__discard")){let ue=y.dataset.confirmation==="merged"?"merged":"unmerged";if(!f(Ko(v,ue)))return;Ue({bead_id:v,...X?{attempt_id:X}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},g,M);return}if(ne.contains("worker-mini__merge")){let ue=Ee(g,v);ue?.mismatch&&ue.continuation===null?De(g,v,M,ue.mismatch):de("worker-merge-queue-add",{bead_id:v},g,M);return}if(ne.contains("worker-mini__merge-cancel")){de("worker-merge-queue-remove",{bead_id:v},g,M);return}if(ne.contains("worker-mini__discard-abandon")){let ue={kind:y.dataset.operationKind||"",last_error:y.dataset.lastError||""};if(!f(Go(v,ue)))return;Qe({bead_id:v,operation_id:y.dataset.operationId||""},g,M,ue);return}if(ne.contains("worker-mini__discard")){let ue=y.dataset.discardMode==="merged"?"merged":"unmerged";if(!f(Ko(v,ue)))return;Ue({bead_id:v,...y.dataset.attemptId?{attempt_id:y.dataset.attemptId}:{},...y.dataset.operationId?{operation_id:y.dataset.operationId}:{}},g,M);return}if(ne.contains("worker-mini__revise-fix")){_e("worker-revise-fix",{bead_id:v},g,M);return}ne.contains("worker-mini__revise-approve")&&de("worker-revise-approve",{bead_id:v},g,M)}function Zt(y){let v=Je.consumeClickSuppression(),p=y.target;if(!p||typeof p.closest!="function"||p.closest("dialog")||p.closest(".worker-drawer-overlay")||p.closest("a"))return;let g=p.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(g){y.preventDefault();let Ce=p.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||g.textContent?.trim()||"";Ce&&$t(Ce);return}let M=p.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(M){y.preventDefault();let x=M.getAttribute("data-root-dir")||re.get(p.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||M.getAttribute("title")||"";ht(x);return}let X=p.closest(".mon2-sec__toggle");if(X){y.preventDefault(),$e(X.getAttribute("data-root-dir")||"");return}let ne=p.closest(".worker-pane__toggle[data-lane]");if(ne){y.preventDefault();let x=ne.getAttribute("data-lane")||"";(x==="candidate"||x==="queue"||x==="running"||x==="pr_wait"||x==="done")&&_t(x);return}let ue=p.closest(".worker-wait__area-toggle[data-area]");if(ue){y.preventDefault(),ct(ue.getAttribute("data-area")||"parallel");return}if(p.closest(".mon2-newlane")){y.preventDefault(),Rt("create","");return}let ot=p.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ot){y.preventDefault();let x=ot.getAttribute("data-lane-id")||"",Ce=ot.classList;Rt(Ce.contains("mon2-clane__confirm")?"confirm":Ce.contains("mon2-clane__reapply")?"reapply":Ce.contains("mon2-clane__run")?"run":Ce.contains("mon2-clane__stop")?"stop":"remove",x);return}if(p.closest(".mon-merge-all")){y.preventDefault(),te();return}let bt=p.closest(".mon-filter__readiness");if(bt){y.preventDefault(),w={...w,readiness:bt.getAttribute("data-readiness")||"all"},wf(w),L();return}let et=p.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!et)return;let Nt=et.getAttribute("data-bead-id")||"",S=p.closest("button");if(S){y.preventDefault(),an(S,Nt);return}p.closest(".rtile__failure-pop, .chip-popover")||Nt&&!v&&(y.preventDefault(),Pe(Nt,et.getAttribute("data-root-dir")||gt(Nt).root_dir))}function xe(y){let v=y.target;if(!v||typeof v.closest!="function")return;let p=v.closest(".mon-filter__blocked");if(p){w={...w,show_blocked:p.checked},wf(w),L();return}let g=v.closest(".mon-candidate-sort");if(g){R=Xo.some(ne=>ne.value===g.value)?g.value:"repo_spec",Ev(R),L();return}let M=v.closest(".mon-running-sort");if(M){_=M.value==="repo"?"repo":"started",Lv(_),L();return}let X=v.closest(".mon-done-range");X&&(m=zn(X.value),Ov(m),L())}function A(y){let v=y.target,p=v&&typeof v.closest=="function"?g=>v.closest(g):()=>null;q&&!p(".rtile__failure-pop, .rtile__failure-badge")&&(q=null,L())}function ge(y){y.key!=="Escape"||q===null||(q=null,L())}e.addEventListener("click",Zt),e.addEventListener("change",xe),document.addEventListener("click",A),document.addEventListener("keydown",ge),W.attach(),Je.attach(e);{let y=!0;z=Yi(v=>{if(ie=v,y){y=!1;return}L()})}o&&typeof o.subscribe=="function"&&(ve=o.subscribe(()=>{try{ke.clear(),L()}catch{}}));function Ne(){Me!==null&&(clearInterval(Me),Me=null)}return{recorrectSharedLane:Ut,load(){n("load"),L(),Me===null&&(Me=setInterval(()=>{try{L()}catch{}},Pv))},pause(){Ne()},clear(){Ne(),Je.detach(),ve&&(ve(),ve=null),z&&(z(),z=null),Le.destroy(),Q.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",Zt),e.removeEventListener("change",xe),document.removeEventListener("click",A),document.removeEventListener("keydown",ge),W.detach(),e.replaceChildren()}}}function If(e,t,n){let r=Bt("views:nav"),{global_element:o,repo_element:i}=e,s=null;function l(m){return _=>{_.preventDefault();let w=m==="monitor"&&a()==="monitor"?"worker":m;r("click tab %s",w),n.gotoView(w)}}function a(){let m=t.getState();return m.view==="worker"||m.view==="monitor"?m.view:"board"}function u(){let m=a();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${m==="monitor"?"is-active":""}"
        @click=${l("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let m=a();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${m==="board"?"is-active":""}"
          @click=${l("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${m==="worker"?"is-active":""}"
          @click=${l("worker")}
          >Worker</a
        >
      </div>
    `}function f(){o&&pt(u(),o),i&&pt(d(),i)}return f(),s=t.subscribe(()=>f()),{destroy(){s&&(s(),s=null),o&&pt(c``,o),i&&pt(c``,i)}}}var Lf=["bug","feature","task","epic","chore"];function Pf(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Df=["Critical","High","Medium","Low","Backlog"];function Mf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),i=n.querySelector("#new-type"),s=n.querySelector("#new-priority"),l=n.querySelector("#new-labels"),a=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),f=n.querySelector("#btn-create"),m=n.querySelector(".new-issue__close");function _(){i.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",i.appendChild(O);for(let q of Lf){let W=document.createElement("option");W.value=q,W.textContent=Pf(q),i.appendChild(W)}s.replaceChildren();for(let q=0;q<=4;q+=1){let W=document.createElement("option");W.value=String(q);let Y=Df[q]||"Medium";W.textContent=`${q} \u2013 ${Y}`,s.appendChild(W)}}_();function w(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(O){o.disabled=O,i.disabled=O,s.disabled=O,l.disabled=O,a.disabled=O,d.disabled=O,f.disabled=O,f.textContent=O?"Creating\u2026":"Create"}function I(){u.textContent=""}function U(O){u.textContent=O}function ie(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?i.value=O:i.value="";let q=window.localStorage.getItem("beads-ui.new.priority");q&&/^\d$/.test(q)?s.value=q:s.value="2"}catch{i.value="",s.value="2"}}function z(){let O=i.value||"",q=s.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),q.length>0&&window.localStorage.setItem("beads-ui.new.priority",q)}async function j(){I();let O=String(o.value||"").trim();if(O.length===0){U("Title is required"),o.focus();return}let q=Number(s.value||"2");if(!(q>=0&&q<=4)){U("Priority must be 0..4"),s.focus();return}let W=String(i.value||""),Y=String(a.value||""),N={title:O};W.length>0&&(N.type=W),String(q).length>0&&(N.priority=q),Y.length>0&&(N.description=Y),R(!0);try{await t("create-issue",N)}catch{R(!1),U("Failed to create issue");return}z(),R(!1),w()}return n.addEventListener("cancel",O=>{O.preventDefault(),w()}),m.addEventListener("click",()=>w()),d.addEventListener("click",()=>w()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),j())}),r.addEventListener("submit",O=>{O.preventDefault(),j()}),{open(){r.reset(),I(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){w()}}}var qv=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked\xB7\uC0AC\uC6A9\uC790 \uB9AC\uBDF0 \uD544\uC694 \uCE69"],["stepper","stepper"]];function Nv(e,t){return $a(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function qf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let o=Nv(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${o}`}
                data-label=${r}
                data-state=${o}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Nf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
              >
                ×
              </button>
            </span>`)}
      </div>
      <div class="settings-dialog__prefix-add">
        <input
          type="text"
          class="settings-dialog__prefix-input"
          aria-label="숨길 prefix"
          placeholder="예: reviewed:"
          .value=${t}
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function jf(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${qv.map(([n,r])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var jv=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Ff(e,t){let{transport:n,policyStore:r,labelOptions:o}=t,i=t.notify||(ee=>be(ee,"error",4e3)),s=document.createElement("dialog");s.id="settings-dialog",s.className="settings-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-label","\uC124\uC815"),e.appendChild(s);let l="execution",a=!1,u="",d=null;function f(){if(d)return d;let ee=s.querySelector('[data-pane="execution"]');return ee?(d=ta(ee,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:i,onQueueAdopt:ye=>t.queueStore?.set?.(ye)}),d):null}function m(){return c`
      <section
        class=${`settings-dialog__pane${l==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function _(){let ee=r.get();return c`
      <section
        class=${`settings-dialog__pane${l==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${ee?c`
              ${qf(ee,o(),U)}
              ${Nf(ee,u,{onDraft:ye=>{u=ye},onAdd:ie,onRemove:z})}
              ${jf(ee,j)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function w(ee){let ye=r.get();if(ye)try{let qe=await n("display-policy-set",{expected_revision:ye.revision,policy:ee(ye)});R(qe),qe&&qe.conflict&&qe.policy&&(qe=await n("display-policy-set",{expected_revision:qe.policy.revision,policy:ee(qe.policy)}),R(qe)),qe&&qe.conflict&&i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{i("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function R(ee){ee&&ee.policy&&typeof ee.policy=="object"&&r.set(ee.policy)}function I(ee){w(ee)}function U(ee){let ye=r.get();if(!ye)return;let qe=!Fv(ee,ye);I(B=>Bv(ee,B,qe))}function ie(){let ee=u.trim();ee.length!==0&&(u="",I(ye=>ye.hidden_prefixes.includes(ee)?{hidden_prefixes:ye.hidden_prefixes}:{hidden_prefixes:[...ye.hidden_prefixes,ee]}),O())}function z(ee){I(ye=>({hidden_prefixes:ye.hidden_prefixes.filter(qe=>qe!==ee)}))}function j(ee){let ye=r.get();if(!ye)return;let qe=ye.chips[ee]===!1;I(()=>({chips:{[ee]:qe}}))}function O(){pt(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${jv.map(ee=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ee.id}
                  aria-selected=${String(l===ee.id)}
                  aria-controls=${`settings-pane-${ee.id}`}
                  @click=${()=>q(ee.id)}
                >
                  <span class="settings-dialog__glyph">${ee.glyph}</span>
                  ${ee.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${G}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${m()} ${_()}
          </div>
        </div>
      `,s),f()}function q(ee){l=ee,O()}let W=()=>{a=!1,t.onOpenChange?.(!1)};s.addEventListener("close",W),s.addEventListener("cancel",W);let Y=ee=>{ee.target===s&&G()};s.addEventListener("click",Y);let N=null;r.subscribe&&(N=r.subscribe(()=>{a&&O()}));let F=null;t.implPresetStore?.subscribe&&(F=t.implPresetStore.subscribe(()=>{a&&d?.render()}));function H(ee="execution"){a||(a=!0,t.onOpenChange?.(!0),l=ee,u="",O(),typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),f()?.load())}function G(){a&&(a=!1,t.onOpenChange?.(!1),typeof s.close=="function"?s.close():s.removeAttribute("open"))}return{open:H,close:G,sessionDraft:()=>d?.sessionDraft()??{},destroy(){a=!1,s.removeEventListener("close",W),s.removeEventListener("cancel",W),s.removeEventListener("click",Y),N&&(N(),N=null),F&&(F(),F=null),d?.destroy(),d=null,s.remove()}}}function Fv(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Bv(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(i=>i!==e)};let r=t.hidden_labels.filter(i=>i!==e);return t.hidden_prefixes.some(i=>i.length>0&&e.startsWith(i))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var Uv=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Bf="usage-meter-card",Wv="usage-meter-layer",Hl=600,zv=["token_expired","relogin_required"];function Uf(e){return String(e).padStart(2,"0")}function Hv(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),o=Math.floor(n%1440/60),i=n%60;return r>0?`${r}d${o>0?` ${o}h`:""}`:o>0?`${o}h${i>0?` ${i}m`:""}`:`${i}m`}function Wf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),o=new Date(t),i=`${Uf(r.getHours())}:${Uf(r.getMinutes())}`,l=r.getFullYear()===o.getFullYear()&&r.getMonth()===o.getMonth()&&r.getDate()===o.getDate()?i:`${Uv[r.getMonth()]} ${r.getDate()} ${i}`;return`${Hv(n,t)} \xB7 ${l}`}function Kv(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function zf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function Hf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var Kf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function Yf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Gv(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:Yf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function Yv(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let i of n.accounts){let s=Gv(i);s&&r.push(s)}let o=n.available===!0&&Array.isArray(n.windows);return!o&&r.length===0?null:{available:o,windows:o?Yf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Vv(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=Yv(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function Vf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Qv(e,t){return!e.held||Vf(e,t)<=Hl?e:{...e,available:!1,windows:[],accounts:[]}}function Gf(e,t){return`${e}:${t}`}function Qf(e){let t=!1,n=null,r=new Map,o=null,i=new Map,s=new Map,l=0,a=null;function u(){pt(c``,e),e.hidden=!0,f()}function d(){if(a===null){let B=e.ownerDocument;a=B.createElement("div"),a.id=Wv,a.className="usage-meter__layer",B.body.appendChild(a)}return a}function f(){a!==null&&(pt(c``,a),a.remove(),a=null)}function m(B){n!==B&&(n===null&&(document.addEventListener("mousedown",w),document.addEventListener("keydown",I),window.addEventListener("resize",R)),n=B)}function _(){n!==null&&(n=null,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",I),window.removeEventListener("resize",R))}function w(B){let Q=B.target;Q&&(e.contains(Q)||a!==null&&a.contains(Q))||(_(),G())}function R(){G()}function I(B){B.key==="Escape"&&(_(),G())}function U(B){n===B?_():m(B),G()}function ie(){_(),G()}async function z(B,Q){if(r.has(B.key))return;let Ae=Gf(B.key,Q);r.set(B.key,Q),s.delete(Ae),G();let Se=null;try{Se=await(await fetch(B.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:Q})})).json()}catch{Se=null}if(t)return;if(r.delete(B.key),!Se||Se.ok!==!0){let re=Se&&typeof Se.error=="string"&&Se.error.length>0?Se.error:"network_error";s.set(Ae,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${re}`}),G();return}let C=Array.isArray(Se.warnings)?Se.warnings.filter(re=>typeof re=="string"&&re.length>0):[];C.length>0&&s.set(Ae,{kind:"warn",text:C.join(" \xB7 ")}),G(),await qe()}function j(B,Q,Ae,Se){let C=Hf(B.pct),ke=`resets ${Wf(B.resetsAt,Se)}${Q?` \xB7 ${Ae}`:""}`;return c`<span
      class="usage-meter__window ${zf(C)}"
      style=${`--progress: ${C}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${B.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${C}%</span>
    </span>`}function O(B,Q,Ae){let Se=Vf(Q,Ae),C=Q.available&&(Q.held||Se>Hl),re=C?`${Math.floor(Se/60)}\uBD84 \uC804 \uCE21\uC815`:"",ke=Q.accounts.filter(Le=>!Le.active).length,ve=`usage-meter__group${C?" usage-meter__group--stale":""}`,Me=c`<span class="usage-meter__provider"
        >${B.label}</span
      >
      ${Q.available?Q.windows.map(Le=>j(Le,C,re,Ae)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ke>0?c`<span class="usage-meter__badge">+${ke}</span>`:""}`;if(Q.accounts.length===0)return c`<span
        class=${ve}
        aria-label=${`${B.label} usage`}
        >${Me}</span
      >`;let he=n===B.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${ve}`}
      aria-label=${`${B.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${Bf}
      @click=${()=>U(B.key)}
    >
      ${Me}
    </button>`}function q(B,Q){return c`<span class="usage-meter" aria-label="Usage">
      ${B.map(Ae=>O(Ae.provider,Ae.snapshot,Q))}
    </span>`}function W(B,Q){let Ae=Hf(B.pct),Se=Wf(B.resetsAt,Q);return c`<span
      class="usage-meter__account-window ${zf(Ae)}"
      style=${`--progress: ${Ae}%`}
    >
      <span class="usage-meter__account-key">${B.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Ae}%</span>
      <span class="usage-meter__account-reset"
        >${Se.length>0?`\u21BB ${Se}`:""}</span
      >
    </span>`}function Y(B,Q){return zv.includes(Q)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${B.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function N(B,Q,Ae){let Se=Q.status==="ok",C=typeof Q.ageSeconds=="number"&&Q.ageSeconds>Hl,re=s.get(Gf(B.key,Q.number)),ke=r.get(B.key),ve=ke!==void 0,Me=ke===Q.number,he=["usage-meter__account"];return Q.active&&he.push("usage-meter__account--active"),Se||he.push("usage-meter__account--unavailable"),C&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${Q.email}
          >${Q.alias===null?Q.email:Q.alias}</span
        >
        ${Q.plan===null?"":c`<span class="usage-meter__account-tag">${Q.plan}</span>`}
        ${Q.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${Q.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Kv(Q.ageSeconds)}</span
            >`}
        ${Q.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${ve}
              @click=${()=>{z(B,Q.number)}}
            >
              ${Me?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Se?c`<div class="usage-meter__account-windows">
            ${Q.windows.map(Le=>W(Le,Ae))}
          </div>`:c`<div class="usage-meter__account-status">
            ${Y(B,Q.status)}
          </div>`}
      ${re===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${re.kind}"
          >
            ${re.text}
          </div>`}
    </div>`}function F(B,Q,Ae){let Se=Q.accounts.filter(C=>C.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${B.label} · 활성 ${Se} / 전체
        ${Q.accounts.length}
      </h2>
      ${Q.accounts.map(C=>N(B,C,Ae))}
    </section>`}function H(B,Q){return c`<div
      class="usage-meter__card"
      id=${Bf}
      role="dialog"
      aria-label=${`${B.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${F(B.provider,B.snapshot,Q)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function G(){let B=Date.now(),Q=[];for(let Se of Kf){let C=i.get(Se.key);C&&Q.push({provider:Se,snapshot:Qv(C,B)})}if(Q.length===0){_(),u();return}let Ae=Q.find(Se=>Se.provider.key===n&&Se.snapshot.accounts.length>0);Ae||_(),pt(q(Q,B),e),e.hidden=!1,Ae?ee(Ae,B):f()}function ee(B,Q){let Ae=d(),Se=e.getBoundingClientRect(),C=e.ownerDocument.documentElement.clientWidth;Ae.style.setProperty("--usage-meter-anchor-top",`${Se.bottom}px`),Ae.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,C-Se.right)}px`),pt(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${H(B,Q)}`,Ae)}async function ye(B){try{let Q=await fetch(B.endpoint);return Q.ok?Vv(await Q.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function qe(){l+=1;let B=l,Q=await Promise.all(Kf.map(async Ae=>({provider:Ae,read:await ye(Ae)})));if(!(t||B!==l)){for(let Ae of Q){let Se=Ae.provider.key;if(Ae.read.kind==="ok"){i.set(Se,Ae.read.snapshot);continue}if(Ae.read.kind==="empty"){i.delete(Se);continue}let C=i.get(Se);C!==void 0&&!C.held&&i.set(Se,{...C,held:!0})}G()}}return u(),qe(),o=setInterval(()=>{qe()},6e4),{destroy(){t=!0,o!==null&&(clearInterval(o),o=null),_(),u()}}}function ys(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let o=r.type??r.dependency_type;return o!==void 0&&o!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Jf="bdui.worker.candidate_sort",vs=Object.freeze([{id:"spec",label:"spec \uC6B0\uC120",chain:[{key:"spec",dir:"desc"},{key:"created",dir:"asc"}]},{id:"bottleneck",label:"\uBCD1\uBAA9 \uC6B0\uC120",chain:[{key:"priority",dir:"asc"},{key:"dependents",dir:"desc"},{key:"released",dir:"desc"}]},{id:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131",chain:[{key:"created",dir:"desc"},{key:"priority",dir:"asc"}]},{id:"updated",label:"\uCD5C\uC2E0 \uC218\uC815",chain:[{key:"updated",dir:"desc"}]}]),ra=Object.freeze({preset:"spec"}),e_=3,t_=Object.freeze([{key:"priority",label:"\uC6B0\uC120\uC21C\uC704"},{key:"dependents",label:"\uD6C4\uC18D \uC218"},{key:"released",label:"\uD574\uC81C \uC2DC\uAC01"},{key:"spec",label:"spec \uC720\uBB34"},{key:"created",label:"\uC0DD\uC131"},{key:"updated",label:"\uC218\uC815"}]);function Xf(e){return vs.some(t=>t.id===e)}function Zf(e){let t=vs.find(n=>n.id===e);return t?t.chain.map(n=>({...n})):[]}function Xv(e,t){return e.length===t.length&&e.every((n,r)=>n.key===t[r].key&&n.dir===t[r].dir)}function ks(e){return e&&"preset"in e?Zf(e.preset):e&&Array.isArray(e.chain)?e.chain.map(t=>({...t})):Zf("spec")}function Kl(e){return e&&"preset"in e?e.preset:null}function zr(e){if(typeof e=="string"){let i;try{i=JSON.parse(e)}catch{return Xf(e)?{preset:e}:ra}return zr(i)}if(!e||typeof e!="object")return ra;let t=e;if(Xf(t.preset))return{preset:t.preset};let n=t.chain;if(!Array.isArray(n)||n.length===0||n.length>e_||!n.every(ya))return ra;let r=[];for(let i of n)r.some(s=>s.key===i.key)||r.push({key:i.key,dir:i.dir});let o=vs.find(i=>Xv(i.chain,r));return o?{preset:o.id}:{chain:r}}function n_(){try{return zr(window.localStorage.getItem(Jf))}catch{return ra}}function Gl(e){try{window.localStorage.setItem(Jf,JSON.stringify(e))}catch{}}function r_(e,t,n){let r=e.map(a=>({...a}));if(!n)return r.slice(0,t);if(!Object.prototype.hasOwnProperty.call(Ls,n))return r;let o=n;if(r.slice(0,t).some(a=>a.key===o))return r.slice(0,t);let i={key:o,dir:r[t]&&r[t].key===o?r[t].dir:Ls[o]},s=r.slice(0,t),l=r.slice(t+1).filter(a=>a.key!==o);return[...s,i,...l].slice(0,e_)}function o_(e,t){return e.map((n,r)=>r===t?{key:n.key,dir:n.dir==="asc"?"desc":"asc"}:{...n})}function Zv(e){let t=new Set(e.map(l=>l.id)),n=new Map,r=new Map;for(let l of e){let a=ys(l).filter(u=>t.has(u));n.set(l.id,a);for(let u of a){let d=r.get(u);d?d.push(l):r.set(u,[l])}}let o=new Set,i=[],s=l=>{o.add(l.id),i.push(l);for(let a of r.get(l.id)??[])!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u))&&s(a)};for(;i.length<e.length;){let l=e.find(a=>!o.has(a.id)&&(n.get(a.id)??[]).every(u=>o.has(u)));s(l??e.find(a=>!o.has(a.id)))}return i}function s_(e,t){let n=Array.isArray(e)?e.slice():[];return n.sort(Lc(ks(t))),Zv(n)}function i_(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,o=[],i=new Set;for(let s of t){if(i.has(s.id))continue;i.add(s.id);let l=r[s.id];if(!l||!Array.isArray(l.scope))continue;let a=l.scope.filter(u=>typeof u=="string"&&u.length>0);if(a.length===0){n.set(s.id,{overlaps:[],scope_missing:!0});continue}n.set(s.id,{overlaps:[],scope_missing:!1}),o.push({member:s,scope:a})}for(let s=0;s<o.length;s+=1)for(let l=s+1;l<o.length;l+=1){let a=oi(o[s].scope,o[l].scope);if(a.length===0)continue;let u=o[s].member,d=o[l].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:a}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:a})}return n}var a_=new Set(["sh","bash","zsh","dash","ksh"]),l_=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function c_(e){let t=e.split("/");return t[t.length-1]||""}function Jv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=c_(n[0]);if(r!=="env")return a_.has(r);let o=n.slice(1).find(i=>!i.startsWith("-")&&!i.includes("="));return o!==void 0&&a_.has(c_(o))}function ek(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function tk(e){let t=[],n=0;l_.lastIndex=0;for(let r of e.matchAll(l_)){let o=r.index;o>n&&t.push({text:e.slice(n,o),kind:"plain"}),t.push({text:r[0],kind:ek(r[0])}),n=o+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function nk(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function u_(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let o=null,i="loading",s="",l="",a=0,u=null,d=!1;function f(O,q){return q?tk(O).map(W=>W.kind==="plain"?W.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${W.kind}"
            >${W.text}</span
          >`):O}function m(){if(!o)return c``;let O=i==="ready"&&Jv(s),q=i==="ready"?s.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${o.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>z()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${o.path}
              >${o.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${o.base_ref}@${o.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${i!=="ready"}
              @click=${()=>{w()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>z()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${i==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:i==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${q.map((W,Y)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${Y+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${f(W,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function _(){pt(m(),r)}async function w(){if(i!=="ready")return;let O=await _n(s);be(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function R(O){O.key==="Escape"&&o&&(O.preventDefault(),z())}function I(){d||(document.addEventListener("keydown",R),d=!0)}function U(){d&&(document.removeEventListener("keydown",R),d=!1)}async function ie(O,q=null){let W=++a;I(),o={...O},u=q||(document.activeElement instanceof HTMLElement?document.activeElement:null),i="loading",s="",l="",_(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let N=t?t():"";if(!N){i="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",_();return}if(!n){i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",_();return}let F="/api/repo-ops-script?workspace="+encodeURIComponent(N)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let H=await n(F),G=await H.json().catch(()=>({}));if(W!==a)return;if((t?t():"")!==N){z();return}if(!H.ok||!G||G.ok!==!0){i="error",l=nk(G&&typeof G.error=="string"?G.error:""),_();return}o={lane:G.lane,base_sha:G.base_sha,path:G.path,base_ref:G.base_ref},s=String(G.content),i="ready",_()}catch{if(W!==a)return;i="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",_()}}function z(){a+=1,U(),o=null,s="",_();let O=u;u=null,O?.isConnected&&O.focus()}function j(){z(),r.remove()}return{open:ie,close:z,destroy:j}}var d_={deploy_not_declared:"\uC120\uC5B8 \uC5C6\uC74C",deploy_opted_out:"\uC774 workspace\uC5D0\uC11C \uBC30\uD3EC \uC2E4\uD589\uC774 \uAEBC\uC838 \uC788\uC74C",deploy_in_flight:"\uBC30\uD3EC \uC9C4\uD589 \uC911",target_unresolved:"\uB300\uC0C1 tip\uC744 \uD655\uC815\uD558\uC9C0 \uBABB\uD568",remote_history_not_monotonic:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uC640 \uC6D0\uACA9 \uC774\uB825\uC774 \uAC08\uB77C\uC9D0"},rk=new Set(["queued","running","retry_pending"]);function p_(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),o=e.onOpenScript;function i(){return t&&t.get()||{}}function s(){let F=i();return typeof F.revision=="number"?F.revision:0}function l(F){t&&F&&F.queue&&typeof F.queue=="object"&&t.set(F.queue)}function a(){let F=i().workspace_info;return F&&typeof F=="object"?F:{}}function u(F,H){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${F}"
      >${H}</span
    >`}function d(F){if(typeof F!="number"||!Number.isFinite(F))return"";let H=F/6e4;return Number.isInteger(H)?`timeout ${H}\uBD84`:`timeout ${Math.round(F/1e3)}\uCD08`}function f(F){let H=d(F);return H?u("config",H):""}function m(F,H,G){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${G.script}
      @click=${ee=>{o&&o({lane:F,base_sha:H.base_sha,path:G.script,base_ref:H.base_ref},ee.currentTarget)}}
    ></button>`}function _(){let F=i().repo_operations;return Array.isArray(F)?F:[]}function w(){let F=a().repo_ops,H=F&&typeof F=="object"?F.repo_id:null;return typeof H=="string"&&H?H:null}function R(){return _().some(F=>F&&F.kind==="deploy"&&rk.has(F.state))}function I(){let F=R(),H=w()===null;return c`<button
      type="button"
      class="worker-repo-ops__deploy-run"
      data-seam="repo-ops-deploy-run"
      ?disabled=${F||H}
      title=${F?"\uBC30\uD3EC \uC9C4\uD589 \uC911":H?"\uC800\uC7A5\uC18C\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC74C":"\uC6D0\uACA9 base tip\uC5D0\uC11C \uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uB97C 1\uD68C \uC2E4\uD589\uD569\uB2C8\uB2E4"}
      @click=${()=>{q()}}
    >
      배포 실행
    </button>`}function U(){let F=i().repo_ops_opt_out;return{verify:F?.verify===!0,deploy:F?.deploy===!0}}function ie(F,H){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!H}
        @change=${G=>{O(F,!G.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function z(F){let H=typeof F.base_sha=="string"?F.base_sha:"",G=`${F.source_path||"repo-ops/config.toml"} @ ${F.base_ref||"?"}${H?`@${H.slice(0,7)}`:""}`,ee=U(),ye=!!F.verify&&ee.verify,qe=!!F.deploy&&ee.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${G}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ye?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${F.verify?c`${m("verify",F,F.verify)}
              ${f(F.verify.timeout_ms)}
              ${ye?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ye?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":F.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${F.verify?ie("verify",ee.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${qe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${F.deploy?c`${m("deploy",F,F.deploy)}
              ${f(F.deploy.timeout_ms)}
              ${qe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):I()}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${qe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":F.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${F.deploy?ie("deploy",ee.deploy):""}
      </div>
    </section>`}function j(F){let H=F.repo_ops&&typeof F.repo_ops=="object"?F.repo_ops:null;return H&&(H.status==="resolved"||H.status==="absent")?z(H):H&&(H.status==="pending"||H.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
        <p class="worker-repo-ops__vd-title">
          저장소 작업 선언
          <span class="worker-repo-ops__vd-ro"
            >읽기 전용 — config에서 정의</span
          >
        </p>
        <div
          class="worker-repo-ops__vd-line worker-repo-ops__vd-absent"
          data-seam="repo-ops-status"
        >
          ${H.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${H.error_code?c` — <code>${H.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function O(F,H){if(!n)return;let G=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:H,expected_revision:s()});if(l(G),G&&G.conflict){let ee=await n("worker-repo-ops-opt-out-toggle",{kind:F,opted_out:H,expected_revision:s()});l(ee)}r()}async function q(){let F=w();if(!n||F===null)return;let H=await n("worker-repo-operation-deploy-run",{repo_id:F});if(l(H),!H||H.ok!==!0){let G=H&&typeof H.reason=="string"?H.reason:"",ee=Object.hasOwn(d_,G)?d_[G]:G||"\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";be(`\uBC30\uD3EC \uC2E4\uD589 \uAC70\uBD80 \u2014 ${ee}`,"error")}else be("\uBC30\uD3EC \uC2E4\uD589\uC744 \uC2DC\uC791\uD588\uC2B5\uB2C8\uB2E4","success");r()}let W={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",repair_session_dispatch:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC790\uB3D9 \uC2E4\uD589",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC"};function Y(F,H,G){return c`<div class="worker-repo-ops__policy-group" data-policy=${G}>
      <div class="worker-repo-ops__policy-label">${F}</div>
      <ul class="worker-repo-ops__policy-list">
        ${H.map(ee=>c`<li data-token=${ee}>
              ${W[ee]||ee}
            </li>`)}
      </ul>
    </div>`}function N(){let F=i(),H=F.repo_operation_policy&&typeof F.repo_operation_policy=="object"?F.repo_operation_policy:null;return H?c`<section
      class="worker-repo-ops__repair"
      data-seam="repo-ops-policy"
    >
      <details class="worker-repo-ops__policy" data-seam="policy-lists">
        <summary>
          Worker 자동 처리 기준
          <span class="worker-repo-ops__policy-count"
            >자동 ${(H.worker_automatic||[]).length} · 금지
            ${(H.never_automatic||[]).length}</span
          >
        </summary>
        ${H.supported===!1?c`<div
              class="worker-repo-ops__policy-group"
              data-policy="policy-schema"
            >
              ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uC7AC\uC2DC\uB3C4\uAC00 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${H.schema_version})`}
            </div>`:""}
        ${Y("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",H.worker_automatic||[],"worker-automatic")}
        ${Y("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",H.never_automatic||[],"never-automatic")}
      </details>
    </section>`:""}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언
        </summary>
        ${j(a())} ${N()}
      </details>`}}}var m_=20,ok=5,sk=new Set(["failed","running","queued","retry_pending"]),Yl={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC",job:"\uBA38\uC9C0 \uD6C4 \uC7A1"},f_={verify:"verify",deploy:"deploy",job:"deploy"};function ik(e){if(typeof e!="string")return"";let t=e.split("/").filter(n=>n.length>0);return t.length>0?t[t.length-1]:""}function ak(e){return!e||typeof e!="object"?"":e.kind==="job"?ik(e.script_path)||Yl.job:Object.hasOwn(Yl,e.kind)?Yl[e.kind]:e.kind}function lk(e,t,n=m_){let r=[];for(let o of Array.isArray(e)?e:[])!o||typeof o!="object"||r.push({type:"operation",id:o.operation_id,at:typeof o.finished_at=="number"?o.finished_at:typeof o.requested_at=="number"?o.requested_at:null,operation:o});for(let o of Array.isArray(t)?t:[])!o||typeof o!="object"||r.push({type:"cleanup",id:o.bead_id,at:typeof o.at=="number"?o.at:null,cleanup:o});return r.sort((o,i)=>o.at===null&&i.at===null?String(o.id||"").localeCompare(String(i.id||"")):o.at===null?1:i.at===null?-1:i.at-o.at),r.slice(0,Math.max(0,n))}function ck(e){if(e.type==="cleanup")return!0;let t=e.operation;return sk.has(t.state)&&!t.dismissed&&!t.superseded_by}function uk(e,t,n={}){let r=lk(e,t,1/0),o=n.expanded===!0?m_:ok,i=new Set(r.slice(0,o)),s=r.filter(l=>i.has(l)||ck(l));return{visible:s,hidden:r.length-s.length}}function __(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function dk(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function g_(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>{let r=n.copy===!0?Mr(n.value):n.value;return c`<div>
          <dt>${n.term}</dt>
          <dd>${r}</dd>
        </div>`})}
    </dl>
  </details>`}function h_(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function pk(e,t){if(!e||typeof e!="object")return;let n=t&&typeof t=="object"?t.kind:"";if(!Object.hasOwn(f_,n))return;let r=e[f_[n]],o=r&&typeof r=="object"?r.timeout_ms:void 0;return typeof o=="number"&&Number.isFinite(o)?o:void 0}function fk(e,t){let n=lf(e,t),r=cf(e);return!n&&!r?"":c`<p class="worker-ev__why">
    ${n?c`<span class="worker-ev__why-line">${n}</span>`:""}${r?c`<span class="worker-ev__why-line">${r}</span>`:""}
  </p>`}function _k(e){return e.state!=="failed"||e.superseded_by||e.dismissed?"":c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-repo-op__dismiss"
      data-operation-id=${e.operation_id}
      title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
    >
      기록 닫기
    </button>
  </div>`}function mk(e,t){let n=e.operation,r=n.state==="failed",o=n.failure?n.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${n.operation_id}
    data-state=${n.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?tn(e.at):""}
      >${ci(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${__(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what">${ak(n)}</span>
        <span class="worker-ev__meta"
          >${n.target_base}@${li(n.target_sha)}${typeof n.elapsed_ms=="number"?` \xB7 ${Nr(n.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${__(e)}"
          >${dk(e)}</span
        >
        ${n.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${n.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
        ${n.source==="manual"?c`<span
              class="worker-ev__st worker-ev__st--manual"
              title="사람이 배포 실행을 눌러 시작한 작업입니다"
              >수동</span
            >`:""}
      </div>
      ${r?h_(af(n.failure_kind,o)):""}
      ${fk(n,pk(t,n))}
      ${_k(n)}
      ${g_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?o:""},{term:"script",value:[n.script_path||"",n.script_blob_sha?`blob ${li(n.script_blob_sha)}`:"",Number.isInteger(n.exit_code)?`exit ${n.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:n.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:n.output_tail||""}])}
    </div>
  </li>`}function gk(e){let t=e.cleanup,n=jr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?tn(e.at):""}
      >${ci(e.at)||"\u2014"}</span
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
        ${gd(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${h_(wr(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재시도${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        <button
          type="button"
          class="worker-ev__btn worker-cleanup__resolve"
          data-bead-id=${t.bead_id}
          title="이 실패를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다"
        >
          세션에서 해결
        </button>
      </div>
      ${g_([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||"",copy:!0},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function hk(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?gk(r):mk(r,e.repo_ops))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function b_(e,t={}){let n=null;function r(){if(n===null){pt(c``,e);return}let s=uk(n.operations,n.cleanup_failures,{expanded:n.expanded});pt(hk({events:s.visible,hidden:s.hidden,expanded:n.expanded,repo:n.repo,repo_ops:n.repo_ops}),e)}e.addEventListener("click",s=>{let l=s.target;if(l?.closest?.('[data-seam="repo-ops-close"]')){i();return}l?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function o(s){n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:!1},r()}function i(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:o,close:i,isOpen:()=>n!==null,refresh(s){n&&(n={operations:s.operations,cleanup_failures:s.cleanup_failures,repo:s.repo||"",repo_ops:s.repo_ops||null,expanded:n.expanded},r())}}}var bk="session-preferred",yk=["external_roundtrip","user_feedback_loop"];function y_(e,t){if(!Uo(e).includes(bk)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&yk.includes(n)?n:""}var vk="spec-after-blocker";function v_(e,t){return Uo(e).includes(vk)&&Array.isArray(t)&&t.length>0}var kk=Bt("views:worker:adapter"),wk="tab:worker:ready",$k="tab:worker:blocked",xk="tab:worker:in-progress",Ak="tab:worker:resolved",Sk="tab:worker:closed",Ek="\u{1F512} blocked",Tk={revision:0,auto_advance:!1,auto_merge:!1,slots:Ai,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]},Ck=["claude_account","codex_account"],Rk=[...po,...Ck];function Ok(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Ik(e){let t=e&&typeof e=="object"?e.awaiting_user:void 0,n=typeof t=="string"?t.trim():"";return n.length>0?`${Xa}: ${n}`:Xa}function $r(e){return e&&typeof e=="object"?e:{}}function Lk(e){let t={};for(let n of Rk){let r=e[n];typeof r=="string"&&r.length>0&&(t[n]=r)}return t}function Pk(e){let t=new Map;for(let r of e){if(!r||typeof r.id!="string"||r.id.length===0)continue;let o=$r(r.metadata).carried_from;if(!(typeof o!="string"||o.length===0))for(let i of ys(r)){let s=t.get(i);s||(s=new Set,t.set(i,s)),s.add(r.id)}}let n=new Map;for(let[r,o]of t)n.set(r,[...o].sort());return n}function Dk(e){let t=e.replace(/\/+$/,""),n=t.lastIndexOf("/");return n>=0?t.slice(n+1):t}function k_(e={}){let{queueStore:t,issueStores:n,transport:r,getWorkspacePath:o,onInvalidate:i}=e,s=n?to(n):null,l=new Map,a={},u=null,d=0,f=null,m=!1;function _(){m||!i||i()}function w(q){return u===q?a:{}}async function R(){if(!r||m)return;let q=o?.()||"";if(u===q||f&&f.key===q&&f.generation===d)return;let W=++d;f={key:q,generation:W};let Y=null;try{Y=await Promise.resolve(r("get-session-defaults",{}))}catch(N){if(W!==d)return;f=null,kk("get-session-defaults failed: %o",N),_();return}W===d&&(a=Y&&typeof Y.values=="object"&&Y.values!==null?{...Y.values}:{},u=q,f=null,_())}function I(){u=null,d+=1,R()}function U(){for(let[q,W]of l)W==="failed"&&l.delete(q)}function ie(q,W){return s?s.selectBoardColumn(q,W):[]}function z(q,W,Y,N){let F=new Set(Y.map(B=>B.id)),H=new Set,G=new Map,ee=[];for(let B of[...W,...Y]){if(H.has(B.id)||Ok(B))continue;let Q=Wo(B,q);Q.location===null&&(H.add(B.id),G.set(B.id,Q),ee.push(B))}let ye=s_(ee,zr(N)),qe=$r(q.bead_scope);return ye.map(B=>{let Q=G.get(B.id),Ae=Jr(B),Se=Ae.evidence==="published",C=typeof B.workflow?.route=="string"&&B.workflow.route||(B.metadata&&typeof B.metadata.route=="string"?B.metadata.route:""),re=Q.worker_ineligible,ke=re||!Object.hasOwn(B,"labels")?"":y_(B.labels,B.metadata),ve=F.has(B.id),Me=ve?ys(B):[],he=[];ve&&Me.length===0&&he.push(Ek),Q.awaiting_user&&he.push(Ik(B.metadata)),Q.missing_description?he.push("missing_description"):Q.spec==="conflict"?he.push("spec_id_conflict"):Q.spec==="none"?he.push("spec \uC5C6\uC74C"):Q.spec==="draft"&&he.push("spec \uBBF8\uBC1C\uD589(draft)");let Le=qe[B.id];return{bead_id:B.id,title:B.title||B.id,route:C,spec_id:Ae.conflict?"":Ae.path,published:Se,blocked:ve,blocked_by:Me,labels:Array.isArray(B.labels)?B.labels:[],created_at:B.created_at,updated_at:B.updated_at,status:B.status,workflow:B.workflow||null,exec_pins:Lk($r(B.metadata)),rec:null,...Le&&Array.isArray(Le.scope)?{scope:Le.scope}:{},eligible:Q.placeable,route_ok:Q.route_ok,awaiting_user:Q.awaiting_user,missing_description:Q.missing_description,placement_spec:Q.spec,reason:he.join(" \xB7 "),worker_ineligible:re,session_preferred:ke.length>0,session_preferred_reason:ke,spec_after_blocker:v_(B.labels,Me),release_info:B.release_info,dependents_info:B.dependents_info}})}function j(q){let[W,Y,N,F,H]=q,G=Ms([...W,...Y,...N,...F,...H]),ee=Pk([...W,...Y,...N,...F]),ye={},qe=(B,Q)=>{if(!B||typeof B.id!="string"||B.id.length===0)return;let Ae=ye[B.id]||(ye[B.id]={});if(typeof B.priority=="number"&&!("priority"in Ae)&&(Ae.priority=B.priority),typeof B.from_id=="string"&&!("from_id"in Ae)&&(Ae.from_id=B.from_id),Q&&!("metadata"in Ae)){Ae.metadata=$r(B.metadata);let Se=$r(B.workflow).route;typeof Se=="string"&&Se.length>0&&(Ae.route=Se)}};for(let B of[...W,...Y,...N])qe(B,!0);for(let B of[...F,...H])qe(B,!1);for(let B of new Set([...Object.keys(ye),...G.keys()])){let Q=qs(G,B);if(Q.total>0){let Ae=ye[B]||(ye[B]={});Ae.rollup=Q}}for(let[B,Q]of ee){let Ae=ye[B]||(ye[B]={});Ae.carried_to=Q}return ye}function O(q,W,Y,N){let F=new Set((Array.isArray(q.done)?q.done:[]).map(G=>G?.bead_id).filter(G=>typeof G=="string")),H=[];for(let G of W){let ee=ur(G.closed_at);if(typeof G.id!="string"||F.has(G.id)||ee===null||N!==void 0&&ee<N||typeof G.comment_count!="number"||G.comment_count<=0)continue;let ye=`${Y}\0${G.id}\0${String(G.updated_at)}\0${G.comment_count}`,qe=l.get(ye);if(qe===void 0&&r&&(l.set(ye,"pending"),Promise.resolve(r("get-comments",{id:G.id})).then(Q=>{let Ae=Array.isArray(Q)&&Q.some(Se=>Ui(typeof Se?.text=="string"?Se.text:"")?.lane==="session");l.set(ye,Ae?"session":"not-session"),_()}).catch(()=>{l.set(ye,"failed"),_()})),qe!=="session")continue;let B=ur(G.started_at);H.push({id:G.id,title:G.title||G.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:B!==null&&ee>=B?ee-B:null,work_kind:"session",done_at:ee,created_at:G.created_at,updated_at:G.updated_at})}return H}return{read(q){if(!t)return{workspaces:[],workspaces_state:[]};let W=t.get()||Tk,Y=o?.()||"",N=q&&typeof q.done_since=="number"?q.done_since:void 0,F=ie(wk,"ready"),H=ie($k,"blocked"),G=ie(xk,"in_progress"),ee=ie(Ak,"resolved"),ye=ie(Sk,"closed");return{workspaces:[{...W,bead_titles:{...$r(W.bead_titles),...Object.fromEntries([...F,...H].filter(qe=>qe&&typeof qe.id=="string").map(qe=>[qe.id,qe.title||qe.id]))},root_dir:Y,name:Dk(Y),runnable:z(W,F,H,q?q.candidate_sort:void 0),session_done:O(W,ye,Y,N),bead_overlay:j([F,H,G,ee,ye])}],workspaces_state:[{root_dir:Y,revision:W.revision,auto_advance:W.auto_advance,auto_merge:W.auto_merge,slots:typeof $r(W.workspace_info).slots=="number"?$r(W.workspace_info).slots:W.slots,runner_catalog:W.runner_catalog,execution_defaults:W.execution_defaults,session_defaults:w(Y),orchestration_model:W.orchestration_model,orchestration_effort:W.orchestration_effort,orchestration_speed:W.orchestration_speed,quick_fix_orchestration_model:W.quick_fix_orchestration_model,quick_fix_orchestration_effort:W.quick_fix_orchestration_effort,quick_fix_orchestration_speed:W.quick_fix_orchestration_speed,issue_prefix:""}]}},ensureSessionDefaults(){R()},refreshSessionDefaults:I,notifyIssuesChanged:U,destroy(){m=!0,d+=1,f=null,l.clear()}}}var oa=1,w_=5,Mk={root_dir:"",name:"",auto_advance:!1,auto_merge:!1,slots:oa,revision:0,runner_catalog:{},items:[],sublanes:{parallel:[],serial:[]},serial_lane_count:0,raw_queue_length:0,live_count:0,over_cap:!1,merge:{positions:new Map,resolutions:new Map,continuations:new Map,authorities:new Map,state:{active:null,failures:{},waiting:null},auto_excluded:[],running:!1},token_total:null,cleanup_failures:[],declared_base:null,repo_operations:[]};function Lt(e){return e&&typeof e=="object"?e:{}}var A_="beads-ui.worker.candidate-filter",Vl={show_blocked:!1,readiness:"all"};function qk(){try{let e=window.localStorage.getItem(A_);if(!e)return{...Vl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Vl};let n=t.readiness;return{show_blocked:t.show_blocked===!0,readiness:n==="ready"||n==="not_ready"?n:"all"}}catch{return{...Vl}}}function Nk(e){try{window.localStorage.setItem(A_,JSON.stringify(e))}catch{}}var S_="bdui.worker.done-range";function jk(){try{let e=window.localStorage.getItem(S_);return e===null?"today":zn(e)}catch{return"today"}}function Fk(e){try{window.localStorage.setItem(S_,e)}catch{}}function $_(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Bk(e){return e==="receipt_not_current"?"\uB9AC\uBDF0 \uD6C4\uC5D0\uB3C4 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC74C":e==="cancelled"?"\uB9AC\uBDF0 \uC138\uC158 \uCDE8\uC18C\uB428":e.startsWith("launch_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uC2DC\uC791 \uC2E4\uD328(${e.slice(14)})`:e.startsWith("session_failed:")?`\uB9AC\uBDF0 \uC138\uC158 \uBE44\uC815\uC0C1 \uC885\uB8CC(${e.slice(15)})`:`\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD328(${e})`}function x_(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_rebase_cap":return"\uD050 \uC7AC\uCDA9\uB3CC 3\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"worktree_restore_branch_mismatch":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uBE0C\uB79C\uCE58 \uC774\uB984 \uBD88\uC77C\uCE58";case"worktree_restore_path_exists":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uACBD\uB85C \uC774\uBBF8 \uC788\uC74C";case"worktree_restore_branch_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 origin\uC5D0 \uBE0C\uB79C\uCE58 \uC5C6\uC74C";case"worktree_restore_branch_diverged":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328 \u2014 \uB85C\uCEEC \uBE0C\uB79C\uCE58\uAC00 origin\uACFC \uB2E4\uB984";case"worktree_restore_failed":return"\uC6CC\uD06C\uD2B8\uB9AC \uBCF5\uC6D0 \uC2E4\uD328";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Uk(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Wk(e){switch(e){case"no_terminal_failure":return"\uC774 \uD589\uC5D0 \uC774\uC5B4\uBC1B\uC744 terminal \uC2E4\uD328 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";case"tmux_unavailable":return"tmux\uC5D0 \uB2FF\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4";case"launch_failed:claude_not_found":return"claude \uC2E4\uD589 \uD30C\uC77C\uC744 PATH\uC5D0\uC11C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_session":return"tmux \uC138\uC158\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:new_window":return"tmux \uCC3D\uC744 \uB9CC\uB4E4\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";case"launch_failed:exited":return"\uB744\uC6B4 \uC138\uC158\uC774 \uACE7\uBC14\uB85C \uC885\uB8CC\uB410\uC2B5\uB2C8\uB2E4";case"error":return"\uC138\uC158 \uAE30\uB3D9 \uC911 \uC624\uB958\uAC00 \uB0AC\uC2B5\uB2C8\uB2E4";default:return typeof e=="string"&&e.length>0?e:"\uC138\uC158\uC744 \uB744\uC6B0\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}}function zk(e){switch(e){case"no_session_ref":return"\uAE30\uB85D\uB41C \uC138\uC158 \uC5C6\uC74C";case"unsafe_session_id":return"\uC138\uC158 ID\uB97C \uC778\uC790\uB85C \uC4F8 \uC218 \uC5C6\uC74C";case"provider_mismatch":return"\uAE30\uB85D\uB41C \uC138\uC158\uC774 claude\uAC00 \uC544\uB2D8";case"not_local":return"\uAE30\uB85D\uB41C \uC138\uC158\uC758 transcript\uAC00 \uC774 \uAE30\uAE30\uC5D0 \uC5C6\uC74C";case"bd_unavailable":return"Bead \uBA54\uD0C0\uB370\uC774\uD130\uB97C \uC77D\uC9C0 \uBABB\uD568";default:return typeof e=="string"&&e.length>0?e:"\uC0AC\uC720 \uBBF8\uC0C1"}}function Hk(e){if(!e||typeof e!="object")return"\uC138\uC158 \uAE30\uB3D9 \uC751\uB2F5\uC744 \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4";if(e.conflict===!0)return"\uD050\uAC00 \uBC14\uB00C\uC5B4 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694";if(e.session==="already_running")return"\uC774\uBBF8 \uC774 \uC774\uC288\uC758 \uD574\uACB0 \uC138\uC158\uC774 \uC5F4\uB824 \uC788\uC2B5\uB2C8\uB2E4";if(e.launched!==!0)return`\uC138\uC158\uC5D0\uC11C \uD574\uACB0 \uAC70\uBD80: ${Wk(e.reason)}`;let t=e.bridge_active===!0?"":" (Discord \uC911\uACC4 \uBE44\uD65C\uC131 \u2014 tmux\uC5D0\uC11C \uB2F5\uD558\uC138\uC694)";return e.mode==="fork"?`\uAE30\uB85D\uB41C \uC138\uC158\uC744 fork\uD574 \uB744\uC6E0\uC2B5\uB2C8\uB2E4${t}`:`\uC0C8 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 ${zk(e.fallback_reason)}${t}`}function Kk(e){return e&&e.launched===!0?"success":"error"}function Gk(e){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let t=e.slice(19);if(t.length===0)return null;switch(t){case"gating":return"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Yk(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}var Vk=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),Qk=new Set(["waiting_metadata","reviewing","retrying"]),Ql=new Set(["review_receipt_missing","review_receipt_stale","review_receipt_invalid","review_receipt_undetermined"]);function Xk(e){let t=e&&typeof e=="object"?e.auto_resolution:null,n=t&&typeof t=="object"&&!Array.isArray(t)?t:null;if(!n||!e)return null;let r=typeof n.origin_reason=="string"&&n.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${n.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[r,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"retrying":{let o=Number.isInteger(n.attempts)?Math.max(0,Number(n.attempts)):0,i=Number.isInteger(n.attempt_cap)&&Number(n.attempt_cap)>0?Number(n.attempt_cap):0,s=typeof n.next_at=="number"?tn(n.next_at):"",l=typeof n.last_error=="string"&&n.last_error.length>0?n.last_error:"";return{label:i>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,i)}/${i}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[r,s?`\uB2E4\uC74C \uC2DC\uAC01 ${s}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Zk(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Jk(e,t=null){if(!e||typeof e!="object")return null;let n="";switch(e.phase){case"gating":n="\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"merging":n="\uBA38\uC9C0 \uC911";break;case"cleaning":n="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;n=t.label;break;case"paused":n="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":n="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let r=[n];e.head_sha&&r.push(`head ${e.head_sha}`),e.base_sha&&r.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&r.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let o=Zk(e.terminal_reason);o&&r.push(`\uC6D0 \uC0AC\uC720: ${o}`);let i=e.phase==="needs_human"&&!o?Wr(e.terminal_reason):null;i&&r.push(e.failure_stage?`${e.failure_stage} \xB7 ${i}`:i);for(let s of t?t.details:[])r.push(s);return e.active_attempt_id&&r.push(`attempt ${e.active_attempt_id}`),e.evidence&&r.push(e.evidence),e.log_path&&r.push(e.log_path),{badge:n,title:r.join(`
`),alert:e.phase==="needs_human",lock_actions:!Vk.has(e.phase)}}function ew(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function tw(e){if(!e||typeof e!="object")return[];let t=e.badge_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function nw(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(i,s={})=>{let l=[s.title||"",t].filter(Boolean);return{label:i,title:l.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});let r=ew(e.receipt_check),o=e.conflicting||e.gate?.reason==="base_behind"||r.length>0;if(e.auto_pending&&o)return n("\uD655\uC778 \uC911",{title:"\uBA38\uC9C0 \uD050\uAC00 \uC790\uB3D9\uC73C\uB85C \uCC98\uB9AC \uC911 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(Ql.has(e.gate?.reason)){let i=e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uC785\uB2C8\uB2E4. [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":e.gate.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC758 ancestry probe\uB97C \uC644\uB8CC\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 [\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0]\uAC00 \uC774 \uBCF4\uB958\uC758 \uCD9C\uAD6C\uC785\uB2C8\uB2E4";if(e.review_session?.active===!0)return n(e.review_session.origin==="auto"?"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911":"\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911",{title:`${i}
\uB9AC\uBDF0 \uC138\uC158\uC774 \uC2E4\uD589 \uC911\uC785\uB2C8\uB2E4 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4`,live:!0});if(e.auto_review_wait==="slot")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 \uB9AC\uBDF0 \uC138\uC158 \uC2AC\uB86F \uB300\uAE30",{title:`${i}
\uC2E4\uD589 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uC790\uB3D9\uC73C\uB85C \uB9AC\uBDF0 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4. \uC9C0\uAE08 \uD074\uB9AD\uD558\uBA74 \uC989\uC2DC \uB744\uC6C1\uB2C8\uB2E4`,live:!0});if(e.review_session?.failure){let s=e.review_dispatch?.state==="exhausted"&&e.review_session.origin==="auto";return n(`\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694 \xB7 ${s?"\uC790\uB3D9 \uB9AC\uBDF0 1\uD68C \uC18C\uC9C4 \xB7 ":""}${Bk(e.review_session.failure)}`,{title:`${i}
\uC9C1\uC804 \uB9AC\uBDF0 \uC138\uC158 \uC885\uB8CC \uC0AC\uC720: ${e.review_session.failure}`,alert:!0})}return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:i,alert:!0})}return e.gate?.reason==="spec_id_missing"?n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):r.length>0?n(`\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694 \xB7 ${r[0]}`,{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${r.join(", ")}`,alert:!0}):e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${x_(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${x_(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function rw(e,t,n,r,o=null,i=null,s=null,l=!1,a=null,u=!0,d=null,f=null,m=null,_={},w=!1,R={},I=null,U={active:!1,failure:null,origin:null},ie=!1){let z=!!a&&a.position>0,j=!!a?.continuation_action&&a.continuation_action.continuation===null,O=!!a&&a.active===!0,q=a&&a.failure||null,W=Gk(a?a.waiting:null),Y=n[e]||null,N=Y&&Y.gate?Y.gate:null,F=Y&&Y.pr?Y.pr:null,H=Yk(a?a.resolution:null),G=Xk(m),ee=Jk(m,G),ye=a&&a.authority||null,qe=a&&a.review_dispatch||null,B=a?.hold?.auto_review_wait==="slot"?"slot":null,Q=!!m&&typeof m=="object"&&Qk.has(m.phase),Ae=z&&!O&&(!ye||Q||ye.source==="automatic"&&!w),Se=s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":H?H.badge:s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,C=!!N&&N.base_badge==="\uCDA9\uB3CC",re=!!N&&N.enabled===!0,ke=Qo({bead_id:e,merge_sha:R.merge_sha,cleanup_cursor:R.cleanup_cursor,merge_progress:i&&i.merge_progress?i.merge_progress:null,cleanup_failed:r,repo_operations:R.repo_operations}),ve=$i(ke),Me=i&&!ke&&(i.queueing??null)?i.queueing:null,he=!!r&&["repo_operations","post_merge_jobs","child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!N&&N.tier==="merged",Le=r&&r.step==="repo_operations"&&ke?.failed===!0&&(ke.step==="deploy"||ke.step==="verify")?ke.step:null,Je=l&&!!r&&!!N&&N.tier==="merged",lt=Ae&&(re||C||N?.reason==="base_behind"||Ql.has(N?.reason)||he||Je),P=Ql.has(N?.reason),ce=l&&C&&u===!1,se=rr(_,e,{external:l,merge_active:O||ke?.step==="merge",merge_queued:z,conflict_active:!!s,cleanup_active:ve,merged:!!r||N?.tier==="merged"}),de=!!se.operation,Ee=!!r||m?.phase==="needs_human"||!!se.error,_e=z&&!q&&!j&&!he&&!(ee&&ee.lock_actions),De=nw({auto_pending:_e,continuation_required:j,queueing:Me,merge_step:ke,conflict_badge:Se,conflict_live:H?.live===!0||s==="running",auto_resolution:G,recovery:ee,cleanup_failed:r,cleanup_label:r?jr(r.step):null,base_exception:f,conflicting:C,gate:N,receipt_check:Y&&Y.receipt_check?Y.receipt_check:null,queue_failure:q,auto_skip:d,queued:z,queue_active:O,queue_position:a?a.position:0,review_session:U,review_dispatch:qe,auto_review_wait:B,activity:Se?null:i&&i.activity||null}),Ue=De?.live===!0&&De.title?c`<span title=${De.title}>${De.label}</span>`:De?.label||null,Qe=tw(Y&&Y.receipt_check?Y.receipt_check:null);return{id:e,title:l?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ke?.active!==!0?wi(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",...I?{dependency_chips:I}:{},external:l,pr_number:F&&typeof F.number=="number"?F.number:null,pr_url:F&&typeof F.url=="string"?F.url:"",completion_badge:De?.live!==!0&&De?.title?De.label:null,completion_title:De?.title||"",...m?.phase==="needs_human"&&typeof m.log_path=="string"&&m.log_path.length>0?{log_path:m.log_path}:{},...Qe.length>0?{receipt_badge:{codes:Qe}}:{},badges:Ue?[Ue]:[],live_badge:De?.live===!0?Ue:null,usage:o,alert:De?.alert===!0,merge_action:N?.tier==="merged"&&!he&&!Je?!1:!z||j||Ae||P,cancel_action:z&&!j,cancel_enabled:!O&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:O?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:se,discard_action:se.action,resolve_action:Ee,resolve_enabled:!ie,resolve_title:ie?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC774 \uC2E4\uD328\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4",merge_step:ke,discard_enabled:se.enabled,discard_title:se.title,merge_enabled:!ke&&!Me&&!s&&!de&&!f&&!(ee&&ee.lock_actions)&&!ce&&U.active!==!0&&(re||C||N?.reason==="base_behind"||P||he||Je||lt||Q&&!O),merge_label:j?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Je?Le==="deploy"?"\uBC30\uD3EC \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":Le==="verify"?"\uAC80\uC99D \uC7AC\uC2DC\uB3C4 \uD6C4 \uC815\uB9AC":"\uC815\uB9AC \uC7AC\uC2DC\uB3C4":C&&!ke&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":N?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":P?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Ae?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:de?se.error?`\uD3D0\uAE30 \uC2E4\uD328: ${se.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${se.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:j?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Me?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ke?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ke.label}`:Le?`\uBA38\uC9C0 \uC644\uB8CC \u2014 ${Le==="deploy"?"\uBC30\uD3EC":"\uAC80\uC99D"} \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD574 \uC815\uB9AC\uAC00 \uBA48\uCDC4\uC2B5\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uC800\uC7A5\uC18C \uC791\uC5C5\uBD80\uD130 \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4`:Je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":ce?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":s==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":s==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC2DC\uB3C4\uD569\uB2C8\uB2E4":C?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":U.active===!0?U.origin==="auto"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uB05D\uB098\uBA74 \uC601\uC218\uC99D\uC744 \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uB9AC\uBDF0\uB9CC \uC218\uD589\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_invalid"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uAE30\uB85D\uC774 \uC131\uB9BD\uD558\uC9C0 \uC54A\uC74C \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC601\uC218\uC99D\uC774 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D ancestry probe \uBBF8\uC644\uB8CC \u2014 \uBA38\uC9C0 \uAC8C\uC774\uD2B8 \uBCF4\uB958\uC785\uB2C8\uB2E4. \uD074\uB9AD\uD558\uBA74 \uAE30\uB85D\uB41C \uC138\uC158\uC744 \uC774\uC5B4 \uCD5C\uC885 head\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uC2DC\uD0A4\uACE0, \uC0C8 \uC601\uC218\uC99D\uC774 \uCD5C\uC885 head\uC5D0 \uC720\uD6A8\uD574\uC9C0\uBA74 \uD050\uAC00 \uBA38\uC9C0\uD569\uB2C8\uB2E4":N?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":re?`\uBA38\uC9C0 (${N.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:N&&N.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${N&&N.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Xl(e,t={}){let{transport:n,issueStores:r,queueStore:o,sessionLogStore:i,gotoIssue:s,getWorkspacePath:l,switchWorkspace:a,openDoc:u,doneRange:d,onDoneRangeChange:f}=t,m=r?to(r):null,_=qk(),w=null,R=null,I=null,U=null,ie=lo(()=>x()),z=new Map,j=new Map,O=n_(),q=Kl(O)===null,W=d?zn(d):jk();function Y(){let b=Vr.find(h=>h.value===W);return b?b.label:"\uC624\uB298"}let N=Vi("beads-ui.worker.lane-collapsed"),F=!1,H="";function G(){return H.trim().length>0}function ee(b){return G()?b.filter(h=>h.search_match===!0).length:void 0}let ye=new Set,qe=new Set,B=new Set;function Q(b,h){return!h?.error||!b?{}:{resolve_action:!0,resolve_enabled:!B.has(b),resolve_title:B.has(b)?"\uC138\uC158 \uAE30\uB3D9 \uC694\uCCAD \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":"\uC2E4\uD328\uD55C \uD3D0\uAE30\uB97C \uC0AC\uB78C\uC774 \uC774\uC5B4\uBC1B\uB294 \uB300\uD654\uD615 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 \u2014 \uAE30\uB85D\uB41C \uC138\uC158\uC774 \uC788\uC73C\uBA74 fork\uD558\uACE0, \uC5C6\uC73C\uBA74 \uC0C8 \uC138\uC158\uC5D0 \uC0AC\uC720\uB97C \uC2E3\uC2B5\uB2C8\uB2E4"}}let Ae=new Set,Se=new Set,C=new Set,re=null,ke=[],ve=k_({queueStore:o,issueStores:r,transport:n,getWorkspacePath:l,onInvalidate:()=>x()});function Me(){ve.refreshSessionDefaults()}let he=document.createElement("div");he.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let Je=document.createElement("div");Je.className="worker-drawer-overlay",Je.hidden=!0;let lt=document.createElement("div");lt.className="worker-drawer-overlay__backdrop";let P=document.createElement("div");P.className="worker-drawer-host";let ce=document.createElement("div");ce.className="worker-drawer-host",ce.hidden=!0,Je.append(lt,P,ce);let se=document.createElement("div");se.className="worker-lanes-host",he.append(Le,Je,se),e.appendChild(he);let de=yr(null,null),Ee=[],_e=Xi({transport:n,console_el:he,getLanes:()=>de,getWorkspaces:()=>Ee,getCrossLanes:()=>null,reproject:()=>({lanes:Ut(),raw_lanes:null}),onCorrection:()=>{},showToast:be,requestRender:()=>x(),adoptQueue:(b,h)=>{o&&o.set(h)},onDragBegin:()=>{w=null}}),De=null,Ue=$o(P,{transport:n,sessionLogStore:i,onClose:()=>{De=null,Je.hidden=!0,x()}}),Qe=b_(ce,{onClose:()=>{ce.hidden=!0,Je.hidden=!0,x()}}),Fe=u_({getWorkspacePath:l||(()=>"")}),te=l&&l()||"",V=p_({queueStore:o,transport:n,onChanged:()=>x(),onOpenScript:(b,h)=>{Fe.open(b,h)}});function $e(){return o&&o.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:oa,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function _t(b){for(let h of Object.values(Lt($e().provider_hold)))for(let T of Array.isArray(h?.targets)?h.targets:[])if(Array.isArray(T?.attempt_ids)&&T.attempt_ids.includes(b))return T;return null}function ct(b){if(b?.status!=="ok")return{eligible:!1,reason:`\uACC4\uC815 \uC0C1\uD0DC ${String(b?.status||"\uBBF8\uC0C1")}`};let h=Array.isArray(b.windows)?b.windows:[],T=h.find(le=>le?.key==="5h"),oe=h.find(le=>le?.key==="7d");if(!T||typeof T.pct!="number")return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(T.pct>80)return{eligible:!1,reason:"5\uC2DC\uAC04 \uC0AC\uC6A9\uB7C9 80% \uCD08\uACFC"};if(oe){if(typeof oe.pct!="number")return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 \uBBF8\uAD00\uCE21"};if(oe.pct>90)return{eligible:!1,reason:"7\uC77C \uC0AC\uC6A9\uB7C9 90% \uCD08\uACFC"}}return{eligible:!0,reason:""}}function Ke(b){let h=Lt($e().attempts)[b];if(!h)return;let T=Lt($e().runner_catalog),oe=Lt(T.runners),le=typeof h.runner=="string"&&oe[h.runner]?h.runner:Object.keys(oe)[0]||"",Ie=Lt(oe[le]),He=Lt(Ie.models),Et=typeof h.model=="string"&&He[h.model]?h.model:typeof Ie.default_model=="string"?Ie.default_model:Object.keys(He)[0]||"",Vt=_t(b),it=typeof h.claude_account=="string"?h.claude_account:typeof Vt?.account=="string"?Vt.account:"";U={attempt_id:b,original_runner:le,runner:le,model:Et,account:it,fresh_current:!1},x()}function $(){U=null,x()}function Z(){let b=U;if(!b||!b.runner||!b.model||b.runner==="claude"&&!b.account)return;let h={runner:b.runner,model:b.model};b.runner==="claude"&&b.account&&(h.claude_account=b.account);let T=b.fresh_current||b.runner!==b.original_runner;U=null,x(),St(b.attempt_id,"session",{exec_override:h,...T?{continuation:"fresh_current",decision_token:{}}:{}})}function Re(){let b=U;if(!b)return"";let h=Lt(Lt($e().runner_catalog).runners),T=Array.isArray(Lt($e().account_catalog).claude)?Lt($e().account_catalog).claude:[],oe=b.runner!==b.original_runner;return c`<dialog
      class="op-dialog provider-resume-dialog"
      aria-label="다른 방법으로 이어하기"
    >
      <h2>다른 방법으로 이어하기</h2>
      <div class="provider-resume-dialog__fields">
        <label>
          러너
          <select class="provider-resume-dialog__runner">
            ${Object.keys(h).map(le=>c`<option
                  value=${le}
                  ?selected=${le===b.runner}
                >
                  ${le}
                </option>`)}
          </select>
        </label>
        <label>
          모델
          <select class="provider-resume-dialog__model">
            ${Object.entries(h).map(([le,Ie])=>c`<optgroup label=${le}>
                  ${Object.keys(Lt(Ie?.models)).map(He=>c`<option
                        value=${JSON.stringify([le,He])}
                        ?selected=${le===b.runner&&He===b.model}
                      >
                        ${He}
                      </option>`)}
                </optgroup>`)}
          </select>
        </label>
        ${b.runner==="claude"?c`<label>
              계정
              <select class="provider-resume-dialog__account">
                ${b.account?"":c`<option value="" selected>계정 선택</option>`}
                ${b.account&&!T.some(le=>le?.email===b.account)?c`<option value=${b.account} selected>
                      ${b.account} (목록에 없음)
                    </option>`:""}
                ${T.map(le=>{let Ie=ct(le),He=le.alias||le.email;return c`<option
                    value=${le.email}
                    ?selected=${le.email===b.account}
                    ?disabled=${!Ie.eligible}
                    title=${Ie.reason}
                  >
                    ${He}${Ie.reason?` \u2014 ${Ie.reason}`:""}
                  </option>`})}
              </select>
            </label>`:""}
        <label class="provider-resume-dialog__fresh">
          <input
            type="checkbox"
            class="provider-resume-dialog__fresh-input"
            .checked=${b.fresh_current}
          />
          새 세션으로
        </label>
      </div>
      ${oe||b.fresh_current?c`<p class="provider-resume-dialog__notice">
            이전 세션 맥락을 요약 인계합니다
          </p>`:""}
      <div class="op-dialog__actions provider-resume-dialog__actions">
        <button type="button" class="op-btn provider-resume-dialog__cancel">
          취소
        </button>
        <button
          type="button"
          class="op-btn op-btn--primary provider-resume-dialog__confirm"
          ?disabled=${b.runner==="claude"&&!b.account}
          title=${b.runner==="claude"&&!b.account?"\uACC4\uC815\uC744 \uBA3C\uC800 \uACE0\uB974\uC138\uC694":""}
        >
          이어하기
        </button>
      </div>
    </dialog>`}function je(b){if(!w||!b.some(T=>T.id===w))return null;let h=zo($e());return h?{bead_id:w,lanes:h}:null}function Xe(){return l&&l()||""}async function Ze(b,h){await _e.sendOp({type:"worker-queue-place",payload:{bead_id:b,...h==="parallel"?{}:{lane:h}},root_dir:Xe()},b)}function We(){let b=$e();return typeof b.revision=="number"?b.revision:0}function dt(b){b&&b.queue&&o&&o.set(b.queue)}async function Gt(b){if(!n||!b)return;let h=await n("worker-attempt-pause",{attempt_id:b});h&&h.paused===!1&&h.reason&&be(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${h.reason}`,"error",2400)}async function St(b,h="session",T={}){if(!n||!b)return;let oe=n,le=$e().attempts?.[b]||null;await oo({context:{bead_id:le?.bead_id||"",kind:h,tuple:le?Sn(le):""},transport:Ie=>oe("worker-attempt-resume",{attempt_id:b,expected_revision:We(),...T,...Ie}),adopt:dt})}async function kt(b,h,T=!0){if(!n)return null;let oe=n,le=await oe(b,{...h,expected_revision:We()});return dt(le),le&&le.conflict&&T&&(le=await oe(b,{...h,expected_revision:We()}),dt(le)),le}async function wt(b){if(!n||!b)return;let h=$e().merge_queue?.find(oe=>oe.bead_id===b)?.continuation_action;if(h?.mismatch&&h.continuation===null){await Ge(b,h.mismatch);return}ye.add(b),x();let T;try{T=await kt("worker-merge-queue-add",{bead_id:b})}catch{be("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{ye.delete(b),x()}if(!(!T||T.applied)){if(T.conflict){be("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}be(Uk(T.reason),"error",2400)}}async function Ft(b){if(!(!n||!b||qe.has(b))){qe.add(b),x();try{let h=await n("worker-cleanup-retry",{bead_id:b,expected_revision:We()});dt(h),h&&!h.retried&&!h.conflict&&h.reason&&be(`\uC815\uB9AC \uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${h.reason}`,"error",2400)}finally{qe.delete(b),x()}}}async function Pt(b){if(!(!n||!b||B.has(b))){B.add(b),x();try{let h=await n("worker-resolve-in-session",{bead_id:b,expected_revision:We()});dt(h),be(Hk(h),Kk(h),4e3)}finally{B.delete(b),x()}}}async function ae(b,h){let T=$e().hold;if(!n||!T||typeof T.since!="number")return;let oe=await n(b,{since:T.since});dt(oe),oe&&oe.ok===!1&&be(`${h}: ${oe.reason==="hold_changed"?"\uD050 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694":oe.reason||""}`,"error",2800)}async function me(b,h){if(!n||!b||!h)return;let T=await n("worker-parked-retry",{bead_id:b,attempt_id:h});dt(T),T&&T.ok===!1&&be(`\uC7AC\uC2DC\uB3C4 \uAC70\uBD80: ${T.reason==="not_latest"?"\uC774 bead\uC5D0 \uB354 \uC0C8\uB85C\uC6B4 \uC2DC\uB3C4\uAC00 \uC788\uC2B5\uB2C8\uB2E4":T.reason||""}`,"error",2800)}async function Ge(b,h){let T=await _r({continuation_mismatch:h},(le,Ie)=>kt("worker-merge-queue-add",{bead_id:b,continuation:le,decision_token:Ie},!1)),oe=T?.queue?.merge_queue?.find(le=>le.bead_id===b)?.continuation_action;if(T?.applied!==!0&&oe?.continuation===null&&oe.mismatch){await Ge(b,oe.mismatch);return}T&&T.applied===!1&&!T.conflict&&be("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function ut(b){if(!n)return;let h=await kt("worker-merge-auto-toggle",{on:b});!h||h.conflict||be(b?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",b?"success":"info",2400)}async function Oe(b){if(!n||!b)return;let h=await kt("worker-merge-queue-remove",{bead_id:b});h&&!h.conflict&&!h.applied&&h.reason==="merge_active"&&be("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function E(){await kt("worker-merge-queue-remove",{all:!0})}async function L(b,h=null,T="unmerged",oe=null){if(!n||!b)return;let le=Ko(b,T);if(!(!!oe||typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let He=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:We()});if(dt(He),He&&He.conflict&&(He=await n("worker-discard",{bead_id:b,...h?{attempt_id:h}:{},...oe?{operation_id:oe}:{},expected_revision:We()}),dt(He)),He&&He.discarded===!0){be(di(He),"success",5e3);return}if(He&&He.reason){be(`\uD3D0\uAE30 \uC2E4\uD328: ${He.reason}`,"error",2800);return}if(He&&He.accepted&&He.pending==="merged_revert"){be("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(He&&He.accepted&&!He.discarded){be(`\uD3D0\uAE30 \uC9C4\uD589: ${He.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}He&&!He.conflict&&be("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function J(b,h,T){if(!n||!b||!h||typeof globalThis.confirm=="function"&&!globalThis.confirm(Go(b,T)))return;let oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:We()});if(dt(oe),oe&&oe.conflict&&(oe=await n("worker-discard-abandon",{bead_id:b,operation_id:h,expected_revision:We()}),dt(oe)),oe&&oe.abandoned===!0){be(ui(T),"success",5e3);return}if(oe&&oe.reason){be(`\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: ${oe.reason}`,"error",2800);return}oe&&!oe.conflict&&be("\uD3D0\uAE30 \uD3EC\uAE30 \uAC70\uBD80: unknown","error",2800)}async function pe(b,h,T){if(!(!n||!h||!T||Se.has(h))){Se.add(h),x();try{let oe=await n(b,{bead_id:h,action_id:T,expected_revision:We()});dt(oe),oe?.conflict?be("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!oe?.ok&&oe?.reason&&be(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(oe.reason)}`,"error",2800)}finally{Se.delete(h),x()}}}async function fe(b,h){if(!n||!h||Ae.has(h))return;Ae.add(h),x();let T;try{let oe=async(le={})=>await n(b,{bead_id:h,expected_revision:We(),...le});T=await oe(),dt(T),T&&T.conflict&&(T=await n(b,{bead_id:h,expected_revision:We()}),dt(T)),b==="worker-revise-fix"&&(T=await _r(T,(le,Ie)=>oe({continuation:le,decision_token:Ie}),{onResult:dt,refresh:()=>oe()}))}finally{Ae.delete(h),x()}if(!(!T||T.conflict)){if(T.ok){be(b==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}be(`\uCC98\uBD84 \uAC70\uBD80: ${T.reason||""}`,"error",3e3)}}async function Pe(b){if(!n)return;let h=await n("worker-automation-toggle",{on:b,expected_revision:We()});dt(h),h&&h.conflict&&await n("worker-automation-toggle",{on:b,expected_revision:We()}).then(dt)}async function ht(b){if(!n||!b)return;let h=await n("worker-repo-operation-dismiss",{operation_id:b});dt(h),h&&h.ok===!1&&be(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${h.reason||""}`,"error",3e3)}async function $t(b){if(!n||!Number.isFinite(b))return;let h=Math.max(oa,Math.floor(b)),T=await n("worker-queue-set-slots",{slots:h,expected_revision:We()});dt(T),T&&T.conflict&&await n("worker-queue-set-slots",{slots:h,expected_revision:We()}).then(dt)}async function gt(b){if(!n||!Number.isInteger(b)||b<1||b>w_)return;let h=$e(),T=(Array.isArray(h.serial_lanes)?h.serial_lanes:[]).slice(b).reduce((Ie,He)=>Ie+(Array.isArray(He?.entries)?He.entries.length:0),0),oe=()=>({count:b,expected_revision:We()}),le=await n("worker-queue-set-serial-lane-count",oe());dt(le),le&&le.conflict&&(le=await n("worker-queue-set-serial-lane-count",oe()),dt(le)),le&&le.applied&&T>0&&be(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${T}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function Ut(){let b=Ir(W),h=ve.read({candidate_sort:O,done_since:b});return Ee=h.workspaces,de=yr(h.workspaces,h.workspaces_state,{done_since:b,candidate_filter:_,candidate_hidden_counts:"per_control",candidate_sort:"as_given",groups:"all",search:H}),de}function yt(b){return b.queue_groups[0]||Mk}function Rt(b){let h=b.dependency_chips||null,T={...h&&h.released?{released:h.released}:{},...h&&h.dependents?{dependents:h.dependents}:{}},oe=z.get(b.id),le=j.get(b.id)||null,Ie=oe&&oe.overlaps.length>0?oe.overlaps:null,He=!!oe&&oe.scope_missing;return!le&&!Ie&&!He&&Object.keys(T).length===0?null:{...T,...le?{predecessors:le}:{},...Ie?{overlaps:Ie}:{},...He?{scope_missing:!0}:{}}}function Ot(b){return{...b,workspace_name:"",done_layout:void 0,dependency_chips:Rt(b)||void 0,chip_popover:en(b)}}function en(b){return bi(b,h=>ie.isOpen({bead_id:b.id,chip_key:h}))}function Yt(){let b=$e(),h=new Map;for(let T of Object.values(Lt(b.lane_states))){let oe=Array.isArray(T?.corrections)?T.corrections:[];for(let le of oe)le&&typeof le.bead_id=="string"&&typeof le.after=="string"&&h.set(le.bead_id,le.after)}return{admission:Lt(b.admission),correction_after:h}}function Mt(b,h){let T=Ot(b),oe=ld(h.admission[b.id]||null,!!b.discard||Se.has(b.id)),le=h.correction_after.get(b.id);return{...T,draggable:T.draggable===!0&&!oe,stale_work:oe,reason:oe?"":T.reason,badges:le?[`\u{1F517} ${le} \uB4A4 (blocks \uC790\uB3D9)`,...T.badges||[]]:T.badges,revise_enabled:T.revise_enabled===!0&&!Ae.has(b.id)}}function xt(b){let h=Yt();return yt(b).sublanes.parallel.map(T=>Mt(T,h))}function Kt(b){let h=Yt();return yt(b).sublanes.serial.map(T=>{let oe=T.occupants.map(le=>({id:le.id,title:le.title,draggable:!1,lane:T.id,ghost:!0,badges:[le.badge],...typeof le.search_match=="boolean"?{search_match:le.search_match}:{}}));return{id:T.id,index:T.index+1,raw_length:T.raw_length,ghosts:oe,items:T.items.map(le=>Mt(le,h)),occupied:T.occupied_by.length>0,badge:T.occupants.length>0?T.occupants[0].badge:"\uB300\uAE30",cycle:T.cycle===!0}})}function nn(b){return b.runnable.map(h=>Ot(h))}function Wt(b){return b.done.map(h=>Ot(h))}function an(b){let h=b.running.filter(T=>T.non_occupying!==!0).map(T=>({...T,bead_id:T.id,attempt_id:T.attempt_id||"",paused:T.run_state==="paused",failed:T.run_state==="failed",parked:T.run_state==="parked",retry_wait:T.run_state==="retry_wait",waiting:T.run_state==="waiting",wait:T.wait||null,provider_hold:T.run_state==="provider_hold",hold:T.hold?{...T.hold,open:I===T.attempt_id}:null,status_label:T.run_state==="failed"?T.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328":T.run_state==="parked"?"\uC138\uC158 \uB300\uAE30":T.run_state==="retry_wait"?"\uC7AC\uC2DC\uB3C4 \uB300\uAE30":T.run_state==="waiting"?"\uC120\uD589 \uB300\uAE30":T.run_state==="provider_hold"?"\uACF5\uAE09\uC790 \uBCF4\uB958":void 0,can_pause:T.can_pause!==!1,workspace_name:"",dependency_chips:Rt(T)||void 0,chip_popover:en(T),rollup_expanded:C.has(T.id),failure:T.failure?{...T.failure,open:R===T.attempt_id}:null,...Q(T.id,T.discard)}));return[...h.filter(T=>T.failed===!0),...h.filter(T=>T.failed!==!0&&T.parked===!0),...h.filter(T=>T.failed!==!0&&T.parked!==!0)]}function Zt(b){return xe(b).map(h=>({...h,chip_popover:en(h)}))}function xe(b){if(re&&re.model===b)return re.rows;let h=$e(),T=yt(b),oe=Lt(h.attempts),le=Object.values(oe).filter(nr),Ie=new Map;for(let Ye of le)Ie.set(Ye.attempt_id,Ye);let He=new Map;for(let Ye of le)He.set(Ye.bead_id,Ye);let Et=new Map;for(let Ye of[...b.pr_wait,...b.running,...b.queue,...b.runnable,...b.done])Et.has(Ye.id)||Et.set(Ye.id,Ye);let Vt=Ye=>{let zt=null;for(let xn of le)!xn||xn.bead_id!==Ye||sl(xn,Ie)||(zt===null||(typeof xn.started_at=="number"?xn.started_at:0)>=(typeof zt.started_at=="number"?zt.started_at:0))&&(zt=xn);return zt&&typeof zt.target_base=="string"?zt.target_base:null},it=new Map;for(let Ye of b.running)Ye.run_state==="failed"||Ye.conflict_resolution!==!0||(Ye.run_state!=="paused"?it.set(Ye.id,"running"):it.has(Ye.id)||it.set(Ye.id,"paused"));let rn=Lt(h.auto_merge_skips),ln=new Set(T.merge.auto_excluded),Un=Lt(h.pr_observations),pn=Lt(h.pr_activity),un=Lt(h.cleanup_failed),Rn=Lt(h.discard_operations),Vn=Lt(h.bead_workflow),on=Lt(h.bead_titles),Qn=h.merge_queue_state||{active:null,failures:{}},cr=T.merge.state.waiting,On=new Map;for(let Ye of Array.isArray(h.merge_queue)?h.merge_queue:[])Ye&&typeof Ye=="object"&&Ye.bead_id&&On.set(Ye.bead_id,Ye);let Wn=(Array.isArray(h.pr_wait)?h.pr_wait:[]).map(Ye=>{let zt=Et.get(Ye.bead_id);return{...rw(Ye.bead_id,zt?.title||on[Ye.bead_id]||Ye.bead_id,Un,un[Ye.bead_id]||null,tr(oe,Ye.bead_id),pn[Ye.bead_id]||(ye.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:qe.has(Ye.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),it.get(Ye.bead_id)||null,Ye.external===!0,{position:T.merge.positions.get(Ye.bead_id)||0,active:Qn.active===Ye.bead_id,failure:Lt(Qn.failures)[Ye.bead_id]||null,waiting:cr&&cr.bead_id===Ye.bead_id?cr.reason:null,resolution:T.merge.resolutions.get(Ye.bead_id),continuation_action:T.merge.continuations.get(Ye.bead_id),authority:T.merge.authorities.get(Ye.bead_id)||null,hold:On.get(Ye.bead_id)?.hold||null,review_dispatch:On.get(Ye.bead_id)?.review_dispatch||null},Ye.wt_present!==!1,h.auto_merge===!0&&ln.has(Ye.bead_id)?rn[Ye.bead_id]?.reason||"":null,ol(T.declared_base,Vt(Ye.bead_id)),Lt(h.completion_status)[Ye.bead_id]||null,Rn,h.auto_merge===!0,{merge_sha:Ye.merge_sha,cleanup_cursor:Ye.cleanup_cursor,repo_operations:T.repo_operations},zt?Rt(zt):null,rd(oe,Ye.bead_id),B.has(Ye.bead_id)),...zt?.search_match===void 0?{}:{search_match:zt.search_match},workflow:Vn[Ye.bead_id]||null,priority:zt?.priority,from_id:zt?.from_id,...zt?.created_at===void 0?{}:{created_at:zt.created_at},...zt?.updated_at===void 0?{}:{updated_at:zt.updated_at}}});return re={model:b,rows:Wn},Wn}function A(b){let h=yt(b),T=[];for(let Ie of b.running)Ie.non_occupying!==!0&&T.push({id:Ie.id,title:Ie.title,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:Ie.serial_lane_id??null});for(let Ie of b.pr_wait)T.push({id:Ie.id,title:Ie.title,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null});for(let Ie of h.sublanes.serial)Ie.items.forEach((He,Et)=>{T.push({id:He.id,title:He.title,location_label:`${Ie.id} #${Et+1}`,kind:"serial",lane_id:Ie.id})});h.sublanes.parallel.forEach((Ie,He)=>{T.push({id:Ie.id,title:Ie.title,location_label:`#${He+1}`,kind:"parallel",lane_id:null})});for(let Ie of b.runnable)T.push({id:Ie.id,title:Ie.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null,queue_placeable:Ie.queue_placeable===!0});let oe=$e();z=i_(oe.bead_scope,T);let le=new Map;for(let Ie of[...b.running,...b.runnable])Array.isArray(Ie.blocked_by)&&Ie.blocked_by.length>0&&le.set(Ie.id,Ie.blocked_by);for(let[Ie,He]of Object.entries(Lt(oe.bead_blocked_by)))Array.isArray(He)&&le.set(Ie,He.filter(Et=>typeof Et=="string"&&Et.length>0));j=vd(le,T,Lt(oe.blocker_workspaces))}function ge(b){let h=b.hold&&typeof b.hold=="object"?b.hold:null;if(!h||h.kind!=="env"&&h.kind!=="systemic")return"";let T=wr(h.cause)||String(h.cause||""),oe=Array.isArray(b.lineages)?b.lineages:[];if(h.kind==="env"){let Ie=oe.map(Et=>Et&&Et.next_at).filter(Et=>typeof Et=="number").sort((Et,Vt)=>Et-Vt)[0],He=typeof Ie=="number"?` \xB7 \uB2E4\uC74C ${new Date(Ie).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"})}`:"";return c`<div class="worker-hold worker-hold--env" role="status">
        <span class="worker-hold__text"
          >환경 보류: ${T} — 재시도 대기${He}</span
        >
        <button
          type="button"
          class="worker-hold__retry"
          title="예약된 재시도를 지금 실행합니다"
        >
          지금 재시도
        </button>
      </div>`}let le=(Array.isArray(h.bead_ids)?h.bead_ids:[]).filter(Ie=>typeof Ie=="string"&&Ie.length>0);return c`<div class="worker-hold worker-hold--systemic" role="alert">
      <span class="worker-hold__text"
        >${T}${le.length>0?` \u2014 bead ${le.join(", ")}`:""}</span
      >
      <button
        type="button"
        class="worker-hold__resume"
        title="정지를 풀고 멈춰 있던 bead를 다시 디스패치합니다"
      >
        재개
      </button>
    </div>`}function Ne(b){let h=[];for(let[it,rn]of Object.entries(Lt(b.provider_hold)))for(let ln of Array.isArray(rn?.targets)?rn.targets:[])h.push({runner:it,target:ln});if(h.length===0)return"";let T=h.find(it=>it.target?.kind==="outage");if(T){let it=typeof T.target.next_probe_at=="number"?new Date(T.target.next_probe_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";return c`<div class="worker-provider-gate" role="status">
        ⚠️ ${T.runner} 공급자 장애 — 신규 디스패치
        보류${it?`, \uB2E4\uC74C \uD504\uB85C\uBE0C ${it}`:""}
      </div>`}let oe=Array.isArray(Lt(b.account_catalog).claude)?Lt(b.account_catalog).claude:[],le=it=>oe.find(ln=>ln?.email===it)?.alias||it,Ie=h.find(it=>typeof it.target?.account!="string"),He=it=>typeof it?.resets_at=="number"?new Date(it.resets_at).toLocaleTimeString("ko-KR",{hour:"2-digit",minute:"2-digit"}):"";if(Ie){let it=He(Ie.target);return c`<div class="worker-provider-gate" role="status">
        ⏳ ${Ie.runner} 사용 한도 — 계정 미확인이라 러너 전체 디스패치
        보류${it?`, \uB9AC\uC14B ${it}`:""}
      </div>`}let Et=[...new Set(h.map(it=>le(String(it.target.account))))],Vt=He(h[0].target);return c`<div class="worker-provider-gate" role="status">
      ⏳ ${Et.join(", ")} 사용 한도 —
      ${Et.length>1?"\uADF8 \uACC4\uC815\uB4E4":"\uADF8 \uACC4\uC815"} 디스패치
      보류${Vt?`, \uB9AC\uC14B ${Vt}`:""}
    </div>`}function y(b){let h=$e(),T=yt(b),oe=T.sublanes.parallel,le=oe.length>0?oe[0].id:"\u2014",Ie=c`<button
      type="button"
      class="worker-play${h.auto_advance?" is-active":""}"
    >
      ${h.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,He=X(b),Et=T.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Vt=h.auto_advance?0:(Array.isArray(h.queue)?h.queue:[]).filter(on=>on&&typeof on.armed_by_lane=="string"&&on.armed_by_lane.length>0).length,it=Vt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${Vt}건 진행 중</span
          >`:"",rn=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${T.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${Zt(b).length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${Y()} 완료 <b>${b.done.length}</b></span
      >`,ln=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${T.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${T.declared_base||"?"}</span
    >`,Un=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${oa}
          step="1"
          .value=${String(T.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:w_},(on,Qn)=>Qn+1).map(on=>c`<option
                value=${String(on)}
                ?selected=${T.serial_lane_count===on}
              >
                ${on}
              </option>`)}
        </select>
      </label> `,pn=c`<input
      type="search"
      class="worker-search"
      placeholder="ID·제목 검색"
      aria-label="이슈 검색 (ID·제목)"
      .value=${H}
    />`,un=sd(T.repo_operations,T.cleanup_failures),Rn=ge(h),Vn=Ne(h);return F?c`<div class="worker-ribbon">
          ${Ie} ${He}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Et}${it}${rn}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Un}${pn}</div>
          <div class="worker-kpi">${ln}</div>
        </div>
        ${Vn}${Rn}${un}${V.template()}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">
          ${Ie}${He}${Un}${pn}
        </div>
        <div class="worker-kpi">
          ${Et}${it}${rn}${ln}
          ${(Array.isArray(T.token_total)?T.token_total:T.token_total?[{label:T.token_total,tooltip:`${Y()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(on=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${on.tooltip}
                >${Y()} 완료 · 누적 ${on.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${le}</b></span
          >
        </div>
      </div>
      ${Vn}${Rn}${un}${V.template()}`}function v(b){let h=b.runnable_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${_.show_blocked}
        />
        🔒 blocked${h.blocked>0?` ${h.blocked}`:""}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${Zo.map(T=>c`<button
              type="button"
              class="worker-filter__chip${_.readiness===T.value?" is-active":""}"
              data-readiness=${T.value}
              aria-pressed=${_.readiness===T.value?"true":"false"}
            >
              ${T.label}
            </button>`)}
        ${h.readiness>0?c`<span class="worker-filter__hidden"
              >숨김 ${h.readiness}</span
            >`:""}
      </div>
    </div>`}function p(){let b=q?"custom":Kl(O)||"custom";return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${b}
    >
      ${vs.map(h=>c`<option value=${h.id} ?selected=${b===h.id}>
            ${h.label}
          </option>`)}
      <option value="custom" ?selected=${b==="custom"}>
        사용자 지정…
      </option>
    </select>`}function g(){let b=ks(O);return c`<div
      class="worker-sort-chain"
      role="group"
      aria-label="후보 정렬 체인"
    >
      ${[0,1,2].map(h=>{let T=b[h];return c`<span class="worker-sort-chain__step">
          <select
            class="worker-sort-chain__key"
            data-step=${h}
            aria-label=${`${h+1}\uCC28 \uC815\uB82C \uD0A4`}
            .value=${T?T.key:""}
          >
            ${h===0?"":c`<option value="" ?selected=${!T}>없음</option>`}
            ${t_.map(oe=>c`<option
                  value=${oe.key}
                  ?selected=${!!T&&T.key===oe.key}
                >
                  ${oe.label}
                </option>`)}
          </select>
          ${T?c`<button
                type="button"
                class="worker-sort-chain__dir"
                data-step=${h}
                aria-label=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
                title=${T.dir==="asc"?"\uC624\uB984\uCC28\uC21C":"\uB0B4\uB9BC\uCC28\uC21C"}
              >
                ${T.dir==="asc"?"\u2191":"\u2193"}
              </button>`:""}
        </span>`})}
    </div>`}function M(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${W}
      >
        ${Vr.map(b=>c`<option value=${b.value} ?selected=${W===b.value}>
              ${b.label}
            </option>`)}
      </select>
    </div>`}function X(b){let h=yt(b).merge,T=$e().auto_merge===!0;if(h.running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${T?" is-active":""}"
        title=${T?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${T?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${h.positions.size}
      </button>`;if(T)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let oe=new Set(h.auto_excluded),le=Zt(b).filter(Ie=>Ie.merge_action&&Ie.merge_enabled&&!oe.has(Ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${le>0?` ${le}`:""}
    </button>`}function ne(b,h){return c`<div
      data-bead-id=${b.id}
      data-drag-kind=${h.kind}
      data-root-dir=${h.root_dir}
      data-lane-id=${dn(h.lane_id)}
      data-row-index=${h.row_index}
      data-queue-index=${String(b.queue_index??0)}
    >
      ${Mn({...b,...Q(b.id,b.discard)},{actions:bo(b)})}
    </div>`}function ue(b){let h=xt(b),T=Xe();return yi({parallel:{rows:h.map((oe,le)=>ne(oe,{kind:"parallel",root_dir:T,row_index:le})),count:h.length,collapsed:N.isAreaCollapsed("parallel"),drop:{drop:"parallel",root_dir:T}},serial:{lanes:Kt(b).map(oe=>({id:oe.id,title:`\uC9C1\uB82C ${oe.index}`,rows:[...oe.ghosts.map(le=>Mn({...le,...Q(le.id,le.discard)},{actions:bo(le)})),...oe.items.map((le,Ie)=>ne(le,{kind:"repo-serial",root_dir:T,row_index:Ie,lane_id:oe.id}))],count:oe.ghosts.length+oe.items.length,match_count:ee([...oe.ghosts,...oe.items]),empty:oe.ghosts.length+oe.items.length===0,badge:oe.badge,held:oe.occupied,cycle:oe.cycle,drop:{drop:"repo-serial",root_dir:T,lane_id:oe.id,lane_length:String(oe.raw_length)}})),collapsed:N.isAreaCollapsed("serial")}})}function ot(b){return ff(an(b),Date.now(),De)}function bt(b){return b.running.some(h=>h.kind!=="session"&&h.run_state==="running")}function et(b){let h=yt(b),T=nn(b),oe=xt(b),le=Wt(b),Ie=Zt(b),He=an(b),Et=Yn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:T,match_count:ee(T),src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:p(),header_row:q?g():void 0,controls:v(b),collapsible:!0,collapsed:N.isCollapsed("candidate"),place_menu:je(T),onOpenDoc:u?(it,rn)=>u(rn):void 0}),Vt=Yn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:le,match_count:ee(le),empty:`${Y()} \uC644\uB8CC \uC5C6\uC74C`,header_control:M(),collapsible:!0,collapsed:N.isCollapsed("done"),preview:F?Array.isArray(h.token_total)?h.token_total.map(it=>it.label).join(" \xB7 "):h.token_total||$_(le):void 0});return F?c`<div class="worker-lanes worker-lanes--mobile">
          ${vi({live:bt(b),running_body:He.length>0?ot(b):"",pr_wait_rows:Ie.map(it=>Mn(it)),count:He.length+Ie.length})}
          ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ee(oe),collapsible:!0,collapsed:N.isCollapsed("queue"),preview:$_(oe),body:ue(b)})}
          ${Et} ${Vt}
        </div>
        ${Re()}`:c`<div class="worker-lanes">
        ${Et}
        ${Yn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:oe,count:oe.length,match_count:ee(oe),collapsible:!0,collapsed:N.isCollapsed("queue"),body:ue(b)})}
        ${Yn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:He,match_count:ee(He),header_control:c`<span class="worker-pane__meta"
            >슬롯 ${h.slots}</span
          >`,live:bt(b),collapsible:!0,collapsed:N.isCollapsed("running"),body:ot(b)})}
        ${Yn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:Ie,match_count:ee(Ie),empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:N.isCollapsed("pr_wait")})}
        ${Vt}
      </div>
      ${Re()}`}function Nt(b){N.toggle(b),x()}function S(b){N.toggleArea(b),x()}function x(){let b=Ut();A(b),pt(y(b),Le),pt(et(b),se);let h=se.querySelector(".provider-resume-dialog");h&&!h.open&&(typeof h.showModal=="function"?h.showModal():h.setAttribute("open",""))}function Ce(){let b=!0,h=Yi(T=>{if(F=T,b){b=!1;return}x()});ke.push(h)}function Be(b){_=b,Nk(b),x()}function nt(b){if(b==="custom"){q=!0,x();return}O=zr(b),Gl(O),q=!1,x()}function mt(b){O=zr({chain:b}),Gl(O),x()}function At(b){W=zn(b),Fk(W),f?.(W),x()}function Hr(b){let h=b.target;if(U){let it=h?.closest?.(".provider-resume-dialog__runner");if(it){let pn=Lt(Lt($e().runner_catalog).runners),un=Lt(pn[it.value]),Rn=Object.keys(Lt(un.models));U={...U,runner:it.value,model:typeof un.default_model=="string"?un.default_model:Rn[0]||""},x();return}let rn=h?.closest?.(".provider-resume-dialog__model");if(rn){try{let[pn,un]=JSON.parse(rn.value);typeof pn=="string"&&typeof un=="string"&&(U={...U,runner:pn,model:un},x())}catch{}return}let ln=h?.closest?.(".provider-resume-dialog__account");if(ln){U={...U,account:ln.value},x();return}let Un=h?.closest?.(".provider-resume-dialog__fresh-input");if(Un){U={...U,fresh_current:Un.checked},x();return}}let T=h?.closest?.(".worker-serial-lane-count");if(T){let it=Number.parseInt(T.value,10);Number.isFinite(it)&&gt(it).then(x);return}let oe=b.target?.closest?.(".worker-filter__blocked");if(oe){Be({..._,show_blocked:oe.checked});return}let le=b.target?.closest?.(".worker-sort-chain__key");if(le){let it=Number.parseInt(le.getAttribute("data-step")||"",10);Number.isFinite(it)&&mt(r_(ks(O),it,le.value));return}let Ie=b.target?.closest?.(".worker-done-range");if(Ie){At(Ie.value);return}let He=b.target?.closest?.(".worker-sort");if(He){nt(He.value);return}let Et=b.target?.closest?.(".worker-slots__input");if(!Et)return;let Vt=Number.parseInt(Et.value,10);if(!Number.isFinite(Vt)){x();return}$t(Vt).then(x)}function kn(b){return b?{runner:b.runner||void 0,model:b.model||void 0,effort:b.effort||void 0,worktree:b.worktree||void 0,status:b.status||void 0,session_id:b.session_id||void 0}:{}}function lr(){let b=yt(Ut()),h=$e().workspace_info,T=h&&typeof h=="object"&&h.repo_ops&&typeof h.repo_ops=="object"?h.repo_ops:null;return{operations:b.repo_operations,cleanup_failures:b.cleanup_failures,repo:l&&l()||"",repo_ops:T}}function Sr(){De&&Ue.close(),ce.hidden=!1,Je.hidden=!1,Qe.open(lr()),x()}function sa(b){let h=$e(),T=h.attempts?h.attempts[b]:null;De=b,Qe.close(),ce.hidden=!0,Je.hidden=!1,Ue.open({attempt_id:b,meta:kn(T)}),x()}function ia(b){let h=$e(),T=(Array.isArray(h.session_active)?h.session_active:[]).find(le=>le&&le.bead_id===b),oe=(T&&Array.isArray(T.session_refs)?T.session_refs:[]).find(le=>le&&le.current===!0);oe&&(Qe.close(),ce.hidden=!0,Je.hidden=!1,Ue.open(so(oe,b,"in_progress")),x())}function aa(){if(Qe.isOpen()&&Qe.refresh(lr()),!De)return;let b=$e(),h=b.attempts?b.attempts[De]:null;if(h){Ue.updateMeta(kn(h));return}Ue.close()}function ws(b,h){if(b.length===0||!s)return;let T=l?l():void 0;if(h.length===0||!T||h===T||!a){s(b);return}Promise.resolve(a(h)).then(()=>{s(b)}).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function $s(b){let h=b.target;if(h?.closest?.(".provider-resume-dialog__cancel")){$();return}if(h?.closest?.(".provider-resume-dialog__confirm")){Z();return}if(h?.closest?.(".provider-resume-dialog")||h?.closest?.(".worker-mini__grip"))return;let T=h?.closest?.(".worker-sort-chain__dir");if(T){let Te=Number.parseInt(T.getAttribute("data-step")||"",10);Number.isFinite(Te)&&mt(o_(ks(O),Te));return}let oe=h?.closest?.(".worker-dep__open");if(oe){ws(oe.getAttribute("data-dep-id")||"",oe.getAttribute("data-root-dir")||"");return}let le=h?.closest?.(".judgement-chip");if(le){let Te=le.closest("[data-bead-id]"),at=Te&&Te.getAttribute("data-bead-id")||"",Qt=le.getAttribute("data-chip-key")||"";at&&Qt&&ie.toggle({bead_id:at,chip_key:Qt});return}if(h?.closest?.(".chip-popover"))return;if(h?.closest?.(".worker-repo-strip")){Sr();return}let Ie=h?.closest?.(".worker-repo-op__dismiss");if(Ie){ht(Ie.dataset.operationId||"");return}let He=h?.closest?.(".worker-cleanup__resume");if(He){let Te=He.dataset.beadId;Te&&Ft(Te);return}let Et=h?.closest?.(".worker-cleanup__resolve");if(Et){let Te=Et.dataset.beadId;Te&&Pt(Te);return}if(h?.closest?.(".worker-hold__retry")){ae("worker-queue-hold-retry-now","\uC9C0\uAE08 \uC7AC\uC2DC\uB3C4 \uAC70\uBD80");return}if(h?.closest?.(".worker-hold__resume")){ae("worker-queue-hold-resume","\uC7AC\uAC1C \uAC70\uBD80");return}if(h?.closest?.(".worker-play")){Pe(!$e().auto_advance);return}let Vt=h?.closest?.(".worker-merge-all");if(Vt){Vt.classList.contains("worker-merge-all--stop")?$e().auto_merge===!0?ut(!1):E():ut(!0);return}let it=h?.closest?.(".worker-pane__toggle[data-lane]");if(it){let Te=it.dataset.lane;(Te==="candidate"||Te==="queue"||Te==="running"||Te==="pr_wait"||Te==="done")&&Nt(Te);return}let rn=h?.closest?.(".worker-wait__area-toggle[data-area]");if(rn){let Te=rn.dataset.area;(Te==="parallel"||Te==="serial")&&S(Te);return}let ln=h?.closest?.(".worker-card__place-lane");if(ln){let Te=ln.dataset.beadId,at=ln.dataset.lane;Te&&(at==="parallel"||/^s[1-5]$/.test(at||""))&&(w=null,x(),Ze(Te,at));return}if(h?.closest?.(".worker-card__place-cancel")){w=null,x();return}let pn=h?.closest?.(".worker-card__place");if(pn){let Te=pn.dataset.beadId;Te&&!pn.disabled&&(zo($e())?(w=Te,x()):Ze(Te,"parallel"));return}let un=h?.closest?.(".worker-filter__chip");if(un){let Te=un.dataset.readiness;(Te==="all"||Te==="ready"||Te==="not_ready")&&Be({..._,readiness:Te});return}let Rn=h?.closest?.('[data-action="queue-remove"]');if(Rn){let Te=Rn.dataset.beadId||"";Te&&_e.sendOp({type:"worker-queue-remove",payload:{bead_id:Te},root_dir:Xe()},Te);return}let Vn=h?.closest?.(".worker-mini__merge");if(Vn){let Te=Vn.dataset.beadId||"";$e().cleanup_failed?.[Te]?Ft(Te):wt(Te);return}let on=h?.closest?.(".worker-mini__merge-cancel");if(on){Oe(on.dataset.beadId||"");return}let Qn=h?.closest?.(".worker-mini__resolve");if(Qn){Pt(Qn.dataset.beadId||"");return}let cr=h?.closest?.(".rtile__resolve");if(cr){let Te=cr.closest(".rtile");Pt(Te?.dataset.beadId||"");return}let On=h?.closest?.(".worker-mini__discard"),Wn=h?.closest?.(".worker-mini__discard-abandon");if(Wn){J(Wn.dataset.beadId||"",Wn.dataset.operationId||"",{kind:Wn.dataset.operationKind||"",last_error:Wn.dataset.lastError||""});return}if(On){L(On.dataset.beadId||"",On.dataset.attemptId||null,On.dataset.discardMode==="merged"?"merged":"unmerged",On.dataset.operationId||null);return}let Ye=h?.closest?.(".worker-mini__stale-continue");if(Ye){pe("worker-stale-work-continue",Ye.dataset.beadId||"",Ye.dataset.actionId||"");return}let zt=h?.closest?.(".worker-mini__stale-backup");if(zt){pe("worker-stale-work-backup-fresh",zt.dataset.beadId||"",zt.dataset.actionId||"");return}let xn=h?.closest?.(".worker-mini__stale-recheck");if(xn){pe("worker-stale-work-recheck",xn.dataset.beadId||"",xn.dataset.actionId||"");return}let tt=h?.closest?.(".worker-mini__revise-fix");if(tt){fe("worker-revise-fix",tt.dataset.beadId||"");return}let k=h?.closest?.(".worker-mini__revise-approve");if(k){fe("worker-revise-approve",k.dataset.beadId||"");return}if(h?.closest?.(".worker-mini__pr"))return;let D=h?.closest?.(".rtile__failure-badge");if(D){let Te=D.dataset.attemptId||"";R=R===Te?null:Te,x();return}let K=h?.closest?.(".rtile__provider-hold-badge");if(K){let Te=K.dataset.attemptId||"";I=I===Te?null:Te,x();return}let we=h?.closest?.(".rtile__attempt-copy");if(we){let Te=we.dataset.attemptId||"";Te&&_n(Te).then(at=>{be(at?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",at?"success":"error",1400)});return}if(h?.closest?.(".rtile__parked-retry")){let Te=h?.closest?.(".rtile");me(Te?.dataset?.beadId||"",Te?.dataset?.attemptId||"");return}let ze=h?.closest?.(".rtile__discard-abandon");if(ze){let at=h?.closest?.(".rtile")?.dataset?.beadId;at&&J(at,ze.dataset.operationId||"",{kind:ze.dataset.operationKind||"",last_error:ze.dataset.lastError||""});return}let st=h?.closest?.(".rtile__discard");if(st){let Te=h?.closest?.(".rtile"),at=Te?.dataset?.beadId,Qt=Te?.dataset?.attemptId;at&&L(at,Qt||null,st.dataset.confirmation==="merged"?"merged":"unmerged",st.dataset.operationId||null);return}if(h?.closest?.(".rtile__pause")){let at=h?.closest?.(".rtile")?.dataset?.attemptId;at&&Gt(at);return}if(h?.closest?.(".rtile__resume-alternate")){let at=h?.closest?.(".rtile")?.dataset?.attemptId;at&&Ke(at);return}if(h?.closest?.(".rtile__resume")){let Te=h?.closest?.(".rtile__resume"),Qt=h?.closest?.(".rtile")?.dataset?.attemptId;Qt&&St(Qt,Te?.dataset?.resumeKind==="settlement"?"settlement":"session");return}if(h?.closest?.(".rtile__session")){let Te=h?.closest?.(".rtile"),at=Te?.dataset?.attemptId;if(at){sa(at);return}let Qt=Te?.dataset?.beadId;Qt&&ia(Qt);return}if(h?.closest?.(".rtile__failure-pop"))return;if(h?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Ue.close();return}if(h?.closest?.(".worker-drawer-host"))return;let jt=h?.closest?.(".rtile .board-card__roll-toggle");if(jt){let Te=jt.dataset.rollParent;Te&&(C.has(Te)?C.delete(Te):C.add(Te),x());return}let Ve=h?.closest?.(".rtile .board-card__roll-child");if(Ve){let Te=Ve.dataset.childId;Te&&s&&s(Te);return}let Tt=h?.closest?.(".rtile");if(Tt){if(h?.closest?.(".rtile__id")){let at=Tt.dataset.beadId;at&&_n(at).then(Qt=>{Qt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Te=Tt.dataset.beadId;Te&&s&&s(Te);return}let An=h?.closest?.(".worker-mini, .worker-card");if(An){let Te=An.dataset.beadId;if(h?.closest?.('[data-seam="log-path-copy"]'))return;if(h?.closest?.(".worker-mini__id, .worker-card__id")){Te&&_n(Te).then(Qt=>{Qt?be("\uBCF5\uC0AC\uB428","success",1200):be("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let at=h?.closest?.(".ctl-chip--from");if(at){let Qt=at.dataset.fromId;Qt&&s&&s(Qt);return}Te&&s&&s(Te)}}function la(b){let h=b.target;h?.closest?.(".worker-search")&&(H=h.value,x())}function ca(b){let h=b.target;b.key!=="Escape"||!h?.closest?.(".worker-search")||H.length===0||(H="",x())}_e.attach(e),e.addEventListener("click",$s),e.addEventListener("change",Hr),e.addEventListener("input",la),e.addEventListener("keydown",ca);function Kr(b){let h=b.target,T=h&&typeof h.closest=="function"?le=>h.closest(le):()=>null,oe=!1;R&&!T(".rtile__failure-pop, .rtile__failure-badge")&&(R=null,oe=!0),I&&!T(".rtile__provider-hold-pop, .rtile__provider-hold-badge")&&(I=null,oe=!0),oe&&x()}function Gr(b){b.key==="Escape"&&(R===null&&I===null&&U===null||(R=null,I=null,U=null,x()))}return document.addEventListener("click",Kr),document.addEventListener("keydown",Gr),ie.attach(),ke.push(()=>{document.removeEventListener("click",Kr),document.removeEventListener("keydown",Gr),ie.detach()}),Ce(),m&&ke.push(m.subscribe(()=>{ve.notifyIssuesChanged(),x()})),o&&ke.push(o.subscribe(()=>{let b=l&&l()||"";b!==te&&(te=b,Fe.close()),x(),aa()})),x(),{load(){ve.ensureSessionDefaults(),x()},refreshSessionDefaults:Me,destroy(){for(let b of ke.splice(0))try{b()}catch{}_e.detach(),e.removeEventListener("click",$s),e.removeEventListener("change",Hr),ve.destroy();try{Ue.destroy()}catch{}Je.hidden=!0;try{Fe.destroy()}catch{}pt(c``,e)}}}function Zl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function E_(e,t,n,r=async()=>{},o=async()=>{}){let i=Bt("views:workspace-picker"),s=null,l=!1,a=!1,u=!1;async function d(q){let Y=q.target.value,F=t.getState().workspace?.current?.path||"";if(Y&&Y!==F){i("switching workspace to %s",Y),l=!0,O();try{await n(Y)}catch(H){i("workspace switch failed: %o",H)}finally{l=!1,O()}}}async function f(){let q=t.getState(),W=q.workspace?.current?.path||q.workspace?.available?.[0]?.path||"";if(!(!W||a)){i("git-pulling workspace %s",W),a=!0,O();try{await r(W)}catch(Y){i("workspace git pull failed: %o",Y)}finally{a=!1,O()}}}function m(q){let W=q.target;W&&e.contains(W)||R()}function _(q){q.key==="Escape"&&R()}function w(){u||(u=!0,document.addEventListener("mousedown",m),document.addEventListener("keydown",_),O())}function R(){u&&(u=!1,document.removeEventListener("mousedown",m),document.removeEventListener("keydown",_),O())}function I(){u?R():w()}async function U(q){let W=q.target,Y=W.value,N=W.checked;i("toggling visibility %s \u2192 %s",Y,String(N));try{await o(Y,N)}catch(F){i("workspace visibility toggle failed: %o",F)}}function ie(q){return q?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function z(q,W){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${I}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${q.map(Y=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${Y.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${Y.path}"
                        .checked=${!W.has(Y.path)}
                        @change=${U}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Zl(Y.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function j(){let q=t.getState(),W=q.workspace?.current,Y=q.workspace?.available||[],N=new Set(q.workspace?.hidden||[]),F=W?.path||Y[0]?.path||"";if(Y.length===0)return c``;let H=Y.filter(G=>!N.has(G.path)||G.path===F);if(H.length<=1){let G=H[0]||Y[0],ee=Zl(G.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${G.path}"
            >${ee}</span
          >
          ${z(Y,N)}
          ${ie(F)}
          ${a?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${H.map(G=>c`
              <option
                value="${G.path}"
                ?selected=${G.path===F}
                title="${G.path}"
              >
                ${Zl(G.path)}
              </option>
            `)}
        </select>
        ${z(Y,N)}
        ${ie(F)}
        ${l||a?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){pt(j(),e)}return O(),s=t.subscribe(()=>O()),{destroy(){s&&(s(),s=null),document.removeEventListener("mousedown",m),document.removeEventListener("keydown",_),pt(c``,e)}}}var T_=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-provider-auto-switch-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-dismiss","worker-repo-operation-deploy-run","worker-queue-set-slots","worker-queue-set-serial-lane-count","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-cleanup-retry","worker-resolve-in-session","worker-parked-retry","worker-queue-hold-resume","worker-queue-hold-retry-now","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-discard-abandon","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-bead-timeline","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Jl(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function C_(e,t,n=Jl()){return{id:n,type:e,payload:t}}function R_(e={}){let t=Bt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",o=null,i="closed",s=0,l=null,a=!0,u=new Map,d=[],f=new Map,m=new Set;function _(j){for(let O of Array.from(m))try{O(j)}catch{}}function w(){if(!a||l)return;i="reconnecting",t("ws reconnecting\u2026"),_(i);let j=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,s)),O=(n.jitterRatio||0)*j,q=Math.max(0,Math.round(j+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",q,s+1),l=setTimeout(()=>{l=null,z()},q)}function R(j){try{o?.send(JSON.stringify(j))}catch(O){t("ws send failed",O)}}function I(){for(i="open",t("ws open"),_(i),s=0;d.length;){let j=d.shift();j&&R(j)}}function U(j){let O;try{O=JSON.parse(String(j.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let W=u.get(O.id);u.delete(O.id),O.ok?W?.resolve(O.payload):W?.reject(O.error||new Error("ws error"));return}let q=f.get(O.type);if(q&&q.size>0)for(let W of Array.from(q))try{W(O.payload)}catch(Y){t("ws event handler error",Y)}else t("ws received unhandled message type: %s",O.type)}function ie(){i="closed",t("ws closed"),_(i);for(let[j,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(j);s+=1,w()}function z(){if(!a)return;let j=r();try{o=new WebSocket(j),t("ws connecting %s",j),i="connecting",_(i),o.addEventListener("open",I),o.addEventListener("message",U),o.addEventListener("error",()=>{}),o.addEventListener("close",ie)}catch(O){t("ws connect failed %o",O),w()}}return z(),{send(j,O){if(!T_.includes(j))return Promise.reject(new Error(`unknown message type: ${j}`));let q=Jl(),W=C_(j,O,q);return t("send %s id=%s",j,q),new Promise((Y,N)=>{u.set(q,{resolve:Y,reject:N,type:j}),o&&o.readyState===o.OPEN?R(W):(t("queue %s id=%s (state=%s)",j,q,i),d.push(W))})},on(j,O){f.has(j)||f.set(j,new Set);let q=f.get(j);return q?.add(O),()=>{q?.delete(O)}},onConnection(j){return m.add(j),()=>{m.delete(j)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),s=0,z()},close(){a=!1,l&&(clearTimeout(l),l=null);try{o?.close()}catch{}},getState(){return i}}}function ow(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function sw(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var ec=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],O_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],xr="tab:worker:closed",iw="bdui.worker.done-range",I_=Rf,L_="worker:queue",P_="ui:order",D_="ui:display-policy",M_="exec:presets",Ar="tab:board:closed",q_="beads-ui.board.closed-range";function aw(e){if(!e)return()=>{};function t(r){document.documentElement.style.setProperty("--app-header-h",`${Math.round(r)}px`)}if(t(e.getBoundingClientRect().height),typeof ResizeObserver!="function")return()=>{};let n=new ResizeObserver(r=>{for(let o of r)t(o.contentRect.height+lw(e))});return n.observe(e),()=>n.disconnect()}function lw(e){let t=getComputedStyle(e);return[t.paddingTop,t.paddingBottom,t.borderTopWidth,t.borderBottomWidth].reduce((r,o)=>r+(parseFloat(o)||0),0)}function cw(e){let t=Bt("main");t("bootstrap start"),aw(document.querySelector(".app-header"));let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;pt(n,e);let r=document.getElementById("global-nav"),o=document.getElementById("top-nav"),i=document.getElementById("repo-scope"),s=document.getElementById("usage-meter"),l=document.getElementById("board-root"),a=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(s&&Qf(s),l&&a&&u&&d){let ke=function(S,x){let Ce="Request failed",Be="";if(S&&typeof S=="object"){let mt=S;if(typeof mt.message=="string"&&mt.message.length>0&&(Ce=mt.message),typeof mt.details=="string")Be=mt.details;else if(mt.details&&typeof mt.details=="object")try{Be=JSON.stringify(mt.details,null,2)}catch{Be=""}}else typeof S=="string"&&S.length>0&&(Ce=S);let nt=x&&x.length>0?`Failed to load ${x}`:"Request failed";re.open(nt,Ce,Be)},$e=function(S){return`${xe.getState().workspace.current?.path||""}\0${S}`},_t=function(){Ee&&(Ee().catch(()=>{}),Ee=null),_e=null,De=null},Ke=function(S){Ue=S;let x=()=>{Ue!==S||xe.getState().selected_id!==S||(Ue=null,ct(S))};if(!te){Fe.then(x);return}x()},je=function(S,x,Ce,Be,nt){return Ce!==Re[x]?(nt().catch(()=>{}),!1):(S.set(Be,nt),!0)},Ze=function(){let S=xe.getState();kt(S.view==="board"),Ge(S.view==="worker"),pe(J(S)),Oe(S.view==="board"||S.view==="worker"||Xe||!!S.selected_id)},Gt=function(){let S=Ir(We);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},St=function(){let S=Ir(dt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},kt=function(S){if(S)for(let[x,Ce]of ec){if($.has(x)||Z.has(x))continue;let Be=x===Ar?Gt():{type:Ce};try{Le.register(x,Be)}catch(At){t("register %s store failed: %o",x,At)}Z.add(x);let nt=Re.board,mt=!1;he.subscribeList(x,Be).then(At=>{mt=!je($,"board",nt,x,At)}).catch(At=>{t("subscribe %s failed: %o",x,At),ke(At,"board")}).finally(()=>{Z.delete(x),mt&&Ze()})}else Pt()},Pt=function(){Re.board+=1;for(let[S]of ec){let x=$.get(S);x&&(x().catch(()=>{}),$.delete(S));try{Le.unregister(S)}catch(Ce){t("unregister %s failed: %o",S,Ce)}}},Ge=function(S){if(!S){ut();return}for(let[x,Ce]of O_){if(ae.has(x)||Z.has(x))continue;let Be=x===xr?St():{type:Ce};try{Le.register(x,Be)}catch(At){t("register %s store failed: %o",x,At)}Z.add(x);let nt=Re.worker,mt=!1;he.subscribeList(x,Be).then(At=>{mt=!je(ae,"worker",nt,x,At)}).catch(At=>{t("subscribe %s failed: %o",x,At),ke(At,"worker")}).finally(()=>{Z.delete(x),mt&&Ze()})}},ut=function(){Re.worker+=1;for(let[S]of O_){let x=ae.get(S);x&&(x().catch(()=>{}),ae.delete(S));try{Le.unregister(S)}catch(Ce){t("unregister %s failed: %o",S,Ce)}}},Oe=function(S){if(!S){E();return}me||(Me("subscribe-worker-queue",{id:L_}).catch(x=>{t("subscribe-worker-queue failed: %o",x)}),me=()=>Me("unsubscribe-worker-queue",{id:L_}))},E=function(){me&&(me().catch(()=>{}),me=null)},J=function(S){return S.view==="monitor"||S.selected_id!=null},pe=function(S){if(!S){fe();return}L||(Me("subscribe-monitor-pipeline",{id:I_}).catch(x=>{t("subscribe-monitor-pipeline failed: %o",x)}),L=()=>Me("unsubscribe-monitor-pipeline",{id:I_}))},fe=function(){L&&(L().catch(()=>{}),L=null)},ht=function(){Pe||(Me("subscribe-ui-order",{id:P_}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),Pe=()=>Me("unsubscribe-ui-order",{id:P_}))},$t=function(){Pe&&(Pe().catch(()=>{}),Pe=null),P.clear()},Ut=function(){gt||(Me("subscribe-display-policy",{id:D_}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),gt=()=>Me("unsubscribe-display-policy",{id:D_}))},yt=function(){gt&&(gt().catch(()=>{}),gt=null),ce.clear()},Ot=function(){Rt||(Me("subscribe-impl-presets",{id:M_}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Rt=()=>Me("unsubscribe-impl-presets",{id:M_}))},nn=function(S){if(!S)return"Unknown";let x=S.split("/").filter(Boolean);return x.length>0?x[x.length-1]:"Unknown"},X=function(S,x){M.open(S.path,{missing_state:S.missing_state,...x?{workspace:x}:{}})};var f=ke,m=$e,_=_t,w=Ke,R=je,I=Ze,U=Gt,ie=St,z=kt,j=Pt,O=Ge,q=ut,W=Oe,Y=E,N=J,F=pe,H=fe,G=ht,ee=$t,ye=Ut,qe=yt,B=Ot,Q=nn,Ae=X;let Se=document.getElementById("header-loading"),C=Wc(Se),re=Jp(e),ve=R_(),Me=C.wrapSend((S,x)=>ve.send(S,x)),he=Mc(Me),Le=qc(),Je=jc(),lt=mc(),P=Nc(),ce=fc(),se=_c(),de=gc();ve.on("impl-presets-snapshot",S=>{let x=S;x&&typeof x.revision=="number"&&Array.isArray(x.presets)&&se.set({revision:x.revision,presets:x.presets})}),ve.on("monitor-pipeline-snapshot",S=>{let x=S;if(!(!x||!Array.isArray(x.workspaces)))try{lt.set(x.workspaces,x.workspaces_state,x.cross_lanes)}catch{}}),ve.on("ui-order-snapshot",S=>{let x=S;if(x&&typeof x.revision=="number")try{P.set({revision:x.revision,order:x.order&&typeof x.order=="object"?x.order:{}})}catch{}}),ve.on("display-policy-snapshot",S=>{let x=S;if(x&&x.policy&&typeof x.policy=="object")try{ce.set(x.policy)}catch{}}),ve.on("session-log-snapshot",S=>{let x=S;if(x&&typeof x.id=="string")try{de.set(x.id,Array.isArray(x.lines)?x.lines:[],typeof x.last_event_at=="number"?x.last_event_at:null)}catch{}}),ve.on("session-log-append",S=>{let x=S;if(x&&typeof x.id=="string")try{de.append(x.id,x.event)}catch{}}),ve.on("snapshot",S=>{let x=S,Ce=x&&typeof x.id=="string"?x.id:"",Be=Ce?Le.getStore(Ce):null;if(Be&&x&&x.type==="snapshot")try{Be.applyPush(x)}catch{}}),ve.on("upsert",S=>{let x=S,Ce=x&&typeof x.id=="string"?x.id:"",Be=Ce?Le.getStore(Ce):null;if(Be&&x&&x.type==="upsert")try{Be.applyPush(x)}catch{}}),ve.on("delete",S=>{let x=S,Ce=x&&typeof x.id=="string"?x.id:"",Be=Ce?Le.getStore(Ce):null;if(Be&&x&&x.type==="delete")try{Be.applyPush(x)}catch{}});let Ee=null,_e=null,De=null,Ue=null,Qe=()=>{},Fe=new Promise(S=>{Qe=()=>S(void 0)}),te=!1,V=!1;async function ct(S){let x=$e(S);if(x===_e||x===De)return;De=x;let Ce=`detail:${S}`,Be={type:"issue-detail",params:{id:S}};try{Le.register(Ce,Be)}catch(nt){t("register detail store failed: %o",nt)}try{let nt=await he.subscribeList(Ce,Be);if(xe.getState().selected_id!==S||$e(S)!==x){await nt().catch(()=>{});return}Ee&&await Ee().catch(()=>{}),Ee=nt,_e=x}catch(nt){t("detail subscribe failed: %o",nt),ke(nt,"issue details")}finally{De===x&&(De=null)}}let $=new Map,Z=new Set,Re={board:0,worker:0},Xe=!1,We=Rs;try{let S=window.localStorage.getItem(q_);ha(S)&&(We=S)}catch{}let dt="today";try{let S=window.localStorage.getItem(iw);S!==null&&(dt=zn(S))}catch{}async function wt(S){if(!ha(S)||S===We)return;We=S;try{window.localStorage.setItem(q_,S)}catch{}let x=$.get(Ar);if(!x)return;$.delete(Ar),await x().catch(()=>{});let Ce=Gt();try{Le.register(Ar,Ce)}catch(Be){t("register %s store failed: %o",Ar,Be)}try{let Be=await he.subscribeList(Ar,Ce);$.set(Ar,Be)}catch(Be){t("re-subscribe %s failed: %o",Ar,Be),ke(Be,"board")}}async function Ft(S){let x=zn(S);if(x===dt)return;dt=x;let Ce=ae.get(xr);if(!Ce)return;ae.delete(xr),await Ce().catch(()=>{});let Be=St();try{Le.register(xr,Be)}catch(nt){t("register %s store failed: %o",xr,nt)}try{let nt=await he.subscribeList(xr,Be);ae.set(xr,nt)}catch(nt){t("re-subscribe %s failed: %o",xr,nt),ke(nt,"worker")}}let ae=new Map,me=null,L=null,Pe=null,gt=null,Rt=null;async function en(){gt=null,ce.clear(),Rt=null,se.clear(),me=null,L=null,$.clear(),ae.clear(),Re.board+=1,Re.worker+=1,Ot();let S=xe.getState().workspace.current?.path;if(S)try{await ve.send("set-workspace",{path:S})}catch(Ce){t("workspace restore after reconnect failed: %o",Ce);return}Ut();let x=xe.getState();kt(x.view==="board"),Ge(x.view==="worker"),pe(J(x)),Oe(x.view==="board"||x.view==="worker"||!!x.selected_id)}async function Yt(){t("clearing all subscriptions for workspace switch"),Pt(),ut(),E(),Je.clear(),$t(),ht(),yt(),Ut(),_t();let S=xe.getState();if(S.selected_id)try{Le.unregister(`detail:${S.selected_id}`)}catch{}let x=xe.getState();kt(x.view==="board"),Ge(x.view==="worker"),pe(J(x)),Oe(x.view==="board"||x.view==="worker"||!!x.selected_id),x.selected_id&&Ke(x.selected_id)}async function Mt(S){t("requesting workspace switch to %s",S),V=!0;try{let x=await ve.send("set-workspace",{path:S});t("workspace switch result: %o",x),x&&x.workspace&&(xe.setState({workspace:{current:{path:x.workspace.root_dir,database:x.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),x.changed&&(await Yt(),be("Switched to "+nn(S),"success",2e3)))}catch(x){throw t("workspace switch failed: %o",x),be("Failed to switch workspace","error",3e3),x}finally{V=!1}}async function xt(S){t("requesting workspace git pull for %s",S);try{let x=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",x);let Ce=x?.status;if(Ce==="up_to_date"){be("Already up to date","success",2e3);return}if(Ce==="stash_pop_conflict"){be("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}be("Git pulled "+nn(S),"success",2e3)}catch(x){t("workspace git pull failed: %o",x);let Ce=x?.code,Be=x?.message;if(Ce==="rebase_conflict"){be("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Ce==="rebase_conflict_abort_failed"){be("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Ce==="busy"){be("Git pull skipped: another operation is running","warning",3e3);return}let nt=Be?`: ${Be}`:"";throw be(`Git pull failed${nt}`,"error",3e3),x}}async function Kt(S,x){t("setting workspace visibility %s \u2192 %s",S,String(x));try{await ve.send("set-workspace-visibility",{path:S,visible:x}),await Wt()}catch(Ce){t("workspace visibility update failed: %o",Ce),be("Failed to update project visibility","error",3e3)}}async function Wt(){try{let S=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let x=S.workspaces.map(mt=>({path:mt.path,database:mt.database,pid:mt.pid,version:mt.version})),Ce=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,Be=Array.isArray(S.hidden)?S.hidden.filter(mt=>typeof mt=="string"):[];xe.setState({workspace:{current:Ce,available:x,hidden:Be}});let nt=window.localStorage.getItem("beads-ui.workspace");nt&&(!x.some(At=>At.path===nt)||Be.includes(nt)?window.localStorage.removeItem("beads-ui.workspace"):Ce&&nt!==Ce.path&&(t("restoring saved workspace preference: %s",nt),await Mt(nt)))}}catch(S){t("failed to load workspaces: %o",S)}}ve.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(xe.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),Wt(),Yt())});let an=!1;if(typeof ve.onConnection=="function"){let S=x=>{t("ws state %s",x),x==="reconnecting"||x==="closed"?(an=!0,be("Connection lost. Reconnecting\u2026","error",4e3)):x==="open"&&an&&(an=!1,be("Reconnected","success",2200),sw(xe,(Ce,Be)=>{t(`${Ce}: %o`,Be)}),en())};ve.onConnection(S)}let Zt="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(Zt=S)}catch(S){t("view parse error: %o",S)}let xe=Uc({config:ow(),view:Zt});ve.on("worker-queue-snapshot",S=>{let x=S;if(!x||!x.queue)return;let Ce=xe.getState().workspace.current?.path;if(typeof Ce=="string"&&Ce.length>0&&x.root_dir!==Ce){t("dropping worker-queue snapshot for %s",String(x.root_dir));return}try{Je.set(x.queue)}catch{}});let A=Fc(xe);A.start();let ge=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),Ne=async(S,x)=>{try{return await Me(S,x)}catch(Ce){if(ge.has(S))throw Ce;return[]}};If({global_element:r,repo_element:o},xe,A);let y=document.getElementById("workspace-picker");y&&E_(y,xe,Mt,xt,Kt);let v=Mf(e,(S,x)=>Me(S,x));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>v.open())}catch{}let p=Ff(e,{policyStore:ce,queueStore:Je,implPresetStore:se,transport:(S,x)=>Me(S,x),onOpenChange:S=>{let x=Xe;Xe=S,Ze(),x&&S===!1&&ue.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[x]of ec)for(let Ce of Le.snapshotFor(x)||[]){let Be=Ce.labels;if(Array.isArray(Be))for(let nt of Be)typeof nt=="string"&&nt.length>0&&S.add(nt)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>p.open()))}catch{}let g=document.createElement("div");g.className="md-viewer-root",document.body.appendChild(g);let M=Ki(g,{getWorkspacePath:()=>xe.getState().workspace.current?.path}),ne=su(l,{gotoIssue:S=>A.gotoIssue(S),issueStores:Le,transport:Ne,workerQueueStore:Je,uiOrderStore:P,displayPolicyStore:ce,closedRange:We,onClosedRangeChange:S=>{wt(S)},onNewIssue:()=>v.open(),openDoc:X}),ue=Xl(a,{transport:Ne,issueStores:Le,queueStore:Je,sessionLogStore:de,gotoIssue:S=>xe.setState({selected_id:S}),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:S=>Mt(S),openDoc:X,doneRange:dt,onDoneRangeChange:S=>{Ft(S)}}),ot=Of(u,{transport:Ne,pipelineStore:lt,execPresetStore:se,sessionLogStore:de,router:A,gotoIssue:S=>A.gotoIssue(S),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:S=>Mt(S),openDoc:X}),bt=Zp(d,{issueStores:Le,transport:Ne,queueStore:Je,execPresetStore:se,sessionLogStore:de,getWorkspacePath:()=>xe.getState().workspace.current?.path,mdViewer:M,depCandidates:()=>{let S=lt.get();if(S===null)return null;let x=lt.getWorkspacesState(),Ce=xe.getState();if(Ce.view==="monitor")return cl(S,x);let Be=Ce.workspace.current?.path;return Be?cl(S,x,{root_dir:Be}):null},subscribeCandidates:S=>lt.subscribe(S),onDepChanged:({type:S,a:x,b:Ce})=>{let Be=ot;S==="dep-add"&&Be&&typeof Be.recorrectSharedLane=="function"&&Be.recorrectSharedLane(S,x,Ce)},onNavigate:(S,x)=>{let Ce=()=>{xe.getState().view==="worker"?xe.setState({selected_id:S}):A.gotoIssue(S)},Be=xe.getState().workspace.current?.path;if(typeof x!="string"||x.length===0||!Be||x===Be){Ce();return}Promise.resolve(Mt(x)).then(Ce).catch(()=>{be("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=xe.getState();xe.setState({selected_id:null});try{A.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{p.open("execution")}}),et=xe.getState().selected_id;et&&(d.hidden=!1,bt.load(et),Ke(et)),xe.subscribe(S=>{let x=S.selected_id;x?(d.hidden=!1,bt.load(x),V||Ke(x)):(bt.clear(),d.hidden=!0,_t())});let Nt=S=>{l.hidden=S.view!=="board",a.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",i&&i.classList.toggle("is-quiet",S.view==="monitor"),kt(S.view==="board"),Ge(S.view==="worker"),pe(J(S)),Oe(S.view==="board"||S.view==="worker"||Xe||!!S.selected_id),!S.selected_id&&S.view==="board"&&ne.load(),S.view==="worker"&&ue.load(),S.view==="monitor"?ot.load():ot.pause(),window.localStorage.setItem("beads-ui.view",S.view)};xe.subscribe(Nt),Nt(xe.getState()),ht(),Ut(),Ot(),Wt().finally(()=>{te=!0,Qe()}),window.addEventListener("keydown",S=>{let x=S.ctrlKey||S.metaKey,Ce=String(S.key||"").toLowerCase(),Be=S.target,nt=Be&&Be.tagName?String(Be.tagName).toLowerCase():"",mt=nt==="input"||nt==="textarea"||nt==="select"||Be&&typeof Be.isContentEditable=="boolean"&&Be.isContentEditable;x&&Ce==="n"&&(mt||(S.preventDefault(),v.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,o=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",o);let i=document.getElementById("theme-switch");i&&(i.checked=o==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&cw(t)});export{cw as bootstrap,ow as readBootstrapConfig,sw as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
