var E_=Object.create;var ti=Object.defineProperty;var T_=Object.getOwnPropertyDescriptor;var C_=Object.getOwnPropertyNames;var R_=Object.getPrototypeOf,O_=Object.prototype.hasOwnProperty;var L_=(e,t,n)=>t in e?ti(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ni=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var I_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of C_(t))!O_.call(e,s)&&s!==n&&ti(e,s,{get:()=>t[s],enumerable:!(r=T_(t,s))||r.enumerable});return e};var M_=(e,t,n)=>(n=e!=null?E_(R_(e)):{},I_(t||!e||!e.__esModule?ti(n,"default",{value:e,enumerable:!0}):n,e));var qt=(e,t,n)=>L_(e,typeof t!="symbol"?t+"":t,n);var Mc=ni((aw,Ic)=>{var Br=1e3,Ur=Br*60,Wr=Ur*60,Ar=Wr*24,N_=Ar*7,q_=Ar*365.25;Ic.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return F_(e);if(n==="number"&&isFinite(e))return t.long?B_(e):j_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function F_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*q_;case"weeks":case"week":case"w":return n*N_;case"days":case"day":case"d":return n*Ar;case"hours":case"hour":case"hrs":case"hr":case"h":return n*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return n*Br;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function j_(e){var t=Math.abs(e);return t>=Ar?Math.round(e/Ar)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=Br?Math.round(e/Br)+"s":e+"ms"}function B_(e){var t=Math.abs(e);return t>=Ar?$o(e,t,Ar,"day"):t>=Wr?$o(e,t,Wr,"hour"):t>=Ur?$o(e,t,Ur,"minute"):t>=Br?$o(e,t,Br,"second"):e+" ms"}function $o(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Dc=ni((iw,Pc)=>{function U_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=Mc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let m=0;for(let y=0;y<d.length;y++)m=(m<<5)-m+d.charCodeAt(y),m|=0;return n.colors[Math.abs(m)%n.colors.length]}n.selectColor=t;function n(d){let m,y=null,b,k;function F(...G){if(!F.enabled)return;let V=F,ie=Number(new Date),Y=ie-(m||ie);V.diff=Y,V.prev=m,V.curr=ie,m=ie,G[0]=n.coerce(G[0]),typeof G[0]!="string"&&G.unshift("%O");let B=0;G[0]=G[0].replace(/%([a-zA-Z%])/g,(W,L)=>{if(W==="%%")return"%";B++;let M=n.formatters[L];if(typeof M=="function"){let re=G[B];W=M.call(V,re),G.splice(B,1),B--}return W}),n.formatArgs.call(V,G),(V.log||n.log).apply(V,G)}return F.namespace=d,F.useColors=n.useColors(),F.color=n.selectColor(d),F.extend=r,F.destroy=n.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:G=>{y=G}}),typeof n.init=="function"&&n.init(F),F}function r(d,m){let y=n(this.namespace+(typeof m>"u"?":":m)+d);return y.log=this.log,y}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let m=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of m)y[0]==="-"?n.skips.push(y.slice(1)):n.names.push(y)}function o(d,m){let y=0,b=0,k=-1,F=0;for(;y<d.length;)if(b<m.length&&(m[b]===d[y]||m[b]==="*"))m[b]==="*"?(k=b,F=y,b++):(y++,b++);else if(k!==-1)b=k+1,F++,y=F;else return!1;for(;b<m.length&&m[b]==="*";)b++;return b===m.length}function a(){let d=[...n.names,...n.skips.map(m=>"-"+m)].join(",");return n.enable(""),d}function i(d){for(let m of n.skips)if(o(d,m))return!1;for(let m of n.names)if(o(d,m))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Pc.exports=U_});var Nc=ni((An,xo)=>{An.formatArgs=z_;An.save=H_;An.load=G_;An.useColors=W_;An.storage=K_();An.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();An.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function W_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function z_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+xo.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}An.log=console.debug||console.log||(()=>{});function H_(e){try{e?An.storage.setItem("debug",e):An.storage.removeItem("debug")}catch{}}function G_(){let e;try{e=An.storage.getItem("debug")||An.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function K_(){try{return localStorage}catch{}}xo.exports=Dc()(An);var{formatters:V_}=xo.exports;V_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var us=globalThis,go=us.trustedTypes,bc=go?go.createPolicy("lit-html",{createHTML:e=>e}):void 0,si="$lit$",er=`lit$${Math.random().toFixed(9).slice(2)}$`,oi="?"+er,P_=`<${oi}>`,wr=document,ds=()=>wr.createComment(""),ps=e=>e===null||typeof e!="object"&&typeof e!="function",ai=Array.isArray,$c=e=>ai(e)||typeof e?.[Symbol.iterator]=="function",ri=`[ 	
\f\r]`,cs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hc=/-->/g,yc=/>/g,yr=RegExp(`>|${ri}(?:([^\\s"'>=/]+)(${ri}*=${ri}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vc=/'/g,wc=/"/g,xc=/^(?:script|style|textarea|title)$/i,ii=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=ii(1),_s=ii(2),Jv=ii(3),In=Symbol.for("lit-noChange"),Gt=Symbol.for("lit-nothing"),kc=new WeakMap,vr=wr.createTreeWalker(wr,129);function Ac(e,t){if(!ai(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return bc!==void 0?bc.createHTML(t):t}var Sc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=cs;for(let i=0;i<n;i++){let l=e[i],u,d,m=-1,y=0;for(;y<l.length&&(a.lastIndex=y,d=a.exec(l),d!==null);)y=a.lastIndex,a===cs?d[1]==="!--"?a=hc:d[1]!==void 0?a=yc:d[2]!==void 0?(xc.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=yr):d[3]!==void 0&&(a=yr):a===yr?d[0]===">"?(a=s??cs,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?yr:d[3]==='"'?wc:vc):a===wc||a===vc?a=yr:a===hc||a===yc?a=cs:(a=yr,s=void 0);let b=a===yr&&e[i+1].startsWith("/>")?" ":"";o+=a===cs?l+P_:m>=0?(r.push(u),l.slice(0,m)+si+l.slice(m)+er+b):l+er+(m===-2?i:b)}return[Ac(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},fs=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=Sc(t,n);if(this.el=e.createElement(u,r),vr.currentNode=this.el.content,n===2||n===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=vr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(si)){let y=d[a++],b=s.getAttribute(m).split(er),k=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?ho:k[1]==="?"?yo:k[1]==="@"?vo:$r}),s.removeAttribute(m)}else m.startsWith(er)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(xc.test(s.tagName)){let m=s.textContent.split(er),y=m.length-1;if(y>0){s.textContent=go?go.emptyScript:"";for(let b=0;b<y;b++)s.append(m[b],ds()),vr.nextNode(),l.push({type:2,index:++o});s.append(m[y],ds())}}}else if(s.nodeType===8)if(s.data===oi)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(er,m+1))!==-1;)l.push({type:7,index:o}),m+=er.length-1}o++}}static createElement(t,n){let r=wr.createElement("template");return r.innerHTML=t,r}};function kr(e,t,n=e,r){if(t===In)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=ps(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=kr(e,s._$AS(e,t.values),s,r)),t}var bo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??wr).importNode(n,!0);vr.currentNode=s;let o=vr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Fr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new wo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=vr.nextNode(),a++)}return vr.currentNode=wr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Fr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Gt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=kr(this,t,n),ps(t)?t===Gt||t==null||t===""?(this._$AH!==Gt&&this._$AR(),this._$AH=Gt):t!==this._$AH&&t!==In&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$c(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Gt&&ps(this._$AH)?this._$AA.nextSibling.data=t:this.T(wr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=fs.createElement(Ac(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new bo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=kc.get(t.strings);return n===void 0&&kc.set(t.strings,n=new fs(t)),n}k(t){ai(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(ds()),this.O(ds()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},$r=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Gt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Gt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=kr(this,t,n,0),a=!ps(t)||t!==this._$AH&&t!==In,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=kr(this,i[r+l],n,l),u===In&&(u=this._$AH[l]),a||(a=!ps(u)||u!==this._$AH[l]),u===Gt?t=Gt:t!==Gt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Gt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ho=class extends $r{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Gt?void 0:t}},yo=class extends $r{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Gt)}},vo=class extends $r{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=kr(this,t,n,0)??Gt)===In)return;let r=this._$AH,s=t===Gt&&r!==Gt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Gt&&(r===Gt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},wo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){kr(this,t)}},Ec={M:si,P:er,A:oi,C:1,L:Sc,R:bo,D:$c,V:kr,I:Fr,H:$r,N:yo,U:vo,B:ho,F:wo},D_=us.litHtmlPolyfillSupport;D_?.(fs,Fr),(us.litHtmlVersions??(us.litHtmlVersions=[])).push("3.3.1");var it=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Fr(t.insertBefore(ds(),o),o,void 0,n??{})}return s._$AI(e),s};var ko="today",Tc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],jr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Vn(e){return e==="today"?"today":"7d"}function li(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function xr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Cc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Rc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Oc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Lc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var qc=M_(Nc(),1);function Wt(e){return(0,qc.default)(`beads-ui:${e}`)}function Nn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Sr(e,t){let n=Nn(e.created_at),r=Nn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Bc(e,t){let n=Nn(e.created_at),r=Nn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ao(e,t){let n=Nn(e.updated_at),r=Nn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Uc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Nn(e.created_at),o=Nn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Wc(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Y_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Fc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function jc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=Y_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function zc(e,t){let n=Fc(e),r=Fc(t);if(n!==r)return n<r?-1:1;let s=jc(e),o=jc(t);if(s!==o)return s<o?-1:1;let a=Nn(e&&e.created_at),i=Nn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ci=2**20;function zr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Nn(e&&e.created_at)}function So(e){return(t,n)=>{let r=zr(t,e),s=zr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ui(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:zr(i,n)-ci};if(!i)return{rank:zr(a,n)+ci};let l=zr(a,n),u=zr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((m,y)=>({bead_id:m.id,rank:y*ci}))}}function di(e,t={}){let n=Wt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||Sr;function u(){for(let y of Array.from(a))try{y()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function m(y){if(i||!y||y.id!==e)return;let b=Number(y.revision)||0;if(n("apply %s rev=%d",y.type,b),!(b<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(y.issues)?y.issues:[];for(let F of k)F&&typeof F.id=="string"&&F.id.length>0&&r.set(F.id,F);d(),o=b,u();return}if(y.type==="upsert"){let k=y.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let F=r.get(k.id);if(!F)r.set(k.id,k);else{let G=Number.isFinite(F.updated_at)?F.updated_at:0,V=Number.isFinite(k.updated_at)?k.updated_at:0;if(G<=V){for(let ie of Object.keys(F))ie in k||delete F[ie];for(let[ie,Y]of Object.entries(k))F[ie]=Y}}d()}o=b,u()}else if(y.type==="delete"){let k=String(y.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:m,snapshot(){return s},size(){return r.size},getById(y){return r.get(y)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function Eo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Hc(e){let t=Wt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],y=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let F=k.itemsById;for(let G of d)typeof G=="string"&&G.length>0&&F.set(G,!0);for(let G of m)typeof G=="string"&&G.length>0&&F.set(G,!0);for(let G of y)typeof G=="string"&&G.length>0&&F.delete(G)}}async function o(i,l){let u=Eo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let m=n.get(i);if(m&&m.key!==u){let y=r.get(m.key);y&&(y.delete(i),y.size===0&&r.delete(m.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(m){let y=n.get(i)||null;if(y){let b=r.get(y.key);b&&(b.delete(i),b.size===0&&r.delete(y.key))}throw n.delete(i),m}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let m=n.get(i)||null;if(m){let y=r.get(m.key);y&&(y.delete(i),y.size===0&&r.delete(m.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Eo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Gc(){let e=Wt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let m=u?Eo(u):"",y=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,y),b&&y&&m&&y!==m){let k=t.get(l);if(k)try{k.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let G=di(l,d);t.set(l,G);let V=G.subscribe(()=>o());s.set(l,V)}else if(!b){let k=di(l,d);t.set(l,k);let F=k.subscribe(()=>o());s.set(l,F)}return n.set(l,m),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Kc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function Vc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Yc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function pi(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Z_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function Q_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Zc(e){let t=Wt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):Z_(r),a=Q_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=pi(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?pi(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var X_=Object.freeze({workspace_config:{default_workspace:null}});function Qc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:X_.workspace_config.default_workspace}}}function Xc(e={}){let t=Wt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Qc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Qc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Jc(e){let t=Wt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(m,y)=>{let b=s++,k=Date.now();r.set(b,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",b,m,n+1),a();let F=!1,G=()=>{F||(F=!0,r.delete(b),i())},V=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,m,Date.now()-k),G())},3e4);try{let ie=await u(m,y),Y=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,m,Y),ie}catch(ie){let Y=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,m,Y,ie),ie}finally{clearTimeout(V),G()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,m])=>({id:d,type:m.type,elapsed_ms:u-m.start_ts}))}}}function ce(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function To(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Wc),l;switch(i){case"created_desc":return l.sort(Sr),l;case"created_asc":return l.sort(Bc),l;case"updated_desc":return l.sort(Ao),l;case"priority":return l.sort(Uc),l;case"manual":default:{let u=n();return u?l.sort(So(u)):l.sort(Sr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function qn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function pn(e){let t=qn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function Sn(e,t){let n=qn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function eu(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=qn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function Co(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ro(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=Co(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function Oo(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=eu(n);return{total:n.length,count:r,current:s,children:n}}function Lo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ui(i,l,u.order),a);s(u,d);let m=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(m&&m.conflict){let y={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};n.set(y);let b=r(ui(i,l,y.order),a);s(y,b);let k=await t("ui-order-set",{expected_revision:y.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&n.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function tu(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Io(e,t){let n=tu(e),r=tu(t);return n.length===0||r.length===0?!1:n!==r}function Mo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function fi(e,t){return!t||typeof e!="string"||e.length===0||Mo(t.visible_labels).includes(e)?!0:Mo(t.hidden_labels).includes(e)?!1:!Mo(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function nu(e,t){return Mo(e).filter(n=>fi(n,t))}function ur(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function J_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function em(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function tm(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${J_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Po(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(zc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?em(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>tm(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var nm={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},su={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ru={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},rm={review:"\u2713",skip:"\u2298"},dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function sm(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ou(e){let t=e&&e.fill||"none";return t==="none"?dr.none:e&&e.stale===!0?dr.stale:t==="dim"?dr.dim:e&&e.glyph==="review"?dr.review:e&&e.glyph==="skip"?dr.skip:dr.done}function om(e){if(!e||e.fill==="none"||!e.approval_state)return ou(e);let t=[];return e.glyph==="review"?t.push(dr.review):e.glyph==="skip"&&t.push(dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function am(e,t,n,r){let s=nm[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=rm[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",m=su[e]||e,y=r?au(t):null;if(!y)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${m}</div>
      </div>
    `;let b=`${m} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${y.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,y,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${m}</div>
    </button>
  `}function au(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function Do(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=ru[e.route]||ru.spec_backed,o=e.stages,a=sm(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${su[u]||u} ${u==="plan"?om(o[u]||{}):ou(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>au(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>am(u,o[u]||{},u===a,r))}
    </div>
  `}function im(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var iu=2;function lu(e){let t=e.slice(0,iu).join(", "),n=e.length-iu;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function lm(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Io(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${lu(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${lu(o)}</span
      >`),n}function _i(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function No(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function tr(e){return`${e.kind}:${No(e)}@${e.sha}`}function qo(e,t){if(!e)return null;let n=_i(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=_i(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${tr(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function cu(e,t){let n=qo(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function cm(e){if(!e)return null;let t=_i(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${tr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function um(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&ur(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&ur(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&ur(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=cu(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${tr(i)}`}
        >${`exec ${i.kind==="delegated"?No(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of nu(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&ur(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),ur(n,"blocked")&&s.push(...lm(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&ur(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function dm(e){let t=Sn(e.created_at),n=Sn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${pn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${pn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function pm(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Po(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:dm(e),empty_label:"children \uC5C6\uC74C",childChips:mi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function mi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return qo(t,n)?c`<span class="board-card__roll-child-chips">
    ${cu(t,n)}
    ${cm(n)}
  </span>`:null}function Fo(e,t){let n=im(e.priority);return c`
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
      ${um(e,t)}
      ${e.workflow&&ur(t.policy||null,"stepper")?Do(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${pm(e,t)}
    </article>
  `}function Hr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
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
              ${Tc.map(o=>c`<option
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
        ${e.items.map(o=>Fo(o,t))}
      </div>
    </section>
  `}function uu(e,t,n){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Fo(r,t))}
        </div>
      </div>
    </dialog>
  `}var fm=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_m=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
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
  `}function du(e,t,n){return c`
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
        ${fm.map(r=>c`<option
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
        ${_m.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${gm(e,t,n)}
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
        ${mm.map(r=>c`<option
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
  `}var bm=200,hm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},ym=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),pu="beads-ui.board.sort",fu=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function vm(){try{let e=window.localStorage.getItem(pu);if(e&&fu.has(e))return e}catch{}return"created_desc"}function _u(e,t){let n=Wt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,m=t.openDoc,y=t.closedRange||ko,b=s?To(s,a):null,k=Lo({transport:o,uiOrderStore:a}),F=[],G=[],V=[],ie=[],Y=[],B=[],q=!1,W=0,L=vm(),M=new Map,re=new Map,ge=new Map,we=new Set,le={search:"",priority:"",type:"",labels:[]},_e=!1,Ae=null;function Ge(O){return String(O.status||"open")==="open"}function be(O){let z=String(O.status||"open");return z==="open"||z==="blocked"}function J(O){let z=le.search.trim().toLowerCase(),Re=le.priority,A=le.type,R=le.labels;return O.filter(X=>{if(z){let me=String(X.id||"").toLowerCase(),oe=String(X.title||"").toLowerCase();if(!me.includes(z)&&!oe.includes(z))return!1}if(Re!==""&&String(X.priority)!==Re||A!==""&&String(X.issue_type||"")!==A)return!1;if(R.length>0){let me=Array.isArray(X.labels)?X.labels:[];if(!R.some(oe=>me.includes(oe)))return!1}return!0})}function Oe(){let O=new Set;for(let z of[F,G,V,ie,Y,B])for(let Re of z){let A=Array.isArray(Re.labels)?Re.labels:[];for(let R of A)typeof R=="string"&&R.length>0&&O.add(R)}return Array.from(O).sort()}function Ne(){return le.search.trim()!==""||le.priority!==""||le.type!==""||le.labels.length>0}function T(){try{if(b){let O=b.selectBoardColumn("tab:board:in-progress","in_progress",L),z=b.selectBoardColumn("tab:board:blocked","blocked",L).filter(be),Re=new Set(O.map(U=>U.id)),A=b.selectBoardColumn("tab:board:ready","ready",L).filter(U=>Ge(U)&&!Re.has(U.id)),R=b.selectBoardColumn("tab:board:resolved","resolved",L),X=b.selectBoardColumn("tab:board:deferred","deferred",L),me=b.selectBoardColumn("tab:board:closed","closed").slice(0,bm),oe=[...z,...A,...O,...R,...me];te(oe);let Me=new Set;for(let U of oe)U&&U.id&&!Co(U)&&Me.add(U.id);let E=!Ne();F=E?ms(z,Me):z,G=E?ms(A,Me):A,V=E?ms(O,Me):O,ie=E?ms(R,Me):R,Y=X,W=X.length,B=E?ms(me,Me):me,M=new Map;for(let U of F)M.set(U.id,"open");for(let U of G)M.set(U.id,"open");for(let U of V)M.set(U.id,"in_progress");for(let U of ie)M.set(U.id,"resolved");for(let U of Y)M.set(U.id,"deferred");for(let U of B)M.set(U.id,"closed");re=new Map;for(let U of F)re.set(U.id,"blocked-col");for(let U of G)re.set(U.id,"ready-col");for(let U of V)re.set(U.id,"in-progress-col");for(let U of ie)re.set(U.id,"resolved-col");for(let U of B)re.set(U.id,"closed-col")}pt()}catch{F=[],G=[],V=[],ie=[],Y=[],B=[],ge=new Map,pt()}}function te(O){ge=Ro(O)}function Se(O){return Oo(ge,O)}function $e(O){return!we.has(O)}function Ce(O,z){O.preventDefault(),O.stopPropagation(),we.has(z)?we.delete(z):we.add(z),pt()}function he(O,z){O.preventDefault(),O.stopPropagation(),r(z)}function Le(O,z){O.preventDefault(),O.stopPropagation(),r(z)}function tt(O,z){Ae||r(z)}function xt(O,z){O.preventDefault(),O.stopPropagation(),wm(z).then(Re=>{Re&&ce("\uBCF5\uC0AC\uB428","success",1200)})}function kt(O,z){Ae=z,O.dataTransfer&&(O.dataTransfer.setData("text/plain",z),O.dataTransfer.effectAllowed="move"),O.target.classList.add("board-card--dragging")}function _t(O){O.target.classList.remove("board-card--dragging"),Tt(),setTimeout(()=>{Ae=null},0)}function P(O){let z=String(O.target.value||"");!z||z===y||(y=z,u&&u(z),pt())}function ae(){return i?i.get():null}function Ie(O){let z=l?l.get():null,Re=z?z.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let A=Re[O];return!A||typeof A!="object"||Array.isArray(A)?null:A}let qe={onCardClick:tt,onCopyId:xt,onDragStart:kt,onDragEnd:_t,onClosedRangeChange:P,rollupFor:Se,isExpanded:$e,onRollupToggle:Ce,onChildClick:he,onFromChipClick:Le,onOpenDoc:m?(O,z)=>m(z):void 0,cleanupFailureFor:Ie,get policy(){return ae()}};function Ze(O,z){Ae||(ve(),r(z))}function st(O,z){O.preventDefault(),O.stopPropagation(),ve(),r(z)}let mt={...qe,onCardClick:Ze,onChildClick:st,onFromChipClick:st,onOpenDoc:m?(O,z)=>{ve(),m(z)}:void 0,get policy(){return ae()}};function gt(O){let z=O.target,Re=e.querySelector(".board-filter__labels");z&&Re&&Re.contains(z)||We()}function ne(O){O.key==="Escape"&&We()}function Q(){_e||(_e=!0,document.addEventListener("mousedown",gt),document.addEventListener("keydown",ne),pt())}function We(){_e&&(_e=!1,document.removeEventListener("mousedown",gt),document.removeEventListener("keydown",ne),pt())}function ut(O){O.key==="Escape"&&ve()}function He(){q||(q=!0,document.addEventListener("keydown",ut),pt())}function ve(){q&&(q=!1,document.removeEventListener("keydown",ut),pt())}let Je={onClose:ve,onOverlayClick(O){O.target===O.currentTarget&&ve()}},lt={onSearchInput(O){le.search=String(O.target.value||""),T()},onPriorityChange(O){le.priority=String(O.target.value||""),T()},onTypeChange(O){le.type=String(O.target.value||""),T()},onSortChange(O){let z=String(O.target.value||"");if(!(!fu.has(z)||z===L)){L=z;try{window.localStorage.setItem(pu,z)}catch{}T()}},onDeferredToggle(){q?ve():He()},onLabelMenuToggle(){_e?We():Q()},onLabelToggle(O){let z=le.labels.indexOf(O);z===-1?le.labels.push(O):le.labels.splice(z,1),T()},onLabelClear(){le.labels.length!==0&&(le.labels=[],T())},onNewIssue(){d&&d()}};function dt(){return c`
      <div class="board-view">
        ${du(le,lt,{sort_mode:L,deferred_popup_open:q,deferred_count:W,label_options:Oe(),label_menu_open:_e})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:J(F)},qe)}
          ${Hr({title:"Ready",id:"ready-col",items:J(G)},qe)}
          ${Hr({title:"In progress",id:"in-progress-col",items:J(V)},qe)}
          ${Hr({title:"Resolved",id:"resolved-col",items:J(ie)},qe)}
          ${Hr({title:"Closed",id:"closed-col",items:J(B),is_closed:!0,closed_range:y},qe)}
        </div>
        ${q?uu({items:J(Y),count:W},mt,Je):""}
      </div>
    `}function pt(){it(dt(),e),Ut()}function Ut(){try{let O=e.querySelector("#deferred-popup");O&&!O.open&&(typeof O.showModal=="function"?O.showModal():O.setAttribute("open",""));let z=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of z)Array.from(Re.querySelectorAll(".board-card")).forEach((R,X)=>{R.tabIndex=X===0?0:-1})}catch{}}async function Dt(O,z){if(!o){ce("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:O,status:z}),ce("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),ce("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function zt(O){switch(O){case"blocked-col":return F;case"ready-col":return G;case"in-progress-col":return V;case"resolved-col":return ie;default:return[]}}function Et(O,z,Re){if(!o||!a)return;let A=zt(O),R=A.find(E=>E.id===z);if(!R)return;let X=A.filter(E=>E.id!==z),me=Re.closest?Re.closest(".board-card"):null,oe=X.length;if(me){let E=me.getAttribute("data-issue-id");if(E===z)return;let U=X.findIndex(ke=>ke.id===E);U>=0&&(oe=U)}let Me=X.slice();Me.splice(oe,0,R),k.applyReorder(z,Me,oe)}function Tt(){for(let O of Array.from(e.querySelectorAll(".board-column--drag-over")))O.classList.remove("board-column--drag-over")}let ot=null;e.addEventListener("dragover",O=>{O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move");let Re=O.target.closest(".board-column");Re&&Re!==ot&&(ot&&ot.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),ot=Re)}),e.addEventListener("dragleave",O=>{let z=O.relatedTarget;(!z||!e.contains(z))&&ot&&(ot.classList.remove("board-column--drag-over"),ot=null)}),e.addEventListener("drop",O=>{O.preventDefault(),ot&&(ot.classList.remove("board-column--drag-over"),ot=null);let z=O.target,Re=z.closest(".board-column");if(!Re)return;let A=O.dataTransfer?.getData("text/plain")||"";if(!A)return;let R=Re.id,X=re.get(A);if(X&&X===R){if(ym.has(R)){if(L!=="manual"){ce("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Et(R,A,z)}return}let me=hm[R];if(!me){ce("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get(A)!==me&&Dt(A,me)}),e.addEventListener("keydown",O=>{let z=O.target;if(!(z instanceof HTMLElement))return;let Re=String(z.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||z.isContentEditable===!0)return;let A=z.closest(".board-card");if(!A)return;let R=String(O.key||"");if(R==="Enter"||R===" "){O.preventDefault();let Me=A.getAttribute("data-issue-id");Me&&r(Me);return}if(R!=="ArrowUp"&&R!=="ArrowDown"&&R!=="ArrowLeft"&&R!=="ArrowRight")return;O.preventDefault();let X=A.closest(".board-column");if(!X)return;let me=Array.from(X.querySelectorAll(".board-card")),oe=me.indexOf(A);if(R==="ArrowDown"&&oe<me.length-1){ze(A,me[oe+1]);return}if(R==="ArrowUp"&&oe>0){ze(A,me[oe-1]);return}if(R==="ArrowLeft"||R==="ArrowRight"){let Me=Array.from(e.querySelectorAll(".board-column")),E=Me.indexOf(X),U=R==="ArrowRight"?1:-1,ke=E+U;for(;ke>=0&&ke<Me.length;){let rt=Me[ke].querySelector(".board-card");if(rt){ze(A,rt);return}ke+=U}}});function ze(O,z){try{O.tabIndex=-1,z.tabIndex=0,z.focus()}catch{}}let D=null;b&&b.subscribe&&(D=b.subscribe(()=>{try{T()}catch{}}));let ee=null;i&&i.subscribe&&(ee=i.subscribe(()=>{try{T()}catch{}}));let ye=null;return l&&l.subscribe&&(ye=l.subscribe(()=>{pt()})),{async load(){n("load"),T()},clear(){We(),ve(),D&&(D(),D=null),ee&&(ee(),ee=null),ye&&(ye(),ye=null),e.replaceChildren(),F=[],G=[],V=[],ie=[],Y=[],B=[],M=new Map,re=new Map}}}function ms(e,t){return e.filter(n=>{let r=Co(n);return!(r&&t.has(r))})}async function wm(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}var En=e=>e??Gt;async function Rn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function Er(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function gs(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function km(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${Er(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Er(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function nr(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await km(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var $m=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],mu={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},xm=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Kt(e){return typeof e=="string"&&e.length>0?e:null}function Gr(e){return e.startsWith("gpt-")?e.slice(4):e}function jt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function bu(e,t,n){let r=Kt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Kt(n[e]);return s===null?null:{value:s,source:"global"}}function bs(e,t,n,r){return bu(e,t,n)||{value:r,source:"base"}}function gi(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let a=Kt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let a of Object.values(s))if(sn(a)){let i=Kt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Kt(r?.runners?.[o]?.models?.[e]?.id)||e}function Am(e,t){return Kt(t?.review?.reviewers?.[e]?.model)||e}function Kr(e,t,n=!1){if(e==="default")return jt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Gr(e):e;return jt(e,t,r,e,"explicit")}function hu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Sm(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function Em(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of Sm(t,n)){let o=hu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function bi(e){return jt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function gu(e,t,n){let r=bu(e,t,n);return r?Kr(r.value,r.source):jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Tn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,a=sn(e.runner_catalog)?e.runner_catalog:null,i=Kt(n.quick_fix_impl_model),l=Em(i,s,a),u={};if(s){let d=bs("workflow_mode",t,n,Kt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?jt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Kr(d.value,d.source);for(let Y of["spec_review","plan_review","impl_review"]){let B=`${Y}_model`,q=Kt(Y==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),W=bs(B,t,n,q);if(W.value===null)u[B]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(W.value!=="self"&&W.value!=="skip"&&!sn(s.review?.reviewers?.[W.value]))u[B]=bi(jt(W.value,W.source,"",null,"explicit"));else{let L=Am(W.value,s);u[B]=jt(W.value,W.source,Gr(L),L,W.source==="base"?"default":"explicit")}}for(let[Y,B]of Object.entries(mu)){let q=u[B].value;if(q==="self"||q==="skip"){u[Y]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let W=Kt(s.review?.reviewers?.[q||""]?.effort),L=bs(Y,t,n,W);u[Y]=L.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let m=sn(s.implementation?.default)?s.implementation.default:{},y=Kt(e.route),b=y!==null&&["quick_fix","spec_backed","full_plan"].includes(y),k=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},F=b&&sn(k[y])?k[y]:{};for(let Y of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let B=bs(Y,t,n,Y==="impl_dispatch"?Kt(F.dispatch)||Kt(m.dispatch):Kt(m[Y.replace("impl_","")]));u[Y]=B.value===null?jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):jt(B.value,B.source,B.value,B.value,B.source==="base"?"default":"explicit")}let G=Kt(t.impl_runtime),V=G==="inherit"?Kt(e.controller_runtime):G,ie=y==="quick_fix"&&Kt(t.impl_dispatch)===null&&l.runtime!==null&&(G===null||V===l.runtime);if(ie){let Y=l.runtime,B=i;u.impl_dispatch=jt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),G===null&&(u.impl_runtime=jt(Y,"global",`${Y} (\uC720\uB3C4)`,Y,"explicit")),Kt(t.impl_model)===null&&(u.impl_model=jt(B,"global",B,B,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let Y of["impl_runtime","impl_model","impl_effort","impl_speed"])u[Y]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!ie&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let Y=u.impl_runtime.value==="inherit"?Kt(e.controller_runtime):u.impl_runtime.value,B=Y?hu(Y,s,a):[];if(u.impl_model.value!=="auto"&&B.length>0&&!B.includes(u.impl_model.value))u.impl_model=bi(u.impl_model);else{let q=gi(u.impl_model.value,Y,s,a);u.impl_model.display=Gr(q),u.impl_model.full_value=q}}if(u.impl_effort.value==="auto"){let Y=Kt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),B=Y?Kt(s.implementation?.effort_by_transport?.[Y]?.auto):null;B&&!xm.has(B)?(u.impl_effort.display=`${B} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=B,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",u.impl_speed.source))}}else for(let d of $m.filter(m=>!m.startsWith("orchestration_")))u[d]=gu(d,t,n);if(!s){for(let[d,m]of Object.entries(mu))(u[m].value==="self"||u[m].value==="skip")&&(u[d]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=jt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=gu(d,t,n);continue}let m=d.replace("orchestration_",""),y=Kt(o[m]),b=bs(d,t,n,y);if(d==="orchestration_effort"&&b.source==="base"){u[d]=jt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=jt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Kt(o.model_id)||b.value:gi(b.value,null,s,a);u[d]=jt(b.value,b.source,Gr(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?jt("default","base","default (\uC77C\uBC18)","default","default"):Kr("default",b.source);continue}u[d]=Kr(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=jt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Gr(d)})`,null,"default")}else if(l.runtime!==null){let d=gi(i,l.runtime,s,a);u.quick_fix_impl_model=jt(i,"global",Gr(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=bi(jt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Kr(i,"global");return u}function Tm(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function jo(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=m=>{let y={...r,...m};return Tn({pin:e.layer==="pin"?y:t,global:e.layer==="pin"?n:y,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Kt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Tm(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(m=>{let y=s({...o,[e.key]:m})[e.key];return{value:m,label:y.display,full_value:y.full_value}})}}function Vr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=m=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(m))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",m=>{m.key==="Enter"&&(m.ctrlKey||m.metaKey)&&(m.preventDefault(),d())}),t.addEventListener("cancel",m=>{m.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function hi(e){return`session:${e.provider}:${e.session_id}`}function hs(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function Cm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Yr(e,t,n,r){return{attempt_id:hi(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:hs(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:Cm(e,n)}}}var yi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Rm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",yu="\uBD84\uD574 \uC5C6\uB294 leg";function en(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Zn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Zr=[...Zn,"reasoning_output_tokens"],Om={codex:["implementation","review-consult"],claude:["subagent"]};function vi(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Zn.some(t=>Number.isFinite(e[t]))}function Lm(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))}function wi(e){let t=0;for(let n of Zn)t+=en(e?.[n]);return t}function Im(e){return!e||typeof e!="object"?!1:Zn.some(t=>Number.isFinite(e[t]))}function vu(e){return!e||typeof e!="object"?!1:Zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function Mm(e){let t={};for(let n of Zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function wu(e){let t={};for(let n of Zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ku(e,t){return vi(t)?en(t.total_tokens):e==="codex"?en(t.input_tokens)+en(t.output_tokens):wi(t)}function Pm(e){return e==="claude"?"Claude":"Codex"}function Dm(e){return`\u03C4 ${xu(e)}`}function Nm(e,t){let n=t.breakdown||{},r=en(t.total_only_subtotal);if(vi(n)||r>0&&!Lm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,Rm];return t.replayed&&u.push(yi),u.join(`
`)}let s=[`\uC785\uB825 ${en(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${en(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${en(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${en(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${en(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${en(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${en(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${yu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${yu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(yi),l.join(`
`)}function fn(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${Pm(n)} ${Dm(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:Nm(n,r)})}return t}function Uo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=en(i.total_only_subtotal)+en(a.total_only_subtotal));for(let l of Zr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=en(i.breakdown[l])+en(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ki(e){return!e||typeof e!="object"?null:Mn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function qm(e){return e==="codex"?"codex":"claude"}function Yn(){return{subtotal:0,breakdown:Mm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Bo(e,t,n){e.subtotal+=t.subtotal,vi(t.usage)&&(e.total_only+=t.subtotal);for(let r of Zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=en(e.breakdown[r])+en(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function $u(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function xu(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Qr(e){return Im(e)?`\u03C4 ${xu(wi(e))}`:null}function rr(e){let t=Qr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function ys(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${en(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${en(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${en(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${en(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${wi(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(yi),n.join(`
`)}function Mn(e,t){let n={claude:Yn(),codex:Yn()},r={orchestrator:{claude:Yn(),codex:Yn()},implementation:{claude:Yn(),codex:Yn()},"review-consult":{claude:Yn(),codex:Yn()},subagent:{claude:Yn(),codex:Yn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(vu(l)){let d=qm(i.runner),m=wu(l),y={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:m,subtotal:ku(d,m)};m.replayed===!0&&(y.replayed=!0),typeof i.model=="string"&&(y.model=i.model),typeof i.session_id=="string"&&(y.session_id=i.session_id),Bo(n[d],y,!0),Bo(r.orchestrator[d],y,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let m=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!Om[m].includes(d.role)||!vu(d.usage))continue;let y=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!y||s.has(y))continue;s.add(y);let b=wu(d.usage),k={provider:m,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:ku(m,b)};k.receipt_id=y,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),Bo(n[m],k,!1),Bo(r[k.role][m],k,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=$u(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...$u(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}function Au(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let m=Number(n.get(l))<Number(n.get(d)),y=Number(i.get(l))>Number(i.get(d));m&&y&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var Fm="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",zo="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",jm="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Bm="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Xr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function vs(e,t){return`${e}\0${t}`}function Um(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Wm(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function $s(e,t){let n=e.entries,r=n.map(m=>m.bead_id),s=Um(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[m,y]of s)for(let b of y)o.push({blocker:b,blockee:m});let a=Wm(e,t),i=new Map(r.map((m,y)=>[m,y])),l=r.slice(0,a).filter(m=>s.get(m).some(y=>Number(i.get(y))>Number(i.get(m)))),u=Au(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(m=>[m.bead_id,m]));return{entries:[...n.slice(0,a),...u.order.map(m=>d.get(m))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function Su(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:$s(n,t)}function zm(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Hm(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Gm(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function $i(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Km(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(vs(a,l));let r=new Map,s=new Map;for(let a of e){let i=vs(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=vs(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Vm(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Ym(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function Wo(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function xi(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function xs(e){let t=Gm(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Hm(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,m)=>{if(s.refusal!==null||u===d)return;let y=t.get(u)||[];if(y.includes(d))return;let b=o(u);if(b!==null){if($i(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...y,d]),m!==void 0&&r.add(vs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,...m===void 0?{}:{lane_id:m}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let m=t.get(u)||[];if(!m.includes(d))return;let y=o(u);y!==null&&(t.set(u,m.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:y}))},laneCreated:(u,d)=>r.has(vs(u,d))}}function As(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Km(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:zm(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function Eu(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function ws(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function Tu(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function Cu(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push(Wo(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function ks(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Ho(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function Ai(e,t,n){let r=xs(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:Fm};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:jm};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xi(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Xr}}if(e.kind==="chain"&&d===void 0)return{refused:Xr};let m=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(Y=>Y.bead_id===e.bead_id);if(k<0)return;let F=k>0?d.entries[k-1]:null,G=k+1<d.entries.length?d.entries[k+1]:null,V=ws(d,k),ie=G!==null&&ws(d,k+1);V&&F!==null&&r.removeDep(e.bead_id,F.bead_id),ie&&G!==null&&r.removeDep(G.bead_id,e.bead_id),(V||ie)&&F!==null&&G!==null&&r.addDep(G.bead_id,F.bead_id,u)},y=(k,F)=>{let G=n.cross_lanes.get(k),V=G.entries.findIndex(ge=>ge.bead_id===e.bead_id),ie=G.entries.filter(ge=>ge.bead_id!==e.bead_id),Y=Math.max(0,Math.min(ie.length,V>=0&&F>V?F-1:F)),B=-1;if(ie.forEach((ge,we)=>{n.fixed_members.has(ge.bead_id)&&(B=we)}),Y<=B){r.state.refusal=Bm;return}let q=V>=0?G.entries[V]:d?.entries.find(ge=>ge.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=$s({status:G.status,entries:[...ie.slice(0,Y),q,...ie.slice(Y)]},n);let W=i.entries;if(Ho(W,G.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:ks(W)}}),G.status!=="confirmed")return;let L=W.findIndex(ge=>ge.bead_id===e.bead_id),M=L>0?W[L-1].bead_id:null,re=L+1<W.length?W[L+1].bead_id:null;if(M===null){re!==null&&r.addDep(re,e.bead_id,k);return}if(r.addDep(e.bead_id,M,k),re!==null&&(r.graph.get(re)||[]).includes(M)){let ge=G.entries.findIndex(we=>we.bead_id===re);(r.laneCreated(re,M)||ge>0&&G.entries[ge-1].bead_id===M&&ws(G,ge))&&r.removeDep(re,M),r.addDep(re,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(m(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...Tu(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:ks(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&y(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Vm(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push(Wo(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let F=n.parallel_rows,G=F[Math.max(0,Math.min(F.length,t.marker_index))];if(!(!!G&&G.bead_id===e.bead_id)&&Ym(n,e.root_dir)&&b!==void 0){let ie=b>k?k:k-1;ie>=0&&ie!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:ie},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push(Wo(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push(Wo(e.bead_id,e.root_dir,t.index,t.lane_id));return As(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function Ru(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=$s(n,t);if(r.held)return{refused:zo};let s=r.entries,o=xs(t),a=[];Eu(o,s,e),o.state.refusal===null&&Cu(o,t,s,a);let i=Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ks(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),As(o,t,i,a,{lane_id:e,correction:r})}function Ou(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=$s(n,t),s=r.entries,o=xs(t),a=[];Eu(o,s,e),o.state.refusal===null&&Cu(o,t,s,a);let i=Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ks(s)}}];return As(o,t,i,a,{lane_id:e,correction:r})}function Lu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=$s(n,t),s=r.entries;return As(xs(t),t,Ho(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:ks(s)}}],[],{lane_id:e,correction:r})}function Iu(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Xr};let r=xs(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)ws(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return As(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:Tu(t,n,e,n.entries)})}function Mu(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;ws(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${xi(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function Pu(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function Du(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function Si(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${xi(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Nu={running:3,paused:2,failed:1};function Tr(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function qu(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function Fu(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Tr(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Tr(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),m=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!m&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Nu[u.run_state],m=Nu[i];if(d>m||d===m&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var Go=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Ti=[...Go.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],sr=["orchestration_model","orchestration_effort","orchestration_speed"],Ko=[...Go,...sr],Zm=Ti.filter(e=>Ko.includes(e)),ju=["delegated","main"],Vo=["inherit","claude","codex"],Ss=["default","fast"],Es=["standard","fast_track"],Ts=["codex","opus","fable","self","skip"],Yo=["codex","fable","skip"],Zo=["low","medium","high","xhigh"],Ln="auto";function On(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Bu(e){if(!On(e)||!On(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))On(r)&&On(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Jr(e,t){let n=Bu(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Ln,...r.flatMap(([,s])=>s)]}function Uu(e,t,n,r){if(!On(e)||!On(e.runners))return[Ln];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!On(a)||!On(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Ln&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Ln,...s]}function es(e,t,n){return Uu(e,t,n,(r,s)=>On(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Ci(e,t,n){return Uu(e,t,n,(r,s)=>On(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:On(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Cs(e,t){let n=Bu(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function Wu(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Jr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!es(t,s,r.impl_model||Ln).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var Qm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Ei=[...Zm,...sr],Xm=[...Ko,...Ti].filter((e,t,n)=>n.indexOf(e)===t&&!Ei.includes(e));function zu(e,t){let n=On(e)?e:{},r=On(t)?t:{},s=[];for(let a of Ei){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:Qm[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...Xm,...Object.keys(r)])!Ei.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ri(e,t,n,r,s,o){return jo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function Hu(e,t){let n={};for(let r of Ti){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function Gu(e,t){let n={};for(let r of sr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Oi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...sr]}],pr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Qo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Li(e,t,n,r,s,o=null){let a=Tn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Ku(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of Li(e,t,n,r,s,o))a[i.source]+=1;return a}function Vu(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function Yu(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var qk=[...Go,...sr];var Zu=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Rs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Xo(e){if(!Rs(e)||!Rs(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Rs(n)&&Rs(n.models));return t.length>0?t:null}function Fn(e,t){let n=Xo(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function Qu(e,t){return Rs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Xu(e,t){let n=Xo(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return Qu(r,r.models[t]);return[]}function Jm(e){let t=Xo(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of Qu(r,s))n.includes(o)||n.push(o);return n}function eg(e,t){if(!t)return Jm(e);let r=Xo(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Xu(e,o))s.includes(a)||s.push(a);return s}function Ju(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Fn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Xu(t,r.impl_model):eg(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}var Ii=new Set(["unavailable","not_applicable"]);function fr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function ed(e){return e.filter(t=>t!==null).join(" \xB7 ")}function _r(e,t){return t===null?null:`${pr[e]}: ${t.display} (${Qo[t.source]})`}function Mi(e){return e.filter(t=>t!==null).join(`
`)}function Os(e){if(typeof e!="object"||e===null)return null;let t=Er(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:Mi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(pr.orchestration_model,e.model),n(pr.orchestration_effort,e.effort),n(pr.orchestration_speed,e.speed)])}}function Cr(e,t){let n=fr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=fr(e,"orchestration_effort"),s=fr(e,"orchestration_speed"),o=ed([Fn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Mi(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",_r("orchestration_model",n),_r("orchestration_effort",r),_r("orchestration_speed",s)])}}function tg(e,t){return e===null||e.value===null||Ii.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function ng(e){return e===null||Ii.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function rg(e){return e===null?null:e.value==="auto"?"auto":Ii.has(e.resolution)?null:e.display}function mr(e,t){if(typeof e!="object"||e===null)return null;let n=fr(e,"impl_dispatch"),r=fr(e,"impl_runtime"),s=fr(e,"impl_model"),o=fr(e,"impl_effort"),a=fr(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":ed([tg(r,t??null),ng(s),rg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Mi(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",_r("impl_dispatch",n),_r("impl_runtime",r),_r("impl_model",s),_r("impl_effort",o),_r("impl_speed",a)])}}function Jo(e){return e.replace(/\/+$/,"")}function sg(e,t){let n=Jo(e),r=Jo(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ea(e,t){let n=new Set;for(let r of e)for(let s of t){if(!sg(r,s))continue;let o=Jo(r),a=Jo(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function ta(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function nd(e){return e==="session"?"bead\uAC00 in_progress\uB85C \uC7A1\uD78C \uB4A4 \uB2EB\uD788\uAE30\uAE4C\uC9C0\uC758 \uACBD\uACFC":"attempt \uC2E4\uD589 \uC2DC\uAC04 \uD569\uC0B0 (\uC7AC\uAC1C \uC138\uC158 \uD3EC\uD568)"}function Is(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function na(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ra(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function sa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function og(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:ta(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function rd(e,t){let n=og(e,t);return n?c`<button
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
            title=${n.deploy.at?pn(n.deploy.at):""}
            >${sa(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Is(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function ts(e){let t=Sn(e.created_at),n=Sn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${pn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${pn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function ag(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ms(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function oa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function jn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,y)=>(m.requested_at||0)-(y.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?ag(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Ls(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var ig={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function sd(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:ig[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function aa(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
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
      >`:""}`}function lg(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function ia(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${a?c`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?c`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${i.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
                data-root-dir=${i.root_dir||""}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?lg(s):""}
  </div>`}function la(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function cg(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function od(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ad(e,t){return!e||typeof t!="number"?"":c`<a
    class="worker-mini__pr"
    href=${e}
    target="_blank"
    rel="noreferrer noopener"
    title="PR 열기"
    >#${t} ↗</a
  >`}function ca(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function ug(e){let t=Array.isArray(e.badges)?e.badges:[],n=fn(e.usage),r=rr(e.usage),s=Sn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${ad(e.pr_url,e.pr_number)}${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${pn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${ys(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title=${nd(e.work_kind)}
            >작업 ${Is(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function Bn(e,t={}){if(e.lane==="done"&&e.done_layout==="three_line")return ug(e);let n=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],s=fn(e.usage),o=rr(e.usage),a=e.merge_step||null,i=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!i,u=l?Sn(e.done_at):"",d=n?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",m=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",y=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",k=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,F=e.lane==="done"?"":la(e.workflow),G=e.lane==="done"?"":od(e.from_id),V=ca(e.priority),ie=c`<span class="worker-mini__title">${e.title}</span>`,Y=ad(e.pr_url,e.pr_number),B=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",q=r.map(Ce=>Ce===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ce}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ce===e.completion_badge&&e.completion_title||""}
          >${Ce}</span
        >`),W=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",L=s.length>0?s.map(Ce=>c`<span class="worker-usage" title=${Ce.tooltip}
              >${Ce.label}</span
            >`):o?c`<span class="worker-usage" title=${ys(e.usage)}
            >${o}</span
          >`:"",M=a?c`<span
        class="merge-step${a.failed?" merge-step--failed":""}"
        style=${`--progress: ${a.percent}%`}
        >${a.label}${a.index>0?c`<span class="merge-step__n"
              >${a.index}/${a.total}</span
            >`:""}</span
      >`:"",re=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",ge=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",we=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",le=e.discard,_e=le?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${le?.attempt_id||""}
          data-operation-id=${le?.operation?.operation_id||""}
          data-discard-mode=${le?.confirmation||"unmerged"}
          ?disabled=${le?!le.enabled:e.discard_enabled===!1}
          title=${le?le.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${le?.label||"\uD3D0\uAE30"}
        </button>`:"",Ae=e.stale_work||null,Ge=Ae?c`${Ae.can_resume||Ae.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Ae.action_id}
            ?disabled=${Ae.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Ae.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Ae.action_id}
            ?disabled=${Ae.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Ae.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Ae.action_id}
            ?disabled=${Ae.locked}
          >
            다시 확인
          </button>`:""}`:"",be=Ae?c`<div class="worker-mini__stale">
        <strong>${Ae.title}</strong>
        <span>${Ae.summary}</span>
        <span>${Ae.cause}</span>
        ${Ae.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",J=e.revise_action?c`<button
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
        </button>`:"",Oe=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Ne=b||F||G||Oe||L?c`<div class="worker-chips">
          ${b}${F}${G}${Oe?aa(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${L}
        </div>`:"",T=ia(e.dependency_chips),te=Ls(e),Se=t.actions?t.actions:"",$e=!!(a||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||le?.operation||e.revise_action||Ae);return c`<div
    class="worker-mini${i?" worker-mini--card":""}${n?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${a?" worker-mini--merging":""}${a?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${a?`--progress: ${a.percent}%`:""}
    draggable=${n?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?c`<div class="worker-mini__row1">
            ${b}${k}${V}${G}${Y}${ie}${Se}
          </div>
          <div class="worker-mini__row2">
            ${L}${u?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${pn(e.done_at)}`}
                  >완료 ${u}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title=${nd(e.work_kind)}
                  >작업 ${Is(e.work_ms)}</span
                >`:""}${q}${M}
            <span class="worker-mini__actions"
              >${re}${ge}${we}${_e}</span
            >
            ${ts(e)}
          </div>`:i?c`<div class="worker-mini__head">
              ${d}${m}${k}${V}${Y}${B}${q}${y}${W}${Se}
            </div>
            <div class="worker-mini__body">${ie}${be}</div>
            ${T}${Ne}${$e?c`<div class="worker-mini__foot">
                  ${M}
                  <span class="worker-mini__actions"
                    >${re}${ge}${we}${_e}${J}${Ge}</span
                  >
                  ${Ls(e)}
                </div>`:""}
            ${ts(e)}`:c`<div class="worker-mini__line">
              ${d}${m}${k}${V}${ie}${Y}${B}${q}${y}${W}${M}${re}${ge}${we}${_e}${Se}
            </div>
            ${T}${Ne}${te} ${ts(e)}`}
  </div>`}function dg(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var pg={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50",iterative_user_judgment:"\uAD6C\uD604 \uC911 \uC0AC\uC6A9\uC790 \uD310\uB2E8 \uBC18\uBCF5 \uAC1C\uC785 \uD544\uC694 \u2014 \uBB38\uC548\xB7\uB808\uC774\uC544\uC6C3\xB7\uC124\uACC4 \uBBF8\uC138\uC870\uC815",visual_verification:"\uB80C\uB354 \uACB0\uACFC \uC0AC\uB78C \uD655\uC778 \uD544\uC694 \u2014 \uC2A4\uD06C\uB9B0\uC0F7\xB7\uBAA9\uC5C5\xB7\uB77C\uC774\uBE0C \uD398\uC774\uC9C0"};function Pi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=pg[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),m=ia(e.dependency_chips),y=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=la(l),k=od(e.from_id),F=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ca(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${cg(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?Do(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${m}
    ${y||b||k||F?c`<div class="worker-chips">
          ${y}${b}${k}${aa(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${dg(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${ts(e)}
  </div>`}function Qn(e){let t=!!e.collapsible&&!!e.collapsed,n=typeof e.count=="number"?e.count:e.items.length,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${n}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${En(e.id||void 0)}
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
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(s=>e.lane==="candidate"?Pi(s,e.place_menu,{onOpenDoc:e.onOpenDoc}):Bn(s))}
          </div>`}
  </section>`}function td(e,t,n){return c`<button
      type="button"
      class="worker-wait__area-toggle"
      data-area=${e}
      aria-expanded=${n?"false":"true"}
      aria-label=${`${t} ${n?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
    >
      ${n?"\u25B8":"\u25BE"}
    </button>
    <span class="worker-wait__area-name">${t}</span>`}function ua(e){let t=e.parallel,n=e.serial,r=t.drop||{};return c`<div class="worker-wait">
    <section
      class="worker-wait__area worker-wait__area--parallel${t.collapsed?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="worker-wait__area-hd">
        ${td("parallel","\uBCD1\uB82C \uC601\uC5ED",t.collapsed)}
        <span class="worker-wait__area-count">${t.count}</span>
      </header>
      ${t.collapsed?"":c`<div
            class="worker-wait__area-body"
            data-drop=${En(r.drop)}
            data-root-dir=${En(r.root_dir)}
            data-lane-id=${En(r.lane_id)}
            data-lane-length=${En(r.lane_length)}
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
        ${td("serial","\uC9C1\uB82C \uC601\uC5ED",n.collapsed)}
        ${n.header_control?n.header_control:""}
      </header>
      ${n.collapsed?"":c`<div class="worker-wait__area-body">
            ${n.notice?n.notice:""}
            ${n.extra_panes?n.extra_panes:""}
            ${n.lanes.map(s=>fg(s))}
          </div>`}
    </section>
  </div>`}function fg(e){let t=e.drop||{},n=e.badge?c`<span
        class="worker-lane__badge${e.held?" worker-lane__badge--held":""}"
        >${e.badge}</span
      >`:"";return c`<div
    class="worker-wait__lane${e.empty?" worker-wait__lane--empty":""}"
  >
    ${Qn({id:typeof e.pane_id=="string"?e.pane_id:`worker-pane-lane-${e.id}`,lane:e.id,title:e.title,items:[],count:e.count,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:c`${n}${e.header_control?e.header_control:""}`,body:c`<div
        class="worker-wait__rows"
        data-drop=${En(t.drop)}
        data-root-dir=${En(t.root_dir)}
        data-lane-id=${En(t.lane_id)}
        data-lane-length=${En(t.lane_length)}
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
  </div>`}function da(e){return e.count?c`<section
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
  </section>`:""}var id=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Ps=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function pa(e,t){let n=id.find(s=>s.step===e);if(!n)return null;let r=id.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function ld(e){let t=Ps.findIndex(n=>n.step===e);return Ps.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Rr(e){let t=Ps.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function _g(e){let t=Ps.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:Ps.length}}function fa(e){let t=_g(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Ni=new Set(["queued","running","retry_pending","repairing"]),cd=new Set(["failed","succeeded"]),mg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Ds={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},gg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Ds.base_containment,child_sweep:Ds.child_sweep,branch_cleanup:Ds.branch_cleanup,parent_close:Ds.parent_close};function bg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function hg(e,t,n){return!["verify","deploy"].includes(e.kind)||![...Ni,...cd].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function yg(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function Di(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=mg[s];if(!o)return null;let a=pa(n,`${r} ${o}`);return a?{...a,active:Ni.has(s),failed:s==="failed"}:null}function vg(e){return!e||typeof e!="object"?null:gg[e.step]||null}function Ns(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=vg(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=bg(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&hg(k,t,i)).sort(yg):[],u=a?l:[],d=u.find(k=>Ni.has(k.state));if(d)return Di(d);if(s)return s.step==="repo_operations"&&l[0]?Di(l[0],!0):null;let m=u.find(k=>cd.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return Di(m);if(r){let k=pa(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let y=typeof e.cleanup_cursor=="string"?Ds[e.cleanup_cursor]:null;if(!y)return null;let b=pa(y.step,y.label);return b?{...b,active:!0,failed:!1}:null}function _a(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var wg="\uBBF8\uC801\uC7AC";function qi(e,t){let n=Io(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function ud(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=qi(o,{id:l,location_label:s.get(l)||wg}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function Fi(e,t){return`${e}\0${t}`}function dd(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function ji(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function qs(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function pd(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${qs(s)})`,location_label:qs(s),scope:null,same_lane_ahead:!1};let a=ji(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function fd(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Fi(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=Fi(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,y=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of y){let F=r.get(k);F&&F!==u&&!b.includes(F)&&b.push(F)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let m=d.pop();if(m===l)return!0;!m||u.has(m)||(u.add(m),d.push(...s.get(m)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let m=n.get(d);o(d,i)&&m&&u.push(m)}u.length>0&&a.set(i,u)}return a}function _d(e,t){return Fi(e,t)}var md=1,Fs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],Ui=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ns={show_blocked:!0,spec:"all"},gd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function kg(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Tr(r)||(n=typeof r.status=="string"?r.status:null);return n}function $g(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Tr(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function xg(e,t){let{winners:n,resumed_from_ids:r}=Fu(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Mn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function bd(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function Bt(e){return e&&typeof e=="object"?e:{}}function Ag(e,t,n){let r=Bt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=y=>Tn({pin:y,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=hd(Cr(l,o),Cr(u,o)),m=hd(mr(l,null),mr(u,null));return d||m?{orchestration:d,worker:m}:null}function hd(e,t){return!e||t&&t.text===e.text?null:e}function yd(e,t){let n=ji(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Sg(e,t,n){let r=t.get(e);if(!r)return yd(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return qs(r)}function Eg(e,t,n,r){let s=t.get(e);if(!s)return{label:yd(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":qs(s),title:""}}function Tg(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Cg(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Rg(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let m=l.status==="confirmed"?"confirmed":"draft",y=Array.isArray(l.entries)?l.entries:[],b=[];y.forEach((V,ie)=>{let Y=V&&typeof V.bead_id=="string"?V.bead_id:"";if(Y.length===0)return;let B=V&&typeof V.root_dir=="string"?V.root_dir:"",q=n.get(Y),W=q?q.state:void 0,L=W==="running"||W==="pr_wait"||W==="done",M=!q||W==="runnable",re=q&&q.lane==="parallel"&&typeof q.position=="number"?q.position-1:null,ge=Eg(Y,n,r,t),we=b.length>0?b[b.length-1].id:null,le=m==="confirmed"&&we!==null&&!(t.get(Y)||[]).includes(we);b.push({id:Y,title:s.get(Y)||Y,root_dir:q?q.root_dir:B,workspace_name:q?q.workspace_name:o.get(B)||"",seq:ie+1,location_label:ge.label,location_title:ge.title,draggable:!L,fixed:L,done:W==="done",unplaced:M,mismatch:le,...re!==null?{queue_index:re}:{}})}),b.forEach((V,ie)=>{V.seq=ie+1});let k=b.length>0&&b.every(V=>V.done),F=b.filter(V=>!V.fixed&&a.armed_by_bead.get(V.id)!==d).map(V=>V.id),G=Cg(d,m,b,k,F,a);i.push({lane_id:d,status:m,draft:m==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:m==="draft"&&b.length>=2,has_mismatch:m==="confirmed"&&b.some(V=>V.mismatch||V.unplaced),unlaunched:F,...G})}),i}function Og(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function Lg(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:m,state:y}=Og(l,t,n);y!==void 0&&(l.scope_state=y),o.set(u,{cards:[l],scope:m})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let y of l.cards)y.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,m=a.get(d);m?m.push(l):a.set(d,[l])}let i=(l,u,d)=>{let m=u.cards[0],y={id:m.id,title:m.title,location_label:Sg(m.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(y):b.overlap_chips=[y]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let m=ea(l[u].scope,l[d].scope);m.length!==0&&(i(l[u],l[d],m),i(l[d],l[u],m))}}function Bi(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function ma(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function js(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...ns,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Fs.some(P=>P.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&u.set(P.root_dir,P);let d=new Map;for(let P of s)P&&typeof P.root_dir=="string"&&d.set(P.root_dir,P.name||P.root_dir);for(let P of r)P&&typeof P.root_dir=="string"&&d.set(P.root_dir,P.name||P.root_dir);let m=[],y=[],b=[],k=[],F=[],G=[],V=new Map,ie=new Map,Y=new Map,B=new Map,q=new Map,W=new Map,L=new Map,M=new Set,re=new Map,ge=new Map,we=new Map;for(let P of r){if(!P||typeof P.root_dir!="string")continue;let ae=P.root_dir,Ie=P.name||ae,qe=u.get(ae),Ze=qe&&typeof qe.revision=="number"?qe.revision:typeof P.revision=="number"?P.revision:0,st=Bt(P.attempts),mt=Bt(P.bead_titles);for(let[E,U]of Object.entries(mt))typeof U=="string"&&U.length>0&&we.set(E,U);let gt=Bt(P.bead_times),ne=Bt(P.pr_observations),Q=Bt(P.admission),We=Bt(P.revise_parked),ut=Bt(P.merge_queue_state),He=Bt(P.cleanup_failed),ve=Bt(P.discard_operations),Je=Bt(P.bead_blocked_by);Object.hasOwn(P,"bead_scope")&&re.set(ae,Bt(P.bead_scope));let lt=Bt(P.bead_workflow),dt=Bt(P.pr_activity),pt=Array.isArray(P.repo_operations)?P.repo_operations:[],Ut=Array.isArray(P.merge_queue)?P.merge_queue:[],Dt=new Set(Ut.filter(E=>E&&typeof E.bead_id=="string").map(E=>E.bead_id)),zt=new Map(Ut.filter(E=>E&&typeof E.bead_id=="string").map(E=>[E.bead_id,E])),Et=Array.isArray(P.queue)?P.queue:[];for(let E of[...Et,...Array.isArray(P.pr_wait)?P.pr_wait:[]])E&&typeof E.bead_id=="string"&&typeof E.armed_by_lane=="string"&&E.armed_by_lane.length>0&&W.set(E.bead_id,E.armed_by_lane);for(let E of Array.isArray(P.disarmed_on_load)?P.disarmed_on_load:[])typeof E=="string"&&E.length>0&&M.add(E);let Tt=(Array.isArray(P.serial_lanes)?P.serial_lanes:[]).filter(E=>E&&/^s[1-5]$/.test(E.id)&&Array.isArray(E.entries)),ot=Bt(P.lane_states),ze=typeof P.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(P.serial_lane_count))):Math.min(5,Tt.length);Y.set(ae,ze),B.set(ae,Et.length);let D=new Map(Tt.map(E=>[E.id,E])),ee=new Map;for(let E of Tt)for(let U of E.entries)U&&typeof U.bead_id=="string"&&ee.set(U.bead_id,E.id);for(let[E,U]of Object.entries(Je))Array.isArray(U)&&q.set(E,U.filter(ke=>typeof ke=="string"&&ke.length>0));let ye=Array.isArray(P.done)?P.done:[];for(let E of ye)E&&typeof E.bead_id=="string"&&G.push({id:E.bead_id,root_dir:ae,workspace_name:Ie});let O=new Map;for(let E of ye)E&&typeof E.bead_id=="string"&&typeof E.added_at=="number"&&O.set(E.bead_id,E.added_at);let z=E=>({id:E,title:mt[E]||E,root_dir:ae,workspace_name:Ie,expected_revision:Ze,draggable:!1,...Bt(gt[E]).created_at?{created_at:Bt(gt[E]).created_at}:{},...Bt(gt[E]).updated_at?{updated_at:Bt(gt[E]).updated_at}:{}}),Re=E=>{let U=lt[E]?.chips?.pr;return U&&typeof U.number=="number"&&typeof U.url=="string"?{pr_number:U.number,pr_url:U.url}:{}},A=E=>Object.hasOwn(Je,E)?{blocked_by:Array.isArray(Je[E])?Je[E].filter(U=>typeof U=="string"&&U.length>0):[]}:{},R=new Set;for(let[E,U]of xg(st,O)){R.add(E);let ke=U.run_state==="failed"?Tg(st,U.attempt_id):null;ke!==null&&L.set(E,ke),y.push({...z(E),lane:"running",...A(E),...ee.has(E)?{serial_lane_id:ee.get(E)}:{},attempt_id:U.attempt_id,run_state:U.run_state,status:U.status||void 0,workflow:lt[E]||null,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,last_activity:U.last_activity,legs:U.legs,runner:U.runner,model:U.model,effort:U.effort,speed:U.speed,resumed_from:U.resumed_from,continuation_mode:U.continuation_mode,usage:U.usage,exec_chips:{orchestration:Os(U),worker:null},discard:jn(ve,E,{attempt_id:U.attempt_id}),badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"})}for(let[E,U]of qu(st)){if(y.some(pe=>pe.id===E))continue;let ke=U.attempt,rt=U.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";y.push({...z(E),lane:"running",kind:"session",...A(E),attempt_id:typeof ke.attempt_id=="string"?ke.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:lt[E]||null,can_pause:!1,can_resume:!1,started_at:U.started_at,last_event_at:typeof ke.last_event_at=="number"?ke.last_event_at:null,last_activity:ke.last_activity&&typeof ke.last_activity=="object"?ke.last_activity:null,legs:Array.isArray(ke.legs)?ke.legs:[],runner:typeof ke.runner=="string"?ke.runner:null,model:typeof ke.model=="string"?ke.model:null,effort:typeof ke.effort=="string"?ke.effort:null,speed:typeof ke.speed=="string"?ke.speed:null,resumed_from:null,continuation_mode:null,usage:ke.usage&&typeof ke.usage=="object"?ke.usage:null,exec_chips:{orchestration:Os(ke),worker:null},discard:jn(ve,E,{merge_queued:!0}),badges:[U.origin==="auto"?`${rt} \xB7 \uC790\uB3D9`:rt],alert:!1})}for(let E of Array.isArray(P.session_active)?P.session_active:[]){let U=E&&E.bead_id;typeof U!="string"||R.has(U)||(R.add(U),Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&q.set(U,E.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)),typeof E.title=="string"&&E.title.length>0&&we.set(U,E.title),y.push({...z(U),title:E.title||mt[U]||U,lane:"running",kind:"session",status:"in_progress",started_at:Bi(E.started_at)??Bi(E.updated_at)??void 0,updated_at:Bi(E.updated_at)??void 0,workflow:E.workflow||null,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(ke=>typeof ke=="string"&&ke.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(E.session_refs)?E.session_refs:[],badges:[],alert:!1}))}for(let E of Array.isArray(P.pr_wait)?P.pr_wait:[]){let U=E&&E.bead_id;if(typeof U!="string"||R.has(U))continue;R.add(U);let ke=Bt(ne[U]),rt=Bt(ke.pr),pe=ke.gate?Bt(ke.gate):null,Ve=Dt.has(U),yt=zt.get(U)?.continuation_action||null,$t=!!yt&&yt.continuation===null,Lt=ut.active===U,Vt=E.external===!0,Nt=He[U]||null,on=Bt(dt[U]),Rt=Ns({bead_id:U,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:on.merge_progress||null,cleanup_failed:Nt,repo_operations:pt}),bn=_a(Rt),hn=!!pe&&pe.base_badge==="\uCDA9\uB3CC",Xt=!!Nt&&["child_sweep","branch_cleanup","parent_close"].includes(Nt.step)&&!!pe&&pe.tier==="merged",an=Vt&&!!Nt&&!!pe&&pe.tier==="merged",Qe=!!pe&&["closed_unmerged","review","undecidable"].includes(pe.tier)&&pe.reason!=="review_receipt_undetermined",je=jn(ve,U,{external:Vt,merge_active:Lt||Rt?.step==="merge",merge_queued:Ve,cleanup_active:bn,merged:!!Nt||pe?.tier==="merged"}),$=!!je.operation;b.push({...z(U),lane:"pr_wait",...A(U),workflow:lt[U]||null,pr_number:typeof rt.number=="number"?rt.number:null,pr_url:typeof rt.url=="string"?rt.url:void 0,external:Vt,usage:Mn(st,U),merge_step:Rt,badges:$t?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Rt?[pe?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Nt?[Rr(Nt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Rr(Nt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof pe?.gate_badge=="string"&&pe.gate_badge.length>0?[pe.gate_badge]:[],alert:Rt?Rt.failed===!0:!!Nt||Qe,reason:Nt&&Rt?.active!==!0?fa(Nt.step):"PR \uB300\uAE30",merge_action:pe?.tier==="merged"&&!Xt&&!an?!1:!Ve||$t,merge_enabled:!$&&($t||pe?.enabled===!0||hn||Xt||an),merge_label:$t?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":an||Xt?"\uC815\uB9AC \uC7AC\uAC1C":hn&&!Xt?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:$t?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?je.error?`\uD3D0\uAE30 \uC2E4\uD328: ${je.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${je.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:an?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":hn?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ve&&!$t,cancel_enabled:!Lt,continuation_mismatch:yt?.mismatch||null,discard:je,discard_action:je.action,discard_enabled:je.enabled,discard_title:je.title})}let X=(E,U,ke,rt)=>{let pe=E&&E.bead_id;if(typeof pe!="string"||R.has(pe))return null;R.add(pe);let Ve=We[pe],yt=jn(ve,pe),$t=yt.operation?yt:null,Lt={...z(pe),lane:U,workflow:lt[pe]||null,draggable:!$t,discard:$t||void 0,reason:bd(Q,pe),seq:ke+1,queue_position:ke+1,queue_index:ke,queue_length:rt,badges:Ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ve,revise_action:!!Ve,revise_enabled:!!Ve&&!$t,revise_title:Ve?Ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Vt=A(pe);return Object.hasOwn(Vt,"blocked_by")&&(Lt.blocked_by=Vt.blocked_by),Lt};for(let E=0;E<Et.length;E++){let U=X(Et[E],"queue",E,Et.length);if(!U)continue;k.push(U);let ke=V.get(ae);ke?ke.push(U):V.set(ae,[U])}let me=E=>{let U=b.find(Ve=>Ve.id===E&&Ve.root_dir===ae);if(U)return{id:E,title:U.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ke=y.find(Ve=>Ve.id===E&&Ve.root_dir===ae),rt=ke?ke.run_state:kg(st,E),pe=rt==="failed"||rt==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":rt==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:E,title:ke?ke.title:z(E).title,badge:pe}},oe=[];for(let E=0;E<Math.max(ze,Tt.length);E++){let U=`s${E+1}`,ke=D.get(U),rt=ke&&Array.isArray(ke.entries)?ke.entries:[],pe=Bt(ot[U]),Ve=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(Lt=>typeof Lt=="string"):[],yt=new Set(Ve),$t=[];for(let Lt=0;Lt<rt.length;Lt++){let Vt=rt[Lt]&&rt[Lt].bead_id;if(typeof Vt=="string"&&yt.has(Vt)){R.add(Vt);continue}let Nt=X(rt[Lt],U,Lt,rt.length);Nt&&($t.push(Nt),k.push(Nt))}$t.length===0&&Ve.length===0&&(ze<=1||E>=ze)||oe.push({id:U,index:E,items:$t,raw_length:rt.length,occupied_by:Ve,occupants:Ve.map(Lt=>me(Lt)),corrections:Array.isArray(pe.corrections)?pe.corrections.length:0,cycle:pe.cycle===!0,...$t.length===0&&Ve.length===0?{empty:!0}:{}})}ie.set(ae,oe);let Me=Array.from({length:ze},(E,U)=>{let ke=`s${U+1}`,rt=D.get(ke),pe=rt&&Array.isArray(rt.entries)?rt.entries:[],Ve=Bt(ot[ke]);return{id:ke,index:pe.length,length:pe.length,occupied_by:Array.isArray(Ve.occupied_by)?Ve.occupied_by.filter(yt=>typeof yt=="string"):[]}});for(let E of Array.isArray(P.runnable)?P.runnable:[]){let U=E&&E.bead_id;if(typeof U!="string"||R.has(U))continue;R.add(U);let ke=E.workflow&&typeof E.workflow=="object"?E.workflow:null,rt=ke&&typeof ke.route=="string"&&ke.route||(typeof E.route=="string"?E.route:null),pe=Ag(Bt(qe),E.exec_pins,rt);Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&q.set(U,E.blocked_by.filter(Ve=>typeof Ve=="string"&&Ve.length>0)),typeof E.title=="string"&&E.title.length>0&&we.set(U,E.title),Array.isArray(E.scope)&&ge.set(U,E.scope.filter(Ve=>typeof Ve=="string"&&Ve.length>0)),m.push({...z(U),title:E.title||mt[U]||U,lane:"runnable",draggable:!0,reason:bd(Q,U),created_at:E.created_at??void 0,updated_at:E.updated_at??void 0,status:typeof E.status=="string"?E.status:void 0,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",published:E.published===!0,workflow:ke||(rt?{route:rt,chips:{route:rt}}:null),...pe?{exec_chips:pe}:{},blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(Ve=>typeof Ve=="string"&&Ve.length>0)}:{},place_index:Et.length,place_lanes:Me})}for(let E of ye){let U=E&&E.bead_id;if(typeof U!="string"||R.has(U)||(R.add(U),o!==void 0&&typeof E.added_at=="number"&&E.added_at<o))continue;let ke=$g(st,U),rt=ke&&typeof ke.done_kind=="string"?ke.done_kind:null;F.push({...z(U),lane:"done",done:!0,done_layout:"three_line",usage:Mn(st,U),work_ms:ra(st,U),done_at:typeof E.added_at=="number"?E.added_at:void 0,done_kind:rt,...Re(U),badges:[...rt&&gd[rt]?[gd[rt]]:[],...na(st,U)]})}}let le=new Map;s.forEach((P,ae)=>{P&&typeof P.root_dir=="string"&&le.set(P.root_dir,ae)});let _e=n&&n.running_sort==="repo"?"repo":"started";y.sort((P,ae)=>{let Ie=P.kind==="session",qe=ae.kind==="session";if(Ie!==qe)return Ie?1:-1;if(Ie&&qe){let mt=ma(ae.updated_at)-ma(P.updated_at);return mt!==0?mt:P.id.localeCompare(ae.id)}if(_e==="repo"){let mt=le.get(P.root_dir)??Number.MAX_SAFE_INTEGER,gt=le.get(ae.root_dir)??Number.MAX_SAFE_INTEGER;if(mt!==gt)return mt-gt}let Ze=typeof P.started_at=="number"&&Number.isFinite(P.started_at)?P.started_at:null,st=typeof ae.started_at=="number"&&Number.isFinite(ae.started_at)?ae.started_at:null;return Ze!==null&&st!==null&&Ze!==st?Ze-st:Ze===null&&st!==null?1:Ze!==null&&st===null?-1:P.id.localeCompare(ae.id)}),F.sort((P,ae)=>(ae.done_at??0)-(P.done_at??0));let Ae=s.length>0?s:r.map(P=>({root_dir:P&&P.root_dir,name:P&&P.name,auto_advance:P&&P.auto_advance,auto_merge:P&&P.auto_merge,slots:P&&P.slots,revision:P&&P.revision,runner_catalog:P&&P.runner_catalog})),Ge=new Set(m.map(P=>P.root_dir)),be=[];for(let P of Ae){if(!P||typeof P.root_dir!="string")continue;let ae=V.get(P.root_dir)||[],Ie=ie.get(P.root_dir)||[];!(ae.length>0||Ie.some(Ze=>Ze.items.length>0||Ze.occupied_by.length>0))&&!Ge.has(P.root_dir)||be.push({root_dir:P.root_dir,name:P.name||P.root_dir,auto_advance:P.auto_advance===!0,auto_merge:P.auto_merge===!0,slots:typeof P.slots=="number"&&P.slots>=md?P.slots:md,revision:typeof P.revision=="number"?P.revision:0,runner_catalog:Bt(P.runner_catalog),items:ae,sublanes:{parallel:ae,serial:Ie},serial_lane_count:Y.get(P.root_dir)||0,raw_queue_length:B.get(P.root_dir)||0})}let J={runnable:m,runnable_all:m,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:be,running:y,pr_wait:b,done:F,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(B),owner_of:{}},Oe=dd(J);for(let P of G)Oe.has(P.id)||Oe.set(P.id,{root_dir:P.root_dir,workspace_name:P.workspace_name,lane:"done",state:"done"});for(let P of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){if(!Object.hasOwn(P,"blocked_by"))continue;let ae=Oe.get(P.id);P.blockers=(P.blocked_by||[]).map(Ie=>pd(Ie,ae,Oe,s))}for(let P of[...J.queue,...J.runnable,...J.running,...J.pr_wait]){let ae=(P.blockers||[]).map(qe=>{let Ze=Oe.get(qe.id)?.root_dir;return{...qi(P.id,qe),openable:!0,...typeof Ze=="string"&&Ze.length>0?{root_dir:Ze}:{}}});if(ae.length===0)continue;let Ie={predecessors:ae};P.dependency_chips=Ie}Lg(J,re,ge,Oe,s);let Ne=fd(J.queue_groups);for(let P of J.queue_groups)for(let ae of P.sublanes.serial){let Ie=Ne.get(_d(P.root_dir,ae.id));Ie&&(ae.cross_wait_peers=Ie)}J.chain_lanes=Rg(i&&Array.isArray(i.lanes)?i.lanes:[],q,Oe,s,we,d,{armed_by_bead:W,failed_by_bead:L,disarmed_lanes:M});let T=new Map;for(let P of[...J.queue,...J.runnable])T.has(P.id)||T.set(P.id,P);let te=new Set;for(let P of J.chain_lanes)for(let ae of P.rows){if(P.status==="confirmed"&&!ae.unplaced&&!ae.fixed&&te.add(ae.id),!P.draft&&!ae.unplaced)continue;let Ie=T.get(ae.id);Ie&&(Ie.cross_lane_chip={lane_id:P.lane_id,number:P.number,status:P.status,label:P.draft?`\uC5F0\uACB0 ${P.number} (draft)`:`\uC5F0\uACB0 ${P.number}`})}let Se=new Map(J.chain_lanes.map(P=>[P.lane_id,P.number]));for(let P of[...J.queue,...J.running]){let ae=W.get(P.id);if(typeof ae!="string"||ae.length===0)continue;let Ie=Se.get(ae);P.armed_lane_chip=Ie===void 0?{lane_id:ae,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ae,label:`\u25B6 \uC5F0\uACB0 ${Ie}`,orphan:!1}}let $e=[];for(let P of V.values())for(let ae of P)te.has(ae.id)||$e.push(ae);$e.sort((P,ae)=>{let Ie=P.workspace_name.localeCompare(ae.workspace_name);return Ie!==0?Ie:(P.queue_index??0)-(ae.queue_index??0)}),J.parallel_rows=$e;let Ce={};for(let[P,ae]of Oe)typeof ae.root_dir=="string"&&ae.root_dir.length>0&&(Ce[P]=ae.root_dir);for(let P of J.chain_lanes)for(let ae of P.rows)!Object.hasOwn(Ce,ae.id)&&ae.root_dir.length>0&&d.has(ae.root_dir)&&(Ce[ae.id]=ae.root_dir);J.owner_of=Ce;let he=J.runnable.length;J.runnable_all=J.runnable.slice();let Le=J.runnable;a.show_blocked||(Le=Le.filter(P=>P.blocked!==!0));let tt=Le.length;a.spec==="with"?Le=Le.filter(P=>P.published===!0):a.spec==="without"&&(Le=Le.filter(P=>P.published!==!0)),J.runnable_hidden={blocked:he-tt,spec:tt-Le.length};let xt=(P,ae)=>{let Ie=ma(ae.updated_at)-ma(P.updated_at);return Ie!==0?Ie:P.id.localeCompare(ae.id)},_t=l==="repo_spec"?(P,ae)=>{let Ie=P.published===!0?0:1,qe=ae.published===!0?0:1;return Ie!==qe?Ie-qe:xt(P,ae)}:xt;if(l==="updated_flat")J.runnable=Le.slice().sort(xt),J.runnable_sections=[];else{let P=new Map;for(let qe of Le){let Ze=P.get(qe.root_dir);Ze?Ze.push(qe):P.set(qe.root_dir,[qe])}let ae=[],Ie=[];for(let qe of Ae){if(!qe||typeof qe.root_dir!="string")continue;let Ze=(P.get(qe.root_dir)||[]).slice().sort(_t);P.delete(qe.root_dir),Ze.length!==0&&(ae.push({root_dir:qe.root_dir,name:qe.name||qe.root_dir,items:Ze.map(st=>({...st,workspace_name:""}))}),Ie.push(...Ze))}for(let[qe,Ze]of P){let st=Ze.slice().sort(_t);ae.push({root_dir:qe,name:st[0]?.workspace_name||qe,items:st.map(mt=>({...mt,workspace_name:""}))}),Ie.push(...st)}J.runnable=Ie,J.runnable_sections=ae}return J}var Ig="\uC0AC\uC774\uD074";function Mg(e){let t=new Map,n=r=>Array.isArray(r)?r.filter(s=>typeof s=="string"&&s.length>0):[];for(let r of Array.isArray(e)?e:[]){if(!r||typeof r!="object")continue;let s=r.bead_blocked_by&&typeof r.bead_blocked_by=="object"?r.bead_blocked_by:{};for(let[o,a]of Object.entries(s))Array.isArray(a)&&t.set(o,n(a));for(let o of[...Array.isArray(r.runnable)?r.runnable:[],...Array.isArray(r.session_active)?r.session_active:[]])o&&typeof o.bead_id=="string"&&Array.isArray(o.blocked_by)&&o.blocked_by.length>0&&t.set(o.bead_id,n(o.blocked_by))}return t}function Wi(e,t,n){let r=js(e,t),s=[],o=new Set,a=(l,u)=>{for(let d of l)o.has(d.id)||(o.add(d.id),s.push({bead_id:d.id,root_dir:d.root_dir,workspace_name:d.workspace_name,title:d.title,lane:u}))};a(r.running,"running"),a(r.pr_wait,"pr_wait"),a(r.queue,"queue"),a(r.runnable_all,"runnable");let i=n&&typeof n.root_dir=="string"&&n.root_dir.length?n.root_dir:null;return{issues:i===null?s:s.filter(l=>l.root_dir===i),blocked_by_map:Mg(e)}}function vd(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=$i(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Ig}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function wd(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var{entries:Rd,setPrototypeOf:kd,isFrozen:Pg,getPrototypeOf:Dg,getOwnPropertyDescriptor:Ng}=Object,{freeze:wn,seal:Pn,create:Zi}=Object,{apply:Qi,construct:Xi}=typeof Reflect<"u"&&Reflect;wn||(wn=function(t){return t});Pn||(Pn=function(t){return t});Qi||(Qi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});Xi||(Xi=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var ga=kn(Array.prototype.forEach),qg=kn(Array.prototype.lastIndexOf),$d=kn(Array.prototype.pop),Bs=kn(Array.prototype.push),Fg=kn(Array.prototype.splice),ha=kn(String.prototype.toLowerCase),zi=kn(String.prototype.toString),Hi=kn(String.prototype.match),Us=kn(String.prototype.replace),jg=kn(String.prototype.indexOf),Bg=kn(String.prototype.trim),Un=kn(Object.prototype.hasOwnProperty),vn=kn(RegExp.prototype.test),Ws=Ug(TypeError);function kn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return Qi(e,t,r)}}function Ug(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return Xi(e,n)}}function wt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ha;kd&&kd(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Pg(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Wg(e){for(let t=0;t<e.length;t++)Un(e,t)||(e[t]=null);return e}function or(e){let t=Zi(null);for(let[n,r]of Rd(e))Un(e,n)&&(Array.isArray(r)?t[n]=Wg(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=or(r):t[n]=r);return t}function zs(e,t){for(;e!==null;){let r=Ng(e,t);if(r){if(r.get)return kn(r.get);if(typeof r.value=="function")return kn(r.value)}e=Dg(e)}function n(){return null}return n}var xd=wn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gi=wn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ki=wn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zg=wn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Vi=wn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Hg=wn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ad=wn(["#text"]),Sd=wn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Yi=wn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ed=wn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ba=wn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Gg=Pn(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Kg=Pn(/<%[\w\W]*|[\w\W]*%>/gm),Vg=Pn(/\$\{[\w\W]*/gm),Yg=Pn(/^data-[\-\w.\u00B7-\uFFFF]+$/),Zg=Pn(/^aria-[\-\w]+$/),Od=Pn(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Qg=Pn(/^(?:\w+script|data):/i),Xg=Pn(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ld=Pn(/^html$/i),Jg=Pn(/^[a-z][.\w]*(-[.\w]+)+$/i),Td=Object.freeze({__proto__:null,ARIA_ATTR:Zg,ATTR_WHITESPACE:Xg,CUSTOM_ELEMENT:Jg,DATA_ATTR:Yg,DOCTYPE_NAME:Ld,ERB_EXPR:Kg,IS_ALLOWED_URI:Od,IS_SCRIPT_OR_DATA:Qg,MUSTACHE_EXPR:Gg,TMPLIT_EXPR:Vg}),Hs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},eb=function(){return typeof window>"u"?null:window},tb=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Cd=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Id(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:eb(),t=je=>Id(je);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Hs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:y,trustedTypes:b}=e,k=l.prototype,F=zs(k,"cloneNode"),G=zs(k,"remove"),V=zs(k,"nextSibling"),ie=zs(k,"childNodes"),Y=zs(k,"parentNode");if(typeof a=="function"){let je=n.createElement("template");je.content&&je.content.ownerDocument&&(n=je.content.ownerDocument)}let B,q="",{implementation:W,createNodeIterator:L,createDocumentFragment:M,getElementsByTagName:re}=n,{importNode:ge}=r,we=Cd();t.isSupported=typeof Rd=="function"&&typeof Y=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:_e,TMPLIT_EXPR:Ae,DATA_ATTR:Ge,ARIA_ATTR:be,IS_SCRIPT_OR_DATA:J,ATTR_WHITESPACE:Oe,CUSTOM_ELEMENT:Ne}=Td,{IS_ALLOWED_URI:T}=Td,te=null,Se=wt({},[...xd,...Gi,...Ki,...Vi,...Ad]),$e=null,Ce=wt({},[...Sd,...Yi,...Ed,...ba]),he=Object.seal(Zi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Le=null,tt=null,xt=Object.seal(Zi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),kt=!0,_t=!0,P=!1,ae=!0,Ie=!1,qe=!0,Ze=!1,st=!1,mt=!1,gt=!1,ne=!1,Q=!1,We=!0,ut=!1,He="user-content-",ve=!0,Je=!1,lt={},dt=null,pt=wt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ut=null,Dt=wt({},["audio","video","img","source","image","track"]),zt=null,Et=wt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Tt="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",ze="http://www.w3.org/1999/xhtml",D=ze,ee=!1,ye=null,O=wt({},[Tt,ot,ze],zi),z=wt({},["mi","mo","mn","ms","mtext"]),Re=wt({},["annotation-xml"]),A=wt({},["title","style","font","a","script"]),R=null,X=["application/xhtml+xml","text/html"],me="text/html",oe=null,Me=null,E=n.createElement("form"),U=function($){return $ instanceof RegExp||$ instanceof Function},ke=function(){let $=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Me&&Me===$)){if((!$||typeof $!="object")&&($={}),$=or($),R=X.indexOf($.PARSER_MEDIA_TYPE)===-1?me:$.PARSER_MEDIA_TYPE,oe=R==="application/xhtml+xml"?zi:ha,te=Un($,"ALLOWED_TAGS")?wt({},$.ALLOWED_TAGS,oe):Se,$e=Un($,"ALLOWED_ATTR")?wt({},$.ALLOWED_ATTR,oe):Ce,ye=Un($,"ALLOWED_NAMESPACES")?wt({},$.ALLOWED_NAMESPACES,zi):O,zt=Un($,"ADD_URI_SAFE_ATTR")?wt(or(Et),$.ADD_URI_SAFE_ATTR,oe):Et,Ut=Un($,"ADD_DATA_URI_TAGS")?wt(or(Dt),$.ADD_DATA_URI_TAGS,oe):Dt,dt=Un($,"FORBID_CONTENTS")?wt({},$.FORBID_CONTENTS,oe):pt,Le=Un($,"FORBID_TAGS")?wt({},$.FORBID_TAGS,oe):or({}),tt=Un($,"FORBID_ATTR")?wt({},$.FORBID_ATTR,oe):or({}),lt=Un($,"USE_PROFILES")?$.USE_PROFILES:!1,kt=$.ALLOW_ARIA_ATTR!==!1,_t=$.ALLOW_DATA_ATTR!==!1,P=$.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=$.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ie=$.SAFE_FOR_TEMPLATES||!1,qe=$.SAFE_FOR_XML!==!1,Ze=$.WHOLE_DOCUMENT||!1,gt=$.RETURN_DOM||!1,ne=$.RETURN_DOM_FRAGMENT||!1,Q=$.RETURN_TRUSTED_TYPE||!1,mt=$.FORCE_BODY||!1,We=$.SANITIZE_DOM!==!1,ut=$.SANITIZE_NAMED_PROPS||!1,ve=$.KEEP_CONTENT!==!1,Je=$.IN_PLACE||!1,T=$.ALLOWED_URI_REGEXP||Od,D=$.NAMESPACE||ze,z=$.MATHML_TEXT_INTEGRATION_POINTS||z,Re=$.HTML_INTEGRATION_POINTS||Re,he=$.CUSTOM_ELEMENT_HANDLING||{},$.CUSTOM_ELEMENT_HANDLING&&U($.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(he.tagNameCheck=$.CUSTOM_ELEMENT_HANDLING.tagNameCheck),$.CUSTOM_ELEMENT_HANDLING&&U($.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(he.attributeNameCheck=$.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),$.CUSTOM_ELEMENT_HANDLING&&typeof $.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(he.allowCustomizedBuiltInElements=$.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ie&&(_t=!1),ne&&(gt=!0),lt&&(te=wt({},Ad),$e=[],lt.html===!0&&(wt(te,xd),wt($e,Sd)),lt.svg===!0&&(wt(te,Gi),wt($e,Yi),wt($e,ba)),lt.svgFilters===!0&&(wt(te,Ki),wt($e,Yi),wt($e,ba)),lt.mathMl===!0&&(wt(te,Vi),wt($e,Ed),wt($e,ba))),$.ADD_TAGS&&(typeof $.ADD_TAGS=="function"?xt.tagCheck=$.ADD_TAGS:(te===Se&&(te=or(te)),wt(te,$.ADD_TAGS,oe))),$.ADD_ATTR&&(typeof $.ADD_ATTR=="function"?xt.attributeCheck=$.ADD_ATTR:($e===Ce&&($e=or($e)),wt($e,$.ADD_ATTR,oe))),$.ADD_URI_SAFE_ATTR&&wt(zt,$.ADD_URI_SAFE_ATTR,oe),$.FORBID_CONTENTS&&(dt===pt&&(dt=or(dt)),wt(dt,$.FORBID_CONTENTS,oe)),ve&&(te["#text"]=!0),Ze&&wt(te,["html","head","body"]),te.table&&(wt(te,["tbody"]),delete Le.tbody),$.TRUSTED_TYPES_POLICY){if(typeof $.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ws('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof $.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ws('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');B=$.TRUSTED_TYPES_POLICY,q=B.createHTML("")}else B===void 0&&(B=tb(b,s)),B!==null&&typeof q=="string"&&(q=B.createHTML(""));wn&&wn($),Me=$}},rt=wt({},[...Gi,...Ki,...zg]),pe=wt({},[...Vi,...Hg]),Ve=function($){let fe=Y($);(!fe||!fe.tagName)&&(fe={namespaceURI:D,tagName:"template"});let Fe=ha($.tagName),vt=ha(fe.tagName);return ye[$.namespaceURI]?$.namespaceURI===ot?fe.namespaceURI===ze?Fe==="svg":fe.namespaceURI===Tt?Fe==="svg"&&(vt==="annotation-xml"||z[vt]):!!rt[Fe]:$.namespaceURI===Tt?fe.namespaceURI===ze?Fe==="math":fe.namespaceURI===ot?Fe==="math"&&Re[vt]:!!pe[Fe]:$.namespaceURI===ze?fe.namespaceURI===ot&&!Re[vt]||fe.namespaceURI===Tt&&!z[vt]?!1:!pe[Fe]&&(A[Fe]||!rt[Fe]):!!(R==="application/xhtml+xml"&&ye[$.namespaceURI]):!1},yt=function($){Bs(t.removed,{element:$});try{Y($).removeChild($)}catch{G($)}},$t=function($,fe){try{Bs(t.removed,{attribute:fe.getAttributeNode($),from:fe})}catch{Bs(t.removed,{attribute:null,from:fe})}if(fe.removeAttribute($),$==="is")if(gt||ne)try{yt(fe)}catch{}else try{fe.setAttribute($,"")}catch{}},Lt=function($){let fe=null,Fe=null;if(mt)$="<remove></remove>"+$;else{let Ot=Hi($,/^[\r\n\t ]+/);Fe=Ot&&Ot[0]}R==="application/xhtml+xml"&&D===ze&&($='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+$+"</body></html>");let vt=B?B.createHTML($):$;if(D===ze)try{fe=new y().parseFromString(vt,R)}catch{}if(!fe||!fe.documentElement){fe=W.createDocument(D,"template",null);try{fe.documentElement.innerHTML=ee?q:vt}catch{}}let Ft=fe.body||fe.documentElement;return $&&Fe&&Ft.insertBefore(n.createTextNode(Fe),Ft.childNodes[0]||null),D===ze?re.call(fe,Ze?"html":"body")[0]:Ze?fe.documentElement:Ft},Vt=function($){return L.call($.ownerDocument||$,$,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Nt=function($){return $ instanceof m&&(typeof $.nodeName!="string"||typeof $.textContent!="string"||typeof $.removeChild!="function"||!($.attributes instanceof d)||typeof $.removeAttribute!="function"||typeof $.setAttribute!="function"||typeof $.namespaceURI!="string"||typeof $.insertBefore!="function"||typeof $.hasChildNodes!="function")},on=function($){return typeof i=="function"&&$ instanceof i};function Rt(je,$,fe){ga(je,Fe=>{Fe.call(t,$,fe,Me)})}let bn=function($){let fe=null;if(Rt(we.beforeSanitizeElements,$,null),Nt($))return yt($),!0;let Fe=oe($.nodeName);if(Rt(we.uponSanitizeElement,$,{tagName:Fe,allowedTags:te}),qe&&$.hasChildNodes()&&!on($.firstElementChild)&&vn(/<[/\w!]/g,$.innerHTML)&&vn(/<[/\w!]/g,$.textContent)||$.nodeType===Hs.progressingInstruction||qe&&$.nodeType===Hs.comment&&vn(/<[/\w]/g,$.data))return yt($),!0;if(!(xt.tagCheck instanceof Function&&xt.tagCheck(Fe))&&(!te[Fe]||Le[Fe])){if(!Le[Fe]&&Xt(Fe)&&(he.tagNameCheck instanceof RegExp&&vn(he.tagNameCheck,Fe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Fe)))return!1;if(ve&&!dt[Fe]){let vt=Y($)||$.parentNode,Ft=ie($)||$.childNodes;if(Ft&&vt){let Ot=Ft.length;for(let Yt=Ot-1;Yt>=0;--Yt){let tn=F(Ft[Yt],!0);tn.__removalCount=($.__removalCount||0)+1,vt.insertBefore(tn,V($))}}}return yt($),!0}return $ instanceof l&&!Ve($)||(Fe==="noscript"||Fe==="noembed"||Fe==="noframes")&&vn(/<\/no(script|embed|frames)/i,$.innerHTML)?(yt($),!0):(Ie&&$.nodeType===Hs.text&&(fe=$.textContent,ga([le,_e,Ae],vt=>{fe=Us(fe,vt," ")}),$.textContent!==fe&&(Bs(t.removed,{element:$.cloneNode()}),$.textContent=fe)),Rt(we.afterSanitizeElements,$,null),!1)},hn=function($,fe,Fe){if(We&&(fe==="id"||fe==="name")&&(Fe in n||Fe in E))return!1;if(!(_t&&!tt[fe]&&vn(Ge,fe))){if(!(kt&&vn(be,fe))){if(!(xt.attributeCheck instanceof Function&&xt.attributeCheck(fe,$))){if(!$e[fe]||tt[fe]){if(!(Xt($)&&(he.tagNameCheck instanceof RegExp&&vn(he.tagNameCheck,$)||he.tagNameCheck instanceof Function&&he.tagNameCheck($))&&(he.attributeNameCheck instanceof RegExp&&vn(he.attributeNameCheck,fe)||he.attributeNameCheck instanceof Function&&he.attributeNameCheck(fe,$))||fe==="is"&&he.allowCustomizedBuiltInElements&&(he.tagNameCheck instanceof RegExp&&vn(he.tagNameCheck,Fe)||he.tagNameCheck instanceof Function&&he.tagNameCheck(Fe))))return!1}else if(!zt[fe]){if(!vn(T,Us(Fe,Oe,""))){if(!((fe==="src"||fe==="xlink:href"||fe==="href")&&$!=="script"&&jg(Fe,"data:")===0&&Ut[$])){if(!(P&&!vn(J,Us(Fe,Oe,"")))){if(Fe)return!1}}}}}}}return!0},Xt=function($){return $!=="annotation-xml"&&Hi($,Ne)},an=function($){Rt(we.beforeSanitizeAttributes,$,null);let{attributes:fe}=$;if(!fe||Nt($))return;let Fe={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0},vt=fe.length;for(;vt--;){let Ft=fe[vt],{name:Ot,namespaceURI:Yt,value:tn}=Ft,ln=oe(Ot),xn=tn,Ht=Ot==="value"?xn:Bg(xn);if(Fe.attrName=ln,Fe.attrValue=Ht,Fe.keepAttr=!0,Fe.forceKeepAttr=void 0,Rt(we.uponSanitizeAttribute,$,Fe),Ht=Fe.attrValue,ut&&(ln==="id"||ln==="name")&&($t(Ot,$),Ht=He+Ht),qe&&vn(/((--!?|])>)|<\/(style|title|textarea)/i,Ht)){$t(Ot,$);continue}if(ln==="attributename"&&Hi(Ht,"href")){$t(Ot,$);continue}if(Fe.forceKeepAttr)continue;if(!Fe.keepAttr){$t(Ot,$);continue}if(!ae&&vn(/\/>/i,Ht)){$t(Ot,$);continue}Ie&&ga([le,_e,Ae],un=>{Ht=Us(Ht,un," ")});let cn=oe($.nodeName);if(!hn(cn,ln,Ht)){$t(Ot,$);continue}if(B&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Yt)switch(b.getAttributeType(cn,ln)){case"TrustedHTML":{Ht=B.createHTML(Ht);break}case"TrustedScriptURL":{Ht=B.createScriptURL(Ht);break}}if(Ht!==xn)try{Yt?$.setAttributeNS(Yt,Ot,Ht):$.setAttribute(Ot,Ht),Nt($)?yt($):$d(t.removed)}catch{$t(Ot,$)}}Rt(we.afterSanitizeAttributes,$,null)},Qe=function je($){let fe=null,Fe=Vt($);for(Rt(we.beforeSanitizeShadowDOM,$,null);fe=Fe.nextNode();)Rt(we.uponSanitizeShadowNode,fe,null),bn(fe),an(fe),fe.content instanceof o&&je(fe.content);Rt(we.afterSanitizeShadowDOM,$,null)};return t.sanitize=function(je){let $=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},fe=null,Fe=null,vt=null,Ft=null;if(ee=!je,ee&&(je="<!-->"),typeof je!="string"&&!on(je))if(typeof je.toString=="function"){if(je=je.toString(),typeof je!="string")throw Ws("dirty is not a string, aborting")}else throw Ws("toString is not a function");if(!t.isSupported)return je;if(st||ke($),t.removed=[],typeof je=="string"&&(Je=!1),Je){if(je.nodeName){let tn=oe(je.nodeName);if(!te[tn]||Le[tn])throw Ws("root node is forbidden and cannot be sanitized in-place")}}else if(je instanceof i)fe=Lt("<!---->"),Fe=fe.ownerDocument.importNode(je,!0),Fe.nodeType===Hs.element&&Fe.nodeName==="BODY"||Fe.nodeName==="HTML"?fe=Fe:fe.appendChild(Fe);else{if(!gt&&!Ie&&!Ze&&je.indexOf("<")===-1)return B&&Q?B.createHTML(je):je;if(fe=Lt(je),!fe)return gt?null:Q?q:""}fe&&mt&&yt(fe.firstChild);let Ot=Vt(Je?je:fe);for(;vt=Ot.nextNode();)bn(vt),an(vt),vt.content instanceof o&&Qe(vt.content);if(Je)return je;if(gt){if(ne)for(Ft=M.call(fe.ownerDocument);fe.firstChild;)Ft.appendChild(fe.firstChild);else Ft=fe;return($e.shadowroot||$e.shadowrootmode)&&(Ft=ge.call(r,Ft,!0)),Ft}let Yt=Ze?fe.outerHTML:fe.innerHTML;return Ze&&te["!doctype"]&&fe.ownerDocument&&fe.ownerDocument.doctype&&fe.ownerDocument.doctype.name&&vn(Ld,fe.ownerDocument.doctype.name)&&(Yt="<!DOCTYPE "+fe.ownerDocument.doctype.name+`>
`+Yt),Ie&&ga([le,_e,Ae],tn=>{Yt=Us(Yt,tn," ")}),B&&Q?B.createHTML(Yt):Yt},t.setConfig=function(){let je=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ke(je),st=!0},t.clearConfig=function(){Me=null,st=!1},t.isValidAttribute=function(je,$,fe){Me||ke({});let Fe=oe(je),vt=oe($);return hn(Fe,vt,fe)},t.addHook=function(je,$){typeof $=="function"&&Bs(we[je],$)},t.removeHook=function(je,$){if($!==void 0){let fe=qg(we[je],$);return fe===-1?void 0:Fg(we[je],fe,1)[0]}return $d(we[je])},t.removeHooks=function(je){we[je]=[]},t.removeAllHooks=function(){we=Cd()},t}var Md=Id();var ar={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ya=e=>(...t)=>({_$litDirective$:e,values:t}),rs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var Gs=class extends rs{constructor(t){if(super(t),this.it=Gt,t.type!==ar.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Gt||t==null)return this._t=void 0,this.it=t;if(t===In)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};Gs.directiveName="unsafeHTML",Gs.resultType=1;var Pd=ya(Gs);function nl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=nl();function Ud(e){Lr=e}var Zs={exec:()=>null};function Ct(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace($n.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var nb=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),$n={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},rb=/^(?:[ \t]*(?:\n|$))+/,sb=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ob=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Qs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ab=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rl=/(?:[*+-]|\d{1,9}[.)])/,Wd=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zd=Ct(Wd).replace(/bull/g,rl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ib=Ct(Wd).replace(/bull/g,rl).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),sl=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,lb=/^[^\n]+/,ol=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,cb=Ct(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ol).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ub=Ct(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rl).getRegex(),Aa="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",al=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,db=Ct("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",al).replace("tag",Aa).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hd=Ct(sl).replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Aa).getRegex(),pb=Ct(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hd).getRegex(),il={blockquote:pb,code:sb,def:cb,fences:ob,heading:ab,hr:Qs,html:db,lheading:zd,list:ub,newline:rb,paragraph:Hd,table:Zs,text:lb},Dd=Ct("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Aa).getRegex(),fb={...il,lheading:ib,table:Dd,paragraph:Ct(sl).replace("hr",Qs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Dd).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Aa).getRegex()},_b={...il,html:Ct(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",al).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Zs,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ct(sl).replace("hr",Qs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zd).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},mb=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,gb=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Gd=/^( {2,}|\\)\n(?!\s*$)/,bb=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Sa=/[\p{P}\p{S}]/u,ll=/[\s\p{P}\p{S}]/u,Kd=/[^\s\p{P}\p{S}]/u,hb=Ct(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ll).getRegex(),Vd=/(?!~)[\p{P}\p{S}]/u,yb=/(?!~)[\s\p{P}\p{S}]/u,vb=/(?:[^\s\p{P}\p{S}]|~)/u,wb=Ct(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nb?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Yd=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,kb=Ct(Yd,"u").replace(/punct/g,Sa).getRegex(),$b=Ct(Yd,"u").replace(/punct/g,Vd).getRegex(),Zd="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xb=Ct(Zd,"gu").replace(/notPunctSpace/g,Kd).replace(/punctSpace/g,ll).replace(/punct/g,Sa).getRegex(),Ab=Ct(Zd,"gu").replace(/notPunctSpace/g,vb).replace(/punctSpace/g,yb).replace(/punct/g,Vd).getRegex(),Sb=Ct("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Kd).replace(/punctSpace/g,ll).replace(/punct/g,Sa).getRegex(),Eb=Ct(/\\(punct)/,"gu").replace(/punct/g,Sa).getRegex(),Tb=Ct(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Cb=Ct(al).replace("(?:-->|$)","-->").getRegex(),Rb=Ct("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Cb).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ka=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Ob=Ct(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ka).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Qd=Ct(/^!?\[(label)\]\[(ref)\]/).replace("label",ka).replace("ref",ol).getRegex(),Xd=Ct(/^!?\[(ref)\](?:\[\])?/).replace("ref",ol).getRegex(),Lb=Ct("reflink|nolink(?!\\()","g").replace("reflink",Qd).replace("nolink",Xd).getRegex(),Nd=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,cl={_backpedal:Zs,anyPunctuation:Eb,autolink:Tb,blockSkip:wb,br:Gd,code:gb,del:Zs,emStrongLDelim:kb,emStrongRDelimAst:xb,emStrongRDelimUnd:Sb,escape:mb,link:Ob,nolink:Xd,punctuation:hb,reflink:Qd,reflinkSearch:Lb,tag:Rb,text:bb,url:Zs},Ib={...cl,link:Ct(/^!?\[(label)\]\((.*?)\)/).replace("label",ka).getRegex(),reflink:Ct(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ka).getRegex()},Ji={...cl,emStrongRDelimAst:Ab,emStrongLDelim:$b,url:Ct(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Nd).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ct(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Nd).getRegex()},Mb={...Ji,br:Ct(Gd).replace("{2,}","*").getRegex(),text:Ct(Ji.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},va={normal:il,gfm:fb,pedantic:_b},Ks={normal:cl,gfm:Ji,breaks:Mb,pedantic:Ib},Pb={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},qd=e=>Pb[e];function ir(e,t){if(t){if($n.escapeTest.test(e))return e.replace($n.escapeReplace,qd)}else if($n.escapeTestNoEncode.test(e))return e.replace($n.escapeReplaceNoEncode,qd);return e}function Fd(e){try{e=encodeURI(e).replace($n.percentDecode,"%")}catch{return null}return e}function jd(e,t){let n=e.replace($n.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split($n.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace($n.slashPipe,"|");return r}function Vs(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Db(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Bd(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Nb(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var $a=class{constructor(e){qt(this,"options");qt(this,"rules");qt(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Vs(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Nb(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=Vs(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Vs(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Vs(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=m,n.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let b=y,k=b.raw+`
`+n.join(`
`),F=this.blockquote(k);o[o.length-1]=F,r=r.substring(0,r.length-b.raw.length)+F.raw,s=s.substring(0,s.length-b.text.length)+F.text;break}else if(y?.type==="list"){let b=y,k=b.raw+`
`+n.join(`
`),F=this.list(k);o[o.length-1]=F,r=r.substring(0,r.length-y.raw.length)+F.raw,s=s.substring(0,s.length-b.raw.length)+F.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),y=e.split(`
`,1)[0],b=!m.trim(),k=0;if(this.options.pedantic?(k=2,d=m.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=m.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(y)&&(u+=y+`
`,e=e.substring(y.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex(k),G=this.rules.other.hrRegex(k),V=this.rules.other.fencesBeginRegex(k),ie=this.rules.other.headingBeginRegex(k),Y=this.rules.other.htmlBeginRegex(k);for(;e;){let B=e.split(`
`,1)[0],q;if(y=B,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),q=y):q=y.replace(this.rules.other.tabCharGlobal,"    "),V.test(y)||ie.test(y)||Y.test(y)||F.test(y)||G.test(y))break;if(q.search(this.rules.other.nonSpaceChar)>=k||!y.trim())d+=`
`+q.slice(k);else{if(b||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(m)||ie.test(m)||G.test(m))break;d+=`
`+y}!b&&!y.trim()&&(b=!0),u+=B+`
`,e=e.substring(B.length+1),m=q.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(m=>m.type==="space"),d=u.length>0&&u.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=jd(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(jd(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=Vs(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Db(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Bd(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Bd(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,m=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=m.slice(1,-1);return{type:"em",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}let y=m.slice(2,-2);return{type:"strong",raw:m,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Wn=class el{constructor(t){qt(this,"tokens");qt(this,"options");qt(this,"state");qt(this,"inlineQueue");qt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new $a,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:$n,block:va.normal,inline:Ks.normal};this.options.pedantic?(n.block=va.pedantic,n.inline=Ks.pedantic):this.options.gfm&&(n.block=va.gfm,this.options.breaks?n.inline=Ks.breaks:n.inline=Ks.gfm),this.tokenizer.rules=n}static get rules(){return{block:va,inline:Ks}}static lex(t,n){return new el(n).lex(t)}static lexInline(t,n){return new el(n).inlineTokens(t)}lex(t){t=t.replace($n.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace($n.tabCharGlobal,"    ").replace($n.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,m=t.slice(1),y;this.options.extensions.startInline.forEach(b=>{y=b.call({lexer:this},m),typeof y=="number"&&y>=0&&(d=Math.min(d,y))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},xa=class{constructor(e){qt(this,"options");qt(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match($n.notSpaceStart)?.[0],s=e.replace($n.endingNewline,"")+`
`;return r?'<pre><code class="language-'+ir(r)+'">'+(n?s:ir(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:ir(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ir(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Fd(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ir(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Fd(e);if(s===null)return ir(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${ir(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ir(e.text)}},ul=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},zn=class tl{constructor(t){qt(this,"options");qt(this,"renderer");qt(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new xa,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ul}static parse(t,n){return new tl(n).parse(t)}static parseInline(t,n){return new tl(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},wa,Ys=(wa=class{constructor(e){qt(this,"options");qt(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Wn.lex:Wn.lexInline}provideParser(){return this.block?zn.parse:zn.parseInline}},qt(wa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),qt(wa,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),wa),qb=class{constructor(...e){qt(this,"defaults",nl());qt(this,"options",this.setOptions);qt(this,"parse",this.parseMarkdown(!0));qt(this,"parseInline",this.parseMarkdown(!1));qt(this,"Parser",zn);qt(this,"Renderer",xa);qt(this,"TextRenderer",ul);qt(this,"Lexer",Wn);qt(this,"Tokenizer",$a);qt(this,"Hooks",Ys);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new xa(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new $a(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ys;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];Ys.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Ys.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await i.call(s,u);return l.call(s,m)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let m=await i.apply(s,u);return m===!1&&(m=await l.apply(s,u)),m})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Wn.lex(e,t??this.defaults)}parser(e,t){return zn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Wn.lex:Wn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?zn.parse:zn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Wn.lex:Wn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?zn.parse:zn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+ir(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},Or=new qb;function It(e,t){return Or.parse(e,t)}It.options=It.setOptions=function(e){return Or.setOptions(e),It.defaults=Or.defaults,Ud(It.defaults),It};It.getDefaults=nl;It.defaults=Lr;It.use=function(...e){return Or.use(...e),It.defaults=Or.defaults,Ud(It.defaults),It};It.walkTokens=function(e,t){return Or.walkTokens(e,t)};It.parseInline=Or.parseInline;It.Parser=zn;It.parser=zn.parse;It.Renderer=xa;It.TextRenderer=ul;It.Lexer=Wn;It.lexer=Wn.lex;It.Tokenizer=$a;It.Hooks=Ys;It.parse=It;var A$=It.options,S$=It.setOptions,E$=It.use,T$=It.walkTokens,C$=It.parseInline;var R$=zn.parse,O$=Wn.lex;function gr(e){let t=It.parse(e),n=Md.sanitize(t);return Pd(n)}function lr(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function ss(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ea(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var ep={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fb={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},jb=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Bb=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Hn(e){return!!e&&typeof e=="object"}function dl(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function pl(e,t){let n=dl(e),r=dl(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function tp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Hn(s)&&typeof s.text=="string"?s.text:"").join(""):Hn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Ub(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:ep[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=dl(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=pl(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=pl(Hn(i)?i.old_string:"",Hn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function fl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Wb=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function np(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>Hn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Wb,"").trim();return n.length>0?{kind:"user",text:n}:null}function _l(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=jb.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Bb.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function zb(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Hb(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(Hn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(_l(a.text));else if(a.type==="thinking"){let i=fl(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Ub(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Jd(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(Hn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=tp(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=np(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Jd([s],n):[s]}return[]}function Jd(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Gb(e){let t=typeof e.command=="string"?e.command:"",n=tp(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:ep.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Kb(e){if(e.type==="item.completed"&&Hn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[_l(t.text)];if(t.type==="user_message"){let n=np(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=fl(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Gb(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Vb(e){if(e.schema!=="codex-delegation-monitor-v1"||!Hn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&Hn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[_l(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=fl(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Fb[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Yb(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Zb(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return Hn(t)?t:null}function rp(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=Zb(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return zb(o,r);let a=o.schema==="codex-delegation-monitor-v1"?Vb(o):Yb(o)?Kb(o):Hb(o,n);return a.length>0&&(r.progress=null),a}}}function ml(e){let t=[],n=rp(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Qb=5,Xb=10,Jb=/Task\s+#(\d+)/,eh=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,th=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Xs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function nh(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function rh(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function sh(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Jb.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function oh(e){if(e.tool==="Bash"){let t=e.command||"";return eh.test(t)?"~ PR/\uAC8C\uC2DC \uC911":th.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ah(e){let t=e.filter(s=>s.kind==="tool").slice(-Xb),n=new Map;t.forEach((s,o)=>{let a=oh(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function ih(e){let t=rh(e);if(t)return{text:t,guess:!1};let n=sh(e);if(n)return{text:n,guess:!1};let r=ah(e);return r?{text:r,guess:!0}:null}function lh(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:Sn(e,t)}function os(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,m={},y=!0,b=new Set,k=new Set,F=null,G=null,V=!1,ie=!1,Y=!1,B=null,q=null;function W(){V=!1,ie=!1,Y=!1,B=null,q=null}async function L(ne){if(n){ie=!0,Y=!1,Le();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:ne,...u?{root_dir:u}:{}}));if(o!==ne)return;!Q||typeof Q!="object"||Array.isArray(Q)?Y=!0:(B=Q,q=ne)}catch{o===ne&&(Y=!0)}finally{o===ne&&(ie=!1,Le())}}}function M(){if(V=!V,V&&o&&q!==o){L(o);return}Le()}function re(){if(!V)return"";let ne=ss({loading:ie,error:Y});if(ne)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${ne}
      </div>`;if(!B)return"";if(B.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ea(B.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof B.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",B.task_prompt):""}
      ${typeof B.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",B.system_prompt):""}
    </div>`}function ge(){if(!l||!r)return[];let ne=r.get(l);return ml(ne?ne.lines:[])}function we(){if(!l||!r)return null;let ne=r.get(l),Q=ne?ne.last_event_at:null;return typeof Q=="number"?Q:null}function le(){return m.status==="running"}function _e(){if(le()&&o){G||(G=setInterval(()=>Le(),1e3));return}Ae()}function Ae(){G&&(clearInterval(G),G=null)}function Ge(ne){let Q=[],We=0;for(;We<ne.length;){let{idx:ut,line:He}=ne[We];if(He.kind==="tool"){let ve=We;for(;ve<ne.length&&ne[ve].line.kind==="tool"&&ne[ve].line.tool===He.tool;)ve+=1;if(ve-We>=Qb&&!k.has(ut)){Q.push({kind:"group",idx:ut,tool:He.tool||"",lines:ne.slice(We,ve)}),We=ve;continue}}Q.push({kind:"line",idx:ut,line:He}),We+=1}return Q}function be(ne){let Q=[],We=new Map;for(let ve=0;ve<ne.length;ve+=1){let Je=ne[ve],lt=Je.parent_tool_use_id;if(typeof lt=="string"&&lt.length>0){let dt=We.get(lt);dt||(dt={kind:"subagent",idx:ve,launch_id:lt,agent_type:null,header:null,lines:[]},We.set(lt,dt),Q.push(dt)),dt.lines.push({idx:ve,line:Je});continue}if(Je.kind==="tool"&&Je.tool==="Agent"&&typeof Je.launch_id=="string"&&Je.launch_id.length>0){let dt=J(Je),pt=We.get(Je.launch_id);if(pt){pt.header={idx:ve,line:Je},pt.agent_type=dt;continue}let Ut={kind:"subagent",idx:ve,launch_id:Je.launch_id,agent_type:dt,header:{idx:ve,line:Je},lines:[]};We.set(Je.launch_id,Ut),Q.push(Ut);continue}Q.push({kind:"entry",idx:ve,line:Je})}let ut=[],He=0;for(;He<Q.length;){if(Q[He].kind!=="entry"){ut.push(Q[He]),He+=1;continue}let ve=He;for(;ve<Q.length&&Q[ve].kind==="entry";)ve+=1;ut.push(...Ge(Q.slice(He,ve))),He=ve}return ut}function J(ne){let Q=ne.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Oe(ne){for(let Q=ne.length-1;Q>=0;Q-=1){let We=ne[Q];if(We.kind==="result"||We.kind==="error")return null;if(We.kind==="tool"&&!Object.hasOwn(We,"result"))return We}return null}function Ne(ne){for(let Q=ne.length-1;Q>=0;Q-=1)if(ne[Q].kind==="thinking")return ne[Q];return null}function T(ne,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${gr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let We=b.has(ne);return c`<div
        class="sv__think${We?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xt(ne)}
      >
        <span class="sv__think-line">💭 ${Xs(Q.text)}</span>
        ${We?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let We=b.has(ne);return c`<div
        class="sv__line sv__line--user${We?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>xt(ne)}
      >
        <span class="sv__user-line">▷ ${Xs(Q.text)}</span>
        ${We?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let We=b.has(ne),ut=Q.tool==="Bash"?nh(Q.command):0,He=Q.tool==="Bash"?ut>1?Xs(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${We?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>xt(ne)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${He?c`<span class="sv__tool-detail">${He}</span>`:""}
          ${ut>1?c`<span class="sv__tool-more">⋯ ${ut}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${We?c`<pre class="sv__tool-expand">${te(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${gr(Q.text||"")}</div>`}function te(ne){let Q=[];if(ne.tool==="Bash"&&typeof ne.command=="string"&&ne.command.length>0)Q.push(ne.command);else if(ne.input!==void 0)try{Q.push(`input: ${JSON.stringify(ne.input,null,2)}`)}catch{}return typeof ne.output=="string"&&ne.output.length>0&&Q.push(`output:
${ne.output}`),Q.join(`

`)}function Se(){if(!o)return c``;let ne=ge(),Q=(a?[m.agent_type,m.model,m.effort]:[m.runner,m.model,m.effort]).filter(Boolean).join(" \xB7 "),We=m.session_id||"",ut=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${y?"ON":"OFF"}`,He=le(),ve=He?lh(we(),Date.now()):"",Je=He?Oe(ne):null,lt=He?Ne(ne):null,dt=ih(ne);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${m.label||(a?m.role||"":o)}</span
        >
        ${dt?c`<span
              class="sv__stage${dt.guess?" sv__stage--guess":""}"
              title=${dt.text}
              >${dt.text}</span
            >`:""}
        ${He?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ve?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ve}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ve?c`<span class="sv__live-ago">${ve}</span>`:""}</span
            >`:""}
        ${We?c`<button
              type="button"
              class="sv__session"
              title=${We}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${We}`}
              @click=${()=>_t(We)}
            >
              ⧉ ${We.slice(0,8)}
            </button>`:""}
        ${m.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${m.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${m.resume_command}`}
              @click=${()=>_t(m.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${m.worktree?c`<span class="sv__wt" title=${m.worktree}
              >${m.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${V?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${V?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${M}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${y?" sv__follow--on":""}"
          aria-pressed=${y?"true":"false"}
          aria-label=${ut}
          @click=${kt}
        >
          <span class="sv__follow-full">⇣ ${ut}</span>
          <span class="sv__follow-short">⇣ ${y?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>gt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":re()}
      <div class="sv__body">
        ${ne.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:be(ne).map(pt=>pt.kind==="subagent"?Ce(pt):pt.kind==="group"?$e(pt):T(pt.idx,pt.line))}
      </div>
      ${Je||lt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Je?c`<span class="sv__now-icon">${Je.icon}</span>
                  <span class="sv__now-name">${Je.tool}</span>
                  <span class="sv__now-detail"
                    >${Je.tool==="Bash"?Xs(Je.command):Je.path||Je.command||""}</span
                  >`:""}
            ${lt?c`<span class="sv__now-think"
                  >💭 ${Xs(lt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function $e(ne){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>he(ne.idx)}
    >
      <span class="sv__group-icon">${ne.lines[0].line.icon}</span>
      <span class="sv__group-name">${ne.tool}</span>
      <span class="sv__group-count">${ne.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ce(ne){let Q=k.has(ne.idx),We=ne.header?ne.header.line:null,ut=We?We.is_error===!0?"\u2717":typeof We.result=="string"?"\u2713":"\u27F3":"",He=We&&We.command?We.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>he(ne.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${ne.agent_type||"subagent"}</span>
        ${He?c`<span class="sv__sub-detail">${He}</span>`:""}
        <span class="sv__sub-count">${ne.lines.length}줄</span>
        ${ut?c`<span class="sv__sub-state">${ut}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ge(ne.lines).map(ve=>ve.kind==="group"?$e(ve):T(ve.idx,ve.line))}
          </div>`:""}
    </div>`}function he(ne){k.add(ne),Le()}function Le(){it(Se(),e),_e(),y&&tt()}function tt(){let ne=e.querySelector(".sv__body");ne&&(ne.scrollTop=ne.scrollHeight)}function xt(ne){b.has(ne)?b.delete(ne):b.add(ne),Le()}function kt(){y=!y,Le()}function _t(ne){Rn(ne).then(Q=>{Q?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function P(ne){!o||!ne||(m={...m,...ne},Le())}function ae(ne){let Q=ne.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&y&&(y=!1,Le())}e.addEventListener("scroll",ae,!0);function Ie(ne){let Q=ne.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||gt()}let qe=!1;function Ze(){qe||(document.addEventListener("mousedown",Ie),qe=!0)}function st(){qe&&(document.removeEventListener("mousedown",Ie),qe=!1)}function mt(ne){let Q=ne&&ne.attempt_id;if(!Q)return;let We=typeof ne.launch_id=="string"&&ne.launch_id.length>0?ne.launch_id:null,ut=ne.session_ref&&typeof ne.session_ref=="object"?ne.session_ref:null;if(We&&ut)return;let He=l;o=Q,a=We,i=ut,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&He&&He!==l&&Promise.resolve(n("unsubscribe-session-log",{id:He})).catch(()=>{}),u=typeof ne.root_dir=="string"&&ne.root_dir.length>0?ne.root_dir:null,m=ne.meta||{},d=ne.hide_prompt===!0,y=!0,b.clear(),k.clear(),W(),!F&&r&&(F=r.subscribe(Le)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Ze(),Le()}function gt(){let ne=l;st(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),k.clear(),W(),Ae(),n&&ne&&Promise.resolve(n("unsubscribe-session-log",{id:ne})).catch(()=>{}),it(c``,e),s&&s()}return{open:mt,updateMeta:P,close:gt,isOpen(){return o!==null},destroy(){Ae(),st(),F&&(F(),F=null),e.removeEventListener("scroll",ae,!0),o=null,a=null,i=null,l=null,u=null,d=!1,it(c``,e)}}}function ch(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Ta(t.spec_id),s=Ta(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Ta(e){return typeof e=="string"?e.trim():""}function uh(e){let t=ch(e);if(t.path)return t;let n=Ta(sp(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function sp(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var dh=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Js(e){let t=uh(e),n=Ta(sp(e).spec_review),r=dh.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function ph(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function fh(e){let t=e&&e.metadata||{},n=Js(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:ph(t)?null:"plan_pending"}),r}function op(e,t){let n=fh(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var _h="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",mh=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gh=/^\*\*결론\*\* — (.+)$/;function Ca(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_h)return null;let n=mh.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?gh.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ap=20;function ip(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function bh(e){return e.length>ap?`${e.slice(0,ap)}\u2026`:e}function hh(e,t,n,r){let s=`${t.lane} ${bh(t.identifier)}`;return c`<div class="detail-report">
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
          >${s}</span
        >
        <span class="detail-report__time">${ip(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${gr(t.body)}
        </div>`:""}
  </div>`}function yh(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ip(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${gr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function lp(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Ca(typeof l.text=="string"?l.text:"");return u?hh(l,u,t,s.has(l.id)):yh(l)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${l=>t.onDraftInput&&t.onDraftInput(l.target.value)}
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
  `}var{I:px}=Ec;var cp=e=>e.strings===void 0;var vh={},up=(e,t=vh)=>e._$AH=t;var Ir=ya(class extends rs{constructor(e){if(super(e),e.type!==ar.PROPERTY&&e.type!==ar.ATTRIBUTE&&e.type!==ar.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!cp(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===In||t===Gt)return t;let n=e.element,r=e.name;if(e.type===ar.PROPERTY){if(t===n[r])return In}else if(e.type===ar.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return In}else if(e.type===ar.ATTRIBUTE&&n.getAttribute(r)===t+"")return In;return up(e),t}});var wh=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],gl={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},dp={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},kh={pin:"pin",global:"global",base:"base"};function $h(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${kh[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function xh(e,t,n){switch(e){case"workflow_mode":return Es;case"spec_review_model":case"impl_review_model":return Ts;case"plan_review_model":return Yo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return Zo;case"impl_dispatch":return ju;case"impl_runtime":return Vo;case"impl_model":return Jr(n,t.impl_runtime);case"impl_effort":return es(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Ss;case"orchestration_model":return Cs(n,null);case"orchestration_effort":return es(n,void 0,t.orchestration_model||Ln).filter(r=>r!==Ln);default:return[]}}function Ah(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${$h(e.source)}
    <span class="detail-effective__k"
      >${pr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Qo[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${pr[e.key]||e.key} \uD3B8\uC9D1`}
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
  </div>`}function pp(e,t){let n=Oi.flatMap(l=>l.keys),r=Li(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Ku(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${Sh(o)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Oi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=jo({key:u.key,choices:xh(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Ah(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ir(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Sh(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Eh(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function fp(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Eh(n.exec_receipt),l=i?tr(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=qo(n.planned_execution,n.exec_receipt),m=n.chips?.pr?.number,y=typeof m=="number"?`PR #${m}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >${y}</a
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${Th(s).map(b=>Ch(b,t,r,{label:b.id==="pr"?y:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function Th(e){let n=typeof e=="string"&&Object.hasOwn(gl,e)&&gl[e]||gl.spec_backed;return wh.filter(r=>n.includes(r.id))}var Ra={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function Ch(e,t,n,r){let s=Rh(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",m=u?Ra.stale:i?Ra.on:l?Ra.current:Ra.none,y=Oh(e,n),b=`${r.label} \xB7 ${m}${y?` \xB7 ${y}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,F=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${F}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${F}</span
  >`}function Rh(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function Oh(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(dp,n)?dp[n]:""}function Oa(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function _p(e){return Oa(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function mp(e,t){let n=e&&e[t];if(!Oa(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(_p),s=_p(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function hp(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function La(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${hp(e)}${t}`}function as(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${hp(e)}`}function Lh(e,t,n){if(n!==null){let s=e==="claude"?La:as,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:as({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function gp(e,t){if(!Oa(e)||e.state!=="usable"||!Oa(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function bp(e){let t=e.provider_key==="claude"?La:as,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Lh(e.provider_key,e.provider,e.workspace_default)}
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
  </div>`}function yp({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${bp({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:mp(t,"claude"),selected:s,workspace_default:gp(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${bp({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:mp(t,"codex"),selected:o,workspace_default:gp(n,"codex_account"),handlers:r})}
    </div>
  </section>`}function Ih(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Mh(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function Ia(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(F){F.key==="Escape"&&s&&(F.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ih(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${gr(a)}`}
          </div>
        </div>
      </div>
    `:c``}function m(){it(d(),e)}async function y(F,G={}){s=F,o="loading",a="",i=null,l="",m();let V=G.workspace||(n?n():"");if(!V){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",m();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",m();return}let ie="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(F);try{let Y=await r(ie),B=await Y.json().catch(()=>({}));if(!Y.ok||!B||B.ok!==!0){if(B?.error==="not_found"&&G.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",m();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(B&&B.error||Y.status)+")",m();return}let q=Mh(String(B.content||""));i=q.front,a=q.body,o="ready",m()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",m()}}function b(){s=null,it(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:y,close:b,destroy:k}}var Ph=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],kp="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",Ma=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Dh=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function vp(e){return typeof e=="string"&&Dh.has(e)}var Nh=["running","done","failed","interrupted"],qh={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Fh(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jh(e){let t=fn(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Qr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${kp}
          >부분 집계</span
        >`:""}`}function wp(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function yl(e){if(typeof e=="number")return eo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?eo(t):""}function Bh(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Uh(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function bl(e){return e===null||typeof e=="string"&&e.trim().length>0}function hl(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Wh(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!Ma.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?bl(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||bl(t.effort))||!(!("agent_type"in t)||bl(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Nh.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!hl(t.started_at)||!hl(t.last_event_at)||!hl(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function zh(e,t,n){let s=fn({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${yl(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${yl(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Hh(e,t,n,r){let s=e.status==="running"?null:t,a=(s?fn({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?eo(e.last_event_at):s?yl(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Bh(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Uh(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${qh[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Gh(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Kh(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let m=Wh(d);!m||s.has(m.launch_id)||vp(m.agent_type)||(s.add(m.launch_id),r.push(m))}r.sort((d,m)=>(d.started_at||0)-(m.started_at||0));let a={};for(let{role:d,provider:m}of Ma){let y=t?t.roles[d]?.[m]:null;a[d]=y?[...y.legs]:[]}let i=Ma.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:m}of Ma){for(let y of r.filter(b=>b.role===d&&b.provider===m)){let b=i.find(k=>k.receipt_id===y.launch_id)||null;b&&!Gh(y,b)||(b&&l.add(b.receipt_id),u.push(Hh(y,b,e.attempt_id,n)))}for(let y of a[d])!l.has(y.receipt_id)&&!vp(y.agent_type)&&u.push(zh(d,m,y))}return u}function Vh(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Ph,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Fh(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${kp}</span>`:""}
  </div>`}var Yh={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function eo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Zh(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Qh={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Xh(e,t){let n=Qh[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${hi(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${hs(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${eo(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function $p(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],i=a.map(b=>Xh(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let F=typeof b.session_id=="string"&&b.session_id.length>0,G=u.has(b.attempt_id),V=F&&!G,ie=F?G?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!V}
      title=${ie}
      @click=${Y=>{Y.stopPropagation(),V&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},m=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let F=b.cause_detail,G=F&&typeof F.reason=="string"&&F.reason.length>0?typeof F.command=="string"&&F.command.length>0?`${F.reason} \xB7 ${F.command}`:F.reason:b.cause;return c`<div class="detail-session__cause" title=${G}>
      ${b.cause}
    </div>`},y=b=>{let k=wp(ki(b));if(fn(k).length===0&&!Qr(b.usage))return"";let F=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${F?"true":"false"}
      title=${F?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${G=>{G.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${jh(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let k=ki(b),F=wp(k),G=fn(F);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Yh[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${gs(b)?c`<span
                  class="detail-session__resumed"
                  title=${gs(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Er(b)}</span>
            ${G.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${G.length>0?G.map(V=>c`<span
                      class="detail-session__usage"
                      title=${V.tooltip}
                      >${V.label}</span
                    >`):Qr(b.usage)?c`<span class="detail-session__usage"
                    >${Qr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${eo(b.started_at)}</span>
          </button>
          ${y(b)} ${d(b)} ${m(b)} ${Zh(b)}
          ${l.has(b.attempt_id)&&b.usage?Vh(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Kh(b,k,t)}
        </div>`})}
    </div>
  `}function xp(e,t={}){return c`
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
          ${Jh(e)}
        </div>`:""}
  `}function Jh(e){let t=ss(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?lr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ea(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?lr("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?lr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var ey=["open","in_progress","deferred","resolved","closed"],ty=[0,1,2,3,4];function Ap(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,m={},y="",b=!1,k=[],F=!1,G={},V={claude:null,codex:null},ie=null,Y=null,B=0,q=!1,W=!1,L="",M="",re="",ge="",we=!1;function le(){q=!1,W=!1,L="",M="",re="",ge="",we=!1}function _e(){V={claude:null,codex:null},ie=null,Y=null,B+=1}async function Ae(){if(!s)return null;try{let h=await Promise.resolve(s("get-workspace-accounts",{}));return h&&typeof h.state=="string"?h:null}catch{return null}}async function Ge(h){try{let H=await fetch(h);if(!H.ok)return null;let I=await H.json();if(!I||typeof I!="object"||!Array.isArray(I.accounts))return null;let Ee=I.accounts.filter(Xe=>Xe!==null&&typeof Xe=="object"&&!Array.isArray(Xe));return{accounts:Ee,active:Ee.find(Xe=>Xe.active===!0)||null}}catch{return null}}async function be(h){Y=h;let H=++B,[I,Ee,Xe]=await Promise.all([Ge("/api/claude-usage"),Ge("/api/codex-usage"),Ae()]);H!==B||h!==u||(V={claude:I,codex:Ee},ie=Xe,xe())}let J=[],Oe=null,Ne=null,T=!1,te="",Se=!1,$e=0,Ce=new Set;function he(){J=[],Oe=null,Ne=null,T=!1,te="",Se=!1,$e+=1,Ce.clear()}async function Le(h){if(!s)return;let H=++$e;try{let I=await Promise.resolve(s("get-comments",{id:h}));if(H!==$e||h!==u)return;J=Array.isArray(I)?I:[],T=!1}catch{if(H!==$e||h!==u)return;T=!0}xe()}function tt(){if(!s||!u)return;let h=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Oe!==u){Oe=u,Ne=h,Le(u);return}h!==null&&h!==Ne&&(Ne=h,Le(u))}function xt(h){Ce.has(h)?Ce.delete(h):Ce.add(h),xe()}function kt(h){let H=te.trim().length===0;te=h,H!==(h.trim().length===0)&&xe()}async function _t(){let h=te.trim();if(!s||!u||h.length===0||Se)return;let H=u;Se=!0,xe();let I=!1;try{let Ee=await Promise.resolve(s("add-comment",{id:H,text:h}));Array.isArray(Ee)&&Ee.length>0&&(I=!0,H===u&&(J=Ee,T=!1,te="",Ne=Ee.length))}catch{I=!1}I||ce("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),H===u&&(Se=!1),xe()}let P={onToggle:xt,onDraftInput:kt,onSubmit:_t},ae=t.mdViewer||null,Ie=null;ae||(Ie=document.createElement("div"),Ie.className="md-viewer-root",document.body.appendChild(Ie));let qe=ae||Ia(Ie,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Ze=document.createElement("div");Ze.className="session-log-root",document.body.appendChild(Ze);let st=os(Ze,{transport:s?(h,H)=>Promise.resolve(s(h,H)):void 0,sessionLogStore:l}),mt=!1,gt=!1,ne=!1,Q=null,We=null,ut=0;function He(h){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${h}`}function ve(){mt=!1,gt=!1,ne=!1,Q=null,We=null,ut+=1}async function Je(h){if(!s)return;let H=++ut;gt=!0,ne=!1,xe();try{let I=await Promise.resolve(s("get-bead-prompt",{bead_id:h}));if(H!==ut)return;!I||typeof I!="object"||Array.isArray(I)?ne=!0:(Q=I,We=He(h))}catch{H===ut&&(ne=!0)}finally{H===ut&&(gt=!1,xe())}}let lt=[],dt=null,pt=0;function Ut(h,H){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${h}::${H}`}function Dt(){lt=[],dt=null,pt+=1}async function zt(h,H){if(!s)return;let I=++pt,Ee;try{Ee=await Promise.resolve(s("get-session-refs",{bead_id:h}))}catch{Ee=null}I!==pt||H!==dt||(lt=Ee&&Array.isArray(Ee.sessions)?Ee.sessions:[],xe())}function Et(){if(!s||!u)return;let h=d&&d.metadata,H=h&&typeof h=="object"&&typeof h.session_ref=="string"?h.session_ref:null;if(H===null){Dt();return}let I=Ut(u,H);dt!==I&&(lt=[],dt=I,zt(u,I))}function Tt(){if(mt=!mt,mt&&u&&We!==He(u)){Q=null,Je(u);return}xe()}function ot(){if(!a||!u)return[];let h=a.get();return(h&&h.attempts?Object.values(h.attempts):[]).filter(I=>I&&I.bead_id===u).sort((I,Ee)=>(Ee.started_at||0)-(I.started_at||0)).map(I=>({attempt_id:I.attempt_id,bead_id:I.bead_id,status:I.status,started_at:typeof I.started_at=="number"?I.started_at:null,runner:I.runner||null,model:I.model||null,effort:I.effort||I.observed_effort||null,speed:I.speed||null,session_id:I.session_id||null,resumed_from:I.resumed_from||null,continuation_mode:I.continuation_mode||null,dismissed_at:typeof I.dismissed_at=="number"?I.dismissed_at:null,cause:typeof I.cause=="string"?I.cause:null,cause_detail:I.cause_detail||null,exec_default_preset_id:typeof I.exec_default_preset_id=="string"?I.exec_default_preset_id:null,exec_default_preset_revision:typeof I.exec_default_preset_revision=="number"?I.exec_default_preset_revision:null,exec_values:I.exec_values&&typeof I.exec_values=="object"?I.exec_values:null,usage:I.usage||null,usage_legs:Array.isArray(I.usage_legs)?I.usage_legs:[],delegation_sessions:Array.isArray(I.delegation_sessions)?I.delegation_sessions:[]}))}function ze(){if(!a||!u)return null;let h=a.get();return Mn(h&&h.attempts||{},u)}let D=new Set;function ee(h){D.has(h)?D.delete(h):D.add(h),xe()}function ye(h){let H=a?a.get():null,I=H&&H.attempts?H.attempts[h]:null;st.open({attempt_id:h,meta:I?{runner:I.runner||void 0,model:I.model||void 0,effort:I.effort||void 0,status:I.status||void 0,session_id:I.session_id||void 0}:{}})}function O(h,H){let I=a?a.get():null,Ee=I&&I.attempts?I.attempts[h]:null,nt=(Ee&&Array.isArray(Ee.delegation_sessions)?Ee.delegation_sessions:[]).find(bt=>bt&&typeof bt=="object"&&bt.launch_id===H);nt&&st.open({attempt_id:h,launch_id:H,meta:{runner:nt.provider==="claude"?"claude":"codex",role:nt.role,...typeof nt.agent_type=="string"?{agent_type:nt.agent_type}:{},model:nt.model,effort:nt.effort,session_id:nt.session_id,status:nt.status}})}async function z(h){if(!s||!h)return;let H=await Vr();if(H===null)return;let I=()=>{let bt=a?a.get():null;return bt&&typeof bt.revision=="number"?bt.revision:0},Ee=async(bt={},Ye=I())=>await s("worker-attempt-resume",{attempt_id:h,expected_revision:Ye,...H!==""?{instructions:H}:{},...bt}),Xe=bt=>{bt?.queue&&a?.set&&a.set(bt.queue)},nt=await Ee();if(Xe(nt),nt&&nt.conflict){let bt=nt.queue&&typeof nt.queue.revision=="number"?nt.queue.revision:I();nt=await Ee({},bt),Xe(nt)}nt=await nr(nt,(bt,Ye)=>Ee({continuation:bt,decision_token:Ye}),{onResult:Xe,refresh:()=>Ee()}),nt&&nt.resumed===!1&&!nt.conflict&&nt.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${nt.reason}`,"error",2400)}function Re(h){!h||!u||st.open(Yr(h,u,d&&d.status))}let A={onOpen:ye,onOpenDelegation:O,onResume:z,onToggleUsage:ee,onOpenSessionRef:Re,onCopyResumeCommand:on};function R(){let h=a?a.get():null,H={...G};for(let I of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ee=h&&h[I];typeof Ee=="string"&&(H[I]=Ee)}return H}async function X(){if(s){try{let h=await Promise.resolve(s("get-session-defaults",{}));G=h&&h.values&&typeof h.values=="object"?h.values:{}}catch{G={}}xe()}}function me(){let h=a?a.get():null;return h&&h.runner_catalog||null}function oe(){let h=a?a.get():null;return h&&typeof h.execution_defaults=="object"?h.execution_defaults:null}function Me(){let h=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},I=Tn({pin:{...h,...m},global:R(),execution_defaults:oe(),runner_catalog:me(),route:typeof h.route=="string"?h.route:null}).orchestration_model.value||"";return Fn(me(),I)}function E(){let h=i?i.get():null;return!h||typeof h.revision!="number"?null:{revision:h.revision,presets:Array.isArray(h.presets)?h.presets:[]}}function U(h){return h?.compatible===!1}function ke(h){i&&h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&i.set({revision:h.revision,presets:h.presets})}async function rt(){let h=E(),H=h?.presets.find(I=>I.id===y);if(!(!s||!u||!h||!H||U(H)||b)){b=!0,k=[],xe();try{let I=await Promise.resolve(s("apply-impl-preset",Yu(u,H.id,h.revision)));if(I&&I.conflict){ke(I),ce("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ee=I&&Array.isArray(I.issue)?I.issue[0]:I?.issue;if(I&&I.applied&&Ee&&typeof Ee=="object"){d=Ee,k=Array.isArray(I.skipped_orchestration_keys)?I.skipped_orchestration_keys.filter(Xe=>typeof Xe=="string"):[];for(let Xe of Zu)delete m[Xe];ce(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}I&&I.error==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(I){I&&typeof I=="object"&&I.code==="bd_readback_failed"?ce("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ce("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,xe()}}}let pe=null;n&&n.subscribe&&(pe=n.subscribe(()=>Nt()));let Ve=null;a&&typeof a.subscribe=="function"&&(Ve=a.subscribe(()=>{u&&xe()}));let yt=null,$t=null;function Lt(){$t&&($t(),$t=null)}i&&typeof i.subscribe=="function"&&(yt=i.subscribe(()=>{u&&xe()}));function Vt(h){h.key==="Escape"&&u&&(h.preventDefault(),r())}document.addEventListener("keydown",Vt);function Nt(){if(u){if(n&&typeof n.snapshotFor=="function"){let h=n.snapshotFor("detail:"+u)||[];d=h.find(I=>I&&I.id===u)||h[0]||d}tt(),Et(),xe()}}function on(h){Rn(h).then(H=>{H?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Rt(h){h.preventDefault(),h.stopPropagation(),u&&on(u)}function bn(h,H){h.preventDefault(),h.stopPropagation(),on(H)}function hn(h,H,I){h.preventDefault(),h.stopPropagation(),qe.open(H,{missing_state:I})}function Xt(h,H){m[h]=H,xe(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Vu(u,h,H.length===0?null:H))).catch(()=>{ce("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function an(h,H){let I=d||{},Ee=I.metadata&&typeof I.metadata=="object"?I.metadata:{},Xe={};for(let Ye of["impl_runtime","impl_model","impl_effort"])Xe[Ye]=Object.hasOwn(m,Ye)?m[Ye]:typeof Ee[Ye]=="string"?Ee[Ye]:"";Xe[h]=H;let nt=Ju(Xe,me(),Me()),bt={};for(let Ye of["impl_runtime","impl_model","impl_effort"])bt[Ye]=m[Ye],m[Ye]=nt[Ye]||"";xe(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...nt,orchestration_runtime:Me()})).then(Ye=>{let ht=Array.isArray(Ye)?Ye[0]:Ye;if(!ht||typeof ht!="object"||!ht.id)throw new Error("implementation target readback failed");d=ht;for(let gn of["impl_runtime","impl_model","impl_effort"])delete m[gn];xe()}).catch(()=>{for(let Ye of["impl_runtime","impl_model","impl_effort"])bt[Ye]===void 0?delete m[Ye]:m[Ye]=bt[Ye];xe(),ce("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Qe(h,H,I){if(!s||!u)return!1;try{let Ee=await Promise.resolve(s(h,H)),Xe=Array.isArray(Ee)?Ee[0]:Ee;return Xe&&typeof Xe=="object"&&Xe.id?(d=Xe,!0):(ce(I,"error"),!1)}catch(Ee){return Ee&&typeof Ee=="object"&&Ee.code==="bd_readback_failed"?(ce("\uC800\uC7A5\uB410\uC73C\uB098 \uD655\uC778 \uC2E4\uD328 \u2014 \uACE7 \uAC31\uC2E0\uB429\uB2C8\uB2E4","error"),{ok:!1,saved:!0}):(ce(I,"error"),!1)}}function je(h){setTimeout(()=>{try{let H=e.querySelector(h);H&&typeof H.focus=="function"&&H.focus()}catch{}},0)}function $(){q=!0,L=d&&d.title||"",xe(),je('.detail-edit__input[data-edit="title"]')}function fe(h){L=h.target.value}function Fe(){q=!1,L="",xe()}function vt(){Qe("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(H=>{H===!0&&(q=!1,L=""),xe()})}function Ft(){W=!0,M=d&&d.description||"",xe(),je('.detail-edit__textarea[data-edit="description"]')}function Ot(h){M=h.target.value}function Yt(){W=!1,M="",xe()}function tn(){Qe("edit-text",{id:u,field:"description",value:M},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(H=>{H===!0&&(W=!1,M=""),xe()})}function ln(h,H,I,Ee){if(h.key==="Escape"){h.stopPropagation(),I();return}h.key==="Enter"&&(!Ee||h.ctrlKey||h.metaKey)&&(h.preventDefault(),H())}function xn(h){let H=h.target.value;Qe("update-status",{id:u,status:H},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function Ht(h){let H=Number(h.target.value);Qe("update-priority",{id:u,priority:H},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>xe())}function cn(h){re=h.target.value}function un(){let h=re.trim();h.length!==0&&Qe("label-add",{id:u,label:h},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(H=>{H===!0&&(re=""),xe()})}function mn(h){if(h.key==="Escape"){h.stopPropagation(),re="",xe();return}h.key==="Enter"&&(h.preventDefault(),un())}function Xn(h){Qe("label-remove",{id:u,label:h},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>xe())}let Kn={onCopyPath:bn,onOpenDoc:hn};function S(h){return typeof h=="string"?h:h&&typeof h=="object"?String(h.id||h.to||h.issue_id||h.depends_on||""):""}function C(h){return h&&typeof h=="object"?String(h.dependency_type||h.type||""):""}function Pe(h){switch(h){case"discovered-from":return"\u21A9 \uBC1C\uACAC ";case"parent-child":return"\u2338 \uC0C1\uC704 ";case"related":return"\uAD00\uB828 ";default:return h.length>0?`${h} `:""}}function Be(h){if(!h||typeof h!="object")return;let H=typeof h.status=="string"?h.status:"",I=typeof h.title=="string"?h.title:"";return H.length>0&&I.length>0?`${H} \xB7 ${I}`:void 0}function ct(){return(t.getWorkspacePath&&t.getWorkspacePath()||"").trim()}function At(){return t.depCandidates?t.depCandidates():null}async function Zt(h,H,I){let Ee=ct(),Xe=u;if(!Xe)return;if(Ee.length===0){ce("\uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}let nt=await Qe(h,{a:Xe,b:H,view_id:Xe,root_dir:Ee},I),bt=nt===!0||nt!==!1&&nt.saved===!0;bt&&t.onDepChanged&&t.onDepChanged({type:h,a:Xe,b:H}),h==="dep-add"&&bt&&(ge="",we=!1),xe()}function _(h){if(!u)return;let H=globalThis.confirm;typeof H=="function"&&!H(`${h}\uAC00 ${u}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)||Zt("dep-remove",h,"\uC758\uC874 \uD574\uC81C \uC2E4\uD328")}function w(h){h.disabled||Zt("dep-add",h.bead_id,"\uC758\uC874 \uCD94\uAC00 \uC2E4\uD328")}function K(h){ge=h.target.value,we=!0,xe()}function de(){we||(we=!0,xe())}function Te(h,H){if(h.key==="Escape"){h.stopPropagation(),ge="",we=!1,xe();return}h.key==="Enter"&&(h.preventDefault(),H.length===1&&!H[0].disabled&&w(H[0]))}function ft(h){return c`<div class="detail-dep-add">
      <input
        class="detail-dep-add__input"
        aria-label="막는 이슈 추가"
        placeholder="막는 이슈 추가"
        .value=${ge}
        @focus=${de}
        @input=${K}
        @keydown=${H=>Te(H,h)}
      />
      ${we||ge.length>0?c`<div class="detail-dep-add__list">
            ${h.length===0?c`<div class="detail-dep-add__empty">후보 없음</div>`:h.map(H=>c`<button
                      type="button"
                      class="detail-dep-add__cand"
                      data-dep-cand=${H.bead_id}
                      ?disabled=${H.disabled}
                      title=${En(H.reason)}
                      @click=${()=>w(H)}
                    >
                      <span class="detail-dep-add__repo"
                        >${H.workspace_name}</span
                      >
                      <span class="detail-dep-add__id"
                        >${H.bead_id}</span
                      >
                      <span class="detail-dep-add__title"
                        >${H.title}</span
                      >
                    </button>`)}
          </div>`:""}
    </div>`}function at(h,H){let I=H.get(h.id),Ee=o?c`<button
          type="button"
          class="detail-dep__link"
          title=${En(h.title)}
          @click=${()=>I===void 0?o(h.id):o(h.id,I)}
        >
          ${h.label}
        </button>`:c`<span class="detail-dep__link" title=${En(h.title)}
          >${h.label}</span
        >`;return c`<span
      class=${`detail-dep detail-dep--${h.kind}${o?" detail-dep--link":""}`}
      >${Ee}${h.kind==="pred"?c`<button
            type="button"
            class="detail-dep__unlink"
            data-dep-b=${h.id}
            aria-label=${"\uC758\uC874 \uD574\uC81C: "+h.id}
            @click=${()=>_(h.id)}
          >
            ✕
          </button>`:""}</span
    >`}function Jt(h){let H=Array.isArray(h.dependencies)?h.dependencies:[],I=Array.isArray(h.dependents)?h.dependents:[],Ee=[];for(let Ye of H){let ht=S(Ye);ht.length>0&&C(Ye)==="blocks"&&Ee.push({id:ht,label:`\u26D3 \uB9C9\uB294 ${ht}`,kind:"pred",title:Be(Ye)})}for(let Ye of I){let ht=S(Ye);ht.length>0&&C(Ye)==="blocks"&&Ee.push({id:ht,label:`\u26D3 \uB9C9\uD788\uB294 ${ht}`,kind:"succ",title:Be(Ye)})}for(let Ye of H){let ht=S(Ye),gn=C(Ye);ht.length>0&&gn!=="blocks"&&Ee.push({id:ht,label:`${Pe(gn)}${ht}`,kind:"other",title:Be(Ye)})}let Xe=At(),nt=new Map;if(Xe)for(let Ye of Xe.issues)nt.has(Ye.bead_id)||nt.set(Ye.bead_id,Ye.root_dir);let bt=Xe&&u?wd(vd(u,Xe),ge):[];return c`
      <div class="detail-section-label">의존성</div>
      ${Ee.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${Ee.map(Ye=>at(Ye,nt))}
          </div>`}
      ${Xe===null?c`<div class="detail-empty">후보를 불러올 수 없음</div>`:ft(bt)}
    `}function nn(h){let H=h.metadata||{},I=h.workflow||{},Ee=I.stages||{},Xe=Ee.spec&&Ee.spec.stale,nt=Ee.impl&&Ee.impl.stale,bt=I.quick_fix_review?.state==="stale",Ye=Ee.plan||null,ht=I.route_source==="derived",gn=I.route||H.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${ht?" detail-kv__v--derived":""}"
          title=${ht?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${ht?"unset":gn}</span
        >
      </div>
      ${I.route!=="quick_fix"||Object.hasOwn(H,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${H.spec_review||"\uC5C6\uC74C"}${Xe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ye?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ye?.approval_receipt||"\uC5C6\uC74C"}${Ye?.approval_state==="stale"?" \xB7 stale":Ye?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${I.route!=="quick_fix"||Object.hasOwn(H,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${H.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${I.resolver.attempt} \xB7 ${I.resolver.prior_sha} \u2192 ${I.resolver.sha}`}
              >${`${I.resolver.prior_sha.slice(0,7)} \u2192 ${I.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${I.route==="quick_fix"||Object.hasOwn(H,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${H.quick_fix_review||"\uC5C6\uC74C"}${bt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${I.planned_execution.kind}</span>
            </div>
            ${I.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${I.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${I.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${tr(I.exec_receipt)}</span
            >
          </div>`:""}
      ${I.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${I.impl_entry.actor}@${I.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${H.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${H.pr_url}</span>
          </div>`:""}
    `}let rn={route:["quick_fix","spec_backed","full_plan"]};async function yn(h,H){let I=H.target.value;if(h==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&I!=="full_plan"&&!window.confirm(`full_plan \u2192 ${I||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){xe();return}await Qe("update-workflow-meta",{id:u,key:h,value:I},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),xe()}function p(h){let H=h.metadata||{};return c` ${((Ee,Xe)=>{let nt=rn[Ee],bt=typeof H[Ee]=="string"?H[Ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ee}
          data-edit=${`wfmeta-${Ee}`}
          @change=${Ye=>yn(Ee,Ye)}
        >
          <option value="" ?selected=${!nt.includes(bt)}>
            ${Xe}
          </option>
          ${nt.map(Ye=>c`<option value=${Ye} ?selected=${bt===Ye}>${Ye}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function g(h,H){return q?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${fe}
            @keydown=${I=>ln(I,vt,Fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${vt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Fe}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${h}</h2>
        ${fn(H).map(I=>c`<span class="detail-usage-total" title=${I.tooltip}
              >${I.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${$}
        >
          ✎
        </button>
      </div>
    `}function v(h){let H=pn(h.created_at),I=pn(h.updated_at);return!H&&!I?c``:c`
      ${H?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${H}</span>
          </div>`:""}
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
    `}function x(h,H){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${xn}
        >
          ${ey.map(I=>c`<option value=${I} ?selected=${I===h}>${I}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ht}
        >
          ${ty.map(I=>c`<option value=${String(I)} ?selected=${I===H}>
                P${I}
              </option>`)}
        </select>
      </div>
    `}function j(h){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${W?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ft}
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
              .value=${M}
              @input=${Ot}
              @keydown=${H=>ln(H,tn,Yt,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${tn}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Yt}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${h||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Z(h){let H=typeof h.notes=="string"?h.notes:"";return H.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${H}</div>
    `}function se(h){let H=Array.isArray(h.labels)?h.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${H.map(I=>c`<span class="detail-label-chip"
              >${I}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${I}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+I}
                @click=${()=>Xn(I)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${re}
            @input=${cn}
            @keydown=${mn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${un}
          >
            추가
          </button>
        </span>
      </div>
    `}function De(){if(!u)return c``;let h=d||{},H=String(h.id||u),I=h.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ee=ze(),Xe=h.status||"open",nt=typeof h.priority=="number"?Math.max(0,Math.min(4,h.priority)):"",bt=h.description||"",Ye={...h,metadata:{...h.metadata||{},...m}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Rt}
            >
              ${H}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${g(I,Ee)}
          ${fp(Ye)}
          ${pp({metadata:Ye.metadata,workspace_values:R(),catalog:me(),execution_defaults:oe(),expanded:F,presets:E()?.presets||[],preset_id:y,preset_busy:b,skipped_orchestration_keys:k},{onToggle:ht=>{F=ht,xe()},onEdit:(ht,gn)=>{if(ht==="impl_runtime"||ht==="impl_model"||ht==="impl_effort"){an(ht,gn??"");return}Xt(ht,gn??"")},onPresetSelect:ht=>{y=ht,k=[],xe()},onPresetApply:()=>{rt()}})}
          ${yp({md:Ye.metadata,catalog:V,workspace_defaults:ie,handlers:{onExecChange:Xt}})}
          ${x(Xe,nt)} ${v(h)}
          ${j(bt)}
          ${lp(J,P,{expanded:Ce,draft:te,sending:Se,error:T})}
          ${Z(h)} ${se(h)} ${Jt(h)}
          ${nn(h)} ${p(h)}
          ${op(h,Kn)}
          ${xp({expanded:mt,loading:gt,error:ne,data:Q},{onToggle:Tt})}
          ${$p(ot(),A,{total:Ee,expanded:D},lt)}
        </div>
      </div>
    `}function xe(){it(De(),e)}return{load(h){h!==u&&(m={},y="",k=[],F=!1,le(),he(),ve(),Dt(),_e()),u=h,d=null,!$t&&t.subscribeCandidates&&($t=t.subscribeCandidates(()=>{u&&xe()})),Nt(),X(),Y!==h&&be(h)},clear(){u=null,d=null,m={},y="",b=!1,k=[],F=!1,le(),he(),ve(),Dt(),_e(),Lt(),qe.close(),st.close(),it(c``,e)},destroy(){pe&&(pe(),pe=null),Ve&&(Ve(),Ve=null),yt&&(yt(),yt=null),Lt(),document.removeEventListener("keydown",Vt),ae||(qe.destroy(),Ie&&Ie.parentNode&&Ie.parentNode.removeChild(Ie)),st.destroy(),Ze.parentNode&&Ze.parentNode.removeChild(Ze),u=null,d=null,_e(),y="",b=!1,k=[],he(),ve(),Dt(),it(c``,e)}}}function Sp(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,m="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let y=typeof m=="string"?m.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}var ny="(max-width: 640px)";function Pa(e){if(typeof window.matchMedia!="function")return e(!1),()=>{};let t=window.matchMedia(ny),n=!!t.matches;e(n);let r=s=>{let a=!!(typeof s=="object"&&s!==null&&typeof s.matches=="boolean"?s.matches:t.matches);a!==n&&(n=a,e(a))};return typeof t.addEventListener=="function"?(t.addEventListener("change",r),()=>{t.removeEventListener("change",r)}):typeof t.addListener=="function"?(t.addListener(r),()=>{typeof t.removeListener=="function"&&t.removeListener(r)}):()=>{}}function ry(){return{lanes:{done:!0},areas:{}}}function to(e){let t={};if(typeof e!="object"||e===null)return t;for(let[n,r]of Object.entries(e))typeof r=="boolean"&&(t[n]=r);return t}function sy(e){try{let t=window.localStorage.getItem(e);if(!t)return null;let n=JSON.parse(t);if(typeof n!="object"||n===null)return null;let r=n;return typeof r.lanes=="object"&&r.lanes!==null?{lanes:to(r.lanes),areas:to(r.areas)}:{lanes:to(r),areas:{}}}catch{return null}}function Ep(e,t){try{window.localStorage.setItem(e,JSON.stringify(t))}catch{}}function Da(e,t=ry()){let n={lanes:to(t.lanes),areas:to(t.areas)},r=sy(e),s={lanes:{...n.lanes,...r?r.lanes:{}},areas:{...n.areas,...r?r.areas:{}}};return{isCollapsed(o){return s.lanes[o]===!0},isAreaCollapsed(o){return s.areas[o]===!0},toggle(o){let a=s.lanes[o]!==!0;return s={...s,lanes:{...s.lanes,[o]:a}},Ep(e,s),a},toggleArea(o){let a=s.areas[o]!==!0;return s={...s,areas:{...s.areas,[o]:a}},Ep(e,s),a}}}function Cp(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ea(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Tp=["parallel","serial","candidate"];function no(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function vl(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Tp.includes(r.kind),l=Tp.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=oy(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${no(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${no(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function oy(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Rp={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Op={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Lp(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function wl(e){for(let t of Lp(e))if(Object.hasOwn(Rp,t))return Rp[t];return null}function kl(e){let t=null;for(let n of Lp(e))Object.hasOwn(Op,n)&&(t=Op[n]);return t}function Na(e){let t=wl(e),n=kl(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Ip(e,t){let n=wl(e)??wl(t),r=kl(t)??kl(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Mp=160;function ay(e){return e.length>Mp?`${e.slice(0,Mp)}\u2026`:e}function iy(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${ay(e.command)}</code>`:""}
  </div>`}function ly(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function cy(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function Pp(e){let t=e.failure?Na(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?c`<button
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
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${iy(e.failure.cause_detail,e.failure.reason)}
          ${ly(e.failure.reason)}
          ${Ls({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function uy(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var dy=new Set(["codex-runner"]);function py(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&dy.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?Sn(r.last_event_at,t):"",m=r?Sn(r.updated_at,t):"",y=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:m?`\uAC31\uC2E0 ${m}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${Sn(a,t)}</span
            >`:""}
      </div>`:y?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${y}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var fy={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function _y(e){if(!e)return"";let t=fy[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function $l(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(_e=>_e&&_e.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?cy(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=gs(e),m=fn(e.usage),y=rr(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,F=e.landing,G=e.attempt_id&&e.attempt_id===n,V=r.monitor||null,ie=uy(V),Y=V?ia(V.dependency_chips):"",B=py(V,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),q=s&&e.workflow?.chips?.exec_receipt||null,W=la(e.workflow),L=q?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${tr(q)}`}
        >${`${q.kind}:${No(q)}`}</span
      >`:"",M=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${hs(o)}</span
      >`:"",re=ie||W||M||L?c`<div class="rtile__meta">
          ${ie}${W}${M}${L}
        </div>`:"",ge=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,we=s?"":ts(e),le=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${G?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ca(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${ge}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${_y(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${le}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
                  aria-label="실패 기록 닫기"
                >
                  ✕
                </button>`:c`<button
                  type="button"
                  class="rtile__session"
                  title="라이브 세션 열기"
                  aria-label="라이브 세션 열기"
                >
                  ▤ 세션
                </button>
                ${i?c`<button
                      type="button"
                      class="rtile__resume"
                      title="같은 세션으로 이어서 재개"
                      aria-label="재개"
                    >
                      ▶
                    </button>`:c`<button
                      type="button"
                      class="rtile__pause"
                      ?disabled=${e.can_pause===!1}
                      title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                      aria-label="일시정지"
                    >
                      ⏸
                    </button>`}
                ${le}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${B}${e.rollup?Po(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:mi}):""}
    ${F?c`<div class="rtile__landing">
          <span
            class="merge-step${F.failed?" merge-step--failed":""}"
            style=${`--progress: ${F.percent}%`}
            >${F.label}${F.index>0?c`<span class="merge-step__n"
                  >${F.index}/${F.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${Y}
    ${s?re:ie||W||u||m.length>0||y?c`<div class="rtile__meta">
            ${ie}${W}${aa(e.exec_chips)}
            ${m.length>0?m.map(_e=>c`<span class="worker-usage" title=${_e.tooltip}
                      >${_e.label}</span
                    >`):y?c`<span
                    class="worker-usage"
                    title=${ys(e.usage)}
                    >${y}</span
                  >`:""}
          </div>`:""}
    ${Ls(e)} ${we}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Dp(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>$l(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var _n="",my=["impl_runtime","impl_model","impl_effort"],gy=["claude_account","codex_account"],by=5,qa=1;function Cn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Fa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(D=>ce(D,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},m={},y=Promise.resolve(),b={claude:null,codex:null},k=!1,F=null,G={},V="",ie="",Y=!1,B=!1,q=!1,W=null,L=!1;function M(){let D=t.queue?t.queue():null;return Cn(D)?D:null}function re(){let D=M();return D?D.runner_catalog:null}function ge(){let D=M();return D&&Cn(D.execution_defaults)?D.execution_defaults:null}function we(){let D=t.implPresetStore?.get();return Cn(D)&&Array.isArray(D.presets)?D:null}function le(){return r===null?{}:{root_dir:r}}async function _e(D,ee){return L||!n?null:await n(D,ee)}function Ae(D){D&&Cn(D.queue)&&t.onQueueAdopt?.(D.queue)}async function Ge(D,ee){let ye=M();if(!ye||L)return null;let O=await _e(D,{...ee,...le(),expected_revision:ye.revision});if(Ae(O),r!==null&&O&&O.conflict){let z=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:M()?.revision??ye.revision;O=await _e(D,{...ee,...le(),expected_revision:z}),Ae(O)}return O}async function be(){l=!0,ze();try{let D=await _e("get-session-defaults",{...le()});o=Cn(D?.values)?{...D.values}:{},a={...o},i=Array.isArray(D?.warnings)?D.warnings:[]}catch(D){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}finally{l=!1,ze()}}async function J(){let D=Hu(o,a);if(Object.keys(D).length!==0){try{let ee=await _e("set-session-defaults",{values:D,...le()});o=Cn(ee?.values)?{...ee.values}:{},a={...o},i=Array.isArray(ee?.warnings)?ee.warnings:[]}catch(ee){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}ze()}}function Oe(D,ee){if(!Cn(D))return;let ye=D.state;u={state:ye==="usable"||ye==="unusable"||ye==="absent"?ye:"absent",values:Cn(D.values)?{...D.values}:{},warnings:Array.isArray(D.warnings)?D.warnings:[]},m={...u.values},ee&&(d={...m})}async function Ne(){try{Oe(await _e("get-workspace-accounts",{...le()}),!0)}catch(D){u={state:"unusable",values:{},warnings:["kv_read_failed"]},m={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${D instanceof Error?D.message:String(D)}`)}ze()}async function T(D){try{let ee=await fetch(D);if(!ee.ok)return null;let ye=await ee.json();if(!Cn(ye)||!Array.isArray(ye.accounts))return null;let O=ye.accounts.filter(z=>Cn(z)&&typeof z.key=="string"&&z.key.length>0&&typeof z.email=="string"&&z.email.length>0);return{accounts:O,active:O.find(z=>z.active===!0)||null}}catch{return null}}async function te(){k=!0;let[D,ee]=await Promise.all([T("/api/claude-usage"),T("/api/codex-usage")]);L||(b={claude:D,codex:ee},ze())}function Se(){let D={};for(let ee of gy){let ye=Object.hasOwn(d,ee)?d[ee]:null,O=Object.hasOwn(m,ee)?m[ee]:null;ye!==O&&(D[ee]=ye)}return D}async function $e(){let D=Se();if(Object.keys(D).length!==0){try{Oe(await _e("set-workspace-accounts",{values:D,...le()}),!1)}catch(ee){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}ze()}}function Ce(D,ee){ee===_n?delete d[D]:d[D]=ee,ze(),y=y.then(()=>$e())}function he(D,ee){if(my.includes(D)){xt(D,ee);return}ee===_n?delete a[D]:a[D]=ee,ze(),J()}function Le(){let D=Tt().orchestration_model,ee=Tn({global:{orchestration_model:D??void 0},execution_defaults:ge(),runner_catalog:re()}).orchestration_model.value;return ee?Fn(re(),ee):null}function tt(D,ee){typeof ee=="string"&&ee.length>0?a[D]=ee:delete a[D]}function xt(D,ee){let ye=ee===_n?void 0:ee,O=Wu({impl_runtime:D==="impl_runtime"?ye:a.impl_runtime,impl_model:D==="impl_model"?ye:a.impl_model,impl_effort:D==="impl_effort"?ye:a.impl_effort},re(),Le());tt("impl_runtime",O.impl_runtime),tt("impl_model",O.impl_model),tt("impl_effort",O.impl_effort),ze(),J()}async function kt(){let D=M();if(!D)return;let ee={orchestration_model:D.orchestration_model??null,orchestration_effort:D.orchestration_effort??null,orchestration_speed:D.orchestration_speed??null},ye=Gu(ee,{...ee,...G});if(Object.keys(ye).length!==0){try{let O=await Ge("worker-queue-set-orchestration-defaults",{values:ye});if(O&&O.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}G={}}catch(O){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}ze()}}function _t(D,ee){G[D]=ee===_n?null:ee,ze(),kt()}function P(D){if(F=D,!D){ze();return}let ee=re(),ye=Tt(),O=ye.orchestration_model;O&&!Cs(ee,D).includes(O)&&(G.orchestration_model=null,O=null);let z=ye.orchestration_effort;z&&!Ci(ee,D,O||Ln).includes(z)&&(G.orchestration_effort=null),ze(),kt()}async function ae(D){if(!(!M()||D<qa)){try{await Ge("worker-queue-set-slots",{slots:D})}catch(ee){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}ze()}}async function Ie(D){if(!(!M()||D<qa||D>by)){try{await Ge("worker-queue-set-serial-lane-count",{count:D})}catch(ee){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}ze()}}async function qe(D,ee){let ye=D==="auto_advance"?"worker-automation-toggle":D==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Ge(ye,{on:ee})}catch(O){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}ze()}function Ze(){let D={},ee=Tt();for(let ye of Ko){let O=sr.includes(ye)?ee[ye]:a[ye];typeof O=="string"&&O.length>0&&(D[ye]=O)}return D}async function st(){let D=we();if(!D)return;let ee=Ze();if(Object.keys(ee).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ye=(D.presets||[]).find(z=>z.id===V),O=ie.trim()||(ye?ye.name:"");if(!O){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let z=ye?await _e("impl-preset-update",{expected_revision:D.revision,id:ye.id,name:O,settings:ee}):await _e("impl-preset-create",{expected_revision:D.revision,name:O,settings:ee});if(z&&z.applied){if(ie="",!ye&&Array.isArray(z.presets)){let Re=z.presets.find(A=>A.name===O);V=Re?Re.id:V}ze()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze()}catch(z){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${z instanceof Error?z.message:String(z)}`)}}async function mt(){let D=we();if(!(!D||V.length===0))try{let ee=await _e("impl-preset-delete",{expected_revision:D.revision,id:V});ee&&ee.applied?(V="",ze()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ze())}catch(ee){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${ee instanceof Error?ee.message:String(ee)}`)}}function gt(D){o=Cn(D.values)?{...D.values}:{},a={...o},i=Array.isArray(D.warnings)?D.warnings:[],Cn(D.queue)&&(t.onQueueAdopt?.(D.queue),G={})}async function ne(){let D=we(),ee=M();if(!D||!ee||V.length===0)return;let ye=O=>({preset_id:V,expected_revision:D.revision,expected_queue_revision:O,...le()});try{let O=await _e("apply-impl-preset-global",ye(ee.revision));if(O&&O.applied&&gt(O),r!==null&&O&&O.queue_applied===!1){let z=O.queue&&typeof O.queue.revision=="number"?O.queue.revision:M()?.revision??ee.revision;O=await _e("apply-impl-preset-global",ye(z)),O&&O.applied&&gt(O)}O&&O.applied?O.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):O&&O.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(O){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${O instanceof Error?O.message:String(O)}`)}ze()}async function Q(){B=!0,q=!1,ze();try{let D=await _e("get-worker-system-prompt",{});!D||typeof D!="object"||Array.isArray(D)?q=!0:W=D}catch{q=!0}finally{B=!1,ze()}}function We(){if(Y=!Y,Y&&!W){Q();return}ze()}function ut(){let D=ss({loading:B,error:q});if(D)return D;if(!W)return"";let ee=Array.isArray(W.variants)?W.variants:[];return c`<div class="settings-dialog__sp-body">
      ${W.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${W.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${ee.map(ye=>c`<div class="settings-dialog__sp-variant" data-variant=${ye.key}>
            <div class="settings-dialog__sp-cond">${ye.condition}</div>
            ${lr(ye.label,ye.system_prompt)}
          </div>`)}
    </div>`}function He(){return c`<section
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
        aria-expanded=${Y?"true":"false"}
        @click=${We}
      >
        ${Y?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${Y?ut():""}
    </section>`}function ve(D,ee,ye,O,z,Re,A){let R=z[D]??_n,X=Ri(D,ye,z,ge(),re(),A),me=X.options.find(Me=>Me.value===R),oe=R===_n?X.full_value:me?.full_value;return c`<select
        class=${R===_n?"settings-dialog__unset":""}
        data-key=${D}
        aria-label=${ee}
        title=${oe||""}
        ?disabled=${Re===!0||X.disabled}
        .value=${Ir(String(R))}
        @change=${Me=>O(D,String(Me.target.value))}
      >
        <option value=${_n} ?selected=${R===_n}>
          ${X.unset_label}
        </option>
        ${X.options.map(Me=>c`<option
              value=${Me.value}
              title=${Me.full_value||""}
              ?selected=${Me.value===R}
            >
              ${Me.label}
            </option>`)}
      </select>
      ${R===_n?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Je(D,ee,ye,O,z,Re=!1,A){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        ${ve(D,ee,ye,O,z,Re,A)}
      </span>
    </div>`}function lt(D,ee){let ye=ee?ee.active:null;return Cn(ye)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${D==="claude"?ye.email:as({...ye,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function dt(D,ee,ye){let O=b[ye],z=Object.hasOwn(d,D)?d[D]:_n,Re=ye==="claude"?La:as,A=!!O?.accounts.some(R=>R.key===z);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${ee}
          data-account-key=${D}
          @change=${R=>Ce(D,String(R.target.value))}
        >
          <option value=${_n} ?selected=${z.length===0}>
            ${lt(ye,O)}
          </option>
          ${z.length>0&&!A?c`<option value=${z} selected>
                ${z} (목록에 없음)
              </option>`:""}
          ${O?.accounts.map(R=>c`<option value=${R.key} ?selected=${R.key===z}>
                ${Re(R)}
              </option>`)||""}
        </select>
        ${O?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function pt(){let D=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${D} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${D}`:null}function Ut(D,ee,ye,O,z){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${ee}-on)`}
        ></i>
        ${D}
      </span>
      <span class="settings-dialog__controls">
        ${ve(ye,`${D} \uBAA8\uB378`,O,he,a,!1)}
        ${ve(z,`${D} effort`,Zo,he,a,!1)}
      </span>
    </div>`}function Dt(D,ee,ye,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${O?" is-on":""}`}
          data-automation=${D}
          aria-pressed=${O?"true":"false"}
          aria-label=${ee}
          @click=${()=>qe(D,!O)}
        >
          ${O?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ye}</span>
      </span>
    </div>`}function zt(D,ee,ye,O){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${ee}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${D}>
          <button
            type="button"
            aria-label=${`${ee} \uAC10\uC18C`}
            @click=${()=>O(ye-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ye}</span>
          <button
            type="button"
            aria-label=${`${ee} \uC99D\uAC00`}
            @click=${()=>O(ye+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Et(D){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${D.rows.length>0?`\uBCC0\uACBD ${D.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${D.rows.map(ee=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${ee.kind}
          >
            <span class="settings-dialog__preset-diff-label">${ee.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${ee.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${ee.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${D.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${D.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Tt(){let D=M(),ee={};for(let ye of sr)ee[ye]=Object.prototype.hasOwnProperty.call(G,ye)?G[ye]:D&&typeof D[ye]=="string"?D[ye]:null;return ee}function ot(){let D=re(),ee=a.impl_runtime,ye=a.impl_model,O=we(),z=M(),Re=Tt(),A=Cs(D,F),R=Jr(D,void 0).filter(pe=>pe!==Ln),X=Ci(D,F,Re.orchestration_model||Ln).filter(pe=>pe!==Ln),me=V?(O?.presets||[]).find(pe=>pe.id===V):null,oe=me?zu(Ze(),Cn(me.settings)?me.settings:{}):null,Me=z&&typeof z.slots=="number"?z.slots:qa+1,E=z&&typeof z.serial_lane_count=="number"?z.serial_lane_count:qa,U=ge()?.supported===!0,ke=pt(),rt=Ri("workflow_mode",Es,a,ge(),D);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${ke?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${ke}
          </div>`:""}
      ${U?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Ir(V)}
                @change=${pe=>{V=String(pe.target.value),ze()}}
              >
                <option value="" ?selected=${V===""}>
                  실행 프리셋…
                </option>
                ${(O?.presets||[]).map(pe=>c`<option
                      value=${pe.id}
                      ?selected=${pe.id===V}
                    >
                      ${pe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!oe||oe.rows.length===0}
                @click=${ne}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${V?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ir(ie)}
                @input=${pe=>{ie=String(pe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${V?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${st}
              >
                ${V?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${V.length===0}
                @click=${mt}
              >
                삭제
              </button>
            </div>
            ${oe?Et(oe):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ir(F||_n)}
                    @change=${pe=>{let Ve=String(pe.target.value);P(Ve===_n?null:Ve)}}
                  >
                    <option value=${_n} ?selected=${!F}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${F==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${F==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Je("orchestration_model","\uBAA8\uB378",A,_t,Re)}
              ${Je("orchestration_effort","effort",X,_t,Re)}
              ${Je("orchestration_speed","\uC18D\uB3C4",Ss,_t,Re)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${dt("claude_account","Claude","claude")}
              ${dt("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${_n}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>he("workflow_mode",_n)}
                    >
                      ${rt.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Es.map(pe=>c`<button
                          type="button"
                          data-mode=${pe}
                          aria-pressed=${String(a.workflow_mode===pe)}
                          @click=${()=>he("workflow_mode",pe)}
                        >
                          ${pe}
                        </button>`)}
                  </span>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort</span>
              </div>
              ${Ut("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Ts,"spec_review_effort")}
              ${Ut("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Yo,"plan_review_effort")}
              ${Ut("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Ts,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Je("impl_runtime","\uC704\uC784 \uB300\uC0C1",Vo,he,a)}
              ${Je("impl_model","\uBAA8\uB378",Jr(D,ee),he,a)}
              ${Je("impl_effort","effort",es(D,ee,ye),he,a)}
              ${Je("impl_speed","\uC18D\uB3C4",Ss,he,a)}
              ${Je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",R,he,a,!1,{...a,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Dt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",z?.auto_advance===!0)}
              ${Dt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",z?.auto_merge===!0)}
              ${Dt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",z?.auto_repair===!0)}
              ${zt("slots","\uB3D9\uC2DC \uC2E4\uD589",Me,pe=>ae(pe))}
              ${zt("serial-lane-count","\uC9C1\uB82C \uB808\uC778",E,pe=>Ie(pe))}
            </div>
            ${He()}
          `}
    `}function ze(){L||it(ot(),e)}return{load(){G={};let D=[be(),Ne()];return k||D.push(te()),Promise.all(D).then(()=>{})},render:ze,sessionDraft:()=>({...a}),destroy(){L=!0,it(c``,e)}}}function ja(e){return c`<svg
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
  </svg>`}function Np(){return ja(_s`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function qp(){return ja(_s`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Fp(){return ja(_s`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function jp(){return ja(_s`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Bp(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Up(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return fn(Uo(t));let n={};for(let i of Zn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Zn){let m=l[d];typeof m=="number"&&Number.isFinite(m)&&(n[d]+=m,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?rr(n):null}function Gn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xl(e,t){let n=Gn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function hy(e,t){if(!Gn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function yy(e){if(!Gn(e)||!Gn(e.execution_defaults)||!Gn(e.runner_catalog)||!Gn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=Tn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Fn(e.runner_catalog,n.orchestration_model.value??""),s=Cr(n,e.runner_catalog),o=mr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Wp(e,t){let n=t.notify||(T=>ce(T,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,m=null,y=new Map;function b(){let T=t.workspacesState?t.workspacesState():[];return Array.isArray(T)?T.filter(te=>Gn(te)):[]}function k(T){return b().find(te=>te.root_dir===T)||null}function F(T){return hy(k(T),y.get(T))}function G(){for(let T of b()){let te=y.get(T.root_dir);te&&typeof te.revision=="number"&&typeof T.revision=="number"&&T.revision>=te.revision&&y.delete(T.root_dir)}}async function V(T,te,Se){let $e=t.transport,Ce=F(te);if(!(!$e||!Gn(Ce))){try{let he=await $e(T,{...Se,root_dir:te,expected_revision:Ce.revision});if(Gn(he?.queue)&&y.set(te,he.queue),he&&he.conflict){let Le=Gn(he.queue)&&typeof he.queue.revision=="number"?he.queue.revision:F(te)?.revision;he=await $e(T,{...Se,root_dir:te,expected_revision:Le}),Gn(he?.queue)&&y.set(te,he.queue)}}catch(he){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${he instanceof Error?he.message:String(he)}`)}J()}}function ie(T){u!==T&&(u=T,t.onFocusChange?.(u),J())}function Y(T){ie(u===T?null:T)}function B(T){if(d===T){W();return}q(),d=T;let te=k(T);a.textContent=`${te?.name||T} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,m=Fa(l,{root_dir:T,queue:()=>F(T),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:Se=>{y.set(T,Se),J()}}),m.load(),J()}function q(){m?.destroy(),m=null}function W(T){q(),d=null,s.hidden=!0,a.textContent="",T!==!0&&J()}let L=()=>W();i.addEventListener("click",L);function M(T){T.key==="Escape"&&u!==null&&ie(null)}document.addEventListener("keydown",M);function re(T,te){let Se=Math.max(te,T,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${te}\uAC1C \uC911 ${T}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:Se},($e,Ce)=>Ce<T?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function ge(T){let te=T.auto_advance===!0,Se=T.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${te?" is-on":""}`}
        data-act="auto"
        aria-pressed=${te?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9\uD654`}
        title=${te?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${te?qp():Np()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${Se?" is-on":""}`}
        data-act="merge"
        aria-pressed=${Se?"true":"false"}
        aria-label=${`${T.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${Se?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Fp()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===T.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===T.root_dir?"true":"false"}
        aria-label=${`${T.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${jp()}
      </button>`}function we(T){let te=yy(T);return te?c`<div class="mon2-deck__chips">
      ${te.orchestration?c`<span class="mon2-deck__chip" title=${te.orchestration.title}
            >오케 ${te.orchestration.text}</span
          >`:""}
      ${te.worker?c`<span class="mon2-deck__chip" title=${te.worker.title}
            >워커 ${te.worker.text}</span
          >`:""}
    </div>`:""}function le(T){let te=[];for(let[Se,$e]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ce=xl(T,Se);Ce>0&&te.push(`${$e} ${Ce}`)}return te.join(" \xB7 ")}function _e(T){let te=xl(T,"running"),Se=typeof T.slots=="number"?T.slots:1;return c`<div
      class=${`mon2-deck__tile${u===T.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${T.root_dir}
      aria-pressed=${u===T.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${T.root_dir}>${T.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${Se}\uAC1C \uC911 ${te}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${te}/${Se}</span>
          ${re(te,Se)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${T.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${ge(T)}</div>
        <span class="mon2-deck__counts">${le(T)}</span>
        ${we(T)}
      </div>
    </div>`}function Ae(T){let te=t.doneItems?t.doneItems():[],Se=t.rangeLabel?t.rangeLabel():"",$e=Up(Array.isArray(te)?te:[]),Ce=he=>T.reduce((Le,tt)=>Le+xl(tt,he),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${T.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${Se}`}
        >실행 ${Ce("running")} · 대기 ${Ce("queue")} · PR
        ${Ce("pr_wait")}${Ce("session_active")>0?` \xB7 \uC138\uC158 ${Ce("session_active")}`:""}
        · ${Se} 완료
        ${Array.isArray(te)?te.length:0}</span
      >
      ${$e===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof $e=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Bp(Se)}
                  >${$e}</span
                >`:$e.map(he=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${he.provider}
                      title=${he.tooltip}
                      >${he.label}</span
                    >`)}
          </span>`}
    </div>`}function Ge(){let T=b();return T.length===0?"":c`${Ae(T)}
      <div class="mon2-deck__strip">
        ${T.map(te=>_e(te))}
      </div>`}function be(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function J(){G(),be(),d!==null&&!k(d)&&W(!0),it(Ge(),r),m?.render()}function Oe(T){let te=T.target;if(!te||typeof te.closest!="function")return;let Se=te.closest("[data-root-dir]");if(!Se)return;let $e=Se.getAttribute("data-root-dir")||"",Ce=te.closest("[data-act]")?.getAttribute("data-act");if(Ce==="worker"){t.gotoWorkerTab?.($e);return}if(Ce==="auto"){V("worker-automation-toggle",$e,{on:F($e)?.auto_advance!==!0});return}if(Ce==="merge"){V("worker-merge-auto-toggle",$e,{on:F($e)?.auto_merge!==!0});return}if(Ce==="gear"){B($e);return}Y($e)}function Ne(T){if(T.key!=="Enter"&&T.key!==" ")return;let te=T.target;if(!te||typeof te.closest!="function")return;let Se=te.closest('[data-root-dir][role="button"]');!Se||Se!==te||(T.preventDefault(),Y(Se.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Oe),r.addEventListener("keydown",Ne),{render:J,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",M),r.removeEventListener("click",Oe),r.removeEventListener("keydown",Ne),i.removeEventListener("click",L),q(),it(c``,r),e.replaceChildren()}}}var zp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",vy=1e4;function Hp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Gp(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Zp="bdui.monitor.done-range",Qp="bdui.monitor.running_sort",Xp="bdui.monitor.candidate_sort",Jp="beads-ui.monitor.candidate-filter",ef="beads-ui.monitor.sections";function wy(){try{let e=window.localStorage.getItem(Jp);if(!e)return{...ns};let t=JSON.parse(e);return!t||typeof t!="object"?{...ns}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:ns.show_blocked,spec:Ui.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...ns}}}function Kp(e){try{window.localStorage.setItem(Jp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function ky(){try{let e=window.localStorage.getItem(Xp);return Fs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function $y(e){try{window.localStorage.setItem(Xp,e)}catch{}}function xy(){try{let e=window.localStorage.getItem(ef);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ay(e){try{window.localStorage.setItem(ef,JSON.stringify(e))}catch{}}function Sy(){try{let e=window.localStorage.getItem(Zp);return e===null?"today":Vn(e)}catch{return"today"}}function Ey(e){try{window.localStorage.setItem(Zp,e)}catch{}}function Ty(){try{return window.localStorage.getItem(Qp)==="repo"?"repo":"started"}catch{return"started"}}function Cy(e){try{window.localStorage.setItem(Qp,e)}catch{}}var tf="tab:monitor:pipeline",Ry=1e3,Vp=[{lane:"runnable",pane:"candidate",title:"\uD6C4\uBCF4",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589 \uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Oy=["queue","runnable","done"],Yp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function Ly(e){return e>=1&&e<=Yp.length?Yp[e-1]:`(${e})`}function nf(e,t){let n=Wt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),m=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),y=Sy(),b=Ty(),k=wy(),F=ky(),G=xy(),V=Da("beads-ui.monitor.lane-collapsed"),ie=!1,Y=null,B=null,q=null,W=null,L=[],M=null,re=null,ge=null,we=null;function le(p){return we===null&&(we=on()),Su(p,we)}function _e(p,g){Ae(),!(g<=0)&&(re={lane_id:p,corrected:g},ge=setTimeout(()=>{ge=null,re=null,oe()},vy))}function Ae(){ge!==null&&(clearTimeout(ge),ge=null),re=null}function Ge(){let p=jr.find(g=>g.value===y);return p?p.label:""}let be=document.createElement("div");be.className="mon",e.appendChild(be);let J=document.createElement("div");J.className="worker-drawer-overlay",J.hidden=!0;let Oe=document.createElement("div");Oe.className="worker-drawer-overlay__backdrop";let Ne=document.createElement("div");Ne.className="worker-drawer-host mon2-drawer",J.append(Oe,Ne),e.appendChild(J);let T=js(null,null),te=new Map,Se=new Map,$e=null,Ce=null,he=null,Le=os(Ne,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{B=null,J.hidden=!0,oe()}});async function tt(p,g,v,x,j=!0){if(!o||!v)return null;let Z=await o(p,{...g,root_dir:v,expected_revision:x});if(Z&&Z.conflict&&j){Z.queue&&Se.set(v,Z.queue);let se=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:x;Z=await o(p,{...g,root_dir:v,expected_revision:se})}return Z&&Z.queue&&v&&Se.set(v,Z.queue),Z}function xt(p,g){let v=Se.get(p),x=s&&s.get?s.get():null,j=(Array.isArray(x)?x:[]).find(se=>se?.root_dir===p);return(v||j)?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action}async function kt(p,g,v,x){let j=await tt(p,g,v,x),Z=Se.get(v)?.revision??j?.queue?.revision??x;return nr(j,(se,De)=>tt(p,{...g,continuation:se,decision_token:De},v,Z,!1),{refresh:se=>tt(p,g,v,se?.queue?.revision??Se.get(v)?.revision??Z,!1)})}async function _t(p,g,v,x){let j=await nr({continuation_mismatch:x},(se,De)=>tt("worker-merge-queue-add",{bead_id:g,continuation:se,decision_token:De},p,v,!1)),Z=j?.queue?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action;j?.applied!==!0&&Z?.continuation===null&&Z.mismatch&&await _t(p,g,j.queue.revision,Z.mismatch)}async function P(p,g,v){let x=await tt("worker-discard",p,g,v);if(x&&x.discarded===!0){ce(oa(x),"success",5e3);return}if(x&&x.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${x.reason}`,"error");return}if(x&&x.accepted&&x.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(x&&x.accepted){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${x.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}x&&!x.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ae(p,g,v){return!o||!v?null:await o(p,{...g,root_dir:v})}async function Ie(){let p=new Map;for(let g of T.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,v]of p)await tt("worker-merge-queue-add-all",{},g,v)}function qe(p){let g=G[p];return!!(g&&g.runnable===!0)}function Ze(p){let g={...G[p]||{}};g.runnable=!g.runnable,G={...G,[p]:g},Ay(G),oe()}function st(p){V.toggle(p),oe()}function mt(p){V.toggleArea(p),oe()}function gt(p){let g=T.queue_groups.find(v=>v.root_dir===p);if(!g)return null;for(let v=0;v<g.serial_lane_count;v+=1){let x=`s${v+1}`,j=g.sublanes.serial.find(Z=>Z.id===x);if(!j||j.raw_length===0&&j.occupied_by.length===0)return x}return null}function ne(p,g){let v=T.queue_groups.find(j=>j.root_dir===p),x=v?v.sublanes.serial.find(j=>j.id===g):void 0;return x?x.raw_length:0}function Q(p,g){let v=te.get(p),x=te.get(g);if(!v||!x)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let j=Hp(v),Z=Hp(x);if(j!==null&&j===Z&&v.root_dir===x.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let se=Gp(v),De=Gp(x);if(se&&Z!==null){let xe=Z;return{kind:"ops",title:`${xe} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:x.root_dir,ops:[{bead_id:p,lane:xe,index:ne(x.root_dir,xe)}]}}if(j!==null&&De&&Z===null){let xe=j;return{kind:"ops",title:`${xe} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:xe,index:ne(v.root_dir,xe)}]}}if(se&&j===null&&De&&Z===null){let xe=gt(v.root_dir);return xe===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${xe} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:v.root_dir,ops:[{bead_id:g,lane:xe,index:0},{bead_id:p,lane:xe,index:1}]}}return!se&&!De?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:se?{kind:"note",text:`${no(x.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${no(v.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function We(p,g){let v=Q(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:v.kind==="note"?{kind:"note",text:v.text}:v.kind==="disabled"?{kind:"disabled",label:zp,title:v.title}:{kind:"place",label:zp,title:v.title}}}function ut(p,g){if(!W||W.bead_id!==p)return null;let v=W.counterpart_id,x=g.filter(j=>j.id===v);return x.length===0?null:{rows:x.map(j=>We(p,j))}}function He(p){let g=p.dependency_chips||null,v=p.overlap_chips||[],x=p.scope_state==="missing",j=p.cross_lane_chip,Z=p.armed_lane_chip;if(!g&&v.length===0&&!x&&!j&&!Z)return null;let se=ut(p.id,v);return{...g||{},...v.length>0?{overlaps:v}:{},...x?{scope_missing:!0}:{},...j?{cross_lane:{lane_id:j.lane_id,label:j.label}}:{},...Z?{armed_lane:Z}:{},...se?{popover:se}:{}}}function ve(p){let g=He(p);return g?{...p,dependency_chips:g}:p}async function Je(p,g){let v=Q(p,g);if(W=null,v.kind!=="ops"){oe();return}let x=bn(v.root_dir,v.ops[0].bead_id);for(let j of v.ops){let Z=await lt(j,v.root_dir,x);if(Z===null)break;x=Z}oe()}async function lt(p,g,v){try{let x=await tt("worker-queue-place",p,g,v,!1);if(x&&x.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!x||x.applied!==!0)return ce(x&&typeof x.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${x.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let j=x.queue?x.queue.revision:void 0;return typeof j!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):j}catch(x){return ce(yt(x),"error"),null}}function dt(p){let g=qe(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function pt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function Ut(p){if(q!==p.id)return null;let g=T.queue_groups.find(Z=>Z.root_dir===p.root_dir),v=p.place_lanes||[],x=T.cross_lanes_revision!==null,j=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let Z of T.chain_lanes)j.push({id:`lane:${Z.lane_id}`,label:`\uC5F0\uACB0 ${Z.number} (${Z.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:Z.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x});j.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!x,title:x?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let Z of v)j.push({id:`serial:${Z.id}`,label:`\uC9C1\uB82C ${Number(Z.id.slice(1))}`,count:Z.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:j}}function Dt(p){return pt(p,c`${Pi(ve(p),Ut(p),{exec_chips_mode:"pinned_only",onOpenDoc:i?(g,v)=>i(v,p.root_dir):void 0})}`)}function zt(){return T.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${T.runnable.map(p=>Dt(p))}
      </div>`:c`${T.runnable_sections.map(p=>{let g=qe(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${dt({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(v=>Dt(v))}
            </div>`}
      </section>`})}`}function Et(p,g=!1){return c`<span class="worker-mini__rowops">
      ${g?c`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${p.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${p.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`:""}
    </span>`}function Tt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${Bn(ve(p),{actions:Et(p,!0)})}
    </div>`}function ot(p,g,v,x){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${v}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${Ly(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${x.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function ze(p){let g=T.cross_lanes_revision!==null,v=le(p.lane_id),x=v?.held===!0,j=v?.cycle===!0,Z=v?v.mismatched:[],se=re&&re.lane_id===p.lane_id?re.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${se>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${j?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${x?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${zo}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!g||!p.can_confirm||x}
              title=${x?zo:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!g}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((De,xe)=>ot(p,De,xe,Z))}
      </div>
    </div>`}function D(p,g,v){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${v}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${Bn(ve(g),{actions:Et(g)})}
    </div>`}function ee(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function ye(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${Bn({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function O(p,g){let v=g.occupants,x=g.cross_wait_peers||[];return{id:g.id,pane_id:"",title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,rows:[...v.map(j=>ye(j)),...g.items.map((j,Z)=>D(g,j,Z))],count:g.items.length,empty:g.empty===!0,...v.length>0?{badge:c`<span
              class="mon2-lane__occupant"
              title=${v.map(j=>`${j.id} \u2014 ${j.badge}`).join(`
`)}
              >${ee(v)}</span
            >`,held:!0}:{},cycle:g.cycle,header_control:c`<button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,...x.length>0?{after:c`${x.map(j=>c`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${j.workspace_name}·${j.lane}과 교차 대기
                </div>`)}`}:{}}}function z(){let p=T.cross_lanes_revision!==null,g=T.chain_lanes.some(v=>v.draft&&v.rows.length===0);return ua({parallel:{rows:T.parallel_rows.map((v,x)=>Tt(v,x)),count:T.parallel_rows.length,collapsed:V.isAreaCollapsed("parallel"),drop:{drop:"parallel"}},serial:{lanes:T.queue_groups.flatMap(v=>v.sublanes.serial.map(x=>({...O(v,x),drop:{drop:"repo-serial",root_dir:v.root_dir,lane_id:x.id,lane_length:String(x.raw_length)}}))),collapsed:V.isAreaCollapsed("serial"),extra_panes:T.chain_lanes.map(v=>ze(v)),header_control:c`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${g||!p}
          title=${p?g?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>`,...T.cross_lanes_unreadable?{notice:c`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`}:{}}})}function Re(p){return c`<div class="worker-rungrid">
      ${T.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:T.running.map(g=>$l({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,B,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:He(g)}}))}
    </div>`}function A(p){let g={runnable:T.runnable,queue:T.queue,running:T.running,pr_wait:T.pr_wait,done:T.done},v=x=>{let j=g[x.lane],Z=x.lane==="runnable"?T.runnable_flat?j.length>0?zt():void 0:T.runnable_sections.length>0?zt():void 0:x.lane==="queue"?T.queue_groups.length>0||T.chain_lanes.length>0||T.parallel_rows.length>0||T.cross_lanes_unreadable?z():void 0:x.lane==="running"?Re(p):j.length>0?c`${j.map(se=>Bn(se))}`:void 0;return Qn({id:`monitor-${x.lane}`,lane:x.pane,title:x.title,items:j,count:j.length,src:x.lane==="runnable",empty:x.empty,body:Z,live:x.lane==="running"&&j.length>0,collapsible:!0,collapsed:V.isCollapsed(x.pane),controls:x.lane==="runnable"?R():void 0,header_control:X(x.lane,j.length)})};if(ie){let x=Oy.map(j=>Vp.find(Z=>Z.lane===j)).filter(j=>j!==void 0);return c`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${da({live:T.running.length>0,running_body:T.running.length>0?Re(p):"",pr_wait_rows:T.pr_wait.map(j=>Bn(j)),count:T.running.length+T.pr_wait.length})}
            ${x.map(j=>v(j))}
          </div>
        </div>`}return c`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${Vp.map(x=>v(x))}
        </div>
      </div>`}function R(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${T.runnable_hidden.blocked>0?` ${T.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Ui.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${T.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${T.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function X(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${F}
      >
        ${Fs.map(v=>c`<option
              value=${v.value}
              ?selected=${F===v.value}
            >
              ${v.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${y}
      >
        ${jr.map(v=>c`<option value=${v.value} ?selected=${y===v.value}>
              ${v.label}
            </option>`)}
      </select>`:""}function me(p){let g=s&&s.get?s.get():null,v=s&&s.getWorkspacesState?s.getWorkspacesState():[],x=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,j={done_since:xr(y,d()),running_sort:b,candidate_filter:k,candidate_sort:F};return x!==void 0&&(j.cross_lanes=x),js(g,v,j)}function oe(){let p=d();T=me(),we=null,te=new Map;for(let g of[...T.runnable,...T.queue,...T.running,...T.pr_wait,...T.done])!g.non_occupying&&!te.has(g.id)&&te.set(g.id,g);it(A(p),be),E()?.render(),Me(),U()}function Me(){let p=new Map;for(let g of T.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(be.querySelectorAll(".worker-wait__area--parallel .worker-mini__repo"))){let v=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",x=p.get(v);typeof x=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${x?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function E(){if(he)return he;let p=be.querySelector(".mon2-deck");return p?(he=Wp(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>T.done,rangeLabel:Ge,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:rt,onFocusChange:g=>{M=g,U()}}),he):null}function U(){be.classList.toggle("has-focus",M!==null);for(let p of Array.from(be.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",M!==null&&p.getAttribute("data-root-dir")===M);for(let p of Array.from(be.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=te.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",M!==null&&!!g&&g.root_dir===M)}for(let p of Array.from(be.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",M!==null&&p.getAttribute("data-root-dir")===M)}function ke(p,g){let v=a?a():void 0;if(!g||!v||g===v||!l){r(p);return}l(g).then(()=>{r(p)}).catch(x=>{n("workspace switch for %s failed: %o",g,x)})}function rt(p){if(!p)return;let g=a?a():void 0,v=()=>{try{u?.gotoView("worker")}catch(x){n("gotoView(worker) failed: %o",x)}};if(!l||g&&g===p){v();return}l(p).then(v).catch(x=>{n("workspace switch for %s failed: %o",p,x),ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function pe(p){Rn(p).then(g=>{ce(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function Ve(p){let g=te.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function yt(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function $t(p,g,v){if(p!=="dep-add")return;let x=T.chain_lanes.find(j=>j.rows.some(Z=>Z.id===g));!x||!x.rows.some(j=>j.id===v)||await fe(j=>Lu(x.lane_id,j),"",[{type:p,a:g,b:v}])}function Lt(){let p=new Map,g=s&&s.get?s.get():null,v=x=>Array.isArray(x)?x.filter(j=>typeof j=="string"&&j.length>0):[];for(let x of Array.isArray(g)?g:[]){if(!x||typeof x!="object")continue;let j=x.bead_blocked_by&&typeof x.bead_blocked_by=="object"?x.bead_blocked_by:{};for(let[Z,se]of Object.entries(j))Array.isArray(se)&&p.set(Z,v(se));for(let Z of[...Array.isArray(x.runnable)?x.runnable:[],...Array.isArray(x.session_active)?x.session_active:[]])Z&&typeof Z.bead_id=="string"&&Array.isArray(Z.blocked_by)&&Z.blocked_by.length>0&&p.set(Z.bead_id,v(Z.blocked_by))}return p}function Vt(){let p=new Map,g=new Map,v=s&&s.get?s.get():null,x=j=>Array.isArray(j)?j.filter(Z=>typeof Z=="string"&&Z.length>0):[];for(let j of Array.isArray(v)?v:[]){if(!j||typeof j!="object")continue;let Z=j.bead_blocked_by&&typeof j.bead_blocked_by=="object"?j.bead_blocked_by:{};for(let[se,De]of Object.entries(Z))Array.isArray(De)&&p.set(se,x(De));for(let se of Array.isArray(j.runnable)?j.runnable:[])se&&typeof se.bead_id=="string"&&Array.isArray(se.blocked_by)&&g.set(se.bead_id,x(se.blocked_by))}for(let j of L)for(let Z of[p,g]){let se=Z.get(j.a);se!==void 0&&Z.set(j.a,j.type==="dep-remove"?se.filter(De=>De!==j.b):se.includes(j.b)?se:[...se,j.b])}return{snapshot:p,runnable:g}}function Nt(){let p=Lt();for(let g of L){let v=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,v.filter(x=>x!==g.b)):v.includes(g.b)||p.set(g.a,[...v,g.b])}return p}function on(p=T,g=Rt()){let v=new Map;for(let h of Array.isArray(g?.lanes)?g.lanes:[]){let H=new Map;for(let I of Array.isArray(h?.entries)?h.entries:[])I&&typeof I.bead_id=="string"&&H.set(I.bead_id,I.dep_created_by_lane===!0);v.set(typeof h?.id=="string"?h.id:"",H)}let x=new Map,j=new Map,Z=new Set,se=new Set;for(let h of p.chain_lanes){let H=v.get(h.lane_id);x.set(h.lane_id,{status:h.status,entries:h.rows.map((I,Ee)=>({bead_id:I.id,root_dir:I.root_dir,...Ee===0?{}:{dep_created_by_lane:H?.get(I.id)===!0}}))});for(let I of h.rows)j.set(I.id,h.lane_id),I.fixed&&Z.add(I.id),I.unplaced||se.add(I.id)}let De=new Map;for(let h of p.parallel_rows)typeof h.queue_index=="number"&&De.set(h.id,h.queue_index);for(let h of p.queue_groups)for(let H of h.sublanes.serial)for(let I of H.items)typeof I.queue_index=="number"&&De.set(I.id,I.queue_index);let xe=Vt();return{blocked_by_map:Nt(),snapshot_blocked_by:xe.snapshot,runnable_blocked_by:xe.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:x,owner_lane_of:j,fixed_members:Z,placed_members:se,parallel_rows:p.parallel_rows.map(h=>({bead_id:h.id,root_dir:h.root_dir,queue_index:h.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:De}}function Rt(){return(s&&s.crossLanes?s.crossLanes():null)??null}function bn(p,g){let v=te.get(g);if(v&&v.root_dir===p)return v.expected_revision;let x=T.queue_groups.find(j=>j.root_dir===p);return x?x.revision:0}async function hn(p,g,v){if(p.type==="worker-queue-disarm"){try{let x=await tt(p.type,p.payload,p.root_dir,v.get(p.root_dir)??bn(p.root_dir,g));x&&x.queue&&typeof x.queue.revision=="number"&&v.set(p.root_dir,x.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await Xt(p.type,p.payload,p.root_dir,v,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await ae(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch(x){return ce(yt(x),"error"),!1}}async function Xt(p,g,v,x,j){try{let Z=await tt(p,g,v,x.get(v)??bn(v,j.bead_id));return!Z||typeof Z.applied!="boolean"?(ce("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(Z.queue&&typeof Z.queue.revision=="number"&&x.set(v,Z.queue.revision),Z.conflict?(ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):Z.applied===!1?(ce(Z.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${Z.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:x.get(v)??0)}catch(Z){return ce(yt(Z),"error"),null}}function an(p){(p.type==="dep-add"||p.type==="dep-remove")&&(L=[...L,{type:p.type,a:p.a,b:p.b}])}async function Qe(p,g){if(!o)return{ok:!1};try{let v=await o(p.type,{...p.payload,expected_revision:g});return!v||typeof v.revision!="number"?(ce("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:v.revision}}catch(v){let x=v,j=x&&x.code==="conflict"?x.details?.cross_lanes:null;return j&&typeof j.revision=="number"&&Array.isArray(j.lanes)?{ok:!1,conflict:j}:(ce(yt(v),"error"),{ok:!1})}}async function je(p,g,v){let x=new Map,j=[],Z=p.ops.slice(0,p.lane_op_index),se=p.ops.slice(p.lane_op_index);for(let xe of Z){if(!await hn(xe,v,x))return{done:!0};an(xe)}let De=g;for(let xe of p.lane_ops){if(De===null)return ce("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let h=await Qe(xe,De);if(!h.ok)return h.conflict?{done:!1,conflict:h.conflict}:{done:!0};De=h.revision}for(let xe of se){if(!await hn(xe,v,x))return{done:!0};an(xe),xe.type==="dep-add"&&j.push(xe)}for(let xe of Pu(j))De=await $(xe,De);return{done:!0}}async function $(p,g){if(g===null||!o)return g;let v=p.pairs,x=g;for(let j=0;j<2;j+=1){if(v.length===0)return x;try{let Z=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:v.map(se=>({bead_id:se.bead_id,after:se.after,value:!0})),expected_revision:x});return Z&&typeof Z.revision=="number"?Z.revision:x}catch(Z){let se=Z,De=se&&se.code==="conflict"?se.details?.cross_lanes:null;if(!De||typeof De.revision!="number"||!Array.isArray(De.lanes))return x;let xe=De.lanes.find(h=>h&&h.id===p.lane_id);v=Du(Array.isArray(xe?.entries)?xe.entries:[],v),x=De.revision}}return x}async function fe(p,g,v=[]){L=v,Ae();let x=T,j=Rt();for(let Z=0;;Z+=1){let se=p(on(x,j));if("refused"in se){ce(se.refused,"error");break}let De=await je(se,x.cross_lanes_revision,g);if(De.done){se.correction&&_e(se.correction.lane_id,se.correction.corrected);break}if(Z>=1){ce("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}x=me(De.conflict),j=De.conflict}L=[],oe()}async function Fe(p,g){await fe(v=>Ai(p,g,v),p.bead_id)}async function vt(p,g){if(p==="run"){await Ot(g);return}if(p==="stop"){await Yt(g);return}if(p==="create"){await fe(v=>Si(null,v),"");return}if(p==="remove"){let v=Mu(g,on());if(v!==null&&!m(v))return;await fe(x=>Iu(g,x),"");return}await fe(v=>p==="confirm"?Ru(g,v):Ou(g,v),"")}function Ft(p){let g=new Map;for(let v of p.rows){let x=T.owner_of[v.id]||v.root_dir;typeof x!="string"||x.length===0||g.set(x,[...g.get(x)||[],v.id])}return g}async function Ot(p){let g=T.chain_lanes.find(Z=>Z.lane_id===p);if(!g||T.cross_lanes_revision===null){oe();return}Ae();let v=new Map,x=new Map,j=Ft(g);for(let Z of g.rows){if(!Z.unplaced)continue;let se=T.owner_of[Z.id]||Z.root_dir;if(typeof se!="string"||se.length===0){ce(`${Z.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),oe();return}let De=x.get(se)??0;if(await Xt("worker-queue-place",{bead_id:Z.id,lane:"parallel",index:(T.parallel_raw_length[se]??0)+De},se,v,{bead_id:Z.id})===null){oe();return}x.set(se,De+1)}for(let[Z,se]of j)if(await Xt("worker-queue-arm",{bead_ids:se,lane_id:p},Z,v,{bead_id:se[0]})===null){ce("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),oe();return}oe()}async function Yt(p){let g=T.chain_lanes.find(x=>x.lane_id===p);if(!g||T.cross_lanes_revision===null){oe();return}Ae();let v=new Map;for(let[x,j]of Ft(g))if(await Xt("worker-queue-disarm",{lane_id:p},x,v,{bead_id:j[0]})===null)break;oe()}async function tn(p,g){let{root_dir:v,revision:x}=Ve(p);if(v.length===0){oe();return}await Xt("worker-queue-disarm",{bead_ids:[p],lane_id:g},v,new Map([[v,x]]),{bead_id:p}),oe()}async function ln(p,g){let v=te.get(p);if(!v){oe();return}let x={kind:"candidate",bead_id:p,root_dir:v.root_dir};if(g==="new-lane"){await fe(j=>Si({bead_id:p,root_dir:v.root_dir},j),p);return}if(g.startsWith("lane:")){let j=g.slice(5);if(!T.chain_lanes.find(se=>se.lane_id===j)){oe();return}await fe(se=>Ai(x,{kind:"chain",lane_id:j,marker_index:(se.cross_lanes.get(j)?.entries??[]).length},se),p);return}if(g.startsWith("serial:")){let j=g.slice(7),Z=(v.place_lanes||[]).find(se=>se.id===j);await Fe(x,{kind:"repo-serial",root_dir:v.root_dir,lane_id:j,index:Z?Z.index:0});return}await Fe(x,{kind:"parallel",marker_index:T.parallel_rows.length})}async function xn(p,g){let v=T.parallel_rows,x=v.findIndex(h=>h.id===p);if(x<0)return;let j=v[x].root_dir,Z=[];v.forEach((h,H)=>{h.root_dir===j&&Z.push(H)});let se=Z.indexOf(x),De=Z[se+g];if(typeof De!="number")return;let xe=g===-1?De:Z[se+2]??Math.min(v.length,De+1);await Fe({kind:"parallel",bead_id:p,root_dir:j,queue_index:v[x].queue_index??0},{kind:"parallel",marker_index:xe})}async function Ht(p){for(let g of T.chain_lanes){let v=g.rows.find(x=>x.id===p);if(v){await Fe({kind:"chain",bead_id:p,root_dir:v.root_dir,lane_id:g.lane_id,...typeof v.queue_index=="number"?{queue_index:v.queue_index}:{}},{kind:"parallel",marker_index:T.parallel_rows.length});return}}}let cn=null,un=!1,mn=null;function Xn(){mn!==null&&clearTimeout(mn),mn=setTimeout(()=>{mn=null,un=!1},0)}function Kn(p,g){let v=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(v&&p.contains(v)){let x=Number(v.getAttribute("data-row-index"));return Number.isFinite(x)?x:0}return p.querySelectorAll("[data-row-index]").length}function S(p){let g=typeof p?.closest=="function"?p.closest(".worker-pane--collapsed[data-lane]"):null;if(!g)return null;let v=g.getAttribute("data-lane");return v==="queue"?{zone:g,target:{kind:"parallel",marker_index:T.parallel_rows.length}}:v==="candidate"?{zone:g,target:{kind:"candidate"}}:null}function C(p){let g=p.target;if(!cn)return null;let v=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!v)return S(g);let x=v.getAttribute("data-drop");if(x==="candidate")return{zone:v,target:{kind:"candidate"}};if(x==="parallel")return{zone:v,target:{kind:"parallel",marker_index:Kn(v,g)}};if(x==="chain")return{zone:v,target:{kind:"chain",lane_id:v.getAttribute("data-lane-id")||"",marker_index:Kn(v,g)}};if(x==="repo-serial"){let j=v.getAttribute("data-root-dir")||"";if(j!==cn.root_dir)return null;let Z=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,se=Z&&v.contains(Z)?Z.getAttribute("data-queue-index"):v.getAttribute("data-lane-length"),De=Number(se);return{zone:v,target:{kind:"repo-serial",root_dir:j,lane_id:v.getAttribute("data-lane-id")||"",index:Number.isFinite(De)?De:0}}}return null}function Pe(){for(let p of Array.from(be.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}let Be=null;function ct(p){Be=p.target instanceof Element?p.target:null}function At(p){let g=p.target,v=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,x=v?v.closest("[data-drag-kind]"):null;if(!x)return;if(v&&Be&&v.contains(Be)&&typeof Be.closest=="function"&&Be.closest("input, button, a")){p.preventDefault();return}let j=x.getAttribute("data-bead-id")||"",Z=x.getAttribute("data-drag-kind")||"",se=x.getAttribute("data-root-dir")||"";if(!j||!Z||!se)return;let De=x.getAttribute("data-queue-index")||"",xe=Number(De),h=x.getAttribute("data-lane-id")||"";cn={kind:Z,bead_id:j,root_dir:se,...De!==""&&Number.isFinite(xe)?{queue_index:xe}:{},...h?{lane_id:h}:{}},un=!0,q=null,be.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",j),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Zt(p){let g=C(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function _(p){let g=p.target;typeof g?.closest=="function"&&(g.closest("[data-drop]")?.classList.remove("is-drop-over"),g.closest(".worker-pane--collapsed")?.classList.remove("is-drop-over"))}function w(){cn=null,Pe(),be.classList.remove("is-dragging"),Xn()}function K(p){let g=C(p),v=cn;cn=null,Pe(),be.classList.remove("is-dragging"),!(!g||!v)&&(p.preventDefault(),Fe(v,g.target))}function de(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function Te(p,g){let{item:v,root_dir:x,revision:j}=Ve(g),Z=v?.attempt_id||"",se=p.classList;if(se.contains("worker-mini__rowops-up")||se.contains("worker-mini__rowops-down")){xn(g,se.contains("worker-mini__rowops-up")?-1:1);return}if(se.contains("worker-mini__rowops-remove")){tt("worker-queue-remove",{bead_id:g},x,j);return}if(se.contains("mon2-crow__detach")){Ht(g);return}if(se.contains("worker-dep__open")){ke(p.getAttribute("data-dep-id")||"",p.getAttribute("data-root-dir")||"");return}if(se.contains("mon2-arm__release")){tn(g,p.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let De=p.getAttribute("data-lane-id")||"";be.querySelector(`.mon2-clane[data-lane-id="${De}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("mon-overlap__chip")){let De=p.getAttribute("data-overlap-id")||"";W=!!W&&W.bead_id===g&&W.counterpart_id===De?null:{bead_id:g,counterpart_id:De},oe();return}if(se.contains("mon-overlap__place")){Je(g,p.getAttribute("data-counterpart-id")||"");return}if(se.contains("worker-card__place")){q=q===g?null:g,oe();return}if(se.contains("worker-card__place-cancel")){q=null,oe();return}if(se.contains("worker-card__place-lane")){let De=p.getAttribute("data-lane")||"parallel";q=null,ln(g,De);return}if(se.contains("rtile__session")){if(v&&v.kind==="session"){let De=(v.session_refs||[]).find(xe=>xe&&xe.current===!0);De&&(J.hidden=!1,Le.open(Yr(De,g,"in_progress",x)),oe());return}B=Z,Z&&v&&(J.hidden=!1,Le.open({attempt_id:Z,root_dir:x,meta:de(v)})),oe();return}if(se.contains("rtile__pause")){ae("worker-attempt-pause",{attempt_id:Z},x);return}if(se.contains("rtile__resume")){Vr().then(De=>{if(De!==null)return kt("worker-attempt-resume",{attempt_id:Z,...De!==""?{instructions:De}:{}},x,j)});return}if(se.contains("rtile__dismiss")){tt("worker-attempt-dismiss",{attempt_id:Z},x,j);return}if(se.contains("rtile__discard")){if(!m(Ms(g,"unmerged")))return;P({bead_id:g,...Z?{attempt_id:Z}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},x,j);return}if(se.contains("worker-mini__merge")){let De=xt(x,g);De?.mismatch&&De.continuation===null?_t(x,g,j,De.mismatch):tt("worker-merge-queue-add",{bead_id:g},x,j);return}if(se.contains("worker-mini__merge-cancel")){tt("worker-merge-queue-remove",{bead_id:g},x,j);return}if(se.contains("worker-mini__discard")){let De=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!m(Ms(g,De)))return;P({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},x,j);return}if(se.contains("worker-mini__revise-fix")){kt("worker-revise-fix",{bead_id:g},x,j);return}se.contains("worker-mini__revise-approve")&&tt("worker-revise-approve",{bead_id:g},x,j)}function ft(p){let g=un;un=!1;let v=p.target;if(!v||typeof v.closest!="function"||v.closest("dialog")||v.closest(".worker-drawer-overlay")||v.closest("a"))return;let x=v.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(x){p.preventDefault();let nt=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||x.textContent?.trim()||"";nt&&pe(nt);return}let j=v.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(j){p.preventDefault();let Xe=j.getAttribute("data-root-dir")||te.get(v.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||j.getAttribute("title")||"";rt(Xe);return}let Z=v.closest(".mon2-sec__toggle");if(Z){p.preventDefault(),Ze(Z.getAttribute("data-root-dir")||"");return}let se=v.closest(".worker-pane__toggle[data-lane]");if(se){p.preventDefault();let Xe=se.getAttribute("data-lane")||"";(Xe==="candidate"||Xe==="queue"||Xe==="running"||Xe==="pr_wait"||Xe==="done")&&st(Xe);return}let De=v.closest(".worker-wait__area-toggle[data-area]");if(De){p.preventDefault(),mt(De.getAttribute("data-area")||"parallel");return}if(v.closest(".mon2-newlane")){p.preventDefault(),vt("create","");return}let xe=v.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(xe){p.preventDefault();let Xe=xe.getAttribute("data-lane-id")||"",nt=xe.classList;vt(nt.contains("mon2-clane__confirm")?"confirm":nt.contains("mon2-clane__reapply")?"reapply":nt.contains("mon2-clane__run")?"run":nt.contains("mon2-clane__stop")?"stop":"remove",Xe);return}if(v.closest(".mon-merge-all")){p.preventDefault(),Ie();return}let h=v.closest(".mon-filter__spec");if(h){p.preventDefault(),k={...k,spec:h.getAttribute("data-spec")||"all"},Kp(k),oe();return}let H=v.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!H)return;let I=H.getAttribute("data-bead-id")||"",Ee=v.closest("button");if(Ee){p.preventDefault(),Te(Ee,I);return}I&&!g&&(p.preventDefault(),ke(I,H.getAttribute("data-root-dir")||Ve(I).root_dir))}function at(p){let g=p.target;if(!g||typeof g.closest!="function")return;let v=g.closest(".mon-filter__blocked");if(v){k={...k,show_blocked:v.checked},Kp(k),oe();return}let x=g.closest(".mon-candidate-sort");if(x){F=Fs.some(se=>se.value===x.value)?x.value:"repo_spec",$y(F),oe();return}let j=g.closest(".mon-running-sort");if(j){b=j.value==="repo"?"repo":"started",Cy(b),oe();return}let Z=g.closest(".mon-done-range");Z&&(y=Vn(Z.value),Ey(y),oe())}function Jt(p){let g=p.target,v=g&&typeof g.closest=="function"?j=>g.closest(j):()=>null,x=!1;W&&!v(".mon-overlap__popover, .mon-overlap__chip")&&(W=null,x=!0),x&&oe()}function nn(p){p.key!=="Escape"||!W||(W=null,oe())}e.addEventListener("click",ft),e.addEventListener("change",at),e.addEventListener("pointerdown",ct),document.addEventListener("click",Jt),document.addEventListener("keydown",nn),e.addEventListener("dragstart",At),e.addEventListener("dragover",Zt),e.addEventListener("dragleave",_),e.addEventListener("drop",K),e.addEventListener("dragend",w);{let p=!0;Y=Pa(g=>{if(ie=g,p){p=!1;return}oe()})}s&&typeof s.subscribe=="function"&&($e=s.subscribe(()=>{try{Se.clear(),oe()}catch{}}));function rn(){Ce!==null&&(clearInterval(Ce),Ce=null)}function yn(){mn!==null&&(clearTimeout(mn),mn=null)}return{recorrectSharedLane:$t,load(){n("load"),oe(),Ce===null&&(Ce=setInterval(()=>{try{oe()}catch{}},Ry))},pause(){rn()},clear(){rn(),yn(),$e&&($e(),$e=null),Y&&(Y(),Y=null),Le.destroy(),J.hidden=!0,he?.destroy(),he=null,e.removeEventListener("click",ft),e.removeEventListener("change",at),e.removeEventListener("pointerdown",ct),document.removeEventListener("click",Jt),document.removeEventListener("keydown",nn),e.removeEventListener("dragstart",At),e.removeEventListener("dragover",Zt),e.removeEventListener("dragleave",_),e.removeEventListener("drop",K),e.removeEventListener("dragend",w),e.replaceChildren()}}}function rf(e,t,n){let r=Wt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(y){return b=>{b.preventDefault();let k=y==="monitor"&&l()==="monitor"?"worker":y;r("click tab %s",k),n.gotoView(k)}}function l(){let y=t.getState();return y.view==="worker"||y.view==="monitor"?y.view:"board"}function u(){let y=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${y==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let y=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${y==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${y==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function m(){s&&it(u(),s),o&&it(d(),o)}return m(),a=t.subscribe(()=>m()),{destroy(){a&&(a(),a=null),s&&it(c``,s),o&&it(c``,o)}}}var sf=["bug","feature","task","epic","chore"];function of(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var af=["Critical","High","Medium","Low","Backlog"];function lf(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),y=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let q=document.createElement("option");q.value="",q.textContent="\u2014 Select \u2014",o.appendChild(q);for(let W of sf){let L=document.createElement("option");L.value=W,L.textContent=of(W),o.appendChild(L)}a.replaceChildren();for(let W=0;W<=4;W+=1){let L=document.createElement("option");L.value=String(W);let M=af[W]||"Medium";L.textContent=`${W} \u2013 ${M}`,a.appendChild(L)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function F(q){s.disabled=q,o.disabled=q,a.disabled=q,i.disabled=q,l.disabled=q,d.disabled=q,m.disabled=q,m.textContent=q?"Creating\u2026":"Create"}function G(){u.textContent=""}function V(q){u.textContent=q}function ie(){try{let q=window.localStorage.getItem("beads-ui.new.type");q?o.value=q:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function Y(){let q=o.value||"",W=a.value||"";q.length>0&&window.localStorage.setItem("beads-ui.new.type",q),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function B(){G();let q=String(s.value||"").trim();if(q.length===0){V("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){V("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),M=String(l.value||""),re={title:q};L.length>0&&(re.type=L),String(W).length>0&&(re.priority=W),M.length>0&&(re.description=M),F(!0);try{await t("create-issue",re)}catch{F(!1),V("Failed to create issue");return}Y(),F(!1),k()}return n.addEventListener("cancel",q=>{q.preventDefault(),k()}),y.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",q=>{q.key==="Enter"&&(q.ctrlKey||q.metaKey)&&(q.preventDefault(),B())}),r.addEventListener("submit",q=>{q.preventDefault(),B()}),{open(){r.reset(),G(),ie();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var Iy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function My(e,t){return fi(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function cf(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=My(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function uf(e,t,n){return c`
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
  `}function df(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Iy.map(([n,r])=>c`<label class="settings-dialog__toggle">
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
  `}var Py=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function pf(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(_e=>ce(_e,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function m(){if(d)return d;let _e=a.querySelector('[data-pane="execution"]');return _e?(d=Fa(_e,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Ae=>t.queueStore?.set?.(Ae)}),d):null}function y(){return c`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
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
    `}function b(){let _e=r.get();return c`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${_e?c`
              ${cf(_e,s(),V)}
              ${uf(_e,u,{onDraft:Ae=>{u=Ae},onAdd:ie,onRemove:Y})}
              ${df(_e,B)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(_e){let Ae=r.get();if(Ae)try{let Ge=await n("display-policy-set",{expected_revision:Ae.revision,policy:_e(Ae)});F(Ge),Ge&&Ge.conflict&&Ge.policy&&(Ge=await n("display-policy-set",{expected_revision:Ge.policy.revision,policy:_e(Ge.policy)}),F(Ge)),Ge&&Ge.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function F(_e){_e&&_e.policy&&typeof _e.policy=="object"&&r.set(_e.policy)}function G(_e){k(_e)}function V(_e){let Ae=r.get();if(!Ae)return;let Ge=!Dy(_e,Ae);G(be=>Ny(_e,be,Ge))}function ie(){let _e=u.trim();_e.length!==0&&(u="",G(Ae=>Ae.hidden_prefixes.includes(_e)?{hidden_prefixes:Ae.hidden_prefixes}:{hidden_prefixes:[...Ae.hidden_prefixes,_e]}),q())}function Y(_e){G(Ae=>({hidden_prefixes:Ae.hidden_prefixes.filter(Ge=>Ge!==_e)}))}function B(_e){let Ae=r.get();if(!Ae)return;let Ge=Ae.chips[_e]===!1;G(()=>({chips:{[_e]:Ge}}))}function q(){it(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Py.map(_e=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${_e.id}
                  aria-selected=${String(i===_e.id)}
                  aria-controls=${`settings-pane-${_e.id}`}
                  @click=${()=>W(_e.id)}
                >
                  <span class="settings-dialog__glyph">${_e.glyph}</span>
                  ${_e.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${le}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${y()} ${b()}
          </div>
        </div>
      `,a),m()}function W(_e){i=_e,q()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let M=_e=>{_e.target===a&&le()};a.addEventListener("click",M);let re=null;r.subscribe&&(re=r.subscribe(()=>{l&&q()}));let ge=null;t.implPresetStore?.subscribe&&(ge=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function we(_e="execution"){l||(l=!0,t.onOpenChange?.(!0),i=_e,u="",q(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),m()?.load())}function le(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:we,close:le,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",M),re&&(re(),re=null),ge&&(ge(),ge=null),d?.destroy(),d=null,a.remove()}}}function Dy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function Ny(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var qy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ff="usage-meter-card",Fy="usage-meter-layer",Al=600,jy=["token_expired","relogin_required"];function _f(e){return String(e).padStart(2,"0")}function By(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function mf(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${_f(r.getHours())}:${_f(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${qy[r.getMonth()]} ${r.getDate()} ${o}`;return`${By(n,t)} \xB7 ${i}`}function Uy(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function gf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function bf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var hf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function vf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function Wy(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:vf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function zy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=Wy(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?vf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Hy(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=zy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function wf(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Gy(e,t){return!e.held||wf(e,t)<=Al?e:{...e,available:!1,windows:[],accounts:[]}}function yf(e,t){return`${e}:${t}`}function kf(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){it(c``,e),e.hidden=!0,m()}function d(){if(l===null){let be=e.ownerDocument;l=be.createElement("div"),l.id=Fy,l.className="usage-meter__layer",be.body.appendChild(l)}return l}function m(){l!==null&&(it(c``,l),l.remove(),l=null)}function y(be){n!==be&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",G),window.addEventListener("resize",F)),n=be)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",G),window.removeEventListener("resize",F))}function k(be){let J=be.target;J&&(e.contains(J)||l!==null&&l.contains(J))||(b(),le())}function F(){le()}function G(be){be.key==="Escape"&&(b(),le())}function V(be){n===be?b():y(be),le()}function ie(){b(),le()}async function Y(be,J){if(r.has(be.key))return;let Oe=yf(be.key,J);r.set(be.key,J),a.delete(Oe),le();let Ne=null;try{Ne=await(await fetch(be.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:J})})).json()}catch{Ne=null}if(t)return;if(r.delete(be.key),!Ne||Ne.ok!==!0){let te=Ne&&typeof Ne.error=="string"&&Ne.error.length>0?Ne.error:"network_error";a.set(Oe,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${te}`}),le();return}let T=Array.isArray(Ne.warnings)?Ne.warnings.filter(te=>typeof te=="string"&&te.length>0):[];T.length>0&&a.set(Oe,{kind:"warn",text:T.join(" \xB7 ")}),le(),await Ge()}function B(be,J,Oe,Ne){let T=bf(be.pct),Se=`resets ${mf(be.resetsAt,Ne)}${J?` \xB7 ${Oe}`:""}`;return c`<span
      class="usage-meter__window ${gf(T)}"
      style=${`--progress: ${T}%`}
      title=${Se}
    >
      <span class="usage-meter__label">${be.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${T}%</span>
    </span>`}function q(be,J,Oe){let Ne=wf(J,Oe),T=J.available&&(J.held||Ne>Al),te=T?`${Math.floor(Ne/60)}\uBD84 \uC804 \uCE21\uC815`:"",Se=J.accounts.filter(Le=>!Le.active).length,$e=`usage-meter__group${T?" usage-meter__group--stale":""}`,Ce=c`<span class="usage-meter__provider"
        >${be.label}</span
      >
      ${J.available?J.windows.map(Le=>B(Le,T,te,Oe)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${Se>0?c`<span class="usage-meter__badge">+${Se}</span>`:""}`;if(J.accounts.length===0)return c`<span
        class=${$e}
        aria-label=${`${be.label} usage`}
        >${Ce}</span
      >`;let he=n===be.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${$e}`}
      aria-label=${`${be.label} usage`}
      aria-expanded=${he?"true":"false"}
      aria-controls=${ff}
      @click=${()=>V(be.key)}
    >
      ${Ce}
    </button>`}function W(be,J){return c`<span class="usage-meter" aria-label="Usage">
      ${be.map(Oe=>q(Oe.provider,Oe.snapshot,J))}
    </span>`}function L(be,J){let Oe=bf(be.pct),Ne=mf(be.resetsAt,J);return c`<span
      class="usage-meter__account-window ${gf(Oe)}"
      style=${`--progress: ${Oe}%`}
    >
      <span class="usage-meter__account-key">${be.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Oe}%</span>
      <span class="usage-meter__account-reset"
        >${Ne.length>0?`\u21BB ${Ne}`:""}</span
      >
    </span>`}function M(be,J){return jy.includes(J)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${be.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function re(be,J,Oe){let Ne=J.status==="ok",T=typeof J.ageSeconds=="number"&&J.ageSeconds>Al,te=a.get(yf(be.key,J.number)),Se=r.get(be.key),$e=Se!==void 0,Ce=Se===J.number,he=["usage-meter__account"];return J.active&&he.push("usage-meter__account--active"),Ne||he.push("usage-meter__account--unavailable"),T&&he.push("usage-meter__account--stale"),c`<div class=${he.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${J.email}
          >${J.alias===null?J.email:J.alias}</span
        >
        ${J.plan===null?"":c`<span class="usage-meter__account-tag">${J.plan}</span>`}
        ${J.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${J.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${Uy(J.ageSeconds)}</span
            >`}
        ${J.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${$e}
              @click=${()=>{Y(be,J.number)}}
            >
              ${Ce?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ne?c`<div class="usage-meter__account-windows">
            ${J.windows.map(Le=>L(Le,Oe))}
          </div>`:c`<div class="usage-meter__account-status">
            ${M(be,J.status)}
          </div>`}
      ${te===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${te.kind}"
          >
            ${te.text}
          </div>`}
    </div>`}function ge(be,J,Oe){let Ne=J.accounts.filter(T=>T.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${be.label} · 활성 ${Ne} / 전체
        ${J.accounts.length}
      </h2>
      ${J.accounts.map(T=>re(be,T,Oe))}
    </section>`}function we(be,J){return c`<div
      class="usage-meter__card"
      id=${ff}
      role="dialog"
      aria-label=${`${be.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${ge(be.provider,be.snapshot,J)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function le(){let be=Date.now(),J=[];for(let Ne of hf){let T=o.get(Ne.key);T&&J.push({provider:Ne,snapshot:Gy(T,be)})}if(J.length===0){b(),u();return}let Oe=J.find(Ne=>Ne.provider.key===n&&Ne.snapshot.accounts.length>0);Oe||b(),it(W(J,be),e),e.hidden=!1,Oe?_e(Oe,be):m()}function _e(be,J){let Oe=d(),Ne=e.getBoundingClientRect(),T=e.ownerDocument.documentElement.clientWidth;Oe.style.setProperty("--usage-meter-anchor-top",`${Ne.bottom}px`),Oe.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,T-Ne.right)}px`),it(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${ie}
        ></div>
        ${we(be,J)}`,Oe)}async function Ae(be){try{let J=await fetch(be.endpoint);return J.ok?Hy(await J.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ge(){i+=1;let be=i,J=await Promise.all(hf.map(async Oe=>({provider:Oe,read:await Ae(Oe)})));if(!(t||be!==i)){for(let Oe of J){let Ne=Oe.provider.key;if(Oe.read.kind==="ok"){o.set(Ne,Oe.read.snapshot);continue}if(Oe.read.kind==="empty"){o.delete(Ne);continue}let T=o.get(Ne);T!==void 0&&!T.held&&o.set(Ne,{...T,held:!0})}le()}}return u(),Ge(),s=setInterval(()=>{Ge()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function $f(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Ky="worker-ineligible";function ro(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function xf(e){return ro(e).includes(Ky)}var Vy="session-preferred",Yy=["exclusive_machine","iterative_user_judgment","visual_verification"];function Af(e,t){if(!ro(e).includes(Vy)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Yy.includes(n)?n:""}var Zy="worker-serial";function Sl(e){return ro(e).includes(Zy)}function El(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Qy=new Set(["done","failed","orphaned","stopped","discarded"]),Xy={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Jy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},ev={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function Tl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:ev[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Sf(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,m=null,y=null,b=null,k=new Set,F=!1,G=0,V=null,ie=new Set;function Y(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function B(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function q(){return o&&o()||""}async function W(){if(!s)return;let A=++G;F=!0,b=null,k.clear(),ot();try{let R=await s("worker-parallel-analysis-targets",{root_dir:q()});if(A!==G||!ze)return;let X=Array.isArray(R?.qualified)?R.qualified:[],me=Array.isArray(R?.excluded)?R.excluded:[];b={qualified:X,excluded:me};for(let oe of X)oe&&typeof oe.id=="string"&&k.add(oe.id)}catch{A===G&&ze&&(b={qualified:[],excluded:[]},ce("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{A===G&&(F=!1,ze&&ot())}}function L(A){return Array.isArray(A.runs)?A.runs:[]}function M(){let A=Y(),R=new Set;for(let X of Object.values(A.attempts||{})){let me=X;me&&typeof me.bead_id=="string"&&!Qy.has(me.status)&&R.add(me.bead_id)}for(let X of Array.isArray(A.pr_wait)?A.pr_wait:[])X&&typeof X.bead_id=="string"&&R.add(X.bead_id);for(let X of Object.values(A.discard_operations||{})){let me=X;me&&me.phase!=="done"&&typeof me.bead_id=="string"&&R.add(me.bead_id)}return R}function re(A){return A.filter(R=>ge(R)===null)}function ge(A){let R=Y();for(let X of Array.isArray(R.serial_lanes)?R.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(me=>me.bead_id===A))return X.id;return(Array.isArray(R.queue)?R.queue:[]).some(X=>X.bead_id===A)?"parallel":null}function we(A,R){let X=l.get(A);return X||[...R.order]}function le(A){if(A.length<2)return!1;let R=ge(A[0]);if(!R||R==="parallel")return!1;let X=Y(),me=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(Me=>Me.id===R)?.entries.map(Me=>Me.bead_id);if(!Array.isArray(me))return!1;let oe=A.map(Me=>me.indexOf(Me));return oe.every(Me=>Me>=0)&&oe.every((Me,E)=>E===0||Me>oe[E-1])}function _e(){let A=Y(),R=Array.isArray(A.serial_lanes)?A.serial_lanes:[],X=R.find(me=>Array.isArray(me.entries)&&me.entries.length===0);return X?X.id:R[0]?.id||"s1"}function Ae(A){let R=Y().bead_titles||{};return typeof R[A]=="string"?R[A]:A}async function Ge(A,R){if(!s||d)return null;d=!0,ot();try{return await s(A,R)}finally{d=!1,ot()}}async function be(A){r?.setPending?.(!0);try{let R=await Ge("worker-parallel-analysis-start",{force:A,target_ids:Array.from(k)});R&&R.applied===!1&&R.reason&&(R.reason==="target_not_qualified"&&Array.isArray(R.detail)?ce(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${R.detail.join(", ")}`,"error",3200):ce(`\uBD84\uC11D \uC2E4\uD328: ${R.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function J(){let A=B().job;!s||!A||await s("worker-parallel-analysis-cancel",{job_id:A.job_id})}async function Oe(A){if(!(!s||ie.has(A))){ie.add(A),ot();try{let R=await s("worker-parallel-analysis-prompt",{root_dir:q(),run_id:A});if(!ze)return;if(R?.ok===!0&&typeof R.prompt=="string"){V={run_id:A,prompt:R.prompt};return}ce(R?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{ie.delete(A),ot()}}}function Ne(){V=null,ot()}async function T(){if(!V)return;let A=await Rn(V.prompt);ce(A?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",A?"success":"error",1400)}function te(A,R){a&&a(A,Tl(R))}function Se(){return Y().runner_catalog}function $e(A){return Object.keys(Se()?.runners?.[A]?.models||{})}function Ce(A){let R=$e(A),X=Se()?.runners?.[A]?.default_model;return typeof X=="string"&&R.includes(X)?X:R[0]||""}function he(){let A=B().settings,R=m||A.runner||"claude",X=$e(R),me=m?Ce(R):A.model||X[0]||"",oe=El(Se(),R,me),Me=A.effort||"",E=oe.includes(Me)?Me:oe[0]||"";return{runner:R,model:me,effort:E,models:X,efforts:oe}}async function Le(A){let R=B().settings,X=await Ge("worker-parallel-analysis-settings-update",{expected_revision:R.revision,runner:A.runner,model:A.model,effort:A.effort});(!X||X.applied!==!0)&&(m=null,ot(),X&&X.reason&&ce(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function tt(A){m=A,ot();let R=he();Le({runner:A,model:R.model,effort:R.effort})}function xt(A){let R=he(),X=El(Se(),R.runner,A);Le({runner:R.runner,model:A,effort:X.includes(R.effort)?R.effort:X[0]||""})}function kt(A){let R=he();Le({runner:R.runner,model:R.model,effort:A})}async function _t(A,R){if(!s||d)return;let X=we(A,R),me=B();if(X.length<2||!me.last_good){ce("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let oe=u.get(A)||_e(),Me=()=>({snapshot_digest:me.last_good.identity_digest,group_index:A,lane:oe,ordered_bead_ids:X,expected_revision:Y().revision});d=!0,ot();try{let E=await s("worker-parallel-analysis-submit",Me());E&&E.queue&&n&&n.set(E.queue),E&&E.applied!==!0&&E.conflict===!0&&(E=await s("worker-parallel-analysis-submit",Me()),E&&E.queue&&n&&n.set(E.queue)),E&&E.applied===!0?(l.delete(A),ce(`\uC9C1\uB82C \uB808\uC778 ${oe}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):ce(`\uC81C\uCD9C \uAC70\uBD80: ${E?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,ot()}}function P(A,R,X){l.set(A,we(A,R).filter(me=>me!==X)),ot()}function ae(A){l.delete(A),ot()}function Ie(A,R,X,me){let oe=[...we(A,R)],Me=oe.indexOf(X),E=Me+me;Me<0||E<0||E>=oe.length||(oe.splice(E,0,...oe.splice(Me,1)),l.set(A,oe),ot())}function qe(){let A=B().settings,R=Object.keys(Se()?.runners||{}),X=he();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${me=>tt(me.target.value)}
        >
          ${R.map(me=>c`<option
                value=${me}
                ?selected=${X.runner===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${me=>xt(me.target.value)}
        >
          ${X.models.map(me=>c`<option
                value=${me}
                ?selected=${X.model===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${me=>kt(me.target.value)}
        >
          ${X.efforts.map(me=>c`<option
                value=${me}
                ?selected=${X.effort===me}
              >
                ${me}
              </option>`)}
        </select>
      </label>
      ${Ze(A)}
    </div>`}function Ze(A){return!mt(A)||st(A)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:A.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${A.runner}/${A.model} · effort
        ${A.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:A.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function st(A){return A.is_default===!0&&A.compatible===!1}function mt(A){return!!(A.runner&&A.model&&A.effort)}function gt(A){return mt(A)&&A.compatible!==!1}function ne(A){let R=Math.max(0,Math.floor(A/1e3)),X=Math.floor(R/60),me=R%60;return`${X}:${String(me).padStart(2,"0")}`}function Q(A){let R=A.job;if(R){let X=typeof R.started_at=="number"?R.started_at:0,me=`${R.runner||"?"}/${R.model||"?"}`,oe=X?` \xB7 \uACBD\uACFC ${ne(Date.now()-X)}`:"",Me=typeof R.session_id=="string"?R.session_id:"",E=L(A).find(U=>U.run_id===R.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${me} · effort ${R.effort||"?"}${oe}</span
        >
        ${Me?c`<code class="pa-session-id" title=${Me}
              >${Me.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>te(R.job_id,E||R)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${E?.prompt_saved!==!0||ie.has(R.job_id)}
          @click=${()=>{Oe(R.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return ut()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function We(A){let R=Q(A);return R===""?"":c`<div class="pa__strip">${R}</div>`}function ut(){return r?.isPending?.()===!0}function He(A){let R=!!A.job,X=gt(A.settings),me=b!==null&&k.size===0,oe=R||d||ut()||F;return c`<div class="pa-meta">
      ${A.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(A.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!X||oe||me}
        @click=${()=>{be(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!X||oe||me}
        @click=${()=>{be(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!R}
        @click=${()=>{J()}}
      >
        취소
      </button>
    </div>`}function ve(A){return typeof A=="string"&&A.length>0?A:"\uBBF8\uBC30\uCE58"}function Je(A,R){R?k.add(A):k.delete(A),ot()}function lt(A){let R=Array.isArray(A.scope)?A.scope:[],X=Array.isArray(A.overlaps)?A.overlaps:[];return R.length===0&&X.length===0?c``:c`<span class="pa-target__signals">
      ${R.length>0?c`<details class="pa-target__scope" title=${R.join(`
`)}>
            <summary>scope ${R.length}</summary>
            <ul>
              ${R.map(me=>c`<li><code>${me}</code></li>`)}
            </ul>
          </details>`:""}
      ${X.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${X.join(", ")}`}
            >겹침 ${X.join(", ")}</span
          >`:""}
    </span>`}function dt(){let A=b?.qualified||[],R=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${F?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${A.length} \xB7 \uC81C\uC678 ${R.length}`}</span
        >
      </header>
      ${b&&A.length>0?c`<ul class="pa-targets__list">
            ${A.map(X=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${X.id}
                      .checked=${k.has(X.id)}
                      @change=${me=>Je(X.id,me.target.checked)}
                    />
                    <span class="pa-target__title">${X.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${lt(X)}
                    <span class="pa-target__route">${X.route}</span>
                    <span class="pa-target__lane"
                      >${ve(X.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&A.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&R.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${R.length}</summary>
            <ul class="pa-targets__list">
              ${R.map(X=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${X.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Xy[X.reason]||X.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${ve(X.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function pt(A){let R=typeof A.session_id=="string"&&A.session_id.length>0,X=R?A.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${A.outcome}"
        >${Jy[A.outcome]||A.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(A.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${A.runner||"?"} / ${A.model||"?"} / ${A.effort||"?"}</span
      >
      ${R?c`<code class="pa-session-id" title=${X}
            >${X.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${A.outcome==="failure"&&A.reason?c`<span class="pa-run-row__reason">${A.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>te(A.run_id,A)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${A.prompt_saved!==!0||ie.has(A.run_id)}
          @click=${()=>{Oe(A.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Ut(A){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${A.length>0?c`<ul class="pa-runs__list">
            ${A.map(R=>pt(R))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Dt(){return V?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Ne}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{T()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Ne}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function zt(A,R){let X=we(A,R),me=M(),oe=X.filter(pe=>me.has(pe)),Me=re(X),E=le(X),U=Array.isArray(Y().serial_lanes)?Y().serial_lanes:[],ke=u.get(A)||_e(),rt=R.eligible!==!0||X.length<2||oe.length>0||Me.length>0||E||d;return c`<section class="pa-group" data-group-index=${String(A)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${R.confidence}</span>
        ${R.categories.map(pe=>c`<span class="pa-group__category">${pe}</span>`)}
        ${E?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${R.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${Me.length>0?c`<span class="pa-group__stale"
              >stale — ${Me.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${R.reason}</p>
      <ol class="pa-group__members">
        ${X.map((pe,Ve)=>c`<li class="pa-member" data-bead-id=${pe}>
              <span class="pa-member__seq">${Ve+1}</span>
              <span class="pa-member__title">${Ae(pe)}</span>
              ${me.has(pe)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${pe}
                ?disabled=${Ve===0}
                aria-label=${`${pe} \uC704\uB85C`}
                @click=${()=>Ie(A,R,pe,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${pe}
                ?disabled=${Ve===X.length-1}
                aria-label=${`${pe} \uC544\uB798\uB85C`}
                @click=${()=>Ie(A,R,pe,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${pe}
                aria-label=${`${pe} \uC81C\uC678`}
                @click=${()=>P(A,R,pe)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${R.evidence.map(pe=>c`<li class="pa-evidence">
              <code>${pe.path}</code>
              <span class="pa-evidence__locator">${pe.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ae(A)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${pe=>{u.set(A,pe.target.value),ot()}}
          >
            ${U.map((pe,Ve)=>c`<option
                  value=${pe.id}
                  ?selected=${ke===pe.id}
                >
                  직렬 ${Ve+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${rt}
          @click=${()=>{_t(A,R)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Et(A){let R=Array.isArray(A.issues)?A.issues:[],X=R.filter(oe=>oe.verdict==="parallel_ok").length,me=R.filter(oe=>oe.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${X}</span>
      <span>uncertain ${me}</span>
    </div>`}function Tt(){let A=ze&&!!B().job;if(A&&y===null){y=setInterval(()=>ot(),1e3);return}!A&&y!==null&&(clearInterval(y),y=null)}function ot(){let A=B();m&&A.settings.runner===m&&(m=null);let R=A.last_good?.result;Tt(),it(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Re}
            >
              ×
            </button>
          </header>
          ${We(A)}
          <div class="pa__body">
            ${qe()} ${He(A)} ${dt()}
            ${R?c`${R.groups.map((X,me)=>zt(me,X))}
                ${R.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Et(R)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Ut(L(A))}
          </div>
        </div>
        ${Dt()}
      `,i)}let ze=!1,D=()=>{ze=!1,V=null,G+=1,Tt()},ee=A=>{A.target===A.currentTarget&&Re()};i.addEventListener("close",D),i.addEventListener("cancel",D),i.addEventListener("click",ee);let ye=null;n&&n.subscribe&&(ye=n.subscribe(()=>{ze&&ot()}));let O=null;r&&r.subscribe&&(O=r.subscribe(()=>{ze&&ot()}));function z(){ze||(ze=!0,ot(),W(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Re(){ze&&(ze=!1,V=null,G+=1,Tt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:z,close:Re,destroy(){ze=!1,y!==null&&(clearInterval(y),y=null),i.removeEventListener("close",D),i.removeEventListener("cancel",D),i.removeEventListener("click",ee),ye&&(ye(),ye=null),O&&(O(),O=null),i.remove()}}}var Ef=new Set(["sh","bash","zsh","dash","ksh"]),Tf=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Cf(e){let t=e.split("/");return t[t.length-1]||""}function tv(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=Cf(n[0]);if(r!=="env")return Ef.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Ef.has(Cf(s))}function nv(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function rv(e){let t=[],n=0;Tf.lastIndex=0;for(let r of e.matchAll(Tf)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:nv(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function sv(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Rf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function m(q,W){return W?rv(q).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):q}function y(){if(!s)return c``;let q=o==="ready"&&tv(a),W=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>Y()}
      ></div>
      <section class="repo-ops-script-viewer__panel">
        <header class="repo-ops-script-viewer__header">
          <div class="repo-ops-script-viewer__identity">
            <span
              class="repo-ops-script-viewer__path"
              title=${s.path}
              >${s.path}</span
            >
            <span class="repo-ops-script-viewer__ref"
              >${s.base_ref}@${s.base_sha.slice(0,7)}</span
            >
          </div>
          <div class="repo-ops-script-viewer__actions">
            <button
              type="button"
              class="repo-ops-script-viewer__copy"
              ?disabled=${o!=="ready"}
              @click=${()=>{k()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>Y()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${W.map((L,M)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${M+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(L,q)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){it(y(),r)}async function k(){if(o!=="ready")return;let q=await Rn(a);ce(q?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",q?"success":"error")}function F(q){q.key==="Escape"&&s&&(q.preventDefault(),Y())}function G(){d||(document.addEventListener("keydown",F),d=!0)}function V(){d&&(document.removeEventListener("keydown",F),d=!1)}async function ie(q,W=null){let L=++l;G(),s={...q},u=W||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let re=t?t():"";if(!re){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let ge="/api/repo-ops-script?workspace="+encodeURIComponent(re)+"&lane="+encodeURIComponent(q.lane)+"&base_sha="+encodeURIComponent(q.base_sha);try{let we=await n(ge),le=await we.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==re){Y();return}if(!we.ok||!le||le.ok!==!0){o="error",i=sv(le&&typeof le.error=="string"?le.error:""),b();return}s={lane:le.lane,base_sha:le.base_sha,path:le.path,base_ref:le.base_ref},a=String(le.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function Y(){l+=1,V(),s=null,a="",b();let q=u;u=null,q?.isConnected&&q.focus()}function B(){Y(),r.remove()}return{open:ie,close:Y,destroy:B}}function Of(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,M){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${M}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let M=L/6e4;return Number.isInteger(M)?`timeout ${M}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function m(L){let M=d(L);return M?u("config",M):""}function y(L,M,re){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${re.script}
      @click=${ge=>{s&&s({lane:L,base_sha:M.base_sha,path:re.script,base_ref:M.base_ref},ge.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function k(L,M){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!M}
        @change=${re=>{ie(L,!re.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function F(L){let M=typeof L.base_sha=="string"?L.base_sha:"",re=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${M?`@${M.slice(0,7)}`:""}`,ge=b(),we=!!L.verify&&ge.verify,le=!!L.deploy&&ge.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${re}</span>
      </p>
      <div
        class="worker-repo-ops__lane${we?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${y("verify",L,L.verify)}
              ${m(L.verify.timeout_ms)}
              ${we?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${we?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${L.verify?k("verify",ge.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${le?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${y("deploy",L,L.deploy)}
              ${m(L.deploy.timeout_ms)}
              ${le?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${le?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${L.deploy?k("deploy",ge.deploy):""}
      </div>
    </section>`}function G(L){let M=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return M&&(M.status==="resolved"||M.status==="absent")?F(M):M&&(M.status==="pending"||M.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${M.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${M.error_code?c` — <code>${M.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(L){if(!n)return;let M=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(M),M&&M.conflict){let re=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(re)}r()}async function ie(L,M){if(!n)return;let re=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:M,expected_revision:a()});if(i(re),re&&re.conflict){let ge=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:M,expected_revision:a()});i(ge)}r()}let Y={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function B(L,M,re){return c`<div class="worker-repo-ops__policy-group" data-policy=${re}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${M.map(ge=>c`<li data-token=${ge}>
              ${Y[ge]||ge}
            </li>`)}
      </ul>
    </div>`}function q(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(M=>{let re=[Y[M.trigger]||M.trigger];return Number.isInteger(M.attempts_per_operation_attempt)?re.push(`operation\uB2F9 ${M.attempts_per_operation_attempt}\uD68C`):Number.isInteger(M.attempts)?re.push(`${Y[M.budget]||M.budget} ${M.attempts}\uD68C`):Number.isInteger(M.sessions_per_user_action)&&re.push(`${M.sessions_per_user_action}\uD68C`,Y[M.user_actions]||M.user_actions),M.applies_when&&re.push(Y[M.applies_when]||M.applies_when),c`<li data-token=${M.id}>
            <strong>${Y[M.id]||M.id}</strong>
            <span>${re.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function W(){let L=o(),M=L.auto_repair!==!1,re=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,ge=Array.isArray(L.repo_operations)?L.repo_operations:[],we=ge.find(Ge=>Ge.state==="repairing"),le=ge.filter(Ge=>Ge.state==="failed"||Ge.state==="repairing"),_e=le.length?Math.min(...le.map(Ge=>typeof Ge.repair?.remaining=="number"?Ge.repair.remaining:0)):re?.auto_repair?.resolution_ladder?.find(Ge=>Ge.id==="auto_repair_session")?.attempts??1,Ae=Array.isArray(re?.auto_repair?.resolution_ladder)?re.auto_repair.resolution_ladder:[];return c`<section
      class="worker-repo-ops__repair"
      data-seam="auto-repair"
    >
      <p class="worker-repo-ops__vd-title">
        자동 해결
        <span class="worker-repo-ops__vd-ro"
          >자동화(대기열·머지)와 독립된 스위치</span
        >
      </p>
      <label class="worker-repo-ops__repair-toggle">
        <input
          type="checkbox"
          class="worker-repo-ops__repair-input"
          .checked=${M}
          @change=${Ge=>{V(Ge.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${M?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${_e}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${we?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${we.repair?.owner_bead||we.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${re?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(re.worker_automatic||[]).length} · 해결 사다리
                ${Ae.length} · 금지
                ${(re.never_automatic||[]).length}</span
              >
            </summary>
            ${B("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",re.worker_automatic||[],"worker-automatic")}
            ${re.supported===!1||re.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${re.schema_version})`}
                </div>`:q(Ae)}
            ${B("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",re.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${G(l())} ${W()}
      </details>`}}}var Pf=20,ov=5,av=new Set(["failed","repairing","running","queued","retry_pending"]),Lf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},If={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function iv(e,t,n=Pf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function lv(e){if(e.type==="cleanup")return!0;let t=e.operation;return av.has(t.state)&&!t.dismissed&&!t.superseded_by}function cv(e,t,n={}){let r=iv(e,t,1/0),s=n.expanded===!0?Pf:ov,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||lv(i));return{visible:a,hidden:r.length-a.length}}function Mf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function uv(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Df(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Nf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function dv(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(If,r)?If[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function pv(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?pn(e.at):""}
      >${sa(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Mf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Lf,t.kind)?Lf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ta(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Is(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Mf(e)}"
          >${uv(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?Nf(Ip(t.failure_kind,r)):""}
      ${dv(t)}
      ${Df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ta(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function fv(e){let t=e.cleanup,n=Rr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?pn(e.at):""}
      >${sa(e.at)||"\u2014"}</span
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
        ${ld(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${Nf(Na(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Df([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function _v(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(r=>r.type==="cleanup"?fv(r):pv(r))}
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
  </section>`}function qf(e,t={}){let n=null;function r(){if(n===null){it(c``,e);return}let a=cv(n.operations,n.cleanup_failures,{expanded:n.expanded});it(_v({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var mv=Wt("views:worker"),gv="tab:worker:ready",bv="tab:worker:blocked",hv="tab:worker:in-progress",yv="tab:worker:resolved",vv="tab:worker:closed",Ba=1,Ff=5;function jf(e){return Js(e).evidence==="published"}var wv=new Set(["quick_fix","spec_backed","full_plan"]);function Bf(e){return typeof e=="string"&&wv.has(e)}var Hf="beads-ui.worker.candidate-filter",Cl={show_blocked:!1,spec:"all"};function kv(){try{let e=window.localStorage.getItem(Hf);if(!e)return{...Cl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Cl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...Cl}}}function $v(e){try{window.localStorage.setItem(Hf,JSON.stringify(e))}catch{}}function xv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Av=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gf="bdui.worker.candidate_sort",Kf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],Ol="spec";function Vf(e){return Kf.some(t=>t.value===e)?e:Ol}function Sv(){try{return Vf(window.localStorage.getItem(Gf))}catch{return Ol}}function Ev(e){try{window.localStorage.setItem(Gf,e)}catch{}}var Yf="bdui.worker.done-range";function Tv(){try{let e=window.localStorage.getItem(Yf);return e===null?"today":Vn(e)}catch{return"today"}}function Cv(e){try{window.localStorage.setItem(Yf,e)}catch{}}function Uf(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function Rv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(Sr):t==="updated"?r.sort(Ao):(r.sort(So(n)),t==="board"?r:[...r.filter(jf),...r.filter(s=>!jf(s))])}function Ov(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Lv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var Iv="\u{1F512} blocked";function Wf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function Mv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function Pv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function Dv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function Nv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function qv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function Rl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var Fv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),jv=new Set(["waiting_metadata","reviewing","retrying"]);function Bv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?pn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Uv(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Wv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Uv(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!Fv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function zf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function zv(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(zf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${zf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=Mv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Wf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Wf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Hv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,m=null,y=null,b={},k=!1,F=!1,G={},V=null){let ie=!!l&&l.position>0,Y=!!l?.continuation_action&&l.continuation_action.continuation===null,B=!!l&&l.active===!0,q=l&&l.failure||null,W=Dv(l?l.waiting:null,y),L=n[e]||null,M=L&&L.gate?L.gate:null,re=L&&L.pr?L.pr:null,ge=Nv(l?l.resolution:null),we=qv(l?l.head_review:null),le=l&&l.head_review||null,_e=Bv(y,le),Ae=Wv(y,_e),Ge=l&&l.authority||null,be=!!le&&["pending","reviewing","revising"].includes(le.state),J=!!y&&typeof y=="object"&&jv.has(y.phase),Oe=ie&&!B&&(le?.state==="failed"||!Ge||J||Ge.source==="automatic"&&!F),Ne=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":ge?ge.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":W,T=!!M&&M.base_badge==="\uCDA9\uB3CC",te=!!M&&M.enabled===!0,Se=Ns({bead_id:e,merge_sha:G.merge_sha,cleanup_cursor:G.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:G.repo_operations}),$e=_a(Se),Ce=o&&!Se&&(o.queueing??null)?o.queueing:null,he=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!M&&M.tier==="merged",Le=i&&!!r&&!!M&&M.tier==="merged",tt=Oe&&(te||T||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||he||Le),xt=i&&T&&u===!1,kt=jn(b,e,{external:i,merge_active:B||Se?.step==="merge",merge_queued:ie,conflict_active:!!a,cleanup_active:$e,merged:!!r||M?.tier==="merged"}),_t=!!kt.operation,P=!he&&!!r&&r.step==="repo_operations",ae=zv({continuation_required:Y,queueing:Ce,merge_step:Se,conflict_badge:Ne,conflict_live:ge?.live===!0||a==="running",head_review:le&&we?{...we,state:le.state,failure_reason:le.failure_reason}:null,auto_resolution:_e,recovery:Ae,cleanup_failed:r,cleanup_label:r?Rr(r.step):null,base_exception:m,conflicting:T,gate:M,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:q,auto_skip:d,queued:ie,queue_active:B,queue_position:l?l.position:0,activity:Ne?null:o&&o.activity||null}),Ie=ae?.live===!0&&ae.title?c`<span title=${ae.title}>${ae.label}</span>`:ae?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&Se?.active!==!0?fa(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...V?{dependency_chips:V}:{},external:i,pr_number:re&&typeof re.number=="number"?re.number:null,pr_url:re&&typeof re.url=="string"?re.url:"",completion_badge:ae?.live!==!0&&ae?.title?ae.label:null,completion_title:ae?.title||"",completion_repair_pr_url:Ae?Ae.repair_pr_url:"",completion_repair_pr_number:Ae?Ae.repair_pr_number:null,badges:Ie?[Ie]:[],live_badge:ae?.live===!0?Ie:null,usage:s,alert:ae?.alert===!0,merge_action:M?.tier==="merged"&&!he&&!Le||P?!1:!ie||Y||Oe,timeline_action:P,cancel_action:ie&&!Y,cancel_enabled:(!B||be)&&!(Ae&&Ae.lock_actions),cancel_title:Ae&&Ae.lock_actions?`${Ae.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:B&&!be?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":be?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:kt,discard_action:kt.action,merge_step:Se,discard_enabled:kt.enabled,discard_title:kt.title,merge_enabled:!Se&&!Ce&&!a&&!_t&&!m&&!(Ae&&Ae.lock_actions)&&!xt&&!P&&(te||T||M?.reason==="base_behind"||M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"||M?.reason==="review_receipt_undetermined"||he||Le||tt||J&&!B),merge_label:Y?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":he||Le?"\uC815\uB9AC \uC7AC\uAC1C":T&&!Se&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":M?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":M?.reason==="review_receipt_missing"||M?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Oe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:_t?kt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${kt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${kt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Y?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ce?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":Se?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Se.label}`:Le?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":xt?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":T?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":M?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":te?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:M&&M.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${M&&M.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ll(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:m,doneRange:y,onDoneRangeChange:b}=t,k=r?To(r,i):null,F=Lo({transport:n,uiOrderStore:i}),G=null,V=[],ie=kv(),Y=null,B=null,q={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},W=Sv(),L=y?Vn(y):Tv(),M=new Map;function re(){let _=jr.find(w=>w.value===L);return _?_.label:"\uC624\uB298"}let ge=Da("beads-ui.worker.lane-collapsed"),we=!1,le=new Set,_e=new Set,Ae=new Set,Ge=new Set,be=new Set,J={},Oe=null,Ne=0,T=null,te=[];function Se(_){return Oe===_?J:{}}async function $e(){if(!n)return;let _=u?.()||"";if(Oe===_||T&&T.key===_&&T.generation===Ne)return;let w=++Ne;T={key:_,generation:w};let K=null;try{K=await Promise.resolve(n("get-session-defaults",{}))}catch(de){if(w!==Ne)return;T=null,mv("get-session-defaults failed: %o",de),Qe();return}w===Ne&&(J=K&&typeof K.values=="object"&&K.values!==null?{...K.values}:{},Oe=_,T=null,Qe())}function Ce(){Oe=null,Ne+=1,$e()}let he=document.createElement("div");he.className="worker-console";let Le=document.createElement("div");Le.className="worker-top";let tt=document.createElement("div");tt.className="worker-drawer-overlay",tt.hidden=!0;let xt=document.createElement("div");xt.className="worker-drawer-overlay__backdrop";let kt=document.createElement("div");kt.className="worker-drawer-host";let _t=document.createElement("div");_t.className="worker-drawer-host",_t.hidden=!0,tt.append(xt,kt,_t);let P=document.createElement("div");P.className="worker-lanes-host",he.append(Le,tt,P),e.appendChild(he);let ae=null,Ie=null,qe=os(kt,{transport:n,sessionLogStore:a,onClose:()=>{ae=null,Ie=null,tt.hidden=!0,Qe()}}),Ze=qf(_t,{onClose:()=>{_t.hidden=!0,tt.hidden=!0,Qe()}}),st=Rf({getWorkspacePath:u||(()=>"")}),mt=u&&u()||"",gt=Of({queueStore:s,transport:n,onChanged:()=>Qe(),onOpenScript:(_,w)=>{st.open(_,w)}}),ne=o?Sf(he,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(_,w)=>C(_,w)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ba,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function We(){let _=Q(),w=typeof _.serial_lane_count=="number"&&Number.isInteger(_.serial_lane_count)&&_.serial_lane_count>0?Math.min(_.serial_lane_count,5):0,K=Array.isArray(_.serial_lanes)?_.serial_lanes:[],de=[];for(let ft of K){if(de.length>=w)break;!ft||typeof ft.id!="string"||!/^s[1-5]$/.test(ft.id)||!Array.isArray(ft.entries)||de.push({id:ft.id,label:`\uC9C1\uB82C ${ft.id.slice(1)}`,count:ft.entries.length})}return de.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(_.queue)?_.queue:[]).length},...de]}function ut(_){if(!Y||!_.some(K=>K.id===Y))return null;let w=We();return w?{bead_id:Y,lanes:w}:null}function He(){let _=Q();return typeof _.revision=="number"?_.revision:0}function ve(_){_&&_.queue&&s&&s.set(_.queue)}function Je(){let _=Q().queue;return Array.isArray(_)?_.length:0}async function lt(_,w,K){if(!n)return;let de=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},...K===void 0?{}:{index:K},expected_revision:He()}),Te=await n("worker-queue-place",de());ve(Te),Te&&Te.conflict&&await n("worker-queue-place",de()).then(ve)}async function dt(_,w,K){if(!n)return;let de=()=>({bead_id:_,...w==="parallel"?{}:{lane:w},to_index:K,expected_revision:He()}),Te=await n("worker-queue-reorder",de());ve(Te),Te&&Te.conflict&&await n("worker-queue-reorder",de()).then(ve)}async function pt(_){if(!n)return;let w=await n("worker-queue-remove",{bead_id:_,expected_revision:He()});ve(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:_,expected_revision:He()}).then(ve)}async function Ut(_){if(!n||!_)return;let w=await n("worker-attempt-pause",{attempt_id:_});w&&w.paused===!1&&w.reason&&ce(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Dt(_){if(!n||!_)return;let w=await Vr();if(w===null)return;let K=async(Te={})=>await n("worker-attempt-resume",{attempt_id:_,expected_revision:He(),...w!==""?{instructions:w}:{},...Te}),de=await K();ve(de),de&&de.conflict&&(de=await K(),ve(de)),de=await nr(de,(Te,ft)=>K({continuation:Te,decision_token:ft}),{onResult:ve,refresh:()=>K()}),de&&de.resumed===!1&&!de.conflict&&de.reason&&ce(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${de.reason}`,"error",2400)}async function zt(_){if(!n||!_)return;let w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:He()});ve(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:_,expected_revision:He()}),ve(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&ce(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Et(_,w,K=!0){if(!n)return null;let de=n,Te=await de(_,{...w,expected_revision:He()});return ve(Te),Te&&Te.conflict&&K&&(Te=await de(_,{...w,expected_revision:He()}),ve(Te)),Te}async function Tt(_){if(!n||!_)return;let w=Q().merge_queue?.find(de=>de.bead_id===_)?.continuation_action;if(w?.mismatch&&w.continuation===null){await ze(_,w.mismatch);return}le.add(_),Qe();let K;try{K=await Et("worker-merge-queue-add",{bead_id:_})}catch{ce("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{le.delete(_),Qe()}if(!(!K||K.applied)){if(K.conflict){ce("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}ce(Pv(K.reason),"error",2400)}}async function ot(_){if(!(!n||!_||_e.has(_))){_e.add(_),Qe();try{let w=await n("worker-cleanup-retry",{bead_id:_,expected_revision:He()});ve(w),w&&!w.retried&&!w.conflict&&w.reason&&ce(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{_e.delete(_),Qe()}}}async function ze(_,w){let K=await nr({continuation_mismatch:w},(Te,ft)=>Et("worker-merge-queue-add",{bead_id:_,continuation:Te,decision_token:ft},!1)),de=K?.queue?.merge_queue?.find(Te=>Te.bead_id===_)?.continuation_action;if(K?.applied!==!0&&de?.continuation===null&&de.mismatch){await ze(_,de.mismatch);return}K&&K.applied===!1&&!K.conflict&&ce("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function D(_){if(!n)return;let w=await Et("worker-merge-auto-toggle",{on:_});!w||w.conflict||ce(_?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",_?"success":"info",2400)}async function ee(_){if(!n||!_)return;let w=await Et("worker-merge-queue-remove",{bead_id:_});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&ce("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ye(){await Et("worker-merge-queue-remove",{all:!0})}async function O(_,w=null,K="unmerged",de=null){if(!n||!_)return;let Te=Ms(_,K);if(!(!!de||typeof globalThis.confirm!="function"||globalThis.confirm(Te)))return;let at=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...de?{operation_id:de}:{},expected_revision:He()});if(ve(at),at&&at.conflict&&(at=await n("worker-discard",{bead_id:_,...w?{attempt_id:w}:{},...de?{operation_id:de}:{},expected_revision:He()}),ve(at)),at&&at.discarded===!0){ce(oa(at),"success",5e3);return}if(at&&at.reason){ce(`\uD3D0\uAE30 \uC2E4\uD328: ${at.reason}`,"error",2800);return}if(at&&at.accepted&&at.pending==="merged_revert"){ce("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(at&&at.accepted&&!at.discarded){ce(`\uD3D0\uAE30 \uC9C4\uD589: ${at.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}at&&!at.conflict&&ce("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function z(_,w,K){if(!(!n||!w||!K||Ge.has(w))){Ge.add(w),Qe();try{let de=await n(_,{bead_id:w,action_id:K,expected_revision:He()});ve(de),de?.conflict?ce("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!de?.ok&&de?.reason&&ce(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(de.reason)}`,"error",2800)}finally{Ge.delete(w),Qe()}}}async function Re(_,w){if(!n||!w||Ae.has(w))return;Ae.add(w),Qe();let K;try{let de=async(Te={})=>await n(_,{bead_id:w,expected_revision:He(),...Te});K=await de(),ve(K),K&&K.conflict&&(K=await n(_,{bead_id:w,expected_revision:He()}),ve(K)),_==="worker-revise-fix"&&(K=await nr(K,(Te,ft)=>de({continuation:Te,decision_token:ft}),{onResult:ve,refresh:()=>de()}))}finally{Ae.delete(w),Qe()}if(!(!K||K.conflict)){if(K.ok){ce(_==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ce(`\uCC98\uBD84 \uAC70\uBD80: ${K.reason||""}`,"error",3e3)}}async function A(_){if(!n)return;let w=await n("worker-automation-toggle",{on:_,expected_revision:He()});ve(w),w&&w.conflict&&await n("worker-automation-toggle",{on:_,expected_revision:He()}).then(ve)}async function R(_){if(!n||!_)return;let w=await n("worker-repo-operation-repair",{operation_id:_});if(ve(w),w&&w.ok===!1){ce(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&ce("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function X(_){if(!n||!_)return;let w=await n("worker-repo-operation-dismiss",{operation_id:_});ve(w),w&&w.ok===!1&&ce(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function me(_){if(!n||!Number.isFinite(_))return;let w=Math.max(Ba,Math.floor(_)),K=await n("worker-queue-set-slots",{slots:w,expected_revision:He()});ve(K),K&&K.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:He()}).then(ve)}async function oe(_){if(!n||!Number.isInteger(_)||_<1||_>Ff)return;let w=Q(),K=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(_).reduce((ft,at)=>ft+(Array.isArray(at?.entries)?at.entries.length:0),0),de=()=>({count:_,expected_revision:He()}),Te=await n("worker-queue-set-serial-lane-count",de());ve(Te),Te&&Te.conflict&&(Te=await n("worker-queue-set-serial-lane-count",de()),ve(Te)),Te&&Te.applied&&K>0&&ce(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${K}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let Me="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function E(_,w){let K=vl(_,w.id,q);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:K.kind==="note"?{kind:"note",text:K.text}:K.kind==="disabled"?{kind:"disabled",label:Me,title:K.title}:{kind:"place",label:Me,title:K.title}}}function U(_,w){if(!B||B.bead_id!==_)return null;let K=B.counterpart_id,de=w.filter(Te=>Te.id===K);return de.length===0?null:{rows:de.map(Te=>E(_,Te))}}async function ke(_,w){let K=vl(_,w,q);if(B=null,K.kind!=="ops"){Qe();return}let de=He();for(let Te of K.ops){let ft=await rt(Te,de);if(ft===null)break;de=ft}Qe()}async function rt(_,w){if(!n)return null;try{let K=await n("worker-queue-place",{bead_id:_.bead_id,lane:_.lane,index:_.index,expected_revision:w});if(ve(K),K&&K.conflict)return ce("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!K||K.applied!==!0)return ce(K&&typeof K.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${K.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let de=K.queue?K.queue.revision:void 0;return typeof de!="number"?(ce("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):de}catch(K){return ce(K instanceof Error&&K.message?K.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function pe(){let _=Q(),w=k?k.selectBoardColumn(gv,"ready"):[],K=k?k.selectBoardColumn(bv,"blocked"):[],de=k?k.selectBoardColumn(vv,"closed"):[],Te=k?k.selectBoardColumn(hv,"in_progress"):[],ft=k?k.selectBoardColumn(yv,"resolved"):[],at=Ro([...w,...K,...Te,...ft,...de]),Jt=new Map;for(let f of[...w,...K,...Te])f&&f.id&&!Jt.has(f.id)&&Jt.set(f.id,f);let nn={...Se(u?.()||"")};for(let f of["orchestration_model","orchestration_effort","orchestration_speed"]){let N=_[f];typeof N=="string"&&(nn[f]=N)}function rn(f,N){let ue=Jt.get(f);if(!ue)return null;let Ke=ue.metadata&&typeof ue.metadata=="object"?ue.metadata:{},et=ue.workflow?.route,Qt=Ke.route,Mt=Bf(et)?et:Bf(Qt)?Qt:null;return Tn({pin:Ke,global:nn,execution_defaults:_.execution_defaults??null,runner_catalog:_.runner_catalog??null,route:Mt,controller_runtime:N})}function yn(f){let N=f.runner||null,ue=rn(f.bead_id,N),Ke=Os(f),et=ue?mr(ue,N):null;return Ke||et?{orchestration:Ke,worker:et}:null}let p=new Map;function g(f){if(p.has(f))return p.get(f)??null;let N=rn(f,null),ue=null;if(N){let Ke=Fn(_.runner_catalog??null,N.orchestration_model.value??""),et=Ke===null?N:rn(f,Ke),Qt=Cr(et,_.runner_catalog??null),Mt=mr(et,Ke);ue=Qt||Mt?{orchestration:Qt,worker:Mt}:null}return p.set(f,ue),ue}function v(f){let N=Oo(at,f);return N.total===0?null:N}let x=_.bead_titles||{},j=new Map;for(let[f,N]of Object.entries(x))typeof N=="string"&&N.length>0&&j.set(f,N);for(let f of[...w,...K])j.set(f.id,f.title||f.id);let Z=new Map;for(let f of[...w,...K,...Te,...ft,...de])f&&f.id&&typeof f.from_id=="string"&&Z.set(f.id,f.from_id);let se=new Map;for(let f of[...w,...K,...Te,...ft,...de])f&&f.id&&typeof f.priority=="number"&&se.set(f.id,f.priority);let De=_.bead_times&&typeof _.bead_times=="object"&&!Array.isArray(_.bead_times)?_.bead_times:{},xe=_.bead_labels&&typeof _.bead_labels=="object"&&!Array.isArray(_.bead_labels)?_.bead_labels:{},h=_.bead_workflow&&typeof _.bead_workflow=="object"&&!Array.isArray(_.bead_workflow)?_.bead_workflow:{},H=new Map;for(let[f,N]of Object.entries(xe))Array.isArray(N)&&H.set(f,Sl(N));for(let f of[...w,...K]){let N=f.labels;Array.isArray(N)&&!H.has(f.id)&&H.set(f.id,Sl(N))}let I=new Map,Ee=o?.get()?.last_good?.result?.groups;for(let f of Array.isArray(Ee)?Ee:[]){if(f?.eligible!==!0||!Array.isArray(f.members))continue;let N=f.members.map(Ke=>{let et=(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).find(Qt=>Qt.entries.some(Mt=>Mt.bead_id===Ke));return et?et.id:null});if(!(N.every(Ke=>Ke!==null)&&new Set(N).size===1))for(let Ke of f.members)I.set(Ke,f.members.filter(et=>et!==Ke))}let Xe=_.bead_blocked_by&&typeof _.bead_blocked_by=="object"&&!Array.isArray(_.bead_blocked_by)?_.bead_blocked_by:{},nt=_.blocker_workspaces&&typeof _.blocker_workspaces=="object"&&!Array.isArray(_.blocker_workspaces)?_.blocker_workspaces:{},bt=new Map;for(let[f,N]of Object.entries(De))N&&typeof N=="object"&&bt.set(f,N);for(let f of[...w,...K])bt.set(f.id,{created_at:f.created_at,updated_at:f.updated_at});let Ye=f=>bt.get(f)||{},ht=_.pr_wait||[],gn=_.pr_observations||{},so=_.pr_activity||{},Ue=_.cleanup_failed||{},St=Object.entries(Ue).map(([f,N])=>({bead_id:f,step:N&&N.step?N.step:"",reason:N&&N.reason?N.reason:"",at:N&&typeof N.at=="number"?N.at:null,detail:N&&typeof N.detail=="string"?N.detail:null,output_tail:N&&typeof N.output_tail=="string"&&N.output_tail?N.output_tail:void 0,log_path:N&&typeof N.log_path=="string"&&N.log_path?N.log_path:void 0,retry_count:N&&typeof N.retry_count=="number"&&Number.isInteger(N.retry_count)&&N.retry_count>0?N.retry_count:0,failure_code:N&&typeof N.failure_code=="string"?N.failure_code:void 0,subject_id:N&&typeof N.subject_id=="string"?N.subject_id:void 0,repair_eligible:!!(N&&N.repair_eligible),repair:N&&N.repair?N.repair:void 0})),dn=_.queue||[],Dl=new Set([...dn.map(f=>f.bead_id),...(Array.isArray(_.serial_lanes)?_.serial_lanes:[]).flatMap(f=>(Array.isArray(f?.entries)?f.entries:[]).map(N=>N.bead_id)),...ht.map(f=>f.bead_id),..._.done.map(f=>f.bead_id)]),l_=new Set(K.map(f=>f.id)),c_=i?i.get()?.order||{}:{},Nl=new Set,ql=[];for(let f of[...w,...K])Dl.has(f.id)||Nl.has(f.id)||Ov(f)||(Nl.add(f.id),ql.push(f));V=Rv(ql,W,c_);let u_=_.admission||{},Fl=f=>{let N=u_[f];if(!N)return"";if(N.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ue=typeof N.reason=="string"?N.reason:"",Ke=ue.indexOf(":");return Ke>0&&Ke<ue.length-1?`\u26D4 ${ue.slice(0,Ke)} (${ue.slice(Ke+1)})`:`\u26D4 ${ue}`},jl=new Map,d_=V.map(f=>{let N=Js(f),ue=N.evidence==="published",Ke=f.workflow?.route==="quick_fix"||f.metadata&&f.metadata.route==="quick_fix",et=!Object.hasOwn(f,"description")||typeof f.description=="string"&&f.description.trim().length>0,Qt=Object.hasOwn(f,"labels")&&xf(f.labels),Mt=Qt||!Object.hasOwn(f,"labels")?"":Af(f.labels,f.metadata),Nr=Mt.length>0,Pt=!Qt&&(Ke?et:ue&&!N.conflict),_o=l_.has(f.id),Jn=[];if(_o){let mo=Lv(f);mo.length>0?jl.set(f.id,mo):Jn.push(Iv)}Ke&&!et?Jn.push("missing_description"):!Ke&&N.conflict?Jn.push("spec_id_conflict"):!Ke&&N.evidence==="none"?Jn.push("spec \uC5C6\uC74C"):!Ke&&N.evidence==="draft"&&Jn.push("spec \uBBF8\uBC1C\uD589(draft)");let qr=Fl(f.id);return qr&&Jn.push(qr),{id:f.id,title:f.title||f.id,reason:Jn.join(" \xB7 "),draggable:Pt,lane:"candidate",created_at:f.created_at,updated_at:f.updated_at,workflow:f.workflow,is_quick_fix:Ke,status:f.status,worker_ineligible:Qt,session_preferred:Nr,session_preferred_reason:Mt,blocked:_o,has_spec:ue,exec_chips:g(f.id),from_id:f.from_id||void 0,priority:se.get(f.id)}}),Ua=xv(d_,ie),Wa=Ua.visible,p_=_.revise_parked||{},oo=_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},f_=f=>{let N=h[f]?.chips?.pr;return N&&typeof N.number=="number"&&typeof N.url=="string"?{pr_number:N.number,pr_url:N.url}:{}},za=(f,N)=>f.map((ue,Ke)=>{let et=N!=="done",Qt=N!=="done"&&N!=="queue",Mt=et?p_[ue.bead_id]:null,Nr=et?jn(oo,ue.bead_id):null,Pt=Nr?.operation?Nr:null,_o=et&&H.get(ue.bead_id)===!0,Jn=_.admission&&typeof _.admission=="object"?_.admission[ue.bead_id]:null,qr=et?sd(Jn,!!Pt||Ge.has(ue.bead_id)):null,mo=et&&!qr?Fl(ue.bead_id):null,S_=et?[mo]:[],gc=[],ei=et?I.get(ue.bead_id):void 0;return ei&&ei.length>0&&gc.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${ei.join(", ")}\uC640`),{id:ue.bead_id,title:j.get(ue.bead_id)||ue.bead_id,reason:S_.filter(Boolean).join(" \xB7 "),draggable:et&&!Pt&&!qr,done:N==="done",lane:N,seq:Qt?Ke+1:void 0,worker_serial:_o,discard:Pt,stale_work:qr,badges:[...gc,...Mt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...N==="done"?na(_.attempts||{},ue.bead_id):[]],alert:!!Mt,revise_action:!!Mt,revise_enabled:!!Mt&&!Pt&&!Ae.has(ue.bead_id),revise_title:Mt?Mt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Mt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:N==="done"?Mn(_.attempts||{},ue.bead_id):null,work_ms:N==="done"?ra(_.attempts||{},ue.bead_id):null,done_at:N==="done"&&typeof ue.added_at=="number"?ue.added_at:void 0,exec_chips:et?g(ue.bead_id):null,workflow:et&&h[ue.bead_id]||null,...N==="done"?f_(ue.bead_id):{},from_id:Z.get(ue.bead_id)||void 0,priority:se.get(ue.bead_id),...Ye(ue.bead_id)}}),Mr=_.attempts?Object.values(_.attempts).filter(Tr):[],Ha=new Set;for(let f of Mr)f&&typeof f.resumed_from=="string"&&f.resumed_from.length>0&&Ha.add(f.resumed_from);let Bl=new Map;for(let f of Mr)Bl.set(f.bead_id,f.attempt_id);let is=new Map;for(let f of Mr)is.set(f.attempt_id,f);function Ga(f){let N=new Set,ue=f;for(;ue&&!N.has(ue.attempt_id);){if(ue.conflict_resolution===!0)return!0;N.add(ue.attempt_id),ue=typeof ue.resumed_from=="string"&&ue.resumed_from.length>0&&is.get(ue.resumed_from)||null}return!1}let ao=typeof _.declared_base=="string"?_.declared_base:null;function __(f){let N=null;for(let ue of Mr)!ue||ue.bead_id!==f||Ga(ue)||(N===null||(typeof ue.started_at=="number"?ue.started_at:0)>=(typeof N.started_at=="number"?N.started_at:0))&&(N=ue);return N&&typeof N.target_base=="string"?N.target_base:null}let Ka=[],io=[],m_=$f(_),Ul=f=>{let N=typeof f.session_id=="string"&&f.session_id.length>0,ue=Ha.has(f.attempt_id);return{eligible:N&&!ue,reason:N?ue?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Dn=null;for(let f of Mr){let N=f.status==="paused"&&!Ha.has(f.attempt_id);if(f.status==="running"||N)io.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:j.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,paused:N,conflict_resolution:Ga(f),base_exception:Rl(ao,f.target_base),can_pause:typeof f.session_id=="string"&&f.session_id.length>0,discard:jn(oo,f.bead_id,{attempt_id:f.attempt_id}),workflow:h[f.bead_id]||null,priority:se.get(f.bead_id),usage:Mn(_.attempts||{},f.bead_id),rollup:v(f.bead_id),rollup_expanded:be.has(f.bead_id),exec_chips:yn(f),...Ye(f.bead_id)});else if((f.status==="failed"||f.status==="orphaned")&&m_(f)){let ue=Ul(f);Ka.push({bead_id:f.bead_id,attempt_id:f.attempt_id,title:j.get(f.bead_id)||f.bead_id,runner:f.runner||null,model:f.model||null,effort:f.effort||null,speed:f.speed||null,continuation_mode:f.continuation_mode||null,started_at:typeof f.started_at=="number"?f.started_at:null,resumed_from:f.resumed_from||null,failed:!0,status:f.status,status_label:f.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jn(oo,f.bead_id,{attempt_id:f.attempt_id}),resume_eligible:ue.eligible,resume_reason:ue.reason,conflict_resolution:Ga(f),base_exception:Rl(ao,f.target_base),workflow:h[f.bead_id]||null,priority:se.get(f.bead_id),usage:Mn(_.attempts||{},f.bead_id),rollup:v(f.bead_id),rollup_expanded:be.has(f.bead_id),exec_chips:yn(f),...Ye(f.bead_id)}),Dn=f}}let Wl=new Set([...Ka,...io].map(f=>f.bead_id)),zl=new Map;for(let f of Array.isArray(_.session_active)?_.session_active:[]){let N=f&&f.bead_id;if(!(typeof N!="string"||N.length===0||Wl.has(N))){if(Wl.add(N),Array.isArray(f.blocked_by)){let ue=f.blocked_by.filter(Ke=>typeof Ke=="string"&&Ke.length>0);ue.length>0&&zl.set(N,ue)}io.push({bead_id:N,attempt_id:null,kind:"session",title:f.title||j.get(N)||N,status:"in_progress",started_at:qn(f.started_at)??qn(f.updated_at),updated_at:qn(f.updated_at),workflow:f.workflow||null,session_refs:Array.isArray(f.session_refs)?f.session_refs:[],priority:se.get(N),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Pr=[...Ka,...io].map(f=>{let N=is.get(f.attempt_id),ue=N?.quickfix_landing;if(N?.quickfix_lane!==!0||!ue||typeof ue!="object")return f;let Ke=typeof ue.reason=="string"&&ue.reason.length>0?ue.reason:null,et=Ns({bead_id:N.bead_id,merge_sha:ue.head_sha,cleanup_cursor:ue.cursor,cleanup_failed:Ke?{step:ue.cursor,reason:Ke}:null,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]});return et?{...f,landing:et}:f}),Hl=null;if(Dn){let f=Ul(Dn),N=Dn.cause_detail;Hl={bead_id:Dn.bead_id,repo:Dn.repo||"",reason:Dn.cause||Dn.status,cause_detail:N&&typeof N.reason=="string"?{reason:N.reason,command:typeof N.command=="string"?N.command:null}:null,resume_attempt_id:Dn.attempt_id,resume_eligible:f.eligible,resume_reason:f.reason,discard:jn(oo,Dn.bead_id,{attempt_id:Dn.attempt_id})}}let Gl=new Set(Pr.map(f=>f.bead_id)),Va=Array.isArray(_.merge_queue)?_.merge_queue:[],Kl=new Map,Vl=new Map,Yl=new Map,Zl=new Map,Ql=new Map;Va.forEach((f,N)=>{f&&typeof f.bead_id=="string"&&(Kl.set(f.bead_id,N+1),Vl.set(f.bead_id,f.resolution),Yl.set(f.bead_id,f.continuation_action||null),Zl.set(f.bead_id,f.head_review||null),Ql.set(f.bead_id,f.authority||null))});let Dr=_.merge_queue_state||{active:null,failures:{}},g_=Dr.failures||{},Xl=Dr.waiting&&typeof Dr.waiting.bead_id=="string"&&typeof Dr.waiting.reason=="string"?Dr.waiting:null,b_=_.auto_merge_skips||{},Jl=f=>{let N=b_[f];if(!N)return null;let ue=gn[f],Ke=ue&&ue.pr?ue.pr.head_sha:null;return Ke&&Ke===N.head_sha?N.reason||"":null},lo=new Map;for(let f of Pr)f.failed!==!0&&f.conflict_resolution&&(f.paused?lo.has(f.bead_id)||lo.set(f.bead_id,"paused"):lo.set(f.bead_id,"running"));let ec=Pr.filter(f=>f.kind!=="session"&&!f.paused&&f.failed!==!0).length,tc=(_.workspace_info||{}).slots,nc=typeof tc=="number"?tc:typeof _.slots=="number"?_.slots:Ba,h_=ec>nc,co=xr(L),y_=(Array.isArray(_.done)?_.done.slice():[]).filter(f=>co===void 0||typeof f.added_at!="number"||f.added_at>=co).sort((f,N)=>(N.added_at||0)-(f.added_at||0)),ls=za(y_,"done"),v_=new Set((Array.isArray(_.done)?_.done:[]).map(f=>f?.bead_id).filter(f=>typeof f=="string")),rc=[],w_=u?.()||"";for(let f of de){let N=qn(f.closed_at);if(typeof f.id!="string"||v_.has(f.id)||N===null||co!==void 0&&N<co||typeof f.comment_count!="number"||f.comment_count<=0)continue;let ue=`${w_}\0${f.id}\0${String(f.updated_at)}\0${f.comment_count}`,Ke=M.get(ue);if(Ke===void 0&&n&&(M.set(ue,"pending"),Promise.resolve(n("get-comments",{id:f.id})).then(et=>{let Qt=Array.isArray(et)&&et.some(Mt=>Ca(typeof Mt?.text=="string"?Mt.text:"")?.lane==="session");M.set(ue,Qt?"session":"not-session"),Qe()}).catch(()=>{M.set(ue,"failed"),Qe()})),Ke==="session"){let et=qn(f.started_at);rc.push({id:f.id,title:f.title||f.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:et!==null&&N>=et?N-et:null,work_kind:"session",done_at:N,created_at:f.created_at,updated_at:f.updated_at})}}ls.push(...rc),ls.sort((f,N)=>(N.done_at||0)-(f.done_at||0));let uo={};for(let f of Zn)uo[f]=0;let sc=!1,oc=0,Ya=0,ac=0;for(let f of ls){let N=f.usage;if(N&&typeof N=="object"){let ue=!1;for(let Ke of Zn)Number.isFinite(N[Ke])&&(uo[Ke]+=N[Ke],sc=!0,ue=!0);ue&&(Ya+=1,Number.isFinite(N.total_cost_usd)&&(oc+=N.total_cost_usd,ac+=1))}}Ya>0&&ac===Ya&&(uo.total_cost_usd=oc);let ic=ls.map(f=>f.usage).filter(f=>f&&typeof f=="object"&&f.providers),k_=ic.length>0?fn(Uo(ic)):sc?rr(uo):null,lc=_.lane_states&&typeof _.lane_states=="object"&&!Array.isArray(_.lane_states)?_.lane_states:{},cc=Array.isArray(_.serial_lanes)?_.serial_lanes:[],uc=f=>{if(ht.some(Ke=>Ke.bead_id===f))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let N=Mr.filter(Ke=>Ke&&Ke.bead_id===f),ue=N.length>0?N[N.length-1].status:null;return ue==="failed"||ue==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":ue==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},po=cc.filter(f=>f&&typeof f.id=="string"&&Array.isArray(f.entries)).map((f,N)=>{let ue=lc[f.id]||{},Ke=new Map((Array.isArray(ue.corrections)?ue.corrections:[]).filter(Pt=>Pt&&typeof Pt.bead_id=="string"&&typeof Pt.after=="string").map(Pt=>[Pt.bead_id,Pt.after])),et=Array.isArray(ue.occupied_by)?ue.occupied_by.filter(Pt=>typeof Pt=="string"):[],Qt=new Set(et),Mt=za(f.entries.filter(Pt=>!Gl.has(Pt.bead_id)&&!Qt.has(Pt.bead_id)),f.id).map(Pt=>Ke.has(Pt.id)?{...Pt,badges:[`\u{1F517} ${Ke.get(Pt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Pt.badges]}:Pt),Nr=et.map(Pt=>({id:Pt,title:j.get(Pt)||Pt,draggable:!1,lane:f.id,ghost:!0,badges:[uc(Pt)]}));return{id:f.id,index:N+1,rows:[...Nr,...Mt],occupied:et.length>0,badge:et.length>0?uc(et[0]):"\uB300\uAE30",cycle:ue.cycle===!0}}),dc=typeof _.serial_lane_count=="number"?_.serial_lane_count:po.length,Za=za(dn.filter(f=>!Gl.has(f.bead_id)),"queue"),pc=new Map,fc=new Set;for(let[f,N]of Object.entries(lc)){if(!/^s[1-5]$/.test(f))continue;let ue=N&&Array.isArray(N.occupied_by)?N.occupied_by:[];for(let Ke of ue)typeof Ke=="string"&&pc.set(Ke,f);ue.length>0&&fc.add(f)}let cr=[];for(let f of Pr)typeof f.bead_id=="string"&&cr.push({id:f.bead_id,title:j.get(f.bead_id)||f.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:pc.get(f.bead_id)??null});for(let f of ht){let N=f&&f.bead_id;typeof N!="string"||N.length===0||cr.push({id:N,title:j.get(N)||N,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let f of po)for(let N of f.rows)N.ghost!==!0&&cr.push({id:N.id,title:N.title,location_label:`${f.id} #${N.seq??""}`.trim(),kind:"serial",lane_id:f.id});Za.forEach((f,N)=>{cr.push({id:f.id,title:f.title,location_label:`#${N+1}`,kind:"parallel",lane_id:null})});for(let f of Wa)cr.push({id:f.id,title:f.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let _c={};for(let f of cc)f&&typeof f.id=="string"&&Array.isArray(f.entries)&&(_c[f.id]=f.entries.length);let Qa=new Map;for(let f of cr)Qa.has(f.id)||Qa.set(f.id,f);q={members_by_id:Qa,serial_raw_lengths:_c,serial_lane_count:dc,occupied_lanes:fc};let $_=Cp(_.bead_scope,cr),fo=new Map;for(let[f,N]of zl)fo.set(f,N);for(let[f,N]of jl)fo.set(f,N);for(let[f,N]of Object.entries(Xe))Array.isArray(N)&&fo.set(f,N.filter(ue=>typeof ue=="string"&&ue.length>0));let x_=ud(fo,cr,nt),Xa=(f,N=null)=>{let ue=$_.get(f),Ke=x_.get(f)||null,et=ue&&ue.overlaps.length>0?ue.overlaps:null,Qt=!!ue&&ue.scope_missing;if(!Ke&&!et&&!Qt)return N;let Mt=et?U(f,et):null;return{...N||{},...Ke?{predecessors:Ke}:{},...et?{overlaps:et}:{},...Qt?{scope_missing:!0}:{},...Mt?{popover:Mt}:{}}},Ja=f=>{let N=Xa(f.id,f.dependency_chips||null);return N&&(f.dependency_chips=N),f};for(let f of Za)Ja(f);for(let f of po)for(let N of f.rows)N.ghost!==!0&&Ja(N);for(let f of Wa)Ja(f);let mc=new Map;for(let f of Pr){let N=typeof f.bead_id=="string"?f.bead_id:"";if(N.length===0)continue;let ue=f.kind==="session",Ke=Xa(N),et=typeof f.attempt_id=="string"&&f.attempt_id.length>0?is.get(f.attempt_id):void 0,Qt=et&&et.last_activity&&typeof et.last_activity=="object"?et.last_activity:null,Mt=et&&Array.isArray(et.legs)?et.legs:[];!Ke&&!Qt&&Mt.length===0&&!ue||mc.set(N,{...Qt?{last_activity:Qt}:{},...Mt.length>0?{legs:Mt}:{},...Ke?{dependency_chips:Ke}:{}})}let A_=ht.map(f=>Hv(f.bead_id,j.get(f.bead_id)||f.bead_id,gn,Ue[f.bead_id]||null,Mn(_.attempts||{},f.bead_id),so[f.bead_id]||(le.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:_e.has(f.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),lo.get(f.bead_id)||null,f.external===!0,{position:Kl.get(f.bead_id)||0,active:Dr.active===f.bead_id,failure:g_[f.bead_id]||null,waiting:Xl?.bead_id===f.bead_id?Xl.reason:null,resolution:Vl.get(f.bead_id),continuation_action:Yl.get(f.bead_id),head_review:Zl.get(f.bead_id)||null,authority:Ql.get(f.bead_id)||null},f.wt_present!==!1,_.auto_merge===!0?Jl(f.bead_id):null,Rl(ao,__(f.bead_id)),_.completion_status&&typeof _.completion_status=="object"&&!Array.isArray(_.completion_status)&&_.completion_status[f.bead_id]||null,_.discard_operations&&typeof _.discard_operations=="object"&&!Array.isArray(_.discard_operations)?_.discard_operations:{},is.get(Bl.get(f.bead_id)||"")?.worker_serial===!0,_.auto_merge===!0,{merge_sha:f.merge_sha,cleanup_cursor:f.cleanup_cursor,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]},Xa(f.bead_id))).map(f=>({...f,workflow:h[f.id]||null,priority:se.get(f.id),...Ye(f.id)}));return{queue:_,idToTitle:j,candidates:Wa,candidate_hidden:{blocked:Ua.hidden_blocked,spec:Ua.hidden_spec},running:Pr,live_count:ec,slots:nc,over_cap:h_,failure:Hl,waiting:Za,serial_lanes:po,serial_lane_count:dc,running_overlays:mc,pr_wait:A_,merge_queue_length:Va.length,merge_queue_running:Va.length>0,auto_excluded:ht.map(f=>f.bead_id).filter(f=>Jl(f)!==null),declared_base:ao,done:ls,token_total:k_,cleanup_failures:St,repo_operations:Array.isArray(_.repo_operations)?_.repo_operations:[]}}function Ve(){let w=!!o?.get()?.job,K=!w&&o?.isPending?.()===!0,de=w?"\uBD84\uC11D \uC911":K?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${de?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${de?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${de?c`<span class="worker-analysis-btn__badge">${de}</span>`:""}
    </button>`}function yt(_){let w=_.waiting.length>0?_.waiting[0].id:"\u2014",K=c`<button
      type="button"
      class="worker-play${_.queue.auto_advance?" is-active":""}"
    >
      ${_.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,de=Nt(_),Te=_.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ft=_.queue.auto_advance?0:(Array.isArray(_.queue.queue)?_.queue.queue:[]).filter(g=>g&&typeof g.armed_by_lane=="string"&&g.armed_by_lane.length>0).length,at=ft>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${ft}건 진행 중</span
          >`:"",Jt=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${_.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${_.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${re()} 완료 <b>${_.done.length}</b></span
      >`,nn=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${_.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${_.declared_base||"?"}</span
    >`,rn=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ba}
          step="1"
          .value=${String(_.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Ff},(g,v)=>v+1).map(g=>c`<option
                value=${String(g)}
                ?selected=${_.serial_lane_count===g}
              >
                ${g}
              </option>`)}
        </select>
      </label>
      ${o?Ve():""} `,yn=Pp({failure:_.failure}),p=rd(_.repo_operations,_.cleanup_failures);return we?c`<div class="worker-ribbon">
          ${K} ${de}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Te}${at}${Jt}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${rn}</div>
          <div class="worker-kpi">${nn}</div>
        </div>
        ${p}${gt.template()}${yn}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${K}${de}${rn}</div>
        <div class="worker-kpi">
          ${Te}${at}${Jt}${nn}
          ${(Array.isArray(_.token_total)?_.token_total:_.token_total?[{label:_.token_total,tooltip:`${re()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(g=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${g.tooltip}
                >${re()} 완료 · 누적 ${g.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${p}${gt.template()}${yn}`}function $t(_){let w=_.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${ie.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Av.map(K=>c`<button
              type="button"
              class="worker-filter__chip${ie.spec===K.value?" is-active":""}"
              data-spec=${K.value}
              aria-pressed=${ie.spec===K.value?"true":"false"}
            >
              ${K.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function Lt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${W}
    >
      ${Kf.map(_=>c`<option value=${_.value} ?selected=${W===_.value}>
            ${_.label}
          </option>`)}
    </select>`}function Vt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${jr.map(_=>c`<option value=${_.value} ?selected=${L===_.value}>
              ${_.label}
            </option>`)}
      </select>
    </div>`}function Nt(_){let w=_.queue.auto_merge===!0;if(_.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${_.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let K=new Set(_.auto_excluded),de=_.pr_wait.filter(Te=>Te.merge_action&&Te.merge_enabled&&!K.has(Te.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${de>0?` ${de}`:""}
    </button>`}function on(_){return ua({parallel:{rows:_.waiting.map(w=>Bn(w)),count:_.waiting.length,collapsed:ge.isAreaCollapsed("parallel")},serial:{lanes:_.serial_lanes.map(w=>({id:w.id,title:`\uC9C1\uB82C ${w.index}`,rows:w.rows.map(K=>Bn(K)),count:w.rows.length,empty:w.rows.length===0,badge:w.badge,held:w.occupied,cycle:w.cycle})),collapsed:ge.isAreaCollapsed("serial")}})}function Rt(_){return Dp(_.running,Date.now(),ae,_.running_overlays)}function bn(_){return _.running.some(w=>w.kind!=="session"&&!w.paused&&w.failed!==!0)}function hn(_){let w=Qn({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4",items:_.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Lt(),controls:$t(_),collapsible:!0,collapsed:ge.isCollapsed("candidate"),place_menu:ut(_.candidates),onOpenDoc:m?(de,Te)=>m(Te):void 0}),K=Qn({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:_.done,empty:`${re()} \uC644\uB8CC \uC5C6\uC74C`,header_control:Vt(),collapsible:!0,collapsed:ge.isCollapsed("done"),preview:we?Array.isArray(_.token_total)?_.token_total.map(de=>de.label).join(" \xB7 "):_.token_total||Uf(_.done):void 0});return we?c`<div class="worker-lanes worker-lanes--mobile">
        ${da({live:bn(_),running_body:_.running.length>0?Rt(_):"",pr_wait_rows:_.pr_wait.map(de=>Bn(de)),count:_.running.length+_.pr_wait.length})}
        ${Qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_.waiting,count:_.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),preview:Uf(_.waiting),body:on(_)})}
        ${w} ${K}
      </div>`:c`<div class="worker-lanes">
      ${w}
      ${Qn({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:_.waiting,count:_.waiting.length,collapsible:!0,collapsed:ge.isCollapsed("queue"),body:on(_)})}
      ${Qn({id:"worker-pane-running",lane:"running",title:"\uC2E4\uD589 \uC911",items:_.running,header_control:c`<span class="worker-pane__meta"
          >슬롯 ${_.slots}</span
        >`,live:bn(_),collapsible:!0,collapsed:ge.isCollapsed("running"),body:Rt(_)})}
      ${Qn({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:_.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",collapsible:!0,collapsed:ge.isCollapsed("pr_wait")})}
      ${K}
    </div>`}function Xt(_){ge.toggle(_),Qe()}function an(_){ge.toggleArea(_),Qe()}function Qe(){let _=pe();it(yt(_),Le),it(hn(_),P)}function je(){let _=!0,w=Pa(K=>{if(we=K,_){_=!1;return}Qe()});te.push(w)}let $=null;function fe(_){$=_.target instanceof Element?_.target:null}function Fe(_){let K=_.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!K)return;if($&&K.contains($)&&$.closest("input, button, a")){_.preventDefault();return}let de=K.dataset.beadId||"",Te=K.dataset.lane||"";G={bead_id:de,from_lane:Te},he.classList.add("is-dragging");try{_.dataTransfer?.setData("text/plain",de),_.dataTransfer&&(_.dataTransfer.effectAllowed="move")}catch{}}function vt(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;let K=w.dataset.lane||"";K!=="candidate"&&K!=="queue"&&!/^s[1-5]$/.test(K)||(_.preventDefault(),_.dataTransfer&&(_.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Ft(_){_.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Ot(){he.classList.remove("is-dragging")}function Yt(_,w){let K=V.find(at=>at.id===_);if(!K)return;let de=V.filter(at=>at.id!==_),Te=de.length;if(w){let at=w.dataset.beadId;if(at===_)return;let Jt=de.findIndex(nn=>nn.id===at);Jt>=0&&(Te=Jt)}let ft=de.slice();ft.splice(Te,0,K),F.applyReorder(_,ft,Te)}function tn(_){let w=_.target?.closest?.(".worker-pane");if(!w)return;_.preventDefault(),w.classList.remove("worker-pane--drag-over"),he.classList.remove("is-dragging");let K=w.dataset.lane||"",de=G?.bead_id||_.dataTransfer?.getData("text/plain")||"",Te=G?.from_lane||"";if(G=null,!de)return;let ft=_.target?.closest?.(".worker-mini, .worker-card"),at=K==="queue"&&w.querySelector(".worker-wait__area--parallel > .worker-wait__area-body")||w,Jt=Array.from(at.querySelectorAll(".worker-mini, .worker-card")),nn=Jt.length;if(ft){let rn=Jt.indexOf(ft);rn>=0&&(nn=rn)}if(nn=Math.max(0,nn-at.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(nn=Je()),K==="candidate"){if(Te==="candidate"){Yt(de,ft);return}(Te==="queue"||/^s[1-5]$/.test(Te))&&pt(de);return}if(K==="queue"||/^s[1-5]$/.test(K)){let rn=K==="queue"?"parallel":K;Te===K?dt(de,rn,nn):lt(de,rn)}}function ln(_){ie=_,$v(_),Qe()}function xn(_){W=Vf(_),Ev(W),Qe()}function Ht(_){L=Vn(_),Cv(L),b?.(L),Qe()}function cn(_){let w=_.target?.closest?.(".worker-serial-lane-count");if(w){let Jt=Number.parseInt(w.value,10);Number.isFinite(Jt)&&oe(Jt).then(Qe);return}let K=_.target?.closest?.(".worker-filter__blocked");if(K){ln({...ie,show_blocked:K.checked});return}let de=_.target?.closest?.(".worker-done-range");if(de){Ht(de.value);return}let Te=_.target?.closest?.(".worker-sort");if(Te){xn(Te.value||Ol);return}let ft=_.target?.closest?.(".worker-slots__input");if(!ft)return;let at=Number.parseInt(ft.value,10);if(!Number.isFinite(at)){Qe();return}me(at).then(Qe)}function un(_){return _?{runner:_.runner||void 0,model:_.model||void 0,effort:_.effort||void 0,worktree:_.worktree||void 0,status:_.status||void 0,session_id:_.session_id||void 0}:{}}function mn(){let _=pe();return{operations:_.repo_operations,cleanup_failures:_.cleanup_failures,repo:u&&u()||""}}function Xn(){ae&&qe.close(),_t.hidden=!1,tt.hidden=!1,Ze.open(mn()),Qe()}function Kn(_){let w=Q(),K=w.attempts?w.attempts[_]:null;ae=_,Ie=null,Ze.close(),_t.hidden=!0,tt.hidden=!1,qe.open({attempt_id:_,meta:un(K)}),Qe()}function S(_){let w=Q(),K=(Array.isArray(w.session_active)?w.session_active:[]).find(Te=>Te&&Te.bead_id===_),de=(K&&Array.isArray(K.session_refs)?K.session_refs:[]).find(Te=>Te&&Te.current===!0);de&&(Ze.close(),_t.hidden=!0,tt.hidden=!1,qe.open(Yr(de,_,"in_progress")),Qe())}function C(_,w){ae=null,Ie=_,Ze.close(),_t.hidden=!0,tt.hidden=!1,qe.open({attempt_id:_,meta:w,hide_prompt:!0}),Qe()}function Pe(){if(Ze.isOpen()&&Ze.refresh(mn()),Ie){let K=(o?.get()?.runs||[]).find(de=>de.run_id===Ie);K?qe.updateMeta(Tl(K)):qe.close();return}if(!ae)return;let _=Q(),w=_.attempts?_.attempts[ae]:null;if(w){qe.updateMeta(un(w));return}qe.close()}function Be(_,w){if(_.length===0||!l)return;let K=u?u():void 0;if(w.length===0||!K||w===K||!d){l(_);return}Promise.resolve(d(w)).then(()=>{l(_)}).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function ct(_){let w=_.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let K=w?.closest?.(".worker-dep__open");if(K){Be(K.getAttribute("data-dep-id")||"",K.getAttribute("data-root-dir")||"");return}let de=w?.closest?.(".mon-overlap__chip");if(de){let Ue=de.closest("[data-bead-id]"),St=Ue&&Ue.getAttribute("data-bead-id")||"";if(St){let dn=de.getAttribute("data-overlap-id")||"";B=!!B&&B.bead_id===St&&B.counterpart_id===dn?null:{bead_id:St,counterpart_id:dn},Qe()}return}let Te=w?.closest?.(".mon-overlap__place");if(Te){let Ue=Te.closest("[data-bead-id]"),St=Ue&&Ue.getAttribute("data-bead-id")||"";St&&ke(St,Te.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){ne?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){Xn();return}let ft=w?.closest?.(".worker-repo-op__session");if(ft){let Ue=ft.dataset.attemptId;Ue&&Kn(Ue);return}let at=w?.closest?.(".worker-repo-op__resolve");if(at){R(at.dataset.operationId||"");return}let Jt=w?.closest?.(".worker-repo-op__dismiss");if(Jt){X(Jt.dataset.operationId||"");return}let nn=w?.closest?.(".worker-cleanup__resume");if(nn){let Ue=nn.dataset.beadId;Ue&&ot(Ue);return}let rn=w?.closest?.(".worker-banner__resume");if(rn){let Ue=rn.dataset.attemptId;Ue&&Dt(Ue);return}let yn=w?.closest?.(".worker-banner__discard");if(yn){let Ue=yn.dataset.confirmation==="merged"?"merged":"unmerged";O(yn.dataset.beadId||"",yn.dataset.attemptId||null,Ue,yn.dataset.operationId||null);return}let p=w?.closest?.(".worker-banner__dismiss");if(p){let Ue=p.dataset.attemptId;Ue&&zt(Ue);return}if(w?.closest?.(".worker-play")){A(!Q().auto_advance);return}let g=w?.closest?.(".worker-merge-all");if(g){g.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?D(!1):ye():D(!0);return}let v=w?.closest?.(".worker-pane__toggle[data-lane]");if(v){let Ue=v.dataset.lane;(Ue==="candidate"||Ue==="queue"||Ue==="running"||Ue==="pr_wait"||Ue==="done")&&Xt(Ue);return}let x=w?.closest?.(".worker-wait__area-toggle[data-area]");if(x){let Ue=x.dataset.area;(Ue==="parallel"||Ue==="serial")&&an(Ue);return}let j=w?.closest?.(".worker-card__place-lane");if(j){let Ue=j.dataset.beadId,St=j.dataset.lane;Ue&&(St==="parallel"||/^s[1-5]$/.test(St||""))&&(Y=null,Qe(),lt(Ue,St));return}if(w?.closest?.(".worker-card__place-cancel")){Y=null,Qe();return}let se=w?.closest?.(".worker-card__place");if(se){let Ue=se.dataset.beadId;Ue&&!se.disabled&&(We()?(Y=Ue,Qe()):lt(Ue,"parallel"));return}let De=w?.closest?.(".worker-filter__chip");if(De){let Ue=De.dataset.spec;(Ue==="all"||Ue==="with"||Ue==="without")&&ln({...ie,spec:Ue});return}let xe=w?.closest?.(".worker-mini__merge");if(xe){let Ue=xe.dataset.beadId||"";Q().cleanup_failed?.[Ue]?ot(Ue):Tt(Ue);return}let h=w?.closest?.(".worker-mini__merge-cancel");if(h){ee(h.dataset.beadId||"");return}let H=w?.closest?.(".worker-mini__discard");if(H){O(H.dataset.beadId||"",H.dataset.attemptId||null,H.dataset.discardMode==="merged"?"merged":"unmerged",H.dataset.operationId||null);return}let I=w?.closest?.(".worker-mini__stale-continue");if(I){z("worker-stale-work-continue",I.dataset.beadId||"",I.dataset.actionId||"");return}let Ee=w?.closest?.(".worker-mini__stale-backup");if(Ee){z("worker-stale-work-backup-fresh",Ee.dataset.beadId||"",Ee.dataset.actionId||"");return}let Xe=w?.closest?.(".worker-mini__stale-recheck");if(Xe){z("worker-stale-work-recheck",Xe.dataset.beadId||"",Xe.dataset.actionId||"");return}let nt=w?.closest?.(".worker-mini__revise-fix");if(nt){Re("worker-revise-fix",nt.dataset.beadId||"");return}let bt=w?.closest?.(".worker-mini__revise-approve");if(bt){Re("worker-revise-approve",bt.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Ue=w?.closest?.(".rtile"),St=Ue?.dataset?.beadId,dn=Ue?.dataset?.attemptId;St&&O(St,dn||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&zt(St);return}if(w?.closest?.(".rtile__pause")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&Ut(St);return}if(w?.closest?.(".rtile__resume")){let St=w?.closest?.(".rtile")?.dataset?.attemptId;St&&Dt(St);return}if(w?.closest?.(".rtile__session")){let Ue=w?.closest?.(".rtile"),St=Ue?.dataset?.attemptId;if(St){Kn(St);return}let dn=Ue?.dataset?.beadId;dn&&S(dn);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Ze.close(),qe.close();return}if(w?.closest?.(".worker-drawer-host"))return;let Ye=w?.closest?.(".rtile .board-card__roll-toggle");if(Ye){let Ue=Ye.dataset.rollParent;Ue&&(be.has(Ue)?be.delete(Ue):be.add(Ue),Qe());return}let ht=w?.closest?.(".rtile .board-card__roll-child");if(ht){let Ue=ht.dataset.childId;Ue&&l&&l(Ue);return}let gn=w?.closest?.(".rtile");if(gn){if(w?.closest?.(".rtile__id")){let St=gn.dataset.beadId;St&&Rn(St).then(dn=>{dn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ue=gn.dataset.beadId;Ue&&l&&l(Ue);return}let so=w?.closest?.(".worker-mini, .worker-card");if(so){let Ue=so.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Ue&&Rn(Ue).then(dn=>{dn?ce("\uBCF5\uC0AC\uB428","success",1200):ce("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let St=w?.closest?.(".ctl-chip--from");if(St){let dn=St.dataset.fromId;dn&&l&&l(dn);return}Ue&&l&&l(Ue)}}e.addEventListener("pointerdown",fe),e.addEventListener("dragstart",Fe),e.addEventListener("dragover",vt),e.addEventListener("dragleave",Ft),e.addEventListener("dragend",Ot),e.addEventListener("drop",tn),e.addEventListener("click",ct),e.addEventListener("change",cn);function At(_){if(!B)return;let w=_.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(B=null,Qe())}function Zt(_){_.key!=="Escape"||!B||(B=null,Qe())}return document.addEventListener("click",At),document.addEventListener("keydown",Zt),te.push(()=>{document.removeEventListener("click",At),document.removeEventListener("keydown",Zt)}),je(),k&&te.push(k.subscribe(()=>{for(let[_,w]of M)w==="failed"&&M.delete(_);Qe()})),s&&te.push(s.subscribe(()=>{let _=u&&u()||"";_!==mt&&(mt=_,st.close()),Qe(),Pe()})),o&&typeof o.subscribe=="function"&&te.push(o.subscribe(()=>{Pe(),Qe()})),Qe(),{load(){$e(),Qe()},refreshSessionDefaults:Ce,destroy(){for(let _ of te.splice(0))try{_()}catch{}e.removeEventListener("pointerdown",fe),e.removeEventListener("dragstart",Fe),e.removeEventListener("dragover",vt),e.removeEventListener("dragleave",Ft),e.removeEventListener("dragend",Ot),e.removeEventListener("drop",tn),e.removeEventListener("click",ct),e.removeEventListener("change",cn);try{qe.destroy()}catch{}tt.hidden=!0;try{ne?.destroy()}catch{}try{st.destroy()}catch{}it(c``,e)}}}function Il(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Zf(e,t,n,r=async()=>{},s=async()=>{}){let o=Wt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(W){let M=W.target.value,ge=t.getState().workspace?.current?.path||"";if(M&&M!==ge){o("switching workspace to %s",M),i=!0,q();try{await n(M)}catch(we){o("workspace switch failed: %o",we)}finally{i=!1,q()}}}async function m(){let W=t.getState(),L=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,q();try{await r(L)}catch(M){o("workspace git pull failed: %o",M)}finally{l=!1,q()}}}function y(W){let L=W.target;L&&e.contains(L)||F()}function b(W){W.key==="Escape"&&F()}function k(){u||(u=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",b),q())}function F(){u&&(u=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),q())}function G(){u?F():k()}async function V(W){let L=W.target,M=L.value,re=L.checked;o("toggling visibility %s \u2192 %s",M,String(re));try{await s(M,re)}catch(ge){o("workspace visibility toggle failed: %o",ge)}}function ie(W){return W?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function Y(W,L){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${G}
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
                ${W.map(M=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${M.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${M.path}"
                        .checked=${!L.has(M.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Il(M.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function B(){let W=t.getState(),L=W.workspace?.current,M=W.workspace?.available||[],re=new Set(W.workspace?.hidden||[]),ge=L?.path||M[0]?.path||"";if(M.length===0)return c``;let we=M.filter(le=>!re.has(le.path)||le.path===ge);if(we.length<=1){let le=we[0]||M[0],_e=Il(le.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${le.path}"
            >${_e}</span
          >
          ${Y(M,re)}
          ${ie(ge)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${we.map(le=>c`
              <option
                value="${le.path}"
                ?selected=${le.path===ge}
                title="${le.path}"
              >
                ${Il(le.path)}
              </option>
            `)}
        </select>
        ${Y(M,re)}
        ${ie(ge)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function q(){it(B(),e)}return q(),a=t.subscribe(()=>q()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",b),it(c``,e)}}}var Qf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Ml(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Xf(e,t,n=Ml()){return{id:n,type:e,payload:t}}function Jf(e={}){let t=Wt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],m=new Map,y=new Set;function b(B){for(let q of Array.from(y))try{q(B)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let B=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),q=(n.jitterRatio||0)*B,W=Math.max(0,Math.round(B+(Math.random()*2-1)*q));t("ws retry in %d ms (attempt %d)",W,a+1),i=setTimeout(()=>{i=null,Y()},W)}function F(B){try{s?.send(JSON.stringify(B))}catch(q){t("ws send failed",q)}}function G(){for(o="open",t("ws open"),b(o),a=0;d.length;){let B=d.shift();B&&F(B)}}function V(B){let q;try{q=JSON.parse(String(B.data))}catch{t("ws received non-JSON message");return}if(!q||typeof q.id!="string"||typeof q.type!="string"){t("ws received invalid envelope");return}if(u.has(q.id)){let L=u.get(q.id);u.delete(q.id),q.ok?L?.resolve(q.payload):L?.reject(q.error||new Error("ws error"));return}let W=m.get(q.type);if(W&&W.size>0)for(let L of Array.from(W))try{L(q.payload)}catch(M){t("ws event handler error",M)}else t("ws received unhandled message type: %s",q.type)}function ie(){o="closed",t("ws closed"),b(o);for(let[B,q]of u.entries())q.reject(new Error("ws disconnected")),u.delete(B);a+=1,k()}function Y(){if(!l)return;let B=r();try{s=new WebSocket(B),t("ws connecting %s",B),o="connecting",b(o),s.addEventListener("open",G),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",ie)}catch(q){t("ws connect failed %o",q),k()}}return Y(),{send(B,q){if(!Qf.includes(B))return Promise.reject(new Error(`unknown message type: ${B}`));let W=Ml(),L=Xf(B,q,W);return t("send %s id=%s",B,W),new Promise((M,re)=>{u.set(W,{resolve:M,reject:re,type:B}),s&&s.readyState===s.OPEN?F(L):(t("queue %s id=%s (state=%s)",B,W,o),d.push(L))})},on(B,q){m.has(B)||m.set(B,new Set);let W=m.get(B);return W?.add(q),()=>{W?.delete(q)}},onConnection(B){return y.add(B),()=>{y.delete(B)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,Y()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Gv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Kv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Pl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],e_=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],br="tab:worker:closed",Vv="bdui.worker.done-range",t_=tf,n_="worker:queue",r_="worker:parallel-analysis",s_="ui:order",o_="ui:display-policy",a_="exec:presets",hr="tab:board:closed",i_="beads-ui.board.closed-range";function Yv(e){let t=Wt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;it(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&kf(a),i&&l&&u&&d){let Se=function(S,C){let Pe="Request failed",Be="";if(S&&typeof S=="object"){let At=S;if(typeof At.message=="string"&&At.message.length>0&&(Pe=At.message),typeof At.details=="string")Be=At.details;else if(At.details&&typeof At.details=="object")try{Be=JSON.stringify(At.details,null,2)}catch{Be=""}}else typeof S=="string"&&S.length>0&&(Pe=S);let ct=C&&C.length>0?`Failed to load ${C}`:"Request failed";te.open(ct,Pe,Be)},ut=function(S){return`${$.getState().workspace.current?.path||""}\0${S}`},He=function(){qe&&(qe().catch(()=>{}),qe=null),Ze=null,st=null},Je=function(S){mt=S;let C=()=>{mt!==S||$.getState().selected_id!==S||(mt=null,ve(S))};if(!Q){ne.then(C);return}C()},Ut=function(S,C,Pe,Be,ct){return Pe!==pt[C]?(ct().catch(()=>{}),!1):(S.set(Be,ct),!0)},zt=function(){let S=$.getState();D(S.view==="board"),A(S.view==="worker"),E(Me(S)),X(S.view==="board"||S.view==="worker"||Dt||!!S.selected_id)},ot=function(){let S=xr(Et);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},ze=function(){let S=xr(Tt);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},D=function(S){if(S)for(let[C,Pe]of Pl){if(lt.has(C)||dt.has(C))continue;let Be=C===hr?ot():{type:Pe};try{Le.register(C,Be)}catch(Zt){t("register %s store failed: %o",C,Zt)}dt.add(C);let ct=pt.board,At=!1;he.subscribeList(C,Be).then(Zt=>{At=!Ut(lt,"board",ct,C,Zt)}).catch(Zt=>{t("subscribe %s failed: %o",C,Zt),Se(Zt,"board")}).finally(()=>{dt.delete(C),At&&zt()})}else O()},O=function(){pt.board+=1;for(let[S]of Pl){let C=lt.get(S);C&&(C().catch(()=>{}),lt.delete(S));try{Le.unregister(S)}catch(Pe){t("unregister %s failed: %o",S,Pe)}}},A=function(S){if(!S){R();return}for(let[C,Pe]of e_){if(z.has(C)||dt.has(C))continue;let Be=C===br?ze():{type:Pe};try{Le.register(C,Be)}catch(Zt){t("register %s store failed: %o",C,Zt)}dt.add(C);let ct=pt.worker,At=!1;he.subscribeList(C,Be).then(Zt=>{At=!Ut(z,"worker",ct,C,Zt)}).catch(Zt=>{t("subscribe %s failed: %o",C,Zt),Se(Zt,"worker")}).finally(()=>{dt.delete(C),At&&zt()})}},R=function(){pt.worker+=1;for(let[S]of e_){let C=z.get(S);C&&(C().catch(()=>{}),z.delete(S));try{Le.unregister(S)}catch(Pe){t("unregister %s failed: %o",S,Pe)}}},X=function(S){if(!S){me();return}Re||(Ce("subscribe-worker-queue",{id:n_}).catch(C=>{t("subscribe-worker-queue failed: %o",C)}),Ce("subscribe-worker-parallel-analysis",{id:r_}).catch(C=>{t("subscribe-worker-parallel-analysis failed: %o",C)}),Re=()=>(Ce("unsubscribe-worker-parallel-analysis",{id:r_}),Ce("unsubscribe-worker-queue",{id:n_})))},me=function(){Re&&(Re().catch(()=>{}),Re=null),xt.clear()},Me=function(S){return S.view==="monitor"||S.selected_id!=null},E=function(S){if(!S){U();return}oe||(Ce("subscribe-monitor-pipeline",{id:t_}).catch(C=>{t("subscribe-monitor-pipeline failed: %o",C)}),oe=()=>Ce("unsubscribe-monitor-pipeline",{id:t_}))},U=function(){oe&&(oe().catch(()=>{}),oe=null)},rt=function(){ke||(Ce("subscribe-ui-order",{id:s_}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),ke=()=>Ce("unsubscribe-ui-order",{id:s_}))},pe=function(){ke&&(ke().catch(()=>{}),ke=null),_t.clear()},yt=function(){Ve||(Ce("subscribe-display-policy",{id:o_}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),Ve=()=>Ce("unsubscribe-display-policy",{id:o_}))},$t=function(){Ve&&(Ve().catch(()=>{}),Ve=null),P.clear()},Vt=function(){Lt||(Ce("subscribe-impl-presets",{id:a_}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),Lt=()=>Ce("unsubscribe-impl-presets",{id:a_}))},Xt=function(S){if(!S)return"Unknown";let C=S.split("/").filter(Boolean);return C.length>0?C[C.length-1]:"Unknown"},xn=function(S,C){ln.open(S.path,{missing_state:S.missing_state,...C?{workspace:C}:{}})};var m=Se,y=ut,b=He,k=Je,F=Ut,G=zt,V=ot,ie=ze,Y=D,B=O,q=A,W=R,L=X,M=me,re=Me,ge=E,we=U,le=rt,_e=pe,Ae=yt,Ge=$t,be=Vt,J=Xt,Oe=xn;let Ne=document.getElementById("header-loading"),T=Jc(Ne),te=Sp(e),$e=Jf(),Ce=T.wrapSend((S,C)=>$e.send(S,C)),he=Hc(Ce),Le=Gc(),tt=Yc(),xt=Vc(),kt=Oc(),_t=Kc(),P=Cc(),ae=Rc(),Ie=Lc();$e.on("impl-presets-snapshot",S=>{let C=S;C&&typeof C.revision=="number"&&Array.isArray(C.presets)&&ae.set({revision:C.revision,presets:C.presets})}),$e.on("monitor-pipeline-snapshot",S=>{let C=S;if(!(!C||!Array.isArray(C.workspaces)))try{kt.set(C.workspaces,C.workspaces_state,C.cross_lanes)}catch{}}),$e.on("ui-order-snapshot",S=>{let C=S;if(C&&typeof C.revision=="number")try{_t.set({revision:C.revision,order:C.order&&typeof C.order=="object"?C.order:{}})}catch{}}),$e.on("display-policy-snapshot",S=>{let C=S;if(C&&C.policy&&typeof C.policy=="object")try{P.set(C.policy)}catch{}}),$e.on("session-log-snapshot",S=>{let C=S;if(C&&typeof C.id=="string")try{Ie.set(C.id,Array.isArray(C.lines)?C.lines:[],typeof C.last_event_at=="number"?C.last_event_at:null)}catch{}}),$e.on("session-log-append",S=>{let C=S;if(C&&typeof C.id=="string")try{Ie.append(C.id,C.event)}catch{}}),$e.on("snapshot",S=>{let C=S,Pe=C&&typeof C.id=="string"?C.id:"",Be=Pe?Le.getStore(Pe):null;if(Be&&C&&C.type==="snapshot")try{Be.applyPush(C)}catch{}}),$e.on("upsert",S=>{let C=S,Pe=C&&typeof C.id=="string"?C.id:"",Be=Pe?Le.getStore(Pe):null;if(Be&&C&&C.type==="upsert")try{Be.applyPush(C)}catch{}}),$e.on("delete",S=>{let C=S,Pe=C&&typeof C.id=="string"?C.id:"",Be=Pe?Le.getStore(Pe):null;if(Be&&C&&C.type==="delete")try{Be.applyPush(C)}catch{}});let qe=null,Ze=null,st=null,mt=null,gt=()=>{},ne=new Promise(S=>{gt=()=>S(void 0)}),Q=!1,We=!1;async function ve(S){let C=ut(S);if(C===Ze||C===st)return;st=C;let Pe=`detail:${S}`,Be={type:"issue-detail",params:{id:S}};try{Le.register(Pe,Be)}catch(ct){t("register detail store failed: %o",ct)}try{let ct=await he.subscribeList(Pe,Be);if($.getState().selected_id!==S||ut(S)!==C){await ct().catch(()=>{});return}qe&&await qe().catch(()=>{}),qe=ct,Ze=C}catch(ct){t("detail subscribe failed: %o",ct),Se(ct,"issue details")}finally{st===C&&(st=null)}}let lt=new Map,dt=new Set,pt={board:0,worker:0},Dt=!1,Et=ko;try{let S=window.localStorage.getItem(i_);li(S)&&(Et=S)}catch{}let Tt="today";try{let S=window.localStorage.getItem(Vv);S!==null&&(Tt=Vn(S))}catch{}async function ee(S){if(!li(S)||S===Et)return;Et=S;try{window.localStorage.setItem(i_,S)}catch{}let C=lt.get(hr);if(!C)return;lt.delete(hr),await C().catch(()=>{});let Pe=ot();try{Le.register(hr,Pe)}catch(Be){t("register %s store failed: %o",hr,Be)}try{let Be=await he.subscribeList(hr,Pe);lt.set(hr,Be)}catch(Be){t("re-subscribe %s failed: %o",hr,Be),Se(Be,"board")}}async function ye(S){let C=Vn(S);if(C===Tt)return;Tt=C;let Pe=z.get(br);if(!Pe)return;z.delete(br),await Pe().catch(()=>{});let Be=ze();try{Le.register(br,Be)}catch(ct){t("register %s store failed: %o",br,ct)}try{let ct=await he.subscribeList(br,Be);z.set(br,ct)}catch(ct){t("re-subscribe %s failed: %o",br,ct),Se(ct,"worker")}}let z=new Map,Re=null,oe=null,ke=null,Ve=null,Lt=null;async function Nt(){Ve=null,P.clear(),Lt=null,ae.clear(),Re=null,oe=null,lt.clear(),z.clear(),pt.board+=1,pt.worker+=1,Vt();let S=$.getState().workspace.current?.path;if(S)try{await $e.send("set-workspace",{path:S})}catch(Pe){t("workspace restore after reconnect failed: %o",Pe);return}yt();let C=$.getState();D(C.view==="board"),A(C.view==="worker"),E(Me(C)),X(C.view==="board"||C.view==="worker"||!!C.selected_id)}async function on(){t("clearing all subscriptions for workspace switch"),O(),R(),me(),tt.clear(),pe(),rt(),$t(),yt(),He();let S=$.getState();if(S.selected_id)try{Le.unregister(`detail:${S.selected_id}`)}catch{}let C=$.getState();D(C.view==="board"),A(C.view==="worker"),E(Me(C)),X(C.view==="board"||C.view==="worker"||!!C.selected_id),C.selected_id&&Je(C.selected_id)}async function Rt(S){t("requesting workspace switch to %s",S),We=!0;try{let C=await $e.send("set-workspace",{path:S});t("workspace switch result: %o",C),C&&C.workspace&&($.setState({workspace:{current:{path:C.workspace.root_dir,database:C.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),C.changed&&(await on(),ce("Switched to "+Xt(S),"success",2e3)))}catch(C){throw t("workspace switch failed: %o",C),ce("Failed to switch workspace","error",3e3),C}finally{We=!1}}async function bn(S){t("requesting workspace git pull for %s",S);try{let C=await $e.send("git-pull-workspace",{});t("workspace git pull result: %o",C);let Pe=C?.status;if(Pe==="up_to_date"){ce("Already up to date","success",2e3);return}if(Pe==="stash_pop_conflict"){ce("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ce("Git pulled "+Xt(S),"success",2e3)}catch(C){t("workspace git pull failed: %o",C);let Pe=C?.code,Be=C?.message;if(Pe==="rebase_conflict"){ce("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Pe==="rebase_conflict_abort_failed"){ce("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Pe==="busy"){ce("Git pull skipped: another operation is running","warning",3e3);return}let ct=Be?`: ${Be}`:"";throw ce(`Git pull failed${ct}`,"error",3e3),C}}async function hn(S,C){t("setting workspace visibility %s \u2192 %s",S,String(C));try{await $e.send("set-workspace-visibility",{path:S,visible:C}),await an()}catch(Pe){t("workspace visibility update failed: %o",Pe),ce("Failed to update project visibility","error",3e3)}}async function an(){try{let S=await $e.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let C=S.workspaces.map(At=>({path:At.path,database:At.database,pid:At.pid,version:At.version})),Pe=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,Be=Array.isArray(S.hidden)?S.hidden.filter(At=>typeof At=="string"):[];$.setState({workspace:{current:Pe,available:C,hidden:Be}});let ct=window.localStorage.getItem("beads-ui.workspace");ct&&(!C.some(Zt=>Zt.path===ct)||Be.includes(ct)?window.localStorage.removeItem("beads-ui.workspace"):Pe&&ct!==Pe.path&&(t("restoring saved workspace preference: %s",ct),await Rt(ct)))}}catch(S){t("failed to load workspaces: %o",S)}}$e.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&($.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),an(),on())});let Qe=!1;if(typeof $e.onConnection=="function"){let S=C=>{t("ws state %s",C),C==="reconnecting"||C==="closed"?(Qe=!0,ce("Connection lost. Reconnecting\u2026","error",4e3)):C==="open"&&Qe&&(Qe=!1,ce("Reconnected","success",2200),Kv($,(Pe,Be)=>{t(`${Pe}: %o`,Be)}),Nt())};$e.onConnection(S)}let je="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(je=S)}catch(S){t("view parse error: %o",S)}let $=Xc({config:Gv(),view:je});$e.on("worker-queue-snapshot",S=>{let C=S;if(!C||!C.queue)return;let Pe=$.getState().workspace.current?.path;if(typeof Pe=="string"&&Pe.length>0&&C.root_dir!==Pe){t("dropping worker-queue snapshot for %s",String(C.root_dir));return}try{tt.set(C.queue)}catch{}}),$e.on("worker-parallel-analysis-snapshot",S=>{let C=S;if(!C)return;let Pe=$.getState().workspace.current?.path;if(!(typeof Pe=="string"&&Pe.length>0&&typeof C.root_dir=="string"&&C.root_dir!==Pe))try{xt.set({settings:C.settings,job:C.job??null,runs:Array.isArray(C.runs)?C.runs:[],last_good:C.last_good??null})}catch{}});let fe=Zc($);fe.start();let Fe=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),vt=async(S,C)=>{try{return await Ce(S,C)}catch(Pe){if(Fe.has(S))throw Pe;return[]}};rf({global_element:r,repo_element:s},$,fe);let Ft=document.getElementById("workspace-picker");Ft&&Zf(Ft,$,Rt,bn,hn);let Ot=lf(e,(S,C)=>Ce(S,C));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>Ot.open())}catch{}let Yt=pf(e,{policyStore:P,queueStore:tt,implPresetStore:ae,transport:(S,C)=>Ce(S,C),onOpenChange:S=>{let C=Dt;Dt=S,zt(),C&&S===!1&&cn.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[C]of Pl)for(let Pe of Le.snapshotFor(C)||[]){let Be=Pe.labels;if(Array.isArray(Be))for(let ct of Be)typeof ct=="string"&&ct.length>0&&S.add(ct)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>Yt.open()))}catch{}let tn=document.createElement("div");tn.className="md-viewer-root",document.body.appendChild(tn);let ln=Ia(tn,{getWorkspacePath:()=>$.getState().workspace.current?.path}),Ht=_u(i,{gotoIssue:S=>fe.gotoIssue(S),issueStores:Le,transport:vt,workerQueueStore:tt,uiOrderStore:_t,displayPolicyStore:P,closedRange:Et,onClosedRangeChange:S=>{ee(S)},onNewIssue:()=>Ot.open(),openDoc:xn}),cn=Ll(l,{transport:vt,issueStores:Le,queueStore:tt,analysisStore:xt,sessionLogStore:Ie,uiOrderStore:_t,gotoIssue:S=>$.setState({selected_id:S}),getWorkspacePath:()=>$.getState().workspace.current?.path,switchWorkspace:S=>Rt(S),openDoc:xn,doneRange:Tt,onDoneRangeChange:S=>{ye(S)}}),un=nf(u,{transport:vt,pipelineStore:kt,execPresetStore:ae,sessionLogStore:Ie,router:fe,gotoIssue:S=>fe.gotoIssue(S),getWorkspacePath:()=>$.getState().workspace.current?.path,switchWorkspace:S=>Rt(S),openDoc:xn}),mn=Ap(d,{issueStores:Le,transport:vt,queueStore:tt,execPresetStore:ae,sessionLogStore:Ie,getWorkspacePath:()=>$.getState().workspace.current?.path,mdViewer:ln,depCandidates:()=>{let S=kt.get();if(S===null)return null;let C=kt.getWorkspacesState(),Pe=$.getState();if(Pe.view==="monitor")return Wi(S,C);let Be=Pe.workspace.current?.path;return Be?Wi(S,C,{root_dir:Be}):null},subscribeCandidates:S=>kt.subscribe(S),onDepChanged:({type:S,a:C,b:Pe})=>{let Be=un;S==="dep-add"&&Be&&typeof Be.recorrectSharedLane=="function"&&Be.recorrectSharedLane(S,C,Pe)},onNavigate:(S,C)=>{let Pe=()=>{$.getState().view==="worker"?$.setState({selected_id:S}):fe.gotoIssue(S)},Be=$.getState().workspace.current?.path;if(typeof C!="string"||C.length===0||!Be||C===Be){Pe();return}Promise.resolve(Rt(C)).then(Pe).catch(()=>{ce("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})},onClose:()=>{let S=$.getState();$.setState({selected_id:null});try{fe.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{Yt.open("execution")}}),Xn=$.getState().selected_id;Xn&&(d.hidden=!1,mn.load(Xn),Je(Xn)),$.subscribe(S=>{let C=S.selected_id;C?(d.hidden=!1,mn.load(C),We||Je(C)):(mn.clear(),d.hidden=!0,He())});let Kn=S=>{i.hidden=S.view!=="board",l.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",o&&o.classList.toggle("is-quiet",S.view==="monitor"),D(S.view==="board"),A(S.view==="worker"),E(Me(S)),X(S.view==="board"||S.view==="worker"||Dt||!!S.selected_id),!S.selected_id&&S.view==="board"&&Ht.load(),S.view==="worker"&&cn.load(),S.view==="monitor"?un.load():un.pause(),window.localStorage.setItem("beads-ui.view",S.view)};$.subscribe(Kn),Kn($.getState()),rt(),yt(),Vt(),an().finally(()=>{Q=!0,gt()}),window.addEventListener("keydown",S=>{let C=S.ctrlKey||S.metaKey,Pe=String(S.key||"").toLowerCase(),Be=S.target,ct=Be&&Be.tagName?String(Be.tagName).toLowerCase():"",At=ct==="input"||ct==="textarea"||ct==="select"||Be&&typeof Be.isContentEditable=="boolean"&&Be.isContentEditable;C&&Pe==="n"&&(At||(S.preventDefault(),Ot.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Yv(t)});export{Yv as bootstrap,Gv as readBootstrapConfig,Kv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
