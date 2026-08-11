var El=Object.create;var es=Object.defineProperty;var Cl=Object.getOwnPropertyDescriptor;var Rl=Object.getOwnPropertyNames;var Il=Object.getPrototypeOf,Ll=Object.prototype.hasOwnProperty;var Dl=(e,t,r)=>t in e?es(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ts=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ol=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rl(t))!Ll.call(e,s)&&s!==r&&es(e,s,{get:()=>t[s],enumerable:!(n=Cl(t,s))||n.enumerable});return e};var Pl=(e,t,r)=>(r=e!=null?El(Il(e)):{},Ol(t||!e||!e.__esModule?es(r,"default",{value:e,enumerable:!0}):r,e));var je=(e,t,r)=>Dl(e,typeof t!="symbol"?t+"":t,r);var Mo=ts((jp,Po)=>{var $r=1e3,xr=$r*60,Sr=xr*60,pr=Sr*24,Bl=pr*7,Ul=pr*365.25;Po.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return jl(e);if(r==="number"&&isFinite(e))return t.long?Hl(e):zl(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jl(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Ul;case"weeks":case"week":case"w":return r*Bl;case"days":case"day":case"d":return r*pr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Sr;case"minutes":case"minute":case"mins":case"min":case"m":return r*xr;case"seconds":case"second":case"secs":case"sec":case"s":return r*$r;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function zl(e){var t=Math.abs(e);return t>=pr?Math.round(e/pr)+"d":t>=Sr?Math.round(e/Sr)+"h":t>=xr?Math.round(e/xr)+"m":t>=$r?Math.round(e/$r)+"s":e+"ms"}function Hl(e){var t=Math.abs(e);return t>=pr?gn(e,t,pr,"day"):t>=Sr?gn(e,t,Sr,"hour"):t>=xr?gn(e,t,xr,"minute"):t>=$r?gn(e,t,$r,"second"):e+" ms"}function gn(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var Fo=ts((zp,No)=>{function Wl(e){r.debug=r,r.default=r,r.coerce=l,r.disable=a,r.enable=s,r.enabled=i,r.humanize=Mo(),r.destroy=u,Object.keys(e).forEach(p=>{r[p]=e[p]}),r.names=[],r.skips=[],r.formatters={};function t(p){let f=0;for(let h=0;h<p.length;h++)f=(f<<5)-f+p.charCodeAt(h),f|=0;return r.colors[Math.abs(f)%r.colors.length]}r.selectColor=t;function r(p){let f,h=null,A,$;function v(...N){if(!v.enabled)return;let V=v,j=Number(new Date),ne=j-(f||j);V.diff=ne,V.prev=f,V.curr=j,f=j,N[0]=r.coerce(N[0]),typeof N[0]!="string"&&N.unshift("%O");let O=0;N[0]=N[0].replace(/%([a-zA-Z%])/g,(T,I)=>{if(T==="%%")return"%";O++;let z=r.formatters[I];if(typeof z=="function"){let de=N[O];T=z.call(V,de),N.splice(O,1),O--}return T}),r.formatArgs.call(V,N),(V.log||r.log).apply(V,N)}return v.namespace=p,v.useColors=r.useColors(),v.color=r.selectColor(p),v.extend=n,v.destroy=r.destroy,Object.defineProperty(v,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(A!==r.namespaces&&(A=r.namespaces,$=r.enabled(p)),$),set:N=>{h=N}}),typeof r.init=="function"&&r.init(v),v}function n(p,f){let h=r(this.namespace+(typeof f>"u"?":":f)+p);return h.log=this.log,h}function s(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let f=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of f)h[0]==="-"?r.skips.push(h.slice(1)):r.names.push(h)}function o(p,f){let h=0,A=0,$=-1,v=0;for(;h<p.length;)if(A<f.length&&(f[A]===p[h]||f[A]==="*"))f[A]==="*"?($=A,v=h,A++):(h++,A++);else if($!==-1)A=$+1,v++,h=v;else return!1;for(;A<f.length&&f[A]==="*";)A++;return A===f.length}function a(){let p=[...r.names,...r.skips.map(f=>"-"+f)].join(",");return r.enable(""),p}function i(p){for(let f of r.skips)if(o(p,f))return!1;for(let f of r.names)if(o(p,f))return!0;return!1}function l(p){return p instanceof Error?p.stack||p.message:p}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}No.exports=Wl});var qo=ts((At,hn)=>{At.formatArgs=Yl;At.save=Vl;At.load=Kl;At.useColors=Gl;At.storage=Zl();At.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();At.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Gl(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Yl(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+hn.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}At.log=console.debug||console.log||(()=>{});function Vl(e){try{e?At.storage.setItem("debug",e):At.storage.removeItem("debug")}catch{}}function Kl(){let e;try{e=At.storage.getItem("debug")||At.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Zl(){try{return localStorage}catch{}}hn.exports=Fo()(At);var{formatters:Xl}=hn.exports;Xl.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Pr=globalThis,mn=Pr.trustedTypes,ko=mn?mn.createPolicy("lit-html",{createHTML:e=>e}):void 0,To="$lit$",er=`lit$${Math.random().toFixed(9).slice(2)}$`,Eo="?"+er,Ml=`<${Eo}>`,dr=document,Mr=()=>dr.createComment(""),Nr=e=>e===null||typeof e!="object"&&typeof e!="function",ls=Array.isArray,Nl=e=>ls(e)||typeof e?.[Symbol.iterator]=="function",rs=`[ 	
\f\r]`,Or=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,wo=/-->/g,$o=/>/g,lr=RegExp(`>|${rs}(?:([^\\s"'>=/]+)(${rs}*=${rs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xo=/'/g,So=/"/g,Co=/^(?:script|style|textarea|title)$/i,cs=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),c=cs(1),Gt=cs(2),Pp=cs(3),ur=Symbol.for("lit-noChange"),tt=Symbol.for("lit-nothing"),Ao=new WeakMap,cr=dr.createTreeWalker(dr,129);function Ro(e,t){if(!ls(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ko!==void 0?ko.createHTML(t):t}var Fl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=Or;for(let i=0;i<r;i++){let l=e[i],u,p,f=-1,h=0;for(;h<l.length&&(a.lastIndex=h,p=a.exec(l),p!==null);)h=a.lastIndex,a===Or?p[1]==="!--"?a=wo:p[1]!==void 0?a=$o:p[2]!==void 0?(Co.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=lr):p[3]!==void 0&&(a=lr):a===lr?p[0]===">"?(a=s??Or,f=-1):p[1]===void 0?f=-2:(f=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?lr:p[3]==='"'?So:xo):a===So||a===xo?a=lr:a===wo||a===$o?a=Or:(a=lr,s=void 0);let A=a===lr&&e[i+1].startsWith("/>")?" ":"";o+=a===Or?l+Ml:f>=0?(n.push(u),l.slice(0,f)+To+l.slice(f)+er+A):l+er+(f===-2?i:A)}return[Ro(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Fr=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,p]=Fl(t,r);if(this.el=e.createElement(u,n),cr.currentNode=this.el.content,r===2||r===3){let f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(s=cr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let f of s.getAttributeNames())if(f.endsWith(To)){let h=p[a++],A=s.getAttribute(f).split(er),$=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:$[2],strings:A,ctor:$[1]==="."?ss:$[1]==="?"?os:$[1]==="@"?as:kr}),s.removeAttribute(f)}else f.startsWith(er)&&(l.push({type:6,index:o}),s.removeAttribute(f));if(Co.test(s.tagName)){let f=s.textContent.split(er),h=f.length-1;if(h>0){s.textContent=mn?mn.emptyScript:"";for(let A=0;A<h;A++)s.append(f[A],Mr()),cr.nextNode(),l.push({type:2,index:++o});s.append(f[h],Mr())}}}else if(s.nodeType===8)if(s.data===Eo)l.push({type:2,index:o});else{let f=-1;for(;(f=s.data.indexOf(er,f+1))!==-1;)l.push({type:7,index:o}),f+=er.length-1}o++}}static createElement(t,r){let n=dr.createElement("template");return n.innerHTML=t,n}};function yr(e,t,r=e,n){if(t===ur)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Nr(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=yr(e,s._$AS(e,t.values),s,n)),t}var ns=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??dr).importNode(r,!0);cr.currentNode=s;let o=cr.nextNode(),a=0,i=0,l=n[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new qr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new is(o,this,t)),this._$AV.push(u),l=n[++i]}a!==l?.index&&(o=cr.nextNode(),a++)}return cr.currentNode=dr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},qr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=tt,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=yr(this,t,r),Nr(t)?t===tt||t==null||t===""?(this._$AH!==tt&&this._$AR(),this._$AH=tt):t!==this._$AH&&t!==ur&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Nl(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==tt&&Nr(this._$AH)?this._$AA.nextSibling.data=t:this.T(dr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Fr.createElement(Ro(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new ns(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ao.get(t.strings);return r===void 0&&Ao.set(t.strings,r=new Fr(t)),r}k(t){ls(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(Mr()),this.O(Mr()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},kr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=tt,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=tt}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=yr(this,t,r,0),a=!Nr(t)||t!==this._$AH&&t!==ur,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=yr(this,i[n+l],r,l),u===ur&&(u=this._$AH[l]),a||(a=!Nr(u)||u!==this._$AH[l]),u===tt?t=tt:t!==tt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===tt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ss=class extends kr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===tt?void 0:t}},os=class extends kr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==tt)}},as=class extends kr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=yr(this,t,r,0)??tt)===ur)return;let n=this._$AH,s=t===tt&&n!==tt||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==tt&&(n===tt||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},is=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){yr(this,t)}};var ql=Pr.litHtmlPolyfillSupport;ql?.(Fr,qr),(Pr.litHtmlVersions??(Pr.litHtmlVersions=[])).push("3.3.1");var De=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new qr(t.insertBefore(Mr(),o),o,void 0,r??{})}return s._$AI(e),s};var It="today",Ut=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function Yt(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function wr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function Io(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Lo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Do(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Oo(){let e=new Map,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{set(n,s,o=null){e.set(n,{lines:Array.isArray(s)?[...s]:[],last_event_at:typeof o=="number"?o:null}),r()},append(n,s){let o=e.get(n)||{lines:[],last_event_at:null};o.lines=[...o.lines,s],o.last_event_at=Date.now(),e.set(n,o),r()},get(n){return e.get(n)||null},clear(n){typeof n=="string"?e.delete(n):e.clear(),r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}var Bo=Pl(qo(),1);function Xe(e){return(0,Bo.default)(`beads-ui:${e}`)}function Pt(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function fr(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function zo(e,t){let r=Pt(e.created_at),n=Pt(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ho(e,t){let r=Pt(e.updated_at),n=Pt(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Wo(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=Pt(e.created_at),o=Pt(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Go(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Ql=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Uo(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function jo(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Ql.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function Yo(e,t){let r=Uo(e),n=Uo(t);if(r!==n)return r<n?-1:1;let s=jo(e),o=jo(t);if(s!==o)return s<o?-1:1;let a=Pt(e&&e.created_at),i=Pt(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var ds=2**20;function Ar(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-Pt(e&&e.created_at)}function bn(e){return(t,r)=>{let n=Ar(t,e),s=Ar(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function us(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Ar(i,r)-ds};if(!i)return{rank:Ar(a,r)+ds};let l=Ar(a,r),u=Ar(i,r),p=(l+u)/2;return l<p&&p<u?{rank:p}:{renormalize:n.map((f,h)=>({bead_id:f.id,rank:h*ds}))}}function ps(e,t={}){let r=Xe(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||fr;function u(){for(let h of Array.from(a))try{h()}catch{}}function p(){s=Array.from(n.values()).sort(l)}function f(h){if(i||!h||h.id!==e)return;let A=Number(h.revision)||0;if(r("apply %s rev=%d",h.type,A),!(A<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(A<=o)return;n.clear();let $=Array.isArray(h.issues)?h.issues:[];for(let v of $)v&&typeof v.id=="string"&&v.id.length>0&&n.set(v.id,v);p(),o=A,u();return}if(h.type==="upsert"){let $=h.issue;if($&&typeof $.id=="string"&&$.id.length>0){let v=n.get($.id);if(!v)n.set($.id,$);else{let N=Number.isFinite(v.updated_at)?v.updated_at:0,V=Number.isFinite($.updated_at)?$.updated_at:0;if(N<=V){for(let j of Object.keys(v))j in $||delete v[j];for(let[j,ne]of Object.entries($))v[j]=ne}}p()}o=A,u()}else if(h.type==="delete"){let $=String(h.issue_id||"");$&&(n.delete($),p()),o=A,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:f,snapshot(){return s},size(){return n.size},getById(h){return n.get(h)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function vn(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function Vo(e){let t=Xe("subs"),r=new Map,n=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let p=Array.isArray(l.added)?l.added:[],f=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let A of Array.from(u)){let $=r.get(A);if(!$)continue;let v=$.itemsById;for(let N of p)typeof N=="string"&&N.length>0&&v.set(N,!0);for(let N of f)typeof N=="string"&&N.length>0&&v.set(N,!0);for(let N of h)typeof N=="string"&&N.length>0&&v.delete(N)}}async function o(i,l){let u=vn(l);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let f=r.get(i);if(f&&f.key!==u){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let p=n.get(u);p&&p.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(f){let h=r.get(i)||null;if(h){let A=n.get(h.key);A&&(A.delete(i),A.size===0&&n.delete(h.key))}throw r.delete(i),f}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let f=r.get(i)||null;if(f){let h=n.get(f.key);h&&(h.delete(i),h.size===0&&n.delete(f.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:vn,selectors:{getIds(i){let l=r.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=r.get(i);return u?u.itemsById.has(l):!1},count(i){let l=r.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=r.get(i),u={};if(!l)return u;for(let p of l.itemsById.keys())u[p]=!0;return u}}}}function Ko(){let e=Xe("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let l of Array.from(n))try{l()}catch{}}function a(l,u,p){let f=u?vn(u):"",h=r.get(l)||"",A=t.has(l);if(e("register %s key=%s (prev=%s)",l,f,h),A&&h&&f&&h!==f){let $=t.get(l);if($)try{$.dispose()}catch{}let v=s.get(l);if(v){try{v()}catch{}s.delete(l)}let N=ps(l,p);t.set(l,N);let V=N.subscribe(()=>o());s.set(l,V)}else if(!A){let $=ps(l,p);t.set(l,$);let v=$.subscribe(()=>o());s.set(l,v)}return r.set(l,f),()=>i(l)}function i(l){e("unregister %s",l),r.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let p=s.get(l);if(p){try{p()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return n.add(l),()=>n.delete(l)}}}function Zo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Xo(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function fs(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Jl(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function ec(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function Qo(e){let t=Xe("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Jl(n),a=ec(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=fs(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?fs(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var tc=Object.freeze({workspace_config:{default_workspace:null}});function Jo(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:tc.workspace_config.default_workspace}}}function ea(e={}){let t=Xe("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Jo(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Jo(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,p)=>u!==r.workspace.hidden[p]),l=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,p)=>u===r.worker.show_closed_children[p])&&!i&&!l||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function ta(e){let t=Xe("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function l(u){return async(f,h)=>{let A=s++,$=Date.now();n.set(A,{type:f,start_ts:$}),t("request start id=%d type=%s count=%d",A,f,r+1),a();let v=!1,N=()=>{v||(v=!0,n.delete(A),i())},V=setTimeout(()=>{v||(t("request TIMEOUT id=%d type=%s elapsed=%dms",A,f,Date.now()-$),N())},3e4);try{let j=await u(f,h),ne=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",A,f,ne),j}catch(j){let ne=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",A,f,ne,j),j}finally{clearTimeout(V),N()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([p,f])=>({id:p,type:f.type,elapsed_ms:u-f.start_ts}))}}}function ee(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function yn(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Go),l;switch(i){case"created_desc":return l.sort(fr),l;case"created_asc":return l.sort(zo),l;case"updated_desc":return l.sort(Ho),l;case"priority":return l.sort(Wo),l;case"manual":default:{let u=r();return u?l.sort(bn(u)):l.sort(fr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Br(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function bt(e){let t=Br(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function Et(e,t){let r=Br(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function kn(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Br(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function wn(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},p=n(us(i,l,u.order),a);s(u,p);let f=await t("ui-order-set",{expected_revision:u.revision,entries:p});if(f&&f.conflict){let h={revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}};r.set(h);let A=n(us(i,l,h.order),a);s(h,A);let $=await t("ui-order-set",{expected_revision:h.revision,entries:A});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else f&&f.applied&&r.set({revision:typeof f.revision=="number"?f.revision:0,order:f.order||{}})}return{applyReorder:o}}function $n(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function _s(e,t){return!t||typeof e!="string"||e.length===0||$n(t.visible_labels).includes(e)?!0:$n(t.hidden_labels).includes(e)?!1:!$n(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function xn(e,t){return $n(e).filter(r=>_s(r,t))}function tr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}var rc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},na={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},ra={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},nc={review:"\u2713",skip:"\u2298"},rr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function sc(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function sa(e){let t=e&&e.fill||"none";return t==="none"?rr.none:e&&e.stale===!0?rr.stale:t==="dim"?rr.dim:e&&e.glyph==="review"?rr.review:e&&e.glyph==="skip"?rr.skip:rr.done}function oc(e){if(!e||e.fill==="none"||!e.approval_state)return sa(e);let t=[];return e.glyph==="review"?t.push(rr.review):e.glyph==="skip"&&t.push(rr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function ac(e,t,r){let n=rc[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=nc[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let l=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return c`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${l}>
        ${na[e]||e}
      </div>
    </div>
  `}function Sn(e,t){if(!e||!e.stages)return"";let r=ra[e.route]||ra.spec_backed,n=e.stages,s=sc(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${na[a]||a} ${a==="plan"?oc(n[a]||{}):sa(n[a]||{})}`).join(" \xB7 ")}`;return c`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>ac(a,n[a]||{},a===s))}
    </div>
  `}function ic(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var oa=2;function lc(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(c`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,oa).join(", "),s=r.length-oa,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(c`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function cc(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&tr(r,"route")){let a=n.route_source==="derived";s.push(c`<span
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
      </button>`),tr(r,"blocked")&&s.push(...lc(e.blocked_info));let o=t.cleanupFailureFor?t.cleanupFailureFor(e.id):null;if(o&&tr(r,"blocked")){let a=t.isCleanupDiagnosisPending?t.isCleanupDiagnosisPending(e.id):!1,i=o.diagnosis&&typeof o.diagnosis=="object"&&!Array.isArray(o.diagnosis)?o.diagnosis:null;if(s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`),i){let l=i.malformed===!0||i.verdict==="malformed"?"\uD310\uC815 \uBD88\uAC00":String(i.verdict||"\uD310\uC815 \uBD88\uAC00"),u=typeof i.evidence=="string"?i.evidence.trim().slice(0,96):"",p=typeof i.fix_bead_id=="string"&&i.fix_bead_id.length>0?` \xB7 fix ${i.fix_bead_id}`:"",f=u?` \xB7 ${u}`:"";s.push(c`<span
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
      </button>`)}return s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function dc(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function uc(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?c`<span class="board-card__time-sep">·</span>`:""}
    ${r?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function pc(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]},n=r.total||0,s=t.isExpanded?t.isExpanded(e.id):!0,o=n>0?r.children.slice().sort(Yo):r.children;return c`
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
        ${uc(e)}
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
                  <span class=${dc(a.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i+1}</span>
                  <span class="board-card__roll-child-title"
                    >${a.title||a.id}</span
                  >
                </button>`)}
          </div>`:""}
    </div>
  `}function An(e,t){let r=ic(e.priority);return c`
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
      ${cc(e,t)}
      ${e.workflow&&tr(t.policy||null,"stepper")?Sn(e.workflow,e.status):""}
      ${pc(e,t)}
    </article>
  `}function Tr(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return c`
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
              ${Ut.map(o=>c`<option
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
  `}function aa(e,t,r){return c`
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
  `}var fc=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],_c=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],mc=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function gc(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return c`
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
  `}function ia(e,t,r){return c`
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
        ${fc.map(n=>c`<option
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
        ${_c.map(n=>c`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${gc(e,t,r)}
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
        ${mc.map(n=>c`<option
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
  `}var hc=200,bc={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},vc=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),la="beads-ui.board.sort",ca=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function yc(){try{let e=window.localStorage.getItem(la);if(e&&ca.has(e))return e}catch{}return"created_desc"}function da(e,t){let r=Xe("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,p=t.onNewIssue,f=t.closedRange||It,h=s?yn(s,a):null,A=wn({transport:o,uiOrderStore:a}),$=[],v=[],N=[],V=[],j=[],ne=[],O=!1,E=0,T=yc(),I=new Map,z=new Map,de=new Map,ye=new Set,he=new Set,ue={search:"",priority:"",type:"",labels:[]},Ie=!1,ke=null;function Ge(C){return String(C.status||"open")==="open"}function Ve(C){let d=String(C.status||"open");return d==="open"||d==="blocked"}function Te(C){let d=ue.search.trim().toLowerCase(),m=ue.priority,x=ue.type,L=ue.labels;return C.filter(ie=>{if(d){let ge=String(ie.id||"").toLowerCase(),oe=String(ie.title||"").toLowerCase();if(!ge.includes(d)&&!oe.includes(d))return!1}if(m!==""&&String(ie.priority)!==m||x!==""&&String(ie.issue_type||"")!==x)return!1;if(L.length>0){let ge=Array.isArray(ie.labels)?ie.labels:[];if(!L.some(oe=>ge.includes(oe)))return!1}return!0})}function Q(){let C=new Set;for(let d of[$,v,N,V,j,ne])for(let m of d){let x=Array.isArray(m.labels)?m.labels:[];for(let L of x)typeof L=="string"&&L.length>0&&C.add(L)}return Array.from(C).sort()}function B(){return ue.search.trim()!==""||ue.priority!==""||ue.type!==""||ue.labels.length>0}function X(){try{if(h){let C=h.selectBoardColumn("tab:board:in-progress","in_progress",T),d=h.selectBoardColumn("tab:board:blocked","blocked",T).filter(Ve),m=new Set(C.map(_e=>_e.id)),x=h.selectBoardColumn("tab:board:ready","ready",T).filter(_e=>Ge(_e)&&!m.has(_e.id)),L=h.selectBoardColumn("tab:board:resolved","resolved",T),ie=h.selectBoardColumn("tab:board:deferred","deferred",T),ge=h.selectBoardColumn("tab:board:closed","closed").slice(0,hc),oe=[...d,...x,...C,...L,...ge];se(oe);let $e=new Set;for(let _e of oe)_e&&_e.id&&!ms(_e)&&$e.add(_e.id);let Ee=!B();$=Ee?Ur(d,$e):d,v=Ee?Ur(x,$e):x,N=Ee?Ur(C,$e):C,V=Ee?Ur(L,$e):L,j=ie,E=ie.length,ne=Ee?Ur(ge,$e):ge,I=new Map;for(let _e of $)I.set(_e.id,"open");for(let _e of v)I.set(_e.id,"open");for(let _e of N)I.set(_e.id,"in_progress");for(let _e of V)I.set(_e.id,"resolved");for(let _e of j)I.set(_e.id,"deferred");for(let _e of ne)I.set(_e.id,"closed");z=new Map;for(let _e of $)z.set(_e.id,"blocked-col");for(let _e of v)z.set(_e.id,"ready-col");for(let _e of N)z.set(_e.id,"in-progress-col");for(let _e of V)z.set(_e.id,"resolved-col");for(let _e of ne)z.set(_e.id,"closed-col")}We()}catch{$=[],v=[],N=[],V=[],j=[],ne=[],de=new Map,We()}}function se(C){let d=new Map;for(let x of C)x&&x.id&&!d.has(x.id)&&d.set(x.id,x);let m=new Map;for(let x of d.values()){let L=ms(x);if(!L)continue;let ie=m.get(L);ie||(ie=[],m.set(L,ie)),ie.push({id:x.id,title:x.title,status:x.status,metadata:x.metadata,created_at:x.created_at,updated_at:x.updated_at})}de=m}function Se(C){let d=de.get(C)||[],m=0;for(let L of d)(L.status==="resolved"||L.status==="closed")&&(m+=1);let x=kn(d);return{total:d.length,count:m,current:x,children:d}}function pe(C){return!ye.has(C)}function qe(C,d){C.preventDefault(),C.stopPropagation(),ye.has(d)?ye.delete(d):ye.add(d),We()}function me(C,d){C.preventDefault(),C.stopPropagation(),n(d)}function Re(C,d){C.preventDefault(),C.stopPropagation(),n(d)}function q(C,d){ke||n(d)}function M(C,d){C.preventDefault(),C.stopPropagation(),kc(d).then(m=>{m&&ee("\uBCF5\uC0AC\uB428","success",1200)})}function ae(C,d){ke=d,C.dataTransfer&&(C.dataTransfer.setData("text/plain",d),C.dataTransfer.effectAllowed="move"),C.target.classList.add("board-card--dragging")}function ve(C){C.target.classList.remove("board-card--dragging"),yt(),setTimeout(()=>{ke=null},0)}function we(C){let d=String(C.target.value||"");!d||d===f||(f=d,u&&u(d),We())}function ze(){return i?i.get():null}function D(C){let d=l?l.get():null,m=d?d.cleanup_failed:null;if(!m||typeof m!="object"||Array.isArray(m))return null;let x=m[C];return!x||typeof x!="object"||Array.isArray(x)?null:x}function H(C,d){if(!C||typeof C!="object"||Array.isArray(C))return!1;let m=Object.values(C),x=new Set;for(let L of m)L&&typeof L=="object"&&typeof L.resumed_from=="string"&&L.resumed_from.length>0&&x.add(L.resumed_from);return m.some(L=>L&&typeof L=="object"&&L.bead_id===d&&L.cleanup_diagnosis===!0&&(L.status==="running"||L.status==="paused"&&!x.has(L.attempt_id)))}function P(C){let d=l?l.get():null;return he.has(C)||H(d?d.attempts:null,C)}function te(C){C&&C.queue&&l&&l.set(C.queue)}async function w(C,d){if(C.preventDefault(),C.stopPropagation(),!o||!l||!D(d)||he.has(d))return;he.add(d),We();let m;try{let x=l.get(),L=x&&typeof x.revision=="number"?x.revision:0;if(m=await o("worker-cleanup-diagnose",{bead_id:d,expected_revision:L}),te(m),m&&m.conflict){let ie=l.get(),ge=ie&&typeof ie.revision=="number"?ie.revision:0;m=await o("worker-cleanup-diagnose",{bead_id:d,expected_revision:ge}),te(m)}}finally{he.delete(d),We()}m&&!m.conflict&&m.ok===!1&&m.reason&&ee(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}let G={onCardClick:q,onCopyId:M,onDragStart:ae,onDragEnd:ve,onClosedRangeChange:we,rollupFor:Se,isExpanded:pe,onRollupToggle:qe,onChildClick:me,onFromChipClick:Re,cleanupFailureFor:D,isCleanupDiagnosisPending:P,onCleanupDiagnose:w,get policy(){return ze()}};function F(C,d){ke||(Le(),n(d))}function Z(C,d){C.preventDefault(),C.stopPropagation(),Le(),n(d)}let le={...G,onCardClick:F,onChildClick:Z,onFromChipClick:Z,get policy(){return ze()}};function Ae(C){let d=C.target,m=e.querySelector(".board-filter__labels");d&&m&&m.contains(d)||He()}function Me(C){C.key==="Escape"&&He()}function Ke(){Ie||(Ie=!0,document.addEventListener("mousedown",Ae),document.addEventListener("keydown",Me),We())}function He(){Ie&&(Ie=!1,document.removeEventListener("mousedown",Ae),document.removeEventListener("keydown",Me),We())}function ct(C){C.key==="Escape"&&Le()}function at(){O||(O=!0,document.addEventListener("keydown",ct),We())}function Le(){O&&(O=!1,document.removeEventListener("keydown",ct),We())}let vt={onClose:Le,onOverlayClick(C){C.target===C.currentTarget&&Le()}},dt={onSearchInput(C){ue.search=String(C.target.value||""),X()},onPriorityChange(C){ue.priority=String(C.target.value||""),X()},onTypeChange(C){ue.type=String(C.target.value||""),X()},onSortChange(C){let d=String(C.target.value||"");if(!(!ca.has(d)||d===T)){T=d;try{window.localStorage.setItem(la,d)}catch{}X()}},onDeferredToggle(){O?Le():at()},onLabelMenuToggle(){Ie?He():Ke()},onLabelToggle(C){let d=ue.labels.indexOf(C);d===-1?ue.labels.push(C):ue.labels.splice(d,1),X()},onLabelClear(){ue.labels.length!==0&&(ue.labels=[],X())},onNewIssue(){p&&p()}};function rt(){return c`
      <div class="board-view">
        ${ia(ue,dt,{sort_mode:T,deferred_popup_open:O,deferred_count:E,label_options:Q(),label_menu_open:Ie})}
        <div class="board-root">
          ${Tr({title:"Blocked",id:"blocked-col",items:Te($)},G)}
          ${Tr({title:"Ready",id:"ready-col",items:Te(v)},G)}
          ${Tr({title:"In progress",id:"in-progress-col",items:Te(N)},G)}
          ${Tr({title:"Resolved",id:"resolved-col",items:Te(V)},G)}
          ${Tr({title:"Closed",id:"closed-col",items:Te(ne),is_closed:!0,closed_range:f},G)}
        </div>
        ${O?aa({items:Te(j),count:E},le,vt):""}
      </div>
    `}function We(){De(rt(),e),gt()}function gt(){try{let C=e.querySelector("#deferred-popup");C&&!C.open&&(typeof C.showModal=="function"?C.showModal():C.setAttribute("open",""));let d=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let m of d)Array.from(m.querySelectorAll(".board-card")).forEach((L,ie)=>{L.tabIndex=ie===0?0:-1})}catch{}}async function ut(C,d){if(!o){ee("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:C,status:d}),ee("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(m){r("update-status failed: %o",m),ee("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function nt(C){switch(C){case"blocked-col":return $;case"ready-col":return v;case"in-progress-col":return N;case"resolved-col":return V;default:return[]}}function st(C,d,m){if(!o||!a)return;let x=nt(C),L=x.find(Ee=>Ee.id===d);if(!L)return;let ie=x.filter(Ee=>Ee.id!==d),ge=m.closest?m.closest(".board-card"):null,oe=ie.length;if(ge){let Ee=ge.getAttribute("data-issue-id");if(Ee===d)return;let _e=ie.findIndex(Ne=>Ne.id===Ee);_e>=0&&(oe=_e)}let $e=ie.slice();$e.splice(oe,0,L),A.applyReorder(d,$e,oe)}function yt(){for(let C of Array.from(e.querySelectorAll(".board-column--drag-over")))C.classList.remove("board-column--drag-over")}let Je=null;e.addEventListener("dragover",C=>{C.preventDefault(),C.dataTransfer&&(C.dataTransfer.dropEffect="move");let m=C.target.closest(".board-column");m&&m!==Je&&(Je&&Je.classList.remove("board-column--drag-over"),m.classList.add("board-column--drag-over"),Je=m)}),e.addEventListener("dragleave",C=>{let d=C.relatedTarget;(!d||!e.contains(d))&&Je&&(Je.classList.remove("board-column--drag-over"),Je=null)}),e.addEventListener("drop",C=>{C.preventDefault(),Je&&(Je.classList.remove("board-column--drag-over"),Je=null);let d=C.target,m=d.closest(".board-column");if(!m)return;let x=C.dataTransfer?.getData("text/plain")||"";if(!x)return;let L=m.id,ie=z.get(x);if(ie&&ie===L){if(vc.has(L)){if(T!=="manual"){ee("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}st(L,x,d)}return}let ge=bc[L];if(!ge){ee("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get(x)!==ge&&ut(x,ge)}),e.addEventListener("keydown",C=>{let d=C.target;if(!(d instanceof HTMLElement))return;let m=String(d.tagName||"").toLowerCase();if(m==="input"||m==="textarea"||m==="select"||m==="button"||m==="a"||d.isContentEditable===!0)return;let x=d.closest(".board-card");if(!x)return;let L=String(C.key||"");if(L==="Enter"||L===" "){C.preventDefault();let $e=x.getAttribute("data-issue-id");$e&&n($e);return}if(L!=="ArrowUp"&&L!=="ArrowDown"&&L!=="ArrowLeft"&&L!=="ArrowRight")return;C.preventDefault();let ie=x.closest(".board-column");if(!ie)return;let ge=Array.from(ie.querySelectorAll(".board-card")),oe=ge.indexOf(x);if(L==="ArrowDown"&&oe<ge.length-1){ht(x,ge[oe+1]);return}if(L==="ArrowUp"&&oe>0){ht(x,ge[oe-1]);return}if(L==="ArrowLeft"||L==="ArrowRight"){let $e=Array.from(e.querySelectorAll(".board-column")),Ee=$e.indexOf(ie),_e=L==="ArrowRight"?1:-1,Ne=Ee+_e;for(;Ne>=0&&Ne<$e.length;){let Qe=$e[Ne].querySelector(".board-card");if(Qe){ht(x,Qe);return}Ne+=_e}}});function ht(C,d){try{C.tabIndex=-1,d.tabIndex=0,d.focus()}catch{}}let Ze=null;h&&h.subscribe&&(Ze=h.subscribe(()=>{try{X()}catch{}}));let pt=null;i&&i.subscribe&&(pt=i.subscribe(()=>{try{X()}catch{}}));let ft=null;return l&&l.subscribe&&(ft=l.subscribe(()=>{We()})),{async load(){r("load"),X()},clear(){He(),Le(),Ze&&(Ze(),Ze=null),pt&&(pt(),pt=null),ft&&(ft(),ft=null),e.replaceChildren(),$=[],v=[],N=[],V=[],j=[],ne=[],I=new Map,z=new Map}}}function ms(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function Ur(e,t){return e.filter(r=>{let n=ms(r);return!(n&&t.has(n))})}async function kc(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function _r(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}var ma="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function lt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Vt=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],jr=[...Vt,"reasoning_output_tokens"],wc=["implementation","review-consult"];function gs(e){let t=0;for(let r of Vt)t+=lt(e?.[r]);return t}function $c(e){return!e||typeof e!="object"?!1:Vt.some(t=>Number.isFinite(e[t]))}function ua(e){return!e||typeof e!="object"?!1:jr.some(t=>Number.isFinite(e[t]))}function xc(e){let t={};for(let r of jr)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function pa(e){let t={};for(let r of jr)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function fa(e,t){return e==="codex"?lt(t.input_tokens)+lt(t.output_tokens):gs(t)}function Sc(e){return e==="claude"?"Claude":"Codex"}function Ac(e){return`\u03C4 ${ga(e)}`}function Tc(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${lt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${lt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${lt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${lt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${lt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(ma),o.join(`
`)}function mt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Sc(r)} ${Ac(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Tc(r,n)})}return t}function En(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let l of jr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=lt(i.breakdown[l])+lt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function hs(e){return!e||typeof e!="object"?null:Lt({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Ec(e){return e==="codex"?"codex":"claude"}function nr(){return{subtotal:0,breakdown:xc(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Tn(e,t,r){e.subtotal+=t.subtotal;for(let n of jr)Number.isFinite(t.usage[n])&&(e.breakdown[n]=lt(e.breakdown[n])+lt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function _a(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function ga(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Er(e){return $c(e)?`\u03C4 ${ga(gs(e))}`:null}function Mt(e){let t=Er(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Cr(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${lt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${lt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${lt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${lt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${gs(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(ma),r.join(`
`)}function Lt(e,t){let r={claude:nr(),codex:nr()},n={orchestrator:{claude:nr(),codex:nr()},implementation:{claude:nr(),codex:nr()},"review-consult":{claude:nr(),codex:nr()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(ua(l)){let p=Ec(i.runner),f=pa(l),h={provider:p,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:f,subtotal:fa(p,f)};f.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Tn(r[p],h,!0),Tn(n.orchestrator[p],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let p of u){if(!p||p.provider!=="codex"||!wc.includes(p.role)||!ua(p.usage))continue;let f=typeof p.receipt_id=="string"&&p.receipt_id.length>0?p.receipt_id:null;if(!f||s.has(f))continue;s.add(f);let h=pa(p.usage),A={provider:"codex",role:p.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:fa("codex",h)};A.receipt_id=f,typeof p.model=="string"&&(A.model=p.model),typeof p.session_id=="string"?A.session_id=p.session_id:typeof p.thread_id=="string"&&(A.session_id=p.thread_id),typeof p.turn_id=="string"&&(A.turn_id=p.turn_id),typeof p.completed_at=="string"&&(A.completed_at=p.completed_at),h.replayed===!0&&(A.replayed=!0),Tn(r.codex,A,!1),Tn(n[A.role].codex,A,!1)}}let o={};for(let i of["claude","codex"]){let l=r[i];if(l.legs.length===0)continue;let u=_a(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult"]){let l={};for(let u of["claude","codex"]){let p=n[i][u];p.legs.length>0&&(l[u]={..._a(p,!0),legs:p.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:Sa,setPrototypeOf:ha,isFrozen:Cc,getPrototypeOf:Rc,getOwnPropertyDescriptor:Ic}=Object,{freeze:$t,seal:Dt,create:xs}=Object,{apply:Ss,construct:As}=typeof Reflect<"u"&&Reflect;$t||($t=function(t){return t});Dt||(Dt=function(t){return t});Ss||(Ss=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});As||(As=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Cn=xt(Array.prototype.forEach),Lc=xt(Array.prototype.lastIndexOf),ba=xt(Array.prototype.pop),zr=xt(Array.prototype.push),Dc=xt(Array.prototype.splice),In=xt(String.prototype.toLowerCase),bs=xt(String.prototype.toString),vs=xt(String.prototype.match),Hr=xt(String.prototype.replace),Oc=xt(String.prototype.indexOf),Pc=xt(String.prototype.trim),Nt=xt(Object.prototype.hasOwnProperty),wt=xt(RegExp.prototype.test),Wr=Mc(TypeError);function xt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return Ss(e,t,n)}}function Mc(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return As(e,r)}}function Ce(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:In;ha&&ha(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(Cc(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Nc(e){for(let t=0;t<e.length;t++)Nt(e,t)||(e[t]=null);return e}function Kt(e){let t=xs(null);for(let[r,n]of Sa(e))Nt(e,r)&&(Array.isArray(n)?t[r]=Nc(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Kt(n):t[r]=n);return t}function Gr(e,t){for(;e!==null;){let n=Ic(e,t);if(n){if(n.get)return xt(n.get);if(typeof n.value=="function")return xt(n.value)}e=Rc(e)}function r(){return null}return r}var va=$t(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ys=$t(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ks=$t(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Fc=$t(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ws=$t(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),qc=$t(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ya=$t(["#text"]),ka=$t(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),$s=$t(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),wa=$t(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rn=$t(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bc=Dt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Uc=Dt(/<%[\w\W]*|[\w\W]*%>/gm),jc=Dt(/\$\{[\w\W]*/gm),zc=Dt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Hc=Dt(/^aria-[\-\w]+$/),Aa=Dt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Wc=Dt(/^(?:\w+script|data):/i),Gc=Dt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ta=Dt(/^html$/i),Yc=Dt(/^[a-z][.\w]*(-[.\w]+)+$/i),$a=Object.freeze({__proto__:null,ARIA_ATTR:Hc,ATTR_WHITESPACE:Gc,CUSTOM_ELEMENT:Yc,DATA_ATTR:zc,DOCTYPE_NAME:Ta,ERB_EXPR:Uc,IS_ALLOWED_URI:Aa,IS_SCRIPT_OR_DATA:Wc,MUSTACHE_EXPR:Bc,TMPLIT_EXPR:jc}),Yr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Vc=function(){return typeof window>"u"?null:window},Kc=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},xa=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Ea(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Vc(),t=ce=>Ea(ce);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Yr.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:p=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:f,DOMParser:h,trustedTypes:A}=e,$=l.prototype,v=Gr($,"cloneNode"),N=Gr($,"remove"),V=Gr($,"nextSibling"),j=Gr($,"childNodes"),ne=Gr($,"parentNode");if(typeof a=="function"){let ce=r.createElement("template");ce.content&&ce.content.ownerDocument&&(r=ce.content.ownerDocument)}let O,E="",{implementation:T,createNodeIterator:I,createDocumentFragment:z,getElementsByTagName:de}=r,{importNode:ye}=n,he=xa();t.isSupported=typeof Sa=="function"&&typeof ne=="function"&&T&&T.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Ie,TMPLIT_EXPR:ke,DATA_ATTR:Ge,ARIA_ATTR:Ve,IS_SCRIPT_OR_DATA:Te,ATTR_WHITESPACE:Q,CUSTOM_ELEMENT:B}=$a,{IS_ALLOWED_URI:X}=$a,se=null,Se=Ce({},[...va,...ys,...ks,...ws,...ya]),pe=null,qe=Ce({},[...ka,...$s,...wa,...Rn]),me=Object.seal(xs(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Re=null,q=null,M=Object.seal(xs(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ae=!0,ve=!0,we=!1,ze=!0,D=!1,H=!0,P=!1,te=!1,w=!1,G=!1,F=!1,Z=!1,le=!0,Ae=!1,Me="user-content-",Ke=!0,He=!1,ct={},at=null,Le=Ce({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),vt=null,dt=Ce({},["audio","video","img","source","image","track"]),rt=null,We=Ce({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),gt="http://www.w3.org/1998/Math/MathML",ut="http://www.w3.org/2000/svg",nt="http://www.w3.org/1999/xhtml",st=nt,yt=!1,Je=null,ht=Ce({},[gt,ut,nt],bs),Ze=Ce({},["mi","mo","mn","ms","mtext"]),pt=Ce({},["annotation-xml"]),ft=Ce({},["title","style","font","a","script"]),C=null,d=["application/xhtml+xml","text/html"],m="text/html",x=null,L=null,ie=r.createElement("form"),ge=function(b){return b instanceof RegExp||b instanceof Function},oe=function(){let b=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(L&&L===b)){if((!b||typeof b!="object")&&(b={}),b=Kt(b),C=d.indexOf(b.PARSER_MEDIA_TYPE)===-1?m:b.PARSER_MEDIA_TYPE,x=C==="application/xhtml+xml"?bs:In,se=Nt(b,"ALLOWED_TAGS")?Ce({},b.ALLOWED_TAGS,x):Se,pe=Nt(b,"ALLOWED_ATTR")?Ce({},b.ALLOWED_ATTR,x):qe,Je=Nt(b,"ALLOWED_NAMESPACES")?Ce({},b.ALLOWED_NAMESPACES,bs):ht,rt=Nt(b,"ADD_URI_SAFE_ATTR")?Ce(Kt(We),b.ADD_URI_SAFE_ATTR,x):We,vt=Nt(b,"ADD_DATA_URI_TAGS")?Ce(Kt(dt),b.ADD_DATA_URI_TAGS,x):dt,at=Nt(b,"FORBID_CONTENTS")?Ce({},b.FORBID_CONTENTS,x):Le,Re=Nt(b,"FORBID_TAGS")?Ce({},b.FORBID_TAGS,x):Kt({}),q=Nt(b,"FORBID_ATTR")?Ce({},b.FORBID_ATTR,x):Kt({}),ct=Nt(b,"USE_PROFILES")?b.USE_PROFILES:!1,ae=b.ALLOW_ARIA_ATTR!==!1,ve=b.ALLOW_DATA_ATTR!==!1,we=b.ALLOW_UNKNOWN_PROTOCOLS||!1,ze=b.ALLOW_SELF_CLOSE_IN_ATTR!==!1,D=b.SAFE_FOR_TEMPLATES||!1,H=b.SAFE_FOR_XML!==!1,P=b.WHOLE_DOCUMENT||!1,G=b.RETURN_DOM||!1,F=b.RETURN_DOM_FRAGMENT||!1,Z=b.RETURN_TRUSTED_TYPE||!1,w=b.FORCE_BODY||!1,le=b.SANITIZE_DOM!==!1,Ae=b.SANITIZE_NAMED_PROPS||!1,Ke=b.KEEP_CONTENT!==!1,He=b.IN_PLACE||!1,X=b.ALLOWED_URI_REGEXP||Aa,st=b.NAMESPACE||nt,Ze=b.MATHML_TEXT_INTEGRATION_POINTS||Ze,pt=b.HTML_INTEGRATION_POINTS||pt,me=b.CUSTOM_ELEMENT_HANDLING||{},b.CUSTOM_ELEMENT_HANDLING&&ge(b.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(me.tagNameCheck=b.CUSTOM_ELEMENT_HANDLING.tagNameCheck),b.CUSTOM_ELEMENT_HANDLING&&ge(b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(me.attributeNameCheck=b.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),b.CUSTOM_ELEMENT_HANDLING&&typeof b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(me.allowCustomizedBuiltInElements=b.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),D&&(ve=!1),F&&(G=!0),ct&&(se=Ce({},ya),pe=[],ct.html===!0&&(Ce(se,va),Ce(pe,ka)),ct.svg===!0&&(Ce(se,ys),Ce(pe,$s),Ce(pe,Rn)),ct.svgFilters===!0&&(Ce(se,ks),Ce(pe,$s),Ce(pe,Rn)),ct.mathMl===!0&&(Ce(se,ws),Ce(pe,wa),Ce(pe,Rn))),b.ADD_TAGS&&(typeof b.ADD_TAGS=="function"?M.tagCheck=b.ADD_TAGS:(se===Se&&(se=Kt(se)),Ce(se,b.ADD_TAGS,x))),b.ADD_ATTR&&(typeof b.ADD_ATTR=="function"?M.attributeCheck=b.ADD_ATTR:(pe===qe&&(pe=Kt(pe)),Ce(pe,b.ADD_ATTR,x))),b.ADD_URI_SAFE_ATTR&&Ce(rt,b.ADD_URI_SAFE_ATTR,x),b.FORBID_CONTENTS&&(at===Le&&(at=Kt(at)),Ce(at,b.FORBID_CONTENTS,x)),Ke&&(se["#text"]=!0),P&&Ce(se,["html","head","body"]),se.table&&(Ce(se,["tbody"]),delete Re.tbody),b.TRUSTED_TYPES_POLICY){if(typeof b.TRUSTED_TYPES_POLICY.createHTML!="function")throw Wr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof b.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Wr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=b.TRUSTED_TYPES_POLICY,E=O.createHTML("")}else O===void 0&&(O=Kc(A,s)),O!==null&&typeof E=="string"&&(E=O.createHTML(""));$t&&$t(b),L=b}},$e=Ce({},[...ys,...ks,...Fc]),Ee=Ce({},[...ws,...qc]),_e=function(b){let W=ne(b);(!W||!W.tagName)&&(W={namespaceURI:st,tagName:"template"});let _=In(b.tagName),y=In(W.tagName);return Je[b.namespaceURI]?b.namespaceURI===ut?W.namespaceURI===nt?_==="svg":W.namespaceURI===gt?_==="svg"&&(y==="annotation-xml"||Ze[y]):!!$e[_]:b.namespaceURI===gt?W.namespaceURI===nt?_==="math":W.namespaceURI===ut?_==="math"&&pt[y]:!!Ee[_]:b.namespaceURI===nt?W.namespaceURI===ut&&!pt[y]||W.namespaceURI===gt&&!Ze[y]?!1:!Ee[_]&&(ft[_]||!$e[_]):!!(C==="application/xhtml+xml"&&Je[b.namespaceURI]):!1},Ne=function(b){zr(t.removed,{element:b});try{ne(b).removeChild(b)}catch{N(b)}},Qe=function(b,W){try{zr(t.removed,{attribute:W.getAttributeNode(b),from:W})}catch{zr(t.removed,{attribute:null,from:W})}if(W.removeAttribute(b),b==="is")if(G||F)try{Ne(W)}catch{}else try{W.setAttribute(b,"")}catch{}},xe=function(b){let W=null,_=null;if(w)b="<remove></remove>"+b;else{let re=vs(b,/^[\r\n\t ]+/);_=re&&re[0]}C==="application/xhtml+xml"&&st===nt&&(b='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+b+"</body></html>");let y=O?O.createHTML(b):b;if(st===nt)try{W=new h().parseFromString(y,C)}catch{}if(!W||!W.documentElement){W=T.createDocument(st,"template",null);try{W.documentElement.innerHTML=yt?E:y}catch{}}let J=W.body||W.documentElement;return b&&_&&J.insertBefore(r.createTextNode(_),J.childNodes[0]||null),st===nt?de.call(W,P?"html":"body")[0]:P?W.documentElement:J},_t=function(b){return I.call(b.ownerDocument||b,b,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},Tt=function(b){return b instanceof f&&(typeof b.nodeName!="string"||typeof b.textContent!="string"||typeof b.removeChild!="function"||!(b.attributes instanceof p)||typeof b.removeAttribute!="function"||typeof b.setAttribute!="function"||typeof b.namespaceURI!="string"||typeof b.insertBefore!="function"||typeof b.hasChildNodes!="function")},kt=function(b){return typeof i=="function"&&b instanceof i};function ot(ce,b,W){Cn(ce,_=>{_.call(t,b,W,L)})}let be=function(b){let W=null;if(ot(he.beforeSanitizeElements,b,null),Tt(b))return Ne(b),!0;let _=x(b.nodeName);if(ot(he.uponSanitizeElement,b,{tagName:_,allowedTags:se}),H&&b.hasChildNodes()&&!kt(b.firstElementChild)&&wt(/<[/\w!]/g,b.innerHTML)&&wt(/<[/\w!]/g,b.textContent)||b.nodeType===Yr.progressingInstruction||H&&b.nodeType===Yr.comment&&wt(/<[/\w]/g,b.data))return Ne(b),!0;if(!(M.tagCheck instanceof Function&&M.tagCheck(_))&&(!se[_]||Re[_])){if(!Re[_]&&Rt(_)&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,_)||me.tagNameCheck instanceof Function&&me.tagNameCheck(_)))return!1;if(Ke&&!at[_]){let y=ne(b)||b.parentNode,J=j(b)||b.childNodes;if(J&&y){let re=J.length;for(let K=re-1;K>=0;--K){let g=v(J[K],!0);g.__removalCount=(b.__removalCount||0)+1,y.insertBefore(g,V(b))}}}return Ne(b),!0}return b instanceof l&&!_e(b)||(_==="noscript"||_==="noembed"||_==="noframes")&&wt(/<\/no(script|embed|frames)/i,b.innerHTML)?(Ne(b),!0):(D&&b.nodeType===Yr.text&&(W=b.textContent,Cn([ue,Ie,ke],y=>{W=Hr(W,y," ")}),b.textContent!==W&&(zr(t.removed,{element:b.cloneNode()}),b.textContent=W)),ot(he.afterSanitizeElements,b,null),!1)},Ue=function(b,W,_){if(le&&(W==="id"||W==="name")&&(_ in r||_ in ie))return!1;if(!(ve&&!q[W]&&wt(Ge,W))){if(!(ae&&wt(Ve,W))){if(!(M.attributeCheck instanceof Function&&M.attributeCheck(W,b))){if(!pe[W]||q[W]){if(!(Rt(b)&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,b)||me.tagNameCheck instanceof Function&&me.tagNameCheck(b))&&(me.attributeNameCheck instanceof RegExp&&wt(me.attributeNameCheck,W)||me.attributeNameCheck instanceof Function&&me.attributeNameCheck(W,b))||W==="is"&&me.allowCustomizedBuiltInElements&&(me.tagNameCheck instanceof RegExp&&wt(me.tagNameCheck,_)||me.tagNameCheck instanceof Function&&me.tagNameCheck(_))))return!1}else if(!rt[W]){if(!wt(X,Hr(_,Q,""))){if(!((W==="src"||W==="xlink:href"||W==="href")&&b!=="script"&&Oc(_,"data:")===0&&vt[b])){if(!(we&&!wt(Te,Hr(_,Q,"")))){if(_)return!1}}}}}}}return!0},Rt=function(b){return b!=="annotation-xml"&&vs(b,B)},Bt=function(b){ot(he.beforeSanitizeAttributes,b,null);let{attributes:W}=b;if(!W||Tt(b))return;let _={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:pe,forceKeepAttr:void 0},y=W.length;for(;y--;){let J=W[y],{name:re,namespaceURI:K,value:g}=J,R=x(re),S=g,Y=re==="value"?S:Pc(S);if(_.attrName=R,_.attrValue=Y,_.keepAttr=!0,_.forceKeepAttr=void 0,ot(he.uponSanitizeAttribute,b,_),Y=_.attrValue,Ae&&(R==="id"||R==="name")&&(Qe(re,b),Y=Me+Y),H&&wt(/((--!?|])>)|<\/(style|title|textarea)/i,Y)){Qe(re,b);continue}if(R==="attributename"&&vs(Y,"href")){Qe(re,b);continue}if(_.forceKeepAttr)continue;if(!_.keepAttr){Qe(re,b);continue}if(!ze&&wt(/\/>/i,Y)){Qe(re,b);continue}D&&Cn([ue,Ie,ke],et=>{Y=Hr(Y,et," ")});let Oe=x(b.nodeName);if(!Ue(Oe,R,Y)){Qe(re,b);continue}if(O&&typeof A=="object"&&typeof A.getAttributeType=="function"&&!K)switch(A.getAttributeType(Oe,R)){case"TrustedHTML":{Y=O.createHTML(Y);break}case"TrustedScriptURL":{Y=O.createScriptURL(Y);break}}if(Y!==S)try{K?b.setAttributeNS(K,re,Y):b.setAttribute(re,Y),Tt(b)?Ne(b):ba(t.removed)}catch{Qe(re,b)}}ot(he.afterSanitizeAttributes,b,null)},Ht=function ce(b){let W=null,_=_t(b);for(ot(he.beforeSanitizeShadowDOM,b,null);W=_.nextNode();)ot(he.uponSanitizeShadowNode,W,null),be(W),Bt(W),W.content instanceof o&&ce(W.content);ot(he.afterSanitizeShadowDOM,b,null)};return t.sanitize=function(ce){let b=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},W=null,_=null,y=null,J=null;if(yt=!ce,yt&&(ce="<!-->"),typeof ce!="string"&&!kt(ce))if(typeof ce.toString=="function"){if(ce=ce.toString(),typeof ce!="string")throw Wr("dirty is not a string, aborting")}else throw Wr("toString is not a function");if(!t.isSupported)return ce;if(te||oe(b),t.removed=[],typeof ce=="string"&&(He=!1),He){if(ce.nodeName){let g=x(ce.nodeName);if(!se[g]||Re[g])throw Wr("root node is forbidden and cannot be sanitized in-place")}}else if(ce instanceof i)W=xe("<!---->"),_=W.ownerDocument.importNode(ce,!0),_.nodeType===Yr.element&&_.nodeName==="BODY"||_.nodeName==="HTML"?W=_:W.appendChild(_);else{if(!G&&!D&&!P&&ce.indexOf("<")===-1)return O&&Z?O.createHTML(ce):ce;if(W=xe(ce),!W)return G?null:Z?E:""}W&&w&&Ne(W.firstChild);let re=_t(He?ce:W);for(;y=re.nextNode();)be(y),Bt(y),y.content instanceof o&&Ht(y.content);if(He)return ce;if(G){if(F)for(J=z.call(W.ownerDocument);W.firstChild;)J.appendChild(W.firstChild);else J=W;return(pe.shadowroot||pe.shadowrootmode)&&(J=ye.call(n,J,!0)),J}let K=P?W.outerHTML:W.innerHTML;return P&&se["!doctype"]&&W.ownerDocument&&W.ownerDocument.doctype&&W.ownerDocument.doctype.name&&wt(Ta,W.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+W.ownerDocument.doctype.name+`>
`+K),D&&Cn([ue,Ie,ke],g=>{K=Hr(K,g," ")}),O&&Z?O.createHTML(K):K},t.setConfig=function(){let ce=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};oe(ce),te=!0},t.clearConfig=function(){L=null,te=!1},t.isValidAttribute=function(ce,b,W){L||oe({});let _=x(ce),y=x(b);return Ue(_,y,W)},t.addHook=function(ce,b){typeof b=="function"&&zr(he[ce],b)},t.removeHook=function(ce,b){if(b!==void 0){let W=Lc(he[ce],b);return W===-1?void 0:Dc(he[ce],W,1)[0]}return ba(he[ce])},t.removeHooks=function(ce){he[ce]=[]},t.removeAllHooks=function(){he=xa()},t}var Ca=Ea();var Ra={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ia=e=>(...t)=>({_$litDirective$:e,values:t}),Ln=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Vr=class extends Ln{constructor(t){if(super(t),this.it=tt,t.type!==Ra.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===tt||t==null)return this._t=void 0,this.it=t;if(t===ur)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Vr.directiveName="unsafeHTML",Vr.resultType=1;var La=Ia(Vr);function Rs(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var gr=Rs();function qa(e){gr=e}var Qr={exec:()=>null};function Fe(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(St.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var Zc=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),St={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Xc=/^(?:[ \t]*(?:\n|$))+/,Qc=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Jc=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Jr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ed=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Is=/(?:[*+-]|\d{1,9}[.)])/,Ba=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ua=Fe(Ba).replace(/bull/g,Is).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),td=Fe(Ba).replace(/bull/g,Is).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ls=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,rd=/^[^\n]+/,Ds=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,nd=Fe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ds).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),sd=Fe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Is).getRegex(),Fn="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Os=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,od=Fe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Os).replace("tag",Fn).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ja=Fe(Ls).replace("hr",Jr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex(),ad=Fe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ja).getRegex(),Ps={blockquote:ad,code:Qc,def:nd,fences:Jc,heading:ed,hr:Jr,html:od,lheading:Ua,list:sd,newline:Xc,paragraph:ja,table:Qr,text:rd},Da=Fe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Jr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex(),id={...Ps,lheading:td,table:Da,paragraph:Fe(Ls).replace("hr",Jr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Da).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fn).getRegex()},ld={...Ps,html:Fe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Os).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Qr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Fe(Ls).replace("hr",Jr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ua).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},cd=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,dd=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,za=/^( {2,}|\\)\n(?!\s*$)/,ud=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qn=/[\p{P}\p{S}]/u,Ms=/[\s\p{P}\p{S}]/u,Ha=/[^\s\p{P}\p{S}]/u,pd=Fe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ms).getRegex(),Wa=/(?!~)[\p{P}\p{S}]/u,fd=/(?!~)[\s\p{P}\p{S}]/u,_d=/(?:[^\s\p{P}\p{S}]|~)/u,md=Fe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Zc?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ga=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,gd=Fe(Ga,"u").replace(/punct/g,qn).getRegex(),hd=Fe(Ga,"u").replace(/punct/g,Wa).getRegex(),Ya="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",bd=Fe(Ya,"gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,Ms).replace(/punct/g,qn).getRegex(),vd=Fe(Ya,"gu").replace(/notPunctSpace/g,_d).replace(/punctSpace/g,fd).replace(/punct/g,Wa).getRegex(),yd=Fe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Ha).replace(/punctSpace/g,Ms).replace(/punct/g,qn).getRegex(),kd=Fe(/\\(punct)/,"gu").replace(/punct/g,qn).getRegex(),wd=Fe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),$d=Fe(Os).replace("(?:-->|$)","-->").getRegex(),xd=Fe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",$d).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Pn=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Sd=Fe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Pn).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Va=Fe(/^!?\[(label)\]\[(ref)\]/).replace("label",Pn).replace("ref",Ds).getRegex(),Ka=Fe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ds).getRegex(),Ad=Fe("reflink|nolink(?!\\()","g").replace("reflink",Va).replace("nolink",Ka).getRegex(),Oa=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ns={_backpedal:Qr,anyPunctuation:kd,autolink:wd,blockSkip:md,br:za,code:dd,del:Qr,emStrongLDelim:gd,emStrongRDelimAst:bd,emStrongRDelimUnd:yd,escape:cd,link:Sd,nolink:Ka,punctuation:pd,reflink:Va,reflinkSearch:Ad,tag:xd,text:ud,url:Qr},Td={...Ns,link:Fe(/^!?\[(label)\]\((.*?)\)/).replace("label",Pn).getRegex(),reflink:Fe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Pn).getRegex()},Ts={...Ns,emStrongRDelimAst:vd,emStrongLDelim:hd,url:Fe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Oa).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Fe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Oa).getRegex()},Ed={...Ts,br:Fe(za).replace("{2,}","*").getRegex(),text:Fe(Ts.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Dn={normal:Ps,gfm:id,pedantic:ld},Kr={normal:Ns,gfm:Ts,breaks:Ed,pedantic:Td},Cd={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pa=e=>Cd[e];function Zt(e,t){if(t){if(St.escapeTest.test(e))return e.replace(St.escapeReplace,Pa)}else if(St.escapeTestNoEncode.test(e))return e.replace(St.escapeReplaceNoEncode,Pa);return e}function Ma(e){try{e=encodeURI(e).replace(St.percentDecode,"%")}catch{return null}return e}function Na(e,t){let r=e.replace(St.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),n=r.split(St.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(St.slashPipe,"|");return n}function Zr(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function Rd(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function Fa(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,l}function Id(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Mn=class{constructor(e){je(this,"options");je(this,"rules");je(this,"lexer");this.options=e||gr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:Zr(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=Id(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=Zr(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Zr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=Zr(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],l;for(l=0;l<r.length;l++)if(this.rules.other.blockquoteStart.test(r[l]))i.push(r[l]),a=!0;else if(!a)i.push(r[l]);else break;r=r.slice(l);let u=i.join(`
`),p=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${p}`:p;let f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,o,!0),this.lexer.state.top=f,r.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let A=h,$=A.raw+`
`+r.join(`
`),v=this.blockquote($);o[o.length-1]=v,n=n.substring(0,n.length-A.raw.length)+v.raw,s=s.substring(0,s.length-A.text.length)+v.text;break}else if(h?.type==="list"){let A=h,$=A.raw+`
`+r.join(`
`),v=this.list($);o[o.length-1]=v,n=n.substring(0,n.length-h.raw.length)+v.raw,s=s.substring(0,s.length-A.raw.length)+v.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let l=!1,u="",p="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let f=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,v=>" ".repeat(3*v.length)),h=e.split(`
`,1)[0],A=!f.trim(),$=0;if(this.options.pedantic?($=2,p=f.trimStart()):A?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,p=f.slice($),$+=t[1].length),A&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let v=this.rules.other.nextBulletRegex($),N=this.rules.other.hrRegex($),V=this.rules.other.fencesBeginRegex($),j=this.rules.other.headingBeginRegex($),ne=this.rules.other.htmlBeginRegex($);for(;e;){let O=e.split(`
`,1)[0],E;if(h=O,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),E=h):E=h.replace(this.rules.other.tabCharGlobal,"    "),V.test(h)||j.test(h)||ne.test(h)||v.test(h)||N.test(h))break;if(E.search(this.rules.other.nonSpaceChar)>=$||!h.trim())p+=`
`+E.slice($);else{if(A||f.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(f)||j.test(f)||N.test(f))break;p+=`
`+h}!A&&!h.trim()&&(A=!0),u+=O+`
`,e=e.substring(O.length+1),f=E.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let u=l.tokens.filter(f=>f.type==="space"),p=u.length>0&&u.some(f=>this.rules.other.anyLine.test(f.raw));s.loose=p}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=Na(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Na(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=Zr(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=Rd(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),Fa(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return Fa(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,l=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let p=[...n[0]][0].length,f=e.slice(0,s+n.index+p+a);if(Math.min(s,a)%2){let A=f.slice(1,-1);return{type:"em",raw:f,text:A,tokens:this.lexer.inlineTokens(A)}}let h=f.slice(2,-2);return{type:"strong",raw:f,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},Ft=class Es{constructor(t){je(this,"tokens");je(this,"options");je(this,"state");je(this,"inlineQueue");je(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gr,this.options.tokenizer=this.options.tokenizer||new Mn,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:St,block:Dn.normal,inline:Kr.normal};this.options.pedantic?(r.block=Dn.pedantic,r.inline=Kr.pedantic):this.options.gfm&&(r.block=Dn.gfm,this.options.breaks?r.inline=Kr.breaks:r.inline=Kr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Dn,inline:Kr}}static lex(t,r){return new Es(r).lex(t)}static lexInline(t,r){return new Es(r).inlineTokens(t)}lex(t){t=t.replace(St.carriageReturn,`
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
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,r))?(t=t.substring(l.raw.length),r.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=r.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(l=this.tokenizer.emStrong(t,n,i)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),r.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),r.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),r.push(l);continue}let u=t;if(this.options.extensions?.startInline){let p=1/0,f=t.slice(1),h;this.options.extensions.startInline.forEach(A=>{h=A.call({lexer:this},f),typeof h=="number"&&h>=0&&(p=Math.min(p,h))}),p<1/0&&p>=0&&(u=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):r.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Nn=class{constructor(e){je(this,"options");je(this,"parser");this.options=e||gr}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(St.notSpaceStart)?.[0],s=e.replace(St.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Zt(n)+'">'+(r?s:Zt(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Zt(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Zt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=Ma(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Zt(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=Ma(e);if(s===null)return Zt(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Zt(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Zt(e.text)}},Fs=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},qt=class Cs{constructor(t){je(this,"options");je(this,"renderer");je(this,"textRenderer");this.options=t||gr,this.options.renderer=this.options.renderer||new Nn,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Fs}static parse(t,r){return new Cs(r).parse(t)}static parseInline(t,r){return new Cs(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},On,Xr=(On=class{constructor(e){je(this,"options");je(this,"block");this.options=e||gr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Ft.lex:Ft.lexInline}provideParser(){return this.block?qt.parse:qt.parseInline}},je(On,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),je(On,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),On),Ld=class{constructor(...e){je(this,"defaults",Rs());je(this,"options",this.setOptions);je(this,"parse",this.parseMarkdown(!0));je(this,"parseInline",this.parseMarkdown(!1));je(this,"Parser",qt);je(this,"Renderer",Nn);je(this,"TextRenderer",Fs);je(this,"Lexer",Ft);je(this,"Tokenizer",Mn);je(this,"Hooks",Xr);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new Nn(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new Mn(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],l=s[a];s[a]=(...u)=>{let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new Xr;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],l=s[a];Xr.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&Xr.passThroughHooksRespectAsync.has(o))return(async()=>{let f=await i.call(s,u);return l.call(s,f)})();let p=i.call(s,u);return l.call(s,p)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let f=await i.apply(s,u);return f===!1&&(f=await l.apply(s,u)),f})();let p=i.apply(s,u);return p===!1&&(p=l.apply(s,u)),p}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Ft.lex(e,t??this.defaults)}parser(e,t){return qt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?qt.parse:qt.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Ft.lex:Ft.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?qt.parse:qt.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Zt(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},mr=new Ld;function Be(e,t){return mr.parse(e,t)}Be.options=Be.setOptions=function(e){return mr.setOptions(e),Be.defaults=mr.defaults,qa(Be.defaults),Be};Be.getDefaults=Rs;Be.defaults=gr;Be.use=function(...e){return mr.use(...e),Be.defaults=mr.defaults,qa(Be.defaults),Be};Be.walkTokens=function(e,t){return mr.walkTokens(e,t)};Be.parseInline=mr.parseInline;Be.Parser=qt;Be.parser=qt.parse;Be.Renderer=Nn;Be.TextRenderer=Fs;Be.Lexer=Ft;Be.lexer=Ft.lex;Be.Tokenizer=Mn;Be.Hooks=Xr;Be.parse=Be;var r_=Be.options,n_=Be.setOptions,s_=Be.use,o_=Be.walkTokens,a_=Be.parseInline;var i_=qt.parse,l_=Ft.lex;function sr(e){let t=Be.parse(e),r=Ca.sanitize(t);return La(r)}function Xt(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Rr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Bn(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Dd={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Od=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Pd=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function or(e){return!!e&&typeof e=="object"}function qs(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Za(e,t){let r=qs(e),n=qs(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Md(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>or(s)&&typeof s.text=="string"?s.text:"").join(""):or(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function Nd(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Dd[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=qs(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=Za(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let l=Za(or(i)?i.old_string:"",or(i)?i.new_string:"");s+=l.added,o+=l.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),n}function Xa(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Qa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=Od.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:Pd.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Fd(e,t){if(e.type==="assistant"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[],s=[];for(let o of n)if(or(o)){if(o.type==="text"&&typeof o.text=="string")s.push(Qa(o.text));else if(o.type==="thinking"){let a=Xa(o.thinking);a&&s.push(a)}else if(o.type==="tool_use"){let a=Nd(o);typeof o.id=="string"&&t.set(o.id,a),s.push(a)}}return s}if(e.type==="user"){let r=e.message,n=r&&Array.isArray(r.content)?r.content:[];for(let s of n)if(or(s)&&s.type==="tool_result"){let o=t.get(String(s.tool_use_id));if(o){let a=Md(s.content);o.result=a,o.output=typeof s.content=="string"?s.content:a}}return[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success";return[{kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""}]}return[]}function qd(e){if(e.type==="item.completed"&&or(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Qa(t.text)];if(t.type==="reasoning"){let r=Xa(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Bd(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Ja(e){let t=[],r=new Map,n=Array.isArray(e)?e:[];for(let s of n){let o=s;if(typeof s=="string"){let i=s.trim();if(i.length===0)continue;try{o=JSON.parse(i)}catch{continue}}if(!or(o))continue;let a=Bd(o)?qd(o):Fd(o,r);for(let i of a)t.push(i)}return t}var Ud=5,jd=10,zd=/Task\s+#(\d+)/,Hd=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Wd=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function Un(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Gd(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Yd(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function Vd(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=zd.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function Kd(e){if(e.tool==="Bash"){let t=e.command||"";return Hd.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Wd.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Zd(e){let t=e.filter(s=>s.kind==="tool").slice(-jd),r=new Map;t.forEach((s,o)=>{let a=Kd(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function Xd(e){let t=Yd(e);if(t)return{text:t,guess:!1};let r=Vd(e);if(r)return{text:r,guess:!1};let n=Zd(e);return n?{text:n,guess:!0}:null}function Qd(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:Et(e,t)}function jn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a={},i=!0,l=new Set,u=new Set,p=null,f=null,h=!1,A=!1,$=!1,v=null,N=null;function V(){h=!1,A=!1,$=!1,v=null,N=null}async function j(q){if(r){A=!0,$=!1,Q();try{let M=await Promise.resolve(r("get-attempt-prompt",{attempt_id:q}));if(o!==q)return;!M||typeof M!="object"||Array.isArray(M)?$=!0:(v=M,N=q)}catch{o===q&&($=!0)}finally{o===q&&(A=!1,Q())}}}function ne(){if(h=!h,h&&o&&N!==o){j(o);return}Q()}function O(){if(!h)return"";let q=Rr({loading:A,error:$});if(q)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${q}
      </div>`;if(!v)return"";if(v.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let M=Bn(v.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${M?c`<div class="prompt-block__meta">${M} 발송</div>`:""}
      ${typeof v.task_prompt=="string"?Xt("\uACFC\uC5C5 (user)",v.task_prompt):""}
      ${typeof v.system_prompt=="string"?Xt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",v.system_prompt):""}
    </div>`}function E(){if(!o||!n)return[];let q=n.get(o);return Ja(q?q.lines:[])}function T(){if(!o||!n)return null;let q=n.get(o),M=q?q.last_event_at:null;return typeof M=="number"?M:null}function I(){return a.status==="running"}function z(){if(I()&&o){f||(f=setInterval(()=>Q(),1e3));return}de()}function de(){f&&(clearInterval(f),f=null)}function ye(q){let M=[],ae=0;for(;ae<q.length;){let ve=q[ae];if(ve.kind==="tool"){let we=ae;for(;we<q.length&&q[we].kind==="tool"&&q[we].tool===ve.tool;)we+=1;if(we-ae>=Ud&&!u.has(ae)){M.push({kind:"group",idx:ae,tool:ve.tool||"",lines:q.slice(ae,we).map((ze,D)=>({idx:ae+D,line:ze}))}),ae=we;continue}}M.push({kind:"line",idx:ae,line:ve}),ae+=1}return M}function he(q){for(let M=q.length-1;M>=0;M-=1){let ae=q[M];if(ae.kind==="result"||ae.kind==="error")return null;if(ae.kind==="tool"&&!Object.hasOwn(ae,"result"))return ae}return null}function ue(q){for(let M=q.length-1;M>=0;M-=1)if(q[M].kind==="thinking")return q[M];return null}function Ie(q,M){if(M.kind==="gate")return c`<div class="sv__gate">${M.text}</div>`;if(M.kind==="phase")return c`<div class="sv__phase">${M.text}</div>`;if(M.kind==="result")return c`<div
        class="sv__result${M.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${M.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${sr(M.text||(M.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(M.kind==="thinking"){let ae=l.has(q);return c`<div
        class="sv__think${ae?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>X(q)}
      >
        <span class="sv__think-line">💭 ${Un(M.text)}</span>
        ${ae?c`<pre class="sv__think-expand">${M.text}</pre>`:""}
      </div>`}if(M.kind==="error")return c`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="blocker")return c`<div class="sv__error">⛔ ${M.text}</div>`;if(M.kind==="tool"){let ae=l.has(q),ve=M.tool==="Bash"?Gd(M.command):0,we=M.tool==="Bash"?ve>1?Un(M.command):M.command:M.path||M.command||"";return c`<div
        class="sv__tool${ae?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>X(q)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${M.icon}</span>
          <span class="sv__tool-name">${M.tool}</span>
          ${we?c`<span class="sv__tool-detail">${we}</span>`:""}
          ${ve>1?c`<span class="sv__tool-more">⋯ ${ve}줄</span>`:""}
          ${typeof M.added=="number"?c`<span class="sv__diff-add">+${M.added}</span>`:""}
          ${typeof M.removed=="number"?c`<span class="sv__diff-del">−${M.removed}</span>`:""}
          ${M.result?c`<span class="sv__tool-ok">→ ${M.result}</span>`:""}
        </span>
        ${ae?c`<pre class="sv__tool-expand">${ke(M)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${sr(M.text||"")}</div>`}function ke(q){let M=[];if(q.tool==="Bash"&&typeof q.command=="string"&&q.command.length>0)M.push(q.command);else if(q.input!==void 0)try{M.push(`input: ${JSON.stringify(q.input,null,2)}`)}catch{}return typeof q.output=="string"&&q.output.length>0&&M.push(`output:
${q.output}`),M.join(`

`)}function Ge(){if(!o)return c``;let q=E(),M=[a.runner,a.model,a.effort].filter(Boolean).join(" \xB7 "),ae=a.session_id||"",ve=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${i?"ON":"OFF"}`,we=I(),ze=we?Qd(T(),Date.now()):"",D=we?he(q):null,H=we?ue(q):null,P=Xd(q);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${o}</span>
        ${P?c`<span
              class="sv__stage${P.guess?" sv__stage--guess":""}"
              title=${P.text}
              >${P.text}</span
            >`:""}
        ${we?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ze?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${ze}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ze?c`<span class="sv__live-ago">${ze}</span>`:""}</span
            >`:""}
        ${ae?c`<button
              type="button"
              class="sv__session"
              title=${ae}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${ae}`}
              @click=${()=>Se(ae)}
            >
              ⧉ ${ae.slice(0,8)}
            </button>`:""}
        ${M?c`<span class="sv__meta">${M}</span>`:""}
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
          @click=${ne}
        >
          ✉ 프롬프트
        </button>
        <button
          type="button"
          class="sv__follow${i?" sv__follow--on":""}"
          aria-pressed=${i?"true":"false"}
          aria-label=${ve}
          @click=${se}
        >
          <span class="sv__follow-full">⇣ ${ve}</span>
          <span class="sv__follow-short">⇣ ${i?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>Re()}
        >
          ✕
        </button>
      </div>
      ${O()}
      <div class="sv__body">
        ${q.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:ye(q).map(te=>te.kind==="group"?Ve(te):Ie(te.idx,te.line))}
      </div>
      ${D||H?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${D?c`<span class="sv__now-icon">${D.icon}</span>
                  <span class="sv__now-name">${D.tool}</span>
                  <span class="sv__now-detail"
                    >${D.tool==="Bash"?Un(D.command):D.path||D.command||""}</span
                  >`:""}
            ${H?c`<span class="sv__now-think"
                  >💭 ${Un(H.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Ve(q){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Te(q.idx)}
    >
      <span class="sv__group-icon">${q.lines[0].line.icon}</span>
      <span class="sv__group-name">${q.tool}</span>
      <span class="sv__group-count">${q.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Te(q){u.add(q),Q()}function Q(){De(Ge(),e),z(),i&&B()}function B(){let q=e.querySelector(".sv__body");q&&(q.scrollTop=q.scrollHeight)}function X(q){l.has(q)?l.delete(q):l.add(q),Q()}function se(){i=!i,Q()}function Se(q){_r(q).then(M=>{M?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function pe(q){!o||!q||(a={...a,...q},Q())}function qe(q){let M=q.target;if(!M||!M.classList||!M.classList.contains("sv__body"))return;!(M.scrollHeight-M.scrollTop-M.clientHeight<=4)&&i&&(i=!1,Q())}e.addEventListener("scroll",qe,!0);function me(q){let M=q&&q.attempt_id;M&&(o=M,a=q.meta||{},i=!0,l.clear(),u.clear(),V(),!p&&n&&(p=n.subscribe(Q)),r&&Promise.resolve(r("subscribe-session-log",{id:`session-log:${o}`,attempt_id:o})).catch(()=>{}),Q())}function Re(){let q=o;o=null,l.clear(),u.clear(),V(),de(),r&&q&&Promise.resolve(r("unsubscribe-session-log",{id:`session-log:${q}`})).catch(()=>{}),De(c``,e),s&&s()}return{open:me,updateMeta:pe,close:Re,isOpen(){return o!==null},destroy(){de(),p&&(p(),p=null),e.removeEventListener("scroll",qe,!0),o=null,De(c``,e)}}}function en(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=ei(t.spec_id),s=ei(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function ei(e){return typeof e=="string"?e.trim():""}function Jd(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function eu(e){let t=e&&e.metadata||{},r=en(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:Jd(t)?null:"plan_pending"}),n}function ti(e,t){let r=eu(e);return c`
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
  `}var tu="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ru=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,nu=/^\*\*결론\*\* — (.+)$/;function ri(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==tu)return null;let r=ru.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?nu.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var ni=20;function si(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function su(e){return e.length>ni?`${e.slice(0,ni)}\u2026`:e}function ou(e,t,r,n){let s=`${t.lane} ${su(t.identifier)}`;return c`<div class="detail-report">
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
        <span class="detail-report__time">${si(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?c`<div class="detail-report__body">
          ${sr(t.body)}
        </div>`:""}
  </div>`}function au(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${si(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${sr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function oi(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=ri(typeof l.text=="string"?l.text:"");return u?ou(l,u,t,s.has(l.id)):au(l)})}
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
  `}var iu=["codex","opus","fable","self","skip"],lu=["codex","fable","skip"],cu=["low","medium","high","xhigh"],du=["standard","fast_track"],Ir=["orchestration_model","orchestration_effort","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"],Us={orchestration_model:{title:"\uC6CC\uCEE4 \uC2E4\uD589 \uBAA8\uB378"},orchestration_effort:{title:"\uC6CC\uCEE4 reasoning effort"},spec_review_model:{title:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4"},spec_review_effort:{title:"\uC2A4\uD399 \uB9AC\uBDF0 reasoning effort"},plan_review_model:{title:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4"},plan_review_effort:{title:"\uACC4\uD68D \uB9AC\uBDF0 reasoning effort"},impl_review_model:{title:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4"},impl_review_effort:{title:"\uAD6C\uD604 \uB9AC\uBDF0 reasoning effort"},impl_runtime:{title:"\uAD6C\uD604 runtime"},impl_model:{title:"\uAD6C\uD604 \uBAA8\uB378",help:"\uC6CC\uD06C\uD50C\uB85C\uAC00 \uBCF5\uC7A1 \uAD6C\uD604\uC778\uC9C0, \uBC94\uC704\uAC00 \uD55C\uC815\uB41C \uAD6C\uD604\uC778\uC9C0 \uD310\uB2E8\uD574 \uD604\uC7AC runtime\uC758 \uAD6C\uD604\uC6A9 \uBAA8\uB378\uC744 \uC120\uD0DD\uD569\uB2C8\uB2E4."},impl_effort:{title:"\uAD6C\uD604 reasoning effort",help:"\uC790\uB3D9 \uC120\uD0DD\uC774\uBA74 workflow tier\uC5D0 \uC120\uC5B8\uB41C effort\uB97C, \uBAA8\uB378\uB9CC \uC9C1\uC811 \uC9C0\uC815\uD588\uC73C\uBA74 \uD574\uB2F9 \uD558\uC704 \uC5D0\uC774\uC804\uD2B8 \uD638\uCD9C\uC758 \uAE30\uBCF8 effort\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4."},workflow_mode:{title:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC"}},ai={spec_review_effort:"spec_review_model",impl_review_effort:"impl_review_model",plan_review_effort:"plan_review_model"},uu=["self","skip"],pu="opus",js={orchestration_model:"(\uAE30\uBCF8: opus)",orchestration_effort:"(\uAE30\uBCF8: CLI \uAE30\uBCF8)",spec_review_model:"(\uAE30\uBCF8: codex)",spec_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_review_model:"(\uAE30\uBCF8: codex)",impl_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_runtime:"(\uAE30\uBCF8: orchestration runtime \uC0C1\uC18D)",plan_review_model:"(\uAE30\uBCF8: codex)",plan_review_effort:"(\uAE30\uBCF8: \uD504\uB9AC\uC14B)",impl_model:"(\uAE30\uBCF8: \uC791\uC5C5 \uC131\uACA9\uC5D0 \uB530\uB77C \uAD6C\uD604 \uBAA8\uB378 \uC790\uB3D9 \uC120\uD0DD)",impl_effort:"(\uAE30\uBCF8: \uC120\uD0DD\uB41C \uAD6C\uD604 \uC5D0\uC774\uC804\uD2B8\uC758 reasoning effort \uC0AC\uC6A9)"};function zs(e){let t=Us[e]||{title:e};return c`<span data-exec-setting-label>
    <span data-exec-setting-title>${t.title}</span>
    <code data-exec-setting-key>${e}</code>
    ${t.help?c`<small data-exec-setting-help=${e}>${t.help}</small>`:""}
  </span>`}function fu(e,t,r=""){let n=t&&t[e];return typeof n=="string"&&n.length>0?`(\uAE30\uBCF8: ${n} \u2014 ${r||"\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uD504\uB9AC\uC14B"})`:js[e]||"(\uAE30\uBCF8)"}function tn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function rn(e){if(!tn(e)||!tn(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>tn(r)&&tn(r.models));return t.length>0?t:null}function Bs(e){return{value:e,label:e}}function Hs(e){return{label:null,options:[{value:e,label:`${e} (\uBE44\uD638\uD658)`}]}}function ii(e,t,r=null){let n=rn(e);if(!n)return t?[{label:null,options:[Bs(t)]}]:[];let s=n.filter(([a])=>r===null||a===r).map(([a,i])=>({label:a,options:Object.keys(i.models).map(Bs)})),o=s.some(a=>a.options.some(i=>i.value===t));return t&&!o?[Hs(t),...s]:s}function hr(e,t){let r={label:null,options:e.map(Bs)};return t&&!e.includes(t)?[Hs(t),r]:[r]}function Qt(e,t){let r=rn(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function di(e,t){return tn(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function zn(e,t){let r=rn(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return di(n,n.models[t]);return[]}function ui(e){let t=rn(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of di(n,s))r.includes(o)||r.push(o);return r}function pi(e,t){if(!t)return ui(e);let n=rn(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of zn(e,o))s.includes(a)||s.push(a);return s}function Wn(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=Qt(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?zn(t,n.impl_model):pi(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Lr(e){let{selectedOf:t,effectiveOf:r,runner_catalog:n,controller_runtime:s}=e,o=r("orchestration_model")||pu,a=r("impl_model"),i=r("impl_runtime"),l=i==="claude"||i==="codex"?i:i==="inherit"?s===void 0?Qt(n,o):s:null;return Ir.map(u=>{let p=t(u),f,h=!1;return u==="orchestration_model"?f=ii(n,p):u==="impl_runtime"?f=hr(["inherit","claude","codex"],p):u==="impl_model"?(f=l?ii(n,p,l):p?[Hs(p)]:[],h=i==="inherit"&&l===null):u==="orchestration_effort"?f=hr(zn(n,o),p):u==="impl_effort"?(f=hr(a?zn(n,a):l?pi(n,l):ui(n),p),h=i==="inherit"&&l===null):u==="plan_review_model"?f=hr(lu,p):Object.hasOwn(ai,u)?(f=hr(cu,p),h=uu.includes(r(ai[u]))):f=hr(iu,p),{key:u,groups:f,selected:p,disabled:h,runner:u==="orchestration_model"?Qt(n,o):null}})}function Hn(e,t,r){return c`
    ${typeof r=="string"?c`<option value="" ?selected=${!t}>${r}</option>`:""}
    ${e.map(n=>n.label===null?n.options.map(s=>li(s,t)):c`<optgroup label=${n.label}>
            ${n.options.map(s=>li(s,t))}
          </optgroup>`)}
  `}function li(e,t){return c`<option value=${e.value} ?selected=${e.value===t}>
    ${e.label}
  </option>`}function ci(e,t,r,n,s,o,a){return c`
    <div class="detail-kv">
      <span class="detail-kv__k">${zs(e)}</span>
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
  `}function fi(e,t,r,n,s=""){let o=e&&e.metadata||{},a=r&&typeof r=="object"?r:{},i=f=>typeof o[f]=="string"?o[f]:"",u=Lr({selectedOf:i,effectiveOf:f=>{let h=i(f);return h||(typeof a[f]=="string"?a[f]:"")},runner_catalog:n}),p=o.workflow_mode==="fast_track"?"fast_track":"standard";return c`
    <div class="detail-section-label">실행 설정 (수정 가능)</div>
    ${u.map(f=>ci(f.key,Hn(f.groups,f.selected,fu(f.key,a,s)),f.selected,!1,f.disabled,f.runner,t))}
    ${ci("workflow_mode",Hn(hr(du,p),p),p,o.workflow_mode==="fast_track",!1,null,t)}
  `}function _u(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function _i(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i="";function l($){$.key==="Escape"&&s&&($.preventDefault(),h())}document.addEventListener("keydown",l);function u(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${_u(s)}</span
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
    `:c``}function p(){De(u(),e)}async function f($,v={}){s=$,o="loading",a="",i="",p();let N=r?r():"";if(!N){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",i="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let V="/api/doc?workspace="+encodeURIComponent(N)+"&path="+encodeURIComponent($);try{let j=await n(V),ne=await j.json().catch(()=>({}));if(!j.ok||!ne||ne.ok!==!0){if(ne?.error==="not_found"&&v.missing_state==="plan_pending"){o="pending",i="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",i="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(ne&&ne.error||j.status)+")",p();return}a=String(ne.content||""),o="ready",p()}catch{o="error",i="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,De(c``,e)}function A(){document.removeEventListener("keydown",l),h()}return{open:f,close:h,destroy:A}}var mu=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],hi="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function gu(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function hu(e){let t=mt(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=Er(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${hi}
          >부분 집계</span
        >`:""}`}function mi(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function gi(e){if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?bi(t):""}function bu(e){return e?["implementation","review-consult"].flatMap(r=>{let n=e.roles[r]?.codex;return n?n.legs.map(s=>{let a=mt({providers:{codex:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
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
        ${gi(s.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
              >${gi(s.completed_at)}</span
            >`:""}
        ${a?c`<span class="detail-session__usage" title=${a.tooltip}
              >${a.label}</span
            >`:""}
      </div>`}):[]}):""}function vu(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...mu,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${n.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${gu(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${hi}</span>`:""}
  </div>`}var yu={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function bi(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function ku(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function vi(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let f=typeof u.session_id=="string"&&u.session_id.length>0,h=o.has(u.attempt_id),A=f&&!h,$=f?h?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!A}
      title=${$}
      @click=${v=>{v.stopPropagation(),A&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let f=u.cause_detail,h=f&&typeof f.reason=="string"&&f.reason.length>0?typeof f.command=="string"&&f.command.length>0?`${f.reason} \xB7 ${f.command}`:f.reason:u.cause;return c`<div class="detail-session__cause" title=${h}>
      ${u.cause}
    </div>`},l=u=>{let p=mi(hs(u));if(mt(p).length===0&&!Er(u.usage))return"";let f=s.has(u.attempt_id);return c`<button
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
      세션 이력${hu(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let p=hs(u),f=mi(p),h=mt(f);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${yu[u.status||""]||"\xB7"}</span
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
            ${h.length>0?h.map(A=>c`<span
                      class="detail-session__usage"
                      title=${A.tooltip}
                      >${A.label}</span
                    >`):Er(u.usage)?c`<span class="detail-session__usage"
                    >${Er(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${bi(u.started_at)}</span>
          </button>
          ${l(u)} ${a(u)} ${i(u)} ${ku(u)}
          ${s.has(u.attempt_id)&&u.usage?vu(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${bu(p)}
        </div>`})}
    </div>
  `}function yi(e,t={}){return c`
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
          ${wu(e)}
        </div>`:""}
  `}function wu(e){let t=Rr(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Xt("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=Bn(r.recorded_at);return c`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Xt("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Xt("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var $u=["open","in_progress","deferred","resolved","closed"],xu=[0,1,2,3,4];function ki(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,p=null,f={},h="",A=!1,$=!1,v=!1,N="",V="",j="";function ne(){$=!1,v=!1,N="",V="",j=""}let O=[],E=null,T=null,I=!1,z="",de=!1,ye=0,he=new Set;function ue(){O=[],E=null,T=null,I=!1,z="",de=!1,ye+=1,he.clear()}async function Ie(g){if(!s)return;let R=++ye;try{let S=await Promise.resolve(s("get-comments",{id:g}));if(R!==ye||g!==u)return;O=Array.isArray(S)?S:[],I=!1}catch{if(R!==ye||g!==u)return;I=!0}K()}function ke(){if(!s||!u)return;let g=p&&typeof p.comment_count=="number"?p.comment_count:null;if(E!==u){E=u,T=g,Ie(u);return}g!==null&&g!==T&&(T=g,Ie(u))}function Ge(g){he.has(g)?he.delete(g):he.add(g),K()}function Ve(g){let R=z.trim().length===0;z=g,R!==(g.trim().length===0)&&K()}async function Te(){let g=z.trim();if(!s||!u||g.length===0||de)return;let R=u;de=!0,K();let S=!1;try{let Y=await Promise.resolve(s("add-comment",{id:R,text:g}));Array.isArray(Y)&&Y.length>0&&(S=!0,R===u&&(O=Y,I=!1,z="",T=Y.length))}catch{S=!1}S||ee("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),R===u&&(de=!1),K()}let Q={onToggle:Ge,onDraftInput:Ve,onSubmit:Te},B=document.createElement("div");B.className="md-viewer-root",document.body.appendChild(B);let X=_i(B,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),se=document.createElement("div");se.className="session-log-root",document.body.appendChild(se);let Se=jn(se,{transport:s?(g,R)=>Promise.resolve(s(g,R)):void 0,sessionLogStore:l}),pe=!1,qe=!1,me=!1,Re=null,q=null,M=0;function ae(g){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${g}`}function ve(){pe=!1,qe=!1,me=!1,Re=null,q=null,M+=1}async function we(g){if(!s)return;let R=++M;qe=!0,me=!1,K();try{let S=await Promise.resolve(s("get-bead-prompt",{bead_id:g}));if(R!==M)return;!S||typeof S!="object"||Array.isArray(S)?me=!0:(Re=S,q=ae(g))}catch{R===M&&(me=!0)}finally{R===M&&(qe=!1,K())}}function ze(){if(pe=!pe,pe&&u&&q!==ae(u)){Re=null,we(u);return}K()}function D(){if(!a||!u)return[];let g=a.get();return(g&&g.attempts?Object.values(g.attempts):[]).filter(S=>S&&S.bead_id===u).sort((S,Y)=>(Y.started_at||0)-(S.started_at||0)).map(S=>({attempt_id:S.attempt_id,bead_id:S.bead_id,status:S.status,started_at:typeof S.started_at=="number"?S.started_at:null,runner:S.runner||null,model:S.model||null,session_id:S.session_id||null,resumed_from:S.resumed_from||null,dismissed_at:typeof S.dismissed_at=="number"?S.dismissed_at:null,cause:typeof S.cause=="string"?S.cause:null,cause_detail:S.cause_detail||null,exec_default_preset_id:typeof S.exec_default_preset_id=="string"?S.exec_default_preset_id:null,exec_default_preset_revision:typeof S.exec_default_preset_revision=="number"?S.exec_default_preset_revision:null,exec_values:S.exec_values&&typeof S.exec_values=="object"?S.exec_values:null,usage:S.usage||null,usage_legs:Array.isArray(S.usage_legs)?S.usage_legs:[]}))}function H(){if(!a||!u)return null;let g=a.get();return Lt(g&&g.attempts||{},u)}let P=new Set;function te(g){P.has(g)?P.delete(g):P.add(g),K()}function w(g){let R=a?a.get():null,S=R&&R.attempts?R.attempts[g]:null;Se.open({attempt_id:g,meta:S?{runner:S.runner||void 0,model:S.model||void 0,effort:S.effort||void 0,status:S.status||void 0,session_id:S.session_id||void 0}:{}})}async function G(g){if(!s||!g)return;let R=()=>{let Y=a?a.get():null;return Y&&typeof Y.revision=="number"?Y.revision:0},S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:R()});if(S&&S.conflict){let Y=S.queue&&typeof S.queue.revision=="number"?S.queue.revision:R();S=await s("worker-attempt-resume",{attempt_id:g,expected_revision:Y})}S&&S.resumed===!1&&!S.conflict&&S.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${S.reason}`,"error",2400)}let F={onOpen:w,onResume:G,onToggleUsage:te};function Z(){let g=a?a.get():null,R=g&&g.default_exec_preset_id,S=typeof R=="string"?Ke()?.presets.find(Y=>Y.id===R):null;return S&&S.compatible!==!1&&S.settings?S.settings:{}}function le(){let g=a?a.get():null,R=g&&g.default_exec_preset_id,S=typeof R=="string"?Ke()?.presets.find(Y=>Y.id===R):null;return S&&S.compatible!==!1&&typeof S.name=="string"?S.name:""}function Ae(){let g=a?a.get():null;return g&&g.runner_catalog||null}function Me(){let g=p?.metadata&&typeof p.metadata=="object"?p.metadata:{},S=(Object.hasOwn(f,"orchestration_model")?f.orchestration_model:void 0)||(typeof g.orchestration_model=="string"?g.orchestration_model:"")||(typeof Z().orchestration_model=="string"?Z().orchestration_model:"")||"opus";return Qt(Ae(),S)}function Ke(){let g=i?i.get():null;return!g||typeof g.revision!="number"?null:{revision:g.revision,presets:Array.isArray(g.presets)?g.presets:[]}}function He(g){let R=g&&g.settings&&typeof g.settings=="object"?g.settings:{},S=Y=>typeof R[Y]=="string"?R[Y]:Y==="impl_runtime"&&typeof R.impl_model=="string"&&Qt(Ae(),R.impl_model)||"";return Lr({selectedOf:S,effectiveOf:S,runner_catalog:Ae()}).some(Y=>Y.groups.some(Oe=>Oe.options.some(et=>et.value===Y.selected&&et.label.endsWith("(\uBE44\uD638\uD658)"))))}function ct(g){i&&g&&typeof g.revision=="number"&&Array.isArray(g.presets)&&i.set({revision:g.revision,presets:g.presets})}async function at(){let g=Ke(),R=g?.presets.find(S=>S.id===h);if(!(!s||!u||!g||!R||He(R)||A)){A=!0,K();try{let S=await Promise.resolve(s("apply-exec-preset",{id:u,preset_id:R.id,expected_revision:g.revision}));if(S&&S.conflict){ct(S),ee("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Y=S&&Array.isArray(S.issue)?S.issue[0]:S?.issue;if(S&&S.applied&&Y&&typeof Y=="object"){p=Y;for(let Oe of Ir)delete f[Oe];ee("\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",2400);return}S&&S.error==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(S){S&&typeof S=="object"&&S.code==="bd_readback_failed"?ee("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):ee("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{A=!1,K()}}}function Le(){let g=Ke();if(g&&g.presets.length===0)return c`<section class="detail-exec-presets">
        <div class="detail-section-label">실행 프리셋</div>
        <p>전역 실행 설정에서 프리셋을 추가하세요.</p>
        <button
          type="button"
          data-open-exec-presets
          @click=${()=>t.onOpenExecPresets?.()}
        >
          전역 실행 설정 열기
        </button>
      </section>`;let R=g?g.presets:[],S=R.find(Oe=>Oe.id===h),Y=S?He(S):!1;return c`<section class="detail-exec-presets">
      <div class="detail-section-label">실행 프리셋</div>
      <div class="detail-exec-presets__controls">
        <select
          data-exec-preset-select
          aria-label="실행 프리셋"
          ?disabled=${g===null||A}
          @change=${Oe=>{h=Oe.target.value,K()}}
        >
          <option value="" ?selected=${h===""}>
            ${g===null?"\uBD88\uB7EC\uC624\uB294 \uC911\u2026":"\uD504\uB9AC\uC14B \uC120\uD0DD"}
          </option>
          ${R.map(Oe=>{let et=He(Oe);return c`<option
              value=${Oe.id}
              ?selected=${Oe.id===h}
            >
              ${Oe.name}${et?" (\uBE44\uD638\uD658)":""}
            </option>`})}
        </select>
        <button
          type="button"
          data-apply-exec-preset
          ?disabled=${g===null||!S||Y||A}
          @click=${()=>{at()}}
        >
          11개 설정 적용
        </button>
      </div>
      <p>적용하면 현재 이슈 실행 설정 전체를 교체합니다.</p>
    </section>`}let vt=null;r&&r.subscribe&&(vt=r.subscribe(()=>gt()));let dt=null;a&&typeof a.subscribe=="function"&&(dt=a.subscribe(()=>{u&&K()}));let rt=null;i&&typeof i.subscribe=="function"&&(rt=i.subscribe(()=>{u&&K()}));function We(g){g.key==="Escape"&&u&&(g.preventDefault(),n())}document.addEventListener("keydown",We);function gt(){if(u){if(r&&typeof r.snapshotFor=="function"){let g=r.snapshotFor("detail:"+u)||[];p=g.find(S=>S&&S.id===u)||g[0]||p}ke(),K()}}function ut(g){_r(g).then(R=>{R?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function nt(g){g.preventDefault(),g.stopPropagation(),u&&ut(u)}function st(g,R){g.preventDefault(),g.stopPropagation(),ut(R)}function yt(g,R,S){g.preventDefault(),g.stopPropagation(),X.open(R,{missing_state:S})}function Je(g,R){f[g]=R,K(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",{id:u,key:g,value:R})).catch(()=>{ee("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function ht(g,R){let S=p||{},Y=S.metadata&&typeof S.metadata=="object"?S.metadata:{},Oe={};for(let Pe of["impl_runtime","impl_model","impl_effort"])Oe[Pe]=Object.hasOwn(f,Pe)?f[Pe]:typeof Y[Pe]=="string"?Y[Pe]:"";Oe[g]=R;let et=Wn(Oe,Ae(),Me()),it={};for(let Pe of["impl_runtime","impl_model","impl_effort"])it[Pe]=f[Pe],f[Pe]=et[Pe]||"";K(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...et,orchestration_runtime:Me()})).then(Pe=>{let Wt=Array.isArray(Pe)?Pe[0]:Pe;if(!Wt||typeof Wt!="object"||!Wt.id)throw new Error("implementation target readback failed");p=Wt;for(let dn of["impl_runtime","impl_model","impl_effort"])delete f[dn];K()}).catch(()=>{for(let Pe of["impl_runtime","impl_model","impl_effort"])it[Pe]===void 0?delete f[Pe]:f[Pe]=it[Pe];K(),ee("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Ze(g,R,S){if(!s||!u)return!1;try{let Y=await Promise.resolve(s(g,R)),Oe=Array.isArray(Y)?Y[0]:Y;return Oe&&typeof Oe=="object"&&Oe.id?(p=Oe,!0):(ee(S,"error"),!1)}catch{return ee(S,"error"),!1}}function pt(g){setTimeout(()=>{try{let R=e.querySelector(g);R&&typeof R.focus=="function"&&R.focus()}catch{}},0)}function ft(){$=!0,N=p&&p.title||"",K(),pt('.detail-edit__input[data-edit="title"]')}function C(g){N=g.target.value}function d(){$=!1,N="",K()}function m(){Ze("edit-text",{id:u,field:"title",value:N},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&($=!1,N=""),K()})}function x(){v=!0,V=p&&p.description||"",K(),pt('.detail-edit__textarea[data-edit="description"]')}function L(g){V=g.target.value}function ie(){v=!1,V="",K()}function ge(){Ze("edit-text",{id:u,field:"description",value:V},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(R=>{R&&(v=!1,V=""),K()})}function oe(g,R,S,Y){if(g.key==="Escape"){g.stopPropagation(),S();return}g.key==="Enter"&&(!Y||g.ctrlKey||g.metaKey)&&(g.preventDefault(),R())}function $e(g){let R=g.target.value;Ze("update-status",{id:u,status:R},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function Ee(g){let R=Number(g.target.value);Ze("update-priority",{id:u,priority:R},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>K())}function _e(g){j=g.target.value}function Ne(){let g=j.trim();g.length!==0&&Ze("label-add",{id:u,label:g},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(R=>{R&&(j=""),K()})}function Qe(g){if(g.key==="Escape"){g.stopPropagation(),j="",K();return}g.key==="Enter"&&(g.preventDefault(),Ne())}function xe(g){Ze("label-remove",{id:u,label:g},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>K())}let _t={onCopyPath:st,onOpenDoc:yt},Tt={onChange:Je,onImplTargetChange:ht};function kt(g){return typeof g=="string"?g:g&&typeof g=="object"?String(g.id||g.to||g.issue_id||g.depends_on||""):""}function ot(g){switch(g&&typeof g=="object"?String(g.dependency_type||g.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function be(g){let S=(Array.isArray(g.dependencies)?g.dependencies:[]).map(Y=>({id:kt(Y),icon:ot(Y)})).filter(Y=>Y.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${S.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${S.map(Y=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Y.id)}
                  >
                    ${Y.icon?`${Y.icon} `:""}${Y.id}
                  </button>`:c`<span class="detail-dep"
                    >${Y.icon?`${Y.icon} `:""}${Y.id}</span
                  >`)}
          </div>`}
    `}function Ue(g){let R=g.metadata||{},S=g.workflow||{},Y=S.stages||{},Oe=Y.spec&&Y.spec.stale,et=Y.impl&&Y.impl.stale,it=Y.plan||null,Pe=S.route_source==="derived",Wt=S.route||R.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Pe?" detail-kv__v--derived":""}"
          title=${Pe?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Pe?"unset":Wt}</span
        >
      </div>
      ${S.route!=="quick_fix"||Object.hasOwn(R,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${R.spec_review||"\uC5C6\uC74C"}${Oe?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${S.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${it?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${it?.approval_receipt||"\uC5C6\uC74C"}${it?.approval_state==="stale"?" \xB7 stale":it?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${S.route!=="quick_fix"||Object.hasOwn(R,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${R.impl_review||"\uC5C6\uC74C"}${et?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${R.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${R.pr_url}</span>
          </div>`:""}
    `}let Rt={route:["quick_fix","spec_backed","full_plan"]};async function Bt(g,R){let S=R.target.value;if(g==="route"&&p&&p.metadata&&p.metadata.route==="full_plan"&&S!=="full_plan"&&!window.confirm(`full_plan \u2192 ${S||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){K();return}await Ze("update-workflow-meta",{id:u,key:g,value:S},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),K()}function Ht(g){let R=g.metadata||{};return c` ${((Y,Oe)=>{let et=Rt[Y],it=typeof R[Y]=="string"?R[Y]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Y}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Y}
          data-edit=${`wfmeta-${Y}`}
          @change=${Pe=>Bt(Y,Pe)}
        >
          <option value="" ?selected=${!et.includes(it)}>
            ${Oe}
          </option>
          ${et.map(Pe=>c`<option value=${Pe} ?selected=${it===Pe}>${Pe}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function ce(g,R){return $?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${N}
            @input=${C}
            @keydown=${S=>oe(S,m,d,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${m}
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
        ${mt(R).map(S=>c`<span class="detail-usage-total" title=${S.tooltip}
              >${S.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${ft}
        >
          ✎
        </button>
      </div>
    `}function b(g){let R=bt(g.created_at),S=bt(g.updated_at);return!R&&!S?c``:c`
      ${R?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${R}</span>
          </div>`:""}
      ${S?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${S}</span>
          </div>`:""}
    `}function W(g,R){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${$e}
        >
          ${$u.map(S=>c`<option value=${S} ?selected=${S===g}>${S}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${Ee}
        >
          ${xu.map(S=>c`<option value=${String(S)} ?selected=${S===R}>
                P${S}
              </option>`)}
        </select>
      </div>
    `}function _(g){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${v?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${x}
            >
              ✎
            </button>`}
      </div>
      ${v?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${V}
              @input=${L}
              @keydown=${R=>oe(R,ge,ie,!0)}
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
                @click=${ie}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${g||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function y(g){let R=typeof g.notes=="string"?g.notes:"";return R.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${R}</div>
    `}function J(g){let R=Array.isArray(g.labels)?g.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${R.map(S=>c`<span class="detail-label-chip"
              >${S}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${S}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+S}
                @click=${()=>xe(S)}
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
            @input=${_e}
            @keydown=${Qe}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${Ne}
          >
            추가
          </button>
        </span>
      </div>
    `}function re(){if(!u)return c``;let g=p||{},R=String(g.id||u),S=g.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Y=H(),Oe=g.status||"open",et=typeof g.priority=="number"?Math.max(0,Math.min(4,g.priority)):"",it=g.description||"",Pe={...g,metadata:{...g.metadata||{},...f}};return c`
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
            @click=${nt}
          >
            ${R}
          </button>
          ${ce(S,Y)}
          ${W(Oe,et)} ${b(g)}
          ${_(it)}
          ${oi(O,Q,{expanded:he,draft:z,sending:de,error:I})}
          ${y(g)} ${J(g)} ${be(g)}
          ${Ue(g)} ${Ht(g)}
          ${ti(g,_t)}
          ${Le()}
          ${fi(Pe,Tt,Z(),Ae(),le())}
          ${yi({expanded:pe,loading:qe,error:me,data:Re},{onToggle:ze})}
          ${vi(D(),F,{total:Y,expanded:P})}
        </div>
      </div>
    `}function K(){De(re(),e)}return{load(g){g!==u&&(f={},h="",ne(),ue(),ve()),u=g,p=null,gt()},clear(){u=null,p=null,f={},h="",A=!1,ne(),ue(),ve(),X.close(),Se.close(),De(c``,e)},destroy(){vt&&(vt(),vt=null),dt&&(dt(),dt=null),rt&&(rt(),rt=null),document.removeEventListener("keydown",We),X.destroy(),B.parentNode&&B.parentNode.removeChild(B),Se.destroy(),se.parentNode&&se.parentNode.removeChild(se),u=null,p=null,h="",A=!1,ue(),ve(),De(c``,e)}}}var Su=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function wi(e,t){return _s(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Au(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}function $i(e,t){let{policyStore:r,transport:n,labelOptions:s}=t,o=document.createElement("dialog");o.id="display-settings-dialog",o.className="display-settings",o.setAttribute("role","dialog"),o.setAttribute("aria-modal","true"),e.appendChild(o);let a="";async function i(T){let I=r.get();if(I)try{let z=await n("display-policy-set",{expected_revision:I.revision,policy:T(I)});l(z),z&&z.conflict&&z.policy&&(z=await n("display-policy-set",{expected_revision:z.policy.revision,policy:T(z.policy)}),l(z)),z&&z.conflict&&ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC","error",4e3)}catch{ee("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function l(T){T&&T.policy&&typeof T.policy=="object"&&r.set(T.policy)}function u(T){let I=r.get();if(!I)return;let z=wi(T,I)!=="shown";i(de=>Au(T,de,z))}function p(){let T=a.trim();T.length!==0&&(a="",i(I=>I.hidden_prefixes.includes(T)?{hidden_prefixes:I.hidden_prefixes}:{hidden_prefixes:[...I.hidden_prefixes,T]}),N())}function f(T){i(I=>({hidden_prefixes:I.hidden_prefixes.filter(z=>z!==T)}))}function h(T){let I=r.get();if(!I)return;let z=I.chips[T]===!1;i(()=>({chips:{[T]:z}}))}function A(T){let I=s();return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">라벨 표시</h3>
        <p class="display-settings__hint">
          라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을
          누르면 그 라벨만 예외로 다시 표시됩니다.
        </p>
        ${I.length===0?c`<div class="display-settings__empty">라벨 없음</div>`:c`<div class="display-settings__pills">
              ${I.map(z=>{let de=wi(z,T);return c`<button
                  type="button"
                  class=${`display-settings__pill display-settings__pill--${de}`}
                  data-label=${z}
                  data-state=${de}
                  @click=${()=>u(z)}
                >
                  ${z}
                </button>`})}
            </div>`}
      </section>
    `}function $(T){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">숨김 prefix</h3>
        <div class="display-settings__prefixes">
          ${T.hidden_prefixes.map(I=>c`<span class="display-settings__prefix">
                ${I}
                <button
                  type="button"
                  class="display-settings__prefix-remove"
                  aria-label=${`${I} \uADDC\uCE59 \uC81C\uAC70`}
                  @click=${()=>f(I)}
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
          <button type="button" @click=${p}>추가</button>
        </div>
      </section>
    `}function v(T){return c`
      <section class="display-settings__section">
        <h3 class="display-settings__heading">카드 표시 요소</h3>
        <div class="display-settings__toggles">
          ${Su.map(([I,z])=>c`<label class="display-settings__toggle">
                <input
                  type="checkbox"
                  data-chip=${I}
                  .checked=${T.chips[I]!==!1}
                  @change=${()=>h(I)}
                />
                <span>${z}</span>
              </label>`)}
        </div>
      </section>
    `}function N(){let T=r.get();De(c`
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
            ${T?c`${A(T)} ${$(T)}
                ${v(T)}`:c`<div class="display-settings__empty">
                  표시 정책을 불러오는 중…
                </div>`}
          </div>
        </div>
      `,o)}let V=!1,j=()=>{V=!1};o.addEventListener("close",j),o.addEventListener("cancel",j);let ne=null;r.subscribe&&(ne=r.subscribe(()=>{V&&N()}));function O(){V||(a="",V=!0,N(),typeof o.showModal=="function"?o.showModal():o.setAttribute("open",""))}function E(){V&&(V=!1,typeof o.close=="function"?o.close():o.removeAttribute("open"))}return{open:O,close:E,destroy(){V=!1,o.removeEventListener("close",j),o.removeEventListener("cancel",j),ne&&(ne(),ne=null),o.remove()}}}function xi(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,p,f="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=p||"An unrecoverable error occurred.");let h=typeof f=="string"?f.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function Si(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";if(e<6e4)return`${Math.round(e/1e3)}\uCD08`;let t=e/6e4;return`${Number.isInteger(t)?t:Math.round(t*10)/10}\uBD84`}function Ai(e){return Array.isArray(e)?e.filter(t=>typeof t=="string").join(" "):""}var Tu={deployed:{modifier:"ok",label:"\uC131\uACF5"},launched:{modifier:"launched",label:"\uBC1C\uC0AC\uB428 \xB7 \uACB0\uACFC \uBBF8\uAD00\uCE21"},failed:{modifier:"fail",label:"\uC2E4\uD328"}},Ti=160;function Eu(e){return e.length>Ti?`${e.slice(0,Ti)}\u2026`:e}function Gn(e,t){let{queueStore:r,presetStore:n,transport:s,getWorkspacePath:o}=t,a=document.createElement("dialog");a.id="worker-exec-defaults-dialog",a.className="exec-defaults",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),e.appendChild(a);let i=null,l=!1;function u(){return r&&r.get()||{revision:0,exec_defaults:{}}}function p(){let w=u();return typeof w.revision=="number"?w.revision:0}function f(){let w=n?n.get():null;return!w||typeof w.revision!="number"?null:{revision:w.revision,presets:Array.isArray(w.presets)?w.presets:[]}}function h(w){n&&w&&typeof w.revision=="number"&&Array.isArray(w.presets)&&n.set({revision:w.revision,presets:w.presets})}function A(w){w&&w.queue&&r&&r.set(w.queue)}function $(){return u().runner_catalog??null}let v=null;function N(){if(v!==null)return v;let w=u().default_exec_preset_id;return typeof w=="string"&&w.length>0?w:null}async function V(w){if(!s)return;let G=f();if(!G)return;v=w||"";let F=E(w);if(ae(),!F.viable){ee(F.missing?"\uC120\uD0DD\uD55C \uD504\uB9AC\uC14B\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC5B4 \uC800\uC7A5\uD558\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.":"\uBE44\uD638\uD658 \uD504\uB9AC\uC14B\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8\uAC12\uC73C\uB85C \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.","error",4e3);return}try{let Z=await s("worker-queue-set-default-exec-preset",{preset_id:w||null,expected_queue_revision:p(),expected_preset_revision:G.revision});if(A(Z),Z&&Z.presets&&n&&n.set(Z.presets),Z&&Z.conflict){ee("\uAE30\uBCF8 \uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uC120\uD0DD\uC744 \uAC80\uD1A0\uD55C \uB4A4 \uB2E4\uC2DC \uC800\uC7A5\uD558\uC138\uC694.","error",4e3);return}if(Z&&Z.applied){v=null,ae();return}ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4 \uAE30\uBCF8 \uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function j(w){i={id:w.id,name:w.name,settings:{...w.settings||{}}},I(),l=!1,ae()}function ne(){i={id:null,name:"",settings:{}},l=!1,ae()}function O(w){let G=w&&w.settings&&typeof w.settings=="object"?w.settings:{},F=Z=>typeof G[Z]=="string"?G[Z]:Z==="impl_runtime"&&typeof G.impl_model=="string"&&Qt($(),G.impl_model)||"";return Lr({selectedOf:F,effectiveOf:F,runner_catalog:$()}).some(Z=>Z.groups.some(le=>le.options.some(Ae=>Ae.value===Z.selected&&Ae.label.endsWith("(\uBE44\uD638\uD658)"))))}function E(w){if(!w)return{viable:!0,missing:!1,incompatible:!1,preset:null};let F=f()?.presets.find(le=>le.id===w);if(!F||F.migration_pending===!0)return{viable:!1,missing:!0,incompatible:!1,preset:null};let Z=F.compatible===!1||O(F);return{viable:!Z,missing:!1,incompatible:Z,preset:F}}function T(){let w=i?.settings.orchestration_model;return typeof w!="string"?null:Qt($(),w)}function I(){if(!i)return;let w=Wn({impl_runtime:i.settings.impl_runtime||"",impl_model:i.settings.impl_model||"",impl_effort:i.settings.impl_effort||""},$(),T());for(let G of["impl_runtime","impl_model","impl_effort"])w[G]?i.settings[G]=w[G]:delete i.settings[G]}function z(w){let G=w&&w.settings&&typeof w.settings=="object"?w.settings:{},F=Ir.filter(le=>typeof G[le]=="string").length,Z=Ir.filter(le=>typeof G[le]=="string").map(le=>`${Us[le]?.title||le}: ${G[le]}`);return{count:`${F}/11 \uC9C0\uC815`,choices:Z.length>0?Z.join(" \xB7 "):"\uBAA8\uB4E0 \uD56D\uBAA9 \uAE30\uBCF8\uAC12"}}async function de(w){if(!s||!window.confirm(`\u201C${w.name}\u201D \uD504\uB9AC\uC14B\uC744 \uC0AD\uC81C\uD560\uAE4C\uC694? \uC774\uBBF8 \uC801\uC6A9\uB41C \uC774\uC288\uB294 \uBCC0\uACBD\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`))return;let G=f();if(G)try{let F=await s("exec-preset-delete",{expected_revision:G.revision,id:w.id});h(F),F&&F.conflict&&ee("\uD504\uB9AC\uC14B\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uD655\uC778\uD558\uC138\uC694.","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328","error",4e3)}}async function ye(w=!1){if(!s||!i)return;let G=f();if(!G)return;let F=w||i.id===null,Z={expected_revision:G.revision,...F?{}:{id:i.id},name:i.name,settings:{...i.settings}};try{let le=await s(F?"exec-preset-create":"exec-preset-update",Z);if(h(le),le&&le.conflict){l=!0,ae();return}if(le&&le.applied){i=null,l=!1,ae();return}ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}catch{ee("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328","error",4e3)}}function he(w){return c`<div class="exec-defaults__row exec-preset-editor__row">
      <span class="exec-defaults__k">${zs(w.key)}</span>
      <select
        class="exec-defaults__sel"
        data-preset-key=${w.key}
        ?disabled=${w.disabled}
        @change=${G=>{if(!i)return;let F=G.target.value;F?i.settings[w.key]=F:delete i.settings[w.key],(w.key==="impl_runtime"||w.key==="impl_model"||w.key==="impl_effort"||w.key==="orchestration_model")&&I(),l=!1,ae()}}
      >
        ${Hn(w.groups,w.selected,js[w.key]||"(\uAE30\uBCF8)")}
      </select>
    </div>`}function ue(){if(!i)return"";let w=le=>typeof i?.settings[le]=="string"?i.settings[le]:"",G=Lr({selectedOf:w,effectiveOf:w,runner_catalog:$(),controller_runtime:T()}),F=f(),Z=i.id!==null&&F!==null&&!F.presets.some(le=>le.id===i?.id);return c`<div class="exec-preset-editor" data-preset-editor>
      <label class="exec-preset-editor__name">
        프리셋 이름
        <input
          type="text"
          value=${i.name}
          data-preset-name
          @input=${le=>{i&&(i.name=le.target.value,l=!1)}}
        />
      </label>
      ${l?c`<p class="exec-preset-editor__conflict" data-preset-conflict>
            다른 곳에서 변경됨 — 최신 목록을 확인한 뒤 다시 저장하세요.
          </p>`:""}
      ${Z?c`<p class="exec-preset-editor__conflict">
            편집하던 프리셋이 다른 곳에서 삭제됐습니다.
          </p>`:""}
      ${G.map(he)}
      <div class="exec-preset-editor__actions">
        ${Z?c`<button
              type="button"
              data-preset-save-as-new
              @click=${()=>{ye(!0)}}
            >
              새 프리셋으로 저장
            </button>`:c`<button
              type="button"
              data-preset-save
              @click=${()=>{ye(!1)}}
            >
              저장
            </button>`}
        <button
          type="button"
          data-preset-cancel
          @click=${()=>{i=null,l=!1,ae()}}
        >
          취소
        </button>
      </div>
    </div>`}function Ie(){let w=f(),G=w?w.presets.filter(F=>F?.migration_pending!==!0):[];return c`<section class="exec-presets" data-exec-presets>
      <div class="exec-presets__heading">
        <h3>공용 실행 프리셋</h3>
        <button type="button" data-preset-new @click=${ne}>
          + 새 프리셋
        </button>
      </div>
      <p class="exec-defaults__hint">
        모든 워크스페이스에서 공유하며, 이슈에 적용하면 값이 복사됩니다.
      </p>
      ${w===null?c`<p class="exec-presets__empty">프리셋을 불러오는 중…</p>`:G.length===0?c`<p class="exec-presets__empty">
              아직 공용 프리셋이 없습니다.
            </p>`:G.map(F=>{let Z=z(F),le=typeof F.reference_count=="number",Ae=le?F.reference_count:null,Me=Array.isArray(F.reference_summary)?F.reference_summary.map(Ke=>Ke?.display_name||Ke?.workspace_key).filter(Boolean).join(", "):"";return c`<article
                class="exec-preset-card"
                data-preset-id=${F.id}
              >
                <div class="exec-preset-card__main">
                  <strong>${F.name}</strong>
                  <span>${Z.count}</span>
                  <span data-preset-references=${F.id}
                    >${le?`\uCC38\uC870 ${Ae}\uAC1C`:"\uCC38\uC870 \uD655\uC778 \uBD88\uAC00"}</span
                  >
                  ${O(F)?c`<span data-preset-incompatible>비호환</span>`:""}
                  <small>${Z.choices}</small>
                  ${Me?c`<small data-preset-impact=${F.id}
                        >업데이트 영향: ${Me}</small
                      >`:""}
                </div>
                <div class="exec-preset-card__actions">
                  <button
                    type="button"
                    data-preset-edit=${F.id}
                    @click=${()=>j(F)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    data-preset-delete=${F.id}
                    ?disabled=${Ae===null||Ae>0||F.reference_scan_complete===!1}
                    title=${Ae===null?"\uCC38\uC870 \uC218\uB97C \uD655\uC778\uD560 \uC218 \uC5C6\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Ae>0?"\uCC38\uC870 \uC911\uC778 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC788\uC5B4 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":F.reference_scan_complete===!1?"\uCC38\uC870 \uC2A4\uCE94\uC774 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC544 \uC0AD\uC81C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":""}
                    @click=${()=>{de(F)}}
                  >
                    삭제
                  </button>
                </div>
              </article>`})}
      ${ue()}
    </section>`}function ke(){let w=f(),G=w?w.presets.filter(Me=>Me?.migration_pending!==!0):[],F=N()||"",Z=E(F),le=Z.preset,Ae=le?z(le):null;return c`<section class="exec-defaults__workspace" data-workspace-preset>
      <h3>현재 워크스페이스 기본 프리셋</h3>
      <p class="exec-defaults__hint">
        이 워크스페이스는 프리셋 하나를 참조합니다. 없음은 harness 기본값을
        사용합니다.
      </p>
      <select
        class="exec-defaults__sel"
        data-workspace-preset-select
        aria-label="워크스페이스 기본 프리셋"
        .value=${F}
        ?disabled=${w===null}
        @change=${Me=>{V(Me.target.value)}}
      >
        <option value="" ?selected=${F===""}>
          없음 — harness 기본값
        </option>
        ${F&&Z.missing?c`<option value=${F} ?selected=${!0}>
              ${F} (선택한 프리셋 없음)
            </option>`:""}
        ${G.map(Me=>c`<option
              value=${Me.id}
              ?selected=${Me.id===F}
              ?disabled=${Me.compatible===!1}
            >
              ${Me.name}${Me.compatible===!1?" (\uBE44\uD638\uD658)":""}
            </option>`)}
      </select>
      ${le?c`<p data-workspace-preset-summary>
            ${Ae?.count} · ${Ae?.choices}
            ${Z.incompatible?" \xB7 \uBE44\uD638\uD658":""}
          </p>`:""}
      ${Z.missing?c`<p data-workspace-preset-missing>
            선택한 프리셋을 찾을 수 없습니다. 실행이 차단됩니다.
          </p>`:Z.incompatible?c`<p data-workspace-preset-incompatible>
              선택한 프리셋이 비호환입니다. 실행이 차단됩니다.
            </p>`:""}
    </section>`}function Ge(){let w=u().workspace_info;return w&&typeof w=="object"?w:{}}function Ve(w,G){return c`<span
      class="exec-defaults__vd-badge exec-defaults__vd-badge--${w}"
      >${G}</span
    >`}function Te(w){let G=w?Ai(w.cmd):"",F=w?Si(w.timeout_ms):"",Z=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="verify">
      <div class="exec-defaults__vd-label">머지 전 검증 (verify)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${Ve("config","config")}
            ${F?c`<span class="exec-defaults__vd-meta"
                  >timeout ${F}</span
                >`:""}
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            검증 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.verify."${Z}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function Q(w){let G=w?Ai(w.cmd):"",F=w?Si(w.timeout_ms):"",Z=F?`timeout ${F} \xB7 verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589`:"verify \uD1B5\uACFC \uC2DC\uC5D0\uB9CC \uC2E4\uD589",le=o&&o()||"<workspace \uACBD\uB85C>";return c`<div class="exec-defaults__vd-group" data-vd="deploy">
      <div class="exec-defaults__vd-label">머지 후 배포 (deploy)</div>
      ${G?c`<div class="exec-defaults__vd-line">
            <span class="exec-defaults__vd-cmd">${G}</span>
            ${Ve("config","config")}
            ${w.detached===!0?Ve("detached","detached"):""}
            <span class="exec-defaults__vd-meta">${Z}</span>
          </div>`:c`<div class="exec-defaults__vd-line exec-defaults__vd-absent">
            배포 없음 —
            <span class="exec-defaults__vd-cmd"
              >[worker.deploy."${le}"]</span
            >
            섹션으로 정의
          </div>`}
    </div>`}function B(w){if(!w||typeof w!="object")return"";let G=Tu[String(w.outcome)];if(!G)return"";let F=w.outcome==="failed"&&w.reason?`${G.label} \xB7 ${w.reason}`:G.label,Z=[bt(w.at),typeof w.bead_id=="string"?w.bead_id:"",typeof w.base_sha=="string"?w.base_sha.slice(0,7):""].filter(Me=>Me.length>0).join(" \xB7 "),le=typeof w.detail=="string"&&w.detail.length>0?Eu(w.detail):"",Ae=typeof w.log_path=="string"&&w.log_path.length>0?w.log_path:"";return c`<div class="exec-defaults__vd-group" data-vd="last-deploy">
      <div class="exec-defaults__vd-label">마지막 배포</div>
      <div class="exec-defaults__vd-line">
        ${Ve(G.modifier,F)}
        ${Z?c`<span class="exec-defaults__vd-meta">${Z}</span>`:""}
      </div>
      ${le?c`<div class="exec-defaults__vd-line" data-vd-part="detail">
            <code class="exec-defaults__vd-cmd">${le}</code>
          </div>`:""}
      ${Ae?c`<div class="exec-defaults__vd-line" data-vd-part="log-path">
            전체 로그:
            <code class="exec-defaults__vd-cmd">${Ae}</code>
          </div>`:""}
    </div>`}let X=!1,se=!1,Se=!1,pe=null;async function qe(){if(s){se=!0,Se=!1,ae();try{let w=await Promise.resolve(s("get-worker-system-prompt",{}));!w||typeof w!="object"||Array.isArray(w)?Se=!0:pe=w}catch{Se=!0}finally{se=!1,ae()}}}function me(){if(X=!X,X&&!pe){qe();return}ae()}function Re(){return c`<section class="exec-defaults__sp" data-seam="system-prompt">
      <p class="exec-defaults__vd-title">
        워커 시스템 프롬프트
        <span class="exec-defaults__vd-ro">읽기 전용 — 서버가 조립</span>
        <button
          type="button"
          class="exec-defaults__sp-toggle"
          data-seam="system-prompt-toggle"
          aria-expanded=${X?"true":"false"}
          @click=${me}
        >
          ${X?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
        </button>
      </p>
      ${X?q():""}
    </section>`}function q(){let w=Rr({loading:se,error:Se});if(w)return w;if(!pe)return"";let G=Array.isArray(pe.variants)?pe.variants:[];return c`<div class="exec-defaults__sp-body">
      ${pe.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${pe.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${G.map(F=>c`<div class="exec-defaults__sp-variant" data-variant=${F.key}>
            <div class="exec-defaults__sp-cond">${F.condition}</div>
            ${Xt(F.label,F.system_prompt)}
          </div>`)}
    </div>`}function M(w){return c`<section class="exec-defaults__vd">
      <p class="exec-defaults__vd-title">
        검증·배포 설정
        <span class="exec-defaults__vd-ro"
          >읽기 전용 — config.toml에서 정의</span
        >
      </p>
      ${Te(w.verify_cmd)} ${Q(w.deploy_cmd)}
      ${B(w.last_deploy)}
    </section>`}function ae(){if(De(c`
        <div class="exec-defaults__container">
          <header class="exec-defaults__header">
            <div class="exec-defaults__title">전역 실행 설정</div>
            <button
              type="button"
              class="exec-defaults__close"
              aria-label="닫기"
              @click=${te}
            >
              ×
            </button>
          </header>
          <div class="exec-defaults__body">
            ${Ie()} ${ke()}
            ${M(Ge())}
            ${Re()}
          </div>
        </div>
      `,a),v!==null){let w=a.querySelector("[data-workspace-preset-select]");w&&(w.value=v)}}let ve=!1,we=()=>{ve=!1},ze=w=>{w.target===w.currentTarget&&te()};a.addEventListener("close",we),a.addEventListener("cancel",we),a.addEventListener("click",ze);let D=null;r&&r.subscribe&&(D=r.subscribe(()=>{ve&&ae()}));let H=null;n&&n.subscribe&&(H=n.subscribe(()=>{ve&&ae()}));function P(){ve||(ve=!0,ae(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""))}function te(){ve&&(ve=!1,typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:P,close:te,destroy(){ve=!1,a.removeEventListener("close",we),a.removeEventListener("cancel",we),a.removeEventListener("click",ze),D&&(D(),D=null),H&&(H(),H=null),a.remove()}}}function Dr(e){let t=Et(e.created_at),r=Et(e.updated_at);return!t&&!r?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${bt(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?c`<span>·</span>`:""}${r?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function Cu(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function nn(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Yn(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function jt(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,f)=>(p.requested_at||0)-(f.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Cu(s.phase):null,u=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:u==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:u}}function Jt(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.backup?.path,s=r.original_pr,o=r.revert_pr;return c`<div
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
  </div>`}function Ws(e){let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=mt(e.usage),s=Mt(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action,i=e.lane==="done"&&!a,l=i?Et(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",p=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",f=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,h=c`<span class="worker-mini__title">${e.title}</span>`,A=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",$=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",v=r.map(de=>de===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${de}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${de===e.completion_badge&&e.completion_title||""}
          >${de}</span
        >`),N=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",V=n.length>0?n.map(de=>c`<span class="worker-usage" title=${de.tooltip}
              >${de.label}</span
            >`):s?c`<span class="worker-usage" title=${Cr(e.usage)}
            >${s}</span
          >`:"",j=o?c`<span class="merge-step"
        >${o.label}<span class="merge-step__n"
          >${o.index}/${o.total}</span
        ></span
      >`:"",ne=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",O=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",E=e.discard,T=E?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${E?.attempt_id||""}
          data-operation-id=${E?.operation?.operation_id||""}
          data-discard-mode=${E?.confirmation||"unmerged"}
          ?disabled=${E?!E.enabled:e.discard_enabled===!1}
          title=${E?E.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${E?.label||"\uD3D0\uAE30"}
        </button>`:"",I=e.revise_action?c`<button
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
        </button>`:"",z=!!(s||o||e.merge_action||e.cancel_action||e.discard_action||E?.operation||e.revise_action);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${o?" worker-mini--merging":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">${p}${f}${h}</div>
          <div class="worker-mini__row2">
            ${V}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${bt(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${v}${j}
            <span class="worker-mini__actions"
              >${ne}${O}${T}</span
            >
            ${Dr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${p}${f}${A}${$}${v}${N}
            </div>
            <div class="worker-mini__body">${h}</div>
            ${z?c`<div class="worker-mini__foot">
                  ${V}${j}
                  <span class="worker-mini__actions"
                    >${ne}${O}${T}${I}</span
                  >
                  ${Jt(e)}
                </div>`:""}
            ${Dr(e)}`:c`<div class="worker-mini__line">
              ${u}${p}${f}${h}${A}${$}${v}${N}${V}${j}${ne}${O}${T}
            </div>
            ${Jt(e)} ${Dr(e)}`}
  </div>`}function Ru(e){let t=e.draggable&&!e.done,r=e.workflow,n=r&&r.chips||{},s=n.route||r&&r.route,o=n.route_source==="derived"||!!(r&&r.route_source==="derived"),a=e.is_quick_fix===!0||!!r&&r.route==="quick_fix",i=typeof e.reason=="string"&&e.reason.startsWith("\u26D4");return c`<div
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
    ${Dr(e)}
  </div>`}function zt(e){let t=!!e.collapsible&&!!e.collapsed,r=c`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Ru(n):Ws(n))}
          </div>`}
  </section>`}var Ei=160;function Vn(e){return e.length>Ei?`${e.slice(0,Ei)}\u2026`:e}function Iu(e){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?c` · <code>${Vn(e.command)}</code>`:""}
  </div>`}function Lu(e){return e?c`<details class="worker-banner__tail">
    <summary>출력 tail</summary>
    <pre>${e}</pre>
  </details>`:""}function Du(e){return e?c`<div class="worker-banner__log-path">
    전체 로그: <code>${e}</code>
  </div>`:""}function Ou(e){return!e||typeof e.verdict!="string"||typeof e.evidence!="string"?"":e.malformed===!0||e.verdict==="malformed"?c`<div class="worker-banner__detail">
      <b>진단 결과 형식 오류</b> · ${Vn(e.evidence)}
    </div>`:c`<div class="worker-banner__detail">
    진단: <b>${e.verdict}</b> · 근거:
    ${Vn(e.evidence)}
    ${e.verdict==="regression"&&e.fix_bead_id?c` · 수정 bead: ${e.fix_bead_id}`:""}
  </div>`}function Gs(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function Ci(e){let t=Array.isArray(e.cleanupFailures)?e.cleanupFailures:[];return c`<div class="worker-banners">
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
          ${Iu(e.failure.cause_detail)}
          ${Jt({discard:e.failure.discard})}
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
          ${Ou(r.diagnosis)}
          ${r.detail?c`<div class="worker-banner__detail">
                <code>${Vn(r.detail)}</code>
              </div>`:""}
          ${Du(r.log_path)} ${Lu(r.output_tail)}
        </div>`)}
  </div>`}function Pu(e,t,r=null){let n=e.failed===!0,s=!!e.paused,o=n?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):s?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?Gs(t-e.started_at):"\u2014",a=[e.runner,e.model].filter(Boolean).join(" \xB7 "),i=mt(e.usage),l=Mt(e.usage),u=e.conflict_resolution?s?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,p=e.base_exception||null,f=e.attempt_id&&e.attempt_id===r,h=e.discard?.action?c`<button
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
          ${i.length>0?i.map(A=>c`<span class="worker-usage" title=${A.tooltip}
                    >${A.label}</span
                  >`):l?c`<span
                  class="worker-usage"
                  title=${Cr(e.usage)}
                  >${l}</span
                >`:""}
        </div>`:""}
    ${Dr(e)} ${Jt(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일): 큐
         스냅샷에는 페이즈명도 진행률도 없으므로 진행 바는 만들지 않는다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${n||s?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Ys(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Pu(s,t,r))}
  </div>`}function ar(e){return c`<svg
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
  </svg>`}function Vs(){return ar(Gt`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Ks(){return ar(Gt`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Ri(){return ar(Gt`<rect x="4.3" y="4.3" width="7.4" height="7.4" rx="1.2" />`)}function Ii(){return ar(Gt`<path d="M4.4 4.4 11.6 11.6M11.6 4.4 4.4 11.6" />`)}function Li(){return ar(Gt`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Di(){return ar(Gt`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Oi(){return ar(Gt`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Pi(){return ar(Gt`<path d="M3 3.6 8.2 8 3 12.4z" />
    <path d="M8.8 3.6 14 8l-5.2 4.4z" />`)}var sn=1,Mu=6e4,Nu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"},Fu=new Set(["auto_merge","merged","merge","done"]),Mi={running:3,paused:2,failed:1};function qu(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Bu(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let f=t.get(a.bead_id),h=typeof f=="number"&&f>0&&typeof a.finished_at=="number"&&f>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!h&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let f=Mi[u.run_state],h=Mi[i];if(f>h||f===h&&(u.started_at??0)>(l??0))continue}let p=typeof a.session_id=="string"&&a.session_id.length>0;o.set(a.bead_id,{attempt_id:typeof a.attempt_id=="string"?a.attempt_id:"",run_state:i,started_at:l,last_event_at:typeof a.last_event_at=="number"?a.last_event_at:null,model:typeof a.model=="string"?a.model:null,usage:Lt(e,a.bead_id),can_pause:i==="running"&&p,can_resume:i!=="running"&&p&&!n.has(a.attempt_id)})}return o}function Ni(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Zs(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a=new Map;for(let v of s)v&&typeof v.root_dir=="string"&&a.set(v.root_dir,v);let i=[],l=[],u=[],p=[],f=[],h=new Map;for(let v of n){if(!v||typeof v.root_dir!="string")continue;let N=v.root_dir,V=v.name||N,j=a.get(N),ne=j&&typeof j.revision=="number"?j.revision:typeof v.revision=="number"?v.revision:0,O=Ct(v.attempts),E=Ct(v.bead_titles),T=Ct(v.pr_observations),I=Ct(v.admission),z=Ct(v.revise_parked),de=Ct(v.merge_queue_state),ye=Ct(v.cleanup_failed),he=Ct(v.discard_operations),ue=Array.isArray(v.merge_queue)?v.merge_queue:[],Ie=new Set(ue.filter(B=>B&&typeof B.bead_id=="string").map(B=>B.bead_id)),ke=Array.isArray(v.queue)?v.queue:[],Ge=Array.isArray(v.done)?v.done:[],Ve=new Map;for(let B of Ge)B&&typeof B.bead_id=="string"&&typeof B.added_at=="number"&&Ve.set(B.bead_id,B.added_at);let Te=B=>({id:B,title:E[B]||B,root_dir:N,workspace_name:V,expected_revision:ne,draggable:!1}),Q=new Set;for(let[B,X]of Bu(O,Ve))Q.add(B),l.push({...Te(B),lane:"running",attempt_id:X.attempt_id,run_state:X.run_state,can_pause:X.can_pause,can_resume:X.can_resume,started_at:X.started_at,last_event_at:X.last_event_at,model:X.model,usage:X.usage,discard:jt(he,B,{attempt_id:X.attempt_id}),badges:X.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:X.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:X.run_state==="failed"});for(let B of Array.isArray(v.pr_wait)?v.pr_wait:[]){let X=B&&B.bead_id;if(typeof X!="string"||Q.has(X))continue;Q.add(X);let se=Ct(T[X]),Se=Ct(se.pr),pe=se.gate?Ct(se.gate):null,qe=Ie.has(X),me=de.active===X,Re=B.external===!0,q=ye[X]||null,M=!!pe&&pe.base_badge==="\uCDA9\uB3CC",ae=!!q&&!!pe&&pe.tier==="merged",ve=Re&&!!pe&&pe.tier==="merged",we=jt(he,X,{external:Re,merge_active:me,merge_queued:qe,merged:!!q||pe?.tier==="merged"}),ze=!!we.operation;u.push({...Te(X),lane:"pr_wait",pr_number:typeof Se.number=="number"?Se.number:null,pr_url:typeof Se.url=="string"?Se.url:void 0,external:Re,usage:Lt(O,X),badges:q?["\uC815\uB9AC \uC2E4\uD328"]:[],alert:!!q,reason:q?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",merge_action:!qe,merge_enabled:!ze&&(pe?.enabled===!0||M||ae||ve),merge_label:ve?"\uC815\uB9AC":M&&!ae?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:ze?we.error?`\uD3D0\uAE30 \uC2E4\uD328: ${we.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${we.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ve?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":ae?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":M?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":pe?.enabled===!0?`\uBA38\uC9C0 (${pe.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${pe?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:qe,cancel_enabled:!me,discard:we,discard_action:we.action,discard_enabled:we.enabled,discard_title:we.title})}for(let B=0;B<ke.length;B++){let X=ke[B],se=X&&X.bead_id;if(typeof se!="string"||Q.has(se))continue;Q.add(se);let Se=z[se],pe=jt(he,se),qe=pe.operation?pe:null,me={...Te(se),lane:"queue",draggable:!qe,discard:qe||void 0,reason:Ni(I,se),queue_position:B+1,queue_index:B,queue_length:ke.length,badges:Se?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Se,revise_action:!!Se,revise_enabled:!!Se&&!qe,revise_title:Se?Se.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Se.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};p.push(me);let Re=h.get(N);Re?Re.push(me):h.set(N,[me])}for(let B of Array.isArray(v.runnable)?v.runnable:[]){let X=B&&B.bead_id;typeof X!="string"||Q.has(X)||(Q.add(X),i.push({...Te(X),title:B.title||E[X]||X,lane:"runnable",draggable:!0,reason:Ni(I,X),created_at:B.created_at??void 0,updated_at:B.updated_at??void 0,labels:Array.isArray(B.labels)?B.labels:[],workflow:B.route?{route:B.route,chips:{route:B.route}}:null,place_index:ke.length}))}for(let B of Ge){let X=B&&B.bead_id;if(typeof X!="string"||Q.has(X)||(Q.add(X),o!==void 0&&typeof B.added_at=="number"&&B.added_at<o))continue;let se=qu(O,X);f.push({...Te(X),lane:"done",done:!0,usage:Lt(O,X),done_at:typeof B.added_at=="number"?B.added_at:void 0,done_kind:se&&typeof se.done_kind=="string"?se.done_kind:null})}}l.sort((v,N)=>(N.last_event_at??0)-(v.last_event_at??0)),f.sort((v,N)=>(N.done_at??0)-(v.done_at??0));let A=s.length>0?s:n.map(v=>({root_dir:v&&v.root_dir,name:v&&v.name,auto_advance:v&&v.auto_advance,auto_merge:v&&v.auto_merge,slots:v&&v.slots,revision:v&&v.revision,exec_defaults:v&&v.exec_defaults,default_exec_preset_id:v&&v.default_exec_preset_id,runner_catalog:v&&v.runner_catalog})),$=[];for(let v of A)!v||typeof v.root_dir!="string"||$.push({root_dir:v.root_dir,name:v.name||v.root_dir,auto_advance:v.auto_advance===!0,auto_merge:v.auto_merge===!0,slots:typeof v.slots=="number"&&v.slots>=sn?v.slots:sn,revision:typeof v.revision=="number"?v.revision:0,exec_defaults:Ct(v.exec_defaults),default_exec_preset_id:typeof v.default_exec_preset_id=="string"?v.default_exec_preset_id:null,runner_catalog:Ct(v.runner_catalog),items:h.get(v.root_dir)||[]});return{runnable:i,queue:p,queue_groups:$,running:l,pr_wait:u,done:f,automation:{total:$.length,both_on:$.filter(v=>v.auto_advance&&v.auto_merge).length}}}function Uu(e,t){if(typeof e!="number"||!Number.isFinite(e))return"";let n=t-e<Mu;return c`<span
    class="mon-beat${n?" mon-beat--live":""}"
    title=${`\uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${bt(e)}`}
    ><span class="mon-beat__dot" aria-hidden="true"></span>${n?"":c`<span class="mon-beat__age"
          >${Et(e,t)}</span
        >`}</span
  >`}function on(e){return c`<div class="mon-c__title">${e.title}</div>`}function an(e){return c`<span class="mon-c__id" title="클릭하면 상세로 이동"
    >${e.id}</span
  >`}function Kn(e){return e.workspace_name?c`<span class="mon-c__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:""}function Xs(e){let t=mt(e.usage),r=Mt(e.usage);return t.length>0?t.map(n=>c`<span class="mon-c__usage" title=${n.tooltip}
          >${n.label}</span
        >`):r?c`<span class="mon-c__usage" title=${Cr(e.usage)}
        >${r}</span
      >`:""}function Qs(e){return(Array.isArray(e.badges)?e.badges:[]).map(r=>c`<span class="mon-c__badge${e.alert?" mon-c__badge--alert":""}"
        >${r}</span
      >`)}function ju(e){return c`<span class="mon-c__ops">
    ${e.run_state==="running"?c`<button
          type="button"
          class="mon-op mon-op--pause"
          ?disabled=${e.can_pause===!1}
          aria-label="일시정지"
          title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
        >
          ${Ks()}
        </button>`:c`<button
          type="button"
          class="mon-op mon-op--resume"
          ?disabled=${e.can_resume===!1}
          aria-label="이어하기"
          title="이어하기"
        >
          ${Vs()}
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
          ${Ii()}
        </button>`:""}
  </span>`}function zu(e,t){let r=typeof e.started_at=="number"?Gs(t-e.started_at):"";return c`${on(e)}
    <div class="mon-c__meta">
      ${Qs(e)}${Uu(e.last_event_at,t)}${an(e)}${Kn(e)}
      ${e.model?c`<span class="mon-c__model">${e.model}</span>`:""}
      ${r?c`<span class="mon-live__elapsed">${r}</span>`:""}
      ${Xs(e)}${ju(e)}${Jt(e)}
    </div>`}function Hu(e){let t=e.workflow,n=(t&&t.chips||{}).route||t&&t.route,s=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),o=Et(e.updated_at);return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>${an(e)}
      ${n?c`<span class="ctl-chip ctl-chip--route">${n}</span>`:""}
      ${xn(e.labels,null).map(a=>c`<span class="ctl-chip ctl-chip--label">${a}</span>`)}
      ${Kn(e)}
      ${o?c`<span title=${`\uC218\uC815 ${bt(e.updated_at)}`}
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
    </div>`}function Wu(e){let t=!!e.discard?.operation;return c`${on(e)}
    <div class="mon-c__meta">
      <span class="mon-c__grip" aria-hidden="true">⠿</span>
      <span class="mon-live__pos">#${e.queue_position}</span>${an(e)}
      ${Qs(e)}
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
    ${Jt(e)}
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
        </div>`:""}`}function Gu(e){let t=!!(Mt(e.usage)||e.merge_action||e.cancel_action||e.discard_action);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Kn(e)}
      ${e.pr_url&&e.pr_number?c`<a
            class="mon-c__pr"
            href=${e.pr_url}
            target="_blank"
            rel="noreferrer noopener"
            title="PR 열기"
            >#${e.pr_number} ↗</a
          >`:""}
      ${Qs(e)}
      ${e.reason?c`<span class="mon-c__reason">${e.reason}</span>`:""}
    </div>
    ${t?c`<div class="mon-c__tail">
          ${Xs(e)}
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
          ${Jt(e)}
        </div>`:""}`}function Yu(e,t){let r=e.done_kind||"",n=r?Nu[r]||r:"",s=Et(e.done_at,t);return c`${on(e)}
    <div class="mon-c__meta">
      ${an(e)}${Kn(e)}
      ${n?c`<span
            class="mon-live__kind${Fu.has(r)?" mon-live__kind--ok":" mon-live__kind--warn"}"
            >${n}</span
          >`:""}
      ${Xs(e)}
      ${s?c`<span title=${`\uC644\uB8CC ${bt(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
    </div>`}function Fi(e,t){return e.lane==="running"?zu(e,t):e.lane==="runnable"?Hu(e):e.lane==="queue"?Wu(e):e.lane==="pr_wait"?Gu(e):Yu(e,t)}function qi(e){let t=String(e.revision);return c`<header
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
        ${e.auto_advance?Ks():Vs()}
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
        ${Li()}
        <span class="mon-ctl__label">머지</span>
      </button>
      <label class="mon-ctl mon-ctl--slots" title="동시에 실행할 세션 수">
        ${Di()}
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
        ${Oi()}
        <span class="mon-ctl__label">설정</span>
      </button>
    </span>
  </header>`}function Bi(e){let{total:t,both_on:r}=e.automation,n=t>0&&r===t,s=Ut.find(a=>a.value===e.done_range)?.label||"",o=Array.isArray(e.token_total)?e.token_total:e.token_total?[{label:e.token_total,tooltip:e.token_tooltip}]:[];return c`<div class="mon-top">
    <button
      type="button"
      class="mon-auto-all${n?" is-active":""}"
      data-on=${n?"false":"true"}
      aria-pressed=${n?"true":"false"}
      ?disabled=${t===0}
      title=${n?"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uB055\uB2C8\uB2E4 (\uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4)":"\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uD568\uAED8 \uCF2D\uB2C8\uB2E4"}
    >
      ${n?Ri():Pi()}
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
        ${Ut.map(a=>c`<option
              value=${a.value}
              ?selected=${e.done_range===a.value}
            >
              ${a.label}
            </option>`)}
      </select>
      ${o.map(a=>c`<span
            class="mon-kpi__chip mon-kpi__chip--tokens"
            title=${a.tooltip}
            >${s} 완료 · 누적 ${a.label}</span
          >`)}
    </div>
  </div>`}function Ui(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function ji(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return mt(En(t));let r={};for(let i of Vt)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let p of Vt){let f=l[p];typeof f=="number"&&Number.isFinite(f)&&(r[p]+=f,n=!0,u=!0)}if(u){o+=1;let p=l.total_cost_usd;typeof p=="number"&&Number.isFinite(p)&&(s+=p,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Mt(r):null}var Hi="bdui.monitor.done-range";function Vu(){try{let e=window.localStorage.getItem(Hi);return Yt(e)?e:It}catch{return It}}function Ku(e){try{window.localStorage.setItem(Hi,e)}catch{}}var Wi="tab:monitor:pipeline",Zu=1e3,Xu=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}];function zi(e,t){let r=(e.lane==="runnable"||e.lane==="queue")&&e.draggable!==!1;return c`<div
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
    ${Fi(e,t)}
  </div>`}function Gi(e,t){let r=Xe("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.execPresetStore,i=t.getWorkspacePath,l=t.switchWorkspace,u=t.now||(()=>Date.now()),p=t.confirm||(D=>typeof globalThis.confirm!="function"||globalThis.confirm(D)),f=Vu();function h(){let D=Ut.find(H=>H.value===f);return D?D.label:""}let A=document.createElement("div");A.className="mon",e.appendChild(A);let $=Zs(null,null),v=null,N=new Map,V=new Set;function j(D){return $.queue_groups.find(H=>H.root_dir===D)||null}let O=Gn(e,{queueStore:{get(){if(!v)return{revision:0,exec_defaults:{},default_exec_preset_id:null};let D=N.get(v);if(D)return D;let H=j(v),P=s&&s.get?s.get():null,te=(Array.isArray(P)?P:[]).find(w=>w&&w.root_dir===v);return{revision:H?H.revision:0,exec_defaults:H?H.exec_defaults:{},default_exec_preset_id:H?H.default_exec_preset_id:null,runner_catalog:H?H.runner_catalog:null,workspace_info:te?te.workspace_info:void 0}},set(D){v&&N.set(v,D);for(let H of Array.from(V))H()},subscribe(D){return V.add(D),()=>V.delete(D)}},presetStore:a,transport:o?(D,H)=>o(D,D==="worker-queue-set-default-exec-preset"||D==="get-worker-system-prompt"?{...H||{},root_dir:v}:H):void 0,getWorkspacePath:()=>v||void 0}),E=null,T=null;async function I(D,H,P,te){if(!o||!P)return null;let w=await o(D,{...H,root_dir:P,expected_revision:te});if(w&&w.conflict){let G=w.queue&&typeof w.queue.revision=="number"?w.queue.revision:te;w=await o(D,{...H,root_dir:P,expected_revision:G})}return w&&w.queue&&P&&N.set(P,w.queue),w}async function z(D,H,P){let te=await I("worker-discard",D,H,P);if(te&&te.discarded===!0){ee(Yn(te),"success",5e3);return}if(te&&te.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${te.reason}`,"error");return}if(te&&te.accepted&&te.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(te&&te.accepted){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${te.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}te&&!te.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function de(D,H,P){return!o||!P?null:await o(D,{...H,root_dir:P})}async function ye(D){if(!o||!D&&!p("\uC804 \uB808\uD3EC\uC758 \uC790\uB3D9 \uC9C4\uD589\xB7\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB055\uB2C8\uB2E4. \uAC01 \uB808\uD3EC\uC758 \uBA38\uC9C0 \uB300\uAE30\uC5F4\uB3C4 \uD568\uAED8 \uBE44\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"))return;let H=await o("monitor-auto-toggle",{on:D}),P=H&&Array.isArray(H.failed)?H.failed:[];P.length>0&&ee(`\uC790\uB3D9\uD654 ${D?"\uCF1C\uAE30":"\uB044\uAE30"} \uC77C\uBD80 \uC2E4\uD328: ${P.map(te=>te.root_dir).join(", ")}`,"error",3200)}async function he(){let D=new Map;for(let H of $.pr_wait)D.has(H.root_dir)||D.set(H.root_dir,H.expected_revision);for(let[H,P]of D)await I("worker-merge-queue-add-all",{},H,P)}let ue=null,Ie=!1,ke=null;function Ge(){ke!==null&&clearTimeout(ke),ke=setTimeout(()=>{ke=null,Ie=!1},0)}function Ve(D){let H=D.target;return typeof H?.closest=="function"?H.closest(".mon-group"):null}function Te(D){let H=Ve(D);return!H||!ue?null:(H.getAttribute("data-root-dir")||"")===ue.root_dir?H:null}function Q(){for(let D of Array.from(A.querySelectorAll(".mon-group--drag-over")))D.classList.remove("mon-group--drag-over")}function B(D){let H=D.target,P=typeof H?.closest=="function"?H.closest('.mon-card[draggable="true"]'):null;if(P){ue={bead_id:P.getAttribute("data-issue-id")||"",lane:P.getAttribute("data-lane")||"",root_dir:P.getAttribute("data-root-dir")||"",revision:Number(P.getAttribute("data-revision")||0)||0,queue_index:Number(P.getAttribute("data-queue-index")),queue_length:Number(P.getAttribute("data-queue-length")),place_index:Number(P.getAttribute("data-place-index"))},Ie=!0;try{D.dataTransfer?.setData("text/plain",ue.bead_id),D.dataTransfer&&(D.dataTransfer.effectAllowed="move")}catch{}}}function X(D){let H=Te(D);H&&(D.preventDefault(),D.dataTransfer&&(D.dataTransfer.dropEffect="move"),H.classList.add("mon-group--drag-over"))}function se(D){Ve(D)?.classList.remove("mon-group--drag-over")}function Se(){ue=null,Q(),Ge()}function pe(D){let H=Te(D),P=ue;if(ue=null,Q(),!H||!P||!P.bead_id)return;D.preventDefault();let te=D.target,w=typeof te?.closest=="function"?te.closest('.mon-card[data-lane="queue"]'):null,G=w&&H.contains(w)?Number(w.getAttribute("data-queue-index")):NaN;if(P.lane==="runnable"){let le=Number.isFinite(G)?G:P.place_index;if(!Number.isFinite(le))return;I("worker-queue-place",{bead_id:P.bead_id,index:le},P.root_dir,P.revision);return}if(P.lane!=="queue"||w&&w.getAttribute("data-issue-id")===P.bead_id)return;let F=P.queue_index,Z=Number.isFinite(G)?F>G?G:G-1:P.queue_length-1;!Number.isFinite(Z)||Z<0||Z===F||I("worker-queue-reorder",{bead_id:P.bead_id,to_index:Z},P.root_dir,P.revision)}function qe(D){let H={runnable:$.runnable,queue:$.queue,running:$.running,pr_wait:$.pr_wait,done:$.done};return c`${Bi({automation:$.automation,counts:{running:$.running.length,queue:$.queue.length,pr_wait:$.pr_wait.length},done_range:f,token_total:ji($.done),token_tooltip:Ui(h())})}
      <div class="worker-lanes mon-lanes">
        ${Xu.map(P=>{let te=H[P.lane],w=P.lane==="queue"?$.queue_groups.length>0?c`${$.queue_groups.map(G=>c`<div
                        class="mon-group"
                        data-root-dir=${G.root_dir}
                      >
                        ${qi(G)}
                        <div class="mon-group__list">
                          ${G.items.map(F=>zi(F,D))}
                        </div>
                      </div>`)}`:void 0:te.length>0?c`${te.map(G=>zi(G,D))}`:void 0;return zt({id:`monitor-${P.lane}`,lane:P.pane,title:P.lane==="done"?`\uC644\uB8CC\xB7${h()}`:P.title,items:te,empty:P.empty,body:w,live:P.lane==="running"&&te.length>0,header_control:P.lane==="pr_wait"&&te.length>0?c`<button
                    type="button"
                    class="mon-lane-op mon-merge-all"
                    title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                  >
                    일괄 머지
                  </button>`:""})})}
      </div>`}function me(){let D=s&&s.get?s.get():null,H=s&&s.getWorkspacesState?s.getWorkspacesState():[],P=u();$=Zs(D,H,{done_since:wr(f,P)}),De(qe(P),A)}function Re(D,H){let P=i?i():void 0;if(!H||!P||H===P||!l){n(D);return}l(H).then(()=>{n(D)}).catch(te=>{r("workspace switch for %s failed: %o",H,te)})}function q(D){return{root_dir:D.getAttribute("data-root-dir")||"",revision:Number(D.getAttribute("data-revision")||0)||0}}function M(D,H){let{root_dir:P,revision:te}=q(D),w=D.getAttribute("data-issue-id")||"",G=H.dataset.attemptId||D.getAttribute("data-attempt-id")||"",F=H.classList;if(F.contains("worker-card__place")){I("worker-queue-place",{bead_id:w,index:Number(D.getAttribute("data-place-index")||0)||0},P,te);return}if(F.contains("mon-op--up")||F.contains("mon-op--down")){let Z=Number(D.getAttribute("data-queue-index")||0)||0,le=F.contains("mon-op--up")?Z-1:Z+1;if(le<0)return;I("worker-queue-reorder",{bead_id:w,to_index:le},P,te);return}if(F.contains("mon-op--remove")){I("worker-queue-remove",{bead_id:w},P,te);return}if(F.contains("mon-op--pause")){de("worker-attempt-pause",{attempt_id:G},P);return}if(F.contains("mon-op--discard")){if(!p(nn(w,"unmerged")))return;z({bead_id:w,...G?{attempt_id:G}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},P,te);return}if(F.contains("mon-op--resume")){I("worker-attempt-resume",{attempt_id:G},P,te);return}if(F.contains("mon-op--dismiss")){I("worker-attempt-dismiss",{attempt_id:G},P,te);return}if(F.contains("worker-mini__merge")){I("worker-merge-queue-add",{bead_id:w},P,te);return}if(F.contains("worker-mini__merge-cancel")){I("worker-merge-queue-remove",{bead_id:w},P,te);return}if(F.contains("worker-mini__discard")){let Z=H.dataset.discardMode==="merged"?"merged":"unmerged";if(!p(nn(w,Z)))return;z({bead_id:w,...G?{attempt_id:G}:{},...H.dataset.operationId?{operation_id:H.dataset.operationId}:{}},P,te);return}if(F.contains("worker-mini__revise-fix")){I("worker-revise-fix",{bead_id:w},P,te);return}F.contains("worker-mini__revise-approve")&&I("worker-revise-approve",{bead_id:w},P,te)}function ae(D){let H=Ie;Ie=!1;let P=D.target;if(!P||typeof P.closest!="function"||P.closest("dialog")||P.closest("a"))return;let te=P.closest(".mon-auto-all");if(te){D.preventDefault(),ye(te.getAttribute("data-on")==="true");return}if(P.closest(".mon-merge-all")){D.preventDefault(),he();return}let G=P.closest(".mon-ctl--advance");if(G){D.preventDefault();let{root_dir:Ke,revision:He}=q(G);I("worker-queue-toggle",{on:G.getAttribute("data-on")==="true"},Ke,He);return}let F=P.closest(".mon-ctl--merge-auto");if(F){D.preventDefault();let{root_dir:Ke,revision:He}=q(F);I("worker-merge-auto-toggle",{on:F.getAttribute("data-on")==="true"},Ke,He);return}let Z=P.closest(".mon-ctl--exec");if(Z){D.preventDefault(),v=Z.getAttribute("data-root-dir")||null,N.delete(v||""),O.open();return}let le=P.closest(".mon-card");if(!le)return;let Ae=P.closest("button");if(Ae){D.preventDefault(),M(le,Ae);return}let Me=le.getAttribute("data-issue-id");Me&&!H&&(D.preventDefault(),Re(Me,le.getAttribute("data-root-dir")||""))}function ve(D){let H=D.target;if(!H||typeof H.closest!="function")return;let P=H.closest(".mon-done-range");if(P){f=Yt(P.value)?P.value:It,Ku(f),me();return}let te=H.closest(".mon-slots__input");if(!te)return;let{root_dir:w,revision:G}=q(te),F=Number(te.value);if(!Number.isFinite(F))return;let Z=Math.max(sn,Math.floor(F));I("worker-queue-set-slots",{slots:Z},w,G)}e.addEventListener("click",ae),e.addEventListener("change",ve),e.addEventListener("dragstart",B),e.addEventListener("dragover",X),e.addEventListener("dragleave",se),e.addEventListener("drop",pe),e.addEventListener("dragend",Se),s&&typeof s.subscribe=="function"&&(E=s.subscribe(()=>{try{N.clear(),me();for(let D of Array.from(V))D()}catch{}}));function we(){T!==null&&(clearInterval(T),T=null)}function ze(){ke!==null&&(clearTimeout(ke),ke=null)}return{load(){r("load"),me(),T===null&&(T=setInterval(()=>{try{me()}catch{}},Zu))},pause(){we()},clear(){we(),ze(),E&&(E(),E=null),e.removeEventListener("click",ae),e.removeEventListener("change",ve),e.removeEventListener("dragstart",B),e.removeEventListener("dragover",X),e.removeEventListener("dragleave",se),e.removeEventListener("drop",pe),e.removeEventListener("dragend",Se),O.destroy(),V.clear(),e.replaceChildren()}}}function Yi(e,t,r){let n=Xe("views:nav"),s=null;function o(l){return u=>{u.preventDefault(),n("click tab %s",l),r.gotoView(l)}}function a(){let l=t.getState(),u=l.view==="worker"||l.view==="monitor"?l.view:"board";return c`
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
    `}function i(){De(a(),e)}return i(),s=t.subscribe(()=>i()),{destroy(){s&&(s(),s=null),De(c``,e)}}}var Vi=["bug","feature","task","epic","chore"];function Ki(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Zi=["Critical","High","Medium","Low","Backlog"];function Xi(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),l=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),p=r.querySelector("#btn-cancel"),f=r.querySelector("#btn-create"),h=r.querySelector(".new-issue__close");function A(){o.replaceChildren();let E=document.createElement("option");E.value="",E.textContent="\u2014 Select \u2014",o.appendChild(E);for(let T of Vi){let I=document.createElement("option");I.value=T,I.textContent=Ki(T),o.appendChild(I)}a.replaceChildren();for(let T=0;T<=4;T+=1){let I=document.createElement("option");I.value=String(T);let z=Zi[T]||"Medium";I.textContent=`${T} \u2013 ${z}`,a.appendChild(I)}}A();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function v(E){s.disabled=E,o.disabled=E,a.disabled=E,i.disabled=E,l.disabled=E,p.disabled=E,f.disabled=E,f.textContent=E?"Creating\u2026":"Create"}function N(){u.textContent=""}function V(E){u.textContent=E}function j(){try{let E=window.localStorage.getItem("beads-ui.new.type");E?o.value=E:o.value="";let T=window.localStorage.getItem("beads-ui.new.priority");T&&/^\d$/.test(T)?a.value=T:a.value="2"}catch{o.value="",a.value="2"}}function ne(){let E=o.value||"",T=a.value||"";E.length>0&&window.localStorage.setItem("beads-ui.new.type",E),T.length>0&&window.localStorage.setItem("beads-ui.new.priority",T)}async function O(){N();let E=String(s.value||"").trim();if(E.length===0){V("Title is required"),s.focus();return}let T=Number(a.value||"2");if(!(T>=0&&T<=4)){V("Priority must be 0..4"),a.focus();return}let I=String(o.value||""),z=String(l.value||""),de={title:E};I.length>0&&(de.type=I),String(T).length>0&&(de.priority=T),z.length>0&&(de.description=z),v(!0);try{await t("create-issue",de)}catch{v(!1),V("Failed to create issue");return}ne(),v(!1),$()}return r.addEventListener("cancel",E=>{E.preventDefault(),$()}),h.addEventListener("click",()=>$()),p.addEventListener("click",()=>$()),r.addEventListener("keydown",E=>{E.key==="Enter"&&(E.ctrlKey||E.metaKey)&&(E.preventDefault(),O())}),n.addEventListener("submit",E=>{E.preventDefault(),O()}),{open(){n.reset(),N(),j();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var Qu=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function Qi(e){return String(e).padStart(2,"0")}function Ju(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function ep(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${Qi(n.getHours())}:${Qi(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${Qu[n.getMonth()]} ${n.getDate()} ${o}`;return`${Ju(r,t)} \xB7 ${i}`}function tp(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}var Ji=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage"}];function el(e){let t=!1,r=null,n=new Map;function s(){De(c``,e),e.hidden=!0}function o(){let l=Ji.filter(p=>n.has(p.key));if(l.length===0){s();return}let u=Date.now();De(c`<div class="usage-meter" aria-label="Usage">
        ${l.map(p=>{let f=n.get(p.key),h=typeof f.ageSeconds=="number"&&f.ageSeconds>600,A=h?`${Math.floor(f.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"";return c`<span
            class="usage-meter__group${h?" usage-meter__group--stale":""}"
            aria-label=${`${p.label} usage`}
          >
            <span class="usage-meter__provider">${p.label}</span>
            ${f.windows.map($=>{let v=typeof $.pct=="number"&&Number.isFinite($.pct)?$.pct:0,N=Math.min(100,Math.max(0,v)),j=`resets ${ep($.resetsAt,u)}${h?` \xB7 ${A}`:""}`;return c`<span
                class="usage-meter__window ${tp(N)}"
                style=${`--progress: ${N}%`}
                title=${j}
              >
                <span class="usage-meter__label">${$.key}</span>
                <span class="usage-meter__track" aria-hidden="true">
                  <span class="usage-meter__fill"></span>
                </span>
                <span class="usage-meter__pct">${N}%</span>
              </span>`})}
          </span>`})}
      </div>`,e),e.hidden=!1}async function a(l){try{let u=await fetch(l.endpoint);if(!u.ok)return null;let p=await u.json();return!p||p.available!==!0||!Array.isArray(p.windows)?null:p}catch{return null}}async function i(){let l=await Promise.all(Ji.map(async u=>({provider:u,payload:await a(u)})));if(!t){for(let u of l)u.payload?n.set(u.provider.key,u.payload):n.delete(u.provider.key);o()}}return s(),i(),r=setInterval(()=>{i()},6e4),{destroy(){t=!0,r!==null&&(clearInterval(r),r=null),s()}}}var rp="worker-ineligible";function np(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function tl(e){return np(e).includes(rp)}var sp="tab:worker:ready",op="tab:worker:blocked",ap="tab:worker:in-progress",ln=1;function rl(e){return en(e).path.length>0}var ol="beads-ui.worker.candidate-filter",Js={show_blocked:!1,spec:"all"};function ip(e,t){if(!e||typeof e!="object"||Array.isArray(e))return!1;let r=Object.values(e),n=new Set;for(let s of r)s&&typeof s=="object"&&typeof s.resumed_from=="string"&&s.resumed_from.length>0&&n.add(s.resumed_from);return r.some(s=>s&&typeof s=="object"&&s.bead_id===t&&s.cleanup_diagnosis===!0&&(s.status==="running"||s.status==="paused"&&!n.has(s.attempt_id)))}function lp(){try{let e=window.localStorage.getItem(ol);if(!e)return{...Js};let t=JSON.parse(e);if(!t||typeof t!="object")return{...Js};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...Js}}}function cp(e){try{window.localStorage.setItem(ol,JSON.stringify(e))}catch{}}function dp(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=r(i),u=n(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var up=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],al="bdui.worker.candidate_sort",pp=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],Zn="spec";function fp(){try{let e=window.localStorage.getItem(al);return e==="board"||e==="created"||e==="spec"?e:Zn}catch{return Zn}}function _p(e){try{window.localStorage.setItem(al,e)}catch{}}var il="bdui.worker.done-range";function mp(){try{let e=window.localStorage.getItem(il);return Yt(e)?e:It}catch{return It}}function gp(e){try{window.localStorage.setItem(il,e)}catch{}}var hp="(max-width: 640px)",ll="beads-ui.worker.lane-collapsed",cn={queue:!0,done:!0};function bp(){try{let e=window.localStorage.getItem(ll);if(!e)return{...cn};let t=JSON.parse(e);return!t||typeof t!="object"?{...cn}:{queue:typeof t.queue=="boolean"?t.queue:cn.queue,done:typeof t.done=="boolean"?t.done:cn.done}}catch{return{...cn}}}function vp(e){try{window.localStorage.setItem(ll,JSON.stringify(e))}catch{}}function nl(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function yp(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(fr):(n.sort(bn(r)),t==="board"?n:[...n.filter(rl),...n.filter(s=>!rl(s))])}function kp(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function wp(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function $p(e){let r=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(n=>typeof n=="string"?n:n&&n.id).filter(Boolean);return r.length>0?`\u{1F512} ${r.join(", ")}`:"\u{1F512} blocked"}var xp=["closed_unmerged","undecidable"],Sp=[{from:"\uAD00\uCE21 \uB300\uAE30",activity:"checking",to:"\uD655\uC778\uC911"},{from:"\uB85C\uCEEC\uAC80\uC99D \uB300\uAE30",activity:"verifying",to:"\uB85C\uCEEC\uAC80\uC99D \uC2E4\uD589 \uC911"}];function Ap(e,t){for(let r of Sp)if(e===r.from&&t===r.activity)return{label:r.to,live:!0};return{label:e,live:!1}}var eo=[{step:"merging",label:"\uBA38\uC9C0 \uC911"},{step:"base_sync",label:"base \uB3D9\uAE30\uD654"},{step:"post_merge_verify",label:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D"},{step:"deploy",label:"\uBC30\uD3EC"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Tp(e){if(typeof e!="string"||e.length===0)return null;let t=eo.length,r=eo.findIndex(n=>n.step===e);return r<0?{label:e,index:0,total:t,percent:0}:{label:eo[r].label,index:r+1,total:t,percent:Math.round((r+1)/t*100)}}function sl(e){switch(e){case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";default:return e}}function to(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function Ep(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o="root \uC7AC\uAC80\uC99D \uC911";break;case"repairing":o=e.subject_role==="root"?`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 \uC6D0 PR \uC218\uC815 \uC911`:`\uC790\uB3D9\uBCF5\uAD6C ${t}/${r} \xB7 repair PR \uC900\uBE44 \uC911`;break;case"waiting_repair_pr":o=s?`repair PR #${s} \uB300\uAE30`:"repair PR \uB300\uAE30";break;case"merging":o=e.subject_role==="repair"?s?`repair PR #${s} \uBA38\uC9C0 \uC911`:"repair PR \uBA38\uC9C0 \uC911":"root \uBA38\uC9C0 \uC911";break;case"cleaning":o="\uC815\uB9AC \uBCF5\uAD6C \uC911";break;case"paused":o="\uC790\uB3D9\uBCF5\uAD6C \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o=`\uC0AC\uB78C \uD655\uC778 \uD544\uC694 \xB7 ${e.terminal_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`;break;case"completed":return null;default:return null}let a=[`\uBCF5\uAD6C \uC138\uC158 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function Cp(e,t,r,n,s=null,o=null,a=null,i=!1,l=null,u=!0,p=null,f=null,h=null,A={}){let $=!!l&&l.position>0,v=!!l&&l.active===!0,N=l&&l.failure||null,V=r[e]||null,j=V&&V.gate?V.gate:null,ne=V&&V.pr?V.pr:null,O=Ep(h),E=[];i&&E.push("\uC138\uC158");let T=a?a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":null,I=Ap(i&&j&&j.tier==="closed_unmerged"?"\uB2EB\uD798":j&&j.gate_badge||"",T?null:o&&o.activity||null);T&&E.push(T),I.label&&E.push(I.label),j&&j.base_badge&&j.base_badge!==j.gate_badge&&E.push(j.base_badge),f&&E.push(f),n&&E.push("\uC815\uB9AC \uC2E4\uD328"),O&&E.push(O.badge),$&&!v&&E.push(`\uBA38\uC9C0 \uB300\uAE30 #${l.position}`),N&&E.push(`\uC77C\uAD04 \uBA38\uC9C0 \uC2E4\uD328: ${sl(N)}`),p&&E.push(`\uC790\uB3D9 \uC81C\uC678: ${sl(p)}`);let z=!!j&&j.base_badge==="\uCDA9\uB3CC",de=!!j&&j.enabled===!0,ye=Tp(o&&o.merge_progress?o.merge_progress.step:null),he=!!n&&!!j&&j.tier==="merged",ue=i&&!!j&&j.tier==="merged",Ie=i&&z&&u===!1,ke=jt(A,e,{external:i,merge_active:v||!!ye,merge_queued:$,conflict_active:!!a,cleanup_active:!1,merged:!!n||j?.tier==="merged"}),Ge=!!ke.operation;return{id:e,title:t,reason:n?"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644":"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",external:i,pr_number:ne&&typeof ne.number=="number"?ne.number:null,pr_url:ne&&typeof ne.url=="string"?ne.url:"",completion_badge:O?O.badge:null,completion_title:O?O.title:"",completion_repair_pr_url:O?O.repair_pr_url:"",completion_repair_pr_number:O?O.repair_pr_number:null,badges:E,live_badge:a==="running"?T:T?null:I.live?I.label:null,usage:s,alert:!!j&&xp.includes(j.tier)||!!n||!!N||!!(O&&O.alert),merge_action:!$,cancel_action:$,cancel_enabled:!v&&!(O&&O.lock_actions),cancel_title:O&&O.lock_actions?"\uC790\uB3D9\uBCF5\uAD6C \uC911 \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694":v?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:ke,discard_action:ke.action,merge_step:ye,discard_enabled:ke.enabled,discard_title:ke.title,merge_enabled:!ye&&!a&&!Ge&&!(O&&O.lock_actions)&&!Ie&&(de||z||he||ue),merge_label:ue?"\uC815\uB9AC":z&&!ye&&!he?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:Ge?ke.error?`\uD3D0\uAE30 \uC2E4\uD328: ${ke.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${ke.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:ye?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ye.label}`:ue?"\uBA38\uC9C0\uB428 \u2014 \uD074\uB9AD\uD558\uBA74 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC\uB97C \uC218\uD589\uD569\uB2C8\uB2E4":Ie?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":he?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uCC98\uC74C\uBD80\uD130 \uB2E4\uC2DC \uC218\uD589\uD569\uB2C8\uB2E4":z?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":de?`\uBA38\uC9C0 (${j.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:j&&j.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${j&&j.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function ro(e,t={}){let{transport:r,issueStores:n,queueStore:s,execPresetStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u}=t,p=n?yn(n,i):null,f=wn({transport:r,uiOrderStore:i}),h=null,A=[],$=lp(),v=fp(),N=mp();function V(){let d=Ut.find(m=>m.value===N);return d?d.label:"\uC624\uB298"}let j=bp(),ne=!1,O=new Set,E=new Set,T=new Set,I=[],z=document.createElement("div");z.className="worker-console";let de=document.createElement("div");de.className="worker-top";let ye=document.createElement("div");ye.className="worker-drawer-overlay",ye.hidden=!0;let he=document.createElement("div");he.className="worker-drawer-overlay__backdrop";let ue=document.createElement("div");ue.className="worker-drawer-host",ye.append(he,ue);let Ie=document.createElement("div");Ie.className="worker-lanes-host",z.append(de,ye,Ie),e.appendChild(z);let ke=null,Ge=jn(ue,{transport:r,sessionLogStore:a,onClose:()=>{ke=null,ye.hidden=!0,Le()}}),Ve=Gn(z,{queueStore:s,presetStore:o,transport:r,getWorkspacePath:u});function Te(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,pr_wait_holds_slot:!1,slots:ln,queue:[],pr_wait:[],done:[]}}function Q(){let d=Te();return typeof d.revision=="number"?d.revision:0}function B(d){d&&d.queue&&s&&s.set(d.queue)}function X(){let d=Te().queue;return Array.isArray(d)?d.length:0}async function se(d,m){if(!r)return;let x=await r("worker-queue-place",{bead_id:d,index:m,expected_revision:Q()});B(x),x&&x.conflict&&await r("worker-queue-place",{bead_id:d,index:m,expected_revision:Q()}).then(B)}async function Se(d,m){if(!r)return;let x=await r("worker-queue-reorder",{bead_id:d,to_index:m,expected_revision:Q()});B(x),x&&x.conflict&&await r("worker-queue-reorder",{bead_id:d,to_index:m,expected_revision:Q()}).then(B)}async function pe(d){if(!r)return;let m=await r("worker-queue-remove",{bead_id:d,expected_revision:Q()});B(m),m&&m.conflict&&await r("worker-queue-remove",{bead_id:d,expected_revision:Q()}).then(B)}async function qe(d){if(!r||!d)return;let m=await r("worker-attempt-pause",{attempt_id:d});m&&m.paused===!1&&m.reason&&ee(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function me(d){if(!r||!d)return;let m=await r("worker-attempt-resume",{attempt_id:d,expected_revision:Q()});B(m),m&&m.conflict&&(m=await r("worker-attempt-resume",{attempt_id:d,expected_revision:Q()}),B(m)),m&&m.resumed===!1&&!m.conflict&&m.reason&&ee(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Re(d){if(!r||!d)return;let m=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:Q()});B(m),m&&m.conflict&&(m=await r("worker-attempt-dismiss",{attempt_id:d,expected_revision:Q()}),B(m)),m&&m.dismissed===!1&&!m.conflict&&m.reason&&ee(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function q(d){if(!r||!d||T.has(d))return;T.add(d),Le();let m;try{m=await r("worker-cleanup-diagnose",{bead_id:d,expected_revision:Q()}),B(m),m&&m.conflict&&(m=await r("worker-cleanup-diagnose",{bead_id:d,expected_revision:Q()}),B(m))}finally{T.delete(d),Le()}m&&!m.conflict&&m.ok===!1&&m.reason&&ee(`AI \uC815\uB9AC \uAC70\uBD80: ${m.reason}`,"error",2400)}async function M(d,m){if(!r)return null;let x=r,L=await x(d,{...m,expected_revision:Q()});return B(L),L&&L.conflict&&(L=await x(d,{...m,expected_revision:Q()}),B(L)),L}async function ae(d){if(!r||!d)return;O.add(d),Le();let m;try{m=await M("worker-merge-queue-add",{bead_id:d})}finally{O.delete(d),Le()}!m||m.conflict||m.applied||ee("\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)","error",2400)}async function ve(d){if(!r)return;let m=await M("worker-merge-auto-toggle",{on:d});!m||m.conflict||ee(d?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",d?"success":"info",2400)}async function we(d){if(!r||!d)return;let m=await M("worker-merge-queue-remove",{bead_id:d});m&&!m.conflict&&!m.applied&&m.reason==="merge_active"&&ee("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ze(){await M("worker-merge-queue-remove",{all:!0})}async function D(d,m=null,x="unmerged",L=null){if(!r||!d)return;let ie=nn(d,x);if(!(typeof globalThis.confirm!="function"||globalThis.confirm(ie)))return;let oe=await r("worker-discard",{bead_id:d,...m?{attempt_id:m}:{},...L?{operation_id:L}:{},expected_revision:Q()});if(B(oe),oe&&oe.conflict&&(oe=await r("worker-discard",{bead_id:d,...m?{attempt_id:m}:{},...L?{operation_id:L}:{},expected_revision:Q()}),B(oe)),oe&&oe.discarded===!0){ee(Yn(oe),"success",5e3);return}if(oe&&oe.reason){ee(`\uD3D0\uAE30 \uC2E4\uD328: ${oe.reason}`,"error",2800);return}if(oe&&oe.accepted&&oe.pending==="merged_revert"){ee("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(oe&&oe.accepted&&!oe.discarded){ee(`\uD3D0\uAE30 \uC9C4\uD589: ${oe.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}oe&&!oe.conflict&&ee("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(d,m){if(!r||!m||E.has(m))return;E.add(m),Le();let x;try{x=await r(d,{bead_id:m,expected_revision:Q()}),B(x),x&&x.conflict&&(x=await r(d,{bead_id:m,expected_revision:Q()}),B(x))}finally{E.delete(m),Le()}if(!(!x||x.conflict)){if(x.ok){ee(d==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}ee(`\uCC98\uBD84 \uAC70\uBD80: ${x.reason||""}`,"error",3e3)}}async function P(d){if(!r)return;let m=await r("worker-queue-toggle",{on:d,expected_revision:Q()});B(m),m&&m.conflict&&await r("worker-queue-toggle",{on:d,expected_revision:Q()}).then(B)}async function te(d){if(!r||!Number.isFinite(d))return;let m=Math.max(ln,Math.floor(d)),x=await r("worker-queue-set-slots",{slots:m,expected_revision:Q()});B(x),x&&x.conflict&&await r("worker-queue-set-slots",{slots:m,expected_revision:Q()}).then(B)}async function w(d){if(!r)return;let m=await r("worker-queue-set-pr-wait-hold",{on:d,expected_revision:Q()});B(m),m&&m.conflict&&await r("worker-queue-set-pr-wait-hold",{on:d,expected_revision:Q()}).then(B)}function G(){let d=Te(),m=p?p.selectBoardColumn(sp,"ready"):[],x=p?p.selectBoardColumn(op,"blocked"):[],L=p?p.selectBoardColumn(ap,"in_progress"):[],ie=new Map;for(let k of L){let U=wp(k);if(!U)continue;let fe=ie.get(U);fe?fe.push(k):ie.set(U,[k])}let ge=k=>{let U=kn(ie.get(k)||[]);return U?U.title||U.id:null},oe=d.bead_titles||{},$e=new Map;for(let[k,U]of Object.entries(oe))typeof U=="string"&&U.length>0&&$e.set(k,U);for(let k of[...m,...x])$e.set(k.id,k.title||k.id);let Ee=d.bead_times||{},_e=new Map;for(let[k,U]of Object.entries(Ee))U&&typeof U=="object"&&_e.set(k,U);for(let k of[...m,...x])_e.set(k.id,{created_at:k.created_at,updated_at:k.updated_at});let Ne=k=>_e.get(k)||{},Qe=d.pr_wait||[],xe=d.pr_observations||{},_t=d.pr_activity||{},Tt=d.cleanup_failed||{},kt=Object.entries(Tt).map(([k,U])=>({bead_id:k,step:U&&U.step?U.step:"",reason:U&&U.reason?U.reason:"",detail:U&&typeof U.detail=="string"?U.detail:null,output_tail:U&&typeof U.output_tail=="string"&&U.output_tail?U.output_tail:void 0,log_path:U&&typeof U.log_path=="string"&&U.log_path?U.log_path:void 0,diagnosis:U&&U.diagnosis&&typeof U.diagnosis=="object"&&typeof U.diagnosis.verdict=="string"&&typeof U.diagnosis.evidence=="string"?{verdict:U.diagnosis.verdict,evidence:U.diagnosis.evidence,fix_bead_id:typeof U.diagnosis.fix_bead_id=="string"?U.diagnosis.fix_bead_id:null,malformed:U.diagnosis.malformed===!0}:null,diagnosis_pending:T.has(k)||ip(d.attempts,k)})),ot=d.queue||[],be=new Set([...ot.map(k=>k.bead_id),...Qe.map(k=>k.bead_id),...d.done.map(k=>k.bead_id)]),Ue=new Set(x.map(k=>k.id)),Rt=i?i.get()?.order||{}:{},Bt=new Set,Ht=[];for(let k of[...m,...x])be.has(k.id)||Bt.has(k.id)||kp(k)||tl(k.labels)||(Bt.add(k.id),Ht.push(k));A=yp(Ht,v,Rt);let ce=d.admission||{},b=k=>{let U=ce[k];if(!U)return"";if(U.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let fe=typeof U.reason=="string"?U.reason:"",Ye=fe.indexOf(":");return Ye>0&&Ye<fe.length-1?`\u26D4 ${fe.slice(0,Ye)} (${fe.slice(Ye+1)})`:`\u26D4 ${fe}`},W=A.map(k=>{let U=en(k),fe=U.path.length>0,Ye=k.workflow?.route==="quick_fix"||k.metadata&&k.metadata.route==="quick_fix",_n=!Ye&&fe&&!U.conflict,br=Ue.has(k.id),vr=[];br&&vr.push($p(k)),Ye?vr.push("quick_fix \xB7 \uC6CC\uCEE4 \uBE44\uB300\uC0C1"):U.conflict?vr.push("spec_id_conflict"):fe||vr.push("spec \uC5C6\uC74C");let yo=b(k.id);return yo&&vr.push(yo),{id:k.id,title:k.title||k.id,reason:vr.join(" \xB7 "),draggable:_n,lane:"candidate",created_at:k.created_at,updated_at:k.updated_at,workflow:k.workflow,is_quick_fix:Ye,status:k.status,blocked:br,has_spec:fe}}),_=dp(W,$),y=_.visible,J=d.revise_parked||{},re=d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{},K=(k,U)=>k.map(fe=>{let Ye=U==="queue"?J[fe.bead_id]:null,_n=U==="queue"?jt(re,fe.bead_id):null,br=_n?.operation?_n:null;return{id:fe.bead_id,title:$e.get(fe.bead_id)||fe.bead_id,reason:U==="done"?"":b(fe.bead_id),draggable:U!=="done"&&!br,done:U==="done",lane:U,discard:br,badges:Ye?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Ye,revise_action:!!Ye,revise_enabled:!!Ye&&!br&&!E.has(fe.bead_id),revise_title:Ye?Ye.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Ye.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:U==="done"?Lt(d.attempts||{},fe.bead_id):null,done_at:U==="done"&&typeof fe.added_at=="number"?fe.added_at:void 0,...Ne(fe.bead_id)}}),g=new Map;for(let k of d.done)k&&typeof k.bead_id=="string"&&typeof k.added_at=="number"&&g.set(k.bead_id,k.added_at);let R=d.attempts?Object.values(d.attempts):[],S=new Set;for(let k of R)k&&typeof k.resumed_from=="string"&&k.resumed_from.length>0&&S.add(k.resumed_from);let Y=new Map;for(let k of R)Y.set(k.bead_id,k.attempt_id);let Oe=new Map;for(let k of R)Oe.set(k.attempt_id,k);function et(k){let U=new Set,fe=k;for(;fe&&!U.has(fe.attempt_id);){if(fe.conflict_resolution===!0)return!0;U.add(fe.attempt_id),fe=typeof fe.resumed_from=="string"&&fe.resumed_from.length>0&&Oe.get(fe.resumed_from)||null}return!1}let it=typeof d.declared_base=="string"?d.declared_base:null;function Pe(k){let U=null;for(let fe of R)!fe||fe.bead_id!==k||et(fe)||(U===null||(typeof fe.started_at=="number"?fe.started_at:0)>=(typeof U.started_at=="number"?U.started_at:0))&&(U=fe);return U&&typeof U.target_base=="string"?U.target_base:null}let Wt=[],dn=[],yl=k=>{let U=Y.get(k.bead_id)!==k.attempt_id,fe=g.get(k.bead_id),Ye=typeof fe=="number"&&fe>0&&typeof k.finished_at=="number"&&fe>=k.finished_at;return!U&&!Ye&&typeof k.dismissed_at!="number"},ao=k=>{let U=typeof k.session_id=="string"&&k.session_id.length>0,fe=S.has(k.attempt_id);return{eligible:U&&!fe,reason:U?fe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},Ot=null;for(let k of R){let U=k.status==="paused"&&!S.has(k.attempt_id);if(k.status==="running"||U)dn.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:$e.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,paused:U,conflict_resolution:et(k),base_exception:to(it,k.target_base),can_pause:typeof k.session_id=="string"&&k.session_id.length>0,discard:jt(re,k.bead_id,{attempt_id:k.attempt_id}),usage:Lt(d.attempts||{},k.bead_id),current_child:ge(k.bead_id),...Ne(k.bead_id)});else if((k.status==="failed"||k.status==="orphaned")&&yl(k)){let fe=ao(k);Wt.push({bead_id:k.bead_id,attempt_id:k.attempt_id,title:$e.get(k.bead_id)||k.bead_id,runner:k.runner||null,model:k.model||null,effort:k.effort||null,started_at:typeof k.started_at=="number"?k.started_at:null,resumed_from:k.resumed_from||null,failed:!0,status:k.status,status_label:k.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jt(re,k.bead_id,{attempt_id:k.attempt_id}),resume_eligible:fe.eligible,resume_reason:fe.reason,conflict_resolution:et(k),base_exception:to(it,k.target_base),usage:Lt(d.attempts||{},k.bead_id),current_child:ge(k.bead_id),...Ne(k.bead_id)}),Ot=k}}let un=[...Wt,...dn],io=null;if(Ot){let k=ao(Ot),U=Ot.cause_detail;io={bead_id:Ot.bead_id,repo:Ot.repo||"",reason:Ot.cause||Ot.status,cause_detail:U&&typeof U.reason=="string"?{reason:U.reason,command:typeof U.command=="string"?U.command:null}:null,resume_attempt_id:Ot.attempt_id,resume_eligible:k.eligible,resume_reason:k.reason,discard:jt(re,Ot.bead_id,{attempt_id:Ot.attempt_id})}}let kl=new Set(un.map(k=>k.bead_id)),Xn=Array.isArray(d.merge_queue)?d.merge_queue:[],lo=new Map;Xn.forEach((k,U)=>{k&&typeof k.bead_id=="string"&&lo.set(k.bead_id,U+1)});let co=d.merge_queue_state||{active:null,failures:{}},wl=co.failures||{},$l=d.auto_merge_skips||{},uo=k=>{let U=$l[k];if(!U)return null;let fe=xe[k],Ye=fe&&fe.pr?fe.pr.head_sha:null;return Ye&&Ye===U.head_sha?U.reason||"":null},pn=new Map;for(let k of un)k.failed!==!0&&k.conflict_resolution&&(k.paused?pn.has(k.bead_id)||pn.set(k.bead_id,"paused"):pn.set(k.bead_id,"running"));let po=un.filter(k=>!k.paused&&k.failed!==!0).length,fo=(d.workspace_info||{}).slots,xl=typeof fo=="number"?fo:typeof d.slots=="number"?d.slots:ln,_o=d.pr_wait_holds_slot===!0?ln:xl,Sl=po>_o,mo=wr(N),Al=(Array.isArray(d.done)?d.done.slice():[]).filter(k=>mo===void 0||typeof k.added_at!="number"||k.added_at>=mo).sort((k,U)=>(U.added_at||0)-(k.added_at||0)),Qn=K(Al,"done"),fn={};for(let k of Vt)fn[k]=0;let go=!1,ho=0,Jn=0,bo=0;for(let k of Qn){let U=k.usage;if(U&&typeof U=="object"){let fe=!1;for(let Ye of Vt)Number.isFinite(U[Ye])&&(fn[Ye]+=U[Ye],go=!0,fe=!0);fe&&(Jn+=1,Number.isFinite(U.total_cost_usd)&&(ho+=U.total_cost_usd,bo+=1))}}Jn>0&&bo===Jn&&(fn.total_cost_usd=ho);let vo=Qn.map(k=>k.usage).filter(k=>k&&typeof k=="object"&&k.providers),Tl=vo.length>0?mt(En(vo)):go?Mt(fn):null;return{queue:d,idToTitle:$e,candidates:y,candidate_hidden:{blocked:_.hidden_blocked,spec:_.hidden_spec},running:un,live_count:po,slots:_o,over_cap:Sl,failure:io,waiting:K(ot.filter(k=>!kl.has(k.bead_id)),"queue"),pr_wait:Qe.map(k=>Cp(k.bead_id,$e.get(k.bead_id)||k.bead_id,xe,Tt[k.bead_id]||null,Lt(d.attempts||{},k.bead_id),_t[k.bead_id]||(O.has(k.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),pn.get(k.bead_id)||null,k.external===!0,{position:lo.get(k.bead_id)||0,active:co.active===k.bead_id,failure:wl[k.bead_id]||null},k.wt_present!==!1,d.auto_merge===!0?uo(k.bead_id):null,to(it,Pe(k.bead_id)),d.completion_status&&typeof d.completion_status=="object"&&!Array.isArray(d.completion_status)&&d.completion_status[k.bead_id]||null,d.discard_operations&&typeof d.discard_operations=="object"&&!Array.isArray(d.discard_operations)?d.discard_operations:{})).map(k=>({...k,...Ne(k.id)})),merge_queue_length:Xn.length,merge_queue_running:Xn.length>0,auto_excluded:Qe.map(k=>k.bead_id).filter(k=>uo(k)!==null),verify_cmd_present:!!(d.workspace_info||{}).verify_cmd,declared_base:it,done:Qn,token_total:Tl,cleanup_failures:kt}}function F(d){let m=d.waiting.length>0?d.waiting[0].id:"\u2014",x=c`<button
      type="button"
      class="worker-play${d.queue.auto_advance?" is-active":""}"
    >
      ${d.queue.auto_advance?"\u23F8 \uC77C\uC2DC\uC815\uC9C0":"\u25B6 \uC790\uB3D9 \uC9C4\uD589"}
    </button>`,L=He(d),ie=d.over_cap?c`<span
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
        >${V()} 완료 <b>${d.done.length}</b></span
      >`,oe=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${d.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${d.declared_base||"?"}</span
    >`,$e=c`<label class="worker-tgl worker-slots"
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
      </button>`,Ee=Ci({failure:d.failure,cleanupFailures:d.cleanup_failures});return ne?c`<div class="worker-ribbon">
          ${x} ${L}
          <div class="worker-kpi worker-kpi--ribbon">${ie}${ge}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${$e}</div>
          <div class="worker-kpi">${oe}</div>
        </div>
        ${Ee}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${x}${L}${$e}</div>
        <div class="worker-kpi">
          ${ie}${ge}${oe}
          ${(Array.isArray(d.token_total)?d.token_total:d.token_total?[{label:d.token_total,tooltip:`${V()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(_e=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${_e.tooltip}
                >${V()} 완료 · 누적 ${_e.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${m}</b></span
          >
        </div>
      </div>
      ${Ee}`}function Z(d){if(d.running.length===0&&d.pr_wait.length===0)return"";let m=d.running.some(x=>!x.paused&&x.failed!==!0);return c`<section
      class="worker-now${m?" worker-pane--live":""}"
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
      ${d.running.length>0?Ys(d.running,Date.now(),ke):""}
      ${d.pr_wait.map(x=>Ws(x))}
    </section>`}function le(d){let m=d.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${$.show_blocked}
        />
        🔒 blocked${m.blocked>0?` ${m.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${up.map(x=>c`<button
              type="button"
              class="worker-filter__chip${$.spec===x.value?" is-active":""}"
              data-spec=${x.value}
              aria-pressed=${$.spec===x.value?"true":"false"}
            >
              ${x.label}
            </button>`)}
        ${m.spec>0?c`<span class="worker-filter__hidden">숨김 ${m.spec}</span>`:""}
      </div>
    </div>`}function Ae(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${v}
    >
      ${pp.map(d=>c`<option value=${d.value} ?selected=${v===d.value}>
            ${d.label}
          </option>`)}
    </select>`}function Me(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${N}
      >
        ${Ut.map(d=>c`<option value=${d.value} ?selected=${N===d.value}>
              ${d.label}
            </option>`)}
      </select>
    </div>`}function Ke(d){let m=(d.queue.pr_wait||[]).filter(L=>L&&L.external!==!0&&typeof L.bead_id=="string"),x=new Set(d.running.filter(L=>!L.paused&&L.failed!==!0).map(L=>L.bead_id));for(let L of m)x.add(L.bead_id);if(!(d.queue.pr_wait_holds_slot!==!0||d.queue.auto_advance!==!0||d.queue.auto_merge===!0||m.length===0||d.waiting.length===0||x.size<d.slots))return c`<div class="worker-stat worker-pr-wait-hint">
      PR 머지 대기 중 — 다음 이슈는 머지·정리 완료 후 시작됩니다 (자동 머지
      꺼짐)
    </div>`}function He(d){let m=d.queue.auto_merge===!0;if(d.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${m?" is-active":""}"
        title=${m?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${m?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${d.merge_queue_length}
      </button>`;if(m)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let x=new Set(d.auto_excluded),L=d.pr_wait.filter(ie=>ie.merge_action&&ie.merge_enabled&&!x.has(ie.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title=${d.verify_cmd_present?"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uCF1C \uB450\uBA74 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uCDA9\uB3CC \uD574\uC18C\xB7\uBA38\uC9C0\uD569\uB2C8\uB2E4 \u2014 \uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uB294 \uAC80\uC99D \uC2E0\uD638\uAC00 \uC5C6\uC5B4 CI\xB7\uB85C\uCEEC\uAC80\uC99D \uC5C6\uC774 \uBA38\uC9C0\uB429\uB2C8\uB2E4"}
    >
      ▶ 자동 머지${L>0?` ${L}`:""}
    </button>`}function ct(d){let m=zt({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:d.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Ae(),controls:le(d)});return ne?c`<div class="worker-lanes worker-lanes--mobile">
        ${Z(d)}
        ${zt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",controls:Ke(d),collapsible:!0,collapsed:j.queue,preview:nl(d.waiting)})}
        ${m}
        ${zt({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:d.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Me(),collapsible:!0,collapsed:j.done,preview:Array.isArray(d.token_total)?d.token_total.map(x=>x.label).join(" \xB7 "):d.token_total||nl(d.done)})}
      </div>`:c`<div class="worker-lanes">
      ${m}
      ${zt({id:"worker-pane-queue",lane:"queue",title:"\uB300\uAE30",items:d.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",controls:Ke(d)})}
      ${zt({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${d.slots}`,items:d.running,live:d.running.some(x=>!x.paused&&x.failed!==!0),body:Ys(d.running,Date.now(),ke)})}
      ${zt({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:d.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${zt({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${V()} ${d.done.length}`,items:d.done,empty:`${V()} \uC644\uB8CC \uC5C6\uC74C`,controls:Me()})}
    </div>`}function at(d){j={...j,[d]:!j[d]},vp(j),Le()}function Le(){let d=G();De(F(d),de),De(ct(d),Ie)}function vt(){let d=document.querySelector(".app-header");if(!d)return;let m=()=>{let x=Math.round(d.getBoundingClientRect().height);z.style.setProperty("--worker-ribbon-top",`${x}px`)};if(m(),typeof ResizeObserver=="function"){let x=new ResizeObserver(m);x.observe(d),I.push(()=>x.disconnect())}else window.addEventListener("resize",m),I.push(()=>window.removeEventListener("resize",m))}function dt(){if(typeof window.matchMedia!="function")return;let d=window.matchMedia(hp);ne=!!d.matches;let m=x=>{let L=!!(x&&typeof x.matches=="boolean"?x.matches:d.matches);L!==ne&&(ne=L,Le())};typeof d.addEventListener=="function"?(d.addEventListener("change",m),I.push(()=>d.removeEventListener("change",m))):typeof d.addListener=="function"&&(d.addListener(m),I.push(()=>d.removeListener(m)))}function rt(d){let m=d.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!m)return;let x=m.dataset.beadId||"",L=m.dataset.lane||"";h={bead_id:x,from_lane:L};try{d.dataTransfer?.setData("text/plain",x),d.dataTransfer&&(d.dataTransfer.effectAllowed="move")}catch{}}function We(d){let m=d.target?.closest?.(".worker-pane");if(!m)return;let x=m.dataset.lane||"";x!=="candidate"&&x!=="queue"||(d.preventDefault(),d.dataTransfer&&(d.dataTransfer.dropEffect="move"),m.classList.add("worker-pane--drag-over"))}function gt(d){d.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function ut(d,m){let x=A.find(oe=>oe.id===d);if(!x)return;let L=A.filter(oe=>oe.id!==d),ie=L.length;if(m){let oe=m.dataset.beadId;if(oe===d)return;let $e=L.findIndex(Ee=>Ee.id===oe);$e>=0&&(ie=$e)}let ge=L.slice();ge.splice(ie,0,x),f.applyReorder(d,ge,ie)}function nt(d){let m=d.target?.closest?.(".worker-pane");if(!m)return;d.preventDefault(),m.classList.remove("worker-pane--drag-over");let x=m.dataset.lane||"",L=h?.bead_id||d.dataTransfer?.getData("text/plain")||"",ie=h?.from_lane||"";if(h=null,!L)return;let ge=d.target?.closest?.(".worker-mini, .worker-card"),oe=Array.from(m.querySelectorAll(".worker-mini, .worker-card")),$e=oe.length;if(ge){let Ee=oe.indexOf(ge);Ee>=0&&($e=Ee)}if(m.classList.contains("worker-pane--collapsed")&&($e=X()),x==="candidate"){if(ie==="candidate"){ut(L,ge);return}ie==="queue"&&pe(L);return}x==="queue"&&(ie==="queue"?Se(L,$e):se(L,$e))}function st(d){$=d,cp(d),Le()}function yt(d){v=d==="board"||d==="created"||d==="spec"?d:Zn,_p(v),Le()}function Je(d){N=Yt(d)?d:It,gp(N),Le()}function ht(d){let m=d.target?.closest?.(".worker-filter__blocked");if(m){st({...$,show_blocked:m.checked});return}let x=d.target?.closest?.(".worker-done-range");if(x){Je(x.value);return}let L=d.target?.closest?.(".worker-sort");if(L){yt(L.value||Zn);return}let ie=d.target?.closest?.(".worker-pr-wait-hold");if(ie){w(ie.checked);return}let ge=d.target?.closest?.(".worker-slots__input");if(!ge)return;let oe=Number.parseInt(ge.value,10);if(!Number.isFinite(oe)){Le();return}te(oe).then(Le)}function Ze(d){return d?{runner:d.runner||void 0,model:d.model||void 0,effort:d.effort||void 0,worktree:d.worktree||void 0,status:d.status||void 0,session_id:d.session_id||void 0}:{}}function pt(d){let m=Te(),x=m.attempts?m.attempts[d]:null;ke=d,ye.hidden=!1,Ge.open({attempt_id:d,meta:Ze(x)}),Le()}function ft(){if(!ke)return;let d=Te(),m=d.attempts?d.attempts[ke]:null;if(m){Ge.updateMeta(Ze(m));return}Ge.close()}function C(d){let m=d.target;if(m?.closest?.("#worker-exec-defaults-dialog"))return;if(m?.closest?.(".worker-exec-defaults-btn")){Ve.open();return}let x=m?.closest?.(".worker-banner__resume");if(x){let be=x.dataset.attemptId;be&&me(be);return}let L=m?.closest?.(".worker-banner__discard");if(L){let be=L.dataset.confirmation==="merged"?"merged":"unmerged";D(L.dataset.beadId||"",L.dataset.attemptId||null,be,L.dataset.operationId||null);return}let ie=m?.closest?.(".worker-banner__dismiss");if(ie){let be=ie.dataset.attemptId;be&&Re(be);return}let ge=m?.closest?.(".worker-banner__cleanup-diagnose");if(ge){let be=ge.dataset.beadId;be&&q(be);return}if(m?.closest?.(".worker-play")){P(!Te().auto_advance);return}let oe=m?.closest?.(".worker-merge-all");if(oe){oe.classList.contains("worker-merge-all--stop")?Te().auto_merge===!0?ve(!1):ze():ve(!0);return}let $e=m?.closest?.(".worker-pane__hd--toggle");if($e){let be=$e.dataset.lane;(be==="queue"||be==="done")&&at(be);return}let Ee=m?.closest?.(".worker-card__place");if(Ee){let be=Ee.dataset.beadId;be&&!Ee.disabled&&se(be,X());return}let _e=m?.closest?.(".worker-filter__chip");if(_e){let be=_e.dataset.spec;(be==="all"||be==="with"||be==="without")&&st({...$,spec:be});return}let Ne=m?.closest?.(".worker-mini__merge");if(Ne){ae(Ne.dataset.beadId||"");return}let Qe=m?.closest?.(".worker-mini__merge-cancel");if(Qe){we(Qe.dataset.beadId||"");return}let xe=m?.closest?.(".worker-mini__discard");if(xe){D(xe.dataset.beadId||"",xe.dataset.attemptId||null,xe.dataset.discardMode==="merged"?"merged":"unmerged",xe.dataset.operationId||null);return}let _t=m?.closest?.(".worker-mini__revise-fix");if(_t){H("worker-revise-fix",_t.dataset.beadId||"");return}let Tt=m?.closest?.(".worker-mini__revise-approve");if(Tt){H("worker-revise-approve",Tt.dataset.beadId||"");return}if(m?.closest?.(".worker-mini__pr"))return;if(m?.closest?.(".rtile__discard")){let be=m?.closest?.(".rtile"),Ue=be?.dataset?.beadId,Rt=be?.dataset?.attemptId;Ue&&D(Ue,Rt||null,"unmerged",m?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(m?.closest?.(".rtile__dismiss")){let Ue=m?.closest?.(".rtile")?.dataset?.attemptId;Ue&&Re(Ue);return}if(m?.closest?.(".rtile__pause")){let Ue=m?.closest?.(".rtile")?.dataset?.attemptId;Ue&&qe(Ue);return}if(m?.closest?.(".rtile__resume")){let Ue=m?.closest?.(".rtile")?.dataset?.attemptId;Ue&&me(Ue);return}if(m?.closest?.(".rtile__session")){let Ue=m?.closest?.(".rtile")?.dataset?.attemptId;Ue&&pt(Ue);return}if(m?.closest?.(".worker-drawer-overlay__backdrop")){Ge.close();return}if(m?.closest?.(".worker-drawer-host"))return;let kt=m?.closest?.(".rtile");if(kt){if(m?.closest?.(".rtile__id")){let Ue=kt.dataset.beadId;Ue&&_r(Ue).then(Rt=>{Rt?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let be=kt.dataset.beadId;be&&l&&l(be);return}let ot=m?.closest?.(".worker-mini, .worker-card");if(ot){let be=ot.dataset.beadId;if(m?.closest?.(".worker-mini__id, .worker-card__id")){be&&_r(be).then(Ue=>{Ue?ee("\uBCF5\uC0AC\uB428","success",1200):ee("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}be&&l&&l(be)}}return e.addEventListener("dragstart",rt),e.addEventListener("dragover",We),e.addEventListener("dragleave",gt),e.addEventListener("drop",nt),e.addEventListener("click",C),e.addEventListener("change",ht),dt(),vt(),p&&I.push(p.subscribe(Le)),s&&I.push(s.subscribe(()=>{Le(),ft()})),Le(),{load(){Le()},openExecDefaults(){Ve.open()},destroy(){for(let d of I.splice(0))try{d()}catch{}e.removeEventListener("dragstart",rt),e.removeEventListener("dragover",We),e.removeEventListener("dragleave",gt),e.removeEventListener("drop",nt),e.removeEventListener("click",C),e.removeEventListener("change",ht);try{Ge.destroy()}catch{}ye.hidden=!0;try{Ve.destroy()}catch{}De(c``,e)}}}function no(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function cl(e,t,r,n=async()=>{},s=async()=>{}){let o=Xe("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function p(T){let z=T.target.value,ye=t.getState().workspace?.current?.path||"";if(z&&z!==ye){o("switching workspace to %s",z),i=!0,E();try{await r(z)}catch(he){o("workspace switch failed: %o",he)}finally{i=!1,E()}}}async function f(){let T=t.getState(),I=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!I||l)){o("git-pulling workspace %s",I),l=!0,E();try{await n(I)}catch(z){o("workspace git pull failed: %o",z)}finally{l=!1,E()}}}function h(T){let I=T.target;I&&e.contains(I)||v()}function A(T){T.key==="Escape"&&v()}function $(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",A),E())}function v(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),E())}function N(){u?v():$()}async function V(T){let I=T.target,z=I.value,de=I.checked;o("toggling visibility %s \u2192 %s",z,String(de));try{await s(z,de)}catch(ye){o("workspace visibility toggle failed: %o",ye)}}function j(T){return T?c`
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
    `:c``}function ne(T,I){return c`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${N}
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
                ${T.map(z=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${z.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${z.path}"
                        .checked=${!I.has(z.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${no(z.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function O(){let T=t.getState(),I=T.workspace?.current,z=T.workspace?.available||[],de=new Set(T.workspace?.hidden||[]),ye=I?.path||z[0]?.path||"";if(z.length===0)return c``;let he=z.filter(ue=>!de.has(ue.path)||ue.path===ye);if(he.length<=1){let ue=he[0]||z[0],Ie=no(ue.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${ue.path}"
            >${Ie}</span
          >
          ${ne(z,de)}
          ${j(ye)}
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
          ${he.map(ue=>c`
              <option
                value="${ue.path}"
                ?selected=${ue.path===ye}
                title="${ue.path}"
              >
                ${no(ue.path)}
              </option>
            `)}
        </select>
        ${ne(z,de)}
        ${j(ye)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function E(){De(O(),e)}return E(),a=t.subscribe(()=>E()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",A),De(c``,e)}}}var dl=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-queue-set-slots","worker-queue-set-pr-wait-hold","worker-queue-set-default-exec-preset","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-exec-presets","unsubscribe-exec-presets","exec-presets-snapshot","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset","monitor-auto-toggle"];function so(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function ul(e,t,r=so()){return{id:r,type:e,payload:t}}function pl(e={}){let t=Xe("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,p=[],f=new Map,h=new Set;function A(O){for(let E of Array.from(h))try{E(O)}catch{}}function $(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),A(o);let O=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),E=(r.jitterRatio||0)*O,T=Math.max(0,Math.round(O+(Math.random()*2-1)*E));t("ws retry in %d ms (attempt %d)",T,a+1),i=setTimeout(()=>{i=null,ne()},T)}function v(O){try{s?.send(JSON.stringify(O))}catch(E){t("ws send failed",E)}}function N(){for(o="open",t("ws open"),A(o),a=0;p.length;){let O=p.shift();O&&v(O)}}function V(O){let E;try{E=JSON.parse(String(O.data))}catch{t("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){t("ws received invalid envelope");return}if(u.has(E.id)){let I=u.get(E.id);u.delete(E.id),E.ok?I?.resolve(E.payload):I?.reject(E.error||new Error("ws error"));return}let T=f.get(E.type);if(T&&T.size>0)for(let I of Array.from(T))try{I(E.payload)}catch(z){t("ws event handler error",z)}else t("ws received unhandled message type: %s",E.type)}function j(){o="closed",t("ws closed"),A(o);for(let[O,E]of u.entries())E.reject(new Error("ws disconnected")),u.delete(O);a+=1,$()}function ne(){if(!l)return;let O=n();try{s=new WebSocket(O),t("ws connecting %s",O),o="connecting",A(o),s.addEventListener("open",N),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",j)}catch(E){t("ws connect failed %o",E),$()}}return ne(),{send(O,E){if(!dl.includes(O))return Promise.reject(new Error(`unknown message type: ${O}`));let T=so(),I=ul(O,E,T);return t("send %s id=%s",O,T),new Promise((z,de)=>{u.set(T,{resolve:z,reject:de,type:O}),s&&s.readyState===s.OPEN?v(I):(t("queue %s id=%s (state=%s)",O,T,o),p.push(I))})},on(O,E){f.has(O)||f.set(O,new Set);let T=f.get(O);return T?.add(E),()=>{T?.delete(E)}},onConnection(O){return h.add(O),()=>{h.delete(O)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,ne()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Rp(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Ip(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var oo=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],fl=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"]],_l=Wi,ml="worker:queue",gl="ui:order",hl="ui:display-policy",bl="exec:presets",ir="tab:board:closed",vl="beads-ui.board.closed-range";function Lp(e){let t=Xe("main");t("bootstrap start");let r=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;De(r,e);let n=document.getElementById("top-nav"),s=document.getElementById("usage-meter"),o=document.getElementById("board-root"),a=document.getElementById("worker-root"),i=document.getElementById("monitor-root"),l=document.getElementById("detail-panel");if(s&&el(s),o&&a&&i&&l){let Te=function(_,y){let J="Request failed",re="";if(_&&typeof _=="object"){let g=_;if(typeof g.message=="string"&&g.message.length>0&&(J=g.message),typeof g.details=="string")re=g.details;else if(g.details&&typeof g.details=="object")try{re=JSON.stringify(g.details,null,2)}catch{re=""}}else typeof _=="string"&&_.length>0&&(J=_);let K=y&&y.length>0?`Failed to load ${y}`:"Request failed";Ve.open(K,J,re)},te=function(_){return`${xe.getState().workspace.current?.path||""}\0${_}`},w=function(){M&&(M().catch(()=>{}),M=null),ae=null,ve=null},F=function(_){we=_;let y=()=>{we!==_||xe.getState().selected_id!==_||(we=null,G(_))};if(!H){D.then(y);return}y()},Me=function(_,y,J,re,K){return J!==Ae[y]?(K().catch(()=>{}),!1):(_.set(re,K),!0)},Ke=function(){let _=xe.getState();at(_.view==="board"),We(_.view==="worker"),yt(_.view==="monitor"),ut(_.view==="board"||_.view==="worker"||!!_.selected_id)},ct=function(){let _=wr(He);return _===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:_}}},at=function(_){if(_)for(let[y,J]of oo){if(Z.has(y)||le.has(y))continue;let re=y===ir?ct():{type:J};try{se.register(y,re)}catch(R){t("register %s store failed: %o",y,R)}le.add(y);let K=Ae.board,g=!1;X.subscribeList(y,re).then(R=>{g=!Me(Z,"board",K,y,R)}).catch(R=>{t("subscribe %s failed: %o",y,R),Te(R,"board")}).finally(()=>{le.delete(y),g&&Ke()})}else vt()},vt=function(){Ae.board+=1;for(let[_]of oo){let y=Z.get(_);y&&(y().catch(()=>{}),Z.delete(_));try{se.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},We=function(_){if(!_){gt();return}for(let[y,J]of fl){if(dt.has(y)||le.has(y))continue;try{se.register(y,{type:J})}catch(g){t("register %s store failed: %o",y,g)}le.add(y);let re=Ae.worker,K=!1;X.subscribeList(y,{type:J}).then(g=>{K=!Me(dt,"worker",re,y,g)}).catch(g=>{t("subscribe %s failed: %o",y,g),Te(g,"worker")}).finally(()=>{le.delete(y),K&&Ke()})}},gt=function(){Ae.worker+=1;for(let[_]of fl){let y=dt.get(_);y&&(y().catch(()=>{}),dt.delete(_));try{se.unregister(_)}catch(J){t("unregister %s failed: %o",_,J)}}},ut=function(_){if(!_){nt();return}rt||(B("subscribe-worker-queue",{id:ml}).catch(y=>{t("subscribe-worker-queue failed: %o",y)}),rt=()=>B("unsubscribe-worker-queue",{id:ml}))},nt=function(){rt&&(rt().catch(()=>{}),rt=null)},yt=function(_){if(!_){Je();return}st||(B("subscribe-monitor-pipeline",{id:_l}).catch(y=>{t("subscribe-monitor-pipeline failed: %o",y)}),st=()=>B("unsubscribe-monitor-pipeline",{id:_l}))},Je=function(){st&&(st().catch(()=>{}),st=null)},Ze=function(){ht||(B("subscribe-ui-order",{id:gl}).catch(_=>{t("subscribe-ui-order failed: %o",_)}),ht=()=>B("unsubscribe-ui-order",{id:gl}))},pt=function(){ht&&(ht().catch(()=>{}),ht=null),qe.clear()},C=function(){ft||(B("subscribe-display-policy",{id:hl}).catch(_=>{t("subscribe-display-policy failed: %o",_)}),ft=()=>B("unsubscribe-display-policy",{id:hl}))},d=function(){ft&&(ft().catch(()=>{}),ft=null),me.clear()},x=function(){m||(B("subscribe-exec-presets",{id:bl}).catch(_=>{t("subscribe-exec-presets failed: %o",_)}),m=()=>B("unsubscribe-exec-presets",{id:bl}))},Ee=function(_){if(!_)return"Unknown";let y=_.split("/").filter(Boolean);return y.length>0?y[y.length-1]:"Unknown"};var u=Te,p=te,f=w,h=F,A=Me,$=Ke,v=ct,N=at,V=vt,j=We,ne=gt,O=ut,E=nt,T=yt,I=Je,z=Ze,de=pt,ye=C,he=d,ue=x,Ie=Ee;let ke=document.getElementById("header-loading"),Ge=ta(ke),Ve=xi(e),Q=pl(),B=Ge.wrapSend((_,y)=>Q.send(_,y)),X=Vo(B),se=Ko(),Se=Xo(),pe=Do(),qe=Zo(),me=Io(),Re=Lo(),q=Oo();Q.on("exec-presets-snapshot",_=>{let y=_;y&&typeof y.revision=="number"&&Array.isArray(y.presets)&&Re.set({revision:y.revision,presets:y.presets})}),Q.on("monitor-pipeline-snapshot",_=>{let y=_;if(!(!y||!Array.isArray(y.workspaces)))try{pe.set(y.workspaces,y.workspaces_state)}catch{}}),Q.on("ui-order-snapshot",_=>{let y=_;if(y&&typeof y.revision=="number")try{qe.set({revision:y.revision,order:y.order&&typeof y.order=="object"?y.order:{}})}catch{}}),Q.on("display-policy-snapshot",_=>{let y=_;if(y&&y.policy&&typeof y.policy=="object")try{me.set(y.policy)}catch{}}),Q.on("session-log-snapshot",_=>{let y=_;if(y&&typeof y.attempt_id=="string")try{q.set(y.attempt_id,Array.isArray(y.lines)?y.lines:[],typeof y.last_event_at=="number"?y.last_event_at:null)}catch{}}),Q.on("session-log-append",_=>{let y=_;if(y&&typeof y.attempt_id=="string")try{q.append(y.attempt_id,y.event)}catch{}}),Q.on("snapshot",_=>{let y=_,J=y&&typeof y.id=="string"?y.id:"",re=J?se.getStore(J):null;if(re&&y&&y.type==="snapshot")try{re.applyPush(y)}catch{}}),Q.on("upsert",_=>{let y=_,J=y&&typeof y.id=="string"?y.id:"",re=J?se.getStore(J):null;if(re&&y&&y.type==="upsert")try{re.applyPush(y)}catch{}}),Q.on("delete",_=>{let y=_,J=y&&typeof y.id=="string"?y.id:"",re=J?se.getStore(J):null;if(re&&y&&y.type==="delete")try{re.applyPush(y)}catch{}});let M=null,ae=null,ve=null,we=null,ze=()=>{},D=new Promise(_=>{ze=()=>_(void 0)}),H=!1,P=!1;async function G(_){let y=te(_);if(y===ae||y===ve)return;ve=y;let J=`detail:${_}`,re={type:"issue-detail",params:{id:_}};try{se.register(J,re)}catch(K){t("register detail store failed: %o",K)}try{let K=await X.subscribeList(J,re);if(xe.getState().selected_id!==_||te(_)!==y){await K().catch(()=>{});return}M&&await M().catch(()=>{}),M=K,ae=y}catch(K){t("detail subscribe failed: %o",K),Te(K,"issue details")}finally{ve===y&&(ve=null)}}let Z=new Map,le=new Set,Ae={board:0,worker:0},He=It;try{let _=window.localStorage.getItem(vl);Yt(_)&&(He=_)}catch{}async function Le(_){if(!Yt(_)||_===He)return;He=_;try{window.localStorage.setItem(vl,_)}catch{}let y=Z.get(ir);if(!y)return;Z.delete(ir),await y().catch(()=>{});let J=ct();try{se.register(ir,J)}catch(re){t("register %s store failed: %o",ir,re)}try{let re=await X.subscribeList(ir,J);Z.set(ir,re)}catch(re){t("re-subscribe %s failed: %o",ir,re),Te(re,"board")}}let dt=new Map,rt=null,st=null,ht=null,ft=null,m=null;async function L(){ft=null,me.clear(),m=null,Re.clear(),rt=null,st=null,Z.clear(),dt.clear(),Ae.board+=1,Ae.worker+=1,x();let _=xe.getState().workspace.current?.path;if(_)try{await Q.send("set-workspace",{path:_})}catch(J){t("workspace restore after reconnect failed: %o",J);return}C();let y=xe.getState();at(y.view==="board"),We(y.view==="worker"),yt(y.view==="monitor"),ut(y.view==="board"||y.view==="worker"||!!y.selected_id)}async function ie(){t("clearing all subscriptions for workspace switch"),vt(),gt(),nt(),Se.clear(),pt(),Ze(),d(),C(),w();let _=xe.getState();if(_.selected_id)try{se.unregister(`detail:${_.selected_id}`)}catch{}let y=xe.getState();at(y.view==="board"),We(y.view==="worker"),yt(y.view==="monitor"),ut(y.view==="board"||y.view==="worker"||!!y.selected_id),y.selected_id&&F(y.selected_id)}async function ge(_){t("requesting workspace switch to %s",_),P=!0;try{let y=await Q.send("set-workspace",{path:_});t("workspace switch result: %o",y),y&&y.workspace&&(xe.setState({workspace:{current:{path:y.workspace.root_dir,database:y.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",_),y.changed&&(await ie(),ee("Switched to "+Ee(_),"success",2e3)))}catch(y){throw t("workspace switch failed: %o",y),ee("Failed to switch workspace","error",3e3),y}finally{P=!1}}async function oe(_){t("requesting workspace git pull for %s",_);try{let y=await Q.send("git-pull-workspace",{});t("workspace git pull result: %o",y);let J=y?.status;if(J==="up_to_date"){ee("Already up to date","success",2e3);return}if(J==="stash_pop_conflict"){ee("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}ee("Git pulled "+Ee(_),"success",2e3)}catch(y){t("workspace git pull failed: %o",y);let J=y?.code,re=y?.message;if(J==="rebase_conflict"){ee("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(J==="rebase_conflict_abort_failed"){ee("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(J==="busy"){ee("Git pull skipped: another operation is running","warning",3e3);return}let K=re?`: ${re}`:"";throw ee(`Git pull failed${K}`,"error",3e3),y}}async function $e(_,y){t("setting workspace visibility %s \u2192 %s",_,String(y));try{await Q.send("set-workspace-visibility",{path:_,visible:y}),await _e()}catch(J){t("workspace visibility update failed: %o",J),ee("Failed to update project visibility","error",3e3)}}async function _e(){try{let _=await Q.send("list-workspaces",{});if(t("workspaces loaded: %o",_),_&&Array.isArray(_.workspaces)){let y=_.workspaces.map(g=>({path:g.path,database:g.database,pid:g.pid,version:g.version})),J=_.current?{path:_.current.root_dir,database:_.current.db_path}:null,re=Array.isArray(_.hidden)?_.hidden.filter(g=>typeof g=="string"):[];xe.setState({workspace:{current:J,available:y,hidden:re}});let K=window.localStorage.getItem("beads-ui.workspace");K&&(!y.some(R=>R.path===K)||re.includes(K)?window.localStorage.removeItem("beads-ui.workspace"):J&&K!==J.path&&(t("restoring saved workspace preference: %s",K),await ge(K)))}}catch(_){t("failed to load workspaces: %o",_)}}Q.on("workspace-changed",_=>{t("workspace-changed event: %o",_),_&&_.root_dir&&(xe.setState({workspace:{current:{path:_.root_dir,database:_.db_path}}}),_e(),ie())});let Ne=!1;if(typeof Q.onConnection=="function"){let _=y=>{t("ws state %s",y),y==="reconnecting"||y==="closed"?(Ne=!0,ee("Connection lost. Reconnecting\u2026","error",4e3)):y==="open"&&Ne&&(Ne=!1,ee("Reconnected","success",2200),Ip(xe,(J,re)=>{t(`${J}: %o`,re)}),L())};Q.onConnection(_)}let Qe="board";try{let _=window.localStorage.getItem("beads-ui.view");(_==="board"||_==="worker"||_==="monitor")&&(Qe=_)}catch(_){t("view parse error: %o",_)}let xe=ea({config:Rp(),view:Qe});Q.on("worker-queue-snapshot",_=>{let y=_;if(!y||!y.queue)return;let J=xe.getState().workspace.current?.path;if(typeof J=="string"&&J.length>0&&y.root_dir!==J){t("dropping worker-queue snapshot for %s",String(y.root_dir));return}try{Se.set(y.queue)}catch{}});let _t=Qo(xe);_t.start();let Tt=new Set(["get-comments","exec-preset-create","exec-preset-update","exec-preset-delete","apply-exec-preset"]),kt=async(_,y)=>{try{return await B(_,y)}catch(J){if(Tt.has(_))throw J;return[]}};n&&Yi(n,xe,_t);let ot=document.getElementById("workspace-picker");ot&&cl(ot,xe,ge,oe,$e);let be=Xi(e,(_,y)=>B(_,y));try{let _=document.getElementById("new-issue-btn");_&&_.addEventListener("click",()=>be.open())}catch{}let Ue=$i(e,{policyStore:me,transport:(_,y)=>B(_,y),labelOptions:()=>{let _=new Set;for(let[y]of oo)for(let J of se.snapshotFor(y)||[]){let re=J.labels;if(Array.isArray(re))for(let K of re)typeof K=="string"&&K.length>0&&_.add(K)}return Array.from(_).sort()}});try{let _=document.getElementById("display-settings-btn");_&&_.addEventListener("click",()=>Ue.open())}catch{}let Rt=da(o,{gotoIssue:_=>_t.gotoIssue(_),issueStores:se,transport:kt,workerQueueStore:Se,uiOrderStore:qe,displayPolicyStore:me,closedRange:He,onClosedRangeChange:_=>{Le(_)},onNewIssue:()=>be.open()}),Bt=ro(a,{transport:kt,issueStores:se,queueStore:Se,execPresetStore:Re,sessionLogStore:q,uiOrderStore:qe,gotoIssue:_=>xe.setState({selected_id:_}),getWorkspacePath:()=>xe.getState().workspace.current?.path}),Ht=Gi(i,{transport:kt,pipelineStore:pe,execPresetStore:Re,gotoIssue:_=>_t.gotoIssue(_),getWorkspacePath:()=>xe.getState().workspace.current?.path,switchWorkspace:_=>ge(_)}),ce=ki(l,{issueStores:se,transport:kt,queueStore:Se,execPresetStore:Re,sessionLogStore:q,getWorkspacePath:()=>xe.getState().workspace.current?.path,onNavigate:_=>{xe.getState().view==="worker"?xe.setState({selected_id:_}):_t.gotoIssue(_)},onClose:()=>{let _=xe.getState();xe.setState({selected_id:null});try{_t.gotoView(_.view==="worker"||_.view==="monitor"?_.view:"board")}catch{}},onOpenExecPresets:()=>{xe.setState({selected_id:null}),_t.gotoView("worker"),Bt.openExecDefaults()}}),b=xe.getState().selected_id;b&&(l.hidden=!1,ce.load(b),F(b)),xe.subscribe(_=>{let y=_.selected_id;y?(l.hidden=!1,ce.load(y),P||F(y)):(ce.clear(),l.hidden=!0,w())});let W=_=>{o.hidden=_.view!=="board",a.hidden=_.view!=="worker",i.hidden=_.view!=="monitor",at(_.view==="board"),We(_.view==="worker"),yt(_.view==="monitor"),ut(_.view==="board"||_.view==="worker"||!!_.selected_id),!_.selected_id&&_.view==="board"&&Rt.load(),_.view==="worker"&&Bt.load(),_.view==="monitor"?Ht.load():Ht.pause(),window.localStorage.setItem("beads-ui.view",_.view)};xe.subscribe(W),W(xe.getState()),Ze(),C(),x(),_e().finally(()=>{H=!0,ze()}),window.addEventListener("keydown",_=>{let y=_.ctrlKey||_.metaKey,J=String(_.key||"").toLowerCase(),re=_.target,K=re&&re.tagName?String(re.tagName).toLowerCase():"",g=K==="input"||K==="textarea"||K==="select"||re&&typeof re.isContentEditable=="boolean"&&re.isContentEditable;y&&J==="n"&&(g||(_.preventDefault(),be.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&Lp(t)});export{Lp as bootstrap,Rp as readBootstrapConfig,Ip as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
