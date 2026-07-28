var $i=Object.create;var sn=Object.defineProperty;var xi=Object.getOwnPropertyDescriptor;var Si=Object.getOwnPropertyNames;var Ti=Object.getPrototypeOf,Ai=Object.prototype.hasOwnProperty;var Ei=(t,e,r)=>e in t?sn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var on=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Ci=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Si(e))!Ai.call(t,s)&&s!==r&&sn(t,s,{get:()=>e[s],enumerable:!(n=xi(e,s))||n.enumerable});return t};var Ri=(t,e,r)=>(r=t!=null?$i(Ti(t)):{},Ci(e||!t||!t.__esModule?sn(r,"default",{value:t,enumerable:!0}):r,t));var me=(t,e,r)=>Ei(t,typeof e!="symbol"?e+"":e,r);var As=on((Oc,Ts)=>{var jt=1e3,Yt=jt*60,Vt=Yt*60,Ot=Vt*24,Mi=Ot*7,Ni=Ot*365.25;Ts.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return Pi(t);if(r==="number"&&isFinite(t))return e.long?qi(t):Fi(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Pi(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),n=(e[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ni;case"weeks":case"week":case"w":return r*Mi;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Vt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Yt;case"seconds":case"second":case"secs":case"sec":case"s":return r*jt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Fi(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Vt?Math.round(t/Vt)+"h":e>=Yt?Math.round(t/Yt)+"m":e>=jt?Math.round(t/jt)+"s":t+"ms"}function qi(t){var e=Math.abs(t);return e>=Ot?Ir(t,e,Ot,"day"):e>=Vt?Ir(t,e,Vt,"hour"):e>=Yt?Ir(t,e,Yt,"minute"):e>=jt?Ir(t,e,jt,"second"):t+" ms"}function Ir(t,e,r,n){var s=e>=r*1.5;return Math.round(t/r)+" "+n+(s?"s":"")}});var Cs=on((Mc,Es)=>{function Bi(t){r.debug=r,r.default=r,r.coerce=a,r.disable=i,r.enable=s,r.enabled=l,r.humanize=As(),r.destroy=c,Object.keys(t).forEach(_=>{r[_]=t[_]}),r.names=[],r.skips=[],r.formatters={};function e(_){let h=0;for(let k=0;k<_.length;k++)h=(h<<5)-h+_.charCodeAt(k),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(_){let h,k=null,v,y;function x(...N){if(!x.enabled)return;let P=x,q=Number(new Date),U=q-(h||q);P.diff=U,P.prev=h,P.curr=q,h=q,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let D=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(A,$)=>{if(A==="%%")return"%";D++;let g=r.formatters[$];if(typeof g=="function"){let M=N[D];A=g.call(P,M),N.splice(D,1),D--}return A}),r.formatArgs.call(P,N),(P.log||r.log).apply(P,N)}return x.namespace=_,x.useColors=r.useColors(),x.color=r.selectColor(_),x.extend=n,x.destroy=r.destroy,Object.defineProperty(x,"enabled",{enumerable:!0,configurable:!1,get:()=>k!==null?k:(v!==r.namespaces&&(v=r.namespaces,y=r.enabled(_)),y),set:N=>{k=N}}),typeof r.init=="function"&&r.init(x),x}function n(_,h){let k=r(this.namespace+(typeof h>"u"?":":h)+_);return k.log=this.log,k}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let h=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let k of h)k[0]==="-"?r.skips.push(k.slice(1)):r.names.push(k)}function o(_,h){let k=0,v=0,y=-1,x=0;for(;k<_.length;)if(v<h.length&&(h[v]===_[k]||h[v]==="*"))h[v]==="*"?(y=v,x=k,v++):(k++,v++);else if(y!==-1)v=y+1,x++,k=x;else return!1;for(;v<h.length&&h[v]==="*";)v++;return v===h.length}function i(){let _=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),_}function l(_){for(let h of r.skips)if(o(_,h))return!1;for(let h of r.names)if(o(_,h))return!0;return!1}function a(_){return _ instanceof Error?_.stack||_.message:_}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Es.exports=Bi});var Rs=on((it,Dr)=>{it.formatArgs=zi;it.save=Hi;it.load=Wi;it.useColors=Ui;it.storage=Gi();it.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();it.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ui(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function zi(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+Dr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,n=0;t[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),t.splice(n,0,e)}it.log=console.debug||console.log||(()=>{});function Hi(t){try{t?it.storage.setItem("debug",t):it.storage.removeItem("debug")}catch{}}function Wi(){let t;try{t=it.storage.getItem("debug")||it.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Gi(){try{return localStorage}catch{}}Dr.exports=Cs()(it);var{formatters:ji}=Dr.exports;ji.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var ir=globalThis,Rr=ir.trustedTypes,hs=Rr?Rr.createPolicy("lit-html",{createHTML:t=>t}):void 0,ks="$lit$",xt=`lit$${Math.random().toFixed(9).slice(2)}$`,ys="?"+xt,Li=`<${ys}>`,It=document,ar=()=>It.createComment(""),lr=t=>t===null||typeof t!="object"&&typeof t!="function",fn=Array.isArray,Ii=t=>fn(t)||typeof t?.[Symbol.iterator]=="function",an=`[ 	
\f\r]`,or=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_s=/-->/g,gs=/>/g,Rt=RegExp(`>|${an}(?:([^\\s"'>=/]+)(${an}*=${an}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ms=/'/g,bs=/"/g,vs=/^(?:script|style|textarea|title)$/i,hn=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=hn(1),Ec=hn(2),Cc=hn(3),Dt=Symbol.for("lit-noChange"),Ie=Symbol.for("lit-nothing"),ws=new WeakMap,Lt=It.createTreeWalker(It,129);function $s(t,e){if(!fn(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return hs!==void 0?hs.createHTML(e):e}var Di=(t,e)=>{let r=t.length-1,n=[],s,o=e===2?"<svg>":e===3?"<math>":"",i=or;for(let l=0;l<r;l++){let a=t[l],c,_,h=-1,k=0;for(;k<a.length&&(i.lastIndex=k,_=i.exec(a),_!==null);)k=i.lastIndex,i===or?_[1]==="!--"?i=_s:_[1]!==void 0?i=gs:_[2]!==void 0?(vs.test(_[2])&&(s=RegExp("</"+_[2],"g")),i=Rt):_[3]!==void 0&&(i=Rt):i===Rt?_[0]===">"?(i=s??or,h=-1):_[1]===void 0?h=-2:(h=i.lastIndex-_[2].length,c=_[1],i=_[3]===void 0?Rt:_[3]==='"'?bs:ms):i===bs||i===ms?i=Rt:i===_s||i===gs?i=or:(i=Rt,s=void 0);let v=i===Rt&&t[l+1].startsWith("/>")?" ":"";o+=i===or?a+Li:h>=0?(n.push(c),a.slice(0,h)+ks+a.slice(h)+xt+v):a+xt+(h===-2?l:v)}return[$s(t,o+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},cr=class t{constructor({strings:e,_$litType$:r},n){let s;this.parts=[];let o=0,i=0,l=e.length-1,a=this.parts,[c,_]=Di(e,r);if(this.el=t.createElement(c,n),Lt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=Lt.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(ks)){let k=_[i++],v=s.getAttribute(h).split(xt),y=/([.?@])?(.*)/.exec(k);a.push({type:1,index:o,name:y[2],strings:v,ctor:y[1]==="."?cn:y[1]==="?"?dn:y[1]==="@"?un:Wt}),s.removeAttribute(h)}else h.startsWith(xt)&&(a.push({type:6,index:o}),s.removeAttribute(h));if(vs.test(s.tagName)){let h=s.textContent.split(xt),k=h.length-1;if(k>0){s.textContent=Rr?Rr.emptyScript:"";for(let v=0;v<k;v++)s.append(h[v],ar()),Lt.nextNode(),a.push({type:2,index:++o});s.append(h[k],ar())}}}else if(s.nodeType===8)if(s.data===ys)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(xt,h+1))!==-1;)a.push({type:7,index:o}),h+=xt.length-1}o++}}static createElement(e,r){let n=It.createElement("template");return n.innerHTML=e,n}};function Ht(t,e,r=t,n){if(e===Dt)return e;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=lr(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(t),s._$AT(t,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(e=Ht(t,s._$AS(t,e.values),s,n)),e}var ln=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:n}=this._$AD,s=(e?.creationScope??It).importNode(r,!0);Lt.currentNode=s;let o=Lt.nextNode(),i=0,l=0,a=n[0];for(;a!==void 0;){if(i===a.index){let c;a.type===2?c=new dr(o,o.nextSibling,this,e):a.type===1?c=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(c=new pn(o,this,e)),this._$AV.push(c),a=n[++l]}i!==a?.index&&(o=Lt.nextNode(),i++)}return Lt.currentNode=It,s}p(e){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,r),r+=n.strings.length-2):n._$AI(e[r])),r++}},dr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,n,s){this.type=2,this._$AH=Ie,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ht(this,e,r),lr(e)?e===Ie||e==null||e===""?(this._$AH!==Ie&&this._$AR(),this._$AH=Ie):e!==this._$AH&&e!==Dt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ii(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ie&&lr(this._$AH)?this._$AA.nextSibling.data=e:this.T(It.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:n}=e,s=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=cr.createElement($s(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ln(s,this),i=o.u(this.options);o.p(r),this.T(i),this._$AH=o}}_$AC(e){let r=ws.get(e.strings);return r===void 0&&ws.set(e.strings,r=new cr(e)),r}k(e){fn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of e)s===r.length?r.push(n=new t(this.O(ar()),this.O(ar()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let n=e.nextSibling;e.remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Wt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,n,s,o){this.type=1,this._$AH=Ie,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ie}_$AI(e,r=this,n,s){let o=this.strings,i=!1;if(o===void 0)e=Ht(this,e,r,0),i=!lr(e)||e!==this._$AH&&e!==Dt,i&&(this._$AH=e);else{let l=e,a,c;for(e=o[0],a=0;a<o.length-1;a++)c=Ht(this,l[n+a],r,a),c===Dt&&(c=this._$AH[a]),i||(i=!lr(c)||c!==this._$AH[a]),c===Ie?e=Ie:e!==Ie&&(e+=(c??"")+o[a+1]),this._$AH[a]=c}i&&!s&&this.j(e)}j(e){e===Ie?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},cn=class extends Wt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ie?void 0:e}},dn=class extends Wt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ie)}},un=class extends Wt{constructor(e,r,n,s,o){super(e,r,n,s,o),this.type=5}_$AI(e,r=this){if((e=Ht(this,e,r,0)??Ie)===Dt)return;let n=this._$AH,s=e===Ie&&n!==Ie||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==Ie&&(n===Ie||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},pn=class{constructor(e,r,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ht(this,e)}};var Oi=ir.litHtmlPolyfillSupport;Oi?.(cr,dr),(ir.litHtmlVersions??(ir.litHtmlVersions=[])).push("3.3.1");var _e=(t,e,r)=>{let n=r?.renderBefore??e,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new dr(e.insertBefore(ar(),o),o,void 0,r??{})}return s._$AI(t),s};var St="today",ur=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Gt(t){return t==="today"||t==="7d"||t==="30d"||t==="all"}function Lr(t,e=Date.now()){switch(t){case"today":{let r=new Date(e);return r.setHours(0,0,0,0),r.getTime()}case"7d":return e-7*864e5;case"30d":return e-30*864e5;case"all":default:return}}function xs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function Ss(){let t=new Map,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{set(n,s){t.set(n,{lines:Array.isArray(s)?[...s]:[]}),r()},append(n,s){let o=t.get(n)||{lines:[]};o.lines=[...o.lines,s],t.set(n,o),r()},get(n){return t.get(n)||null},clear(n){typeof n=="string"?t.delete(n):t.clear(),r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}var Ls=Ri(Rs(),1);function Ee(t){return(0,Ls.default)(`beads-ui:${t}`)}function ht(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Mt(t,e){let r=ht(t.created_at),n=ht(e.created_at);if(r!==n)return r<n?1:-1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Os(t,e){let r=ht(t.created_at),n=ht(e.created_at);if(r!==n)return r<n?-1:1;let s=t.priority??2,o=e.priority??2;if(s!==o)return s-o;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ms(t,e){let r=ht(t.updated_at),n=ht(e.updated_at);if(r!==n)return r<n?1:-1;let s=t.id,o=e.id;return s<o?-1:s>o?1:0}function Ns(t,e){let r=t.priority??2,n=e.priority??2;if(r!==n)return r-n;let s=ht(t.created_at),o=ht(e.created_at);if(s!==o)return s<o?1:-1;let i=t.id,l=e.id;return i<l?-1:i>l?1:0}function Ps(t,e){let r=t.closed_at??0,n=e.closed_at??0;if(r!==n)return r<n?1:-1;let s=t?.id,o=e?.id;return s<o?-1:s>o?1:0}var Yi=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Is(t){let e=t&&t.metadata,r=e?e.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ds(t){let e=t&&t.title;if(typeof e!="string")return Number.POSITIVE_INFINITY;let r=Yi.exec(e);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Fs(t,e){let r=Is(t),n=Is(e);if(r!==n)return r<n?-1:1;let s=Ds(t),o=Ds(e);if(s!==o)return s<o?-1:1;let i=ht(t&&t.created_at),l=ht(e&&e.created_at);if(i!==l)return i<l?-1:1;let a=t&&t.id,c=e&&e.id;return a===c?0:String(a)<String(c)?-1:1}var _n=2**20;function Kt(t,e){let r=t&&t.id;return e&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(e,r)&&typeof e[r]=="number"&&Number.isFinite(e[r])?e[r]:-ht(t&&t.created_at)}function Or(t){return(e,r)=>{let n=Kt(e,t),s=Kt(r,t);if(n!==s)return n<s?-1:1;let o=e?.id,i=r?.id;return o<i?-1:o>i?1:0}}function gn(t,e,r){let n=Array.isArray(t)?t:[],s=n.length,o=Math.max(0,Math.min(e,s-1)),i=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!i&&!l)return{rank:0};if(!i)return{rank:Kt(l,r)-_n};if(!l)return{rank:Kt(i,r)+_n};let a=Kt(i,r),c=Kt(l,r),_=(a+c)/2;return a<_&&_<c?{rank:_}:{renormalize:n.map((h,k)=>({bead_id:h.id,rank:k*_n}))}}function mn(t,e={}){let r=Ee(`issue-store:${t}`),n=new Map,s=[],o=0,i=new Set,l=!1,a=e.sort||Mt;function c(){for(let k of Array.from(i))try{k()}catch{}}function _(){s=Array.from(n.values()).sort(a)}function h(k){if(l||!k||k.id!==t)return;let v=Number(k.revision)||0;if(r("apply %s rev=%d",k.type,v),!(v<=o&&k.type!=="snapshot")){if(k.type==="snapshot"){if(v<=o)return;n.clear();let y=Array.isArray(k.issues)?k.issues:[];for(let x of y)x&&typeof x.id=="string"&&x.id.length>0&&n.set(x.id,x);_(),o=v,c();return}if(k.type==="upsert"){let y=k.issue;if(y&&typeof y.id=="string"&&y.id.length>0){let x=n.get(y.id);if(!x)n.set(y.id,y);else{let N=Number.isFinite(x.updated_at)?x.updated_at:0,P=Number.isFinite(y.updated_at)?y.updated_at:0;if(N<=P){for(let q of Object.keys(x))q in y||delete x[q];for(let[q,U]of Object.entries(y))x[q]=U}}_()}o=v,c()}else if(k.type==="delete"){let y=String(k.issue_id||"");y&&(n.delete(y),_()),o=v,c()}}}return{id:t,subscribe(k){return i.add(k),()=>{i.delete(k)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(k){return n.get(k)},dispose(){l=!0,n.clear(),s=[],i.clear(),o=0}}}function Mr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let s=Object.keys(t.params).sort();for(let o of s){let i=t.params[o];r[o]=String(i)}}let n=new URLSearchParams(r).toString();return n.length>0?`${e}?${n}`:e}function qs(t){let e=Ee("subs"),r=new Map,n=new Map;function s(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=n.get(l);if(!c||c.size===0)return;let _=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],k=Array.isArray(a.removed)?a.removed:[];for(let v of Array.from(c)){let y=r.get(v);if(!y)continue;let x=y.itemsById;for(let N of _)typeof N=="string"&&N.length>0&&x.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&x.set(N,!0);for(let N of k)typeof N=="string"&&N.length>0&&x.delete(N)}}async function o(l,a){let c=Mr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let k=n.get(h.key);k&&(k.delete(l),k.size===0&&n.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}n.has(c)||n.set(c,new Set);let _=n.get(c);_&&_.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let k=r.get(l)||null;if(k){let v=n.get(k.key);v&&(v.delete(l),v.size===0&&n.delete(k.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let k=n.get(h.key);k&&(k.delete(l),k.size===0&&n.delete(h.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Mr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let _ of a.itemsById.keys())c[_]=!0;return c}}}}function Bs(){let t=Ee("issue-stores"),e=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let a of Array.from(n))try{a()}catch{}}function i(a,c,_){let h=c?Mr(c):"",k=r.get(a)||"",v=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,k),v&&k&&h&&k!==h){let y=e.get(a);if(y)try{y.dispose()}catch{}let x=s.get(a);if(x){try{x()}catch{}s.delete(a)}let N=mn(a,_);e.set(a,N);let P=N.subscribe(()=>o());s.set(a,P)}else if(!v){let y=mn(a,_);e.set(a,y);let x=y.subscribe(()=>o());s.set(a,x)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let _=s.get(a);if(_){try{_()}catch{}s.delete(a)}}return{register:i,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return n.add(a),()=>n.delete(a)}}}function Us(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function zs(){let t=null,e=new Set;function r(){for(let n of Array.from(e))try{n()}catch{}}return{get(){return t},set(n){t=n,r()},clear(){t=null,r()},subscribe(n){return e.add(n),()=>e.delete(n)}}}function bn(t,e){return`#/${t==="worker"?"worker":"board"}?issue=${encodeURIComponent(e)}`}function Vi(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ki(t){let e=String(t||"");return/^#\/worker(\b|\/|$)/.test(e)?"worker":"board"}function Hs(t){let e=Ee("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Vi(n),i=Ki(n);if(e("hash change \u2192 view=%s id=%s",i,o),t.setState({selected_id:i==="worker"?null:o,view:i,worker:{selected_parent_id:i==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let a=o?`#/${i}?issue=${encodeURIComponent(o)}`:`#/${i}`;window.location.hash!==a&&(window.location.hash=a)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let o=(t.getState?t.getState():{view:"board"}).view==="worker"?"worker":"board",i=bn(o,n);e("goto issue %s (view=%s)",n,o),window.location.hash!==i?window.location.hash=i:t.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,i=o?bn(n,o):`#/${n}`;e("goto view %s (id=%s)",n,o||""),window.location.hash!==i?window.location.hash=i:t.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Zi=Object.freeze({workspace_config:{default_workspace:null}});function Ws(t){return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:Zi.workspace_config.default_workspace}}}function Gs(t={}){let e=Ee("state"),r={selected_id:t.selected_id??null,view:t.view??"board",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[],hidden:t.workspace?.hidden??[]},config:Ws(t.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let i={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ws(o.config):r.config},l=i.workspace.current?.path!==r.workspace.current?.path||i.workspace.available.length!==r.workspace.available.length||i.workspace.hidden.length!==r.workspace.hidden.length||i.workspace.hidden.some((c,_)=>c!==r.workspace.hidden[_]),a=i.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;i.selected_id===r.selected_id&&i.view===r.view&&i.filters.status===r.filters.status&&i.filters.search===r.filters.search&&i.filters.type===r.filters.type&&i.board.closed_filter===r.board.closed_filter&&i.board.show_deferred_column===r.board.show_deferred_column&&i.worker.selected_parent_id===r.worker.selected_parent_id&&i.worker.show_closed_children.length===r.worker.show_closed_children.length&&i.worker.show_closed_children.every((c,_)=>c===r.worker.show_closed_children[_])&&!l&&!a||(r=i,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function js(t){let e=Ee("activity"),r=0,n=new Map,s=1;function o(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function i(){r+=1,e("start count=%d",r),o()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),o()}function a(c){return async(h,k)=>{let v=s++,y=Date.now();n.set(v,{type:h,start_ts:y}),e("request start id=%d type=%s count=%d",v,h,r+1),i();let x=!1,N=()=>{x||(x=!0,n.delete(v),l())},P=setTimeout(()=>{x||(e("request TIMEOUT id=%d type=%s elapsed=%dms",v,h,Date.now()-y),N())},3e4);try{let q=await c(h,k),U=Date.now()-y;return e("request done id=%d type=%s elapsed=%dms",v,h,U),q}catch(q){let U=Date.now()-y;throw e("request error id=%d type=%s elapsed=%dms err=%o",v,h,U,q),q}finally{clearTimeout(P),N()}}}return o(),{wrapSend:a,start:i,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(n.entries()).map(([_,h])=>({id:_,type:h.type,elapsed_ms:c-h.start_ts}))}}}function J(t,e="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=t,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",e==="success"?n.style.background="#156d36":e==="warning"?n.style.background="#a36a00":e==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Nr(t=void 0,e=void 0){function r(){if(!e||typeof e.get!="function")return null;let o=e.get();return o&&o.order?o.order:{}}function n(o,i,l){let a=t&&t.snapshotFor?t.snapshotFor(o).slice():[];if(i==="closed")return a.sort(Ps),a;switch(l){case"created_desc":return a.sort(Mt),a;case"created_asc":return a.sort(Os),a;case"updated_desc":return a.sort(Ms),a;case"priority":return a.sort(Ns),a;case"manual":default:{let c=r();return c?a.sort(Or(c)):a.sort(Mt),a}}}function s(o){let i=[];return t&&typeof t.subscribe=="function"&&i.push(t.subscribe(o)),e&&typeof e.subscribe=="function"&&i.push(e.subscribe(o)),()=>{for(let l of i)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Pr(t){let e=t.transport,r=t.uiOrderStore;function n(i,l){return"renormalize"in i?i.renormalize:[{bead_id:l,rank:i.rank}]}function s(i,l){let a={...i.order};for(let c of l)a[c.bead_id]=c.rank;r&&r.set({revision:i.revision,order:a})}async function o(i,l,a){if(!e||!r)return;let c=r.get()||{revision:0,order:{}},_=n(gn(l,a,c.order),i);s(c,_);let h=await e("ui-order-set",{expected_revision:c.revision,entries:_});if(h&&h.conflict){let k={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(k);let v=n(gn(l,a,k.order),i);s(k,v);let y=await e("ui-order-set",{expected_revision:k.revision,entries:v});y&&y.applied&&r.set({revision:typeof y.revision=="number"?y.revision:0,order:y.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function Fr(t){return Array.isArray(t)?t.filter(e=>typeof e=="string"):[]}function wn(t,e){return!e||typeof t!="string"||t.length===0||Fr(e.visible_labels).includes(t)?!0:Fr(e.hidden_labels).includes(t)?!1:!Fr(e.hidden_prefixes).some(r=>r.length>0&&t.startsWith(r))}function Ys(t,e){return Fr(t).filter(r=>wn(r,e))}function Nt(t,e){let r=t&&t.chips?t.chips[e]:void 0;return typeof r=="boolean"?r:!0}function kn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function _t(t){let e=kn(t);if(e===null)return"";let r=new Date(e),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Zt(t,e){let r=kn(t);if(r===null)return"";let s=(typeof e=="number"?e:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let i=Math.floor(s/36e5);if(i<24)return`${i}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}var Xi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Qi={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},Ji={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},ea={reviewed:"\u2713",skip:"\u2298",stale:"\u2713"};function ta(t,e,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of t)if(e[s]&&e[s].state==="dim")return s;return null}function ra(t,e,r){let n=Xi[t]||t,s=e&&e.state||"empty",o=ea[s]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="on"||s==="reviewed"||s==="skip"?i+=` b-${n} on`:s==="stale"&&(i+=` b-${n} stale`),r&&(i+=" glow");let l=s==="empty"?"lbl":`lbl l-${n} on`,a=r?`color: var(--stage-${n}-on)`:"";return d`
    <div class="seg">
      <div class=${i} style=${a}>${o}</div>
      <div class=${l}>
        ${Qi[t]||t}
      </div>
    </div>
  `}function qr(t,e){if(!t||!t.stages)return"";let r=t.route==="full_plan"?"full_plan":"spec_backed",n=Ji[r],s=t.stages,o=ta(n,s,String(e||"open"));return d`
    <div class="stp" role="img" aria-label="워크플로우 진행 스테퍼">
      ${n.map(i=>ra(i,s[i]||{state:"empty"},i===o))}
    </div>
  `}function na(t){return typeof t!="number"||!Number.isFinite(t)?"":`P${Math.max(0,Math.min(4,t))}`}var Vs=2;function sa(t){if(!t)return[];let e=[];if(t.external){let n=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";e.push(d`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[];if(r.length>0){let n=r.slice(0,Vs).join(", "),s=r.length-Vs,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;e.push(d`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return e}function oa(t,e){let r=e.policy||null,n=t.workflow&&t.workflow.chips||{},s=[];if(n.route&&Nt(r,"route")){let o=n.route_source==="derived";s.push(d`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&Nt(r,"fast_track")&&s.push(d`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Nt(r,"pr")){let o=n.pr.number;s.push(d`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of Ys(t.labels,r))s.push(d`<span class="ctl-chip ctl-chip--label">${o}</span>`);return t.from_id&&Nt(r,"from")&&s.push(d`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${t.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),e.onFromChipClick&&e.onFromChipClick(o,String(t.from_id))}}
      >
        ↩ from ${t.from_id}
      </button>`),Nt(r,"blocked")&&s.push(...sa(t.blocked_info)),s.length===0?"":d`<div class="board-card__chips">${s}</div>`}function ia(t){switch(t){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function aa(t){let e=Zt(t.created_at),r=Zt(t.updated_at);return!e&&!r?"":d`<span class="board-card__times">
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
  </span>`}function la(t,e){let r=e.rollupFor?e.rollupFor(t.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=e.isExpanded?e.isExpanded(t.id):!0,o=n>0?r.children.slice().sort(Fs):r.children;return d`
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
        ${aa(t)}
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
                  <span class=${ia(i.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${i.title||i.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function Ks(t,e){let r=na(t.priority);return d`
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
      ${oa(t,e)}
      ${t.workflow&&Nt(e.policy||null,"stepper")?qr(t.workflow,t.status):""}
      ${la(t,e)}
    </article>
  `}function Pt(t,e){let r=Array.isArray(t.items)?t.items.length:0,n=t.is_closed===!0;return d`
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
              ${ur.map(o=>d`<option
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
        ${t.items.map(o=>Ks(o,e))}
      </div>
    </section>
  `}var ca=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],da=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],ua=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function pa(t,e,r){let n=t.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return d`
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
  `}function Zs(t,e,r){return d`
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
        ${ca.map(n=>d`<option
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
        ${da.map(n=>d`<option
              value=${n.value}
              ?selected=${t.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${pa(t,e,r)}
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
        ${ua.map(n=>d`<option
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
  `}var fa=200,ha={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","deferred-col":"deferred","closed-col":"closed"},_a=new Set(["blocked-col","ready-col","in-progress-col","resolved-col","deferred-col"]),Xs="beads-ui.board.sort",Qs=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ga(){try{let t=window.localStorage.getItem(Xs);if(t&&Qs.has(t))return t}catch{}return"created_desc"}function Js(t,e){let r=Ee("views:board"),n=e.gotoIssue,s=e.issueStores,o=e.transport,i=e.uiOrderStore,l=e.displayPolicyStore,a=e.onClosedRangeChange,c=e.onNewIssue,_=e.closedRange||St,h=s?Nr(s,i):null,k=Pr({transport:o,uiOrderStore:i}),v=[],y=[],x=[],N=[],P=[],q=[],U=!1,D=0,E=ga(),A=new Map,$=new Map,g=new Map,M=new Set,B={search:"",priority:"",type:"",labels:[]},j=!1,V=null;function ve(C){return String(C.status||"open")==="open"}function Pe(C){let O=String(C.status||"open");return O==="open"||O==="blocked"}function ye(C){let O=B.search.trim().toLowerCase(),ee=B.priority,Q=B.type,K=B.labels;return C.filter(ne=>{if(O){let ce=String(ne.id||"").toLowerCase(),fe=String(ne.title||"").toLowerCase();if(!ce.includes(O)&&!fe.includes(O))return!1}if(ee!==""&&String(ne.priority)!==ee||Q!==""&&String(ne.issue_type||"")!==Q)return!1;if(K.length>0){let ce=Array.isArray(ne.labels)?ne.labels:[];if(!K.some(fe=>ce.includes(fe)))return!1}return!0})}function ae(){let C=new Set;for(let O of[v,y,x,N,P,q])for(let ee of O){let Q=Array.isArray(ee.labels)?ee.labels:[];for(let K of Q)typeof K=="string"&&K.length>0&&C.add(K)}return Array.from(C).sort()}function oe(){return B.search.trim()!==""||B.priority!==""||B.type!==""||B.labels.length>0}function xe(){try{if(h){let C=h.selectBoardColumn("tab:board:in-progress","in_progress",E),O=h.selectBoardColumn("tab:board:blocked","blocked",E).filter(Pe),ee=new Set(C.map(S=>S.id)),Q=h.selectBoardColumn("tab:board:ready","ready",E).filter(S=>ve(S)&&!ee.has(S.id)),K=h.selectBoardColumn("tab:board:resolved","resolved",E),ne=h.selectBoardColumn("tab:board:deferred","deferred",E),ce=U?ne:[],fe=h.selectBoardColumn("tab:board:closed","closed").slice(0,fa),F=[...O,...Q,...C,...K,...ce,...fe];st(F);let w=new Set;for(let S of F)S&&S.id&&!yn(S)&&w.add(S.id);let I=!oe();v=I?Xt(O,w):O,y=I?Xt(Q,w):Q,x=I?Xt(C,w):C,N=I?Xt(K,w):K,P=I?Xt(ce,w):ce,D=ne.length,q=I?Xt(fe,w):fe,A=new Map;for(let S of v)A.set(S.id,"open");for(let S of y)A.set(S.id,"open");for(let S of x)A.set(S.id,"in_progress");for(let S of N)A.set(S.id,"resolved");for(let S of P)A.set(S.id,"deferred");for(let S of q)A.set(S.id,"closed");$=new Map;for(let S of v)$.set(S.id,"blocked-col");for(let S of y)$.set(S.id,"ready-col");for(let S of x)$.set(S.id,"in-progress-col");for(let S of N)$.set(S.id,"resolved-col");for(let S of P)$.set(S.id,"deferred-col");for(let S of q)$.set(S.id,"closed-col")}Ce()}catch{v=[],y=[],x=[],N=[],P=[],q=[],g=new Map,Ce()}}function st(C){let O=new Map;for(let Q of C)Q&&Q.id&&!O.has(Q.id)&&O.set(Q.id,Q);let ee=new Map;for(let Q of O.values()){let K=yn(Q);if(!K)continue;let ne=ee.get(K);ne||(ne=[],ee.set(K,ne)),ne.push({id:Q.id,title:Q.title,status:Q.status,metadata:Q.metadata,created_at:Q.created_at})}g=ee}function ct(C){let O=g.get(C)||[],ee=0,Q=null;for(let K of O)(K.status==="resolved"||K.status==="closed")&&(ee+=1),!Q&&K.status==="in_progress"&&(Q=K);return{total:O.length,count:ee,current:Q,children:O}}function be(C){return!M.has(C)}function Ge(C,O){C.preventDefault(),C.stopPropagation(),M.has(O)?M.delete(O):M.add(O),Ce()}function we(C,O){C.preventDefault(),C.stopPropagation(),n(O)}function at(C,O){C.preventDefault(),C.stopPropagation(),n(O)}function ue(C,O){V||n(O)}function Me(C,O){C.preventDefault(),C.stopPropagation(),ma(O).then(ee=>{ee&&J("\uBCF5\uC0AC\uB428","success",1200)})}function dt(C,O){V=O,C.dataTransfer&&(C.dataTransfer.setData("text/plain",O),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function Fe(C){C.target.classList.remove("board-card--dragging"),ft(),setTimeout(()=>{V=null},0)}function je(C){let O=String(C.target.value||"");!O||O===_||(_=O,a&&a(O),Ce())}let Se={onCardClick:ue,onCopyId:Me,onDragStart:dt,onDragEnd:Fe,onClosedRangeChange:je,rollupFor:ct,isExpanded:be,onRollupToggle:Ge,onChildClick:we,onFromChipClick:at,get policy(){return l?l.get():null}};function Ye(C){let O=C.target,ee=t.querySelector(".board-filter__labels");O&&ee&&ee.contains(O)||Xe()}function Ze(C){C.key==="Escape"&&Xe()}function Ve(){j||(j=!0,document.addEventListener("mousedown",Ye),document.addEventListener("keydown",Ze),Ce())}function Xe(){j&&(j=!1,document.removeEventListener("mousedown",Ye),document.removeEventListener("keydown",Ze),Ce())}let qe={onSearchInput(C){B.search=String(C.target.value||""),xe()},onPriorityChange(C){B.priority=String(C.target.value||""),xe()},onTypeChange(C){B.type=String(C.target.value||""),xe()},onSortChange(C){let O=String(C.target.value||"");if(!(!Qs.has(O)||O===E)){E=O;try{window.localStorage.setItem(Xs,O)}catch{}xe()}},onDeferredToggle(){U=!U,xe()},onLabelMenuToggle(){j?Xe():Ve()},onLabelToggle(C){let O=B.labels.indexOf(C);O===-1?B.labels.push(C):B.labels.splice(O,1),xe()},onLabelClear(){B.labels.length!==0&&(B.labels=[],xe())},onNewIssue(){c&&c()}};function Qe(){let C=U?"board-root board-root--deferred":"board-root";return d`
      <div class="board-view">
        ${Zs(B,qe,{sort_mode:E,show_deferred:U,deferred_count:D,label_options:ae(),label_menu_open:j})}
        <div class=${C}>
          ${Pt({title:"Blocked",id:"blocked-col",items:ye(v)},Se)}
          ${Pt({title:"Ready",id:"ready-col",items:ye(y)},Se)}
          ${Pt({title:"In progress",id:"in-progress-col",items:ye(x)},Se)}
          ${Pt({title:"Resolved",id:"resolved-col",items:ye(N)},Se)}
          ${U?Pt({title:"Deferred",id:"deferred-col",items:ye(P)},Se):""}
          ${Pt({title:"Closed",id:"closed-col",items:ye(q),is_closed:!0,closed_range:_},Se)}
        </div>
      </div>
    `}function Ce(){_e(Qe(),t),Be()}function Be(){try{let C=Array.from(t.querySelectorAll(".board-column"));for(let O of C)Array.from(O.querySelectorAll(".board-card")).forEach((Q,K)=>{Q.tabIndex=K===0?0:-1})}catch{}}async function ot(C,O){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:O}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){r("update-status failed: %o",ee),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ue(C){switch(C){case"blocked-col":return v;case"ready-col":return y;case"in-progress-col":return x;case"resolved-col":return N;case"deferred-col":return P;default:return[]}}function lt(C,O,ee){if(!o||!i)return;let Q=Ue(C),K=Q.find(w=>w.id===O);if(!K)return;let ne=Q.filter(w=>w.id!==O),ce=ee.closest?ee.closest(".board-card"):null,fe=ne.length;if(ce){let w=ce.getAttribute("data-issue-id");if(w===O)return;let I=ne.findIndex(S=>S.id===w);I>=0&&(fe=I)}let F=ne.slice();F.splice(fe,0,K),k.applyReorder(O,F,fe)}function ft(){for(let C of Array.from(t.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let $e=null;t.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let ee=C.target.closest(".board-column");ee&&ee!==$e&&($e&&$e.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),$e=ee)}),t.addEventListener("dragleave",C=>{let O=C.relatedTarget;(!O||!t.contains(O))&&$e&&($e.classList.remove("board-column--drag-over"),$e=null)}),t.addEventListener("drop",C=>{C.preventDefault(),$e&&($e.classList.remove("board-column--drag-over"),$e=null);let O=C.target,ee=O.closest(".board-column");if(!ee)return;let Q=C.dataTransfer?.getData("text/plain")||"";if(!Q)return;let K=ee.id,ne=$.get(Q);if(ne&&ne===K){if(_a.has(K)){if(E!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}lt(K,Q,O)}return}let ce=ha[K];if(!ce){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}A.get(Q)!==ce&&ot(Q,ce)}),t.addEventListener("keydown",C=>{let O=C.target;if(!(O instanceof HTMLElement))return;let ee=String(O.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||O.isContentEditable===!0)return;let Q=O.closest(".board-card");if(!Q)return;let K=String(C.key||"");if(K==="Enter"||K===" "){C.preventDefault();let F=Q.getAttribute("data-issue-id");F&&n(F);return}if(K!=="ArrowUp"&&K!=="ArrowDown"&&K!=="ArrowLeft"&&K!=="ArrowRight")return;C.preventDefault();let ne=Q.closest(".board-column");if(!ne)return;let ce=Array.from(ne.querySelectorAll(".board-card")),fe=ce.indexOf(Q);if(K==="ArrowDown"&&fe<ce.length-1){le(Q,ce[fe+1]);return}if(K==="ArrowUp"&&fe>0){le(Q,ce[fe-1]);return}if(K==="ArrowLeft"||K==="ArrowRight"){let F=Array.from(t.querySelectorAll(".board-column")),w=F.indexOf(ne),I=K==="ArrowRight"?1:-1,S=w+I;for(;S>=0&&S<F.length;){let Z=F[S].querySelector(".board-card");if(Z){le(Q,Z);return}S+=I}}});function le(C,O){try{C.tabIndex=-1,O.tabIndex=0,O.focus()}catch{}}let ze=null;h&&h.subscribe&&(ze=h.subscribe(()=>{try{xe()}catch{}}));let He=null;return l&&l.subscribe&&(He=l.subscribe(()=>{try{xe()}catch{}})),{async load(){r("load"),xe()},clear(){Xe(),ze&&(ze(),ze=null),He&&(He(),He=null),t.replaceChildren(),v=[],y=[],x=[],N=[],P=[],q=[],A=new Map,$=new Map}}}function yn(t){let e=t&&t.parent;return typeof e=="string"?e:e&&e.id?String(e.id):""}function Xt(t,e){return t.filter(r=>{let n=yn(r);return!(n&&e.has(n))})}async function ma(t){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(t)),!0;let e=document.createElement("textarea");e.value=String(t),e.style.position="fixed",e.style.left="-9999px",document.body.appendChild(e),e.select();let r=!1;try{r=document.execCommand("copy")}finally{e.remove()}return r}catch{return!1}}async function Ft(t){let e=String(t);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(e),!0}catch{}try{let r=document.createElement("textarea");r.value=e,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ba="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Tt(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function eo(t){return!t||typeof t!="object"?!1:typeof t.input_tokens=="number"||typeof t.output_tokens=="number"}function wa(t){return t>=1e6?`${(t/1e6).toFixed(1)}M`:t>=1e3?`${(t/1e3).toFixed(1)}k`:String(t)}function gt(t){if(!eo(t))return null;let e=Tt(t?.input_tokens)+Tt(t?.output_tokens);return`\u03C4 ${wa(e)}`}function Br(t){if(!t||typeof t!="object")return"";let e=[`\uC785\uB825 ${Tt(t.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Tt(t.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Tt(t.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Tt(t.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&e.push(`$${t.total_cost_usd.toFixed(2)}`);let r=e.join(" \xB7 ");return t.replayed?`${r}
${ba}`:r}var ka=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Qt(t,e){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=!1,s=0,o=!1,i=!1;for(let l of Object.values(t||{})){if(!l||l.bead_id!==e)continue;let a=l.usage;if(eo(a)){n=!0;for(let c of ka)r[c]=Tt(r[c])+Tt(a[c]);typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)&&(s+=a.total_cost_usd,o=!0),a.replayed===!0&&(i=!0)}}return n?(o&&(r.total_cost_usd=s),i&&(r.replayed=!0),r):null}var ya={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},va=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,$a=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function At(t){return!!t&&typeof t=="object"}function vn(t){return typeof t!="string"||t.length===0?[]:t.split(/\r?\n/)}function to(t,e){let r=vn(t),n=vn(e),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let a=s.get(l)||0;a>0?s.set(l,a-1):o+=1}let i=0;for(let l of s.values())i+=l;return{added:o,removed:i}}function xa(t){let e="";typeof t=="string"?e=t:Array.isArray(t)?e=t.map(s=>At(s)&&typeof s.text=="string"?s.text:"").join(""):At(t)&&typeof t.text=="string"&&(e=t.text);let n=(String(e).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Sa(t){let e=String(t.name||""),r=t.input||{},n={kind:"tool",tool:e,icon:ya[e]||"\u{1F527}",input:r,expandable:!0};if((e==="Read"||e==="Write")&&(n.path=String(r.file_path||r.path||"")),e==="Write"&&(n.added=vn(r.content).length),e==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=to(r.old_string,r.new_string);n.added=s,n.removed=o}if(e==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,i=Array.isArray(r.edits)?r.edits:[];for(let l of i){let a=to(At(l)?l.old_string:"",At(l)?l.new_string:"");s+=a.added,o+=a.removed}n.added=s,n.removed=o}return e==="Bash"&&(n.command=String(r.command||"")),(e==="Grep"||e==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ro(t){let e=t.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=va.exec(e);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:e.trim()}:$a.test(e)&&e.trim().length<=80?{kind:"phase",text:e.trim()}:{kind:"assistant",text:t}}function Ta(t,e){if(t.type==="assistant"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(At(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ro(o.text));else if(o.type==="tool_use"){let i=Sa(o);typeof o.id=="string"&&e.set(o.id,i),s.push(i)}}return s}if(t.type==="user"){let r=t.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(At(s)&&s.type==="tool_result"){let o=e.get(String(s.tool_use_id));if(o){let i=xa(s.content);o.result=i,o.output=typeof s.content=="string"?s.content:i}}return[]}if(t.type==="result"){let r=t.is_error===!1&&t.subtype==="success";return[{kind:"result",success:r,text:typeof t.result=="string"?t.result:r?"DONE":""}]}return[]}function Aa(t){if(t.type==="item.completed"&&At(t.item)){let e=t.item;return e.type==="agent_message"&&typeof e.text=="string"?[ro(e.text)]:e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}if(t.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(t.type==="turn.failed"){let e=t.error;return[{kind:"error",text:e&&typeof e.message=="string"?e.message:"turn failed"}]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}function Ea(t){let e=t.type;return typeof e=="string"&&(e==="error"||e.startsWith("thread.")||e.startsWith("turn.")||e.startsWith("item."))}function no(t){let e=[],r=new Map,n=Array.isArray(t)?t:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!At(o))continue;let i=Ea(o)?Aa(o):Ta(o,r);for(let l of i)e.push(l)}return e}function Ur(t,e={}){let{transport:r,sessionLogStore:n,onClose:s}=e,o=null,i={},l=!0,a=new Set,c=null;function _(){if(!o||!n)return[];let $=n.get(o);return no($?$.lines:[])}function h($,g){if(g.kind==="gate")return d`<div class="sv__gate">${g.text}</div>`;if(g.kind==="phase")return d`<div class="sv__phase">${g.text}</div>`;if(g.kind==="result")return d`<div
        class="sv__result${g.success?" sv__result--ok":" sv__result--fail"}"
      >
        ${g.success?"\u2713":"\u2717"}
        ${g.text||(g.success?"DONE":"\uC2E4\uD328")}
      </div>`;if(g.kind==="error")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="blocker")return d`<div class="sv__error">⛔ ${g.text}</div>`;if(g.kind==="tool"){let M=a.has($),B=g.tool==="Bash"?g.command:g.path||g.command||"";return d`<div
        class="sv__tool${M?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>N($)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${g.icon}</span>
          <span class="sv__tool-name">${g.tool}</span>
          ${B?d`<span class="sv__tool-detail">${B}</span>`:""}
          ${typeof g.added=="number"?d`<span class="sv__diff-add">+${g.added}</span>`:""}
          ${typeof g.removed=="number"?d`<span class="sv__diff-del">−${g.removed}</span>`:""}
          ${g.result?d`<span class="sv__tool-ok">→ ${g.result}</span>`:""}
        </span>
        ${M?d`<pre class="sv__tool-expand">${k(g)}</pre>`:""}
      </div>`}return d`<div class="sv__as">${g.text}</div>`}function k($){let g=[];if($.input!==void 0)try{g.push(`input: ${JSON.stringify($.input,null,2)}`)}catch{}return typeof $.output=="string"&&$.output.length>0&&g.push(`output:
${$.output}`),g.join(`

`)}function v(){if(!o)return d``;let $=_(),g=[i.runner,i.model,i.effort].filter(Boolean).join(" \xB7 "),M=i.session_id||"",B=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`;return d`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${M?d`<button
              type="button"
              class="sv__session"
              title=${M}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${M}`}
              @click=${()=>q(M)}
            >
              ⧉ ${M.slice(0,8)}
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
          @click=${P}
        >
          <span class="sv__follow-full">⇣ ${B}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>A()}
        >
          ✕
        </button>
      </div>
      <div class="sv__body">
        ${$.length===0?d`<div class="sv__empty">세션 로그 없음</div>`:$.map((j,V)=>h(V,j))}
      </div>
    </div>`}function y(){_e(v(),t),l&&x()}function x(){let $=t.querySelector(".sv__body");$&&($.scrollTop=$.scrollHeight)}function N($){a.has($)?a.delete($):a.add($),y()}function P(){l=!l,y()}function q($){Ft($).then(g=>{g?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function U($){!o||!$||(i={...i,...$},y())}function D($){let g=$.target;if(!g||!g.classList||!g.classList.contains("sv__body"))return;!(g.scrollHeight-g.scrollTop-g.clientHeight<=4)&&l&&(l=!1,y())}t.addEventListener("scroll",D,!0);function E($){let g=$&&$.attempt_id;g&&(o=g,i=$.meta||{},l=!0,a.clear(),!c&&n&&(c=n.subscribe(y)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),y())}function A(){let $=o;o=null,a.clear(),r&&$&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${$}`})).catch(()=>{}),_e(d``,t),s&&s()}return{open:E,updateMeta:U,close:A,isOpen(){return o!==null},destroy(){c&&(c(),c=null),t.removeEventListener("scroll",D,!0),o=null,_e(d``,t)}}}function Ca(t){let e=t&&t.metadata||{},r=[];return typeof e.spec_id=="string"&&e.spec_id.trim().length>0&&r.push({kind:"spec",path:e.spec_id.trim()}),typeof e.plan_path=="string"&&e.plan_path.trim().length>0&&r.push({kind:"plan",path:e.plan_path.trim()}),r}function so(t,e){let r=Ca(t);return d`
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
  `}var $n=["opus","sonnet","haiku","fable"],xn=["low","medium","high","xhigh"],Sn=["codex","opus","fable","self","skip"],Tn=["opus","fable","sonnet","haiku"],Ra=["standard","fast_track"],An={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function zr(t,e){let r=e&&e[t];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:An[t]||"(\uAE30\uBCF8)"}function pr(t,e,r,n,s,o){return d`
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
  `}function fr(t,e){let r=t.map(n=>({value:n,label:n}));return typeof e=="string"?[{value:"",label:e},...r]:r}function oo(t,e,r){let n=t&&t.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return d`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${pr("orchestration_model","orchestration_model",fr($n,zr("orchestration_model",s)),n.orchestration_model||"",!1,e)}
    ${pr("orchestration_effort","orchestration_effort",fr(xn,zr("orchestration_effort",s)),n.orchestration_effort||"",!1,e)}
    ${pr("review_model","review_model",fr(Sn,zr("review_model",s)),n.review_model||"",!1,e)}
    ${pr("impl_model","impl_model",fr(Tn,zr("impl_model",s)),n.impl_model||"",!1,e)}
    ${pr("workflow_mode","workflow_mode",fr(Ra),o,n.workflow_mode==="fast_track",e)}
  `}var{entries:_o,setPrototypeOf:io,isFrozen:La,getPrototypeOf:Ia,getOwnPropertyDescriptor:Da}=Object,{freeze:tt,seal:pt,create:On}=Object,{apply:Mn,construct:Nn}=typeof Reflect<"u"&&Reflect;tt||(tt=function(e){return e});pt||(pt=function(e){return e});Mn||(Mn=function(e,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return e.apply(r,s)});Nn||(Nn=function(e){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new e(...n)});var Hr=rt(Array.prototype.forEach),Oa=rt(Array.prototype.lastIndexOf),ao=rt(Array.prototype.pop),hr=rt(Array.prototype.push),Ma=rt(Array.prototype.splice),Gr=rt(String.prototype.toLowerCase),En=rt(String.prototype.toString),Cn=rt(String.prototype.match),_r=rt(String.prototype.replace),Na=rt(String.prototype.indexOf),Pa=rt(String.prototype.trim),mt=rt(Object.prototype.hasOwnProperty),et=rt(RegExp.prototype.test),gr=Fa(TypeError);function rt(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Mn(t,e,n)}}function Fa(t){return function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];return Nn(t,r)}}function se(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gr;io&&io(t,null);let n=e.length;for(;n--;){let s=e[n];if(typeof s=="string"){let o=r(s);o!==s&&(La(e)||(e[n]=o),s=o)}t[s]=!0}return t}function qa(t){for(let e=0;e<t.length;e++)mt(t,e)||(t[e]=null);return t}function vt(t){let e=On(null);for(let[r,n]of _o(t))mt(t,r)&&(Array.isArray(n)?e[r]=qa(n):n&&typeof n=="object"&&n.constructor===Object?e[r]=vt(n):e[r]=n);return e}function mr(t,e){for(;t!==null;){let n=Da(t,e);if(n){if(n.get)return rt(n.get);if(typeof n.value=="function")return rt(n.value)}t=Ia(t)}function r(){return null}return r}var lo=tt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Rn=tt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ln=tt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ba=tt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),In=tt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ua=tt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),co=tt(["#text"]),uo=tt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Dn=tt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),po=tt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Wr=tt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),za=pt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ha=pt(/<%[\w\W]*|[\w\W]*%>/gm),Wa=pt(/\$\{[\w\W]*/gm),Ga=pt(/^data-[\-\w.\u00B7-\uFFFF]+$/),ja=pt(/^aria-[\-\w]+$/),go=pt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ya=pt(/^(?:\w+script|data):/i),Va=pt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),mo=pt(/^html$/i),Ka=pt(/^[a-z][.\w]*(-[.\w]+)+$/i),fo=Object.freeze({__proto__:null,ARIA_ATTR:ja,ATTR_WHITESPACE:Va,CUSTOM_ELEMENT:Ka,DATA_ATTR:Ga,DOCTYPE_NAME:mo,ERB_EXPR:Ha,IS_ALLOWED_URI:go,IS_SCRIPT_OR_DATA:Ya,MUSTACHE_EXPR:za,TMPLIT_EXPR:Wa}),br={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Za=function(){return typeof window>"u"?null:window},Xa=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return e.createPolicy(o,{createHTML(i){return i},createScriptURL(i){return i}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ho=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function bo(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Za(),e=Y=>bo(Y);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==br.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:i,Node:l,Element:a,NodeFilter:c,NamedNodeMap:_=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:k,trustedTypes:v}=t,y=a.prototype,x=mr(y,"cloneNode"),N=mr(y,"remove"),P=mr(y,"nextSibling"),q=mr(y,"childNodes"),U=mr(y,"parentNode");if(typeof i=="function"){let Y=r.createElement("template");Y.content&&Y.content.ownerDocument&&(r=Y.content.ownerDocument)}let D,E="",{implementation:A,createNodeIterator:$,createDocumentFragment:g,getElementsByTagName:M}=r,{importNode:B}=n,j=ho();e.isSupported=typeof _o=="function"&&typeof U=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:V,ERB_EXPR:ve,TMPLIT_EXPR:Pe,DATA_ATTR:ye,ARIA_ATTR:ae,IS_SCRIPT_OR_DATA:oe,ATTR_WHITESPACE:xe,CUSTOM_ELEMENT:st}=fo,{IS_ALLOWED_URI:ct}=fo,be=null,Ge=se({},[...lo,...Rn,...Ln,...In,...co]),we=null,at=se({},[...uo,...Dn,...po,...Wr]),ue=Object.seal(On(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Me=null,dt=null,Fe=Object.seal(On(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),je=!0,Se=!0,Ye=!1,Ze=!0,Ve=!1,Xe=!0,qe=!1,Qe=!1,Ce=!1,Be=!1,ot=!1,Ue=!1,lt=!0,ft=!1,$e="user-content-",le=!0,ze=!1,He={},C=null,O=se({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ee=null,Q=se({},["audio","video","img","source","image","track"]),K=null,ne=se({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ce="http://www.w3.org/1998/Math/MathML",fe="http://www.w3.org/2000/svg",F="http://www.w3.org/1999/xhtml",w=F,I=!1,S=null,Z=se({},[ce,fe,F],En),u=se({},["mi","mo","mn","ms","mtext"]),b=se({},["annotation-xml"]),R=se({},["title","style","font","a","script"]),X=null,he=["application/xhtml+xml","text/html"],Te="text/html",f=null,m=null,H=r.createElement("form"),G=function(p){return p instanceof RegExp||p instanceof Function},te=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(m&&m===p)){if((!p||typeof p!="object")&&(p={}),p=vt(p),X=he.indexOf(p.PARSER_MEDIA_TYPE)===-1?Te:p.PARSER_MEDIA_TYPE,f=X==="application/xhtml+xml"?En:Gr,be=mt(p,"ALLOWED_TAGS")?se({},p.ALLOWED_TAGS,f):Ge,we=mt(p,"ALLOWED_ATTR")?se({},p.ALLOWED_ATTR,f):at,S=mt(p,"ALLOWED_NAMESPACES")?se({},p.ALLOWED_NAMESPACES,En):Z,K=mt(p,"ADD_URI_SAFE_ATTR")?se(vt(ne),p.ADD_URI_SAFE_ATTR,f):ne,ee=mt(p,"ADD_DATA_URI_TAGS")?se(vt(Q),p.ADD_DATA_URI_TAGS,f):Q,C=mt(p,"FORBID_CONTENTS")?se({},p.FORBID_CONTENTS,f):O,Me=mt(p,"FORBID_TAGS")?se({},p.FORBID_TAGS,f):vt({}),dt=mt(p,"FORBID_ATTR")?se({},p.FORBID_ATTR,f):vt({}),He=mt(p,"USE_PROFILES")?p.USE_PROFILES:!1,je=p.ALLOW_ARIA_ATTR!==!1,Se=p.ALLOW_DATA_ATTR!==!1,Ye=p.ALLOW_UNKNOWN_PROTOCOLS||!1,Ze=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ve=p.SAFE_FOR_TEMPLATES||!1,Xe=p.SAFE_FOR_XML!==!1,qe=p.WHOLE_DOCUMENT||!1,Be=p.RETURN_DOM||!1,ot=p.RETURN_DOM_FRAGMENT||!1,Ue=p.RETURN_TRUSTED_TYPE||!1,Ce=p.FORCE_BODY||!1,lt=p.SANITIZE_DOM!==!1,ft=p.SANITIZE_NAMED_PROPS||!1,le=p.KEEP_CONTENT!==!1,ze=p.IN_PLACE||!1,ct=p.ALLOWED_URI_REGEXP||go,w=p.NAMESPACE||F,u=p.MATHML_TEXT_INTEGRATION_POINTS||u,b=p.HTML_INTEGRATION_POINTS||b,ue=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&G(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ve&&(Se=!1),ot&&(Be=!0),He&&(be=se({},co),we=[],He.html===!0&&(se(be,lo),se(we,uo)),He.svg===!0&&(se(be,Rn),se(we,Dn),se(we,Wr)),He.svgFilters===!0&&(se(be,Ln),se(we,Dn),se(we,Wr)),He.mathMl===!0&&(se(be,In),se(we,po),se(we,Wr))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?Fe.tagCheck=p.ADD_TAGS:(be===Ge&&(be=vt(be)),se(be,p.ADD_TAGS,f))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?Fe.attributeCheck=p.ADD_ATTR:(we===at&&(we=vt(we)),se(we,p.ADD_ATTR,f))),p.ADD_URI_SAFE_ATTR&&se(K,p.ADD_URI_SAFE_ATTR,f),p.FORBID_CONTENTS&&(C===O&&(C=vt(C)),se(C,p.FORBID_CONTENTS,f)),le&&(be["#text"]=!0),qe&&se(be,["html","head","body"]),be.table&&(se(be,["tbody"]),delete Me.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw gr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw gr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=p.TRUSTED_TYPES_POLICY,E=D.createHTML("")}else D===void 0&&(D=Xa(v,s)),D!==null&&typeof E=="string"&&(E=D.createHTML(""));tt&&tt(p),m=p}},ge=se({},[...Rn,...Ln,...Ba]),kt=se({},[...In,...Ua]),Ke=function(p){let L=U(p);(!L||!L.tagName)&&(L={namespaceURI:w,tagName:"template"});let z=Gr(p.tagName),ke=Gr(L.tagName);return S[p.namespaceURI]?p.namespaceURI===fe?L.namespaceURI===F?z==="svg":L.namespaceURI===ce?z==="svg"&&(ke==="annotation-xml"||u[ke]):!!ge[z]:p.namespaceURI===ce?L.namespaceURI===F?z==="math":L.namespaceURI===fe?z==="math"&&b[ke]:!!kt[z]:p.namespaceURI===F?L.namespaceURI===fe&&!b[ke]||L.namespaceURI===ce&&!u[ke]?!1:!kt[z]&&(R[z]||!ge[z]):!!(X==="application/xhtml+xml"&&S[p.namespaceURI]):!1},Je=function(p){hr(e.removed,{element:p});try{U(p).removeChild(p)}catch{N(p)}},re=function(p,L){try{hr(e.removed,{attribute:L.getAttributeNode(p),from:L})}catch{hr(e.removed,{attribute:null,from:L})}if(L.removeAttribute(p),p==="is")if(Be||ot)try{Je(L)}catch{}else try{L.setAttribute(p,"")}catch{}},Re=function(p){let L=null,z=null;if(Ce)p="<remove></remove>"+p;else{let Ae=Cn(p,/^[\r\n\t ]+/);z=Ae&&Ae[0]}X==="application/xhtml+xml"&&w===F&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let ke=D?D.createHTML(p):p;if(w===F)try{L=new k().parseFromString(ke,X)}catch{}if(!L||!L.documentElement){L=A.createDocument(w,"template",null);try{L.documentElement.innerHTML=I?E:ke}catch{}}let Ne=L.body||L.documentElement;return p&&z&&Ne.insertBefore(r.createTextNode(z),Ne.childNodes[0]||null),w===F?M.call(L,qe?"html":"body")[0]:qe?L.documentElement:Ne},Ut=function(p){return $.call(p.ownerDocument||p,p,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Jt=function(p){return p instanceof h&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof _)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},er=function(p){return typeof l=="function"&&p instanceof l};function ut(Y,p,L){Hr(Y,z=>{z.call(e,p,L,m)})}let Ar=function(p){let L=null;if(ut(j.beforeSanitizeElements,p,null),Jt(p))return Je(p),!0;let z=f(p.nodeName);if(ut(j.uponSanitizeElement,p,{tagName:z,allowedTags:be}),Xe&&p.hasChildNodes()&&!er(p.firstElementChild)&&et(/<[/\w!]/g,p.innerHTML)&&et(/<[/\w!]/g,p.textContent)||p.nodeType===br.progressingInstruction||Xe&&p.nodeType===br.comment&&et(/<[/\w]/g,p.data))return Je(p),!0;if(!(Fe.tagCheck instanceof Function&&Fe.tagCheck(z))&&(!be[z]||Me[z])){if(!Me[z]&&Er(z)&&(ue.tagNameCheck instanceof RegExp&&et(ue.tagNameCheck,z)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(z)))return!1;if(le&&!C[z]){let ke=U(p)||p.parentNode,Ne=q(p)||p.childNodes;if(Ne&&ke){let Ae=Ne.length;for(let De=Ae-1;De>=0;--De){let Oe=x(Ne[De],!0);Oe.__removalCount=(p.__removalCount||0)+1,ke.insertBefore(Oe,P(p))}}}return Je(p),!0}return p instanceof a&&!Ke(p)||(z==="noscript"||z==="noembed"||z==="noframes")&&et(/<\/no(script|embed|frames)/i,p.innerHTML)?(Je(p),!0):(Ve&&p.nodeType===br.text&&(L=p.textContent,Hr([V,ve,Pe],ke=>{L=_r(L,ke," ")}),p.textContent!==L&&(hr(e.removed,{element:p.cloneNode()}),p.textContent=L)),ut(j.afterSanitizeElements,p,null),!1)},tr=function(p,L,z){if(lt&&(L==="id"||L==="name")&&(z in r||z in H))return!1;if(!(Se&&!dt[L]&&et(ye,L))){if(!(je&&et(ae,L))){if(!(Fe.attributeCheck instanceof Function&&Fe.attributeCheck(L,p))){if(!we[L]||dt[L]){if(!(Er(p)&&(ue.tagNameCheck instanceof RegExp&&et(ue.tagNameCheck,p)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(p))&&(ue.attributeNameCheck instanceof RegExp&&et(ue.attributeNameCheck,L)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(L,p))||L==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&et(ue.tagNameCheck,z)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(z))))return!1}else if(!K[L]){if(!et(ct,_r(z,xe,""))){if(!((L==="src"||L==="xlink:href"||L==="href")&&p!=="script"&&Na(z,"data:")===0&&ee[p])){if(!(Ye&&!et(oe,_r(z,xe,"")))){if(z)return!1}}}}}}}return!0},Er=function(p){return p!=="annotation-xml"&&Cn(p,st)},zt=function(p){ut(j.beforeSanitizeAttributes,p,null);let{attributes:L}=p;if(!L||Jt(p))return;let z={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:we,forceKeepAttr:void 0},ke=L.length;for(;ke--;){let Ne=L[ke],{name:Ae,namespaceURI:De,value:Oe}=Ne,yt=f(Ae),rr=Oe,Le=Ae==="value"?rr:Pa(rr);if(z.attrName=yt,z.attrValue=Le,z.keepAttr=!0,z.forceKeepAttr=void 0,ut(j.uponSanitizeAttribute,p,z),Le=z.attrValue,ft&&(yt==="id"||yt==="name")&&(re(Ae,p),Le=$e+Le),Xe&&et(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){re(Ae,p);continue}if(yt==="attributename"&&Cn(Le,"href")){re(Ae,p);continue}if(z.forceKeepAttr)continue;if(!z.keepAttr){re(Ae,p);continue}if(!Ze&&et(/\/>/i,Le)){re(Ae,p);continue}Ve&&Hr([V,ve,Pe],sr=>{Le=_r(Le,sr," ")});let nr=f(p.nodeName);if(!tr(nr,yt,Le)){re(Ae,p);continue}if(D&&typeof v=="object"&&typeof v.getAttributeType=="function"&&!De)switch(v.getAttributeType(nr,yt)){case"TrustedHTML":{Le=D.createHTML(Le);break}case"TrustedScriptURL":{Le=D.createScriptURL(Le);break}}if(Le!==rr)try{De?p.setAttributeNS(De,Ae,Le):p.setAttribute(Ae,Le),Jt(p)?Je(p):ao(e.removed)}catch{re(Ae,p)}}ut(j.afterSanitizeAttributes,p,null)},rn=function Y(p){let L=null,z=Ut(p);for(ut(j.beforeSanitizeShadowDOM,p,null);L=z.nextNode();)ut(j.uponSanitizeShadowNode,L,null),Ar(L),zt(L),L.content instanceof o&&Y(L.content);ut(j.afterSanitizeShadowDOM,p,null)};return e.sanitize=function(Y){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},L=null,z=null,ke=null,Ne=null;if(I=!Y,I&&(Y="<!-->"),typeof Y!="string"&&!er(Y))if(typeof Y.toString=="function"){if(Y=Y.toString(),typeof Y!="string")throw gr("dirty is not a string, aborting")}else throw gr("toString is not a function");if(!e.isSupported)return Y;if(Qe||te(p),e.removed=[],typeof Y=="string"&&(ze=!1),ze){if(Y.nodeName){let Oe=f(Y.nodeName);if(!be[Oe]||Me[Oe])throw gr("root node is forbidden and cannot be sanitized in-place")}}else if(Y instanceof l)L=Re("<!---->"),z=L.ownerDocument.importNode(Y,!0),z.nodeType===br.element&&z.nodeName==="BODY"||z.nodeName==="HTML"?L=z:L.appendChild(z);else{if(!Be&&!Ve&&!qe&&Y.indexOf("<")===-1)return D&&Ue?D.createHTML(Y):Y;if(L=Re(Y),!L)return Be?null:Ue?E:""}L&&Ce&&Je(L.firstChild);let Ae=Ut(ze?Y:L);for(;ke=Ae.nextNode();)Ar(ke),zt(ke),ke.content instanceof o&&rn(ke.content);if(ze)return Y;if(Be){if(ot)for(Ne=g.call(L.ownerDocument);L.firstChild;)Ne.appendChild(L.firstChild);else Ne=L;return(we.shadowroot||we.shadowrootmode)&&(Ne=B.call(n,Ne,!0)),Ne}let De=qe?L.outerHTML:L.innerHTML;return qe&&be["!doctype"]&&L.ownerDocument&&L.ownerDocument.doctype&&L.ownerDocument.doctype.name&&et(mo,L.ownerDocument.doctype.name)&&(De="<!DOCTYPE "+L.ownerDocument.doctype.name+`>
`+De),Ve&&Hr([V,ve,Pe],Oe=>{De=_r(De,Oe," ")}),D&&Ue?D.createHTML(De):De},e.setConfig=function(){let Y=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};te(Y),Qe=!0},e.clearConfig=function(){m=null,Qe=!1},e.isValidAttribute=function(Y,p,L){m||te({});let z=f(Y),ke=f(p);return tr(z,ke,L)},e.addHook=function(Y,p){typeof p=="function"&&hr(j[Y],p)},e.removeHook=function(Y,p){if(p!==void 0){let L=Oa(j[Y],p);return L===-1?void 0:Ma(j[Y],L,1)[0]}return ao(j[Y])},e.removeHooks=function(Y){j[Y]=[]},e.removeAllHooks=function(){j=ho()},e}var wo=bo();var ko={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},yo=t=>(...e)=>({_$litDirective$:t,values:e}),jr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,n){this._$Ct=e,this._$AM=r,this._$Ci=n}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var wr=class extends jr{constructor(e){if(super(e),this.it=Ie,e.type!==ko.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ie||e==null)return this._t=void 0,this.it=e;if(e===Dt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};wr.directiveName="unsafeHTML",wr.resultType=1;var vo=yo(wr);function Bn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Bt=Bn();function Co(t){Bt=t}var $r={exec:()=>null};function de(t,e=""){let r=typeof t=="string"?t:t.source,n={replace:(s,o)=>{let i=typeof o=="string"?o:o.source;return i=i.replace(nt.caret,"$1"),r=r.replace(s,i),n},getRegex:()=>new RegExp(r,e)};return n}var Qa=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),nt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Ja=/^(?:[ \t]*(?:\n|$))+/,el=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,tl=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,xr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Un=/(?:[*+-]|\d{1,9}[.)])/,Ro=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Lo=de(Ro).replace(/bull/g,Un).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nl=de(Ro).replace(/bull/g,Un).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),zn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,sl=/^[^\n]+/,Hn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ol=de(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Hn).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),il=de(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Un).getRegex(),Qr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Wn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,al=de("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Wn).replace("tag",Qr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Io=de(zn).replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qr).getRegex(),ll=de(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Io).getRegex(),Gn={blockquote:ll,code:el,def:ol,fences:tl,heading:rl,hr:xr,html:al,lheading:Lo,list:il,newline:Ja,paragraph:Io,table:$r,text:sl},$o=de("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qr).getRegex(),cl={...Gn,lheading:nl,table:$o,paragraph:de(zn).replace("hr",xr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$o).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Qr).getRegex()},dl={...Gn,html:de(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Wn).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$r,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:de(zn).replace("hr",xr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Lo).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ul=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pl=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Do=/^( {2,}|\\)\n(?!\s*$)/,fl=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Jr=/[\p{P}\p{S}]/u,jn=/[\s\p{P}\p{S}]/u,Oo=/[^\s\p{P}\p{S}]/u,hl=de(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,jn).getRegex(),Mo=/(?!~)[\p{P}\p{S}]/u,_l=/(?!~)[\s\p{P}\p{S}]/u,gl=/(?:[^\s\p{P}\p{S}]|~)/u,ml=de(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Qa?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),No=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,bl=de(No,"u").replace(/punct/g,Jr).getRegex(),wl=de(No,"u").replace(/punct/g,Mo).getRegex(),Po="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",kl=de(Po,"gu").replace(/notPunctSpace/g,Oo).replace(/punctSpace/g,jn).replace(/punct/g,Jr).getRegex(),yl=de(Po,"gu").replace(/notPunctSpace/g,gl).replace(/punctSpace/g,_l).replace(/punct/g,Mo).getRegex(),vl=de("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Oo).replace(/punctSpace/g,jn).replace(/punct/g,Jr).getRegex(),$l=de(/\\(punct)/,"gu").replace(/punct/g,Jr).getRegex(),xl=de(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sl=de(Wn).replace("(?:-->|$)","-->").getRegex(),Tl=de("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sl).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Kr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Al=de(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Kr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Fo=de(/^!?\[(label)\]\[(ref)\]/).replace("label",Kr).replace("ref",Hn).getRegex(),qo=de(/^!?\[(ref)\](?:\[\])?/).replace("ref",Hn).getRegex(),El=de("reflink|nolink(?!\\()","g").replace("reflink",Fo).replace("nolink",qo).getRegex(),xo=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Yn={_backpedal:$r,anyPunctuation:$l,autolink:xl,blockSkip:ml,br:Do,code:pl,del:$r,emStrongLDelim:bl,emStrongRDelimAst:kl,emStrongRDelimUnd:vl,escape:ul,link:Al,nolink:qo,punctuation:hl,reflink:Fo,reflinkSearch:El,tag:Tl,text:fl,url:$r},Cl={...Yn,link:de(/^!?\[(label)\]\((.*?)\)/).replace("label",Kr).getRegex(),reflink:de(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Kr).getRegex()},Pn={...Yn,emStrongRDelimAst:yl,emStrongLDelim:wl,url:de(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xo).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:de(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xo).getRegex()},Rl={...Pn,br:de(Do).replace("{2,}","*").getRegex(),text:de(Pn.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Yr={normal:Gn,gfm:cl,pedantic:dl},kr={normal:Yn,gfm:Pn,breaks:Rl,pedantic:Cl},Ll={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},So=t=>Ll[t];function $t(t,e){if(e){if(nt.escapeTest.test(t))return t.replace(nt.escapeReplace,So)}else if(nt.escapeTestNoEncode.test(t))return t.replace(nt.escapeReplaceNoEncode,So);return t}function To(t){try{t=encodeURI(t).replace(nt.percentDecode,"%")}catch{return null}return t}function Ao(t,e){let r=t.replace(nt.findPipe,(o,i,l)=>{let a=!1,c=i;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),n=r.split(nt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(nt.slashPipe,"|");return n}function yr(t,e,r){let n=t.length;if(n===0)return"";let s=0;for(;s<n;){let o=t.charAt(n-s-1);if(o===e&&!r)s++;else if(o!==e&&r)s++;else break}return t.slice(0,n-s)}function Il(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let n=0;n<t.length;n++)if(t[n]==="\\")n++;else if(t[n]===e[0])r++;else if(t[n]===e[1]&&(r--,r<0))return n;return r>0?-2:-1}function Eo(t,e,r,n,s){let o=e.href,i=e.title||null,l=t[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:i,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,a}function Dl(t,e,r){let n=t.match(r.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(o=>{let i=o.match(r.other.beginningSpace);if(i===null)return o;let[l]=i;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var Zr=class{constructor(t){me(this,"options");me(this,"rules");me(this,"lexer");this.options=t||Bt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:yr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],n=Dl(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:n}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let n=yr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:yr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=yr(e[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let i=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),i=!0;else if(!i)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),_=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${c}`:c,s=s?`${s}
${_}`:_;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=h,r.length===0)break;let k=o.at(-1);if(k?.type==="code")break;if(k?.type==="blockquote"){let v=k,y=v.raw+`
`+r.join(`
`),x=this.blockquote(y);o[o.length-1]=x,n=n.substring(0,n.length-v.raw.length)+x.raw,s=s.substring(0,s.length-v.text.length)+x.text;break}else if(k?.type==="list"){let v=k,y=v.raw+`
`+r.join(`
`),x=this.list(y);o[o.length-1]=x,n=n.substring(0,n.length-k.raw.length)+x.raw,s=s.substring(0,s.length-v.raw.length)+x.raw,r=y.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),i=!1;for(;t;){let a=!1,c="",_="";if(!(e=o.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,x=>" ".repeat(3*x.length)),k=t.split(`
`,1)[0],v=!h.trim(),y=0;if(this.options.pedantic?(y=2,_=h.trimStart()):v?y=e[1].length+1:(y=e[2].search(this.rules.other.nonSpaceChar),y=y>4?1:y,_=h.slice(y),y+=e[1].length),v&&this.rules.other.blankLine.test(k)&&(c+=k+`
`,t=t.substring(k.length+1),a=!0),!a){let x=this.rules.other.nextBulletRegex(y),N=this.rules.other.hrRegex(y),P=this.rules.other.fencesBeginRegex(y),q=this.rules.other.headingBeginRegex(y),U=this.rules.other.htmlBeginRegex(y);for(;t;){let D=t.split(`
`,1)[0],E;if(k=D,this.options.pedantic?(k=k.replace(this.rules.other.listReplaceNesting,"  "),E=k):E=k.replace(this.rules.other.tabCharGlobal,"    "),P.test(k)||q.test(k)||U.test(k)||x.test(k)||N.test(k))break;if(E.search(this.rules.other.nonSpaceChar)>=y||!k.trim())_+=`
`+E.slice(y);else{if(v||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||P.test(h)||q.test(h)||N.test(h))break;_+=`
`+k}!v&&!k.trim()&&(v=!0),c+=D+`
`,t=t.substring(D.length+1),h=E.slice(y)}}s.loose||(i?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(i=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let a of s.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let _={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=_.checked,s.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=_.raw+a.tokens[0].raw,a.tokens[0].text=_.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(_)):a.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):a.tokens.unshift(_)}}if(!s.loose){let c=a.tokens.filter(h=>h.type==="space"),_=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=_}}if(s.loose)for(let a of s.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:n,title:s}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Ao(e[1]),n=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let i of n)this.rules.other.tableAlignRight.test(i)?o.align.push("right"):this.rules.other.tableAlignCenter.test(i)?o.align.push("center"):this.rules.other.tableAlignLeft.test(i)?o.align.push("left"):o.align.push(null);for(let i=0;i<r.length;i++)o.header.push({text:r[i],tokens:this.lexer.inline(r[i]),header:!0,align:o.align[i]});for(let i of s)o.rows.push(Ao(i,o.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[a]})));return o}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=yr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Il(e[2],"()");if(o===-2)return;if(o>-1){let i=(e[0].indexOf("!")===0?5:4)+e[1].length+o;e[2]=e[2].substring(0,o),e[0]=e[0].substring(0,i).trim(),e[3]=""}}let n=e[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=e[3]?e[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Eo(e,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Eo(r,s,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let n=this.rules.inline.emStrongLDelim.exec(t);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,i,l=s,a=0,c=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+s);(n=c.exec(e))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(i=[...o].length,n[3]||n[4]){l+=i;continue}else if((n[5]||n[6])&&s%3&&!((s+i)%3)){a+=i;continue}if(l-=i,l>0)continue;i=Math.min(i,i+l+a);let _=[...n[0]][0].length,h=t.slice(0,s+n.index+_+i);if(Math.min(s,i)%2){let v=h.slice(1,-1);return{type:"em",raw:h,text:v,tokens:this.lexer.inlineTokens(v)}}let k=h.slice(2,-2);return{type:"strong",raw:h,text:k,tokens:this.lexer.inlineTokens(k)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,n;return e[2]==="@"?(r=e[1],n="mailto:"+r):(r=e[1],n=r),{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,n;if(e[2]==="@")r=e[0],n="mailto:"+r;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);r=e[0],e[1]==="www."?n="http://"+e[0]:n=e[0]}return{type:"link",raw:e[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},bt=class Fn{constructor(e){me(this,"tokens");me(this,"options");me(this,"state");me(this,"inlineQueue");me(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Bt,this.options.tokenizer=this.options.tokenizer||new Zr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:nt,block:Yr.normal,inline:kr.normal};this.options.pedantic?(r.block=Yr.pedantic,r.inline=kr.pedantic):this.options.gfm&&(r.block=Yr.gfm,this.options.breaks?r.inline=kr.breaks:r.inline=kr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Yr,inline:kr}}static lex(e,r){return new Fn(r).lex(e)}static lexInline(e,r){return new Fn(r).inlineTokens(e)}lex(e){e=e.replace(nt.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],n=!1){for(this.options.pedantic&&(e=e.replace(nt.tabCharGlobal,"    ").replace(nt.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(i=>(s=i.call({lexer:this},e,r))?(e=e.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let i=r.at(-1);s.raw.length===1&&i!==void 0?i.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):r.push(s);continue}if(e){let i="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(i);break}else throw new Error(i)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let n=e,s=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)a.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let i=!1,l="";for(;e;){i||(l=""),i=!1;let a;if(this.options.extensions?.inline?.some(_=>(a=_.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let _=r.at(-1);a.type==="text"&&_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,n,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let _=1/0,h=e.slice(1),k;this.options.extensions.startInline.forEach(v=>{k=v.call({lexer:this},h),typeof k=="number"&&k>=0&&(_=Math.min(_,k))}),_<1/0&&_>=0&&(c=e.substring(0,_+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),i=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=a.raw,_.text+=a.text):r.push(a);continue}if(e){let _="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},Xr=class{constructor(t){me(this,"options");me(this,"parser");this.options=t||Bt}space(t){return""}code({text:t,lang:e,escaped:r}){let n=(e||"").match(nt.notSpaceStart)?.[0],s=t.replace(nt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+$t(n)+'">'+(r?s:$t(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:$t(s,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${$t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let n=this.parser.parseInline(r),s=To(t);if(s===null)return n;t=s;let o='<a href="'+t+'"';return e&&(o+=' title="'+$t(e)+'"'),o+=">"+n+"</a>",o}image({href:t,title:e,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=To(t);if(s===null)return $t(r);t=s;let o=`<img src="${t}" alt="${r}"`;return e&&(o+=` title="${$t(e)}"`),o+=">",o}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:$t(t.text)}},Vn=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},wt=class qn{constructor(e){me(this,"options");me(this,"renderer");me(this,"textRenderer");this.options=e||Bt,this.options.renderer=this.options.renderer||new Xr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Vn}static parse(e,r){return new qn(r).parse(e)}static parseInline(e,r){return new qn(r).parseInline(e)}parse(e){let r="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(i.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let i='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}parseInline(e,r=this.renderer){let n="";for(let s=0;s<e.length;s++){let o=e[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let i=o;switch(i.type){case"escape":{n+=r.text(i);break}case"html":{n+=r.html(i);break}case"link":{n+=r.link(i);break}case"image":{n+=r.image(i);break}case"checkbox":{n+=r.checkbox(i);break}case"strong":{n+=r.strong(i);break}case"em":{n+=r.em(i);break}case"codespan":{n+=r.codespan(i);break}case"br":{n+=r.br(i);break}case"del":{n+=r.del(i);break}case"text":{n+=r.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},Vr,vr=(Vr=class{constructor(t){me(this,"options");me(this,"block");this.options=t||Bt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?bt.lex:bt.lexInline}provideParser(){return this.block?wt.parse:wt.parseInline}},me(Vr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),me(Vr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Vr),Ol=class{constructor(...t){me(this,"defaults",Bn());me(this,"options",this.setOptions);me(this,"parse",this.parseMarkdown(!0));me(this,"parseInline",this.parseMarkdown(!1));me(this,"Parser",wt);me(this,"Renderer",Xr);me(this,"TextRenderer",Vn);me(this,"Lexer",bt);me(this,"Tokenizer",Zr);me(this,"Hooks",vr);this.use(...t)}walkTokens(t,e){let r=[];for(let n of t)switch(r=r.concat(e.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,e));for(let o of s.rows)for(let i of o)r=r.concat(this.walkTokens(i.tokens,e));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,e));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let i=s[o].flat(1/0);r=r.concat(this.walkTokens(i,e))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=e.renderers[s.name];o?e.renderers[s.name]=function(...i){let l=s.renderer.apply(this,i);return l===!1&&(l=o.apply(this,i)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=e[s.level];o?o.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),n.extensions=e),r.renderer){let s=this.defaults.renderer||new Xr(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let i=o,l=r.renderer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Zr(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let i=o,l=r.tokenizer[i],a=s[i];s[i]=(...c)=>{let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new vr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let i=o,l=r.hooks[i],a=s[i];vr.passThroughHooks.has(o)?s[i]=c=>{if(this.defaults.async&&vr.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await l.call(s,c);return a.call(s,h)})();let _=l.call(s,c);return a.call(s,_)}:s[i]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(s,c);return h===!1&&(h=await a.apply(s,c)),h})();let _=l.apply(s,c);return _===!1&&(_=a.apply(s,c)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(i){let l=[];return l.push(o.call(this,i)),s&&(l=l.concat(s.call(this,i))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return bt.lex(t,e??this.defaults)}parser(t,e){return wt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=t),s.async)return(async()=>{let i=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():t?bt.lex:bt.lexInline)(i,s),a=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():t?wt.parse:wt.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(o);try{s.hooks&&(e=s.hooks.preprocess(e));let i=(s.hooks?s.hooks.provideLexer():t?bt.lex:bt.lexInline)(e,s);s.hooks&&(i=s.hooks.processAllTokens(i)),s.walkTokens&&this.walkTokens(i,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():t?wt.parse:wt.parseInline)(i,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(i){return o(i)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let n="<p>An error occurred:</p><pre>"+$t(r.message+"",!0)+"</pre>";return e?Promise.resolve(n):n}if(e)return Promise.reject(r);throw r}}},qt=new Ol;function pe(t,e){return qt.parse(t,e)}pe.options=pe.setOptions=function(t){return qt.setOptions(t),pe.defaults=qt.defaults,Co(pe.defaults),pe};pe.getDefaults=Bn;pe.defaults=Bt;pe.use=function(...t){return qt.use(...t),pe.defaults=qt.defaults,Co(pe.defaults),pe};pe.walkTokens=function(t,e){return qt.walkTokens(t,e)};pe.parseInline=qt.parseInline;pe.Parser=wt;pe.parser=wt.parse;pe.Renderer=Xr;pe.TextRenderer=Vn;pe.Lexer=bt;pe.lexer=bt.lex;pe.Tokenizer=Zr;pe.Hooks=vr;pe.parse=pe;var Zd=pe.options,Xd=pe.setOptions,Qd=pe.use,Jd=pe.walkTokens,eu=pe.parseInline;var tu=wt.parse,ru=bt.lex;function Bo(t){let e=pe.parse(t),r=wo.sanitize(e);return vo(r)}function Ml(t){return String(t||"").replace(/^docs\/(superpowers\/)?/,"")}function Uo(t,e){let r=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",i="",l="";function a(y){y.key==="Escape"&&s&&(y.preventDefault(),k())}document.addEventListener("keydown",a);function c(){return s?d`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>k()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ml(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>k()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?d`<div class="mv__status">불러오는 중…</div>`:o==="error"?d`<div class="mv__status mv__status--error">
                    ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Bo(i)}
          </div>
        </div>
      </div>
    `:d``}function _(){_e(c(),t)}async function h(y){s=y,o="loading",i="",l="",_();let x=r?r():"";if(!x){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let N="/api/doc?workspace="+encodeURIComponent(x)+"&path="+encodeURIComponent(y);try{let P=await n(N),q=await P.json().catch(()=>({}));if(!P.ok||!q||q.ok!==!0){o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(q&&q.error||P.status)+")",_();return}i=String(q.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function k(){s=null,_e(d``,t)}function v(){document.removeEventListener("keydown",a),k()}return{open:h,close:k,destroy:v}}var Nl=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],zo="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Pl(t){return typeof t=="number"&&Number.isFinite(t)?t:0}function Fl(t){let e=gt(t);if(!e||!t)return"";let r=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?` \xB7 $${t.total_cost_usd.toFixed(2)}`:"";return d`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력)"
      >${e.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${t.replayed?d`<span class="detail-usage-partial" title=${zo}
          >부분 집계</span
        >`:""}`}function ql(t){let e=typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)?t.total_cost_usd:null;return d`<div class="detail-session__usage-detail">
    ${Nl.map(r=>d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Pl(t[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${e===null?"":d`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${e.toFixed(2)}</span
          ></span
        >`}
    ${t.replayed?d`<span class="detail-session__usage-note">${zo}</span>`:""}
  </div>`}var Bl={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ul(t){if(typeof t!="number"||!Number.isFinite(t))return"";let e=new Date(t),r=String(e.getHours()).padStart(2,"0"),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ho(t,e={},r={}){let n=Array.isArray(t)?t:[],s=r.expanded||new Set;if(n.length===0)return d`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let c of n)c&&typeof c.resumed_from=="string"&&c.resumed_from.length>0&&o.add(c.resumed_from);let i=c=>{if(!(c.status==="failed"||c.status==="orphaned"))return"";let h=typeof c.session_id=="string"&&c.session_id.length>0,k=o.has(c.attempt_id),v=h&&!k,y=h?k?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return d`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${c.attempt_id}
      ?disabled=${!v}
      title=${y}
      @click=${x=>{x.stopPropagation(),v&&e.onResume&&e.onResume(c.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=c=>{if(!(c.status==="failed"||c.status==="orphaned")||typeof c.cause!="string"||c.cause==="")return"";let h=c.cause_detail,k=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:c.cause;return d`<div class="detail-session__cause" title=${k}>
      ${c.cause}
    </div>`},a=c=>{if(!gt(c.usage))return"";let _=s.has(c.attempt_id);return d`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${c.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),e.onToggleUsage&&e.onToggleUsage(c.attempt_id)}}
    >
      τ 자세히
    </button>`};return d`
    <div class="detail-section-label">
      세션 이력${Fl(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(c=>d`<div class="detail-session-row">
            <button
              type="button"
              class="detail-session detail-session--${c.status||"unknown"}"
              data-attempt-id=${c.attempt_id}
              @click=${()=>e.onOpen&&e.onOpen(c.attempt_id)}
            >
              <span class="detail-session__glyph"
                >${Bl[c.status||""]||"\xB7"}</span
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
              ${gt(c.usage)?d`<span class="detail-session__usage"
                    >${gt(c.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Ul(c.started_at)}</span
              >
            </button>
            ${a(c)} ${i(c)} ${l(c)}
            ${s.has(c.attempt_id)&&c.usage?ql(c.usage):""}
          </div>`)}
    </div>
  `}var zl=["open","in_progress","deferred","resolved","closed"],Hl=[0,1,2,3,4];function Wo(t,e){let r=e.issueStores,n=e.onClose,s=e.transport,o=e.onNavigate,i=e.queueStore,l=e.sessionLogStore,a=null,c=null,_={},h=!1,k=!1,v="",y="",x="";function N(){h=!1,k=!1,v="",y="",x=""}let P=document.createElement("div");P.className="md-viewer-root",document.body.appendChild(P);let q=Uo(P,{getWorkspacePath:e.getWorkspacePath||(()=>"")}),U=document.createElement("div");U.className="session-log-root",document.body.appendChild(U);let D=Ur(U,{transport:s?(w,I)=>Promise.resolve(s(w,I)):void 0,sessionLogStore:l});function E(){if(!i||!a)return[];let w=i.get();return(w&&w.attempts?Object.values(w.attempts):[]).filter(S=>S&&S.bead_id===a).sort((S,Z)=>(Z.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,usage:S.usage||null}))}function A(){if(!i||!a)return null;let w=i.get();return Qt(w&&w.attempts||{},a)}let $=new Set;function g(w){$.has(w)?$.delete(w):$.add(w),F()}function M(w){let I=i?i.get():null,S=I&&I.attempts?I.attempts[w]:null;D.open({attempt_id:w,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function B(w){if(!s||!w)return;let I=()=>{let Z=i?i.get():null;return Z&&typeof Z.revision=="number"?Z.revision:0},S=await s("worker-attempt-resume",{attempt_id:w,expected_revision:I()});if(S&&S.conflict){let Z=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:I();S=await s("worker-attempt-resume",{attempt_id:w,expected_revision:Z})}S&&S.resumed===!1&&!S.conflict&&S.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let j={onOpen:M,onResume:B,onToggleUsage:g};function V(){let w=i?i.get():null,I=w&&w.exec_defaults;return I&&typeof I=="object"?I:{}}let ve=null;r&&r.subscribe&&(ve=r.subscribe(()=>ae()));let Pe=null;i&&typeof i.subscribe=="function"&&(Pe=i.subscribe(()=>{a&&F()}));function ye(w){w.key==="Escape"&&a&&(w.preventDefault(),n())}document.addEventListener("keydown",ye);function ae(){if(a){if(r&&typeof r.snapshotFor=="function"){let w=r.snapshotFor("detail:"+a)||[];c=w.find(S=>S&&S.id===a)||w[0]||c}F()}}function oe(w){Ft(w).then(I=>{I?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function xe(w){w.preventDefault(),w.stopPropagation(),a&&oe(a)}function st(w,I){w.preventDefault(),w.stopPropagation(),oe(I)}function ct(w,I){w.preventDefault(),w.stopPropagation(),q.open(I)}function be(w,I){_[w]=I,F(),!(!s||!a)&&Promise.resolve(s("update-exec-settings",{id:a,key:w,value:I})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ge(w,I,S){if(!s||!a)return!1;try{let Z=await Promise.resolve(s(w,I)),u=Array.isArray(Z)?Z[0]:Z;return u&&typeof u=="object"&&u.id?(c=u,!0):(J(S,"error"),!1)}catch{return J(S,"error"),!1}}function we(w){setTimeout(()=>{try{let I=t.querySelector(w);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function at(){h=!0,v=c&&c.title||"",F(),we('.detail-edit__input[data-edit="title"]')}function ue(w){v=w.target.value}function Me(){h=!1,v="",F()}function dt(){Ge("edit-text",{id:a,field:"title",value:v},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(h=!1,v=""),F()})}function Fe(){k=!0,y=c&&c.description||"",F(),we('.detail-edit__textarea[data-edit="description"]')}function je(w){y=w.target.value}function Se(){k=!1,y="",F()}function Ye(){Ge("edit-text",{id:a,field:"description",value:y},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(k=!1,y=""),F()})}function Ze(w,I,S,Z){if(w.key==="Escape"){w.stopPropagation(),S();return}w.key==="Enter"&&(!Z||w.ctrlKey||w.metaKey)&&(w.preventDefault(),I())}function Ve(w){let I=w.target.value;Ge("update-status",{id:a,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function Xe(w){let I=Number(w.target.value);Ge("update-priority",{id:a,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>F())}function qe(w){x=w.target.value}function Qe(){let w=x.trim();w.length!==0&&Ge("label-add",{id:a,label:w},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(x=""),F()})}function Ce(w){if(w.key==="Escape"){w.stopPropagation(),x="",F();return}w.key==="Enter"&&(w.preventDefault(),Qe())}function Be(w){Ge("label-remove",{id:a,label:w},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>F())}let ot={onCopyPath:st,onOpenDoc:ct},Ue={onChange:be};function lt(w){return typeof w=="string"?w:w&&typeof w=="object"?String(w.id||w.to||w.issue_id||w.depends_on||""):""}function ft(w){switch(w&&typeof w=="object"?String(w.dependency_type||w.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function $e(w){let S=(Array.isArray(w.dependencies)?w.dependencies:[]).map(Z=>({id:lt(Z),icon:ft(Z)})).filter(Z=>Z.id.length>0);return d`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?d`<div class="detail-empty">의존성 없음</div>`:d`<div class="detail-deps">
            ${S.map(Z=>o?d`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Z.id)}
                  >
                    ${Z.icon?`${Z.icon} `:""}${Z.id}
                  </button>`:d`<span class="detail-dep"
                    >${Z.icon?`${Z.icon} `:""}${Z.id}</span
                  >`)}
          </div>`}
    `}function le(w){let I=w.metadata||{},S=w.workflow||{},Z=S.stages||{},u=Z.spec&&Z.spec.stale,b=Z.impl&&Z.impl.stale,R=S.route_source==="derived",X=S.route||I.route||"\u2014";return d`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${R?" detail-kv__v--derived":""}"
          title=${R?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${R&&S.route?`${X} ? (\uCD94\uB860)`:X}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${I.spec_review||"\uC5C6\uC74C"}${u?" \xB7 stale":""}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${I.impl_review||"\uC5C6\uC74C"}${b?" \xB7 stale":""}</span
        >
      </div>
      ${I.pr_url?d`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let ze={route:["spec_backed","full_plan"]};async function He(w,I){let S=I.target.value;if(w==="route"&&c&&c.metadata&&c.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){F();return}await Ge("update-workflow-meta",{id:a,key:w,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),F()}function C(w){let I=w.metadata||{};return d` ${((Z,u)=>{let b=ze[Z],R=typeof I[Z]=="string"?I[Z]:"";return d`<div class="detail-kv">
        <span class="detail-kv__k">${Z}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Z}
          data-edit=${`wfmeta-${Z}`}
          @change=${X=>He(Z,X)}
        >
          <option value="" ?selected=${!b.includes(R)}>
            ${u}
          </option>
          ${b.map(X=>d`<option value=${X} ?selected=${R===X}>${X}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function O(w){return h?d`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${v}
            @input=${ue}
            @keydown=${I=>Ze(I,dt,Me,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${dt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Me}
            >
              취소
            </button>
          </div>
        </div>
      `:d`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${w}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${at}
        >
          ✎
        </button>
      </div>
    `}function ee(w){let I=_t(w.created_at),S=_t(w.updated_at);return!I&&!S?d``:d`
      ${I?d`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${S?d`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function Q(w,I){return d`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ve}
        >
          ${zl.map(S=>d`<option value=${S} ?selected=${S===w}>${S}</option>`)}
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
          ${Hl.map(S=>d`<option value=${String(S)} ?selected=${S===I}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function K(w){return d`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${k?"":d`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Fe}
            >
              ✎
            </button>`}
      </div>
      ${k?d`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${y}
              @input=${je}
              @keydown=${I=>Ze(I,Ye,Se,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Ye}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Se}
              >
                취소
              </button>
            </div>
          </div>`:d`<div class="detail-overlay__desc">
            ${w||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function ne(w){let I=typeof w.notes=="string"?w.notes:"";return I.trim().length===0?d``:d`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function ce(w){let I=Array.isArray(w.labels)?w.labels:[];return d`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(S=>d`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>Be(S)}
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
            @input=${qe}
            @keydown=${Ce}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Qe}
          >
            추가
          </button>
        </span>
      </div>
    `}function fe(){if(!a)return d``;let w=c||{},I=String(w.id||a),S=w.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Z=w.status||"open",u=typeof w.priority=="number"?Math.max(0,Math.min(4,w.priority)):"",b=w.description||"",R={...w,metadata:{...w.metadata||{},..._}};return d`
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
            @click=${xe}
          >
            ${I}
          </button>
          ${O(S)} ${Q(Z,u)}
          ${ee(w)} ${K(b)}
          ${ne(w)} ${ce(w)} ${$e(w)}
          ${le(w)} ${C(w)}
          ${so(w,ot)}
          ${oo(R,Ue,V())}
          ${Ho(E(),j,{total:A(),expanded:$})}
        </div>
      </div>
    `}function F(){_e(fe(),t)}return{load(w){w!==a&&(_={},N()),a=w,c=null,ae()},clear(){a=null,c=null,_={},N(),q.close(),D.close(),_e(d``,t)},destroy(){ve&&(ve(),ve=null),Pe&&(Pe(),Pe=null),document.removeEventListener("keydown",ye),q.destroy(),P.parentNode&&P.parentNode.removeChild(P),D.destroy(),U.parentNode&&U.parentNode.removeChild(U),a=null,c=null,_e(d``,t)}}}var Wl=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Go(t,e){return wn(t,e)?"shown":e.hidden_labels.includes(t)?"hidden_exact":"hidden_prefix"}function Gl(t,e,r){if(!r)return{hidden_labels:e.hidden_labels.includes(t)?e.hidden_labels:[...e.hidden_labels,t],visible_labels:e.visible_labels.filter(o=>o!==t)};let n=e.hidden_labels.filter(o=>o!==t);return e.hidden_prefixes.some(o=>o.length>0&&t.startsWith(o))?{hidden_labels:n,visible_labels:e.visible_labels.includes(t)?e.visible_labels:[...e.visible_labels,t]}:{hidden_labels:n}}function jo(t,e){let{policyStore:r,transport:n,labelOptions:s}=e,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);let i="";async function l(A){let $=r.get();if($)try{let g=await n("display-policy-set",{expected_revision:$.revision,policy:A($)});a(g),g&&g.conflict&&g.policy&&(g=await n("display-policy-set",{expected_revision:g.policy.revision,policy:A(g.policy)}),a(g)),g&&g.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function a(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function c(A){let $=r.get();if(!$)return;let g=Go(A,$)!=="shown";l(M=>Gl(A,M,g))}function _(){let A=i.trim();A.length!==0&&(i="",l($=>$.hidden_prefixes.includes(A)?{hidden_prefixes:$.hidden_prefixes}:{hidden_prefixes:[...$.hidden_prefixes,A]}),N())}function h(A){l($=>({hidden_prefixes:$.hidden_prefixes.filter(g=>g!==A)}))}function k(A){let $=r.get();if(!$)return;let g=$.chips[A]===!1;l(()=>({chips:{[A]:g}}))}function v(A){let $=s();return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${$.length===0?d`<div class="display-settings__empty">라벨 없음</div>`:d`<div class="display-settings__pills">
              ${$.map(g=>{let M=Go(g,A);return d`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${M}`}
                  data-label=${g}
                  data-state=${M}
                  @click=${()=>c(g)}
                >
                  ${g}
                </button>`})}
            </div>`}
      </section>
    `}function y(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map($=>d`<span class="display-settings__prefix">
                ${$}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${$} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h($)}
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
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function x(A){return d`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Wl.map(([$,g])=>d`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${$}
                  .checked=${A.chips[$]!==!1}
                  @change=${()=>k($)}
                />
                <span>${g}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let A=r.get();_e(d`
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
            ${A?d`${v(A)} ${y(A)}
                ${x(A)}`:d`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let P=!1,q=()=>{P=!1};o.addEventListener("close",q),o.addEventListener("cancel",q);let U=null;r.subscribe&&(U=r.subscribe(()=>{P&&N()}));function D(){P||(i="",P=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){P&&(P=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:E,destroy(){P=!1,o.removeEventListener("close",q),o.removeEventListener("cancel",q),U&&(U(),U=null),o.remove()}}}function Yo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),n=e.querySelector("#fatal-error-message"),s=e.querySelector("#fatal-error-detail"),o=e.querySelector("#fatal-error-reload"),i=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,_,h="")=>{r&&(r.textContent=c||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let k=typeof h=="string"?h.trim():"";if(s&&(k.length>0?(s.textContent=k,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),i&&i.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Vo(t,e,r){let n=Ee("views:nav"),s=null;function o(a){return c=>{c.preventDefault(),n("click tab %s",a),r.gotoView(a)}}function i(){let c=e.getState().view==="worker"?"worker":"board";return d`
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
    `}function l(){_e(i(),t)}return l(),s=e.subscribe(()=>l()),{destroy(){s&&(s(),s=null),_e(d``,t)}}}var Ko=["bug","feature","task","epic","chore"];function Zo(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Xo=["Critical","High","Medium","Low","Backlog"];function Qo(t,e){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,t.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),i=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),a=r.querySelector("#new-description"),c=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),k=r.querySelector(".new-issue__close");function v(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let A of Ko){let $=document.createElement("option");$.value=A,$.textContent=Zo(A),o.appendChild($)}i.replaceChildren();for(let A=0;A<=4;A+=1){let $=document.createElement("option");$.value=String(A);let g=Xo[A]||"Medium";$.textContent=`${A} \u2013 ${g}`,i.appendChild($)}}v();function y(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function x(E){s.disabled=E,o.disabled=E,i.disabled=E,l.disabled=E,a.disabled=E,_.disabled=E,h.disabled=E,h.textContent=E?"Creating\u2026":"Create"}function N(){c.textContent=""}function P(E){c.textContent=E}function q(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?i.value=A:i.value="2"}catch{o.value="",i.value="2"}}function U(){let E=o.value||"",A=i.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function D(){N();let E=String(s.value||"").trim();if(E.length===0){P("Title is required"),s.focus();return}let A=Number(i.value||"2");if(!(A>=0&&A<=4)){P("Priority must be 0..4"),i.focus();return}let $=String(o.value||""),g=String(a.value||""),M={title:E};$.length>0&&(M.type=$),String(A).length>0&&(M.priority=A),g.length>0&&(M.description=g),x(!0);try{await e("create-issue",M)}catch{x(!1),P("Failed to create issue");return}U(),x(!1),y()}return r.addEventListener("cancel",E=>{E.preventDefault(),y()}),k.addEventListener("click",()=>y()),_.addEventListener("click",()=>y()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),D())}),n.addEventListener("submit",E=>{E.preventDefault(),D()}),{open(){n.reset(),N(),q();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){y()}}}function Jo(t){if(typeof t!="number"||!Number.isFinite(t)||t<=0)return"";if(t<6e4)return`${Math.round(t/1e3)}\uCD08`;let e=t/6e4;return`${Number.isInteger(e)?e:Math.round(e*10)/10}\uBD84`}function ei(t){return Array.isArray(t)?t.filter(e=>typeof e=="string").join(" "):""}var jl={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Yl=[{key:"orchestration_model",values:()=>$n},{key:"orchestration_effort",values:()=>xn},{key:"review_model",values:()=>Sn},{key:"impl_model",values:()=>Tn}];function ti(t,e){let{queueStore:r,transport:n,getWorkspacePath:s}=e,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),t.appendChild(o);function i(){return r&&r.get()||{revision:0,exec_defaults:{}}}function l(){let g=i();return typeof g.revision=="number"?g.revision:0}function a(){let g=i().exec_defaults;return g&&typeof g=="object"?g:{}}function c(g){g&&g.queue&&r&&r.set(g.queue)}async function _(g,M){if(!n)return;let B={key:g,value:M||null};try{let j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()});c(j),j&&j.conflict&&(j=await n("worker-queue-set-exec-default",{...B,expected_revision:l()}),c(j)),j&&j.conflict&&J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function h(g,M,B){let j=!!B&&!M.includes(B);return d`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${g}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${g}`}
        data-key=${g}
        @change=${V=>{_(g,V.target.value)}}
      >
        <option value="" ?selected=${!B}>
          ${An[g]||"(\uAE30\uBCF8)"}
        </option>
        ${j?d`<option value=${B} ?selected=${!0}>
              ${B} (비호환)
            </option>`:""}
        ${M.map(V=>d`<option value=${V} ?selected=${B===V}>${V}</option>`)}
      </select>
    </div>`}function k(){let g=i().workspace_info;return g&&typeof g=="object"?g:{}}function v(g,M){return d`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${M}</span
    >`}function y(g){let M=g?ei(g.cmd):"",B=g?Jo(g.timeout_ms):"",j=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${v("config","config")}
            ${B?d`<span class="exec-defaults__vd-meta"
                  >timeout ${B}</span
                >`:""}
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${j}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function x(g){let M=g?ei(g.cmd):"",B=g?Jo(g.timeout_ms):"",j=B?`timeout ${B} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",V=s&&s()||"<workspace \uACBD\uB85C>";return d`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${M?d`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${M}</span>
            ${v("config","config")}
            ${g.detached===!0?v("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${j}</span>
          </div>`:d`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function N(g){if(!g||typeof g!="object")return"";let M=jl[String(g.outcome)];if(!M)return"";let B=g.outcome==="failed"&&g.reason?`${M.label} \xB7 ${g.reason}`:M.label,j=[_t(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(V=>V.length>0).join(" \xB7 ");return d`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${v(M.modifier,B)}
        ${j?d`<span class="exec-defaults__vd-meta">${j}</span>`:""}
      </div>
    </div>`}function P(g){return d`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${y(g.verify_cmd)} ${x(g.deploy_cmd)}
      ${N(g.last_deploy)}
    </section>`}function q(){let g=a();_e(d`
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
            ${Yl.map(M=>h(M.key,M.values(),g[M.key]||""))}
            ${P(k())}
          </div>
        </div>
      `,o)}let U=!1,D=()=>{U=!1};o.addEventListener("close",D),o.addEventListener("cancel",D);let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{U&&q()}));function A(){U||(U=!0,q(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function $(){U&&(U=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:A,close:$,destroy(){U=!1,o.removeEventListener("close",D),o.removeEventListener("cancel",D),E&&(E(),E=null),o.remove()}}}function Sr(t){let e=Zt(t.created_at),r=Zt(t.updated_at);return!e&&!r?"":d`<div class="worker-mini__meta">
    ${e?d`<span title=${`\uC0DD\uC131 ${_t(t.created_at)}`}
          >생성 ${e}</span
        >`:""}${e&&r?d`<span>·</span>`:""}${r?d`<span title=${`\uC218\uC815 ${_t(t.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Kn(t){let e=t.draggable&&!t.done,r=Array.isArray(t.badges)?t.badges:[],n=gt(t.usage),s=t.merge_step||null,o=t.lane==="pr_wait"||!!t.revise_action,i=e?d`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",l=d`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${t.id}</span
  >`,a=d`<span class="worker-mini__title">${t.title}</span>`,c=t.pr_url&&t.pr_number?d`<a
          class="worker-mini__pr"
          href=${t.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${t.pr_number} ↗</a
        >`:"",_=r.map(U=>U===t.live_badge?d`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${U}</span
        >`:d`<span
          class="worker-mini__badge${t.alert?" worker-mini__badge--alert":""}"
          >${U}</span
        >`),h=t.reason?d`<span class="worker-mini__reason">${t.reason}</span>`:"",k=n?d`<span class="worker-usage" title=${Br(t.usage)}
        >${n}</span
      >`:"",v=s?d`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",y=t.merge_action?d`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${t.id}
        ?disabled=${t.merge_enabled===!1}
        title=${t.merge_title||""}
      >
        ${t.merge_label||"\uBA38\uC9C0"}
      </button>`:"",x=t.cancel_action?d`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${t.id}
        ?disabled=${t.cancel_enabled===!1}
        title=${t.cancel_title||""}
      >
        취소
      </button>`:"",N=t.discard_action?d`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${t.id}
        ?disabled=${t.discard_enabled===!1}
        title=${t.discard_enabled===!1?t.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",P=t.revise_action?d`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title=${t.revise_title||"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4"}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${t.id}
          ?disabled=${t.revise_enabled===!1}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`:"",q=!!(n||s||t.merge_action||t.cancel_action||t.discard_action||t.revise_action);return d`<div
    class="worker-mini${o?" worker-mini--card":""}${e?"":" worker-mini--static"}${t.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${t.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${e?"true":"false"}
    data-bead-id=${t.id}
    data-lane=${t.lane}
  >
    ${o?d`<div class="worker-mini__head">
            ${i}${l}${c}${_}${h}
          </div>
          <div class="worker-mini__body">${a}</div>
          ${q?d`<div class="worker-mini__foot">
                ${k}${v}
                <span class="worker-mini__actions"
                  >${y}${x}${N}${P}</span
                >
              </div>`:""}
          ${Sr(t)}`:d`<div class="worker-mini__line">
            ${i}${l}${a}${c}${_}${h}${k}${v}${y}${x}${N}
          </div>
          ${Sr(t)}`}
  </div>`}function Vl(t){let e=t.draggable&&!t.done,r=t.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),i=typeof t.reason=="string"&&t.reason.startsWith("\u26D4");return d`<div
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
    ${r?qr(r,t.status):""}
    <div
      class="worker-card__foot${t.reason?"":" worker-card__foot--actions-only"}"
    >
      ${t.reason?d`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
            >${t.reason}</span
          >`:""}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${t.id}
        ?disabled=${!e}
        title=${e?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Sr(t)}
  </div>`}function Et(t){let e=!!t.collapsible&&!!t.collapsed,r=d`<span
      class="worker-pane__dot worker-pane__dot--${t.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${t.title}</span>
    ${e&&t.preview?d`<span class="worker-pane__preview">${t.preview}</span>`:""}
    <span class="worker-pane__count">${t.items.length}</span>`;return d`<section
    class="worker-pane worker-pane--lane-${t.lane}${t.src?" worker-pane--src":""}${t.live?" worker-pane--live":""}${t.collapsible?" worker-pane--collapsible":""}${e?" worker-pane--collapsed":""}"
    id=${t.id}
    data-lane=${t.lane}
  >
    ${t.collapsible?d`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${t.lane}
          aria-expanded=${e?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${e?"\u25B8":"\u25BE"}</span
          >
        </button>`:d`<header class="worker-pane__hd">
          ${r}${t.header_control?t.header_control:""}
        </header>`}
    ${e?"":d`${t.controls?t.controls:""}
          <div class="worker-pane__body">
            ${t.body?t.body:t.items.length===0?d`<div class="worker-pane__empty">
                    ${t.empty||""}
                  </div>`:t.items.map(n=>t.lane==="candidate"?Vl(n):Kn(n))}
          </div>`}
  </section>`}var ri=160;function Zn(t){return t.length>ri?`${t.slice(0,ri)}\u2026`:t}function Kl(t){return!t||!t.reason?"":d`<div class="worker-banner__detail">
    가드:
    ${t.reason}${t.command?d` · <code>${Zn(t.command)}</code>`:""}
  </div>`}function Zl(t){return t?d`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${t}</pre>
  </details>`:""}function Xl(t){return t?d`<div class="worker-banner__log-path">
    전체 로그: <code>${t}</code>
  </div>`:""}function Ql(t){if(!Number.isFinite(t)||t<0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),n=e%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Jl(t){if(!t||!t.reason)return"";let e=t.reason.startsWith("export_removal_failed:");return d`<div
    class="worker-banner worker-banner--ship"
    role="alert"
    data-bead-id=${t.bead_id||""}
  >
    ⚠ ${t.bead_id||"(bead \uBBF8\uC0C1)"} 머지 완료 — capability 발행이
    실패했습니다 (${t.reason}). bead는 closed지만
    ${e?d`취소 처분된 자손의 <code>export:</code> 라벨이 남아 있어 다음
          스윕이 이를 다시 발행 대상으로 읽습니다.`:d`<code>provides:</code> 라벨이 없어 이 capability에 걸린 external
          의존은 계속 막혀 있습니다.`}
    ${t.detail?d`<div class="worker-banner__detail">
          남은 작업: <code>${Zn(t.detail)}</code>
        </div>`:""}
    <div class="worker-banner__detail">
      ${e?d`수동 복구:
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
    ${t.pr_url?d`<div class="worker-banner__detail">
          <code>${t.pr_url}</code>
        </div>`:""}
  </div>`}function ni(t){let e=Array.isArray(t.cleanupFailures)?t.cleanupFailures:[];return d`<div class="worker-banners">
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
          ${Kl(t.failure.cause_detail)}
        </div>`:""}
    ${e.map(r=>d`<div
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
                <code>${Zn(r.detail)}</code>
              </div>`:""}
          ${Xl(r.log_path)} ${Zl(r.output_tail)}
        </div>`)}
    ${Jl(t.shipFailure)}
  </div>`}function ec(t,e,r=null){let n=!!t.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof t.started_at=="number"?Ql(e-t.started_at):"\u2014",o=[t.runner,t.model].filter(Boolean).join(" \xB7 "),i=gt(t.usage),l=t.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,a=t.attempt_id&&t.attempt_id===r;return d`<div
    class="rtile${a?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${t.bead_id}
    data-attempt-id=${t.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${t.bead_id}</span>
      ${t.resumed_from?d`<span
            class="rtile__resumed"
            title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${t.resumed_from})`}
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
          ${o?d`<span class="rtile__runner">${o}</span>`:""}
          ${i?d`<span class="worker-usage" title=${Br(t.usage)}
                >${i}</span
              >`:""}
        </div>`:""}
    ${Sr(t)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":d`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Xn(t,e=Date.now(),r=null){let n=Array.isArray(t)?t:[];return d`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?d`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>ec(s,e,r))}
  </div>`}var tc="tab:worker:ready",rc="tab:worker:blocked",en=1;function es(t){let e=t&&t.metadata;return!!(e&&typeof e=="object"&&e.spec_id)}var ii="beads-ui.worker.candidate-filter",Qn={show_blocked:!1,spec:"all"};function nc(){try{let t=window.localStorage.getItem(ii);if(!t)return{...Qn};let e=JSON.parse(t);if(!e||typeof e!="object")return{...Qn};let r=e.spec;return{show_blocked:e.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Qn}}}function sc(t){try{window.localStorage.setItem(ii,JSON.stringify(t))}catch{}}function oc(t,e){let r=l=>e.show_blocked||!l.blocked,n=l=>e.spec==="all"||(e.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,i=0;for(let l of t){let a=r(l),c=n(l);a&&c?s.push(l):!a&&c?o+=1:a&&!c&&(i+=1)}return{visible:s,hidden_blocked:o,hidden_spec:i}}var ic=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ai="bdui.worker.candidate_sort",ac=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],tn="spec";function lc(){try{let t=window.localStorage.getItem(ai);return t==="board"||t==="created"||t==="spec"?t:tn}catch{return tn}}function cc(t){try{window.localStorage.setItem(ai,t)}catch{}}var li="bdui.worker.done-range";function dc(){try{let t=window.localStorage.getItem(li);return Gt(t)?t:St}catch{return St}}function uc(t){try{window.localStorage.setItem(li,t)}catch{}}var pc="(max-width: 640px)",ci="beads-ui.worker.lane-collapsed",Tr={queue:!0,done:!0};function fc(){try{let t=window.localStorage.getItem(ci);if(!t)return{...Tr};let e=JSON.parse(t);return!e||typeof e!="object"?{...Tr}:{queue:typeof e.queue=="boolean"?e.queue:Tr.queue,done:typeof e.done=="boolean"?e.done:Tr.done}}catch{return{...Tr}}}function hc(t){try{window.localStorage.setItem(ci,JSON.stringify(t))}catch{}}function si(t){let e=Array.isArray(t)&&t.length>0?t[0]:null;if(!e)return"";let r=typeof e.title=="string"?e.title:e.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function _c(t,e,r){let n=Array.isArray(t)?t.slice():[];return e==="created"?n.sort(Mt):(n.sort(Or(r)),e==="board"?n:[...n.filter(es),...n.filter(s=>!es(s))])}function gc(t){let e=t&&t.parent;return(typeof e=="string"?e.length>0:!!(e&&e.id))||/\.\d+$/.test(t&&t.id||"")}function mc(t){let r=(Array.isArray(t?.dependencies)?t.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var bc=["closed_unmerged","undecidable"],wc=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function kc(t,e){for(let r of wc)if(t===r.from&&e===r.activity)return{label:r.to,live:!0};return{label:t,live:!1}}var Jn=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function yc(t){if(typeof t!="string"||t.length===0)return null;let e=Jn.length,r=Jn.findIndex(n=>n.step===t);return r<0?{label:t,index:0,total:e,percent:0}:{label:Jn[r].label,index:r+1,total:e,percent:Math.round((r+1)/e*100)}}function oi(t){switch(t){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return t}}function vc(t,e,r,n,s=null,o=null,i=null,l=!1,a=null,c=!0,_=null){let h=!!a&&a.position>0,k=!!a&&a.active===!0,v=a&&a.failure||null,y=r[t]||null,x=y&&y.gate?y.gate:null,N=y&&y.pr?y.pr:null,P=[];l&&P.push("\uC138\uC158");let q=i?i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,U=kc(l&&x&&x.tier==="closed_unmerged"?"\uB2EB\uD798":x&&x.gate_badge||"",q?null:o&&o.activity||null);q&&P.push(q),U.label&&P.push(U.label),x&&x.base_badge&&x.base_badge!==x.gate_badge&&P.push(x.base_badge),n&&P.push("\uC815\uB9AC \uC2E4\uD328"),h&&!k&&P.push(`\uBA38\uC9C0 \uB300\uAE30 #${a.position}`),v&&P.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${oi(v)}`),_&&P.push(`\uC790\uB3D9 \uC81C\uC678: ${oi(_)}`);let D=!!x&&x.base_badge==="\uCDA9\uB3CC",E=!!x&&x.enabled===!0,A=yc(o&&o.merge_progress?o.merge_progress.step:null),$=!!n&&!!x&&x.tier==="merged",g=l&&!!x&&x.tier==="merged",M=l&&D&&c===!1;return{id:t,title:e,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:N&&typeof N.number=="number"?N.number:null,pr_url:N&&typeof N.url=="string"?N.url:"",badges:P,live_badge:i==="running"?q:q?null:U.live?U.label:null,usage:s,alert:!!x&&bc.includes(x.tier)||!!n||!!v,merge_action:!h,cancel_action:h,cancel_enabled:!k,cancel_title:k?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(x&&x.tier==="merged"),merge_step:A,discard_enabled:!A&&!i&&!h,discard_title:i?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!A&&!i&&!M&&(E||D||$||g),merge_label:g?"\uC815\uB9AC":D&&!A&&!$?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:A?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${A.label}`:g?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":i==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":i==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":$?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":D?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?`\uBA38\uC9C0 (${x.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:x&&x.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${x&&x.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ts(t,e={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:i,gotoIssue:l,getWorkspacePath:a}=e,c=n?Nr(n,i):null,_=Pr({transport:r,uiOrderStore:i}),h=null,k=[],v=nc(),y=lc(),x=dc();function N(){let u=ur.find(b=>b.value===x);return u?u.label:"\uC624\uB298"}let P=fc(),q=!1,U=new Set,D=new Set,E=[],A=document.createElement("div");A.className="worker-console";let $=document.createElement("div");$.className="worker-top";let g=document.createElement("div");g.className="worker-drawer-overlay",g.hidden=!0;let M=document.createElement("div");M.className="worker-drawer-overlay__backdrop";let B=document.createElement("div");B.className="worker-drawer-host",g.append(M,B);let j=document.createElement("div");j.className="worker-lanes-host",A.append($,g,j),t.appendChild(A);let V=null,ve=Ur(B,{transport:r,sessionLogStore:o,onClose:()=>{V=null,g.hidden=!0,le()}}),Pe=ti(A,{queueStore:s,transport:r,getWorkspacePath:a});function ye(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:en,queue:[],pr_wait:[],done:[]}}function ae(){let u=ye();return typeof u.revision=="number"?u.revision:0}function oe(u){u&&u.queue&&s&&s.set(u.queue)}function xe(){let u=ye().queue;return Array.isArray(u)?u.length:0}async function st(u,b){if(!r)return;let R=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ae()});oe(R),R&&R.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ae()}).then(oe)}async function ct(u,b){if(!r)return;let R=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ae()});oe(R),R&&R.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ae()}).then(oe)}async function be(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:ae()});oe(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ae()}).then(oe)}async function Ge(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function we(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function at(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ae()});oe(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ae()}),oe(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function ue(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ae()});oe(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ae()}),oe(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function Me(u,b){if(!r)return null;let R=r,X=await R(u,{...b,expected_revision:ae()});return oe(X),X&&X.conflict&&(X=await R(u,{...b,expected_revision:ae()}),oe(X)),X}async function dt(u){if(!r||!u)return;U.add(u),le();let b;try{b=await Me("worker-merge-queue-add",{bead_id:u})}finally{U.delete(u),le()}!b||b.conflict||b.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function Fe(u){if(!r)return;let b=await Me("worker-merge-auto-toggle",{on:u});!b||b.conflict||J(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function je(u){if(!r||!u)return;let b=await Me("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function Se(){await Me("worker-merge-queue-remove",{all:!0})}async function Ye(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let R=await r("worker-pr-discard",{bead_id:u,expected_revision:ae()});if(oe(R),R&&R.conflict&&(R=await r("worker-pr-discard",{bead_id:u,expected_revision:ae()}),oe(R)),R&&R.discarded===!0){J("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}R&&R.discarded===!1&&!R.conflict&&J(`\uD3D0\uAE30 \uAC70\uBD80: ${R.reason||""}`,"error",2800)}async function Ze(u,b){if(!r||!b||D.has(b))return;D.add(b),le();let R;try{R=await r(u,{bead_id:b,expected_revision:ae()}),oe(R),R&&R.conflict&&(R=await r(u,{bead_id:b,expected_revision:ae()}),oe(R))}finally{D.delete(b),le()}if(!(!R||R.conflict)){if(R.ok){J(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${R.reason||""}`,"error",3e3)}}async function Ve(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:ae()});oe(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ae()}).then(oe)}async function Xe(u){if(!r||!Number.isFinite(u))return;let b=Math.max(en,Math.floor(u)),R=await r("worker-queue-set-slots",{slots:b,expected_revision:ae()});oe(R),R&&R.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:ae()}).then(oe)}function qe(){let u=ye(),b=c?c.selectBoardColumn(tc,"ready"):[],R=c?c.selectBoardColumn(rc,"blocked"):[],X=u.bead_titles||{},he=new Map;for(let[T,W]of Object.entries(X))typeof W=="string"&&W.length>0&&he.set(T,W);for(let T of[...b,...R])he.set(T.id,T.title||T.id);let Te=u.bead_times||{},f=new Map;for(let[T,W]of Object.entries(Te))W&&typeof W=="object"&&f.set(T,W);for(let T of[...b,...R])f.set(T.id,{created_at:T.created_at,updated_at:T.updated_at});let m=T=>f.get(T)||{},H=u.pr_wait||[],G=u.pr_observations||{},te=u.pr_activity||{},ge=u.cleanup_failed||{},kt=Object.entries(ge).map(([T,W])=>({bead_id:T,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",detail:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0,log_path:W&&typeof W.log_path=="string"&&W.log_path?W.log_path:void 0})),Ke=u.ship_failure||null,Je=Ke&&typeof Ke.reason=="string"&&Ke.reason?{bead_id:typeof Ke.bead_id=="string"?Ke.bead_id:"",reason:Ke.reason,detail:typeof Ke.detail=="string"?Ke.detail:null,pr_url:typeof Ke.pr_url=="string"?Ke.pr_url:null}:null,re=u.queue||[],Re=new Set([...re.map(T=>T.bead_id),...H.map(T=>T.bead_id),...u.done.map(T=>T.bead_id)]),Ut=new Set(R.map(T=>T.id)),Jt=i?i.get()?.order||{}:{},er=new Set,ut=[];for(let T of[...b,...R])Re.has(T.id)||er.has(T.id)||gc(T)||(er.add(T.id),ut.push(T));k=_c(ut,y,Jt);let Ar=u.admission||{},tr=T=>{let W=Ar[T];if(!W)return"";if(W.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ie=typeof W.reason=="string"?W.reason:"",We=ie.indexOf(":");return We>0&&We<ie.length-1?`\u26D4 ${ie.slice(0,We)} (${ie.slice(We+1)})`:`\u26D4 ${ie}`},Er=k.map(T=>{let W=es(T),ie=Ut.has(T.id),We=[];ie&&We.push(mc(T)),W||We.push("spec \uC5C6\uC74C");let fs=tr(T.id);return fs&&We.push(fs),{id:T.id,title:T.title||T.id,reason:We.join(" \xB7 "),draggable:W,lane:"candidate",created_at:T.created_at,updated_at:T.updated_at,workflow:T.workflow,status:T.status,blocked:ie,has_spec:W}}),zt=oc(Er,v),rn=zt.visible,Y=u.revise_parked||{},p=(T,W)=>T.map(ie=>{let We=W==="queue"?Y[ie.bead_id]:null;return{id:ie.bead_id,title:he.get(ie.bead_id)||ie.bead_id,reason:W==="done"?"":tr(ie.bead_id),draggable:W!=="done",done:W==="done",lane:W,badges:We?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!We,revise_action:!!We,revise_enabled:!!We&&!D.has(ie.bead_id),revise_title:We?We.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${We.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:W==="done"?Qt(u.attempts||{},ie.bead_id):null,...m(ie.bead_id)}}),L=u.attempts?Object.values(u.attempts):[],z=new Set;for(let T of L)T&&typeof T.resumed_from=="string"&&T.resumed_from.length>0&&z.add(T.resumed_from);let ke=new Map;for(let T of L)ke.set(T.bead_id,T.attempt_id);let Ne=new Map;for(let T of L)Ne.set(T.attempt_id,T);function Ae(T){let W=new Set,ie=T;for(;ie&&!W.has(ie.attempt_id);){if(ie.conflict_resolution===!0)return!0;W.add(ie.attempt_id),ie=typeof ie.resumed_from=="string"&&ie.resumed_from.length>0&&Ne.get(ie.resumed_from)||null}return!1}let De=[],Oe=null;for(let T of L){let W=T.status==="paused"&&!z.has(T.attempt_id);T.status==="running"||W?De.push({bead_id:T.bead_id,attempt_id:T.attempt_id,title:he.get(T.bead_id)||T.bead_id,runner:T.runner||null,model:T.model||null,effort:T.effort||null,started_at:typeof T.started_at=="number"?T.started_at:null,resumed_from:T.resumed_from||null,paused:W,conflict_resolution:Ae(T),can_pause:typeof T.session_id=="string"&&T.session_id.length>0,usage:Qt(u.attempts||{},T.bead_id),...m(T.bead_id)}):(T.status==="failed"||T.status==="orphaned")&&!(ke.get(T.bead_id)!==T.attempt_id)&&typeof T.dismissed_at!="number"&&(Oe=T)}let yt=null;if(Oe){let T=typeof Oe.session_id=="string"&&Oe.session_id.length>0,W=z.has(Oe.attempt_id),ie=Oe.cause_detail;yt={repo:Oe.repo||"",reason:Oe.cause||Oe.status,cause_detail:ie&&typeof ie.reason=="string"?{reason:ie.reason,command:typeof ie.command=="string"?ie.command:null}:null,resume_attempt_id:Oe.attempt_id,resume_eligible:T&&!W,resume_reason:T?W?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let rr=new Set(De.map(T=>T.bead_id)),Le=Array.isArray(u.merge_queue)?u.merge_queue:[],nr=new Map;Le.forEach((T,W)=>{T&&typeof T.bead_id=="string"&&nr.set(T.bead_id,W+1)});let sr=u.merge_queue_state||{active:null,failures:{}},wi=sr.failures||{},os=u.auto_merge_skips||{},Cr=new Map;for(let T of De)T.conflict_resolution&&(T.paused?Cr.has(T.bead_id)||Cr.set(T.bead_id,"paused"):Cr.set(T.bead_id,"running"));let is=De.filter(T=>!T.paused).length,as=(u.workspace_info||{}).slots,ls=typeof as=="number"?as:typeof u.slots=="number"?u.slots:en,ki=is>ls,cs=Lr(x),yi=(Array.isArray(u.done)?u.done.slice():[]).filter(T=>cs===void 0||typeof T.added_at!="number"||T.added_at>=cs).sort((T,W)=>(W.added_at||0)-(T.added_at||0)),ds=p(yi,"done"),us=0,ps=0,nn=!1;for(let T of ds){let W=T.usage;W&&typeof W=="object"&&(Number.isFinite(W.input_tokens)&&(us+=W.input_tokens,nn=!0),Number.isFinite(W.output_tokens)&&(ps+=W.output_tokens,nn=!0))}let vi=nn?gt({input_tokens:us,output_tokens:ps}):null;return{queue:u,idToTitle:he,candidates:rn,candidate_hidden:{blocked:zt.hidden_blocked,spec:zt.hidden_spec},running:De,live_count:is,slots:ls,over_cap:ki,failure:yt,waiting:p(re.filter(T=>!rr.has(T.bead_id)),"queue"),pr_wait:H.map(T=>vc(T.bead_id,he.get(T.bead_id)||T.bead_id,G,ge[T.bead_id]||null,Qt(u.attempts||{},T.bead_id),te[T.bead_id]||(U.has(T.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Cr.get(T.bead_id)||null,T.external===!0,{position:nr.get(T.bead_id)||0,active:sr.active===T.bead_id,failure:wi[T.bead_id]||null},T.wt_present!==!1,u.auto_merge===!0&&os[T.bead_id]?os[T.bead_id].reason||"":null)).map(T=>({...T,...m(T.id)})),merge_queue_length:Le.length,merge_queue_running:Le.length>0,verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,done:ds,token_total:vi,cleanup_failures:kt,ship_failure:Je}}function Qe(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",R=d`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,X=u.over_cap?d`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",he=d`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${N()} 완료 <b>${u.done.length}</b></span
      >`,Te=d`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${en}
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
      </button>`,f=ni({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return q?d`<div class="worker-ribbon">
          ${R}
          <div class="worker-kpi worker-kpi--ribbon">${X}${he}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Te}</div>
        </div>
        ${f}`:d`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${R}${Te}</div>
        <div class="worker-kpi">
          ${X}${he}
          ${u.token_total?d`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${N()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${N()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${f}`}function Ce(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(R=>!R.paused);return d`<section
      class="worker-now${b?" worker-pane--live":""}"
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
        ${lt(u)}
      </header>
      ${u.running.length>0?Xn(u.running,Date.now(),V):""}
      ${u.pr_wait.map(R=>Kn(R))}
    </section>`}function Be(u){let b=u.candidate_hidden;return d`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${v.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ic.map(R=>d`<button
              type="button"
              class="worker-filter__chip${v.spec===R.value?" is-active":""}"
              data-spec=${R.value}
              aria-pressed=${v.spec===R.value?"true":"false"}
            >
              ${R.label}
            </button>`)}
        ${b.spec>0?d`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function ot(){return d`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${ac.map(u=>d`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Ue(){return d`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${x}
      >
        ${ur.map(u=>d`<option value=${u.value} ?selected=${x===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function lt(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return d`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let R=u.pr_wait.filter(X=>X.merge_action&&X.merge_enabled).length;return d`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${R>0?` ${R}`:""}
    </button>`}function ft(u){let b=Et({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ot(),controls:Be(u)});return q?d`<div class="worker-lanes worker-lanes--mobile">
        ${Ce(u)}
        ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:P.queue,preview:si(u.waiting)})}
        ${b}
        ${Et({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ue(),collapsible:!0,collapsed:P.done,preview:u.token_total||si(u.done)})}
      </div>`:d`<div class="worker-lanes">
      ${b}
      ${Et({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Et({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(R=>!R.paused),body:Xn(u.running,Date.now(),V)})}
      ${Et({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:lt(u)})}
      ${Et({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${N()} ${u.done.length}`,items:u.done,empty:`${N()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ue()})}
    </div>`}function $e(u){P={...P,[u]:!P[u]},hc(P),le()}function le(){let u=qe();_e(Qe(u),$),_e(ft(u),j)}function ze(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let R=Math.round(u.getBoundingClientRect().height);A.style.setProperty("--worker-ribbon-top",`${R}px`)};if(b(),typeof ResizeObserver=="function"){let R=new ResizeObserver(b);R.observe(u),E.push(()=>R.disconnect())}else window.addEventListener("resize",b),E.push(()=>window.removeEventListener("resize",b))}function He(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(pc);q=!!u.matches;let b=R=>{let X=!!(R&&typeof R.matches=="boolean"?R.matches:u.matches);X!==q&&(q=X,le())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),E.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),E.push(()=>u.removeListener(b)))}function C(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let R=b.dataset.beadId||"",X=b.dataset.lane||"";h={bead_id:R,from_lane:X};try{u.dataTransfer?.setData("text/plain",R),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function O(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let R=b.dataset.lane||"";R!=="candidate"&&R!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function ee(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Q(u,b){let R=k.find(f=>f.id===u);if(!R)return;let X=k.filter(f=>f.id!==u),he=X.length;if(b){let f=b.dataset.beadId;if(f===u)return;let m=X.findIndex(H=>H.id===f);m>=0&&(he=m)}let Te=X.slice();Te.splice(he,0,R),_.applyReorder(u,Te,he)}function K(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let R=b.dataset.lane||"",X=h?.bead_id||u.dataTransfer?.getData("text/plain")||"",he=h?.from_lane||"";if(h=null,!X)return;let Te=u.target?.closest?.(".worker-mini, .worker-card"),f=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),m=f.length;if(Te){let H=f.indexOf(Te);H>=0&&(m=H)}if(b.classList.contains("worker-pane--collapsed")&&(m=xe()),R==="candidate"){if(he==="candidate"){Q(X,Te);return}he==="queue"&&be(X);return}R==="queue"&&(he==="queue"?ct(X,m):st(X,m))}function ne(u){v=u,sc(u),le()}function ce(u){y=u==="board"||u==="created"||u==="spec"?u:tn,cc(y),le()}function fe(u){x=Gt(u)?u:St,uc(x),le()}function F(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){ne({...v,show_blocked:b.checked});return}let R=u.target?.closest?.(".worker-done-range");if(R){fe(R.value);return}let X=u.target?.closest?.(".worker-sort");if(X){ce(X.value||tn);return}let he=u.target?.closest?.(".worker-slots__input");if(!he)return;let Te=Number.parseInt(he.value,10);if(!Number.isFinite(Te)){le();return}Xe(Te).then(le)}function w(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function I(u){let b=ye(),R=b.attempts?b.attempts[u]:null;V=u,g.hidden=!1,ve.open({attempt_id:u,meta:w(R)}),le()}function S(){if(!V)return;let u=ye(),b=u.attempts?u.attempts[V]:null;if(b){ve.updateMeta(w(b));return}ve.close()}function Z(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){Pe.open();return}let R=b?.closest?.(".worker-banner__resume");if(R){let re=R.dataset.attemptId;re&&at(re);return}let X=b?.closest?.(".worker-banner__dismiss");if(X){let re=X.dataset.attemptId;re&&ue(re);return}if(b?.closest?.(".worker-play")){Ve(!ye().auto_advance);return}let he=b?.closest?.(".worker-merge-all");if(he){he.classList.contains("worker-merge-all--stop")?ye().auto_merge===!0?Fe(!1):Se():Fe(!0);return}let Te=b?.closest?.(".worker-pane__hd--toggle");if(Te){let re=Te.dataset.lane;(re==="queue"||re==="done")&&$e(re);return}let f=b?.closest?.(".worker-card__place");if(f){let re=f.dataset.beadId;re&&!f.disabled&&st(re,xe());return}let m=b?.closest?.(".worker-filter__chip");if(m){let re=m.dataset.spec;(re==="all"||re==="with"||re==="without")&&ne({...v,spec:re});return}let H=b?.closest?.(".worker-mini__merge");if(H){dt(H.dataset.beadId||"");return}let G=b?.closest?.(".worker-mini__merge-cancel");if(G){je(G.dataset.beadId||"");return}let te=b?.closest?.(".worker-mini__discard");if(te){Ye(te.dataset.beadId||"");return}let ge=b?.closest?.(".worker-mini__revise-fix");if(ge){Ze("worker-revise-fix",ge.dataset.beadId||"");return}let kt=b?.closest?.(".worker-mini__revise-approve");if(kt){Ze("worker-revise-approve",kt.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let Re=b?.closest?.(".rtile")?.dataset?.attemptId;Re&&Ge(Re);return}if(b?.closest?.(".rtile__pause")){let Re=b?.closest?.(".rtile")?.dataset?.attemptId;Re&&we(Re);return}if(b?.closest?.(".rtile__resume")){let Re=b?.closest?.(".rtile")?.dataset?.attemptId;Re&&at(Re);return}if(b?.closest?.(".rtile__session")){let Re=b?.closest?.(".rtile")?.dataset?.attemptId;Re&&I(Re);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){ve.close();return}if(b?.closest?.(".worker-drawer-host"))return;let Ke=b?.closest?.(".rtile");if(Ke){if(b?.closest?.(".rtile__id")){let Re=Ke.dataset.beadId;Re&&Ft(Re).then(Ut=>{Ut?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let re=Ke.dataset.beadId;re&&l&&l(re);return}let Je=b?.closest?.(".worker-mini, .worker-card");if(Je){let re=Je.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){re&&Ft(re).then(Re=>{Re?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}re&&l&&l(re)}}return t.addEventListener("dragstart",C),t.addEventListener("dragover",O),t.addEventListener("dragleave",ee),t.addEventListener("drop",K),t.addEventListener("click",Z),t.addEventListener("change",F),He(),ze(),c&&E.push(c.subscribe(le)),s&&E.push(s.subscribe(()=>{le(),S()})),le(),{load(){le()},destroy(){for(let u of E.splice(0))try{u()}catch{}t.removeEventListener("dragstart",C),t.removeEventListener("dragover",O),t.removeEventListener("dragleave",ee),t.removeEventListener("drop",K),t.removeEventListener("click",Z),t.removeEventListener("change",F);try{ve.destroy()}catch{}g.hidden=!0;try{Pe.destroy()}catch{}_e(d``,t)}}}function rs(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function di(t,e,r,n=async()=>{},s=async()=>{}){let o=Ee("views:workspace-picker"),i=null,l=!1,a=!1,c=!1;async function _(A){let g=A.target.value,B=e.getState().workspace?.current?.path||"";if(g&&g!==B){o("switching workspace to %s",g),l=!0,E();try{await r(g)}catch(j){o("workspace switch failed: %o",j)}finally{l=!1,E()}}}async function h(){let A=e.getState(),$=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!$||a)){o("git-pulling workspace %s",$),a=!0,E();try{await n($)}catch(g){o("workspace git pull failed: %o",g)}finally{a=!1,E()}}}function k(A){let $=A.target;$&&t.contains($)||x()}function v(A){A.key==="Escape"&&x()}function y(){c||(c=!0,document.addEventListener("mousedown",k),document.addEventListener("keydown",v),E())}function x(){c&&(c=!1,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",v),E())}function N(){c?x():y()}async function P(A){let $=A.target,g=$.value,M=$.checked;o("toggling visibility %s \u2192 %s",g,String(M));try{await s(g,M)}catch(B){o("workspace visibility toggle failed: %o",B)}}function q(A){return A?d`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${l||a}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:d``}function U(A,$){return d`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${A.map(g=>d`
                    <label
                      class="workspace-picker__manage-row"
                      title="${g.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${g.path}"
                        .checked=${!$.has(g.path)}
                        @change=${P}
                      />
                      <span class="workspace-picker__manage-name"
                        >${rs(g.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let A=e.getState(),$=A.workspace?.current,g=A.workspace?.available||[],M=new Set(A.workspace?.hidden||[]),B=$?.path||g[0]?.path||"";if(g.length===0)return d``;let j=g.filter(V=>!M.has(V.path)||V.path===B);if(j.length<=1){let V=j[0]||g[0],ve=rs(V.path);return d`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${V.path}"
            >${ve}</span
          >
          ${U(g,M)}
          ${q(B)}
          ${a?d`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return d`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||a}
          aria-label="Select project workspace"
        >
          ${j.map(V=>d`
              <option
                value="${V.path}"
                ?selected=${V.path===B}
                title="${V.path}"
              >
                ${rs(V.path)}
              </option>
            `)}
        </select>
        ${U(g,M)}
        ${q(B)}
        ${l||a?d`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){_e(D(),t)}return E(),i=e.subscribe(()=>E()),{destroy(){i&&(i(),i=null),document.removeEventListener("mousedown",k),document.removeEventListener("keydown",v),_e(d``,t)}}}var ui=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append"];function ns(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function pi(t,e,r=ns()){return{id:r,type:t,payload:e}}function fi(t={}){let e=Ee("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},n=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",i=0,l=null,a=!0,c=new Map,_=[],h=new Map,k=new Set;function v(D){for(let E of Array.from(k))try{E(D)}catch{}}function y(){if(!a||l)return;o="reconnecting",e("ws reconnecting\u2026"),v(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,i)),E=(r.jitterRatio||0)*D,A=Math.max(0,Math.round(D+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",A,i+1),l=setTimeout(()=>{l=null,U()},A)}function x(D){try{s?.send(JSON.stringify(D))}catch(E){e("ws send failed",E)}}function N(){for(o="open",e("ws open"),v(o),i=0;_.length;){let D=_.shift();D&&x(D)}}function P(D){let E;try{E=JSON.parse(String(D.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(c.has(E.id)){let $=c.get(E.id);c.delete(E.id),E.ok?$?.resolve(E.payload):$?.reject(E.error||new Error("ws error"));return}let A=h.get(E.type);if(A&&A.size>0)for(let $ of Array.from(A))try{$(E.payload)}catch(g){e("ws event handler error",g)}else e("ws received unhandled message type: %s",E.type)}function q(){o="closed",e("ws closed"),v(o);for(let[D,E]of c.entries())E.reject(new Error("ws disconnected")),c.delete(D);i+=1,y()}function U(){if(!a)return;let D=n();try{s=new WebSocket(D),e("ws connecting %s",D),o="connecting",v(o),s.addEventListener("open",N),s.addEventListener("message",P),s.addEventListener("error",()=>{}),s.addEventListener("close",q)}catch(E){e("ws connect failed %o",E),y()}}return U(),{send(D,E){if(!ui.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let A=ns(),$=pi(D,E,A);return e("send %s id=%s",D,A),new Promise((g,M)=>{c.set(A,{resolve:g,reject:M,type:D}),s&&s.readyState===s.OPEN?x($):(e("queue %s id=%s (state=%s)",D,A,o),_.push($))})},on(D,E){h.has(D)||h.set(D,new Set);let A=h.get(D);return A?.add(E),()=>{A?.delete(E)}},onConnection(D){return k.add(D),()=>{k.delete(D)}},reconnect(){a=!0,l&&(clearTimeout(l),l=null),i=0,U()},close(){a=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function $c(){let t=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null}}}async function xc(t,e){try{let n=await(await fetch("/api/config")).json();t.setState({config:n})}catch(r){e("config refresh failed",r)}}var ss=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],hi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"]],_i="worker:queue",gi="ui:order",mi="ui:display-policy",Ct="tab:board:closed",bi="beads-ui.board.closed-range";function Sc(t){let e=Ee("main");e("bootstrap start");let r=d`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;_e(r,t);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),i=document.getElementById("detail-panel");if(s&&o&&i){let g=function(f,m){let H="Request failed",G="";if(f&&typeof f=="object"){let ge=f;if(typeof ge.message=="string"&&ge.message.length>0&&(H=ge.message),typeof ge.details=="string")G=ge.details;else if(ge.details&&typeof ge.details=="object")try{G=JSON.stringify(ge.details,null,2)}catch{G=""}}else typeof f=="string"&&f.length>0&&(H=f);let te=m&&m.length>0?`Failed to load ${m}`:"Request failed";$.open(te,H,G)},ue=function(f){return`${F.getState().workspace.current?.path||""}\0${f}`},Me=function(){oe&&(oe().catch(()=>{}),oe=null),xe=null,st=null},Fe=function(f){ct=f;let m=()=>{ct!==f||F.getState().selected_id!==f||(ct=null,dt(f))};if(!we){Ge.then(m);return}m()},Ze=function(){let f=Lr(Ye);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ve=function(f){if(f)for(let[m,H]of ss){if(je.has(m)||Se.has(m))continue;let G=m===Ct?Ze():{type:H};try{V.register(m,G)}catch(te){e("register %s store failed: %o",m,te)}Se.add(m),j.subscribeList(m,G).then(te=>{je.set(m,te)}).catch(te=>{e("subscribe %s failed: %o",m,te),g(te,"board")}).finally(()=>{Se.delete(m)})}else qe()},qe=function(){for(let[f]of ss){let m=je.get(f);m&&(m().catch(()=>{}),je.delete(f));try{V.unregister(f)}catch(H){e("unregister %s failed: %o",f,H)}}},Be=function(f){if(!f){ot();return}for(let[m,H]of hi)if(!(Qe.has(m)||Se.has(m))){try{V.register(m,{type:H})}catch(G){e("register %s store failed: %o",m,G)}Se.add(m),j.subscribeList(m,{type:H}).then(G=>{Qe.set(m,G)}).catch(G=>{e("subscribe %s failed: %o",m,G),g(G,"worker")}).finally(()=>{Se.delete(m)})}Ce||(B("subscribe-worker-queue",{id:_i}).catch(m=>{e("subscribe-worker-queue failed: %o",m)}),Ce=()=>B("unsubscribe-worker-queue",{id:_i}))},ot=function(){for(let[f]of hi){let m=Qe.get(f);m&&(m().catch(()=>{}),Qe.delete(f));try{V.unregister(f)}catch(H){e("unregister %s failed: %o",f,H)}}Ce&&(Ce().catch(()=>{}),Ce=null)},lt=function(){Ue||(B("subscribe-ui-order",{id:gi}).catch(f=>{e("subscribe-ui-order failed: %o",f)}),Ue=()=>B("unsubscribe-ui-order",{id:gi}))},ft=function(){Ue&&(Ue().catch(()=>{}),Ue=null),Pe.clear()},le=function(){$e||(B("subscribe-display-policy",{id:mi}).catch(f=>{e("subscribe-display-policy failed: %o",f)}),$e=()=>B("unsubscribe-display-policy",{id:mi}))},ze=function(){$e&&($e().catch(()=>{}),$e=null),ye.clear()},K=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var l=g,a=ue,c=Me,_=Fe,h=Ze,k=Ve,v=qe,y=Be,x=ot,N=lt,P=ft,q=le,U=ze,D=K;let E=document.getElementById("header-loading"),A=js(E),$=Yo(t),M=fi(),B=A.wrapSend((f,m)=>M.send(f,m)),j=qs(B),V=Bs(),ve=zs(),Pe=Us(),ye=xs(),ae=Ss();M.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Pe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),M.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{ye.set(m.policy)}catch{}}),M.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{ae.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[])}catch{}}),M.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{ae.append(m.attempt_id,m.event)}catch{}}),M.on("snapshot",f=>{let m=f,H=m&&typeof m.id=="string"?m.id:"",G=H?V.getStore(H):null;if(G&&m&&m.type==="snapshot")try{G.applyPush(m)}catch{}}),M.on("upsert",f=>{let m=f,H=m&&typeof m.id=="string"?m.id:"",G=H?V.getStore(H):null;if(G&&m&&m.type==="upsert")try{G.applyPush(m)}catch{}}),M.on("delete",f=>{let m=f,H=m&&typeof m.id=="string"?m.id:"",G=H?V.getStore(H):null;if(G&&m&&m.type==="delete")try{G.applyPush(m)}catch{}});let oe=null,xe=null,st=null,ct=null,be=()=>{},Ge=new Promise(f=>{be=()=>f(void 0)}),we=!1,at=!1;async function dt(f){let m=ue(f);if(m===xe||m===st)return;st=m;let H=`detail:${f}`,G={type:"issue-detail",params:{id:f}};try{V.register(H,G)}catch(te){e("register detail store failed: %o",te)}try{let te=await j.subscribeList(H,G);if(F.getState().selected_id!==f||ue(f)!==m){await te().catch(()=>{});return}oe&&await oe().catch(()=>{}),oe=te,xe=m}catch(te){e("detail subscribe failed: %o",te),g(te,"issue details")}finally{st===m&&(st=null)}}let je=new Map,Se=new Set,Ye=St;try{let f=window.localStorage.getItem(bi);Gt(f)&&(Ye=f)}catch{}async function Xe(f){if(!Gt(f)||f===Ye)return;Ye=f;try{window.localStorage.setItem(bi,f)}catch{}let m=je.get(Ct);if(!m)return;je.delete(Ct),await m().catch(()=>{});let H=Ze();try{V.register(Ct,H)}catch(G){e("register %s store failed: %o",Ct,G)}try{let G=await j.subscribeList(Ct,H);je.set(Ct,G)}catch(G){e("re-subscribe %s failed: %o",Ct,G),g(G,"board")}}let Qe=new Map,Ce=null,Ue=null,$e=null;async function He(){$e=null,ye.clear(),Ce=null;let f=F.getState().workspace.current?.path;if(f)try{await M.send("set-workspace",{path:f})}catch(m){e("workspace restore after reconnect failed: %o",m);return}le(),Be(F.getState().view==="worker")}async function C(){e("clearing all subscriptions for workspace switch"),qe(),ot(),ve.clear(),ft(),lt(),ze(),le(),Me();let f=F.getState();if(f.selected_id)try{V.unregister(`detail:${f.selected_id}`)}catch{}let m=F.getState();Ve(m.view==="board"),Be(m.view==="worker"),m.selected_id&&Fe(m.selected_id)}async function O(f){e("requesting workspace switch to %s",f),at=!0;try{let m=await M.send("set-workspace",{path:f});e("workspace switch result: %o",m),m&&m.workspace&&(F.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await C(),J("Switched to "+K(f),"success",2e3)))}catch(m){throw e("workspace switch failed: %o",m),J("Failed to switch workspace","error",3e3),m}finally{at=!1}}async function ee(f){e("requesting workspace git pull for %s",f);try{let m=await M.send("git-pull-workspace",{});e("workspace git pull result: %o",m);let H=m?.status;if(H==="up_to_date"){J("Already up to date","success",2e3);return}if(H==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+K(f),"success",2e3)}catch(m){e("workspace git pull failed: %o",m);let H=m?.code,G=m?.message;if(H==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(H==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(H==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let te=G?`: ${G}`:"";throw J(`Git pull failed${te}`,"error",3e3),m}}async function Q(f,m){e("setting workspace visibility %s \u2192 %s",f,String(m));try{await M.send("set-workspace-visibility",{path:f,visible:m}),await ne()}catch(H){e("workspace visibility update failed: %o",H),J("Failed to update project visibility","error",3e3)}}async function ne(){try{let f=await M.send("list-workspaces",{});if(e("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(ge=>({path:ge.path,database:ge.database,pid:ge.pid,version:ge.version})),H=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,G=Array.isArray(f.hidden)?f.hidden.filter(ge=>typeof ge=="string"):[];F.setState({workspace:{current:H,available:m,hidden:G}});let te=window.localStorage.getItem("beads-ui.workspace");te&&(!m.some(kt=>kt.path===te)||G.includes(te)?window.localStorage.removeItem("beads-ui.workspace"):H&&te!==H.path&&(e("restoring saved workspace preference: %s",te),await O(te)))}}catch(f){e("failed to load workspaces: %o",f)}}M.on("workspace-changed",f=>{e("workspace-changed event: %o",f),f&&f.root_dir&&(F.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ne(),C())});let ce=!1;if(typeof M.onConnection=="function"){let f=m=>{e("ws state %s",m),m==="reconnecting"||m==="closed"?(ce=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&ce&&(ce=!1,J("Reconnected","success",2200),xc(F,(H,G)=>{e(`${H}: %o`,G)}),He())};M.onConnection(f)}let fe="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker")&&(fe=f)}catch(f){e("view parse error: %o",f)}let F=Gs({config:$c(),view:fe});M.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let H=F.getState().workspace.current?.path;if(typeof H=="string"&&H.length>0&&m.root_dir!==H){e("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{ve.set(m.queue)}catch{}});let w=Hs(F);w.start();let I=async(f,m)=>{try{return await B(f,m)}catch{return[]}};n&&Vo(n,F,w);let S=document.getElementById("workspace-picker");S&&di(S,F,O,ee,Q);let Z=Qo(t,(f,m)=>B(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Z.open())}catch{}let u=jo(t,{policyStore:ye,transport:(f,m)=>B(f,m),labelOptions:()=>{let f=new Set;for(let[m]of ss)for(let H of V.snapshotFor(m)||[]){let G=H.labels;if(Array.isArray(G))for(let te of G)typeof te=="string"&&te.length>0&&f.add(te)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>u.open())}catch{}let b=Js(s,{gotoIssue:f=>w.gotoIssue(f),issueStores:V,transport:I,uiOrderStore:Pe,displayPolicyStore:ye,closedRange:Ye,onClosedRangeChange:f=>{Xe(f)},onNewIssue:()=>Z.open()}),R=ts(o,{transport:I,issueStores:V,queueStore:ve,sessionLogStore:ae,uiOrderStore:Pe,gotoIssue:f=>F.setState({selected_id:f}),getWorkspacePath:()=>F.getState().workspace.current?.path}),X=Wo(i,{issueStores:V,transport:I,queueStore:ve,sessionLogStore:ae,getWorkspacePath:()=>F.getState().workspace.current?.path,onNavigate:f=>{F.getState().view==="worker"?F.setState({selected_id:f}):w.gotoIssue(f)},onClose:()=>{let f=F.getState();F.setState({selected_id:null});try{w.gotoView(f.view==="worker"?"worker":"board")}catch{}}}),he=F.getState().selected_id;he&&(i.hidden=!1,X.load(he),Fe(he)),F.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,X.load(m),at||Fe(m)):(X.clear(),i.hidden=!0,Me())});let Te=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",Ve(f.view==="board"),Be(f.view==="worker"),!f.selected_id&&f.view==="board"&&b.load(),f.view==="worker"&&R.load(),window.localStorage.setItem("beads-ui.view",f.view)};F.subscribe(Te),Te(F.getState()),lt(),le(),ne().finally(()=>{we=!0,be()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,H=String(f.key||"").toLowerCase(),G=f.target,te=G&&G.tagName?String(G.tagName).toLowerCase():"",ge=te==="input"||te==="textarea"||te==="select"||G&&typeof G.isContentEditable=="boolean"&&G.isContentEditable;m&&H==="n"&&(ge||(f.preventDefault(),Z.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Sc(e)});export{Sc as bootstrap,$c as readBootstrapConfig,xc as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
