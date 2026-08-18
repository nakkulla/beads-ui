var hd=Object.create;var Ws=Object.defineProperty;var bd=Object.getOwnPropertyDescriptor;var vd=Object.getOwnPropertyNames;var yd=Object.getPrototypeOf,wd=Object.prototype.hasOwnProperty;var kd=(e,t,r)=>t in e?Ws(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var zs=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var $d=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of vd(t))!wd.call(e,s)&&s!==r&&Ws(e,s,{get:()=>t[s],enumerable:!(n=bd(t,s))||n.enumerable});return e};var xd=(e,t,r)=>(r=e!=null?hd(yd(e)):{},$d(t||!e||!e.__esModule?Ws(r,"default",{value:e,enumerable:!0}):r,e));var Je=(e,t,r)=>kd(e,typeof t!="symbol"?t+"":t,r);var ja=zs((K_,Ua)=>{var Fr=1e3,qr=Fr*60,Br=qr*60,Er=Br*24,Ed=Er*7,Td=Er*365.25;Ua.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Cd(e);if(r==="number"&&isFinite(e))return t.long?Id(e):Rd(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Cd(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Td;case"weeks":case"week":case"w":return r*Ed;case"days":case"day":case"d":return r*Er;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Br;case"minutes":case"minute":case"mins":case"min":case"m":return r*qr;case"seconds":case"second":case"secs":case"sec":case"s":return r*Fr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Rd(e){var t=Math.abs(e);return t>=Er?Math.round(e/Er)+"d":t>=Br?Math.round(e/Br)+"h":t>=qr?Math.round(e/qr)+"m":t>=Fr?Math.round(e/Fr)+"s":e+"ms"}function Id(e){var t=Math.abs(e);return t>=Er?qn(e,t,Er,"day"):t>=Br?qn(e,t,Br,"hour"):t>=qr?qn(e,t,qr,"minute"):t>=Fr?qn(e,t,Fr,"second"):e+" ms"}function qn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var za=zs((Z_,Wa)=>{function Ld(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=c,r.humanize=ja(),r.destroy=d,Object.keys(e).forEach(_=>{r[_]=e[_]}),r.names=[],r.skips=[],r.formatters={};function t(_){let m=0;for(let h=0;h<_.length;h++)m=(m<<5)-m+_.charCodeAt(h),m|=0;return r.colors[Math.abs(m)%r.colors.length]}r.selectColor=t;function r(_){let m,h=null,E,$;function F(...q){if(!F.enabled)return;let S=F,x=Number(new Date),N=x-(m||x);S.diff=N,S.prev=m,S.curr=x,m=x,q[0]=r.coerce(q[0]),typeof q[0]!="string"&&q.unshift("%O");let L=0;q[0]=q[0].replace(/%([a-zA-Z%])/g,(W,X)=>{if(W==="%%")return"%";L++;let re=r.formatters[X];if(typeof re=="function"){let be=q[L];W=re.call(S,be),q.splice(L,1),L--}return W}),r.formatArgs.call(S,q),(S.log||r.log).apply(S,q)}return F.namespace=_,F.useColors=r.useColors(),F.color=r.selectColor(_),F.extend=n,F.destroy=r.destroy,Object.defineProperty(F,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(E!==r.namespaces&&(E=r.namespaces,$=r.enabled(_)),$),set:q=>{h=q}}),typeof r.init=="function"&&r.init(F),F}function n(_,m){let h=r(this.namespace+(typeof m>"u"?":":m)+_);return h.log=this.log,h}function s(_){r.save(_),r.namespaces=_,r.names=[],r.skips=[];let m=(typeof _=="string"?_:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of m)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(_,m){let h=0,E=0,$=-1,F=0;for(;h<_.length;)if(E<m.length&&(m[E]===_[h]||m[E]==="*"))m[E]==="*"?($=E,F=h,E++):(h++,E++);else if($!==-1)E=$+1,F++,h=F;else return!1;for(;E<m.length&&m[E]==="*";)E++;return E===m.length}function a(){let _=[...r.names,...r.skips.map(m=>"-"+m)].join(",");return r.enable(""),_}function c(_){for(let m of r.skips)if(o(_,m))return!1;for(let m of r.names)if(o(_,m))return!0;return!1}function l(_){return _ instanceof Error?_.stack||_.message:_}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Wa.exports=Ld});var Ha=zs((Ct,Bn)=>{Ct.formatArgs=Dd;Ct.save=Md;Ct.load=Pd;Ct.useColors=Od;Ct.storage=Nd();Ct.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ct.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Od(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Dd(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Bn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Ct.log=console.debug||console.log||(()=>{});function Md(e){try{e?Ct.storage.setItem("debug",e):Ct.storage.removeItem("debug")}catch{}}function Pd(){let e;try{e=Ct.storage.getItem("debug")||Ct.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Nd(){try{return localStorage}catch{}}Bn.exports=za()(Ct);var{formatters:Fd}=Bn.exports;Fd.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Qr=globalThis,On=Qr.trustedTypes,Aa=On?On.createPolicy("lit-html",{createHTML:e=>e}):void 0,Gs="$lit$",tr=`lit$${Math.random().toFixed(9).slice(2)}$`,Vs="?"+tr,Sd=`<${Vs}>`,$r=document,Jr=()=>$r.createComment(""),en=e=>e===null||typeof e!="object"&&typeof e!="function",Ys=Array.isArray,La=e=>Ys(e)||typeof e?.[Symbol.iterator]=="function",Hs=`[ 	
\f\r]`,Xr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ea=/-->/g,Ta=/>/g,wr=RegExp(`>|${Hs}(?:([^\\s"'>=/]+)(${Hs}*=${Hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ca=/'/g,Ra=/"/g,Oa=/^(?:script|style|textarea|title)$/i,Ks=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),i=Ks(1),pr=Ks(2),j_=Ks(3),Dt=Symbol.for("lit-noChange"),ct=Symbol.for("lit-nothing"),Ia=new WeakMap,kr=$r.createTreeWalker($r,129);function Da(e,t){if(!Ys(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Aa!==void 0?Aa.createHTML(t):t}var Ma=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Xr;for(let c=0;c<r;c++){let l=e[c],d,_,m=-1,h=0;for(;h<l.length&&(a.lastIndex=h,_=a.exec(l),_!==null);)h=a.lastIndex,a===Xr?_[1]==="!--"?a=Ea:_[1]!==void 0?a=Ta:_[2]!==void 0?(Oa.test(_[2])&&(s=RegExp("</"+_[2],"g")),a=wr):_[3]!==void 0&&(a=wr):a===wr?_[0]===">"?(a=s??Xr,m=-1):_[1]===void 0?m=-2:(m=a.lastIndex-_[2].length,d=_[1],a=_[3]===void 0?wr:_[3]==='"'?Ra:Ca):a===Ra||a===Ca?a=wr:a===Ea||a===Ta?a=Xr:(a=wr,s=void 0);let E=a===wr&&e[c+1].startsWith("/>")?" ":"";o+=a===Xr?l+Sd:m>=0?(n.push(d),l.slice(0,m)+Gs+l.slice(m)+tr+E):l+tr+(m===-2?c:E)}return[Da(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},tn=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,c=t.length-1,l=this.parts,[d,_]=Ma(t,r);if(this.el=e.createElement(d,n),kr.currentNode=this.el.content,r===2||r===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=kr.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(Gs)){let h=_[a++],E=s.getAttribute(m).split(tr),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:E,ctor:$[1]==="."?Mn:$[1]==="?"?Pn:$[1]==="@"?Nn:Sr}),s.removeAttribute(m)}else m.startsWith(tr)&&(l.push({type:6,index:o}),s.removeAttribute(m));if(Oa.test(s.tagName)){let m=s.textContent.split(tr),h=m.length-1;if(h>0){s.textContent=On?On.emptyScript:"";for(let E=0;E<h;E++)s.append(m[E],Jr()),kr.nextNode(),l.push({type:2,index:++o});s.append(m[h],Jr())}}}else if(s.nodeType===8)if(s.data===Vs)l.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(tr,m+1))!==-1;)l.push({type:7,index:o}),m+=tr.length-1}o++}}static createElement(t,r){let n=$r.createElement("template");return n.innerHTML=t,n}};function xr(e,t,r=e,n){if(t===Dt)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=en(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=xr(e,s._$AS(e,t.values),s,n)),t}var Dn=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??$r).importNode(r,!0);kr.currentNode=s;let o=kr.nextNode(),a=0,c=0,l=n[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new Nr(o,o.nextSibling,this,t):l.type===1?d=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(d=new Fn(o,this,t)),this._$AV.push(d),l=n[++c]}a!==l?.index&&(o=kr.nextNode(),a++)}return kr.currentNode=$r,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Nr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=ct,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=xr(this,t,r),en(t)?t===ct||t==null||t===""?(this._$AH!==ct&&this._$AR(),this._$AH=ct):t!==this._$AH&&t!==Dt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):La(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==ct&&en(this._$AH)?this._$AA.nextSibling.data=t:this.T($r.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=tn.createElement(Da(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Dn(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ia.get(t.strings);return r===void 0&&Ia.set(t.strings,r=new tn(t)),r}k(t){Ys(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Jr()),this.O(Jr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Sr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=ct,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=ct}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=xr(this,t,r,0),a=!en(t)||t!==this._$AH&&t!==Dt,a&&(this._$AH=t);else{let c=t,l,d;for(t=o[0],l=0;l<o.length-1;l++)d=xr(this,c[n+l],r,l),d===Dt&&(d=this._$AH[l]),a||(a=!en(d)||d!==this._$AH[l]),d===ct?t=ct:t!==ct&&(t+=(d??"")+o[l+1]),this._$AH[l]=d}a&&!s&&this.j(t)}j(t){t===ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Mn=class extends Sr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===ct?void 0:t}},Pn=class extends Sr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==ct)}},Nn=class extends Sr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=xr(this,t,r,0)??ct)===Dt)return;let n=this._$AH,s=t===ct&&n!==ct||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==ct&&(n===ct||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Fn=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){xr(this,t)}},Pa={M:Gs,P:tr,A:Vs,C:1,L:Ma,R:Dn,D:La,V:xr,I:Nr,H:Sr,N:Pn,U:Nn,B:Mn,F:Fn},Ad=Qr.litHtmlPolyfillSupport;Ad?.(tn,Nr),(Qr.litHtmlVersions??(Qr.litHtmlVersions=[])).push("3.3.1");var je=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Nr(t.insertBefore(Jr(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Xt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Mt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Ar(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Na(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Fa(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function qa(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Ba(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Ga=xd(Ha(),1);function it(e){return(0,Ga.default)(`beads-ui:${e}`)}function Wt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Tr(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Ka(e,t){let r=Wt(e.created_at),n=Wt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Za(e,t){let r=Wt(e.updated_at),n=Wt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Xa(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Wt(e.created_at),o=Wt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,c=t.id;return a<c?-1:a>c?1:0}function Qa(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var qd=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Va(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ya(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=qd.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ja(e,t){let r=Va(e),n=Va(t);if(r!==n)return r<n?-1:1;let s=Ya(e),o=Ya(t);if(s!==o)return s<o?-1:1;let a=Wt(e&&e.created_at),c=Wt(t&&t.created_at);if(a!==c)return a<c?-1:1;let l=e&&e.id,d=t&&t.id;return l===d?0:String(l)<String(d)?-1:1}var Zs=2**20;function Ur(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Wt(e&&e.created_at)}function Un(e){return(t,r)=>{let n=Ur(t,e),s=Ur(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function Xs(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,c=o+1<s?n[o+1]:null;if(!a&&!c)return{rank:0};if(!a)return{rank:Ur(c,r)-Zs};if(!c)return{rank:Ur(a,r)+Zs};let l=Ur(a,r),d=Ur(c,r),_=(l+d)/2;return l<_&&_<d?{rank:_}:{renormalize:n.map((m,h)=>({bead_id:m.id,rank:h*Zs}))}}function Qs(e,t={}){let r=it(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,c=!1,l=t.sort||Tr;function d(){for(let h of Array.from(a))try{h()}catch{}}function _(){s=Array.from(n.values()).sort(l)}function m(h){if(c||!h||h.id!==e)return;let E=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,E),!(E<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(E<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let F of $)F&&typeof F.id=="string"&&F.id.length>0&&n.set(F.id,F);_(),o=E,d();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let F=n.get($.id);if(!F)n.set($.id,$);else{let q=Number.isFinite(F.updated_at)?F.updated_at:0,S=Number.isFinite($.updated_at)?$.updated_at:0;if(q<=S){for(let x of Object.keys(F))x in $||delete F[x];for(let[x,N]of Object.entries($))F[x]=N}}_()}o=E,d()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),_()),o=E,d()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:m,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){c=!0,n.clear(),s=[],a.clear(),o=0}}}function jn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function ei(e){let t=it("subs"),r=new Map,n=new Map;function s(c,l){t("applyDelta %s +%d ~%d -%d",c,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let d=n.get(c);if(!d||d.size===0)return;let _=Array.isArray(l.added)?l.added:[],m=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let E of Array.from(d)){let $=r.get(E);if(!$)continue;let F=$.itemsById;for(let q of _)typeof q=="string"&&q.length>0&&F.set(q,!0);for(let q of m)typeof q=="string"&&q.length>0&&F.set(q,!0);for(let q of h)typeof q=="string"&&q.length>0&&F.delete(q)}}async function o(c,l){let d=jn(l);if(t("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let m=r.get(c);if(m&&m.key!==d){let h=n.get(m.key);h&&(h.delete(c),h.size===0&&n.delete(m.key)),r.set(c,{key:d,itemsById:new Map})}}n.has(d)||n.set(d,new Set);let _=n.get(d);_&&_.add(c);try{await e("subscribe-list",{id:c,type:l.type,params:l.params})}catch(m){let h=r.get(c)||null;if(h){let E=n.get(h.key);E&&(E.delete(c),E.size===0&&n.delete(h.key))}throw r.delete(c),m}return async()=>{t("unsubscribe %s key=%s",c,d);try{await e("unsubscribe-list",{id:c})}catch{}let m=r.get(c)||null;if(m){let h=n.get(m.key);h&&(h.delete(c),h.size===0&&n.delete(m.key))}r.delete(c)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:jn,selectors:{getIds(c){let l=r.get(c);return l?Array.from(l.itemsById.keys()):[]},has(c,l){let d=r.get(c);return d?d.itemsById.has(l):!1},count(c){let l=r.get(c);return l?l.itemsById.size:0},getItemsById(c){let l=r.get(c),d={};if(!l)return d;for(let _ of l.itemsById.keys())d[_]=!0;return d}}}}function ti(){let e=it("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,d,_){let m=d?jn(d):"",h=r.get(l)||"",E=t.has(l);if(e("register %s key=%s (prev=%s)",l,m,h),E&&h&&m&&h!==m){let $=t.get(l);if($)try{$.dispose()}catch{}let F=s.get(l);if(F){try{F()}catch{}s.delete(l)}let q=Qs(l,_);t.set(l,q);let S=q.subscribe(()=>o());s.set(l,S)}else if(!E){let $=Qs(l,_);t.set(l,$);let F=$.subscribe(()=>o());s.set(l,F)}return r.set(l,m),()=>c(l)}function c(l){e("unregister %s",l),r.delete(l);let d=t.get(l);d&&(d.dispose(),t.delete(l));let _=s.get(l);if(_){try{_()}catch{}s.delete(l)}}return{register:a,unregister:c,getStore(l){return t.get(l)||null},snapshotFor(l){let d=t.get(l);return d?d.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function ri(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ni(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function si(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Js(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Bd(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let c=new URLSearchParams(s).get("issue");if(c)return decodeURIComponent(c)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Ud(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function oi(e){let t=it("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Bd(n),a=Ud(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=Js(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?Js(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var jd=Object.freeze({workspace_config:{default_workspace:null}});function ai(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:jd.workspace_config.default_workspace}}}function ii(e={}){let t=it("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ai(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ai(o.config):r.config},c=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((d,_)=>d!==r.workspace.hidden[_]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((d,_)=>d===r.worker.show_closed_children[_])&&!c&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function li(e){let t=it("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let d=r>0;e.toggleAttribute("hidden",!d),e.setAttribute("aria-busy",d?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function c(){let d=r;r=Math.max(0,r-1),d<=0?t("done called but count was already %d",d):t("done count=%d\u2192%d",d,r),o()}function l(d){return async(m,h)=>{let E=s++,$=Date.now();n.set(E,{type:m,start_ts:$}),t("request start id=%d type=%s count=%d",E,m,r+1),a();let F=!1,q=()=>{F||(F=!0,n.delete(E),c())},S=setTimeout(()=>{F||(t("request TIMEOUT id=%d type=%s elapsed=%dms",E,m,Date.now()-$),q())},3e4);try{let x=await d(m,h),N=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",E,m,N),x}catch(x){let N=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",E,m,N,x),x}finally{clearTimeout(S),q()}}}return o(),{wrapSend:l,start:a,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(n.entries()).map(([_,m])=>({id:_,type:m.type,elapsed_ms:d-m.start_ts}))}}}function oe(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function Wn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,c){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Qa),l;switch(c){case"created_desc":return l.sort(Tr),l;case"created_asc":return l.sort(Ka),l;case"updated_desc":return l.sort(Za),l;case"priority":return l.sort(Xa),l;case"manual":default:{let d=r();return d?l.sort(Un(d)):l.sort(Tr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let c of a)try{c()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Cr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function ht(e){let t=Cr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Lt(e,t){let r=Cr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let c=Math.floor(s/864e5);if(c<7)return`${c}\uC77C \uC804`;let l=Math.floor(c/7);if(c<30)return`${l}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function zn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Cr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Hn(e){let t=e.transport,r=e.uiOrderStore;function n(a,c){return"renormalize"in a?a.renormalize:[{bead_id:c,rank:a.rank}]}function s(a,c){let l={...a.order};for(let d of c)l[d.bead_id]=d.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,c,l){if(!t||!r)return;let d=r.get()||{revision:0,order:{}},_=n(Xs(c,l,d.order),a);s(d,_);let m=await t("ui-order-set",{expected_revision:d.revision,entries:_});if(m&&m.conflict){let h={revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}};r.set(h);let E=n(Xs(c,l,h.order),a);s(h,E);let $=await t("ui-order-set",{expected_revision:h.revision,entries:E});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else m&&m.applied&&r.set({revision:typeof m.revision=="number"?m.revision:0,order:m.order||{}})}return{applyReorder:o}}function Gn(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function eo(e,t){return!t||typeof e!="string"||e.length===0||Gn(t.visible_labels).includes(e)?!0:Gn(t.hidden_labels).includes(e)?!1:!Gn(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Vn(e,t){return Gn(e).filter(r=>eo(r,t))}function fr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var Wd={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},di={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ci={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},zd={review:"\u2713",skip:"\u2298"},_r={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function Hd(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function ui(e){let t=e&&e.fill||"none";return t==="none"?_r.none:e&&e.stale===!0?_r.stale:t==="dim"?_r.dim:e&&e.glyph==="review"?_r.review:e&&e.glyph==="skip"?_r.skip:_r.done}function Gd(e){if(!e||e.fill==="none"||!e.approval_state)return ui(e);let t=[];return e.glyph==="review"?t.push(_r.review):e.glyph==="skip"&&t.push(_r.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function Vd(e,t,r){let n=Wd[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=zd[t&&t.glyph||""]||"",c="bar";s==="dim"?c+=` b-${n} dim`:s==="full"&&(c+=` b-${n} full`),o&&(c+=" stale"),r&&(c+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,d=r?`color: var(--stage-${n}-on)`:"";return i`
    <div class="seg">
      <div class=${c} style=${d}>${a}</div>
      <div class=${l}>
        ${di[e]||e}
      </div>
    </div>
  `}function Yn(e,t){if(!e||!e.stages)return"";let r=ci[e.route]||ci.spec_backed,n=e.stages,s=Hd(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${di[a]||a} ${a==="plan"?Gd(n[a]||{}):ui(n[a]||{})}`).join(" \xB7 ")}`;return i`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>Vd(a,n[a]||{},a===s))}
    </div>
  `}function Yd(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var pi=2;function Kd(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(i`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,pi).join(", "),s=r.length-pi,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(i`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function to(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Kn(e,t){if(!e)return null;let r=to(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=to(t?.kind),a=o!==null&&t?.kind!==e.kind,c=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,d=t?` \xB7 exec_receipt ${t.kind}:${t.actor}@${t.sha}`:"";return{kind:e.kind,label:c,title:`${l}${d}`}}function fi(e,t){let r=Kn(e,t);return r?i`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function Zd(e){if(!e)return null;let t=to(e.kind);return t?i`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${e.kind}:${e.actor}@${e.sha}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Xd(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&fr(r,"route")){let c=n.route_source==="derived";s.push(i`<span
        class="ctl-chip ctl-chip--route${c?" is-derived":""}"
        title=${c?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${c?"unset":n.route}</span
      >`)}if(n.fast_track&&fr(r,"fast_track")&&s.push(i`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&fr(r,"pr")){let c=n.pr.number;s.push(i`<span class="ctl-chip ctl-chip--pr"
        >${`PR${c!=null?` #${c}`:""}`}</span
      >`)}let o=fi(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let c=n.exec_receipt;s.push(i`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${c.kind}:${c.actor}@${c.sha}`}
        >${`exec ${c.kind==="delegated"?c.actor:`main:${c.actor}`} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let c=n.impl_entry;s.push(i`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${c.actor}@${c.sha}`}
        >${`impl ${c.actor} \xB7 ${c.sha.slice(0,7)}`}</span
      >`)}for(let c of Vn(e.labels,r))s.push(i`<span class="ctl-chip ctl-chip--label">${c}</span>`);return e.from_id&&fr(r,"from")&&s.push(i`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${c=>{c.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(c,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),fr(r,"blocked")&&s.push(...Kd(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&fr(r,"blocked")&&s.push(i`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":i`<div class="board-card__chips">${s}</div>`}function Qd(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function Jd(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<span class="board-card__times">
    ${t?i`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?i`<span class="board-card__time-sep">·</span>`:""}
    ${r?i`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function eu(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ja):r.children;return i`
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
        ${Jd(e)}
      </div>
      ${n>0&&r.current?i`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?i`<div class="board-card__roll-list">
            ${o.map((a,c)=>i`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${Qd(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${c+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                  ${Kn(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)?i`<span class="board-card__roll-child-chips">
                        ${fi(a.workflow?.chips?.planned_execution,a.workflow?.chips?.exec_receipt)}
                        ${Zd(a.workflow?.chips?.exec_receipt)}
                      </span>`:""}
                </button>`)}
          </div>`:""}
    </div>
  `}function Zn(e,t){let r=Yd(e.priority);return i`
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
      ${Xd(e,t)}
      ${e.workflow&&fr(t.policy||null,"stepper")?Yn(e.workflow,e.status):""}
      ${eu(e,t)}
    </article>
  `}function jr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return i`
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
              ${Xt.map(o=>i`<option
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
        ${e.items.map(o=>Zn(o,t))}
      </div>
    </section>
  `}function _i(e,t,r){return i`
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
          ${e.items.length===0?i`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Zn(n,t))}
        </div>
      </div>
    </dialog>
  `}var tu=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],ru=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],nu=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function su(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return i`
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
  `}function mi(e,t,r){return i`
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
        ${tu.map(n=>i`<option
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
        ${ru.map(n=>i`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${su(e,t,r)}
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
        ${nu.map(n=>i`<option
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
  `}var ou=200,au={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},iu=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),gi="beads-ui.board.sort",hi=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function lu(){try{let e=window.localStorage.getItem(gi);if(e&&hi.has(e))return e}catch{}return"created_desc"}function bi(e,t){let r=it("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,c=t.displayPolicyStore,l=t.workerQueueStore,d=t.onClosedRangeChange,_=t.onNewIssue,m=t.closedRange||It,h=s?Wn(s,a):null,E=Hn({transport:o,uiOrderStore:a}),$=[],F=[],q=[],S=[],x=[],N=[],L=!1,A=0,W=lu(),X=new Map,re=new Map,be=new Map,Q=new Set,ie={search:"",priority:"",type:"",labels:[]},ye=!1,Pe=null;function Te(z){return String(z.status||"open")==="open"}function De(z){let B=String(z.status||"open");return B==="open"||B==="blocked"}function We(z){let B=ie.search.trim().toLowerCase(),ge=ie.priority,pe=ie.type,we=ie.labels;return z.filter(Oe=>{if(B){let Xe=String(Oe.id||"").toLowerCase(),Ye=String(Oe.title||"").toLowerCase();if(!Xe.includes(B)&&!Ye.includes(B))return!1}if(ge!==""&&String(Oe.priority)!==ge||pe!==""&&String(Oe.issue_type||"")!==pe)return!1;if(we.length>0){let Xe=Array.isArray(Oe.labels)?Oe.labels:[];if(!we.some(Ye=>Xe.includes(Ye)))return!1}return!0})}function qe(){let z=new Set;for(let B of[$,F,q,S,x,N])for(let ge of B){let pe=Array.isArray(ge.labels)?ge.labels:[];for(let we of pe)typeof we=="string"&&we.length>0&&z.add(we)}return Array.from(z).sort()}function Ae(){return ie.search.trim()!==""||ie.priority!==""||ie.type!==""||ie.labels.length>0}function me(){try{if(h){let z=h.selectBoardColumn("tab:board:in-progress","in_progress",W),B=h.selectBoardColumn("tab:board:blocked","blocked",W).filter(De),ge=new Set(z.map(xe=>xe.id)),pe=h.selectBoardColumn("tab:board:ready","ready",W).filter(xe=>Te(xe)&&!ge.has(xe.id)),we=h.selectBoardColumn("tab:board:resolved","resolved",W),Oe=h.selectBoardColumn("tab:board:deferred","deferred",W),Xe=h.selectBoardColumn("tab:board:closed","closed").slice(0,ou),Ye=[...B,...pe,...z,...we,...Xe];Se(Ye);let Ie=new Set;for(let xe of Ye)xe&&xe.id&&!ro(xe)&&Ie.add(xe.id);let Qe=!Ae();$=Qe?rn(B,Ie):B,F=Qe?rn(pe,Ie):pe,q=Qe?rn(z,Ie):z,S=Qe?rn(we,Ie):we,x=Oe,A=Oe.length,N=Qe?rn(Xe,Ie):Xe,X=new Map;for(let xe of $)X.set(xe.id,"open");for(let xe of F)X.set(xe.id,"open");for(let xe of q)X.set(xe.id,"in_progress");for(let xe of S)X.set(xe.id,"resolved");for(let xe of x)X.set(xe.id,"deferred");for(let xe of N)X.set(xe.id,"closed");re=new Map;for(let xe of $)re.set(xe.id,"blocked-col");for(let xe of F)re.set(xe.id,"ready-col");for(let xe of q)re.set(xe.id,"in-progress-col");for(let xe of S)re.set(xe.id,"resolved-col");for(let xe of N)re.set(xe.id,"closed-col")}Re()}catch{$=[],F=[],q=[],S=[],x=[],N=[],be=new Map,Re()}}function Se(z){let B=new Map;for(let pe of z)pe&&pe.id&&!B.has(pe.id)&&B.set(pe.id,pe);let ge=new Map;for(let pe of B.values()){let we=ro(pe);if(!we)continue;let Oe=ge.get(we);Oe||(Oe=[],ge.set(we,Oe)),Oe.push({id:pe.id,title:pe.title,status:pe.status,metadata:pe.metadata,workflow:pe.workflow,created_at:pe.created_at,updated_at:pe.updated_at})}be=ge}function ce(z){let B=be.get(z)||[],ge=0;for(let we of B)(we.status==="resolved"||we.status==="closed")&&(ge+=1);let pe=zn(B);return{total:B.length,count:ge,current:pe,children:B}}function w(z){return!Q.has(z)}function k(z,B){z.preventDefault(),z.stopPropagation(),Q.has(B)?Q.delete(B):Q.add(B),Re()}function H(z,B){z.preventDefault(),z.stopPropagation(),n(B)}function U(z,B){z.preventDefault(),z.stopPropagation(),n(B)}function K(z,B){Pe||n(B)}function O(z,B){z.preventDefault(),z.stopPropagation(),cu(B).then(ge=>{ge&&oe("\uBCF5\uC0AC\uB428","success",1200)})}function I(z,B){Pe=B,z.dataTransfer&&(z.dataTransfer.setData("text/plain",B),z.dataTransfer.effectAllowed="move"),z.target.classList.add("board-card--dragging")}function _e(z){z.target.classList.remove("board-card--dragging"),vt(),setTimeout(()=>{Pe=null},0)}function Le(z){let B=String(z.target.value||"");!B||B===m||(m=B,d&&d(B),Re())}function j(){return c?c.get():null}function M(z){let B=l?l.get():null,ge=B?B.cleanup_failed:null;if(!ge||typeof ge!="object"||Array.isArray(ge))return null;let pe=ge[z];return!pe||typeof pe!="object"||Array.isArray(pe)?null:pe}let R={onCardClick:K,onCopyId:O,onDragStart:I,onDragEnd:_e,onClosedRangeChange:Le,rollupFor:ce,isExpanded:w,onRollupToggle:k,onChildClick:H,onFromChipClick:U,cleanupFailureFor:M,get policy(){return j()}};function J(z,B){Pe||(T(),n(B))}function ee(z,B){z.preventDefault(),z.stopPropagation(),T(),n(B)}let ue={...R,onCardClick:J,onChildClick:ee,onFromChipClick:ee,get policy(){return j()}};function ae(z){let B=z.target,ge=e.querySelector(".board-filter__labels");B&&ge&&ge.contains(B)||lt()}function Ee(z){z.key==="Escape"&&lt()}function Ve(){ye||(ye=!0,document.addEventListener("mousedown",ae),document.addEventListener("keydown",Ee),Re())}function lt(){ye&&(ye=!1,document.removeEventListener("mousedown",ae),document.removeEventListener("keydown",Ee),Re())}function ut(z){z.key==="Escape"&&T()}function Ze(){L||(L=!0,document.addEventListener("keydown",ut),Re())}function T(){L&&(L=!1,document.removeEventListener("keydown",ut),Re())}let V={onClose:T,onOverlayClick(z){z.target===z.currentTarget&&T()}},de={onSearchInput(z){ie.search=String(z.target.value||""),me()},onPriorityChange(z){ie.priority=String(z.target.value||""),me()},onTypeChange(z){ie.type=String(z.target.value||""),me()},onSortChange(z){let B=String(z.target.value||"");if(!(!hi.has(B)||B===W)){W=B;try{window.localStorage.setItem(gi,B)}catch{}me()}},onDeferredToggle(){L?T():Ze()},onLabelMenuToggle(){ye?lt():Ve()},onLabelToggle(z){let B=ie.labels.indexOf(z);B===-1?ie.labels.push(z):ie.labels.splice(B,1),me()},onLabelClear(){ie.labels.length!==0&&(ie.labels=[],me())},onNewIssue(){_&&_()}};function Me(){return i`
      <div class="board-view">
        ${mi(ie,de,{sort_mode:W,deferred_popup_open:L,deferred_count:A,label_options:qe(),label_menu_open:ye})}
        <div class="board-root">
          ${jr({title:"Blocked",id:"blocked-col",items:We($)},R)}
          ${jr({title:"Ready",id:"ready-col",items:We(F)},R)}
          ${jr({title:"In progress",id:"in-progress-col",items:We(q)},R)}
          ${jr({title:"Resolved",id:"resolved-col",items:We(S)},R)}
          ${jr({title:"Closed",id:"closed-col",items:We(N),is_closed:!0,closed_range:m},R)}
        </div>
        ${L?_i({items:We(x),count:A},ue,V):""}
      </div>
    `}function Re(){je(Me(),e),Ne()}function Ne(){try{let z=e.querySelector("#deferred-popup");z&&!z.open&&(typeof z.showModal=="function"?z.showModal():z.setAttribute("open",""));let B=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let ge of B)Array.from(ge.querySelectorAll(".board-card")).forEach((we,Oe)=>{we.tabIndex=Oe===0?0:-1})}catch{}}async function rt(z,B){if(!o){oe("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:z,status:B}),oe("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(ge){r("update-status failed: %o",ge),oe("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(z){switch(z){case"blocked-col":return $;case"ready-col":return F;case"in-progress-col":return q;case"resolved-col":return S;default:return[]}}function wt(z,B,ge){if(!o||!a)return;let pe=st(z),we=pe.find(Qe=>Qe.id===B);if(!we)return;let Oe=pe.filter(Qe=>Qe.id!==B),Xe=ge.closest?ge.closest(".board-card"):null,Ye=Oe.length;if(Xe){let Qe=Xe.getAttribute("data-issue-id");if(Qe===B)return;let xe=Oe.findIndex(_t=>_t.id===Qe);xe>=0&&(Ye=xe)}let Ie=Oe.slice();Ie.splice(Ye,0,we),E.applyReorder(B,Ie,Ye)}function vt(){for(let z of Array.from(e.querySelectorAll(".board-column--drag-over")))z.classList.remove("board-column--drag-over")}let dt=null;e.addEventListener("dragover",z=>{z.preventDefault(),z.dataTransfer&&(z.dataTransfer.dropEffect="move");let ge=z.target.closest(".board-column");ge&&ge!==dt&&(dt&&dt.classList.remove("board-column--drag-over"),ge.classList.add("board-column--drag-over"),dt=ge)}),e.addEventListener("dragleave",z=>{let B=z.relatedTarget;(!B||!e.contains(B))&&dt&&(dt.classList.remove("board-column--drag-over"),dt=null)}),e.addEventListener("drop",z=>{z.preventDefault(),dt&&(dt.classList.remove("board-column--drag-over"),dt=null);let B=z.target,ge=B.closest(".board-column");if(!ge)return;let pe=z.dataTransfer?.getData("text/plain")||"";if(!pe)return;let we=ge.id,Oe=re.get(pe);if(Oe&&Oe===we){if(iu.has(we)){if(W!=="manual"){oe("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}wt(we,pe,B)}return}let Xe=au[we];if(!Xe){oe("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}X.get(pe)!==Xe&&rt(pe,Xe)}),e.addEventListener("keydown",z=>{let B=z.target;if(!(B instanceof HTMLElement))return;let ge=String(B.tagName||"").toLowerCase();if(ge==="input"||ge==="textarea"||ge==="select"||ge==="button"||ge==="a"||B.isContentEditable===!0)return;let pe=B.closest(".board-card");if(!pe)return;let we=String(z.key||"");if(we==="Enter"||we===" "){z.preventDefault();let Ie=pe.getAttribute("data-issue-id");Ie&&n(Ie);return}if(we!=="ArrowUp"&&we!=="ArrowDown"&&we!=="ArrowLeft"&&we!=="ArrowRight")return;z.preventDefault();let Oe=pe.closest(".board-column");if(!Oe)return;let Xe=Array.from(Oe.querySelectorAll(".board-card")),Ye=Xe.indexOf(pe);if(we==="ArrowDown"&&Ye<Xe.length-1){kt(pe,Xe[Ye+1]);return}if(we==="ArrowUp"&&Ye>0){kt(pe,Xe[Ye-1]);return}if(we==="ArrowLeft"||we==="ArrowRight"){let Ie=Array.from(e.querySelectorAll(".board-column")),Qe=Ie.indexOf(Oe),xe=we==="ArrowRight"?1:-1,_t=Qe+xe;for(;_t>=0&&_t<Ie.length;){let Tt=Ie[_t].querySelector(".board-card");if(Tt){kt(pe,Tt);return}_t+=xe}}});function kt(z,B){try{z.tabIndex=-1,B.tabIndex=0,B.focus()}catch{}}let ot=null;h&&h.subscribe&&(ot=h.subscribe(()=>{try{me()}catch{}}));let at=null;c&&c.subscribe&&(at=c.subscribe(()=>{try{me()}catch{}}));let mt=null;return l&&l.subscribe&&(mt=l.subscribe(()=>{Re()})),{async load(){r("load"),me()},clear(){lt(),T(),ot&&(ot(),ot=null),at&&(at(),at=null),mt&&(mt(),mt=null),e.replaceChildren(),$=[],F=[],q=[],S=[],x=[],N=[],X=new Map,re=new Map}}}function ro(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function rn(e,t){return e.filter(r=>{let n=ro(r);return!(n&&t.has(n))})}async function cu(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function Rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function Qt(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function mr(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function du(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),c=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",c.textContent=`${Qt(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${Qt(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,c,n,s,o),t.body.append(r),new Promise(l=>{let d=_=>{typeof r.close=="function"&&r.close(),r.remove(),l(_)};n.addEventListener("click",()=>d("prior_session")),s.addEventListener("click",()=>d("fresh_current")),o.addEventListener("click",()=>d(null)),r.addEventListener("cancel",_=>{_.preventDefault(),d(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function rr(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await du(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var $i="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var nr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],nn=[...nr,"reasoning_output_tokens"],uu=["implementation","review-consult"];function no(e){let t=0;for(let r of nr)t+=bt(e?.[r]);return t}function pu(e){return!e||typeof e!="object"?!1:nr.some(t=>Number.isFinite(e[t]))}function vi(e){return!e||typeof e!="object"?!1:nn.some(t=>Number.isFinite(e[t]))}function fu(e){let t={};for(let r of nn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function yi(e){let t={};for(let r of nn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function wi(e,t){return e==="codex"?bt(t.input_tokens)+bt(t.output_tokens):no(t)}function _u(e){return e==="claude"?"Claude":"Codex"}function mu(e){return`\u03C4 ${xi(e)}`}function gu(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push($i),o.join(`
`)}function yt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${_u(r)} ${mu(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:gu(r,n)})}return t}function Qn(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let c=t[o];c||(c={subtotal:0,breakdown:{}},t[o]=c),c.subtotal+=a.subtotal;for(let l of nn)Number.isFinite(a.breakdown[l])&&(c.breakdown[l]=bt(c.breakdown[l])+bt(a.breakdown[l]));a.replayed&&(c.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function so(e){return!e||typeof e!="object"?null:Pt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function hu(e){return e==="codex"?"codex":"claude"}function gr(){return{subtotal:0,breakdown:fu(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Xn(e,t,r){e.subtotal+=t.subtotal;for(let n of nn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=bt(e.breakdown[n])+bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ki(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function xi(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Wr(e){return pu(e)?`\u03C4 ${xi(no(e))}`:null}function zt(e){let t=Wr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function zr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${no(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push($i),r.join(`
`)}function Pt(e,t){let r={claude:gr(),codex:gr()},n={orchestrator:{claude:gr(),codex:gr()},implementation:{claude:gr(),codex:gr()},"review-consult":{claude:gr(),codex:gr()}},s=new Set;for(let c of Object.values(e||{})){if(!c||c.bead_id!==t)continue;let l=c.usage;if(vi(l)){let _=hu(c.runner),m=yi(l),h={provider:_,role:"orchestrator",attempt_id:String(c.attempt_id||""),usage:m,subtotal:wi(_,m)};m.replayed===!0&&(h.replayed=!0),typeof c.model=="string"&&(h.model=c.model),typeof c.session_id=="string"&&(h.session_id=c.session_id),Xn(r[_],h,!0),Xn(n.orchestrator[_],h,!0)}let d=Array.isArray(c.usage_legs)?c.usage_legs:[];for(let _ of d){if(!_||_.provider!=="codex"||!uu.includes(_.role)||!vi(_.usage))continue;let m=typeof _.receipt_id=="string"&&_.receipt_id.length>0?_.receipt_id:null;if(!m||s.has(m))continue;s.add(m);let h=yi(_.usage),E={provider:"codex",role:_.role,attempt_id:String(c.attempt_id||""),usage:h,subtotal:wi("codex",h)};E.receipt_id=m,typeof _.model=="string"&&(E.model=_.model),typeof _.session_id=="string"?E.session_id=_.session_id:typeof _.thread_id=="string"&&(E.session_id=_.thread_id),typeof _.turn_id=="string"&&(E.turn_id=_.turn_id),typeof _.completed_at=="string"&&(E.completed_at=_.completed_at),h.replayed===!0&&(E.replayed=!0),Xn(r.codex,E,!1),Xn(n[E.role].codex,E,!1)}}let o={};for(let c of["claude","codex"]){let l=r[c];if(l.legs.length===0)continue;let d=ki(l,!1);c==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(d.total_cost_usd=l.outer_cost),o[c]=d}if(Object.keys(o).length===0)return null;let a={};for(let c of["orchestrator","implementation","review-consult"]){let l={};for(let d of["claude","codex"]){let _=n[c][d];_.legs.length>0&&(l[d]={...ki(_,!0),legs:_.legs})}Object.keys(l).length>0&&(a[c]=l)}return{providers:o,roles:a}}var{entries:Oi,setPrototypeOf:Si,isFrozen:bu,getPrototypeOf:vu,getOwnPropertyDescriptor:yu}=Object,{freeze:St,seal:Nt,create:po}=Object,{apply:fo,construct:_o}=typeof Reflect<"u"&&Reflect;St||(St=function(t){return t});Nt||(Nt=function(t){return t});fo||(fo=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});_o||(_o=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Jn=At(Array.prototype.forEach),wu=At(Array.prototype.lastIndexOf),Ai=At(Array.prototype.pop),sn=At(Array.prototype.push),ku=At(Array.prototype.splice),ts=At(String.prototype.toLowerCase),oo=At(String.prototype.toString),ao=At(String.prototype.match),on=At(String.prototype.replace),$u=At(String.prototype.indexOf),xu=At(String.prototype.trim),Ht=At(Object.prototype.hasOwnProperty),xt=At(RegExp.prototype.test),an=Su(TypeError);function At(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return fo(e,t,n)}}function Su(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return _o(e,r)}}function Ue(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ts;Si&&Si(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(bu(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Au(e){for(let t=0;t<e.length;t++)Ht(e,t)||(e[t]=null);return e}function sr(e){let t=po(null);for(let[r,n]of Oi(e))Ht(e,r)&&(Array.isArray(n)?t[r]=Au(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=sr(n):t[r]=n);return t}function ln(e,t){for(;e!==null;){let n=yu(e,t);if(n){if(n.get)return At(n.get);if(typeof n.value=="function")return At(n.value)}e=vu(e)}function r(){return null}return r}var Ei=St(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),io=St(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),lo=St(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Eu=St(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),co=St(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tu=St(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ti=St(["#text"]),Ci=St(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),uo=St(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ri=St(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),es=St(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Cu=Nt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ru=Nt(/<%[\w\W]*|[\w\W]*%>/gm),Iu=Nt(/\$\{[\w\W]*/gm),Lu=Nt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ou=Nt(/^aria-[\-\w]+$/),Di=Nt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Du=Nt(/^(?:\w+script|data):/i),Mu=Nt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Mi=Nt(/^html$/i),Pu=Nt(/^[a-z][.\w]*(-[.\w]+)+$/i),Ii=Object.freeze({__proto__:null,ARIA_ATTR:Ou,ATTR_WHITESPACE:Mu,CUSTOM_ELEMENT:Pu,DATA_ATTR:Lu,DOCTYPE_NAME:Mi,ERB_EXPR:Ru,IS_ALLOWED_URI:Di,IS_SCRIPT_OR_DATA:Du,MUSTACHE_EXPR:Cu,TMPLIT_EXPR:Iu}),cn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Nu=function(){return typeof window>"u"?null:window},Fu=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Li=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Pi(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Nu(),t=te=>Pi(te);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==cn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:c,Element:l,NodeFilter:d,NamedNodeMap:_=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:m,DOMParser:h,trustedTypes:E}=e,$=l.prototype,F=ln($,"cloneNode"),q=ln($,"remove"),S=ln($,"nextSibling"),x=ln($,"childNodes"),N=ln($,"parentNode");if(typeof a=="function"){let te=r.createElement("template");te.content&&te.content.ownerDocument&&(r=te.content.ownerDocument)}let L,A="",{implementation:W,createNodeIterator:X,createDocumentFragment:re,getElementsByTagName:be}=r,{importNode:Q}=n,ie=Li();t.isSupported=typeof Oi=="function"&&typeof N=="function"&&W&&W.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ye,ERB_EXPR:Pe,TMPLIT_EXPR:Te,DATA_ATTR:De,ARIA_ATTR:We,IS_SCRIPT_OR_DATA:qe,ATTR_WHITESPACE:Ae,CUSTOM_ELEMENT:me}=Ii,{IS_ALLOWED_URI:Se}=Ii,ce=null,w=Ue({},[...Ei,...io,...lo,...co,...Ti]),k=null,H=Ue({},[...Ci,...uo,...Ri,...es]),U=Object.seal(po(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),K=null,O=null,I=Object.seal(po(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),_e=!0,Le=!0,j=!1,M=!0,R=!1,J=!0,ee=!1,ue=!1,ae=!1,Ee=!1,Ve=!1,lt=!1,ut=!0,Ze=!1,T="user-content-",V=!0,de=!1,Me={},Re=null,Ne=Ue({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),rt=null,st=Ue({},["audio","video","img","source","image","track"]),wt=null,vt=Ue({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),dt="http://www.w3.org/1998/Math/MathML",kt="http://www.w3.org/2000/svg",ot="http://www.w3.org/1999/xhtml",at=ot,mt=!1,z=null,B=Ue({},[dt,kt,ot],oo),ge=Ue({},["mi","mo","mn","ms","mtext"]),pe=Ue({},["annotation-xml"]),we=Ue({},["title","style","font","a","script"]),Oe=null,Xe=["application/xhtml+xml","text/html"],Ye="text/html",Ie=null,Qe=null,xe=r.createElement("form"),_t=function(b){return b instanceof RegExp||b instanceof Function},Tt=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Qe&&Qe===b)){if((!b||typeof b!="object")&&(b={}),b=sr(b),Oe=Xe.indexOf(b.PARSER_MEDIA_TYPE)===-1?Ye:b.PARSER_MEDIA_TYPE,Ie=Oe==="application/xhtml+xml"?oo:ts,ce=Ht(b,"ALLOWED_TAGS")?Ue({},b.ALLOWED_TAGS,Ie):w,k=Ht(b,"ALLOWED_ATTR")?Ue({},b.ALLOWED_ATTR,Ie):H,z=Ht(b,"ALLOWED_NAMESPACES")?Ue({},b.ALLOWED_NAMESPACES,oo):B,wt=Ht(b,"ADD_URI_SAFE_ATTR")?Ue(sr(vt),b.ADD_URI_SAFE_ATTR,Ie):vt,rt=Ht(b,"ADD_DATA_URI_TAGS")?Ue(sr(st),b.ADD_DATA_URI_TAGS,Ie):st,Re=Ht(b,"FORBID_CONTENTS")?Ue({},b.FORBID_CONTENTS,Ie):Ne,K=Ht(b,"FORBID_TAGS")?Ue({},b.FORBID_TAGS,Ie):sr({}),O=Ht(b,"FORBID_ATTR")?Ue({},b.FORBID_ATTR,Ie):sr({}),Me=Ht(b,"USE_PROFILES")?b.USE_PROFILES:!1,_e=b.ALLOW_ARIA_ATTR!==!1,Le=b.ALLOW_DATA_ATTR!==!1,j=b.ALLOW_UNKNOWN_PROTOCOLS||!1,M=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,R=b.SAFE_FOR_TEMPLATES||!1,J=b.SAFE_FOR_XML!==!1,ee=b.WHOLE_DOCUMENT||!1,Ee=b.RETURN_DOM||!1,Ve=b.RETURN_DOM_FRAGMENT||!1,lt=b.RETURN_TRUSTED_TYPE||!1,ae=b.FORCE_BODY||!1,ut=b.SANITIZE_DOM!==!1,Ze=b.SANITIZE_NAMED_PROPS||!1,V=b.KEEP_CONTENT!==!1,de=b.IN_PLACE||!1,Se=b.ALLOWED_URI_REGEXP||Di,at=b.NAMESPACE||ot,ge=b.MATHML_TEXT_INTEGRATION_POINTS||ge,pe=b.HTML_INTEGRATION_POINTS||pe,U=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&_t(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(U.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&_t(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(U.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),R&&(Le=!1),Ve&&(Ee=!0),Me&&(ce=Ue({},Ti),k=[],Me.html===!0&&(Ue(ce,Ei),Ue(k,Ci)),Me.svg===!0&&(Ue(ce,io),Ue(k,uo),Ue(k,es)),Me.svgFilters===!0&&(Ue(ce,lo),Ue(k,uo),Ue(k,es)),Me.mathMl===!0&&(Ue(ce,co),Ue(k,Ri),Ue(k,es))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?I.tagCheck=b.ADD_TAGS:(ce===w&&(ce=sr(ce)),Ue(ce,b.ADD_TAGS,Ie))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?I.attributeCheck=b.ADD_ATTR:(k===H&&(k=sr(k)),Ue(k,b.ADD_ATTR,Ie))),b.ADD_URI_SAFE_ATTR&&Ue(wt,b.ADD_URI_SAFE_ATTR,Ie),b.FORBID_CONTENTS&&(Re===Ne&&(Re=sr(Re)),Ue(Re,b.FORBID_CONTENTS,Ie)),V&&(ce["#text"]=!0),ee&&Ue(ce,["html","head","body"]),ce.table&&(Ue(ce,["tbody"]),delete K.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw an('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');L=b.TRUSTED_TYPES_POLICY,A=L.createHTML("")}else L===void 0&&(L=Fu(E,s)),L!==null&&typeof A=="string"&&(A=L.createHTML(""));St&&St(b),Qe=b}},Bt=Ue({},[...io,...lo,...Eu]),Ut=Ue({},[...co,...Tu]),dr=function(b){let G=N(b);(!G||!G.tagName)&&(G={namespaceURI:at,tagName:"template"});let ne=ts(b.tagName),Fe=ts(G.tagName);return z[b.namespaceURI]?b.namespaceURI===kt?G.namespaceURI===ot?ne==="svg":G.namespaceURI===dt?ne==="svg"&&(Fe==="annotation-xml"||ge[Fe]):!!Bt[ne]:b.namespaceURI===dt?G.namespaceURI===ot?ne==="math":G.namespaceURI===kt?ne==="math"&&pe[Fe]:!!Ut[ne]:b.namespaceURI===ot?G.namespaceURI===kt&&!pe[Fe]||G.namespaceURI===dt&&!ge[Fe]?!1:!Ut[ne]&&(we[ne]||!Bt[ne]):!!(Oe==="application/xhtml+xml"&&z[b.namespaceURI]):!1},gt=function(b){sn(t.removed,{element:b});try{N(b).removeChild(b)}catch{q(b)}},$t=function(b,G){try{sn(t.removed,{attribute:G.getAttributeNode(b),from:G})}catch{sn(t.removed,{attribute:null,from:G})}if(G.removeAttribute(b),b==="is")if(Ee||Ve)try{gt(G)}catch{}else try{G.setAttribute(b,"")}catch{}},er=function(b){let G=null,ne=null;if(ae)b="<remove></remove>"+b;else{let He=ao(b,/^[\r\n\t ]+/);ne=He&&He[0]}Oe==="application/xhtml+xml"&&at===ot&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let Fe=L?L.createHTML(b):b;if(at===ot)try{G=new h().parseFromString(Fe,Oe)}catch{}if(!G||!G.documentElement){G=W.createDocument(at,"template",null);try{G.documentElement.innerHTML=mt?A:Fe}catch{}}let et=G.body||G.documentElement;return b&&ne&&et.insertBefore(r.createTextNode(ne),et.childNodes[0]||null),at===ot?be.call(G,ee?"html":"body")[0]:ee?G.documentElement:et},ur=function(b){return X.call(b.ownerDocument||b,b,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Ot=function(b){return b instanceof m&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof _)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},p=function(b){return typeof c=="function"&&b instanceof c};function v(te,b,G){Jn(te,ne=>{ne.call(t,b,G,Qe)})}let P=function(b){let G=null;if(v(ie.beforeSanitizeElements,b,null),Ot(b))return gt(b),!0;let ne=Ie(b.nodeName);if(v(ie.uponSanitizeElement,b,{tagName:ne,allowedTags:ce}),J&&b.hasChildNodes()&&!p(b.firstElementChild)&&xt(/<[/\w!]/g,b.innerHTML)&&xt(/<[/\w!]/g,b.textContent)||b.nodeType===cn.progressingInstruction||J&&b.nodeType===cn.comment&&xt(/<[/\w]/g,b.data))return gt(b),!0;if(!(I.tagCheck instanceof Function&&I.tagCheck(ne))&&(!ce[ne]||K[ne])){if(!K[ne]&&le(ne)&&(U.tagNameCheck instanceof RegExp&&xt(U.tagNameCheck,ne)||U.tagNameCheck instanceof Function&&U.tagNameCheck(ne)))return!1;if(V&&!Re[ne]){let Fe=N(b)||b.parentNode,et=x(b)||b.childNodes;if(et&&Fe){let He=et.length;for(let ve=He-1;ve>=0;--ve){let y=F(et[ve],!0);y.__removalCount=(b.__removalCount||0)+1,Fe.insertBefore(y,S(b))}}}return gt(b),!0}return b instanceof l&&!dr(b)||(ne==="noscript"||ne==="noembed"||ne==="noframes")&&xt(/<\/no(script|embed|frames)/i,b.innerHTML)?(gt(b),!0):(R&&b.nodeType===cn.text&&(G=b.textContent,Jn([ye,Pe,Te],Fe=>{G=on(G,Fe," ")}),b.textContent!==G&&(sn(t.removed,{element:b.cloneNode()}),b.textContent=G)),v(ie.afterSanitizeElements,b,null),!1)},Y=function(b,G,ne){if(ut&&(G==="id"||G==="name")&&(ne in r||ne in xe))return!1;if(!(Le&&!O[G]&&xt(De,G))){if(!(_e&&xt(We,G))){if(!(I.attributeCheck instanceof Function&&I.attributeCheck(G,b))){if(!k[G]||O[G]){if(!(le(b)&&(U.tagNameCheck instanceof RegExp&&xt(U.tagNameCheck,b)||U.tagNameCheck instanceof Function&&U.tagNameCheck(b))&&(U.attributeNameCheck instanceof RegExp&&xt(U.attributeNameCheck,G)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(G,b))||G==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&xt(U.tagNameCheck,ne)||U.tagNameCheck instanceof Function&&U.tagNameCheck(ne))))return!1}else if(!wt[G]){if(!xt(Se,on(ne,Ae,""))){if(!((G==="src"||G==="xlink:href"||G==="href")&&b!=="script"&&$u(ne,"data:")===0&&rt[b])){if(!(j&&!xt(qe,on(ne,Ae,"")))){if(ne)return!1}}}}}}}return!0},le=function(b){return b!=="annotation-xml"&&ao(b,me)},ze=function(b){v(ie.beforeSanitizeAttributes,b,null);let{attributes:G}=b;if(!G||Ot(b))return;let ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:k,forceKeepAttr:void 0},Fe=G.length;for(;Fe--;){let et=G[Fe],{name:He,namespaceURI:ve,value:y}=et,f=Ie(He),u=y,C=He==="value"?u:xu(u);if(ne.attrName=f,ne.attrValue=C,ne.keepAttr=!0,ne.forceKeepAttr=void 0,v(ie.uponSanitizeAttribute,b,ne),C=ne.attrValue,Ze&&(f==="id"||f==="name")&&($t(He,b),C=T+C),J&&xt(/((--!?|])>)|<\/(style|title|textarea)/i,C)){$t(He,b);continue}if(f==="attributename"&&ao(C,"href")){$t(He,b);continue}if(ne.forceKeepAttr)continue;if(!ne.keepAttr){$t(He,b);continue}if(!M&&xt(/\/>/i,C)){$t(He,b);continue}R&&Jn([ye,Pe,Te],fe=>{C=on(C,fe," ")});let Z=Ie(b.nodeName);if(!Y(Z,f,C)){$t(He,b);continue}if(L&&typeof E=="object"&&typeof E.getAttributeType=="function"&&!ve)switch(E.getAttributeType(Z,f)){case"TrustedHTML":{C=L.createHTML(C);break}case"TrustedScriptURL":{C=L.createScriptURL(C);break}}if(C!==u)try{ve?b.setAttributeNS(ve,He,C):b.setAttribute(He,C),Ot(b)?gt(b):Ai(t.removed)}catch{$t(He,b)}}v(ie.afterSanitizeAttributes,b,null)},ke=function te(b){let G=null,ne=ur(b);for(v(ie.beforeSanitizeShadowDOM,b,null);G=ne.nextNode();)v(ie.uponSanitizeShadowNode,G,null),P(G),ze(G),G.content instanceof o&&te(G.content);v(ie.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(te){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},G=null,ne=null,Fe=null,et=null;if(mt=!te,mt&&(te="<!-->"),typeof te!="string"&&!p(te))if(typeof te.toString=="function"){if(te=te.toString(),typeof te!="string")throw an("dirty is not a string, aborting")}else throw an("toString is not a function");if(!t.isSupported)return te;if(ue||Tt(b),t.removed=[],typeof te=="string"&&(de=!1),de){if(te.nodeName){let y=Ie(te.nodeName);if(!ce[y]||K[y])throw an("root node is forbidden and cannot be sanitized in-place")}}else if(te instanceof c)G=er("<!---->"),ne=G.ownerDocument.importNode(te,!0),ne.nodeType===cn.element&&ne.nodeName==="BODY"||ne.nodeName==="HTML"?G=ne:G.appendChild(ne);else{if(!Ee&&!R&&!ee&&te.indexOf("<")===-1)return L&&lt?L.createHTML(te):te;if(G=er(te),!G)return Ee?null:lt?A:""}G&&ae&&gt(G.firstChild);let He=ur(de?te:G);for(;Fe=He.nextNode();)P(Fe),ze(Fe),Fe.content instanceof o&&ke(Fe.content);if(de)return te;if(Ee){if(Ve)for(et=re.call(G.ownerDocument);G.firstChild;)et.appendChild(G.firstChild);else et=G;return(k.shadowroot||k.shadowrootmode)&&(et=Q.call(n,et,!0)),et}let ve=ee?G.outerHTML:G.innerHTML;return ee&&ce["!doctype"]&&G.ownerDocument&&G.ownerDocument.doctype&&G.ownerDocument.doctype.name&&xt(Mi,G.ownerDocument.doctype.name)&&(ve="<!DOCTYPE "+G.ownerDocument.doctype.name+`>
`+ve),R&&Jn([ye,Pe,Te],y=>{ve=on(ve,y," ")}),L&&lt?L.createHTML(ve):ve},t.setConfig=function(){let te=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Tt(te),ue=!0},t.clearConfig=function(){Qe=null,ue=!1},t.isValidAttribute=function(te,b,G){Qe||Tt({});let ne=Ie(te),Fe=Ie(b);return Y(ne,Fe,G)},t.addHook=function(te,b){typeof b=="function"&&sn(ie[te],b)},t.removeHook=function(te,b){if(b!==void 0){let G=wu(ie[te],b);return G===-1?void 0:ku(ie[te],G,1)[0]}return Ai(ie[te])},t.removeHooks=function(te){ie[te]=[]},t.removeAllHooks=function(){ie=Li()},t}var Ni=Pi();var or={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rs=e=>(...t)=>({_$litDirective$:e,values:t}),Hr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var dn=class extends Hr{constructor(t){if(super(t),this.it=ct,t.type!==or.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===ct||t==null)return this._t=void 0,this.it=t;if(t===Dt)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dn.directiveName="unsafeHTML",dn.resultType=1;var Fi=rs(dn);function bo(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Lr=bo();function Hi(e){Lr=e}var _n={exec:()=>null};function Ge(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Et.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var qu=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Et={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Bu=/^(?:[ \t]*(?:\n|$))+/,Uu=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ju=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,mn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Wu=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,vo=/(?:[*+-]|\d{1,9}[.)])/,Gi=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Vi=Ge(Gi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),zu=Ge(Gi).replace(/bull/g,vo).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),yo=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Hu=/^[^\n]+/,wo=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gu=Ge(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",wo).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Vu=Ge(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,vo).getRegex(),ls="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ko=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yu=Ge("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ko).replace("tag",ls).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Yi=Ge(yo).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ls).getRegex(),Ku=Ge(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Yi).getRegex(),$o={blockquote:Ku,code:Uu,def:Gu,fences:ju,heading:Wu,hr:mn,html:Yu,lheading:Vi,list:Vu,newline:Bu,paragraph:Yi,table:_n,text:Hu},qi=Ge("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ls).getRegex(),Zu={...$o,lheading:zu,table:qi,paragraph:Ge(yo).replace("hr",mn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",qi).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ls).getRegex()},Xu={...$o,html:Ge(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ko).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_n,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Ge(yo).replace("hr",mn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Vi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qu=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ju=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Ki=/^( {2,}|\\)\n(?!\s*$)/,ep=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,cs=/[\p{P}\p{S}]/u,xo=/[\s\p{P}\p{S}]/u,Zi=/[^\s\p{P}\p{S}]/u,tp=Ge(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,xo).getRegex(),Xi=/(?!~)[\p{P}\p{S}]/u,rp=/(?!~)[\s\p{P}\p{S}]/u,np=/(?:[^\s\p{P}\p{S}]|~)/u,sp=Ge(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",qu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,op=Ge(Qi,"u").replace(/punct/g,cs).getRegex(),ap=Ge(Qi,"u").replace(/punct/g,Xi).getRegex(),Ji="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ip=Ge(Ji,"gu").replace(/notPunctSpace/g,Zi).replace(/punctSpace/g,xo).replace(/punct/g,cs).getRegex(),lp=Ge(Ji,"gu").replace(/notPunctSpace/g,np).replace(/punctSpace/g,rp).replace(/punct/g,Xi).getRegex(),cp=Ge("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Zi).replace(/punctSpace/g,xo).replace(/punct/g,cs).getRegex(),dp=Ge(/\\(punct)/,"gu").replace(/punct/g,cs).getRegex(),up=Ge(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pp=Ge(ko).replace("(?:-->|$)","-->").getRegex(),fp=Ge("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",pp).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),os=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,_p=Ge(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",os).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),el=Ge(/^!?\[(label)\]\[(ref)\]/).replace("label",os).replace("ref",wo).getRegex(),tl=Ge(/^!?\[(ref)\](?:\[\])?/).replace("ref",wo).getRegex(),mp=Ge("reflink|nolink(?!\\()","g").replace("reflink",el).replace("nolink",tl).getRegex(),Bi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,So={_backpedal:_n,anyPunctuation:dp,autolink:up,blockSkip:sp,br:Ki,code:Ju,del:_n,emStrongLDelim:op,emStrongRDelimAst:ip,emStrongRDelimUnd:cp,escape:Qu,link:_p,nolink:tl,punctuation:tp,reflink:el,reflinkSearch:mp,tag:fp,text:ep,url:_n},gp={...So,link:Ge(/^!?\[(label)\]\((.*?)\)/).replace("label",os).getRegex(),reflink:Ge(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",os).getRegex()},mo={...So,emStrongRDelimAst:lp,emStrongLDelim:ap,url:Ge(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Bi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Ge(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Bi).getRegex()},hp={...mo,br:Ge(Ki).replace("{2,}","*").getRegex(),text:Ge(mo.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ns={normal:$o,gfm:Zu,pedantic:Xu},un={normal:So,gfm:mo,breaks:hp,pedantic:gp},bp={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ui=e=>bp[e];function ar(e,t){if(t){if(Et.escapeTest.test(e))return e.replace(Et.escapeReplace,Ui)}else if(Et.escapeTestNoEncode.test(e))return e.replace(Et.escapeReplaceNoEncode,Ui);return e}function ji(e){try{e=encodeURI(e).replace(Et.percentDecode,"%")}catch{return null}return e}function Wi(e,t){let r=e.replace(Et.findPipe,(o,a,c)=>{let l=!1,d=a;for(;--d>=0&&c[d]==="\\";)l=!l;return l?"|":" |"}),n=r.split(Et.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Et.slashPipe,"|");return n}function pn(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function vp(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function zi(e,t,r,n,s){let o=t.href,a=t.title||null,c=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:c,tokens:n.inlineTokens(c)};return n.state.inLink=!1,l}function yp(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[c]=a;return c.length>=s.length?o.slice(s.length):o}).join(`
`)}var as=class{constructor(e){Je(this,"options");Je(this,"rules");Je(this,"lexer");this.options=e||Lr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:pn(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=yp(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=pn(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:pn(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=pn(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,c=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))c.push(r[l]),a=!0;else if(!a)c.push(r[l]);else break;r=r.slice(l);let d=c.join(`
`),_=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${d}`:d,s=s?`${s}
${_}`:_;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(_,o,!0),this.lexer.state.top=m,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let E=h,$=E.raw+`
`+r.join(`
`),F=this.blockquote($);o[o.length-1]=F,n=n.substring(0,n.length-E.raw.length)+F.raw,s=s.substring(0,s.length-E.text.length)+F.text;break}else if(h?.type==="list"){let E=h,$=E.raw+`
`+r.join(`
`),F=this.list($);o[o.length-1]=F,n=n.substring(0,n.length-h.raw.length)+F.raw,s=s.substring(0,s.length-E.raw.length)+F.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,d="",_="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;d=t[0],e=e.substring(d.length);let m=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,F=>" ".repeat(3*F.length)),h=e.split(`
`,1)[0],E=!m.trim(),$=0;if(this.options.pedantic?($=2,_=m.trimStart()):E?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,_=m.slice($),$+=t[1].length),E&&this.rules.other.blankLine.test(h)&&(d+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let F=this.rules.other.nextBulletRegex($),q=this.rules.other.hrRegex($),S=this.rules.other.fencesBeginRegex($),x=this.rules.other.headingBeginRegex($),N=this.rules.other.htmlBeginRegex($);for(;e;){let L=e.split(`
`,1)[0],A;if(h=L,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),A=h):A=h.replace(this.rules.other.tabCharGlobal,"    "),S.test(h)||x.test(h)||N.test(h)||F.test(h)||q.test(h))break;if(A.search(this.rules.other.nonSpaceChar)>=$||!h.trim())_+=`
`+A.slice($);else{if(E||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||S.test(m)||x.test(m)||q.test(m))break;_+=`
`+h}!E&&!h.trim()&&(E=!0),d+=L+`
`,e=e.substring(L.length+1),m=A.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(a=!0)),s.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(_),loose:!1,text:_,tokens:[]}),s.raw+=d}let c=s.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let _=this.lexer.inlineQueue.length-1;_>=0;_--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[_].src)){this.lexer.inlineQueue[_].src=this.lexer.inlineQueue[_].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(l.raw);if(d){let _={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};l.checked=_.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=_.raw+l.tokens[0].raw,l.tokens[0].text=_.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(_)):l.tokens.unshift({type:"paragraph",raw:_.raw,text:_.raw,tokens:[_]}):l.tokens.unshift(_)}}if(!s.loose){let d=l.tokens.filter(m=>m.type==="space"),_=d.length>0&&d.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=_}}if(s.loose)for(let l of s.items){l.loose=!0;for(let d of l.tokens)d.type==="text"&&(d.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Wi(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Wi(a,o.header.length).map((c,l)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=pn(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=vp(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),zi(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return zi(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,c=s,l=0,d=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+s);(n=d.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){c+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(c-=a,c>0)continue;a=Math.min(a,a+c+l);let _=[...n[0]][0].length,m=e.slice(0,s+n.index+_+a);if(Math.min(s,a)%2){let E=m.slice(1,-1);return{type:"em",raw:m,text:E,tokens:this.lexer.inlineTokens(E)}}let h=m.slice(2,-2);return{type:"strong",raw:m,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Gt=class go{constructor(t){Je(this,"tokens");Je(this,"options");Je(this,"state");Je(this,"inlineQueue");Je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||Lr,this.options.tokenizer=this.options.tokenizer||new as,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Et,block:ns.normal,inline:un.normal};this.options.pedantic?(r.block=ns.pedantic,r.inline=un.pedantic):this.options.gfm&&(r.block=ns.gfm,this.options.breaks?r.inline=un.breaks:r.inline=un.gfm),this.tokenizer.rules=r}static get rules(){return{block:ns,inline:un}}static lex(t,r){return new go(r).lex(t)}static lexInline(t,r){return new go(r).inlineTokens(t)}lex(t){t=t.replace(Et.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Et.tabCharGlobal,"    ").replace(Et.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,c=t.slice(1),l;this.options.extensions.startBlock.forEach(d=>{l=d.call({lexer:this},c),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,c="";for(;t;){a||(c=""),a=!1;let l;if(this.options.extensions?.inline?.some(_=>(l=_.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let _=r.at(-1);l.type==="text"&&_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,c)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let d=t;if(this.options.extensions?.startInline){let _=1/0,m=t.slice(1),h;this.options.extensions.startInline.forEach(E=>{h=E.call({lexer:this},m),typeof h=="number"&&h>=0&&(_=Math.min(_,h))}),_<1/0&&_>=0&&(d=t.substring(0,_+1))}if(l=this.tokenizer.inlineText(d)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(c=l.raw.slice(-1)),a=!0;let _=r.at(-1);_?.type==="text"?(_.raw+=l.raw,_.text+=l.text):r.push(l);continue}if(t){let _="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(_);break}else throw new Error(_)}}return r}},is=class{constructor(e){Je(this,"options");Je(this,"parser");this.options=e||Lr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Et.notSpaceStart)?.[0],s=e.replace(Et.endingNewline,"")+`
`;return n?'<pre><code class="language-'+ar(n)+'">'+(r?s:ar(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:ar(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ar(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=ji(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+ar(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=ji(e);if(s===null)return ar(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${ar(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ar(e.text)}},Ao=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Vt=class ho{constructor(t){Je(this,"options");Je(this,"renderer");Je(this,"textRenderer");this.options=t||Lr,this.options.renderer=this.options.renderer||new is,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ao}static parse(t,r){return new ho(r).parse(t)}static parseInline(t,r){return new ho(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=c||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=c||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return n}},ss,fn=(ss=class{constructor(e){Je(this,"options");Je(this,"block");this.options=e||Lr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Gt.lex:Gt.lexInline}provideParser(){return this.block?Vt.parse:Vt.parseInline}},Je(ss,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Je(ss,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ss),wp=class{constructor(...e){Je(this,"defaults",bo());Je(this,"options",this.setOptions);Je(this,"parse",this.parseMarkdown(!0));Je(this,"parseInline",this.parseMarkdown(!1));Je(this,"Parser",Vt);Je(this,"Renderer",is);Je(this,"TextRenderer",Ao);Je(this,"Lexer",Gt);Je(this,"Tokenizer",as);Je(this,"Hooks",fn);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let c=s.renderer.apply(this,a);return c===!1&&(c=o.apply(this,a)),c}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new is(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,c=r.renderer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new as(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,c=r.tokenizer[a],l=s[a];s[a]=(...d)=>{let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new fn;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,c=r.hooks[a],l=s[a];fn.passThroughHooks.has(o)?s[a]=d=>{if(this.defaults.async&&fn.passThroughHooksRespectAsync.has(o))return(async()=>{let m=await c.call(s,d);return l.call(s,m)})();let _=c.call(s,d);return l.call(s,_)}:s[a]=(...d)=>{if(this.defaults.async)return(async()=>{let m=await c.apply(s,d);return m===!1&&(m=await l.apply(s,d)),m})();let _=c.apply(s,d);return _===!1&&(_=l.apply(s,d)),_}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let c=[];return c.push(o.call(this,a)),s&&(c=c.concat(s.call(this,a))),c}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Gt.lex(e,t??this.defaults)}parser(e,t){return Vt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,c=await(s.hooks?await s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(c):c;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let d=await(s.hooks?await s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(d):d})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Gt.lex:Gt.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let c=(s.hooks?s.hooks.provideParser():e?Vt.parse:Vt.parseInline)(a,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+ar(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},Ir=new wp;function Ke(e,t){return Ir.parse(e,t)}Ke.options=Ke.setOptions=function(e){return Ir.setOptions(e),Ke.defaults=Ir.defaults,Hi(Ke.defaults),Ke};Ke.getDefaults=bo;Ke.defaults=Lr;Ke.use=function(...e){return Ir.use(...e),Ke.defaults=Ir.defaults,Hi(Ke.defaults),Ke};Ke.walkTokens=function(e,t){return Ir.walkTokens(e,t)};Ke.parseInline=Ir.parseInline;Ke.Parser=Vt;Ke.parser=Vt.parse;Ke.Renderer=is;Ke.TextRenderer=Ao;Ke.Lexer=Gt;Ke.lexer=Gt.lex;Ke.Tokenizer=as;Ke.Hooks=fn;Ke.parse=Ke;var pg=Ke.options,fg=Ke.setOptions,_g=Ke.use,mg=Ke.walkTokens,gg=Ke.parseInline;var hg=Vt.parse,bg=Gt.lex;function hr(e){let t=Ke.parse(e),r=Ni.sanitize(t);return Fi(r)}function ir(e,t){return i`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Gr(e){return e.loading?i`<div class="prompt-block__status">불러오는 중…</div>`:e.error?i`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function ds(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var kp={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},$p=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,xp=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function br(e){return!!e&&typeof e=="object"}function Eo(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function rl(e,t){let r=Eo(e),n=Eo(t),s=new Map;for(let c of r)s.set(c,(s.get(c)||0)+1);let o=0;for(let c of n){let l=s.get(c)||0;l>0?s.set(c,l-1):o+=1}let a=0;for(let c of s.values())a+=c;return{added:o,removed:a}}function Sp(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>br(s)&&typeof s.text=="string"?s.text:"").join(""):br(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Ap(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:kp[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Eo(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=rl(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let c of a){let l=rl(br(c)?c.old_string:"",br(c)?c.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function nl(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function sl(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=$p.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:xp.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Ep(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(br(o)){if(o.type==="text"&&typeof o.text=="string")s.push(sl(o.text));else if(o.type==="thinking"){let a=nl(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Ap(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(br(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Sp(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Tp(e){if(e.type==="item.completed"&&br(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[sl(t.text)];if(t.type==="reasoning"){let r=nl(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Cp(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ol(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let c=s.trim();if(c.length===0)continue;try{o=JSON.parse(c)}catch{continue}}if(!br(o))continue;let a=Cp(o)?Tp(o):Ep(o,r);for(let c of a)t.push(c)}return t}var Rp=5,Ip=10,Lp=/Task\s+#(\d+)/,Op=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Dp=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function us(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Mp(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Pp(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Np(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Lp.exec(s.output||s.result||""),d=String(o.activeForm||o.subject||"").trim();if(!l||d.length===0)continue;t.set(l[1],{label:d,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let c=o.activeForm||o.subject;typeof c=="string"&&c.trim().length>0&&(a.label=c.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Fp(e){if(e.tool==="Bash"){let t=e.command||"";return Op.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Dp.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function qp(e){let t=e.filter(s=>s.kind==="tool").slice(-Ip),r=new Map;t.forEach((s,o)=>{let a=Fp(s);if(!a)return;let c=r.get(a)||{count:0,last:-1};c.count+=1,c.last=o,r.set(a,c)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Bp(e){let t=Pp(e);if(t)return{text:t,guess:!1};let r=Np(e);if(r)return{text:r,guess:!1};let n=qp(e);return n?{text:n,guess:!0}:null}function Up(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Lt(e,t)}function ps(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},c=!0,l=new Set,d=new Set,_=null,m=null,h=!1,E=!1,$=!1,F=null,q=null;function S(){h=!1,E=!1,$=!1,F=null,q=null}async function x(O){if(r){E=!0,$=!1,Ae();try{let I=await Promise.resolve(r("get-attempt-prompt",{attempt_id:O}));if(o!==O)return;!I||typeof I!="object"||Array.isArray(I)?$=!0:(F=I,q=O)}catch{o===O&&($=!0)}finally{o===O&&(E=!1,Ae())}}}function N(){if(h=!h,h&&o&&q!==o){x(o);return}Ae()}function L(){if(!h)return"";let O=Gr({loading:E,error:$});if(O)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        ${O}
      </div>`;if(!F)return"";if(F.missing)return i`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let I=ds(F.recorded_at);return i`<div class="sv__prompt" data-seam="attempt-prompt">
      ${I?i`<div class="prompt-block__meta">${I} 발송</div>`:""}
      ${typeof F.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",F.task_prompt):""}
      ${typeof F.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",F.system_prompt):""}
    </div>`}function A(){if(!o||!n)return[];let O=n.get(o);return ol(O?O.lines:[])}function W(){if(!o||!n)return null;let O=n.get(o),I=O?O.last_event_at:null;return typeof I=="number"?I:null}function X(){return a.status==="running"}function re(){if(X()&&o){m||(m=setInterval(()=>Ae(),1e3));return}be()}function be(){m&&(clearInterval(m),m=null)}function Q(O){let I=[],_e=0;for(;_e<O.length;){let Le=O[_e];if(Le.kind==="tool"){let j=_e;for(;j<O.length&&O[j].kind==="tool"&&O[j].tool===Le.tool;)j+=1;if(j-_e>=Rp&&!d.has(_e)){I.push({kind:"group",idx:_e,tool:Le.tool||"",lines:O.slice(_e,j).map((M,R)=>({idx:_e+R,line:M}))}),_e=j;continue}}I.push({kind:"line",idx:_e,line:Le}),_e+=1}return I}function ie(O){for(let I=O.length-1;I>=0;I-=1){let _e=O[I];if(_e.kind==="result"||_e.kind==="error")return null;if(_e.kind==="tool"&&!Object.hasOwn(_e,"result"))return _e}return null}function ye(O){for(let I=O.length-1;I>=0;I-=1)if(O[I].kind==="thinking")return O[I];return null}function Pe(O,I){if(I.kind==="gate")return i`<div class="sv__gate">${I.text}</div>`;if(I.kind==="phase")return i`<div class="sv__phase">${I.text}</div>`;if(I.kind==="result")return i`<div
        class="sv__result${I.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${I.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${hr(I.text||(I.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(I.kind==="thinking"){let _e=l.has(O);return i`<div
        class="sv__think${_e?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Se(O)}
      >
        <span class="sv__think-line">💭 ${us(I.text)}</span>
        ${_e?i`<pre class="sv__think-expand">${I.text}</pre>`:""}
      </div>`}if(I.kind==="error")return i`<div class="sv__error">⛔ ${I.text}</div>`;if(I.kind==="blocker")return i`<div class="sv__error">⛔ ${I.text}</div>`;if(I.kind==="tool"){let _e=l.has(O),Le=I.tool==="Bash"?Mp(I.command):0,j=I.tool==="Bash"?Le>1?us(I.command):I.command:I.path||I.command||"";return i`<div
        class="sv__tool${_e?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>Se(O)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${I.icon}</span>
          <span class="sv__tool-name">${I.tool}</span>
          ${j?i`<span class="sv__tool-detail">${j}</span>`:""}
          ${Le>1?i`<span class="sv__tool-more">⋯ ${Le}줄</span>`:""}
          ${typeof I.added=="number"?i`<span class="sv__diff-add">+${I.added}</span>`:""}
          ${typeof I.removed=="number"?i`<span class="sv__diff-del">−${I.removed}</span>`:""}
          ${I.result?i`<span class="sv__tool-ok">→ ${I.result}</span>`:""}
        </span>
        ${_e?i`<pre class="sv__tool-expand">${Te(I)}</pre>`:""}
      </div>`}return i`<div class="sv__as">${hr(I.text||"")}</div>`}function Te(O){let I=[];if(O.tool==="Bash"&&typeof O.command=="string"&&O.command.length>0)I.push(O.command);else if(O.input!==void 0)try{I.push(`input: ${JSON.stringify(O.input,null,2)}`)}catch{}return typeof O.output=="string"&&O.output.length>0&&I.push(`output:
${O.output}`),I.join(`

`)}function De(){if(!o)return i``;let O=A(),I=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),_e=a.session_id||"",Le=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${c?"ON":"OFF"}`,j=X(),M=j?Up(W(),Date.now()):"",R=j?ie(O):null,J=j?ye(O):null,ee=Bp(O);return i`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${ee?i`<span
              class="sv__stage${ee.guess?" sv__stage--guess":""}"
              title=${ee.text}
              >${ee.text}</span
            >`:""}
        ${j?i`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${M?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${M}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${M?i`<span class="sv__live-ago">${M}</span>`:""}</span
            >`:""}
        ${_e?i`<button
              type="button"
              class="sv__session"
              title=${_e}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${_e}`}
              @click=${()=>w(_e)}
            >
              ⧉ ${_e.slice(0,8)}
            </button>`:""}
        ${I?i`<span class="sv__meta">${I}</span>`:""}
        ${a.worktree?i`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${N}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${c?" sv__follow--on":""}"
          aria-pressed=${c?"true":"false"}
          aria-label=${Le}
          @click=${ce}
        >
          <span class="sv__follow-full">⇣ ${Le}</span>
          <span class="sv__follow-short">⇣ ${c?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>K()}
        >
          ✕
        </button>
      </div>
      ${L()}
      <div class="sv__body">
        ${O.length===0?i`<div class="sv__empty">세션 로그 없음</div>`:Q(O).map(ue=>ue.kind==="group"?We(ue):Pe(ue.idx,ue.line))}
      </div>
      ${R||J?i`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?i`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?us(R.command):R.path||R.command||""}</span
                  >`:""}
            ${J?i`<span class="sv__now-think"
                  >💭 ${us(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function We(O){return i`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>qe(O.idx)}
    >
      <span class="sv__group-icon">${O.lines[0].line.icon}</span>
      <span class="sv__group-name">${O.tool}</span>
      <span class="sv__group-count">${O.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function qe(O){d.add(O),Ae()}function Ae(){je(De(),e),re(),c&&me()}function me(){let O=e.querySelector(".sv__body");O&&(O.scrollTop=O.scrollHeight)}function Se(O){l.has(O)?l.delete(O):l.add(O),Ae()}function ce(){c=!c,Ae()}function w(O){Rr(O).then(I=>{I?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function k(O){!o||!O||(a={...a,...O},Ae())}function H(O){let I=O.target;if(!I||!I.classList||!I.classList.contains("sv__body"))return;!(I.scrollHeight-I.scrollTop-I.clientHeight<=4)&&c&&(c=!1,Ae())}e.addEventListener("scroll",H,!0);function U(O){let I=O&&O.attempt_id;I&&(o=I,a=O.meta||{},c=!0,l.clear(),d.clear(),S(),!_&&n&&(_=n.subscribe(Ae)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Ae())}function K(){let O=o;o=null,l.clear(),d.clear(),S(),be(),r&&O&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${O}`})).catch(()=>{}),je(i``,e),s&&s()}return{open:U,updateMeta:k,close:K,isOpen(){return o!==null},destroy(){be(),_&&(_(),_=null),e.removeEventListener("scroll",H,!0),o=null,je(i``,e)}}}function gn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=al(t.spec_id),s=al(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function al(e){return typeof e=="string"?e.trim():""}function jp(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function Wp(e){let t=e&&e.metadata||{},r=gn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:jp(t)?null:"plan_pending"}),n}function il(e,t){let r=Wp(e);return i`
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
  `}var zp="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",Hp=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,Gp=/^\*\*결론\*\* — (.+)$/;function fs(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==zp)return null;let r=Hp.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let c=a<t.length?Gp.exec(t[a]):null,l=c?c[1].replace(/\s+/g," ").trim():"",d=c?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(d).join(`
`).trim()}}var ll=20;function cl(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function Vp(e){return e.length>ll?`${e.slice(0,ll)}\u2026`:e}function Yp(e,t,r,n){let s=`${t.lane} ${Vp(t.identifier)}`;return i`<div class="detail-report">
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
        <span class="detail-report__time">${cl(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?i`<div class="detail-report__body">
          ${hr(t.body)}
        </div>`:""}
  </div>`}function Kp(e){return i`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${cl(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${hr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function dl(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,c=n.slice().sort((l,d)=>String(d.created_at||"").localeCompare(String(l.created_at||"")));return i`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?i`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:c.length===0?i`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:i`<div class="detail-comments" data-seam="comments">
            ${c.map(l=>{let d=fs(typeof l.text=="string"?l.text:"");return d?Yp(l,d,t,s.has(l.id)):Kp(l)})}
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
  `}var{I:Xg}=Pa;var ul=e=>e.strings===void 0;var Zp={},pl=(e,t=Zp)=>e._$AH=t;var Or=rs(class extends Hr{constructor(e){if(super(e),e.type!==or.PROPERTY&&e.type!==or.ATTRIBUTE&&e.type!==or.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ul(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Dt||t===ct)return t;let r=e.element,n=e.name;if(e.type===or.PROPERTY){if(t===r[n])return Dt}else if(e.type===or.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return Dt}else if(e.type===or.ATTRIBUTE&&r.getAttribute(n)===t+"")return Dt;return pl(e),t}});var To=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],_s=["orchestration_model","orchestration_effort","orchestration_speed"],fl=["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ms=["delegated","main"],gs=["inherit","claude","codex"],hn=["default","fast"],hs=["standard","fast_track"],bn=["codex","opus","fable","self","skip"],bs=["codex","fable","skip"],vs=["low","medium","high","xhigh"],Ft="auto";function lr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function _l(e){if(!lr(e)||!lr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))lr(n)&&lr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function ml(e){return e?.impl_dispatch==="main"}function ys(e,t){let r=_l(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[Ft,...n.flatMap(([,s])=>s)]}function Vr(e,t,r){if(!lr(e)||!lr(e.runners))return[Ft];let n=[];for(let[s,o]of Object.entries(e.runners))if(!(!lr(o)||!lr(o.models))&&!(t&&t!=="inherit"&&s!==t))for(let[a,c]of Object.entries(o.models)){if(r&&r!==Ft&&a!==r)continue;let l=lr(c)?c.efforts:null;if(Array.isArray(l))for(let d of l)typeof d=="string"&&!n.includes(d)&&n.push(d)}return[Ft,...n]}function ws(e,t){let r=_l(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function gl(e,t){let r={};for(let n of To){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function hl(e,t){let r={};for(let n of _s){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Co=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[..._s]}],Ro={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},vl={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function bl(e){return typeof e=="string"&&e.length>0?e:null}function Xp(e,t,r){let n=bl(t?.[e]);if(n!==null)return{value:n,source:"pin"};let s=bl(r?.[e]);return s!==null?{value:s,source:"global"}:{value:null,source:"base"}}function ks(e,t,r){return e.map(n=>({key:n,...Xp(n,t,r)}))}function yl(e,t,r){let n={pin:0,global:0,base:0};for(let s of ks(e,t,r))n[s.source]+=1;return n}function wl(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function kl(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var ah=[...To,..._s];var Qp=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],Jp={pin:"pin",global:"global",base:"base"};function ef(e){return i`<span
    class=${`detail-layer-rail detail-layer-rail--${Jp[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function tf(e,t,r){switch(e){case"workflow_mode":return hs;case"spec_review_model":case"impl_review_model":return bn;case"plan_review_model":return bs;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return vs;case"impl_dispatch":return ms;case"impl_runtime":return gs;case"impl_model":return ys(r,t.impl_runtime);case"impl_effort":return Vr(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return hn;case"orchestration_model":return ws(r,null);case"orchestration_effort":return Vr(r,void 0,t.orchestration_model||Ft).filter(n=>n!==Ft);default:return[]}}function rf(e,t){return i`<div class="detail-effective__row" data-key=${e.key}>
    ${ef(e.source)}
    <span class="detail-effective__k"
      >${Ro[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      >${e.value??"(harness \uAE30\uBCF8)"}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${vl[e.source]}</span
    >
    ${t.expanded?i`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${Ro[e.key]||e.key} \uD3B8\uC9D1`}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option value="" ?selected=${e.source!=="pin"}>(기본)</option>
          ${t.options.map(r=>i`<option
                value=${r}
                ?selected=${e.source==="pin"&&e.value===r}
              >
                ${r===Ft?"\uC790\uB3D9":r}
              </option>`)}
        </select>`:""}
  </div>`}function $l(e,t){let r=Co.flatMap(o=>o.keys),n=yl(r,e.metadata,e.workspace_values),s={};for(let o of ks(r,e.metadata,e.workspace_values))o.value!==null&&(s[o.key]=o.value);return i`<section
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
      <span class="detail-effective__summary">${nf(s)}</span>
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
      ${Co.map(o=>i`
          <div class="detail-effective__subhead">${o.label}</div>
          ${ks(o.keys,e.metadata,e.workspace_values).map(a=>rf(a,{expanded:e.expanded,options:tf(a.key,s,e.catalog),onEdit:t.onEdit}))}
        `)}
      <div class="detail-effective__foot">
        <select
          data-impl-preset-select
          aria-label="구현 프리셋"
          .value=${Or(e.preset_id)}
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
  </section>`}function nf(e){let t=[];if(typeof e.workflow_mode=="string"&&t.push(String(e.workflow_mode)),e.impl_dispatch==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch==="delegated"){let r=typeof e.impl_runtime=="string"?` ${e.impl_runtime}`:"";t.push(`\uC704\uC784${r}`)}else typeof e.impl_runtime=="string"&&t.push(`\uC704\uC784 ${e.impl_runtime}`);return typeof e.impl_model=="string"&&t.push(String(e.impl_model)),t.length>0?t.join(" \xB7 "):"\uAE30\uBCF8"}function xl(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",c=Kn(r.planned_execution,r.exec_receipt);return i`<section class="detail-summary" data-seam="detail-summary">
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
      ${c?i`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${c.kind}
            title=${c.title}
            >${c.label}</span
          >`:""}
      ${a?i`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${a}
            >${a.split("@")[0]}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${Qp.map(l=>{let d=l.receipt&&typeof t[l.receipt]=="string"?String(t[l.receipt]):"",_=n[l.id],m=d.length>0||_?.fill==="full",h=!m&&_?.fill==="dim",E=_?.stale===!0;return i`<span
          class=${`detail-summary__gate${m?" detail-summary__gate--on":""}${h?" detail-summary__gate--current":""}${E?" detail-summary__gate--stale":""}`}
          data-gate=${l.id}
        >
          <span class="detail-summary__gate-pill">${l.label}</span>
          ${d?i`<span class="detail-summary__gate-sha"
                >${d.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}var Sl=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function vn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function $s(e){if(!vn(e)||!vn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>vn(r)&&vn(r.models));return t.length>0?t:null}function Io(e,t){let r=$s(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Al(e,t){return vn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function El(e,t){let r=$s(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Al(n,n.models[t]);return[]}function sf(e){let t=$s(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Al(n,s))r.includes(o)||r.push(o);return r}function of(e,t){if(!t)return sf(e);let n=$s(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of El(e,o))s.includes(a)||s.push(a);return s}function Tl(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Io(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?El(t,n.impl_model):of(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function af(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Cl(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",c="";function l($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",l);function d(){return s?i`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${af(s)}</span
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
            ${o==="loading"?i`<div class="mv__status">불러오는 중…</div>`:o==="pending"?i`<div class="mv__status">${c}</div>`:o==="error"?i`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:hr(a)}
          </div>
        </div>
      </div>
    `:i``}function _(){je(d(),e)}async function m($,F={}){s=$,o="loading",a="",c="",_();let q=r?r():"";if(!q){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let S="/api/doc?workspace="+encodeURIComponent(q)+"&path="+encodeURIComponent($);try{let x=await n(S),N=await x.json().catch(()=>({}));if(!x.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&F.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||x.status)+")",_();return}a=String(N.content||""),o="ready",_()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function h(){s=null,je(i``,e)}function E(){document.removeEventListener("keydown",l),h()}return{open:m,close:h,destroy:E}}var lf=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Ll="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function cf(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function df(e){let t=yt(e);if(t.length>0)return t.map(s=>i`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Wr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return i`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?i`<span class="detail-usage-partial" title=${Ll}
          >부분 집계</span
        >`:""}`}function Rl(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Il(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ol(t):""}function uf(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=yt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return i`<div class="detail-session__leg detail-session__usage-detail">
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
        ${Il(s.completed_at)?i`<span class="detail-session__leg-time detail-session__time"
              >${Il(s.completed_at)}</span
            >`:""}
        ${a?i`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function pf(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...lf,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return i`<div class="detail-session__usage-detail">
    ${n.map(s=>i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${cf(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":i`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?i`<span class="detail-session__usage-note">${Ll}</span>`:""}
  </div>`}var ff={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ol(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function _f(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return i`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?i`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function Dl(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return i`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let d of n)d&&typeof d.resumed_from=="string"&&d.resumed_from.length>0&&o.add(d.resumed_from);let a=d=>{if(!(d.status==="failed"||d.status==="orphaned"))return"";let m=typeof d.session_id=="string"&&d.session_id.length>0,h=o.has(d.attempt_id),E=m&&!h,$=m?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return i`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${d.attempt_id}
      ?disabled=${!E}
      title=${$}
      @click=${F=>{F.stopPropagation(),E&&t.onResume&&t.onResume(d.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},c=d=>{if(!(d.status==="failed"||d.status==="orphaned")||typeof d.cause!="string"||d.cause==="")return"";let m=d.cause_detail,h=m&&typeof m.reason=="string"&&m.reason.length>0?typeof m.command=="string"&&m.command.length>0?`${m.reason} \xB7 ${m.command}`:m.reason:d.cause;return i`<div class="detail-session__cause" title=${h}>
      ${d.cause}
    </div>`},l=d=>{let _=Rl(so(d));if(yt(_).length===0&&!Wr(d.usage))return"";let m=s.has(d.attempt_id);return i`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${d.attempt_id}
      aria-expanded=${m?"true":"false"}
      title=${m?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(d.attempt_id)}}
    >
      τ 자세히
    </button>`};return i`
    <div class="detail-section-label">
      세션 이력${df(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(d=>{let _=so(d),m=Rl(_),h=yt(m);return i`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${d.status||"unknown"}"
            data-attempt-id=${d.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(d.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${ff[d.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${d.attempt_id}</span>
            ${mr(d)?i`<span
                  class="detail-session__resumed"
                  title=${mr(d)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${Qt(d)}</span>
            ${h.length>0?i`<span class="detail-session__role">orchestrator</span>`:""}
            ${d.session_id?i`<span class="detail-session__sid" title=${d.session_id}
                  >${String(d.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(E=>i`<span
                      class="detail-session__usage"
                      title=${E.tooltip}
                      >${E.label}</span
                    >`):Wr(d.usage)?i`<span class="detail-session__usage"
                    >${Wr(d.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ol(d.started_at)}</span>
          </button>
          ${l(d)} ${a(d)} ${c(d)} ${_f(d)}
          ${s.has(d.attempt_id)&&d.usage?pf(d.usage,d.runner==="codex"?"codex":"claude"):""}
          ${uf(_)}
        </div>`})}
    </div>
  `}function Ml(e,t={}){return i`
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
          ${mf(e)}
        </div>`:""}
  `}function mf(e){let t=Gr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return i`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?ir("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=ds(r.recorded_at);return i`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?ir("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?ir("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var gf=["open","in_progress","deferred","resolved","closed"],hf=[0,1,2,3,4];function Pl(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,c=t.execPresetStore,l=t.sessionLogStore,d=null,_=null,m={},h="",E=!1,$=!1,F={},q=!1,S=!1,x="",N="",L="";function A(){q=!1,S=!1,x="",N="",L=""}let W=[],X=null,re=null,be=!1,Q="",ie=!1,ye=0,Pe=new Set;function Te(){W=[],X=null,re=null,be=!1,Q="",ie=!1,ye+=1,Pe.clear()}async function De(y){if(!s)return;let f=++ye;try{let u=await Promise.resolve(s("get-comments",{id:y}));if(f!==ye||y!==d)return;W=Array.isArray(u)?u:[],be=!1}catch{if(f!==ye||y!==d)return;be=!0}ve()}function We(){if(!s||!d)return;let y=_&&typeof _.comment_count=="number"?_.comment_count:null;if(X!==d){X=d,re=y,De(d);return}y!==null&&y!==re&&(re=y,De(d))}function qe(y){Pe.has(y)?Pe.delete(y):Pe.add(y),ve()}function Ae(y){let f=Q.trim().length===0;Q=y,f!==(y.trim().length===0)&&ve()}async function me(){let y=Q.trim();if(!s||!d||y.length===0||ie)return;let f=d;ie=!0,ve();let u=!1;try{let C=await Promise.resolve(s("add-comment",{id:f,text:y}));Array.isArray(C)&&C.length>0&&(u=!0,f===d&&(W=C,be=!1,Q="",re=C.length))}catch{u=!1}u||oe("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),f===d&&(ie=!1),ve()}let Se={onToggle:qe,onDraftInput:Ae,onSubmit:me},ce=document.createElement("div");ce.className="md-viewer-root",document.body.appendChild(ce);let w=Cl(ce,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),k=document.createElement("div");k.className="session-log-root",document.body.appendChild(k);let H=ps(k,{transport:s?(y,f)=>Promise.resolve(s(y,f)):void 0,sessionLogStore:l}),U=!1,K=!1,O=!1,I=null,_e=null,Le=0;function j(y){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${y}`}function M(){U=!1,K=!1,O=!1,I=null,_e=null,Le+=1}async function R(y){if(!s)return;let f=++Le;K=!0,O=!1,ve();try{let u=await Promise.resolve(s("get-bead-prompt",{bead_id:y}));if(f!==Le)return;!u||typeof u!="object"||Array.isArray(u)?O=!0:(I=u,_e=j(y))}catch{f===Le&&(O=!0)}finally{f===Le&&(K=!1,ve())}}function J(){if(U=!U,U&&d&&_e!==j(d)){I=null,R(d);return}ve()}function ee(){if(!a||!d)return[];let y=a.get();return(y&&y.attempts?Object.values(y.attempts):[]).filter(u=>u&&u.bead_id===d).sort((u,C)=>(C.started_at||0)-(u.started_at||0)).map(u=>({attempt_id:u.attempt_id,bead_id:u.bead_id,status:u.status,started_at:typeof u.started_at=="number"?u.started_at:null,runner:u.runner||null,model:u.model||null,effort:u.effort||null,speed:u.speed||null,session_id:u.session_id||null,resumed_from:u.resumed_from||null,continuation_mode:u.continuation_mode||null,dismissed_at:typeof u.dismissed_at=="number"?u.dismissed_at:null,cause:typeof u.cause=="string"?u.cause:null,cause_detail:u.cause_detail||null,exec_default_preset_id:typeof u.exec_default_preset_id=="string"?u.exec_default_preset_id:null,exec_default_preset_revision:typeof u.exec_default_preset_revision=="number"?u.exec_default_preset_revision:null,exec_values:u.exec_values&&typeof u.exec_values=="object"?u.exec_values:null,usage:u.usage||null,usage_legs:Array.isArray(u.usage_legs)?u.usage_legs:[]}))}function ue(){if(!a||!d)return null;let y=a.get();return Pt(y&&y.attempts||{},d)}let ae=new Set;function Ee(y){ae.has(y)?ae.delete(y):ae.add(y),ve()}function Ve(y){let f=a?a.get():null,u=f&&f.attempts?f.attempts[y]:null;H.open({attempt_id:y,meta:u?{runner:u.runner||void 0,model:u.model||void 0,effort:u.effort||void 0,status:u.status||void 0,session_id:u.session_id||void 0}:{}})}async function lt(y){if(!s||!y)return;let f=()=>{let fe=a?a.get():null;return fe&&typeof fe.revision=="number"?fe.revision:0},u=async(fe={})=>await s("worker-attempt-resume",{attempt_id:y,expected_revision:f(),...fe}),C=fe=>{fe?.queue&&a?.set&&a.set(fe.queue)},Z=await u();if(C(Z),Z&&Z.conflict){let fe=Z.queue&&typeof Z.queue.revision=="number"?Z.queue.revision:f();Z=await s("worker-attempt-resume",{attempt_id:y,expected_revision:fe}),C(Z)}Z=await rr(Z,(fe,Ce)=>u({continuation:fe,decision_token:Ce}),{onResult:C,refresh:()=>u()}),Z&&Z.resumed===!1&&!Z.conflict&&Z.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${Z.reason}`,"error",2400)}let ut={onOpen:Ve,onResume:lt,onToggleUsage:Ee};function Ze(){let y=a?a.get():null,f={...F};for(let u of["orchestration_model","orchestration_effort","orchestration_speed"]){let C=y&&y[u];typeof C=="string"&&(f[u]=C)}return f}async function T(){if(s){try{let y=await Promise.resolve(s("get-session-defaults",{}));F=y&&y.values&&typeof y.values=="object"?y.values:{}}catch{F={}}ve()}}function V(){let y=a?a.get():null;return y&&y.runner_catalog||null}function de(){let y=_?.metadata&&typeof _.metadata=="object"?_.metadata:{},u=(Object.hasOwn(m,"orchestration_model")?m.orchestration_model:void 0)||(typeof y.orchestration_model=="string"?y.orchestration_model:"")||(typeof Ze().orchestration_model=="string"?Ze().orchestration_model:"")||"opus";return Io(V(),u)}function Me(){let y=c?c.get():null;return!y||typeof y.revision!="number"?null:{revision:y.revision,presets:Array.isArray(y.presets)?y.presets:[]}}function Re(y){return y?.compatible===!1}function Ne(y){c&&y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&c.set({revision:y.revision,presets:y.presets})}async function rt(){let y=Me(),f=y?.presets.find(u=>u.id===h);if(!(!s||!d||!y||!f||Re(f)||E)){E=!0,ve();try{let u=await Promise.resolve(s("apply-impl-preset",kl(d,f.id,y.revision)));if(u&&u.conflict){Ne(u),oe("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let C=u&&Array.isArray(u.issue)?u.issue[0]:u?.issue;if(u&&u.applied&&C&&typeof C=="object"){_=C;for(let Z of Sl)delete m[Z];oe("\uAD6C\uD604 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}u&&u.error==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(u){u&&typeof u=="object"&&u.code==="bd_readback_failed"?oe("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):oe("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{E=!1,ve()}}}let st=null;r&&r.subscribe&&(st=r.subscribe(()=>kt()));let wt=null;a&&typeof a.subscribe=="function"&&(wt=a.subscribe(()=>{d&&ve()}));let vt=null;c&&typeof c.subscribe=="function"&&(vt=c.subscribe(()=>{d&&ve()}));function dt(y){y.key==="Escape"&&d&&(y.preventDefault(),n())}document.addEventListener("keydown",dt);function kt(){if(d){if(r&&typeof r.snapshotFor=="function"){let y=r.snapshotFor("detail:"+d)||[];_=y.find(u=>u&&u.id===d)||y[0]||_}We(),ve()}}function ot(y){Rr(y).then(f=>{f?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function at(y){y.preventDefault(),y.stopPropagation(),d&&ot(d)}function mt(y,f){y.preventDefault(),y.stopPropagation(),ot(f)}function z(y,f,u){y.preventDefault(),y.stopPropagation(),w.open(f,{missing_state:u})}function B(y,f){m[y]=f,ve(),!(!s||!d)&&Promise.resolve(s("update-exec-settings",wl(d,y,f.length===0?null:f))).catch(()=>{oe("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ge(y,f){let u=_||{},C=u.metadata&&typeof u.metadata=="object"?u.metadata:{},Z={};for(let $e of["impl_runtime","impl_model","impl_effort"])Z[$e]=Object.hasOwn(m,$e)?m[$e]:typeof C[$e]=="string"?C[$e]:"";Z[y]=f;let fe=Tl(Z,V(),de()),Ce={};for(let $e of["impl_runtime","impl_model","impl_effort"])Ce[$e]=m[$e],m[$e]=fe[$e]||"";ve(),!(!s||!d)&&Promise.resolve(s("update-impl-target",{id:d,...fe,orchestration_runtime:de()})).then($e=>{let he=Array.isArray($e)?$e[0]:$e;if(!he||typeof he!="object"||!he.id)throw new Error("implementation target readback failed");_=he;for(let nt of["impl_runtime","impl_model","impl_effort"])delete m[nt];ve()}).catch(()=>{for(let $e of["impl_runtime","impl_model","impl_effort"])Ce[$e]===void 0?delete m[$e]:m[$e]=Ce[$e];ve(),oe("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function pe(y,f,u){if(!s||!d)return!1;try{let C=await Promise.resolve(s(y,f)),Z=Array.isArray(C)?C[0]:C;return Z&&typeof Z=="object"&&Z.id?(_=Z,!0):(oe(u,"error"),!1)}catch{return oe(u,"error"),!1}}function we(y){setTimeout(()=>{try{let f=e.querySelector(y);f&&typeof f.focus=="function"&&f.focus()}catch{}},0)}function Oe(){q=!0,x=_&&_.title||"",ve(),we('.detail-edit__input[data-edit="title"]')}function Xe(y){x=y.target.value}function Ye(){q=!1,x="",ve()}function Ie(){pe("edit-text",{id:d,field:"title",value:x},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(q=!1,x=""),ve()})}function Qe(){S=!0,N=_&&_.description||"",ve(),we('.detail-edit__textarea[data-edit="description"]')}function xe(y){N=y.target.value}function _t(){S=!1,N="",ve()}function Tt(){pe("edit-text",{id:d,field:"description",value:N},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(f=>{f&&(S=!1,N=""),ve()})}function Bt(y,f,u,C){if(y.key==="Escape"){y.stopPropagation(),u();return}y.key==="Enter"&&(!C||y.ctrlKey||y.metaKey)&&(y.preventDefault(),f())}function Ut(y){let f=y.target.value;pe("update-status",{id:d,status:f},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function dr(y){let f=Number(y.target.value);pe("update-priority",{id:d,priority:f},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>ve())}function gt(y){L=y.target.value}function $t(){let y=L.trim();y.length!==0&&pe("label-add",{id:d,label:y},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(f=>{f&&(L=""),ve()})}function er(y){if(y.key==="Escape"){y.stopPropagation(),L="",ve();return}y.key==="Enter"&&(y.preventDefault(),$t())}function ur(y){pe("label-remove",{id:d,label:y},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>ve())}let Ot={onCopyPath:mt,onOpenDoc:z};function p(y){return typeof y=="string"?y:y&&typeof y=="object"?String(y.id||y.to||y.issue_id||y.depends_on||""):""}function v(y){switch(y&&typeof y=="object"?String(y.dependency_type||y.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function P(y){let u=(Array.isArray(y.dependencies)?y.dependencies:[]).map(C=>({id:p(C),icon:v(C)})).filter(C=>C.id.length>0);return i`
      <div class="detail-section-label">의존성</div>
      ${u.length===0?i`<div class="detail-empty">의존성 없음</div>`:i`<div class="detail-deps">
            ${u.map(C=>o?i`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(C.id)}
                  >
                    ${C.icon?`${C.icon} `:""}${C.id}
                  </button>`:i`<span class="detail-dep"
                    >${C.icon?`${C.icon} `:""}${C.id}</span
                  >`)}
          </div>`}
    `}function Y(y){let f=y.metadata||{},u=y.workflow||{},C=u.stages||{},Z=C.spec&&C.spec.stale,fe=C.impl&&C.impl.stale,Ce=C.plan||null,$e=u.route_source==="derived",he=u.route||f.route||"\u2014";return i`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${$e?" detail-kv__v--derived":""}"
          title=${$e?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${$e?"unset":he}</span
        >
      </div>
      ${u.route!=="quick_fix"||Object.hasOwn(f,"spec_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${f.spec_review||"\uC5C6\uC74C"}${Z?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.route==="full_plan"?i`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Ce?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Ce?.approval_receipt||"\uC5C6\uC74C"}${Ce?.approval_state==="stale"?" \xB7 stale":Ce?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${u.route!=="quick_fix"||Object.hasOwn(f,"impl_review")?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${f.impl_review||"\uC5C6\uC74C"}${fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${u.planned_execution?i`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${u.planned_execution.kind}</span>
            </div>
            ${u.planned_execution.kind==="main"?i`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${u.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${u.exec_receipt?i`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${`${u.exec_receipt.kind}:${u.exec_receipt.actor}@${u.exec_receipt.sha}`}</span
            >
          </div>`:""}
      ${u.impl_entry?i`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${u.impl_entry.actor}@${u.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${f.pr_url?i`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${f.pr_url}</span>
          </div>`:""}
    `}let le={route:["quick_fix","spec_backed","full_plan"]};async function ze(y,f){let u=f.target.value;if(y==="route"&&_&&_.metadata&&_.metadata.route==="full_plan"&&u!=="full_plan"&&!window.confirm(`full_plan \u2192 ${u||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){ve();return}await pe("update-workflow-meta",{id:d,key:y,value:u},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),ve()}function ke(y){let f=y.metadata||{};return i` ${((C,Z)=>{let fe=le[C],Ce=typeof f[C]=="string"?f[C]:"";return i`<div class="detail-kv">
        <span class="detail-kv__k">${C}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${C}
          data-edit=${`wfmeta-${C}`}
          @change=${$e=>ze(C,$e)}
        >
          <option value="" ?selected=${!fe.includes(Ce)}>
            ${Z}
          </option>
          ${fe.map($e=>i`<option value=${$e} ?selected=${Ce===$e}>${$e}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function te(y,f){return q?i`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${x}
            @input=${Xe}
            @keydown=${u=>Bt(u,Ie,Ye,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Ie}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${Ye}
            >
              취소
            </button>
          </div>
        </div>
      `:i`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${y}</h2>
        ${yt(f).map(u=>i`<span class="detail-usage-total" title=${u.tooltip}
              >${u.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Oe}
        >
          ✎
        </button>
      </div>
    `}function b(y){let f=ht(y.created_at),u=ht(y.updated_at);return!f&&!u?i``:i`
      ${f?i`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${f}</span>
          </div>`:""}
      ${u?i`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${u}</span>
          </div>`:""}
    `}function G(y,f){return i`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${Ut}
        >
          ${gf.map(u=>i`<option value=${u} ?selected=${u===y}>${u}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${dr}
        >
          ${hf.map(u=>i`<option value=${String(u)} ?selected=${u===f}>
                P${u}
              </option>`)}
        </select>
      </div>
    `}function ne(y){return i`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${S?"":i`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Qe}
            >
              ✎
            </button>`}
      </div>
      ${S?i`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${N}
              @input=${xe}
              @keydown=${f=>Bt(f,Tt,_t,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${Tt}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${_t}
              >
                취소
              </button>
            </div>
          </div>`:i`<div class="detail-overlay__desc">
            ${y||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Fe(y){let f=typeof y.notes=="string"?y.notes:"";return f.trim().length===0?i``:i`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${f}</div>
    `}function et(y){let f=Array.isArray(y.labels)?y.labels:[];return i`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${f.map(u=>i`<span class="detail-label-chip"
              >${u}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${u}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+u}
                @click=${()=>ur(u)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${L}
            @input=${gt}
            @keydown=${er}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${$t}
          >
            추가
          </button>
        </span>
      </div>
    `}function He(){if(!d)return i``;let y=_||{},f=String(y.id||d),u=y.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",C=ue(),Z=y.status||"open",fe=typeof y.priority=="number"?Math.max(0,Math.min(4,y.priority)):"",Ce=y.description||"",$e={...y,metadata:{...y.metadata||{},...m}};return i`
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
            ${f}
          </button>
          ${te(u,C)}
          ${xl($e)}
          ${$l({metadata:$e.metadata,workspace_values:Ze(),catalog:V(),expanded:$,presets:Me()?.presets||[],preset_id:h,preset_busy:E},{onToggle:()=>{$=!$,ve()},onEdit:(he,nt)=>{if(he==="impl_runtime"||he==="impl_model"||he==="impl_effort"){ge(he,nt??"");return}B(he,nt??"")},onPresetSelect:he=>{h=he,ve()},onPresetApply:()=>{rt()}})}
          ${G(Z,fe)} ${b(y)}
          ${ne(Ce)}
          ${dl(W,Se,{expanded:Pe,draft:Q,sending:ie,error:be})}
          ${Fe(y)} ${et(y)} ${P(y)}
          ${Y(y)} ${ke(y)}
          ${il(y,Ot)}
          ${Ml({expanded:U,loading:K,error:O,data:I},{onToggle:J})}
          ${Dl(ee(),ut,{total:C,expanded:ae})}
        </div>
      </div>
    `}function ve(){je(He(),e)}return{load(y){y!==d&&(m={},h="",$=!1,A(),Te(),M()),d=y,_=null,kt(),T()},clear(){d=null,_=null,m={},h="",E=!1,A(),Te(),M(),w.close(),H.close(),je(i``,e)},destroy(){st&&(st(),st=null),wt&&(wt(),wt=null),vt&&(vt(),vt=null),document.removeEventListener("keydown",dt),w.destroy(),ce.parentNode&&ce.parentNode.removeChild(ce),H.destroy(),k.parentNode&&k.parentNode.removeChild(k),d=null,_=null,h="",E=!1,Te(),M(),je(i``,e)}}}function Nl(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),c=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(d,_,m="")=>{r&&(r.textContent=d||"Unexpected Error"),n&&(n.textContent=_||"An unrecoverable error occurred.");let h=typeof m=="string"?m.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>c()),t.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:l,close:c,getElement(){return t}}}function xs(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Lo(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`}function Ss(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function bf(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let c of r)c.kind!=="deploy"||c.state!=="succeeded"||typeof c.target_sha!="string"||(!s||(typeof c.finished_at=="number"?c.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=c);let o=r.filter(c=>c.state==="failed"&&!c.dismissed&&!c.superseded_by).length+n.length,a=r.some(c=>c.state==="repairing");return{deploy:s?{sha:xs(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Fl(e,t){let r=bf(e,t);return r?i`<button
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
            title=${r.deploy.at?ht(r.deploy.at):""}
            >${Ss(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${Lo(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Yr(e){let t=Lt(e.created_at),r=Lt(e.updated_at);return!t&&!r?"":i`<div class="worker-mini__meta">
    ${t?i`<span title=${`\uC0DD\uC131 ${ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?i`<span>·</span>`:""}${r?i`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function vf(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function yn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function As(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Jt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(m=>m&&m.bead_id===t&&m.phase!=="done").sort((m,h)=>(m.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,c=typeof s?.last_error=="string"?s.last_error:null,l=s?vf(s.phase):null,d=s?.kind==="stale_work_backup_fresh",_=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!c),label:d?c?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":c?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(c?d?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${c} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${c} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:_==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:c,confirmation:_}}function cr(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return i`<div
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
  </div>`}var yf={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function ql(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.state==="unique"?"unique":"unknown",o=n.summary&&typeof n.summary=="object"?n.summary:{};function a(l){return Number.isInteger(o[l])?Number(o[l]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{state:s,title:s==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:yf[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:[`staged ${a("staged_count")}`,`unstaged ${a("unstaged_count")}`,`untracked ${a("untracked_count")}`,`branch ahead ${a("branch_ahead")}`,`HEAD ahead ${a("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function Oo(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=yt(e.usage),s=zt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,c=e.lane==="done"&&!a,l=c?Lt(e.done_at):"",d=t?i`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",_=typeof e.seq=="number"?i`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",m=e.worker_serial===!0?i`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?i`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",E=i`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=i`<span class="worker-mini__title">${e.title}</span>`,F=e.pr_url&&e.pr_number?i`<a
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
        >`:"",S=r.map(De=>De===e.live_badge?i`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${De}</span
        >`:i`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${De===e.completion_badge&&e.completion_title||""}
          >${De}</span
        >`),x=e.reason?i`<span class="worker-mini__reason">${e.reason}</span>`:"",N=n.length>0?n.map(De=>i`<span class="worker-usage" title=${De.tooltip}
              >${De.label}</span
            >`):s?i`<span class="worker-usage" title=${zr(e.usage)}
            >${s}</span
          >`:"",L=o?i`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",A=e.merge_action?i`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",W=e.cancel_action?i`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",X=e.timeline_action?i`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",re=e.discard,be=re?.action||e.discard_action?i`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${re?.attempt_id||""}
          data-operation-id=${re?.operation?.operation_id||""}
          data-discard-mode=${re?.confirmation||"unmerged"}
          ?disabled=${re?!re.enabled:e.discard_enabled===!1}
          title=${re?re.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${re?.label||"\uD3D0\uAE30"}
        </button>`:"",Q=e.stale_work||null,ie=Q?i`${Q.can_resume||Q.can_continue?i`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Q.action_id}
            ?disabled=${Q.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Q.can_backup_fresh?i`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Q.action_id}
            ?disabled=${Q.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Q.can_recheck?i`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Q.action_id}
            ?disabled=${Q.locked}
          >
            다시 확인
          </button>`:""}`:"",ye=Q?i`<div class="worker-mini__stale">
        <strong>${Q.title}</strong>
        <span>${Q.summary}</span>
        <span>${Q.cause}</span>
        ${Q.can_backup_fresh?i`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Pe=e.revise_action?i`<button
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
        </button>`:"",Te=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||re?.operation||e.revise_action||Q);return i`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${c?i`<div class="worker-mini__row1">${h}${E}${$}</div>
          <div class="worker-mini__row2">
            ${N}${l?i`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${ht(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${S}${L}
            <span class="worker-mini__actions"
              >${A}${W}${X}${be}</span
            >
            ${Yr(e)}
          </div>`:a?i`<div class="worker-mini__head">
              ${d}${_}${h}${E}${F}${q}${S}${m}${x}
            </div>
            <div class="worker-mini__body">${$}${ye}</div>
            ${Te?i`<div class="worker-mini__foot">
                  ${N}${L}
                  <span class="worker-mini__actions"
                    >${A}${W}${X}${be}${Pe}${ie}</span
                  >
                  ${cr(e)}
                </div>`:""}
            ${Yr(e)}`:i`<div class="worker-mini__line">
              ${d}${_}${h}${E}${$}${F}${q}${S}${m}${x}${N}${L}${A}${W}${X}${be}
            </div>
            ${cr(e)} ${Yr(e)}`}
  </div>`}function wf(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return i`<div
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
    ${r?Yn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?i`<span
            class="worker-card__reason${c?" worker-card__reason--danger":""}"
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
        title=${t?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":a?"quick_fix route\uB294 \uC6CC\uCEE4 \uC2E4\uD589 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
      >
        대기로 ↴
      </button>
    </div>
    ${Yr(e)}
  </div>`}function Yt(e){let t=!!e.collapsible&&!!e.collapsed,r=i`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?wf(n):Oo(n))}
          </div>`}
  </section>`}var Bl=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778",index:2},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5",index:3},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:4},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:5},{step:"parent_close",label:"\uBD80\uBAA8 close",index:6}],wn=Bl.filter(e=>e.step!=="merging").map(e=>({step:e.step,label:e.label}));function Do(e){if(typeof e!="string"||e.length===0)return null;let t=6,r=Bl.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Ul(e){let t=wn.findIndex(r=>r.step===e);return wn.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function Dr(e){let t=wn.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function kf(e){let t=wn.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:wn.length}}function Es(e){let t=kf(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var jl={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},Wl={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function zl(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Mo(e){for(let t of zl(e))if(Object.hasOwn(jl,t))return jl[t];return null}function Po(e){let t=null;for(let r of zl(e))Object.hasOwn(Wl,r)&&(t=Wl[r]);return t}function Ts(e){let t=Mo(e),r=Po(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function Hl(e,t){let r=Mo(e)??Mo(t),n=Po(t)??Po(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var Gl=160;function $f(e){return e.length>Gl?`${e.slice(0,Gl)}\u2026`:e}function xf(e){return!e||!e.reason?"":i`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?i` · <code>${$f(e.command)}</code>`:""}
  </div>`}function Sf(e){return e?i`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function No(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Vl(e){let t=e.failure?Ts(e.failure.reason):"";return i`<div class="worker-banners">
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
          ${xf(e.failure.cause_detail)}
          ${Sf(e.failure.reason)}
          ${cr({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function Af(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?No(t-e.started_at):"\u2014",a=Qt(e),c=mr(e),l=yt(e.usage),d=zt(e.usage),_=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,m=e.base_exception||null,h=e.attempt_id&&e.attempt_id===r,E=e.discard?.action?i`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return i`<div
    class="rtile${h?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${c?i`<span class="rtile__resumed" title=${c}>↻</span>`:""}
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
            ${E}
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
            ${E}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?i`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||l.length>0||d||_||m?i`<div class="rtile__meta">
          ${_?i`<span class="worker-mini__badge">${_}</span>`:""}
          ${m?i`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${m}</span
              >`:""}
          ${a?i`<span class="rtile__runner">${a}</span>`:""}
          ${l.length>0?l.map($=>i`<span class="worker-usage" title=${$.tooltip}
                    >${$.label}</span
                  >`):d?i`<span
                  class="worker-usage"
                  title=${zr(e.usage)}
                  >${d}</span
                >`:""}
        </div>`:""}
    ${Yr(e)} ${cr(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":i`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Fo(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return i`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?i`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Af(s,t,r))}
  </div>`}function Mr(e){return i`<svg
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
  </svg>`}function qo(){return Mr(pr`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Bo(){return Mr(pr`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Yl(){return Mr(pr`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Kl(){return Mr(pr`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Zl(){return Mr(pr`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Xl(){return Mr(pr`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ql(){return Mr(pr`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var kn=1,Ef=6e4,Tf={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Cf=new Set(["auto_merge","merged","merge","done"]),Jl={running:3,paused:2,failed:1};function Rf(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function If(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let c=null;if(a.status==="running")c="running";else if(a.status==="paused"&&!n.has(a.attempt_id))c="paused";else if(a.status==="failed"||a.status==="orphaned"){let m=t.get(a.bead_id),h=typeof m=="number"&&m>0&&typeof a.finished_at=="number"&&m>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(c="failed")}if(!c)continue;let l=typeof a.started_at=="number"?a.started_at:null,d=o.get(a.bead_id);if(d){let m=Jl[d.run_state],h=Jl[c];if(m>h||m===h&&(d.started_at??0)>(l??0))continue}let _=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:c,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,runner:typeof a.runner=="string"?a.runner:null,model:typeof a.model=="string"?a.model:null,effort:typeof a.effort=="string"?a.effort:null,speed:typeof a.speed=="string"?a.speed:null,resumed_from:typeof a.resumed_from=="string"?a.resumed_from:null,continuation_mode:a.continuation_mode==="session"||a.continuation_mode==="fresh"?a.continuation_mode:null,usage:Pt(e,a.bead_id),can_pause:c==="running"&&_,can_resume:c!=="running"&&_&&!n.has(a.attempt_id)})}return o}function ec(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function qt(e){return e&&typeof e=="object"?e:{}}function Uo(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let S of s)S&&typeof S.root_dir=="string"&&a.set(S.root_dir,S);let c=[],l=[],d=[],_=[],m=[],h=new Map;for(let S of n){if(!S||typeof S.root_dir!="string")continue;let x=S.root_dir,N=S.name||x,L=a.get(x),A=L&&typeof L.revision=="number"?L.revision:typeof S.revision=="number"?S.revision:0,W=qt(S.attempts),X=qt(S.bead_titles),re=qt(S.pr_observations),be=qt(S.admission),Q=qt(S.revise_parked),ie=qt(S.merge_queue_state),ye=qt(S.cleanup_failed),Pe=qt(S.discard_operations),Te=Array.isArray(S.merge_queue)?S.merge_queue:[],De=new Set(Te.filter(w=>w&&typeof w.bead_id=="string").map(w=>w.bead_id)),We=new Map(Te.filter(w=>w&&typeof w.bead_id=="string").map(w=>[w.bead_id,w])),qe=Array.isArray(S.queue)?S.queue:[],Ae=Array.isArray(S.done)?S.done:[],me=new Map;for(let w of Ae)w&&typeof w.bead_id=="string"&&typeof w.added_at=="number"&&me.set(w.bead_id,w.added_at);let Se=w=>({id:w,title:X[w]||w,root_dir:x,workspace_name:N,expected_revision:A,draggable:!1}),ce=new Set;for(let[w,k]of If(W,me))ce.add(w),l.push({...Se(w),lane:"running",attempt_id:k.attempt_id,run_state:k.run_state,can_pause:k.can_pause,can_resume:k.can_resume,started_at:k.started_at,last_event_at:k.last_event_at,runner:k.runner,model:k.model,effort:k.effort,speed:k.speed,resumed_from:k.resumed_from,continuation_mode:k.continuation_mode,usage:k.usage,discard:Jt(Pe,w,{attempt_id:k.attempt_id}),badges:k.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:k.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:k.run_state==="failed"});for(let w of Array.isArray(S.pr_wait)?S.pr_wait:[]){let k=w&&w.bead_id;if(typeof k!="string"||ce.has(k))continue;ce.add(k);let H=qt(re[k]),U=qt(H.pr),K=H.gate?qt(H.gate):null,O=De.has(k),I=We.get(k)?.continuation_action||null,_e=!!I&&I.continuation===null,Le=ie.active===k,j=w.external===!0,M=ye[k]||null,R=!!K&&K.base_badge==="\uCDA9\uB3CC",J=!!M&&["child_sweep","branch_cleanup","parent_close"].includes(M.step)&&!!K&&K.tier==="merged",ee=j&&!!M&&!!K&&K.tier==="merged",ue=!!K&&["closed_unmerged","review","undecidable"].includes(K.tier),ae=Jt(Pe,k,{external:j,merge_active:Le,merge_queued:O,merged:!!M||K?.tier==="merged"}),Ee=!!ae.operation;d.push({...Se(k),lane:"pr_wait",pr_number:typeof U.number=="number"?U.number:null,pr_url:typeof U.url=="string"?U.url:void 0,external:j,usage:Pt(W,k),badges:_e?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:M?[Dr(M.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Dr(M.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof K?.gate_badge=="string"&&K.gate_badge.length>0?[K.gate_badge]:[],alert:!!M||ue,reason:M?Es(M.step):"PR \uB300\uAE30",merge_action:!O||_e,merge_enabled:!Ee&&(_e||K?.enabled===!0||R||J||ee),merge_label:_e?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ee||J?"\uC815\uB9AC \uC7AC\uAC1C":R&&!J?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:_e?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ee?ae.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ae.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ae.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ee?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":J?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":R?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":K?.enabled===!0?`\uBA38\uC9C0 (${K.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${K?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:O&&!_e,cancel_enabled:!Le,continuation_mismatch:I?.mismatch||null,discard:ae,discard_action:ae.action,discard_enabled:ae.enabled,discard_title:ae.title})}for(let w=0;w<qe.length;w++){let k=qe[w],H=k&&k.bead_id;if(typeof H!="string"||ce.has(H))continue;ce.add(H);let U=Q[H],K=Jt(Pe,H),O=K.operation?K:null,I={...Se(H),lane:"queue",draggable:!O,discard:O||void 0,reason:ec(be,H),queue_position:w+1,queue_index:w,queue_length:qe.length,badges:U?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!U,revise_action:!!U,revise_enabled:!!U&&!O,revise_title:U?U.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${U.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};_.push(I);let _e=h.get(x);_e?_e.push(I):h.set(x,[I])}for(let w of Array.isArray(S.runnable)?S.runnable:[]){let k=w&&w.bead_id;typeof k!="string"||ce.has(k)||(ce.add(k),c.push({...Se(k),title:w.title||X[k]||k,lane:"runnable",draggable:!0,reason:ec(be,k),created_at:w.created_at??void 0,updated_at:w.updated_at??void 0,labels:Array.isArray(w.labels)?w.labels:[],spec_reviewer:typeof w.spec_reviewer=="string"?w.spec_reviewer:void 0,plan_state:w.plan_state==="approved"||w.plan_state==="authored"?w.plan_state:"none",workflow:w.route?{route:w.route,chips:{route:w.route}}:null,place_index:qe.length}))}for(let w of Ae){let k=w&&w.bead_id;if(typeof k!="string"||ce.has(k)||(ce.add(k),o!==void 0&&typeof w.added_at=="number"&&w.added_at<o))continue;let H=Rf(W,k);m.push({...Se(k),lane:"done",done:!0,usage:Pt(W,k),done_at:typeof w.added_at=="number"?w.added_at:void 0,done_kind:H&&typeof H.done_kind=="string"?H.done_kind:null})}}let E=new Map;s.forEach((S,x)=>{S&&typeof S.root_dir=="string"&&E.set(S.root_dir,x)});let $=r&&r.running_sort==="repo"?"repo":"started";l.sort((S,x)=>{if($==="repo"){let A=E.get(S.root_dir)??Number.MAX_SAFE_INTEGER,W=E.get(x.root_dir)??Number.MAX_SAFE_INTEGER;if(A!==W)return A-W}let N=typeof S.started_at=="number"&&Number.isFinite(S.started_at)?S.started_at:null,L=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null;return N!==null&&L!==null&&N!==L?N-L:N===null&&L!==null?1:N!==null&&L===null?-1:S.id.localeCompare(x.id)}),m.sort((S,x)=>(x.done_at??0)-(S.done_at??0));let F=s.length>0?s:n.map(S=>({root_dir:S&&S.root_dir,name:S&&S.name,auto_advance:S&&S.auto_advance,auto_merge:S&&S.auto_merge,slots:S&&S.slots,revision:S&&S.revision,runner_catalog:S&&S.runner_catalog})),q=[];for(let S of F)!S||typeof S.root_dir!="string"||q.push({root_dir:S.root_dir,name:S.name||S.root_dir,auto_advance:S.auto_advance===!0,auto_merge:S.auto_merge===!0,slots:typeof S.slots=="number"&&S.slots>=kn?S.slots:kn,revision:typeof S.revision=="number"?S.revision:0,runner_catalog:qt(S.runner_catalog),items:h.get(S.root_dir)||[]});return{runnable:c,queue:_,queue_groups:q,running:l,pr_wait:d,done:m,automation:{total:q.length,both_on:q.filter(S=>S.auto_advance&&S.auto_merge).length}}}function Lf(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Ef;return i`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ht(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":i`<span class="mon-beat__age"
          >${Lt(e,t)}</span
        >`}</span
  >`}function $n(e){return i`<div class="mon-c__title">${e.title}</div>`}function xn(e){return i`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Cs(e){return e.workspace_name?i`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function jo(e){let t=yt(e.usage),r=zt(e.usage);return t.length>0?t.map(n=>i`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?i`<span class="mon-c__usage" title=${zr(e.usage)}
        >${r}</span
      >`:""}function Wo(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>i`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Of(e){return i`<span class="mon-c__ops">
    ${e.run_state==="running"?i`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Bo()}
        </button>`:i`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${qo()}
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
          ${Kl()}
        </button>`:""}
  </span>`}function Df(e,t){let r=typeof e.started_at=="number"?No(t-e.started_at):"";return i`${$n(e)}
    <div class="mon-c__meta">
      ${Wo(e)}${Lf(e.last_event_at,t)}${xn(e)}${Cs(e)}
      ${Qt(e)?i`<span class="mon-c__model">${Qt(e)}</span>`:""}
      ${mr(e)?i`<span
            class="rtile__resumed"
            title=${mr(e)}
            >↻</span
          >`:""}
      ${r?i`<span class="mon-live__elapsed">${r}</span>`:""}
      ${jo(e)}${Of(e)}${cr(e)}
    </div>`}function Mf(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),c=Lt(e.updated_at);return i`${$n(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${xn(e)}
      ${n?i`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?i`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?i`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${Vn(e.labels,null).map(l=>i`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Cs(e)}
      ${c?i`<span title=${`\uC218\uC815 ${ht(e.updated_at)}`}
            >수정 ${c}</span
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
    </div>`}function Pf(e){let t=!!e.discard?.operation;return i`${$n(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${xn(e)}
      ${Wo(e)}
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
    ${cr(e)}
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
        </div>`:""}`}function Nf(e){let t=!!(zt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return i`${$n(e)}
    <div class="mon-c__meta">
      ${xn(e)}${Cs(e)}
      ${e.pr_url&&e.pr_number?i`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Wo(e)}
      ${e.reason?i`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?i`<div class="mon-c__tail">
          ${jo(e)}
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
          ${cr(e)}
        </div>`:""}`}function Ff(e,t){let r=e.done_kind||"",n=r?Tf[r]||r:"",s=Lt(e.done_at,t);return i`${$n(e)}
    <div class="mon-c__meta">
      ${xn(e)}${Cs(e)}
      ${n?i`<span
            class="mon-live__kind${Cf.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${jo(e)}
      ${s?i`<span title=${`\uC644\uB8CC ${ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function tc(e,t){return e.lane==="running"?Df(e,t):e.lane==="runnable"?Mf(e):e.lane==="queue"?Pf(e):e.lane==="pr_wait"?Nf(e):Ff(e,t)}function rc(e){let t=String(e.revision);return i`<header
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
        ${e.auto_advance?Bo():qo()}
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
        ${Zl()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Xl()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${kn}
          step="1"
          data-root-dir=${e.root_dir}
          data-revision=${t}
          aria-label=${`${e.name} \uB3D9\uC2DC \uC2E4\uD589 \uC2AC\uB86F`}
          .value=${String(e.slots)}
        />
      </label>
    </span>
  </header>`}function nc(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Xt.find(c=>c.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return i`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Yl():Ql()}
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
        ${Xt.map(c=>i`<option
              value=${c.value}
              ?selected=${e.done_range===c.value}
            >
              ${c.label}
            </option>`)}
      </select>
      ${a.map(c=>i`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${c.tooltip}
            >${o} 완료 · 누적 ${c.label}</span
          >`)}
    </div>
  </div>`}function sc(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function oc(e){let t=(Array.isArray(e)?e:[]).map(c=>c&&c.usage).filter(c=>c&&typeof c=="object"&&"providers"in c);if(t.length>0)return yt(Qn(t));let r={};for(let c of nr)r[c]=0;let n=!1,s=0,o=0,a=0;for(let c of Array.isArray(e)?e:[]){let l=c&&c.usage;if(l&&typeof l=="object"){let d=!1;for(let _ of nr){let m=l[_];typeof m=="number"&&Number.isFinite(m)&&(r[_]+=m,n=!0,d=!0)}if(d){o+=1;let _=l.total_cost_usd;typeof _=="number"&&Number.isFinite(_)&&(s+=_,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?zt(r):null}var ic="bdui.monitor.done-range",lc="bdui.monitor.running_sort";function qf(){try{let e=window.localStorage.getItem(ic);return Mt(e)?e:It}catch{return It}}function Bf(e){try{window.localStorage.setItem(ic,e)}catch{}}function Uf(){try{return window.localStorage.getItem(lc)==="repo"?"repo":"started"}catch{return"started"}}function jf(e){try{window.localStorage.setItem(lc,e)}catch{}}var cc="tab:monitor:pipeline",Wf=1e3,zf=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function ac(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return i`<div
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
    ${tc(e,t)}
  </div>`}function dc(e,t){let r=it("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,c=t.switchWorkspace,l=t.now||(()=>Date.now()),d=t.confirm||(j=>typeof globalThis.confirm!="function"||globalThis.confirm(j)),_=qf(),m=Uf();function h(){let j=Xt.find(M=>M.value===_);return j?j.label:""}let E=document.createElement("div");E.className="mon",e.appendChild(E);let $=Uo(null,null),F=new Map,q=null,S=null;async function x(j,M,R,J,ee=!0){if(!o||!R)return null;let ue=await o(j,{...M,root_dir:R,expected_revision:J});if(ue&&ue.conflict&&ee){ue.queue&&F.set(R,ue.queue);let ae=ue.queue&&typeof ue.queue.revision=="number"?ue.queue.revision:J;ue=await o(j,{...M,root_dir:R,expected_revision:ae})}return ue&&ue.queue&&R&&F.set(R,ue.queue),ue}function N(j,M){let R=F.get(j),J=s&&s.get?s.get():null,ee=(Array.isArray(J)?J:[]).find(ae=>ae?.root_dir===j);return(R||ee)?.merge_queue?.find(ae=>ae.bead_id===M)?.continuation_action}async function L(j,M,R,J){let ee=await x(j,M,R,J),ue=F.get(R)?.revision??ee?.queue?.revision??J;return rr(ee,(ae,Ee)=>x(j,{...M,continuation:ae,decision_token:Ee},R,ue,!1),{refresh:ae=>x(j,M,R,ae?.queue?.revision??F.get(R)?.revision??ue,!1)})}async function A(j,M,R,J){let ee=await rr({continuation_mismatch:J},(ae,Ee)=>x("worker-merge-queue-add",{bead_id:M,continuation:ae,decision_token:Ee},j,R,!1)),ue=ee?.queue?.merge_queue?.find(ae=>ae.bead_id===M)?.continuation_action;ee?.applied!==!0&&ue?.continuation===null&&ue.mismatch&&await A(j,M,ee.queue.revision,ue.mismatch)}async function W(j,M,R){let J=await x("worker-discard",j,M,R);if(J&&J.discarded===!0){oe(As(J),"success",5e3);return}if(J&&J.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${J.reason}`,"error");return}if(J&&J.accepted&&J.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(J&&J.accepted){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${J.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}J&&!J.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function X(j,M,R){return!o||!R?null:await o(j,{...M,root_dir:R})}async function re(j){if(!o||!j&&!d("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let M=await o("monitor-auto-toggle",{on:j}),R=M&&Array.isArray(M.failed)?M.failed:[];R.length>0&&oe(`\uC790\uB3D9\uD654 ${j?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${R.map(J=>J.root_dir).join(", ")}`,"error",3200)}async function be(){let j=new Map;for(let M of $.pr_wait)j.has(M.root_dir)||j.set(M.root_dir,M.expected_revision);for(let[M,R]of j)await x("worker-merge-queue-add-all",{},M,R)}let Q=null,ie=!1,ye=null;function Pe(){ye!==null&&clearTimeout(ye),ye=setTimeout(()=>{ye=null,ie=!1},0)}function Te(j){let M=j.target;return typeof M?.closest=="function"?M.closest(".mon-group"):null}function De(j){let M=Te(j);return!M||!Q?null:(M.getAttribute("data-root-dir")||"")===Q.root_dir?M:null}function We(){for(let j of Array.from(E.querySelectorAll(".mon-group--drag-over")))j.classList.remove("mon-group--drag-over")}function qe(j){let M=j.target,R=typeof M?.closest=="function"?M.closest('.mon-card[draggable="true"]'):null;if(R){Q={bead_id:R.getAttribute("data-issue-id")||"",lane:R.getAttribute("data-lane")||"",root_dir:R.getAttribute("data-root-dir")||"",revision:Number(R.getAttribute("data-revision")||0)||0,queue_index:Number(R.getAttribute("data-queue-index")),queue_length:Number(R.getAttribute("data-queue-length")),place_index:Number(R.getAttribute("data-place-index"))},ie=!0;try{j.dataTransfer?.setData("text/plain",Q.bead_id),j.dataTransfer&&(j.dataTransfer.effectAllowed="move")}catch{}}}function Ae(j){let M=De(j);M&&(j.preventDefault(),j.dataTransfer&&(j.dataTransfer.dropEffect="move"),M.classList.add("mon-group--drag-over"))}function me(j){Te(j)?.classList.remove("mon-group--drag-over")}function Se(){Q=null,We(),Pe()}function ce(j){let M=De(j),R=Q;if(Q=null,We(),!M||!R||!R.bead_id)return;j.preventDefault();let J=j.target,ee=typeof J?.closest=="function"?J.closest('.mon-card[data-lane="queue"]'):null,ue=ee&&M.contains(ee)?Number(ee.getAttribute("data-queue-index")):NaN;if(R.lane==="runnable"){let Ve=Number.isFinite(ue)?ue:R.place_index;if(!Number.isFinite(Ve))return;x("worker-queue-place",{bead_id:R.bead_id,index:Ve},R.root_dir,R.revision);return}if(R.lane!=="queue"||ee&&ee.getAttribute("data-issue-id")===R.bead_id)return;let ae=R.queue_index,Ee=Number.isFinite(ue)?ae>ue?ue:ue-1:R.queue_length-1;!Number.isFinite(Ee)||Ee<0||Ee===ae||x("worker-queue-reorder",{bead_id:R.bead_id,to_index:Ee},R.root_dir,R.revision)}function w(j){let M={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return i`${nc({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},running_sort:m,done_range:_,token_total:oc($.done),token_tooltip:sc(h())})}
      <div class="worker-lanes mon-lanes">
        ${zf.map(R=>{let J=M[R.lane],ee=R.lane==="queue"?$.queue_groups.length>0?i`${$.queue_groups.map(ue=>i`<div
                        class="mon-group"
                        data-root-dir=${ue.root_dir}
                      >
                        ${rc(ue)}
                        <div class="mon-group__list">
                          ${ue.items.map(ae=>ac(ae,j))}
                        </div>
                      </div>`)}`:void 0:J.length>0?i`${J.map(ue=>ac(ue,j))}`:void 0;return Yt({id:`monitor-${R.lane}`,lane:R.pane,title:R.lane==="done"?`\uC644\uB8CC\xB7${h()}`:R.title,items:J,empty:R.empty,body:ee,live:R.lane==="running"&&J.length>0,header_control:R.lane==="pr_wait"&&J.length>0?i`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function k(){let j=s&&s.get?s.get():null,M=s&&s.getWorkspacesState?s.getWorkspacesState():[],R=l();$=Uo(j,M,{done_since:Ar(_,R),running_sort:m}),je(w(R),E)}function H(j,M){let R=a?a():void 0;if(!M||!R||M===R||!c){n(j);return}c(M).then(()=>{n(j)}).catch(J=>{r("workspace switch for %s failed: %o",M,J)})}function U(j){return{root_dir:j.getAttribute("data-root-dir")||"",revision:Number(j.getAttribute("data-revision")||0)||0}}function K(j,M){let{root_dir:R,revision:J}=U(j),ee=j.getAttribute("data-issue-id")||"",ue=M.dataset.attemptId||j.getAttribute("data-attempt-id")||"",ae=M.classList;if(ae.contains("worker-card__place")){x("worker-queue-place",{bead_id:ee,index:Number(j.getAttribute("data-place-index")||0)||0},R,J);return}if(ae.contains("mon-op--up")||ae.contains("mon-op--down")){let Ee=Number(j.getAttribute("data-queue-index")||0)||0,Ve=ae.contains("mon-op--up")?Ee-1:Ee+1;if(Ve<0)return;x("worker-queue-reorder",{bead_id:ee,to_index:Ve},R,J);return}if(ae.contains("mon-op--remove")){x("worker-queue-remove",{bead_id:ee},R,J);return}if(ae.contains("mon-op--pause")){X("worker-attempt-pause",{attempt_id:ue},R);return}if(ae.contains("mon-op--discard")){if(!d(yn(ee,"unmerged")))return;W({bead_id:ee,...ue?{attempt_id:ue}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},R,J);return}if(ae.contains("mon-op--resume")){L("worker-attempt-resume",{attempt_id:ue},R,J);return}if(ae.contains("mon-op--dismiss")){x("worker-attempt-dismiss",{attempt_id:ue},R,J);return}if(ae.contains("worker-mini__merge")){let Ee=N(R,ee);Ee?.mismatch&&Ee.continuation===null?A(R,ee,J,Ee.mismatch):x("worker-merge-queue-add",{bead_id:ee},R,J);return}if(ae.contains("worker-mini__merge-cancel")){x("worker-merge-queue-remove",{bead_id:ee},R,J);return}if(ae.contains("worker-mini__discard")){let Ee=M.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(yn(ee,Ee)))return;W({bead_id:ee,...ue?{attempt_id:ue}:{},...M.dataset.operationId?{operation_id:M.dataset.operationId}:{}},R,J);return}if(ae.contains("worker-mini__revise-fix")){L("worker-revise-fix",{bead_id:ee},R,J);return}ae.contains("worker-mini__revise-approve")&&x("worker-revise-approve",{bead_id:ee},R,J)}function O(j){let M=ie;ie=!1;let R=j.target;if(!R||typeof R.closest!="function"||R.closest("dialog")||R.closest("a"))return;let J=R.closest(".mon-running-sort");if(J){j.preventDefault(),m=J.getAttribute("data-sort")==="repo"?"repo":"started",jf(m),k();return}let ee=R.closest(".mon-auto-all");if(ee){j.preventDefault(),re(ee.getAttribute("data-on")==="true");return}if(R.closest(".mon-merge-all")){j.preventDefault(),be();return}let ae=R.closest(".mon-ctl--advance");if(ae){j.preventDefault();let{root_dir:Ze,revision:T}=U(ae);x("worker-automation-toggle",{on:ae.getAttribute("data-on")==="true"},Ze,T);return}let Ee=R.closest(".mon-ctl--merge-auto");if(Ee){j.preventDefault();let{root_dir:Ze,revision:T}=U(Ee);x("worker-merge-auto-toggle",{on:Ee.getAttribute("data-on")==="true"},Ze,T);return}let Ve=R.closest(".mon-card");if(!Ve)return;let lt=R.closest("button");if(lt){j.preventDefault(),K(Ve,lt);return}let ut=Ve.getAttribute("data-issue-id");ut&&!M&&(j.preventDefault(),H(ut,Ve.getAttribute("data-root-dir")||""))}function I(j){let M=j.target;if(!M||typeof M.closest!="function")return;let R=M.closest(".mon-done-range");if(R){_=Mt(R.value)?R.value:It,Bf(_),k();return}let J=M.closest(".mon-slots__input");if(!J)return;let{root_dir:ee,revision:ue}=U(J),ae=Number(J.value);if(!Number.isFinite(ae))return;let Ee=Math.max(kn,Math.floor(ae));x("worker-queue-set-slots",{slots:Ee},ee,ue)}e.addEventListener("click",O),e.addEventListener("change",I),e.addEventListener("dragstart",qe),e.addEventListener("dragover",Ae),e.addEventListener("dragleave",me),e.addEventListener("drop",ce),e.addEventListener("dragend",Se),s&&typeof s.subscribe=="function"&&(q=s.subscribe(()=>{try{F.clear(),k()}catch{}}));function _e(){S!==null&&(clearInterval(S),S=null)}function Le(){ye!==null&&(clearTimeout(ye),ye=null)}return{load(){r("load"),k(),S===null&&(S=setInterval(()=>{try{k()}catch{}},Wf))},pause(){_e()},clear(){_e(),Le(),q&&(q(),q=null),e.removeEventListener("click",O),e.removeEventListener("change",I),e.removeEventListener("dragstart",qe),e.removeEventListener("dragover",Ae),e.removeEventListener("dragleave",me),e.removeEventListener("drop",ce),e.removeEventListener("dragend",Se),e.replaceChildren()}}}function uc(e,t,r){let n=it("views:nav"),s=null;function o(l){return d=>{d.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),d=l.view==="worker"||l.view==="monitor"?l.view:"board";return i`
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
    `}function c(){je(a(),e)}return c(),s=t.subscribe(()=>c()),{destroy(){s&&(s(),s=null),je(i``,e)}}}var pc=["bug","feature","task","epic","chore"];function fc(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var _c=["Critical","High","Medium","Low","Backlog"];function mc(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),c=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),d=r.querySelector("#new-issue-error"),_=r.querySelector("#btn-cancel"),m=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function E(){o.replaceChildren();let A=document.createElement("option");A.value="",A.textContent="\u2014 Select \u2014",o.appendChild(A);for(let W of pc){let X=document.createElement("option");X.value=W,X.textContent=fc(W),o.appendChild(X)}a.replaceChildren();for(let W=0;W<=4;W+=1){let X=document.createElement("option");X.value=String(W);let re=_c[W]||"Medium";X.textContent=`${W} \u2013 ${re}`,a.appendChild(X)}}E();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function F(A){s.disabled=A,o.disabled=A,a.disabled=A,c.disabled=A,l.disabled=A,_.disabled=A,m.disabled=A,m.textContent=A?"Creating\u2026":"Create"}function q(){d.textContent=""}function S(A){d.textContent=A}function x(){try{let A=window.localStorage.getItem("beads-ui.new.type");A?o.value=A:o.value="";let W=window.localStorage.getItem("beads-ui.new.priority");W&&/^\d$/.test(W)?a.value=W:a.value="2"}catch{o.value="",a.value="2"}}function N(){let A=o.value||"",W=a.value||"";A.length>0&&window.localStorage.setItem("beads-ui.new.type",A),W.length>0&&window.localStorage.setItem("beads-ui.new.priority",W)}async function L(){q();let A=String(s.value||"").trim();if(A.length===0){S("Title is required"),s.focus();return}let W=Number(a.value||"2");if(!(W>=0&&W<=4)){S("Priority must be 0..4"),a.focus();return}let X=String(o.value||""),re=String(l.value||""),be={title:A};X.length>0&&(be.type=X),String(W).length>0&&(be.priority=W),re.length>0&&(be.description=re),F(!0);try{await t("create-issue",be)}catch{F(!1),S("Failed to create issue");return}N(),F(!1),$()}return r.addEventListener("cancel",A=>{A.preventDefault(),$()}),h.addEventListener("click",()=>$()),_.addEventListener("click",()=>$()),r.addEventListener("keydown",A=>{A.key==="Enter"&&(A.ctrlKey||A.metaKey)&&(A.preventDefault(),L())}),n.addEventListener("submit",A=>{A.preventDefault(),L()}),{open(){n.reset(),q(),x();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Hf=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function Gf(e,t){return eo(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function gc(e,t,r){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?i`<div class="settings-dialog__empty">라벨 없음</div>`:i`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=Gf(n,e);return i`<button
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
  `}function hc(e,t,r){return i`
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
  `}function bc(e,t){return i`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${Hf.map(([r,n])=>i`<label class="settings-dialog__toggle">
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
  `}var Vf=[{id:"session",label:"\uC138\uC158",glyph:"\u25C6"},{id:"worker",label:"Worker",glyph:"\u25A4"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}],Kt="";function Zt(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function vc(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(T=>oe(T,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let c="session",l=!1,d="",_={},m={},h=[],E=!1,$=null,F={},q="",S="",x=!1,N=!1,L=!1,A=null;function W(){let T=t.queueStore?.get();return Zt(T)?T.runner_catalog:null}function X(){let T=t.implPresetStore?.get();return Zt(T)&&Array.isArray(T.presets)?T:null}async function re(){E=!0,ee();try{let T=await r("get-session-defaults",{});_=Zt(T?.values)?{...T.values}:{},m={..._},h=Array.isArray(T?.warnings)?T.warnings:[]}catch(T){h=["kv_read_failed"],o(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${T instanceof Error?T.message:String(T)}`)}finally{E=!1,ee()}}async function be(){let T=gl(_,m);if(Object.keys(T).length!==0){try{let V=await r("set-session-defaults",{values:T});_=Zt(V?.values)?{...V.values}:{},m={..._},h=Array.isArray(V?.warnings)?V.warnings:[]}catch(V){o(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ee()}}function Q(T,V){V===Kt?delete m[T]:m[T]=V,ee(),be()}async function ie(){let T=t.queueStore?.get();if(!Zt(T))return;let V={orchestration_model:T.orchestration_model??null,orchestration_effort:T.orchestration_effort??null,orchestration_speed:T.orchestration_speed??null},de=hl(V,{...V,...F});if(Object.keys(de).length!==0){try{let Me=await r("worker-queue-set-orchestration-defaults",{expected_revision:T.revision,values:de});if(Me&&Me.applied===!1){o("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}F={}}catch(Me){o(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Me instanceof Error?Me.message:String(Me)}`)}ee()}}function ye(T,V){F[T]=V===Kt?null:V,ee(),ie()}async function Pe(T){let V=t.queueStore?.get();if(!(!Zt(V)||T<1)){try{await r("worker-queue-set-slots",{expected_revision:V.revision,slots:T})}catch(de){o(`slots \uC800\uC7A5 \uC2E4\uD328: ${de instanceof Error?de.message:String(de)}`)}ee()}}function Te(){let T={};for(let V of fl){let de=m[V];typeof de=="string"&&de.length>0&&(T[V]=de)}return T}async function De(){let T=X();if(!T)return;let V=Te();if(Object.keys(V).length===0){o("\uC800\uC7A5\uD560 \uAD6C\uD604 \uAC12\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uAD6C\uD604 \uADF8\uB8F9\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let de=(T.presets||[]).find(Re=>Re.id===q),Me=S.trim()||(de?de.name:"");if(!Me){o("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let Re=de?await r("impl-preset-update",{expected_revision:T.revision,id:de.id,name:Me,settings:V}):await r("impl-preset-create",{expected_revision:T.revision,name:Me,settings:V});if(Re&&Re.applied){if(S="",!de&&Array.isArray(Re.presets)){let Ne=Re.presets.find(rt=>rt.name===Me);q=Ne?Ne.id:q}ee()}else o("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ee()}catch(Re){o(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${Re instanceof Error?Re.message:String(Re)}`)}}async function We(){let T=X();if(!(!T||q.length===0))try{let V=await r("impl-preset-delete",{expected_revision:T.revision,id:q});V&&V.applied?(q="",ee()):(o("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),ee())}catch(V){o(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}}async function qe(){let T=X();if(!(!T||q.length===0)){try{let V=await r("apply-impl-preset-global",{preset_id:q,expected_revision:T.revision});V&&V.applied?(_=Zt(V.values)?{...V.values}:{},m={..._},h=Array.isArray(V.warnings)?V.warnings:[]):V&&V.conflict&&o("\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(V){o(`\uAD6C\uD604 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${V instanceof Error?V.message:String(V)}`)}ee()}}async function Ae(){N=!0,L=!1,ee();try{let T=await r("get-worker-system-prompt",{});!T||typeof T!="object"||Array.isArray(T)?L=!0:A=T}catch{L=!0}finally{N=!1,ee()}}function me(){if(x=!x,x&&!A){Ae();return}ee()}function Se(){let T=Gr({loading:N,error:L});if(T)return T;if(!A)return"";let V=Array.isArray(A.variants)?A.variants:[];return i`<div class="settings-dialog__sp-body">
      ${A.target_base_placeholder?i`<div class="prompt-block__meta">
            \`${A.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${V.map(de=>i`<div class="settings-dialog__sp-variant" data-variant=${de.key}>
            <div class="settings-dialog__sp-cond">${de.condition}</div>
            ${ir(de.label,de.system_prompt)}
          </div>`)}
    </div>`}function ce(){return i`<section
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
        aria-expanded=${x?"true":"false"}
        @click=${me}
      >
        ${x?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${x?Se():""}
    </section>`}function w(T,V,de,Me,Re,Ne){let rt=Re[T]??Kt;return i`<select
      class=${rt===Kt?"settings-dialog__unset":""}
      data-key=${T}
      aria-label=${V}
      ?disabled=${Ne===!0}
      .value=${Or(String(rt))}
      @change=${st=>Me(T,String(st.target.value))}
    >
      <option value=${Kt} ?selected=${rt===Kt}>(기본)</option>
      ${de.map(st=>i`<option value=${st} ?selected=${st===rt}>
            ${st===Ft?"\uC790\uB3D9":st}
          </option>`)}
    </select>`}function k(T,V,de,Me,Re,Ne=!1){return i`<div
      class=${`settings-dialog__row${Ne?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${V}</span>
      <span class="settings-dialog__controls">
        ${w(T,V,de,Me,Re,Ne)}
      </span>
    </div>`}function H(T,V,de,Me,Re){return i`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${V}-on)`}
        ></i>
        ${T}
      </span>
      <span class="settings-dialog__controls">
        ${w(de,`${T} \uBAA8\uB378`,Me,Q,m,!1)}
        ${w(Re,`${T} effort`,vs,Q,m,!1)}
      </span>
    </div>`}function U(){let T=W(),V=ml(m),de=m.impl_runtime,Me=m.impl_model,Re=X();return i`
      <section
        class=${`settings-dialog__pane${c==="session"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-session"
        aria-label="세션 기본값"
      >
        <header class="settings-dialog__pane-head"><h2>세션 기본값</h2></header>
        <p class="settings-dialog__pane-sub">
          모든 세션(터미널 대화형 포함)이 따르는 전역 기본값입니다. 이슈에 핀이
          있으면 핀이 우선합니다.
        </p>
        ${h.length>0?i`<div class="settings-dialog__banner" role="alert">
              워크스페이스 기본값을 일부 읽지 못했습니다 —
              ${h.join(", ")}
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
                        data-mode=${Kt}
                        aria-pressed=${String(!m.workflow_mode)}
                        @click=${()=>Q("workflow_mode",Kt)}
                      >
                        (기본)
                      </button>
                      ${hs.map(Ne=>i`<button
                            type="button"
                            data-mode=${Ne}
                            aria-pressed=${String(m.workflow_mode===Ne)}
                            @click=${()=>Q("workflow_mode",Ne)}
                          >
                            ${Ne}
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
                ${H("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",bn,"spec_review_effort")}
                ${H("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",bs,"plan_review_effort")}
                ${H("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",bn,"impl_review_effort")}
              </div>

              <div class="settings-dialog__group">
                <div class="settings-dialog__group-title">
                  구현
                  <span class="settings-dialog__hint"
                    >이슈 핀이 있으면 핀이 우선합니다</span
                  >
                </div>
                ${k("impl_dispatch","\uC2E4\uD589 \uBC29\uC2DD",ms,Q,m)}
                ${k("impl_runtime","\uC704\uC784 \uB300\uC0C1",gs,Q,m,V)}
                ${k("impl_model","\uBAA8\uB378",ys(T,de),Q,m,V)}
                ${k("impl_effort","effort",Vr(T,de,Me),Q,m,V)}
                ${k("impl_speed","\uC18D\uB3C4",hn,Q,m,V)}
              </div>

              <div class="settings-dialog__preset-bar">
                <select
                  aria-label="구현 프리셋"
                  .value=${Or(q)}
                  @change=${Ne=>{q=String(Ne.target.value),ee()}}
                >
                  <option value="" ?selected=${q===""}>
                    구현 프리셋…
                  </option>
                  ${(Re?.presets||[]).map(Ne=>i`<option
                        value=${Ne.id}
                        ?selected=${Ne.id===q}
                      >
                        ${Ne.name}
                      </option>`)}
                </select>
                <button
                  type="button"
                  class="settings-dialog__btn settings-dialog__btn--primary"
                  ?disabled=${q.length===0}
                  @click=${qe}
                >
                  전역 기본값으로 적용
                </button>
                <input
                  type="text"
                  class="settings-dialog__preset-name"
                  placeholder=${q?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                  aria-label="프리셋 이름"
                  .value=${Or(S)}
                  @input=${Ne=>{S=String(Ne.target.value)}}
                />
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-save
                  @click=${De}
                >
                  ${q?"\uAC31\uC2E0":"\uC800\uC7A5"}
                </button>
                <button
                  type="button"
                  class="settings-dialog__btn"
                  data-preset-delete
                  ?disabled=${q.length===0}
                  @click=${We}
                >
                  삭제
                </button>
              </div>
            `}
      </section>
    `}function K(){let T=t.queueStore?.get(),V=W(),de={orchestration_model:F.orchestration_model??(Zt(T)?T.orchestration_model:null),orchestration_effort:F.orchestration_effort??(Zt(T)?T.orchestration_effort:null),orchestration_speed:F.orchestration_speed??(Zt(T)?T.orchestration_speed:null)},Me=ws(V,$),Re=Vr(V,$||void 0,de.orchestration_model||Ft).filter(rt=>rt!==Ft),Ne=Zt(T)&&typeof T.slots=="number"?T.slots:2;return i`
      <section
        class=${`settings-dialog__pane${c==="worker"?" settings-dialog__pane--active":""}`}
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
                .value=${Or($||Kt)}
                @change=${rt=>{let st=String(rt.target.value);$=st===Kt?null:st,ee()}}
              >
                <option value=${Kt} ?selected=${!$}>
                  전체
                </option>
                <option
                  value="claude"
                  ?selected=${$==="claude"}
                >
                  claude
                </option>
                <option
                  value="codex"
                  ?selected=${$==="codex"}
                >
                  codex
                </option>
              </select>
              <span class="settings-dialog__hint">모델 목록을 좁힙니다</span>
            </span>
          </div>
          ${k("orchestration_model","\uBAA8\uB378",Me,ye,de)}
          ${k("orchestration_effort","effort",Re,ye,de)}
          ${k("orchestration_speed","\uC18D\uB3C4",hn,ye,de)}
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
                  @click=${()=>Pe(Ne-1)}
                >
                  −
                </button>
                <span class="settings-dialog__stepper-value">${Ne}</span>
                <button
                  type="button"
                  aria-label="slots 증가"
                  @click=${()=>Pe(Ne+1)}
                >
                  +
                </button>
              </span>
            </span>
          </div>
        </div>
        ${ce()}
      </section>
    `}function O(){let T=n.get();return i`
      <section
        class=${`settings-dialog__pane${c==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${T?i`
              ${gc(T,s(),j)}
              ${hc(T,d,{onDraft:V=>{d=V},onAdd:M,onRemove:R})}
              ${bc(T,J)}
            `:i`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function I(T){let V=n.get();if(V)try{let de=await r("display-policy-set",{expected_revision:V.revision,policy:T(V)});_e(de),de&&de.conflict&&de.policy&&(de=await r("display-policy-set",{expected_revision:de.policy.revision,policy:T(de.policy)}),_e(de)),de&&de.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function _e(T){T&&T.policy&&typeof T.policy=="object"&&n.set(T.policy)}function Le(T){I(T)}function j(T){let V=n.get();if(!V)return;let de=!Yf(T,V);Le(Me=>Kf(T,Me,de))}function M(){let T=d.trim();T.length!==0&&(d="",Le(V=>V.hidden_prefixes.includes(T)?{hidden_prefixes:V.hidden_prefixes}:{hidden_prefixes:[...V.hidden_prefixes,T]}),ee())}function R(T){Le(V=>({hidden_prefixes:V.hidden_prefixes.filter(de=>de!==T)}))}function J(T){let V=n.get();if(!V)return;let de=V.chips[T]===!1;Le(()=>({chips:{[T]:de}}))}function ee(){je(i`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${Vf.map(T=>i`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${T.id}
                  aria-selected=${String(c===T.id)}
                  aria-controls=${`settings-pane-${T.id}`}
                  @click=${()=>ue(T.id)}
                >
                  <span class="settings-dialog__glyph">${T.glyph}</span>
                  ${T.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${Ze}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${U()} ${K()} ${O()}
          </div>
        </div>
      `,a)}function ue(T){c=T,ee()}let ae=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",ae),a.addEventListener("cancel",ae);let Ee=T=>{T.target===a&&Ze()};a.addEventListener("click",Ee);let Ve=null;n.subscribe&&(Ve=n.subscribe(()=>{l&&ee()}));let lt=null;t.implPresetStore?.subscribe&&(lt=t.implPresetStore.subscribe(()=>{l&&ee()}));function ut(T="session"){l||(l=!0,t.onOpenChange?.(!0),c=T,d="",F={},ee(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),re())}function Ze(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ut,close:Ze,sessionDraft:()=>({...m}),destroy(){l=!1,a.removeEventListener("close",ae),a.removeEventListener("cancel",ae),a.removeEventListener("click",Ee),Ve&&(Ve(),Ve=null),lt&&(lt(),lt=null),a.remove()}}}function Yf(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function Kf(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var Zf=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function yc(e){return String(e).padStart(2,"0")}function Xf(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Qf(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${yc(n.getHours())}:${yc(n.getMinutes())}`,c=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Zf[n.getMonth()]} ${n.getDate()} ${o}`;return`${Xf(r,t)} \xB7 ${c}`}function Jf(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var wc=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function kc(e){let t=!1,r=null,n=new Map;function s(){je(i``,e),e.hidden=!0}function o(){let l=wc.filter(_=>n.has(_.key));if(l.length===0){s();return}let d=Date.now();je(i`<div class="usage-meter" aria-label="Usage">
        ${l.map(_=>{let m=n.get(_.key),h=typeof m.ageSeconds=="number"&&m.ageSeconds>600,E=h?`${Math.floor(m.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return i`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${_.label} usage`}
          >
            <span class="usage-meter__provider">${_.label}</span>
            ${m.windows.map($=>{let F=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,q=Math.min(100,Math.max(0,F)),x=`resets ${Qf($.resetsAt,d)}${h?` \xB7 ${E}`:""}`;return i`<span
                class="usage-meter__window ${Jf(q)}"
                style=${`--progress: ${q}%`}
                title=${x}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${q}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let d=await fetch(l.endpoint);if(!d.ok)return null;let _=await d.json();return!_||_.available!==!0||!Array.isArray(_.windows)?null:_}catch{return null}}async function c(){let l=await Promise.all(wc.map(async d=>({provider:d,payload:await a(d)})));if(!t){for(let d of l)d.payload?n.set(d.provider.key,d.payload):n.delete(d.provider.key);o()}}return s(),c(),r=setInterval(()=>{c()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var e_="worker-ineligible";function zo(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function $c(e){return zo(e).includes(e_)}var t_="worker-serial";function Ho(e){return zo(e).includes(t_)}var r_=new Set(["done","failed","orphaned","stopped","discarded"]);function xc(e,t){let{queueStore:r,analysisStore:n,transport:s}=t,o=document.createElement("dialog");o.id="worker-parallel-analysis-dialog",o.className="pa",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a=new Map,c=new Map,l=!1;function d(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function _(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,last_good:null}}function m(){let w=d(),k=new Set;for(let H of Object.values(w.attempts||{})){let U=H;U&&typeof U.bead_id=="string"&&!r_.has(U.status)&&k.add(U.bead_id)}for(let H of Array.isArray(w.pr_wait)?w.pr_wait:[])H&&typeof H.bead_id=="string"&&k.add(H.bead_id);for(let H of Object.values(w.discard_operations||{})){let U=H;U&&U.phase!=="done"&&typeof U.bead_id=="string"&&k.add(U.bead_id)}return k}function h(w){return w.filter(k=>E(k)===null)}function E(w){let k=d();for(let H of Array.isArray(k.serial_lanes)?k.serial_lanes:[])if(Array.isArray(H?.entries)&&H.entries.some(U=>U.bead_id===w))return H.id;return(Array.isArray(k.queue)?k.queue:[]).some(H=>H.bead_id===w)?"parallel":null}function $(w,k){let H=a.get(w);return H||[...k.order]}function F(w){if(w.length<2)return!1;let k=E(w[0]);if(!k||k==="parallel")return!1;let H=d(),U=(Array.isArray(H.serial_lanes)?H.serial_lanes:[]).find(O=>O.id===k)?.entries.map(O=>O.bead_id);if(!Array.isArray(U))return!1;let K=w.map(O=>U.indexOf(O));return K.every(O=>O>=0)&&K.every((O,I)=>I===0||O>K[I-1])}function q(){let w=d(),k=Array.isArray(w.serial_lanes)?w.serial_lanes:[],H=k.find(U=>Array.isArray(U.entries)&&U.entries.length===0);return H?H.id:k[0]?.id||"s1"}function S(w){let k=d().bead_titles||{};return typeof k[w]=="string"?k[w]:w}async function x(w,k){if(!s||l)return null;l=!0,Te();try{return await s(w,k)}finally{l=!1,Te()}}async function N(w){let k=await x("worker-parallel-analysis-start",{force:w});k&&k.applied===!1&&k.reason&&oe(`\uBD84\uC11D \uC2E4\uD328: ${k.reason}`,"error",2800)}async function L(){let w=_().job;!s||!w||await s("worker-parallel-analysis-cancel",{job_id:w.job_id})}async function A(w){let k=_().settings;await x("worker-parallel-analysis-settings-update",{expected_revision:k.revision,runner:k.runner||"claude",model:w,effort:k.effort||"high"})}async function W(w,k){if(!s||l)return;let H=$(w,k),U=_();if(H.length<2||!U.last_good){oe("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let K=c.get(w)||q(),O=()=>({snapshot_digest:U.last_good.identity_digest,group_index:w,lane:K,ordered_bead_ids:H,expected_revision:d().revision});l=!0,Te();try{let I=await s("worker-parallel-analysis-submit",O());I&&I.queue&&r&&r.set(I.queue),I&&I.applied!==!0&&I.conflict===!0&&(I=await s("worker-parallel-analysis-submit",O()),I&&I.queue&&r&&r.set(I.queue)),I&&I.applied===!0?(a.delete(w),oe(`\uC9C1\uB82C \uB808\uC778 ${K}\uC5D0 ${H.length}\uAC1C \uBC30\uCE58`,"success")):oe(`\uC81C\uCD9C \uAC70\uBD80: ${I?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{l=!1,Te()}}function X(w,k,H){a.set(w,$(w,k).filter(U=>U!==H)),Te()}function re(w){a.delete(w),Te()}function be(w,k,H,U){let K=[...$(w,k)],O=K.indexOf(H),I=O+U;O<0||I<0||I>=K.length||(K.splice(I,0,...K.splice(O,1)),a.set(w,K),Te())}function Q(){let w=_().settings,k=d().runner_catalog,H=Object.keys(k?.runners?.[w.runner||"claude"]?.models||{}),U=!!(w.runner&&w.model&&w.effort);return i`<div class="pa-settings">
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${K=>{A(K.target.value)}}
        >
          ${H.map(K=>i`<option value=${K} ?selected=${w.model===K}>
                ${K}
              </option>`)}
        </select>
      </label>
      ${U?i`<span class="pa-settings__effort"
            >effort ${w.effort}</span
          >`:i`<span class="pa-settings__unset">분석 모델 설정 필요</span>`}
    </div>`}function ie(w){let k=d(),H=(Array.isArray(k.queue)?k.queue.length:0)+(Array.isArray(k.serial_lanes)?k.serial_lanes:[]).reduce((O,I)=>O+(Array.isArray(I.entries)?I.entries.length:0),0),U=!!w.job,K=!!(w.settings.runner&&w.settings.model&&w.settings.effort);return i`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${H}</span>
      ${w.last_good?i`<span class="pa-meta__at"
            >분석 ${new Date(w.last_good.at||0).toLocaleString()}</span
          >`:i`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!K||U||l}
        @click=${()=>{N(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!K||U||l}
        @click=${()=>{N(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!U}
        @click=${()=>{L()}}
      >
        취소
      </button>
    </div>`}function ye(w,k){let H=$(w,k),U=m(),K=H.filter(M=>U.has(M)),O=h(H),I=F(H),_e=Array.isArray(d().serial_lanes)?d().serial_lanes:[],Le=c.get(w)||q(),j=k.eligible!==!0||H.length<2||K.length>0||O.length>0||I||l;return i`<section class="pa-group" data-group-index=${String(w)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${k.confidence}</span>
        ${k.categories.map(M=>i`<span class="pa-group__category">${M}</span>`)}
        ${I?i`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${k.eligible===!0?"":i`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${O.length>0?i`<span class="pa-group__stale"
              >stale — ${O.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${k.reason}</p>
      <ol class="pa-group__members">
        ${H.map((M,R)=>i`<li class="pa-member" data-bead-id=${M}>
              <span class="pa-member__seq">${R+1}</span>
              <span class="pa-member__title">${S(M)}</span>
              ${U.has(M)?i`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${M}
                ?disabled=${R===0}
                aria-label=${`${M} \uC704\uB85C`}
                @click=${()=>be(w,k,M,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${M}
                ?disabled=${R===H.length-1}
                aria-label=${`${M} \uC544\uB798\uB85C`}
                @click=${()=>be(w,k,M,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${M}
                aria-label=${`${M} \uC81C\uC678`}
                @click=${()=>X(w,k,M)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${k.evidence.map(M=>i`<li class="pa-evidence">
              <code>${M.path}</code>
              <span class="pa-evidence__locator">${M.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>re(w)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${M=>{c.set(w,M.target.value),Te()}}
          >
            ${_e.map((M,R)=>i`<option
                  value=${M.id}
                  ?selected=${Le===M.id}
                >
                  직렬 ${R+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${j}
          @click=${()=>{W(w,k)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Pe(w){let k=Array.isArray(w.issues)?w.issues:[],H=k.filter(K=>K.verdict==="parallel_ok").length,U=k.filter(K=>K.verdict==="uncertain").length;return i`<div class="pa-summary">
      <span>parallel_ok ${H}</span>
      <span>uncertain ${U}</span>
    </div>`}function Te(){let w=_(),k=w.last_good?.result;je(i`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${ce}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${Q()} ${ie(w)}
            ${k?i`${k.groups.map((H,U)=>ye(U,H))}
                ${k.groups.length===0?i`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Pe(k)}`:i`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,o)}let De=!1,We=()=>{De=!1},qe=w=>{w.target===w.currentTarget&&ce()};o.addEventListener("close",We),o.addEventListener("cancel",We),o.addEventListener("click",qe);let Ae=null;r&&r.subscribe&&(Ae=r.subscribe(()=>{De&&Te()}));let me=null;n&&n.subscribe&&(me=n.subscribe(()=>{De&&Te()}));function Se(){De||(De=!0,Te(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function ce(){De&&(De=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:Se,close:ce,destroy(){De=!1,o.removeEventListener("close",We),o.removeEventListener("cancel",We),o.removeEventListener("click",qe),Ae&&(Ae(),Ae=null),me&&(me(),me=null),o.remove()}}}function Sc(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{});function s(){return t&&t.get()||{}}function o(){let x=s();return typeof x.revision=="number"?x.revision:0}function a(x){t&&x&&x.queue&&typeof x.queue=="object"&&t.set(x.queue)}function c(){let x=s().workspace_info;return x&&typeof x=="object"?x:{}}function l(x,N){return i`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${x}"
      >${N}</span
    >`}function d(x){if(typeof x!="number"||!Number.isFinite(x))return"";let N=x/6e4;return Number.isInteger(N)?`timeout ${N}\uBD84`:`timeout ${Math.round(x/1e3)}\uCD08`}function _(x){let N=d(x);return N?l("config",N):""}function m(x){let N=typeof x.base_sha=="string"?x.base_sha:"",L=`${x.source_path||"repo-ops/config.toml"} @ ${x.base_ref||"?"}${N?`@${N.slice(0,7)}`:""}`;return i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${L}</span>
      </p>
      <div class="worker-repo-ops__lane" data-lane="verify">
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${x.verify?i`<code class="worker-repo-ops__vd-cmd"
                  >${x.verify.script}</code
                >${_(x.verify.timeout_ms)}`:i`선언 없음${l("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
      </div>
      <div class="worker-repo-ops__lane" data-lane="deploy">
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${x.deploy?i`<code class="worker-repo-ops__vd-cmd"
                  >${x.deploy.script}</code
                >${_(x.deploy.timeout_ms)}`:i`선언 없음${l("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${x.deploy?i`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
      </div>
    </section>`}function h(x){let N=x.repo_ops&&typeof x.repo_ops=="object"?x.repo_ops:null;return N&&(N.status==="resolved"||N.status==="absent")?m(N):N&&(N.status==="pending"||N.status==="error")?i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${N.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":i`선언 읽기
              실패${N.error_code?i` — <code>${N.error_code}</code>`:""}`}
        </div>
      </section>`:i`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function E(x){if(!r)return;let N=await r("worker-auto-repair-toggle",{on:x,expected_revision:o()});if(a(N),N&&N.conflict){let L=await r("worker-auto-repair-toggle",{on:x,expected_revision:o()});a(L)}n()}let $={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function F(x,N,L){return i`<div class="worker-repo-ops__policy-group" data-policy=${L}>
      <div class="worker-repo-ops__policy-label">${x}</div>
      <ul class="worker-repo-ops__policy-list">
        ${N.map(A=>i`<li data-token=${A}>
              ${$[A]||A}
            </li>`)}
      </ul>
    </div>`}function q(x){return i`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${x.map(N=>{let L=[$[N.trigger]||N.trigger];return Number.isInteger(N.attempts_per_operation_attempt)?L.push(`operation\uB2F9 ${N.attempts_per_operation_attempt}\uD68C`):Number.isInteger(N.attempts)?L.push(`${$[N.budget]||N.budget} ${N.attempts}\uD68C`):Number.isInteger(N.sessions_per_user_action)&&L.push(`${N.sessions_per_user_action}\uD68C`,$[N.user_actions]||N.user_actions),N.applies_when&&L.push($[N.applies_when]||N.applies_when),i`<li data-token=${N.id}>
            <strong>${$[N.id]||N.id}</strong>
            <span>${L.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function S(){let x=s(),N=x.auto_repair!==!1,L=x.repo_operation_policy&&typeof x.repo_operation_policy=="object"?x.repo_operation_policy:null,A=Array.isArray(x.repo_operations)?x.repo_operations:[],W=A.find(Q=>Q.state==="repairing"),X=A.filter(Q=>Q.state==="failed"||Q.state==="repairing"),re=X.length?Math.min(...X.map(Q=>typeof Q.repair?.remaining=="number"?Q.repair.remaining:0)):L?.auto_repair?.resolution_ladder?.find(Q=>Q.id==="auto_repair_session")?.attempts??1,be=Array.isArray(L?.auto_repair?.resolution_ladder)?L.auto_repair.resolution_ladder:[];return i`<section
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
          .checked=${N}
          @change=${Q=>{E(Q.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${N?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${re}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${W?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${W.repair?.owner_bead||W.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${L?i`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(L.worker_automatic||[]).length} · 해결 사다리
                ${be.length} · 금지
                ${(L.never_automatic||[]).length}</span
              >
            </summary>
            ${F("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",L.worker_automatic||[],"worker-automatic")}
            ${L.supported===!1||L.schema_version!==2?i`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${L.schema_version})`}
                </div>`:q(be)}
            ${F("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",L.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return i`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${h(c())} ${S()}
      </details>`}}}var n_=20,Ac={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Ec={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function s_(e,t,r=n_){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Tc(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function o_(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Cc(e){let t=e.filter(r=>r.value);return t.length===0?"":i`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>i`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Rc(e,t="",r=!1){return!e&&!t?"":i`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?i`<br />${t}`:""}
  </p>`}function a_(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return i`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Ec,n)?Ec[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
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
  </div>`}function i_(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return i`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?ht(e.at):""}
      >${Ss(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Tc(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Ac,t.kind)?Ac[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${xs(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Lo(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Tc(e)}"
          >${o_(e)}</span
        >
        ${t.dismissed?i`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?i`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Rc(Hl(t.failure_kind,n)):""}
      ${a_(t)}
      ${Cc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${xs(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function l_(e){let t=e.cleanup,r=Dr(t.step);return i`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?ht(e.at):""}
      >${Ss(e.at)||"\u2014"}</span
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
        ${Ul(t.step).map(n=>i`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Rc(Ts(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
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
      ${Cc([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function c_(e){return i`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
          ${e.events.map(t=>t.type==="cleanup"?l_(t):i_(t))}
        </ul>`}
  </section>`}function Ic(e,t={}){let r=null;function n(){je(r?c_(r):i``,e)}e.addEventListener("click",a=>{a.target?.closest?.('[data-seam="repo-ops-close"]')&&o()});function s(a){r={events:s_(a.operations,a.cleanup_failures),repo:a.repo||""},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&s(a)}}}var d_="tab:worker:ready",u_="tab:worker:blocked",p_="tab:worker:in-progress",f_="tab:worker:closed",Rs=1,Lc=5;function Oc(e){return gn(e).path.length>0}var Pc="beads-ui.worker.candidate-filter",Go={show_blocked:!1,spec:"all"};function __(){try{let e=window.localStorage.getItem(Pc);if(!e)return{...Go};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Go};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Go}}}function m_(e){try{window.localStorage.setItem(Pc,JSON.stringify(e))}catch{}}function g_(e,t){let r=c=>t.show_blocked||!c.blocked,n=c=>t.spec==="all"||(t.spec==="with"?c.has_spec:!c.has_spec),s=[],o=0,a=0;for(let c of e){let l=r(c),d=n(c);l&&d?s.push(c):!l&&d?o+=1:l&&!d&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var h_=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Nc="bdui.worker.candidate_sort",b_=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Is="spec";function v_(){try{let e=window.localStorage.getItem(Nc);return e==="board"||e==="created"||e==="spec"?e:Is}catch{return Is}}function y_(e){try{window.localStorage.setItem(Nc,e)}catch{}}var Fc="bdui.worker.done-range";function w_(){try{let e=window.localStorage.getItem(Fc);return Mt(e)?e:It}catch{return It}}function k_(e){try{window.localStorage.setItem(Fc,e)}catch{}}var $_="(max-width: 640px)",qc="beads-ui.worker.lane-collapsed",Sn={queue:!0,done:!0};function x_(){try{let e=window.localStorage.getItem(qc);if(!e)return{...Sn};let t=JSON.parse(e);return!t||typeof t!="object"?{...Sn}:{queue:typeof t.queue=="boolean"?t.queue:Sn.queue,done:typeof t.done=="boolean"?t.done:Sn.done}}catch{return{...Sn}}}function S_(e){try{window.localStorage.setItem(qc,JSON.stringify(e))}catch{}}function Dc(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function A_(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Tr):(n.sort(Un(r)),t==="board"?n:[...n.filter(Oc),...n.filter(s=>!Oc(s))])}function E_(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function T_(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function C_(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}function Mc(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function R_(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function I_(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function Vo(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function L_(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[o,`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function O_(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r("\uC790\uB3D9\uBCF5\uAD6C \uC911",{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Mc(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Mc(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function D_(e,t,r,n,s=null,o=null,a=null,c=!1,l=null,d=!0,_=null,m=null,h=null,E={},$=!1,F=!1){let q=!!l&&l.position>0,S=!!l?.continuation_action&&l.continuation_action.continuation===null,x=!!l&&l.active===!0,N=l&&l.failure||null,L=r[e]||null,A=L&&L.gate?L.gate:null,W=L&&L.pr?L.pr:null,X=L_(h),re=R_(l?l.resolution:null),be=I_(l?l.head_review:null),Q=l&&l.head_review||null,ie=l&&l.authority||null,ye=!!Q&&["pending","reviewing","revising"].includes(Q.state),Pe=q&&!x&&(Q?.state==="failed"||!ie||ie.source==="automatic"&&!F),Te=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":re?re.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,De=!!A&&A.base_badge==="\uCDA9\uB3CC",We=!!A&&A.enabled===!0,qe=Do(o&&o.merge_progress?o.merge_progress.step:null),Ae=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!A&&A.tier==="merged",me=c&&!!n&&!!A&&A.tier==="merged",Se=c&&De&&d===!1,ce=Jt(E,e,{external:c,merge_active:x||!!qe,merge_queued:q,conflict_active:!!a,cleanup_active:!1,merged:!!n||A?.tier==="merged"}),w=!!ce.operation,k=!Ae&&!!n&&n.step==="repo_operations",H=O_({continuation_required:S,merge_step:qe,conflict_badge:Te,conflict_live:re?.live===!0||a==="running",head_review:Q&&be?{...be,state:Q.state,failure_reason:Q.failure_reason}:null,recovery:X,cleanup_failed:n,cleanup_label:n?Dr(n.step):null,base_exception:m,conflicting:De,gate:A,queue_failure:N,auto_skip:_,queued:q,queue_active:x,queue_position:l?l.position:0,activity:Te?null:o&&o.activity||null}),U=H?.live===!0&&H.title?i`<span title=${H.title}>${H.label}</span>`:H?.label||null;return{id:e,title:c?i`${t}<span class="muted"> · 세션</span>`:t,reason:n?Es(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:c,pr_number:W&&typeof W.number=="number"?W.number:null,pr_url:W&&typeof W.url=="string"?W.url:"",completion_badge:H?.live!==!0&&H?.title?H.label:null,completion_title:H?.title||"",completion_repair_pr_url:X?X.repair_pr_url:"",completion_repair_pr_number:X?X.repair_pr_number:null,badges:U?[U]:[],live_badge:H?.live===!0?U:null,usage:s,alert:H?.alert===!0,merge_action:k?!1:!q||S||Pe,timeline_action:k,cancel_action:q&&!S,cancel_enabled:(!x||ye)&&!(X&&X.lock_actions),cancel_title:X&&X.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":x&&!ye?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ye?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ce,discard_action:ce.action,merge_step:qe,discard_enabled:ce.enabled,discard_title:ce.title,merge_enabled:!qe&&!a&&!w&&!m&&!(X&&X.lock_actions)&&!Se&&!k&&(We||De||A?.reason==="base_behind"||A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"||Ae||me||Pe),merge_label:S?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ae||me?"\uC815\uB9AC \uC7AC\uAC1C":De&&!qe&&!Ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":A?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Pe?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:w?ce.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ce.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ce.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:S?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":qe?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${qe.label}`:me?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Se?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":Ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":De?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":A?.reason==="review_receipt_missing"||A?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":We?`\uBA38\uC9C0 (${A.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:A&&A.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${A&&A.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function Yo(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:c,gotoIssue:l,getWorkspacePath:d,doneRange:_,onDoneRangeChange:m}=t,h=n?Wn(n,c):null,E=Hn({transport:r,uiOrderStore:c}),$=null,F=[],q=__(),S=v_(),x=Mt(_)?_:w_(),N=new Map;function L(){let p=Xt.find(v=>v.value===x);return p?p.label:"\uC624\uB298"}let A=x_(),W=!1,X=new Set,re=new Set,be=new Set,Q=new Set,ie=[],ye=document.createElement("div");ye.className="worker-console";let Pe=document.createElement("div");Pe.className="worker-top";let Te=document.createElement("div");Te.className="worker-drawer-overlay",Te.hidden=!0;let De=document.createElement("div");De.className="worker-drawer-overlay__backdrop";let We=document.createElement("div");We.className="worker-drawer-host";let qe=document.createElement("div");qe.className="worker-drawer-host",qe.hidden=!0,Te.append(De,We,qe);let Ae=document.createElement("div");Ae.className="worker-lanes-host",ye.append(Pe,Te,Ae),e.appendChild(ye);let me=null,Se=ps(We,{transport:r,sessionLogStore:a,onClose:()=>{me=null,Te.hidden=!0,B()}}),ce=Ic(qe,{onClose:()=>{qe.hidden=!0,Te.hidden=!0,B()}}),w=Sc({queueStore:s,transport:r,onChanged:()=>B()}),k=o?xc(ye,{queueStore:s,analysisStore:o,transport:r}):null;function H(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Rs,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function U(){let p=H();return typeof p.revision=="number"?p.revision:0}function K(p){p&&p.queue&&s&&s.set(p.queue)}function O(){let p=H().queue;return Array.isArray(p)?p.length:0}async function I(p,v,P){if(!r)return;let Y=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},index:P,expected_revision:U()}),le=await r("worker-queue-place",Y());K(le),le&&le.conflict&&await r("worker-queue-place",Y()).then(K)}async function _e(p,v,P){if(!r)return;let Y=()=>({bead_id:p,...v==="parallel"?{}:{lane:v},to_index:P,expected_revision:U()}),le=await r("worker-queue-reorder",Y());K(le),le&&le.conflict&&await r("worker-queue-reorder",Y()).then(K)}async function Le(p){if(!r)return;let v=await r("worker-queue-remove",{bead_id:p,expected_revision:U()});K(v),v&&v.conflict&&await r("worker-queue-remove",{bead_id:p,expected_revision:U()}).then(K)}async function j(p){if(!r||!p)return;let v=await r("worker-attempt-pause",{attempt_id:p});v&&v.paused===!1&&v.reason&&oe(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function M(p){if(!r||!p)return;let v=async(Y={})=>await r("worker-attempt-resume",{attempt_id:p,expected_revision:U(),...Y}),P=await v();K(P),P&&P.conflict&&(P=await r("worker-attempt-resume",{attempt_id:p,expected_revision:U()}),K(P)),P=await rr(P,(Y,le)=>v({continuation:Y,decision_token:le}),{onResult:K,refresh:()=>v()}),P&&P.resumed===!1&&!P.conflict&&P.reason&&oe(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${P.reason}`,"error",2400)}async function R(p){if(!r||!p)return;let v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:U()});K(v),v&&v.conflict&&(v=await r("worker-attempt-dismiss",{attempt_id:p,expected_revision:U()}),K(v)),v&&v.dismissed===!1&&!v.conflict&&v.reason&&oe(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${v.reason}`,"error",2400)}async function J(p,v,P=!0){if(!r)return null;let Y=r,le=await Y(p,{...v,expected_revision:U()});return K(le),le&&le.conflict&&P&&(le=await Y(p,{...v,expected_revision:U()}),K(le)),le}async function ee(p){if(!r||!p)return;let v=H().merge_queue?.find(Y=>Y.bead_id===p)?.continuation_action;if(v?.mismatch&&v.continuation===null){await ae(p,v.mismatch);return}X.add(p),B();let P;try{P=await J("worker-merge-queue-add",{bead_id:p})}finally{X.delete(p),B()}!P||P.conflict||P.applied||oe("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ue(p){if(!(!r||!p||re.has(p))){re.add(p),B();try{let v=await r("worker-cleanup-retry",{bead_id:p,expected_revision:U()});K(v),v&&!v.retried&&!v.conflict&&v.reason&&oe(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${v.reason}`,"error",2400)}finally{re.delete(p),B()}}}async function ae(p,v){let P=await rr({continuation_mismatch:v},(le,ze)=>J("worker-merge-queue-add",{bead_id:p,continuation:le,decision_token:ze},!1)),Y=P?.queue?.merge_queue?.find(le=>le.bead_id===p)?.continuation_action;if(P?.applied!==!0&&Y?.continuation===null&&Y.mismatch){await ae(p,Y.mismatch);return}P&&P.applied===!1&&!P.conflict&&oe("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function Ee(p){if(!r)return;let v=await J("worker-merge-auto-toggle",{on:p});!v||v.conflict||oe(p?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",p?"success":"info",2400)}async function Ve(p){if(!r||!p)return;let v=await J("worker-merge-queue-remove",{bead_id:p});v&&!v.conflict&&!v.applied&&v.reason==="merge_active"&&oe("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function lt(){await J("worker-merge-queue-remove",{all:!0})}async function ut(p,v=null,P="unmerged",Y=null){if(!r||!p)return;let le=yn(p,P);if(!(!!Y||typeof globalThis.confirm!="function"||globalThis.confirm(le)))return;let ke=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Y?{operation_id:Y}:{},expected_revision:U()});if(K(ke),ke&&ke.conflict&&(ke=await r("worker-discard",{bead_id:p,...v?{attempt_id:v}:{},...Y?{operation_id:Y}:{},expected_revision:U()}),K(ke)),ke&&ke.discarded===!0){oe(As(ke),"success",5e3);return}if(ke&&ke.reason){oe(`\uD3D0\uAE30 \uC2E4\uD328: ${ke.reason}`,"error",2800);return}if(ke&&ke.accepted&&ke.pending==="merged_revert"){oe("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ke&&ke.accepted&&!ke.discarded){oe(`\uD3D0\uAE30 \uC9C4\uD589: ${ke.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ke&&!ke.conflict&&oe("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function Ze(p,v,P){if(!(!r||!v||!P||Q.has(v))){Q.add(v),B();try{let Y=await r(p,{bead_id:v,action_id:P,expected_revision:U()});K(Y),Y?.conflict?oe("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!Y?.ok&&Y?.reason&&oe(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(Y.reason)}`,"error",2800)}finally{Q.delete(v),B()}}}async function T(p,v){if(!r||!v||be.has(v))return;be.add(v),B();let P;try{let Y=async(le={})=>await r(p,{bead_id:v,expected_revision:U(),...le});P=await Y(),K(P),P&&P.conflict&&(P=await r(p,{bead_id:v,expected_revision:U()}),K(P)),p==="worker-revise-fix"&&(P=await rr(P,(le,ze)=>Y({continuation:le,decision_token:ze}),{onResult:K,refresh:()=>Y()}))}finally{be.delete(v),B()}if(!(!P||P.conflict)){if(P.ok){oe(p==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}oe(`\uCC98\uBD84 \uAC70\uBD80: ${P.reason||""}`,"error",3e3)}}async function V(p){if(!r)return;let v=await r("worker-automation-toggle",{on:p,expected_revision:U()});K(v),v&&v.conflict&&await r("worker-automation-toggle",{on:p,expected_revision:U()}).then(K)}async function de(p){if(!r||!p)return;let v=await r("worker-repo-operation-repair",{operation_id:p});if(K(v),v&&v.ok===!1){oe(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${v.reason||""}`,"error",3e3);return}v&&v.ok===!0&&oe("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function Me(p){if(!r||!p)return;let v=await r("worker-repo-operation-dismiss",{operation_id:p});K(v),v&&v.ok===!1&&oe(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${v.reason||""}`,"error",3e3)}async function Re(p){if(!r||!Number.isFinite(p))return;let v=Math.max(Rs,Math.floor(p)),P=await r("worker-queue-set-slots",{slots:v,expected_revision:U()});K(P),P&&P.conflict&&await r("worker-queue-set-slots",{slots:v,expected_revision:U()}).then(K)}async function Ne(p){if(!r||!Number.isInteger(p)||p<1||p>Lc)return;let v=H(),P=(Array.isArray(v.serial_lanes)?v.serial_lanes:[]).slice(p).reduce((ze,ke)=>ze+(Array.isArray(ke?.entries)?ke.entries.length:0),0),Y=()=>({count:p,expected_revision:U()}),le=await r("worker-queue-set-serial-lane-count",Y());K(le),le&&le.conflict&&(le=await r("worker-queue-set-serial-lane-count",Y()),K(le)),le&&le.applied&&P>0&&oe(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${P}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function rt(){let p=H(),v=h?h.selectBoardColumn(d_,"ready"):[],P=h?h.selectBoardColumn(u_,"blocked"):[],Y=h?h.selectBoardColumn(f_,"closed"):[],le=h?h.selectBoardColumn(p_,"in_progress"):[],ze=new Map;for(let g of le){let D=T_(g);if(!D)continue;let se=ze.get(D);se?se.push(g):ze.set(D,[g])}let ke=g=>{let D=zn(ze.get(g)||[]);return D?D.title||D.id:null},te=p.bead_titles||{},b=new Map;for(let[g,D]of Object.entries(te))typeof D=="string"&&D.length>0&&b.set(g,D);for(let g of[...v,...P])b.set(g.id,g.title||g.id);let G=p.bead_times&&typeof p.bead_times=="object"&&!Array.isArray(p.bead_times)?p.bead_times:{},ne=p.bead_labels&&typeof p.bead_labels=="object"&&!Array.isArray(p.bead_labels)?p.bead_labels:{},Fe=new Map;for(let[g,D]of Object.entries(ne))Array.isArray(D)&&Fe.set(g,Ho(D));for(let g of[...v,...P]){let D=g.labels;Array.isArray(D)&&!Fe.has(g.id)&&Fe.set(g.id,Ho(D))}let et=new Map,He=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(He)?He:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let D=g.members.map(Be=>{let pt=(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).find(Rt=>Rt.entries.some(ft=>ft.bead_id===Be));return pt?pt.id:null});if(!(D.every(Be=>Be!==null)&&new Set(D).size===1))for(let Be of g.members)et.set(Be,g.members.filter(pt=>pt!==Be))}let ve=p.bead_blocked_by&&typeof p.bead_blocked_by=="object"&&!Array.isArray(p.bead_blocked_by)?p.bead_blocked_by:{},y=new Map;for(let[g,D]of Object.entries(G))D&&typeof D=="object"&&y.set(g,D);for(let g of[...v,...P])y.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let f=g=>y.get(g)||{},u=p.pr_wait||[],C=p.pr_observations||{},Z=p.pr_activity||{},fe=p.cleanup_failed||{},Ce=Object.entries(fe).map(([g,D])=>({bead_id:g,step:D&&D.step?D.step:"",reason:D&&D.reason?D.reason:"",at:D&&typeof D.at=="number"?D.at:null,detail:D&&typeof D.detail=="string"?D.detail:null,output_tail:D&&typeof D.output_tail=="string"&&D.output_tail?D.output_tail:void 0,log_path:D&&typeof D.log_path=="string"&&D.log_path?D.log_path:void 0,retry_count:D&&typeof D.retry_count=="number"&&Number.isInteger(D.retry_count)&&D.retry_count>0?D.retry_count:0,failure_code:D&&typeof D.failure_code=="string"?D.failure_code:void 0,subject_id:D&&typeof D.subject_id=="string"?D.subject_id:void 0,repair_eligible:!!(D&&D.repair_eligible),repair:D&&D.repair?D.repair:void 0})),$e=p.queue||[],he=new Set([...$e.map(g=>g.bead_id),...(Array.isArray(p.serial_lanes)?p.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(D=>D.bead_id)),...u.map(g=>g.bead_id),...p.done.map(g=>g.bead_id)]),nt=new Set(P.map(g=>g.id)),Kr=c?c.get()?.order||{}:{},Qo=new Set,Jo=[];for(let g of[...v,...P])he.has(g.id)||Qo.has(g.id)||E_(g)||$c(g.labels)||(Qo.add(g.id),Jo.push(g));F=A_(Jo,S,Kr);let Qc=p.admission||{},ea=g=>{let D=Qc[g];if(!D)return"";if(D.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let se=typeof D.reason=="string"?D.reason:"",Be=se.indexOf(":");return Be>0&&Be<se.length-1?`\u26D4 ${se.slice(0,Be)} (${se.slice(Be+1)})`:`\u26D4 ${se}`},Jc=F.map(g=>{let D=gn(g),se=D.path.length>0,Be=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",pt=!Be&&se&&!D.conflict,Rt=nt.has(g.id),ft=[];Rt&&ft.push(C_(g)),Be?ft.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):D.conflict?ft.push("spec_id_conflict"):se||ft.push("spec \uC5C6\uC74C");let tt=ea(g.id);return tt&&ft.push(tt),{id:g.id,title:g.title||g.id,reason:ft.join(" \xB7 "),draggable:pt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Be,status:g.status,blocked:Rt,has_spec:se}}),Ls=g_(Jc,q),ed=Ls.visible,td=p.revise_parked||{},An=p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Os=(g,D)=>g.map((se,Be)=>{let pt=D!=="done",Rt=D!=="done"&&D!=="queue",ft=pt?td[se.bead_id]:null,tt=pt?Jt(An,se.bead_id):null,Ln=tt?.operation?tt:null,_d=pt&&Fe.get(se.bead_id)===!0,xa=ve[se.bead_id]||[],Bs=p.admission&&typeof p.admission=="object"?p.admission[se.bead_id]:null,Us=pt?ql(Bs,!!Ln||Q.has(se.bead_id)):null,md=pt&&!Us?ea(se.bead_id):null,gd=pt?[md]:[],Sa=pt&&xa.length>0&&typeof Bs?.reason=="string"&&Bs.reason.startsWith("not_ready")?[`\u23F8 ${xa.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],js=pt?et.get(se.bead_id):void 0;return js&&js.length>0&&Sa.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${js.join(", ")}\uC640`),{id:se.bead_id,title:b.get(se.bead_id)||se.bead_id,reason:gd.filter(Boolean).join(" \xB7 "),draggable:pt&&!Ln&&!Us,done:D==="done",lane:D,seq:Rt?Be+1:void 0,worker_serial:_d,discard:Ln,stale_work:Us,badges:[...Sa,...ft?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!ft,revise_action:!!ft,revise_enabled:!!ft&&!Ln&&!be.has(se.bead_id),revise_title:ft?ft.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${ft.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:D==="done"?Pt(p.attempts||{},se.bead_id):null,done_at:D==="done"&&typeof se.added_at=="number"?se.added_at:void 0,...f(se.bead_id)}}),ta=new Map;for(let g of p.done)g&&typeof g.bead_id=="string"&&typeof g.added_at=="number"&&ta.set(g.bead_id,g.added_at);let Pr=p.attempts?Object.values(p.attempts):[],Ds=new Set;for(let g of Pr)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&Ds.add(g.resumed_from);let Ms=new Map;for(let g of Pr)Ms.set(g.bead_id,g.attempt_id);let Ps=new Map;for(let g of Pr)Ps.set(g.attempt_id,g);function Ns(g){let D=new Set,se=g;for(;se&&!D.has(se.attempt_id);){if(se.conflict_resolution===!0)return!0;D.add(se.attempt_id),se=typeof se.resumed_from=="string"&&se.resumed_from.length>0&&Ps.get(se.resumed_from)||null}return!1}let En=typeof p.declared_base=="string"?p.declared_base:null;function rd(g){let D=null;for(let se of Pr)!se||se.bead_id!==g||Ns(se)||(D===null||(typeof se.started_at=="number"?se.started_at:0)>=(typeof D.started_at=="number"?D.started_at:0))&&(D=se);return D&&typeof D.target_base=="string"?D.target_base:null}let ra=[],na=[],nd=g=>{let D=Ms.get(g.bead_id)!==g.attempt_id,se=ta.get(g.bead_id),Be=typeof se=="number"&&se>0&&typeof g.finished_at=="number"&&se>=g.finished_at;return!D&&!Be&&typeof g.dismissed_at!="number"},sa=g=>{let D=typeof g.session_id=="string"&&g.session_id.length>0,se=Ds.has(g.attempt_id);return{eligible:D&&!se,reason:D?se?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},jt=null;for(let g of Pr){let D=g.status==="paused"&&!Ds.has(g.attempt_id);if(g.status==="running"||D)na.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:b.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:D,conflict_resolution:Ns(g),base_exception:Vo(En,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:Jt(An,g.bead_id,{attempt_id:g.attempt_id}),usage:Pt(p.attempts||{},g.bead_id),current_child:ke(g.bead_id),...f(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&nd(g)){let se=sa(g);ra.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:b.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Jt(An,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:se.eligible,resume_reason:se.reason,conflict_resolution:Ns(g),base_exception:Vo(En,g.target_base),usage:Pt(p.attempts||{},g.bead_id),current_child:ke(g.bead_id),...f(g.bead_id)}),jt=g}}let Tn=[...ra,...na],oa=null;if(jt){let g=sa(jt),D=jt.cause_detail;oa={bead_id:jt.bead_id,repo:jt.repo||"",reason:jt.cause||jt.status,cause_detail:D&&typeof D.reason=="string"?{reason:D.reason,command:typeof D.command=="string"?D.command:null}:null,resume_attempt_id:jt.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:Jt(An,jt.bead_id,{attempt_id:jt.attempt_id})}}let aa=new Set(Tn.map(g=>g.bead_id)),Fs=Array.isArray(p.merge_queue)?p.merge_queue:[],ia=new Map,la=new Map,ca=new Map,da=new Map,ua=new Map;Fs.forEach((g,D)=>{g&&typeof g.bead_id=="string"&&(ia.set(g.bead_id,D+1),la.set(g.bead_id,g.resolution),ca.set(g.bead_id,g.continuation_action||null),da.set(g.bead_id,g.head_review||null),ua.set(g.bead_id,g.authority||null))});let pa=p.merge_queue_state||{active:null,failures:{}},sd=pa.failures||{},od=p.auto_merge_skips||{},fa=g=>{let D=od[g];if(!D)return null;let se=C[g],Be=se&&se.pr?se.pr.head_sha:null;return Be&&Be===D.head_sha?D.reason||"":null},Cn=new Map;for(let g of Tn)g.failed!==!0&&g.conflict_resolution&&(g.paused?Cn.has(g.bead_id)||Cn.set(g.bead_id,"paused"):Cn.set(g.bead_id,"running"));let _a=Tn.filter(g=>!g.paused&&g.failed!==!0).length,ma=(p.workspace_info||{}).slots,ga=typeof ma=="number"?ma:typeof p.slots=="number"?p.slots:Rs,ad=_a>ga,Rn=Ar(x),id=(Array.isArray(p.done)?p.done.slice():[]).filter(g=>Rn===void 0||typeof g.added_at!="number"||g.added_at>=Rn).sort((g,D)=>(D.added_at||0)-(g.added_at||0)),Zr=Os(id,"done"),ld=new Set((Array.isArray(p.done)?p.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),ha=[],cd=d?.()||"";for(let g of Y){let D=Cr(g.closed_at);if(typeof g.id!="string"||ld.has(g.id)||D===null||Rn!==void 0&&D<Rn||typeof g.comment_count!="number"||g.comment_count<=0)continue;let se=`${cd}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Be=N.get(se);Be===void 0&&r&&(N.set(se,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(pt=>{let Rt=Array.isArray(pt)&&pt.some(ft=>fs(typeof ft?.text=="string"?ft.text:"")?.lane==="session");N.set(se,Rt?"session":"not-session"),B()}).catch(()=>{N.set(se,"failed"),B()})),Be==="session"&&ha.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,done_at:D,created_at:g.created_at,updated_at:g.updated_at})}Zr.push(...ha),Zr.sort((g,D)=>(D.done_at||0)-(g.done_at||0));let In={};for(let g of nr)In[g]=0;let ba=!1,va=0,qs=0,ya=0;for(let g of Zr){let D=g.usage;if(D&&typeof D=="object"){let se=!1;for(let Be of nr)Number.isFinite(D[Be])&&(In[Be]+=D[Be],ba=!0,se=!0);se&&(qs+=1,Number.isFinite(D.total_cost_usd)&&(va+=D.total_cost_usd,ya+=1))}}qs>0&&ya===qs&&(In.total_cost_usd=va);let wa=Zr.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),dd=wa.length>0?yt(Qn(wa)):ba?zt(In):null,ud=p.lane_states&&typeof p.lane_states=="object"&&!Array.isArray(p.lane_states)?p.lane_states:{},pd=Array.isArray(p.serial_lanes)?p.serial_lanes:[],ka=g=>{if(u.some(Be=>Be.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let D=Pr.filter(Be=>Be&&Be.bead_id===g),se=D.length>0?D[D.length-1].status:null;return se==="failed"||se==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":se==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},$a=pd.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,D)=>{let se=ud[g.id]||{},Be=new Map((Array.isArray(se.corrections)?se.corrections:[]).filter(tt=>tt&&typeof tt.bead_id=="string"&&typeof tt.after=="string").map(tt=>[tt.bead_id,tt.after])),pt=Os(g.entries.filter(tt=>!aa.has(tt.bead_id)),g.id).map(tt=>Be.has(tt.id)?{...tt,badges:[`\u{1F517} ${Be.get(tt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...tt.badges]}:tt),Rt=Array.isArray(se.occupied_by)?se.occupied_by.filter(tt=>typeof tt=="string"):[],ft=Rt.map(tt=>({id:tt,title:b.get(tt)||tt,draggable:!1,lane:g.id,ghost:!0,badges:[ka(tt)]}));return{id:g.id,index:D+1,rows:[...ft,...pt],occupied:Rt.length>0,badge:Rt.length>0?ka(Rt[0]):"\uB300\uAE30",cycle:se.cycle===!0}}),fd=typeof p.serial_lane_count=="number"?p.serial_lane_count:$a.length;return{queue:p,idToTitle:b,candidates:ed,candidate_hidden:{blocked:Ls.hidden_blocked,spec:Ls.hidden_spec},running:Tn,live_count:_a,slots:ga,over_cap:ad,failure:oa,waiting:Os($e.filter(g=>!aa.has(g.bead_id)),"queue"),serial_lanes:$a,serial_lane_count:fd,pr_wait:u.map(g=>D_(g.bead_id,b.get(g.bead_id)||g.bead_id,C,fe[g.bead_id]||null,Pt(p.attempts||{},g.bead_id),Z[g.bead_id]||(X.has(g.bead_id)||re.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),Cn.get(g.bead_id)||null,g.external===!0,{position:ia.get(g.bead_id)||0,active:pa.active===g.bead_id,failure:sd[g.bead_id]||null,resolution:la.get(g.bead_id),continuation_action:ca.get(g.bead_id),head_review:da.get(g.bead_id)||null,authority:ua.get(g.bead_id)||null},g.wt_present!==!1,p.auto_merge===!0?fa(g.bead_id):null,Vo(En,rd(g.bead_id)),p.completion_status&&typeof p.completion_status=="object"&&!Array.isArray(p.completion_status)&&p.completion_status[g.bead_id]||null,p.discard_operations&&typeof p.discard_operations=="object"&&!Array.isArray(p.discard_operations)?p.discard_operations:{},Ps.get(Ms.get(g.bead_id)||"")?.worker_serial===!0,p.auto_merge===!0)).map(g=>({...g,...f(g.id)})),merge_queue_length:Fs.length,merge_queue_running:Fs.length>0,auto_excluded:u.map(g=>g.bead_id).filter(g=>fa(g)!==null),declared_base:En,done:Zr,token_total:dd,cleanup_failures:Ce,repo_operations:Array.isArray(p.repo_operations)?p.repo_operations:[]}}function st(p){let v=p.waiting.length>0?p.waiting[0].id:"\u2014",P=i`<button
      type="button"
      class="worker-play${p.queue.auto_advance?" is-active":""}"
    >
      ${p.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,Y=at(p),le=p.over_cap?i`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ze=i`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${p.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${p.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${L()} 완료 <b>${p.done.length}</b></span
      >`,ke=i`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${p.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${p.declared_base||"?"}</span
    >`,te=i`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Rs}
          step="1"
          .value=${String(p.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Lc},(ne,Fe)=>Fe+1).map(ne=>i`<option
                value=${String(ne)}
                ?selected=${p.serial_lane_count===ne}
              >
                ${ne}
              </option>`)}
        </select>
      </label>
      ${o?i`<button
            type="button"
            class="worker-analysis-btn"
            title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
          >
            ✳ 병렬성 분석
          </button>`:""} `,b=Vl({failure:p.failure}),G=Fl(p.repo_operations,p.cleanup_failures);return W?i`<div class="worker-ribbon">
          ${P} ${Y}
          <div class="worker-kpi worker-kpi--ribbon">${le}${ze}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${te}</div>
          <div class="worker-kpi">${ke}</div>
        </div>
        ${G}${w.template()}${b}`:i`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${P}${Y}${te}</div>
        <div class="worker-kpi">
          ${le}${ze}${ke}
          ${(Array.isArray(p.token_total)?p.token_total:p.token_total?[{label:p.token_total,tooltip:`${L()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(ne=>i`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${ne.tooltip}
                >${L()} 완료 · 누적 ${ne.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${v}</b></span
          >
        </div>
      </div>
      ${G}${w.template()}${b}`}function wt(p){if(p.running.length===0&&p.pr_wait.length===0)return"";let v=p.running.some(P=>!P.paused&&P.failed!==!0);return i`<section
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
          >${p.running.length+p.pr_wait.length}</span
        >
      </header>
      ${p.running.length>0?Fo(p.running,Date.now(),me):""}
      ${p.pr_wait.map(P=>Oo(P))}
    </section>`}function vt(p){let v=p.candidate_hidden;return i`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${q.show_blocked}
        />
        🔒 blocked${v.blocked>0?` ${v.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${h_.map(P=>i`<button
              type="button"
              class="worker-filter__chip${q.spec===P.value?" is-active":""}"
              data-spec=${P.value}
              aria-pressed=${q.spec===P.value?"true":"false"}
            >
              ${P.label}
            </button>`)}
        ${v.spec>0?i`<span class="worker-filter__hidden">숨김 ${v.spec}</span>`:""}
      </div>
    </div>`}function dt(){return i`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${S}
    >
      ${b_.map(p=>i`<option value=${p.value} ?selected=${S===p.value}>
            ${p.label}
          </option>`)}
    </select>`}function kt(){return i`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${x}
      >
        ${Xt.map(p=>i`<option value=${p.value} ?selected=${x===p.value}>
              ${p.label}
            </option>`)}
      </select>
    </div>`}function ot(p){let v=i`<span
      class="worker-lane__badge${p.occupied?" worker-lane__badge--held":""}"
      >${p.badge}</span
    >`,P=p.cycle?i`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Yt({id:`worker-pane-lane-${p.id}`,lane:p.id,title:`\uC9C1\uB82C ${p.index}`,items:p.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:v,controls:P})}function at(p){let v=p.queue.auto_merge===!0;if(p.merge_queue_running)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${v?" is-active":""}"
        title=${v?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${v?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${p.merge_queue_length}
      </button>`;if(v)return i`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let P=new Set(p.auto_excluded),Y=p.pr_wait.filter(le=>le.merge_action&&le.merge_enabled&&!P.has(le.id)).length;return i`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${Y>0?` ${Y}`:""}
    </button>`}function mt(p){let v=Yt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:p.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:dt(),controls:vt(p)});return W?i`<div class="worker-lanes worker-lanes--mobile">
        ${wt(p)}
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:A.queue,preview:Dc(p.waiting)})}
        ${p.serial_lanes.map(P=>ot(P))}
        ${v}
        ${Yt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:kt(),collapsible:!0,collapsed:A.done,preview:Array.isArray(p.token_total)?p.token_total.map(P=>P.label).join(" \xB7 "):p.token_total||Dc(p.done)})}
      </div>`:i`<div class="worker-lanes">
      ${v}
      <div class="worker-wait">
        ${Yt({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:p.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${p.serial_lanes.map(P=>ot(P))}
      </div>
      ${Yt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${p.slots}`,items:p.running,live:p.running.some(P=>!P.paused&&P.failed!==!0),body:Fo(p.running,Date.now(),me)})}
      ${Yt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:p.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Yt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${L()} ${p.done.length}`,items:p.done,empty:`${L()} \uC644\uB8CC \uC5C6\uC74C`,controls:kt()})}
    </div>`}function z(p){A={...A,[p]:!A[p]},S_(A),B()}function B(){let p=rt();je(st(p),Pe),je(mt(p),Ae)}function ge(){let p=document.querySelector(".app-header");if(!p)return;let v=()=>{let P=Math.round(p.getBoundingClientRect().height);ye.style.setProperty("--worker-ribbon-top",`${P}px`)};if(v(),typeof ResizeObserver=="function"){let P=new ResizeObserver(v);P.observe(p),ie.push(()=>P.disconnect())}else window.addEventListener("resize",v),ie.push(()=>window.removeEventListener("resize",v))}function pe(){if(typeof window.matchMedia!="function")return;let p=window.matchMedia($_);W=!!p.matches;let v=P=>{let Y=!!(P&&typeof P.matches=="boolean"?P.matches:p.matches);Y!==W&&(W=Y,B())};typeof p.addEventListener=="function"?(p.addEventListener("change",v),ie.push(()=>p.removeEventListener("change",v))):typeof p.addListener=="function"&&(p.addListener(v),ie.push(()=>p.removeListener(v)))}let we=null;function Oe(p){we=p.target instanceof Element?p.target:null}function Xe(p){let P=p.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!P)return;if(we&&P.contains(we)&&we.closest("input, button, a")){p.preventDefault();return}let Y=P.dataset.beadId||"",le=P.dataset.lane||"";$={bead_id:Y,from_lane:le};try{p.dataTransfer?.setData("text/plain",Y),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Ye(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;let P=v.dataset.lane||"";P!=="candidate"&&P!=="queue"&&!/^s[1-5]$/.test(P)||(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),v.classList.add("worker-pane--drag-over"))}function Ie(p){p.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function Qe(p,v){let P=F.find(ke=>ke.id===p);if(!P)return;let Y=F.filter(ke=>ke.id!==p),le=Y.length;if(v){let ke=v.dataset.beadId;if(ke===p)return;let te=Y.findIndex(b=>b.id===ke);te>=0&&(le=te)}let ze=Y.slice();ze.splice(le,0,P),E.applyReorder(p,ze,le)}function xe(p){let v=p.target?.closest?.(".worker-pane");if(!v)return;p.preventDefault(),v.classList.remove("worker-pane--drag-over");let P=v.dataset.lane||"",Y=$?.bead_id||p.dataTransfer?.getData("text/plain")||"",le=$?.from_lane||"";if($=null,!Y)return;let ze=p.target?.closest?.(".worker-mini, .worker-card"),ke=Array.from(v.querySelectorAll(".worker-mini, .worker-card")),te=ke.length;if(ze){let b=ke.indexOf(ze);b>=0&&(te=b)}if(te=Math.max(0,te-v.querySelectorAll(".worker-mini--ghost").length),v.classList.contains("worker-pane--collapsed")&&(te=O()),P==="candidate"){if(le==="candidate"){Qe(Y,ze);return}(le==="queue"||/^s[1-5]$/.test(le))&&Le(Y);return}if(P==="queue"||/^s[1-5]$/.test(P)){let b=P==="queue"?"parallel":P;le===P?_e(Y,b,te):I(Y,b,te)}}function _t(p){q=p,m_(p),B()}function Tt(p){S=p==="board"||p==="created"||p==="spec"?p:Is,y_(S),B()}function Bt(p){x=Mt(p)?p:It,k_(x),m?.(x),B()}function Ut(p){let v=p.target?.closest?.(".worker-serial-lane-count");if(v){let te=Number.parseInt(v.value,10);Number.isFinite(te)&&Ne(te).then(B);return}let P=p.target?.closest?.(".worker-filter__blocked");if(P){_t({...q,show_blocked:P.checked});return}let Y=p.target?.closest?.(".worker-done-range");if(Y){Bt(Y.value);return}let le=p.target?.closest?.(".worker-sort");if(le){Tt(le.value||Is);return}let ze=p.target?.closest?.(".worker-slots__input");if(!ze)return;let ke=Number.parseInt(ze.value,10);if(!Number.isFinite(ke)){B();return}Re(ke).then(B)}function dr(p){return p?{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,worktree:p.worktree||void 0,status:p.status||void 0,session_id:p.session_id||void 0}:{}}function gt(){let p=rt();return{operations:p.repo_operations,cleanup_failures:p.cleanup_failures,repo:d&&d()||""}}function $t(){me&&Se.close(),qe.hidden=!1,Te.hidden=!1,ce.open(gt()),B()}function er(p){let v=H(),P=v.attempts?v.attempts[p]:null;me=p,ce.close(),qe.hidden=!0,Te.hidden=!1,Se.open({attempt_id:p,meta:dr(P)}),B()}function ur(){if(ce.isOpen()&&ce.refresh(gt()),!me)return;let p=H(),v=p.attempts?p.attempts[me]:null;if(v){Se.updateMeta(dr(v));return}Se.close()}function Ot(p){let v=p.target;if(v?.closest?.(".worker-mini__serial, .worker-mini__grip")||v?.closest?.("#worker-parallel-analysis-dialog"))return;if(v?.closest?.(".worker-analysis-btn")){k?.open();return}if(v?.closest?.(".worker-repo-strip")||v?.closest?.(".worker-mini__timeline")){$t();return}let P=v?.closest?.(".worker-repo-op__session");if(P){let he=P.dataset.attemptId;he&&er(he);return}let Y=v?.closest?.(".worker-repo-op__resolve");if(Y){de(Y.dataset.operationId||"");return}let le=v?.closest?.(".worker-repo-op__dismiss");if(le){Me(le.dataset.operationId||"");return}let ze=v?.closest?.(".worker-cleanup__resume");if(ze){let he=ze.dataset.beadId;he&&ue(he);return}let ke=v?.closest?.(".worker-banner__resume");if(ke){let he=ke.dataset.attemptId;he&&M(he);return}let te=v?.closest?.(".worker-banner__discard");if(te){let he=te.dataset.confirmation==="merged"?"merged":"unmerged";ut(te.dataset.beadId||"",te.dataset.attemptId||null,he,te.dataset.operationId||null);return}let b=v?.closest?.(".worker-banner__dismiss");if(b){let he=b.dataset.attemptId;he&&R(he);return}if(v?.closest?.(".worker-play")){V(!H().auto_advance);return}let G=v?.closest?.(".worker-merge-all");if(G){G.classList.contains("worker-merge-all--stop")?H().auto_merge===!0?Ee(!1):lt():Ee(!0);return}let ne=v?.closest?.(".worker-pane__hd--toggle");if(ne){let he=ne.dataset.lane;(he==="queue"||he==="done")&&z(he);return}let Fe=v?.closest?.(".worker-card__place");if(Fe){let he=Fe.dataset.beadId;he&&!Fe.disabled&&I(he,"parallel",O());return}let et=v?.closest?.(".worker-filter__chip");if(et){let he=et.dataset.spec;(he==="all"||he==="with"||he==="without")&&_t({...q,spec:he});return}let He=v?.closest?.(".worker-mini__merge");if(He){let he=He.dataset.beadId||"";H().cleanup_failed?.[he]?ue(he):ee(he);return}let ve=v?.closest?.(".worker-mini__merge-cancel");if(ve){Ve(ve.dataset.beadId||"");return}let y=v?.closest?.(".worker-mini__discard");if(y){ut(y.dataset.beadId||"",y.dataset.attemptId||null,y.dataset.discardMode==="merged"?"merged":"unmerged",y.dataset.operationId||null);return}let f=v?.closest?.(".worker-mini__stale-continue");if(f){Ze("worker-stale-work-continue",f.dataset.beadId||"",f.dataset.actionId||"");return}let u=v?.closest?.(".worker-mini__stale-backup");if(u){Ze("worker-stale-work-backup-fresh",u.dataset.beadId||"",u.dataset.actionId||"");return}let C=v?.closest?.(".worker-mini__stale-recheck");if(C){Ze("worker-stale-work-recheck",C.dataset.beadId||"",C.dataset.actionId||"");return}let Z=v?.closest?.(".worker-mini__revise-fix");if(Z){T("worker-revise-fix",Z.dataset.beadId||"");return}let fe=v?.closest?.(".worker-mini__revise-approve");if(fe){T("worker-revise-approve",fe.dataset.beadId||"");return}if(v?.closest?.(".worker-mini__pr"))return;if(v?.closest?.(".rtile__discard")){let he=v?.closest?.(".rtile"),nt=he?.dataset?.beadId,Kr=he?.dataset?.attemptId;nt&&ut(nt,Kr||null,"unmerged",v?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(v?.closest?.(".rtile__dismiss")){let nt=v?.closest?.(".rtile")?.dataset?.attemptId;nt&&R(nt);return}if(v?.closest?.(".rtile__pause")){let nt=v?.closest?.(".rtile")?.dataset?.attemptId;nt&&j(nt);return}if(v?.closest?.(".rtile__resume")){let nt=v?.closest?.(".rtile")?.dataset?.attemptId;nt&&M(nt);return}if(v?.closest?.(".rtile__session")){let nt=v?.closest?.(".rtile")?.dataset?.attemptId;nt&&er(nt);return}if(v?.closest?.(".worker-drawer-overlay__backdrop")){ce.close(),Se.close();return}if(v?.closest?.(".worker-drawer-host"))return;let Ce=v?.closest?.(".rtile");if(Ce){if(v?.closest?.(".rtile__id")){let nt=Ce.dataset.beadId;nt&&Rr(nt).then(Kr=>{Kr?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let he=Ce.dataset.beadId;he&&l&&l(he);return}let $e=v?.closest?.(".worker-mini, .worker-card");if($e){let he=$e.dataset.beadId;if(v?.closest?.(".worker-mini__id, .worker-card__id")){he&&Rr(he).then(nt=>{nt?oe("\uBCF5\uC0AC\uB428","success",1200):oe("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}he&&l&&l(he)}}return e.addEventListener("pointerdown",Oe),e.addEventListener("dragstart",Xe),e.addEventListener("dragover",Ye),e.addEventListener("dragleave",Ie),e.addEventListener("drop",xe),e.addEventListener("click",Ot),e.addEventListener("change",Ut),pe(),ge(),h&&ie.push(h.subscribe(()=>{for(let[p,v]of N)v==="failed"&&N.delete(p);B()})),s&&ie.push(s.subscribe(()=>{B(),ur()})),B(),{load(){B()},destroy(){for(let p of ie.splice(0))try{p()}catch{}e.removeEventListener("pointerdown",Oe),e.removeEventListener("dragstart",Xe),e.removeEventListener("dragover",Ye),e.removeEventListener("dragleave",Ie),e.removeEventListener("drop",xe),e.removeEventListener("click",Ot),e.removeEventListener("change",Ut);try{Se.destroy()}catch{}Te.hidden=!0;try{k?.destroy()}catch{}je(i``,e)}}}function Ko(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Bc(e,t,r,n=async()=>{},s=async()=>{}){let o=it("views:workspace-picker"),a=null,c=!1,l=!1,d=!1;async function _(W){let re=W.target.value,Q=t.getState().workspace?.current?.path||"";if(re&&re!==Q){o("switching workspace to %s",re),c=!0,A();try{await r(re)}catch(ie){o("workspace switch failed: %o",ie)}finally{c=!1,A()}}}async function m(){let W=t.getState(),X=W.workspace?.current?.path||W.workspace?.available?.[0]?.path||"";if(!(!X||l)){o("git-pulling workspace %s",X),l=!0,A();try{await n(X)}catch(re){o("workspace git pull failed: %o",re)}finally{l=!1,A()}}}function h(W){let X=W.target;X&&e.contains(X)||F()}function E(W){W.key==="Escape"&&F()}function $(){d||(d=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",E),A())}function F(){d&&(d=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),A())}function q(){d?F():$()}async function S(W){let X=W.target,re=X.value,be=X.checked;o("toggling visibility %s \u2192 %s",re,String(be));try{await s(re,be)}catch(Q){o("workspace visibility toggle failed: %o",Q)}}function x(W){return W?i`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${m}
        ?disabled=${c||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:i``}function N(W,X){return i`
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
                ${W.map(re=>i`
                    <label
                      class="workspace-picker__manage-row"
                      title="${re.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${re.path}"
                        .checked=${!X.has(re.path)}
                        @change=${S}
                      />
                      <span class="workspace-picker__manage-name"
                        >${Ko(re.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function L(){let W=t.getState(),X=W.workspace?.current,re=W.workspace?.available||[],be=new Set(W.workspace?.hidden||[]),Q=X?.path||re[0]?.path||"";if(re.length===0)return i``;let ie=re.filter(ye=>!be.has(ye.path)||ye.path===Q);if(ie.length<=1){let ye=ie[0]||re[0],Pe=Ko(ye.path);return i`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ye.path}"
            >${Pe}</span
          >
          ${N(re,be)}
          ${x(Q)}
          ${l?i`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return i`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${_}
          ?disabled=${c||l}
          aria-label="Select project workspace"
        >
          ${ie.map(ye=>i`
              <option
                value="${ye.path}"
                ?selected=${ye.path===Q}
                title="${ye.path}"
              >
                ${Ko(ye.path)}
              </option>
            `)}
        </select>
        ${N(re,be)}
        ${x(Q)}
        ${c||l?i`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function A(){je(L(),e)}return A(),a=t.subscribe(()=>A()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",E),je(i``,e)}}}var Uc=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function Zo(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function jc(e,t,r=Zo()){return{id:r,type:e,payload:t}}function Wc(e={}){let t=it("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,c=null,l=!0,d=new Map,_=[],m=new Map,h=new Set;function E(L){for(let A of Array.from(h))try{A(L)}catch{}}function $(){if(!l||c)return;o="reconnecting",t("ws reconnecting\u2026"),E(o);let L=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),A=(r.jitterRatio||0)*L,W=Math.max(0,Math.round(L+(Math.random()*2-1)*A));t("ws retry in %d ms (attempt %d)",W,a+1),c=setTimeout(()=>{c=null,N()},W)}function F(L){try{s?.send(JSON.stringify(L))}catch(A){t("ws send failed",A)}}function q(){for(o="open",t("ws open"),E(o),a=0;_.length;){let L=_.shift();L&&F(L)}}function S(L){let A;try{A=JSON.parse(String(L.data))}catch{t("ws received non-JSON message");return}if(!A||typeof A.id!="string"||typeof A.type!="string"){t("ws received invalid envelope");return}if(d.has(A.id)){let X=d.get(A.id);d.delete(A.id),A.ok?X?.resolve(A.payload):X?.reject(A.error||new Error("ws error"));return}let W=m.get(A.type);if(W&&W.size>0)for(let X of Array.from(W))try{X(A.payload)}catch(re){t("ws event handler error",re)}else t("ws received unhandled message type: %s",A.type)}function x(){o="closed",t("ws closed"),E(o);for(let[L,A]of d.entries())A.reject(new Error("ws disconnected")),d.delete(L);a+=1,$()}function N(){if(!l)return;let L=n();try{s=new WebSocket(L),t("ws connecting %s",L),o="connecting",E(o),s.addEventListener("open",q),s.addEventListener("message",S),s.addEventListener("error",()=>{}),s.addEventListener("close",x)}catch(A){t("ws connect failed %o",A),$()}}return N(),{send(L,A){if(!Uc.includes(L))return Promise.reject(new Error(`unknown message type: ${L}`));let W=Zo(),X=jc(L,A,W);return t("send %s id=%s",L,W),new Promise((re,be)=>{d.set(W,{resolve:re,reject:be,type:L}),s&&s.readyState===s.OPEN?F(X):(t("queue %s id=%s (state=%s)",L,W,o),_.push(X))})},on(L,A){m.has(L)||m.set(L,new Set);let W=m.get(L);return W?.add(A),()=>{W?.delete(A)}},onConnection(L){return h.add(L),()=>{h.delete(L)}},reconnect(){l=!0,c&&(clearTimeout(c),c=null),a=0,N()},close(){l=!1,c&&(clearTimeout(c),c=null);try{s?.close()}catch{}},getState(){return o}}}function M_(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function P_(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var Xo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],zc=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:closed","closed-issues"]],vr="tab:worker:closed",N_="bdui.worker.done-range",Hc=cc,Gc="worker:queue",Vc="worker:parallel-analysis",Yc="ui:order",Kc="ui:display-policy",Zc="exec:presets",yr="tab:board:closed",Xc="beads-ui.board.closed-range";function F_(e){let t=it("main");t("bootstrap start");let r=i`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;je(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),c=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&kc(s),o&&a&&c&&l){let Ae=function(f,u){let C="Request failed",Z="";if(f&&typeof f=="object"){let Ce=f;if(typeof Ce.message=="string"&&Ce.message.length>0&&(C=Ce.message),typeof Ce.details=="string")Z=Ce.details;else if(Ce.details&&typeof Ce.details=="object")try{Z=JSON.stringify(Ce.details,null,2)}catch{Z=""}}else typeof f=="string"&&f.length>0&&(C=f);let fe=u&&u.length>0?`Failed to load ${u}`:"Request failed";qe.open(fe,C,Z)},Ee=function(f){return`${Y.getState().workspace.current?.path||""}\0${f}`},Ve=function(){Le&&(Le().catch(()=>{}),Le=null),j=null,M=null},ut=function(f){R=f;let u=()=>{R!==f||Y.getState().selected_id!==f||(R=null,lt(f))};if(!ue){ee.then(u);return}u()},de=function(f,u,C,Z,fe){return C!==V[u]?(fe().catch(()=>{}),!1):(f.set(Z,fe),!0)},Re=function(){let f=Y.getState();vt(f.view==="board"),z(f.view==="worker"),Oe(f.view==="monitor"),ge(f.view==="board"||f.view==="worker"||Me||!!f.selected_id)},st=function(){let f=Ar(Ne);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},wt=function(){let f=Ar(rt);return f===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:f}}},vt=function(f){if(f)for(let[u,C]of Xo){if(Ze.has(u)||T.has(u))continue;let Z=u===yr?st():{type:C};try{w.register(u,Z)}catch($e){t("register %s store failed: %o",u,$e)}T.add(u);let fe=V.board,Ce=!1;ce.subscribeList(u,Z).then($e=>{Ce=!de(Ze,"board",fe,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Ae($e,"board")}).finally(()=>{T.delete(u),Ce&&Re()})}else ot()},ot=function(){V.board+=1;for(let[f]of Xo){let u=Ze.get(f);u&&(u().catch(()=>{}),Ze.delete(f));try{w.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},z=function(f){if(!f){B();return}for(let[u,C]of zc){if(at.has(u)||T.has(u))continue;let Z=u===vr?wt():{type:C};try{w.register(u,Z)}catch($e){t("register %s store failed: %o",u,$e)}T.add(u);let fe=V.worker,Ce=!1;ce.subscribeList(u,Z).then($e=>{Ce=!de(at,"worker",fe,u,$e)}).catch($e=>{t("subscribe %s failed: %o",u,$e),Ae($e,"worker")}).finally(()=>{T.delete(u),Ce&&Re()})}},B=function(){V.worker+=1;for(let[f]of zc){let u=at.get(f);u&&(u().catch(()=>{}),at.delete(f));try{w.unregister(f)}catch(C){t("unregister %s failed: %o",f,C)}}},ge=function(f){if(!f){pe();return}mt||(Se("subscribe-worker-queue",{id:Gc}).catch(u=>{t("subscribe-worker-queue failed: %o",u)}),Se("subscribe-worker-parallel-analysis",{id:Vc}).catch(u=>{t("subscribe-worker-parallel-analysis failed: %o",u)}),mt=()=>(Se("unsubscribe-worker-parallel-analysis",{id:Vc}),Se("unsubscribe-worker-queue",{id:Gc})))},pe=function(){mt&&(mt().catch(()=>{}),mt=null),H.clear()},Oe=function(f){if(!f){Xe();return}we||(Se("subscribe-monitor-pipeline",{id:Hc}).catch(u=>{t("subscribe-monitor-pipeline failed: %o",u)}),we=()=>Se("unsubscribe-monitor-pipeline",{id:Hc}))},Xe=function(){we&&(we().catch(()=>{}),we=null)},Ie=function(){Ye||(Se("subscribe-ui-order",{id:Yc}).catch(f=>{t("subscribe-ui-order failed: %o",f)}),Ye=()=>Se("unsubscribe-ui-order",{id:Yc}))},Qe=function(){Ye&&(Ye().catch(()=>{}),Ye=null),K.clear()},_t=function(){xe||(Se("subscribe-display-policy",{id:Kc}).catch(f=>{t("subscribe-display-policy failed: %o",f)}),xe=()=>Se("unsubscribe-display-policy",{id:Kc}))},Tt=function(){xe&&(xe().catch(()=>{}),xe=null),O.clear()},Ut=function(){Bt||(Se("subscribe-impl-presets",{id:Zc}).catch(f=>{t("subscribe-impl-presets failed: %o",f)}),Bt=()=>Se("unsubscribe-impl-presets",{id:Zc}))},Ot=function(f){if(!f)return"Unknown";let u=f.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"};var d=Ae,_=Ee,m=Ve,h=ut,E=de,$=Re,F=st,q=wt,S=vt,x=ot,N=z,L=B,A=ge,W=pe,X=Oe,re=Xe,be=Ie,Q=Qe,ie=_t,ye=Tt,Pe=Ut,Te=Ot;let De=document.getElementById("header-loading"),We=li(De),qe=Nl(e),me=Wc(),Se=We.wrapSend((f,u)=>me.send(f,u)),ce=ei(Se),w=ti(),k=si(),H=ni(),U=qa(),K=ri(),O=Na(),I=Fa(),_e=Ba();me.on("impl-presets-snapshot",f=>{let u=f;u&&typeof u.revision=="number"&&Array.isArray(u.presets)&&I.set({revision:u.revision,presets:u.presets})}),me.on("monitor-pipeline-snapshot",f=>{let u=f;if(!(!u||!Array.isArray(u.workspaces)))try{U.set(u.workspaces,u.workspaces_state)}catch{}}),me.on("ui-order-snapshot",f=>{let u=f;if(u&&typeof u.revision=="number")try{K.set({revision:u.revision,order:u.order&&typeof u.order=="object"?u.order:{}})}catch{}}),me.on("display-policy-snapshot",f=>{let u=f;if(u&&u.policy&&typeof u.policy=="object")try{O.set(u.policy)}catch{}}),me.on("session-log-snapshot",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{_e.set(u.attempt_id,Array.isArray(u.lines)?u.lines:[],typeof u.last_event_at=="number"?u.last_event_at:null)}catch{}}),me.on("session-log-append",f=>{let u=f;if(u&&typeof u.attempt_id=="string")try{_e.append(u.attempt_id,u.event)}catch{}}),me.on("snapshot",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Z=C?w.getStore(C):null;if(Z&&u&&u.type==="snapshot")try{Z.applyPush(u)}catch{}}),me.on("upsert",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Z=C?w.getStore(C):null;if(Z&&u&&u.type==="upsert")try{Z.applyPush(u)}catch{}}),me.on("delete",f=>{let u=f,C=u&&typeof u.id=="string"?u.id:"",Z=C?w.getStore(C):null;if(Z&&u&&u.type==="delete")try{Z.applyPush(u)}catch{}});let Le=null,j=null,M=null,R=null,J=()=>{},ee=new Promise(f=>{J=()=>f(void 0)}),ue=!1,ae=!1;async function lt(f){let u=Ee(f);if(u===j||u===M)return;M=u;let C=`detail:${f}`,Z={type:"issue-detail",params:{id:f}};try{w.register(C,Z)}catch(fe){t("register detail store failed: %o",fe)}try{let fe=await ce.subscribeList(C,Z);if(Y.getState().selected_id!==f||Ee(f)!==u){await fe().catch(()=>{});return}Le&&await Le().catch(()=>{}),Le=fe,j=u}catch(fe){t("detail subscribe failed: %o",fe),Ae(fe,"issue details")}finally{M===u&&(M=null)}}let Ze=new Map,T=new Set,V={board:0,worker:0},Me=!1,Ne=It;try{let f=window.localStorage.getItem(Xc);Mt(f)&&(Ne=f)}catch{}let rt=It;try{let f=window.localStorage.getItem(N_);Mt(f)&&(rt=f)}catch{}async function dt(f){if(!Mt(f)||f===Ne)return;Ne=f;try{window.localStorage.setItem(Xc,f)}catch{}let u=Ze.get(yr);if(!u)return;Ze.delete(yr),await u().catch(()=>{});let C=st();try{w.register(yr,C)}catch(Z){t("register %s store failed: %o",yr,Z)}try{let Z=await ce.subscribeList(yr,C);Ze.set(yr,Z)}catch(Z){t("re-subscribe %s failed: %o",yr,Z),Ae(Z,"board")}}async function kt(f){if(!Mt(f)||f===rt)return;rt=f;let u=at.get(vr);if(!u)return;at.delete(vr),await u().catch(()=>{});let C=wt();try{w.register(vr,C)}catch(Z){t("register %s store failed: %o",vr,Z)}try{let Z=await ce.subscribeList(vr,C);at.set(vr,Z)}catch(Z){t("re-subscribe %s failed: %o",vr,Z),Ae(Z,"worker")}}let at=new Map,mt=null,we=null,Ye=null,xe=null,Bt=null;async function dr(){xe=null,O.clear(),Bt=null,I.clear(),mt=null,we=null,Ze.clear(),at.clear(),V.board+=1,V.worker+=1,Ut();let f=Y.getState().workspace.current?.path;if(f)try{await me.send("set-workspace",{path:f})}catch(C){t("workspace restore after reconnect failed: %o",C);return}_t();let u=Y.getState();vt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ge(u.view==="board"||u.view==="worker"||!!u.selected_id)}async function gt(){t("clearing all subscriptions for workspace switch"),ot(),B(),pe(),k.clear(),Qe(),Ie(),Tt(),_t(),Ve();let f=Y.getState();if(f.selected_id)try{w.unregister(`detail:${f.selected_id}`)}catch{}let u=Y.getState();vt(u.view==="board"),z(u.view==="worker"),Oe(u.view==="monitor"),ge(u.view==="board"||u.view==="worker"||!!u.selected_id),u.selected_id&&ut(u.selected_id)}async function $t(f){t("requesting workspace switch to %s",f),ae=!0;try{let u=await me.send("set-workspace",{path:f});t("workspace switch result: %o",u),u&&u.workspace&&(Y.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",f),u.changed&&(await gt(),oe("Switched to "+Ot(f),"success",2e3)))}catch(u){throw t("workspace switch failed: %o",u),oe("Failed to switch workspace","error",3e3),u}finally{ae=!1}}async function er(f){t("requesting workspace git pull for %s",f);try{let u=await me.send("git-pull-workspace",{});t("workspace git pull result: %o",u);let C=u?.status;if(C==="up_to_date"){oe("Already up to date","success",2e3);return}if(C==="stash_pop_conflict"){oe("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}oe("Git pulled "+Ot(f),"success",2e3)}catch(u){t("workspace git pull failed: %o",u);let C=u?.code,Z=u?.message;if(C==="rebase_conflict"){oe("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(C==="rebase_conflict_abort_failed"){oe("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(C==="busy"){oe("Git pull skipped: another operation is running","warning",3e3);return}let fe=Z?`: ${Z}`:"";throw oe(`Git pull failed${fe}`,"error",3e3),u}}async function ur(f,u){t("setting workspace visibility %s \u2192 %s",f,String(u));try{await me.send("set-workspace-visibility",{path:f,visible:u}),await p()}catch(C){t("workspace visibility update failed: %o",C),oe("Failed to update project visibility","error",3e3)}}async function p(){try{let f=await me.send("list-workspaces",{});if(t("workspaces loaded: %o",f),f&&Array.isArray(f.workspaces)){let u=f.workspaces.map(Ce=>({path:Ce.path,database:Ce.database,pid:Ce.pid,version:Ce.version})),C=f.current?{path:f.current.root_dir,database:f.current.db_path}:null,Z=Array.isArray(f.hidden)?f.hidden.filter(Ce=>typeof Ce=="string"):[];Y.setState({workspace:{current:C,available:u,hidden:Z}});let fe=window.localStorage.getItem("beads-ui.workspace");fe&&(!u.some($e=>$e.path===fe)||Z.includes(fe)?window.localStorage.removeItem("beads-ui.workspace"):C&&fe!==C.path&&(t("restoring saved workspace preference: %s",fe),await $t(fe)))}}catch(f){t("failed to load workspaces: %o",f)}}me.on("workspace-changed",f=>{t("workspace-changed event: %o",f),f&&f.root_dir&&(Y.setState({workspace:{current:{path:f.root_dir,database:f.db_path}}}),p(),gt())});let v=!1;if(typeof me.onConnection=="function"){let f=u=>{t("ws state %s",u),u==="reconnecting"||u==="closed"?(v=!0,oe("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&v&&(v=!1,oe("Reconnected","success",2200),P_(Y,(C,Z)=>{t(`${C}: %o`,Z)}),dr())};me.onConnection(f)}let P="board";try{let f=window.localStorage.getItem("beads-ui.view");(f==="board"||f==="worker"||f==="monitor")&&(P=f)}catch(f){t("view parse error: %o",f)}let Y=ii({config:M_(),view:P});me.on("worker-queue-snapshot",f=>{let u=f;if(!u||!u.queue)return;let C=Y.getState().workspace.current?.path;if(typeof C=="string"&&C.length>0&&u.root_dir!==C){t("dropping worker-queue snapshot for %s",String(u.root_dir));return}try{k.set(u.queue)}catch{}}),me.on("worker-parallel-analysis-snapshot",f=>{let u=f;if(!u)return;let C=Y.getState().workspace.current?.path;if(!(typeof C=="string"&&C.length>0&&typeof u.root_dir=="string"&&u.root_dir!==C))try{H.set({settings:u.settings,job:u.job??null,last_good:u.last_good??null})}catch{}});let le=oi(Y);le.start();let ze=new Set(["get-comments","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),ke=async(f,u)=>{try{return await Se(f,u)}catch(C){if(ze.has(f))throw C;return[]}};n&&uc(n,Y,le);let te=document.getElementById("workspace-picker");te&&Bc(te,Y,$t,er,ur);let b=mc(e,(f,u)=>Se(f,u));try{let f=document.getElementById("new-issue-btn");f&&f.addEventListener("click",()=>b.open())}catch{}let G=vc(e,{policyStore:O,queueStore:k,implPresetStore:I,transport:(f,u)=>Se(f,u),onOpenChange:f=>{Me=f,Re()},labelOptions:()=>{let f=new Set;for(let[u]of Xo)for(let C of w.snapshotFor(u)||[]){let Z=C.labels;if(Array.isArray(Z))for(let fe of Z)typeof fe=="string"&&fe.length>0&&f.add(fe)}return Array.from(f).sort()}});try{let f=document.getElementById("display-settings-btn");f&&(f.setAttribute("aria-label","\uC124\uC815"),f.setAttribute("title","\uC124\uC815"),f.addEventListener("click",()=>G.open()))}catch{}let ne=bi(o,{gotoIssue:f=>le.gotoIssue(f),issueStores:w,transport:ke,workerQueueStore:k,uiOrderStore:K,displayPolicyStore:O,closedRange:Ne,onClosedRangeChange:f=>{dt(f)},onNewIssue:()=>b.open()}),Fe=Yo(a,{transport:ke,issueStores:w,queueStore:k,analysisStore:H,sessionLogStore:_e,uiOrderStore:K,gotoIssue:f=>Y.setState({selected_id:f}),getWorkspacePath:()=>Y.getState().workspace.current?.path,doneRange:rt,onDoneRangeChange:f=>{kt(f)}}),et=dc(c,{transport:ke,pipelineStore:U,execPresetStore:I,gotoIssue:f=>le.gotoIssue(f),getWorkspacePath:()=>Y.getState().workspace.current?.path,switchWorkspace:f=>$t(f)}),He=Pl(l,{issueStores:w,transport:ke,queueStore:k,execPresetStore:I,sessionLogStore:_e,getWorkspacePath:()=>Y.getState().workspace.current?.path,onNavigate:f=>{Y.getState().view==="worker"?Y.setState({selected_id:f}):le.gotoIssue(f)},onClose:()=>{let f=Y.getState();Y.setState({selected_id:null});try{le.gotoView(f.view==="worker"||f.view==="monitor"?f.view:"board")}catch{}},onOpenExecPresets:()=>{G.open("session")}}),ve=Y.getState().selected_id;ve&&(l.hidden=!1,He.load(ve),ut(ve)),Y.subscribe(f=>{let u=f.selected_id;u?(l.hidden=!1,He.load(u),ae||ut(u)):(He.clear(),l.hidden=!0,Ve())});let y=f=>{o.hidden=f.view!=="board",a.hidden=f.view!=="worker",c.hidden=f.view!=="monitor",vt(f.view==="board"),z(f.view==="worker"),Oe(f.view==="monitor"),ge(f.view==="board"||f.view==="worker"||Me||!!f.selected_id),!f.selected_id&&f.view==="board"&&ne.load(),f.view==="worker"&&Fe.load(),f.view==="monitor"?et.load():et.pause(),window.localStorage.setItem("beads-ui.view",f.view)};Y.subscribe(y),y(Y.getState()),Ie(),_t(),Ut(),p().finally(()=>{ue=!0,J()}),window.addEventListener("keydown",f=>{let u=f.ctrlKey||f.metaKey,C=String(f.key||"").toLowerCase(),Z=f.target,fe=Z&&Z.tagName?String(Z.tagName).toLowerCase():"",Ce=fe==="input"||fe==="textarea"||fe==="select"||Z&&typeof Z.isContentEditable=="boolean"&&Z.isContentEditable;u&&C==="n"&&(Ce||(f.preventDefault(),b.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&F_(t)});export{F_ as bootstrap,M_ as readBootstrapConfig,P_ as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
