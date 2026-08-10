var Gi=Object.create;var Pn=Object.defineProperty;var Yi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var Ki=Object.getPrototypeOf,Zi=Object.prototype.hasOwnProperty;var Xi=(e,t,r)=>t in e?Pn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Nn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Qi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Vi(t))!Zi.call(e,s)&&s!==r&&Pn(e,s,{get:()=>t[s],enumerable:!(n=Yi(t,s))||n.enumerable});return e};var Ji=(e,t,r)=>(r=e!=null?Gi(Ki(e)):{},Qi(t||!e||!e.__esModule?Pn(r,"default",{value:e,enumerable:!0}):r,e));var ze=(e,t,r)=>Xi(e,typeof t!="symbol"?t+"":t,r);var _o=Nn((Qu,fo)=>{var fr=1e3,_r=fr*60,mr=_r*60,rr=mr*24,sl=rr*7,ol=rr*365.25;fo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return al(e);if(r==="number"&&isFinite(e))return t.long?ll(e):il(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function al(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*ol;case"weeks":case"week":case"w":return r*sl;case"days":case"day":case"d":return r*rr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*_r;case"seconds":case"second":case"secs":case"sec":case"s":return r*fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function il(e){var t=Math.abs(e);return t>=rr?Math.round(e/rr)+"d":t>=mr?Math.round(e/mr)+"h":t>=_r?Math.round(e/_r)+"m":t>=fr?Math.round(e/fr)+"s":e+"ms"}function ll(e){var t=Math.abs(e);return t>=rr?en(e,t,rr,"day"):t>=mr?en(e,t,mr,"hour"):t>=_r?en(e,t,_r,"minute"):t>=fr?en(e,t,fr,"second"):e+" ms"}function en(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var go=Nn((Ju,mo)=>{function cl(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=c,r.humanize=_o(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let h=0;for(let w=0;w<_.length;w++)h=(h<<5)-h+_.charCodeAt(w),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=t;function r(_){let h,w=null,E,x;function y(...R){if(!y.enabled)return;let W=y,j=Number(new Date),Q=j-(h||j);W.diff=Q,W.prev=h,W.curr=j,h=j,R[0]=r.coerce(R[0]),typeof R[0]!="string"&&R.unshift("%O");let U=0;R[0]=R[0].replace(/%([a-zA-Z%])/g,(C,O)=>{if(C==="%%")return"%";U++;let H=r.formatters[O];if(typeof H=="function"){let ne=R[U];C=H.call(W,ne),R.splice(U,1),U--}return C}),r.formatArgs.call(W,R),(W.log||r.log).apply(W,R)}return y.namespace=_,y.useColors=r.useColors(),y.color=r.selectColor(_),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:(E!==r.namespaces&&(E=r.namespaces,x=r.enabled(_)),x),set:R=>{w=R}}),typeof r.init=="function"&&r.init(y),y}function n(_,h){let w=r(this.namespace+(typeof h>"u"?":":h)+_);return w.log=this.log,w}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let h=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of h)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(_,h){let w=0,E=0,x=-1,y=0;for(;w<_.length;)if(E<h.length&&(h[E]===_[w]||h[E]==="*"))h[E]==="*"?(x=E,y=w,E++):(w++,E++);else if(x!==-1)E=x+1,y++,w=y;else return!1;for(;E<h.length&&h[E]==="*";)E++;return E===h.length}function a(){let _=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),_}function c(_){for(let h of r.skips)if(o(_,h))return!1;for(let h of r.names)if(o(_,h))return!0;return!1}function i(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}mo.exports=cl});var ho=Nn((vt,tn)=>{vt.formatArgs=ul;vt.save=pl;vt.load=fl;vt.useColors=dl;vt.storage=_l();vt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function dl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function ul(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+tn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}vt.log=console.debug||console.log||(()=>{});function pl(e){try{e?vt.storage.setItem("debug",e):vt.storage.removeItem("debug")}catch{}}function fl(){let e;try{e=vt.storage.getItem("debug")||vt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function _l(){try{return localStorage}catch{}}tn.exports=go()(vt);var{formatters:ml}=tn.exports;ml.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Sr=globalThis,Jr=Sr.trustedTypes,Qs=Jr?Jr.createPolicy("lit-html",{createHTML:e=>e}):void 0,so="$lit$",Gt=`lit$${Math.random().toFixed(9).slice(2)}$`,oo="?"+Gt,el=`<${oo}>`,er=document,Ar=()=>er.createComment(""),Tr=e=>e===null||typeof e!="object"&&typeof e!="function",Wn=Array.isArray,tl=e=>Wn(e)||typeof e?.[Symbol.iterator]=="function",Fn=`[ 	
\f\r]`,xr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Js=/-->/g,eo=/>/g,Qt=RegExp(`>|${Fn}(?:([^\\s"'>=/]+)(${Fn}*=${Fn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),to=/'/g,ro=/"/g,ao=/^(?:script|style|textarea|title)$/i,jn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=jn(1),Nt=jn(2),ju=jn(3),tr=Symbol.for("lit-noChange"),et=Symbol.for("lit-nothing"),no=new WeakMap,Jt=er.createTreeWalker(er,129);function io(e,t){if(!Wn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qs!==void 0?Qs.createHTML(t):t}var rl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=xr;for(let c=0;c<r;c++){let i=e[c],d,_,h=-1,w=0;for(;w<i.length&&(a.lastIndex=w,_=a.exec(i),_!==null);)w=a.lastIndex,a===xr?_[1]==="!--"?a=Js:_[1]!==void 0?a=eo:_[2]!==void 0?(ao.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=Qt):_[3]!==void 0&&(a=Qt):a===Qt?_[0]===">"?(a=s??xr,h=-1):_[1]===void 0?h=-2:(h=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?Qt:_[3]==='"'?ro:to):a===ro||a===to?a=Qt:a===Js||a===eo?a=xr:(a=Qt,s=void 0);let E=a===Qt&&e[c+1].startsWith("/>")?" ":"";o+=a===xr?i+el:h>=0?(n.push(d),i.slice(0,h)+so+i.slice(h)+Gt+E):i+Gt+(h===-2?c:E)}return[io(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Er=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,_]=rl(t,r);if(this.el=e.createElement(d,n),Jt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=Jt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let h of s.getAttributeNames())if(h.endsWith(so)){let w=_[a++],E=s.getAttribute(h).split(Gt),x=/([.?@])?(.*)/.exec(w);i.push({type:1,index:o,name:x[2],strings:E,ctor:x[1]==="."?Bn:x[1]==="?"?Un:x[1]==="@"?zn:ur}),s.removeAttribute(h)}else h.startsWith(Gt)&&(i.push({type:6,index:o}),s.removeAttribute(h));if(ao.test(s.tagName)){let h=s.textContent.split(Gt),w=h.length-1;if(w>0){s.textContent=Jr?Jr.emptyScript:"";for(let E=0;E<w;E++)s.append(h[E],Ar()),Jt.nextNode(),i.push({type:2,index:++o});s.append(h[w],Ar())}}}else if(s.nodeType===8)if(s.data===oo)i.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(Gt,h+1))!==-1;)i.push({type:7,index:o}),h+=Gt.length-1}o++}}static createElement(t,r){let n=er.createElement("template");return n.innerHTML=t,n}};function dr(e,t,r=e,n){if(t===tr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Tr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=dr(e,s._$AS(e,t.values),s,n)),t}var qn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??er).importNode(r,!0);Jt.currentNode=s;let o=Jt.nextNode(),a=0,c=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Cr(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Hn(o,this,t)),this._$AV.push(d),i=n[++c]}a!==i?.index&&(o=Jt.nextNode(),a++)}return Jt.currentNode=er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Cr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=et,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=dr(this,t,r),Tr(t)?t===et||t==null||t===""?(this._$AH!==et&&this._$AR(),this._$AH=et):t!==this._$AH&&t!==tr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):tl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==et&&Tr(this._$AH)?this._$AA.nextSibling.data=t:this.T(er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Er.createElement(io(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new qn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=no.get(t.strings);return r===void 0&&no.set(t.strings,r=new Er(t)),r}k(t){Wn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Ar()),this.O(Ar()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=et,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=et}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=dr(this,t,r,0),a=!Tr(t)||t!==this._$AH&&t!==tr,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=dr(this,c[n+i],r,i),d===tr&&(d=this._$AH[i]),a||(a=!Tr(d)||d!==this._$AH[i]),d===et?t=et:t!==et&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===et?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Bn=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===et?void 0:t}},Un=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==et)}},zn=class extends ur{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=dr(this,t,r,0)??et)===tr)return;let n=this._$AH,s=t===et&&n!==et||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==et&&(n===et||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Hn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){dr(this,t)}};var nl=Sr.litHtmlPolyfillSupport;nl?.(Er,Cr),(Sr.litHtmlVersions??(Sr.litHtmlVersions=[])).push("3.3.1");var Te=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Cr(t.insertBefore(Ar(),o),o,void 0,r??{})}return s._$AI(e),s};var $t="today",Lt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ft(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function lo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function co(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function uo(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function po(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var bo=Ji(ho(),1);function Ke(e){return(0,bo.default)(`beads-ui:${e}`)}function At(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function nr(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function wo(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ko(e,t){let r=At(e.updated_at),n=At(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function $o(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=At(e.created_at),o=At(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function xo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var gl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function vo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function yo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=gl.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function So(e,t){let r=vo(e),n=vo(t);if(r!==n)return r<n?-1:1;let s=yo(e),o=yo(t);if(s!==o)return s<o?-1:1;let a=At(e&&e.created_at),c=At(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Gn=2**20;function gr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-At(e&&e.created_at)}function rn(e){return(t,r)=>{let n=gr(t,e),s=gr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Yn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:gr(c,r)-Gn};if(!c)return{rank:gr(a,r)+Gn};let i=gr(a,r),d=gr(c,r),_=(i+d)/2;return i<_&&_<d?{rank:_}:{renormalize:n.map((h,w)=>({bead_id:h.id,rank:w*Gn}))}}function Vn(e,t={}){let r=Ke(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||nr;function d(){for(let w of Array.from(a))try{w()}catch{}}function _(){s=Array.from(n.values()).sort(i)}function h(w){if(c||!w||w.id!==e)return;let E=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,E),!(E<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if(E<=o)return;n.clear();let x=Array.isArray(w.issues)?w.issues:[];for(let y of x)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);_(),o=E,d();return}if(w.type==="upsert"){let x=w.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let y=n.get(x.id);if(!y)n.set(x.id,x);else{let R=Number.isFinite(y.updated_at)?y.updated_at:0,W=Number.isFinite(x.updated_at)?x.updated_at:0;if(R<=W){for(let j of Object.keys(y))j in x||delete y[j];for(let[j,Q]of Object.entries(x))y[j]=Q}}_()}o=E,d()}else if(w.type==="delete"){let x=String(w.issue_id||"");x&&(n.delete(x),_()),o=E,d()}}}return{id:e,subscribe(w){return a.add(w),()=>{a.delete(w)}},applyPush:h,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function nn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Ao(e){let t=Ke("subs"),r=new Map,n=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(i.added)?i.added:[],h=Array.isArray(i.updated)?i.updated:[],w=Array.isArray(i.removed)?i.removed:[];for(let E of Array.from(d)){let x=r.get(E);if(!x)continue;let y=x.itemsById;for(let R of _)typeof R=="string"&&R.length>0&&y.set(R,!0);for(let R of h)typeof R=="string"&&R.length>0&&y.set(R,!0);for(let R of w)typeof R=="string"&&R.length>0&&y.delete(R)}}async function o(c,i){let d=nn(i);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let h=r.get(c);if(h&&h.key!==d){let w=n.get(h.key);w&&(w.delete(c),w.size===0&&n.delete(h.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(h){let w=r.get(c)||null;if(w){let E=n.get(w.key);E&&(E.delete(c),E.size===0&&n.delete(w.key))}throw r.delete(c),h}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let h=r.get(c)||null;if(h){let w=n.get(h.key);w&&(w.delete(c),w.size===0&&n.delete(h.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:nn,selectors:{getIds(c){let i=r.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=r.get(c);return d?d.itemsById.has(i):!1},count(c){let i=r.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=r.get(c),d={};if(!i)return d;for(let _ of i.itemsById.keys())d[_]=!0;return d}}}}function To(){let e=Ke("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,_){let h=d?nn(d):"",w=r.get(i)||"",E=t.has(i);if(e("register %s key=%s (prev=%s)",i,h,w),E&&w&&h&&w!==h){let x=t.get(i);if(x)try{x.dispose()}catch{}let y=s.get(i);if(y){try{y()}catch{}s.delete(i)}let R=Vn(i,_);t.set(i,R);let W=R.subscribe(()=>o());s.set(i,W)}else if(!E){let x=Vn(i,_);t.set(i,x);let y=x.subscribe(()=>o());s.set(i,y)}return r.set(i,h),()=>c(i)}function c(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let _=s.get(i);if(_){try{_()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function Eo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Co(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Kn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function hl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function bl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Ro(e){let t=Ke("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):hl(n),a=bl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Kn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Kn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var vl=Object.freeze({workspace_config:{default_workspace:null}});function Io(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:vl.workspace_config.default_workspace}}}function Lo(e={}){let t=Ke("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Io(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Io(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Do(e){let t=Ke("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(h,w)=>{let E=s++,x=Date.now();n.set(E,{type:h,start_ts:x}),t("request start id=%d type=%s count=%d",E,h,r+1),a();let y=!1,R=()=>{y||(y=!0,n.delete(E),c())},W=setTimeout(()=>{y||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,h,Date.now()-x),R())},3e4);try{let j=await d(h,w),Q=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",E,h,Q),j}catch(j){let Q=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,h,Q,j),j}finally{clearTimeout(W),R()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,h])=>({id:_,type:h.type,elapsed_ms:d-h.start_ts}))}}}function X(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function sn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(xo),i;switch(c){case"created_desc":return i.sort(nr),i;case"created_asc":return i.sort(wo),i;case"updated_desc":return i.sort(ko),i;case"priority":return i.sort($o),i;case"manual":default:{let d=r();return d?i.sort(rn(d)):i.sort(nr),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ut(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function wt(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function on(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function an(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Yn(c,i,d.order),a);s(d,_);let h=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(h&&h.conflict){let w={revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}};r.set(w);let E=n(Yn(c,i,w.order),a);s(w,E);let x=await t("ui-order-set",{expected_revision:w.revision,entries:E});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else h&&h.applied&&r.set({revision:typeof h.revision=="number"?h.revision:0,order:h.order||{}})}return{applyReorder:o}}function ln(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Zn(e,t){return!t||typeof e!="string"||e.length===0||ln(t.visible_labels).includes(e)?!0:ln(t.hidden_labels).includes(e)?!1:!ln(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function cn(e,t){return ln(e).filter(r=>Zn(r,t))}function sr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var yl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Oo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},wl={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},kl={review:"\u2713",skip:"\u2298"},Yt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function $l(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Mo(e){let t=e&&e.fill||"none";return t==="none"?Yt.none:e&&e.stale===!0?Yt.stale:t==="dim"?Yt.dim:e&&e.glyph==="review"?Yt.review:e&&e.glyph==="skip"?Yt.skip:Yt.done}function xl(e){if(!e||!e.approval_state)return Mo(e);let t=[];return e.glyph==="review"?t.push(Yt.review):e.glyph==="skip"&&t.push(Yt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Sl(e,t,r){let n=yl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=kl[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Oo[e]||e}
      </div>
    </div>
  `}function dn(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=wl[r],s=e.stages,o=$l(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(c=>`${Oo[c]||c} ${c==="plan"?xl(s[c]||{}):Mo(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(c=>Sl(c,s[c]||{},c===o))}
    </div>
  `}function Al(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Po=2;function Tl(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Po).join(", "),s=r.length-Po,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function El(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&sr(r,"route")){let o=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
        >${o?`${n.route} ?`:n.route}</span
      >`)}if(n.fast_track&&sr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&sr(r,"pr")){let o=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of cn(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&sr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),sr(r,"blocked")&&s.push(...Tl(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function Cl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Rl(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ut(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Il(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(So):r.children;return l`
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
        ${Rl(e)}
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
                  <span class=${Cl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function un(e,t){let r=Al(e.priority);return l`
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
      ${El(e,t)}
      ${e.workflow&&sr(t.policy||null,"stepper")?dn(e.workflow,e.status):""}
      ${Il(e,t)}
    </article>
  `}function hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
        ${e.items.map(o=>un(o,t))}
      </div>
    </section>
  `}function No(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>un(n,t))}
        </div>
      </div>
    </dialog>
  `}var Ll=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Dl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ol=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ml(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Fo(e,t,r){return l`
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
        ${Ll.map(n=>l`<option
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
        ${Dl.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ml(e,t,r)}
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
        ${Ol.map(n=>l`<option
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
  `}var Pl=200,Nl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Fl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),qo="beads-ui.board.sort",Bo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function ql(){try{let e=window.localStorage.getItem(qo);if(e&&Bo.has(e))return e}catch{}return"created_desc"}function Uo(e,t){let r=Ke("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,_=t.closedRange||$t,h=s?sn(s,a):null,w=an({transport:o,uiOrderStore:a}),E=[],x=[],y=[],R=[],W=[],j=[],Q=!1,U=0,I=ql(),C=new Map,O=new Map,H=new Map,ne=new Set,de={search:"",priority:"",type:"",labels:[]},oe=!1,me=null;function xe(M){return String(M.status||"open")==="open"}function Ve(M){let q=String(M.status||"open");return q==="open"||q==="blocked"}function We(M){let q=de.search.trim().toLowerCase(),ee=de.priority,se=de.type,ce=de.labels;return M.filter(be=>{if(q){let Ee=String(be.id||"").toLowerCase(),Oe=String(be.title||"").toLowerCase();if(!Ee.includes(q)&&!Oe.includes(q))return!1}if(ee!==""&&String(be.priority)!==ee||se!==""&&String(be.issue_type||"")!==se)return!1;if(ce.length>0){let Ee=Array.isArray(be.labels)?be.labels:[];if(!ce.some(Oe=>Ee.includes(Oe)))return!1}return!0})}function Ae(){let M=new Set;for(let q of[E,x,y,R,W,j])for(let ee of q){let se=Array.isArray(ee.labels)?ee.labels:[];for(let ce of se)typeof ce=="string"&&ce.length>0&&M.add(ce)}return Array.from(M).sort()}function ae(){return de.search.trim()!==""||de.priority!==""||de.type!==""||de.labels.length>0}function L(){try{if(h){let M=h.selectBoardColumn("tab:board:in-progress","in_progress",I),q=h.selectBoardColumn("tab:board:blocked","blocked",I).filter(Ve),ee=new Set(M.map(b=>b.id)),se=h.selectBoardColumn("tab:board:ready","ready",I).filter(b=>xe(b)&&!ee.has(b.id)),ce=h.selectBoardColumn("tab:board:resolved","resolved",I),be=h.selectBoardColumn("tab:board:deferred","deferred",I),Ee=h.selectBoardColumn("tab:board:closed","closed").slice(0,Pl),Oe=[...q,...se,...M,...ce,...Ee];Y(Oe);let Ce=new Set;for(let b of Oe)b&&b.id&&!Xn(b)&&Ce.add(b.id);let u=!ae();E=u?Ir(q,Ce):q,x=u?Ir(se,Ce):se,y=u?Ir(M,Ce):M,R=u?Ir(ce,Ce):ce,W=be,U=be.length,j=u?Ir(Ee,Ce):Ee,C=new Map;for(let b of E)C.set(b.id,"open");for(let b of x)C.set(b.id,"open");for(let b of y)C.set(b.id,"in_progress");for(let b of R)C.set(b.id,"resolved");for(let b of W)C.set(b.id,"deferred");for(let b of j)C.set(b.id,"closed");O=new Map;for(let b of E)O.set(b.id,"blocked-col");for(let b of x)O.set(b.id,"ready-col");for(let b of y)O.set(b.id,"in-progress-col");for(let b of R)O.set(b.id,"resolved-col");for(let b of j)O.set(b.id,"closed-col")}Ye()}catch{E=[],x=[],y=[],R=[],W=[],j=[],H=new Map,Ye()}}function Y(M){let q=new Map;for(let se of M)se&&se.id&&!q.has(se.id)&&q.set(se.id,se);let ee=new Map;for(let se of q.values()){let ce=Xn(se);if(!ce)continue;let be=ee.get(ce);be||(be=[],ee.set(ce,be)),be.push({id:se.id,title:se.title,status:se.status,metadata:se.metadata,created_at:se.created_at,updated_at:se.updated_at})}H=ee}function ye(M){let q=H.get(M)||[],ee=0;for(let ce of q)(ce.status==="resolved"||ce.status==="closed")&&(ee+=1);let se=on(q);return{total:q.length,count:ee,current:se,children:q}}function K(M){return!ne.has(M)}function we(M,q){M.preventDefault(),M.stopPropagation(),ne.has(q)?ne.delete(q):ne.add(q),Ye()}function pe(M,q){M.preventDefault(),M.stopPropagation(),n(q)}function Pe(M,q){M.preventDefault(),M.stopPropagation(),n(q)}function te(M,q){me||n(q)}function _e(M,q){M.preventDefault(),M.stopPropagation(),Bl(q).then(ee=>{ee&&X("\uBCF5\uC0AC\uB428","success",1200)})}function N(M,q){me=q,M.dataTransfer&&(M.dataTransfer.setData("text/plain",q),M.dataTransfer.effectAllowed="move"),M.target.classList.add("board-card--dragging")}function P(M){M.target.classList.remove("board-card--dragging"),ft(),setTimeout(()=>{me=null},0)}function re(M){let q=String(M.target.value||"");!q||q===_||(_=q,i&&i(q),Ye())}function Se(){return c?c.get():null}let ke={onCardClick:te,onCopyId:_e,onDragStart:N,onDragEnd:P,onClosedRangeChange:re,rollupFor:ye,isExpanded:K,onRollupToggle:we,onChildClick:pe,onFromChipClick:Pe,get policy(){return Se()}};function g(M,q){me||(Ge(),n(q))}function T(M,q){M.preventDefault(),M.stopPropagation(),Ge(),n(q)}let A={...ke,onCardClick:g,onChildClick:T,onFromChipClick:T,get policy(){return Se()}};function z(M){let q=M.target,ee=e.querySelector(".board-filter__labels");q&&ee&&ee.contains(q)||ue()}function V(M){M.key==="Escape"&&ue()}function ie(){oe||(oe=!0,document.addEventListener("mousedown",z),document.addEventListener("keydown",V),Ye())}function ue(){oe&&(oe=!1,document.removeEventListener("mousedown",z),document.removeEventListener("keydown",V),Ye())}function Ne(M){M.key==="Escape"&&Ge()}function De(){Q||(Q=!0,document.addEventListener("keydown",Ne),Ye())}function Ge(){Q&&(Q=!1,document.removeEventListener("keydown",Ne),Ye())}let tt={onClose:Ge,onOverlayClick(M){M.target===M.currentTarget&&Ge()}},st={onSearchInput(M){de.search=String(M.target.value||""),L()},onPriorityChange(M){de.priority=String(M.target.value||""),L()},onTypeChange(M){de.type=String(M.target.value||""),L()},onSortChange(M){let q=String(M.target.value||"");if(!(!Bo.has(q)||q===I)){I=q;try{window.localStorage.setItem(qo,q)}catch{}L()}},onDeferredToggle(){Q?Ge():De()},onLabelMenuToggle(){oe?ue():ie()},onLabelToggle(M){let q=de.labels.indexOf(M);q===-1?de.labels.push(M):de.labels.splice(q,1),L()},onLabelClear(){de.labels.length!==0&&(de.labels=[],L())},onNewIssue(){d&&d()}};function ot(){return l`
      <div class="board-view">
        ${Fo(de,st,{sort_mode:I,deferred_popup_open:Q,deferred_count:U,label_options:Ae(),label_menu_open:oe})}
        <div class="board-root">
          ${hr({title:"Blocked",id:"blocked-col",items:We(E)},ke)}
          ${hr({title:"Ready",id:"ready-col",items:We(x)},ke)}
          ${hr({title:"In progress",id:"in-progress-col",items:We(y)},ke)}
          ${hr({title:"Resolved",id:"resolved-col",items:We(R)},ke)}
          ${hr({title:"Closed",id:"closed-col",items:We(j),is_closed:!0,closed_range:_},ke)}
        </div>
        ${Q?No({items:We(W),count:U},A,tt):""}
      </div>
    `}function Ye(){Te(ot(),e),dt()}function dt(){try{let M=e.querySelector("#deferred-popup");M&&!M.open&&(typeof M.showModal=="function"?M.showModal():M.setAttribute("open",""));let q=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ee of q)Array.from(ee.querySelectorAll(".board-card")).forEach((ce,be)=>{ce.tabIndex=be===0?0:-1})}catch{}}async function Xe(M,q){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:M,status:q}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ee){r("update-status failed: %o",ee),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Fe(M){switch(M){case"blocked-col":return E;case"ready-col":return x;case"in-progress-col":return y;case"resolved-col":return R;default:return[]}}function pt(M,q,ee){if(!o||!a)return;let se=Fe(M),ce=se.find(u=>u.id===q);if(!ce)return;let be=se.filter(u=>u.id!==q),Ee=ee.closest?ee.closest(".board-card"):null,Oe=be.length;if(Ee){let u=Ee.getAttribute("data-issue-id");if(u===q)return;let b=be.findIndex(D=>D.id===u);b>=0&&(Oe=b)}let Ce=be.slice();Ce.splice(Oe,0,ce),w.applyReorder(q,Ce,Oe)}function ft(){for(let M of Array.from(e.querySelectorAll(".board-column--drag-over")))M.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",M=>{M.preventDefault(),M.dataTransfer&&(M.dataTransfer.dropEffect="move");let ee=M.target.closest(".board-column");ee&&ee!==He&&(He&&He.classList.remove("board-column--drag-over"),ee.classList.add("board-column--drag-over"),He=ee)}),e.addEventListener("dragleave",M=>{let q=M.relatedTarget;(!q||!e.contains(q))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",M=>{M.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let q=M.target,ee=q.closest(".board-column");if(!ee)return;let se=M.dataTransfer?.getData("text/plain")||"";if(!se)return;let ce=ee.id,be=O.get(se);if(be&&be===ce){if(Fl.has(ce)){if(I!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(ce,se,q)}return}let Ee=Nl[ce];if(!Ee){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}C.get(se)!==Ee&&Xe(se,Ee)}),e.addEventListener("keydown",M=>{let q=M.target;if(!(q instanceof HTMLElement))return;let ee=String(q.tagName||"").toLowerCase();if(ee==="input"||ee==="textarea"||ee==="select"||ee==="button"||ee==="a"||q.isContentEditable===!0)return;let se=q.closest(".board-card");if(!se)return;let ce=String(M.key||"");if(ce==="Enter"||ce===" "){M.preventDefault();let Ce=se.getAttribute("data-issue-id");Ce&&n(Ce);return}if(ce!=="ArrowUp"&&ce!=="ArrowDown"&&ce!=="ArrowLeft"&&ce!=="ArrowRight")return;M.preventDefault();let be=se.closest(".board-column");if(!be)return;let Ee=Array.from(be.querySelectorAll(".board-card")),Oe=Ee.indexOf(se);if(ce==="ArrowDown"&&Oe<Ee.length-1){at(se,Ee[Oe+1]);return}if(ce==="ArrowUp"&&Oe>0){at(se,Ee[Oe-1]);return}if(ce==="ArrowLeft"||ce==="ArrowRight"){let Ce=Array.from(e.querySelectorAll(".board-column")),u=Ce.indexOf(be),b=ce==="ArrowRight"?1:-1,D=u+b;for(;D>=0&&D<Ce.length;){let J=Ce[D].querySelector(".board-card");if(J){at(se,J);return}D+=b}}});function at(M,q){try{M.tabIndex=-1,q.tabIndex=0,q.focus()}catch{}}let it=null;h&&h.subscribe&&(it=h.subscribe(()=>{try{L()}catch{}}));let rt=null;return c&&c.subscribe&&(rt=c.subscribe(()=>{try{L()}catch{}})),{async load(){r("load"),L()},clear(){ue(),Ge(),it&&(it(),it=null),rt&&(rt(),rt=null),e.replaceChildren(),E=[],x=[],y=[],R=[],W=[],j=[],C=new Map,O=new Map}}}function Xn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ir(e,t){return e.filter(r=>{let n=Xn(r);return!(n&&t.has(n))})}async function Bl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function or(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Ul="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ar(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function zo(e){let t=0;for(let r of qt)t+=ar(e?.[r]);return t}function Ho(e){return!e||typeof e!="object"?!1:qt.some(t=>Number.isFinite(e[t]))}function zl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function br(e){return Ho(e)?`\u03C4 ${zl(zo(e))}`:null}function Tt(e){let t=br(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ar(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ar(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ar(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ar(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${zo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ul),r.join(`
`)}function Dt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Ho(i)){n+=1;for(let d of qt)r[d]=ar(r[d])+ar(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:Qo,setPrototypeOf:Wo,isFrozen:Hl,getPrototypeOf:Wl,getOwnPropertyDescriptor:jl}=Object,{freeze:gt,seal:xt,create:ss}=Object,{apply:os,construct:as}=typeof Reflect<"u"&&Reflect;gt||(gt=function(t){return t});xt||(xt=function(t){return t});os||(os=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});as||(as=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var pn=ht(Array.prototype.forEach),Gl=ht(Array.prototype.lastIndexOf),jo=ht(Array.prototype.pop),Lr=ht(Array.prototype.push),Yl=ht(Array.prototype.splice),_n=ht(String.prototype.toLowerCase),Qn=ht(String.prototype.toString),Jn=ht(String.prototype.match),Dr=ht(String.prototype.replace),Vl=ht(String.prototype.indexOf),Kl=ht(String.prototype.trim),Et=ht(Object.prototype.hasOwnProperty),mt=ht(RegExp.prototype.test),Or=Zl(TypeError);function ht(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return os(e,t,n)}}function Zl(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return as(e,r)}}function $e(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_n;Wo&&Wo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Hl(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Xl(e){for(let t=0;t<e.length;t++)Et(e,t)||(e[t]=null);return e}function Bt(e){let t=ss(null);for(let[r,n]of Qo(e))Et(e,r)&&(Array.isArray(n)?t[r]=Xl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Bt(n):t[r]=n);return t}function Mr(e,t){for(;e!==null;){let n=jl(e,t);if(n){if(n.get)return ht(n.get);if(typeof n.value=="function")return ht(n.value)}e=Wl(e)}function r(){return null}return r}var Go=gt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),es=gt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ts=gt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ql=gt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),rs=gt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Jl=gt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Yo=gt(["#text"]),Vo=gt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ns=gt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ko=gt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fn=gt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ec=xt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),tc=xt(/<%[\w\W]*|[\w\W]*%>/gm),rc=xt(/\$\{[\w\W]*/gm),nc=xt(/^data-[\-\w.\u00B7-\uFFFF]+$/),sc=xt(/^aria-[\-\w]+$/),Jo=xt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),oc=xt(/^(?:\w+script|data):/i),ac=xt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ea=xt(/^html$/i),ic=xt(/^[a-z][.\w]*(-[.\w]+)+$/i),Zo=Object.freeze({__proto__:null,ARIA_ATTR:sc,ATTR_WHITESPACE:ac,CUSTOM_ELEMENT:ic,DATA_ATTR:nc,DOCTYPE_NAME:ea,ERB_EXPR:tc,IS_ALLOWED_URI:Jo,IS_SCRIPT_OR_DATA:oc,MUSTACHE_EXPR:ec,TMPLIT_EXPR:rc}),Pr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},lc=function(){return typeof window>"u"?null:window},cc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Xo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function ta(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:lc(),t=Z=>ta(Z);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Pr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:h,DOMParser:w,trustedTypes:E}=e,x=i.prototype,y=Mr(x,"cloneNode"),R=Mr(x,"remove"),W=Mr(x,"nextSibling"),j=Mr(x,"childNodes"),Q=Mr(x,"parentNode");if(typeof a=="function"){let Z=r.createElement("template");Z.content&&Z.content.ownerDocument&&(r=Z.content.ownerDocument)}let U,I="",{implementation:C,createNodeIterator:O,createDocumentFragment:H,getElementsByTagName:ne}=r,{importNode:de}=n,oe=Xo();t.isSupported=typeof Qo=="function"&&typeof Q=="function"&&C&&C.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:me,ERB_EXPR:xe,TMPLIT_EXPR:Ve,DATA_ATTR:We,ARIA_ATTR:Ae,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:Y}=Zo,{IS_ALLOWED_URI:ye}=Zo,K=null,we=$e({},[...Go,...es,...ts,...rs,...Yo]),pe=null,Pe=$e({},[...Vo,...ns,...Ko,...fn]),te=Object.seal(ss(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),_e=null,N=null,P=Object.seal(ss(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,Se=!0,ke=!1,g=!0,T=!1,A=!0,z=!1,V=!1,ie=!1,ue=!1,Ne=!1,De=!1,Ge=!0,tt=!1,st="user-content-",ot=!0,Ye=!1,dt={},Xe=null,Fe=$e({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,ft=$e({},["audio","video","img","source","image","track"]),He=null,at=$e({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),it="http://www.w3.org/1998/Math/MathML",rt="http://www.w3.org/2000/svg",M="http://www.w3.org/1999/xhtml",q=M,ee=!1,se=null,ce=$e({},[it,rt,M],Qn),be=$e({},["mi","mo","mn","ms","mtext"]),Ee=$e({},["annotation-xml"]),Oe=$e({},["title","style","font","a","script"]),Ce=null,u=["application/xhtml+xml","text/html"],b="text/html",D=null,J=null,Ie=r.createElement("form"),je=function(v){return v instanceof RegExp||v instanceof Function},qe=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(J&&J===v)){if((!v||typeof v!="object")&&(v={}),v=Bt(v),Ce=u.indexOf(v.PARSER_MEDIA_TYPE)===-1?b:v.PARSER_MEDIA_TYPE,D=Ce==="application/xhtml+xml"?Qn:_n,K=Et(v,"ALLOWED_TAGS")?$e({},v.ALLOWED_TAGS,D):we,pe=Et(v,"ALLOWED_ATTR")?$e({},v.ALLOWED_ATTR,D):Pe,se=Et(v,"ALLOWED_NAMESPACES")?$e({},v.ALLOWED_NAMESPACES,Qn):ce,He=Et(v,"ADD_URI_SAFE_ATTR")?$e(Bt(at),v.ADD_URI_SAFE_ATTR,D):at,pt=Et(v,"ADD_DATA_URI_TAGS")?$e(Bt(ft),v.ADD_DATA_URI_TAGS,D):ft,Xe=Et(v,"FORBID_CONTENTS")?$e({},v.FORBID_CONTENTS,D):Fe,_e=Et(v,"FORBID_TAGS")?$e({},v.FORBID_TAGS,D):Bt({}),N=Et(v,"FORBID_ATTR")?$e({},v.FORBID_ATTR,D):Bt({}),dt=Et(v,"USE_PROFILES")?v.USE_PROFILES:!1,re=v.ALLOW_ARIA_ATTR!==!1,Se=v.ALLOW_DATA_ATTR!==!1,ke=v.ALLOW_UNKNOWN_PROTOCOLS||!1,g=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,T=v.SAFE_FOR_TEMPLATES||!1,A=v.SAFE_FOR_XML!==!1,z=v.WHOLE_DOCUMENT||!1,ue=v.RETURN_DOM||!1,Ne=v.RETURN_DOM_FRAGMENT||!1,De=v.RETURN_TRUSTED_TYPE||!1,ie=v.FORCE_BODY||!1,Ge=v.SANITIZE_DOM!==!1,tt=v.SANITIZE_NAMED_PROPS||!1,ot=v.KEEP_CONTENT!==!1,Ye=v.IN_PLACE||!1,ye=v.ALLOWED_URI_REGEXP||Jo,q=v.NAMESPACE||M,be=v.MATHML_TEXT_INTEGRATION_POINTS||be,Ee=v.HTML_INTEGRATION_POINTS||Ee,te=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&je(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(te.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&je(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(te.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(te.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),T&&(Se=!1),Ne&&(ue=!0),dt&&(K=$e({},Yo),pe=[],dt.html===!0&&($e(K,Go),$e(pe,Vo)),dt.svg===!0&&($e(K,es),$e(pe,ns),$e(pe,fn)),dt.svgFilters===!0&&($e(K,ts),$e(pe,ns),$e(pe,fn)),dt.mathMl===!0&&($e(K,rs),$e(pe,Ko),$e(pe,fn))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?P.tagCheck=v.ADD_TAGS:(K===we&&(K=Bt(K)),$e(K,v.ADD_TAGS,D))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?P.attributeCheck=v.ADD_ATTR:(pe===Pe&&(pe=Bt(pe)),$e(pe,v.ADD_ATTR,D))),v.ADD_URI_SAFE_ATTR&&$e(He,v.ADD_URI_SAFE_ATTR,D),v.FORBID_CONTENTS&&(Xe===Fe&&(Xe=Bt(Xe)),$e(Xe,v.FORBID_CONTENTS,D)),ot&&(K["#text"]=!0),z&&$e(K,["html","head","body"]),K.table&&($e(K,["tbody"]),delete _e.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');U=v.TRUSTED_TYPES_POLICY,I=U.createHTML("")}else U===void 0&&(U=cc(E,s)),U!==null&&typeof I=="string"&&(I=U.createHTML(""));gt&&gt(v),J=v}},Be=$e({},[...es,...ts,...Ql]),Qe=$e({},[...rs,...Jl]),ct=function(v){let B=Q(v);(!B||!B.tagName)&&(B={namespaceURI:q,tagName:"template"});let f=_n(v.tagName),m=_n(B.tagName);return se[v.namespaceURI]?v.namespaceURI===rt?B.namespaceURI===M?f==="svg":B.namespaceURI===it?f==="svg"&&(m==="annotation-xml"||be[m]):!!Be[f]:v.namespaceURI===it?B.namespaceURI===M?f==="math":B.namespaceURI===rt?f==="math"&&Ee[m]:!!Qe[f]:v.namespaceURI===M?B.namespaceURI===rt&&!Ee[m]||B.namespaceURI===it&&!be[m]?!1:!Qe[f]&&(Oe[f]||!Be[f]):!!(Ce==="application/xhtml+xml"&&se[v.namespaceURI]):!1},Ze=function(v){Lr(t.removed,{element:v});try{Q(v).removeChild(v)}catch{R(v)}},nt=function(v,B){try{Lr(t.removed,{attribute:B.getAttributeNode(v),from:B})}catch{Lr(t.removed,{attribute:null,from:B})}if(B.removeAttribute(v),v==="is")if(ue||Ne)try{Ze(B)}catch{}else try{B.setAttribute(v,"")}catch{}},ve=function(v){let B=null,f=null;if(ie)v="<remove></remove>"+v;else{let $=Jn(v,/^[\r\n\t ]+/);f=$&&$[0]}Ce==="application/xhtml+xml"&&q===M&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let m=U?U.createHTML(v):v;if(q===M)try{B=new w().parseFromString(m,Ce)}catch{}if(!B||!B.documentElement){B=C.createDocument(q,"template",null);try{B.documentElement.innerHTML=ee?I:m}catch{}}let p=B.body||B.documentElement;return v&&f&&p.insertBefore(r.createTextNode(f),p.childNodes[0]||null),q===M?ne.call(B,z?"html":"body")[0]:z?B.documentElement:p},lt=function(v){return O.call(v.ownerDocument||v,v,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},yt=function(v){return v instanceof h&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof _)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},fe=function(v){return typeof c=="function"&&v instanceof c};function ge(Z,v,B){pn(Z,f=>{f.call(t,v,B,J)})}let kt=function(v){let B=null;if(ge(oe.beforeSanitizeElements,v,null),yt(v))return Ze(v),!0;let f=D(v.nodeName);if(ge(oe.uponSanitizeElement,v,{tagName:f,allowedTags:K}),A&&v.hasChildNodes()&&!fe(v.firstElementChild)&&mt(/<[/\w!]/g,v.innerHTML)&&mt(/<[/\w!]/g,v.textContent)||v.nodeType===Pr.progressingInstruction||A&&v.nodeType===Pr.comment&&mt(/<[/\w]/g,v.data))return Ze(v),!0;if(!(P.tagCheck instanceof Function&&P.tagCheck(f))&&(!K[f]||_e[f])){if(!_e[f]&&Ht(f)&&(te.tagNameCheck instanceof RegExp&&mt(te.tagNameCheck,f)||te.tagNameCheck instanceof Function&&te.tagNameCheck(f)))return!1;if(ot&&!Xe[f]){let m=Q(v)||v.parentNode,p=j(v)||v.childNodes;if(p&&m){let $=p.length;for(let k=$-1;k>=0;--k){let F=y(p[k],!0);F.__removalCount=(v.__removalCount||0)+1,m.insertBefore(F,W(v))}}}return Ze(v),!0}return v instanceof i&&!ct(v)||(f==="noscript"||f==="noembed"||f==="noframes")&&mt(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ze(v),!0):(T&&v.nodeType===Pr.text&&(B=v.textContent,pn([me,xe,Ve],m=>{B=Dr(B,m," ")}),v.textContent!==B&&(Lr(t.removed,{element:v.cloneNode()}),v.textContent=B)),ge(oe.afterSanitizeElements,v,null),!1)},Mt=function(v,B,f){if(Ge&&(B==="id"||B==="name")&&(f in r||f in Ie))return!1;if(!(Se&&!N[B]&&mt(We,B))){if(!(re&&mt(Ae,B))){if(!(P.attributeCheck instanceof Function&&P.attributeCheck(B,v))){if(!pe[B]||N[B]){if(!(Ht(v)&&(te.tagNameCheck instanceof RegExp&&mt(te.tagNameCheck,v)||te.tagNameCheck instanceof Function&&te.tagNameCheck(v))&&(te.attributeNameCheck instanceof RegExp&&mt(te.attributeNameCheck,B)||te.attributeNameCheck instanceof Function&&te.attributeNameCheck(B,v))||B==="is"&&te.allowCustomizedBuiltInElements&&(te.tagNameCheck instanceof RegExp&&mt(te.tagNameCheck,f)||te.tagNameCheck instanceof Function&&te.tagNameCheck(f))))return!1}else if(!He[B]){if(!mt(ye,Dr(f,L,""))){if(!((B==="src"||B==="xlink:href"||B==="href")&&v!=="script"&&Vl(f,"data:")===0&&pt[v])){if(!(ke&&!mt(ae,Dr(f,L,"")))){if(f)return!1}}}}}}}return!0},Ht=function(v){return v!=="annotation-xml"&&Jn(v,Y)},Pt=function(v){ge(oe.beforeSanitizeAttributes,v,null);let{attributes:B}=v;if(!B||yt(v))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},m=B.length;for(;m--;){let p=B[m],{name:$,namespaceURI:k,value:F}=p,he=D($),Je=F,Le=$==="value"?Je:Kl(Je);if(f.attrName=he,f.attrValue=Le,f.keepAttr=!0,f.forceKeepAttr=void 0,ge(oe.uponSanitizeAttribute,v,f),Le=f.attrValue,tt&&(he==="id"||he==="name")&&(nt($,v),Le=st+Le),A&&mt(/((--!?|])>)|<\/(style|title|textarea)/i,Le)){nt($,v);continue}if(he==="attributename"&&Jn(Le,"href")){nt($,v);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){nt($,v);continue}if(!g&&mt(/\/>/i,Le)){nt($,v);continue}T&&pn([me,xe,Ve],jt=>{Le=Dr(Le,jt," ")});let _t=D(v.nodeName);if(!Mt(_t,he,Le)){nt($,v);continue}if(U&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!k)switch(E.getAttributeType(_t,he)){case"TrustedHTML":{Le=U.createHTML(Le);break}case"TrustedScriptURL":{Le=U.createScriptURL(Le);break}}if(Le!==Je)try{k?v.setAttributeNS(k,$,Le):v.setAttribute($,Le),yt(v)?Ze(v):jo(t.removed)}catch{nt($,v)}}ge(oe.afterSanitizeAttributes,v,null)},Wt=function Z(v){let B=null,f=lt(v);for(ge(oe.beforeSanitizeShadowDOM,v,null);B=f.nextNode();)ge(oe.uponSanitizeShadowNode,B,null),kt(B),Pt(B),B.content instanceof o&&Z(B.content);ge(oe.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(Z){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},B=null,f=null,m=null,p=null;if(ee=!Z,ee&&(Z="<!-->"),typeof Z!="string"&&!fe(Z))if(typeof Z.toString=="function"){if(Z=Z.toString(),typeof Z!="string")throw Or("dirty is not a string, aborting")}else throw Or("toString is not a function");if(!t.isSupported)return Z;if(V||qe(v),t.removed=[],typeof Z=="string"&&(Ye=!1),Ye){if(Z.nodeName){let F=D(Z.nodeName);if(!K[F]||_e[F])throw Or("root node is forbidden and cannot be sanitized in-place")}}else if(Z instanceof c)B=ve("<!---->"),f=B.ownerDocument.importNode(Z,!0),f.nodeType===Pr.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?B=f:B.appendChild(f);else{if(!ue&&!T&&!z&&Z.indexOf("<")===-1)return U&&De?U.createHTML(Z):Z;if(B=ve(Z),!B)return ue?null:De?I:""}B&&ie&&Ze(B.firstChild);let $=lt(Ye?Z:B);for(;m=$.nextNode();)kt(m),Pt(m),m.content instanceof o&&Wt(m.content);if(Ye)return Z;if(ue){if(Ne)for(p=H.call(B.ownerDocument);B.firstChild;)p.appendChild(B.firstChild);else p=B;return(pe.shadowroot||pe.shadowrootmode)&&(p=de.call(n,p,!0)),p}let k=z?B.outerHTML:B.innerHTML;return z&&K["!doctype"]&&B.ownerDocument&&B.ownerDocument.doctype&&B.ownerDocument.doctype.name&&mt(ea,B.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+B.ownerDocument.doctype.name+`>
`+k),T&&pn([me,xe,Ve],F=>{k=Dr(k,F," ")}),U&&De?U.createHTML(k):k},t.setConfig=function(){let Z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};qe(Z),V=!0},t.clearConfig=function(){J=null,V=!1},t.isValidAttribute=function(Z,v,B){J||qe({});let f=D(Z),m=D(v);return Mt(f,m,B)},t.addHook=function(Z,v){typeof v=="function"&&Lr(oe[Z],v)},t.removeHook=function(Z,v){if(v!==void 0){let B=Gl(oe[Z],v);return B===-1?void 0:Yl(oe[Z],B,1)[0]}return jo(oe[Z])},t.removeHooks=function(Z){oe[Z]=[]},t.removeAllHooks=function(){oe=Xo()},t}var ra=ta();var na={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},sa=e=>(...t)=>({_$litDirective$:e,values:t}),mn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Nr=class extends mn{constructor(t){if(super(t),this.it=et,t.type!==na.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===et||t==null)return this._t=void 0,this.it=t;if(t===tr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Nr.directiveName="unsafeHTML",Nr.resultType=1;var oa=sa(Nr);function ds(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var lr=ds();function pa(e){lr=e}var Ur={exec:()=>null};function Re(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(bt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var dc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},uc=/^(?:[ \t]*(?:\n|$))+/,pc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,fc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,_c=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,us=/(?:[*+-]|\d{1,9}[.)])/,fa=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_a=Re(fa).replace(/bull/g,us).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),mc=Re(fa).replace(/bull/g,us).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ps=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,gc=/^[^\n]+/,fs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,hc=Re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",fs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),bc=Re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,us).getRegex(),wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",_s=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,vc=Re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",_s).replace("tag",wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ma=Re(ps).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex(),yc=Re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ma).getRegex(),ms={blockquote:yc,code:pc,def:hc,fences:fc,heading:_c,hr:zr,html:vc,lheading:_a,list:bc,newline:uc,paragraph:ma,table:Ur,text:gc},aa=Re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex(),wc={...ms,lheading:mc,table:aa,paragraph:Re(ps).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",aa).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex()},kc={...ms,html:Re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",_s).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ur,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Re(ps).replace("hr",zr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",_a).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},$c=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,xc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ga=/^( {2,}|\\)\n(?!\s*$)/,Sc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,kn=/[\p{P}\p{S}]/u,gs=/[\s\p{P}\p{S}]/u,ha=/[^\s\p{P}\p{S}]/u,Ac=Re(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,gs).getRegex(),ba=/(?!~)[\p{P}\p{S}]/u,Tc=/(?!~)[\s\p{P}\p{S}]/u,Ec=/(?:[^\s\p{P}\p{S}]|~)/u,Cc=Re(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",dc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),va=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Rc=Re(va,"u").replace(/punct/g,kn).getRegex(),Ic=Re(va,"u").replace(/punct/g,ba).getRegex(),ya="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Lc=Re(ya,"gu").replace(/notPunctSpace/g,ha).replace(/punctSpace/g,gs).replace(/punct/g,kn).getRegex(),Dc=Re(ya,"gu").replace(/notPunctSpace/g,Ec).replace(/punctSpace/g,Tc).replace(/punct/g,ba).getRegex(),Oc=Re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ha).replace(/punctSpace/g,gs).replace(/punct/g,kn).getRegex(),Mc=Re(/\\(punct)/,"gu").replace(/punct/g,kn).getRegex(),Pc=Re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Nc=Re(_s).replace("(?:-->|$)","-->").getRegex(),Fc=Re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Nc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,qc=Re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),wa=Re(/^!?\[(label)\]\[(ref)\]/).replace("label",bn).replace("ref",fs).getRegex(),ka=Re(/^!?\[(ref)\](?:\[\])?/).replace("ref",fs).getRegex(),Bc=Re("reflink|nolink(?!\\()","g").replace("reflink",wa).replace("nolink",ka).getRegex(),ia=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,hs={_backpedal:Ur,anyPunctuation:Mc,autolink:Pc,blockSkip:Cc,br:ga,code:xc,del:Ur,emStrongLDelim:Rc,emStrongRDelimAst:Lc,emStrongRDelimUnd:Oc,escape:$c,link:qc,nolink:ka,punctuation:Ac,reflink:wa,reflinkSearch:Bc,tag:Fc,text:Sc,url:Ur},Uc={...hs,link:Re(/^!?\[(label)\]\((.*?)\)/).replace("label",bn).getRegex(),reflink:Re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bn).getRegex()},is={...hs,emStrongRDelimAst:Dc,emStrongLDelim:Ic,url:Re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ia).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ia).getRegex()},zc={...is,br:Re(ga).replace("{2,}","*").getRegex(),text:Re(is.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},gn={normal:ms,gfm:wc,pedantic:kc},Fr={normal:hs,gfm:is,breaks:zc,pedantic:Uc},Hc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},la=e=>Hc[e];function Ut(e,t){if(t){if(bt.escapeTest.test(e))return e.replace(bt.escapeReplace,la)}else if(bt.escapeTestNoEncode.test(e))return e.replace(bt.escapeReplaceNoEncode,la);return e}function ca(e){try{e=encodeURI(e).replace(bt.percentDecode,"%")}catch{return null}return e}function da(e,t){let r=e.replace(bt.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(bt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(bt.slashPipe,"|");return n}function qr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Wc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ua(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,i}function jc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var vn=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:qr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=jc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=qr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=qr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))c.push(r[i]),a=!0;else if(!a)c.push(r[i]);else break;r=r.slice(i);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=h,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let E=w,x=E.raw+`
`+r.join(`
`),y=this.blockquote(x);o[o.length-1]=y,n=n.substring(0,n.length-E.raw.length)+y.raw,s=s.substring(0,s.length-E.text.length)+y.text;break}else if(w?.type==="list"){let E=w,x=E.raw+`
`+r.join(`
`),y=this.list(x);o[o.length-1]=y,n=n.substring(0,n.length-w.raw.length)+y.raw,s=s.substring(0,s.length-E.raw.length)+y.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let h=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),w=e.split(`
`,1)[0],E=!h.trim(),x=0;if(this.options.pedantic?(x=2,_=h.trimStart()):E?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,_=h.slice(x),x+=t[1].length),E&&this.rules.other.blankLine.test(w)&&(d+=w+`
`,e=e.substring(w.length+1),i=!0),!i){let y=this.rules.other.nextBulletRegex(x),R=this.rules.other.hrRegex(x),W=this.rules.other.fencesBeginRegex(x),j=this.rules.other.headingBeginRegex(x),Q=this.rules.other.htmlBeginRegex(x);for(;e;){let U=e.split(`
`,1)[0],I;if(w=U,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),I=w):I=w.replace(this.rules.other.tabCharGlobal,"    "),W.test(w)||j.test(w)||Q.test(w)||y.test(w)||R.test(w))break;if(I.search(this.rules.other.nonSpaceChar)>=x||!w.trim())_+=`
`+I.slice(x);else{if(E||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||W.test(h)||j.test(h)||R.test(h))break;_+=`
`+w}!E&&!w.trim()&&(E=!0),d+=U+`
`,e=e.substring(U.length+1),h=I.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=_.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=_.raw+i.tokens[0].raw,i.tokens[0].text=_.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(_)):i.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):i.tokens.unshift(_)}}if(!s.loose){let d=i.tokens.filter(h=>h.type==="space"),_=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));s.loose=_}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=da(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(da(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=qr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Wc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ua(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ua(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let _=[...n[0]][0].length,h=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let E=h.slice(1,-1);return{type:"em",raw:h,text:E,tokens:this.lexer.inlineTokens(E)}}let w=h.slice(2,-2);return{type:"strong",raw:h,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ct=class ls{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||lr,this.options.tokenizer=this.options.tokenizer||new vn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:bt,block:gn.normal,inline:Fr.normal};this.options.pedantic?(r.block=gn.pedantic,r.inline=Fr.pedantic):this.options.gfm&&(r.block=gn.gfm,this.options.breaks?r.inline=Fr.breaks:r.inline=Fr.gfm),this.tokenizer.rules=r}static get rules(){return{block:gn,inline:Fr}}static lex(t,r){return new ls(r).lex(t)}static lexInline(t,r){return new ls(r).inlineTokens(t)}lex(t){t=t.replace(bt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(bt.tabCharGlobal,"    ").replace(bt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(_=>(i=_.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let _=r.at(-1);i.type==="text"&&_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,c)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,h=t.slice(1),w;this.options.extensions.startInline.forEach(E=>{w=E.call({lexer:this},h),typeof w=="number"&&w>=0&&(_=Math.min(_,w))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},yn=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(bt.notSpaceStart)?.[0],s=e.replace(bt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ut(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ca(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ut(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ca(e);if(s===null)return Ut(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ut(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ut(e.text)}},bs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Rt=class cs{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||lr,this.options.renderer=this.options.renderer||new yn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new bs}static parse(t,r){return new cs(r).parse(t)}static parseInline(t,r){return new cs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},hn,Br=(hn=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ct.lex:Ct.lexInline}provideParser(){return this.block?Rt.parse:Rt.parseInline}},ze(hn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze(hn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),hn),Gc=class{constructor(...e){ze(this,"defaults",ds());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",Rt);ze(this,"Renderer",yn);ze(this,"TextRenderer",bs);ze(this,"Lexer",Ct);ze(this,"Tokenizer",vn);ze(this,"Hooks",Br);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new yn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Br;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],i=s[a];Br.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Br.passThroughHooksRespectAsync.has(o))return(async()=>{let h=await c.call(s,d);return i.call(s,h)})();let _=c.call(s,d);return i.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await c.apply(s,d);return h===!1&&(h=await i.apply(s,d)),h})();let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ct.lex(e,t??this.defaults)}parser(e,t){return Rt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ut(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},ir=new Gc;function Me(e,t){return ir.parse(e,t)}Me.options=Me.setOptions=function(e){return ir.setOptions(e),Me.defaults=ir.defaults,pa(Me.defaults),Me};Me.getDefaults=ds;Me.defaults=lr;Me.use=function(...e){return ir.use(...e),Me.defaults=ir.defaults,pa(Me.defaults),Me};Me.walkTokens=function(e,t){return ir.walkTokens(e,t)};Me.parseInline=ir.parseInline;Me.Parser=Rt;Me.parser=Rt.parse;Me.Renderer=yn;Me.TextRenderer=bs;Me.Lexer=Ct;Me.lexer=Ct.lex;Me.Tokenizer=vn;Me.Hooks=Br;Me.parse=Me;var pf=Me.options,ff=Me.setOptions,_f=Me.use,mf=Me.walkTokens,gf=Me.parseInline;var hf=Rt.parse,bf=Ct.lex;function Vt(e){let t=Me.parse(e),r=ra.sanitize(t);return oa(r)}function zt(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function yr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function $n(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Yc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Vc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Kc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Kt(e){return!!e&&typeof e=="object"}function vs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function $a(e,t){let r=vs(e),n=vs(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Zc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Kt(s)&&typeof s.text=="string"?s.text:"").join(""):Kt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Xc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Yc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=vs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=$a(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let i=$a(Kt(c)?c.old_string:"",Kt(c)?c.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function xa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Sa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Vc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Kc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Qc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Kt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Sa(o.text));else if(o.type==="thinking"){let a=xa(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Xc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Kt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Zc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Jc(e){if(e.type==="item.completed"&&Kt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Sa(t.text)];if(t.type==="reasoning"){let r=xa(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function ed(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Aa(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!Kt(o))continue;let a=ed(o)?Jc(o):Qc(o,r);for(let c of a)t.push(c)}return t}var td=5,rd=10,nd=/Task\s+#(\d+)/,sd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,od=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function xn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function ad(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function id(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function ld(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=nd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function cd(e){if(e.tool==="Bash"){let t=e.command||"";return sd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":od.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function dd(e){let t=e.filter(s=>s.kind==="tool").slice(-rd),r=new Map;t.forEach((s,o)=>{let a=cd(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function ud(e){let t=id(e);if(t)return{text:t,guess:!1};let r=ld(e);if(r)return{text:r,guess:!1};let n=dd(e);return n?{text:n,guess:!0}:null}function pd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:wt(e,t)}function Sn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,_=null,h=null,w=!1,E=!1,x=!1,y=null,R=null;function W(){w=!1,E=!1,x=!1,y=null,R=null}async function j(N){if(r){E=!0,x=!1,L();try{let P=await Promise.resolve(r("get-attempt-prompt",{attempt_id:N}));if(o!==N)return;!P||typeof P!="object"||Array.isArray(P)?x=!0:(y=P,R=N)}catch{o===N&&(x=!0)}finally{o===N&&(E=!1,L())}}}function Q(){if(w=!w,w&&o&&R!==o){j(o);return}L()}function U(){if(!w)return"";let N=yr({loading:E,error:x});if(N)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${N}
      </div>`;if(!y)return"";if(y.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let P=$n(y.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${P?l`<div class="prompt-block__meta">${P} 발송</div>`:""}
      ${typeof y.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",y.task_prompt):""}
      ${typeof y.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",y.system_prompt):""}
    </div>`}function I(){if(!o||!n)return[];let N=n.get(o);return Aa(N?N.lines:[])}function C(){if(!o||!n)return null;let N=n.get(o),P=N?N.last_event_at:null;return typeof P=="number"?P:null}function O(){return a.status==="running"}function H(){if(O()&&o){h||(h=setInterval(()=>L(),1e3));return}ne()}function ne(){h&&(clearInterval(h),h=null)}function de(N){let P=[],re=0;for(;re<N.length;){let Se=N[re];if(Se.kind==="tool"){let ke=re;for(;ke<N.length&&N[ke].kind==="tool"&&N[ke].tool===Se.tool;)ke+=1;if(ke-re>=td&&!d.has(re)){P.push({kind:"group",idx:re,tool:Se.tool||"",lines:N.slice(re,ke).map((g,T)=>({idx:re+T,line:g}))}),re=ke;continue}}P.push({kind:"line",idx:re,line:Se}),re+=1}return P}function oe(N){for(let P=N.length-1;P>=0;P-=1){let re=N[P];if(re.kind==="result"||re.kind==="error")return null;if(re.kind==="tool"&&!Object.hasOwn(re,"result"))return re}return null}function me(N){for(let P=N.length-1;P>=0;P-=1)if(N[P].kind==="thinking")return N[P];return null}function xe(N,P){if(P.kind==="gate")return l`<div class="sv__gate">${P.text}</div>`;if(P.kind==="phase")return l`<div class="sv__phase">${P.text}</div>`;if(P.kind==="result")return l`<div
        class="sv__result${P.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${P.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Vt(P.text||(P.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(P.kind==="thinking"){let re=i.has(N);return l`<div
        class="sv__think${re?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(N)}
      >
        <span class="sv__think-line">💭 ${xn(P.text)}</span>
        ${re?l`<pre class="sv__think-expand">${P.text}</pre>`:""}
      </div>`}if(P.kind==="error")return l`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="blocker")return l`<div class="sv__error">⛔ ${P.text}</div>`;if(P.kind==="tool"){let re=i.has(N),Se=P.tool==="Bash"?ad(P.command):0,ke=P.tool==="Bash"?Se>1?xn(P.command):P.command:P.path||P.command||"";return l`<div
        class="sv__tool${re?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ye(N)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${P.icon}</span>
          <span class="sv__tool-name">${P.tool}</span>
          ${ke?l`<span class="sv__tool-detail">${ke}</span>`:""}
          ${Se>1?l`<span class="sv__tool-more">⋯ ${Se}줄</span>`:""}
          ${typeof P.added=="number"?l`<span class="sv__diff-add">+${P.added}</span>`:""}
          ${typeof P.removed=="number"?l`<span class="sv__diff-del">−${P.removed}</span>`:""}
          ${P.result?l`<span class="sv__tool-ok">→ ${P.result}</span>`:""}
        </span>
        ${re?l`<pre class="sv__tool-expand">${Ve(P)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Vt(P.text||"")}</div>`}function Ve(N){let P=[];if(N.tool==="Bash"&&typeof N.command=="string"&&N.command.length>0)P.push(N.command);else if(N.input!==void 0)try{P.push(`input: ${JSON.stringify(N.input,null,2)}`)}catch{}return typeof N.output=="string"&&N.output.length>0&&P.push(`output:
${N.output}`),P.join(`

`)}function We(){if(!o)return l``;let N=I(),P=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),re=a.session_id||"",Se=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,ke=O(),g=ke?pd(C(),Date.now()):"",T=ke?oe(N):null,A=ke?me(N):null,z=ud(N);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${z?l`<span
              class="sv__stage${z.guess?" sv__stage--guess":""}"
              title=${z.text}
              >${z.text}</span
            >`:""}
        ${ke?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${g?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${g}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${g?l`<span class="sv__live-ago">${g}</span>`:""}</span
            >`:""}
        ${re?l`<button
              type="button"
              class="sv__session"
              title=${re}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${re}`}
              @click=${()=>we(re)}
            >
              ⧉ ${re.slice(0,8)}
            </button>`:""}
        ${P?l`<span class="sv__meta">${P}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${w?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${w?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Q}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Se}
          @click=${K}
        >
          <span class="sv__follow-full">⇣ ${Se}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>_e()}
        >
          ✕
        </button>
      </div>
      ${U()}
      <div class="sv__body">
        ${N.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:de(N).map(V=>V.kind==="group"?Ae(V):xe(V.idx,V.line))}
      </div>
      ${T||A?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${T?l`<span class="sv__now-icon">${T.icon}</span>
                  <span class="sv__now-name">${T.tool}</span>
                  <span class="sv__now-detail"
                    >${T.tool==="Bash"?xn(T.command):T.path||T.command||""}</span
                  >`:""}
            ${A?l`<span class="sv__now-think"
                  >💭 ${xn(A.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ae(N){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ae(N.idx)}
    >
      <span class="sv__group-icon">${N.lines[0].line.icon}</span>
      <span class="sv__group-name">${N.tool}</span>
      <span class="sv__group-count">${N.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function ae(N){d.add(N),L()}function L(){Te(We(),e),H(),c&&Y()}function Y(){let N=e.querySelector(".sv__body");N&&(N.scrollTop=N.scrollHeight)}function ye(N){i.has(N)?i.delete(N):i.add(N),L()}function K(){c=!c,L()}function we(N){or(N).then(P=>{P?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(N){!o||!N||(a={...a,...N},L())}function Pe(N){let P=N.target;if(!P||!P.classList||!P.classList.contains("sv__body"))return;!(P.scrollHeight-P.scrollTop-P.clientHeight<=4)&&c&&(c=!1,L())}e.addEventListener("scroll",Pe,!0);function te(N){let P=N&&N.attempt_id;P&&(o=P,a=N.meta||{},c=!0,i.clear(),d.clear(),W(),!_&&n&&(_=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function _e(){let N=o;o=null,i.clear(),d.clear(),W(),ne(),r&&N&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${N}`})).catch(()=>{}),Te(l``,e),s&&s()}return{open:te,updateMeta:pe,close:_e,isOpen(){return o!==null},destroy(){ne(),_&&(_(),_=null),e.removeEventListener("scroll",Pe,!0),o=null,Te(l``,e)}}}function fd(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function Ta(e,t){let r=fd(e);return l`
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
  `}var _d="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",md=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gd=/^\*\*결론\*\* — (.+)$/;function Ea(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_d)return null;let r=md.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?gd.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var Ca=20;function Ra(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function hd(e){return e.length>Ca?`${e.slice(0,Ca)}\u2026`:e}function bd(e,t,r,n){let s=`${t.lane} ${hd(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Ra(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Vt(t.body)}
        </div>`:""}
  </div>`}function vd(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ra(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Vt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ia(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=Ea(typeof i.text=="string"?i.text:"");return d?bd(i,d,t,s.has(i.id)):vd(i)})}
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
  `}var yd=["codex","opus","fable","self","skip"],wd=["codex","fable","skip"],kd=["low","medium","high","xhigh"],$d=["standard","fast_track"],jr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_model","impl_effort"],ws={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},La={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},xd=["self","skip"],Sd="opus",An={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Tn(e){let t=ws[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Ad(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:An[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function En(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function ys(e){return{value:e,label:e}}function Pa(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Td(e,t){let r=En(e);if(!r)return t?[{label:null,options:[ys(t)]}]:[];let n=r.map(([o,a])=>({label:o,options:Object.keys(a.models).map(ys)})),s=n.some(o=>o.options.some(a=>a.value===t));return t&&!s?[Pa(t),...n]:n}function wr(e,t){let r={label:null,options:e.map(ys)};return t&&!e.includes(t)?[Pa(t),r]:[r]}function Ed(e,t){let r=En(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Na(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Da(e,t){let r=En(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Na(n,n.models[t]);return[]}function Cd(e){let t=En(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Na(n,s))r.includes(o)||r.push(o);return r}function cr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n}=e,s=r("orchestration_model")||Sd,o=r("impl_model");return jr.map(a=>{let c=t(a),i,d=!1;return a==="orchestration_model"||a==="impl_model"?i=Td(n,c):a==="orchestration_effort"?i=wr(Da(n,s),c):a==="impl_effort"?i=wr(o?Da(n,o):Cd(n),c):a==="plan_review_model"?i=wr(wd,c):Object.hasOwn(La,a)?(i=wr(kd,c),d=xd.includes(r(La[a]))):i=wr(yd,c),{key:a,groups:i,selected:c,disabled:d,runner:a==="orchestration_model"?Ed(n,s):null}})}function Wr(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Oa(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>Oa(s,t))}
          </optgroup>`)}
  `}function Oa(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Ma(e,t,r,n,s,o,a){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${Tn(e)}</span>
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
  `}function Fa(e,t,r,n){let s=e&&e.metadata||{},o=r&&typeof r=="object"?r:{},a=_=>typeof s[_]=="string"?s[_]:"",i=cr({selectedOf:a,effectiveOf:_=>{let h=a(_);return h||(typeof o[_]=="string"?o[_]:"")},runner_catalog:n}),d=s.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${i.map(_=>Ma(_.key,Wr(_.groups,_.selected,Ad(_.key,o)),_.selected,!1,_.disabled,_.runner,t))}
    ${Ma("workflow_mode",Wr(wr($d,d),d),d,s.workflow_mode==="fast_track",!1,null,t)}
  `}function Rd(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function qa(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i(x){x.key==="Escape"&&s&&(x.preventDefault(),w())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>w()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Rd(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>w()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Vt(a)}
          </div>
        </div>
      </div>
    `:l``}function _(){Te(d(),e)}async function h(x){s=x,o="loading",a="",c="",_();let y=r?r():"";if(!y){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let R="/api/doc?workspace="+encodeURIComponent(y)+"&path="+encodeURIComponent(x);try{let W=await n(R),j=await W.json().catch(()=>({}));if(!W.ok||!j||j.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(j&&j.error||W.status)+")",_();return}a=String(j.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Te(l``,e)}function E(){document.removeEventListener("keydown",i),w()}return{open:h,close:w,destroy:E}}var Id=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Ba="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ld(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Dd(e){let t=br(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Ba}
          >부분 집계</span
        >`:""}`}function Od(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${Id.map(r=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Ld(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Ba}</span>`:""}
  </div>`}var Md={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Pd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ua(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let h=typeof d.session_id=="string"&&d.session_id.length>0,w=o.has(d.attempt_id),E=h&&!w,x=h?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${x}
      @click=${y=>{y.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let h=d.cause_detail,w=h&&typeof h.reason=="string"&&h.reason.length>0?typeof h.command=="string"&&h.command.length>0?`${h.reason} \xB7 ${h.command}`:h.reason:d.cause;return l`<div class="detail-session__cause" title=${w}>
      ${d.cause}
    </div>`},i=d=>{if(!br(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Dd(r.total)}
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
                >${Md[d.status||""]||"\xB7"}</span
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
              ${br(d.usage)?l`<span class="detail-session__usage"
                    >${br(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Pd(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?Od(d.usage):""}
          </div>`)}
    </div>
  `}function za(e,t={}){return l`
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
          ${Nd(e)}
        </div>`:""}
  `}function Nd(e){let t=yr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=$n(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Fd=["open","in_progress","deferred","resolved","closed"],qd=[0,1,2,3,4];function Ha(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,i=t.sessionLogStore,d=null,_=null,h={},w="",E=!1,x=!1,y=!1,R="",W="",j="";function Q(){x=!1,y=!1,R="",W="",j=""}let U=[],I=null,C=null,O=!1,H="",ne=!1,de=0,oe=new Set;function me(){U=[],I=null,C=null,O=!1,H="",ne=!1,de+=1,oe.clear()}async function xe(p){if(!s)return;let $=++de;try{let k=await Promise.resolve(s("get-comments",{id:p}));if($!==de||p!==d)return;U=Array.isArray(k)?k:[],O=!1}catch{if($!==de||p!==d)return;O=!0}m()}function Ve(){if(!s||!d)return;let p=_&&typeof _.comment_count=="number"?_.comment_count:null;if(I!==d){I=d,C=p,xe(d);return}p!==null&&p!==C&&(C=p,xe(d))}function We(p){oe.has(p)?oe.delete(p):oe.add(p),m()}function Ae(p){let $=H.trim().length===0;H=p,$!==(p.trim().length===0)&&m()}async function ae(){let p=H.trim();if(!s||!d||p.length===0||ne)return;let $=d;ne=!0,m();let k=!1;try{let F=await Promise.resolve(s("add-comment",{id:$,text:p}));Array.isArray(F)&&F.length>0&&(k=!0,$===d&&(U=F,O=!1,H="",C=F.length))}catch{k=!1}k||X("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===d&&(ne=!1),m()}let L={onToggle:We,onDraftInput:Ae,onSubmit:ae},Y=document.createElement("div");Y.className="md-viewer-root",document.body.appendChild(Y);let ye=qa(Y,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),K=document.createElement("div");K.className="session-log-root",document.body.appendChild(K);let we=Sn(K,{transport:s?(p,$)=>Promise.resolve(s(p,$)):void 0,sessionLogStore:i}),pe=!1,Pe=!1,te=!1,_e=null,N=null,P=0;function re(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function Se(){pe=!1,Pe=!1,te=!1,_e=null,N=null,P+=1}async function ke(p){if(!s)return;let $=++P;Pe=!0,te=!1,m();try{let k=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if($!==P)return;!k||typeof k!="object"||Array.isArray(k)?te=!0:(_e=k,N=re(p))}catch{$===P&&(te=!0)}finally{$===P&&(Pe=!1,m())}}function g(){if(pe=!pe,pe&&d&&N!==re(d)){_e=null,ke(d);return}m()}function T(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(k=>k&&k.bead_id===d).sort((k,F)=>(F.started_at||0)-(k.started_at||0)).map(k=>({attempt_id:k.attempt_id,bead_id:k.bead_id,status:k.status,started_at:typeof k.started_at=="number"?k.started_at:null,runner:k.runner||null,model:k.model||null,session_id:k.session_id||null,resumed_from:k.resumed_from||null,dismissed_at:typeof k.dismissed_at=="number"?k.dismissed_at:null,cause:typeof k.cause=="string"?k.cause:null,cause_detail:k.cause_detail||null,usage:k.usage||null}))}function A(){if(!a||!d)return null;let p=a.get();return Dt(p&&p.attempts||{},d)}let z=new Set;function V(p){z.has(p)?z.delete(p):z.add(p),m()}function ie(p){let $=a?a.get():null,k=$&&$.attempts?$.attempts[p]:null;we.open({attempt_id:p,meta:k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}})}async function ue(p){if(!s||!p)return;let $=()=>{let F=a?a.get():null;return F&&typeof F.revision=="number"?F.revision:0},k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:$()});if(k&&k.conflict){let F=k.queue&&typeof k.queue.revision=="number"?k.queue.revision:$();k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:F})}k&&k.resumed===!1&&!k.conflict&&k.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}let Ne={onOpen:ie,onResume:ue,onToggleUsage:V};function De(){let p=a?a.get():null,$=p&&p.exec_defaults;return $&&typeof $=="object"?$:{}}function Ge(){let p=a?a.get():null;return p&&p.runner_catalog||null}function tt(){let p=c?c.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function st(p){let $=p&&p.settings&&typeof p.settings=="object"?p.settings:{},k=F=>typeof $[F]=="string"?$[F]:"";return cr({selectedOf:k,effectiveOf:k,runner_catalog:Ge()}).some(F=>F.groups.some(he=>he.options.some(Je=>Je.value===F.selected&&Je.label.endsWith("(\uBE44\uD638\uD658)"))))}function ot(p){c&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&c.set({revision:p.revision,presets:p.presets})}async function Ye(){let p=tt(),$=p?.presets.find(k=>k.id===w);if(!(!s||!d||!p||!$||st($)||E)){E=!0,m();try{let k=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:$.id,expected_revision:p.revision}));if(k&&k.conflict){ot(k),X("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=k&&Array.isArray(k.issue)?k.issue[0]:k?.issue;if(k&&k.applied&&F&&typeof F=="object"){_=F;for(let he of jr)delete h[he];X("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}k&&k.error==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(k){k&&typeof k=="object"&&k.code==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,m()}}}function dt(){let p=tt();if(p&&p.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let $=p?p.presets:[],k=$.find(he=>he.id===w),F=k?st(k):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${p===null||E}
          @change=${he=>{w=he.target.value,m()}}
        >
          <option value="" ?selected=${w===""}>
            ${p===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${$.map(he=>{let Je=st(he);return l`<option
              value=${he.id}
              ?selected=${he.id===w}
            >
              ${he.name}${Je?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${p===null||!k||F||E}
          @click=${()=>{Ye()}}
        >
          10개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let Xe=null;r&&r.subscribe&&(Xe=r.subscribe(()=>He()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{d&&m()}));let pt=null;c&&typeof c.subscribe=="function"&&(pt=c.subscribe(()=>{d&&m()}));function ft(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",ft);function He(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];_=p.find(k=>k&&k.id===d)||p[0]||_}Ve(),m()}}function at(p){or(p).then($=>{$?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function it(p){p.preventDefault(),p.stopPropagation(),d&&at(d)}function rt(p,$){p.preventDefault(),p.stopPropagation(),at($)}function M(p,$){p.preventDefault(),p.stopPropagation(),ye.open($)}function q(p,$){h[p]=$,m(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:p,value:$})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ee(p,$,k){if(!s||!d)return!1;try{let F=await Promise.resolve(s(p,$)),he=Array.isArray(F)?F[0]:F;return he&&typeof he=="object"&&he.id?(_=he,!0):(X(k,"error"),!1)}catch{return X(k,"error"),!1}}function se(p){setTimeout(()=>{try{let $=e.querySelector(p);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function ce(){x=!0,R=_&&_.title||"",m(),se('.detail-edit__input[data-edit="title"]')}function be(p){R=p.target.value}function Ee(){x=!1,R="",m()}function Oe(){ee("edit-text",{id:d,field:"title",value:R},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(x=!1,R=""),m()})}function Ce(){y=!0,W=_&&_.description||"",m(),se('.detail-edit__textarea[data-edit="description"]')}function u(p){W=p.target.value}function b(){y=!1,W="",m()}function D(){ee("edit-text",{id:d,field:"description",value:W},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(y=!1,W=""),m()})}function J(p,$,k,F){if(p.key==="Escape"){p.stopPropagation(),k();return}p.key==="Enter"&&(!F||p.ctrlKey||p.metaKey)&&(p.preventDefault(),$())}function Ie(p){let $=p.target.value;ee("update-status",{id:d,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function je(p){let $=Number(p.target.value);ee("update-priority",{id:d,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function qe(p){j=p.target.value}function Be(){let p=j.trim();p.length!==0&&ee("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(j=""),m()})}function Qe(p){if(p.key==="Escape"){p.stopPropagation(),j="",m();return}p.key==="Enter"&&(p.preventDefault(),Be())}function ct(p){ee("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Ze={onCopyPath:rt,onOpenDoc:M},nt={onChange:q};function ve(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function lt(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function yt(p){let k=(Array.isArray(p.dependencies)?p.dependencies:[]).map(F=>({id:ve(F),icon:lt(F)})).filter(F=>F.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${k.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${k.map(F=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(F.id)}
                  >
                    ${F.icon?`${F.icon} `:""}${F.id}
                  </button>`:l`<span class="detail-dep"
                    >${F.icon?`${F.icon} `:""}${F.id}</span
                  >`)}
          </div>`}
    `}function fe(p){let $=p.metadata||{},k=p.workflow||{},F=k.stages||{},he=F.spec&&F.spec.stale,Je=F.impl&&F.impl.stale,Le=F.plan||null,_t=k.route_source==="derived",jt=k.route||$.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${_t?" detail-kv__v--derived":""}"
          title=${_t?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${_t&&k.route?`${jt} ? (\uCD94\uB860)`:jt}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${$.spec_review||"\uC5C6\uC74C"}${he?" \xB7 stale":""}</span
        >
      </div>
      ${k.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Le?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Le?.approval_receipt||"\uC5C6\uC74C"}${Le?.approval_state==="stale"?" \xB7 stale":Le?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${$.impl_review||"\uC5C6\uC74C"}${Je?" \xB7 stale":""}</span
        >
      </div>
      ${$.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let ge={route:["spec_backed","full_plan"]};async function kt(p,$){let k=$.target.value;if(p==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&k!=="full_plan"&&!window.confirm(`full_plan \u2192 ${k||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await ee("update-workflow-meta",{id:d,key:p,value:k},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function Mt(p){let $=p.metadata||{};return l` ${((F,he)=>{let Je=ge[F],Le=typeof $[F]=="string"?$[F]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${_t=>kt(F,_t)}
        >
          <option value="" ?selected=${!Je.includes(Le)}>
            ${he}
          </option>
          ${Je.map(_t=>l`<option value=${_t} ?selected=${Le===_t}>${_t}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function Ht(p){return x?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${R}
            @input=${be}
            @keydown=${$=>J($,Oe,Ee,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Oe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ee}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ce}
        >
          ✎
        </button>
      </div>
    `}function Pt(p){let $=ut(p.created_at),k=ut(p.updated_at);return!$&&!k?l``:l`
      ${$?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
    `}function Wt(p,$){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ie}
        >
          ${Fd.map(k=>l`<option value=${k} ?selected=${k===p}>${k}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${je}
        >
          ${qd.map(k=>l`<option value=${String(k)} ?selected=${k===$}>
                P${k}
              </option>`)}
        </select>
      </div>
    `}function Z(p){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ce}
            >
              ✎
            </button>`}
      </div>
      ${y?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${W}
              @input=${u}
              @keydown=${$=>J($,D,b,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${D}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${b}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(p){let $=typeof p.notes=="string"?p.notes:"";return $.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function B(p){let $=Array.isArray(p.labels)?p.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(k=>l`<span class="detail-label-chip"
              >${k}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${k}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+k}
                @click=${()=>ct(k)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${j}
            @input=${qe}
            @keydown=${Qe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Be}
          >
            추가
          </button>
        </span>
      </div>
    `}function f(){if(!d)return l``;let p=_||{},$=String(p.id||d),k=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=p.status||"open",he=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",Je=p.description||"",Le={...p,metadata:{...p.metadata||{},...h}};return l`
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
            ${$}
          </button>
          ${Ht(k)} ${Wt(F,he)}
          ${Pt(p)} ${Z(Je)}
          ${Ia(U,L,{expanded:oe,draft:H,sending:ne,error:O})}
          ${v(p)} ${B(p)} ${yt(p)}
          ${fe(p)} ${Mt(p)}
          ${Ta(p,Ze)}
          ${dt()}
          ${Fa(Le,nt,De(),Ge())}
          ${za({expanded:pe,loading:Pe,error:te,data:_e},{onToggle:g})}
          ${Ua(T(),Ne,{total:A(),expanded:z})}
        </div>
      </div>
    `}function m(){Te(f(),e)}return{load(p){p!==d&&(h={},w="",Q(),me(),Se()),d=p,_=null,He()},clear(){d=null,_=null,h={},w="",E=!1,Q(),me(),Se(),ye.close(),we.close(),Te(l``,e)},destroy(){Xe&&(Xe(),Xe=null),Fe&&(Fe(),Fe=null),pt&&(pt(),pt=null),document.removeEventListener("keydown",ft),ye.destroy(),Y.parentNode&&Y.parentNode.removeChild(Y),we.destroy(),K.parentNode&&K.parentNode.removeChild(K),d=null,_=null,w="",E=!1,me(),Se(),Te(l``,e)}}}var Bd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Wa(e,t){return Zn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ud(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function ja(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(C){let O=r.get();if(O)try{let H=await n("display-policy-set",{expected_revision:O.revision,policy:C(O)});i(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:C(H.policy)}),i(H)),H&&H.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(C){C&&C.policy&&typeof C.policy=="object"&&r.set(C.policy)}function d(C){let O=r.get();if(!O)return;let H=Wa(C,O)!=="shown";c(ne=>Ud(C,ne,H))}function _(){let C=a.trim();C.length!==0&&(a="",c(O=>O.hidden_prefixes.includes(C)?{hidden_prefixes:O.hidden_prefixes}:{hidden_prefixes:[...O.hidden_prefixes,C]}),R())}function h(C){c(O=>({hidden_prefixes:O.hidden_prefixes.filter(H=>H!==C)}))}function w(C){let O=r.get();if(!O)return;let H=O.chips[C]===!1;c(()=>({chips:{[C]:H}}))}function E(C){let O=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${O.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${O.map(H=>{let ne=Wa(H,C);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ne}`}
                  data-label=${H}
                  data-state=${ne}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function x(C){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${C.hidden_prefixes.map(O=>l`<span class="display-settings__prefix">
                ${O}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${O} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>h(O)}
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
            @input=${O=>{a=String(O.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function y(C){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Bd.map(([O,H])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${O}
                  .checked=${C.chips[O]!==!1}
                  @change=${()=>w(O)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function R(){let C=r.get();Te(l`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${I}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${C?l`${E(C)} ${x(C)}
                ${y(C)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let W=!1,j=()=>{W=!1};o.addEventListener("close",j),o.addEventListener("cancel",j);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{W&&R()}));function U(){W||(a="",W=!0,R(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function I(){W&&(W=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:U,close:I,destroy(){W=!1,o.removeEventListener("close",j),o.removeEventListener("cancel",j),Q&&(Q(),Q=null),o.remove()}}}function Ga(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,_,h="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let w=typeof h=="string"?h.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function Ya(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Va(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var zd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ka=160;function Hd(e){return e.length>Ka?`${e.slice(0,Ka)}\u2026`:e}function Cn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let c=null,i=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function _(){let g=d();return typeof g.revision=="number"?g.revision:0}function h(){let g=d().exec_defaults;return g&&typeof g=="object"?g:{}}function w(){let g=n?n.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function E(g){n&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&n.set({revision:g.revision,presets:g.presets})}function x(g){g&&g.queue&&r&&r.set(g.queue)}async function y(g,T){if(!s)return;let A={key:g,value:T||null};try{let z=await s("worker-queue-set-exec-default",{...A,expected_revision:_()});x(z),z&&z.conflict&&(z=await s("worker-queue-set-exec-default",{...A,expected_revision:_()}),x(z)),z&&z.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function R(){return d().runner_catalog??null}function W(g){let{key:T}=g;return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${Tn(T)}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${T}`}
        data-key=${T}
        ?disabled=${g.disabled}
        @change=${A=>{y(T,A.target.value)}}
      >
        ${Wr(g.groups,g.selected,An[T]||"(\uAE30\uBCF8)")}
      </select>
      ${g.runner?l`<span class="exec-defaults__runner" data-runner-for=${T}
            >${g.runner}</span
          >`:""}
    </div>`}function j(g){c={id:g.id,name:g.name,settings:{...g.settings||{}}},i=!1,te()}function Q(){c={id:null,name:"",settings:{}},i=!1,te()}function U(g){let T=g&&g.settings&&typeof g.settings=="object"?g.settings:{},A=z=>typeof T[z]=="string"?T[z]:"";return cr({selectedOf:A,effectiveOf:A,runner_catalog:R()}).some(z=>z.groups.some(V=>V.options.some(ie=>ie.value===z.selected&&ie.label.endsWith("(\uBE44\uD638\uD658)"))))}function I(g){let T=g&&g.settings&&typeof g.settings=="object"?g.settings:{},A=jr.filter(ie=>typeof T[ie]=="string").length,V=["orchestration_model","spec_review_model","plan_review_model","impl_review_model","impl_model"].filter(ie=>typeof T[ie]=="string").map(ie=>`${ws[ie]?.title||ie}: ${T[ie]}`);return{count:`${A}/10 \uC9C0\uC815`,choices:V.length>0?V.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function C(g){if(!s||!window.confirm(`\u201C${g.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let T=w();if(T)try{let A=await s("exec-preset-delete",{expected_revision:T.revision,id:g.id});E(A),A&&A.conflict&&X("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function O(g=!1){if(!s||!c)return;let T=w();if(!T)return;let A=g||c.id===null,z={expected_revision:T.revision,...A?{}:{id:c.id},name:c.name,settings:{...c.settings}};try{let V=await s(A?"exec-preset-create":"exec-preset-update",z);if(E(V),V&&V.conflict){i=!0,te();return}if(V&&V.applied){c=null,i=!1,te();return}X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function H(g){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Tn(g.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${g.key}
        ?disabled=${g.disabled}
        @change=${T=>{if(!c)return;let A=T.target.value;A?c.settings[g.key]=A:delete c.settings[g.key],i=!1,te()}}
      >
        ${Wr(g.groups,g.selected,An[g.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ne(){if(!c)return"";let g=V=>typeof c?.settings[V]=="string"?c.settings[V]:"",T=cr({selectedOf:g,effectiveOf:g,runner_catalog:R()}),A=w(),z=c.id!==null&&A!==null&&!A.presets.some(V=>V.id===c?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${c.name}
          data-preset-name
          @input=${V=>{c&&(c.name=V.target.value,i=!1)}}
        />
      </label>
      ${i?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${z?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${T.map(H)}
      <div class="exec-preset-editor__actions">
        ${z?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{O(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{O(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{c=null,i=!1,te()}}
        >
          취소
        </button>
      </div>
    </div>`}function de(){let g=w();return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Q}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${g===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:g.presets.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:g.presets.map(T=>{let A=I(T);return l`<article
                class="exec-preset-card"
                data-preset-id=${T.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${T.name}</strong>
                  <span>${A.count}</span>
                  ${U(T)?l`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${A.choices}</small>
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${T.id}
                    @click=${()=>j(T)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${T.id}
                    @click=${()=>{C(T)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${ne()}
    </section>`}function oe(){let g=d().workspace_info;return g&&typeof g=="object"?g:{}}function me(g,T){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${g}"
      >${T}</span
    >`}function xe(g){let T=g?Va(g.cmd):"",A=g?Ya(g.timeout_ms):"",z=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${T?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${T}</span>
            ${me("config","config")}
            ${A?l`<span class="exec-defaults__vd-meta"
                  >timeout ${A}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Ve(g){let T=g?Va(g.cmd):"",A=g?Ya(g.timeout_ms):"",z=A?`timeout ${A} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",V=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${T?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${T}</span>
            ${me("config","config")}
            ${g.detached===!0?me("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${z}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function We(g){if(!g||typeof g!="object")return"";let T=zd[String(g.outcome)];if(!T)return"";let A=g.outcome==="failed"&&g.reason?`${T.label} \xB7 ${g.reason}`:T.label,z=[ut(g.at),typeof g.bead_id=="string"?g.bead_id:"",typeof g.base_sha=="string"?g.base_sha.slice(0,7):""].filter(ue=>ue.length>0).join(" \xB7 "),V=typeof g.detail=="string"&&g.detail.length>0?Hd(g.detail):"",ie=typeof g.log_path=="string"&&g.log_path.length>0?g.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${me(T.modifier,A)}
        ${z?l`<span class="exec-defaults__vd-meta">${z}</span>`:""}
      </div>
      ${V?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${V}</code>
          </div>`:""}
      ${ie?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ie}</code>
          </div>`:""}
    </div>`}let Ae=!1,ae=!1,L=!1,Y=null;async function ye(){if(s){ae=!0,L=!1,te();try{let g=await Promise.resolve(s("get-worker-system-prompt",{}));!g||typeof g!="object"||Array.isArray(g)?L=!0:Y=g}catch{L=!0}finally{ae=!1,te()}}}function K(){if(Ae=!Ae,Ae&&!Y){ye();return}te()}function we(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Ae?"true":"false"}
          @click=${K}
        >
          ${Ae?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Ae?pe():""}
    </section>`}function pe(){let g=yr({loading:ae,error:L});if(g)return g;if(!Y)return"";let T=Array.isArray(Y.variants)?Y.variants:[];return l`<div class="exec-defaults__sp-body">
      ${Y.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${Y.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${T.map(A=>l`<div class="exec-defaults__sp-variant" data-variant=${A.key}>
            <div class="exec-defaults__sp-cond">${A.condition}</div>
            ${zt(A.label,A.system_prompt)}
          </div>`)}
    </div>`}function Pe(g){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${xe(g.verify_cmd)} ${Ve(g.deploy_cmd)}
      ${We(g.last_deploy)}
    </section>`}function te(){let g=h(),T=z=>typeof g[z]=="string"?g[z]:"",A=cr({selectedOf:T,effectiveOf:T,runner_catalog:R()});Te(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${ke}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${de()}
            <section class="exec-defaults__workspace">
              <h3>현재 워크스페이스 기본값</h3>
              <p class="exec-defaults__hint">
                현재 워크스페이스에만 적용됩니다. bead metadata가 우선하며,
                '(기본: …)'은 이 전역값도 미설정일 때 실제 적용되는
                하드코딩·CLI·워크플로 기본입니다.
              </p>
              ${A.map(z=>W(z))}
            </section>
            ${Pe(oe())}
            ${we()}
          </div>
        </div>
      `,a)}let _e=!1,N=()=>{_e=!1};a.addEventListener("close",N),a.addEventListener("cancel",N);let P=null;r&&r.subscribe&&(P=r.subscribe(()=>{_e&&te()}));let re=null;n&&n.subscribe&&(re=n.subscribe(()=>{_e&&te()}));function Se(){_e||(_e=!0,te(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function ke(){_e&&(_e=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Se,close:ke,destroy(){_e=!1,a.removeEventListener("close",N),a.removeEventListener("cancel",N),P&&(P(),P=null),re&&(re(),re=null),a.remove()}}}function kr(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${ut(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ks(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Tt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?wt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=l`<span class="worker-mini__title">${e.title}</span>`,w=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",E=r.map(C=>C===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${C}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${C}</span
        >`),x=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",y=n?l`<span class="worker-usage" title=${vr(e.usage)}
        >${n}</span
      >`:"",R=s?l`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",W=e.merge_action?l`<button
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
      </button>`:"",Q=e.discard_action?l`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",U=e.revise_action?l`<button
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
        </button>`:"",I=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return l`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?l`<div class="worker-mini__row1">${d}${_}${h}</div>
          <div class="worker-mini__row2">
            ${y}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ut(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${E}${R}
            <span class="worker-mini__actions"
              >${W}${j}${Q}</span
            >
            ${kr(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${_}${w}${E}${x}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${I?l`<div class="worker-mini__foot">
                  ${y}${R}
                  <span class="worker-mini__actions"
                    >${W}${j}${Q}${U}</span
                  >
                </div>`:""}
            ${kr(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${_}${h}${w}${E}${x}${y}${R}${W}${j}${Q}
            </div>
            ${kr(e)}`}
  </div>`}function Wd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
    ${r?dn(r,e.status):""}
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
    ${kr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Wd(n):ks(n))}
          </div>`}
  </section>`}var Za=160;function $s(e){return e.length>Za?`${e.slice(0,Za)}\u2026`:e}function jd(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${$s(e.command)}</code>`:""}
  </div>`}function Gd(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Yd(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function xs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Vd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
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
          남은 작업: <code>${$s(e.detail)}</code>
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
  </div>`}function Xa(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
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
          ${jd(e.failure.cause_detail)}
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
                <code>${$s(r.detail)}</code>
              </div>`:""}
          ${Yd(r.log_path)} ${Gd(r.output_tail)}
        </div>`)}
    ${Vd(e.shipFailure)}
  </div>`}function Kd(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?xs(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=Tt(e.usage),c=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return l`<div
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
          ${a?l`<span class="worker-usage" title=${vr(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ss(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Kd(s,t,r))}
  </div>`}function Zt(e){return l`<svg
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
  </svg>`}function As(){return Zt(Nt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ts(){return Zt(Nt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Es(){return Zt(Nt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Qa(){return Zt(Nt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Ja(){return Zt(Nt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function ei(){return Zt(Nt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function ti(){return Zt(Nt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ri(){return Zt(Nt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Gr=1,Zd=6e4,Xd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Qd=new Set(["auto_merge","merged","merge","done"]),ni={running:3,paused:2,failed:1};function Jd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function eu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let h=t.get(a.bead_id),w=typeof h=="number"&&h>0&&typeof a.finished_at=="number"&&h>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!w&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let h=ni[d.run_state],w=ni[c];if(h>w||h===w&&(d.started_at??0)>(i??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Dt(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function si(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function Cs(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let y of s)y&&typeof y.root_dir=="string"&&a.set(y.root_dir,y);let c=[],i=[],d=[],_=[],h=[],w=new Map;for(let y of n){if(!y||typeof y.root_dir!="string")continue;let R=y.root_dir,W=y.name||R,j=a.get(R),Q=j&&typeof j.revision=="number"?j.revision:typeof y.revision=="number"?y.revision:0,U=St(y.attempts),I=St(y.bead_titles),C=St(y.pr_observations),O=St(y.admission),H=St(y.revise_parked),ne=St(y.merge_queue_state),de=St(y.cleanup_failed),oe=Array.isArray(y.merge_queue)?y.merge_queue:[],me=new Set(oe.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),xe=Array.isArray(y.queue)?y.queue:[],Ve=Array.isArray(y.done)?y.done:[],We=new Map;for(let L of Ve)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&We.set(L.bead_id,L.added_at);let Ae=L=>({id:L,title:I[L]||L,root_dir:R,workspace_name:W,expected_revision:Q,draggable:!1}),ae=new Set;for(let[L,Y]of eu(U,We))ae.add(L),i.push({...Ae(L),lane:"running",attempt_id:Y.attempt_id,run_state:Y.run_state,can_pause:Y.can_pause,can_resume:Y.can_resume,started_at:Y.started_at,last_event_at:Y.last_event_at,model:Y.model,usage:Y.usage,badges:Y.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:Y.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:Y.run_state==="failed"});for(let L of Array.isArray(y.pr_wait)?y.pr_wait:[]){let Y=L&&L.bead_id;if(typeof Y!="string"||ae.has(Y))continue;ae.add(Y);let ye=St(C[Y]),K=St(ye.pr),we=ye.gate?St(ye.gate):null,pe=me.has(Y),Pe=ne.active===Y,te=L.external===!0,_e=de[Y]||null,N=!!we&&we.base_badge==="\uCDA9\uB3CC",P=!!_e&&!!we&&we.tier==="merged",re=te&&!!we&&we.tier==="merged";d.push({...Ae(Y),lane:"pr_wait",pr_number:typeof K.number=="number"?K.number:null,pr_url:typeof K.url=="string"?K.url:void 0,external:te,usage:Dt(U,Y),badges:_e?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!_e,reason:_e?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!pe,merge_enabled:we?.enabled===!0||N||P||re,merge_label:re?"\uC815\uB9AC":N&&!P?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:re?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":P?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":N?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:pe,cancel_enabled:!Pe,discard_action:!te&&!_e&&!(we&&we.tier==="merged"),discard_enabled:!Pe&&!pe,discard_title:pe?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<xe.length;L++){let Y=xe[L],ye=Y&&Y.bead_id;if(typeof ye!="string"||ae.has(ye))continue;ae.add(ye);let K=H[ye],we={...Ae(ye),lane:"queue",reason:si(O,ye),queue_position:L+1,queue_index:L,queue_length:xe.length,badges:K?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!K,revise_action:!!K,revise_enabled:!!K,revise_title:K?K.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${K.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(we);let pe=w.get(R);pe?pe.push(we):w.set(R,[we])}for(let L of Array.isArray(y.runnable)?y.runnable:[]){let Y=L&&L.bead_id;typeof Y!="string"||ae.has(Y)||(ae.add(Y),c.push({...Ae(Y),title:L.title||I[Y]||Y,lane:"runnable",draggable:!0,reason:si(O,Y),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:xe.length}))}for(let L of Ve){let Y=L&&L.bead_id;if(typeof Y!="string"||ae.has(Y)||(ae.add(Y),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let ye=Jd(U,Y);h.push({...Ae(Y),lane:"done",done:!0,usage:Dt(U,Y),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:ye&&typeof ye.done_kind=="string"?ye.done_kind:null})}}i.sort((y,R)=>(R.last_event_at??0)-(y.last_event_at??0)),h.sort((y,R)=>(R.done_at??0)-(y.done_at??0));let E=s.length>0?s:n.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,exec_defaults:y&&y.exec_defaults,runner_catalog:y&&y.runner_catalog})),x=[];for(let y of E)!y||typeof y.root_dir!="string"||x.push({root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:typeof y.slots=="number"&&y.slots>=Gr?y.slots:Gr,revision:typeof y.revision=="number"?y.revision:0,exec_defaults:St(y.exec_defaults),runner_catalog:St(y.runner_catalog),items:w.get(y.root_dir)||[]});return{runnable:c,queue:_,queue_groups:x,running:i,pr_wait:d,done:h,automation:{total:x.length,both_on:x.filter(y=>y.auto_advance&&y.auto_merge).length}}}function tu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Zd;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ut(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${wt(e,t)}</span
        >`}</span
  >`}function Yr(e){return l`<div class="mon-c__title">${e.title}</div>`}function Vr(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Rn(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Rs(e){let t=Tt(e.usage);return t?l`<span class="mon-c__usage" title=${vr(e.usage)}
        >${t}</span
      >`:""}function Is(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function ru(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ts()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${As()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Es()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Qa()}
        </button>`:""}
  </span>`}function nu(e,t){let r=typeof e.started_at=="number"?xs(t-e.started_at):"";return l`${Yr(e)}
    <div class="mon-c__meta">
      ${Is(e)}${tu(e.last_event_at,t)}${Vr(e)}${Rn(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Rs(e)}${ru(e)}
    </div>`}function su(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=wt(e.updated_at);return l`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Vr(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${cn(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${Rn(e)}
      ${o?l`<span title=${`\uC218\uC815 ${ut(e.updated_at)}`}
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
    </div>`}function ou(e){return l`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Vr(e)}
      ${Is(e)}
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
        </div>`:""}`}function au(e){let t=!!(Tt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${Yr(e)}
    <div class="mon-c__meta">
      ${Vr(e)}${Rn(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Is(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${Rs(e)}
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
        </div>`:""}`}function iu(e,t){let r=e.done_kind||"",n=r?Xd[r]||r:"",s=wt(e.done_at,t);return l`${Yr(e)}
    <div class="mon-c__meta">
      ${Vr(e)}${Rn(e)}
      ${n?l`<span
            class="mon-live__kind${Qd.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Rs(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ut(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function oi(e,t){return e.lane==="running"?nu(e,t):e.lane==="runnable"?su(e):e.lane==="queue"?ou(e):e.lane==="pr_wait"?au(e):iu(e,t)}function ai(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?Ts():As()}
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
        ${Ja()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${ei()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${Gr}
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
        ${ti()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function ii(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Lt.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Es():ri()}
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
  </div>`}function li(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ci(e){let t={};for(let a of qt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of qt){let _=c[d];typeof _=="number"&&Number.isFinite(_)&&(t[d]+=_,r=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?Tt(t):null}var ui="bdui.monitor.done-range";function lu(){try{let e=window.localStorage.getItem(ui);return Ft(e)?e:$t}catch{return $t}}function cu(e){try{window.localStorage.setItem(ui,e)}catch{}}var pi="tab:monitor:pipeline",du=1e3,uu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function di(e,t){let r=e.lane==="runnable"||e.lane==="queue";return l`<div
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
    ${oi(e,t)}
  </div>`}function fi(e,t){let r=Ke("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,c=t.getWorkspacePath,i=t.switchWorkspace,d=t.now||(()=>Date.now()),_=t.confirm||(g=>typeof globalThis.confirm!="function"||globalThis.confirm(g)),h=lu();function w(){let g=Lt.find(T=>T.value===h);return g?g.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let x=Cs(null,null),y=null,R=new Map,W=new Set;function j(g){return x.queue_groups.find(T=>T.root_dir===g)||null}let U=Cn(e,{queueStore:{get(){if(!y)return{revision:0,exec_defaults:{}};let g=R.get(y);if(g)return g;let T=j(y),A=s&&s.get?s.get():null,z=(Array.isArray(A)?A:[]).find(V=>V&&V.root_dir===y);return{revision:T?T.revision:0,exec_defaults:T?T.exec_defaults:{},runner_catalog:T?T.runner_catalog:null,workspace_info:z?z.workspace_info:void 0}},set(g){y&&R.set(y,g);for(let T of Array.from(W))T()},subscribe(g){return W.add(g),()=>W.delete(g)}},presetStore:a,transport:o?(g,T)=>o(g,g==="worker-queue-set-exec-default"||g==="get-worker-system-prompt"?{...T||{},root_dir:y}:T):void 0,getWorkspacePath:()=>y||void 0}),I=null,C=null;async function O(g,T,A,z){if(!o||!A)return null;let V=await o(g,{...T,root_dir:A,expected_revision:z});if(V&&V.conflict){let ie=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:z;V=await o(g,{...T,root_dir:A,expected_revision:ie})}return V&&V.queue&&A&&R.set(A,V.queue),V}async function H(g,T,A){return!o||!A?null:await o(g,{...T,root_dir:A})}async function ne(g){if(!o||!g&&!_("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let T=await o("monitor-auto-toggle",{on:g}),A=T&&Array.isArray(T.failed)?T.failed:[];A.length>0&&X(`\uC790\uB3D9\uD654 ${g?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${A.map(z=>z.root_dir).join(", ")}`,"error",3200)}async function de(){let g=new Map;for(let T of x.pr_wait)g.has(T.root_dir)||g.set(T.root_dir,T.expected_revision);for(let[T,A]of g)await O("worker-merge-queue-add-all",{},T,A)}let oe=null,me=!1,xe=null;function Ve(){xe!==null&&clearTimeout(xe),xe=setTimeout(()=>{xe=null,me=!1},0)}function We(g){let T=g.target;return typeof T?.closest=="function"?T.closest(".mon-group"):null}function Ae(g){let T=We(g);return!T||!oe?null:(T.getAttribute("data-root-dir")||"")===oe.root_dir?T:null}function ae(){for(let g of Array.from(E.querySelectorAll(".mon-group--drag-over")))g.classList.remove("mon-group--drag-over")}function L(g){let T=g.target,A=typeof T?.closest=="function"?T.closest('.mon-card[draggable="true"]'):null;if(A){oe={bead_id:A.getAttribute("data-issue-id")||"",lane:A.getAttribute("data-lane")||"",root_dir:A.getAttribute("data-root-dir")||"",revision:Number(A.getAttribute("data-revision")||0)||0,queue_index:Number(A.getAttribute("data-queue-index")),queue_length:Number(A.getAttribute("data-queue-length")),place_index:Number(A.getAttribute("data-place-index"))},me=!0;try{g.dataTransfer?.setData("text/plain",oe.bead_id),g.dataTransfer&&(g.dataTransfer.effectAllowed="move")}catch{}}}function Y(g){let T=Ae(g);T&&(g.preventDefault(),g.dataTransfer&&(g.dataTransfer.dropEffect="move"),T.classList.add("mon-group--drag-over"))}function ye(g){We(g)?.classList.remove("mon-group--drag-over")}function K(){oe=null,ae(),Ve()}function we(g){let T=Ae(g),A=oe;if(oe=null,ae(),!T||!A||!A.bead_id)return;g.preventDefault();let z=g.target,V=typeof z?.closest=="function"?z.closest('.mon-card[data-lane="queue"]'):null,ie=V&&T.contains(V)?Number(V.getAttribute("data-queue-index")):NaN;if(A.lane==="runnable"){let De=Number.isFinite(ie)?ie:A.place_index;if(!Number.isFinite(De))return;O("worker-queue-place",{bead_id:A.bead_id,index:De},A.root_dir,A.revision);return}if(A.lane!=="queue"||V&&V.getAttribute("data-issue-id")===A.bead_id)return;let ue=A.queue_index,Ne=Number.isFinite(ie)?ue>ie?ie:ie-1:A.queue_length-1;!Number.isFinite(Ne)||Ne<0||Ne===ue||O("worker-queue-reorder",{bead_id:A.bead_id,to_index:Ne},A.root_dir,A.revision)}function pe(g){let T={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return l`${ii({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},done_range:h,token_total:ci(x.done),token_tooltip:li(w())})}
      <div class="worker-lanes mon-lanes">
        ${uu.map(A=>{let z=T[A.lane],V=A.lane==="queue"?x.queue_groups.length>0?l`${x.queue_groups.map(ie=>l`<div
                        class="mon-group"
                        data-root-dir=${ie.root_dir}
                      >
                        ${ai(ie)}
                        <div class="mon-group__list">
                          ${ie.items.map(ue=>di(ue,g))}
                        </div>
                      </div>`)}`:void 0:z.length>0?l`${z.map(ie=>di(ie,g))}`:void 0;return Ot({id:`monitor-${A.lane}`,lane:A.pane,title:A.lane==="done"?`\uC644\uB8CC\xB7${w()}`:A.title,items:z,empty:A.empty,body:V,live:A.lane==="running"&&z.length>0,header_control:A.lane==="pr_wait"&&z.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Pe(){let g=s&&s.get?s.get():null,T=s&&s.getWorkspacesState?s.getWorkspacesState():[],A=d();x=Cs(g,T,{done_since:pr(h,A)}),Te(pe(A),E)}function te(g,T){let A=c?c():void 0;if(!T||!A||T===A||!i){n(g);return}i(T).then(()=>{n(g)}).catch(z=>{r("workspace switch for %s failed: %o",T,z)})}function _e(g){return{root_dir:g.getAttribute("data-root-dir")||"",revision:Number(g.getAttribute("data-revision")||0)||0}}function N(g,T){let{root_dir:A,revision:z}=_e(g),V=g.getAttribute("data-issue-id")||"",ie=g.getAttribute("data-attempt-id")||"",ue=T.classList;if(ue.contains("worker-card__place")){O("worker-queue-place",{bead_id:V,index:Number(g.getAttribute("data-place-index")||0)||0},A,z);return}if(ue.contains("mon-op--up")||ue.contains("mon-op--down")){let Ne=Number(g.getAttribute("data-queue-index")||0)||0,De=ue.contains("mon-op--up")?Ne-1:Ne+1;if(De<0)return;O("worker-queue-reorder",{bead_id:V,to_index:De},A,z);return}if(ue.contains("mon-op--remove")){O("worker-queue-remove",{bead_id:V},A,z);return}if(ue.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:ie},A);return}if(ue.contains("mon-op--stop")){H("worker-attempt-stop",{attempt_id:ie},A);return}if(ue.contains("mon-op--resume")){O("worker-attempt-resume",{attempt_id:ie},A,z);return}if(ue.contains("mon-op--dismiss")){O("worker-attempt-dismiss",{attempt_id:ie},A,z);return}if(ue.contains("worker-mini__merge")){O("worker-merge-queue-add",{bead_id:V},A,z);return}if(ue.contains("worker-mini__merge-cancel")){O("worker-merge-queue-remove",{bead_id:V},A,z);return}if(ue.contains("worker-mini__discard")){if(!_(`${V}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;O("worker-pr-discard",{bead_id:V},A,z);return}if(ue.contains("worker-mini__revise-fix")){O("worker-revise-fix",{bead_id:V},A,z);return}ue.contains("worker-mini__revise-approve")&&O("worker-revise-approve",{bead_id:V},A,z)}function P(g){let T=me;me=!1;let A=g.target;if(!A||typeof A.closest!="function"||A.closest("dialog")||A.closest("a"))return;let z=A.closest(".mon-auto-all");if(z){g.preventDefault(),ne(z.getAttribute("data-on")==="true");return}if(A.closest(".mon-merge-all")){g.preventDefault(),de();return}let ie=A.closest(".mon-ctl--advance");if(ie){g.preventDefault();let{root_dir:st,revision:ot}=_e(ie);O("worker-queue-toggle",{on:ie.getAttribute("data-on")==="true"},st,ot);return}let ue=A.closest(".mon-ctl--merge-auto");if(ue){g.preventDefault();let{root_dir:st,revision:ot}=_e(ue);O("worker-merge-auto-toggle",{on:ue.getAttribute("data-on")==="true"},st,ot);return}let Ne=A.closest(".mon-ctl--exec");if(Ne){g.preventDefault(),y=Ne.getAttribute("data-root-dir")||null,R.delete(y||""),U.open();return}let De=A.closest(".mon-card");if(!De)return;let Ge=A.closest("button");if(Ge){g.preventDefault(),N(De,Ge);return}let tt=De.getAttribute("data-issue-id");tt&&!T&&(g.preventDefault(),te(tt,De.getAttribute("data-root-dir")||""))}function re(g){let T=g.target;if(!T||typeof T.closest!="function")return;let A=T.closest(".mon-done-range");if(A){h=Ft(A.value)?A.value:$t,cu(h),Pe();return}let z=T.closest(".mon-slots__input");if(!z)return;let{root_dir:V,revision:ie}=_e(z),ue=Number(z.value);if(!Number.isFinite(ue))return;let Ne=Math.max(Gr,Math.floor(ue));O("worker-queue-set-slots",{slots:Ne},V,ie)}e.addEventListener("click",P),e.addEventListener("change",re),e.addEventListener("dragstart",L),e.addEventListener("dragover",Y),e.addEventListener("dragleave",ye),e.addEventListener("drop",we),e.addEventListener("dragend",K),s&&typeof s.subscribe=="function"&&(I=s.subscribe(()=>{try{R.clear(),Pe();for(let g of Array.from(W))g()}catch{}}));function Se(){C!==null&&(clearInterval(C),C=null)}function ke(){xe!==null&&(clearTimeout(xe),xe=null)}return{load(){r("load"),Pe(),C===null&&(C=setInterval(()=>{try{Pe()}catch{}},du))},pause(){Se()},clear(){Se(),ke(),I&&(I(),I=null),e.removeEventListener("click",P),e.removeEventListener("change",re),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",Y),e.removeEventListener("dragleave",ye),e.removeEventListener("drop",we),e.removeEventListener("dragend",K),U.destroy(),W.clear(),e.replaceChildren()}}}function _i(e,t,r){let n=Ke("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
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
    `}function c(){Te(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Te(l``,e)}}}var mi=["bug","feature","task","epic","chore"];function gi(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var hi=["Critical","High","Medium","Low","Backlog"];function bi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),h=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let I=document.createElement("option");I.value="",I.textContent="\u2014 Select \u2014",o.appendChild(I);for(let C of mi){let O=document.createElement("option");O.value=C,O.textContent=gi(C),o.appendChild(O)}a.replaceChildren();for(let C=0;C<=4;C+=1){let O=document.createElement("option");O.value=String(C);let H=hi[C]||"Medium";O.textContent=`${C} \u2013 ${H}`,a.appendChild(O)}}E();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function y(I){s.disabled=I,o.disabled=I,a.disabled=I,c.disabled=I,i.disabled=I,_.disabled=I,h.disabled=I,h.textContent=I?"Creating\u2026":"Create"}function R(){d.textContent=""}function W(I){d.textContent=I}function j(){try{let I=window.localStorage.getItem("beads-ui.new.type");I?o.value=I:o.value="";let C=window.localStorage.getItem("beads-ui.new.priority");C&&/^\d$/.test(C)?a.value=C:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let I=o.value||"",C=a.value||"";I.length>0&&window.localStorage.setItem("beads-ui.new.type",I),C.length>0&&window.localStorage.setItem("beads-ui.new.priority",C)}async function U(){R();let I=String(s.value||"").trim();if(I.length===0){W("Title is required"),s.focus();return}let C=Number(a.value||"2");if(!(C>=0&&C<=4)){W("Priority must be 0..4"),a.focus();return}let O=String(o.value||""),H=String(i.value||""),ne={title:I};O.length>0&&(ne.type=O),String(C).length>0&&(ne.priority=C),H.length>0&&(ne.description=H),y(!0);try{await t("create-issue",ne)}catch{y(!1),W("Failed to create issue");return}Q(),y(!1),x()}return r.addEventListener("cancel",I=>{I.preventDefault(),x()}),w.addEventListener("click",()=>x()),_.addEventListener("click",()=>x()),r.addEventListener("keydown",I=>{I.key==="Enter"&&(I.ctrlKey||I.metaKey)&&(I.preventDefault(),U())}),n.addEventListener("submit",I=>{I.preventDefault(),U()}),{open(){n.reset(),R(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var pu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function vi(e){return String(e).padStart(2,"0")}function fu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function _u(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${vi(n.getHours())}:${vi(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${pu[n.getMonth()]} ${n.getDate()} ${o}`;return`${fu(r,t)} \xB7 ${c}`}function mu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function yi(e){let t=!1,r=null;function n(){Te(l``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let a=await o.json();if(t)return;if(!a||a.available!==!0||!Array.isArray(a.windows)){n();return}let c=typeof a.ageSeconds=="number"&&a.ageSeconds>600,i=c?`${Math.floor(a.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Te(l`<div
          class="usage-meter${c?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${a.windows.map(_=>{let h=typeof _.pct=="number"&&Number.isFinite(_.pct)?_.pct:0,w=Math.min(100,Math.max(0,h)),x=`resets ${_u(_.resetsAt,d)}${c?` \xB7 ${i}`:""}`;return l`<span
              class="usage-meter__window ${mu(h)}"
              style=${`--progress: ${w}%`}
              title=${x}
            >
              <span class="usage-meter__label">${_.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${h}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var gu="tab:worker:ready",hu="tab:worker:blocked",bu="tab:worker:in-progress",In=1;function Os(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var xi="beads-ui.worker.candidate-filter",Ls={show_blocked:!1,spec:"all"};function vu(){try{let e=window.localStorage.getItem(xi);if(!e)return{...Ls};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Ls};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Ls}}}function yu(e){try{window.localStorage.setItem(xi,JSON.stringify(e))}catch{}}function wu(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=r(c),d=n(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ku=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Si="bdui.worker.candidate_sort",$u=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ln="spec";function xu(){try{let e=window.localStorage.getItem(Si);return e==="board"||e==="created"||e==="spec"?e:Ln}catch{return Ln}}function Su(e){try{window.localStorage.setItem(Si,e)}catch{}}var Ai="bdui.worker.done-range";function Au(){try{let e=window.localStorage.getItem(Ai);return Ft(e)?e:$t}catch{return $t}}function Tu(e){try{window.localStorage.setItem(Ai,e)}catch{}}var Eu="(max-width: 640px)",Ti="beads-ui.worker.lane-collapsed",Kr={queue:!0,done:!0};function Cu(){try{let e=window.localStorage.getItem(Ti);if(!e)return{...Kr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kr}:{queue:typeof t.queue=="boolean"?t.queue:Kr.queue,done:typeof t.done=="boolean"?t.done:Kr.done}}catch{return{...Kr}}}function Ru(e){try{window.localStorage.setItem(Ti,JSON.stringify(e))}catch{}}function wi(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Iu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(nr):(n.sort(rn(r)),t==="board"?n:[...n.filter(Os),...n.filter(s=>!Os(s))])}function Lu(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Du(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ou(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Mu=["closed_unmerged","undecidable"],Pu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Nu(e,t){for(let r of Pu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Ds=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Fu(e){if(typeof e!="string"||e.length===0)return null;let t=Ds.length,r=Ds.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Ds[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function ki(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function $i(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function qu(e,t,r,n,s=null,o=null,a=null,c=!1,i=null,d=!0,_=null,h=null){let w=!!i&&i.position>0,E=!!i&&i.active===!0,x=i&&i.failure||null,y=r[e]||null,R=y&&y.gate?y.gate:null,W=y&&y.pr?y.pr:null,j=[];c&&j.push("\uC138\uC158");let Q=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,U=Nu(c&&R&&R.tier==="closed_unmerged"?"\uB2EB\uD798":R&&R.gate_badge||"",Q?null:o&&o.activity||null);Q&&j.push(Q),U.label&&j.push(U.label),R&&R.base_badge&&R.base_badge!==R.gate_badge&&j.push(R.base_badge),h&&j.push(h),n&&j.push("\uC815\uB9AC \uC2E4\uD328"),w&&!E&&j.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),x&&j.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ki(x)}`),_&&j.push(`\uC790\uB3D9 \uC81C\uC678: ${ki(_)}`);let I=!!R&&R.base_badge==="\uCDA9\uB3CC",C=!!R&&R.enabled===!0,O=Fu(o&&o.merge_progress?o.merge_progress.step:null),H=!!n&&!!R&&R.tier==="merged",ne=c&&!!R&&R.tier==="merged",de=c&&I&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",badges:j,live_badge:a==="running"?Q:Q?null:U.live?U.label:null,usage:s,alert:!!R&&Mu.includes(R.tier)||!!n||!!x,merge_action:!w,cancel_action:w,cancel_enabled:!E,cancel_title:E?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(R&&R.tier==="merged"),merge_step:O,discard_enabled:!O&&!a&&!w,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":w?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!O&&!a&&!de&&(C||I||H||ne),merge_label:ne?"\uC815\uB9AC":I&&!O&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:O?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${O.label}`:ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":de?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":I?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":C?`\uBA38\uC9C0 (${R.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:R&&R.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${R&&R.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ms(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:i,getWorkspacePath:d}=t,_=n?sn(n,c):null,h=an({transport:r,uiOrderStore:c}),w=null,E=[],x=vu(),y=xu(),R=Au();function W(){let u=Lt.find(b=>b.value===R);return u?u.label:"\uC624\uB298"}let j=Cu(),Q=!1,U=new Set,I=new Set,C=[],O=document.createElement("div");O.className="worker-console";let H=document.createElement("div");H.className="worker-top";let ne=document.createElement("div");ne.className="worker-drawer-overlay",ne.hidden=!0;let de=document.createElement("div");de.className="worker-drawer-overlay__backdrop";let oe=document.createElement("div");oe.className="worker-drawer-host",ne.append(de,oe);let me=document.createElement("div");me.className="worker-lanes-host",O.append(H,ne,me),e.appendChild(O);let xe=null,Ve=Sn(oe,{transport:r,sessionLogStore:a,onClose:()=>{xe=null,ne.hidden=!0,Fe()}}),We=Cn(O,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Ae(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:In,queue:[],pr_wait:[],done:[]}}function ae(){let u=Ae();return typeof u.revision=="number"?u.revision:0}function L(u){u&&u.queue&&s&&s.set(u.queue)}function Y(){let u=Ae().queue;return Array.isArray(u)?u.length:0}async function ye(u,b){if(!r)return;let D=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ae()});L(D),D&&D.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:ae()}).then(L)}async function K(u,b){if(!r)return;let D=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ae()});L(D),D&&D.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:ae()}).then(L)}async function we(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:ae()});L(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:ae()}).then(L)}async function pe(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function Pe(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function te(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ae()});L(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:ae()}),L(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function _e(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ae()});L(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:ae()}),L(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function N(u,b){if(!r)return null;let D=r,J=await D(u,{...b,expected_revision:ae()});return L(J),J&&J.conflict&&(J=await D(u,{...b,expected_revision:ae()}),L(J)),J}async function P(u){if(!r||!u)return;U.add(u),Fe();let b;try{b=await N("worker-merge-queue-add",{bead_id:u})}finally{U.delete(u),Fe()}!b||b.conflict||b.applied||X("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function re(u){if(!r)return;let b=await N("worker-merge-auto-toggle",{on:u});!b||b.conflict||X(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function Se(u){if(!r||!u)return;let b=await N("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&X("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ke(){await N("worker-merge-queue-remove",{all:!0})}async function g(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let D=await r("worker-pr-discard",{bead_id:u,expected_revision:ae()});if(L(D),D&&D.conflict&&(D=await r("worker-pr-discard",{bead_id:u,expected_revision:ae()}),L(D)),D&&D.discarded===!0){X("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}D&&D.discarded===!1&&!D.conflict&&X(`\uD3D0\uAE30 \uAC70\uBD80: ${D.reason||""}`,"error",2800)}async function T(u,b){if(!r||!b||I.has(b))return;I.add(b),Fe();let D;try{D=await r(u,{bead_id:b,expected_revision:ae()}),L(D),D&&D.conflict&&(D=await r(u,{bead_id:b,expected_revision:ae()}),L(D))}finally{I.delete(b),Fe()}if(!(!D||D.conflict)){if(D.ok){X(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}X(`\uCC98\uBD84 \uAC70\uBD80: ${D.reason||""}`,"error",3e3)}}async function A(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:ae()});L(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:ae()}).then(L)}async function z(u){await A(u),await re(u)}async function V(u){if(!r||!Number.isFinite(u))return;let b=Math.max(In,Math.floor(u)),D=await r("worker-queue-set-slots",{slots:b,expected_revision:ae()});L(D),D&&D.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:ae()}).then(L)}async function ie(u){if(!r)return;let b=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:ae()});L(b),b&&b.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:ae()}).then(L)}function ue(){let u=Ae(),b=_?_.selectBoardColumn(gu,"ready"):[],D=_?_.selectBoardColumn(hu,"blocked"):[],J=_?_.selectBoardColumn(bu,"in_progress"):[],Ie=new Map;for(let S of J){let G=Du(S);if(!G)continue;let le=Ie.get(G);le?le.push(S):Ie.set(G,[S])}let je=S=>{let G=on(Ie.get(S)||[]);return G?G.title||G.id:null},qe=u.bead_titles||{},Be=new Map;for(let[S,G]of Object.entries(qe))typeof G=="string"&&G.length>0&&Be.set(S,G);for(let S of[...b,...D])Be.set(S.id,S.title||S.id);let Qe=u.bead_times||{},ct=new Map;for(let[S,G]of Object.entries(Qe))G&&typeof G=="object"&&ct.set(S,G);for(let S of[...b,...D])ct.set(S.id,{created_at:S.created_at,updated_at:S.updated_at});let Ze=S=>ct.get(S)||{},nt=u.pr_wait||[],ve=u.pr_observations||{},lt=u.pr_activity||{},yt=u.cleanup_failed||{},fe=Object.entries(yt).map(([S,G])=>({bead_id:S,step:G&&G.step?G.step:"",reason:G&&G.reason?G.reason:"",detail:G&&typeof G.detail=="string"?G.detail:null,output_tail:G&&typeof G.output_tail=="string"&&G.output_tail?G.output_tail:void 0,log_path:G&&typeof G.log_path=="string"&&G.log_path?G.log_path:void 0})),ge=u.ship_failure||null,kt=ge&&typeof ge.reason=="string"&&ge.reason?{bead_id:typeof ge.bead_id=="string"?ge.bead_id:"",reason:ge.reason,detail:typeof ge.detail=="string"?ge.detail:null,pr_url:typeof ge.pr_url=="string"?ge.pr_url:null}:null,Mt=u.queue||[],Ht=new Set([...Mt.map(S=>S.bead_id),...nt.map(S=>S.bead_id),...u.done.map(S=>S.bead_id)]),Pt=new Set(D.map(S=>S.id)),Wt=c?c.get()?.order||{}:{},Z=new Set,v=[];for(let S of[...b,...D])Ht.has(S.id)||Z.has(S.id)||Lu(S)||(Z.add(S.id),v.push(S));E=Iu(v,y,Wt);let B=u.admission||{},f=S=>{let G=B[S];if(!G)return"";if(G.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let le=typeof G.reason=="string"?G.reason:"",Ue=le.indexOf(":");return Ue>0&&Ue<le.length-1?`\u26D4 ${le.slice(0,Ue)} (${le.slice(Ue+1)})`:`\u26D4 ${le}`},m=E.map(S=>{let G=Os(S),le=Pt.has(S.id),Ue=[];le&&Ue.push(Ou(S)),G||Ue.push("spec \uC5C6\uC74C");let Qr=f(S.id);return Qr&&Ue.push(Qr),{id:S.id,title:S.title||S.id,reason:Ue.join(" \xB7 "),draggable:G,lane:"candidate",created_at:S.created_at,updated_at:S.updated_at,workflow:S.workflow,status:S.status,blocked:le,has_spec:G}}),p=wu(m,x),$=p.visible,k=u.revise_parked||{},F=(S,G)=>S.map(le=>{let Ue=G==="queue"?k[le.bead_id]:null;return{id:le.bead_id,title:Be.get(le.bead_id)||le.bead_id,reason:G==="done"?"":f(le.bead_id),draggable:G!=="done",done:G==="done",lane:G,badges:Ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ue,revise_action:!!Ue,revise_enabled:!!Ue&&!I.has(le.bead_id),revise_title:Ue?Ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:G==="done"?Dt(u.attempts||{},le.bead_id):null,done_at:G==="done"&&typeof le.added_at=="number"?le.added_at:void 0,...Ze(le.bead_id)}}),he=new Map;for(let S of u.done)S&&typeof S.bead_id=="string"&&typeof S.added_at=="number"&&he.set(S.bead_id,S.added_at);let Je=u.attempts?Object.values(u.attempts):[],Le=new Set;for(let S of Je)S&&typeof S.resumed_from=="string"&&S.resumed_from.length>0&&Le.add(S.resumed_from);let _t=new Map;for(let S of Je)_t.set(S.bead_id,S.attempt_id);let jt=new Map;for(let S of Je)jt.set(S.attempt_id,S);function qs(S){let G=new Set,le=S;for(;le&&!G.has(le.attempt_id);){if(le.conflict_resolution===!0)return!0;G.add(le.attempt_id),le=typeof le.resumed_from=="string"&&le.resumed_from.length>0&&jt.get(le.resumed_from)||null}return!1}let Dn=typeof u.declared_base=="string"?u.declared_base:null;function qi(S){let G=null;for(let le of Je)!le||le.bead_id!==S||qs(le)||(G===null||(typeof le.started_at=="number"?le.started_at:0)>=(typeof G.started_at=="number"?G.started_at:0))&&(G=le);return G&&typeof G.target_base=="string"?G.target_base:null}let $r=[],It=null;for(let S of Je){let G=S.status==="paused"&&!Le.has(S.attempt_id);if(S.status==="running"||G)$r.push({bead_id:S.bead_id,attempt_id:S.attempt_id,title:Be.get(S.bead_id)||S.bead_id,runner:S.runner||null,model:S.model||null,effort:S.effort||null,started_at:typeof S.started_at=="number"?S.started_at:null,resumed_from:S.resumed_from||null,paused:G,conflict_resolution:qs(S),base_exception:$i(Dn,S.target_base),can_pause:typeof S.session_id=="string"&&S.session_id.length>0,usage:Dt(u.attempts||{},S.bead_id),current_child:je(S.bead_id),...Ze(S.bead_id)});else if(S.status==="failed"||S.status==="orphaned"){let le=_t.get(S.bead_id)!==S.attempt_id,Ue=he.get(S.bead_id),Qr=typeof Ue=="number"&&Ue>0&&typeof S.finished_at=="number"&&Ue>=S.finished_at;!le&&!Qr&&typeof S.dismissed_at!="number"&&(It=S)}}let Bs=null;if(It){let S=typeof It.session_id=="string"&&It.session_id.length>0,G=Le.has(It.attempt_id),le=It.cause_detail;Bs={repo:It.repo||"",reason:It.cause||It.status,cause_detail:le&&typeof le.reason=="string"?{reason:le.reason,command:typeof le.command=="string"?le.command:null}:null,resume_attempt_id:It.attempt_id,resume_eligible:S&&!G,resume_reason:S?G?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Bi=new Set($r.map(S=>S.bead_id)),On=Array.isArray(u.merge_queue)?u.merge_queue:[],Us=new Map;On.forEach((S,G)=>{S&&typeof S.bead_id=="string"&&Us.set(S.bead_id,G+1)});let zs=u.merge_queue_state||{active:null,failures:{}},Ui=zs.failures||{},zi=u.auto_merge_skips||{},Hs=S=>{let G=zi[S];if(!G)return null;let le=ve[S],Ue=le&&le.pr?le.pr.head_sha:null;return Ue&&Ue===G.head_sha?G.reason||"":null},Zr=new Map;for(let S of $r)S.conflict_resolution&&(S.paused?Zr.has(S.bead_id)||Zr.set(S.bead_id,"paused"):Zr.set(S.bead_id,"running"));let Ws=$r.filter(S=>!S.paused).length,js=(u.workspace_info||{}).slots,Gs=typeof js=="number"?js:typeof u.slots=="number"?u.slots:In,Hi=Ws>Gs,Ys=pr(R),Wi=(Array.isArray(u.done)?u.done.slice():[]).filter(S=>Ys===void 0||typeof S.added_at!="number"||S.added_at>=Ys).sort((S,G)=>(G.added_at||0)-(S.added_at||0)),Vs=F(Wi,"done"),Xr={};for(let S of qt)Xr[S]=0;let Ks=!1,Zs=0,Mn=0,Xs=0;for(let S of Vs){let G=S.usage;if(G&&typeof G=="object"){let le=!1;for(let Ue of qt)Number.isFinite(G[Ue])&&(Xr[Ue]+=G[Ue],Ks=!0,le=!0);le&&(Mn+=1,Number.isFinite(G.total_cost_usd)&&(Zs+=G.total_cost_usd,Xs+=1))}}Mn>0&&Xs===Mn&&(Xr.total_cost_usd=Zs);let ji=Ks?Tt(Xr):null;return{queue:u,idToTitle:Be,candidates:$,candidate_hidden:{blocked:p.hidden_blocked,spec:p.hidden_spec},running:$r,live_count:Ws,slots:Gs,over_cap:Hi,failure:Bs,waiting:F(Mt.filter(S=>!Bi.has(S.bead_id)),"queue"),pr_wait:nt.map(S=>qu(S.bead_id,Be.get(S.bead_id)||S.bead_id,ve,yt[S.bead_id]||null,Dt(u.attempts||{},S.bead_id),lt[S.bead_id]||(U.has(S.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Zr.get(S.bead_id)||null,S.external===!0,{position:Us.get(S.bead_id)||0,active:zs.active===S.bead_id,failure:Ui[S.bead_id]||null},S.wt_present!==!1,u.auto_merge===!0?Hs(S.bead_id):null,$i(Dn,qi(S.bead_id)))).map(S=>({...S,...Ze(S.id)})),merge_queue_length:On.length,merge_queue_running:On.length>0,auto_excluded:nt.map(S=>S.bead_id).filter(S=>Hs(S)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Dn,done:Vs,token_total:ji,cleanup_failures:fe,ship_failure:kt}}function Ne(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",D=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,J=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Ie=l`<button
      type="button"
      class="worker-auto-all${J?" is-active":""}"
      title=${J?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${J?"true":"false"}
    >
      ${J?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,je=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",qe=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${W()} 완료 <b>${u.done.length}</b></span
      >`,Be=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Qe=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${In}
          step="1"
          .value=${String(u.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl"
        title="PR이 머지·정리 완료될 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          ?checked=${u.queue.pr_wait_holds_slot===!0}
        />
        머지까지 대기
      </label>
      <button
        type="button"
        class="worker-exec-defaults-btn"
        aria-haspopup="dialog"
        aria-label="전역 실행 설정"
        title="전역 실행 설정"
      >
        ⚙
      </button>`,ct=Xa({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return Q?l`<div class="worker-ribbon">
          ${D}
          <div class="worker-kpi worker-kpi--ribbon">${je}${qe}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Ie}${Qe}</div>
          <div class="worker-kpi">${Be}</div>
        </div>
        ${ct}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${D}${Ie}${Qe}</div>
        <div class="worker-kpi">
          ${je}${qe}${Be}
          ${u.token_total?l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${W()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${W()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${ct}`}function De(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(D=>!D.paused);return l`<section
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
        ${Ye(u)}
      </header>
      ${u.running.length>0?Ss(u.running,Date.now(),xe):""}
      ${u.pr_wait.map(D=>ks(D))}
    </section>`}function Ge(u){let b=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ku.map(D=>l`<button
              type="button"
              class="worker-filter__chip${x.spec===D.value?" is-active":""}"
              data-spec=${D.value}
              aria-pressed=${x.spec===D.value?"true":"false"}
            >
              ${D.label}
            </button>`)}
        ${b.spec>0?l`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function tt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${$u.map(u=>l`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function st(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${R}
      >
        ${Lt.map(u=>l`<option value=${u.value} ?selected=${R===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function ot(u){let b=(u.queue.pr_wait||[]).filter(J=>J&&J.external!==!0&&typeof J.bead_id=="string"),D=new Set(u.running.filter(J=>!J.paused).map(J=>J.bead_id));for(let J of b)D.add(J.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||b.length===0||u.waiting.length===0||D.size<u.slots))return l`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function Ye(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let D=new Set(u.auto_excluded),J=u.pr_wait.filter(Ie=>Ie.merge_action&&Ie.merge_enabled&&!D.has(Ie.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${J>0?` ${J}`:""}
    </button>`}function dt(u){let b=Ot({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:tt(),controls:Ge(u)});return Q?l`<div class="worker-lanes worker-lanes--mobile">
        ${De(u)}
        ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:ot(u),collapsible:!0,collapsed:j.queue,preview:wi(u.waiting)})}
        ${b}
        ${Ot({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,controls:st(),collapsible:!0,collapsed:j.done,preview:u.token_total||wi(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${b}
      ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:ot(u)})}
      ${Ot({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(D=>!D.paused),body:Ss(u.running,Date.now(),xe)})}
      ${Ot({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Ye(u)})}
      ${Ot({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${W()} ${u.done.length}`,items:u.done,empty:`${W()} \uC644\uB8CC \uC5C6\uC74C`,controls:st()})}
    </div>`}function Xe(u){j={...j,[u]:!j[u]},Ru(j),Fe()}function Fe(){let u=ue();Te(Ne(u),H),Te(dt(u),me)}function pt(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let D=Math.round(u.getBoundingClientRect().height);O.style.setProperty("--worker-ribbon-top",`${D}px`)};if(b(),typeof ResizeObserver=="function"){let D=new ResizeObserver(b);D.observe(u),C.push(()=>D.disconnect())}else window.addEventListener("resize",b),C.push(()=>window.removeEventListener("resize",b))}function ft(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Eu);Q=!!u.matches;let b=D=>{let J=!!(D&&typeof D.matches=="boolean"?D.matches:u.matches);J!==Q&&(Q=J,Fe())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),C.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),C.push(()=>u.removeListener(b)))}function He(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let D=b.dataset.beadId||"",J=b.dataset.lane||"";w={bead_id:D,from_lane:J};try{u.dataTransfer?.setData("text/plain",D),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function at(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let D=b.dataset.lane||"";D!=="candidate"&&D!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function it(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function rt(u,b){let D=E.find(qe=>qe.id===u);if(!D)return;let J=E.filter(qe=>qe.id!==u),Ie=J.length;if(b){let qe=b.dataset.beadId;if(qe===u)return;let Be=J.findIndex(Qe=>Qe.id===qe);Be>=0&&(Ie=Be)}let je=J.slice();je.splice(Ie,0,D),h.applyReorder(u,je,Ie)}function M(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let D=b.dataset.lane||"",J=w?.bead_id||u.dataTransfer?.getData("text/plain")||"",Ie=w?.from_lane||"";if(w=null,!J)return;let je=u.target?.closest?.(".worker-mini, .worker-card"),qe=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Be=qe.length;if(je){let Qe=qe.indexOf(je);Qe>=0&&(Be=Qe)}if(b.classList.contains("worker-pane--collapsed")&&(Be=Y()),D==="candidate"){if(Ie==="candidate"){rt(J,je);return}Ie==="queue"&&we(J);return}D==="queue"&&(Ie==="queue"?K(J,Be):ye(J,Be))}function q(u){x=u,yu(u),Fe()}function ee(u){y=u==="board"||u==="created"||u==="spec"?u:Ln,Su(y),Fe()}function se(u){R=Ft(u)?u:$t,Tu(R),Fe()}function ce(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){q({...x,show_blocked:b.checked});return}let D=u.target?.closest?.(".worker-done-range");if(D){se(D.value);return}let J=u.target?.closest?.(".worker-sort");if(J){ee(J.value||Ln);return}let Ie=u.target?.closest?.(".worker-pr-wait-hold");if(Ie){ie(Ie.checked);return}let je=u.target?.closest?.(".worker-slots__input");if(!je)return;let qe=Number.parseInt(je.value,10);if(!Number.isFinite(qe)){Fe();return}V(qe).then(Fe)}function be(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function Ee(u){let b=Ae(),D=b.attempts?b.attempts[u]:null;xe=u,ne.hidden=!1,Ve.open({attempt_id:u,meta:be(D)}),Fe()}function Oe(){if(!xe)return;let u=Ae(),b=u.attempts?u.attempts[xe]:null;if(b){Ve.updateMeta(be(b));return}Ve.close()}function Ce(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){We.open();return}let D=b?.closest?.(".worker-banner__resume");if(D){let fe=D.dataset.attemptId;fe&&te(fe);return}let J=b?.closest?.(".worker-banner__dismiss");if(J){let fe=J.dataset.attemptId;fe&&_e(fe);return}if(b?.closest?.(".worker-play")){A(!Ae().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let fe=Ae();z(!(fe.auto_advance===!0&&fe.auto_merge===!0));return}let Ie=b?.closest?.(".worker-merge-all");if(Ie){Ie.classList.contains("worker-merge-all--stop")?Ae().auto_merge===!0?re(!1):ke():re(!0);return}let je=b?.closest?.(".worker-pane__hd--toggle");if(je){let fe=je.dataset.lane;(fe==="queue"||fe==="done")&&Xe(fe);return}let qe=b?.closest?.(".worker-card__place");if(qe){let fe=qe.dataset.beadId;fe&&!qe.disabled&&ye(fe,Y());return}let Be=b?.closest?.(".worker-filter__chip");if(Be){let fe=Be.dataset.spec;(fe==="all"||fe==="with"||fe==="without")&&q({...x,spec:fe});return}let Qe=b?.closest?.(".worker-mini__merge");if(Qe){P(Qe.dataset.beadId||"");return}let ct=b?.closest?.(".worker-mini__merge-cancel");if(ct){Se(ct.dataset.beadId||"");return}let Ze=b?.closest?.(".worker-mini__discard");if(Ze){g(Ze.dataset.beadId||"");return}let nt=b?.closest?.(".worker-mini__revise-fix");if(nt){T("worker-revise-fix",nt.dataset.beadId||"");return}let ve=b?.closest?.(".worker-mini__revise-approve");if(ve){T("worker-revise-approve",ve.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let ge=b?.closest?.(".rtile")?.dataset?.attemptId;ge&&pe(ge);return}if(b?.closest?.(".rtile__pause")){let ge=b?.closest?.(".rtile")?.dataset?.attemptId;ge&&Pe(ge);return}if(b?.closest?.(".rtile__resume")){let ge=b?.closest?.(".rtile")?.dataset?.attemptId;ge&&te(ge);return}if(b?.closest?.(".rtile__session")){let ge=b?.closest?.(".rtile")?.dataset?.attemptId;ge&&Ee(ge);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){Ve.close();return}if(b?.closest?.(".worker-drawer-host"))return;let lt=b?.closest?.(".rtile");if(lt){if(b?.closest?.(".rtile__id")){let ge=lt.dataset.beadId;ge&&or(ge).then(kt=>{kt?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=lt.dataset.beadId;fe&&i&&i(fe);return}let yt=b?.closest?.(".worker-mini, .worker-card");if(yt){let fe=yt.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){fe&&or(fe).then(ge=>{ge?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}fe&&i&&i(fe)}}return e.addEventListener("dragstart",He),e.addEventListener("dragover",at),e.addEventListener("dragleave",it),e.addEventListener("drop",M),e.addEventListener("click",Ce),e.addEventListener("change",ce),ft(),pt(),_&&C.push(_.subscribe(Fe)),s&&C.push(s.subscribe(()=>{Fe(),Oe()})),Fe(),{load(){Fe()},openExecDefaults(){We.open()},destroy(){for(let u of C.splice(0))try{u()}catch{}e.removeEventListener("dragstart",He),e.removeEventListener("dragover",at),e.removeEventListener("dragleave",it),e.removeEventListener("drop",M),e.removeEventListener("click",Ce),e.removeEventListener("change",ce);try{Ve.destroy()}catch{}ne.hidden=!0;try{We.destroy()}catch{}Te(l``,e)}}}function Ps(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ei(e,t,r,n=async()=>{},s=async()=>{}){let o=Ke("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function _(C){let H=C.target.value,de=t.getState().workspace?.current?.path||"";if(H&&H!==de){o("switching workspace to %s",H),c=!0,I();try{await r(H)}catch(oe){o("workspace switch failed: %o",oe)}finally{c=!1,I()}}}async function h(){let C=t.getState(),O=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!O||i)){o("git-pulling workspace %s",O),i=!0,I();try{await n(O)}catch(H){o("workspace git pull failed: %o",H)}finally{i=!1,I()}}}function w(C){let O=C.target;O&&e.contains(O)||y()}function E(C){C.key==="Escape"&&y()}function x(){d||(d=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",E),I())}function y(){d&&(d=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",E),I())}function R(){d?y():x()}async function W(C){let O=C.target,H=O.value,ne=O.checked;o("toggling visibility %s \u2192 %s",H,String(ne));try{await s(H,ne)}catch(de){o("workspace visibility toggle failed: %o",de)}}function j(C){return C?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${h}
        ?disabled=${c||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function Q(C,O){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${R}
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
                ${C.map(H=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!O.has(H.path)}
                        @change=${W}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ps(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function U(){let C=t.getState(),O=C.workspace?.current,H=C.workspace?.available||[],ne=new Set(C.workspace?.hidden||[]),de=O?.path||H[0]?.path||"";if(H.length===0)return l``;let oe=H.filter(me=>!ne.has(me.path)||me.path===de);if(oe.length<=1){let me=oe[0]||H[0],xe=Ps(me.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${me.path}"
            >${xe}</span
          >
          ${Q(H,ne)}
          ${j(de)}
          ${i?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${c||i}
          aria-label="Select project workspace"
        >
          ${oe.map(me=>l`
              <option
                value="${me.path}"
                ?selected=${me.path===de}
                title="${me.path}"
              >
                ${Ps(me.path)}
              </option>
            `)}
        </select>
        ${Q(H,ne)}
        ${j(de)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function I(){Te(U(),e)}return I(),a=t.subscribe(()=>I()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",E),Te(l``,e)}}}var Ci=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Ns(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ri(e,t,r=Ns()){return{id:r,type:e,payload:t}}function Ii(e={}){let t=Ke("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,_=[],h=new Map,w=new Set;function E(U){for(let I of Array.from(w))try{I(U)}catch{}}function x(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let U=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),I=(r.jitterRatio||0)*U,C=Math.max(0,Math.round(U+(Math.random()*2-1)*I));t("ws retry in %d ms (attempt %d)",C,a+1),c=setTimeout(()=>{c=null,Q()},C)}function y(U){try{s?.send(JSON.stringify(U))}catch(I){t("ws send failed",I)}}function R(){for(o="open",t("ws open"),E(o),a=0;_.length;){let U=_.shift();U&&y(U)}}function W(U){let I;try{I=JSON.parse(String(U.data))}catch{t("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){t("ws received invalid envelope");return}if(d.has(I.id)){let O=d.get(I.id);d.delete(I.id),I.ok?O?.resolve(I.payload):O?.reject(I.error||new Error("ws error"));return}let C=h.get(I.type);if(C&&C.size>0)for(let O of Array.from(C))try{O(I.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",I.type)}function j(){o="closed",t("ws closed"),E(o);for(let[U,I]of d.entries())I.reject(new Error("ws disconnected")),d.delete(U);a+=1,x()}function Q(){if(!i)return;let U=n();try{s=new WebSocket(U),t("ws connecting %s",U),o="connecting",E(o),s.addEventListener("open",R),s.addEventListener("message",W),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(I){t("ws connect failed %o",I),x()}}return Q(),{send(U,I){if(!Ci.includes(U))return Promise.reject(new Error(`unknown message type: ${U}`));let C=Ns(),O=Ri(U,I,C);return t("send %s id=%s",U,C),new Promise((H,ne)=>{d.set(C,{resolve:H,reject:ne,type:U}),s&&s.readyState===s.OPEN?y(O):(t("queue %s id=%s (state=%s)",U,C,o),_.push(O))})},on(U,I){h.has(U)||h.set(U,new Set);let C=h.get(U);return C?.add(I),()=>{C?.delete(I)}},onConnection(U){return w.add(U),()=>{w.delete(U)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,Q()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Bu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Uu(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Fs=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Li=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Di=pi,Oi="worker:queue",Mi="ui:order",Pi="ui:display-policy",Ni="exec:presets",Xt="tab:board:closed",Fi="beads-ui.board.closed-range";function zu(e){let t=Ke("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Te(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),i=document.getElementById("detail-panel");if(s&&yi(s),o&&a&&c&&i){let ae=function(f,m){let p="Request failed",$="";if(f&&typeof f=="object"){let F=f;if(typeof F.message=="string"&&F.message.length>0&&(p=F.message),typeof F.details=="string")$=F.details;else if(F.details&&typeof F.details=="object")try{$=JSON.stringify(F.details,null,2)}catch{$=""}}else typeof f=="string"&&f.length>0&&(p=f);let k=m&&m.length>0?`Failed to load ${m}`:"Request failed";Ae.open(k,p,$)},V=function(f){return`${ve.getState().workspace.current?.path||""}\0${f}`},ie=function(){P&&(P().catch(()=>{}),P=null),re=null,Se=null},Ne=function(f){ke=f;let m=()=>{ke!==f||ve.getState().selected_id!==f||(ke=null,ue(f))};if(!A){T.then(m);return}m()},st=function(f,m,p,$,k){return p!==tt[m]?(k().catch(()=>{}),!1):(f.set($,k),!0)},ot=function(){let f=ve.getState();Xe(f.view==="board"),at(f.view==="worker"),ee(f.view==="monitor"),rt(f.view==="worker"||!!f.selected_id)},dt=function(){let f=pr(Ye);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Xe=function(f){if(f)for(let[m,p]of Fs){if(De.has(m)||Ge.has(m))continue;let $=m===Xt?dt():{type:p};try{K.register(m,$)}catch(he){t("register %s store failed: %o",m,he)}Ge.add(m);let k=tt.board,F=!1;ye.subscribeList(m,$).then(he=>{F=!st(De,"board",k,m,he)}).catch(he=>{t("subscribe %s failed: %o",m,he),ae(he,"board")}).finally(()=>{Ge.delete(m),F&&ot()})}else pt()},pt=function(){tt.board+=1;for(let[f]of Fs){let m=De.get(f);m&&(m().catch(()=>{}),De.delete(f));try{K.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},at=function(f){if(!f){it();return}for(let[m,p]of Li){if(ft.has(m)||Ge.has(m))continue;try{K.register(m,{type:p})}catch(F){t("register %s store failed: %o",m,F)}Ge.add(m);let $=tt.worker,k=!1;ye.subscribeList(m,{type:p}).then(F=>{k=!st(ft,"worker",$,m,F)}).catch(F=>{t("subscribe %s failed: %o",m,F),ae(F,"worker")}).finally(()=>{Ge.delete(m),k&&ot()})}},it=function(){tt.worker+=1;for(let[f]of Li){let m=ft.get(f);m&&(m().catch(()=>{}),ft.delete(f));try{K.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},rt=function(f){if(!f){M();return}He||(Y("subscribe-worker-queue",{id:Oi}).catch(m=>{t("subscribe-worker-queue failed: %o",m)}),He=()=>Y("unsubscribe-worker-queue",{id:Oi}))},M=function(){He&&(He().catch(()=>{}),He=null)},ee=function(f){if(!f){se();return}q||(Y("subscribe-monitor-pipeline",{id:Di}).catch(m=>{t("subscribe-monitor-pipeline failed: %o",m)}),q=()=>Y("unsubscribe-monitor-pipeline",{id:Di}))},se=function(){q&&(q().catch(()=>{}),q=null)},be=function(){ce||(Y("subscribe-ui-order",{id:Mi}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),ce=()=>Y("unsubscribe-ui-order",{id:Mi}))},Ee=function(){ce&&(ce().catch(()=>{}),ce=null),Pe.clear()},Ce=function(){Oe||(Y("subscribe-display-policy",{id:Pi}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Oe=()=>Y("unsubscribe-display-policy",{id:Pi}))},u=function(){Oe&&(Oe().catch(()=>{}),Oe=null),te.clear()},D=function(){b||(Y("subscribe-exec-presets",{id:Ni}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),b=()=>Y("unsubscribe-exec-presets",{id:Ni}))},Qe=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var d=ae,_=V,h=ie,w=Ne,E=st,x=ot,y=dt,R=Xe,W=pt,j=at,Q=it,U=rt,I=M,C=ee,O=se,H=be,ne=Ee,de=Ce,oe=u,me=D,xe=Qe;let Ve=document.getElementById("header-loading"),We=Do(Ve),Ae=Ga(e),L=Ii(),Y=We.wrapSend((f,m)=>L.send(f,m)),ye=Ao(Y),K=To(),we=Co(),pe=uo(),Pe=Eo(),te=lo(),_e=co(),N=po();L.on("exec-presets-snapshot",f=>{let m=f;m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&_e.set({revision:m.revision,presets:m.presets})}),L.on("monitor-pipeline-snapshot",f=>{let m=f;if(!(!m||!Array.isArray(m.workspaces)))try{pe.set(m.workspaces,m.workspaces_state)}catch{}}),L.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Pe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),L.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{te.set(m.policy)}catch{}}),L.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{N.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[],typeof m.last_event_at=="number"?m.last_event_at:null)}catch{}}),L.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{N.append(m.attempt_id,m.event)}catch{}}),L.on("snapshot",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?K.getStore(p):null;if($&&m&&m.type==="snapshot")try{$.applyPush(m)}catch{}}),L.on("upsert",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?K.getStore(p):null;if($&&m&&m.type==="upsert")try{$.applyPush(m)}catch{}}),L.on("delete",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?K.getStore(p):null;if($&&m&&m.type==="delete")try{$.applyPush(m)}catch{}});let P=null,re=null,Se=null,ke=null,g=()=>{},T=new Promise(f=>{g=()=>f(void 0)}),A=!1,z=!1;async function ue(f){let m=V(f);if(m===re||m===Se)return;Se=m;let p=`detail:${f}`,$={type:"issue-detail",params:{id:f}};try{K.register(p,$)}catch(k){t("register detail store failed: %o",k)}try{let k=await ye.subscribeList(p,$);if(ve.getState().selected_id!==f||V(f)!==m){await k().catch(()=>{});return}P&&await P().catch(()=>{}),P=k,re=m}catch(k){t("detail subscribe failed: %o",k),ae(k,"issue details")}finally{Se===m&&(Se=null)}}let De=new Map,Ge=new Set,tt={board:0,worker:0},Ye=$t;try{let f=window.localStorage.getItem(Fi);Ft(f)&&(Ye=f)}catch{}async function Fe(f){if(!Ft(f)||f===Ye)return;Ye=f;try{window.localStorage.setItem(Fi,f)}catch{}let m=De.get(Xt);if(!m)return;De.delete(Xt),await m().catch(()=>{});let p=dt();try{K.register(Xt,p)}catch($){t("register %s store failed: %o",Xt,$)}try{let $=await ye.subscribeList(Xt,p);De.set(Xt,$)}catch($){t("re-subscribe %s failed: %o",Xt,$),ae($,"board")}}let ft=new Map,He=null,q=null,ce=null,Oe=null,b=null;async function J(){Oe=null,te.clear(),b=null,_e.clear(),He=null,q=null,De.clear(),ft.clear(),tt.board+=1,tt.worker+=1,D();let f=ve.getState().workspace.current?.path;if(f)try{await L.send("set-workspace",{path:f})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ce();let m=ve.getState();Xe(m.view==="board"),at(m.view==="worker"),ee(m.view==="monitor"),rt(m.view==="worker"||!!m.selected_id)}async function Ie(){t("clearing all subscriptions for workspace switch"),pt(),it(),M(),we.clear(),Ee(),be(),u(),Ce(),ie();let f=ve.getState();if(f.selected_id)try{K.unregister(`detail:${f.selected_id}`)}catch{}let m=ve.getState();Xe(m.view==="board"),at(m.view==="worker"),ee(m.view==="monitor"),rt(m.view==="worker"||!!m.selected_id),m.selected_id&&Ne(m.selected_id)}async function je(f){t("requesting workspace switch to %s",f),z=!0;try{let m=await L.send("set-workspace",{path:f});t("workspace switch result: %o",m),m&&m.workspace&&(ve.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await Ie(),X("Switched to "+Qe(f),"success",2e3)))}catch(m){throw t("workspace switch failed: %o",m),X("Failed to switch workspace","error",3e3),m}finally{z=!1}}async function qe(f){t("requesting workspace git pull for %s",f);try{let m=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",m);let p=m?.status;if(p==="up_to_date"){X("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+Qe(f),"success",2e3)}catch(m){t("workspace git pull failed: %o",m);let p=m?.code,$=m?.message;if(p==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let k=$?`: ${$}`:"";throw X(`Git pull failed${k}`,"error",3e3),m}}async function Be(f,m){t("setting workspace visibility %s \u2192 %s",f,String(m));try{await L.send("set-workspace-visibility",{path:f,visible:m}),await ct()}catch(p){t("workspace visibility update failed: %o",p),X("Failed to update project visibility","error",3e3)}}async function ct(){try{let f=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(F=>({path:F.path,database:F.database,pid:F.pid,version:F.version})),p=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,$=Array.isArray(f.hidden)?f.hidden.filter(F=>typeof F=="string"):[];ve.setState({workspace:{current:p,available:m,hidden:$}});let k=window.localStorage.getItem("beads-ui.workspace");k&&(!m.some(he=>he.path===k)||$.includes(k)?window.localStorage.removeItem("beads-ui.workspace"):p&&k!==p.path&&(t("restoring saved workspace preference: %s",k),await je(k)))}}catch(f){t("failed to load workspaces: %o",f)}}L.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ve.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ct(),Ie())});let Ze=!1;if(typeof L.onConnection=="function"){let f=m=>{t("ws state %s",m),m==="reconnecting"||m==="closed"?(Ze=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&Ze&&(Ze=!1,X("Reconnected","success",2200),Uu(ve,(p,$)=>{t(`${p}: %o`,$)}),J())};L.onConnection(f)}let nt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(nt=f)}catch(f){t("view parse error: %o",f)}let ve=Lo({config:Bu(),view:nt});L.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let p=ve.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&m.root_dir!==p){t("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{we.set(m.queue)}catch{}});let lt=Ro(ve);lt.start();let yt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),fe=async(f,m)=>{try{return await Y(f,m)}catch(p){if(yt.has(f))throw p;return[]}};n&&_i(n,ve,lt);let ge=document.getElementById("workspace-picker");ge&&Ei(ge,ve,je,qe,Be);let kt=bi(e,(f,m)=>Y(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>kt.open())}catch{}let Mt=ja(e,{policyStore:te,transport:(f,m)=>Y(f,m),labelOptions:()=>{let f=new Set;for(let[m]of Fs)for(let p of K.snapshotFor(m)||[]){let $=p.labels;if(Array.isArray($))for(let k of $)typeof k=="string"&&k.length>0&&f.add(k)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Mt.open())}catch{}let Ht=Uo(o,{gotoIssue:f=>lt.gotoIssue(f),issueStores:K,transport:fe,uiOrderStore:Pe,displayPolicyStore:te,closedRange:Ye,onClosedRangeChange:f=>{Fe(f)},onNewIssue:()=>kt.open()}),Pt=Ms(a,{transport:fe,issueStores:K,queueStore:we,execPresetStore:_e,sessionLogStore:N,uiOrderStore:Pe,gotoIssue:f=>ve.setState({selected_id:f}),getWorkspacePath:()=>ve.getState().workspace.current?.path}),Wt=fi(c,{transport:fe,pipelineStore:pe,execPresetStore:_e,gotoIssue:f=>lt.gotoIssue(f),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:f=>je(f)}),Z=Ha(i,{issueStores:K,transport:fe,queueStore:we,execPresetStore:_e,sessionLogStore:N,getWorkspacePath:()=>ve.getState().workspace.current?.path,onNavigate:f=>{ve.getState().view==="worker"?ve.setState({selected_id:f}):lt.gotoIssue(f)},onClose:()=>{let f=ve.getState();ve.setState({selected_id:null});try{lt.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{ve.setState({selected_id:null}),lt.gotoView("worker"),Pt.openExecDefaults()}}),v=ve.getState().selected_id;v&&(i.hidden=!1,Z.load(v),Ne(v)),ve.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,Z.load(m),z||Ne(m)):(Z.clear(),i.hidden=!0,ie())});let B=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",Xe(f.view==="board"),at(f.view==="worker"),ee(f.view==="monitor"),rt(f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&Ht.load(),f.view==="worker"&&Pt.load(),f.view==="monitor"?Wt.load():Wt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ve.subscribe(B),B(ve.getState()),be(),Ce(),D(),ct().finally(()=>{A=!0,g()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,p=String(f.key||"").toLowerCase(),$=f.target,k=$&&$.tagName?String($.tagName).toLowerCase():"",F=k==="input"||k==="textarea"||k==="select"||$&&typeof $.isContentEditable=="boolean"&&$.isContentEditable;m&&p==="n"&&(F||(f.preventDefault(),kt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&zu(t)});export{zu as bootstrap,Bu as readBootstrapConfig,Uu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
