var oa=Object.create;var wn=Object.defineProperty;var ia=Object.getOwnPropertyDescriptor;var aa=Object.getOwnPropertyNames;var la=Object.getPrototypeOf,ca=Object.prototype.hasOwnProperty;var da=(e,t,r)=>t in e?wn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var kn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ua=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of aa(t))!ca.call(e,s)&&s!==r&&wn(e,s,{get:()=>t[s],enumerable:!(n=ia(t,s))||n.enumerable});return e};var pa=(e,t,r)=>(r=e!=null?oa(la(e)):{},ua(t||!e||!e.__esModule?wn(r,"default",{value:e,enumerable:!0}):r,e));var Ee=(e,t,r)=>da(e,typeof t!="symbol"?t+"":t,r);var js=kn((Rd,Gs)=>{var ar=1e3,lr=ar*60,cr=lr*60,Vt=cr*24,ga=Vt*7,ba=Vt*365.25;Gs.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return wa(e);if(r==="number"&&isFinite(e))return t.long?va(e):ka(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function wa(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ba;case"weeks":case"week":case"w":return r*ga;case"days":case"day":case"d":return r*Vt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*cr;case"minutes":case"minute":case"mins":case"min":case"m":return r*lr;case"seconds":case"second":case"secs":case"sec":case"s":return r*ar;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ka(e){var t=Math.abs(e);return t>=Vt?Math.round(e/Vt)+"d":t>=cr?Math.round(e/cr)+"h":t>=lr?Math.round(e/lr)+"m":t>=ar?Math.round(e/ar)+"s":e+"ms"}function va(e){var t=Math.abs(e);return t>=Vt?Wr(e,t,Vt,"day"):t>=cr?Wr(e,t,cr,"hour"):t>=lr?Wr(e,t,lr,"minute"):t>=ar?Wr(e,t,ar,"second"):e+" ms"}function Wr(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Vs=kn((Id,Ys)=>{function ya(e){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=js(),r.destroy=c,Object.keys(e).forEach(f=>{r[f]=e[f]}),r.names=[],r.skips=[],r.formatters={};function t(f){let _=0;for(let b=0;b<f.length;b++)_=(_<<5)-_+f.charCodeAt(b),_|=0;return r.colors[Math.abs(_)%r.colors.length]}r.selectColor=t;function r(f){let _,b=null,x,S;function m(...I){if(!m.enabled)return;let z=m,H=Number(new Date),G=H-(_||H);z.diff=G,z.prev=_,z.curr=H,_=H,I[0]=r.coerce(I[0]),typeof I[0]!="string"&&I.unshift("%O");let P=0;I[0]=I[0].replace(/%([a-zA-Z%])/g,(T,M)=>{if(T==="%%")return"%";P++;let $=r.formatters[M];if(typeof $=="function"){let Y=I[P];T=$.call(z,Y),I.splice(P,1),P--}return T}),r.formatArgs.call(z,I),(z.log||r.log).apply(z,I)}return m.namespace=f,m.useColors=r.useColors(),m.color=r.selectColor(f),m.extend=n,m.destroy=r.destroy,Object.defineProperty(m,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,S=r.enabled(f)),S),set:I=>{b=I}}),typeof r.init=="function"&&r.init(m),m}function n(f,_){let b=r(this.namespace+(typeof _>"u"?":":_)+f);return b.log=this.log,b}function s(f){r.save(f),r.namespaces=f,r.names=[],r.skips=[];let _=(typeof f=="string"?f:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of _)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(f,_){let b=0,x=0,S=-1,m=0;for(;b<f.length;)if(x<_.length&&(_[x]===f[b]||_[x]==="*"))_[x]==="*"?(S=x,m=b,x++):(b++,x++);else if(S!==-1)x=S+1,m++,b=m;else return!1;for(;x<_.length&&_[x]==="*";)x++;return x===_.length}function i(){let f=[...r.names,...r.skips.map(_=>"-"+_)].join(",");return r.enable(""),f}function l(f){for(let _ of r.skips)if(o(f,_))return!1;for(let _ of r.names)if(o(f,_))return!0;return!1}function a(f){return f instanceof Error?f.stack||f.message:f}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ys.exports=ya});var Ks=kn((ft,Gr)=>{ft.formatArgs=xa;ft.save=Sa;ft.load=Aa;ft.useColors=$a;ft.storage=Ta();ft.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ft.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function $a(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function xa(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Gr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}ft.log=console.debug||console.log||(()=>{});function Sa(e){try{e?ft.storage.setItem("debug",e):ft.storage.removeItem("debug")}catch{}}function Aa(){let e;try{e=ft.storage.getItem("debug")||ft.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ta(){try{return localStorage}catch{}}Gr.exports=Vs()(ft);var{formatters:Ea}=Gr.exports;Ea.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var gr=globalThis,Hr=gr.trustedTypes,Ls=Hr?Hr.createPolicy("lit-html",{createHTML:e=>e}):void 0,Fs="$lit$",qt=`lit$${Math.random().toFixed(9).slice(2)}$`,qs="?"+qt,fa=`<${qs}>`,jt=document,br=()=>jt.createComment(""),wr=e=>e===null||typeof e!="object"&&typeof e!="function",Tn=Array.isArray,_a=e=>Tn(e)||typeof e?.[Symbol.iterator]=="function",vn=`[ 	
\f\r]`,mr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ds=/-->/g,Os=/>/g,Wt=RegExp(`>|${vn}(?:([^\\s"'>=/]+)(${vn}*=${vn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ms=/'/g,Ns=/"/g,Bs=/^(?:script|style|textarea|title)$/i,En=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),d=En(1),$d=En(2),xd=En(3),Yt=Symbol.for("lit-noChange"),Fe=Symbol.for("lit-nothing"),Ps=new WeakMap,Gt=jt.createTreeWalker(jt,129);function Us(e,t){if(!Tn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ls!==void 0?Ls.createHTML(t):t}var ha=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",i=mr;for(let l=0;l<r;l++){let a=e[l],c,f,_=-1,b=0;for(;b<a.length&&(i.lastIndex=b,f=i.exec(a),f!==null);)b=i.lastIndex,i===mr?f[1]==="!--"?i=Ds:f[1]!==void 0?i=Os:f[2]!==void 0?(Bs.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=Wt):f[3]!==void 0&&(i=Wt):i===Wt?f[0]===">"?(i=s??mr,_=-1):f[1]===void 0?_=-2:(_=i.lastIndex-f[2].length,c=f[1],i=f[3]===void 0?Wt:f[3]==='"'?Ns:Ms):i===Ns||i===Ms?i=Wt:i===Ds||i===Os?i=mr:(i=Wt,s=void 0);let x=i===Wt&&e[l+1].startsWith("/>")?" ":"";o+=i===mr?a+fa:_>=0?(n.push(c),a.slice(0,_)+Fs+a.slice(_)+qt+x):a+qt+(_===-2?l:x)}return[Us(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},kr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=t.length-1,a=this.parts,[c,f]=ha(t,r);if(this.el=e.createElement(c,n),Gt.currentNode=this.el.content,r===2||r===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=Gt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Fs)){let b=f[i++],x=s.getAttribute(_).split(qt),S=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:S[2],strings:x,ctor:S[1]==="."?$n:S[1]==="?"?xn:S[1]==="@"?Sn:or}),s.removeAttribute(_)}else _.startsWith(qt)&&(a.push({type:6,index:o}),s.removeAttribute(_));if(Bs.test(s.tagName)){let _=s.textContent.split(qt),b=_.length-1;if(b>0){s.textContent=Hr?Hr.emptyScript:"";for(let x=0;x<b;x++)s.append(_[x],br()),Gt.nextNode(),a.push({type:2,index:++o});s.append(_[b],br())}}}else if(s.nodeType===8)if(s.data===qs)a.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(qt,_+1))!==-1;)a.push({type:7,index:o}),_+=qt.length-1}o++}}static createElement(t,r){let n=jt.createElement("template");return n.innerHTML=t,n}};function sr(e,t,r=e,n){if(t===Yt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=wr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=sr(e,s._$AS(e,t.values),s,n)),t}var yn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??jt).importNode(r,!0);Gt.currentNode=s;let o=Gt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new vr(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new An(o,this,t)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Gt.nextNode(),i++)}return Gt.currentNode=jt,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},vr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Fe,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=sr(this,t,r),wr(t)?t===Fe||t==null||t===""?(this._$AH!==Fe&&this._$AR(),this._$AH=Fe):t!==this._$AH&&t!==Yt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):_a(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Fe&&wr(this._$AH)?this._$AA.nextSibling.data=t:this.T(jt.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=kr.createElement(Us(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new yn(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(t){let r=Ps.get(t.strings);return r===void 0&&Ps.set(t.strings,r=new kr(t)),r}k(t){Tn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(br()),this.O(br()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},or=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Fe,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Fe}_$AI(t,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)t=sr(this,t,r,0),i=!wr(t)||t!==this._$AH&&t!==Yt,i&&(this._$AH=t);else{let l=t,a,c;for(t=o[0],a=0;a<o.length-1;a++)c=sr(this,l[n+a],r,a),c===Yt&&(c=this._$AH[a]),i||(i=!wr(c)||c!==this._$AH[a]),c===Fe?t=Fe:t!==Fe&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(t)}j(t){t===Fe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},$n=class extends or{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Fe?void 0:t}},xn=class extends or{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Fe)}},Sn=class extends or{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=sr(this,t,r,0)??Fe)===Yt)return;let n=this._$AH,s=t===Fe&&n!==Fe||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Fe&&(n===Fe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},An=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){sr(this,t)}};var ma=gr.litHtmlPolyfillSupport;ma?.(kr,vr),(gr.litHtmlVersions??(gr.litHtmlVersions=[])).push("3.3.1");var $e=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new vr(t.insertBefore(br(),o),o,void 0,r??{})}return s._$AI(e),s};var wt="today",Tt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Lt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function ir(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function zs(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Hs(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ws(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Zs=pa(Ks(),1);function De(e){return(0,Zs.default)(`beads-ui:${e}`)}function vt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Kt(e,t){let r=vt(e.created_at),n=vt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function Js(e,t){let r=vt(e.created_at),n=vt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function eo(e,t){let r=vt(e.updated_at),n=vt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function to(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=vt(e.created_at),o=vt(t.created_at);if(s!==o)return s<o?1:-1;let i=e.id,l=t.id;return i<l?-1:i>l?1:0}function ro(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ca=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Xs(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Qs(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ca.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function no(e,t){let r=Xs(e),n=Xs(t);if(r!==n)return r<n?-1:1;let s=Qs(e),o=Qs(t);if(s!==o)return s<o?-1:1;let i=vt(e&&e.created_at),l=vt(t&&t.created_at);if(i!==l)return i<l?-1:1;let a=e&&e.id,c=t&&t.id;return a===c?0:String(a)<String(c)?-1:1}var Cn=2**20;function dr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-vt(e&&e.created_at)}function jr(e){return(t,r)=>{let n=dr(t,e),s=dr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Rn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:dr(l,r)-Cn};if(!l)return{rank:dr(i,r)+Cn};let a=dr(i,r),c=dr(l,r),f=(a+c)/2;return a<f&&f<c?{rank:f}:{renormalize:n.map((_,b)=>({bead_id:_.id,rank:b*Cn}))}}function In(e,t={}){let r=De(`issue-store:${e}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=t.sort||Kt;function c(){for(let b of Array.from(i))try{b()}catch{}}function f(){s=Array.from(n.values()).sort(a)}function _(b){if(l||!b||b.id!==e)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let S=Array.isArray(b.issues)?b.issues:[];for(let m of S)m&&typeof m.id=="string"&&m.id.length>0&&n.set(m.id,m);f(),o=x,c();return}if(b.type==="upsert"){let S=b.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let m=n.get(S.id);if(!m)n.set(S.id,S);else{let I=Number.isFinite(m.updated_at)?m.updated_at:0,z=Number.isFinite(S.updated_at)?S.updated_at:0;if(I<=z){for(let H of Object.keys(m))H in S||delete m[H];for(let[H,G]of Object.entries(S))m[H]=G}}f()}o=x,c()}else if(b.type==="delete"){let S=String(b.issue_id||"");S&&(n.delete(S),f()),o=x,c()}}}return{id:e,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:_,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Yr(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let i=e.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function so(e){let t=De("subs"),r=new Map,n=new Map;function s(l,a){t("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let f=Array.isArray(a.added)?a.added:[],_=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let S=r.get(x);if(!S)continue;let m=S.itemsById;for(let I of f)typeof I=="string"&&I.length>0&&m.set(I,!0);for(let I of _)typeof I=="string"&&I.length>0&&m.set(I,!0);for(let I of b)typeof I=="string"&&I.length>0&&m.delete(I)}}async function o(l,a){let c=Yr(a);if(t("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let _=r.get(l);if(_&&_.key!==c){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let f=n.get(c);f&&f.add(l);try{await e("subscribe-list",{id:l,type:a.type,params:a.params})}catch(_){let b=r.get(l)||null;if(b){let x=n.get(b.key);x&&(x.delete(l),x.size===0&&n.delete(b.key))}throw r.delete(l),_}return async()=>{t("unsubscribe %s key=%s",l,c);try{await e("unsubscribe-list",{id:l})}catch{}let _=r.get(l)||null;if(_){let b=n.get(_.key);b&&(b.delete(l),b.size===0&&n.delete(_.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Yr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let f of a.itemsById.keys())c[f]=!0;return c}}}}function oo(){let e=De("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,f){let _=c?Yr(c):"",b=r.get(a)||"",x=t.has(a);if(e("register %s key=%s (prev=%s)",a,_,b),x&&b&&_&&b!==_){let S=t.get(a);if(S)try{S.dispose()}catch{}let m=s.get(a);if(m){try{m()}catch{}s.delete(a)}let I=In(a,f);t.set(a,I);let z=I.subscribe(()=>o());s.set(a,z)}else if(!x){let S=In(a,f);t.set(a,S);let m=S.subscribe(()=>o());s.set(a,m)}return r.set(a,_),()=>l(a)}function l(a){e("unregister %s",a),r.delete(a);let c=t.get(a);c&&(c.dispose(),t.delete(a));let f=s.get(a);if(f){try{f()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return t.get(a)||null},snapshotFor(a){let c=t.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function io(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ln(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Ra(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ia(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function lo(e){let t=De("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Ra(n),i=Ia(n);if(t("hash change \u2192 view=%s id=%s",i,o),e.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",i=Ln(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Ln(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var La=Object.freeze({workspace_config:{default_workspace:null}});function co(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:La.workspace_config.default_workspace}}}function uo(e={}){let t=De("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today",show_deferred_column:e.board?.show_deferred_column===!0},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:co(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?co(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,f)=>c!==r.workspace.hidden[f]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,f)=>c===r.worker.show_closed_children[f])&&!l&&!a||(r=i,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function po(e){let t=De("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let c=r>0;e.toggleAttribute("hidden",!c),e.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,t("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?t("done called but count was already %d",c):t("done count=%d\u2192%d",c,r),o()}function a(c){return async(_,b)=>{let x=s++,S=Date.now();n.set(x,{type:_,start_ts:S}),t("request start id=%d type=%s count=%d",x,_,r+1),i();let m=!1,I=()=>{m||(m=!0,n.delete(x),l())},z=setTimeout(()=>{m||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,_,Date.now()-S),I())},3e4);try{let H=await c(_,b),G=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",x,_,G),H}catch(H){let G=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,_,G,H),H}finally{clearTimeout(z),I()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([f,_])=>({id:f,type:_.type,elapsed_ms:c-_.start_ts}))}}}function oe(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Vr(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(i==="closed")return a.sort(ro),a;switch(l){case"created_desc":return a.sort(Kt),a;case"created_asc":return a.sort(Js),a;case"updated_desc":return a.sort(eo),a;case"priority":return a.sort(to),a;case"manual":default:{let c=r();return c?a.sort(jr(c)):a.sort(Kt),a}}}function s(o){let i=[];return e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function yr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function _t(e){let t=yr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function yt(e,t){let r=yr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Kr(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=yr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Zr(e){let t=e.transport,r=e.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!t||!r)return;let c=r.get()||{revision:0,order:{}},f=n(Rn(l,a,c.order),i);s(c,f);let _=await t("ui-order-set",{expected_revision:c.revision,entries:f});if(_&&_.conflict){let b={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};r.set(b);let x=n(Rn(l,a,b.order),i);s(b,x);let S=await t("ui-order-set",{expected_revision:b.revision,entries:x});S&&S.applied&&r.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else _&&_.applied&&r.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Xr(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Dn(e,t){return!t||typeof e!="string"||e.length===0||Xr(t.visible_labels).includes(e)?!0:Xr(t.hidden_labels).includes(e)?!1:!Xr(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function fo(e,t){return Xr(e).filter(r=>Dn(r,t))}function Zt(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Da={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},_o={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Oa={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ma={review:"\u2713",skip:"\u2298"},ur={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Na(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Pa(e){let t=e&&e.fill||"none";return t==="none"?ur.none:e&&e.stale===!0?ur.stale:t==="dim"?ur.dim:e&&e.glyph==="review"?ur.review:e&&e.glyph==="skip"?ur.skip:ur.done}function Fa(e,t,r){let n=Da[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,i=Ma[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let a=s==="none"?"lbl":`lbl l-${n} on`,c=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${l} style=${c}>${i}</div>
      <div class=${a}>
        ${_o[e]||e}
      </div>
    </div>
  `}function Qr(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=Oa[r],s=e.stages,o=Na(n,s,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${_o[l]||l} ${Pa(s[l]||{})}`).join(" \xB7 ")}`;return d`
    <div class="stp" role="img" aria-label=${i}>
      ${n.map(l=>Fa(l,s[l]||{},l===o))}
    </div>
  `}function qa(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ho=2;function Ba(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ho).join(", "),s=r.length-ho,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Ua(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Zt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Zt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Zt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of fo(e.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&Zt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Zt(r,"blocked")&&s.push(...Ba(e.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function za(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Ha(e){let t=yt(e.created_at),r=yt(e.updated_at);return!t&&!r?"":d`<span class="board-card__times">
    ${t?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Wa(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(no):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>t.onRollupToggle&&t.onRollupToggle(i,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Ha(e)}
      </div>
      ${n>0&&r.current?d`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?d`<div class="board-card__roll-list">
            ${o.map((i,l)=>d`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>t.onChildClick&&t.onChildClick(a,i.id)}
                >
                  <span class=${za(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function mo(e,t){let r=qa(e.priority);return d`
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
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Ua(e,t)}
      ${e.workflow&&Zt(t.policy||null,"stepper")?Qr(e.workflow,e.status):""}
      ${Wa(e,t)}
    </article>
  `}function Xt(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return d`
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
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Tt.map(o=>d`<option
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
        ${e.items.map(o=>mo(o,t))}
      </div>
    </section>
  `}var Ga=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ja=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ya=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Va(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function go(e,t,r){return d`
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
        ${Ga.map(n=>d`<option
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
        ${ja.map(n=>d`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Va(e,t,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${Ya.map(n=>d`<option
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
  `}var Ka=200,Za={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Xa=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),bo="beads-ui.board.sort",wo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Qa(){try{let e=window.localStorage.getItem(bo);if(e&&wo.has(e))return e}catch{}return"created_desc"}function ko(e,t){let r=De("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,i=t.uiOrderStore,l=t.displayPolicyStore,a=t.onClosedRangeChange,c=t.onNewIssue,f=t.closedRange||wt,_=s?Vr(s,i):null,b=Zr({transport:o,uiOrderStore:i}),x=[],S=[],m=[],I=[],z=[],H=[],G=!1,P=0,E=Qa(),T=new Map,M=new Map,$=new Map,Y=new Set,K={search:"",priority:"",type:"",labels:[]},X=!1,ie=null;function be(N){return String(N.status||"open")==="open"}function Ie(N){let q=String(N.status||"open");return q==="open"||q==="blocked"}function _e(N){let q=K.search.trim().toLowerCase(),re=K.priority,te=K.type,ne=K.labels;return N.filter(he=>{if(q){let ge=String(he.id||"").toLowerCase(),ke=String(he.title||"").toLowerCase();if(!ge.includes(q)&&!ke.includes(q))return!1}if(re!==""&&String(he.priority)!==re||te!==""&&String(he.issue_type||"")!==te)return!1;if(ne.length>0){let ge=Array.isArray(he.labels)?he.labels:[];if(!ne.some(ke=>ge.includes(ke)))return!1}return!0})}function Z(){let N=new Set;for(let q of[x,S,m,I,z,H])for(let re of q){let te=Array.isArray(re.labels)?re.labels:[];for(let ne of te)typeof ne=="string"&&ne.length>0&&N.add(ne)}return Array.from(N).sort()}function A(){return K.search.trim()!==""||K.priority!==""||K.type!==""||K.labels.length>0}function g(){try{if(_){let N=_.selectBoardColumn("tab:board:in-progress","in_progress",E),q=_.selectBoardColumn("tab:board:blocked","blocked",E).filter(Ie),re=new Set(N.map(C=>C.id)),te=_.selectBoardColumn("tab:board:ready","ready",E).filter(C=>be(C)&&!re.has(C.id)),ne=_.selectBoardColumn("tab:board:resolved","resolved",E),he=_.selectBoardColumn("tab:board:deferred","deferred",E),ge=G?he:[],ke=_.selectBoardColumn("tab:board:closed","closed").slice(0,Ka),ae=[...q,...te,...N,...ne,...ge,...ke];L(ae);let v=new Set;for(let C of ae)C&&C.id&&!On(C)&&v.add(C.id);let F=!A();x=F?pr(q,v):q,S=F?pr(te,v):te,m=F?pr(N,v):N,I=F?pr(ne,v):ne,z=F?pr(ge,v):ge,P=he.length,H=F?pr(ke,v):ke,T=new Map;for(let C of x)T.set(C.id,"open");for(let C of S)T.set(C.id,"open");for(let C of m)T.set(C.id,"in_progress");for(let C of I)T.set(C.id,"resolved");for(let C of z)T.set(C.id,"deferred");for(let C of H)T.set(C.id,"closed");M=new Map;for(let C of x)M.set(C.id,"blocked-col");for(let C of S)M.set(C.id,"ready-col");for(let C of m)M.set(C.id,"in-progress-col");for(let C of I)M.set(C.id,"resolved-col");for(let C of z)M.set(C.id,"deferred-col");for(let C of H)M.set(C.id,"closed-col")}Oe()}catch{x=[],S=[],m=[],I=[],z=[],H=[],$=new Map,Oe()}}function L(N){let q=new Map;for(let te of N)te&&te.id&&!q.has(te.id)&&q.set(te.id,te);let re=new Map;for(let te of q.values()){let ne=On(te);if(!ne)continue;let he=re.get(ne);he||(he=[],re.set(ne,he)),he.push({id:te.id,title:te.title,status:te.status,metadata:te.metadata,created_at:te.created_at,updated_at:te.updated_at})}$=re}function B(N){let q=$.get(N)||[],re=0;for(let ne of q)(ne.status==="resolved"||ne.status==="closed")&&(re+=1);let te=Kr(q);return{total:q.length,count:re,current:te,children:q}}function W(N){return!Y.has(N)}function V(N,q){N.preventDefault(),N.stopPropagation(),Y.has(q)?Y.delete(q):Y.add(q),Oe()}function Q(N,q){N.preventDefault(),N.stopPropagation(),n(q)}function de(N,q){N.preventDefault(),N.stopPropagation(),n(q)}function le(N,q){ie||n(q)}function Le(N,q){N.preventDefault(),N.stopPropagation(),Ja(q).then(re=>{re&&oe("\uBCF5\uC0AC\uB428","success",1200)})}function ze(N,q){ie=q,N.dataTransfer&&(N.dataTransfer.setData("text/plain",q),N.dataTransfer.effectAllowed="move"),N.target.classList.add("board-card--dragging")}function Pe(N){N.target.classList.remove("board-card--dragging"),it(),setTimeout(()=>{ie=null},0)}function rt(N){let q=String(N.target.value||"");!q||q===f||(f=q,a&&a(q),Oe())}let Ke={onCardClick:le,onCopyId:Le,onDragStart:ze,onDragEnd:Pe,onClosedRangeChange:rt,rollupFor:B,isExpanded:W,onRollupToggle:V,onChildClick:Q,onFromChipClick:de,get policy(){return l?l.get():null}};function ht(N){let q=N.target,re=e.querySelector(".board-filter__labels");q&&re&&re.contains(q)||Xe()}function nt(N){N.key==="Escape"&&Xe()}function Ze(){X||(X=!0,document.addEventListener("mousedown",ht),document.addEventListener("keydown",nt),Oe())}function Xe(){X&&(X=!1,document.removeEventListener("mousedown",ht),document.removeEventListener("keydown",nt),Oe())}let st={onSearchInput(N){K.search=String(N.target.value||""),g()},onPriorityChange(N){K.priority=String(N.target.value||""),g()},onTypeChange(N){K.type=String(N.target.value||""),g()},onSortChange(N){let q=String(N.target.value||"");if(!(!wo.has(q)||q===E)){E=q;try{window.localStorage.setItem(bo,q)}catch{}g()}},onDeferredToggle(){G=!G,g()},onLabelMenuToggle(){X?Xe():Ze()},onLabelToggle(N){let q=K.labels.indexOf(N);q===-1?K.labels.push(N):K.labels.splice(q,1),g()},onLabelClear(){K.labels.length!==0&&(K.labels=[],g())},onNewIssue(){c&&c()}};function ot(){let N=G?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${go(K,st,{sort_mode:E,show_deferred:G,deferred_count:P,label_options:Z(),label_menu_open:X})}
        <div class=${N}>
          ${Xt({title:"Blocked",id:"blocked-col",items:_e(x)},Ke)}
          ${Xt({title:"Ready",id:"ready-col",items:_e(S)},Ke)}
          ${Xt({title:"In progress",id:"in-progress-col",items:_e(m)},Ke)}
          ${Xt({title:"Resolved",id:"resolved-col",items:_e(I)},Ke)}
          ${G?Xt({title:"Deferred",id:"deferred-col",items:_e(z)},Ke):""}
          ${Xt({title:"Closed",id:"closed-col",items:_e(H),is_closed:!0,closed_range:f},Ke)}
        </div>
      </div>
    `}function Oe(){$e(ot(),e),He()}function He(){try{let N=Array.from(e.querySelectorAll(".board-column"));for(let q of N)Array.from(q.querySelectorAll(".board-card")).forEach((te,ne)=>{te.tabIndex=ne===0?0:-1})}catch{}}async function Ve(N,q){if(!o){oe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:N,status:q}),oe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(re){r("update-status failed: %o",re),oe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function pt(N){switch(N){case"blocked-col":return x;case"ready-col":return S;case"in-progress-col":return m;case"resolved-col":return I;case"deferred-col":return z;default:return[]}}function mt(N,q,re){if(!o||!i)return;let te=pt(N),ne=te.find(v=>v.id===q);if(!ne)return;let he=te.filter(v=>v.id!==q),ge=re.closest?re.closest(".board-card"):null,ke=he.length;if(ge){let v=ge.getAttribute("data-issue-id");if(v===q)return;let F=he.findIndex(C=>C.id===v);F>=0&&(ke=F)}let ae=he.slice();ae.splice(ke,0,ne),b.applyReorder(q,ae,ke)}function it(){for(let N of Array.from(e.querySelectorAll(".board-column--drag-over")))N.classList.remove("board-column--drag-over")}let qe=null;e.addEventListener("dragover",N=>{N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move");let re=N.target.closest(".board-column");re&&re!==qe&&(qe&&qe.classList.remove("board-column--drag-over"),re.classList.add("board-column--drag-over"),qe=re)}),e.addEventListener("dragleave",N=>{let q=N.relatedTarget;(!q||!e.contains(q))&&qe&&(qe.classList.remove("board-column--drag-over"),qe=null)}),e.addEventListener("drop",N=>{N.preventDefault(),qe&&(qe.classList.remove("board-column--drag-over"),qe=null);let q=N.target,re=q.closest(".board-column");if(!re)return;let te=N.dataTransfer?.getData("text/plain")||"";if(!te)return;let ne=re.id,he=M.get(te);if(he&&he===ne){if(Xa.has(ne)){if(E!=="manual"){oe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}mt(ne,te,q)}return}let ge=Za[ne];if(!ge){oe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}T.get(te)!==ge&&Ve(te,ge)}),e.addEventListener("keydown",N=>{let q=N.target;if(!(q instanceof HTMLElement))return;let re=String(q.tagName||"").toLowerCase();if(re==="input"||re==="textarea"||re==="select"||re==="button"||re==="a"||q.isContentEditable===!0)return;let te=q.closest(".board-card");if(!te)return;let ne=String(N.key||"");if(ne==="Enter"||ne===" "){N.preventDefault();let ae=te.getAttribute("data-issue-id");ae&&n(ae);return}if(ne!=="ArrowUp"&&ne!=="ArrowDown"&&ne!=="ArrowLeft"&&ne!=="ArrowRight")return;N.preventDefault();let he=te.closest(".board-column");if(!he)return;let ge=Array.from(he.querySelectorAll(".board-card")),ke=ge.indexOf(te);if(ne==="ArrowDown"&&ke<ge.length-1){Qe(te,ge[ke+1]);return}if(ne==="ArrowUp"&&ke>0){Qe(te,ge[ke-1]);return}if(ne==="ArrowLeft"||ne==="ArrowRight"){let ae=Array.from(e.querySelectorAll(".board-column")),v=ae.indexOf(he),F=ne==="ArrowRight"?1:-1,C=v+F;for(;C>=0&&C<ae.length;){let ee=ae[C].querySelector(".board-card");if(ee){Qe(te,ee);return}C+=F}}});function Qe(N,q){try{N.tabIndex=-1,q.tabIndex=0,q.focus()}catch{}}let we=null;_&&_.subscribe&&(we=_.subscribe(()=>{try{g()}catch{}}));let We=null;return l&&l.subscribe&&(We=l.subscribe(()=>{try{g()}catch{}})),{async load(){r("load"),g()},clear(){Xe(),we&&(we(),we=null),We&&(We(),We=null),e.replaceChildren(),x=[],S=[],m=[],I=[],z=[],H=[],T=new Map,M=new Map}}}function On(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function pr(e,t){return e.filter(r=>{let n=On(r);return!(n&&t.has(n))})}async function Ja(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Qt(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var el="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Dt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function vo(e){let t=0;for(let r of Dt)t+=Jt(e?.[r]);return t}function yo(e){return!e||typeof e!="object"?!1:Dt.some(t=>Number.isFinite(e[t]))}function tl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function fr(e){return yo(e)?`\u03C4 ${tl(vo(e))}`:null}function Bt(e){let t=fr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Jr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${vo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(el),r.join(`
`)}function Et(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,i=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let a=l.usage;if(yo(a)){n+=1;for(let c of Dt)r[c]=Jt(r[c])+Jt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o+=1),a.replayed===!0&&(i=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),i&&(r.replayed=!0),r)}var rl={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},nl=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,sl=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Ut(e){return!!e&&typeof e=="object"}function Mn(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function $o(e,t){let r=Mn(e),n=Mn(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function ol(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Ut(s)&&typeof s.text=="string"?s.text:"").join(""):Ut(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function il(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:rl[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Mn(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$o(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=$o(Ut(l)?l.old_string:"",Ut(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function xo(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=nl.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:sl.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function al(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Ut(o)){if(o.type==="text"&&typeof o.text=="string")s.push(xo(o.text));else if(o.type==="tool_use"){let i=il(o);typeof o.id=="string"&&t.set(o.id,i),s.push(i)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Ut(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let i=ol(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function ll(e){if(e.type==="item.completed"&&Ut(e.item)){let t=e.item;return t.type==="agent_message"&&typeof t.text=="string"?[xo(t.text)]:t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function cl(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function So(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Ut(o))continue;let i=cl(o)?ll(o):al(o,r);for(let l of i)t.push(l)}return t}var dl=5;function ul(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:yt(e,t)}function en(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,i={},l=!0,a=new Set,c=new Set,f=null,_=null;function b(){if(!o||!n)return[];let A=n.get(o);return So(A?A.lines:[])}function x(){if(!o||!n)return null;let A=n.get(o),g=A?A.last_event_at:null;return typeof g=="number"?g:null}function S(){return i.status==="running"}function m(){if(S()&&o){_||(_=setInterval(()=>$(),1e3));return}I()}function I(){_&&(clearInterval(_),_=null)}function z(A){let g=[],L=0;for(;L<A.length;){let B=A[L];if(B.kind==="tool"){let W=L;for(;W<A.length&&A[W].kind==="tool"&&A[W].tool===B.tool;)W+=1;if(W-L>=dl&&!c.has(L)){g.push({kind:"group",idx:L,tool:B.tool||"",lines:A.slice(L,W).map((V,Q)=>({idx:L+Q,line:V}))}),L=W;continue}}g.push({kind:"line",idx:L,line:B}),L+=1}return g}function H(A){for(let g=A.length-1;g>=0;g-=1){let L=A[g];if(L.kind==="result"||L.kind==="error")return null;if(L.kind==="tool"&&!Object.hasOwn(L,"result"))return L}return null}function G(A,g){if(g.kind==="gate")return d`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return d`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return d`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let L=a.has(A),B=g.tool==="Bash"?g.command:g.path||g.command||"";return d`<div
        class="sv__tool${L?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>K(A)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${B?d`<span class="sv__tool-detail">${B}</span>`:""}
          ${typeof g.added=="number"?d`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?d`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?d`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${L?d`<pre class="sv__tool-expand">${P(g)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${g.text}</div>`}function P(A){let g=[];if(A.input!==void 0)try{g.push(`input: ${JSON.stringify(A.input,null,2)}`)}catch{}return typeof A.output=="string"&&A.output.length>0&&g.push(`output:
${A.output}`),g.join(`

`)}function E(){if(!o)return d``;let A=b(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),L=i.session_id||"",B=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,W=S(),V=W?ul(x(),Date.now()):"",Q=W?H(A):null;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${W?d`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${V?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${V}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${V?d`<span class="sv__live-ago">${V}</span>`:""}</span
            >`:""}
        ${L?d`<button
              type="button"
              class="sv__session"
              title=${L}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${L}`}
              @click=${()=>ie(L)}
            >
              ⧉ ${L.slice(0,8)}
            </button>`:""}
        ${g?d`<span class="sv__meta">${g}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${B}
          @click=${X}
        >
          <span class="sv__follow-full">⇣ ${B}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Z()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${A.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:z(A).map(de=>de.kind==="group"?T(de):G(de.idx,de.line))}
      </div>
      ${Q?d`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            <span class="sv__now-icon">${Q.icon}</span>
            <span class="sv__now-name">${Q.tool}</span>
            <span class="sv__now-detail"
              >${Q.tool==="Bash"?Q.command:Q.path||Q.command||""}</span
            >
          </div>`:""}
    </div>`}function T(A){return d`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>M(A.idx)}
    >
      <span class="sv__group-icon">${A.lines[0].line.icon}</span>
      <span class="sv__group-name">${A.tool}</span>
      <span class="sv__group-count">${A.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function M(A){c.add(A),$()}function $(){$e(E(),e),m(),l&&Y()}function Y(){let A=e.querySelector(".sv__body");A&&(A.scrollTop=A.scrollHeight)}function K(A){a.has(A)?a.delete(A):a.add(A),$()}function X(){l=!l,$()}function ie(A){Qt(A).then(g=>{g?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function be(A){!o||!A||(i={...i,...A},$())}function Ie(A){let g=A.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,$())}e.addEventListener("scroll",Ie,!0);function _e(A){let g=A&&A.attempt_id;g&&(o=g,i=A.meta||{},l=!0,a.clear(),c.clear(),!f&&n&&(f=n.subscribe($)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),$())}function Z(){let A=o;o=null,a.clear(),c.clear(),I(),r&&A&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${A}`})).catch(()=>{}),$e(d``,e),s&&s()}return{open:_e,updateMeta:be,close:Z,isOpen(){return o!==null},destroy(){I(),f&&(f(),f=null),e.removeEventListener("scroll",Ie,!0),o=null,$e(d``,e)}}}function pl(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function Ao(e,t){let r=pl(e);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
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
                  @click=${s=>t.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Nn=["opus","sonnet","haiku","fable"],Pn=["low","medium","high","xhigh"],Fn=["codex","opus","fable","self","skip"],qn=["opus","fable","sonnet","haiku"],fl=["standard","fast_track"],Bn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function tn(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Bn[e]||"(\uAE30\uBCF8)"}function $r(e,t,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${i=>o.onChange(e,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function xr(e,t){let r=e.map(n=>({value:n,label:n}));return typeof t=="string"?[{value:"",label:t},...r]:r}function To(e,t,r){let n=e&&e.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${$r("orchestration_model","orchestration_model",xr(Nn,tn("orchestration_model",s)),n.orchestration_model||"",!1,t)}
    ${$r("orchestration_effort","orchestration_effort",xr(Pn,tn("orchestration_effort",s)),n.orchestration_effort||"",!1,t)}
    ${$r("review_model","review_model",xr(Fn,tn("review_model",s)),n.review_model||"",!1,t)}
    ${$r("impl_model","impl_model",xr(qn,tn("impl_model",s)),n.impl_model||"",!1,t)}
    ${$r("workflow_mode","workflow_mode",xr(fl),o,n.workflow_mode==="fast_track",t)}
  `}var{entries:No,setPrototypeOf:Eo,isFrozen:_l,getPrototypeOf:hl,getOwnPropertyDescriptor:ml}=Object,{freeze:ct,seal:kt,create:Yn}=Object,{apply:Vn,construct:Kn}=typeof Reflect<"u"&&Reflect;ct||(ct=function(t){return t});kt||(kt=function(t){return t});Vn||(Vn=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Kn||(Kn=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var rn=dt(Array.prototype.forEach),gl=dt(Array.prototype.lastIndexOf),Co=dt(Array.prototype.pop),Sr=dt(Array.prototype.push),bl=dt(Array.prototype.splice),sn=dt(String.prototype.toLowerCase),Un=dt(String.prototype.toString),zn=dt(String.prototype.match),Ar=dt(String.prototype.replace),wl=dt(String.prototype.indexOf),kl=dt(String.prototype.trim),$t=dt(Object.prototype.hasOwnProperty),lt=dt(RegExp.prototype.test),Tr=vl(TypeError);function dt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Vn(e,t,n)}}function vl(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Kn(e,r)}}function me(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:sn;Eo&&Eo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(_l(t)||(t[n]=o),s=o)}e[s]=!0}return e}function yl(e){for(let t=0;t<e.length;t++)$t(e,t)||(e[t]=null);return e}function Ot(e){let t=Yn(null);for(let[r,n]of No(e))$t(e,r)&&(Array.isArray(n)?t[r]=yl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ot(n):t[r]=n);return t}function Er(e,t){for(;e!==null;){let n=ml(e,t);if(n){if(n.get)return dt(n.get);if(typeof n.value=="function")return dt(n.value)}e=hl(e)}function r(){return null}return r}var Ro=ct(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Hn=ct(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Wn=ct(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$l=ct(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Gn=ct(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xl=ct(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Io=ct(["#text"]),Lo=ct(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),jn=ct(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Do=ct(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),nn=ct(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Sl=kt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Al=kt(/<%[\w\W]*|[\w\W]*%>/gm),Tl=kt(/\$\{[\w\W]*/gm),El=kt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Cl=kt(/^aria-[\-\w]+$/),Po=kt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Rl=kt(/^(?:\w+script|data):/i),Il=kt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Fo=kt(/^html$/i),Ll=kt(/^[a-z][.\w]*(-[.\w]+)+$/i),Oo=Object.freeze({__proto__:null,ARIA_ATTR:Cl,ATTR_WHITESPACE:Il,CUSTOM_ELEMENT:Ll,DATA_ATTR:El,DOCTYPE_NAME:Fo,ERB_EXPR:Al,IS_ALLOWED_URI:Po,IS_SCRIPT_OR_DATA:Rl,MUSTACHE_EXPR:Sl,TMPLIT_EXPR:Tl}),Cr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Dl=function(){return typeof window>"u"?null:window},Ol=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Mo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function qo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Dl(),t=D=>qo(D);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Cr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:f=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:b,trustedTypes:x}=e,S=a.prototype,m=Er(S,"cloneNode"),I=Er(S,"remove"),z=Er(S,"nextSibling"),H=Er(S,"childNodes"),G=Er(S,"parentNode");if(typeof i=="function"){let D=r.createElement("template");D.content&&D.content.ownerDocument&&(r=D.content.ownerDocument)}let P,E="",{implementation:T,createNodeIterator:M,createDocumentFragment:$,getElementsByTagName:Y}=r,{importNode:K}=n,X=Mo();t.isSupported=typeof No=="function"&&typeof G=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ie,ERB_EXPR:be,TMPLIT_EXPR:Ie,DATA_ATTR:_e,ARIA_ATTR:Z,IS_SCRIPT_OR_DATA:A,ATTR_WHITESPACE:g,CUSTOM_ELEMENT:L}=Oo,{IS_ALLOWED_URI:B}=Oo,W=null,V=me({},[...Ro,...Hn,...Wn,...Gn,...Io]),Q=null,de=me({},[...Lo,...jn,...Do,...nn]),le=Object.seal(Yn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,ze=null,Pe=Object.seal(Yn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),rt=!0,Ke=!0,ht=!1,nt=!0,Ze=!1,Xe=!0,st=!1,ot=!1,Oe=!1,He=!1,Ve=!1,pt=!1,mt=!0,it=!1,qe="user-content-",Qe=!0,we=!1,We={},N=null,q=me({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),re=null,te=me({},["audio","video","img","source","image","track"]),ne=null,he=me({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ge="http://www.w3.org/1998/Math/MathML",ke="http://www.w3.org/2000/svg",ae="http://www.w3.org/1999/xhtml",v=ae,F=!1,C=null,ee=me({},[ge,ke,ae],Un),Me=me({},["mi","mo","mn","ms","mtext"]),u=me({},["annotation-xml"]),k=me({},["title","style","font","a","script"]),O=null,ce=["application/xhtml+xml","text/html"],Ae="text/html",pe=null,Se=null,Ce=r.createElement("form"),Ge=function(p){return p instanceof RegExp||p instanceof Function},et=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Se&&Se===p)){if((!p||typeof p!="object")&&(p={}),p=Ot(p),O=ce.indexOf(p.PARSER_MEDIA_TYPE)===-1?Ae:p.PARSER_MEDIA_TYPE,pe=O==="application/xhtml+xml"?Un:sn,W=$t(p,"ALLOWED_TAGS")?me({},p.ALLOWED_TAGS,pe):V,Q=$t(p,"ALLOWED_ATTR")?me({},p.ALLOWED_ATTR,pe):de,C=$t(p,"ALLOWED_NAMESPACES")?me({},p.ALLOWED_NAMESPACES,Un):ee,ne=$t(p,"ADD_URI_SAFE_ATTR")?me(Ot(he),p.ADD_URI_SAFE_ATTR,pe):he,re=$t(p,"ADD_DATA_URI_TAGS")?me(Ot(te),p.ADD_DATA_URI_TAGS,pe):te,N=$t(p,"FORBID_CONTENTS")?me({},p.FORBID_CONTENTS,pe):q,Le=$t(p,"FORBID_TAGS")?me({},p.FORBID_TAGS,pe):Ot({}),ze=$t(p,"FORBID_ATTR")?me({},p.FORBID_ATTR,pe):Ot({}),We=$t(p,"USE_PROFILES")?p.USE_PROFILES:!1,rt=p.ALLOW_ARIA_ATTR!==!1,Ke=p.ALLOW_DATA_ATTR!==!1,ht=p.ALLOW_UNKNOWN_PROTOCOLS||!1,nt=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ze=p.SAFE_FOR_TEMPLATES||!1,Xe=p.SAFE_FOR_XML!==!1,st=p.WHOLE_DOCUMENT||!1,He=p.RETURN_DOM||!1,Ve=p.RETURN_DOM_FRAGMENT||!1,pt=p.RETURN_TRUSTED_TYPE||!1,Oe=p.FORCE_BODY||!1,mt=p.SANITIZE_DOM!==!1,it=p.SANITIZE_NAMED_PROPS||!1,Qe=p.KEEP_CONTENT!==!1,we=p.IN_PLACE||!1,B=p.ALLOWED_URI_REGEXP||Po,v=p.NAMESPACE||ae,Me=p.MATHML_TEXT_INTEGRATION_POINTS||Me,u=p.HTML_INTEGRATION_POINTS||u,le=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ge(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(le.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ge(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(le.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(le.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ze&&(Ke=!1),Ve&&(He=!0),We&&(W=me({},Io),Q=[],We.html===!0&&(me(W,Ro),me(Q,Lo)),We.svg===!0&&(me(W,Hn),me(Q,jn),me(Q,nn)),We.svgFilters===!0&&(me(W,Wn),me(Q,jn),me(Q,nn)),We.mathMl===!0&&(me(W,Gn),me(Q,Do),me(Q,nn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Pe.tagCheck=p.ADD_TAGS:(W===V&&(W=Ot(W)),me(W,p.ADD_TAGS,pe))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Pe.attributeCheck=p.ADD_ATTR:(Q===de&&(Q=Ot(Q)),me(Q,p.ADD_ATTR,pe))),p.ADD_URI_SAFE_ATTR&&me(ne,p.ADD_URI_SAFE_ATTR,pe),p.FORBID_CONTENTS&&(N===q&&(N=Ot(N)),me(N,p.FORBID_CONTENTS,pe)),Qe&&(W["#text"]=!0),st&&me(W,["html","head","body"]),W.table&&(me(W,["tbody"]),delete Le.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,E=P.createHTML("")}else P===void 0&&(P=Ol(x,s)),P!==null&&typeof E=="string"&&(E=P.createHTML(""));ct&&ct(p),Se=p}},fe=me({},[...Hn,...Wn,...$l]),tt=me({},[...Gn,...xl]),bt=function(p){let R=G(p);(!R||!R.tagName)&&(R={namespaceURI:v,tagName:"template"});let j=sn(p.tagName),Re=sn(R.tagName);return C[p.namespaceURI]?p.namespaceURI===ke?R.namespaceURI===ae?j==="svg":R.namespaceURI===ge?j==="svg"&&(Re==="annotation-xml"||Me[Re]):!!fe[j]:p.namespaceURI===ge?R.namespaceURI===ae?j==="math":R.namespaceURI===ke?j==="math"&&u[Re]:!!tt[j]:p.namespaceURI===ae?R.namespaceURI===ke&&!u[Re]||R.namespaceURI===ge&&!Me[Re]?!1:!tt[j]&&(k[j]||!fe[j]):!!(O==="application/xhtml+xml"&&C[p.namespaceURI]):!1},je=function(p){Sr(t.removed,{element:p});try{G(p).removeChild(p)}catch{I(p)}},Je=function(p,R){try{Sr(t.removed,{attribute:R.getAttributeNode(p),from:R})}catch{Sr(t.removed,{attribute:null,from:R})}if(R.removeAttribute(p),p==="is")if(He||Ve)try{je(R)}catch{}else try{R.setAttribute(p,"")}catch{}},ue=function(p){let R=null,j=null;if(Oe)p="<remove></remove>"+p;else{let Ne=zn(p,/^[\r\n\t ]+/);j=Ne&&Ne[0]}O==="application/xhtml+xml"&&v===ae&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Re=P?P.createHTML(p):p;if(v===ae)try{R=new b().parseFromString(Re,O)}catch{}if(!R||!R.documentElement){R=T.createDocument(v,"template",null);try{R.documentElement.innerHTML=F?E:Re}catch{}}let Ye=R.body||R.documentElement;return p&&j&&Ye.insertBefore(r.createTextNode(j),Ye.childNodes[0]||null),v===ae?Y.call(R,st?"html":"body")[0]:st?R.documentElement:Ye},ve=function(p){return M.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Rt=function(p){return p instanceof _&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof f)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Pt=function(p){return typeof l=="function"&&p instanceof l};function at(D,p,R){rn(D,j=>{j.call(t,p,R,Se)})}let Ft=function(p){let R=null;if(at(X.beforeSanitizeElements,p,null),Rt(p))return je(p),!0;let j=pe(p.nodeName);if(at(X.uponSanitizeElement,p,{tagName:j,allowedTags:W}),Xe&&p.hasChildNodes()&&!Pt(p.firstElementChild)&&lt(/<[/\w!]/g,p.innerHTML)&&lt(/<[/\w!]/g,p.textContent)||p.nodeType===Cr.progressingInstruction||Xe&&p.nodeType===Cr.comment&&lt(/<[/\w]/g,p.data))return je(p),!0;if(!(Pe.tagCheck instanceof Function&&Pe.tagCheck(j))&&(!W[j]||Le[j])){if(!Le[j]&&h(j)&&(le.tagNameCheck instanceof RegExp&&lt(le.tagNameCheck,j)||le.tagNameCheck instanceof Function&&le.tagNameCheck(j)))return!1;if(Qe&&!N[j]){let Re=G(p)||p.parentNode,Ye=H(p)||p.childNodes;if(Ye&&Re){let Ne=Ye.length;for(let Be=Ne-1;Be>=0;--Be){let gt=m(Ye[Be],!0);gt.__removalCount=(p.__removalCount||0)+1,Re.insertBefore(gt,z(p))}}}return je(p),!0}return p instanceof a&&!bt(p)||(j==="noscript"||j==="noembed"||j==="noframes")&&lt(/<\/no(script|embed|frames)/i,p.innerHTML)?(je(p),!0):(Ze&&p.nodeType===Cr.text&&(R=p.textContent,rn([ie,be,Ie],Re=>{R=Ar(R,Re," ")}),p.textContent!==R&&(Sr(t.removed,{element:p.cloneNode()}),p.textContent=R)),at(X.afterSanitizeElements,p,null),!1)},Ht=function(p,R,j){if(mt&&(R==="id"||R==="name")&&(j in r||j in Ce))return!1;if(!(Ke&&!ze[R]&&lt(_e,R))){if(!(rt&&lt(Z,R))){if(!(Pe.attributeCheck instanceof Function&&Pe.attributeCheck(R,p))){if(!Q[R]||ze[R]){if(!(h(p)&&(le.tagNameCheck instanceof RegExp&&lt(le.tagNameCheck,p)||le.tagNameCheck instanceof Function&&le.tagNameCheck(p))&&(le.attributeNameCheck instanceof RegExp&&lt(le.attributeNameCheck,R)||le.attributeNameCheck instanceof Function&&le.attributeNameCheck(R,p))||R==="is"&&le.allowCustomizedBuiltInElements&&(le.tagNameCheck instanceof RegExp&&lt(le.tagNameCheck,j)||le.tagNameCheck instanceof Function&&le.tagNameCheck(j))))return!1}else if(!ne[R]){if(!lt(B,Ar(j,g,""))){if(!((R==="src"||R==="xlink:href"||R==="href")&&p!=="script"&&wl(j,"data:")===0&&re[p])){if(!(ht&&!lt(A,Ar(j,g,"")))){if(j)return!1}}}}}}}return!0},h=function(p){return p!=="annotation-xml"&&zn(p,L)},w=function(p){at(X.beforeSanitizeAttributes,p,null);let{attributes:R}=p;if(!R||Rt(p))return;let j={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Q,forceKeepAttr:void 0},Re=R.length;for(;Re--;){let Ye=R[Re],{name:Ne,namespaceURI:Be,value:gt}=Ye,It=pe(Ne),rr=gt,Ue=Ne==="value"?rr:kl(rr);if(j.attrName=It,j.attrValue=Ue,j.keepAttr=!0,j.forceKeepAttr=void 0,at(X.uponSanitizeAttribute,p,j),Ue=j.attrValue,it&&(It==="id"||It==="name")&&(Je(Ne,p),Ue=qe+Ue),Xe&&lt(/((--!?|])>)|<\/(style|title|textarea)/i,Ue)){Je(Ne,p);continue}if(It==="attributename"&&zn(Ue,"href")){Je(Ne,p);continue}if(j.forceKeepAttr)continue;if(!j.keepAttr){Je(Ne,p);continue}if(!nt&&lt(/\/>/i,Ue)){Je(Ne,p);continue}Ze&&rn([ie,be,Ie],qr=>{Ue=Ar(Ue,qr," ")});let nr=pe(p.nodeName);if(!Ht(nr,It,Ue)){Je(Ne,p);continue}if(P&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!Be)switch(x.getAttributeType(nr,It)){case"TrustedHTML":{Ue=P.createHTML(Ue);break}case"TrustedScriptURL":{Ue=P.createScriptURL(Ue);break}}if(Ue!==rr)try{Be?p.setAttributeNS(Be,Ne,Ue):p.setAttribute(Ne,Ue),Rt(p)?je(p):Co(t.removed)}catch{Je(Ne,p)}}at(X.afterSanitizeAttributes,p,null)},J=function D(p){let R=null,j=ve(p);for(at(X.beforeSanitizeShadowDOM,p,null);R=j.nextNode();)at(X.uponSanitizeShadowNode,R,null),Ft(R),w(R),R.content instanceof o&&D(R.content);at(X.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(D){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},R=null,j=null,Re=null,Ye=null;if(F=!D,F&&(D="<!-->"),typeof D!="string"&&!Pt(D))if(typeof D.toString=="function"){if(D=D.toString(),typeof D!="string")throw Tr("dirty is not a string, aborting")}else throw Tr("toString is not a function");if(!t.isSupported)return D;if(ot||et(p),t.removed=[],typeof D=="string"&&(we=!1),we){if(D.nodeName){let gt=pe(D.nodeName);if(!W[gt]||Le[gt])throw Tr("root node is forbidden and cannot be sanitized in-place")}}else if(D instanceof l)R=ue("<!---->"),j=R.ownerDocument.importNode(D,!0),j.nodeType===Cr.element&&j.nodeName==="BODY"||j.nodeName==="HTML"?R=j:R.appendChild(j);else{if(!He&&!Ze&&!st&&D.indexOf("<")===-1)return P&&pt?P.createHTML(D):D;if(R=ue(D),!R)return He?null:pt?E:""}R&&Oe&&je(R.firstChild);let Ne=ve(we?D:R);for(;Re=Ne.nextNode();)Ft(Re),w(Re),Re.content instanceof o&&J(Re.content);if(we)return D;if(He){if(Ve)for(Ye=$.call(R.ownerDocument);R.firstChild;)Ye.appendChild(R.firstChild);else Ye=R;return(Q.shadowroot||Q.shadowrootmode)&&(Ye=K.call(n,Ye,!0)),Ye}let Be=st?R.outerHTML:R.innerHTML;return st&&W["!doctype"]&&R.ownerDocument&&R.ownerDocument.doctype&&R.ownerDocument.doctype.name&&lt(Fo,R.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+R.ownerDocument.doctype.name+`>
`+Be),Ze&&rn([ie,be,Ie],gt=>{Be=Ar(Be,gt," ")}),P&&pt?P.createHTML(Be):Be},t.setConfig=function(){let D=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};et(D),ot=!0},t.clearConfig=function(){Se=null,ot=!1},t.isValidAttribute=function(D,p,R){Se||et({});let j=pe(D),Re=pe(p);return Ht(j,Re,R)},t.addHook=function(D,p){typeof p=="function"&&Sr(X[D],p)},t.removeHook=function(D,p){if(p!==void 0){let R=gl(X[D],p);return R===-1?void 0:bl(X[D],R,1)[0]}return Co(X[D])},t.removeHooks=function(D){X[D]=[]},t.removeAllHooks=function(){X=Mo()},t}var Bo=qo();var Uo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zo=e=>(...t)=>({_$litDirective$:e,values:t}),on=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Rr=class extends on{constructor(t){if(super(t),this.it=Fe,t.type!==Uo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Fe||t==null)return this._t=void 0,this.it=t;if(t===Yt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Rr.directiveName="unsafeHTML",Rr.resultType=1;var Ho=zo(Rr);function Jn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var tr=Jn();function Zo(e){tr=e}var Or={exec:()=>null};function ye(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(ut.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,t)};return n}var Ml=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ut={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Nl=/^(?:[ \t]*(?:\n|$))+/,Pl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Fl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Mr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ql=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,es=/(?:[*+-]|\d{1,9}[.)])/,Xo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Qo=ye(Xo).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Bl=ye(Xo).replace(/bull/g,es).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ts=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ul=/^[^\n]+/,rs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,zl=ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",rs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Hl=ye(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,es).getRegex(),pn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ns=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Wl=ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ns).replace("tag",pn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Jo=ye(ts).replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",pn).getRegex(),Gl=ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Jo).getRegex(),ss={blockquote:Gl,code:Pl,def:zl,fences:Fl,heading:ql,hr:Mr,html:Wl,lheading:Qo,list:Hl,newline:Nl,paragraph:Jo,table:Or,text:Ul},Wo=ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",pn).getRegex(),jl={...ss,lheading:Bl,table:Wo,paragraph:ye(ts).replace("hr",Mr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Wo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",pn).getRegex()},Yl={...ss,html:ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ns).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Or,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ye(ts).replace("hr",Mr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Qo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Vl=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Kl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ei=/^( {2,}|\\)\n(?!\s*$)/,Zl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,fn=/[\p{P}\p{S}]/u,os=/[\s\p{P}\p{S}]/u,ti=/[^\s\p{P}\p{S}]/u,Xl=ye(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,os).getRegex(),ri=/(?!~)[\p{P}\p{S}]/u,Ql=/(?!~)[\s\p{P}\p{S}]/u,Jl=/(?:[^\s\p{P}\p{S}]|~)/u,ec=ye(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ml?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ni=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,tc=ye(ni,"u").replace(/punct/g,fn).getRegex(),rc=ye(ni,"u").replace(/punct/g,ri).getRegex(),si="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",nc=ye(si,"gu").replace(/notPunctSpace/g,ti).replace(/punctSpace/g,os).replace(/punct/g,fn).getRegex(),sc=ye(si,"gu").replace(/notPunctSpace/g,Jl).replace(/punctSpace/g,Ql).replace(/punct/g,ri).getRegex(),oc=ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ti).replace(/punctSpace/g,os).replace(/punct/g,fn).getRegex(),ic=ye(/\\(punct)/,"gu").replace(/punct/g,fn).getRegex(),ac=ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),lc=ye(ns).replace("(?:-->|$)","-->").getRegex(),cc=ye("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",lc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),cn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,dc=ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",cn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),oi=ye(/^!?\[(label)\]\[(ref)\]/).replace("label",cn).replace("ref",rs).getRegex(),ii=ye(/^!?\[(ref)\](?:\[\])?/).replace("ref",rs).getRegex(),uc=ye("reflink|nolink(?!\\()","g").replace("reflink",oi).replace("nolink",ii).getRegex(),Go=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,is={_backpedal:Or,anyPunctuation:ic,autolink:ac,blockSkip:ec,br:ei,code:Kl,del:Or,emStrongLDelim:tc,emStrongRDelimAst:nc,emStrongRDelimUnd:oc,escape:Vl,link:dc,nolink:ii,punctuation:Xl,reflink:oi,reflinkSearch:uc,tag:cc,text:Zl,url:Or},pc={...is,link:ye(/^!?\[(label)\]\((.*?)\)/).replace("label",cn).getRegex(),reflink:ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",cn).getRegex()},Zn={...is,emStrongRDelimAst:sc,emStrongLDelim:rc,url:ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Go).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ye(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Go).getRegex()},fc={...Zn,br:ye(ei).replace("{2,}","*").getRegex(),text:ye(Zn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},an={normal:ss,gfm:jl,pedantic:Yl},Ir={normal:is,gfm:Zn,breaks:fc,pedantic:pc},_c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},jo=e=>_c[e];function Mt(e,t){if(t){if(ut.escapeTest.test(e))return e.replace(ut.escapeReplace,jo)}else if(ut.escapeTestNoEncode.test(e))return e.replace(ut.escapeReplaceNoEncode,jo);return e}function Yo(e){try{e=encodeURI(e).replace(ut.percentDecode,"%")}catch{return null}return e}function Vo(e,t){let r=e.replace(ut.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ut.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ut.slashPipe,"|");return n}function Lr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function hc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ko(e,t,r,n,s){let o=t.href,i=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function mc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var dn=class{constructor(e){Ee(this,"options");Ee(this,"rules");Ee(this,"lexer");this.options=e||tr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Lr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=mc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Lr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Lr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Lr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),f=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${f}`:f;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(f,o,!0),this.lexer.state.top=_,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,S=x.raw+`
`+r.join(`
`),m=this.blockquote(S);o[o.length-1]=m,n=n.substring(0,n.length-x.raw.length)+m.raw,s=s.substring(0,s.length-x.text.length)+m.text;break}else if(b?.type==="list"){let x=b,S=x.raw+`
`+r.join(`
`),m=this.list(S);o[o.length-1]=m,n=n.substring(0,n.length-b.raw.length)+m.raw,s=s.substring(0,s.length-x.raw.length)+m.raw,r=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;e;){let a=!1,c="",f="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,m=>" ".repeat(3*m.length)),b=e.split(`
`,1)[0],x=!_.trim(),S=0;if(this.options.pedantic?(S=2,f=_.trimStart()):x?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,f=_.slice(S),S+=t[1].length),x&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,e=e.substring(b.length+1),a=!0),!a){let m=this.rules.other.nextBulletRegex(S),I=this.rules.other.hrRegex(S),z=this.rules.other.fencesBeginRegex(S),H=this.rules.other.headingBeginRegex(S),G=this.rules.other.htmlBeginRegex(S);for(;e;){let P=e.split(`
`,1)[0],E;if(b=P,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),E=b):E=b.replace(this.rules.other.tabCharGlobal,"    "),z.test(b)||H.test(b)||G.test(b)||m.test(b)||I.test(b))break;if(E.search(this.rules.other.nonSpaceChar)>=S||!b.trim())f+=`
`+E.slice(S);else{if(x||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||z.test(_)||H.test(_)||I.test(_))break;f+=`
`+b}!x&&!b.trim()&&(x=!0),c+=P+`
`,e=e.substring(P.length+1),_=E.slice(S)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(f),loose:!1,text:f,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let f=this.lexer.inlineQueue.length-1;f>=0;f--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[f].src)){this.lexer.inlineQueue[f].src=this.lexer.inlineQueue[f].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let f={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=f.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=f.raw+a.tokens[0].raw,a.tokens[0].text=f.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(f)):a.tokens.unshift({type:"paragraph",raw:f.raw,text:f.raw,tokens:[f]}):a.tokens.unshift(f)}}if(!s.loose){let c=a.tokens.filter(_=>_.type==="space"),f=c.length>0&&c.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=f}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Vo(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Vo(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Lr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=hc(t[2],"()");if(o===-2)return;if(o>-1){let i=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,i).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ko(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ko(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(n=c.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let f=[...n[0]][0].length,_=e.slice(0,s+n.index+f+i);if(Math.min(s,i)%2){let x=_.slice(1,-1);return{type:"em",raw:_,text:x,tokens:this.lexer.inlineTokens(x)}}let b=_.slice(2,-2);return{type:"strong",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},xt=class Xn{constructor(t){Ee(this,"tokens");Ee(this,"options");Ee(this,"state");Ee(this,"inlineQueue");Ee(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||tr,this.options.tokenizer=this.options.tokenizer||new dn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ut,block:an.normal,inline:Ir.normal};this.options.pedantic?(r.block=an.pedantic,r.inline=Ir.pedantic):this.options.gfm&&(r.block=an.gfm,this.options.breaks?r.inline=Ir.breaks:r.inline=Ir.gfm),this.tokenizer.rules=r}static get rules(){return{block:an,inline:Ir}}static lex(t,r){return new Xn(r).lex(t)}static lexInline(t,r){return new Xn(r).inlineTokens(t)}lex(t){t=t.replace(ut.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(ut.tabCharGlobal,"    ").replace(ut.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let i=1/0,l=t.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=t.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(t){let i="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;t;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(f=>(a=f.call({lexer:this},t,r))?(t=t.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(a.raw.length);let f=r.at(-1);a.type==="text"&&f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(t,n,l)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(t)){t=t.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(t)){t=t.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(t))){t=t.substring(a.raw.length),r.push(a);continue}let c=t;if(this.options.extensions?.startInline){let f=1/0,_=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},_),typeof b=="number"&&b>=0&&(f=Math.min(f,b))}),f<1/0&&f>=0&&(c=t.substring(0,f+1))}if(a=this.tokenizer.inlineText(c)){t=t.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let f=r.at(-1);f?.type==="text"?(f.raw+=a.raw,f.text+=a.text):r.push(a);continue}if(t){let f="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(f);break}else throw new Error(f)}}return r}},un=class{constructor(e){Ee(this,"options");Ee(this,"parser");this.options=e||tr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(ut.notSpaceStart)?.[0],s=e.replace(ut.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Mt(n)+'">'+(r?s:Mt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Mt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let i=0;i<e.items.length;i++){let l=e.items[i];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",r="";for(let s=0;s<e.header.length;s++)r+=this.tablecell(e.header[s]);t+=this.tablerow({text:r});let n="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+n+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),r=e.header?"th":"td";return(e.align?`<${r} align="${e.align}">`:`<${r}>`)+t+`</${r}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Mt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Yo(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Mt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Yo(e);if(s===null)return Mt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Mt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Mt(e.text)}},as=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},St=class Qn{constructor(t){Ee(this,"options");Ee(this,"renderer");Ee(this,"textRenderer");this.options=t||tr,this.options.renderer=this.options.renderer||new un,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new as}static parse(t,r){return new Qn(r).parse(t)}static parseInline(t,r){return new Qn(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},ln,Dr=(ln=class{constructor(e){Ee(this,"options");Ee(this,"block");this.options=e||tr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?xt.lex:xt.lexInline}provideParser(){return this.block?St.parse:St.parseInline}},Ee(ln,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Ee(ln,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ln),gc=class{constructor(...e){Ee(this,"defaults",Jn());Ee(this,"options",this.setOptions);Ee(this,"parse",this.parseMarkdown(!0));Ee(this,"parseInline",this.parseMarkdown(!1));Ee(this,"Parser",St);Ee(this,"Renderer",un);Ee(this,"TextRenderer",as);Ee(this,"Lexer",xt);Ee(this,"Tokenizer",dn);Ee(this,"Hooks",Dr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new un(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new dn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Dr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];Dr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&Dr.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await l.call(s,c);return a.call(s,_)})();let f=l.call(s,c);return a.call(s,f)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let _=await l.apply(s,c);return _===!1&&(_=await a.apply(s,c)),_})();let f=l.apply(s,c);return f===!1&&(f=a.apply(s,c)),f}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return xt.lex(e,t??this.defaults)}parser(e,t){return St.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?xt.lex:xt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():e?St.parse:St.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let i=(s.hooks?s.hooks.provideLexer():e?xt.lex:xt.lexInline)(t,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?St.parse:St.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Mt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},er=new gc;function xe(e,t){return er.parse(e,t)}xe.options=xe.setOptions=function(e){return er.setOptions(e),xe.defaults=er.defaults,Zo(xe.defaults),xe};xe.getDefaults=Jn;xe.defaults=tr;xe.use=function(...e){return er.use(...e),xe.defaults=er.defaults,Zo(xe.defaults),xe};xe.walkTokens=function(e,t){return er.walkTokens(e,t)};xe.parseInline=er.parseInline;xe.Parser=St;xe.parser=St.parse;xe.Renderer=un;xe.TextRenderer=as;xe.Lexer=xt;xe.lexer=xt.lex;xe.Tokenizer=dn;xe.Hooks=Dr;xe.parse=xe;var Zu=xe.options,Xu=xe.setOptions,Qu=xe.use,Ju=xe.walkTokens,ep=xe.parseInline;var tp=St.parse,rp=xt.lex;function ai(e){let t=xe.parse(e),r=Bo.sanitize(t);return Ho(r)}function bc(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function li(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(S){S.key==="Escape"&&s&&(S.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${bc(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>b()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:ai(i)}
          </div>
        </div>
      </div>
    `:d``}function f(){$e(c(),e)}async function _(S){s=S,o="loading",i="",l="",f();let m=r?r():"";if(!m){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",f();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",f();return}let I="/api/doc?workspace="+encodeURIComponent(m)+"&path="+encodeURIComponent(S);try{let z=await n(I),H=await z.json().catch(()=>({}));if(!z.ok||!H||H.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(H&&H.error||z.status)+")",f();return}i=String(H.content||""),o="ready",f()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",f()}}function b(){s=null,$e(d``,e)}function x(){document.removeEventListener("keydown",a),b()}return{open:_,close:b,destroy:x}}var wc=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],ci="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function kc(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function vc(e){let t=fr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?d`<span class="detail-usage-partial" title=${ci}
          >부분 집계</span
        >`:""}`}function yc(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${wc.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${kc(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?d`<span class="detail-session__usage-note">${ci}</span>`:""}
  </div>`}var $c={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function xc(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function di(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let _=typeof c.session_id=="string"&&c.session_id.length>0,b=o.has(c.attempt_id),x=_&&!b,S=_?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!x}
      title=${S}
      @click=${m=>{m.stopPropagation(),x&&t.onResume&&t.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let _=c.cause_detail,b=_&&typeof _.reason=="string"&&_.reason.length>0?typeof _.command=="string"&&_.command.length>0?`${_.reason} \xB7 ${_.command}`:_.reason:c.cause;return d`<div class="detail-session__cause" title=${b}>
      ${c.cause}
    </div>`},a=c=>{if(!fr(c.usage))return"";let f=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${vc(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(c=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${c.status||"unknown"}"
              data-attempt-id=${c.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(c.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${$c[c.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${c.attempt_id}</span>
              ${c.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${c.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[c.runner,c.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${c.session_id?d`<span class="detail-session__sid" title=${c.session_id}
                    >${String(c.session_id).slice(0,8)}</span
                  >`:""}
              ${fr(c.usage)?d`<span class="detail-session__usage"
                    >${fr(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${xc(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?yc(c.usage):""}
          </div>`)}
    </div>
  `}var Sc=["open","in_progress","deferred","resolved","closed"],Ac=[0,1,2,3,4];function ui(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,i=t.queueStore,l=t.sessionLogStore,a=null,c=null,f={},_=!1,b=!1,x="",S="",m="";function I(){_=!1,b=!1,x="",S="",m=""}let z=document.createElement("div");z.className="md-viewer-root",document.body.appendChild(z);let H=li(z,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let P=en(G,{transport:s?(v,F)=>Promise.resolve(s(v,F)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let v=i.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(C=>C&&C.bead_id===a).sort((C,ee)=>(ee.started_at||0)-(C.started_at||0)).map(C=>({attempt_id:C.attempt_id,bead_id:C.bead_id,status:C.status,started_at:typeof C.started_at=="number"?C.started_at:null,runner:C.runner||null,model:C.model||null,session_id:C.session_id||null,resumed_from:C.resumed_from||null,dismissed_at:typeof C.dismissed_at=="number"?C.dismissed_at:null,cause:typeof C.cause=="string"?C.cause:null,cause_detail:C.cause_detail||null,usage:C.usage||null}))}function T(){if(!i||!a)return null;let v=i.get();return Et(v&&v.attempts||{},a)}let M=new Set;function $(v){M.has(v)?M.delete(v):M.add(v),ae()}function Y(v){let F=i?i.get():null,C=F&&F.attempts?F.attempts[v]:null;P.open({attempt_id:v,meta:C?{runner:C.runner||void 0,model:C.model||void 0,effort:C.effort||void 0,status:C.status||void 0,session_id:C.session_id||void 0}:{}})}async function K(v){if(!s||!v)return;let F=()=>{let ee=i?i.get():null;return ee&&typeof ee.revision=="number"?ee.revision:0},C=await s("worker-attempt-resume",{attempt_id:v,expected_revision:F()});if(C&&C.conflict){let ee=C.queue&&typeof C.queue.revision=="number"?C.queue.revision:F();C=await s("worker-attempt-resume",{attempt_id:v,expected_revision:ee})}C&&C.resumed===!1&&!C.conflict&&C.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${C.reason}`,"error",2400)}let X={onOpen:Y,onResume:K,onToggleUsage:$};function ie(){let v=i?i.get():null,F=v&&v.exec_defaults;return F&&typeof F=="object"?F:{}}let be=null;r&&r.subscribe&&(be=r.subscribe(()=>Z()));let Ie=null;i&&typeof i.subscribe=="function"&&(Ie=i.subscribe(()=>{a&&ae()}));function _e(v){v.key==="Escape"&&a&&(v.preventDefault(),n())}document.addEventListener("keydown",_e);function Z(){if(a){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+a)||[];c=v.find(C=>C&&C.id===a)||v[0]||c}ae()}}function A(v){Qt(v).then(F=>{F?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function g(v){v.preventDefault(),v.stopPropagation(),a&&A(a)}function L(v,F){v.preventDefault(),v.stopPropagation(),A(F)}function B(v,F){v.preventDefault(),v.stopPropagation(),H.open(F)}function W(v,F){f[v]=F,ae(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:v,value:F})).catch(()=>{oe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function V(v,F,C){if(!s||!a)return!1;try{let ee=await Promise.resolve(s(v,F)),Me=Array.isArray(ee)?ee[0]:ee;return Me&&typeof Me=="object"&&Me.id?(c=Me,!0):(oe(C,"error"),!1)}catch{return oe(C,"error"),!1}}function Q(v){setTimeout(()=>{try{let F=e.querySelector(v);F&&typeof F.focus=="function"&&F.focus()}catch{}},0)}function de(){_=!0,x=c&&c.title||"",ae(),Q('.detail-edit__input[data-edit="title"]')}function le(v){x=v.target.value}function Le(){_=!1,x="",ae()}function ze(){V("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F&&(_=!1,x=""),ae()})}function Pe(){b=!0,S=c&&c.description||"",ae(),Q('.detail-edit__textarea[data-edit="description"]')}function rt(v){S=v.target.value}function Ke(){b=!1,S="",ae()}function ht(){V("edit-text",{id:a,field:"description",value:S},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(F=>{F&&(b=!1,S=""),ae()})}function nt(v,F,C,ee){if(v.key==="Escape"){v.stopPropagation(),C();return}v.key==="Enter"&&(!ee||v.ctrlKey||v.metaKey)&&(v.preventDefault(),F())}function Ze(v){let F=v.target.value;V("update-status",{id:a,status:F},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ae())}function Xe(v){let F=Number(v.target.value);V("update-priority",{id:a,priority:F},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ae())}function st(v){m=v.target.value}function ot(){let v=m.trim();v.length!==0&&V("label-add",{id:a,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(F=>{F&&(m=""),ae()})}function Oe(v){if(v.key==="Escape"){v.stopPropagation(),m="",ae();return}v.key==="Enter"&&(v.preventDefault(),ot())}function He(v){V("label-remove",{id:a,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ae())}let Ve={onCopyPath:L,onOpenDoc:B},pt={onChange:W};function mt(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function it(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function qe(v){let C=(Array.isArray(v.dependencies)?v.dependencies:[]).map(ee=>({id:mt(ee),icon:it(ee)})).filter(ee=>ee.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${C.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${C.map(ee=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(ee.id)}
                  >
                    ${ee.icon?`${ee.icon} `:""}${ee.id}
                  </button>`:d`<span class="detail-dep"
                    >${ee.icon?`${ee.icon} `:""}${ee.id}</span
                  >`)}
          </div>`}
    `}function Qe(v){let F=v.metadata||{},C=v.workflow||{},ee=C.stages||{},Me=ee.spec&&ee.spec.stale,u=ee.impl&&ee.impl.stale,k=C.route_source==="derived",O=C.route||F.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${k?" detail-kv__v--derived":""}"
          title=${k?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${k&&C.route?`${O} ? (\uCD94\uB860)`:O}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${F.spec_review||"\uC5C6\uC74C"}${Me?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${F.impl_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      ${F.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${F.pr_url}</span>
          </div>`:""}
    `}let we={route:["spec_backed","full_plan"]};async function We(v,F){let C=F.target.value;if(v==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&C!=="full_plan"&&!window.confirm(`full_plan \u2192 ${C||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ae();return}await V("update-workflow-meta",{id:a,key:v,value:C},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ae()}function N(v){let F=v.metadata||{};return d` ${((ee,Me)=>{let u=we[ee],k=typeof F[ee]=="string"?F[ee]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${ee}
          data-edit=${`wfmeta-${ee}`}
          @change=${O=>We(ee,O)}
        >
          <option value="" ?selected=${!u.includes(k)}>
            ${Me}
          </option>
          ${u.map(O=>d`<option value=${O} ?selected=${k===O}>${O}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function q(v){return _?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${le}
            @keydown=${F=>nt(F,ze,Le,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${ze}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Le}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${de}
        >
          ✎
        </button>
      </div>
    `}function re(v){let F=_t(v.created_at),C=_t(v.updated_at);return!F&&!C?d``:d`
      ${F?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
      ${C?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${C}</span>
          </div>`:""}
    `}function te(v,F){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ze}
        >
          ${Sc.map(C=>d`<option value=${C} ?selected=${C===v}>${C}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Xe}
        >
          ${Ac.map(C=>d`<option value=${String(C)} ?selected=${C===F}>
                P${C}
              </option>`)}
        </select>
      </div>
    `}function ne(v){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Pe}
            >
              ✎
            </button>`}
      </div>
      ${b?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${S}
              @input=${rt}
              @keydown=${F=>nt(F,ht,Ke,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ht}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ke}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function he(v){let F=typeof v.notes=="string"?v.notes:"";return F.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${F}</div>
    `}function ge(v){let F=Array.isArray(v.labels)?v.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${F.map(C=>d`<span class="detail-label-chip"
              >${C}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${C}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+C}
                @click=${()=>He(C)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${m}
            @input=${st}
            @keydown=${Oe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ot}
          >
            추가
          </button>
        </span>
      </div>
    `}function ke(){if(!a)return d``;let v=c||{},F=String(v.id||a),C=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",ee=v.status||"open",Me=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",u=v.description||"",k={...v,metadata:{...v.metadata||{},...f}};return d`
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
            @click=${g}
          >
            ${F}
          </button>
          ${q(C)} ${te(ee,Me)}
          ${re(v)} ${ne(u)}
          ${he(v)} ${ge(v)} ${qe(v)}
          ${Qe(v)} ${N(v)}
          ${Ao(v,Ve)}
          ${To(k,pt,ie())}
          ${di(E(),X,{total:T(),expanded:M})}
        </div>
      </div>
    `}function ae(){$e(ke(),e)}return{load(v){v!==a&&(f={},I()),a=v,c=null,Z()},clear(){a=null,c=null,f={},I(),H.close(),P.close(),$e(d``,e)},destroy(){be&&(be(),be=null),Ie&&(Ie(),Ie=null),document.removeEventListener("keydown",_e),H.destroy(),z.parentNode&&z.parentNode.removeChild(z),P.destroy(),G.parentNode&&G.parentNode.removeChild(G),a=null,c=null,$e(d``,e)}}}var Tc=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function pi(e,t){return Dn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ec(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function fi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let i="";async function l(T){let M=r.get();if(M)try{let $=await n("display-policy-set",{expected_revision:M.revision,policy:T(M)});a($),$&&$.conflict&&$.policy&&($=await n("display-policy-set",{expected_revision:$.policy.revision,policy:T($.policy)}),a($)),$&&$.conflict&&oe("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{oe("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function c(T){let M=r.get();if(!M)return;let $=pi(T,M)!=="shown";l(Y=>Ec(T,Y,$))}function f(){let T=i.trim();T.length!==0&&(i="",l(M=>M.hidden_prefixes.includes(T)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,T]}),I())}function _(T){l(M=>({hidden_prefixes:M.hidden_prefixes.filter($=>$!==T)}))}function b(T){let M=r.get();if(!M)return;let $=M.chips[T]===!1;l(()=>({chips:{[T]:$}}))}function x(T){let M=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${M.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${M.map($=>{let Y=pi($,T);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${Y}`}
                  data-label=${$}
                  data-state=${Y}
                  @click=${()=>c($)}
                >
                  ${$}
                </button>`})}
            </div>`}
      </section>
    `}function S(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(M=>d`<span class="display-settings__prefix">
                ${M}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${M} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>_(M)}
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
            .value=${i}
            @input=${M=>{i=String(M.target.value||"")}}
          />
          <button type="button" @click=${f}>추가</button>
        </div>
      </section>
    `}function m(T){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Tc.map(([M,$])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${M}
                  .checked=${T.chips[M]!==!1}
                  @change=${()=>b(M)}
                />
                <span>${$}</span>
              </label>`)}
        </div>
      </section>
    `}function I(){let T=r.get();$e(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${E}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${T?d`${x(T)} ${S(T)}
                ${m(T)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let z=!1,H=()=>{z=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let G=null;r.subscribe&&(G=r.subscribe(()=>{z&&I()}));function P(){z||(i="",z=!0,I(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){z&&(z=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:E,destroy(){z=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),G&&(G(),G=null),o.remove()}}}function _i(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),i=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},a=(c,f,_="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=f||"An unrecoverable error occurred.");let b=typeof _=="string"?_.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),t.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return t}}}function hi(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function mi(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Cc={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},gi=160;function Rc(e){return e.length>gi?`${e.slice(0,gi)}\u2026`:e}var Ic=[{key:"orchestration_model",values:()=>Nn},{key:"orchestration_effort",values:()=>Pn},{key:"review_model",values:()=>Fn},{key:"impl_model",values:()=>qn}];function _n(e,t){let{queueStore:r,transport:n,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let $=i();return typeof $.revision=="number"?$.revision:0}function a(){let $=i().exec_defaults;return $&&typeof $=="object"?$:{}}function c($){$&&$.queue&&r&&r.set($.queue)}async function f($,Y){if(!n)return;let K={key:$,value:Y||null};try{let X=await n("worker-queue-set-exec-default",{...K,expected_revision:l()});c(X),X&&X.conflict&&(X=await n("worker-queue-set-exec-default",{...K,expected_revision:l()}),c(X)),X&&X.conflict&&oe("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{oe("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function _($,Y,K){let X=!!K&&!Y.includes(K);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${$}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${$}`}
        data-key=${$}
        @change=${ie=>{f($,ie.target.value)}}
      >
        <option value="" ?selected=${!K}>
          ${Bn[$]||"(\uAE30\uBCF8)"}
        </option>
        ${X?d`<option value=${K} ?selected=${!0}>
              ${K} (비호환)
            </option>`:""}
        ${Y.map(ie=>d`<option value=${ie} ?selected=${K===ie}>${ie}</option>`)}
      </select>
    </div>`}function b(){let $=i().workspace_info;return $&&typeof $=="object"?$:{}}function x($,Y){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${$}"
      >${Y}</span
    >`}function S($){let Y=$?mi($.cmd):"",K=$?hi($.timeout_ms):"",X=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${Y?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${Y}</span>
            ${x("config","config")}
            ${K?d`<span class="exec-defaults__vd-meta"
                  >timeout ${K}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function m($){let Y=$?mi($.cmd):"",K=$?hi($.timeout_ms):"",X=K?`timeout ${K} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ie=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${Y?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${Y}</span>
            ${x("config","config")}
            ${$.detached===!0?x("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${X}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ie}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function I($){if(!$||typeof $!="object")return"";let Y=Cc[String($.outcome)];if(!Y)return"";let K=$.outcome==="failed"&&$.reason?`${Y.label} \xB7 ${$.reason}`:Y.label,X=[_t($.at),typeof $.bead_id=="string"?$.bead_id:"",typeof $.base_sha=="string"?$.base_sha.slice(0,7):""].filter(Ie=>Ie.length>0).join(" \xB7 "),ie=typeof $.detail=="string"&&$.detail.length>0?Rc($.detail):"",be=typeof $.log_path=="string"&&$.log_path.length>0?$.log_path:"";return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${x(Y.modifier,K)}
        ${X?d`<span class="exec-defaults__vd-meta">${X}</span>`:""}
      </div>
      ${ie?d`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ie}</code>
          </div>`:""}
      ${be?d`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${be}</code>
          </div>`:""}
    </div>`}function z($){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${S($.verify_cmd)} ${m($.deploy_cmd)}
      ${I($.last_deploy)}
    </section>`}function H(){let $=a();$e(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${M}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            <p class="exec-defaults__hint">
              워크스페이스 전역 기본값입니다. bead metadata가 우선하며, '(기본:
              …)'은 이 전역값도 미설정일 때 실제 적용되는 하드코딩·CLI·워크플로
              기본입니다.
            </p>
            ${Ic.map(Y=>_(Y.key,Y.values(),$[Y.key]||""))}
            ${z(b())}
          </div>
        </div>
      `,o)}let G=!1,P=()=>{G=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{G&&H()}));function T(){G||(G=!0,H(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function M(){G&&(G=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:T,close:M,destroy(){G=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),E&&(E(),E=null),o.remove()}}}function _r(e){let t=yt(e.created_at),r=yt(e.updated_at);return!t&&!r?"":d`<div class="worker-mini__meta">
    ${t?d`<span title=${`\uC0DD\uC131 ${_t(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${_t(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Nr(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Bt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!o,l=i?yt(e.done_at):"",a=t?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",c=e.workspace_name?d`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,_=d`<span class="worker-mini__title">${e.title}</span>`,b=e.pr_url&&e.pr_number?d`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=r.map(T=>T===e.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${T}</span
        >`:d`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${T}</span
        >`),S=e.reason?d`<span class="worker-mini__reason">${e.reason}</span>`:"",m=n?d`<span class="worker-usage" title=${Jr(e.usage)}
        >${n}</span
      >`:"",I=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",z=e.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",G=e.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=e.revise_action?d`<button
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
        </button>`:"",E=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?d`<div class="worker-mini__row1">${c}${f}${_}</div>
          <div class="worker-mini__row2">
            ${m}${l?d`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${_t(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${x}${I}
            <span class="worker-mini__actions"
              >${z}${H}${G}</span
            >
            ${_r(e)}
          </div>`:o?d`<div class="worker-mini__head">
              ${a}${c}${f}${b}${x}${S}
            </div>
            <div class="worker-mini__body">${_}</div>
            ${E?d`<div class="worker-mini__foot">
                  ${m}${I}
                  <span class="worker-mini__actions"
                    >${z}${H}${G}${P}</span
                  >
                </div>`:""}
            ${_r(e)}`:d`<div class="worker-mini__line">
              ${a}${c}${f}${_}${b}${x}${S}${m}${I}${z}${H}${G}
            </div>
            ${_r(e)}`}
  </div>`}function ls(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return d`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?d`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?Qr(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?d`<span
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${_r(e)}
  </div>`}function Ct(e){let t=!!e.collapsible&&!!e.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?d`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":d`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?d`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?ls(n):Nr(n))}
          </div>`}
  </section>`}var bi=160;function cs(e){return e.length>bi?`${e.slice(0,bi)}\u2026`:e}function Lc(e){return!e||!e.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?d` · <code>${cs(e.command)}</code>`:""}
  </div>`}function Dc(e){return e?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Oc(e){return e?d`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ds(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Mc(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?d`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:d`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${cs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?d`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:d`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?d`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function wi(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return d`<div class="worker-banners">
    ${e.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Lc(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}).
          <!-- capability 발행은 close 뒤에 오는 유일한 단계라 실패해도 close를
               롤백하지 않는다 (UI-4ii4). "resolved로 남아 있다"는 다른 모든
               단계에만 참이므로 여기서만 문안을 바꾼다. -->
          ${r.step==="ship_exported_capabilities"?"bead\uB294 closed\uB85C \uB0A8\uC544 \uC788\uACE0(close\uB294 \uB864\uBC31\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4)":"bead\uB294 resolved\uB85C \uB0A8\uC544 \uC788\uACE0"}
          자동 재시도는 하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${cs(r.detail)}</code>
              </div>`:""}
          ${Oc(r.log_path)} ${Dc(r.output_tail)}
        </div>`)}
    ${Mc(e.shipFailure)}
  </div>`}function Nc(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ds(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=Bt(e.usage),l=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=e.base_exception||null,c=e.attempt_id&&e.attempt_id===r;return d`<div
    class="rtile${c?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${e.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__session"
        title="라이브 세션 열기"
        aria-label="라이브 세션 열기"
      >
        ▤ 세션
      </button>
      ${n?d`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:d`<button
            type="button"
            class="rtile__pause"
            ?disabled=${e.can_pause===!1}
            title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?d`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||i||l||a?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${a?d`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${a}</span
              >`:""}
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${Jr(e.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${_r(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function us(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Nc(s,t,r))}
  </div>`}var Pr=1,Pc=6e4,Fc={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},qc=new Set(["auto_merge","merged","merge","done"]),ki={running:3,paused:2,failed:1};function Bc(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Uc(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let i of r)!i||typeof i.bead_id!="string"||(typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from),s.set(i.bead_id,i.attempt_id));let o=new Map;for(let i of r){if(!i||typeof i.bead_id!="string"||i.bead_id.length===0)continue;let l=null;if(i.status==="running")l="running";else if(i.status==="paused"&&!n.has(i.attempt_id))l="paused";else if(i.status==="failed"||i.status==="orphaned"){let _=t.get(i.bead_id),b=typeof _=="number"&&_>0&&typeof i.finished_at=="number"&&_>=i.finished_at;s.get(i.bead_id)===i.attempt_id&&!b&&typeof i.dismissed_at!="number"&&(l="failed")}if(!l)continue;let a=typeof i.started_at=="number"?i.started_at:null,c=o.get(i.bead_id);if(c){let _=ki[c.run_state],b=ki[l];if(_>b||_===b&&(c.started_at??0)>(a??0))continue}let f=typeof i.session_id=="string"&&i.session_id.length>0;o.set(i.bead_id,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:a,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,model:typeof i.model=="string"?i.model:null,usage:Et(e,i.bead_id),can_pause:l==="running"&&f,can_resume:l!=="running"&&f&&!n.has(i.attempt_id)})}return o}function vi(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Nt(e){return e&&typeof e=="object"?e:{}}function ps(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,i=new Map;for(let m of s)m&&typeof m.root_dir=="string"&&i.set(m.root_dir,m);let l=[],a=[],c=[],f=[],_=[],b=new Map;for(let m of n){if(!m||typeof m.root_dir!="string")continue;let I=m.root_dir,z=m.name||I,H=i.get(I),G=H&&typeof H.revision=="number"?H.revision:typeof m.revision=="number"?m.revision:0,P=Nt(m.attempts),E=Nt(m.bead_titles),T=Nt(m.pr_observations),M=Nt(m.admission),$=Nt(m.revise_parked),Y=Nt(m.merge_queue_state),K=Array.isArray(m.merge_queue)?m.merge_queue:[],X=new Set(K.filter(A=>A&&typeof A.bead_id=="string").map(A=>A.bead_id)),ie=Array.isArray(m.queue)?m.queue:[],be=Array.isArray(m.done)?m.done:[],Ie=new Map;for(let A of be)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&Ie.set(A.bead_id,A.added_at);let _e=A=>({id:A,title:E[A]||A,root_dir:I,workspace_name:z,expected_revision:G,draggable:!1}),Z=new Set;for(let[A,g]of Uc(P,Ie))Z.add(A),a.push({..._e(A),lane:"running",attempt_id:g.attempt_id,run_state:g.run_state,can_pause:g.can_pause,can_resume:g.can_resume,started_at:g.started_at,last_event_at:g.last_event_at,model:g.model,usage:g.usage,badges:g.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:g.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:g.run_state==="failed"});for(let A of Array.isArray(m.pr_wait)?m.pr_wait:[]){let g=A&&A.bead_id;if(typeof g!="string"||Z.has(g))continue;Z.add(g);let L=Nt(T[g]),B=Nt(L.pr),W=X.has(g),V=Y.active===g;c.push({..._e(g),lane:"pr_wait",pr_number:typeof B.number=="number"?B.number:null,pr_url:typeof B.url=="string"?B.url:void 0,external:A.external===!0,usage:Et(P,g),merge_action:!W,merge_enabled:!0,cancel_action:W,cancel_enabled:!V,discard_action:!0,discard_enabled:!V})}for(let A=0;A<ie.length;A++){let g=ie[A],L=g&&g.bead_id;if(typeof L!="string"||Z.has(L))continue;Z.add(L);let B=$[L],W={..._e(L),lane:"queue",reason:vi(M,L),queue_position:A+1,queue_index:A,queue_length:ie.length,badges:B?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!B,revise_action:!!B,revise_enabled:!!B,revise_title:B?B.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${B.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};f.push(W);let V=b.get(I);V?V.push(W):b.set(I,[W])}for(let A of Array.isArray(m.runnable)?m.runnable:[]){let g=A&&A.bead_id;typeof g!="string"||Z.has(g)||(Z.add(g),l.push({..._e(g),title:A.title||E[g]||g,lane:"runnable",draggable:!0,reason:vi(M,g),created_at:A.created_at??void 0,updated_at:A.updated_at??void 0,workflow:A.route?{route:A.route,chips:{route:A.route}}:null,place_index:ie.length}))}for(let A of be){let g=A&&A.bead_id;if(typeof g!="string"||Z.has(g)||(Z.add(g),o!==void 0&&typeof A.added_at=="number"&&A.added_at<o))continue;let L=Bc(P,g);_.push({..._e(g),lane:"done",done:!0,usage:Et(P,g),done_at:typeof A.added_at=="number"?A.added_at:void 0,done_kind:L&&typeof L.done_kind=="string"?L.done_kind:null,merge_action:!0,merge_enabled:!0})}}a.sort((m,I)=>(I.last_event_at??0)-(m.last_event_at??0)),_.sort((m,I)=>(I.done_at??0)-(m.done_at??0));let x=s.length>0?s:n.map(m=>({root_dir:m&&m.root_dir,name:m&&m.name,auto_advance:m&&m.auto_advance,auto_merge:m&&m.auto_merge,slots:m&&m.slots,revision:m&&m.revision,exec_defaults:m&&m.exec_defaults})),S=[];for(let m of x)!m||typeof m.root_dir!="string"||S.push({root_dir:m.root_dir,name:m.name||m.root_dir,auto_advance:m.auto_advance===!0,auto_merge:m.auto_merge===!0,slots:typeof m.slots=="number"&&m.slots>=Pr?m.slots:Pr,revision:typeof m.revision=="number"?m.revision:0,exec_defaults:Nt(m.exec_defaults),items:b.get(m.root_dir)||[]});return{runnable:l,queue:f,queue_groups:S,running:a,pr_wait:c,done:_,automation:{total:S.length,both_on:S.filter(m=>m.auto_advance&&m.auto_merge).length}}}function zc(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Pc;return d`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${_t(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":d`<span class="mon-beat__age"
          >${yt(e,t)}</span
        >`}</span
  >`}function yi(e,t){if(e.lane==="running"){let r=typeof e.started_at=="number"?ds(t-e.started_at):"";return d`<span class="mon-live">
      ${zc(e.last_event_at,t)}
      ${r?d`<span class="mon-live__elapsed">${r}</span>`:""}
      ${e.model?d`<span class="mon-live__model">${e.model}</span>`:""}
    </span>`}if(e.lane==="done"){let r=e.done_kind||"",n=r?Fc[r]||r:"";return n?d`<span class="mon-live">
      <span
        class="mon-live__kind${qc.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
        >${n}</span
      >
    </span>`:""}return e.lane==="queue"&&typeof e.queue_position=="number"?d`<span class="mon-live"
      ><span class="mon-live__pos">#${e.queue_position}</span></span
    >`:""}function $i(e){let t=String(e.revision);return d`<header
    class="mon-group__hd"
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?"\u23F8":"\u25B6"}
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
        🔀
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        <span aria-hidden="true">⧉</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Pr}
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
        ⚙
      </button>
    </span>
  </header>`}function xi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Tt.find(o=>o.value===e.done_range)?.label||"";return d`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":`\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}
    </button>
    <div class="mon-kpi">
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
        ${Tt.map(o=>d`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?d`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function Si(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ai(e){let t={};for(let i of Dt)t[i]=0;let r=!1,n=0,s=0,o=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let a=!1;for(let c of Dt){let f=l[c];typeof f=="number"&&Number.isFinite(f)&&(t[c]+=f,r=!0,a=!0)}if(a){s+=1;let c=l.total_cost_usd;typeof c=="number"&&Number.isFinite(c)&&(n+=c,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?Bt(t):null}var Ei="bdui.monitor.done-range";function Hc(){try{let e=window.localStorage.getItem(Ei);return Lt(e)?e:wt}catch{return wt}}function Wc(e){try{window.localStorage.setItem(Ei,e)}catch{}}var Ci="tab:monitor:pipeline",Gc=1e3,jc=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Yc(e){if(e.lane==="queue"){let t=(e.queue_position??1)<=1,r=(e.queue_index??0)>=(e.queue_length??1)-1;return d`<div class="mon-card__ops">
      <button
        type="button"
        class="mon-op mon-op--up"
        ?disabled=${t}
        title="한 칸 앞으로"
      >
        ↑
      </button>
      <button
        type="button"
        class="mon-op mon-op--down"
        ?disabled=${r}
        title="한 칸 뒤로"
      >
        ↓
      </button>
      <button
        type="button"
        class="mon-op mon-op--remove"
        title="대기 큐에서 제거"
      >
        ✕
      </button>
    </div>`}return e.lane==="running"?d`<div class="mon-card__ops">
      ${e.run_state==="running"?d`<button
            type="button"
            class="mon-op mon-op--pause"
            ?disabled=${e.can_pause===!1}
            title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
          >
            ⏸
          </button>`:d`<button
            type="button"
            class="mon-op mon-op--resume"
            ?disabled=${e.can_resume===!1}
            title="이어하기"
          >
            ▶
          </button>`}
      <button
        type="button"
        class="mon-op mon-op--stop"
        title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
      >
        ■
      </button>
      ${e.run_state==="failed"?d`<button
            type="button"
            class="mon-op mon-op--dismiss"
            title="실패 기록 닫기"
          >
            ✕
          </button>`:""}
    </div>`:""}function Ti(e,t){return d`<div
    class="mon-card mon-card--${e.lane}"
    data-issue-id=${e.id}
    data-root-dir=${e.root_dir}
    data-revision=${String(e.expected_revision)}
    data-lane=${e.lane}
    data-attempt-id=${e.attempt_id||""}
    data-place-index=${String(e.place_index??"")}
    data-queue-index=${String(e.queue_index??"")}
  >
    ${e.lane==="runnable"?ls(e):Nr(e)}
    ${yi(e,t)}${Yc(e)}
  </div>`}function Ri(e,t){let r=De("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,i=t.getWorkspacePath,l=t.switchWorkspace,a=t.now||(()=>Date.now()),c=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),f=Hc();function _(){let g=Tt.find(L=>L.value===f);return g?g.label:""}let b=document.createElement("div");b.className="mon",e.appendChild(b);let x=ps(null,null),S=null,m=new Map,I=new Set;function z(g){return x.queue_groups.find(L=>L.root_dir===g)||null}let G=_n(e,{queueStore:{get(){if(!S)return{revision:0,exec_defaults:{}};let g=m.get(S);if(g)return g;let L=z(S),B=s&&s.get?s.get():null,W=(Array.isArray(B)?B:[]).find(V=>V&&V.root_dir===S);return{revision:L?L.revision:0,exec_defaults:L?L.exec_defaults:{},workspace_info:W?W.workspace_info:void 0}},set(g){S&&m.set(S,g);for(let L of Array.from(I))L()},subscribe(g){return I.add(g),()=>I.delete(g)}},transport:o?(g,L)=>o(g,{...L||{},root_dir:S}):void 0,getWorkspacePath:()=>S||void 0}),P=null,E=null;async function T(g,L,B,W){if(!o||!B)return null;let V=await o(g,{...L,root_dir:B,expected_revision:W});if(V&&V.conflict){let Q=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:W;V=await o(g,{...L,root_dir:B,expected_revision:Q})}return V&&V.queue&&B&&m.set(B,V.queue),V}async function M(g,L,B){return!o||!B?null:await o(g,{...L,root_dir:B})}async function $(g){if(!o||!g&&!c("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let L=await o("monitor-auto-toggle",{on:g}),B=L&&Array.isArray(L.failed)?L.failed:[];B.length>0&&oe(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${B.map(W=>W.root_dir).join(", ")}`,"error",3200)}async function Y(){let g=new Map;for(let L of x.pr_wait)g.has(L.root_dir)||g.set(L.root_dir,L.expected_revision);for(let[L,B]of g)await T("worker-merge-queue-add-all",{},L,B)}function K(g){let L={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return d`${xi({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},done_range:f,token_total:Ai(x.done),token_tooltip:Si(_())})}
      <div class="worker-lanes mon-lanes">
        ${jc.map(B=>{let W=L[B.lane],V=B.lane==="queue"?x.queue_groups.length>0?d`${x.queue_groups.map(Q=>d`<div
                        class="mon-group"
                        data-root-dir=${Q.root_dir}
                      >
                        ${$i(Q)}
                        <div class="mon-group__list">
                          ${Q.items.map(de=>Ti(de,g))}
                        </div>
                      </div>`)}`:void 0:W.length>0?d`${W.map(Q=>Ti(Q,g))}`:void 0;return Ct({id:`monitor-${B.lane}`,lane:B.pane,title:B.lane==="done"?`\uC644\uB8CC\xB7${_()}`:B.title,items:W,empty:B.empty,body:V,live:B.lane==="running"&&W.length>0,header_control:B.lane==="pr_wait"&&W.length>0?d`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function X(){let g=s&&s.get?s.get():null,L=s&&s.getWorkspacesState?s.getWorkspacesState():[],B=a();x=ps(g,L,{done_since:ir(f,B)}),$e(K(B),b)}function ie(g,L){let B=i?i():void 0;if(!L||!B||L===B||!l){n(g);return}l(L).then(()=>{n(g)}).catch(W=>{r("workspace switch for %s failed: %o",L,W)})}function be(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function Ie(g,L){let{root_dir:B,revision:W}=be(g),V=g.getAttribute("data-issue-id")||"",Q=g.getAttribute("data-attempt-id")||"",de=L.classList;if(de.contains("worker-card__place")){T("worker-queue-place",{bead_id:V,index:Number(g.getAttribute("data-place-index")||0)||0},B,W);return}if(de.contains("mon-op--up")||de.contains("mon-op--down")){let le=Number(g.getAttribute("data-queue-index")||0)||0,Le=de.contains("mon-op--up")?le-1:le+1;if(Le<0)return;T("worker-queue-reorder",{bead_id:V,to_index:Le},B,W);return}if(de.contains("mon-op--remove")){T("worker-queue-remove",{bead_id:V},B,W);return}if(de.contains("mon-op--pause")){M("worker-attempt-pause",{attempt_id:Q},B);return}if(de.contains("mon-op--stop")){M("worker-attempt-stop",{attempt_id:Q},B);return}if(de.contains("mon-op--resume")){T("worker-attempt-resume",{attempt_id:Q},B,W);return}if(de.contains("mon-op--dismiss")){T("worker-attempt-dismiss",{attempt_id:Q},B,W);return}if(de.contains("worker-mini__merge")){T("worker-merge-queue-add",{bead_id:V},B,W);return}if(de.contains("worker-mini__merge-cancel")){T("worker-merge-queue-remove",{bead_id:V},B,W);return}if(de.contains("worker-mini__discard")){if(!c(`${V}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;T("worker-pr-discard",{bead_id:V},B,W);return}if(de.contains("worker-mini__revise-fix")){T("worker-revise-fix",{bead_id:V},B,W);return}de.contains("worker-mini__revise-approve")&&T("worker-revise-approve",{bead_id:V},B,W)}function _e(g){let L=g.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest("a"))return;let B=L.closest(".mon-auto-all");if(B){g.preventDefault(),$(B.getAttribute("data-on")==="true");return}if(L.closest(".mon-merge-all")){g.preventDefault(),Y();return}let V=L.closest(".mon-ctl--advance");if(V){g.preventDefault();let{root_dir:Pe,revision:rt}=be(V);T("worker-queue-toggle",{on:V.getAttribute("data-on")==="true"},Pe,rt);return}let Q=L.closest(".mon-ctl--merge-auto");if(Q){g.preventDefault();let{root_dir:Pe,revision:rt}=be(Q);T("worker-merge-auto-toggle",{on:Q.getAttribute("data-on")==="true"},Pe,rt);return}let de=L.closest(".mon-ctl--exec");if(de){g.preventDefault(),S=de.getAttribute("data-root-dir")||null,m.delete(S||""),G.open();return}let le=L.closest(".mon-card");if(!le)return;let Le=L.closest("button");if(Le){g.preventDefault(),Ie(le,Le);return}let ze=le.getAttribute("data-issue-id");ze&&(g.preventDefault(),ie(ze,le.getAttribute("data-root-dir")||""))}function Z(g){let L=g.target;if(!L||typeof L.closest!="function")return;let B=L.closest(".mon-done-range");if(B){f=Lt(B.value)?B.value:wt,Wc(f),X();return}let W=L.closest(".mon-slots__input");if(!W)return;let{root_dir:V,revision:Q}=be(W),de=Number(W.value);if(!Number.isFinite(de))return;let le=Math.max(Pr,Math.floor(de));T("worker-queue-set-slots",{slots:le},V,Q)}e.addEventListener("click",_e),e.addEventListener("change",Z),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{m.clear(),X();for(let g of Array.from(I))g()}catch{}}));function A(){E!==null&&(clearInterval(E),E=null)}return{load(){r("load"),X(),E===null&&(E=setInterval(()=>{try{X()}catch{}},Gc))},pause(){A()},clear(){A(),P&&(P(),P=null),e.removeEventListener("click",_e),e.removeEventListener("change",Z),G.destroy(),I.clear(),e.replaceChildren()}}}function Ii(e,t,r){let n=De("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let a=t.getState(),c=a.view==="worker"||a.view==="monitor"?a.view:"board";return d`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${c==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${c==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${c==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function l(){$e(i(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),$e(d``,e)}}}var Li=["bug","feature","task","epic","chore"];function Di(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Oi=["Critical","High","Medium","Low","Backlog"];function Mi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),f=r.querySelector("#btn-cancel"),_=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let T of Li){let M=document.createElement("option");M.value=T,M.textContent=Di(T),o.appendChild(M)}i.replaceChildren();for(let T=0;T<=4;T+=1){let M=document.createElement("option");M.value=String(T);let $=Oi[T]||"Medium";M.textContent=`${T} \u2013 ${$}`,i.appendChild(M)}}x();function S(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function m(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,f.disabled=E,_.disabled=E,_.textContent=E?"Creating\u2026":"Create"}function I(){c.textContent=""}function z(E){c.textContent=E}function H(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?i.value=T:i.value="2"}catch{o.value="",i.value="2"}}function G(){let E=o.value||"",T=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function P(){I();let E=String(s.value||"").trim();if(E.length===0){z("Title is required"),s.focus();return}let T=Number(i.value||"2");if(!(T>=0&&T<=4)){z("Priority must be 0..4"),i.focus();return}let M=String(o.value||""),$=String(a.value||""),Y={title:E};M.length>0&&(Y.type=M),String(T).length>0&&(Y.priority=T),$.length>0&&(Y.description=$),m(!0);try{await t("create-issue",Y)}catch{m(!1),z("Failed to create issue");return}G(),m(!1),S()}return r.addEventListener("cancel",E=>{E.preventDefault(),S()}),b.addEventListener("click",()=>S()),f.addEventListener("click",()=>S()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),P())}),n.addEventListener("submit",E=>{E.preventDefault(),P()}),{open(){n.reset(),I(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var Vc="tab:worker:ready",Kc="tab:worker:blocked",Zc="tab:worker:in-progress",hn=1;function hs(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var qi="beads-ui.worker.candidate-filter",fs={show_blocked:!1,spec:"all"};function Xc(){try{let e=window.localStorage.getItem(qi);if(!e)return{...fs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...fs}}}function Qc(e){try{window.localStorage.setItem(qi,JSON.stringify(e))}catch{}}function Jc(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of e){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ed=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Bi="bdui.worker.candidate_sort",td=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],mn="spec";function rd(){try{let e=window.localStorage.getItem(Bi);return e==="board"||e==="created"||e==="spec"?e:mn}catch{return mn}}function nd(e){try{window.localStorage.setItem(Bi,e)}catch{}}var Ui="bdui.worker.done-range";function sd(){try{let e=window.localStorage.getItem(Ui);return Lt(e)?e:wt}catch{return wt}}function od(e){try{window.localStorage.setItem(Ui,e)}catch{}}var id="(max-width: 640px)",zi="beads-ui.worker.lane-collapsed",Fr={queue:!0,done:!0};function ad(){try{let e=window.localStorage.getItem(zi);if(!e)return{...Fr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Fr}:{queue:typeof t.queue=="boolean"?t.queue:Fr.queue,done:typeof t.done=="boolean"?t.done:Fr.done}}catch{return{...Fr}}}function ld(e){try{window.localStorage.setItem(zi,JSON.stringify(e))}catch{}}function Ni(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function cd(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Kt):(n.sort(jr(r)),t==="board"?n:[...n.filter(hs),...n.filter(s=>!hs(s))])}function dd(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function ud(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function pd(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var fd=["closed_unmerged","undecidable"],_d=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function hd(e,t){for(let r of _d)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var _s=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function md(e){if(typeof e!="string"||e.length===0)return null;let t=_s.length,r=_s.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:_s[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function Pi(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Fi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function gd(e,t,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,f=null,_=null){let b=!!a&&a.position>0,x=!!a&&a.active===!0,S=a&&a.failure||null,m=r[e]||null,I=m&&m.gate?m.gate:null,z=m&&m.pr?m.pr:null,H=[];l&&H.push("\uC138\uC158");let G=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=hd(l&&I&&I.tier==="closed_unmerged"?"\uB2EB\uD798":I&&I.gate_badge||"",G?null:o&&o.activity||null);G&&H.push(G),P.label&&H.push(P.label),I&&I.base_badge&&I.base_badge!==I.gate_badge&&H.push(I.base_badge),_&&H.push(_),n&&H.push("\uC815\uB9AC \uC2E4\uD328"),b&&!x&&H.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),S&&H.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${Pi(S)}`),f&&H.push(`\uC790\uB3D9 \uC81C\uC678: ${Pi(f)}`);let E=!!I&&I.base_badge==="\uCDA9\uB3CC",T=!!I&&I.enabled===!0,M=md(o&&o.merge_progress?o.merge_progress.step:null),$=!!n&&!!I&&I.tier==="merged",Y=l&&!!I&&I.tier==="merged",K=l&&E&&c===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:z&&typeof z.number=="number"?z.number:null,pr_url:z&&typeof z.url=="string"?z.url:"",badges:H,live_badge:i==="running"?G:G?null:P.live?P.label:null,usage:s,alert:!!I&&fd.includes(I.tier)||!!n||!!S,merge_action:!b,cancel_action:b,cancel_enabled:!x,cancel_title:x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(I&&I.tier==="merged"),merge_step:M,discard_enabled:!M&&!i&&!b,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":b?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!M&&!i&&!K&&(T||E||$||Y),merge_label:Y?"\uC815\uB9AC":E&&!M&&!$?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:M?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${M.label}`:Y?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":K?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":E?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ms(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=t,c=n?Vr(n,i):null,f=Zr({transport:r,uiOrderStore:i}),_=null,b=[],x=Xc(),S=rd(),m=sd();function I(){let u=Tt.find(k=>k.value===m);return u?u.label:"\uC624\uB298"}let z=ad(),H=!1,G=new Set,P=new Set,E=[],T=document.createElement("div");T.className="worker-console";let M=document.createElement("div");M.className="worker-top";let $=document.createElement("div");$.className="worker-drawer-overlay",$.hidden=!0;let Y=document.createElement("div");Y.className="worker-drawer-overlay__backdrop";let K=document.createElement("div");K.className="worker-drawer-host",$.append(Y,K);let X=document.createElement("div");X.className="worker-lanes-host",T.append(M,$,X),e.appendChild(T);let ie=null,be=en(K,{transport:r,sessionLogStore:o,onClose:()=>{ie=null,$.hidden=!0,we()}}),Ie=_n(T,{queueStore:s,transport:r,getWorkspacePath:a});function _e(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:hn,queue:[],pr_wait:[],done:[]}}function Z(){let u=_e();return typeof u.revision=="number"?u.revision:0}function A(u){u&&u.queue&&s&&s.set(u.queue)}function g(){let u=_e().queue;return Array.isArray(u)?u.length:0}async function L(u,k){if(!r)return;let O=await r("worker-queue-place",{bead_id:u,index:k,expected_revision:Z()});A(O),O&&O.conflict&&await r("worker-queue-place",{bead_id:u,index:k,expected_revision:Z()}).then(A)}async function B(u,k){if(!r)return;let O=await r("worker-queue-reorder",{bead_id:u,to_index:k,expected_revision:Z()});A(O),O&&O.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:k,expected_revision:Z()}).then(A)}async function W(u){if(!r)return;let k=await r("worker-queue-remove",{bead_id:u,expected_revision:Z()});A(k),k&&k.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:Z()}).then(A)}async function V(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function Q(u){if(!r||!u)return;let k=await r("worker-attempt-pause",{attempt_id:u});k&&k.paused===!1&&k.reason&&oe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function de(u){if(!r||!u)return;let k=await r("worker-attempt-resume",{attempt_id:u,expected_revision:Z()});A(k),k&&k.conflict&&(k=await r("worker-attempt-resume",{attempt_id:u,expected_revision:Z()}),A(k)),k&&k.resumed===!1&&!k.conflict&&k.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function le(u){if(!r||!u)return;let k=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:Z()});A(k),k&&k.conflict&&(k=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:Z()}),A(k)),k&&k.dismissed===!1&&!k.conflict&&k.reason&&oe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}async function Le(u,k){if(!r)return null;let O=r,ce=await O(u,{...k,expected_revision:Z()});return A(ce),ce&&ce.conflict&&(ce=await O(u,{...k,expected_revision:Z()}),A(ce)),ce}async function ze(u){if(!r||!u)return;G.add(u),we();let k;try{k=await Le("worker-merge-queue-add",{bead_id:u})}finally{G.delete(u),we()}!k||k.conflict||k.applied||oe("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Pe(u){if(!r)return;let k=await Le("worker-merge-auto-toggle",{on:u});!k||k.conflict||oe(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function rt(u){if(!r||!u)return;let k=await Le("worker-merge-queue-remove",{bead_id:u});k&&!k.conflict&&!k.applied&&k.reason==="merge_active"&&oe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Ke(){await Le("worker-merge-queue-remove",{all:!0})}async function ht(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let O=await r("worker-pr-discard",{bead_id:u,expected_revision:Z()});if(A(O),O&&O.conflict&&(O=await r("worker-pr-discard",{bead_id:u,expected_revision:Z()}),A(O)),O&&O.discarded===!0){oe("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}O&&O.discarded===!1&&!O.conflict&&oe(`\uD3D0\uAE30 \uAC70\uBD80: ${O.reason||""}`,"error",2800)}async function nt(u,k){if(!r||!k||P.has(k))return;P.add(k),we();let O;try{O=await r(u,{bead_id:k,expected_revision:Z()}),A(O),O&&O.conflict&&(O=await r(u,{bead_id:k,expected_revision:Z()}),A(O))}finally{P.delete(k),we()}if(!(!O||O.conflict)){if(O.ok){oe(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}oe(`\uCC98\uBD84 \uAC70\uBD80: ${O.reason||""}`,"error",3e3)}}async function Ze(u){if(!r)return;let k=await r("worker-queue-toggle",{on:u,expected_revision:Z()});A(k),k&&k.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:Z()}).then(A)}async function Xe(u){await Ze(u),await Pe(u)}async function st(u){if(!r||!Number.isFinite(u))return;let k=Math.max(hn,Math.floor(u)),O=await r("worker-queue-set-slots",{slots:k,expected_revision:Z()});A(O),O&&O.conflict&&await r("worker-queue-set-slots",{slots:k,expected_revision:Z()}).then(A)}function ot(){let u=_e(),k=c?c.selectBoardColumn(Vc,"ready"):[],O=c?c.selectBoardColumn(Kc,"blocked"):[],ce=c?c.selectBoardColumn(Zc,"in_progress"):[],Ae=new Map;for(let y of ce){let U=ud(y);if(!U)continue;let se=Ae.get(U);se?se.push(y):Ae.set(U,[y])}let pe=y=>{let U=Kr(Ae.get(y)||[]);return U?U.title||U.id:null},Se=u.bead_titles||{},Ce=new Map;for(let[y,U]of Object.entries(Se))typeof U=="string"&&U.length>0&&Ce.set(y,U);for(let y of[...k,...O])Ce.set(y.id,y.title||y.id);let Ge=u.bead_times||{},et=new Map;for(let[y,U]of Object.entries(Ge))U&&typeof U=="object"&&et.set(y,U);for(let y of[...k,...O])et.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let fe=y=>et.get(y)||{},tt=u.pr_wait||[],bt=u.pr_observations||{},je=u.pr_activity||{},Je=u.cleanup_failed||{},ue=Object.entries(Je).map(([y,U])=>({bead_id:y,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0})),ve=u.ship_failure||null,Rt=ve&&typeof ve.reason=="string"&&ve.reason?{bead_id:typeof ve.bead_id=="string"?ve.bead_id:"",reason:ve.reason,detail:typeof ve.detail=="string"?ve.detail:null,pr_url:typeof ve.pr_url=="string"?ve.pr_url:null}:null,Pt=u.queue||[],at=new Set([...Pt.map(y=>y.bead_id),...tt.map(y=>y.bead_id),...u.done.map(y=>y.bead_id)]),Ft=new Set(O.map(y=>y.id)),Ht=i?i.get()?.order||{}:{},h=new Set,w=[];for(let y of[...k,...O])at.has(y.id)||h.has(y.id)||dd(y)||(h.add(y.id),w.push(y));b=cd(w,S,Ht);let J=u.admission||{},D=y=>{let U=J[y];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof U.reason=="string"?U.reason:"",Te=se.indexOf(":");return Te>0&&Te<se.length-1?`\u26D4 ${se.slice(0,Te)} (${se.slice(Te+1)})`:`\u26D4 ${se}`},p=b.map(y=>{let U=hs(y),se=Ft.has(y.id),Te=[];se&&Te.push(pd(y)),U||Te.push("spec \uC5C6\uC74C");let zr=D(y.id);return zr&&Te.push(zr),{id:y.id,title:y.title||y.id,reason:Te.join(" \xB7 "),draggable:U,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,status:y.status,blocked:se,has_spec:U}}),R=Jc(p,x),j=R.visible,Re=u.revise_parked||{},Ye=(y,U)=>y.map(se=>{let Te=U==="queue"?Re[se.bead_id]:null;return{id:se.bead_id,title:Ce.get(se.bead_id)||se.bead_id,reason:U==="done"?"":D(se.bead_id),draggable:U!=="done",done:U==="done",lane:U,badges:Te?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Te,revise_action:!!Te,revise_enabled:!!Te&&!P.has(se.bead_id),revise_title:Te?Te.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Te.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?Et(u.attempts||{},se.bead_id):null,done_at:U==="done"&&typeof se.added_at=="number"?se.added_at:void 0,...fe(se.bead_id)}}),Ne=new Map;for(let y of u.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&Ne.set(y.bead_id,y.added_at);let Be=u.attempts?Object.values(u.attempts):[],gt=new Set;for(let y of Be)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&gt.add(y.resumed_from);let It=new Map;for(let y of Be)It.set(y.bead_id,y.attempt_id);let rr=new Map;for(let y of Be)rr.set(y.attempt_id,y);function Ue(y){let U=new Set,se=y;for(;se&&!U.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;U.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&rr.get(se.resumed_from)||null}return!1}let nr=typeof u.declared_base=="string"?u.declared_base:null;function qr(y){let U=null;for(let se of Be)!se||se.bead_id!==y||Ue(se)||(U===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=se);return U&&typeof U.target_base=="string"?U.target_base:null}let hr=[],At=null;for(let y of Be){let U=y.status==="paused"&&!gt.has(y.attempt_id);if(y.status==="running"||U)hr.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:Ce.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:U,conflict_resolution:Ue(y),base_exception:Fi(nr,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,usage:Et(u.attempts||{},y.bead_id),current_child:pe(y.bead_id),...fe(y.bead_id)});else if(y.status==="failed"||y.status==="orphaned"){let se=It.get(y.bead_id)!==y.attempt_id,Te=Ne.get(y.bead_id),zr=typeof Te=="number"&&Te>0&&typeof y.finished_at=="number"&&Te>=y.finished_at;!se&&!zr&&typeof y.dismissed_at!="number"&&(At=y)}}let ks=null;if(At){let y=typeof At.session_id=="string"&&At.session_id.length>0,U=gt.has(At.attempt_id),se=At.cause_detail;ks={repo:At.repo||"",reason:At.cause||At.status,cause_detail:se&&typeof se.reason=="string"?{reason:se.reason,command:typeof se.command=="string"?se.command:null}:null,resume_attempt_id:At.attempt_id,resume_eligible:y&&!U,resume_reason:y?U?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Ji=new Set(hr.map(y=>y.bead_id)),gn=Array.isArray(u.merge_queue)?u.merge_queue:[],vs=new Map;gn.forEach((y,U)=>{y&&typeof y.bead_id=="string"&&vs.set(y.bead_id,U+1)});let ys=u.merge_queue_state||{active:null,failures:{}},ea=ys.failures||{},ta=u.auto_merge_skips||{},$s=y=>{let U=ta[y];if(!U)return null;let se=bt[y],Te=se&&se.pr?se.pr.head_sha:null;return Te&&Te===U.head_sha?U.reason||"":null},Br=new Map;for(let y of hr)y.conflict_resolution&&(y.paused?Br.has(y.bead_id)||Br.set(y.bead_id,"paused"):Br.set(y.bead_id,"running"));let xs=hr.filter(y=>!y.paused).length,Ss=(u.workspace_info||{}).slots,As=typeof Ss=="number"?Ss:typeof u.slots=="number"?u.slots:hn,ra=xs>As,Ts=ir(m),na=(Array.isArray(u.done)?u.done.slice():[]).filter(y=>Ts===void 0||typeof y.added_at!="number"||y.added_at>=Ts).sort((y,U)=>(U.added_at||0)-(y.added_at||0)),Es=Ye(na,"done"),Ur={};for(let y of Dt)Ur[y]=0;let Cs=!1,Rs=0,bn=0,Is=0;for(let y of Es){let U=y.usage;if(U&&typeof U=="object"){let se=!1;for(let Te of Dt)Number.isFinite(U[Te])&&(Ur[Te]+=U[Te],Cs=!0,se=!0);se&&(bn+=1,Number.isFinite(U.total_cost_usd)&&(Rs+=U.total_cost_usd,Is+=1))}}bn>0&&Is===bn&&(Ur.total_cost_usd=Rs);let sa=Cs?Bt(Ur):null;return{queue:u,idToTitle:Ce,candidates:j,candidate_hidden:{blocked:R.hidden_blocked,spec:R.hidden_spec},running:hr,live_count:xs,slots:As,over_cap:ra,failure:ks,waiting:Ye(Pt.filter(y=>!Ji.has(y.bead_id)),"queue"),pr_wait:tt.map(y=>gd(y.bead_id,Ce.get(y.bead_id)||y.bead_id,bt,Je[y.bead_id]||null,Et(u.attempts||{},y.bead_id),je[y.bead_id]||(G.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Br.get(y.bead_id)||null,y.external===!0,{position:vs.get(y.bead_id)||0,active:ys.active===y.bead_id,failure:ea[y.bead_id]||null},y.wt_present!==!1,u.auto_merge===!0?$s(y.bead_id):null,Fi(nr,qr(y.bead_id)))).map(y=>({...y,...fe(y.id)})),merge_queue_length:gn.length,merge_queue_running:gn.length>0,auto_excluded:tt.map(y=>y.bead_id).filter(y=>$s(y)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:nr,done:Es,token_total:sa,cleanup_failures:ue,ship_failure:Rt}}function Oe(u){let k=u.waiting.length>0?u.waiting[0].id:"\u2014",O=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ce=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Ae=d`<button
      type="button"
      class="worker-auto-all${ce?" is-active":""}"
      title=${ce?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ce?"true":"false"}
    >
      ${ce?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,pe=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Se=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${I()} 완료 <b>${u.done.length}</b></span
      >`,Ce=d`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ge=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${hn}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,et=wi({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return H?d`<div class="worker-ribbon">
          ${O}
          <div class="worker-kpi worker-kpi--ribbon">${pe}${Se}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ae}${Ge}</div>
          <div class="worker-kpi">${Ce}</div>
        </div>
        ${et}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${O}${Ae}${Ge}</div>
        <div class="worker-kpi">
          ${pe}${Se}${Ce}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${I()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${I()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${k}</b></span
          >
        </div>
      </div>
      ${et}`}function He(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let k=u.running.some(O=>!O.paused);return d`<section
      class="worker-now${k?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${u.running.length+u.pr_wait.length}</span
        >
        ${it(u)}
      </header>
      ${u.running.length>0?us(u.running,Date.now(),ie):""}
      ${u.pr_wait.map(O=>Nr(O))}
    </section>`}function Ve(u){let k=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${k.blocked>0?` ${k.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ed.map(O=>d`<button
              type="button"
              class="worker-filter__chip${x.spec===O.value?" is-active":""}"
              data-spec=${O.value}
              aria-pressed=${x.spec===O.value?"true":"false"}
            >
              ${O.label}
            </button>`)}
        ${k.spec>0?d`<span class="worker-filter__hidden">숨김 ${k.spec}</span>`:""}
      </div>
    </div>`}function pt(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${S}
    >
      ${td.map(u=>d`<option value=${u.value} ?selected=${S===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function mt(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${m}
      >
        ${Tt.map(u=>d`<option value=${u.value} ?selected=${m===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function it(u){let k=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${k?" is-active":""}"
        title=${k?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${k?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(k)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let O=new Set(u.auto_excluded),ce=u.pr_wait.filter(Ae=>Ae.merge_action&&Ae.merge_enabled&&!O.has(Ae.id)).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ce>0?` ${ce}`:""}
    </button>`}function qe(u){let k=Ct({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:pt(),controls:Ve(u)});return H?d`<div class="worker-lanes worker-lanes--mobile">
        ${He(u)}
        ${Ct({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:z.queue,preview:Ni(u.waiting)})}
        ${k}
        ${Ct({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:mt(),collapsible:!0,collapsed:z.done,preview:u.token_total||Ni(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${k}
      ${Ct({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ct({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(O=>!O.paused),body:us(u.running,Date.now(),ie)})}
      ${Ct({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:it(u)})}
      ${Ct({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${I()} ${u.done.length}`,items:u.done,empty:`${I()} \uC644\uB8CC \uC5C6\uC74C`,controls:mt()})}
    </div>`}function Qe(u){z={...z,[u]:!z[u]},ld(z),we()}function we(){let u=ot();$e(Oe(u),M),$e(qe(u),X)}function We(){let u=document.querySelector(".app-header");if(!u)return;let k=()=>{let O=Math.round(u.getBoundingClientRect().height);T.style.setProperty("--worker-ribbon-top",`${O}px`)};if(k(),typeof ResizeObserver=="function"){let O=new ResizeObserver(k);O.observe(u),E.push(()=>O.disconnect())}else window.addEventListener("resize",k),E.push(()=>window.removeEventListener("resize",k))}function N(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(id);H=!!u.matches;let k=O=>{let ce=!!(O&&typeof O.matches=="boolean"?O.matches:u.matches);ce!==H&&(H=ce,we())};typeof u.addEventListener=="function"?(u.addEventListener("change",k),E.push(()=>u.removeEventListener("change",k))):typeof u.addListener=="function"&&(u.addListener(k),E.push(()=>u.removeListener(k)))}function q(u){let k=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!k)return;let O=k.dataset.beadId||"",ce=k.dataset.lane||"";_={bead_id:O,from_lane:ce};try{u.dataTransfer?.setData("text/plain",O),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function re(u){let k=u.target?.closest?.(".worker-pane");if(!k)return;let O=k.dataset.lane||"";O!=="candidate"&&O!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),k.classList.add("worker-pane--drag-over"))}function te(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ne(u,k){let O=b.find(Se=>Se.id===u);if(!O)return;let ce=b.filter(Se=>Se.id!==u),Ae=ce.length;if(k){let Se=k.dataset.beadId;if(Se===u)return;let Ce=ce.findIndex(Ge=>Ge.id===Se);Ce>=0&&(Ae=Ce)}let pe=ce.slice();pe.splice(Ae,0,O),f.applyReorder(u,pe,Ae)}function he(u){let k=u.target?.closest?.(".worker-pane");if(!k)return;u.preventDefault(),k.classList.remove("worker-pane--drag-over");let O=k.dataset.lane||"",ce=_?.bead_id||u.dataTransfer?.getData("text/plain")||"",Ae=_?.from_lane||"";if(_=null,!ce)return;let pe=u.target?.closest?.(".worker-mini, .worker-card"),Se=Array.from(k.querySelectorAll(".worker-mini, .worker-card")),Ce=Se.length;if(pe){let Ge=Se.indexOf(pe);Ge>=0&&(Ce=Ge)}if(k.classList.contains("worker-pane--collapsed")&&(Ce=g()),O==="candidate"){if(Ae==="candidate"){ne(ce,pe);return}Ae==="queue"&&W(ce);return}O==="queue"&&(Ae==="queue"?B(ce,Ce):L(ce,Ce))}function ge(u){x=u,Qc(u),we()}function ke(u){S=u==="board"||u==="created"||u==="spec"?u:mn,nd(S),we()}function ae(u){m=Lt(u)?u:wt,od(m),we()}function v(u){let k=u.target?.closest?.(".worker-filter__blocked");if(k){ge({...x,show_blocked:k.checked});return}let O=u.target?.closest?.(".worker-done-range");if(O){ae(O.value);return}let ce=u.target?.closest?.(".worker-sort");if(ce){ke(ce.value||mn);return}let Ae=u.target?.closest?.(".worker-slots__input");if(!Ae)return;let pe=Number.parseInt(Ae.value,10);if(!Number.isFinite(pe)){we();return}st(pe).then(we)}function F(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function C(u){let k=_e(),O=k.attempts?k.attempts[u]:null;ie=u,$.hidden=!1,be.open({attempt_id:u,meta:F(O)}),we()}function ee(){if(!ie)return;let u=_e(),k=u.attempts?u.attempts[ie]:null;if(k){be.updateMeta(F(k));return}be.close()}function Me(u){let k=u.target;if(k?.closest?.("#worker-exec-defaults-dialog"))return;if(k?.closest?.(".worker-exec-defaults-btn")){Ie.open();return}let O=k?.closest?.(".worker-banner__resume");if(O){let ue=O.dataset.attemptId;ue&&de(ue);return}let ce=k?.closest?.(".worker-banner__dismiss");if(ce){let ue=ce.dataset.attemptId;ue&&le(ue);return}if(k?.closest?.(".worker-play")){Ze(!_e().auto_advance);return}if(k?.closest?.(".worker-auto-all")){let ue=_e();Xe(!(ue.auto_advance===!0&&ue.auto_merge===!0));return}let Ae=k?.closest?.(".worker-merge-all");if(Ae){Ae.classList.contains("worker-merge-all--stop")?_e().auto_merge===!0?Pe(!1):Ke():Pe(!0);return}let pe=k?.closest?.(".worker-pane__hd--toggle");if(pe){let ue=pe.dataset.lane;(ue==="queue"||ue==="done")&&Qe(ue);return}let Se=k?.closest?.(".worker-card__place");if(Se){let ue=Se.dataset.beadId;ue&&!Se.disabled&&L(ue,g());return}let Ce=k?.closest?.(".worker-filter__chip");if(Ce){let ue=Ce.dataset.spec;(ue==="all"||ue==="with"||ue==="without")&&ge({...x,spec:ue});return}let Ge=k?.closest?.(".worker-mini__merge");if(Ge){ze(Ge.dataset.beadId||"");return}let et=k?.closest?.(".worker-mini__merge-cancel");if(et){rt(et.dataset.beadId||"");return}let fe=k?.closest?.(".worker-mini__discard");if(fe){ht(fe.dataset.beadId||"");return}let tt=k?.closest?.(".worker-mini__revise-fix");if(tt){nt("worker-revise-fix",tt.dataset.beadId||"");return}let bt=k?.closest?.(".worker-mini__revise-approve");if(bt){nt("worker-revise-approve",bt.dataset.beadId||"");return}if(k?.closest?.(".worker-mini__pr"))return;if(k?.closest?.(".rtile__stop")){let ve=k?.closest?.(".rtile")?.dataset?.attemptId;ve&&V(ve);return}if(k?.closest?.(".rtile__pause")){let ve=k?.closest?.(".rtile")?.dataset?.attemptId;ve&&Q(ve);return}if(k?.closest?.(".rtile__resume")){let ve=k?.closest?.(".rtile")?.dataset?.attemptId;ve&&de(ve);return}if(k?.closest?.(".rtile__session")){let ve=k?.closest?.(".rtile")?.dataset?.attemptId;ve&&C(ve);return}if(k?.closest?.(".worker-drawer-overlay__backdrop")){be.close();return}if(k?.closest?.(".worker-drawer-host"))return;let je=k?.closest?.(".rtile");if(je){if(k?.closest?.(".rtile__id")){let ve=je.dataset.beadId;ve&&Qt(ve).then(Rt=>{Rt?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let ue=je.dataset.beadId;ue&&l&&l(ue);return}let Je=k?.closest?.(".worker-mini, .worker-card");if(Je){let ue=Je.dataset.beadId;if(k?.closest?.(".worker-mini__id, .worker-card__id")){ue&&Qt(ue).then(ve=>{ve?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}ue&&l&&l(ue)}}return e.addEventListener("dragstart",q),e.addEventListener("dragover",re),e.addEventListener("dragleave",te),e.addEventListener("drop",he),e.addEventListener("click",Me),e.addEventListener("change",v),N(),We(),c&&E.push(c.subscribe(we)),s&&E.push(s.subscribe(()=>{we(),ee()})),we(),{load(){we()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",q),e.removeEventListener("dragover",re),e.removeEventListener("dragleave",te),e.removeEventListener("drop",he),e.removeEventListener("click",Me),e.removeEventListener("change",v);try{be.destroy()}catch{}$.hidden=!0;try{Ie.destroy()}catch{}$e(d``,e)}}}function gs(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Hi(e,t,r,n=async()=>{},s=async()=>{}){let o=De("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function f(T){let $=T.target.value,K=t.getState().workspace?.current?.path||"";if($&&$!==K){o("switching workspace to %s",$),l=!0,E();try{await r($)}catch(X){o("workspace switch failed: %o",X)}finally{l=!1,E()}}}async function _(){let T=t.getState(),M=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!M||a)){o("git-pulling workspace %s",M),a=!0,E();try{await n(M)}catch($){o("workspace git pull failed: %o",$)}finally{a=!1,E()}}}function b(T){let M=T.target;M&&e.contains(M)||m()}function x(T){T.key==="Escape"&&m()}function S(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),E())}function m(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),E())}function I(){c?m():S()}async function z(T){let M=T.target,$=M.value,Y=M.checked;o("toggling visibility %s \u2192 %s",$,String(Y));try{await s($,Y)}catch(K){o("workspace visibility toggle failed: %o",K)}}function H(T){return T?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function G(T,M){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${I}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${T.map($=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${$.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${$.path}"
                        .checked=${!M.has($.path)}
                        @change=${z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gs($.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let T=t.getState(),M=T.workspace?.current,$=T.workspace?.available||[],Y=new Set(T.workspace?.hidden||[]),K=M?.path||$[0]?.path||"";if($.length===0)return d``;let X=$.filter(ie=>!Y.has(ie.path)||ie.path===K);if(X.length<=1){let ie=X[0]||$[0],be=gs(ie.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ie.path}"
            >${be}</span
          >
          ${G($,Y)}
          ${H(K)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${f}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${X.map(ie=>d`
              <option
                value="${ie.path}"
                ?selected=${ie.path===K}
                title="${ie.path}"
              >
                ${gs(ie.path)}
              </option>
            `)}
        </select>
        ${G($,Y)}
        ${H(K)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){$e(P(),e)}return E(),i=t.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),$e(d``,e)}}}var Wi=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function bs(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Gi(e,t,r=bs()){return{id:r,type:e,payload:t}}function ji(e={}){let t=De("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,f=[],_=new Map,b=new Set;function x(P){for(let E of Array.from(b))try{E(P)}catch{}}function S(){if(!a||l)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*P,T=Math.max(0,Math.round(P+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",T,i+1),l=setTimeout(()=>{l=null,G()},T)}function m(P){try{s?.send(JSON.stringify(P))}catch(E){t("ws send failed",E)}}function I(){for(o="open",t("ws open"),x(o),i=0;f.length;){let P=f.shift();P&&m(P)}}function z(P){let E;try{E=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(c.has(E.id)){let M=c.get(E.id);c.delete(E.id),E.ok?M?.resolve(E.payload):M?.reject(E.error||new Error("ws error"));return}let T=_.get(E.type);if(T&&T.size>0)for(let M of Array.from(T))try{M(E.payload)}catch($){t("ws event handler error",$)}else t("ws received unhandled message type: %s",E.type)}function H(){o="closed",t("ws closed"),x(o);for(let[P,E]of c.entries())E.reject(new Error("ws disconnected")),c.delete(P);i+=1,S()}function G(){if(!a)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",x(o),s.addEventListener("open",I),s.addEventListener("message",z),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(E){t("ws connect failed %o",E),S()}}return G(),{send(P,E){if(!Wi.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let T=bs(),M=Gi(P,E,T);return t("send %s id=%s",P,T),new Promise(($,Y)=>{c.set(T,{resolve:$,reject:Y,type:P}),s&&s.readyState===s.OPEN?m(M):(t("queue %s id=%s (state=%s)",P,T,o),f.push(M))})},on(P,E){_.has(P)||_.set(P,new Set);let T=_.get(P);return T?.add(E),()=>{T?.delete(E)}},onConnection(P){return b.add(P),()=>{b.delete(P)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,G()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function bd(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function wd(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ws=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Yi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Vi=Ci,Ki="worker:queue",Zi="ui:order",Xi="ui:display-policy",zt="tab:board:closed",Qi="beads-ui.board.closed-range";function kd(e){let t=De("main");t("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;$e(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&o&&i&&l){let _e=function(h,w){let J="Request failed",D="";if(h&&typeof h=="object"){let R=h;if(typeof R.message=="string"&&R.message.length>0&&(J=R.message),typeof R.details=="string")D=R.details;else if(R.details&&typeof R.details=="object")try{D=JSON.stringify(R.details,null,2)}catch{D=""}}else typeof h=="string"&&h.length>0&&(J=h);let p=w&&w.length>0?`Failed to load ${w}`:"Request failed";Ie.open(p,J,D)},Ze=function(h){return`${fe.getState().workspace.current?.path||""}\0${h}`},Xe=function(){le&&(le().catch(()=>{}),le=null),Le=null,ze=null},ot=function(h){Pe=h;let w=()=>{Pe!==h||fe.getState().selected_id!==h||(Pe=null,st(h))};if(!ht){Ke.then(w);return}w()},pt=function(h,w,J,D,p){return J!==Ve[w]?(p().catch(()=>{}),!1):(h.set(D,p),!0)},mt=function(){let h=fe.getState().view;Qe(h==="board"),re(h==="worker"),ke(h==="monitor"),ne(h==="worker")},qe=function(){let h=ir(it);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Qe=function(h){if(h)for(let[w,J]of ws){if(Oe.has(w)||He.has(w))continue;let D=w===zt?qe():{type:J};try{L.register(w,D)}catch(j){t("register %s store failed: %o",w,j)}He.add(w);let p=Ve.board,R=!1;g.subscribeList(w,D).then(j=>{R=!pt(Oe,"board",p,w,j)}).catch(j=>{t("subscribe %s failed: %o",w,j),_e(j,"board")}).finally(()=>{He.delete(w),R&&mt()})}else We()},We=function(){Ve.board+=1;for(let[h]of ws){let w=Oe.get(h);w&&(w().catch(()=>{}),Oe.delete(h));try{L.unregister(h)}catch(J){t("unregister %s failed: %o",h,J)}}},re=function(h){if(!h){te();return}for(let[w,J]of Yi){if(N.has(w)||He.has(w))continue;try{L.register(w,{type:J})}catch(R){t("register %s store failed: %o",w,R)}He.add(w);let D=Ve.worker,p=!1;g.subscribeList(w,{type:J}).then(R=>{p=!pt(N,"worker",D,w,R)}).catch(R=>{t("subscribe %s failed: %o",w,R),_e(R,"worker")}).finally(()=>{He.delete(w),p&&mt()})}},te=function(){Ve.worker+=1;for(let[h]of Yi){let w=N.get(h);w&&(w().catch(()=>{}),N.delete(h));try{L.unregister(h)}catch(J){t("unregister %s failed: %o",h,J)}}},ne=function(h){if(!h){he();return}q||(A("subscribe-worker-queue",{id:Ki}).catch(w=>{t("subscribe-worker-queue failed: %o",w)}),q=()=>A("unsubscribe-worker-queue",{id:Ki}))},he=function(){q&&(q().catch(()=>{}),q=null)},ke=function(h){if(!h){ae();return}ge||(A("subscribe-monitor-pipeline",{id:Vi}).catch(w=>{t("subscribe-monitor-pipeline failed: %o",w)}),ge=()=>A("unsubscribe-monitor-pipeline",{id:Vi}))},ae=function(){ge&&(ge().catch(()=>{}),ge=null)},F=function(){v||(A("subscribe-ui-order",{id:Zi}).catch(h=>{t("subscribe-ui-order failed: %o",h)}),v=()=>A("unsubscribe-ui-order",{id:Zi}))},C=function(){v&&(v().catch(()=>{}),v=null),V.clear()},Me=function(){ee||(A("subscribe-display-policy",{id:Xi}).catch(h=>{t("subscribe-display-policy failed: %o",h)}),ee=()=>A("unsubscribe-display-policy",{id:Xi}))},u=function(){ee&&(ee().catch(()=>{}),ee=null),Q.clear()},Se=function(h){if(!h)return"Unknown";let w=h.split("/").filter(Boolean);return w.length>0?w[w.length-1]:"Unknown"};var a=_e,c=Ze,f=Xe,_=ot,b=pt,x=mt,S=qe,m=Qe,I=We,z=re,H=te,G=ne,P=he,E=ke,T=ae,M=F,$=C,Y=Me,K=u,X=Se;let ie=document.getElementById("header-loading"),be=po(ie),Ie=_i(e),Z=ji(),A=be.wrapSend((h,w)=>Z.send(h,w)),g=so(A),L=oo(),B=ao(),W=Hs(),V=io(),Q=zs(),de=Ws();Z.on("monitor-pipeline-snapshot",h=>{let w=h;if(!(!w||!Array.isArray(w.workspaces)))try{W.set(w.workspaces,w.workspaces_state)}catch{}}),Z.on("ui-order-snapshot",h=>{let w=h;if(w&&typeof w.revision=="number")try{V.set({revision:w.revision,order:w.order&&typeof w.order=="object"?w.order:{}})}catch{}}),Z.on("display-policy-snapshot",h=>{let w=h;if(w&&w.policy&&typeof w.policy=="object")try{Q.set(w.policy)}catch{}}),Z.on("session-log-snapshot",h=>{let w=h;if(w&&typeof w.attempt_id=="string")try{de.set(w.attempt_id,Array.isArray(w.lines)?w.lines:[],typeof w.last_event_at=="number"?w.last_event_at:null)}catch{}}),Z.on("session-log-append",h=>{let w=h;if(w&&typeof w.attempt_id=="string")try{de.append(w.attempt_id,w.event)}catch{}}),Z.on("snapshot",h=>{let w=h,J=w&&typeof w.id=="string"?w.id:"",D=J?L.getStore(J):null;if(D&&w&&w.type==="snapshot")try{D.applyPush(w)}catch{}}),Z.on("upsert",h=>{let w=h,J=w&&typeof w.id=="string"?w.id:"",D=J?L.getStore(J):null;if(D&&w&&w.type==="upsert")try{D.applyPush(w)}catch{}}),Z.on("delete",h=>{let w=h,J=w&&typeof w.id=="string"?w.id:"",D=J?L.getStore(J):null;if(D&&w&&w.type==="delete")try{D.applyPush(w)}catch{}});let le=null,Le=null,ze=null,Pe=null,rt=()=>{},Ke=new Promise(h=>{rt=()=>h(void 0)}),ht=!1,nt=!1;async function st(h){let w=Ze(h);if(w===Le||w===ze)return;ze=w;let J=`detail:${h}`,D={type:"issue-detail",params:{id:h}};try{L.register(J,D)}catch(p){t("register detail store failed: %o",p)}try{let p=await g.subscribeList(J,D);if(fe.getState().selected_id!==h||Ze(h)!==w){await p().catch(()=>{});return}le&&await le().catch(()=>{}),le=p,Le=w}catch(p){t("detail subscribe failed: %o",p),_e(p,"issue details")}finally{ze===w&&(ze=null)}}let Oe=new Map,He=new Set,Ve={board:0,worker:0},it=wt;try{let h=window.localStorage.getItem(Qi);Lt(h)&&(it=h)}catch{}async function we(h){if(!Lt(h)||h===it)return;it=h;try{window.localStorage.setItem(Qi,h)}catch{}let w=Oe.get(zt);if(!w)return;Oe.delete(zt),await w().catch(()=>{});let J=qe();try{L.register(zt,J)}catch(D){t("register %s store failed: %o",zt,D)}try{let D=await g.subscribeList(zt,J);Oe.set(zt,D)}catch(D){t("re-subscribe %s failed: %o",zt,D),_e(D,"board")}}let N=new Map,q=null,ge=null,v=null,ee=null;async function k(){ee=null,Q.clear(),q=null,ge=null,Oe.clear(),N.clear(),Ve.board+=1,Ve.worker+=1;let h=fe.getState().workspace.current?.path;if(h)try{await Z.send("set-workspace",{path:h})}catch(J){t("workspace restore after reconnect failed: %o",J);return}Me();let w=fe.getState().view;Qe(w==="board"),re(w==="worker"),ke(w==="monitor"),ne(w==="worker")}async function O(){t("clearing all subscriptions for workspace switch"),We(),te(),he(),B.clear(),C(),F(),u(),Me(),Xe();let h=fe.getState();if(h.selected_id)try{L.unregister(`detail:${h.selected_id}`)}catch{}let w=fe.getState();Qe(w.view==="board"),re(w.view==="worker"),ke(w.view==="monitor"),ne(w.view==="worker"),w.selected_id&&ot(w.selected_id)}async function ce(h){t("requesting workspace switch to %s",h),nt=!0;try{let w=await Z.send("set-workspace",{path:h});t("workspace switch result: %o",w),w&&w.workspace&&(fe.setState({workspace:{current:{path:w.workspace.root_dir,database:w.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),w.changed&&(await O(),oe("Switched to "+Se(h),"success",2e3)))}catch(w){throw t("workspace switch failed: %o",w),oe("Failed to switch workspace","error",3e3),w}finally{nt=!1}}async function Ae(h){t("requesting workspace git pull for %s",h);try{let w=await Z.send("git-pull-workspace",{});t("workspace git pull result: %o",w);let J=w?.status;if(J==="up_to_date"){oe("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){oe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}oe("Git pulled "+Se(h),"success",2e3)}catch(w){t("workspace git pull failed: %o",w);let J=w?.code,D=w?.message;if(J==="rebase_conflict"){oe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){oe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){oe("Git pull skipped: another operation is running","warning",3e3);return}let p=D?`: ${D}`:"";throw oe(`Git pull failed${p}`,"error",3e3),w}}async function pe(h,w){t("setting workspace visibility %s \u2192 %s",h,String(w));try{await Z.send("set-workspace-visibility",{path:h,visible:w}),await Ce()}catch(J){t("workspace visibility update failed: %o",J),oe("Failed to update project visibility","error",3e3)}}async function Ce(){try{let h=await Z.send("list-workspaces",{});if(t("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let w=h.workspaces.map(R=>({path:R.path,database:R.database,pid:R.pid,version:R.version})),J=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,D=Array.isArray(h.hidden)?h.hidden.filter(R=>typeof R=="string"):[];fe.setState({workspace:{current:J,available:w,hidden:D}});let p=window.localStorage.getItem("beads-ui.workspace");p&&(!w.some(j=>j.path===p)||D.includes(p)?window.localStorage.removeItem("beads-ui.workspace"):J&&p!==J.path&&(t("restoring saved workspace preference: %s",p),await ce(p)))}}catch(h){t("failed to load workspaces: %o",h)}}Z.on("workspace-changed",h=>{t("workspace-changed event: %o",h),h&&h.root_dir&&(fe.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),Ce(),O())});let Ge=!1;if(typeof Z.onConnection=="function"){let h=w=>{t("ws state %s",w),w==="reconnecting"||w==="closed"?(Ge=!0,oe("Connection lost. Reconnecting\u2026","error",4e3)):w==="open"&&Ge&&(Ge=!1,oe("Reconnected","success",2200),wd(fe,(J,D)=>{t(`${J}: %o`,D)}),k())};Z.onConnection(h)}let et="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker"||h==="monitor")&&(et=h)}catch(h){t("view parse error: %o",h)}let fe=uo({config:bd(),view:et});Z.on("worker-queue-snapshot",h=>{let w=h;if(!w||!w.queue)return;let J=fe.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&w.root_dir!==J){t("dropping worker-queue snapshot for %s",String(w.root_dir));return}try{B.set(w.queue)}catch{}});let tt=lo(fe);tt.start();let bt=async(h,w)=>{try{return await A(h,w)}catch{return[]}};n&&Ii(n,fe,tt);let je=document.getElementById("workspace-picker");je&&Hi(je,fe,ce,Ae,pe);let Je=Mi(e,(h,w)=>A(h,w));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>Je.open())}catch{}let ue=fi(e,{policyStore:Q,transport:(h,w)=>A(h,w),labelOptions:()=>{let h=new Set;for(let[w]of ws)for(let J of L.snapshotFor(w)||[]){let D=J.labels;if(Array.isArray(D))for(let p of D)typeof p=="string"&&p.length>0&&h.add(p)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>ue.open())}catch{}let ve=ko(s,{gotoIssue:h=>tt.gotoIssue(h),issueStores:L,transport:bt,uiOrderStore:V,displayPolicyStore:Q,closedRange:it,onClosedRangeChange:h=>{we(h)},onNewIssue:()=>Je.open()}),Rt=ms(o,{transport:bt,issueStores:L,queueStore:B,sessionLogStore:de,uiOrderStore:V,gotoIssue:h=>fe.setState({selected_id:h}),getWorkspacePath:()=>fe.getState().workspace.current?.path}),Pt=Ri(i,{transport:bt,pipelineStore:W,gotoIssue:h=>tt.gotoIssue(h),getWorkspacePath:()=>fe.getState().workspace.current?.path,switchWorkspace:h=>ce(h)}),at=ui(l,{issueStores:L,transport:bt,queueStore:B,sessionLogStore:de,getWorkspacePath:()=>fe.getState().workspace.current?.path,onNavigate:h=>{fe.getState().view==="worker"?fe.setState({selected_id:h}):tt.gotoIssue(h)},onClose:()=>{let h=fe.getState();fe.setState({selected_id:null});try{tt.gotoView(h.view==="worker"||h.view==="monitor"?h.view:"board")}catch{}}}),Ft=fe.getState().selected_id;Ft&&(l.hidden=!1,at.load(Ft),ot(Ft)),fe.subscribe(h=>{let w=h.selected_id;w?(l.hidden=!1,at.load(w),nt||ot(w)):(at.clear(),l.hidden=!0,Xe())});let Ht=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",i.hidden=h.view!=="monitor",Qe(h.view==="board"),re(h.view==="worker"),ke(h.view==="monitor"),ne(h.view==="worker"),!h.selected_id&&h.view==="board"&&ve.load(),h.view==="worker"&&Rt.load(),h.view==="monitor"?Pt.load():Pt.pause(),window.localStorage.setItem("beads-ui.view",h.view)};fe.subscribe(Ht),Ht(fe.getState()),F(),Me(),Ce().finally(()=>{ht=!0,rt()}),window.addEventListener("keydown",h=>{let w=h.ctrlKey||h.metaKey,J=String(h.key||"").toLowerCase(),D=h.target,p=D&&D.tagName?String(D.tagName).toLowerCase():"",R=p==="input"||p==="textarea"||p==="select"||D&&typeof D.isContentEditable=="boolean"&&D.isContentEditable;w&&J==="n"&&(R||(h.preventDefault(),Je.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&kd(t)});export{kd as bootstrap,bd as readBootstrapConfig,wd as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
