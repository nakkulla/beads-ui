var Wi=Object.create;var Mn=Object.defineProperty;var ji=Object.getOwnPropertyDescriptor;var Gi=Object.getOwnPropertyNames;var Yi=Object.getPrototypeOf,Vi=Object.prototype.hasOwnProperty;var Ki=(e,t,r)=>t in e?Mn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Nn=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Zi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Gi(t))!Vi.call(e,s)&&s!==r&&Mn(e,s,{get:()=>t[s],enumerable:!(n=ji(t,s))||n.enumerable});return e};var Xi=(e,t,r)=>(r=e!=null?Wi(Yi(e)):{},Zi(t||!e||!e.__esModule?Mn(r,"default",{value:e,enumerable:!0}):r,e));var Be=(e,t,r)=>Ki(e,typeof t!="symbol"?t+"":t,r);var po=Nn((Zu,uo)=>{var fr=1e3,_r=fr*60,mr=_r*60,rr=mr*24,rl=rr*7,nl=rr*365.25;uo.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return sl(e);if(r==="number"&&isFinite(e))return t.long?al(e):ol(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function sl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*nl;case"weeks":case"week":case"w":return r*rl;case"days":case"day":case"d":return r*rr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*mr;case"minutes":case"minute":case"mins":case"min":case"m":return r*_r;case"seconds":case"second":case"secs":case"sec":case"s":return r*fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ol(e){var t=Math.abs(e);return t>=rr?Math.round(e/rr)+"d":t>=mr?Math.round(e/mr)+"h":t>=_r?Math.round(e/_r)+"m":t>=fr?Math.round(e/fr)+"s":e+"ms"}function al(e){var t=Math.abs(e);return t>=rr?en(e,t,rr,"day"):t>=mr?en(e,t,mr,"hour"):t>=_r?en(e,t,_r,"minute"):t>=fr?en(e,t,fr,"second"):e+" ms"}function en(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var _o=Nn((Xu,fo)=>{function il(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=c,r.humanize=po(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let g=0;for(let y=0;y<_.length;y++)g=(g<<5)-g+_.charCodeAt(y),g|=0;return r.colors[Math.abs(g)%r.colors.length]}r.selectColor=t;function r(_){let g,y=null,T,x;function v(...C){if(!v.enabled)return;let j=v,G=Number(new Date),Q=G-(g||G);j.diff=Q,j.prev=g,j.curr=G,g=G,C[0]=r.coerce(C[0]),typeof C[0]!="string"&&C.unshift("%O");let z=0;C[0]=C[0].replace(/%([a-zA-Z%])/g,(E,I)=>{if(E==="%%")return"%";z++;let H=r.formatters[I];if(typeof H=="function"){let oe=C[z];E=H.call(j,oe),C.splice(z,1),z--}return E}),r.formatArgs.call(j,C),(j.log||r.log).apply(j,C)}return v.namespace=_,v.useColors=r.useColors(),v.color=r.selectColor(_),v.extend=n,v.destroy=r.destroy,Object.defineProperty(v,"enabled",{enumerable:!0,configurable:!1,get:()=>y!==null?y:(T!==r.namespaces&&(T=r.namespaces,x=r.enabled(_)),x),set:C=>{y=C}}),typeof r.init=="function"&&r.init(v),v}function n(_,g){let y=r(this.namespace+(typeof g>"u"?":":g)+_);return y.log=this.log,y}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let g=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let y of g)y[0]==="-"?r.skips.push(y.slice(1)):r.names.push(y)}function o(_,g){let y=0,T=0,x=-1,v=0;for(;y<_.length;)if(T<g.length&&(g[T]===_[y]||g[T]==="*"))g[T]==="*"?(x=T,v=y,T++):(y++,T++);else if(x!==-1)T=x+1,v++,y=v;else return!1;for(;T<g.length&&g[T]==="*";)T++;return T===g.length}function a(){let _=[...r.names,...r.skips.map(g=>"-"+g)].join(",");return r.enable(""),_}function c(_){for(let g of r.skips)if(o(_,g))return!1;for(let g of r.names)if(o(_,g))return!0;return!1}function i(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}fo.exports=il});var mo=Nn((bt,tn)=>{bt.formatArgs=cl;bt.save=dl;bt.load=ul;bt.useColors=ll;bt.storage=pl();bt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();bt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function ll(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function cl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+tn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}bt.log=console.debug||console.log||(()=>{});function dl(e){try{e?bt.storage.setItem("debug",e):bt.storage.removeItem("debug")}catch{}}function ul(){let e;try{e=bt.storage.getItem("debug")||bt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function pl(){try{return localStorage}catch{}}tn.exports=_o()(bt);var{formatters:fl}=tn.exports;fl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Sr=globalThis,Jr=Sr.trustedTypes,Zs=Jr?Jr.createPolicy("lit-html",{createHTML:e=>e}):void 0,ro="$lit$",Gt=`lit$${Math.random().toFixed(9).slice(2)}$`,no="?"+Gt,Qi=`<${no}>`,er=document,Ar=()=>er.createComment(""),Tr=e=>e===null||typeof e!="object"&&typeof e!="function",Hn=Array.isArray,Ji=e=>Hn(e)||typeof e?.[Symbol.iterator]=="function",Pn=`[ 	
\f\r]`,xr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xs=/-->/g,Qs=/>/g,Qt=RegExp(`>|${Pn}(?:([^\\s"'>=/]+)(${Pn}*=${Pn}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Js=/'/g,eo=/"/g,so=/^(?:script|style|textarea|title)$/i,Wn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Wn(1),Ft=Wn(2),Hu=Wn(3),tr=Symbol.for("lit-noChange"),Xe=Symbol.for("lit-nothing"),to=new WeakMap,Jt=er.createTreeWalker(er,129);function oo(e,t){if(!Hn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Zs!==void 0?Zs.createHTML(t):t}var el=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=xr;for(let c=0;c<r;c++){let i=e[c],d,_,g=-1,y=0;for(;y<i.length&&(a.lastIndex=y,_=a.exec(i),_!==null);)y=a.lastIndex,a===xr?_[1]==="!--"?a=Xs:_[1]!==void 0?a=Qs:_[2]!==void 0?(so.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=Qt):_[3]!==void 0&&(a=Qt):a===Qt?_[0]===">"?(a=s??xr,g=-1):_[1]===void 0?g=-2:(g=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?Qt:_[3]==='"'?eo:Js):a===eo||a===Js?a=Qt:a===Xs||a===Qs?a=xr:(a=Qt,s=void 0);let T=a===Qt&&e[c+1].startsWith("/>")?" ":"";o+=a===xr?i+Qi:g>=0?(n.push(d),i.slice(0,g)+ro+i.slice(g)+Gt+T):i+Gt+(g===-2?c:T)}return[oo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Er=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,_]=el(t,r);if(this.el=e.createElement(d,n),Jt.currentNode=this.el.content,r===2||r===3){let g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(s=Jt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let g of s.getAttributeNames())if(g.endsWith(ro)){let y=_[a++],T=s.getAttribute(g).split(Gt),x=/([.?@])?(.*)/.exec(y);i.push({type:1,index:o,name:x[2],strings:T,ctor:x[1]==="."?qn:x[1]==="?"?Bn:x[1]==="@"?Un:ur}),s.removeAttribute(g)}else g.startsWith(Gt)&&(i.push({type:6,index:o}),s.removeAttribute(g));if(so.test(s.tagName)){let g=s.textContent.split(Gt),y=g.length-1;if(y>0){s.textContent=Jr?Jr.emptyScript:"";for(let T=0;T<y;T++)s.append(g[T],Ar()),Jt.nextNode(),i.push({type:2,index:++o});s.append(g[y],Ar())}}}else if(s.nodeType===8)if(s.data===no)i.push({type:2,index:o});else{let g=-1;for(;(g=s.data.indexOf(Gt,g+1))!==-1;)i.push({type:7,index:o}),g+=Gt.length-1}o++}}static createElement(t,r){let n=er.createElement("template");return n.innerHTML=t,n}};function dr(e,t,r=e,n){if(t===tr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Tr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=dr(e,s._$AS(e,t.values),s,n)),t}var Fn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??er).importNode(r,!0);Jt.currentNode=s;let o=Jt.nextNode(),a=0,c=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Cr(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new zn(o,this,t)),this._$AV.push(d),i=n[++c]}a!==i?.index&&(o=Jt.nextNode(),a++)}return Jt.currentNode=er,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Cr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Xe,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=dr(this,t,r),Tr(t)?t===Xe||t==null||t===""?(this._$AH!==Xe&&this._$AR(),this._$AH=Xe):t!==this._$AH&&t!==tr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ji(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Xe&&Tr(this._$AH)?this._$AA.nextSibling.data=t:this.T(er.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Er.createElement(oo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Fn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=to.get(t.strings);return r===void 0&&to.set(t.strings,r=new Er(t)),r}k(t){Hn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Ar()),this.O(Ar()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},ur=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Xe,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Xe}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=dr(this,t,r,0),a=!Tr(t)||t!==this._$AH&&t!==tr,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=dr(this,c[n+i],r,i),d===tr&&(d=this._$AH[i]),a||(a=!Tr(d)||d!==this._$AH[i]),d===Xe?t=Xe:t!==Xe&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},qn=class extends ur{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Xe?void 0:t}},Bn=class extends ur{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Xe)}},Un=class extends ur{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=dr(this,t,r,0)??Xe)===tr)return;let n=this._$AH,s=t===Xe&&n!==Xe||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Xe&&(n===Xe||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},zn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){dr(this,t)}};var tl=Sr.litHtmlPolyfillSupport;tl?.(Er,Cr),(Sr.litHtmlVersions??(Sr.litHtmlVersions=[])).push("3.3.1");var Ee=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Cr(t.insertBefore(Ar(),o),o,void 0,r??{})}return s._$AI(e),s};var kt="today",Dt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function qt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function pr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function io(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function lo(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function co(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var go=Xi(mo(),1);function Ye(e){return(0,go.default)(`beads-ui:${e}`)}function St(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function nr(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function vo(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function yo(e,t){let r=St(e.updated_at),n=St(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function wo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=St(e.created_at),o=St(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ko(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var _l=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ho(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function bo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=_l.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function $o(e,t){let r=ho(e),n=ho(t);if(r!==n)return r<n?-1:1;let s=bo(e),o=bo(t);if(s!==o)return s<o?-1:1;let a=St(e&&e.created_at),c=St(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var jn=2**20;function gr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-St(e&&e.created_at)}function rn(e){return(t,r)=>{let n=gr(t,e),s=gr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Gn(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:gr(c,r)-jn};if(!c)return{rank:gr(a,r)+jn};let i=gr(a,r),d=gr(c,r),_=(i+d)/2;return i<_&&_<d?{rank:_}:{renormalize:n.map((g,y)=>({bead_id:g.id,rank:y*jn}))}}function Yn(e,t={}){let r=Ye(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||nr;function d(){for(let y of Array.from(a))try{y()}catch{}}function _(){s=Array.from(n.values()).sort(i)}function g(y){if(c||!y||y.id!==e)return;let T=Number(y.revision)||0;if(r("apply %s rev=%d",y.type,T),!(T<=o&&y.type!=="snapshot")){if(y.type==="snapshot"){if(T<=o)return;n.clear();let x=Array.isArray(y.issues)?y.issues:[];for(let v of x)v&&typeof v.id=="string"&&v.id.length>0&&n.set(v.id,v);_(),o=T,d();return}if(y.type==="upsert"){let x=y.issue;if(x&&typeof x.id=="string"&&x.id.length>0){let v=n.get(x.id);if(!v)n.set(x.id,x);else{let C=Number.isFinite(v.updated_at)?v.updated_at:0,j=Number.isFinite(x.updated_at)?x.updated_at:0;if(C<=j){for(let G of Object.keys(v))G in x||delete v[G];for(let[G,Q]of Object.entries(x))v[G]=Q}}_()}o=T,d()}else if(y.type==="delete"){let x=String(y.issue_id||"");x&&(n.delete(x),_()),o=T,d()}}}return{id:e,subscribe(y){return a.add(y),()=>{a.delete(y)}},applyPush:g,snapshot(){return s},size(){return n.size},getById(y){return n.get(y)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function nn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function xo(e){let t=Ye("subs"),r=new Map,n=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(i.added)?i.added:[],g=Array.isArray(i.updated)?i.updated:[],y=Array.isArray(i.removed)?i.removed:[];for(let T of Array.from(d)){let x=r.get(T);if(!x)continue;let v=x.itemsById;for(let C of _)typeof C=="string"&&C.length>0&&v.set(C,!0);for(let C of g)typeof C=="string"&&C.length>0&&v.set(C,!0);for(let C of y)typeof C=="string"&&C.length>0&&v.delete(C)}}async function o(c,i){let d=nn(i);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let g=r.get(c);if(g&&g.key!==d){let y=n.get(g.key);y&&(y.delete(c),y.size===0&&n.delete(g.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(g){let y=r.get(c)||null;if(y){let T=n.get(y.key);T&&(T.delete(c),T.size===0&&n.delete(y.key))}throw r.delete(c),g}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let g=r.get(c)||null;if(g){let y=n.get(g.key);y&&(y.delete(c),y.size===0&&n.delete(g.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:nn,selectors:{getIds(c){let i=r.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=r.get(c);return d?d.itemsById.has(i):!1},count(c){let i=r.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=r.get(c),d={};if(!i)return d;for(let _ of i.itemsById.keys())d[_]=!0;return d}}}}function So(){let e=Ye("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,_){let g=d?nn(d):"",y=r.get(i)||"",T=t.has(i);if(e("register %s key=%s (prev=%s)",i,g,y),T&&y&&g&&y!==g){let x=t.get(i);if(x)try{x.dispose()}catch{}let v=s.get(i);if(v){try{v()}catch{}s.delete(i)}let C=Yn(i,_);t.set(i,C);let j=C.subscribe(()=>o());s.set(i,j)}else if(!T){let x=Yn(i,_);t.set(i,x);let v=x.subscribe(()=>o());s.set(i,v)}return r.set(i,g),()=>c(i)}function c(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let _=s.get(i);if(_){try{_()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function Ao(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function To(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Vn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function ml(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function gl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Eo(e){let t=Ye("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):ml(n),a=gl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Vn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Vn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var hl=Object.freeze({workspace_config:{default_workspace:null}});function Co(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:hl.workspace_config.default_workspace}}}function Ro(e={}){let t=Ye("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Co(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Co(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Io(e){let t=Ye("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(g,y)=>{let T=s++,x=Date.now();n.set(T,{type:g,start_ts:x}),t("request start id=%d type=%s count=%d",T,g,r+1),a();let v=!1,C=()=>{v||(v=!0,n.delete(T),c())},j=setTimeout(()=>{v||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,g,Date.now()-x),C())},3e4);try{let G=await d(g,y),Q=Date.now()-x;return t("request done id=%d type=%s elapsed=%dms",T,g,Q),G}catch(G){let Q=Date.now()-x;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,g,Q,G),G}finally{clearTimeout(j),C()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,g])=>({id:_,type:g.type,elapsed_ms:d-g.start_ts}))}}}function X(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function sn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(ko),i;switch(c){case"created_desc":return i.sort(nr),i;case"created_asc":return i.sort(vo),i;case"updated_desc":return i.sort(yo),i;case"priority":return i.sort(wo),i;case"manual":default:{let d=r();return d?i.sort(rn(d)):i.sort(nr),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Rr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function dt(e){let t=Rr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function wt(e,t){let r=Rr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function on(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Rr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function an(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Gn(c,i,d.order),a);s(d,_);let g=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(g&&g.conflict){let y={revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}};r.set(y);let T=n(Gn(c,i,y.order),a);s(y,T);let x=await t("ui-order-set",{expected_revision:y.revision,entries:T});x&&x.applied&&r.set({revision:typeof x.revision=="number"?x.revision:0,order:x.order||{}})}else g&&g.applied&&r.set({revision:typeof g.revision=="number"?g.revision:0,order:g.order||{}})}return{applyReorder:o}}function ln(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Kn(e,t){return!t||typeof e!="string"||e.length===0||ln(t.visible_labels).includes(e)?!0:ln(t.hidden_labels).includes(e)?!1:!ln(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function cn(e,t){return ln(e).filter(r=>Kn(r,t))}function sr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var bl={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Lo={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},vl={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},yl={review:"\u2713",skip:"\u2298"},Yt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function wl(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Do(e){let t=e&&e.fill||"none";return t==="none"?Yt.none:e&&e.stale===!0?Yt.stale:t==="dim"?Yt.dim:e&&e.glyph==="review"?Yt.review:e&&e.glyph==="skip"?Yt.skip:Yt.done}function kl(e){if(!e||!e.approval_state)return Do(e);let t=[];return e.glyph==="review"?t.push(Yt.review):e.glyph==="skip"&&t.push(Yt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function $l(e,t,r){let n=bl[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=yl[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Lo[e]||e}
      </div>
    </div>
  `}function dn(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=vl[r],s=e.stages,o=wl(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(c=>`${Lo[c]||c} ${c==="plan"?kl(s[c]||{}):Do(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(c=>$l(c,s[c]||{},c===o))}
    </div>
  `}function xl(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Oo=2;function Sl(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Oo).join(", "),s=r.length-Oo,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function Al(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&sr(r,"route")){let o=n.route_source==="derived";s.push(l`<span
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
      </button>`),sr(r,"blocked")&&s.push(...Sl(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function Tl(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function El(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function Cl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort($o):r.children;return l`
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
        ${El(e)}
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
                  <span class=${Tl(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function un(e,t){let r=xl(e.priority);return l`
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
      ${Al(e,t)}
      ${e.workflow&&sr(t.policy||null,"stepper")?dn(e.workflow,e.status):""}
      ${Cl(e,t)}
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
              ${Dt.map(o=>l`<option
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
  `}function Mo(e,t,r){return l`
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
  `}var Rl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],Il=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],Ll=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function Dl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function No(e,t,r){return l`
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
        ${Rl.map(n=>l`<option
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
        ${Il.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${Dl(e,t,r)}
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
        ${Ll.map(n=>l`<option
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
  `}var Ol=200,Ml={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},Nl=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Po="beads-ui.board.sort",Fo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function Pl(){try{let e=window.localStorage.getItem(Po);if(e&&Fo.has(e))return e}catch{}return"created_desc"}function qo(e,t){let r=Ye("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,_=t.closedRange||kt,g=s?sn(s,a):null,y=an({transport:o,uiOrderStore:a}),T=[],x=[],v=[],C=[],j=[],G=[],Q=!1,z=0,R=Pl(),E=new Map,I=new Map,H=new Map,oe=new Set,pe={search:"",priority:"",type:"",labels:[]},le=!1,he=null;function Se(D){return String(D.status||"open")==="open"}function je(D){let B=String(D.status||"open");return B==="open"||B==="blocked"}function ze(D){let B=pe.search.trim().toLowerCase(),te=pe.priority,ie=pe.type,ue=pe.labels;return D.filter(be=>{if(B){let Ce=String(be.id||"").toLowerCase(),u=String(be.title||"").toLowerCase();if(!Ce.includes(B)&&!u.includes(B))return!1}if(te!==""&&String(be.priority)!==te||ie!==""&&String(be.issue_type||"")!==ie)return!1;if(ue.length>0){let Ce=Array.isArray(be.labels)?be.labels:[];if(!ue.some(u=>Ce.includes(u)))return!1}return!0})}function Te(){let D=new Set;for(let B of[T,x,v,C,j,G])for(let te of B){let ie=Array.isArray(te.labels)?te.labels:[];for(let ue of ie)typeof ue=="string"&&ue.length>0&&D.add(ue)}return Array.from(D).sort()}function de(){return pe.search.trim()!==""||pe.priority!==""||pe.type!==""||pe.labels.length>0}function L(){try{if(g){let D=g.selectBoardColumn("tab:board:in-progress","in_progress",R),B=g.selectBoardColumn("tab:board:blocked","blocked",R).filter(je),te=new Set(D.map(Y=>Y.id)),ie=g.selectBoardColumn("tab:board:ready","ready",R).filter(Y=>Se(Y)&&!te.has(Y.id)),ue=g.selectBoardColumn("tab:board:resolved","resolved",R),be=g.selectBoardColumn("tab:board:deferred","deferred",R),Ce=g.selectBoardColumn("tab:board:closed","closed").slice(0,Ol),u=[...B,...ie,...D,...ue,...Ce];K(u);let w=new Set;for(let Y of u)Y&&Y.id&&!Zn(Y)&&w.add(Y.id);let N=!de();T=N?Ir(B,w):B,x=N?Ir(ie,w):ie,v=N?Ir(D,w):D,C=N?Ir(ue,w):ue,j=be,z=be.length,G=N?Ir(Ce,w):Ce,E=new Map;for(let Y of T)E.set(Y.id,"open");for(let Y of x)E.set(Y.id,"open");for(let Y of v)E.set(Y.id,"in_progress");for(let Y of C)E.set(Y.id,"resolved");for(let Y of j)E.set(Y.id,"deferred");for(let Y of G)E.set(Y.id,"closed");I=new Map;for(let Y of T)I.set(Y.id,"blocked-col");for(let Y of x)I.set(Y.id,"ready-col");for(let Y of v)I.set(Y.id,"in-progress-col");for(let Y of C)I.set(Y.id,"resolved-col");for(let Y of G)I.set(Y.id,"closed-col")}Ge()}catch{T=[],x=[],v=[],C=[],j=[],G=[],H=new Map,Ge()}}function K(D){let B=new Map;for(let ie of D)ie&&ie.id&&!B.has(ie.id)&&B.set(ie.id,ie);let te=new Map;for(let ie of B.values()){let ue=Zn(ie);if(!ue)continue;let be=te.get(ue);be||(be=[],te.set(ue,be)),be.push({id:ie.id,title:ie.title,status:ie.status,metadata:ie.metadata,created_at:ie.created_at,updated_at:ie.updated_at})}H=te}function ye(D){let B=H.get(D)||[],te=0;for(let ue of B)(ue.status==="resolved"||ue.status==="closed")&&(te+=1);let ie=on(B);return{total:B.length,count:te,current:ie,children:B}}function Z(D){return!oe.has(D)}function we(D,B){D.preventDefault(),D.stopPropagation(),oe.has(B)?oe.delete(B):oe.add(B),Ge()}function _e(D,B){D.preventDefault(),D.stopPropagation(),n(B)}function Pe(D,B){D.preventDefault(),D.stopPropagation(),n(B)}function re(D,B){he||n(B)}function me(D,B){D.preventDefault(),D.stopPropagation(),Fl(B).then(te=>{te&&X("\uBCF5\uC0AC\uB428","success",1200)})}function M(D,B){he=B,D.dataTransfer&&(D.dataTransfer.setData("text/plain",B),D.dataTransfer.effectAllowed="move"),D.target.classList.add("board-card--dragging")}function O(D){D.target.classList.remove("board-card--dragging"),ct(),setTimeout(()=>{he=null},0)}function ne(D){let B=String(D.target.value||"");!B||B===_||(_=B,i&&i(B),Ge())}function ke(){return c?c.get():null}let $e={onCardClick:re,onCopyId:me,onDragStart:M,onDragEnd:O,onClosedRangeChange:ne,rollupFor:ye,isExpanded:Z,onRollupToggle:we,onChildClick:_e,onFromChipClick:Pe,get policy(){return ke()}};function P(D,B){he||(He(),n(B))}function h(D,B){D.preventDefault(),D.stopPropagation(),He(),n(B)}let S={...$e,onCardClick:P,onChildClick:h,onFromChipClick:h,get policy(){return ke()}};function q(D){let B=D.target,te=e.querySelector(".board-filter__labels");B&&te&&te.contains(B)||se()}function W(D){D.key==="Escape"&&se()}function ee(){le||(le=!0,document.addEventListener("mousedown",q),document.addEventListener("keydown",W),Ge())}function se(){le&&(le=!1,document.removeEventListener("mousedown",q),document.removeEventListener("keydown",W),Ge())}function De(D){D.key==="Escape"&&He()}function Oe(){Q||(Q=!0,document.addEventListener("keydown",De),Ge())}function He(){Q&&(Q=!1,document.removeEventListener("keydown",De),Ge())}let Ke={onClose:He,onOverlayClick(D){D.target===D.currentTarget&&He()}},et={onSearchInput(D){pe.search=String(D.target.value||""),L()},onPriorityChange(D){pe.priority=String(D.target.value||""),L()},onTypeChange(D){pe.type=String(D.target.value||""),L()},onSortChange(D){let B=String(D.target.value||"");if(!(!Fo.has(B)||B===R)){R=B;try{window.localStorage.setItem(Po,B)}catch{}L()}},onDeferredToggle(){Q?He():Oe()},onLabelMenuToggle(){le?se():ee()},onLabelToggle(D){let B=pe.labels.indexOf(D);B===-1?pe.labels.push(D):pe.labels.splice(B,1),L()},onLabelClear(){pe.labels.length!==0&&(pe.labels=[],L())},onNewIssue(){d&&d()}};function st(){return l`
      <div class="board-view">
        ${No(pe,et,{sort_mode:R,deferred_popup_open:Q,deferred_count:z,label_options:Te(),label_menu_open:le})}
        <div class="board-root">
          ${hr({title:"Blocked",id:"blocked-col",items:ze(T)},$e)}
          ${hr({title:"Ready",id:"ready-col",items:ze(x)},$e)}
          ${hr({title:"In progress",id:"in-progress-col",items:ze(v)},$e)}
          ${hr({title:"Resolved",id:"resolved-col",items:ze(C)},$e)}
          ${hr({title:"Closed",id:"closed-col",items:ze(G),is_closed:!0,closed_range:_},$e)}
        </div>
        ${Q?Mo({items:ze(j),count:z},S,Ke):""}
      </div>
    `}function Ge(){Ee(st(),e),Re()}function Re(){try{let D=e.querySelector("#deferred-popup");D&&!D.open&&(typeof D.showModal=="function"?D.showModal():D.setAttribute("open",""));let B=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let te of B)Array.from(te.querySelectorAll(".board-card")).forEach((ue,be)=>{ue.tabIndex=be===0?0:-1})}catch{}}async function Ze(D,B){if(!o){X("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:D,status:B}),X("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(te){r("update-status failed: %o",te),X("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function vt(D){switch(D){case"blocked-col":return T;case"ready-col":return x;case"in-progress-col":return v;case"resolved-col":return C;default:return[]}}function lt(D,B,te){if(!o||!a)return;let ie=vt(D),ue=ie.find(N=>N.id===B);if(!ue)return;let be=ie.filter(N=>N.id!==B),Ce=te.closest?te.closest(".board-card"):null,u=be.length;if(Ce){let N=Ce.getAttribute("data-issue-id");if(N===B)return;let Y=be.findIndex(ae=>ae.id===N);Y>=0&&(u=Y)}let w=be.slice();w.splice(u,0,ue),y.applyReorder(B,w,u)}function ct(){for(let D of Array.from(e.querySelectorAll(".board-column--drag-over")))D.classList.remove("board-column--drag-over")}let Ue=null;e.addEventListener("dragover",D=>{D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move");let te=D.target.closest(".board-column");te&&te!==Ue&&(Ue&&Ue.classList.remove("board-column--drag-over"),te.classList.add("board-column--drag-over"),Ue=te)}),e.addEventListener("dragleave",D=>{let B=D.relatedTarget;(!B||!e.contains(B))&&Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null)}),e.addEventListener("drop",D=>{D.preventDefault(),Ue&&(Ue.classList.remove("board-column--drag-over"),Ue=null);let B=D.target,te=B.closest(".board-column");if(!te)return;let ie=D.dataTransfer?.getData("text/plain")||"";if(!ie)return;let ue=te.id,be=I.get(ie);if(be&&be===ue){if(Nl.has(ue)){if(R!=="manual"){X("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}lt(ue,ie,B)}return}let Ce=Ml[ue];if(!Ce){X("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}E.get(ie)!==Ce&&Ze(ie,Ce)}),e.addEventListener("keydown",D=>{let B=D.target;if(!(B instanceof HTMLElement))return;let te=String(B.tagName||"").toLowerCase();if(te==="input"||te==="textarea"||te==="select"||te==="button"||te==="a"||B.isContentEditable===!0)return;let ie=B.closest(".board-card");if(!ie)return;let ue=String(D.key||"");if(ue==="Enter"||ue===" "){D.preventDefault();let w=ie.getAttribute("data-issue-id");w&&n(w);return}if(ue!=="ArrowUp"&&ue!=="ArrowDown"&&ue!=="ArrowLeft"&&ue!=="ArrowRight")return;D.preventDefault();let be=ie.closest(".board-column");if(!be)return;let Ce=Array.from(be.querySelectorAll(".board-card")),u=Ce.indexOf(ie);if(ue==="ArrowDown"&&u<Ce.length-1){ot(ie,Ce[u+1]);return}if(ue==="ArrowUp"&&u>0){ot(ie,Ce[u-1]);return}if(ue==="ArrowLeft"||ue==="ArrowRight"){let w=Array.from(e.querySelectorAll(".board-column")),N=w.indexOf(be),Y=ue==="ArrowRight"?1:-1,ae=N+Y;for(;ae>=0&&ae<w.length;){let Ie=w[ae].querySelector(".board-card");if(Ie){ot(ie,Ie);return}ae+=Y}}});function ot(D,B){try{D.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let tt=null;g&&g.subscribe&&(tt=g.subscribe(()=>{try{L()}catch{}}));let Qe=null;return c&&c.subscribe&&(Qe=c.subscribe(()=>{try{L()}catch{}})),{async load(){r("load"),L()},clear(){se(),He(),tt&&(tt(),tt=null),Qe&&(Qe(),Qe=null),e.replaceChildren(),T=[],x=[],v=[],C=[],j=[],G=[],E=new Map,I=new Map}}}function Zn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ir(e,t){return e.filter(r=>{let n=Zn(r);return!(n&&t.has(n))})}async function Fl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function or(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ql="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ar(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Bt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Bo(e){let t=0;for(let r of Bt)t+=ar(e?.[r]);return t}function Uo(e){return!e||typeof e!="object"?!1:Bt.some(t=>Number.isFinite(e[t]))}function Bl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function br(e){return Uo(e)?`\u03C4 ${Bl(Bo(e))}`:null}function At(e){let t=br(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function vr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${ar(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${ar(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${ar(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${ar(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Bo(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ql),r.join(`
`)}function Ot(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Uo(i)){n+=1;for(let d of Bt)r[d]=ar(r[d])+ar(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:Zo,setPrototypeOf:zo,isFrozen:Ul,getPrototypeOf:zl,getOwnPropertyDescriptor:Hl}=Object,{freeze:_t,seal:$t,create:ns}=Object,{apply:ss,construct:os}=typeof Reflect<"u"&&Reflect;_t||(_t=function(t){return t});$t||($t=function(t){return t});ss||(ss=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});os||(os=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var pn=mt(Array.prototype.forEach),Wl=mt(Array.prototype.lastIndexOf),Ho=mt(Array.prototype.pop),Lr=mt(Array.prototype.push),jl=mt(Array.prototype.splice),_n=mt(String.prototype.toLowerCase),Xn=mt(String.prototype.toString),Qn=mt(String.prototype.match),Dr=mt(String.prototype.replace),Gl=mt(String.prototype.indexOf),Yl=mt(String.prototype.trim),Tt=mt(Object.prototype.hasOwnProperty),ft=mt(RegExp.prototype.test),Or=Vl(TypeError);function mt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ss(e,t,n)}}function Vl(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return os(e,r)}}function xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:_n;zo&&zo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ul(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Kl(e){for(let t=0;t<e.length;t++)Tt(e,t)||(e[t]=null);return e}function Ut(e){let t=ns(null);for(let[r,n]of Zo(e))Tt(e,r)&&(Array.isArray(n)?t[r]=Kl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Ut(n):t[r]=n);return t}function Mr(e,t){for(;e!==null;){let n=Hl(e,t);if(n){if(n.get)return mt(n.get);if(typeof n.value=="function")return mt(n.value)}e=zl(e)}function r(){return null}return r}var Wo=_t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Jn=_t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),es=_t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Zl=_t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ts=_t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Xl=_t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),jo=_t(["#text"]),Go=_t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),rs=_t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Yo=_t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),fn=_t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ql=$t(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Jl=$t(/<%[\w\W]*|[\w\W]*%>/gm),ec=$t(/\$\{[\w\W]*/gm),tc=$t(/^data-[\-\w.\u00B7-\uFFFF]+$/),rc=$t(/^aria-[\-\w]+$/),Xo=$t(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),nc=$t(/^(?:\w+script|data):/i),sc=$t(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Qo=$t(/^html$/i),oc=$t(/^[a-z][.\w]*(-[.\w]+)+$/i),Vo=Object.freeze({__proto__:null,ARIA_ATTR:rc,ATTR_WHITESPACE:sc,CUSTOM_ELEMENT:oc,DATA_ATTR:tc,DOCTYPE_NAME:Qo,ERB_EXPR:Jl,IS_ALLOWED_URI:Xo,IS_SCRIPT_OR_DATA:nc,MUSTACHE_EXPR:Ql,TMPLIT_EXPR:ec}),Nr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},ac=function(){return typeof window>"u"?null:window},ic=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Ko=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Jo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ac(),t=J=>Jo(J);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Nr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:g,DOMParser:y,trustedTypes:T}=e,x=i.prototype,v=Mr(x,"cloneNode"),C=Mr(x,"remove"),j=Mr(x,"nextSibling"),G=Mr(x,"childNodes"),Q=Mr(x,"parentNode");if(typeof a=="function"){let J=r.createElement("template");J.content&&J.content.ownerDocument&&(r=J.content.ownerDocument)}let z,R="",{implementation:E,createNodeIterator:I,createDocumentFragment:H,getElementsByTagName:oe}=r,{importNode:pe}=n,le=Ko();t.isSupported=typeof Zo=="function"&&typeof Q=="function"&&E&&E.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:he,ERB_EXPR:Se,TMPLIT_EXPR:je,DATA_ATTR:ze,ARIA_ATTR:Te,IS_SCRIPT_OR_DATA:de,ATTR_WHITESPACE:L,CUSTOM_ELEMENT:K}=Vo,{IS_ALLOWED_URI:ye}=Vo,Z=null,we=xe({},[...Wo,...Jn,...es,...ts,...jo]),_e=null,Pe=xe({},[...Go,...rs,...Yo,...fn]),re=Object.seal(ns(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),me=null,M=null,O=Object.seal(ns(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ne=!0,ke=!0,$e=!1,P=!0,h=!1,S=!0,q=!1,W=!1,ee=!1,se=!1,De=!1,Oe=!1,He=!0,Ke=!1,et="user-content-",st=!0,Ge=!1,Re={},Ze=null,vt=xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),lt=null,ct=xe({},["audio","video","img","source","image","track"]),Ue=null,ot=xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),tt="http://www.w3.org/1998/Math/MathML",Qe="http://www.w3.org/2000/svg",D="http://www.w3.org/1999/xhtml",B=D,te=!1,ie=null,ue=xe({},[tt,Qe,D],Xn),be=xe({},["mi","mo","mn","ms","mtext"]),Ce=xe({},["annotation-xml"]),u=xe({},["title","style","font","a","script"]),w=null,N=["application/xhtml+xml","text/html"],Y="text/html",ae=null,Ie=null,We=r.createElement("form"),Fe=function(b){return b instanceof RegExp||b instanceof Function},Je=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ie&&Ie===b)){if((!b||typeof b!="object")&&(b={}),b=Ut(b),w=N.indexOf(b.PARSER_MEDIA_TYPE)===-1?Y:b.PARSER_MEDIA_TYPE,ae=w==="application/xhtml+xml"?Xn:_n,Z=Tt(b,"ALLOWED_TAGS")?xe({},b.ALLOWED_TAGS,ae):we,_e=Tt(b,"ALLOWED_ATTR")?xe({},b.ALLOWED_ATTR,ae):Pe,ie=Tt(b,"ALLOWED_NAMESPACES")?xe({},b.ALLOWED_NAMESPACES,Xn):ue,Ue=Tt(b,"ADD_URI_SAFE_ATTR")?xe(Ut(ot),b.ADD_URI_SAFE_ATTR,ae):ot,lt=Tt(b,"ADD_DATA_URI_TAGS")?xe(Ut(ct),b.ADD_DATA_URI_TAGS,ae):ct,Ze=Tt(b,"FORBID_CONTENTS")?xe({},b.FORBID_CONTENTS,ae):vt,me=Tt(b,"FORBID_TAGS")?xe({},b.FORBID_TAGS,ae):Ut({}),M=Tt(b,"FORBID_ATTR")?xe({},b.FORBID_ATTR,ae):Ut({}),Re=Tt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ne=b.ALLOW_ARIA_ATTR!==!1,ke=b.ALLOW_DATA_ATTR!==!1,$e=b.ALLOW_UNKNOWN_PROTOCOLS||!1,P=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,h=b.SAFE_FOR_TEMPLATES||!1,S=b.SAFE_FOR_XML!==!1,q=b.WHOLE_DOCUMENT||!1,se=b.RETURN_DOM||!1,De=b.RETURN_DOM_FRAGMENT||!1,Oe=b.RETURN_TRUSTED_TYPE||!1,ee=b.FORCE_BODY||!1,He=b.SANITIZE_DOM!==!1,Ke=b.SANITIZE_NAMED_PROPS||!1,st=b.KEEP_CONTENT!==!1,Ge=b.IN_PLACE||!1,ye=b.ALLOWED_URI_REGEXP||Xo,B=b.NAMESPACE||D,be=b.MATHML_TEXT_INTEGRATION_POINTS||be,Ce=b.HTML_INTEGRATION_POINTS||Ce,re=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&Fe(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(re.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&Fe(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(re.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(re.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),h&&(ke=!1),De&&(se=!0),Re&&(Z=xe({},jo),_e=[],Re.html===!0&&(xe(Z,Wo),xe(_e,Go)),Re.svg===!0&&(xe(Z,Jn),xe(_e,rs),xe(_e,fn)),Re.svgFilters===!0&&(xe(Z,es),xe(_e,rs),xe(_e,fn)),Re.mathMl===!0&&(xe(Z,ts),xe(_e,Yo),xe(_e,fn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?O.tagCheck=b.ADD_TAGS:(Z===we&&(Z=Ut(Z)),xe(Z,b.ADD_TAGS,ae))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?O.attributeCheck=b.ADD_ATTR:(_e===Pe&&(_e=Ut(_e)),xe(_e,b.ADD_ATTR,ae))),b.ADD_URI_SAFE_ATTR&&xe(Ue,b.ADD_URI_SAFE_ATTR,ae),b.FORBID_CONTENTS&&(Ze===vt&&(Ze=Ut(Ze)),xe(Ze,b.FORBID_CONTENTS,ae)),st&&(Z["#text"]=!0),q&&xe(Z,["html","head","body"]),Z.table&&(xe(Z,["tbody"]),delete me.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Or('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');z=b.TRUSTED_TYPES_POLICY,R=z.createHTML("")}else z===void 0&&(z=ic(T,s)),z!==null&&typeof R=="string"&&(R=z.createHTML(""));_t&&_t(b),Ie=b}},at=xe({},[...Jn,...es,...Zl]),ut=xe({},[...ts,...Xl]),ht=function(b){let U=Q(b);(!U||!U.tagName)&&(U={namespaceURI:B,tagName:"template"});let f=_n(b.tagName),m=_n(U.tagName);return ie[b.namespaceURI]?b.namespaceURI===Qe?U.namespaceURI===D?f==="svg":U.namespaceURI===tt?f==="svg"&&(m==="annotation-xml"||be[m]):!!at[f]:b.namespaceURI===tt?U.namespaceURI===D?f==="math":U.namespaceURI===Qe?f==="math"&&Ce[m]:!!ut[f]:b.namespaceURI===D?U.namespaceURI===Qe&&!Ce[m]||U.namespaceURI===tt&&!be[m]?!1:!ut[f]&&(u[f]||!at[f]):!!(w==="application/xhtml+xml"&&ie[b.namespaceURI]):!1},Ve=function(b){Lr(t.removed,{element:b});try{Q(b).removeChild(b)}catch{C(b)}},rt=function(b,U){try{Lr(t.removed,{attribute:U.getAttributeNode(b),from:U})}catch{Lr(t.removed,{attribute:null,from:U})}if(U.removeAttribute(b),b==="is")if(se||De)try{Ve(U)}catch{}else try{U.setAttribute(b,"")}catch{}},ve=function(b){let U=null,f=null;if(ee)b="<remove></remove>"+b;else{let $=Qn(b,/^[\r\n\t ]+/);f=$&&$[0]}w==="application/xhtml+xml"&&B===D&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let m=z?z.createHTML(b):b;if(B===D)try{U=new y().parseFromString(m,w)}catch{}if(!U||!U.documentElement){U=E.createDocument(B,"template",null);try{U.documentElement.innerHTML=te?R:m}catch{}}let p=U.body||U.documentElement;return b&&f&&p.insertBefore(r.createTextNode(f),p.childNodes[0]||null),B===D?oe.call(U,q?"html":"body")[0]:q?U.documentElement:p},fe=function(b){return I.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ae=function(b){return b instanceof g&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof _)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},yt=function(b){return typeof c=="function"&&b instanceof c};function it(J,b,U){pn(J,f=>{f.call(t,b,U,Ie)})}let Rt=function(b){let U=null;if(it(le.beforeSanitizeElements,b,null),Ae(b))return Ve(b),!0;let f=ae(b.nodeName);if(it(le.uponSanitizeElement,b,{tagName:f,allowedTags:Z}),S&&b.hasChildNodes()&&!yt(b.firstElementChild)&&ft(/<[/\w!]/g,b.innerHTML)&&ft(/<[/\w!]/g,b.textContent)||b.nodeType===Nr.progressingInstruction||S&&b.nodeType===Nr.comment&&ft(/<[/\w]/g,b.data))return Ve(b),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(f))&&(!Z[f]||me[f])){if(!me[f]&&jt(f)&&(re.tagNameCheck instanceof RegExp&&ft(re.tagNameCheck,f)||re.tagNameCheck instanceof Function&&re.tagNameCheck(f)))return!1;if(st&&!Ze[f]){let m=Q(b)||b.parentNode,p=G(b)||b.childNodes;if(p&&m){let $=p.length;for(let k=$-1;k>=0;--k){let F=v(p[k],!0);F.__removalCount=(b.__removalCount||0)+1,m.insertBefore(F,j(b))}}}return Ve(b),!0}return b instanceof i&&!ht(b)||(f==="noscript"||f==="noembed"||f==="noframes")&&ft(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ve(b),!0):(h&&b.nodeType===Nr.text&&(U=b.textContent,pn([he,Se,je],m=>{U=Dr(U,m," ")}),b.textContent!==U&&(Lr(t.removed,{element:b.cloneNode()}),b.textContent=U)),it(le.afterSanitizeElements,b,null),!1)},Wt=function(b,U,f){if(He&&(U==="id"||U==="name")&&(f in r||f in We))return!1;if(!(ke&&!M[U]&&ft(ze,U))){if(!(ne&&ft(Te,U))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(U,b))){if(!_e[U]||M[U]){if(!(jt(b)&&(re.tagNameCheck instanceof RegExp&&ft(re.tagNameCheck,b)||re.tagNameCheck instanceof Function&&re.tagNameCheck(b))&&(re.attributeNameCheck instanceof RegExp&&ft(re.attributeNameCheck,U)||re.attributeNameCheck instanceof Function&&re.attributeNameCheck(U,b))||U==="is"&&re.allowCustomizedBuiltInElements&&(re.tagNameCheck instanceof RegExp&&ft(re.tagNameCheck,f)||re.tagNameCheck instanceof Function&&re.tagNameCheck(f))))return!1}else if(!Ue[U]){if(!ft(ye,Dr(f,L,""))){if(!((U==="src"||U==="xlink:href"||U==="href")&&b!=="script"&&Gl(f,"data:")===0&&lt[b])){if(!($e&&!ft(de,Dr(f,L,"")))){if(f)return!1}}}}}}}return!0},jt=function(b){return b!=="annotation-xml"&&Qn(b,K)},It=function(b){it(le.beforeSanitizeAttributes,b,null);let{attributes:U}=b;if(!U||Ae(b))return;let f={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},m=U.length;for(;m--;){let p=U[m],{name:$,namespaceURI:k,value:F}=p,ge=ae($),nt=F,Me=$==="value"?nt:Yl(nt);if(f.attrName=ge,f.attrValue=Me,f.keepAttr=!0,f.forceKeepAttr=void 0,it(le.uponSanitizeAttribute,b,f),Me=f.attrValue,Ke&&(ge==="id"||ge==="name")&&(rt($,b),Me=et+Me),S&&ft(/((--!?|])>)|<\/(style|title|textarea)/i,Me)){rt($,b);continue}if(ge==="attributename"&&Qn(Me,"href")){rt($,b);continue}if(f.forceKeepAttr)continue;if(!f.keepAttr){rt($,b);continue}if(!P&&ft(/\/>/i,Me)){rt($,b);continue}h&&pn([he,Se,je],Pt=>{Me=Dr(Me,Pt," ")});let pt=ae(b.nodeName);if(!Wt(pt,ge,Me)){rt($,b);continue}if(z&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!k)switch(T.getAttributeType(pt,ge)){case"TrustedHTML":{Me=z.createHTML(Me);break}case"TrustedScriptURL":{Me=z.createScriptURL(Me);break}}if(Me!==nt)try{k?b.setAttributeNS(k,$,Me):b.setAttribute($,Me),Ae(b)?Ve(b):Ho(t.removed)}catch{rt($,b)}}it(le.afterSanitizeAttributes,b,null)},Nt=function J(b){let U=null,f=fe(b);for(it(le.beforeSanitizeShadowDOM,b,null);U=f.nextNode();)it(le.uponSanitizeShadowNode,U,null),Rt(U),It(U),U.content instanceof o&&J(U.content);it(le.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(J){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},U=null,f=null,m=null,p=null;if(te=!J,te&&(J="<!-->"),typeof J!="string"&&!yt(J))if(typeof J.toString=="function"){if(J=J.toString(),typeof J!="string")throw Or("dirty is not a string, aborting")}else throw Or("toString is not a function");if(!t.isSupported)return J;if(W||Je(b),t.removed=[],typeof J=="string"&&(Ge=!1),Ge){if(J.nodeName){let F=ae(J.nodeName);if(!Z[F]||me[F])throw Or("root node is forbidden and cannot be sanitized in-place")}}else if(J instanceof c)U=ve("<!---->"),f=U.ownerDocument.importNode(J,!0),f.nodeType===Nr.element&&f.nodeName==="BODY"||f.nodeName==="HTML"?U=f:U.appendChild(f);else{if(!se&&!h&&!q&&J.indexOf("<")===-1)return z&&Oe?z.createHTML(J):J;if(U=ve(J),!U)return se?null:Oe?R:""}U&&ee&&Ve(U.firstChild);let $=fe(Ge?J:U);for(;m=$.nextNode();)Rt(m),It(m),m.content instanceof o&&Nt(m.content);if(Ge)return J;if(se){if(De)for(p=H.call(U.ownerDocument);U.firstChild;)p.appendChild(U.firstChild);else p=U;return(_e.shadowroot||_e.shadowrootmode)&&(p=pe.call(n,p,!0)),p}let k=q?U.outerHTML:U.innerHTML;return q&&Z["!doctype"]&&U.ownerDocument&&U.ownerDocument.doctype&&U.ownerDocument.doctype.name&&ft(Qo,U.ownerDocument.doctype.name)&&(k="<!DOCTYPE "+U.ownerDocument.doctype.name+`>
`+k),h&&pn([he,Se,je],F=>{k=Dr(k,F," ")}),z&&Oe?z.createHTML(k):k},t.setConfig=function(){let J=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Je(J),W=!0},t.clearConfig=function(){Ie=null,W=!1},t.isValidAttribute=function(J,b,U){Ie||Je({});let f=ae(J),m=ae(b);return Wt(f,m,U)},t.addHook=function(J,b){typeof b=="function"&&Lr(le[J],b)},t.removeHook=function(J,b){if(b!==void 0){let U=Wl(le[J],b);return U===-1?void 0:jl(le[J],U,1)[0]}return Ho(le[J])},t.removeHooks=function(J){le[J]=[]},t.removeAllHooks=function(){le=Ko()},t}var ea=Jo();var ta={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ra=e=>(...t)=>({_$litDirective$:e,values:t}),mn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Pr=class extends mn{constructor(t){if(super(t),this.it=Xe,t.type!==ta.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Xe||t==null)return this._t=void 0,this.it=t;if(t===tr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Pr.directiveName="unsafeHTML",Pr.resultType=1;var na=ra(Pr);function cs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var lr=cs();function da(e){lr=e}var Ur={exec:()=>null};function Le(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(gt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var lc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),gt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},cc=/^(?:[ \t]*(?:\n|$))+/,dc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,uc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,zr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,pc=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ds=/(?:[*+-]|\d{1,9}[.)])/,ua=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,pa=Le(ua).replace(/bull/g,ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),fc=Le(ua).replace(/bull/g,ds).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),us=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,_c=/^[^\n]+/,ps=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,mc=Le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ps).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),gc=Le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,ds).getRegex(),wn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",fs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,hc=Le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",fs).replace("tag",wn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),fa=Le(us).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex(),bc=Le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",fa).getRegex(),_s={blockquote:bc,code:dc,def:mc,fences:uc,heading:pc,hr:zr,html:hc,lheading:pa,list:gc,newline:cc,paragraph:fa,table:Ur,text:_c},sa=Le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex(),vc={..._s,lheading:fc,table:sa,paragraph:Le(us).replace("hr",zr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",sa).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",wn).getRegex()},yc={..._s,html:Le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",fs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Ur,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Le(us).replace("hr",zr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",pa).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},wc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,_a=/^( {2,}|\\)\n(?!\s*$)/,$c=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,kn=/[\p{P}\p{S}]/u,ms=/[\s\p{P}\p{S}]/u,ma=/[^\s\p{P}\p{S}]/u,xc=Le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ms).getRegex(),ga=/(?!~)[\p{P}\p{S}]/u,Sc=/(?!~)[\s\p{P}\p{S}]/u,Ac=/(?:[^\s\p{P}\p{S}]|~)/u,Tc=Le(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",lc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ha=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,Ec=Le(ha,"u").replace(/punct/g,kn).getRegex(),Cc=Le(ha,"u").replace(/punct/g,ga).getRegex(),ba="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Rc=Le(ba,"gu").replace(/notPunctSpace/g,ma).replace(/punctSpace/g,ms).replace(/punct/g,kn).getRegex(),Ic=Le(ba,"gu").replace(/notPunctSpace/g,Ac).replace(/punctSpace/g,Sc).replace(/punct/g,ga).getRegex(),Lc=Le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ma).replace(/punctSpace/g,ms).replace(/punct/g,kn).getRegex(),Dc=Le(/\\(punct)/,"gu").replace(/punct/g,kn).getRegex(),Oc=Le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Mc=Le(fs).replace("(?:-->|$)","-->").getRegex(),Nc=Le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Mc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),bn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Pc=Le(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",bn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),va=Le(/^!?\[(label)\]\[(ref)\]/).replace("label",bn).replace("ref",ps).getRegex(),ya=Le(/^!?\[(ref)\](?:\[\])?/).replace("ref",ps).getRegex(),Fc=Le("reflink|nolink(?!\\()","g").replace("reflink",va).replace("nolink",ya).getRegex(),oa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gs={_backpedal:Ur,anyPunctuation:Dc,autolink:Oc,blockSkip:Tc,br:_a,code:kc,del:Ur,emStrongLDelim:Ec,emStrongRDelimAst:Rc,emStrongRDelimUnd:Lc,escape:wc,link:Pc,nolink:ya,punctuation:xc,reflink:va,reflinkSearch:Fc,tag:Nc,text:$c,url:Ur},qc={...gs,link:Le(/^!?\[(label)\]\((.*?)\)/).replace("label",bn).getRegex(),reflink:Le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",bn).getRegex()},as={...gs,emStrongRDelimAst:Ic,emStrongLDelim:Cc,url:Le(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",oa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Le(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",oa).getRegex()},Bc={...as,br:Le(_a).replace("{2,}","*").getRegex(),text:Le(as.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},gn={normal:_s,gfm:vc,pedantic:yc},Fr={normal:gs,gfm:as,breaks:Bc,pedantic:qc},Uc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},aa=e=>Uc[e];function zt(e,t){if(t){if(gt.escapeTest.test(e))return e.replace(gt.escapeReplace,aa)}else if(gt.escapeTestNoEncode.test(e))return e.replace(gt.escapeReplaceNoEncode,aa);return e}function ia(e){try{e=encodeURI(e).replace(gt.percentDecode,"%")}catch{return null}return e}function la(e,t){let r=e.replace(gt.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(gt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(gt.slashPipe,"|");return n}function qr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function zc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function ca(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,i}function Hc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var vn=class{constructor(e){Be(this,"options");Be(this,"rules");Be(this,"lexer");this.options=e||lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:qr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Hc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=qr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:qr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=qr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))c.push(r[i]),a=!0;else if(!a)c.push(r[i]);else break;r=r.slice(i);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=g,r.length===0)break;let y=o.at(-1);if(y?.type==="code")break;if(y?.type==="blockquote"){let T=y,x=T.raw+`
`+r.join(`
`),v=this.blockquote(x);o[o.length-1]=v,n=n.substring(0,n.length-T.raw.length)+v.raw,s=s.substring(0,s.length-T.text.length)+v.text;break}else if(y?.type==="list"){let T=y,x=T.raw+`
`+r.join(`
`),v=this.list(x);o[o.length-1]=v,n=n.substring(0,n.length-y.raw.length)+v.raw,s=s.substring(0,s.length-T.raw.length)+v.raw,r=x.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let g=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,v=>" ".repeat(3*v.length)),y=e.split(`
`,1)[0],T=!g.trim(),x=0;if(this.options.pedantic?(x=2,_=g.trimStart()):T?x=t[1].length+1:(x=t[2].search(this.rules.other.nonSpaceChar),x=x>4?1:x,_=g.slice(x),x+=t[1].length),T&&this.rules.other.blankLine.test(y)&&(d+=y+`
`,e=e.substring(y.length+1),i=!0),!i){let v=this.rules.other.nextBulletRegex(x),C=this.rules.other.hrRegex(x),j=this.rules.other.fencesBeginRegex(x),G=this.rules.other.headingBeginRegex(x),Q=this.rules.other.htmlBeginRegex(x);for(;e;){let z=e.split(`
`,1)[0],R;if(y=z,this.options.pedantic?(y=y.replace(this.rules.other.listReplaceNesting,"  "),R=y):R=y.replace(this.rules.other.tabCharGlobal,"    "),j.test(y)||G.test(y)||Q.test(y)||v.test(y)||C.test(y))break;if(R.search(this.rules.other.nonSpaceChar)>=x||!y.trim())_+=`
`+R.slice(x);else{if(T||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||j.test(g)||G.test(g)||C.test(g))break;_+=`
`+y}!T&&!y.trim()&&(T=!0),d+=z+`
`,e=e.substring(z.length+1),g=R.slice(x)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=_.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=_.raw+i.tokens[0].raw,i.tokens[0].text=_.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(_)):i.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):i.tokens.unshift(_)}}if(!s.loose){let d=i.tokens.filter(g=>g.type==="space"),_=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));s.loose=_}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=la(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(la(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=qr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=zc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),ca(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return ca(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let _=[...n[0]][0].length,g=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let T=g.slice(1,-1);return{type:"em",raw:g,text:T,tokens:this.lexer.inlineTokens(T)}}let y=g.slice(2,-2);return{type:"strong",raw:g,text:y,tokens:this.lexer.inlineTokens(y)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Et=class is{constructor(t){Be(this,"tokens");Be(this,"options");Be(this,"state");Be(this,"inlineQueue");Be(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||lr,this.options.tokenizer=this.options.tokenizer||new vn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:gt,block:gn.normal,inline:Fr.normal};this.options.pedantic?(r.block=gn.pedantic,r.inline=Fr.pedantic):this.options.gfm&&(r.block=gn.gfm,this.options.breaks?r.inline=Fr.breaks:r.inline=Fr.gfm),this.tokenizer.rules=r}static get rules(){return{block:gn,inline:Fr}}static lex(t,r){return new is(r).lex(t)}static lexInline(t,r){return new is(r).inlineTokens(t)}lex(t){t=t.replace(gt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(gt.tabCharGlobal,"    ").replace(gt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(_=>(i=_.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let _=r.at(-1);i.type==="text"&&_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,c)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,g=t.slice(1),y;this.options.extensions.startInline.forEach(T=>{y=T.call({lexer:this},g),typeof y=="number"&&y>=0&&(_=Math.min(_,y))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},yn=class{constructor(e){Be(this,"options");Be(this,"parser");this.options=e||lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(gt.notSpaceStart)?.[0],s=e.replace(gt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+zt(n)+'">'+(r?s:zt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:zt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${zt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ia(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+zt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ia(e);if(s===null)return zt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${zt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:zt(e.text)}},hs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ct=class ls{constructor(t){Be(this,"options");Be(this,"renderer");Be(this,"textRenderer");this.options=t||lr,this.options.renderer=this.options.renderer||new yn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new hs}static parse(t,r){return new ls(r).parse(t)}static parseInline(t,r){return new ls(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},hn,Br=(hn=class{constructor(e){Be(this,"options");Be(this,"block");this.options=e||lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Et.lex:Et.lexInline}provideParser(){return this.block?Ct.parse:Ct.parseInline}},Be(hn,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Be(hn,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),hn),Wc=class{constructor(...e){Be(this,"defaults",cs());Be(this,"options",this.setOptions);Be(this,"parse",this.parseMarkdown(!0));Be(this,"parseInline",this.parseMarkdown(!1));Be(this,"Parser",Ct);Be(this,"Renderer",yn);Be(this,"TextRenderer",hs);Be(this,"Lexer",Et);Be(this,"Tokenizer",vn);Be(this,"Hooks",Br);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new yn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new vn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Br;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],i=s[a];Br.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Br.passThroughHooksRespectAsync.has(o))return(async()=>{let g=await c.call(s,d);return i.call(s,g)})();let _=c.call(s,d);return i.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(s,d);return g===!1&&(g=await i.apply(s,d)),g})();let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Et.lex(e,t??this.defaults)}parser(e,t){return Ct.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Et.lex:Et.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Et.lex:Et.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+zt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},ir=new Wc;function Ne(e,t){return ir.parse(e,t)}Ne.options=Ne.setOptions=function(e){return ir.setOptions(e),Ne.defaults=ir.defaults,da(Ne.defaults),Ne};Ne.getDefaults=cs;Ne.defaults=lr;Ne.use=function(...e){return ir.use(...e),Ne.defaults=ir.defaults,da(Ne.defaults),Ne};Ne.walkTokens=function(e,t){return ir.walkTokens(e,t)};Ne.parseInline=ir.parseInline;Ne.Parser=Ct;Ne.parser=Ct.parse;Ne.Renderer=yn;Ne.TextRenderer=hs;Ne.Lexer=Et;Ne.lexer=Et.lex;Ne.Tokenizer=vn;Ne.Hooks=Br;Ne.parse=Ne;var df=Ne.options,uf=Ne.setOptions,pf=Ne.use,ff=Ne.walkTokens,_f=Ne.parseInline;var mf=Ct.parse,gf=Et.lex;function Vt(e){let t=Ne.parse(e),r=ea.sanitize(t);return na(r)}function Ht(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function yr(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function $n(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var jc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Gc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Yc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function Kt(e){return!!e&&typeof e=="object"}function bs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function wa(e,t){let r=bs(e),n=bs(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Vc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>Kt(s)&&typeof s.text=="string"?s.text:"").join(""):Kt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Kc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:jc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=bs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=wa(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let i=wa(Kt(c)?c.old_string:"",Kt(c)?c.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function ka(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function $a(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Gc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Yc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Zc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(Kt(o)){if(o.type==="text"&&typeof o.text=="string")s.push($a(o.text));else if(o.type==="thinking"){let a=ka(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Kc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(Kt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Vc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Xc(e){if(e.type==="item.completed"&&Kt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[$a(t.text)];if(t.type==="reasoning"){let r=ka(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Qc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function xa(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!Kt(o))continue;let a=Qc(o)?Xc(o):Zc(o,r);for(let c of a)t.push(c)}return t}var Jc=5,ed=10,td=/Task\s+#(\d+)/,rd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,nd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function xn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function sd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function od(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function ad(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=td.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function id(e){if(e.tool==="Bash"){let t=e.command||"";return rd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":nd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function ld(e){let t=e.filter(s=>s.kind==="tool").slice(-ed),r=new Map;t.forEach((s,o)=>{let a=id(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function cd(e){let t=od(e);if(t)return{text:t,guess:!1};let r=ad(e);if(r)return{text:r,guess:!1};let n=ld(e);return n?{text:n,guess:!0}:null}function dd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:wt(e,t)}function Sn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,_=null,g=null,y=!1,T=!1,x=!1,v=null,C=null;function j(){y=!1,T=!1,x=!1,v=null,C=null}async function G(M){if(r){T=!0,x=!1,L();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:M}));if(o!==M)return;!O||typeof O!="object"||Array.isArray(O)?x=!0:(v=O,C=M)}catch{o===M&&(x=!0)}finally{o===M&&(T=!1,L())}}}function Q(){if(y=!y,y&&o&&C!==o){G(o);return}L()}function z(){if(!y)return"";let M=yr({loading:T,error:x});if(M)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${M}
      </div>`;if(!v)return"";if(v.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=$n(v.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?l`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof v.task_prompt=="string"?Ht("\uACFC\uC5C5 (user)",v.task_prompt):""}
      ${typeof v.system_prompt=="string"?Ht("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",v.system_prompt):""}
    </div>`}function R(){if(!o||!n)return[];let M=n.get(o);return xa(M?M.lines:[])}function E(){if(!o||!n)return null;let M=n.get(o),O=M?M.last_event_at:null;return typeof O=="number"?O:null}function I(){return a.status==="running"}function H(){if(I()&&o){g||(g=setInterval(()=>L(),1e3));return}oe()}function oe(){g&&(clearInterval(g),g=null)}function pe(M){let O=[],ne=0;for(;ne<M.length;){let ke=M[ne];if(ke.kind==="tool"){let $e=ne;for(;$e<M.length&&M[$e].kind==="tool"&&M[$e].tool===ke.tool;)$e+=1;if($e-ne>=Jc&&!d.has(ne)){O.push({kind:"group",idx:ne,tool:ke.tool||"",lines:M.slice(ne,$e).map((P,h)=>({idx:ne+h,line:P}))}),ne=$e;continue}}O.push({kind:"line",idx:ne,line:ke}),ne+=1}return O}function le(M){for(let O=M.length-1;O>=0;O-=1){let ne=M[O];if(ne.kind==="result"||ne.kind==="error")return null;if(ne.kind==="tool"&&!Object.hasOwn(ne,"result"))return ne}return null}function he(M){for(let O=M.length-1;O>=0;O-=1)if(M[O].kind==="thinking")return M[O];return null}function Se(M,O){if(O.kind==="gate")return l`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return l`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return l`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Vt(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let ne=i.has(M);return l`<div
        class="sv__think${ne?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ye(M)}
      >
        <span class="sv__think-line">💭 ${xn(O.text)}</span>
        ${ne?l`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return l`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return l`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let ne=i.has(M),ke=O.tool==="Bash"?sd(O.command):0,$e=O.tool==="Bash"?ke>1?xn(O.command):O.command:O.path||O.command||"";return l`<div
        class="sv__tool${ne?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>ye(M)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${$e?l`<span class="sv__tool-detail">${$e}</span>`:""}
          ${ke>1?l`<span class="sv__tool-more">⋯ ${ke}줄</span>`:""}
          ${typeof O.added=="number"?l`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?l`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?l`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${ne?l`<pre class="sv__tool-expand">${je(O)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Vt(O.text||"")}</div>`}function je(M){let O=[];if(M.tool==="Bash"&&typeof M.command=="string"&&M.command.length>0)O.push(M.command);else if(M.input!==void 0)try{O.push(`input: ${JSON.stringify(M.input,null,2)}`)}catch{}return typeof M.output=="string"&&M.output.length>0&&O.push(`output:
${M.output}`),O.join(`

`)}function ze(){if(!o)return l``;let M=R(),O=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ne=a.session_id||"",ke=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,$e=I(),P=$e?dd(E(),Date.now()):"",h=$e?le(M):null,S=$e?he(M):null,q=cd(M);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${q?l`<span
              class="sv__stage${q.guess?" sv__stage--guess":""}"
              title=${q.text}
              >${q.text}</span
            >`:""}
        ${$e?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${P?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${P}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${P?l`<span class="sv__live-ago">${P}</span>`:""}</span
            >`:""}
        ${ne?l`<button
              type="button"
              class="sv__session"
              title=${ne}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ne}`}
              @click=${()=>we(ne)}
            >
              ⧉ ${ne.slice(0,8)}
            </button>`:""}
        ${O?l`<span class="sv__meta">${O}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${y?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${y?"true":"false"}
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
          aria-label=${ke}
          @click=${Z}
        >
          <span class="sv__follow-full">⇣ ${ke}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>me()}
        >
          ✕
        </button>
      </div>
      ${z()}
      <div class="sv__body">
        ${M.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:pe(M).map(W=>W.kind==="group"?Te(W):Se(W.idx,W.line))}
      </div>
      ${h||S?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${h?l`<span class="sv__now-icon">${h.icon}</span>
                  <span class="sv__now-name">${h.tool}</span>
                  <span class="sv__now-detail"
                    >${h.tool==="Bash"?xn(h.command):h.path||h.command||""}</span
                  >`:""}
            ${S?l`<span class="sv__now-think"
                  >💭 ${xn(S.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Te(M){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>de(M.idx)}
    >
      <span class="sv__group-icon">${M.lines[0].line.icon}</span>
      <span class="sv__group-name">${M.tool}</span>
      <span class="sv__group-count">${M.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function de(M){d.add(M),L()}function L(){Ee(ze(),e),H(),c&&K()}function K(){let M=e.querySelector(".sv__body");M&&(M.scrollTop=M.scrollHeight)}function ye(M){i.has(M)?i.delete(M):i.add(M),L()}function Z(){c=!c,L()}function we(M){or(M).then(O=>{O?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _e(M){!o||!M||(a={...a,...M},L())}function Pe(M){let O=M.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&c&&(c=!1,L())}e.addEventListener("scroll",Pe,!0);function re(M){let O=M&&M.attempt_id;O&&(o=O,a=M.meta||{},c=!0,i.clear(),d.clear(),j(),!_&&n&&(_=n.subscribe(L)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),L())}function me(){let M=o;o=null,i.clear(),d.clear(),j(),oe(),r&&M&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${M}`})).catch(()=>{}),Ee(l``,e),s&&s()}return{open:re,updateMeta:_e,close:me,isOpen(){return o!==null},destroy(){oe(),_&&(_(),_=null),e.removeEventListener("scroll",Pe,!0),o=null,Ee(l``,e)}}}function ud(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function Sa(e,t){let r=ud(e);return l`
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
  `}var pd="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",fd=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,_d=/^\*\*결론\*\* — (.+)$/;function Aa(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==pd)return null;let r=fd.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?_d.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var Ta=20;function Ea(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function md(e){return e.length>Ta?`${e.slice(0,Ta)}\u2026`:e}function gd(e,t,r,n){let s=`${t.lane} ${md(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Ea(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Vt(t.body)}
        </div>`:""}
  </div>`}function hd(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Ea(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Vt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Ca(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=Aa(typeof i.text=="string"?i.text:"");return d?gd(i,d,t,s.has(i.id)):hd(i)})}
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
  `}var bd=["codex","opus","fable","self","skip"],vd=["codex","fable","skip"],yd=["low","medium","high","xhigh"],wd=["standard","fast_track"],jr=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_model","impl_effort"],ys={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},Ra={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},kd=["self","skip"],$d="opus",An={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function Tn(e){let t=ys[e]||{title:e};return l`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?l`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function xd(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:An[e]||"(\uAE30\uBCF8)"}function Hr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function En(e){if(!Hr(e)||!Hr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Hr(r)&&Hr(r.models));return t.length>0?t:null}function vs(e){return{value:e,label:e}}function Oa(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function Sd(e,t){let r=En(e);if(!r)return t?[{label:null,options:[vs(t)]}]:[];let n=r.map(([o,a])=>({label:o,options:Object.keys(a.models).map(vs)})),s=n.some(o=>o.options.some(a=>a.value===t));return t&&!s?[Oa(t),...n]:n}function wr(e,t){let r={label:null,options:e.map(vs)};return t&&!e.includes(t)?[Oa(t),r]:[r]}function Ad(e,t){let r=En(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Ma(e,t){return Hr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ia(e,t){let r=En(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Ma(n,n.models[t]);return[]}function Td(e){let t=En(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Ma(n,s))r.includes(o)||r.push(o);return r}function cr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n}=e,s=r("orchestration_model")||$d,o=r("impl_model");return jr.map(a=>{let c=t(a),i,d=!1;return a==="orchestration_model"||a==="impl_model"?i=Sd(n,c):a==="orchestration_effort"?i=wr(Ia(n,s),c):a==="impl_effort"?i=wr(o?Ia(n,o):Td(n),c):a==="plan_review_model"?i=wr(vd,c):Object.hasOwn(Ra,a)?(i=wr(yd,c),d=kd.includes(r(Ra[a]))):i=wr(bd,c),{key:a,groups:i,selected:c,disabled:d,runner:a==="orchestration_model"?Ad(n,s):null}})}function Wr(e,t,r){return l`
    ${typeof r=="string"?l`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>La(s,t)):l`<optgroup label=${n.label}>
            ${n.options.map(s=>La(s,t))}
          </optgroup>`)}
  `}function La(e,t){return l`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function Da(e,t,r,n,s,o,a){return l`
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
  `}function Na(e,t,r,n){let s=e&&e.metadata||{},o=r&&typeof r=="object"?r:{},a=_=>typeof s[_]=="string"?s[_]:"",i=cr({selectedOf:a,effectiveOf:_=>{let g=a(_);return g||(typeof o[_]=="string"?o[_]:"")},runner_catalog:n}),d=s.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${i.map(_=>Da(_.key,Wr(_.groups,_.selected,xd(_.key,o)),_.selected,!1,_.disabled,_.runner,t))}
    ${Da("workflow_mode",Wr(wr(wd,d),d),d,s.workflow_mode==="fast_track",!1,null,t)}
  `}function Ed(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Pa(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i(x){x.key==="Escape"&&s&&(x.preventDefault(),y())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>y()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Ed(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>y()}
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
    `:l``}function _(){Ee(d(),e)}async function g(x){s=x,o="loading",a="",c="",_();let v=r?r():"";if(!v){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let C="/api/doc?workspace="+encodeURIComponent(v)+"&path="+encodeURIComponent(x);try{let j=await n(C),G=await j.json().catch(()=>({}));if(!j.ok||!G||G.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(G&&G.error||j.status)+")",_();return}a=String(G.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function y(){s=null,Ee(l``,e)}function T(){document.removeEventListener("keydown",i),y()}return{open:g,close:y,destroy:T}}var Cd=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Fa="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Rd(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Id(e){let t=br(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Fa}
          >부분 집계</span
        >`:""}`}function Ld(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${Cd.map(r=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${Rd(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Fa}</span>`:""}
  </div>`}var Dd={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Od(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function qa(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let g=typeof d.session_id=="string"&&d.session_id.length>0,y=o.has(d.attempt_id),T=g&&!y,x=g?y?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!T}
      title=${x}
      @click=${v=>{v.stopPropagation(),T&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let g=d.cause_detail,y=g&&typeof g.reason=="string"&&g.reason.length>0?typeof g.command=="string"&&g.command.length>0?`${g.reason} \xB7 ${g.command}`:g.reason:d.cause;return l`<div class="detail-session__cause" title=${y}>
      ${d.cause}
    </div>`},i=d=>{if(!br(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${g=>{g.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${Id(r.total)}
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
                >${Dd[d.status||""]||"\xB7"}</span
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
                >${Od(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?Ld(d.usage):""}
          </div>`)}
    </div>
  `}function Ba(e,t={}){return l`
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
          ${Md(e)}
        </div>`:""}
  `}function Md(e){let t=yr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Ht("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=$n(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Ht("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Ht("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Nd=["open","in_progress","deferred","resolved","closed"],Pd=[0,1,2,3,4];function Ua(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,i=t.sessionLogStore,d=null,_=null,g={},y="",T=!1,x=!1,v=!1,C="",j="",G="";function Q(){x=!1,v=!1,C="",j="",G=""}let z=[],R=null,E=null,I=!1,H="",oe=!1,pe=0,le=new Set;function he(){z=[],R=null,E=null,I=!1,H="",oe=!1,pe+=1,le.clear()}async function Se(p){if(!s)return;let $=++pe;try{let k=await Promise.resolve(s("get-comments",{id:p}));if($!==pe||p!==d)return;z=Array.isArray(k)?k:[],I=!1}catch{if($!==pe||p!==d)return;I=!0}m()}function je(){if(!s||!d)return;let p=_&&typeof _.comment_count=="number"?_.comment_count:null;if(R!==d){R=d,E=p,Se(d);return}p!==null&&p!==E&&(E=p,Se(d))}function ze(p){le.has(p)?le.delete(p):le.add(p),m()}function Te(p){let $=H.trim().length===0;H=p,$!==(p.trim().length===0)&&m()}async function de(){let p=H.trim();if(!s||!d||p.length===0||oe)return;let $=d;oe=!0,m();let k=!1;try{let F=await Promise.resolve(s("add-comment",{id:$,text:p}));Array.isArray(F)&&F.length>0&&(k=!0,$===d&&(z=F,I=!1,H="",E=F.length))}catch{k=!1}k||X("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),$===d&&(oe=!1),m()}let L={onToggle:ze,onDraftInput:Te,onSubmit:de},K=document.createElement("div");K.className="md-viewer-root",document.body.appendChild(K);let ye=Pa(K,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Z=document.createElement("div");Z.className="session-log-root",document.body.appendChild(Z);let we=Sn(Z,{transport:s?(p,$)=>Promise.resolve(s(p,$)):void 0,sessionLogStore:i}),_e=!1,Pe=!1,re=!1,me=null,M=null,O=0;function ne(p){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${p}`}function ke(){_e=!1,Pe=!1,re=!1,me=null,M=null,O+=1}async function $e(p){if(!s)return;let $=++O;Pe=!0,re=!1,m();try{let k=await Promise.resolve(s("get-bead-prompt",{bead_id:p}));if($!==O)return;!k||typeof k!="object"||Array.isArray(k)?re=!0:(me=k,M=ne(p))}catch{$===O&&(re=!0)}finally{$===O&&(Pe=!1,m())}}function P(){if(_e=!_e,_e&&d&&M!==ne(d)){me=null,$e(d);return}m()}function h(){if(!a||!d)return[];let p=a.get();return(p&&p.attempts?Object.values(p.attempts):[]).filter(k=>k&&k.bead_id===d).sort((k,F)=>(F.started_at||0)-(k.started_at||0)).map(k=>({attempt_id:k.attempt_id,bead_id:k.bead_id,status:k.status,started_at:typeof k.started_at=="number"?k.started_at:null,runner:k.runner||null,model:k.model||null,session_id:k.session_id||null,resumed_from:k.resumed_from||null,dismissed_at:typeof k.dismissed_at=="number"?k.dismissed_at:null,cause:typeof k.cause=="string"?k.cause:null,cause_detail:k.cause_detail||null,usage:k.usage||null}))}function S(){if(!a||!d)return null;let p=a.get();return Ot(p&&p.attempts||{},d)}let q=new Set;function W(p){q.has(p)?q.delete(p):q.add(p),m()}function ee(p){let $=a?a.get():null,k=$&&$.attempts?$.attempts[p]:null;we.open({attempt_id:p,meta:k?{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,status:k.status||void 0,session_id:k.session_id||void 0}:{}})}async function se(p){if(!s||!p)return;let $=()=>{let F=a?a.get():null;return F&&typeof F.revision=="number"?F.revision:0},k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:$()});if(k&&k.conflict){let F=k.queue&&typeof k.queue.revision=="number"?k.queue.revision:$();k=await s("worker-attempt-resume",{attempt_id:p,expected_revision:F})}k&&k.resumed===!1&&!k.conflict&&k.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${k.reason}`,"error",2400)}let De={onOpen:ee,onResume:se,onToggleUsage:W};function Oe(){let p=a?a.get():null,$=p&&p.exec_defaults;return $&&typeof $=="object"?$:{}}function He(){let p=a?a.get():null;return p&&p.runner_catalog||null}function Ke(){let p=c?c.get():null;return!p||typeof p.revision!="number"?null:{revision:p.revision,presets:Array.isArray(p.presets)?p.presets:[]}}function et(p){let $=p&&p.settings&&typeof p.settings=="object"?p.settings:{},k=F=>typeof $[F]=="string"?$[F]:"";return cr({selectedOf:k,effectiveOf:k,runner_catalog:He()}).some(F=>F.groups.some(ge=>ge.options.some(nt=>nt.value===F.selected&&nt.label.endsWith("(\uBE44\uD638\uD658)"))))}function st(p){c&&p&&typeof p.revision=="number"&&Array.isArray(p.presets)&&c.set({revision:p.revision,presets:p.presets})}async function Ge(){let p=Ke(),$=p?.presets.find(k=>k.id===y);if(!(!s||!d||!p||!$||et($)||T)){T=!0,m();try{let k=await Promise.resolve(s("apply-exec-preset",{id:d,preset_id:$.id,expected_revision:p.revision}));if(k&&k.conflict){st(k),X("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let F=k&&Array.isArray(k.issue)?k.issue[0]:k?.issue;if(k&&k.applied&&F&&typeof F=="object"){_=F;for(let ge of jr)delete g[ge];X("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}k&&k.error==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(k){k&&typeof k=="object"&&k.code==="bd_readback_failed"?X("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):X("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,m()}}}function Re(){let p=Ke();if(p&&p.presets.length===0)return l`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let $=p?p.presets:[],k=$.find(ge=>ge.id===y),F=k?et(k):!1;return l`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${p===null||T}
          @change=${ge=>{y=ge.target.value,m()}}
        >
          <option value="" ?selected=${y===""}>
            ${p===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${$.map(ge=>{let nt=et(ge);return l`<option
              value=${ge.id}
              ?selected=${ge.id===y}
            >
              ${ge.name}${nt?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${p===null||!k||F||T}
          @click=${()=>{Ge()}}
        >
          10개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let Ze=null;r&&r.subscribe&&(Ze=r.subscribe(()=>Ue()));let vt=null;a&&typeof a.subscribe=="function"&&(vt=a.subscribe(()=>{d&&m()}));let lt=null;c&&typeof c.subscribe=="function"&&(lt=c.subscribe(()=>{d&&m()}));function ct(p){p.key==="Escape"&&d&&(p.preventDefault(),n())}document.addEventListener("keydown",ct);function Ue(){if(d){if(r&&typeof r.snapshotFor=="function"){let p=r.snapshotFor("detail:"+d)||[];_=p.find(k=>k&&k.id===d)||p[0]||_}je(),m()}}function ot(p){or(p).then($=>{$?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function tt(p){p.preventDefault(),p.stopPropagation(),d&&ot(d)}function Qe(p,$){p.preventDefault(),p.stopPropagation(),ot($)}function D(p,$){p.preventDefault(),p.stopPropagation(),ye.open($)}function B(p,$){g[p]=$,m(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",{id:d,key:p,value:$})).catch(()=>{X("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function te(p,$,k){if(!s||!d)return!1;try{let F=await Promise.resolve(s(p,$)),ge=Array.isArray(F)?F[0]:F;return ge&&typeof ge=="object"&&ge.id?(_=ge,!0):(X(k,"error"),!1)}catch{return X(k,"error"),!1}}function ie(p){setTimeout(()=>{try{let $=e.querySelector(p);$&&typeof $.focus=="function"&&$.focus()}catch{}},0)}function ue(){x=!0,C=_&&_.title||"",m(),ie('.detail-edit__input[data-edit="title"]')}function be(p){C=p.target.value}function Ce(){x=!1,C="",m()}function u(){te("edit-text",{id:d,field:"title",value:C},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(x=!1,C=""),m()})}function w(){v=!0,j=_&&_.description||"",m(),ie('.detail-edit__textarea[data-edit="description"]')}function N(p){j=p.target.value}function Y(){v=!1,j="",m()}function ae(){te("edit-text",{id:d,field:"description",value:j},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then($=>{$&&(v=!1,j=""),m()})}function Ie(p,$,k,F){if(p.key==="Escape"){p.stopPropagation(),k();return}p.key==="Enter"&&(!F||p.ctrlKey||p.metaKey)&&(p.preventDefault(),$())}function We(p){let $=p.target.value;te("update-status",{id:d,status:$},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Fe(p){let $=Number(p.target.value);te("update-priority",{id:d,priority:$},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>m())}function Je(p){G=p.target.value}function at(){let p=G.trim();p.length!==0&&te("label-add",{id:d,label:p},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then($=>{$&&(G=""),m()})}function ut(p){if(p.key==="Escape"){p.stopPropagation(),G="",m();return}p.key==="Enter"&&(p.preventDefault(),at())}function ht(p){te("label-remove",{id:d,label:p},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>m())}let Ve={onCopyPath:Qe,onOpenDoc:D},rt={onChange:B};function ve(p){return typeof p=="string"?p:p&&typeof p=="object"?String(p.id||p.to||p.issue_id||p.depends_on||""):""}function fe(p){switch(p&&typeof p=="object"?String(p.dependency_type||p.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ae(p){let k=(Array.isArray(p.dependencies)?p.dependencies:[]).map(F=>({id:ve(F),icon:fe(F)})).filter(F=>F.id.length>0);return l`
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
    `}function yt(p){let $=p.metadata||{},k=p.workflow||{},F=k.stages||{},ge=F.spec&&F.spec.stale,nt=F.impl&&F.impl.stale,Me=F.plan||null,pt=k.route_source==="derived",Pt=k.route||$.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${pt?" detail-kv__v--derived":""}"
          title=${pt?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${pt&&k.route?`${Pt} ? (\uCD94\uB860)`:Pt}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${$.spec_review||"\uC5C6\uC74C"}${ge?" \xB7 stale":""}</span
        >
      </div>
      ${k.route==="full_plan"?l`<div class="detail-kv">
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
          >${$.impl_review||"\uC5C6\uC74C"}${nt?" \xB7 stale":""}</span
        >
      </div>
      ${$.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${$.pr_url}</span>
          </div>`:""}
    `}let it={route:["spec_backed","full_plan"]};async function Rt(p,$){let k=$.target.value;if(p==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&k!=="full_plan"&&!window.confirm(`full_plan \u2192 ${k||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){m();return}await te("update-workflow-meta",{id:d,key:p,value:k},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),m()}function Wt(p){let $=p.metadata||{};return l` ${((F,ge)=>{let nt=it[F],Me=typeof $[F]=="string"?$[F]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${F}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${F}
          data-edit=${`wfmeta-${F}`}
          @change=${pt=>Rt(F,pt)}
        >
          <option value="" ?selected=${!nt.includes(Me)}>
            ${ge}
          </option>
          ${nt.map(pt=>l`<option value=${pt} ?selected=${Me===pt}>${pt}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function jt(p){return x?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${C}
            @input=${be}
            @keydown=${$=>Ie($,u,Ce,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${u}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ce}
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
          @click=${ue}
        >
          ✎
        </button>
      </div>
    `}function It(p){let $=dt(p.created_at),k=dt(p.updated_at);return!$&&!k?l``:l`
      ${$?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${$}</span>
          </div>`:""}
      ${k?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${k}</span>
          </div>`:""}
    `}function Nt(p,$){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${We}
        >
          ${Nd.map(k=>l`<option value=${k} ?selected=${k===p}>${k}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Fe}
        >
          ${Pd.map(k=>l`<option value=${String(k)} ?selected=${k===$}>
                P${k}
              </option>`)}
        </select>
      </div>
    `}function J(p){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${v?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${w}
            >
              ✎
            </button>`}
      </div>
      ${v?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${j}
              @input=${N}
              @keydown=${$=>Ie($,ae,Y,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ae}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Y}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${p||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function b(p){let $=typeof p.notes=="string"?p.notes:"";return $.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${$}</div>
    `}function U(p){let $=Array.isArray(p.labels)?p.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${$.map(k=>l`<span class="detail-label-chip"
              >${k}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${k}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+k}
                @click=${()=>ht(k)}
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
            @input=${Je}
            @keydown=${ut}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${at}
          >
            추가
          </button>
        </span>
      </div>
    `}function f(){if(!d)return l``;let p=_||{},$=String(p.id||d),k=p.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",F=p.status||"open",ge=typeof p.priority=="number"?Math.max(0,Math.min(4,p.priority)):"",nt=p.description||"",Me={...p,metadata:{...p.metadata||{},...g}};return l`
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
            @click=${tt}
          >
            ${$}
          </button>
          ${jt(k)} ${Nt(F,ge)}
          ${It(p)} ${J(nt)}
          ${Ca(z,L,{expanded:le,draft:H,sending:oe,error:I})}
          ${b(p)} ${U(p)} ${Ae(p)}
          ${yt(p)} ${Wt(p)}
          ${Sa(p,Ve)}
          ${Re()}
          ${Na(Me,rt,Oe(),He())}
          ${Ba({expanded:_e,loading:Pe,error:re,data:me},{onToggle:P})}
          ${qa(h(),De,{total:S(),expanded:q})}
        </div>
      </div>
    `}function m(){Ee(f(),e)}return{load(p){p!==d&&(g={},y="",Q(),he(),ke()),d=p,_=null,Ue()},clear(){d=null,_=null,g={},y="",T=!1,Q(),he(),ke(),ye.close(),we.close(),Ee(l``,e)},destroy(){Ze&&(Ze(),Ze=null),vt&&(vt(),vt=null),lt&&(lt(),lt=null),document.removeEventListener("keydown",ct),ye.destroy(),K.parentNode&&K.parentNode.removeChild(K),we.destroy(),Z.parentNode&&Z.parentNode.removeChild(Z),d=null,_=null,y="",T=!1,he(),ke(),Ee(l``,e)}}}var Fd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function za(e,t){return Kn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function qd(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Ha(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(E){let I=r.get();if(I)try{let H=await n("display-policy-set",{expected_revision:I.revision,policy:E(I)});i(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:E(H.policy)}),i(H)),H&&H.conflict&&X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(E){E&&E.policy&&typeof E.policy=="object"&&r.set(E.policy)}function d(E){let I=r.get();if(!I)return;let H=za(E,I)!=="shown";c(oe=>qd(E,oe,H))}function _(){let E=a.trim();E.length!==0&&(a="",c(I=>I.hidden_prefixes.includes(E)?{hidden_prefixes:I.hidden_prefixes}:{hidden_prefixes:[...I.hidden_prefixes,E]}),C())}function g(E){c(I=>({hidden_prefixes:I.hidden_prefixes.filter(H=>H!==E)}))}function y(E){let I=r.get();if(!I)return;let H=I.chips[E]===!1;c(()=>({chips:{[E]:H}}))}function T(E){let I=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${I.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${I.map(H=>{let oe=za(H,E);return l`<button
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
    `}function x(E){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${E.hidden_prefixes.map(I=>l`<span class="display-settings__prefix">
                ${I}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${I} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>g(I)}
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
            @input=${I=>{a=String(I.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function v(E){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Fd.map(([I,H])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${I}
                  .checked=${E.chips[I]!==!1}
                  @change=${()=>y(I)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function C(){let E=r.get();Ee(l`
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
            ${E?l`${T(E)} ${x(E)}
                ${v(E)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let j=!1,G=()=>{j=!1};o.addEventListener("close",G),o.addEventListener("cancel",G);let Q=null;r.subscribe&&(Q=r.subscribe(()=>{j&&C()}));function z(){j||(a="",j=!0,C(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:z,close:R,destroy(){j=!1,o.removeEventListener("close",G),o.removeEventListener("cancel",G),Q&&(Q(),Q=null),o.remove()}}}function Wa(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,_,g="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let y=typeof g=="string"?g.trim():"";if(s&&(y.length>0?(s.textContent=y,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function ja(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ga(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Bd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ya=160;function Ud(e){return e.length>Ya?`${e.slice(0,Ya)}\u2026`:e}function Cn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let c=null,i=!1;function d(){return r&&r.get()||{revision:0,exec_defaults:{}}}function _(){let h=d();return typeof h.revision=="number"?h.revision:0}function g(){let h=d().exec_defaults;return h&&typeof h=="object"?h:{}}function y(){let h=n?n.get():null;return!h||typeof h.revision!="number"?null:{revision:h.revision,presets:Array.isArray(h.presets)?h.presets:[]}}function T(h){n&&h&&typeof h.revision=="number"&&Array.isArray(h.presets)&&n.set({revision:h.revision,presets:h.presets})}function x(h){h&&h.queue&&r&&r.set(h.queue)}async function v(h,S){if(!s)return;let q={key:h,value:S||null};try{let W=await s("worker-queue-set-exec-default",{...q,expected_revision:_()});x(W),W&&W.conflict&&(W=await s("worker-queue-set-exec-default",{...q,expected_revision:_()}),x(W)),W&&W.conflict&&X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{X("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function C(){return d().runner_catalog??null}function j(h){let{key:S}=h;return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${Tn(S)}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${S}`}
        data-key=${S}
        ?disabled=${h.disabled}
        @change=${q=>{v(S,q.target.value)}}
      >
        ${Wr(h.groups,h.selected,An[S]||"(\uAE30\uBCF8)")}
      </select>
      ${h.runner?l`<span class="exec-defaults__runner" data-runner-for=${S}
            >${h.runner}</span
          >`:""}
    </div>`}function G(h){c={id:h.id,name:h.name,settings:{...h.settings||{}}},i=!1,re()}function Q(){c={id:null,name:"",settings:{}},i=!1,re()}function z(h){let S=h&&h.settings&&typeof h.settings=="object"?h.settings:{},q=W=>typeof S[W]=="string"?S[W]:"";return cr({selectedOf:q,effectiveOf:q,runner_catalog:C()}).some(W=>W.groups.some(ee=>ee.options.some(se=>se.value===W.selected&&se.label.endsWith("(\uBE44\uD638\uD658)"))))}function R(h){let S=h&&h.settings&&typeof h.settings=="object"?h.settings:{},q=jr.filter(se=>typeof S[se]=="string").length,ee=["orchestration_model","spec_review_model","plan_review_model","impl_review_model","impl_model"].filter(se=>typeof S[se]=="string").map(se=>`${ys[se]?.title||se}: ${S[se]}`);return{count:`${q}/10 \uC9C0\uC815`,choices:ee.length>0?ee.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function E(h){if(!s||!window.confirm(`\u201C${h.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let S=y();if(S)try{let q=await s("exec-preset-delete",{expected_revision:S.revision,id:h.id});T(q),q&&q.conflict&&X("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function I(h=!1){if(!s||!c)return;let S=y();if(!S)return;let q=h||c.id===null,W={expected_revision:S.revision,...q?{}:{id:c.id},name:c.name,settings:{...c.settings}};try{let ee=await s(q?"exec-preset-create":"exec-preset-update",W);if(T(ee),ee&&ee.conflict){i=!0,re();return}if(ee&&ee.applied){c=null,i=!1,re();return}X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{X("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function H(h){return l`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${Tn(h.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${h.key}
        ?disabled=${h.disabled}
        @change=${S=>{if(!c)return;let q=S.target.value;q?c.settings[h.key]=q:delete c.settings[h.key],i=!1,re()}}
      >
        ${Wr(h.groups,h.selected,An[h.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function oe(){if(!c)return"";let h=ee=>typeof c?.settings[ee]=="string"?c.settings[ee]:"",S=cr({selectedOf:h,effectiveOf:h,runner_catalog:C()}),q=y(),W=c.id!==null&&q!==null&&!q.presets.some(ee=>ee.id===c?.id);return l`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${c.name}
          data-preset-name
          @input=${ee=>{c&&(c.name=ee.target.value,i=!1)}}
        />
      </label>
      ${i?l`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${W?l`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${S.map(H)}
      <div class="exec-preset-editor__actions">
        ${W?l`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{I(!0)}}
            >
              새 프리셋으로 저장
            </button>`:l`<button
              type="button"
              data-preset-save
              @click=${()=>{I(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{c=null,i=!1,re()}}
        >
          취소
        </button>
      </div>
    </div>`}function pe(){let h=y();return l`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${Q}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${h===null?l`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:h.presets.length===0?l`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:h.presets.map(S=>{let q=R(S);return l`<article
                class="exec-preset-card"
                data-preset-id=${S.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${S.name}</strong>
                  <span>${q.count}</span>
                  ${z(S)?l`<span data-preset-incompatible>비호환</span>`:""}
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
    </section>`}function le(){let h=d().workspace_info;return h&&typeof h=="object"?h:{}}function he(h,S){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${h}"
      >${S}</span
    >`}function Se(h){let S=h?Ga(h.cmd):"",q=h?ja(h.timeout_ms):"",W=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${S?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${he("config","config")}
            ${q?l`<span class="exec-defaults__vd-meta"
                  >timeout ${q}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function je(h){let S=h?Ga(h.cmd):"",q=h?ja(h.timeout_ms):"",W=q?`timeout ${q} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ee=o&&o()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${S?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${S}</span>
            ${he("config","config")}
            ${h.detached===!0?he("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ee}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ze(h){if(!h||typeof h!="object")return"";let S=Bd[String(h.outcome)];if(!S)return"";let q=h.outcome==="failed"&&h.reason?`${S.label} \xB7 ${h.reason}`:S.label,W=[dt(h.at),typeof h.bead_id=="string"?h.bead_id:"",typeof h.base_sha=="string"?h.base_sha.slice(0,7):""].filter(De=>De.length>0).join(" \xB7 "),ee=typeof h.detail=="string"&&h.detail.length>0?Ud(h.detail):"",se=typeof h.log_path=="string"&&h.log_path.length>0?h.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${he(S.modifier,q)}
        ${W?l`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
      ${ee?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ee}</code>
          </div>`:""}
      ${se?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${se}</code>
          </div>`:""}
    </div>`}let Te=!1,de=!1,L=!1,K=null;async function ye(){if(s){de=!0,L=!1,re();try{let h=await Promise.resolve(s("get-worker-system-prompt",{}));!h||typeof h!="object"||Array.isArray(h)?L=!0:K=h}catch{L=!0}finally{de=!1,re()}}}function Z(){if(Te=!Te,Te&&!K){ye();return}re()}function we(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${Te?"true":"false"}
          @click=${Z}
        >
          ${Te?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${Te?_e():""}
    </section>`}function _e(){let h=yr({loading:de,error:L});if(h)return h;if(!K)return"";let S=Array.isArray(K.variants)?K.variants:[];return l`<div class="exec-defaults__sp-body">
      ${K.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${K.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${S.map(q=>l`<div class="exec-defaults__sp-variant" data-variant=${q.key}>
            <div class="exec-defaults__sp-cond">${q.condition}</div>
            ${Ht(q.label,q.system_prompt)}
          </div>`)}
    </div>`}function Pe(h){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${Se(h.verify_cmd)} ${je(h.deploy_cmd)}
      ${ze(h.last_deploy)}
    </section>`}function re(){let h=g(),S=W=>typeof h[W]=="string"?h[W]:"",q=cr({selectedOf:S,effectiveOf:S,runner_catalog:C()});Ee(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${P}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${pe()}
            <section class="exec-defaults__workspace">
              <h3>현재 워크스페이스 기본값</h3>
              <p class="exec-defaults__hint">
                현재 워크스페이스에만 적용됩니다. bead metadata가 우선하며,
                '(기본: …)'은 이 전역값도 미설정일 때 실제 적용되는
                하드코딩·CLI·워크플로 기본입니다.
              </p>
              ${q.map(W=>j(W))}
            </section>
            ${Pe(le())}
            ${we()}
          </div>
        </div>
      `,a)}let me=!1,M=()=>{me=!1},O=h=>{h.target===h.currentTarget&&P()};a.addEventListener("close",M),a.addEventListener("cancel",M),a.addEventListener("click",O);let ne=null;r&&r.subscribe&&(ne=r.subscribe(()=>{me&&re()}));let ke=null;n&&n.subscribe&&(ke=n.subscribe(()=>{me&&re()}));function $e(){me||(me=!0,re(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function P(){me&&(me=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:$e,close:P,destroy(){me=!1,a.removeEventListener("close",M),a.removeEventListener("cancel",M),a.removeEventListener("click",O),ne&&(ne(),ne=null),ke&&(ke(),ke=null),a.remove()}}}function kr(e){let t=wt(e.created_at),r=wt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${dt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function ws(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?wt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,g=l`<span class="worker-mini__title">${e.title}</span>`,y=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",T=r.map(E=>E===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${E}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${E}</span
        >`),x=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",v=n?l`<span class="worker-usage" title=${vr(e.usage)}
        >${n}</span
      >`:"",C=s?l`<span class="merge-step"
        >${s.label}<span class="merge-step__n"
          >${s.index}/${s.total}</span
        ></span
      >`:"",j=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",G=e.cancel_action?l`<button
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
      </button>`:"",z=e.revise_action?l`<button
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
        </button>`:"",R=!!(n||s||e.merge_action||e.cancel_action||e.discard_action||e.revise_action);return l`<div
    class="worker-mini${o?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${s?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${s?`--progress: ${s.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${a?l`<div class="worker-mini__row1">${d}${_}${g}</div>
          <div class="worker-mini__row2">
            ${v}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${dt(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${T}${C}
            <span class="worker-mini__actions"
              >${j}${G}${Q}</span
            >
            ${kr(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${_}${y}${T}${x}
            </div>
            <div class="worker-mini__body">${g}</div>
            ${R?l`<div class="worker-mini__foot">
                  ${v}${C}
                  <span class="worker-mini__actions"
                    >${j}${G}${Q}${z}</span
                  >
                </div>`:""}
            ${kr(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${_}${g}${y}${T}${x}${v}${C}${j}${G}${Q}
            </div>
            ${kr(e)}`}
  </div>`}function zd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
  </div>`}function Mt(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?zd(n):ws(n))}
          </div>`}
  </section>`}var Va=160;function ks(e){return e.length>Va?`${e.slice(0,Va)}\u2026`:e}function Hd(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${ks(e.command)}</code>`:""}
  </div>`}function Wd(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function jd(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function $s(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Gd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
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
          남은 작업: <code>${ks(e.detail)}</code>
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
  </div>`}function Ka(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
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
          ${Hd(e.failure.cause_detail)}
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
                <code>${ks(r.detail)}</code>
              </div>`:""}
          ${jd(r.log_path)} ${Wd(r.output_tail)}
        </div>`)}
    ${Gd(e.shipFailure)}
  </div>`}function Yd(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?$s(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=At(e.usage),c=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return l`<div
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
  </div>`}function xs(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Yd(s,t,r))}
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
  </svg>`}function Ss(){return Zt(Ft`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function As(){return Zt(Ft`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ts(){return Zt(Ft`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Za(){return Zt(Ft`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Xa(){return Zt(Ft`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Qa(){return Zt(Ft`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ja(){return Zt(Ft`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function ei(){return Zt(Ft`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var Gr=1,Vd=6e4,Kd={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Zd=new Set(["auto_merge","merged","merge","done"]),ti={running:3,paused:2,failed:1};function Xd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Qd(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let g=t.get(a.bead_id),y=typeof g=="number"&&g>0&&typeof a.finished_at=="number"&&g>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!y&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let g=ti[d.run_state],y=ti[c];if(g>y||g===y&&(d.started_at??0)>(i??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Ot(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function ri(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function xt(e){return e&&typeof e=="object"?e:{}}function Es(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let v of s)v&&typeof v.root_dir=="string"&&a.set(v.root_dir,v);let c=[],i=[],d=[],_=[],g=[],y=new Map;for(let v of n){if(!v||typeof v.root_dir!="string")continue;let C=v.root_dir,j=v.name||C,G=a.get(C),Q=G&&typeof G.revision=="number"?G.revision:typeof v.revision=="number"?v.revision:0,z=xt(v.attempts),R=xt(v.bead_titles),E=xt(v.pr_observations),I=xt(v.admission),H=xt(v.revise_parked),oe=xt(v.merge_queue_state),pe=xt(v.cleanup_failed),le=Array.isArray(v.merge_queue)?v.merge_queue:[],he=new Set(le.filter(L=>L&&typeof L.bead_id=="string").map(L=>L.bead_id)),Se=Array.isArray(v.queue)?v.queue:[],je=Array.isArray(v.done)?v.done:[],ze=new Map;for(let L of je)L&&typeof L.bead_id=="string"&&typeof L.added_at=="number"&&ze.set(L.bead_id,L.added_at);let Te=L=>({id:L,title:R[L]||L,root_dir:C,workspace_name:j,expected_revision:Q,draggable:!1}),de=new Set;for(let[L,K]of Qd(z,ze))de.add(L),i.push({...Te(L),lane:"running",attempt_id:K.attempt_id,run_state:K.run_state,can_pause:K.can_pause,can_resume:K.can_resume,started_at:K.started_at,last_event_at:K.last_event_at,model:K.model,usage:K.usage,badges:K.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:K.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:K.run_state==="failed"});for(let L of Array.isArray(v.pr_wait)?v.pr_wait:[]){let K=L&&L.bead_id;if(typeof K!="string"||de.has(K))continue;de.add(K);let ye=xt(E[K]),Z=xt(ye.pr),we=ye.gate?xt(ye.gate):null,_e=he.has(K),Pe=oe.active===K,re=L.external===!0,me=pe[K]||null,M=!!we&&we.base_badge==="\uCDA9\uB3CC",O=!!me&&!!we&&we.tier==="merged",ne=re&&!!we&&we.tier==="merged";d.push({...Te(K),lane:"pr_wait",pr_number:typeof Z.number=="number"?Z.number:null,pr_url:typeof Z.url=="string"?Z.url:void 0,external:re,usage:Ot(z,K),badges:me?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!me,reason:me?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!_e,merge_enabled:we?.enabled===!0||M||O||ne,merge_label:ne?"\uC815\uB9AC":M&&!O?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ne?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":O?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":we?.enabled===!0?`\uBA38\uC9C0 (${we.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${we?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:_e,cancel_enabled:!Pe,discard_action:!re&&!me&&!(we&&we.tier==="merged"),discard_enabled:!Pe&&!_e,discard_title:_e?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let L=0;L<Se.length;L++){let K=Se[L],ye=K&&K.bead_id;if(typeof ye!="string"||de.has(ye))continue;de.add(ye);let Z=H[ye],we={...Te(ye),lane:"queue",reason:ri(I,ye),queue_position:L+1,queue_index:L,queue_length:Se.length,badges:Z?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Z,revise_action:!!Z,revise_enabled:!!Z,revise_title:Z?Z.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Z.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(we);let _e=y.get(C);_e?_e.push(we):y.set(C,[we])}for(let L of Array.isArray(v.runnable)?v.runnable:[]){let K=L&&L.bead_id;typeof K!="string"||de.has(K)||(de.add(K),c.push({...Te(K),title:L.title||R[K]||K,lane:"runnable",draggable:!0,reason:ri(I,K),created_at:L.created_at??void 0,updated_at:L.updated_at??void 0,labels:Array.isArray(L.labels)?L.labels:[],workflow:L.route?{route:L.route,chips:{route:L.route}}:null,place_index:Se.length}))}for(let L of je){let K=L&&L.bead_id;if(typeof K!="string"||de.has(K)||(de.add(K),o!==void 0&&typeof L.added_at=="number"&&L.added_at<o))continue;let ye=Xd(z,K);g.push({...Te(K),lane:"done",done:!0,usage:Ot(z,K),done_at:typeof L.added_at=="number"?L.added_at:void 0,done_kind:ye&&typeof ye.done_kind=="string"?ye.done_kind:null})}}i.sort((v,C)=>(C.last_event_at??0)-(v.last_event_at??0)),g.sort((v,C)=>(C.done_at??0)-(v.done_at??0));let T=s.length>0?s:n.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,exec_defaults:v&&v.exec_defaults,runner_catalog:v&&v.runner_catalog})),x=[];for(let v of T)!v||typeof v.root_dir!="string"||x.push({root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:typeof v.slots=="number"&&v.slots>=Gr?v.slots:Gr,revision:typeof v.revision=="number"?v.revision:0,exec_defaults:xt(v.exec_defaults),runner_catalog:xt(v.runner_catalog),items:y.get(v.root_dir)||[]});return{runnable:c,queue:_,queue_groups:x,running:i,pr_wait:d,done:g,automation:{total:x.length,both_on:x.filter(v=>v.auto_advance&&v.auto_merge).length}}}function Jd(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Vd;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${dt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${wt(e,t)}</span
        >`}</span
  >`}function Yr(e){return l`<div class="mon-c__title">${e.title}</div>`}function Vr(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Rn(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Cs(e){let t=At(e.usage);return t?l`<span class="mon-c__usage" title=${vr(e.usage)}
        >${t}</span
      >`:""}function Rs(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function eu(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${As()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ss()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Ts()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Za()}
        </button>`:""}
  </span>`}function tu(e,t){let r=typeof e.started_at=="number"?$s(t-e.started_at):"";return l`${Yr(e)}
    <div class="mon-c__meta">
      ${Rs(e)}${Jd(e.last_event_at,t)}${Vr(e)}${Rn(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Cs(e)}${eu(e)}
    </div>`}function ru(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=wt(e.updated_at);return l`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Vr(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${cn(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${Rn(e)}
      ${o?l`<span title=${`\uC218\uC815 ${dt(e.updated_at)}`}
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
    </div>`}function nu(e){return l`${Yr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Vr(e)}
      ${Rs(e)}
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
        </div>`:""}`}function su(e){let t=!!(At(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${Yr(e)}
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
      ${Rs(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${Cs(e)}
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
        </div>`:""}`}function ou(e,t){let r=e.done_kind||"",n=r?Kd[r]||r:"",s=wt(e.done_at,t);return l`${Yr(e)}
    <div class="mon-c__meta">
      ${Vr(e)}${Rn(e)}
      ${n?l`<span
            class="mon-live__kind${Zd.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Cs(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${dt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function ni(e,t){return e.lane==="running"?tu(e,t):e.lane==="runnable"?ru(e):e.lane==="queue"?nu(e):e.lane==="pr_wait"?su(e):ou(e,t)}function si(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?As():Ss()}
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
  </header>`}function oi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Dt.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ts():ei()}
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
        ${Dt.map(o=>l`<option
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
  </div>`}function ai(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ii(e){let t={};for(let a of Bt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of Bt){let _=c[d];typeof _=="number"&&Number.isFinite(_)&&(t[d]+=_,r=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?At(t):null}var ci="bdui.monitor.done-range";function au(){try{let e=window.localStorage.getItem(ci);return qt(e)?e:kt}catch{return kt}}function iu(e){try{window.localStorage.setItem(ci,e)}catch{}}var di="tab:monitor:pipeline",lu=1e3,cu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function li(e,t){let r=e.lane==="runnable"||e.lane==="queue";return l`<div
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
  </div>`}function ui(e,t){let r=Ye("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,c=t.getWorkspacePath,i=t.switchWorkspace,d=t.now||(()=>Date.now()),_=t.confirm||(P=>typeof globalThis.confirm!="function"||globalThis.confirm(P)),g=au();function y(){let P=Dt.find(h=>h.value===g);return P?P.label:""}let T=document.createElement("div");T.className="mon",e.appendChild(T);let x=Es(null,null),v=null,C=new Map,j=new Set;function G(P){return x.queue_groups.find(h=>h.root_dir===P)||null}let z=Cn(e,{queueStore:{get(){if(!v)return{revision:0,exec_defaults:{}};let P=C.get(v);if(P)return P;let h=G(v),S=s&&s.get?s.get():null,q=(Array.isArray(S)?S:[]).find(W=>W&&W.root_dir===v);return{revision:h?h.revision:0,exec_defaults:h?h.exec_defaults:{},runner_catalog:h?h.runner_catalog:null,workspace_info:q?q.workspace_info:void 0}},set(P){v&&C.set(v,P);for(let h of Array.from(j))h()},subscribe(P){return j.add(P),()=>j.delete(P)}},presetStore:a,transport:o?(P,h)=>o(P,P==="worker-queue-set-exec-default"||P==="get-worker-system-prompt"?{...h||{},root_dir:v}:h):void 0,getWorkspacePath:()=>v||void 0}),R=null,E=null;async function I(P,h,S,q){if(!o||!S)return null;let W=await o(P,{...h,root_dir:S,expected_revision:q});if(W&&W.conflict){let ee=W.queue&&typeof W.queue.revision=="number"?W.queue.revision:q;W=await o(P,{...h,root_dir:S,expected_revision:ee})}return W&&W.queue&&S&&C.set(S,W.queue),W}async function H(P,h,S){return!o||!S?null:await o(P,{...h,root_dir:S})}async function oe(P){if(!o||!P&&!_("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let h=await o("monitor-auto-toggle",{on:P}),S=h&&Array.isArray(h.failed)?h.failed:[];S.length>0&&X(`\uC790\uB3D9\uD654 ${P?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${S.map(q=>q.root_dir).join(", ")}`,"error",3200)}async function pe(){let P=new Map;for(let h of x.pr_wait)P.has(h.root_dir)||P.set(h.root_dir,h.expected_revision);for(let[h,S]of P)await I("worker-merge-queue-add-all",{},h,S)}let le=null,he=!1,Se=null;function je(){Se!==null&&clearTimeout(Se),Se=setTimeout(()=>{Se=null,he=!1},0)}function ze(P){let h=P.target;return typeof h?.closest=="function"?h.closest(".mon-group"):null}function Te(P){let h=ze(P);return!h||!le?null:(h.getAttribute("data-root-dir")||"")===le.root_dir?h:null}function de(){for(let P of Array.from(T.querySelectorAll(".mon-group--drag-over")))P.classList.remove("mon-group--drag-over")}function L(P){let h=P.target,S=typeof h?.closest=="function"?h.closest('.mon-card[draggable="true"]'):null;if(S){le={bead_id:S.getAttribute("data-issue-id")||"",lane:S.getAttribute("data-lane")||"",root_dir:S.getAttribute("data-root-dir")||"",revision:Number(S.getAttribute("data-revision")||0)||0,queue_index:Number(S.getAttribute("data-queue-index")),queue_length:Number(S.getAttribute("data-queue-length")),place_index:Number(S.getAttribute("data-place-index"))},he=!0;try{P.dataTransfer?.setData("text/plain",le.bead_id),P.dataTransfer&&(P.dataTransfer.effectAllowed="move")}catch{}}}function K(P){let h=Te(P);h&&(P.preventDefault(),P.dataTransfer&&(P.dataTransfer.dropEffect="move"),h.classList.add("mon-group--drag-over"))}function ye(P){ze(P)?.classList.remove("mon-group--drag-over")}function Z(){le=null,de(),je()}function we(P){let h=Te(P),S=le;if(le=null,de(),!h||!S||!S.bead_id)return;P.preventDefault();let q=P.target,W=typeof q?.closest=="function"?q.closest('.mon-card[data-lane="queue"]'):null,ee=W&&h.contains(W)?Number(W.getAttribute("data-queue-index")):NaN;if(S.lane==="runnable"){let Oe=Number.isFinite(ee)?ee:S.place_index;if(!Number.isFinite(Oe))return;I("worker-queue-place",{bead_id:S.bead_id,index:Oe},S.root_dir,S.revision);return}if(S.lane!=="queue"||W&&W.getAttribute("data-issue-id")===S.bead_id)return;let se=S.queue_index,De=Number.isFinite(ee)?se>ee?ee:ee-1:S.queue_length-1;!Number.isFinite(De)||De<0||De===se||I("worker-queue-reorder",{bead_id:S.bead_id,to_index:De},S.root_dir,S.revision)}function _e(P){let h={runnable:x.runnable,queue:x.queue,running:x.running,pr_wait:x.pr_wait,done:x.done};return l`${oi({automation:x.automation,counts:{running:x.running.length,queue:x.queue.length,pr_wait:x.pr_wait.length},done_range:g,token_total:ii(x.done),token_tooltip:ai(y())})}
      <div class="worker-lanes mon-lanes">
        ${cu.map(S=>{let q=h[S.lane],W=S.lane==="queue"?x.queue_groups.length>0?l`${x.queue_groups.map(ee=>l`<div
                        class="mon-group"
                        data-root-dir=${ee.root_dir}
                      >
                        ${si(ee)}
                        <div class="mon-group__list">
                          ${ee.items.map(se=>li(se,P))}
                        </div>
                      </div>`)}`:void 0:q.length>0?l`${q.map(ee=>li(ee,P))}`:void 0;return Mt({id:`monitor-${S.lane}`,lane:S.pane,title:S.lane==="done"?`\uC644\uB8CC\xB7${y()}`:S.title,items:q,empty:S.empty,body:W,live:S.lane==="running"&&q.length>0,header_control:S.lane==="pr_wait"&&q.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Pe(){let P=s&&s.get?s.get():null,h=s&&s.getWorkspacesState?s.getWorkspacesState():[],S=d();x=Es(P,h,{done_since:pr(g,S)}),Ee(_e(S),T)}function re(P,h){let S=c?c():void 0;if(!h||!S||h===S||!i){n(P);return}i(h).then(()=>{n(P)}).catch(q=>{r("workspace switch for %s failed: %o",h,q)})}function me(P){return{root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0}}function M(P,h){let{root_dir:S,revision:q}=me(P),W=P.getAttribute("data-issue-id")||"",ee=P.getAttribute("data-attempt-id")||"",se=h.classList;if(se.contains("worker-card__place")){I("worker-queue-place",{bead_id:W,index:Number(P.getAttribute("data-place-index")||0)||0},S,q);return}if(se.contains("mon-op--up")||se.contains("mon-op--down")){let De=Number(P.getAttribute("data-queue-index")||0)||0,Oe=se.contains("mon-op--up")?De-1:De+1;if(Oe<0)return;I("worker-queue-reorder",{bead_id:W,to_index:Oe},S,q);return}if(se.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:W},S,q);return}if(se.contains("mon-op--pause")){H("worker-attempt-pause",{attempt_id:ee},S);return}if(se.contains("mon-op--stop")){H("worker-attempt-stop",{attempt_id:ee},S);return}if(se.contains("mon-op--resume")){I("worker-attempt-resume",{attempt_id:ee},S,q);return}if(se.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:ee},S,q);return}if(se.contains("worker-mini__merge")){I("worker-merge-queue-add",{bead_id:W},S,q);return}if(se.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:W},S,q);return}if(se.contains("worker-mini__discard")){if(!_(`${W}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;I("worker-pr-discard",{bead_id:W},S,q);return}if(se.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:W},S,q);return}se.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:W},S,q)}function O(P){let h=he;he=!1;let S=P.target;if(!S||typeof S.closest!="function"||S.closest("dialog")||S.closest("a"))return;let q=S.closest(".mon-auto-all");if(q){P.preventDefault(),oe(q.getAttribute("data-on")==="true");return}if(S.closest(".mon-merge-all")){P.preventDefault(),pe();return}let ee=S.closest(".mon-ctl--advance");if(ee){P.preventDefault();let{root_dir:et,revision:st}=me(ee);I("worker-queue-toggle",{on:ee.getAttribute("data-on")==="true"},et,st);return}let se=S.closest(".mon-ctl--merge-auto");if(se){P.preventDefault();let{root_dir:et,revision:st}=me(se);I("worker-merge-auto-toggle",{on:se.getAttribute("data-on")==="true"},et,st);return}let De=S.closest(".mon-ctl--exec");if(De){P.preventDefault(),v=De.getAttribute("data-root-dir")||null,C.delete(v||""),z.open();return}let Oe=S.closest(".mon-card");if(!Oe)return;let He=S.closest("button");if(He){P.preventDefault(),M(Oe,He);return}let Ke=Oe.getAttribute("data-issue-id");Ke&&!h&&(P.preventDefault(),re(Ke,Oe.getAttribute("data-root-dir")||""))}function ne(P){let h=P.target;if(!h||typeof h.closest!="function")return;let S=h.closest(".mon-done-range");if(S){g=qt(S.value)?S.value:kt,iu(g),Pe();return}let q=h.closest(".mon-slots__input");if(!q)return;let{root_dir:W,revision:ee}=me(q),se=Number(q.value);if(!Number.isFinite(se))return;let De=Math.max(Gr,Math.floor(se));I("worker-queue-set-slots",{slots:De},W,ee)}e.addEventListener("click",O),e.addEventListener("change",ne),e.addEventListener("dragstart",L),e.addEventListener("dragover",K),e.addEventListener("dragleave",ye),e.addEventListener("drop",we),e.addEventListener("dragend",Z),s&&typeof s.subscribe=="function"&&(R=s.subscribe(()=>{try{C.clear(),Pe();for(let P of Array.from(j))P()}catch{}}));function ke(){E!==null&&(clearInterval(E),E=null)}function $e(){Se!==null&&(clearTimeout(Se),Se=null)}return{load(){r("load"),Pe(),E===null&&(E=setInterval(()=>{try{Pe()}catch{}},lu))},pause(){ke()},clear(){ke(),$e(),R&&(R(),R=null),e.removeEventListener("click",O),e.removeEventListener("change",ne),e.removeEventListener("dragstart",L),e.removeEventListener("dragover",K),e.removeEventListener("dragleave",ye),e.removeEventListener("drop",we),e.removeEventListener("dragend",Z),z.destroy(),j.clear(),e.replaceChildren()}}}function pi(e,t,r){let n=Ye("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
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
    `}function c(){Ee(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),Ee(l``,e)}}}var fi=["bug","feature","task","epic","chore"];function _i(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var mi=["Critical","High","Medium","Low","Backlog"];function gi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),g=r.querySelector("#btn-create"),y=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let E of fi){let I=document.createElement("option");I.value=E,I.textContent=_i(E),o.appendChild(I)}a.replaceChildren();for(let E=0;E<=4;E+=1){let I=document.createElement("option");I.value=String(E);let H=mi[E]||"Medium";I.textContent=`${E} \u2013 ${H}`,a.appendChild(I)}}T();function x(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function v(R){s.disabled=R,o.disabled=R,a.disabled=R,c.disabled=R,i.disabled=R,_.disabled=R,g.disabled=R,g.textContent=R?"Creating\u2026":"Create"}function C(){d.textContent=""}function j(R){d.textContent=R}function G(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let E=window.localStorage.getItem("beads-ui.new.priority");E&&/^\d$/.test(E)?a.value=E:a.value="2"}catch{o.value="",a.value="2"}}function Q(){let R=o.value||"",E=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),E.length>0&&window.localStorage.setItem("beads-ui.new.priority",E)}async function z(){C();let R=String(s.value||"").trim();if(R.length===0){j("Title is required"),s.focus();return}let E=Number(a.value||"2");if(!(E>=0&&E<=4)){j("Priority must be 0..4"),a.focus();return}let I=String(o.value||""),H=String(i.value||""),oe={title:R};I.length>0&&(oe.type=I),String(E).length>0&&(oe.priority=E),H.length>0&&(oe.description=H),v(!0);try{await t("create-issue",oe)}catch{v(!1),j("Failed to create issue");return}Q(),v(!1),x()}return r.addEventListener("cancel",R=>{R.preventDefault(),x()}),y.addEventListener("click",()=>x()),_.addEventListener("click",()=>x()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),z())}),n.addEventListener("submit",R=>{R.preventDefault(),z()}),{open(){n.reset(),C(),G();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){x()}}}var du=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function hi(e){return String(e).padStart(2,"0")}function uu(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function pu(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${hi(n.getHours())}:${hi(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${du[n.getMonth()]} ${n.getDate()} ${o}`;return`${uu(r,t)} \xB7 ${c}`}function fu(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function bi(e){let t=!1,r=null;function n(){Ee(l``,e),e.hidden=!0}async function s(){try{let o=await fetch("/api/claude-usage");if(!o.ok)throw new Error(`usage request failed: ${o.status}`);let a=await o.json();if(t)return;if(!a||a.available!==!0||!Array.isArray(a.windows)){n();return}let c=typeof a.ageSeconds=="number"&&a.ageSeconds>600,i=c?`${Math.floor(a.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",d=Date.now();Ee(l`<div
          class="usage-meter${c?" usage-meter--stale":""}"
          aria-label="Claude Code usage"
        >
          ${a.windows.map(_=>{let g=typeof _.pct=="number"&&Number.isFinite(_.pct)?_.pct:0,y=Math.min(100,Math.max(0,g)),x=`resets ${pu(_.resetsAt,d)}${c?` \xB7 ${i}`:""}`;return l`<span
              class="usage-meter__window ${fu(g)}"
              style=${`--progress: ${y}%`}
              title=${x}
            >
              <span class="usage-meter__label">${_.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${g}%</span>
            </span>`})}
        </div>`,e),e.hidden=!1}catch{t||n()}}return n(),s(),r=setInterval(()=>{s()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),n()}}}var _u="tab:worker:ready",mu="tab:worker:blocked",gu="tab:worker:in-progress",In=1;function Ds(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var ki="beads-ui.worker.candidate-filter",Is={show_blocked:!1,spec:"all"};function hu(){try{let e=window.localStorage.getItem(ki);if(!e)return{...Is};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Is};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Is}}}function bu(e){try{window.localStorage.setItem(ki,JSON.stringify(e))}catch{}}function vu(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=r(c),d=n(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var yu=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],$i="bdui.worker.candidate_sort",wu=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Ln="spec";function ku(){try{let e=window.localStorage.getItem($i);return e==="board"||e==="created"||e==="spec"?e:Ln}catch{return Ln}}function $u(e){try{window.localStorage.setItem($i,e)}catch{}}var xi="bdui.worker.done-range";function xu(){try{let e=window.localStorage.getItem(xi);return qt(e)?e:kt}catch{return kt}}function Su(e){try{window.localStorage.setItem(xi,e)}catch{}}var Au="(max-width: 640px)",Si="beads-ui.worker.lane-collapsed",Kr={queue:!0,done:!0};function Tu(){try{let e=window.localStorage.getItem(Si);if(!e)return{...Kr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Kr}:{queue:typeof t.queue=="boolean"?t.queue:Kr.queue,done:typeof t.done=="boolean"?t.done:Kr.done}}catch{return{...Kr}}}function Eu(e){try{window.localStorage.setItem(Si,JSON.stringify(e))}catch{}}function vi(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Cu(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(nr):(n.sort(rn(r)),t==="board"?n:[...n.filter(Ds),...n.filter(s=>!Ds(s))])}function Ru(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Iu(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Lu(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Du=["closed_unmerged","undecidable"],Ou=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Mu(e,t){for(let r of Ou)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Ls=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function Nu(e){if(typeof e!="string"||e.length===0)return null;let t=Ls.length,r=Ls.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Ls[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function yi(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function wi(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Pu(e,t,r,n,s=null,o=null,a=null,c=!1,i=null,d=!0,_=null,g=null){let y=!!i&&i.position>0,T=!!i&&i.active===!0,x=i&&i.failure||null,v=r[e]||null,C=v&&v.gate?v.gate:null,j=v&&v.pr?v.pr:null,G=[];c&&G.push("\uC138\uC158");let Q=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,z=Mu(c&&C&&C.tier==="closed_unmerged"?"\uB2EB\uD798":C&&C.gate_badge||"",Q?null:o&&o.activity||null);Q&&G.push(Q),z.label&&G.push(z.label),C&&C.base_badge&&C.base_badge!==C.gate_badge&&G.push(C.base_badge),g&&G.push(g),n&&G.push("\uC815\uB9AC \uC2E4\uD328"),y&&!T&&G.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),x&&G.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${yi(x)}`),_&&G.push(`\uC790\uB3D9 \uC81C\uC678: ${yi(_)}`);let R=!!C&&C.base_badge==="\uCDA9\uB3CC",E=!!C&&C.enabled===!0,I=Nu(o&&o.merge_progress?o.merge_progress.step:null),H=!!n&&!!C&&C.tier==="merged",oe=c&&!!C&&C.tier==="merged",pe=c&&R&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",badges:G,live_badge:a==="running"?Q:Q?null:z.live?z.label:null,usage:s,alert:!!C&&Du.includes(C.tier)||!!n||!!x,merge_action:!y,cancel_action:y,cancel_enabled:!T,cancel_title:T?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(C&&C.tier==="merged"),merge_step:I,discard_enabled:!I&&!a&&!y,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":y?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!I&&!a&&!pe&&(E||R||H||oe),merge_label:oe?"\uC815\uB9AC":R&&!I&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:I?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${I.label}`:oe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":pe?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":E?`\uBA38\uC9C0 (${C.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:C&&C.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${C&&C.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Os(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:i,getWorkspacePath:d}=t,_=n?sn(n,c):null,g=an({transport:r,uiOrderStore:c}),y=null,T=[],x=hu(),v=ku(),C=xu();function j(){let u=Dt.find(w=>w.value===C);return u?u.label:"\uC624\uB298"}let G=Tu(),Q=!1,z=new Set,R=new Set,E=[],I=document.createElement("div");I.className="worker-console";let H=document.createElement("div");H.className="worker-top";let oe=document.createElement("div");oe.className="worker-drawer-overlay",oe.hidden=!0;let pe=document.createElement("div");pe.className="worker-drawer-overlay__backdrop";let le=document.createElement("div");le.className="worker-drawer-host",oe.append(pe,le);let he=document.createElement("div");he.className="worker-lanes-host",I.append(H,oe,he),e.appendChild(I);let Se=null,je=Sn(le,{transport:r,sessionLogStore:a,onClose:()=>{Se=null,oe.hidden=!0,Re()}}),ze=Cn(I,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:d});function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:In,queue:[],pr_wait:[],done:[]}}function de(){let u=Te();return typeof u.revision=="number"?u.revision:0}function L(u){u&&u.queue&&s&&s.set(u.queue)}function K(){let u=Te().queue;return Array.isArray(u)?u.length:0}async function ye(u,w){if(!r)return;let N=await r("worker-queue-place",{bead_id:u,index:w,expected_revision:de()});L(N),N&&N.conflict&&await r("worker-queue-place",{bead_id:u,index:w,expected_revision:de()}).then(L)}async function Z(u,w){if(!r)return;let N=await r("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:de()});L(N),N&&N.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:w,expected_revision:de()}).then(L)}async function we(u){if(!r)return;let w=await r("worker-queue-remove",{bead_id:u,expected_revision:de()});L(w),w&&w.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:de()}).then(L)}async function _e(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function Pe(u){if(!r||!u)return;let w=await r("worker-attempt-pause",{attempt_id:u});w&&w.paused===!1&&w.reason&&X(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function re(u){if(!r||!u)return;let w=await r("worker-attempt-resume",{attempt_id:u,expected_revision:de()});L(w),w&&w.conflict&&(w=await r("worker-attempt-resume",{attempt_id:u,expected_revision:de()}),L(w)),w&&w.resumed===!1&&!w.conflict&&w.reason&&X(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function me(u){if(!r||!u)return;let w=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:de()});L(w),w&&w.conflict&&(w=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:de()}),L(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&X(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function M(u,w){if(!r)return null;let N=r,Y=await N(u,{...w,expected_revision:de()});return L(Y),Y&&Y.conflict&&(Y=await N(u,{...w,expected_revision:de()}),L(Y)),Y}async function O(u){if(!r||!u)return;z.add(u),Re();let w;try{w=await M("worker-merge-queue-add",{bead_id:u})}finally{z.delete(u),Re()}!w||w.conflict||w.applied||X("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ne(u){if(!r)return;let w=await M("worker-merge-auto-toggle",{on:u});!w||w.conflict||X(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function ke(u){if(!r||!u)return;let w=await M("worker-merge-queue-remove",{bead_id:u});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&X("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function $e(){await M("worker-merge-queue-remove",{all:!0})}async function P(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let N=await r("worker-pr-discard",{bead_id:u,expected_revision:de()});if(L(N),N&&N.conflict&&(N=await r("worker-pr-discard",{bead_id:u,expected_revision:de()}),L(N)),N&&N.discarded===!0){X("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}N&&N.discarded===!1&&!N.conflict&&X(`\uD3D0\uAE30 \uAC70\uBD80: ${N.reason||""}`,"error",2800)}async function h(u,w){if(!r||!w||R.has(w))return;R.add(w),Re();let N;try{N=await r(u,{bead_id:w,expected_revision:de()}),L(N),N&&N.conflict&&(N=await r(u,{bead_id:w,expected_revision:de()}),L(N))}finally{R.delete(w),Re()}if(!(!N||N.conflict)){if(N.ok){X(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}X(`\uCC98\uBD84 \uAC70\uBD80: ${N.reason||""}`,"error",3e3)}}async function S(u){if(!r)return;let w=await r("worker-queue-toggle",{on:u,expected_revision:de()});L(w),w&&w.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:de()}).then(L)}async function q(u){await S(u),await ne(u)}async function W(u){if(!r||!Number.isFinite(u))return;let w=Math.max(In,Math.floor(u)),N=await r("worker-queue-set-slots",{slots:w,expected_revision:de()});L(N),N&&N.conflict&&await r("worker-queue-set-slots",{slots:w,expected_revision:de()}).then(L)}function ee(){let u=Te(),w=_?_.selectBoardColumn(_u,"ready"):[],N=_?_.selectBoardColumn(mu,"blocked"):[],Y=_?_.selectBoardColumn(gu,"in_progress"):[],ae=new Map;for(let A of Y){let V=Iu(A);if(!V)continue;let ce=ae.get(V);ce?ce.push(A):ae.set(V,[A])}let Ie=A=>{let V=on(ae.get(A)||[]);return V?V.title||V.id:null},We=u.bead_titles||{},Fe=new Map;for(let[A,V]of Object.entries(We))typeof V=="string"&&V.length>0&&Fe.set(A,V);for(let A of[...w,...N])Fe.set(A.id,A.title||A.id);let Je=u.bead_times||{},at=new Map;for(let[A,V]of Object.entries(Je))V&&typeof V=="object"&&at.set(A,V);for(let A of[...w,...N])at.set(A.id,{created_at:A.created_at,updated_at:A.updated_at});let ut=A=>at.get(A)||{},ht=u.pr_wait||[],Ve=u.pr_observations||{},rt=u.pr_activity||{},ve=u.cleanup_failed||{},fe=Object.entries(ve).map(([A,V])=>({bead_id:A,step:V&&V.step?V.step:"",reason:V&&V.reason?V.reason:"",detail:V&&typeof V.detail=="string"?V.detail:null,output_tail:V&&typeof V.output_tail=="string"&&V.output_tail?V.output_tail:void 0,log_path:V&&typeof V.log_path=="string"&&V.log_path?V.log_path:void 0})),Ae=u.ship_failure||null,yt=Ae&&typeof Ae.reason=="string"&&Ae.reason?{bead_id:typeof Ae.bead_id=="string"?Ae.bead_id:"",reason:Ae.reason,detail:typeof Ae.detail=="string"?Ae.detail:null,pr_url:typeof Ae.pr_url=="string"?Ae.pr_url:null}:null,it=u.queue||[],Rt=new Set([...it.map(A=>A.bead_id),...ht.map(A=>A.bead_id),...u.done.map(A=>A.bead_id)]),Wt=new Set(N.map(A=>A.id)),jt=c?c.get()?.order||{}:{},It=new Set,Nt=[];for(let A of[...w,...N])Rt.has(A.id)||It.has(A.id)||Ru(A)||(It.add(A.id),Nt.push(A));T=Cu(Nt,v,jt);let J=u.admission||{},b=A=>{let V=J[A];if(!V)return"";if(V.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let ce=typeof V.reason=="string"?V.reason:"",qe=ce.indexOf(":");return qe>0&&qe<ce.length-1?`\u26D4 ${ce.slice(0,qe)} (${ce.slice(qe+1)})`:`\u26D4 ${ce}`},U=T.map(A=>{let V=Ds(A),ce=Wt.has(A.id),qe=[];ce&&qe.push(Lu(A)),V||qe.push("spec \uC5C6\uC74C");let Qr=b(A.id);return Qr&&qe.push(Qr),{id:A.id,title:A.title||A.id,reason:qe.join(" \xB7 "),draggable:V,lane:"candidate",created_at:A.created_at,updated_at:A.updated_at,workflow:A.workflow,status:A.status,blocked:ce,has_spec:V}}),f=vu(U,x),m=f.visible,p=u.revise_parked||{},$=(A,V)=>A.map(ce=>{let qe=V==="queue"?p[ce.bead_id]:null;return{id:ce.bead_id,title:Fe.get(ce.bead_id)||ce.bead_id,reason:V==="done"?"":b(ce.bead_id),draggable:V!=="done",done:V==="done",lane:V,badges:qe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!qe,revise_action:!!qe,revise_enabled:!!qe&&!R.has(ce.bead_id),revise_title:qe?qe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${qe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:V==="done"?Ot(u.attempts||{},ce.bead_id):null,done_at:V==="done"&&typeof ce.added_at=="number"?ce.added_at:void 0,...ut(ce.bead_id)}}),k=new Map;for(let A of u.done)A&&typeof A.bead_id=="string"&&typeof A.added_at=="number"&&k.set(A.bead_id,A.added_at);let F=u.attempts?Object.values(u.attempts):[],ge=new Set;for(let A of F)A&&typeof A.resumed_from=="string"&&A.resumed_from.length>0&&ge.add(A.resumed_from);let nt=new Map;for(let A of F)nt.set(A.bead_id,A.attempt_id);let Me=new Map;for(let A of F)Me.set(A.attempt_id,A);function pt(A){let V=new Set,ce=A;for(;ce&&!V.has(ce.attempt_id);){if(ce.conflict_resolution===!0)return!0;V.add(ce.attempt_id),ce=typeof ce.resumed_from=="string"&&ce.resumed_from.length>0&&Me.get(ce.resumed_from)||null}return!1}let Pt=typeof u.declared_base=="string"?u.declared_base:null;function Pi(A){let V=null;for(let ce of F)!ce||ce.bead_id!==A||pt(ce)||(V===null||(typeof ce.started_at=="number"?ce.started_at:0)>=(typeof V.started_at=="number"?V.started_at:0))&&(V=ce);return V&&typeof V.target_base=="string"?V.target_base:null}let $r=[],Lt=null;for(let A of F){let V=A.status==="paused"&&!ge.has(A.attempt_id);if(A.status==="running"||V)$r.push({bead_id:A.bead_id,attempt_id:A.attempt_id,title:Fe.get(A.bead_id)||A.bead_id,runner:A.runner||null,model:A.model||null,effort:A.effort||null,started_at:typeof A.started_at=="number"?A.started_at:null,resumed_from:A.resumed_from||null,paused:V,conflict_resolution:pt(A),base_exception:wi(Pt,A.target_base),can_pause:typeof A.session_id=="string"&&A.session_id.length>0,usage:Ot(u.attempts||{},A.bead_id),current_child:Ie(A.bead_id),...ut(A.bead_id)});else if(A.status==="failed"||A.status==="orphaned"){let ce=nt.get(A.bead_id)!==A.attempt_id,qe=k.get(A.bead_id),Qr=typeof qe=="number"&&qe>0&&typeof A.finished_at=="number"&&qe>=A.finished_at;!ce&&!Qr&&typeof A.dismissed_at!="number"&&(Lt=A)}}let Fs=null;if(Lt){let A=typeof Lt.session_id=="string"&&Lt.session_id.length>0,V=ge.has(Lt.attempt_id),ce=Lt.cause_detail;Fs={repo:Lt.repo||"",reason:Lt.cause||Lt.status,cause_detail:ce&&typeof ce.reason=="string"?{reason:ce.reason,command:typeof ce.command=="string"?ce.command:null}:null,resume_attempt_id:Lt.attempt_id,resume_eligible:A&&!V,resume_reason:A?V?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Fi=new Set($r.map(A=>A.bead_id)),Dn=Array.isArray(u.merge_queue)?u.merge_queue:[],qs=new Map;Dn.forEach((A,V)=>{A&&typeof A.bead_id=="string"&&qs.set(A.bead_id,V+1)});let Bs=u.merge_queue_state||{active:null,failures:{}},qi=Bs.failures||{},Bi=u.auto_merge_skips||{},Us=A=>{let V=Bi[A];if(!V)return null;let ce=Ve[A],qe=ce&&ce.pr?ce.pr.head_sha:null;return qe&&qe===V.head_sha?V.reason||"":null},Zr=new Map;for(let A of $r)A.conflict_resolution&&(A.paused?Zr.has(A.bead_id)||Zr.set(A.bead_id,"paused"):Zr.set(A.bead_id,"running"));let zs=$r.filter(A=>!A.paused).length,Hs=(u.workspace_info||{}).slots,Ws=typeof Hs=="number"?Hs:typeof u.slots=="number"?u.slots:In,Ui=zs>Ws,js=pr(C),zi=(Array.isArray(u.done)?u.done.slice():[]).filter(A=>js===void 0||typeof A.added_at!="number"||A.added_at>=js).sort((A,V)=>(V.added_at||0)-(A.added_at||0)),Gs=$(zi,"done"),Xr={};for(let A of Bt)Xr[A]=0;let Ys=!1,Vs=0,On=0,Ks=0;for(let A of Gs){let V=A.usage;if(V&&typeof V=="object"){let ce=!1;for(let qe of Bt)Number.isFinite(V[qe])&&(Xr[qe]+=V[qe],Ys=!0,ce=!0);ce&&(On+=1,Number.isFinite(V.total_cost_usd)&&(Vs+=V.total_cost_usd,Ks+=1))}}On>0&&Ks===On&&(Xr.total_cost_usd=Vs);let Hi=Ys?At(Xr):null;return{queue:u,idToTitle:Fe,candidates:m,candidate_hidden:{blocked:f.hidden_blocked,spec:f.hidden_spec},running:$r,live_count:zs,slots:Ws,over_cap:Ui,failure:Fs,waiting:$(it.filter(A=>!Fi.has(A.bead_id)),"queue"),pr_wait:ht.map(A=>Pu(A.bead_id,Fe.get(A.bead_id)||A.bead_id,Ve,ve[A.bead_id]||null,Ot(u.attempts||{},A.bead_id),rt[A.bead_id]||(z.has(A.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Zr.get(A.bead_id)||null,A.external===!0,{position:qs.get(A.bead_id)||0,active:Bs.active===A.bead_id,failure:qi[A.bead_id]||null},A.wt_present!==!1,u.auto_merge===!0?Us(A.bead_id):null,wi(Pt,Pi(A.bead_id)))).map(A=>({...A,...ut(A.id)})),merge_queue_length:Dn.length,merge_queue_running:Dn.length>0,auto_excluded:ht.map(A=>A.bead_id).filter(A=>Us(A)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:Pt,done:Gs,token_total:Hi,cleanup_failures:fe,ship_failure:yt}}function se(u){let w=u.waiting.length>0?u.waiting[0].id:"\u2014",N=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,Y=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,ae=l`<button
      type="button"
      class="worker-auto-all${Y?" is-active":""}"
      title=${Y?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${Y?"true":"false"}
    >
      ${Y?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,Ie=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",We=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${j()} 완료 <b>${u.done.length}</b></span
      >`,Fe=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Je=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${In}
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
      </button>`,at=Ka({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return Q?l`<div class="worker-ribbon">
          ${N}
          <div class="worker-kpi worker-kpi--ribbon">${Ie}${We}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ae}${Je}</div>
          <div class="worker-kpi">${Fe}</div>
        </div>
        ${at}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${N}${ae}${Je}</div>
        <div class="worker-kpi">
          ${Ie}${We}${Fe}
          ${u.token_total?l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${`${j()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}
                >${j()} 완료 · 누적 ${u.token_total}</span
              >`:""}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${at}`}function De(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let w=u.running.some(N=>!N.paused);return l`<section
      class="worker-now${w?" worker-pane--live":""}"
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
        ${et(u)}
      </header>
      ${u.running.length>0?xs(u.running,Date.now(),Se):""}
      ${u.pr_wait.map(N=>ws(N))}
    </section>`}function Oe(u){let w=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${x.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${yu.map(N=>l`<button
              type="button"
              class="worker-filter__chip${x.spec===N.value?" is-active":""}"
              data-spec=${N.value}
              aria-pressed=${x.spec===N.value?"true":"false"}
            >
              ${N.label}
            </button>`)}
        ${w.spec>0?l`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function He(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${wu.map(u=>l`<option value=${u.value} ?selected=${v===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function Ke(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${C}
      >
        ${Dt.map(u=>l`<option value=${u.value} ?selected=${C===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function et(u){let w=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${u.merge_queue_length}
      </button>`;if(w)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let N=new Set(u.auto_excluded),Y=u.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!N.has(ae.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Y>0?` ${Y}`:""}
    </button>`}function st(u){let w=Mt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:He(),controls:Oe(u)});return Q?l`<div class="worker-lanes worker-lanes--mobile">
        ${De(u)}
        ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:G.queue,preview:vi(u.waiting)})}
        ${w}
        ${Mt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ke(),collapsible:!0,collapsed:G.done,preview:u.token_total||vi(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${w}
      ${Mt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Mt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(N=>!N.paused),body:xs(u.running,Date.now(),Se)})}
      ${Mt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:et(u)})}
      ${Mt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${j()} ${u.done.length}`,items:u.done,empty:`${j()} \uC644\uB8CC \uC5C6\uC74C`,controls:Ke()})}
    </div>`}function Ge(u){G={...G,[u]:!G[u]},Eu(G),Re()}function Re(){let u=ee();Ee(se(u),H),Ee(st(u),he)}function Ze(){let u=document.querySelector(".app-header");if(!u)return;let w=()=>{let N=Math.round(u.getBoundingClientRect().height);I.style.setProperty("--worker-ribbon-top",`${N}px`)};if(w(),typeof ResizeObserver=="function"){let N=new ResizeObserver(w);N.observe(u),E.push(()=>N.disconnect())}else window.addEventListener("resize",w),E.push(()=>window.removeEventListener("resize",w))}function vt(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(Au);Q=!!u.matches;let w=N=>{let Y=!!(N&&typeof N.matches=="boolean"?N.matches:u.matches);Y!==Q&&(Q=Y,Re())};typeof u.addEventListener=="function"?(u.addEventListener("change",w),E.push(()=>u.removeEventListener("change",w))):typeof u.addListener=="function"&&(u.addListener(w),E.push(()=>u.removeListener(w)))}function lt(u){let w=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!w)return;let N=w.dataset.beadId||"",Y=w.dataset.lane||"";y={bead_id:N,from_lane:Y};try{u.dataTransfer?.setData("text/plain",N),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function ct(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;let N=w.dataset.lane||"";N!=="candidate"&&N!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Ue(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ot(u,w){let N=T.find(We=>We.id===u);if(!N)return;let Y=T.filter(We=>We.id!==u),ae=Y.length;if(w){let We=w.dataset.beadId;if(We===u)return;let Fe=Y.findIndex(Je=>Je.id===We);Fe>=0&&(ae=Fe)}let Ie=Y.slice();Ie.splice(ae,0,N),g.applyReorder(u,Ie,ae)}function tt(u){let w=u.target?.closest?.(".worker-pane");if(!w)return;u.preventDefault(),w.classList.remove("worker-pane--drag-over");let N=w.dataset.lane||"",Y=y?.bead_id||u.dataTransfer?.getData("text/plain")||"",ae=y?.from_lane||"";if(y=null,!Y)return;let Ie=u.target?.closest?.(".worker-mini, .worker-card"),We=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Fe=We.length;if(Ie){let Je=We.indexOf(Ie);Je>=0&&(Fe=Je)}if(w.classList.contains("worker-pane--collapsed")&&(Fe=K()),N==="candidate"){if(ae==="candidate"){ot(Y,Ie);return}ae==="queue"&&we(Y);return}N==="queue"&&(ae==="queue"?Z(Y,Fe):ye(Y,Fe))}function Qe(u){x=u,bu(u),Re()}function D(u){v=u==="board"||u==="created"||u==="spec"?u:Ln,$u(v),Re()}function B(u){C=qt(u)?u:kt,Su(C),Re()}function te(u){let w=u.target?.closest?.(".worker-filter__blocked");if(w){Qe({...x,show_blocked:w.checked});return}let N=u.target?.closest?.(".worker-done-range");if(N){B(N.value);return}let Y=u.target?.closest?.(".worker-sort");if(Y){D(Y.value||Ln);return}let ae=u.target?.closest?.(".worker-slots__input");if(!ae)return;let Ie=Number.parseInt(ae.value,10);if(!Number.isFinite(Ie)){Re();return}W(Ie).then(Re)}function ie(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function ue(u){let w=Te(),N=w.attempts?w.attempts[u]:null;Se=u,oe.hidden=!1,je.open({attempt_id:u,meta:ie(N)}),Re()}function be(){if(!Se)return;let u=Te(),w=u.attempts?u.attempts[Se]:null;if(w){je.updateMeta(ie(w));return}je.close()}function Ce(u){let w=u.target;if(w?.closest?.("#worker-exec-defaults-dialog"))return;if(w?.closest?.(".worker-exec-defaults-btn")){ze.open();return}let N=w?.closest?.(".worker-banner__resume");if(N){let fe=N.dataset.attemptId;fe&&re(fe);return}let Y=w?.closest?.(".worker-banner__dismiss");if(Y){let fe=Y.dataset.attemptId;fe&&me(fe);return}if(w?.closest?.(".worker-play")){S(!Te().auto_advance);return}if(w?.closest?.(".worker-auto-all")){let fe=Te();q(!(fe.auto_advance===!0&&fe.auto_merge===!0));return}let ae=w?.closest?.(".worker-merge-all");if(ae){ae.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?ne(!1):$e():ne(!0);return}let Ie=w?.closest?.(".worker-pane__hd--toggle");if(Ie){let fe=Ie.dataset.lane;(fe==="queue"||fe==="done")&&Ge(fe);return}let We=w?.closest?.(".worker-card__place");if(We){let fe=We.dataset.beadId;fe&&!We.disabled&&ye(fe,K());return}let Fe=w?.closest?.(".worker-filter__chip");if(Fe){let fe=Fe.dataset.spec;(fe==="all"||fe==="with"||fe==="without")&&Qe({...x,spec:fe});return}let Je=w?.closest?.(".worker-mini__merge");if(Je){O(Je.dataset.beadId||"");return}let at=w?.closest?.(".worker-mini__merge-cancel");if(at){ke(at.dataset.beadId||"");return}let ut=w?.closest?.(".worker-mini__discard");if(ut){P(ut.dataset.beadId||"");return}let ht=w?.closest?.(".worker-mini__revise-fix");if(ht){h("worker-revise-fix",ht.dataset.beadId||"");return}let Ve=w?.closest?.(".worker-mini__revise-approve");if(Ve){h("worker-revise-approve",Ve.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__stop")){let Ae=w?.closest?.(".rtile")?.dataset?.attemptId;Ae&&_e(Ae);return}if(w?.closest?.(".rtile__pause")){let Ae=w?.closest?.(".rtile")?.dataset?.attemptId;Ae&&Pe(Ae);return}if(w?.closest?.(".rtile__resume")){let Ae=w?.closest?.(".rtile")?.dataset?.attemptId;Ae&&re(Ae);return}if(w?.closest?.(".rtile__session")){let Ae=w?.closest?.(".rtile")?.dataset?.attemptId;Ae&&ue(Ae);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){je.close();return}if(w?.closest?.(".worker-drawer-host"))return;let rt=w?.closest?.(".rtile");if(rt){if(w?.closest?.(".rtile__id")){let Ae=rt.dataset.beadId;Ae&&or(Ae).then(yt=>{yt?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let fe=rt.dataset.beadId;fe&&i&&i(fe);return}let ve=w?.closest?.(".worker-mini, .worker-card");if(ve){let fe=ve.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){fe&&or(fe).then(Ae=>{Ae?X("\uBCF5\uC0AC\uB428","success",1200):X("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}fe&&i&&i(fe)}}return e.addEventListener("dragstart",lt),e.addEventListener("dragover",ct),e.addEventListener("dragleave",Ue),e.addEventListener("drop",tt),e.addEventListener("click",Ce),e.addEventListener("change",te),vt(),Ze(),_&&E.push(_.subscribe(Re)),s&&E.push(s.subscribe(()=>{Re(),be()})),Re(),{load(){Re()},openExecDefaults(){ze.open()},destroy(){for(let u of E.splice(0))try{u()}catch{}e.removeEventListener("dragstart",lt),e.removeEventListener("dragover",ct),e.removeEventListener("dragleave",Ue),e.removeEventListener("drop",tt),e.removeEventListener("click",Ce),e.removeEventListener("change",te);try{je.destroy()}catch{}oe.hidden=!0;try{ze.destroy()}catch{}Ee(l``,e)}}}function Ms(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Ai(e,t,r,n=async()=>{},s=async()=>{}){let o=Ye("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function _(E){let H=E.target.value,pe=t.getState().workspace?.current?.path||"";if(H&&H!==pe){o("switching workspace to %s",H),c=!0,R();try{await r(H)}catch(le){o("workspace switch failed: %o",le)}finally{c=!1,R()}}}async function g(){let E=t.getState(),I=E.workspace?.current?.path||E.workspace?.available?.[0]?.path||"";if(!(!I||i)){o("git-pulling workspace %s",I),i=!0,R();try{await n(I)}catch(H){o("workspace git pull failed: %o",H)}finally{i=!1,R()}}}function y(E){let I=E.target;I&&e.contains(I)||v()}function T(E){E.key==="Escape"&&v()}function x(){d||(d=!0,document.addEventListener("mousedown",y),document.addEventListener("keydown",T),R())}function v(){d&&(d=!1,document.removeEventListener("mousedown",y),document.removeEventListener("keydown",T),R())}function C(){d?v():x()}async function j(E){let I=E.target,H=I.value,oe=I.checked;o("toggling visibility %s \u2192 %s",H,String(oe));try{await s(H,oe)}catch(pe){o("workspace visibility toggle failed: %o",pe)}}function G(E){return E?l`
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
    `:l``}function Q(E,I){return l`
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
        ${d?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${E.map(H=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!I.has(H.path)}
                        @change=${j}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ms(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function z(){let E=t.getState(),I=E.workspace?.current,H=E.workspace?.available||[],oe=new Set(E.workspace?.hidden||[]),pe=I?.path||H[0]?.path||"";if(H.length===0)return l``;let le=H.filter(he=>!oe.has(he.path)||he.path===pe);if(le.length<=1){let he=le[0]||H[0],Se=Ms(he.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${he.path}"
            >${Se}</span
          >
          ${Q(H,oe)}
          ${G(pe)}
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
          ${le.map(he=>l`
              <option
                value="${he.path}"
                ?selected=${he.path===pe}
                title="${he.path}"
              >
                ${Ms(he.path)}
              </option>
            `)}
        </select>
        ${Q(H,oe)}
        ${G(pe)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Ee(z(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",y),document.removeEventListener("keydown",T),Ee(l``,e)}}}var Ti=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function Ns(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Ei(e,t,r=Ns()){return{id:r,type:e,payload:t}}function Ci(e={}){let t=Ye("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,_=[],g=new Map,y=new Set;function T(z){for(let R of Array.from(y))try{R(z)}catch{}}function x(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let z=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*z,E=Math.max(0,Math.round(z+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",E,a+1),c=setTimeout(()=>{c=null,Q()},E)}function v(z){try{s?.send(JSON.stringify(z))}catch(R){t("ws send failed",R)}}function C(){for(o="open",t("ws open"),T(o),a=0;_.length;){let z=_.shift();z&&v(z)}}function j(z){let R;try{R=JSON.parse(String(z.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(d.has(R.id)){let I=d.get(R.id);d.delete(R.id),R.ok?I?.resolve(R.payload):I?.reject(R.error||new Error("ws error"));return}let E=g.get(R.type);if(E&&E.size>0)for(let I of Array.from(E))try{I(R.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",R.type)}function G(){o="closed",t("ws closed"),T(o);for(let[z,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(z);a+=1,x()}function Q(){if(!i)return;let z=n();try{s=new WebSocket(z),t("ws connecting %s",z),o="connecting",T(o),s.addEventListener("open",C),s.addEventListener("message",j),s.addEventListener("error",()=>{}),s.addEventListener("close",G)}catch(R){t("ws connect failed %o",R),x()}}return Q(),{send(z,R){if(!Ti.includes(z))return Promise.reject(new Error(`unknown message type: ${z}`));let E=Ns(),I=Ei(z,R,E);return t("send %s id=%s",z,E),new Promise((H,oe)=>{d.set(E,{resolve:H,reject:oe,type:z}),s&&s.readyState===s.OPEN?v(I):(t("queue %s id=%s (state=%s)",z,E,o),_.push(I))})},on(z,R){g.has(z)||g.set(z,new Set);let E=g.get(z);return E?.add(R),()=>{E?.delete(R)}},onConnection(z){return y.add(z),()=>{y.delete(z)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,Q()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function Fu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function qu(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ps=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Ri=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],Ii=di,Li="worker:queue",Di="ui:order",Oi="ui:display-policy",Mi="exec:presets",Xt="tab:board:closed",Ni="beads-ui.board.closed-range";function Bu(e){let t=Ye("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ee(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),i=document.getElementById("detail-panel");if(s&&bi(s),o&&a&&c&&i){let de=function(f,m){let p="Request failed",$="";if(f&&typeof f=="object"){let F=f;if(typeof F.message=="string"&&F.message.length>0&&(p=F.message),typeof F.details=="string")$=F.details;else if(F.details&&typeof F.details=="object")try{$=JSON.stringify(F.details,null,2)}catch{$=""}}else typeof f=="string"&&f.length>0&&(p=f);let k=m&&m.length>0?`Failed to load ${m}`:"Request failed";Te.open(k,p,$)},W=function(f){return`${ve.getState().workspace.current?.path||""}\0${f}`},ee=function(){O&&(O().catch(()=>{}),O=null),ne=null,ke=null},De=function(f){$e=f;let m=()=>{$e!==f||ve.getState().selected_id!==f||($e=null,se(f))};if(!S){h.then(m);return}m()},et=function(f,m,p,$,k){return p!==Ke[m]?(k().catch(()=>{}),!1):(f.set($,k),!0)},st=function(){let f=ve.getState();Ze(f.view==="board"),ot(f.view==="worker"),te(f.view==="monitor"),Qe(f.view==="worker"||!!f.selected_id)},Re=function(){let f=pr(Ge);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},Ze=function(f){if(f)for(let[m,p]of Ps){if(Oe.has(m)||He.has(m))continue;let $=m===Xt?Re():{type:p};try{Z.register(m,$)}catch(ge){t("register %s store failed: %o",m,ge)}He.add(m);let k=Ke.board,F=!1;ye.subscribeList(m,$).then(ge=>{F=!et(Oe,"board",k,m,ge)}).catch(ge=>{t("subscribe %s failed: %o",m,ge),de(ge,"board")}).finally(()=>{He.delete(m),F&&st()})}else lt()},lt=function(){Ke.board+=1;for(let[f]of Ps){let m=Oe.get(f);m&&(m().catch(()=>{}),Oe.delete(f));try{Z.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},ot=function(f){if(!f){tt();return}for(let[m,p]of Ri){if(ct.has(m)||He.has(m))continue;try{Z.register(m,{type:p})}catch(F){t("register %s store failed: %o",m,F)}He.add(m);let $=Ke.worker,k=!1;ye.subscribeList(m,{type:p}).then(F=>{k=!et(ct,"worker",$,m,F)}).catch(F=>{t("subscribe %s failed: %o",m,F),de(F,"worker")}).finally(()=>{He.delete(m),k&&st()})}},tt=function(){Ke.worker+=1;for(let[f]of Ri){let m=ct.get(f);m&&(m().catch(()=>{}),ct.delete(f));try{Z.unregister(f)}catch(p){t("unregister %s failed: %o",f,p)}}},Qe=function(f){if(!f){D();return}Ue||(K("subscribe-worker-queue",{id:Li}).catch(m=>{t("subscribe-worker-queue failed: %o",m)}),Ue=()=>K("unsubscribe-worker-queue",{id:Li}))},D=function(){Ue&&(Ue().catch(()=>{}),Ue=null)},te=function(f){if(!f){ie();return}B||(K("subscribe-monitor-pipeline",{id:Ii}).catch(m=>{t("subscribe-monitor-pipeline failed: %o",m)}),B=()=>K("unsubscribe-monitor-pipeline",{id:Ii}))},ie=function(){B&&(B().catch(()=>{}),B=null)},be=function(){ue||(K("subscribe-ui-order",{id:Di}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),ue=()=>K("unsubscribe-ui-order",{id:Di}))},Ce=function(){ue&&(ue().catch(()=>{}),ue=null),Pe.clear()},w=function(){u||(K("subscribe-display-policy",{id:Oi}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),u=()=>K("unsubscribe-display-policy",{id:Oi}))},N=function(){u&&(u().catch(()=>{}),u=null),re.clear()},ae=function(){Y||(K("subscribe-exec-presets",{id:Mi}).catch(f=>{t("subscribe-exec-presets failed: %o",f)}),Y=()=>K("unsubscribe-exec-presets",{id:Mi}))},ut=function(f){if(!f)return"Unknown";let m=f.split("/").filter(Boolean);return m.length>0?m[m.length-1]:"Unknown"};var d=de,_=W,g=ee,y=De,T=et,x=st,v=Re,C=Ze,j=lt,G=ot,Q=tt,z=Qe,R=D,E=te,I=ie,H=be,oe=Ce,pe=w,le=N,he=ae,Se=ut;let je=document.getElementById("header-loading"),ze=Io(je),Te=Wa(e),L=Ci(),K=ze.wrapSend((f,m)=>L.send(f,m)),ye=xo(K),Z=So(),we=To(),_e=lo(),Pe=Ao(),re=ao(),me=io(),M=co();L.on("exec-presets-snapshot",f=>{let m=f;m&&typeof m.revision=="number"&&Array.isArray(m.presets)&&me.set({revision:m.revision,presets:m.presets})}),L.on("monitor-pipeline-snapshot",f=>{let m=f;if(!(!m||!Array.isArray(m.workspaces)))try{_e.set(m.workspaces,m.workspaces_state)}catch{}}),L.on("ui-order-snapshot",f=>{let m=f;if(m&&typeof m.revision=="number")try{Pe.set({revision:m.revision,order:m.order&&typeof m.order=="object"?m.order:{}})}catch{}}),L.on("display-policy-snapshot",f=>{let m=f;if(m&&m.policy&&typeof m.policy=="object")try{re.set(m.policy)}catch{}}),L.on("session-log-snapshot",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{M.set(m.attempt_id,Array.isArray(m.lines)?m.lines:[],typeof m.last_event_at=="number"?m.last_event_at:null)}catch{}}),L.on("session-log-append",f=>{let m=f;if(m&&typeof m.attempt_id=="string")try{M.append(m.attempt_id,m.event)}catch{}}),L.on("snapshot",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="snapshot")try{$.applyPush(m)}catch{}}),L.on("upsert",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="upsert")try{$.applyPush(m)}catch{}}),L.on("delete",f=>{let m=f,p=m&&typeof m.id=="string"?m.id:"",$=p?Z.getStore(p):null;if($&&m&&m.type==="delete")try{$.applyPush(m)}catch{}});let O=null,ne=null,ke=null,$e=null,P=()=>{},h=new Promise(f=>{P=()=>f(void 0)}),S=!1,q=!1;async function se(f){let m=W(f);if(m===ne||m===ke)return;ke=m;let p=`detail:${f}`,$={type:"issue-detail",params:{id:f}};try{Z.register(p,$)}catch(k){t("register detail store failed: %o",k)}try{let k=await ye.subscribeList(p,$);if(ve.getState().selected_id!==f||W(f)!==m){await k().catch(()=>{});return}O&&await O().catch(()=>{}),O=k,ne=m}catch(k){t("detail subscribe failed: %o",k),de(k,"issue details")}finally{ke===m&&(ke=null)}}let Oe=new Map,He=new Set,Ke={board:0,worker:0},Ge=kt;try{let f=window.localStorage.getItem(Ni);qt(f)&&(Ge=f)}catch{}async function vt(f){if(!qt(f)||f===Ge)return;Ge=f;try{window.localStorage.setItem(Ni,f)}catch{}let m=Oe.get(Xt);if(!m)return;Oe.delete(Xt),await m().catch(()=>{});let p=Re();try{Z.register(Xt,p)}catch($){t("register %s store failed: %o",Xt,$)}try{let $=await ye.subscribeList(Xt,p);Oe.set(Xt,$)}catch($){t("re-subscribe %s failed: %o",Xt,$),de($,"board")}}let ct=new Map,Ue=null,B=null,ue=null,u=null,Y=null;async function Ie(){u=null,re.clear(),Y=null,me.clear(),Ue=null,B=null,Oe.clear(),ct.clear(),Ke.board+=1,Ke.worker+=1,ae();let f=ve.getState().workspace.current?.path;if(f)try{await L.send("set-workspace",{path:f})}catch(p){t("workspace restore after reconnect failed: %o",p);return}w();let m=ve.getState();Ze(m.view==="board"),ot(m.view==="worker"),te(m.view==="monitor"),Qe(m.view==="worker"||!!m.selected_id)}async function We(){t("clearing all subscriptions for workspace switch"),lt(),tt(),D(),we.clear(),Ce(),be(),N(),w(),ee();let f=ve.getState();if(f.selected_id)try{Z.unregister(`detail:${f.selected_id}`)}catch{}let m=ve.getState();Ze(m.view==="board"),ot(m.view==="worker"),te(m.view==="monitor"),Qe(m.view==="worker"||!!m.selected_id),m.selected_id&&De(m.selected_id)}async function Fe(f){t("requesting workspace switch to %s",f),q=!0;try{let m=await L.send("set-workspace",{path:f});t("workspace switch result: %o",m),m&&m.workspace&&(ve.setState({workspace:{current:{path:m.workspace.root_dir,database:m.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),m.changed&&(await We(),X("Switched to "+ut(f),"success",2e3)))}catch(m){throw t("workspace switch failed: %o",m),X("Failed to switch workspace","error",3e3),m}finally{q=!1}}async function Je(f){t("requesting workspace git pull for %s",f);try{let m=await L.send("git-pull-workspace",{});t("workspace git pull result: %o",m);let p=m?.status;if(p==="up_to_date"){X("Already up to date","success",2e3);return}if(p==="stash_pop_conflict"){X("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}X("Git pulled "+ut(f),"success",2e3)}catch(m){t("workspace git pull failed: %o",m);let p=m?.code,$=m?.message;if(p==="rebase_conflict"){X("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(p==="rebase_conflict_abort_failed"){X("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(p==="busy"){X("Git pull skipped: another operation is running","warning",3e3);return}let k=$?`: ${$}`:"";throw X(`Git pull failed${k}`,"error",3e3),m}}async function at(f,m){t("setting workspace visibility %s \u2192 %s",f,String(m));try{await L.send("set-workspace-visibility",{path:f,visible:m}),await ht()}catch(p){t("workspace visibility update failed: %o",p),X("Failed to update project visibility","error",3e3)}}async function ht(){try{let f=await L.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let m=f.workspaces.map(F=>({path:F.path,database:F.database,pid:F.pid,version:F.version})),p=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,$=Array.isArray(f.hidden)?f.hidden.filter(F=>typeof F=="string"):[];ve.setState({workspace:{current:p,available:m,hidden:$}});let k=window.localStorage.getItem("beads-ui.workspace");k&&(!m.some(ge=>ge.path===k)||$.includes(k)?window.localStorage.removeItem("beads-ui.workspace"):p&&k!==p.path&&(t("restoring saved workspace preference: %s",k),await Fe(k)))}}catch(f){t("failed to load workspaces: %o",f)}}L.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ve.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),ht(),We())});let Ve=!1;if(typeof L.onConnection=="function"){let f=m=>{t("ws state %s",m),m==="reconnecting"||m==="closed"?(Ve=!0,X("Connection lost. Reconnecting\u2026","error",4e3)):m==="open"&&Ve&&(Ve=!1,X("Reconnected","success",2200),qu(ve,(p,$)=>{t(`${p}: %o`,$)}),Ie())};L.onConnection(f)}let rt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(rt=f)}catch(f){t("view parse error: %o",f)}let ve=Ro({config:Fu(),view:rt});L.on("worker-queue-snapshot",f=>{let m=f;if(!m||!m.queue)return;let p=ve.getState().workspace.current?.path;if(typeof p=="string"&&p.length>0&&m.root_dir!==p){t("dropping worker-queue snapshot for %s",String(m.root_dir));return}try{we.set(m.queue)}catch{}});let fe=Eo(ve);fe.start();let Ae=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),yt=async(f,m)=>{try{return await K(f,m)}catch(p){if(Ae.has(f))throw p;return[]}};n&&pi(n,ve,fe);let it=document.getElementById("workspace-picker");it&&Ai(it,ve,Fe,Je,at);let Rt=gi(e,(f,m)=>K(f,m));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>Rt.open())}catch{}let Wt=Ha(e,{policyStore:re,transport:(f,m)=>K(f,m),labelOptions:()=>{let f=new Set;for(let[m]of Ps)for(let p of Z.snapshotFor(m)||[]){let $=p.labels;if(Array.isArray($))for(let k of $)typeof k=="string"&&k.length>0&&f.add(k)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Wt.open())}catch{}let jt=qo(o,{gotoIssue:f=>fe.gotoIssue(f),issueStores:Z,transport:yt,uiOrderStore:Pe,displayPolicyStore:re,closedRange:Ge,onClosedRangeChange:f=>{vt(f)},onNewIssue:()=>Rt.open()}),It=Os(a,{transport:yt,issueStores:Z,queueStore:we,execPresetStore:me,sessionLogStore:M,uiOrderStore:Pe,gotoIssue:f=>ve.setState({selected_id:f}),getWorkspacePath:()=>ve.getState().workspace.current?.path}),Nt=ui(c,{transport:yt,pipelineStore:_e,execPresetStore:me,gotoIssue:f=>fe.gotoIssue(f),getWorkspacePath:()=>ve.getState().workspace.current?.path,switchWorkspace:f=>Fe(f)}),J=Ua(i,{issueStores:Z,transport:yt,queueStore:we,execPresetStore:me,sessionLogStore:M,getWorkspacePath:()=>ve.getState().workspace.current?.path,onNavigate:f=>{ve.getState().view==="worker"?ve.setState({selected_id:f}):fe.gotoIssue(f)},onClose:()=>{let f=ve.getState();ve.setState({selected_id:null});try{fe.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{ve.setState({selected_id:null}),fe.gotoView("worker"),It.openExecDefaults()}}),b=ve.getState().selected_id;b&&(i.hidden=!1,J.load(b),De(b)),ve.subscribe(f=>{let m=f.selected_id;m?(i.hidden=!1,J.load(m),q||De(m)):(J.clear(),i.hidden=!0,ee())});let U=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",Ze(f.view==="board"),ot(f.view==="worker"),te(f.view==="monitor"),Qe(f.view==="worker"||!!f.selected_id),!f.selected_id&&f.view==="board"&&jt.load(),f.view==="worker"&&It.load(),f.view==="monitor"?Nt.load():Nt.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ve.subscribe(U),U(ve.getState()),be(),w(),ae(),ht().finally(()=>{S=!0,P()}),window.addEventListener("keydown",f=>{let m=f.ctrlKey||f.metaKey,p=String(f.key||"").toLowerCase(),$=f.target,k=$&&$.tagName?String($.tagName).toLowerCase():"",F=k==="input"||k==="textarea"||k==="select"||$&&typeof $.isContentEditable=="boolean"&&$.isContentEditable;m&&p==="n"&&(F||(f.preventDefault(),Rt.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Bu(t)});export{Bu as bootstrap,Fu as readBootstrapConfig,qu as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
