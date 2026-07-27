var Ko=Object.create;var Fr=Object.defineProperty;var Zo=Object.getOwnPropertyDescriptor;var Xo=Object.getOwnPropertyNames;var Qo=Object.getPrototypeOf,Jo=Object.prototype.hasOwnProperty;var ei=(t,e,r)=>e in t?Fr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Br=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var ti=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Xo(e))!Jo.call(t,s)&&s!==r&&Fr(t,s,{get:()=>e[s],enumerable:!(n=Zo(e,s))||n.enumerable});return t};var ri=(t,e,r)=>(r=t!=null?Ko(Qo(t)):{},ti(e||!t||!t.__esModule?Fr(r,"default",{value:t,enumerable:!0}):r,t));var ue=(t,e,r)=>ei(t,typeof e!="symbol"?e+"":e,r);var is=Br((Vl,os)=>{var Nt=1e3,Pt=Nt*60,Ft=Pt*60,Tt=Ft*24,ai=Tt*7,li=Tt*365.25;os.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return ci(t);if(r==="number"&&isFinite(t))return e.long?ui(t):di(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function ci(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*li;case"weeks":case"week":case"w":return r*ai;case"days":case"day":case"d":return r*Tt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ft;case"minutes":case"minute":case"mins":case"min":case"m":return r*Pt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Nt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function di(t){var e=Math.abs(t);return e>=Tt?Math.round(t/Tt)+"d":e>=Ft?Math.round(t/Ft)+"h":e>=Pt?Math.round(t/Pt)+"m":e>=Nt?Math.round(t/Nt)+"s":t+"ms"}function ui(t){var e=Math.abs(t);return e>=Tt?pr(t,e,Tt,"day"):e>=Ft?pr(t,e,Ft,"hour"):e>=Pt?pr(t,e,Pt,"minute"):e>=Nt?pr(t,e,Nt,"second"):t+" ms"}function pr(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var ls=Br((Kl,as)=>{function pi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=is(),r.destroy=c,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let m=0;for(let b=0;b<p.length;b++)m=(m<<5)-m+p.charCodeAt(b),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=e;function r(p){let m,b=null,v,k;function E(...F){if(!E.enabled)return;let z=E,V=Number(new Date),H=V-(m||V);z.diff=H,z.prev=m,z.curr=V,m=V,F[0]=r.coerce(F[0]),typeof F[0]!="string"&&F.unshift("%O");let N=0;F[0]=F[0].replace(/%([a-zA-Z%])/g,(x,$)=>{if(x==="%%")return"%";N++;let h=r.formatters[$];if(typeof h=="function"){let M=F[N];x=h.call(z,M),F.splice(N,1),N--}return x}),r.formatArgs.call(z,F),(z.log||r.log).apply(z,F)}return E.namespace=p,E.useColors=r.useColors(),E.color=r.selectColor(p),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(v!==r.namespaces&&(v=r.namespaces,k=r.enabled(p)),k),set:F=>{b=F}}),typeof r.init=="function"&&r.init(E),E}function n(p,m){let b=r(this.namespace+(typeof m>"u"?":":m)+p);return b.log=this.log,b}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let m=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of m)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function o(p,m){let b=0,v=0,k=-1,E=0;for(;b<p.length;)if(v<m.length&&(m[v]===p[b]||m[v]==="*"))m[v]==="*"?(k=v,E=b,v++):(b++,v++);else if(k!==-1)v=k+1,E++,b=E;else return!1;for(;v<m.length&&m[v]==="*";)v++;return v===m.length}function i(){let p=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),p}function l(p){for(let m of r.skips)if(o(p,m))return!1;for(let m of r.names)if(o(p,m))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}as.exports=pi});var cs=Br((Ye,fr)=>{Ye.formatArgs=hi;Ye.save=mi;Ye.load=gi;Ye.useColors=fi;Ye.storage=_i();Ye.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ye.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function fi(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function hi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+fr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}Ye.log=console.debug||console.log||(()=>{});function mi(t){try{t?Ye.storage.setItem("debug",t):Ye.storage.removeItem("debug")}catch{}}function gi(){let t;try{t=Ye.storage.getItem("debug")||Ye.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function _i(){try{return localStorage}catch{}}fr.exports=ls()(Ye);var{formatters:bi}=fr.exports;bi.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Gt=globalThis,dr=Gt.trustedTypes,Gn=dr?dr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Xn="$lit$",gt=`lit$${Math.random().toFixed(9).slice(2)}$`,Qn="?"+gt,ni=`<${Qn}>`,xt=document,jt=()=>xt.createComment(""),Yt=t=>t===null||typeof t!="object"&&typeof t!="function",jr=Array.isArray,si=t=>jr(t)||typeof t?.[Symbol.iterator]=="function",qr=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jn=/-->/g,Yn=/>/g,vt=RegExp(`>|${qr}(?:([^\\s"'>=/]+)(${qr}*=${qr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vn=/'/g,Kn=/"/g,Jn=/^(?:script|style|textarea|title)$/i,Yr=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=Yr(1),zl=Yr(2),Hl=Yr(3),St=Symbol.for("lit-noChange"),ke=Symbol.for("lit-nothing"),Zn=new WeakMap,$t=xt.createTreeWalker(xt,129);function es(t,e){if(!jr(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gn!==void 0?Gn.createHTML(e):e}var oi=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=Wt;for(let l=0;l<r;l++){let a=t[l],c,p,m=-1,b=0;for(;b<a.length&&(i.lastIndex=b,p=i.exec(a),p!==null);)b=i.lastIndex,i===Wt?p[1]==="!--"?i=jn:p[1]!==void 0?i=Yn:p[2]!==void 0?(Jn.test(p[2])&&(s=RegExp("</"+p[2],"g")),i=vt):p[3]!==void 0&&(i=vt):i===vt?p[0]===">"?(i=s??Wt,m=-1):p[1]===void 0?m=-2:(m=i.lastIndex-p[2].length,c=p[1],i=p[3]===void 0?vt:p[3]==='"'?Kn:Vn):i===Kn||i===Vn?i=vt:i===jn||i===Yn?i=Wt:(i=vt,s=void 0);let v=i===vt&&t[l+1].startsWith("/>")?" ":"";o+=i===Wt?a+ni:m>=0?(n.push(c),a.slice(0,m)+Xn+a.slice(m)+gt+v):a+gt+(m===-2?l:v)}return[es(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Vt=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,p]=oi(e,r);if(this.el=t.createElement(c,n),$t.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=$t.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Xn)){let b=p[i++],v=s.getAttribute(m).split(gt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:o,name:k[2],strings:v,ctor:k[1]==="."?zr:k[1]==="?"?Hr:k[1]==="@"?Wr:Mt}),s.removeAttribute(m)}else m.startsWith(gt)&&(a.push({type:6,index:o}),s.removeAttribute(m));if(Jn.test(s.tagName)){let m=s.textContent.split(gt),b=m.length-1;if(b>0){s.textContent=dr?dr.emptyScript:"";for(let v=0;v<b;v++)s.append(m[v],jt()),$t.nextNode(),a.push({type:2,index:++o});s.append(m[b],jt())}}}else if(s.nodeType===8)if(s.data===Qn)a.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(gt,m+1))!==-1;)a.push({type:7,index:o}),m+=gt.length-1}o++}}static createElement(e,r){let n=xt.createElement("template");return n.innerHTML=e,n}};function Ot(t,e,r=t,n){if(e===St)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Yt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Ot(t,s._$AS(t,e.values),s,n)),e}var Ur=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??xt).importNode(r,!0);$t.currentNode=s;let o=$t.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new Kt(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new Gr(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=$t.nextNode(),i++)}return $t.currentNode=xt,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},Kt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=ke,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ot(this,e,r),Yt(e)?e===ke||e==null||e===""?(this._$AH!==ke&&this._$AR(),this._$AH=ke):e!==this._$AH&&e!==St&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):si(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ke&&Yt(this._$AH)?this._$AA.nextSibling.data=e:this.T(xt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Vt.createElement(es(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Ur(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=Zn.get(e.strings);return r===void 0&&Zn.set(e.strings,r=new Vt(e)),r}k(e){jr(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(jt()),this.O(jt()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Mt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=ke,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ke}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Ot(this,e,r,0),i=!Yt(e)||e!==this._$AH&&e!==St,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Ot(this,l[n+a],r,a),c===St&&(c=this._$AH[a]),i||(i=!Yt(c)||c!==this._$AH[a]),c===ke?e=ke:e!==ke&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===ke?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},zr=class extends Mt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ke?void 0:e}},Hr=class extends Mt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ke)}},Wr=class extends Mt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Ot(this,e,r,0)??ke)===St)return;let n=this._$AH,s=e===ke&&n!==ke||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==ke&&(n===ke||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Gr=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ot(this,e)}};var ii=Gt.litHtmlPolyfillSupport;ii?.(Vt,Kt),(Gt.litHtmlVersions??(Gt.litHtmlVersions=[])).push("3.3.1");var ce=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Kt(e.insertBefore(jt(),o),o,void 0,r??{})}return s._$AI(t),s};var ur="today",ts=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Vr(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function rs(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function ns(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ss(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var ds=ri(cs(),1);function we(t){return(0,ds.default)(`beads-ui:${t}`)}function st(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function At(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function fs(t,e){let r=st(t.created_at),n=st(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function hs(t,e){let r=st(t.updated_at),n=st(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function ms(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=st(t.created_at),o=st(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function gs(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var yi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function us(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ps(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=yi.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function _s(t,e){let r=us(t),n=us(e);if(r!==n)return r<n?-1:1;let s=ps(t),o=ps(e);if(s!==o)return s<o?-1:1;let i=st(t&&t.created_at),l=st(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var Kr=2**20;function Bt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-st(t&&t.created_at)}function hr(t){return(e,r)=>{let n=Bt(e,t),s=Bt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function Zr(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Bt(l,r)-Kr};if(!l)return{rank:Bt(i,r)+Kr};let a=Bt(i,r),c=Bt(l,r),p=(a+c)/2;return a<p&&p<c?{rank:p}:{renormalize:n.map((m,b)=>({bead_id:m.id,rank:b*Kr}))}}function Xr(t,e={}){let r=we(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||At;function c(){for(let b of Array.from(i))try{b()}catch{}}function p(){s=Array.from(n.values()).sort(a)}function m(b){if(l||!b||b.id!==t)return;let v=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,v),!(v<=o&&b.type!=="snapshot")){if(b.type==="snapshot"){if(v<=o)return;n.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let E of k)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);p(),o=v,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let E=n.get(k.id);if(!E)n.set(k.id,k);else{let F=Number.isFinite(E.updated_at)?E.updated_at:0,z=Number.isFinite(k.updated_at)?k.updated_at:0;if(F<=z){for(let V of Object.keys(E))V in k||delete E[V];for(let[V,H]of Object.entries(k))E[V]=H}}p()}o=v,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(n.delete(k),p()),o=v,c()}}}return{id:t,subscribe(b){return i.add(b),()=>{i.delete(b)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(b){return n.get(b)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function mr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function bs(t){let e=we("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let p=Array.isArray(a.added)?a.added:[],m=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let v of Array.from(c)){let k=r.get(v);if(!k)continue;let E=k.itemsById;for(let F of p)typeof F=="string"&&F.length>0&&E.set(F,!0);for(let F of m)typeof F=="string"&&F.length>0&&E.set(F,!0);for(let F of b)typeof F=="string"&&F.length>0&&E.delete(F)}}async function o(l,a){let c=mr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let m=r.get(l);if(m&&m.key!==c){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let p=n.get(c);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(m){let b=r.get(l)||null;if(b){let v=n.get(b.key);v&&(v.delete(l),v.size===0&&n.delete(b.key))}throw r.delete(l),m}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let m=r.get(l)||null;if(m){let b=n.get(m.key);b&&(b.delete(l),b.size===0&&n.delete(m.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:mr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let p of a.itemsById.keys())c[p]=!0;return c}}}}function ys(){let t=we("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,p){let m=c?mr(c):"",b=r.get(a)||"",v=e.has(a);if(t("register %s key=%s (prev=%s)",a,m,b),v&&b&&m&&b!==m){let k=e.get(a);if(k)try{k.dispose()}catch{}let E=s.get(a);if(E){try{E()}catch{}s.delete(a)}let F=Xr(a,p);e.set(a,F);let z=F.subscribe(()=>o());s.set(a,z)}else if(!v){let k=Xr(a,p);e.set(a,k);let E=k.subscribe(()=>o());s.set(a,E)}return r.set(a,m),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let p=s.get(a);if(p){try{p()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function ws(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function ks(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Qr(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function wi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ki(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function vs(t){let e=we("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):wi(n),i=ki(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=Qr(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?Qr(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var vi=Object.freeze({workspace_config:{default_workspace:null}});function $s(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:vi.workspace_config.default_workspace}}}function xs(t={}){let e=we("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:$s(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?$s(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,p)=>c!==r.workspace.hidden[p]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,p)=>c===r.worker.show_closed_children[p])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ss(t){let e=we("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(m,b)=>{let v=s++,k=Date.now();n.set(v,{type:m,start_ts:k}),e("request start id=%d type=%s count=%d",v,m,r+1),i();let E=!1,F=()=>{E||(E=!0,n.delete(v),l())},z=setTimeout(()=>{E||(e("request TIMEOUT id=%d type=%s elapsed=%dms",v,m,Date.now()-k),F())},3e4);try{let V=await c(m,b),H=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",v,m,H),V}catch(V){let H=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",v,m,H,V),V}finally{clearTimeout(z),F()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([p,m])=>({id:p,type:m.type,elapsed_ms:c-m.start_ts}))}}}function Q(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function gr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(gs),a;switch(l){case"created_desc":return a.sort(At),a;case"created_asc":return a.sort(fs),a;case"updated_desc":return a.sort(hs),a;case"priority":return a.sort(ms),a;case"manual":default:{let c=r();return c?a.sort(hr(c)):a.sort(At),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function _r(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},p=n(Zr(l,a,c.order),i);s(c,p);let m=await e("ui-order-set",{expected_revision:c.revision,entries:p});if(m&&m.conflict){let b={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(b);let v=n(Zr(l,a,b.order),i);s(b,v);let k=await e("ui-order-set",{expected_revision:b.revision,entries:v});k&&k.applied&&r.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function br(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function Jr(t,e){return!e||typeof t!="string"||t.length===0||br(e.visible_labels).includes(t)?!0:br(e.hidden_labels).includes(t)?!1:!br(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Ts(t,e){return br(t).filter(r=>Jr(r,e))}function Et(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function en(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function _t(t){let e=en(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function tn(t,e){let r=en(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var $i={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},xi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Si={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},Ti={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function Ai(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function Ei(t,e,r){let n=$i[t]||t,s=e&&e.state||"empty",o=Ti[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${xi[t]||t}
      </div>
    </div>
  `}function yr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Si[r],s=t.stages,o=Ai(n,s,String(e||"open"));return d`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>Ei(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function Ci(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var As=2;function Ri(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,As).join(", "),s=r.length-As,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function Ii(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Et(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Et(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Et(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Ts(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Et(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Et(r,"blocked")&&s.push(...Ri(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function Li(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Di(t){let e=tn(t.created_at),r=tn(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
    ${e?d`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${_t(t.created_at)}`}
          >생성 ${e}</span
        >`:""}
    ${e&&r?d`<span class="board-card__time-sep">·</span>`:""}
    ${r?d`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${_t(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Oi(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(_s):r.children;return d`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?d`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${i=>e.onRollupToggle&&e.onRollupToggle(i,t.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:d`<span class="board-card__roll-none">children 없음</span>`}
        ${Di(t)}
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
                  @click=${a=>e.onChildClick&&e.onChildClick(a,i.id)}
                >
                  <span class=${Li(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Es(t,e){let r=Ci(t.priority);return d`
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
        ${r?d`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${t.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Ii(t,e)}
      ${t.workflow&&Et(e.policy||null,"stepper")?yr(t.workflow,t.status):""}
      ${Oi(t,e)}
    </article>
  `}function Ct(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
        ${n?d`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${e.onClosedRangeChange}
            >
              ${ts.map(o=>d`<option
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
        ${t.items.map(o=>Es(o,e))}
      </div>
    </section>
  `}var Mi=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ni=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Pi=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Fi(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
      ${r.label_menu_open?d`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?d`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>d`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${t.labels.includes(o)}
                        @change=${()=>e.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?d`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${e.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Cs(t,e,r){return d`
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
        ${Mi.map(n=>d`<option
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
        ${Ni.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Fi(t,e,r)}
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
        ${Pi.map(n=>d`<option
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
  `}var Bi=200,qi={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},Ui=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Rs="beads-ui.board.sort",Is=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function zi(){try{let t=window.localStorage.getItem(Rs);if(t&&Is.has(t))return t}catch{}return"created_desc"}function Ls(t,e){let r=we("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,p=e.closedRange||ur,m=s?gr(s,i):null,b=_r({transport:o,uiOrderStore:i}),v=[],k=[],E=[],F=[],z=[],V=[],H=!1,N=0,S=zi(),x=new Map,$=new Map,h=new Map,M=new Set,B={search:"",priority:"",type:"",labels:[]},P=!1,q=null;function Ce(T){return String(T.status||"open")==="open"}function Ne(T){let C=String(T.status||"open");return C==="open"||C==="blocked"}function Se(T){let C=B.search.trim().toLowerCase(),j=B.priority,W=B.type,L=B.labels;return T.filter(g=>{if(C){let R=String(g.id||"").toLowerCase(),A=String(g.title||"").toLowerCase();if(!R.includes(C)&&!A.includes(C))return!1}if(j!==""&&String(g.priority)!==j||W!==""&&String(g.issue_type||"")!==W)return!1;if(L.length>0){let R=Array.isArray(g.labels)?g.labels:[];if(!L.some(A=>R.includes(A)))return!1}return!0})}function Je(){let T=new Set;for(let C of[v,k,E,F,z,V])for(let j of C){let W=Array.isArray(j.labels)?j.labels:[];for(let L of W)typeof L=="string"&&L.length>0&&T.add(L)}return Array.from(T).sort()}function ze(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function _e(){try{if(m){let T=m.selectBoardColumn("tab:board:in-progress","in_progress",S),C=m.selectBoardColumn("tab:board:blocked","blocked",S).filter(Ne),j=new Set(T.map(Y=>Y.id)),W=m.selectBoardColumn("tab:board:ready","ready",S).filter(Y=>Ce(Y)&&!j.has(Y.id)),L=m.selectBoardColumn("tab:board:resolved","resolved",S),g=m.selectBoardColumn("tab:board:deferred","deferred",S),R=H?g:[],A=m.selectBoardColumn("tab:board:closed","closed").slice(0,Bi),I=[...C,...W,...T,...L,...R,...A];$e(I);let J=new Set;for(let Y of I)Y&&Y.id&&!rn(Y)&&J.add(Y.id);let le=!ze();v=le?qt(C,J):C,k=le?qt(W,J):W,E=le?qt(T,J):T,F=le?qt(L,J):L,z=le?qt(R,J):R,N=g.length,V=le?qt(A,J):A,x=new Map;for(let Y of v)x.set(Y.id,"open");for(let Y of k)x.set(Y.id,"open");for(let Y of E)x.set(Y.id,"in_progress");for(let Y of F)x.set(Y.id,"resolved");for(let Y of z)x.set(Y.id,"deferred");for(let Y of V)x.set(Y.id,"closed");$=new Map;for(let Y of v)$.set(Y.id,"blocked-col");for(let Y of k)$.set(Y.id,"ready-col");for(let Y of E)$.set(Y.id,"in-progress-col");for(let Y of F)$.set(Y.id,"resolved-col");for(let Y of z)$.set(Y.id,"deferred-col");for(let Y of V)$.set(Y.id,"closed-col")}ye()}catch{v=[],k=[],E=[],F=[],z=[],V=[],h=new Map,ye()}}function $e(T){let C=new Map;for(let W of T)W&&W.id&&!C.has(W.id)&&C.set(W.id,W);let j=new Map;for(let W of C.values()){let L=rn(W);if(!L)continue;let g=j.get(L);g||(g=[],j.set(L,g)),g.push({id:W.id,title:W.title,status:W.status,metadata:W.metadata,created_at:W.created_at})}h=j}function Ve(T){let C=h.get(T)||[],j=0,W=null;for(let L of C)(L.status==="resolved"||L.status==="closed")&&(j+=1),!W&&L.status==="in_progress"&&(W=L);return{total:C.length,count:j,current:W,children:C}}function pe(T){return!M.has(T)}function lt(T,C){T.preventDefault(),T.stopPropagation(),M.has(C)?M.delete(C):M.add(C),ye()}function fe(T,C){T.preventDefault(),T.stopPropagation(),n(C)}function Ke(T,C){T.preventDefault(),T.stopPropagation(),n(C)}function ie(T,C){q||n(C)}function Pe(T,C){T.preventDefault(),T.stopPropagation(),Hi(C).then(j=>{j&&Q("\uBCF5\uC0AC\uB428","success",1200)})}function et(T,C){q=C,T.dataTransfer&&(T.dataTransfer.setData("text/plain",C),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging")}function Te(T){T.target.classList.remove("board-card--dragging"),y(),setTimeout(()=>{q=null},0)}function de(T){let C=String(T.target.value||"");!C||C===p||(p=C,a&&a(C),ye())}let be={onCardClick:ie,onCopyId:Pe,onDragStart:et,onDragEnd:Te,onClosedRangeChange:de,rollupFor:Ve,isExpanded:pe,onRollupToggle:lt,onChildClick:fe,onFromChipClick:Ke,get policy(){return l?l.get():null}};function Le(T){let C=T.target,j=t.querySelector(".board-filter__labels");C&&j&&j.contains(C)||De()}function He(T){T.key==="Escape"&&De()}function Re(){P||(P=!0,document.addEventListener("mousedown",Le),document.addEventListener("keydown",He),ye())}function De(){P&&(P=!1,document.removeEventListener("mousedown",Le),document.removeEventListener("keydown",He),ye())}let Ae={onSearchInput(T){B.search=String(T.target.value||""),_e()},onPriorityChange(T){B.priority=String(T.target.value||""),_e()},onTypeChange(T){B.type=String(T.target.value||""),_e()},onSortChange(T){let C=String(T.target.value||"");if(!(!Is.has(C)||C===S)){S=C;try{window.localStorage.setItem(Rs,C)}catch{}_e()}},onDeferredToggle(){H=!H,_e()},onLabelMenuToggle(){P?De():Re()},onLabelToggle(T){let C=B.labels.indexOf(T);C===-1?B.labels.push(T):B.labels.splice(C,1),_e()},onLabelClear(){B.labels.length!==0&&(B.labels=[],_e())},onNewIssue(){c&&c()}};function We(){let T=H?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Cs(B,Ae,{sort_mode:S,show_deferred:H,deferred_count:N,label_options:Je(),label_menu_open:P})}
        <div class=${T}>
          ${Ct({title:"Blocked",id:"blocked-col",items:Se(v)},be)}
          ${Ct({title:"Ready",id:"ready-col",items:Se(k)},be)}
          ${Ct({title:"In progress",id:"in-progress-col",items:Se(E)},be)}
          ${Ct({title:"Resolved",id:"resolved-col",items:Se(F)},be)}
          ${H?Ct({title:"Deferred",id:"deferred-col",items:Se(z)},be):""}
          ${Ct({title:"Closed",id:"closed-col",items:Se(V),is_closed:!0,closed_range:p},be)}
        </div>
      </div>
    `}function ye(){ce(We(),t),Ee()}function Ee(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let C of T)Array.from(C.querySelectorAll(".board-card")).forEach((W,L)=>{W.tabIndex=L===0?0:-1})}catch{}}async function Ge(T,C){if(!o){Q("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:T,status:C}),Q("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(j){r("update-status failed: %o",j),Q("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Oe(T){switch(T){case"blocked-col":return v;case"ready-col":return k;case"in-progress-col":return E;case"resolved-col":return F;case"deferred-col":return z;default:return[]}}function Ze(T,C,j){if(!o||!i)return;let W=Oe(T),L=W.find(J=>J.id===C);if(!L)return;let g=W.filter(J=>J.id!==C),R=j.closest?j.closest(".board-card"):null,A=g.length;if(R){let J=R.getAttribute("data-issue-id");if(J===C)return;let le=g.findIndex(Y=>Y.id===J);le>=0&&(A=le)}let I=g.slice();I.splice(A,0,L),b.applyReorder(C,I,A)}function y(){for(let T of Array.from(t.querySelectorAll(".board-column--drag-over")))T.classList.remove("board-column--drag-over")}let w=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let j=T.target.closest(".board-column");j&&j!==w&&(w&&w.classList.remove("board-column--drag-over"),j.classList.add("board-column--drag-over"),w=j)}),t.addEventListener("dragleave",T=>{let C=T.relatedTarget;(!C||!t.contains(C))&&w&&(w.classList.remove("board-column--drag-over"),w=null)}),t.addEventListener("drop",T=>{T.preventDefault(),w&&(w.classList.remove("board-column--drag-over"),w=null);let C=T.target,j=C.closest(".board-column");if(!j)return;let W=T.dataTransfer?.getData("text/plain")||"";if(!W)return;let L=j.id,g=$.get(W);if(g&&g===L){if(Ui.has(L)){if(S!=="manual"){Q("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ze(L,W,C)}return}let R=qi[L];if(!R){Q("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}x.get(W)!==R&&Ge(W,R)}),t.addEventListener("keydown",T=>{let C=T.target;if(!(C instanceof HTMLElement))return;let j=String(C.tagName||"").toLowerCase();if(j==="input"||j==="textarea"||j==="select"||j==="button"||j==="a"||C.isContentEditable===!0)return;let W=C.closest(".board-card");if(!W)return;let L=String(T.key||"");if(L==="Enter"||L===" "){T.preventDefault();let I=W.getAttribute("data-issue-id");I&&n(I);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;T.preventDefault();let g=W.closest(".board-column");if(!g)return;let R=Array.from(g.querySelectorAll(".board-card")),A=R.indexOf(W);if(L==="ArrowDown"&&A<R.length-1){U(W,R[A+1]);return}if(L==="ArrowUp"&&A>0){U(W,R[A-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let I=Array.from(t.querySelectorAll(".board-column")),J=I.indexOf(g),le=L==="ArrowRight"?1:-1,Y=J+le;for(;Y>=0&&Y<I.length;){let xe=I[Y].querySelector(".board-card");if(xe){U(W,xe);return}Y+=le}}});function U(T,C){try{T.tabIndex=-1,C.tabIndex=0,C.focus()}catch{}}let te=null;m&&m.subscribe&&(te=m.subscribe(()=>{try{_e()}catch{}}));let se=null;return l&&l.subscribe&&(se=l.subscribe(()=>{try{_e()}catch{}})),{async load(){r("load"),_e()},clear(){De(),te&&(te(),te=null),se&&(se(),se=null),t.replaceChildren(),v=[],k=[],E=[],F=[],z=[],V=[],x=new Map,$=new Map}}}function rn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function qt(t,e){return t.filter(r=>{let n=rn(r);return!(n&&e.has(n))})}async function Hi(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ut(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Wi={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Gi=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,ji=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function bt(t){return!!t&&typeof t=="object"}function nn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function Ds(t,e){let r=nn(t),n=nn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function Yi(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>bt(s)&&typeof s.text=="string"?s.text:"").join(""):bt(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Vi(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:Wi[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=nn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Ds(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=Ds(bt(l)?l.old_string:"",bt(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Os(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Gi.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:ji.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ki(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(bt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Os(o.text));else if(o.type==="tool_use"){let i=Vi(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(bt(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=Yi(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Zi(t){if(t.type==="item.completed"&&bt(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[Os(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Xi(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function Ms(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!bt(o))continue;let i=Xi(o)?Zi(o):Ki(o,r);for(let l of i)e.push(l)}return e}function wr(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function p(){if(!o||!n)return[];let $=n.get(o);return Ms($?$.lines:[])}function m($,h){if(h.kind==="gate")return d`<div class="sv__gate">${h.text}</div>`;if(h.kind==="phase")return d`<div class="sv__phase">${h.text}</div>`;if(h.kind==="result")return d`<div
        class="sv__result${h.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${h.success?"\u2713":"\u2717"}
        ${h.text||(h.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(h.kind==="error")return d`<div class="sv__error">⛔ ${h.text}</div>`;if(h.kind==="blocker")return d`<div class="sv__error">⛔ ${h.text}</div>`;if(h.kind==="tool"){let M=a.has($),B=h.tool==="Bash"?h.command:h.path||h.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>F($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${h.icon}</span>
          <span class="sv__tool-name">${h.tool}</span>
          ${B?d`<span class="sv__tool-detail">${B}</span>`:""}
          ${typeof h.added=="number"?d`<span class="sv__diff-add">+${h.added}</span>`:""}
          ${typeof h.removed=="number"?d`<span class="sv__diff-del">−${h.removed}</span>`:""}
          ${h.result?d`<span class="sv__tool-ok">→ ${h.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${b(h)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${h.text}</div>`}function b($){let h=[];if($.input!==void 0)try{h.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&h.push(`output:
${$.output}`),h.join(`

`)}function v(){if(!o)return d``;let $=p(),h=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",B=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>V(M)}
            >
              ⧉ ${M.slice(0,8)}
            </button>`:""}
        ${h?d`<span class="sv__meta">${h}</span>`:""}
        ${i.worktree?d`<span class="sv__wt" title=${i.worktree}
              >${i.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${B}
          @click=${z}
        >
          <span class="sv__follow-full">⇣ ${B}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>x()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${$.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:$.map((P,q)=>m(q,P))}
      </div>
    </div>`}function k(){ce(v(),t),l&&E()}function E(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function F($){a.has($)?a.delete($):a.add($),k()}function z(){l=!l,k()}function V($){Ut($).then(h=>{h?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function H($){!o||!$||(i={...i,...$},k())}function N($){let h=$.target;if(!h||!h.classList||!h.classList.contains("sv__body"))return;!(h.scrollHeight-h.scrollTop-h.clientHeight<=4)&&l&&(l=!1,k())}t.addEventListener("scroll",N,!0);function S($){let h=$&&$.attempt_id;h&&(o=h,i=$.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(k)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),k())}function x(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),ce(d``,t),s&&s()}return{open:S,updateMeta:H,close:x,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",N,!0),o=null,ce(d``,t)}}}function Qi(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function Ns(t,e){let r=Qi(t);return d`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?d`<div class="detail-empty">산출물 없음</div>`:d`
          ${r.map(n=>d`<div class="detail-art">
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
  `}var sn=["opus","sonnet","haiku","fable"],on=["low","medium","high","xhigh"],an=["codex","opus","fable","self","skip"],ln=["opus","fable","sonnet","haiku"],Ji=["standard","fast_track"],cn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function kr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:cn[t]||"(\uAE30\uBCF8)"}function Zt(t,e,r,n,s,o){return d`
    <div class="detail-kv">
      <span class="detail-kv__k">${e}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e}
        data-key=${t}
        @change=${i=>o.onChange(t,i.target.value)}
      >
        ${r.map(i=>d`<option value=${i.value} ?selected=${i.value===n}>
              ${i.label}
            </option>`)}
      </select>
    </div>
  `}function Xt(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function Ps(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Zt("orchestration_model","orchestration_model",Xt(sn,kr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${Zt("orchestration_effort","orchestration_effort",Xt(on,kr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${Zt("review_model","review_model",Xt(an,kr("review_model",s)),n.review_model||"",!1,e)}
    ${Zt("impl_model","impl_model",Xt(ln,kr("impl_model",s)),n.impl_model||"",!1,e)}
    ${Zt("workflow_mode","workflow_mode",Xt(Ji),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:js,setPrototypeOf:Fs,isFrozen:ea,getPrototypeOf:ta,getOwnPropertyDescriptor:ra}=Object,{freeze:Be,seal:nt,create:gn}=Object,{apply:_n,construct:bn}=typeof Reflect<"u"&&Reflect;Be||(Be=function(e){return e});nt||(nt=function(e){return e});_n||(_n=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});bn||(bn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var vr=qe(Array.prototype.forEach),na=qe(Array.prototype.lastIndexOf),Bs=qe(Array.prototype.pop),Qt=qe(Array.prototype.push),sa=qe(Array.prototype.splice),xr=qe(String.prototype.toLowerCase),dn=qe(String.prototype.toString),un=qe(String.prototype.match),Jt=qe(String.prototype.replace),oa=qe(String.prototype.indexOf),ia=qe(String.prototype.trim),ot=qe(Object.prototype.hasOwnProperty),Fe=qe(RegExp.prototype.test),er=aa(TypeError);function qe(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return _n(t,e,n)}}function aa(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return bn(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:xr;Fs&&Fs(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(ea(e)||(e[n]=o),s=o)}t[s]=!0}return t}function la(t){for(let e=0;e<t.length;e++)ot(t,e)||(t[e]=null);return t}function ft(t){let e=gn(null);for(let[r,n]of js(t))ot(t,r)&&(Array.isArray(n)?e[r]=la(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=ft(n):e[r]=n);return e}function tr(t,e){for(;t!==null;){let n=ra(t,e);if(n){if(n.get)return qe(n.get);if(typeof n.value=="function")return qe(n.value)}t=ta(t)}function r(){return null}return r}var qs=Be(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),pn=Be(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),fn=Be(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ca=Be(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),hn=Be(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),da=Be(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Us=Be(["#text"]),zs=Be(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),mn=Be(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Hs=Be(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),$r=Be(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ua=nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),pa=nt(/<%[\w\W]*|[\w\W]*%>/gm),fa=nt(/\$\{[\w\W]*/gm),ha=nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),ma=nt(/^aria-[\-\w]+$/),Ys=nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ga=nt(/^(?:\w+script|data):/i),_a=nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Vs=nt(/^html$/i),ba=nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Ws=Object.freeze({__proto__:null,ARIA_ATTR:ma,ATTR_WHITESPACE:_a,CUSTOM_ELEMENT:ba,DATA_ATTR:ha,DOCTYPE_NAME:Vs,ERB_EXPR:pa,IS_ALLOWED_URI:Ys,IS_SCRIPT_OR_DATA:ga,MUSTACHE_EXPR:ua,TMPLIT_EXPR:fa}),rr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ya=function(){return typeof window>"u"?null:window},wa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Gs=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ks(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ya(),e=X=>Ks(X);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==rr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:m,DOMParser:b,trustedTypes:v}=t,k=a.prototype,E=tr(k,"cloneNode"),F=tr(k,"remove"),z=tr(k,"nextSibling"),V=tr(k,"childNodes"),H=tr(k,"parentNode");if(typeof i=="function"){let X=r.createElement("template");X.content&&X.content.ownerDocument&&(r=X.content.ownerDocument)}let N,S="",{implementation:x,createNodeIterator:$,createDocumentFragment:h,getElementsByTagName:M}=r,{importNode:B}=n,P=Gs();e.isSupported=typeof js=="function"&&typeof H=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:q,ERB_EXPR:Ce,TMPLIT_EXPR:Ne,DATA_ATTR:Se,ARIA_ATTR:Je,IS_SCRIPT_OR_DATA:ze,ATTR_WHITESPACE:_e,CUSTOM_ELEMENT:$e}=Ws,{IS_ALLOWED_URI:Ve}=Ws,pe=null,lt=re({},[...qs,...pn,...fn,...hn,...Us]),fe=null,Ke=re({},[...zs,...mn,...Hs,...$r]),ie=Object.seal(gn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,et=null,Te=Object.seal(gn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),de=!0,be=!0,Le=!1,He=!0,Re=!1,De=!0,Ae=!1,We=!1,ye=!1,Ee=!1,Ge=!1,Oe=!1,Ze=!0,y=!1,w="user-content-",U=!0,te=!1,se={},T=null,C=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),j=null,W=re({},["audio","video","img","source","image","track"]),L=null,g=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),R="http://www.w3.org/1998/Math/MathML",A="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",J=I,le=!1,Y=null,xe=re({},[R,A,I],dn),ct=re({},["mi","mo","mn","ms","mtext"]),mt=re({},["annotation-xml"]),Lt=re({},["title","style","font","a","script"]),Xe=null,dt=["application/xhtml+xml","text/html"],wt="text/html",f=null,_=null,Z=r.createElement("form"),K=function(u){return u instanceof RegExp||u instanceof Function},ee=function(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(_&&_===u)){if((!u||typeof u!="object")&&(u={}),u=ft(u),Xe=dt.indexOf(u.PARSER_MEDIA_TYPE)===-1?wt:u.PARSER_MEDIA_TYPE,f=Xe==="application/xhtml+xml"?dn:xr,pe=ot(u,"ALLOWED_TAGS")?re({},u.ALLOWED_TAGS,f):lt,fe=ot(u,"ALLOWED_ATTR")?re({},u.ALLOWED_ATTR,f):Ke,Y=ot(u,"ALLOWED_NAMESPACES")?re({},u.ALLOWED_NAMESPACES,dn):xe,L=ot(u,"ADD_URI_SAFE_ATTR")?re(ft(g),u.ADD_URI_SAFE_ATTR,f):g,j=ot(u,"ADD_DATA_URI_TAGS")?re(ft(W),u.ADD_DATA_URI_TAGS,f):W,T=ot(u,"FORBID_CONTENTS")?re({},u.FORBID_CONTENTS,f):C,Pe=ot(u,"FORBID_TAGS")?re({},u.FORBID_TAGS,f):ft({}),et=ot(u,"FORBID_ATTR")?re({},u.FORBID_ATTR,f):ft({}),se=ot(u,"USE_PROFILES")?u.USE_PROFILES:!1,de=u.ALLOW_ARIA_ATTR!==!1,be=u.ALLOW_DATA_ATTR!==!1,Le=u.ALLOW_UNKNOWN_PROTOCOLS||!1,He=u.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Re=u.SAFE_FOR_TEMPLATES||!1,De=u.SAFE_FOR_XML!==!1,Ae=u.WHOLE_DOCUMENT||!1,Ee=u.RETURN_DOM||!1,Ge=u.RETURN_DOM_FRAGMENT||!1,Oe=u.RETURN_TRUSTED_TYPE||!1,ye=u.FORCE_BODY||!1,Ze=u.SANITIZE_DOM!==!1,y=u.SANITIZE_NAMED_PROPS||!1,U=u.KEEP_CONTENT!==!1,te=u.IN_PLACE||!1,Ve=u.ALLOWED_URI_REGEXP||Ys,J=u.NAMESPACE||I,ct=u.MATHML_TEXT_INTEGRATION_POINTS||ct,mt=u.HTML_INTEGRATION_POINTS||mt,ie=u.CUSTOM_ELEMENT_HANDLING||{},u.CUSTOM_ELEMENT_HANDLING&&K(u.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ie.tagNameCheck=u.CUSTOM_ELEMENT_HANDLING.tagNameCheck),u.CUSTOM_ELEMENT_HANDLING&&K(u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ie.attributeNameCheck=u.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),u.CUSTOM_ELEMENT_HANDLING&&typeof u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ie.allowCustomizedBuiltInElements=u.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Re&&(be=!1),Ge&&(Ee=!0),se&&(pe=re({},Us),fe=[],se.html===!0&&(re(pe,qs),re(fe,zs)),se.svg===!0&&(re(pe,pn),re(fe,mn),re(fe,$r)),se.svgFilters===!0&&(re(pe,fn),re(fe,mn),re(fe,$r)),se.mathMl===!0&&(re(pe,hn),re(fe,Hs),re(fe,$r))),u.ADD_TAGS&&(typeof u.ADD_TAGS=="function"?Te.tagCheck=u.ADD_TAGS:(pe===lt&&(pe=ft(pe)),re(pe,u.ADD_TAGS,f))),u.ADD_ATTR&&(typeof u.ADD_ATTR=="function"?Te.attributeCheck=u.ADD_ATTR:(fe===Ke&&(fe=ft(fe)),re(fe,u.ADD_ATTR,f))),u.ADD_URI_SAFE_ATTR&&re(L,u.ADD_URI_SAFE_ATTR,f),u.FORBID_CONTENTS&&(T===C&&(T=ft(T)),re(T,u.FORBID_CONTENTS,f)),U&&(pe["#text"]=!0),Ae&&re(pe,["html","head","body"]),pe.table&&(re(pe,["tbody"]),delete Pe.tbody),u.TRUSTED_TYPES_POLICY){if(typeof u.TRUSTED_TYPES_POLICY.createHTML!="function")throw er('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof u.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw er('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=u.TRUSTED_TYPES_POLICY,S=N.createHTML("")}else N===void 0&&(N=wa(v,s)),N!==null&&typeof S=="string"&&(S=N.createHTML(""));Be&&Be(u),_=u}},ge=re({},[...pn,...fn,...ca]),kt=re({},[...hn,...da]),cr=function(u){let O=H(u);(!O||!O.tagName)&&(O={namespaceURI:J,tagName:"template"});let G=xr(u.tagName),me=xr(O.tagName);return Y[u.namespaceURI]?u.namespaceURI===A?O.namespaceURI===I?G==="svg":O.namespaceURI===R?G==="svg"&&(me==="annotation-xml"||ct[me]):!!ge[G]:u.namespaceURI===R?O.namespaceURI===I?G==="math":O.namespaceURI===A?G==="math"&&mt[me]:!!kt[G]:u.namespaceURI===I?O.namespaceURI===A&&!mt[me]||O.namespaceURI===R&&!ct[me]?!1:!kt[G]&&(Lt[G]||!ge[G]):!!(Xe==="application/xhtml+xml"&&Y[u.namespaceURI]):!1},Qe=function(u){Qt(e.removed,{element:u});try{H(u).removeChild(u)}catch{F(u)}},ut=function(u,O){try{Qt(e.removed,{attribute:O.getAttributeNode(u),from:O})}catch{Qt(e.removed,{attribute:null,from:O})}if(O.removeAttribute(u),u==="is")if(Ee||Ge)try{Qe(O)}catch{}else try{O.setAttribute(u,"")}catch{}},D=function(u){let O=null,G=null;if(ye)u="<remove></remove>"+u;else{let ve=un(u,/^[\r\n\t ]+/);G=ve&&ve[0]}Xe==="application/xhtml+xml"&&J===I&&(u='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+u+"</body></html>");let me=N?N.createHTML(u):u;if(J===I)try{O=new b().parseFromString(me,Xe)}catch{}if(!O||!O.documentElement){O=x.createDocument(J,"template",null);try{O.documentElement.innerHTML=le?S:me}catch{}}let Me=O.body||O.documentElement;return u&&G&&Me.insertBefore(r.createTextNode(G),Me.childNodes[0]||null),J===I?M.call(O,Ae?"html":"body")[0]:Ae?O.documentElement:Me},ne=function(u){return $.call(u.ownerDocument||u,u,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},he=function(u){return u instanceof m&&(typeof u.nodeName!="string"||typeof u.textContent!="string"||typeof u.removeChild!="function"||!(u.attributes instanceof p)||typeof u.removeAttribute!="function"||typeof u.setAttribute!="function"||typeof u.namespaceURI!="string"||typeof u.insertBefore!="function"||typeof u.hasChildNodes!="function")},tt=function(u){return typeof l=="function"&&u instanceof l};function rt(X,u,O){vr(X,G=>{G.call(e,u,O,_)})}let Bn=function(u){let O=null;if(rt(P.beforeSanitizeElements,u,null),he(u))return Qe(u),!0;let G=f(u.nodeName);if(rt(P.uponSanitizeElement,u,{tagName:G,allowedTags:pe}),De&&u.hasChildNodes()&&!tt(u.firstElementChild)&&Fe(/<[/\w!]/g,u.innerHTML)&&Fe(/<[/\w!]/g,u.textContent)||u.nodeType===rr.progressingInstruction||De&&u.nodeType===rr.comment&&Fe(/<[/\w]/g,u.data))return Qe(u),!0;if(!(Te.tagCheck instanceof Function&&Te.tagCheck(G))&&(!pe[G]||Pe[G])){if(!Pe[G]&&Un(G)&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,G)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(G)))return!1;if(U&&!T[G]){let me=H(u)||u.parentNode,Me=V(u)||u.childNodes;if(Me&&me){let ve=Me.length;for(let je=ve-1;je>=0;--je){let pt=E(Me[je],!0);pt.__removalCount=(u.__removalCount||0)+1,me.insertBefore(pt,z(u))}}}return Qe(u),!0}return u instanceof a&&!cr(u)||(G==="noscript"||G==="noembed"||G==="noframes")&&Fe(/<\/no(script|embed|frames)/i,u.innerHTML)?(Qe(u),!0):(Re&&u.nodeType===rr.text&&(O=u.textContent,vr([q,Ce,Ne],me=>{O=Jt(O,me," ")}),u.textContent!==O&&(Qt(e.removed,{element:u.cloneNode()}),u.textContent=O)),rt(P.afterSanitizeElements,u,null),!1)},qn=function(u,O,G){if(Ze&&(O==="id"||O==="name")&&(G in r||G in Z))return!1;if(!(be&&!et[O]&&Fe(Se,O))){if(!(de&&Fe(Je,O))){if(!(Te.attributeCheck instanceof Function&&Te.attributeCheck(O,u))){if(!fe[O]||et[O]){if(!(Un(u)&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,u)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(u))&&(ie.attributeNameCheck instanceof RegExp&&Fe(ie.attributeNameCheck,O)||ie.attributeNameCheck instanceof Function&&ie.attributeNameCheck(O,u))||O==="is"&&ie.allowCustomizedBuiltInElements&&(ie.tagNameCheck instanceof RegExp&&Fe(ie.tagNameCheck,G)||ie.tagNameCheck instanceof Function&&ie.tagNameCheck(G))))return!1}else if(!L[O]){if(!Fe(Ve,Jt(G,_e,""))){if(!((O==="src"||O==="xlink:href"||O==="href")&&u!=="script"&&oa(G,"data:")===0&&j[u])){if(!(Le&&!Fe(ze,Jt(G,_e,"")))){if(G)return!1}}}}}}}return!0},Un=function(u){return u!=="annotation-xml"&&un(u,$e)},zn=function(u){rt(P.beforeSanitizeAttributes,u,null);let{attributes:O}=u;if(!O||he(u))return;let G={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:fe,forceKeepAttr:void 0},me=O.length;for(;me--;){let Me=O[me],{name:ve,namespaceURI:je,value:pt}=Me,Dt=f(ve),Pr=pt,Ie=ve==="value"?Pr:ia(Pr);if(G.attrName=Dt,G.attrValue=Ie,G.keepAttr=!0,G.forceKeepAttr=void 0,rt(P.uponSanitizeAttribute,u,G),Ie=G.attrValue,y&&(Dt==="id"||Dt==="name")&&(ut(ve,u),Ie=w+Ie),De&&Fe(/((--!?|])>)|<\/(style|title|textarea)/i,Ie)){ut(ve,u);continue}if(Dt==="attributename"&&un(Ie,"href")){ut(ve,u);continue}if(G.forceKeepAttr)continue;if(!G.keepAttr){ut(ve,u);continue}if(!He&&Fe(/\/>/i,Ie)){ut(ve,u);continue}Re&&vr([q,Ce,Ne],Wn=>{Ie=Jt(Ie,Wn," ")});let Hn=f(u.nodeName);if(!qn(Hn,Dt,Ie)){ut(ve,u);continue}if(N&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!je)switch(v.getAttributeType(Hn,Dt)){case"TrustedHTML":{Ie=N.createHTML(Ie);break}case"TrustedScriptURL":{Ie=N.createScriptURL(Ie);break}}if(Ie!==Pr)try{je?u.setAttributeNS(je,ve,Ie):u.setAttribute(ve,Ie),he(u)?Qe(u):Bs(e.removed)}catch{ut(ve,u)}}rt(P.afterSanitizeAttributes,u,null)},Vo=function X(u){let O=null,G=ne(u);for(rt(P.beforeSanitizeShadowDOM,u,null);O=G.nextNode();)rt(P.uponSanitizeShadowNode,O,null),Bn(O),zn(O),O.content instanceof o&&X(O.content);rt(P.afterSanitizeShadowDOM,u,null)};return e.sanitize=function(X){let u=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,G=null,me=null,Me=null;if(le=!X,le&&(X="<!-->"),typeof X!="string"&&!tt(X))if(typeof X.toString=="function"){if(X=X.toString(),typeof X!="string")throw er("dirty is not a string, aborting")}else throw er("toString is not a function");if(!e.isSupported)return X;if(We||ee(u),e.removed=[],typeof X=="string"&&(te=!1),te){if(X.nodeName){let pt=f(X.nodeName);if(!pe[pt]||Pe[pt])throw er("root node is forbidden and cannot be sanitized in-place")}}else if(X instanceof l)O=D("<!---->"),G=O.ownerDocument.importNode(X,!0),G.nodeType===rr.element&&G.nodeName==="BODY"||G.nodeName==="HTML"?O=G:O.appendChild(G);else{if(!Ee&&!Re&&!Ae&&X.indexOf("<")===-1)return N&&Oe?N.createHTML(X):X;if(O=D(X),!O)return Ee?null:Oe?S:""}O&&ye&&Qe(O.firstChild);let ve=ne(te?X:O);for(;me=ve.nextNode();)Bn(me),zn(me),me.content instanceof o&&Vo(me.content);if(te)return X;if(Ee){if(Ge)for(Me=h.call(O.ownerDocument);O.firstChild;)Me.appendChild(O.firstChild);else Me=O;return(fe.shadowroot||fe.shadowrootmode)&&(Me=B.call(n,Me,!0)),Me}let je=Ae?O.outerHTML:O.innerHTML;return Ae&&pe["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&Fe(Vs,O.ownerDocument.doctype.name)&&(je="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+je),Re&&vr([q,Ce,Ne],pt=>{je=Jt(je,pt," ")}),N&&Oe?N.createHTML(je):je},e.setConfig=function(){let X=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ee(X),We=!0},e.clearConfig=function(){_=null,We=!1},e.isValidAttribute=function(X,u,O){_||ee({});let G=f(X),me=f(u);return qn(G,me,O)},e.addHook=function(X,u){typeof u=="function"&&Qt(P[X],u)},e.removeHook=function(X,u){if(u!==void 0){let O=na(P[X],u);return O===-1?void 0:sa(P[X],O,1)[0]}return Bs(P[X])},e.removeHooks=function(X){P[X]=[]},e.removeAllHooks=function(){P=Gs()},e}var Zs=Ks();var Xs={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qs=t=>(...e)=>({_$litDirective$:t,values:e}),Sr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var nr=class extends Sr{constructor(e){if(super(e),this.it=ke,e.type!==Xs.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ke||e==null)return this._t=void 0,this.it=e;if(e===St)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};nr.directiveName="unsafeHTML",nr.resultType=1;var Js=Qs(nr);function vn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var It=vn();function io(t){It=t}var ar={exec:()=>null};function oe(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(Ue.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var ka=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ue={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},va=/^(?:[ \t]*(?:\n|$))+/,$a=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,xa=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,lr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Sa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,$n=/(?:[*+-]|\d{1,9}[.)])/,ao=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,lo=oe(ao).replace(/bull/g,$n).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ta=oe(ao).replace(/bull/g,$n).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),xn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Aa=/^[^\n]+/,Sn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ea=oe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Sn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ca=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,$n).getRegex(),Ir="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Tn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ra=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Tn).replace("tag",Ir).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),co=oe(xn).replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ir).getRegex(),Ia=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",co).getRegex(),An={blockquote:Ia,code:$a,def:Ea,fences:xa,heading:Sa,hr:lr,html:Ra,lheading:lo,list:Ca,newline:va,paragraph:co,table:ar,text:Aa},eo=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ir).getRegex(),La={...An,lheading:Ta,table:eo,paragraph:oe(xn).replace("hr",lr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",eo).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ir).getRegex()},Da={...An,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Tn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ar,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe(xn).replace("hr",lr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",lo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Oa=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ma=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,uo=/^( {2,}|\\)\n(?!\s*$)/,Na=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Lr=/[\p{P}\p{S}]/u,En=/[\s\p{P}\p{S}]/u,po=/[^\s\p{P}\p{S}]/u,Pa=oe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,En).getRegex(),fo=/(?!~)[\p{P}\p{S}]/u,Fa=/(?!~)[\s\p{P}\p{S}]/u,Ba=/(?:[^\s\p{P}\p{S}]|~)/u,qa=oe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",ka?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ho=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ua=oe(ho,"u").replace(/punct/g,Lr).getRegex(),za=oe(ho,"u").replace(/punct/g,fo).getRegex(),mo="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ha=oe(mo,"gu").replace(/notPunctSpace/g,po).replace(/punctSpace/g,En).replace(/punct/g,Lr).getRegex(),Wa=oe(mo,"gu").replace(/notPunctSpace/g,Ba).replace(/punctSpace/g,Fa).replace(/punct/g,fo).getRegex(),Ga=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,po).replace(/punctSpace/g,En).replace(/punct/g,Lr).getRegex(),ja=oe(/\\(punct)/,"gu").replace(/punct/g,Lr).getRegex(),Ya=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Va=oe(Tn).replace("(?:-->|$)","-->").getRegex(),Ka=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Va).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Er=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Za=oe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Er).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),go=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",Er).replace("ref",Sn).getRegex(),_o=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Sn).getRegex(),Xa=oe("reflink|nolink(?!\\()","g").replace("reflink",go).replace("nolink",_o).getRegex(),to=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Cn={_backpedal:ar,anyPunctuation:ja,autolink:Ya,blockSkip:qa,br:uo,code:Ma,del:ar,emStrongLDelim:Ua,emStrongRDelimAst:Ha,emStrongRDelimUnd:Ga,escape:Oa,link:Za,nolink:_o,punctuation:Pa,reflink:go,reflinkSearch:Xa,tag:Ka,text:Na,url:ar},Qa={...Cn,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",Er).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Er).getRegex()},yn={...Cn,emStrongRDelimAst:Wa,emStrongLDelim:za,url:oe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",to).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:oe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",to).getRegex()},Ja={...yn,br:oe(uo).replace("{2,}","*").getRegex(),text:oe(yn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Tr={normal:An,gfm:La,pedantic:Da},sr={normal:Cn,gfm:yn,breaks:Ja,pedantic:Qa},el={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ro=t=>el[t];function ht(t,e){if(e){if(Ue.escapeTest.test(t))return t.replace(Ue.escapeReplace,ro)}else if(Ue.escapeTestNoEncode.test(t))return t.replace(Ue.escapeReplaceNoEncode,ro);return t}function no(t){try{t=encodeURI(t).replace(Ue.percentDecode,"%")}catch{return null}return t}function so(t,e){let r=t.replace(Ue.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(Ue.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Ue.slashPipe,"|");return n}function or(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function tl(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function oo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function rl(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Cr=class{constructor(t){ue(this,"options");ue(this,"rules");ue(this,"lexer");this.options=t||It}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:or(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=rl(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=or(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:or(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=or(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${p}`:p;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=m,r.length===0)break;let b=o.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let v=b,k=v.raw+`
`+r.join(`
`),E=this.blockquote(k);o[o.length-1]=E,n=n.substring(0,n.length-v.raw.length)+E.raw,s=s.substring(0,s.length-v.text.length)+E.text;break}else if(b?.type==="list"){let v=b,k=v.raw+`
`+r.join(`
`),E=this.list(k);o[o.length-1]=E,n=n.substring(0,n.length-b.raw.length)+E.raw,s=s.substring(0,s.length-v.raw.length)+E.raw,r=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",p="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let m=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),b=t.split(`
`,1)[0],v=!m.trim(),k=0;if(this.options.pedantic?(k=2,p=m.trimStart()):v?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=m.slice(k),k+=e[1].length),v&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let E=this.rules.other.nextBulletRegex(k),F=this.rules.other.hrRegex(k),z=this.rules.other.fencesBeginRegex(k),V=this.rules.other.headingBeginRegex(k),H=this.rules.other.htmlBeginRegex(k);for(;t;){let N=t.split(`
`,1)[0],S;if(b=N,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),S=b):S=b.replace(this.rules.other.tabCharGlobal,"    "),z.test(b)||V.test(b)||H.test(b)||E.test(b)||F.test(b))break;if(S.search(this.rules.other.nonSpaceChar)>=k||!b.trim())p+=`
`+S.slice(k);else{if(v||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||z.test(m)||V.test(m)||F.test(m))break;p+=`
`+b}!v&&!b.trim()&&(v=!0),c+=N+`
`,t=t.substring(N.length+1),m=S.slice(k)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=p.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!s.loose){let c=a.tokens.filter(m=>m.type==="space"),p=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=p}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=so(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(so(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=or(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=tl(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),oo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return oo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let p=[...n[0]][0].length,m=t.slice(0,s+n.index+p+i);if(Math.min(s,i)%2){let v=m.slice(1,-1);return{type:"em",raw:m,text:v,tokens:this.lexer.inlineTokens(v)}}let b=m.slice(2,-2);return{type:"strong",raw:m,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},it=class wn{constructor(e){ue(this,"tokens");ue(this,"options");ue(this,"state");ue(this,"inlineQueue");ue(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||It,this.options.tokenizer=this.options.tokenizer||new Cr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ue,block:Tr.normal,inline:sr.normal};this.options.pedantic?(r.block=Tr.pedantic,r.inline=sr.pedantic):this.options.gfm&&(r.block=Tr.gfm,this.options.breaks?r.inline=sr.breaks:r.inline=sr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Tr,inline:sr}}static lex(e,r){return new wn(r).lex(e)}static lexInline(e,r){return new wn(r).inlineTokens(e)}lex(e){e=e.replace(Ue.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(Ue.tabCharGlobal,"    ").replace(Ue.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,m=e.slice(1),b;this.options.extensions.startInline.forEach(v=>{b=v.call({lexer:this},m),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Rr=class{constructor(t){ue(this,"options");ue(this,"parser");this.options=t||It}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(Ue.notSpaceStart)?.[0],s=t.replace(Ue.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ht(n)+'">'+(r?s:ht(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ht(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${ht(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=no(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+ht(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=no(t);if(s===null)return ht(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${ht(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:ht(t.text)}},Rn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},at=class kn{constructor(e){ue(this,"options");ue(this,"renderer");ue(this,"textRenderer");this.options=e||It,this.options.renderer=this.options.renderer||new Rr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Rn}static parse(e,r){return new kn(r).parse(e)}static parseInline(e,r){return new kn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Ar,ir=(Ar=class{constructor(t){ue(this,"options");ue(this,"block");this.options=t||It}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},ue(Ar,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ue(Ar,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Ar),nl=class{constructor(...t){ue(this,"defaults",vn());ue(this,"options",this.setOptions);ue(this,"parse",this.parseMarkdown(!0));ue(this,"parseInline",this.parseMarkdown(!1));ue(this,"Parser",at);ue(this,"Renderer",Rr);ue(this,"TextRenderer",Rn);ue(this,"Lexer",it);ue(this,"Tokenizer",Cr);ue(this,"Hooks",ir);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Rr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Cr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new ir;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];ir.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&ir.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await l.call(s,c);return a.call(s,m)})();let p=l.call(s,c);return a.call(s,p)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,c);return m===!1&&(m=await a.apply(s,c)),m})();let p=l.apply(s,c);return p===!1&&(p=a.apply(s,c)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return it.lex(t,e??this.defaults)}parser(t,e){return at.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?it.lex:it.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?at.parse:at.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?it.lex:it.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?at.parse:at.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+ht(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},Rt=new nl;function ae(t,e){return Rt.parse(t,e)}ae.options=ae.setOptions=function(t){return Rt.setOptions(t),ae.defaults=Rt.defaults,io(ae.defaults),ae};ae.getDefaults=vn;ae.defaults=It;ae.use=function(...t){return Rt.use(...t),ae.defaults=Rt.defaults,io(ae.defaults),ae};ae.walkTokens=function(t,e){return Rt.walkTokens(t,e)};ae.parseInline=Rt.parseInline;ae.Parser=at;ae.parser=at.parse;ae.Renderer=Rr;ae.TextRenderer=Rn;ae.Lexer=it;ae.lexer=it.lex;ae.Tokenizer=Cr;ae.Hooks=ir;ae.parse=ae;var cd=ae.options,dd=ae.setOptions,ud=ae.use,pd=ae.walkTokens,fd=ae.parseInline;var hd=at.parse,md=it.lex;function bo(t){let e=ae.parse(t),r=Zs.sanitize(e);return Js(r)}function sl(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function yo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(k){k.key==="Escape"&&s&&(k.preventDefault(),b())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${sl(s)}</span
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
                  </div>`:bo(i)}
          </div>
        </div>
      </div>
    `:d``}function p(){ce(c(),t)}async function m(k){s=k,o="loading",i="",l="",p();let E=r?r():"";if(!E){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let F="/api/doc?workspace="+encodeURIComponent(E)+"&path="+encodeURIComponent(k);try{let z=await n(F),V=await z.json().catch(()=>({}));if(!z.ok||!V||V.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(V&&V.error||z.status)+")",p();return}i=String(V.content||""),o="ready",p()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function b(){s=null,ce(d``,t)}function v(){document.removeEventListener("keydown",a),b()}return{open:m,close:b,destroy:v}}var ol={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function il(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function wo(t,e={}){let r=Array.isArray(t)?t:[];if(r.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let n=new Set;for(let i of r)i&&typeof i.resumed_from=="string"&&i.resumed_from.length>0&&n.add(i.resumed_from);let s=i=>{if(!(i.status==="failed"||i.status==="orphaned"))return"";let a=typeof i.session_id=="string"&&i.session_id.length>0,c=n.has(i.attempt_id),p=a&&!c,m=a?c?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${i.attempt_id}
      ?disabled=${!p}
      title=${m}
      @click=${b=>{b.stopPropagation(),p&&e.onResume&&e.onResume(i.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},o=i=>{if(!(i.status==="failed"||i.status==="orphaned")||typeof i.cause!="string"||i.cause==="")return"";let a=i.cause_detail,c=a&&typeof a.reason=="string"&&a.reason.length>0?typeof a.command=="string"&&a.command.length>0?`${a.reason} \xB7 ${a.command}`:a.reason:i.cause;return d`<div class="detail-session__cause" title=${c}>
      ${i.cause}
    </div>`};return d`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${r.map(i=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${i.status||"unknown"}"
              data-attempt-id=${i.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(i.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${ol[i.status||""]||"\xB7"}</span
              >
              <span class="detail-session__id">${i.attempt_id}</span>
              ${i.resumed_from?d`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${i.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[i.runner,i.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${i.session_id?d`<span class="detail-session__sid" title=${i.session_id}
                    >${String(i.session_id).slice(0,8)}</span
                  >`:""}
              <span class="detail-session__time"
                >${il(i.started_at)}</span
              >
            </button>
            ${s(i)} ${o(i)}
          </div>`)}
    </div>
  `}var al=["open","in_progress","deferred","resolved","closed"],ll=[0,1,2,3,4];function ko(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,p={},m=!1,b=!1,v="",k="",E="";function F(){m=!1,b=!1,v="",k="",E=""}let z=document.createElement("div");z.className="md-viewer-root",document.body.appendChild(z);let V=yo(z,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),H=document.createElement("div");H.className="session-log-root",document.body.appendChild(H);let N=wr(H,{transport:s?(g,R)=>Promise.resolve(s(g,R)):void 0,sessionLogStore:l});function S(){if(!i||!a)return[];let g=i.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(A=>A&&A.bead_id===a).sort((A,I)=>(I.started_at||0)-(A.started_at||0)).map(A=>({attempt_id:A.attempt_id,bead_id:A.bead_id,status:A.status,started_at:typeof A.started_at=="number"?A.started_at:null,runner:A.runner||null,model:A.model||null,session_id:A.session_id||null,resumed_from:A.resumed_from||null,dismissed_at:typeof A.dismissed_at=="number"?A.dismissed_at:null,cause:typeof A.cause=="string"?A.cause:null,cause_detail:A.cause_detail||null}))}function x(g){let R=i?i.get():null,A=R&&R.attempts?R.attempts[g]:null;N.open({attempt_id:g,meta:A?{runner:A.runner||void 0,model:A.model||void 0,effort:A.effort||void 0,status:A.status||void 0,session_id:A.session_id||void 0}:{}})}async function $(g){if(!s||!g)return;let R=()=>{let I=i?i.get():null;return I&&typeof I.revision=="number"?I.revision:0},A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R()});if(A&&A.conflict){let I=A.queue&&typeof A.queue.revision=="number"?A.queue.revision:R();A=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I})}A&&A.resumed===!1&&!A.conflict&&A.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}let h={onOpen:x,onResume:$};function M(){let g=i?i.get():null,R=g&&g.exec_defaults;return R&&typeof R=="object"?R:{}}let B=null;r&&r.subscribe&&(B=r.subscribe(()=>Ce()));let P=null;i&&typeof i.subscribe=="function"&&(P=i.subscribe(()=>{a&&L()}));function q(g){g.key==="Escape"&&a&&(g.preventDefault(),n())}document.addEventListener("keydown",q);function Ce(){if(a){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+a)||[];c=g.find(A=>A&&A.id===a)||g[0]||c}L()}}function Ne(g){Ut(g).then(R=>{R?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Se(g){g.preventDefault(),g.stopPropagation(),a&&Ne(a)}function Je(g,R){g.preventDefault(),g.stopPropagation(),Ne(R)}function ze(g,R){g.preventDefault(),g.stopPropagation(),V.open(R)}function _e(g,R){p[g]=R,L(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:g,value:R})).catch(()=>{Q("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function $e(g,R,A){if(!s||!a)return!1;try{let I=await Promise.resolve(s(g,R)),J=Array.isArray(I)?I[0]:I;return J&&typeof J=="object"&&J.id?(c=J,!0):(Q(A,"error"),!1)}catch{return Q(A,"error"),!1}}function Ve(g){setTimeout(()=>{try{let R=t.querySelector(g);R&&typeof R.focus=="function"&&R.focus()}catch{}},0)}function pe(){m=!0,v=c&&c.title||"",L(),Ve('.detail-edit__input[data-edit="title"]')}function lt(g){v=g.target.value}function fe(){m=!1,v="",L()}function Ke(){$e("edit-text",{id:a,field:"title",value:v},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(m=!1,v=""),L()})}function ie(){b=!0,k=c&&c.description||"",L(),Ve('.detail-edit__textarea[data-edit="description"]')}function Pe(g){k=g.target.value}function et(){b=!1,k="",L()}function Te(){$e("edit-text",{id:a,field:"description",value:k},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(b=!1,k=""),L()})}function de(g,R,A,I){if(g.key==="Escape"){g.stopPropagation(),A();return}g.key==="Enter"&&(!I||g.ctrlKey||g.metaKey)&&(g.preventDefault(),R())}function be(g){let R=g.target.value;$e("update-status",{id:a,status:R},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>L())}function Le(g){let R=Number(g.target.value);$e("update-priority",{id:a,priority:R},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>L())}function He(g){E=g.target.value}function Re(){let g=E.trim();g.length!==0&&$e("label-add",{id:a,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(R=>{R&&(E=""),L()})}function De(g){if(g.key==="Escape"){g.stopPropagation(),E="",L();return}g.key==="Enter"&&(g.preventDefault(),Re())}function Ae(g){$e("label-remove",{id:a,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>L())}let We={onCopyPath:Je,onOpenDoc:ze},ye={onChange:_e};function Ee(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function Ge(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Oe(g){let A=(Array.isArray(g.dependencies)?g.dependencies:[]).map(I=>({id:Ee(I),icon:Ge(I)})).filter(I=>I.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${A.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${A.map(I=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(I.id)}
                  >
                    ${I.icon?`${I.icon} `:""}${I.id}
                  </button>`:d`<span class="detail-dep"
                    >${I.icon?`${I.icon} `:""}${I.id}</span
                  >`)}
          </div>`}
    `}function Ze(g){let R=g.metadata||{},A=g.workflow||{},I=A.stages||{},J=I.spec&&I.spec.stale,le=I.impl&&I.impl.stale,Y=A.route_source==="derived",xe=A.route||R.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Y?" detail-kv__v--derived":""}"
          title=${Y?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${Y&&A.route?`${xe} ? (\uCD94\uB860)`:xe}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${R.spec_review||"\uC5C6\uC74C"}${J?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${R.impl_review||"\uC5C6\uC74C"}${le?" \xB7 stale":""}</span
        >
      </div>
      ${R.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${R.pr_url}</span>
          </div>`:""}
    `}let y={route:["spec_backed","full_plan"]};async function w(g,R){let A=R.target.value;if(g==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&A!=="full_plan"&&!window.confirm(`full_plan \u2192 ${A||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){L();return}await $e("update-workflow-meta",{id:a,key:g,value:A},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),L()}function U(g){let R=g.metadata||{};return d` ${((I,J)=>{let le=y[I],Y=typeof R[I]=="string"?R[I]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${I}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${I}
          data-edit=${`wfmeta-${I}`}
          @change=${xe=>w(I,xe)}
        >
          <option value="" ?selected=${!le.includes(Y)}>
            ${J}
          </option>
          ${le.map(xe=>d`<option value=${xe} ?selected=${Y===xe}>${xe}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function te(g){return m?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${v}
            @input=${lt}
            @keydown=${R=>de(R,Ke,fe,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ke}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${fe}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${pe}
        >
          ✎
        </button>
      </div>
    `}function se(g){let R=_t(g.created_at),A=_t(g.updated_at);return!R&&!A?d``:d`
      ${R?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
      ${A?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${A}</span>
          </div>`:""}
    `}function T(g,R){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${be}
        >
          ${al.map(A=>d`<option value=${A} ?selected=${A===g}>${A}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Le}
        >
          ${ll.map(A=>d`<option value=${String(A)} ?selected=${A===R}>
                P${A}
              </option>`)}
        </select>
      </div>
    `}function C(g){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${b?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${ie}
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
              .value=${k}
              @input=${Pe}
              @keydown=${R=>de(R,Te,et,!0)}
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
                @click=${et}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function j(g){let R=Array.isArray(g.labels)?g.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${R.map(A=>d`<span class="detail-label-chip"
              >${A}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${A}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+A}
                @click=${()=>Ae(A)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${E}
            @input=${He}
            @keydown=${De}
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
    `}function W(){if(!a)return d``;let g=c||{},R=String(g.id||a),A=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",I=g.status||"open",J=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",le=g.description||"",Y={...g,metadata:{...g.metadata||{},...p}};return d`
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
            @click=${Se}
          >
            ${R}
          </button>
          ${te(A)} ${T(I,J)}
          ${se(g)} ${C(le)}
          ${j(g)} ${Oe(g)}
          ${Ze(g)} ${U(g)}
          ${Ns(g,We)}
          ${Ps(Y,ye,M())}
          ${wo(S(),h)}
        </div>
      </div>
    `}function L(){ce(W(),t)}return{load(g){g!==a&&(p={},F()),a=g,c=null,Ce()},clear(){a=null,c=null,p={},F(),V.close(),N.close(),ce(d``,t)},destroy(){B&&(B(),B=null),P&&(P(),P=null),document.removeEventListener("keydown",q),V.destroy(),z.parentNode&&z.parentNode.removeChild(z),N.destroy(),H.parentNode&&H.parentNode.removeChild(H),a=null,c=null,ce(d``,t)}}}var cl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function vo(t,e){return Jr(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function dl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function $o(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(x){let $=r.get();if($)try{let h=await n("display-policy-set",{expected_revision:$.revision,policy:x($)});a(h),h&&h.conflict&&h.policy&&(h=await n("display-policy-set",{expected_revision:h.policy.revision,policy:x(h.policy)}),a(h)),h&&h.conflict&&Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function c(x){let $=r.get();if(!$)return;let h=vo(x,$)!=="shown";l(M=>dl(x,M,h))}function p(){let x=i.trim();x.length!==0&&(i="",l($=>$.hidden_prefixes.includes(x)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,x]}),F())}function m(x){l($=>({hidden_prefixes:$.hidden_prefixes.filter(h=>h!==x)}))}function b(x){let $=r.get();if(!$)return;let h=$.chips[x]===!1;l(()=>({chips:{[x]:h}}))}function v(x){let $=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${$.map(h=>{let M=vo(h,x);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${h}
                  data-state=${M}
                  @click=${()=>c(h)}
                >
                  ${h}
                </button>`})}
            </div>`}
      </section>
    `}function k(x){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map($=>d`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m($)}
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
            @input=${$=>{i=String($.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function E(x){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${cl.map(([$,h])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${x.chips[$]!==!1}
                  @change=${()=>b($)}
                />
                <span>${h}</span>
              </label>`)}
        </div>
      </section>
    `}function F(){let x=r.get();ce(d`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${S}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${x?d`${v(x)} ${k(x)}
                ${E(x)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let z=!1,V=()=>{z=!1};o.addEventListener("close",V),o.addEventListener("cancel",V);let H=null;r.subscribe&&(H=r.subscribe(()=>{z&&F()}));function N(){z||(i="",z=!0,F(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function S(){z&&(z=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:N,close:S,destroy(){z=!1,o.removeEventListener("close",V),o.removeEventListener("cancel",V),H&&(H(),H=null),o.remove()}}}function xo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,p,m="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let b=typeof m=="string"?m.trim():"";if(s&&(b.length>0?(s.textContent=b,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function So(t,e,r){let n=we("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return d`
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
    `}function l(){ce(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),ce(d``,t)}}}var To=["bug","feature","task","epic","chore"];function Ao(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Eo=["Critical","High","Medium","Low","Backlog"];function Co(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),b=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let S=document.createElement("option");S.value="",S.textContent="\u2014 Select \u2014",o.appendChild(S);for(let x of To){let $=document.createElement("option");$.value=x,$.textContent=Ao(x),o.appendChild($)}i.replaceChildren();for(let x=0;x<=4;x+=1){let $=document.createElement("option");$.value=String(x);let h=Eo[x]||"Medium";$.textContent=`${x} \u2013 ${h}`,i.appendChild($)}}v();function k(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(S){s.disabled=S,o.disabled=S,i.disabled=S,l.disabled=S,a.disabled=S,p.disabled=S,m.disabled=S,m.textContent=S?"Creating\u2026":"Create"}function F(){c.textContent=""}function z(S){c.textContent=S}function V(){try{let S=window.localStorage.getItem("beads-ui.new.type");S?o.value=S:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?i.value=x:i.value="2"}catch{o.value="",i.value="2"}}function H(){let S=o.value||"",x=i.value||"";S.length>0&&window.localStorage.setItem("beads-ui.new.type",S),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function N(){F();let S=String(s.value||"").trim();if(S.length===0){z("Title is required"),s.focus();return}let x=Number(i.value||"2");if(!(x>=0&&x<=4)){z("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),h=String(a.value||""),M={title:S};$.length>0&&(M.type=$),String(x).length>0&&(M.priority=x),h.length>0&&(M.description=h),E(!0);try{await e("create-issue",M)}catch{E(!1),z("Failed to create issue");return}H(),E(!1),k()}return r.addEventListener("cancel",S=>{S.preventDefault(),k()}),b.addEventListener("click",()=>k()),p.addEventListener("click",()=>k()),r.addEventListener("keydown",S=>{S.key==="Enter"&&(S.ctrlKey||S.metaKey)&&(S.preventDefault(),N())}),n.addEventListener("submit",S=>{S.preventDefault(),N()}),{open(){n.reset(),F(),V();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}function Ro(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function Io(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var ul={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},pl=[{key:"orchestration_model",values:()=>sn},{key:"orchestration_effort",values:()=>on},{key:"review_model",values:()=>an},{key:"impl_model",values:()=>ln}];function Lo(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let h=i();return typeof h.revision=="number"?h.revision:0}function a(){let h=i().exec_defaults;return h&&typeof h=="object"?h:{}}function c(h){h&&h.queue&&r&&r.set(h.queue)}async function p(h,M){if(!n)return;let B={key:h,value:M||null};try{let P=await n("worker-queue-set-exec-default",{...B,expected_revision:l()});c(P),P&&P.conflict&&(P=await n("worker-queue-set-exec-default",{...B,expected_revision:l()}),c(P)),P&&P.conflict&&Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{Q("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function m(h,M,B){let P=!!B&&!M.includes(B);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${h}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${h}`}
        data-key=${h}
        @change=${q=>{p(h,q.target.value)}}
      >
        <option value="" ?selected=${!B}>
          ${cn[h]||"(\uAE30\uBCF8)"}
        </option>
        ${P?d`<option value=${B} ?selected=${!0}>
              ${B} (비호환)
            </option>`:""}
        ${M.map(q=>d`<option value=${q} ?selected=${B===q}>${q}</option>`)}
      </select>
    </div>`}function b(){let h=i().workspace_info;return h&&typeof h=="object"?h:{}}function v(h,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${h}"
      >${M}</span
    >`}function k(h){let M=h?Io(h.cmd):"",B=h?Ro(h.timeout_ms):"",P=!!h&&h.source==="detected";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${P?v("detected","\uC790\uB3D9\uAC10\uC9C0"):v("config","config")}
            ${B?d`<span class="exec-defaults__vd-meta"
                  >timeout ${B}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음
          </div>`}
    </div>`}function E(h){let M=h?Io(h.cmd):"",B=h?Ro(h.timeout_ms):"",P=B?`timeout ${B} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",q=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${v("config","config")}
            ${h.detached===!0?v("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${P}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${q}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function F(h){if(!h||typeof h!="object")return"";let M=ul[String(h.outcome)];if(!M)return"";let B=h.outcome==="failed"&&h.reason?`${M.label} \xB7 ${h.reason}`:M.label,P=[_t(h.at),typeof h.bead_id=="string"?h.bead_id:"",typeof h.base_sha=="string"?h.base_sha.slice(0,7):""].filter(q=>q.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${v(M.modifier,B)}
        ${P?d`<span class="exec-defaults__vd-meta">${P}</span>`:""}
      </div>
    </div>`}function z(h){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${k(h.verify_cmd)} ${E(h.deploy_cmd)}
      ${F(h.last_deploy)}
    </section>`}function V(){let h=a();ce(d`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${$}
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
            ${pl.map(M=>m(M.key,M.values(),h[M.key]||""))}
            ${z(b())}
          </div>
        </div>
      `,o)}let H=!1,N=()=>{H=!1};o.addEventListener("close",N),o.addEventListener("cancel",N);let S=null;r&&r.subscribe&&(S=r.subscribe(()=>{H&&V()}));function x(){H||(H=!0,V(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $(){H&&(H=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:x,close:$,destroy(){H=!1,o.removeEventListener("close",N),o.removeEventListener("cancel",N),S&&(S(),S=null),o.remove()}}}function zt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function fl(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function hl(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function Dr(t){if(!fl(t))return null;let e=zt(t?.input_tokens)+zt(t?.output_tokens);return`\u03C4 ${hl(e)}`}function Or(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${zt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${zt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${zt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${zt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`),e.join(" \xB7 ")}function In(t,e){let r=null;for(let n of Object.values(t||{}))n&&n.bead_id===e&&(r=n.usage||null);return r}function ml(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=Dr(t.usage),s=t.merge_step||null;return d`<div
    class="worker-mini${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:""}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${t.id}</span>
    <span class="worker-mini__title">${t.title}</span>
    ${t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:""}
    ${r.map(o=>o===t.live_badge?d`<span
            class="worker-mini__badge worker-mini__badge--activity"
            title="서버가 이 PR을 처리하는 중입니다"
            ><span class="act-dot" aria-hidden="true"></span>${o}</span
          >`:d`<span
            class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    ${t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:""}
    ${n?d`<span class="worker-usage" title=${Or(t.usage)}
          >${n}</span
        >`:""}
    ${s?d`<span class="merge-step"
          >${s.label}<span class="merge-step__n"
            >${s.index}/${s.total}</span
          ></span
        >`:""}
    ${t.merge_action?d`<button
          type="button"
          class="worker-mini__merge"
          data-bead-id=${t.id}
          ?disabled=${t.merge_enabled===!1}
          title=${t.merge_title||""}
        >
          ${t.merge_label||"\uBA38\uC9C0"}
        </button>`:""}
    ${t.discard_action?d`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${t.id}
          ?disabled=${t.discard_enabled===!1}
          title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          폐기
        </button>`:""}
  </div>`}function gl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
    class="worker-card${e?"":" worker-card--static"}"
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    <div class="worker-card__head">
      ${e?d`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${t.id}</span>
      ${r&&s?d`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
            >${o?`${s} ?`:s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${t.title}</div>
    ${r?yr(r,t.status):""}
    ${t.reason?d`<div class="worker-card__foot">
          <span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >
        </div>`:""}
  </div>`}function Ht(t){return d`<section
    class="worker-pane${t.src?" worker-pane--src":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${t.title}</span>
      <span class="worker-pane__count">${t.items.length}</span>
      ${t.header_control?t.header_control:""}
    </header>
    ${t.controls?t.controls:""}
    <div class="worker-pane__body">
      ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">${t.empty||""}</div>`:t.items.map(e=>t.lane==="candidate"?gl(e):ml(e))}
    </div>
  </section>`}var Do=160;function Oo(t){return t.length>Do?`${t.slice(0,Do)}\u2026`:t}function _l(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${Oo(t.command)}</code>`:""}
  </div>`}function bl(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function yl(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Mo(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
    ${t.failure?d`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${t.failure.repo||"repo"} 세션 실패 —
          ${t.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${t.failure.resume_attempt_id}
                ?disabled=${!t.failure.resume_eligible}
                title=${t.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":t.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${t.failure.resume_attempt_id?d`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${t.failure.resume_attempt_id}
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${_l(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?d`<div class="worker-banner__detail">
                <code>${Oo(r.detail)}</code>
              </div>`:""}
          ${bl(r.output_tail)}
        </div>`)}
  </div>`}function wl(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?yl(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=Dr(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${t.bead_id}</span>
      ${t.resumed_from?d`<span
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
    ${o||i||l?d`<div class="rtile__meta">
          ${l?d`<span class="worker-mini__badge">${l}</span>`:""}
          ${o?d`<span>${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${Or(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
  </div>`}function No(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>wl(s,e,r))}
  </div>`}var kl="tab:worker:ready",vl="tab:worker:blocked",Mr=1;function On(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var Po="beads-ui.worker.candidate-filter",Ln={show_blocked:!1,spec:"all"};function $l(){try{let t=window.localStorage.getItem(Po);if(!t)return{...Ln};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Ln};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ln}}}function xl(t){try{window.localStorage.setItem(Po,JSON.stringify(t))}catch{}}function Sl(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var Tl=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Fo="bdui.worker.candidate_sort",Al=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Nr="spec";function El(){try{let t=window.localStorage.getItem(Fo);return t==="board"||t==="created"||t==="spec"?t:Nr}catch{return Nr}}function Cl(t){try{window.localStorage.setItem(Fo,t)}catch{}}function Rl(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(At):(n.sort(hr(r)),e==="board"?n:[...n.filter(On),...n.filter(s=>!On(s))])}function Il(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function Ll(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Dl=["closed_unmerged","undecidable"],Ol=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ml(t,e){for(let r of Ol)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Dn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Nl(t){if(typeof t!="string"||t.length===0)return null;let e=Dn.length,r=Dn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Dn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function Pl(t,e,r,n,s=null,o=null,i=null){let l=r[t]||null,a=l&&l.gate?l.gate:null,c=l&&l.pr?l.pr:null,p=[],m=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,b=Ml(a&&a.gate_badge||"",m?null:o&&o.activity||null);m&&p.push(m),b.label&&p.push(b.label),a&&a.base_badge&&a.base_badge!==a.gate_badge&&p.push(a.base_badge),n&&p.push("\uC815\uB9AC \uC2E4\uD328");let v=!!a&&a.base_badge==="\uCDA9\uB3CC",k=!!a&&a.enabled===!0,E=Nl(o&&o.merge_progress?o.merge_progress.step:null),F=!!n&&!!a&&a.tier==="merged";return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",pr_number:c&&typeof c.number=="number"?c.number:null,pr_url:c&&typeof c.url=="string"?c.url:"",badges:p,live_badge:i==="running"?m:m?null:b.live?b.label:null,usage:s,alert:!!a&&Dl.includes(a.tier)||!!n,merge_action:!0,discard_action:!n&&!(a&&a.tier==="merged"),merge_step:E,discard_enabled:!E&&!i,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":void 0,merge_enabled:!E&&!i&&(k||v||F),merge_label:v&&!E&&!F?"\uCDA9\uB3CC \uD574\uC18C":void 0,merge_title:E?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${E.label}`:i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":F?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":v?"\uCDA9\uB3CC \u2014 \uD074\uB9AD\uD558\uBA74 \uCDA9\uB3CC \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":k?`\uBA38\uC9C0 (${a.gate_badge}) \u2014 \uD074\uB9AD \uC2DC\uC810\uC5D0 \uB2E4\uC2DC \uD655\uC778\uD569\uB2C8\uB2E4`:a&&a.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${a&&a.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Mn(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?gr(n,i):null,p=_r({transport:r,uiOrderStore:i}),m=null,b=[],v=$l(),k=El(),E=new Set,F=[],z=document.createElement("div");z.className="worker-console";let V=document.createElement("div"),H=document.createElement("div");H.className="worker-drawer-overlay",H.hidden=!0;let N=document.createElement("div");N.className="worker-drawer-overlay__backdrop";let S=document.createElement("div");S.className="worker-drawer-host",H.append(N,S);let x=document.createElement("div");x.className="worker-lanes-host",z.append(V,H,x),t.appendChild(z);let $=null,h=wr(S,{transport:r,sessionLogStore:o,onClose:()=>{$=null,H.hidden=!0,de()}}),M=Lo(z,{queueStore:s,transport:r,getWorkspacePath:a});function B(){return s&&s.get()||{revision:0,auto_advance:!1,slots:Mr,queue:[],pr_wait:[],done:[]}}function P(){let y=B();return typeof y.revision=="number"?y.revision:0}function q(y){y&&y.queue&&s&&s.set(y.queue)}async function Ce(y,w){if(!r)return;let U=await r("worker-queue-place",{bead_id:y,index:w,expected_revision:P()});q(U),U&&U.conflict&&await r("worker-queue-place",{bead_id:y,index:w,expected_revision:P()}).then(q)}async function Ne(y,w){if(!r)return;let U=await r("worker-queue-reorder",{bead_id:y,to_index:w,expected_revision:P()});q(U),U&&U.conflict&&await r("worker-queue-reorder",{bead_id:y,to_index:w,expected_revision:P()}).then(q)}async function Se(y){if(!r)return;let w=await r("worker-queue-remove",{bead_id:y,expected_revision:P()});q(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:y,expected_revision:P()}).then(q)}async function Je(y){!r||!y||await r("worker-attempt-stop",{attempt_id:y})}async function ze(y){if(!r||!y)return;let w=await r("worker-attempt-pause",{attempt_id:y});w&&w.paused===!1&&w.reason&&Q(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function _e(y){if(!r||!y)return;let w=await r("worker-attempt-resume",{attempt_id:y,expected_revision:P()});q(w),w&&w.conflict&&(w=await r("worker-attempt-resume",{attempt_id:y,expected_revision:P()}),q(w)),w&&w.resumed===!1&&!w.conflict&&w.reason&&Q(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function $e(y){if(!r||!y)return;let w=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:P()});q(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:y,expected_revision:P()}),q(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&Q(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ve(y){if(!r||!y)return;E.add(y),de();let w;try{w=await r("worker-pr-merge",{bead_id:y,expected_revision:P()}),q(w),w&&w.conflict&&(w=await r("worker-pr-merge",{bead_id:y,expected_revision:P()}),q(w))}finally{E.delete(y),de()}if(!(!w||w.conflict)){if(w.action==="conflict_resolution"){Q(w.ok?"\uCDA9\uB3CC \u2014 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 (\uBA38\uC9C0\uD558\uC9C0 \uC54A\uC74C)":`\uCDA9\uB3CC \uD574\uC18C \uB514\uC2A4\uD328\uCE58 \uC2E4\uD328: ${w.reason||""}`,w.ok?"success":"error",2800);return}if(w.ok){Q("\uBA38\uC9C0 + \uC815\uB9AC \uC644\uB8CC","success",2e3);return}Q(w.cleanup_step?`\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uC2E4\uD328(${w.cleanup_step}): ${w.reason||""}`:`\uBA38\uC9C0 \uAC70\uBD80: ${w.reason||""}`,"error",3200)}}async function pe(y){if(!r||!y||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${y}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let U=await r("worker-pr-discard",{bead_id:y,expected_revision:P()});if(q(U),U&&U.conflict&&(U=await r("worker-pr-discard",{bead_id:y,expected_revision:P()}),q(U)),U&&U.discarded===!0){Q("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}U&&U.discarded===!1&&!U.conflict&&Q(`\uD3D0\uAE30 \uAC70\uBD80: ${U.reason||""}`,"error",2800)}async function lt(y){if(!r)return;let w=await r("worker-queue-toggle",{on:y,expected_revision:P()});q(w),w&&w.conflict&&await r("worker-queue-toggle",{on:y,expected_revision:P()}).then(q)}async function fe(y){if(!r||!Number.isFinite(y))return;let w=Math.max(Mr,Math.floor(y)),U=await r("worker-queue-set-slots",{slots:w,expected_revision:P()});q(U),U&&U.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:P()}).then(q)}function Ke(){let y=B(),w=c?c.selectBoardColumn(kl,"ready"):[],U=c?c.selectBoardColumn(vl,"blocked"):[],te=new Map;for(let D of[...w,...U])te.set(D.id,D.title||D.id);let se=y.pr_wait||[],T=y.pr_observations||{},C=y.pr_activity||{},j=y.cleanup_failed||{},W=Object.entries(j).map(([D,ne])=>({bead_id:D,step:ne&&ne.step?ne.step:"",reason:ne&&ne.reason?ne.reason:"",detail:ne&&typeof ne.detail=="string"?ne.detail:null,output_tail:ne&&typeof ne.output_tail=="string"&&ne.output_tail?ne.output_tail:void 0})),L=y.queue||[],g=new Set([...L.map(D=>D.bead_id),...se.map(D=>D.bead_id),...y.done.map(D=>D.bead_id)]),R=new Set(U.map(D=>D.id)),A=i?i.get()?.order||{}:{},I=new Set,J=[];for(let D of[...w,...U])g.has(D.id)||I.has(D.id)||Il(D)||(I.add(D.id),J.push(D));b=Rl(J,k,A);let le=y.admission||{},Y=D=>{let ne=le[D];if(!ne)return"";let he=typeof ne.reason=="string"?ne.reason:"",tt=he.indexOf(":");return tt>0&&tt<he.length-1?`\u26D4 ${he.slice(0,tt)} (${he.slice(tt+1)})`:`\u26D4 ${he}`},xe=b.map(D=>{let ne=On(D),he=R.has(D.id),tt=[];he&&tt.push(Ll(D)),ne||tt.push("spec \uC5C6\uC74C");let rt=Y(D.id);return rt&&tt.push(rt),{id:D.id,title:D.title||D.id,reason:tt.join(" \xB7 "),draggable:ne,lane:"candidate",workflow:D.workflow,status:D.status,blocked:he,has_spec:ne}}),ct=Sl(xe,v),mt=ct.visible,Lt=(D,ne)=>D.map(he=>({id:he.bead_id,title:te.get(he.bead_id)||he.bead_id,reason:ne==="done"?"":Y(he.bead_id),draggable:ne!=="done",done:ne==="done",lane:ne,usage:ne==="done"?In(y.attempts||{},he.bead_id):null})),Xe=y.attempts?Object.values(y.attempts):[],dt=new Set;for(let D of Xe)D&&typeof D.resumed_from=="string"&&D.resumed_from.length>0&&dt.add(D.resumed_from);let wt=new Map;for(let D of Xe)wt.set(D.bead_id,D.attempt_id);let f=[],_=null;for(let D of Xe){let ne=D.status==="paused"&&!dt.has(D.attempt_id);D.status==="running"||ne?f.push({bead_id:D.bead_id,attempt_id:D.attempt_id,title:te.get(D.bead_id)||D.bead_id,runner:D.runner||null,model:D.model||null,effort:D.effort||null,started_at:typeof D.started_at=="number"?D.started_at:null,resumed_from:D.resumed_from||null,paused:ne,conflict_resolution:D.conflict_resolution===!0,can_pause:typeof D.session_id=="string"&&D.session_id.length>0,usage:D.usage||null}):(D.status==="failed"||D.status==="orphaned")&&!(wt.get(D.bead_id)!==D.attempt_id)&&typeof D.dismissed_at!="number"&&(_=D)}let Z=null;if(_){let D=typeof _.session_id=="string"&&_.session_id.length>0,ne=dt.has(_.attempt_id),he=_.cause_detail;Z={repo:_.repo||"",reason:_.cause||_.status,cause_detail:he&&typeof he.reason=="string"?{reason:he.reason,command:typeof he.command=="string"?he.command:null}:null,resume_attempt_id:_.attempt_id,resume_eligible:D&&!ne,resume_reason:D?ne?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let K=new Set(f.map(D=>D.bead_id)),ee=new Map;for(let D of f)D.conflict_resolution&&(D.paused?ee.has(D.bead_id)||ee.set(D.bead_id,"paused"):ee.set(D.bead_id,"running"));let kt=f.filter(D=>!D.paused).length,cr=(y.workspace_info||{}).slots,Qe=typeof cr=="number"?cr:typeof y.slots=="number"?y.slots:Mr,ut=kt>Qe;return{queue:y,idToTitle:te,candidates:mt,candidate_hidden:{blocked:ct.hidden_blocked,spec:ct.hidden_spec},running:f,live_count:kt,slots:Qe,over_cap:ut,failure:Z,waiting:Lt(L.filter(D=>!K.has(D.bead_id)),"queue"),pr_wait:se.map(D=>Pl(D.bead_id,te.get(D.bead_id)||D.bead_id,T,j[D.bead_id]||null,In(y.attempts||{},D.bead_id),C[D.bead_id]||(E.has(D.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),ee.get(D.bead_id)||null)),done:Lt(y.done,"done"),cleanup_failures:W}}function ie(y){let w=y.waiting.length>0?y.waiting[0].id:"\u2014";return d`<div class="worker-ctrl">
        <button
          type="button"
          class="worker-play${y.queue.auto_advance?" is-active":""}"
        >
          ${y.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
        </button>
        <span class="worker-stat"
          >실행 <b>${y.live_count}</b> · 다음 <b>${w}</b></span
        >
        ${y.over_cap?d`<span
              class="worker-overcap"
              title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
              >cap 초과</span
            >`:""}
        <label class="worker-tgl worker-slots"
          >동시 실행
          <input
            type="number"
            class="worker-slots__input"
            min=${Mr}
            step="1"
            .value=${String(y.slots)}
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
      ${Mo({failure:y.failure,cleanupFailures:y.cleanup_failures})}`}function Pe(y){let w=y.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Tl.map(U=>d`<button
              type="button"
              class="worker-filter__chip${v.spec===U.value?" is-active":""}"
              data-spec=${U.value}
              aria-pressed=${v.spec===U.value?"true":"false"}
            >
              ${U.label}
            </button>`)}
        ${w.spec>0?d`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function et(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${k}
    >
      ${Al.map(y=>d`<option value=${y.value} ?selected=${k===y.value}>
            ${y.label}
          </option>`)}
    </select>`}function Te(y){return d`<div class="worker-lanes">
      ${Ht({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:y.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:et(),controls:Pe(y)})}
      ${Ht({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:y.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ht({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${y.slots}`,items:y.running,body:No(y.running,Date.now(),$)})}
      ${Ht({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:y.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Ht({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 \uC624\uB298 ${y.done.length}`,items:y.done,empty:"\uC644\uB8CC \uC5C6\uC74C"})}
    </div>`}function de(){let y=Ke();ce(ie(y),V),ce(Te(y),x)}function be(y){let w=y.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!w)return;let U=w.dataset.beadId||"",te=w.dataset.lane||"";m={bead_id:U,from_lane:te};try{y.dataTransfer?.setData("text/plain",U),y.dataTransfer&&(y.dataTransfer.effectAllowed="move")}catch{}}function Le(y){let w=y.target?.closest?.(".worker-pane");if(!w)return;let U=w.dataset.lane||"";U!=="candidate"&&U!=="queue"||(y.preventDefault(),y.dataTransfer&&(y.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function He(y){y.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Re(y,w){let U=b.find(C=>C.id===y);if(!U)return;let te=b.filter(C=>C.id!==y),se=te.length;if(w){let C=w.dataset.beadId;if(C===y)return;let j=te.findIndex(W=>W.id===C);j>=0&&(se=j)}let T=te.slice();T.splice(se,0,U),p.applyReorder(y,T,se)}function De(y){let w=y.target?.closest?.(".worker-pane");if(!w)return;y.preventDefault(),w.classList.remove("worker-pane--drag-over");let U=w.dataset.lane||"",te=m?.bead_id||y.dataTransfer?.getData("text/plain")||"",se=m?.from_lane||"";if(m=null,!te)return;let T=y.target?.closest?.(".worker-mini, .worker-card"),C=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),j=C.length;if(T){let W=C.indexOf(T);W>=0&&(j=W)}if(U==="candidate"){if(se==="candidate"){Re(te,T);return}se==="queue"&&Se(te);return}U==="queue"&&(se==="queue"?Ne(te,j):Ce(te,j))}function Ae(y){v=y,xl(y),de()}function We(y){k=y==="board"||y==="created"||y==="spec"?y:Nr,Cl(k),de()}function ye(y){let w=y.target?.closest?.(".worker-filter__blocked");if(w){Ae({...v,show_blocked:w.checked});return}let U=y.target?.closest?.(".worker-sort");if(U){We(U.value||Nr);return}let te=y.target?.closest?.(".worker-slots__input");if(!te)return;let se=Number.parseInt(te.value,10);if(!Number.isFinite(se)){de();return}fe(se).then(de)}function Ee(y){return y?{runner:y.runner||void 0,model:y.model||void 0,effort:y.effort||void 0,worktree:y.worktree||void 0,status:y.status||void 0,session_id:y.session_id||void 0}:{}}function Ge(y){let w=B(),U=w.attempts?w.attempts[y]:null;$=y,H.hidden=!1,h.open({attempt_id:y,meta:Ee(U)}),de()}function Oe(){if(!$)return;let y=B(),w=y.attempts?y.attempts[$]:null;if(w){h.updateMeta(Ee(w));return}h.close()}function Ze(y){let w=y.target;if(w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){M.open();return}let U=w?.closest?.(".worker-banner__resume");if(U){let L=U.dataset.attemptId;L&&_e(L);return}let te=w?.closest?.(".worker-banner__dismiss");if(te){let L=te.dataset.attemptId;L&&$e(L);return}if(w?.closest?.(".worker-play")){lt(!B().auto_advance);return}let se=w?.closest?.(".worker-filter__chip");if(se){let L=se.dataset.spec;(L==="all"||L==="with"||L==="without")&&Ae({...v,spec:L});return}let T=w?.closest?.(".worker-mini__merge");if(T){Ve(T.dataset.beadId||"");return}let C=w?.closest?.(".worker-mini__discard");if(C){pe(C.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__stop")){let g=w?.closest?.(".rtile")?.dataset?.attemptId;g&&Je(g);return}if(w?.closest?.(".rtile__pause")){let g=w?.closest?.(".rtile")?.dataset?.attemptId;g&&ze(g);return}if(w?.closest?.(".rtile__resume")){let g=w?.closest?.(".rtile")?.dataset?.attemptId;g&&_e(g);return}if(w?.closest?.(".rtile__info")){let g=w?.closest?.(".rtile")?.dataset?.beadId;g&&l&&l(g);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){h.close();return}if(w?.closest?.(".worker-drawer-host"))return;let j=w?.closest?.(".rtile");if(j){let L=j.dataset.attemptId;L&&Ge(L);return}let W=w?.closest?.(".worker-mini, .worker-card");if(W){let L=W.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){L&&Ut(L).then(g=>{g?Q("\uBCF5\uC0AC\uB428","success",1200):Q("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}L&&l&&l(L)}}return t.addEventListener("dragstart",be),t.addEventListener("dragover",Le),t.addEventListener("dragleave",He),t.addEventListener("drop",De),t.addEventListener("click",Ze),t.addEventListener("change",ye),c&&F.push(c.subscribe(de)),s&&F.push(s.subscribe(()=>{de(),Oe()})),de(),{load(){de()},destroy(){for(let y of F.splice(0))try{y()}catch{}t.removeEventListener("dragstart",be),t.removeEventListener("dragover",Le),t.removeEventListener("dragleave",He),t.removeEventListener("drop",De),t.removeEventListener("click",Ze),t.removeEventListener("change",ye);try{h.destroy()}catch{}H.hidden=!0;try{M.destroy()}catch{}ce(d``,t)}}}function Nn(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function Bo(t,e,r,n=async()=>{},s=async()=>{}){let o=we("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function p(x){let h=x.target.value,B=e.getState().workspace?.current?.path||"";if(h&&h!==B){o("switching workspace to %s",h),l=!0,S();try{await r(h)}catch(P){o("workspace switch failed: %o",P)}finally{l=!1,S()}}}async function m(){let x=e.getState(),$=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,S();try{await n($)}catch(h){o("workspace git pull failed: %o",h)}finally{a=!1,S()}}}function b(x){let $=x.target;$&&t.contains($)||E()}function v(x){x.key==="Escape"&&E()}function k(){c||(c=!0,document.addEventListener("mousedown",b),document.addEventListener("keydown",v),S())}function E(){c&&(c=!1,document.removeEventListener("mousedown",b),document.removeEventListener("keydown",v),S())}function F(){c?E():k()}async function z(x){let $=x.target,h=$.value,M=$.checked;o("toggling visibility %s \u2192 %s",h,String(M));try{await s(h,M)}catch(B){o("workspace visibility toggle failed: %o",B)}}function V(x){return x?d`
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
    `:d``}function H(x,$){return d`
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
        ${c?d`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${x.map(h=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${h.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${h.path}"
                        .checked=${!$.has(h.path)}
                        @change=${z}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Nn(h.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let x=e.getState(),$=x.workspace?.current,h=x.workspace?.available||[],M=new Set(x.workspace?.hidden||[]),B=$?.path||h[0]?.path||"";if(h.length===0)return d``;let P=h.filter(q=>!M.has(q.path)||q.path===B);if(P.length<=1){let q=P[0]||h[0],Ce=Nn(q.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${q.path}"
            >${Ce}</span
          >
          ${H(h,M)}
          ${V(B)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${P.map(q=>d`
              <option
                value="${q.path}"
                ?selected=${q.path===B}
                title="${q.path}"
              >
                ${Nn(q.path)}
              </option>
            `)}
        </select>
        ${H(h,M)}
        ${V(B)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function S(){ce(N(),t)}return S(),i=e.subscribe(()=>S()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",b),document.removeEventListener("keydown",v),ce(d``,t)}}}var qo=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-pr-merge","worker-pr-discard","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function Pn(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function Uo(t,e,r=Pn()){return{id:r,type:t,payload:e}}function zo(t={}){let e=we("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,p=[],m=new Map,b=new Set;function v(N){for(let S of Array.from(b))try{S(N)}catch{}}function k(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),v(o);let N=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),S=(r.jitterRatio||0)*N,x=Math.max(0,Math.round(N+(Math.random()*2-1)*S));e("ws retry in %d ms (attempt %d)",x,i+1),l=setTimeout(()=>{l=null,H()},x)}function E(N){try{s?.send(JSON.stringify(N))}catch(S){e("ws send failed",S)}}function F(){for(o="open",e("ws open"),v(o),i=0;p.length;){let N=p.shift();N&&E(N)}}function z(N){let S;try{S=JSON.parse(String(N.data))}catch{e("ws received non-JSON message");return}if(!S||typeof S.id!="string"||typeof S.type!="string"){e("ws received invalid envelope");return}if(c.has(S.id)){let $=c.get(S.id);c.delete(S.id),S.ok?$?.resolve(S.payload):$?.reject(S.error||new Error("ws error"));return}let x=m.get(S.type);if(x&&x.size>0)for(let $ of Array.from(x))try{$(S.payload)}catch(h){e("ws event handler error",h)}else e("ws received unhandled message type: %s",S.type)}function V(){o="closed",e("ws closed"),v(o);for(let[N,S]of c.entries())S.reject(new Error("ws disconnected")),c.delete(N);i+=1,k()}function H(){if(!a)return;let N=n();try{s=new WebSocket(N),e("ws connecting %s",N),o="connecting",v(o),s.addEventListener("open",F),s.addEventListener("message",z),s.addEventListener("error",()=>{}),s.addEventListener("close",V)}catch(S){e("ws connect failed %o",S),k()}}return H(),{send(N,S){if(!qo.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let x=Pn(),$=Uo(N,S,x);return e("send %s id=%s",N,x),new Promise((h,M)=>{c.set(x,{resolve:h,reject:M,type:N}),s&&s.readyState===s.OPEN?E($):(e("queue %s id=%s (state=%s)",N,x,o),p.push($))})},on(N,S){m.has(N)||m.set(N,new Set);let x=m.get(N);return x?.add(S),()=>{x?.delete(S)}},onConnection(N){return b.add(N),()=>{b.delete(N)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,H()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function Fl(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function Bl(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var Fn=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ho=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],Wo="worker:queue",Go="ui:order",jo="ui:display-policy",yt="tab:board:closed",Yo="beads-ui.board.closed-range";function ql(t){let e=we("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;ce(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let h=function(f,_){let Z="Request failed",K="";if(f&&typeof f=="object"){let ge=f;if(typeof ge.message=="string"&&ge.message.length>0&&(Z=ge.message),typeof ge.details=="string")K=ge.details;else if(ge.details&&typeof ge.details=="object")try{K=JSON.stringify(ge.details,null,2)}catch{K=""}}else typeof f=="string"&&f.length>0&&(Z=f);let ee=_&&_.length>0?`Failed to load ${_}`:"Request failed";$.open(ee,Z,K)},ie=function(f){return`${I.getState().workspace.current?.path||""}\0${f}`},Pe=function(){ze&&(ze().catch(()=>{}),ze=null),_e=null,$e=null},Te=function(f){Ve=f;let _=()=>{Ve!==f||I.getState().selected_id!==f||(Ve=null,et(f))};if(!fe){lt.then(_);return}_()},He=function(){let f=rs(Le);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Re=function(f){if(f)for(let[_,Z]of Fn){if(de.has(_)||be.has(_))continue;let K=_===yt?He():{type:Z};try{q.register(_,K)}catch(ee){e("register %s store failed: %o",_,ee)}be.add(_),P.subscribeList(_,K).then(ee=>{de.set(_,ee)}).catch(ee=>{e("subscribe %s failed: %o",_,ee),h(ee,"board")}).finally(()=>{be.delete(_)})}else Ae()},Ae=function(){for(let[f]of Fn){let _=de.get(f);_&&(_().catch(()=>{}),de.delete(f));try{q.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}},Ee=function(f){if(!f){Ge();return}for(let[_,Z]of Ho)if(!(We.has(_)||be.has(_))){try{q.register(_,{type:Z})}catch(K){e("register %s store failed: %o",_,K)}be.add(_),P.subscribeList(_,{type:Z}).then(K=>{We.set(_,K)}).catch(K=>{e("subscribe %s failed: %o",_,K),h(K,"worker")}).finally(()=>{be.delete(_)})}ye||(B("subscribe-worker-queue",{id:Wo}).catch(_=>{e("subscribe-worker-queue failed: %o",_)}),ye=()=>B("unsubscribe-worker-queue",{id:Wo}))},Ge=function(){for(let[f]of Ho){let _=We.get(f);_&&(_().catch(()=>{}),We.delete(f));try{q.unregister(f)}catch(Z){e("unregister %s failed: %o",f,Z)}}ye&&(ye().catch(()=>{}),ye=null)},Ze=function(){Oe||(B("subscribe-ui-order",{id:Go}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Oe=()=>B("unsubscribe-ui-order",{id:Go}))},y=function(){Oe&&(Oe().catch(()=>{}),Oe=null),Ne.clear()},U=function(){w||(B("subscribe-display-policy",{id:jo}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),w=()=>B("unsubscribe-display-policy",{id:jo}))},te=function(){w&&(w().catch(()=>{}),w=null),Se.clear()},L=function(f){if(!f)return"Unknown";let _=f.split("/").filter(Boolean);return _.length>0?_[_.length-1]:"Unknown"};var l=h,a=ie,c=Pe,p=Te,m=He,b=Re,v=Ae,k=Ee,E=Ge,F=Ze,z=y,V=U,H=te,N=L;let S=document.getElementById("header-loading"),x=Ss(S),$=xo(t),M=zo(),B=x.wrapSend((f,_)=>M.send(f,_)),P=bs(B),q=ys(),Ce=ks(),Ne=ws(),Se=ns(),Je=ss();M.on("ui-order-snapshot",f=>{let _=f;if(_&&typeof _.revision=="number")try{Ne.set({revision:_.revision,order:_.order&&typeof _.order=="object"?_.order:{}})}catch{}}),M.on("display-policy-snapshot",f=>{let _=f;if(_&&_.policy&&typeof _.policy=="object")try{Se.set(_.policy)}catch{}}),M.on("session-log-snapshot",f=>{let _=f;if(_&&typeof _.attempt_id=="string")try{Je.set(_.attempt_id,Array.isArray(_.lines)?_.lines:[])}catch{}}),M.on("session-log-append",f=>{let _=f;if(_&&typeof _.attempt_id=="string")try{Je.append(_.attempt_id,_.event)}catch{}}),M.on("snapshot",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",K=Z?q.getStore(Z):null;if(K&&_&&_.type==="snapshot")try{K.applyPush(_)}catch{}}),M.on("upsert",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",K=Z?q.getStore(Z):null;if(K&&_&&_.type==="upsert")try{K.applyPush(_)}catch{}}),M.on("delete",f=>{let _=f,Z=_&&typeof _.id=="string"?_.id:"",K=Z?q.getStore(Z):null;if(K&&_&&_.type==="delete")try{K.applyPush(_)}catch{}});let ze=null,_e=null,$e=null,Ve=null,pe=()=>{},lt=new Promise(f=>{pe=()=>f(void 0)}),fe=!1,Ke=!1;async function et(f){let _=ie(f);if(_===_e||_===$e)return;$e=_;let Z=`detail:${f}`,K={type:"issue-detail",params:{id:f}};try{q.register(Z,K)}catch(ee){e("register detail store failed: %o",ee)}try{let ee=await P.subscribeList(Z,K);if(I.getState().selected_id!==f||ie(f)!==_){await ee().catch(()=>{});return}ze&&await ze().catch(()=>{}),ze=ee,_e=_}catch(ee){e("detail subscribe failed: %o",ee),h(ee,"issue details")}finally{$e===_&&($e=null)}}let de=new Map,be=new Set,Le=ur;try{let f=window.localStorage.getItem(Yo);Vr(f)&&(Le=f)}catch{}async function De(f){if(!Vr(f)||f===Le)return;Le=f;try{window.localStorage.setItem(Yo,f)}catch{}let _=de.get(yt);if(!_)return;de.delete(yt),await _().catch(()=>{});let Z=He();try{q.register(yt,Z)}catch(K){e("register %s store failed: %o",yt,K)}try{let K=await P.subscribeList(yt,Z);de.set(yt,K)}catch(K){e("re-subscribe %s failed: %o",yt,K),h(K,"board")}}let We=new Map,ye=null,Oe=null,w=null;async function se(){w=null,Se.clear(),ye=null;let f=I.getState().workspace.current?.path;if(f)try{await M.send("set-workspace",{path:f})}catch(_){e("workspace restore after reconnect failed: %o",_);return}U(),Ee(I.getState().view==="worker")}async function T(){e("clearing all subscriptions for workspace switch"),Ae(),Ge(),Ce.clear(),y(),Ze(),te(),U(),Pe();let f=I.getState();if(f.selected_id)try{q.unregister(`detail:${f.selected_id}`)}catch{}let _=I.getState();Re(_.view==="board"),Ee(_.view==="worker"),_.selected_id&&Te(_.selected_id)}async function C(f){e("requesting workspace switch to %s",f),Ke=!0;try{let _=await M.send("set-workspace",{path:f});e("workspace switch result: %o",_),_&&_.workspace&&(I.setState({workspace:{current:{path:_.workspace.root_dir,database:_.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),_.changed&&(await T(),Q("Switched to "+L(f),"success",2e3)))}catch(_){throw e("workspace switch failed: %o",_),Q("Failed to switch workspace","error",3e3),_}finally{Ke=!1}}async function j(f){e("requesting workspace git pull for %s",f);try{let _=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",_);let Z=_?.status;if(Z==="up_to_date"){Q("Already up to date","success",2e3);return}if(Z==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+L(f),"success",2e3)}catch(_){e("workspace git pull failed: %o",_);let Z=_?.code,K=_?.message;if(Z==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Z==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Z==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let ee=K?`: ${K}`:"";throw Q(`Git pull failed${ee}`,"error",3e3),_}}async function W(f,_){e("setting workspace visibility %s \u2192 %s",f,String(_));try{await M.send("set-workspace-visibility",{path:f,visible:_}),await g()}catch(Z){e("workspace visibility update failed: %o",Z),Q("Failed to update project visibility","error",3e3)}}async function g(){try{let f=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let _=f.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),Z=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,K=Array.isArray(f.hidden)?f.hidden.filter(ge=>typeof ge=="string"):[];I.setState({workspace:{current:Z,available:_,hidden:K}});let ee=window.localStorage.getItem("beads-ui.workspace");ee&&(!_.some(kt=>kt.path===ee)||K.includes(ee)?window.localStorage.removeItem("beads-ui.workspace"):Z&&ee!==Z.path&&(e("restoring saved workspace preference: %s",ee),await C(ee)))}}catch(f){e("failed to load workspaces: %o",f)}}M.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(I.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),g(),T())});let R=!1;if(typeof M.onConnection=="function"){let f=_=>{e("ws state %s",_),_==="reconnecting"||_==="closed"?(R=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):_==="open"&&R&&(R=!1,Q("Reconnected","success",2200),Bl(I,(Z,K)=>{e(`${Z}: %o`,K)}),se())};M.onConnection(f)}let A="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(A=f)}catch(f){e("view parse error: %o",f)}let I=xs({config:Fl(),view:A});M.on("worker-queue-snapshot",f=>{let _=f;if(!_||!_.queue)return;let Z=I.getState().workspace.current?.path;if(typeof Z=="string"&&Z.length>0&&_.root_dir!==Z){e("dropping worker-queue snapshot for %s",String(_.root_dir));return}try{Ce.set(_.queue)}catch{}});let J=vs(I);J.start();let le=async(f,_)=>{try{return await B(f,_)}catch{return[]}};n&&So(n,I,J);let Y=document.getElementById("workspace-picker");Y&&Bo(Y,I,C,j,W);let xe=Co(t,(f,_)=>B(f,_));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>xe.open())}catch{}let ct=$o(t,{policyStore:Se,transport:(f,_)=>B(f,_),labelOptions:()=>{let f=new Set;for(let[_]of Fn)for(let Z of q.snapshotFor(_)||[]){let K=Z.labels;if(Array.isArray(K))for(let ee of K)typeof ee=="string"&&ee.length>0&&f.add(ee)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>ct.open())}catch{}let mt=Ls(s,{gotoIssue:f=>J.gotoIssue(f),issueStores:q,transport:le,uiOrderStore:Ne,displayPolicyStore:Se,closedRange:Le,onClosedRangeChange:f=>{De(f)},onNewIssue:()=>xe.open()}),Lt=Mn(o,{transport:le,issueStores:q,queueStore:Ce,sessionLogStore:Je,uiOrderStore:Ne,gotoIssue:f=>I.setState({selected_id:f}),getWorkspacePath:()=>I.getState().workspace.current?.path}),Xe=ko(i,{issueStores:q,transport:le,queueStore:Ce,sessionLogStore:Je,getWorkspacePath:()=>I.getState().workspace.current?.path,onNavigate:f=>{I.getState().view==="worker"?I.setState({selected_id:f}):J.gotoIssue(f)},onClose:()=>{let f=I.getState();I.setState({selected_id:null});try{J.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),dt=I.getState().selected_id;dt&&(i.hidden=!1,Xe.load(dt),Te(dt)),I.subscribe(f=>{let _=f.selected_id;_?(i.hidden=!1,Xe.load(_),Ke||Te(_)):(Xe.clear(),i.hidden=!0,Pe())});let wt=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",Re(f.view==="board"),Ee(f.view==="worker"),!f.selected_id&&f.view==="board"&&mt.load(),f.view==="worker"&&Lt.load(),window.localStorage.setItem("beads-ui.view",f.view)};I.subscribe(wt),wt(I.getState()),Ze(),U(),g().finally(()=>{fe=!0,pe()}),window.addEventListener("keydown",f=>{let _=f.ctrlKey||f.metaKey,Z=String(f.key||"").toLowerCase(),K=f.target,ee=K&&K.tagName?String(K.tagName).toLowerCase():"",ge=ee==="input"||ee==="textarea"||ee==="select"||K&&typeof K.isContentEditable=="boolean"&&K.isContentEditable;_&&Z==="n"&&(ge||(f.preventDefault(),xe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&ql(e)});export{ql as bootstrap,Fl as readBootstrapConfig,Bl as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
