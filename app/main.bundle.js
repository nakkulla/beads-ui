var Ii=Object.create;var Rn=Object.defineProperty;var Li=Object.getOwnPropertyDescriptor;var Di=Object.getOwnPropertyNames;var Oi=Object.getPrototypeOf,Mi=Object.prototype.hasOwnProperty;var Ni=(e,t,r)=>t in e?Rn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var In=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Pi=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Di(t))!Mi.call(e,s)&&s!==r&&Rn(e,s,{get:()=>t[s],enumerable:!(n=Li(t,s))||n.enumerable});return e};var Fi=(e,t,r)=>(r=e!=null?Ii(Oi(e)):{},Pi(t||!e||!e.__esModule?Rn(r,"default",{value:e,enumerable:!0}):r,e));var Fe=(e,t,r)=>Ni(e,typeof t!="symbol"?t+"":t,r);var lo=In((xu,io)=>{var ur=1e3,pr=ur*60,fr=pr*60,Jt=fr*24,Hi=Jt*7,Wi=Jt*365.25;io.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Gi(e);if(r==="number"&&isFinite(e))return t.long?Yi(e):ji(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Gi(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Wi;case"weeks":case"week":case"w":return r*Hi;case"days":case"day":case"d":return r*Jt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*fr;case"minutes":case"minute":case"mins":case"min":case"m":return r*pr;case"seconds":case"second":case"secs":case"sec":case"s":return r*ur;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function ji(e){var t=Math.abs(e);return t>=Jt?Math.round(e/Jt)+"d":t>=fr?Math.round(e/fr)+"h":t>=pr?Math.round(e/pr)+"m":t>=ur?Math.round(e/ur)+"s":e+"ms"}function Yi(e){var t=Math.abs(e);return t>=Jt?Xr(e,t,Jt,"day"):t>=fr?Xr(e,t,fr,"hour"):t>=pr?Xr(e,t,pr,"minute"):t>=ur?Xr(e,t,ur,"second"):e+" ms"}function Xr(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var uo=In((Su,co)=>{function Vi(e){r.debug=r,r.default=r,r.coerce=i,r.disable=a,r.enable=s,r.enabled=c,r.humanize=lo(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let h=0;h<_.length;h++)m=(m<<5)-m+_.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,h=null,w,$;function g(...E){if(!g.enabled)return;let j=g,Y=Number(new Date),Z=Y-(m||Y);j.diff=Z,j.prev=m,j.curr=Y,m=Y,E[0]=r.coerce(E[0]),typeof E[0]!="string"&&E.unshift("%O");let M=0;E[0]=E[0].replace(/%([a-zA-Z%])/g,(x,P)=>{if(x==="%%")return"%";M++;let H=r.formatters[P];if(typeof H=="function"){let ce=E[M];x=H.call(j,ce),E.splice(M,1),M--}return x}),r.formatArgs.call(j,E),(j.log||r.log).apply(j,E)}return g.namespace=_,g.useColors=r.useColors(),g.color=r.selectColor(_),g.extend=n,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(w!==r.namespaces&&(w=r.namespaces,$=r.enabled(_)),$),set:E=>{h=E}}),typeof r.init=="function"&&r.init(g),g}function n(_,m){let h=r(this.namespace+(typeof m>"u"?":":m)+_);return h.log=this.log,h}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(_,m){let h=0,w=0,$=-1,g=0;for(;h<_.length;)if(w<m.length&&(m[w]===_[h]||m[w]==="*"))m[w]==="*"?($=w,g=h,w++):(h++,w++);else if($!==-1)w=$+1,g++,h=g;else return!1;for(;w<m.length&&m[w]==="*";)w++;return w===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function c(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function i(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}co.exports=Vi});var po=In((ht,Qr)=>{ht.formatArgs=Zi;ht.save=Xi;ht.load=Qi;ht.useColors=Ki;ht.storage=Ji();ht.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();ht.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Ki(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Zi(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Qr.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}ht.log=console.debug||console.log||(()=>{});function Xi(e){try{e?ht.storage.setItem("debug",e):ht.storage.removeItem("debug")}catch{}}function Qi(){let e;try{e=ht.storage.getItem("debug")||ht.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ji(){try{return localStorage}catch{}}Qr.exports=uo()(ht);var{formatters:el}=Qr.exports;el.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var wr=globalThis,Zr=wr.trustedTypes,Vs=Zr?Zr.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",Ht=`lit$${Math.random().toFixed(9).slice(2)}$`,to="?"+Ht,qi=`<${to}>`,Xt=document,$r=()=>Xt.createComment(""),xr=e=>e===null||typeof e!="object"&&typeof e!="function",Fn=Array.isArray,Bi=e=>Fn(e)||typeof e?.[Symbol.iterator]=="function",Ln=`[ 	
\f\r]`,kr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ks=/-->/g,Zs=/>/g,Kt=RegExp(`>|${Ln}(?:([^\\s"'>=/]+)(${Ln}*=${Ln}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xs=/'/g,Qs=/"/g,ro=/^(?:script|style|textarea|title)$/i,qn=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=qn(1),Pt=qn(2),bu=qn(3),Qt=Symbol.for("lit-noChange"),Ze=Symbol.for("lit-nothing"),Js=new WeakMap,Zt=Xt.createTreeWalker(Xt,129);function no(e,t){if(!Fn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Vs!==void 0?Vs.createHTML(t):t}var Ui=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=kr;for(let c=0;c<r;c++){let i=e[c],d,_,m=-1,h=0;for(;h<i.length&&(a.lastIndex=h,_=a.exec(i),_!==null);)h=a.lastIndex,a===kr?_[1]==="!--"?a=Ks:_[1]!==void 0?a=Zs:_[2]!==void 0?(ro.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=Kt):_[3]!==void 0&&(a=Kt):a===Kt?_[0]===">"?(a=s??kr,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?Kt:_[3]==='"'?Qs:Xs):a===Qs||a===Xs?a=Kt:a===Ks||a===Zs?a=kr:(a=Kt,s=void 0);let w=a===Kt&&e[c+1].startsWith("/>")?" ":"";o+=a===kr?i+qi:m>=0?(n.push(d),i.slice(0,m)+eo+i.slice(m)+Ht+w):i+Ht+(m===-2?c:w)}return[no(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Sr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,i=this.parts,[d,_]=Ui(t,r);if(this.el=e.createElement(d,n),Zt.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Zt.nextNode())!==null&&i.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(eo)){let h=_[a++],w=s.getAttribute(m).split(Ht),$=/([.?@])?(.*)/.exec(h);i.push({type:1,index:o,name:$[2],strings:w,ctor:$[1]==="."?On:$[1]==="?"?Mn:$[1]==="@"?Nn:cr}),s.removeAttribute(m)}else m.startsWith(Ht)&&(i.push({type:6,index:o}),s.removeAttribute(m));if(ro.test(s.tagName)){let m=s.textContent.split(Ht),h=m.length-1;if(h>0){s.textContent=Zr?Zr.emptyScript:"";for(let w=0;w<h;w++)s.append(m[w],$r()),Zt.nextNode(),i.push({type:2,index:++o});s.append(m[h],$r())}}}else if(s.nodeType===8)if(s.data===to)i.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(Ht,m+1))!==-1;)i.push({type:7,index:o}),m+=Ht.length-1}o++}}static createElement(t,r){let n=Xt.createElement("template");return n.innerHTML=t,n}};function lr(e,t,r=e,n){if(t===Qt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=xr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=lr(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Xt).importNode(r,!0);Zt.currentNode=s;let o=Zt.nextNode(),a=0,c=0,i=n[0];for(;i!==void 0;){if(a===i.index){let d;i.type===2?d=new Ar(o,o.nextSibling,this,t):i.type===1?d=new i.ctor(o,i.name,i.strings,this,t):i.type===6&&(d=new Pn(o,this,t)),this._$AV.push(d),i=n[++c]}a!==i?.index&&(o=Zt.nextNode(),a++)}return Zt.currentNode=Xt,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ar=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ze,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=lr(this,t,r),xr(t)?t===Ze||t==null||t===""?(this._$AH!==Ze&&this._$AR(),this._$AH=Ze):t!==this._$AH&&t!==Qt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bi(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ze&&xr(this._$AH)?this._$AA.nextSibling.data=t:this.T(Xt.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Sr.createElement(no(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Js.get(t.strings);return r===void 0&&Js.set(t.strings,r=new Sr(t)),r}k(t){Fn(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O($r()),this.O($r()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},cr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ze,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ze}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=lr(this,t,r,0),a=!xr(t)||t!==this._$AH&&t!==Qt,a&&(this._$AH=t);else{let c=t,i,d;for(t=o[0],i=0;i<o.length-1;i++)d=lr(this,c[n+i],r,i),d===Qt&&(d=this._$AH[i]),a||(a=!xr(d)||d!==this._$AH[i]),d===Ze?t=Ze:t!==Ze&&(t+=(d??"")+o[i+1]),this._$AH[i]=d}a&&!s&&this.j(t)}j(t){t===Ze?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},On=class extends cr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ze?void 0:t}},Mn=class extends cr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ze)}},Nn=class extends cr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=lr(this,t,r,0)??Ze)===Qt)return;let n=this._$AH,s=t===Ze&&n!==Ze||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ze&&(n===Ze||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Pn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){lr(this,t)}};var zi=wr.litHtmlPolyfillSupport;zi?.(Sr,Ar),(wr.litHtmlVersions??(wr.litHtmlVersions=[])).push("3.3.1");var De=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ar(t.insertBefore($r(),o),o,void 0,r??{})}return s._$AI(e),s};var kt="today",Lt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Ft(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function dr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function so(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function oo(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ao(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var fo=Fi(po(),1);function He(e){return(0,fo.default)(`beads-ui:${e}`)}function St(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function er(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function go(e,t){let r=St(e.created_at),n=St(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function ho(e,t){let r=St(e.updated_at),n=St(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function bo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=St(e.created_at),o=St(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function vo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var tl=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function _o(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function mo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=tl.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function yo(e,t){let r=_o(e),n=_o(t);if(r!==n)return r<n?-1:1;let s=mo(e),o=mo(t);if(s!==o)return s<o?-1:1;let a=St(e&&e.created_at),c=St(t&&t.created_at);if(a!==c)return a<c?-1:1;let i=e&&e.id,d=t&&t.id;return i===d?0:String(i)<String(d)?-1:1}var Bn=2**20;function _r(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-St(e&&e.created_at)}function Jr(e){return(t,r)=>{let n=_r(t,e),s=_r(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Un(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:_r(c,r)-Bn};if(!c)return{rank:_r(a,r)+Bn};let i=_r(a,r),d=_r(c,r),_=(i+d)/2;return i<_&&_<d?{rank:_}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Bn}))}}function zn(e,t={}){let r=He(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,i=t.sort||er;function d(){for(let h of Array.from(a))try{h()}catch{}}function _(){s=Array.from(n.values()).sort(i)}function m(h){if(c||!h||h.id!==e)return;let w=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,w),!(w<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(w<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let g of $)g&&typeof g.id=="string"&&g.id.length>0&&n.set(g.id,g);_(),o=w,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let g=n.get($.id);if(!g)n.set($.id,$);else{let E=Number.isFinite(g.updated_at)?g.updated_at:0,j=Number.isFinite($.updated_at)?$.updated_at:0;if(E<=j){for(let Y of Object.keys(g))Y in $||delete g[Y];for(let[Y,Z]of Object.entries($))g[Y]=Z}}_()}o=w,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),_()),o=w,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function en(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ko(e){let t=He("subs"),r=new Map,n=new Map;function s(c,i){t("applyDelta %s +%d ~%d -%d",c,(i.added||[]).length,(i.updated||[]).length,(i.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(i.added)?i.added:[],m=Array.isArray(i.updated)?i.updated:[],h=Array.isArray(i.removed)?i.removed:[];for(let w of Array.from(d)){let $=r.get(w);if(!$)continue;let g=$.itemsById;for(let E of _)typeof E=="string"&&E.length>0&&g.set(E,!0);for(let E of m)typeof E=="string"&&E.length>0&&g.set(E,!0);for(let E of h)typeof E=="string"&&E.length>0&&g.delete(E)}}async function o(c,i){let d=en(i);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let m=r.get(c);if(m&&m.key!==d){let h=n.get(m.key);h&&(h.delete(c),h.size===0&&n.delete(m.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:i.type,params:i.params})}catch(m){let h=r.get(c)||null;if(h){let w=n.get(h.key);w&&(w.delete(c),w.size===0&&n.delete(h.key))}throw r.delete(c),m}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let m=r.get(c)||null;if(m){let h=n.get(m.key);h&&(h.delete(c),h.size===0&&n.delete(m.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:en,selectors:{getIds(c){let i=r.get(c);return i?Array.from(i.itemsById.keys()):[]},has(c,i){let d=r.get(c);return d?d.itemsById.has(i):!1},count(c){let i=r.get(c);return i?i.itemsById.size:0},getItemsById(c){let i=r.get(c),d={};if(!i)return d;for(let _ of i.itemsById.keys())d[_]=!0;return d}}}}function wo(){let e=He("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let i of Array.from(n))try{i()}catch{}}function a(i,d,_){let m=d?en(d):"",h=r.get(i)||"",w=t.has(i);if(e("register %s key=%s (prev=%s)",i,m,h),w&&h&&m&&h!==m){let $=t.get(i);if($)try{$.dispose()}catch{}let g=s.get(i);if(g){try{g()}catch{}s.delete(i)}let E=zn(i,_);t.set(i,E);let j=E.subscribe(()=>o());s.set(i,j)}else if(!w){let $=zn(i,_);t.set(i,$);let g=$.subscribe(()=>o());s.set(i,g)}return r.set(i,m),()=>c(i)}function c(i){e("unregister %s",i),r.delete(i);let d=t.get(i);d&&(d.dispose(),t.delete(i));let _=s.get(i);if(_){try{_()}catch{}s.delete(i)}}return{register:a,unregister:c,getStore(i){return t.get(i)||null},snapshotFor(i){let d=t.get(i);return d?d.snapshot().slice():[]},subscribe(i){return n.add(i),()=>n.delete(i)}}}function $o(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function xo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Hn(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function rl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function nl(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function So(e){let t=He("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):rl(n),a=nl(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let i=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==i&&(window.location.hash=i)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Hn(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Hn(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var sl=Object.freeze({workspace_config:{default_workspace:null}});function Ao(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:sl.workspace_config.default_workspace}}}function To(e={}){let t=He("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Ao(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Ao(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),i=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!i||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Eo(e){let t=He("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function i(d){return async(m,h)=>{let w=s++,$=Date.now();n.set(w,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",w,m,r+1),a();let g=!1,E=()=>{g||(g=!0,n.delete(w),c())},j=setTimeout(()=>{g||(t("request TIMEOUT id=%d type=%s elapsed=%dms",w,m,Date.now()-$),E())},3e4);try{let Y=await d(m,h),Z=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",w,m,Z),Y}catch(Y){let Z=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",w,m,Z,Y),Y}finally{clearTimeout(j),E()}}}return o(),{wrapSend:i,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function ne(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function tn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let i=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return i.sort(vo),i;switch(c){case"created_desc":return i.sort(er),i;case"created_asc":return i.sort(go),i;case"updated_desc":return i.sort(ho),i;case"priority":return i.sort(bo),i;case"manual":default:{let d=r();return d?i.sort(Jr(d)):i.sort(er),i}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Tr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ct(e){let t=Tr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function yt(e,t){let r=Tr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let i=Math.floor(c/7);if(c<30)return`${i}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function rn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Tr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function nn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let i={...a.order};for(let d of c)i[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:i})}async function o(a,c,i){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Un(c,i,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let w=n(Un(c,i,h.order),a);s(h,w);let $=await t("ui-order-set",{expected_revision:h.revision,entries:w});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function sn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Wn(e,t){return!t||typeof e!="string"||e.length===0||sn(t.visible_labels).includes(e)?!0:sn(t.hidden_labels).includes(e)?!1:!sn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function on(e,t){return sn(e).filter(r=>Wn(r,t))}function tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var ol={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg"},Co={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge"},al={spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},il={review:"\u2713",skip:"\u2298"},Wt={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ll(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Ro(e){let t=e&&e.fill||"none";return t==="none"?Wt.none:e&&e.stale===!0?Wt.stale:t==="dim"?Wt.dim:e&&e.glyph==="review"?Wt.review:e&&e.glyph==="skip"?Wt.skip:Wt.done}function cl(e){if(!e||!e.approval_state)return Ro(e);let t=[];return e.glyph==="review"?t.push(Wt.review):e.glyph==="skip"&&t.push(Wt.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function dl(e,t,r){let n=ol[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=il[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let i=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${i}>
        ${Co[e]||e}
      </div>
    </div>
  `}function an(e,t){if(!e||!e.stages)return"";let r=e.route==="full_plan"?"full_plan":"spec_backed",n=al[r],s=e.stages,o=ll(n,s,String(t||"open")),a=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${n.map(c=>`${Co[c]||c} ${c==="plan"?cl(s[c]||{}):Ro(s[c]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${a}>
      ${n.map(c=>dl(c,s[c]||{},c===o))}
    </div>
  `}function ul(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Io=2;function pl(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Io).join(", "),s=r.length-Io,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function fl(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&tr(r,"route")){let o=n.route_source==="derived";s.push(l`<span
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
      </button>`),tr(r,"blocked")&&s.push(...pl(e.blocked_info)),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function _l(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function ml(e){let t=yt(e.created_at),r=yt(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
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
  </span>`}function gl(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(yo):r.children;return l`
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
        ${ml(e)}
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
                  <span class=${_l(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function ln(e,t){let r=ul(e.priority);return l`
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
      ${fl(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?an(e.workflow,e.status):""}
      ${gl(e,t)}
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
  `}function Lo(e,t,r){return l`
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
  `}var hl=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],bl=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],vl=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function yl(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Do(e,t,r){return l`
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
        ${hl.map(n=>l`<option
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
        ${bl.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${yl(e,t,r)}
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
        ${vl.map(n=>l`<option
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
  `}var kl=200,wl={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},$l=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),Oo="beads-ui.board.sort",Mo=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function xl(){try{let e=window.localStorage.getItem(Oo);if(e&&Mo.has(e))return e}catch{}return"created_desc"}function No(e,t){let r=He("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,i=t.onClosedRangeChange,d=t.onNewIssue,_=t.closedRange||kt,m=s?tn(s,a):null,h=nn({transport:o,uiOrderStore:a}),w=[],$=[],g=[],E=[],j=[],Y=[],Z=!1,M=0,A=xl(),x=new Map,P=new Map,H=new Map,ce=new Set,J={search:"",priority:"",type:"",labels:[]},ae=!1,fe=null;function Le(I){return String(I.status||"open")==="open"}function Ye(I){let B=String(I.status||"open");return B==="open"||B==="blocked"}function Se(I){let B=J.search.trim().toLowerCase(),re=J.priority,se=J.type,ie=J.labels;return I.filter(ve=>{if(B){let u=String(ve.id||"").toLowerCase(),v=String(ve.title||"").toLowerCase();if(!u.includes(B)&&!v.includes(B))return!1}if(re!==""&&String(ve.priority)!==re||se!==""&&String(ve.issue_type||"")!==se)return!1;if(ie.length>0){let u=Array.isArray(ve.labels)?ve.labels:[];if(!ie.some(v=>u.includes(v)))return!1}return!0})}function T(){let I=new Set;for(let B of[w,$,g,E,j,Y])for(let re of B){let se=Array.isArray(re.labels)?re.labels:[];for(let ie of se)typeof ie=="string"&&ie.length>0&&I.add(ie)}return Array.from(I).sort()}function K(){return J.search.trim()!==""||J.priority!==""||J.type!==""||J.labels.length>0}function O(){try{if(m){let I=m.selectBoardColumn("tab:board:in-progress","in_progress",A),B=m.selectBoardColumn("tab:board:blocked","blocked",A).filter(Ye),re=new Set(I.map(X=>X.id)),se=m.selectBoardColumn("tab:board:ready","ready",A).filter(X=>Le(X)&&!re.has(X.id)),ie=m.selectBoardColumn("tab:board:resolved","resolved",A),ve=m.selectBoardColumn("tab:board:deferred","deferred",A),u=m.selectBoardColumn("tab:board:closed","closed").slice(0,kl),v=[...B,...se,...I,...ie,...u];W(v);let L=new Set;for(let X of v)X&&X.id&&!Gn(X)&&L.add(X.id);let Q=!K();w=Q?Er(B,L):B,$=Q?Er(se,L):se,g=Q?Er(I,L):I,E=Q?Er(ie,L):ie,j=ve,M=ve.length,Y=Q?Er(u,L):u,x=new Map;for(let X of w)x.set(X.id,"open");for(let X of $)x.set(X.id,"open");for(let X of g)x.set(X.id,"in_progress");for(let X of E)x.set(X.id,"resolved");for(let X of j)x.set(X.id,"deferred");for(let X of Y)x.set(X.id,"closed");P=new Map;for(let X of w)P.set(X.id,"blocked-col");for(let X of $)P.set(X.id,"ready-col");for(let X of g)P.set(X.id,"in-progress-col");for(let X of E)P.set(X.id,"resolved-col");for(let X of Y)P.set(X.id,"closed-col")}Ae()}catch{w=[],$=[],g=[],E=[],j=[],Y=[],H=new Map,Ae()}}function W(I){let B=new Map;for(let se of I)se&&se.id&&!B.has(se.id)&&B.set(se.id,se);let re=new Map;for(let se of B.values()){let ie=Gn(se);if(!ie)continue;let ve=re.get(ie);ve||(ve=[],re.set(ie,ve)),ve.push({id:se.id,title:se.title,status:se.status,metadata:se.metadata,created_at:se.created_at,updated_at:se.updated_at})}H=re}function de(I){let B=H.get(I)||[],re=0;for(let ie of B)(ie.status==="resolved"||ie.status==="closed")&&(re+=1);let se=rn(B);return{total:B.length,count:re,current:se,children:B}}function le(I){return!ce.has(I)}function ye(I,B){I.preventDefault(),I.stopPropagation(),ce.has(B)?ce.delete(B):ce.add(B),Ae()}function _e(I,B){I.preventDefault(),I.stopPropagation(),n(B)}function Ue(I,B){I.preventDefault(),I.stopPropagation(),n(B)}function ue(I,B){fe||n(B)}function Oe(I,B){I.preventDefault(),I.stopPropagation(),Sl(B).then(re=>{re&&ne("\uBCF5\uC0AC\uB428","success",1200)})}function F(I,B){fe=B,I.dataTransfer&&(I.dataTransfer.setData("text/plain",B),I.dataTransfer.effectAllowed="move"),I.target.classList.add("board-card--dragging")}function N(I){I.target.classList.remove("board-card--dragging"),bt(),setTimeout(()=>{fe=null},0)}function pe(I){let B=String(I.target.value||"");!B||B===_||(_=B,i&&i(B),Ae())}function qe(){return c?c.get():null}let D={onCardClick:ue,onCopyId:Oe,onDragStart:F,onDragEnd:N,onClosedRangeChange:pe,rollupFor:de,isExpanded:le,onRollupToggle:ye,onChildClick:_e,onFromChipClick:Ue,get policy(){return qe()}};function G(I,B){fe||(We(),n(B))}function R(I,B){I.preventDefault(),I.stopPropagation(),We(),n(B)}let te={...D,onCardClick:G,onChildClick:R,onFromChipClick:R,get policy(){return qe()}};function ee(I){let B=I.target,re=e.querySelector(".board-filter__labels");B&&re&&re.contains(B)||$e()}function ge(I){I.key==="Escape"&&$e()}function he(){ae||(ae=!0,document.addEventListener("mousedown",ee),document.addEventListener("keydown",ge),Ae())}function $e(){ae&&(ae=!1,document.removeEventListener("mousedown",ee),document.removeEventListener("keydown",ge),Ae())}function Re(I){I.key==="Escape"&&We()}function rt(){Z||(Z=!0,document.addEventListener("keydown",Re),Ae())}function We(){Z&&(Z=!1,document.removeEventListener("keydown",Re),Ae())}let Xe={onClose:We,onOverlayClick(I){I.target===I.currentTarget&&We()}},dt={onSearchInput(I){J.search=String(I.target.value||""),O()},onPriorityChange(I){J.priority=String(I.target.value||""),O()},onTypeChange(I){J.type=String(I.target.value||""),O()},onSortChange(I){let B=String(I.target.value||"");if(!(!Mo.has(B)||B===A)){A=B;try{window.localStorage.setItem(Oo,B)}catch{}O()}},onDeferredToggle(){Z?We():rt()},onLabelMenuToggle(){ae?$e():he()},onLabelToggle(I){let B=J.labels.indexOf(I);B===-1?J.labels.push(I):J.labels.splice(B,1),O()},onLabelClear(){J.labels.length!==0&&(J.labels=[],O())},onNewIssue(){d&&d()}};function ut(){return l`
      <div class="board-view">
        ${Do(J,dt,{sort_mode:A,deferred_popup_open:Z,deferred_count:M,label_options:T(),label_menu_open:ae})}
        <div class="board-root">
          ${mr({title:"Blocked",id:"blocked-col",items:Se(w)},D)}
          ${mr({title:"Ready",id:"ready-col",items:Se($)},D)}
          ${mr({title:"In progress",id:"in-progress-col",items:Se(g)},D)}
          ${mr({title:"Resolved",id:"resolved-col",items:Se(E)},D)}
          ${mr({title:"Closed",id:"closed-col",items:Se(Y),is_closed:!0,closed_range:_},D)}
        </div>
        ${Z?Lo({items:Se(j),count:M},te,Xe):""}
      </div>
    `}function Ae(){De(ut(),e),it()}function it(){try{let I=e.querySelector("#deferred-popup");I&&!I.open&&(typeof I.showModal=="function"?I.showModal():I.setAttribute("open",""));let B=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let re of B)Array.from(re.querySelectorAll(".board-card")).forEach((ie,ve)=>{ie.tabIndex=ve===0?0:-1})}catch{}}async function ze(I,B){if(!o){ne("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:I,status:B}),ne("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(re){r("update-status failed: %o",re),ne("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function at(I){switch(I){case"blocked-col":return w;case"ready-col":return $;case"in-progress-col":return g;case"resolved-col":return E;default:return[]}}function pt(I,B,re){if(!o||!a)return;let se=at(I),ie=se.find(Q=>Q.id===B);if(!ie)return;let ve=se.filter(Q=>Q.id!==B),u=re.closest?re.closest(".board-card"):null,v=ve.length;if(u){let Q=u.getAttribute("data-issue-id");if(Q===B)return;let X=ve.findIndex(me=>me.id===Q);X>=0&&(v=X)}let L=ve.slice();L.splice(v,0,ie),h.applyReorder(B,L,v)}function bt(){for(let I of Array.from(e.querySelectorAll(".board-column--drag-over")))I.classList.remove("board-column--drag-over")}let Be=null;e.addEventListener("dragover",I=>{I.preventDefault(),I.dataTransfer&&(I.dataTransfer.dropEffect="move");let re=I.target.closest(".board-column");re&&re!==Be&&(Be&&Be.classList.remove("board-column--drag-over"),re.classList.add("board-column--drag-over"),Be=re)}),e.addEventListener("dragleave",I=>{let B=I.relatedTarget;(!B||!e.contains(B))&&Be&&(Be.classList.remove("board-column--drag-over"),Be=null)}),e.addEventListener("drop",I=>{I.preventDefault(),Be&&(Be.classList.remove("board-column--drag-over"),Be=null);let B=I.target,re=B.closest(".board-column");if(!re)return;let se=I.dataTransfer?.getData("text/plain")||"";if(!se)return;let ie=re.id,ve=P.get(se);if(ve&&ve===ie){if($l.has(ie)){if(A!=="manual"){ne("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(ie,se,B)}return}let u=wl[ie];if(!u){ne("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}x.get(se)!==u&&ze(se,u)}),e.addEventListener("keydown",I=>{let B=I.target;if(!(B instanceof HTMLElement))return;let re=String(B.tagName||"").toLowerCase();if(re==="input"||re==="textarea"||re==="select"||re==="button"||re==="a"||B.isContentEditable===!0)return;let se=B.closest(".board-card");if(!se)return;let ie=String(I.key||"");if(ie==="Enter"||ie===" "){I.preventDefault();let L=se.getAttribute("data-issue-id");L&&n(L);return}if(ie!=="ArrowUp"&&ie!=="ArrowDown"&&ie!=="ArrowLeft"&&ie!=="ArrowRight")return;I.preventDefault();let ve=se.closest(".board-column");if(!ve)return;let u=Array.from(ve.querySelectorAll(".board-card")),v=u.indexOf(se);if(ie==="ArrowDown"&&v<u.length-1){lt(se,u[v+1]);return}if(ie==="ArrowUp"&&v>0){lt(se,u[v-1]);return}if(ie==="ArrowLeft"||ie==="ArrowRight"){let L=Array.from(e.querySelectorAll(".board-column")),Q=L.indexOf(ve),X=ie==="ArrowRight"?1:-1,me=Q+X;for(;me>=0&&me<L.length;){let Ee=L[me].querySelector(".board-card");if(Ee){lt(se,Ee);return}me+=X}}});function lt(I,B){try{I.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let Ve=null;m&&m.subscribe&&(Ve=m.subscribe(()=>{try{O()}catch{}}));let et=null;return c&&c.subscribe&&(et=c.subscribe(()=>{try{O()}catch{}})),{async load(){r("load"),O()},clear(){$e(),We(),Ve&&(Ve(),Ve=null),et&&(et(),et=null),e.replaceChildren(),w=[],$=[],g=[],E=[],j=[],Y=[],x=new Map,P=new Map}}}function Gn(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Er(e,t){return e.filter(r=>{let n=Gn(r);return!(n&&t.has(n))})}async function Sl(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var Al="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function nr(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var qt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"];function Po(e){let t=0;for(let r of qt)t+=nr(e?.[r]);return t}function Fo(e){return!e||typeof e!="object"?!1:qt.some(t=>Number.isFinite(e[t]))}function Tl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function gr(e){return Fo(e)?`\u03C4 ${Tl(Po(e))}`:null}function At(e){let t=gr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function hr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${nr(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${nr(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${nr(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${nr(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${Po(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Al),r.join(`
`)}function Dt(e,t){let r={input_tokens:0,output_tokens:0,cache_read_input_tokens:0,cache_creation_input_tokens:0},n=0,s=0,o=0,a=!1;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let i=c.usage;if(Fo(i)){n+=1;for(let d of qt)r[d]=nr(r[d])+nr(i[d]);typeof i.total_cost_usd=="number"&&Number.isFinite(i.total_cost_usd)&&(s+=i.total_cost_usd,o+=1),i.replayed===!0&&(a=!0)}}return n===0?null:(o===n&&(r.total_cost_usd=s),a&&(r.replayed=!0),r)}var{entries:Yo,setPrototypeOf:qo,isFrozen:El,getPrototypeOf:Cl,getOwnPropertyDescriptor:Rl}=Object,{freeze:_t,seal:wt,create:Qn}=Object,{apply:Jn,construct:es}=typeof Reflect<"u"&&Reflect;_t||(_t=function(t){return t});wt||(wt=function(t){return t});Jn||(Jn=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});es||(es=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var cn=mt(Array.prototype.forEach),Il=mt(Array.prototype.lastIndexOf),Bo=mt(Array.prototype.pop),Cr=mt(Array.prototype.push),Ll=mt(Array.prototype.splice),un=mt(String.prototype.toLowerCase),jn=mt(String.prototype.toString),Yn=mt(String.prototype.match),Rr=mt(String.prototype.replace),Dl=mt(String.prototype.indexOf),Ol=mt(String.prototype.trim),Tt=mt(Object.prototype.hasOwnProperty),ft=mt(RegExp.prototype.test),Ir=Ml(TypeError);function mt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Jn(e,t,n)}}function Ml(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return es(e,r)}}function xe(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:un;qo&&qo(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(El(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nl(e){for(let t=0;t<e.length;t++)Tt(e,t)||(e[t]=null);return e}function Bt(e){let t=Qn(null);for(let[r,n]of Yo(e))Tt(e,r)&&(Array.isArray(n)?t[r]=Nl(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Bt(n):t[r]=n);return t}function Lr(e,t){for(;e!==null;){let n=Rl(e,t);if(n){if(n.get)return mt(n.get);if(typeof n.value=="function")return mt(n.value)}e=Cl(e)}function r(){return null}return r}var Uo=_t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Vn=_t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Kn=_t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pl=_t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Zn=_t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Fl=_t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),zo=_t(["#text"]),Ho=_t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Xn=_t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Wo=_t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),dn=_t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ql=wt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Bl=wt(/<%[\w\W]*|[\w\W]*%>/gm),Ul=wt(/\$\{[\w\W]*/gm),zl=wt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hl=wt(/^aria-[\-\w]+$/),Vo=wt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wl=wt(/^(?:\w+script|data):/i),Gl=wt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ko=wt(/^html$/i),jl=wt(/^[a-z][.\w]*(-[.\w]+)+$/i),Go=Object.freeze({__proto__:null,ARIA_ATTR:Hl,ATTR_WHITESPACE:Gl,CUSTOM_ELEMENT:jl,DATA_ATTR:zl,DOCTYPE_NAME:Ko,ERB_EXPR:Bl,IS_ALLOWED_URI:Vo,IS_SCRIPT_OR_DATA:Wl,MUSTACHE_EXPR:ql,TMPLIT_EXPR:Ul}),Dr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Yl=function(){return typeof window>"u"?null:window},Vl=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},jo=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Zo(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yl(),t=C=>Zo(C);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Dr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:i,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:w}=e,$=i.prototype,g=Lr($,"cloneNode"),E=Lr($,"remove"),j=Lr($,"nextSibling"),Y=Lr($,"childNodes"),Z=Lr($,"parentNode");if(typeof a=="function"){let C=r.createElement("template");C.content&&C.content.ownerDocument&&(r=C.content.ownerDocument)}let M,A="",{implementation:x,createNodeIterator:P,createDocumentFragment:H,getElementsByTagName:ce}=r,{importNode:J}=n,ae=jo();t.isSupported=typeof Yo=="function"&&typeof Z=="function"&&x&&x.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:Le,TMPLIT_EXPR:Ye,DATA_ATTR:Se,ARIA_ATTR:T,IS_SCRIPT_OR_DATA:K,ATTR_WHITESPACE:O,CUSTOM_ELEMENT:W}=Go,{IS_ALLOWED_URI:de}=Go,le=null,ye=xe({},[...Uo,...Vn,...Kn,...Zn,...zo]),_e=null,Ue=xe({},[...Ho,...Xn,...Wo,...dn]),ue=Object.seal(Qn(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Oe=null,F=null,N=Object.seal(Qn(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),pe=!0,qe=!0,D=!1,G=!0,R=!1,te=!0,ee=!1,ge=!1,he=!1,$e=!1,Re=!1,rt=!1,We=!0,Xe=!1,dt="user-content-",ut=!0,Ae=!1,it={},ze=null,at=xe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,bt=xe({},["audio","video","img","source","image","track"]),Be=null,lt=xe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ve="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",I="http://www.w3.org/1999/xhtml",B=I,re=!1,se=null,ie=xe({},[Ve,et,I],jn),ve=xe({},["mi","mo","mn","ms","mtext"]),u=xe({},["annotation-xml"]),v=xe({},["title","style","font","a","script"]),L=null,Q=["application/xhtml+xml","text/html"],X="text/html",me=null,Ee=null,Ne=r.createElement("form"),Ke=function(p){return p instanceof RegExp||p instanceof Function},nt=function(){let p=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===p)){if((!p||typeof p!="object")&&(p={}),p=Bt(p),L=Q.indexOf(p.PARSER_MEDIA_TYPE)===-1?X:p.PARSER_MEDIA_TYPE,me=L==="application/xhtml+xml"?jn:un,le=Tt(p,"ALLOWED_TAGS")?xe({},p.ALLOWED_TAGS,me):ye,_e=Tt(p,"ALLOWED_ATTR")?xe({},p.ALLOWED_ATTR,me):Ue,se=Tt(p,"ALLOWED_NAMESPACES")?xe({},p.ALLOWED_NAMESPACES,jn):ie,Be=Tt(p,"ADD_URI_SAFE_ATTR")?xe(Bt(lt),p.ADD_URI_SAFE_ATTR,me):lt,pt=Tt(p,"ADD_DATA_URI_TAGS")?xe(Bt(bt),p.ADD_DATA_URI_TAGS,me):bt,ze=Tt(p,"FORBID_CONTENTS")?xe({},p.FORBID_CONTENTS,me):at,Oe=Tt(p,"FORBID_TAGS")?xe({},p.FORBID_TAGS,me):Bt({}),F=Tt(p,"FORBID_ATTR")?xe({},p.FORBID_ATTR,me):Bt({}),it=Tt(p,"USE_PROFILES")?p.USE_PROFILES:!1,pe=p.ALLOW_ARIA_ATTR!==!1,qe=p.ALLOW_DATA_ATTR!==!1,D=p.ALLOW_UNKNOWN_PROTOCOLS||!1,G=p.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=p.SAFE_FOR_TEMPLATES||!1,te=p.SAFE_FOR_XML!==!1,ee=p.WHOLE_DOCUMENT||!1,$e=p.RETURN_DOM||!1,Re=p.RETURN_DOM_FRAGMENT||!1,rt=p.RETURN_TRUSTED_TYPE||!1,he=p.FORCE_BODY||!1,We=p.SANITIZE_DOM!==!1,Xe=p.SANITIZE_NAMED_PROPS||!1,ut=p.KEEP_CONTENT!==!1,Ae=p.IN_PLACE||!1,de=p.ALLOWED_URI_REGEXP||Vo,B=p.NAMESPACE||I,ve=p.MATHML_TEXT_INTEGRATION_POINTS||ve,u=p.HTML_INTEGRATION_POINTS||u,ue=p.CUSTOM_ELEMENT_HANDLING||{},p.CUSTOM_ELEMENT_HANDLING&&Ke(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Ke(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(qe=!1),Re&&($e=!0),it&&(le=xe({},zo),_e=[],it.html===!0&&(xe(le,Uo),xe(_e,Ho)),it.svg===!0&&(xe(le,Vn),xe(_e,Xn),xe(_e,dn)),it.svgFilters===!0&&(xe(le,Kn),xe(_e,Xn),xe(_e,dn)),it.mathMl===!0&&(xe(le,Zn),xe(_e,Wo),xe(_e,dn))),p.ADD_TAGS&&(typeof p.ADD_TAGS=="function"?N.tagCheck=p.ADD_TAGS:(le===ye&&(le=Bt(le)),xe(le,p.ADD_TAGS,me))),p.ADD_ATTR&&(typeof p.ADD_ATTR=="function"?N.attributeCheck=p.ADD_ATTR:(_e===Ue&&(_e=Bt(_e)),xe(_e,p.ADD_ATTR,me))),p.ADD_URI_SAFE_ATTR&&xe(Be,p.ADD_URI_SAFE_ATTR,me),p.FORBID_CONTENTS&&(ze===at&&(ze=Bt(ze)),xe(ze,p.FORBID_CONTENTS,me)),ut&&(le["#text"]=!0),ee&&xe(le,["html","head","body"]),le.table&&(xe(le,["tbody"]),delete Oe.tbody),p.TRUSTED_TYPES_POLICY){if(typeof p.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ir('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof p.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ir('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');M=p.TRUSTED_TYPES_POLICY,A=M.createHTML("")}else M===void 0&&(M=Vl(w,s)),M!==null&&typeof A=="string"&&(A=M.createHTML(""));_t&&_t(p),Ee=p}},ke=xe({},[...Vn,...Kn,...Pl]),st=xe({},[...Zn,...Fl]),$t=function(p){let S=Z(p);(!S||!S.tagName)&&(S={namespaceURI:B,tagName:"template"});let U=un(p.tagName),Te=un(S.tagName);return se[p.namespaceURI]?p.namespaceURI===et?S.namespaceURI===I?U==="svg":S.namespaceURI===Ve?U==="svg"&&(Te==="annotation-xml"||ve[Te]):!!ke[U]:p.namespaceURI===Ve?S.namespaceURI===I?U==="math":S.namespaceURI===et?U==="math"&&u[Te]:!!st[U]:p.namespaceURI===I?S.namespaceURI===et&&!u[Te]||S.namespaceURI===Ve&&!ve[Te]?!1:!st[U]&&(v[U]||!ke[U]):!!(L==="application/xhtml+xml"&&se[p.namespaceURI]):!1},Ge=function(p){Cr(t.removed,{element:p});try{Z(p).removeChild(p)}catch{E(p)}},ot=function(p,S){try{Cr(t.removed,{attribute:S.getAttributeNode(p),from:S})}catch{Cr(t.removed,{attribute:null,from:S})}if(S.removeAttribute(p),p==="is")if($e||Re)try{Ge(S)}catch{}else try{S.setAttribute(p,"")}catch{}},be=function(p){let S=null,U=null;if(he)p="<remove></remove>"+p;else{let je=Yn(p,/^[\r\n\t ]+/);U=je&&je[0]}L==="application/xhtml+xml"&&B===I&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");let Te=M?M.createHTML(p):p;if(B===I)try{S=new h().parseFromString(Te,L)}catch{}if(!S||!S.documentElement){S=x.createDocument(B,"template",null);try{S.documentElement.innerHTML=re?A:Te}catch{}}let tt=S.body||S.documentElement;return p&&U&&tt.insertBefore(r.createTextNode(U),tt.childNodes[0]||null),B===I?ce.call(S,ee?"html":"body")[0]:ee?S.documentElement:tt},Ce=function(p){return P.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},xt=function(p){return p instanceof m&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof _)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function"||typeof p.hasChildNodes!="function")},Mt=function(p){return typeof c=="function"&&p instanceof c};function we(C,p,S){cn(C,U=>{U.call(t,p,S,Ee)})}let y=function(p){let S=null;if(we(ae.beforeSanitizeElements,p,null),xt(p))return Ge(p),!0;let U=me(p.nodeName);if(we(ae.uponSanitizeElement,p,{tagName:U,allowedTags:le}),te&&p.hasChildNodes()&&!Mt(p.firstElementChild)&&ft(/<[/\w!]/g,p.innerHTML)&&ft(/<[/\w!]/g,p.textContent)||p.nodeType===Dr.progressingInstruction||te&&p.nodeType===Dr.comment&&ft(/<[/\w]/g,p.data))return Ge(p),!0;if(!(N.tagCheck instanceof Function&&N.tagCheck(U))&&(!le[U]||Oe[U])){if(!Oe[U]&&q(U)&&(ue.tagNameCheck instanceof RegExp&&ft(ue.tagNameCheck,U)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(U)))return!1;if(ut&&!ze[U]){let Te=Z(p)||p.parentNode,tt=Y(p)||p.childNodes;if(tt&&Te){let je=tt.length;for(let Qe=je-1;Qe>=0;--Qe){let vt=g(tt[Qe],!0);vt.__removalCount=(p.__removalCount||0)+1,Te.insertBefore(vt,j(p))}}}return Ge(p),!0}return p instanceof i&&!$t(p)||(U==="noscript"||U==="noembed"||U==="noframes")&&ft(/<\/no(script|embed|frames)/i,p.innerHTML)?(Ge(p),!0):(R&&p.nodeType===Dr.text&&(S=p.textContent,cn([fe,Le,Ye],Te=>{S=Rr(S,Te," ")}),p.textContent!==S&&(Cr(t.removed,{element:p.cloneNode()}),p.textContent=S)),we(ae.afterSanitizeElements,p,null),!1)},z=function(p,S,U){if(We&&(S==="id"||S==="name")&&(U in r||U in Ne))return!1;if(!(qe&&!F[S]&&ft(Se,S))){if(!(pe&&ft(T,S))){if(!(N.attributeCheck instanceof Function&&N.attributeCheck(S,p))){if(!_e[S]||F[S]){if(!(q(p)&&(ue.tagNameCheck instanceof RegExp&&ft(ue.tagNameCheck,p)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(p))&&(ue.attributeNameCheck instanceof RegExp&&ft(ue.attributeNameCheck,S)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(S,p))||S==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&ft(ue.tagNameCheck,U)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(U))))return!1}else if(!Be[S]){if(!ft(de,Rr(U,O,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&p!=="script"&&Dl(U,"data:")===0&&pt[p])){if(!(D&&!ft(K,Rr(U,O,"")))){if(U)return!1}}}}}}}return!0},q=function(p){return p!=="annotation-xml"&&Yn(p,W)},f=function(p){we(ae.beforeSanitizeAttributes,p,null);let{attributes:S}=p;if(!S||xt(p))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:_e,forceKeepAttr:void 0},Te=S.length;for(;Te--;){let tt=S[Te],{name:je,namespaceURI:Qe,value:vt}=tt,Nt=me(je),ar=vt,Je=je==="value"?ar:Ol(ar);if(U.attrName=Nt,U.attrValue=Je,U.keepAttr=!0,U.forceKeepAttr=void 0,we(ae.uponSanitizeAttribute,p,U),Je=U.attrValue,Xe&&(Nt==="id"||Nt==="name")&&(ot(je,p),Je=dt+Je),te&&ft(/((--!?|])>)|<\/(style|title|textarea)/i,Je)){ot(je,p);continue}if(Nt==="attributename"&&Yn(Je,"href")){ot(je,p);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){ot(je,p);continue}if(!G&&ft(/\/>/i,Je)){ot(je,p);continue}R&&cn([fe,Le,Ye],jr=>{Je=Rr(Je,jr," ")});let ir=me(p.nodeName);if(!z(ir,Nt,Je)){ot(je,p);continue}if(M&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!Qe)switch(w.getAttributeType(ir,Nt)){case"TrustedHTML":{Je=M.createHTML(Je);break}case"TrustedScriptURL":{Je=M.createScriptURL(Je);break}}if(Je!==ar)try{Qe?p.setAttributeNS(Qe,je,Je):p.setAttribute(je,Je),xt(p)?Ge(p):Bo(t.removed)}catch{ot(je,p)}}we(ae.afterSanitizeAttributes,p,null)},b=function C(p){let S=null,U=Ce(p);for(we(ae.beforeSanitizeShadowDOM,p,null);S=U.nextNode();)we(ae.uponSanitizeShadowNode,S,null),y(S),f(S),S.content instanceof o&&C(S.content);we(ae.afterSanitizeShadowDOM,p,null)};return t.sanitize=function(C){let p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,U=null,Te=null,tt=null;if(re=!C,re&&(C="<!-->"),typeof C!="string"&&!Mt(C))if(typeof C.toString=="function"){if(C=C.toString(),typeof C!="string")throw Ir("dirty is not a string, aborting")}else throw Ir("toString is not a function");if(!t.isSupported)return C;if(ge||nt(p),t.removed=[],typeof C=="string"&&(Ae=!1),Ae){if(C.nodeName){let vt=me(C.nodeName);if(!le[vt]||Oe[vt])throw Ir("root node is forbidden and cannot be sanitized in-place")}}else if(C instanceof c)S=be("<!---->"),U=S.ownerDocument.importNode(C,!0),U.nodeType===Dr.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?S=U:S.appendChild(U);else{if(!$e&&!R&&!ee&&C.indexOf("<")===-1)return M&&rt?M.createHTML(C):C;if(S=be(C),!S)return $e?null:rt?A:""}S&&he&&Ge(S.firstChild);let je=Ce(Ae?C:S);for(;Te=je.nextNode();)y(Te),f(Te),Te.content instanceof o&&b(Te.content);if(Ae)return C;if($e){if(Re)for(tt=H.call(S.ownerDocument);S.firstChild;)tt.appendChild(S.firstChild);else tt=S;return(_e.shadowroot||_e.shadowrootmode)&&(tt=J.call(n,tt,!0)),tt}let Qe=ee?S.outerHTML:S.innerHTML;return ee&&le["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&ft(Ko,S.ownerDocument.doctype.name)&&(Qe="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+Qe),R&&cn([fe,Le,Ye],vt=>{Qe=Rr(Qe,vt," ")}),M&&rt?M.createHTML(Qe):Qe},t.setConfig=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};nt(C),ge=!0},t.clearConfig=function(){Ee=null,ge=!1},t.isValidAttribute=function(C,p,S){Ee||nt({});let U=me(C),Te=me(p);return z(U,Te,S)},t.addHook=function(C,p){typeof p=="function"&&Cr(ae[C],p)},t.removeHook=function(C,p){if(p!==void 0){let S=Il(ae[C],p);return S===-1?void 0:Ll(ae[C],S,1)[0]}return Bo(ae[C])},t.removeHooks=function(C){ae[C]=[]},t.removeAllHooks=function(){ae=jo()},t}var Xo=Zo();var Qo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Jo=e=>(...t)=>({_$litDirective$:e,values:t}),pn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Or=class extends pn{constructor(t){if(super(t),this.it=Ze,t.type!==Qo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ze||t==null)return this._t=void 0,this.it=t;if(t===Qt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Or.directiveName="unsafeHTML",Or.resultType=1;var ea=Jo(Or);function ss(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var or=ss();function ia(e){or=e}var Fr={exec:()=>null};function Ie(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(gt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Kl=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),gt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Zl=/^(?:[ \t]*(?:\n|$))+/,Xl=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ql=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,qr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Jl=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,os=/(?:[*+-]|\d{1,9}[.)])/,la=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ca=Ie(la).replace(/bull/g,os).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ec=Ie(la).replace(/bull/g,os).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),as=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,tc=/^[^\n]+/,is=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,rc=Ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",is).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),nc=Ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,os).getRegex(),bn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ls=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,sc=Ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ls).replace("tag",bn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),da=Ie(as).replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),oc=Ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",da).getRegex(),cs={blockquote:oc,code:Xl,def:rc,fences:Ql,heading:Jl,hr:qr,html:sc,lheading:ca,list:nc,newline:Zl,paragraph:da,table:Fr,text:tc},ta=Ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex(),ac={...cs,lheading:ec,table:ta,paragraph:Ie(as).replace("hr",qr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ta).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",bn).getRegex()},ic={...cs,html:Ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ls).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Fr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ie(as).replace("hr",qr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ca).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},lc=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,cc=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,ua=/^( {2,}|\\)\n(?!\s*$)/,dc=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,vn=/[\p{P}\p{S}]/u,ds=/[\s\p{P}\p{S}]/u,pa=/[^\s\p{P}\p{S}]/u,uc=Ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ds).getRegex(),fa=/(?!~)[\p{P}\p{S}]/u,pc=/(?!~)[\s\p{P}\p{S}]/u,fc=/(?:[^\s\p{P}\p{S}]|~)/u,_c=Ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kl?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),_a=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,mc=Ie(_a,"u").replace(/punct/g,vn).getRegex(),gc=Ie(_a,"u").replace(/punct/g,fa).getRegex(),ma="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",hc=Ie(ma,"gu").replace(/notPunctSpace/g,pa).replace(/punctSpace/g,ds).replace(/punct/g,vn).getRegex(),bc=Ie(ma,"gu").replace(/notPunctSpace/g,fc).replace(/punctSpace/g,pc).replace(/punct/g,fa).getRegex(),vc=Ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,pa).replace(/punctSpace/g,ds).replace(/punct/g,vn).getRegex(),yc=Ie(/\\(punct)/,"gu").replace(/punct/g,vn).getRegex(),kc=Ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wc=Ie(ls).replace("(?:-->|$)","-->").getRegex(),$c=Ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wc).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),mn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,xc=Ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",mn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),ga=Ie(/^!?\[(label)\]\[(ref)\]/).replace("label",mn).replace("ref",is).getRegex(),ha=Ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",is).getRegex(),Sc=Ie("reflink|nolink(?!\\()","g").replace("reflink",ga).replace("nolink",ha).getRegex(),ra=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,us={_backpedal:Fr,anyPunctuation:yc,autolink:kc,blockSkip:_c,br:ua,code:cc,del:Fr,emStrongLDelim:mc,emStrongRDelimAst:hc,emStrongRDelimUnd:vc,escape:lc,link:xc,nolink:ha,punctuation:uc,reflink:ga,reflinkSearch:Sc,tag:$c,text:dc,url:Fr},Ac={...us,link:Ie(/^!?\[(label)\]\((.*?)\)/).replace("label",mn).getRegex(),reflink:Ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",mn).getRegex()},ts={...us,emStrongRDelimAst:bc,emStrongLDelim:gc,url:Ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ra).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ra).getRegex()},Tc={...ts,br:Ie(ua).replace("{2,}","*").getRegex(),text:Ie(ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},fn={normal:cs,gfm:ac,pedantic:ic},Mr={normal:us,gfm:ts,breaks:Tc,pedantic:Ac},Ec={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},na=e=>Ec[e];function Ut(e,t){if(t){if(gt.escapeTest.test(e))return e.replace(gt.escapeReplace,na)}else if(gt.escapeTestNoEncode.test(e))return e.replace(gt.escapeReplaceNoEncode,na);return e}function sa(e){try{e=encodeURI(e).replace(gt.percentDecode,"%")}catch{return null}return e}function oa(e,t){let r=e.replace(gt.findPipe,(o,a,c)=>{let i=!1,d=a;for(;--d>=0&&c[d]==="\\";)i=!i;return i?"|":" |"}),n=r.split(gt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(gt.slashPipe,"|");return n}function Nr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Cc(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function aa(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let i={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,i}function Rc(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var gn=class{constructor(e){Fe(this,"options");Fe(this,"rules");Fe(this,"lexer");this.options=e||or}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Nr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Rc(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Nr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Nr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Nr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],i;for(i=0;i<r.length;i++)if(this.rules.other.blockquoteStart.test(r[i]))c.push(r[i]),a=!0;else if(!a)c.push(r[i]);else break;r=r.slice(i);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let w=h,$=w.raw+`
`+r.join(`
`),g=this.blockquote($);o[o.length-1]=g,n=n.substring(0,n.length-w.raw.length)+g.raw,s=s.substring(0,s.length-w.text.length)+g.text;break}else if(h?.type==="list"){let w=h,$=w.raw+`
`+r.join(`
`),g=this.list($);o[o.length-1]=g,n=n.substring(0,n.length-h.raw.length)+g.raw,s=s.substring(0,s.length-w.raw.length)+g.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let i=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),h=e.split(`
`,1)[0],w=!m.trim(),$=0;if(this.options.pedantic?($=2,_=m.trimStart()):w?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,_=m.slice($),$+=t[1].length),w&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),i=!0),!i){let g=this.rules.other.nextBulletRegex($),E=this.rules.other.hrRegex($),j=this.rules.other.fencesBeginRegex($),Y=this.rules.other.headingBeginRegex($),Z=this.rules.other.htmlBeginRegex($);for(;e;){let M=e.split(`
`,1)[0],A;if(h=M,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),A=h):A=h.replace(this.rules.other.tabCharGlobal,"    "),j.test(h)||Y.test(h)||Z.test(h)||g.test(h)||E.test(h))break;if(A.search(this.rules.other.nonSpaceChar)>=$||!h.trim())_+=`
`+A.slice($);else{if(w||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||j.test(m)||Y.test(m)||E.test(m))break;_+=`
`+h}!w&&!h.trim()&&(w=!0),d+=M+`
`,e=e.substring(M.length+1),m=A.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let i of s.items){if(this.lexer.state.top=!1,i.tokens=this.lexer.blockTokens(i.text,[]),i.task){if(i.text=i.text.replace(this.rules.other.listReplaceTask,""),i.tokens[0]?.type==="text"||i.tokens[0]?.type==="paragraph"){i.tokens[0].raw=i.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),i.tokens[0].text=i.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(i.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};i.checked=_.checked,s.loose?i.tokens[0]&&["paragraph","text"].includes(i.tokens[0].type)&&"tokens"in i.tokens[0]&&i.tokens[0].tokens?(i.tokens[0].raw=_.raw+i.tokens[0].raw,i.tokens[0].text=_.raw+i.tokens[0].text,i.tokens[0].tokens.unshift(_)):i.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):i.tokens.unshift(_)}}if(!s.loose){let d=i.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let i of s.items){i.loose=!0;for(let d of i.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=oa(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(oa(a,o.header.length).map((c,i)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[i]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Nr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Cc(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),aa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return aa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,i=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){i+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+i);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let w=m.slice(1,-1);return{type:"em",raw:m,text:w,tokens:this.lexer.inlineTokens(w)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Et=class rs{constructor(t){Fe(this,"tokens");Fe(this,"options");Fe(this,"state");Fe(this,"inlineQueue");Fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||or,this.options.tokenizer=this.options.tokenizer||new gn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:gt,block:fn.normal,inline:Mr.normal};this.options.pedantic?(r.block=fn.pedantic,r.inline=Mr.pedantic):this.options.gfm&&(r.block=fn.gfm,this.options.breaks?r.inline=Mr.breaks:r.inline=Mr.gfm),this.tokenizer.rules=r}static get rules(){return{block:fn,inline:Mr}}static lex(t,r){return new rs(r).lex(t)}static lexInline(t,r){return new rs(r).inlineTokens(t)}lex(t){t=t.replace(gt.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let i=Object.keys(this.tokens.links);if(i.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)i.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let i;if(this.options.extensions?.inline?.some(_=>(i=_.call({lexer:this},t,r))?(t=t.substring(i.raw.length),r.push(i),!0):!1))continue;if(i=this.tokenizer.escape(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.tag(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.link(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(i.raw.length);let _=r.at(-1);i.type==="text"&&_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(i=this.tokenizer.emStrong(t,n,c)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.codespan(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.br(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.del(t)){t=t.substring(i.raw.length),r.push(i);continue}if(i=this.tokenizer.autolink(t)){t=t.substring(i.raw.length),r.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(t))){t=t.substring(i.raw.length),r.push(i);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(w=>{h=w.call({lexer:this},m),typeof h=="number"&&h>=0&&(_=Math.min(_,h))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(i=this.tokenizer.inlineText(d)){t=t.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=i.raw,_.text+=i.text):r.push(i);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},hn=class{constructor(e){Fe(this,"options");Fe(this,"parser");this.options=e||or}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(gt.notSpaceStart)?.[0],s=e.replace(gt.endingNewline,"")+`
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Ut(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=sa(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Ut(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=sa(e);if(s===null)return Ut(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Ut(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Ut(e.text)}},ps=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Ct=class ns{constructor(t){Fe(this,"options");Fe(this,"renderer");Fe(this,"textRenderer");this.options=t||or,this.options.renderer=this.options.renderer||new hn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ps}static parse(t,r){return new ns(r).parse(t)}static parseInline(t,r){return new ns(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},_n,Pr=(_n=class{constructor(e){Fe(this,"options");Fe(this,"block");this.options=e||or}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Et.lex:Et.lexInline}provideParser(){return this.block?Ct.parse:Ct.parseInline}},Fe(_n,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Fe(_n,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),_n),Ic=class{constructor(...e){Fe(this,"defaults",ss());Fe(this,"options",this.setOptions);Fe(this,"parse",this.parseMarkdown(!0));Fe(this,"parseInline",this.parseMarkdown(!1));Fe(this,"Parser",Ct);Fe(this,"Renderer",hn);Fe(this,"TextRenderer",ps);Fe(this,"Lexer",Et);Fe(this,"Tokenizer",gn);Fe(this,"Hooks",Pr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new hn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new gn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],i=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Pr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],i=s[a];Pr.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&Pr.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await c.call(s,d);return i.call(s,m)})();let _=c.call(s,d);return i.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(s,d);return m===!1&&(m=await i.apply(s,d)),m})();let _=c.apply(s,d);return _===!1&&(_=i.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Et.lex(e,t??this.defaults)}parser(e,t){return Ct.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Et.lex:Et.lexInline)(a,s),i=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(i,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(i,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Et.lex:Et.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Ct.parse:Ct.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Ut(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},sr=new Ic;function Me(e,t){return sr.parse(e,t)}Me.options=Me.setOptions=function(e){return sr.setOptions(e),Me.defaults=sr.defaults,ia(Me.defaults),Me};Me.getDefaults=ss;Me.defaults=or;Me.use=function(...e){return sr.use(...e),Me.defaults=sr.defaults,ia(Me.defaults),Me};Me.walkTokens=function(e,t){return sr.walkTokens(e,t)};Me.parseInline=sr.parseInline;Me.Parser=Ct;Me.parser=Ct.parse;Me.Renderer=hn;Me.TextRenderer=ps;Me.Lexer=Et;Me.lexer=Et.lex;Me.Tokenizer=gn;Me.Hooks=Pr;Me.parse=Me;var Pp=Me.options,Fp=Me.setOptions,qp=Me.use,Bp=Me.walkTokens,Up=Me.parseInline;var zp=Ct.parse,Hp=Et.lex;function Gt(e){let t=Me.parse(e),r=Xo.sanitize(t);return ea(r)}function zt(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function br(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function yn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Lc={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Dc=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Oc=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function jt(e){return!!e&&typeof e=="object"}function fs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function ba(e,t){let r=fs(e),n=fs(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let i=s.get(c)||0;i>0?s.set(c,i-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Mc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>jt(s)&&typeof s.text=="string"?s.text:"").join(""):jt(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nc(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Lc[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=fs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=ba(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let i=ba(jt(c)?c.old_string:"",jt(c)?c.new_string:"");s+=i.added,o+=i.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function va(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ya(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Dc.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Oc.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Pc(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(jt(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ya(o.text));else if(o.type==="thinking"){let a=va(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nc(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(jt(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Mc(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Fc(e){if(e.type==="item.completed"&&jt(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ya(t.text)];if(t.type==="reasoning"){let r=va(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function qc(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ka(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!jt(o))continue;let a=qc(o)?Fc(o):Pc(o,r);for(let c of a)t.push(c)}return t}var Bc=5,Uc=10,zc=/Task\s+#(\d+)/,Hc=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wc=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function kn(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Gc(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function jc(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Yc(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let i=zc.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!i||d.length===0)continue;t.set(i[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Vc(e){if(e.tool==="Bash"){let t=e.command||"";return Hc.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wc.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Kc(e){let t=e.filter(s=>s.kind==="tool").slice(-Uc),r=new Map;t.forEach((s,o)=>{let a=Vc(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Zc(e){let t=jc(e);if(t)return{text:t,guess:!1};let r=Yc(e);if(r)return{text:r,guess:!1};let n=Kc(e);return n?{text:n,guess:!0}:null}function Xc(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:yt(e,t)}function wn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,i=new Set,d=new Set,_=null,m=null,h=!1,w=!1,$=!1,g=null,E=null;function j(){h=!1,w=!1,$=!1,g=null,E=null}async function Y(F){if(r){w=!0,$=!1,O();try{let N=await Promise.resolve(r("get-attempt-prompt",{attempt_id:F}));if(o!==F)return;!N||typeof N!="object"||Array.isArray(N)?$=!0:(g=N,E=F)}catch{o===F&&($=!0)}finally{o===F&&(w=!1,O())}}}function Z(){if(h=!h,h&&o&&E!==o){Y(o);return}O()}function M(){if(!h)return"";let F=br({loading:w,error:$});if(F)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${F}
      </div>`;if(!g)return"";if(g.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let N=yn(g.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${N?l`<div class="prompt-block__meta">${N} 발송</div>`:""}
      ${typeof g.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",g.task_prompt):""}
      ${typeof g.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",g.system_prompt):""}
    </div>`}function A(){if(!o||!n)return[];let F=n.get(o);return ka(F?F.lines:[])}function x(){if(!o||!n)return null;let F=n.get(o),N=F?F.last_event_at:null;return typeof N=="number"?N:null}function P(){return a.status==="running"}function H(){if(P()&&o){m||(m=setInterval(()=>O(),1e3));return}ce()}function ce(){m&&(clearInterval(m),m=null)}function J(F){let N=[],pe=0;for(;pe<F.length;){let qe=F[pe];if(qe.kind==="tool"){let D=pe;for(;D<F.length&&F[D].kind==="tool"&&F[D].tool===qe.tool;)D+=1;if(D-pe>=Bc&&!d.has(pe)){N.push({kind:"group",idx:pe,tool:qe.tool||"",lines:F.slice(pe,D).map((G,R)=>({idx:pe+R,line:G}))}),pe=D;continue}}N.push({kind:"line",idx:pe,line:qe}),pe+=1}return N}function ae(F){for(let N=F.length-1;N>=0;N-=1){let pe=F[N];if(pe.kind==="result"||pe.kind==="error")return null;if(pe.kind==="tool"&&!Object.hasOwn(pe,"result"))return pe}return null}function fe(F){for(let N=F.length-1;N>=0;N-=1)if(F[N].kind==="thinking")return F[N];return null}function Le(F,N){if(N.kind==="gate")return l`<div class="sv__gate">${N.text}</div>`;if(N.kind==="phase")return l`<div class="sv__phase">${N.text}</div>`;if(N.kind==="result")return l`<div
        class="sv__result${N.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${N.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Gt(N.text||(N.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(N.kind==="thinking"){let pe=i.has(F);return l`<div
        class="sv__think${pe?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>de(F)}
      >
        <span class="sv__think-line">💭 ${kn(N.text)}</span>
        ${pe?l`<pre class="sv__think-expand">${N.text}</pre>`:""}
      </div>`}if(N.kind==="error")return l`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="blocker")return l`<div class="sv__error">⛔ ${N.text}</div>`;if(N.kind==="tool"){let pe=i.has(F),qe=N.tool==="Bash"?Gc(N.command):0,D=N.tool==="Bash"?qe>1?kn(N.command):N.command:N.path||N.command||"";return l`<div
        class="sv__tool${pe?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>de(F)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${N.icon}</span>
          <span class="sv__tool-name">${N.tool}</span>
          ${D?l`<span class="sv__tool-detail">${D}</span>`:""}
          ${qe>1?l`<span class="sv__tool-more">⋯ ${qe}줄</span>`:""}
          ${typeof N.added=="number"?l`<span class="sv__diff-add">+${N.added}</span>`:""}
          ${typeof N.removed=="number"?l`<span class="sv__diff-del">−${N.removed}</span>`:""}
          ${N.result?l`<span class="sv__tool-ok">→ ${N.result}</span>`:""}
        </span>
        ${pe?l`<pre class="sv__tool-expand">${Ye(N)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Gt(N.text||"")}</div>`}function Ye(F){let N=[];if(F.tool==="Bash"&&typeof F.command=="string"&&F.command.length>0)N.push(F.command);else if(F.input!==void 0)try{N.push(`input: ${JSON.stringify(F.input,null,2)}`)}catch{}return typeof F.output=="string"&&F.output.length>0&&N.push(`output:
${F.output}`),N.join(`

`)}function Se(){if(!o)return l``;let F=A(),N=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),pe=a.session_id||"",qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,D=P(),G=D?Xc(x(),Date.now()):"",R=D?ae(F):null,te=D?fe(F):null,ee=Zc(F);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ee?l`<span
              class="sv__stage${ee.guess?" sv__stage--guess":""}"
              title=${ee.text}
              >${ee.text}</span
            >`:""}
        ${D?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${G?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${G}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${G?l`<span class="sv__live-ago">${G}</span>`:""}</span
            >`:""}
        ${pe?l`<button
              type="button"
              class="sv__session"
              title=${pe}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${pe}`}
              @click=${()=>ye(pe)}
            >
              ⧉ ${pe.slice(0,8)}
            </button>`:""}
        ${N?l`<span class="sv__meta">${N}</span>`:""}
        ${a.worktree?l`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${Z}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${qe}
          @click=${le}
        >
          <span class="sv__follow-full">⇣ ${qe}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Oe()}
        >
          ✕
        </button>
      </div>
      ${M()}
      <div class="sv__body">
        ${F.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:J(F).map(ge=>ge.kind==="group"?T(ge):Le(ge.idx,ge.line))}
      </div>
      ${R||te?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?l`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?kn(R.command):R.path||R.command||""}</span
                  >`:""}
            ${te?l`<span class="sv__now-think"
                  >💭 ${kn(te.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function T(F){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>K(F.idx)}
    >
      <span class="sv__group-icon">${F.lines[0].line.icon}</span>
      <span class="sv__group-name">${F.tool}</span>
      <span class="sv__group-count">${F.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function K(F){d.add(F),O()}function O(){De(Se(),e),H(),c&&W()}function W(){let F=e.querySelector(".sv__body");F&&(F.scrollTop=F.scrollHeight)}function de(F){i.has(F)?i.delete(F):i.add(F),O()}function le(){c=!c,O()}function ye(F){rr(F).then(N=>{N?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function _e(F){!o||!F||(a={...a,...F},O())}function Ue(F){let N=F.target;if(!N||!N.classList||!N.classList.contains("sv__body"))return;!(N.scrollHeight-N.scrollTop-N.clientHeight<=4)&&c&&(c=!1,O())}e.addEventListener("scroll",Ue,!0);function ue(F){let N=F&&F.attempt_id;N&&(o=N,a=F.meta||{},c=!0,i.clear(),d.clear(),j(),!_&&n&&(_=n.subscribe(O)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),O())}function Oe(){let F=o;o=null,i.clear(),d.clear(),j(),ce(),r&&F&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${F}`})).catch(()=>{}),De(l``,e),s&&s()}return{open:ue,updateMeta:_e,close:Oe,isOpen(){return o!==null},destroy(){ce(),_&&(_(),_=null),e.removeEventListener("scroll",Ue,!0),o=null,De(l``,e)}}}function Qc(e){let t=e&&e.metadata||{},r=[];return typeof t.spec_id=="string"&&t.spec_id.trim().length>0&&r.push({kind:"spec",path:t.spec_id.trim()}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim()}),r}function wa(e,t){let r=Qc(e);return l`
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
  `}var Jc="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ed=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,td=/^\*\*결론\*\* — (.+)$/;function $a(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==Jc)return null;let r=ed.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?td.exec(t[a]):null,i=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:i,body:t.slice(d).join(`
`).trim()}}var xa=20;function Sa(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function rd(e){return e.length>xa?`${e.slice(0,xa)}\u2026`:e}function nd(e,t,r,n){let s=`${t.lane} ${rd(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Sa(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Gt(t.body)}
        </div>`:""}
  </div>`}function sd(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Sa(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Gt(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function Aa(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((i,d)=>String(d.created_at||"").localeCompare(String(i.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${c.map(i=>{let d=$a(typeof i.text=="string"?i.text:"");return d?nd(i,d,t,s.has(i.id)):sd(i)})}
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
  `}var _s=["opus","sonnet","haiku","fable"],ms=["low","medium","high","xhigh"],gs=["codex","opus","fable","self","skip"],hs=["opus","fable","sonnet","haiku"],od=["standard","fast_track"],bs={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",review_model:"(\uAE30\uBCF8: codex)",impl_model:"(\uAE30\uBCF8: \uD2F0\uC5B4 \uC790\uB3D9)"};function $n(e,t){let r=t&&t[e];return typeof r=="string"&&r.length>0?`(\uAE30\uBCF8: ${r} \u2014 \uC804\uC5ED)`:bs[e]||"(\uAE30\uBCF8)"}function Br(e,t,r,n,s,o){return l`
    <div class="detail-kv">
      <span class="detail-kv__k">${t}</span>
      <select
        class=${s?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${t}
        data-key=${e}
        @change=${a=>o.onChange(e,a.target.value)}
      >
        ${r.map(a=>l`<option value=${a.value} ?selected=${a.value===n}>
              ${a.label}
            </option>`)}
      </select>
    </div>
  `}function Ur(e,t){let r=e.map(n=>({value:n,label:n}));return typeof t=="string"?[{value:"",label:t},...r]:r}function Ta(e,t,r){let n=e&&e.metadata||{},s=r&&typeof r=="object"?r:{},o=n.workflow_mode==="fast_track"?"fast_track":"standard";return l`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${Br("orchestration_model","orchestration_model",Ur(_s,$n("orchestration_model",s)),n.orchestration_model||"",!1,t)}
    ${Br("orchestration_effort","orchestration_effort",Ur(ms,$n("orchestration_effort",s)),n.orchestration_effort||"",!1,t)}
    ${Br("review_model","review_model",Ur(gs,$n("review_model",s)),n.review_model||"",!1,t)}
    ${Br("impl_model","impl_model",Ur(hs,$n("impl_model",s)),n.impl_model||"",!1,t)}
    ${Br("workflow_mode","workflow_mode",Ur(od),o,n.workflow_mode==="fast_track",t)}
  `}function ad(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Ea(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function i($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",i);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${ad(s)}</span
            >
            <button
              type="button"
              class="mv__close"
              aria-label="닫기"
              @click=${()=>h()}
            >
              ✕
            </button>
          </div>
          <div class="mv__body">
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                    ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                  </div>`:Gt(a)}
          </div>
        </div>
      </div>
    `:l``}function _(){De(d(),e)}async function m($){s=$,o="loading",a="",c="",_();let g=r?r():"";if(!g){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let E="/api/doc?workspace="+encodeURIComponent(g)+"&path="+encodeURIComponent($);try{let j=await n(E),Y=await j.json().catch(()=>({}));if(!j.ok||!Y||Y.ok!==!0){o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(Y&&Y.error||j.status)+")",_();return}a=String(Y.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,De(l``,e)}function w(){document.removeEventListener("keydown",i),h()}return{open:m,close:h,destroy:w}}var id=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"},{key:"cache_creation_input_tokens",label:"\uCE90\uC2DC \uC0DD\uC131"}],Ca="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function ld(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function cd(e){let t=gr(e);if(!t||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${t.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${Ca}
          >부분 집계</span
        >`:""}`}function dd(e){let t=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null;return l`<div class="detail-session__usage-detail">
    ${id.map(r=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${r.label}</span
          ><span class="detail-session__usage-value"
            >${ld(e[r.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${t===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${t.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${Ca}</span>`:""}
  </div>`}var ud={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function pd(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Ra(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),w=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!w}
      title=${$}
      @click=${g=>{g.stopPropagation(),w&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return l`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},i=d=>{if(!gr(d.usage))return"";let _=s.has(d.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${_?"true":"false"}
      title=${_?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${m=>{m.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${cd(r.total)}
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
                >${ud[d.status||""]||"\xB7"}</span
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
                >${pd(d.started_at)}</span
              >
            </button>
            ${i(d)} ${a(d)} ${c(d)}
            ${s.has(d.attempt_id)&&d.usage?dd(d.usage):""}
          </div>`)}
    </div>
  `}function Ia(e,t={}){return l`
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
          ${fd(e)}
        </div>`:""}
  `}function fd(e){let t=br(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=yn(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var _d=["open","in_progress","deferred","resolved","closed"],md=[0,1,2,3,4];function La(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.sessionLogStore,i=null,d=null,_={},m=!1,h=!1,w="",$="",g="";function E(){m=!1,h=!1,w="",$="",g=""}let j=[],Y=null,Z=null,M=!1,A="",x=!1,P=0,H=new Set;function ce(){j=[],Y=null,Z=null,M=!1,A="",x=!1,P+=1,H.clear()}async function J(y){if(!s)return;let z=++P;try{let q=await Promise.resolve(s("get-comments",{id:y}));if(z!==P||y!==i)return;j=Array.isArray(q)?q:[],M=!1}catch{if(z!==P||y!==i)return;M=!0}we()}function ae(){if(!s||!i)return;let y=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Y!==i){Y=i,Z=y,J(i);return}y!==null&&y!==Z&&(Z=y,J(i))}function fe(y){H.has(y)?H.delete(y):H.add(y),we()}function Le(y){let z=A.trim().length===0;A=y,z!==(y.trim().length===0)&&we()}async function Ye(){let y=A.trim();if(!s||!i||y.length===0||x)return;let z=i;x=!0,we();let q=!1;try{let f=await Promise.resolve(s("add-comment",{id:z,text:y}));Array.isArray(f)&&f.length>0&&(q=!0,z===i&&(j=f,M=!1,A="",Z=f.length))}catch{q=!1}q||ne("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),z===i&&(x=!1),we()}let Se={onToggle:fe,onDraftInput:Le,onSubmit:Ye},T=document.createElement("div");T.className="md-viewer-root",document.body.appendChild(T);let K=Ea(T,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),O=document.createElement("div");O.className="session-log-root",document.body.appendChild(O);let W=wn(O,{transport:s?(y,z)=>Promise.resolve(s(y,z)):void 0,sessionLogStore:c}),de=!1,le=!1,ye=!1,_e=null,Ue=null,ue=0;function Oe(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function F(){de=!1,le=!1,ye=!1,_e=null,Ue=null,ue+=1}async function N(y){if(!s)return;let z=++ue;le=!0,ye=!1,we();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(z!==ue)return;!q||typeof q!="object"||Array.isArray(q)?ye=!0:(_e=q,Ue=Oe(y))}catch{z===ue&&(ye=!0)}finally{z===ue&&(le=!1,we())}}function pe(){if(de=!de,de&&i&&Ue!==Oe(i)){_e=null,N(i);return}we()}function qe(){if(!a||!i)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(q=>q&&q.bead_id===i).sort((q,f)=>(f.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,usage:q.usage||null}))}function D(){if(!a||!i)return null;let y=a.get();return Dt(y&&y.attempts||{},i)}let G=new Set;function R(y){G.has(y)?G.delete(y):G.add(y),we()}function te(y){let z=a?a.get():null,q=z&&z.attempts?z.attempts[y]:null;W.open({attempt_id:y,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}async function ee(y){if(!s||!y)return;let z=()=>{let f=a?a.get():null;return f&&typeof f.revision=="number"?f.revision:0},q=await s("worker-attempt-resume",{attempt_id:y,expected_revision:z()});if(q&&q.conflict){let f=q.queue&&typeof q.queue.revision=="number"?q.queue.revision:z();q=await s("worker-attempt-resume",{attempt_id:y,expected_revision:f})}q&&q.resumed===!1&&!q.conflict&&q.reason&&ne(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${q.reason}`,"error",2400)}let ge={onOpen:te,onResume:ee,onToggleUsage:R};function he(){let y=a?a.get():null,z=y&&y.exec_defaults;return z&&typeof z=="object"?z:{}}let $e=null;r&&r.subscribe&&($e=r.subscribe(()=>We()));let Re=null;a&&typeof a.subscribe=="function"&&(Re=a.subscribe(()=>{i&&we()}));function rt(y){y.key==="Escape"&&i&&(y.preventDefault(),n())}document.addEventListener("keydown",rt);function We(){if(i){if(r&&typeof r.snapshotFor=="function"){let y=r.snapshotFor("detail:"+i)||[];d=y.find(q=>q&&q.id===i)||y[0]||d}ae(),we()}}function Xe(y){rr(y).then(z=>{z?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function dt(y){y.preventDefault(),y.stopPropagation(),i&&Xe(i)}function ut(y,z){y.preventDefault(),y.stopPropagation(),Xe(z)}function Ae(y,z){y.preventDefault(),y.stopPropagation(),K.open(z)}function it(y,z){_[y]=z,we(),!(!s||!i)&&Promise.resolve(s("update-exec-settings",{id:i,key:y,value:z})).catch(()=>{ne("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}async function ze(y,z,q){if(!s||!i)return!1;try{let f=await Promise.resolve(s(y,z)),b=Array.isArray(f)?f[0]:f;return b&&typeof b=="object"&&b.id?(d=b,!0):(ne(q,"error"),!1)}catch{return ne(q,"error"),!1}}function at(y){setTimeout(()=>{try{let z=e.querySelector(y);z&&typeof z.focus=="function"&&z.focus()}catch{}},0)}function pt(){m=!0,w=d&&d.title||"",we(),at('.detail-edit__input[data-edit="title"]')}function bt(y){w=y.target.value}function Be(){m=!1,w="",we()}function lt(){ze("edit-text",{id:i,field:"title",value:w},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(z=>{z&&(m=!1,w=""),we()})}function Ve(){h=!0,$=d&&d.description||"",we(),at('.detail-edit__textarea[data-edit="description"]')}function et(y){$=y.target.value}function I(){h=!1,$="",we()}function B(){ze("edit-text",{id:i,field:"description",value:$},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(z=>{z&&(h=!1,$=""),we()})}function re(y,z,q,f){if(y.key==="Escape"){y.stopPropagation(),q();return}y.key==="Enter"&&(!f||y.ctrlKey||y.metaKey)&&(y.preventDefault(),z())}function se(y){let z=y.target.value;ze("update-status",{id:i,status:z},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function ie(y){let z=Number(y.target.value);ze("update-priority",{id:i,priority:z},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>we())}function ve(y){g=y.target.value}function u(){let y=g.trim();y.length!==0&&ze("label-add",{id:i,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(z=>{z&&(g=""),we()})}function v(y){if(y.key==="Escape"){y.stopPropagation(),g="",we();return}y.key==="Enter"&&(y.preventDefault(),u())}function L(y){ze("label-remove",{id:i,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>we())}let Q={onCopyPath:ut,onOpenDoc:Ae},X={onChange:it};function me(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function Ee(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function Ne(y){let q=(Array.isArray(y.dependencies)?y.dependencies:[]).map(f=>({id:me(f),icon:Ee(f)})).filter(f=>f.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${q.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${q.map(f=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(f.id)}
                  >
                    ${f.icon?`${f.icon} `:""}${f.id}
                  </button>`:l`<span class="detail-dep"
                    >${f.icon?`${f.icon} `:""}${f.id}</span
                  >`)}
          </div>`}
    `}function Ke(y){let z=y.metadata||{},q=y.workflow||{},f=q.stages||{},b=f.spec&&f.spec.stale,C=f.impl&&f.impl.stale,p=f.plan||null,S=q.route_source==="derived",U=q.route||z.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${S?" detail-kv__v--derived":""}"
          title=${S?"route \uCD94\uB860\uAC12 (metadata \uBBF8\uD540)":"route"}
          >${S&&q.route?`${U} ? (\uCD94\uB860)`:U}</span
        >
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">spec_review</span>
        <span class="detail-kv__v"
          >${z.spec_review||"\uC5C6\uC74C"}${b?" \xB7 stale":""}</span
        >
      </div>
      ${q.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${p?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${p?.approval_receipt||"\uC5C6\uC74C"}${p?.approval_state==="stale"?" \xB7 stale":p?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      <div class="detail-kv">
        <span class="detail-kv__k">impl_review</span>
        <span class="detail-kv__v"
          >${z.impl_review||"\uC5C6\uC74C"}${C?" \xB7 stale":""}</span
        >
      </div>
      ${z.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${z.pr_url}</span>
          </div>`:""}
    `}let nt={route:["spec_backed","full_plan"]};async function ke(y,z){let q=z.target.value;if(y==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){we();return}await ze("update-workflow-meta",{id:i,key:y,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),we()}function st(y){let z=y.metadata||{};return l` ${((f,b)=>{let C=nt[f],p=typeof z[f]=="string"?z[f]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${f}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${f}
          data-edit=${`wfmeta-${f}`}
          @change=${S=>ke(f,S)}
        >
          <option value="" ?selected=${!C.includes(p)}>
            ${b}
          </option>
          ${C.map(S=>l`<option value=${S} ?selected=${p===S}>${S}</option>`)}
        </select>
      </div>`})("route","(\uBBF8\uC124\uC815 \xB7 \uCD94\uB860)")} `}function $t(y){return m?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${w}
            @input=${bt}
            @keydown=${z=>re(z,lt,Be,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${lt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Be}
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
          @click=${pt}
        >
          ✎
        </button>
      </div>
    `}function Ge(y){let z=ct(y.created_at),q=ct(y.updated_at);return!z&&!q?l``:l`
      ${z?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${z}</span>
          </div>`:""}
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function ot(y,z){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${se}
        >
          ${_d.map(q=>l`<option value=${q} ?selected=${q===y}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ie}
        >
          ${md.map(q=>l`<option value=${String(q)} ?selected=${q===z}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function be(y){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${h?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ve}
            >
              ✎
            </button>`}
      </div>
      ${h?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${$}
              @input=${et}
              @keydown=${z=>re(z,B,I,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${B}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${I}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Ce(y){let z=typeof y.notes=="string"?y.notes:"";return z.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${z}</div>
    `}function xt(y){let z=Array.isArray(y.labels)?y.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${z.map(q=>l`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>L(q)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${g}
            @input=${ve}
            @keydown=${v}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${u}
          >
            추가
          </button>
        </span>
      </div>
    `}function Mt(){if(!i)return l``;let y=d||{},z=String(y.id||i),q=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",f=y.status||"open",b=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",C=y.description||"",p={...y,metadata:{...y.metadata||{},..._}};return l`
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
            @click=${dt}
          >
            ${z}
          </button>
          ${$t(q)} ${ot(f,b)}
          ${Ge(y)} ${be(C)}
          ${Aa(j,Se,{expanded:H,draft:A,sending:x,error:M})}
          ${Ce(y)} ${xt(y)} ${Ne(y)}
          ${Ke(y)} ${st(y)}
          ${wa(y,Q)}
          ${Ta(p,X,he())}
          ${Ia({expanded:de,loading:le,error:ye,data:_e},{onToggle:pe})}
          ${Ra(qe(),ge,{total:D(),expanded:G})}
        </div>
      </div>
    `}function we(){De(Mt(),e)}return{load(y){y!==i&&(_={},E(),ce(),F()),i=y,d=null,We()},clear(){i=null,d=null,_={},E(),ce(),F(),K.close(),W.close(),De(l``,e)},destroy(){$e&&($e(),$e=null),Re&&(Re(),Re=null),document.removeEventListener("keydown",rt),K.destroy(),T.parentNode&&T.parentNode.removeChild(T),W.destroy(),O.parentNode&&O.parentNode.removeChild(O),i=null,d=null,ce(),F(),De(l``,e)}}}var gd=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Da(e,t){return Wn(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function hd(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function Oa(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function c(x){let P=r.get();if(P)try{let H=await n("display-policy-set",{expected_revision:P.revision,policy:x(P)});i(H),H&&H.conflict&&H.policy&&(H=await n("display-policy-set",{expected_revision:H.policy.revision,policy:x(H.policy)}),i(H)),H&&H.conflict&&ne("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ne("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function i(x){x&&x.policy&&typeof x.policy=="object"&&r.set(x.policy)}function d(x){let P=r.get();if(!P)return;let H=Da(x,P)!=="shown";c(ce=>hd(x,ce,H))}function _(){let x=a.trim();x.length!==0&&(a="",c(P=>P.hidden_prefixes.includes(x)?{hidden_prefixes:P.hidden_prefixes}:{hidden_prefixes:[...P.hidden_prefixes,x]}),E())}function m(x){c(P=>({hidden_prefixes:P.hidden_prefixes.filter(H=>H!==x)}))}function h(x){let P=r.get();if(!P)return;let H=P.chips[x]===!1;c(()=>({chips:{[x]:H}}))}function w(x){let P=s();return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${P.length===0?l`<div class="display-settings__empty">라벨 없음</div>`:l`<div class="display-settings__pills">
              ${P.map(H=>{let ce=Da(H,x);return l`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${ce}`}
                  data-label=${H}
                  data-state=${ce}
                  @click=${()=>d(H)}
                >
                  ${H}
                </button>`})}
            </div>`}
      </section>
    `}function $(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${x.hidden_prefixes.map(P=>l`<span class="display-settings__prefix">
                ${P}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${P} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>m(P)}
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
            @input=${P=>{a=String(P.target.value||"")}}
          />
          <button type="button" @click=${_}>추가</button>
        </div>
      </section>
    `}function g(x){return l`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${gd.map(([P,H])=>l`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${P}
                  .checked=${x.chips[P]!==!1}
                  @change=${()=>h(P)}
                />
                <span>${H}</span>
              </label>`)}
        </div>
      </section>
    `}function E(){let x=r.get();De(l`
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
            ${x?l`${w(x)} ${$(x)}
                ${g(x)}`:l`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let j=!1,Y=()=>{j=!1};o.addEventListener("close",Y),o.addEventListener("cancel",Y);let Z=null;r.subscribe&&(Z=r.subscribe(()=>{j&&E()}));function M(){j||(a="",j=!0,E(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function A(){j&&(j=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:M,close:A,destroy(){j=!1,o.removeEventListener("close",Y),o.removeEventListener("cancel",Y),Z&&(Z(),Z=null),o.remove()}}}function Ma(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},i=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:i,close:c,getElement(){return t}}}function Na(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Pa(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var bd={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Fa=160;function vd(e){return e.length>Fa?`${e.slice(0,Fa)}\u2026`:e}var yd=[{key:"orchestration_model",values:()=>_s},{key:"orchestration_effort",values:()=>ms},{key:"review_model",values:()=>gs},{key:"impl_model",values:()=>hs}];function xn(e,t){let{queueStore:r,transport:n,getWorkspacePath:s}=t,o=document.createElement("dialog");o.id="worker-exec-defaults-dialog",o.className="exec-defaults",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);function a(){return r&&r.get()||{revision:0,exec_defaults:{}}}function c(){let T=a();return typeof T.revision=="number"?T.revision:0}function i(){let T=a().exec_defaults;return T&&typeof T=="object"?T:{}}function d(T){T&&T.queue&&r&&r.set(T.queue)}async function _(T,K){if(!n)return;let O={key:T,value:K||null};try{let W=await n("worker-queue-set-exec-default",{...O,expected_revision:c()});d(W),W&&W.conflict&&(W=await n("worker-queue-set-exec-default",{...O,expected_revision:c()}),d(W)),W&&W.conflict&&ne("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ne("\uC804\uC5ED \uC2E4\uD589 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function m(T,K,O){let W=!!O&&!K.includes(O);return l`<div class="exec-defaults__row">
      <span class="exec-defaults__k">${T}</span>
      <select
        class="exec-defaults__sel"
        aria-label=${`\uC804\uC5ED ${T}`}
        data-key=${T}
        @change=${de=>{_(T,de.target.value)}}
      >
        <option value="" ?selected=${!O}>
          ${bs[T]||"(\uAE30\uBCF8)"}
        </option>
        ${W?l`<option value=${O} ?selected=${!0}>
              ${O} (비호환)
            </option>`:""}
        ${K.map(de=>l`<option value=${de} ?selected=${O===de}>${de}</option>`)}
      </select>
    </div>`}function h(){let T=a().workspace_info;return T&&typeof T=="object"?T:{}}function w(T,K){return l`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${T}"
      >${K}</span
    >`}function $(T){let K=T?Pa(T.cmd):"",O=T?Na(T.timeout_ms):"",W=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${K?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${w("config","config")}
            ${O?l`<span class="exec-defaults__vd-meta"
                  >timeout ${O}</span
                >`:""}
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${W}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function g(T){let K=T?Pa(T.cmd):"",O=T?Na(T.timeout_ms):"",W=O?`timeout ${O} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",de=s&&s()||"<workspace \uACBD\uB85C>";return l`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${K?l`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${K}</span>
            ${w("config","config")}
            ${T.detached===!0?w("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${W}</span>
          </div>`:l`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${de}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function E(T){if(!T||typeof T!="object")return"";let K=bd[String(T.outcome)];if(!K)return"";let O=T.outcome==="failed"&&T.reason?`${K.label} \xB7 ${T.reason}`:K.label,W=[ct(T.at),typeof T.bead_id=="string"?T.bead_id:"",typeof T.base_sha=="string"?T.base_sha.slice(0,7):""].filter(ye=>ye.length>0).join(" \xB7 "),de=typeof T.detail=="string"&&T.detail.length>0?vd(T.detail):"",le=typeof T.log_path=="string"&&T.log_path.length>0?T.log_path:"";return l`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${w(K.modifier,O)}
        ${W?l`<span class="exec-defaults__vd-meta">${W}</span>`:""}
      </div>
      ${de?l`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${de}</code>
          </div>`:""}
      ${le?l`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${le}</code>
          </div>`:""}
    </div>`}let j=!1,Y=!1,Z=!1,M=null;async function A(){if(n){Y=!0,Z=!1,J();try{let T=await Promise.resolve(n("get-worker-system-prompt",{}));!T||typeof T!="object"||Array.isArray(T)?Z=!0:M=T}catch{Z=!0}finally{Y=!1,J()}}}function x(){if(j=!j,j&&!M){A();return}J()}function P(){return l`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${j?"true":"false"}
          @click=${x}
        >
          ${j?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${j?H():""}
    </section>`}function H(){let T=br({loading:Y,error:Z});if(T)return T;if(!M)return"";let K=Array.isArray(M.variants)?M.variants:[];return l`<div class="exec-defaults__sp-body">
      ${M.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${M.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${K.map(O=>l`<div class="exec-defaults__sp-variant" data-variant=${O.key}>
            <div class="exec-defaults__sp-cond">${O.condition}</div>
            ${zt(O.label,O.system_prompt)}
          </div>`)}
    </div>`}function ce(T){return l`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${$(T.verify_cmd)} ${g(T.deploy_cmd)}
      ${E(T.last_deploy)}
    </section>`}function J(){let T=i();De(l`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${Se}
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
            ${yd.map(K=>m(K.key,K.values(),T[K.key]||""))}
            ${ce(h())}
            ${P()}
          </div>
        </div>
      `,o)}let ae=!1,fe=()=>{ae=!1};o.addEventListener("close",fe),o.addEventListener("cancel",fe);let Le=null;r&&r.subscribe&&(Le=r.subscribe(()=>{ae&&J()}));function Ye(){ae||(ae=!0,J(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function Se(){ae&&(ae=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:Ye,close:Se,destroy(){ae=!1,o.removeEventListener("close",fe),o.removeEventListener("cancel",fe),Le&&(Le(),Le=null),o.remove()}}}function vr(e){let t=yt(e.created_at),r=yt(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${ct(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${ct(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function vs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=At(e.usage),s=e.merge_step||null,o=e.lane==="pr_wait"||!!e.revise_action,a=e.lane==="done"&&!o,c=a?yt(e.done_at):"",i=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",_=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,m=l`<span class="worker-mini__title">${e.title}</span>`,h=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",w=r.map(x=>x===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${x}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          >${x}</span
        >`),$=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",g=n?l`<span class="worker-usage" title=${hr(e.usage)}
        >${n}</span
      >`:"",E=s?l`<span class="merge-step"
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
      </button>`:"",Y=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",Z=e.discard_action?l`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${e.id}
        ?disabled=${e.discard_enabled===!1}
        title=${e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
      >
        폐기
      </button>`:"",M=e.revise_action?l`<button
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
    ${a?l`<div class="worker-mini__row1">${d}${_}${m}</div>
          <div class="worker-mini__row2">
            ${g}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ct(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${w}${E}
            <span class="worker-mini__actions"
              >${j}${Y}${Z}</span
            >
            ${vr(e)}
          </div>`:o?l`<div class="worker-mini__head">
              ${i}${d}${_}${h}${w}${$}
            </div>
            <div class="worker-mini__body">${m}</div>
            ${A?l`<div class="worker-mini__foot">
                  ${g}${E}
                  <span class="worker-mini__actions"
                    >${j}${Y}${Z}${M}</span
                  >
                </div>`:""}
            ${vr(e)}`:l`<div class="worker-mini__line">
              ${i}${d}${_}${m}${h}${w}${$}${g}${E}${j}${Y}${Z}
            </div>
            ${vr(e)}`}
  </div>`}function kd(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return l`<div
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
    ${vr(e)}
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?kd(n):vs(n))}
          </div>`}
  </section>`}var qa=160;function ys(e){return e.length>qa?`${e.slice(0,qa)}\u2026`:e}function wd(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${ys(e.command)}</code>`:""}
  </div>`}function $d(e){return e?l`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function xd(e){return e?l`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function ks(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Sd(e){if(!e||!e.reason)return"";let t=e.reason.startsWith("export_removal_failed:");return l`<div
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
          남은 작업: <code>${ys(e.detail)}</code>
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
  </div>`}function Ba(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return l`<div class="worker-banners">
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
          ${wd(e.failure.cause_detail)}
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
                <code>${ys(r.detail)}</code>
              </div>`:""}
          ${xd(r.log_path)} ${$d(r.output_tail)}
        </div>`)}
    ${Sd(e.shipFailure)}
  </div>`}function Ad(e,t,r=null){let n=!!e.paused,s=n?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ks(t-e.started_at):"\u2014",o=[e.runner,e.model].filter(Boolean).join(" \xB7 "),a=At(e.usage),c=e.conflict_resolution?n?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,i=e.base_exception||null,d=e.attempt_id&&e.attempt_id===r;return l`<div
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
    ${vr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function ws(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Ad(s,t,r))}
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
  </svg>`}function $s(){return Yt(Pt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function xs(){return Yt(Pt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ss(){return Yt(Pt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ua(){return Yt(Pt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function za(){return Yt(Pt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Ha(){return Yt(Pt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Wa(){return Yt(Pt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Ga(){return Yt(Pt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var zr=1,Td=6e4,Ed={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Cd=new Set(["auto_merge","merged","merge","done"]),ja={running:3,paused:2,failed:1};function Rd(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Id(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let i=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=ja[d.run_state],h=ja[c];if(m>h||m===h&&(d.started_at??0)>(i??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:i,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Dt(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function Ya(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Rt(e){return e&&typeof e=="object"?e:{}}function As(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let g of s)g&&typeof g.root_dir=="string"&&a.set(g.root_dir,g);let c=[],i=[],d=[],_=[],m=[],h=new Map;for(let g of n){if(!g||typeof g.root_dir!="string")continue;let E=g.root_dir,j=g.name||E,Y=a.get(E),Z=Y&&typeof Y.revision=="number"?Y.revision:typeof g.revision=="number"?g.revision:0,M=Rt(g.attempts),A=Rt(g.bead_titles),x=Rt(g.pr_observations),P=Rt(g.admission),H=Rt(g.revise_parked),ce=Rt(g.merge_queue_state),J=Rt(g.cleanup_failed),ae=Array.isArray(g.merge_queue)?g.merge_queue:[],fe=new Set(ae.filter(O=>O&&typeof O.bead_id=="string").map(O=>O.bead_id)),Le=Array.isArray(g.queue)?g.queue:[],Ye=Array.isArray(g.done)?g.done:[],Se=new Map;for(let O of Ye)O&&typeof O.bead_id=="string"&&typeof O.added_at=="number"&&Se.set(O.bead_id,O.added_at);let T=O=>({id:O,title:A[O]||O,root_dir:E,workspace_name:j,expected_revision:Z,draggable:!1}),K=new Set;for(let[O,W]of Id(M,Se))K.add(O),i.push({...T(O),lane:"running",attempt_id:W.attempt_id,run_state:W.run_state,can_pause:W.can_pause,can_resume:W.can_resume,started_at:W.started_at,last_event_at:W.last_event_at,model:W.model,usage:W.usage,badges:W.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:W.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:W.run_state==="failed"});for(let O of Array.isArray(g.pr_wait)?g.pr_wait:[]){let W=O&&O.bead_id;if(typeof W!="string"||K.has(W))continue;K.add(W);let de=Rt(x[W]),le=Rt(de.pr),ye=de.gate?Rt(de.gate):null,_e=fe.has(W),Ue=ce.active===W,ue=O.external===!0,Oe=J[W]||null,F=!!ye&&ye.base_badge==="\uCDA9\uB3CC",N=!!Oe&&!!ye&&ye.tier==="merged",pe=ue&&!!ye&&ye.tier==="merged";d.push({...T(W),lane:"pr_wait",pr_number:typeof le.number=="number"?le.number:null,pr_url:typeof le.url=="string"?le.url:void 0,external:ue,usage:Dt(M,W),badges:Oe?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!Oe,reason:Oe?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!_e,merge_enabled:ye?.enabled===!0||F||N||pe,merge_label:pe?"\uC815\uB9AC":F&&!N?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:pe?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":N?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":F?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ye?.enabled===!0?`\uBA38\uC9C0 (${ye.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ye?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:_e,cancel_enabled:!Ue,discard_action:!ue&&!Oe&&!(ye&&ye.tier==="merged"),discard_enabled:!Ue&&!_e,discard_title:_e?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0})}for(let O=0;O<Le.length;O++){let W=Le[O],de=W&&W.bead_id;if(typeof de!="string"||K.has(de))continue;K.add(de);let le=H[de],ye={...T(de),lane:"queue",reason:Ya(P,de),queue_position:O+1,queue_index:O,queue_length:Le.length,badges:le?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!le,revise_action:!!le,revise_enabled:!!le,revise_title:le?le.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${le.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(ye);let _e=h.get(E);_e?_e.push(ye):h.set(E,[ye])}for(let O of Array.isArray(g.runnable)?g.runnable:[]){let W=O&&O.bead_id;typeof W!="string"||K.has(W)||(K.add(W),c.push({...T(W),title:O.title||A[W]||W,lane:"runnable",draggable:!0,reason:Ya(P,W),created_at:O.created_at??void 0,updated_at:O.updated_at??void 0,labels:Array.isArray(O.labels)?O.labels:[],workflow:O.route?{route:O.route,chips:{route:O.route}}:null,place_index:Le.length}))}for(let O of Ye){let W=O&&O.bead_id;if(typeof W!="string"||K.has(W)||(K.add(W),o!==void 0&&typeof O.added_at=="number"&&O.added_at<o))continue;let de=Rd(M,W);m.push({...T(W),lane:"done",done:!0,usage:Dt(M,W),done_at:typeof O.added_at=="number"?O.added_at:void 0,done_kind:de&&typeof de.done_kind=="string"?de.done_kind:null})}}i.sort((g,E)=>(E.last_event_at??0)-(g.last_event_at??0)),m.sort((g,E)=>(E.done_at??0)-(g.done_at??0));let w=s.length>0?s:n.map(g=>({root_dir:g&&g.root_dir,name:g&&g.name,auto_advance:g&&g.auto_advance,auto_merge:g&&g.auto_merge,slots:g&&g.slots,revision:g&&g.revision,exec_defaults:g&&g.exec_defaults})),$=[];for(let g of w)!g||typeof g.root_dir!="string"||$.push({root_dir:g.root_dir,name:g.name||g.root_dir,auto_advance:g.auto_advance===!0,auto_merge:g.auto_merge===!0,slots:typeof g.slots=="number"&&g.slots>=zr?g.slots:zr,revision:typeof g.revision=="number"?g.revision:0,exec_defaults:Rt(g.exec_defaults),items:h.get(g.root_dir)||[]});return{runnable:c,queue:_,queue_groups:$,running:i,pr_wait:d,done:m,automation:{total:$.length,both_on:$.filter(g=>g.auto_advance&&g.auto_merge).length}}}function Ld(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Td;return l`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ct(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":l`<span class="mon-beat__age"
          >${yt(e,t)}</span
        >`}</span
  >`}function Hr(e){return l`<div class="mon-c__title">${e.title}</div>`}function Wr(e){return l`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Sn(e){return e.workspace_name?l`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Ts(e){let t=At(e.usage);return t?l`<span class="mon-c__usage" title=${hr(e.usage)}
        >${t}</span
      >`:""}function Es(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>l`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Dd(e){return l`<span class="mon-c__ops">
    ${e.run_state==="running"?l`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${xs()}
        </button>`:l`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${$s()}
        </button>`}
    <button
      type="button"
      class="mon-op mon-op--stop"
      aria-label="중단"
      title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
    >
      ${Ss()}
    </button>
    ${e.run_state==="failed"?l`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Ua()}
        </button>`:""}
  </span>`}function Od(e,t){let r=typeof e.started_at=="number"?ks(t-e.started_at):"";return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Es(e)}${Ld(e.last_event_at,t)}${Wr(e)}${Sn(e)}
      ${e.model?l`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?l`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Ts(e)}${Dd(e)}
    </div>`}function Md(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=yt(e.updated_at);return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${Wr(e)}
      ${n?l`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${on(e.labels,null).map(a=>l`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${Sn(e)}
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
    </div>`}function Nd(e){return l`${Hr(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${Wr(e)}
      ${Es(e)}
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
        </div>`:""}`}function Pd(e){let t=!!(At(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${Sn(e)}
      ${e.pr_url&&e.pr_number?l`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Es(e)}
      ${e.reason?l`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?l`<div class="mon-c__tail">
          ${Ts(e)}
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
        </div>`:""}`}function Fd(e,t){let r=e.done_kind||"",n=r?Ed[r]||r:"",s=yt(e.done_at,t);return l`${Hr(e)}
    <div class="mon-c__meta">
      ${Wr(e)}${Sn(e)}
      ${n?l`<span
            class="mon-live__kind${Cd.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Ts(e)}
      ${s?l`<span title=${`\uC644\uB8CC ${ct(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Va(e,t){return e.lane==="running"?Od(e,t):e.lane==="runnable"?Md(e):e.lane==="queue"?Nd(e):e.lane==="pr_wait"?Pd(e):Fd(e,t)}function Ka(e){let t=String(e.revision);return l`<header
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
        ${e.auto_advance?xs():$s()}
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
        ${za()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Ha()}
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
        ${Wa()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Za(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Lt.find(o=>o.value===e.done_range)?.label||"";return l`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ss():Ga()}
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
  </div>`}function Xa(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Qa(e){let t={};for(let a of qt)t[a]=0;let r=!1,n=0,s=0,o=0;for(let a of Array.isArray(e)?e:[]){let c=a&&a.usage;if(c&&typeof c=="object"){let i=!1;for(let d of qt){let _=c[d];typeof _=="number"&&Number.isFinite(_)&&(t[d]+=_,r=!0,i=!0)}if(i){s+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(n+=d,o+=1)}}}return s>0&&o===s&&(t.total_cost_usd=n),r?At(t):null}var ei="bdui.monitor.done-range";function qd(){try{let e=window.localStorage.getItem(ei);return Ft(e)?e:kt}catch{return kt}}function Bd(e){try{window.localStorage.setItem(ei,e)}catch{}}var ti="tab:monitor:pipeline",Ud=1e3,zd=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Ja(e,t){let r=e.lane==="runnable"||e.lane==="queue";return l`<div
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
    ${Va(e,t)}
  </div>`}function ri(e,t){let r=He("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,i=t.now||(()=>Date.now()),d=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),_=qd();function m(){let D=Lt.find(G=>G.value===_);return D?D.label:""}let h=document.createElement("div");h.className="mon",e.appendChild(h);let w=As(null,null),$=null,g=new Map,E=new Set;function j(D){return w.queue_groups.find(G=>G.root_dir===D)||null}let Z=xn(e,{queueStore:{get(){if(!$)return{revision:0,exec_defaults:{}};let D=g.get($);if(D)return D;let G=j($),R=s&&s.get?s.get():null,te=(Array.isArray(R)?R:[]).find(ee=>ee&&ee.root_dir===$);return{revision:G?G.revision:0,exec_defaults:G?G.exec_defaults:{},workspace_info:te?te.workspace_info:void 0}},set(D){$&&g.set($,D);for(let G of Array.from(E))G()},subscribe(D){return E.add(D),()=>E.delete(D)}},transport:o?(D,G)=>o(D,{...G||{},root_dir:$}):void 0,getWorkspacePath:()=>$||void 0}),M=null,A=null;async function x(D,G,R,te){if(!o||!R)return null;let ee=await o(D,{...G,root_dir:R,expected_revision:te});if(ee&&ee.conflict){let ge=ee.queue&&typeof ee.queue.revision=="number"?ee.queue.revision:te;ee=await o(D,{...G,root_dir:R,expected_revision:ge})}return ee&&ee.queue&&R&&g.set(R,ee.queue),ee}async function P(D,G,R){return!o||!R?null:await o(D,{...G,root_dir:R})}async function H(D){if(!o||!D&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let G=await o("monitor-auto-toggle",{on:D}),R=G&&Array.isArray(G.failed)?G.failed:[];R.length>0&&ne(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(te=>te.root_dir).join(", ")}`,"error",3200)}async function ce(){let D=new Map;for(let G of w.pr_wait)D.has(G.root_dir)||D.set(G.root_dir,G.expected_revision);for(let[G,R]of D)await x("worker-merge-queue-add-all",{},G,R)}let J=null,ae=!1,fe=null;function Le(){fe!==null&&clearTimeout(fe),fe=setTimeout(()=>{fe=null,ae=!1},0)}function Ye(D){let G=D.target;return typeof G?.closest=="function"?G.closest(".mon-group"):null}function Se(D){let G=Ye(D);return!G||!J?null:(G.getAttribute("data-root-dir")||"")===J.root_dir?G:null}function T(){for(let D of Array.from(h.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function K(D){let G=D.target,R=typeof G?.closest=="function"?G.closest('.mon-card[draggable="true"]'):null;if(R){J={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},ae=!0;try{D.dataTransfer?.setData("text/plain",J.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function O(D){let G=Se(D);G&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),G.classList.add("mon-group--drag-over"))}function W(D){Ye(D)?.classList.remove("mon-group--drag-over")}function de(){J=null,T(),Le()}function le(D){let G=Se(D),R=J;if(J=null,T(),!G||!R||!R.bead_id)return;D.preventDefault();let te=D.target,ee=typeof te?.closest=="function"?te.closest('.mon-card[data-lane="queue"]'):null,ge=ee&&G.contains(ee)?Number(ee.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let Re=Number.isFinite(ge)?ge:R.place_index;if(!Number.isFinite(Re))return;x("worker-queue-place",{bead_id:R.bead_id,index:Re},R.root_dir,R.revision);return}if(R.lane!=="queue"||ee&&ee.getAttribute("data-issue-id")===R.bead_id)return;let he=R.queue_index,$e=Number.isFinite(ge)?he>ge?ge:ge-1:R.queue_length-1;!Number.isFinite($e)||$e<0||$e===he||x("worker-queue-reorder",{bead_id:R.bead_id,to_index:$e},R.root_dir,R.revision)}function ye(D){let G={runnable:w.runnable,queue:w.queue,running:w.running,pr_wait:w.pr_wait,done:w.done};return l`${Za({automation:w.automation,counts:{running:w.running.length,queue:w.queue.length,pr_wait:w.pr_wait.length},done_range:_,token_total:Qa(w.done),token_tooltip:Xa(m())})}
      <div class="worker-lanes mon-lanes">
        ${zd.map(R=>{let te=G[R.lane],ee=R.lane==="queue"?w.queue_groups.length>0?l`${w.queue_groups.map(ge=>l`<div
                        class="mon-group"
                        data-root-dir=${ge.root_dir}
                      >
                        ${Ka(ge)}
                        <div class="mon-group__list">
                          ${ge.items.map(he=>Ja(he,D))}
                        </div>
                      </div>`)}`:void 0:te.length>0?l`${te.map(ge=>Ja(ge,D))}`:void 0;return Ot({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${m()}`:R.title,items:te,empty:R.empty,body:ee,live:R.lane==="running"&&te.length>0,header_control:R.lane==="pr_wait"&&te.length>0?l`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function _e(){let D=s&&s.get?s.get():null,G=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=i();w=As(D,G,{done_since:dr(_,R)}),De(ye(R),h)}function Ue(D,G){let R=a?a():void 0;if(!G||!R||G===R||!c){n(D);return}c(G).then(()=>{n(D)}).catch(te=>{r("workspace switch for %s failed: %o",G,te)})}function ue(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function Oe(D,G){let{root_dir:R,revision:te}=ue(D),ee=D.getAttribute("data-issue-id")||"",ge=D.getAttribute("data-attempt-id")||"",he=G.classList;if(he.contains("worker-card__place")){x("worker-queue-place",{bead_id:ee,index:Number(D.getAttribute("data-place-index")||0)||0},R,te);return}if(he.contains("mon-op--up")||he.contains("mon-op--down")){let $e=Number(D.getAttribute("data-queue-index")||0)||0,Re=he.contains("mon-op--up")?$e-1:$e+1;if(Re<0)return;x("worker-queue-reorder",{bead_id:ee,to_index:Re},R,te);return}if(he.contains("mon-op--remove")){x("worker-queue-remove",{bead_id:ee},R,te);return}if(he.contains("mon-op--pause")){P("worker-attempt-pause",{attempt_id:ge},R);return}if(he.contains("mon-op--stop")){P("worker-attempt-stop",{attempt_id:ge},R);return}if(he.contains("mon-op--resume")){x("worker-attempt-resume",{attempt_id:ge},R,te);return}if(he.contains("mon-op--dismiss")){x("worker-attempt-dismiss",{attempt_id:ge},R,te);return}if(he.contains("worker-mini__merge")){x("worker-merge-queue-add",{bead_id:ee},R,te);return}if(he.contains("worker-mini__merge-cancel")){x("worker-merge-queue-remove",{bead_id:ee},R,te);return}if(he.contains("worker-mini__discard")){if(!d(`${ee}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`))return;x("worker-pr-discard",{bead_id:ee},R,te);return}if(he.contains("worker-mini__revise-fix")){x("worker-revise-fix",{bead_id:ee},R,te);return}he.contains("worker-mini__revise-approve")&&x("worker-revise-approve",{bead_id:ee},R,te)}function F(D){let G=ae;ae=!1;let R=D.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let te=R.closest(".mon-auto-all");if(te){D.preventDefault(),H(te.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){D.preventDefault(),ce();return}let ge=R.closest(".mon-ctl--advance");if(ge){D.preventDefault();let{root_dir:Xe,revision:dt}=ue(ge);x("worker-queue-toggle",{on:ge.getAttribute("data-on")==="true"},Xe,dt);return}let he=R.closest(".mon-ctl--merge-auto");if(he){D.preventDefault();let{root_dir:Xe,revision:dt}=ue(he);x("worker-merge-auto-toggle",{on:he.getAttribute("data-on")==="true"},Xe,dt);return}let $e=R.closest(".mon-ctl--exec");if($e){D.preventDefault(),$=$e.getAttribute("data-root-dir")||null,g.delete($||""),Z.open();return}let Re=R.closest(".mon-card");if(!Re)return;let rt=R.closest("button");if(rt){D.preventDefault(),Oe(Re,rt);return}let We=Re.getAttribute("data-issue-id");We&&!G&&(D.preventDefault(),Ue(We,Re.getAttribute("data-root-dir")||""))}function N(D){let G=D.target;if(!G||typeof G.closest!="function")return;let R=G.closest(".mon-done-range");if(R){_=Ft(R.value)?R.value:kt,Bd(_),_e();return}let te=G.closest(".mon-slots__input");if(!te)return;let{root_dir:ee,revision:ge}=ue(te),he=Number(te.value);if(!Number.isFinite(he))return;let $e=Math.max(zr,Math.floor(he));x("worker-queue-set-slots",{slots:$e},ee,ge)}e.addEventListener("click",F),e.addEventListener("change",N),e.addEventListener("dragstart",K),e.addEventListener("dragover",O),e.addEventListener("dragleave",W),e.addEventListener("drop",le),e.addEventListener("dragend",de),s&&typeof s.subscribe=="function"&&(M=s.subscribe(()=>{try{g.clear(),_e();for(let D of Array.from(E))D()}catch{}}));function pe(){A!==null&&(clearInterval(A),A=null)}function qe(){fe!==null&&(clearTimeout(fe),fe=null)}return{load(){r("load"),_e(),A===null&&(A=setInterval(()=>{try{_e()}catch{}},Ud))},pause(){pe()},clear(){pe(),qe(),M&&(M(),M=null),e.removeEventListener("click",F),e.removeEventListener("change",N),e.removeEventListener("dragstart",K),e.removeEventListener("dragover",O),e.removeEventListener("dragleave",W),e.removeEventListener("drop",le),e.removeEventListener("dragend",de),Z.destroy(),E.clear(),e.replaceChildren()}}}function ni(e,t,r){let n=He("views:nav"),s=null;function o(i){return d=>{d.preventDefault(),n("click tab %s",i),r.gotoView(i)}}function a(){let i=t.getState(),d=i.view==="worker"||i.view==="monitor"?i.view:"board";return l`
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
    `}function c(){De(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),De(l``,e)}}}var si=["bug","feature","task","epic","chore"];function oi(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ai=["Critical","High","Medium","Low","Backlog"];function ii(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),i=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function w(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let x of si){let P=document.createElement("option");P.value=x,P.textContent=oi(x),o.appendChild(P)}a.replaceChildren();for(let x=0;x<=4;x+=1){let P=document.createElement("option");P.value=String(x);let H=ai[x]||"Medium";P.textContent=`${x} \u2013 ${H}`,a.appendChild(P)}}w();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function g(A){s.disabled=A,o.disabled=A,a.disabled=A,c.disabled=A,i.disabled=A,_.disabled=A,m.disabled=A,m.textContent=A?"Creating\u2026":"Create"}function E(){d.textContent=""}function j(A){d.textContent=A}function Y(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let x=window.localStorage.getItem("beads-ui.new.priority");x&&/^\d$/.test(x)?a.value=x:a.value="2"}catch{o.value="",a.value="2"}}function Z(){let A=o.value||"",x=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),x.length>0&&window.localStorage.setItem("beads-ui.new.priority",x)}async function M(){E();let A=String(s.value||"").trim();if(A.length===0){j("Title is required"),s.focus();return}let x=Number(a.value||"2");if(!(x>=0&&x<=4)){j("Priority must be 0..4"),a.focus();return}let P=String(o.value||""),H=String(i.value||""),ce={title:A};P.length>0&&(ce.type=P),String(x).length>0&&(ce.priority=x),H.length>0&&(ce.description=H),g(!0);try{await t("create-issue",ce)}catch{g(!1),j("Failed to create issue");return}Z(),g(!1),$()}return r.addEventListener("cancel",A=>{A.preventDefault(),$()}),h.addEventListener("click",()=>$()),_.addEventListener("click",()=>$()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),M())}),n.addEventListener("submit",A=>{A.preventDefault(),M()}),{open(){n.reset(),E(),Y();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Hd="tab:worker:ready",Wd="tab:worker:blocked",Gd="tab:worker:in-progress",An=1;function Is(e){let t=e&&e.metadata;return!!(t&&typeof t=="object"&&t.spec_id)}var ui="beads-ui.worker.candidate-filter",Cs={show_blocked:!1,spec:"all"};function jd(){try{let e=window.localStorage.getItem(ui);if(!e)return{...Cs};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Cs};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Cs}}}function Yd(e){try{window.localStorage.setItem(ui,JSON.stringify(e))}catch{}}function Vd(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let i=r(c),d=n(c);i&&d?s.push(c):!i&&d?o+=1:i&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Kd=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],pi="bdui.worker.candidate_sort",Zd=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Tn="spec";function Xd(){try{let e=window.localStorage.getItem(pi);return e==="board"||e==="created"||e==="spec"?e:Tn}catch{return Tn}}function Qd(e){try{window.localStorage.setItem(pi,e)}catch{}}var fi="bdui.worker.done-range";function Jd(){try{let e=window.localStorage.getItem(fi);return Ft(e)?e:kt}catch{return kt}}function eu(e){try{window.localStorage.setItem(fi,e)}catch{}}var tu="(max-width: 640px)",_i="beads-ui.worker.lane-collapsed",Gr={queue:!0,done:!0};function ru(){try{let e=window.localStorage.getItem(_i);if(!e)return{...Gr};let t=JSON.parse(e);return!t||typeof t!="object"?{...Gr}:{queue:typeof t.queue=="boolean"?t.queue:Gr.queue,done:typeof t.done=="boolean"?t.done:Gr.done}}catch{return{...Gr}}}function nu(e){try{window.localStorage.setItem(_i,JSON.stringify(e))}catch{}}function li(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function su(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(er):(n.sort(Jr(r)),t==="board"?n:[...n.filter(Is),...n.filter(s=>!Is(s))])}function ou(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function au(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function iu(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var lu=["closed_unmerged","undecidable"],cu=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function du(e,t){for(let r of cu)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Rs=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"},{step:"ship_exported_capabilities",label:"capability \uBC1C\uD589"}];function uu(e){if(typeof e!="string"||e.length===0)return null;let t=Rs.length,r=Rs.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:Rs[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function ci(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function di(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function pu(e,t,r,n,s=null,o=null,a=null,c=!1,i=null,d=!0,_=null,m=null){let h=!!i&&i.position>0,w=!!i&&i.active===!0,$=i&&i.failure||null,g=r[e]||null,E=g&&g.gate?g.gate:null,j=g&&g.pr?g.pr:null,Y=[];c&&Y.push("\uC138\uC158");let Z=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,M=du(c&&E&&E.tier==="closed_unmerged"?"\uB2EB\uD798":E&&E.gate_badge||"",Z?null:o&&o.activity||null);Z&&Y.push(Z),M.label&&Y.push(M.label),E&&E.base_badge&&E.base_badge!==E.gate_badge&&Y.push(E.base_badge),m&&Y.push(m),n&&Y.push("\uC815\uB9AC \uC2E4\uD328"),h&&!w&&Y.push(`\uBA38\uC9C0 \uB300\uAE30 #${i.position}`),$&&Y.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${ci($)}`),_&&Y.push(`\uC790\uB3D9 \uC81C\uC678: ${ci(_)}`);let A=!!E&&E.base_badge==="\uCDA9\uB3CC",x=!!E&&E.enabled===!0,P=uu(o&&o.merge_progress?o.merge_progress.step:null),H=!!n&&!!E&&E.tier==="merged",ce=c&&!!E&&E.tier==="merged",J=c&&A&&d===!1;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:c,pr_number:j&&typeof j.number=="number"?j.number:null,pr_url:j&&typeof j.url=="string"?j.url:"",badges:Y,live_badge:a==="running"?Z:Z?null:M.live?M.label:null,usage:s,alert:!!E&&lu.includes(E.tier)||!!n||!!$,merge_action:!h,cancel_action:h,cancel_enabled:!w,cancel_title:w?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard_action:!c&&!n&&!(E&&E.tier==="merged"),merge_step:P,discard_enabled:!P&&!a&&!h,discard_title:a?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":h?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":void 0,merge_enabled:!P&&!a&&!J&&(x||A||H||ce),merge_label:ce?"\uC815\uB9AC":A&&!P&&!H?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:P?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${P.label}`:ce?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":J?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":H?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":A?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":x?`\uBA38\uC9C0 (${E.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:E&&E.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${E&&E.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Ls(e,t={}){let{transport:r,issueStores:n,queueStore:s,sessionLogStore:o,uiOrderStore:a,gotoIssue:c,getWorkspacePath:i}=t,d=n?tn(n,a):null,_=nn({transport:r,uiOrderStore:a}),m=null,h=[],w=jd(),$=Xd(),g=Jd();function E(){let u=Lt.find(v=>v.value===g);return u?u.label:"\uC624\uB298"}let j=ru(),Y=!1,Z=new Set,M=new Set,A=[],x=document.createElement("div");x.className="worker-console";let P=document.createElement("div");P.className="worker-top";let H=document.createElement("div");H.className="worker-drawer-overlay",H.hidden=!0;let ce=document.createElement("div");ce.className="worker-drawer-overlay__backdrop";let J=document.createElement("div");J.className="worker-drawer-host",H.append(ce,J);let ae=document.createElement("div");ae.className="worker-lanes-host",x.append(P,H,ae),e.appendChild(x);let fe=null,Le=wn(J,{transport:r,sessionLogStore:o,onClose:()=>{fe=null,H.hidden=!0,Ae()}}),Ye=xn(x,{queueStore:s,transport:r,getWorkspacePath:i});function Se(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:An,queue:[],pr_wait:[],done:[]}}function T(){let u=Se();return typeof u.revision=="number"?u.revision:0}function K(u){u&&u.queue&&s&&s.set(u.queue)}function O(){let u=Se().queue;return Array.isArray(u)?u.length:0}async function W(u,v){if(!r)return;let L=await r("worker-queue-place",{bead_id:u,index:v,expected_revision:T()});K(L),L&&L.conflict&&await r("worker-queue-place",{bead_id:u,index:v,expected_revision:T()}).then(K)}async function de(u,v){if(!r)return;let L=await r("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:T()});K(L),L&&L.conflict&&await r("worker-queue-reorder",{bead_id:u,to_index:v,expected_revision:T()}).then(K)}async function le(u){if(!r)return;let v=await r("worker-queue-remove",{bead_id:u,expected_revision:T()});K(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:u,expected_revision:T()}).then(K)}async function ye(u){!r||!u||await r("worker-attempt-stop",{attempt_id:u})}async function _e(u){if(!r||!u)return;let v=await r("worker-attempt-pause",{attempt_id:u});v&&v.paused===!1&&v.reason&&ne(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Ue(u){if(!r||!u)return;let v=await r("worker-attempt-resume",{attempt_id:u,expected_revision:T()});K(v),v&&v.conflict&&(v=await r("worker-attempt-resume",{attempt_id:u,expected_revision:T()}),K(v)),v&&v.resumed===!1&&!v.conflict&&v.reason&&ne(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function ue(u){if(!r||!u)return;let v=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:T()});K(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:u,expected_revision:T()}),K(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&ne(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function Oe(u,v){if(!r)return null;let L=r,Q=await L(u,{...v,expected_revision:T()});return K(Q),Q&&Q.conflict&&(Q=await L(u,{...v,expected_revision:T()}),K(Q)),Q}async function F(u){if(!r||!u)return;Z.add(u),Ae();let v;try{v=await Oe("worker-merge-queue-add",{bead_id:u})}finally{Z.delete(u),Ae()}!v||v.conflict||v.applied||ne("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function N(u){if(!r)return;let v=await Oe("worker-merge-auto-toggle",{on:u});!v||v.conflict||ne(u?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",u?"success":"info",2400)}async function pe(u){if(!r||!u)return;let v=await Oe("worker-merge-queue-remove",{bead_id:u});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&ne("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function qe(){await Oe("worker-merge-queue-remove",{all:!0})}async function D(u){if(!r||!u||!(typeof globalThis.confirm!="function"||globalThis.confirm(`${u}: PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4. \uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694. \uACC4\uC18D\uD560\uAE4C\uC694?`)))return;let L=await r("worker-pr-discard",{bead_id:u,expected_revision:T()});if(K(L),L&&L.conflict&&(L=await r("worker-pr-discard",{bead_id:u,expected_revision:T()}),K(L)),L&&L.discarded===!0){ne("\uD3D0\uAE30 \uC644\uB8CC \u2014 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB2E4\uC2DC \uC2E4\uD589\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4","success",2400);return}L&&L.discarded===!1&&!L.conflict&&ne(`\uD3D0\uAE30 \uAC70\uBD80: ${L.reason||""}`,"error",2800)}async function G(u,v){if(!r||!v||M.has(v))return;M.add(v),Ae();let L;try{L=await r(u,{bead_id:v,expected_revision:T()}),K(L),L&&L.conflict&&(L=await r(u,{bead_id:v,expected_revision:T()}),K(L))}finally{M.delete(v),Ae()}if(!(!L||L.conflict)){if(L.ok){ne(u==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ne(`\uCC98\uBD84 \uAC70\uBD80: ${L.reason||""}`,"error",3e3)}}async function R(u){if(!r)return;let v=await r("worker-queue-toggle",{on:u,expected_revision:T()});K(v),v&&v.conflict&&await r("worker-queue-toggle",{on:u,expected_revision:T()}).then(K)}async function te(u){await R(u),await N(u)}async function ee(u){if(!r||!Number.isFinite(u))return;let v=Math.max(An,Math.floor(u)),L=await r("worker-queue-set-slots",{slots:v,expected_revision:T()});K(L),L&&L.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:T()}).then(K)}function ge(){let u=Se(),v=d?d.selectBoardColumn(Hd,"ready"):[],L=d?d.selectBoardColumn(Wd,"blocked"):[],Q=d?d.selectBoardColumn(Gd,"in_progress"):[],X=new Map;for(let k of Q){let V=au(k);if(!V)continue;let oe=X.get(V);oe?oe.push(k):X.set(V,[k])}let me=k=>{let V=rn(X.get(k)||[]);return V?V.title||V.id:null},Ee=u.bead_titles||{},Ne=new Map;for(let[k,V]of Object.entries(Ee))typeof V=="string"&&V.length>0&&Ne.set(k,V);for(let k of[...v,...L])Ne.set(k.id,k.title||k.id);let Ke=u.bead_times||{},nt=new Map;for(let[k,V]of Object.entries(Ke))V&&typeof V=="object"&&nt.set(k,V);for(let k of[...v,...L])nt.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let ke=k=>nt.get(k)||{},st=u.pr_wait||[],$t=u.pr_observations||{},Ge=u.pr_activity||{},ot=u.cleanup_failed||{},be=Object.entries(ot).map(([k,V])=>({bead_id:k,step:V&&V.step?V.step:"",reason:V&&V.reason?V.reason:"",detail:V&&typeof V.detail=="string"?V.detail:null,output_tail:V&&typeof V.output_tail=="string"&&V.output_tail?V.output_tail:void 0,log_path:V&&typeof V.log_path=="string"&&V.log_path?V.log_path:void 0})),Ce=u.ship_failure||null,xt=Ce&&typeof Ce.reason=="string"&&Ce.reason?{bead_id:typeof Ce.bead_id=="string"?Ce.bead_id:"",reason:Ce.reason,detail:typeof Ce.detail=="string"?Ce.detail:null,pr_url:typeof Ce.pr_url=="string"?Ce.pr_url:null}:null,Mt=u.queue||[],we=new Set([...Mt.map(k=>k.bead_id),...st.map(k=>k.bead_id),...u.done.map(k=>k.bead_id)]),y=new Set(L.map(k=>k.id)),z=a?a.get()?.order||{}:{},q=new Set,f=[];for(let k of[...v,...L])we.has(k.id)||q.has(k.id)||ou(k)||(q.add(k.id),f.push(k));h=su(f,$,z);let b=u.admission||{},C=k=>{let V=b[k];if(!V)return"";if(V.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let oe=typeof V.reason=="string"?V.reason:"",Pe=oe.indexOf(":");return Pe>0&&Pe<oe.length-1?`\u26D4 ${oe.slice(0,Pe)} (${oe.slice(Pe+1)})`:`\u26D4 ${oe}`},p=h.map(k=>{let V=Is(k),oe=y.has(k.id),Pe=[];oe&&Pe.push(iu(k)),V||Pe.push("spec \uC5C6\uC74C");let Kr=C(k.id);return Kr&&Pe.push(Kr),{id:k.id,title:k.title||k.id,reason:Pe.join(" \xB7 "),draggable:V,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,status:k.status,blocked:oe,has_spec:V}}),S=Vd(p,w),U=S.visible,Te=u.revise_parked||{},tt=(k,V)=>k.map(oe=>{let Pe=V==="queue"?Te[oe.bead_id]:null;return{id:oe.bead_id,title:Ne.get(oe.bead_id)||oe.bead_id,reason:V==="done"?"":C(oe.bead_id),draggable:V!=="done",done:V==="done",lane:V,badges:Pe?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Pe,revise_action:!!Pe,revise_enabled:!!Pe&&!M.has(oe.bead_id),revise_title:Pe?Pe.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Pe.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:V==="done"?Dt(u.attempts||{},oe.bead_id):null,done_at:V==="done"&&typeof oe.added_at=="number"?oe.added_at:void 0,...ke(oe.bead_id)}}),je=new Map;for(let k of u.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&je.set(k.bead_id,k.added_at);let Qe=u.attempts?Object.values(u.attempts):[],vt=new Set;for(let k of Qe)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&vt.add(k.resumed_from);let Nt=new Map;for(let k of Qe)Nt.set(k.bead_id,k.attempt_id);let ar=new Map;for(let k of Qe)ar.set(k.attempt_id,k);function Je(k){let V=new Set,oe=k;for(;oe&&!V.has(oe.attempt_id);){if(oe.conflict_resolution===!0)return!0;V.add(oe.attempt_id),oe=typeof oe.resumed_from=="string"&&oe.resumed_from.length>0&&ar.get(oe.resumed_from)||null}return!1}let ir=typeof u.declared_base=="string"?u.declared_base:null;function jr(k){let V=null;for(let oe of Qe)!oe||oe.bead_id!==k||Je(oe)||(V===null||(typeof oe.started_at=="number"?oe.started_at:0)>=(typeof V.started_at=="number"?V.started_at:0))&&(V=oe);return V&&typeof V.target_base=="string"?V.target_base:null}let yr=[],It=null;for(let k of Qe){let V=k.status==="paused"&&!vt.has(k.attempt_id);if(k.status==="running"||V)yr.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:Ne.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:V,conflict_resolution:Je(k),base_exception:di(ir,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,usage:Dt(u.attempts||{},k.bead_id),current_child:me(k.bead_id),...ke(k.bead_id)});else if(k.status==="failed"||k.status==="orphaned"){let oe=Nt.get(k.bead_id)!==k.attempt_id,Pe=je.get(k.bead_id),Kr=typeof Pe=="number"&&Pe>0&&typeof k.finished_at=="number"&&Pe>=k.finished_at;!oe&&!Kr&&typeof k.dismissed_at!="number"&&(It=k)}}let Ns=null;if(It){let k=typeof It.session_id=="string"&&It.session_id.length>0,V=vt.has(It.attempt_id),oe=It.cause_detail;Ns={repo:It.repo||"",reason:It.cause||It.status,cause_detail:oe&&typeof oe.reason=="string"?{reason:oe.reason,command:typeof oe.command=="string"?oe.command:null}:null,resume_attempt_id:It.attempt_id,resume_eligible:k&&!V,resume_reason:k?V?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}}let Si=new Set(yr.map(k=>k.bead_id)),En=Array.isArray(u.merge_queue)?u.merge_queue:[],Ps=new Map;En.forEach((k,V)=>{k&&typeof k.bead_id=="string"&&Ps.set(k.bead_id,V+1)});let Fs=u.merge_queue_state||{active:null,failures:{}},Ai=Fs.failures||{},Ti=u.auto_merge_skips||{},qs=k=>{let V=Ti[k];if(!V)return null;let oe=$t[k],Pe=oe&&oe.pr?oe.pr.head_sha:null;return Pe&&Pe===V.head_sha?V.reason||"":null},Yr=new Map;for(let k of yr)k.conflict_resolution&&(k.paused?Yr.has(k.bead_id)||Yr.set(k.bead_id,"paused"):Yr.set(k.bead_id,"running"));let Bs=yr.filter(k=>!k.paused).length,Us=(u.workspace_info||{}).slots,zs=typeof Us=="number"?Us:typeof u.slots=="number"?u.slots:An,Ei=Bs>zs,Hs=dr(g),Ci=(Array.isArray(u.done)?u.done.slice():[]).filter(k=>Hs===void 0||typeof k.added_at!="number"||k.added_at>=Hs).sort((k,V)=>(V.added_at||0)-(k.added_at||0)),Ws=tt(Ci,"done"),Vr={};for(let k of qt)Vr[k]=0;let Gs=!1,js=0,Cn=0,Ys=0;for(let k of Ws){let V=k.usage;if(V&&typeof V=="object"){let oe=!1;for(let Pe of qt)Number.isFinite(V[Pe])&&(Vr[Pe]+=V[Pe],Gs=!0,oe=!0);oe&&(Cn+=1,Number.isFinite(V.total_cost_usd)&&(js+=V.total_cost_usd,Ys+=1))}}Cn>0&&Ys===Cn&&(Vr.total_cost_usd=js);let Ri=Gs?At(Vr):null;return{queue:u,idToTitle:Ne,candidates:U,candidate_hidden:{blocked:S.hidden_blocked,spec:S.hidden_spec},running:yr,live_count:Bs,slots:zs,over_cap:Ei,failure:Ns,waiting:tt(Mt.filter(k=>!Si.has(k.bead_id)),"queue"),pr_wait:st.map(k=>pu(k.bead_id,Ne.get(k.bead_id)||k.bead_id,$t,ot[k.bead_id]||null,Dt(u.attempts||{},k.bead_id),Ge[k.bead_id]||(Z.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Yr.get(k.bead_id)||null,k.external===!0,{position:Ps.get(k.bead_id)||0,active:Fs.active===k.bead_id,failure:Ai[k.bead_id]||null},k.wt_present!==!1,u.auto_merge===!0?qs(k.bead_id):null,di(ir,jr(k.bead_id)))).map(k=>({...k,...ke(k.id)})),merge_queue_length:En.length,merge_queue_running:En.length>0,auto_excluded:st.map(k=>k.bead_id).filter(k=>qs(k)!==null),verify_cmd_present:!!(u.workspace_info||{}).verify_cmd,declared_base:ir,done:Ws,token_total:Ri,cleanup_failures:be,ship_failure:xt}}function he(u){let v=u.waiting.length>0?u.waiting[0].id:"\u2014",L=l`<button
      type="button"
      class="worker-play${u.queue.auto_advance?" is-active":""}"
    >
      ${u.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,Q=u.queue.auto_advance===!0&&u.queue.auto_merge===!0,X=l`<button
      type="button"
      class="worker-auto-all${Q?" is-active":""}"
      title=${Q?"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4":"\uC790\uB3D9 \uC9C4\uD589\uACFC \uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
      aria-pressed=${Q?"true":"false"}
    >
      ${Q?"\u23F9 \uC804\uCCB4 \uC790\uB3D9\uD654":"\u23F5\u23F5 \uC804\uCCB4 \uC790\uB3D9\uD654"}
    </button>`,me=u.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",Ee=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${u.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${u.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${E()} 완료 <b>${u.done.length}</b></span
      >`,Ne=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${u.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${u.declared_base||"?"}</span
    >`,Ke=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${An}
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
      </button>`,nt=Ba({failure:u.failure,cleanupFailures:u.cleanup_failures,shipFailure:u.ship_failure});return Y?l`<div class="worker-ribbon">
          ${L}
          <div class="worker-kpi worker-kpi--ribbon">${me}${Ee}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${X}${Ke}</div>
          <div class="worker-kpi">${Ne}</div>
        </div>
        ${nt}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${L}${X}${Ke}</div>
        <div class="worker-kpi">
          ${me}${Ee}${Ne}
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
      ${nt}`}function $e(u){if(u.running.length===0&&u.pr_wait.length===0)return"";let v=u.running.some(L=>!L.paused);return l`<section
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
        ${Xe(u)}
      </header>
      ${u.running.length>0?ws(u.running,Date.now(),fe):""}
      ${u.pr_wait.map(L=>vs(L))}
    </section>`}function Re(u){let v=u.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${w.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Kd.map(L=>l`<button
              type="button"
              class="worker-filter__chip${w.spec===L.value?" is-active":""}"
              data-spec=${L.value}
              aria-pressed=${w.spec===L.value?"true":"false"}
            >
              ${L.label}
            </button>`)}
        ${v.spec>0?l`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function rt(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${$}
    >
      ${Zd.map(u=>l`<option value=${u.value} ?selected=${$===u.value}>
            ${u.label}
          </option>`)}
    </select>`}function We(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${g}
      >
        ${Lt.map(u=>l`<option value=${u.value} ?selected=${g===u.value}>
              ${u.label}
            </option>`)}
      </select>
    </div>`}function Xe(u){let v=u.queue.auto_merge===!0;if(u.merge_queue_running)return l`<button
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
      </button>`;let L=new Set(u.auto_excluded),Q=u.pr_wait.filter(X=>X.merge_action&&X.merge_enabled&&!L.has(X.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title=${u.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${Q>0?` ${Q}`:""}
    </button>`}function dt(u){let v=Ot({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:u.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:rt(),controls:Re(u)});return Y?l`<div class="worker-lanes worker-lanes--mobile">
        ${$e(u)}
        ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:j.queue,preview:li(u.waiting)})}
        ${v}
        ${Ot({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:We(),collapsible:!0,collapsed:j.done,preview:u.token_total||li(u.done)})}
      </div>`:l`<div class="worker-lanes">
      ${v}
      ${Ot({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:u.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
      ${Ot({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${u.slots}`,items:u.running,live:u.running.some(L=>!L.paused),body:ws(u.running,Date.now(),fe)})}
      ${Ot({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:u.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C",header_control:Xe(u)})}
      ${Ot({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${E()} ${u.done.length}`,items:u.done,empty:`${E()} \uC644\uB8CC \uC5C6\uC74C`,controls:We()})}
    </div>`}function ut(u){j={...j,[u]:!j[u]},nu(j),Ae()}function Ae(){let u=ge();De(he(u),P),De(dt(u),ae)}function it(){let u=document.querySelector(".app-header");if(!u)return;let v=()=>{let L=Math.round(u.getBoundingClientRect().height);x.style.setProperty("--worker-ribbon-top",`${L}px`)};if(v(),typeof ResizeObserver=="function"){let L=new ResizeObserver(v);L.observe(u),A.push(()=>L.disconnect())}else window.addEventListener("resize",v),A.push(()=>window.removeEventListener("resize",v))}function ze(){if(typeof window.matchMedia!="function")return;let u=window.matchMedia(tu);Y=!!u.matches;let v=L=>{let Q=!!(L&&typeof L.matches=="boolean"?L.matches:u.matches);Q!==Y&&(Y=Q,Ae())};typeof u.addEventListener=="function"?(u.addEventListener("change",v),A.push(()=>u.removeEventListener("change",v))):typeof u.addListener=="function"&&(u.addListener(v),A.push(()=>u.removeListener(v)))}function at(u){let v=u.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!v)return;let L=v.dataset.beadId||"",Q=v.dataset.lane||"";m={bead_id:L,from_lane:Q};try{u.dataTransfer?.setData("text/plain",L),u.dataTransfer&&(u.dataTransfer.effectAllowed="move")}catch{}}function pt(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;let L=v.dataset.lane||"";L!=="candidate"&&L!=="queue"||(u.preventDefault(),u.dataTransfer&&(u.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function bt(u){u.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Be(u,v){let L=h.find(Ee=>Ee.id===u);if(!L)return;let Q=h.filter(Ee=>Ee.id!==u),X=Q.length;if(v){let Ee=v.dataset.beadId;if(Ee===u)return;let Ne=Q.findIndex(Ke=>Ke.id===Ee);Ne>=0&&(X=Ne)}let me=Q.slice();me.splice(X,0,L),_.applyReorder(u,me,X)}function lt(u){let v=u.target?.closest?.(".worker-pane");if(!v)return;u.preventDefault(),v.classList.remove("worker-pane--drag-over");let L=v.dataset.lane||"",Q=m?.bead_id||u.dataTransfer?.getData("text/plain")||"",X=m?.from_lane||"";if(m=null,!Q)return;let me=u.target?.closest?.(".worker-mini, .worker-card"),Ee=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),Ne=Ee.length;if(me){let Ke=Ee.indexOf(me);Ke>=0&&(Ne=Ke)}if(v.classList.contains("worker-pane--collapsed")&&(Ne=O()),L==="candidate"){if(X==="candidate"){Be(Q,me);return}X==="queue"&&le(Q);return}L==="queue"&&(X==="queue"?de(Q,Ne):W(Q,Ne))}function Ve(u){w=u,Yd(u),Ae()}function et(u){$=u==="board"||u==="created"||u==="spec"?u:Tn,Qd($),Ae()}function I(u){g=Ft(u)?u:kt,eu(g),Ae()}function B(u){let v=u.target?.closest?.(".worker-filter__blocked");if(v){Ve({...w,show_blocked:v.checked});return}let L=u.target?.closest?.(".worker-done-range");if(L){I(L.value);return}let Q=u.target?.closest?.(".worker-sort");if(Q){et(Q.value||Tn);return}let X=u.target?.closest?.(".worker-slots__input");if(!X)return;let me=Number.parseInt(X.value,10);if(!Number.isFinite(me)){Ae();return}ee(me).then(Ae)}function re(u){return u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,worktree:u.worktree||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}}function se(u){let v=Se(),L=v.attempts?v.attempts[u]:null;fe=u,H.hidden=!1,Le.open({attempt_id:u,meta:re(L)}),Ae()}function ie(){if(!fe)return;let u=Se(),v=u.attempts?u.attempts[fe]:null;if(v){Le.updateMeta(re(v));return}Le.close()}function ve(u){let v=u.target;if(v?.closest?.("#worker-exec-defaults-dialog"))return;if(v?.closest?.(".worker-exec-defaults-btn")){Ye.open();return}let L=v?.closest?.(".worker-banner__resume");if(L){let be=L.dataset.attemptId;be&&Ue(be);return}let Q=v?.closest?.(".worker-banner__dismiss");if(Q){let be=Q.dataset.attemptId;be&&ue(be);return}if(v?.closest?.(".worker-play")){R(!Se().auto_advance);return}if(v?.closest?.(".worker-auto-all")){let be=Se();te(!(be.auto_advance===!0&&be.auto_merge===!0));return}let X=v?.closest?.(".worker-merge-all");if(X){X.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?N(!1):qe():N(!0);return}let me=v?.closest?.(".worker-pane__hd--toggle");if(me){let be=me.dataset.lane;(be==="queue"||be==="done")&&ut(be);return}let Ee=v?.closest?.(".worker-card__place");if(Ee){let be=Ee.dataset.beadId;be&&!Ee.disabled&&W(be,O());return}let Ne=v?.closest?.(".worker-filter__chip");if(Ne){let be=Ne.dataset.spec;(be==="all"||be==="with"||be==="without")&&Ve({...w,spec:be});return}let Ke=v?.closest?.(".worker-mini__merge");if(Ke){F(Ke.dataset.beadId||"");return}let nt=v?.closest?.(".worker-mini__merge-cancel");if(nt){pe(nt.dataset.beadId||"");return}let ke=v?.closest?.(".worker-mini__discard");if(ke){D(ke.dataset.beadId||"");return}let st=v?.closest?.(".worker-mini__revise-fix");if(st){G("worker-revise-fix",st.dataset.beadId||"");return}let $t=v?.closest?.(".worker-mini__revise-approve");if($t){G("worker-revise-approve",$t.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__stop")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&ye(Ce);return}if(v?.closest?.(".rtile__pause")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&_e(Ce);return}if(v?.closest?.(".rtile__resume")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&Ue(Ce);return}if(v?.closest?.(".rtile__session")){let Ce=v?.closest?.(".rtile")?.dataset?.attemptId;Ce&&se(Ce);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){Le.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Ge=v?.closest?.(".rtile");if(Ge){if(v?.closest?.(".rtile__id")){let Ce=Ge.dataset.beadId;Ce&&rr(Ce).then(xt=>{xt?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let be=Ge.dataset.beadId;be&&c&&c(be);return}let ot=v?.closest?.(".worker-mini, .worker-card");if(ot){let be=ot.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){be&&rr(be).then(Ce=>{Ce?ne("\uBCF5\uC0AC\uB428","success",1200):ne("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}be&&c&&c(be)}}return e.addEventListener("dragstart",at),e.addEventListener("dragover",pt),e.addEventListener("dragleave",bt),e.addEventListener("drop",lt),e.addEventListener("click",ve),e.addEventListener("change",B),ze(),it(),d&&A.push(d.subscribe(Ae)),s&&A.push(s.subscribe(()=>{Ae(),ie()})),Ae(),{load(){Ae()},destroy(){for(let u of A.splice(0))try{u()}catch{}e.removeEventListener("dragstart",at),e.removeEventListener("dragover",pt),e.removeEventListener("dragleave",bt),e.removeEventListener("drop",lt),e.removeEventListener("click",ve),e.removeEventListener("change",B);try{Le.destroy()}catch{}H.hidden=!0;try{Ye.destroy()}catch{}De(l``,e)}}}function Ds(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function mi(e,t,r,n=async()=>{},s=async()=>{}){let o=He("views:workspace-picker"),a=null,c=!1,i=!1,d=!1;async function _(x){let H=x.target.value,J=t.getState().workspace?.current?.path||"";if(H&&H!==J){o("switching workspace to %s",H),c=!0,A();try{await r(H)}catch(ae){o("workspace switch failed: %o",ae)}finally{c=!1,A()}}}async function m(){let x=t.getState(),P=x.workspace?.current?.path||x.workspace?.available?.[0]?.path||"";if(!(!P||i)){o("git-pulling workspace %s",P),i=!0,A();try{await n(P)}catch(H){o("workspace git pull failed: %o",H)}finally{i=!1,A()}}}function h(x){let P=x.target;P&&e.contains(P)||g()}function w(x){x.key==="Escape"&&g()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",w),A())}function g(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),A())}function E(){d?g():$()}async function j(x){let P=x.target,H=P.value,ce=P.checked;o("toggling visibility %s \u2192 %s",H,String(ce));try{await s(H,ce)}catch(J){o("workspace visibility toggle failed: %o",J)}}function Y(x){return x?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${c||i}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function Z(x,P){return l`
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
                ${x.map(H=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${H.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${H.path}"
                        .checked=${!P.has(H.path)}
                        @change=${j}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ds(H.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function M(){let x=t.getState(),P=x.workspace?.current,H=x.workspace?.available||[],ce=new Set(x.workspace?.hidden||[]),J=P?.path||H[0]?.path||"";if(H.length===0)return l``;let ae=H.filter(fe=>!ce.has(fe.path)||fe.path===J);if(ae.length<=1){let fe=ae[0]||H[0],Le=Ds(fe.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${Le}</span
          >
          ${Z(H,ce)}
          ${Y(J)}
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
          ${ae.map(fe=>l`
              <option
                value="${fe.path}"
                ?selected=${fe.path===J}
                title="${fe.path}"
              >
                ${Ds(fe.path)}
              </option>
            `)}
        </select>
        ${Z(H,ce)}
        ${Y(J)}
        ${c||i?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){De(M(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",w),De(l``,e)}}}var gi=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-exec-default","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","monitor-auto-toggle"];function Os(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function hi(e,t,r=Os()){return{id:r,type:e,payload:t}}function bi(e={}){let t=He("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,i=!0,d=new Map,_=[],m=new Map,h=new Set;function w(M){for(let A of Array.from(h))try{A(M)}catch{}}function $(){if(!i||c)return;o="reconnecting",t("ws reconnecting\u2026"),w(o);let M=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*M,x=Math.max(0,Math.round(M+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",x,a+1),c=setTimeout(()=>{c=null,Z()},x)}function g(M){try{s?.send(JSON.stringify(M))}catch(A){t("ws send failed",A)}}function E(){for(o="open",t("ws open"),w(o),a=0;_.length;){let M=_.shift();M&&g(M)}}function j(M){let A;try{A=JSON.parse(String(M.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let P=d.get(A.id);d.delete(A.id),A.ok?P?.resolve(A.payload):P?.reject(A.error||new Error("ws error"));return}let x=m.get(A.type);if(x&&x.size>0)for(let P of Array.from(x))try{P(A.payload)}catch(H){t("ws event handler error",H)}else t("ws received unhandled message type: %s",A.type)}function Y(){o="closed",t("ws closed"),w(o);for(let[M,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(M);a+=1,$()}function Z(){if(!i)return;let M=n();try{s=new WebSocket(M),t("ws connecting %s",M),o="connecting",w(o),s.addEventListener("open",E),s.addEventListener("message",j),s.addEventListener("error",()=>{}),s.addEventListener("close",Y)}catch(A){t("ws connect failed %o",A),$()}}return Z(),{send(M,A){if(!gi.includes(M))return Promise.reject(new Error(`unknown message type: ${M}`));let x=Os(),P=hi(M,A,x);return t("send %s id=%s",M,x),new Promise((H,ce)=>{d.set(x,{resolve:H,reject:ce,type:M}),s&&s.readyState===s.OPEN?g(P):(t("queue %s id=%s (state=%s)",M,x,o),_.push(P))})},on(M,A){m.has(M)||m.set(M,new Set);let x=m.get(M);return x?.add(A),()=>{x?.delete(A)}},onConnection(M){return h.add(M),()=>{h.delete(M)}},reconnect(){i=!0,c&&(clearTimeout(c),c=null),a=0,Z()},close(){i=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function fu(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function _u(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Ms=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],vi=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],yi=ti,ki="worker:queue",wi="ui:order",$i="ui:display-policy",Vt="tab:board:closed",xi="beads-ui.board.closed-range";function mu(e){let t=He("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;De(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("board-root"),o=document.getElementById("worker-root"),a=document.getElementById("monitor-root"),c=document.getElementById("detail-panel");if(s&&o&&a&&c){let Se=function(f,b){let C="Request failed",p="";if(f&&typeof f=="object"){let U=f;if(typeof U.message=="string"&&U.message.length>0&&(C=U.message),typeof U.details=="string")p=U.details;else if(U.details&&typeof U.details=="object")try{p=JSON.stringify(U.details,null,2)}catch{p=""}}else typeof f=="string"&&f.length>0&&(C=f);let S=b&&b.length>0?`Failed to load ${b}`:"Request failed";Ye.open(S,C,p)},R=function(f){return`${ke.getState().workspace.current?.path||""}\0${f}`},te=function(){ue&&(ue().catch(()=>{}),ue=null),Oe=null,F=null},ge=function(f){N=f;let b=()=>{N!==f||ke.getState().selected_id!==f||(N=null,ee(f))};if(!D){qe.then(b);return}b()},rt=function(f,b,C,p,S){return C!==Re[b]?(S().catch(()=>{}),!1):(f.set(p,S),!0)},We=function(){let f=ke.getState().view;ut(f==="board"),pt(f==="worker"),et(f==="monitor"),Be(f==="worker")},dt=function(){let f=dr(Xe);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},ut=function(f){if(f)for(let[b,C]of Ms){if(he.has(b)||$e.has(b))continue;let p=b===Vt?dt():{type:C};try{W.register(b,p)}catch(Te){t("register %s store failed: %o",b,Te)}$e.add(b);let S=Re.board,U=!1;O.subscribeList(b,p).then(Te=>{U=!rt(he,"board",S,b,Te)}).catch(Te=>{t("subscribe %s failed: %o",b,Te),Se(Te,"board")}).finally(()=>{$e.delete(b),U&&We()})}else it()},it=function(){Re.board+=1;for(let[f]of Ms){let b=he.get(f);b&&(b().catch(()=>{}),he.delete(f));try{W.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},pt=function(f){if(!f){bt();return}for(let[b,C]of vi){if(ze.has(b)||$e.has(b))continue;try{W.register(b,{type:C})}catch(U){t("register %s store failed: %o",b,U)}$e.add(b);let p=Re.worker,S=!1;O.subscribeList(b,{type:C}).then(U=>{S=!rt(ze,"worker",p,b,U)}).catch(U=>{t("subscribe %s failed: %o",b,U),Se(U,"worker")}).finally(()=>{$e.delete(b),S&&We()})}},bt=function(){Re.worker+=1;for(let[f]of vi){let b=ze.get(f);b&&(b().catch(()=>{}),ze.delete(f));try{W.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},Be=function(f){if(!f){lt();return}at||(K("subscribe-worker-queue",{id:ki}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),at=()=>K("unsubscribe-worker-queue",{id:ki}))},lt=function(){at&&(at().catch(()=>{}),at=null)},et=function(f){if(!f){I();return}Ve||(K("subscribe-monitor-pipeline",{id:yi}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),Ve=()=>K("unsubscribe-monitor-pipeline",{id:yi}))},I=function(){Ve&&(Ve().catch(()=>{}),Ve=null)},re=function(){B||(K("subscribe-ui-order",{id:wi}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),B=()=>K("unsubscribe-ui-order",{id:wi}))},se=function(){B&&(B().catch(()=>{}),B=null),ye.clear()},ve=function(){ie||(K("subscribe-display-policy",{id:$i}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),ie=()=>K("unsubscribe-display-policy",{id:$i}))},u=function(){ie&&(ie().catch(()=>{}),ie=null),_e.clear()},Ee=function(f){if(!f)return"Unknown";let b=f.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var i=Se,d=R,_=te,m=ge,h=rt,w=We,$=dt,g=ut,E=it,j=pt,Y=bt,Z=Be,M=lt,A=et,x=I,P=re,H=se,ce=ve,J=u,ae=Ee;let fe=document.getElementById("header-loading"),Le=Eo(fe),Ye=Ma(e),T=bi(),K=Le.wrapSend((f,b)=>T.send(f,b)),O=ko(K),W=wo(),de=xo(),le=oo(),ye=$o(),_e=so(),Ue=ao();T.on("monitor-pipeline-snapshot",f=>{let b=f;if(!(!b||!Array.isArray(b.workspaces)))try{le.set(b.workspaces,b.workspaces_state)}catch{}}),T.on("ui-order-snapshot",f=>{let b=f;if(b&&typeof b.revision=="number")try{ye.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),T.on("display-policy-snapshot",f=>{let b=f;if(b&&b.policy&&typeof b.policy=="object")try{_e.set(b.policy)}catch{}}),T.on("session-log-snapshot",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{Ue.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),T.on("session-log-append",f=>{let b=f;if(b&&typeof b.attempt_id=="string")try{Ue.append(b.attempt_id,b.event)}catch{}}),T.on("snapshot",f=>{let b=f,C=b&&typeof b.id=="string"?b.id:"",p=C?W.getStore(C):null;if(p&&b&&b.type==="snapshot")try{p.applyPush(b)}catch{}}),T.on("upsert",f=>{let b=f,C=b&&typeof b.id=="string"?b.id:"",p=C?W.getStore(C):null;if(p&&b&&b.type==="upsert")try{p.applyPush(b)}catch{}}),T.on("delete",f=>{let b=f,C=b&&typeof b.id=="string"?b.id:"",p=C?W.getStore(C):null;if(p&&b&&b.type==="delete")try{p.applyPush(b)}catch{}});let ue=null,Oe=null,F=null,N=null,pe=()=>{},qe=new Promise(f=>{pe=()=>f(void 0)}),D=!1,G=!1;async function ee(f){let b=R(f);if(b===Oe||b===F)return;F=b;let C=`detail:${f}`,p={type:"issue-detail",params:{id:f}};try{W.register(C,p)}catch(S){t("register detail store failed: %o",S)}try{let S=await O.subscribeList(C,p);if(ke.getState().selected_id!==f||R(f)!==b){await S().catch(()=>{});return}ue&&await ue().catch(()=>{}),ue=S,Oe=b}catch(S){t("detail subscribe failed: %o",S),Se(S,"issue details")}finally{F===b&&(F=null)}}let he=new Map,$e=new Set,Re={board:0,worker:0},Xe=kt;try{let f=window.localStorage.getItem(xi);Ft(f)&&(Xe=f)}catch{}async function Ae(f){if(!Ft(f)||f===Xe)return;Xe=f;try{window.localStorage.setItem(xi,f)}catch{}let b=he.get(Vt);if(!b)return;he.delete(Vt),await b().catch(()=>{});let C=dt();try{W.register(Vt,C)}catch(p){t("register %s store failed: %o",Vt,p)}try{let p=await O.subscribeList(Vt,C);he.set(Vt,p)}catch(p){t("re-subscribe %s failed: %o",Vt,p),Se(p,"board")}}let ze=new Map,at=null,Ve=null,B=null,ie=null;async function v(){ie=null,_e.clear(),at=null,Ve=null,he.clear(),ze.clear(),Re.board+=1,Re.worker+=1;let f=ke.getState().workspace.current?.path;if(f)try{await T.send("set-workspace",{path:f})}catch(C){t("workspace restore after reconnect failed: %o",C);return}ve();let b=ke.getState().view;ut(b==="board"),pt(b==="worker"),et(b==="monitor"),Be(b==="worker")}async function L(){t("clearing all subscriptions for workspace switch"),it(),bt(),lt(),de.clear(),se(),re(),u(),ve(),te();let f=ke.getState();if(f.selected_id)try{W.unregister(`detail:${f.selected_id}`)}catch{}let b=ke.getState();ut(b.view==="board"),pt(b.view==="worker"),et(b.view==="monitor"),Be(b.view==="worker"),b.selected_id&&ge(b.selected_id)}async function Q(f){t("requesting workspace switch to %s",f),G=!0;try{let b=await T.send("set-workspace",{path:f});t("workspace switch result: %o",b),b&&b.workspace&&(ke.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),b.changed&&(await L(),ne("Switched to "+Ee(f),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),ne("Failed to switch workspace","error",3e3),b}finally{G=!1}}async function X(f){t("requesting workspace git pull for %s",f);try{let b=await T.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let C=b?.status;if(C==="up_to_date"){ne("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){ne("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ne("Git pulled "+Ee(f),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let C=b?.code,p=b?.message;if(C==="rebase_conflict"){ne("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){ne("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){ne("Git pull skipped: another operation is running","warning",3e3);return}let S=p?`: ${p}`:"";throw ne(`Git pull failed${S}`,"error",3e3),b}}async function me(f,b){t("setting workspace visibility %s \u2192 %s",f,String(b));try{await T.send("set-workspace-visibility",{path:f,visible:b}),await Ne()}catch(C){t("workspace visibility update failed: %o",C),ne("Failed to update project visibility","error",3e3)}}async function Ne(){try{let f=await T.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let b=f.workspaces.map(U=>({path:U.path,database:U.database,pid:U.pid,version:U.version})),C=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,p=Array.isArray(f.hidden)?f.hidden.filter(U=>typeof U=="string"):[];ke.setState({workspace:{current:C,available:b,hidden:p}});let S=window.localStorage.getItem("beads-ui.workspace");S&&(!b.some(Te=>Te.path===S)||p.includes(S)?window.localStorage.removeItem("beads-ui.workspace"):C&&S!==C.path&&(t("restoring saved workspace preference: %s",S),await Q(S)))}}catch(f){t("failed to load workspaces: %o",f)}}T.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(ke.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),Ne(),L())});let Ke=!1;if(typeof T.onConnection=="function"){let f=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(Ke=!0,ne("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&Ke&&(Ke=!1,ne("Reconnected","success",2200),_u(ke,(C,p)=>{t(`${C}: %o`,p)}),v())};T.onConnection(f)}let nt="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(nt=f)}catch(f){t("view parse error: %o",f)}let ke=To({config:fu(),view:nt});T.on("worker-queue-snapshot",f=>{let b=f;if(!b||!b.queue)return;let C=ke.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&b.root_dir!==C){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{de.set(b.queue)}catch{}});let st=So(ke);st.start();let $t=new Set(["get-comments"]),Ge=async(f,b)=>{try{return await K(f,b)}catch(C){if($t.has(f))throw C;return[]}};n&&ni(n,ke,st);let ot=document.getElementById("workspace-picker");ot&&mi(ot,ke,Q,X,me);let be=ii(e,(f,b)=>K(f,b));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>be.open())}catch{}let Ce=Oa(e,{policyStore:_e,transport:(f,b)=>K(f,b),labelOptions:()=>{let f=new Set;for(let[b]of Ms)for(let C of W.snapshotFor(b)||[]){let p=C.labels;if(Array.isArray(p))for(let S of p)typeof S=="string"&&S.length>0&&f.add(S)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&f.addEventListener("click",()=>Ce.open())}catch{}let xt=No(s,{gotoIssue:f=>st.gotoIssue(f),issueStores:W,transport:Ge,uiOrderStore:ye,displayPolicyStore:_e,closedRange:Xe,onClosedRangeChange:f=>{Ae(f)},onNewIssue:()=>be.open()}),Mt=Ls(o,{transport:Ge,issueStores:W,queueStore:de,sessionLogStore:Ue,uiOrderStore:ye,gotoIssue:f=>ke.setState({selected_id:f}),getWorkspacePath:()=>ke.getState().workspace.current?.path}),we=ri(a,{transport:Ge,pipelineStore:le,gotoIssue:f=>st.gotoIssue(f),getWorkspacePath:()=>ke.getState().workspace.current?.path,switchWorkspace:f=>Q(f)}),y=La(c,{issueStores:W,transport:Ge,queueStore:de,sessionLogStore:Ue,getWorkspacePath:()=>ke.getState().workspace.current?.path,onNavigate:f=>{ke.getState().view==="worker"?ke.setState({selected_id:f}):st.gotoIssue(f)},onClose:()=>{let f=ke.getState();ke.setState({selected_id:null});try{st.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}}}),z=ke.getState().selected_id;z&&(c.hidden=!1,y.load(z),ge(z)),ke.subscribe(f=>{let b=f.selected_id;b?(c.hidden=!1,y.load(b),G||ge(b)):(y.clear(),c.hidden=!0,te())});let q=f=>{s.hidden=f.view!=="board",o.hidden=f.view!=="worker",a.hidden=f.view!=="monitor",ut(f.view==="board"),pt(f.view==="worker"),et(f.view==="monitor"),Be(f.view==="worker"),!f.selected_id&&f.view==="board"&&xt.load(),f.view==="worker"&&Mt.load(),f.view==="monitor"?we.load():we.pause(),window.localStorage.setItem("beads-ui.view",f.view)};ke.subscribe(q),q(ke.getState()),re(),ve(),Ne().finally(()=>{D=!0,pe()}),window.addEventListener("keydown",f=>{let b=f.ctrlKey||f.metaKey,C=String(f.key||"").toLowerCase(),p=f.target,S=p&&p.tagName?String(p.tagName).toLowerCase():"",U=S==="input"||S==="textarea"||S==="select"||p&&typeof p.isContentEditable=="boolean"&&p.isContentEditable;b&&C==="n"&&(U||(f.preventDefault(),be.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&mu(t)});export{mu as bootstrap,fu as readBootstrapConfig,_u as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
