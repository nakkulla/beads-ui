var Fi=Object.create;var In=Object.defineProperty;var qi=Object.getOwnPropertyDescriptor;var Bi=Object.getOwnPropertyNames;var Ui=Object.getPrototypeOf,zi=Object.prototype.hasOwnProperty;var Hi=(e,t,r)=>t in e?In(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ln=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Wi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Bi(t))!zi.call(e,s)&&s!==r&&In(e,s,{get:()=>t[s],enumerable:!(n=qi(t,s))||n.enumerable});return e};var ji=(e,t,r)=>(r=e!=null?Fi(Ui(e)):{},Wi(t||!e||!e.__esModule?In(r,"default",{value:e,enumerable:!0}):r,e));var Fe=(e,t,r)=>Hi(e,typeof t!="symbol"?t+"":t,r);var io=Ln((Wu,ao)=>{var ur=1e3,pr=ur*60,fr=pr*60,Jt=fr*24,Zi=Jt*7,Xi=Jt*365.25;ao.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Qi(e);if(r==="number"&&isFinite(e))return t.long?el(e):Ji(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Qi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Xi;case"weeks":case"week":case"w":return r*Zi;case"days":case"day":case"d":return r*Jt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*fr;case"minutes":case"minute":case"mins":case"min":case"m":return r*pr;case"seconds":case"second":case"secs":case"sec":case"s":return r*ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ji(e){var t=Math.abs(e);return t>=Jt?Math.round(e/Jt)+"d":t>=fr?Math.round(e/fr)+"h":t>=pr?Math.round(e/pr)+"m":t>=ur?Math.round(e/ur)+"s":e+"ms"}function el(e){var t=Math.abs(e);return t>=Jt?Xr(e,t,Jt,"day"):t>=fr?Xr(e,t,fr,"hour"):t>=pr?Xr(e,t,pr,"minute"):t>=ur?Xr(e,t,ur,"second"):e+" ms"}function Xr(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var co=Ln((ju,lo)=>{function tl(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=c,r.humanize=io(),r.destroy=d,Object.keys(e).forEach(m=>{r[m]=e[m]}),r.names=[],r.skips=[],r.formatters={};function t(m){let g=0;for(let b=0;b<m.length;b++)g=(g<<5)-g+m.charCodeAt(b),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=t;function r(m){let g,b=null,x,w;function h(...E){if(!h.enabled)return;let Y=h,H=Number(new Date),K=H-(g||H);Y.diff=K,Y.prev=g,Y.curr=H,g=H,E[0]=r.coerce(E[0]),typeof E[0]!="string"&&E.unshift("%O");let P=0;E[0]=E[0].replace(/%([a-zA-Z%])/g,(S,N)=>{if(S==="%%")return"%";P++;let z=r.formatters[N];if(typeof z=="function"){let le=E[P];S=z.call(Y,le),E.splice(P,1),P--}return S}),r.formatArgs.call(Y,E),(Y.log||r.log).apply(Y,E)}return h.namespace=m,h.useColors=r.useColors(),h.color=r.selectColor(m),h.extend=n,h.destroy=r.destroy,Object.defineProperty(h,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,w=r.enabled(m)),w),set:E=>{b=E}}),typeof r.init=="function"&&r.init(h),h}function n(m,g){let b=r(this.namespace+(typeof g>"u"?":":g)+m);return b.log=this.log,b}function s(m){r.save(m),r.namespaces=m,r.names=[],r.skips=[];let g=(typeof m=="string"?m:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of g)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(m,g){let b=0,x=0,w=-1,h=0;for(;b<m.length;)if(x<g.length&&(g[x]===m[b]||g[x]==="*"))g[x]==="*"?(w=x,h=b,x++):(b++,x++);else if(w!==-1)x=w+1,h++,b=h;else return!1;for(;x<g.length&&g[x]==="*";)x++;return x===g.length}function a(){let m=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),m}function c(m){for(let g of r.skips)if(o(m,g))return!1;for(let g of r.names)if(o(m,g))return!0;return!1}function i(m){return m instanceof Error?m.stack||m.message:m}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}lo.exports=tl});var uo=Ln((bt,Qr)=>{bt.formatArgs=nl;bt.save=sl;bt.load=ol;bt.useColors=rl;bt.storage=al();bt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();bt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function rl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function nl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}bt.log=console.debug||console.log||(()=>{});function sl(e){try{e?bt.storage.setItem("debug",e):bt.storage.removeItem("debug")}catch{}}function ol(){let e;try{e=bt.storage.getItem("debug")||bt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function al(){try{return localStorage}catch{}}Qr.exports=co()(bt);var{formatters:il}=Qr.exports;il.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var $r=globalThis,Zr=$r.trustedTypes,Ys=Zr?Zr.createPolicy("lit-html",{createHTML:e=>e}):void 0,Js="$lit$",Ht=`lit$${Math.random().toFixed(9).slice(2)}$`,eo="?"+Ht,Gi=`<${eo}>`,Xt=document,xr=()=>Xt.createComment(""),Sr=e=>e===null||typeof e!="object"&&typeof e!="function",qn=Array.isArray,Yi=e=>qn(e)||typeof e?.[Symbol.iterator]=="function",Dn=`[ 	
\f\r]`,kr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Vs=/-->/g,Ks=/>/g,Kt=RegExp(`>|${Dn}(?:([^\\s"'>=/]+)(${Dn}*=${Dn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Zs=/'/g,Xs=/"/g,to=/^(?:script|style|textarea|title)$/i,Bn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Bn(1),Pt=Bn(2),Fu=Bn(3),Qt=Symbol.for("lit-noChange"),Ke=Symbol.for("lit-nothing"),Qs=new WeakMap,Zt=Xt.createTreeWalker(Xt,129);function ro(e,t){if(!qn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ys!==void 0?Ys.createHTML(t):t}var Vi=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=kr;for(let c=0;c<r;c++){let i=e[c],d,m,g=-1,b=0;for(;b<i.length&&(a.lastIndex=b,m=a.exec(i),m!==null);)b=a.lastIndex,a===kr?m[1]==="!--"?a=Vs:m[1]!==void 0?a=Ks:m[2]!==void 0?(to.test(m[2])&&(s=RegExp("</"+m[2],"g")),a=Kt):m[3]!==void 0&&(a=Kt):a===Kt?m[0]===">"?(a=s??kr,g=-1):m[1]===void 0?g=-2:(g=a.lastIndex-m[2].length,d=m[1],a=m[3]===void 0?Kt:m[3]==='"'?Xs:Zs):a===Xs||a===Zs?a=Kt:a===Vs||a===Ks?a=kr:(a=Kt,s=void 0);let x=a===Kt&&e[c+1].startsWith("/>")?" ":"";o+=a===kr?i+Gi:g>=0?(n.push(d),i.slice(0,g)+Js+i.slice(g)+Ht+x):i+Ht+(g===-2?c:x)}return[ro(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Ar=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,m]=Vi(t,r);if(this.el=e.createElement(d,n),Zt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Zt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(Js)){let b=m[a++],x=s.getAttribute(g).split(Ht),w=/([.?@])?(.*)/.exec(b);i.push({type:1,index:o,name:w[2],strings:x,ctor:w[1]==="."?Mn:w[1]==="?"?Nn:w[1]==="@"?Pn:cr}),s.removeAttribute(g)}else g.startsWith(Ht)&&(i.push({type:6,index:o}),s.removeAttribute(g));if(to.test(s.tagName)){let g=s.textContent.split(Ht),b=g.length-1;if(b>0){s.textContent=Zr?Zr.emptyScript:"";for(let x=0;x<b;x++)s.append(g[x],xr()),Zt.nextNode(),i.push({type:2,index:++o});s.append(g[b],xr())}}}else if(s.nodeType===8)if(s.data===eo)i.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Ht,g+1))!==-1;)i.push({type:7,index:o}),g+=Ht.length-1}o++}}static createElement(t,r){let n=Xt.createElement("template");return n.innerHTML=t,n}};function lr(e,t,r=e,n){if(t===Qt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Sr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=lr(e,s._$AS(e,t.values),s,n)),t}var On=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Xt).importNode(r,!0);Zt.currentNode=s;let o=Zt.nextNode(),a=0,c=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Tr(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Fn(o,this,t)),this._$AV.push(d),i=n[++c]}a!==i?.index&&(o=Zt.nextNode(),a++)}return Zt.currentNode=Xt,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Tr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ke,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=lr(this,t,r),Sr(t)?t===Ke||t==null||t===""?(this._$AH!==Ke&&this._$AR(),this._$AH=Ke):t!==this._$AH&&t!==Qt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Yi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ke&&Sr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Xt.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Ar.createElement(ro(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new On(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Qs.get(t.strings);return r===void 0&&Qs.set(t.strings,r=new Ar(t)),r}k(t){qn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(xr()),this.O(xr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ke,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ke}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=lr(this,t,r,0),a=!Sr(t)||t!==this._$AH&&t!==Qt,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=lr(this,c[n+i],r,i),d===Qt&&(d=this._$AH[i]),a||(a=!Sr(d)||d!==this._$AH[i]),d===Ke?t=Ke:t!==Ke&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Ke?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Mn=class extends cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ke?void 0:t}},Nn=class extends cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ke)}},Pn=class extends cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=lr(this,t,r,0)??Ke)===Qt)return;let n=this._$AH,s=t===Ke&&n!==Ke||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ke&&(n===Ke||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Fn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){lr(this,t)}};var Ki=$r.litHtmlPolyfillSupport;Ki?.(Ar,Tr),($r.litHtmlVersions??($r.litHtmlVersions=[])).push("3.3.1");var Ae=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Tr(t.insertBefore(xr(),o),o,void 0,r??{})}return s._$AI(e),s};var kt="today",Lt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ft(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function no(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function so(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function oo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var po=ji(uo(),1);function He(e){return(0,po.default)(`beads-ui:${e}`)}function St(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function er(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function mo(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function go(e,t){let r=St(e.updated_at),n=St(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ho(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=St(e.created_at),o=St(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function bo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ll=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function fo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function _o(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ll.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function vo(e,t){let r=fo(e),n=fo(t);if(r!==n)return r<n?-1:1;let s=_o(e),o=_o(t);if(s!==o)return s<o?-1:1;let a=St(e&&e.created_at),c=St(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Un=2**20;function _r(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-St(e&&e.created_at)}function Jr(e){return(t,r)=>{let n=_r(t,e),s=_r(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function zn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:_r(c,r)-Un};if(!c)return{rank:_r(a,r)+Un};let i=_r(a,r),d=_r(c,r),m=(i+d)/2;return i<m&&m<d?{rank:m}:{renormalize:n.map((g,b)=>({bead_id:g.id,rank:b*Un}))}}function Hn(e,t={}){let r=He(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||er;function d(){for(let b of Array.from(a))try{b()}catch{}}function m(){s=Array.from(n.values()).sort(i)}function g(b){if(c||!b||b.id!==e)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let w=Array.isArray(b.issues)?b.issues:[];for(let h of w)h&&typeof h.id=="string"&&h.id.length>0&&n.set(h.id,h);m(),o=x,d();return}if(b.type==="upsert"){let w=b.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let h=n.get(w.id);if(!h)n.set(w.id,w);else{let E=Number.isFinite(h.updated_at)?h.updated_at:0,Y=Number.isFinite(w.updated_at)?w.updated_at:0;if(E<=Y){for(let H of Object.keys(h))H in w||delete h[H];for(let[H,K]of Object.entries(w))h[H]=K}}m()}o=x,d()}else if(b.type==="delete"){let w=String(b.issue_id||"");w&&(n.delete(w),m()),o=x,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function en(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function yo(e){let t=He("subs"),r=new Map,n=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let m=Array.isArray(i.added)?i.added:[],g=Array.isArray(i.updated)?i.updated:[],b=Array.isArray(i.removed)?i.removed:[];for(let x of Array.from(d)){let w=r.get(x);if(!w)continue;let h=w.itemsById;for(let E of m)typeof E=="string"&&E.length>0&&h.set(E,!0);for(let E of g)typeof E=="string"&&E.length>0&&h.set(E,!0);for(let E of b)typeof E=="string"&&E.length>0&&h.delete(E)}}async function o(c,i){let d=en(i);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let g=r.get(c);if(g&&g.key!==d){let b=n.get(g.key);b&&(b.delete(c),b.size===0&&n.delete(g.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let m=n.get(d);m&&m.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(g){let b=r.get(c)||null;if(b){let x=n.get(b.key);x&&(x.delete(c),x.size===0&&n.delete(b.key))}throw r.delete(c),g}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let g=r.get(c)||null;if(g){let b=n.get(g.key);b&&(b.delete(c),b.size===0&&n.delete(g.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:en,selectors:{getIds(c){let i=r.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=r.get(c);return d?d.itemsById.has(i):!1},count(c){let i=r.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=r.get(c),d={};if(!i)return d;for(let m of i.itemsById.keys())d[m]=!0;return d}}}}function wo(){let e=He("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,m){let g=d?en(d):"",b=r.get(i)||"",x=t.has(i);if(e("register %s key=%s (prev=%s)",i,g,b),x&&b&&g&&b!==g){let w=t.get(i);if(w)try{w.dispose()}catch{}let h=s.get(i);if(h){try{h()}catch{}s.delete(i)}let E=Hn(i,m);t.set(i,E);let Y=E.subscribe(()=>o());s.set(i,Y)}else if(!x){let w=Hn(i,m);t.set(i,w);let h=w.subscribe(()=>o());s.set(i,h)}return r.set(i,g),()=>c(i)}function c(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let m=s.get(i);if(m){try{m()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function ko(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function $o(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Wn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function cl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function dl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function xo(e){let t=He("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):cl(n),a=dl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Wn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Wn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var ul=Object.freeze({workspace_config:{default_workspace:null}});function So(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:ul.workspace_config.default_workspace}}}function Ao(e={}){let t=He("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:So(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?So(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,m)=>d!==r.workspace.hidden[m]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,m)=>d===r.worker.show_closed_children[m])&&!c&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function To(e){let t=He("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(g,b)=>{let x=s++,w=Date.now();n.set(x,{type:g,start_ts:w}),t("request start id=%d type=%s count=%d",x,g,r+1),a();let h=!1,E=()=>{h||(h=!0,n.delete(x),c())},Y=setTimeout(()=>{h||(t("request TIMEOUT id=%d type=%s elapsed=%dms",x,g,Date.now()-w),E())},3e4);try{let H=await d(g,b),K=Date.now()-w;return t("request done id=%d type=%s elapsed=%dms",x,g,K),H}catch(H){let K=Date.now()-w;throw t("request error id=%d type=%s elapsed=%dms err=%o",x,g,K,H),H}finally{clearTimeout(Y),E()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([m,g])=>({id:m,type:g.type,elapsed_ms:d-g.start_ts}))}}}function se(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function tn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(bo),i;switch(c){case"created_desc":return i.sort(er),i;case"created_asc":return i.sort(mo),i;case"updated_desc":return i.sort(go),i;case"priority":return i.sort(ho),i;case"manual":default:{let d=r();return d?i.sort(Jr(d)):i.sort(er),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Er(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ct(e){let t=Er(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function wt(e,t){let r=Er(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function rn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Er(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function nn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},m=n(zn(c,i,d.order),a);s(d,m);let g=await t("ui-order-set",{expected_revision:d.revision,entries:m});if(g&&g.conflict){let b={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(b);let x=n(zn(c,i,b.order),a);s(b,x);let w=await t("ui-order-set",{expected_revision:b.revision,entries:x});w&&w.applied&&r.set({revision:typeof w.revision=="number"?w.revision:0,order:w.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function sn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function jn(e,t){return!t||typeof e!="string"||e.length===0||sn(t.visible_labels).includes(e)?!0:sn(t.hidden_labels).includes(e)?!1:!sn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function on(e,t){return sn(e).filter(r=>jn(r,t))}function tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var pl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Eo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},fl={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},_l={review:"\u2713",skip:"\u2298"},Wt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ml(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Co(e){let t=e&&e.fill||"none";return t==="none"?Wt.none:e&&e.stale===!0?Wt.stale:t==="dim"?Wt.dim:e&&e.glyph==="review"?Wt.review:e&&e.glyph==="skip"?Wt.skip:Wt.done}function gl(e){if(!e||!e.approval_state)return Co(e);let t=[];return e.glyph==="review"?t.push(Wt.review):e.glyph==="skip"&&t.push(Wt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function hl(e,t,r){let n=pl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=_l[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Eo[e]||e}
      </div>
    </div>
  `}function an(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=fl[r],s=e.stages,o=ml(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(c=>`${Eo[c]||c} ${c==="plan"?gl(s[c]||{}):Co(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(c=>hl(c,s[c]||{},c===o))}
    </div>
  `}function bl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Ro=2;function vl(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Ro).join(", "),s=r.length-Ro,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function yl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&tr(r,"route")){let o=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&tr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&tr(r,"pr")){let o=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of on(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&tr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),tr(r,"blocked")&&s.push(...vl(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function wl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function kl(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ct(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ct(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function $l(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(vo):r.children;return l`
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
        ${kl(e)}
      </div>
      ${n>0&&r.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?l`<div class="board-card__roll-list">
            ${o.map((a,c)=>l`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${wl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ln(e,t){let r=bl(e.priority);return l`
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
      ${yl(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?an(e.workflow,e.status):""}
      ${$l(e,t)}
    </article>
  `}function mr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Lt.map(o=>l`<option
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
        ${e.items.map(o=>ln(o,t))}
      </div>
    </section>
  `}function Io(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ln(n,t))}
        </div>
      </div>
    </dialog>
  `}var xl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Sl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Al=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Tl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Lo(e,t,r){return l`
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
        ${xl.map(n=>l`<option
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
        ${Sl.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Tl(e,t,r)}
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
        ${Al.map(n=>l`<option
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
  `}var El=200,Cl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Rl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Do="beads-ui.board.sort",Oo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Il(){try{let e=window.localStorage.getItem(Do);if(e&&Oo.has(e))return e}catch{}return"created_desc"}function Mo(e,t){let r=He("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,m=t.closedRange||kt,g=s?tn(s,a):null,b=nn({transport:o,uiOrderStore:a}),x=[],w=[],h=[],E=[],Y=[],H=[],K=!1,P=0,A=Il(),S=new Map,N=new Map,z=new Map,le=new Set,oe={search:"",priority:"",type:"",labels:[]},ce=!1,ue=null;function Le(R){return String(R.status||"open")==="open"}function Be(R){let B=String(R.status||"open");return B==="open"||B==="blocked"}function De(R){let B=oe.search.trim().toLowerCase(),ee=oe.priority,ne=oe.type,fe=oe.labels;return R.filter(ge=>{if(B){let u=String(ge.id||"").toLowerCase(),v=String(ge.title||"").toLowerCase();if(!u.includes(B)&&!v.includes(B))return!1}if(ee!==""&&String(ge.priority)!==ee||ne!==""&&String(ge.issue_type||"")!==ne)return!1;if(fe.length>0){let u=Array.isArray(ge.labels)?ge.labels:[];if(!fe.some(v=>u.includes(v)))return!1}return!0})}function ie(){let R=new Set;for(let B of[x,w,h,E,Y,H])for(let ee of B){let ne=Array.isArray(ee.labels)?ee.labels:[];for(let fe of ne)typeof fe=="string"&&fe.length>0&&R.add(fe)}return Array.from(R).sort()}function T(){return oe.search.trim()!==""||oe.priority!==""||oe.type!==""||oe.labels.length>0}function C(){try{if(g){let R=g.selectBoardColumn("tab:board:in-progress","in_progress",A),B=g.selectBoardColumn("tab:board:blocked","blocked",A).filter(Be),ee=new Set(R.map(V=>V.id)),ne=g.selectBoardColumn("tab:board:ready","ready",A).filter(V=>Le(V)&&!ee.has(V.id)),fe=g.selectBoardColumn("tab:board:resolved","resolved",A),ge=g.selectBoardColumn("tab:board:deferred","deferred",A),u=g.selectBoardColumn("tab:board:closed","closed").slice(0,El),v=[...B,...ne,...R,...fe,...u];G(v);let L=new Set;for(let V of v)V&&V.id&&!Gn(V)&&L.add(V.id);let X=!T();x=X?Cr(B,L):B,w=X?Cr(ne,L):ne,h=X?Cr(R,L):R,E=X?Cr(fe,L):fe,Y=ge,P=ge.length,H=X?Cr(u,L):u,S=new Map;for(let V of x)S.set(V.id,"open");for(let V of w)S.set(V.id,"open");for(let V of h)S.set(V.id,"in_progress");for(let V of E)S.set(V.id,"resolved");for(let V of Y)S.set(V.id,"deferred");for(let V of H)S.set(V.id,"closed");N=new Map;for(let V of x)N.set(V.id,"blocked-col");for(let V of w)N.set(V.id,"ready-col");for(let V of h)N.set(V.id,"in-progress-col");for(let V of E)N.set(V.id,"resolved-col");for(let V of H)N.set(V.id,"closed-col")}ye()}catch{x=[],w=[],h=[],E=[],Y=[],H=[],z=new Map,ye()}}function G(R){let B=new Map;for(let ne of R)ne&&ne.id&&!B.has(ne.id)&&B.set(ne.id,ne);let ee=new Map;for(let ne of B.values()){let fe=Gn(ne);if(!fe)continue;let ge=ee.get(fe);ge||(ge=[],ee.set(fe,ge)),ge.push({id:ne.id,title:ne.title,status:ne.status,metadata:ne.metadata,created_at:ne.created_at,updated_at:ne.updated_at})}z=ee}function Z(R){let B=z.get(R)||[],ee=0;for(let fe of B)(fe.status==="resolved"||fe.status==="closed")&&(ee+=1);let ne=rn(B);return{total:B.length,count:ee,current:ne,children:B}}function te(R){return!le.has(R)}function ke(R,B){R.preventDefault(),R.stopPropagation(),le.has(B)?le.delete(B):le.add(B),ye()}function pe(R,B){R.preventDefault(),R.stopPropagation(),n(B)}function Ue(R,B){R.preventDefault(),R.stopPropagation(),n(B)}function _e(R,B){ue||n(B)}function Te(R,B){R.preventDefault(),R.stopPropagation(),Ll(B).then(ee=>{ee&&se("\uBCF5\uC0AC\uB428","success",1200)})}function F(R,B){ue=B,R.dataTransfer&&(R.dataTransfer.setData("text/plain",B),R.dataTransfer.effectAllowed="move"),R.target.classList.add("board-card--dragging")}function M(R){R.target.classList.remove("board-card--dragging"),dt(),setTimeout(()=>{ue=null},0)}function de(R){let B=String(R.target.value||"");!B||B===m||(m=B,i&&i(B),ye())}function qe(){return c?c.get():null}let D={onCardClick:_e,onCopyId:Te,onDragStart:F,onDragEnd:M,onClosedRangeChange:de,rollupFor:Z,isExpanded:te,onRollupToggle:ke,onChildClick:pe,onFromChipClick:Ue,get policy(){return qe()}};function W(R,B){ue||(We(),n(B))}function I(R,B){R.preventDefault(),R.stopPropagation(),We(),n(B)}let re={...D,onCardClick:W,onChildClick:I,onFromChipClick:I,get policy(){return qe()}};function J(R){let B=R.target,ee=e.querySelector(".board-filter__labels");B&&ee&&ee.contains(B)||$e()}function he(R){R.key==="Escape"&&$e()}function ve(){ce||(ce=!0,document.addEventListener("mousedown",J),document.addEventListener("keydown",he),ye())}function $e(){ce&&(ce=!1,document.removeEventListener("mousedown",J),document.removeEventListener("keydown",he),ye())}function Ce(R){R.key==="Escape"&&We()}function ze(){K||(K=!0,document.addEventListener("keydown",Ce),ye())}function We(){K&&(K=!1,document.removeEventListener("keydown",Ce),ye())}let nt={onClose:We,onOverlayClick(R){R.target===R.currentTarget&&We()}},st={onSearchInput(R){oe.search=String(R.target.value||""),C()},onPriorityChange(R){oe.priority=String(R.target.value||""),C()},onTypeChange(R){oe.type=String(R.target.value||""),C()},onSortChange(R){let B=String(R.target.value||"");if(!(!Oo.has(B)||B===A)){A=B;try{window.localStorage.setItem(Do,B)}catch{}C()}},onDeferredToggle(){K?We():ze()},onLabelMenuToggle(){ce?$e():ve()},onLabelToggle(R){let B=oe.labels.indexOf(R);B===-1?oe.labels.push(R):oe.labels.splice(B,1),C()},onLabelClear(){oe.labels.length!==0&&(oe.labels=[],C())},onNewIssue(){d&&d()}};function vt(){return l`
      <div class="board-view">
        ${Lo(oe,st,{sort_mode:A,deferred_popup_open:K,deferred_count:P,label_options:ie(),label_menu_open:ce})}
        <div class="board-root">
          ${mr({title:"Blocked",id:"blocked-col",items:De(x)},D)}
          ${mr({title:"Ready",id:"ready-col",items:De(w)},D)}
          ${mr({title:"In progress",id:"in-progress-col",items:De(h)},D)}
          ${mr({title:"Resolved",id:"resolved-col",items:De(E)},D)}
          ${mr({title:"Closed",id:"closed-col",items:De(H),is_closed:!0,closed_range:m},D)}
        </div>
        ${K?Io({items:De(Y),count:P},re,nt):""}
      </div>
    `}function ye(){Ae(vt(),e),gt()}function gt(){try{let R=e.querySelector("#deferred-popup");R&&!R.open&&(typeof R.showModal=="function"?R.showModal():R.setAttribute("open",""));let B=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ee of B)Array.from(ee.querySelectorAll(".board-card")).forEach((fe,ge)=>{fe.tabIndex=ge===0?0:-1})}catch{}}async function it(R,B){if(!o){se("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:R,status:B}),se("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){r("update-status failed: %o",ee),se("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ye(R){switch(R){case"blocked-col":return x;case"ready-col":return w;case"in-progress-col":return h;case"resolved-col":return E;default:return[]}}function at(R,B,ee){if(!o||!a)return;let ne=Ye(R),fe=ne.find(X=>X.id===B);if(!fe)return;let ge=ne.filter(X=>X.id!==B),u=ee.closest?ee.closest(".board-card"):null,v=ge.length;if(u){let X=u.getAttribute("data-issue-id");if(X===B)return;let V=ge.findIndex(me=>me.id===X);V>=0&&(v=V)}let L=ge.slice();L.splice(v,0,fe),b.applyReorder(B,L,v)}function dt(){for(let R of Array.from(e.querySelectorAll(".board-column--drag-over")))R.classList.remove("board-column--drag-over")}let Ge=null;e.addEventListener("dragover",R=>{R.preventDefault(),R.dataTransfer&&(R.dataTransfer.dropEffect="move");let ee=R.target.closest(".board-column");ee&&ee!==Ge&&(Ge&&Ge.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),Ge=ee)}),e.addEventListener("dragleave",R=>{let B=R.relatedTarget;(!B||!e.contains(B))&&Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null)}),e.addEventListener("drop",R=>{R.preventDefault(),Ge&&(Ge.classList.remove("board-column--drag-over"),Ge=null);let B=R.target,ee=B.closest(".board-column");if(!ee)return;let ne=R.dataTransfer?.getData("text/plain")||"";if(!ne)return;let fe=ee.id,ge=N.get(ne);if(ge&&ge===fe){if(Rl.has(fe)){if(A!=="manual"){se("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}at(fe,ne,B)}return}let u=Cl[fe];if(!u){se("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(ne)!==u&&it(ne,u)}),e.addEventListener("keydown",R=>{let B=R.target;if(!(B instanceof HTMLElement))return;let ee=String(B.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||B.isContentEditable===!0)return;let ne=B.closest(".board-card");if(!ne)return;let fe=String(R.key||"");if(fe==="Enter"||fe===" "){R.preventDefault();let L=ne.getAttribute("data-issue-id");L&&n(L);return}if(fe!=="ArrowUp"&&fe!=="ArrowDown"&&fe!=="ArrowLeft"&&fe!=="ArrowRight")return;R.preventDefault();let ge=ne.closest(".board-column");if(!ge)return;let u=Array.from(ge.querySelectorAll(".board-card")),v=u.indexOf(ne);if(fe==="ArrowDown"&&v<u.length-1){ot(ne,u[v+1]);return}if(fe==="ArrowUp"&&v>0){ot(ne,u[v-1]);return}if(fe==="ArrowLeft"||fe==="ArrowRight"){let L=Array.from(e.querySelectorAll(".board-column")),X=L.indexOf(ge),V=fe==="ArrowRight"?1:-1,me=X+V;for(;me>=0&&me<L.length;){let Re=L[me].querySelector(".board-card");if(Re){ot(ne,Re);return}me+=V}}});function ot(R,B){try{R.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let tt=null;g&&g.subscribe&&(tt=g.subscribe(()=>{try{C()}catch{}}));let Ze=null;return c&&c.subscribe&&(Ze=c.subscribe(()=>{try{C()}catch{}})),{async load(){r("load"),C()},clear(){$e(),We(),tt&&(tt(),tt=null),Ze&&(Ze(),Ze=null),e.replaceChildren(),x=[],w=[],h=[],E=[],Y=[],H=[],S=new Map,N=new Map}}}function Gn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Cr(e,t){return e.filter(r=>{let n=Gn(r);return!(n&&t.has(n))})}async function Ll(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Dl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function nr(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function No(e){let t=0;for(let r of qt)t+=nr(e?.[r]);return t}function Po(e){return!e||typeof e!="object"?!1:qt.some(t=>Number.isFinite(e[t]))}function Ol(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function gr(e){return Po(e)?`\u03C4 ${Ol(No(e))}`:null}function At(e){let t=gr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${nr(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nr(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${nr(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nr(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${No(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Dl),r.join(`
`)}function Dt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Po(i)){n+=1;for(let d of qt)r[d]=nr(r[d])+nr(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:Go,setPrototypeOf:Fo,isFrozen:Ml,getPrototypeOf:Nl,getOwnPropertyDescriptor:Pl}=Object,{freeze:ft,seal:$t,create:Jn}=Object,{apply:es,construct:ts}=typeof Reflect<"u"&&Reflect;ft||(ft=function(t){return t});$t||($t=function(t){return t});es||(es=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ts||(ts=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var cn=_t(Array.prototype.forEach),Fl=_t(Array.prototype.lastIndexOf),qo=_t(Array.prototype.pop),Rr=_t(Array.prototype.push),ql=_t(Array.prototype.splice),un=_t(String.prototype.toLowerCase),Yn=_t(String.prototype.toString),Vn=_t(String.prototype.match),Ir=_t(String.prototype.replace),Bl=_t(String.prototype.indexOf),Ul=_t(String.prototype.trim),Tt=_t(Object.prototype.hasOwnProperty),pt=_t(RegExp.prototype.test),Lr=zl(TypeError);function _t(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return es(e,t,n)}}function zl(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ts(e,r)}}function xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:un;Fo&&Fo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ml(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Hl(e){for(let t=0;t<e.length;t++)Tt(e,t)||(e[t]=null);return e}function Bt(e){let t=Jn(null);for(let[r,n]of Go(e))Tt(e,r)&&(Array.isArray(n)?t[r]=Hl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Bt(n):t[r]=n);return t}function Dr(e,t){for(;e!==null;){let n=Pl(e,t);if(n){if(n.get)return _t(n.get);if(typeof n.value=="function")return _t(n.value)}e=Nl(e)}function r(){return null}return r}var Bo=ft(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Kn=ft(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Zn=ft(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Wl=ft(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Xn=ft(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),jl=ft(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Uo=ft(["#text"]),zo=ft(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Qn=ft(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ho=ft(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),dn=ft(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gl=$t(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Yl=$t(/<%[\w\W]*|[\w\W]*%>/gm),Vl=$t(/\$\{[\w\W]*/gm),Kl=$t(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zl=$t(/^aria-[\-\w]+$/),Yo=$t(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Xl=$t(/^(?:\w+script|data):/i),Ql=$t(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Vo=$t(/^html$/i),Jl=$t(/^[a-z][.\w]*(-[.\w]+)+$/i),Wo=Object.freeze({__proto__:null,ARIA_ATTR:Zl,ATTR_WHITESPACE:Ql,CUSTOM_ELEMENT:Jl,DATA_ATTR:Kl,DOCTYPE_NAME:Vo,ERB_EXPR:Yl,IS_ALLOWED_URI:Yo,IS_SCRIPT_OR_DATA:Xl,MUSTACHE_EXPR:Gl,TMPLIT_EXPR:Vl}),Or={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ec=function(){return typeof window>"u"?null:window},tc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},jo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ko(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ec(),t=f=>Ko(f);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Or.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:m=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:b,trustedTypes:x}=e,w=i.prototype,h=Dr(w,"cloneNode"),E=Dr(w,"remove"),Y=Dr(w,"nextSibling"),H=Dr(w,"childNodes"),K=Dr(w,"parentNode");if(typeof a=="function"){let f=r.createElement("template");f.content&&f.content.ownerDocument&&(r=f.content.ownerDocument)}let P,A="",{implementation:S,createNodeIterator:N,createDocumentFragment:z,getElementsByTagName:le}=r,{importNode:oe}=n,ce=jo();t.isSupported=typeof Go=="function"&&typeof K=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Le,TMPLIT_EXPR:Be,DATA_ATTR:De,ARIA_ATTR:ie,IS_SCRIPT_OR_DATA:T,ATTR_WHITESPACE:C,CUSTOM_ELEMENT:G}=Wo,{IS_ALLOWED_URI:Z}=Wo,te=null,ke=xe({},[...Bo,...Kn,...Zn,...Xn,...Uo]),pe=null,Ue=xe({},[...zo,...Qn,...Ho,...dn]),_e=Object.seal(Jn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Te=null,F=null,M=Object.seal(Jn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),de=!0,qe=!0,D=!1,W=!0,I=!1,re=!0,J=!1,he=!1,ve=!1,$e=!1,Ce=!1,ze=!1,We=!0,nt=!1,st="user-content-",vt=!0,ye=!1,gt={},it=null,Ye=xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),at=null,dt=xe({},["audio","video","img","source","image","track"]),Ge=null,ot=xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),tt="http://www.w3.org/1998/Math/MathML",Ze="http://www.w3.org/2000/svg",R="http://www.w3.org/1999/xhtml",B=R,ee=!1,ne=null,fe=xe({},[tt,Ze,R],Yn),ge=xe({},["mi","mo","mn","ms","mtext"]),u=xe({},["annotation-xml"]),v=xe({},["title","style","font","a","script"]),L=null,X=["application/xhtml+xml","text/html"],V="text/html",me=null,Re=null,Me=r.createElement("form"),Ve=function(p){return p instanceof RegExp||p instanceof Function},rt=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Re&&Re===p)){if((!p||typeof p!="object")&&(p={}),p=Bt(p),L=X.indexOf(p.PARSER_MEDIA_TYPE)===-1?V:p.PARSER_MEDIA_TYPE,me=L==="application/xhtml+xml"?Yn:un,te=Tt(p,"ALLOWED_TAGS")?xe({},p.ALLOWED_TAGS,me):ke,pe=Tt(p,"ALLOWED_ATTR")?xe({},p.ALLOWED_ATTR,me):Ue,ne=Tt(p,"ALLOWED_NAMESPACES")?xe({},p.ALLOWED_NAMESPACES,Yn):fe,Ge=Tt(p,"ADD_URI_SAFE_ATTR")?xe(Bt(ot),p.ADD_URI_SAFE_ATTR,me):ot,at=Tt(p,"ADD_DATA_URI_TAGS")?xe(Bt(dt),p.ADD_DATA_URI_TAGS,me):dt,it=Tt(p,"FORBID_CONTENTS")?xe({},p.FORBID_CONTENTS,me):Ye,Te=Tt(p,"FORBID_TAGS")?xe({},p.FORBID_TAGS,me):Bt({}),F=Tt(p,"FORBID_ATTR")?xe({},p.FORBID_ATTR,me):Bt({}),gt=Tt(p,"USE_PROFILES")?p.USE_PROFILES:!1,de=p.ALLOW_ARIA_ATTR!==!1,qe=p.ALLOW_DATA_ATTR!==!1,D=p.ALLOW_UNKNOWN_PROTOCOLS||!1,W=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,I=p.SAFE_FOR_TEMPLATES||!1,re=p.SAFE_FOR_XML!==!1,J=p.WHOLE_DOCUMENT||!1,$e=p.RETURN_DOM||!1,Ce=p.RETURN_DOM_FRAGMENT||!1,ze=p.RETURN_TRUSTED_TYPE||!1,ve=p.FORCE_BODY||!1,We=p.SANITIZE_DOM!==!1,nt=p.SANITIZE_NAMED_PROPS||!1,vt=p.KEEP_CONTENT!==!1,ye=p.IN_PLACE||!1,Z=p.ALLOWED_URI_REGEXP||Yo,B=p.NAMESPACE||R,ge=p.MATHML_TEXT_INTEGRATION_POINTS||ge,u=p.HTML_INTEGRATION_POINTS||u,_e=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ve(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(_e.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ve(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(_e.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(_e.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),I&&(qe=!1),Ce&&($e=!0),gt&&(te=xe({},Uo),pe=[],gt.html===!0&&(xe(te,Bo),xe(pe,zo)),gt.svg===!0&&(xe(te,Kn),xe(pe,Qn),xe(pe,dn)),gt.svgFilters===!0&&(xe(te,Zn),xe(pe,Qn),xe(pe,dn)),gt.mathMl===!0&&(xe(te,Xn),xe(pe,Ho),xe(pe,dn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?M.tagCheck=p.ADD_TAGS:(te===ke&&(te=Bt(te)),xe(te,p.ADD_TAGS,me))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?M.attributeCheck=p.ADD_ATTR:(pe===Ue&&(pe=Bt(pe)),xe(pe,p.ADD_ATTR,me))),p.ADD_URI_SAFE_ATTR&&xe(Ge,p.ADD_URI_SAFE_ATTR,me),p.FORBID_CONTENTS&&(it===Ye&&(it=Bt(it)),xe(it,p.FORBID_CONTENTS,me)),vt&&(te["#text"]=!0),J&&xe(te,["html","head","body"]),te.table&&(xe(te,["tbody"]),delete Te.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Lr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Lr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');P=p.TRUSTED_TYPES_POLICY,A=P.createHTML("")}else P===void 0&&(P=tc(x,s)),P!==null&&typeof A=="string"&&(A=P.createHTML(""));ft&&ft(p),Re=p}},ht=xe({},[...Kn,...Zn,...Wl]),we=xe({},[...Xn,...jl]),lt=function(p){let $=K(p);(!$||!$.tagName)&&($={namespaceURI:B,tagName:"template"});let O=un(p.tagName),Q=un($.tagName);return ne[p.namespaceURI]?p.namespaceURI===Ze?$.namespaceURI===R?O==="svg":$.namespaceURI===tt?O==="svg"&&(Q==="annotation-xml"||ge[Q]):!!ht[O]:p.namespaceURI===tt?$.namespaceURI===R?O==="math":$.namespaceURI===Ze?O==="math"&&u[Q]:!!we[O]:p.namespaceURI===R?$.namespaceURI===Ze&&!u[Q]||$.namespaceURI===tt&&!ge[Q]?!1:!we[O]&&(v[O]||!ht[O]):!!(L==="application/xhtml+xml"&&ne[p.namespaceURI]):!1},Xe=function(p){Rr(t.removed,{element:p});try{K(p).removeChild(p)}catch{E(p)}},Qe=function(p,$){try{Rr(t.removed,{attribute:$.getAttributeNode(p),from:$})}catch{Rr(t.removed,{attribute:null,from:$})}if($.removeAttribute(p),p==="is")if($e||Ce)try{Xe($)}catch{}else try{$.setAttribute(p,"")}catch{}},be=function(p){let $=null,O=null;if(ve)p="<remove></remove>"+p;else{let je=Vn(p,/^[\r\n\t ]+/);O=je&&je[0]}L==="application/xhtml+xml"&&B===R&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Q=P?P.createHTML(p):p;if(B===R)try{$=new b().parseFromString(Q,L)}catch{}if(!$||!$.documentElement){$=S.createDocument(B,"template",null);try{$.documentElement.innerHTML=ee?A:Q}catch{}}let Ne=$.body||$.documentElement;return p&&O&&Ne.insertBefore(r.createTextNode(O),Ne.childNodes[0]||null),B===R?le.call($,J?"html":"body")[0]:J?$.documentElement:Ne},Se=function(p){return N.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xt=function(p){return p instanceof g&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof m)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Mt=function(p){return typeof c=="function"&&p instanceof c};function ut(f,p,$){cn(f,O=>{O.call(t,p,$,Re)})}let Ee=function(p){let $=null;if(ut(ce.beforeSanitizeElements,p,null),xt(p))return Xe(p),!0;let O=me(p.nodeName);if(ut(ce.uponSanitizeElement,p,{tagName:O,allowedTags:te}),re&&p.hasChildNodes()&&!Mt(p.firstElementChild)&&pt(/<[/\w!]/g,p.innerHTML)&&pt(/<[/\w!]/g,p.textContent)||p.nodeType===Or.progressingInstruction||re&&p.nodeType===Or.comment&&pt(/<[/\w]/g,p.data))return Xe(p),!0;if(!(M.tagCheck instanceof Function&&M.tagCheck(O))&&(!te[O]||Te[O])){if(!Te[O]&&U(O)&&(_e.tagNameCheck instanceof RegExp&&pt(_e.tagNameCheck,O)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(O)))return!1;if(vt&&!it[O]){let Q=K(p)||p.parentNode,Ne=H(p)||p.childNodes;if(Ne&&Q){let je=Ne.length;for(let Je=je-1;Je>=0;--Je){let yt=h(Ne[Je],!0);yt.__removalCount=(p.__removalCount||0)+1,Q.insertBefore(yt,Y(p))}}}return Xe(p),!0}return p instanceof i&&!lt(p)||(O==="noscript"||O==="noembed"||O==="noframes")&&pt(/<\/no(script|embed|frames)/i,p.innerHTML)?(Xe(p),!0):(I&&p.nodeType===Or.text&&($=p.textContent,cn([ue,Le,Be],Q=>{$=Ir($,Q," ")}),p.textContent!==$&&(Rr(t.removed,{element:p.cloneNode()}),p.textContent=$)),ut(ce.afterSanitizeElements,p,null),!1)},y=function(p,$,O){if(We&&($==="id"||$==="name")&&(O in r||O in Me))return!1;if(!(qe&&!F[$]&&pt(De,$))){if(!(de&&pt(ie,$))){if(!(M.attributeCheck instanceof Function&&M.attributeCheck($,p))){if(!pe[$]||F[$]){if(!(U(p)&&(_e.tagNameCheck instanceof RegExp&&pt(_e.tagNameCheck,p)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(p))&&(_e.attributeNameCheck instanceof RegExp&&pt(_e.attributeNameCheck,$)||_e.attributeNameCheck instanceof Function&&_e.attributeNameCheck($,p))||$==="is"&&_e.allowCustomizedBuiltInElements&&(_e.tagNameCheck instanceof RegExp&&pt(_e.tagNameCheck,O)||_e.tagNameCheck instanceof Function&&_e.tagNameCheck(O))))return!1}else if(!Ge[$]){if(!pt(Z,Ir(O,C,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&p!=="script"&&Bl(O,"data:")===0&&at[p])){if(!(D&&!pt(T,Ir(O,C,"")))){if(O)return!1}}}}}}}return!0},U=function(p){return p!=="annotation-xml"&&Vn(p,G)},q=function(p){ut(ce.beforeSanitizeAttributes,p,null);let{attributes:$}=p;if(!$||xt(p))return;let O={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},Q=$.length;for(;Q--;){let Ne=$[Q],{name:je,namespaceURI:Je,value:yt}=Ne,Nt=me(je),ar=yt,et=je==="value"?ar:Ul(ar);if(O.attrName=Nt,O.attrValue=et,O.keepAttr=!0,O.forceKeepAttr=void 0,ut(ce.uponSanitizeAttribute,p,O),et=O.attrValue,nt&&(Nt==="id"||Nt==="name")&&(Qe(je,p),et=st+et),re&&pt(/((--!?|])>)|<\/(style|title|textarea)/i,et)){Qe(je,p);continue}if(Nt==="attributename"&&Vn(et,"href")){Qe(je,p);continue}if(O.forceKeepAttr)continue;if(!O.keepAttr){Qe(je,p);continue}if(!W&&pt(/\/>/i,et)){Qe(je,p);continue}I&&cn([ue,Le,Be],Gr=>{et=Ir(et,Gr," ")});let ir=me(p.nodeName);if(!y(ir,Nt,et)){Qe(je,p);continue}if(P&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!Je)switch(x.getAttributeType(ir,Nt)){case"TrustedHTML":{et=P.createHTML(et);break}case"TrustedScriptURL":{et=P.createScriptURL(et);break}}if(et!==ar)try{Je?p.setAttributeNS(Je,je,et):p.setAttribute(je,et),xt(p)?Xe(p):qo(t.removed)}catch{Qe(je,p)}}ut(ce.afterSanitizeAttributes,p,null)},_=function f(p){let $=null,O=Se(p);for(ut(ce.beforeSanitizeShadowDOM,p,null);$=O.nextNode();)ut(ce.uponSanitizeShadowNode,$,null),Ee($),q($),$.content instanceof o&&f($.content);ut(ce.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(f){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,O=null,Q=null,Ne=null;if(ee=!f,ee&&(f="<!-->"),typeof f!="string"&&!Mt(f))if(typeof f.toString=="function"){if(f=f.toString(),typeof f!="string")throw Lr("dirty is not a string, aborting")}else throw Lr("toString is not a function");if(!t.isSupported)return f;if(he||rt(p),t.removed=[],typeof f=="string"&&(ye=!1),ye){if(f.nodeName){let yt=me(f.nodeName);if(!te[yt]||Te[yt])throw Lr("root node is forbidden and cannot be sanitized in-place")}}else if(f instanceof c)$=be("<!---->"),O=$.ownerDocument.importNode(f,!0),O.nodeType===Or.element&&O.nodeName==="BODY"||O.nodeName==="HTML"?$=O:$.appendChild(O);else{if(!$e&&!I&&!J&&f.indexOf("<")===-1)return P&&ze?P.createHTML(f):f;if($=be(f),!$)return $e?null:ze?A:""}$&&ve&&Xe($.firstChild);let je=Se(ye?f:$);for(;Q=je.nextNode();)Ee(Q),q(Q),Q.content instanceof o&&_(Q.content);if(ye)return f;if($e){if(Ce)for(Ne=z.call($.ownerDocument);$.firstChild;)Ne.appendChild($.firstChild);else Ne=$;return(pe.shadowroot||pe.shadowrootmode)&&(Ne=oe.call(n,Ne,!0)),Ne}let Je=J?$.outerHTML:$.innerHTML;return J&&te["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&pt(Vo,$.ownerDocument.doctype.name)&&(Je="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Je),I&&cn([ue,Le,Be],yt=>{Je=Ir(Je,yt," ")}),P&&ze?P.createHTML(Je):Je},t.setConfig=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};rt(f),he=!0},t.clearConfig=function(){Re=null,he=!1},t.isValidAttribute=function(f,p,$){Re||rt({});let O=me(f),Q=me(p);return y(O,Q,$)},t.addHook=function(f,p){typeof p=="function"&&Rr(ce[f],p)},t.removeHook=function(f,p){if(p!==void 0){let $=Fl(ce[f],p);return $===-1?void 0:ql(ce[f],$,1)[0]}return qo(ce[f])},t.removeHooks=function(f){ce[f]=[]},t.removeAllHooks=function(){ce=jo()},t}var Zo=Ko();var Xo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qo=e=>(...t)=>({_$litDirective$:e,values:t}),pn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Mr=class extends pn{constructor(t){if(super(t),this.it=Ke,t.type!==Xo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ke||t==null)return this._t=void 0,this.it=t;if(t===Qt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Mr.directiveName="unsafeHTML",Mr.resultType=1;var Jo=Qo(Mr);function os(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var or=os();function aa(e){or=e}var qr={exec:()=>null};function Ie(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(mt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var rc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),mt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},nc=/^(?:[ \t]*(?:\n|$))+/,sc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,oc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Br=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ac=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,as=/(?:[*+-]|\d{1,9}[.)])/,ia=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,la=Ie(ia).replace(/bull/g,as).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ic=Ie(ia).replace(/bull/g,as).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),is=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lc=/^[^\n]+/,ls=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cc=Ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ls).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),dc=Ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,as).getRegex(),bn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",cs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,uc=Ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",cs).replace("tag",bn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ca=Ie(is).replace("hr",Br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),pc=Ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ca).getRegex(),ds={blockquote:pc,code:sc,def:cc,fences:oc,heading:ac,hr:Br,html:uc,lheading:la,list:dc,newline:nc,paragraph:ca,table:qr,text:lc},ea=Ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),fc={...ds,lheading:ic,table:ea,paragraph:Ie(is).replace("hr",Br).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ea).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex()},_c={...ds,html:Ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",cs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:qr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ie(is).replace("hr",Br).replace("heading",` *#{1,6} *[^
]`).replace("lheading",la).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,da=/^( {2,}|\\)\n(?!\s*$)/,hc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vn=/[\p{P}\p{S}]/u,us=/[\s\p{P}\p{S}]/u,ua=/[^\s\p{P}\p{S}]/u,bc=Ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,us).getRegex(),pa=/(?!~)[\p{P}\p{S}]/u,vc=/(?!~)[\s\p{P}\p{S}]/u,yc=/(?:[^\s\p{P}\p{S}]|~)/u,wc=Ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",rc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),fa=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kc=Ie(fa,"u").replace(/punct/g,vn).getRegex(),$c=Ie(fa,"u").replace(/punct/g,pa).getRegex(),_a="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xc=Ie(_a,"gu").replace(/notPunctSpace/g,ua).replace(/punctSpace/g,us).replace(/punct/g,vn).getRegex(),Sc=Ie(_a,"gu").replace(/notPunctSpace/g,yc).replace(/punctSpace/g,vc).replace(/punct/g,pa).getRegex(),Ac=Ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ua).replace(/punctSpace/g,us).replace(/punct/g,vn).getRegex(),Tc=Ie(/\\(punct)/,"gu").replace(/punct/g,vn).getRegex(),Ec=Ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cc=Ie(cs).replace("(?:-->|$)","-->").getRegex(),Rc=Ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ic=Ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ma=Ie(/^!?\[(label)\]\[(ref)\]/).replace("label",mn).replace("ref",ls).getRegex(),ga=Ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",ls).getRegex(),Lc=Ie("reflink|nolink(?!\\()","g").replace("reflink",ma).replace("nolink",ga).getRegex(),ta=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ps={_backpedal:qr,anyPunctuation:Tc,autolink:Ec,blockSkip:wc,br:da,code:gc,del:qr,emStrongLDelim:kc,emStrongRDelimAst:xc,emStrongRDelimUnd:Ac,escape:mc,link:Ic,nolink:ga,punctuation:bc,reflink:ma,reflinkSearch:Lc,tag:Rc,text:hc,url:qr},Dc={...ps,link:Ie(/^!?\[(label)\]\((.*?)\)/).replace("label",mn).getRegex(),reflink:Ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mn).getRegex()},rs={...ps,emStrongRDelimAst:Sc,emStrongLDelim:$c,url:Ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ta).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ta).getRegex()},Oc={...rs,br:Ie(da).replace("{2,}","*").getRegex(),text:Ie(rs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fn={normal:ds,gfm:fc,pedantic:_c},Nr={normal:ps,gfm:rs,breaks:Oc,pedantic:Dc},Mc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ra=e=>Mc[e];function Ut(e,t){if(t){if(mt.escapeTest.test(e))return e.replace(mt.escapeReplace,ra)}else if(mt.escapeTestNoEncode.test(e))return e.replace(mt.escapeReplaceNoEncode,ra);return e}function na(e){try{e=encodeURI(e).replace(mt.percentDecode,"%")}catch{return null}return e}function sa(e,t){let r=e.replace(mt.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(mt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(mt.slashPipe,"|");return n}function Pr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Nc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function oa(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,i}function Pc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var gn=class{constructor(e){Fe(this,"options");Fe(this,"rules");Fe(this,"lexer");this.options=e||or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Pr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Pc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Pr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Pr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Pr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))c.push(r[i]),a=!0;else if(!a)c.push(r[i]);else break;r=r.slice(i);let d=c.join(`
`),m=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${m}`:m;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(m,o,!0),this.lexer.state.top=g,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,w=x.raw+`
`+r.join(`
`),h=this.blockquote(w);o[o.length-1]=h,n=n.substring(0,n.length-x.raw.length)+h.raw,s=s.substring(0,s.length-x.text.length)+h.text;break}else if(b?.type==="list"){let x=b,w=x.raw+`
`+r.join(`
`),h=this.list(w);o[o.length-1]=h,n=n.substring(0,n.length-b.raw.length)+h.raw,s=s.substring(0,s.length-x.raw.length)+h.raw,r=w.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",m="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,h=>" ".repeat(3*h.length)),b=e.split(`
`,1)[0],x=!g.trim(),w=0;if(this.options.pedantic?(w=2,m=g.trimStart()):x?w=t[1].length+1:(w=t[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,m=g.slice(w),w+=t[1].length),x&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),i=!0),!i){let h=this.rules.other.nextBulletRegex(w),E=this.rules.other.hrRegex(w),Y=this.rules.other.fencesBeginRegex(w),H=this.rules.other.headingBeginRegex(w),K=this.rules.other.htmlBeginRegex(w);for(;e;){let P=e.split(`
`,1)[0],A;if(b=P,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),A=b):A=b.replace(this.rules.other.tabCharGlobal,"    "),Y.test(b)||H.test(b)||K.test(b)||h.test(b)||E.test(b))break;if(A.search(this.rules.other.nonSpaceChar)>=w||!b.trim())m+=`
`+A.slice(w);else{if(x||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(g)||H.test(g)||E.test(g))break;m+=`
`+b}!x&&!b.trim()&&(x=!0),d+=P+`
`,e=e.substring(P.length+1),g=A.slice(w)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(m),loose:!1,text:m,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let m=this.lexer.inlineQueue.length-1;m>=0;m--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[m].src)){this.lexer.inlineQueue[m].src=this.lexer.inlineQueue[m].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let m={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=m.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=m.raw+i.tokens[0].raw,i.tokens[0].text=m.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(m)):i.tokens.unshift({type:"paragraph",raw:m.raw,text:m.raw,tokens:[m]}):i.tokens.unshift(m)}}if(!s.loose){let d=i.tokens.filter(g=>g.type==="space"),m=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=m}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=sa(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(sa(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Pr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Nc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),oa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return oa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let m=[...n[0]][0].length,g=e.slice(0,s+n.index+m+a);if(Math.min(s,a)%2){let x=g.slice(1,-1);return{type:"em",raw:g,text:x,tokens:this.lexer.inlineTokens(x)}}let b=g.slice(2,-2);return{type:"strong",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Et=class ns{constructor(t){Fe(this,"tokens");Fe(this,"options");Fe(this,"state");Fe(this,"inlineQueue");Fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||or,this.options.tokenizer=this.options.tokenizer||new gn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:mt,block:fn.normal,inline:Nr.normal};this.options.pedantic?(r.block=fn.pedantic,r.inline=Nr.pedantic):this.options.gfm&&(r.block=fn.gfm,this.options.breaks?r.inline=Nr.breaks:r.inline=Nr.gfm),this.tokenizer.rules=r}static get rules(){return{block:fn,inline:Nr}}static lex(t,r){return new ns(r).lex(t)}static lexInline(t,r){return new ns(r).inlineTokens(t)}lex(t){t=t.replace(mt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(mt.tabCharGlobal,"    ").replace(mt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},c),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(m=>(i=m.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let m=r.at(-1);i.type==="text"&&m?.type==="text"?(m.raw+=i.raw,m.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,c)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let m=1/0,g=t.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},g),typeof b=="number"&&b>=0&&(m=Math.min(m,b))}),m<1/0&&m>=0&&(d=t.substring(0,m+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let m=r.at(-1);m?.type==="text"?(m.raw+=i.raw,m.text+=i.text):r.push(i);continue}if(t){let m="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(m);break}else throw new Error(m)}}return r}},hn=class{constructor(e){Fe(this,"options");Fe(this,"parser");this.options=e||or}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(mt.notSpaceStart)?.[0],s=e.replace(mt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Ut(n)+'">'+(r?s:Ut(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Ut(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let c=e.items[a];n+=this.listitem(c)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ut(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=na(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ut(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=na(e);if(s===null)return Ut(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ut(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ut(e.text)}},fs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ct=class ss{constructor(t){Fe(this,"options");Fe(this,"renderer");Fe(this,"textRenderer");this.options=t||or,this.options.renderer=this.options.renderer||new hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new fs}static parse(t,r){return new ss(r).parse(t)}static parseInline(t,r){return new ss(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},_n,Fr=(_n=class{constructor(e){Fe(this,"options");Fe(this,"block");this.options=e||or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Et.lex:Et.lexInline}provideParser(){return this.block?Ct.parse:Ct.parseInline}},Fe(_n,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Fe(_n,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_n),Fc=class{constructor(...e){Fe(this,"defaults",os());Fe(this,"options",this.setOptions);Fe(this,"parse",this.parseMarkdown(!0));Fe(this,"parseInline",this.parseMarkdown(!1));Fe(this,"Parser",Ct);Fe(this,"Renderer",hn);Fe(this,"TextRenderer",fs);Fe(this,"Lexer",Et);Fe(this,"Tokenizer",gn);Fe(this,"Hooks",Fr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new hn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],i=s[a];s[a]=(...d)=>{let m=c.apply(s,d);return m===!1&&(m=i.apply(s,d)),m||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new gn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let m=c.apply(s,d);return m===!1&&(m=i.apply(s,d)),m}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Fr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],i=s[a];Fr.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Fr.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await c.call(s,d);return i.call(s,g)})();let m=c.call(s,d);return i.call(s,m)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(s,d);return g===!1&&(g=await i.apply(s,d)),g})();let m=c.apply(s,d);return m===!1&&(m=i.apply(s,d)),m}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Et.lex(e,t??this.defaults)}parser(e,t){return Ct.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Et.lex:Et.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Et.lex:Et.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ut(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},sr=new Fc;function Oe(e,t){return sr.parse(e,t)}Oe.options=Oe.setOptions=function(e){return sr.setOptions(e),Oe.defaults=sr.defaults,aa(Oe.defaults),Oe};Oe.getDefaults=os;Oe.defaults=or;Oe.use=function(...e){return sr.use(...e),Oe.defaults=sr.defaults,aa(Oe.defaults),Oe};Oe.walkTokens=function(e,t){return sr.walkTokens(e,t)};Oe.parseInline=sr.parseInline;Oe.Parser=Ct;Oe.parser=Ct.parse;Oe.Renderer=hn;Oe.TextRenderer=fs;Oe.Lexer=Et;Oe.lexer=Et.lex;Oe.Tokenizer=gn;Oe.Hooks=Fr;Oe.parse=Oe;var nf=Oe.options,sf=Oe.setOptions,of=Oe.use,af=Oe.walkTokens,lf=Oe.parseInline;var cf=Ct.parse,df=Et.lex;function jt(e){let t=Oe.parse(e),r=Zo.sanitize(t);return Jo(r)}function zt(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function br(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function yn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var qc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Bc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Uc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Gt(e){return!!e&&typeof e=="object"}function _s(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ha(e,t){let r=_s(e),n=_s(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function zc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Gt(s)&&typeof s.text=="string"?s.text:"").join(""):Gt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Hc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:qc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=_s(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ha(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let i=ha(Gt(c)?c.old_string:"",Gt(c)?c.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ba(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function va(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Bc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Uc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Wc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Gt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(va(o.text));else if(o.type==="thinking"){let a=ba(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Hc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Gt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=zc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function jc(e){if(e.type==="item.completed"&&Gt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[va(t.text)];if(t.type==="reasoning"){let r=ba(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Gc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ya(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!Gt(o))continue;let a=Gc(o)?jc(o):Wc(o,r);for(let c of a)t.push(c)}return t}var Yc=5,Vc=10,Kc=/Task\s+#(\d+)/,Zc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Xc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function wn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Qc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Jc(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function ed(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=Kc.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function td(e){if(e.tool==="Bash"){let t=e.command||"";return Zc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Xc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function rd(e){let t=e.filter(s=>s.kind==="tool").slice(-Vc),r=new Map;t.forEach((s,o)=>{let a=td(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function nd(e){let t=Jc(e);if(t)return{text:t,guess:!1};let r=ed(e);if(r)return{text:r,guess:!1};let n=rd(e);return n?{text:n,guess:!0}:null}function sd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:wt(e,t)}function kn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,m=null,g=null,b=!1,x=!1,w=!1,h=null,E=null;function Y(){b=!1,x=!1,w=!1,h=null,E=null}async function H(F){if(r){x=!0,w=!1,C();try{let M=await Promise.resolve(r("get-attempt-prompt",{attempt_id:F}));if(o!==F)return;!M||typeof M!="object"||Array.isArray(M)?w=!0:(h=M,E=F)}catch{o===F&&(w=!0)}finally{o===F&&(x=!1,C())}}}function K(){if(b=!b,b&&o&&E!==o){H(o);return}C()}function P(){if(!b)return"";let F=br({loading:x,error:w});if(F)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${F}
      </div>`;if(!h)return"";if(h.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let M=yn(h.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${M?l`<div class="prompt-block__meta">${M} 발송</div>`:""}
      ${typeof h.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",h.task_prompt):""}
      ${typeof h.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",h.system_prompt):""}
    </div>`}function A(){if(!o||!n)return[];let F=n.get(o);return ya(F?F.lines:[])}function S(){if(!o||!n)return null;let F=n.get(o),M=F?F.last_event_at:null;return typeof M=="number"?M:null}function N(){return a.status==="running"}function z(){if(N()&&o){g||(g=setInterval(()=>C(),1e3));return}le()}function le(){g&&(clearInterval(g),g=null)}function oe(F){let M=[],de=0;for(;de<F.length;){let qe=F[de];if(qe.kind==="tool"){let D=de;for(;D<F.length&&F[D].kind==="tool"&&F[D].tool===qe.tool;)D+=1;if(D-de>=Yc&&!d.has(de)){M.push({kind:"group",idx:de,tool:qe.tool||"",lines:F.slice(de,D).map((W,I)=>({idx:de+I,line:W}))}),de=D;continue}}M.push({kind:"line",idx:de,line:qe}),de+=1}return M}function ce(F){for(let M=F.length-1;M>=0;M-=1){let de=F[M];if(de.kind==="result"||de.kind==="error")return null;if(de.kind==="tool"&&!Object.hasOwn(de,"result"))return de}return null}function ue(F){for(let M=F.length-1;M>=0;M-=1)if(F[M].kind==="thinking")return F[M];return null}function Le(F,M){if(M.kind==="gate")return l`<div class="sv__gate">${M.text}</div>`;if(M.kind==="phase")return l`<div class="sv__phase">${M.text}</div>`;if(M.kind==="result")return l`<div
        class="sv__result${M.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${M.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${jt(M.text||(M.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(M.kind==="thinking"){let de=i.has(F);return l`<div
        class="sv__think${de?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Z(F)}
      >
        <span class="sv__think-line">💭 ${wn(M.text)}</span>
        ${de?l`<pre class="sv__think-expand">${M.text}</pre>`:""}
      </div>`}if(M.kind==="error")return l`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="blocker")return l`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="tool"){let de=i.has(F),qe=M.tool==="Bash"?Qc(M.command):0,D=M.tool==="Bash"?qe>1?wn(M.command):M.command:M.path||M.command||"";return l`<div
        class="sv__tool${de?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Z(F)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${M.icon}</span>
          <span class="sv__tool-name">${M.tool}</span>
          ${D?l`<span class="sv__tool-detail">${D}</span>`:""}
          ${qe>1?l`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof M.added=="number"?l`<span class="sv__diff-add">+${M.added}</span>`:""}
          ${typeof M.removed=="number"?l`<span class="sv__diff-del">−${M.removed}</span>`:""}
          ${M.result?l`<span class="sv__tool-ok">→ ${M.result}</span>`:""}
        </span>
        ${de?l`<pre class="sv__tool-expand">${Be(M)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${jt(M.text||"")}</div>`}function Be(F){let M=[];if(F.tool==="Bash"&&typeof F.command=="string"&&F.command.length>0)M.push(F.command);else if(F.input!==void 0)try{M.push(`input: ${JSON.stringify(F.input,null,2)}`)}catch{}return typeof F.output=="string"&&F.output.length>0&&M.push(`output:
${F.output}`),M.join(`

`)}function De(){if(!o)return l``;let F=A(),M=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),de=a.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,D=N(),W=D?sd(S(),Date.now()):"",I=D?ce(F):null,re=D?ue(F):null,J=nd(F);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${J?l`<span
              class="sv__stage${J.guess?" sv__stage--guess":""}"
              title=${J.text}
              >${J.text}</span
            >`:""}
        ${D?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${W?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${W}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${W?l`<span class="sv__live-ago">${W}</span>`:""}</span
            >`:""}
        ${de?l`<button
              type="button"
              class="sv__session"
              title=${de}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${de}`}
              @click=${()=>ke(de)}
            >
              ⧉ ${de.slice(0,8)}
            </button>`:""}
        ${M?l`<span class="sv__meta">${M}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${K}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${qe}
          @click=${te}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Te()}
        >
          ✕
        </button>
      </div>
      ${P()}
      <div class="sv__body">
        ${F.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:oe(F).map(he=>he.kind==="group"?ie(he):Le(he.idx,he.line))}
      </div>
      ${I||re?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${I?l`<span class="sv__now-icon">${I.icon}</span>
                  <span class="sv__now-name">${I.tool}</span>
                  <span class="sv__now-detail"
                    >${I.tool==="Bash"?wn(I.command):I.path||I.command||""}</span
                  >`:""}
            ${re?l`<span class="sv__now-think"
                  >💭 ${wn(re.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ie(F){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>T(F.idx)}
    >
      <span class="sv__group-icon">${F.lines[0].line.icon}</span>
      <span class="sv__group-name">${F.tool}</span>
      <span class="sv__group-count">${F.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function T(F){d.add(F),C()}function C(){Ae(De(),e),z(),c&&G()}function G(){let F=e.querySelector(".sv__body");F&&(F.scrollTop=F.scrollHeight)}function Z(F){i.has(F)?i.delete(F):i.add(F),C()}function te(){c=!c,C()}function ke(F){rr(F).then(M=>{M?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(F){!o||!F||(a={...a,...F},C())}function Ue(F){let M=F.target;if(!M||!M.classList||!M.classList.contains("sv__body"))return;!(M.scrollHeight-M.scrollTop-M.clientHeight<=4)&&c&&(c=!1,C())}e.addEventListener("scroll",Ue,!0);function _e(F){let M=F&&F.attempt_id;M&&(o=M,a=F.meta||{},c=!0,i.clear(),d.clear(),Y(),!m&&n&&(m=n.subscribe(C)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),C())}function Te(){let F=o;o=null,i.clear(),d.clear(),Y(),le(),r&&F&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${F}`})).catch(()=>{}),Ae(l``,e),s&&s()}return{open:_e,updateMeta:pe,close:Te,isOpen(){return o!==null},destroy(){le(),m&&(m(),m=null),e.removeEventListener("scroll",Ue,!0),o=null,Ae(l``,e)}}}function od(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function wa(e,t){let r=od(e);return l`
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
                  @click=${s=>t.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var ad="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",id=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ld=/^\*\*결론\*\* — (.+)$/;function ka(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==ad)return null;let r=id.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?ld.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var $a=20;function xa(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function cd(e){return e.length>$a?`${e.slice(0,$a)}\u2026`:e}function dd(e,t,r,n){let s=`${t.lane} ${cd(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${xa(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${jt(t.body)}
        </div>`:""}
  </div>`}function ud(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${xa(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${jt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Sa(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=ka(typeof i.text=="string"?i.text:"");return d?dd(i,d,t,s.has(i.id)):ud(i)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${i=>t.onDraftInput&&t.onDraftInput(i.target.value)}
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
  `}var pd=["codex","opus","fable","self","skip"],fd=["codex","fable","skip"],_d=["low","medium","high","xhigh"],md=["standard","fast_track"],gd=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","impl_review_model","impl_review_effort","plan_review_model","plan_review_effort","impl_model","impl_effort"],Aa={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},hd=["self","skip"],bd="opus",gs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)",impl_effort:"(\uAE30\uBCF8: \uB9AC\uD504 \uAE30\uBCF8)"};function vd(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:gs[e]||"(\uAE30\uBCF8)"}function Ur(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function xn(e){if(!Ur(e)||!Ur(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Ur(r)&&Ur(r.models));return t.length>0?t:null}function ms(e){return{value:e,label:e}}function Ra(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function yd(e,t){let r=xn(e);if(!r)return t?[{label:null,options:[ms(t)]}]:[];let n=r.map(([o,a])=>({label:o,options:Object.keys(a.models).map(ms)})),s=n.some(o=>o.options.some(a=>a.value===t));return t&&!s?[Ra(t),...n]:n}function vr(e,t){let r={label:null,options:e.map(ms)};return t&&!e.includes(t)?[Ra(t),r]:[r]}function wd(e,t){let r=xn(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Ia(e,t){return Ur(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ta(e,t){let r=xn(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Ia(n,n.models[t]);return[]}function kd(e){let t=xn(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Ia(n,s))r.includes(o)||r.push(o);return r}function hs(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n}=e,s=r("orchestration_model")||bd,o=r("impl_model");return gd.map(a=>{let c=t(a),i,d=!1;return a==="orchestration_model"||a==="impl_model"?i=yd(n,c):a==="orchestration_effort"?i=vr(Ta(n,s),c):a==="impl_effort"?i=vr(o?Ta(n,o):kd(n),c):a==="plan_review_model"?i=vr(fd,c):Object.hasOwn(Aa,a)?(i=vr(_d,c),d=hd.includes(r(Aa[a]))):i=vr(pd,c),{key:a,groups:i,selected:c,disabled:d,runner:a==="orchestration_model"?wd(n,s):null}})}function $n(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ea(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Ea(s,t))}
          </optgroup>`)}
  `}function Ea(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ca(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${c=>a.onChange(e,c.target.value)}
        >
          ${t}
        </select>
        ${o?l`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function La(e,t,r,n){let s=e&&e.metadata||{},o=r&&typeof r=="object"?r:{},a=m=>typeof s[m]=="string"?s[m]:"",i=hs({selectedOf:a,effectiveOf:m=>{let g=a(m);return g||(typeof o[m]=="string"?o[m]:"")},runner_catalog:n}),d=s.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${i.map(m=>Ca(m.key,$n(m.groups,m.selected,vd(m.key,o)),m.selected,!1,m.disabled,m.runner,t))}
    ${Ca("workflow_mode",$n(vr(md,d),d),d,s.workflow_mode==="fast_track",!1,null,t)}
  `}function $d(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Da(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i(w){w.key==="Escape"&&s&&(w.preventDefault(),b())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${$d(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:jt(a)}
          </div>
        </div>
      </div>
    `:l``}function m(){Ae(d(),e)}async function g(w){s=w,o="loading",a="",c="",m();let h=r?r():"";if(!h){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let E="/api/doc?workspace="+encodeURIComponent(h)+"&path="+encodeURIComponent(w);try{let Y=await n(E),H=await Y.json().catch(()=>({}));if(!Y.ok||!H||H.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(H&&H.error||Y.status)+")",m();return}a=String(H.content||""),o="ready",m()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,Ae(l``,e)}function x(){document.removeEventListener("keydown",i),b()}return{open:g,close:b,destroy:x}}var xd=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Oa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Sd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Ad(e){let t=gr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Oa}
          >부분 집계</span
        >`:""}`}function Td(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${xd.map(r=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Sd(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Oa}</span>`:""}
  </div>`}var Ed={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Cd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ma(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let g=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),x=g&&!b,w=g?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!x}
      title=${w}
      @click=${h=>{h.stopPropagation(),x&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let g=d.cause_detail,b=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:d.cause;return l`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},i=d=>{if(!gr(d.usage))return"";let m=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Ad(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>l`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${d.status||"unknown"}"
              data-attempt-id=${d.attempt_id}
              @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Ed[d.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${d.attempt_id}</span>
              ${d.resumed_from?l`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?l`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${gr(d.usage)?l`<span class="detail-session__usage"
                    >${gr(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Cd(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?Td(d.usage):""}
          </div>`)}
    </div>
  `}function Na(e,t={}){return l`
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
          ${Rd(e)}
        </div>`:""}
  `}function Rd(e){let t=br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=yn(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Id=["open","in_progress","deferred","resolved","closed"],Ld=[0,1,2,3,4];function Pa(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.sessionLogStore,i=null,d=null,m={},g=!1,b=!1,x="",w="",h="";function E(){g=!1,b=!1,x="",w="",h=""}let Y=[],H=null,K=null,P=!1,A="",S=!1,N=0,z=new Set;function le(){Y=[],H=null,K=null,P=!1,A="",S=!1,N+=1,z.clear()}async function oe(y){if(!s)return;let U=++N;try{let q=await Promise.resolve(s("get-comments",{id:y}));if(U!==N||y!==i)return;Y=Array.isArray(q)?q:[],P=!1}catch{if(U!==N||y!==i)return;P=!0}Ee()}function ce(){if(!s||!i)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(H!==i){H=i,K=y,oe(i);return}y!==null&&y!==K&&(K=y,oe(i))}function ue(y){z.has(y)?z.delete(y):z.add(y),Ee()}function Le(y){let U=A.trim().length===0;A=y,U!==(y.trim().length===0)&&Ee()}async function Be(){let y=A.trim();if(!s||!i||y.length===0||S)return;let U=i;S=!0,Ee();let q=!1;try{let _=await Promise.resolve(s("add-comment",{id:U,text:y}));Array.isArray(_)&&_.length>0&&(q=!0,U===i&&(Y=_,P=!1,A="",K=_.length))}catch{q=!1}q||se("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),U===i&&(S=!1),Ee()}let De={onToggle:ue,onDraftInput:Le,onSubmit:Be},ie=document.createElement("div");ie.className="md-viewer-root",document.body.appendChild(ie);let T=Da(ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),C=document.createElement("div");C.className="session-log-root",document.body.appendChild(C);let G=kn(C,{transport:s?(y,U)=>Promise.resolve(s(y,U)):void 0,sessionLogStore:c}),Z=!1,te=!1,ke=!1,pe=null,Ue=null,_e=0;function Te(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function F(){Z=!1,te=!1,ke=!1,pe=null,Ue=null,_e+=1}async function M(y){if(!s)return;let U=++_e;te=!0,ke=!1,Ee();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(U!==_e)return;!q||typeof q!="object"||Array.isArray(q)?ke=!0:(pe=q,Ue=Te(y))}catch{U===_e&&(ke=!0)}finally{U===_e&&(te=!1,Ee())}}function de(){if(Z=!Z,Z&&i&&Ue!==Te(i)){pe=null,M(i);return}Ee()}function qe(){if(!a||!i)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(q=>q&&q.bead_id===i).sort((q,_)=>(_.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,usage:q.usage||null}))}function D(){if(!a||!i)return null;let y=a.get();return Dt(y&&y.attempts||{},i)}let W=new Set;function I(y){W.has(y)?W.delete(y):W.add(y),Ee()}function re(y){let U=a?a.get():null,q=U&&U.attempts?U.attempts[y]:null;G.open({attempt_id:y,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}async function J(y){if(!s||!y)return;let U=()=>{let _=a?a.get():null;return _&&typeof _.revision=="number"?_.revision:0},q=await s("worker-attempt-resume",{attempt_id:y,expected_revision:U()});if(q&&q.conflict){let _=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:U();q=await s("worker-attempt-resume",{attempt_id:y,expected_revision:_})}q&&q.resumed===!1&&!q.conflict&&q.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${q.reason}`,"error",2400)}let he={onOpen:re,onResume:J,onToggleUsage:I};function ve(){let y=a?a.get():null,U=y&&y.exec_defaults;return U&&typeof U=="object"?U:{}}function $e(){let y=a?a.get():null;return y&&y.runner_catalog||null}let Ce=null;r&&r.subscribe&&(Ce=r.subscribe(()=>nt()));let ze=null;a&&typeof a.subscribe=="function"&&(ze=a.subscribe(()=>{i&&Ee()}));function We(y){y.key==="Escape"&&i&&(y.preventDefault(),n())}document.addEventListener("keydown",We);function nt(){if(i){if(r&&typeof r.snapshotFor=="function"){let y=r.snapshotFor("detail:"+i)||[];d=y.find(q=>q&&q.id===i)||y[0]||d}ce(),Ee()}}function st(y){rr(y).then(U=>{U?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function vt(y){y.preventDefault(),y.stopPropagation(),i&&st(i)}function ye(y,U){y.preventDefault(),y.stopPropagation(),st(U)}function gt(y,U){y.preventDefault(),y.stopPropagation(),T.open(U)}function it(y,U){m[y]=U,Ee(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:y,value:U})).catch(()=>{se("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ye(y,U,q){if(!s||!i)return!1;try{let _=await Promise.resolve(s(y,U)),f=Array.isArray(_)?_[0]:_;return f&&typeof f=="object"&&f.id?(d=f,!0):(se(q,"error"),!1)}catch{return se(q,"error"),!1}}function at(y){setTimeout(()=>{try{let U=e.querySelector(y);U&&typeof U.focus=="function"&&U.focus()}catch{}},0)}function dt(){g=!0,x=d&&d.title||"",Ee(),at('.detail-edit__input[data-edit="title"]')}function Ge(y){x=y.target.value}function ot(){g=!1,x="",Ee()}function tt(){Ye("edit-text",{id:i,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(U=>{U&&(g=!1,x=""),Ee()})}function Ze(){b=!0,w=d&&d.description||"",Ee(),at('.detail-edit__textarea[data-edit="description"]')}function R(y){w=y.target.value}function B(){b=!1,w="",Ee()}function ee(){Ye("edit-text",{id:i,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(U=>{U&&(b=!1,w=""),Ee()})}function ne(y,U,q,_){if(y.key==="Escape"){y.stopPropagation(),q();return}y.key==="Enter"&&(!_||y.ctrlKey||y.metaKey)&&(y.preventDefault(),U())}function fe(y){let U=y.target.value;Ye("update-status",{id:i,status:U},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ee())}function ge(y){let U=Number(y.target.value);Ye("update-priority",{id:i,priority:U},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ee())}function u(y){h=y.target.value}function v(){let y=h.trim();y.length!==0&&Ye("label-add",{id:i,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(U=>{U&&(h=""),Ee()})}function L(y){if(y.key==="Escape"){y.stopPropagation(),h="",Ee();return}y.key==="Enter"&&(y.preventDefault(),v())}function X(y){Ye("label-remove",{id:i,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ee())}let V={onCopyPath:ye,onOpenDoc:gt},me={onChange:it};function Re(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Me(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ve(y){let q=(Array.isArray(y.dependencies)?y.dependencies:[]).map(_=>({id:Re(_),icon:Me(_)})).filter(_=>_.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${q.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${q.map(_=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(_.id)}
                  >
                    ${_.icon?`${_.icon} `:""}${_.id}
                  </button>`:l`<span class="detail-dep"
                    >${_.icon?`${_.icon} `:""}${_.id}</span
                  >`)}
          </div>`}
    `}function rt(y){let U=y.metadata||{},q=y.workflow||{},_=q.stages||{},f=_.spec&&_.spec.stale,p=_.impl&&_.impl.stale,$=_.plan||null,O=q.route_source==="derived",Q=q.route||U.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${O?" detail-kv__v--derived":""}"
          title=${O?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${O&&q.route?`${Q} ? (\uCD94\uB860)`:Q}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${U.spec_review||"\uC5C6\uC74C"}${f?" \xB7 stale":""}</span
        >
      </div>
      ${q.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${$?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${$?.approval_receipt||"\uC5C6\uC74C"}${$?.approval_state==="stale"?" \xB7 stale":$?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${U.impl_review||"\uC5C6\uC74C"}${p?" \xB7 stale":""}</span
        >
      </div>
      ${U.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${U.pr_url}</span>
          </div>`:""}
    `}let ht={route:["spec_backed","full_plan"]};async function we(y,U){let q=U.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ee();return}await Ye("update-workflow-meta",{id:i,key:y,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ee()}function lt(y){let U=y.metadata||{};return l` ${((_,f)=>{let p=ht[_],$=typeof U[_]=="string"?U[_]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${_}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${_}
          data-edit=${`wfmeta-${_}`}
          @change=${O=>we(_,O)}
        >
          <option value="" ?selected=${!p.includes($)}>
            ${f}
          </option>
          ${p.map(O=>l`<option value=${O} ?selected=${$===O}>${O}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Xe(y){return g?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${Ge}
            @keydown=${U=>ne(U,tt,ot,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${tt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${ot}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${dt}
        >
          ✎
        </button>
      </div>
    `}function Qe(y){let U=ct(y.created_at),q=ct(y.updated_at);return!U&&!q?l``:l`
      ${U?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${U}</span>
          </div>`:""}
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function be(y,U){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${fe}
        >
          ${Id.map(q=>l`<option value=${q} ?selected=${q===y}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ge}
        >
          ${Ld.map(q=>l`<option value=${String(q)} ?selected=${q===U}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function Se(y){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ze}
            >
              ✎
            </button>`}
      </div>
      ${b?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${R}
              @keydown=${U=>ne(U,ee,B,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ee}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${B}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function xt(y){let U=typeof y.notes=="string"?y.notes:"";return U.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${U}</div>
    `}function Mt(y){let U=Array.isArray(y.labels)?y.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${U.map(q=>l`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>X(q)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${h}
            @input=${u}
            @keydown=${L}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${v}
          >
            추가
          </button>
        </span>
      </div>
    `}function ut(){if(!i)return l``;let y=d||{},U=String(y.id||i),q=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",_=y.status||"open",f=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",p=y.description||"",$={...y,metadata:{...y.metadata||{},...m}};return l`
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
            @click=${vt}
          >
            ${U}
          </button>
          ${Xe(q)} ${be(_,f)}
          ${Qe(y)} ${Se(p)}
          ${Sa(Y,De,{expanded:z,draft:A,sending:S,error:P})}
          ${xt(y)} ${Mt(y)} ${Ve(y)}
          ${rt(y)} ${lt(y)}
          ${wa(y,V)}
          ${La($,me,ve(),$e())}
          ${Na({expanded:Z,loading:te,error:ke,data:pe},{onToggle:de})}
          ${Ma(qe(),he,{total:D(),expanded:W})}
        </div>
      </div>
    `}function Ee(){Ae(ut(),e)}return{load(y){y!==i&&(m={},E(),le(),F()),i=y,d=null,nt()},clear(){i=null,d=null,m={},E(),le(),F(),T.close(),G.close(),Ae(l``,e)},destroy(){Ce&&(Ce(),Ce=null),ze&&(ze(),ze=null),document.removeEventListener("keydown",We),T.destroy(),ie.parentNode&&ie.parentNode.removeChild(ie),G.destroy(),C.parentNode&&C.parentNode.removeChild(C),i=null,d=null,le(),F(),Ae(l``,e)}}}var Dd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Fa(e,t){return jn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Od(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function qa(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(S){let N=r.get();if(N)try{let z=await n("display-policy-set",{expected_revision:N.revision,policy:S(N)});i(z),z&&z.conflict&&z.policy&&(z=await n("display-policy-set",{expected_revision:z.policy.revision,policy:S(z.policy)}),i(z)),z&&z.conflict&&se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function d(S){let N=r.get();if(!N)return;let z=Fa(S,N)!=="shown";c(le=>Od(S,le,z))}function m(){let S=a.trim();S.length!==0&&(a="",c(N=>N.hidden_prefixes.includes(S)?{hidden_prefixes:N.hidden_prefixes}:{hidden_prefixes:[...N.hidden_prefixes,S]}),E())}function g(S){c(N=>({hidden_prefixes:N.hidden_prefixes.filter(z=>z!==S)}))}function b(S){let N=r.get();if(!N)return;let z=N.chips[S]===!1;c(()=>({chips:{[S]:z}}))}function x(S){let N=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${N.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${N.map(z=>{let le=Fa(z,S);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${le}`}
                  data-label=${z}
                  data-state=${le}
                  @click=${()=>d(z)}
                >
                  ${z}
                </button>`})}
            </div>`}
      </section>
    `}function w(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(N=>l`<span class="display-settings__prefix">
                ${N}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${N} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(N)}
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
            @input=${N=>{a=String(N.target.value||"")}}
          />
          <button type="button" @click=${m}>추가</button>
        </div>
      </section>
    `}function h(S){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Dd.map(([N,z])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${N}
                  .checked=${S.chips[N]!==!1}
                  @change=${()=>b(N)}
                />
                <span>${z}</span>
              </label>`)}
        </div>
      </section>
    `}function E(){let S=r.get();Ae(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${A}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?l`${x(S)} ${w(S)}
                ${h(S)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let Y=!1,H=()=>{Y=!1};o.addEventListener("close",H),o.addEventListener("cancel",H);let K=null;r.subscribe&&(K=r.subscribe(()=>{Y&&E()}));function P(){Y||(a="",Y=!0,E(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){Y&&(Y=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:P,close:A,destroy(){Y=!1,o.removeEventListener("close",H),o.removeEventListener("cancel",H),K&&(K(),K=null),o.remove()}}}function Ba(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,m,g="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=m||"An unrecoverable error occurred.");let b=typeof g=="string"?g.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function Ua(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function za(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Md={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ha=160;function Nd(e){return e.length>Ha?`${e.slice(0,Ha)}\u2026`:e}function Sn(e,t){let{queueStore:r,transport:n,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let T=a();return typeof T.revision=="number"?T.revision:0}function i(){let T=a().exec_defaults;return T&&typeof T=="object"?T:{}}function d(T){T&&T.queue&&r&&r.set(T.queue)}async function m(T,C){if(!n)return;let G={key:T,value:C||null};try{let Z=await n("worker-queue-set-exec-default",{...G,expected_revision:c()});d(Z),Z&&Z.conflict&&(Z=await n("worker-queue-set-exec-default",{...G,expected_revision:c()}),d(Z)),Z&&Z.conflict&&se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{se("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function g(){return a().runner_catalog??null}function b(T){let{key:C}=T;return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${C}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${C}`}
        data-key=${C}
        ?disabled=${T.disabled}
        @change=${G=>{m(C,G.target.value)}}
      >
        ${$n(T.groups,T.selected,gs[C]||"(\uAE30\uBCF8)")}
      </select>
      ${T.runner?l`<span class="exec-defaults__runner" data-runner-for=${C}
            >${T.runner}</span
          >`:""}
    </div>`}function x(){let T=a().workspace_info;return T&&typeof T=="object"?T:{}}function w(T,C){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${T}"
      >${C}</span
    >`}function h(T){let C=T?za(T.cmd):"",G=T?Ua(T.timeout_ms):"",Z=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${C?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${w("config","config")}
            ${G?l`<span class="exec-defaults__vd-meta"
                  >timeout ${G}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(T){let C=T?za(T.cmd):"",G=T?Ua(T.timeout_ms):"",Z=G?`timeout ${G} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",te=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${C?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${C}</span>
            ${w("config","config")}
            ${T.detached===!0?w("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Z}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${te}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Y(T){if(!T||typeof T!="object")return"";let C=Md[String(T.outcome)];if(!C)return"";let G=T.outcome==="failed"&&T.reason?`${C.label} \xB7 ${T.reason}`:C.label,Z=[ct(T.at),typeof T.bead_id=="string"?T.bead_id:"",typeof T.base_sha=="string"?T.base_sha.slice(0,7):""].filter(pe=>pe.length>0).join(" \xB7 "),te=typeof T.detail=="string"&&T.detail.length>0?Nd(T.detail):"",ke=typeof T.log_path=="string"&&T.log_path.length>0?T.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${w(C.modifier,G)}
        ${Z?l`<span class="exec-defaults__vd-meta">${Z}</span>`:""}
      </div>
      ${te?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${te}</code>
          </div>`:""}
      ${ke?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ke}</code>
          </div>`:""}
    </div>`}let H=!1,K=!1,P=!1,A=null;async function S(){if(n){K=!0,P=!1,ce();try{let T=await Promise.resolve(n("get-worker-system-prompt",{}));!T||typeof T!="object"||Array.isArray(T)?P=!0:A=T}catch{P=!0}finally{K=!1,ce()}}}function N(){if(H=!H,H&&!A){S();return}ce()}function z(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${H?"true":"false"}
          @click=${N}
        >
          ${H?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${H?le():""}
    </section>`}function le(){let T=br({loading:K,error:P});if(T)return T;if(!A)return"";let C=Array.isArray(A.variants)?A.variants:[];return l`<div class="exec-defaults__sp-body">
      ${A.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${C.map(G=>l`<div class="exec-defaults__sp-variant" data-variant=${G.key}>
            <div class="exec-defaults__sp-cond">${G.condition}</div>
            ${zt(G.label,G.system_prompt)}
          </div>`)}
    </div>`}function oe(T){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${h(T.verify_cmd)} ${E(T.deploy_cmd)}
      ${Y(T.last_deploy)}
    </section>`}function ce(){let T=i(),C=Z=>typeof T[Z]=="string"?T[Z]:"",G=hs({selectedOf:C,effectiveOf:C,runner_catalog:g()});Ae(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ie}
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
            ${G.map(Z=>b(Z))}
            ${oe(x())}
            ${z()}
          </div>
        </div>
      `,o)}let ue=!1,Le=()=>{ue=!1};o.addEventListener("close",Le),o.addEventListener("cancel",Le);let Be=null;r&&r.subscribe&&(Be=r.subscribe(()=>{ue&&ce()}));function De(){ue||(ue=!0,ce(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function ie(){ue&&(ue=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:De,close:ie,destroy(){ue=!1,o.removeEventListener("close",Le),o.removeEventListener("cancel",Le),Be&&(Be(),Be=null),o.remove()}}}function yr(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ct(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${ct(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function bs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?wt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",m=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=l`<span class="worker-mini__title">${e.title}</span>`,b=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",x=r.map(S=>S===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${S}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${S}</span
        >`),w=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",h=n?l`<span class="worker-usage" title=${hr(e.usage)}
        >${n}</span
      >`:"",E=s?l`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",Y=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",H=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",K=e.discard_action?l`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=e.revise_action?l`<button
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
        </button>`:"",A=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return l`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?l`<div class="worker-mini__row1">${d}${m}${g}</div>
          <div class="worker-mini__row2">
            ${h}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ct(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${x}${E}
            <span class="worker-mini__actions"
              >${Y}${H}${K}</span
            >
            ${yr(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${m}${b}${x}${w}
            </div>
            <div class="worker-mini__body">${g}</div>
            ${A?l`<div class="worker-mini__foot">
                  ${h}${E}
                  <span class="worker-mini__actions"
                    >${Y}${H}${K}${P}</span
                  >
                </div>`:""}
            ${yr(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${m}${g}${b}${x}${w}${h}${E}${Y}${H}${K}
            </div>
            ${yr(e)}`}
  </div>`}function Pd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?an(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?l`<span
            class="worker-card__reason${a?" worker-card__reason--danger":""}"
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
    ${yr(e)}
  </div>`}function Ot(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Pd(n):bs(n))}
          </div>`}
  </section>`}var Wa=160;function vs(e){return e.length>Wa?`${e.slice(0,Wa)}\u2026`:e}function Fd(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${vs(e.command)}</code>`:""}
  </div>`}function qd(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Bd(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ys(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ud(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${e.bead_id||""}
  >
    ⚠ ${e.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${e.reason}). bead는 closed지만
    ${t?l`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:l`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${e.detail?l`<div class="worker-banner__detail">
          남은 작업: <code>${vs(e.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${t?l`수동 복구:
            <code
              >bd -C &lt;워크스페이스&gt; label remove &lt;id&gt;
              export:&lt;capability&gt;</code
            >
            실행 후 <code>bd show &lt;id&gt; --json</code>으로 라벨이 사라졌는지
            확인하세요 — 이 자손은 ship하지 마세요.`:l`수동 복구:
            <code>bd -C &lt;워크스페이스&gt; ship &lt;capability&gt;</code> 실행
            후 <code>bd show &lt;id&gt; --json</code>으로
            <code>provides:</code> 라벨을 확인하세요.`}
    </div>
    ${e.pr_url?l`<div class="worker-banner__detail">
          <code>${e.pr_url}</code>
        </div>`:""}
  </div>`}function ja(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
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
          ${Fd(e.failure.cause_detail)}
        </div>`:""}
    ${t.map(r=>l`<div
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
          ${r.detail?l`<div class="worker-banner__detail">
                <code>${vs(r.detail)}</code>
              </div>`:""}
          ${Bd(r.log_path)} ${qd(r.output_tail)}
        </div>`)}
    ${Ud(e.shipFailure)}
  </div>`}function zd(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ys(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=At(e.usage),c=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return l`<div
    class="rtile${d?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?l`<span
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
      ${n?l`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?l`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||c||i?l`<div class="rtile__meta">
          ${c?l`<span class="worker-mini__badge">${c}</span>`:""}
          ${i?l`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?l`<span class="rtile__runner">${o}</span>`:""}
          ${a?l`<span class="worker-usage" title=${hr(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${yr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ws(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>zd(s,t,r))}
  </div>`}function Yt(e){return l`<svg
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
  </svg>`}function ks(){return Yt(Pt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function $s(){return Yt(Pt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function xs(){return Yt(Pt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ga(){return Yt(Pt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ya(){return Yt(Pt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Va(){return Yt(Pt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ka(){return Yt(Pt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Za(){return Yt(Pt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var zr=1,Hd=6e4,Wd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},jd=new Set(["auto_merge","merged","merge","done"]),Xa={running:3,paused:2,failed:1};function Gd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Yd(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let g=t.get(a.bead_id),b=typeof g=="number"&&g>0&&typeof a.finished_at=="number"&&g>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let g=Xa[d.run_state],b=Xa[c];if(g>b||g===b&&(d.started_at??0)>(i??0))continue}let m=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Dt(e,a.bead_id),can_pause:c==="running"&&m,can_resume:c!=="running"&&m&&!n.has(a.attempt_id)})}return o}function Qa(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function Ss(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let h of s)h&&typeof h.root_dir=="string"&&a.set(h.root_dir,h);let c=[],i=[],d=[],m=[],g=[],b=new Map;for(let h of n){if(!h||typeof h.root_dir!="string")continue;let E=h.root_dir,Y=h.name||E,H=a.get(E),K=H&&typeof H.revision=="number"?H.revision:typeof h.revision=="number"?h.revision:0,P=Rt(h.attempts),A=Rt(h.bead_titles),S=Rt(h.pr_observations),N=Rt(h.admission),z=Rt(h.revise_parked),le=Rt(h.merge_queue_state),oe=Rt(h.cleanup_failed),ce=Array.isArray(h.merge_queue)?h.merge_queue:[],ue=new Set(ce.filter(C=>C&&typeof C.bead_id=="string").map(C=>C.bead_id)),Le=Array.isArray(h.queue)?h.queue:[],Be=Array.isArray(h.done)?h.done:[],De=new Map;for(let C of Be)C&&typeof C.bead_id=="string"&&typeof C.added_at=="number"&&De.set(C.bead_id,C.added_at);let ie=C=>({id:C,title:A[C]||C,root_dir:E,workspace_name:Y,expected_revision:K,draggable:!1}),T=new Set;for(let[C,G]of Yd(P,De))T.add(C),i.push({...ie(C),lane:"running",attempt_id:G.attempt_id,run_state:G.run_state,can_pause:G.can_pause,can_resume:G.can_resume,started_at:G.started_at,last_event_at:G.last_event_at,model:G.model,usage:G.usage,badges:G.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:G.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:G.run_state==="failed"});for(let C of Array.isArray(h.pr_wait)?h.pr_wait:[]){let G=C&&C.bead_id;if(typeof G!="string"||T.has(G))continue;T.add(G);let Z=Rt(S[G]),te=Rt(Z.pr),ke=Z.gate?Rt(Z.gate):null,pe=ue.has(G),Ue=le.active===G,_e=C.external===!0,Te=oe[G]||null,F=!!ke&&ke.base_badge==="\uCDA9\uB3CC",M=!!Te&&!!ke&&ke.tier==="merged",de=_e&&!!ke&&ke.tier==="merged";d.push({...ie(G),lane:"pr_wait",pr_number:typeof te.number=="number"?te.number:null,pr_url:typeof te.url=="string"?te.url:void 0,external:_e,usage:Dt(P,G),badges:Te?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Te,reason:Te?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!pe,merge_enabled:ke?.enabled===!0||F||M||de,merge_label:de?"\uC815\uB9AC":F&&!M?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:de?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":F?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ke?.enabled===!0?`\uBA38\uC9C0 (${ke.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ke?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:pe,cancel_enabled:!Ue,discard_action:!_e&&!Te&&!(ke&&ke.tier==="merged"),discard_enabled:!Ue&&!pe,discard_title:pe?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let C=0;C<Le.length;C++){let G=Le[C],Z=G&&G.bead_id;if(typeof Z!="string"||T.has(Z))continue;T.add(Z);let te=z[Z],ke={...ie(Z),lane:"queue",reason:Qa(N,Z),queue_position:C+1,queue_index:C,queue_length:Le.length,badges:te?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!te,revise_action:!!te,revise_enabled:!!te,revise_title:te?te.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${te.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};m.push(ke);let pe=b.get(E);pe?pe.push(ke):b.set(E,[ke])}for(let C of Array.isArray(h.runnable)?h.runnable:[]){let G=C&&C.bead_id;typeof G!="string"||T.has(G)||(T.add(G),c.push({...ie(G),title:C.title||A[G]||G,lane:"runnable",draggable:!0,reason:Qa(N,G),created_at:C.created_at??void 0,updated_at:C.updated_at??void 0,labels:Array.isArray(C.labels)?C.labels:[],workflow:C.route?{route:C.route,chips:{route:C.route}}:null,place_index:Le.length}))}for(let C of Be){let G=C&&C.bead_id;if(typeof G!="string"||T.has(G)||(T.add(G),o!==void 0&&typeof C.added_at=="number"&&C.added_at<o))continue;let Z=Gd(P,G);g.push({...ie(G),lane:"done",done:!0,usage:Dt(P,G),done_at:typeof C.added_at=="number"?C.added_at:void 0,done_kind:Z&&typeof Z.done_kind=="string"?Z.done_kind:null})}}i.sort((h,E)=>(E.last_event_at??0)-(h.last_event_at??0)),g.sort((h,E)=>(E.done_at??0)-(h.done_at??0));let x=s.length>0?s:n.map(h=>({root_dir:h&&h.root_dir,name:h&&h.name,auto_advance:h&&h.auto_advance,auto_merge:h&&h.auto_merge,slots:h&&h.slots,revision:h&&h.revision,exec_defaults:h&&h.exec_defaults})),w=[];for(let h of x)!h||typeof h.root_dir!="string"||w.push({root_dir:h.root_dir,name:h.name||h.root_dir,auto_advance:h.auto_advance===!0,auto_merge:h.auto_merge===!0,slots:typeof h.slots=="number"&&h.slots>=zr?h.slots:zr,revision:typeof h.revision=="number"?h.revision:0,exec_defaults:Rt(h.exec_defaults),items:b.get(h.root_dir)||[]});return{runnable:c,queue:m,queue_groups:w,running:i,pr_wait:d,done:g,automation:{total:w.length,both_on:w.filter(h=>h.auto_advance&&h.auto_merge).length}}}function Vd(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Hd;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ct(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${wt(e,t)}</span
        >`}</span
  >`}function Hr(e){return l`<div class="mon-c__title">${e.title}</div>`}function Wr(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function An(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function As(e){let t=At(e.usage);return t?l`<span class="mon-c__usage" title=${hr(e.usage)}
        >${t}</span
      >`:""}function Ts(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Kd(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${$s()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${ks()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${xs()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ga()}
        </button>`:""}
  </span>`}function Zd(e,t){let r=typeof e.started_at=="number"?ys(t-e.started_at):"";return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Ts(e)}${Vd(e.last_event_at,t)}${Wr(e)}${An(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${As(e)}${Kd(e)}
    </div>`}function Xd(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=wt(e.updated_at);return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Wr(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${on(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${An(e)}
      ${o?l`<span title=${`\uC218\uC815 ${ct(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?l`<span
            class="mon-c__reason${s?" mon-c__reason--danger":""}"
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
    </div>`}function Qd(e){return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Wr(e)}
      ${Ts(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
      <span class="mon-c__ops">
        <button
          type="button"
          class="mon-op mon-op--up"
          ?disabled=${(e.queue_position??1)<=1}
          aria-label="한 칸 앞으로"
          title="한 칸 앞으로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon-op mon-op--down"
          ?disabled=${(e.queue_index??0)>=(e.queue_length??1)-1}
          aria-label="한 칸 뒤로"
          title="한 칸 뒤로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon-op mon-op--remove"
          aria-label="대기 큐에서 제거"
          title="대기 큐에서 제거"
        >
          ✕
        </button>
      </span>
    </div>
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
        </div>`:""}`}function Jd(e){let t=!!(At(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${An(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Ts(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${As(e)}
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
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function eu(e,t){let r=e.done_kind||"",n=r?Wd[r]||r:"",s=wt(e.done_at,t);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${An(e)}
      ${n?l`<span
            class="mon-live__kind${jd.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${As(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ct(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Ja(e,t){return e.lane==="running"?Zd(e,t):e.lane==="runnable"?Xd(e):e.lane==="queue"?Qd(e):e.lane==="pr_wait"?Jd(e):eu(e,t)}function ei(e){let t=String(e.revision);return l`<header
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
        title=${e.auto_advance?"\uC790\uB3D9 \uC9C4\uD589 \uCF1C\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA48\uCDA5\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589 \uAEBC\uC9D0 \u2014 \uD074\uB9AD\uD558\uBA74 \uB300\uAE30 \uD050\uB97C \uB514\uC2A4\uD328\uCE58\uD569\uB2C8\uB2E4"}
      >
        ${e.auto_advance?$s():ks()}
        <span class="mon-ctl__label">진행</span>
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
        ${Ya()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Va()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${zr}
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
        ${Ka()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ti(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Lt.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?xs():Za()}
      <span class="mon-auto-all__label"
        >${n?"\uC804\uCCB4 \uC790\uB3D9\uD654 \uBA48\uCDA4":`\uC804\uCCB4 \uC790\uB3D9\uD654 ${r}/${t}`}</span
      >
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
        ${Lt.map(o=>l`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?l`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function ri(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ni(e){let t={};for(let a of qt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of qt){let m=c[d];typeof m=="number"&&Number.isFinite(m)&&(t[d]+=m,r=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?At(t):null}var oi="bdui.monitor.done-range";function tu(){try{let e=window.localStorage.getItem(oi);return Ft(e)?e:kt}catch{return kt}}function ru(e){try{window.localStorage.setItem(oi,e)}catch{}}var ai="tab:monitor:pipeline",nu=1e3,su=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function si(e,t){let r=e.lane==="runnable"||e.lane==="queue";return l`<div
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
    ${Ja(e,t)}
  </div>`}function ii(e,t){let r=He("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),m=tu();function g(){let D=Lt.find(W=>W.value===m);return D?D.label:""}let b=document.createElement("div");b.className="mon",e.appendChild(b);let x=Ss(null,null),w=null,h=new Map,E=new Set;function Y(D){return x.queue_groups.find(W=>W.root_dir===D)||null}let K=Sn(e,{queueStore:{get(){if(!w)return{revision:0,exec_defaults:{}};let D=h.get(w);if(D)return D;let W=Y(w),I=s&&s.get?s.get():null,re=(Array.isArray(I)?I:[]).find(J=>J&&J.root_dir===w);return{revision:W?W.revision:0,exec_defaults:W?W.exec_defaults:{},workspace_info:re?re.workspace_info:void 0}},set(D){w&&h.set(w,D);for(let W of Array.from(E))W()},subscribe(D){return E.add(D),()=>E.delete(D)}},transport:o?(D,W)=>o(D,{...W||{},root_dir:w}):void 0,getWorkspacePath:()=>w||void 0}),P=null,A=null;async function S(D,W,I,re){if(!o||!I)return null;let J=await o(D,{...W,root_dir:I,expected_revision:re});if(J&&J.conflict){let he=J.queue&&typeof J.queue.revision=="number"?J.queue.revision:re;J=await o(D,{...W,root_dir:I,expected_revision:he})}return J&&J.queue&&I&&h.set(I,J.queue),J}async function N(D,W,I){return!o||!I?null:await o(D,{...W,root_dir:I})}async function z(D){if(!o||!D&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let W=await o("monitor-auto-toggle",{on:D}),I=W&&Array.isArray(W.failed)?W.failed:[];I.length>0&&se(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${I.map(re=>re.root_dir).join(", ")}`,"error",3200)}async function le(){let D=new Map;for(let W of x.pr_wait)D.has(W.root_dir)||D.set(W.root_dir,W.expected_revision);for(let[W,I]of D)await S("worker-merge-queue-add-all",{},W,I)}let oe=null,ce=!1,ue=null;function Le(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,ce=!1},0)}function Be(D){let W=D.target;return typeof W?.closest=="function"?W.closest(".mon-group"):null}function De(D){let W=Be(D);return!W||!oe?null:(W.getAttribute("data-root-dir")||"")===oe.root_dir?W:null}function ie(){for(let D of Array.from(b.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function T(D){let W=D.target,I=typeof W?.closest=="function"?W.closest('.mon-card[draggable="true"]'):null;if(I){oe={bead_id:I.getAttribute("data-issue-id")||"",lane:I.getAttribute("data-lane")||"",root_dir:I.getAttribute("data-root-dir")||"",revision:Number(I.getAttribute("data-revision")||0)||0,queue_index:Number(I.getAttribute("data-queue-index")),queue_length:Number(I.getAttribute("data-queue-length")),place_index:Number(I.getAttribute("data-place-index"))},ce=!0;try{D.dataTransfer?.setData("text/plain",oe.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function C(D){let W=De(D);W&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),W.classList.add("mon-group--drag-over"))}function G(D){Be(D)?.classList.remove("mon-group--drag-over")}function Z(){oe=null,ie(),Le()}function te(D){let W=De(D),I=oe;if(oe=null,ie(),!W||!I||!I.bead_id)return;D.preventDefault();let re=D.target,J=typeof re?.closest=="function"?re.closest('.mon-card[data-lane="queue"]'):null,he=J&&W.contains(J)?Number(J.getAttribute("data-queue-index")):NaN;if(I.lane==="runnable"){let Ce=Number.isFinite(he)?he:I.place_index;if(!Number.isFinite(Ce))return;S("worker-queue-place",{bead_id:I.bead_id,index:Ce},I.root_dir,I.revision);return}if(I.lane!=="queue"||J&&J.getAttribute("data-issue-id")===I.bead_id)return;let ve=I.queue_index,$e=Number.isFinite(he)?ve>he?he:he-1:I.queue_length-1;!Number.isFinite($e)||$e<0||$e===ve||S("worker-queue-reorder",{bead_id:I.bead_id,to_index:$e},I.root_dir,I.revision)}function ke(D){let W={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return l`${ti({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},done_range:m,token_total:ni(x.done),token_tooltip:ri(g())})}
      <div class="worker-lanes mon-lanes">
        ${su.map(I=>{let re=W[I.lane],J=I.lane==="queue"?x.queue_groups.length>0?l`${x.queue_groups.map(he=>l`<div
                        class="mon-group"
                        data-root-dir=${he.root_dir}
                      >
                        ${ei(he)}
                        <div class="mon-group__list">
                          ${he.items.map(ve=>si(ve,D))}
                        </div>
                      </div>`)}`:void 0:re.length>0?l`${re.map(he=>si(he,D))}`:void 0;return Ot({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${g()}`:I.title,items:re,empty:I.empty,body:J,live:I.lane==="running"&&re.length>0,header_control:I.lane==="pr_wait"&&re.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function pe(){let D=s&&s.get?s.get():null,W=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=i();x=Ss(D,W,{done_since:dr(m,I)}),Ae(ke(I),b)}function Ue(D,W){let I=a?a():void 0;if(!W||!I||W===I||!c){n(D);return}c(W).then(()=>{n(D)}).catch(re=>{r("workspace switch for %s failed: %o",W,re)})}function _e(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function Te(D,W){let{root_dir:I,revision:re}=_e(D),J=D.getAttribute("data-issue-id")||"",he=D.getAttribute("data-attempt-id")||"",ve=W.classList;if(ve.contains("worker-card__place")){S("worker-queue-place",{bead_id:J,index:Number(D.getAttribute("data-place-index")||0)||0},I,re);return}if(ve.contains("mon-op--up")||ve.contains("mon-op--down")){let $e=Number(D.getAttribute("data-queue-index")||0)||0,Ce=ve.contains("mon-op--up")?$e-1:$e+1;if(Ce<0)return;S("worker-queue-reorder",{bead_id:J,to_index:Ce},I,re);return}if(ve.contains("mon-op--remove")){S("worker-queue-remove",{bead_id:J},I,re);return}if(ve.contains("mon-op--pause")){N("worker-attempt-pause",{attempt_id:he},I);return}if(ve.contains("mon-op--stop")){N("worker-attempt-stop",{attempt_id:he},I);return}if(ve.contains("mon-op--resume")){S("worker-attempt-resume",{attempt_id:he},I,re);return}if(ve.contains("mon-op--dismiss")){S("worker-attempt-dismiss",{attempt_id:he},I,re);return}if(ve.contains("worker-mini__merge")){S("worker-merge-queue-add",{bead_id:J},I,re);return}if(ve.contains("worker-mini__merge-cancel")){S("worker-merge-queue-remove",{bead_id:J},I,re);return}if(ve.contains("worker-mini__discard")){if(!d(`${J}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;S("worker-pr-discard",{bead_id:J},I,re);return}if(ve.contains("worker-mini__revise-fix")){S("worker-revise-fix",{bead_id:J},I,re);return}ve.contains("worker-mini__revise-approve")&&S("worker-revise-approve",{bead_id:J},I,re)}function F(D){let W=ce;ce=!1;let I=D.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest("a"))return;let re=I.closest(".mon-auto-all");if(re){D.preventDefault(),z(re.getAttribute("data-on")==="true");return}if(I.closest(".mon-merge-all")){D.preventDefault(),le();return}let he=I.closest(".mon-ctl--advance");if(he){D.preventDefault();let{root_dir:nt,revision:st}=_e(he);S("worker-queue-toggle",{on:he.getAttribute("data-on")==="true"},nt,st);return}let ve=I.closest(".mon-ctl--merge-auto");if(ve){D.preventDefault();let{root_dir:nt,revision:st}=_e(ve);S("worker-merge-auto-toggle",{on:ve.getAttribute("data-on")==="true"},nt,st);return}let $e=I.closest(".mon-ctl--exec");if($e){D.preventDefault(),w=$e.getAttribute("data-root-dir")||null,h.delete(w||""),K.open();return}let Ce=I.closest(".mon-card");if(!Ce)return;let ze=I.closest("button");if(ze){D.preventDefault(),Te(Ce,ze);return}let We=Ce.getAttribute("data-issue-id");We&&!W&&(D.preventDefault(),Ue(We,Ce.getAttribute("data-root-dir")||""))}function M(D){let W=D.target;if(!W||typeof W.closest!="function")return;let I=W.closest(".mon-done-range");if(I){m=Ft(I.value)?I.value:kt,ru(m),pe();return}let re=W.closest(".mon-slots__input");if(!re)return;let{root_dir:J,revision:he}=_e(re),ve=Number(re.value);if(!Number.isFinite(ve))return;let $e=Math.max(zr,Math.floor(ve));S("worker-queue-set-slots",{slots:$e},J,he)}e.addEventListener("click",F),e.addEventListener("change",M),e.addEventListener("dragstart",T),e.addEventListener("dragover",C),e.addEventListener("dragleave",G),e.addEventListener("drop",te),e.addEventListener("dragend",Z),s&&typeof s.subscribe=="function"&&(P=s.subscribe(()=>{try{h.clear(),pe();for(let D of Array.from(E))D()}catch{}}));function de(){A!==null&&(clearInterval(A),A=null)}function qe(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),pe(),A===null&&(A=setInterval(()=>{try{pe()}catch{}},nu))},pause(){de()},clear(){de(),qe(),P&&(P(),P=null),e.removeEventListener("click",F),e.removeEventListener("change",M),e.removeEventListener("dragstart",T),e.removeEventListener("dragover",C),e.removeEventListener("dragleave",G),e.removeEventListener("drop",te),e.removeEventListener("dragend",Z),K.destroy(),E.clear(),e.replaceChildren()}}}function li(e,t,r){let n=He("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${d==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${d==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${d==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function c(){Ae(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Ae(l``,e)}}}var ci=["bug","feature","task","epic","chore"];function di(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ui=["Critical","High","Medium","Low","Backlog"];function pi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),m=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let S of ci){let N=document.createElement("option");N.value=S,N.textContent=di(S),o.appendChild(N)}a.replaceChildren();for(let S=0;S<=4;S+=1){let N=document.createElement("option");N.value=String(S);let z=ui[S]||"Medium";N.textContent=`${S} \u2013 ${z}`,a.appendChild(N)}}x();function w(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function h(A){s.disabled=A,o.disabled=A,a.disabled=A,c.disabled=A,i.disabled=A,m.disabled=A,g.disabled=A,g.textContent=A?"Creating\u2026":"Create"}function E(){d.textContent=""}function Y(A){d.textContent=A}function H(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function K(){let A=o.value||"",S=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function P(){E();let A=String(s.value||"").trim();if(A.length===0){Y("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){Y("Priority must be 0..4"),a.focus();return}let N=String(o.value||""),z=String(i.value||""),le={title:A};N.length>0&&(le.type=N),String(S).length>0&&(le.priority=S),z.length>0&&(le.description=z),h(!0);try{await t("create-issue",le)}catch{h(!1),Y("Failed to create issue");return}K(),h(!1),w()}return r.addEventListener("cancel",A=>{A.preventDefault(),w()}),b.addEventListener("click",()=>w()),m.addEventListener("click",()=>w()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),P())}),n.addEventListener("submit",A=>{A.preventDefault(),P()}),{open(){n.reset(),E(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){w()}}}var ou=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function fi(e){return String(e).padStart(2,"0")}function au(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function iu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${fi(n.getHours())}:${fi(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${ou[n.getMonth()]} ${n.getDate()} ${o}`;return`${au(r,t)} \xB7 ${c}`}function lu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function _i(e){let t=!1,r=null;function n(){Ae(l``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let a=await o.json();if(t)return;if(!a||a.available!==!0||!Array.isArray(a.windows)){n();return}let c=typeof a.ageSeconds=="number"&&a.ageSeconds>600,i=c?`${Math.floor(a.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Ae(l`<div
          class="usage-meter${c?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${a.windows.map(m=>{let g=typeof m.pct=="number"&&Number.isFinite(m.pct)?m.pct:0,b=Math.min(100,Math.max(0,g)),w=`resets ${iu(m.resetsAt,d)}${c?` \xB7 ${i}`:""}`;return l`<span
              class="usage-meter__window ${lu(g)}"
              style=${`--progress: ${b}%`}
              title=${w}
            >
              <span class="usage-meter__label">${m.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${g}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var cu="tab:worker:ready",du="tab:worker:blocked",uu="tab:worker:in-progress",Tn=1;function Rs(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var bi="beads-ui.worker.candidate-filter",Es={show_blocked:!1,spec:"all"};function pu(){try{let e=window.localStorage.getItem(bi);if(!e)return{...Es};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Es};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Es}}}function fu(e){try{window.localStorage.setItem(bi,JSON.stringify(e))}catch{}}function _u(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=r(c),d=n(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var mu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],vi="bdui.worker.candidate_sort",gu=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],En="spec";function hu(){try{let e=window.localStorage.getItem(vi);return e==="board"||e==="created"||e==="spec"?e:En}catch{return En}}function bu(e){try{window.localStorage.setItem(vi,e)}catch{}}var yi="bdui.worker.done-range";function vu(){try{let e=window.localStorage.getItem(yi);return Ft(e)?e:kt}catch{return kt}}function yu(e){try{window.localStorage.setItem(yi,e)}catch{}}var wu="(max-width: 640px)",wi="beads-ui.worker.lane-collapsed",jr={queue:!0,done:!0};function ku(){try{let e=window.localStorage.getItem(wi);if(!e)return{...jr};let t=JSON.parse(e);return!t||typeof t!="object"?{...jr}:{queue:typeof t.queue=="boolean"?t.queue:jr.queue,done:typeof t.done=="boolean"?t.done:jr.done}}catch{return{...jr}}}function $u(e){try{window.localStorage.setItem(wi,JSON.stringify(e))}catch{}}function mi(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function xu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(er):(n.sort(Jr(r)),t==="board"?n:[...n.filter(Rs),...n.filter(s=>!Rs(s))])}function Su(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Au(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Tu(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Eu=["closed_unmerged","undecidable"],Cu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ru(e,t){for(let r of Cu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Cs=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Iu(e){if(typeof e!="string"||e.length===0)return null;let t=Cs.length,r=Cs.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Cs[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function gi(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function hi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Lu(e,t,r,n,s=null,o=null,a=null,c=!1,i=null,d=!0,m=null,g=null){let b=!!i&&i.position>0,x=!!i&&i.active===!0,w=i&&i.failure||null,h=r[e]||null,E=h&&h.gate?h.gate:null,Y=h&&h.pr?h.pr:null,H=[];c&&H.push("\uC138\uC158");let K=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,P=Ru(c&&E&&E.tier==="closed_unmerged"?"\uB2EB\uD798":E&&E.gate_badge||"",K?null:o&&o.activity||null);K&&H.push(K),P.label&&H.push(P.label),E&&E.base_badge&&E.base_badge!==E.gate_badge&&H.push(E.base_badge),g&&H.push(g),n&&H.push("\uC815\uB9AC \uC2E4\uD328"),b&&!x&&H.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),w&&H.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${gi(w)}`),m&&H.push(`\uC790\uB3D9 \uC81C\uC678: ${gi(m)}`);let A=!!E&&E.base_badge==="\uCDA9\uB3CC",S=!!E&&E.enabled===!0,N=Iu(o&&o.merge_progress?o.merge_progress.step:null),z=!!n&&!!E&&E.tier==="merged",le=c&&!!E&&E.tier==="merged",oe=c&&A&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:Y&&typeof Y.number=="number"?Y.number:null,pr_url:Y&&typeof Y.url=="string"?Y.url:"",badges:H,live_badge:a==="running"?K:K?null:P.live?P.label:null,usage:s,alert:!!E&&Eu.includes(E.tier)||!!n||!!w,merge_action:!b,cancel_action:b,cancel_enabled:!x,cancel_title:x?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(E&&E.tier==="merged"),merge_step:N,discard_enabled:!N&&!a&&!b,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":b?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!N&&!a&&!oe&&(S||A||z||le),merge_label:le?"\uC815\uB9AC":A&&!N&&!z?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:le?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":oe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":z?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":A?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Is(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:c,getWorkspacePath:i}=t,d=n?tn(n,a):null,m=nn({transport:r,uiOrderStore:a}),g=null,b=[],x=pu(),w=hu(),h=vu();function E(){let u=Lt.find(v=>v.value===h);return u?u.label:"\uC624\uB298"}let Y=ku(),H=!1,K=new Set,P=new Set,A=[],S=document.createElement("div");S.className="worker-console";let N=document.createElement("div");N.className="worker-top";let z=document.createElement("div");z.className="worker-drawer-overlay",z.hidden=!0;let le=document.createElement("div");le.className="worker-drawer-overlay__backdrop";let oe=document.createElement("div");oe.className="worker-drawer-host",z.append(le,oe);let ce=document.createElement("div");ce.className="worker-lanes-host",S.append(N,z,ce),e.appendChild(S);let ue=null,Le=kn(oe,{transport:r,sessionLogStore:o,onClose:()=>{ue=null,z.hidden=!0,ye()}}),Be=Sn(S,{queueStore:s,transport:r,getWorkspacePath:i});function De(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Tn,queue:[],pr_wait:[],done:[]}}function ie(){let u=De();return typeof u.revision=="number"?u.revision:0}function T(u){u&&u.queue&&s&&s.set(u.queue)}function C(){let u=De().queue;return Array.isArray(u)?u.length:0}async function G(u,v){if(!r)return;let L=await r("worker-queue-place",{bead_id:u,index:v,expected_revision:ie()});T(L),L&&L.conflict&&await r("worker-queue-place",{bead_id:u,index:v,expected_revision:ie()}).then(T)}async function Z(u,v){if(!r)return;let L=await r("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:ie()});T(L),L&&L.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:ie()}).then(T)}async function te(u){if(!r)return;let v=await r("worker-queue-remove",{bead_id:u,expected_revision:ie()});T(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ie()}).then(T)}async function ke(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function pe(u){if(!r||!u)return;let v=await r("worker-attempt-pause",{attempt_id:u});v&&v.paused===!1&&v.reason&&se(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ue(u){if(!r||!u)return;let v=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ie()});T(v),v&&v.conflict&&(v=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ie()}),T(v)),v&&v.resumed===!1&&!v.conflict&&v.reason&&se(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function _e(u){if(!r||!u)return;let v=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ie()});T(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ie()}),T(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&se(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Te(u,v){if(!r)return null;let L=r,X=await L(u,{...v,expected_revision:ie()});return T(X),X&&X.conflict&&(X=await L(u,{...v,expected_revision:ie()}),T(X)),X}async function F(u){if(!r||!u)return;K.add(u),ye();let v;try{v=await Te("worker-merge-queue-add",{bead_id:u})}finally{K.delete(u),ye()}!v||v.conflict||v.applied||se("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function M(u){if(!r)return;let v=await Te("worker-merge-auto-toggle",{on:u});!v||v.conflict||se(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function de(u){if(!r||!u)return;let v=await Te("worker-merge-queue-remove",{bead_id:u});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&se("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function qe(){await Te("worker-merge-queue-remove",{all:!0})}async function D(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let L=await r("worker-pr-discard",{bead_id:u,expected_revision:ie()});if(T(L),L&&L.conflict&&(L=await r("worker-pr-discard",{bead_id:u,expected_revision:ie()}),T(L)),L&&L.discarded===!0){se("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}L&&L.discarded===!1&&!L.conflict&&se(`\uD3D0\uAE30 \uAC70\uBD80: ${L.reason||""}`,"error",2800)}async function W(u,v){if(!r||!v||P.has(v))return;P.add(v),ye();let L;try{L=await r(u,{bead_id:v,expected_revision:ie()}),T(L),L&&L.conflict&&(L=await r(u,{bead_id:v,expected_revision:ie()}),T(L))}finally{P.delete(v),ye()}if(!(!L||L.conflict)){if(L.ok){se(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}se(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function I(u){if(!r)return;let v=await r("worker-queue-toggle",{on:u,expected_revision:ie()});T(v),v&&v.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ie()}).then(T)}async function re(u){await I(u),await M(u)}async function J(u){if(!r||!Number.isFinite(u))return;let v=Math.max(Tn,Math.floor(u)),L=await r("worker-queue-set-slots",{slots:v,expected_revision:ie()});T(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:ie()}).then(T)}function he(){let u=De(),v=d?d.selectBoardColumn(cu,"ready"):[],L=d?d.selectBoardColumn(du,"blocked"):[],X=d?d.selectBoardColumn(uu,"in_progress"):[],V=new Map;for(let k of X){let j=Au(k);if(!j)continue;let ae=V.get(j);ae?ae.push(k):V.set(j,[k])}let me=k=>{let j=rn(V.get(k)||[]);return j?j.title||j.id:null},Re=u.bead_titles||{},Me=new Map;for(let[k,j]of Object.entries(Re))typeof j=="string"&&j.length>0&&Me.set(k,j);for(let k of[...v,...L])Me.set(k.id,k.title||k.id);let Ve=u.bead_times||{},rt=new Map;for(let[k,j]of Object.entries(Ve))j&&typeof j=="object"&&rt.set(k,j);for(let k of[...v,...L])rt.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let ht=k=>rt.get(k)||{},we=u.pr_wait||[],lt=u.pr_observations||{},Xe=u.pr_activity||{},Qe=u.cleanup_failed||{},be=Object.entries(Qe).map(([k,j])=>({bead_id:k,step:j&&j.step?j.step:"",reason:j&&j.reason?j.reason:"",detail:j&&typeof j.detail=="string"?j.detail:null,output_tail:j&&typeof j.output_tail=="string"&&j.output_tail?j.output_tail:void 0,log_path:j&&typeof j.log_path=="string"&&j.log_path?j.log_path:void 0})),Se=u.ship_failure||null,xt=Se&&typeof Se.reason=="string"&&Se.reason?{bead_id:typeof Se.bead_id=="string"?Se.bead_id:"",reason:Se.reason,detail:typeof Se.detail=="string"?Se.detail:null,pr_url:typeof Se.pr_url=="string"?Se.pr_url:null}:null,Mt=u.queue||[],ut=new Set([...Mt.map(k=>k.bead_id),...we.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),Ee=new Set(L.map(k=>k.id)),y=a?a.get()?.order||{}:{},U=new Set,q=[];for(let k of[...v,...L])ut.has(k.id)||U.has(k.id)||Su(k)||(U.add(k.id),q.push(k));b=xu(q,w,y);let _=u.admission||{},f=k=>{let j=_[k];if(!j)return"";if(j.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ae=typeof j.reason=="string"?j.reason:"",Pe=ae.indexOf(":");return Pe>0&&Pe<ae.length-1?`\u26D4 ${ae.slice(0,Pe)} (${ae.slice(Pe+1)})`:`\u26D4 ${ae}`},p=b.map(k=>{let j=Rs(k),ae=Ee.has(k.id),Pe=[];ae&&Pe.push(Tu(k)),j||Pe.push("spec \uC5C6\uC74C");let Kr=f(k.id);return Kr&&Pe.push(Kr),{id:k.id,title:k.title||k.id,reason:Pe.join(" \xB7 "),draggable:j,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:ae,has_spec:j}}),$=_u(p,x),O=$.visible,Q=u.revise_parked||{},Ne=(k,j)=>k.map(ae=>{let Pe=j==="queue"?Q[ae.bead_id]:null;return{id:ae.bead_id,title:Me.get(ae.bead_id)||ae.bead_id,reason:j==="done"?"":f(ae.bead_id),draggable:j!=="done",done:j==="done",lane:j,badges:Pe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Pe,revise_action:!!Pe,revise_enabled:!!Pe&&!P.has(ae.bead_id),revise_title:Pe?Pe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Pe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:j==="done"?Dt(u.attempts||{},ae.bead_id):null,done_at:j==="done"&&typeof ae.added_at=="number"?ae.added_at:void 0,...ht(ae.bead_id)}}),je=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&je.set(k.bead_id,k.added_at);let Je=u.attempts?Object.values(u.attempts):[],yt=new Set;for(let k of Je)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&yt.add(k.resumed_from);let Nt=new Map;for(let k of Je)Nt.set(k.bead_id,k.attempt_id);let ar=new Map;for(let k of Je)ar.set(k.attempt_id,k);function et(k){let j=new Set,ae=k;for(;ae&&!j.has(ae.attempt_id);){if(ae.conflict_resolution===!0)return!0;j.add(ae.attempt_id),ae=typeof ae.resumed_from=="string"&&ae.resumed_from.length>0&&ar.get(ae.resumed_from)||null}return!1}let ir=typeof u.declared_base=="string"?u.declared_base:null;function Gr(k){let j=null;for(let ae of Je)!ae||ae.bead_id!==k||et(ae)||(j===null||(typeof ae.started_at=="number"?ae.started_at:0)>=(typeof j.started_at=="number"?j.started_at:0))&&(j=ae);return j&&typeof j.target_base=="string"?j.target_base:null}let wr=[],It=null;for(let k of Je){let j=k.status==="paused"&&!yt.has(k.attempt_id);if(k.status==="running"||j)wr.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Me.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:j,conflict_resolution:et(k),base_exception:hi(ir,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Dt(u.attempts||{},k.bead_id),current_child:me(k.bead_id),...ht(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let ae=Nt.get(k.bead_id)!==k.attempt_id,Pe=je.get(k.bead_id),Kr=typeof Pe=="number"&&Pe>0&&typeof k.finished_at=="number"&&Pe>=k.finished_at;!ae&&!Kr&&typeof k.dismissed_at!="number"&&(It=k)}}let Ms=null;if(It){let k=typeof It.session_id=="string"&&It.session_id.length>0,j=yt.has(It.attempt_id),ae=It.cause_detail;Ms={repo:It.repo||"",reason:It.cause||It.status,cause_detail:ae&&typeof ae.reason=="string"?{reason:ae.reason,command:typeof ae.command=="string"?ae.command:null}:null,resume_attempt_id:It.attempt_id,resume_eligible:k&&!j,resume_reason:k?j?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Li=new Set(wr.map(k=>k.bead_id)),Cn=Array.isArray(u.merge_queue)?u.merge_queue:[],Ns=new Map;Cn.forEach((k,j)=>{k&&typeof k.bead_id=="string"&&Ns.set(k.bead_id,j+1)});let Ps=u.merge_queue_state||{active:null,failures:{}},Di=Ps.failures||{},Oi=u.auto_merge_skips||{},Fs=k=>{let j=Oi[k];if(!j)return null;let ae=lt[k],Pe=ae&&ae.pr?ae.pr.head_sha:null;return Pe&&Pe===j.head_sha?j.reason||"":null},Yr=new Map;for(let k of wr)k.conflict_resolution&&(k.paused?Yr.has(k.bead_id)||Yr.set(k.bead_id,"paused"):Yr.set(k.bead_id,"running"));let qs=wr.filter(k=>!k.paused).length,Bs=(u.workspace_info||{}).slots,Us=typeof Bs=="number"?Bs:typeof u.slots=="number"?u.slots:Tn,Mi=qs>Us,zs=dr(h),Ni=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>zs===void 0||typeof k.added_at!="number"||k.added_at>=zs).sort((k,j)=>(j.added_at||0)-(k.added_at||0)),Hs=Ne(Ni,"done"),Vr={};for(let k of qt)Vr[k]=0;let Ws=!1,js=0,Rn=0,Gs=0;for(let k of Hs){let j=k.usage;if(j&&typeof j=="object"){let ae=!1;for(let Pe of qt)Number.isFinite(j[Pe])&&(Vr[Pe]+=j[Pe],Ws=!0,ae=!0);ae&&(Rn+=1,Number.isFinite(j.total_cost_usd)&&(js+=j.total_cost_usd,Gs+=1))}}Rn>0&&Gs===Rn&&(Vr.total_cost_usd=js);let Pi=Ws?At(Vr):null;return{queue:u,idToTitle:Me,candidates:O,candidate_hidden:{blocked:$.hidden_blocked,spec:$.hidden_spec},running:wr,live_count:qs,slots:Us,over_cap:Mi,failure:Ms,waiting:Ne(Mt.filter(k=>!Li.has(k.bead_id)),"queue"),pr_wait:we.map(k=>Lu(k.bead_id,Me.get(k.bead_id)||k.bead_id,lt,Qe[k.bead_id]||null,Dt(u.attempts||{},k.bead_id),Xe[k.bead_id]||(K.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Yr.get(k.bead_id)||null,k.external===!0,{position:Ns.get(k.bead_id)||0,active:Ps.active===k.bead_id,failure:Di[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?Fs(k.bead_id):null,hi(ir,Gr(k.bead_id)))).map(k=>({...k,...ht(k.id)})),merge_queue_length:Cn.length,merge_queue_running:Cn.length>0,auto_excluded:we.map(k=>k.bead_id).filter(k=>Fs(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:ir,done:Hs,token_total:Pi,cleanup_failures:be,ship_failure:xt}}function ve(u){let v=u.waiting.length>0?u.waiting[0].id:"\u2014",L=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,V=l`<button
      type="button"
      class="worker-auto-all${X?" is-active":""}"
      title=${X?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${X?"true":"false"}
    >
      ${X?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,me=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Re=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${E()} 완료 <b>${u.done.length}</b></span
      >`,Me=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ve=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Tn}
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
      </button>`,rt=ja({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return H?l`<div class="worker-ribbon">
          ${L}
          <div class="worker-kpi worker-kpi--ribbon">${me}${Re}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${V}${Ve}</div>
          <div class="worker-kpi">${Me}</div>
        </div>
        ${rt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${V}${Ve}</div>
        <div class="worker-kpi">
          ${me}${Re}${Me}
          ${u.token_total?l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${E()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${E()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${rt}`}function $e(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let v=u.running.some(L=>!L.paused);return l`<section
      class="worker-now${v?" worker-pane--live":""}"
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
        ${nt(u)}
      </header>
      ${u.running.length>0?ws(u.running,Date.now(),ue):""}
      ${u.pr_wait.map(L=>bs(L))}
    </section>`}function Ce(u){let v=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${mu.map(L=>l`<button
              type="button"
              class="worker-filter__chip${x.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${x.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function ze(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${w}
    >
      ${gu.map(u=>l`<option value=${u.value} ?selected=${w===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function We(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Lt.map(u=>l`<option value=${u.value} ?selected=${h===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function nt(u){let v=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(v)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(u.auto_excluded),X=u.pr_wait.filter(V=>V.merge_action&&V.merge_enabled&&!L.has(V.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${X>0?` ${X}`:""}
    </button>`}function st(u){let v=Ot({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ze(),controls:Ce(u)});return H?l`<div class="worker-lanes worker-lanes--mobile">
        ${$e(u)}
        ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:Y.queue,preview:mi(u.waiting)})}
        ${v}
        ${Ot({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:We(),collapsible:!0,collapsed:Y.done,preview:u.token_total||mi(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ot({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(L=>!L.paused),body:ws(u.running,Date.now(),ue)})}
      ${Ot({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:nt(u)})}
      ${Ot({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${E()} ${u.done.length}`,items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:We()})}
    </div>`}function vt(u){Y={...Y,[u]:!Y[u]},$u(Y),ye()}function ye(){let u=he();Ae(ve(u),N),Ae(st(u),ce)}function gt(){let u=document.querySelector(".app-header");if(!u)return;let v=()=>{let L=Math.round(u.getBoundingClientRect().height);S.style.setProperty("--worker-ribbon-top",`${L}px`)};if(v(),typeof ResizeObserver=="function"){let L=new ResizeObserver(v);L.observe(u),A.push(()=>L.disconnect())}else window.addEventListener("resize",v),A.push(()=>window.removeEventListener("resize",v))}function it(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(wu);H=!!u.matches;let v=L=>{let X=!!(L&&typeof L.matches=="boolean"?L.matches:u.matches);X!==H&&(H=X,ye())};typeof u.addEventListener=="function"?(u.addEventListener("change",v),A.push(()=>u.removeEventListener("change",v))):typeof u.addListener=="function"&&(u.addListener(v),A.push(()=>u.removeListener(v)))}function Ye(u){let v=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;let L=v.dataset.beadId||"",X=v.dataset.lane||"";g={bead_id:L,from_lane:X};try{u.dataTransfer?.setData("text/plain",L),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function at(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;let L=v.dataset.lane||"";L!=="candidate"&&L!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function dt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ge(u,v){let L=b.find(Re=>Re.id===u);if(!L)return;let X=b.filter(Re=>Re.id!==u),V=X.length;if(v){let Re=v.dataset.beadId;if(Re===u)return;let Me=X.findIndex(Ve=>Ve.id===Re);Me>=0&&(V=Me)}let me=X.slice();me.splice(V,0,L),m.applyReorder(u,me,V)}function ot(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;u.preventDefault(),v.classList.remove("worker-pane--drag-over");let L=v.dataset.lane||"",X=g?.bead_id||u.dataTransfer?.getData("text/plain")||"",V=g?.from_lane||"";if(g=null,!X)return;let me=u.target?.closest?.(".worker-mini, .worker-card"),Re=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Me=Re.length;if(me){let Ve=Re.indexOf(me);Ve>=0&&(Me=Ve)}if(v.classList.contains("worker-pane--collapsed")&&(Me=C()),L==="candidate"){if(V==="candidate"){Ge(X,me);return}V==="queue"&&te(X);return}L==="queue"&&(V==="queue"?Z(X,Me):G(X,Me))}function tt(u){x=u,fu(u),ye()}function Ze(u){w=u==="board"||u==="created"||u==="spec"?u:En,bu(w),ye()}function R(u){h=Ft(u)?u:kt,yu(h),ye()}function B(u){let v=u.target?.closest?.(".worker-filter__blocked");if(v){tt({...x,show_blocked:v.checked});return}let L=u.target?.closest?.(".worker-done-range");if(L){R(L.value);return}let X=u.target?.closest?.(".worker-sort");if(X){Ze(X.value||En);return}let V=u.target?.closest?.(".worker-slots__input");if(!V)return;let me=Number.parseInt(V.value,10);if(!Number.isFinite(me)){ye();return}J(me).then(ye)}function ee(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function ne(u){let v=De(),L=v.attempts?v.attempts[u]:null;ue=u,z.hidden=!1,Le.open({attempt_id:u,meta:ee(L)}),ye()}function fe(){if(!ue)return;let u=De(),v=u.attempts?u.attempts[ue]:null;if(v){Le.updateMeta(ee(v));return}Le.close()}function ge(u){let v=u.target;if(v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){Be.open();return}let L=v?.closest?.(".worker-banner__resume");if(L){let be=L.dataset.attemptId;be&&Ue(be);return}let X=v?.closest?.(".worker-banner__dismiss");if(X){let be=X.dataset.attemptId;be&&_e(be);return}if(v?.closest?.(".worker-play")){I(!De().auto_advance);return}if(v?.closest?.(".worker-auto-all")){let be=De();re(!(be.auto_advance===!0&&be.auto_merge===!0));return}let V=v?.closest?.(".worker-merge-all");if(V){V.classList.contains("worker-merge-all--stop")?De().auto_merge===!0?M(!1):qe():M(!0);return}let me=v?.closest?.(".worker-pane__hd--toggle");if(me){let be=me.dataset.lane;(be==="queue"||be==="done")&&vt(be);return}let Re=v?.closest?.(".worker-card__place");if(Re){let be=Re.dataset.beadId;be&&!Re.disabled&&G(be,C());return}let Me=v?.closest?.(".worker-filter__chip");if(Me){let be=Me.dataset.spec;(be==="all"||be==="with"||be==="without")&&tt({...x,spec:be});return}let Ve=v?.closest?.(".worker-mini__merge");if(Ve){F(Ve.dataset.beadId||"");return}let rt=v?.closest?.(".worker-mini__merge-cancel");if(rt){de(rt.dataset.beadId||"");return}let ht=v?.closest?.(".worker-mini__discard");if(ht){D(ht.dataset.beadId||"");return}let we=v?.closest?.(".worker-mini__revise-fix");if(we){W("worker-revise-fix",we.dataset.beadId||"");return}let lt=v?.closest?.(".worker-mini__revise-approve");if(lt){W("worker-revise-approve",lt.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__stop")){let Se=v?.closest?.(".rtile")?.dataset?.attemptId;Se&&ke(Se);return}if(v?.closest?.(".rtile__pause")){let Se=v?.closest?.(".rtile")?.dataset?.attemptId;Se&&pe(Se);return}if(v?.closest?.(".rtile__resume")){let Se=v?.closest?.(".rtile")?.dataset?.attemptId;Se&&Ue(Se);return}if(v?.closest?.(".rtile__session")){let Se=v?.closest?.(".rtile")?.dataset?.attemptId;Se&&ne(Se);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Le.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Xe=v?.closest?.(".rtile");if(Xe){if(v?.closest?.(".rtile__id")){let Se=Xe.dataset.beadId;Se&&rr(Se).then(xt=>{xt?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let be=Xe.dataset.beadId;be&&c&&c(be);return}let Qe=v?.closest?.(".worker-mini, .worker-card");if(Qe){let be=Qe.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){be&&rr(be).then(Se=>{Se?se("\uBCF5\uC0AC\uB428","success",1200):se("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}be&&c&&c(be)}}return e.addEventListener("dragstart",Ye),e.addEventListener("dragover",at),e.addEventListener("dragleave",dt),e.addEventListener("drop",ot),e.addEventListener("click",ge),e.addEventListener("change",B),it(),gt(),d&&A.push(d.subscribe(ye)),s&&A.push(s.subscribe(()=>{ye(),fe()})),ye(),{load(){ye()},destroy(){for(let u of A.splice(0))try{u()}catch{}e.removeEventListener("dragstart",Ye),e.removeEventListener("dragover",at),e.removeEventListener("dragleave",dt),e.removeEventListener("drop",ot),e.removeEventListener("click",ge),e.removeEventListener("change",B);try{Le.destroy()}catch{}z.hidden=!0;try{Be.destroy()}catch{}Ae(l``,e)}}}function Ls(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ki(e,t,r,n=async()=>{},s=async()=>{}){let o=He("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function m(S){let z=S.target.value,oe=t.getState().workspace?.current?.path||"";if(z&&z!==oe){o("switching workspace to %s",z),c=!0,A();try{await r(z)}catch(ce){o("workspace switch failed: %o",ce)}finally{c=!1,A()}}}async function g(){let S=t.getState(),N=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!N||i)){o("git-pulling workspace %s",N),i=!0,A();try{await n(N)}catch(z){o("workspace git pull failed: %o",z)}finally{i=!1,A()}}}function b(S){let N=S.target;N&&e.contains(N)||h()}function x(S){S.key==="Escape"&&h()}function w(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),A())}function h(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),A())}function E(){d?h():w()}async function Y(S){let N=S.target,z=N.value,le=N.checked;o("toggling visibility %s \u2192 %s",z,String(le));try{await s(z,le)}catch(oe){o("workspace visibility toggle failed: %o",oe)}}function H(S){return S?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${c||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function K(S,N){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${E}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(z=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${z.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${z.path}"
                        .checked=${!N.has(z.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ls(z.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function P(){let S=t.getState(),N=S.workspace?.current,z=S.workspace?.available||[],le=new Set(S.workspace?.hidden||[]),oe=N?.path||z[0]?.path||"";if(z.length===0)return l``;let ce=z.filter(ue=>!le.has(ue.path)||ue.path===oe);if(ce.length<=1){let ue=ce[0]||z[0],Le=Ls(ue.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Le}</span
          >
          ${K(z,le)}
          ${H(oe)}
          ${i?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${m}
          ?disabled=${c||i}
          aria-label="Select project workspace"
        >
          ${ce.map(ue=>l`
              <option
                value="${ue.path}"
                ?selected=${ue.path===oe}
                title="${ue.path}"
              >
                ${Ls(ue.path)}
              </option>
            `)}
        </select>
        ${K(z,le)}
        ${H(oe)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){Ae(P(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),Ae(l``,e)}}}var $i=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Ds(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function xi(e,t,r=Ds()){return{id:r,type:e,payload:t}}function Si(e={}){let t=He("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,m=[],g=new Map,b=new Set;function x(P){for(let A of Array.from(b))try{A(P)}catch{}}function w(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),x(o);let P=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*P,S=Math.max(0,Math.round(P+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",S,a+1),c=setTimeout(()=>{c=null,K()},S)}function h(P){try{s?.send(JSON.stringify(P))}catch(A){t("ws send failed",A)}}function E(){for(o="open",t("ws open"),x(o),a=0;m.length;){let P=m.shift();P&&h(P)}}function Y(P){let A;try{A=JSON.parse(String(P.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let N=d.get(A.id);d.delete(A.id),A.ok?N?.resolve(A.payload):N?.reject(A.error||new Error("ws error"));return}let S=g.get(A.type);if(S&&S.size>0)for(let N of Array.from(S))try{N(A.payload)}catch(z){t("ws event handler error",z)}else t("ws received unhandled message type: %s",A.type)}function H(){o="closed",t("ws closed"),x(o);for(let[P,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(P);a+=1,w()}function K(){if(!i)return;let P=n();try{s=new WebSocket(P),t("ws connecting %s",P),o="connecting",x(o),s.addEventListener("open",E),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(A){t("ws connect failed %o",A),w()}}return K(),{send(P,A){if(!$i.includes(P))return Promise.reject(new Error(`unknown message type: ${P}`));let S=Ds(),N=xi(P,A,S);return t("send %s id=%s",P,S),new Promise((z,le)=>{d.set(S,{resolve:z,reject:le,type:P}),s&&s.readyState===s.OPEN?h(N):(t("queue %s id=%s (state=%s)",P,S,o),m.push(N))})},on(P,A){g.has(P)||g.set(P,new Set);let S=g.get(P);return S?.add(A),()=>{S?.delete(A)}},onConnection(P){return b.add(P),()=>{b.delete(P)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,K()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Du(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ou(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Os=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ai=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ti=ai,Ei="worker:queue",Ci="ui:order",Ri="ui:display-policy",Vt="tab:board:closed",Ii="beads-ui.board.closed-range";function Mu(e){let t=He("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ae(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),i=document.getElementById("detail-panel");if(s&&_i(s),o&&a&&c&&i){let ie=function(_,f){let p="Request failed",$="";if(_&&typeof _=="object"){let Q=_;if(typeof Q.message=="string"&&Q.message.length>0&&(p=Q.message),typeof Q.details=="string")$=Q.details;else if(Q.details&&typeof Q.details=="object")try{$=JSON.stringify(Q.details,null,2)}catch{$=""}}else typeof _=="string"&&_.length>0&&(p=_);let O=f&&f.length>0?`Failed to load ${f}`:"Request failed";De.open(O,p,$)},re=function(_){return`${we.getState().workspace.current?.path||""}\0${_}`},J=function(){Te&&(Te().catch(()=>{}),Te=null),F=null,M=null},ve=function(_){de=_;let f=()=>{de!==_||we.getState().selected_id!==_||(de=null,he(_))};if(!W){D.then(f);return}f()},We=function(_,f,p,$,O){return p!==ze[f]?(O().catch(()=>{}),!1):(_.set($,O),!0)},nt=function(){let _=we.getState().view;ye(_==="board"),dt(_==="worker"),R(_==="monitor"),ot(_==="worker")},vt=function(){let _=dr(st);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},ye=function(_){if(_)for(let[f,p]of Os){if($e.has(f)||Ce.has(f))continue;let $=f===Vt?vt():{type:p};try{Z.register(f,$)}catch(Ne){t("register %s store failed: %o",f,Ne)}Ce.add(f);let O=ze.board,Q=!1;G.subscribeList(f,$).then(Ne=>{Q=!We($e,"board",O,f,Ne)}).catch(Ne=>{t("subscribe %s failed: %o",f,Ne),ie(Ne,"board")}).finally(()=>{Ce.delete(f),Q&&nt()})}else it()},it=function(){ze.board+=1;for(let[_]of Os){let f=$e.get(_);f&&(f().catch(()=>{}),$e.delete(_));try{Z.unregister(_)}catch(p){t("unregister %s failed: %o",_,p)}}},dt=function(_){if(!_){Ge();return}for(let[f,p]of Ai){if(Ye.has(f)||Ce.has(f))continue;try{Z.register(f,{type:p})}catch(Q){t("register %s store failed: %o",f,Q)}Ce.add(f);let $=ze.worker,O=!1;G.subscribeList(f,{type:p}).then(Q=>{O=!We(Ye,"worker",$,f,Q)}).catch(Q=>{t("subscribe %s failed: %o",f,Q),ie(Q,"worker")}).finally(()=>{Ce.delete(f),O&&nt()})}},Ge=function(){ze.worker+=1;for(let[_]of Ai){let f=Ye.get(_);f&&(f().catch(()=>{}),Ye.delete(_));try{Z.unregister(_)}catch(p){t("unregister %s failed: %o",_,p)}}},ot=function(_){if(!_){tt();return}at||(C("subscribe-worker-queue",{id:Ei}).catch(f=>{t("subscribe-worker-queue failed: %o",f)}),at=()=>C("unsubscribe-worker-queue",{id:Ei}))},tt=function(){at&&(at().catch(()=>{}),at=null)},R=function(_){if(!_){B();return}Ze||(C("subscribe-monitor-pipeline",{id:Ti}).catch(f=>{t("subscribe-monitor-pipeline failed: %o",f)}),Ze=()=>C("unsubscribe-monitor-pipeline",{id:Ti}))},B=function(){Ze&&(Ze().catch(()=>{}),Ze=null)},ne=function(){ee||(C("subscribe-ui-order",{id:Ci}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),ee=()=>C("unsubscribe-ui-order",{id:Ci}))},fe=function(){ee&&(ee().catch(()=>{}),ee=null),pe.clear()},u=function(){ge||(C("subscribe-display-policy",{id:Ri}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ge=()=>C("unsubscribe-display-policy",{id:Ri}))},v=function(){ge&&(ge().catch(()=>{}),ge=null),Ue.clear()},Me=function(_){if(!_)return"Unknown";let f=_.split("/").filter(Boolean);return f.length>0?f[f.length-1]:"Unknown"};var d=ie,m=re,g=J,b=ve,x=We,w=nt,h=vt,E=ye,Y=it,H=dt,K=Ge,P=ot,A=tt,S=R,N=B,z=ne,le=fe,oe=u,ce=v,ue=Me;let Le=document.getElementById("header-loading"),Be=To(Le),De=Ba(e),T=Si(),C=Be.wrapSend((_,f)=>T.send(_,f)),G=yo(C),Z=wo(),te=$o(),ke=so(),pe=ko(),Ue=no(),_e=oo();T.on("monitor-pipeline-snapshot",_=>{let f=_;if(!(!f||!Array.isArray(f.workspaces)))try{ke.set(f.workspaces,f.workspaces_state)}catch{}}),T.on("ui-order-snapshot",_=>{let f=_;if(f&&typeof f.revision=="number")try{pe.set({revision:f.revision,order:f.order&&typeof f.order=="object"?f.order:{}})}catch{}}),T.on("display-policy-snapshot",_=>{let f=_;if(f&&f.policy&&typeof f.policy=="object")try{Ue.set(f.policy)}catch{}}),T.on("session-log-snapshot",_=>{let f=_;if(f&&typeof f.attempt_id=="string")try{_e.set(f.attempt_id,Array.isArray(f.lines)?f.lines:[],typeof f.last_event_at=="number"?f.last_event_at:null)}catch{}}),T.on("session-log-append",_=>{let f=_;if(f&&typeof f.attempt_id=="string")try{_e.append(f.attempt_id,f.event)}catch{}}),T.on("snapshot",_=>{let f=_,p=f&&typeof f.id=="string"?f.id:"",$=p?Z.getStore(p):null;if($&&f&&f.type==="snapshot")try{$.applyPush(f)}catch{}}),T.on("upsert",_=>{let f=_,p=f&&typeof f.id=="string"?f.id:"",$=p?Z.getStore(p):null;if($&&f&&f.type==="upsert")try{$.applyPush(f)}catch{}}),T.on("delete",_=>{let f=_,p=f&&typeof f.id=="string"?f.id:"",$=p?Z.getStore(p):null;if($&&f&&f.type==="delete")try{$.applyPush(f)}catch{}});let Te=null,F=null,M=null,de=null,qe=()=>{},D=new Promise(_=>{qe=()=>_(void 0)}),W=!1,I=!1;async function he(_){let f=re(_);if(f===F||f===M)return;M=f;let p=`detail:${_}`,$={type:"issue-detail",params:{id:_}};try{Z.register(p,$)}catch(O){t("register detail store failed: %o",O)}try{let O=await G.subscribeList(p,$);if(we.getState().selected_id!==_||re(_)!==f){await O().catch(()=>{});return}Te&&await Te().catch(()=>{}),Te=O,F=f}catch(O){t("detail subscribe failed: %o",O),ie(O,"issue details")}finally{M===f&&(M=null)}}let $e=new Map,Ce=new Set,ze={board:0,worker:0},st=kt;try{let _=window.localStorage.getItem(Ii);Ft(_)&&(st=_)}catch{}async function gt(_){if(!Ft(_)||_===st)return;st=_;try{window.localStorage.setItem(Ii,_)}catch{}let f=$e.get(Vt);if(!f)return;$e.delete(Vt),await f().catch(()=>{});let p=vt();try{Z.register(Vt,p)}catch($){t("register %s store failed: %o",Vt,$)}try{let $=await G.subscribeList(Vt,p);$e.set(Vt,$)}catch($){t("re-subscribe %s failed: %o",Vt,$),ie($,"board")}}let Ye=new Map,at=null,Ze=null,ee=null,ge=null;async function L(){ge=null,Ue.clear(),at=null,Ze=null,$e.clear(),Ye.clear(),ze.board+=1,ze.worker+=1;let _=we.getState().workspace.current?.path;if(_)try{await T.send("set-workspace",{path:_})}catch(p){t("workspace restore after reconnect failed: %o",p);return}u();let f=we.getState().view;ye(f==="board"),dt(f==="worker"),R(f==="monitor"),ot(f==="worker")}async function X(){t("clearing all subscriptions for workspace switch"),it(),Ge(),tt(),te.clear(),fe(),ne(),v(),u(),J();let _=we.getState();if(_.selected_id)try{Z.unregister(`detail:${_.selected_id}`)}catch{}let f=we.getState();ye(f.view==="board"),dt(f.view==="worker"),R(f.view==="monitor"),ot(f.view==="worker"),f.selected_id&&ve(f.selected_id)}async function V(_){t("requesting workspace switch to %s",_),I=!0;try{let f=await T.send("set-workspace",{path:_});t("workspace switch result: %o",f),f&&f.workspace&&(we.setState({workspace:{current:{path:f.workspace.root_dir,database:f.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),f.changed&&(await X(),se("Switched to "+Me(_),"success",2e3)))}catch(f){throw t("workspace switch failed: %o",f),se("Failed to switch workspace","error",3e3),f}finally{I=!1}}async function me(_){t("requesting workspace git pull for %s",_);try{let f=await T.send("git-pull-workspace",{});t("workspace git pull result: %o",f);let p=f?.status;if(p==="up_to_date"){se("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){se("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}se("Git pulled "+Me(_),"success",2e3)}catch(f){t("workspace git pull failed: %o",f);let p=f?.code,$=f?.message;if(p==="rebase_conflict"){se("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){se("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){se("Git pull skipped: another operation is running","warning",3e3);return}let O=$?`: ${$}`:"";throw se(`Git pull failed${O}`,"error",3e3),f}}async function Re(_,f){t("setting workspace visibility %s \u2192 %s",_,String(f));try{await T.send("set-workspace-visibility",{path:_,visible:f}),await Ve()}catch(p){t("workspace visibility update failed: %o",p),se("Failed to update project visibility","error",3e3)}}async function Ve(){try{let _=await T.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let f=_.workspaces.map(Q=>({path:Q.path,database:Q.database,pid:Q.pid,version:Q.version})),p=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,$=Array.isArray(_.hidden)?_.hidden.filter(Q=>typeof Q=="string"):[];we.setState({workspace:{current:p,available:f,hidden:$}});let O=window.localStorage.getItem("beads-ui.workspace");O&&(!f.some(Ne=>Ne.path===O)||$.includes(O)?window.localStorage.removeItem("beads-ui.workspace"):p&&O!==p.path&&(t("restoring saved workspace preference: %s",O),await V(O)))}}catch(_){t("failed to load workspaces: %o",_)}}T.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(we.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),Ve(),X())});let rt=!1;if(typeof T.onConnection=="function"){let _=f=>{t("ws state %s",f),f==="reconnecting"||f==="closed"?(rt=!0,se("Connection lost. Reconnecting\u2026","error",4e3)):f==="open"&&rt&&(rt=!1,se("Reconnected","success",2200),Ou(we,(p,$)=>{t(`${p}: %o`,$)}),L())};T.onConnection(_)}let ht="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(ht=_)}catch(_){t("view parse error: %o",_)}let we=Ao({config:Du(),view:ht});T.on("worker-queue-snapshot",_=>{let f=_;if(!f||!f.queue)return;let p=we.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&f.root_dir!==p){t("dropping worker-queue snapshot for %s",String(f.root_dir));return}try{te.set(f.queue)}catch{}});let lt=xo(we);lt.start();let Xe=new Set(["get-comments"]),Qe=async(_,f)=>{try{return await C(_,f)}catch(p){if(Xe.has(_))throw p;return[]}};n&&li(n,we,lt);let be=document.getElementById("workspace-picker");be&&ki(be,we,V,me,Re);let Se=pi(e,(_,f)=>C(_,f));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>Se.open())}catch{}let xt=qa(e,{policyStore:Ue,transport:(_,f)=>C(_,f),labelOptions:()=>{let _=new Set;for(let[f]of Os)for(let p of Z.snapshotFor(f)||[]){let $=p.labels;if(Array.isArray($))for(let O of $)typeof O=="string"&&O.length>0&&_.add(O)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>xt.open())}catch{}let Mt=Mo(o,{gotoIssue:_=>lt.gotoIssue(_),issueStores:Z,transport:Qe,uiOrderStore:pe,displayPolicyStore:Ue,closedRange:st,onClosedRangeChange:_=>{gt(_)},onNewIssue:()=>Se.open()}),ut=Is(a,{transport:Qe,issueStores:Z,queueStore:te,sessionLogStore:_e,uiOrderStore:pe,gotoIssue:_=>we.setState({selected_id:_}),getWorkspacePath:()=>we.getState().workspace.current?.path}),Ee=ii(c,{transport:Qe,pipelineStore:ke,gotoIssue:_=>lt.gotoIssue(_),getWorkspacePath:()=>we.getState().workspace.current?.path,switchWorkspace:_=>V(_)}),y=Pa(i,{issueStores:Z,transport:Qe,queueStore:te,sessionLogStore:_e,getWorkspacePath:()=>we.getState().workspace.current?.path,onNavigate:_=>{we.getState().view==="worker"?we.setState({selected_id:_}):lt.gotoIssue(_)},onClose:()=>{let _=we.getState();we.setState({selected_id:null});try{lt.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}}}),U=we.getState().selected_id;U&&(i.hidden=!1,y.load(U),ve(U)),we.subscribe(_=>{let f=_.selected_id;f?(i.hidden=!1,y.load(f),I||ve(f)):(y.clear(),i.hidden=!0,J())});let q=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",c.hidden=_.view!=="monitor",ye(_.view==="board"),dt(_.view==="worker"),R(_.view==="monitor"),ot(_.view==="worker"),!_.selected_id&&_.view==="board"&&Mt.load(),_.view==="worker"&&ut.load(),_.view==="monitor"?Ee.load():Ee.pause(),window.localStorage.setItem("beads-ui.view",_.view)};we.subscribe(q),q(we.getState()),ne(),u(),Ve().finally(()=>{W=!0,qe()}),window.addEventListener("keydown",_=>{let f=_.ctrlKey||_.metaKey,p=String(_.key||"").toLowerCase(),$=_.target,O=$&&$.tagName?String($.tagName).toLowerCase():"",Q=O==="input"||O==="textarea"||O==="select"||$&&typeof $.isContentEditable=="boolean"&&$.isContentEditable;f&&p==="n"&&(Q||(_.preventDefault(),Se.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Mu(t)});export{Mu as bootstrap,Du as readBootstrapConfig,Ou as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
