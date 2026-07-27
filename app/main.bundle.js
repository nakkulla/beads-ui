var zo=Object.create;var Lr=Object.defineProperty;var Uo=Object.getOwnPropertyDescriptor;var Ho=Object.getOwnPropertyNames;var Wo=Object.getPrototypeOf,Go=Object.prototype.hasOwnProperty;var jo=(t,e,r)=>e in t?Lr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Ir=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Yo=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Ho(e))!Go.call(t,s)&&s!==r&&Lr(t,s,{get:()=>e[s],enumerable:!(n=Uo(e,s))||n.enumerable});return t};var Vo=(t,e,r)=>(r=t!=null?zo(Wo(t)):{},Yo(e||!t||!t.__esModule?Lr(r,"default",{value:t,enumerable:!0}):r,t));var de=(t,e,r)=>jo(t,typeof e!="symbol"?e+"":e,r);var Jn=Ir((Il,Qn)=>{var Lt=1e3,It=Lt*60,Dt=It*60,$t=Dt*24,Jo=$t*7,ei=$t*365.25;Qn.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ti(t);if(r==="number"&&isFinite(t))return e.long?ni(t):ri(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ti(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ei;case"weeks":case"week":case"w":return r*Jo;case"days":case"day":case"d":return r*$t;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Dt;case"minutes":case"minute":case"mins":case"min":case"m":return r*It;case"seconds":case"second":case"secs":case"sec":case"s":return r*Lt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ri(t){var e=Math.abs(t);return e>=$t?Math.round(t/$t)+"d":e>=Dt?Math.round(t/Dt)+"h":e>=It?Math.round(t/It)+"m":e>=Lt?Math.round(t/Lt)+"s":t+"ms"}function ni(t){var e=Math.abs(t);return e>=$t?ar(t,e,$t,"day"):e>=Dt?ar(t,e,Dt,"hour"):e>=It?ar(t,e,It,"minute"):e>=Lt?ar(t,e,Lt,"second"):t+" ms"}function ar(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ts=Ir((Dl,es)=>{function si(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=Jn(),r.destroy=c,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let m=0;for(let b=0;b<p.length;b++)m=(m<<5)-m+p.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=e;function r(p){let m,b=null,x,k;function I(...F){if(!I.enabled)return;let B=I,W=Number(new Date),G=W-(m||W);B.diff=G,B.prev=m,B.curr=W,m=W,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(S,v)=>{if(S==="%%")return"%";N++;let f=r.formatters[v];if(typeof f=="function"){let L=F[N];S=f.call(B,L),F.splice(N,1),N--}return S}),r.formatArgs.call(B,F),(B.log||r.log).apply(B,F)}return I.namespace=p,I.useColors=r.useColors(),I.color=r.selectColor(p),I.extend=n,I.destroy=r.destroy,Object.defineProperty(I,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(x!==r.namespaces&&(x=r.namespaces,k=r.enabled(p)),k),set:F=>{b=F}}),typeof r.init=="function"&&r.init(I),I}function n(p,m){let b=r(this.namespace+(typeof m>"u"?":":m)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let m=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,m){let b=0,x=0,k=-1,I=0;for(;b<p.length;)if(x<m.length&&(m[x]===p[b]||m[x]==="*"))m[x]==="*"?(k=x,I=b,x++):(b++,x++);else if(k!==-1)x=k+1,I++,b=I;else return!1;for(;x<m.length&&m[x]==="*";)x++;return x===m.length}function i(){let p=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),p}function l(p){for(let m of r.skips)if(o(p,m))return!1;for(let m of r.names)if(o(p,m))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}es.exports=si});var rs=Ir((Ye,lr)=>{Ye.formatArgs=ii;Ye.save=ai;Ye.load=li;Ye.useColors=oi;Ye.storage=ci();Ye.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ye.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function oi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ii(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+lr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ye.log=console.debug||console.log||(()=>{});function ai(t){try{t?Ye.storage.setItem("debug",t):Ye.storage.removeItem("debug")}catch{}}function li(){let t;try{t=Ye.storage.getItem("debug")||Ye.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function ci(){try{return localStorage}catch{}}lr.exports=ts()(Ye);var{formatters:di}=lr.exports;di.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var qt=globalThis,or=qt.trustedTypes,Fn=or?or.createPolicy("lit-html",{createHTML:t=>t}):void 0,Wn="$lit$",ft=`lit$${Math.random().toFixed(9).slice(2)}$`,Gn="?"+ft,Ko=`<${Gn}>`,kt=document,zt=()=>kt.createComment(""),Ut=t=>t===null||typeof t!="object"&&typeof t!="function",Br=Array.isArray,Zo=t=>Br(t)||typeof t?.[Symbol.iterator]=="function",Dr=`[ 	
\f\r]`,Bt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bn=/-->/g,qn=/>/g,wt=RegExp(`>|${Dr}(?:([^\\s"'>=/]+)(${Dr}*=${Dr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zn=/'/g,Un=/"/g,jn=/^(?:script|style|textarea|title)$/i,qr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),u=qr(1),Al=qr(2),Tl=qr(3),vt=Symbol.for("lit-noChange"),xe=Symbol.for("lit-nothing"),Hn=new WeakMap,yt=kt.createTreeWalker(kt,129);function Yn(t,e){if(!Br(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fn!==void 0?Fn.createHTML(e):e}var Xo=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Bt;for(let l=0;l<r;l++){let a=t[l],c,p,m=-1,b=0;for(;b<a.length&&(i.lastIndex=b,p=i.exec(a),p!==null);)b=i.lastIndex,i===Bt?p[1]==="!--"?i=Bn:p[1]!==void 0?i=qn:p[2]!==void 0?(jn.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=wt):p[3]!==void 0&&(i=wt):i===wt?p[0]===">"?(i=s??Bt,m=-1):p[1]===void 0?m=-2:(m=i.lastIndex-p[2].length,c=p[1],i=p[3]===void 0?wt:p[3]==='"'?Un:zn):i===Un||i===zn?i=wt:i===Bn||i===qn?i=Bt:(i=wt,s=void 0);let x=i===wt&&t[l+1].startsWith("/>")?" ":"";o+=i===Bt?a+Ko:m>=0?(n.push(c),a.slice(0,m)+Wn+a.slice(m)+ft+x):a+ft+(m===-2?l:x)}return[Yn(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Ht=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,p]=Xo(e,r);if(this.el=t.createElement(c,n),yt.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=yt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Wn)){let b=p[i++],x=s.getAttribute(m).split(ft),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:k[2],strings:x,ctor:k[1]==="."?Mr:k[1]==="?"?Nr:k[1]==="@"?Pr:Rt}),s.removeAttribute(m)}else m.startsWith(ft)&&(a.push({type:6,index:o}),s.removeAttribute(m));if(jn.test(s.tagName)){let m=s.textContent.split(ft),b=m.length-1;if(b>0){s.textContent=or?or.emptyScript:"";for(let x=0;x<b;x++)s.append(m[x],zt()),yt.nextNode(),a.push({type:2,index:++o});s.append(m[b],zt())}}}else if(s.nodeType===8)if(s.data===Gn)a.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(ft,m+1))!==-1;)a.push({type:7,index:o}),m+=ft.length-1}o++}}static createElement(e,r){let n=kt.createElement("template");return n.innerHTML=e,n}};function Ct(t,e,r=t,n){if(e===vt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Ut(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Ct(t,s._$AS(t,e.values),s,n)),e}var Or=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??kt).importNode(r,!0);yt.currentNode=s;let o=yt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Wt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Fr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=yt.nextNode(),i++)}return yt.currentNode=kt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Wt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=xe,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ct(this,e,r),Ut(e)?e===xe||e==null||e===""?(this._$AH!==xe&&this._$AR(),this._$AH=xe):e!==this._$AH&&e!==vt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Zo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==xe&&Ut(this._$AH)?this._$AA.nextSibling.data=e:this.T(kt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ht.createElement(Yn(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Or(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Hn.get(e.strings);return r===void 0&&Hn.set(e.strings,r=new Ht(e)),r}k(e){Br(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(zt()),this.O(zt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Rt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=xe,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=xe}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Ct(this,e,r,0),i=!Ut(e)||e!==this._$AH&&e!==vt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Ct(this,l[n+a],r,a),c===vt&&(c=this._$AH[a]),i||(i=!Ut(c)||c!==this._$AH[a]),c===xe?e=xe:e!==xe&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Mr=class extends Rt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===xe?void 0:e}},Nr=class extends Rt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==xe)}},Pr=class extends Rt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Ct(this,e,r,0)??xe)===vt)return;let n=this._$AH,s=e===xe&&n!==xe||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==xe&&(n===xe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Fr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ct(this,e)}};var Qo=qt.litHtmlPolyfillSupport;Qo?.(Ht,Wt),(qt.litHtmlVersions??(qt.litHtmlVersions=[])).push("3.3.1");var ce=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Wt(e.insertBefore(zt(),o),o,void 0,r??{})}return s._$AI(t),s};var ir="today",Vn=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function zr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Kn(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function Zn(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Xn(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ns=Vo(rs(),1);function ye(t){return(0,ns.default)(`beads-ui:${t}`)}function nt(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Gt(t,e){let r=nt(t.created_at),n=nt(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function is(t,e){let r=nt(t.created_at),n=nt(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function as(t,e){let r=nt(t.updated_at),n=nt(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ls(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=nt(t.created_at),o=nt(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function cs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var ui=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ss(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function os(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=ui.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ds(t,e){let r=ss(t),n=ss(e);if(r!==n)return r<n?-1:1;let s=os(t),o=os(e);if(s!==o)return s<o?-1:1;let i=nt(t&&t.created_at),l=nt(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Ur=2**20;function Ot(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-nt(t&&t.created_at)}function cr(t){return(e,r)=>{let n=Ot(e,t),s=Ot(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Hr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Ot(l,r)-Ur};if(!l)return{rank:Ot(i,r)+Ur};let a=Ot(i,r),c=Ot(l,r),p=(a+c)/2;return a<p&&p<c?{rank:p}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*Ur}))}}function Wr(t,e={}){let r=ye(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Gt;function c(){for(let b of Array.from(i))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function m(b){if(l||!b||b.id!==t)return;let x=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,x),!(x<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(x<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let I of k)I&&typeof I.id=="string"&&I.id.length>0&&n.set(I.id,I);p(),o=x,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let I=n.get(k.id);if(!I)n.set(k.id,k);else{let F=Number.isFinite(I.updated_at)?I.updated_at:0,B=Number.isFinite(k.updated_at)?k.updated_at:0;if(F<=B){for(let W of Object.keys(I))W in k||delete I[W];for(let[W,G]of Object.entries(k))I[W]=G}}p()}o=x,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),p()),o=x,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function dr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function us(t){let e=ye("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let p=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let x of Array.from(c)){let k=r.get(x);if(!k)continue;let I=k.itemsById;for(let F of p)typeof F=="string"&&F.length>0&&I.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&I.set(F,!0);for(let F of b)typeof F=="string"&&F.length>0&&I.delete(F)}}async function o(l,a){let c=dr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==c){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let p=n.get(c);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let b=r.get(l)||null;if(b){let x=n.get(b.key);x&&(x.delete(l),x.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:dr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let p of a.itemsById.keys())c[p]=!0;return c}}}}function ps(){let t=ye("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,p){let m=c?dr(c):"",b=r.get(a)||"",x=e.has(a);if(t("register %s key=%s (prev=%s)",a,m,b),x&&b&&m&&b!==m){let k=e.get(a);if(k)try{k.dispose()}catch{}let I=s.get(a);if(I){try{I()}catch{}s.delete(a)}let F=Wr(a,p);e.set(a,F);let B=F.subscribe(()=>o());s.set(a,B)}else if(!x){let k=Wr(a,p);e.set(a,k);let I=k.subscribe(()=>o());s.set(a,I)}return r.set(a,m),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function fs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function hs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Gr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function pi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function fi(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function ms(t){let e=ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):pi(n),i=fi(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Gr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Gr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var hi=Object.freeze({workspace_config:{default_workspace:null}});function gs(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:hi.workspace_config.default_workspace}}}function _s(t={}){let e=ye("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:gs(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?gs(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,p)=>c!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,p)=>c===r.worker.show_closed_children[p])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function bs(t){let e=ye("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(m,b)=>{let x=s++,k=Date.now();n.set(x,{type:m,start_ts:k}),e("request start id=%d type=%s count=%d",x,m,r+1),i();let I=!1,F=()=>{I||(I=!0,n.delete(x),l())},B=setTimeout(()=>{I||(e("request TIMEOUT id=%d type=%s elapsed=%dms",x,m,Date.now()-k),F())},3e4);try{let W=await c(m,b),G=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",x,m,G),W}catch(W){let G=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",x,m,G,W),W}finally{clearTimeout(B),F()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([p,m])=>({id:p,type:m.type,elapsed_ms:c-m.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function ur(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(cs),a;switch(l){case"created_desc":return a.sort(Gt),a;case"created_asc":return a.sort(is),a;case"updated_desc":return a.sort(as),a;case"priority":return a.sort(ls),a;case"manual":default:{let c=r();return c?a.sort(cr(c)):a.sort(Gt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function pr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},p=n(Hr(l,a,c.order),i);s(c,p);let m=await e("ui-order-set",{expected_revision:c.revision,entries:p});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let x=n(Hr(l,a,b.order),i);s(b,x);let k=await e("ui-order-set",{expected_revision:b.revision,entries:x});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function fr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function jr(t,e){return!e||typeof t!="string"||t.length===0||fr(e.visible_labels).includes(t)?!0:fr(e.hidden_labels).includes(t)?!1:!fr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function ws(t,e){return fr(t).filter(r=>jr(r,e))}function xt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function Yr(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function ht(t){let e=Yr(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Vr(t,e){let r=Yr(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var mi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},gi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},_i={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},bi={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function wi(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function yi(t,e,r){let n=mi[t]||t,s=e&&e.state||"empty",o=bi[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return u`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${gi[t]||t}
      </div>
    </div>
  `}function hr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=_i[r],s=t.stages,o=wi(n,s,String(e||"open"));return u`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>yi(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function ki(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var ys=2;function vi(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(u`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,ys).join(", "),s=r.length-ys,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(u`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function $i(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&xt(r,"route")){let o=n.route_source==="derived";s.push(u`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&xt(r,"fast_track")&&s.push(u`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&xt(r,"pr")){let o=n.pr.number;s.push(u`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of ws(t.labels,r))s.push(u`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&xt(r,"from")&&s.push(u`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),xt(r,"blocked")&&s.push(...vi(t.blocked_info)),s.length===0?"":u`<div class="board-card__chips">${s}</div>`}function xi(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Si(t){let e=Vr(t.created_at),r=Vr(t.updated_at);return!e&&!r?"":u`<span class="board-card__times">
    ${e?u`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ht(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?u`<span class="board-card__time-sep">·</span>`:""}
    ${r?u`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ht(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Ai(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(ds):r.children;return u`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?u`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:u`<span class="board-card__roll-none">children 없음</span>`}
        ${Si(t)}
      </div>
      ${n>0&&r.current?u`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?u`<div class="board-card__roll-list">
            ${o.map((i,l)=>u`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${xi(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ks(t,e){let r=ki(t.priority);return u`
    <article
      class="board-card"
      data-issue-id=${t.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${n=>e.onCardClick(n,t.id)}
      @dragstart=${n=>e.onDragStart(n,t.id)}
      @dragend=${e.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${t.id} \uBCF5\uC0AC`}
          @click=${n=>e.onCopyId(n,t.id)}
        >
          ${t.id}
        </button>
        ${r?u`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${$i(t,e)}
      ${t.workflow&&xt(e.policy||null,"stepper")?hr(t.workflow,t.status):""}
      ${Ai(t,e)}
    </article>
  `}function St(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return u`
    <section class=${n?"board-column board-column--closed":"board-column"} id=${t.id}>
      <header
        class="board-column__header"
        id=${t.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${t.title}</span>
          <span class="board-column__count" aria-label=${`${r}\uAC74`}
            >${r}</span
          >
        </div>
        ${n?u`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${Vn.map(o=>u`<option
                    value=${o.value}
                    ?selected=${o.value===t.closed_range}
                  >
                    ${o.label}
                  </option>`)}
            </select>`:""}
      </header>
      <div
        class="board-column__body"
        role="list"
        aria-labelledby=${t.id+"-header"}
      >
        ${t.items.map(o=>ks(o,e))}
      </div>
    </section>
  `}var Ti=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ei=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ci=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ri(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return u`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${n>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${r.label_menu_open?"true":"false"}
        @click=${e.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${r.label_menu_open?u`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?u`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>u`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?u`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function vs(t,e,r){return u`
    <div class="board-filter">
      <input
        class="board-filter__search"
        type="search"
        placeholder="ID·제목 검색"
        aria-label="이슈 검색"
        .value=${t.search}
        @input=${e.onSearchInput}
      />
      <select
        class="board-filter__select"
        aria-label="우선순위 필터"
        @change=${e.onPriorityChange}
      >
        ${Ti.map(n=>u`<option
              value=${n.value}
              ?selected=${t.priority===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${e.onTypeChange}
      >
        ${Ei.map(n=>u`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ri(t,e,r)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${r.show_deferred?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-pressed=${r.show_deferred?"true":"false"}
        @click=${e.onDeferredToggle}
      >
        Deferred ${r.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${e.onSortChange}
      >
        ${Ci.map(n=>u`<option
              value=${n.value}
              ?selected=${r.sort_mode===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      <button
        type="button"
        class="board-filter__new"
        @click=${e.onNewIssue}
      >
        + 새 이슈
      </button>
    </div>
  `}var Li=200,Ii={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Di=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),$s="beads-ui.board.sort",xs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Oi(){try{let t=window.localStorage.getItem($s);if(t&&xs.has(t))return t}catch{}return"created_desc"}function Ss(t,e){let r=ye("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,p=e.closedRange||ir,m=s?ur(s,i):null,b=pr({transport:o,uiOrderStore:i}),x=[],k=[],I=[],F=[],B=[],W=[],G=!1,N=0,T=Oi(),S=new Map,v=new Map,f=new Map,L=new Set,M={search:"",priority:"",type:"",labels:[]},H=!1,X=null;function Le($){return String($.status||"open")==="open"}function Pe($){let C=String($.status||"open");return C==="open"||C==="blocked"}function Ee($){let C=M.search.trim().toLowerCase(),Q=M.priority,Z=M.type,P=M.labels;return $.filter(_=>{if(C){let R=String(_.id||"").toLowerCase(),E=String(_.title||"").toLowerCase();if(!R.includes(C)&&!E.includes(C))return!1}if(Q!==""&&String(_.priority)!==Q||Z!==""&&String(_.issue_type||"")!==Z)return!1;if(P.length>0){let R=Array.isArray(_.labels)?_.labels:[];if(!P.some(E=>R.includes(E)))return!1}return!0})}function Ve(){let $=new Set;for(let C of[x,k,I,F,B,W])for(let Q of C){let Z=Array.isArray(Q.labels)?Q.labels:[];for(let P of Z)typeof P=="string"&&P.length>0&&$.add(P)}return Array.from($).sort()}function Ue(){return M.search.trim()!==""||M.priority!==""||M.type!==""||M.labels.length>0}function ke(){try{if(m){let $=m.selectBoardColumn("tab:board:in-progress","in_progress",T),C=m.selectBoardColumn("tab:board:blocked","blocked",T).filter(Pe),Q=new Set($.map(U=>U.id)),Z=m.selectBoardColumn("tab:board:ready","ready",T).filter(U=>Le(U)&&!Q.has(U.id)),P=m.selectBoardColumn("tab:board:resolved","resolved",T),_=m.selectBoardColumn("tab:board:deferred","deferred",T),R=G?_:[],E=m.selectBoardColumn("tab:board:closed","closed").slice(0,Li),D=[...C,...Z,...$,...P,...R,...E];Ae(D);let ee=new Set;for(let U of D)U&&U.id&&!Kr(U)&&ee.add(U.id);let ae=!Ue();x=ae?Mt(C,ee):C,k=ae?Mt(Z,ee):Z,I=ae?Mt($,ee):$,F=ae?Mt(P,ee):P,B=ae?Mt(R,ee):R,N=_.length,W=ae?Mt(E,ee):E,S=new Map;for(let U of x)S.set(U.id,"open");for(let U of k)S.set(U.id,"open");for(let U of I)S.set(U.id,"in_progress");for(let U of F)S.set(U.id,"resolved");for(let U of B)S.set(U.id,"deferred");for(let U of W)S.set(U.id,"closed");v=new Map;for(let U of x)v.set(U.id,"blocked-col");for(let U of k)v.set(U.id,"ready-col");for(let U of I)v.set(U.id,"in-progress-col");for(let U of F)v.set(U.id,"resolved-col");for(let U of B)v.set(U.id,"deferred-col");for(let U of W)v.set(U.id,"closed-col")}we()}catch{x=[],k=[],I=[],F=[],B=[],W=[],f=new Map,we()}}function Ae($){let C=new Map;for(let Z of $)Z&&Z.id&&!C.has(Z.id)&&C.set(Z.id,Z);let Q=new Map;for(let Z of C.values()){let P=Kr(Z);if(!P)continue;let _=Q.get(P);_||(_=[],Q.set(P,_)),_.push({id:Z.id,title:Z.title,status:Z.status,metadata:Z.metadata,created_at:Z.created_at})}f=Q}function Ke($){let C=f.get($)||[],Q=0,Z=null;for(let P of C)(P.status==="resolved"||P.status==="closed")&&(Q+=1),!Z&&P.status==="in_progress"&&(Z=P);return{total:C.length,count:Q,current:Z,children:C}}function ue($){return!L.has($)}function at($,C){$.preventDefault(),$.stopPropagation(),L.has(C)?L.delete(C):L.add(C),we()}function pe($,C){$.preventDefault(),$.stopPropagation(),n(C)}function Ze($,C){$.preventDefault(),$.stopPropagation(),n(C)}function oe($,C){X||n(C)}function _e($,C){$.preventDefault(),$.stopPropagation(),Mi(C).then(Q=>{Q&&J("\uBCF5\uC0AC\uB428","success",1200)})}function Xe($,C){X=C,$.dataTransfer&&($.dataTransfer.setData("text/plain",C),$.dataTransfer.effectAllowed="move"),$.target.classList.add("board-card--dragging")}function Te($){$.target.classList.remove("board-card--dragging"),be(),setTimeout(()=>{X=null},0)}function Ce($){let C=String($.target.value||"");!C||C===p||(p=C,a&&a(C),we())}let ve={onCardClick:oe,onCopyId:_e,onDragStart:Xe,onDragEnd:Te,onClosedRangeChange:Ce,rollupFor:Ke,isExpanded:ue,onRollupToggle:at,onChildClick:pe,onFromChipClick:Ze,get policy(){return l?l.get():null}};function Oe($){let C=$.target,Q=t.querySelector(".board-filter__labels");C&&Q&&Q.contains(C)||Me()}function He($){$.key==="Escape"&&Me()}function Re(){H||(H=!0,document.addEventListener("mousedown",Oe),document.addEventListener("keydown",He),we())}function Me(){H&&(H=!1,document.removeEventListener("mousedown",Oe),document.removeEventListener("keydown",He),we())}let Ie={onSearchInput($){M.search=String($.target.value||""),ke()},onPriorityChange($){M.priority=String($.target.value||""),ke()},onTypeChange($){M.type=String($.target.value||""),ke()},onSortChange($){let C=String($.target.value||"");if(!(!xs.has(C)||C===T)){T=C;try{window.localStorage.setItem($s,C)}catch{}ke()}},onDeferredToggle(){G=!G,ke()},onLabelMenuToggle(){H?Me():Re()},onLabelToggle($){let C=M.labels.indexOf($);C===-1?M.labels.push($):M.labels.splice(C,1),ke()},onLabelClear(){M.labels.length!==0&&(M.labels=[],ke())},onNewIssue(){c&&c()}};function We(){let $=G?"board-root board-root--deferred":"board-root";return u`
      <div class="board-view">
        ${vs(M,Ie,{sort_mode:T,show_deferred:G,deferred_count:N,label_options:Ve(),label_menu_open:H})}
        <div class=${$}>
          ${St({title:"Blocked",id:"blocked-col",items:Ee(x)},ve)}
          ${St({title:"Ready",id:"ready-col",items:Ee(k)},ve)}
          ${St({title:"In progress",id:"in-progress-col",items:Ee(I)},ve)}
          ${St({title:"Resolved",id:"resolved-col",items:Ee(F)},ve)}
          ${G?St({title:"Deferred",id:"deferred-col",items:Ee(B)},ve):""}
          ${St({title:"Closed",id:"closed-col",items:Ee(W),is_closed:!0,closed_range:p},ve)}
        </div>
      </div>
    `}function we(){ce(We(),t),w()}function w(){try{let $=Array.from(t.querySelectorAll(".board-column"));for(let C of $)Array.from(C.querySelectorAll(".board-card")).forEach((Z,P)=>{Z.tabIndex=P===0?0:-1})}catch{}}async function y($,C){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:$,status:C}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Q){r("update-status failed: %o",Q),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function q($){switch($){case"blocked-col":return x;case"ready-col":return k;case"in-progress-col":return I;case"resolved-col":return F;case"deferred-col":return B;default:return[]}}function re($,C,Q){if(!o||!i)return;let Z=q($),P=Z.find(ee=>ee.id===C);if(!P)return;let _=Z.filter(ee=>ee.id!==C),R=Q.closest?Q.closest(".board-card"):null,E=_.length;if(R){let ee=R.getAttribute("data-issue-id");if(ee===C)return;let ae=_.findIndex(U=>U.id===ee);ae>=0&&(E=ae)}let D=_.slice();D.splice(E,0,P),b.applyReorder(C,D,E)}function be(){for(let $ of Array.from(t.querySelectorAll(".board-column--drag-over")))$.classList.remove("board-column--drag-over")}let ne=null;t.addEventListener("dragover",$=>{$.preventDefault(),$.dataTransfer&&($.dataTransfer.dropEffect="move");let Q=$.target.closest(".board-column");Q&&Q!==ne&&(ne&&ne.classList.remove("board-column--drag-over"),Q.classList.add("board-column--drag-over"),ne=Q)}),t.addEventListener("dragleave",$=>{let C=$.relatedTarget;(!C||!t.contains(C))&&ne&&(ne.classList.remove("board-column--drag-over"),ne=null)}),t.addEventListener("drop",$=>{$.preventDefault(),ne&&(ne.classList.remove("board-column--drag-over"),ne=null);let C=$.target,Q=C.closest(".board-column");if(!Q)return;let Z=$.dataTransfer?.getData("text/plain")||"";if(!Z)return;let P=Q.id,_=v.get(Z);if(_&&_===P){if(Di.has(P)){if(T!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}re(P,Z,C)}return}let R=Ii[P];if(!R){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}S.get(Z)!==R&&y(Z,R)}),t.addEventListener("keydown",$=>{let C=$.target;if(!(C instanceof HTMLElement))return;let Q=String(C.tagName||"").toLowerCase();if(Q==="input"||Q==="textarea"||Q==="select"||Q==="button"||Q==="a"||C.isContentEditable===!0)return;let Z=C.closest(".board-card");if(!Z)return;let P=String($.key||"");if(P==="Enter"||P===" "){$.preventDefault();let D=Z.getAttribute("data-issue-id");D&&n(D);return}if(P!=="ArrowUp"&&P!=="ArrowDown"&&P!=="ArrowLeft"&&P!=="ArrowRight")return;$.preventDefault();let _=Z.closest(".board-column");if(!_)return;let R=Array.from(_.querySelectorAll(".board-card")),E=R.indexOf(Z);if(P==="ArrowDown"&&E<R.length-1){ie(Z,R[E+1]);return}if(P==="ArrowUp"&&E>0){ie(Z,R[E-1]);return}if(P==="ArrowLeft"||P==="ArrowRight"){let D=Array.from(t.querySelectorAll(".board-column")),ee=D.indexOf(_),ae=P==="ArrowRight"?1:-1,U=ee+ae;for(;U>=0&&U<D.length;){let $e=D[U].querySelector(".board-card");if($e){ie(Z,$e);return}U+=ae}}});function ie($,C){try{$.tabIndex=-1,C.tabIndex=0,C.focus()}catch{}}let fe=null;m&&m.subscribe&&(fe=m.subscribe(()=>{try{ke()}catch{}}));let he=null;return l&&l.subscribe&&(he=l.subscribe(()=>{try{ke()}catch{}})),{async load(){r("load"),ke()},clear(){Me(),fe&&(fe(),fe=null),he&&(he(),he=null),t.replaceChildren(),x=[],k=[],I=[],F=[],B=[],W=[],S=new Map,v=new Map}}}function Kr(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Mt(t,e){return t.filter(r=>{let n=Kr(r);return!(n&&e.has(n))})}async function Mi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Nt(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ni={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Pi=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Fi=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function mt(t){return!!t&&typeof t=="object"}function Zr(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function As(t,e){let r=Zr(t),n=Zr(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Bi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>mt(s)&&typeof s.text=="string"?s.text:"").join(""):mt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function qi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Ni[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=Zr(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=As(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=As(mt(l)?l.old_string:"",mt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ts(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Pi.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:Fi.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function zi(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(mt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Ts(o.text));else if(o.type==="tool_use"){let i=qi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(mt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Bi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Ui(t){if(t.type==="item.completed"&&mt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Ts(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Hi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Es(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!mt(o))continue;let i=Hi(o)?Ui(o):zi(o,r);for(let l of i)e.push(l)}return e}function mr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function p(){if(!o||!n)return[];let v=n.get(o);return Es(v?v.lines:[])}function m(v,f){if(f.kind==="gate")return u`<div class="sv__gate">${f.text}</div>`;if(f.kind==="phase")return u`<div class="sv__phase">${f.text}</div>`;if(f.kind==="result")return u`<div
        class="sv__result${f.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${f.success?"\u2713":"\u2717"}
        ${f.text||(f.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(f.kind==="error")return u`<div class="sv__error">⛔ ${f.text}</div>`;if(f.kind==="blocker")return u`<div class="sv__error">⛔ ${f.text}</div>`;if(f.kind==="tool"){let L=a.has(v),M=f.tool==="Bash"?f.command:f.path||f.command||"";return u`<div
        class="sv__tool${L?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>F(v)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${f.icon}</span>
          <span class="sv__tool-name">${f.tool}</span>
          ${M?u`<span class="sv__tool-detail">${M}</span>`:""}
          ${typeof f.added=="number"?u`<span class="sv__diff-add">+${f.added}</span>`:""}
          ${typeof f.removed=="number"?u`<span class="sv__diff-del">−${f.removed}</span>`:""}
          ${f.result?u`<span class="sv__tool-ok">→ ${f.result}</span>`:""}
        </span>
        ${L?u`<pre class="sv__tool-expand">${b(f)}</pre>`:""}
      </div>`}return u`<div class="sv__as">${f.text}</div>`}function b(v){let f=[];if(v.input!==void 0)try{f.push(`input: ${JSON.stringify(v.input,null,2)}`)}catch{}return typeof v.output=="string"&&v.output.length>0&&f.push(`output:
${v.output}`),f.join(`

`)}function x(){if(!o)return u``;let v=p(),f=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),L=i.session_id||"",M=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return u`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${L?u`<button
              type="button"
              class="sv__session"
              title=${L}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${L}`}
              @click=${()=>W(L)}
            >
              ⧉ ${L.slice(0,8)}
            </button>`:""}
        ${f?u`<span class="sv__meta">${f}</span>`:""}
        ${i.worktree?u`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${M}
          @click=${B}
        >
          <span class="sv__follow-full">⇣ ${M}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>S()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${v.length===0?u`<div class="sv__empty">세션 로그 없음</div>`:v.map((H,X)=>m(X,H))}
      </div>
    </div>`}function k(){ce(x(),t),l&&I()}function I(){let v=t.querySelector(".sv__body");v&&(v.scrollTop=v.scrollHeight)}function F(v){a.has(v)?a.delete(v):a.add(v),k()}function B(){l=!l,k()}function W(v){Nt(v).then(f=>{f?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function G(v){!o||!v||(i={...i,...v},k())}function N(v){let f=v.target;if(!f||!f.classList||!f.classList.contains("sv__body"))return;!(f.scrollHeight-f.scrollTop-f.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",N,!0);function T(v){let f=v&&v.attempt_id;f&&(o=f,i=v.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function S(){let v=o;o=null,a.clear(),r&&v&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${v}`})).catch(()=>{}),ce(u``,t),s&&s()}return{open:T,updateMeta:G,close:S,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",N,!0),o=null,ce(u``,t)}}}function Wi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Cs(t,e){let r=Wi(t);return u`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?u`<div class="detail-empty">산출물 없음</div>`:u`
          ${r.map(n=>u`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${n.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>e.onCopyPath(s,n.path)}
                >
                  ${n.path}
                </button>
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>e.onOpenDoc(s,n.path)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var Xr=["opus","sonnet","haiku","fable"],Qr=["low","medium","high","xhigh"],Jr=["codex","opus","fable","self","skip"],en=["opus","fable","sonnet","haiku"],Gi=["standard","fast_track"],tn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function gr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:tn[t]||"(\uAE30\uBCF8)"}function jt(t,e,r,n,s,o){return u`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>u`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Yt(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Rs(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return u`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${jt("orchestration_model","orchestration_model",Yt(Xr,gr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${jt("orchestration_effort","orchestration_effort",Yt(Qr,gr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${jt("review_model","review_model",Yt(Jr,gr("review_model",s)),n.review_model||"",!1,e)}
    ${jt("impl_model","impl_model",Yt(en,gr("impl_model",s)),n.impl_model||"",!1,e)}
    ${jt("workflow_mode","workflow_mode",Yt(Gi),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:Bs,setPrototypeOf:Ls,isFrozen:ji,getPrototypeOf:Yi,getOwnPropertyDescriptor:Vi}=Object,{freeze:Be,seal:et,create:cn}=Object,{apply:dn,construct:un}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});et||(et=function(e){return e});dn||(dn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});un||(un=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var _r=qe(Array.prototype.forEach),Ki=qe(Array.prototype.lastIndexOf),Is=qe(Array.prototype.pop),Vt=qe(Array.prototype.push),Zi=qe(Array.prototype.splice),wr=qe(String.prototype.toLowerCase),rn=qe(String.prototype.toString),nn=qe(String.prototype.match),Kt=qe(String.prototype.replace),Xi=qe(String.prototype.indexOf),Qi=qe(String.prototype.trim),st=qe(Object.prototype.hasOwnProperty),Fe=qe(RegExp.prototype.test),Zt=Ji(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return dn(t,e,n)}}function Ji(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return un(t,r)}}function te(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:wr;Ls&&Ls(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(ji(e)||(e[n]=o),s=o)}t[s]=!0}return t}function ea(t){for(let e=0;e<t.length;e++)st(t,e)||(t[e]=null);return t}function ut(t){let e=cn(null);for(let[r,n]of Bs(t))st(t,r)&&(Array.isArray(n)?e[r]=ea(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ut(n):e[r]=n);return e}function Xt(t,e){for(;t!==null;){let n=Vi(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=Yi(t)}function r(){return null}return r}var Ds=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),sn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),on=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ta=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),an=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),ra=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Os=Be(["#text"]),Ms=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ln=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ns=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),br=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),na=et(/\{\{[\w\W]*|[\w\W]*\}\}/gm),sa=et(/<%[\w\W]*|[\w\W]*%>/gm),oa=et(/\$\{[\w\W]*/gm),ia=et(/^data-[\-\w.\u00B7-\uFFFF]+$/),aa=et(/^aria-[\-\w]+$/),qs=et(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),la=et(/^(?:\w+script|data):/i),ca=et(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),zs=et(/^html$/i),da=et(/^[a-z][.\w]*(-[.\w]+)+$/i),Ps=Object.freeze({__proto__:null,ARIA_ATTR:aa,ATTR_WHITESPACE:ca,CUSTOM_ELEMENT:da,DATA_ATTR:ia,DOCTYPE_NAME:zs,ERB_EXPR:sa,IS_ALLOWED_URI:qs,IS_SCRIPT_OR_DATA:la,MUSTACHE_EXPR:na,TMPLIT_EXPR:oa}),Qt={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ua=function(){return typeof window>"u"?null:window},pa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Fs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Us(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ua(),e=K=>Us(K);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==Qt.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:x}=t,k=a.prototype,I=Xt(k,"cloneNode"),F=Xt(k,"remove"),B=Xt(k,"nextSibling"),W=Xt(k,"childNodes"),G=Xt(k,"parentNode");if(typeof i=="function"){let K=r.createElement("template");K.content&&K.content.ownerDocument&&(r=K.content.ownerDocument)}let N,T="",{implementation:S,createNodeIterator:v,createDocumentFragment:f,getElementsByTagName:L}=r,{importNode:M}=n,H=Fs();e.isSupported=typeof Bs=="function"&&typeof G=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:X,ERB_EXPR:Le,TMPLIT_EXPR:Pe,DATA_ATTR:Ee,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Ue,ATTR_WHITESPACE:ke,CUSTOM_ELEMENT:Ae}=Ps,{IS_ALLOWED_URI:Ke}=Ps,ue=null,at=te({},[...Ds,...sn,...on,...an,...Os]),pe=null,Ze=te({},[...Ms,...ln,...Ns,...br]),oe=Object.seal(cn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),_e=null,Xe=null,Te=Object.seal(cn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ce=!0,ve=!0,Oe=!1,He=!0,Re=!1,Me=!0,Ie=!1,We=!1,we=!1,w=!1,y=!1,q=!1,re=!0,be=!1,ne="user-content-",ie=!0,fe=!1,he={},$=null,C=te({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Q=null,Z=te({},["audio","video","img","source","image","track"]),P=null,_=te({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),R="http://www.w3.org/1998/Math/MathML",E="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml",ee=D,ae=!1,U=null,$e=te({},[R,E,D],rn),lt=te({},["mi","mo","mn","ms","mtext"]),tt=te({},["annotation-xml"]),Ge=te({},["title","style","font","a","script"]),Je=null,_t=["application/xhtml+xml","text/html"],Ft="text/html",h=null,g=null,Y=r.createElement("form"),j=function(d){return d instanceof RegExp||d instanceof Function},A=function(){let d=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(g&&g===d)){if((!d||typeof d!="object")&&(d={}),d=ut(d),Je=_t.indexOf(d.PARSER_MEDIA_TYPE)===-1?Ft:d.PARSER_MEDIA_TYPE,h=Je==="application/xhtml+xml"?rn:wr,ue=st(d,"ALLOWED_TAGS")?te({},d.ALLOWED_TAGS,h):at,pe=st(d,"ALLOWED_ATTR")?te({},d.ALLOWED_ATTR,h):Ze,U=st(d,"ALLOWED_NAMESPACES")?te({},d.ALLOWED_NAMESPACES,rn):$e,P=st(d,"ADD_URI_SAFE_ATTR")?te(ut(_),d.ADD_URI_SAFE_ATTR,h):_,Q=st(d,"ADD_DATA_URI_TAGS")?te(ut(Z),d.ADD_DATA_URI_TAGS,h):Z,$=st(d,"FORBID_CONTENTS")?te({},d.FORBID_CONTENTS,h):C,_e=st(d,"FORBID_TAGS")?te({},d.FORBID_TAGS,h):ut({}),Xe=st(d,"FORBID_ATTR")?te({},d.FORBID_ATTR,h):ut({}),he=st(d,"USE_PROFILES")?d.USE_PROFILES:!1,Ce=d.ALLOW_ARIA_ATTR!==!1,ve=d.ALLOW_DATA_ATTR!==!1,Oe=d.ALLOW_UNKNOWN_PROTOCOLS||!1,He=d.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=d.SAFE_FOR_TEMPLATES||!1,Me=d.SAFE_FOR_XML!==!1,Ie=d.WHOLE_DOCUMENT||!1,w=d.RETURN_DOM||!1,y=d.RETURN_DOM_FRAGMENT||!1,q=d.RETURN_TRUSTED_TYPE||!1,we=d.FORCE_BODY||!1,re=d.SANITIZE_DOM!==!1,be=d.SANITIZE_NAMED_PROPS||!1,ie=d.KEEP_CONTENT!==!1,fe=d.IN_PLACE||!1,Ke=d.ALLOWED_URI_REGEXP||qs,ee=d.NAMESPACE||D,lt=d.MATHML_TEXT_INTEGRATION_POINTS||lt,tt=d.HTML_INTEGRATION_POINTS||tt,oe=d.CUSTOM_ELEMENT_HANDLING||{},d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(oe.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&j(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(oe.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(oe.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(ve=!1),y&&(w=!0),he&&(ue=te({},Os),pe=[],he.html===!0&&(te(ue,Ds),te(pe,Ms)),he.svg===!0&&(te(ue,sn),te(pe,ln),te(pe,br)),he.svgFilters===!0&&(te(ue,on),te(pe,ln),te(pe,br)),he.mathMl===!0&&(te(ue,an),te(pe,Ns),te(pe,br))),d.ADD_TAGS&&(typeof d.ADD_TAGS=="function"?Te.tagCheck=d.ADD_TAGS:(ue===at&&(ue=ut(ue)),te(ue,d.ADD_TAGS,h))),d.ADD_ATTR&&(typeof d.ADD_ATTR=="function"?Te.attributeCheck=d.ADD_ATTR:(pe===Ze&&(pe=ut(pe)),te(pe,d.ADD_ATTR,h))),d.ADD_URI_SAFE_ATTR&&te(P,d.ADD_URI_SAFE_ATTR,h),d.FORBID_CONTENTS&&($===C&&($=ut($)),te($,d.FORBID_CONTENTS,h)),ie&&(ue["#text"]=!0),Ie&&te(ue,["html","head","body"]),ue.table&&(te(ue,["tbody"]),delete _e.tbody),d.TRUSTED_TYPES_POLICY){if(typeof d.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof d.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zt('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=d.TRUSTED_TYPES_POLICY,T=N.createHTML("")}else N===void 0&&(N=pa(x,s)),N!==null&&typeof T=="string"&&(T=N.createHTML(""));Be&&Be(d),g=d}},V=te({},[...sn,...on,...ta]),me=te({},[...an,...ra]),rt=function(d){let O=G(d);(!O||!O.tagName)&&(O={namespaceURI:ee,tagName:"template"});let z=wr(d.tagName),ge=wr(O.tagName);return U[d.namespaceURI]?d.namespaceURI===E?O.namespaceURI===D?z==="svg":O.namespaceURI===R?z==="svg"&&(ge==="annotation-xml"||lt[ge]):!!V[z]:d.namespaceURI===R?O.namespaceURI===D?z==="math":O.namespaceURI===E?z==="math"&&tt[ge]:!!me[z]:d.namespaceURI===D?O.namespaceURI===E&&!tt[ge]||O.namespaceURI===R&&!lt[ge]?!1:!me[z]&&(Ge[z]||!V[z]):!!(Je==="application/xhtml+xml"&&U[d.namespaceURI]):!1},Qe=function(d){Vt(e.removed,{element:d});try{G(d).removeChild(d)}catch{F(d)}},bt=function(d,O){try{Vt(e.removed,{attribute:O.getAttributeNode(d),from:O})}catch{Vt(e.removed,{attribute:null,from:O})}if(O.removeAttribute(d),d==="is")if(w||y)try{Qe(O)}catch{}else try{O.setAttribute(d,"")}catch{}},Cn=function(d){let O=null,z=null;if(we)d="<remove></remove>"+d;else{let Se=nn(d,/^[\r\n\t ]+/);z=Se&&Se[0]}Je==="application/xhtml+xml"&&ee===D&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");let ge=N?N.createHTML(d):d;if(ee===D)try{O=new b().parseFromString(ge,Je)}catch{}if(!O||!O.documentElement){O=S.createDocument(ee,"template",null);try{O.documentElement.innerHTML=ae?T:ge}catch{}}let Ne=O.body||O.documentElement;return d&&z&&Ne.insertBefore(r.createTextNode(z),Ne.childNodes[0]||null),ee===D?L.call(O,Ie?"html":"body")[0]:Ie?O.documentElement:Ne},Rn=function(d){return v.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Cr=function(d){return d instanceof m&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof p)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function"||typeof d.hasChildNodes!="function")},Ln=function(d){return typeof l=="function"&&d instanceof l};function ct(K,d,O){_r(K,z=>{z.call(e,d,O,g)})}let In=function(d){let O=null;if(ct(H.beforeSanitizeElements,d,null),Cr(d))return Qe(d),!0;let z=h(d.nodeName);if(ct(H.uponSanitizeElement,d,{tagName:z,allowedTags:ue}),Me&&d.hasChildNodes()&&!Ln(d.firstElementChild)&&Fe(/<[/\w!]/g,d.innerHTML)&&Fe(/<[/\w!]/g,d.textContent)||d.nodeType===Qt.progressingInstruction||Me&&d.nodeType===Qt.comment&&Fe(/<[/\w]/g,d.data))return Qe(d),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(z))&&(!ue[z]||_e[z])){if(!_e[z]&&On(z)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z)))return!1;if(ie&&!$[z]){let ge=G(d)||d.parentNode,Ne=W(d)||d.childNodes;if(Ne&&ge){let Se=Ne.length;for(let je=Se-1;je>=0;--je){let dt=I(Ne[je],!0);dt.__removalCount=(d.__removalCount||0)+1,ge.insertBefore(dt,B(d))}}}return Qe(d),!0}return d instanceof a&&!rt(d)||(z==="noscript"||z==="noembed"||z==="noframes")&&Fe(/<\/no(script|embed|frames)/i,d.innerHTML)?(Qe(d),!0):(Re&&d.nodeType===Qt.text&&(O=d.textContent,_r([X,Le,Pe],ge=>{O=Kt(O,ge," ")}),d.textContent!==O&&(Vt(e.removed,{element:d.cloneNode()}),d.textContent=O)),ct(H.afterSanitizeElements,d,null),!1)},Dn=function(d,O,z){if(re&&(O==="id"||O==="name")&&(z in r||z in Y))return!1;if(!(ve&&!Xe[O]&&Fe(Ee,O))){if(!(Ce&&Fe(Ve,O))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(O,d))){if(!pe[O]||Xe[O]){if(!(On(d)&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,d)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(d))&&(oe.attributeNameCheck instanceof RegExp&&Fe(oe.attributeNameCheck,O)||oe.attributeNameCheck instanceof Function&&oe.attributeNameCheck(O,d))||O==="is"&&oe.allowCustomizedBuiltInElements&&(oe.tagNameCheck instanceof RegExp&&Fe(oe.tagNameCheck,z)||oe.tagNameCheck instanceof Function&&oe.tagNameCheck(z))))return!1}else if(!P[O]){if(!Fe(Ke,Kt(z,ke,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&d!=="script"&&Xi(z,"data:")===0&&Q[d])){if(!(Oe&&!Fe(Ue,Kt(z,ke,"")))){if(z)return!1}}}}}}}return!0},On=function(d){return d!=="annotation-xml"&&nn(d,Ae)},Mn=function(d){ct(H.beforeSanitizeAttributes,d,null);let{attributes:O}=d;if(!O||Cr(d))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},ge=O.length;for(;ge--;){let Ne=O[ge],{name:Se,namespaceURI:je,value:dt}=Ne,Et=h(Se),Rr=dt,De=Se==="value"?Rr:Qi(Rr);if(z.attrName=Et,z.attrValue=De,z.keepAttr=!0,z.forceKeepAttr=void 0,ct(H.uponSanitizeAttribute,d,z),De=z.attrValue,be&&(Et==="id"||Et==="name")&&(bt(Se,d),De=ne+De),Me&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,De)){bt(Se,d);continue}if(Et==="attributename"&&nn(De,"href")){bt(Se,d);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){bt(Se,d);continue}if(!He&&Fe(/\/>/i,De)){bt(Se,d);continue}Re&&_r([X,Le,Pe],Pn=>{De=Kt(De,Pn," ")});let Nn=h(d.nodeName);if(!Dn(Nn,Et,De)){bt(Se,d);continue}if(N&&typeof x=="object"&&typeof x.getAttributeType=="function"&&!je)switch(x.getAttributeType(Nn,Et)){case"TrustedHTML":{De=N.createHTML(De);break}case"TrustedScriptURL":{De=N.createScriptURL(De);break}}if(De!==Rr)try{je?d.setAttributeNS(je,Se,De):d.setAttribute(Se,De),Cr(d)?Qe(d):Is(e.removed)}catch{bt(Se,d)}}ct(H.afterSanitizeAttributes,d,null)},qo=function K(d){let O=null,z=Rn(d);for(ct(H.beforeSanitizeShadowDOM,d,null);O=z.nextNode();)ct(H.uponSanitizeShadowNode,O,null),In(O),Mn(O),O.content instanceof o&&K(O.content);ct(H.afterSanitizeShadowDOM,d,null)};return e.sanitize=function(K){let d=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,z=null,ge=null,Ne=null;if(ae=!K,ae&&(K="<!-->"),typeof K!="string"&&!Ln(K))if(typeof K.toString=="function"){if(K=K.toString(),typeof K!="string")throw Zt("dirty is not a string, aborting")}else throw Zt("toString is not a function");if(!e.isSupported)return K;if(We||A(d),e.removed=[],typeof K=="string"&&(fe=!1),fe){if(K.nodeName){let dt=h(K.nodeName);if(!ue[dt]||_e[dt])throw Zt("root node is forbidden and cannot be sanitized in-place")}}else if(K instanceof l)O=Cn("<!---->"),z=O.ownerDocument.importNode(K,!0),z.nodeType===Qt.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?O=z:O.appendChild(z);else{if(!w&&!Re&&!Ie&&K.indexOf("<")===-1)return N&&q?N.createHTML(K):K;if(O=Cn(K),!O)return w?null:q?T:""}O&&we&&Qe(O.firstChild);let Se=Rn(fe?K:O);for(;ge=Se.nextNode();)In(ge),Mn(ge),ge.content instanceof o&&qo(ge.content);if(fe)return K;if(w){if(y)for(Ne=f.call(O.ownerDocument);O.firstChild;)Ne.appendChild(O.firstChild);else Ne=O;return(pe.shadowroot||pe.shadowrootmode)&&(Ne=M.call(n,Ne,!0)),Ne}let je=Ie?O.outerHTML:O.innerHTML;return Ie&&ue["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&Fe(zs,O.ownerDocument.doctype.name)&&(je="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+je),Re&&_r([X,Le,Pe],dt=>{je=Kt(je,dt," ")}),N&&q?N.createHTML(je):je},e.setConfig=function(){let K=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};A(K),We=!0},e.clearConfig=function(){g=null,We=!1},e.isValidAttribute=function(K,d,O){g||A({});let z=h(K),ge=h(d);return Dn(z,ge,O)},e.addHook=function(K,d){typeof d=="function"&&Vt(H[K],d)},e.removeHook=function(K,d){if(d!==void 0){let O=Ki(H[K],d);return O===-1?void 0:Zi(H[K],O,1)[0]}return Is(H[K])},e.removeHooks=function(K){H[K]=[]},e.removeAllHooks=function(){H=Fs()},e}var Hs=Us();var Ws={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Gs=t=>(...e)=>({_$litDirective$:t,values:e}),yr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var Jt=class extends yr{constructor(e){if(super(e),this.it=xe,e.type!==Ws.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===xe||e==null)return this._t=void 0,this.it=e;if(e===vt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Jt.directiveName="unsafeHTML",Jt.resultType=1;var js=Gs(Jt);function mn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Tt=mn();function Js(t){Tt=t}var nr={exec:()=>null};function se(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(ze.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var fa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),ze={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},ha=/^(?:[ \t]*(?:\n|$))+/,ma=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ga=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,sr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_a=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,gn=/(?:[*+-]|\d{1,9}[.)])/,eo=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,to=se(eo).replace(/bull/g,gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ba=se(eo).replace(/bull/g,gn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),_n=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,wa=/^[^\n]+/,bn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ya=se(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",bn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ka=se(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,gn).getRegex(),Ar="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",wn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,va=se("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",wn).replace("tag",Ar).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ro=se(_n).replace("hr",sr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ar).getRegex(),$a=se(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ro).getRegex(),yn={blockquote:$a,code:ma,def:ya,fences:ga,heading:_a,hr:sr,html:va,lheading:to,list:ka,newline:ha,paragraph:ro,table:nr,text:wa},Ys=se("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",sr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ar).getRegex(),xa={...yn,lheading:ba,table:Ys,paragraph:se(_n).replace("hr",sr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ys).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ar).getRegex()},Sa={...yn,html:se(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",wn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:nr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:se(_n).replace("hr",sr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",to).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Aa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ta=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,no=/^( {2,}|\\)\n(?!\s*$)/,Ea=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Tr=/[\p{P}\p{S}]/u,kn=/[\s\p{P}\p{S}]/u,so=/[^\s\p{P}\p{S}]/u,Ca=se(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,kn).getRegex(),oo=/(?!~)[\p{P}\p{S}]/u,Ra=/(?!~)[\s\p{P}\p{S}]/u,La=/(?:[^\s\p{P}\p{S}]|~)/u,Ia=se(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",fa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),io=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Da=se(io,"u").replace(/punct/g,Tr).getRegex(),Oa=se(io,"u").replace(/punct/g,oo).getRegex(),ao="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ma=se(ao,"gu").replace(/notPunctSpace/g,so).replace(/punctSpace/g,kn).replace(/punct/g,Tr).getRegex(),Na=se(ao,"gu").replace(/notPunctSpace/g,La).replace(/punctSpace/g,Ra).replace(/punct/g,oo).getRegex(),Pa=se("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,so).replace(/punctSpace/g,kn).replace(/punct/g,Tr).getRegex(),Fa=se(/\\(punct)/,"gu").replace(/punct/g,Tr).getRegex(),Ba=se(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),qa=se(wn).replace("(?:-->|$)","-->").getRegex(),za=se("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",qa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),$r=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ua=se(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",$r).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),lo=se(/^!?\[(label)\]\[(ref)\]/).replace("label",$r).replace("ref",bn).getRegex(),co=se(/^!?\[(ref)\](?:\[\])?/).replace("ref",bn).getRegex(),Ha=se("reflink|nolink(?!\\()","g").replace("reflink",lo).replace("nolink",co).getRegex(),Vs=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,vn={_backpedal:nr,anyPunctuation:Fa,autolink:Ba,blockSkip:Ia,br:no,code:Ta,del:nr,emStrongLDelim:Da,emStrongRDelimAst:Ma,emStrongRDelimUnd:Pa,escape:Aa,link:Ua,nolink:co,punctuation:Ca,reflink:lo,reflinkSearch:Ha,tag:za,text:Ea,url:nr},Wa={...vn,link:se(/^!?\[(label)\]\((.*?)\)/).replace("label",$r).getRegex(),reflink:se(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",$r).getRegex()},pn={...vn,emStrongRDelimAst:Na,emStrongLDelim:Oa,url:se(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Vs).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:se(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Vs).getRegex()},Ga={...pn,br:se(no).replace("{2,}","*").getRegex(),text:se(pn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},kr={normal:yn,gfm:xa,pedantic:Sa},er={normal:vn,gfm:pn,breaks:Ga,pedantic:Wa},ja={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ks=t=>ja[t];function pt(t,e){if(e){if(ze.escapeTest.test(t))return t.replace(ze.escapeReplace,Ks)}else if(ze.escapeTestNoEncode.test(t))return t.replace(ze.escapeReplaceNoEncode,Ks);return t}function Zs(t){try{t=encodeURI(t).replace(ze.percentDecode,"%")}catch{return null}return t}function Xs(t,e){let r=t.replace(ze.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(ze.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(ze.slashPipe,"|");return n}function tr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Ya(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Qs(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Va(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var xr=class{constructor(t){de(this,"options");de(this,"rules");de(this,"lexer");this.options=t||Tt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:tr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Va(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=tr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:tr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=tr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let x=b,k=x.raw+`
`+r.join(`
`),I=this.blockquote(k);o[o.length-1]=I,n=n.substring(0,n.length-x.raw.length)+I.raw,s=s.substring(0,s.length-x.text.length)+I.text;break}else if(b?.type==="list"){let x=b,k=x.raw+`
`+r.join(`
`),I=this.list(k);o[o.length-1]=I,n=n.substring(0,n.length-b.raw.length)+I.raw,s=s.substring(0,s.length-x.raw.length)+I.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",p="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,I=>" ".repeat(3*I.length)),b=t.split(`
`,1)[0],x=!m.trim(),k=0;if(this.options.pedantic?(k=2,p=m.trimStart()):x?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=m.slice(k),k+=e[1].length),x&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let I=this.rules.other.nextBulletRegex(k),F=this.rules.other.hrRegex(k),B=this.rules.other.fencesBeginRegex(k),W=this.rules.other.headingBeginRegex(k),G=this.rules.other.htmlBeginRegex(k);for(;t;){let N=t.split(`
`,1)[0],T;if(b=N,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),T=b):T=b.replace(this.rules.other.tabCharGlobal,"    "),B.test(b)||W.test(b)||G.test(b)||I.test(b)||F.test(b))break;if(T.search(this.rules.other.nonSpaceChar)>=k||!b.trim())p+=`
`+T.slice(k);else{if(x||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(m)||W.test(m)||F.test(m))break;p+=`
`+b}!x&&!b.trim()&&(x=!0),c+=N+`
`,t=t.substring(N.length+1),m=T.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let c=a.tokens.filter(m=>m.type==="space"),p=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Xs(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Xs(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=tr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ya(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Qs(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Qs(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,m=t.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let x=m.slice(1,-1);return{type:"em",raw:m,text:x,tokens:this.lexer.inlineTokens(x)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ot=class fn{constructor(e){de(this,"tokens");de(this,"options");de(this,"state");de(this,"inlineQueue");de(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Tt,this.options.tokenizer=this.options.tokenizer||new xr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:ze,block:kr.normal,inline:er.normal};this.options.pedantic?(r.block=kr.pedantic,r.inline=er.pedantic):this.options.gfm&&(r.block=kr.gfm,this.options.breaks?r.inline=er.breaks:r.inline=er.gfm),this.tokenizer.rules=r}static get rules(){return{block:kr,inline:er}}static lex(e,r){return new fn(r).lex(e)}static lexInline(e,r){return new fn(r).inlineTokens(e)}lex(e){e=e.replace(ze.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(ze.tabCharGlobal,"    ").replace(ze.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="paragraph"||i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.raw,this.inlineQueue.at(-1).src=i.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),r.push(s);continue}let o=e;if(this.options.extensions?.startBlock){let i=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(i=Math.min(i,a))}),i<1/0&&i>=0&&(o=e.substring(0,i+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let i=r.at(-1);n&&i?.type==="paragraph"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s),n=o.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let i=r.at(-1);i?.type==="text"?(i.raw+=(i.raw.endsWith(`
`)?"":`
`)+s.raw,i.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,m=e.slice(1),b;this.options.extensions.startInline.forEach(x=>{b=x.call({lexer:this},m),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Sr=class{constructor(t){de(this,"options");de(this,"parser");this.options=t||Tt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(ze.notSpaceStart)?.[0],s=t.replace(ze.endingNewline,"")+`
`;return n?'<pre><code class="language-'+pt(n)+'">'+(r?s:pt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:pt(s,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,n="";for(let i=0;i<t.items.length;i++){let l=t.items[i];n+=this.listitem(l)}let s=e?"ol":"ul",o=e&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
`+n+"</"+s+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let s=0;s<t.header.length;s++)r+=this.tablecell(t.header[s]);e+=this.tablerow({text:r});let n="";for(let s=0;s<t.rows.length;s++){let o=t.rows[s];r="";for(let i=0;i<o.length;i++)r+=this.tablecell(o[i]);n+=this.tablerow({text:r})}return n&&(n=`<tbody>${n}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+n+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${pt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=Zs(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+pt(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Zs(t);if(s===null)return pt(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${pt(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:pt(t.text)}},$n=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},it=class hn{constructor(e){de(this,"options");de(this,"renderer");de(this,"textRenderer");this.options=e||Tt,this.options.renderer=this.options.renderer||new Sr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new $n}static parse(e,r){return new hn(r).parse(e)}static parseInline(e,r){return new hn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},vr,rr=(vr=class{constructor(t){de(this,"options");de(this,"block");this.options=t||Tt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ot.lex:ot.lexInline}provideParser(){return this.block?it.parse:it.parseInline}},de(vr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),de(vr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),vr),Ka=class{constructor(...t){de(this,"defaults",mn());de(this,"options",this.setOptions);de(this,"parse",this.parseMarkdown(!0));de(this,"parseInline",this.parseMarkdown(!1));de(this,"Parser",it);de(this,"Renderer",Sr);de(this,"TextRenderer",$n);de(this,"Lexer",ot);de(this,"Tokenizer",xr);de(this,"Hooks",rr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Sr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new xr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new rr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];rr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&rr.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,c);return a.call(s,m)})();let p=l.call(s,c);return a.call(s,p)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,c);return m===!1&&(m=await a.apply(s,c)),m})();let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ot.lex(t,e??this.defaults)}parser(t,e){return it.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?ot.lex:ot.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?it.parse:it.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?ot.lex:ot.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?it.parse:it.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+pt(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},At=new Ka;function le(t,e){return At.parse(t,e)}le.options=le.setOptions=function(t){return At.setOptions(t),le.defaults=At.defaults,Js(le.defaults),le};le.getDefaults=mn;le.defaults=Tt;le.use=function(...t){return At.use(...t),le.defaults=At.defaults,Js(le.defaults),le};le.walkTokens=function(t,e){return At.walkTokens(t,e)};le.parseInline=At.parseInline;le.Parser=it;le.parser=it.parse;le.Renderer=Sr;le.TextRenderer=$n;le.Lexer=ot;le.lexer=ot.lex;le.Tokenizer=xr;le.Hooks=rr;le.parse=le;var Yc=le.options,Vc=le.setOptions,Kc=le.use,Zc=le.walkTokens,Xc=le.parseInline;var Qc=it.parse,Jc=ot.lex;function uo(t){let e=le.parse(t),r=Hs.sanitize(e);return js(r)}function Za(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function po(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?u`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Za(s)}</span
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
            ${o==="loading"?u`<div class="mv__status">불러오는 중…</div>`:o==="error"?u`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:uo(i)}
          </div>
        </div>
      </div>
    `:u``}function p(){ce(c(),t)}async function m(k){s=k,o="loading",i="",l="",p();let I=r?r():"";if(!I){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let F="/api/doc?workspace="+encodeURIComponent(I)+"&path="+encodeURIComponent(k);try{let B=await n(F),W=await B.json().catch(()=>({}));if(!B.ok||!W||W.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(W&&W.error||B.status)+")",p();return}i=String(W.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,ce(u``,t)}function x(){document.removeEventListener("keydown",a),b()}return{open:m,close:b,destroy:x}}var Xa={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Qa(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function fo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return u`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,c=n.has(i.attempt_id),p=a&&!c,m=a?c?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return u`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!p}
      title=${m}
      @click=${b=>{b.stopPropagation(),p&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,c=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return u`<div class="detail-session__cause" title=${c}>
      ${i.cause}
    </div>`};return u`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>u`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${i.status||"unknown"}"
              data-attempt-id=${i.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(i.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Xa[i.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${i.attempt_id}</span>
              ${i.resumed_from?u`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?u`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Qa(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var Ja=["open","in_progress","deferred","resolved","closed"],el=[0,1,2,3,4];function ho(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,p={},m=!1,b=!1,x="",k="",I="";function F(){m=!1,b=!1,x="",k="",I=""}let B=document.createElement("div");B.className="md-viewer-root",document.body.appendChild(B);let W=po(B,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),G=document.createElement("div");G.className="session-log-root",document.body.appendChild(G);let N=mr(G,{transport:s?(_,R)=>Promise.resolve(s(_,R)):void 0,sessionLogStore:l});function T(){if(!i||!a)return[];let _=i.get();return(_&&_.attempts?Object.values(_.attempts):[]).filter(E=>E&&E.bead_id===a).sort((E,D)=>(D.started_at||0)-(E.started_at||0)).map(E=>({attempt_id:E.attempt_id,bead_id:E.bead_id,status:E.status,started_at:typeof E.started_at=="number"?E.started_at:null,runner:E.runner||null,model:E.model||null,session_id:E.session_id||null,resumed_from:E.resumed_from||null,dismissed_at:typeof E.dismissed_at=="number"?E.dismissed_at:null,cause:typeof E.cause=="string"?E.cause:null,cause_detail:E.cause_detail||null}))}function S(_){let R=i?i.get():null,E=R&&R.attempts?R.attempts[_]:null;N.open({attempt_id:_,meta:E?{runner:E.runner||void 0,model:E.model||void 0,effort:E.effort||void 0,status:E.status||void 0,session_id:E.session_id||void 0}:{}})}async function v(_){if(!s||!_)return;let R=()=>{let D=i?i.get():null;return D&&typeof D.revision=="number"?D.revision:0},E=await s("worker-attempt-resume",{attempt_id:_,expected_revision:R()});if(E&&E.conflict){let D=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:R();E=await s("worker-attempt-resume",{attempt_id:_,expected_revision:D})}E&&E.resumed===!1&&!E.conflict&&E.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${E.reason}`,"error",2400)}let f={onOpen:S,onResume:v};function L(){let _=i?i.get():null,R=_&&_.exec_defaults;return R&&typeof R=="object"?R:{}}let M=null;r&&r.subscribe&&(M=r.subscribe(()=>Le()));let H=null;i&&typeof i.subscribe=="function"&&(H=i.subscribe(()=>{a&&P()}));function X(_){_.key==="Escape"&&a&&(_.preventDefault(),n())}document.addEventListener("keydown",X);function Le(){if(a){if(r&&typeof r.snapshotFor=="function"){let _=r.snapshotFor("detail:"+a)||[];c=_.find(E=>E&&E.id===a)||_[0]||c}P()}}function Pe(_){Nt(_).then(R=>{R?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Ee(_){_.preventDefault(),_.stopPropagation(),a&&Pe(a)}function Ve(_,R){_.preventDefault(),_.stopPropagation(),Pe(R)}function Ue(_,R){_.preventDefault(),_.stopPropagation(),W.open(R)}function ke(_,R){p[_]=R,P(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:_,value:R})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ae(_,R,E){if(!s||!a)return!1;try{let D=await Promise.resolve(s(_,R)),ee=Array.isArray(D)?D[0]:D;return ee&&typeof ee=="object"&&ee.id?(c=ee,!0):(J(E,"error"),!1)}catch{return J(E,"error"),!1}}function Ke(_){setTimeout(()=>{try{let R=t.querySelector(_);R&&typeof R.focus=="function"&&R.focus()}catch{}},0)}function ue(){m=!0,x=c&&c.title||"",P(),Ke('.detail-edit__input[data-edit="title"]')}function at(_){x=_.target.value}function pe(){m=!1,x="",P()}function Ze(){Ae("edit-text",{id:a,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(m=!1,x=""),P()})}function oe(){b=!0,k=c&&c.description||"",P(),Ke('.detail-edit__textarea[data-edit="description"]')}function _e(_){k=_.target.value}function Xe(){b=!1,k="",P()}function Te(){Ae("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(b=!1,k=""),P()})}function Ce(_,R,E,D){if(_.key==="Escape"){_.stopPropagation(),E();return}_.key==="Enter"&&(!D||_.ctrlKey||_.metaKey)&&(_.preventDefault(),R())}function ve(_){let R=_.target.value;Ae("update-status",{id:a,status:R},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function Oe(_){let R=Number(_.target.value);Ae("update-priority",{id:a,priority:R},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>P())}function He(_){I=_.target.value}function Re(){let _=I.trim();_.length!==0&&Ae("label-add",{id:a,label:_},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(R=>{R&&(I=""),P()})}function Me(_){if(_.key==="Escape"){_.stopPropagation(),I="",P();return}_.key==="Enter"&&(_.preventDefault(),Re())}function Ie(_){Ae("label-remove",{id:a,label:_},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>P())}let We={onCopyPath:Ve,onOpenDoc:Ue},we={onChange:ke};function w(_){return typeof _=="string"?_:_&&typeof _=="object"?String(_.id||_.to||_.issue_id||_.depends_on||""):""}function y(_){switch(_&&typeof _=="object"?String(_.dependency_type||_.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function q(_){let E=(Array.isArray(_.dependencies)?_.dependencies:[]).map(D=>({id:w(D),icon:y(D)})).filter(D=>D.id.length>0);return u`
      <div class="detail-section-label">의존성</div>
      ${E.length===0?u`<div class="detail-empty">의존성 없음</div>`:u`<div class="detail-deps">
            ${E.map(D=>o?u`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(D.id)}
                  >
                    ${D.icon?`${D.icon} `:""}${D.id}
                  </button>`:u`<span class="detail-dep"
                    >${D.icon?`${D.icon} `:""}${D.id}</span
                  >`)}
          </div>`}
    `}function re(_){let R=_.metadata||{},E=_.workflow||{},D=E.stages||{},ee=D.spec&&D.spec.stale,ae=D.impl&&D.impl.stale,U=E.route_source==="derived",$e=E.route||R.route||"\u2014";return u`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${U?" detail-kv__v--derived":""}"
          title=${U?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${U&&E.route?`${$e} ? (\uCD94\uB860)`:$e}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${R.spec_review||"\uC5C6\uC74C"}${ee?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${R.impl_review||"\uC5C6\uC74C"}${ae?" \xB7 stale":""}</span
        >
      </div>
      ${R.pr_url?u`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${R.pr_url}</span>
          </div>`:""}
    `}let be={route:["spec_backed","full_plan"]};async function ne(_,R){let E=R.target.value;if(_==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&E!=="full_plan"&&!window.confirm(`full_plan \u2192 ${E||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){P();return}await Ae("update-workflow-meta",{id:a,key:_,value:E},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),P()}function ie(_){let R=_.metadata||{};return u` ${((D,ee)=>{let ae=be[D],U=typeof R[D]=="string"?R[D]:"";return u`<div class="detail-kv">
        <span class="detail-kv__k">${D}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${D}
          data-edit=${`wfmeta-${D}`}
          @change=${$e=>ne(D,$e)}
        >
          <option value="" ?selected=${!ae.includes(U)}>
            ${ee}
          </option>
          ${ae.map($e=>u`<option value=${$e} ?selected=${U===$e}>${$e}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function fe(_){return m?u`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${at}
            @keydown=${R=>Ce(R,Ze,pe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ze}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${pe}
            >
              취소
            </button>
          </div>
        </div>
      `:u`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${_}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ue}
        >
          ✎
        </button>
      </div>
    `}function he(_){let R=ht(_.created_at),E=ht(_.updated_at);return!R&&!E?u``:u`
      ${R?u`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
      ${E?u`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${E}</span>
          </div>`:""}
    `}function $(_,R){return u`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ve}
        >
          ${Ja.map(E=>u`<option value=${E} ?selected=${E===_}>${E}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Oe}
        >
          ${el.map(E=>u`<option value=${String(E)} ?selected=${E===R}>
                P${E}
              </option>`)}
        </select>
      </div>
    `}function C(_){return u`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":u`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${oe}
            >
              ✎
            </button>`}
      </div>
      ${b?u`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${k}
              @input=${_e}
              @keydown=${R=>Ce(R,Te,Xe,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Te}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Xe}
              >
                취소
              </button>
            </div>
          </div>`:u`<div class="detail-overlay__desc">
            ${_||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Q(_){let R=Array.isArray(_.labels)?_.labels:[];return u`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${R.map(E=>u`<span class="detail-label-chip"
              >${E}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${E}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+E}
                @click=${()=>Ie(E)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${I}
            @input=${He}
            @keydown=${Me}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Re}
          >
            추가
          </button>
        </span>
      </div>
    `}function Z(){if(!a)return u``;let _=c||{},R=String(_.id||a),E=_.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",D=_.status||"open",ee=typeof _.priority=="number"?Math.max(0,Math.min(4,_.priority)):"",ae=_.description||"",U={..._,metadata:{..._.metadata||{},...p}};return u`
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
            @click=${Ee}
          >
            ${R}
          </button>
          ${fe(E)} ${$(D,ee)}
          ${he(_)} ${C(ae)}
          ${Q(_)} ${q(_)}
          ${re(_)} ${ie(_)}
          ${Cs(_,We)}
          ${Rs(U,we,L())}
          ${fo(T(),f)}
        </div>
      </div>
    `}function P(){ce(Z(),t)}return{load(_){_!==a&&(p={},F()),a=_,c=null,Le()},clear(){a=null,c=null,p={},F(),W.close(),N.close(),ce(u``,t)},destroy(){M&&(M(),M=null),H&&(H(),H=null),document.removeEventListener("keydown",X),W.destroy(),B.parentNode&&B.parentNode.removeChild(B),N.destroy(),G.parentNode&&G.parentNode.removeChild(G),a=null,c=null,ce(u``,t)}}}var tl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function mo(t,e){return jr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function rl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function go(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(S){let v=r.get();if(v)try{let f=await n("display-policy-set",{expected_revision:v.revision,policy:S(v)});a(f),f&&f.conflict&&f.policy&&(f=await n("display-policy-set",{expected_revision:f.policy.revision,policy:S(f.policy)}),a(f)),f&&f.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(S){S&&S.policy&&typeof S.policy=="object"&&r.set(S.policy)}function c(S){let v=r.get();if(!v)return;let f=mo(S,v)!=="shown";l(L=>rl(S,L,f))}function p(){let S=i.trim();S.length!==0&&(i="",l(v=>v.hidden_prefixes.includes(S)?{hidden_prefixes:v.hidden_prefixes}:{hidden_prefixes:[...v.hidden_prefixes,S]}),F())}function m(S){l(v=>({hidden_prefixes:v.hidden_prefixes.filter(f=>f!==S)}))}function b(S){let v=r.get();if(!v)return;let f=v.chips[S]===!1;l(()=>({chips:{[S]:f}}))}function x(S){let v=s();return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${v.length===0?u`<div class="display-settings__empty">라벨 없음</div>`:u`<div class="display-settings__pills">
              ${v.map(f=>{let L=mo(f,S);return u`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${L}`}
                  data-label=${f}
                  data-state=${L}
                  @click=${()=>c(f)}
                >
                  ${f}
                </button>`})}
            </div>`}
      </section>
    `}function k(S){return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${S.hidden_prefixes.map(v=>u`<span class="display-settings__prefix">
                ${v}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${v} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(v)}
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
            @input=${v=>{i=String(v.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function I(S){return u`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${tl.map(([v,f])=>u`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${v}
                  .checked=${S.chips[v]!==!1}
                  @change=${()=>b(v)}
                />
                <span>${f}</span>
              </label>`)}
        </div>
      </section>
    `}function F(){let S=r.get();ce(u`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${T}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${S?u`${x(S)} ${k(S)}
                ${I(S)}`:u`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let B=!1,W=()=>{B=!1};o.addEventListener("close",W),o.addEventListener("cancel",W);let G=null;r.subscribe&&(G=r.subscribe(()=>{B&&F()}));function N(){B||(i="",B=!0,F(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function T(){B&&(B=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:N,close:T,destroy(){B=!1,o.removeEventListener("close",W),o.removeEventListener("cancel",W),G&&(G(),G=null),o.remove()}}}function _o(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,p,m="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function bo(t,e,r){let n=ye("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return u`
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
      </div>
    `}function l(){ce(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ce(u``,t)}}}var wo=["bug","feature","task","epic","chore"];function yo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ko=["Critical","High","Medium","Low","Backlog"];function vo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function x(){o.replaceChildren();let T=document.createElement("option");T.value="",T.textContent="\u2014 Select \u2014",o.appendChild(T);for(let S of wo){let v=document.createElement("option");v.value=S,v.textContent=yo(S),o.appendChild(v)}i.replaceChildren();for(let S=0;S<=4;S+=1){let v=document.createElement("option");v.value=String(S);let f=ko[S]||"Medium";v.textContent=`${S} \u2013 ${f}`,i.appendChild(v)}}x();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function I(T){s.disabled=T,o.disabled=T,i.disabled=T,l.disabled=T,a.disabled=T,p.disabled=T,m.disabled=T,m.textContent=T?"Creating\u2026":"Create"}function F(){c.textContent=""}function B(T){c.textContent=T}function W(){try{let T=window.localStorage.getItem("beads-ui.new.type");T?o.value=T:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?i.value=S:i.value="2"}catch{o.value="",i.value="2"}}function G(){let T=o.value||"",S=i.value||"";T.length>0&&window.localStorage.setItem("beads-ui.new.type",T),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function N(){F();let T=String(s.value||"").trim();if(T.length===0){B("Title is required"),s.focus();return}let S=Number(i.value||"2");if(!(S>=0&&S<=4)){B("Priority must be 0..4"),i.focus();return}let v=String(o.value||""),f=String(a.value||""),L={title:T};v.length>0&&(L.type=v),String(S).length>0&&(L.priority=S),f.length>0&&(L.description=f),I(!0);try{await e("create-issue",L)}catch{I(!1),B("Failed to create issue");return}G(),I(!1),k()}return r.addEventListener("cancel",T=>{T.preventDefault(),k()}),b.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),r.addEventListener("keydown",T=>{T.key==="Enter"&&(T.ctrlKey||T.metaKey)&&(T.preventDefault(),N())}),n.addEventListener("submit",T=>{T.preventDefault(),N()}),{open(){n.reset(),F(),W();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}function $o(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function xo(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var nl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},sl=[{key:"orchestration_model",values:()=>Xr},{key:"orchestration_effort",values:()=>Qr},{key:"review_model",values:()=>Jr},{key:"impl_model",values:()=>en}];function So(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let f=i();return typeof f.revision=="number"?f.revision:0}function a(){let f=i().exec_defaults;return f&&typeof f=="object"?f:{}}function c(f){f&&f.queue&&r&&r.set(f.queue)}async function p(f,L){if(!n)return;let M={key:f,value:L||null};try{let H=await n("worker-queue-set-exec-default",{...M,expected_revision:l()});c(H),H&&H.conflict&&(H=await n("worker-queue-set-exec-default",{...M,expected_revision:l()}),c(H)),H&&H.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function m(f,L,M){let H=!!M&&!L.includes(M);return u`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${f}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${f}`}
        data-key=${f}
        @change=${X=>{p(f,X.target.value)}}
      >
        <option value="" ?selected=${!M}>
          ${tn[f]||"(\uAE30\uBCF8)"}
        </option>
        ${H?u`<option value=${M} ?selected=${!0}>
              ${M} (비호환)
            </option>`:""}
        ${L.map(X=>u`<option value=${X} ?selected=${M===X}>${X}</option>`)}
      </select>
    </div>`}function b(){let f=i().workspace_info;return f&&typeof f=="object"?f:{}}function x(f,L){return u`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${f}"
      >${L}</span
    >`}function k(f){let L=f?xo(f.cmd):"",M=f?$o(f.timeout_ms):"",H=!!f&&f.source==="detected";return u`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${L?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${L}</span>
            ${H?x("detected","\uC790\uB3D9\uAC10\uC9C0"):x("config","config")}
            ${M?u`<span class="exec-defaults__vd-meta"
                  >timeout ${M}</span
                >`:""}
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function I(f){let L=f?xo(f.cmd):"",M=f?$o(f.timeout_ms):"",H=M?`timeout ${M} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",X=s&&s()||"<workspace \uACBD\uB85C>";return u`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${L?u`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${L}</span>
            ${x("config","config")}
            ${f.detached===!0?x("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${H}</span>
          </div>`:u`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${X}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function F(f){if(!f||typeof f!="object")return"";let L=nl[String(f.outcome)];if(!L)return"";let M=f.outcome==="failed"&&f.reason?`${L.label} \xB7 ${f.reason}`:L.label,H=[ht(f.at),typeof f.bead_id=="string"?f.bead_id:"",typeof f.base_sha=="string"?f.base_sha.slice(0,7):""].filter(X=>X.length>0).join(" \xB7 ");return u`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${x(L.modifier,M)}
        ${H?u`<span class="exec-defaults__vd-meta">${H}</span>`:""}
      </div>
    </div>`}function B(f){return u`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${k(f.verify_cmd)} ${I(f.deploy_cmd)}
      ${F(f.last_deploy)}
    </section>`}function W(){let f=a();ce(u`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${v}
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
            ${sl.map(L=>m(L.key,L.values(),f[L.key]||""))}
            ${B(b())}
          </div>
        </div>
      `,o)}let G=!1,N=()=>{G=!1};o.addEventListener("close",N),o.addEventListener("cancel",N);let T=null;r&&r.subscribe&&(T=r.subscribe(()=>{G&&W()}));function S(){G||(G=!0,W(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function v(){G&&(G=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:S,close:v,destroy(){G=!1,o.removeEventListener("close",N),o.removeEventListener("cancel",N),T&&(T(),T=null),o.remove()}}}function ol(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[];return u`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?u`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?u`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(n=>u`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${n}</span
        >`)}
    ${t.reason?u`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${t.merge_action?u`<button
          type="button"
          class="worker-mini__merge"
          data-bead-id=${t.id}
          ?disabled=${t.merge_enabled===!1}
          title=${t.merge_title||""}
        >
          머지
        </button>`:""}
    ${t.discard_action?u`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${t.id}
          title="PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음). 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요"
        >
          폐기
        </button>`:""}
  </div>`}function il(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return u`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?u`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?u`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?hr(r,t.status):""}
    ${t.reason?u`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Pt(t){return u`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
    </header>
    ${t.controls?t.controls:""}
    <div class="worker-pane__body">
      ${t.body?t.body:t.items.length===0?u`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?il(e):ol(e))}
    </div>
  </section>`}var Ao=160;function To(t){return t.length>Ao?`${t.slice(0,Ao)}\u2026`:t}function al(t){return!t||!t.reason?"":u`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?u` · <code>${To(t.command)}</code>`:""}
  </div>`}function ll(t){return t?u`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function cl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Eo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return u`<div class="worker-banners">
    ${t.failure?u`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?u`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${al(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>u`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?u`<div class="worker-banner__detail">
                <code>${To(r.detail)}</code>
              </div>`:""}
          ${ll(r.output_tail)}
        </div>`)}
  </div>`}function dl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?cl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=t.attempt_id&&t.attempt_id===r;return u`<div
    class="rtile${i?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?u`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
            >↻</span
          >`:""}
      <span class="rtile__elapsed">${s}</span>
      <button
        type="button"
        class="rtile__info"
        title="상세 보기"
        aria-label="상세 보기"
      >
        ⓘ
      </button>
      ${n?u`<button
            type="button"
            class="rtile__resume"
            title="같은 세션으로 이어서 재개"
            aria-label="재개"
          >
            ▶
          </button>`:u`<button
            type="button"
            class="rtile__pause"
            ?disabled=${t.can_pause===!1}
            title=${t.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
            aria-label="일시정지"
          >
            ⏸
          </button>`}
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${t.title}</div>
    ${o?u`<div class="rtile__meta">${o}</div>`:""}
  </div>`}function Co(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return u`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?u`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>dl(s,e,r))}
  </div>`}var ul="tab:worker:ready",pl="tab:worker:blocked",Er=1;function fl(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Ro="beads-ui.worker.candidate-filter",xn={show_blocked:!1,spec:"all"};function hl(){try{let t=window.localStorage.getItem(Ro);if(!t)return{...xn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...xn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...xn}}}function ml(t){try{window.localStorage.setItem(Ro,JSON.stringify(t))}catch{}}function gl(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var _l=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}];function bl(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function wl(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var yl=["closed_unmerged","undecidable"];function kl(t,e,r,n){let s=r[t]||null,o=s&&s.gate?s.gate:null,i=s&&s.pr?s.pr:null,l=[];o&&o.gate_badge&&l.push(o.gate_badge),o&&o.base_badge&&o.base_badge!==o.gate_badge&&l.push(o.base_badge),n&&l.push("\uC815\uB9AC \uC2E4\uD328");let a=!!o&&o.base_badge==="\uCDA9\uB3CC",c=!!o&&o.enabled===!0,p=!!n&&!!o&&o.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:i&&typeof i.number=="number"?i.number:null,pr_url:i&&typeof i.url=="string"?i.url:"",badges:l,alert:!!o&&yl.includes(o.tier)||!!n,merge_action:!0,discard_action:!n&&!(o&&o.tier==="merged"),merge_enabled:c||a||p,merge_title:p?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":a?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":c?`\uBA38\uC9C0 (${o.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:o&&o.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${o&&o.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Sn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?ur(n,i):null,p=pr({transport:r,uiOrderStore:i}),m=null,b=[],x=hl(),k=[],I=document.createElement("div");I.className="worker-console";let F=document.createElement("div"),B=document.createElement("div");B.className="worker-drawer-overlay",B.hidden=!0;let W=document.createElement("div");W.className="worker-drawer-overlay__backdrop";let G=document.createElement("div");G.className="worker-drawer-host",B.append(W,G);let N=document.createElement("div");N.className="worker-lanes-host",I.append(F,B,N),t.appendChild(I);let T=null,S=mr(G,{transport:r,sessionLogStore:o,onClose:()=>{T=null,B.hidden=!0,_e()}}),v=So(I,{queueStore:s,transport:r,getWorkspacePath:a});function f(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Er,queue:[],pr_wait:[],done:[]}}function L(){let w=f();return typeof w.revision=="number"?w.revision:0}function M(w){w&&w.queue&&s&&s.set(w.queue)}async function H(w,y){if(!r)return;let q=await r("worker-queue-place",{bead_id:w,index:y,expected_revision:L()});M(q),q&&q.conflict&&await r("worker-queue-place",{bead_id:w,index:y,expected_revision:L()}).then(M)}async function X(w,y){if(!r)return;let q=await r("worker-queue-reorder",{bead_id:w,to_index:y,expected_revision:L()});M(q),q&&q.conflict&&await r("worker-queue-reorder",{bead_id:w,to_index:y,expected_revision:L()}).then(M)}async function Le(w){if(!r)return;let y=await r("worker-queue-remove",{bead_id:w,expected_revision:L()});M(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:w,expected_revision:L()}).then(M)}async function Pe(w){!r||!w||await r("worker-attempt-stop",{attempt_id:w})}async function Ee(w){if(!r||!w)return;let y=await r("worker-attempt-pause",{attempt_id:w});y&&y.paused===!1&&y.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ve(w){if(!r||!w)return;let y=await r("worker-attempt-resume",{attempt_id:w,expected_revision:L()});M(y),y&&y.conflict&&(y=await r("worker-attempt-resume",{attempt_id:w,expected_revision:L()}),M(y)),y&&y.resumed===!1&&!y.conflict&&y.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Ue(w){if(!r||!w)return;let y=await r("worker-attempt-dismiss",{attempt_id:w,expected_revision:L()});M(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:w,expected_revision:L()}),M(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function ke(w){if(!r||!w)return;let y=await r("worker-pr-merge",{bead_id:w,expected_revision:L()});if(M(y),y&&y.conflict&&(y=await r("worker-pr-merge",{bead_id:w,expected_revision:L()}),M(y)),!(!y||y.conflict)){if(y.action==="conflict_resolution"){J(y.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${y.reason||""}`,y.ok?"success":"error",2800);return}if(y.ok){J("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}J(y.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${y.cleanup_step}): ${y.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${y.reason||""}`,"error",3200)}}async function Ae(w){if(!r||!w||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${w}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let q=await r("worker-pr-discard",{bead_id:w,expected_revision:L()});if(M(q),q&&q.conflict&&(q=await r("worker-pr-discard",{bead_id:w,expected_revision:L()}),M(q)),q&&q.discarded===!0){J("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}q&&q.discarded===!1&&!q.conflict&&J(`\uD3D0\uAE30 \uAC70\uBD80: ${q.reason||""}`,"error",2800)}async function Ke(w){if(!r)return;let y=await r("worker-queue-toggle",{on:w,expected_revision:L()});M(y),y&&y.conflict&&await r("worker-queue-toggle",{on:w,expected_revision:L()}).then(M)}async function ue(w){if(!r||!Number.isFinite(w))return;let y=Math.max(Er,Math.floor(w)),q=await r("worker-queue-set-slots",{slots:y,expected_revision:L()});M(q),q&&q.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:L()}).then(M)}function at(){let w=f(),y=c?c.selectBoardColumn(ul,"ready"):[],q=c?c.selectBoardColumn(pl,"blocked"):[],re=new Map;for(let A of[...y,...q])re.set(A.id,A.title||A.id);let be=w.pr_wait||[],ne=w.pr_observations||{},ie=w.cleanup_failed||{},fe=Object.entries(ie).map(([A,V])=>({bead_id:A,step:V&&V.step?V.step:"",reason:V&&V.reason?V.reason:"",detail:V&&typeof V.detail=="string"?V.detail:null,output_tail:V&&typeof V.output_tail=="string"&&V.output_tail?V.output_tail:void 0})),he=w.queue||[],$=new Set([...he.map(A=>A.bead_id),...be.map(A=>A.bead_id),...w.done.map(A=>A.bead_id)]),C=new Set(q.map(A=>A.id)),Q=i?i.get()?.order||{}:{},Z=new Set,P=[];for(let A of[...y,...q])$.has(A.id)||Z.has(A.id)||bl(A)||(Z.add(A.id),P.push(A));P.sort(cr(Q)),b=P;let _=w.admission||{},R=A=>{let V=_[A];if(!V)return"";let me=typeof V.reason=="string"?V.reason:"",rt=me.indexOf(":");return rt>0&&rt<me.length-1?`\u26D4 ${me.slice(0,rt)} (${me.slice(rt+1)})`:`\u26D4 ${me}`},E=P.map(A=>{let V=fl(A),me=C.has(A.id),rt=[];me&&rt.push(wl(A)),V||rt.push("spec \uC5C6\uC74C");let Qe=R(A.id);return Qe&&rt.push(Qe),{id:A.id,title:A.title||A.id,reason:rt.join(" \xB7 "),draggable:V,lane:"candidate",workflow:A.workflow,status:A.status,blocked:me,has_spec:V}}),D=gl(E,x),ee=D.visible,ae=(A,V)=>A.map(me=>({id:me.bead_id,title:re.get(me.bead_id)||me.bead_id,reason:V==="done"?"":R(me.bead_id),draggable:V!=="done",done:V==="done",lane:V})),U=w.attempts?Object.values(w.attempts):[],$e=new Set;for(let A of U)A&&typeof A.resumed_from=="string"&&A.resumed_from.length>0&&$e.add(A.resumed_from);let lt=new Map;for(let A of U)lt.set(A.bead_id,A.attempt_id);let tt=[],Ge=null;for(let A of U){let V=A.status==="paused"&&!$e.has(A.attempt_id);A.status==="running"||V?tt.push({bead_id:A.bead_id,attempt_id:A.attempt_id,title:re.get(A.bead_id)||A.bead_id,runner:A.runner||null,model:A.model||null,effort:A.effort||null,started_at:typeof A.started_at=="number"?A.started_at:null,resumed_from:A.resumed_from||null,paused:V,can_pause:typeof A.session_id=="string"&&A.session_id.length>0}):(A.status==="failed"||A.status==="orphaned")&&!(lt.get(A.bead_id)!==A.attempt_id)&&typeof A.dismissed_at!="number"&&(Ge=A)}let Je=null;if(Ge){let A=typeof Ge.session_id=="string"&&Ge.session_id.length>0,V=$e.has(Ge.attempt_id),me=Ge.cause_detail;Je={repo:Ge.repo||"",reason:Ge.cause||Ge.status,cause_detail:me&&typeof me.reason=="string"?{reason:me.reason,command:typeof me.command=="string"?me.command:null}:null,resume_attempt_id:Ge.attempt_id,resume_eligible:A&&!V,resume_reason:A?V?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let _t=new Set(tt.map(A=>A.bead_id)),h=tt.filter(A=>!A.paused).length,g=(w.workspace_info||{}).slots,Y=typeof g=="number"?g:typeof w.slots=="number"?w.slots:Er,j=h>Y;return{queue:w,idToTitle:re,candidates:ee,candidate_hidden:{blocked:D.hidden_blocked,spec:D.hidden_spec},running:tt,live_count:h,slots:Y,over_cap:j,failure:Je,waiting:ae(he.filter(A=>!_t.has(A.bead_id)),"queue"),pr_wait:be.map(A=>kl(A.bead_id,re.get(A.bead_id)||A.bead_id,ne,ie[A.bead_id]||null)),done:ae(w.done,"done"),cleanup_failures:fe}}function pe(w){let y=w.waiting.length>0?w.waiting[0].id:"\u2014";return u`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${w.queue.auto_advance?" is-active":""}"
        >
          ${w.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
        </button>
        <span class="worker-stat"
          >실행 <b>${w.live_count}</b> · 다음 <b>${y}</b></span
        >
        ${w.over_cap?u`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${Er}
            step="1"
            .value=${String(w.slots)}
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
        </button>
      </div>
      ${Eo({failure:w.failure,cleanupFailures:w.cleanup_failures})}`}function Ze(w){let y=w.candidate_hidden;return u`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${_l.map(q=>u`<button
              type="button"
              class="worker-filter__chip${x.spec===q.value?" is-active":""}"
              data-spec=${q.value}
              aria-pressed=${x.spec===q.value?"true":"false"}
            >
              ${q.label}
            </button>`)}
        ${y.spec>0?u`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function oe(w){return u`<div class="worker-lanes">
      ${Pt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:w.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",controls:Ze(w)})}
      ${Pt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:w.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Pt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${w.slots}`,items:w.running,body:Co(w.running,Date.now(),T)})}
      ${Pt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:w.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Pt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${w.done.length}`,items:w.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function _e(){let w=at();ce(pe(w),F),ce(oe(w),N)}function Xe(w){let y=w.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!y)return;let q=y.dataset.beadId||"",re=y.dataset.lane||"";m={bead_id:q,from_lane:re};try{w.dataTransfer?.setData("text/plain",q),w.dataTransfer&&(w.dataTransfer.effectAllowed="move")}catch{}}function Te(w){let y=w.target?.closest?.(".worker-pane");if(!y)return;let q=y.dataset.lane||"";q!=="candidate"&&q!=="queue"||(w.preventDefault(),w.dataTransfer&&(w.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function Ce(w){w.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ve(w,y){let q=b.find(ie=>ie.id===w);if(!q)return;let re=b.filter(ie=>ie.id!==w),be=re.length;if(y){let ie=y.dataset.beadId;if(ie===w)return;let fe=re.findIndex(he=>he.id===ie);fe>=0&&(be=fe)}let ne=re.slice();ne.splice(be,0,q),p.applyReorder(w,ne,be)}function Oe(w){let y=w.target?.closest?.(".worker-pane");if(!y)return;w.preventDefault(),y.classList.remove("worker-pane--drag-over");let q=y.dataset.lane||"",re=m?.bead_id||w.dataTransfer?.getData("text/plain")||"",be=m?.from_lane||"";if(m=null,!re)return;let ne=w.target?.closest?.(".worker-mini, .worker-card"),ie=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),fe=ie.length;if(ne){let he=ie.indexOf(ne);he>=0&&(fe=he)}if(q==="candidate"){if(be==="candidate"){ve(re,ne);return}be==="queue"&&Le(re);return}q==="queue"&&(be==="queue"?X(re,fe):H(re,fe))}function He(w){x=w,ml(w),_e()}function Re(w){let y=w.target?.closest?.(".worker-filter__blocked");if(y){He({...x,show_blocked:y.checked});return}let q=w.target?.closest?.(".worker-slots__input");if(!q)return;let re=Number.parseInt(q.value,10);if(!Number.isFinite(re)){_e();return}ue(re).then(_e)}function Me(w){return w?{runner:w.runner||void 0,model:w.model||void 0,effort:w.effort||void 0,worktree:w.worktree||void 0,status:w.status||void 0,session_id:w.session_id||void 0}:{}}function Ie(w){let y=f(),q=y.attempts?y.attempts[w]:null;T=w,B.hidden=!1,S.open({attempt_id:w,meta:Me(q)}),_e()}function We(){if(!T)return;let w=f(),y=w.attempts?w.attempts[T]:null;if(y){S.updateMeta(Me(y));return}S.close()}function we(w){let y=w.target;if(y?.closest?.("#worker-exec-defaults-dialog"))return;if(y?.closest?.(".worker-exec-defaults-btn")){v.open();return}let q=y?.closest?.(".worker-banner__resume");if(q){let $=q.dataset.attemptId;$&&Ve($);return}let re=y?.closest?.(".worker-banner__dismiss");if(re){let $=re.dataset.attemptId;$&&Ue($);return}if(y?.closest?.(".worker-play")){Ke(!f().auto_advance);return}let be=y?.closest?.(".worker-filter__chip");if(be){let $=be.dataset.spec;($==="all"||$==="with"||$==="without")&&He({...x,spec:$});return}let ne=y?.closest?.(".worker-mini__merge");if(ne){ke(ne.dataset.beadId||"");return}let ie=y?.closest?.(".worker-mini__discard");if(ie){Ae(ie.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__stop")){let C=y?.closest?.(".rtile")?.dataset?.attemptId;C&&Pe(C);return}if(y?.closest?.(".rtile__pause")){let C=y?.closest?.(".rtile")?.dataset?.attemptId;C&&Ee(C);return}if(y?.closest?.(".rtile__resume")){let C=y?.closest?.(".rtile")?.dataset?.attemptId;C&&Ve(C);return}if(y?.closest?.(".rtile__info")){let C=y?.closest?.(".rtile")?.dataset?.beadId;C&&l&&l(C);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){S.close();return}if(y?.closest?.(".worker-drawer-host"))return;let fe=y?.closest?.(".rtile");if(fe){let $=fe.dataset.attemptId;$&&Ie($);return}let he=y?.closest?.(".worker-mini, .worker-card");if(he){let $=he.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){$&&Nt($).then(C=>{C?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}$&&l&&l($)}}return t.addEventListener("dragstart",Xe),t.addEventListener("dragover",Te),t.addEventListener("dragleave",Ce),t.addEventListener("drop",Oe),t.addEventListener("click",we),t.addEventListener("change",Re),c&&k.push(c.subscribe(_e)),s&&k.push(s.subscribe(()=>{_e(),We()})),_e(),{load(){_e()},destroy(){for(let w of k.splice(0))try{w()}catch{}t.removeEventListener("dragstart",Xe),t.removeEventListener("dragover",Te),t.removeEventListener("dragleave",Ce),t.removeEventListener("drop",Oe),t.removeEventListener("click",we),t.removeEventListener("change",Re);try{S.destroy()}catch{}B.hidden=!0;try{v.destroy()}catch{}ce(u``,t)}}}function An(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Lo(t,e,r,n=async()=>{},s=async()=>{}){let o=ye("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function p(S){let f=S.target.value,M=e.getState().workspace?.current?.path||"";if(f&&f!==M){o("switching workspace to %s",f),l=!0,T();try{await r(f)}catch(H){o("workspace switch failed: %o",H)}finally{l=!1,T()}}}async function m(){let S=e.getState(),v=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!v||a)){o("git-pulling workspace %s",v),a=!0,T();try{await n(v)}catch(f){o("workspace git pull failed: %o",f)}finally{a=!1,T()}}}function b(S){let v=S.target;v&&t.contains(v)||I()}function x(S){S.key==="Escape"&&I()}function k(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",x),T())}function I(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),T())}function F(){c?I():k()}async function B(S){let v=S.target,f=v.value,L=v.checked;o("toggling visibility %s \u2192 %s",f,String(L));try{await s(f,L)}catch(M){o("workspace visibility toggle failed: %o",M)}}function W(S){return S?u`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:u``}function G(S,v){return u`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${F}
          aria-haspopup="true"
          aria-expanded=${c?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${c?u`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(f=>u`
                    <label
                      class="workspace-picker__manage-row"
                      title="${f.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${f.path}"
                        .checked=${!v.has(f.path)}
                        @change=${B}
                      />
                      <span class="workspace-picker__manage-name"
                        >${An(f.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let S=e.getState(),v=S.workspace?.current,f=S.workspace?.available||[],L=new Set(S.workspace?.hidden||[]),M=v?.path||f[0]?.path||"";if(f.length===0)return u``;let H=f.filter(X=>!L.has(X.path)||X.path===M);if(H.length<=1){let X=H[0]||f[0],Le=An(X.path);return u`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${X.path}"
            >${Le}</span
          >
          ${G(f,L)}
          ${W(M)}
          ${a?u`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return u`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${H.map(X=>u`
              <option
                value="${X.path}"
                ?selected=${X.path===M}
                title="${X.path}"
              >
                ${An(X.path)}
              </option>
            `)}
        </select>
        ${G(f,L)}
        ${W(M)}
        ${l||a?u`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function T(){ce(N(),t)}return T(),i=e.subscribe(()=>T()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",x),ce(u``,t)}}}var Io=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Tn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Do(t,e,r=Tn()){return{id:r,type:t,payload:e}}function Oo(t={}){let e=ye("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,p=[],m=new Map,b=new Set;function x(N){for(let T of Array.from(b))try{T(N)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),x(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),T=(r.jitterRatio||0)*N,S=Math.max(0,Math.round(N+(Math.random()*2-1)*T));e("ws retry in %d ms (attempt %d)",S,i+1),l=setTimeout(()=>{l=null,G()},S)}function I(N){try{s?.send(JSON.stringify(N))}catch(T){e("ws send failed",T)}}function F(){for(o="open",e("ws open"),x(o),i=0;p.length;){let N=p.shift();N&&I(N)}}function B(N){let T;try{T=JSON.parse(String(N.data))}catch{e("ws received non-JSON message");return}if(!T||typeof T.id!="string"||typeof T.type!="string"){e("ws received invalid envelope");return}if(c.has(T.id)){let v=c.get(T.id);c.delete(T.id),T.ok?v?.resolve(T.payload):v?.reject(T.error||new Error("ws error"));return}let S=m.get(T.type);if(S&&S.size>0)for(let v of Array.from(S))try{v(T.payload)}catch(f){e("ws event handler error",f)}else e("ws received unhandled message type: %s",T.type)}function W(){o="closed",e("ws closed"),x(o);for(let[N,T]of c.entries())T.reject(new Error("ws disconnected")),c.delete(N);i+=1,k()}function G(){if(!a)return;let N=n();try{s=new WebSocket(N),e("ws connecting %s",N),o="connecting",x(o),s.addEventListener("open",F),s.addEventListener("message",B),s.addEventListener("error",()=>{}),s.addEventListener("close",W)}catch(T){e("ws connect failed %o",T),k()}}return G(),{send(N,T){if(!Io.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let S=Tn(),v=Do(N,T,S);return e("send %s id=%s",N,S),new Promise((f,L)=>{c.set(S,{resolve:f,reject:L,type:N}),s&&s.readyState===s.OPEN?I(v):(e("queue %s id=%s (state=%s)",N,S,o),p.push(v))})},on(N,T){m.has(N)||m.set(N,new Set);let S=m.get(N);return S?.add(T),()=>{S?.delete(T)}},onConnection(N){return b.add(N),()=>{b.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,G()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function vl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function $l(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var En=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Mo=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],No="worker:queue",Po="ui:order",Fo="ui:display-policy",gt="tab:board:closed",Bo="beads-ui.board.closed-range";function xl(t){let e=ye("main");e("bootstrap start");let r=u`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ce(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let f=function(h,g){let Y="Request failed",j="";if(h&&typeof h=="object"){let V=h;if(typeof V.message=="string"&&V.message.length>0&&(Y=V.message),typeof V.details=="string")j=V.details;else if(V.details&&typeof V.details=="object")try{j=JSON.stringify(V.details,null,2)}catch{j=""}}else typeof h=="string"&&h.length>0&&(Y=h);let A=g&&g.length>0?`Failed to load ${g}`:"Request failed";v.open(A,Y,j)},oe=function(h){return`${D.getState().workspace.current?.path||""}\0${h}`},_e=function(){Ue&&(Ue().catch(()=>{}),Ue=null),ke=null,Ae=null},Te=function(h){Ke=h;let g=()=>{Ke!==h||D.getState().selected_id!==h||(Ke=null,Xe(h))};if(!pe){at.then(g);return}g()},He=function(){let h=Kn(Oe);return h===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:h}}},Re=function(h){if(h)for(let[g,Y]of En){if(Ce.has(g)||ve.has(g))continue;let j=g===gt?He():{type:Y};try{X.register(g,j)}catch(A){e("register %s store failed: %o",g,A)}ve.add(g),H.subscribeList(g,j).then(A=>{Ce.set(g,A)}).catch(A=>{e("subscribe %s failed: %o",g,A),f(A,"board")}).finally(()=>{ve.delete(g)})}else Ie()},Ie=function(){for(let[h]of En){let g=Ce.get(h);g&&(g().catch(()=>{}),Ce.delete(h));try{X.unregister(h)}catch(Y){e("unregister %s failed: %o",h,Y)}}},w=function(h){if(!h){y();return}for(let[g,Y]of Mo)if(!(We.has(g)||ve.has(g))){try{X.register(g,{type:Y})}catch(j){e("register %s store failed: %o",g,j)}ve.add(g),H.subscribeList(g,{type:Y}).then(j=>{We.set(g,j)}).catch(j=>{e("subscribe %s failed: %o",g,j),f(j,"worker")}).finally(()=>{ve.delete(g)})}we||(M("subscribe-worker-queue",{id:No}).catch(g=>{e("subscribe-worker-queue failed: %o",g)}),we=()=>M("unsubscribe-worker-queue",{id:No}))},y=function(){for(let[h]of Mo){let g=We.get(h);g&&(g().catch(()=>{}),We.delete(h));try{X.unregister(h)}catch(Y){e("unregister %s failed: %o",h,Y)}}we&&(we().catch(()=>{}),we=null)},re=function(){q||(M("subscribe-ui-order",{id:Po}).catch(h=>{e("subscribe-ui-order failed: %o",h)}),q=()=>M("unsubscribe-ui-order",{id:Po}))},be=function(){q&&(q().catch(()=>{}),q=null),Pe.clear()},ie=function(){ne||(M("subscribe-display-policy",{id:Fo}).catch(h=>{e("subscribe-display-policy failed: %o",h)}),ne=()=>M("unsubscribe-display-policy",{id:Fo}))},fe=function(){ne&&(ne().catch(()=>{}),ne=null),Ee.clear()},P=function(h){if(!h)return"Unknown";let g=h.split("/").filter(Boolean);return g.length>0?g[g.length-1]:"Unknown"};var l=f,a=oe,c=_e,p=Te,m=He,b=Re,x=Ie,k=w,I=y,F=re,B=be,W=ie,G=fe,N=P;let T=document.getElementById("header-loading"),S=bs(T),v=_o(t),L=Oo(),M=S.wrapSend((h,g)=>L.send(h,g)),H=us(M),X=ps(),Le=hs(),Pe=fs(),Ee=Zn(),Ve=Xn();L.on("ui-order-snapshot",h=>{let g=h;if(g&&typeof g.revision=="number")try{Pe.set({revision:g.revision,order:g.order&&typeof g.order=="object"?g.order:{}})}catch{}}),L.on("display-policy-snapshot",h=>{let g=h;if(g&&g.policy&&typeof g.policy=="object")try{Ee.set(g.policy)}catch{}}),L.on("session-log-snapshot",h=>{let g=h;if(g&&typeof g.attempt_id=="string")try{Ve.set(g.attempt_id,Array.isArray(g.lines)?g.lines:[])}catch{}}),L.on("session-log-append",h=>{let g=h;if(g&&typeof g.attempt_id=="string")try{Ve.append(g.attempt_id,g.event)}catch{}}),L.on("snapshot",h=>{let g=h,Y=g&&typeof g.id=="string"?g.id:"",j=Y?X.getStore(Y):null;if(j&&g&&g.type==="snapshot")try{j.applyPush(g)}catch{}}),L.on("upsert",h=>{let g=h,Y=g&&typeof g.id=="string"?g.id:"",j=Y?X.getStore(Y):null;if(j&&g&&g.type==="upsert")try{j.applyPush(g)}catch{}}),L.on("delete",h=>{let g=h,Y=g&&typeof g.id=="string"?g.id:"",j=Y?X.getStore(Y):null;if(j&&g&&g.type==="delete")try{j.applyPush(g)}catch{}});let Ue=null,ke=null,Ae=null,Ke=null,ue=()=>{},at=new Promise(h=>{ue=()=>h(void 0)}),pe=!1,Ze=!1;async function Xe(h){let g=oe(h);if(g===ke||g===Ae)return;Ae=g;let Y=`detail:${h}`,j={type:"issue-detail",params:{id:h}};try{X.register(Y,j)}catch(A){e("register detail store failed: %o",A)}try{let A=await H.subscribeList(Y,j);if(D.getState().selected_id!==h||oe(h)!==g){await A().catch(()=>{});return}Ue&&await Ue().catch(()=>{}),Ue=A,ke=g}catch(A){e("detail subscribe failed: %o",A),f(A,"issue details")}finally{Ae===g&&(Ae=null)}}let Ce=new Map,ve=new Set,Oe=ir;try{let h=window.localStorage.getItem(Bo);zr(h)&&(Oe=h)}catch{}async function Me(h){if(!zr(h)||h===Oe)return;Oe=h;try{window.localStorage.setItem(Bo,h)}catch{}let g=Ce.get(gt);if(!g)return;Ce.delete(gt),await g().catch(()=>{});let Y=He();try{X.register(gt,Y)}catch(j){e("register %s store failed: %o",gt,j)}try{let j=await H.subscribeList(gt,Y);Ce.set(gt,j)}catch(j){e("re-subscribe %s failed: %o",gt,j),f(j,"board")}}let We=new Map,we=null,q=null,ne=null;async function he(){ne=null,Ee.clear(),we=null;let h=D.getState().workspace.current?.path;if(h)try{await L.send("set-workspace",{path:h})}catch(g){e("workspace restore after reconnect failed: %o",g);return}ie(),w(D.getState().view==="worker")}async function $(){e("clearing all subscriptions for workspace switch"),Ie(),y(),Le.clear(),be(),re(),fe(),ie(),_e();let h=D.getState();if(h.selected_id)try{X.unregister(`detail:${h.selected_id}`)}catch{}let g=D.getState();Re(g.view==="board"),w(g.view==="worker"),g.selected_id&&Te(g.selected_id)}async function C(h){e("requesting workspace switch to %s",h),Ze=!0;try{let g=await L.send("set-workspace",{path:h});e("workspace switch result: %o",g),g&&g.workspace&&(D.setState({workspace:{current:{path:g.workspace.root_dir,database:g.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",h),g.changed&&(await $(),J("Switched to "+P(h),"success",2e3)))}catch(g){throw e("workspace switch failed: %o",g),J("Failed to switch workspace","error",3e3),g}finally{Ze=!1}}async function Q(h){e("requesting workspace git pull for %s",h);try{let g=await L.send("git-pull-workspace",{});e("workspace git pull result: %o",g);let Y=g?.status;if(Y==="up_to_date"){J("Already up to date","success",2e3);return}if(Y==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+P(h),"success",2e3)}catch(g){e("workspace git pull failed: %o",g);let Y=g?.code,j=g?.message;if(Y==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Y==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Y==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let A=j?`: ${j}`:"";throw J(`Git pull failed${A}`,"error",3e3),g}}async function Z(h,g){e("setting workspace visibility %s \u2192 %s",h,String(g));try{await L.send("set-workspace-visibility",{path:h,visible:g}),await _()}catch(Y){e("workspace visibility update failed: %o",Y),J("Failed to update project visibility","error",3e3)}}async function _(){try{let h=await L.send("list-workspaces",{});if(e("workspaces loaded: %o",h),h&&Array.isArray(h.workspaces)){let g=h.workspaces.map(V=>({path:V.path,database:V.database,pid:V.pid,version:V.version})),Y=h.current?{path:h.current.root_dir,database:h.current.db_path}:null,j=Array.isArray(h.hidden)?h.hidden.filter(V=>typeof V=="string"):[];D.setState({workspace:{current:Y,available:g,hidden:j}});let A=window.localStorage.getItem("beads-ui.workspace");A&&(!g.some(me=>me.path===A)||j.includes(A)?window.localStorage.removeItem("beads-ui.workspace"):Y&&A!==Y.path&&(e("restoring saved workspace preference: %s",A),await C(A)))}}catch(h){e("failed to load workspaces: %o",h)}}L.on("workspace-changed",h=>{e("workspace-changed event: %o",h),h&&h.root_dir&&(D.setState({workspace:{current:{path:h.root_dir,database:h.db_path}}}),_(),$())});let R=!1;if(typeof L.onConnection=="function"){let h=g=>{e("ws state %s",g),g==="reconnecting"||g==="closed"?(R=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):g==="open"&&R&&(R=!1,J("Reconnected","success",2200),$l(D,(Y,j)=>{e(`${Y}: %o`,j)}),he())};L.onConnection(h)}let E="board";try{let h=window.localStorage.getItem("beads-ui.view");(h==="board"||h==="worker")&&(E=h)}catch(h){e("view parse error: %o",h)}let D=_s({config:vl(),view:E});L.on("worker-queue-snapshot",h=>{let g=h;if(!g||!g.queue)return;let Y=D.getState().workspace.current?.path;if(typeof Y=="string"&&Y.length>0&&g.root_dir!==Y){e("dropping worker-queue snapshot for %s",String(g.root_dir));return}try{Le.set(g.queue)}catch{}});let ee=ms(D);ee.start();let ae=async(h,g)=>{try{return await M(h,g)}catch{return[]}};n&&bo(n,D,ee);let U=document.getElementById("workspace-picker");U&&Lo(U,D,C,Q,Z);let $e=vo(t,(h,g)=>M(h,g));try{let h=document.getElementById("new-issue-btn");h&&h.addEventListener("click",()=>$e.open())}catch{}let lt=go(t,{policyStore:Ee,transport:(h,g)=>M(h,g),labelOptions:()=>{let h=new Set;for(let[g]of En)for(let Y of X.snapshotFor(g)||[]){let j=Y.labels;if(Array.isArray(j))for(let A of j)typeof A=="string"&&A.length>0&&h.add(A)}return Array.from(h).sort()}});try{let h=document.getElementById("display-settings-btn");h&&h.addEventListener("click",()=>lt.open())}catch{}let tt=Ss(s,{gotoIssue:h=>ee.gotoIssue(h),issueStores:X,transport:ae,uiOrderStore:Pe,displayPolicyStore:Ee,closedRange:Oe,onClosedRangeChange:h=>{Me(h)},onNewIssue:()=>$e.open()}),Ge=Sn(o,{transport:ae,issueStores:X,queueStore:Le,sessionLogStore:Ve,uiOrderStore:Pe,gotoIssue:h=>D.setState({selected_id:h}),getWorkspacePath:()=>D.getState().workspace.current?.path}),Je=ho(i,{issueStores:X,transport:ae,queueStore:Le,sessionLogStore:Ve,getWorkspacePath:()=>D.getState().workspace.current?.path,onNavigate:h=>{D.getState().view==="worker"?D.setState({selected_id:h}):ee.gotoIssue(h)},onClose:()=>{let h=D.getState();D.setState({selected_id:null});try{ee.gotoView(h.view==="worker"?"worker":"board")}catch{}}}),_t=D.getState().selected_id;_t&&(i.hidden=!1,Je.load(_t),Te(_t)),D.subscribe(h=>{let g=h.selected_id;g?(i.hidden=!1,Je.load(g),Ze||Te(g)):(Je.clear(),i.hidden=!0,_e())});let Ft=h=>{s.hidden=h.view!=="board",o.hidden=h.view!=="worker",Re(h.view==="board"),w(h.view==="worker"),!h.selected_id&&h.view==="board"&&tt.load(),h.view==="worker"&&Ge.load(),window.localStorage.setItem("beads-ui.view",h.view)};D.subscribe(Ft),Ft(D.getState()),re(),ie(),_().finally(()=>{pe=!0,ue()}),window.addEventListener("keydown",h=>{let g=h.ctrlKey||h.metaKey,Y=String(h.key||"").toLowerCase(),j=h.target,A=j&&j.tagName?String(j.tagName).toLowerCase():"",V=A==="input"||A==="textarea"||A==="select"||j&&typeof j.isContentEditable=="boolean"&&j.isContentEditable;g&&Y==="n"&&(V||(h.preventDefault(),$e.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&xl(e)});export{xl as bootstrap,vl as readBootstrapConfig,$l as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
