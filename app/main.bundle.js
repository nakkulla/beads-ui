var ji=Object.create;var Mn=Object.defineProperty;var Gi=Object.getOwnPropertyDescriptor;var Yi=Object.getOwnPropertyNames;var Vi=Object.getPrototypeOf,Ki=Object.prototype.hasOwnProperty;var Zi=(e,t,r)=>t in e?Mn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Pn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Xi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Yi(t))!Ki.call(e,s)&&s!==r&&Mn(e,s,{get:()=>t[s],enumerable:!(n=Gi(t,s))||n.enumerable});return e};var Qi=(e,t,r)=>(r=e!=null?ji(Vi(e)):{},Xi(t||!e||!e.__esModule?Mn(r,"default",{value:e,enumerable:!0}):r,e));var ze=(e,t,r)=>Zi(e,typeof t!="symbol"?t+"":t,r);var uo=Pn((Xu,co)=>{var fr=1e3,_r=fr*60,mr=_r*60,rr=mr*24,nl=rr*7,sl=rr*365.25;co.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return ol(e);if(r==="number"&&isFinite(e))return t.long?il(e):al(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function ol(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*sl;case"weeks":case"week":case"w":return r*nl;case"days":case"day":case"d":return r*rr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*_r;case"seconds":case"second":case"secs":case"sec":case"s":return r*fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function al(e){var t=Math.abs(e);return t>=rr?Math.round(e/rr)+"d":t>=mr?Math.round(e/mr)+"h":t>=_r?Math.round(e/_r)+"m":t>=fr?Math.round(e/fr)+"s":e+"ms"}function il(e){var t=Math.abs(e);return t>=rr?tn(e,t,rr,"day"):t>=mr?tn(e,t,mr,"hour"):t>=_r?tn(e,t,_r,"minute"):t>=fr?tn(e,t,fr,"second"):e+" ms"}function tn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var fo=Pn((Qu,po)=>{function ll(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=l,r.humanize=uo(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let g=0;for(let w=0;w<_.length;w++)g=(g<<5)-g+_.charCodeAt(w),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=t;function r(_){let g,w=null,T,x;function y(...C){if(!y.enabled)return;let j=y,G=Number(new Date),K=G-(g||G);j.diff=K,j.prev=g,j.curr=G,g=G,C[0]=r.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let z=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(E,D)=>{if(E==="%%")return"%";z++;let H=r.formatters[D];if(typeof H=="function"){let oe=C[z];E=H.call(j,oe),C.splice(z,1),z--}return E}),r.formatArgs.call(j,C),(j.log||r.log).apply(j,C)}return y.namespace=_,y.useColors=r.useColors(),y.color=r.selectColor(_),y.extend=n,y.destroy=r.destroy,Object.defineProperty(y,"enabled",{enumerable:!0,configurable:!1,get:()=>w!==null?w:(T!==r.namespaces&&(T=r.namespaces,x=r.enabled(_)),x),set:C=>{w=C}}),typeof r.init=="function"&&r.init(y),y}function n(_,g){let w=r(this.namespace+(typeof g>"u"?":":g)+_);return w.log=this.log,w}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let g=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let w of g)w[0]==="-"?r.skips.push(w.slice(1)):r.names.push(w)}function o(_,g){let w=0,T=0,x=-1,y=0;for(;w<_.length;)if(T<g.length&&(g[T]===_[w]||g[T]==="*"))g[T]==="*"?(x=T,y=w,T++):(w++,T++);else if(x!==-1)T=x+1,y++,w=y;else return!1;for(;T<g.length&&g[T]==="*";)T++;return T===g.length}function a(){let _=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),_}function l(_){for(let g of r.skips)if(o(_,g))return!1;for(let g of r.names)if(o(_,g))return!0;return!1}function i(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}po.exports=ll});var _o=Pn((vt,rn)=>{vt.formatArgs=dl;vt.save=ul;vt.load=pl;vt.useColors=cl;vt.storage=fl();vt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();vt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function cl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function dl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+rn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}vt.log=console.debug||console.log||(()=>{});function ul(e){try{e?vt.storage.setItem("debug",e):vt.storage.removeItem("debug")}catch{}}function pl(){let e;try{e=vt.storage.getItem("debug")||vt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function fl(){try{return localStorage}catch{}}rn.exports=fo()(vt);var{formatters:_l}=rn.exports;_l.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Sr=globalThis,en=Sr.trustedTypes,Ks=en?en.createPolicy("lit-html",{createHTML:e=>e}):void 0,to="$lit$",Gt=`lit$${Math.random().toFixed(9).slice(2)}$`,ro="?"+Gt,Ji=`<${ro}>`,er=document,Ar=()=>er.createComment(""),Tr=e=>e===null||typeof e!="object"&&typeof e!="function",Hn=Array.isArray,el=e=>Hn(e)||typeof e?.[Symbol.iterator]=="function",Nn=`[ 	
\f\r]`,xr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Zs=/-->/g,Xs=/>/g,Qt=RegExp(`>|${Nn}(?:([^\\s"'>=/]+)(${Nn}*=${Nn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qs=/'/g,Js=/"/g,no=/^(?:script|style|textarea|title)$/i,Wn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=Wn(1),Nt=Wn(2),Wu=Wn(3),tr=Symbol.for("lit-noChange"),Je=Symbol.for("lit-nothing"),eo=new WeakMap,Jt=er.createTreeWalker(er,129);function so(e,t){if(!Hn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ks!==void 0?Ks.createHTML(t):t}var tl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=xr;for(let l=0;l<r;l++){let i=e[l],d,_,g=-1,w=0;for(;w<i.length&&(a.lastIndex=w,_=a.exec(i),_!==null);)w=a.lastIndex,a===xr?_[1]==="!--"?a=Zs:_[1]!==void 0?a=Xs:_[2]!==void 0?(no.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=Qt):_[3]!==void 0&&(a=Qt):a===Qt?_[0]===">"?(a=s??xr,g=-1):_[1]===void 0?g=-2:(g=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?Qt:_[3]==='"'?Js:Qs):a===Js||a===Qs?a=Qt:a===Zs||a===Xs?a=xr:(a=Qt,s=void 0);let T=a===Qt&&e[l+1].startsWith("/>")?" ":"";o+=a===xr?i+Ji:g>=0?(n.push(d),i.slice(0,g)+to+i.slice(g)+Gt+T):i+Gt+(g===-2?l:T)}return[so(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Er=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,l=t.length-1,i=this.parts,[d,_]=tl(t,r);if(this.el=e.createElement(d,n),Jt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Jt.nextNode())!==null&&i.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(to)){let w=_[a++],T=s.getAttribute(g).split(Gt),x=/([.?@])?(.*)/.exec(w);i.push({type:1,index:o,name:x[2],strings:T,ctor:x[1]==="."?qn:x[1]==="?"?Bn:x[1]==="@"?Un:ur}),s.removeAttribute(g)}else g.startsWith(Gt)&&(i.push({type:6,index:o}),s.removeAttribute(g));if(no.test(s.tagName)){let g=s.textContent.split(Gt),w=g.length-1;if(w>0){s.textContent=en?en.emptyScript:"";for(let T=0;T<w;T++)s.append(g[T],Ar()),Jt.nextNode(),i.push({type:2,index:++o});s.append(g[w],Ar())}}}else if(s.nodeType===8)if(s.data===ro)i.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Gt,g+1))!==-1;)i.push({type:7,index:o}),g+=Gt.length-1}o++}}static createElement(t,r){let n=er.createElement("template");return n.innerHTML=t,n}};function dr(e,t,r=e,n){if(t===tr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Tr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=dr(e,s._$AS(e,t.values),s,n)),t}var Fn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??er).importNode(r,!0);Jt.currentNode=s;let o=Jt.nextNode(),a=0,l=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Cr(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new zn(o,this,t)),this._$AV.push(d),i=n[++l]}a!==i?.index&&(o=Jt.nextNode(),a++)}return Jt.currentNode=er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Cr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Je,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=dr(this,t,r),Tr(t)?t===Je||t==null||t===""?(this._$AH!==Je&&this._$AR(),this._$AH=Je):t!==this._$AH&&t!==tr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):el(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Je&&Tr(this._$AH)?this._$AA.nextSibling.data=t:this.T(er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Er.createElement(so(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Fn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=eo.get(t.strings);return r===void 0&&eo.set(t.strings,r=new Er(t)),r}k(t){Hn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Ar()),this.O(Ar()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Je,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Je}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=dr(this,t,r,0),a=!Tr(t)||t!==this._$AH&&t!==tr,a&&(this._$AH=t);else{let l=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=dr(this,l[n+i],r,i),d===tr&&(d=this._$AH[i]),a||(a=!Tr(d)||d!==this._$AH[i]),d===Je?t=Je:t!==Je&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Je?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qn=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Je?void 0:t}},Bn=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Je)}},Un=class extends ur{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=dr(this,t,r,0)??Je)===tr)return;let n=this._$AH,s=t===Je&&n!==Je||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Je&&(n===Je||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},zn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){dr(this,t)}};var rl=Sr.litHtmlPolyfillSupport;rl?.(Er,Cr),(Sr.litHtmlVersions??(Sr.litHtmlVersions=[])).push("3.3.1");var Te=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Cr(t.insertBefore(Ar(),o),o,void 0,r??{})}return s._$AI(e),s};var $t="today",Dt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ft(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function oo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function io(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function lo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var mo=Qi(_o(),1);function Ke(e){return(0,mo.default)(`beads-ui:${e}`)}function At(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function nr(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function bo(e,t){let r=At(e.created_at),n=At(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function vo(e,t){let r=At(e.updated_at),n=At(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function yo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=At(e.created_at),o=At(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,l=t.id;return a<l?-1:a>l?1:0}function wo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ml=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function go(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ho(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ml.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function ko(e,t){let r=go(e),n=go(t);if(r!==n)return r<n?-1:1;let s=ho(e),o=ho(t);if(s!==o)return s<o?-1:1;let a=At(e&&e.created_at),l=At(t&&t.created_at);if(a!==l)return a<l?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var jn=2**20;function gr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-At(e&&e.created_at)}function nn(e){return(t,r)=>{let n=gr(t,e),s=gr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Gn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,l=o+1<s?n[o+1]:null;if(!a&&!l)return{rank:0};if(!a)return{rank:gr(l,r)-jn};if(!l)return{rank:gr(a,r)+jn};let i=gr(a,r),d=gr(l,r),_=(i+d)/2;return i<_&&_<d?{rank:_}:{renormalize:n.map((g,w)=>({bead_id:g.id,rank:w*jn}))}}function Yn(e,t={}){let r=Ke(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,l=!1,i=t.sort||nr;function d(){for(let w of Array.from(a))try{w()}catch{}}function _(){s=Array.from(n.values()).sort(i)}function g(w){if(l||!w||w.id!==e)return;let T=Number(w.revision)||0;if(r("apply %s rev=%d",w.type,T),!(T<=o&&w.type!=="snapshot")){if(w.type==="snapshot"){if(T<=o)return;n.clear();let x=Array.isArray(w.issues)?w.issues:[];for(let y of x)y&&typeof y.id=="string"&&y.id.length>0&&n.set(y.id,y);_(),o=T,d();return}if(w.type==="upsert"){let x=w.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let y=n.get(x.id);if(!y)n.set(x.id,x);else{let C=Number.isFinite(y.updated_at)?y.updated_at:0,j=Number.isFinite(x.updated_at)?x.updated_at:0;if(C<=j){for(let G of Object.keys(y))G in x||delete y[G];for(let[G,K]of Object.entries(x))y[G]=K}}_()}o=T,d()}else if(w.type==="delete"){let x=String(w.issue_id||"");x&&(n.delete(x),_()),o=T,d()}}}return{id:e,subscribe(w){return a.add(w),()=>{a.delete(w)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(w){return n.get(w)},dispose(){l=!0,n.clear(),s=[],a.clear(),o=0}}}function sn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function $o(e){let t=Ke("subs"),r=new Map,n=new Map;function s(l,i){t("applyDelta %s +%d ~%d -%d",l,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(l);if(!d||d.size===0)return;let _=Array.isArray(i.added)?i.added:[],g=Array.isArray(i.updated)?i.updated:[],w=Array.isArray(i.removed)?i.removed:[];for(let T of Array.from(d)){let x=r.get(T);if(!x)continue;let y=x.itemsById;for(let C of _)typeof C=="string"&&C.length>0&&y.set(C,!0);for(let C of g)typeof C=="string"&&C.length>0&&y.set(C,!0);for(let C of w)typeof C=="string"&&C.length>0&&y.delete(C)}}async function o(l,i){let d=sn(i);if(t("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let g=r.get(l);if(g&&g.key!==d){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key)),r.set(l,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(l);try{await e("subscribe-list",{id:l,type:i.type,params:i.params})}catch(g){let w=r.get(l)||null;if(w){let T=n.get(w.key);T&&(T.delete(l),T.size===0&&n.delete(w.key))}throw r.delete(l),g}return async()=>{t("unsubscribe %s key=%s",l,d);try{await e("unsubscribe-list",{id:l})}catch{}let g=r.get(l)||null;if(g){let w=n.get(g.key);w&&(w.delete(l),w.size===0&&n.delete(g.key))}r.delete(l)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:sn,selectors:{getIds(l){let i=r.get(l);return i?Array.from(i.itemsById.keys()):[]},has(l,i){let d=r.get(l);return d?d.itemsById.has(i):!1},count(l){let i=r.get(l);return i?i.itemsById.size:0},getItemsById(l){let i=r.get(l),d={};if(!i)return d;for(let _ of i.itemsById.keys())d[_]=!0;return d}}}}function xo(){let e=Ke("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,_){let g=d?sn(d):"",w=r.get(i)||"",T=t.has(i);if(e("register %s key=%s (prev=%s)",i,g,w),T&&w&&g&&w!==g){let x=t.get(i);if(x)try{x.dispose()}catch{}let y=s.get(i);if(y){try{y()}catch{}s.delete(i)}let C=Yn(i,_);t.set(i,C);let j=C.subscribe(()=>o());s.set(i,j)}else if(!T){let x=Yn(i,_);t.set(i,x);let y=x.subscribe(()=>o());s.set(i,y)}return r.set(i,g),()=>l(i)}function l(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let _=s.get(i);if(_){try{_()}catch{}s.delete(i)}}return{register:a,unregister:l,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function So(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Vn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function gl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let l=new URLSearchParams(s).get("issue");if(l)return decodeURIComponent(l)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function hl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function To(e){let t=Ke("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):gl(n),a=hl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Vn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Vn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var bl=Object.freeze({workspace_config:{default_workspace:null}});function Eo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:bl.workspace_config.default_workspace}}}function Co(e={}){let t=Ke("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Eo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Eo(o.config):r.config},l=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!l&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Ro(e){let t=Ke("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function l(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(g,w)=>{let T=s++,x=Date.now();n.set(T,{type:g,start_ts:x}),t("request start id=%d type=%s count=%d",T,g,r+1),a();let y=!1,C=()=>{y||(y=!0,n.delete(T),l())},j=setTimeout(()=>{y||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,g,Date.now()-x),C())},3e4);try{let G=await d(g,w),K=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",T,g,K),G}catch(G){let K=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,g,K,G),G}finally{clearTimeout(j),C()}}}return o(),{wrapSend:i,start:a,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,g])=>({id:_,type:g.type,elapsed_ms:d-g.start_ts}))}}}function X(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function on(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,l){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(wo),i;switch(l){case"created_desc":return i.sort(nr),i;case"created_asc":return i.sort(bo),i;case"updated_desc":return i.sort(vo),i;case"priority":return i.sort(yo),i;case"manual":default:{let d=r();return d?i.sort(nn(d)):i.sort(nr),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let l of a)try{l()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ut(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function wt(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let l=Math.floor(s/864e5);if(l<7)return`${l}\uC77C \uC804`;let i=Math.floor(l/7);if(l<30)return`${i}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function an(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function ln(e){let t=e.transport,r=e.uiOrderStore;function n(a,l){return"renormalize"in a?a.renormalize:[{bead_id:l,rank:a.rank}]}function s(a,l){let i={...a.order};for(let d of l)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,l,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Gn(l,i,d.order),a);s(d,_);let g=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(g&&g.conflict){let w={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(w);let T=n(Gn(l,i,w.order),a);s(w,T);let x=await t("ui-order-set",{expected_revision:w.revision,entries:T});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function cn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Kn(e,t){return!t||typeof e!="string"||e.length===0||cn(t.visible_labels).includes(e)?!0:cn(t.hidden_labels).includes(e)?!1:!cn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function dn(e,t){return cn(e).filter(r=>Kn(r,t))}function sr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var vl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Io={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},yl={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},wl={review:"\u2713",skip:"\u2298"},Yt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function kl(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Lo(e){let t=e&&e.fill||"none";return t==="none"?Yt.none:e&&e.stale===!0?Yt.stale:t==="dim"?Yt.dim:e&&e.glyph==="review"?Yt.review:e&&e.glyph==="skip"?Yt.skip:Yt.done}function $l(e){if(!e||e.fill==="none"||!e.approval_state)return Lo(e);let t=[];return e.glyph==="review"?t.push(Yt.review):e.glyph==="skip"&&t.push(Yt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function xl(e,t,r){let n=vl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=wl[t&&t.glyph||""]||"",l="bar";s==="dim"?l+=` b-${n} dim`:s==="full"&&(l+=` b-${n} full`),o&&(l+=" stale"),r&&(l+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${l} style=${d}>${a}</div>
      <div class=${i}>
        ${Io[e]||e}
      </div>
    </div>
  `}function un(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=yl[r],s=e.stages,o=kl(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(l=>`${Io[l]||l} ${l==="plan"?$l(s[l]||{}):Lo(s[l]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(l=>xl(l,s[l]||{},l===o))}
    </div>
  `}function Sl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Do=2;function Al(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Do).join(", "),s=r.length-Do,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Tl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&sr(r,"route")){let o=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${o?" is-derived":""}"
        title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${o?"unset":n.route}</span
      >`)}if(n.fast_track&&sr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&sr(r,"pr")){let o=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${o!=null?` #${o}`:""}`}</span
      >`)}for(let o of dn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${o}</span>`);return e.from_id&&sr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${o=>{o.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(o,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),sr(r,"blocked")&&s.push(...Al(e.blocked_info)),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function El(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Cl(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ut(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Rl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(ko):r.children;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?c`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${s?"true":"false"}
              @click=${a=>t.onRollupToggle&&t.onRollupToggle(a,e.id)}
            >
              children ${r.count}/${n} ${s?"\u25B4":"\u25BE"}
            </button>`:c`<span class="board-card__roll-none">children 없음</span>`}
        ${Cl(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,l)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${i=>t.onChildClick&&t.onChildClick(i,a.id)}
                >
                  <span class=${El(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${l+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function pn(e,t){let r=Sl(e.priority);return c`
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
        ${r?c`<span class="board-card__pri">${r}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Tl(e,t)}
      ${e.workflow&&sr(t.policy||null,"stepper")?un(e.workflow,e.status):""}
      ${Rl(e,t)}
    </article>
  `}function hr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
        ${n?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${Dt.map(o=>c`<option
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
        ${e.items.map(o=>pn(o,t))}
      </div>
    </section>
  `}function Oo(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>pn(n,t))}
        </div>
      </div>
    </dialog>
  `}var Il=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Ll=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Dl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Ol(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
      ${r.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${r.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:r.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${n>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function Mo(e,t,r){return c`
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
        ${Il.map(n=>c`<option
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
        ${Ll.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Ol(e,t,r)}
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
        ${Dl.map(n=>c`<option
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
  `}var Ml=200,Pl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Nl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Po="beads-ui.board.sort",No=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Fl(){try{let e=window.localStorage.getItem(Po);if(e&&No.has(e))return e}catch{}return"created_desc"}function Fo(e,t){let r=Ke("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,l=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,_=t.closedRange||$t,g=s?on(s,a):null,w=ln({transport:o,uiOrderStore:a}),T=[],x=[],y=[],C=[],j=[],G=[],K=!1,z=0,R=Fl(),E=new Map,D=new Map,H=new Map,oe=new Set,ue={search:"",priority:"",type:"",labels:[]},ie=!1,ge=null;function xe(O){return String(O.status||"open")==="open"}function Ve(O){let B=String(O.status||"open");return B==="open"||B==="blocked"}function We(O){let B=ue.search.trim().toLowerCase(),te=ue.priority,ae=ue.type,de=ue.labels;return O.filter(he=>{if(B){let Ee=String(he.id||"").toLowerCase(),Oe=String(he.title||"").toLowerCase();if(!Ee.includes(B)&&!Oe.includes(B))return!1}if(te!==""&&String(he.priority)!==te||ae!==""&&String(he.issue_type||"")!==ae)return!1;if(de.length>0){let Ee=Array.isArray(he.labels)?he.labels:[];if(!de.some(Oe=>Ee.includes(Oe)))return!1}return!0})}function Se(){let O=new Set;for(let B of[T,x,y,C,j,G])for(let te of B){let ae=Array.isArray(te.labels)?te.labels:[];for(let de of ae)typeof de=="string"&&de.length>0&&O.add(de)}return Array.from(O).sort()}function le(){return ue.search.trim()!==""||ue.priority!==""||ue.type!==""||ue.labels.length>0}function I(){try{if(g){let O=g.selectBoardColumn("tab:board:in-progress","in_progress",R),B=g.selectBoardColumn("tab:board:blocked","blocked",R).filter(Ve),te=new Set(O.map(b=>b.id)),ae=g.selectBoardColumn("tab:board:ready","ready",R).filter(b=>xe(b)&&!te.has(b.id)),de=g.selectBoardColumn("tab:board:resolved","resolved",R),he=g.selectBoardColumn("tab:board:deferred","deferred",R),Ee=g.selectBoardColumn("tab:board:closed","closed").slice(0,Ml),Oe=[...B,...ae,...O,...de,...Ee];V(Oe);let Ce=new Set;for(let b of Oe)b&&b.id&&!Zn(b)&&Ce.add(b.id);let u=!le();T=u?Ir(B,Ce):B,x=u?Ir(ae,Ce):ae,y=u?Ir(O,Ce):O,C=u?Ir(de,Ce):de,j=he,z=he.length,G=u?Ir(Ee,Ce):Ee,E=new Map;for(let b of T)E.set(b.id,"open");for(let b of x)E.set(b.id,"open");for(let b of y)E.set(b.id,"in_progress");for(let b of C)E.set(b.id,"resolved");for(let b of j)E.set(b.id,"deferred");for(let b of G)E.set(b.id,"closed");D=new Map;for(let b of T)D.set(b.id,"blocked-col");for(let b of x)D.set(b.id,"ready-col");for(let b of y)D.set(b.id,"in-progress-col");for(let b of C)D.set(b.id,"resolved-col");for(let b of G)D.set(b.id,"closed-col")}Ye()}catch{T=[],x=[],y=[],C=[],j=[],G=[],H=new Map,Ye()}}function V(O){let B=new Map;for(let ae of O)ae&&ae.id&&!B.has(ae.id)&&B.set(ae.id,ae);let te=new Map;for(let ae of B.values()){let de=Zn(ae);if(!de)continue;let he=te.get(de);he||(he=[],te.set(de,he)),he.push({id:ae.id,title:ae.title,status:ae.status,metadata:ae.metadata,created_at:ae.created_at,updated_at:ae.updated_at})}H=te}function ve(O){let B=H.get(O)||[],te=0;for(let de of B)(de.status==="resolved"||de.status==="closed")&&(te+=1);let ae=an(B);return{total:B.length,count:te,current:ae,children:B}}function Z(O){return!oe.has(O)}function ye(O,B){O.preventDefault(),O.stopPropagation(),oe.has(B)?oe.delete(B):oe.add(B),Ye()}function pe(O,B){O.preventDefault(),O.stopPropagation(),n(B)}function Ne(O,B){O.preventDefault(),O.stopPropagation(),n(B)}function re(O,B){ge||n(B)}function _e(O,B){O.preventDefault(),O.stopPropagation(),ql(B).then(te=>{te&&X("\uBCF5\uC0AC\uB428","success",1200)})}function P(O,B){ge=B,O.dataTransfer&&(O.dataTransfer.setData("text/plain",B),O.dataTransfer.effectAllowed="move"),O.target.classList.add("board-card--dragging")}function M(O){O.target.classList.remove("board-card--dragging"),ft(),setTimeout(()=>{ge=null},0)}function ne(O){let B=String(O.target.value||"");!B||B===_||(_=B,i&&i(B),Ye())}function we(){return l?l.get():null}let ke={onCardClick:re,onCopyId:_e,onDragStart:P,onDragEnd:M,onClosedRangeChange:ne,rollupFor:ve,isExpanded:Z,onRollupToggle:ye,onChildClick:pe,onFromChipClick:Ne,get policy(){return we()}};function N(O,B){ge||(Ge(),n(B))}function h(O,B){O.preventDefault(),O.stopPropagation(),Ge(),n(B)}let S={...ke,onCardClick:N,onChildClick:h,onFromChipClick:h,get policy(){return we()}};function q(O){let B=O.target,te=e.querySelector(".board-filter__labels");B&&te&&te.contains(B)||se()}function W(O){O.key==="Escape"&&se()}function J(){ie||(ie=!0,document.addEventListener("mousedown",q),document.addEventListener("keydown",W),Ye())}function se(){ie&&(ie=!1,document.removeEventListener("mousedown",q),document.removeEventListener("keydown",W),Ye())}function Ie(O){O.key==="Escape"&&Ge()}function De(){K||(K=!0,document.addEventListener("keydown",Ie),Ye())}function Ge(){K&&(K=!1,document.removeEventListener("keydown",Ie),Ye())}let et={onClose:Ge,onOverlayClick(O){O.target===O.currentTarget&&Ge()}},nt={onSearchInput(O){ue.search=String(O.target.value||""),I()},onPriorityChange(O){ue.priority=String(O.target.value||""),I()},onTypeChange(O){ue.type=String(O.target.value||""),I()},onSortChange(O){let B=String(O.target.value||"");if(!(!No.has(B)||B===R)){R=B;try{window.localStorage.setItem(Po,B)}catch{}I()}},onDeferredToggle(){K?Ge():De()},onLabelMenuToggle(){ie?se():J()},onLabelToggle(O){let B=ue.labels.indexOf(O);B===-1?ue.labels.push(O):ue.labels.splice(B,1),I()},onLabelClear(){ue.labels.length!==0&&(ue.labels=[],I())},onNewIssue(){d&&d()}};function st(){return c`
      <div class="board-view">
        ${Mo(ue,nt,{sort_mode:R,deferred_popup_open:K,deferred_count:z,label_options:Se(),label_menu_open:ie})}
        <div class="board-root">
          ${hr({title:"Blocked",id:"blocked-col",items:We(T)},ke)}
          ${hr({title:"Ready",id:"ready-col",items:We(x)},ke)}
          ${hr({title:"In progress",id:"in-progress-col",items:We(y)},ke)}
          ${hr({title:"Resolved",id:"resolved-col",items:We(C)},ke)}
          ${hr({title:"Closed",id:"closed-col",items:We(G),is_closed:!0,closed_range:_},ke)}
        </div>
        ${K?Oo({items:We(j),count:z},S,et):""}
      </div>
    `}function Ye(){Te(st(),e),dt()}function dt(){try{let O=e.querySelector("#deferred-popup");O&&!O.open&&(typeof O.showModal=="function"?O.showModal():O.setAttribute("open",""));let B=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of B)Array.from(te.querySelectorAll(".board-card")).forEach((de,he)=>{de.tabIndex=he===0?0:-1})}catch{}}async function Xe(O,B){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:O,status:B}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){r("update-status failed: %o",te),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Fe(O){switch(O){case"blocked-col":return T;case"ready-col":return x;case"in-progress-col":return y;case"resolved-col":return C;default:return[]}}function pt(O,B,te){if(!o||!a)return;let ae=Fe(O),de=ae.find(u=>u.id===B);if(!de)return;let he=ae.filter(u=>u.id!==B),Ee=te.closest?te.closest(".board-card"):null,Oe=he.length;if(Ee){let u=Ee.getAttribute("data-issue-id");if(u===B)return;let b=he.findIndex(L=>L.id===u);b>=0&&(Oe=b)}let Ce=he.slice();Ce.splice(Oe,0,de),w.applyReorder(B,Ce,Oe)}function ft(){for(let O of Array.from(e.querySelectorAll(".board-column--drag-over")))O.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",O=>{O.preventDefault(),O.dataTransfer&&(O.dataTransfer.dropEffect="move");let te=O.target.closest(".board-column");te&&te!==He&&(He&&He.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),He=te)}),e.addEventListener("dragleave",O=>{let B=O.relatedTarget;(!B||!e.contains(B))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",O=>{O.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let B=O.target,te=B.closest(".board-column");if(!te)return;let ae=O.dataTransfer?.getData("text/plain")||"";if(!ae)return;let de=te.id,he=D.get(ae);if(he&&he===de){if(Nl.has(de)){if(R!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(de,ae,B)}return}let Ee=Pl[de];if(!Ee){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(ae)!==Ee&&Xe(ae,Ee)}),e.addEventListener("keydown",O=>{let B=O.target;if(!(B instanceof HTMLElement))return;let te=String(B.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||B.isContentEditable===!0)return;let ae=B.closest(".board-card");if(!ae)return;let de=String(O.key||"");if(de==="Enter"||de===" "){O.preventDefault();let Ce=ae.getAttribute("data-issue-id");Ce&&n(Ce);return}if(de!=="ArrowUp"&&de!=="ArrowDown"&&de!=="ArrowLeft"&&de!=="ArrowRight")return;O.preventDefault();let he=ae.closest(".board-column");if(!he)return;let Ee=Array.from(he.querySelectorAll(".board-card")),Oe=Ee.indexOf(ae);if(de==="ArrowDown"&&Oe<Ee.length-1){ot(ae,Ee[Oe+1]);return}if(de==="ArrowUp"&&Oe>0){ot(ae,Ee[Oe-1]);return}if(de==="ArrowLeft"||de==="ArrowRight"){let Ce=Array.from(e.querySelectorAll(".board-column")),u=Ce.indexOf(he),b=de==="ArrowRight"?1:-1,L=u+b;for(;L>=0&&L<Ce.length;){let ee=Ce[L].querySelector(".board-card");if(ee){ot(ae,ee);return}L+=b}}});function ot(O,B){try{O.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let at=null;g&&g.subscribe&&(at=g.subscribe(()=>{try{I()}catch{}}));let tt=null;return l&&l.subscribe&&(tt=l.subscribe(()=>{try{I()}catch{}})),{async load(){r("load"),I()},clear(){se(),Ge(),at&&(at(),at=null),tt&&(tt(),tt=null),e.replaceChildren(),T=[],x=[],y=[],C=[],j=[],G=[],E=new Map,D=new Map}}}function Zn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ir(e,t){return e.filter(r=>{let n=Zn(r);return!(n&&t.has(n))})}async function ql(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function or(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Bl="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ar(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function qo(e){let t=0;for(let r of qt)t+=ar(e?.[r]);return t}function Bo(e){return!e||typeof e!="object"?!1:qt.some(t=>Number.isFinite(e[t]))}function Ul(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function br(e){return Bo(e)?`\u03C4 ${Ul(qo(e))}`:null}function Tt(e){let t=br(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ar(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ar(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ar(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ar(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${qo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Bl),r.join(`
`)}function Ot(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let l of Object.values(e||{})){if(!l||l.bead_id!==t)continue;let i=l.usage;if(Bo(i)){n+=1;for(let d of qt)r[d]=ar(r[d])+ar(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:Ko,setPrototypeOf:Uo,isFrozen:zl,getPrototypeOf:Hl,getOwnPropertyDescriptor:Wl}=Object,{freeze:gt,seal:xt,create:ns}=Object,{apply:ss,construct:os}=typeof Reflect<"u"&&Reflect;gt||(gt=function(t){return t});xt||(xt=function(t){return t});ss||(ss=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});os||(os=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var fn=ht(Array.prototype.forEach),jl=ht(Array.prototype.lastIndexOf),zo=ht(Array.prototype.pop),Lr=ht(Array.prototype.push),Gl=ht(Array.prototype.splice),mn=ht(String.prototype.toLowerCase),Xn=ht(String.prototype.toString),Qn=ht(String.prototype.match),Dr=ht(String.prototype.replace),Yl=ht(String.prototype.indexOf),Vl=ht(String.prototype.trim),Et=ht(Object.prototype.hasOwnProperty),mt=ht(RegExp.prototype.test),Or=Kl(TypeError);function ht(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ss(e,t,n)}}function Kl(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return os(e,r)}}function $e(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:mn;Uo&&Uo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(zl(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Zl(e){for(let t=0;t<e.length;t++)Et(e,t)||(e[t]=null);return e}function Bt(e){let t=ns(null);for(let[r,n]of Ko(e))Et(e,r)&&(Array.isArray(n)?t[r]=Zl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Bt(n):t[r]=n);return t}function Mr(e,t){for(;e!==null;){let n=Wl(e,t);if(n){if(n.get)return ht(n.get);if(typeof n.value=="function")return ht(n.value)}e=Hl(e)}function r(){return null}return r}var Ho=gt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Jn=gt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),es=gt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xl=gt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ts=gt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ql=gt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Wo=gt(["#text"]),jo=gt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),rs=gt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Go=gt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),_n=gt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Jl=xt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ec=xt(/<%[\w\W]*|[\w\W]*%>/gm),tc=xt(/\$\{[\w\W]*/gm),rc=xt(/^data-[\-\w.\u00B7-\uFFFF]+$/),nc=xt(/^aria-[\-\w]+$/),Zo=xt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),sc=xt(/^(?:\w+script|data):/i),oc=xt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Xo=xt(/^html$/i),ac=xt(/^[a-z][.\w]*(-[.\w]+)+$/i),Yo=Object.freeze({__proto__:null,ARIA_ATTR:nc,ATTR_WHITESPACE:oc,CUSTOM_ELEMENT:ac,DATA_ATTR:rc,DOCTYPE_NAME:Xo,ERB_EXPR:ec,IS_ALLOWED_URI:Zo,IS_SCRIPT_OR_DATA:sc,MUSTACHE_EXPR:Jl,TMPLIT_EXPR:tc}),Pr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ic=function(){return typeof window>"u"?null:window},lc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Vo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Qo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ic(),t=Q=>Qo(Q);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Pr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:l,Element:i,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:w,trustedTypes:T}=e,x=i.prototype,y=Mr(x,"cloneNode"),C=Mr(x,"remove"),j=Mr(x,"nextSibling"),G=Mr(x,"childNodes"),K=Mr(x,"parentNode");if(typeof a=="function"){let Q=r.createElement("template");Q.content&&Q.content.ownerDocument&&(r=Q.content.ownerDocument)}let z,R="",{implementation:E,createNodeIterator:D,createDocumentFragment:H,getElementsByTagName:oe}=r,{importNode:ue}=n,ie=Vo();t.isSupported=typeof Ko=="function"&&typeof K=="function"&&E&&E.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ge,ERB_EXPR:xe,TMPLIT_EXPR:Ve,DATA_ATTR:We,ARIA_ATTR:Se,IS_SCRIPT_OR_DATA:le,ATTR_WHITESPACE:I,CUSTOM_ELEMENT:V}=Yo,{IS_ALLOWED_URI:ve}=Yo,Z=null,ye=$e({},[...Ho,...Jn,...es,...ts,...Wo]),pe=null,Ne=$e({},[...jo,...rs,...Go,..._n]),re=Object.seal(ns(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),_e=null,P=null,M=Object.seal(ns(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ne=!0,we=!0,ke=!1,N=!0,h=!1,S=!0,q=!1,W=!1,J=!1,se=!1,Ie=!1,De=!1,Ge=!0,et=!1,nt="user-content-",st=!0,Ye=!1,dt={},Xe=null,Fe=$e({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,ft=$e({},["audio","video","img","source","image","track"]),He=null,ot=$e({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),at="http://www.w3.org/1998/Math/MathML",tt="http://www.w3.org/2000/svg",O="http://www.w3.org/1999/xhtml",B=O,te=!1,ae=null,de=$e({},[at,tt,O],Xn),he=$e({},["mi","mo","mn","ms","mtext"]),Ee=$e({},["annotation-xml"]),Oe=$e({},["title","style","font","a","script"]),Ce=null,u=["application/xhtml+xml","text/html"],b="text/html",L=null,ee=null,Le=r.createElement("form"),je=function(v){return v instanceof RegExp||v instanceof Function},qe=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(ee&&ee===v)){if((!v||typeof v!="object")&&(v={}),v=Bt(v),Ce=u.indexOf(v.PARSER_MEDIA_TYPE)===-1?b:v.PARSER_MEDIA_TYPE,L=Ce==="application/xhtml+xml"?Xn:mn,Z=Et(v,"ALLOWED_TAGS")?$e({},v.ALLOWED_TAGS,L):ye,pe=Et(v,"ALLOWED_ATTR")?$e({},v.ALLOWED_ATTR,L):Ne,ae=Et(v,"ALLOWED_NAMESPACES")?$e({},v.ALLOWED_NAMESPACES,Xn):de,He=Et(v,"ADD_URI_SAFE_ATTR")?$e(Bt(ot),v.ADD_URI_SAFE_ATTR,L):ot,pt=Et(v,"ADD_DATA_URI_TAGS")?$e(Bt(ft),v.ADD_DATA_URI_TAGS,L):ft,Xe=Et(v,"FORBID_CONTENTS")?$e({},v.FORBID_CONTENTS,L):Fe,_e=Et(v,"FORBID_TAGS")?$e({},v.FORBID_TAGS,L):Bt({}),P=Et(v,"FORBID_ATTR")?$e({},v.FORBID_ATTR,L):Bt({}),dt=Et(v,"USE_PROFILES")?v.USE_PROFILES:!1,ne=v.ALLOW_ARIA_ATTR!==!1,we=v.ALLOW_DATA_ATTR!==!1,ke=v.ALLOW_UNKNOWN_PROTOCOLS||!1,N=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,h=v.SAFE_FOR_TEMPLATES||!1,S=v.SAFE_FOR_XML!==!1,q=v.WHOLE_DOCUMENT||!1,se=v.RETURN_DOM||!1,Ie=v.RETURN_DOM_FRAGMENT||!1,De=v.RETURN_TRUSTED_TYPE||!1,J=v.FORCE_BODY||!1,Ge=v.SANITIZE_DOM!==!1,et=v.SANITIZE_NAMED_PROPS||!1,st=v.KEEP_CONTENT!==!1,Ye=v.IN_PLACE||!1,ve=v.ALLOWED_URI_REGEXP||Zo,B=v.NAMESPACE||O,he=v.MATHML_TEXT_INTEGRATION_POINTS||he,Ee=v.HTML_INTEGRATION_POINTS||Ee,re=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&je(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(re.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&je(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(re.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(re.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),h&&(we=!1),Ie&&(se=!0),dt&&(Z=$e({},Wo),pe=[],dt.html===!0&&($e(Z,Ho),$e(pe,jo)),dt.svg===!0&&($e(Z,Jn),$e(pe,rs),$e(pe,_n)),dt.svgFilters===!0&&($e(Z,es),$e(pe,rs),$e(pe,_n)),dt.mathMl===!0&&($e(Z,ts),$e(pe,Go),$e(pe,_n))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?M.tagCheck=v.ADD_TAGS:(Z===ye&&(Z=Bt(Z)),$e(Z,v.ADD_TAGS,L))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?M.attributeCheck=v.ADD_ATTR:(pe===Ne&&(pe=Bt(pe)),$e(pe,v.ADD_ATTR,L))),v.ADD_URI_SAFE_ATTR&&$e(He,v.ADD_URI_SAFE_ATTR,L),v.FORBID_CONTENTS&&(Xe===Fe&&(Xe=Bt(Xe)),$e(Xe,v.FORBID_CONTENTS,L)),st&&(Z["#text"]=!0),q&&$e(Z,["html","head","body"]),Z.table&&($e(Z,["tbody"]),delete _e.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');z=v.TRUSTED_TYPES_POLICY,R=z.createHTML("")}else z===void 0&&(z=lc(T,s)),z!==null&&typeof R=="string"&&(R=z.createHTML(""));gt&&gt(v),ee=v}},Be=$e({},[...Jn,...es,...Xl]),Qe=$e({},[...ts,...Ql]),ct=function(v){let U=K(v);(!U||!U.tagName)&&(U={namespaceURI:B,tagName:"template"});let f=mn(v.tagName),m=mn(U.tagName);return ae[v.namespaceURI]?v.namespaceURI===tt?U.namespaceURI===O?f==="svg":U.namespaceURI===at?f==="svg"&&(m==="annotation-xml"||he[m]):!!Be[f]:v.namespaceURI===at?U.namespaceURI===O?f==="math":U.namespaceURI===tt?f==="math"&&Ee[m]:!!Qe[f]:v.namespaceURI===O?U.namespaceURI===tt&&!Ee[m]||U.namespaceURI===at&&!he[m]?!1:!Qe[f]&&(Oe[f]||!Be[f]):!!(Ce==="application/xhtml+xml"&&ae[v.namespaceURI]):!1},Ze=function(v){Lr(t.removed,{element:v});try{K(v).removeChild(v)}catch{C(v)}},rt=function(v,U){try{Lr(t.removed,{attribute:U.getAttributeNode(v),from:U})}catch{Lr(t.removed,{attribute:null,from:U})}if(U.removeAttribute(v),v==="is")if(se||Ie)try{Ze(U)}catch{}else try{U.setAttribute(v,"")}catch{}},be=function(v){let U=null,f=null;if(J)v="<remove></remove>"+v;else{let $=Qn(v,/^[\r\n\t ]+/);f=$&&$[0]}Ce==="application/xhtml+xml"&&B===O&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let m=z?z.createHTML(v):v;if(B===O)try{U=new w().parseFromString(m,Ce)}catch{}if(!U||!U.documentElement){U=E.createDocument(B,"template",null);try{U.documentElement.innerHTML=te?R:m}catch{}}let p=U.body||U.documentElement;return v&&f&&p.insertBefore(r.createTextNode(f),p.childNodes[0]||null),B===O?oe.call(U,q?"html":"body")[0]:q?U.documentElement:p},it=function(v){return D.call(v.ownerDocument||v,v,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},yt=function(v){return v instanceof g&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof _)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},fe=function(v){return typeof l=="function"&&v instanceof l};function Ae(Q,v,U){fn(Q,f=>{f.call(t,v,U,ee)})}let kt=function(v){let U=null;if(Ae(ie.beforeSanitizeElements,v,null),yt(v))return Ze(v),!0;let f=L(v.nodeName);if(Ae(ie.uponSanitizeElement,v,{tagName:f,allowedTags:Z}),S&&v.hasChildNodes()&&!fe(v.firstElementChild)&&mt(/<[/\w!]/g,v.innerHTML)&&mt(/<[/\w!]/g,v.textContent)||v.nodeType===Pr.progressingInstruction||S&&v.nodeType===Pr.comment&&mt(/<[/\w]/g,v.data))return Ze(v),!0;if(!(M.tagCheck instanceof Function&&M.tagCheck(f))&&(!Z[f]||_e[f])){if(!_e[f]&&Wt(f)&&(re.tagNameCheck instanceof RegExp&&mt(re.tagNameCheck,f)||re.tagNameCheck instanceof Function&&re.tagNameCheck(f)))return!1;if(st&&!Xe[f]){let m=K(v)||v.parentNode,p=G(v)||v.childNodes;if(p&&m){let $=p.length;for(let k=$-1;k>=0;--k){let F=y(p[k],!0);F.__removalCount=(v.__removalCount||0)+1,m.insertBefore(F,j(v))}}}return Ze(v),!0}return v instanceof i&&!ct(v)||(f==="noscript"||f==="noembed"||f==="noframes")&&mt(/<\/no(script|embed|frames)/i,v.innerHTML)?(Ze(v),!0):(h&&v.nodeType===Pr.text&&(U=v.textContent,fn([ge,xe,Ve],m=>{U=Dr(U,m," ")}),v.textContent!==U&&(Lr(t.removed,{element:v.cloneNode()}),v.textContent=U)),Ae(ie.afterSanitizeElements,v,null),!1)},Ht=function(v,U,f){if(Ge&&(U==="id"||U==="name")&&(f in r||f in Le))return!1;if(!(we&&!P[U]&&mt(We,U))){if(!(ne&&mt(Se,U))){if(!(M.attributeCheck instanceof Function&&M.attributeCheck(U,v))){if(!pe[U]||P[U]){if(!(Wt(v)&&(re.tagNameCheck instanceof RegExp&&mt(re.tagNameCheck,v)||re.tagNameCheck instanceof Function&&re.tagNameCheck(v))&&(re.attributeNameCheck instanceof RegExp&&mt(re.attributeNameCheck,U)||re.attributeNameCheck instanceof Function&&re.attributeNameCheck(U,v))||U==="is"&&re.allowCustomizedBuiltInElements&&(re.tagNameCheck instanceof RegExp&&mt(re.tagNameCheck,f)||re.tagNameCheck instanceof Function&&re.tagNameCheck(f))))return!1}else if(!He[U]){if(!mt(ve,Dr(f,I,""))){if(!((U==="src"||U==="xlink:href"||U==="href")&&v!=="script"&&Yl(f,"data:")===0&&pt[v])){if(!(ke&&!mt(le,Dr(f,I,"")))){if(f)return!1}}}}}}}return!0},Wt=function(v){return v!=="annotation-xml"&&Qn(v,V)},It=function(v){Ae(ie.beforeSanitizeAttributes,v,null);let{attributes:U}=v;if(!U||yt(v))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},m=U.length;for(;m--;){let p=U[m],{name:$,namespaceURI:k,value:F}=p,me=L($),lt=F,Me=$==="value"?lt:Vl(lt);if(f.attrName=me,f.attrValue=Me,f.keepAttr=!0,f.forceKeepAttr=void 0,Ae(ie.uponSanitizeAttribute,v,f),Me=f.attrValue,et&&(me==="id"||me==="name")&&(rt($,v),Me=nt+Me),S&&mt(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){rt($,v);continue}if(me==="attributename"&&Qn(Me,"href")){rt($,v);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){rt($,v);continue}if(!N&&mt(/\/>/i,Me)){rt($,v);continue}h&&fn([ge,xe,Ve],jt=>{Me=Dr(Me,jt," ")});let _t=L(v.nodeName);if(!Ht(_t,me,Me)){rt($,v);continue}if(z&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!k)switch(T.getAttributeType(_t,me)){case"TrustedHTML":{Me=z.createHTML(Me);break}case"TrustedScriptURL":{Me=z.createScriptURL(Me);break}}if(Me!==lt)try{k?v.setAttributeNS(k,$,Me):v.setAttribute($,Me),yt(v)?Ze(v):zo(t.removed)}catch{rt($,v)}}Ae(ie.afterSanitizeAttributes,v,null)},Pt=function Q(v){let U=null,f=it(v);for(Ae(ie.beforeSanitizeShadowDOM,v,null);U=f.nextNode();)Ae(ie.uponSanitizeShadowNode,U,null),kt(U),It(U),U.content instanceof o&&Q(U.content);Ae(ie.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(Q){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},U=null,f=null,m=null,p=null;if(te=!Q,te&&(Q="<!-->"),typeof Q!="string"&&!fe(Q))if(typeof Q.toString=="function"){if(Q=Q.toString(),typeof Q!="string")throw Or("dirty is not a string, aborting")}else throw Or("toString is not a function");if(!t.isSupported)return Q;if(W||qe(v),t.removed=[],typeof Q=="string"&&(Ye=!1),Ye){if(Q.nodeName){let F=L(Q.nodeName);if(!Z[F]||_e[F])throw Or("root node is forbidden and cannot be sanitized in-place")}}else if(Q instanceof l)U=be("<!---->"),f=U.ownerDocument.importNode(Q,!0),f.nodeType===Pr.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?U=f:U.appendChild(f);else{if(!se&&!h&&!q&&Q.indexOf("<")===-1)return z&&De?z.createHTML(Q):Q;if(U=be(Q),!U)return se?null:De?R:""}U&&J&&Ze(U.firstChild);let $=it(Ye?Q:U);for(;m=$.nextNode();)kt(m),It(m),m.content instanceof o&&Pt(m.content);if(Ye)return Q;if(se){if(Ie)for(p=H.call(U.ownerDocument);U.firstChild;)p.appendChild(U.firstChild);else p=U;return(pe.shadowroot||pe.shadowrootmode)&&(p=ue.call(n,p,!0)),p}let k=q?U.outerHTML:U.innerHTML;return q&&Z["!doctype"]&&U.ownerDocument&&U.ownerDocument.doctype&&U.ownerDocument.doctype.name&&mt(Xo,U.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+U.ownerDocument.doctype.name+`>
`+k),h&&fn([ge,xe,Ve],F=>{k=Dr(k,F," ")}),z&&De?z.createHTML(k):k},t.setConfig=function(){let Q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};qe(Q),W=!0},t.clearConfig=function(){ee=null,W=!1},t.isValidAttribute=function(Q,v,U){ee||qe({});let f=L(Q),m=L(v);return Ht(f,m,U)},t.addHook=function(Q,v){typeof v=="function"&&Lr(ie[Q],v)},t.removeHook=function(Q,v){if(v!==void 0){let U=jl(ie[Q],v);return U===-1?void 0:Gl(ie[Q],U,1)[0]}return zo(ie[Q])},t.removeHooks=function(Q){ie[Q]=[]},t.removeAllHooks=function(){ie=Vo()},t}var Jo=Qo();var ea={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ta=e=>(...t)=>({_$litDirective$:e,values:t}),gn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Nr=class extends gn{constructor(t){if(super(t),this.it=Je,t.type!==ea.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Je||t==null)return this._t=void 0,this.it=t;if(t===tr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Nr.directiveName="unsafeHTML",Nr.resultType=1;var ra=ta(Nr);function cs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var lr=cs();function ca(e){lr=e}var Ur={exec:()=>null};function Re(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(bt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var cc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),bt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},dc=/^(?:[ \t]*(?:\n|$))+/,uc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,pc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,fc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ds=/(?:[*+-]|\d{1,9}[.)])/,da=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ua=Re(da).replace(/bull/g,ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),_c=Re(da).replace(/bull/g,ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),us=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,mc=/^[^\n]+/,ps=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,gc=Re(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ps).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),hc=Re(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ds).getRegex(),kn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bc=Re("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",fs).replace("tag",kn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),pa=Re(us).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex(),vc=Re(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",pa).getRegex(),_s={blockquote:vc,code:uc,def:gc,fences:pc,heading:fc,hr:zr,html:bc,lheading:ua,list:hc,newline:dc,paragraph:pa,table:Ur,text:mc},na=Re("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex(),yc={..._s,lheading:_c,table:na,paragraph:Re(us).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",na).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",kn).getRegex()},wc={..._s,html:Re(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ur,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Re(us).replace("hr",zr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ua).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},kc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,$c=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,fa=/^( {2,}|\\)\n(?!\s*$)/,xc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,$n=/[\p{P}\p{S}]/u,ms=/[\s\p{P}\p{S}]/u,_a=/[^\s\p{P}\p{S}]/u,Sc=Re(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ms).getRegex(),ma=/(?!~)[\p{P}\p{S}]/u,Ac=/(?!~)[\s\p{P}\p{S}]/u,Tc=/(?:[^\s\p{P}\p{S}]|~)/u,Ec=Re(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",cc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ga=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Cc=Re(ga,"u").replace(/punct/g,$n).getRegex(),Rc=Re(ga,"u").replace(/punct/g,ma).getRegex(),ha="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ic=Re(ha,"gu").replace(/notPunctSpace/g,_a).replace(/punctSpace/g,ms).replace(/punct/g,$n).getRegex(),Lc=Re(ha,"gu").replace(/notPunctSpace/g,Tc).replace(/punctSpace/g,Ac).replace(/punct/g,ma).getRegex(),Dc=Re("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,_a).replace(/punctSpace/g,ms).replace(/punct/g,$n).getRegex(),Oc=Re(/\\(punct)/,"gu").replace(/punct/g,$n).getRegex(),Mc=Re(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Pc=Re(fs).replace("(?:-->|$)","-->").getRegex(),Nc=Re("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Pc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),vn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Fc=Re(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",vn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ba=Re(/^!?\[(label)\]\[(ref)\]/).replace("label",vn).replace("ref",ps).getRegex(),va=Re(/^!?\[(ref)\](?:\[\])?/).replace("ref",ps).getRegex(),qc=Re("reflink|nolink(?!\\()","g").replace("reflink",ba).replace("nolink",va).getRegex(),sa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gs={_backpedal:Ur,anyPunctuation:Oc,autolink:Mc,blockSkip:Ec,br:fa,code:$c,del:Ur,emStrongLDelim:Cc,emStrongRDelimAst:Ic,emStrongRDelimUnd:Dc,escape:kc,link:Fc,nolink:va,punctuation:Sc,reflink:ba,reflinkSearch:qc,tag:Nc,text:xc,url:Ur},Bc={...gs,link:Re(/^!?\[(label)\]\((.*?)\)/).replace("label",vn).getRegex(),reflink:Re(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",vn).getRegex()},as={...gs,emStrongRDelimAst:Lc,emStrongLDelim:Rc,url:Re(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",sa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Re(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",sa).getRegex()},Uc={...as,br:Re(fa).replace("{2,}","*").getRegex(),text:Re(as.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},hn={normal:_s,gfm:yc,pedantic:wc},Fr={normal:gs,gfm:as,breaks:Uc,pedantic:Bc},zc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},oa=e=>zc[e];function Ut(e,t){if(t){if(bt.escapeTest.test(e))return e.replace(bt.escapeReplace,oa)}else if(bt.escapeTestNoEncode.test(e))return e.replace(bt.escapeReplaceNoEncode,oa);return e}function aa(e){try{e=encodeURI(e).replace(bt.percentDecode,"%")}catch{return null}return e}function ia(e,t){let r=e.replace(bt.findPipe,(o,a,l)=>{let i=!1,d=a;for(;--d>=0&&l[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(bt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(bt.slashPipe,"|");return n}function qr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Hc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function la(e,t,r,n,s){let o=t.href,a=t.title||null,l=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:l,tokens:n.inlineTokens(l)};return n.state.inLink=!1,i}function Wc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[l]=a;return l.length>=s.length?o.slice(s.length):o}).join(`
`)}var yn=class{constructor(e){ze(this,"options");ze(this,"rules");ze(this,"lexer");this.options=e||lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:qr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Wc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=qr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=qr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,l=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))l.push(r[i]),a=!0;else if(!a)l.push(r[i]);else break;r=r.slice(i);let d=l.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=g,r.length===0)break;let w=o.at(-1);if(w?.type==="code")break;if(w?.type==="blockquote"){let T=w,x=T.raw+`
`+r.join(`
`),y=this.blockquote(x);o[o.length-1]=y,n=n.substring(0,n.length-T.raw.length)+y.raw,s=s.substring(0,s.length-T.text.length)+y.text;break}else if(w?.type==="list"){let T=w,x=T.raw+`
`+r.join(`
`),y=this.list(x);o[o.length-1]=y,n=n.substring(0,n.length-w.raw.length)+y.raw,s=s.substring(0,s.length-T.raw.length)+y.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,y=>" ".repeat(3*y.length)),w=e.split(`
`,1)[0],T=!g.trim(),x=0;if(this.options.pedantic?(x=2,_=g.trimStart()):T?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,_=g.slice(x),x+=t[1].length),T&&this.rules.other.blankLine.test(w)&&(d+=w+`
`,e=e.substring(w.length+1),i=!0),!i){let y=this.rules.other.nextBulletRegex(x),C=this.rules.other.hrRegex(x),j=this.rules.other.fencesBeginRegex(x),G=this.rules.other.headingBeginRegex(x),K=this.rules.other.htmlBeginRegex(x);for(;e;){let z=e.split(`
`,1)[0],R;if(w=z,this.options.pedantic?(w=w.replace(this.rules.other.listReplaceNesting,"  "),R=w):R=w.replace(this.rules.other.tabCharGlobal,"    "),j.test(w)||G.test(w)||K.test(w)||y.test(w)||C.test(w))break;if(R.search(this.rules.other.nonSpaceChar)>=x||!w.trim())_+=`
`+R.slice(x);else{if(T||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||j.test(g)||G.test(g)||C.test(g))break;_+=`
`+w}!T&&!w.trim()&&(T=!0),d+=z+`
`,e=e.substring(z.length+1),g=R.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=_.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=_.raw+i.tokens[0].raw,i.tokens[0].text=_.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(_)):i.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):i.tokens.unshift(_)}}if(!s.loose){let d=i.tokens.filter(g=>g.type==="space"),_=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=_}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=ia(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(ia(a,o.header.length).map((l,i)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=qr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Hc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),la(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return la(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,l=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){l+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+i);let _=[...n[0]][0].length,g=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let T=g.slice(1,-1);return{type:"em",raw:g,text:T,tokens:this.lexer.inlineTokens(T)}}let w=g.slice(2,-2);return{type:"strong",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ct=class is{constructor(t){ze(this,"tokens");ze(this,"options");ze(this,"state");ze(this,"inlineQueue");ze(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||lr,this.options.tokenizer=this.options.tokenizer||new yn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:bt,block:hn.normal,inline:Fr.normal};this.options.pedantic?(r.block=hn.pedantic,r.inline=Fr.pedantic):this.options.gfm&&(r.block=hn.gfm,this.options.breaks?r.inline=Fr.breaks:r.inline=Fr.gfm),this.tokenizer.rules=r}static get rules(){return{block:hn,inline:Fr}}static lex(t,r){return new is(r).lex(t)}static lexInline(t,r){return new is(r).inlineTokens(t)}lex(t){t=t.replace(bt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(bt.tabCharGlobal,"    ").replace(bt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,l=t.slice(1),i;this.options.extensions.startBlock.forEach(d=>{i=d.call({lexer:this},l),typeof i=="number"&&i>=0&&(a=Math.min(a,i))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,l="";for(;t;){a||(l=""),a=!1;let i;if(this.options.extensions?.inline?.some(_=>(i=_.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let _=r.at(-1);i.type==="text"&&_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,l)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,g=t.slice(1),w;this.options.extensions.startInline.forEach(T=>{w=T.call({lexer:this},g),typeof w=="number"&&w>=0&&(_=Math.min(_,w))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(l=i.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},wn=class{constructor(e){ze(this,"options");ze(this,"parser");this.options=e||lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(bt.notSpaceStart)?.[0],s=e.replace(bt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Ut(n)+'">'+(r?s:Ut(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Ut(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ut(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=aa(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ut(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=aa(e);if(s===null)return Ut(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ut(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ut(e.text)}},hs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Rt=class ls{constructor(t){ze(this,"options");ze(this,"renderer");ze(this,"textRenderer");this.options=t||lr,this.options.renderer=this.options.renderer||new wn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new hs}static parse(t,r){return new ls(r).parse(t)}static parseInline(t,r){return new ls(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=l||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=l||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return n}},bn,Br=(bn=class{constructor(e){ze(this,"options");ze(this,"block");this.options=e||lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ct.lex:Ct.lexInline}provideParser(){return this.block?Rt.parse:Rt.parseInline}},ze(bn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),ze(bn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),bn),jc=class{constructor(...e){ze(this,"defaults",cs());ze(this,"options",this.setOptions);ze(this,"parse",this.parseMarkdown(!0));ze(this,"parseInline",this.parseMarkdown(!1));ze(this,"Parser",Rt);ze(this,"Renderer",wn);ze(this,"TextRenderer",hs);ze(this,"Lexer",Ct);ze(this,"Tokenizer",yn);ze(this,"Hooks",Br);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new wn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,l=r.renderer[a],i=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=i.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new yn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,l=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let _=l.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Br;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,l=r.hooks[a],i=s[a];Br.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Br.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await l.call(s,d);return i.call(s,g)})();let _=l.call(s,d);return i.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let g=await l.apply(s,d);return g===!1&&(g=await i.apply(s,d)),g})();let _=l.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ct.lex(e,t??this.defaults)}parser(e,t){return Rt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ct.lex:Ct.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():e?Rt.parse:Rt.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ut(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},ir=new jc;function Pe(e,t){return ir.parse(e,t)}Pe.options=Pe.setOptions=function(e){return ir.setOptions(e),Pe.defaults=ir.defaults,ca(Pe.defaults),Pe};Pe.getDefaults=cs;Pe.defaults=lr;Pe.use=function(...e){return ir.use(...e),Pe.defaults=ir.defaults,ca(Pe.defaults),Pe};Pe.walkTokens=function(e,t){return ir.walkTokens(e,t)};Pe.parseInline=ir.parseInline;Pe.Parser=Rt;Pe.parser=Rt.parse;Pe.Renderer=wn;Pe.TextRenderer=hs;Pe.Lexer=Ct;Pe.lexer=Ct.lex;Pe.Tokenizer=yn;Pe.Hooks=Br;Pe.parse=Pe;var uf=Pe.options,pf=Pe.setOptions,ff=Pe.use,_f=Pe.walkTokens,mf=Pe.parseInline;var gf=Rt.parse,hf=Ct.lex;function Vt(e){let t=Pe.parse(e),r=Jo.sanitize(t);return ra(r)}function zt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function yr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function xn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Gc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Yc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Vc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Kt(e){return!!e&&typeof e=="object"}function bs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ya(e,t){let r=bs(e),n=bs(t),s=new Map;for(let l of r)s.set(l,(s.get(l)||0)+1);let o=0;for(let l of n){let i=s.get(l)||0;i>0?s.set(l,i-1):o+=1}let a=0;for(let l of s.values())a+=l;return{added:o,removed:a}}function Kc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Kt(s)&&typeof s.text=="string"?s.text:"").join(""):Kt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Zc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Gc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=bs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ya(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let l of a){let i=ya(Kt(l)?l.old_string:"",Kt(l)?l.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function wa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ka(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Yc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Vc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Xc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Kt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ka(o.text));else if(o.type==="thinking"){let a=wa(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Zc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Kt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Kc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Qc(e){if(e.type==="item.completed"&&Kt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ka(t.text)];if(t.type==="reasoning"){let r=wa(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Jc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function $a(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let l=s.trim();if(l.length===0)continue;try{o=JSON.parse(l)}catch{continue}}if(!Kt(o))continue;let a=Jc(o)?Qc(o):Xc(o,r);for(let l of a)t.push(l)}return t}var ed=5,td=10,rd=/Task\s+#(\d+)/,nd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,sd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Sn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function od(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function ad(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function id(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=rd.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let l=o.activeForm||o.subject;typeof l=="string"&&l.trim().length>0&&(a.label=l.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function ld(e){if(e.tool==="Bash"){let t=e.command||"";return nd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":sd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function cd(e){let t=e.filter(s=>s.kind==="tool").slice(-td),r=new Map;t.forEach((s,o)=>{let a=ld(s);if(!a)return;let l=r.get(a)||{count:0,last:-1};l.count+=1,l.last=o,r.set(a,l)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function dd(e){let t=ad(e);if(t)return{text:t,guess:!1};let r=id(e);if(r)return{text:r,guess:!1};let n=cd(e);return n?{text:n,guess:!0}:null}function ud(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:wt(e,t)}function An(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},l=!0,i=new Set,d=new Set,_=null,g=null,w=!1,T=!1,x=!1,y=null,C=null;function j(){w=!1,T=!1,x=!1,y=null,C=null}async function G(P){if(r){T=!0,x=!1,I();try{let M=await Promise.resolve(r("get-attempt-prompt",{attempt_id:P}));if(o!==P)return;!M||typeof M!="object"||Array.isArray(M)?x=!0:(y=M,C=P)}catch{o===P&&(x=!0)}finally{o===P&&(T=!1,I())}}}function K(){if(w=!w,w&&o&&C!==o){G(o);return}I()}function z(){if(!w)return"";let P=yr({loading:T,error:x});if(P)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${P}
      </div>`;if(!y)return"";if(y.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let M=xn(y.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${M?c`<div class="prompt-block__meta">${M} 발송</div>`:""}
      ${typeof y.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",y.task_prompt):""}
      ${typeof y.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",y.system_prompt):""}
    </div>`}function R(){if(!o||!n)return[];let P=n.get(o);return $a(P?P.lines:[])}function E(){if(!o||!n)return null;let P=n.get(o),M=P?P.last_event_at:null;return typeof M=="number"?M:null}function D(){return a.status==="running"}function H(){if(D()&&o){g||(g=setInterval(()=>I(),1e3));return}oe()}function oe(){g&&(clearInterval(g),g=null)}function ue(P){let M=[],ne=0;for(;ne<P.length;){let we=P[ne];if(we.kind==="tool"){let ke=ne;for(;ke<P.length&&P[ke].kind==="tool"&&P[ke].tool===we.tool;)ke+=1;if(ke-ne>=ed&&!d.has(ne)){M.push({kind:"group",idx:ne,tool:we.tool||"",lines:P.slice(ne,ke).map((N,h)=>({idx:ne+h,line:N}))}),ne=ke;continue}}M.push({kind:"line",idx:ne,line:we}),ne+=1}return M}function ie(P){for(let M=P.length-1;M>=0;M-=1){let ne=P[M];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function ge(P){for(let M=P.length-1;M>=0;M-=1)if(P[M].kind==="thinking")return P[M];return null}function xe(P,M){if(M.kind==="gate")return c`<div class="sv__gate">${M.text}</div>`;if(M.kind==="phase")return c`<div class="sv__phase">${M.text}</div>`;if(M.kind==="result")return c`<div
        class="sv__result${M.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${M.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Vt(M.text||(M.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(M.kind==="thinking"){let ne=i.has(P);return c`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ve(P)}
      >
        <span class="sv__think-line">💭 ${Sn(M.text)}</span>
        ${ne?c`<pre class="sv__think-expand">${M.text}</pre>`:""}
      </div>`}if(M.kind==="error")return c`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="blocker")return c`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="tool"){let ne=i.has(P),we=M.tool==="Bash"?od(M.command):0,ke=M.tool==="Bash"?we>1?Sn(M.command):M.command:M.path||M.command||"";return c`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ve(P)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${M.icon}</span>
          <span class="sv__tool-name">${M.tool}</span>
          ${ke?c`<span class="sv__tool-detail">${ke}</span>`:""}
          ${we>1?c`<span class="sv__tool-more">⋯ ${we}줄</span>`:""}
          ${typeof M.added=="number"?c`<span class="sv__diff-add">+${M.added}</span>`:""}
          ${typeof M.removed=="number"?c`<span class="sv__diff-del">−${M.removed}</span>`:""}
          ${M.result?c`<span class="sv__tool-ok">→ ${M.result}</span>`:""}
        </span>
        ${ne?c`<pre class="sv__tool-expand">${Ve(M)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${Vt(M.text||"")}</div>`}function Ve(P){let M=[];if(P.tool==="Bash"&&typeof P.command=="string"&&P.command.length>0)M.push(P.command);else if(P.input!==void 0)try{M.push(`input: ${JSON.stringify(P.input,null,2)}`)}catch{}return typeof P.output=="string"&&P.output.length>0&&M.push(`output:
${P.output}`),M.join(`

`)}function We(){if(!o)return c``;let P=R(),M=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ne=a.session_id||"",we=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${l?"ON":"OFF"}`,ke=D(),N=ke?ud(E(),Date.now()):"",h=ke?ie(P):null,S=ke?ge(P):null,q=dd(P);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${q?c`<span
              class="sv__stage${q.guess?" sv__stage--guess":""}"
              title=${q.text}
              >${q.text}</span
            >`:""}
        ${ke?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${N?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${N}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${N?c`<span class="sv__live-ago">${N}</span>`:""}</span
            >`:""}
        ${ne?c`<button
              type="button"
              class="sv__session"
              title=${ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ne}`}
              @click=${()=>ye(ne)}
            >
              ⧉ ${ne.slice(0,8)}
            </button>`:""}
        ${M?c`<span class="sv__meta">${M}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${w?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${w?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${K}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${l?" sv__follow--on":""}"
          aria-pressed=${l?"true":"false"}
          aria-label=${we}
          @click=${Z}
        >
          <span class="sv__follow-full">⇣ ${we}</span>
          <span class="sv__follow-short">⇣ ${l?"ON":"OFF"}</span>
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
      ${z()}
      <div class="sv__body">
        ${P.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ue(P).map(W=>W.kind==="group"?Se(W):xe(W.idx,W.line))}
      </div>
      ${h||S?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${h?c`<span class="sv__now-icon">${h.icon}</span>
                  <span class="sv__now-name">${h.tool}</span>
                  <span class="sv__now-detail"
                    >${h.tool==="Bash"?Sn(h.command):h.path||h.command||""}</span
                  >`:""}
            ${S?c`<span class="sv__now-think"
                  >💭 ${Sn(S.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(P){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>le(P.idx)}
    >
      <span class="sv__group-icon">${P.lines[0].line.icon}</span>
      <span class="sv__group-name">${P.tool}</span>
      <span class="sv__group-count">${P.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function le(P){d.add(P),I()}function I(){Te(We(),e),H(),l&&V()}function V(){let P=e.querySelector(".sv__body");P&&(P.scrollTop=P.scrollHeight)}function ve(P){i.has(P)?i.delete(P):i.add(P),I()}function Z(){l=!l,I()}function ye(P){or(P).then(M=>{M?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(P){!o||!P||(a={...a,...P},I())}function Ne(P){let M=P.target;if(!M||!M.classList||!M.classList.contains("sv__body"))return;!(M.scrollHeight-M.scrollTop-M.clientHeight<=4)&&l&&(l=!1,I())}e.addEventListener("scroll",Ne,!0);function re(P){let M=P&&P.attempt_id;M&&(o=M,a=P.meta||{},l=!0,i.clear(),d.clear(),j(),!_&&n&&(_=n.subscribe(I)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),I())}function _e(){let P=o;o=null,i.clear(),d.clear(),j(),oe(),r&&P&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${P}`})).catch(()=>{}),Te(c``,e),s&&s()}return{open:re,updateMeta:pe,close:_e,isOpen(){return o!==null},destroy(){oe(),_&&(_(),_=null),e.removeEventListener("scroll",Ne,!0),o=null,Te(c``,e)}}}function pd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function fd(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim(),missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:pd(t)?null:"plan_pending"}),r}function xa(e,t){let r=fd(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${r.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${r.map(n=>c`<div class="detail-art">
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
  `}var _d="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",md=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,gd=/^\*\*결론\*\* — (.+)$/;function Sa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==_d)return null;let r=md.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let l=a<t.length?gd.exec(t[a]):null,i=l?l[1].replace(/\s+/g," ").trim():"",d=l?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var Aa=20;function Ta(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function hd(e){return e.length>Aa?`${e.slice(0,Aa)}\u2026`:e}function bd(e,t,r,n){let s=`${t.lane} ${hd(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${Ta(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${Vt(t.body)}
        </div>`:""}
  </div>`}function vd(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ta(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Vt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ea(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,l=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:l.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${l.map(i=>{let d=Sa(typeof i.text=="string"?i.text:"");return d?bd(i,d,t,s.has(i.id)):vd(i)})}
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
  `}var yd=["codex","opus","fable","self","skip"],wd=["codex","fable","skip"],kd=["low","medium","high","xhigh"],$d=["standard","fast_track"],jr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_model","impl_effort"],ys={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ca={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},xd=["self","skip"],Sd="opus",Tn={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function En(e){let t=ys[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function Ad(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:Tn[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Cn(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function vs(e){return{value:e,label:e}}function Da(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Td(e,t){let r=Cn(e);if(!r)return t?[{label:null,options:[vs(t)]}]:[];let n=r.map(([o,a])=>({label:o,options:Object.keys(a.models).map(vs)})),s=n.some(o=>o.options.some(a=>a.value===t));return t&&!s?[Da(t),...n]:n}function wr(e,t){let r={label:null,options:e.map(vs)};return t&&!e.includes(t)?[Da(t),r]:[r]}function Ed(e,t){let r=Cn(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Oa(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ra(e,t){let r=Cn(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Oa(n,n.models[t]);return[]}function Cd(e){let t=Cn(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Oa(n,s))r.includes(o)||r.push(o);return r}function cr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n}=e,s=r("orchestration_model")||Sd,o=r("impl_model");return jr.map(a=>{let l=t(a),i,d=!1;return a==="orchestration_model"||a==="impl_model"?i=Td(n,l):a==="orchestration_effort"?i=wr(Ra(n,s),l):a==="impl_effort"?i=wr(o?Ra(n,o):Cd(n),l):a==="plan_review_model"?i=wr(wd,l):Object.hasOwn(Ca,a)?(i=wr(kd,l),d=xd.includes(r(Ca[a]))):i=wr(yd,l),{key:a,groups:i,selected:l,disabled:d,runner:a==="orchestration_model"?Ed(n,s):null}})}function Wr(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>Ia(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>Ia(s,t))}
          </optgroup>`)}
  `}function Ia(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function La(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${En(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${l=>a.onChange(e,l.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function Ma(e,t,r,n){let s=e&&e.metadata||{},o=r&&typeof r=="object"?r:{},a=_=>typeof s[_]=="string"?s[_]:"",i=cr({selectedOf:a,effectiveOf:_=>{let g=a(_);return g||(typeof o[_]=="string"?o[_]:"")},runner_catalog:n}),d=s.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${i.map(_=>La(_.key,Wr(_.groups,_.selected,Ad(_.key,o)),_.selected,!1,_.disabled,_.runner,t))}
    ${La("workflow_mode",Wr(wr($d,d),d),d,s.workflow_mode==="fast_track",!1,null,t)}
  `}function Rd(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Pa(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",l="";function i(x){x.key==="Escape"&&s&&(x.preventDefault(),w())}document.addEventListener("keydown",i);function d(){return s?c`
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:Vt(a)}
          </div>
        </div>
      </div>
    `:c``}function _(){Te(d(),e)}async function g(x,y={}){s=x,o="loading",a="",l="",_();let C=r?r():"";if(!C){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let j="/api/doc?workspace="+encodeURIComponent(C)+"&path="+encodeURIComponent(x);try{let G=await n(j),K=await G.json().catch(()=>({}));if(!G.ok||!K||K.ok!==!0){if(K?.error==="not_found"&&y.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(K&&K.error||G.status)+")",_();return}a=String(K.content||""),o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function w(){s=null,Te(c``,e)}function T(){document.removeEventListener("keydown",i),w()}return{open:g,close:w,destroy:T}}var Id=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Na="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Ld(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Dd(e){let t=br(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Na}
          >부분 집계</span
        >`:""}`}function Od(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return c`<div class="detail-session__usage-detail">
    ${Id.map(r=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Ld(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Na}</span>`:""}
  </div>`}var Md={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Pd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Fa(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let g=typeof d.session_id=="string"&&d.session_id.length>0,w=o.has(d.attempt_id),T=g&&!w,x=g?w?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!T}
      title=${x}
      @click=${y=>{y.stopPropagation(),T&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},l=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let g=d.cause_detail,w=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:d.cause;return c`<div class="detail-session__cause" title=${w}>
      ${d.cause}
    </div>`},i=d=>{if(!br(d.usage))return"";let _=s.has(d.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Dd(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>c`<div class="detail-session-row">
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
              ${d.resumed_from?c`<span
                    class="detail-session__resumed"
                    title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${d.resumed_from})`}
                    >↻</span
                  >`:""}
              <span class="detail-session__meta"
                >${[d.runner,d.model].filter(Boolean).join(" \xB7 ")}</span
              >
              ${d.session_id?c`<span class="detail-session__sid" title=${d.session_id}
                    >${String(d.session_id).slice(0,8)}</span
                  >`:""}
              ${br(d.usage)?c`<span class="detail-session__usage"
                    >${br(d.usage)}</span
                  >`:""}
              <span class="detail-session__time"
                >${Pd(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${l(d)}
            ${s.has(d.attempt_id)&&d.usage?Od(d.usage):""}
          </div>`)}
    </div>
  `}function qa(e,t={}){return c`
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
          ${Nd(e)}
        </div>`:""}
  `}function Nd(e){let t=yr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=xn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Fd=["open","in_progress","deferred","resolved","closed"],qd=[0,1,2,3,4];function Ba(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,l=t.execPresetStore,i=t.sessionLogStore,d=null,_=null,g={},w="",T=!1,x=!1,y=!1,C="",j="",G="";function K(){x=!1,y=!1,C="",j="",G=""}let z=[],R=null,E=null,D=!1,H="",oe=!1,ue=0,ie=new Set;function ge(){z=[],R=null,E=null,D=!1,H="",oe=!1,ue+=1,ie.clear()}async function xe(p){if(!s)return;let $=++ue;try{let k=await Promise.resolve(s("get-comments",{id:p}));if($!==ue||p!==d)return;z=Array.isArray(k)?k:[],D=!1}catch{if($!==ue||p!==d)return;D=!0}m()}function Ve(){if(!s||!d)return;let p=_&&typeof _.comment_count=="number"?_.comment_count:null;if(R!==d){R=d,E=p,xe(d);return}p!==null&&p!==E&&(E=p,xe(d))}function We(p){ie.has(p)?ie.delete(p):ie.add(p),m()}function Se(p){let $=H.trim().length===0;H=p,$!==(p.trim().length===0)&&m()}async function le(){let p=H.trim();if(!s||!d||p.length===0||oe)return;let $=d;oe=!0,m();let k=!1;try{let F=await Promise.resolve(s("add-comment",{id:$,text:p}));Array.isArray(F)&&F.length>0&&(k=!0,$===d&&(z=F,D=!1,H="",E=F.length))}catch{k=!1}k||X("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===d&&(oe=!1),m()}let I={onToggle:We,onDraftInput:Se,onSubmit:le},V=document.createElement("div");V.className="md-viewer-root",document.body.appendChild(V);let ve=Pa(V,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Z=document.createElement("div");Z.className="session-log-root",document.body.appendChild(Z);let ye=An(Z,{transport:s?(p,$)=>Promise.resolve(s(p,$)):void 0,sessionLogStore:i}),pe=!1,Ne=!1,re=!1,_e=null,P=null,M=0;function ne(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function we(){pe=!1,Ne=!1,re=!1,_e=null,P=null,M+=1}async function ke(p){if(!s)return;let $=++M;Ne=!0,re=!1,m();try{let k=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if($!==M)return;!k||typeof k!="object"||Array.isArray(k)?re=!0:(_e=k,P=ne(p))}catch{$===M&&(re=!0)}finally{$===M&&(Ne=!1,m())}}function N(){if(pe=!pe,pe&&d&&P!==ne(d)){_e=null,ke(d);return}m()}function h(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(k=>k&&k.bead_id===d).sort((k,F)=>(F.started_at||0)-(k.started_at||0)).map(k=>({attempt_id:k.attempt_id,bead_id:k.bead_id,status:k.status,started_at:typeof k.started_at=="number"?k.started_at:null,runner:k.runner||null,model:k.model||null,session_id:k.session_id||null,resumed_from:k.resumed_from||null,dismissed_at:typeof k.dismissed_at=="number"?k.dismissed_at:null,cause:typeof k.cause=="string"?k.cause:null,cause_detail:k.cause_detail||null,usage:k.usage||null}))}function S(){if(!a||!d)return null;let p=a.get();return Ot(p&&p.attempts||{},d)}let q=new Set;function W(p){q.has(p)?q.delete(p):q.add(p),m()}function J(p){let $=a?a.get():null,k=$&&$.attempts?$.attempts[p]:null;ye.open({attempt_id:p,meta:k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}})}async function se(p){if(!s||!p)return;let $=()=>{let F=a?a.get():null;return F&&typeof F.revision=="number"?F.revision:0},k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:$()});if(k&&k.conflict){let F=k.queue&&typeof k.queue.revision=="number"?k.queue.revision:$();k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:F})}k&&k.resumed===!1&&!k.conflict&&k.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}let Ie={onOpen:J,onResume:se,onToggleUsage:W};function De(){let p=a?a.get():null,$=p&&p.exec_defaults;return $&&typeof $=="object"?$:{}}function Ge(){let p=a?a.get():null;return p&&p.runner_catalog||null}function et(){let p=l?l.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function nt(p){let $=p&&p.settings&&typeof p.settings=="object"?p.settings:{},k=F=>typeof $[F]=="string"?$[F]:"";return cr({selectedOf:k,effectiveOf:k,runner_catalog:Ge()}).some(F=>F.groups.some(me=>me.options.some(lt=>lt.value===F.selected&&lt.label.endsWith("(\uBE44\uD638\uD658)"))))}function st(p){l&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&l.set({revision:p.revision,presets:p.presets})}async function Ye(){let p=et(),$=p?.presets.find(k=>k.id===w);if(!(!s||!d||!p||!$||nt($)||T)){T=!0,m();try{let k=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:$.id,expected_revision:p.revision}));if(k&&k.conflict){st(k),X("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=k&&Array.isArray(k.issue)?k.issue[0]:k?.issue;if(k&&k.applied&&F&&typeof F=="object"){_=F;for(let me of jr)delete g[me];X("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}k&&k.error==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(k){k&&typeof k=="object"&&k.code==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,m()}}}function dt(){let p=et();if(p&&p.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let $=p?p.presets:[],k=$.find(me=>me.id===w),F=k?nt(k):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${p===null||T}
          @change=${me=>{w=me.target.value,m()}}
        >
          <option value="" ?selected=${w===""}>
            ${p===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${$.map(me=>{let lt=nt(me);return c`<option
              value=${me.id}
              ?selected=${me.id===w}
            >
              ${me.name}${lt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${p===null||!k||F||T}
          @click=${()=>{Ye()}}
        >
          10개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let Xe=null;r&&r.subscribe&&(Xe=r.subscribe(()=>He()));let Fe=null;a&&typeof a.subscribe=="function"&&(Fe=a.subscribe(()=>{d&&m()}));let pt=null;l&&typeof l.subscribe=="function"&&(pt=l.subscribe(()=>{d&&m()}));function ft(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",ft);function He(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];_=p.find(k=>k&&k.id===d)||p[0]||_}Ve(),m()}}function ot(p){or(p).then($=>{$?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function at(p){p.preventDefault(),p.stopPropagation(),d&&ot(d)}function tt(p,$){p.preventDefault(),p.stopPropagation(),ot($)}function O(p,$,k){p.preventDefault(),p.stopPropagation(),ve.open($,{missing_state:k})}function B(p,$){g[p]=$,m(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:p,value:$})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function te(p,$,k){if(!s||!d)return!1;try{let F=await Promise.resolve(s(p,$)),me=Array.isArray(F)?F[0]:F;return me&&typeof me=="object"&&me.id?(_=me,!0):(X(k,"error"),!1)}catch{return X(k,"error"),!1}}function ae(p){setTimeout(()=>{try{let $=e.querySelector(p);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function de(){x=!0,C=_&&_.title||"",m(),ae('.detail-edit__input[data-edit="title"]')}function he(p){C=p.target.value}function Ee(){x=!1,C="",m()}function Oe(){te("edit-text",{id:d,field:"title",value:C},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(x=!1,C=""),m()})}function Ce(){y=!0,j=_&&_.description||"",m(),ae('.detail-edit__textarea[data-edit="description"]')}function u(p){j=p.target.value}function b(){y=!1,j="",m()}function L(){te("edit-text",{id:d,field:"description",value:j},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(y=!1,j=""),m()})}function ee(p,$,k,F){if(p.key==="Escape"){p.stopPropagation(),k();return}p.key==="Enter"&&(!F||p.ctrlKey||p.metaKey)&&(p.preventDefault(),$())}function Le(p){let $=p.target.value;te("update-status",{id:d,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function je(p){let $=Number(p.target.value);te("update-priority",{id:d,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function qe(p){G=p.target.value}function Be(){let p=G.trim();p.length!==0&&te("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(G=""),m()})}function Qe(p){if(p.key==="Escape"){p.stopPropagation(),G="",m();return}p.key==="Enter"&&(p.preventDefault(),Be())}function ct(p){te("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Ze={onCopyPath:tt,onOpenDoc:O},rt={onChange:B};function be(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function it(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function yt(p){let k=(Array.isArray(p.dependencies)?p.dependencies:[]).map(F=>({id:be(F),icon:it(F)})).filter(F=>F.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${k.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${k.map(F=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(F.id)}
                  >
                    ${F.icon?`${F.icon} `:""}${F.id}
                  </button>`:c`<span class="detail-dep"
                    >${F.icon?`${F.icon} `:""}${F.id}</span
                  >`)}
          </div>`}
    `}function fe(p){let $=p.metadata||{},k=p.workflow||{},F=k.stages||{},me=F.spec&&F.spec.stale,lt=F.impl&&F.impl.stale,Me=F.plan||null,_t=k.route_source==="derived",jt=k.route||$.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${_t?" detail-kv__v--derived":""}"
          title=${_t?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${_t?"unset":jt}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${$.spec_review||"\uC5C6\uC74C"}${me?" \xB7 stale":""}</span
        >
      </div>
      ${k.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Me?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Me?.approval_receipt||"\uC5C6\uC74C"}${Me?.approval_state==="stale"?" \xB7 stale":Me?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${$.impl_review||"\uC5C6\uC74C"}${lt?" \xB7 stale":""}</span
        >
      </div>
      ${$.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let Ae={route:["spec_backed","full_plan"]};async function kt(p,$){let k=$.target.value;if(p==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&k!=="full_plan"&&!window.confirm(`full_plan \u2192 ${k||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await te("update-workflow-meta",{id:d,key:p,value:k},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function Ht(p){let $=p.metadata||{};return c` ${((F,me)=>{let lt=Ae[F],Me=typeof $[F]=="string"?$[F]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${_t=>kt(F,_t)}
        >
          <option value="" ?selected=${!lt.includes(Me)}>
            ${me}
          </option>
          ${lt.map(_t=>c`<option value=${_t} ?selected=${Me===_t}>${_t}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function Wt(p){return x?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${C}
            @input=${he}
            @keydown=${$=>ee($,Oe,Ee,!1)}
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
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${p}</h2>
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
    `}function It(p){let $=ut(p.created_at),k=ut(p.updated_at);return!$&&!k?c``:c`
      ${$?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${k?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
    `}function Pt(p,$){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Le}
        >
          ${Fd.map(k=>c`<option value=${k} ?selected=${k===p}>${k}</option>`)}
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
          ${qd.map(k=>c`<option value=${String(k)} ?selected=${k===$}>
                P${k}
              </option>`)}
        </select>
      </div>
    `}function Q(p){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${y?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ce}
            >
              ✎
            </button>`}
      </div>
      ${y?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${j}
              @input=${u}
              @keydown=${$=>ee($,L,b,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${L}
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
          </div>`:c`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function v(p){let $=typeof p.notes=="string"?p.notes:"";return $.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function U(p){let $=Array.isArray(p.labels)?p.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(k=>c`<span class="detail-label-chip"
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
            .value=${G}
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
    `}function f(){if(!d)return c``;let p=_||{},$=String(p.id||d),k=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=p.status||"open",me=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",lt=p.description||"",Me={...p,metadata:{...p.metadata||{},...g}};return c`
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
            @click=${at}
          >
            ${$}
          </button>
          ${Wt(k)} ${Pt(F,me)}
          ${It(p)} ${Q(lt)}
          ${Ea(z,I,{expanded:ie,draft:H,sending:oe,error:D})}
          ${v(p)} ${U(p)} ${yt(p)}
          ${fe(p)} ${Ht(p)}
          ${xa(p,Ze)}
          ${dt()}
          ${Ma(Me,rt,De(),Ge())}
          ${qa({expanded:pe,loading:Ne,error:re,data:_e},{onToggle:N})}
          ${Fa(h(),Ie,{total:S(),expanded:q})}
        </div>
      </div>
    `}function m(){Te(f(),e)}return{load(p){p!==d&&(g={},w="",K(),ge(),we()),d=p,_=null,He()},clear(){d=null,_=null,g={},w="",T=!1,K(),ge(),we(),ve.close(),ye.close(),Te(c``,e)},destroy(){Xe&&(Xe(),Xe=null),Fe&&(Fe(),Fe=null),pt&&(pt(),pt=null),document.removeEventListener("keydown",ft),ve.destroy(),V.parentNode&&V.parentNode.removeChild(V),ye.destroy(),Z.parentNode&&Z.parentNode.removeChild(Z),d=null,_=null,w="",T=!1,ge(),we(),Te(c``,e)}}}var Bd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Ua(e,t){return Kn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Ud(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function za(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function l(E){let D=r.get();if(D)try{let H=await n("display-policy-set",{expected_revision:D.revision,policy:E(D)});i(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:E(H.policy)}),i(H)),H&&H.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(E){E&&E.policy&&typeof E.policy=="object"&&r.set(E.policy)}function d(E){let D=r.get();if(!D)return;let H=Ua(E,D)!=="shown";l(oe=>Ud(E,oe,H))}function _(){let E=a.trim();E.length!==0&&(a="",l(D=>D.hidden_prefixes.includes(E)?{hidden_prefixes:D.hidden_prefixes}:{hidden_prefixes:[...D.hidden_prefixes,E]}),C())}function g(E){l(D=>({hidden_prefixes:D.hidden_prefixes.filter(H=>H!==E)}))}function w(E){let D=r.get();if(!D)return;let H=D.chips[E]===!1;l(()=>({chips:{[E]:H}}))}function T(E){let D=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${D.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${D.map(H=>{let oe=Ua(H,E);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${oe}`}
                  data-label=${H}
                  data-state=${oe}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function x(E){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${E.hidden_prefixes.map(D=>c`<span class="display-settings__prefix">
                ${D}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${D} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(D)}
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
            @input=${D=>{a=String(D.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function y(E){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Bd.map(([D,H])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${D}
                  .checked=${E.chips[D]!==!1}
                  @change=${()=>w(D)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function C(){let E=r.get();Te(c`
        <div class="display-settings__container">
          <header class="display-settings__header">
            <div class="display-settings__title">표시 설정</div>
            <button
              type="button"
              class="display-settings__close"
              aria-label="닫기"
              @click=${R}
            >
              ×
            </button>
          </header>
          <div class="display-settings__body">
            ${E?c`${T(E)} ${x(E)}
                ${y(E)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let j=!1,G=()=>{j=!1};o.addEventListener("close",G),o.addEventListener("cancel",G);let K=null;r.subscribe&&(K=r.subscribe(()=>{j&&C()}));function z(){j||(a="",j=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:z,close:R,destroy(){j=!1,o.removeEventListener("close",G),o.removeEventListener("cancel",G),K&&(K(),K=null),o.remove()}}}function Ha(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),l=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,_,g="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let w=typeof g=="string"?g.trim():"";if(s&&(w.length>0?(s.textContent=w,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>l()),t.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:i,close:l,getElement(){return t}}}function Wa(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function ja(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var zd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ga=160;function Hd(e){return e.length>Ga?`${e.slice(0,Ga)}\u2026`:e}function Rn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let l=null,i=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function _(){let h=d();return typeof h.revision=="number"?h.revision:0}function g(){let h=d().exec_defaults;return h&&typeof h=="object"?h:{}}function w(){let h=n?n.get():null;return!h||typeof h.revision!="number"?null:{revision:h.revision,presets:Array.isArray(h.presets)?h.presets:[]}}function T(h){n&&h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&n.set({revision:h.revision,presets:h.presets})}function x(h){h&&h.queue&&r&&r.set(h.queue)}async function y(h,S){if(!s)return;let q={key:h,value:S||null};try{let W=await s("worker-queue-set-exec-default",{...q,expected_revision:_()});x(W),W&&W.conflict&&(W=await s("worker-queue-set-exec-default",{...q,expected_revision:_()}),x(W)),W&&W.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function C(){return d().runner_catalog??null}function j(h){let{key:S}=h;return c`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${En(S)}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${S}`}
        data-key=${S}
        ?disabled=${h.disabled}
        @change=${q=>{y(S,q.target.value)}}
      >
        ${Wr(h.groups,h.selected,Tn[S]||"(\uAE30\uBCF8)")}
      </select>
      ${h.runner?c`<span class="exec-defaults__runner" data-runner-for=${S}
            >${h.runner}</span
          >`:""}
    </div>`}function G(h){l={id:h.id,name:h.name,settings:{...h.settings||{}}},i=!1,re()}function K(){l={id:null,name:"",settings:{}},i=!1,re()}function z(h){let S=h&&h.settings&&typeof h.settings=="object"?h.settings:{},q=W=>typeof S[W]=="string"?S[W]:"";return cr({selectedOf:q,effectiveOf:q,runner_catalog:C()}).some(W=>W.groups.some(J=>J.options.some(se=>se.value===W.selected&&se.label.endsWith("(\uBE44\uD638\uD658)"))))}function R(h){let S=h&&h.settings&&typeof h.settings=="object"?h.settings:{},q=jr.filter(se=>typeof S[se]=="string").length,J=["orchestration_model","spec_review_model","plan_review_model","impl_review_model","impl_model"].filter(se=>typeof S[se]=="string").map(se=>`${ys[se]?.title||se}: ${S[se]}`);return{count:`${q}/10 \uC9C0\uC815`,choices:J.length>0?J.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function E(h){if(!s||!window.confirm(`\u201C${h.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let S=w();if(S)try{let q=await s("exec-preset-delete",{expected_revision:S.revision,id:h.id});T(q),q&&q.conflict&&X("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function D(h=!1){if(!s||!l)return;let S=w();if(!S)return;let q=h||l.id===null,W={expected_revision:S.revision,...q?{}:{id:l.id},name:l.name,settings:{...l.settings}};try{let J=await s(q?"exec-preset-create":"exec-preset-update",W);if(T(J),J&&J.conflict){i=!0,re();return}if(J&&J.applied){l=null,i=!1,re();return}X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function H(h){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${En(h.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${h.key}
        ?disabled=${h.disabled}
        @change=${S=>{if(!l)return;let q=S.target.value;q?l.settings[h.key]=q:delete l.settings[h.key],i=!1,re()}}
      >
        ${Wr(h.groups,h.selected,Tn[h.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function oe(){if(!l)return"";let h=J=>typeof l?.settings[J]=="string"?l.settings[J]:"",S=cr({selectedOf:h,effectiveOf:h,runner_catalog:C()}),q=w(),W=l.id!==null&&q!==null&&!q.presets.some(J=>J.id===l?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${l.name}
          data-preset-name
          @input=${J=>{l&&(l.name=J.target.value,i=!1)}}
        />
      </label>
      ${i?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${W?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${S.map(H)}
      <div class="exec-preset-editor__actions">
        ${W?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{D(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{D(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{l=null,i=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function ue(){let h=w();return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${K}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${h===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:h.presets.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:h.presets.map(S=>{let q=R(S);return c`<article
                class="exec-preset-card"
                data-preset-id=${S.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${S.name}</strong>
                  <span>${q.count}</span>
                  ${z(S)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${q.choices}</small>
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${S.id}
                    @click=${()=>G(S)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${S.id}
                    @click=${()=>{E(S)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${oe()}
    </section>`}function ie(){let h=d().workspace_info;return h&&typeof h=="object"?h:{}}function ge(h,S){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${h}"
      >${S}</span
    >`}function xe(h){let S=h?ja(h.cmd):"",q=h?Wa(h.timeout_ms):"",W=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${S?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${ge("config","config")}
            ${q?c`<span class="exec-defaults__vd-meta"
                  >timeout ${q}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Ve(h){let S=h?ja(h.cmd):"",q=h?Wa(h.timeout_ms):"",W=q?`timeout ${q} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",J=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${S?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${ge("config","config")}
            ${h.detached===!0?ge("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${J}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function We(h){if(!h||typeof h!="object")return"";let S=zd[String(h.outcome)];if(!S)return"";let q=h.outcome==="failed"&&h.reason?`${S.label} \xB7 ${h.reason}`:S.label,W=[ut(h.at),typeof h.bead_id=="string"?h.bead_id:"",typeof h.base_sha=="string"?h.base_sha.slice(0,7):""].filter(Ie=>Ie.length>0).join(" \xB7 "),J=typeof h.detail=="string"&&h.detail.length>0?Hd(h.detail):"",se=typeof h.log_path=="string"&&h.log_path.length>0?h.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${ge(S.modifier,q)}
        ${W?c`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
      ${J?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${J}</code>
          </div>`:""}
      ${se?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${se}</code>
          </div>`:""}
    </div>`}let Se=!1,le=!1,I=!1,V=null;async function ve(){if(s){le=!0,I=!1,re();try{let h=await Promise.resolve(s("get-worker-system-prompt",{}));!h||typeof h!="object"||Array.isArray(h)?I=!0:V=h}catch{I=!0}finally{le=!1,re()}}}function Z(){if(Se=!Se,Se&&!V){ve();return}re()}function ye(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Se?"true":"false"}
          @click=${Z}
        >
          ${Se?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Se?pe():""}
    </section>`}function pe(){let h=yr({loading:le,error:I});if(h)return h;if(!V)return"";let S=Array.isArray(V.variants)?V.variants:[];return c`<div class="exec-defaults__sp-body">
      ${V.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${V.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(q=>c`<div class="exec-defaults__sp-variant" data-variant=${q.key}>
            <div class="exec-defaults__sp-cond">${q.condition}</div>
            ${zt(q.label,q.system_prompt)}
          </div>`)}
    </div>`}function Ne(h){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${xe(h.verify_cmd)} ${Ve(h.deploy_cmd)}
      ${We(h.last_deploy)}
    </section>`}function re(){let h=g(),S=W=>typeof h[W]=="string"?h[W]:"",q=cr({selectedOf:S,effectiveOf:S,runner_catalog:C()});Te(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${N}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${ue()}
            <section class="exec-defaults__workspace">
              <h3>현재 워크스페이스 기본값</h3>
              <p class="exec-defaults__hint">
                현재 워크스페이스에만 적용됩니다. bead metadata가 우선하며,
                '(기본: …)'은 이 전역값도 미설정일 때 실제 적용되는
                하드코딩·CLI·워크플로 기본입니다.
              </p>
              ${q.map(W=>j(W))}
            </section>
            ${Ne(ie())}
            ${ye()}
          </div>
        </div>
      `,a)}let _e=!1,P=()=>{_e=!1},M=h=>{h.target===h.currentTarget&&N()};a.addEventListener("close",P),a.addEventListener("cancel",P),a.addEventListener("click",M);let ne=null;r&&r.subscribe&&(ne=r.subscribe(()=>{_e&&re()}));let we=null;n&&n.subscribe&&(we=n.subscribe(()=>{_e&&re()}));function ke(){_e||(_e=!0,re(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function N(){_e&&(_e=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ke,close:N,destroy(){_e=!1,a.removeEventListener("close",P),a.removeEventListener("cancel",P),a.removeEventListener("click",M),ne&&(ne(),ne=null),we&&(we(),we=null),a.remove()}}}function kr(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${ut(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${ut(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ws(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Tt(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,l=a?wt(e.done_at):"",i=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=c`<span class="worker-mini__title">${e.title}</span>`,w=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",T=r.map(E=>E===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${E}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${E}</span
        >`),x=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",y=n?c`<span class="worker-usage" title=${vr(e.usage)}
        >${n}</span
      >`:"",C=s?c`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",j=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",G=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",K=e.discard_action?c`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",z=e.revise_action?c`<button
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
        </button>`:"",R=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return c`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?c`<div class="worker-mini__row1">${d}${_}${g}</div>
          <div class="worker-mini__row2">
            ${y}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ut(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${T}${C}
            <span class="worker-mini__actions"
              >${j}${G}${K}</span
            >
            ${kr(e)}
          </div>`:o?c`<div class="worker-mini__head">
              ${i}${d}${_}${w}${T}${x}
            </div>
            <div class="worker-mini__body">${g}</div>
            ${R?c`<div class="worker-mini__foot">
                  ${y}${C}
                  <span class="worker-mini__actions"
                    >${j}${G}${K}${z}</span
                  >
                </div>`:""}
            ${kr(e)}`:c`<div class="worker-mini__line">
              ${i}${d}${_}${g}${w}${T}${x}${y}${C}${j}${G}${K}
            </div>
            ${kr(e)}`}
  </div>`}function Wd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
    class="worker-card${t?"":" worker-card--static"}"
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${t?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${r&&s?c`<span
            class="ctl-chip ctl-chip--route${o?" is-derived":""}"
            title=${o?"route \uBBF8\uD540 (metadata unset)":"route"}
            >${o?"unset":s}</span
          >`:""}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${r?un(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
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
  </div>`}function Mt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
      class="worker-pane__dot worker-pane__dot--${e.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${e.title}</span>
    ${t&&e.preview?c`<span class="worker-pane__preview">${e.preview}</span>`:""}
    <span class="worker-pane__count">${e.items.length}</span>`;return c`<section
    class="worker-pane worker-pane--lane-${e.lane}${e.src?" worker-pane--src":""}${e.live?" worker-pane--live":""}${e.collapsible?" worker-pane--collapsible":""}${t?" worker-pane--collapsed":""}"
    id=${e.id}
    data-lane=${e.lane}
  >
    ${e.collapsible?c`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${e.lane}
          aria-expanded=${t?"false":"true"}
        >
          ${r}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${r}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(n=>e.lane==="candidate"?Wd(n):ws(n))}
          </div>`}
  </section>`}var Ya=160;function Va(e){return e.length>Ya?`${e.slice(0,Ya)}\u2026`:e}function jd(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Va(e.command)}</code>`:""}
  </div>`}function Gd(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Yd(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ks(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ka(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${e.failure.reason||""}. 자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?c`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.resume_attempt_id?c`<button
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
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). bead는 resolved로 남아 있고 자동 재시도는
          하지 않습니다 — 정리를 사람이 마무리하세요.
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Va(r.detail)}</code>
              </div>`:""}
          ${Yd(r.log_path)} ${Gd(r.output_tail)}
        </div>`)}
  </div>`}function Vd(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ks(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=Tt(e.usage),l=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return c`<div
    class="rtile${d?" rtile--sel":""}${n?" rtile--paused":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${e.resumed_from?c`<span
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
      ${n?c`<button
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
      <button type="button" class="rtile__stop" title="폐기" aria-label="폐기">
        ■
      </button>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${o||a||l||i?c`<div class="rtile__meta">
          ${l?c`<span class="worker-mini__badge">${l}</span>`:""}
          ${i?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${i}</span
              >`:""}
          ${o?c`<span class="rtile__runner">${o}</span>`:""}
          ${a?c`<span class="worker-usage" title=${vr(e.usage)}
                >${a}</span
              >`:""}
        </div>`:""}
    ${kr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function $s(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Vd(s,t,r))}
  </div>`}function Zt(e){return c`<svg
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
  </svg>`}function xs(){return Zt(Nt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ss(){return Zt(Nt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function As(){return Zt(Nt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Za(){return Zt(Nt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Xa(){return Zt(Nt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Qa(){return Zt(Nt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ja(){return Zt(Nt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ei(){return Zt(Nt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Gr=1,Kd=6e4,Zd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Xd=new Set(["auto_merge","merged","merge","done"]),ti={running:3,paused:2,failed:1};function Qd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Jd(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let l=null;if(a.status==="running")l="running";else if(a.status==="paused"&&!n.has(a.attempt_id))l="paused";else if(a.status==="failed"||a.status==="orphaned"){let g=t.get(a.bead_id),w=typeof g=="number"&&g>0&&typeof a.finished_at=="number"&&g>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!w&&typeof a.dismissed_at!="number"&&(l="failed")}if(!l)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let g=ti[d.run_state],w=ti[l];if(g>w||g===w&&(d.started_at??0)>(i??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:l,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Ot(e,a.bead_id),can_pause:l==="running"&&_,can_resume:l!=="running"&&_&&!n.has(a.attempt_id)})}return o}function ri(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function St(e){return e&&typeof e=="object"?e:{}}function Ts(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let y of s)y&&typeof y.root_dir=="string"&&a.set(y.root_dir,y);let l=[],i=[],d=[],_=[],g=[],w=new Map;for(let y of n){if(!y||typeof y.root_dir!="string")continue;let C=y.root_dir,j=y.name||C,G=a.get(C),K=G&&typeof G.revision=="number"?G.revision:typeof y.revision=="number"?y.revision:0,z=St(y.attempts),R=St(y.bead_titles),E=St(y.pr_observations),D=St(y.admission),H=St(y.revise_parked),oe=St(y.merge_queue_state),ue=St(y.cleanup_failed),ie=Array.isArray(y.merge_queue)?y.merge_queue:[],ge=new Set(ie.filter(I=>I&&typeof I.bead_id=="string").map(I=>I.bead_id)),xe=Array.isArray(y.queue)?y.queue:[],Ve=Array.isArray(y.done)?y.done:[],We=new Map;for(let I of Ve)I&&typeof I.bead_id=="string"&&typeof I.added_at=="number"&&We.set(I.bead_id,I.added_at);let Se=I=>({id:I,title:R[I]||I,root_dir:C,workspace_name:j,expected_revision:K,draggable:!1}),le=new Set;for(let[I,V]of Jd(z,We))le.add(I),i.push({...Se(I),lane:"running",attempt_id:V.attempt_id,run_state:V.run_state,can_pause:V.can_pause,can_resume:V.can_resume,started_at:V.started_at,last_event_at:V.last_event_at,model:V.model,usage:V.usage,badges:V.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:V.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:V.run_state==="failed"});for(let I of Array.isArray(y.pr_wait)?y.pr_wait:[]){let V=I&&I.bead_id;if(typeof V!="string"||le.has(V))continue;le.add(V);let ve=St(E[V]),Z=St(ve.pr),ye=ve.gate?St(ve.gate):null,pe=ge.has(V),Ne=oe.active===V,re=I.external===!0,_e=ue[V]||null,P=!!ye&&ye.base_badge==="\uCDA9\uB3CC",M=!!_e&&!!ye&&ye.tier==="merged",ne=re&&!!ye&&ye.tier==="merged";d.push({...Se(V),lane:"pr_wait",pr_number:typeof Z.number=="number"?Z.number:null,pr_url:typeof Z.url=="string"?Z.url:void 0,external:re,usage:Ot(z,V),badges:_e?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!_e,reason:_e?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!pe,merge_enabled:ye?.enabled===!0||P||M||ne,merge_label:ne?"\uC815\uB9AC":P&&!M?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":P?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ye?.enabled===!0?`\uBA38\uC9C0 (${ye.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ye?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:pe,cancel_enabled:!Ne,discard_action:!re&&!_e&&!(ye&&ye.tier==="merged"),discard_enabled:!Ne&&!pe,discard_title:pe?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let I=0;I<xe.length;I++){let V=xe[I],ve=V&&V.bead_id;if(typeof ve!="string"||le.has(ve))continue;le.add(ve);let Z=H[ve],ye={...Se(ve),lane:"queue",reason:ri(D,ve),queue_position:I+1,queue_index:I,queue_length:xe.length,badges:Z?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Z,revise_action:!!Z,revise_enabled:!!Z,revise_title:Z?Z.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Z.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(ye);let pe=w.get(C);pe?pe.push(ye):w.set(C,[ye])}for(let I of Array.isArray(y.runnable)?y.runnable:[]){let V=I&&I.bead_id;typeof V!="string"||le.has(V)||(le.add(V),l.push({...Se(V),title:I.title||R[V]||V,lane:"runnable",draggable:!0,reason:ri(D,V),created_at:I.created_at??void 0,updated_at:I.updated_at??void 0,labels:Array.isArray(I.labels)?I.labels:[],workflow:I.route?{route:I.route,chips:{route:I.route}}:null,place_index:xe.length}))}for(let I of Ve){let V=I&&I.bead_id;if(typeof V!="string"||le.has(V)||(le.add(V),o!==void 0&&typeof I.added_at=="number"&&I.added_at<o))continue;let ve=Qd(z,V);g.push({...Se(V),lane:"done",done:!0,usage:Ot(z,V),done_at:typeof I.added_at=="number"?I.added_at:void 0,done_kind:ve&&typeof ve.done_kind=="string"?ve.done_kind:null})}}i.sort((y,C)=>(C.last_event_at??0)-(y.last_event_at??0)),g.sort((y,C)=>(C.done_at??0)-(y.done_at??0));let T=s.length>0?s:n.map(y=>({root_dir:y&&y.root_dir,name:y&&y.name,auto_advance:y&&y.auto_advance,auto_merge:y&&y.auto_merge,slots:y&&y.slots,revision:y&&y.revision,exec_defaults:y&&y.exec_defaults,runner_catalog:y&&y.runner_catalog})),x=[];for(let y of T)!y||typeof y.root_dir!="string"||x.push({root_dir:y.root_dir,name:y.name||y.root_dir,auto_advance:y.auto_advance===!0,auto_merge:y.auto_merge===!0,slots:typeof y.slots=="number"&&y.slots>=Gr?y.slots:Gr,revision:typeof y.revision=="number"?y.revision:0,exec_defaults:St(y.exec_defaults),runner_catalog:St(y.runner_catalog),items:w.get(y.root_dir)||[]});return{runnable:l,queue:_,queue_groups:x,running:i,pr_wait:d,done:g,automation:{total:x.length,both_on:x.filter(y=>y.auto_advance&&y.auto_merge).length}}}function eu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Kd;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ut(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${wt(e,t)}</span
        >`}</span
  >`}function Yr(e){return c`<div class="mon-c__title">${e.title}</div>`}function Vr(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function In(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Es(e){let t=Tt(e.usage);return t?c`<span class="mon-c__usage" title=${vr(e.usage)}
        >${t}</span
      >`:""}function Cs(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function tu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ss()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${xs()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${As()}
    </button>
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Za()}
        </button>`:""}
  </span>`}function ru(e,t){let r=typeof e.started_at=="number"?ks(t-e.started_at):"";return c`${Yr(e)}
    <div class="mon-c__meta">
      ${Cs(e)}${eu(e.last_event_at,t)}${Vr(e)}${In(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Es(e)}${tu(e)}
    </div>`}function nu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=wt(e.updated_at);return c`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Vr(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${dn(e.labels,null).map(a=>c`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${In(e)}
      ${o?c`<span title=${`\uC218\uC815 ${ut(e.updated_at)}`}
            >수정 ${o}</span
          >`:""}
      ${e.reason?c`<span
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
    </div>`}function su(e){return c`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Vr(e)}
      ${Cs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
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
    ${e.revise_action?c`<div class="mon-c__tail">
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
        </div>`:""}`}function ou(e){let t=!!(Tt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${Yr(e)}
    <div class="mon-c__meta">
      ${Vr(e)}${In(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Cs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Es(e)}
          ${e.merge_action?c`<button
                type="button"
                class="worker-mini__merge"
                data-bead-id=${e.id}
                ?disabled=${e.merge_enabled===!1}
                title=${e.merge_title||""}
              >
                ${e.merge_label||"\uBA38\uC9C0"}
              </button>`:""}
          ${e.cancel_action?c`<button
                type="button"
                class="worker-mini__merge-cancel"
                data-bead-id=${e.id}
                ?disabled=${e.cancel_enabled===!1}
                title=${e.cancel_title||""}
              >
                취소
              </button>`:""}
          ${e.discard_action?c`<button
                type="button"
                class="worker-mini__discard"
                data-bead-id=${e.id}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C)"}
              >
                폐기
              </button>`:""}
        </div>`:""}`}function au(e,t){let r=e.done_kind||"",n=r?Zd[r]||r:"",s=wt(e.done_at,t);return c`${Yr(e)}
    <div class="mon-c__meta">
      ${Vr(e)}${In(e)}
      ${n?c`<span
            class="mon-live__kind${Xd.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Es(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${ut(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ni(e,t){return e.lane==="running"?ru(e,t):e.lane==="runnable"?nu(e):e.lane==="queue"?su(e):e.lane==="pr_wait"?ou(e):au(e,t)}function si(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ss():xs()}
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
        ${Xa()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Qa()}
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
        ${Ja()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function oi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Dt.find(o=>o.value===e.done_range)?.label||"";return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?As():ei()}
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
        ${Dt.map(o=>c`<option
              value=${o.value}
              ?selected=${e.done_range===o.value}
            >
              ${o.label}
            </option>`)}
      </select>
      ${e.token_total?c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${e.token_tooltip}
            >${s} 완료 · 누적 ${e.token_total}</span
          >`:""}
    </div>
  </div>`}function ai(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ii(e){let t={};for(let a of qt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let l=a&&a.usage;if(l&&typeof l=="object"){let i=!1;for(let d of qt){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(t[d]+=_,r=!0,i=!0)}if(i){s+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?Tt(t):null}var ci="bdui.monitor.done-range";function iu(){try{let e=window.localStorage.getItem(ci);return Ft(e)?e:$t}catch{return $t}}function lu(e){try{window.localStorage.setItem(ci,e)}catch{}}var di="tab:monitor:pipeline",cu=1e3,du=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function li(e,t){let r=e.lane==="runnable"||e.lane==="queue";return c`<div
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
    ${ni(e,t)}
  </div>`}function ui(e,t){let r=Ke("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,l=t.getWorkspacePath,i=t.switchWorkspace,d=t.now||(()=>Date.now()),_=t.confirm||(N=>typeof globalThis.confirm!="function"||globalThis.confirm(N)),g=iu();function w(){let N=Dt.find(h=>h.value===g);return N?N.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let x=Ts(null,null),y=null,C=new Map,j=new Set;function G(N){return x.queue_groups.find(h=>h.root_dir===N)||null}let z=Rn(e,{queueStore:{get(){if(!y)return{revision:0,exec_defaults:{}};let N=C.get(y);if(N)return N;let h=G(y),S=s&&s.get?s.get():null,q=(Array.isArray(S)?S:[]).find(W=>W&&W.root_dir===y);return{revision:h?h.revision:0,exec_defaults:h?h.exec_defaults:{},runner_catalog:h?h.runner_catalog:null,workspace_info:q?q.workspace_info:void 0}},set(N){y&&C.set(y,N);for(let h of Array.from(j))h()},subscribe(N){return j.add(N),()=>j.delete(N)}},presetStore:a,transport:o?(N,h)=>o(N,N==="worker-queue-set-exec-default"||N==="get-worker-system-prompt"?{...h||{},root_dir:y}:h):void 0,getWorkspacePath:()=>y||void 0}),R=null,E=null;async function D(N,h,S,q){if(!o||!S)return null;let W=await o(N,{...h,root_dir:S,expected_revision:q});if(W&&W.conflict){let J=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:q;W=await o(N,{...h,root_dir:S,expected_revision:J})}return W&&W.queue&&S&&C.set(S,W.queue),W}async function H(N,h,S){return!o||!S?null:await o(N,{...h,root_dir:S})}async function oe(N){if(!o||!N&&!_("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let h=await o("monitor-auto-toggle",{on:N}),S=h&&Array.isArray(h.failed)?h.failed:[];S.length>0&&X(`\uC790\uB3D9\uD654 ${N?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${S.map(q=>q.root_dir).join(", ")}`,"error",3200)}async function ue(){let N=new Map;for(let h of x.pr_wait)N.has(h.root_dir)||N.set(h.root_dir,h.expected_revision);for(let[h,S]of N)await D("worker-merge-queue-add-all",{},h,S)}let ie=null,ge=!1,xe=null;function Ve(){xe!==null&&clearTimeout(xe),xe=setTimeout(()=>{xe=null,ge=!1},0)}function We(N){let h=N.target;return typeof h?.closest=="function"?h.closest(".mon-group"):null}function Se(N){let h=We(N);return!h||!ie?null:(h.getAttribute("data-root-dir")||"")===ie.root_dir?h:null}function le(){for(let N of Array.from(T.querySelectorAll(".mon-group--drag-over")))N.classList.remove("mon-group--drag-over")}function I(N){let h=N.target,S=typeof h?.closest=="function"?h.closest('.mon-card[draggable="true"]'):null;if(S){ie={bead_id:S.getAttribute("data-issue-id")||"",lane:S.getAttribute("data-lane")||"",root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0,queue_index:Number(S.getAttribute("data-queue-index")),queue_length:Number(S.getAttribute("data-queue-length")),place_index:Number(S.getAttribute("data-place-index"))},ge=!0;try{N.dataTransfer?.setData("text/plain",ie.bead_id),N.dataTransfer&&(N.dataTransfer.effectAllowed="move")}catch{}}}function V(N){let h=Se(N);h&&(N.preventDefault(),N.dataTransfer&&(N.dataTransfer.dropEffect="move"),h.classList.add("mon-group--drag-over"))}function ve(N){We(N)?.classList.remove("mon-group--drag-over")}function Z(){ie=null,le(),Ve()}function ye(N){let h=Se(N),S=ie;if(ie=null,le(),!h||!S||!S.bead_id)return;N.preventDefault();let q=N.target,W=typeof q?.closest=="function"?q.closest('.mon-card[data-lane="queue"]'):null,J=W&&h.contains(W)?Number(W.getAttribute("data-queue-index")):NaN;if(S.lane==="runnable"){let De=Number.isFinite(J)?J:S.place_index;if(!Number.isFinite(De))return;D("worker-queue-place",{bead_id:S.bead_id,index:De},S.root_dir,S.revision);return}if(S.lane!=="queue"||W&&W.getAttribute("data-issue-id")===S.bead_id)return;let se=S.queue_index,Ie=Number.isFinite(J)?se>J?J:J-1:S.queue_length-1;!Number.isFinite(Ie)||Ie<0||Ie===se||D("worker-queue-reorder",{bead_id:S.bead_id,to_index:Ie},S.root_dir,S.revision)}function pe(N){let h={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return c`${oi({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},done_range:g,token_total:ii(x.done),token_tooltip:ai(w())})}
      <div class="worker-lanes mon-lanes">
        ${du.map(S=>{let q=h[S.lane],W=S.lane==="queue"?x.queue_groups.length>0?c`${x.queue_groups.map(J=>c`<div
                        class="mon-group"
                        data-root-dir=${J.root_dir}
                      >
                        ${si(J)}
                        <div class="mon-group__list">
                          ${J.items.map(se=>li(se,N))}
                        </div>
                      </div>`)}`:void 0:q.length>0?c`${q.map(J=>li(J,N))}`:void 0;return Mt({id:`monitor-${S.lane}`,lane:S.pane,title:S.lane==="done"?`\uC644\uB8CC\xB7${w()}`:S.title,items:q,empty:S.empty,body:W,live:S.lane==="running"&&q.length>0,header_control:S.lane==="pr_wait"&&q.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Ne(){let N=s&&s.get?s.get():null,h=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=d();x=Ts(N,h,{done_since:pr(g,S)}),Te(pe(S),T)}function re(N,h){let S=l?l():void 0;if(!h||!S||h===S||!i){n(N);return}i(h).then(()=>{n(N)}).catch(q=>{r("workspace switch for %s failed: %o",h,q)})}function _e(N){return{root_dir:N.getAttribute("data-root-dir")||"",revision:Number(N.getAttribute("data-revision")||0)||0}}function P(N,h){let{root_dir:S,revision:q}=_e(N),W=N.getAttribute("data-issue-id")||"",J=N.getAttribute("data-attempt-id")||"",se=h.classList;if(se.contains("worker-card__place")){D("worker-queue-place",{bead_id:W,index:Number(N.getAttribute("data-place-index")||0)||0},S,q);return}if(se.contains("mon-op--up")||se.contains("mon-op--down")){let Ie=Number(N.getAttribute("data-queue-index")||0)||0,De=se.contains("mon-op--up")?Ie-1:Ie+1;if(De<0)return;D("worker-queue-reorder",{bead_id:W,to_index:De},S,q);return}if(se.contains("mon-op--remove")){D("worker-queue-remove",{bead_id:W},S,q);return}if(se.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:J},S);return}if(se.contains("mon-op--stop")){H("worker-attempt-stop",{attempt_id:J},S);return}if(se.contains("mon-op--resume")){D("worker-attempt-resume",{attempt_id:J},S,q);return}if(se.contains("mon-op--dismiss")){D("worker-attempt-dismiss",{attempt_id:J},S,q);return}if(se.contains("worker-mini__merge")){D("worker-merge-queue-add",{bead_id:W},S,q);return}if(se.contains("worker-mini__merge-cancel")){D("worker-merge-queue-remove",{bead_id:W},S,q);return}if(se.contains("worker-mini__discard")){if(!_(`${W}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;D("worker-pr-discard",{bead_id:W},S,q);return}if(se.contains("worker-mini__revise-fix")){D("worker-revise-fix",{bead_id:W},S,q);return}se.contains("worker-mini__revise-approve")&&D("worker-revise-approve",{bead_id:W},S,q)}function M(N){let h=ge;ge=!1;let S=N.target;if(!S||typeof S.closest!="function"||S.closest("dialog")||S.closest("a"))return;let q=S.closest(".mon-auto-all");if(q){N.preventDefault(),oe(q.getAttribute("data-on")==="true");return}if(S.closest(".mon-merge-all")){N.preventDefault(),ue();return}let J=S.closest(".mon-ctl--advance");if(J){N.preventDefault();let{root_dir:nt,revision:st}=_e(J);D("worker-queue-toggle",{on:J.getAttribute("data-on")==="true"},nt,st);return}let se=S.closest(".mon-ctl--merge-auto");if(se){N.preventDefault();let{root_dir:nt,revision:st}=_e(se);D("worker-merge-auto-toggle",{on:se.getAttribute("data-on")==="true"},nt,st);return}let Ie=S.closest(".mon-ctl--exec");if(Ie){N.preventDefault(),y=Ie.getAttribute("data-root-dir")||null,C.delete(y||""),z.open();return}let De=S.closest(".mon-card");if(!De)return;let Ge=S.closest("button");if(Ge){N.preventDefault(),P(De,Ge);return}let et=De.getAttribute("data-issue-id");et&&!h&&(N.preventDefault(),re(et,De.getAttribute("data-root-dir")||""))}function ne(N){let h=N.target;if(!h||typeof h.closest!="function")return;let S=h.closest(".mon-done-range");if(S){g=Ft(S.value)?S.value:$t,lu(g),Ne();return}let q=h.closest(".mon-slots__input");if(!q)return;let{root_dir:W,revision:J}=_e(q),se=Number(q.value);if(!Number.isFinite(se))return;let Ie=Math.max(Gr,Math.floor(se));D("worker-queue-set-slots",{slots:Ie},W,J)}e.addEventListener("click",M),e.addEventListener("change",ne),e.addEventListener("dragstart",I),e.addEventListener("dragover",V),e.addEventListener("dragleave",ve),e.addEventListener("drop",ye),e.addEventListener("dragend",Z),s&&typeof s.subscribe=="function"&&(R=s.subscribe(()=>{try{C.clear(),Ne();for(let N of Array.from(j))N()}catch{}}));function we(){E!==null&&(clearInterval(E),E=null)}function ke(){xe!==null&&(clearTimeout(xe),xe=null)}return{load(){r("load"),Ne(),E===null&&(E=setInterval(()=>{try{Ne()}catch{}},cu))},pause(){we()},clear(){we(),ke(),R&&(R(),R=null),e.removeEventListener("click",M),e.removeEventListener("change",ne),e.removeEventListener("dragstart",I),e.removeEventListener("dragover",V),e.removeEventListener("dragleave",ve),e.removeEventListener("drop",ye),e.removeEventListener("dragend",Z),z.destroy(),j.clear(),e.replaceChildren()}}}function pi(e,t,r){let n=Ke("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return c`
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
    `}function l(){Te(a(),e)}return l(),s=t.subscribe(()=>l()),{destroy(){s&&(s(),s=null),Te(c``,e)}}}var fi=["bug","feature","task","epic","chore"];function _i(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mi=["Critical","High","Medium","Low","Backlog"];function gi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),l=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),w=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let E of fi){let D=document.createElement("option");D.value=E,D.textContent=_i(E),o.appendChild(D)}a.replaceChildren();for(let E=0;E<=4;E+=1){let D=document.createElement("option");D.value=String(E);let H=mi[E]||"Medium";D.textContent=`${E} \u2013 ${H}`,a.appendChild(D)}}T();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function y(R){s.disabled=R,o.disabled=R,a.disabled=R,l.disabled=R,i.disabled=R,_.disabled=R,g.disabled=R,g.textContent=R?"Creating\u2026":"Create"}function C(){d.textContent=""}function j(R){d.textContent=R}function G(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let E=window.localStorage.getItem("beads-ui.new.priority");E&&/^\d$/.test(E)?a.value=E:a.value="2"}catch{o.value="",a.value="2"}}function K(){let R=o.value||"",E=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),E.length>0&&window.localStorage.setItem("beads-ui.new.priority",E)}async function z(){C();let R=String(s.value||"").trim();if(R.length===0){j("Title is required"),s.focus();return}let E=Number(a.value||"2");if(!(E>=0&&E<=4)){j("Priority must be 0..4"),a.focus();return}let D=String(o.value||""),H=String(i.value||""),oe={title:R};D.length>0&&(oe.type=D),String(E).length>0&&(oe.priority=E),H.length>0&&(oe.description=H),y(!0);try{await t("create-issue",oe)}catch{y(!1),j("Failed to create issue");return}K(),y(!1),x()}return r.addEventListener("cancel",R=>{R.preventDefault(),x()}),w.addEventListener("click",()=>x()),_.addEventListener("click",()=>x()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),z())}),n.addEventListener("submit",R=>{R.preventDefault(),z()}),{open(){n.reset(),C(),G();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var uu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function hi(e){return String(e).padStart(2,"0")}function pu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function fu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${hi(n.getHours())}:${hi(n.getMinutes())}`,l=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${uu[n.getMonth()]} ${n.getDate()} ${o}`;return`${pu(r,t)} \xB7 ${l}`}function _u(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function bi(e){let t=!1,r=null;function n(){Te(c``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let a=await o.json();if(t)return;if(!a||a.available!==!0||!Array.isArray(a.windows)){n();return}let l=typeof a.ageSeconds=="number"&&a.ageSeconds>600,i=l?`${Math.floor(a.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Te(c`<div
          class="usage-meter${l?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${a.windows.map(_=>{let g=typeof _.pct=="number"&&Number.isFinite(_.pct)?_.pct:0,w=Math.min(100,Math.max(0,g)),x=`resets ${fu(_.resetsAt,d)}${l?` \xB7 ${i}`:""}`;return c`<span
              class="usage-meter__window ${_u(g)}"
              style=${`--progress: ${w}%`}
              title=${x}
            >
              <span class="usage-meter__label">${_.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${g}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var mu="tab:worker:ready",gu="tab:worker:blocked",hu="tab:worker:in-progress",Kr=1;function Ls(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var ki="beads-ui.worker.candidate-filter",Rs={show_blocked:!1,spec:"all"};function bu(){try{let e=window.localStorage.getItem(ki);if(!e)return{...Rs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Rs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Rs}}}function vu(e){try{window.localStorage.setItem(ki,JSON.stringify(e))}catch{}}function yu(e,t){let r=l=>t.show_blocked||!l.blocked,n=l=>t.spec==="all"||(t.spec==="with"?l.has_spec:!l.has_spec),s=[],o=0,a=0;for(let l of e){let i=r(l),d=n(l);i&&d?s.push(l):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var wu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],$i="bdui.worker.candidate_sort",ku=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ln="spec";function $u(){try{let e=window.localStorage.getItem($i);return e==="board"||e==="created"||e==="spec"?e:Ln}catch{return Ln}}function xu(e){try{window.localStorage.setItem($i,e)}catch{}}var xi="bdui.worker.done-range";function Su(){try{let e=window.localStorage.getItem(xi);return Ft(e)?e:$t}catch{return $t}}function Au(e){try{window.localStorage.setItem(xi,e)}catch{}}var Tu="(max-width: 640px)",Si="beads-ui.worker.lane-collapsed",Zr={queue:!0,done:!0};function Eu(){try{let e=window.localStorage.getItem(Si);if(!e)return{...Zr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zr}:{queue:typeof t.queue=="boolean"?t.queue:Zr.queue,done:typeof t.done=="boolean"?t.done:Zr.done}}catch{return{...Zr}}}function Cu(e){try{window.localStorage.setItem(Si,JSON.stringify(e))}catch{}}function vi(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ru(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(nr):(n.sort(nn(r)),t==="board"?n:[...n.filter(Ls),...n.filter(s=>!Ls(s))])}function Iu(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Lu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Du(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Ou=["closed_unmerged","undecidable"],Mu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Pu(e,t){for(let r of Mu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Is=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Nu(e){if(typeof e!="string"||e.length===0)return null;let t=Is.length,r=Is.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Is[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function yi(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function wi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Fu(e,t,r,n,s=null,o=null,a=null,l=!1,i=null,d=!0,_=null,g=null){let w=!!i&&i.position>0,T=!!i&&i.active===!0,x=i&&i.failure||null,y=r[e]||null,C=y&&y.gate?y.gate:null,j=y&&y.pr?y.pr:null,G=[];l&&G.push("\uC138\uC158");let K=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,z=Pu(l&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",K?null:o&&o.activity||null);K&&G.push(K),z.label&&G.push(z.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&G.push(C.base_badge),g&&G.push(g),n&&G.push("\uC815\uB9AC \uC2E4\uD328"),w&&!T&&G.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),x&&G.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${yi(x)}`),_&&G.push(`\uC790\uB3D9 \uC81C\uC678: ${yi(_)}`);let R=!!C&&C.base_badge==="\uCDA9\uB3CC",E=!!C&&C.enabled===!0,D=Nu(o&&o.merge_progress?o.merge_progress.step:null),H=!!n&&!!C&&C.tier==="merged",oe=l&&!!C&&C.tier==="merged",ue=l&&R&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:l,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",badges:G,live_badge:a==="running"?K:K?null:z.live?z.label:null,usage:s,alert:!!C&&Ou.includes(C.tier)||!!n||!!x,merge_action:!w,cancel_action:w,cancel_enabled:!T,cancel_title:T?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!l&&!n&&!(C&&C.tier==="merged"),merge_step:D,discard_enabled:!D&&!a&&!w,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":w?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!D&&!a&&!ue&&(E||R||H||oe),merge_label:oe?"\uC815\uB9AC":R&&!D&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:D?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${D.label}`:oe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ue?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ds(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:l,gotoIssue:i,getWorkspacePath:d}=t,_=n?on(n,l):null,g=ln({transport:r,uiOrderStore:l}),w=null,T=[],x=bu(),y=$u(),C=Su();function j(){let u=Dt.find(b=>b.value===C);return u?u.label:"\uC624\uB298"}let G=Eu(),K=!1,z=new Set,R=new Set,E=[],D=document.createElement("div");D.className="worker-console";let H=document.createElement("div");H.className="worker-top";let oe=document.createElement("div");oe.className="worker-drawer-overlay",oe.hidden=!0;let ue=document.createElement("div");ue.className="worker-drawer-overlay__backdrop";let ie=document.createElement("div");ie.className="worker-drawer-host",oe.append(ue,ie);let ge=document.createElement("div");ge.className="worker-lanes-host",D.append(H,oe,ge),e.appendChild(D);let xe=null,Ve=An(ie,{transport:r,sessionLogStore:a,onClose:()=>{xe=null,oe.hidden=!0,Fe()}}),We=Rn(D,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Se(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:Kr,queue:[],pr_wait:[],done:[]}}function le(){let u=Se();return typeof u.revision=="number"?u.revision:0}function I(u){u&&u.queue&&s&&s.set(u.queue)}function V(){let u=Se().queue;return Array.isArray(u)?u.length:0}async function ve(u,b){if(!r)return;let L=await r("worker-queue-place",{bead_id:u,index:b,expected_revision:le()});I(L),L&&L.conflict&&await r("worker-queue-place",{bead_id:u,index:b,expected_revision:le()}).then(I)}async function Z(u,b){if(!r)return;let L=await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:le()});I(L),L&&L.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:b,expected_revision:le()}).then(I)}async function ye(u){if(!r)return;let b=await r("worker-queue-remove",{bead_id:u,expected_revision:le()});I(b),b&&b.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:le()}).then(I)}async function pe(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function Ne(u){if(!r||!u)return;let b=await r("worker-attempt-pause",{attempt_id:u});b&&b.paused===!1&&b.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function re(u){if(!r||!u)return;let b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:le()});I(b),b&&b.conflict&&(b=await r("worker-attempt-resume",{attempt_id:u,expected_revision:le()}),I(b)),b&&b.resumed===!1&&!b.conflict&&b.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function _e(u){if(!r||!u)return;let b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:le()});I(b),b&&b.conflict&&(b=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:le()}),I(b)),b&&b.dismissed===!1&&!b.conflict&&b.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${b.reason}`,"error",2400)}async function P(u,b){if(!r)return null;let L=r,ee=await L(u,{...b,expected_revision:le()});return I(ee),ee&&ee.conflict&&(ee=await L(u,{...b,expected_revision:le()}),I(ee)),ee}async function M(u){if(!r||!u)return;z.add(u),Fe();let b;try{b=await P("worker-merge-queue-add",{bead_id:u})}finally{z.delete(u),Fe()}!b||b.conflict||b.applied||X("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ne(u){if(!r)return;let b=await P("worker-merge-auto-toggle",{on:u});!b||b.conflict||X(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function we(u){if(!r||!u)return;let b=await P("worker-merge-queue-remove",{bead_id:u});b&&!b.conflict&&!b.applied&&b.reason==="merge_active"&&X("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ke(){await P("worker-merge-queue-remove",{all:!0})}async function N(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let L=await r("worker-pr-discard",{bead_id:u,expected_revision:le()});if(I(L),L&&L.conflict&&(L=await r("worker-pr-discard",{bead_id:u,expected_revision:le()}),I(L)),L&&L.discarded===!0){X("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}L&&L.discarded===!1&&!L.conflict&&X(`\uD3D0\uAE30 \uAC70\uBD80: ${L.reason||""}`,"error",2800)}async function h(u,b){if(!r||!b||R.has(b))return;R.add(b),Fe();let L;try{L=await r(u,{bead_id:b,expected_revision:le()}),I(L),L&&L.conflict&&(L=await r(u,{bead_id:b,expected_revision:le()}),I(L))}finally{R.delete(b),Fe()}if(!(!L||L.conflict)){if(L.ok){X(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}X(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function S(u){if(!r)return;let b=await r("worker-queue-toggle",{on:u,expected_revision:le()});I(b),b&&b.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:le()}).then(I)}async function q(u){await S(u),await ne(u)}async function W(u){if(!r||!Number.isFinite(u))return;let b=Math.max(Kr,Math.floor(u)),L=await r("worker-queue-set-slots",{slots:b,expected_revision:le()});I(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:b,expected_revision:le()}).then(I)}async function J(u){if(!r)return;let b=await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:le()});I(b),b&&b.conflict&&await r("worker-queue-set-pr-wait-hold",{on:u,expected_revision:le()}).then(I)}function se(){let u=Se(),b=_?_.selectBoardColumn(mu,"ready"):[],L=_?_.selectBoardColumn(gu,"blocked"):[],ee=_?_.selectBoardColumn(hu,"in_progress"):[],Le=new Map;for(let A of ee){let Y=Lu(A);if(!Y)continue;let ce=Le.get(Y);ce?ce.push(A):Le.set(Y,[A])}let je=A=>{let Y=an(Le.get(A)||[]);return Y?Y.title||Y.id:null},qe=u.bead_titles||{},Be=new Map;for(let[A,Y]of Object.entries(qe))typeof Y=="string"&&Y.length>0&&Be.set(A,Y);for(let A of[...b,...L])Be.set(A.id,A.title||A.id);let Qe=u.bead_times||{},ct=new Map;for(let[A,Y]of Object.entries(Qe))Y&&typeof Y=="object"&&ct.set(A,Y);for(let A of[...b,...L])ct.set(A.id,{created_at:A.created_at,updated_at:A.updated_at});let Ze=A=>ct.get(A)||{},rt=u.pr_wait||[],be=u.pr_observations||{},it=u.pr_activity||{},yt=u.cleanup_failed||{},fe=Object.entries(yt).map(([A,Y])=>({bead_id:A,step:Y&&Y.step?Y.step:"",reason:Y&&Y.reason?Y.reason:"",detail:Y&&typeof Y.detail=="string"?Y.detail:null,output_tail:Y&&typeof Y.output_tail=="string"&&Y.output_tail?Y.output_tail:void 0,log_path:Y&&typeof Y.log_path=="string"&&Y.log_path?Y.log_path:void 0})),Ae=u.queue||[],kt=new Set([...Ae.map(A=>A.bead_id),...rt.map(A=>A.bead_id),...u.done.map(A=>A.bead_id)]),Ht=new Set(L.map(A=>A.id)),Wt=l?l.get()?.order||{}:{},It=new Set,Pt=[];for(let A of[...b,...L])kt.has(A.id)||It.has(A.id)||Iu(A)||(It.add(A.id),Pt.push(A));T=Ru(Pt,y,Wt);let Q=u.admission||{},v=A=>{let Y=Q[A];if(!Y)return"";if(Y.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof Y.reason=="string"?Y.reason:"",Ue=ce.indexOf(":");return Ue>0&&Ue<ce.length-1?`\u26D4 ${ce.slice(0,Ue)} (${ce.slice(Ue+1)})`:`\u26D4 ${ce}`},U=T.map(A=>{let Y=Ls(A),ce=Ht.has(A.id),Ue=[];ce&&Ue.push(Du(A)),Y||Ue.push("spec \uC5C6\uC74C");let Jr=v(A.id);return Jr&&Ue.push(Jr),{id:A.id,title:A.title||A.id,reason:Ue.join(" \xB7 "),draggable:Y,lane:"candidate",created_at:A.created_at,updated_at:A.updated_at,workflow:A.workflow,status:A.status,blocked:ce,has_spec:Y}}),f=yu(U,x),m=f.visible,p=u.revise_parked||{},$=(A,Y)=>A.map(ce=>{let Ue=Y==="queue"?p[ce.bead_id]:null;return{id:ce.bead_id,title:Be.get(ce.bead_id)||ce.bead_id,reason:Y==="done"?"":v(ce.bead_id),draggable:Y!=="done",done:Y==="done",lane:Y,badges:Ue?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ue,revise_action:!!Ue,revise_enabled:!!Ue&&!R.has(ce.bead_id),revise_title:Ue?Ue.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ue.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:Y==="done"?Ot(u.attempts||{},ce.bead_id):null,done_at:Y==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,...Ze(ce.bead_id)}}),k=new Map;for(let A of u.done)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&k.set(A.bead_id,A.added_at);let F=u.attempts?Object.values(u.attempts):[],me=new Set;for(let A of F)A&&typeof A.resumed_from=="string"&&A.resumed_from.length>0&&me.add(A.resumed_from);let lt=new Map;for(let A of F)lt.set(A.bead_id,A.attempt_id);let Me=new Map;for(let A of F)Me.set(A.attempt_id,A);function _t(A){let Y=new Set,ce=A;for(;ce&&!Y.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;Y.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&Me.get(ce.resumed_from)||null}return!1}let jt=typeof u.declared_base=="string"?u.declared_base:null;function Ni(A){let Y=null;for(let ce of F)!ce||ce.bead_id!==A||_t(ce)||(Y===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof Y.started_at=="number"?Y.started_at:0))&&(Y=ce);return Y&&typeof Y.target_base=="string"?Y.target_base:null}let $r=[],Lt=null;for(let A of F){let Y=A.status==="paused"&&!me.has(A.attempt_id);if(A.status==="running"||Y)$r.push({bead_id:A.bead_id,attempt_id:A.attempt_id,title:Be.get(A.bead_id)||A.bead_id,runner:A.runner||null,model:A.model||null,effort:A.effort||null,started_at:typeof A.started_at=="number"?A.started_at:null,resumed_from:A.resumed_from||null,paused:Y,conflict_resolution:_t(A),base_exception:wi(jt,A.target_base),can_pause:typeof A.session_id=="string"&&A.session_id.length>0,usage:Ot(u.attempts||{},A.bead_id),current_child:je(A.bead_id),...Ze(A.bead_id)});else if(A.status==="failed"||A.status==="orphaned"){let ce=lt.get(A.bead_id)!==A.attempt_id,Ue=k.get(A.bead_id),Jr=typeof Ue=="number"&&Ue>0&&typeof A.finished_at=="number"&&Ue>=A.finished_at;!ce&&!Jr&&typeof A.dismissed_at!="number"&&(Lt=A)}}let Ns=null;if(Lt){let A=typeof Lt.session_id=="string"&&Lt.session_id.length>0,Y=me.has(Lt.attempt_id),ce=Lt.cause_detail;Ns={repo:Lt.repo||"",reason:Lt.cause||Lt.status,cause_detail:ce&&typeof ce.reason=="string"?{reason:ce.reason,command:typeof ce.command=="string"?ce.command:null}:null,resume_attempt_id:Lt.attempt_id,resume_eligible:A&&!Y,resume_reason:A?Y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Fi=new Set($r.map(A=>A.bead_id)),Dn=Array.isArray(u.merge_queue)?u.merge_queue:[],Fs=new Map;Dn.forEach((A,Y)=>{A&&typeof A.bead_id=="string"&&Fs.set(A.bead_id,Y+1)});let qs=u.merge_queue_state||{active:null,failures:{}},qi=qs.failures||{},Bi=u.auto_merge_skips||{},Bs=A=>{let Y=Bi[A];if(!Y)return null;let ce=be[A],Ue=ce&&ce.pr?ce.pr.head_sha:null;return Ue&&Ue===Y.head_sha?Y.reason||"":null},Xr=new Map;for(let A of $r)A.conflict_resolution&&(A.paused?Xr.has(A.bead_id)||Xr.set(A.bead_id,"paused"):Xr.set(A.bead_id,"running"));let Us=$r.filter(A=>!A.paused).length,zs=(u.workspace_info||{}).slots,Ui=typeof zs=="number"?zs:typeof u.slots=="number"?u.slots:Kr,Hs=u.pr_wait_holds_slot===!0?Kr:Ui,zi=Us>Hs,Ws=pr(C),Hi=(Array.isArray(u.done)?u.done.slice():[]).filter(A=>Ws===void 0||typeof A.added_at!="number"||A.added_at>=Ws).sort((A,Y)=>(Y.added_at||0)-(A.added_at||0)),js=$(Hi,"done"),Qr={};for(let A of qt)Qr[A]=0;let Gs=!1,Ys=0,On=0,Vs=0;for(let A of js){let Y=A.usage;if(Y&&typeof Y=="object"){let ce=!1;for(let Ue of qt)Number.isFinite(Y[Ue])&&(Qr[Ue]+=Y[Ue],Gs=!0,ce=!0);ce&&(On+=1,Number.isFinite(Y.total_cost_usd)&&(Ys+=Y.total_cost_usd,Vs+=1))}}On>0&&Vs===On&&(Qr.total_cost_usd=Ys);let Wi=Gs?Tt(Qr):null;return{queue:u,idToTitle:Be,candidates:m,candidate_hidden:{blocked:f.hidden_blocked,spec:f.hidden_spec},running:$r,live_count:Us,slots:Hs,over_cap:zi,failure:Ns,waiting:$(Ae.filter(A=>!Fi.has(A.bead_id)),"queue"),pr_wait:rt.map(A=>Fu(A.bead_id,Be.get(A.bead_id)||A.bead_id,be,yt[A.bead_id]||null,Ot(u.attempts||{},A.bead_id),it[A.bead_id]||(z.has(A.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Xr.get(A.bead_id)||null,A.external===!0,{position:Fs.get(A.bead_id)||0,active:qs.active===A.bead_id,failure:qi[A.bead_id]||null},A.wt_present!==!1,u.auto_merge===!0?Bs(A.bead_id):null,wi(jt,Ni(A.bead_id)))).map(A=>({...A,...Ze(A.id)})),merge_queue_length:Dn.length,merge_queue_running:Dn.length>0,auto_excluded:rt.map(A=>A.bead_id).filter(A=>Bs(A)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:jt,done:js,token_total:Wi,cleanup_failures:fe}}function Ie(u){let b=u.waiting.length>0?u.waiting[0].id:"\u2014",L=c`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,ee=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,Le=c`<button
      type="button"
      class="worker-auto-all${ee?" is-active":""}"
      title=${ee?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${ee?"true":"false"}
    >
      ${ee?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,je=u.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",qe=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${j()} 완료 <b>${u.done.length}</b></span
      >`,Be=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Qe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Kr}
          step="1"
          .value=${String(u.slots)}
          ?disabled=${u.queue.pr_wait_holds_slot===!0}
          title=${u.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${u.queue.pr_wait_holds_slot===!0}
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
      </button>`,ct=Ka({failure:u.failure,cleanupFailures:u.cleanup_failures});return K?c`<div class="worker-ribbon">
          ${L}
          <div class="worker-kpi worker-kpi--ribbon">${je}${qe}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Le}${Qe}</div>
          <div class="worker-kpi">${Be}</div>
        </div>
        ${ct}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${Le}${Qe}</div>
        <div class="worker-kpi">
          ${je}${qe}${Be}
          ${u.token_total?c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${j()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${j()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${b}</b></span
          >
        </div>
      </div>
      ${ct}`}function De(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let b=u.running.some(L=>!L.paused);return c`<section
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
      ${u.running.length>0?$s(u.running,Date.now(),xe):""}
      ${u.pr_wait.map(L=>ws(L))}
    </section>`}function Ge(u){let b=u.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${b.blocked>0?` ${b.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${wu.map(L=>c`<button
              type="button"
              class="worker-filter__chip${x.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${x.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${b.spec>0?c`<span class="worker-filter__hidden">숨김 ${b.spec}</span>`:""}
      </div>
    </div>`}function et(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${y}
    >
      ${ku.map(u=>c`<option value=${u.value} ?selected=${y===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function nt(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${Dt.map(u=>c`<option value=${u.value} ?selected=${C===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function st(u){let b=(u.queue.pr_wait||[]).filter(ee=>ee&&ee.external!==!0&&typeof ee.bead_id=="string"),L=new Set(u.running.filter(ee=>!ee.paused).map(ee=>ee.bead_id));for(let ee of b)L.add(ee.bead_id);if(!(u.queue.pr_wait_holds_slot!==!0||u.queue.auto_advance!==!0||u.queue.auto_merge===!0||b.length===0||u.waiting.length===0||L.size<u.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function Ye(u){let b=u.queue.auto_merge===!0;if(u.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${b?" is-active":""}"
        title=${b?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${b?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(b)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let L=new Set(u.auto_excluded),ee=u.pr_wait.filter(Le=>Le.merge_action&&Le.merge_enabled&&!L.has(Le.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${ee>0?` ${ee}`:""}
    </button>`}function dt(u){let b=Mt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:et(),controls:Ge(u)});return K?c`<div class="worker-lanes worker-lanes--mobile">
        ${De(u)}
        ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:st(u),collapsible:!0,collapsed:G.queue,preview:vi(u.waiting)})}
        ${b}
        ${Mt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:nt(),collapsible:!0,collapsed:G.done,preview:u.token_total||vi(u.done)})}
      </div>`:c`<div class="worker-lanes">
      ${b}
      ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:st(u)})}
      ${Mt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(L=>!L.paused),body:$s(u.running,Date.now(),xe)})}
      ${Mt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Ye(u)})}
      ${Mt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${j()} ${u.done.length}`,items:u.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:nt()})}
    </div>`}function Xe(u){G={...G,[u]:!G[u]},Cu(G),Fe()}function Fe(){let u=se();Te(Ie(u),H),Te(dt(u),ge)}function pt(){let u=document.querySelector(".app-header");if(!u)return;let b=()=>{let L=Math.round(u.getBoundingClientRect().height);D.style.setProperty("--worker-ribbon-top",`${L}px`)};if(b(),typeof ResizeObserver=="function"){let L=new ResizeObserver(b);L.observe(u),E.push(()=>L.disconnect())}else window.addEventListener("resize",b),E.push(()=>window.removeEventListener("resize",b))}function ft(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Tu);K=!!u.matches;let b=L=>{let ee=!!(L&&typeof L.matches=="boolean"?L.matches:u.matches);ee!==K&&(K=ee,Fe())};typeof u.addEventListener=="function"?(u.addEventListener("change",b),E.push(()=>u.removeEventListener("change",b))):typeof u.addListener=="function"&&(u.addListener(b),E.push(()=>u.removeListener(b)))}function He(u){let b=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!b)return;let L=b.dataset.beadId||"",ee=b.dataset.lane||"";w={bead_id:L,from_lane:ee};try{u.dataTransfer?.setData("text/plain",L),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ot(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;let L=b.dataset.lane||"";L!=="candidate"&&L!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),b.classList.add("worker-pane--drag-over"))}function at(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function tt(u,b){let L=T.find(qe=>qe.id===u);if(!L)return;let ee=T.filter(qe=>qe.id!==u),Le=ee.length;if(b){let qe=b.dataset.beadId;if(qe===u)return;let Be=ee.findIndex(Qe=>Qe.id===qe);Be>=0&&(Le=Be)}let je=ee.slice();je.splice(Le,0,L),g.applyReorder(u,je,Le)}function O(u){let b=u.target?.closest?.(".worker-pane");if(!b)return;u.preventDefault(),b.classList.remove("worker-pane--drag-over");let L=b.dataset.lane||"",ee=w?.bead_id||u.dataTransfer?.getData("text/plain")||"",Le=w?.from_lane||"";if(w=null,!ee)return;let je=u.target?.closest?.(".worker-mini, .worker-card"),qe=Array.from(b.querySelectorAll(".worker-mini, .worker-card")),Be=qe.length;if(je){let Qe=qe.indexOf(je);Qe>=0&&(Be=Qe)}if(b.classList.contains("worker-pane--collapsed")&&(Be=V()),L==="candidate"){if(Le==="candidate"){tt(ee,je);return}Le==="queue"&&ye(ee);return}L==="queue"&&(Le==="queue"?Z(ee,Be):ve(ee,Be))}function B(u){x=u,vu(u),Fe()}function te(u){y=u==="board"||u==="created"||u==="spec"?u:Ln,xu(y),Fe()}function ae(u){C=Ft(u)?u:$t,Au(C),Fe()}function de(u){let b=u.target?.closest?.(".worker-filter__blocked");if(b){B({...x,show_blocked:b.checked});return}let L=u.target?.closest?.(".worker-done-range");if(L){ae(L.value);return}let ee=u.target?.closest?.(".worker-sort");if(ee){te(ee.value||Ln);return}let Le=u.target?.closest?.(".worker-pr-wait-hold");if(Le){J(Le.checked);return}let je=u.target?.closest?.(".worker-slots__input");if(!je)return;let qe=Number.parseInt(je.value,10);if(!Number.isFinite(qe)){Fe();return}W(qe).then(Fe)}function he(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function Ee(u){let b=Se(),L=b.attempts?b.attempts[u]:null;xe=u,oe.hidden=!1,Ve.open({attempt_id:u,meta:he(L)}),Fe()}function Oe(){if(!xe)return;let u=Se(),b=u.attempts?u.attempts[xe]:null;if(b){Ve.updateMeta(he(b));return}Ve.close()}function Ce(u){let b=u.target;if(b?.closest?.("#worker-exec-defaults-dialog"))return;if(b?.closest?.(".worker-exec-defaults-btn")){We.open();return}let L=b?.closest?.(".worker-banner__resume");if(L){let fe=L.dataset.attemptId;fe&&re(fe);return}let ee=b?.closest?.(".worker-banner__dismiss");if(ee){let fe=ee.dataset.attemptId;fe&&_e(fe);return}if(b?.closest?.(".worker-play")){S(!Se().auto_advance);return}if(b?.closest?.(".worker-auto-all")){let fe=Se();q(!(fe.auto_advance===!0&&fe.auto_merge===!0));return}let Le=b?.closest?.(".worker-merge-all");if(Le){Le.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?ne(!1):ke():ne(!0);return}let je=b?.closest?.(".worker-pane__hd--toggle");if(je){let fe=je.dataset.lane;(fe==="queue"||fe==="done")&&Xe(fe);return}let qe=b?.closest?.(".worker-card__place");if(qe){let fe=qe.dataset.beadId;fe&&!qe.disabled&&ve(fe,V());return}let Be=b?.closest?.(".worker-filter__chip");if(Be){let fe=Be.dataset.spec;(fe==="all"||fe==="with"||fe==="without")&&B({...x,spec:fe});return}let Qe=b?.closest?.(".worker-mini__merge");if(Qe){M(Qe.dataset.beadId||"");return}let ct=b?.closest?.(".worker-mini__merge-cancel");if(ct){we(ct.dataset.beadId||"");return}let Ze=b?.closest?.(".worker-mini__discard");if(Ze){N(Ze.dataset.beadId||"");return}let rt=b?.closest?.(".worker-mini__revise-fix");if(rt){h("worker-revise-fix",rt.dataset.beadId||"");return}let be=b?.closest?.(".worker-mini__revise-approve");if(be){h("worker-revise-approve",be.dataset.beadId||"");return}if(b?.closest?.(".worker-mini__pr"))return;if(b?.closest?.(".rtile__stop")){let Ae=b?.closest?.(".rtile")?.dataset?.attemptId;Ae&&pe(Ae);return}if(b?.closest?.(".rtile__pause")){let Ae=b?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Ne(Ae);return}if(b?.closest?.(".rtile__resume")){let Ae=b?.closest?.(".rtile")?.dataset?.attemptId;Ae&&re(Ae);return}if(b?.closest?.(".rtile__session")){let Ae=b?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Ee(Ae);return}if(b?.closest?.(".worker-drawer-overlay__backdrop")){Ve.close();return}if(b?.closest?.(".worker-drawer-host"))return;let it=b?.closest?.(".rtile");if(it){if(b?.closest?.(".rtile__id")){let Ae=it.dataset.beadId;Ae&&or(Ae).then(kt=>{kt?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=it.dataset.beadId;fe&&i&&i(fe);return}let yt=b?.closest?.(".worker-mini, .worker-card");if(yt){let fe=yt.dataset.beadId;if(b?.closest?.(".worker-mini__id, .worker-card__id")){fe&&or(fe).then(Ae=>{Ae?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}fe&&i&&i(fe)}}return e.addEventListener("dragstart",He),e.addEventListener("dragover",ot),e.addEventListener("dragleave",at),e.addEventListener("drop",O),e.addEventListener("click",Ce),e.addEventListener("change",de),ft(),pt(),_&&E.push(_.subscribe(Fe)),s&&E.push(s.subscribe(()=>{Fe(),Oe()})),Fe(),{load(){Fe()},openExecDefaults(){We.open()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",He),e.removeEventListener("dragover",ot),e.removeEventListener("dragleave",at),e.removeEventListener("drop",O),e.removeEventListener("click",Ce),e.removeEventListener("change",de);try{Ve.destroy()}catch{}oe.hidden=!0;try{We.destroy()}catch{}Te(c``,e)}}}function Os(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ai(e,t,r,n=async()=>{},s=async()=>{}){let o=Ke("views:workspace-picker"),a=null,l=!1,i=!1,d=!1;async function _(E){let H=E.target.value,ue=t.getState().workspace?.current?.path||"";if(H&&H!==ue){o("switching workspace to %s",H),l=!0,R();try{await r(H)}catch(ie){o("workspace switch failed: %o",ie)}finally{l=!1,R()}}}async function g(){let E=t.getState(),D=E.workspace?.current?.path||E.workspace?.available?.[0]?.path||"";if(!(!D||i)){o("git-pulling workspace %s",D),i=!0,R();try{await n(D)}catch(H){o("workspace git pull failed: %o",H)}finally{i=!1,R()}}}function w(E){let D=E.target;D&&e.contains(D)||y()}function T(E){E.key==="Escape"&&y()}function x(){d||(d=!0,document.addEventListener("mousedown",w),document.addEventListener("keydown",T),R())}function y(){d&&(d=!1,document.removeEventListener("mousedown",w),document.removeEventListener("keydown",T),R())}function C(){d?y():x()}async function j(E){let D=E.target,H=D.value,oe=D.checked;o("toggling visibility %s \u2192 %s",H,String(oe));try{await s(H,oe)}catch(ue){o("workspace visibility toggle failed: %o",ue)}}function G(E){return E?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${g}
        ?disabled=${l||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function K(E,D){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${C}
          aria-haspopup="true"
          aria-expanded=${d?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${d?c`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${E.map(H=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!D.has(H.path)}
                        @change=${j}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Os(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function z(){let E=t.getState(),D=E.workspace?.current,H=E.workspace?.available||[],oe=new Set(E.workspace?.hidden||[]),ue=D?.path||H[0]?.path||"";if(H.length===0)return c``;let ie=H.filter(ge=>!oe.has(ge.path)||ge.path===ue);if(ie.length<=1){let ge=ie[0]||H[0],xe=Os(ge.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ge.path}"
            >${xe}</span
          >
          ${K(H,oe)}
          ${G(ue)}
          ${i?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${l||i}
          aria-label="Select project workspace"
        >
          ${ie.map(ge=>c`
              <option
                value="${ge.path}"
                ?selected=${ge.path===ue}
                title="${ge.path}"
              >
                ${Os(ge.path)}
              </option>
            `)}
        </select>
        ${K(H,oe)}
        ${G(ue)}
        ${l||i?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Te(z(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",w),document.removeEventListener("keydown",T),Te(c``,e)}}}var Ti=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Ms(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ei(e,t,r=Ms()){return{id:r,type:e,payload:t}}function Ci(e={}){let t=Ke("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,l=null,i=!0,d=new Map,_=[],g=new Map,w=new Set;function T(z){for(let R of Array.from(w))try{R(z)}catch{}}function x(){if(!i||l)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let z=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*z,E=Math.max(0,Math.round(z+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",E,a+1),l=setTimeout(()=>{l=null,K()},E)}function y(z){try{s?.send(JSON.stringify(z))}catch(R){t("ws send failed",R)}}function C(){for(o="open",t("ws open"),T(o),a=0;_.length;){let z=_.shift();z&&y(z)}}function j(z){let R;try{R=JSON.parse(String(z.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let D=d.get(R.id);d.delete(R.id),R.ok?D?.resolve(R.payload):D?.reject(R.error||new Error("ws error"));return}let E=g.get(R.type);if(E&&E.size>0)for(let D of Array.from(E))try{D(R.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",R.type)}function G(){o="closed",t("ws closed"),T(o);for(let[z,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(z);a+=1,x()}function K(){if(!i)return;let z=n();try{s=new WebSocket(z),t("ws connecting %s",z),o="connecting",T(o),s.addEventListener("open",C),s.addEventListener("message",j),s.addEventListener("error",()=>{}),s.addEventListener("close",G)}catch(R){t("ws connect failed %o",R),x()}}return K(),{send(z,R){if(!Ti.includes(z))return Promise.reject(new Error(`unknown message type: ${z}`));let E=Ms(),D=Ei(z,R,E);return t("send %s id=%s",z,E),new Promise((H,oe)=>{d.set(E,{resolve:H,reject:oe,type:z}),s&&s.readyState===s.OPEN?y(D):(t("queue %s id=%s (state=%s)",z,E,o),_.push(D))})},on(z,R){g.has(z)||g.set(z,new Set);let E=g.get(z);return E?.add(R),()=>{E?.delete(R)}},onConnection(z){return w.add(z),()=>{w.delete(z)}},reconnect(){i=!0,l&&(clearTimeout(l),l=null),a=0,K()},close(){i=!1,l&&(clearTimeout(l),l=null);try{s?.close()}catch{}},getState(){return o}}}function qu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Bu(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ps=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ri=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ii=di,Li="worker:queue",Di="ui:order",Oi="ui:display-policy",Mi="exec:presets",Xt="tab:board:closed",Pi="beads-ui.board.closed-range";function Uu(e){let t=Ke("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Te(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),l=document.getElementById("monitor-root"),i=document.getElementById("detail-panel");if(s&&bi(s),o&&a&&l&&i){let le=function(f,m){let p="Request failed",$="";if(f&&typeof f=="object"){let F=f;if(typeof F.message=="string"&&F.message.length>0&&(p=F.message),typeof F.details=="string")$=F.details;else if(F.details&&typeof F.details=="object")try{$=JSON.stringify(F.details,null,2)}catch{$=""}}else typeof f=="string"&&f.length>0&&(p=f);let k=m&&m.length>0?`Failed to load ${m}`:"Request failed";Se.open(k,p,$)},W=function(f){return`${be.getState().workspace.current?.path||""}\0${f}`},J=function(){M&&(M().catch(()=>{}),M=null),ne=null,we=null},Ie=function(f){ke=f;let m=()=>{ke!==f||be.getState().selected_id!==f||(ke=null,se(f))};if(!S){h.then(m);return}m()},nt=function(f,m,p,$,k){return p!==et[m]?(k().catch(()=>{}),!1):(f.set($,k),!0)},st=function(){let f=be.getState();Xe(f.view==="board"),ot(f.view==="worker"),te(f.view==="monitor"),tt(f.view==="worker"||!!f.selected_id)},dt=function(){let f=pr(Ye);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Xe=function(f){if(f)for(let[m,p]of Ps){if(De.has(m)||Ge.has(m))continue;let $=m===Xt?dt():{type:p};try{Z.register(m,$)}catch(me){t("register %s store failed: %o",m,me)}Ge.add(m);let k=et.board,F=!1;ve.subscribeList(m,$).then(me=>{F=!nt(De,"board",k,m,me)}).catch(me=>{t("subscribe %s failed: %o",m,me),le(me,"board")}).finally(()=>{Ge.delete(m),F&&st()})}else pt()},pt=function(){et.board+=1;for(let[f]of Ps){let m=De.get(f);m&&(m().catch(()=>{}),De.delete(f));try{Z.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},ot=function(f){if(!f){at();return}for(let[m,p]of Ri){if(ft.has(m)||Ge.has(m))continue;try{Z.register(m,{type:p})}catch(F){t("register %s store failed: %o",m,F)}Ge.add(m);let $=et.worker,k=!1;ve.subscribeList(m,{type:p}).then(F=>{k=!nt(ft,"worker",$,m,F)}).catch(F=>{t("subscribe %s failed: %o",m,F),le(F,"worker")}).finally(()=>{Ge.delete(m),k&&st()})}},at=function(){et.worker+=1;for(let[f]of Ri){let m=ft.get(f);m&&(m().catch(()=>{}),ft.delete(f));try{Z.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},tt=function(f){if(!f){O();return}He||(V("subscribe-worker-queue",{id:Li}).catch(m=>{t("subscribe-worker-queue failed: %o",m)}),He=()=>V("unsubscribe-worker-queue",{id:Li}))},O=function(){He&&(He().catch(()=>{}),He=null)},te=function(f){if(!f){ae();return}B||(V("subscribe-monitor-pipeline",{id:Ii}).catch(m=>{t("subscribe-monitor-pipeline failed: %o",m)}),B=()=>V("unsubscribe-monitor-pipeline",{id:Ii}))},ae=function(){B&&(B().catch(()=>{}),B=null)},he=function(){de||(V("subscribe-ui-order",{id:Di}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),de=()=>V("unsubscribe-ui-order",{id:Di}))},Ee=function(){de&&(de().catch(()=>{}),de=null),Ne.clear()},Ce=function(){Oe||(V("subscribe-display-policy",{id:Oi}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),Oe=()=>V("unsubscribe-display-policy",{id:Oi}))},u=function(){Oe&&(Oe().catch(()=>{}),Oe=null),re.clear()},L=function(){b||(V("subscribe-exec-presets",{id:Mi}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),b=()=>V("unsubscribe-exec-presets",{id:Mi}))},Qe=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var d=le,_=W,g=J,w=Ie,T=nt,x=st,y=dt,C=Xe,j=pt,G=ot,K=at,z=tt,R=O,E=te,D=ae,H=he,oe=Ee,ue=Ce,ie=u,ge=L,xe=Qe;let Ve=document.getElementById("header-loading"),We=Ro(Ve),Se=Ha(e),I=Ci(),V=We.wrapSend((f,m)=>I.send(f,m)),ve=$o(V),Z=xo(),ye=Ao(),pe=io(),Ne=So(),re=oo(),_e=ao(),P=lo();I.on("exec-presets-snapshot",f=>{let m=f;m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&_e.set({revision:m.revision,presets:m.presets})}),I.on("monitor-pipeline-snapshot",f=>{let m=f;if(!(!m||!Array.isArray(m.workspaces)))try{pe.set(m.workspaces,m.workspaces_state)}catch{}}),I.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Ne.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),I.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{re.set(m.policy)}catch{}}),I.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{P.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[],typeof m.last_event_at=="number"?m.last_event_at:null)}catch{}}),I.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{P.append(m.attempt_id,m.event)}catch{}}),I.on("snapshot",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="snapshot")try{$.applyPush(m)}catch{}}),I.on("upsert",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="upsert")try{$.applyPush(m)}catch{}}),I.on("delete",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="delete")try{$.applyPush(m)}catch{}});let M=null,ne=null,we=null,ke=null,N=()=>{},h=new Promise(f=>{N=()=>f(void 0)}),S=!1,q=!1;async function se(f){let m=W(f);if(m===ne||m===we)return;we=m;let p=`detail:${f}`,$={type:"issue-detail",params:{id:f}};try{Z.register(p,$)}catch(k){t("register detail store failed: %o",k)}try{let k=await ve.subscribeList(p,$);if(be.getState().selected_id!==f||W(f)!==m){await k().catch(()=>{});return}M&&await M().catch(()=>{}),M=k,ne=m}catch(k){t("detail subscribe failed: %o",k),le(k,"issue details")}finally{we===m&&(we=null)}}let De=new Map,Ge=new Set,et={board:0,worker:0},Ye=$t;try{let f=window.localStorage.getItem(Pi);Ft(f)&&(Ye=f)}catch{}async function Fe(f){if(!Ft(f)||f===Ye)return;Ye=f;try{window.localStorage.setItem(Pi,f)}catch{}let m=De.get(Xt);if(!m)return;De.delete(Xt),await m().catch(()=>{});let p=dt();try{Z.register(Xt,p)}catch($){t("register %s store failed: %o",Xt,$)}try{let $=await ve.subscribeList(Xt,p);De.set(Xt,$)}catch($){t("re-subscribe %s failed: %o",Xt,$),le($,"board")}}let ft=new Map,He=null,B=null,de=null,Oe=null,b=null;async function ee(){Oe=null,re.clear(),b=null,_e.clear(),He=null,B=null,De.clear(),ft.clear(),et.board+=1,et.worker+=1,L();let f=be.getState().workspace.current?.path;if(f)try{await I.send("set-workspace",{path:f})}catch(p){t("workspace restore after reconnect failed: %o",p);return}Ce();let m=be.getState();Xe(m.view==="board"),ot(m.view==="worker"),te(m.view==="monitor"),tt(m.view==="worker"||!!m.selected_id)}async function Le(){t("clearing all subscriptions for workspace switch"),pt(),at(),O(),ye.clear(),Ee(),he(),u(),Ce(),J();let f=be.getState();if(f.selected_id)try{Z.unregister(`detail:${f.selected_id}`)}catch{}let m=be.getState();Xe(m.view==="board"),ot(m.view==="worker"),te(m.view==="monitor"),tt(m.view==="worker"||!!m.selected_id),m.selected_id&&Ie(m.selected_id)}async function je(f){t("requesting workspace switch to %s",f),q=!0;try{let m=await I.send("set-workspace",{path:f});t("workspace switch result: %o",m),m&&m.workspace&&(be.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await Le(),X("Switched to "+Qe(f),"success",2e3)))}catch(m){throw t("workspace switch failed: %o",m),X("Failed to switch workspace","error",3e3),m}finally{q=!1}}async function qe(f){t("requesting workspace git pull for %s",f);try{let m=await I.send("git-pull-workspace",{});t("workspace git pull result: %o",m);let p=m?.status;if(p==="up_to_date"){X("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+Qe(f),"success",2e3)}catch(m){t("workspace git pull failed: %o",m);let p=m?.code,$=m?.message;if(p==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let k=$?`: ${$}`:"";throw X(`Git pull failed${k}`,"error",3e3),m}}async function Be(f,m){t("setting workspace visibility %s \u2192 %s",f,String(m));try{await I.send("set-workspace-visibility",{path:f,visible:m}),await ct()}catch(p){t("workspace visibility update failed: %o",p),X("Failed to update project visibility","error",3e3)}}async function ct(){try{let f=await I.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(F=>({path:F.path,database:F.database,pid:F.pid,version:F.version})),p=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,$=Array.isArray(f.hidden)?f.hidden.filter(F=>typeof F=="string"):[];be.setState({workspace:{current:p,available:m,hidden:$}});let k=window.localStorage.getItem("beads-ui.workspace");k&&(!m.some(me=>me.path===k)||$.includes(k)?window.localStorage.removeItem("beads-ui.workspace"):p&&k!==p.path&&(t("restoring saved workspace preference: %s",k),await je(k)))}}catch(f){t("failed to load workspaces: %o",f)}}I.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(be.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ct(),Le())});let Ze=!1;if(typeof I.onConnection=="function"){let f=m=>{t("ws state %s",m),m==="reconnecting"||m==="closed"?(Ze=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&Ze&&(Ze=!1,X("Reconnected","success",2200),Bu(be,(p,$)=>{t(`${p}: %o`,$)}),ee())};I.onConnection(f)}let rt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(rt=f)}catch(f){t("view parse error: %o",f)}let be=Co({config:qu(),view:rt});I.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let p=be.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&m.root_dir!==p){t("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{ye.set(m.queue)}catch{}});let it=To(be);it.start();let yt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),fe=async(f,m)=>{try{return await V(f,m)}catch(p){if(yt.has(f))throw p;return[]}};n&&pi(n,be,it);let Ae=document.getElementById("workspace-picker");Ae&&Ai(Ae,be,je,qe,Be);let kt=gi(e,(f,m)=>V(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>kt.open())}catch{}let Ht=za(e,{policyStore:re,transport:(f,m)=>V(f,m),labelOptions:()=>{let f=new Set;for(let[m]of Ps)for(let p of Z.snapshotFor(m)||[]){let $=p.labels;if(Array.isArray($))for(let k of $)typeof k=="string"&&k.length>0&&f.add(k)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Ht.open())}catch{}let Wt=Fo(o,{gotoIssue:f=>it.gotoIssue(f),issueStores:Z,transport:fe,uiOrderStore:Ne,displayPolicyStore:re,closedRange:Ye,onClosedRangeChange:f=>{Fe(f)},onNewIssue:()=>kt.open()}),It=Ds(a,{transport:fe,issueStores:Z,queueStore:ye,execPresetStore:_e,sessionLogStore:P,uiOrderStore:Ne,gotoIssue:f=>be.setState({selected_id:f}),getWorkspacePath:()=>be.getState().workspace.current?.path}),Pt=ui(l,{transport:fe,pipelineStore:pe,execPresetStore:_e,gotoIssue:f=>it.gotoIssue(f),getWorkspacePath:()=>be.getState().workspace.current?.path,switchWorkspace:f=>je(f)}),Q=Ba(i,{issueStores:Z,transport:fe,queueStore:ye,execPresetStore:_e,sessionLogStore:P,getWorkspacePath:()=>be.getState().workspace.current?.path,onNavigate:f=>{be.getState().view==="worker"?be.setState({selected_id:f}):it.gotoIssue(f)},onClose:()=>{let f=be.getState();be.setState({selected_id:null});try{it.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{be.setState({selected_id:null}),it.gotoView("worker"),It.openExecDefaults()}}),v=be.getState().selected_id;v&&(i.hidden=!1,Q.load(v),Ie(v)),be.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,Q.load(m),q||Ie(m)):(Q.clear(),i.hidden=!0,J())});let U=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",l.hidden=f.view!=="monitor",Xe(f.view==="board"),ot(f.view==="worker"),te(f.view==="monitor"),tt(f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&Wt.load(),f.view==="worker"&&It.load(),f.view==="monitor"?Pt.load():Pt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};be.subscribe(U),U(be.getState()),he(),Ce(),L(),ct().finally(()=>{S=!0,N()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,p=String(f.key||"").toLowerCase(),$=f.target,k=$&&$.tagName?String($.tagName).toLowerCase():"",F=k==="input"||k==="textarea"||k==="select"||$&&typeof $.isContentEditable=="boolean"&&$.isContentEditable;m&&p==="n"&&(F||(f.preventDefault(),kt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Uu(t)});export{Uu as bootstrap,qu as readBootstrapConfig,Bu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
