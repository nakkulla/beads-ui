var Rl=Object.create;var Jn=Object.defineProperty;var Il=Object.getOwnPropertyDescriptor;var Ll=Object.getOwnPropertyNames;var Dl=Object.getPrototypeOf,Ol=Object.prototype.hasOwnProperty;var Pl=(e,t,r)=>t in e?Jn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var es=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ml=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Ll(t))!Ol.call(e,s)&&s!==r&&Jn(e,s,{get:()=>t[s],enumerable:!(n=Il(t,s))||n.enumerable});return e};var Nl=(e,t,r)=>(r=e!=null?Rl(Dl(e)):{},Ml(t||!e||!e.__esModule?Jn(r,"default",{value:e,enumerable:!0}):r,e));var We=(e,t,r)=>Pl(e,typeof t!="symbol"?t+"":t,r);var Fo=es((Jp,No)=>{var xr=1e3,Sr=xr*60,Ar=Sr*60,fr=Ar*24,jl=fr*7,zl=fr*365.25;No.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return Hl(e);if(r==="number"&&isFinite(e))return t.long?Gl(e):Wl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function Hl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*zl;case"weeks":case"week":case"w":return r*jl;case"days":case"day":case"d":return r*fr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ar;case"minutes":case"minute":case"mins":case"min":case"m":return r*Sr;case"seconds":case"second":case"secs":case"sec":case"s":return r*xr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Wl(e){var t=Math.abs(e);return t>=fr?Math.round(e/fr)+"d":t>=Ar?Math.round(e/Ar)+"h":t>=Sr?Math.round(e/Sr)+"m":t>=xr?Math.round(e/xr)+"s":e+"ms"}function Gl(e){var t=Math.abs(e);return t>=fr?gn(e,t,fr,"day"):t>=Ar?gn(e,t,Ar,"hour"):t>=Sr?gn(e,t,Sr,"minute"):t>=xr?gn(e,t,xr,"second"):e+" ms"}function gn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Bo=es((ef,qo)=>{function Yl(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Fo(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,T,S;function E(...B){if(!E.enabled)return;let w=E,P=Number(new Date),X=P-(f||P);w.diff=X,w.prev=f,w.curr=P,f=P,B[0]=r.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let D=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(A,M)=>{if(A==="%%")return"%";D++;let N=r.formatters[M];if(typeof N=="function"){let le=B[D];A=N.call(w,le),B.splice(D,1),D--}return A}),r.formatArgs.call(w,B),(w.log||r.log).apply(w,B)}return E.namespace=p,E.useColors=r.useColors(),E.color=r.selectColor(p),E.extend=n,E.destroy=r.destroy,Object.defineProperty(E,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(T!==r.namespaces&&(T=r.namespaces,S=r.enabled(p)),S),set:B=>{h=B}}),typeof r.init=="function"&&r.init(E),E}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,T=0,S=-1,E=0;for(;h<p.length;)if(T<f.length&&(f[T]===p[h]||f[T]==="*"))f[T]==="*"?(S=T,E=h,T++):(h++,T++);else if(S!==-1)T=S+1,E++,h=E;else return!1;for(;T<f.length&&f[T]==="*";)T++;return T===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}qo.exports=Yl});var Uo=es((At,hn)=>{At.formatArgs=Kl;At.save=Zl;At.load=Xl;At.useColors=Vl;At.storage=Ql();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Kl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+hn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function Zl(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Xl(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Ql(){try{return localStorage}catch{}}hn.exports=Bo()(At);var{formatters:Jl}=hn.exports;Jl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Nr=globalThis,mn=Nr.trustedTypes,$o=mn?mn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Co="$lit$",er=`lit$${Math.random().toFixed(9).slice(2)}$`,Ro="?"+er,Fl=`<${Ro}>`,ur=document,Fr=()=>ur.createComment(""),qr=e=>e===null||typeof e!="object"&&typeof e!="function",is=Array.isArray,ql=e=>is(e)||typeof e?.[Symbol.iterator]=="function",ts=`[ 	
\f\r]`,Mr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xo=/-->/g,So=/>/g,cr=RegExp(`>|${ts}(?:([^\\s"'>=/]+)(${ts}*=${ts}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ao=/'/g,To=/"/g,Io=/^(?:script|style|textarea|title)$/i,ls=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=ls(1),Wt=ls(2),Gp=ls(3),pr=Symbol.for("lit-noChange"),rt=Symbol.for("lit-nothing"),Eo=new WeakMap,dr=ur.createTreeWalker(ur,129);function Lo(e,t){if(!is(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return $o!==void 0?$o.createHTML(t):t}var Bl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Mr;for(let i=0;i<r;i++){let l=e[i],u,p,f=-1,h=0;for(;h<l.length&&(a.lastIndex=h,p=a.exec(l),p!==null);)h=a.lastIndex,a===Mr?p[1]==="!--"?a=xo:p[1]!==void 0?a=So:p[2]!==void 0?(Io.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=cr):p[3]!==void 0&&(a=cr):a===cr?p[0]===">"?(a=s??Mr,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?cr:p[3]==='"'?To:Ao):a===To||a===Ao?a=cr:a===xo||a===So?a=Mr:(a=cr,s=void 0);let T=a===cr&&e[i+1].startsWith("/>")?" ":"";o+=a===Mr?l+Fl:f>=0?(n.push(u),l.slice(0,f)+Co+l.slice(f)+er+T):l+er+(f===-2?i:T)}return[Lo(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Br=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,p]=Bl(t,r);if(this.el=e.createElement(u,n),dr.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=dr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(Co)){let h=p[a++],T=s.getAttribute(f).split(er),S=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:S[2],strings:T,ctor:S[1]==="."?ns:S[1]==="?"?ss:S[1]==="@"?os:wr}),s.removeAttribute(f)}else f.startsWith(er)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(Io.test(s.tagName)){let f=s.textContent.split(er),h=f.length-1;if(h>0){s.textContent=mn?mn.emptyScript:"";for(let T=0;T<h;T++)s.append(f[T],Fr()),dr.nextNode(),l.push({type:2,index:++o});s.append(f[h],Fr())}}}else if(s.nodeType===8)if(s.data===Ro)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(er,f+1))!==-1;)l.push({type:7,index:o}),f+=er.length-1}o++}}static createElement(t,r){let n=ur.createElement("template");return n.innerHTML=t,n}};function kr(e,t,r=e,n){if(t===pr)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=qr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=kr(e,s._$AS(e,t.values),s,n)),t}var rs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??ur).importNode(r,!0);dr.currentNode=s;let o=dr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Ur(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new as(o,this,t)),this._$AV.push(u),l=n[++i]}a!==l?.index&&(o=dr.nextNode(),a++)}return dr.currentNode=ur,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},Ur=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=rt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=kr(this,t,r),qr(t)?t===rt||t==null||t===""?(this._$AH!==rt&&this._$AR(),this._$AH=rt):t!==this._$AH&&t!==pr&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ql(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==rt&&qr(this._$AH)?this._$AA.nextSibling.data=t:this.T(ur.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Br.createElement(Lo(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new rs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Eo.get(t.strings);return r===void 0&&Eo.set(t.strings,r=new Br(t)),r}k(t){is(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Fr()),this.O(Fr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},wr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=rt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=rt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=kr(this,t,r,0),a=!qr(t)||t!==this._$AH&&t!==pr,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=kr(this,i[n+l],r,l),u===pr&&(u=this._$AH[l]),a||(a=!qr(u)||u!==this._$AH[l]),u===rt?t=rt:t!==rt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ns=class extends wr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===rt?void 0:t}},ss=class extends wr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==rt)}},os=class extends wr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=kr(this,t,r,0)??rt)===pr)return;let n=this._$AH,s=t===rt&&n!==rt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==rt&&(n===rt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},as=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){kr(this,t)}};var Ul=Nr.litHtmlPolyfillSupport;Ul?.(Br,Ur),(Nr.litHtmlVersions??(Nr.litHtmlVersions=[])).push("3.3.1");var Me=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new Ur(t.insertBefore(Fr(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Bt=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Gt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function $r(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Do(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Oo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Po(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Mo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var jo=Nl(Uo(),1);function Ze(e){return(0,jo.default)(`beads-ui:${e}`)}function Pt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function _r(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Wo(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Go(e,t){let r=Pt(e.updated_at),n=Pt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Yo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Pt(e.created_at),o=Pt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Vo(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var ec=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function zo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ho(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=ec.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Ko(e,t){let r=zo(e),n=zo(t);if(r!==n)return r<n?-1:1;let s=Ho(e),o=Ho(t);if(s!==o)return s<o?-1:1;let a=Pt(e&&e.created_at),i=Pt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var cs=2**20;function Tr(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Pt(e&&e.created_at)}function bn(e){return(t,r)=>{let n=Tr(t,e),s=Tr(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ds(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Tr(i,r)-cs};if(!i)return{rank:Tr(a,r)+cs};let l=Tr(a,r),u=Tr(i,r),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*cs}))}}function us(e,t={}){let r=Ze(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||_r;function u(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(h){if(i||!h||h.id!==e)return;let T=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,T),!(T<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(T<=o)return;n.clear();let S=Array.isArray(h.issues)?h.issues:[];for(let E of S)E&&typeof E.id=="string"&&E.id.length>0&&n.set(E.id,E);p(),o=T,u();return}if(h.type==="upsert"){let S=h.issue;if(S&&typeof S.id=="string"&&S.id.length>0){let E=n.get(S.id);if(!E)n.set(S.id,S);else{let B=Number.isFinite(E.updated_at)?E.updated_at:0,w=Number.isFinite(S.updated_at)?S.updated_at:0;if(B<=w){for(let P of Object.keys(E))P in S||delete E[P];for(let[P,X]of Object.entries(S))E[P]=X}}p()}o=T,u()}else if(h.type==="delete"){let S=String(h.issue_id||"");S&&(n.delete(S),p()),o=T,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function vn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Zo(e){let t=Ze("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let T of Array.from(u)){let S=r.get(T);if(!S)continue;let E=S.itemsById;for(let B of p)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of f)typeof B=="string"&&B.length>0&&E.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&E.delete(B)}}async function o(i,l){let u=vn(l);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==u){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let h=r.get(i)||null;if(h){let T=n.get(h.key);T&&(T.delete(i),T.size===0&&n.delete(h.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:vn,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=r.get(i);return u?u.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function Xo(){let e=Ze("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,p){let f=u?vn(u):"",h=r.get(l)||"",T=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,h),T&&h&&f&&h!==f){let S=t.get(l);if(S)try{S.dispose()}catch{}let E=s.get(l);if(E){try{E()}catch{}s.delete(l)}let B=us(l,p);t.set(l,B);let w=B.subscribe(()=>o());s.set(l,w)}else if(!T){let S=us(l,p);t.set(l,S);let E=S.subscribe(()=>o());s.set(l,E)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Qo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Jo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function ps(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function tc(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function rc(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function ea(e){let t=Ze("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):tc(n),a=rc(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ps(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ps(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var nc=Object.freeze({workspace_config:{default_workspace:null}});function ta(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:nc.workspace_config.default_workspace}}}function ra(e={}){let t=Ze("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:ta(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?ta(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function na(e){let t=Ze("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(f,h)=>{let T=s++,S=Date.now();n.set(T,{type:f,start_ts:S}),t("request start id=%d type=%s count=%d",T,f,r+1),a();let E=!1,B=()=>{E||(E=!0,n.delete(T),i())},w=setTimeout(()=>{E||(t("request TIMEOUT id=%d type=%s elapsed=%dms",T,f,Date.now()-S),B())},3e4);try{let P=await u(f,h),X=Date.now()-S;return t("request done id=%d type=%s elapsed=%dms",T,f,X),P}catch(P){let X=Date.now()-S;throw t("request error id=%d type=%s elapsed=%dms err=%o",T,f,X,P),P}finally{clearTimeout(w),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function J(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function yn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Vo),l;switch(i){case"created_desc":return l.sort(_r),l;case"created_asc":return l.sort(Wo),l;case"updated_desc":return l.sort(Go),l;case"priority":return l.sort(Yo),l;case"manual":default:{let u=r();return u?l.sort(bn(u)):l.sort(_r),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function vt(e){let t=jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Et(e,t){let r=jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function kn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function wn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(ds(i,l,u.order),a);s(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let T=n(ds(i,l,h.order),a);s(h,T);let S=await t("ui-order-set",{expected_revision:h.revision,entries:T});S&&S.applied&&r.set({revision:typeof S.revision=="number"?S.revision:0,order:S.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function $n(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function fs(e,t){return!t||typeof e!="string"||e.length===0||$n(t.visible_labels).includes(e)?!0:$n(t.hidden_labels).includes(e)?!1:!$n(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function xn(e,t){return $n(e).filter(r=>fs(r,t))}function tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var sc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},oa={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},sa={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},oc={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function ac(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function aa(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function ic(e){if(!e||e.fill==="none"||!e.approval_state)return aa(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function lc(e,t,r){let n=sc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=oc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${l}>
        ${oa[e]||e}
      </div>
    </div>
  `}function Sn(e,t){if(!e||!e.stages)return"";let r=sa[e.route]||sa.spec_backed,n=e.stages,s=ac(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${oa[a]||a} ${a==="plan"?ic(n[a]||{}):aa(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>lc(a,n[a]||{},a===s))}
    </div>
  `}function cc(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var ia=2;function dc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,ia).join(", "),s=r.length-ia,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function uc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&tr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${a?" is-derived":""}"
        title=${a?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${a?"unset":n.route}</span
      >`)}if(n.fast_track&&tr(r,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&tr(r,"pr")){let a=n.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${a!=null?` #${a}`:""}`}</span
      >`)}for(let a of xn(e.labels,r))s.push(c`<span class="ctl-chip ctl-chip--label">${a}</span>`);e.from_id&&tr(r,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${a=>{a.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(a,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),tr(r,"blocked")&&s.push(...dc(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&tr(r,"blocked")){let a=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,i=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),i){let l=i.malformed===!0||i.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(i.verdict||"\uD310\uC815 \uBD88\uAC00"),u=typeof i.evidence=="string"?i.evidence.trim().slice(0,96):"",p=typeof i.fix_bead_id=="string"&&i.fix_bead_id.length>0?` \xB7 fix ${i.fix_bead_id}`:"",f=u?` \xB7 ${u}`:"";s.push(c`<span
          class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnosis"
          title=${u}
          >AI ${l}${f}${p}</span
        >`)}s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${e.id}
        ?disabled=${a}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${l=>{t.onCleanupDiagnose&&t.onCleanupDiagnose(l,e.id)}}
      >
        AI 정리
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function pc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function fc(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function _c(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Ko):r.children;return c`
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
        ${fc(e)}
      </div>
      ${n>0&&r.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${r.current.title||r.current.id}</span
            >
          </div>`:""}
      ${s&&n>0?c`<div class="board-card__roll-list">
            ${o.map((a,i)=>c`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${l=>t.onChildClick&&t.onChildClick(l,a.id)}
                >
                  <span class=${pc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function An(e,t){let r=cc(e.priority);return c`
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
      ${uc(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?Sn(e.workflow,e.status):""}
      ${_c(e,t)}
    </article>
  `}function Er(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Bt.map(o=>c`<option
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
        ${e.items.map(o=>An(o,t))}
      </div>
    </section>
  `}function la(e,t,r){return c`
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
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>An(n,t))}
        </div>
      </div>
    </dialog>
  `}var mc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gc=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],hc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ca(e,t,r){return c`
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
        ${mc.map(n=>c`<option
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
        ${gc.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${bc(e,t,r)}
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
        ${hc.map(n=>c`<option
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
  `}var vc=200,yc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},kc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),da="beads-ui.board.sort",ua=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function wc(){try{let e=window.localStorage.getItem(da);if(e&&ua.has(e))return e}catch{}return"created_desc"}function pa(e,t){let r=Ze("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||It,h=s?yn(s,a):null,T=wn({transport:o,uiOrderStore:a}),S=[],E=[],B=[],w=[],P=[],X=[],D=!1,R=0,A=wc(),M=new Map,N=new Map,le=new Map,xe=new Set,me=new Set,_e={search:"",priority:"",type:"",labels:[]},Se=!1,Ne=null;function Ie(C){return String(C.status||"open")==="open"}function ze(C){let d=String(C.status||"open");return d==="open"||d==="blocked"}function De(C){let d=_e.search.trim().toLowerCase(),_=_e.priority,$=_e.type,L=_e.labels;return C.filter(ae=>{if(d){let ge=String(ae.id||"").toLowerCase(),oe=String(ae.title||"").toLowerCase();if(!ge.includes(d)&&!oe.includes(d))return!1}if(_!==""&&String(ae.priority)!==_||$!==""&&String(ae.issue_type||"")!==$)return!1;if(L.length>0){let ge=Array.isArray(ae.labels)?ae.labels:[];if(!L.some(oe=>ge.includes(oe)))return!1}return!0})}function te(){let C=new Set;for(let d of[S,E,B,w,P,X])for(let _ of d){let $=Array.isArray(_.labels)?_.labels:[];for(let L of $)typeof L=="string"&&L.length>0&&C.add(L)}return Array.from(C).sort()}function ce(){return _e.search.trim()!==""||_e.priority!==""||_e.type!==""||_e.labels.length>0}function be(){try{if(h){let C=h.selectBoardColumn("tab:board:in-progress","in_progress",A),d=h.selectBoardColumn("tab:board:blocked","blocked",A).filter(ze),_=new Set(C.map(fe=>fe.id)),$=h.selectBoardColumn("tab:board:ready","ready",A).filter(fe=>Ie(fe)&&!_.has(fe.id)),L=h.selectBoardColumn("tab:board:resolved","resolved",A),ae=h.selectBoardColumn("tab:board:deferred","deferred",A),ge=h.selectBoardColumn("tab:board:closed","closed").slice(0,vc),oe=[...d,...$,...C,...L,...ge];j(oe);let ke=new Set;for(let fe of oe)fe&&fe.id&&!_s(fe)&&ke.add(fe.id);let Ce=!ce();S=Ce?zr(d,ke):d,E=Ce?zr($,ke):$,B=Ce?zr(C,ke):C,w=Ce?zr(L,ke):L,P=ae,R=ae.length,X=Ce?zr(ge,ke):ge,M=new Map;for(let fe of S)M.set(fe.id,"open");for(let fe of E)M.set(fe.id,"open");for(let fe of B)M.set(fe.id,"in_progress");for(let fe of w)M.set(fe.id,"resolved");for(let fe of P)M.set(fe.id,"deferred");for(let fe of X)M.set(fe.id,"closed");N=new Map;for(let fe of S)N.set(fe.id,"blocked-col");for(let fe of E)N.set(fe.id,"ready-col");for(let fe of B)N.set(fe.id,"in-progress-col");for(let fe of w)N.set(fe.id,"resolved-col");for(let fe of X)N.set(fe.id,"closed-col")}Ge()}catch{S=[],E=[],B=[],w=[],P=[],X=[],le=new Map,Ge()}}function j(C){let d=new Map;for(let $ of C)$&&$.id&&!d.has($.id)&&d.set($.id,$);let _=new Map;for(let $ of d.values()){let L=_s($);if(!L)continue;let ae=_.get(L);ae||(ae=[],_.set(L,ae)),ae.push({id:$.id,title:$.title,status:$.status,metadata:$.metadata,created_at:$.created_at,updated_at:$.updated_at})}le=_}function re(C){let d=le.get(C)||[],_=0;for(let L of d)(L.status==="resolved"||L.status==="closed")&&(_+=1);let $=kn(d);return{total:d.length,count:_,current:$,children:d}}function de(C){return!xe.has(C)}function Ee(C,d){C.preventDefault(),C.stopPropagation(),xe.has(d)?xe.delete(d):xe.add(d),Ge()}function ue(C,d){C.preventDefault(),C.stopPropagation(),n(d)}function Ae(C,d){C.preventDefault(),C.stopPropagation(),n(d)}function z(C,d){Ne||n(d)}function O(C,d){C.preventDefault(),C.stopPropagation(),$c(d).then(_=>{_&&J("\uBCF5\uC0AC\uB428","success",1200)})}function se(C,d){Ne=d,C.dataTransfer&&(C.dataTransfer.setData("text/plain",d),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function ve(C){C.target.classList.remove("board-card--dragging"),kt(),setTimeout(()=>{Ne=null},0)}function Te(C){let d=String(C.target.value||"");!d||d===f||(f=d,u&&u(d),Ge())}function je(){return i?i.get():null}function we(C){let d=l?l.get():null,_=d?d.cleanup_failed:null;if(!_||typeof _!="object"||Array.isArray(_))return null;let $=_[C];return!$||typeof $!="object"||Array.isArray($)?null:$}function F(C,d){if(!C||typeof C!="object"||Array.isArray(C))return!1;let _=Object.values(C),$=new Set;for(let L of _)L&&typeof L=="object"&&typeof L.resumed_from=="string"&&L.resumed_from.length>0&&$.add(L.resumed_from);return _.some(L=>L&&typeof L=="object"&&L.bead_id===d&&L.cleanup_diagnosis===!0&&(L.status==="running"||L.status==="paused"&&!$.has(L.attempt_id)))}function G(C){let d=l?l.get():null;return me.has(C)||F(d?d.attempts:null,C)}function q(C){C&&C.queue&&l&&l.set(C.queue)}async function k(C,d){if(C.preventDefault(),C.stopPropagation(),!o||!l||!we(d)||me.has(d))return;me.add(d),Ge();let _;try{let $=l.get(),L=$&&typeof $.revision=="number"?$.revision:0;if(_=await o("worker-cleanup-diagnose",{bead_id:d,expected_revision:L}),q(_),_&&_.conflict){let ae=l.get(),ge=ae&&typeof ae.revision=="number"?ae.revision:0;_=await o("worker-cleanup-diagnose",{bead_id:d,expected_revision:ge}),q(_)}}finally{me.delete(d),Ge()}_&&!_.conflict&&_.ok===!1&&_.reason&&J(`AI \uC815\uB9AC \uAC70\uBD80: ${_.reason}`,"error",2400)}let H={onCardClick:z,onCopyId:O,onDragStart:se,onDragEnd:ve,onClosedRangeChange:Te,rollupFor:re,isExpanded:de,onRollupToggle:Ee,onChildClick:ue,onFromChipClick:Ae,cleanupFailureFor:we,isCleanupDiagnosisPending:G,onCleanupDiagnose:k,get policy(){return je()}};function U(C,d){Ne||(Pe(),n(d))}function V(C,d){C.preventDefault(),C.stopPropagation(),Pe(),n(d)}let ne={...H,onCardClick:U,onChildClick:V,onFromChipClick:V,get policy(){return je()}};function ye(C){let d=C.target,_=e.querySelector(".board-filter__labels");d&&_&&_.contains(d)||Ye()}function Oe(C){C.key==="Escape"&&Ye()}function Xe(){Se||(Se=!0,document.addEventListener("mousedown",ye),document.addEventListener("keydown",Oe),Ge())}function Ye(){Se&&(Se=!1,document.removeEventListener("mousedown",ye),document.removeEventListener("keydown",Oe),Ge())}function et(C){C.key==="Escape"&&Pe()}function Qe(){D||(D=!0,document.addEventListener("keydown",et),Ge())}function Pe(){D&&(D=!1,document.removeEventListener("keydown",et),Ge())}let yt={onClose:Pe,onOverlayClick(C){C.target===C.currentTarget&&Pe()}},ct={onSearchInput(C){_e.search=String(C.target.value||""),be()},onPriorityChange(C){_e.priority=String(C.target.value||""),be()},onTypeChange(C){_e.type=String(C.target.value||""),be()},onSortChange(C){let d=String(C.target.value||"");if(!(!ua.has(d)||d===A)){A=d;try{window.localStorage.setItem(da,d)}catch{}be()}},onDeferredToggle(){D?Pe():Qe()},onLabelMenuToggle(){Se?Ye():Xe()},onLabelToggle(C){let d=_e.labels.indexOf(C);d===-1?_e.labels.push(C):_e.labels.splice(d,1),be()},onLabelClear(){_e.labels.length!==0&&(_e.labels=[],be())},onNewIssue(){p&&p()}};function nt(){return c`
      <div class="board-view">
        ${ca(_e,ct,{sort_mode:A,deferred_popup_open:D,deferred_count:R,label_options:te(),label_menu_open:Se})}
        <div class="board-root">
          ${Er({title:"Blocked",id:"blocked-col",items:De(S)},H)}
          ${Er({title:"Ready",id:"ready-col",items:De(E)},H)}
          ${Er({title:"In progress",id:"in-progress-col",items:De(B)},H)}
          ${Er({title:"Resolved",id:"resolved-col",items:De(w)},H)}
          ${Er({title:"Closed",id:"closed-col",items:De(X),is_closed:!0,closed_range:f},H)}
        </div>
        ${D?la({items:De(P),count:R},ne,yt):""}
      </div>
    `}function Ge(){Me(nt(),e),gt()}function gt(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let d=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let _ of d)Array.from(_.querySelectorAll(".board-card")).forEach((L,ae)=>{L.tabIndex=ae===0?0:-1})}catch{}}async function dt(C,d){if(!o){J("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:d}),J("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(_){r("update-status failed: %o",_),J("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function st(C){switch(C){case"blocked-col":return S;case"ready-col":return E;case"in-progress-col":return B;case"resolved-col":return w;default:return[]}}function ot(C,d,_){if(!o||!a)return;let $=st(C),L=$.find(Ce=>Ce.id===d);if(!L)return;let ae=$.filter(Ce=>Ce.id!==d),ge=_.closest?_.closest(".board-card"):null,oe=ae.length;if(ge){let Ce=ge.getAttribute("data-issue-id");if(Ce===d)return;let fe=ae.findIndex(qe=>qe.id===Ce);fe>=0&&(oe=fe)}let ke=ae.slice();ke.splice(oe,0,L),T.applyReorder(d,ke,oe)}function kt(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let tt=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let _=C.target.closest(".board-column");_&&_!==tt&&(tt&&tt.classList.remove("board-column--drag-over"),_.classList.add("board-column--drag-over"),tt=_)}),e.addEventListener("dragleave",C=>{let d=C.relatedTarget;(!d||!e.contains(d))&&tt&&(tt.classList.remove("board-column--drag-over"),tt=null)}),e.addEventListener("drop",C=>{C.preventDefault(),tt&&(tt.classList.remove("board-column--drag-over"),tt=null);let d=C.target,_=d.closest(".board-column");if(!_)return;let $=C.dataTransfer?.getData("text/plain")||"";if(!$)return;let L=_.id,ae=N.get($);if(ae&&ae===L){if(kc.has(L)){if(A!=="manual"){J("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}ot(L,$,d)}return}let ge=yc[L];if(!ge){J("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}M.get($)!==ge&&dt($,ge)}),e.addEventListener("keydown",C=>{let d=C.target;if(!(d instanceof HTMLElement))return;let _=String(d.tagName||"").toLowerCase();if(_==="input"||_==="textarea"||_==="select"||_==="button"||_==="a"||d.isContentEditable===!0)return;let $=d.closest(".board-card");if(!$)return;let L=String(C.key||"");if(L==="Enter"||L===" "){C.preventDefault();let ke=$.getAttribute("data-issue-id");ke&&n(ke);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;C.preventDefault();let ae=$.closest(".board-column");if(!ae)return;let ge=Array.from(ae.querySelectorAll(".board-card")),oe=ge.indexOf($);if(L==="ArrowDown"&&oe<ge.length-1){ht($,ge[oe+1]);return}if(L==="ArrowUp"&&oe>0){ht($,ge[oe-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let ke=Array.from(e.querySelectorAll(".board-column")),Ce=ke.indexOf(ae),fe=L==="ArrowRight"?1:-1,qe=Ce+fe;for(;qe>=0&&qe<ke.length;){let Je=ke[qe].querySelector(".board-card");if(Je){ht($,Je);return}qe+=fe}}});function ht(C,d){try{C.tabIndex=-1,d.tabIndex=0,d.focus()}catch{}}let Ke=null;h&&h.subscribe&&(Ke=h.subscribe(()=>{try{be()}catch{}}));let ut=null;i&&i.subscribe&&(ut=i.subscribe(()=>{try{be()}catch{}}));let pt=null;return l&&l.subscribe&&(pt=l.subscribe(()=>{Ge()})),{async load(){r("load"),be()},clear(){Ye(),Pe(),Ke&&(Ke(),Ke=null),ut&&(ut(),ut=null),pt&&(pt(),pt=null),e.replaceChildren(),S=[],E=[],B=[],w=[],P=[],X=[],M=new Map,N=new Map}}}function _s(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function zr(e,t){return e.filter(r=>{let n=_s(r);return!(n&&t.has(n))})}async function $c(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function mr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ha="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function lt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Yt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Hr=[...Yt,"reasoning_output_tokens"],xc=["implementation","review-consult"];function ms(e){let t=0;for(let r of Yt)t+=lt(e?.[r]);return t}function Sc(e){return!e||typeof e!="object"?!1:Yt.some(t=>Number.isFinite(e[t]))}function fa(e){return!e||typeof e!="object"?!1:Hr.some(t=>Number.isFinite(e[t]))}function Ac(e){let t={};for(let r of Hr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function _a(e){let t={};for(let r of Hr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function ma(e,t){return e==="codex"?lt(t.input_tokens)+lt(t.output_tokens):ms(t)}function Tc(e){return e==="claude"?"Claude":"Codex"}function Ec(e){return`\u03C4 ${ba(e)}`}function Cc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${lt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${lt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${lt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ha),o.join(`
`)}function mt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Tc(r)} ${Ec(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Cc(r,n)})}return t}function En(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of Hr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=lt(i.breakdown[l])+lt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function gs(e){return!e||typeof e!="object"?null:Lt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Rc(e){return e==="codex"?"codex":"claude"}function nr(){return{subtotal:0,breakdown:Ac(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Tn(e,t,r){e.subtotal+=t.subtotal;for(let n of Hr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=lt(e.breakdown[n])+lt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function ga(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ba(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Cr(e){return Sc(e)?`\u03C4 ${ba(ms(e))}`:null}function Mt(e){let t=Cr(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Rr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${lt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${lt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${lt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${lt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ms(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ha),r.join(`
`)}function Lt(e,t){let r={claude:nr(),codex:nr()},n={orchestrator:{claude:nr(),codex:nr()},implementation:{claude:nr(),codex:nr()},"review-consult":{claude:nr(),codex:nr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(fa(l)){let p=Rc(i.runner),f=_a(l),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:ma(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Tn(r[p],h,!0),Tn(n.orchestrator[p],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!xc.includes(p.role)||!fa(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=_a(p.usage),T={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:ma("codex",h)};T.receipt_id=f,typeof p.model=="string"&&(T.model=p.model),typeof p.session_id=="string"?T.session_id=p.session_id:typeof p.thread_id=="string"&&(T.session_id=p.thread_id),typeof p.turn_id=="string"&&(T.turn_id=p.turn_id),typeof p.completed_at=="string"&&(T.completed_at=p.completed_at),h.replayed===!0&&(T.replayed=!0),Tn(r.codex,T,!1),Tn(n[T.role].codex,T,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let u=ga(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(l[u]={...ga(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Ta,setPrototypeOf:va,isFrozen:Ic,getPrototypeOf:Lc,getOwnPropertyDescriptor:Dc}=Object,{freeze:$t,seal:Dt,create:$s}=Object,{apply:xs,construct:Ss}=typeof Reflect<"u"&&Reflect;$t||($t=function(t){return t});Dt||(Dt=function(t){return t});xs||(xs=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});Ss||(Ss=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Cn=xt(Array.prototype.forEach),Oc=xt(Array.prototype.lastIndexOf),ya=xt(Array.prototype.pop),Wr=xt(Array.prototype.push),Pc=xt(Array.prototype.splice),In=xt(String.prototype.toLowerCase),hs=xt(String.prototype.toString),bs=xt(String.prototype.match),Gr=xt(String.prototype.replace),Mc=xt(String.prototype.indexOf),Nc=xt(String.prototype.trim),Nt=xt(Object.prototype.hasOwnProperty),wt=xt(RegExp.prototype.test),Yr=Fc(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return xs(e,t,n)}}function Fc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return Ss(e,r)}}function Re(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:In;va&&va(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Ic(t)||(t[n]=o),s=o)}e[s]=!0}return e}function qc(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function Vt(e){let t=$s(null);for(let[r,n]of Ta(e))Nt(e,r)&&(Array.isArray(n)?t[r]=qc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Vt(n):t[r]=n);return t}function Vr(e,t){for(;e!==null;){let n=Dc(e,t);if(n){if(n.get)return xt(n.get);if(typeof n.value=="function")return xt(n.value)}e=Lc(e)}function r(){return null}return r}var ka=$t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),vs=$t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ys=$t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Bc=$t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ks=$t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Uc=$t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wa=$t(["#text"]),$a=$t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ws=$t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),xa=$t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rn=$t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),jc=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),zc=Dt(/<%[\w\W]*|[\w\W]*%>/gm),Hc=Dt(/\$\{[\w\W]*/gm),Wc=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Gc=Dt(/^aria-[\-\w]+$/),Ea=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Yc=Dt(/^(?:\w+script|data):/i),Vc=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ca=Dt(/^html$/i),Kc=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),Sa=Object.freeze({__proto__:null,ARIA_ATTR:Gc,ATTR_WHITESPACE:Vc,CUSTOM_ELEMENT:Kc,DATA_ATTR:Wc,DOCTYPE_NAME:Ca,ERB_EXPR:zc,IS_ALLOWED_URI:Ea,IS_SCRIPT_OR_DATA:Yc,MUSTACHE_EXPR:jc,TMPLIT_EXPR:Hc}),Kr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Zc=function(){return typeof window>"u"?null:window},Xc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},Aa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ra(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Zc(),t=ie=>Ra(ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Kr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:T}=e,S=l.prototype,E=Vr(S,"cloneNode"),B=Vr(S,"remove"),w=Vr(S,"nextSibling"),P=Vr(S,"childNodes"),X=Vr(S,"parentNode");if(typeof a=="function"){let ie=r.createElement("template");ie.content&&ie.content.ownerDocument&&(r=ie.content.ownerDocument)}let D,R="",{implementation:A,createNodeIterator:M,createDocumentFragment:N,getElementsByTagName:le}=r,{importNode:xe}=n,me=Aa();t.isSupported=typeof Ta=="function"&&typeof X=="function"&&A&&A.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:_e,ERB_EXPR:Se,TMPLIT_EXPR:Ne,DATA_ATTR:Ie,ARIA_ATTR:ze,IS_SCRIPT_OR_DATA:De,ATTR_WHITESPACE:te,CUSTOM_ELEMENT:ce}=Sa,{IS_ALLOWED_URI:be}=Sa,j=null,re=Re({},[...ka,...vs,...ys,...ks,...wa]),de=null,Ee=Re({},[...$a,...ws,...xa,...Rn]),ue=Object.seal($s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ae=null,z=null,O=Object.seal($s(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),se=!0,ve=!0,Te=!1,je=!0,we=!1,F=!0,G=!1,q=!1,k=!1,H=!1,U=!1,V=!1,ne=!0,ye=!1,Oe="user-content-",Xe=!0,Ye=!1,et={},Qe=null,Pe=Re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),yt=null,ct=Re({},["audio","video","img","source","image","track"]),nt=null,Ge=Re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gt="http://www.w3.org/1998/Math/MathML",dt="http://www.w3.org/2000/svg",st="http://www.w3.org/1999/xhtml",ot=st,kt=!1,tt=null,ht=Re({},[gt,dt,st],hs),Ke=Re({},["mi","mo","mn","ms","mtext"]),ut=Re({},["annotation-xml"]),pt=Re({},["title","style","font","a","script"]),C=null,d=["application/xhtml+xml","text/html"],_="text/html",$=null,L=null,ae=r.createElement("form"),ge=function(v){return v instanceof RegExp||v instanceof Function},oe=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(L&&L===v)){if((!v||typeof v!="object")&&(v={}),v=Vt(v),C=d.indexOf(v.PARSER_MEDIA_TYPE)===-1?_:v.PARSER_MEDIA_TYPE,$=C==="application/xhtml+xml"?hs:In,j=Nt(v,"ALLOWED_TAGS")?Re({},v.ALLOWED_TAGS,$):re,de=Nt(v,"ALLOWED_ATTR")?Re({},v.ALLOWED_ATTR,$):Ee,tt=Nt(v,"ALLOWED_NAMESPACES")?Re({},v.ALLOWED_NAMESPACES,hs):ht,nt=Nt(v,"ADD_URI_SAFE_ATTR")?Re(Vt(Ge),v.ADD_URI_SAFE_ATTR,$):Ge,yt=Nt(v,"ADD_DATA_URI_TAGS")?Re(Vt(ct),v.ADD_DATA_URI_TAGS,$):ct,Qe=Nt(v,"FORBID_CONTENTS")?Re({},v.FORBID_CONTENTS,$):Pe,Ae=Nt(v,"FORBID_TAGS")?Re({},v.FORBID_TAGS,$):Vt({}),z=Nt(v,"FORBID_ATTR")?Re({},v.FORBID_ATTR,$):Vt({}),et=Nt(v,"USE_PROFILES")?v.USE_PROFILES:!1,se=v.ALLOW_ARIA_ATTR!==!1,ve=v.ALLOW_DATA_ATTR!==!1,Te=v.ALLOW_UNKNOWN_PROTOCOLS||!1,je=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,we=v.SAFE_FOR_TEMPLATES||!1,F=v.SAFE_FOR_XML!==!1,G=v.WHOLE_DOCUMENT||!1,H=v.RETURN_DOM||!1,U=v.RETURN_DOM_FRAGMENT||!1,V=v.RETURN_TRUSTED_TYPE||!1,k=v.FORCE_BODY||!1,ne=v.SANITIZE_DOM!==!1,ye=v.SANITIZE_NAMED_PROPS||!1,Xe=v.KEEP_CONTENT!==!1,Ye=v.IN_PLACE||!1,be=v.ALLOWED_URI_REGEXP||Ea,ot=v.NAMESPACE||st,Ke=v.MATHML_TEXT_INTEGRATION_POINTS||Ke,ut=v.HTML_INTEGRATION_POINTS||ut,ue=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&ge(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&ge(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),we&&(ve=!1),U&&(H=!0),et&&(j=Re({},wa),de=[],et.html===!0&&(Re(j,ka),Re(de,$a)),et.svg===!0&&(Re(j,vs),Re(de,ws),Re(de,Rn)),et.svgFilters===!0&&(Re(j,ys),Re(de,ws),Re(de,Rn)),et.mathMl===!0&&(Re(j,ks),Re(de,xa),Re(de,Rn))),v.ADD_TAGS&&(typeof v.ADD_TAGS=="function"?O.tagCheck=v.ADD_TAGS:(j===re&&(j=Vt(j)),Re(j,v.ADD_TAGS,$))),v.ADD_ATTR&&(typeof v.ADD_ATTR=="function"?O.attributeCheck=v.ADD_ATTR:(de===Ee&&(de=Vt(de)),Re(de,v.ADD_ATTR,$))),v.ADD_URI_SAFE_ATTR&&Re(nt,v.ADD_URI_SAFE_ATTR,$),v.FORBID_CONTENTS&&(Qe===Pe&&(Qe=Vt(Qe)),Re(Qe,v.FORBID_CONTENTS,$)),Xe&&(j["#text"]=!0),G&&Re(j,["html","head","body"]),j.table&&(Re(j,["tbody"]),delete Ae.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Yr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=v.TRUSTED_TYPES_POLICY,R=D.createHTML("")}else D===void 0&&(D=Xc(T,s)),D!==null&&typeof R=="string"&&(R=D.createHTML(""));$t&&$t(v),L=v}},ke=Re({},[...vs,...ys,...Bc]),Ce=Re({},[...ks,...Uc]),fe=function(v){let Y=X(v);(!Y||!Y.tagName)&&(Y={namespaceURI:ot,tagName:"template"});let m=In(v.tagName),b=In(Y.tagName);return tt[v.namespaceURI]?v.namespaceURI===dt?Y.namespaceURI===st?m==="svg":Y.namespaceURI===gt?m==="svg"&&(b==="annotation-xml"||Ke[b]):!!ke[m]:v.namespaceURI===gt?Y.namespaceURI===st?m==="math":Y.namespaceURI===dt?m==="math"&&ut[b]:!!Ce[m]:v.namespaceURI===st?Y.namespaceURI===dt&&!ut[b]||Y.namespaceURI===gt&&!Ke[b]?!1:!Ce[m]&&(pt[m]||!ke[m]):!!(C==="application/xhtml+xml"&&tt[v.namespaceURI]):!1},qe=function(v){Wr(t.removed,{element:v});try{X(v).removeChild(v)}catch{B(v)}},Je=function(v,Y){try{Wr(t.removed,{attribute:Y.getAttributeNode(v),from:Y})}catch{Wr(t.removed,{attribute:null,from:Y})}if(Y.removeAttribute(v),v==="is")if(H||U)try{qe(Y)}catch{}else try{Y.setAttribute(v,"")}catch{}},$e=function(v){let Y=null,m=null;if(k)v="<remove></remove>"+v;else{let ee=bs(v,/^[\r\n\t ]+/);m=ee&&ee[0]}C==="application/xhtml+xml"&&ot===st&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");let b=D?D.createHTML(v):v;if(ot===st)try{Y=new h().parseFromString(b,C)}catch{}if(!Y||!Y.documentElement){Y=A.createDocument(ot,"template",null);try{Y.documentElement.innerHTML=kt?R:b}catch{}}let Q=Y.body||Y.documentElement;return v&&m&&Q.insertBefore(r.createTextNode(m),Q.childNodes[0]||null),ot===st?le.call(Y,G?"html":"body")[0]:G?Y.documentElement:Q},ft=function(v){return M.call(v.ownerDocument||v,v,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Tt=function(v){return v instanceof f&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof p)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},bt=function(v){return typeof i=="function"&&v instanceof i};function it(ie,v,Y){Cn(ie,m=>{m.call(t,v,Y,L)})}let he=function(v){let Y=null;if(it(me.beforeSanitizeElements,v,null),Tt(v))return qe(v),!0;let m=$(v.nodeName);if(it(me.uponSanitizeElement,v,{tagName:m,allowedTags:j}),F&&v.hasChildNodes()&&!bt(v.firstElementChild)&&wt(/<[/\w!]/g,v.innerHTML)&&wt(/<[/\w!]/g,v.textContent)||v.nodeType===Kr.progressingInstruction||F&&v.nodeType===Kr.comment&&wt(/<[/\w]/g,v.data))return qe(v),!0;if(!(O.tagCheck instanceof Function&&O.tagCheck(m))&&(!j[m]||Ae[m])){if(!Ae[m]&&Rt(m)&&(ue.tagNameCheck instanceof RegExp&&wt(ue.tagNameCheck,m)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(m)))return!1;if(Xe&&!Qe[m]){let b=X(v)||v.parentNode,Q=P(v)||v.childNodes;if(Q&&b){let ee=Q.length;for(let Z=ee-1;Z>=0;--Z){let g=E(Q[Z],!0);g.__removalCount=(v.__removalCount||0)+1,b.insertBefore(g,w(v))}}}return qe(v),!0}return v instanceof l&&!fe(v)||(m==="noscript"||m==="noembed"||m==="noframes")&&wt(/<\/no(script|embed|frames)/i,v.innerHTML)?(qe(v),!0):(we&&v.nodeType===Kr.text&&(Y=v.textContent,Cn([_e,Se,Ne],b=>{Y=Gr(Y,b," ")}),v.textContent!==Y&&(Wr(t.removed,{element:v.cloneNode()}),v.textContent=Y)),it(me.afterSanitizeElements,v,null),!1)},He=function(v,Y,m){if(ne&&(Y==="id"||Y==="name")&&(m in r||m in ae))return!1;if(!(ve&&!z[Y]&&wt(Ie,Y))){if(!(se&&wt(ze,Y))){if(!(O.attributeCheck instanceof Function&&O.attributeCheck(Y,v))){if(!de[Y]||z[Y]){if(!(Rt(v)&&(ue.tagNameCheck instanceof RegExp&&wt(ue.tagNameCheck,v)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(v))&&(ue.attributeNameCheck instanceof RegExp&&wt(ue.attributeNameCheck,Y)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(Y,v))||Y==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&wt(ue.tagNameCheck,m)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(m))))return!1}else if(!nt[Y]){if(!wt(be,Gr(m,te,""))){if(!((Y==="src"||Y==="xlink:href"||Y==="href")&&v!=="script"&&Mc(m,"data:")===0&&yt[v])){if(!(Te&&!wt(De,Gr(m,te,"")))){if(m)return!1}}}}}}}return!0},Rt=function(v){return v!=="annotation-xml"&&bs(v,ce)},zt=function(v){it(me.beforeSanitizeAttributes,v,null);let{attributes:Y}=v;if(!Y||Tt(v))return;let m={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:de,forceKeepAttr:void 0},b=Y.length;for(;b--;){let Q=Y[b],{name:ee,namespaceURI:Z,value:g}=Q,I=$(ee),x=g,K=ee==="value"?x:Nc(x);if(m.attrName=I,m.attrValue=K,m.keepAttr=!0,m.forceKeepAttr=void 0,it(me.uponSanitizeAttribute,v,m),K=m.attrValue,ye&&(I==="id"||I==="name")&&(Je(ee,v),K=Oe+K),F&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,K)){Je(ee,v);continue}if(I==="attributename"&&bs(K,"href")){Je(ee,v);continue}if(m.forceKeepAttr)continue;if(!m.keepAttr){Je(ee,v);continue}if(!je&&wt(/\/>/i,K)){Je(ee,v);continue}we&&Cn([_e,Se,Ne],at=>{K=Gr(K,at," ")});let Fe=$(v.nodeName);if(!He(Fe,I,K)){Je(ee,v);continue}if(D&&typeof T=="object"&&typeof T.getAttributeType=="function"&&!Z)switch(T.getAttributeType(Fe,I)){case"TrustedHTML":{K=D.createHTML(K);break}case"TrustedScriptURL":{K=D.createScriptURL(K);break}}if(K!==x)try{Z?v.setAttributeNS(Z,ee,K):v.setAttribute(ee,K),Tt(v)?qe(v):ya(t.removed)}catch{Je(ee,v)}}it(me.afterSanitizeAttributes,v,null)},Ht=function ie(v){let Y=null,m=ft(v);for(it(me.beforeSanitizeShadowDOM,v,null);Y=m.nextNode();)it(me.uponSanitizeShadowNode,Y,null),he(Y),zt(Y),Y.content instanceof o&&ie(Y.content);it(me.afterSanitizeShadowDOM,v,null)};return t.sanitize=function(ie){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},Y=null,m=null,b=null,Q=null;if(kt=!ie,kt&&(ie="<!-->"),typeof ie!="string"&&!bt(ie))if(typeof ie.toString=="function"){if(ie=ie.toString(),typeof ie!="string")throw Yr("dirty is not a string, aborting")}else throw Yr("toString is not a function");if(!t.isSupported)return ie;if(q||oe(v),t.removed=[],typeof ie=="string"&&(Ye=!1),Ye){if(ie.nodeName){let g=$(ie.nodeName);if(!j[g]||Ae[g])throw Yr("root node is forbidden and cannot be sanitized in-place")}}else if(ie instanceof i)Y=$e("<!---->"),m=Y.ownerDocument.importNode(ie,!0),m.nodeType===Kr.element&&m.nodeName==="BODY"||m.nodeName==="HTML"?Y=m:Y.appendChild(m);else{if(!H&&!we&&!G&&ie.indexOf("<")===-1)return D&&V?D.createHTML(ie):ie;if(Y=$e(ie),!Y)return H?null:V?R:""}Y&&k&&qe(Y.firstChild);let ee=ft(Ye?ie:Y);for(;b=ee.nextNode();)he(b),zt(b),b.content instanceof o&&Ht(b.content);if(Ye)return ie;if(H){if(U)for(Q=N.call(Y.ownerDocument);Y.firstChild;)Q.appendChild(Y.firstChild);else Q=Y;return(de.shadowroot||de.shadowrootmode)&&(Q=xe.call(n,Q,!0)),Q}let Z=G?Y.outerHTML:Y.innerHTML;return G&&j["!doctype"]&&Y.ownerDocument&&Y.ownerDocument.doctype&&Y.ownerDocument.doctype.name&&wt(Ca,Y.ownerDocument.doctype.name)&&(Z="<!DOCTYPE "+Y.ownerDocument.doctype.name+`>
`+Z),we&&Cn([_e,Se,Ne],g=>{Z=Gr(Z,g," ")}),D&&V?D.createHTML(Z):Z},t.setConfig=function(){let ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};oe(ie),q=!0},t.clearConfig=function(){L=null,q=!1},t.isValidAttribute=function(ie,v,Y){L||oe({});let m=$(ie),b=$(v);return He(m,b,Y)},t.addHook=function(ie,v){typeof v=="function"&&Wr(me[ie],v)},t.removeHook=function(ie,v){if(v!==void 0){let Y=Oc(me[ie],v);return Y===-1?void 0:Pc(me[ie],Y,1)[0]}return ya(me[ie])},t.removeHooks=function(ie){me[ie]=[]},t.removeAllHooks=function(){me=Aa()},t}var Ia=Ra();var La={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Da=e=>(...t)=>({_$litDirective$:e,values:t}),Ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Zr=class extends Ln{constructor(t){if(super(t),this.it=rt,t.type!==La.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===rt||t==null)return this._t=void 0,this.it=t;if(t===pr)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Zr.directiveName="unsafeHTML",Zr.resultType=1;var Oa=Da(Zr);function Cs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var hr=Cs();function Ua(e){hr=e}var en={exec:()=>null};function Be(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(St.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Qc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),St={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Jc=/^(?:[ \t]*(?:\n|$))+/,ed=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,td=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,tn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,rd=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Rs=/(?:[*+-]|\d{1,9}[.)])/,ja=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,za=Be(ja).replace(/bull/g,Rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),nd=Be(ja).replace(/bull/g,Rs).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Is=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,sd=/^[^\n]+/,Ls=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,od=Be(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ls).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ad=Be(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Rs).getRegex(),Fn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ds=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,id=Be("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ds).replace("tag",Fn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ha=Be(Is).replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex(),ld=Be(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ha).getRegex(),Os={blockquote:ld,code:ed,def:od,fences:td,heading:rd,hr:tn,html:id,lheading:za,list:ad,newline:Jc,paragraph:Ha,table:en,text:sd},Pa=Be("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex(),cd={...Os,lheading:nd,table:Pa,paragraph:Be(Is).replace("hr",tn).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Pa).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex()},dd={...Os,html:Be(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ds).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:en,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Be(Is).replace("hr",tn).replace("heading",` *#{1,6} *[^
]`).replace("lheading",za).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ud=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wa=/^( {2,}|\\)\n(?!\s*$)/,fd=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qn=/[\p{P}\p{S}]/u,Ps=/[\s\p{P}\p{S}]/u,Ga=/[^\s\p{P}\p{S}]/u,_d=Be(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ps).getRegex(),Ya=/(?!~)[\p{P}\p{S}]/u,md=/(?!~)[\s\p{P}\p{S}]/u,gd=/(?:[^\s\p{P}\p{S}]|~)/u,hd=Be(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Qc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Va=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,bd=Be(Va,"u").replace(/punct/g,qn).getRegex(),vd=Be(Va,"u").replace(/punct/g,Ya).getRegex(),Ka="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",yd=Be(Ka,"gu").replace(/notPunctSpace/g,Ga).replace(/punctSpace/g,Ps).replace(/punct/g,qn).getRegex(),kd=Be(Ka,"gu").replace(/notPunctSpace/g,gd).replace(/punctSpace/g,md).replace(/punct/g,Ya).getRegex(),wd=Be("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ga).replace(/punctSpace/g,Ps).replace(/punct/g,qn).getRegex(),$d=Be(/\\(punct)/,"gu").replace(/punct/g,qn).getRegex(),xd=Be(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Sd=Be(Ds).replace("(?:-->|$)","-->").getRegex(),Ad=Be("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Sd).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Pn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Td=Be(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Pn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Za=Be(/^!?\[(label)\]\[(ref)\]/).replace("label",Pn).replace("ref",Ls).getRegex(),Xa=Be(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ls).getRegex(),Ed=Be("reflink|nolink(?!\\()","g").replace("reflink",Za).replace("nolink",Xa).getRegex(),Ma=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ms={_backpedal:en,anyPunctuation:$d,autolink:xd,blockSkip:hd,br:Wa,code:pd,del:en,emStrongLDelim:bd,emStrongRDelimAst:yd,emStrongRDelimUnd:wd,escape:ud,link:Td,nolink:Xa,punctuation:_d,reflink:Za,reflinkSearch:Ed,tag:Ad,text:fd,url:en},Cd={...Ms,link:Be(/^!?\[(label)\]\((.*?)\)/).replace("label",Pn).getRegex(),reflink:Be(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Pn).getRegex()},As={...Ms,emStrongRDelimAst:kd,emStrongLDelim:vd,url:Be(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ma).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Be(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ma).getRegex()},Rd={...As,br:Be(Wa).replace("{2,}","*").getRegex(),text:Be(As.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Dn={normal:Os,gfm:cd,pedantic:dd},Xr={normal:Ms,gfm:As,breaks:Rd,pedantic:Cd},Id={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Na=e=>Id[e];function Kt(e,t){if(t){if(St.escapeTest.test(e))return e.replace(St.escapeReplace,Na)}else if(St.escapeTestNoEncode.test(e))return e.replace(St.escapeReplaceNoEncode,Na);return e}function Fa(e){try{e=encodeURI(e).replace(St.percentDecode,"%")}catch{return null}return e}function qa(e,t){let r=e.replace(St.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(St.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(St.slashPipe,"|");return n}function Qr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Ld(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Ba(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Dd(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Mn=class{constructor(e){We(this,"options");We(this,"rules");We(this,"lexer");this.options=e||hr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Qr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Dd(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Qr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Qr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Qr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let T=h,S=T.raw+`
`+r.join(`
`),E=this.blockquote(S);o[o.length-1]=E,n=n.substring(0,n.length-T.raw.length)+E.raw,s=s.substring(0,s.length-T.text.length)+E.text;break}else if(h?.type==="list"){let T=h,S=T.raw+`
`+r.join(`
`),E=this.list(S);o[o.length-1]=E,n=n.substring(0,n.length-h.raw.length)+E.raw,s=s.substring(0,s.length-T.raw.length)+E.raw,r=S.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,E=>" ".repeat(3*E.length)),h=e.split(`
`,1)[0],T=!f.trim(),S=0;if(this.options.pedantic?(S=2,p=f.trimStart()):T?S=t[1].length+1:(S=t[2].search(this.rules.other.nonSpaceChar),S=S>4?1:S,p=f.slice(S),S+=t[1].length),T&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let E=this.rules.other.nextBulletRegex(S),B=this.rules.other.hrRegex(S),w=this.rules.other.fencesBeginRegex(S),P=this.rules.other.headingBeginRegex(S),X=this.rules.other.htmlBeginRegex(S);for(;e;){let D=e.split(`
`,1)[0],R;if(h=D,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),R=h):R=h.replace(this.rules.other.tabCharGlobal,"    "),w.test(h)||P.test(h)||X.test(h)||E.test(h)||B.test(h))break;if(R.search(this.rules.other.nonSpaceChar)>=S||!h.trim())p+=`
`+R.slice(S);else{if(T||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||w.test(f)||P.test(f)||B.test(f))break;p+=`
`+h}!T&&!h.trim()&&(T=!0),u+=D+`
`,e=e.substring(D.length+1),f=R.slice(S)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=qa(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(qa(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Qr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Ld(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Ba(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Ba(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let T=f.slice(1,-1);return{type:"em",raw:f,text:T,tokens:this.lexer.inlineTokens(T)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Ts{constructor(t){We(this,"tokens");We(this,"options");We(this,"state");We(this,"inlineQueue");We(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||hr,this.options.tokenizer=this.options.tokenizer||new Mn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:St,block:Dn.normal,inline:Xr.normal};this.options.pedantic?(r.block=Dn.pedantic,r.inline=Xr.pedantic):this.options.gfm&&(r.block=Dn.gfm,this.options.breaks?r.inline=Xr.breaks:r.inline=Xr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Dn,inline:Xr}}static lex(t,r){return new Ts(r).lex(t)}static lexInline(t,r){return new Ts(r).inlineTokens(t)}lex(t){t=t.replace(St.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(St.tabCharGlobal,"    ").replace(St.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(T=>{h=T.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Nn=class{constructor(e){We(this,"options");We(this,"parser");this.options=e||hr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(St.notSpaceStart)?.[0],s=e.replace(St.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Kt(n)+'">'+(r?s:Kt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Kt(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,r=e.start,n="";for(let a=0;a<e.items.length;a++){let i=e.items[a];n+=this.listitem(i)}let s=t?"ol":"ul",o=t&&r!==1?' start="'+r+'"':"";return"<"+s+o+`>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Kt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Fa(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Kt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Fa(e);if(s===null)return Kt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Kt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Kt(e.text)}},Ns=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Es{constructor(t){We(this,"options");We(this,"renderer");We(this,"textRenderer");this.options=t||hr,this.options.renderer=this.options.renderer||new Nn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ns}static parse(t,r){return new Es(r).parse(t)}static parseInline(t,r){return new Es(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},On,Jr=(On=class{constructor(e){We(this,"options");We(this,"block");this.options=e||hr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},We(On,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),We(On,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),On),Od=class{constructor(...e){We(this,"defaults",Cs());We(this,"options",this.setOptions);We(this,"parse",this.parseMarkdown(!0));We(this,"parseInline",this.parseMarkdown(!1));We(this,"Parser",qt);We(this,"Renderer",Nn);We(this,"TextRenderer",Ns);We(this,"Lexer",Ft);We(this,"Tokenizer",Mn);We(this,"Hooks",Jr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Nn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Mn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Jr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Jr.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Jr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,u);return l.call(s,f)})();let p=i.call(s,u);return l.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,u);return f===!1&&(f=await l.apply(s,u)),f})();let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Kt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},gr=new Od;function Ue(e,t){return gr.parse(e,t)}Ue.options=Ue.setOptions=function(e){return gr.setOptions(e),Ue.defaults=gr.defaults,Ua(Ue.defaults),Ue};Ue.getDefaults=Cs;Ue.defaults=hr;Ue.use=function(...e){return gr.use(...e),Ue.defaults=gr.defaults,Ua(Ue.defaults),Ue};Ue.walkTokens=function(e,t){return gr.walkTokens(e,t)};Ue.parseInline=gr.parseInline;Ue.Parser=qt;Ue.parser=qt.parse;Ue.Renderer=Nn;Ue.TextRenderer=Ns;Ue.Lexer=Ft;Ue.lexer=Ft.lex;Ue.Tokenizer=Mn;Ue.Hooks=Jr;Ue.parse=Ue;var f_=Ue.options,__=Ue.setOptions,m_=Ue.use,g_=Ue.walkTokens,h_=Ue.parseInline;var b_=qt.parse,v_=Ft.lex;function sr(e){let t=Ue.parse(e),r=Ia.sanitize(t);return Oa(r)}function Zt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Ir(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Bn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Pd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Md=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Nd=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function or(e){return!!e&&typeof e=="object"}function Fs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Qa(e,t){let r=Fs(e),n=Fs(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Fd(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>or(s)&&typeof s.text=="string"?s.text:"").join(""):or(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function qd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Pd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Fs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Qa(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Qa(or(i)?i.old_string:"",or(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Ja(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function ei(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Md.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Nd.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Bd(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(or(o)){if(o.type==="text"&&typeof o.text=="string")s.push(ei(o.text));else if(o.type==="thinking"){let a=Ja(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=qd(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(or(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Fd(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function Ud(e){if(e.type==="item.completed"&&or(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[ei(t.text)];if(t.type==="reasoning"){let r=Ja(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function jd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function ti(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!or(o))continue;let a=jd(o)?Ud(o):Bd(o,r);for(let i of a)t.push(i)}return t}var zd=5,Hd=10,Wd=/Task\s+#(\d+)/,Gd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Yd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Un(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Vd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Kd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Zd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Wd.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Xd(e){if(e.tool==="Bash"){let t=e.command||"";return Gd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Yd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Qd(e){let t=e.filter(s=>s.kind==="tool").slice(-Hd),r=new Map;t.forEach((s,o)=>{let a=Xd(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Jd(e){let t=Kd(e);if(t)return{text:t,guess:!1};let r=Zd(e);if(r)return{text:r,guess:!1};let n=Qd(e);return n?{text:n,guess:!0}:null}function eu(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Et(e,t)}function jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,u=new Set,p=null,f=null,h=!1,T=!1,S=!1,E=null,B=null;function w(){h=!1,T=!1,S=!1,E=null,B=null}async function P(z){if(r){T=!0,S=!1,te();try{let O=await Promise.resolve(r("get-attempt-prompt",{attempt_id:z}));if(o!==z)return;!O||typeof O!="object"||Array.isArray(O)?S=!0:(E=O,B=z)}catch{o===z&&(S=!0)}finally{o===z&&(T=!1,te())}}}function X(){if(h=!h,h&&o&&B!==o){P(o);return}te()}function D(){if(!h)return"";let z=Ir({loading:T,error:S});if(z)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${z}
      </div>`;if(!E)return"";if(E.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let O=Bn(E.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${O?c`<div class="prompt-block__meta">${O} 발송</div>`:""}
      ${typeof E.task_prompt=="string"?Zt("\uACFC\uC5C5 (user)",E.task_prompt):""}
      ${typeof E.system_prompt=="string"?Zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",E.system_prompt):""}
    </div>`}function R(){if(!o||!n)return[];let z=n.get(o);return ti(z?z.lines:[])}function A(){if(!o||!n)return null;let z=n.get(o),O=z?z.last_event_at:null;return typeof O=="number"?O:null}function M(){return a.status==="running"}function N(){if(M()&&o){f||(f=setInterval(()=>te(),1e3));return}le()}function le(){f&&(clearInterval(f),f=null)}function xe(z){let O=[],se=0;for(;se<z.length;){let ve=z[se];if(ve.kind==="tool"){let Te=se;for(;Te<z.length&&z[Te].kind==="tool"&&z[Te].tool===ve.tool;)Te+=1;if(Te-se>=zd&&!u.has(se)){O.push({kind:"group",idx:se,tool:ve.tool||"",lines:z.slice(se,Te).map((je,we)=>({idx:se+we,line:je}))}),se=Te;continue}}O.push({kind:"line",idx:se,line:ve}),se+=1}return O}function me(z){for(let O=z.length-1;O>=0;O-=1){let se=z[O];if(se.kind==="result"||se.kind==="error")return null;if(se.kind==="tool"&&!Object.hasOwn(se,"result"))return se}return null}function _e(z){for(let O=z.length-1;O>=0;O-=1)if(z[O].kind==="thinking")return z[O];return null}function Se(z,O){if(O.kind==="gate")return c`<div class="sv__gate">${O.text}</div>`;if(O.kind==="phase")return c`<div class="sv__phase">${O.text}</div>`;if(O.kind==="result")return c`<div
        class="sv__result${O.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${O.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(O.text||(O.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(O.kind==="thinking"){let se=l.has(z);return c`<div
        class="sv__think${se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>be(z)}
      >
        <span class="sv__think-line">💭 ${Un(O.text)}</span>
        ${se?c`<pre class="sv__think-expand">${O.text}</pre>`:""}
      </div>`}if(O.kind==="error")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="blocker")return c`<div class="sv__error">⛔ ${O.text}</div>`;if(O.kind==="tool"){let se=l.has(z),ve=O.tool==="Bash"?Vd(O.command):0,Te=O.tool==="Bash"?ve>1?Un(O.command):O.command:O.path||O.command||"";return c`<div
        class="sv__tool${se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>be(z)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${O.icon}</span>
          <span class="sv__tool-name">${O.tool}</span>
          ${Te?c`<span class="sv__tool-detail">${Te}</span>`:""}
          ${ve>1?c`<span class="sv__tool-more">⋯ ${ve}줄</span>`:""}
          ${typeof O.added=="number"?c`<span class="sv__diff-add">+${O.added}</span>`:""}
          ${typeof O.removed=="number"?c`<span class="sv__diff-del">−${O.removed}</span>`:""}
          ${O.result?c`<span class="sv__tool-ok">→ ${O.result}</span>`:""}
        </span>
        ${se?c`<pre class="sv__tool-expand">${Ne(O)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(O.text||"")}</div>`}function Ne(z){let O=[];if(z.tool==="Bash"&&typeof z.command=="string"&&z.command.length>0)O.push(z.command);else if(z.input!==void 0)try{O.push(`input: ${JSON.stringify(z.input,null,2)}`)}catch{}return typeof z.output=="string"&&z.output.length>0&&O.push(`output:
${z.output}`),O.join(`

`)}function Ie(){if(!o)return c``;let z=R(),O=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),se=a.session_id||"",ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,Te=M(),je=Te?eu(A(),Date.now()):"",we=Te?me(z):null,F=Te?_e(z):null,G=Jd(z);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${G?c`<span
              class="sv__stage${G.guess?" sv__stage--guess":""}"
              title=${G.text}
              >${G.text}</span
            >`:""}
        ${Te?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${je?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${je}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${je?c`<span class="sv__live-ago">${je}</span>`:""}</span
            >`:""}
        ${se?c`<button
              type="button"
              class="sv__session"
              title=${se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${se}`}
              @click=${()=>re(se)}
            >
              ⧉ ${se.slice(0,8)}
            </button>`:""}
        ${O?c`<span class="sv__meta">${O}</span>`:""}
        ${a.worktree?c`<span class="sv__wt" title=${a.worktree}
              >${a.worktree}</span
            >`:""}
        <button
          type="button"
          class="sv__prompt-toggle${h?" sv__prompt-toggle--on":""}"
          data-seam="attempt-prompt-toggle"
          aria-pressed=${h?"true":"false"}
          aria-label="발송 프롬프트 보기"
          title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
          @click=${X}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${ve}
          @click=${j}
        >
          <span class="sv__follow-full">⇣ ${ve}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Ae()}
        >
          ✕
        </button>
      </div>
      ${D()}
      <div class="sv__body">
        ${z.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:xe(z).map(q=>q.kind==="group"?ze(q):Se(q.idx,q.line))}
      </div>
      ${we||F?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${we?c`<span class="sv__now-icon">${we.icon}</span>
                  <span class="sv__now-name">${we.tool}</span>
                  <span class="sv__now-detail"
                    >${we.tool==="Bash"?Un(we.command):we.path||we.command||""}</span
                  >`:""}
            ${F?c`<span class="sv__now-think"
                  >💭 ${Un(F.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ze(z){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>De(z.idx)}
    >
      <span class="sv__group-icon">${z.lines[0].line.icon}</span>
      <span class="sv__group-name">${z.tool}</span>
      <span class="sv__group-count">${z.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function De(z){u.add(z),te()}function te(){Me(Ie(),e),N(),i&&ce()}function ce(){let z=e.querySelector(".sv__body");z&&(z.scrollTop=z.scrollHeight)}function be(z){l.has(z)?l.delete(z):l.add(z),te()}function j(){i=!i,te()}function re(z){mr(z).then(O=>{O?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function de(z){!o||!z||(a={...a,...z},te())}function Ee(z){let O=z.target;if(!O||!O.classList||!O.classList.contains("sv__body"))return;!(O.scrollHeight-O.scrollTop-O.clientHeight<=4)&&i&&(i=!1,te())}e.addEventListener("scroll",Ee,!0);function ue(z){let O=z&&z.attempt_id;O&&(o=O,a=z.meta||{},i=!0,l.clear(),u.clear(),w(),!p&&n&&(p=n.subscribe(te)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),te())}function Ae(){let z=o;o=null,l.clear(),u.clear(),w(),le(),r&&z&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${z}`})).catch(()=>{}),Me(c``,e),s&&s()}return{open:ue,updateMeta:de,close:Ae,isOpen(){return o!==null},destroy(){le(),p&&(p(),p=null),e.removeEventListener("scroll",Ee,!0),o=null,Me(c``,e)}}}function rn(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ri(t.spec_id),s=ri(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ri(e){return typeof e=="string"?e.trim():""}function tu(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function ru(e){let t=e&&e.metadata||{},r=rn(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:tu(t)?null:"plan_pending"}),n}function ni(e,t){let r=ru(e);return c`
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
  `}var nu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",su=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ou=/^\*\*결론\*\* — (.+)$/;function si(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==nu)return null;let r=su.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ou.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var oi=20;function ai(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function au(e){return e.length>oi?`${e.slice(0,oi)}\u2026`:e}function iu(e,t,r,n){let s=`${t.lane} ${au(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${ai(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${sr(t.body)}
        </div>`:""}
  </div>`}function lu(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ai(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${sr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function ii(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=si(typeof l.text=="string"?l.text:"");return u?iu(l,u,t,s.has(l.id)):lu(l)})}
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
  `}var cu=["codex","opus","fable","self","skip"],du=["codex","fable","skip"],uu=["low","medium","high","xhigh"],pu=["standard","fast_track"],Dr=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Bs={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},orchestration_speed:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uC18D\uB3C4",help:"Fast\uB294 \uC9C0\uC6D0 \uBAA8\uB378\uC744 \uB354 \uBE60\uB974\uAC8C \uC2E4\uD589\uD558\uBA70 \uC0AC\uC6A9\uB7C9 \uBE44\uC6A9\uC774 \uC99D\uAC00\uD569\uB2C8\uB2E4."},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},li={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},fu=["self","skip"],_u="opus",Us={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",orchestration_speed:"(\uAE30\uBCF8: Standard)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function js(e){let t=Bs[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function mu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${e==="orchestration_speed"?n==="default"?"Standard":n==="fast"?"Fast":n:n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:Us[e]||"(\uAE30\uBCF8)"}function Lr(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function br(e){if(!Lr(e)||!Lr(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>Lr(r)&&Lr(r.models));return t.length>0?t:null}function qs(e){return{value:e,label:e}}function zs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ci(e,t,r=null){let n=br(e);if(!n)return t?[{label:null,options:[qs(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(qs)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[zs(t),...s]:s}function ar(e,t){let r={label:null,options:e.map(qs)};return t&&!e.includes(t)?[zs(t),r]:[r]}function Xt(e,t){let r=br(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function Hs(e,t){return Lr(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function gu(e,t){return Lr(t)&&Array.isArray(t.orchestration_efforts)?t.orchestration_efforts.slice():Hs(e,t)}function hu(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return gu(n,n.models[t]);return[]}function bu(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r){if(!Object.hasOwn(n.models,t))continue;let s=n.models[t];return Array.isArray(s.speed_tiers)?s.speed_tiers.slice():["default"]}return[]}function Ws(e,t){let r=br(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return Hs(n,n.models[t]);return[]}function pi(e){let t=br(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of Hs(n,s))r.includes(o)||r.push(o);return r}function fi(e,t){if(!t)return pi(e);let n=br(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of Ws(e,o))s.includes(a)||s.push(a);return s}function Hn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Xt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?Ws(t,n.impl_model):fi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Or(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||_u,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?Xt(n,o):s:null;return Dr.map(u=>{let p=t(u),f,h=!1;return u==="orchestration_model"?f=ci(n,p):u==="impl_runtime"?f=ar(["inherit","claude","codex"],p):u==="impl_model"?(f=l?ci(n,p,l):p?[zs(p)]:[],h=i==="inherit"&&l===null):u==="orchestration_effort"?f=ar(hu(n,o),p):u==="orchestration_speed"?f=vu(bu(n,o),p):u==="impl_effort"?(f=ar(a?Ws(n,a):l?fi(n,l):pi(n),p),h=i==="inherit"&&l===null):u==="plan_review_model"?f=ar(du,p):Object.hasOwn(li,u)?(f=ar(uu,p),h=fu.includes(r(li[u]))):f=ar(cu,p),{key:u,groups:f,selected:p,disabled:h,runner:u==="orchestration_model"?Xt(n,o):null}})}function zn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>di(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>di(s,t))}
          </optgroup>`)}
  `}function vu(e,t){return ar(e,t).map(r=>({...r,options:r.options.map(n=>{let s=n.label.endsWith("(\uBE44\uD638\uD658)"),o=n.value==="default"?"Standard":n.value==="fast"?"Fast":null;return{...n,label:s?o?`${o} (\uBE44\uD638\uD658)`:n.label:o||n.label}})}))}function di(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function ui(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${js(e)}</span>
      <span class="detail-kv__vgroup">
        <select
          class=${n?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
          aria-label=${e}
          data-key=${e}
          ?disabled=${s}
          @change=${i=>(e==="impl_runtime"||e==="impl_model"||e==="impl_effort")&&a.onImplTargetChange?a.onImplTargetChange(e,i.target.value):a.onChange(e,i.target.value)}
        >
          ${t}
        </select>
        ${o?c`<span class="detail-kv__note" data-runner-for=${e}
              >${o}</span
            >`:""}
      </span>
    </div>
  `}function _i(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=f=>typeof o[f]=="string"?o[f]:"",u=Or({selectedOf:i,effectiveOf:f=>{let h=i(f);return h||(typeof a[f]=="string"?a[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${u.map(f=>ui(f.key,zn(f.groups,f.selected,mu(f.key,a,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${ui("workflow_mode",zn(ar(pu,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function yu(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function mi(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l(S){S.key==="Escape"&&s&&(S.preventDefault(),h())}document.addEventListener("keydown",l);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${yu(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${i}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${i||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:sr(a)}
          </div>
        </div>
      </div>
    `:c``}function p(){Me(u(),e)}async function f(S,E={}){s=S,o="loading",a="",i="",p();let B=r?r():"";if(!B){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let w="/api/doc?workspace="+encodeURIComponent(B)+"&path="+encodeURIComponent(S);try{let P=await n(w),X=await P.json().catch(()=>({}));if(!P.ok||!X||X.ok!==!0){if(X?.error==="not_found"&&E.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(X&&X.error||P.status)+")",p();return}a=String(X.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Me(c``,e)}function T(){document.removeEventListener("keydown",l),h()}return{open:f,close:h,destroy:T}}var ku=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],bi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function wu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function $u(e){let t=mt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Cr(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${bi}
          >부분 집계</span
        >`:""}`}function gi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function hi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?vi(t):""}function xu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=mt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
        <span class="detail-session__leg-role detail-session__usage-label"
          >${r}</span
        >
        <span class="detail-session__leg-meta detail-session__usage-value"
          >${[s.provider,s.model].filter(Boolean).join(" \xB7 ")}</span
        >
        ${s.session_id?c`<span
              class="detail-session__leg-sid detail-session__sid"
              title=${s.session_id}
              >${s.session_id.slice(0,8)}</span
            >`:""}
        ${hi(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${hi(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function Su(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...ku,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${wu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${bi}</span>`:""}
  </div>`}var Au={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function vi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Tu(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function yi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let f=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),T=f&&!h,S=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!T}
      title=${S}
      @click=${E=>{E.stopPropagation(),T&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let f=u.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let p=gi(gs(u));if(mt(p).length===0&&!Cr(u.usage))return"";let f=s.has(u.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${f?"true":"false"}
      title=${f?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${h=>{h.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${$u(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=gs(u),f=gi(p),h=mt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Au[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${u.resumed_from?c`<span
                  class="detail-session__resumed"
                  title=${`\uC774\uC5B4\uBC1B\uC740 \uC138\uC158 (from ${u.resumed_from})`}
                  >↻</span
                >`:""}
            <span class="detail-session__meta"
              >${[u.runner,u.model].filter(Boolean).join(" \xB7 ")}</span
            >
            ${h.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?c`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${h.length>0?h.map(T=>c`<span
                      class="detail-session__usage"
                      title=${T.tooltip}
                      >${T.label}</span
                    >`):Cr(u.usage)?c`<span class="detail-session__usage"
                    >${Cr(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${vi(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${Tu(u)}
          ${s.has(u.attempt_id)&&u.usage?Su(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${xu(p)}
        </div>`})}
    </div>
  `}function ki(e,t={}){return c`
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
          ${Eu(e)}
        </div>`:""}
  `}function Eu(e){let t=Ir(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Zt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Bn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Zt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Zt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Cu=["open","in_progress","deferred","resolved","closed"],Ru=[0,1,2,3,4];function wi(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,f={},h="",T=!1,S=!1,E=!1,B="",w="",P="";function X(){S=!1,E=!1,B="",w="",P=""}let D=[],R=null,A=null,M=!1,N="",le=!1,xe=0,me=new Set;function _e(){D=[],R=null,A=null,M=!1,N="",le=!1,xe+=1,me.clear()}async function Se(g){if(!s)return;let I=++xe;try{let x=await Promise.resolve(s("get-comments",{id:g}));if(I!==xe||g!==u)return;D=Array.isArray(x)?x:[],M=!1}catch{if(I!==xe||g!==u)return;M=!0}Z()}function Ne(){if(!s||!u)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(R!==u){R=u,A=g,Se(u);return}g!==null&&g!==A&&(A=g,Se(u))}function Ie(g){me.has(g)?me.delete(g):me.add(g),Z()}function ze(g){let I=N.trim().length===0;N=g,I!==(g.trim().length===0)&&Z()}async function De(){let g=N.trim();if(!s||!u||g.length===0||le)return;let I=u;le=!0,Z();let x=!1;try{let K=await Promise.resolve(s("add-comment",{id:I,text:g}));Array.isArray(K)&&K.length>0&&(x=!0,I===u&&(D=K,M=!1,N="",A=K.length))}catch{x=!1}x||J("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),I===u&&(le=!1),Z()}let te={onToggle:Ie,onDraftInput:ze,onSubmit:De},ce=document.createElement("div");ce.className="md-viewer-root",document.body.appendChild(ce);let be=mi(ce,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),j=document.createElement("div");j.className="session-log-root",document.body.appendChild(j);let re=jn(j,{transport:s?(g,I)=>Promise.resolve(s(g,I)):void 0,sessionLogStore:l}),de=!1,Ee=!1,ue=!1,Ae=null,z=null,O=0;function se(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function ve(){de=!1,Ee=!1,ue=!1,Ae=null,z=null,O+=1}async function Te(g){if(!s)return;let I=++O;Ee=!0,ue=!1,Z();try{let x=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(I!==O)return;!x||typeof x!="object"||Array.isArray(x)?ue=!0:(Ae=x,z=se(g))}catch{I===O&&(ue=!0)}finally{I===O&&(Ee=!1,Z())}}function je(){if(de=!de,de&&u&&z!==se(u)){Ae=null,Te(u);return}Z()}function we(){if(!a||!u)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(x=>x&&x.bead_id===u).sort((x,K)=>(K.started_at||0)-(x.started_at||0)).map(x=>({attempt_id:x.attempt_id,bead_id:x.bead_id,status:x.status,started_at:typeof x.started_at=="number"?x.started_at:null,runner:x.runner||null,model:x.model||null,session_id:x.session_id||null,resumed_from:x.resumed_from||null,dismissed_at:typeof x.dismissed_at=="number"?x.dismissed_at:null,cause:typeof x.cause=="string"?x.cause:null,cause_detail:x.cause_detail||null,exec_default_preset_id:typeof x.exec_default_preset_id=="string"?x.exec_default_preset_id:null,exec_default_preset_revision:typeof x.exec_default_preset_revision=="number"?x.exec_default_preset_revision:null,exec_values:x.exec_values&&typeof x.exec_values=="object"?x.exec_values:null,usage:x.usage||null,usage_legs:Array.isArray(x.usage_legs)?x.usage_legs:[]}))}function F(){if(!a||!u)return null;let g=a.get();return Lt(g&&g.attempts||{},u)}let G=new Set;function q(g){G.has(g)?G.delete(g):G.add(g),Z()}function k(g){let I=a?a.get():null,x=I&&I.attempts?I.attempts[g]:null;re.open({attempt_id:g,meta:x?{runner:x.runner||void 0,model:x.model||void 0,effort:x.effort||void 0,status:x.status||void 0,session_id:x.session_id||void 0}:{}})}async function H(g){if(!s||!g)return;let I=()=>{let K=a?a.get():null;return K&&typeof K.revision=="number"?K.revision:0},x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:I()});if(x&&x.conflict){let K=x.queue&&typeof x.queue.revision=="number"?x.queue.revision:I();x=await s("worker-attempt-resume",{attempt_id:g,expected_revision:K})}x&&x.resumed===!1&&!x.conflict&&x.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${x.reason}`,"error",2400)}let U={onOpen:k,onResume:H,onToggleUsage:q};function V(){let g=a?a.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Xe()?.presets.find(K=>K.id===I):null;return x&&x.compatible!==!1&&x.settings?x.settings:{}}function ne(){let g=a?a.get():null,I=g&&g.default_exec_preset_id,x=typeof I=="string"?Xe()?.presets.find(K=>K.id===I):null;return x&&x.compatible!==!1&&typeof x.name=="string"?x.name:""}function ye(){let g=a?a.get():null;return g&&g.runner_catalog||null}function Oe(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},x=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof V().orchestration_model=="string"?V().orchestration_model:"")||"opus";return Xt(ye(),x)}function Xe(){let g=i?i.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function Ye(g){let I=g&&g.settings&&typeof g.settings=="object"?g.settings:{},x=K=>typeof I[K]=="string"?I[K]:K==="impl_runtime"&&typeof I.impl_model=="string"&&Xt(ye(),I.impl_model)||"";return Or({selectedOf:x,effectiveOf:x,runner_catalog:ye()}).some(K=>K.groups.some(Fe=>Fe.options.some(at=>at.value===K.selected&&at.label.endsWith("(\uBE44\uD638\uD658)"))))}function et(g){i&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&i.set({revision:g.revision,presets:g.presets})}async function Qe(){let g=Xe(),I=g?.presets.find(x=>x.id===h);if(!(!s||!u||!g||!I||Ye(I)||T)){T=!0,Z();try{let x=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:I.id,expected_revision:g.revision}));if(x&&x.conflict){et(x),J("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let K=x&&Array.isArray(x.issue)?x.issue[0]:x?.issue;if(x&&x.applied&&K&&typeof K=="object"){p=K;for(let Fe of Dr)delete f[Fe];J("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}x&&x.error==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(x){x&&typeof x=="object"&&x.code==="bd_readback_failed"?J("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):J("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{T=!1,Z()}}}function Pe(){let g=Xe();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let I=g?g.presets:[],x=I.find(Fe=>Fe.id===h),K=x?Ye(x):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||T}
          @change=${Fe=>{h=Fe.target.value,Z()}}
        >
          <option value="" ?selected=${h===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${I.map(Fe=>{let at=Ye(Fe);return c`<option
              value=${Fe.id}
              ?selected=${Fe.id===h}
            >
              ${Fe.name}${at?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!x||K||T}
          @click=${()=>{Qe()}}
        >
          12개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let yt=null;r&&r.subscribe&&(yt=r.subscribe(()=>gt()));let ct=null;a&&typeof a.subscribe=="function"&&(ct=a.subscribe(()=>{u&&Z()}));let nt=null;i&&typeof i.subscribe=="function"&&(nt=i.subscribe(()=>{u&&Z()}));function Ge(g){g.key==="Escape"&&u&&(g.preventDefault(),n())}document.addEventListener("keydown",Ge);function gt(){if(u){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+u)||[];p=g.find(x=>x&&x.id===u)||g[0]||p}Ne(),Z()}}function dt(g){mr(g).then(I=>{I?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function st(g){g.preventDefault(),g.stopPropagation(),u&&dt(u)}function ot(g,I){g.preventDefault(),g.stopPropagation(),dt(I)}function kt(g,I,x){g.preventDefault(),g.stopPropagation(),be.open(I,{missing_state:x})}function tt(g,I){f[g]=I,Z(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:g,value:I})).catch(()=>{J("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ht(g,I){let x=p||{},K=x.metadata&&typeof x.metadata=="object"?x.metadata:{},Fe={};for(let Le of["impl_runtime","impl_model","impl_effort"])Fe[Le]=Object.hasOwn(f,Le)?f[Le]:typeof K[Le]=="string"?K[Le]:"";Fe[g]=I;let at=Hn(Fe,ye(),Oe()),_t={};for(let Le of["impl_runtime","impl_model","impl_effort"])_t[Le]=f[Le],f[Le]=at[Le]||"";Z(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...at,orchestration_runtime:Oe()})).then(Le=>{let Jt=Array.isArray(Le)?Le[0]:Le;if(!Jt||typeof Jt!="object"||!Jt.id)throw new Error("implementation target readback failed");p=Jt;for(let dn of["impl_runtime","impl_model","impl_effort"])delete f[dn];Z()}).catch(()=>{for(let Le of["impl_runtime","impl_model","impl_effort"])_t[Le]===void 0?delete f[Le]:f[Le]=_t[Le];Z(),J("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ke(g,I,x){if(!s||!u)return!1;try{let K=await Promise.resolve(s(g,I)),Fe=Array.isArray(K)?K[0]:K;return Fe&&typeof Fe=="object"&&Fe.id?(p=Fe,!0):(J(x,"error"),!1)}catch{return J(x,"error"),!1}}function ut(g){setTimeout(()=>{try{let I=e.querySelector(g);I&&typeof I.focus=="function"&&I.focus()}catch{}},0)}function pt(){S=!0,B=p&&p.title||"",Z(),ut('.detail-edit__input[data-edit="title"]')}function C(g){B=g.target.value}function d(){S=!1,B="",Z()}function _(){Ke("edit-text",{id:u,field:"title",value:B},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(S=!1,B=""),Z()})}function $(){E=!0,w=p&&p.description||"",Z(),ut('.detail-edit__textarea[data-edit="description"]')}function L(g){w=g.target.value}function ae(){E=!1,w="",Z()}function ge(){Ke("edit-text",{id:u,field:"description",value:w},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(I=>{I&&(E=!1,w=""),Z()})}function oe(g,I,x,K){if(g.key==="Escape"){g.stopPropagation(),x();return}g.key==="Enter"&&(!K||g.ctrlKey||g.metaKey)&&(g.preventDefault(),I())}function ke(g){let I=g.target.value;Ke("update-status",{id:u,status:I},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function Ce(g){let I=Number(g.target.value);Ke("update-priority",{id:u,priority:I},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Z())}function fe(g){P=g.target.value}function qe(){let g=P.trim();g.length!==0&&Ke("label-add",{id:u,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(I=>{I&&(P=""),Z()})}function Je(g){if(g.key==="Escape"){g.stopPropagation(),P="",Z();return}g.key==="Enter"&&(g.preventDefault(),qe())}function $e(g){Ke("label-remove",{id:u,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Z())}let ft={onCopyPath:ot,onOpenDoc:kt},Tt={onChange:tt,onImplTargetChange:ht};function bt(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function it(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function he(g){let x=(Array.isArray(g.dependencies)?g.dependencies:[]).map(K=>({id:bt(K),icon:it(K)})).filter(K=>K.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${x.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${x.map(K=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(K.id)}
                  >
                    ${K.icon?`${K.icon} `:""}${K.id}
                  </button>`:c`<span class="detail-dep"
                    >${K.icon?`${K.icon} `:""}${K.id}</span
                  >`)}
          </div>`}
    `}function He(g){let I=g.metadata||{},x=g.workflow||{},K=x.stages||{},Fe=K.spec&&K.spec.stale,at=K.impl&&K.impl.stale,_t=K.plan||null,Le=x.route_source==="derived",Jt=x.route||I.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Le?" detail-kv__v--derived":""}"
          title=${Le?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Le?"unset":Jt}</span
        >
      </div>
      ${x.route!=="quick_fix"||Object.hasOwn(I,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${I.spec_review||"\uC5C6\uC74C"}${Fe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${x.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${_t?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${_t?.approval_receipt||"\uC5C6\uC74C"}${_t?.approval_state==="stale"?" \xB7 stale":_t?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${x.route!=="quick_fix"||Object.hasOwn(I,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${I.impl_review||"\uC5C6\uC74C"}${at?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${I.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${I.pr_url}</span>
          </div>`:""}
    `}let Rt={route:["quick_fix","spec_backed","full_plan"]};async function zt(g,I){let x=I.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&x!=="full_plan"&&!window.confirm(`full_plan \u2192 ${x||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Z();return}await Ke("update-workflow-meta",{id:u,key:g,value:x},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Z()}function Ht(g){let I=g.metadata||{};return c` ${((K,Fe)=>{let at=Rt[K],_t=typeof I[K]=="string"?I[K]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${K}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${K}
          data-edit=${`wfmeta-${K}`}
          @change=${Le=>zt(K,Le)}
        >
          <option value="" ?selected=${!at.includes(_t)}>
            ${Fe}
          </option>
          ${at.map(Le=>c`<option value=${Le} ?selected=${_t===Le}>${Le}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ie(g,I){return S?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${B}
            @input=${C}
            @keydown=${x=>oe(x,_,d,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${_}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${d}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${g}</h2>
        ${mt(I).map(x=>c`<span class="detail-usage-total" title=${x.tooltip}
              >${x.label}</span
            >`)}
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
    `}function v(g){let I=vt(g.created_at),x=vt(g.updated_at);return!I&&!x?c``:c`
      ${I?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${I}</span>
          </div>`:""}
      ${x?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${x}</span>
          </div>`:""}
    `}function Y(g,I){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${ke}
        >
          ${Cu.map(x=>c`<option value=${x} ?selected=${x===g}>${x}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ce}
        >
          ${Ru.map(x=>c`<option value=${String(x)} ?selected=${x===I}>
                P${x}
              </option>`)}
        </select>
      </div>
    `}function m(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${E?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${$}
            >
              ✎
            </button>`}
      </div>
      ${E?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${w}
              @input=${L}
              @keydown=${I=>oe(I,ge,ae,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${ge}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${ae}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function b(g){let I=typeof g.notes=="string"?g.notes:"";return I.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${I}</div>
    `}function Q(g){let I=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${I.map(x=>c`<span class="detail-label-chip"
              >${x}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${x}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+x}
                @click=${()=>$e(x)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${P}
            @input=${fe}
            @keydown=${Je}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${qe}
          >
            추가
          </button>
        </span>
      </div>
    `}function ee(){if(!u)return c``;let g=p||{},I=String(g.id||u),x=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",K=F(),Fe=g.status||"open",at=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",_t=g.description||"",Le={...g,metadata:{...g.metadata||{},...f}};return c`
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
            ${I}
          </button>
          ${ie(x,K)}
          ${Y(Fe,at)} ${v(g)}
          ${m(_t)}
          ${ii(D,te,{expanded:me,draft:N,sending:le,error:M})}
          ${b(g)} ${Q(g)} ${he(g)}
          ${He(g)} ${Ht(g)}
          ${ni(g,ft)}
          ${Pe()}
          ${_i(Le,Tt,V(),ye(),ne())}
          ${ki({expanded:de,loading:Ee,error:ue,data:Ae},{onToggle:je})}
          ${yi(we(),U,{total:K,expanded:G})}
        </div>
      </div>
    `}function Z(){Me(ee(),e)}return{load(g){g!==u&&(f={},h="",X(),_e(),ve()),u=g,p=null,gt()},clear(){u=null,p=null,f={},h="",T=!1,X(),_e(),ve(),be.close(),re.close(),Me(c``,e)},destroy(){yt&&(yt(),yt=null),ct&&(ct(),ct=null),nt&&(nt(),nt=null),document.removeEventListener("keydown",Ge),be.destroy(),ce.parentNode&&ce.parentNode.removeChild(ce),re.destroy(),j.parentNode&&j.parentNode.removeChild(j),u=null,p=null,h="",T=!1,_e(),ve(),Me(c``,e)}}}var Iu=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function $i(e,t){return fs(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Lu(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function xi(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(A){let M=r.get();if(M)try{let N=await n("display-policy-set",{expected_revision:M.revision,policy:A(M)});l(N),N&&N.conflict&&N.policy&&(N=await n("display-policy-set",{expected_revision:N.policy.revision,policy:A(N.policy)}),l(N)),N&&N.conflict&&J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{J("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(A){A&&A.policy&&typeof A.policy=="object"&&r.set(A.policy)}function u(A){let M=r.get();if(!M)return;let N=$i(A,M)!=="shown";i(le=>Lu(A,le,N))}function p(){let A=a.trim();A.length!==0&&(a="",i(M=>M.hidden_prefixes.includes(A)?{hidden_prefixes:M.hidden_prefixes}:{hidden_prefixes:[...M.hidden_prefixes,A]}),B())}function f(A){i(M=>({hidden_prefixes:M.hidden_prefixes.filter(N=>N!==A)}))}function h(A){let M=r.get();if(!M)return;let N=M.chips[A]===!1;i(()=>({chips:{[A]:N}}))}function T(A){let M=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${M.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${M.map(N=>{let le=$i(N,A);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${le}`}
                  data-label=${N}
                  data-state=${le}
                  @click=${()=>u(N)}
                >
                  ${N}
                </button>`})}
            </div>`}
      </section>
    `}function S(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${A.hidden_prefixes.map(M=>c`<span class="display-settings__prefix">
                ${M}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${M} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(M)}
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
            @input=${M=>{a=String(M.target.value||"")}}
          />
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function E(A){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Iu.map(([M,N])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${M}
                  .checked=${A.chips[M]!==!1}
                  @change=${()=>h(M)}
                />
                <span>${N}</span>
              </label>`)}
        </div>
      </section>
    `}function B(){let A=r.get();Me(c`
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
            ${A?c`${T(A)} ${S(A)}
                ${E(A)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let w=!1,P=()=>{w=!1};o.addEventListener("close",P),o.addEventListener("cancel",P);let X=null;r.subscribe&&(X=r.subscribe(()=>{w&&B()}));function D(){w||(a="",w=!0,B(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function R(){w&&(w=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:D,close:R,destroy(){w=!1,o.removeEventListener("close",P),o.removeEventListener("cancel",P),X&&(X(),X=null),o.remove()}}}function Si(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,f="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Ai(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ti(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Du={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ei=160;function Ou(e){return e.length>Ei?`${e.slice(0,Ei)}\u2026`:e}function Wn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let k=u();return typeof k.revision=="number"?k.revision:0}function f(){let k=n?n.get():null;return!k||typeof k.revision!="number"?null:{revision:k.revision,presets:Array.isArray(k.presets)?k.presets:[]}}function h(k){n&&k&&typeof k.revision=="number"&&Array.isArray(k.presets)&&n.set({revision:k.revision,presets:k.presets})}function T(k){k&&k.queue&&r&&r.set(k.queue)}function S(){return u().runner_catalog??null}let E=null;function B(){if(E!==null)return E;let k=u().default_exec_preset_id;return typeof k=="string"&&k.length>0?k:null}async function w(k){if(!s)return;let H=f();if(!H)return;E=k||"";let U=R(k);if(se(),!U.viable){J(U.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let V=await s("worker-queue-set-default-exec-preset",{preset_id:k||null,expected_queue_revision:p(),expected_preset_revision:H.revision});if(T(V),V&&V.presets&&n&&n.set(V.presets),V&&V.conflict){J("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(V&&V.applied){E=null,se();return}J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function P(k){i={id:k.id,name:k.name,settings:{...k.settings||{}}},M(),l=!1,se()}function X(){i={id:null,name:"",settings:{}},l=!1,se()}function D(k){let H=k&&k.settings&&typeof k.settings=="object"?k.settings:{},U=V=>typeof H[V]=="string"?H[V]:V==="impl_runtime"&&typeof H.impl_model=="string"&&Xt(S(),H.impl_model)||"";return Or({selectedOf:U,effectiveOf:U,runner_catalog:S()}).some(V=>V.groups.some(ne=>ne.options.some(ye=>ye.value===V.selected&&ye.label.endsWith("(\uBE44\uD638\uD658)"))))}function R(k){if(!k)return{viable:!0,missing:!1,incompatible:!1,preset:null};let U=f()?.presets.find(ne=>ne.id===k);if(!U||U.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let V=U.compatible===!1||D(U);return{viable:!V,missing:!1,incompatible:V,preset:U}}function A(){let k=i?.settings.orchestration_model;return typeof k!="string"?null:Xt(S(),k)}function M(){if(!i)return;let k=Hn({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},S(),A());for(let H of["impl_runtime","impl_model","impl_effort"])k[H]?i.settings[H]=k[H]:delete i.settings[H]}function N(k){let H=k&&k.settings&&typeof k.settings=="object"?k.settings:{},U=Dr.filter(ne=>typeof H[ne]=="string").length,V=Dr.filter(ne=>typeof H[ne]=="string").map(ne=>`${Bs[ne]?.title||ne}: ${H[ne]}`);return{count:`${U}/12 \uC9C0\uC815`,choices:V.length>0?V.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function le(k){if(!s||!window.confirm(`\u201C${k.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let H=f();if(H)try{let U=await s("exec-preset-delete",{expected_revision:H.revision,id:k.id});h(U),U&&U.conflict&&J("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function xe(k=!1){if(!s||!i)return;let H=f();if(!H)return;let U=k||i.id===null,V={expected_revision:H.revision,...U?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let ne=await s(U?"exec-preset-create":"exec-preset-update",V);if(h(ne),ne&&ne.conflict){l=!0,se();return}if(ne&&ne.applied){i=null,l=!1,se();return}J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{J("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function me(k){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${js(k.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${k.key}
        ?disabled=${k.disabled}
        @change=${H=>{if(!i)return;let U=H.target.value;U?i.settings[k.key]=U:delete i.settings[k.key],(k.key==="impl_runtime"||k.key==="impl_model"||k.key==="impl_effort"||k.key==="orchestration_model")&&M(),l=!1,se()}}
      >
        ${zn(k.groups,k.selected,Us[k.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function _e(){if(!i)return"";let k=ne=>typeof i?.settings[ne]=="string"?i.settings[ne]:"",H=Or({selectedOf:k,effectiveOf:k,runner_catalog:S(),controller_runtime:A()}),U=f(),V=i.id!==null&&U!==null&&!U.presets.some(ne=>ne.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${ne=>{i&&(i.name=ne.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${V?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${H.map(me)}
      <div class="exec-preset-editor__actions">
        ${V?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{xe(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{xe(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,se()}}
        >
          취소
        </button>
      </div>
    </div>`}function Se(){let k=f(),H=k?k.presets.filter(U=>U?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${X}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${k===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:H.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:H.map(U=>{let V=N(U),ne=typeof U.reference_count=="number",ye=ne?U.reference_count:null,Oe=Array.isArray(U.reference_summary)?U.reference_summary.map(Xe=>Xe?.display_name||Xe?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${U.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${U.name}</strong>
                  <span>${V.count}</span>
                  <span data-preset-references=${U.id}
                    >${ne?`\uCC38\uC870 ${ye}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${D(U)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${V.choices}</small>
                  ${Oe?c`<small data-preset-impact=${U.id}
                        >업데이트 영향: ${Oe}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${U.id}
                    @click=${()=>P(U)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${U.id}
                    ?disabled=${ye===null||ye>0||U.reference_scan_complete===!1}
                    title=${ye===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":ye>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":U.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{le(U)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${_e()}
    </section>`}function Ne(){let k=f(),H=k?k.presets.filter(Oe=>Oe?.migration_pending!==!0):[],U=B()||"",V=R(U),ne=V.preset,ye=ne?N(ne):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${U}
        ?disabled=${k===null}
        @change=${Oe=>{w(Oe.target.value)}}
      >
        <option value="" ?selected=${U===""}>
          없음 — harness 기본값
        </option>
        ${U&&V.missing?c`<option value=${U} ?selected=${!0}>
              ${U} (선택한 프리셋 없음)
            </option>`:""}
        ${H.map(Oe=>c`<option
              value=${Oe.id}
              ?selected=${Oe.id===U}
              ?disabled=${Oe.compatible===!1}
            >
              ${Oe.name}${Oe.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${ne?c`<p data-workspace-preset-summary>
            ${ye?.count} · ${ye?.choices}
            ${V.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${V.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:V.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ie(){let k=u().workspace_info;return k&&typeof k=="object"?k:{}}function ze(k,H){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${k}"
      >${H}</span
    >`}function De(k){let H=k?Ti(k.cmd):"",U=k?Ai(k.timeout_ms):"",V=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${H?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${H}</span>
            ${ze("config","config")}
            ${U?c`<span class="exec-defaults__vd-meta"
                  >timeout ${U}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${V}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function te(k){let H=k?Ti(k.cmd):"",U=k?Ai(k.timeout_ms):"",V=U?`timeout ${U} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",ne=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${H?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${H}</span>
            ${ze("config","config")}
            ${k.detached===!0?ze("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${V}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${ne}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function ce(k){if(!k||typeof k!="object")return"";let H=Du[String(k.outcome)];if(!H)return"";let U=k.outcome==="failed"&&k.reason?`${H.label} \xB7 ${k.reason}`:H.label,V=[vt(k.at),typeof k.bead_id=="string"?k.bead_id:"",typeof k.base_sha=="string"?k.base_sha.slice(0,7):""].filter(Oe=>Oe.length>0).join(" \xB7 "),ne=typeof k.detail=="string"&&k.detail.length>0?Ou(k.detail):"",ye=typeof k.log_path=="string"&&k.log_path.length>0?k.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${ze(H.modifier,U)}
        ${V?c`<span class="exec-defaults__vd-meta">${V}</span>`:""}
      </div>
      ${ne?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${ne}</code>
          </div>`:""}
      ${ye?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${ye}</code>
          </div>`:""}
    </div>`}let be=!1,j=!1,re=!1,de=null;async function Ee(){if(s){j=!0,re=!1,se();try{let k=await Promise.resolve(s("get-worker-system-prompt",{}));!k||typeof k!="object"||Array.isArray(k)?re=!0:de=k}catch{re=!0}finally{j=!1,se()}}}function ue(){if(be=!be,be&&!de){Ee();return}se()}function Ae(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${be?"true":"false"}
          @click=${ue}
        >
          ${be?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${be?z():""}
    </section>`}function z(){let k=Ir({loading:j,error:re});if(k)return k;if(!de)return"";let H=Array.isArray(de.variants)?de.variants:[];return c`<div class="exec-defaults__sp-body">
      ${de.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${de.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${H.map(U=>c`<div class="exec-defaults__sp-variant" data-variant=${U.key}>
            <div class="exec-defaults__sp-cond">${U.condition}</div>
            ${Zt(U.label,U.system_prompt)}
          </div>`)}
    </div>`}function O(k){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${De(k.verify_cmd)} ${te(k.deploy_cmd)}
      ${ce(k.last_deploy)}
    </section>`}function se(){if(Me(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${q}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Se()} ${Ne()}
            ${O(Ie())}
            ${Ae()}
          </div>
        </div>
      `,a),E!==null){let k=a.querySelector("[data-workspace-preset-select]");k&&(k.value=E)}}let ve=!1,Te=()=>{ve=!1},je=k=>{k.target===k.currentTarget&&q()};a.addEventListener("close",Te),a.addEventListener("cancel",Te),a.addEventListener("click",je);let we=null;r&&r.subscribe&&(we=r.subscribe(()=>{ve&&se()}));let F=null;n&&n.subscribe&&(F=n.subscribe(()=>{ve&&se()}));function G(){ve||(ve=!0,se(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function q(){ve&&(ve=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:G,close:q,destroy(){ve=!1,a.removeEventListener("close",Te),a.removeEventListener("cancel",Te),a.removeEventListener("click",je),we&&(we(),we=null),F&&(F(),F=null),a.remove()}}}function Pr(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${vt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Pu(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function nn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Gn(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function Ut(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,f)=>(p.requested_at||0)-(f.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Pu(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function Qt(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?c`<code>백업: ${n}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}function Gs(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=mt(e.usage),s=Mt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!a,l=i?Et(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=c`<span class="worker-mini__title">${e.title}</span>`,T=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",S=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",E=r.map(le=>le===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${le}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${le===e.completion_badge&&e.completion_title||""}
          >${le}</span
        >`),B=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",w=n.length>0?n.map(le=>c`<span class="worker-usage" title=${le.tooltip}
              >${le.label}</span
            >`):s?c`<span class="worker-usage" title=${Rr(e.usage)}
            >${s}</span
          >`:"",P=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",X=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",D=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",R=e.discard,A=R?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${R?.attempt_id||""}
          data-operation-id=${R?.operation?.operation_id||""}
          data-discard-mode=${R?.confirmation||"unmerged"}
          ?disabled=${R?!R.enabled:e.discard_enabled===!1}
          title=${R?R.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${R?.label||"\uD3D0\uAE30"}
        </button>`:"",M=e.revise_action?c`<button
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
        </button>`:"",N=!!(s||o||e.merge_action||e.cancel_action||e.discard_action||R?.operation||e.revise_action);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${p}${f}${h}</div>
          <div class="worker-mini__row2">
            ${w}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${vt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${E}${P}
            <span class="worker-mini__actions"
              >${X}${D}${A}</span
            >
            ${Pr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${p}${f}${T}${S}${E}${B}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${N?c`<div class="worker-mini__foot">
                  ${w}${P}
                  <span class="worker-mini__actions"
                    >${X}${D}${A}${M}</span
                  >
                  ${Qt(e)}
                </div>`:""}
            ${Pr(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${f}${h}${T}${S}${E}${B}${w}${P}${X}${D}${A}
            </div>
            ${Qt(e)} ${Pr(e)}`}
  </div>`}function Mu(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${r?Sn(r,e.status):""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${e.reason?c`<span
            class="worker-card__reason${i?" worker-card__reason--danger":""}"
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
    ${Pr(e)}
  </div>`}function jt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Mu(n):Gs(n))}
          </div>`}
  </section>`}var Ci=160;function Yn(e){return e.length>Ci?`${e.slice(0,Ci)}\u2026`:e}function Nu(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Yn(e.command)}</code>`:""}
  </div>`}function Fu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function qu(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Bu(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Yn(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Yn(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Ys(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ri(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
                title="이 실패를 처리 완료로 표시하고 배너를 닫습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${Nu(e.failure.cause_detail)}
          ${Qt({discard:e.failure.discard})}
        </div>`:""}
    ${t.map(r=>c`<div
          class="worker-banner worker-banner--cleanup"
          role="alert"
          data-bead-id=${r.bead_id}
        >
          ⚠ ${r.bead_id} 머지 완료 — 머지 후 정리가 <b>${r.step}</b> 단계에서
          멈췄습니다 (${r.reason}). 1회 자동 재시도 후에도 실패했습니다 — [AI
          정리]로 진단하거나 정리를 사람이 마무리하세요.
          <button
            type="button"
            class="worker-banner__cleanup-diagnose"
            data-bead-id=${r.bead_id}
            ?disabled=${r.diagnosis_pending===!0}
            title="정리 실패 원인을 AI 세션으로 분류합니다"
          >
            AI 정리
          </button>
          ${Bu(r.diagnosis)}
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Yn(r.detail)}</code>
              </div>`:""}
          ${qu(r.log_path)} ${Fu(r.output_tail)}
        </div>`)}
  </div>`}function Uu(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Ys(t-e.started_at):"\u2014",a=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=mt(e.usage),l=Mt(e.usage),u=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,f=e.attempt_id&&e.attempt_id===r,h=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${f?" rtile--sel":""}${s?" rtile--paused":""}${n?" rtile--failed":""}"
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
      <span class="rtile__elapsed">${o}</span>
      ${n?c`<button
              type="button"
              class="rtile__resume"
              ?disabled=${e.resume_eligible===!1}
              title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
              aria-label="이어하기"
            >
              ↻ 이어하기
            </button>
            ${h}
            <button
              type="button"
              class="rtile__dismiss"
              title="실패 기록 닫기"
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
            ${s?c`<button
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
            ${h}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${e.current_child?c`<div class="rtile__child" title="현재 진행중 child">
          └ ${e.current_child}
        </div>`:""}
    ${a||i.length>0||l||u||p?c`<div class="rtile__meta">
          ${u?c`<span class="worker-mini__badge">${u}</span>`:""}
          ${p?c`<span
                class="worker-mini__badge"
                title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                >${p}</span
              >`:""}
          ${a?c`<span class="rtile__runner">${a}</span>`:""}
          ${i.length>0?i.map(T=>c`<span class="worker-usage" title=${T.tooltip}
                    >${T.label}</span
                  >`):l?c`<span
                  class="worker-usage"
                  title=${Rr(e.usage)}
                  >${l}</span
                >`:""}
        </div>`:""}
    ${Pr(e)} ${Qt(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Vs(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Uu(s,t,r))}
  </div>`}function ir(e){return c`<svg
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
  </svg>`}function Ks(){return ir(Wt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Zs(){return ir(Wt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ii(){return ir(Wt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Li(){return ir(Wt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Di(){return ir(Wt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Oi(){return ir(Wt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Pi(){return ir(Wt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Mi(){return ir(Wt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var sn=1,ju=6e4,zu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Hu=new Set(["auto_merge","merged","merge","done"]),Ni={running:3,paused:2,failed:1};function Wu(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Gu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Ni[u.run_state],h=Ni[i];if(f>h||f===h&&(u.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Lt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Fi(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Xs(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let w of s)w&&typeof w.root_dir=="string"&&a.set(w.root_dir,w);let i=[],l=[],u=[],p=[],f=[],h=new Map;for(let w of n){if(!w||typeof w.root_dir!="string")continue;let P=w.root_dir,X=w.name||P,D=a.get(P),R=D&&typeof D.revision=="number"?D.revision:typeof w.revision=="number"?w.revision:0,A=Ct(w.attempts),M=Ct(w.bead_titles),N=Ct(w.pr_observations),le=Ct(w.admission),xe=Ct(w.revise_parked),me=Ct(w.merge_queue_state),_e=Ct(w.cleanup_failed),Se=Ct(w.discard_operations),Ne=Array.isArray(w.merge_queue)?w.merge_queue:[],Ie=new Set(Ne.filter(j=>j&&typeof j.bead_id=="string").map(j=>j.bead_id)),ze=Array.isArray(w.queue)?w.queue:[],De=Array.isArray(w.done)?w.done:[],te=new Map;for(let j of De)j&&typeof j.bead_id=="string"&&typeof j.added_at=="number"&&te.set(j.bead_id,j.added_at);let ce=j=>({id:j,title:M[j]||j,root_dir:P,workspace_name:X,expected_revision:R,draggable:!1}),be=new Set;for(let[j,re]of Gu(A,te))be.add(j),l.push({...ce(j),lane:"running",attempt_id:re.attempt_id,run_state:re.run_state,can_pause:re.can_pause,can_resume:re.can_resume,started_at:re.started_at,last_event_at:re.last_event_at,model:re.model,usage:re.usage,discard:Ut(Se,j,{attempt_id:re.attempt_id}),badges:re.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:re.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:re.run_state==="failed"});for(let j of Array.isArray(w.pr_wait)?w.pr_wait:[]){let re=j&&j.bead_id;if(typeof re!="string"||be.has(re))continue;be.add(re);let de=Ct(N[re]),Ee=Ct(de.pr),ue=de.gate?Ct(de.gate):null,Ae=Ie.has(re),z=me.active===re,O=j.external===!0,se=_e[re]||null,ve=!!ue&&ue.base_badge==="\uCDA9\uB3CC",Te=!!se&&!!ue&&ue.tier==="merged",je=O&&!!ue&&ue.tier==="merged",we=Ut(Se,re,{external:O,merge_active:z,merge_queued:Ae,merged:!!se||ue?.tier==="merged"}),F=!!we.operation;u.push({...ce(re),lane:"pr_wait",pr_number:typeof Ee.number=="number"?Ee.number:null,pr_url:typeof Ee.url=="string"?Ee.url:void 0,external:O,usage:Lt(A,re),badges:se?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!se,reason:se?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!Ae,merge_enabled:!F&&(ue?.enabled===!0||ve||Te||je),merge_label:je?"\uC815\uB9AC":ve&&!Te?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:F?we.error?`\uD3D0\uAE30 \uC2E4\uD328: ${we.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${we.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:je?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Te?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":ve?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":ue?.enabled===!0?`\uBA38\uC9C0 (${ue.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${ue?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Ae,cancel_enabled:!z,discard:we,discard_action:we.action,discard_enabled:we.enabled,discard_title:we.title})}for(let j=0;j<ze.length;j++){let re=ze[j],de=re&&re.bead_id;if(typeof de!="string"||be.has(de))continue;be.add(de);let Ee=xe[de],ue=Ut(Se,de),Ae=ue.operation?ue:null,z={...ce(de),lane:"queue",draggable:!Ae,discard:Ae||void 0,reason:Fi(le,de),queue_position:j+1,queue_index:j,queue_length:ze.length,badges:Ee?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ee,revise_action:!!Ee,revise_enabled:!!Ee&&!Ae,revise_title:Ee?Ee.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ee.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(z);let O=h.get(P);O?O.push(z):h.set(P,[z])}for(let j of Array.isArray(w.runnable)?w.runnable:[]){let re=j&&j.bead_id;typeof re!="string"||be.has(re)||(be.add(re),i.push({...ce(re),title:j.title||M[re]||re,lane:"runnable",draggable:!0,reason:Fi(le,re),created_at:j.created_at??void 0,updated_at:j.updated_at??void 0,labels:Array.isArray(j.labels)?j.labels:[],spec_reviewer:typeof j.spec_reviewer=="string"?j.spec_reviewer:void 0,plan_state:j.plan_state==="approved"||j.plan_state==="authored"?j.plan_state:"none",workflow:j.route?{route:j.route,chips:{route:j.route}}:null,place_index:ze.length}))}for(let j of De){let re=j&&j.bead_id;if(typeof re!="string"||be.has(re)||(be.add(re),o!==void 0&&typeof j.added_at=="number"&&j.added_at<o))continue;let de=Wu(A,re);f.push({...ce(re),lane:"done",done:!0,usage:Lt(A,re),done_at:typeof j.added_at=="number"?j.added_at:void 0,done_kind:de&&typeof de.done_kind=="string"?de.done_kind:null})}}let T=new Map;s.forEach((w,P)=>{w&&typeof w.root_dir=="string"&&T.set(w.root_dir,P)});let S=r&&r.running_sort==="repo"?"repo":"started";l.sort((w,P)=>{if(S==="repo"){let R=T.get(w.root_dir)??Number.MAX_SAFE_INTEGER,A=T.get(P.root_dir)??Number.MAX_SAFE_INTEGER;if(R!==A)return R-A}let X=typeof w.started_at=="number"&&Number.isFinite(w.started_at)?w.started_at:null,D=typeof P.started_at=="number"&&Number.isFinite(P.started_at)?P.started_at:null;return X!==null&&D!==null&&X!==D?X-D:X===null&&D!==null?1:X!==null&&D===null?-1:w.id.localeCompare(P.id)}),f.sort((w,P)=>(P.done_at??0)-(w.done_at??0));let E=s.length>0?s:n.map(w=>({root_dir:w&&w.root_dir,name:w&&w.name,auto_advance:w&&w.auto_advance,auto_merge:w&&w.auto_merge,slots:w&&w.slots,revision:w&&w.revision,exec_defaults:w&&w.exec_defaults,default_exec_preset_id:w&&w.default_exec_preset_id,runner_catalog:w&&w.runner_catalog})),B=[];for(let w of E)!w||typeof w.root_dir!="string"||B.push({root_dir:w.root_dir,name:w.name||w.root_dir,auto_advance:w.auto_advance===!0,auto_merge:w.auto_merge===!0,slots:typeof w.slots=="number"&&w.slots>=sn?w.slots:sn,revision:typeof w.revision=="number"?w.revision:0,exec_defaults:Ct(w.exec_defaults),default_exec_preset_id:typeof w.default_exec_preset_id=="string"?w.default_exec_preset_id:null,runner_catalog:Ct(w.runner_catalog),items:h.get(w.root_dir)||[]});return{runnable:i,queue:p,queue_groups:B,running:l,pr_wait:u,done:f,automation:{total:B.length,both_on:B.filter(w=>w.auto_advance&&w.auto_merge).length}}}function Yu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<ju;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${vt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Et(e,t)}</span
        >`}</span
  >`}function on(e){return c`<div class="mon-c__title">${e.title}</div>`}function an(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Vn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Qs(e){let t=mt(e.usage),r=Mt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Rr(e.usage)}
        >${r}</span
      >`:""}function Js(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function Vu(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Zs()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Ks()}
        </button>`}
    ${e.discard?.action?c`<button
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
    ${e.run_state==="failed"?c`<button
          type="button"
          class="mon-op mon-op--dismiss"
          aria-label="실패 기록 닫기"
          title="실패 기록 닫기"
        >
          ${Li()}
        </button>`:""}
  </span>`}function Ku(e,t){let r=typeof e.started_at=="number"?Ys(t-e.started_at):"";return c`${on(e)}
    <div class="mon-c__meta">
      ${Js(e)}${Yu(e.last_event_at,t)}${an(e)}${Vn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Qs(e)}${Vu(e)}${Qt(e)}
    </div>`}function Zu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.spec_reviewer=="string"?e.spec_reviewer:"",o=e.plan_state==="approved"?"plan \u2713":e.plan_state==="authored"?"plan \u270E":"plan \u2013",a=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),i=Et(e.updated_at);return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${an(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${s?c`<span
            class="ctl-chip mon-c__review${s==="skipped"?" mon-c__review--dim":""}"
            >spec:${s}</span
          >`:""}
      ${n==="full_plan"?c`<span
            class="ctl-chip mon-c__plan${e.plan_state==="none"?" mon-c__review--dim":""}"
            >${o}</span
          >`:""}
      ${xn(e.labels,null).map(l=>c`<span class="ctl-chip ctl-chip--label">${l}</span>`)}
      ${Vn(e)}
      ${i?c`<span title=${`\uC218\uC815 ${vt(e.updated_at)}`}
            >수정 ${i}</span
          >`:""}
      ${e.reason?c`<span
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
    </div>`}function Xu(e){let t=!!e.discard?.operation;return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${an(e)}
      ${Js(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
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
        ${t?c`<button
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
    ${Qt(e)}
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
        </div>`:""}`}function Qu(e){let t=!!(Mt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Vn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Js(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Qs(e)}
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
                data-attempt-id=${e.discard?.attempt_id||""}
                data-operation-id=${e.discard?.operation?.operation_id||""}
                data-discard-mode=${e.discard?.confirmation||"unmerged"}
                ?disabled=${e.discard_enabled===!1}
                title=${e.discard_title}
              >
                ${e.discard?.label||"\uD3D0\uAE30"}
              </button>`:""}
          ${Qt(e)}
        </div>`:""}`}function Ju(e,t){let r=e.done_kind||"",n=r?zu[r]||r:"",s=Et(e.done_at,t);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Vn(e)}
      ${n?c`<span
            class="mon-live__kind${Hu.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Qs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${vt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function qi(e,t){return e.lane==="running"?Ku(e,t):e.lane==="runnable"?Zu(e):e.lane==="queue"?Xu(e):e.lane==="pr_wait"?Qu(e):Ju(e,t)}function Bi(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Zs():Ks()}
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
        ${Di()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Oi()}
        <span class="mon-ctl__label">슬롯</span>
        <input
          type="number"
          class="mon-slots__input"
          min=${sn}
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
        ${Pi()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Ui(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=e.running_sort==="repo"?"repo":"started",o=Bt.find(i=>i.value===e.done_range)?.label||"",a=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ii():Mi()}
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
        ${Bt.map(i=>c`<option
              value=${i.value}
              ?selected=${e.done_range===i.value}
            >
              ${i.label}
            </option>`)}
      </select>
      ${a.map(i=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${i.tooltip}
            >${o} 완료 · 누적 ${i.label}</span
          >`)}
    </div>
  </div>`}function ji(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function zi(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return mt(En(t));let r={};for(let i of Yt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Yt){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Mt(r):null}var Wi="bdui.monitor.done-range",Gi="bdui.monitor.running_sort";function ep(){try{let e=window.localStorage.getItem(Wi);return Gt(e)?e:It}catch{return It}}function tp(e){try{window.localStorage.setItem(Wi,e)}catch{}}function rp(){try{return window.localStorage.getItem(Gi)==="repo"?"repo":"started"}catch{return"started"}}function np(e){try{window.localStorage.setItem(Gi,e)}catch{}}var Yi="tab:monitor:pipeline",sp=1e3,op=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function Hi(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${qi(e,t)}
  </div>`}function Vi(e,t){let r=Ze("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),p=t.confirm||(F=>typeof globalThis.confirm!="function"||globalThis.confirm(F)),f=ep(),h=rp();function T(){let F=Bt.find(G=>G.value===f);return F?F.label:""}let S=document.createElement("div");S.className="mon",e.appendChild(S);let E=Xs(null,null),B=null,w=new Map,P=new Set;function X(F){return E.queue_groups.find(G=>G.root_dir===F)||null}let R=Wn(e,{queueStore:{get(){if(!B)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let F=w.get(B);if(F)return F;let G=X(B),q=s&&s.get?s.get():null,k=(Array.isArray(q)?q:[]).find(H=>H&&H.root_dir===B);return{revision:G?G.revision:0,exec_defaults:G?G.exec_defaults:{},default_exec_preset_id:G?G.default_exec_preset_id:null,runner_catalog:G?G.runner_catalog:null,workspace_info:k?k.workspace_info:void 0}},set(F){B&&w.set(B,F);for(let G of Array.from(P))G()},subscribe(F){return P.add(F),()=>P.delete(F)}},presetStore:a,transport:o?(F,G)=>o(F,F==="worker-queue-set-default-exec-preset"||F==="get-worker-system-prompt"?{...G||{},root_dir:B}:G):void 0,getWorkspacePath:()=>B||void 0}),A=null,M=null;async function N(F,G,q,k){if(!o||!q)return null;let H=await o(F,{...G,root_dir:q,expected_revision:k});if(H&&H.conflict){let U=H.queue&&typeof H.queue.revision=="number"?H.queue.revision:k;H=await o(F,{...G,root_dir:q,expected_revision:U})}return H&&H.queue&&q&&w.set(q,H.queue),H}async function le(F,G,q){let k=await N("worker-discard",F,G,q);if(k&&k.discarded===!0){J(Gn(k),"success",5e3);return}if(k&&k.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${k.reason}`,"error");return}if(k&&k.accepted&&k.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(k&&k.accepted){J(`\uD3D0\uAE30 \uC9C4\uD589: ${k.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}k&&!k.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function xe(F,G,q){return!o||!q?null:await o(F,{...G,root_dir:q})}async function me(F){if(!o||!F&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let G=await o("monitor-auto-toggle",{on:F}),q=G&&Array.isArray(G.failed)?G.failed:[];q.length>0&&J(`\uC790\uB3D9\uD654 ${F?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${q.map(k=>k.root_dir).join(", ")}`,"error",3200)}async function _e(){let F=new Map;for(let G of E.pr_wait)F.has(G.root_dir)||F.set(G.root_dir,G.expected_revision);for(let[G,q]of F)await N("worker-merge-queue-add-all",{},G,q)}let Se=null,Ne=!1,Ie=null;function ze(){Ie!==null&&clearTimeout(Ie),Ie=setTimeout(()=>{Ie=null,Ne=!1},0)}function De(F){let G=F.target;return typeof G?.closest=="function"?G.closest(".mon-group"):null}function te(F){let G=De(F);return!G||!Se?null:(G.getAttribute("data-root-dir")||"")===Se.root_dir?G:null}function ce(){for(let F of Array.from(S.querySelectorAll(".mon-group--drag-over")))F.classList.remove("mon-group--drag-over")}function be(F){let G=F.target,q=typeof G?.closest=="function"?G.closest('.mon-card[draggable="true"]'):null;if(q){Se={bead_id:q.getAttribute("data-issue-id")||"",lane:q.getAttribute("data-lane")||"",root_dir:q.getAttribute("data-root-dir")||"",revision:Number(q.getAttribute("data-revision")||0)||0,queue_index:Number(q.getAttribute("data-queue-index")),queue_length:Number(q.getAttribute("data-queue-length")),place_index:Number(q.getAttribute("data-place-index"))},Ne=!0;try{F.dataTransfer?.setData("text/plain",Se.bead_id),F.dataTransfer&&(F.dataTransfer.effectAllowed="move")}catch{}}}function j(F){let G=te(F);G&&(F.preventDefault(),F.dataTransfer&&(F.dataTransfer.dropEffect="move"),G.classList.add("mon-group--drag-over"))}function re(F){De(F)?.classList.remove("mon-group--drag-over")}function de(){Se=null,ce(),ze()}function Ee(F){let G=te(F),q=Se;if(Se=null,ce(),!G||!q||!q.bead_id)return;F.preventDefault();let k=F.target,H=typeof k?.closest=="function"?k.closest('.mon-card[data-lane="queue"]'):null,U=H&&G.contains(H)?Number(H.getAttribute("data-queue-index")):NaN;if(q.lane==="runnable"){let ye=Number.isFinite(U)?U:q.place_index;if(!Number.isFinite(ye))return;N("worker-queue-place",{bead_id:q.bead_id,index:ye},q.root_dir,q.revision);return}if(q.lane!=="queue"||H&&H.getAttribute("data-issue-id")===q.bead_id)return;let V=q.queue_index,ne=Number.isFinite(U)?V>U?U:U-1:q.queue_length-1;!Number.isFinite(ne)||ne<0||ne===V||N("worker-queue-reorder",{bead_id:q.bead_id,to_index:ne},q.root_dir,q.revision)}function ue(F){let G={runnable:E.runnable,queue:E.queue,running:E.running,pr_wait:E.pr_wait,done:E.done};return c`${Ui({automation:E.automation,counts:{running:E.running.length,queue:E.queue.length,pr_wait:E.pr_wait.length},running_sort:h,done_range:f,token_total:zi(E.done),token_tooltip:ji(T())})}
      <div class="worker-lanes mon-lanes">
        ${op.map(q=>{let k=G[q.lane],H=q.lane==="queue"?E.queue_groups.length>0?c`${E.queue_groups.map(U=>c`<div
                        class="mon-group"
                        data-root-dir=${U.root_dir}
                      >
                        ${Bi(U)}
                        <div class="mon-group__list">
                          ${U.items.map(V=>Hi(V,F))}
                        </div>
                      </div>`)}`:void 0:k.length>0?c`${k.map(U=>Hi(U,F))}`:void 0;return jt({id:`monitor-${q.lane}`,lane:q.pane,title:q.lane==="done"?`\uC644\uB8CC\xB7${T()}`:q.title,items:k,empty:q.empty,body:H,live:q.lane==="running"&&k.length>0,header_control:q.lane==="pr_wait"&&k.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function Ae(){let F=s&&s.get?s.get():null,G=s&&s.getWorkspacesState?s.getWorkspacesState():[],q=u();E=Xs(F,G,{done_since:$r(f,q),running_sort:h}),Me(ue(q),S)}function z(F,G){let q=i?i():void 0;if(!G||!q||G===q||!l){n(F);return}l(G).then(()=>{n(F)}).catch(k=>{r("workspace switch for %s failed: %o",G,k)})}function O(F){return{root_dir:F.getAttribute("data-root-dir")||"",revision:Number(F.getAttribute("data-revision")||0)||0}}function se(F,G){let{root_dir:q,revision:k}=O(F),H=F.getAttribute("data-issue-id")||"",U=G.dataset.attemptId||F.getAttribute("data-attempt-id")||"",V=G.classList;if(V.contains("worker-card__place")){N("worker-queue-place",{bead_id:H,index:Number(F.getAttribute("data-place-index")||0)||0},q,k);return}if(V.contains("mon-op--up")||V.contains("mon-op--down")){let ne=Number(F.getAttribute("data-queue-index")||0)||0,ye=V.contains("mon-op--up")?ne-1:ne+1;if(ye<0)return;N("worker-queue-reorder",{bead_id:H,to_index:ye},q,k);return}if(V.contains("mon-op--remove")){N("worker-queue-remove",{bead_id:H},q,k);return}if(V.contains("mon-op--pause")){xe("worker-attempt-pause",{attempt_id:U},q);return}if(V.contains("mon-op--discard")){if(!p(nn(H,"unmerged")))return;le({bead_id:H,...U?{attempt_id:U}:{},...G.dataset.operationId?{operation_id:G.dataset.operationId}:{}},q,k);return}if(V.contains("mon-op--resume")){N("worker-attempt-resume",{attempt_id:U},q,k);return}if(V.contains("mon-op--dismiss")){N("worker-attempt-dismiss",{attempt_id:U},q,k);return}if(V.contains("worker-mini__merge")){N("worker-merge-queue-add",{bead_id:H},q,k);return}if(V.contains("worker-mini__merge-cancel")){N("worker-merge-queue-remove",{bead_id:H},q,k);return}if(V.contains("worker-mini__discard")){let ne=G.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(nn(H,ne)))return;le({bead_id:H,...U?{attempt_id:U}:{},...G.dataset.operationId?{operation_id:G.dataset.operationId}:{}},q,k);return}if(V.contains("worker-mini__revise-fix")){N("worker-revise-fix",{bead_id:H},q,k);return}V.contains("worker-mini__revise-approve")&&N("worker-revise-approve",{bead_id:H},q,k)}function ve(F){let G=Ne;Ne=!1;let q=F.target;if(!q||typeof q.closest!="function"||q.closest("dialog")||q.closest("a"))return;let k=q.closest(".mon-running-sort");if(k){F.preventDefault(),h=k.getAttribute("data-sort")==="repo"?"repo":"started",np(h),Ae();return}let H=q.closest(".mon-auto-all");if(H){F.preventDefault(),me(H.getAttribute("data-on")==="true");return}if(q.closest(".mon-merge-all")){F.preventDefault(),_e();return}let V=q.closest(".mon-ctl--advance");if(V){F.preventDefault();let{root_dir:et,revision:Qe}=O(V);N("worker-queue-toggle",{on:V.getAttribute("data-on")==="true"},et,Qe);return}let ne=q.closest(".mon-ctl--merge-auto");if(ne){F.preventDefault();let{root_dir:et,revision:Qe}=O(ne);N("worker-merge-auto-toggle",{on:ne.getAttribute("data-on")==="true"},et,Qe);return}let ye=q.closest(".mon-ctl--exec");if(ye){F.preventDefault(),B=ye.getAttribute("data-root-dir")||null,w.delete(B||""),R.open();return}let Oe=q.closest(".mon-card");if(!Oe)return;let Xe=q.closest("button");if(Xe){F.preventDefault(),se(Oe,Xe);return}let Ye=Oe.getAttribute("data-issue-id");Ye&&!G&&(F.preventDefault(),z(Ye,Oe.getAttribute("data-root-dir")||""))}function Te(F){let G=F.target;if(!G||typeof G.closest!="function")return;let q=G.closest(".mon-done-range");if(q){f=Gt(q.value)?q.value:It,tp(f),Ae();return}let k=G.closest(".mon-slots__input");if(!k)return;let{root_dir:H,revision:U}=O(k),V=Number(k.value);if(!Number.isFinite(V))return;let ne=Math.max(sn,Math.floor(V));N("worker-queue-set-slots",{slots:ne},H,U)}e.addEventListener("click",ve),e.addEventListener("change",Te),e.addEventListener("dragstart",be),e.addEventListener("dragover",j),e.addEventListener("dragleave",re),e.addEventListener("drop",Ee),e.addEventListener("dragend",de),s&&typeof s.subscribe=="function"&&(A=s.subscribe(()=>{try{w.clear(),Ae();for(let F of Array.from(P))F()}catch{}}));function je(){M!==null&&(clearInterval(M),M=null)}function we(){Ie!==null&&(clearTimeout(Ie),Ie=null)}return{load(){r("load"),Ae(),M===null&&(M=setInterval(()=>{try{Ae()}catch{}},sp))},pause(){je()},clear(){je(),we(),A&&(A(),A=null),e.removeEventListener("click",ve),e.removeEventListener("change",Te),e.removeEventListener("dragstart",be),e.removeEventListener("dragover",j),e.removeEventListener("dragleave",re),e.removeEventListener("drop",Ee),e.removeEventListener("dragend",de),R.destroy(),P.clear(),e.replaceChildren()}}}function Ki(e,t,r){let n=Ze("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${u==="board"?"is-active":""}"
          @click=${o("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${u==="worker"?"is-active":""}"
          @click=${o("worker")}
          >Worker</a
        >
        <a
          href="#/monitor"
          class="ctl-tab ${u==="monitor"?"is-active":""}"
          @click=${o("monitor")}
          >Monitor</a
        >
      </div>
    `}function i(){Me(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),Me(c``,e)}}}var Zi=["bug","feature","task","epic","chore"];function Xi(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Qi=["Critical","High","Medium","Low","Backlog"];function Ji(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function T(){o.replaceChildren();let R=document.createElement("option");R.value="",R.textContent="\u2014 Select \u2014",o.appendChild(R);for(let A of Zi){let M=document.createElement("option");M.value=A,M.textContent=Xi(A),o.appendChild(M)}a.replaceChildren();for(let A=0;A<=4;A+=1){let M=document.createElement("option");M.value=String(A);let N=Qi[A]||"Medium";M.textContent=`${A} \u2013 ${N}`,a.appendChild(M)}}T();function S(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function E(R){s.disabled=R,o.disabled=R,a.disabled=R,i.disabled=R,l.disabled=R,p.disabled=R,f.disabled=R,f.textContent=R?"Creating\u2026":"Create"}function B(){u.textContent=""}function w(R){u.textContent=R}function P(){try{let R=window.localStorage.getItem("beads-ui.new.type");R?o.value=R:o.value="";let A=window.localStorage.getItem("beads-ui.new.priority");A&&/^\d$/.test(A)?a.value=A:a.value="2"}catch{o.value="",a.value="2"}}function X(){let R=o.value||"",A=a.value||"";R.length>0&&window.localStorage.setItem("beads-ui.new.type",R),A.length>0&&window.localStorage.setItem("beads-ui.new.priority",A)}async function D(){B();let R=String(s.value||"").trim();if(R.length===0){w("Title is required"),s.focus();return}let A=Number(a.value||"2");if(!(A>=0&&A<=4)){w("Priority must be 0..4"),a.focus();return}let M=String(o.value||""),N=String(l.value||""),le={title:R};M.length>0&&(le.type=M),String(A).length>0&&(le.priority=A),N.length>0&&(le.description=N),E(!0);try{await t("create-issue",le)}catch{E(!1),w("Failed to create issue");return}X(),E(!1),S()}return r.addEventListener("cancel",R=>{R.preventDefault(),S()}),h.addEventListener("click",()=>S()),p.addEventListener("click",()=>S()),r.addEventListener("keydown",R=>{R.key==="Enter"&&(R.ctrlKey||R.metaKey)&&(R.preventDefault(),D())}),n.addEventListener("submit",R=>{R.preventDefault(),D()}),{open(){n.reset(),B(),P();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){S()}}}var ap=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function el(e){return String(e).padStart(2,"0")}function ip(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function lp(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${el(n.getHours())}:${el(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${ap[n.getMonth()]} ${n.getDate()} ${o}`;return`${ip(r,t)} \xB7 ${i}`}function cp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var tl=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function rl(e){let t=!1,r=null,n=new Map;function s(){Me(c``,e),e.hidden=!0}function o(){let l=tl.filter(p=>n.has(p.key));if(l.length===0){s();return}let u=Date.now();Me(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,T=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map(S=>{let E=typeof S.pct=="number"&&Number.isFinite(S.pct)?S.pct:0,B=Math.min(100,Math.max(0,E)),P=`resets ${lp(S.resetsAt,u)}${h?` \xB7 ${T}`:""}`;return c`<span
                class="usage-meter__window ${cp(B)}"
                style=${`--progress: ${B}%`}
                title=${P}
              >
                <span class="usage-meter__label">${S.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${B}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(tl.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var dp="worker-ineligible";function up(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function nl(e){return up(e).includes(dp)}var pp="tab:worker:ready",fp="tab:worker:blocked",_p="tab:worker:in-progress",ln=1;function sl(e){return rn(e).path.length>0}var il="beads-ui.worker.candidate-filter",eo={show_blocked:!1,spec:"all"};function mp(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let r=Object.values(e),n=new Set;for(let s of r)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&n.add(s.resumed_from);return r.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!n.has(s.attempt_id)))}function gp(){try{let e=window.localStorage.getItem(il);if(!e)return{...eo};let t=JSON.parse(e);if(!t||typeof t!="object")return{...eo};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...eo}}}function hp(e){try{window.localStorage.setItem(il,JSON.stringify(e))}catch{}}function bp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),u=n(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var vp=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],ll="bdui.worker.candidate_sort",yp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Kn="spec";function kp(){try{let e=window.localStorage.getItem(ll);return e==="board"||e==="created"||e==="spec"?e:Kn}catch{return Kn}}function wp(e){try{window.localStorage.setItem(ll,e)}catch{}}var cl="bdui.worker.done-range";function $p(){try{let e=window.localStorage.getItem(cl);return Gt(e)?e:It}catch{return It}}function xp(e){try{window.localStorage.setItem(cl,e)}catch{}}var Sp="(max-width: 640px)",dl="beads-ui.worker.lane-collapsed",cn={queue:!0,done:!0};function Ap(){try{let e=window.localStorage.getItem(dl);if(!e)return{...cn};let t=JSON.parse(e);return!t||typeof t!="object"?{...cn}:{queue:typeof t.queue=="boolean"?t.queue:cn.queue,done:typeof t.done=="boolean"?t.done:cn.done}}catch{return{...cn}}}function Tp(e){try{window.localStorage.setItem(dl,JSON.stringify(e))}catch{}}function ol(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Ep(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(_r):(n.sort(bn(r)),t==="board"?n:[...n.filter(sl),...n.filter(s=>!sl(s))])}function Cp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function Rp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ip(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var Lp=["closed_unmerged","undecidable"],Dp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Op(e,t){for(let r of Dp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var Pp=[{step:"merging",label:"\uBA38\uC9C0 \uC911",index:1},{step:"base_sync",label:"base \uB3D9\uAE30\uD654",index:2},{step:"reconcile_queued",label:"\uC815\uB9AC \uC900\uBE44",index:2},{step:"candidate_pinned",label:"\uBC30\uD3EC \uD6C4\uBCF4 \uACE0\uC815",index:3},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D",index:4},{step:"reconcile_verify",label:"\uC815\uB9AC \uC911 \xB7 \uAC80\uC99D",index:4},{step:"deploy",label:"\uBC30\uD3EC",index:5},{step:"reconcile_deploy",label:"\uC815\uB9AC \uC911 \xB7 \uBC30\uD3EC",index:5},{step:"reconcile_readback",label:"\uC815\uB9AC \uC911 \xB7 readback",index:6},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC",index:7},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC",index:8},{step:"parent_close",label:"\uBD80\uBAA8 close",index:9}];function Mp(e){if(typeof e!="string"||e.length===0)return null;let t=9,r=Pp.find(n=>n.step===e);return r?{label:r.label,index:r.index,total:t,percent:Math.round(r.index/t*100)}:{label:e,index:0,total:t,percent:0}}function Np(e){if(!e||e.adapter!=="managed"&&e.stage!=="queued")return null;let t=e.stage==="queued"?"reconcile_queued":e.stage==="pinned"?"candidate_pinned":e.stage==="verifying"?"reconcile_verify":e.stage==="deploying"?"reconcile_deploy":e.stage==="readback"?"reconcile_readback":null;return t?{activity:null,merge_progress:{step:t,started_at:typeof e.updated_at=="number"?e.updated_at:0}}:null}function al(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function Fp(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function to(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function qp(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Bp(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,u=!0,p=null,f=null,h=null,T={}){let S=!!l&&l.position>0,E=!!l&&l.active===!0,B=l&&l.failure||null,w=r[e]||null,P=w&&w.gate?w.gate:null,X=w&&w.pr?w.pr:null,D=qp(h),R=Fp(l?l.resolution:null),A=[];i&&A.push("\uC138\uC158");let M=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":R?R.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":null,N=Op(i&&P&&P.tier==="closed_unmerged"?"\uB2EB\uD798":P&&P.gate_badge||"",M?null:o&&o.activity||null);M&&A.push(M),N.label&&A.push(N.label),P&&P.base_badge&&P.base_badge!==P.gate_badge&&A.push(P.base_badge),f&&A.push(f),n&&A.push("\uC815\uB9AC \uC2E4\uD328"),D&&A.push(D.badge),S&&!E&&A.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),B&&A.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${al(B)}`),p&&A.push(`\uC790\uB3D9 \uC81C\uC678: ${al(p)}`);let le=!!P&&P.base_badge==="\uCDA9\uB3CC",xe=!!P&&P.enabled===!0,me=Mp(o&&o.merge_progress?o.merge_progress.step:null),_e=!!n&&!!P&&P.tier==="merged",Se=i&&!!P&&P.tier==="merged",Ne=i&&le&&u===!1,Ie=Ut(T,e,{external:i,merge_active:E||!!me,merge_queued:S,conflict_active:!!a,cleanup_active:!1,merged:!!n||P?.tier==="merged"}),ze=!!Ie.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:i,pr_number:X&&typeof X.number=="number"?X.number:null,pr_url:X&&typeof X.url=="string"?X.url:"",completion_badge:D?D.badge:null,completion_title:D?D.title:"",completion_repair_pr_url:D?D.repair_pr_url:"",completion_repair_pr_number:D?D.repair_pr_number:null,badges:A,live_badge:a==="paused"?null:R?.live||a==="running"?M:N.live?N.label:null,usage:s,alert:!!P&&Lp.includes(P.tier)||!!n||!!B||!!(D&&D.alert),merge_action:!S,cancel_action:S,cancel_enabled:!E&&!(D&&D.lock_actions),cancel_title:D&&D.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":E?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:Ie,discard_action:Ie.action,merge_step:me,discard_enabled:Ie.enabled,discard_title:Ie.title,merge_enabled:!me&&!a&&!ze&&!(D&&D.lock_actions)&&!Ne&&(xe||le||_e||Se),merge_label:Se?"\uC815\uB9AC":le&&!me&&!_e?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ze?Ie.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Ie.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Ie.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:me?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${me.label}`:Se?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":_e?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":le?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":xe?`\uBA38\uC9C0 (${P.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:P&&P.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${P&&P.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ro(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u}=t,p=n?yn(n,i):null,f=wn({transport:r,uiOrderStore:i}),h=null,T=[],S=gp(),E=kp(),B=$p();function w(){let d=Bt.find(_=>_.value===B);return d?d.label:"\uC624\uB298"}let P=Ap(),X=!1,D=new Set,R=new Set,A=new Set,M=[],N=document.createElement("div");N.className="worker-console";let le=document.createElement("div");le.className="worker-top";let xe=document.createElement("div");xe.className="worker-drawer-overlay",xe.hidden=!0;let me=document.createElement("div");me.className="worker-drawer-overlay__backdrop";let _e=document.createElement("div");_e.className="worker-drawer-host",xe.append(me,_e);let Se=document.createElement("div");Se.className="worker-lanes-host",N.append(le,xe,Se),e.appendChild(N);let Ne=null,Ie=jn(_e,{transport:r,sessionLogStore:a,onClose:()=>{Ne=null,xe.hidden=!0,Pe()}}),ze=Wn(N,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function De(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:ln,queue:[],pr_wait:[],done:[]}}function te(){let d=De();return typeof d.revision=="number"?d.revision:0}function ce(d){d&&d.queue&&s&&s.set(d.queue)}function be(){let d=De().queue;return Array.isArray(d)?d.length:0}async function j(d,_){if(!r)return;let $=await r("worker-queue-place",{bead_id:d,index:_,expected_revision:te()});ce($),$&&$.conflict&&await r("worker-queue-place",{bead_id:d,index:_,expected_revision:te()}).then(ce)}async function re(d,_){if(!r)return;let $=await r("worker-queue-reorder",{bead_id:d,to_index:_,expected_revision:te()});ce($),$&&$.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:_,expected_revision:te()}).then(ce)}async function de(d){if(!r)return;let _=await r("worker-queue-remove",{bead_id:d,expected_revision:te()});ce(_),_&&_.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:te()}).then(ce)}async function Ee(d){if(!r||!d)return;let _=await r("worker-attempt-pause",{attempt_id:d});_&&_.paused===!1&&_.reason&&J(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function ue(d){if(!r||!d)return;let _=await r("worker-attempt-resume",{attempt_id:d,expected_revision:te()});ce(_),_&&_.conflict&&(_=await r("worker-attempt-resume",{attempt_id:d,expected_revision:te()}),ce(_)),_&&_.resumed===!1&&!_.conflict&&_.reason&&J(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function Ae(d){if(!r||!d)return;let _=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:te()});ce(_),_&&_.conflict&&(_=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:te()}),ce(_)),_&&_.dismissed===!1&&!_.conflict&&_.reason&&J(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${_.reason}`,"error",2400)}async function z(d){if(!r||!d||A.has(d))return;A.add(d),Pe();let _;try{_=await r("worker-cleanup-diagnose",{bead_id:d,expected_revision:te()}),ce(_),_&&_.conflict&&(_=await r("worker-cleanup-diagnose",{bead_id:d,expected_revision:te()}),ce(_))}finally{A.delete(d),Pe()}_&&!_.conflict&&_.ok===!1&&_.reason&&J(`AI \uC815\uB9AC \uAC70\uBD80: ${_.reason}`,"error",2400)}async function O(d,_){if(!r)return null;let $=r,L=await $(d,{..._,expected_revision:te()});return ce(L),L&&L.conflict&&(L=await $(d,{..._,expected_revision:te()}),ce(L)),L}async function se(d){if(!r||!d)return;D.add(d),Pe();let _;try{_=await O("worker-merge-queue-add",{bead_id:d})}finally{D.delete(d),Pe()}!_||_.conflict||_.applied||J("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ve(d){if(!r)return;let _=await O("worker-merge-auto-toggle",{on:d});!_||_.conflict||J(d?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",d?"success":"info",2400)}async function Te(d){if(!r||!d)return;let _=await O("worker-merge-queue-remove",{bead_id:d});_&&!_.conflict&&!_.applied&&_.reason==="merge_active"&&J("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function je(){await O("worker-merge-queue-remove",{all:!0})}async function we(d,_=null,$="unmerged",L=null){if(!r||!d)return;let ae=nn(d,$);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ae)))return;let oe=await r("worker-discard",{bead_id:d,..._?{attempt_id:_}:{},...L?{operation_id:L}:{},expected_revision:te()});if(ce(oe),oe&&oe.conflict&&(oe=await r("worker-discard",{bead_id:d,..._?{attempt_id:_}:{},...L?{operation_id:L}:{},expected_revision:te()}),ce(oe)),oe&&oe.discarded===!0){J(Gn(oe),"success",5e3);return}if(oe&&oe.reason){J(`\uD3D0\uAE30 \uC2E4\uD328: ${oe.reason}`,"error",2800);return}if(oe&&oe.accepted&&oe.pending==="merged_revert"){J("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(oe&&oe.accepted&&!oe.discarded){J(`\uD3D0\uAE30 \uC9C4\uD589: ${oe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}oe&&!oe.conflict&&J("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function F(d,_){if(!r||!_||R.has(_))return;R.add(_),Pe();let $;try{$=await r(d,{bead_id:_,expected_revision:te()}),ce($),$&&$.conflict&&($=await r(d,{bead_id:_,expected_revision:te()}),ce($))}finally{R.delete(_),Pe()}if(!(!$||$.conflict)){if($.ok){J(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}J(`\uCC98\uBD84 \uAC70\uBD80: ${$.reason||""}`,"error",3e3)}}async function G(d){if(!r)return;let _=await r("worker-queue-toggle",{on:d,expected_revision:te()});ce(_),_&&_.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:te()}).then(ce)}async function q(d){if(!r||!Number.isFinite(d))return;let _=Math.max(ln,Math.floor(d)),$=await r("worker-queue-set-slots",{slots:_,expected_revision:te()});ce($),$&&$.conflict&&await r("worker-queue-set-slots",{slots:_,expected_revision:te()}).then(ce)}async function k(d){if(!r)return;let _=await r("worker-queue-set-pr-wait-hold",{on:d,expected_revision:te()});ce(_),_&&_.conflict&&await r("worker-queue-set-pr-wait-hold",{on:d,expected_revision:te()}).then(ce)}function H(){let d=De(),_=p?p.selectBoardColumn(pp,"ready"):[],$=p?p.selectBoardColumn(fp,"blocked"):[],L=p?p.selectBoardColumn(_p,"in_progress"):[],ae=new Map;for(let y of L){let W=Rp(y);if(!W)continue;let pe=ae.get(W);pe?pe.push(y):ae.set(W,[y])}let ge=y=>{let W=kn(ae.get(y)||[]);return W?W.title||W.id:null},oe=d.bead_titles||{},ke=new Map;for(let[y,W]of Object.entries(oe))typeof W=="string"&&W.length>0&&ke.set(y,W);for(let y of[..._,...$])ke.set(y.id,y.title||y.id);let Ce=d.bead_times||{},fe=new Map;for(let[y,W]of Object.entries(Ce))W&&typeof W=="object"&&fe.set(y,W);for(let y of[..._,...$])fe.set(y.id,{created_at:y.created_at,updated_at:y.updated_at});let qe=y=>fe.get(y)||{},Je=d.pr_wait||[],$e=d.pr_observations||{},ft=d.pr_activity||{},Tt=d.deployment_reconcile||d.reconcile||{},bt=d.cleanup_failed||{},it=Object.entries(bt).map(([y,W])=>({bead_id:y,step:W&&W.step?W.step:"",reason:W&&W.reason?W.reason:"",detail:Tt[y]?.adapter==="managed"&&(W?.detail==="checkout_dirty"||W?.detail==="checkout_not_on_base"||W?.detail==="head_not_base_sha")?null:W&&typeof W.detail=="string"?W.detail:null,output_tail:W&&typeof W.output_tail=="string"&&W.output_tail?W.output_tail:void 0,log_path:W&&typeof W.log_path=="string"&&W.log_path?W.log_path:void 0,diagnosis:W&&W.diagnosis&&typeof W.diagnosis=="object"&&typeof W.diagnosis.verdict=="string"&&typeof W.diagnosis.evidence=="string"?{verdict:W.diagnosis.verdict,evidence:W.diagnosis.evidence,fix_bead_id:typeof W.diagnosis.fix_bead_id=="string"?W.diagnosis.fix_bead_id:null,malformed:W.diagnosis.malformed===!0}:null,diagnosis_pending:A.has(y)||mp(d.attempts,y)})),he=d.queue||[],He=new Set([...he.map(y=>y.bead_id),...Je.map(y=>y.bead_id),...d.done.map(y=>y.bead_id)]),Rt=new Set($.map(y=>y.id)),zt=i?i.get()?.order||{}:{},Ht=new Set,ie=[];for(let y of[..._,...$])He.has(y.id)||Ht.has(y.id)||Cp(y)||nl(y.labels)||(Ht.add(y.id),ie.push(y));T=Ep(ie,E,zt);let v=d.admission||{},Y=y=>{let W=v[y];if(!W)return"";if(W.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let pe=typeof W.reason=="string"?W.reason:"",Ve=pe.indexOf(":");return Ve>0&&Ve<pe.length-1?`\u26D4 ${pe.slice(0,Ve)} (${pe.slice(Ve+1)})`:`\u26D4 ${pe}`},m=T.map(y=>{let W=rn(y),pe=W.path.length>0,Ve=y.workflow?.route==="quick_fix"||y.metadata&&y.metadata.route==="quick_fix",_n=!Ve&&pe&&!W.conflict,vr=Rt.has(y.id),yr=[];vr&&yr.push(Ip(y)),Ve?yr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):W.conflict?yr.push("spec_id_conflict"):pe||yr.push("spec \uC5C6\uC74C");let wo=Y(y.id);return wo&&yr.push(wo),{id:y.id,title:y.title||y.id,reason:yr.join(" \xB7 "),draggable:_n,lane:"candidate",created_at:y.created_at,updated_at:y.updated_at,workflow:y.workflow,is_quick_fix:Ve,status:y.status,blocked:vr,has_spec:pe}}),b=bp(m,S),Q=b.visible,ee=d.revise_parked||{},Z=d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},g=(y,W)=>y.map(pe=>{let Ve=W==="queue"?ee[pe.bead_id]:null,_n=W==="queue"?Ut(Z,pe.bead_id):null,vr=_n?.operation?_n:null;return{id:pe.bead_id,title:ke.get(pe.bead_id)||pe.bead_id,reason:W==="done"?"":Y(pe.bead_id),draggable:W!=="done"&&!vr,done:W==="done",lane:W,discard:vr,badges:Ve?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ve,revise_action:!!Ve,revise_enabled:!!Ve&&!vr&&!R.has(pe.bead_id),revise_title:Ve?Ve.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ve.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:W==="done"?Lt(d.attempts||{},pe.bead_id):null,done_at:W==="done"&&typeof pe.added_at=="number"?pe.added_at:void 0,...qe(pe.bead_id)}}),I=new Map;for(let y of d.done)y&&typeof y.bead_id=="string"&&typeof y.added_at=="number"&&I.set(y.bead_id,y.added_at);let x=d.attempts?Object.values(d.attempts):[],K=new Set;for(let y of x)y&&typeof y.resumed_from=="string"&&y.resumed_from.length>0&&K.add(y.resumed_from);let Fe=new Map;for(let y of x)Fe.set(y.bead_id,y.attempt_id);let at=new Map;for(let y of x)at.set(y.attempt_id,y);function _t(y){let W=new Set,pe=y;for(;pe&&!W.has(pe.attempt_id);){if(pe.conflict_resolution===!0)return!0;W.add(pe.attempt_id),pe=typeof pe.resumed_from=="string"&&pe.resumed_from.length>0&&at.get(pe.resumed_from)||null}return!1}let Le=typeof d.declared_base=="string"?d.declared_base:null;function Jt(y){let W=null;for(let pe of x)!pe||pe.bead_id!==y||_t(pe)||(W===null||(typeof pe.started_at=="number"?pe.started_at:0)>=(typeof W.started_at=="number"?W.started_at:0))&&(W=pe);return W&&typeof W.target_base=="string"?W.target_base:null}let dn=[],ao=[],wl=y=>{let W=Fe.get(y.bead_id)!==y.attempt_id,pe=I.get(y.bead_id),Ve=typeof pe=="number"&&pe>0&&typeof y.finished_at=="number"&&pe>=y.finished_at;return!W&&!Ve&&typeof y.dismissed_at!="number"},io=y=>{let W=typeof y.session_id=="string"&&y.session_id.length>0,pe=K.has(y.attempt_id);return{eligible:W&&!pe,reason:W?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ot=null;for(let y of x){let W=y.status==="paused"&&!K.has(y.attempt_id);if(y.status==="running"||W)ao.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:ke.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,paused:W,conflict_resolution:_t(y),base_exception:to(Le,y.target_base),can_pause:typeof y.session_id=="string"&&y.session_id.length>0,discard:Ut(Z,y.bead_id,{attempt_id:y.attempt_id}),usage:Lt(d.attempts||{},y.bead_id),current_child:ge(y.bead_id),...qe(y.bead_id)});else if((y.status==="failed"||y.status==="orphaned")&&wl(y)){let pe=io(y);dn.push({bead_id:y.bead_id,attempt_id:y.attempt_id,title:ke.get(y.bead_id)||y.bead_id,runner:y.runner||null,model:y.model||null,effort:y.effort||null,started_at:typeof y.started_at=="number"?y.started_at:null,resumed_from:y.resumed_from||null,failed:!0,status:y.status,status_label:y.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:Ut(Z,y.bead_id,{attempt_id:y.attempt_id}),resume_eligible:pe.eligible,resume_reason:pe.reason,conflict_resolution:_t(y),base_exception:to(Le,y.target_base),usage:Lt(d.attempts||{},y.bead_id),current_child:ge(y.bead_id),...qe(y.bead_id)}),Ot=y}}let un=[...dn,...ao],lo=null;if(Ot){let y=io(Ot),W=Ot.cause_detail;lo={bead_id:Ot.bead_id,repo:Ot.repo||"",reason:Ot.cause||Ot.status,cause_detail:W&&typeof W.reason=="string"?{reason:W.reason,command:typeof W.command=="string"?W.command:null}:null,resume_attempt_id:Ot.attempt_id,resume_eligible:y.eligible,resume_reason:y.reason,discard:Ut(Z,Ot.bead_id,{attempt_id:Ot.attempt_id})}}let $l=new Set(un.map(y=>y.bead_id)),Zn=Array.isArray(d.merge_queue)?d.merge_queue:[],co=new Map,uo=new Map;Zn.forEach((y,W)=>{y&&typeof y.bead_id=="string"&&(co.set(y.bead_id,W+1),uo.set(y.bead_id,y.resolution))});let po=d.merge_queue_state||{active:null,failures:{}},xl=po.failures||{},Sl=d.auto_merge_skips||{},fo=y=>{let W=Sl[y];if(!W)return null;let pe=$e[y],Ve=pe&&pe.pr?pe.pr.head_sha:null;return Ve&&Ve===W.head_sha?W.reason||"":null},pn=new Map;for(let y of un)y.failed!==!0&&y.conflict_resolution&&(y.paused?pn.has(y.bead_id)||pn.set(y.bead_id,"paused"):pn.set(y.bead_id,"running"));let _o=un.filter(y=>!y.paused&&y.failed!==!0).length,mo=(d.workspace_info||{}).slots,Al=typeof mo=="number"?mo:typeof d.slots=="number"?d.slots:ln,go=d.pr_wait_holds_slot===!0?ln:Al,Tl=_o>go,ho=$r(B),El=(Array.isArray(d.done)?d.done.slice():[]).filter(y=>ho===void 0||typeof y.added_at!="number"||y.added_at>=ho).sort((y,W)=>(W.added_at||0)-(y.added_at||0)),Xn=g(El,"done"),fn={};for(let y of Yt)fn[y]=0;let bo=!1,vo=0,Qn=0,yo=0;for(let y of Xn){let W=y.usage;if(W&&typeof W=="object"){let pe=!1;for(let Ve of Yt)Number.isFinite(W[Ve])&&(fn[Ve]+=W[Ve],bo=!0,pe=!0);pe&&(Qn+=1,Number.isFinite(W.total_cost_usd)&&(vo+=W.total_cost_usd,yo+=1))}}Qn>0&&yo===Qn&&(fn.total_cost_usd=vo);let ko=Xn.map(y=>y.usage).filter(y=>y&&typeof y=="object"&&y.providers),Cl=ko.length>0?mt(En(ko)):bo?Mt(fn):null;return{queue:d,idToTitle:ke,candidates:Q,candidate_hidden:{blocked:b.hidden_blocked,spec:b.hidden_spec},running:un,live_count:_o,slots:go,over_cap:Tl,failure:lo,waiting:g(he.filter(y=>!$l.has(y.bead_id)),"queue"),pr_wait:Je.map(y=>Bp(y.bead_id,ke.get(y.bead_id)||y.bead_id,$e,bt[y.bead_id]||null,Lt(d.attempts||{},y.bead_id),Np(Tt[y.bead_id])||ft[y.bead_id]||(D.has(y.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),pn.get(y.bead_id)||null,y.external===!0,{position:co.get(y.bead_id)||0,active:po.active===y.bead_id,failure:xl[y.bead_id]||null,resolution:uo.get(y.bead_id)},y.wt_present!==!1,d.auto_merge===!0?fo(y.bead_id):null,to(Le,Jt(y.bead_id)),d.completion_status&&typeof d.completion_status=="object"&&!Array.isArray(d.completion_status)&&d.completion_status[y.bead_id]||null,d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{})).map(y=>({...y,...qe(y.id)})),merge_queue_length:Zn.length,merge_queue_running:Zn.length>0,auto_excluded:Je.map(y=>y.bead_id).filter(y=>fo(y)!==null),verify_cmd_present:!!(d.workspace_info||{}).verify_cmd,declared_base:Le,done:Xn,token_total:Cl,cleanup_failures:it}}function U(d){let _=d.waiting.length>0?d.waiting[0].id:"\u2014",$=c`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,L=Ye(d),ae=d.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",ge=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${d.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${d.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${w()} 완료 <b>${d.done.length}</b></span
      >`,oe=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${d.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${d.declared_base||"?"}</span
    >`,ke=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${ln}
          step="1"
          .value=${String(d.slots)}
          ?disabled=${d.queue.pr_wait_holds_slot===!0}
          title=${d.queue.pr_wait_holds_slot===!0?"\uBA38\uC9C0\uAE4C\uC9C0 \uC21C\uCC28 \uC2E4\uD589 \uC911 \u2014 \uD574\uC81C\uD558\uBA74 \uC800\uC7A5\uB41C \uB3D9\uC2DC \uC2E4\uD589 \uC218\uB85C \uB3CC\uC544\uAC11\uB2C8\uB2E4":"\uB3D9\uC2DC\uC5D0 \uC2E4\uD589\uD560 \uC138\uC158 \uC218 (\uCD5C\uC18C 1 = \uC21C\uCC28 \uC2E4\uD589)"}
      /></label>
      <label
        class="worker-tgl"
        title="각 이슈가 PR 머지·정리를 마칠 때까지 다음 이슈를 시작하지 않습니다"
      >
        <input
          type="checkbox"
          class="worker-pr-wait-hold"
          .checked=${d.queue.pr_wait_holds_slot===!0}
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
      </button>`,Ce=Ri({failure:d.failure,cleanupFailures:d.cleanup_failures});return X?c`<div class="worker-ribbon">
          ${$} ${L}
          <div class="worker-kpi worker-kpi--ribbon">${ae}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${ke}</div>
          <div class="worker-kpi">${oe}</div>
        </div>
        ${Ce}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${$}${L}${ke}</div>
        <div class="worker-kpi">
          ${ae}${ge}${oe}
          ${(Array.isArray(d.token_total)?d.token_total:d.token_total?[{label:d.token_total,tooltip:`${w()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(fe=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${fe.tooltip}
                >${w()} 완료 · 누적 ${fe.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${_}</b></span
          >
        </div>
      </div>
      ${Ce}`}function V(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let _=d.running.some($=>!$.paused&&$.failed!==!0);return c`<section
      class="worker-now${_?" worker-pane--live":""}"
      id="worker-now"
    >
      <header class="worker-now__hd">
        <span
          class="worker-pane__dot worker-pane__dot--running"
          aria-hidden="true"
        ></span>
        <span class="worker-now__title">지금</span>
        <span class="worker-now__count"
          >${d.running.length+d.pr_wait.length}</span
        >
      </header>
      ${d.running.length>0?Vs(d.running,Date.now(),Ne):""}
      ${d.pr_wait.map($=>Gs($))}
    </section>`}function ne(d){let _=d.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${S.show_blocked}
        />
        🔒 blocked${_.blocked>0?` ${_.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${vp.map($=>c`<button
              type="button"
              class="worker-filter__chip${S.spec===$.value?" is-active":""}"
              data-spec=${$.value}
              aria-pressed=${S.spec===$.value?"true":"false"}
            >
              ${$.label}
            </button>`)}
        ${_.spec>0?c`<span class="worker-filter__hidden">숨김 ${_.spec}</span>`:""}
      </div>
    </div>`}function ye(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${E}
    >
      ${yp.map(d=>c`<option value=${d.value} ?selected=${E===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Oe(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${B}
      >
        ${Bt.map(d=>c`<option value=${d.value} ?selected=${B===d.value}>
              ${d.label}
            </option>`)}
      </select>
    </div>`}function Xe(d){let _=(d.queue.pr_wait||[]).filter(L=>L&&L.external!==!0&&typeof L.bead_id=="string"),$=new Set(d.running.filter(L=>!L.paused&&L.failed!==!0).map(L=>L.bead_id));for(let L of _)$.add(L.bead_id);if(!(d.queue.pr_wait_holds_slot!==!0||d.queue.auto_advance!==!0||d.queue.auto_merge===!0||_.length===0||d.waiting.length===0||$.size<d.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function Ye(d){let _=d.queue.auto_merge===!0;if(d.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${_?" is-active":""}"
        title=${_?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${_?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${d.merge_queue_length}
      </button>`;if(_)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let $=new Set(d.auto_excluded),L=d.pr_wait.filter(ae=>ae.merge_action&&ae.merge_enabled&&!$.has(ae.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${d.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${L>0?` ${L}`:""}
    </button>`}function et(d){let _=jt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:ye(),controls:ne(d)});return X?c`<div class="worker-lanes worker-lanes--mobile">
        ${V(d)}
        ${jt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:Xe(d),collapsible:!0,collapsed:P.queue,preview:ol(d.waiting)})}
        ${_}
        ${jt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:Oe(),collapsible:!0,collapsed:P.done,preview:Array.isArray(d.token_total)?d.token_total.map($=>$.label).join(" \xB7 "):d.token_total||ol(d.done)})}
      </div>`:c`<div class="worker-lanes">
      ${_}
      ${jt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:Xe(d)})}
      ${jt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some($=>!$.paused&&$.failed!==!0),body:Vs(d.running,Date.now(),Ne)})}
      ${jt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${jt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${w()} ${d.done.length}`,items:d.done,empty:`${w()} \uC644\uB8CC \uC5C6\uC74C`,controls:Oe()})}
    </div>`}function Qe(d){P={...P,[d]:!P[d]},Tp(P),Pe()}function Pe(){let d=H();Me(U(d),le),Me(et(d),Se)}function yt(){let d=document.querySelector(".app-header");if(!d)return;let _=()=>{let $=Math.round(d.getBoundingClientRect().height);N.style.setProperty("--worker-ribbon-top",`${$}px`)};if(_(),typeof ResizeObserver=="function"){let $=new ResizeObserver(_);$.observe(d),M.push(()=>$.disconnect())}else window.addEventListener("resize",_),M.push(()=>window.removeEventListener("resize",_))}function ct(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(Sp);X=!!d.matches;let _=$=>{let L=!!($&&typeof $.matches=="boolean"?$.matches:d.matches);L!==X&&(X=L,Pe())};typeof d.addEventListener=="function"?(d.addEventListener("change",_),M.push(()=>d.removeEventListener("change",_))):typeof d.addListener=="function"&&(d.addListener(_),M.push(()=>d.removeListener(_)))}function nt(d){let _=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!_)return;let $=_.dataset.beadId||"",L=_.dataset.lane||"";h={bead_id:$,from_lane:L};try{d.dataTransfer?.setData("text/plain",$),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function Ge(d){let _=d.target?.closest?.(".worker-pane");if(!_)return;let $=_.dataset.lane||"";$!=="candidate"&&$!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),_.classList.add("worker-pane--drag-over"))}function gt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function dt(d,_){let $=T.find(oe=>oe.id===d);if(!$)return;let L=T.filter(oe=>oe.id!==d),ae=L.length;if(_){let oe=_.dataset.beadId;if(oe===d)return;let ke=L.findIndex(Ce=>Ce.id===oe);ke>=0&&(ae=ke)}let ge=L.slice();ge.splice(ae,0,$),f.applyReorder(d,ge,ae)}function st(d){let _=d.target?.closest?.(".worker-pane");if(!_)return;d.preventDefault(),_.classList.remove("worker-pane--drag-over");let $=_.dataset.lane||"",L=h?.bead_id||d.dataTransfer?.getData("text/plain")||"",ae=h?.from_lane||"";if(h=null,!L)return;let ge=d.target?.closest?.(".worker-mini, .worker-card"),oe=Array.from(_.querySelectorAll(".worker-mini, .worker-card")),ke=oe.length;if(ge){let Ce=oe.indexOf(ge);Ce>=0&&(ke=Ce)}if(_.classList.contains("worker-pane--collapsed")&&(ke=be()),$==="candidate"){if(ae==="candidate"){dt(L,ge);return}ae==="queue"&&de(L);return}$==="queue"&&(ae==="queue"?re(L,ke):j(L,ke))}function ot(d){S=d,hp(d),Pe()}function kt(d){E=d==="board"||d==="created"||d==="spec"?d:Kn,wp(E),Pe()}function tt(d){B=Gt(d)?d:It,xp(B),Pe()}function ht(d){let _=d.target?.closest?.(".worker-filter__blocked");if(_){ot({...S,show_blocked:_.checked});return}let $=d.target?.closest?.(".worker-done-range");if($){tt($.value);return}let L=d.target?.closest?.(".worker-sort");if(L){kt(L.value||Kn);return}let ae=d.target?.closest?.(".worker-pr-wait-hold");if(ae){k(ae.checked);return}let ge=d.target?.closest?.(".worker-slots__input");if(!ge)return;let oe=Number.parseInt(ge.value,10);if(!Number.isFinite(oe)){Pe();return}q(oe).then(Pe)}function Ke(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function ut(d){let _=De(),$=_.attempts?_.attempts[d]:null;Ne=d,xe.hidden=!1,Ie.open({attempt_id:d,meta:Ke($)}),Pe()}function pt(){if(!Ne)return;let d=De(),_=d.attempts?d.attempts[Ne]:null;if(_){Ie.updateMeta(Ke(_));return}Ie.close()}function C(d){let _=d.target;if(_?.closest?.("#worker-exec-defaults-dialog"))return;if(_?.closest?.(".worker-exec-defaults-btn")){ze.open();return}let $=_?.closest?.(".worker-banner__resume");if($){let he=$.dataset.attemptId;he&&ue(he);return}let L=_?.closest?.(".worker-banner__discard");if(L){let he=L.dataset.confirmation==="merged"?"merged":"unmerged";we(L.dataset.beadId||"",L.dataset.attemptId||null,he,L.dataset.operationId||null);return}let ae=_?.closest?.(".worker-banner__dismiss");if(ae){let he=ae.dataset.attemptId;he&&Ae(he);return}let ge=_?.closest?.(".worker-banner__cleanup-diagnose");if(ge){let he=ge.dataset.beadId;he&&z(he);return}if(_?.closest?.(".worker-play")){G(!De().auto_advance);return}let oe=_?.closest?.(".worker-merge-all");if(oe){oe.classList.contains("worker-merge-all--stop")?De().auto_merge===!0?ve(!1):je():ve(!0);return}let ke=_?.closest?.(".worker-pane__hd--toggle");if(ke){let he=ke.dataset.lane;(he==="queue"||he==="done")&&Qe(he);return}let Ce=_?.closest?.(".worker-card__place");if(Ce){let he=Ce.dataset.beadId;he&&!Ce.disabled&&j(he,be());return}let fe=_?.closest?.(".worker-filter__chip");if(fe){let he=fe.dataset.spec;(he==="all"||he==="with"||he==="without")&&ot({...S,spec:he});return}let qe=_?.closest?.(".worker-mini__merge");if(qe){se(qe.dataset.beadId||"");return}let Je=_?.closest?.(".worker-mini__merge-cancel");if(Je){Te(Je.dataset.beadId||"");return}let $e=_?.closest?.(".worker-mini__discard");if($e){we($e.dataset.beadId||"",$e.dataset.attemptId||null,$e.dataset.discardMode==="merged"?"merged":"unmerged",$e.dataset.operationId||null);return}let ft=_?.closest?.(".worker-mini__revise-fix");if(ft){F("worker-revise-fix",ft.dataset.beadId||"");return}let Tt=_?.closest?.(".worker-mini__revise-approve");if(Tt){F("worker-revise-approve",Tt.dataset.beadId||"");return}if(_?.closest?.(".worker-mini__pr"))return;if(_?.closest?.(".rtile__discard")){let he=_?.closest?.(".rtile"),He=he?.dataset?.beadId,Rt=he?.dataset?.attemptId;He&&we(He,Rt||null,"unmerged",_?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(_?.closest?.(".rtile__dismiss")){let He=_?.closest?.(".rtile")?.dataset?.attemptId;He&&Ae(He);return}if(_?.closest?.(".rtile__pause")){let He=_?.closest?.(".rtile")?.dataset?.attemptId;He&&Ee(He);return}if(_?.closest?.(".rtile__resume")){let He=_?.closest?.(".rtile")?.dataset?.attemptId;He&&ue(He);return}if(_?.closest?.(".rtile__session")){let He=_?.closest?.(".rtile")?.dataset?.attemptId;He&&ut(He);return}if(_?.closest?.(".worker-drawer-overlay__backdrop")){Ie.close();return}if(_?.closest?.(".worker-drawer-host"))return;let bt=_?.closest?.(".rtile");if(bt){if(_?.closest?.(".rtile__id")){let He=bt.dataset.beadId;He&&mr(He).then(Rt=>{Rt?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let he=bt.dataset.beadId;he&&l&&l(he);return}let it=_?.closest?.(".worker-mini, .worker-card");if(it){let he=it.dataset.beadId;if(_?.closest?.(".worker-mini__id, .worker-card__id")){he&&mr(he).then(He=>{He?J("\uBCF5\uC0AC\uB428","success",1200):J("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}he&&l&&l(he)}}return e.addEventListener("dragstart",nt),e.addEventListener("dragover",Ge),e.addEventListener("dragleave",gt),e.addEventListener("drop",st),e.addEventListener("click",C),e.addEventListener("change",ht),ct(),yt(),p&&M.push(p.subscribe(Pe)),s&&M.push(s.subscribe(()=>{Pe(),pt()})),Pe(),{load(){Pe()},openExecDefaults(){ze.open()},destroy(){for(let d of M.splice(0))try{d()}catch{}e.removeEventListener("dragstart",nt),e.removeEventListener("dragover",Ge),e.removeEventListener("dragleave",gt),e.removeEventListener("drop",st),e.removeEventListener("click",C),e.removeEventListener("change",ht);try{Ie.destroy()}catch{}xe.hidden=!0;try{ze.destroy()}catch{}Me(c``,e)}}}function no(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function ul(e,t,r,n=async()=>{},s=async()=>{}){let o=Ze("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function p(A){let N=A.target.value,xe=t.getState().workspace?.current?.path||"";if(N&&N!==xe){o("switching workspace to %s",N),i=!0,R();try{await r(N)}catch(me){o("workspace switch failed: %o",me)}finally{i=!1,R()}}}async function f(){let A=t.getState(),M=A.workspace?.current?.path||A.workspace?.available?.[0]?.path||"";if(!(!M||l)){o("git-pulling workspace %s",M),l=!0,R();try{await n(M)}catch(N){o("workspace git pull failed: %o",N)}finally{l=!1,R()}}}function h(A){let M=A.target;M&&e.contains(M)||E()}function T(A){A.key==="Escape"&&E()}function S(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",T),R())}function E(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),R())}function B(){u?E():S()}async function w(A){let M=A.target,N=M.value,le=M.checked;o("toggling visibility %s \u2192 %s",N,String(le));try{await s(N,le)}catch(xe){o("workspace visibility toggle failed: %o",xe)}}function P(A){return A?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${f}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function X(A,M){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${B}
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
                ${A.map(N=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${N.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${N.path}"
                        .checked=${!M.has(N.path)}
                        @change=${w}
                      />
                      <span class="workspace-picker__manage-name"
                        >${no(N.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let A=t.getState(),M=A.workspace?.current,N=A.workspace?.available||[],le=new Set(A.workspace?.hidden||[]),xe=M?.path||N[0]?.path||"";if(N.length===0)return c``;let me=N.filter(_e=>!le.has(_e.path)||_e.path===xe);if(me.length<=1){let _e=me[0]||N[0],Se=no(_e.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${_e.path}"
            >${Se}</span
          >
          ${X(N,le)}
          ${P(xe)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${me.map(_e=>c`
              <option
                value="${_e.path}"
                ?selected=${_e.path===xe}
                title="${_e.path}"
              >
                ${no(_e.path)}
              </option>
            `)}
        </select>
        ${X(N,le)}
        ${P(xe)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function R(){Me(D(),e)}return R(),a=t.subscribe(()=>R()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",T),Me(c``,e)}}}var pl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function so(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function fl(e,t,r=so()){return{id:r,type:e,payload:t}}function _l(e={}){let t=Ze("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,p=[],f=new Map,h=new Set;function T(D){for(let R of Array.from(h))try{R(D)}catch{}}function S(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),T(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),R=(r.jitterRatio||0)*D,A=Math.max(0,Math.round(D+(Math.random()*2-1)*R));t("ws retry in %d ms (attempt %d)",A,a+1),i=setTimeout(()=>{i=null,X()},A)}function E(D){try{s?.send(JSON.stringify(D))}catch(R){t("ws send failed",R)}}function B(){for(o="open",t("ws open"),T(o),a=0;p.length;){let D=p.shift();D&&E(D)}}function w(D){let R;try{R=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){t("ws received invalid envelope");return}if(u.has(R.id)){let M=u.get(R.id);u.delete(R.id),R.ok?M?.resolve(R.payload):M?.reject(R.error||new Error("ws error"));return}let A=f.get(R.type);if(A&&A.size>0)for(let M of Array.from(A))try{M(R.payload)}catch(N){t("ws event handler error",N)}else t("ws received unhandled message type: %s",R.type)}function P(){o="closed",t("ws closed"),T(o);for(let[D,R]of u.entries())R.reject(new Error("ws disconnected")),u.delete(D);a+=1,S()}function X(){if(!l)return;let D=n();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",T(o),s.addEventListener("open",B),s.addEventListener("message",w),s.addEventListener("error",()=>{}),s.addEventListener("close",P)}catch(R){t("ws connect failed %o",R),S()}}return X(),{send(D,R){if(!pl.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let A=so(),M=fl(D,R,A);return t("send %s id=%s",D,A),new Promise((N,le)=>{u.set(A,{resolve:N,reject:le,type:D}),s&&s.readyState===s.OPEN?E(M):(t("queue %s id=%s (state=%s)",D,A,o),p.push(M))})},on(D,R){f.has(D)||f.set(D,new Set);let A=f.get(D);return A?.add(R),()=>{A?.delete(R)}},onConnection(D){return h.add(D),()=>{h.delete(D)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,X()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Up(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function jp(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var oo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],ml=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],gl=Yi,hl="worker:queue",bl="ui:order",vl="ui:display-policy",yl="exec:presets",lr="tab:board:closed",kl="beads-ui.board.closed-range";function zp(e){let t=Ze("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Me(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&rl(s),o&&a&&i&&l){let De=function(m,b){let Q="Request failed",ee="";if(m&&typeof m=="object"){let g=m;if(typeof g.message=="string"&&g.message.length>0&&(Q=g.message),typeof g.details=="string")ee=g.details;else if(g.details&&typeof g.details=="object")try{ee=JSON.stringify(g.details,null,2)}catch{ee=""}}else typeof m=="string"&&m.length>0&&(Q=m);let Z=b&&b.length>0?`Failed to load ${b}`:"Request failed";ze.open(Z,Q,ee)},q=function(m){return`${$e.getState().workspace.current?.path||""}\0${m}`},k=function(){O&&(O().catch(()=>{}),O=null),se=null,ve=null},U=function(m){Te=m;let b=()=>{Te!==m||$e.getState().selected_id!==m||(Te=null,H(m))};if(!F){we.then(b);return}b()},Oe=function(m,b,Q,ee,Z){return Q!==ye[b]?(Z().catch(()=>{}),!1):(m.set(ee,Z),!0)},Xe=function(){let m=$e.getState();Qe(m.view==="board"),Ge(m.view==="worker"),kt(m.view==="monitor"),dt(m.view==="board"||m.view==="worker"||!!m.selected_id)},et=function(){let m=$r(Ye);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},Qe=function(m){if(m)for(let[b,Q]of oo){if(V.has(b)||ne.has(b))continue;let ee=b===lr?et():{type:Q};try{j.register(b,ee)}catch(I){t("register %s store failed: %o",b,I)}ne.add(b);let Z=ye.board,g=!1;be.subscribeList(b,ee).then(I=>{g=!Oe(V,"board",Z,b,I)}).catch(I=>{t("subscribe %s failed: %o",b,I),De(I,"board")}).finally(()=>{ne.delete(b),g&&Xe()})}else yt()},yt=function(){ye.board+=1;for(let[m]of oo){let b=V.get(m);b&&(b().catch(()=>{}),V.delete(m));try{j.unregister(m)}catch(Q){t("unregister %s failed: %o",m,Q)}}},Ge=function(m){if(!m){gt();return}for(let[b,Q]of ml){if(ct.has(b)||ne.has(b))continue;try{j.register(b,{type:Q})}catch(g){t("register %s store failed: %o",b,g)}ne.add(b);let ee=ye.worker,Z=!1;be.subscribeList(b,{type:Q}).then(g=>{Z=!Oe(ct,"worker",ee,b,g)}).catch(g=>{t("subscribe %s failed: %o",b,g),De(g,"worker")}).finally(()=>{ne.delete(b),Z&&Xe()})}},gt=function(){ye.worker+=1;for(let[m]of ml){let b=ct.get(m);b&&(b().catch(()=>{}),ct.delete(m));try{j.unregister(m)}catch(Q){t("unregister %s failed: %o",m,Q)}}},dt=function(m){if(!m){st();return}nt||(ce("subscribe-worker-queue",{id:hl}).catch(b=>{t("subscribe-worker-queue failed: %o",b)}),nt=()=>ce("unsubscribe-worker-queue",{id:hl}))},st=function(){nt&&(nt().catch(()=>{}),nt=null)},kt=function(m){if(!m){tt();return}ot||(ce("subscribe-monitor-pipeline",{id:gl}).catch(b=>{t("subscribe-monitor-pipeline failed: %o",b)}),ot=()=>ce("unsubscribe-monitor-pipeline",{id:gl}))},tt=function(){ot&&(ot().catch(()=>{}),ot=null)},Ke=function(){ht||(ce("subscribe-ui-order",{id:bl}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),ht=()=>ce("unsubscribe-ui-order",{id:bl}))},ut=function(){ht&&(ht().catch(()=>{}),ht=null),Ee.clear()},C=function(){pt||(ce("subscribe-display-policy",{id:vl}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),pt=()=>ce("unsubscribe-display-policy",{id:vl}))},d=function(){pt&&(pt().catch(()=>{}),pt=null),ue.clear()},$=function(){_||(ce("subscribe-exec-presets",{id:yl}).catch(m=>{t("subscribe-exec-presets failed: %o",m)}),_=()=>ce("unsubscribe-exec-presets",{id:yl}))},Ce=function(m){if(!m)return"Unknown";let b=m.split("/").filter(Boolean);return b.length>0?b[b.length-1]:"Unknown"};var u=De,p=q,f=k,h=U,T=Oe,S=Xe,E=et,B=Qe,w=yt,P=Ge,X=gt,D=dt,R=st,A=kt,M=tt,N=Ke,le=ut,xe=C,me=d,_e=$,Se=Ce;let Ne=document.getElementById("header-loading"),Ie=na(Ne),ze=Si(e),te=_l(),ce=Ie.wrapSend((m,b)=>te.send(m,b)),be=Zo(ce),j=Xo(),re=Jo(),de=Po(),Ee=Qo(),ue=Do(),Ae=Oo(),z=Mo();te.on("exec-presets-snapshot",m=>{let b=m;b&&typeof b.revision=="number"&&Array.isArray(b.presets)&&Ae.set({revision:b.revision,presets:b.presets})}),te.on("monitor-pipeline-snapshot",m=>{let b=m;if(!(!b||!Array.isArray(b.workspaces)))try{de.set(b.workspaces,b.workspaces_state)}catch{}}),te.on("ui-order-snapshot",m=>{let b=m;if(b&&typeof b.revision=="number")try{Ee.set({revision:b.revision,order:b.order&&typeof b.order=="object"?b.order:{}})}catch{}}),te.on("display-policy-snapshot",m=>{let b=m;if(b&&b.policy&&typeof b.policy=="object")try{ue.set(b.policy)}catch{}}),te.on("session-log-snapshot",m=>{let b=m;if(b&&typeof b.attempt_id=="string")try{z.set(b.attempt_id,Array.isArray(b.lines)?b.lines:[],typeof b.last_event_at=="number"?b.last_event_at:null)}catch{}}),te.on("session-log-append",m=>{let b=m;if(b&&typeof b.attempt_id=="string")try{z.append(b.attempt_id,b.event)}catch{}}),te.on("snapshot",m=>{let b=m,Q=b&&typeof b.id=="string"?b.id:"",ee=Q?j.getStore(Q):null;if(ee&&b&&b.type==="snapshot")try{ee.applyPush(b)}catch{}}),te.on("upsert",m=>{let b=m,Q=b&&typeof b.id=="string"?b.id:"",ee=Q?j.getStore(Q):null;if(ee&&b&&b.type==="upsert")try{ee.applyPush(b)}catch{}}),te.on("delete",m=>{let b=m,Q=b&&typeof b.id=="string"?b.id:"",ee=Q?j.getStore(Q):null;if(ee&&b&&b.type==="delete")try{ee.applyPush(b)}catch{}});let O=null,se=null,ve=null,Te=null,je=()=>{},we=new Promise(m=>{je=()=>m(void 0)}),F=!1,G=!1;async function H(m){let b=q(m);if(b===se||b===ve)return;ve=b;let Q=`detail:${m}`,ee={type:"issue-detail",params:{id:m}};try{j.register(Q,ee)}catch(Z){t("register detail store failed: %o",Z)}try{let Z=await be.subscribeList(Q,ee);if($e.getState().selected_id!==m||q(m)!==b){await Z().catch(()=>{});return}O&&await O().catch(()=>{}),O=Z,se=b}catch(Z){t("detail subscribe failed: %o",Z),De(Z,"issue details")}finally{ve===b&&(ve=null)}}let V=new Map,ne=new Set,ye={board:0,worker:0},Ye=It;try{let m=window.localStorage.getItem(kl);Gt(m)&&(Ye=m)}catch{}async function Pe(m){if(!Gt(m)||m===Ye)return;Ye=m;try{window.localStorage.setItem(kl,m)}catch{}let b=V.get(lr);if(!b)return;V.delete(lr),await b().catch(()=>{});let Q=et();try{j.register(lr,Q)}catch(ee){t("register %s store failed: %o",lr,ee)}try{let ee=await be.subscribeList(lr,Q);V.set(lr,ee)}catch(ee){t("re-subscribe %s failed: %o",lr,ee),De(ee,"board")}}let ct=new Map,nt=null,ot=null,ht=null,pt=null,_=null;async function L(){pt=null,ue.clear(),_=null,Ae.clear(),nt=null,ot=null,V.clear(),ct.clear(),ye.board+=1,ye.worker+=1,$();let m=$e.getState().workspace.current?.path;if(m)try{await te.send("set-workspace",{path:m})}catch(Q){t("workspace restore after reconnect failed: %o",Q);return}C();let b=$e.getState();Qe(b.view==="board"),Ge(b.view==="worker"),kt(b.view==="monitor"),dt(b.view==="board"||b.view==="worker"||!!b.selected_id)}async function ae(){t("clearing all subscriptions for workspace switch"),yt(),gt(),st(),re.clear(),ut(),Ke(),d(),C(),k();let m=$e.getState();if(m.selected_id)try{j.unregister(`detail:${m.selected_id}`)}catch{}let b=$e.getState();Qe(b.view==="board"),Ge(b.view==="worker"),kt(b.view==="monitor"),dt(b.view==="board"||b.view==="worker"||!!b.selected_id),b.selected_id&&U(b.selected_id)}async function ge(m){t("requesting workspace switch to %s",m),G=!0;try{let b=await te.send("set-workspace",{path:m});t("workspace switch result: %o",b),b&&b.workspace&&($e.setState({workspace:{current:{path:b.workspace.root_dir,database:b.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),b.changed&&(await ae(),J("Switched to "+Ce(m),"success",2e3)))}catch(b){throw t("workspace switch failed: %o",b),J("Failed to switch workspace","error",3e3),b}finally{G=!1}}async function oe(m){t("requesting workspace git pull for %s",m);try{let b=await te.send("git-pull-workspace",{});t("workspace git pull result: %o",b);let Q=b?.status;if(Q==="up_to_date"){J("Already up to date","success",2e3);return}if(Q==="stash_pop_conflict"){J("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}J("Git pulled "+Ce(m),"success",2e3)}catch(b){t("workspace git pull failed: %o",b);let Q=b?.code,ee=b?.message;if(Q==="rebase_conflict"){J("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(Q==="rebase_conflict_abort_failed"){J("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(Q==="busy"){J("Git pull skipped: another operation is running","warning",3e3);return}let Z=ee?`: ${ee}`:"";throw J(`Git pull failed${Z}`,"error",3e3),b}}async function ke(m,b){t("setting workspace visibility %s \u2192 %s",m,String(b));try{await te.send("set-workspace-visibility",{path:m,visible:b}),await fe()}catch(Q){t("workspace visibility update failed: %o",Q),J("Failed to update project visibility","error",3e3)}}async function fe(){try{let m=await te.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let b=m.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),Q=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,ee=Array.isArray(m.hidden)?m.hidden.filter(g=>typeof g=="string"):[];$e.setState({workspace:{current:Q,available:b,hidden:ee}});let Z=window.localStorage.getItem("beads-ui.workspace");Z&&(!b.some(I=>I.path===Z)||ee.includes(Z)?window.localStorage.removeItem("beads-ui.workspace"):Q&&Z!==Q.path&&(t("restoring saved workspace preference: %s",Z),await ge(Z)))}}catch(m){t("failed to load workspaces: %o",m)}}te.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&($e.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),fe(),ae())});let qe=!1;if(typeof te.onConnection=="function"){let m=b=>{t("ws state %s",b),b==="reconnecting"||b==="closed"?(qe=!0,J("Connection lost. Reconnecting\u2026","error",4e3)):b==="open"&&qe&&(qe=!1,J("Reconnected","success",2200),jp($e,(Q,ee)=>{t(`${Q}: %o`,ee)}),L())};te.onConnection(m)}let Je="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(Je=m)}catch(m){t("view parse error: %o",m)}let $e=ra({config:Up(),view:Je});te.on("worker-queue-snapshot",m=>{let b=m;if(!b||!b.queue)return;let Q=$e.getState().workspace.current?.path;if(typeof Q=="string"&&Q.length>0&&b.root_dir!==Q){t("dropping worker-queue snapshot for %s",String(b.root_dir));return}try{re.set(b.queue)}catch{}});let ft=ea($e);ft.start();let Tt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),bt=async(m,b)=>{try{return await ce(m,b)}catch(Q){if(Tt.has(m))throw Q;return[]}};n&&Ki(n,$e,ft);let it=document.getElementById("workspace-picker");it&&ul(it,$e,ge,oe,ke);let he=Ji(e,(m,b)=>ce(m,b));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>he.open())}catch{}let He=xi(e,{policyStore:ue,transport:(m,b)=>ce(m,b),labelOptions:()=>{let m=new Set;for(let[b]of oo)for(let Q of j.snapshotFor(b)||[]){let ee=Q.labels;if(Array.isArray(ee))for(let Z of ee)typeof Z=="string"&&Z.length>0&&m.add(Z)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&m.addEventListener("click",()=>He.open())}catch{}let Rt=pa(o,{gotoIssue:m=>ft.gotoIssue(m),issueStores:j,transport:bt,workerQueueStore:re,uiOrderStore:Ee,displayPolicyStore:ue,closedRange:Ye,onClosedRangeChange:m=>{Pe(m)},onNewIssue:()=>he.open()}),zt=ro(a,{transport:bt,issueStores:j,queueStore:re,execPresetStore:Ae,sessionLogStore:z,uiOrderStore:Ee,gotoIssue:m=>$e.setState({selected_id:m}),getWorkspacePath:()=>$e.getState().workspace.current?.path}),Ht=Vi(i,{transport:bt,pipelineStore:de,execPresetStore:Ae,gotoIssue:m=>ft.gotoIssue(m),getWorkspacePath:()=>$e.getState().workspace.current?.path,switchWorkspace:m=>ge(m)}),ie=wi(l,{issueStores:j,transport:bt,queueStore:re,execPresetStore:Ae,sessionLogStore:z,getWorkspacePath:()=>$e.getState().workspace.current?.path,onNavigate:m=>{$e.getState().view==="worker"?$e.setState({selected_id:m}):ft.gotoIssue(m)},onClose:()=>{let m=$e.getState();$e.setState({selected_id:null});try{ft.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{$e.setState({selected_id:null}),ft.gotoView("worker"),zt.openExecDefaults()}}),v=$e.getState().selected_id;v&&(l.hidden=!1,ie.load(v),U(v)),$e.subscribe(m=>{let b=m.selected_id;b?(l.hidden=!1,ie.load(b),G||U(b)):(ie.clear(),l.hidden=!0,k())});let Y=m=>{o.hidden=m.view!=="board",a.hidden=m.view!=="worker",i.hidden=m.view!=="monitor",Qe(m.view==="board"),Ge(m.view==="worker"),kt(m.view==="monitor"),dt(m.view==="board"||m.view==="worker"||!!m.selected_id),!m.selected_id&&m.view==="board"&&Rt.load(),m.view==="worker"&&zt.load(),m.view==="monitor"?Ht.load():Ht.pause(),window.localStorage.setItem("beads-ui.view",m.view)};$e.subscribe(Y),Y($e.getState()),Ke(),C(),$(),fe().finally(()=>{F=!0,je()}),window.addEventListener("keydown",m=>{let b=m.ctrlKey||m.metaKey,Q=String(m.key||"").toLowerCase(),ee=m.target,Z=ee&&ee.tagName?String(ee.tagName).toLowerCase():"",g=Z==="input"||Z==="textarea"||Z==="select"||ee&&typeof ee.isContentEditable=="boolean"&&ee.isContentEditable;b&&Q==="n"&&(g||(m.preventDefault(),he.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&zp(t)});export{zp as bootstrap,Up as readBootstrapConfig,jp as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
