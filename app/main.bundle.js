var Ld=Object.create;var Xs=Object.defineProperty;var Od=Object.getOwnPropertyDescriptor;var Pd=Object.getOwnPropertyNames;var Md=Object.getPrototypeOf,Dd=Object.prototype.hasOwnProperty;var Nd=(e,t,r)=>t in e?Xs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Qs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Fd=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Pd(t))!Dd.call(e,s)&&s!==r&&Xs(e,s,{get:()=>t[s],enumerable:!(n=Od(t,s))||n.enumerable});return e};var qd=(e,t,r)=>(r=e!=null?Ld(Md(e)):{},Fd(t||!e||!e.__esModule?Xs(r,"default",{value:e,enumerable:!0}):r,e));var tt=(e,t,r)=>Nd(e,typeof t!="symbol"?t+"":t,r);var Qa=Qs((vm,Xa)=>{var jr=1e3,Ur=jr*60,Wr=Ur*60,Ir=Wr*24,Ud=Ir*7,Wd=Ir*365.25;Xa.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return zd(e);if(r==="number"&&isFinite(e))return t.long?Gd(e):Hd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function zd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Wd;case"weeks":case"week":case"w":return r*Ud;case"days":case"day":case"d":return r*Ir;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Wr;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ur;case"seconds":case"second":case"secs":case"sec":case"s":return r*jr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Hd(e){var t=Math.abs(e);return t>=Ir?Math.round(e/Ir)+"d":t>=Wr?Math.round(e/Wr)+"h":t>=Ur?Math.round(e/Ur)+"m":t>=jr?Math.round(e/jr)+"s":e+"ms"}function Gd(e){var t=Math.abs(e);return t>=Ir?Gn(e,t,Ir,"day"):t>=Wr?Gn(e,t,Wr,"hour"):t>=Ur?Gn(e,t,Ur,"minute"):t>=jr?Gn(e,t,jr,"second"):e+" ms"}function Gn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var ei=Qs((wm,Ja)=>{function Vd(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=l,r.humanize=Qa(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let b=0;b<_.length;b++)m=(m<<5)-m+_.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,b=null,E,k;function D(...q){if(!D.enabled)return;let A=D,U=Number(new Date),te=U-(m||U);A.diff=te,A.prev=m,A.curr=U,m=U,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let x=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(S,H)=>{if(S==="%%")return"%";x++;let K=r.formatters[H];if(typeof K=="function"){let he=q[x];S=K.call(A,he),q.splice(x,1),x--}return S}),r.formatArgs.call(A,q),(A.log||r.log).apply(A,q)}return D.namespace=_,D.useColors=r.useColors(),D.color=r.selectColor(_),D.extend=n,D.destroy=r.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(E!==r.namespaces&&(E=r.namespaces,k=r.enabled(_)),k),set:q=>{b=q}}),typeof r.init=="function"&&r.init(D),D}function n(_,m){let b=r(this.namespace+(typeof m>"u"?":":m)+_);return b.log=this.log,b}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(_,m){let b=0,E=0,k=-1,D=0;for(;b<_.length;)if(E<m.length&&(m[E]===_[b]||m[E]==="*"))m[E]==="*"?(k=E,D=b,E++):(b++,E++);else if(k!==-1)E=k+1,D++,b=D;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function l(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function c(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Ja.exports=Vd});var ti=Qs((Tt,Vn)=>{Tt.formatArgs=Kd;Tt.save=Zd;Tt.load=Xd;Tt.useColors=Yd;Tt.storage=Qd();Tt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Tt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Yd(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Kd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Vn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Tt.log=console.debug||console.log||(()=>{});function Zd(e){try{e?Tt.storage.setItem("debug",e):Tt.storage.removeItem("debug")}catch{}}function Xd(){let e;try{e=Tt.storage.getItem("debug")||Tt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Qd(){try{return localStorage}catch{}}Vn.exports=ei()(Tt);var{formatters:Jd}=Vn.exports;Jd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var rn=globalThis,Bn=rn.trustedTypes,Da=Bn?Bn.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",or=`lit$${Math.random().toFixed(9).slice(2)}$`,to="?"+or,Bd=`<${to}>`,Er=document,nn=()=>Er.createComment(""),sn=e=>e===null||typeof e!="object"&&typeof e!="function",ro=Array.isArray,Ua=e=>ro(e)||typeof e?.[Symbol.iterator]=="function",Js=`[ 	
\f\r]`,tn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Na=/-->/g,Fa=/>/g,Sr=RegExp(`>|${Js}(?:([^\\s"'>=/]+)(${Js}*=${Js}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qa=/'/g,Ba=/"/g,Wa=/^(?:script|style|textarea|title)$/i,no=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=no(1),mr=no(2),fm=no(3),Ot=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),ja=new WeakMap,Ar=Er.createTreeWalker(Er,129);function za(e,t){if(!ro(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Da!==void 0?Da.createHTML(t):t}var Ha=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=tn;for(let l=0;l<r;l++){let c=e[l],d,_,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,_=a.exec(c),_!==null);)b=a.lastIndex,a===tn?_[1]==="!--"?a=Na:_[1]!==void 0?a=Fa:_[2]!==void 0?(Wa.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=Sr):_[3]!==void 0&&(a=Sr):a===Sr?_[0]===">"?(a=s??tn,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?Sr:_[3]==='"'?Ba:qa):a===Ba||a===qa?a=Sr:a===Na||a===Fa?a=tn:(a=Sr,s=void 0);let E=a===Sr&&e[l+1].startsWith("/>")?" ":"";o+=a===tn?c+Bd:m>=0?(n.push(d),c.slice(0,m)+eo+c.slice(m)+or+E):c+or+(m===-2?l:E)}return[za(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},on=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,c=this.parts,[d,_]=Ha(t,r);if(this.el=e.createElement(d,n),Ar.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Ar.nextNode())!==null&&c.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(eo)){let b=_[a++],E=s.getAttribute(m).split(or),k=/([.?@])?(.*)/.exec(b);c.push({type:1,index:o,name:k[2],strings:E,ctor:k[1]==="."?Un:k[1]==="?"?Wn:k[1]==="@"?zn:Cr}),s.removeAttribute(m)}else m.startsWith(or)&&(c.push({type:6,index:o}),s.removeAttribute(m));if(Wa.test(s.tagName)){let m=s.textContent.split(or),b=m.length-1;if(b>0){s.textContent=Bn?Bn.emptyScript:"";for(let E=0;E<b;E++)s.append(m[E],nn()),Ar.nextNode(),c.push({type:2,index:++o});s.append(m[b],nn())}}}else if(s.nodeType===8)if(s.data===to)c.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(or,m+1))!==-1;)c.push({type:7,index:o}),m+=or.length-1}o++}}static createElement(t,r){let n=Er.createElement("template");return n.innerHTML=t,n}};function Tr(e,t,r=e,n){if(t===Ot)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=sn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Tr(e,s._$AS(e,t.values),s,n)),t}var jn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Er).importNode(r,!0);Ar.currentNode=s;let o=Ar.nextNode(),a=0,l=0,c=n[0];for(;c!==void 0;){if(a===c.index){let d;c.type===2?d=new Br(o,o.nextSibling,this,t):c.type===1?d=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(d=new Hn(o,this,t)),this._$AV.push(d),c=n[++l]}a!==c?.index&&(o=Ar.nextNode(),a++)}return Ar.currentNode=Er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Br=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Tr(this,t,r),sn(t)?t===it||t==null||t===""?(this._$AH!==it&&this._$AR(),this._$AH=it):t!==this._$AH&&t!==Ot&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ua(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==it&&sn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=on.createElement(za(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new jn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=ja.get(t.strings);return r===void 0&&ja.set(t.strings,r=new on(t)),r}k(t){ro(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(nn()),this.O(nn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=it,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=it}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Tr(this,t,r,0),a=!sn(t)||t!==this._$AH&&t!==Ot,a&&(this._$AH=t);else{let l=t,c,d;for(t=o[0],c=0;c<o.length-1;c++)d=Tr(this,l[n+c],r,c),d===Ot&&(d=this._$AH[c]),a||(a=!sn(d)||d!==this._$AH[c]),d===it?t=it:t!==it&&(t+=(d??"")+o[c+1]),this._$AH[c]=d}a&&!s&&this.j(t)}j(t){t===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Un=class extends Cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===it?void 0:t}},Wn=class extends Cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==it)}},zn=class extends Cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Tr(this,t,r,0)??it)===Ot)return;let n=this._$AH,s=t===it&&n!==it||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==it&&(n===it||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Hn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Tr(this,t)}},Ga={M:eo,P:or,A:to,C:1,L:Ha,R:jn,D:Ua,V:Tr,I:Br,H:Cr,N:Wn,U:zn,B:Un,F:Hn},jd=rn.litHtmlPolyfillSupport;jd?.(on,Br),(rn.litHtmlVersions??(rn.litHtmlVersions=[])).push("3.3.1");var Ue=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Br(t.insertBefore(nn(),o),o,void 0,r??{})}return s._$AI(e),s};var Rt="today",er=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Pt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Rr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Va(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ya(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ka(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Za(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var ri=qd(ti(),1);function ot(e){return(0,ri.default)(`beads-ui:${e}`)}function zt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Lr(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function oi(e,t){let r=zt(e.created_at),n=zt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function ai(e,t){let r=zt(e.updated_at),n=zt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function ii(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=zt(e.created_at),o=zt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function li(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var eu=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ni(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function si(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=eu.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ci(e,t){let r=ni(e),n=ni(t);if(r!==n)return r<n?-1:1;let s=si(e),o=si(t);if(s!==o)return s<o?-1:1;let a=zt(e&&e.created_at),l=zt(t&&t.created_at);if(a!==l)return a<l?-1:1;let c=e&&e.id,d=t&&t.id;return c===d?0:String(c)<String(d)?-1:1}var so=2**20;function zr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-zt(e&&e.created_at)}function Yn(e){return(t,r)=>{let n=zr(t,e),s=zr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function oo(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:zr(l,r)-so};if(!l)return{rank:zr(a,r)+so};let c=zr(a,r),d=zr(l,r),_=(c+d)/2;return c<_&&_<d?{rank:_}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*so}))}}function ao(e,t={}){let r=ot(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,c=t.sort||Lr;function d(){for(let b of Array.from(a))try{b()}catch{}}function _(){s=Array.from(n.values()).sort(c)}function m(b){if(l||!b||b.id!==e)return;let E=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,E),!(E<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(E<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let D of k)D&&typeof D.id=="string"&&D.id.length>0&&n.set(D.id,D);_(),o=E,d();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let D=n.get(k.id);if(!D)n.set(k.id,k);else{let q=Number.isFinite(D.updated_at)?D.updated_at:0,A=Number.isFinite(k.updated_at)?k.updated_at:0;if(q<=A){for(let U of Object.keys(D))U in k||delete D[U];for(let[U,te]of Object.entries(k))D[U]=te}}_()}o=E,d()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),_()),o=E,d()}}}return{id:e,subscribe(b){return a.add(b),()=>{a.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function Kn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function di(e){let t=ot("subs"),r=new Map,n=new Map;function s(l,c){t("applyDelta %s +%d ~%d -%d",l,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let _=Array.isArray(c.added)?c.added:[],m=Array.isArray(c.updated)?c.updated:[],b=Array.isArray(c.removed)?c.removed:[];for(let E of Array.from(d)){let k=r.get(E);if(!k)continue;let D=k.itemsById;for(let q of _)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of m)typeof q=="string"&&q.length>0&&D.set(q,!0);for(let q of b)typeof q=="string"&&q.length>0&&D.delete(q)}}async function o(l,c){let d=Kn(c);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==d){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(l);try{await e("subscribe-list",{id:l,type:c.type,params:c.params})}catch(m){let b=r.get(l)||null;if(b){let E=n.get(b.key);E&&(E.delete(l),E.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Kn,selectors:{getIds(l){let c=r.get(l);return c?Array.from(c.itemsById.keys()):[]},has(l,c){let d=r.get(l);return d?d.itemsById.has(c):!1},count(l){let c=r.get(l);return c?c.itemsById.size:0},getItemsById(l){let c=r.get(l),d={};if(!c)return d;for(let _ of c.itemsById.keys())d[_]=!0;return d}}}}function ui(){let e=ot("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,d,_){let m=d?Kn(d):"",b=r.get(c)||"",E=t.has(c);if(e("register %s key=%s (prev=%s)",c,m,b),E&&b&&m&&b!==m){let k=t.get(c);if(k)try{k.dispose()}catch{}let D=s.get(c);if(D){try{D()}catch{}s.delete(c)}let q=ao(c,_);t.set(c,q);let A=q.subscribe(()=>o());s.set(c,A)}else if(!E){let k=ao(c,_);t.set(c,k);let D=k.subscribe(()=>o());s.set(c,D)}return r.set(c,m),()=>l(c)}function l(c){e("unregister %s",c),r.delete(c);let d=t.get(c);d&&(d.dispose(),t.delete(c));let _=s.get(c);if(_){try{_()}catch{}s.delete(c)}}return{register:a,unregister:l,getStore(c){return t.get(c)||null},snapshotFor(c){let d=t.get(c);return d?d.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function pi(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fi(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function _i(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function io(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function tu(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ru(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function mi(e){let t=ot("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):tu(n),a=ru(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=io(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?io(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var nu=Object.freeze({workspace_config:{default_workspace:null}});function gi(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:nu.workspace_config.default_workspace}}}function bi(e={}){let t=ot("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:gi(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?gi(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!l&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function hi(e){let t=ot("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function c(d){return async(m,b)=>{let E=s++,k=Date.now();n.set(E,{type:m,start_ts:k}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let D=!1,q=()=>{D||(D=!0,n.delete(E),l())},A=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-k),q())},3e4);try{let U=await d(m,b),te=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",E,m,te),U}catch(U){let te=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,te,U),U}finally{clearTimeout(A),q()}}}return o(),{wrapSend:c,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function le(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Zn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(li),c;switch(l){case"created_desc":return c.sort(Lr),c;case"created_asc":return c.sort(oi),c;case"updated_desc":return c.sort(ai),c;case"priority":return c.sort(ii),c;case"manual":default:{let d=r();return d?c.sort(Yn(d)):c.sort(Lr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Or(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ft(e){let t=Or(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function It(e,t){let r=Or(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let c=Math.floor(l/7);if(l<30)return`${c}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Xn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Or(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Qn(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let c={...a.order};for(let d of l)c[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,l,c){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(oo(l,c,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let E=n(oo(l,c,b.order),a);s(b,E);let k=await t("ui-order-set",{expected_revision:b.revision,entries:E});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Jn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function lo(e,t){return!t||typeof e!="string"||e.length===0||Jn(t.visible_labels).includes(e)?!0:Jn(t.hidden_labels).includes(e)?!1:!Jn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function es(e,t){return Jn(e).filter(r=>lo(r,t))}function gr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var su={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},vi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},yi={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ou={review:"\u2713",skip:"\u2298"},br={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function au(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function wi(e){let t=e&&e.fill||"none";return t==="none"?br.none:e&&e.stale===!0?br.stale:t==="dim"?br.dim:e&&e.glyph==="review"?br.review:e&&e.glyph==="skip"?br.skip:br.done}function iu(e){if(!e||e.fill==="none"||!e.approval_state)return wi(e);let t=[];return e.glyph==="review"?t.push(br.review):e.glyph==="skip"&&t.push(br.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function lu(e,t,r){let n=su[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=ou[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${c}>
        ${vi[e]||e}
      </div>
    </div>
  `}function ts(e,t){if(!e||!e.stages)return"";let r=yi[e.route]||yi.spec_backed,n=e.stages,s=au(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${vi[a]||a} ${a==="plan"?iu(n[a]||{}):wi(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>lu(a,n[a]||{},a===s))}
    </div>
  `}function cu(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ki=2;function du(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ki).join(", "),s=r.length-ki,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function co(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function rs(e,t){if(!e)return null;let r=co(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=co(t?.kind),a=o!==null&&t?.kind!==e.kind,l=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:l,title:`${c}${d}`}}function $i(e,t){let r=rs(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function uu(e){if(!e)return null;let t=co(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function pu(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&gr(r,"route")){let l=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${l?" is-derived":""}"
        title=${l?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${l?"unset":n.route}</span
      >`)}if(n.fast_track&&gr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&gr(r,"pr")){let l=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${l!=null?` #${l}`:""}`}</span
      >`)}let o=$i(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let l=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${l.kind}:${l.actor}@${l.sha}`}
        >${`exec ${l.kind==="delegated"?l.actor:`main:${l.actor}`} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let l=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${l.actor}@${l.sha}`}
        >${`impl ${l.actor} \xB7 ${l.sha.slice(0,7)}`}</span
      >`)}for(let l of es(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${l}</span>`);return e.from_id&&gr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${l=>{l.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(l,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),gr(r,"blocked")&&s.push(...du(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&gr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function fu(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function _u(e){let t=It(e.created_at),r=It(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function mu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ci):r.children;return i`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?i`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:i`<span class="board-card__roll-none">children 없음</span>`}
        ${_u(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,l)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${c=>t.onChildClick&&t.onChildClick(c,a.id)}
                >
                  <span class=${fu(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${rs(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${$i(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${uu(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function ns(e,t){let r=cu(e.priority);return i`
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
        ${r?i`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${pu(e,t)}
      ${e.workflow&&gr(t.policy||null,"stepper")?ts(e.workflow,e.status):""}
      ${mu(e,t)}
    </article>
  `}function Hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
        ${n?i`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${er.map(o=>i`<option
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
        ${e.items.map(o=>ns(o,t))}
      </div>
    </section>
  `}function xi(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>ns(n,t))}
        </div>
      </div>
    </dialog>
  `}var gu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],bu=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],hu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function yu(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
      ${r.label_menu_open?i`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?i`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>i`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?i`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Si(e,t,r){return i`
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
        ${gu.map(n=>i`<option
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
        ${bu.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${yu(e,t,r)}
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
        ${hu.map(n=>i`<option
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
  `}var vu=200,wu={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},ku=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Ai="beads-ui.board.sort",Ei=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function $u(){try{let e=window.localStorage.getItem(Ai);if(e&&Ei.has(e))return e}catch{}return"created_desc"}function Ti(e,t){let r=ot("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,c=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||Rt,b=s?Zn(s,a):null,E=Qn({transport:o,uiOrderStore:a}),k=[],D=[],q=[],A=[],U=[],te=[],x=!1,w=0,S=$u(),H=new Map,K=new Map,he=new Map,ce=new Set,se={search:"",priority:"",type:"",labels:[]},ue=!1,Fe=null;function We(W){return String(W.status||"open")==="open"}function Ge(W){let J=String(W.status||"open");return J==="open"||J==="blocked"}function He(W){let J=se.search.trim().toLowerCase(),ye=se.priority,me=se.type,de=se.labels;return W.filter(Ne=>{if(J){let et=String(Ne.id||"").toLowerCase(),Ve=String(Ne.title||"").toLowerCase();if(!et.includes(J)&&!Ve.includes(J))return!1}if(ye!==""&&String(Ne.priority)!==ye||me!==""&&String(Ne.issue_type||"")!==me)return!1;if(de.length>0){let et=Array.isArray(Ne.labels)?Ne.labels:[];if(!de.some(Ve=>et.includes(Ve)))return!1}return!0})}function Ze(){let W=new Set;for(let J of[k,D,q,A,U,te])for(let ye of J){let me=Array.isArray(ye.labels)?ye.labels:[];for(let de of me)typeof de=="string"&&de.length>0&&W.add(de)}return Array.from(W).sort()}function Re(){return se.search.trim()!==""||se.priority!==""||se.type!==""||se.labels.length>0}function ve(){try{if(b){let W=b.selectBoardColumn("tab:board:in-progress","in_progress",S),J=b.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ge),ye=new Set(W.map(Ee=>Ee.id)),me=b.selectBoardColumn("tab:board:ready","ready",S).filter(Ee=>We(Ee)&&!ye.has(Ee.id)),de=b.selectBoardColumn("tab:board:resolved","resolved",S),Ne=b.selectBoardColumn("tab:board:deferred","deferred",S),et=b.selectBoardColumn("tab:board:closed","closed").slice(0,vu),Ve=[...J,...me,...W,...de,...et];Ae(Ve);let De=new Set;for(let Ee of Ve)Ee&&Ee.id&&!uo(Ee)&&De.add(Ee.id);let Qe=!Re();k=Qe?an(J,De):J,D=Qe?an(me,De):me,q=Qe?an(W,De):W,A=Qe?an(de,De):de,U=Ne,w=Ne.length,te=Qe?an(et,De):et,H=new Map;for(let Ee of k)H.set(Ee.id,"open");for(let Ee of D)H.set(Ee.id,"open");for(let Ee of q)H.set(Ee.id,"in_progress");for(let Ee of A)H.set(Ee.id,"resolved");for(let Ee of U)H.set(Ee.id,"deferred");for(let Ee of te)H.set(Ee.id,"closed");K=new Map;for(let Ee of k)K.set(Ee.id,"blocked-col");for(let Ee of D)K.set(Ee.id,"ready-col");for(let Ee of q)K.set(Ee.id,"in-progress-col");for(let Ee of A)K.set(Ee.id,"resolved-col");for(let Ee of te)K.set(Ee.id,"closed-col")}Ie()}catch{k=[],D=[],q=[],A=[],U=[],te=[],he=new Map,Ie()}}function Ae(W){let J=new Map;for(let me of W)me&&me.id&&!J.has(me.id)&&J.set(me.id,me);let ye=new Map;for(let me of J.values()){let de=uo(me);if(!de)continue;let Ne=ye.get(de);Ne||(Ne=[],ye.set(de,Ne)),Ne.push({id:me.id,title:me.title,status:me.status,metadata:me.metadata,workflow:me.workflow,created_at:me.created_at,updated_at:me.updated_at})}he=ye}function ke(W){let J=he.get(W)||[],ye=0;for(let de of J)(de.status==="resolved"||de.status==="closed")&&(ye+=1);let me=Xn(J);return{total:J.length,count:ye,current:me,children:J}}function Oe(W){return!ce.has(W)}function pe(W,J){W.preventDefault(),W.stopPropagation(),ce.has(J)?ce.delete(J):ce.add(J),Ie()}function X(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function V(W,J){W.preventDefault(),W.stopPropagation(),n(J)}function we(W,J){Fe||n(J)}function R(W,J){W.preventDefault(),W.stopPropagation(),xu(J).then(ye=>{ye&&le("\uBCF5\uC0AC\uB428","success",1200)})}function T(W,J){Fe=J,W.dataTransfer&&(W.dataTransfer.setData("text/plain",J),W.dataTransfer.effectAllowed="move"),W.target.classList.add("board-card--dragging")}function be(W){W.target.classList.remove("board-card--dragging"),gt(),setTimeout(()=>{Fe=null},0)}function Se(W){let J=String(W.target.value||"");!J||J===m||(m=J,d&&d(J),Ie())}function P(){return l?l.get():null}function z(W){let J=c?c.get():null,ye=J?J.cleanup_failed:null;if(!ye||typeof ye!="object"||Array.isArray(ye))return null;let me=ye[W];return!me||typeof me!="object"||Array.isArray(me)?null:me}let L={onCardClick:we,onCopyId:R,onDragStart:T,onDragEnd:be,onClosedRangeChange:Se,rollupFor:ke,isExpanded:Oe,onRollupToggle:pe,onChildClick:X,onFromChipClick:V,cleanupFailureFor:z,get policy(){return P()}};function Q(W,J){Fe||($(),n(J))}function re(W,J){W.preventDefault(),W.stopPropagation(),$(),n(J)}let ae={...L,onCardClick:Q,onChildClick:re,onFromChipClick:re,get policy(){return P()}};function _e(W){let J=W.target,ye=e.querySelector(".board-filter__labels");J&&ye&&ye.contains(J)||B()}function $e(W){W.key==="Escape"&&B()}function C(){ue||(ue=!0,document.addEventListener("mousedown",_e),document.addEventListener("keydown",$e),Ie())}function B(){ue&&(ue=!1,document.removeEventListener("mousedown",_e),document.removeEventListener("keydown",$e),Ie())}function ee(W){W.key==="Escape"&&$()}function Z(){x||(x=!0,document.addEventListener("keydown",ee),Ie())}function $(){x&&(x=!1,document.removeEventListener("keydown",ee),Ie())}let N={onClose:$,onOverlayClick(W){W.target===W.currentTarget&&$()}},Y={onSearchInput(W){se.search=String(W.target.value||""),ve()},onPriorityChange(W){se.priority=String(W.target.value||""),ve()},onTypeChange(W){se.type=String(W.target.value||""),ve()},onSortChange(W){let J=String(W.target.value||"");if(!(!Ei.has(J)||J===S)){S=J;try{window.localStorage.setItem(Ai,J)}catch{}ve()}},onDeferredToggle(){x?$():Z()},onLabelMenuToggle(){ue?B():C()},onLabelToggle(W){let J=se.labels.indexOf(W);J===-1?se.labels.push(W):se.labels.splice(J,1),ve()},onLabelClear(){se.labels.length!==0&&(se.labels=[],ve())},onNewIssue(){_&&_()}};function Pe(){return i`
      <div class="board-view">
        ${Si(se,Y,{sort_mode:S,deferred_popup_open:x,deferred_count:w,label_options:Ze(),label_menu_open:ue})}
        <div class="board-root">
          ${Hr({title:"Blocked",id:"blocked-col",items:He(k)},L)}
          ${Hr({title:"Ready",id:"ready-col",items:He(D)},L)}
          ${Hr({title:"In progress",id:"in-progress-col",items:He(q)},L)}
          ${Hr({title:"Resolved",id:"resolved-col",items:He(A)},L)}
          ${Hr({title:"Closed",id:"closed-col",items:He(te),is_closed:!0,closed_range:m},L)}
        </div>
        ${x?xi({items:He(U),count:w},ae,N):""}
      </div>
    `}function Ie(){Ue(Pe(),e),qe()}function qe(){try{let W=e.querySelector("#deferred-popup");W&&!W.open&&(typeof W.showModal=="function"?W.showModal():W.setAttribute("open",""));let J=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ye of J)Array.from(ye.querySelectorAll(".board-card")).forEach((de,Ne)=>{de.tabIndex=Ne===0?0:-1})}catch{}}async function Ce(W,J){if(!o){le("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:W,status:J}),le("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ye){r("update-status failed: %o",ye),le("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ke(W){switch(W){case"blocked-col":return k;case"ready-col":return D;case"in-progress-col":return q;case"resolved-col":return A;default:return[]}}function mt(W,J,ye){if(!o||!a)return;let me=Ke(W),de=me.find(Qe=>Qe.id===J);if(!de)return;let Ne=me.filter(Qe=>Qe.id!==J),et=ye.closest?ye.closest(".board-card"):null,Ve=Ne.length;if(et){let Qe=et.getAttribute("data-issue-id");if(Qe===J)return;let Ee=Ne.findIndex(ut=>ut.id===Qe);Ee>=0&&(Ve=Ee)}let De=Ne.slice();De.splice(Ve,0,de),E.applyReorder(J,De,Ve)}function gt(){for(let W of Array.from(e.querySelectorAll(".board-column--drag-over")))W.classList.remove("board-column--drag-over")}let lt=null;e.addEventListener("dragover",W=>{W.preventDefault(),W.dataTransfer&&(W.dataTransfer.dropEffect="move");let ye=W.target.closest(".board-column");ye&&ye!==lt&&(lt&&lt.classList.remove("board-column--drag-over"),ye.classList.add("board-column--drag-over"),lt=ye)}),e.addEventListener("dragleave",W=>{let J=W.relatedTarget;(!J||!e.contains(J))&&lt&&(lt.classList.remove("board-column--drag-over"),lt=null)}),e.addEventListener("drop",W=>{W.preventDefault(),lt&&(lt.classList.remove("board-column--drag-over"),lt=null);let J=W.target,ye=J.closest(".board-column");if(!ye)return;let me=W.dataTransfer?.getData("text/plain")||"";if(!me)return;let de=ye.id,Ne=K.get(me);if(Ne&&Ne===de){if(ku.has(de)){if(S!=="manual"){le("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}mt(de,me,J)}return}let et=wu[de];if(!et){le("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}H.get(me)!==et&&Ce(me,et)}),e.addEventListener("keydown",W=>{let J=W.target;if(!(J instanceof HTMLElement))return;let ye=String(J.tagName||"").toLowerCase();if(ye==="input"||ye==="textarea"||ye==="select"||ye==="button"||ye==="a"||J.isContentEditable===!0)return;let me=J.closest(".board-card");if(!me)return;let de=String(W.key||"");if(de==="Enter"||de===" "){W.preventDefault();let De=me.getAttribute("data-issue-id");De&&n(De);return}if(de!=="ArrowUp"&&de!=="ArrowDown"&&de!=="ArrowLeft"&&de!=="ArrowRight")return;W.preventDefault();let Ne=me.closest(".board-column");if(!Ne)return;let et=Array.from(Ne.querySelectorAll(".board-card")),Ve=et.indexOf(me);if(de==="ArrowDown"&&Ve<et.length-1){kt(me,et[Ve+1]);return}if(de==="ArrowUp"&&Ve>0){kt(me,et[Ve-1]);return}if(de==="ArrowLeft"||de==="ArrowRight"){let De=Array.from(e.querySelectorAll(".board-column")),Qe=De.indexOf(Ne),Ee=de==="ArrowRight"?1:-1,ut=Qe+Ee;for(;ut>=0&&ut<De.length;){let Et=De[ut].querySelector(".board-card");if(Et){kt(me,Et);return}ut+=Ee}}});function kt(W,J){try{W.tabIndex=-1,J.tabIndex=0,J.focus()}catch{}}let at=null;b&&b.subscribe&&(at=b.subscribe(()=>{try{ve()}catch{}}));let st=null;l&&l.subscribe&&(st=l.subscribe(()=>{try{ve()}catch{}}));let dt=null;return c&&c.subscribe&&(dt=c.subscribe(()=>{Ie()})),{async load(){r("load"),ve()},clear(){B(),$(),at&&(at(),at=null),st&&(st(),st=null),dt&&(dt(),dt=null),e.replaceChildren(),k=[],D=[],q=[],A=[],U=[],te=[],H=new Map,K=new Map}}}function uo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function an(e,t){return e.filter(r=>{let n=uo(r);return!(n&&t.has(n))})}async function xu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function ar(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function tr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function hr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function Su(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),l=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",l.textContent=`${tr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${tr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,l,n,s,o),t.body.append(r),new Promise(c=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),c(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function ir(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await Su(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Oi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function _t(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var lr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],ln=[...lr,"reasoning_output_tokens"],Au=["implementation","review-consult"];function po(e){let t=0;for(let r of lr)t+=_t(e?.[r]);return t}function Eu(e){return!e||typeof e!="object"?!1:lr.some(t=>Number.isFinite(e[t]))}function Ci(e){return!e||typeof e!="object"?!1:ln.some(t=>Number.isFinite(e[t]))}function Tu(e){let t={};for(let r of ln)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Ri(e){let t={};for(let r of ln)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Ii(e,t){return e==="codex"?_t(t.input_tokens)+_t(t.output_tokens):po(t)}function Cu(e){return e==="claude"?"Claude":"Codex"}function Ru(e){return`\u03C4 ${Pi(e)}`}function Iu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${_t(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${_t(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${_t(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${_t(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Oi),o.join(`
`)}function vt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Cu(r)} ${Ru(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Iu(r,n)})}return t}function os(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let l=t[o];l||(l={subtotal:0,breakdown:{}},t[o]=l),l.subtotal+=a.subtotal;for(let c of ln)Number.isFinite(a.breakdown[c])&&(l.breakdown[c]=_t(l.breakdown[c])+_t(a.breakdown[c]));a.replayed&&(l.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function fo(e){return!e||typeof e!="object"?null:Mt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Lu(e){return e==="codex"?"codex":"claude"}function yr(){return{subtotal:0,breakdown:Tu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function ss(e,t,r){e.subtotal+=t.subtotal;for(let n of ln)Number.isFinite(t.usage[n])&&(e.breakdown[n]=_t(e.breakdown[n])+_t(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Li(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Pi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Gr(e){return Eu(e)?`\u03C4 ${Pi(po(e))}`:null}function Ht(e){let t=Gr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${_t(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${_t(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${_t(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${_t(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${po(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Oi),r.join(`
`)}function Mt(e,t){let r={claude:yr(),codex:yr()},n={orchestrator:{claude:yr(),codex:yr()},implementation:{claude:yr(),codex:yr()},"review-consult":{claude:yr(),codex:yr()}},s=new Set;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let c=l.usage;if(Ci(c)){let _=Lu(l.runner),m=Ri(c),b={provider:_,role:"orchestrator",attempt_id:String(l.attempt_id||""),usage:m,subtotal:Ii(_,m)};m.replayed===!0&&(b.replayed=!0),typeof l.model=="string"&&(b.model=l.model),typeof l.session_id=="string"&&(b.session_id=l.session_id),ss(r[_],b,!0),ss(n.orchestrator[_],b,!0)}let d=Array.isArray(l.usage_legs)?l.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!Au.includes(_.role)||!Ci(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let b=Ri(_.usage),E={provider:"codex",role:_.role,attempt_id:String(l.attempt_id||""),usage:b,subtotal:Ii("codex",b)};E.receipt_id=m,typeof _.model=="string"&&(E.model=_.model),typeof _.session_id=="string"?E.session_id=_.session_id:typeof _.thread_id=="string"&&(E.session_id=_.thread_id),typeof _.turn_id=="string"&&(E.turn_id=_.turn_id),typeof _.completed_at=="string"&&(E.completed_at=_.completed_at),b.replayed===!0&&(E.replayed=!0),ss(r.codex,E,!1),ss(n[E.role].codex,E,!1)}}let o={};for(let l of["claude","codex"]){let c=r[l];if(c.legs.length===0)continue;let d=Li(c,!1);l==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(d.total_cost_usd=c.outer_cost),o[l]=d}if(Object.keys(o).length===0)return null;let a={};for(let l of["orchestrator","implementation","review-consult"]){let c={};for(let d of["claude","codex"]){let _=n[l][d];_.legs.length>0&&(c[d]={...Li(_,!0),legs:_.legs})}Object.keys(c).length>0&&(a[l]=c)}return{providers:o,roles:a}}var{entries:Wi,setPrototypeOf:Mi,isFrozen:Ou,getPrototypeOf:Pu,getOwnPropertyDescriptor:Mu}=Object,{freeze:xt,seal:Dt,create:vo}=Object,{apply:wo,construct:ko}=typeof Reflect<"u"&&Reflect;xt||(xt=function(t){return t});Dt||(Dt=function(t){return t});wo||(wo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ko||(ko=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var as=St(Array.prototype.forEach),Du=St(Array.prototype.lastIndexOf),Di=St(Array.prototype.pop),cn=St(Array.prototype.push),Nu=St(Array.prototype.splice),ls=St(String.prototype.toLowerCase),_o=St(String.prototype.toString),mo=St(String.prototype.match),dn=St(String.prototype.replace),Fu=St(String.prototype.indexOf),qu=St(String.prototype.trim),Gt=St(Object.prototype.hasOwnProperty),$t=St(RegExp.prototype.test),un=Bu(TypeError);function St(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return wo(e,t,n)}}function Bu(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ko(e,r)}}function ze(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ls;Mi&&Mi(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ou(t)||(t[n]=o),s=o)}e[s]=!0}return e}function ju(e){for(let t=0;t<e.length;t++)Gt(e,t)||(e[t]=null);return e}function cr(e){let t=vo(null);for(let[r,n]of Wi(e))Gt(e,r)&&(Array.isArray(n)?t[r]=ju(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=cr(n):t[r]=n);return t}function pn(e,t){for(;e!==null;){let n=Mu(e,t);if(n){if(n.get)return St(n.get);if(typeof n.value=="function")return St(n.value)}e=Pu(e)}function r(){return null}return r}var Ni=xt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),go=xt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),bo=xt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Uu=xt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ho=xt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Wu=xt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fi=xt(["#text"]),qi=xt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),yo=xt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bi=xt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),is=xt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),zu=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Hu=Dt(/<%[\w\W]*|[\w\W]*%>/gm),Gu=Dt(/\$\{[\w\W]*/gm),Vu=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Yu=Dt(/^aria-[\-\w]+$/),zi=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ku=Dt(/^(?:\w+script|data):/i),Zu=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Hi=Dt(/^html$/i),Xu=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),ji=Object.freeze({__proto__:null,ARIA_ATTR:Yu,ATTR_WHITESPACE:Zu,CUSTOM_ELEMENT:Xu,DATA_ATTR:Vu,DOCTYPE_NAME:Hi,ERB_EXPR:Hu,IS_ALLOWED_URI:zi,IS_SCRIPT_OR_DATA:Ku,MUSTACHE_EXPR:zu,TMPLIT_EXPR:Gu}),fn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Qu=function(){return typeof window>"u"?null:window},Ju=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ui=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Gi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Qu(),t=j=>Gi(j);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==fn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:c,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:E}=e,k=c.prototype,D=pn(k,"cloneNode"),q=pn(k,"remove"),A=pn(k,"nextSibling"),U=pn(k,"childNodes"),te=pn(k,"parentNode");if(typeof a=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let x,w="",{implementation:S,createNodeIterator:H,createDocumentFragment:K,getElementsByTagName:he}=r,{importNode:ce}=n,se=Ui();t.isSupported=typeof Wi=="function"&&typeof te=="function"&&S&&S.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Fe,TMPLIT_EXPR:We,DATA_ATTR:Ge,ARIA_ATTR:He,IS_SCRIPT_OR_DATA:Ze,ATTR_WHITESPACE:Re,CUSTOM_ELEMENT:ve}=ji,{IS_ALLOWED_URI:Ae}=ji,ke=null,Oe=ze({},[...Ni,...go,...bo,...ho,...Fi]),pe=null,X=ze({},[...qi,...yo,...Bi,...is]),V=Object.seal(vo(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,R=null,T=Object.seal(vo(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),be=!0,Se=!0,P=!1,z=!0,L=!1,Q=!0,re=!1,ae=!1,_e=!1,$e=!1,C=!1,B=!1,ee=!0,Z=!1,$="user-content-",N=!0,Y=!1,Pe={},Ie=null,qe=ze({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Ce=null,Ke=ze({},["audio","video","img","source","image","track"]),mt=null,gt=ze({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),lt="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml",st=at,dt=!1,W=null,J=ze({},[lt,kt,at],_o),ye=ze({},["mi","mo","mn","ms","mtext"]),me=ze({},["annotation-xml"]),de=ze({},["title","style","font","a","script"]),Ne=null,et=["application/xhtml+xml","text/html"],Ve="text/html",De=null,Qe=null,Ee=r.createElement("form"),ut=function(h){return h instanceof RegExp||h instanceof Function},Et=function(){let h=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Qe&&Qe===h)){if((!h||typeof h!="object")&&(h={}),h=cr(h),Ne=et.indexOf(h.PARSER_MEDIA_TYPE)===-1?Ve:h.PARSER_MEDIA_TYPE,De=Ne==="application/xhtml+xml"?_o:ls,ke=Gt(h,"ALLOWED_TAGS")?ze({},h.ALLOWED_TAGS,De):Oe,pe=Gt(h,"ALLOWED_ATTR")?ze({},h.ALLOWED_ATTR,De):X,W=Gt(h,"ALLOWED_NAMESPACES")?ze({},h.ALLOWED_NAMESPACES,_o):J,mt=Gt(h,"ADD_URI_SAFE_ATTR")?ze(cr(gt),h.ADD_URI_SAFE_ATTR,De):gt,Ce=Gt(h,"ADD_DATA_URI_TAGS")?ze(cr(Ke),h.ADD_DATA_URI_TAGS,De):Ke,Ie=Gt(h,"FORBID_CONTENTS")?ze({},h.FORBID_CONTENTS,De):qe,we=Gt(h,"FORBID_TAGS")?ze({},h.FORBID_TAGS,De):cr({}),R=Gt(h,"FORBID_ATTR")?ze({},h.FORBID_ATTR,De):cr({}),Pe=Gt(h,"USE_PROFILES")?h.USE_PROFILES:!1,be=h.ALLOW_ARIA_ATTR!==!1,Se=h.ALLOW_DATA_ATTR!==!1,P=h.ALLOW_UNKNOWN_PROTOCOLS||!1,z=h.ALLOW_SELF_CLOSE_IN_ATTR!==!1,L=h.SAFE_FOR_TEMPLATES||!1,Q=h.SAFE_FOR_XML!==!1,re=h.WHOLE_DOCUMENT||!1,$e=h.RETURN_DOM||!1,C=h.RETURN_DOM_FRAGMENT||!1,B=h.RETURN_TRUSTED_TYPE||!1,_e=h.FORCE_BODY||!1,ee=h.SANITIZE_DOM!==!1,Z=h.SANITIZE_NAMED_PROPS||!1,N=h.KEEP_CONTENT!==!1,Y=h.IN_PLACE||!1,Ae=h.ALLOWED_URI_REGEXP||zi,st=h.NAMESPACE||at,ye=h.MATHML_TEXT_INTEGRATION_POINTS||ye,me=h.HTML_INTEGRATION_POINTS||me,V=h.CUSTOM_ELEMENT_HANDLING||{},h.CUSTOM_ELEMENT_HANDLING&&ut(h.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(V.tagNameCheck=h.CUSTOM_ELEMENT_HANDLING.tagNameCheck),h.CUSTOM_ELEMENT_HANDLING&&ut(h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(V.attributeNameCheck=h.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),h.CUSTOM_ELEMENT_HANDLING&&typeof h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(V.allowCustomizedBuiltInElements=h.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),L&&(Se=!1),C&&($e=!0),Pe&&(ke=ze({},Fi),pe=[],Pe.html===!0&&(ze(ke,Ni),ze(pe,qi)),Pe.svg===!0&&(ze(ke,go),ze(pe,yo),ze(pe,is)),Pe.svgFilters===!0&&(ze(ke,bo),ze(pe,yo),ze(pe,is)),Pe.mathMl===!0&&(ze(ke,ho),ze(pe,Bi),ze(pe,is))),h.ADD_TAGS&&(typeof h.ADD_TAGS=="function"?T.tagCheck=h.ADD_TAGS:(ke===Oe&&(ke=cr(ke)),ze(ke,h.ADD_TAGS,De))),h.ADD_ATTR&&(typeof h.ADD_ATTR=="function"?T.attributeCheck=h.ADD_ATTR:(pe===X&&(pe=cr(pe)),ze(pe,h.ADD_ATTR,De))),h.ADD_URI_SAFE_ATTR&&ze(mt,h.ADD_URI_SAFE_ATTR,De),h.FORBID_CONTENTS&&(Ie===qe&&(Ie=cr(Ie)),ze(Ie,h.FORBID_CONTENTS,De)),N&&(ke["#text"]=!0),re&&ze(ke,["html","head","body"]),ke.table&&(ze(ke,["tbody"]),delete we.tbody),h.TRUSTED_TYPES_POLICY){if(typeof h.TRUSTED_TYPES_POLICY.createHTML!="function")throw un('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof h.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw un('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=h.TRUSTED_TYPES_POLICY,w=x.createHTML("")}else x===void 0&&(x=Ju(E,s)),x!==null&&typeof w=="string"&&(w=x.createHTML(""));xt&&xt(h),Qe=h}},Lt=ze({},[...go,...bo,...Uu]),Ft=ze({},[...ho,...Wu]),xr=function(h){let O=te(h);(!O||!O.tagName)&&(O={namespaceURI:st,tagName:"template"});let ne=ls(h.tagName),Te=ls(O.tagName);return W[h.namespaceURI]?h.namespaceURI===kt?O.namespaceURI===at?ne==="svg":O.namespaceURI===lt?ne==="svg"&&(Te==="annotation-xml"||ye[Te]):!!Lt[ne]:h.namespaceURI===lt?O.namespaceURI===at?ne==="math":O.namespaceURI===kt?ne==="math"&&me[Te]:!!Ft[ne]:h.namespaceURI===at?O.namespaceURI===kt&&!me[Te]||O.namespaceURI===lt&&!ye[Te]?!1:!Ft[ne]&&(de[ne]||!Lt[ne]):!!(Ne==="application/xhtml+xml"&&W[h.namespaceURI]):!1},bt=function(h){cn(t.removed,{element:h});try{te(h).removeChild(h)}catch{q(h)}},ht=function(h,O){try{cn(t.removed,{attribute:O.getAttributeNode(h),from:O})}catch{cn(t.removed,{attribute:null,from:O})}if(O.removeAttribute(h),h==="is")if($e||C)try{bt(O)}catch{}else try{O.setAttribute(h,"")}catch{}},nr=function(h){let O=null,ne=null;if(_e)h="<remove></remove>"+h;else{let je=mo(h,/^[\r\n\t ]+/);ne=je&&je[0]}Ne==="application/xhtml+xml"&&st===at&&(h='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+h+"</body></html>");let Te=x?x.createHTML(h):h;if(st===at)try{O=new b().parseFromString(Te,Ne)}catch{}if(!O||!O.documentElement){O=S.createDocument(st,"template",null);try{O.documentElement.innerHTML=dt?w:Te}catch{}}let Je=O.body||O.documentElement;return h&&ne&&Je.insertBefore(r.createTextNode(ne),Je.childNodes[0]||null),st===at?he.call(O,re?"html":"body")[0]:re?O.documentElement:Je},sr=function(h){return H.call(h.ownerDocument||h,h,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},qt=function(h){return h instanceof m&&(typeof h.nodeName!="string"||typeof h.textContent!="string"||typeof h.removeChild!="function"||!(h.attributes instanceof _)||typeof h.removeAttribute!="function"||typeof h.setAttribute!="function"||typeof h.namespaceURI!="string"||typeof h.insertBefore!="function"||typeof h.hasChildNodes!="function")},Bt=function(h){return typeof l=="function"&&h instanceof l};function yt(j,h,O){as(j,ne=>{ne.call(t,h,O,Qe)})}let Qt=function(h){let O=null;if(yt(se.beforeSanitizeElements,h,null),qt(h))return bt(h),!0;let ne=De(h.nodeName);if(yt(se.uponSanitizeElement,h,{tagName:ne,allowedTags:ke}),Q&&h.hasChildNodes()&&!Bt(h.firstElementChild)&&$t(/<[/\w!]/g,h.innerHTML)&&$t(/<[/\w!]/g,h.textContent)||h.nodeType===fn.progressingInstruction||Q&&h.nodeType===fn.comment&&$t(/<[/\w]/g,h.data))return bt(h),!0;if(!(T.tagCheck instanceof Function&&T.tagCheck(ne))&&(!ke[ne]||we[ne])){if(!we[ne]&&y(ne)&&(V.tagNameCheck instanceof RegExp&&$t(V.tagNameCheck,ne)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ne)))return!1;if(N&&!Ie[ne]){let Te=te(h)||h.parentNode,Je=U(h)||h.childNodes;if(Je&&Te){let je=Je.length;for(let ge=je-1;ge>=0;--ge){let v=D(Je[ge],!0);v.__removalCount=(h.__removalCount||0)+1,Te.insertBefore(v,A(h))}}}return bt(h),!0}return h instanceof c&&!xr(h)||(ne==="noscript"||ne==="noembed"||ne==="noframes")&&$t(/<\/no(script|embed|frames)/i,h.innerHTML)?(bt(h),!0):(L&&h.nodeType===fn.text&&(O=h.textContent,as([ue,Fe,We],Te=>{O=dn(O,Te," ")}),h.textContent!==O&&(cn(t.removed,{element:h.cloneNode()}),h.textContent=O)),yt(se.afterSanitizeElements,h,null),!1)},u=function(h,O,ne){if(ee&&(O==="id"||O==="name")&&(ne in r||ne in Ee))return!1;if(!(Se&&!R[O]&&$t(Ge,O))){if(!(be&&$t(He,O))){if(!(T.attributeCheck instanceof Function&&T.attributeCheck(O,h))){if(!pe[O]||R[O]){if(!(y(h)&&(V.tagNameCheck instanceof RegExp&&$t(V.tagNameCheck,h)||V.tagNameCheck instanceof Function&&V.tagNameCheck(h))&&(V.attributeNameCheck instanceof RegExp&&$t(V.attributeNameCheck,O)||V.attributeNameCheck instanceof Function&&V.attributeNameCheck(O,h))||O==="is"&&V.allowCustomizedBuiltInElements&&(V.tagNameCheck instanceof RegExp&&$t(V.tagNameCheck,ne)||V.tagNameCheck instanceof Function&&V.tagNameCheck(ne))))return!1}else if(!mt[O]){if(!$t(Ae,dn(ne,Re,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&h!=="script"&&Fu(ne,"data:")===0&&Ce[h])){if(!(P&&!$t(Ze,dn(ne,Re,"")))){if(ne)return!1}}}}}}}return!0},y=function(h){return h!=="annotation-xml"&&mo(h,ve)},F=function(h){yt(se.beforeSanitizeAttributes,h,null);let{attributes:O}=h;if(!O||qt(h))return;let ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},Te=O.length;for(;Te--;){let Je=O[Te],{name:je,namespaceURI:ge,value:v}=Je,f=De(je),p=v,I=je==="value"?p:qu(p);if(ne.attrName=f,ne.attrValue=I,ne.keepAttr=!0,ne.forceKeepAttr=void 0,yt(se.uponSanitizeAttribute,h,ne),I=ne.attrValue,Z&&(f==="id"||f==="name")&&(ht(je,h),I=$+I),Q&&$t(/((--!?|])>)|<\/(style|title|textarea)/i,I)){ht(je,h);continue}if(f==="attributename"&&mo(I,"href")){ht(je,h);continue}if(ne.forceKeepAttr)continue;if(!ne.keepAttr){ht(je,h);continue}if(!z&&$t(/\/>/i,I)){ht(je,h);continue}L&&as([ue,Fe,We],fe=>{I=dn(I,fe," ")});let G=De(h.nodeName);if(!u(G,f,I)){ht(je,h);continue}if(x&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!ge)switch(E.getAttributeType(G,f)){case"TrustedHTML":{I=x.createHTML(I);break}case"TrustedScriptURL":{I=x.createScriptURL(I);break}}if(I!==p)try{ge?h.setAttributeNS(ge,je,I):h.setAttribute(je,I),qt(h)?bt(h):Di(t.removed)}catch{ht(je,h)}}yt(se.afterSanitizeAttributes,h,null)},ie=function j(h){let O=null,ne=sr(h);for(yt(se.beforeSanitizeShadowDOM,h,null);O=ne.nextNode();)yt(se.uponSanitizeShadowNode,O,null),Qt(O),F(O),O.content instanceof o&&j(O.content);yt(se.afterSanitizeShadowDOM,h,null)};return t.sanitize=function(j){let h=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,ne=null,Te=null,Je=null;if(dt=!j,dt&&(j="<!-->"),typeof j!="string"&&!Bt(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw un("dirty is not a string, aborting")}else throw un("toString is not a function");if(!t.isSupported)return j;if(ae||Et(h),t.removed=[],typeof j=="string"&&(Y=!1),Y){if(j.nodeName){let v=De(j.nodeName);if(!ke[v]||we[v])throw un("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof l)O=nr("<!---->"),ne=O.ownerDocument.importNode(j,!0),ne.nodeType===fn.element&&ne.nodeName==="BODY"||ne.nodeName==="HTML"?O=ne:O.appendChild(ne);else{if(!$e&&!L&&!re&&j.indexOf("<")===-1)return x&&B?x.createHTML(j):j;if(O=nr(j),!O)return $e?null:B?w:""}O&&_e&&bt(O.firstChild);let je=sr(Y?j:O);for(;Te=je.nextNode();)Qt(Te),F(Te),Te.content instanceof o&&ie(Te.content);if(Y)return j;if($e){if(C)for(Je=K.call(O.ownerDocument);O.firstChild;)Je.appendChild(O.firstChild);else Je=O;return(pe.shadowroot||pe.shadowrootmode)&&(Je=ce.call(n,Je,!0)),Je}let ge=re?O.outerHTML:O.innerHTML;return re&&ke["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&$t(Hi,O.ownerDocument.doctype.name)&&(ge="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+ge),L&&as([ue,Fe,We],v=>{ge=dn(ge,v," ")}),x&&B?x.createHTML(ge):ge},t.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Et(j),ae=!0},t.clearConfig=function(){Qe=null,ae=!1},t.isValidAttribute=function(j,h,O){Qe||Et({});let ne=De(j),Te=De(h);return u(ne,Te,O)},t.addHook=function(j,h){typeof h=="function"&&cn(se[j],h)},t.removeHook=function(j,h){if(h!==void 0){let O=Du(se[j],h);return O===-1?void 0:Nu(se[j],O,1)[0]}return Di(se[j])},t.removeHooks=function(j){se[j]=[]},t.removeAllHooks=function(){se=Ui()},t}var Vi=Gi();var dr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},cs=e=>(...t)=>({_$litDirective$:e,values:t}),Yr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var _n=class extends Yr{constructor(t){if(super(t),this.it=it,t.type!==dr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===it||t==null)return this._t=void 0,this.it=t;if(t===Ot)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};_n.directiveName="unsafeHTML",_n.resultType=1;var Yi=cs(_n);function Ao(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Mr=Ao();function tl(e){Mr=e}var hn={exec:()=>null};function Ye(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(At.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var ep=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),At={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},tp=/^(?:[ \t]*(?:\n|$))+/,rp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,np=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,yn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Eo=/(?:[*+-]|\d{1,9}[.)])/,rl=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,nl=Ye(rl).replace(/bull/g,Eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),op=Ye(rl).replace(/bull/g,Eo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),To=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ap=/^[^\n]+/,Co=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ip=Ye(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Co).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),lp=Ye(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Eo).getRegex(),ms="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ro=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,cp=Ye("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ro).replace("tag",ms).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),sl=Ye(To).replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ms).getRegex(),dp=Ye(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",sl).getRegex(),Io={blockquote:dp,code:rp,def:ip,fences:np,heading:sp,hr:yn,html:cp,lheading:nl,list:lp,newline:tp,paragraph:sl,table:hn,text:ap},Ki=Ye("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ms).getRegex(),up={...Io,lheading:op,table:Ki,paragraph:Ye(To).replace("hr",yn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ki).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ms).getRegex()},pp={...Io,html:Ye(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ro).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ye(To).replace("hr",yn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",nl).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},fp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,_p=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ol=/^( {2,}|\\)\n(?!\s*$)/,mp=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,gs=/[\p{P}\p{S}]/u,Lo=/[\s\p{P}\p{S}]/u,al=/[^\s\p{P}\p{S}]/u,gp=Ye(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Lo).getRegex(),il=/(?!~)[\p{P}\p{S}]/u,bp=/(?!~)[\s\p{P}\p{S}]/u,hp=/(?:[^\s\p{P}\p{S}]|~)/u,yp=Ye(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ep?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ll=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,vp=Ye(ll,"u").replace(/punct/g,gs).getRegex(),wp=Ye(ll,"u").replace(/punct/g,il).getRegex(),cl="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",kp=Ye(cl,"gu").replace(/notPunctSpace/g,al).replace(/punctSpace/g,Lo).replace(/punct/g,gs).getRegex(),$p=Ye(cl,"gu").replace(/notPunctSpace/g,hp).replace(/punctSpace/g,bp).replace(/punct/g,il).getRegex(),xp=Ye("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,al).replace(/punctSpace/g,Lo).replace(/punct/g,gs).getRegex(),Sp=Ye(/\\(punct)/,"gu").replace(/punct/g,gs).getRegex(),Ap=Ye(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ep=Ye(Ro).replace("(?:-->|$)","-->").getRegex(),Tp=Ye("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ep).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ps=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Cp=Ye(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",ps).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),dl=Ye(/^!?\[(label)\]\[(ref)\]/).replace("label",ps).replace("ref",Co).getRegex(),ul=Ye(/^!?\[(ref)\](?:\[\])?/).replace("ref",Co).getRegex(),Rp=Ye("reflink|nolink(?!\\()","g").replace("reflink",dl).replace("nolink",ul).getRegex(),Zi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Oo={_backpedal:hn,anyPunctuation:Sp,autolink:Ap,blockSkip:yp,br:ol,code:_p,del:hn,emStrongLDelim:vp,emStrongRDelimAst:kp,emStrongRDelimUnd:xp,escape:fp,link:Cp,nolink:ul,punctuation:gp,reflink:dl,reflinkSearch:Rp,tag:Tp,text:mp,url:hn},Ip={...Oo,link:Ye(/^!?\[(label)\]\((.*?)\)/).replace("label",ps).getRegex(),reflink:Ye(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ps).getRegex()},$o={...Oo,emStrongRDelimAst:$p,emStrongLDelim:wp,url:Ye(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Zi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ye(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Zi).getRegex()},Lp={...$o,br:Ye(ol).replace("{2,}","*").getRegex(),text:Ye($o.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ds={normal:Io,gfm:up,pedantic:pp},mn={normal:Oo,gfm:$o,breaks:Lp,pedantic:Ip},Op={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Xi=e=>Op[e];function ur(e,t){if(t){if(At.escapeTest.test(e))return e.replace(At.escapeReplace,Xi)}else if(At.escapeTestNoEncode.test(e))return e.replace(At.escapeReplaceNoEncode,Xi);return e}function Qi(e){try{e=encodeURI(e).replace(At.percentDecode,"%")}catch{return null}return e}function Ji(e,t){let r=e.replace(At.findPipe,(o,a,l)=>{let c=!1,d=a;for(;--d>=0&&l[d]==="\\";)c=!c;return c?"|":" |"}),n=r.split(At.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(At.slashPipe,"|");return n}function gn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Pp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function el(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,c}function Mp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var fs=class{constructor(e){tt(this,"options");tt(this,"rules");tt(this,"lexer");this.options=e||Mr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:gn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Mp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=gn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:gn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=gn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))l.push(r[c]),a=!0;else if(!a)l.push(r[c]);else break;r=r.slice(c);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let E=b,k=E.raw+`
`+r.join(`
`),D=this.blockquote(k);o[o.length-1]=D,n=n.substring(0,n.length-E.raw.length)+D.raw,s=s.substring(0,s.length-E.text.length)+D.text;break}else if(b?.type==="list"){let E=b,k=E.raw+`
`+r.join(`
`),D=this.list(k);o[o.length-1]=D,n=n.substring(0,n.length-b.raw.length)+D.raw,s=s.substring(0,s.length-E.raw.length)+D.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),b=e.split(`
`,1)[0],E=!m.trim(),k=0;if(this.options.pedantic?(k=2,_=m.trimStart()):E?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,_=m.slice(k),k+=t[1].length),E&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,e=e.substring(b.length+1),c=!0),!c){let D=this.rules.other.nextBulletRegex(k),q=this.rules.other.hrRegex(k),A=this.rules.other.fencesBeginRegex(k),U=this.rules.other.headingBeginRegex(k),te=this.rules.other.htmlBeginRegex(k);for(;e;){let x=e.split(`
`,1)[0],w;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),w=b):w=b.replace(this.rules.other.tabCharGlobal,"    "),A.test(b)||U.test(b)||te.test(b)||D.test(b)||q.test(b))break;if(w.search(this.rules.other.nonSpaceChar)>=k||!b.trim())_+=`
`+w.slice(k);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||A.test(m)||U.test(m)||q.test(m))break;_+=`
`+b}!E&&!b.trim()&&(E=!0),d+=x+`
`,e=e.substring(x.length+1),m=w.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(c.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};c.checked=_.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=_.raw+c.tokens[0].raw,c.tokens[0].text=_.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(_)):c.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):c.tokens.unshift(_)}}if(!s.loose){let d=c.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let c of s.items){c.loose=!0;for(let d of c.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Ji(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Ji(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=gn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Pp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),el(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return el(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,c=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+c);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Vt=class xo{constructor(t){tt(this,"tokens");tt(this,"options");tt(this,"state");tt(this,"inlineQueue");tt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Mr,this.options.tokenizer=this.options.tokenizer||new fs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:At,block:ds.normal,inline:mn.normal};this.options.pedantic?(r.block=ds.pedantic,r.inline=mn.pedantic):this.options.gfm&&(r.block=ds.gfm,this.options.breaks?r.inline=mn.breaks:r.inline=mn.gfm),this.tokenizer.rules=r}static get rules(){return{block:ds,inline:mn}}static lex(t,r){return new xo(r).lex(t)}static lexInline(t,r){return new xo(r).inlineTokens(t)}lex(t){t=t.replace(At.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(At.tabCharGlobal,"    ").replace(At.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),c;this.options.extensions.startBlock.forEach(d=>{c=d.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let c;if(this.options.extensions?.inline?.some(_=>(c=_.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let _=r.at(-1);c.type==="text"&&_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,l)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),b;this.options.extensions.startInline.forEach(E=>{b=E.call({lexer:this},m),typeof b=="number"&&b>=0&&(_=Math.min(_,b))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(c=this.tokenizer.inlineText(d)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(l=c.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=c.raw,_.text+=c.text):r.push(c);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},_s=class{constructor(e){tt(this,"options");tt(this,"parser");this.options=e||Mr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(At.notSpaceStart)?.[0],s=e.replace(At.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ur(n)+'">'+(r?s:ur(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ur(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let l=e.items[a];n+=this.listitem(l)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ur(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Qi(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ur(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Qi(e);if(s===null)return ur(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ur(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ur(e.text)}},Po=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Yt=class So{constructor(t){tt(this,"options");tt(this,"renderer");tt(this,"textRenderer");this.options=t||Mr,this.options.renderer=this.options.renderer||new _s,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Po}static parse(t,r){return new So(r).parse(t)}static parseInline(t,r){return new So(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},us,bn=(us=class{constructor(e){tt(this,"options");tt(this,"block");this.options=e||Mr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Vt.lex:Vt.lexInline}provideParser(){return this.block?Yt.parse:Yt.parseInline}},tt(us,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),tt(us,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),us),Dp=class{constructor(...e){tt(this,"defaults",Ao());tt(this,"options",this.setOptions);tt(this,"parse",this.parseMarkdown(!0));tt(this,"parseInline",this.parseMarkdown(!1));tt(this,"Parser",Yt);tt(this,"Renderer",_s);tt(this,"TextRenderer",Po);tt(this,"Lexer",Vt);tt(this,"Tokenizer",fs);tt(this,"Hooks",bn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new _s(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new fs(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],c=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new bn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],c=s[a];bn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&bn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,d);return c.call(s,m)})();let _=l.call(s,d);return c.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,d);return m===!1&&(m=await c.apply(s,d)),m})();let _=l.apply(s,d);return _===!1&&(_=c.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Vt.lex(e,t??this.defaults)}parser(e,t){return Yt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Vt.lex:Vt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Yt.parse:Yt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ur(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Pr=new Dp;function Xe(e,t){return Pr.parse(e,t)}Xe.options=Xe.setOptions=function(e){return Pr.setOptions(e),Xe.defaults=Pr.defaults,tl(Xe.defaults),Xe};Xe.getDefaults=Ao;Xe.defaults=Mr;Xe.use=function(...e){return Pr.use(...e),Xe.defaults=Pr.defaults,tl(Xe.defaults),Xe};Xe.walkTokens=function(e,t){return Pr.walkTokens(e,t)};Xe.parseInline=Pr.parseInline;Xe.Parser=Yt;Xe.parser=Yt.parse;Xe.Renderer=_s;Xe.TextRenderer=Po;Xe.Lexer=Vt;Xe.lexer=Vt.lex;Xe.Tokenizer=fs;Xe.Hooks=bn;Xe.parse=Xe;var Ng=Xe.options,Fg=Xe.setOptions,qg=Xe.use,Bg=Xe.walkTokens,jg=Xe.parseInline;var Ug=Yt.parse,Wg=Vt.lex;function vr(e){let t=Xe.parse(e),r=Vi.sanitize(t);return Yi(r)}function pr(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Kr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function bs(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Np={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Fp=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,qp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function wr(e){return!!e&&typeof e=="object"}function Mo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function pl(e,t){let r=Mo(e),n=Mo(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let c=s.get(l)||0;c>0?s.set(l,c-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Bp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>wr(s)&&typeof s.text=="string"?s.text:"").join(""):wr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function jp(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Np[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Mo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=pl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let c=pl(wr(l)?l.old_string:"",wr(l)?l.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function fl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function _l(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Fp.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:qp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Up(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(wr(o)){if(o.type==="text"&&typeof o.text=="string")s.push(_l(o.text));else if(o.type==="thinking"){let a=fl(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=jp(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(wr(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Bp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Wp(e){if(e.type==="item.completed"&&wr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[_l(t.text)];if(t.type==="reasoning"){let r=fl(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function zp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ml(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!wr(o))continue;let a=zp(o)?Wp(o):Up(o,r);for(let l of a)t.push(l)}return t}var Hp=5,Gp=10,Vp=/Task\s+#(\d+)/,Yp=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Kp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function hs(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Zp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Xp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Qp(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=Vp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!c||d.length===0)continue;t.set(c[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Jp(e){if(e.tool==="Bash"){let t=e.command||"";return Yp.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Kp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ef(e){let t=e.filter(s=>s.kind==="tool").slice(-Gp),r=new Map;t.forEach((s,o)=>{let a=Jp(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function tf(e){let t=Xp(e);if(t)return{text:t,guess:!1};let r=Qp(e);if(r)return{text:r,guess:!1};let n=ef(e);return n?{text:n,guess:!0}:null}function rf(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:It(e,t)}function ys(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,c=new Set,d=new Set,_=null,m=null,b=!1,E=!1,k=!1,D=null,q=null;function A(){b=!1,E=!1,k=!1,D=null,q=null}async function U(R){if(r){E=!0,k=!1,Re();try{let T=await Promise.resolve(r("get-attempt-prompt",{attempt_id:R}));if(o!==R)return;!T||typeof T!="object"||Array.isArray(T)?k=!0:(D=T,q=R)}catch{o===R&&(k=!0)}finally{o===R&&(E=!1,Re())}}}function te(){if(b=!b,b&&o&&q!==o){U(o);return}Re()}function x(){if(!b)return"";let R=Kr({loading:E,error:k});if(R)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${R}
      </div>`;if(!D)return"";if(D.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let T=bs(D.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${T?i`<div class="prompt-block__meta">${T} 발송</div>`:""}
      ${typeof D.task_prompt=="string"?pr("\uACFC\uC5C5 (user)",D.task_prompt):""}
      ${typeof D.system_prompt=="string"?pr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",D.system_prompt):""}
    </div>`}function w(){if(!o||!n)return[];let R=n.get(o);return ml(R?R.lines:[])}function S(){if(!o||!n)return null;let R=n.get(o),T=R?R.last_event_at:null;return typeof T=="number"?T:null}function H(){return a.status==="running"}function K(){if(H()&&o){m||(m=setInterval(()=>Re(),1e3));return}he()}function he(){m&&(clearInterval(m),m=null)}function ce(R){let T=[],be=0;for(;be<R.length;){let Se=R[be];if(Se.kind==="tool"){let P=be;for(;P<R.length&&R[P].kind==="tool"&&R[P].tool===Se.tool;)P+=1;if(P-be>=Hp&&!d.has(be)){T.push({kind:"group",idx:be,tool:Se.tool||"",lines:R.slice(be,P).map((z,L)=>({idx:be+L,line:z}))}),be=P;continue}}T.push({kind:"line",idx:be,line:Se}),be+=1}return T}function se(R){for(let T=R.length-1;T>=0;T-=1){let be=R[T];if(be.kind==="result"||be.kind==="error")return null;if(be.kind==="tool"&&!Object.hasOwn(be,"result"))return be}return null}function ue(R){for(let T=R.length-1;T>=0;T-=1)if(R[T].kind==="thinking")return R[T];return null}function Fe(R,T){if(T.kind==="gate")return i`<div class="sv__gate">${T.text}</div>`;if(T.kind==="phase")return i`<div class="sv__phase">${T.text}</div>`;if(T.kind==="result")return i`<div
        class="sv__result${T.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${T.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${vr(T.text||(T.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(T.kind==="thinking"){let be=c.has(R);return i`<div
        class="sv__think${be?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ae(R)}
      >
        <span class="sv__think-line">💭 ${hs(T.text)}</span>
        ${be?i`<pre class="sv__think-expand">${T.text}</pre>`:""}
      </div>`}if(T.kind==="error")return i`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="blocker")return i`<div class="sv__error">⛔ ${T.text}</div>`;if(T.kind==="tool"){let be=c.has(R),Se=T.tool==="Bash"?Zp(T.command):0,P=T.tool==="Bash"?Se>1?hs(T.command):T.command:T.path||T.command||"";return i`<div
        class="sv__tool${be?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Ae(R)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${T.icon}</span>
          <span class="sv__tool-name">${T.tool}</span>
          ${P?i`<span class="sv__tool-detail">${P}</span>`:""}
          ${Se>1?i`<span class="sv__tool-more">⋯ ${Se}줄</span>`:""}
          ${typeof T.added=="number"?i`<span class="sv__diff-add">+${T.added}</span>`:""}
          ${typeof T.removed=="number"?i`<span class="sv__diff-del">−${T.removed}</span>`:""}
          ${T.result?i`<span class="sv__tool-ok">→ ${T.result}</span>`:""}
        </span>
        ${be?i`<pre class="sv__tool-expand">${We(T)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${vr(T.text||"")}</div>`}function We(R){let T=[];if(R.tool==="Bash"&&typeof R.command=="string"&&R.command.length>0)T.push(R.command);else if(R.input!==void 0)try{T.push(`input: ${JSON.stringify(R.input,null,2)}`)}catch{}return typeof R.output=="string"&&R.output.length>0&&T.push(`output:
${R.output}`),T.join(`

`)}function Ge(){if(!o)return i``;let R=w(),T=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),be=a.session_id||"",Se=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,P=H(),z=P?rf(S(),Date.now()):"",L=P?se(R):null,Q=P?ue(R):null,re=tf(R);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${re?i`<span
              class="sv__stage${re.guess?" sv__stage--guess":""}"
              title=${re.text}
              >${re.text}</span
            >`:""}
        ${P?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${z?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${z}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${z?i`<span class="sv__live-ago">${z}</span>`:""}</span
            >`:""}
        ${be?i`<button
              type="button"
              class="sv__session"
              title=${be}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${be}`}
              @click=${()=>Oe(be)}
            >
              ⧉ ${be.slice(0,8)}
            </button>`:""}
        ${T?i`<span class="sv__meta">${T}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${b?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${b?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${te}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${Se}
          @click=${ke}
        >
          <span class="sv__follow-full">⇣ ${Se}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>we()}
        >
          ✕
        </button>
      </div>
      ${x()}
      <div class="sv__body">
        ${R.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:ce(R).map(ae=>ae.kind==="group"?He(ae):Fe(ae.idx,ae.line))}
      </div>
      ${L||Q?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${L?i`<span class="sv__now-icon">${L.icon}</span>
                  <span class="sv__now-name">${L.tool}</span>
                  <span class="sv__now-detail"
                    >${L.tool==="Bash"?hs(L.command):L.path||L.command||""}</span
                  >`:""}
            ${Q?i`<span class="sv__now-think"
                  >💭 ${hs(Q.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function He(R){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ze(R.idx)}
    >
      <span class="sv__group-icon">${R.lines[0].line.icon}</span>
      <span class="sv__group-name">${R.tool}</span>
      <span class="sv__group-count">${R.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ze(R){d.add(R),Re()}function Re(){Ue(Ge(),e),K(),l&&ve()}function ve(){let R=e.querySelector(".sv__body");R&&(R.scrollTop=R.scrollHeight)}function Ae(R){c.has(R)?c.delete(R):c.add(R),Re()}function ke(){l=!l,Re()}function Oe(R){ar(R).then(T=>{T?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(R){!o||!R||(a={...a,...R},Re())}function X(R){let T=R.target;if(!T||!T.classList||!T.classList.contains("sv__body"))return;!(T.scrollHeight-T.scrollTop-T.clientHeight<=4)&&l&&(l=!1,Re())}e.addEventListener("scroll",X,!0);function V(R){let T=R&&R.attempt_id;T&&(o=T,a=R.meta||{},l=!0,c.clear(),d.clear(),A(),!_&&n&&(_=n.subscribe(Re)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Re())}function we(){let R=o;o=null,c.clear(),d.clear(),A(),he(),r&&R&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${R}`})).catch(()=>{}),Ue(i``,e),s&&s()}return{open:V,updateMeta:pe,close:we,isOpen(){return o!==null},destroy(){he(),_&&(_(),_=null),e.removeEventListener("scroll",X,!0),o=null,Ue(i``,e)}}}function vn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=gl(t.spec_id),s=gl(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function gl(e){return typeof e=="string"?e.trim():""}function nf(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function sf(e){let t=e&&e.metadata||{},r=vn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:nf(t)?null:"plan_pending"}),n}function bl(e,t){let r=sf(e);return i`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?i`<div class="detail-empty">산출물 없음</div>`:i`
          ${r.map(n=>i`<div class="detail-art">
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
  `}var of="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",af=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,lf=/^\*\*결론\*\* — (.+)$/;function vs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==of)return null;let r=af.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?lf.exec(t[a]):null,c=l?l[1].replace(/\s+/g," ").trim():"",d=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(d).join(`
`).trim()}}var hl=20;function yl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function cf(e){return e.length>hl?`${e.slice(0,hl)}\u2026`:e}function df(e,t,r,n){let s=`${t.lane} ${cf(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${yl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${vr(t.body)}
        </div>`:""}
  </div>`}function uf(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${yl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${vr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function vl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((c,d)=>String(d.created_at||"").localeCompare(String(c.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${l.map(c=>{let d=vs(typeof c.text=="string"?c.text:"");return d?df(c,d,t,s.has(c.id)):uf(c)})}
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
  `}var{I:kb}=Ga;var wl=e=>e.strings===void 0;var pf={},kl=(e,t=pf)=>e._$AH=t;var Dr=cs(class extends Yr{constructor(e){if(super(e),e.type!==dr.PROPERTY&&e.type!==dr.ATTRIBUTE&&e.type!==dr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!wl(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ot||t===it)return t;let r=e.element,n=e.name;if(e.type===dr.PROPERTY){if(t===r[n])return Ot}else if(e.type===dr.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Ot}else if(e.type===dr.ATTRIBUTE&&r.getAttribute(n)===t+"")return Ot;return kl(e),t}});var Do=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ws=["orchestration_model","orchestration_effort","orchestration_speed"],$l=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ks=["delegated","main"],$s=["inherit","claude","codex"],wn=["default","fast"],xs=["standard","fast_track"],kn=["codex","opus","fable","self","skip"],Ss=["codex","fable","skip"],As=["low","medium","high","xhigh"],Nt="auto";function fr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function xl(e){if(!fr(e)||!fr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))fr(n)&&fr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function Sl(e){return e?.impl_dispatch==="main"}function Es(e,t){let r=xl(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Nt,...n.flatMap(([,s])=>s)]}function Zr(e,t,r){if(!fr(e)||!fr(e.runners))return[Nt];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!fr(o)||!fr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,l]of Object.entries(o.models)){if(r&&r!==Nt&&a!==r)continue;let c=fr(l)?l.efforts:null;if(Array.isArray(c))for(let d of c)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[Nt,...n]}function Ts(e,t){let r=xl(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function Al(e,t){let r={};for(let n of Do){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function El(e,t){let r={};for(let n of ws){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var No=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...ws]}],Fo={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},Cl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Tl(e){return typeof e=="string"&&e.length>0?e:null}function ff(e,t,r){let n=Tl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=Tl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function Cs(e,t,r){return e.map(n=>({key:n,...ff(n,t,r)}))}function Rl(e,t,r){let n={pin:0,global:0,base:0};for(let s of Cs(e,t,r))n[s.source]+=1;return n}function Il(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Ll(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var Ib=[...Do,...ws];var _f=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],mf={pin:"pin",global:"global",base:"base"};function gf(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${mf[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function bf(e,t,r){switch(e){case"workflow_mode":return xs;case"spec_review_model":case"impl_review_model":return kn;case"plan_review_model":return Ss;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return As;case"impl_dispatch":return ks;case"impl_runtime":return $s;case"impl_model":return Es(r,t.impl_runtime);case"impl_effort":return Zr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return wn;case"orchestration_model":return Ts(r,null);case"orchestration_effort":return Zr(r,void 0,t.orchestration_model||Nt).filter(n=>n!==Nt);default:return[]}}function hf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${gf(e.source)}
    <span class="detail-effective__k"
      >${Fo[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${Cl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Fo[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Nt?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function Ol(e,t){let r=No.flatMap(o=>o.keys),n=Rl(r,e.metadata,e.workspace_values),s={};for(let o of Cs(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
  >
    <button
      type="button"
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      aria-expanded=${e.expanded?"true":"false"}
      @click=${t.onToggle}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary">${yf(s)}</span>
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${n.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${n.global}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </button>
    <div class="detail-effective__body">
      ${No.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${Cs(o.keys,e.metadata,e.workspace_values).map(a=>hf(a,{expanded:e.expanded,options:bf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Dr(e.preset_id)}
          ?disabled=${e.preset_busy}
          @change=${o=>t.onPresetSelect(String(o.target.value))}
        >
          <option value="" ?selected=${e.preset_id===""}>
            구현 프리셋…
          </option>
          ${e.presets.map(o=>i`<option
                value=${o.id}
                ?selected=${o.id===e.preset_id}
              >
                ${o.name}${o.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
        <span class="detail-effective__hint">구현 키 5개를 핀으로 기록</span>
      </div>
    </div>
  </section>`}function yf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function Pl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",l=rs(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?i`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?i`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?i`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${l?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${l.kind}
            title=${l.title}
            >${l.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${_f.map(c=>{let d=c.receipt&&typeof t[c.receipt]=="string"?String(t[c.receipt]):"",_=n[c.id],m=d.length>0||_?.fill==="full",b=!m&&_?.fill==="dim",E=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${b?" detail-summary__gate--current":""}${E?" detail-summary__gate--stale":""}`}
          data-gate=${c.id}
        >
          <span class="detail-summary__gate-pill">${c.label}</span>
          ${d?i`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Ml=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function $n(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rs(e){if(!$n(e)||!$n(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>$n(r)&&$n(r.models));return t.length>0?t:null}function qo(e,t){let r=Rs(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Dl(e,t){return $n(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Nl(e,t){let r=Rs(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Dl(n,n.models[t]);return[]}function vf(e){let t=Rs(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Dl(n,s))r.includes(o)||r.push(o);return r}function wf(e,t){if(!t)return vf(e);let n=Rs(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Nl(e,o))s.includes(a)||s.push(a);return s}function Fl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=qo(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Nl(t,n.impl_model):wf(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function kf(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function ql(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function c(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",c);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${kf(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${l}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:vr(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){Ue(d(),e)}async function m(k,D={}){s=k,o="loading",a="",l="",_();let q=r?r():"";if(!q){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let A="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent(k);try{let U=await n(A),te=await U.json().catch(()=>({}));if(!U.ok||!te||te.ok!==!0){if(te?.error==="not_found"&&D.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(te&&te.error||U.status)+")",_();return}a=String(te.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,Ue(i``,e)}function E(){document.removeEventListener("keydown",c),b()}return{open:m,close:b,destroy:E}}var $f=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ul="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function xf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Sf(e){let t=vt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Gr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ul}
          >부분 집계</span
        >`:""}`}function Bl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function jl(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Wl(t):""}function Af(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=vt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?i`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${jl(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${jl(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Ef(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...$f,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${xf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Ul}</span>`:""}
  </div>`}var Tf={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Wl(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Cf(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function zl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,b=o.has(d.attempt_id),E=m&&!b,k=m?b?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${k}
      @click=${D=>{D.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,b=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${b}>
      ${d.cause}
    </div>`},c=d=>{let _=Bl(fo(d));if(vt(_).length===0&&!Gr(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${b=>{b.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${Sf(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=fo(d),m=Bl(_),b=vt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Tf[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${hr(d)?i`<span
                  class="detail-session__resumed"
                  title=${hr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${tr(d)}</span>
            ${b.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${b.length>0?b.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Gr(d.usage)?i`<span class="detail-session__usage"
                    >${Gr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Wl(d.started_at)}</span>
          </button>
          ${c(d)} ${a(d)} ${l(d)} ${Cf(d)}
          ${s.has(d.attempt_id)&&d.usage?Ef(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${Af(_)}
        </div>`})}
    </div>
  `}function Hl(e,t={}){return i`
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
    ${e.expanded?i`<div class="detail-prompt" data-seam="task-prompt">
          ${Rf(e)}
        </div>`:""}
  `}function Rf(e){let t=Kr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?pr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=bs(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?pr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?pr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var If=["open","in_progress","deferred","resolved","closed"],Lf=[0,1,2,3,4];function Gl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,c=t.sessionLogStore,d=null,_=null,m={},b="",E=!1,k=!1,D={},q=!1,A=!1,U="",te="",x="";function w(){q=!1,A=!1,U="",te="",x=""}let S=[],H=null,K=null,he=!1,ce="",se=!1,ue=0,Fe=new Set;function We(){S=[],H=null,K=null,he=!1,ce="",se=!1,ue+=1,Fe.clear()}async function Ge(v){if(!s)return;let f=++ue;try{let p=await Promise.resolve(s("get-comments",{id:v}));if(f!==ue||v!==d)return;S=Array.isArray(p)?p:[],he=!1}catch{if(f!==ue||v!==d)return;he=!0}ge()}function He(){if(!s||!d)return;let v=_&&typeof _.comment_count=="number"?_.comment_count:null;if(H!==d){H=d,K=v,Ge(d);return}v!==null&&v!==K&&(K=v,Ge(d))}function Ze(v){Fe.has(v)?Fe.delete(v):Fe.add(v),ge()}function Re(v){let f=ce.trim().length===0;ce=v,f!==(v.trim().length===0)&&ge()}async function ve(){let v=ce.trim();if(!s||!d||v.length===0||se)return;let f=d;se=!0,ge();let p=!1;try{let I=await Promise.resolve(s("add-comment",{id:f,text:v}));Array.isArray(I)&&I.length>0&&(p=!0,f===d&&(S=I,he=!1,ce="",K=I.length))}catch{p=!1}p||le("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(se=!1),ge()}let Ae={onToggle:Ze,onDraftInput:Re,onSubmit:ve},ke=document.createElement("div");ke.className="md-viewer-root",document.body.appendChild(ke);let Oe=ql(ke,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),pe=document.createElement("div");pe.className="session-log-root",document.body.appendChild(pe);let X=ys(pe,{transport:s?(v,f)=>Promise.resolve(s(v,f)):void 0,sessionLogStore:c}),V=!1,we=!1,R=!1,T=null,be=null,Se=0;function P(v){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${v}`}function z(){V=!1,we=!1,R=!1,T=null,be=null,Se+=1}async function L(v){if(!s)return;let f=++Se;we=!0,R=!1,ge();try{let p=await Promise.resolve(s("get-bead-prompt",{bead_id:v}));if(f!==Se)return;!p||typeof p!="object"||Array.isArray(p)?R=!0:(T=p,be=P(v))}catch{f===Se&&(R=!0)}finally{f===Se&&(we=!1,ge())}}function Q(){if(V=!V,V&&d&&be!==P(d)){T=null,L(d);return}ge()}function re(){if(!a||!d)return[];let v=a.get();return(v&&v.attempts?Object.values(v.attempts):[]).filter(p=>p&&p.bead_id===d).sort((p,I)=>(I.started_at||0)-(p.started_at||0)).map(p=>({attempt_id:p.attempt_id,bead_id:p.bead_id,status:p.status,started_at:typeof p.started_at=="number"?p.started_at:null,runner:p.runner||null,model:p.model||null,effort:p.effort||null,speed:p.speed||null,session_id:p.session_id||null,resumed_from:p.resumed_from||null,continuation_mode:p.continuation_mode||null,dismissed_at:typeof p.dismissed_at=="number"?p.dismissed_at:null,cause:typeof p.cause=="string"?p.cause:null,cause_detail:p.cause_detail||null,exec_default_preset_id:typeof p.exec_default_preset_id=="string"?p.exec_default_preset_id:null,exec_default_preset_revision:typeof p.exec_default_preset_revision=="number"?p.exec_default_preset_revision:null,exec_values:p.exec_values&&typeof p.exec_values=="object"?p.exec_values:null,usage:p.usage||null,usage_legs:Array.isArray(p.usage_legs)?p.usage_legs:[]}))}function ae(){if(!a||!d)return null;let v=a.get();return Mt(v&&v.attempts||{},d)}let _e=new Set;function $e(v){_e.has(v)?_e.delete(v):_e.add(v),ge()}function C(v){let f=a?a.get():null,p=f&&f.attempts?f.attempts[v]:null;X.open({attempt_id:v,meta:p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}})}async function B(v){if(!s||!v)return;let f=()=>{let fe=a?a.get():null;return fe&&typeof fe.revision=="number"?fe.revision:0},p=async(fe={})=>await s("worker-attempt-resume",{attempt_id:v,expected_revision:f(),...fe}),I=fe=>{fe?.queue&&a?.set&&a.set(fe.queue)},G=await p();if(I(G),G&&G.conflict){let fe=G.queue&&typeof G.queue.revision=="number"?G.queue.revision:f();G=await s("worker-attempt-resume",{attempt_id:v,expected_revision:fe}),I(G)}G=await ir(G,(fe,Le)=>p({continuation:fe,decision_token:Le}),{onResult:I,refresh:()=>p()}),G&&G.resumed===!1&&!G.conflict&&G.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${G.reason}`,"error",2400)}let ee={onOpen:C,onResume:B,onToggleUsage:$e};function Z(){let v=a?a.get():null,f={...D};for(let p of["orchestration_model","orchestration_effort","orchestration_speed"]){let I=v&&v[p];typeof I=="string"&&(f[p]=I)}return f}async function $(){if(s){try{let v=await Promise.resolve(s("get-session-defaults",{}));D=v&&v.values&&typeof v.values=="object"?v.values:{}}catch{D={}}ge()}}function N(){let v=a?a.get():null;return v&&v.runner_catalog||null}function Y(){let v=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},p=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof v.orchestration_model=="string"?v.orchestration_model:"")||(typeof Z().orchestration_model=="string"?Z().orchestration_model:"")||"opus";return qo(N(),p)}function Pe(){let v=l?l.get():null;return!v||typeof v.revision!="number"?null:{revision:v.revision,presets:Array.isArray(v.presets)?v.presets:[]}}function Ie(v){return v?.compatible===!1}function qe(v){l&&v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&l.set({revision:v.revision,presets:v.presets})}async function Ce(){let v=Pe(),f=v?.presets.find(p=>p.id===b);if(!(!s||!d||!v||!f||Ie(f)||E)){E=!0,ge();try{let p=await Promise.resolve(s("apply-impl-preset",Ll(d,f.id,v.revision)));if(p&&p.conflict){qe(p),le("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let I=p&&Array.isArray(p.issue)?p.issue[0]:p?.issue;if(p&&p.applied&&I&&typeof I=="object"){_=I;for(let G of Ml)delete m[G];le("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}p&&p.error==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(p){p&&typeof p=="object"&&p.code==="bd_readback_failed"?le("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):le("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,ge()}}}let Ke=null;r&&r.subscribe&&(Ke=r.subscribe(()=>kt()));let mt=null;a&&typeof a.subscribe=="function"&&(mt=a.subscribe(()=>{d&&ge()}));let gt=null;l&&typeof l.subscribe=="function"&&(gt=l.subscribe(()=>{d&&ge()}));function lt(v){v.key==="Escape"&&d&&(v.preventDefault(),n())}document.addEventListener("keydown",lt);function kt(){if(d){if(r&&typeof r.snapshotFor=="function"){let v=r.snapshotFor("detail:"+d)||[];_=v.find(p=>p&&p.id===d)||v[0]||_}He(),ge()}}function at(v){ar(v).then(f=>{f?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(v){v.preventDefault(),v.stopPropagation(),d&&at(d)}function dt(v,f){v.preventDefault(),v.stopPropagation(),at(f)}function W(v,f,p){v.preventDefault(),v.stopPropagation(),Oe.open(f,{missing_state:p})}function J(v,f){m[v]=f,ge(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",Il(d,v,f.length===0?null:f))).catch(()=>{le("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ye(v,f){let p=_||{},I=p.metadata&&typeof p.metadata=="object"?p.metadata:{},G={};for(let xe of["impl_runtime","impl_model","impl_effort"])G[xe]=Object.hasOwn(m,xe)?m[xe]:typeof I[xe]=="string"?I[xe]:"";G[v]=f;let fe=Fl(G,N(),Y()),Le={};for(let xe of["impl_runtime","impl_model","impl_effort"])Le[xe]=m[xe],m[xe]=fe[xe]||"";ge(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...fe,orchestration_runtime:Y()})).then(xe=>{let pt=Array.isArray(xe)?xe[0]:xe;if(!pt||typeof pt!="object"||!pt.id)throw new Error("implementation target readback failed");_=pt;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete m[Jt];ge()}).catch(()=>{for(let xe of["impl_runtime","impl_model","impl_effort"])Le[xe]===void 0?delete m[xe]:m[xe]=Le[xe];ge(),le("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function me(v,f,p){if(!s||!d)return!1;try{let I=await Promise.resolve(s(v,f)),G=Array.isArray(I)?I[0]:I;return G&&typeof G=="object"&&G.id?(_=G,!0):(le(p,"error"),!1)}catch{return le(p,"error"),!1}}function de(v){setTimeout(()=>{try{let f=e.querySelector(v);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function Ne(){q=!0,U=_&&_.title||"",ge(),de('.detail-edit__input[data-edit="title"]')}function et(v){U=v.target.value}function Ve(){q=!1,U="",ge()}function De(){me("edit-text",{id:d,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(q=!1,U=""),ge()})}function Qe(){A=!0,te=_&&_.description||"",ge(),de('.detail-edit__textarea[data-edit="description"]')}function Ee(v){te=v.target.value}function ut(){A=!1,te="",ge()}function Et(){me("edit-text",{id:d,field:"description",value:te},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(A=!1,te=""),ge()})}function Lt(v,f,p,I){if(v.key==="Escape"){v.stopPropagation(),p();return}v.key==="Enter"&&(!I||v.ctrlKey||v.metaKey)&&(v.preventDefault(),f())}function Ft(v){let f=v.target.value;me("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function xr(v){let f=Number(v.target.value);me("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ge())}function bt(v){x=v.target.value}function ht(){let v=x.trim();v.length!==0&&me("label-add",{id:d,label:v},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(x=""),ge()})}function nr(v){if(v.key==="Escape"){v.stopPropagation(),x="",ge();return}v.key==="Enter"&&(v.preventDefault(),ht())}function sr(v){me("label-remove",{id:d,label:v},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ge())}let qt={onCopyPath:dt,onOpenDoc:W};function Bt(v){return typeof v=="string"?v:v&&typeof v=="object"?String(v.id||v.to||v.issue_id||v.depends_on||""):""}function yt(v){switch(v&&typeof v=="object"?String(v.dependency_type||v.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Qt(v){let p=(Array.isArray(v.dependencies)?v.dependencies:[]).map(I=>({id:Bt(I),icon:yt(I)})).filter(I=>I.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${p.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${p.map(I=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:i`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function u(v){let f=v.metadata||{},p=v.workflow||{},I=p.stages||{},G=I.spec&&I.spec.stale,fe=I.impl&&I.impl.stale,Le=I.plan||null,xe=p.route_source==="derived",pt=p.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${xe?" detail-kv__v--derived":""}"
          title=${xe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${xe?"unset":pt}</span
        >
      </div>
      ${p.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${G?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Le?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Le?.approval_receipt||"\uC5C6\uC74C"}${Le?.approval_state==="stale"?" \xB7 stale":Le?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${p.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${p.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${p.planned_execution.kind}</span>
            </div>
            ${p.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${p.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${p.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${p.exec_receipt.kind}:${p.exec_receipt.actor}@${p.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${p.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${p.impl_entry.actor}@${p.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let y={route:["quick_fix","spec_backed","full_plan"]};async function F(v,f){let p=f.target.value;if(v==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&p!=="full_plan"&&!window.confirm(`full_plan \u2192 ${p||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ge();return}await me("update-workflow-meta",{id:d,key:v,value:p},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ge()}function ie(v){let f=v.metadata||{};return i` ${((I,G)=>{let fe=y[I],Le=typeof f[I]=="string"?f[I]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${xe=>F(I,xe)}
        >
          <option value="" ?selected=${!fe.includes(Le)}>
            ${G}
          </option>
          ${fe.map(xe=>i`<option value=${xe} ?selected=${Le===xe}>${xe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function j(v,f){return q?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${et}
            @keydown=${p=>Lt(p,De,Ve,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${De}
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
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${v}</h2>
        ${vt(f).map(p=>i`<span class="detail-usage-total" title=${p.tooltip}
              >${p.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ne}
        >
          ✎
        </button>
      </div>
    `}function h(v){let f=ft(v.created_at),p=ft(v.updated_at);return!f&&!p?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${p?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${p}</span>
          </div>`:""}
    `}function O(v,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ft}
        >
          ${If.map(p=>i`<option value=${p} ?selected=${p===v}>${p}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${xr}
        >
          ${Lf.map(p=>i`<option value=${String(p)} ?selected=${p===f}>
                P${p}
              </option>`)}
        </select>
      </div>
    `}function ne(v){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${A?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Qe}
            >
              ✎
            </button>`}
      </div>
      ${A?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${te}
              @input=${Ee}
              @keydown=${f=>Lt(f,Et,ut,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Et}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ut}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${v||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Te(v){let f=typeof v.notes=="string"?v.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function Je(v){let f=Array.isArray(v.labels)?v.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(p=>i`<span class="detail-label-chip"
              >${p}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${p}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+p}
                @click=${()=>sr(p)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${x}
            @input=${bt}
            @keydown=${nr}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ht}
          >
            추가
          </button>
        </span>
      </div>
    `}function je(){if(!d)return i``;let v=_||{},f=String(v.id||d),p=v.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=ae(),G=v.status||"open",fe=typeof v.priority=="number"?Math.max(0,Math.min(4,v.priority)):"",Le=v.description||"",xe={...v,metadata:{...v.metadata||{},...m}};return i`
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
            @click=${st}
          >
            ${f}
          </button>
          ${j(p,I)}
          ${Pl(xe)}
          ${Ol({metadata:xe.metadata,workspace_values:Z(),catalog:N(),expanded:k,presets:Pe()?.presets||[],preset_id:b,preset_busy:E},{onToggle:()=>{k=!k,ge()},onEdit:(pt,Jt)=>{if(pt==="impl_runtime"||pt==="impl_model"||pt==="impl_effort"){ye(pt,Jt??"");return}J(pt,Jt??"")},onPresetSelect:pt=>{b=pt,ge()},onPresetApply:()=>{Ce()}})}
          ${O(G,fe)} ${h(v)}
          ${ne(Le)}
          ${vl(S,Ae,{expanded:Fe,draft:ce,sending:se,error:he})}
          ${Te(v)} ${Je(v)} ${Qt(v)}
          ${u(v)} ${ie(v)}
          ${bl(v,qt)}
          ${Hl({expanded:V,loading:we,error:R,data:T},{onToggle:Q})}
          ${zl(re(),ee,{total:I,expanded:_e})}
        </div>
      </div>
    `}function ge(){Ue(je(),e)}return{load(v){v!==d&&(m={},b="",k=!1,w(),We(),z()),d=v,_=null,kt(),$()},clear(){d=null,_=null,m={},b="",E=!1,w(),We(),z(),Oe.close(),X.close(),Ue(i``,e)},destroy(){Ke&&(Ke(),Ke=null),mt&&(mt(),mt=null),gt&&(gt(),gt=null),document.removeEventListener("keydown",lt),Oe.destroy(),ke.parentNode&&ke.parentNode.removeChild(ke),X.destroy(),pe.parentNode&&pe.parentNode.removeChild(pe),d=null,_=null,b="",E=!1,We(),z(),Ue(i``,e)}}}function Vl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:c,close:l,getElement(){return t}}}function Is(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ls(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function Yl(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,l=o.finished_at;typeof a!="number"||typeof l!="number"||!Number.isFinite(a)||!Number.isFinite(l)||l<a||(r+=l-a,n=!0)}return n?r:null}function Os(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Of(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let l of r)l.kind!=="deploy"||l.state!=="succeeded"||typeof l.target_sha!="string"||(!s||(typeof l.finished_at=="number"?l.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=l);let o=r.filter(l=>l.state==="failed"&&!l.dismissed&&!l.superseded_by).length+n.length,a=r.some(l=>l.state==="repairing");return{deploy:s?{sha:Is(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Kl(e,t){let r=Of(e,t);return r?i`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?i`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?ft(r.deploy.at):""}
            >${Os(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Ls(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Xr(e){let t=It(e.created_at),r=It(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${ft(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Pf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function xn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ps(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function rr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,b)=>(m.requested_at||0)-(b.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,l=typeof s?.last_error=="string"?s.last_error:null,c=s?Pf(s.phase):null,d=s?.kind==="stale_work_backup_fresh",_=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!l),label:d?l?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":l?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(l?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${l} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${l} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:l,confirmation:_}}function _r(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?i`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?i`<code>백업: ${n}</code>`:t.error?i`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?i`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?i`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Mf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Zl(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function l(d){return Number.isInteger(a[d])?Number(a[d]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Mf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${l("branch_ahead")}`:[`staged ${l("staged_count")}`,`unstaged ${l("unstaged_count")}`,`untracked ${l("untracked_count")}`,`branch ahead ${l("branch_ahead")}`,`HEAD ahead ${l("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Bo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=vt(e.usage),s=Ht(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,l=e.lane==="done"&&!a,c=l?It(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",b=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=i`<span class="worker-mini__title">${e.title}</span>`,D=e.pr_url&&e.pr_number?i`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",q=e.completion_repair_pr_url&&e.completion_repair_pr_number?i`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",A=r.map(Ge=>Ge===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${Ge}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${Ge===e.completion_badge&&e.completion_title||""}
          >${Ge}</span
        >`),U=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",te=n.length>0?n.map(Ge=>i`<span class="worker-usage" title=${Ge.tooltip}
              >${Ge.label}</span
            >`):s?i`<span class="worker-usage" title=${Vr(e.usage)}
            >${s}</span
          >`:"",x=o?i`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?i`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",w=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",S=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",H=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",K=e.discard,he=K?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${K?.attempt_id||""}
          data-operation-id=${K?.operation?.operation_id||""}
          data-discard-mode=${K?.confirmation||"unmerged"}
          ?disabled=${K?!K.enabled:e.discard_enabled===!1}
          title=${K?K.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${K?.label||"\uD3D0\uAE30"}
        </button>`:"",ce=e.stale_work||null,se=ce?i`${ce.can_resume||ce.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ce.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ce.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ce.action_id}
            ?disabled=${ce.locked}
          >
            다시 확인
          </button>`:""}`:"",ue=ce?i`<div class="worker-mini__stale">
        <strong>${ce.title}</strong>
        <span>${ce.summary}</span>
        <span>${ce.cause}</span>
        ${ce.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Fe=e.revise_action?i`<button
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
        </button>`:"",We=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||K?.operation||e.revise_action||ce);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${l?i`<div class="worker-mini__row1">${b}${E}${k}</div>
          <div class="worker-mini__row2">
            ${te}${c?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ft(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?i`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ls(e.work_ms)}</span
                >`:""}${A}${x}
            <span class="worker-mini__actions"
              >${w}${S}${H}${he}</span
            >
            ${Xr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${b}${E}${D}${q}${A}${m}${U}
            </div>
            <div class="worker-mini__body">${k}${ue}</div>
            ${We?i`<div class="worker-mini__foot">
                  ${te}${x}
                  <span class="worker-mini__actions"
                    >${w}${S}${H}${he}${Fe}${se}</span
                  >
                  ${_r(e)}
                </div>`:""}
            ${Xr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${b}${E}${k}${D}${q}${A}${m}${U}${te}${x}${w}${S}${H}${he}
            </div>
            ${_r(e)} ${Xr(e)}`}
  </div>`}function Df(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),l=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?i`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?i`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?i`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?ts(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${l?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Xr(e)}
  </div>`}function Kt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?i`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return i`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?i`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:i`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":i`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?i`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Df(n):Bo(n))}
          </div>`}
  </section>`}var Xl=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],Sn=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Ms(e,t){let r=Xl.find(s=>s.step===e);if(!r)return null;let n=Xl.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function Ql(e){let t=Sn.findIndex(r=>r.step===e);return Sn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Nr(e){let t=Sn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Nf(e){let t=Sn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:Sn.length}}function Ds(e){let t=Nf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var Uo=new Set(["queued","running","retry_pending","repairing"]),Jl=new Set(["failed","succeeded"]),Ff={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},An={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},qf={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:An.base_containment,child_sweep:An.child_sweep,branch_cleanup:An.branch_cleanup,parent_close:An.parent_close};function Bf(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function jf(e,t,r){return!["verify","deploy"].includes(e.kind)||![...Uo,...Jl].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Uf(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=d=>d.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let l=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return l.localeCompare(c)}function jo(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Ff[s];if(!o)return null;let a=Ms(r,`${n} ${o}`);return a?{...a,active:Uo.has(s),failed:s==="failed"}:null}function Wf(e){return!e||typeof e!="object"?null:qf[e.step]||null}function En(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Wf(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),l=Bf(e.merge_sha)?e.merge_sha:null,c=!o&&l&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&jf(k,t,l)).sort(Uf):[],d=a?c:[],_=d.find(k=>Uo.has(k.state));if(_)return jo(_);if(s)return s.step==="repo_operations"&&c[0]?jo(c[0],!0):null;let m=d.find(k=>Jl.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(m)return jo(m);if(n){let k=Ms(n.step,n.label);return k?{...k,active:!0,failed:!1}:null}let b=typeof e.cleanup_cursor=="string"?An[e.cleanup_cursor]:null;if(!b)return null;let E=Ms(b.step,b.label);return E?{...E,active:!0,failed:!1}:null}function Ns(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var ec={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},tc={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function rc(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Wo(e){for(let t of rc(e))if(Object.hasOwn(ec,t))return ec[t];return null}function zo(e){let t=null;for(let r of rc(e))Object.hasOwn(tc,r)&&(t=tc[r]);return t}function Fs(e){let t=Wo(e),r=zo(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function nc(e,t){let r=Wo(e)??Wo(t),n=zo(t)??zo(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var sc=160;function zf(e){return e.length>sc?`${e.slice(0,sc)}\u2026`:e}function Hf(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${zf(e.command)}</code>`:""}
  </div>`}function Gf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function Ho(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function oc(e){let t=e.failure?Fs(e.failure.reason):"";return i`<div class="worker-banners">
    ${e.failure?i`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?i`<button
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
          ${e.failure.resume_attempt_id?i`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Hf(e.failure.cause_detail)}
          ${Gf(e.failure.reason)}
          ${_r({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Vf(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ho(t-e.started_at):"\u2014",a=tr(e),l=hr(e),c=vt(e.usage),d=Ht(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,b=e.landing,E=e.attempt_id&&e.attempt_id===r,k=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${E?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${l?i`<span class="rtile__resumed" title=${l}>↻</span>`:""}
      <span class="rtile__elapsed">${o}</span>
      ${n?i`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${k}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
              aria-label="실패 기록 닫기"
            >
              ✕
            </button>`:i`<button
              type="button"
              class="rtile__session"
              title="라이브 세션 열기"
              aria-label="라이브 세션 열기"
            >
              ▤ 세션
            </button>
            ${s?i`<button
                  type="button"
                  class="rtile__resume"
                  title="같은 세션으로 이어서 재개"
                  aria-label="재개"
                >
                  ▶
                </button>`:i`<button
                  type="button"
                  class="rtile__pause"
                  ?disabled=${e.can_pause===!1}
                  title=${e.can_pause===!1?"\uC138\uC158 ID \uAE30\uB85D \uC804 \u2014 \uC77C\uC2DC\uC815\uC9C0 \uBD88\uAC00":"\uC77C\uC2DC\uC815\uC9C0 (\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC7AC\uAC1C \uAC00\uB2A5)"}
                  aria-label="일시정지"
                >
                  ⏸
                </button>`}
            ${k}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${b?i`<div class="rtile__landing">
          <span
            class="merge-step${b.failed?" merge-step--failed":""}"
            style=${`--progress: ${b.percent}%`}
            >${b.label}${b.index>0?i`<span class="merge-step__n"
                  >${b.index}/${b.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${a||c.length>0||d||_||m?i`<div class="rtile__meta">
          ${_?i`<span class="worker-mini__badge">${_}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${c.length>0?c.map(D=>i`<span class="worker-usage" title=${D.tooltip}
                    >${D.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${Vr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Xr(e)} ${_r(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Go(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Vf(s,t,r))}
  </div>`}function Fr(e){return i`<svg
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
  </svg>`}function Vo(){return Fr(mr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Yo(){return Fr(mr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function ac(){return Fr(mr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function ic(){return Fr(mr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function lc(){return Fr(mr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function cc(){return Fr(mr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function dc(){return Fr(mr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Tn=1,Yf=6e4,Kf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Zf=new Set(["auto_merge","merged","merge","done"]),uc={running:3,paused:2,failed:1};function Xf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Qf(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),b=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!b&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let c=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=uc[d.run_state],b=uc[l];if(m>b||m===b&&(d.started_at??0)>(c??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:c,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Mt(e,a.bead_id),can_pause:l==="running"&&_,can_resume:l!=="running"&&_&&!n.has(a.attempt_id)})}return o}function pc(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Ko(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let A of s)A&&typeof A.root_dir=="string"&&a.set(A.root_dir,A);let l=[],c=[],d=[],_=[],m=[],b=new Map;for(let A of n){if(!A||typeof A.root_dir!="string")continue;let U=A.root_dir,te=A.name||U,x=a.get(U),w=x&&typeof x.revision=="number"?x.revision:typeof A.revision=="number"?A.revision:0,S=Ct(A.attempts),H=Ct(A.bead_titles),K=Ct(A.pr_observations),he=Ct(A.admission),ce=Ct(A.revise_parked),se=Ct(A.merge_queue_state),ue=Ct(A.cleanup_failed),Fe=Ct(A.discard_operations),We=Ct(A.pr_activity),Ge=Array.isArray(A.repo_operations)?A.repo_operations:[],He=Array.isArray(A.merge_queue)?A.merge_queue:[],Ze=new Set(He.filter(X=>X&&typeof X.bead_id=="string").map(X=>X.bead_id)),Re=new Map(He.filter(X=>X&&typeof X.bead_id=="string").map(X=>[X.bead_id,X])),ve=Array.isArray(A.queue)?A.queue:[],Ae=Array.isArray(A.done)?A.done:[],ke=new Map;for(let X of Ae)X&&typeof X.bead_id=="string"&&typeof X.added_at=="number"&&ke.set(X.bead_id,X.added_at);let Oe=X=>({id:X,title:H[X]||X,root_dir:U,workspace_name:te,expected_revision:w,draggable:!1}),pe=new Set;for(let[X,V]of Qf(S,ke))pe.add(X),c.push({...Oe(X),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,runner:V.runner,model:V.model,effort:V.effort,speed:V.speed,resumed_from:V.resumed_from,continuation_mode:V.continuation_mode,usage:V.usage,discard:rr(Fe,X,{attempt_id:V.attempt_id}),badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let X of Array.isArray(A.pr_wait)?A.pr_wait:[]){let V=X&&X.bead_id;if(typeof V!="string"||pe.has(V))continue;pe.add(V);let we=Ct(K[V]),R=Ct(we.pr),T=we.gate?Ct(we.gate):null,be=Ze.has(V),Se=Re.get(V)?.continuation_action||null,P=!!Se&&Se.continuation===null,z=se.active===V,L=X.external===!0,Q=ue[V]||null,re=Ct(We[V]),ae=En({bead_id:V,merge_sha:X.merge_sha,cleanup_cursor:X.cleanup_cursor,merge_progress:re.merge_progress||null,cleanup_failed:Q,repo_operations:Ge}),_e=Ns(ae),$e=!!T&&T.base_badge==="\uCDA9\uB3CC",C=!!Q&&["child_sweep","branch_cleanup","parent_close"].includes(Q.step)&&!!T&&T.tier==="merged",B=L&&!!Q&&!!T&&T.tier==="merged",ee=!!T&&["closed_unmerged","review","undecidable"].includes(T.tier),Z=rr(Fe,V,{external:L,merge_active:z||ae?.step==="merge",merge_queued:be,cleanup_active:_e,merged:!!Q||T?.tier==="merged"}),$=!!Z.operation;d.push({...Oe(V),lane:"pr_wait",pr_number:typeof R.number=="number"?R.number:null,pr_url:typeof R.url=="string"?R.url:void 0,external:L,usage:Mt(S,V),merge_step:ae,badges:P?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:ae?[T?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:Q?[Nr(Q.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Nr(Q.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof T?.gate_badge=="string"&&T.gate_badge.length>0?[T.gate_badge]:[],alert:ae?ae.failed===!0:!!Q||ee,reason:Q&&ae?.active!==!0?Ds(Q.step):"PR \uB300\uAE30",merge_action:T?.tier==="merged"&&!C&&!B?!1:!be||P,merge_enabled:!$&&(P||T?.enabled===!0||$e||C||B),merge_label:P?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":B||C?"\uC815\uB9AC \uC7AC\uAC1C":$e&&!C?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":$?Z.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Z.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Z.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:B?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":C?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":$e?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":T?.enabled===!0?`\uBA38\uC9C0 (${T.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${T?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!P,cancel_enabled:!z,continuation_mismatch:Se?.mismatch||null,discard:Z,discard_action:Z.action,discard_enabled:Z.enabled,discard_title:Z.title})}for(let X=0;X<ve.length;X++){let V=ve[X],we=V&&V.bead_id;if(typeof we!="string"||pe.has(we))continue;pe.add(we);let R=ce[we],T=rr(Fe,we),be=T.operation?T:null,Se={...Oe(we),lane:"queue",draggable:!be,discard:be||void 0,reason:pc(he,we),queue_position:X+1,queue_index:X,queue_length:ve.length,badges:R?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!R,revise_action:!!R,revise_enabled:!!R&&!be,revise_title:R?R.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${R.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(Se);let P=b.get(U);P?P.push(Se):b.set(U,[Se])}for(let X of Array.isArray(A.runnable)?A.runnable:[]){let V=X&&X.bead_id;typeof V!="string"||pe.has(V)||(pe.add(V),l.push({...Oe(V),title:X.title||H[V]||V,lane:"runnable",draggable:!0,reason:pc(he,V),created_at:X.created_at??void 0,updated_at:X.updated_at??void 0,labels:Array.isArray(X.labels)?X.labels:[],spec_reviewer:typeof X.spec_reviewer=="string"?X.spec_reviewer:void 0,plan_state:X.plan_state==="approved"||X.plan_state==="authored"?X.plan_state:"none",workflow:X.route?{route:X.route,chips:{route:X.route}}:null,place_index:ve.length}))}for(let X of Ae){let V=X&&X.bead_id;if(typeof V!="string"||pe.has(V)||(pe.add(V),o!==void 0&&typeof X.added_at=="number"&&X.added_at<o))continue;let we=Xf(S,V);m.push({...Oe(V),lane:"done",done:!0,usage:Mt(S,V),done_at:typeof X.added_at=="number"?X.added_at:void 0,done_kind:we&&typeof we.done_kind=="string"?we.done_kind:null})}}let E=new Map;s.forEach((A,U)=>{A&&typeof A.root_dir=="string"&&E.set(A.root_dir,U)});let k=r&&r.running_sort==="repo"?"repo":"started";c.sort((A,U)=>{if(k==="repo"){let w=E.get(A.root_dir)??Number.MAX_SAFE_INTEGER,S=E.get(U.root_dir)??Number.MAX_SAFE_INTEGER;if(w!==S)return w-S}let te=typeof A.started_at=="number"&&Number.isFinite(A.started_at)?A.started_at:null,x=typeof U.started_at=="number"&&Number.isFinite(U.started_at)?U.started_at:null;return te!==null&&x!==null&&te!==x?te-x:te===null&&x!==null?1:te!==null&&x===null?-1:A.id.localeCompare(U.id)}),m.sort((A,U)=>(U.done_at??0)-(A.done_at??0));let D=s.length>0?s:n.map(A=>({root_dir:A&&A.root_dir,name:A&&A.name,auto_advance:A&&A.auto_advance,auto_merge:A&&A.auto_merge,slots:A&&A.slots,revision:A&&A.revision,runner_catalog:A&&A.runner_catalog})),q=[];for(let A of D)!A||typeof A.root_dir!="string"||q.push({root_dir:A.root_dir,name:A.name||A.root_dir,auto_advance:A.auto_advance===!0,auto_merge:A.auto_merge===!0,slots:typeof A.slots=="number"&&A.slots>=Tn?A.slots:Tn,revision:typeof A.revision=="number"?A.revision:0,runner_catalog:Ct(A.runner_catalog),items:b.get(A.root_dir)||[]});return{runnable:l,queue:_,queue_groups:q,running:c,pr_wait:d,done:m,automation:{total:q.length,both_on:q.filter(A=>A.auto_advance&&A.auto_merge).length}}}function Jf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Yf;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ft(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${It(e,t)}</span
        >`}</span
  >`}function Cn(e){return i`<div class="mon-c__title">${e.title}</div>`}function Rn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function qs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Zo(e){let t=vt(e.usage),r=Ht(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${Vr(e.usage)}
        >${r}</span
      >`:""}function Xo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function e_(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Yo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Vo()}
        </button>`}
    ${e.discard?.action?i`<button
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
    ${e.run_state==="failed"?i`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${ic()}
        </button>`:""}
  </span>`}function t_(e,t){let r=typeof e.started_at=="number"?Ho(t-e.started_at):"";return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Xo(e)}${Jf(e.last_event_at,t)}${Rn(e)}${qs(e)}
      ${tr(e)?i`<span class="mon-c__model">${tr(e)}</span>`:""}
      ${hr(e)?i`<span
            class="rtile__resumed"
            title=${hr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Zo(e)}${e_(e)}${_r(e)}
    </div>`}function r_(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),l=It(e.updated_at);return i`${Cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Rn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${es(e.labels,null).map(c=>i`<span class="ctl-chip ctl-chip--label">${c}</span>`)}
      ${qs(e)}
      ${l?i`<span title=${`\uC218\uC815 ${ft(e.updated_at)}`}
            >수정 ${l}</span
          >`:""}
      ${e.reason?i`<span
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
    </div>`}function n_(e){let t=!!e.discard?.operation;return i`${Cn(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Rn(e)}
      ${Xo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?i`<button
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
    ${_r(e)}
    ${e.revise_action?i`<div class="mon-c__tail">
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
        </div>`:""}`}function s_(e){let t=e.merge_step||null,r=!!(Ht(e.usage)||t||e.merge_action||e.cancel_action||e.discard_action);return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Rn(e)}${qs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Xo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${r?i`<div class="mon-c__tail">
          ${Zo(e)}${t?i`<span
                class="merge-step${t.failed?" merge-step--failed":""}"
                style=${`--progress: ${t.percent}%`}
                >${t.label}${t.index>0?i`<span class="merge-step__n"
                      >${t.index}/${t.total}</span
                    >`:""}</span
              >`:""}
          ${e.merge_action?i`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?i`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?i`<button
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
          ${_r(e)}
        </div>`:""}`}function o_(e,t){let r=e.done_kind||"",n=r?Kf[r]||r:"",s=It(e.done_at,t);return i`${Cn(e)}
    <div class="mon-c__meta">
      ${Rn(e)}${qs(e)}
      ${n?i`<span
            class="mon-live__kind${Zf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Zo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${ft(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function fc(e,t){return e.lane==="running"?t_(e,t):e.lane==="runnable"?r_(e):e.lane==="queue"?n_(e):e.lane==="pr_wait"?s_(e):o_(e,t)}function _c(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Yo():Vo()}
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
        ${lc()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${cc()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Tn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function mc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=er.find(l=>l.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?ac():dc()}
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
        ${er.map(l=>i`<option
              value=${l.value}
              ?selected=${e.done_range===l.value}
            >
              ${l.label}
            </option>`)}
      </select>
      ${a.map(l=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${l.tooltip}
            >${o} 완료 · 누적 ${l.label}</span
          >`)}
    </div>
  </div>`}function gc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function bc(e){let t=(Array.isArray(e)?e:[]).map(l=>l&&l.usage).filter(l=>l&&typeof l=="object"&&"providers"in l);if(t.length>0)return vt(os(t));let r={};for(let l of lr)r[l]=0;let n=!1,s=0,o=0,a=0;for(let l of Array.isArray(e)?e:[]){let c=l&&l.usage;if(c&&typeof c=="object"){let d=!1;for(let _ of lr){let m=c[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=c.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ht(r):null}var yc="bdui.monitor.done-range",vc="bdui.monitor.running_sort";function a_(){try{let e=window.localStorage.getItem(yc);return Pt(e)?e:Rt}catch{return Rt}}function i_(e){try{window.localStorage.setItem(yc,e)}catch{}}function l_(){try{return window.localStorage.getItem(vc)==="repo"?"repo":"started"}catch{return"started"}}function c_(e){try{window.localStorage.setItem(vc,e)}catch{}}var wc="tab:monitor:pipeline",d_=1e3,u_=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function hc(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${fc(e,t)}
  </div>`}function kc(e,t){let r=ot("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,l=t.switchWorkspace,c=t.now||(()=>Date.now()),d=t.confirm||(P=>typeof globalThis.confirm!="function"||globalThis.confirm(P)),_=a_(),m=l_();function b(){let P=er.find(z=>z.value===_);return P?P.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let k=Ko(null,null),D=new Map,q=null,A=null;async function U(P,z,L,Q,re=!0){if(!o||!L)return null;let ae=await o(P,{...z,root_dir:L,expected_revision:Q});if(ae&&ae.conflict&&re){ae.queue&&D.set(L,ae.queue);let _e=ae.queue&&typeof ae.queue.revision=="number"?ae.queue.revision:Q;ae=await o(P,{...z,root_dir:L,expected_revision:_e})}return ae&&ae.queue&&L&&D.set(L,ae.queue),ae}function te(P,z){let L=D.get(P),Q=s&&s.get?s.get():null,re=(Array.isArray(Q)?Q:[]).find(_e=>_e?.root_dir===P);return(L||re)?.merge_queue?.find(_e=>_e.bead_id===z)?.continuation_action}async function x(P,z,L,Q){let re=await U(P,z,L,Q),ae=D.get(L)?.revision??re?.queue?.revision??Q;return ir(re,(_e,$e)=>U(P,{...z,continuation:_e,decision_token:$e},L,ae,!1),{refresh:_e=>U(P,z,L,_e?.queue?.revision??D.get(L)?.revision??ae,!1)})}async function w(P,z,L,Q){let re=await ir({continuation_mismatch:Q},(_e,$e)=>U("worker-merge-queue-add",{bead_id:z,continuation:_e,decision_token:$e},P,L,!1)),ae=re?.queue?.merge_queue?.find(_e=>_e.bead_id===z)?.continuation_action;re?.applied!==!0&&ae?.continuation===null&&ae.mismatch&&await w(P,z,re.queue.revision,ae.mismatch)}async function S(P,z,L){let Q=await U("worker-discard",P,z,L);if(Q&&Q.discarded===!0){le(Ps(Q),"success",5e3);return}if(Q&&Q.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${Q.reason}`,"error");return}if(Q&&Q.accepted&&Q.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(Q&&Q.accepted){le(`\uD3D0\uAE30 \uC9C4\uD589: ${Q.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}Q&&!Q.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function H(P,z,L){return!o||!L?null:await o(P,{...z,root_dir:L})}async function K(P){if(!o||!P&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let z=await o("monitor-auto-toggle",{on:P}),L=z&&Array.isArray(z.failed)?z.failed:[];L.length>0&&le(`\uC790\uB3D9\uD654 ${P?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${L.map(Q=>Q.root_dir).join(", ")}`,"error",3200)}async function he(){let P=new Map;for(let z of k.pr_wait)P.has(z.root_dir)||P.set(z.root_dir,z.expected_revision);for(let[z,L]of P)await U("worker-merge-queue-add-all",{},z,L)}let ce=null,se=!1,ue=null;function Fe(){ue!==null&&clearTimeout(ue),ue=setTimeout(()=>{ue=null,se=!1},0)}function We(P){let z=P.target;return typeof z?.closest=="function"?z.closest(".mon-group"):null}function Ge(P){let z=We(P);return!z||!ce?null:(z.getAttribute("data-root-dir")||"")===ce.root_dir?z:null}function He(){for(let P of Array.from(E.querySelectorAll(".mon-group--drag-over")))P.classList.remove("mon-group--drag-over")}function Ze(P){let z=P.target,L=typeof z?.closest=="function"?z.closest('.mon-card[draggable="true"]'):null;if(L){ce={bead_id:L.getAttribute("data-issue-id")||"",lane:L.getAttribute("data-lane")||"",root_dir:L.getAttribute("data-root-dir")||"",revision:Number(L.getAttribute("data-revision")||0)||0,queue_index:Number(L.getAttribute("data-queue-index")),queue_length:Number(L.getAttribute("data-queue-length")),place_index:Number(L.getAttribute("data-place-index"))},se=!0;try{P.dataTransfer?.setData("text/plain",ce.bead_id),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}}function Re(P){let z=Ge(P);z&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),z.classList.add("mon-group--drag-over"))}function ve(P){We(P)?.classList.remove("mon-group--drag-over")}function Ae(){ce=null,He(),Fe()}function ke(P){let z=Ge(P),L=ce;if(ce=null,He(),!z||!L||!L.bead_id)return;P.preventDefault();let Q=P.target,re=typeof Q?.closest=="function"?Q.closest('.mon-card[data-lane="queue"]'):null,ae=re&&z.contains(re)?Number(re.getAttribute("data-queue-index")):NaN;if(L.lane==="runnable"){let C=Number.isFinite(ae)?ae:L.place_index;if(!Number.isFinite(C))return;U("worker-queue-place",{bead_id:L.bead_id,index:C},L.root_dir,L.revision);return}if(L.lane!=="queue"||re&&re.getAttribute("data-issue-id")===L.bead_id)return;let _e=L.queue_index,$e=Number.isFinite(ae)?_e>ae?ae:ae-1:L.queue_length-1;!Number.isFinite($e)||$e<0||$e===_e||U("worker-queue-reorder",{bead_id:L.bead_id,to_index:$e},L.root_dir,L.revision)}function Oe(P){let z={runnable:k.runnable,queue:k.queue,running:k.running,pr_wait:k.pr_wait,done:k.done};return i`${mc({automation:k.automation,counts:{running:k.running.length,queue:k.queue.length,pr_wait:k.pr_wait.length},running_sort:m,done_range:_,token_total:bc(k.done),token_tooltip:gc(b())})}
      <div class="worker-lanes mon-lanes">
        ${u_.map(L=>{let Q=z[L.lane],re=L.lane==="queue"?k.queue_groups.length>0?i`${k.queue_groups.map(ae=>i`<div
                        class="mon-group"
                        data-root-dir=${ae.root_dir}
                      >
                        ${_c(ae)}
                        <div class="mon-group__list">
                          ${ae.items.map(_e=>hc(_e,P))}
                        </div>
                      </div>`)}`:void 0:Q.length>0?i`${Q.map(ae=>hc(ae,P))}`:void 0;return Kt({id:`monitor-${L.lane}`,lane:L.pane,title:L.lane==="done"?`\uC644\uB8CC\xB7${b()}`:L.title,items:Q,empty:L.empty,body:re,live:L.lane==="running"&&Q.length>0,header_control:L.lane==="pr_wait"&&Q.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function pe(){let P=s&&s.get?s.get():null,z=s&&s.getWorkspacesState?s.getWorkspacesState():[],L=c();k=Ko(P,z,{done_since:Rr(_,L),running_sort:m}),Ue(Oe(L),E)}function X(P,z){let L=a?a():void 0;if(!z||!L||z===L||!l){n(P);return}l(z).then(()=>{n(P)}).catch(Q=>{r("workspace switch for %s failed: %o",z,Q)})}function V(P){return{root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0}}function we(P,z){let{root_dir:L,revision:Q}=V(P),re=P.getAttribute("data-issue-id")||"",ae=z.dataset.attemptId||P.getAttribute("data-attempt-id")||"",_e=z.classList;if(_e.contains("worker-card__place")){U("worker-queue-place",{bead_id:re,index:Number(P.getAttribute("data-place-index")||0)||0},L,Q);return}if(_e.contains("mon-op--up")||_e.contains("mon-op--down")){let $e=Number(P.getAttribute("data-queue-index")||0)||0,C=_e.contains("mon-op--up")?$e-1:$e+1;if(C<0)return;U("worker-queue-reorder",{bead_id:re,to_index:C},L,Q);return}if(_e.contains("mon-op--remove")){U("worker-queue-remove",{bead_id:re},L,Q);return}if(_e.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:ae},L);return}if(_e.contains("mon-op--discard")){if(!d(xn(re,"unmerged")))return;S({bead_id:re,...ae?{attempt_id:ae}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},L,Q);return}if(_e.contains("mon-op--resume")){x("worker-attempt-resume",{attempt_id:ae},L,Q);return}if(_e.contains("mon-op--dismiss")){U("worker-attempt-dismiss",{attempt_id:ae},L,Q);return}if(_e.contains("worker-mini__merge")){let $e=te(L,re);$e?.mismatch&&$e.continuation===null?w(L,re,Q,$e.mismatch):U("worker-merge-queue-add",{bead_id:re},L,Q);return}if(_e.contains("worker-mini__merge-cancel")){U("worker-merge-queue-remove",{bead_id:re},L,Q);return}if(_e.contains("worker-mini__discard")){let $e=z.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(xn(re,$e)))return;S({bead_id:re,...ae?{attempt_id:ae}:{},...z.dataset.operationId?{operation_id:z.dataset.operationId}:{}},L,Q);return}if(_e.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:re},L,Q);return}_e.contains("worker-mini__revise-approve")&&U("worker-revise-approve",{bead_id:re},L,Q)}function R(P){let z=se;se=!1;let L=P.target;if(!L||typeof L.closest!="function"||L.closest("dialog")||L.closest("a"))return;let Q=L.closest(".mon-running-sort");if(Q){P.preventDefault(),m=Q.getAttribute("data-sort")==="repo"?"repo":"started",c_(m),pe();return}let re=L.closest(".mon-auto-all");if(re){P.preventDefault(),K(re.getAttribute("data-on")==="true");return}if(L.closest(".mon-merge-all")){P.preventDefault(),he();return}let _e=L.closest(".mon-ctl--advance");if(_e){P.preventDefault();let{root_dir:Z,revision:$}=V(_e);U("worker-automation-toggle",{on:_e.getAttribute("data-on")==="true"},Z,$);return}let $e=L.closest(".mon-ctl--merge-auto");if($e){P.preventDefault();let{root_dir:Z,revision:$}=V($e);U("worker-merge-auto-toggle",{on:$e.getAttribute("data-on")==="true"},Z,$);return}let C=L.closest(".mon-card");if(!C)return;let B=L.closest("button");if(B){P.preventDefault(),we(C,B);return}let ee=C.getAttribute("data-issue-id");ee&&!z&&(P.preventDefault(),X(ee,C.getAttribute("data-root-dir")||""))}function T(P){let z=P.target;if(!z||typeof z.closest!="function")return;let L=z.closest(".mon-done-range");if(L){_=Pt(L.value)?L.value:Rt,i_(_),pe();return}let Q=z.closest(".mon-slots__input");if(!Q)return;let{root_dir:re,revision:ae}=V(Q),_e=Number(Q.value);if(!Number.isFinite(_e))return;let $e=Math.max(Tn,Math.floor(_e));U("worker-queue-set-slots",{slots:$e},re,ae)}e.addEventListener("click",R),e.addEventListener("change",T),e.addEventListener("dragstart",Ze),e.addEventListener("dragover",Re),e.addEventListener("dragleave",ve),e.addEventListener("drop",ke),e.addEventListener("dragend",Ae),s&&typeof s.subscribe=="function"&&(q=s.subscribe(()=>{try{D.clear(),pe()}catch{}}));function be(){A!==null&&(clearInterval(A),A=null)}function Se(){ue!==null&&(clearTimeout(ue),ue=null)}return{load(){r("load"),pe(),A===null&&(A=setInterval(()=>{try{pe()}catch{}},d_))},pause(){be()},clear(){be(),Se(),q&&(q(),q=null),e.removeEventListener("click",R),e.removeEventListener("change",T),e.removeEventListener("dragstart",Ze),e.removeEventListener("dragover",Re),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",ke),e.removeEventListener("dragend",Ae),e.replaceChildren()}}}function $c(e,t,r){let n=ot("views:nav"),s=null;function o(c){return d=>{d.preventDefault(),n("click tab %s",c),r.gotoView(c)}}function a(){let c=t.getState(),d=c.view==="worker"||c.view==="monitor"?c.view:"board";return i`
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
    `}function l(){Ue(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Ue(i``,e)}}}var xc=["bug","feature","task","epic","chore"];function Sc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Ac=["Critical","High","Medium","Low","Backlog"];function Ec(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let w=document.createElement("option");w.value="",w.textContent="\u2014 Select \u2014",o.appendChild(w);for(let S of xc){let H=document.createElement("option");H.value=S,H.textContent=Sc(S),o.appendChild(H)}a.replaceChildren();for(let S=0;S<=4;S+=1){let H=document.createElement("option");H.value=String(S);let K=Ac[S]||"Medium";H.textContent=`${S} \u2013 ${K}`,a.appendChild(H)}}E();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function D(w){s.disabled=w,o.disabled=w,a.disabled=w,l.disabled=w,c.disabled=w,_.disabled=w,m.disabled=w,m.textContent=w?"Creating\u2026":"Create"}function q(){d.textContent=""}function A(w){d.textContent=w}function U(){try{let w=window.localStorage.getItem("beads-ui.new.type");w?o.value=w:o.value="";let S=window.localStorage.getItem("beads-ui.new.priority");S&&/^\d$/.test(S)?a.value=S:a.value="2"}catch{o.value="",a.value="2"}}function te(){let w=o.value||"",S=a.value||"";w.length>0&&window.localStorage.setItem("beads-ui.new.type",w),S.length>0&&window.localStorage.setItem("beads-ui.new.priority",S)}async function x(){q();let w=String(s.value||"").trim();if(w.length===0){A("Title is required"),s.focus();return}let S=Number(a.value||"2");if(!(S>=0&&S<=4)){A("Priority must be 0..4"),a.focus();return}let H=String(o.value||""),K=String(c.value||""),he={title:w};H.length>0&&(he.type=H),String(S).length>0&&(he.priority=S),K.length>0&&(he.description=K),D(!0);try{await t("create-issue",he)}catch{D(!1),A("Failed to create issue");return}te(),D(!1),k()}return r.addEventListener("cancel",w=>{w.preventDefault(),k()}),b.addEventListener("click",()=>k()),_.addEventListener("click",()=>k()),r.addEventListener("keydown",w=>{w.key==="Enter"&&(w.ctrlKey||w.metaKey)&&(w.preventDefault(),x())}),n.addEventListener("submit",w=>{w.preventDefault(),x()}),{open(){n.reset(),q(),U();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var p_=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function f_(e,t){return lo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Tc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=f_(n,e);return i`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${n}
                data-state=${s}
                @click=${()=>r(n)}
              >
                ${n}
              </button>`})}
          </div>`}
    </section>
  `}function Cc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>i`<span class="settings-dialog__prefix">
              ${n}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${n} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>r.onRemove(n)}
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
          @input=${n=>r.onDraft(String(n.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${r.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function Rc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${p_.map(([r,n])=>i`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${r}
                .checked=${e.chips[r]!==!1}
                @change=${()=>t(r)}
              />
              <span>${n}</span>
            </label>`)}
      </div>
    </section>
  `}var __=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Zt="";function Xt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Ic(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||($=>le($,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let l="session",c=!1,d="",_={},m={},b=[],E=!1,k=null,D={},q="",A="",U=!1,te=!1,x=!1,w=null;function S(){let $=t.queueStore?.get();return Xt($)?$.runner_catalog:null}function H(){let $=t.implPresetStore?.get();return Xt($)&&Array.isArray($.presets)?$:null}async function K(){E=!0,re();try{let $=await r("get-session-defaults",{});_=Xt($?.values)?{...$.values}:{},m={..._},b=Array.isArray($?.warnings)?$.warnings:[]}catch($){b=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${$ instanceof Error?$.message:String($)}`)}finally{E=!1,re()}}async function he(){let $=Al(_,m);if(Object.keys($).length!==0){try{let N=await r("set-session-defaults",{values:$});_=Xt(N?.values)?{...N.values}:{},m={..._},b=Array.isArray(N?.warnings)?N.warnings:[]}catch(N){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}re()}}function ce($,N){N===Zt?delete m[$]:m[$]=N,re(),he()}async function se(){let $=t.queueStore?.get();if(!Xt($))return;let N={orchestration_model:$.orchestration_model??null,orchestration_effort:$.orchestration_effort??null,orchestration_speed:$.orchestration_speed??null},Y=El(N,{...N,...D});if(Object.keys(Y).length!==0){try{let Pe=await r("worker-queue-set-orchestration-defaults",{expected_revision:$.revision,values:Y});if(Pe&&Pe.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}D={}}catch(Pe){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Pe instanceof Error?Pe.message:String(Pe)}`)}re()}}function ue($,N){D[$]=N===Zt?null:N,re(),se()}async function Fe($){let N=t.queueStore?.get();if(!(!Xt(N)||$<1)){try{await r("worker-queue-set-slots",{expected_revision:N.revision,slots:$})}catch(Y){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${Y instanceof Error?Y.message:String(Y)}`)}re()}}function We(){let $={};for(let N of $l){let Y=m[N];typeof Y=="string"&&Y.length>0&&($[N]=Y)}return $}async function Ge(){let $=H();if(!$)return;let N=We();if(Object.keys(N).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let Y=($.presets||[]).find(Ie=>Ie.id===q),Pe=A.trim()||(Y?Y.name:"");if(!Pe){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Ie=Y?await r("impl-preset-update",{expected_revision:$.revision,id:Y.id,name:Pe,settings:N}):await r("impl-preset-create",{expected_revision:$.revision,name:Pe,settings:N});if(Ie&&Ie.applied){if(A="",!Y&&Array.isArray(Ie.presets)){let qe=Ie.presets.find(Ce=>Ce.name===Pe);q=qe?qe.id:q}re()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),re()}catch(Ie){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Ie instanceof Error?Ie.message:String(Ie)}`)}}async function He(){let $=H();if(!(!$||q.length===0))try{let N=await r("impl-preset-delete",{expected_revision:$.revision,id:q});N&&N.applied?(q="",re()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),re())}catch(N){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}}async function Ze(){let $=H();if(!(!$||q.length===0)){try{let N=await r("apply-impl-preset-global",{preset_id:q,expected_revision:$.revision});N&&N.applied?(_=Xt(N.values)?{...N.values}:{},m={..._},b=Array.isArray(N.warnings)?N.warnings:[]):N&&N.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(N){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${N instanceof Error?N.message:String(N)}`)}re()}}async function Re(){te=!0,x=!1,re();try{let $=await r("get-worker-system-prompt",{});!$||typeof $!="object"||Array.isArray($)?x=!0:w=$}catch{x=!0}finally{te=!1,re()}}function ve(){if(U=!U,U&&!w){Re();return}re()}function Ae(){let $=Kr({loading:te,error:x});if($)return $;if(!w)return"";let N=Array.isArray(w.variants)?w.variants:[];return i`<div class="settings-dialog__sp-body">
      ${w.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${w.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${N.map(Y=>i`<div class="settings-dialog__sp-variant" data-variant=${Y.key}>
            <div class="settings-dialog__sp-cond">${Y.condition}</div>
            ${pr(Y.label,Y.system_prompt)}
          </div>`)}
    </div>`}function ke(){return i`<section
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
        aria-expanded=${U?"true":"false"}
        @click=${ve}
      >
        ${U?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${U?Ae():""}
    </section>`}function Oe($,N,Y,Pe,Ie,qe){let Ce=Ie[$]??Zt;return i`<select
      class=${Ce===Zt?"settings-dialog__unset":""}
      data-key=${$}
      aria-label=${N}
      ?disabled=${qe===!0}
      .value=${Dr(String(Ce))}
      @change=${Ke=>Pe($,String(Ke.target.value))}
    >
      <option value=${Zt} ?selected=${Ce===Zt}>(기본)</option>
      ${Y.map(Ke=>i`<option value=${Ke} ?selected=${Ke===Ce}>
            ${Ke===Nt?"\uC790\uB3D9":Ke}
          </option>`)}
    </select>`}function pe($,N,Y,Pe,Ie,qe=!1){return i`<div
      class=${`settings-dialog__row${qe?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${N}</span>
      <span class="settings-dialog__controls">
        ${Oe($,N,Y,Pe,Ie,qe)}
      </span>
    </div>`}function X($,N,Y,Pe,Ie){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${N}-on)`}
        ></i>
        ${$}
      </span>
      <span class="settings-dialog__controls">
        ${Oe(Y,`${$} \uBAA8\uB378`,Pe,ce,m,!1)}
        ${Oe(Ie,`${$} effort`,As,ce,m,!1)}
      </span>
    </div>`}function V(){let $=S(),N=Sl(m),Y=m.impl_runtime,Pe=m.impl_model,Ie=H();return i`
      <section
        class=${`settings-dialog__pane${l==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${b.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${b.join(", ")}
            </div>`:""}
        ${E?i`<div class="settings-dialog__empty">불러오는 중…</div>`:i`
              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">워크플로우</div>
                <div class="settings-dialog__row">
                  <span class="settings-dialog__row-label">모드</span>
                  <span class="settings-dialog__controls">
                    <span class="settings-dialog__seg" role="group">
                      <button
                        type="button"
                        data-mode=${Zt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>ce("workflow_mode",Zt)}
                      >
                        (기본)
                      </button>
                      ${xs.map(qe=>i`<button
                            type="button"
                            data-mode=${qe}
                            aria-pressed=${String(m.workflow_mode===qe)}
                            @click=${()=>ce("workflow_mode",qe)}
                          >
                            ${qe}
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
                ${X("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",kn,"spec_review_effort")}
                ${X("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Ss,"plan_review_effort")}
                ${X("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",kn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${pe("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ks,ce,m)}
                ${pe("impl_runtime","\uC704\uC784 \uB300\uC0C1",$s,ce,m,N)}
                ${pe("impl_model","\uBAA8\uB378",Es($,Y),ce,m,N)}
                ${pe("impl_effort","effort",Zr($,Y,Pe),ce,m,N)}
                ${pe("impl_speed","\uC18D\uB3C4",wn,ce,m,N)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Dr(q)}
                  @change=${qe=>{q=String(qe.target.value),re()}}
                >
                  <option value="" ?selected=${q===""}>
                    구현 프리셋…
                  </option>
                  ${(Ie?.presets||[]).map(qe=>i`<option
                        value=${qe.id}
                        ?selected=${qe.id===q}
                      >
                        ${qe.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${q.length===0}
                  @click=${Ze}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Dr(A)}
                  @input=${qe=>{A=String(qe.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${Ge}
                >
                  ${q?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${q.length===0}
                  @click=${He}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function we(){let $=t.queueStore?.get(),N=S(),Y={orchestration_model:D.orchestration_model??(Xt($)?$.orchestration_model:null),orchestration_effort:D.orchestration_effort??(Xt($)?$.orchestration_effort:null),orchestration_speed:D.orchestration_speed??(Xt($)?$.orchestration_speed:null)},Pe=Ts(N,k),Ie=Zr(N,k||void 0,Y.orchestration_model||Nt).filter(Ce=>Ce!==Nt),qe=Xt($)&&typeof $.slots=="number"?$.slots:2;return i`
      <section
        class=${`settings-dialog__pane${l==="worker"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-worker"
        aria-label="Worker 설정"
      >
        <header class="settings-dialog__pane-head"><h2>Worker 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          Worker가 세션을 띄울 때 쓰는 오케스트레이션 설정과 동시 실행 수입니다.
        </p>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">오케스트레이션</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">런타임</span>
            <span class="settings-dialog__controls">
              <select
                aria-label="런타임"
                data-key="orchestration_runtime_filter"
                .value=${Dr(k||Zt)}
                @change=${Ce=>{let Ke=String(Ce.target.value);k=Ke===Zt?null:Ke,re()}}
              >
                <option value=${Zt} ?selected=${!k}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${k==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${k==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${pe("orchestration_model","\uBAA8\uB378",Pe,ue,Y)}
          ${pe("orchestration_effort","effort",Ie,ue,Y)}
          ${pe("orchestration_speed","\uC18D\uB3C4",wn,ue,Y)}
        </div>
        <div class="settings-dialog__group">
          <div class="settings-dialog__group-title">동시 실행</div>
          <div class="settings-dialog__row">
            <span class="settings-dialog__row-label">slots</span>
            <span class="settings-dialog__controls">
              <span class="settings-dialog__stepper">
                <button
                  type="button"
                  aria-label="slots 감소"
                  @click=${()=>Fe(qe-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${qe}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Fe(qe+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${ke()}
      </section>
    `}function R(){let $=n.get();return i`
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
        ${$?i`
              ${Tc($,s(),P)}
              ${Cc($,d,{onDraft:N=>{d=N},onAdd:z,onRemove:L})}
              ${Rc($,Q)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function T($){let N=n.get();if(N)try{let Y=await r("display-policy-set",{expected_revision:N.revision,policy:$(N)});be(Y),Y&&Y.conflict&&Y.policy&&(Y=await r("display-policy-set",{expected_revision:Y.policy.revision,policy:$(Y.policy)}),be(Y)),Y&&Y.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function be($){$&&$.policy&&typeof $.policy=="object"&&n.set($.policy)}function Se($){T($)}function P($){let N=n.get();if(!N)return;let Y=!m_($,N);Se(Pe=>g_($,Pe,Y))}function z(){let $=d.trim();$.length!==0&&(d="",Se(N=>N.hidden_prefixes.includes($)?{hidden_prefixes:N.hidden_prefixes}:{hidden_prefixes:[...N.hidden_prefixes,$]}),re())}function L($){Se(N=>({hidden_prefixes:N.hidden_prefixes.filter(Y=>Y!==$)}))}function Q($){let N=n.get();if(!N)return;let Y=N.chips[$]===!1;Se(()=>({chips:{[$]:Y}}))}function re(){Ue(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${__.map($=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${$.id}
                  aria-selected=${String(l===$.id)}
                  aria-controls=${`settings-pane-${$.id}`}
                  @click=${()=>ae($.id)}
                >
                  <span class="settings-dialog__glyph">${$.glyph}</span>
                  ${$.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Z}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${V()} ${we()} ${R()}
          </div>
        </div>
      `,a)}function ae($){l=$,re()}let _e=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",_e),a.addEventListener("cancel",_e);let $e=$=>{$.target===a&&Z()};a.addEventListener("click",$e);let C=null;n.subscribe&&(C=n.subscribe(()=>{c&&re()}));let B=null;t.implPresetStore?.subscribe&&(B=t.implPresetStore.subscribe(()=>{c&&re()}));function ee($="session"){c||(c=!0,t.onOpenChange?.(!0),l=$,d="",D={},re(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),K())}function Z(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ee,close:Z,sessionDraft:()=>({...m}),destroy(){c=!1,a.removeEventListener("close",_e),a.removeEventListener("cancel",_e),a.removeEventListener("click",$e),C&&(C(),C=null),B&&(B(),B=null),a.remove()}}}function m_(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function g_(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var b_=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Lc(e){return String(e).padStart(2,"0")}function h_(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function y_(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Lc(n.getHours())}:${Lc(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${b_[n.getMonth()]} ${n.getDate()} ${o}`;return`${h_(r,t)} \xB7 ${l}`}function v_(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Oc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function Pc(e){let t=!1,r=null,n=new Map;function s(){Ue(i``,e),e.hidden=!0}function o(){let c=Oc.filter(_=>n.has(_.key));if(c.length===0){s();return}let d=Date.now();Ue(i`<div class="usage-meter" aria-label="Usage">
        ${c.map(_=>{let m=n.get(_.key),b=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=b?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${b?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map(k=>{let D=typeof k.pct=="number"&&Number.isFinite(k.pct)?k.pct:0,q=Math.min(100,Math.max(0,D)),U=`resets ${y_(k.resetsAt,d)}${b?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${v_(q)}"
                style=${`--progress: ${q}%`}
                title=${U}
              >
                <span class="usage-meter__label">${k.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(c){try{let d=await fetch(c.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function l(){let c=await Promise.all(Oc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of c)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),l(),r=setInterval(()=>{l()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}function Mc(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),l=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!l&&typeof s.dismissed_at!="number"}}var w_="worker-ineligible";function Qo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Jo(e){return Qo(e).includes(w_)}var k_="worker-serial";function ea(e){return Qo(e).includes(k_)}function ta(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var $_=new Set(["done","failed","orphaned","stopped","discarded"]);function Dc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,l=new Map,c=!1,d=null,_=null;function m(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function b(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function E(){let C=m(),B=new Set;for(let ee of Object.values(C.attempts||{})){let Z=ee;Z&&typeof Z.bead_id=="string"&&!$_.has(Z.status)&&B.add(Z.bead_id)}for(let ee of Array.isArray(C.pr_wait)?C.pr_wait:[])ee&&typeof ee.bead_id=="string"&&B.add(ee.bead_id);for(let ee of Object.values(C.discard_operations||{})){let Z=ee;Z&&Z.phase!=="done"&&typeof Z.bead_id=="string"&&B.add(Z.bead_id)}return B}function k(C){return C.filter(B=>D(B)===null)}function D(C){let B=m();for(let ee of Array.isArray(B.serial_lanes)?B.serial_lanes:[])if(Array.isArray(ee?.entries)&&ee.entries.some(Z=>Z.bead_id===C))return ee.id;return(Array.isArray(B.queue)?B.queue:[]).some(ee=>ee.bead_id===C)?"parallel":null}function q(C,B){let ee=a.get(C);return ee||[...B.order]}function A(C){if(C.length<2)return!1;let B=D(C[0]);if(!B||B==="parallel")return!1;let ee=m(),Z=(Array.isArray(ee.serial_lanes)?ee.serial_lanes:[]).find(N=>N.id===B)?.entries.map(N=>N.bead_id);if(!Array.isArray(Z))return!1;let $=C.map(N=>Z.indexOf(N));return $.every(N=>N>=0)&&$.every((N,Y)=>Y===0||N>$[Y-1])}function U(){let C=m(),B=Array.isArray(C.serial_lanes)?C.serial_lanes:[],ee=B.find(Z=>Array.isArray(Z.entries)&&Z.entries.length===0);return ee?ee.id:B[0]?.id||"s1"}function te(C){let B=m().bead_titles||{};return typeof B[C]=="string"?B[C]:C}async function x(C,B){if(!s||c)return null;c=!0,P();try{return await s(C,B)}finally{c=!1,P()}}async function w(C){n?.setPending?.(!0);try{let B=await x("worker-parallel-analysis-start",{force:C});B&&B.applied===!1&&B.reason&&le(`\uBD84\uC11D \uC2E4\uD328: ${B.reason}`,"error",2800)}finally{n?.setPending?.(!1)}}async function S(){let C=b().job;!s||!C||await s("worker-parallel-analysis-cancel",{job_id:C.job_id})}function H(){return m().runner_catalog}function K(C){return Object.keys(H()?.runners?.[C]?.models||{})}function he(C){let B=K(C),ee=H()?.runners?.[C]?.default_model;return typeof ee=="string"&&B.includes(ee)?ee:B[0]||""}function ce(){let C=b().settings,B=d||C.runner||"claude",ee=K(B),Z=d?he(B):C.model||ee[0]||"",$=ta(H(),B,Z),N=C.effort||"",Y=$.includes(N)?N:$[0]||"";return{runner:B,model:Z,effort:Y,models:ee,efforts:$}}async function se(C){let B=b().settings,ee=await x("worker-parallel-analysis-settings-update",{expected_revision:B.revision,runner:C.runner,model:C.model,effort:C.effort});(!ee||ee.applied!==!0)&&(d=null,P(),ee&&ee.reason&&le(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${ee.reason}`,"error",2800))}function ue(C){d=C,P();let B=ce();se({runner:C,model:B.model,effort:B.effort})}function Fe(C){let B=ce(),ee=ta(H(),B.runner,C);se({runner:B.runner,model:C,effort:ee.includes(B.effort)?B.effort:ee[0]||""})}function We(C){let B=ce();se({runner:B.runner,model:B.model,effort:C})}async function Ge(C,B){if(!s||c)return;let ee=q(C,B),Z=b();if(ee.length<2||!Z.last_good){le("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let $=l.get(C)||U(),N=()=>({snapshot_digest:Z.last_good.identity_digest,group_index:C,lane:$,ordered_bead_ids:ee,expected_revision:m().revision});c=!0,P();try{let Y=await s("worker-parallel-analysis-submit",N());Y&&Y.queue&&r&&r.set(Y.queue),Y&&Y.applied!==!0&&Y.conflict===!0&&(Y=await s("worker-parallel-analysis-submit",N()),Y&&Y.queue&&r&&r.set(Y.queue)),Y&&Y.applied===!0?(a.delete(C),le(`\uC9C1\uB82C \uB808\uC778 ${$}\uC5D0 ${ee.length}\uAC1C \uBC30\uCE58`,"success")):le(`\uC81C\uCD9C \uAC70\uBD80: ${Y?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{c=!1,P()}}function He(C,B,ee){a.set(C,q(C,B).filter(Z=>Z!==ee)),P()}function Ze(C){a.delete(C),P()}function Re(C,B,ee,Z){let $=[...q(C,B)],N=$.indexOf(ee),Y=N+Z;N<0||Y<0||Y>=$.length||($.splice(Y,0,...$.splice(N,1)),a.set(C,$),P())}function ve(){let C=b().settings,B=Object.keys(H()?.runners||{}),ee=ce();return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Z=>ue(Z.target.value)}
        >
          ${B.map(Z=>i`<option
                value=${Z}
                ?selected=${ee.runner===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Z=>Fe(Z.target.value)}
        >
          ${ee.models.map(Z=>i`<option
                value=${Z}
                ?selected=${ee.model===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Z=>We(Z.target.value)}
        >
          ${ee.efforts.map(Z=>i`<option
                value=${Z}
                ?selected=${ee.effort===Z}
              >
                ${Z}
              </option>`)}
        </select>
      </label>
      ${Ae(C)}
    </div>`}function Ae(C){return!Oe(C)||ke(C)?i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:C.compatible===!1?i`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${C.runner}/${C.model} · effort
        ${C.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:C.is_default===!0?i`<span class="pa-settings__default">기본값</span>`:""}function ke(C){return C.is_default===!0&&C.compatible===!1}function Oe(C){return!!(C.runner&&C.model&&C.effort)}function pe(C){return Oe(C)&&C.compatible!==!1}function X(C){let B=Math.max(0,Math.floor(C/1e3)),ee=Math.floor(B/60),Z=B%60;return`${ee}:${String(Z).padStart(2,"0")}`}function V(C){let B=C.job;if(B){let ee=typeof B.started_at=="number"?B.started_at:0,Z=`${B.runner||"?"}/${B.model||"?"}`,$=ee?` \xB7 \uACBD\uACFC ${X(Date.now()-ee)}`:"";return i`<span class="pa-meta__progress"
        >분석 중 — ${Z} · effort ${B.effort||"?"}${$}</span
      >`}return we()?i`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function we(){return n?.isPending?.()===!0}function R(C){let B=m(),ee=(Array.isArray(B.queue)?B.queue.length:0)+(Array.isArray(B.serial_lanes)?B.serial_lanes:[]).reduce((Y,Pe)=>Y+(Array.isArray(Pe.entries)?Pe.entries.length:0),0),Z=!!C.job,$=pe(C.settings),N=Z||c||we();return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${ee}</span>
      ${C.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(C.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${V(C)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!$||N}
        @click=${()=>{w(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!$||N}
        @click=${()=>{w(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!Z}
        @click=${()=>{S()}}
      >
        취소
      </button>
    </div>`}function T(C,B){let ee=q(C,B),Z=E(),$=ee.filter(Ce=>Z.has(Ce)),N=k(ee),Y=A(ee),Pe=Array.isArray(m().serial_lanes)?m().serial_lanes:[],Ie=l.get(C)||U(),qe=B.eligible!==!0||ee.length<2||$.length>0||N.length>0||Y||c;return i`<section class="pa-group" data-group-index=${String(C)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${B.confidence}</span>
        ${B.categories.map(Ce=>i`<span class="pa-group__category">${Ce}</span>`)}
        ${Y?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${B.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${N.length>0?i`<span class="pa-group__stale"
              >stale — ${N.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${B.reason}</p>
      <ol class="pa-group__members">
        ${ee.map((Ce,Ke)=>i`<li class="pa-member" data-bead-id=${Ce}>
              <span class="pa-member__seq">${Ke+1}</span>
              <span class="pa-member__title">${te(Ce)}</span>
              ${Z.has(Ce)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ce}
                ?disabled=${Ke===0}
                aria-label=${`${Ce} \uC704\uB85C`}
                @click=${()=>Re(C,B,Ce,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ce}
                ?disabled=${Ke===ee.length-1}
                aria-label=${`${Ce} \uC544\uB798\uB85C`}
                @click=${()=>Re(C,B,Ce,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ce}
                aria-label=${`${Ce} \uC81C\uC678`}
                @click=${()=>He(C,B,Ce)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${B.evidence.map(Ce=>i`<li class="pa-evidence">
              <code>${Ce.path}</code>
              <span class="pa-evidence__locator">${Ce.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Ze(C)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ce=>{l.set(C,Ce.target.value),P()}}
          >
            ${Pe.map((Ce,Ke)=>i`<option
                  value=${Ce.id}
                  ?selected=${Ie===Ce.id}
                >
                  직렬 ${Ke+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${qe}
          @click=${()=>{Ge(C,B)}}
        >
          제출
        </button>
      </footer>
    </section>`}function be(C){let B=Array.isArray(C.issues)?C.issues:[],ee=B.filter($=>$.verdict==="parallel_ok").length,Z=B.filter($=>$.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${ee}</span>
      <span>uncertain ${Z}</span>
    </div>`}function Se(){let C=z&&!!b().job;if(C&&_===null){_=setInterval(()=>P(),1e3);return}!C&&_!==null&&(clearInterval(_),_=null)}function P(){let C=b();d&&C.settings.runner===d&&(d=null);let B=C.last_good?.result;Se(),Ue(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${$e}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${ve()} ${R(C)}
            ${B?i`${B.groups.map((ee,Z)=>T(Z,ee))}
                ${B.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${be(B)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let z=!1,L=()=>{z=!1,Se()},Q=C=>{C.target===C.currentTarget&&$e()};o.addEventListener("close",L),o.addEventListener("cancel",L),o.addEventListener("click",Q);let re=null;r&&r.subscribe&&(re=r.subscribe(()=>{z&&P()}));let ae=null;n&&n.subscribe&&(ae=n.subscribe(()=>{z&&P()}));function _e(){z||(z=!0,P(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $e(){z&&(z=!1,Se(),typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:_e,close:$e,destroy(){z=!1,_!==null&&(clearInterval(_),_=null),o.removeEventListener("close",L),o.removeEventListener("cancel",L),o.removeEventListener("click",Q),re&&(re(),re=null),ae&&(ae(),ae=null),o.remove()}}}var Nc=new Set(["sh","bash","zsh","dash","ksh"]),Fc=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function qc(e){let t=e.split("/");return t[t.length-1]||""}function x_(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=qc(r[0]);if(n!=="env")return Nc.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Nc.has(qc(s))}function S_(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function A_(e){let t=[],r=0;Fc.lastIndex=0;for(let n of e.matchAll(Fc)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:S_(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function E_(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Bc(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",l="",c=0,d=null,_=!1;function m(w,S){return S?A_(w).map(H=>H.kind==="plain"?H.text:i`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${H.kind}"
            >${H.text}</span
          >`):w}function b(){if(!s)return i``;let w=o==="ready"&&x_(a),S=o==="ready"?a.split(`
`):[];return i`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>te()}
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
              @click=${()=>te()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?i`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?i`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${l}
                </div>`:i`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${S.map((H,K)=>i`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${K+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${m(H,w)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function E(){Ue(b(),n)}async function k(){if(o!=="ready")return;let w=await ar(a);le(w?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",w?"success":"error")}function D(w){w.key==="Escape"&&s&&(w.preventDefault(),te())}function q(){_||(document.addEventListener("keydown",D),_=!0)}function A(){_&&(document.removeEventListener("keydown",D),_=!1)}async function U(w,S=null){let H=++c;q(),s={...w},d=S||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",l="",E(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let he=t?t():"";if(!he){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",E();return}if(!r){o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",E();return}let ce="/api/repo-ops-script?workspace="+encodeURIComponent(he)+"&lane="+encodeURIComponent(w.lane)+"&base_sha="+encodeURIComponent(w.base_sha);try{let se=await r(ce),ue=await se.json().catch(()=>({}));if(H!==c)return;if((t?t():"")!==he){te();return}if(!se.ok||!ue||ue.ok!==!0){o="error",l=E_(ue&&typeof ue.error=="string"?ue.error:""),E();return}s={lane:ue.lane,base_sha:ue.base_sha,path:ue.path,base_ref:ue.base_ref},a=String(ue.content),o="ready",E()}catch{if(H!==c)return;o="error",l="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",E()}}function te(){c+=1,A(),s=null,a="",E();let w=d;d=null,w?.isConnected&&w.focus()}function x(){te(),n.remove()}return{open:U,close:te,destroy:x}}function jc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let x=o();return typeof x.revision=="number"?x.revision:0}function l(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=o().workspace_info;return x&&typeof x=="object"?x:{}}function d(x,w){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${w}</span
    >`}function _(x){if(typeof x!="number"||!Number.isFinite(x))return"";let w=x/6e4;return Number.isInteger(w)?`timeout ${w}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function m(x){let w=_(x);return w?d("config",w):""}function b(x,w,S){return i`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${S.script}
      @click=${H=>{s&&s({lane:x,base_sha:w.base_sha,path:S.script,base_ref:w.base_ref},H.currentTarget)}}
    ></button>`}function E(x){let w=typeof x.base_sha=="string"?x.base_sha:"",S=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${w?`@${w.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${S}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?i`${b("verify",x,x.verify)}
              ${m(x.verify.timeout_ms)}`:i`선언 없음${d("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?i`${b("deploy",x,x.deploy)}
              ${m(x.deploy.timeout_ms)}`:i`선언 없음${d("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function k(x){let w=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return w&&(w.status==="resolved"||w.status==="absent")?E(w):w&&(w.status==="pending"||w.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${w.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${w.error_code?i` — <code>${w.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function D(x){if(!r)return;let w=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});if(l(w),w&&w.conflict){let S=await r("worker-auto-repair-toggle",{on:x,expected_revision:a()});l(S)}n()}let q={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function A(x,w,S){return i`<div class="worker-repo-ops__policy-group" data-policy=${S}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${w.map(H=>i`<li data-token=${H}>
              ${q[H]||H}
            </li>`)}
      </ul>
    </div>`}function U(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(w=>{let S=[q[w.trigger]||w.trigger];return Number.isInteger(w.attempts_per_operation_attempt)?S.push(`operation\uB2F9 ${w.attempts_per_operation_attempt}\uD68C`):Number.isInteger(w.attempts)?S.push(`${q[w.budget]||w.budget} ${w.attempts}\uD68C`):Number.isInteger(w.sessions_per_user_action)&&S.push(`${w.sessions_per_user_action}\uD68C`,q[w.user_actions]||w.user_actions),w.applies_when&&S.push(q[w.applies_when]||w.applies_when),i`<li data-token=${w.id}>
            <strong>${q[w.id]||w.id}</strong>
            <span>${S.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function te(){let x=o(),w=x.auto_repair!==!1,S=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,H=Array.isArray(x.repo_operations)?x.repo_operations:[],K=H.find(ue=>ue.state==="repairing"),he=H.filter(ue=>ue.state==="failed"||ue.state==="repairing"),ce=he.length?Math.min(...he.map(ue=>typeof ue.repair?.remaining=="number"?ue.repair.remaining:0)):S?.auto_repair?.resolution_ladder?.find(ue=>ue.id==="auto_repair_session")?.attempts??1,se=Array.isArray(S?.auto_repair?.resolution_ladder)?S.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${w}
          @change=${ue=>{D(ue.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${w?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ce}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${K?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${K.repair?.owner_bead||K.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${S?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(S.worker_automatic||[]).length} · 해결 사다리
                ${se.length} · 금지
                ${(S.never_automatic||[]).length}</span
              >
            </summary>
            ${A("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",S.worker_automatic||[],"worker-automatic")}
            ${S.supported===!1||S.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${S.schema_version})`}
                </div>`:U(se)}
            ${A("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",S.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${k(c())} ${te()}
      </details>`}}}var T_=20,Uc={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Wc={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function C_(e,t,r=T_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function zc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function R_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Hc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Gc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function I_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Wc,n)?Wc[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":i`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function L_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ft(e.at):""}
      >${Os(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${zc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Uc,t.kind)?Uc[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${Is(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ls(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${zc(e)}"
          >${R_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Gc(nc(t.failure_kind,n)):""}
      ${I_(t)}
      ${Hc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${Is(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function O_(e){let t=e.cleanup,r=Nr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ft(e.at):""}
      >${Os(e.at)||"\u2014"}</span
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
        ${Ql(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Gc(Fs(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?i`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Hc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function P_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?i`<div class="worker-repo-drawer__empty">기록 없음</div>`:i`<ul class="worker-rail">
          ${e.events.map(t=>t.type==="cleanup"?O_(t):L_(t))}
        </ul>`}
  </section>`}function Vc(e,t={}){let r=null;function n(){Ue(r?P_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:C_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var M_="tab:worker:ready",D_="tab:worker:blocked",N_="tab:worker:in-progress",F_="tab:worker:closed",Bs=1,Yc=5;function Kc(e){return vn(e).path.length>0}var Qc="beads-ui.worker.candidate-filter",ra={show_blocked:!1,spec:"all"};function q_(){try{let e=window.localStorage.getItem(Qc);if(!e)return{...ra};let t=JSON.parse(e);if(!t||typeof t!="object")return{...ra};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...ra}}}function B_(e){try{window.localStorage.setItem(Qc,JSON.stringify(e))}catch{}}function j_(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let c=r(l),d=n(l);c&&d?s.push(l):!c&&d?o+=1:c&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var U_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Jc="bdui.worker.candidate_sort",W_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],js="spec";function z_(){try{let e=window.localStorage.getItem(Jc);return e==="board"||e==="created"||e==="spec"?e:js}catch{return js}}function H_(e){try{window.localStorage.setItem(Jc,e)}catch{}}var ed="bdui.worker.done-range";function G_(){try{let e=window.localStorage.getItem(ed);return Pt(e)?e:Rt}catch{return Rt}}function V_(e){try{window.localStorage.setItem(ed,e)}catch{}}var Y_="(max-width: 640px)",td="beads-ui.worker.lane-collapsed",In={queue:!0,done:!0};function K_(){try{let e=window.localStorage.getItem(td);if(!e)return{...In};let t=JSON.parse(e);return!t||typeof t!="object"?{...In}:{queue:typeof t.queue=="boolean"?t.queue:In.queue,done:typeof t.done=="boolean"?t.done:In.done}}catch{return{...In}}}function Z_(e){try{window.localStorage.setItem(td,JSON.stringify(e))}catch{}}function Zc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function X_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Lr):(n.sort(Yn(r)),t==="board"?n:[...n.filter(Kc),...n.filter(s=>!Kc(s))])}function Q_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function J_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function em(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Xc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function tm(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function rm(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function na(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function nm(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function sm(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Xc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Xc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function om(e,t,r,n,s=null,o=null,a=null,l=!1,c=null,d=!0,_=null,m=null,b=null,E={},k=!1,D=!1,q={}){let A=!!c&&c.position>0,U=!!c?.continuation_action&&c.continuation_action.continuation===null,te=!!c&&c.active===!0,x=c&&c.failure||null,w=r[e]||null,S=w&&w.gate?w.gate:null,H=w&&w.pr?w.pr:null,K=nm(b),he=tm(c?c.resolution:null),ce=rm(c?c.head_review:null),se=c&&c.head_review||null,ue=c&&c.authority||null,Fe=!!se&&["pending","reviewing","revising"].includes(se.state),We=A&&!te&&(se?.state==="failed"||!ue||ue.source==="automatic"&&!D),Ge=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":he?he.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,He=!!S&&S.base_badge==="\uCDA9\uB3CC",Ze=!!S&&S.enabled===!0,Re=En({bead_id:e,merge_sha:q.merge_sha,cleanup_cursor:q.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:q.repo_operations}),ve=Ns(Re),Ae=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!S&&S.tier==="merged",ke=l&&!!n&&!!S&&S.tier==="merged",Oe=We&&(Ze||He||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||Ae||ke),pe=l&&He&&d===!1,X=rr(E,e,{external:l,merge_active:te||Re?.step==="merge",merge_queued:A,conflict_active:!!a,cleanup_active:ve,merged:!!n||S?.tier==="merged"}),V=!!X.operation,we=!Ae&&!!n&&n.step==="repo_operations",R=sm({continuation_required:U,merge_step:Re,conflict_badge:Ge,conflict_live:he?.live===!0||a==="running",head_review:se&&ce?{...ce,state:se.state,failure_reason:se.failure_reason}:null,recovery:K,cleanup_failed:n,cleanup_label:n?Nr(n.step):null,base_exception:m,conflicting:He,gate:S,queue_failure:x,auto_skip:_,queued:A,queue_active:te,queue_position:c?c.position:0,activity:Ge?null:o&&o.activity||null}),T=R?.live===!0&&R.title?i`<span title=${R.title}>${R.label}</span>`:R?.label||null;return{id:e,title:l?i`${t}<span class="muted"> · 세션</span>`:t,reason:n&&Re?.active!==!0?Ds(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,external:l,pr_number:H&&typeof H.number=="number"?H.number:null,pr_url:H&&typeof H.url=="string"?H.url:"",completion_badge:R?.live!==!0&&R?.title?R.label:null,completion_title:R?.title||"",completion_repair_pr_url:K?K.repair_pr_url:"",completion_repair_pr_number:K?K.repair_pr_number:null,badges:T?[T]:[],live_badge:R?.live===!0?T:null,usage:s,alert:R?.alert===!0,merge_action:S?.tier==="merged"&&!Ae&&!ke||we?!1:!A||U||We,timeline_action:we,cancel_action:A&&!U,cancel_enabled:(!te||Fe)&&!(K&&K.lock_actions),cancel_title:K&&K.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":te&&!Fe?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Fe?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:X,discard_action:X.action,merge_step:Re,discard_enabled:X.enabled,discard_title:X.title,merge_enabled:!Re&&!a&&!V&&!m&&!(K&&K.lock_actions)&&!pe&&!we&&(Ze||He||S?.reason==="base_behind"||S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"||Ae||ke||Oe),merge_label:U?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||ke?"\uC815\uB9AC \uC7AC\uAC1C":He&&!Re&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":S?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":We?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:V?X.error?`\uD3D0\uAE30 \uC2E4\uD328: ${X.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${X.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:U?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Re?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${Re.label}`:ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":He?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="review_receipt_missing"||S?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":S?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Ze?`\uBA38\uC9C0 (${S.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:S&&S.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${S&&S.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function sa(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:c,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,b=n?Zn(n,l):null,E=Qn({transport:r,uiOrderStore:l}),k=null,D=[],q=q_(),A=z_(),U=Pt(_)?_:G_(),te=new Map;function x(){let u=er.find(y=>y.value===U);return u?u.label:"\uC624\uB298"}let w=K_(),S=!1,H=new Set,K=new Set,he=new Set,ce=new Set,se=[],ue=document.createElement("div");ue.className="worker-console";let Fe=document.createElement("div");Fe.className="worker-top";let We=document.createElement("div");We.className="worker-drawer-overlay",We.hidden=!0;let Ge=document.createElement("div");Ge.className="worker-drawer-overlay__backdrop";let He=document.createElement("div");He.className="worker-drawer-host";let Ze=document.createElement("div");Ze.className="worker-drawer-host",Ze.hidden=!0,We.append(Ge,He,Ze);let Re=document.createElement("div");Re.className="worker-lanes-host",ue.append(Fe,We,Re),e.appendChild(ue);let ve=null,Ae=ys(He,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,We.hidden=!0,de()}}),ke=Vc(Ze,{onClose:()=>{Ze.hidden=!0,We.hidden=!0,de()}}),Oe=Bc({getWorkspacePath:d||(()=>"")}),pe=d&&d()||"",X=jc({queueStore:s,transport:r,onChanged:()=>de(),onOpenScript:(u,y)=>{Oe.open(u,y)}}),V=o?Dc(ue,{queueStore:s,analysisStore:o,transport:r}):null;function we(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Bs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function R(){let u=we();return typeof u.revision=="number"?u.revision:0}function T(u){u&&u.queue&&s&&s.set(u.queue)}function be(){let u=we().queue;return Array.isArray(u)?u.length:0}async function Se(u,y,F){if(!r)return;let ie=()=>({bead_id:u,...y==="parallel"?{}:{lane:y},index:F,expected_revision:R()}),j=await r("worker-queue-place",ie());T(j),j&&j.conflict&&await r("worker-queue-place",ie()).then(T)}async function P(u,y,F){if(!r)return;let ie=()=>({bead_id:u,...y==="parallel"?{}:{lane:y},to_index:F,expected_revision:R()}),j=await r("worker-queue-reorder",ie());T(j),j&&j.conflict&&await r("worker-queue-reorder",ie()).then(T)}async function z(u){if(!r)return;let y=await r("worker-queue-remove",{bead_id:u,expected_revision:R()});T(y),y&&y.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:R()}).then(T)}async function L(u){if(!r||!u)return;let y=await r("worker-attempt-pause",{attempt_id:u});y&&y.paused===!1&&y.reason&&le(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function Q(u){if(!r||!u)return;let y=async(ie={})=>await r("worker-attempt-resume",{attempt_id:u,expected_revision:R(),...ie}),F=await y();T(F),F&&F.conflict&&(F=await r("worker-attempt-resume",{attempt_id:u,expected_revision:R()}),T(F)),F=await ir(F,(ie,j)=>y({continuation:ie,decision_token:j}),{onResult:T,refresh:()=>y()}),F&&F.resumed===!1&&!F.conflict&&F.reason&&le(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${F.reason}`,"error",2400)}async function re(u){if(!r||!u)return;let y=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:R()});T(y),y&&y.conflict&&(y=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:R()}),T(y)),y&&y.dismissed===!1&&!y.conflict&&y.reason&&le(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${y.reason}`,"error",2400)}async function ae(u,y,F=!0){if(!r)return null;let ie=r,j=await ie(u,{...y,expected_revision:R()});return T(j),j&&j.conflict&&F&&(j=await ie(u,{...y,expected_revision:R()}),T(j)),j}async function _e(u){if(!r||!u)return;let y=we().merge_queue?.find(ie=>ie.bead_id===u)?.continuation_action;if(y?.mismatch&&y.continuation===null){await C(u,y.mismatch);return}H.add(u),de();let F;try{F=await ae("worker-merge-queue-add",{bead_id:u})}finally{H.delete(u),de()}!F||F.conflict||F.applied||le("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function $e(u){if(!(!r||!u||K.has(u))){K.add(u),de();try{let y=await r("worker-cleanup-retry",{bead_id:u,expected_revision:R()});T(y),y&&!y.retried&&!y.conflict&&y.reason&&le(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${y.reason}`,"error",2400)}finally{K.delete(u),de()}}}async function C(u,y){let F=await ir({continuation_mismatch:y},(j,h)=>ae("worker-merge-queue-add",{bead_id:u,continuation:j,decision_token:h},!1)),ie=F?.queue?.merge_queue?.find(j=>j.bead_id===u)?.continuation_action;if(F?.applied!==!0&&ie?.continuation===null&&ie.mismatch){await C(u,ie.mismatch);return}F&&F.applied===!1&&!F.conflict&&le("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function B(u){if(!r)return;let y=await ae("worker-merge-auto-toggle",{on:u});!y||y.conflict||le(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function ee(u){if(!r||!u)return;let y=await ae("worker-merge-queue-remove",{bead_id:u});y&&!y.conflict&&!y.applied&&y.reason==="merge_active"&&le("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Z(){await ae("worker-merge-queue-remove",{all:!0})}async function $(u,y=null,F="unmerged",ie=null){if(!r||!u)return;let j=xn(u,F);if(!(!!ie||typeof globalThis.confirm!="function"||globalThis.confirm(j)))return;let O=await r("worker-discard",{bead_id:u,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:R()});if(T(O),O&&O.conflict&&(O=await r("worker-discard",{bead_id:u,...y?{attempt_id:y}:{},...ie?{operation_id:ie}:{},expected_revision:R()}),T(O)),O&&O.discarded===!0){le(Ps(O),"success",5e3);return}if(O&&O.reason){le(`\uD3D0\uAE30 \uC2E4\uD328: ${O.reason}`,"error",2800);return}if(O&&O.accepted&&O.pending==="merged_revert"){le("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(O&&O.accepted&&!O.discarded){le(`\uD3D0\uAE30 \uC9C4\uD589: ${O.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}O&&!O.conflict&&le("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function N(u,y,F){if(!(!r||!y||!F||ce.has(y))){ce.add(y),de();try{let ie=await r(u,{bead_id:y,action_id:F,expected_revision:R()});T(ie),ie?.conflict?le("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!ie?.ok&&ie?.reason&&le(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(ie.reason)}`,"error",2800)}finally{ce.delete(y),de()}}}async function Y(u,y){if(!r||!y||he.has(y))return;he.add(y),de();let F;try{let ie=async(j={})=>await r(u,{bead_id:y,expected_revision:R(),...j});F=await ie(),T(F),F&&F.conflict&&(F=await r(u,{bead_id:y,expected_revision:R()}),T(F)),u==="worker-revise-fix"&&(F=await ir(F,(j,h)=>ie({continuation:j,decision_token:h}),{onResult:T,refresh:()=>ie()}))}finally{he.delete(y),de()}if(!(!F||F.conflict)){if(F.ok){le(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}le(`\uCC98\uBD84 \uAC70\uBD80: ${F.reason||""}`,"error",3e3)}}async function Pe(u){if(!r)return;let y=await r("worker-automation-toggle",{on:u,expected_revision:R()});T(y),y&&y.conflict&&await r("worker-automation-toggle",{on:u,expected_revision:R()}).then(T)}async function Ie(u){if(!r||!u)return;let y=await r("worker-repo-operation-repair",{operation_id:u});if(T(y),y&&y.ok===!1){le(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${y.reason||""}`,"error",3e3);return}y&&y.ok===!0&&le("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function qe(u){if(!r||!u)return;let y=await r("worker-repo-operation-dismiss",{operation_id:u});T(y),y&&y.ok===!1&&le(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${y.reason||""}`,"error",3e3)}async function Ce(u){if(!r||!Number.isFinite(u))return;let y=Math.max(Bs,Math.floor(u)),F=await r("worker-queue-set-slots",{slots:y,expected_revision:R()});T(F),F&&F.conflict&&await r("worker-queue-set-slots",{slots:y,expected_revision:R()}).then(T)}async function Ke(u){if(!r||!Number.isInteger(u)||u<1||u>Yc)return;let y=we(),F=(Array.isArray(y.serial_lanes)?y.serial_lanes:[]).slice(u).reduce((h,O)=>h+(Array.isArray(O?.entries)?O.entries.length:0),0),ie=()=>({count:u,expected_revision:R()}),j=await r("worker-queue-set-serial-lane-count",ie());T(j),j&&j.conflict&&(j=await r("worker-queue-set-serial-lane-count",ie()),T(j)),j&&j.applied&&F>0&&le(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${F}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function mt(){let u=we(),y=b?b.selectBoardColumn(M_,"ready"):[],F=b?b.selectBoardColumn(D_,"blocked"):[],ie=b?b.selectBoardColumn(F_,"closed"):[],j=b?b.selectBoardColumn(N_,"in_progress"):[],h=new Map;for(let g of j){let M=J_(g);if(!M)continue;let oe=h.get(M);oe?oe.push(g):h.set(M,[g])}let O=g=>{let M=Xn(h.get(g)||[]);return M?M.title||M.id:null},ne=u.bead_titles||{},Te=new Map;for(let[g,M]of Object.entries(ne))typeof M=="string"&&M.length>0&&Te.set(g,M);for(let g of[...y,...F])Te.set(g.id,g.title||g.id);let Je=u.bead_times&&typeof u.bead_times=="object"&&!Array.isArray(u.bead_times)?u.bead_times:{},je=u.bead_labels&&typeof u.bead_labels=="object"&&!Array.isArray(u.bead_labels)?u.bead_labels:{},ge=new Map;for(let[g,M]of Object.entries(je))Array.isArray(M)&&ge.set(g,ea(M));for(let g of[...y,...F]){let M=g.labels;Array.isArray(M)&&!ge.has(g.id)&&ge.set(g.id,ea(M))}let v=new Map,f=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(f)?f:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let M=g.members.map(Be=>{let nt=(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).find(Ut=>Ut.entries.some(wt=>wt.bead_id===Be));return nt?nt.id:null});if(!(M.every(Be=>Be!==null)&&new Set(M).size===1))for(let Be of g.members)v.set(Be,g.members.filter(nt=>nt!==Be))}let p=u.bead_blocked_by&&typeof u.bead_blocked_by=="object"&&!Array.isArray(u.bead_blocked_by)?u.bead_blocked_by:{},I=new Map;for(let[g,M]of Object.entries(Je))M&&typeof M=="object"&&I.set(g,M);for(let g of[...y,...F])I.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let G=g=>I.get(g)||{},fe=u.pr_wait||[],Le=u.pr_observations||{},xe=u.pr_activity||{},pt=u.cleanup_failed||{},Jt=Object.entries(pt).map(([g,M])=>({bead_id:g,step:M&&M.step?M.step:"",reason:M&&M.reason?M.reason:"",at:M&&typeof M.at=="number"?M.at:null,detail:M&&typeof M.detail=="string"?M.detail:null,output_tail:M&&typeof M.output_tail=="string"&&M.output_tail?M.output_tail:void 0,log_path:M&&typeof M.log_path=="string"&&M.log_path?M.log_path:void 0,retry_count:M&&typeof M.retry_count=="number"&&Number.isInteger(M.retry_count)&&M.retry_count>0?M.retry_count:0,failure_code:M&&typeof M.failure_code=="string"?M.failure_code:void 0,subject_id:M&&typeof M.subject_id=="string"?M.subject_id:void 0,repair_eligible:!!(M&&M.repair_eligible),repair:M&&M.repair?M.repair:void 0})),Qr=u.queue||[],Me=new Set([...Qr.map(g=>g.bead_id),...(Array.isArray(u.serial_lanes)?u.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(M=>M.bead_id)),...fe.map(g=>g.bead_id),...u.done.map(g=>g.bead_id)]),ct=new Set(F.map(g=>g.id)),Jr=l?l.get()?.order||{}:{},la=new Set,ca=[];for(let g of[...y,...F])Me.has(g.id)||la.has(g.id)||Q_(g)||Object.hasOwn(g,"labels")&&Jo(g.labels)||(la.add(g.id),ca.push(g));D=X_(ca,A,Jr);let _d=u.admission||{},da=g=>{let M=_d[g];if(!M)return"";if(M.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof M.reason=="string"?M.reason:"",Be=oe.indexOf(":");return Be>0&&Be<oe.length-1?`\u26D4 ${oe.slice(0,Be)} (${oe.slice(Be+1)})`:`\u26D4 ${oe}`},md=D.map(g=>{let M=vn(g),oe=M.path.length>0,Be=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",nt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,wt=!(Object.hasOwn(g,"labels")&&Jo(g.labels))&&(Be?nt:oe&&!M.conflict),rt=ct.has(g.id),Wt=[];rt&&Wt.push(em(g)),Be&&!nt?Wt.push("missing_description"):!Be&&M.conflict?Wt.push("spec_id_conflict"):!Be&&!oe&&Wt.push("spec \uC5C6\uC74C");let qn=da(g.id);return qn&&Wt.push(qn),{id:g.id,title:g.title||g.id,reason:Wt.join(" \xB7 "),draggable:wt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Be,status:g.status,blocked:rt,has_spec:oe}}),Us=j_(md,q),gd=Us.visible,bd=u.revise_parked||{},Ln=u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},Ws=(g,M)=>g.map((oe,Be)=>{let nt=M!=="done",Ut=M!=="done"&&M!=="queue",wt=nt?bd[oe.bead_id]:null,rt=nt?rr(Ln,oe.bead_id):null,Wt=rt?.operation?rt:null,qn=nt&&ge.get(oe.bead_id)===!0,Pa=p[oe.bead_id]||[],Ys=u.admission&&typeof u.admission=="object"?u.admission[oe.bead_id]:null,Ks=nt?Zl(Ys,!!Wt||ce.has(oe.bead_id)):null,Rd=nt&&!Ks?da(oe.bead_id):null,Id=nt?[Rd]:[],Ma=nt&&Pa.length>0&&typeof Ys?.reason=="string"&&Ys.reason.startsWith("not_ready")?[`\u23F8 ${Pa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Zs=nt?v.get(oe.bead_id):void 0;return Zs&&Zs.length>0&&Ma.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Zs.join(", ")}\uC640`),{id:oe.bead_id,title:Te.get(oe.bead_id)||oe.bead_id,reason:Id.filter(Boolean).join(" \xB7 "),draggable:nt&&!Wt&&!Ks,done:M==="done",lane:M,seq:Ut?Be+1:void 0,worker_serial:qn,discard:Wt,stale_work:Ks,badges:[...Ma,...wt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!wt,revise_action:!!wt,revise_enabled:!!wt&&!Wt&&!he.has(oe.bead_id),revise_title:wt?wt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${wt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:M==="done"?Mt(u.attempts||{},oe.bead_id):null,work_ms:M==="done"?Yl(u.attempts||{},oe.bead_id):null,done_at:M==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,...G(oe.bead_id)}}),qr=u.attempts?Object.values(u.attempts):[],zs=new Set;for(let g of qr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&zs.add(g.resumed_from);let ua=new Map;for(let g of qr)ua.set(g.bead_id,g.attempt_id);let On=new Map;for(let g of qr)On.set(g.attempt_id,g);function Hs(g){let M=new Set,oe=g;for(;oe&&!M.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;M.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&On.get(oe.resumed_from)||null}return!1}let Pn=typeof u.declared_base=="string"?u.declared_base:null;function hd(g){let M=null;for(let oe of qr)!oe||oe.bead_id!==g||Hs(oe)||(M===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof M.started_at=="number"?M.started_at:0))&&(M=oe);return M&&typeof M.target_base=="string"?M.target_base:null}let pa=[],fa=[],yd=Mc(u),_a=g=>{let M=typeof g.session_id=="string"&&g.session_id.length>0,oe=zs.has(g.attempt_id);return{eligible:M&&!oe,reason:M?oe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let g of qr){let M=g.status==="paused"&&!zs.has(g.attempt_id);if(g.status==="running"||M)fa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Te.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:M,conflict_resolution:Hs(g),base_exception:na(Pn,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:rr(Ln,g.bead_id,{attempt_id:g.attempt_id}),usage:Mt(u.attempts||{},g.bead_id),current_child:O(g.bead_id),...G(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&yd(g)){let oe=_a(g);pa.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:Te.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:rr(Ln,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:oe.eligible,resume_reason:oe.reason,conflict_resolution:Hs(g),base_exception:na(Pn,g.target_base),usage:Mt(u.attempts||{},g.bead_id),current_child:O(g.bead_id),...G(g.bead_id)}),jt=g}}let Mn=[...pa,...fa].map(g=>{let M=On.get(g.attempt_id),oe=M?.quickfix_landing;if(M?.quickfix_lane!==!0||!oe||typeof oe!="object")return g;let Be=typeof oe.reason=="string"&&oe.reason.length>0?oe.reason:null,nt=En({bead_id:M.bead_id,merge_sha:oe.head_sha,cleanup_cursor:oe.cursor,cleanup_failed:Be?{step:oe.cursor,reason:Be}:null,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]});return nt?{...g,landing:nt}:g}),ma=null;if(jt){let g=_a(jt),M=jt.cause_detail;ma={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:M&&typeof M.reason=="string"?{reason:M.reason,command:typeof M.command=="string"?M.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:rr(Ln,jt.bead_id,{attempt_id:jt.attempt_id})}}let ga=new Set(Mn.map(g=>g.bead_id)),Gs=Array.isArray(u.merge_queue)?u.merge_queue:[],ba=new Map,ha=new Map,ya=new Map,va=new Map,wa=new Map;Gs.forEach((g,M)=>{g&&typeof g.bead_id=="string"&&(ba.set(g.bead_id,M+1),ha.set(g.bead_id,g.resolution),ya.set(g.bead_id,g.continuation_action||null),va.set(g.bead_id,g.head_review||null),wa.set(g.bead_id,g.authority||null))});let ka=u.merge_queue_state||{active:null,failures:{}},vd=ka.failures||{},wd=u.auto_merge_skips||{},$a=g=>{let M=wd[g];if(!M)return null;let oe=Le[g],Be=oe&&oe.pr?oe.pr.head_sha:null;return Be&&Be===M.head_sha?M.reason||"":null},Dn=new Map;for(let g of Mn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Dn.has(g.bead_id)||Dn.set(g.bead_id,"paused"):Dn.set(g.bead_id,"running"));let xa=Mn.filter(g=>!g.paused&&g.failed!==!0).length,Sa=(u.workspace_info||{}).slots,Aa=typeof Sa=="number"?Sa:typeof u.slots=="number"?u.slots:Bs,kd=xa>Aa,Nn=Rr(U),$d=(Array.isArray(u.done)?u.done.slice():[]).filter(g=>Nn===void 0||typeof g.added_at!="number"||g.added_at>=Nn).sort((g,M)=>(M.added_at||0)-(g.added_at||0)),en=Ws($d,"done"),xd=new Set((Array.isArray(u.done)?u.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Ea=[],Sd=d?.()||"";for(let g of ie){let M=Or(g.closed_at);if(typeof g.id!="string"||xd.has(g.id)||M===null||Nn!==void 0&&M<Nn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let oe=`${Sd}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Be=te.get(oe);Be===void 0&&r&&(te.set(oe,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(nt=>{let Ut=Array.isArray(nt)&&nt.some(wt=>vs(typeof wt?.text=="string"?wt.text:"")?.lane==="session");te.set(oe,Ut?"session":"not-session"),de()}).catch(()=>{te.set(oe,"failed"),de()})),Be==="session"&&Ea.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:M,created_at:g.created_at,updated_at:g.updated_at})}en.push(...Ea),en.sort((g,M)=>(M.done_at||0)-(g.done_at||0));let Fn={};for(let g of lr)Fn[g]=0;let Ta=!1,Ca=0,Vs=0,Ra=0;for(let g of en){let M=g.usage;if(M&&typeof M=="object"){let oe=!1;for(let Be of lr)Number.isFinite(M[Be])&&(Fn[Be]+=M[Be],Ta=!0,oe=!0);oe&&(Vs+=1,Number.isFinite(M.total_cost_usd)&&(Ca+=M.total_cost_usd,Ra+=1))}}Vs>0&&Ra===Vs&&(Fn.total_cost_usd=Ca);let Ia=en.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),Ad=Ia.length>0?vt(os(Ia)):Ta?Ht(Fn):null,Ed=u.lane_states&&typeof u.lane_states=="object"&&!Array.isArray(u.lane_states)?u.lane_states:{},Td=Array.isArray(u.serial_lanes)?u.serial_lanes:[],La=g=>{if(fe.some(Be=>Be.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let M=qr.filter(Be=>Be&&Be.bead_id===g),oe=M.length>0?M[M.length-1].status:null;return oe==="failed"||oe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":oe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Oa=Td.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,M)=>{let oe=Ed[g.id]||{},Be=new Map((Array.isArray(oe.corrections)?oe.corrections:[]).filter(rt=>rt&&typeof rt.bead_id=="string"&&typeof rt.after=="string").map(rt=>[rt.bead_id,rt.after])),nt=Ws(g.entries.filter(rt=>!ga.has(rt.bead_id)),g.id).map(rt=>Be.has(rt.id)?{...rt,badges:[`\u{1F517} ${Be.get(rt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...rt.badges]}:rt),Ut=Array.isArray(oe.occupied_by)?oe.occupied_by.filter(rt=>typeof rt=="string"):[],wt=Ut.map(rt=>({id:rt,title:Te.get(rt)||rt,draggable:!1,lane:g.id,ghost:!0,badges:[La(rt)]}));return{id:g.id,index:M+1,rows:[...wt,...nt],occupied:Ut.length>0,badge:Ut.length>0?La(Ut[0]):"\uB300\uAE30",cycle:oe.cycle===!0}}),Cd=typeof u.serial_lane_count=="number"?u.serial_lane_count:Oa.length;return{queue:u,idToTitle:Te,candidates:gd,candidate_hidden:{blocked:Us.hidden_blocked,spec:Us.hidden_spec},running:Mn,live_count:xa,slots:Aa,over_cap:kd,failure:ma,waiting:Ws(Qr.filter(g=>!ga.has(g.bead_id)),"queue"),serial_lanes:Oa,serial_lane_count:Cd,pr_wait:fe.map(g=>om(g.bead_id,Te.get(g.bead_id)||g.bead_id,Le,pt[g.bead_id]||null,Mt(u.attempts||{},g.bead_id),xe[g.bead_id]||(H.has(g.bead_id)||K.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Dn.get(g.bead_id)||null,g.external===!0,{position:ba.get(g.bead_id)||0,active:ka.active===g.bead_id,failure:vd[g.bead_id]||null,resolution:ha.get(g.bead_id),continuation_action:ya.get(g.bead_id),head_review:va.get(g.bead_id)||null,authority:wa.get(g.bead_id)||null},g.wt_present!==!1,u.auto_merge===!0?$a(g.bead_id):null,na(Pn,hd(g.bead_id)),u.completion_status&&typeof u.completion_status=="object"&&!Array.isArray(u.completion_status)&&u.completion_status[g.bead_id]||null,u.discard_operations&&typeof u.discard_operations=="object"&&!Array.isArray(u.discard_operations)?u.discard_operations:{},On.get(ua.get(g.bead_id)||"")?.worker_serial===!0,u.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]})).map(g=>({...g,...G(g.id)})),merge_queue_length:Gs.length,merge_queue_running:Gs.length>0,auto_excluded:fe.map(g=>g.bead_id).filter(g=>$a(g)!==null),declared_base:Pn,done:en,token_total:Ad,cleanup_failures:Jt,repo_operations:Array.isArray(u.repo_operations)?u.repo_operations:[]}}function gt(){let y=!!o?.get()?.job,F=!y&&o?.isPending?.()===!0,ie=y?"\uBD84\uC11D \uC911":F?"\uC900\uBE44 \uC911":"";return i`<button
      type="button"
      class=${ie?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${ie?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${ie?i`<span class="worker-analysis-btn__badge">${ie}</span>`:""}
    </button>`}function lt(u){let y=u.waiting.length>0?u.waiting[0].id:"\u2014",F=i`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,ie=J(u),j=u.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",h=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${x()} 완료 <b>${u.done.length}</b></span
      >`,O=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,ne=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Bs}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Yc},(je,ge)=>ge+1).map(je=>i`<option
                value=${String(je)}
                ?selected=${u.serial_lane_count===je}
              >
                ${je}
              </option>`)}
        </select>
      </label>
      ${o?gt():""} `,Te=oc({failure:u.failure}),Je=Kl(u.repo_operations,u.cleanup_failures);return S?i`<div class="worker-ribbon">
          ${F} ${ie}
          <div class="worker-kpi worker-kpi--ribbon">${j}${h}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ne}</div>
          <div class="worker-kpi">${O}</div>
        </div>
        ${Je}${X.template()}${Te}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${F}${ie}${ne}</div>
        <div class="worker-kpi">
          ${j}${h}${O}
          ${(Array.isArray(u.token_total)?u.token_total:u.token_total?[{label:u.token_total,tooltip:`${x()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(je=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${je.tooltip}
                >${x()} 완료 · 누적 ${je.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${y}</b></span
          >
        </div>
      </div>
      ${Je}${X.template()}${Te}`}function kt(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let y=u.running.some(F=>!F.paused&&F.failed!==!0);return i`<section
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
          >${u.running.length+u.pr_wait.length}</span
        >
      </header>
      ${u.running.length>0?Go(u.running,Date.now(),ve):""}
      ${u.pr_wait.map(F=>Bo(F))}
    </section>`}function at(u){let y=u.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${q.show_blocked}
        />
        🔒 blocked${y.blocked>0?` ${y.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${U_.map(F=>i`<button
              type="button"
              class="worker-filter__chip${q.spec===F.value?" is-active":""}"
              data-spec=${F.value}
              aria-pressed=${q.spec===F.value?"true":"false"}
            >
              ${F.label}
            </button>`)}
        ${y.spec>0?i`<span class="worker-filter__hidden">숨김 ${y.spec}</span>`:""}
      </div>
    </div>`}function st(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${A}
    >
      ${W_.map(u=>i`<option value=${u.value} ?selected=${A===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function dt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${U}
      >
        ${er.map(u=>i`<option value=${u.value} ?selected=${U===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function W(u){let y=i`<span
      class="worker-lane__badge${u.occupied?" worker-lane__badge--held":""}"
      >${u.badge}</span
    >`,F=u.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Kt({id:`worker-pane-lane-${u.id}`,lane:u.id,title:`\uC9C1\uB82C ${u.index}`,items:u.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:y,controls:F})}function J(u){let y=u.queue.auto_merge===!0;if(u.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${y?" is-active":""}"
        title=${y?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${y?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(y)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let F=new Set(u.auto_excluded),ie=u.pr_wait.filter(j=>j.merge_action&&j.merge_enabled&&!F.has(j.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${ie>0?` ${ie}`:""}
    </button>`}function ye(u){let y=Kt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:st(),controls:at(u)});return S?i`<div class="worker-lanes worker-lanes--mobile">
        ${kt(u)}
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:w.queue,preview:Zc(u.waiting)})}
        ${u.serial_lanes.map(F=>W(F))}
        ${y}
        ${Kt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:dt(),collapsible:!0,collapsed:w.done,preview:Array.isArray(u.token_total)?u.token_total.map(F=>F.label).join(" \xB7 "):u.token_total||Zc(u.done)})}
      </div>`:i`<div class="worker-lanes">
      ${y}
      <div class="worker-wait">
        ${Kt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${u.serial_lanes.map(F=>W(F))}
      </div>
      ${Kt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(F=>!F.paused&&F.failed!==!0),body:Go(u.running,Date.now(),ve)})}
      ${Kt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Kt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${x()} ${u.done.length}`,items:u.done,empty:`${x()} \uC644\uB8CC \uC5C6\uC74C`,controls:dt()})}
    </div>`}function me(u){w={...w,[u]:!w[u]},Z_(w),de()}function de(){let u=mt();Ue(lt(u),Fe),Ue(ye(u),Re)}function Ne(){let u=document.querySelector(".app-header");if(!u)return;let y=()=>{let F=Math.round(u.getBoundingClientRect().height);ue.style.setProperty("--worker-ribbon-top",`${F}px`)};if(y(),typeof ResizeObserver=="function"){let F=new ResizeObserver(y);F.observe(u),se.push(()=>F.disconnect())}else window.addEventListener("resize",y),se.push(()=>window.removeEventListener("resize",y))}function et(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Y_);S=!!u.matches;let y=F=>{let ie=!!(F&&typeof F.matches=="boolean"?F.matches:u.matches);ie!==S&&(S=ie,de())};typeof u.addEventListener=="function"?(u.addEventListener("change",y),se.push(()=>u.removeEventListener("change",y))):typeof u.addListener=="function"&&(u.addListener(y),se.push(()=>u.removeListener(y)))}let Ve=null;function De(u){Ve=u.target instanceof Element?u.target:null}function Qe(u){let F=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!F)return;if(Ve&&F.contains(Ve)&&Ve.closest("input, button, a")){u.preventDefault();return}let ie=F.dataset.beadId||"",j=F.dataset.lane||"";k={bead_id:ie,from_lane:j};try{u.dataTransfer?.setData("text/plain",ie),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function Ee(u){let y=u.target?.closest?.(".worker-pane");if(!y)return;let F=y.dataset.lane||"";F!=="candidate"&&F!=="queue"&&!/^s[1-5]$/.test(F)||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),y.classList.add("worker-pane--drag-over"))}function ut(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Et(u,y){let F=D.find(O=>O.id===u);if(!F)return;let ie=D.filter(O=>O.id!==u),j=ie.length;if(y){let O=y.dataset.beadId;if(O===u)return;let ne=ie.findIndex(Te=>Te.id===O);ne>=0&&(j=ne)}let h=ie.slice();h.splice(j,0,F),E.applyReorder(u,h,j)}function Lt(u){let y=u.target?.closest?.(".worker-pane");if(!y)return;u.preventDefault(),y.classList.remove("worker-pane--drag-over");let F=y.dataset.lane||"",ie=k?.bead_id||u.dataTransfer?.getData("text/plain")||"",j=k?.from_lane||"";if(k=null,!ie)return;let h=u.target?.closest?.(".worker-mini, .worker-card"),O=Array.from(y.querySelectorAll(".worker-mini, .worker-card")),ne=O.length;if(h){let Te=O.indexOf(h);Te>=0&&(ne=Te)}if(ne=Math.max(0,ne-y.querySelectorAll(".worker-mini--ghost").length),y.classList.contains("worker-pane--collapsed")&&(ne=be()),F==="candidate"){if(j==="candidate"){Et(ie,h);return}(j==="queue"||/^s[1-5]$/.test(j))&&z(ie);return}if(F==="queue"||/^s[1-5]$/.test(F)){let Te=F==="queue"?"parallel":F;j===F?P(ie,Te,ne):Se(ie,Te,ne)}}function Ft(u){q=u,B_(u),de()}function xr(u){A=u==="board"||u==="created"||u==="spec"?u:js,H_(A),de()}function bt(u){U=Pt(u)?u:Rt,V_(U),m?.(U),de()}function ht(u){let y=u.target?.closest?.(".worker-serial-lane-count");if(y){let ne=Number.parseInt(y.value,10);Number.isFinite(ne)&&Ke(ne).then(de);return}let F=u.target?.closest?.(".worker-filter__blocked");if(F){Ft({...q,show_blocked:F.checked});return}let ie=u.target?.closest?.(".worker-done-range");if(ie){bt(ie.value);return}let j=u.target?.closest?.(".worker-sort");if(j){xr(j.value||js);return}let h=u.target?.closest?.(".worker-slots__input");if(!h)return;let O=Number.parseInt(h.value,10);if(!Number.isFinite(O)){de();return}Ce(O).then(de)}function nr(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function sr(){let u=mt();return{operations:u.repo_operations,cleanup_failures:u.cleanup_failures,repo:d&&d()||""}}function qt(){ve&&Ae.close(),Ze.hidden=!1,We.hidden=!1,ke.open(sr()),de()}function Bt(u){let y=we(),F=y.attempts?y.attempts[u]:null;ve=u,ke.close(),Ze.hidden=!0,We.hidden=!1,Ae.open({attempt_id:u,meta:nr(F)}),de()}function yt(){if(ke.isOpen()&&ke.refresh(sr()),!ve)return;let u=we(),y=u.attempts?u.attempts[ve]:null;if(y){Ae.updateMeta(nr(y));return}Ae.close()}function Qt(u){let y=u.target;if(y?.closest?.(".worker-mini__serial, .worker-mini__grip")||y?.closest?.("#worker-parallel-analysis-dialog"))return;if(y?.closest?.(".worker-analysis-btn")){V?.open();return}if(y?.closest?.(".worker-repo-strip")||y?.closest?.(".worker-mini__timeline")){qt();return}let F=y?.closest?.(".worker-repo-op__session");if(F){let Me=F.dataset.attemptId;Me&&Bt(Me);return}let ie=y?.closest?.(".worker-repo-op__resolve");if(ie){Ie(ie.dataset.operationId||"");return}let j=y?.closest?.(".worker-repo-op__dismiss");if(j){qe(j.dataset.operationId||"");return}let h=y?.closest?.(".worker-cleanup__resume");if(h){let Me=h.dataset.beadId;Me&&$e(Me);return}let O=y?.closest?.(".worker-banner__resume");if(O){let Me=O.dataset.attemptId;Me&&Q(Me);return}let ne=y?.closest?.(".worker-banner__discard");if(ne){let Me=ne.dataset.confirmation==="merged"?"merged":"unmerged";$(ne.dataset.beadId||"",ne.dataset.attemptId||null,Me,ne.dataset.operationId||null);return}let Te=y?.closest?.(".worker-banner__dismiss");if(Te){let Me=Te.dataset.attemptId;Me&&re(Me);return}if(y?.closest?.(".worker-play")){Pe(!we().auto_advance);return}let Je=y?.closest?.(".worker-merge-all");if(Je){Je.classList.contains("worker-merge-all--stop")?we().auto_merge===!0?B(!1):Z():B(!0);return}let je=y?.closest?.(".worker-pane__hd--toggle");if(je){let Me=je.dataset.lane;(Me==="queue"||Me==="done")&&me(Me);return}let ge=y?.closest?.(".worker-card__place");if(ge){let Me=ge.dataset.beadId;Me&&!ge.disabled&&Se(Me,"parallel",be());return}let v=y?.closest?.(".worker-filter__chip");if(v){let Me=v.dataset.spec;(Me==="all"||Me==="with"||Me==="without")&&Ft({...q,spec:Me});return}let f=y?.closest?.(".worker-mini__merge");if(f){let Me=f.dataset.beadId||"";we().cleanup_failed?.[Me]?$e(Me):_e(Me);return}let p=y?.closest?.(".worker-mini__merge-cancel");if(p){ee(p.dataset.beadId||"");return}let I=y?.closest?.(".worker-mini__discard");if(I){$(I.dataset.beadId||"",I.dataset.attemptId||null,I.dataset.discardMode==="merged"?"merged":"unmerged",I.dataset.operationId||null);return}let G=y?.closest?.(".worker-mini__stale-continue");if(G){N("worker-stale-work-continue",G.dataset.beadId||"",G.dataset.actionId||"");return}let fe=y?.closest?.(".worker-mini__stale-backup");if(fe){N("worker-stale-work-backup-fresh",fe.dataset.beadId||"",fe.dataset.actionId||"");return}let Le=y?.closest?.(".worker-mini__stale-recheck");if(Le){N("worker-stale-work-recheck",Le.dataset.beadId||"",Le.dataset.actionId||"");return}let xe=y?.closest?.(".worker-mini__revise-fix");if(xe){Y("worker-revise-fix",xe.dataset.beadId||"");return}let pt=y?.closest?.(".worker-mini__revise-approve");if(pt){Y("worker-revise-approve",pt.dataset.beadId||"");return}if(y?.closest?.(".worker-mini__pr"))return;if(y?.closest?.(".rtile__discard")){let Me=y?.closest?.(".rtile"),ct=Me?.dataset?.beadId,Jr=Me?.dataset?.attemptId;ct&&$(ct,Jr||null,"unmerged",y?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(y?.closest?.(".rtile__dismiss")){let ct=y?.closest?.(".rtile")?.dataset?.attemptId;ct&&re(ct);return}if(y?.closest?.(".rtile__pause")){let ct=y?.closest?.(".rtile")?.dataset?.attemptId;ct&&L(ct);return}if(y?.closest?.(".rtile__resume")){let ct=y?.closest?.(".rtile")?.dataset?.attemptId;ct&&Q(ct);return}if(y?.closest?.(".rtile__session")){let ct=y?.closest?.(".rtile")?.dataset?.attemptId;ct&&Bt(ct);return}if(y?.closest?.(".worker-drawer-overlay__backdrop")){ke.close(),Ae.close();return}if(y?.closest?.(".worker-drawer-host"))return;let Jt=y?.closest?.(".rtile");if(Jt){if(y?.closest?.(".rtile__id")){let ct=Jt.dataset.beadId;ct&&ar(ct).then(Jr=>{Jr?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Me=Jt.dataset.beadId;Me&&c&&c(Me);return}let Qr=y?.closest?.(".worker-mini, .worker-card");if(Qr){let Me=Qr.dataset.beadId;if(y?.closest?.(".worker-mini__id, .worker-card__id")){Me&&ar(Me).then(ct=>{ct?le("\uBCF5\uC0AC\uB428","success",1200):le("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Me&&c&&c(Me)}}return e.addEventListener("pointerdown",De),e.addEventListener("dragstart",Qe),e.addEventListener("dragover",Ee),e.addEventListener("dragleave",ut),e.addEventListener("drop",Lt),e.addEventListener("click",Qt),e.addEventListener("change",ht),et(),Ne(),b&&se.push(b.subscribe(()=>{for(let[u,y]of te)y==="failed"&&te.delete(u);de()})),s&&se.push(s.subscribe(()=>{let u=d&&d()||"";u!==pe&&(pe=u,Oe.close()),de(),yt()})),o&&typeof o.subscribe=="function"&&se.push(o.subscribe(()=>de())),de(),{load(){de()},destroy(){for(let u of se.splice(0))try{u()}catch{}e.removeEventListener("pointerdown",De),e.removeEventListener("dragstart",Qe),e.removeEventListener("dragover",Ee),e.removeEventListener("dragleave",ut),e.removeEventListener("drop",Lt),e.removeEventListener("click",Qt),e.removeEventListener("change",ht);try{Ae.destroy()}catch{}We.hidden=!0;try{V?.destroy()}catch{}try{Oe.destroy()}catch{}Ue(i``,e)}}}function oa(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function rd(e,t,r,n=async()=>{},s=async()=>{}){let o=ot("views:workspace-picker"),a=null,l=!1,c=!1,d=!1;async function _(S){let K=S.target.value,ce=t.getState().workspace?.current?.path||"";if(K&&K!==ce){o("switching workspace to %s",K),l=!0,w();try{await r(K)}catch(se){o("workspace switch failed: %o",se)}finally{l=!1,w()}}}async function m(){let S=t.getState(),H=S.workspace?.current?.path||S.workspace?.available?.[0]?.path||"";if(!(!H||c)){o("git-pulling workspace %s",H),c=!0,w();try{await n(H)}catch(K){o("workspace git pull failed: %o",K)}finally{c=!1,w()}}}function b(S){let H=S.target;H&&e.contains(H)||D()}function E(S){S.key==="Escape"&&D()}function k(){d||(d=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",E),w())}function D(){d&&(d=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),w())}function q(){d?D():k()}async function A(S){let H=S.target,K=H.value,he=H.checked;o("toggling visibility %s \u2192 %s",K,String(he));try{await s(K,he)}catch(ce){o("workspace visibility toggle failed: %o",ce)}}function U(S){return S?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${l||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function te(S,H){return i`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${q}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?i`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${S.map(K=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${K.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${K.path}"
                        .checked=${!H.has(K.path)}
                        @change=${A}
                      />
                      <span class="workspace-picker__manage-name"
                        >${oa(K.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function x(){let S=t.getState(),H=S.workspace?.current,K=S.workspace?.available||[],he=new Set(S.workspace?.hidden||[]),ce=H?.path||K[0]?.path||"";if(K.length===0)return i``;let se=K.filter(ue=>!he.has(ue.path)||ue.path===ce);if(se.length<=1){let ue=se[0]||K[0],Fe=oa(ue.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Fe}</span
          >
          ${te(K,he)}
          ${U(ce)}
          ${c?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||c}
          aria-label="Select project workspace"
        >
          ${se.map(ue=>i`
              <option
                value="${ue.path}"
                ?selected=${ue.path===ce}
                title="${ue.path}"
              >
                ${oa(ue.path)}
              </option>
            `)}
        </select>
        ${te(K,he)}
        ${U(ce)}
        ${l||c?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function w(){Ue(x(),e)}return w(),a=t.subscribe(()=>w()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",E),Ue(i``,e)}}}var nd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function aa(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function sd(e,t,r=aa()){return{id:r,type:e,payload:t}}function od(e={}){let t=ot("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,c=!0,d=new Map,_=[],m=new Map,b=new Set;function E(x){for(let w of Array.from(b))try{w(x)}catch{}}function k(){if(!c||l)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),w=(r.jitterRatio||0)*x,S=Math.max(0,Math.round(x+(Math.random()*2-1)*w));t("ws retry in %d ms (attempt %d)",S,a+1),l=setTimeout(()=>{l=null,te()},S)}function D(x){try{s?.send(JSON.stringify(x))}catch(w){t("ws send failed",w)}}function q(){for(o="open",t("ws open"),E(o),a=0;_.length;){let x=_.shift();x&&D(x)}}function A(x){let w;try{w=JSON.parse(String(x.data))}catch{t("ws received non-JSON message");return}if(!w||typeof w.id!="string"||typeof w.type!="string"){t("ws received invalid envelope");return}if(d.has(w.id)){let H=d.get(w.id);d.delete(w.id),w.ok?H?.resolve(w.payload):H?.reject(w.error||new Error("ws error"));return}let S=m.get(w.type);if(S&&S.size>0)for(let H of Array.from(S))try{H(w.payload)}catch(K){t("ws event handler error",K)}else t("ws received unhandled message type: %s",w.type)}function U(){o="closed",t("ws closed"),E(o);for(let[x,w]of d.entries())w.reject(new Error("ws disconnected")),d.delete(x);a+=1,k()}function te(){if(!c)return;let x=n();try{s=new WebSocket(x),t("ws connecting %s",x),o="connecting",E(o),s.addEventListener("open",q),s.addEventListener("message",A),s.addEventListener("error",()=>{}),s.addEventListener("close",U)}catch(w){t("ws connect failed %o",w),k()}}return te(),{send(x,w){if(!nd.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let S=aa(),H=sd(x,w,S);return t("send %s id=%s",x,S),new Promise((K,he)=>{d.set(S,{resolve:K,reject:he,type:x}),s&&s.readyState===s.OPEN?D(H):(t("queue %s id=%s (state=%s)",x,S,o),_.push(H))})},on(x,w){m.has(x)||m.set(x,new Set);let S=m.get(x);return S?.add(w),()=>{S?.delete(w)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},reconnect(){c=!0,l&&(clearTimeout(l),l=null),a=0,te()},close(){c=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function am(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function im(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var ia=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ad=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],kr="tab:worker:closed",lm="bdui.worker.done-range",id=wc,ld="worker:queue",cd="worker:parallel-analysis",dd="ui:order",ud="ui:display-policy",pd="exec:presets",$r="tab:board:closed",fd="beads-ui.board.closed-range";function cm(e){let t=ot("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ue(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&Pc(s),o&&a&&l&&c){let Re=function(f,p){let I="Request failed",G="";if(f&&typeof f=="object"){let Le=f;if(typeof Le.message=="string"&&Le.message.length>0&&(I=Le.message),typeof Le.details=="string")G=Le.details;else if(Le.details&&typeof Le.details=="object")try{G=JSON.stringify(Le.details,null,2)}catch{G=""}}else typeof f=="string"&&f.length>0&&(I=f);let fe=p&&p.length>0?`Failed to load ${p}`:"Request failed";Ze.open(fe,I,G)},$e=function(f){return`${u.getState().workspace.current?.path||""}\0${f}`},C=function(){Se&&(Se().catch(()=>{}),Se=null),P=null,z=null},ee=function(f){L=f;let p=()=>{L!==f||u.getState().selected_id!==f||(L=null,B(f))};if(!ae){re.then(p);return}p()},Y=function(f,p,I,G,fe){return I!==N[p]?(fe().catch(()=>{}),!1):(f.set(G,fe),!0)},Ie=function(){let f=u.getState();gt(f.view==="board"),W(f.view==="worker"),Ne(f.view==="monitor"),ye(f.view==="board"||f.view==="worker"||Pe||!!f.selected_id)},Ke=function(){let f=Rr(qe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},mt=function(){let f=Rr(Ce);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},gt=function(f){if(f)for(let[p,I]of ia){if(Z.has(p)||$.has(p))continue;let G=p===$r?Ke():{type:I};try{Oe.register(p,G)}catch(xe){t("register %s store failed: %o",p,xe)}$.add(p);let fe=N.board,Le=!1;ke.subscribeList(p,G).then(xe=>{Le=!Y(Z,"board",fe,p,xe)}).catch(xe=>{t("subscribe %s failed: %o",p,xe),Re(xe,"board")}).finally(()=>{$.delete(p),Le&&Ie()})}else at()},at=function(){N.board+=1;for(let[f]of ia){let p=Z.get(f);p&&(p().catch(()=>{}),Z.delete(f));try{Oe.unregister(f)}catch(I){t("unregister %s failed: %o",f,I)}}},W=function(f){if(!f){J();return}for(let[p,I]of ad){if(st.has(p)||$.has(p))continue;let G=p===kr?mt():{type:I};try{Oe.register(p,G)}catch(xe){t("register %s store failed: %o",p,xe)}$.add(p);let fe=N.worker,Le=!1;ke.subscribeList(p,G).then(xe=>{Le=!Y(st,"worker",fe,p,xe)}).catch(xe=>{t("subscribe %s failed: %o",p,xe),Re(xe,"worker")}).finally(()=>{$.delete(p),Le&&Ie()})}},J=function(){N.worker+=1;for(let[f]of ad){let p=st.get(f);p&&(p().catch(()=>{}),st.delete(f));try{Oe.unregister(f)}catch(I){t("unregister %s failed: %o",f,I)}}},ye=function(f){if(!f){me();return}dt||(Ae("subscribe-worker-queue",{id:ld}).catch(p=>{t("subscribe-worker-queue failed: %o",p)}),Ae("subscribe-worker-parallel-analysis",{id:cd}).catch(p=>{t("subscribe-worker-parallel-analysis failed: %o",p)}),dt=()=>(Ae("unsubscribe-worker-parallel-analysis",{id:cd}),Ae("unsubscribe-worker-queue",{id:ld})))},me=function(){dt&&(dt().catch(()=>{}),dt=null),X.clear()},Ne=function(f){if(!f){et();return}de||(Ae("subscribe-monitor-pipeline",{id}).catch(p=>{t("subscribe-monitor-pipeline failed: %o",p)}),de=()=>Ae("unsubscribe-monitor-pipeline",{id}))},et=function(){de&&(de().catch(()=>{}),de=null)},De=function(){Ve||(Ae("subscribe-ui-order",{id:dd}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Ve=()=>Ae("unsubscribe-ui-order",{id:dd}))},Qe=function(){Ve&&(Ve().catch(()=>{}),Ve=null),we.clear()},ut=function(){Ee||(Ae("subscribe-display-policy",{id:ud}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Ee=()=>Ae("unsubscribe-display-policy",{id:ud}))},Et=function(){Ee&&(Ee().catch(()=>{}),Ee=null),R.clear()},Ft=function(){Lt||(Ae("subscribe-impl-presets",{id:pd}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),Lt=()=>Ae("unsubscribe-impl-presets",{id:pd}))},qt=function(f){if(!f)return"Unknown";let p=f.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"};var d=Re,_=$e,m=C,b=ee,E=Y,k=Ie,D=Ke,q=mt,A=gt,U=at,te=W,x=J,w=ye,S=me,H=Ne,K=et,he=De,ce=Qe,se=ut,ue=Et,Fe=Ft,We=qt;let Ge=document.getElementById("header-loading"),He=hi(Ge),Ze=Vl(e),ve=od(),Ae=He.wrapSend((f,p)=>ve.send(f,p)),ke=di(Ae),Oe=ui(),pe=_i(),X=fi(),V=Ka(),we=pi(),R=Va(),T=Ya(),be=Za();ve.on("impl-presets-snapshot",f=>{let p=f;p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&T.set({revision:p.revision,presets:p.presets})}),ve.on("monitor-pipeline-snapshot",f=>{let p=f;if(!(!p||!Array.isArray(p.workspaces)))try{V.set(p.workspaces,p.workspaces_state)}catch{}}),ve.on("ui-order-snapshot",f=>{let p=f;if(p&&typeof p.revision=="number")try{we.set({revision:p.revision,order:p.order&&typeof p.order=="object"?p.order:{}})}catch{}}),ve.on("display-policy-snapshot",f=>{let p=f;if(p&&p.policy&&typeof p.policy=="object")try{R.set(p.policy)}catch{}}),ve.on("session-log-snapshot",f=>{let p=f;if(p&&typeof p.attempt_id=="string")try{be.set(p.attempt_id,Array.isArray(p.lines)?p.lines:[],typeof p.last_event_at=="number"?p.last_event_at:null)}catch{}}),ve.on("session-log-append",f=>{let p=f;if(p&&typeof p.attempt_id=="string")try{be.append(p.attempt_id,p.event)}catch{}}),ve.on("snapshot",f=>{let p=f,I=p&&typeof p.id=="string"?p.id:"",G=I?Oe.getStore(I):null;if(G&&p&&p.type==="snapshot")try{G.applyPush(p)}catch{}}),ve.on("upsert",f=>{let p=f,I=p&&typeof p.id=="string"?p.id:"",G=I?Oe.getStore(I):null;if(G&&p&&p.type==="upsert")try{G.applyPush(p)}catch{}}),ve.on("delete",f=>{let p=f,I=p&&typeof p.id=="string"?p.id:"",G=I?Oe.getStore(I):null;if(G&&p&&p.type==="delete")try{G.applyPush(p)}catch{}});let Se=null,P=null,z=null,L=null,Q=()=>{},re=new Promise(f=>{Q=()=>f(void 0)}),ae=!1,_e=!1;async function B(f){let p=$e(f);if(p===P||p===z)return;z=p;let I=`detail:${f}`,G={type:"issue-detail",params:{id:f}};try{Oe.register(I,G)}catch(fe){t("register detail store failed: %o",fe)}try{let fe=await ke.subscribeList(I,G);if(u.getState().selected_id!==f||$e(f)!==p){await fe().catch(()=>{});return}Se&&await Se().catch(()=>{}),Se=fe,P=p}catch(fe){t("detail subscribe failed: %o",fe),Re(fe,"issue details")}finally{z===p&&(z=null)}}let Z=new Map,$=new Set,N={board:0,worker:0},Pe=!1,qe=Rt;try{let f=window.localStorage.getItem(fd);Pt(f)&&(qe=f)}catch{}let Ce=Rt;try{let f=window.localStorage.getItem(lm);Pt(f)&&(Ce=f)}catch{}async function lt(f){if(!Pt(f)||f===qe)return;qe=f;try{window.localStorage.setItem(fd,f)}catch{}let p=Z.get($r);if(!p)return;Z.delete($r),await p().catch(()=>{});let I=Ke();try{Oe.register($r,I)}catch(G){t("register %s store failed: %o",$r,G)}try{let G=await ke.subscribeList($r,I);Z.set($r,G)}catch(G){t("re-subscribe %s failed: %o",$r,G),Re(G,"board")}}async function kt(f){if(!Pt(f)||f===Ce)return;Ce=f;let p=st.get(kr);if(!p)return;st.delete(kr),await p().catch(()=>{});let I=mt();try{Oe.register(kr,I)}catch(G){t("register %s store failed: %o",kr,G)}try{let G=await ke.subscribeList(kr,I);st.set(kr,G)}catch(G){t("re-subscribe %s failed: %o",kr,G),Re(G,"worker")}}let st=new Map,dt=null,de=null,Ve=null,Ee=null,Lt=null;async function xr(){Ee=null,R.clear(),Lt=null,T.clear(),dt=null,de=null,Z.clear(),st.clear(),N.board+=1,N.worker+=1,Ft();let f=u.getState().workspace.current?.path;if(f)try{await ve.send("set-workspace",{path:f})}catch(I){t("workspace restore after reconnect failed: %o",I);return}ut();let p=u.getState();gt(p.view==="board"),W(p.view==="worker"),Ne(p.view==="monitor"),ye(p.view==="board"||p.view==="worker"||!!p.selected_id)}async function bt(){t("clearing all subscriptions for workspace switch"),at(),J(),me(),pe.clear(),Qe(),De(),Et(),ut(),C();let f=u.getState();if(f.selected_id)try{Oe.unregister(`detail:${f.selected_id}`)}catch{}let p=u.getState();gt(p.view==="board"),W(p.view==="worker"),Ne(p.view==="monitor"),ye(p.view==="board"||p.view==="worker"||!!p.selected_id),p.selected_id&&ee(p.selected_id)}async function ht(f){t("requesting workspace switch to %s",f),_e=!0;try{let p=await ve.send("set-workspace",{path:f});t("workspace switch result: %o",p),p&&p.workspace&&(u.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),p.changed&&(await bt(),le("Switched to "+qt(f),"success",2e3)))}catch(p){throw t("workspace switch failed: %o",p),le("Failed to switch workspace","error",3e3),p}finally{_e=!1}}async function nr(f){t("requesting workspace git pull for %s",f);try{let p=await ve.send("git-pull-workspace",{});t("workspace git pull result: %o",p);let I=p?.status;if(I==="up_to_date"){le("Already up to date","success",2e3);return}if(I==="stash_pop_conflict"){le("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}le("Git pulled "+qt(f),"success",2e3)}catch(p){t("workspace git pull failed: %o",p);let I=p?.code,G=p?.message;if(I==="rebase_conflict"){le("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(I==="rebase_conflict_abort_failed"){le("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(I==="busy"){le("Git pull skipped: another operation is running","warning",3e3);return}let fe=G?`: ${G}`:"";throw le(`Git pull failed${fe}`,"error",3e3),p}}async function sr(f,p){t("setting workspace visibility %s \u2192 %s",f,String(p));try{await ve.send("set-workspace-visibility",{path:f,visible:p}),await Bt()}catch(I){t("workspace visibility update failed: %o",I),le("Failed to update project visibility","error",3e3)}}async function Bt(){try{let f=await ve.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let p=f.workspaces.map(Le=>({path:Le.path,database:Le.database,pid:Le.pid,version:Le.version})),I=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,G=Array.isArray(f.hidden)?f.hidden.filter(Le=>typeof Le=="string"):[];u.setState({workspace:{current:I,available:p,hidden:G}});let fe=window.localStorage.getItem("beads-ui.workspace");fe&&(!p.some(xe=>xe.path===fe)||G.includes(fe)?window.localStorage.removeItem("beads-ui.workspace"):I&&fe!==I.path&&(t("restoring saved workspace preference: %s",fe),await ht(fe)))}}catch(f){t("failed to load workspaces: %o",f)}}ve.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(u.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Bt(),bt())});let yt=!1;if(typeof ve.onConnection=="function"){let f=p=>{t("ws state %s",p),p==="reconnecting"||p==="closed"?(yt=!0,le("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&yt&&(yt=!1,le("Reconnected","success",2200),im(u,(I,G)=>{t(`${I}: %o`,G)}),xr())};ve.onConnection(f)}let Qt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(Qt=f)}catch(f){t("view parse error: %o",f)}let u=bi({config:am(),view:Qt});ve.on("worker-queue-snapshot",f=>{let p=f;if(!p||!p.queue)return;let I=u.getState().workspace.current?.path;if(typeof I=="string"&&I.length>0&&p.root_dir!==I){t("dropping worker-queue snapshot for %s",String(p.root_dir));return}try{pe.set(p.queue)}catch{}}),ve.on("worker-parallel-analysis-snapshot",f=>{let p=f;if(!p)return;let I=u.getState().workspace.current?.path;if(!(typeof I=="string"&&I.length>0&&typeof p.root_dir=="string"&&p.root_dir!==I))try{X.set({settings:p.settings,job:p.job??null,last_good:p.last_good??null})}catch{}});let y=mi(u);y.start();let F=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),ie=async(f,p)=>{try{return await Ae(f,p)}catch(I){if(F.has(f))throw I;return[]}};n&&$c(n,u,y);let j=document.getElementById("workspace-picker");j&&rd(j,u,ht,nr,sr);let h=Ec(e,(f,p)=>Ae(f,p));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>h.open())}catch{}let O=Ic(e,{policyStore:R,queueStore:pe,implPresetStore:T,transport:(f,p)=>Ae(f,p),onOpenChange:f=>{Pe=f,Ie()},labelOptions:()=>{let f=new Set;for(let[p]of ia)for(let I of Oe.snapshotFor(p)||[]){let G=I.labels;if(Array.isArray(G))for(let fe of G)typeof fe=="string"&&fe.length>0&&f.add(fe)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>O.open()))}catch{}let ne=Ti(o,{gotoIssue:f=>y.gotoIssue(f),issueStores:Oe,transport:ie,workerQueueStore:pe,uiOrderStore:we,displayPolicyStore:R,closedRange:qe,onClosedRangeChange:f=>{lt(f)},onNewIssue:()=>h.open()}),Te=sa(a,{transport:ie,issueStores:Oe,queueStore:pe,analysisStore:X,sessionLogStore:be,uiOrderStore:we,gotoIssue:f=>u.setState({selected_id:f}),getWorkspacePath:()=>u.getState().workspace.current?.path,doneRange:Ce,onDoneRangeChange:f=>{kt(f)}}),Je=kc(l,{transport:ie,pipelineStore:V,execPresetStore:T,gotoIssue:f=>y.gotoIssue(f),getWorkspacePath:()=>u.getState().workspace.current?.path,switchWorkspace:f=>ht(f)}),je=Gl(c,{issueStores:Oe,transport:ie,queueStore:pe,execPresetStore:T,sessionLogStore:be,getWorkspacePath:()=>u.getState().workspace.current?.path,onNavigate:f=>{u.getState().view==="worker"?u.setState({selected_id:f}):y.gotoIssue(f)},onClose:()=>{let f=u.getState();u.setState({selected_id:null});try{y.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{O.open("session")}}),ge=u.getState().selected_id;ge&&(c.hidden=!1,je.load(ge),ee(ge)),u.subscribe(f=>{let p=f.selected_id;p?(c.hidden=!1,je.load(p),_e||ee(p)):(je.clear(),c.hidden=!0,C())});let v=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",gt(f.view==="board"),W(f.view==="worker"),Ne(f.view==="monitor"),ye(f.view==="board"||f.view==="worker"||Pe||!!f.selected_id),!f.selected_id&&f.view==="board"&&ne.load(),f.view==="worker"&&Te.load(),f.view==="monitor"?Je.load():Je.pause(),window.localStorage.setItem("beads-ui.view",f.view)};u.subscribe(v),v(u.getState()),De(),ut(),Ft(),Bt().finally(()=>{ae=!0,Q()}),window.addEventListener("keydown",f=>{let p=f.ctrlKey||f.metaKey,I=String(f.key||"").toLowerCase(),G=f.target,fe=G&&G.tagName?String(G.tagName).toLowerCase():"",Le=fe==="input"||fe==="textarea"||fe==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;p&&I==="n"&&(Le||(f.preventDefault(),h.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&cm(t)});export{cm as bootstrap,am as readBootstrapConfig,im as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
