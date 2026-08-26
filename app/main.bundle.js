var f_=Object.create;var Ha=Object.defineProperty;var __=Object.getOwnPropertyDescriptor;var m_=Object.getOwnPropertyNames;var g_=Object.getPrototypeOf,b_=Object.prototype.hasOwnProperty;var h_=(e,t,n)=>t in e?Ha(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ga=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var y_=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of m_(t))!b_.call(e,s)&&s!==n&&Ha(e,s,{get:()=>t[s],enumerable:!(r=__(t,s))||r.enumerable});return e};var v_=(e,t,n)=>(n=e!=null?f_(g_(e)):{},y_(t||!e||!e.__esModule?Ha(n,"default",{value:e,enumerable:!0}):n,e));var Nt=(e,t,n)=>h_(e,typeof t!="symbol"?t+"":t,n);var xc=Ga((Wv,$c)=>{var Dr=1e3,Nr=Dr*60,qr=Nr*60,vr=qr*24,$_=vr*7,x_=vr*365.25;$c.exports=function(e,t){t=t||{};var n=typeof e;if(n==="string"&&e.length>0)return A_(e);if(n==="number"&&isFinite(e))return t.long?E_(e):S_(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function A_(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"yrs":case"yr":case"y":return n*x_;case"weeks":case"week":case"w":return n*$_;case"days":case"day":case"d":return n*vr;case"hours":case"hour":case"hrs":case"hr":case"h":return n*qr;case"minutes":case"minute":case"mins":case"min":case"m":return n*Nr;case"seconds":case"second":case"secs":case"sec":case"s":return n*Dr;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function S_(e){var t=Math.abs(e);return t>=vr?Math.round(e/vr)+"d":t>=qr?Math.round(e/qr)+"h":t>=Nr?Math.round(e/Nr)+"m":t>=Dr?Math.round(e/Dr)+"s":e+"ms"}function E_(e){var t=Math.abs(e);return t>=vr?mo(e,t,vr,"day"):t>=qr?mo(e,t,qr,"hour"):t>=Nr?mo(e,t,Nr,"minute"):t>=Dr?mo(e,t,Dr,"second"):e+" ms"}function mo(e,t,n,r){var s=t>=n*1.5;return Math.round(e/n)+" "+r+(s?"s":"")}});var Sc=Ga((zv,Ac)=>{function T_(e){n.debug=n,n.default=n,n.coerce=l,n.disable=a,n.enable=s,n.enabled=i,n.humanize=xc(),n.destroy=u,Object.keys(e).forEach(d=>{n[d]=e[d]}),n.names=[],n.skips=[],n.formatters={};function t(d){let _=0;for(let h=0;h<d.length;h++)_=(_<<5)-_+d.charCodeAt(h),_|=0;return n.colors[Math.abs(_)%n.colors.length]}n.selectColor=t;function n(d){let _,h=null,b,k;function D(...B){if(!D.enabled)return;let Y=D,le=Number(new Date),K=le-(_||le);Y.diff=K,Y.prev=_,Y.curr=le,_=le,B[0]=n.coerce(B[0]),typeof B[0]!="string"&&B.unshift("%O");let N=0;B[0]=B[0].replace(/%([a-zA-Z%])/g,(G,L)=>{if(G==="%%")return"%";N++;let I=n.formatters[L];if(typeof I=="function"){let te=B[N];G=I.call(Y,te),B.splice(N,1),N--}return G}),n.formatArgs.call(Y,B),(Y.log||n.log).apply(Y,B)}return D.namespace=d,D.useColors=n.useColors(),D.color=n.selectColor(d),D.extend=r,D.destroy=n.destroy,Object.defineProperty(D,"enabled",{enumerable:!0,configurable:!1,get:()=>h!==null?h:(b!==n.namespaces&&(b=n.namespaces,k=n.enabled(d)),k),set:B=>{h=B}}),typeof n.init=="function"&&n.init(D),D}function r(d,_){let h=n(this.namespace+(typeof _>"u"?":":_)+d);return h.log=this.log,h}function s(d){n.save(d),n.namespaces=d,n.names=[],n.skips=[];let _=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let h of _)h[0]==="-"?n.skips.push(h.slice(1)):n.names.push(h)}function o(d,_){let h=0,b=0,k=-1,D=0;for(;h<d.length;)if(b<_.length&&(_[b]===d[h]||_[b]==="*"))_[b]==="*"?(k=b,D=h,b++):(h++,b++);else if(k!==-1)b=k+1,D++,h=D;else return!1;for(;b<_.length&&_[b]==="*";)b++;return b===_.length}function a(){let d=[...n.names,...n.skips.map(_=>"-"+_)].join(",");return n.enable(""),d}function i(d){for(let _ of n.skips)if(o(d,_))return!1;for(let _ of n.names)if(o(d,_))return!0;return!1}function l(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return n.enable(n.load()),n}Ac.exports=T_});var Ec=Ga((bn,go)=>{bn.formatArgs=R_;bn.save=O_;bn.load=L_;bn.useColors=C_;bn.storage=I_();bn.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();bn.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function C_(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function R_(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+go.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let n=0,r=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(n++,s==="%c"&&(r=n))}),e.splice(r,0,t)}bn.log=console.debug||console.log||(()=>{});function O_(e){try{e?bn.storage.setItem("debug",e):bn.storage.removeItem("debug")}catch{}}function L_(){let e;try{e=bn.storage.getItem("debug")||bn.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function I_(){try{return localStorage}catch{}}go.exports=Sc()(bn);var{formatters:P_}=go.exports;P_.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var ss=globalThis,io=ss.trustedTypes,ic=io?io.createPolicy("lit-html",{createHTML:e=>e}):void 0,Va="$lit$",Kn=`lit$${Math.random().toFixed(9).slice(2)}$`,Ya="?"+Kn,w_=`<${Ya}>`,gr=document,os=()=>gr.createComment(""),as=e=>e===null||typeof e!="object"&&typeof e!="function",Za=Array.isArray,fc=e=>Za(e)||typeof e?.[Symbol.iterator]=="function",Ka=`[ 	
\f\r]`,rs=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lc=/-->/g,cc=/>/g,_r=RegExp(`>|${Ka}(?:([^\\s"'>=/]+)(${Ka}*=${Ka}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),uc=/'/g,dc=/"/g,_c=/^(?:script|style|textarea|title)$/i,Qa=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),c=Qa(1),ls=Qa(2),Dv=Qa(3),Cn=Symbol.for("lit-noChange"),Zt=Symbol.for("lit-nothing"),pc=new WeakMap,mr=gr.createTreeWalker(gr,129);function mc(e,t){if(!Za(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ic!==void 0?ic.createHTML(t):t}var gc=(e,t)=>{let n=e.length-1,r=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=rs;for(let i=0;i<n;i++){let l=e[i],u,d,_=-1,h=0;for(;h<l.length&&(a.lastIndex=h,d=a.exec(l),d!==null);)h=a.lastIndex,a===rs?d[1]==="!--"?a=lc:d[1]!==void 0?a=cc:d[2]!==void 0?(_c.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=_r):d[3]!==void 0&&(a=_r):a===_r?d[0]===">"?(a=s??rs,_=-1):d[1]===void 0?_=-2:(_=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?_r:d[3]==='"'?dc:uc):a===dc||a===uc?a=_r:a===lc||a===cc?a=rs:(a=_r,s=void 0);let b=a===_r&&e[i+1].startsWith("/>")?" ":"";o+=a===rs?l+w_:_>=0?(r.push(u),l.slice(0,_)+Va+l.slice(_)+Kn+b):l+Kn+(_===-2?i:b)}return[mc(e,o+(e[n]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},is=class e{constructor({strings:t,_$litType$:n},r){let s;this.parts=[];let o=0,a=0,i=t.length-1,l=this.parts,[u,d]=gc(t,n);if(this.el=e.createElement(u,r),mr.currentNode=this.el.content,n===2||n===3){let _=this.el.content.firstChild;_.replaceWith(..._.childNodes)}for(;(s=mr.nextNode())!==null&&l.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let _ of s.getAttributeNames())if(_.endsWith(Va)){let h=d[a++],b=s.getAttribute(_).split(Kn),k=/([.?@])?(.*)/.exec(h);l.push({type:1,index:o,name:k[2],strings:b,ctor:k[1]==="."?co:k[1]==="?"?uo:k[1]==="@"?po:hr}),s.removeAttribute(_)}else _.startsWith(Kn)&&(l.push({type:6,index:o}),s.removeAttribute(_));if(_c.test(s.tagName)){let _=s.textContent.split(Kn),h=_.length-1;if(h>0){s.textContent=io?io.emptyScript:"";for(let b=0;b<h;b++)s.append(_[b],os()),mr.nextNode(),l.push({type:2,index:++o});s.append(_[h],os())}}}else if(s.nodeType===8)if(s.data===Ya)l.push({type:2,index:o});else{let _=-1;for(;(_=s.data.indexOf(Kn,_+1))!==-1;)l.push({type:7,index:o}),_+=Kn.length-1}o++}}static createElement(t,n){let r=gr.createElement("template");return r.innerHTML=t,r}};function br(e,t,n=e,r){if(t===Cn)return t;let s=r!==void 0?n._$Co?.[r]:n._$Cl,o=as(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(t=br(e,s._$AS(e,t.values),s,r)),t}var lo=class{constructor(t,n){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:n},parts:r}=this._$AD,s=(t?.creationScope??gr).importNode(n,!0);mr.currentNode=s;let o=mr.nextNode(),a=0,i=0,l=r[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new Pr(o,o.nextSibling,this,t):l.type===1?u=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(u=new fo(o,this,t)),this._$AV.push(u),l=r[++i]}a!==l?.index&&(o=mr.nextNode(),a++)}return mr.currentNode=gr,s}p(t){let n=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,n),n+=r.strings.length-2):r._$AI(t[n])),n++}},Pr=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,n,r,s){this.type=2,this._$AH=Zt,this._$AN=void 0,this._$AA=t,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,n=this._$AM;return n!==void 0&&t?.nodeType===11&&(t=n.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,n=this){t=br(this,t,n),as(t)?t===Zt||t==null||t===""?(this._$AH!==Zt&&this._$AR(),this._$AH=Zt):t!==this._$AH&&t!==Cn&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):fc(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Zt&&as(this._$AH)?this._$AA.nextSibling.data=t:this.T(gr.createTextNode(t)),this._$AH=t}$(t){let{values:n,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=is.createElement(mc(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(n);else{let o=new lo(s,this),a=o.u(this.options);o.p(n),this.T(a),this._$AH=o}}_$AC(t){let n=pc.get(t.strings);return n===void 0&&pc.set(t.strings,n=new is(t)),n}k(t){Za(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,s=0;for(let o of t)s===n.length?n.push(r=new e(this.O(os()),this.O(os()),this,this.options)):r=n[s],r._$AI(o),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(t=this._$AA.nextSibling,n){for(this._$AP?.(!1,!0,n);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},hr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,n,r,s,o){this.type=1,this._$AH=Zt,this._$AN=void 0,this.element=t,this.name=n,this._$AM=s,this.options=o,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Zt}_$AI(t,n=this,r,s){let o=this.strings,a=!1;if(o===void 0)t=br(this,t,n,0),a=!as(t)||t!==this._$AH&&t!==Cn,a&&(this._$AH=t);else{let i=t,l,u;for(t=o[0],l=0;l<o.length-1;l++)u=br(this,i[r+l],n,l),u===Cn&&(u=this._$AH[l]),a||(a=!as(u)||u!==this._$AH[l]),u===Zt?t=Zt:t!==Zt&&(t+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!s&&this.j(t)}j(t){t===Zt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},co=class extends hr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Zt?void 0:t}},uo=class extends hr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Zt)}},po=class extends hr{constructor(t,n,r,s,o){super(t,n,r,s,o),this.type=5}_$AI(t,n=this){if((t=br(this,t,n,0)??Zt)===Cn)return;let r=this._$AH,s=t===Zt&&r!==Zt||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==Zt&&(r===Zt||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},fo=class{constructor(t,n,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){br(this,t)}},bc={M:Va,P:Kn,A:Ya,C:1,L:gc,R:lo,D:fc,V:br,I:Pr,H:hr,N:uo,U:po,B:co,F:fo},k_=ss.litHtmlPolyfillSupport;k_?.(is,Pr),(ss.litHtmlVersions??(ss.litHtmlVersions=[])).push("3.3.1");var at=(e,t,n)=>{let r=n?.renderBefore??t,s=r._$litPart$;if(s===void 0){let o=n?.renderBefore??null;r._$litPart$=s=new Pr(t.insertBefore(os(),o),o,void 0,n??{})}return s._$AI(e),s};var _o="today",hc=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}],Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"}];function Un(e){return e==="today"?"today":"7d"}function Xa(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function yr(e,t=Date.now()){switch(e){case"today":{let n=new Date(t);return n.setHours(0,0,0,0),n.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function yc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function vc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function wc(){let e=null,t=[],n,r=new Set;function s(){for(let o of Array.from(r))try{o()}catch{}}return{get(){return e},getWorkspacesState(){return t},crossLanes(){return n},set(o,a,i){e=Array.isArray(o)?o:null,t=Array.isArray(a)?a:[],n=i===void 0?void 0:i!==null&&typeof i=="object"&&typeof i.revision=="number"&&Array.isArray(i.lanes)?{revision:i.revision,lanes:i.lanes}:null,s()},clear(){e=null,t=[],n=void 0,s()},subscribe(o){return r.add(o),()=>r.delete(o)}}}function kc(){let e=new Map,t=new Set;function n(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function r(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(n(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),r()},append(s,o){let a=n(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),r()},get(s){return e.get(n(s))||null},clear(s){typeof s=="string"?e.delete(n(s)):e.clear(),r()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var Tc=v_(Ec(),1);function Gt(e){return(0,Tc.default)(`beads-ui:${e}`)}function Pn(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function wr(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Oc(e,t){let n=Pn(e.created_at),r=Pn(t.created_at);if(n!==r)return n<r?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function bo(e,t){let n=Pn(e.updated_at),r=Pn(t.updated_at);if(n!==r)return n<r?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function Lc(e,t){let n=e.priority??2,r=t.priority??2;if(n!==r)return n-r;let s=Pn(e.created_at),o=Pn(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function Ic(e,t){let n=e.closed_at??0,r=t.closed_at??0;if(n!==r)return n<r?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var M_=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function Cc(e){let t=e&&e.metadata,n=t?t.task_order:void 0;if(n==null||n==="")return Number.POSITIVE_INFINITY;let r=Number(n);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Rc(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let n=M_.exec(t);if(!n)return Number.POSITIVE_INFINITY;let r=Number(n[1]);return Number.isFinite(r)?r:Number.POSITIVE_INFINITY}function Pc(e,t){let n=Cc(e),r=Cc(t);if(n!==r)return n<r?-1:1;let s=Rc(e),o=Rc(t);if(s!==o)return s<o?-1:1;let a=Pn(e&&e.created_at),i=Pn(t&&t.created_at);if(a!==i)return a<i?-1:1;let l=e&&e.id,u=t&&t.id;return l===u?0:String(l)<String(u)?-1:1}var Ja=2**20;function Fr(e,t){let n=e&&e.id;return t&&typeof n=="string"&&Object.prototype.hasOwnProperty.call(t,n)&&typeof t[n]=="number"&&Number.isFinite(t[n])?t[n]:-Pn(e&&e.created_at)}function ho(e){return(t,n)=>{let r=Fr(t,e),s=Fr(n,e);if(r!==s)return r<s?-1:1;let o=t?.id,a=n?.id;return o<a?-1:o>a?1:0}}function ei(e,t,n){let r=Array.isArray(e)?e:[],s=r.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?r[o-1]:null,i=o+1<s?r[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:Fr(i,n)-Ja};if(!i)return{rank:Fr(a,n)+Ja};let l=Fr(a,n),u=Fr(i,n),d=(l+u)/2;return l<d&&d<u?{rank:d}:{renormalize:r.map((_,h)=>({bead_id:_.id,rank:h*Ja}))}}function ti(e,t={}){let n=Gt(`issue-store:${e}`),r=new Map,s=[],o=0,a=new Set,i=!1,l=t.sort||wr;function u(){for(let h of Array.from(a))try{h()}catch{}}function d(){s=Array.from(r.values()).sort(l)}function _(h){if(i||!h||h.id!==e)return;let b=Number(h.revision)||0;if(n("apply %s rev=%d",h.type,b),!(b<=o&&h.type!=="snapshot")){if(h.type==="snapshot"){if(b<=o)return;r.clear();let k=Array.isArray(h.issues)?h.issues:[];for(let D of k)D&&typeof D.id=="string"&&D.id.length>0&&r.set(D.id,D);d(),o=b,u();return}if(h.type==="upsert"){let k=h.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let D=r.get(k.id);if(!D)r.set(k.id,k);else{let B=Number.isFinite(D.updated_at)?D.updated_at:0,Y=Number.isFinite(k.updated_at)?k.updated_at:0;if(B<=Y){for(let le of Object.keys(D))le in k||delete D[le];for(let[le,K]of Object.entries(k))D[le]=K}}d()}o=b,u()}else if(h.type==="delete"){let k=String(h.issue_id||"");k&&(r.delete(k),d()),o=b,u()}}}return{id:e,subscribe(h){return a.add(h),()=>{a.delete(h)}},applyPush:_,snapshot(){return s},size(){return r.size},getById(h){return r.get(h)},dispose(){i=!0,r.clear(),s=[],a.clear(),o=0}}}function yo(e){let t=String(e.type||"").trim(),n={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];n[o]=String(a)}}let r=new URLSearchParams(n).toString();return r.length>0?`${t}?${r}`:t}function Mc(e){let t=Gt("subs"),n=new Map,r=new Map;function s(i,l){t("applyDelta %s +%d ~%d -%d",i,(l.added||[]).length,(l.updated||[]).length,(l.removed||[]).length);let u=r.get(i);if(!u||u.size===0)return;let d=Array.isArray(l.added)?l.added:[],_=Array.isArray(l.updated)?l.updated:[],h=Array.isArray(l.removed)?l.removed:[];for(let b of Array.from(u)){let k=n.get(b);if(!k)continue;let D=k.itemsById;for(let B of d)typeof B=="string"&&B.length>0&&D.set(B,!0);for(let B of _)typeof B=="string"&&B.length>0&&D.set(B,!0);for(let B of h)typeof B=="string"&&B.length>0&&D.delete(B)}}async function o(i,l){let u=yo(l);if(t("subscribe %s key=%s",i,u),!n.has(i))n.set(i,{key:u,itemsById:new Map});else{let _=n.get(i);if(_&&_.key!==u){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key)),n.set(i,{key:u,itemsById:new Map})}}r.has(u)||r.set(u,new Set);let d=r.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:l.type,params:l.params})}catch(_){let h=n.get(i)||null;if(h){let b=r.get(h.key);b&&(b.delete(i),b.size===0&&r.delete(h.key))}throw n.delete(i),_}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let _=n.get(i)||null;if(_){let h=r.get(_.key);h&&(h.delete(i),h.size===0&&r.delete(_.key))}n.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:yo,selectors:{getIds(i){let l=n.get(i);return l?Array.from(l.itemsById.keys()):[]},has(i,l){let u=n.get(i);return u?u.itemsById.has(l):!1},count(i){let l=n.get(i);return l?l.itemsById.size:0},getItemsById(i){let l=n.get(i),u={};if(!l)return u;for(let d of l.itemsById.keys())u[d]=!0;return u}}}}function Dc(){let e=Gt("issue-stores"),t=new Map,n=new Map,r=new Set,s=new Map;function o(){for(let l of Array.from(r))try{l()}catch{}}function a(l,u,d){let _=u?yo(u):"",h=n.get(l)||"",b=t.has(l);if(e("register %s key=%s (prev=%s)",l,_,h),b&&h&&_&&h!==_){let k=t.get(l);if(k)try{k.dispose()}catch{}let D=s.get(l);if(D){try{D()}catch{}s.delete(l)}let B=ti(l,d);t.set(l,B);let Y=B.subscribe(()=>o());s.set(l,Y)}else if(!b){let k=ti(l,d);t.set(l,k);let D=k.subscribe(()=>o());s.set(l,D)}return n.set(l,_),()=>i(l)}function i(l){e("unregister %s",l),n.delete(l);let u=t.get(l);u&&(u.dispose(),t.delete(l));let d=s.get(l);if(d){try{d()}catch{}s.delete(l)}}return{register:a,unregister:i,getStore(l){return t.get(l)||null},snapshotFor(l){let u=t.get(l);return u?u.snapshot().slice():[]},subscribe(l){return r.add(l),()=>r.delete(l)}}}function Nc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function qc(){let e=null,t=!1,n=new Set;function r(){for(let s of Array.from(n))try{s()}catch{}}return{get(){return e},set(s){e=s,r()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,r())},clear(){e=null,t=!1,r()},subscribe(s){return n.add(s),()=>n.delete(s)}}}function Fc(){let e=null,t=new Set;function n(){for(let r of Array.from(t))try{r()}catch{}}return{get(){return e},set(r){e=r,n()},clear(){e=null,n()},subscribe(r){return t.add(r),()=>t.delete(r)}}}function ni(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function D_(e){let t=String(e||""),n=t.startsWith("#")?t.slice(1):t,r=n.indexOf("?"),s=r>=0?n.slice(r+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(n);return o&&o[1]?decodeURIComponent(o[1]):null}function N_(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function jc(e){let t=Gt("router"),n=()=>{let r=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(r),o=s&&s[1]?decodeURIComponent(s[1]):D_(r),a=N_(r);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(r)){let l=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==l&&(window.location.hash=l)}};return{start(){window.addEventListener("hashchange",n),n()},stop(){window.removeEventListener("hashchange",n)},gotoIssue(r){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=ni(o,r);t("goto issue %s (view=%s)",r,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:r,view:o,worker:{selected_parent_id:o==="worker"?r:null}})},gotoView(r){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=r==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?ni(r,o):`#/${r}`;t("goto view %s (id=%s)",r,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:r,selected_id:r==="worker"?null:s.selected_id})}}}var q_=Object.freeze({workspace_config:{default_workspace:null}});function Bc(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:q_.workspace_config.default_workspace}}}function Uc(e={}){let t=Gt("state"),n={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Bc(e.config)},r=new Set;function s(){for(let o of Array.from(r))try{o(n)}catch{}}return{getState(){return n},setState(o){let a={...n,...o,filters:{...n.filters,...o.filters||{}},board:{...n.board,...o.board||{}},worker:{...n.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:n.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:n.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:n.workspace.hidden},config:o.config!==void 0?Bc(o.config):n.config},i=a.workspace.current?.path!==n.workspace.current?.path||a.workspace.available.length!==n.workspace.available.length||a.workspace.hidden.length!==n.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==n.workspace.hidden[d]),l=a.config.workspace_config.default_workspace!==n.config.workspace_config.default_workspace;a.selected_id===n.selected_id&&a.view===n.view&&a.filters.status===n.filters.status&&a.filters.search===n.filters.search&&a.filters.type===n.filters.type&&a.board.closed_filter===n.board.closed_filter&&a.worker.selected_parent_id===n.worker.selected_parent_id&&a.worker.show_closed_children.length===n.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===n.worker.show_closed_children[d])&&!i&&!l||(n=a,t("state change %o",{selected_id:n.selected_id,view:n.view,filters:n.filters,board:n.board,worker:n.worker,workspace:n.workspace.current?.path,config:{default_workspace:n.config.workspace_config.default_workspace}}),s())},subscribe(o){return r.add(o),()=>r.delete(o)}}}function Wc(e){let t=Gt("activity"),n=0,r=new Map,s=1;function o(){if(!e)return;let u=n>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){n+=1,t("start count=%d",n),o()}function i(){let u=n;n=Math.max(0,n-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,n),o()}function l(u){return async(_,h)=>{let b=s++,k=Date.now();r.set(b,{type:_,start_ts:k}),t("request start id=%d type=%s count=%d",b,_,n+1),a();let D=!1,B=()=>{D||(D=!0,r.delete(b),i())},Y=setTimeout(()=>{D||(t("request TIMEOUT id=%d type=%s elapsed=%dms",b,_,Date.now()-k),B())},3e4);try{let le=await u(_,h),K=Date.now()-k;return t("request done id=%d type=%s elapsed=%dms",b,_,K),le}catch(le){let K=Date.now()-k;throw t("request error id=%d type=%s elapsed=%dms err=%o",b,_,K,le),le}finally{clearTimeout(Y),B()}}}return o(),{wrapSend:l,start:a,done:i,getCount:()=>n,getActiveRequests:()=>{let u=Date.now();return Array.from(r.entries()).map(([d,_])=>({id:d,type:_.type,elapsed_ms:u-_.start_ts}))}}}function de(e,t="info",n=2800){let r=document.createElement("div");r.className="toast",r.textContent=e,r.style.position="fixed",r.style.right="12px",r.style.bottom="12px",r.style.zIndex="1000",r.style.color="#fff",r.style.padding="8px 10px",r.style.borderRadius="4px",r.style.fontSize="12px",t==="success"?r.style.background="#156d36":t==="warning"?r.style.background="#a36a00":t==="error"?r.style.background="#9f2011":r.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(r),setTimeout(()=>{try{r.remove()}catch{}},n)}function vo(e=void 0,t=void 0){function n(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function r(o,a,i){let l=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return l.sort(Ic),l;switch(i){case"created_desc":return l.sort(wr),l;case"created_asc":return l.sort(Oc),l;case"updated_desc":return l.sort(bo),l;case"priority":return l.sort(Lc),l;case"manual":default:{let u=n();return u?l.sort(ho(u)):l.sort(wr),l}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:r,subscribe:s}}function Wn(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function cn(e){let t=Wn(e);if(t===null)return"";let n=new Date(t),r=s=>String(s).padStart(2,"0");return`${n.getFullYear()}-${r(n.getMonth()+1)}-${r(n.getDate())} ${r(n.getHours())}:${r(n.getMinutes())}`}function hn(e,t){let n=Wn(e);if(n===null)return"";let s=(typeof t=="number"?t:Date.now())-n;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let l=Math.floor(i/7);if(i<30)return`${l}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function zc(e){if(!Array.isArray(e))return null;let t=null,n=-1;for(let r of e){if(!r||r.status!=="in_progress")continue;let s=Wn(r.updated_at)??0;if(t===null||s>n){t=r,n=s;continue}s===n&&String(r.id)<String(t.id)&&(t=r)}return t}function wo(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function ko(e){let t=new Map;for(let r of e)r&&r.id&&!t.has(r.id)&&t.set(r.id,r);let n=new Map;for(let r of t.values()){let s=wo(r);if(!s)continue;let o=n.get(s);o||(o=[],n.set(s,o)),o.push({id:r.id,title:r.title,status:r.status,metadata:r.metadata,workflow:r.workflow,created_at:r.created_at,updated_at:r.updated_at})}return n}function $o(e,t){let n=e.get(t)||[],r=0;for(let o of n)(o.status==="resolved"||o.status==="closed")&&(r+=1);let s=zc(n);return{total:n.length,count:r,current:s,children:n}}function xo(e){let t=e.transport,n=e.uiOrderStore;function r(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let l={...a.order};for(let u of i)l[u.bead_id]=u.rank;n&&n.set({revision:a.revision,order:l})}async function o(a,i,l){if(!t||!n)return;let u=n.get()||{revision:0,order:{}},d=r(ei(i,l,u.order),a);s(u,d);let _=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(_&&_.conflict){let h={revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}};n.set(h);let b=r(ei(i,l,h.order),a);s(h,b);let k=await t("ui-order-set",{expected_revision:h.revision,entries:b});k&&k.applied&&n.set({revision:typeof k.revision=="number"?k.revision:0,order:k.order||{}})}else _&&_.applied&&n.set({revision:typeof _.revision=="number"?_.revision:0,order:_.order||{}})}return{applyReorder:o}}function Hc(e){if(typeof e!="string")return"";let t=e.indexOf("-");return t>0?e.slice(0,t):""}function Ao(e,t){let n=Hc(e),r=Hc(t);return n.length===0||r.length===0?!1:n!==r}function So(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function ri(e,t){return!t||typeof e!="string"||e.length===0||So(t.visible_labels).includes(e)?!0:So(t.hidden_labels).includes(e)?!1:!So(t.hidden_prefixes).some(n=>n.length>0&&e.startsWith(n))}function Gc(e,t){return So(e).filter(n=>ri(n,t))}function sr(e,t){let n=e&&e.chips?e.chips[t]:void 0;return typeof n=="boolean"?n:!0}function F_(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function j_(e,t,n,r,s){return c`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${r?"true":"false"}
    @click=${s}
  >
    children ${t}/${n} ${r?"\u25B4":"\u25BE"}
  </button>`}function B_(e,t,n,r){return c`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${r?s=>r(s,e.id):void 0}
  >
    <span class=${F_(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${n}
  </button>`}function Eo(e,t){let n=e.total||0,r=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(n===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=n>0?a.slice().sort(Pc):a;return c`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${n>0?j_(t.parent_id,e.count,n,r,t.onToggle):c`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${n>0&&e.current?c`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${r&&n>0?c`<div class="board-card__roll-list">
            ${i.map((l,u)=>B_(l,u+1,t.childChips?t.childChips(l):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var U_={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Vc={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Kc={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},W_={review:"\u2713",skip:"\u2298"},or={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function z_(e,t,n){if(!(n==="in_progress"||n==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Yc(e){let t=e&&e.fill||"none";return t==="none"?or.none:e&&e.stale===!0?or.stale:t==="dim"?or.dim:e&&e.glyph==="review"?or.review:e&&e.glyph==="skip"?or.skip:or.done}function H_(e){if(!e||e.fill==="none"||!e.approval_state)return Yc(e);let t=[];return e.glyph==="review"?t.push(or.review):e.glyph==="skip"&&t.push(or.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function G_(e,t,n,r){let s=U_[e]||e,o=t&&t.fill||"none",a=!!t&&t.stale===!0,i=W_[t&&t.glyph||""]||"",l="bar";o==="dim"?l+=` b-${s} dim`:o==="full"&&(l+=` b-${s} full`),a&&(l+=" stale"),n&&(l+=" cur");let u=o==="none"?"lbl":`lbl l-${s} on`,d=n?`color: var(--stage-${s}-on)`:"",_=Vc[e]||e,h=r?Zc(t):null;if(!h)return c`
      <div class="seg">
        <div class=${l} style=${d}>${i}</div>
        <div class=${u}>${_}</div>
      </div>
    `;let b=`${_} \uBB38\uC11C \uC5F4\uAE30 \xB7 ${h.path}`;return c`
    <button
      type="button"
      class="seg seg--doc"
      aria-label=${b}
      title=${b}
      @click=${k=>{k.preventDefault(),k.stopPropagation(),r(k,h,e)}}
    >
      <div class=${l} style=${d}>${i}</div>
      <div class=${u}>${_}</div>
    </button>
  `}function Zc(e){let t=e?e.doc:null;return!t||typeof t.path!="string"||t.path.length===0?null:t}function To(e,t,n={}){if(!e||!e.stages)return"";let r=n.onOpenDoc,s=Kc[e.route]||Kc.spec_backed,o=e.stages,a=z_(s,o,String(t||"open")),i=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${s.map(u=>`${Vc[u]||u} ${u==="plan"?H_(o[u]||{}):Yc(o[u]||{})}`).join(" \xB7 ")}`,l=!!r&&s.some(u=>Zc(o[u]||{})!==null);return c`
    <div
      class="stp"
      role=${l?"group":"img"}
      aria-label=${i}
    >
      ${s.map(u=>G_(u,o[u]||{},u===a,r))}
    </div>
  `}function K_(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Qc=2;function Xc(e){let t=e.slice(0,Qc).join(", "),n=e.length-Qc;return`\u26D3 blocked: ${t}${n>0?` +${n}`:""}`}function V_(e,t){if(!t)return[];let n=[];if(t.external){let a=t.reason?`\u23F8 blocked: ${t.reason}`:"\u23F8 blocked";n.push(c`<span class="ctl-chip ctl-chip--blocked">${a}</span>`)}let r=Array.isArray(t.blockers)?t.blockers:[],s=[],o=[];for(let a of r)(Ao(e,a)?o:s).push(a);return s.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-dep"
        >${Xc(s)}</span
      >`),o.length>0&&n.push(c`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${Xc(o)}</span
      >`),n}function si(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Co(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function Vn(e){return`${e.kind}:${Co(e)}@${e.sha}`}function Ro(e,t){if(!e)return null;let n=si(e.kind),r=e.reason,s=e.kind==="delegated"?r===null:typeof r=="string"&&r.trim().length>0&&!/[\r\n]/.test(r);if(!n||!s)return null;let o=si(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${n}${a?` \u2192 ${o}`:""}`,l=`planned_execution ${e.kind}${typeof r=="string"?`:${r}`:""}`,u=t?` \xB7 exec_receipt ${Vn(t)}`:"";return{kind:e.kind,label:i,title:`${l}${u}`}}function Jc(e,t){let n=Ro(e,t);return n?c`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${n.kind}
        title=${n.title}
        >${n.label}</span
      >`:null}function Y_(e){if(!e)return null;let t=si(e.kind);return t?c`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${Vn(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function Z_(e,t){let n=t.policy||null,r=e.workflow&&e.workflow.chips||{},s=[];if(r.route&&sr(n,"route")){let i=r.route_source==="derived";s.push(c`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":r.route}</span
      >`)}if(r.fast_track&&sr(n,"fast_track")&&s.push(c`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),r.pr&&sr(n,"pr")){let i=r.pr.number;s.push(c`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Jc(r.planned_execution,r.exec_receipt);if(o&&s.push(o),r.exec_receipt){let i=r.exec_receipt;s.push(c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Vn(i)}`}
        >${`exec ${i.kind==="delegated"?Co(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(r.impl_entry){let i=r.impl_entry;s.push(c`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Gc(e.labels,n))s.push(c`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&sr(n,"from")&&s.push(c`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),sr(n,"blocked")&&s.push(...V_(e.id,e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&sr(n,"blocked")&&s.push(c`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":c`<div class="board-card__chips">${s}</div>`}function Q_(e){let t=hn(e.created_at),n=hn(e.updated_at);return!t&&!n?"":c`<span class="board-card__times">
    ${t?c`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&n?c`<span class="board-card__time-sep">·</span>`:""}
    ${n?c`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </span>`}function X_(e,t){let n=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return Eo(n,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:Q_(e),empty_label:"children \uC5C6\uC74C",childChips:oi,onToggle:r=>t.onRollupToggle&&t.onRollupToggle(r,e.id),onChildClick:(r,s)=>t.onChildClick&&t.onChildClick(r,s)})}function oi(e){let t=e?.workflow?.chips?.planned_execution,n=e?.workflow?.chips?.exec_receipt;return Ro(t,n)?c`<span class="board-card__roll-child-chips">
    ${Jc(t,n)}
    ${Y_(n)}
  </span>`:null}function Oo(e,t){let n=K_(e.priority);return c`
    <article
      class="board-card"
      data-issue-id=${e.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${r=>t.onCardClick(r,e.id)}
      @dragstart=${r=>t.onDragStart(r,e.id)}
      @dragend=${t.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`\uC774\uC288 ID ${e.id} \uBCF5\uC0AC`}
          @click=${r=>t.onCopyId(r,e.id)}
        >
          ${e.id}
        </button>
        ${n?c`<span class="board-card__pri">${n}</span>`:""}
      </div>
      <div class="board-card__title">${e.title||"(\uC81C\uBAA9 \uC5C6\uC74C)"}</div>
      ${Z_(e,t)}
      ${e.workflow&&sr(t.policy||null,"stepper")?To(e.workflow,e.status,{onOpenDoc:t.onOpenDoc}):""}
      ${X_(e,t)}
    </article>
  `}function jr(e,t){let n=Array.isArray(e.items)?e.items.length:0,r=e.is_closed===!0;return c`
    <section class=${r?"board-column board-column--closed":"board-column"} id=${e.id}>
      <header
        class="board-column__header"
        id=${e.id+"-header"}
        role="heading"
        aria-level="2"
      >
        <div class="board-column__title">
          <span class="board-column__title-text">${e.title}</span>
          <span class="board-column__count" aria-label=${`${n}\uAC74`}
            >${n}</span
          >
        </div>
        ${r?c`<select
              class="board-column__closed-range"
              aria-label="Closed period"
              @change=${t.onClosedRangeChange}
            >
              ${hc.map(o=>c`<option
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
        ${e.items.map(o=>Oo(o,t))}
      </div>
    </section>
  `}function eu(e,t,n){return c`
    <dialog
      id="deferred-popup"
      class="deferred-popup"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deferred-popup-title"
      @click=${n.onOverlayClick}
      @cancel=${n.onClose}
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
            @click=${n.onClose}
          >
            ×
          </button>
        </header>
        <div
          class="deferred-popup__body"
          role="list"
          aria-labelledby="deferred-popup-title"
        >
          ${e.items.length===0?c`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(r=>Oo(r,t))}
        </div>
      </div>
    </dialog>
  `}var J_=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],em=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],tm=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function nm(e,t,n){let r=e.labels.length,s=r>0?`\uB77C\uBCA8 ${r}`:"\uB77C\uBCA8";return c`
    <div class="board-filter__labels">
      <button
        type="button"
        class=${r>0?"board-filter__label-btn is-on":"board-filter__label-btn"}
        aria-haspopup="true"
        aria-expanded=${n.label_menu_open?"true":"false"}
        @click=${t.onLabelMenuToggle}
      >
        ${s} ▾
      </button>
      ${n.label_menu_open?c`<div class="board-filter__label-menu" role="group">
            ${n.label_options.length===0?c`<div class="board-filter__label-empty">라벨 없음</div>`:n.label_options.map(o=>c`<label class="board-filter__label-row">
                      <input
                        type="checkbox"
                        .checked=${e.labels.includes(o)}
                        @change=${()=>t.onLabelToggle(o)}
                      />
                      <span>${o}</span>
                    </label>`)}
            ${r>0?c`<button
                  type="button"
                  class="board-filter__label-clear"
                  @click=${t.onLabelClear}
                >
                  선택 해제
                </button>`:""}
          </div>`:""}
    </div>
  `}function tu(e,t,n){return c`
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
        ${J_.map(r=>c`<option
              value=${r.value}
              ?selected=${e.priority===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      <select
        class="board-filter__select"
        aria-label="타입 필터"
        @change=${t.onTypeChange}
      >
        ${em.map(r=>c`<option
              value=${r.value}
              ?selected=${e.type===r.value}
            >
              ${r.label}
            </option>`)}
      </select>
      ${nm(e,t,n)}
      <span class="board-filter__spacer"></span>
      <button
        type="button"
        class=${n.deferred_popup_open?"board-filter__deferred is-on":"board-filter__deferred"}
        aria-haspopup="dialog"
        aria-expanded=${n.deferred_popup_open?"true":"false"}
        @click=${t.onDeferredToggle}
      >
        Deferred ${n.deferred_count}
      </button>
      <select
        class="board-filter__select board-filter__sort"
        aria-label="정렬 규칙"
        @change=${t.onSortChange}
      >
        ${tm.map(r=>c`<option
              value=${r.value}
              ?selected=${n.sort_mode===r.value}
            >
              ${r.label}
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
  `}var rm=200,sm={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},om=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),nu="beads-ui.board.sort",ru=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function am(){try{let e=window.localStorage.getItem(nu);if(e&&ru.has(e))return e}catch{}return"created_desc"}function su(e,t){let n=Gt("views:board"),r=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,l=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,_=t.openDoc,h=t.closedRange||_o,b=s?vo(s,a):null,k=xo({transport:o,uiOrderStore:a}),D=[],B=[],Y=[],le=[],K=[],N=[],M=!1,G=0,L=am(),I=new Map,te=new Map,xe=new Map,ke=new Set,fe={search:"",priority:"",type:"",labels:[]},ae=!1,Te=null;function Ie(E){return String(E.status||"open")==="open"}function $e(E){let H=String(E.status||"open");return H==="open"||H==="blocked"}function ee(E){let H=fe.search.trim().toLowerCase(),Re=fe.priority,x=fe.type,R=fe.labels;return E.filter(X=>{if(H){let _e=String(X.id||"").toLowerCase(),Ae=String(X.title||"").toLowerCase();if(!_e.includes(H)&&!Ae.includes(H))return!1}if(Re!==""&&String(X.priority)!==Re||x!==""&&String(X.issue_type||"")!==x)return!1;if(R.length>0){let _e=Array.isArray(X.labels)?X.labels:[];if(!R.some(Ae=>_e.includes(Ae)))return!1}return!0})}function Z(){let E=new Set;for(let H of[D,B,Y,le,K,N])for(let Re of H){let x=Array.isArray(Re.labels)?Re.labels:[];for(let R of x)typeof R=="string"&&R.length>0&&E.add(R)}return Array.from(E).sort()}function Ce(){return fe.search.trim()!==""||fe.priority!==""||fe.type!==""||fe.labels.length>0}function z(){try{if(b){let E=b.selectBoardColumn("tab:board:in-progress","in_progress",L),H=b.selectBoardColumn("tab:board:blocked","blocked",L).filter($e),Re=new Set(E.map(ie=>ie.id)),x=b.selectBoardColumn("tab:board:ready","ready",L).filter(ie=>Ie(ie)&&!Re.has(ie.id)),R=b.selectBoardColumn("tab:board:resolved","resolved",L),X=b.selectBoardColumn("tab:board:deferred","deferred",L),_e=b.selectBoardColumn("tab:board:closed","closed").slice(0,rm),Ae=[...H,...x,...E,...R,..._e];ne(Ae);let v=new Set;for(let ie of Ae)ie&&ie.id&&!wo(ie)&&v.add(ie.id);let U=!Ce();D=U?cs(H,v):H,B=U?cs(x,v):x,Y=U?cs(E,v):E,le=U?cs(R,v):R,K=X,G=X.length,N=U?cs(_e,v):_e,I=new Map;for(let ie of D)I.set(ie.id,"open");for(let ie of B)I.set(ie.id,"open");for(let ie of Y)I.set(ie.id,"in_progress");for(let ie of le)I.set(ie.id,"resolved");for(let ie of K)I.set(ie.id,"deferred");for(let ie of N)I.set(ie.id,"closed");te=new Map;for(let ie of D)te.set(ie.id,"blocked-col");for(let ie of B)te.set(ie.id,"ready-col");for(let ie of Y)te.set(ie.id,"in-progress-col");for(let ie of le)te.set(ie.id,"resolved-col");for(let ie of N)te.set(ie.id,"closed-col")}mt()}catch{D=[],B=[],Y=[],le=[],K=[],N=[],xe=new Map,mt()}}function ne(E){xe=ko(E)}function ge(E){return $o(xe,E)}function Se(E){return!ke.has(E)}function Ye(E,H){E.preventDefault(),E.stopPropagation(),ke.has(H)?ke.delete(H):ke.add(H),mt()}function ue(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function Ue(E,H){E.preventDefault(),E.stopPropagation(),r(H)}function gt(E,H){Te||r(H)}function St(E,H){E.preventDefault(),E.stopPropagation(),im(H).then(Re=>{Re&&de("\uBCF5\uC0AC\uB428","success",1200)})}function xt(E,H){Te=H,E.dataTransfer&&(E.dataTransfer.setData("text/plain",H),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging")}function ft(E){E.target.classList.remove("board-card--dragging"),Lt(),setTimeout(()=>{Te=null},0)}function T(E){let H=String(E.target.value||"");!H||H===h||(h=H,u&&u(H),mt())}function ce(){return i?i.get():null}function Oe(E){let H=l?l.get():null,Re=H?H.cleanup_failed:null;if(!Re||typeof Re!="object"||Array.isArray(Re))return null;let x=Re[E];return!x||typeof x!="object"||Array.isArray(x)?null:x}let Me={onCardClick:gt,onCopyId:St,onDragStart:xt,onDragEnd:ft,onClosedRangeChange:T,rollupFor:ge,isExpanded:Se,onRollupToggle:Ye,onChildClick:ue,onFromChipClick:Ue,onOpenDoc:_?(E,H)=>_(H):void 0,cleanupFailureFor:Oe,get policy(){return ce()}};function Qe(E,H){Te||(we(),r(H))}function st(E,H){E.preventDefault(),E.stopPropagation(),we(),r(H)}let bt={...Me,onCardClick:Qe,onChildClick:st,onFromChipClick:st,onOpenDoc:_?(E,H)=>{we(),_(H)}:void 0,get policy(){return ce()}};function yt(E){let H=E.target,Re=e.querySelector(".board-filter__labels");H&&Re&&Re.contains(H)||je()}function re(E){E.key==="Escape"&&je()}function Q(){ae||(ae=!0,document.addEventListener("mousedown",yt),document.addEventListener("keydown",re),mt())}function je(){ae&&(ae=!1,document.removeEventListener("mousedown",yt),document.removeEventListener("keydown",re),mt())}function it(E){E.key==="Escape"&&we()}function We(){M||(M=!0,document.addEventListener("keydown",it),mt())}function we(){M&&(M=!1,document.removeEventListener("keydown",it),mt())}let Ge={onClose:we,onOverlayClick(E){E.target===E.currentTarget&&we()}},dt={onSearchInput(E){fe.search=String(E.target.value||""),z()},onPriorityChange(E){fe.priority=String(E.target.value||""),z()},onTypeChange(E){fe.type=String(E.target.value||""),z()},onSortChange(E){let H=String(E.target.value||"");if(!(!ru.has(H)||H===L)){L=H;try{window.localStorage.setItem(nu,H)}catch{}z()}},onDeferredToggle(){M?we():We()},onLabelMenuToggle(){ae?je():Q()},onLabelToggle(E){let H=fe.labels.indexOf(E);H===-1?fe.labels.push(E):fe.labels.splice(H,1),z()},onLabelClear(){fe.labels.length!==0&&(fe.labels=[],z())},onNewIssue(){d&&d()}};function _t(){return c`
      <div class="board-view">
        ${tu(fe,dt,{sort_mode:L,deferred_popup_open:M,deferred_count:G,label_options:Z(),label_menu_open:ae})}
        <div class="board-root">
          ${jr({title:"Blocked",id:"blocked-col",items:ee(D)},Me)}
          ${jr({title:"Ready",id:"ready-col",items:ee(B)},Me)}
          ${jr({title:"In progress",id:"in-progress-col",items:ee(Y)},Me)}
          ${jr({title:"Resolved",id:"resolved-col",items:ee(le)},Me)}
          ${jr({title:"Closed",id:"closed-col",items:ee(N),is_closed:!0,closed_range:h},Me)}
        </div>
        ${M?eu({items:ee(K),count:G},bt,Ge):""}
      </div>
    `}function mt(){at(_t(),e),Pt()}function Pt(){try{let E=e.querySelector("#deferred-popup");E&&!E.open&&(typeof E.showModal=="function"?E.showModal():E.setAttribute("open",""));let H=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let Re of H)Array.from(Re.querySelectorAll(".board-card")).forEach((R,X)=>{R.tabIndex=X===0?0:-1})}catch{}}async function Kt(E,H){if(!o){de("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:E,status:H}),de("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(Re){n("update-status failed: %o",Re),de("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function Ht(E){switch(E){case"blocked-col":return D;case"ready-col":return B;case"in-progress-col":return Y;case"resolved-col":return le;default:return[]}}function Ct(E,H,Re){if(!o||!a)return;let x=Ht(E),R=x.find(U=>U.id===H);if(!R)return;let X=x.filter(U=>U.id!==H),_e=Re.closest?Re.closest(".board-card"):null,Ae=X.length;if(_e){let U=_e.getAttribute("data-issue-id");if(U===H)return;let ie=X.findIndex(Ke=>Ke.id===U);ie>=0&&(Ae=ie)}let v=X.slice();v.splice(Ae,0,R),k.applyReorder(H,v,Ae)}function Lt(){for(let E of Array.from(e.querySelectorAll(".board-column--drag-over")))E.classList.remove("board-column--drag-over")}let Xe=null;e.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let Re=E.target.closest(".board-column");Re&&Re!==Xe&&(Xe&&Xe.classList.remove("board-column--drag-over"),Re.classList.add("board-column--drag-over"),Xe=Re)}),e.addEventListener("dragleave",E=>{let H=E.relatedTarget;(!H||!e.contains(H))&&Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null)}),e.addEventListener("drop",E=>{E.preventDefault(),Xe&&(Xe.classList.remove("board-column--drag-over"),Xe=null);let H=E.target,Re=H.closest(".board-column");if(!Re)return;let x=E.dataTransfer?.getData("text/plain")||"";if(!x)return;let R=Re.id,X=te.get(x);if(X&&X===R){if(om.has(R)){if(L!=="manual"){de("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}Ct(R,x,H)}return}let _e=sm[R];if(!_e){de("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}I.get(x)!==_e&&Kt(x,_e)}),e.addEventListener("keydown",E=>{let H=E.target;if(!(H instanceof HTMLElement))return;let Re=String(H.tagName||"").toLowerCase();if(Re==="input"||Re==="textarea"||Re==="select"||Re==="button"||Re==="a"||H.isContentEditable===!0)return;let x=H.closest(".board-card");if(!x)return;let R=String(E.key||"");if(R==="Enter"||R===" "){E.preventDefault();let v=x.getAttribute("data-issue-id");v&&r(v);return}if(R!=="ArrowUp"&&R!=="ArrowDown"&&R!=="ArrowLeft"&&R!=="ArrowRight")return;E.preventDefault();let X=x.closest(".board-column");if(!X)return;let _e=Array.from(X.querySelectorAll(".board-card")),Ae=_e.indexOf(x);if(R==="ArrowDown"&&Ae<_e.length-1){De(x,_e[Ae+1]);return}if(R==="ArrowUp"&&Ae>0){De(x,_e[Ae-1]);return}if(R==="ArrowLeft"||R==="ArrowRight"){let v=Array.from(e.querySelectorAll(".board-column")),U=v.indexOf(X),ie=R==="ArrowRight"?1:-1,Ke=U+ie;for(;Ke>=0&&Ke<v.length;){let Be=v[Ke].querySelector(".board-card");if(Be){De(x,Be);return}Ke+=ie}}});function De(E,H){try{E.tabIndex=-1,H.tabIndex=0,H.focus()}catch{}}let P=null;b&&b.subscribe&&(P=b.subscribe(()=>{try{z()}catch{}}));let J=null;i&&i.subscribe&&(J=i.subscribe(()=>{try{z()}catch{}}));let ve=null;return l&&l.subscribe&&(ve=l.subscribe(()=>{mt()})),{async load(){n("load"),z()},clear(){je(),we(),P&&(P(),P=null),J&&(J(),J=null),ve&&(ve(),ve=null),e.replaceChildren(),D=[],B=[],Y=[],le=[],K=[],N=[],I=new Map,te=new Map}}}function cs(e,t){return e.filter(n=>{let r=wo(n);return!(r&&t.has(r))})}async function im(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand("copy")}finally{t.remove()}return n}catch{return!1}}async function xn(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let n=document.createElement("textarea");n.value=t,n.style.position="fixed",n.style.left="-9999px",document.body.appendChild(n),n.select();let r=!1;try{r=document.execCommand("copy")}finally{n.remove()}return r}catch{return!1}}function kr(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function us(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function lm(e,t=document){let n=t.createElement("dialog");n.className="continuation-dialog";let r=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${kr(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${kr(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,r.type="button",r.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",r.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",n.append(a,i,r,s,o),t.body.append(n),new Promise(l=>{let u=d=>{typeof n.close=="function"&&n.close(),n.remove(),l(d)};r.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),n.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")})}async function Yn(e,t,n={}){let r=e;for(n.onResult?.(r);r?.continuation_mismatch;){let s=r.continuation_mismatch,o=await lm(s);if(o===null)return r;r=await t(o,s.decision_token),n.onResult?.(r),r?.conflict&&n.refresh&&(r=await n.refresh(r),n.onResult?.(r))}return r}var cm=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],ou={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},um=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function sn(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Vt(e){return typeof e=="string"&&e.length>0?e:null}function Br(e){return e.startsWith("gpt-")?e.slice(4):e}function Wt(e,t,n,r,s){return{value:e,source:t,display:n,full_value:r,resolution:s}}function iu(e,t,n){let r=Vt(t[e]);if(r!==null)return{value:r,source:"pin"};let s=Vt(n[e]);return s===null?null:{value:s,source:"global"}}function ds(e,t,n,r){return iu(e,t,n)||{value:r,source:"base"}}function ai(e,t,n,r){let s=n?.implementation?.model_catalog;if(t&&sn(s?.[t])){let a=Vt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&sn(s)){for(let a of Object.values(s))if(sn(a)){let i=Vt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=r?.model_index?.[e];return Vt(r?.runners?.[o]?.models?.[e]?.id)||e}function dm(e,t){return Vt(t?.review?.reviewers?.[e]?.model)||e}function Ur(e,t,n=!1){if(e==="default")return Wt(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let r=n?Br(e):e;return Wt(e,t,r,e,"explicit")}function lu(e,t,n){let r=t?.implementation?.model_catalog?.[e],s=[];sn(r)?s.push(...Object.keys(r)):Array.isArray(r)&&s.push(...r.filter(a=>typeof a=="string"));let o=n?.runners?.[e]?.models;if(sn(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function pm(e,t){let n=[],r=e?.implementation?.model_catalog;sn(r)&&n.push(...Object.keys(r));let s=t?.runners;if(sn(s))for(let o of Object.keys(s))n.includes(o)||n.push(o);return n}function fm(e,t,n){if(e===null)return{runtime:null,offered:!1};let r=!1;for(let s of pm(t,n)){let o=lu(s,t,n);if(o.length>0&&(r=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:r}}function ii(e){return Wt(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function au(e,t,n){let r=iu(e,t,n);return r?Ur(r.value,r.source):Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function yn(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.execution_defaults)?e.execution_defaults:null,s=r?.supported===!0&&sn(r.session)?r.session:null,o=r?.supported===!0&&sn(r.orchestration)?r.orchestration:null,a=sn(e.runner_catalog)?e.runner_catalog:null,i=Vt(n.quick_fix_impl_model),l=fm(i,s,a),u={};if(s){let d=ds("workflow_mode",t,n,Vt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?Wt(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):Ur(d.value,d.source);for(let K of["spec_review","plan_review","impl_review"]){let N=`${K}_model`,M=Vt(K==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),G=ds(N,t,n,M);if(G.value===null)u[N]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(G.value!=="self"&&G.value!=="skip"&&!sn(s.review?.reviewers?.[G.value]))u[N]=ii(Wt(G.value,G.source,"",null,"explicit"));else{let L=dm(G.value,s);u[N]=Wt(G.value,G.source,Br(L),L,G.source==="base"?"default":"explicit")}}for(let[K,N]of Object.entries(ou)){let M=u[N].value;if(M==="self"||M==="skip"){u[K]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let G=Vt(s.review?.reviewers?.[M||""]?.effort),L=ds(K,t,n,G);u[K]=L.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(L.value,L.source,L.value,L.value,L.source==="base"?"default":"explicit")}let _=sn(s.implementation?.default)?s.implementation.default:{},h=Vt(e.route),b=h!==null&&["quick_fix","spec_backed","full_plan"].includes(h),k=sn(s.implementation?.route_defaults)?s.implementation.route_defaults:{},D=b&&sn(k[h])?k[h]:{};for(let K of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let N=ds(K,t,n,K==="impl_dispatch"?Vt(D.dispatch)||Vt(_.dispatch):Vt(_[K.replace("impl_","")]));u[K]=N.value===null?Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):Wt(N.value,N.source,N.value,N.value,N.source==="base"?"default":"explicit")}let B=Vt(t.impl_runtime),Y=B==="inherit"?Vt(e.controller_runtime):B,le=h==="quick_fix"&&Vt(t.impl_dispatch)===null&&l.runtime!==null&&(B===null||Y===l.runtime);if(le){let K=l.runtime,N=i;u.impl_dispatch=Wt("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),B===null&&(u.impl_runtime=Wt(K,"global",`${K} (\uC720\uB3C4)`,K,"explicit")),Vt(t.impl_model)===null&&(u.impl_model=Wt(N,"global",N,N,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let K of["impl_runtime","impl_model","impl_effort","impl_speed"])u[K]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!le&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let K=u.impl_runtime.value==="inherit"?Vt(e.controller_runtime):u.impl_runtime.value,N=K?lu(K,s,a):[];if(u.impl_model.value!=="auto"&&N.length>0&&!N.includes(u.impl_model.value))u.impl_model=ii(u.impl_model);else{let M=ai(u.impl_model.value,K,s,a);u.impl_model.display=Br(M),u.impl_model.full_value=M}}if(u.impl_effort.value==="auto"){let K=Vt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),N=K?Vt(s.implementation?.effort_by_transport?.[K]?.auto):null;N&&!um.has(N)?(u.impl_effort.display=`${N} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=N,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Ur("default",u.impl_speed.source))}}else for(let d of cm.filter(_=>!_.startsWith("orchestration_")))u[d]=au(d,t,n);if(!s){for(let[d,_]of Object.entries(ou))(u[_].value==="self"||u[_].value==="skip")&&(u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=Wt(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=au(d,t,n);continue}let _=d.replace("orchestration_",""),h=Vt(o[_]),b=ds(d,t,n,h);if(d==="orchestration_effort"&&b.source==="base"){u[d]=Wt(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(b.value===null){u[d]=Wt(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let k=b.source==="base"?Vt(o.model_id)||b.value:ai(b.value,null,s,a);u[d]=Wt(b.value,b.source,Br(k),k,b.source==="base"?"default":"explicit");continue}if(b.value==="default"){u[d]=b.source==="base"?Wt("default","base","default (\uC77C\uBC18)","default","default"):Ur("default",b.source);continue}u[d]=Ur(b.value,b.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=Wt(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${Br(d)})`,null,"default")}else if(l.runtime!==null){let d=ai(i,l.runtime,s,a);u.quick_fix_impl_model=Wt(i,"global",Br(d),d,"explicit")}else l.offered?u.quick_fix_impl_model=ii(Wt(i,"global","",null,"explicit")):u.quick_fix_impl_model=Ur(i,"global");return u}function _m(e,t){let n=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let r=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${n} (${r})`}function Lo(e){let t=sn(e.pin)?e.pin:{},n=sn(e.global)?e.global:{},r=sn(e.resolution_global)?{...e.resolution_global}:{};delete r[e.key];let s=_=>{let h={...r,..._};return yn({pin:e.layer==="pin"?h:t,global:e.layer==="pin"?n:h,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:n,a={...o};delete a[e.key];let i=s(a)[e.key],l=s(o)[e.key],u=Vt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:_m(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:l?.resolution==="not_applicable",options:d.map(_=>{let h=s({...o,[e.key]:_})[e.key];return{value:_,label:h.display,full_value:h.full_value}})}}function Wr(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let n=e.createElement("h2"),r=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return n.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",r.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",r.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(n,r,s),e.body.append(t),new Promise(i=>{let l=!1,u=_=>{l||(l=!0,typeof t.close=="function"&&t.close(),t.remove(),i(_))},d=()=>u(r.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),r.addEventListener("keydown",_=>{_.key==="Enter"&&(_.ctrlKey||_.metaKey)&&(_.preventDefault(),d())}),t.addEventListener("cancel",_=>{_.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),r.focus()})}function li(e){return`session:${e.provider}:${e.session_id}`}function ps(e){return`${e.provider} \xB7 ${e.session_id.slice(0,8)}`}function mm(e,t){return e.current&&t==="in_progress"&&e.locality==="local"?"running":"done"}function Io(e,t,n,r){return{attempt_id:li(e),session_ref:{bead_id:t,provider:e.provider,session_id:e.session_id},...typeof r=="string"&&r.length>0?{root_dir:r}:{},hide_prompt:!0,meta:{runner:e.provider,label:ps(e),session_id:e.session_id,...typeof e.resume_command=="string"&&e.resume_command.length>0?{resume_command:e.resume_command}:{},status:mm(e,n)}}}var ci="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",gm="\uBD84\uD574 \uC5C6\uC74C \u2014 \uCD1D\uB7C9\uB9CC \uBCF4\uACE0\uB428",cu="\uBD84\uD574 \uC5C6\uB294 leg";function Jt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var Hn=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],zr=[...Hn,"reasoning_output_tokens"],bm={codex:["implementation","review-consult"],claude:["subagent"]};function ui(e){return!e||typeof e!="object"?!1:Number.isFinite(e.total_tokens)&&!Hn.some(t=>Number.isFinite(e[t]))}function hm(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))}function di(e){let t=0;for(let n of Hn)t+=Jt(e?.[n]);return t}function ym(e){return!e||typeof e!="object"?!1:Hn.some(t=>Number.isFinite(e[t]))}function uu(e){return!e||typeof e!="object"?!1:zr.some(t=>Number.isFinite(e[t]))||Number.isFinite(e.total_tokens)}function vm(e){let t={};for(let n of zr)e&&Number.isFinite(e[n])&&(t[n]=e[n]);return t}function du(e){let t={};for(let n of zr)Number.isFinite(e[n])&&(t[n]=e[n]);return Number.isFinite(e.total_tokens)&&(t.total_tokens=e.total_tokens),e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function pu(e,t){return ui(t)?Jt(t.total_tokens):e==="codex"?Jt(t.input_tokens)+Jt(t.output_tokens):di(t)}function wm(e){return e==="claude"?"Claude":"Codex"}function km(e){return`\u03C4 ${_u(e)}`}function $m(e,t){let n=t.breakdown||{},r=Jt(t.total_only_subtotal);if(ui(n)||r>0&&!hm(n)){let u=[`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,gm];return t.replayed&&u.push(ci),u.join(`
`)}let s=[`\uC785\uB825 ${Jt(n.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(n.output_tokens).toLocaleString("en-US")}`];e==="claude"?s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`):(s.push(`\uCE90\uC2DC\uC77D\uAE30 ${Jt(n.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Jt(n.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(n.reasoning_output_tokens)&&s.push(`\uCD94\uB860\uCD9C\uB825 ${Jt(n.reasoning_output_tokens).toLocaleString("en-US")}`)),r>0&&s.push(`${cu} ${r.toLocaleString("en-US")}`);let o=e==="claude"?"\uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"\uC785\uB825 + \uCD9C\uB825",a=r>0?`${o} + ${cu}`:o,l=[e==="claude"?`Claude subtotal = ${a}`:`Codex subtotal = ${a}; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset`,`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,s.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&l.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&l.push(ci),l.join(`
`)}function un(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let n of["claude","codex"]){let r=e.providers[n];r&&t.push({provider:n,label:`${wm(n)} ${km(r.subtotal)}${typeof r.total_cost_usd=="number"&&Number.isFinite(r.total_cost_usd)?` \xB7 $${r.total_cost_usd.toFixed(2)}`:""}`,tooltip:$m(n,r)})}return t}function Mo(e){let t={},n={claude:!0,codex:!1},r={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal,Number.isFinite(a.total_only_subtotal)&&(i.total_only_subtotal=Jt(i.total_only_subtotal)+Jt(a.total_only_subtotal));for(let l of zr)Number.isFinite(a.breakdown[l])&&(i.breakdown[l]=Jt(i.breakdown[l])+Jt(a.breakdown[l]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?r.claude+=a.total_cost_usd:n.claude=!1)}return t.claude&&n.claude&&(t.claude.total_cost_usd=r.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function pi(e){return!e||typeof e!="object"?null:Rn({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function xm(e){return e==="codex"?"codex":"claude"}function zn(){return{subtotal:0,breakdown:vm(null),total_only:0,legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Po(e,t,n){e.subtotal+=t.subtotal,ui(t.usage)&&(e.total_only+=t.subtotal);for(let r of zr)Number.isFinite(t.usage[r])&&(e.breakdown[r]=Jt(e.breakdown[r])+Jt(t.usage[r]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),n&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function fu(e,t){let n={subtotal:e.subtotal,breakdown:e.breakdown};return e.total_only>0&&(n.total_only_subtotal=e.total_only),t&&(n.legs=e.legs),e.replayed&&(n.replayed=!0),n}function _u(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function Hr(e){return ym(e)?`\u03C4 ${_u(di(e))}`:null}function Zn(e){let t=Hr(e);if(!t)return null;let n=e?.total_cost_usd;return typeof n=="number"&&Number.isFinite(n)?`${t} \xB7 $${n.toFixed(2)}`:t}function fs(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Jt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Jt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Jt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Jt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let n=[`\uCD1D ${di(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&n.push(ci),n.join(`
`)}function Rn(e,t){let n={claude:zn(),codex:zn()},r={orchestrator:{claude:zn(),codex:zn()},implementation:{claude:zn(),codex:zn()},"review-consult":{claude:zn(),codex:zn()},subagent:{claude:zn(),codex:zn()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let l=i.usage;if(uu(l)){let d=xm(i.runner),_=du(l),h={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:_,subtotal:pu(d,_)};_.replayed===!0&&(h.replayed=!0),typeof i.model=="string"&&(h.model=i.model),typeof i.session_id=="string"&&(h.session_id=i.session_id),Po(n[d],h,!0),Po(r.orchestrator[d],h,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let _=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!bm[_].includes(d.role)||!uu(d.usage))continue;let h=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!h||s.has(h))continue;s.add(h);let b=du(d.usage),k={provider:_,role:d.role,attempt_id:String(i.attempt_id||""),usage:b,subtotal:pu(_,b)};k.receipt_id=h,typeof d.agent_type=="string"&&(k.agent_type=d.agent_type),typeof d.agent_id=="string"&&(k.agent_id=d.agent_id),typeof d.model=="string"&&(k.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&(k.effort=d.effort),typeof d.session_id=="string"?k.session_id=d.session_id:typeof d.thread_id=="string"&&(k.session_id=d.thread_id),typeof d.turn_id=="string"&&(k.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&(k.completed_at=d.completed_at),b.replayed===!0&&(k.replayed=!0),Po(n[_],k,!1),Po(r[k.role][_],k,!1)}}let o={};for(let i of["claude","codex"]){let l=n[i];if(l.legs.length===0)continue;let u=fu(l,!1);i==="claude"&&l.outer_count>0&&l.outer_cost_count===l.outer_count&&(u.total_cost_usd=l.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let l={};for(let u of["claude","codex"]){let d=r[i][u];d.legs.length>0&&(l[u]={...fu(d,!0),legs:d.legs})}Object.keys(l).length>0&&(a[i]=l)}return{providers:o,roles:a}}var{entries:$u,setPrototypeOf:mu,isFrozen:Am,getPrototypeOf:Sm,getOwnPropertyDescriptor:Em}=Object,{freeze:fn,seal:On,create:yi}=Object,{apply:vi,construct:wi}=typeof Reflect<"u"&&Reflect;fn||(fn=function(t){return t});On||(On=function(t){return t});vi||(vi=function(t,n){for(var r=arguments.length,s=new Array(r>2?r-2:0),o=2;o<r;o++)s[o-2]=arguments[o];return t.apply(n,s)});wi||(wi=function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return new t(...r)});var Do=_n(Array.prototype.forEach),Tm=_n(Array.prototype.lastIndexOf),gu=_n(Array.prototype.pop),_s=_n(Array.prototype.push),Cm=_n(Array.prototype.splice),qo=_n(String.prototype.toLowerCase),fi=_n(String.prototype.toString),_i=_n(String.prototype.match),ms=_n(String.prototype.replace),Rm=_n(String.prototype.indexOf),Om=_n(String.prototype.trim),Mn=_n(Object.prototype.hasOwnProperty),pn=_n(RegExp.prototype.test),gs=Lm(TypeError);function _n(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),s=1;s<n;s++)r[s-1]=arguments[s];return vi(e,t,r)}}function Lm(e){return function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return wi(e,n)}}function kt(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:qo;mu&&mu(e,null);let r=t.length;for(;r--;){let s=t[r];if(typeof s=="string"){let o=n(s);o!==s&&(Am(t)||(t[r]=o),s=o)}e[s]=!0}return e}function Im(e){for(let t=0;t<e.length;t++)Mn(e,t)||(e[t]=null);return e}function Qn(e){let t=yi(null);for(let[n,r]of $u(e))Mn(e,n)&&(Array.isArray(r)?t[n]=Im(r):r&&typeof r=="object"&&r.constructor===Object?t[n]=Qn(r):t[n]=r);return t}function bs(e,t){for(;e!==null;){let r=Em(e,t);if(r){if(r.get)return _n(r.get);if(typeof r.value=="function")return _n(r.value)}e=Sm(e)}function n(){return null}return n}var bu=fn(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),mi=fn(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gi=fn(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Pm=fn(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bi=fn(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Mm=fn(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),hu=fn(["#text"]),yu=fn(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),hi=fn(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vu=fn(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),No=fn(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Dm=On(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Nm=On(/<%[\w\W]*|[\w\W]*%>/gm),qm=On(/\$\{[\w\W]*/gm),Fm=On(/^data-[\-\w.\u00B7-\uFFFF]+$/),jm=On(/^aria-[\-\w]+$/),xu=On(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Bm=On(/^(?:\w+script|data):/i),Um=On(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Au=On(/^html$/i),Wm=On(/^[a-z][.\w]*(-[.\w]+)+$/i),wu=Object.freeze({__proto__:null,ARIA_ATTR:jm,ATTR_WHITESPACE:Um,CUSTOM_ELEMENT:Wm,DATA_ATTR:Fm,DOCTYPE_NAME:Au,ERB_EXPR:Nm,IS_ALLOWED_URI:xu,IS_SCRIPT_OR_DATA:Bm,MUSTACHE_EXPR:Dm,TMPLIT_EXPR:qm}),hs={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},zm=function(){return typeof window>"u"?null:window},Hm=function(t,n){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let r=null,s="data-tt-policy-suffix";n&&n.hasAttribute(s)&&(r=n.getAttribute(s));let o="dompurify"+(r?"#"+r:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ku=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Su(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:zm(),t=Pe=>Su(Pe);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==hs.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,s=r.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:l,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:_,DOMParser:h,trustedTypes:b}=e,k=l.prototype,D=bs(k,"cloneNode"),B=bs(k,"remove"),Y=bs(k,"nextSibling"),le=bs(k,"childNodes"),K=bs(k,"parentNode");if(typeof a=="function"){let Pe=n.createElement("template");Pe.content&&Pe.content.ownerDocument&&(n=Pe.content.ownerDocument)}let N,M="",{implementation:G,createNodeIterator:L,createDocumentFragment:I,getElementsByTagName:te}=n,{importNode:xe}=r,ke=ku();t.isSupported=typeof $u=="function"&&typeof K=="function"&&G&&G.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:fe,ERB_EXPR:ae,TMPLIT_EXPR:Te,DATA_ATTR:Ie,ARIA_ATTR:$e,IS_SCRIPT_OR_DATA:ee,ATTR_WHITESPACE:Z,CUSTOM_ELEMENT:Ce}=wu,{IS_ALLOWED_URI:z}=wu,ne=null,ge=kt({},[...bu,...mi,...gi,...bi,...hu]),Se=null,Ye=kt({},[...yu,...hi,...vu,...No]),ue=Object.seal(yi(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ue=null,gt=null,St=Object.seal(yi(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),xt=!0,ft=!0,T=!1,ce=!0,Oe=!1,Me=!0,Qe=!1,st=!1,bt=!1,yt=!1,re=!1,Q=!1,je=!0,it=!1,We="user-content-",we=!0,Ge=!1,dt={},_t=null,mt=kt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Pt=null,Kt=kt({},["audio","video","img","source","image","track"]),Ht=null,Ct=kt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Lt="http://www.w3.org/1998/Math/MathML",Xe="http://www.w3.org/2000/svg",De="http://www.w3.org/1999/xhtml",P=De,J=!1,ve=null,E=kt({},[Lt,Xe,De],fi),H=kt({},["mi","mo","mn","ms","mtext"]),Re=kt({},["annotation-xml"]),x=kt({},["title","style","font","a","script"]),R=null,X=["application/xhtml+xml","text/html"],_e="text/html",Ae=null,v=null,U=n.createElement("form"),ie=function(C){return C instanceof RegExp||C instanceof Function},Ke=function(){let C=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(v&&v===C)){if((!C||typeof C!="object")&&(C={}),C=Qn(C),R=X.indexOf(C.PARSER_MEDIA_TYPE)===-1?_e:C.PARSER_MEDIA_TYPE,Ae=R==="application/xhtml+xml"?fi:qo,ne=Mn(C,"ALLOWED_TAGS")?kt({},C.ALLOWED_TAGS,Ae):ge,Se=Mn(C,"ALLOWED_ATTR")?kt({},C.ALLOWED_ATTR,Ae):Ye,ve=Mn(C,"ALLOWED_NAMESPACES")?kt({},C.ALLOWED_NAMESPACES,fi):E,Ht=Mn(C,"ADD_URI_SAFE_ATTR")?kt(Qn(Ct),C.ADD_URI_SAFE_ATTR,Ae):Ct,Pt=Mn(C,"ADD_DATA_URI_TAGS")?kt(Qn(Kt),C.ADD_DATA_URI_TAGS,Ae):Kt,_t=Mn(C,"FORBID_CONTENTS")?kt({},C.FORBID_CONTENTS,Ae):mt,Ue=Mn(C,"FORBID_TAGS")?kt({},C.FORBID_TAGS,Ae):Qn({}),gt=Mn(C,"FORBID_ATTR")?kt({},C.FORBID_ATTR,Ae):Qn({}),dt=Mn(C,"USE_PROFILES")?C.USE_PROFILES:!1,xt=C.ALLOW_ARIA_ATTR!==!1,ft=C.ALLOW_DATA_ATTR!==!1,T=C.ALLOW_UNKNOWN_PROTOCOLS||!1,ce=C.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Oe=C.SAFE_FOR_TEMPLATES||!1,Me=C.SAFE_FOR_XML!==!1,Qe=C.WHOLE_DOCUMENT||!1,yt=C.RETURN_DOM||!1,re=C.RETURN_DOM_FRAGMENT||!1,Q=C.RETURN_TRUSTED_TYPE||!1,bt=C.FORCE_BODY||!1,je=C.SANITIZE_DOM!==!1,it=C.SANITIZE_NAMED_PROPS||!1,we=C.KEEP_CONTENT!==!1,Ge=C.IN_PLACE||!1,z=C.ALLOWED_URI_REGEXP||xu,P=C.NAMESPACE||De,H=C.MATHML_TEXT_INTEGRATION_POINTS||H,Re=C.HTML_INTEGRATION_POINTS||Re,ue=C.CUSTOM_ELEMENT_HANDLING||{},C.CUSTOM_ELEMENT_HANDLING&&ie(C.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(ue.tagNameCheck=C.CUSTOM_ELEMENT_HANDLING.tagNameCheck),C.CUSTOM_ELEMENT_HANDLING&&ie(C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(ue.attributeNameCheck=C.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),C.CUSTOM_ELEMENT_HANDLING&&typeof C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(ue.allowCustomizedBuiltInElements=C.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Oe&&(ft=!1),re&&(yt=!0),dt&&(ne=kt({},hu),Se=[],dt.html===!0&&(kt(ne,bu),kt(Se,yu)),dt.svg===!0&&(kt(ne,mi),kt(Se,hi),kt(Se,No)),dt.svgFilters===!0&&(kt(ne,gi),kt(Se,hi),kt(Se,No)),dt.mathMl===!0&&(kt(ne,bi),kt(Se,vu),kt(Se,No))),C.ADD_TAGS&&(typeof C.ADD_TAGS=="function"?St.tagCheck=C.ADD_TAGS:(ne===ge&&(ne=Qn(ne)),kt(ne,C.ADD_TAGS,Ae))),C.ADD_ATTR&&(typeof C.ADD_ATTR=="function"?St.attributeCheck=C.ADD_ATTR:(Se===Ye&&(Se=Qn(Se)),kt(Se,C.ADD_ATTR,Ae))),C.ADD_URI_SAFE_ATTR&&kt(Ht,C.ADD_URI_SAFE_ATTR,Ae),C.FORBID_CONTENTS&&(_t===mt&&(_t=Qn(_t)),kt(_t,C.FORBID_CONTENTS,Ae)),we&&(ne["#text"]=!0),Qe&&kt(ne,["html","head","body"]),ne.table&&(kt(ne,["tbody"]),delete Ue.tbody),C.TRUSTED_TYPES_POLICY){if(typeof C.TRUSTED_TYPES_POLICY.createHTML!="function")throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof C.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw gs('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=C.TRUSTED_TYPES_POLICY,M=N.createHTML("")}else N===void 0&&(N=Hm(b,s)),N!==null&&typeof M=="string"&&(M=N.createHTML(""));fn&&fn(C),v=C}},Be=kt({},[...mi,...gi,...Pm]),be=kt({},[...bi,...Mm]),Rt=function(C){let he=K(C);(!he||!he.tagName)&&(he={namespaceURI:P,tagName:"template"});let Ne=qo(C.tagName),At=qo(he.tagName);return ve[C.namespaceURI]?C.namespaceURI===Xe?he.namespaceURI===De?Ne==="svg":he.namespaceURI===Lt?Ne==="svg"&&(At==="annotation-xml"||H[At]):!!Be[Ne]:C.namespaceURI===Lt?he.namespaceURI===De?Ne==="math":he.namespaceURI===Xe?Ne==="math"&&Re[At]:!!be[Ne]:C.namespaceURI===De?he.namespaceURI===Xe&&!Re[At]||he.namespaceURI===Lt&&!H[At]?!1:!be[Ne]&&(x[Ne]||!Be[Ne]):!!(R==="application/xhtml+xml"&&ve[C.namespaceURI]):!1},vt=function(C){_s(t.removed,{element:C});try{K(C).removeChild(C)}catch{B(C)}},ht=function(C,he){try{_s(t.removed,{attribute:he.getAttributeNode(C),from:he})}catch{_s(t.removed,{attribute:null,from:he})}if(he.removeAttribute(C),C==="is")if(yt||re)try{vt(he)}catch{}else try{he.setAttribute(C,"")}catch{}},Qt=function(C){let he=null,Ne=null;if(bt)C="<remove></remove>"+C;else{let wt=_i(C,/^[\r\n\t ]+/);Ne=wt&&wt[0]}R==="application/xhtml+xml"&&P===De&&(C='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+C+"</body></html>");let At=N?N.createHTML(C):C;if(P===De)try{he=new h().parseFromString(At,R)}catch{}if(!he||!he.documentElement){he=G.createDocument(P,"template",null);try{he.documentElement.innerHTML=J?M:At}catch{}}let Ft=he.body||he.documentElement;return C&&Ne&&Ft.insertBefore(n.createTextNode(Ne),Ft.childNodes[0]||null),P===De?te.call(he,Qe?"html":"body")[0]:Qe?he.documentElement:Ft},qt=function(C){return L.call(C.ownerDocument||C,C,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},an=function(C){return C instanceof _&&(typeof C.nodeName!="string"||typeof C.textContent!="string"||typeof C.removeChild!="function"||!(C.attributes instanceof d)||typeof C.removeAttribute!="function"||typeof C.setAttribute!="function"||typeof C.namespaceURI!="string"||typeof C.insertBefore!="function"||typeof C.hasChildNodes!="function")},en=function(C){return typeof i=="function"&&C instanceof i};function rn(Pe,C,he){Do(Pe,Ne=>{Ne.call(t,C,he,v)})}let Xt=function(C){let he=null;if(rn(ke.beforeSanitizeElements,C,null),an(C))return vt(C),!0;let Ne=Ae(C.nodeName);if(rn(ke.uponSanitizeElement,C,{tagName:Ne,allowedTags:ne}),Me&&C.hasChildNodes()&&!en(C.firstElementChild)&&pn(/<[/\w!]/g,C.innerHTML)&&pn(/<[/\w!]/g,C.textContent)||C.nodeType===hs.progressingInstruction||Me&&C.nodeType===hs.comment&&pn(/<[/\w]/g,C.data))return vt(C),!0;if(!(St.tagCheck instanceof Function&&St.tagCheck(Ne))&&(!ne[Ne]||Ue[Ne])){if(!Ue[Ne]&&Ze(Ne)&&(ue.tagNameCheck instanceof RegExp&&pn(ue.tagNameCheck,Ne)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Ne)))return!1;if(we&&!_t[Ne]){let At=K(C)||C.parentNode,Ft=le(C)||C.childNodes;if(Ft&&At){let wt=Ft.length;for(let jt=wt-1;jt>=0;--jt){let tn=D(Ft[jt],!0);tn.__removalCount=(C.__removalCount||0)+1,At.insertBefore(tn,Y(C))}}}return vt(C),!0}return C instanceof l&&!Rt(C)||(Ne==="noscript"||Ne==="noembed"||Ne==="noframes")&&pn(/<\/no(script|embed|frames)/i,C.innerHTML)?(vt(C),!0):(Oe&&C.nodeType===hs.text&&(he=C.textContent,Do([fe,ae,Te],At=>{he=ms(he,At," ")}),C.textContent!==he&&(_s(t.removed,{element:C.cloneNode()}),C.textContent=he)),rn(ke.afterSanitizeElements,C,null),!1)},on=function(C,he,Ne){if(je&&(he==="id"||he==="name")&&(Ne in n||Ne in U))return!1;if(!(ft&&!gt[he]&&pn(Ie,he))){if(!(xt&&pn($e,he))){if(!(St.attributeCheck instanceof Function&&St.attributeCheck(he,C))){if(!Se[he]||gt[he]){if(!(Ze(C)&&(ue.tagNameCheck instanceof RegExp&&pn(ue.tagNameCheck,C)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(C))&&(ue.attributeNameCheck instanceof RegExp&&pn(ue.attributeNameCheck,he)||ue.attributeNameCheck instanceof Function&&ue.attributeNameCheck(he,C))||he==="is"&&ue.allowCustomizedBuiltInElements&&(ue.tagNameCheck instanceof RegExp&&pn(ue.tagNameCheck,Ne)||ue.tagNameCheck instanceof Function&&ue.tagNameCheck(Ne))))return!1}else if(!Ht[he]){if(!pn(z,ms(Ne,Z,""))){if(!((he==="src"||he==="xlink:href"||he==="href")&&C!=="script"&&Rm(Ne,"data:")===0&&Pt[C])){if(!(T&&!pn(ee,ms(Ne,Z,"")))){if(Ne)return!1}}}}}}}return!0},Ze=function(C){return C!=="annotation-xml"&&_i(C,Ce)},gn=function(C){rn(ke.beforeSanitizeAttributes,C,null);let{attributes:he}=C;if(!he||an(C))return;let Ne={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0},At=he.length;for(;At--;){let Ft=he[At],{name:wt,namespaceURI:jt,value:tn}=Ft,ln=Ae(wt),wn=tn,Bt=wt==="value"?wn:Om(wn);if(Ne.attrName=ln,Ne.attrValue=Bt,Ne.keepAttr=!0,Ne.forceKeepAttr=void 0,rn(ke.uponSanitizeAttribute,C,Ne),Bt=Ne.attrValue,it&&(ln==="id"||ln==="name")&&(ht(wt,C),Bt=We+Bt),Me&&pn(/((--!?|])>)|<\/(style|title|textarea)/i,Bt)){ht(wt,C);continue}if(ln==="attributename"&&_i(Bt,"href")){ht(wt,C);continue}if(Ne.forceKeepAttr)continue;if(!Ne.keepAttr){ht(wt,C);continue}if(!ce&&pn(/\/>/i,Bt)){ht(wt,C);continue}Oe&&Do([fe,ae,Te],kn=>{Bt=ms(Bt,kn," ")});let En=Ae(C.nodeName);if(!on(En,ln,Bt)){ht(wt,C);continue}if(N&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!jt)switch(b.getAttributeType(En,ln)){case"TrustedHTML":{Bt=N.createHTML(Bt);break}case"TrustedScriptURL":{Bt=N.createScriptURL(Bt);break}}if(Bt!==wn)try{jt?C.setAttributeNS(jt,wt,Bt):C.setAttribute(wt,Bt),an(C)?vt(C):gu(t.removed)}catch{ht(wt,C)}}rn(ke.afterSanitizeAttributes,C,null)},tt=function Pe(C){let he=null,Ne=qt(C);for(rn(ke.beforeSanitizeShadowDOM,C,null);he=Ne.nextNode();)rn(ke.uponSanitizeShadowNode,he,null),Xt(he),gn(he),he.content instanceof o&&Pe(he.content);rn(ke.afterSanitizeShadowDOM,C,null)};return t.sanitize=function(Pe){let C=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},he=null,Ne=null,At=null,Ft=null;if(J=!Pe,J&&(Pe="<!-->"),typeof Pe!="string"&&!en(Pe))if(typeof Pe.toString=="function"){if(Pe=Pe.toString(),typeof Pe!="string")throw gs("dirty is not a string, aborting")}else throw gs("toString is not a function");if(!t.isSupported)return Pe;if(st||Ke(C),t.removed=[],typeof Pe=="string"&&(Ge=!1),Ge){if(Pe.nodeName){let tn=Ae(Pe.nodeName);if(!ne[tn]||Ue[tn])throw gs("root node is forbidden and cannot be sanitized in-place")}}else if(Pe instanceof i)he=Qt("<!---->"),Ne=he.ownerDocument.importNode(Pe,!0),Ne.nodeType===hs.element&&Ne.nodeName==="BODY"||Ne.nodeName==="HTML"?he=Ne:he.appendChild(Ne);else{if(!yt&&!Oe&&!Qe&&Pe.indexOf("<")===-1)return N&&Q?N.createHTML(Pe):Pe;if(he=Qt(Pe),!he)return yt?null:Q?M:""}he&&bt&&vt(he.firstChild);let wt=qt(Ge?Pe:he);for(;At=wt.nextNode();)Xt(At),gn(At),At.content instanceof o&&tt(At.content);if(Ge)return Pe;if(yt){if(re)for(Ft=I.call(he.ownerDocument);he.firstChild;)Ft.appendChild(he.firstChild);else Ft=he;return(Se.shadowroot||Se.shadowrootmode)&&(Ft=xe.call(r,Ft,!0)),Ft}let jt=Qe?he.outerHTML:he.innerHTML;return Qe&&ne["!doctype"]&&he.ownerDocument&&he.ownerDocument.doctype&&he.ownerDocument.doctype.name&&pn(Au,he.ownerDocument.doctype.name)&&(jt="<!DOCTYPE "+he.ownerDocument.doctype.name+`>
`+jt),Oe&&Do([fe,ae,Te],tn=>{jt=ms(jt,tn," ")}),N&&Q?N.createHTML(jt):jt},t.setConfig=function(){let Pe=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ke(Pe),st=!0},t.clearConfig=function(){v=null,st=!1},t.isValidAttribute=function(Pe,C,he){v||Ke({});let Ne=Ae(Pe),At=Ae(C);return on(Ne,At,he)},t.addHook=function(Pe,C){typeof C=="function"&&_s(ke[Pe],C)},t.removeHook=function(Pe,C){if(C!==void 0){let he=Tm(ke[Pe],C);return he===-1?void 0:Cm(ke[Pe],he,1)[0]}return gu(ke[Pe])},t.removeHooks=function(Pe){ke[Pe]=[]},t.removeAllHooks=function(){ke=ku()},t}var Eu=Su();var Xn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Fo=e=>(...t)=>({_$litDirective$:e,values:t}),Gr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,n,r){this._$Ct=t,this._$AM=n,this._$Ci=r}_$AS(t,n){return this.update(t,n)}update(t,n){return this.render(...n)}};var ys=class extends Gr{constructor(t){if(super(t),this.it=Zt,t.type!==Xn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Zt||t==null)return this._t=void 0,this.it=t;if(t===Cn)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let n=[t];return n.raw=n,this._t={_$litType$:this.constructor.resultType,strings:n,values:[]}}};ys.directiveName="unsafeHTML",ys.resultType=1;var Tu=Fo(ys);function Ai(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var xr=Ai();function Mu(e){xr=e}var $s={exec:()=>null};function Tt(e,t=""){let n=typeof e=="string"?e:e.source,r={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(mn.caret,"$1"),n=n.replace(s,a),r},getRegex:()=>new RegExp(n,t)};return r}var Gm=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),mn={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},Km=/^(?:[ \t]*(?:\n|$))+/,Vm=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ym=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,xs=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Zm=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Si=/(?:[*+-]|\d{1,9}[.)])/,Du=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Nu=Tt(Du).replace(/bull/g,Si).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Qm=Tt(Du).replace(/bull/g,Si).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ei=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Xm=/^[^\n]+/,Ti=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Jm=Tt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ti).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),eg=Tt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Si).getRegex(),Ho="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ci=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,tg=Tt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ci).replace("tag",Ho).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),qu=Tt(Ei).replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ho).getRegex(),ng=Tt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",qu).getRegex(),Ri={blockquote:ng,code:Vm,def:Jm,fences:Ym,heading:Zm,hr:xs,html:tg,lheading:Nu,list:eg,newline:Km,paragraph:qu,table:$s,text:Xm},Cu=Tt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ho).getRegex(),rg={...Ri,lheading:Qm,table:Cu,paragraph:Tt(Ei).replace("hr",xs).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Cu).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ho).getRegex()},sg={...Ri,html:Tt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ci).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$s,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Tt(Ei).replace("hr",xs).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Nu).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},og=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ag=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Fu=/^( {2,}|\\)\n(?!\s*$)/,ig=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Go=/[\p{P}\p{S}]/u,Oi=/[\s\p{P}\p{S}]/u,ju=/[^\s\p{P}\p{S}]/u,lg=Tt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Oi).getRegex(),Bu=/(?!~)[\p{P}\p{S}]/u,cg=/(?!~)[\s\p{P}\p{S}]/u,ug=/(?:[^\s\p{P}\p{S}]|~)/u,dg=Tt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Gm?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Uu=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,pg=Tt(Uu,"u").replace(/punct/g,Go).getRegex(),fg=Tt(Uu,"u").replace(/punct/g,Bu).getRegex(),Wu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",_g=Tt(Wu,"gu").replace(/notPunctSpace/g,ju).replace(/punctSpace/g,Oi).replace(/punct/g,Go).getRegex(),mg=Tt(Wu,"gu").replace(/notPunctSpace/g,ug).replace(/punctSpace/g,cg).replace(/punct/g,Bu).getRegex(),gg=Tt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ju).replace(/punctSpace/g,Oi).replace(/punct/g,Go).getRegex(),bg=Tt(/\\(punct)/,"gu").replace(/punct/g,Go).getRegex(),hg=Tt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),yg=Tt(Ci).replace("(?:-->|$)","-->").getRegex(),vg=Tt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",yg).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Uo=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,wg=Tt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Uo).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),zu=Tt(/^!?\[(label)\]\[(ref)\]/).replace("label",Uo).replace("ref",Ti).getRegex(),Hu=Tt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ti).getRegex(),kg=Tt("reflink|nolink(?!\\()","g").replace("reflink",zu).replace("nolink",Hu).getRegex(),Ru=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Li={_backpedal:$s,anyPunctuation:bg,autolink:hg,blockSkip:dg,br:Fu,code:ag,del:$s,emStrongLDelim:pg,emStrongRDelimAst:_g,emStrongRDelimUnd:gg,escape:og,link:wg,nolink:Hu,punctuation:lg,reflink:zu,reflinkSearch:kg,tag:vg,text:ig,url:$s},$g={...Li,link:Tt(/^!?\[(label)\]\((.*?)\)/).replace("label",Uo).getRegex(),reflink:Tt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Uo).getRegex()},ki={...Li,emStrongRDelimAst:mg,emStrongLDelim:fg,url:Tt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Ru).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Tt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Ru).getRegex()},xg={...ki,br:Tt(Fu).replace("{2,}","*").getRegex(),text:Tt(ki.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},jo={normal:Ri,gfm:rg,pedantic:sg},vs={normal:Li,gfm:ki,breaks:xg,pedantic:$g},Ag={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Ou=e=>Ag[e];function Jn(e,t){if(t){if(mn.escapeTest.test(e))return e.replace(mn.escapeReplace,Ou)}else if(mn.escapeTestNoEncode.test(e))return e.replace(mn.escapeReplaceNoEncode,Ou);return e}function Lu(e){try{e=encodeURI(e).replace(mn.percentDecode,"%")}catch{return null}return e}function Iu(e,t){let n=e.replace(mn.findPipe,(o,a,i)=>{let l=!1,u=a;for(;--u>=0&&i[u]==="\\";)l=!l;return l?"|":" |"}),r=n.split(mn.splitPipe),s=0;if(r[0].trim()||r.shift(),r.length>0&&!r.at(-1)?.trim()&&r.pop(),t)if(r.length>t)r.splice(t);else for(;r.length<t;)r.push("");for(;s<r.length;s++)r[s]=r[s].trim().replace(mn.slashPipe,"|");return r}function ws(e,t,n){let r=e.length;if(r===0)return"";let s=0;for(;s<r;){let o=e.charAt(r-s-1);if(o===t&&!n)s++;else if(o!==t&&n)s++;else break}return e.slice(0,r-s)}function Sg(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]==="\\")r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}function Pu(e,t,n,r,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:o,title:a,text:i,tokens:r.inlineTokens(i)};return r.state.inLink=!1,l}function Eg(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let s=r[1];return t.split(`
`).map(o=>{let a=o.match(n.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var Wo=class{constructor(e){Nt(this,"options");Nt(this,"rules");Nt(this,"lexer");this.options=e||xr}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:ws(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=Eg(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=ws(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ws(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=ws(t[0],`
`).split(`
`),r="",s="",o=[];for(;n.length>0;){let a=!1,i=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))i.push(n[l]),a=!0;else if(!a)i.push(n[l]);else break;n=n.slice(l);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;let _=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=_,n.length===0)break;let h=o.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,k=b.raw+`
`+n.join(`
`),D=this.blockquote(k);o[o.length-1]=D,r=r.substring(0,r.length-b.raw.length)+D.raw,s=s.substring(0,s.length-b.text.length)+D.text;break}else if(h?.type==="list"){let b=h,k=b.raw+`
`+n.join(`
`),D=this.list(k);o[o.length-1]=D,r=r.substring(0,r.length-h.raw.length)+D.raw,s=s.substring(0,s.length-b.raw.length)+D.raw,n=k.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,s={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let o=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let _=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,D=>" ".repeat(3*D.length)),h=e.split(`
`,1)[0],b=!_.trim(),k=0;if(this.options.pedantic?(k=2,d=_.trimStart()):b?k=t[1].length+1:(k=t[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=_.slice(k),k+=t[1].length),b&&this.rules.other.blankLine.test(h)&&(u+=h+`
`,e=e.substring(h.length+1),l=!0),!l){let D=this.rules.other.nextBulletRegex(k),B=this.rules.other.hrRegex(k),Y=this.rules.other.fencesBeginRegex(k),le=this.rules.other.headingBeginRegex(k),K=this.rules.other.htmlBeginRegex(k);for(;e;){let N=e.split(`
`,1)[0],M;if(h=N,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),M=h):M=h.replace(this.rules.other.tabCharGlobal,"    "),Y.test(h)||le.test(h)||K.test(h)||D.test(h)||B.test(h))break;if(M.search(this.rules.other.nonSpaceChar)>=k||!h.trim())d+=`
`+M.slice(k);else{if(b||_.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||Y.test(_)||le.test(_)||B.test(_))break;d+=`
`+h}!b&&!h.trim()&&(b=!0),u+=N+`
`,e=e.substring(N.length+1),_=M.slice(k)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(l.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};l.checked=d.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=d.raw+l.tokens[0].raw,l.tokens[0].text=d.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(d)):l.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):l.tokens.unshift(d)}}if(!s.loose){let u=l.tokens.filter(_=>_.type==="space"),d=u.length>0&&u.some(_=>this.rules.other.anyLine.test(_.raw));s.loose=d}}if(s.loose)for(let l of s.items){l.loose=!0;for(let u of l.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:r,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Iu(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<n.length;a++)o.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(Iu(a,o.header.length).map((i,l)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[l]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let o=ws(n.slice(0,-1),"\\");if((n.length-o.length)%2===0)return}else{let o=Sg(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let r=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),Pu(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[r.toLowerCase()];if(!s){let o=n[0].charAt(0);return{type:"text",raw:o,text:o}}return Pu(n,s,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!(!r||r[3]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(r[1]||r[2])||!n||this.rules.inline.punctuation.exec(n))){let s=[...r[0]].length-1,o,a,i=s,l=0,u=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(r=u.exec(t))!=null;){if(o=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!o)continue;if(a=[...o].length,r[3]||r[4]){i+=a;continue}else if((r[5]||r[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+l);let d=[...r[0]][0].length,_=e.slice(0,s+r.index+d+a);if(Math.min(s,a)%2){let b=_.slice(1,-1);return{type:"em",raw:_,text:b,tokens:this.lexer.inlineTokens(b)}}let h=_.slice(2,-2);return{type:"strong",raw:_,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0]}return{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},Dn=class $i{constructor(t){Nt(this,"tokens");Nt(this,"options");Nt(this,"state");Nt(this,"inlineQueue");Nt(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||xr,this.options.tokenizer=this.options.tokenizer||new Wo,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:mn,block:jo.normal,inline:vs.normal};this.options.pedantic?(n.block=jo.pedantic,n.inline=vs.pedantic):this.options.gfm&&(n.block=jo.gfm,this.options.breaks?n.inline=vs.breaks:n.inline=vs.gfm),this.tokenizer.rules=n}static get rules(){return{block:jo,inline:vs}}static lex(t,n){return new $i(n).lex(t)}static lexInline(t,n){return new $i(n).inlineTokens(t)}lex(t){t=t.replace(mn.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let r=this.inlineQueue[n];this.inlineTokens(r.src,r.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],r=!1){for(this.options.pedantic&&(t=t.replace(mn.tabCharGlobal,"    ").replace(mn.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),l;this.options.extensions.startBlock.forEach(u=>{l=u.call({lexer:this},i),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=n.at(-1);r&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),r=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){let r=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(r))!=null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(r))!=null;)r=r.slice(0,s.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(r))!=null;)o=s[2]?s[2].length:0,r=r.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let a=!1,i="";for(;t;){a||(i=""),a=!1;let l;if(this.options.extensions?.inline?.some(d=>(l=d.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let d=n.at(-1);l.type==="text"&&d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,r,i)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,_=t.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},_),typeof h=="number"&&h>=0&&(d=Math.min(d,h))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(l=this.tokenizer.inlineText(u)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(i=l.raw.slice(-1)),a=!0;let d=n.at(-1);d?.type==="text"?(d.raw+=l.raw,d.text+=l.text):n.push(l);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return n}},zo=class{constructor(e){Nt(this,"options");Nt(this,"parser");this.options=e||xr}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(mn.notSpaceStart)?.[0],s=e.replace(mn.endingNewline,"")+`
`;return r?'<pre><code class="language-'+Jn(r)+'">'+(n?s:Jn(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:Jn(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let i=e.items[a];r+=this.listitem(i)}let s=t?"ol":"ul",o=t&&n!==1?' start="'+n+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let r="";for(let s=0;s<e.rows.length;s++){let o=e.rows[s];n="";for(let a=0;a<o.length;a++)n+=this.tablecell(o[a]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Jn(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),s=Lu(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Jn(t)+'"'),o+=">"+r+"</a>",o}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let s=Lu(e);if(s===null)return Jn(n);e=s;let o=`<img src="${e}" alt="${n}"`;return t&&(o+=` title="${Jn(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Jn(e.text)}},Ii=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},Nn=class xi{constructor(t){Nt(this,"options");Nt(this,"renderer");Nt(this,"textRenderer");this.options=t||xr,this.options.renderer=this.options.renderer||new zo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ii}static parse(t,n){return new xi(n).parse(t)}static parseInline(t,n){return new xi(n).parseInline(t)}parse(t){let n="";for(let r=0;r<t.length;r++){let s=t[r];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=i||"";continue}}let o=s;switch(o.type){case"space":{n+=this.renderer.space(o);break}case"hr":{n+=this.renderer.hr(o);break}case"heading":{n+=this.renderer.heading(o);break}case"code":{n+=this.renderer.code(o);break}case"table":{n+=this.renderer.table(o);break}case"blockquote":{n+=this.renderer.blockquote(o);break}case"list":{n+=this.renderer.list(o);break}case"checkbox":{n+=this.renderer.checkbox(o);break}case"html":{n+=this.renderer.html(o);break}case"def":{n+=this.renderer.def(o);break}case"paragraph":{n+=this.renderer.paragraph(o);break}case"text":{n+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}parseInline(t,n=this.renderer){let r="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){r+=i||"";continue}}let a=o;switch(a.type){case"escape":{r+=n.text(a);break}case"html":{r+=n.html(a);break}case"link":{r+=n.link(a);break}case"image":{r+=n.image(a);break}case"checkbox":{r+=n.checkbox(a);break}case"strong":{r+=n.strong(a);break}case"em":{r+=n.em(a);break}case"codespan":{r+=n.codespan(a);break}case"br":{r+=n.br(a);break}case"del":{r+=n.del(a);break}case"text":{r+=n.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return r}},Bo,ks=(Bo=class{constructor(e){Nt(this,"options");Nt(this,"block");this.options=e||xr}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?Dn.lex:Dn.lexInline}provideParser(){return this.block?Nn.parse:Nn.parseInline}},Nt(Bo,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),Nt(Bo,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Bo),Tg=class{constructor(...e){Nt(this,"defaults",Ai());Nt(this,"options",this.setOptions);Nt(this,"parse",this.parseMarkdown(!0));Nt(this,"parseInline",this.parseMarkdown(!1));Nt(this,"Parser",Nn);Nt(this,"Renderer",zo);Nt(this,"TextRenderer",Ii);Nt(this,"Lexer",Dn);Nt(this,"Tokenizer",Wo);Nt(this,"Hooks",ks);this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let s=r;for(let o of s.header)n=n.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=r;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=r;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),r.extensions=t),n.renderer){let s=this.defaults.renderer||new zo(this.defaults);for(let o in n.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=n.renderer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d||""}}r.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Wo(this.defaults);for(let o in n.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=n.tokenizer[a],l=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new ks;for(let o in n.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=n.hooks[a],l=s[a];ks.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&ks.passThroughHooksRespectAsync.has(o))return(async()=>{let _=await i.call(s,u);return l.call(s,_)})();let d=i.call(s,u);return l.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let _=await i.apply(s,u);return _===!1&&(_=await l.apply(s,u)),_})();let d=i.apply(s,u);return d===!1&&(d=l.apply(s,u)),d}}r.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,o=n.walkTokens;r.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Dn.lex(e,t??this.defaults)}parser(e,t){return Nn.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},s={...this.defaults,...r},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?Nn.parse:Nn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?Dn.lex:Dn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?Nn.parse:Nn.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+Jn(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}},$r=new Tg;function It(e,t){return $r.parse(e,t)}It.options=It.setOptions=function(e){return $r.setOptions(e),It.defaults=$r.defaults,Mu(It.defaults),It};It.getDefaults=Ai;It.defaults=xr;It.use=function(...e){return $r.use(...e),It.defaults=$r.defaults,Mu(It.defaults),It};It.walkTokens=function(e,t){return $r.walkTokens(e,t)};It.parseInline=$r.parseInline;It.Parser=Nn;It.parser=Nn.parse;It.Renderer=zo;It.TextRenderer=Ii;It.Lexer=Dn;It.lexer=Dn.lex;It.Tokenizer=Wo;It.Hooks=ks;It.parse=It;var gk=It.options,bk=It.setOptions,hk=It.use,yk=It.walkTokens,vk=It.parseInline;var wk=Nn.parse,kk=Dn.lex;function ar(e){let t=It.parse(e),n=Eu.sanitize(t);return Tu(n)}function er(e,t){return c`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function Kr(e){return e.loading?c`<div class="prompt-block__status">불러오는 중…</div>`:e.error?c`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function Ko(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}var Ku={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},Cg={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},Rg=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,Og=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function qn(e){return!!e&&typeof e=="object"}function Pi(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function Mi(e,t){let n=Pi(e),r=Pi(t),s=new Map;for(let i of n)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of r){let l=s.get(i)||0;l>0?s.set(i,l-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Vu(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>qn(s)&&typeof s.text=="string"?s.text:"").join(""):qn(e)&&typeof e.text=="string"&&(t=e.text);let r=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return r.length>120?`${r.slice(0,117)}\u2026`:r}function Lg(e){let t=String(e.name||""),n=e.input||{},r={kind:"tool",tool:t,icon:Ku[t]||"\u{1F527}",input:n,expandable:!0};if((t==="Read"||t==="Write")&&(r.path=String(n.file_path||n.path||"")),t==="Write"&&(r.added=Pi(n.content).length),t==="Edit"){r.path=String(n.file_path||n.path||"");let{added:s,removed:o}=Mi(n.old_string,n.new_string);r.added=s,r.removed=o}if(t==="MultiEdit"){r.path=String(n.file_path||n.path||"");let s=0,o=0,a=Array.isArray(n.edits)?n.edits:[];for(let i of a){let l=Mi(qn(i)?i.old_string:"",qn(i)?i.new_string:"");s+=l.added,o+=l.removed}r.added=s,r.removed=o}return t==="Bash"&&(r.command=String(n.command||"")),(t==="Grep"||t==="Glob")&&(r.command=String(n.pattern||n.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(r.launch_id=e.id),typeof n.description=="string"&&(r.command=n.description)),r}function Di(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}var Ig=/<system-reminder>[\s\S]*?<\/system-reminder>/g;function Yu(e){let t;if(typeof e=="string")t=e;else if(Array.isArray(e))t=e.filter(r=>qn(r)&&r.type==="text"&&typeof r.text=="string").map(r=>String(r.text)).join(`
`);else return null;let n=t.replace(Ig,"").trim();return n.length>0?{kind:"user",text:n}:null}function Ni(e){let t=e.split(/\r?\n/).find(r=>r.trim().length>0)||"",n=Rg.exec(t);return n?{kind:"gate",gate:n[2]==="implementation"?"impl":n[2],reviewer:n[3],verdict:n[4],time:n[5]?n[5].trim():void 0,text:t.trim()}:Og.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function Pg(e,t){if(e.subtype==="init"){let n=typeof e.model=="string"?e.model:"";return t.progress=null,[{kind:"thinking",text:n?`\uC138\uC158 \uC2DC\uC791 \xB7 ${n}`:"\uC138\uC158 \uC2DC\uC791"}]}if(e.subtype==="thinking_tokens"){let r=`\uC0DD\uAC01 \uC911\u2026 ${typeof e.estimated_tokens=="number"&&Number.isFinite(e.estimated_tokens)?Math.max(0,Math.round(e.estimated_tokens)):0} \uD1A0\uD070`;return t.progress?(t.progress.text=r,[]):(t.progress={kind:"thinking",text:r},[t.progress])}return[]}function Mg(e,t){let n=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[],o=[];for(let a of s)if(qn(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Ni(a.text));else if(a.type==="thinking"){let i=Di(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=Lg(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return n?Gu(o,n):o}if(e.type==="user"){let r=e.message,s=r&&Array.isArray(r.content)?r.content:[];for(let a of s)if(qn(a)&&a.type==="tool_result"){let i=t.get(String(a.tool_use_id));if(i){let l=Vu(a.content);i.result=l,i.output=typeof a.content=="string"?a.content:l,a.is_error===!0&&(i.is_error=!0)}}let o=Yu(r&&r.content);return o?[o]:[]}if(e.type==="result"){let r=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:r,text:typeof e.result=="string"?e.result:r?"DONE":""};return n?Gu([s],n):[s]}return[]}function Gu(e,t){for(let n of e)n.parent_tool_use_id=t;return e}function Dg(e){let t=typeof e.command=="string"?e.command:"",n=Vu(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",n].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ku.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function Ng(e){if(e.type==="item.completed"&&qn(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Ni(t.text)];if(t.type==="user_message"){let n=Yu(t.text);return n?[n]:[]}if(t.type==="reasoning"){let n=Di(t.text);return n?[n]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[Dg(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function qg(e){if(e.schema!=="codex-delegation-monitor-v1"||!qn(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&qn(t.item)){let n=t.item;if(typeof n.id!="string"||n.id.length===0)return[];if(t.type==="item.completed"&&n.kind==="agent_message"&&typeof n.text=="string"&&n.text.trim().length>0)return[Ni(n.text)];if(t.type==="item.completed"&&n.kind==="reasoning"){let i=Di(n.text);return i?[i]:[]}if(n.kind!=="activity"||typeof n.activity!="string")return[];let r=Cg[n.activity];if(!r)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(n.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(n.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${r} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Fg(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function jg(e){let t=e;if(typeof e=="string"){let n=e.trim();if(n.length===0)return null;try{t=JSON.parse(n)}catch{return null}}return qn(t)?t:null}function Zu(e={}){let t=e.skip_delegated===!0,n=new Map,r={progress:null};return{push(s){let o=jg(s);if(!o)return[];if(t&&typeof o.parent_tool_use_id=="string"&&o.parent_tool_use_id.length>0)return[];if(o.type==="system"&&o.schema!=="codex-delegation-monitor-v1")return Pg(o,r);let a=o.schema==="codex-delegation-monitor-v1"?qg(o):Fg(o)?Ng(o):Mg(o,n);return a.length>0&&(r.progress=null),a}}}function qi(e){let t=[],n=Zu(),r=Array.isArray(e)?e:[];for(let s of r)for(let o of n.push(s))t.push(o);return t}var Bg=5,Ug=10,Wg=/Task\s+#(\d+)/,zg=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,Hg=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function As(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function Gg(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function Kg(e){for(let t=e.length-1;t>=0;t-=1){let n=e[t];if(n.kind==="phase"||n.kind==="gate")return n.text||null}return null}function Vg(e){let t=new Map,n=0;for(let s of e){if(s.kind!=="tool")continue;n+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let l=Wg.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!l||u.length===0)continue;t.set(l[1],{label:u,active:o.status==="in_progress"?n:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?n:0)}let r=null;for(let s of t.values())s.active>0&&(!r||s.active>r.active)&&(r=s);return r?r.label:null}function Yg(e){if(e.tool==="Bash"){let t=e.command||"";return zg.test(t)?"~ PR/\uAC8C\uC2DC \uC911":Hg.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function Zg(e){let t=e.filter(s=>s.kind==="tool").slice(-Ug),n=new Map;t.forEach((s,o)=>{let a=Yg(s);if(!a)return;let i=n.get(a)||{count:0,last:-1};i.count+=1,i.last=o,n.set(a,i)});let r=null;for(let[s,o]of n)(!r||o.count>r.count||o.count===r.count&&o.last>r.last)&&(r={label:s,count:o.count,last:o.last});return r?r.label:null}function Qg(e){let t=Kg(e);if(t)return{text:t,guess:!1};let n=Vg(e);if(n)return{text:n,guess:!1};let r=Zg(e);return r?{text:r,guess:!0}:null}function Xg(e,t){if(typeof e!="number")return"";let n=Math.max(0,Math.floor((t-e)/1e3));return n<60?`${n}\uCD08 \uC804`:hn(e,t)}function Vr(e,t={}){let{transport:n,sessionLogStore:r,onClose:s}=t,o=null,a=null,i=null,l=null,u=null,d=!1,_={},h=!0,b=new Set,k=new Set,D=null,B=null,Y=!1,le=!1,K=!1,N=null,M=null;function G(){Y=!1,le=!1,K=!1,N=null,M=null}async function L(re){if(n){le=!0,K=!1,Ue();try{let Q=await Promise.resolve(n("get-attempt-prompt",{attempt_id:re,...u?{root_dir:u}:{}}));if(o!==re)return;!Q||typeof Q!="object"||Array.isArray(Q)?K=!0:(N=Q,M=re)}catch{o===re&&(K=!0)}finally{o===re&&(le=!1,Ue())}}}function I(){if(Y=!Y,Y&&o&&M!==o){L(o);return}Ue()}function te(){if(!Y)return"";let re=Kr({loading:le,error:K});if(re)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        ${re}
      </div>`;if(!N)return"";if(N.missing)return c`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=Ko(N.recorded_at);return c`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?c`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof N.task_prompt=="string"?er("\uACFC\uC5C5 (user)",N.task_prompt):""}
      ${typeof N.system_prompt=="string"?er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",N.system_prompt):""}
    </div>`}function xe(){if(!l||!r)return[];let re=r.get(l);return qi(re?re.lines:[])}function ke(){if(!l||!r)return null;let re=r.get(l),Q=re?re.last_event_at:null;return typeof Q=="number"?Q:null}function fe(){return _.status==="running"}function ae(){if(fe()&&o){B||(B=setInterval(()=>Ue(),1e3));return}Te()}function Te(){B&&(clearInterval(B),B=null)}function Ie(re){let Q=[],je=0;for(;je<re.length;){let{idx:it,line:We}=re[je];if(We.kind==="tool"){let we=je;for(;we<re.length&&re[we].line.kind==="tool"&&re[we].line.tool===We.tool;)we+=1;if(we-je>=Bg&&!k.has(it)){Q.push({kind:"group",idx:it,tool:We.tool||"",lines:re.slice(je,we)}),je=we;continue}}Q.push({kind:"line",idx:it,line:We}),je+=1}return Q}function $e(re){let Q=[],je=new Map;for(let we=0;we<re.length;we+=1){let Ge=re[we],dt=Ge.parent_tool_use_id;if(typeof dt=="string"&&dt.length>0){let _t=je.get(dt);_t||(_t={kind:"subagent",idx:we,launch_id:dt,agent_type:null,header:null,lines:[]},je.set(dt,_t),Q.push(_t)),_t.lines.push({idx:we,line:Ge});continue}if(Ge.kind==="tool"&&Ge.tool==="Agent"&&typeof Ge.launch_id=="string"&&Ge.launch_id.length>0){let _t=ee(Ge),mt=je.get(Ge.launch_id);if(mt){mt.header={idx:we,line:Ge},mt.agent_type=_t;continue}let Pt={kind:"subagent",idx:we,launch_id:Ge.launch_id,agent_type:_t,header:{idx:we,line:Ge},lines:[]};je.set(Ge.launch_id,Pt),Q.push(Pt);continue}Q.push({kind:"entry",idx:we,line:Ge})}let it=[],We=0;for(;We<Q.length;){if(Q[We].kind!=="entry"){it.push(Q[We]),We+=1;continue}let we=We;for(;we<Q.length&&Q[we].kind==="entry";)we+=1;it.push(...Ie(Q.slice(We,we))),We=we}return it}function ee(re){let Q=re.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function Z(re){for(let Q=re.length-1;Q>=0;Q-=1){let je=re[Q];if(je.kind==="result"||je.kind==="error")return null;if(je.kind==="tool"&&!Object.hasOwn(je,"result"))return je}return null}function Ce(re){for(let Q=re.length-1;Q>=0;Q-=1)if(re[Q].kind==="thinking")return re[Q];return null}function z(re,Q){if(Q.kind==="gate")return c`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return c`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return c`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${ar(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let je=b.has(re);return c`<div
        class="sv__think${je?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>St(re)}
      >
        <span class="sv__think-line">💭 ${As(Q.text)}</span>
        ${je?c`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="user"){let je=b.has(re);return c`<div
        class="sv__line sv__line--user${je?" sv__line--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>St(re)}
      >
        <span class="sv__user-line">▷ ${As(Q.text)}</span>
        ${je?c`<pre class="sv__user-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return c`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let je=b.has(re),it=Q.tool==="Bash"?Gg(Q.command):0,We=Q.tool==="Bash"?it>1?As(Q.command):Q.command:Q.path||Q.command||"";return c`<div
        class="sv__tool${je?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>St(re)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${We?c`<span class="sv__tool-detail">${We}</span>`:""}
          ${it>1?c`<span class="sv__tool-more">⋯ ${it}줄</span>`:""}
          ${typeof Q.added=="number"?c`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?c`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?c`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${je?c`<pre class="sv__tool-expand">${ne(Q)}</pre>`:""}
      </div>`}return c`<div class="sv__as">${ar(Q.text||"")}</div>`}function ne(re){let Q=[];if(re.tool==="Bash"&&typeof re.command=="string"&&re.command.length>0)Q.push(re.command);else if(re.input!==void 0)try{Q.push(`input: ${JSON.stringify(re.input,null,2)}`)}catch{}return typeof re.output=="string"&&re.output.length>0&&Q.push(`output:
${re.output}`),Q.join(`

`)}function ge(){if(!o)return c``;let re=xe(),Q=(a?[_.agent_type,_.model,_.effort]:[_.runner,_.model,_.effort]).filter(Boolean).join(" \xB7 "),je=_.session_id||"",it=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${h?"ON":"OFF"}`,We=fe(),we=We?Xg(ke(),Date.now()):"",Ge=We?Z(re):null,dt=We?Ce(re):null,_t=Qg(re);return c`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id"
          >${_.label||(a?_.role||"":o)}</span
        >
        ${_t?c`<span
              class="sv__stage${_t.guess?" sv__stage--guess":""}"
              title=${_t.text}
              >${_t.text}</span
            >`:""}
        ${We?c`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${we?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${we}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${we?c`<span class="sv__live-ago">${we}</span>`:""}</span
            >`:""}
        ${je?c`<button
              type="button"
              class="sv__session"
              title=${je}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${je}`}
              @click=${()=>ft(je)}
            >
              ⧉ ${je.slice(0,8)}
            </button>`:""}
        ${_.resume_command?c`<button
              type="button"
              class="sv__resume-cmd"
              title=${_.resume_command}
              aria-label=${`\uC7AC\uAC1C \uBA85\uB839 \uBCF5\uC0AC: ${_.resume_command}`}
              @click=${()=>ft(_.resume_command||"")}
            >
              ⧉ 재개 명령
            </button>`:""}
        ${Q?c`<span class="sv__meta">${Q}</span>`:""}
        ${_.worktree?c`<span class="sv__wt" title=${_.worktree}
              >${_.worktree}</span
            >`:""}
        ${a||d?"":c`<button
              type="button"
              class="sv__prompt-toggle${Y?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${Y?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${I}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${h?" sv__follow--on":""}"
          aria-pressed=${h?"true":"false"}
          aria-label=${it}
          @click=${xt}
        >
          <span class="sv__follow-full">⇣ ${it}</span>
          <span class="sv__follow-short">⇣ ${h?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>yt()}
        >
          ✕
        </button>
      </div>
      ${a||d?"":te()}
      <div class="sv__body">
        ${re.length===0?c`<div class="sv__empty">세션 로그 없음</div>`:$e(re).map(mt=>mt.kind==="subagent"?Ye(mt):mt.kind==="group"?Se(mt):z(mt.idx,mt.line))}
      </div>
      ${Ge||dt?c`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${Ge?c`<span class="sv__now-icon">${Ge.icon}</span>
                  <span class="sv__now-name">${Ge.tool}</span>
                  <span class="sv__now-detail"
                    >${Ge.tool==="Bash"?As(Ge.command):Ge.path||Ge.command||""}</span
                  >`:""}
            ${dt?c`<span class="sv__now-think"
                  >💭 ${As(dt.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function Se(re){return c`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>ue(re.idx)}
    >
      <span class="sv__group-icon">${re.lines[0].line.icon}</span>
      <span class="sv__group-name">${re.tool}</span>
      <span class="sv__group-count">${re.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ye(re){let Q=k.has(re.idx),je=re.header?re.header.line:null,it=je?je.is_error===!0?"\u2717":typeof je.result=="string"?"\u2713":"\u27F3":"",We=je&&je.command?je.command:"";return c`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>ue(re.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${re.agent_type||"subagent"}</span>
        ${We?c`<span class="sv__sub-detail">${We}</span>`:""}
        <span class="sv__sub-count">${re.lines.length}줄</span>
        ${it?c`<span class="sv__sub-state">${it}</span>`:""}
        ${Q?"":c`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?c`<div class="sv__sub-body">
            ${Ie(re.lines).map(we=>we.kind==="group"?Se(we):z(we.idx,we.line))}
          </div>`:""}
    </div>`}function ue(re){k.add(re),Ue()}function Ue(){at(ge(),e),ae(),h&&gt()}function gt(){let re=e.querySelector(".sv__body");re&&(re.scrollTop=re.scrollHeight)}function St(re){b.has(re)?b.delete(re):b.add(re),Ue()}function xt(){h=!h,Ue()}function ft(re){xn(re).then(Q=>{Q?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function T(re){!o||!re||(_={..._,...re},Ue())}function ce(re){let Q=re.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&h&&(h=!1,Ue())}e.addEventListener("scroll",ce,!0);function Oe(re){let Q=re.target;!Q||typeof Q.closest!="function"||e.contains(Q)||Q.closest("dialog")||Q.closest(".md-viewer-root")||yt()}let Me=!1;function Qe(){Me||(document.addEventListener("mousedown",Oe),Me=!0)}function st(){Me&&(document.removeEventListener("mousedown",Oe),Me=!1)}function bt(re){let Q=re&&re.attempt_id;if(!Q)return;let je=typeof re.launch_id=="string"&&re.launch_id.length>0?re.launch_id:null,it=re.session_ref&&typeof re.session_ref=="object"?re.session_ref:null;if(je&&it)return;let We=l;o=Q,a=je,i=it,l=a?`session-log:${o}:${a}`:`session-log:${o}`,n&&We&&We!==l&&Promise.resolve(n("unsubscribe-session-log",{id:We})).catch(()=>{}),u=typeof re.root_dir=="string"&&re.root_dir.length>0?re.root_dir:null,_=re.meta||{},d=re.hide_prompt===!0,h=!0,b.clear(),k.clear(),G(),!D&&r&&(D=r.subscribe(Ue)),n&&Promise.resolve(n("subscribe-session-log",{id:l,attempt_id:o,...a?{launch_id:a}:{},...i?{session_ref:i}:{},...u?{root_dir:u}:{}})).catch(()=>{}),Qe(),Ue()}function yt(){let re=l;st(),o=null,a=null,i=null,l=null,u=null,d=!1,b.clear(),k.clear(),G(),Te(),n&&re&&Promise.resolve(n("unsubscribe-session-log",{id:re})).catch(()=>{}),at(c``,e),s&&s()}return{open:bt,updateMeta:T,close:yt,isOpen(){return o!==null},destroy(){Te(),st(),D&&(D(),D=null),e.removeEventListener("scroll",ce,!0),o=null,a=null,i=null,l=null,u=null,d=!1,at(c``,e)}}}function Jg(e){let t=e&&typeof e=="object"?e:{},n=t.metadata&&typeof t.metadata=="object"?t.metadata:{},r=Vo(t.spec_id),s=Vo(n.spec_id);return r?{path:r,source:"native",conflict:s.length>0&&s!==r}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Vo(e){return typeof e=="string"?e.trim():""}function eb(e){let t=Jg(e);if(t.path)return t;let n=Vo(Qu(e).spec_path);return n?{path:n,source:"draft",conflict:!1}:t}function Qu(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}var tb=/^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;function Ss(e){let t=eb(e),n=Vo(Qu(e).spec_review),r=tb.test(n),s=r&&n.slice(0,n.indexOf("@"))==="skipped";if(t.source==="none")return{...t,evidence:"none",skipped:s};let o=t.source!=="draft"&&r;return{...t,evidence:o?"published":"draft",skipped:s}}function nb(e){return["plan_review","plan_approval","plan_check"].some(t=>{let n=e[t];return typeof n=="string"&&n.trim().length>0})}function rb(e){let t=e&&e.metadata||{},n=Ss(e),r=[];return n.path&&r.push({kind:"spec",path:n.path,missing_state:n.evidence==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&r.push({kind:"plan",path:t.plan_path.trim(),missing_state:nb(t)?null:"plan_pending"}),r}function Xu(e,t){let n=rb(e);return c`
    <div class="detail-section-label">Artifacts</div>
    ${n.length===0?c`<div class="detail-empty">산출물 없음</div>`:c`
          ${n.map(r=>c`<div class="detail-art">
                <span class="detail-art__ic" aria-hidden="true">▤</span>
                <button
                  type="button"
                  class="detail-art__path"
                  title=${`${r.path} \xB7 \uD074\uB9AD\uD558\uBA74 \uBCF5\uC0AC`}
                  @click=${s=>t.onCopyPath(s,r.path)}
                >
                  ${r.path}
                </button>
                ${r.missing_state==="spec_draft"?c`<span class="detail-art__badge">draft</span>`:null}
                <button
                  type="button"
                  class="detail-art__op"
                  @click=${s=>t.onOpenDoc(s,r.path,r.missing_state)}
                >
                  열기
                </button>
              </div>`)}
          <div class="detail-art__cap">경로 클릭 = 복사 · 열기 = 뷰어</div>
        `}
  `}var sb="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",ob=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,ab=/^\*\*결론\*\* — (.+)$/;function Yo(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==sb)return null;let n=ob.exec(t[1]||"");if(!n)return null;let r=n[1].split(" ")[0],s=n[2],o=n[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?ab.exec(t[a]):null,l=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:r,identifier:s,timestamp:o,conclusion:l,body:t.slice(u).join(`
`).trim()}}var Ju=20;function ed(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let n=String(t.getMonth()+1).padStart(2,"0"),r=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${n}-${r} ${s}:${o}`}function ib(e){return e.length>Ju?`${e.slice(0,Ju)}\u2026`:e}function lb(e,t,n,r){let s=`${t.lane} ${ib(t.identifier)}`;return c`<div class="detail-report">
    <button
      type="button"
      class="detail-report__head"
      data-comment-id=${e.id}
      aria-expanded=${r?"true":"false"}
      @click=${()=>n.onToggle&&n.onToggle(e.id)}
    >
      <span class="detail-report__tri">${r?"\u25BE":"\u25B8"}</span>
      <span class="detail-report__glyph">🤖</span>
      <span class="detail-report__meta">
        <span class="detail-report__kind">작업 보고서</span>
        <span
          class="detail-report__lane${t.lane==="worker"?" detail-report__lane--worker":""}"
          title=${`${t.lane} ${t.identifier} \xB7 ${t.timestamp}`}
          >${s}</span
        >
        <span class="detail-report__time">${ed(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${r&&t.body.length>0?c`<div class="detail-report__body">
          ${ar(t.body)}
        </div>`:""}
  </div>`}function cb(e){return c`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${ed(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${ar(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function td(e,t={},n={}){let r=Array.isArray(e)?e.filter(Boolean):[],s=n.expanded||new Set,o=typeof n.draft=="string"?n.draft:"",a=n.sending===!0,i=r.slice().sort((l,u)=>String(u.created_at||"").localeCompare(String(l.created_at||"")));return c`
    <div class="detail-section-label">댓글 (${r.length})</div>
    ${n.error?c`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?c`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:c`<div class="detail-comments" data-seam="comments">
            ${i.map(l=>{let u=Yo(typeof l.text=="string"?l.text:"");return u?lb(l,u,t,s.has(l.id)):cb(l)})}
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
  `}var{I:r$}=bc;var nd=e=>e.strings===void 0;var ub={},rd=(e,t=ub)=>e._$AH=t;var Ar=Fo(class extends Gr{constructor(e){if(super(e),e.type!==Xn.PROPERTY&&e.type!==Xn.ATTRIBUTE&&e.type!==Xn.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!nd(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Cn||t===Zt)return t;let n=e.element,r=e.name;if(e.type===Xn.PROPERTY){if(t===n[r])return Cn}else if(e.type===Xn.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Cn}else if(e.type===Xn.ATTRIBUTE&&n.getAttribute(r)===t+"")return Cn;return rd(e),t}});var Zo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],ji=[...Zo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],tr=["orchestration_model","orchestration_effort","orchestration_speed"],Qo=[...Zo,...tr],db=ji.filter(e=>Qo.includes(e)),sd=["delegated","main"],Xo=["inherit","claude","codex"],Es=["default","fast"],Ts=["standard","fast_track"],Cs=["codex","opus","fable","self","skip"],Jo=["codex","fable","skip"],ea=["low","medium","high","xhigh"],Sn="auto";function An(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function od(e){if(!An(e)||!An(e.runners))return[];let t=[];for(let[n,r]of Object.entries(e.runners))An(r)&&An(r.models)&&t.push([n,Object.keys(r.models)]);return t}function Yr(e,t){let n=od(e),r=t&&t!=="inherit"?n.filter(([s])=>s===t):n;return[Sn,...r.flatMap(([,s])=>s)]}function ad(e,t,n,r){if(!An(e)||!An(e.runners))return[Sn];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!An(a)||!An(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,l]of Object.entries(a.models)){if(n&&n!==Sn&&i!==n)continue;let u=r(a,l);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[Sn,...s]}function Zr(e,t,n){return ad(e,t,n,(r,s)=>An(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Bi(e,t,n){return ad(e,t,n,(r,s)=>An(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:An(s)&&Array.isArray(s.efforts)?s.efforts:r.efforts)}function Rs(e,t){let n=od(e);return(t?n.filter(([s])=>s===t):n).flatMap(([,s])=>s)}function id(e,t,n){let r={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:r.impl_runtime==="inherit"?n:null;return s&&(r.impl_model&&!Yr(t,s).includes(r.impl_model)&&(r.impl_model=void 0),r.impl_effort&&!Zr(t,s,r.impl_model||Sn).includes(r.impl_effort)&&(r.impl_effort=void 0)),r}var pb={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},Fi=[...db,...tr],fb=[...Qo,...ji].filter((e,t,n)=>n.indexOf(e)===t&&!Fi.includes(e));function ld(e,t){let n=An(e)?e:{},r=An(t)?t:{},s=[];for(let a of Fi){let i=n[a]??null,l=r[a]??null;i!==l&&s.push({key:a,label:pb[a]||a,before:i,after:l,kind:i===null?"added":l===null?"removed":"changed"})}let o=[];for(let a of[...fb,...Object.keys(r)])!Fi.includes(a)&&!o.includes(a)&&Object.hasOwn(r,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ui(e,t,n,r,s,o){return Lo({key:e,choices:t,layer:"global",global:n,resolution_global:o,execution_defaults:r,runner_catalog:s})}function cd(e,t){let n={};for(let r of ji){let s=e?.[r],o=t?.[r];s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}function ud(e,t){let n={};for(let r of tr){let s=e?.[r]??null,o=t?.[r]??null;s!==o&&(n[r]=typeof o=="string"&&o.length>0?o:null)}return n}var Wi=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...tr]}],ir={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},ta={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function zi(e,t,n,r,s,o=null){let a=yn({pin:t,global:n,execution_defaults:r,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function dd(e,t,n,r,s,o=null){let a={pin:0,global:0,base:0};for(let i of zi(e,t,n,r,s,o))a[i.source]+=1;return a}function pd(e,t,n){return{id:e,key:t,value:typeof n=="string"?n:""}}function fd(e,t,n){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:n}}var _$=[...Zo,...tr];var _b=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review",receipt_stage:null,fill_stage:"spec",stale_stage:"spec",hue:"spec"},{id:"plan",label:"\uACC4\uD68D \uB9AC\uBDF0",receipt:null,receipt_stage:"plan",fill_stage:"plan",stale_stage:"plan",hue:"plan"},{id:"impl",label:"\uAD6C\uD604",receipt:null,receipt_stage:null,fill_stage:"impl",stale_stage:null,hue:"impl"},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review",receipt_stage:null,fill_stage:null,stale_stage:"impl",hue:"impl"},{id:"pr",label:"PR",receipt:null,receipt_stage:null,fill_stage:"pr",stale_stage:null,hue:"pr"}],Hi={quick_fix:["impl","impl_review"],spec_backed:["spec","impl","impl_review","pr"],full_plan:["spec","plan","impl","impl_review","pr"]},_d={missing:"\uC2B9\uC778 \uD544\uC694",stale:"\uC7AC\uC2B9\uC778 \uD544\uC694",unknown:"\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"},mb={pin:"pin",global:"global",base:"base"};function gb(e){return c`<span
    class=${`detail-layer-rail detail-layer-rail--${mb[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function bb(e,t,n){switch(e){case"workflow_mode":return Ts;case"spec_review_model":case"impl_review_model":return Cs;case"plan_review_model":return Jo;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ea;case"impl_dispatch":return sd;case"impl_runtime":return Xo;case"impl_model":return Yr(n,t.impl_runtime);case"impl_effort":return Zr(n,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return Es;case"orchestration_model":return Rs(n,null);case"orchestration_effort":return Zr(n,void 0,t.orchestration_model||Sn).filter(r=>r!==Sn);default:return[]}}function hb(e,t){return c`<div class="detail-effective__row" data-key=${e.key}>
    ${gb(e.source)}
    <span class="detail-effective__k"
      >${ir[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${ta[e.source]}</span
    >
    ${t.expanded?c`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${ir[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${n=>{let r=String(n.target.value);t.onEdit(e.key,r.length===0?null:r)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(n=>c`<option
                value=${n.value}
                title=${n.full_value||""}
                ?selected=${e.source==="pin"&&e.value===n.value}
              >
                ${n.label}
              </option>`)}
        </select>`:""}
  </div>`}function md(e,t){let n=Wi.flatMap(l=>l.keys),r=zi(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=dd(n,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(r.map(l=>[l.key,l])),a=Object.fromEntries(r.filter(l=>l.value!==null).map(l=>[l.key,l.value])),i=r.filter(l=>l.full_value&&l.display!==l.full_value).map(l=>l.full_value).join(" \xB7 ");return c`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${l=>t.onToggle(l.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${l=>{l.preventDefault();let u=l.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${yb(o)}</span
      >
      <span class="detail-effective__counts">
        <span class="detail-effective__count detail-effective__count--pin"
          >핀 ${s.pin}</span
        >
        <span class="detail-effective__count detail-effective__count--global"
          >전역 ${s.global}</span
        >
        <span class="detail-effective__count detail-effective__count--base"
          >기본 ${s.base}</span
        >
      </span>
      <span class="detail-effective__chev">▸</span>
    </summary>
    ${e.expanded?c`<div class="detail-effective__body">
          ${Wi.map(l=>c`
              <div class="detail-effective__subhead">${l.label}</div>
              ${r.filter(u=>l.keys.includes(u.key)).map(u=>{let d=Lo({key:u.key,choices:bb(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return hb(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${Ar(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${l=>t.onPresetSelect(String(l.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(l=>c`<option
                    value=${l.id}
                    ?selected=${l.id===e.preset_id}
                  >
                    ${l.name}${l.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            <span class="detail-effective__hint"
              >세션 키 12개를 핀으로 기록</span
            >
            ${(e.skipped_orchestration_keys||[]).length>0?c`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function yb(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let n=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${n}`)}for(let n of["impl_model","impl_effort","impl_speed"])e[n]?.resolution!=="not_applicable"&&t.push(e[n]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function vb(e){if(!e||typeof e!="object")return null;let{kind:t,actor:n,effort:r,sha:s}=e;return typeof t!="string"||typeof n!="string"||typeof s!="string"?null:{kind:t,actor:n,effort:typeof r=="string"?r:null,sha:s}}function gd(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},n=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},r=n.stages||{},s=n.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=vb(n.exec_receipt),l=i?Vn(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Ro(n.planned_execution,n.exec_receipt),_=n.chips?.pr?.number,h=typeof _=="number"?`PR #${_}`:"PR";return c`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?c`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?c`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?c`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >${h}</a
          >`:""}
      ${d?c`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${l?c`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${l}
            >${u}${i?.effort?c`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div
      class="detail-summary__gates"
      role="group"
      aria-label="워크플로 게이트"
    >
      ${wb(s).map(b=>kb(b,t,r,{label:b.id==="pr"?h:b.label,href:b.id==="pr"?o:""}))}
    </div>
  </section>`}function wb(e){let n=typeof e=="string"&&Object.hasOwn(Hi,e)&&Hi[e]||Hi.spec_backed;return _b.filter(r=>n.includes(r.id))}var na={on:"\uD1B5\uACFC",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",current:"\uC9C4\uD589 \uC911",none:"\uBBF8\uB3C4\uB2EC"};function kb(e,t,n,r){let s=$b(e,t,n),o=e.fill_stage?n[e.fill_stage]:null,a=typeof o?.fill=="string"?o.fill:null,i=a?a==="full":s.length>0,l=!i&&a==="dim",u=e.stale_stage?n[e.stale_stage]?.stale===!0:!1,d=s&&s.split("@")[1]?.slice(0,7)||"",_=u?na.stale:i?na.on:l?na.current:na.none,h=xb(e,n),b=`${r.label} \xB7 ${_}${h?` \xB7 ${h}`:""}${s?` \xB7 ${s}`:""}`,k=`detail-summary__gate${i?" detail-summary__gate--on":""}${l?" detail-summary__gate--current":""}${u?" detail-summary__gate--stale":""}${d?" detail-summary__gate--receipt":""}`,D=c`<span class="detail-summary__gate-label"
      >${r.label}</span
    >
    <span class="detail-summary__gate-rail"></span>
    <span class="detail-summary__gate-sha">${d}</span>`;return r.href?c`<a
      class=${k}
      data-gate=${e.id}
      data-hue=${e.hue}
      href=${r.href}
      target="_blank"
      rel="noreferrer"
      title=${b}
      >${D}</a
    >`:c`<span
    class=${k}
    data-gate=${e.id}
    data-hue=${e.hue}
    title=${b}
    >${D}</span
  >`}function $b(e,t,n){if(e.receipt&&typeof t[e.receipt]=="string")return String(t[e.receipt]);if(e.receipt_stage){let r=n[e.receipt_stage]?.receipt;return typeof r=="string"?r:""}return""}function xb(e,t){if(e.id!=="plan")return"";let n=t.plan?.approval_state;return typeof n=="string"&&Object.hasOwn(_d,n)?_d[n]:""}function ra(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function bd(e){return ra(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function hd(e,t){let n=e&&e[t];if(!ra(n)||!Array.isArray(n.accounts))return null;let r=n.accounts.filter(bd),s=bd(n.active)?n.active:null;return{accounts:r,active:s||r.find(o=>o.active===!0)||null}}function wd(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function sa(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${wd(e)}${t}`}function Qr(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${wd(e)}`}function Ab(e,t,n){if(n!==null){let s=e==="claude"?sa:Qr,o=t?t.accounts.find(a=>a.key===n):void 0;return`\uB808\uD3EC \uAE30\uBCF8\uAC12 \uC0AC\uC6A9(${o?s(o):n})`}return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:Qr({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function yd(e,t){if(!ra(e)||e.state!=="usable"||!ra(e.values))return null;let n=e.values[t];return typeof n=="string"&&n.length>0?n:null}function vd(e){let t=e.provider_key==="claude"?sa:Qr,n=!!e.provider?.accounts.some(r=>r.key===e.selected);return c`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${r=>e.handlers.onExecChange(e.key,r.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Ab(e.provider_key,e.provider,e.workspace_default)}
        </option>
        ${e.selected&&!n?c`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(r=>c`<option
              value=${r.key}
              ?selected=${r.key===e.selected}
            >
              ${t(r)}
            </option>`)||""}
      </select>
      ${e.hint?c`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":c`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function kd({md:e,catalog:t,workspace_defaults:n=null,handlers:r}){let s=typeof e.claude_account=="string"?e.claude_account:"",o=typeof e.codex_account=="string"?e.codex_account:"";return c`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${vd({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:hd(t,"claude"),selected:s,workspace_default:yd(n,"claude_account"),handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${vd({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:hd(t,"codex"),selected:o,workspace_default:yd(n,"codex_account"),handlers:r})}
    </div>
  </section>`}var $d=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function Os(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function oa(e){if(!Os(e)||!Os(e.runners))return null;let t=Object.entries(e.runners).filter(([,n])=>Os(n)&&Os(n.models));return t.length>0?t:null}function Fn(e,t){let n=oa(e);if(!n||!t)return null;for(let[r,s]of n)if(Object.hasOwn(s.models,t))return r;return null}function xd(e,t){return Os(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function Ad(e,t){let n=oa(e);if(!n||!t)return[];for(let[,r]of n)if(Object.hasOwn(r.models,t))return xd(r,r.models[t]);return[]}function Sb(e){let t=oa(e);if(!t)return[];let n=[];for(let[,r]of t)for(let s of Object.values(r.models))for(let o of xd(r,s))n.includes(o)||n.push(o);return n}function Eb(e,t){if(!t)return Sb(e);let r=oa(e)?.find(([o])=>o===t)?.[1];if(!r)return[];let s=[];for(let o of Object.keys(r.models))for(let a of Ad(e,o))s.includes(a)||s.push(a);return s}function Sd(e,t,n){let r={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=r.impl_runtime==="inherit"?n:r.impl_runtime==="claude"||r.impl_runtime==="codex"?r.impl_runtime:null;if(r.impl_runtime==="inherit"&&!s)return r.impl_model="",r.impl_effort="",r;let o=Fn(t,r.impl_model);if(r.impl_model&&(!s||o!==s))return r.impl_model="",r.impl_effort="",r;let a=r.impl_model?Ad(t,r.impl_model):Eb(t,s);return r.impl_effort&&a.length>0&&!a.includes(r.impl_effort)&&(r.impl_effort=""),r}function Tb(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Cb(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let n=t[1].trim();return{front:n.length>0?n:null,body:e.slice(t[0].length)}}function aa(e,t){let n=t.getWorkspacePath,r=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,l="";function u(D){D.key==="Escape"&&s&&(D.preventDefault(),b())}document.addEventListener("keydown",u);function d(){return s?c`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>b()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Tb(s)}</span
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
            ${o==="loading"?c`<div class="mv__status">불러오는 중…</div>`:o==="pending"?c`<div class="mv__status">${l}</div>`:o==="error"?c`<div class="mv__status mv__status--error">
                      ${l||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:c`${i===null?null:c`<pre class="mv__front">
${i}</pre
                        >`}${ar(a)}`}
          </div>
        </div>
      </div>
    `:c``}function _(){at(d(),e)}async function h(D,B={}){s=D,o="loading",a="",i=null,l="",_();let Y=B.workspace||(n?n():"");if(!Y){o="error",l="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",_();return}if(!r){o="error",l="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",_();return}let le="/api/doc?workspace="+encodeURIComponent(Y)+"&path="+encodeURIComponent(D);try{let K=await r(le),N=await K.json().catch(()=>({}));if(!K.ok||!N||N.ok!==!0){if(N?.error==="not_found"&&B.missing_state==="plan_pending"){o="pending",l="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",_();return}o="error",l="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(N&&N.error||K.status)+")",_();return}let M=Cb(String(N.content||""));i=M.front,a=M.body,o="ready",_()}catch{o="error",l="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",_()}}function b(){s=null,at(c``,e)}function k(){document.removeEventListener("keydown",u),b()}return{open:h,close:b,destroy:k}}var Rb=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],Cd="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",ia=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Ob=new Set(["codex-runner","Explore","Plan","advisor","advisor-xhigh","claude-code-guide","statusline-setup"]);function Ed(e){return typeof e=="string"&&Ob.has(e)}var Lb=["running","done","failed","interrupted"],Ib={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Pb(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function Mb(e){let t=un(e);if(t.length>0)return t.map(s=>c`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let n=Hr(e);if(!n||!e)return"";let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return c`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${n.replace(/^τ /,"\u03C4 \uCD1D ")}${r}</span
    >${e.replayed?c`<span class="detail-usage-partial" title=${Cd}
          >부분 집계</span
        >`:""}`}function Td(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Vi(e){if(typeof e=="number")return Ls(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?Ls(t):""}function Db(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Nb(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let n=t&&typeof t.agent_id=="string"?t.agent_id:"";return n.length>0?{text:n.slice(0,8),title:n}:{text:e.launch_id.slice(-8),title:e.launch_id}}function Gi(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ki(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function qb(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,n=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!ia.some(r=>r.role===t.role&&r.provider===t.provider)||!(n?Gi(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||Gi(t.effort))||!(!("agent_type"in t)||Gi(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Lb.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:n?!Ki(t.started_at)||!Ki(t.last_event_at)||!Ki(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function Fb(e,t,n){let s=un({providers:{[t]:{subtotal:n.subtotal,breakdown:n.usage,...n.replayed?{replayed:!0}:{}}},roles:{}})[0];return c`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[n.provider,n.model,n.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${n.session_id?c`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${n.session_id}
          >${n.session_id.slice(0,8)}</span
        >`:""}
    ${Vi(n.completed_at)?c`<span class="detail-session__leg-time detail-session__time"
          >${Vi(n.completed_at)}</span
        >`:""}
    ${s?c`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function jb(e,t,n,r){let s=e.status==="running"?null:t,a=(s?un({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?Ls(e.last_event_at):s?Vi(s.completed_at):"",l=(e.provider==="claude"?["Claude",e.agent_type,Db(e.model),e.effort]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Nb(e,s);return c`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>r.onOpenDelegation&&r.onOpenDelegation(n,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${Ib[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${l}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?c`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?c`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Bb(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Ub(e,t,n){let r=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let _=qb(d);!_||s.has(_.launch_id)||Ed(_.agent_type)||(s.add(_.launch_id),r.push(_))}r.sort((d,_)=>(d.started_at||0)-(_.started_at||0));let a={};for(let{role:d,provider:_}of ia){let h=t?t.roles[d]?.[_]:null;a[d]=h?[...h.legs]:[]}let i=ia.flatMap(({role:d})=>a[d]),l=new Set,u=[];for(let{role:d,provider:_}of ia){for(let h of r.filter(b=>b.role===d&&b.provider===_)){let b=i.find(k=>k.receipt_id===h.launch_id)||null;b&&!Bb(h,b)||(b&&l.add(b.receipt_id),u.push(jb(h,b,e.attempt_id,n)))}for(let h of a[d])!l.has(h.receipt_id)&&!Ed(h.agent_type)&&u.push(Fb(d,_,h))}return u}function Wb(e,t){let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,r=[...Rb,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return c`<div class="detail-session__usage-detail">
    ${r.map(s=>c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Pb(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${n===null?"":c`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${n.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?c`<span class="detail-session__usage-note">${Cd}</span>`:""}
  </div>`}var zb={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function Ls(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),n=String(t.getHours()).padStart(2,"0"),r=String(t.getMinutes()).padStart(2,"0");return`${n}:${r}`}function Hb(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,r])=>typeof r=="string"&&r.length>0).map(([r,s])=>`${r}=${s}`).join(" \xB7 "):"",n=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return c`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${n}</span>
    ${t?c`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}var Gb={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function Kb(e,t){let n=Gb[e.locality]||"",r=e.locality==="remote"?`${e.host} \xB7 \uB2E4\uB978 \uBA38\uC2E0`:e.locality==="missing"?`${e.host} \xB7 \uD30C\uC77C \uC5C6\uC74C`:e.host;return c`<div class="detail-session-row">
    <button
      type="button"
      class="detail-session detail-session--session"
      data-session-key=${li(e)}
      ?disabled=${n.length>0}
      title=${n}
      @click=${()=>{n.length===0&&t.onOpenSessionRef&&t.onOpenSessionRef(e)}}
    >
      <span class="detail-session__glyph">${e.current?"\u25D0":"\xB7"}</span>
      <span class="detail-session__id">${ps(e)}</span>
      <span class="detail-session__meta">${r}</span>
      <span class="detail-session__sid" title=${e.session_id}
        >${e.session_id.slice(0,8)}</span
      >
      <span class="detail-session__time">${Ls(e.last_event_at)}</span>
    </button>
    ${e.resume_command?c`<button
          type="button"
          class="detail-session__resume-cmd"
          title=${e.resume_command}
          @click=${s=>{s.stopPropagation(),t.onCopyResumeCommand&&e.resume_command&&t.onCopyResumeCommand(e.resume_command)}}
        >
          ⧉ 재개
        </button>`:""}
  </div>`}function Rd(e,t={},n={},r=[]){let s=Array.isArray(e)?e:[],o=Array.isArray(r)?r:[],a=[...o.filter(b=>b&&b.current===!0),...o.filter(b=>b&&b.current!==!0).sort((b,k)=>k.index-b.index)],i=a.map(b=>Kb(b,t)),l=n.expanded||new Set;if(s.length===0&&a.length===0)return c`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let u=new Set;for(let b of s)b&&typeof b.resumed_from=="string"&&b.resumed_from.length>0&&u.add(b.resumed_from);let d=b=>{if(!(b.status==="failed"||b.status==="orphaned"))return"";let D=typeof b.session_id=="string"&&b.session_id.length>0,B=u.has(b.attempt_id),Y=D&&!B,le=D?B?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return c`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${b.attempt_id}
      ?disabled=${!Y}
      title=${le}
      @click=${K=>{K.stopPropagation(),Y&&t.onResume&&t.onResume(b.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},_=b=>{if(!(b.status==="failed"||b.status==="orphaned")||typeof b.cause!="string"||b.cause==="")return"";let D=b.cause_detail,B=D&&typeof D.reason=="string"&&D.reason.length>0?typeof D.command=="string"&&D.command.length>0?`${D.reason} \xB7 ${D.command}`:D.reason:b.cause;return c`<div class="detail-session__cause" title=${B}>
      ${b.cause}
    </div>`},h=b=>{let k=Td(pi(b));if(un(k).length===0&&!Hr(b.usage))return"";let D=l.has(b.attempt_id);return c`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${b.attempt_id}
      aria-expanded=${D?"true":"false"}
      title=${D?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${B=>{B.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(b.attempt_id)}}
    >
      τ 자세히
    </button>`};return c`
    <div class="detail-section-label">
      세션 이력${Mb(n.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${i}${s.map(b=>{let k=pi(b),D=Td(k),B=un(D);return c`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${b.status||"unknown"}"
            data-attempt-id=${b.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(b.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${zb[b.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${b.attempt_id}</span>
            ${us(b)?c`<span
                  class="detail-session__resumed"
                  title=${us(b)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${kr(b)}</span>
            ${B.length>0?c`<span class="detail-session__role">orchestrator</span>`:""}
            ${b.session_id?c`<span class="detail-session__sid" title=${b.session_id}
                  >${String(b.session_id).slice(0,8)}</span
                >`:""}
            ${B.length>0?B.map(Y=>c`<span
                      class="detail-session__usage"
                      title=${Y.tooltip}
                      >${Y.label}</span
                    >`):Hr(b.usage)?c`<span class="detail-session__usage"
                    >${Hr(b.usage)}</span
                  >`:""}
            <span class="detail-session__time">${Ls(b.started_at)}</span>
          </button>
          ${h(b)} ${d(b)} ${_(b)} ${Hb(b)}
          ${l.has(b.attempt_id)&&b.usage?Wb(b.usage,b.runner==="codex"?"codex":"claude"):""}
          ${Ub(b,k,t)}
        </div>`})}
    </div>
  `}function Od(e,t={}){return c`
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
          ${Vb(e)}
        </div>`:""}
  `}function Vb(e){let t=Kr(e);if(t)return t;let n=e.data;if(!n)return"";if(n.missing)return c`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof n.default_task_prompt=="string"?er("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",n.default_task_prompt):""}`;let r=Ko(n.recorded_at);return c`<div class="detail-prompt__meta">
      ${n.attempt_id}${r?` \xB7 ${r}`:""}
    </div>
    ${typeof n.task_prompt=="string"?er("\uACFC\uC5C5 (user)",n.task_prompt):""}
    ${typeof n.system_prompt=="string"?er("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",n.system_prompt):""}`}var Yb=["open","in_progress","deferred","resolved","closed"],Zb=[0,1,2,3,4];function Ld(e,t){let n=t.issueStores,r=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,l=t.sessionLogStore,u=null,d=null,_={},h="",b=!1,k=[],D=!1,B={},Y={claude:null,codex:null},le=null,K=null,N=0,M=!1,G=!1,L="",I="",te="";function xe(){M=!1,G=!1,L="",I="",te=""}function ke(){Y={claude:null,codex:null},le=null,K=null,N+=1}async function fe(){if(!s)return null;try{let A=await Promise.resolve(s("get-workspace-accounts",{}));return A&&typeof A.state=="string"?A:null}catch{return null}}async function ae(A){try{let oe=await fetch(A);if(!oe.ok)return null;let F=await oe.json();if(!F||typeof F!="object"||!Array.isArray(F.accounts))return null;let Ee=F.accounts.filter(rt=>rt!==null&&typeof rt=="object"&&!Array.isArray(rt));return{accounts:Ee,active:Ee.find(rt=>rt.active===!0)||null}}catch{return null}}async function Te(A){K=A;let oe=++N,[F,Ee,rt]=await Promise.all([ae("/api/claude-usage"),ae("/api/codex-usage"),fe()]);oe!==N||A!==u||(Y={claude:F,codex:Ee},le=rt,Ve())}let Ie=[],$e=null,ee=null,Z=!1,Ce="",z=!1,ne=0,ge=new Set;function Se(){Ie=[],$e=null,ee=null,Z=!1,Ce="",z=!1,ne+=1,ge.clear()}async function Ye(A){if(!s)return;let oe=++ne;try{let F=await Promise.resolve(s("get-comments",{id:A}));if(oe!==ne||A!==u)return;Ie=Array.isArray(F)?F:[],Z=!1}catch{if(oe!==ne||A!==u)return;Z=!0}Ve()}function ue(){if(!s||!u)return;let A=d&&typeof d.comment_count=="number"?d.comment_count:null;if($e!==u){$e=u,ee=A,Ye(u);return}A!==null&&A!==ee&&(ee=A,Ye(u))}function Ue(A){ge.has(A)?ge.delete(A):ge.add(A),Ve()}function gt(A){let oe=Ce.trim().length===0;Ce=A,oe!==(A.trim().length===0)&&Ve()}async function St(){let A=Ce.trim();if(!s||!u||A.length===0||z)return;let oe=u;z=!0,Ve();let F=!1;try{let Ee=await Promise.resolve(s("add-comment",{id:oe,text:A}));Array.isArray(Ee)&&Ee.length>0&&(F=!0,oe===u&&(Ie=Ee,Z=!1,Ce="",ee=Ee.length))}catch{F=!1}F||de("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),oe===u&&(z=!1),Ve()}let xt={onToggle:Ue,onDraftInput:gt,onSubmit:St},ft=t.mdViewer||null,T=null;ft||(T=document.createElement("div"),T.className="md-viewer-root",document.body.appendChild(T));let ce=ft||aa(T,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),Oe=document.createElement("div");Oe.className="session-log-root",document.body.appendChild(Oe);let Me=Vr(Oe,{transport:s?(A,oe)=>Promise.resolve(s(A,oe)):void 0,sessionLogStore:l}),Qe=!1,st=!1,bt=!1,yt=null,re=null,Q=0;function je(A){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}`}function it(){Qe=!1,st=!1,bt=!1,yt=null,re=null,Q+=1}async function We(A){if(!s)return;let oe=++Q;st=!0,bt=!1,Ve();try{let F=await Promise.resolve(s("get-bead-prompt",{bead_id:A}));if(oe!==Q)return;!F||typeof F!="object"||Array.isArray(F)?bt=!0:(yt=F,re=je(A))}catch{oe===Q&&(bt=!0)}finally{oe===Q&&(st=!1,Ve())}}let we=[],Ge=null,dt=0;function _t(A,oe){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${A}::${oe}`}function mt(){we=[],Ge=null,dt+=1}async function Pt(A,oe){if(!s)return;let F=++dt,Ee;try{Ee=await Promise.resolve(s("get-session-refs",{bead_id:A}))}catch{Ee=null}F!==dt||oe!==Ge||(we=Ee&&Array.isArray(Ee.sessions)?Ee.sessions:[],Ve())}function Kt(){if(!s||!u)return;let A=d&&d.metadata,oe=A&&typeof A=="object"&&typeof A.session_ref=="string"?A.session_ref:null;if(oe===null){mt();return}let F=_t(u,oe);Ge!==F&&(we=[],Ge=F,Pt(u,F))}function Ht(){if(Qe=!Qe,Qe&&u&&re!==je(u)){yt=null,We(u);return}Ve()}function Ct(){if(!a||!u)return[];let A=a.get();return(A&&A.attempts?Object.values(A.attempts):[]).filter(F=>F&&F.bead_id===u).sort((F,Ee)=>(Ee.started_at||0)-(F.started_at||0)).map(F=>({attempt_id:F.attempt_id,bead_id:F.bead_id,status:F.status,started_at:typeof F.started_at=="number"?F.started_at:null,runner:F.runner||null,model:F.model||null,effort:F.effort||F.observed_effort||null,speed:F.speed||null,session_id:F.session_id||null,resumed_from:F.resumed_from||null,continuation_mode:F.continuation_mode||null,dismissed_at:typeof F.dismissed_at=="number"?F.dismissed_at:null,cause:typeof F.cause=="string"?F.cause:null,cause_detail:F.cause_detail||null,exec_default_preset_id:typeof F.exec_default_preset_id=="string"?F.exec_default_preset_id:null,exec_default_preset_revision:typeof F.exec_default_preset_revision=="number"?F.exec_default_preset_revision:null,exec_values:F.exec_values&&typeof F.exec_values=="object"?F.exec_values:null,usage:F.usage||null,usage_legs:Array.isArray(F.usage_legs)?F.usage_legs:[],delegation_sessions:Array.isArray(F.delegation_sessions)?F.delegation_sessions:[]}))}function Lt(){if(!a||!u)return null;let A=a.get();return Rn(A&&A.attempts||{},u)}let Xe=new Set;function De(A){Xe.has(A)?Xe.delete(A):Xe.add(A),Ve()}function P(A){let oe=a?a.get():null,F=oe&&oe.attempts?oe.attempts[A]:null;Me.open({attempt_id:A,meta:F?{runner:F.runner||void 0,model:F.model||void 0,effort:F.effort||void 0,status:F.status||void 0,session_id:F.session_id||void 0}:{}})}function J(A,oe){let F=a?a.get():null,Ee=F&&F.attempts?F.attempts[A]:null,ut=(Ee&&Array.isArray(Ee.delegation_sessions)?Ee.delegation_sessions:[]).find($t=>$t&&typeof $t=="object"&&$t.launch_id===oe);ut&&Me.open({attempt_id:A,launch_id:oe,meta:{runner:ut.provider==="claude"?"claude":"codex",role:ut.role,...typeof ut.agent_type=="string"?{agent_type:ut.agent_type}:{},model:ut.model,effort:ut.effort,session_id:ut.session_id,status:ut.status}})}async function ve(A){if(!s||!A)return;let oe=await Wr();if(oe===null)return;let F=()=>{let $t=a?a.get():null;return $t&&typeof $t.revision=="number"?$t.revision:0},Ee=async($t={},Je=F())=>await s("worker-attempt-resume",{attempt_id:A,expected_revision:Je,...oe!==""?{instructions:oe}:{},...$t}),rt=$t=>{$t?.queue&&a?.set&&a.set($t.queue)},ut=await Ee();if(rt(ut),ut&&ut.conflict){let $t=ut.queue&&typeof ut.queue.revision=="number"?ut.queue.revision:F();ut=await Ee({},$t),rt(ut)}ut=await Yn(ut,($t,Je)=>Ee({continuation:$t,decision_token:Je}),{onResult:rt,refresh:()=>Ee()}),ut&&ut.resumed===!1&&!ut.conflict&&ut.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${ut.reason}`,"error",2400)}function E(A){!A||!u||Me.open(Io(A,u,d&&d.status))}let H={onOpen:P,onOpenDelegation:J,onResume:ve,onToggleUsage:De,onOpenSessionRef:E,onCopyResumeCommand:ht};function Re(){let A=a?a.get():null,oe={...B};for(let F of["orchestration_model","orchestration_effort","orchestration_speed"]){let Ee=A&&A[F];typeof Ee=="string"&&(oe[F]=Ee)}return oe}async function x(){if(s){try{let A=await Promise.resolve(s("get-session-defaults",{}));B=A&&A.values&&typeof A.values=="object"?A.values:{}}catch{B={}}Ve()}}function R(){let A=a?a.get():null;return A&&A.runner_catalog||null}function X(){let A=a?a.get():null;return A&&typeof A.execution_defaults=="object"?A.execution_defaults:null}function _e(){let A=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},F=yn({pin:{...A,..._},global:Re(),execution_defaults:X(),runner_catalog:R(),route:typeof A.route=="string"?A.route:null}).orchestration_model.value||"";return Fn(R(),F)}function Ae(){let A=i?i.get():null;return!A||typeof A.revision!="number"?null:{revision:A.revision,presets:Array.isArray(A.presets)?A.presets:[]}}function v(A){return A?.compatible===!1}function U(A){i&&A&&typeof A.revision=="number"&&Array.isArray(A.presets)&&i.set({revision:A.revision,presets:A.presets})}async function ie(){let A=Ae(),oe=A?.presets.find(F=>F.id===h);if(!(!s||!u||!A||!oe||v(oe)||b)){b=!0,k=[],Ve();try{let F=await Promise.resolve(s("apply-impl-preset",fd(u,oe.id,A.revision)));if(F&&F.conflict){U(F),de("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Ee=F&&Array.isArray(F.issue)?F.issue[0]:F?.issue;if(F&&F.applied&&Ee&&typeof Ee=="object"){d=Ee,k=Array.isArray(F.skipped_orchestration_keys)?F.skipped_orchestration_keys.filter(rt=>typeof rt=="string"):[];for(let rt of $d)delete _[rt];de(k.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}F&&F.error==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(F){F&&typeof F=="object"&&F.code==="bd_readback_failed"?de("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):de("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{b=!1,Ve()}}}let Ke=null;n&&n.subscribe&&(Ke=n.subscribe(()=>vt()));let Be=null;a&&typeof a.subscribe=="function"&&(Be=a.subscribe(()=>{u&&Ve()}));let be=null;i&&typeof i.subscribe=="function"&&(be=i.subscribe(()=>{u&&Ve()}));function Rt(A){A.key==="Escape"&&u&&(A.preventDefault(),r())}document.addEventListener("keydown",Rt);function vt(){if(u){if(n&&typeof n.snapshotFor=="function"){let A=n.snapshotFor("detail:"+u)||[];d=A.find(F=>F&&F.id===u)||A[0]||d}ue(),Kt(),Ve()}}function ht(A){xn(A).then(oe=>{oe?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function Qt(A){A.preventDefault(),A.stopPropagation(),u&&ht(u)}function qt(A,oe){A.preventDefault(),A.stopPropagation(),ht(oe)}function an(A,oe,F){A.preventDefault(),A.stopPropagation(),ce.open(oe,{missing_state:F})}function en(A,oe){_[A]=oe,Ve(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",pd(u,A,oe.length===0?null:oe))).catch(()=>{de("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function rn(A,oe){let F=d||{},Ee=F.metadata&&typeof F.metadata=="object"?F.metadata:{},rt={};for(let Je of["impl_runtime","impl_model","impl_effort"])rt[Je]=Object.hasOwn(_,Je)?_[Je]:typeof Ee[Je]=="string"?Ee[Je]:"";rt[A]=oe;let ut=Sd(rt,R(),_e()),$t={};for(let Je of["impl_runtime","impl_model","impl_effort"])$t[Je]=_[Je],_[Je]=ut[Je]||"";Ve(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...ut,orchestration_runtime:_e()})).then(Je=>{let Ut=Array.isArray(Je)?Je[0]:Je;if(!Ut||typeof Ut!="object"||!Ut.id)throw new Error("implementation target readback failed");d=Ut;for(let p of["impl_runtime","impl_model","impl_effort"])delete _[p];Ve()}).catch(()=>{for(let Je of["impl_runtime","impl_model","impl_effort"])$t[Je]===void 0?delete _[Je]:_[Je]=$t[Je];Ve(),de("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function Xt(A,oe,F){if(!s||!u)return!1;try{let Ee=await Promise.resolve(s(A,oe)),rt=Array.isArray(Ee)?Ee[0]:Ee;return rt&&typeof rt=="object"&&rt.id?(d=rt,!0):(de(F,"error"),!1)}catch{return de(F,"error"),!1}}function on(A){setTimeout(()=>{try{let oe=e.querySelector(A);oe&&typeof oe.focus=="function"&&oe.focus()}catch{}},0)}function Ze(){M=!0,L=d&&d.title||"",Ve(),on('.detail-edit__input[data-edit="title"]')}function gn(A){L=A.target.value}function tt(){M=!1,L="",Ve()}function Pe(){Xt("edit-text",{id:u,field:"title",value:L},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(oe=>{oe&&(M=!1,L=""),Ve()})}function C(){G=!0,I=d&&d.description||"",Ve(),on('.detail-edit__textarea[data-edit="description"]')}function he(A){I=A.target.value}function Ne(){G=!1,I="",Ve()}function At(){Xt("edit-text",{id:u,field:"description",value:I},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(oe=>{oe&&(G=!1,I=""),Ve()})}function Ft(A,oe,F,Ee){if(A.key==="Escape"){A.stopPropagation(),F();return}A.key==="Enter"&&(!Ee||A.ctrlKey||A.metaKey)&&(A.preventDefault(),oe())}function wt(A){let oe=A.target.value;Xt("update-status",{id:u,status:oe},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>Ve())}function jt(A){let oe=Number(A.target.value);Xt("update-priority",{id:u,priority:oe},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>Ve())}function tn(A){te=A.target.value}function ln(){let A=te.trim();A.length!==0&&Xt("label-add",{id:u,label:A},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(oe=>{oe&&(te=""),Ve()})}function wn(A){if(A.key==="Escape"){A.stopPropagation(),te="",Ve();return}A.key==="Enter"&&(A.preventDefault(),ln())}function Bt(A){Xt("label-remove",{id:u,label:A},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>Ve())}let En={onCopyPath:qt,onOpenDoc:an};function kn(A){return typeof A=="string"?A:A&&typeof A=="object"?String(A.id||A.to||A.issue_id||A.depends_on||""):""}function nr(A){switch(A&&typeof A=="object"?String(A.dependency_type||A.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function S(A){let F=(Array.isArray(A.dependencies)?A.dependencies:[]).map(Ee=>({id:kn(Ee),icon:nr(Ee)})).filter(Ee=>Ee.id.length>0);return c`
      <div class="detail-section-label">의존성</div>
      ${F.length===0?c`<div class="detail-empty">의존성 없음</div>`:c`<div class="detail-deps">
            ${F.map(Ee=>o?c`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Ee.id)}
                  >
                    ${Ee.icon?`${Ee.icon} `:""}${Ee.id}
                  </button>`:c`<span class="detail-dep"
                    >${Ee.icon?`${Ee.icon} `:""}${Ee.id}</span
                  >`)}
          </div>`}
    `}function O(A){let oe=A.metadata||{},F=A.workflow||{},Ee=F.stages||{},rt=Ee.spec&&Ee.spec.stale,ut=Ee.impl&&Ee.impl.stale,$t=F.quick_fix_review?.state==="stale",Je=Ee.plan||null,Ut=F.route_source==="derived",p=F.route||oe.route||"\u2014";return c`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${Ut?" detail-kv__v--derived":""}"
          title=${Ut?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${Ut?"unset":p}</span
        >
      </div>
      ${F.route!=="quick_fix"||Object.hasOwn(oe,"spec_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${oe.spec_review||"\uC5C6\uC74C"}${rt?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.route==="full_plan"?c`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${Je?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${Je?.approval_receipt||"\uC5C6\uC74C"}${Je?.approval_state==="stale"?" \xB7 stale":Je?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${F.route!=="quick_fix"||Object.hasOwn(oe,"impl_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${oe.impl_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.resolver?c`<div class="detail-kv">
            <span class="detail-kv__k">↳ 충돌 해소</span>
            <span
              class="detail-kv__v detail-kv__v--resolver detail-kv__v--wrap"
              title=${`resolver-self:${F.resolver.attempt} \xB7 ${F.resolver.prior_sha} \u2192 ${F.resolver.sha}`}
              >${`${F.resolver.prior_sha.slice(0,7)} \u2192 ${F.resolver.sha.slice(0,7)}`}</span
            >
          </div>`:""}
      ${F.route==="quick_fix"||Object.hasOwn(oe,"quick_fix_review")?c`<div class="detail-kv">
            <span class="detail-kv__k">quick_fix_review</span>
            <span class="detail-kv__v"
              >${oe.quick_fix_review||"\uC5C6\uC74C"}${$t?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${F.planned_execution?c`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${F.planned_execution.kind}</span>
            </div>
            ${F.planned_execution.kind==="main"?c`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${F.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${F.exec_receipt?c`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${Vn(F.exec_receipt)}</span
            >
          </div>`:""}
      ${F.impl_entry?c`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${F.impl_entry.actor}@${F.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${oe.pr_url?c`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${oe.pr_url}</span>
          </div>`:""}
    `}let qe={route:["quick_fix","spec_backed","full_plan"]};async function ze(A,oe){let F=oe.target.value;if(A==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&F!=="full_plan"&&!window.confirm(`full_plan \u2192 ${F||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){Ve();return}await Xt("update-workflow-meta",{id:u,key:A,value:F},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),Ve()}function lt(A){let oe=A.metadata||{};return c` ${((Ee,rt)=>{let ut=qe[Ee],$t=typeof oe[Ee]=="string"?oe[Ee]:"";return c`<div class="detail-kv">
        <span class="detail-kv__k">${Ee}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Ee}
          data-edit=${`wfmeta-${Ee}`}
          @change=${Je=>ze(Ee,Je)}
        >
          <option value="" ?selected=${!ut.includes($t)}>
            ${rt}
          </option>
          ${ut.map(Je=>c`<option value=${Je} ?selected=${$t===Je}>${Je}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function f(A,oe){return M?c`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${L}
            @input=${gn}
            @keydown=${F=>Ft(F,Pe,tt,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Pe}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${tt}
            >
              취소
            </button>
          </div>
        </div>
      `:c`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${A}</h2>
        ${un(oe).map(F=>c`<span class="detail-usage-total" title=${F.tooltip}
              >${F.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ze}
        >
          ✎
        </button>
      </div>
    `}function w(A){let oe=cn(A.created_at),F=cn(A.updated_at);return!oe&&!F?c``:c`
      ${oe?c`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${oe}</span>
          </div>`:""}
      ${F?c`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${F}</span>
          </div>`:""}
    `}function j(A,oe){return c`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${wt}
        >
          ${Yb.map(F=>c`<option value=${F} ?selected=${F===A}>${F}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${jt}
        >
          ${Zb.map(F=>c`<option value=${String(F)} ?selected=${F===oe}>
                P${F}
              </option>`)}
        </select>
      </div>
    `}function me(A){return c`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${G?"":c`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${C}
            >
              ✎
            </button>`}
      </div>
      ${G?c`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${I}
              @input=${he}
              @keydown=${oe=>Ft(oe,At,Ne,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${At}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${Ne}
              >
                취소
              </button>
            </div>
          </div>`:c`<div class="detail-overlay__desc">
            ${A||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function Le(A){let oe=typeof A.notes=="string"?A.notes:"";return oe.trim().length===0?c``:c`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${oe}</div>
    `}function pt(A){let oe=Array.isArray(A.labels)?A.labels:[];return c`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${oe.map(F=>c`<span class="detail-label-chip"
              >${F}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${F}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+F}
                @click=${()=>Bt(F)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${te}
            @input=${tn}
            @keydown=${wn}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${ln}
          >
            추가
          </button>
        </span>
      </div>
    `}function ot(){if(!u)return c``;let A=d||{},oe=String(A.id||u),F=A.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Ee=Lt(),rt=A.status||"open",ut=typeof A.priority=="number"?Math.max(0,Math.min(4,A.priority)):"",$t=A.description||"",Je={...A,metadata:{...A.metadata||{},..._}};return c`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>r()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${Qt}
            >
              ${oe}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>r()}
            >
              ✕
            </button>
          </div>
          ${f(F,Ee)}
          ${gd(Je)}
          ${md({metadata:Je.metadata,workspace_values:Re(),catalog:R(),execution_defaults:X(),expanded:D,presets:Ae()?.presets||[],preset_id:h,preset_busy:b,skipped_orchestration_keys:k},{onToggle:Ut=>{D=Ut,Ve()},onEdit:(Ut,p)=>{if(Ut==="impl_runtime"||Ut==="impl_model"||Ut==="impl_effort"){rn(Ut,p??"");return}en(Ut,p??"")},onPresetSelect:Ut=>{h=Ut,k=[],Ve()},onPresetApply:()=>{ie()}})}
          ${kd({md:Je.metadata,catalog:Y,workspace_defaults:le,handlers:{onExecChange:en}})}
          ${j(rt,ut)} ${w(A)}
          ${me($t)}
          ${td(Ie,xt,{expanded:ge,draft:Ce,sending:z,error:Z})}
          ${Le(A)} ${pt(A)} ${S(A)}
          ${O(A)} ${lt(A)}
          ${Xu(A,En)}
          ${Od({expanded:Qe,loading:st,error:bt,data:yt},{onToggle:Ht})}
          ${Rd(Ct(),H,{total:Ee,expanded:Xe},we)}
        </div>
      </div>
    `}function Ve(){at(ot(),e)}return{load(A){A!==u&&(_={},h="",k=[],D=!1,xe(),Se(),it(),mt(),ke()),u=A,d=null,vt(),x(),K!==A&&Te(A)},clear(){u=null,d=null,_={},h="",b=!1,k=[],D=!1,xe(),Se(),it(),mt(),ke(),ce.close(),Me.close(),at(c``,e)},destroy(){Ke&&(Ke(),Ke=null),Be&&(Be(),Be=null),be&&(be(),be=null),document.removeEventListener("keydown",Rt),ft||(ce.destroy(),T&&T.parentNode&&T.parentNode.removeChild(T)),Me.destroy(),Oe.parentNode&&Oe.parentNode.removeChild(Oe),u=null,d=null,ke(),h="",b=!1,k=[],Se(),it(),mt(),at(c``,e)}}}function Id(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let n=t.querySelector("#fatal-error-title"),r=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},l=(u,d,_="")=>{n&&(n.textContent=u||"Unexpected Error"),r&&(r.textContent=d||"An unrecoverable error occurred.");let h=typeof _=="string"?_.trim():"";if(s&&(h.length>0?(s.textContent=h,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:l,close:i,getElement(){return t}}}function la(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function Ps(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let n=Math.floor(t/60);if(n<60)return`${n}\uBD84 ${Math.round(t-n*60)}\uCD08`;let r=Math.floor(n/60),s=n%60;return`${r}\uC2DC\uAC04 ${s}\uBD84`}function ca(e,t){if(typeof e!="object"||e===null)return[];let n=new Map;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t||o.kind!=="head_review"&&o.kind!=="head_repair")continue;let a=o.kind;n.set(a,(n.get(a)??!1)||o.origin==="auto")}let r=[];for(let[s,o]of[["head_review","\uB9AC\uBDF0"],["head_repair","\uC218\uB9AC"]]){let a=n.get(s);a!==void 0&&r.push(a?`${o} \xB7 \uC790\uB3D9`:o)}return r}function ua(e,t){if(typeof e!="object"||e===null)return null;let n=0,r=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(n+=i-a,r=!0)}return r?n:null}function da(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Qb(e,t){let n=Array.isArray(e)?e:[],r=Array.isArray(t)?t:[];if(n.length===0&&r.length===0)return null;let s=null;for(let i of n)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=n.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+r.length,a=n.some(i=>i.state==="repairing");return{deploy:s?{sha:la(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function Pd(e,t){let n=Qb(e,t);return n?c`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${n.deploy?c`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${n.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${n.deploy.at?cn(n.deploy.at):""}
            >${da(n.deploy.at)}${n.deploy.elapsed_ms!==null?` \xB7 ${Ps(n.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${n.badge.tone}"
      >${n.badge.label}</span
    >
  </button>`:""}function Xr(e){let t=hn(e.created_at),n=hn(e.updated_at);return!t&&!n?"":c`<div class="worker-mini__meta">
    ${t?c`<span title=${`\uC0DD\uC131 ${cn(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&n?c`<span>·</span>`:""}${n?c`<span title=${`\uC218\uC815 ${cn(e.updated_at)}`}
          >수정 ${n}</span
        >`:""}
  </div>`}function Xb(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function Ms(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function pa(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function jn(e,t,n={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(_=>_&&_.bead_id===t&&_.phase!=="done").sort((_,h)=>(_.requested_at||0)-(h.requested_at||0)).at(-1),o=typeof n.attempt_id=="string"&&n.attempt_id.length>0?n.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=n.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":n.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":n.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":n.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,l=s?Xb(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=n.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!n.external&&!n.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${l||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:l,error:i,confirmation:d}}function Is(e){let t=e.discard;if(!t||!t.operation)return"";let n=t.operation,r=n.kind==="stale_work_backup_fresh"&&!t.error?null:n.backup?.path,s=n.original_pr,o=n.revert_pr;return c`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?c`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${n.operation_id}</code>
    ${r?c`<code>백업: ${r}</code>`:t.error?c`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?c`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?c`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var Jb={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function Md(e,t=!1){if(!e||typeof e!="object")return null;let n=e;if(n.reason!=="worktree_stale_work"||!n.stale_work||typeof n.stale_work!="object")return null;let r=n.stale_work,s=r.residue==="branch"?"branch":"worktree",o=r.state==="unique"?"unique":"unknown",a=r.summary&&typeof r.summary=="object"?r.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let l=typeof r.cause=="string"?r.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:Jb[l]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof r.action_id=="string"?r.action_id:"",can_resume:r.can_resume===!0,can_continue:r.can_continue===!0,can_backup_fresh:r.can_backup_fresh===!0,can_recheck:r.can_recheck===!0,locked:t}}function fa(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let n=t.pin===!0?" exec-chip--pin":"",r=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return c`${e.orchestration?c`<span
        class="exec-chip exec-chip--orch${n}"
        title=${`${e.orchestration.title}${r}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?c`<span
        class="exec-chip exec-chip--worker${n}"
        title=${`${e.worker.title}${r}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function eh(e){return c`<div
    class="mon-overlap__popover"
    role="dialog"
    aria-label="scope 겹침"
  >
    ${e.rows.map(t=>c`<div class="mon-overlap__row">
          <div class="mon-overlap__hd">
            <span class="mon-overlap__rid">${t.id}</span>
            <span class="mon-overlap__rtitle">${t.title}</span>
            <span class="mon-overlap__rwhere">${t.location_label}</span>
          </div>
          <ul class="mon-overlap__paths">
            ${t.prefixes.map(n=>c`<li>${n}</li>`)}
          </ul>
          ${t.action.kind==="note"?c`<p class="mon-overlap__note">${t.action.text}</p>`:c`<button
                type="button"
                class="mon-overlap__place"
                data-counterpart-id=${t.id}
                ?disabled=${t.action.kind==="disabled"}
                title=${t.action.title}
              >
                ${t.action.label}
              </button>`}
        </div>`)}
  </div>`}function _a(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],n=Array.isArray(e.overlaps)?e.overlaps:[],r=e.scope_missing===!0,s=e.popover||null,o=e.cross_lane||null,a=e.armed_lane||null;return t.length===0&&n.length===0&&!r&&!o&&!a?"":c`<div class="worker-deps">
    ${o?c`<button
          type="button"
          class="worker-dep worker-dep--lane mon-lane__chip"
          data-lane-id=${o.lane_id}
          title="이 연결 레인으로 이동"
        >
          ${o.label}
        </button>`:""}
    ${a?c`<span
          class=${`worker-dep worker-dep--armed${a.orphan?" worker-dep--armed-orphan":""}`}
          title=${a.orphan?"\uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD55C \uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC2A4\uCF00\uC904\uB7EC\uB294 \uACC4\uC18D \uBC1C\uCC28\uD569\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778\uC774 \uC774 \uD56D\uBAA9\uC744 \uBC1C\uCC28\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uB808\uD3EC \uC790\uB3D9 \uC9C4\uD589\uACFC \uBB34\uAD00\uD569\uB2C8\uB2E4"}
          >${a.orphan?c`${a.label}<button
                  type="button"
                  class="worker-dep__label mon2-arm__release"
                  data-lane-id=${a.lane_id}
                >
                  해제
                </button>`:a.label}</span
        >`:""}
    ${t.map(i=>c`<span
          class=${`worker-dep worker-dep--pred${i.foreign?" worker-dep--foreign":""}`}
          title=${i.title||""}
          >${i.openable===!0?c`<button
                type="button"
                class="worker-dep__label worker-dep__open"
                data-dep-id=${i.id}
                data-root-dir=${i.root_dir||""}
              >
                ${i.label}
              </button>`:i.label}</span
        >`)}${n.map(i=>c`<button
          type="button"
          class="worker-dep worker-dep--overlap mon-overlap__chip"
          data-overlap-id=${i.id}
          aria-label=${`scope \uACB9\uCE68 ${i.id} (${i.location_label})`}
          title=${[`\uACB9\uCE68 ${i.id} (${i.location_label})`,...i.prefixes].join(`
`)}
        >
          ⧉ ${i.id}
        </button>`)}${r?c`<span
          class="worker-dep worker-dep--muted"
          title="겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description \`## scope\`에 선언 필요"
          >scope 없음</span
        >`:""}${s?eh(s):""}
  </div>`}function ma(e){if(!e)return"";let t=e.chips||{},n=t.route||e.route,r=t.route_source==="derived"||e.route_source==="derived";return n?c`<span
    class="ctl-chip ctl-chip--route${r?" is-derived":""}"
    title=${r?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${r?"unset":n}</span
  >`:""}function th(e){let t=e?e.quick_fix_review:null;if(!t)return"";let n=t.state;if(n!=="reviewed"&&n!=="stale")return"";let r=Array.isArray(t.missing)?t.missing:[],s=[n==="reviewed"?"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uC77C\uCE58\uD569\uB2C8\uB2E4":"quick_fix self-review \uC601\uC218\uC99D\uC774 \uC9C0\uAE08 \uBCF8\uBB38\uACFC \uB2E4\uB985\uB2C8\uB2E4",...r].join(`
`);return c`<span
    class="ctl-chip worker-card__qfr worker-card__qfr--${n}"
    title=${s}
    >${n==="reviewed"?"\uB9AC\uBDF0 \u2713":"\uB9AC\uBDF0 stale"}</span
  >`}function Dd(e){return e?c`<button
    type="button"
    class="ctl-chip ctl-chip--from"
    data-from-id=${e}
    title=${`\uCD9C\uCC98 ${e} \uC5F4\uAE30`}
  >
    ↩ from ${e}
  </button>`:""}function ga(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=Math.max(0,Math.min(4,Math.trunc(e)));return c`<span class="worker-pri" title=${`\uC6B0\uC120\uC21C\uC704 P${t}`}
    >P${t}</span
  >`}function nh(e){let t=Array.isArray(e.badges)?e.badges:[],n=un(e.usage),r=Zn(e.usage),s=hn(e.done_at);return c`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?c`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${cn(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>c`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${n.length>0?n.map(o=>c`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):r?c`<span class="worker-usage" title=${fs(e.usage)}
              >${r}</span
            >`:""}
      ${typeof e.work_ms=="number"?c`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${Ps(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function lr(e){if(e.lane==="done"&&e.done_layout==="three_line")return nh(e);let t=e.draggable&&!e.done,n=Array.isArray(e.badges)?e.badges:[],r=un(e.usage),s=Zn(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,l=i?hn(e.done_at):"",u=t?c`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?c`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",_=e.worker_serial===!0?c`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",h=e.workspace_name?c`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=c`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,k=e.lane==="done"?"":ma(e.workflow),D=e.lane==="done"?"":Dd(e.from_id),B=ga(e.priority),Y=c`<span class="worker-mini__title">${e.title}</span>`,le=e.pr_url&&e.pr_number?c`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",K=e.completion_repair_pr_url&&e.completion_repair_pr_number?c`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",N=n.map(ge=>ge===e.live_badge?c`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${ge}</span
        >`:c`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${ge===e.completion_badge&&e.completion_title||""}
          >${ge}</span
        >`),M=e.reason?c`<span class="worker-mini__reason">${e.reason}</span>`:"",G=r.length>0?r.map(ge=>c`<span class="worker-usage" title=${ge.tooltip}
              >${ge.label}</span
            >`):s?c`<span class="worker-usage" title=${fs(e.usage)}
            >${s}</span
          >`:"",L=o?c`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?c`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",I=e.merge_action?c`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",te=e.cancel_action?c`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",xe=e.timeline_action?c`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ke=e.discard,fe=ke?.action||e.discard_action?c`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ke?.attempt_id||""}
          data-operation-id=${ke?.operation?.operation_id||""}
          data-discard-mode=${ke?.confirmation||"unmerged"}
          ?disabled=${ke?!ke.enabled:e.discard_enabled===!1}
          title=${ke?ke.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ke?.label||"\uD3D0\uAE30"}
        </button>`:"",ae=e.stale_work||null,Te=ae?c`${ae.can_resume||ae.can_continue?c`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            기존 작업 이어가기
          </button>`:""}${ae.can_backup_fresh?c`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            백업 후 새로 시작
          </button>`:""}${ae.can_recheck?c`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${ae.action_id}
            ?disabled=${ae.locked}
          >
            다시 확인
          </button>`:""}`:"",Ie=ae?c`<div class="worker-mini__stale">
        <strong>${ae.title}</strong>
        <span>${ae.summary}</span>
        <span>${ae.cause}</span>
        ${ae.can_backup_fresh?c`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",$e=e.revise_action?c`<button
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
        </button>`:"",ee=!!(e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)),Z=h||k||D||ee||G?c`<div class="worker-chips">
          ${h}${k}${D}${ee?fa(e.exec_chips,{pin:e.exec_chips_pinned===!0}):""}${G}
        </div>`:"",Ce=_a(e.dependency_chips),z=Is(e),ne=!!(o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ke?.operation||e.revise_action||ae);return c`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?c`<div class="worker-mini__row1">
            ${h}${b}${B}${D}${Y}
          </div>
          <div class="worker-mini__row2">
            ${G}${l?c`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${cn(e.done_at)}`}
                  >완료 ${l}</span
                >`:""}${typeof e.work_ms=="number"?c`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${Ps(e.work_ms)}</span
                >`:""}${N}${L}
            <span class="worker-mini__actions"
              >${I}${te}${xe}${fe}</span
            >
            ${Xr(e)}
          </div>`:a?c`<div class="worker-mini__head">
              ${u}${d}${b}${B}${le}${K}${N}${_}${M}
            </div>
            <div class="worker-mini__body">${Y}${Ie}</div>
            ${Ce}${Z}${ne?c`<div class="worker-mini__foot">
                  ${L}
                  <span class="worker-mini__actions"
                    >${I}${te}${xe}${fe}${$e}${Te}</span
                  >
                  ${Is(e)}
                </div>`:""}
            ${Xr(e)}`:c`<div class="worker-mini__line">
              ${u}${d}${b}${B}${Y}${le}${K}${N}${_}${M}${L}${I}${te}${xe}${fe}
            </div>
            ${Ce}${Z}${z} ${Xr(e)}`}
  </div>`}function rh(e,t){let n,r=[];for(let s of e){let o=s.group||"";o.length>0&&o!==n&&r.push(c`<div class="worker-card__place-group">${o}</div>`),n=o,r.push(c`<button
        type="button"
        class="worker-card__place-lane${o.length>0?" worker-card__place-lane--nested":""}"
        data-bead-id=${t}
        data-lane=${s.id}
        ?disabled=${s.disabled===!0}
        title=${s.title||`${s.label} \uB300\uAE30 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00`}
      >
        <span>${s.label}</span>
        ${typeof s.count=="number"?c`<span class="worker-card__place-count">${s.count}</span>`:""}
      </button>`)}return c`${r}`}var sh={exclusive_machine:"\uC2E4\uD589 \uC911 \uBA38\uC2E0 \uB3C5\uC810 \uD544\uC694 \u2014 \uBD80\uD558 \uD558\uB124\uC2A4\xB7timing \uBE44\uAD50"};function Yi(e,t=null,n={}){let r=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!r,o=s&&t&&t.bead_id===e.id,a=e.session_preferred===!0,i=sh[e.session_preferred_reason||""]||"",l=e.workflow,u=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),d=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),_=_a(e.dependency_chips),h=e.workspace_name?c`<span class="worker-card__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",b=ma(l),k=Dd(e.from_id),D=!!(e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker));return c`<div
    class="worker-card${s?"":" worker-card--static"}${r?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?c`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span
      >${ga(e.priority)}
      ${r?c`<span
            class="ctl-chip ctl-chip--label worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >worker-ineligible</span
          >`:a?c`<span
              class="ctl-chip ctl-chip--label worker-card__session-preferred"
              title=${i}
              >세션 권장</span
            >`:""}${th(l)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${l?To(l,e.status,{onOpenDoc:n.onOpenDoc}):""}${_}
    ${h||b||k||D?c`<div class="worker-chips">
          ${h}${b}${k}${fa(e.exec_chips,{pin:n.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason||n.dep_action===!0?"":" worker-card__foot--actions-only"}"
    >
      ${o?c`<div class="worker-card__place-menu">
            ${rh(t.lanes,e.id)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:c`${e.reason?c`<span
                  class="worker-card__reason${d?" worker-card__reason--danger":""}"
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":r?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":u?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴</button
            >${n.dep_action===!0?c`<button
                  type="button"
                  class="worker-card__dep mon-dep__btn"
                  data-bead-id=${e.id}
                  title="의존성"
                  aria-label="의존성"
                >
                  ⛓
                </button>`:""}`}
    </div>
    ${Xr(e)}
  </div>`}function Ln(e){let t=!!e.collapsible&&!!e.collapsed,n=c`<span
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
          ${n}
          <span class="worker-pane__caret" aria-hidden="true"
            >${t?"\u25B8":"\u25BE"}</span
          >
        </button>`:c`<header class="worker-pane__hd">
          ${n}${e.header_control?e.header_control:""}
        </header>`}
    ${t?"":c`${e.controls?e.controls:""}
          <div class="worker-pane__body">
            ${e.body?e.body:e.items.length===0?c`<div class="worker-pane__empty">
                    ${e.empty||""}
                  </div>`:e.items.map(r=>e.lane==="candidate"?Yi(r,e.place_menu,{onOpenDoc:e.onOpenDoc}):lr(r))}
          </div>`}
  </section>`}function ba(e){return e.replace(/\/+$/,"")}function oh(e,t){let n=ba(e),r=ba(t);return n===r||r.startsWith(`${n}/`)||n.startsWith(`${r}/`)}function ha(e,t){let n=new Set;for(let r of e)for(let s of t){if(!oh(r,s))continue;let o=ba(r),a=ba(s);n.add(o.length>=a.length?o:a)}return[...n].sort()}function qd(e,t){let n=new Map;if(!e||typeof e!="object")return n;let r=e,s=[],o=new Set;for(let a of t){if(o.has(a.id))continue;o.add(a.id);let i=r[a.id];if(!i||!Array.isArray(i.scope))continue;let l=i.scope.filter(u=>typeof u=="string"&&u.length>0);if(l.length===0){n.set(a.id,{overlaps:[],scope_missing:!0});continue}n.set(a.id,{overlaps:[],scope_missing:!1}),s.push({member:a,scope:l})}for(let a=0;a<s.length;a+=1)for(let i=a+1;i<s.length;i+=1){let l=ha(s[a].scope,s[i].scope);if(l.length===0)continue;let u=s[a].member,d=s[i].member;n.get(u.id)?.overlaps.push({id:d.id,title:d.title,location_label:d.location_label,prefixes:l}),n.get(d.id)?.overlaps.push({id:u.id,title:u.title,location_label:u.location_label,prefixes:l})}return n}var Nd=["parallel","serial","candidate"];function Ds(e){return e==="pr_wait"?"PR \uB300\uAE30":"\uC2E4\uD589 \uC911"}function Zi(e,t,n){let r=n.members_by_id.get(e),s=n.members_by_id.get(t);if(!r||!s)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let o=r.lane_id,a=s.lane_id;if(o!==null&&o===a)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let i=Nd.includes(r.kind),l=Nd.includes(s.kind);if(i&&a!==null)return{kind:"ops",title:`${a} \uB05D\uC5D0 ${e}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:e,lane:a,index:n.serial_raw_lengths[a]||0}]};if(o!==null&&l&&a===null)return{kind:"ops",title:`${o} \uB05D\uC5D0 ${t}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:o,index:n.serial_raw_lengths[o]||0}]};if(i&&o===null&&l&&a===null){let u=ah(n);return u===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 \uC9C1\uB82C \uB808\uC778 \uC218\uB97C \uC870\uC808\uD558\uC138\uC694"}:{kind:"ops",title:`${u} \uB808\uC778\uC5D0 ${t} \u2192 ${e} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,ops:[{bead_id:t,lane:u,index:0},{bead_id:e,lane:u,index:1}]}}return!i&&!l?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:i?{kind:"note",text:`${Ds(s.kind)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ds(r.kind)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function ah(e){for(let t=0;t<e.serial_lane_count;t+=1){let n=`s${t+1}`;if((e.serial_raw_lengths[n]||0)===0&&!e.occupied_lanes.has(n))return n}return null}var Fd={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},jd={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function Bd(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Qi(e){for(let t of Bd(e))if(Object.hasOwn(Fd,t))return Fd[t];return null}function Xi(e){let t=null;for(let n of Bd(e))Object.hasOwn(jd,n)&&(t=jd[n]);return t}function ya(e){let t=Qi(e),n=Xi(e);return t&&n?`${t} \u2014 ${n}`:t||n?t||n:typeof e=="string"?e:""}function Ud(e,t){let n=Qi(e)??Qi(t),r=Xi(t)??Xi(e);return n&&r?`${n} \u2014 ${r}`:n||r?n||r:typeof t=="string"?t:""}var Wd=160;function ih(e){return e.length>Wd?`${e.slice(0,Wd)}\u2026`:e}function lh(e,t){return!e||!e.reason?"":c`<div class="worker-banner__detail">
    ${t==="loud_fail_blocker"?"\uAC00\uB4DC:":"\uC6D0\uC778:"}
    ${e.reason}${e.command?c` · <code>${ih(e.command)}</code>`:""}
  </div>`}function ch(e){return e?c`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function uh(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),n=Math.floor(t/60),r=t%60;return n>0?`${n}m ${String(r).padStart(2,"0")}s`:`${r}s`}function zd(e){let t=e.failure?ya(e.failure.reason):"";return c`<div class="worker-banners">
    ${e.failure?c`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
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
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${lh(e.failure.cause_detail,e.failure.reason)}
          ${ch(e.failure.reason)}
          ${Is({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function dh(e){return!e||!e.repo&&!e.serial_lane_id?"":c`${e.repo?c`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?c`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`}var ph=new Set(["codex-runner"]);function fh(e,t,n,r=null){if(!e)return"";let s=e.last_activity||null,o=s&&typeof s.text=="string"?s.text:"",a=s&&typeof s.at=="number"?s.at:null,i=(r||!Array.isArray(e.legs)?[]:e.legs).filter(b=>b&&!(typeof b.agent_type=="string"&&ph.has(b.agent_type))),l=i.filter(b=>b&&b.state==="live"),u=i.filter(b=>b&&b.state!=="live"),d=r&&typeof r.last_event_at=="number"?hn(r.last_event_at,t):"",_=r?hn(r.updated_at,t):"",h=d?`\uCD5C\uADFC \uD65C\uB3D9 ${d}`:_?`\uAC31\uC2E0 ${_}`:"";return c`${o?c`<div class="rtile__activity${n?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${o}</span>
        ${a!==null?c`<span class="rtile__activity-age"
              >${hn(a,t)}</span
            >`:""}
      </div>`:h?c`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">${h}</span>
        </div>`:""}${l.length>0||u.length>0?c`<div class="rtile__legs">
        ${l.map(b=>c`<span
              class="rtile__leg rtile__leg--live"
              title="이 세션이 띄운 서브에이전트/Codex 세션이 실행 중입니다"
              >위임 중 · ${b.label}</span
            >`)}${u.length>0?c`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${u.map(b=>b.label).join(", ")}`}
              >위임 완료 ${u.length}</span
            >`:""}
      </div>`:""}`}var _h={remote:"\uB2E4\uB978 \uBA38\uC2E0 \uC138\uC158 \u2014 \uC774 \uC11C\uBC84\uC5D0 transcript \uC5C6\uC74C",missing:"transcript \uD30C\uC77C \uC5C6\uC74C"};function mh(e){if(!e)return"";let t=_h[e.locality]||"";return c`<button
    type="button"
    class="rtile__session"
    ?disabled=${t.length>0}
    title=${t||"\uB77C\uC774\uBE0C \uC138\uC158 \uC5F4\uAE30"}
    aria-label="라이브 세션 열기"
  >
    ▤ 세션
  </button>`}function Ji(e,t,n=null,r={}){let s=e.kind==="session",o=s&&Array.isArray(e.session_refs)&&e.session_refs.find(ae=>ae&&ae.current===!0)||null,a=e.failed===!0,i=!!e.paused,l=a?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):i?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?uh(t-e.started_at):"\u2014",u=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,d=us(e),_=un(e.usage),h=Zn(e.usage),b=e.conflict_resolution?i?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,k=e.base_exception||null,D=e.landing,B=e.attempt_id&&e.attempt_id===n,Y=r.monitor||null,le=dh(Y),K=Y?_a(Y.dependency_chips):"",N=fh(Y,t,i,s?{updated_at:e.updated_at??null,last_event_at:o&&o.locality==="local"?o.last_event_at:null}:null),M=s&&e.workflow?.chips?.exec_receipt||null,G=ma(e.workflow),L=M?c`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${Vn(M)}`}
        >${`${M.kind}:${Co(M)}`}</span
      >`:"",I=o?c`<span
        class="ctl-chip ctl-chip--sref"
        title=${`${o.provider}:${o.session_id}@${o.host}${(e.session_refs||[]).length>=2?` \xB7 \uC774\uB825 ${(e.session_refs||[]).length}`:""}`}
        >${ps(o)}</span
      >`:"",te=le||G||I||L?c`<div class="rtile__meta">
          ${le}${G}${I}${L}
        </div>`:"",xe=c`${b?c`<span class="worker-mini__badge">${b}</span>`:""}${k?c`<span
        class="worker-mini__badge"
        title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
        >${k}</span
      >`:""}`,ke=s?"":Xr(e),fe=e.discard?.action?c`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return c`<div
    class="rtile${B?" rtile--sel":""}${i?" rtile--paused":""}${a?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${ga(e.priority)}${d?c`<span class="rtile__resumed" title=${d}>↻</span>`:""}${xe}
      <div class="rtile__hd-actions">
        ${s?c`${typeof e.started_at=="number"?c`<span class="rtile__elapsed">${l}</span>`:""}${mh(o)}<span
                class="rtile__session-badge"
                title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
                >세션</span
              >`:c`<span class="rtile__elapsed">${l}</span>`}
        ${s?"":a?c`<button
                  type="button"
                  class="rtile__resume"
                  ?disabled=${e.resume_eligible===!1}
                  title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                  aria-label="이어하기"
                >
                  ↻ 이어하기
                </button>
                ${fe}
                <button
                  type="button"
                  class="rtile__dismiss"
                  title="실패 알림 닫기 — 레인에는 남습니다"
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
                ${i?c`<button
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
                ${fe}`}
      </div>
    </div>
    <div class="rtile__title">${e.title}</div>
    ${N}${e.rollup?Eo(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:oi}):""}
    ${D?c`<div class="rtile__landing">
          <span
            class="merge-step${D.failed?" merge-step--failed":""}"
            style=${`--progress: ${D.percent}%`}
            >${D.label}${D.index>0?c`<span class="merge-step__n"
                  >${D.index}/${D.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${K}
    ${s?te:le||G||u||_.length>0||h?c`<div class="rtile__meta">
            ${le}${G}${fa(e.exec_chips)}
            ${_.length>0?_.map(ae=>c`<span class="worker-usage" title=${ae.tooltip}
                      >${ae.label}</span
                    >`):h?c`<span
                    class="worker-usage"
                    title=${fs(e.usage)}
                    >${h}</span
                  >`:""}
          </div>`:""}
    ${Is(e)} ${ke}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${a||i?"":c`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function el(e,t=Date.now(),n=null,r=null){let s=Array.isArray(e)?e:[];return c`<div class="worker-rungrid" id="worker-rungrid">
    ${s.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:s.map(o=>Ji(o,t,n,{monitor:r&&r.get(o.bead_id)||null}))}
  </div>`}var tl=new Set(["unavailable","not_applicable"]);function cr(e,t){if(typeof e!="object"||e===null)return null;let n=e[t];return typeof n=="object"&&n!==null?n:null}function Hd(e){return e.filter(t=>t!==null).join(" \xB7 ")}function ur(e,t){return t===null?null:`${ir[e]}: ${t.display} (${ta[t.source]})`}function nl(e){return e.filter(t=>t!==null).join(`
`)}function Ns(e){if(typeof e!="object"||e===null)return null;let t=kr(e);if(t==="")return null;let n=(r,s)=>typeof s=="string"&&s.length>0?`${r}: ${s}`:null;return{text:t,title:nl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",n("runner",e.runner),n(ir.orchestration_model,e.model),n(ir.orchestration_effort,e.effort),n(ir.orchestration_speed,e.speed)])}}function Sr(e,t){let n=cr(e,"orchestration_model");if(n===null||n.resolution==="unavailable")return null;let r=cr(e,"orchestration_effort"),s=cr(e,"orchestration_speed"),o=Hd([Fn(t,n.value??""),n.display,r!==null&&r.value!==null?r.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:nl(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",ur("orchestration_model",n),ur("orchestration_effort",r),ur("orchestration_speed",s)])}}function gh(e,t){return e===null||e.value===null||tl.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function bh(e){return e===null||tl.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function hh(e){return e===null?null:e.value==="auto"?"auto":tl.has(e.resolution)?null:e.display}function dr(e,t){if(typeof e!="object"||e===null)return null;let n=cr(e,"impl_dispatch"),r=cr(e,"impl_runtime"),s=cr(e,"impl_model"),o=cr(e,"impl_effort"),a=cr(e,"impl_speed"),i=n!==null&&n.value==="main"?"\uBA54\uC778":Hd([gh(r,t??null),bh(s),hh(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:nl(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",ur("impl_dispatch",n),ur("impl_runtime",r),ur("impl_model",s),ur("impl_effort",o),ur("impl_speed",a)])}}var dn="",yh=["impl_runtime","impl_model","impl_effort"],vh=["claude_account","codex_account"],wh=5,va=1;function vn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function wa(e,t){let n=t.transport,r=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(P=>de(P,"error",4e3)),o={},a={},i=[],l=!1,u={state:"absent",values:{},warnings:[]},d={},_={},h=Promise.resolve(),b={claude:null,codex:null},k=!1,D=null,B={},Y="",le="",K=!1,N=!1,M=!1,G=null,L=!1;function I(){let P=t.queue?t.queue():null;return vn(P)?P:null}function te(){let P=I();return P?P.runner_catalog:null}function xe(){let P=I();return P&&vn(P.execution_defaults)?P.execution_defaults:null}function ke(){let P=t.implPresetStore?.get();return vn(P)&&Array.isArray(P.presets)?P:null}function fe(){return r===null?{}:{root_dir:r}}async function ae(P,J){return L||!n?null:await n(P,J)}function Te(P){P&&vn(P.queue)&&t.onQueueAdopt?.(P.queue)}async function Ie(P,J){let ve=I();if(!ve||L)return null;let E=await ae(P,{...J,...fe(),expected_revision:ve.revision});if(Te(E),r!==null&&E&&E.conflict){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:I()?.revision??ve.revision;E=await ae(P,{...J,...fe(),expected_revision:H}),Te(E)}return E}async function $e(){l=!0,De();try{let P=await ae("get-session-defaults",{...fe()});o=vn(P?.values)?{...P.values}:{},a={...o},i=Array.isArray(P?.warnings)?P.warnings:[]}catch(P){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}finally{l=!1,De()}}async function ee(){let P=cd(o,a);if(Object.keys(P).length!==0){try{let J=await ae("set-session-defaults",{values:P,...fe()});o=vn(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}De()}}function Z(P,J){if(!vn(P))return;let ve=P.state;u={state:ve==="usable"||ve==="unusable"||ve==="absent"?ve:"absent",values:vn(P.values)?{...P.values}:{},warnings:Array.isArray(P.warnings)?P.warnings:[]},_={...u.values},J&&(d={..._})}async function Ce(){try{Z(await ae("get-workspace-accounts",{...fe()}),!0)}catch(P){u={state:"unusable",values:{},warnings:["kv_read_failed"]},_={},d={},s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${P instanceof Error?P.message:String(P)}`)}De()}async function z(P){try{let J=await fetch(P);if(!J.ok)return null;let ve=await J.json();if(!vn(ve)||!Array.isArray(ve.accounts))return null;let E=ve.accounts.filter(H=>vn(H)&&typeof H.key=="string"&&H.key.length>0&&typeof H.email=="string"&&H.email.length>0);return{accounts:E,active:E.find(H=>H.active===!0)||null}}catch{return null}}async function ne(){k=!0;let[P,J]=await Promise.all([z("/api/claude-usage"),z("/api/codex-usage")]);L||(b={claude:P,codex:J},De())}function ge(){let P={};for(let J of vh){let ve=Object.hasOwn(d,J)?d[J]:null,E=Object.hasOwn(_,J)?_[J]:null;ve!==E&&(P[J]=ve)}return P}async function Se(){let P=ge();if(Object.keys(P).length!==0){try{Z(await ae("set-workspace-accounts",{values:P,...fe()}),!1)}catch(J){s(`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}De()}}function Ye(P,J){J===dn?delete d[P]:d[P]=J,De(),h=h.then(()=>Se())}function ue(P,J){if(yh.includes(P)){St(P,J);return}J===dn?delete a[P]:a[P]=J,De(),ee()}function Ue(){let P=Lt().orchestration_model,J=yn({global:{orchestration_model:P??void 0},execution_defaults:xe(),runner_catalog:te()}).orchestration_model.value;return J?Fn(te(),J):null}function gt(P,J){typeof J=="string"&&J.length>0?a[P]=J:delete a[P]}function St(P,J){let ve=J===dn?void 0:J,E=id({impl_runtime:P==="impl_runtime"?ve:a.impl_runtime,impl_model:P==="impl_model"?ve:a.impl_model,impl_effort:P==="impl_effort"?ve:a.impl_effort},te(),Ue());gt("impl_runtime",E.impl_runtime),gt("impl_model",E.impl_model),gt("impl_effort",E.impl_effort),De(),ee()}async function xt(){let P=I();if(!P)return;let J={orchestration_model:P.orchestration_model??null,orchestration_effort:P.orchestration_effort??null,orchestration_speed:P.orchestration_speed??null},ve=ud(J,{...J,...B});if(Object.keys(ve).length!==0){try{let E=await Ie("worker-queue-set-orchestration-defaults",{values:ve});if(E&&E.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}B={}}catch(E){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}}function ft(P,J){B[P]=J===dn?null:J,De(),xt()}function T(P){if(D=P,!P){De();return}let J=te(),ve=Lt(),E=ve.orchestration_model;E&&!Rs(J,P).includes(E)&&(B.orchestration_model=null,E=null);let H=ve.orchestration_effort;H&&!Bi(J,P,E||Sn).includes(H)&&(B.orchestration_effort=null),De(),xt()}async function ce(P){if(!(!I()||P<va)){try{await Ie("worker-queue-set-slots",{slots:P})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}De()}}async function Oe(P){if(!(!I()||P<va||P>wh)){try{await Ie("worker-queue-set-serial-lane-count",{count:P})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}De()}}async function Me(P,J){let ve=P==="auto_advance"?"worker-automation-toggle":P==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await Ie(ve,{on:J})}catch(E){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}function Qe(){let P={},J=Lt();for(let ve of Qo){let E=tr.includes(ve)?J[ve]:a[ve];typeof E=="string"&&E.length>0&&(P[ve]=E)}return P}async function st(){let P=ke();if(!P)return;let J=Qe();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ve=(P.presets||[]).find(H=>H.id===Y),E=le.trim()||(ve?ve.name:"");if(!E){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let H=ve?await ae("impl-preset-update",{expected_revision:P.revision,id:ve.id,name:E,settings:J}):await ae("impl-preset-create",{expected_revision:P.revision,name:E,settings:J});if(H&&H.applied){if(le="",!ve&&Array.isArray(H.presets)){let Re=H.presets.find(x=>x.name===E);Y=Re?Re.id:Y}De()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De()}catch(H){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${H instanceof Error?H.message:String(H)}`)}}async function bt(){let P=ke();if(!(!P||Y.length===0))try{let J=await ae("impl-preset-delete",{expected_revision:P.revision,id:Y});J&&J.applied?(Y="",De()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),De())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function yt(P){o=vn(P.values)?{...P.values}:{},a={...o},i=Array.isArray(P.warnings)?P.warnings:[],vn(P.queue)&&(t.onQueueAdopt?.(P.queue),B={})}async function re(){let P=ke(),J=I();if(!P||!J||Y.length===0)return;let ve=E=>({preset_id:Y,expected_revision:P.revision,expected_queue_revision:E,...fe()});try{let E=await ae("apply-impl-preset-global",ve(J.revision));if(E&&E.applied&&yt(E),r!==null&&E&&E.queue_applied===!1){let H=E.queue&&typeof E.queue.revision=="number"?E.queue.revision:I()?.revision??J.revision;E=await ae("apply-impl-preset-global",ve(H)),E&&E.applied&&yt(E)}E&&E.applied?E.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):E&&E.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(E){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${E instanceof Error?E.message:String(E)}`)}De()}async function Q(){N=!0,M=!1,De();try{let P=await ae("get-worker-system-prompt",{});!P||typeof P!="object"||Array.isArray(P)?M=!0:G=P}catch{M=!0}finally{N=!1,De()}}function je(){if(K=!K,K&&!G){Q();return}De()}function it(){let P=Kr({loading:N,error:M});if(P)return P;if(!G)return"";let J=Array.isArray(G.variants)?G.variants:[];return c`<div class="settings-dialog__sp-body">
      ${G.target_base_placeholder?c`<div class="prompt-block__meta">
            \`${G.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(ve=>c`<div class="settings-dialog__sp-variant" data-variant=${ve.key}>
            <div class="settings-dialog__sp-cond">${ve.condition}</div>
            ${er(ve.label,ve.system_prompt)}
          </div>`)}
    </div>`}function We(){return c`<section
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
        aria-expanded=${K?"true":"false"}
        @click=${je}
      >
        ${K?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${K?it():""}
    </section>`}function we(P,J,ve,E,H,Re,x){let R=H[P]??dn,X=Ui(P,ve,H,xe(),te(),x),_e=X.options.find(v=>v.value===R),Ae=R===dn?X.full_value:_e?.full_value;return c`<select
        class=${R===dn?"settings-dialog__unset":""}
        data-key=${P}
        aria-label=${J}
        title=${Ae||""}
        ?disabled=${Re===!0||X.disabled}
        .value=${Ar(String(R))}
        @change=${v=>E(P,String(v.target.value))}
      >
        <option value=${dn} ?selected=${R===dn}>
          ${X.unset_label}
        </option>
        ${X.options.map(v=>c`<option
              value=${v.value}
              title=${v.full_value||""}
              ?selected=${v.value===R}
            >
              ${v.label}
            </option>`)}
      </select>
      ${R===dn?c`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Ge(P,J,ve,E,H,Re=!1,x){return c`<div
      class=${`settings-dialog__row${Re?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${we(P,J,ve,E,H,Re,x)}
      </span>
    </div>`}function dt(P,J){let ve=J?J.active:null;return vn(ve)?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${P==="claude"?ve.email:Qr({...ve,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)"}function _t(P,J,ve){let E=b[ve],H=Object.hasOwn(d,P)?d[P]:dn,Re=ve==="claude"?sa:Qr,x=!!E?.accounts.some(R=>R.key===H);return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${J}
          data-account-key=${P}
          @change=${R=>Ye(P,String(R.target.value))}
        >
          <option value=${dn} ?selected=${H.length===0}>
            ${dt(ve,E)}
          </option>
          ${H.length>0&&!x?c`<option value=${H} selected>
                ${H} (목록에 없음)
              </option>`:""}
          ${E?.accounts.map(R=>c`<option value=${R.key} ?selected=${R.key===H}>
                ${Re(R)}
              </option>`)||""}
        </select>
        ${E?"":c`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`}function mt(){let P=u.warnings.join(", ");return u.state==="unusable"?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC744 \uD574\uC11D\uD560 \uC218 \uC5C6\uC5B4 \uC774 \uB808\uD3EC\uC758 \uB514\uC2A4\uD328\uCE58\uAC00 \uAC70\uBD80\uB429\uB2C8\uB2E4 \u2014 ${P} \xB7 \uACC4\uC815\uC744 \uB2E4\uC2DC \uACE0\uB974\uBA74 \uD574\uC18C\uB429\uB2C8\uB2E4`:u.warnings.length>0?`\uC2E4\uD589 \uACC4\uC815 \uAE30\uBCF8\uAC12\uC5D0 \uC54C \uC218 \uC5C6\uB294 \uD0A4\uAC00 \uC788\uC2B5\uB2C8\uB2E4 \u2014 ${P}`:null}function Pt(P,J,ve,E,H){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${P}
      </span>
      <span class="settings-dialog__controls">
        ${we(ve,`${P} \uBAA8\uB378`,E,ue,a,!1)}
        ${we(H,`${P} effort`,ea,ue,a,!1)}
      </span>
    </div>`}function Kt(P,J,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${E?" is-on":""}`}
          data-automation=${P}
          aria-pressed=${E?"true":"false"}
          aria-label=${J}
          @click=${()=>Me(P,!E)}
        >
          ${E?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ve}</span>
      </span>
    </div>`}function Ht(P,J,ve,E){return c`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${P}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>E(ve-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ve}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>E(ve+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Ct(P){return c`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${P.rows.length>0?`\uBCC0\uACBD ${P.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${P.rows.map(J=>c`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${J.kind}
          >
            <span class="settings-dialog__preset-diff-label">${J.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${J.before??"\uAE30\uBCF8"}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${J.after??"\uAE30\uBCF8(\uD574\uC81C)"}</span
            >
          </div>`)}
      ${P.ignored_keys.length>0?c`<div class="settings-dialog__preset-diff-note">
            ${P.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Lt(){let P=I(),J={};for(let ve of tr)J[ve]=Object.prototype.hasOwnProperty.call(B,ve)?B[ve]:P&&typeof P[ve]=="string"?P[ve]:null;return J}function Xe(){let P=te(),J=a.impl_runtime,ve=a.impl_model,E=ke(),H=I(),Re=Lt(),x=Rs(P,D),R=Yr(P,void 0).filter(be=>be!==Sn),X=Bi(P,D,Re.orchestration_model||Sn).filter(be=>be!==Sn),_e=Y?(E?.presets||[]).find(be=>be.id===Y):null,Ae=_e?ld(Qe(),vn(_e.settings)?_e.settings:{}):null,v=H&&typeof H.slots=="number"?H.slots:va+1,U=H&&typeof H.serial_lane_count=="number"?H.serial_lane_count:va,ie=xe()?.supported===!0,Ke=mt(),Be=Ui("workflow_mode",Ts,a,xe(),P);return c`
      ${i.length>0?c`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${Ke?c`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${Ke}
          </div>`:""}
      ${ie?"":c`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${l?c`<div class="settings-dialog__empty">불러오는 중…</div>`:c`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${Ar(Y)}
                @change=${be=>{Y=String(be.target.value),De()}}
              >
                <option value="" ?selected=${Y===""}>
                  실행 프리셋…
                </option>
                ${(E?.presets||[]).map(be=>c`<option
                      value=${be.id}
                      ?selected=${be.id===Y}
                    >
                      ${be.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!Ae||Ae.rows.length===0}
                @click=${re}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${Y?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${Ar(le)}
                @input=${be=>{le=String(be.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${Y?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${st}
              >
                ${Y?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${Y.length===0}
                @click=${bt}
              >
                삭제
              </button>
            </div>
            ${Ae?Ct(Ae):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${Ar(D||dn)}
                    @change=${be=>{let Rt=String(be.target.value);T(Rt===dn?null:Rt)}}
                  >
                    <option value=${dn} ?selected=${!D}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${D==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${D==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Ge("orchestration_model","\uBAA8\uB378",x,ft,Re)}
              ${Ge("orchestration_effort","effort",X,ft,Re)}
              ${Ge("orchestration_speed","\uC18D\uB3C4",Es,ft,Re)}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${_t("claude_account","Claude","claude")}
              ${_t("codex_account","Codex","codex")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${dn}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>ue("workflow_mode",dn)}
                    >
                      ${Be.unset_label}
                    </button>
                    ${a.workflow_mode?"":c`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${Ts.map(be=>c`<button
                          type="button"
                          data-mode=${be}
                          aria-pressed=${String(a.workflow_mode===be)}
                          @click=${()=>ue("workflow_mode",be)}
                        >
                          ${be}
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
              ${Pt("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",Cs,"spec_review_effort")}
              ${Pt("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",Jo,"plan_review_effort")}
              ${Pt("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",Cs,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Ge("impl_runtime","\uC704\uC784 \uB300\uC0C1",Xo,ue,a)}
              ${Ge("impl_model","\uBAA8\uB378",Yr(P,J),ue,a)}
              ${Ge("impl_effort","effort",Zr(P,J,ve),ue,a)}
              ${Ge("impl_speed","\uC18D\uB3C4",Es,ue,a)}
              ${Ge("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",R,ue,a,!1,{...a,...Re})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${Kt("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",H?.auto_advance===!0)}
              ${Kt("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",H?.auto_merge===!0)}
              ${Kt("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",H?.auto_repair===!0)}
              ${Ht("slots","\uB3D9\uC2DC \uC2E4\uD589",v,be=>ce(be))}
              ${Ht("serial-lane-count","\uC9C1\uB82C \uB808\uC778",U,be=>Oe(be))}
            </div>
            ${We()}
          `}
    `}function De(){L||at(Xe(),e)}return{load(){B={};let P=[$e(),Ce()];return k||P.push(ne()),Promise.all(P).then(()=>{})},render:De,sessionDraft:()=>({...a}),destroy(){L=!0,at(c``,e)}}}function ka(e){return c`<svg
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
  </svg>`}function Gd(){return ka(ls`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Kd(){return ka(ls`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Vd(){return ka(ls`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Yd(){return ka(ls`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Zd(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Qd(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return un(Mo(t));let n={};for(let i of Hn)n[i]=0;let r=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let l=i&&i.usage;if(l&&typeof l=="object"){let u=!1;for(let d of Hn){let _=l[d];typeof _=="number"&&Number.isFinite(_)&&(n[d]+=_,r=!0,u=!0)}if(u){o+=1;let d=l.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(n.total_cost_usd=s),r?Zn(n):null}function Bn(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function rl(e,t){let n=Bn(e?.counts)?e.counts:null,r=n?n[t]:null;return typeof r=="number"&&Number.isFinite(r)?r:0}function kh(e,t){if(!Bn(t))return e;let n={...e};for(let[r,s]of Object.entries(t))s!==void 0&&(n[r]=s);return n}function $h(e){if(!Bn(e)||!Bn(e.execution_defaults)||!Bn(e.runner_catalog)||!Bn(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let n=yn({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),r=Fn(e.runner_catalog,n.orchestration_model.value??""),s=Sr(n,e.runner_catalog),o=dr(n,r);return s===null&&o===null?null:{orchestration:s,worker:o}}function Xd(e,t){let n=t.notify||(z=>de(z,"error",4e3)),r=document.createElement("div");r.className="mon2-deck__main",e.appendChild(r);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let l=document.createElement("div");l.className="mon2-deck__panel-body",s.append(o,l),e.appendChild(s);let u=null,d=null,_=null,h=new Map;function b(){let z=t.workspacesState?t.workspacesState():[];return Array.isArray(z)?z.filter(ne=>Bn(ne)):[]}function k(z){return b().find(ne=>ne.root_dir===z)||null}function D(z){return kh(k(z),h.get(z))}function B(){for(let z of b()){let ne=h.get(z.root_dir);ne&&typeof ne.revision=="number"&&typeof z.revision=="number"&&z.revision>=ne.revision&&h.delete(z.root_dir)}}async function Y(z,ne,ge){let Se=t.transport,Ye=D(ne);if(!(!Se||!Bn(Ye))){try{let ue=await Se(z,{...ge,root_dir:ne,expected_revision:Ye.revision});if(Bn(ue?.queue)&&h.set(ne,ue.queue),ue&&ue.conflict){let Ue=Bn(ue.queue)&&typeof ue.queue.revision=="number"?ue.queue.revision:D(ne)?.revision;ue=await Se(z,{...ge,root_dir:ne,expected_revision:Ue}),Bn(ue?.queue)&&h.set(ne,ue.queue)}}catch(ue){n(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${ue instanceof Error?ue.message:String(ue)}`)}ee()}}function le(z){u!==z&&(u=z,t.onFocusChange?.(u),ee())}function K(z){le(u===z?null:z)}function N(z){if(d===z){G();return}M(),d=z;let ne=k(z);a.textContent=`${ne?.name||z} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,_=wa(l,{root_dir:z,queue:()=>D(z),transport:t.transport,implPresetStore:t.implPresetStore,notify:n,onQueueAdopt:ge=>{h.set(z,ge),ee()}}),_.load(),ee()}function M(){_?.destroy(),_=null}function G(z){M(),d=null,s.hidden=!0,a.textContent="",z!==!0&&ee()}let L=()=>G();i.addEventListener("click",L);function I(z){z.key==="Escape"&&u!==null&&le(null)}document.addEventListener("keydown",I);function te(z,ne){let ge=Math.max(ne,z,1);return c`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${z}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:ge},(Se,Ye)=>Ye<z?c`<i class="mon2-deck__slot is-run"></i>`:c`<i class="mon2-deck__slot"></i>`)}
    </span>`}function xe(z){let ne=z.auto_advance===!0,ge=z.auto_merge===!0;return c`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Kd():Gd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${ge?" is-on":""}`}
        data-act="merge"
        aria-pressed=${ge?"true":"false"}
        aria-label=${`${z.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${ge?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Vd()}
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===z.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===z.root_dir?"true":"false"}
        aria-label=${`${z.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Yd()}
      </button>`}function ke(z){let ne=$h(z);return ne?c`<div class="mon2-deck__chips">
      ${ne.orchestration?c`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?c`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function fe(z){let ne=[];for(let[ge,Se]of[["queue","\uB300\uAE30"],["pr_wait","PR"],["session_active","\uC138\uC158"]]){let Ye=rl(z,ge);Ye>0&&ne.push(`${Se} ${Ye}`)}return ne.join(" \xB7 ")}function ae(z){let ne=rl(z,"running"),ge=typeof z.slots=="number"?z.slots:1;return c`<div
      class=${`mon2-deck__tile${u===z.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${z.root_dir}
      aria-pressed=${u===z.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${z.root_dir}>${z.name}</span>
        <span
          class="mon2-deck__load"
          title=${`\uC2AC\uB86F ${ge}\uAC1C \uC911 ${ne}\uAC1C \uC2E4\uD589 \uC911`}
        >
          <span class="mon2-deck__load-n">${ne}/${ge}</span>
          ${te(ne,ge)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${z.name} Worker \uD0ED\uC73C\uB85C \uC774\uB3D9`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${xe(z)}</div>
        <span class="mon2-deck__counts">${fe(z)}</span>
        ${ke(z)}
      </div>
    </div>`}function Te(z){let ne=t.doneItems?t.doneItems():[],ge=t.rangeLabel?t.rangeLabel():"",Se=Qd(Array.isArray(ne)?ne:[]),Ye=ue=>z.reduce((Ue,gt)=>Ue+rl(gt,ue),0);return c`<div class="mon2-deck__bar">
      <span
        class="mon2-deck__total-counts"
        title=${`visible \uB808\uD3EC ${z.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${ge}`}
        >실행 ${Ye("running")} · 대기 ${Ye("queue")} · PR
        ${Ye("pr_wait")}${Ye("session_active")>0?` \xB7 \uC138\uC158 ${Ye("session_active")}`:""}
        · ${ge} 완료
        ${Array.isArray(ne)?ne.length:0}</span
      >
      ${Se===null?"":c`<span class="mon2-deck__total-tokens">
            ${typeof Se=="string"?c`<span
                  class="mon2-deck__tok"
                  title=${Zd(ge)}
                  >${Se}</span
                >`:Se.map(ue=>c`<span
                      class="mon2-deck__tok"
                      data-provider=${ue.provider}
                      title=${ue.tooltip}
                      >${ue.label}</span
                    >`)}
          </span>`}
    </div>`}function Ie(){let z=b();return z.length===0?"":c`${Te(z)}
      <div class="mon2-deck__strip">
        ${z.map(ne=>ae(ne))}
      </div>`}function $e(){u!==null&&!k(u)&&(u=null,t.onFocusChange?.(null))}function ee(){B(),$e(),d!==null&&!k(d)&&G(!0),at(Ie(),r),_?.render()}function Z(z){let ne=z.target;if(!ne||typeof ne.closest!="function")return;let ge=ne.closest("[data-root-dir]");if(!ge)return;let Se=ge.getAttribute("data-root-dir")||"",Ye=ne.closest("[data-act]")?.getAttribute("data-act");if(Ye==="worker"){t.gotoWorkerTab?.(Se);return}if(Ye==="auto"){Y("worker-automation-toggle",Se,{on:D(Se)?.auto_advance!==!0});return}if(Ye==="merge"){Y("worker-merge-auto-toggle",Se,{on:D(Se)?.auto_merge!==!0});return}if(Ye==="gear"){N(Se);return}K(Se)}function Ce(z){if(z.key!=="Enter"&&z.key!==" ")return;let ne=z.target;if(!ne||typeof ne.closest!="function")return;let ge=ne.closest('[data-root-dir][role="button"]');!ge||ge!==ne||(z.preventDefault(),K(ge.getAttribute("data-root-dir")||""))}return r.addEventListener("click",Z),r.addEventListener("keydown",Ce),{render:ee,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",I),r.removeEventListener("click",Z),r.removeEventListener("keydown",Ce),i.removeEventListener("click",L),M(),at(c``,r),e.replaceChildren()}}}function Jd(e,t){let n=new Map(e.map((l,u)=>[l,u])),r=new Map(e.map(l=>[l,new Set]));for(let l of t)l.blocker!==l.blockee&&n.has(l.blocker)&&n.has(l.blockee)&&r.get(l.blockee).add(l.blocker);let s=new Set,o=[];for(;o.length<e.length;){let l=e.find(u=>{if(s.has(u))return!1;for(let d of r.get(u))if(!s.has(d))return!1;return!0});if(l===void 0)return{order:[...e],corrections:[],cycle:!0};s.add(l),o.push(l)}let a=[],i=new Map(o.map((l,u)=>[l,u]));for(let l of o){let u=null;for(let d of r.get(l)){let _=Number(n.get(l))<Number(n.get(d)),h=Number(i.get(l))>Number(i.get(d));_&&h&&(u===null||Number(i.get(d))>Number(i.get(u)))&&(u=d)}u!==null&&a.push({bead_id:l,after:u})}return{order:o,corrections:a,cycle:!1}}var xh="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",xa="\uC758\uC874 \uC790\uB8CC \uBBF8\uD655\uC815 \u2014 \uAD50\uC815 \uBCF4\uB958",Ah="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694",Sh="\uC774\uBBF8 \uC9C4\uD589 \uC911\uC778 \uC774\uC288 \uC55E\uC5D0\uB294 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",Jr="\uC5F0\uACB0 \uB808\uC778\uC774 \uC5C6\uC2B5\uB2C8\uB2E4";function qs(e,t){return`${e}\0${t}`}function Eh(e,t){let n=new Set(e),r=new Map;for(let s of e){let o=t.placed_members.has(s)?t.snapshot_blocked_by:t.runnable_blocked_by,a=o instanceof Map?o.get(s):void 0;if(!Array.isArray(a))return null;r.set(s,a.filter(i=>i!==s&&n.has(i)))}return r}function Th(e,t){if(e.status!=="confirmed")return 0;let n=-1;return e.entries.forEach((r,s)=>{t.fixed_members.has(r.bead_id)&&(n=s)}),n+1}function Bs(e,t){let n=e.entries,r=n.map(_=>_.bead_id),s=Eh(r,t);if(s===null)return{entries:n,corrections:[],cycle:!1,held:!0,mismatched:[]};let o=[];for(let[_,h]of s)for(let b of h)o.push({blocker:b,blockee:_});let a=Th(e,t),i=new Map(r.map((_,h)=>[_,h])),l=r.slice(0,a).filter(_=>s.get(_).some(h=>Number(i.get(h))>Number(i.get(_)))),u=Jd(r.slice(a),o);if(u.cycle)return{entries:n,corrections:[],cycle:!0,held:!1,mismatched:l};let d=new Map(n.map(_=>[_.bead_id,_]));return{entries:[...n.slice(0,a),...u.order.map(_=>d.get(_))],corrections:u.corrections,cycle:!1,held:!1,mismatched:l}}function ep(e,t){let n=t.cross_lanes.get(e);return n===void 0?null:Bs(n,t)}function Ch(e,t){if(!(t.corrections.length===0&&!t.cycle&&!t.held&&t.mismatched.length===0))return{lane_id:e,corrected:t.corrections.length,cycle:t.cycle,held:t.held,mismatched:t.mismatched}}function Rh(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function Oh(e){let t=new Map;for(let[n,r]of e)t.set(n,r.slice());return t}function sl(e,t,n){let r=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===n)return!0;r.has(a)||(r.add(a),s.push(a))}}return!1}function Lh(e,t){let n=new Set;for(let[a,i]of t)for(let l of i)n.add(qs(a,l));let r=new Map,s=new Map;for(let a of e){let i=qs(a.a,a.b);r.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=qs(a.a,a.b);r.get(i)===a&&s.get(i)!==n.has(i)&&o.push(a)}return o}function Ih(e,t,n){let r=e.parallel_rows,s=Math.max(0,Math.min(r.length,n)),o=r[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(r[a].root_dir===t)return r[a].queue_index+1;for(let a=s;a<r.length;a++)if(r[a].root_dir===t)return r[a].queue_index;return e.parallel_raw_length.get(t)??0}function Ph(e,t){return e.parallel_rows.some(n=>n.root_dir===t)}function $a(e,t,n,r){return{type:"worker-queue-place",payload:{bead_id:e,...r?{lane:r}:{},index:n},root_dir:t}}function ol(e,t){let n=0;for(let r of e.cross_lanes.keys())if(n+=1,r===t)return n;return n+1}function Us(e){let t=Oh(e.blocked_by_map),n=[],r=new Set,s={refusal:null},o=u=>{let d=e.owner_of.get(u);return typeof d!="string"||d.length===0?(s.refusal=Rh(u),null):d};return{graph:t,dep_ops:n,state:s,ownerOf:o,addDep:(u,d,_)=>{if(s.refusal!==null||u===d)return;let h=t.get(u)||[];if(h.includes(d))return;let b=o(u);if(b!==null){if(sl(t,d,u)){s.refusal=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${u}\uAC00 \uC774\uBBF8 ${d}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}t.set(u,[...h,d]),_!==void 0&&r.add(qs(u,d)),n.push({type:"dep-add",a:u,b:d,root_dir:b,..._===void 0?{}:{lane_id:_}})}},removeDep:(u,d)=>{if(s.refusal!==null||u===d)return;let _=t.get(u)||[];if(!_.includes(d))return;let h=o(u);h!==null&&(t.set(u,_.filter(b=>b!==d)),n.push({type:"dep-remove",a:u,b:d,root_dir:h}))},laneCreated:(u,d)=>r.has(qs(u,d))}}function Ws(e,t,n,r,s={}){if(e.state.refusal!==null)return{refused:e.state.refusal};let o=Lh(e.dep_ops,t.blocked_by_map),a=o.filter(d=>d.type==="dep-remove"),i=o.filter(d=>d.type==="dep-add"),l=s.disarm_ops??[],u=s.lane_id===void 0||s.correction===void 0?void 0:Ch(s.lane_id,s.correction);return{lane_ops:n,ops:[...a,...l,...i,...r],lane_op_index:a.length+l.length,...u===void 0?{}:{correction:u}}}function tp(e,t,n){for(let r=1;r<t.length;r+=1)e.addDep(t[r].bead_id,t[r-1].bead_id,n)}function Fs(e,t){return t>0&&e.entries[t]?.dep_created_by_lane===!0}function np(e,t,n,r){if(t.status!=="confirmed")return[];let s=[],o=new Map;for(let a of r){let i=e.owner_of.get(a.bead_id)||a.root_dir;typeof i!="string"||i.length===0||o.set(i,[...o.get(i)||[],a.bead_id])}for(let[a,i]of o)s.push({type:"worker-queue-disarm",payload:{bead_ids:i,lane_id:n},root_dir:a});return s}function rp(e,t,n,r){let s=new Map;for(let o of n){if(t.placed_members.has(o.bead_id))continue;let a=e.ownerOf(o.bead_id);if(a===null)return;let i=s.get(a)??0;r.push($a(o.bead_id,a,(t.parallel_raw_length.get(a)??0)+i)),s.set(a,i+1)}}function js(e){return e.map(t=>({bead_id:t.bead_id,root_dir:t.root_dir}))}function Aa(e,t){return e.length===t.length&&e.every((n,r)=>n.bead_id===t[r].bead_id&&n.root_dir===t[r].root_dir)}function al(e,t,n){let r=Us(n),s=[],o=[],a=[],i,l=n.owner_lane_of.get(e.bead_id),u=e.kind==="chain"?e.lane_id??l:void 0,d=u===void 0?void 0:n.cross_lanes.get(u);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:xh};if(t.kind==="chain"){if(e.kind==="repo-serial")return{refused:Ah};if(e.kind!=="chain"&&typeof l=="string"&&l!==t.lane_id&&n.cross_lanes.has(l))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ol(n,l)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`};if(!n.cross_lanes.has(t.lane_id))return{refused:Jr}}if(e.kind==="chain"&&d===void 0)return{refused:Jr};let _=()=>{if(d===void 0||d.status!=="confirmed")return;let k=d.entries.findIndex(K=>K.bead_id===e.bead_id);if(k<0)return;let D=k>0?d.entries[k-1]:null,B=k+1<d.entries.length?d.entries[k+1]:null,Y=Fs(d,k),le=B!==null&&Fs(d,k+1);Y&&D!==null&&r.removeDep(e.bead_id,D.bead_id),le&&B!==null&&r.removeDep(B.bead_id,e.bead_id),(Y||le)&&D!==null&&B!==null&&r.addDep(B.bead_id,D.bead_id,u)},h=(k,D)=>{let B=n.cross_lanes.get(k),Y=B.entries.findIndex(xe=>xe.bead_id===e.bead_id),le=B.entries.filter(xe=>xe.bead_id!==e.bead_id),K=Math.max(0,Math.min(le.length,Y>=0&&D>Y?D-1:D)),N=-1;if(le.forEach((xe,ke)=>{n.fixed_members.has(xe.bead_id)&&(N=ke)}),K<=N){r.state.refusal=Sh;return}let M=Y>=0?B.entries[Y]:d?.entries.find(xe=>xe.bead_id===e.bead_id)??{bead_id:e.bead_id,root_dir:e.root_dir};i=Bs({status:B.status,entries:[...le.slice(0,K),M,...le.slice(K)]},n);let G=i.entries;if(Aa(G,B.entries)||s.push({type:"monitor-lane-update",payload:{lane_id:k,entries:js(G)}}),B.status!=="confirmed")return;let L=G.findIndex(xe=>xe.bead_id===e.bead_id),I=L>0?G[L-1].bead_id:null,te=L+1<G.length?G[L+1].bead_id:null;if(I===null){te!==null&&r.addDep(te,e.bead_id,k);return}if(r.addDep(e.bead_id,I,k),te!==null&&(r.graph.get(te)||[]).includes(I)){let xe=B.entries.findIndex(ke=>ke.bead_id===te);(r.laneCreated(te,I)||xe>0&&B.entries[xe-1].bead_id===I&&Fs(B,xe))&&r.removeDep(te,I),r.addDep(te,e.bead_id,k)}},b=typeof e.queue_index=="number"?e.queue_index:n.queue_index_of.get(e.bead_id);if(e.kind==="chain"&&(_(),d!==void 0&&(t.kind!=="chain"||t.lane_id!==u)&&(a.push(...np(n,d,u,d.entries.filter(k=>k.bead_id===e.bead_id))),s.push({type:"monitor-lane-update",payload:{lane_id:u,entries:js(d.entries.filter(k=>k.bead_id!==e.bead_id))}}))),t.kind==="chain"&&h(t.lane_id,t.marker_index),r.state.refusal!==null)return{refused:r.state.refusal};if(t.kind==="candidate")e.kind!=="candidate"&&o.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let k=Ih(n,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")o.push($a(e.bead_id,e.root_dir,k));else if(e.kind==="parallel"){let D=n.parallel_rows,B=D[Math.max(0,Math.min(D.length,t.marker_index))];if(!(!!B&&B.bead_id===e.bead_id)&&Ph(n,e.root_dir)&&b!==void 0){let le=b>k?k:k-1;le>=0&&le!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:le},root_dir:e.root_dir})}}}else if(t.kind==="chain"){let k=n.cross_lanes.get(t.lane_id);e.kind==="candidate"&&k.status==="confirmed"&&o.push($a(e.bead_id,e.root_dir,n.parallel_raw_length.get(e.root_dir)??0))}else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(b!==void 0&&t.index!==b){let k=b>t.index?t.index:t.index-1;k>=0&&k!==b&&o.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:k},root_dir:e.root_dir})}}else o.push($a(e.bead_id,e.root_dir,t.index,t.lane_id));return Ws(r,n,s,o,{disarm_ops:a,...t.kind==="chain"?{lane_id:t.lane_id,correction:i}:{}})}function sp(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};if(n.entries.length<2)return{refused:"\uD655\uC815\uD558\uB824\uBA74 \uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4"};let r=Bs(n,t);if(r.held)return{refused:xa};let s=r.entries,o=Us(t),a=[];tp(o,s,e),o.state.refusal===null&&rp(o,t,s,a);let i=Aa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return i.push({type:"monitor-lane-confirm",payload:{lane_id:e}}),Ws(o,t,i,a,{lane_id:e,correction:r})}function op(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Bs(n,t),s=r.entries,o=Us(t),a=[];tp(o,s,e),o.state.refusal===null&&rp(o,t,s,a);let i=Aa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}];return Ws(o,t,i,a,{lane_id:e,correction:r})}function ap(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Bs(n,t),s=r.entries;return Ws(Us(t),t,Aa(s,n.entries)?[]:[{type:"monitor-lane-update",payload:{lane_id:e,entries:js(s)}}],[],{lane_id:e,correction:r})}function ip(e,t){let n=t.cross_lanes.get(e);if(n===void 0)return{refused:Jr};let r=Us(t);if(n.status==="confirmed")for(let s=1;s<n.entries.length;s+=1)Fs(n,s)&&r.removeDep(n.entries[s].bead_id,n.entries[s-1].bead_id);return Ws(r,t,[{type:"monitor-lane-remove",payload:{lane_id:e}}],[],{disarm_ops:np(t,n,e,n.entries)})}function lp(e,t){let n=t.cross_lanes.get(e);if(n===void 0||n.status!=="confirmed")return null;let r=[],s=[];for(let a=1;a<n.entries.length;a+=1){let i=`  ${n.entries[a].bead_id} \u2190 ${n.entries[a-1].bead_id}`;Fs(n,a)?r.push(i):s.push(`${i} (\uB808\uC778\uC774 \uB9CC\uB4E4\uC9C0 \uC54A\uC74C)`)}let o=`\uC5F0\uACB0 ${ol(t,e)}\uC744 \uC9C0\uC6C1\uB2C8\uB2E4.`;return r.length===0?`${o}
\uC758\uC874\uC740 \uADF8\uB300\uB85C \uB461\uB2C8\uB2E4`:[o,"\uD568\uAED8 \uC81C\uAC70\uD560 \uC758\uC874:",...r,...s.length===0?[]:["\uADF8\uB300\uB85C \uB450\uB294 \uC758\uC874:",...s]].join(`
`)}function cp(e){let t=new Map;for(let n of e)n.type!=="dep-add"||typeof n.lane_id!="string"||t.set(n.lane_id,[...t.get(n.lane_id)||[],{bead_id:n.a,after:n.b}]);return[...t].map(([n,r])=>({lane_id:n,pairs:r}))}function up(e,t){let n=new Map(e.map((r,s)=>[r.bead_id,s]));return t.filter(r=>{let s=n.get(r.bead_id);return s!==void 0&&s>0&&e[s-1].bead_id===r.after})}function il(e,t){if(e!==null){let n=t.owner_lane_of.get(e.bead_id);if(typeof n=="string"&&t.cross_lanes.has(n))return{refused:`\uC774\uBBF8 \uC5F0\uACB0 ${ol(t,n)}\uC5D0 \uC788\uC2B5\uB2C8\uB2E4`}}return{lane_ops:[{type:"monitor-lane-create",payload:{entries:e===null?[]:[e]}}],ops:[],lane_op_index:0}}var Mh="\uC0AC\uC774\uD074";function dp(e,t){let n=new Map;for(let a of t.issues)!a||typeof a.bead_id!="string"||a.bead_id.length===0||n.has(a.bead_id)||n.set(a.bead_id,a);let r=n.get(e)?.root_dir,s=t.blocked_by_map.get(e)||[],o=[];for(let a of n.values()){if(a.bead_id===e||a.lane==="done"||s.includes(a.bead_id))continue;let i=sl(t.blocked_by_map,a.bead_id,e);o.push({...a,disabled:i,...i?{reason:Mh}:{}})}return o.sort((a,i)=>{let l=r!==void 0&&a.root_dir===r,u=r!==void 0&&i.root_dir===r;return l!==u?l?-1:1:a.bead_id.localeCompare(i.bead_id)}),o}function pp(e,t){let n=t.trim().toLowerCase();return n.length===0?e.slice():e.filter(r=>r.bead_id.toLowerCase().includes(n)||r.title.toLowerCase().includes(n))}var fp={running:3,paused:2,failed:1};function Er(e){if(!e||typeof e!="object")return!1;let t=e.kind;return t==null||t==="implementation"}function _p(e){let t=Object.values(e||{}),n=new Map;for(let r of t){if(!r||typeof r.bead_id!="string"||r.bead_id.length===0||r.kind!=="head_review"&&r.kind!=="head_repair"||r.status!=="running")continue;let s=typeof r.started_at=="number"?r.started_at:null,o=n.get(r.bead_id);o&&(o.started_at??0)>(s??0)||n.set(r.bead_id,{attempt:r,kind:r.kind,origin:r.origin==="click"||r.origin==="auto"?r.origin:null,started_at:s})}return n}function mp(e,t){let n=Object.values(e||{}),r=new Set,s=new Map;for(let a of n)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&r.add(a.resumed_from),Er(a)&&s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of n){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0||!Er(a))continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!r.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),_=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!_&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let l=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=fp[u.run_state],_=fp[i];if(d>_||d===_&&(u.started_at??0)>(l??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:l})}return{winners:o,resumed_from_ids:r}}var gp=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],zs=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Sa(e,t){let n=gp.find(s=>s.step===e);if(!n)return null;let r=gp.length;return{step:n.step,label:t,index:n.index,total:r,percent:Math.round(n.index/r*100)}}function bp(e){let t=zs.findIndex(n=>n.step===e);return zs.map((n,r)=>({step:n.step,label:n.label,state:t<0?"todo":r<t?"done":r===t?"stall":"todo"}))}function Tr(e){let t=zs.find(n=>n.step===e);return t?t.label:typeof e=="string"?e:""}function Dh(e){let t=zs.findIndex(n=>n.step===e);return t<0?null:{index:t+1,total:zs.length}}function Ea(e){let t=Dh(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var cl=new Set(["queued","running","retry_pending","repairing"]),hp=new Set(["failed","succeeded"]),Nh={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},Hs={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},qh={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:Hs.base_containment,child_sweep:Hs.child_sweep,branch_cleanup:Hs.branch_cleanup,parent_close:Hs.parent_close};function Fh(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function jh(e,t,n){return!["verify","deploy"].includes(e.kind)||![...cl,...hp].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(r=>r&&typeof r=="object"&&r.bead_id===t&&r.merged_sha===n)}function Bh(e,t){let n=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(n!==0)return n;let r=u=>u.state==="succeeded"?1:2,s=r(t)-r(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",l=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(l)}function ll(e,t=!1){let n=e.kind,r=n==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Nh[s];if(!o)return null;let a=Sa(n,`${r} ${o}`);return a?{...a,active:cl.has(s),failed:s==="failed"}:null}function Uh(e){return!e||typeof e!="object"?null:qh[e.step]||null}function Gs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,n=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},r=Uh(n),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||n.step==="repo_operations"),i=Fh(e.merge_sha)?e.merge_sha:null,l=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter(k=>k&&typeof k=="object"&&jh(k,t,i)).sort(Bh):[],u=a?l:[],d=u.find(k=>cl.has(k.state));if(d)return ll(d);if(s)return s.step==="repo_operations"&&l[0]?ll(l[0],!0):null;let _=u.find(k=>hp.has(k.state)?k.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(_)return ll(_);if(r){let k=Sa(r.step,r.label);return k?{...k,active:!0,failed:!1}:null}let h=typeof e.cleanup_cursor=="string"?Hs[e.cleanup_cursor]:null;if(!h)return null;let b=Sa(h.step,h.label);return b?{...b,active:!0,failed:!1}:null}function Ta(e){return!!e&&e.step!=="merge"&&e.failed!==!0}var Wh="\uBBF8\uC801\uC7AC";function ul(e,t){let n=Ao(e,t.id);return{id:t.id,label:`\u26D3 blocked: ${t.id}`,title:`\uC774 \uC774\uC288\uB294 ${t.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4 (${t.location_label})`,...n?{foreign:!0}:{}}}function yp(e,t,n={}){let r=new Map,s=new Map;for(let o of t)s.has(o.id)||s.set(o.id,o.location_label);for(let[o,a]of e){if(typeof o!="string"||o.length===0)continue;let i=[];for(let l of Array.isArray(a)?a:[]){if(typeof l!="string"||l.length===0)continue;let u=ul(o,{id:l,location_label:s.get(l)||Wh}),d=n[l];u.foreign!==!0?u.openable=!0:typeof d=="string"&&d.length>0&&(u.openable=!0,u.root_dir=d),i.push(u)}i.length>0&&r.set(o,i)}return r}function dl(e,t){return`${e}\0${t}`}function vp(e){let t=new Map;for(let n of Array.isArray(e?.running)?e.running:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"running",state:"running"});for(let n of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let n of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let r=Array.isArray(n.sublanes?.parallel)?n.sublanes.parallel:Array.isArray(n.items)?n.items:[];for(let s of r)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(n.sublanes?.serial)?n.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let n of Array.isArray(e?.runnable)?e.runnable:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"runnable",state:"runnable"});for(let n of Array.isArray(e?.done)?e.done:[])t.set(n.id,{root_dir:n.root_dir,workspace_name:n.workspace_name,lane:"done",state:"done"});return t}function pl(e,t){let n=Array.isArray(t)?t:[],r=e.indexOf("-"),s=r>0?e.slice(0,r):e;return n.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":n.length>0&&n.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Ks(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function wp(e,t,n,r){let s=n.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0};if(s)return{id:e,label:`\u{1F512} ${e} (${Ks(s)})`,location_label:Ks(s),scope:null,same_lane_ahead:!1};let a=pl(e,r),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1}}function kp(e){let t=Array.isArray(e)?e:[],n=new Map,r=new Map,s=new Map;for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=dl(i.root_dir,l.id);n.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:l.id}),s.set(u,[]);for(let d of Array.isArray(l.items)?l.items:[])r.set(d.id,u)}for(let i of t)for(let l of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=dl(i.root_dir,l.id),d=Array.isArray(l.items)?l.items[0]:null,h=!!d&&d.queue_index===0&&(!Array.isArray(l.occupied_by)||l.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],b=s.get(u);if(b)for(let k of h){let D=r.get(k);D&&D!==u&&!b.includes(D)&&b.push(D)}}let o=(i,l)=>{let u=new Set,d=[i];for(;d.length>0;){let _=d.pop();if(_===l)return!0;!_||u.has(_)||(u.add(_),d.push(...s.get(_)||[]))}return!1},a=new Map;for(let[i,l]of s){let u=[];for(let d of l){let _=n.get(d);o(d,i)&&_&&u.push(_)}u.length>0&&a.set(i,u)}return a}function $p(e,t){return dl(e,t)}var xp=1,Vs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],_l=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],es={show_blocked:!0,spec:"all"},Ap={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function zh(e,t){let n=null;for(let r of Object.values(e||{}))!r||r.bead_id!==t||!Er(r)||(n=typeof r.status=="string"?r.status:null);return n}function Hh(e,t){let n=null,r=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running"||!Er(s))continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=r&&(r=o,n=s)}return n}function Gh(e,t){let{winners:n,resumed_from_ids:r}=mp(e,t),s=new Map;for(let[o,a]of n){let i=a.attempt,l=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:l,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:Rn(e,i.bead_id),can_pause:l==="running"&&d,can_resume:l!=="running"&&d&&!r.has(i.attempt_id)})}return s}function Sp(e,t){let n=e[t];if(!n)return"";if(n.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let r=typeof n.reason=="string"?n.reason:"",s=r.indexOf(":");return s>0&&s<r.length-1?`\u26D4 ${r.slice(0,s)} (${r.slice(s+1)})`:`\u26D4 ${r}`}function zt(e){return e&&typeof e=="object"?e:{}}function Kh(e,t,n){let r=zt(t);if(Object.keys(r).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=h=>yn({pin:h,global:a,execution_defaults:s,runner_catalog:o,route:n}),l,u;try{l=i(r),u=i(null)}catch{return null}let d=Ep(Sr(l,o),Sr(u,o)),_=Ep(dr(l,null),dr(u,null));return d||_?{orchestration:d,worker:_}:null}function Ep(e,t){return!e||t&&t.text===e.text?null:e}function Tp(e,t){let n=pl(e,t);return n==="internal"?"\uBBF8\uC801\uC7AC":n==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Vh(e,t,n){let r=t.get(e);if(!r)return Tp(e,n);if(typeof r.position=="number"){if(r.lane==="parallel")return`#${r.position}`;if(/^s[1-5]$/.test(r.lane))return`${r.lane} #${r.position}`}return Ks(r)}function Yh(e,t,n,r){let s=t.get(e);if(!s)return{label:Tp(e,n),title:""};if(typeof s.position=="number"&&(s.lane==="parallel"||/^s[1-5]$/.test(s.lane))){let a=r.get(e),i=s.lane==="parallel"?"\uBCD1\uB82C":s.lane;return{label:a&&a.length>0?"\u{1F512} \uB300\uAE30":"\uB300\uAE30",title:`${s.workspace_name||s.root_dir} ${i} #${s.position}`}}return{label:s.state==="running"?"\u25B6 \uC2E4\uD589\uC911":Ks(s),title:""}}function Zh(e,t){for(let n of Object.values(e||{}))if(n&&n.attempt_id===t&&typeof n.armed_by_lane=="string"&&n.armed_by_lane.length>0)return n.armed_by_lane;return null}function Qh(e,t,n,r,s,o){return t==="draft"?{state:"draft",badge:"draft",run_label:null,can_stop:!1}:n.some(a=>o.failed_by_bead.get(a.id)===e)?{state:"failed",badge:"\u26D4 \uC2E4\uD328",run_label:"\u25B6 \uB2E4\uC2DC \uC9C4\uD589",can_stop:!1}:o.disarmed_lanes.has(e)?{state:"restart",badge:"\u23F8 \uC7AC\uC2DC\uC791",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}:n.some(a=>o.armed_by_bead.get(a.id)===e)?{state:"running",badge:"\u25B6 \uC9C4\uD589 \uC911",run_label:s.length>0?"\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589":null,can_stop:!0}:r?{state:"all_done",badge:"\uBAA8\uB450 \uC644\uB8CC",run_label:null,can_stop:!1}:{state:"confirmed",badge:"\uD655\uC815",run_label:"\u25B6 \uC9C4\uD589",can_stop:!1}}function Xh(e,t,n,r,s,o,a){let i=[];return e.forEach((l,u)=>{let d=typeof l.id=="string"?l.id:"";if(d.length===0)return;let _=l.status==="confirmed"?"confirmed":"draft",h=Array.isArray(l.entries)?l.entries:[],b=[];h.forEach((Y,le)=>{let K=Y&&typeof Y.bead_id=="string"?Y.bead_id:"";if(K.length===0)return;let N=Y&&typeof Y.root_dir=="string"?Y.root_dir:"",M=n.get(K),G=M?M.state:void 0,L=G==="running"||G==="pr_wait"||G==="done",I=!M||G==="runnable",te=M&&M.lane==="parallel"&&typeof M.position=="number"?M.position-1:null,xe=Yh(K,n,r,t),ke=b.length>0?b[b.length-1].id:null,fe=_==="confirmed"&&ke!==null&&!(t.get(K)||[]).includes(ke);b.push({id:K,title:s.get(K)||K,root_dir:M?M.root_dir:N,workspace_name:M?M.workspace_name:o.get(N)||"",seq:le+1,location_label:xe.label,location_title:xe.title,draggable:!L,fixed:L,done:G==="done",unplaced:I,mismatch:fe,...te!==null?{queue_index:te}:{}})}),b.forEach((Y,le)=>{Y.seq=le+1});let k=b.length>0&&b.every(Y=>Y.done),D=b.filter(Y=>!Y.fixed&&a.armed_by_bead.get(Y.id)!==d).map(Y=>Y.id),B=Qh(d,_,b,k,D,a);i.push({lane_id:d,status:_,draft:_==="draft",number:u+1,label:`\uC5F0\uACB0 ${u+1} \xB7 \uB808\uD3EC \uAC04`,rows:b,all_done:k,can_confirm:_==="draft"&&b.length>=2,has_mismatch:_==="confirmed"&&b.some(Y=>Y.mismatch||Y.unplaced),unlaunched:D,...B})}),i}function Jh(e,t,n){if(e.lane==="runnable"){let a=n.get(e.id);return a?a.length===0?{scope:[],state:"missing"}:{scope:a,state:"declared"}:{scope:[],state:void 0}}let r=t.get(e.root_dir),s=r?r[e.id]:void 0;if(!s||!Array.isArray(s.scope))return{scope:[],state:void 0};let o=s.scope.filter(a=>typeof a=="string"&&a.length>0);return{scope:o,state:o.length===0?"missing":"declared"}}function ey(e,t,n,r,s){let o=new Map;for(let l of[...e.running,...e.queue,...e.runnable,...e.pr_wait]){if(!t.has(l.root_dir))continue;let u=`${l.root_dir}\0${l.id}`,d=o.get(u);if(d){d.cards.push(l);continue}let{scope:_,state:h}=Jh(l,t,n);h!==void 0&&(l.scope_state=h),o.set(u,{cards:[l],scope:_})}let a=new Map;for(let l of o.values()){let u=l.cards[0].scope_state;if(u!==void 0)for(let h of l.cards)h.scope_state=u;if(l.scope.length===0)continue;let d=l.cards[0].root_dir,_=a.get(d);_?_.push(l):a.set(d,[l])}let i=(l,u,d)=>{let _=u.cards[0],h={id:_.id,title:_.title,location_label:Vh(_.id,r,s),prefixes:d};for(let b of l.cards)b.overlap_chips?b.overlap_chips.push(h):b.overlap_chips=[h]};for(let l of a.values())for(let u=0;u<l.length;u+=1)for(let d=u+1;d<l.length;d+=1){let _=ha(l[u].scope,l[d].scope);_.length!==0&&(i(l[u],l[d],_),i(l[d],l[u],_))}}function fl(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Ca(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function ml(e,t,n){let r=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=n&&typeof n.done_since=="number"?n.done_since:void 0,a={...es,...n&&n.candidate_filter?n.candidate_filter:{}},i=n&&Object.hasOwn(n,"cross_lanes")?n.cross_lanes??null:void 0,l=n&&Vs.some(T=>T.value===n.candidate_sort)?n.candidate_sort:"repo_spec",u=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&u.set(T.root_dir,T);let d=new Map;for(let T of s)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);for(let T of r)T&&typeof T.root_dir=="string"&&d.set(T.root_dir,T.name||T.root_dir);let _=[],h=[],b=[],k=[],D=[],B=[],Y=new Map,le=new Map,K=new Map,N=new Map,M=new Map,G=new Map,L=new Map,I=new Set,te=new Map,xe=new Map,ke=new Map;for(let T of r){if(!T||typeof T.root_dir!="string")continue;let ce=T.root_dir,Oe=T.name||ce,Me=u.get(ce),Qe=Me&&typeof Me.revision=="number"?Me.revision:typeof T.revision=="number"?T.revision:0,st=zt(T.attempts),bt=zt(T.bead_titles);for(let[v,U]of Object.entries(bt))typeof U=="string"&&U.length>0&&ke.set(v,U);let yt=zt(T.bead_times),re=zt(T.pr_observations),Q=zt(T.admission),je=zt(T.revise_parked),it=zt(T.merge_queue_state),We=zt(T.cleanup_failed),we=zt(T.discard_operations),Ge=zt(T.bead_blocked_by);Object.hasOwn(T,"bead_scope")&&te.set(ce,zt(T.bead_scope));let dt=zt(T.bead_workflow),_t=zt(T.pr_activity),mt=Array.isArray(T.repo_operations)?T.repo_operations:[],Pt=Array.isArray(T.merge_queue)?T.merge_queue:[],Kt=new Set(Pt.filter(v=>v&&typeof v.bead_id=="string").map(v=>v.bead_id)),Ht=new Map(Pt.filter(v=>v&&typeof v.bead_id=="string").map(v=>[v.bead_id,v])),Ct=Array.isArray(T.queue)?T.queue:[];for(let v of[...Ct,...Array.isArray(T.pr_wait)?T.pr_wait:[]])v&&typeof v.bead_id=="string"&&typeof v.armed_by_lane=="string"&&v.armed_by_lane.length>0&&G.set(v.bead_id,v.armed_by_lane);for(let v of Array.isArray(T.disarmed_on_load)?T.disarmed_on_load:[])typeof v=="string"&&v.length>0&&I.add(v);let Lt=(Array.isArray(T.serial_lanes)?T.serial_lanes:[]).filter(v=>v&&/^s[1-5]$/.test(v.id)&&Array.isArray(v.entries)),Xe=zt(T.lane_states),De=typeof T.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(T.serial_lane_count))):Math.min(5,Lt.length);K.set(ce,De),N.set(ce,Ct.length);let P=new Map(Lt.map(v=>[v.id,v])),J=new Map;for(let v of Lt)for(let U of v.entries)U&&typeof U.bead_id=="string"&&J.set(U.bead_id,v.id);for(let[v,U]of Object.entries(Ge))Array.isArray(U)&&M.set(v,U.filter(ie=>typeof ie=="string"&&ie.length>0));let ve=Array.isArray(T.done)?T.done:[];for(let v of ve)v&&typeof v.bead_id=="string"&&B.push({id:v.bead_id,root_dir:ce,workspace_name:Oe});let E=new Map;for(let v of ve)v&&typeof v.bead_id=="string"&&typeof v.added_at=="number"&&E.set(v.bead_id,v.added_at);let H=v=>({id:v,title:bt[v]||v,root_dir:ce,workspace_name:Oe,expected_revision:Qe,draggable:!1,...zt(yt[v]).created_at?{created_at:zt(yt[v]).created_at}:{},...zt(yt[v]).updated_at?{updated_at:zt(yt[v]).updated_at}:{}}),Re=v=>Object.hasOwn(Ge,v)?{blocked_by:Array.isArray(Ge[v])?Ge[v].filter(U=>typeof U=="string"&&U.length>0):[]}:{},x=new Set;for(let[v,U]of Gh(st,E)){x.add(v);let ie=U.run_state==="failed"?Zh(st,U.attempt_id):null;ie!==null&&L.set(v,ie),h.push({...H(v),lane:"running",...Re(v),...J.has(v)?{serial_lane_id:J.get(v)}:{},attempt_id:U.attempt_id,run_state:U.run_state,status:U.status||void 0,workflow:dt[v]||null,can_pause:U.can_pause,can_resume:U.can_resume,started_at:U.started_at,last_event_at:U.last_event_at,last_activity:U.last_activity,legs:U.legs,runner:U.runner,model:U.model,effort:U.effort,speed:U.speed,resumed_from:U.resumed_from,continuation_mode:U.continuation_mode,usage:U.usage,exec_chips:{orchestration:Ns(U),worker:null},discard:jn(we,v,{attempt_id:U.attempt_id}),badges:U.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:U.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:U.run_state==="failed"})}for(let[v,U]of _p(st)){if(h.some(Be=>Be.id===v))continue;let ie=U.attempt,Ke=U.kind==="head_review"?"\uB9AC\uBDF0":"\uC218\uB9AC";h.push({...H(v),lane:"running",kind:"session",...Re(v),attempt_id:typeof ie.attempt_id=="string"?ie.attempt_id:"",run_state:"running",status:"running",non_occupying:!0,workflow:dt[v]||null,can_pause:!1,can_resume:!1,started_at:U.started_at,last_event_at:typeof ie.last_event_at=="number"?ie.last_event_at:null,last_activity:ie.last_activity&&typeof ie.last_activity=="object"?ie.last_activity:null,legs:Array.isArray(ie.legs)?ie.legs:[],runner:typeof ie.runner=="string"?ie.runner:null,model:typeof ie.model=="string"?ie.model:null,effort:typeof ie.effort=="string"?ie.effort:null,speed:typeof ie.speed=="string"?ie.speed:null,resumed_from:null,continuation_mode:null,usage:ie.usage&&typeof ie.usage=="object"?ie.usage:null,exec_chips:{orchestration:Ns(ie),worker:null},discard:jn(we,v,{merge_queued:!0}),badges:[U.origin==="auto"?`${Ke} \xB7 \uC790\uB3D9`:Ke],alert:!1})}for(let v of Array.isArray(T.session_active)?T.session_active:[]){let U=v&&v.bead_id;typeof U!="string"||x.has(U)||(x.add(U),Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&M.set(U,v.blocked_by.filter(ie=>typeof ie=="string"&&ie.length>0)),typeof v.title=="string"&&v.title.length>0&&ke.set(U,v.title),h.push({...H(U),title:v.title||bt[U]||U,lane:"running",kind:"session",status:"in_progress",started_at:fl(v.started_at)??fl(v.updated_at)??void 0,updated_at:fl(v.updated_at)??void 0,workflow:v.workflow||null,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(ie=>typeof ie=="string"&&ie.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,session_refs:Array.isArray(v.session_refs)?v.session_refs:[],badges:[],alert:!1}))}for(let v of Array.isArray(T.pr_wait)?T.pr_wait:[]){let U=v&&v.bead_id;if(typeof U!="string"||x.has(U))continue;x.add(U);let ie=zt(re[U]),Ke=zt(ie.pr),Be=ie.gate?zt(ie.gate):null,be=Kt.has(U),Rt=Ht.get(U)?.continuation_action||null,vt=!!Rt&&Rt.continuation===null,ht=it.active===U,Qt=v.external===!0,qt=We[U]||null,an=zt(_t[U]),en=Gs({bead_id:U,merge_sha:v.merge_sha,cleanup_cursor:v.cleanup_cursor,merge_progress:an.merge_progress||null,cleanup_failed:qt,repo_operations:mt}),rn=Ta(en),Xt=!!Be&&Be.base_badge==="\uCDA9\uB3CC",on=!!qt&&["child_sweep","branch_cleanup","parent_close"].includes(qt.step)&&!!Be&&Be.tier==="merged",Ze=Qt&&!!qt&&!!Be&&Be.tier==="merged",gn=!!Be&&["closed_unmerged","review","undecidable"].includes(Be.tier)&&Be.reason!=="review_receipt_undetermined",tt=jn(we,U,{external:Qt,merge_active:ht||en?.step==="merge",merge_queued:be,cleanup_active:rn,merged:!!qt||Be?.tier==="merged"}),Pe=!!tt.operation;b.push({...H(U),lane:"pr_wait",...Re(U),workflow:dt[U]||null,pr_number:typeof Ke.number=="number"?Ke.number:null,pr_url:typeof Ke.url=="string"?Ke.url:void 0,external:Qt,usage:Rn(st,U),merge_step:en,badges:vt?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:en?[Be?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:qt?[Tr(qt.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${Tr(qt.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof Be?.gate_badge=="string"&&Be.gate_badge.length>0?[Be.gate_badge]:[],alert:en?en.failed===!0:!!qt||gn,reason:qt&&en?.active!==!0?Ea(qt.step):"PR \uB300\uAE30",merge_action:Be?.tier==="merged"&&!on&&!Ze?!1:!be||vt,merge_enabled:!Pe&&(vt||Be?.enabled===!0||Xt||on||Ze),merge_label:vt?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Ze||on?"\uC815\uB9AC \uC7AC\uAC1C":Xt&&!on?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:vt?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Pe?tt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${tt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${tt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Ze?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":on?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Xt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":Be?.enabled===!0?`\uBA38\uC9C0 (${Be.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${Be?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:be&&!vt,cancel_enabled:!ht,continuation_mismatch:Rt?.mismatch||null,discard:tt,discard_action:tt.action,discard_enabled:tt.enabled,discard_title:tt.title})}let R=(v,U,ie,Ke)=>{let Be=v&&v.bead_id;if(typeof Be!="string"||x.has(Be))return null;x.add(Be);let be=je[Be],Rt=jn(we,Be),vt=Rt.operation?Rt:null,ht={...H(Be),lane:U,workflow:dt[Be]||null,draggable:!vt,discard:vt||void 0,reason:Sp(Q,Be),seq:ie+1,queue_position:ie+1,queue_index:ie,queue_length:Ke,badges:be?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!be,revise_action:!!be,revise_enabled:!!be&&!vt,revise_title:be?be.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${be.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""},Qt=Re(Be);return Object.hasOwn(Qt,"blocked_by")&&(ht.blocked_by=Qt.blocked_by),ht};for(let v=0;v<Ct.length;v++){let U=R(Ct[v],"queue",v,Ct.length);if(!U)continue;k.push(U);let ie=Y.get(ce);ie?ie.push(U):Y.set(ce,[U])}let X=v=>{let U=b.find(be=>be.id===v&&be.root_dir===ce);if(U)return{id:v,title:U.title,badge:"PR \uB300\uAE30 \xB7 \uC810\uC720"};let ie=h.find(be=>be.id===v&&be.root_dir===ce),Ke=ie?ie.run_state:zh(st,v),Be=Ke==="failed"||Ke==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":Ke==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720";return{id:v,title:ie?ie.title:H(v).title,badge:Be}},_e=[];for(let v=0;v<Math.max(De,Lt.length);v++){let U=`s${v+1}`,ie=P.get(U),Ke=ie&&Array.isArray(ie.entries)?ie.entries:[],Be=zt(Xe[U]),be=Array.isArray(Be.occupied_by)?Be.occupied_by.filter(ht=>typeof ht=="string"):[],Rt=new Set(be),vt=[];for(let ht=0;ht<Ke.length;ht++){let Qt=Ke[ht]&&Ke[ht].bead_id;if(typeof Qt=="string"&&Rt.has(Qt)){x.add(Qt);continue}let qt=R(Ke[ht],U,ht,Ke.length);qt&&(vt.push(qt),k.push(qt))}vt.length===0&&be.length===0&&(De<=1||v>=De)||_e.push({id:U,index:v,items:vt,raw_length:Ke.length,occupied_by:be,occupants:be.map(ht=>X(ht)),corrections:Array.isArray(Be.corrections)?Be.corrections.length:0,cycle:Be.cycle===!0,...vt.length===0&&be.length===0?{empty:!0}:{}})}le.set(ce,_e);let Ae=Array.from({length:De},(v,U)=>{let ie=`s${U+1}`,Ke=P.get(ie),Be=Ke&&Array.isArray(Ke.entries)?Ke.entries:[],be=zt(Xe[ie]);return{id:ie,index:Be.length,length:Be.length,occupied_by:Array.isArray(be.occupied_by)?be.occupied_by.filter(Rt=>typeof Rt=="string"):[]}});for(let v of Array.isArray(T.runnable)?T.runnable:[]){let U=v&&v.bead_id;if(typeof U!="string"||x.has(U))continue;x.add(U);let ie=v.workflow&&typeof v.workflow=="object"?v.workflow:null,Ke=ie&&typeof ie.route=="string"&&ie.route||(typeof v.route=="string"?v.route:null),Be=Kh(zt(Me),v.exec_pins,Ke);Array.isArray(v.blocked_by)&&v.blocked_by.length>0&&M.set(U,v.blocked_by.filter(be=>typeof be=="string"&&be.length>0)),typeof v.title=="string"&&v.title.length>0&&ke.set(U,v.title),Array.isArray(v.scope)&&xe.set(U,v.scope.filter(be=>typeof be=="string"&&be.length>0)),_.push({...H(U),title:v.title||bt[U]||U,lane:"runnable",draggable:!0,reason:Sp(Q,U),created_at:v.created_at??void 0,updated_at:v.updated_at??void 0,status:typeof v.status=="string"?v.status:void 0,labels:Array.isArray(v.labels)?v.labels:[],spec_id:typeof v.spec_id=="string"?v.spec_id:"",published:v.published===!0,workflow:ie||(Ke?{route:Ke,chips:{route:Ke}}:null),...Be?{exec_chips:Be}:{},blocked:v.blocked===!0,...Array.isArray(v.blocked_by)?{blocked_by:v.blocked_by.filter(be=>typeof be=="string"&&be.length>0)}:{},place_index:Ct.length,place_lanes:Ae})}for(let v of ve){let U=v&&v.bead_id;if(typeof U!="string"||x.has(U)||(x.add(U),o!==void 0&&typeof v.added_at=="number"&&v.added_at<o))continue;let ie=Hh(st,U),Ke=ie&&typeof ie.done_kind=="string"?ie.done_kind:null;D.push({...H(U),lane:"done",done:!0,done_layout:"three_line",usage:Rn(st,U),work_ms:ua(st,U),done_at:typeof v.added_at=="number"?v.added_at:void 0,done_kind:Ke,badges:[...Ke&&Ap[Ke]?[Ap[Ke]]:[],...ca(st,U)]})}}let fe=new Map;s.forEach((T,ce)=>{T&&typeof T.root_dir=="string"&&fe.set(T.root_dir,ce)});let ae=n&&n.running_sort==="repo"?"repo":"started";h.sort((T,ce)=>{let Oe=T.kind==="session",Me=ce.kind==="session";if(Oe!==Me)return Oe?1:-1;if(Oe&&Me){let bt=Ca(ce.updated_at)-Ca(T.updated_at);return bt!==0?bt:T.id.localeCompare(ce.id)}if(ae==="repo"){let bt=fe.get(T.root_dir)??Number.MAX_SAFE_INTEGER,yt=fe.get(ce.root_dir)??Number.MAX_SAFE_INTEGER;if(bt!==yt)return bt-yt}let Qe=typeof T.started_at=="number"&&Number.isFinite(T.started_at)?T.started_at:null,st=typeof ce.started_at=="number"&&Number.isFinite(ce.started_at)?ce.started_at:null;return Qe!==null&&st!==null&&Qe!==st?Qe-st:Qe===null&&st!==null?1:Qe!==null&&st===null?-1:T.id.localeCompare(ce.id)}),D.sort((T,ce)=>(ce.done_at??0)-(T.done_at??0));let Te=s.length>0?s:r.map(T=>({root_dir:T&&T.root_dir,name:T&&T.name,auto_advance:T&&T.auto_advance,auto_merge:T&&T.auto_merge,slots:T&&T.slots,revision:T&&T.revision,runner_catalog:T&&T.runner_catalog})),Ie=new Set(_.map(T=>T.root_dir)),$e=[];for(let T of Te){if(!T||typeof T.root_dir!="string")continue;let ce=Y.get(T.root_dir)||[],Oe=le.get(T.root_dir)||[];!(ce.length>0||Oe.some(Qe=>Qe.items.length>0||Qe.occupied_by.length>0))&&!Ie.has(T.root_dir)||$e.push({root_dir:T.root_dir,name:T.name||T.root_dir,auto_advance:T.auto_advance===!0,auto_merge:T.auto_merge===!0,slots:typeof T.slots=="number"&&T.slots>=xp?T.slots:xp,revision:typeof T.revision=="number"?T.revision:0,runner_catalog:zt(T.runner_catalog),items:ce,sublanes:{parallel:ce,serial:Oe},serial_lane_count:K.get(T.root_dir)||0,raw_queue_length:N.get(T.root_dir)||0})}let ee={runnable:_,runnable_all:_,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:l==="updated_flat",queue:k,queue_groups:$e,running:h,pr_wait:b,done:D,parallel_rows:[],chain_lanes:[],cross_lanes_revision:i&&typeof i.revision=="number"?i.revision:null,cross_lanes_unreadable:i===null,parallel_raw_length:Object.fromEntries(N),owner_of:{}},Z=vp(ee);for(let T of B)Z.has(T.id)||Z.set(T.id,{root_dir:T.root_dir,workspace_name:T.workspace_name,lane:"done",state:"done"});for(let T of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){if(!Object.hasOwn(T,"blocked_by"))continue;let ce=Z.get(T.id);T.blockers=(T.blocked_by||[]).map(Oe=>wp(Oe,ce,Z,s))}for(let T of[...ee.queue,...ee.runnable,...ee.running,...ee.pr_wait]){let ce=(T.blockers||[]).map(Me=>({...ul(T.id,Me),openable:!0}));if(ce.length===0)continue;let Oe={predecessors:ce};T.dependency_chips=Oe}ey(ee,te,xe,Z,s);let Ce=kp(ee.queue_groups);for(let T of ee.queue_groups)for(let ce of T.sublanes.serial){let Oe=Ce.get($p(T.root_dir,ce.id));Oe&&(ce.cross_wait_peers=Oe)}ee.chain_lanes=Xh(i&&Array.isArray(i.lanes)?i.lanes:[],M,Z,s,ke,d,{armed_by_bead:G,failed_by_bead:L,disarmed_lanes:I});let z=new Map;for(let T of[...ee.queue,...ee.runnable])z.has(T.id)||z.set(T.id,T);let ne=new Set;for(let T of ee.chain_lanes)for(let ce of T.rows){if(T.status==="confirmed"&&!ce.unplaced&&!ce.fixed&&ne.add(ce.id),!T.draft&&!ce.unplaced)continue;let Oe=z.get(ce.id);Oe&&(Oe.cross_lane_chip={lane_id:T.lane_id,number:T.number,status:T.status,label:T.draft?`\uC5F0\uACB0 ${T.number} (draft)`:`\uC5F0\uACB0 ${T.number}`})}let ge=new Map(ee.chain_lanes.map(T=>[T.lane_id,T.number]));for(let T of[...ee.queue,...ee.running]){let ce=G.get(T.id);if(typeof ce!="string"||ce.length===0)continue;let Oe=ge.get(ce);T.armed_lane_chip=Oe===void 0?{lane_id:ce,label:"\u25B6 \uC9C4\uD589 \uC911 \xB7 \uB808\uC778 \uC5C6\uC74C",orphan:!0}:{lane_id:ce,label:`\u25B6 \uC5F0\uACB0 ${Oe}`,orphan:!1}}let Se=[];for(let T of Y.values())for(let ce of T)ne.has(ce.id)||Se.push(ce);Se.sort((T,ce)=>{let Oe=T.workspace_name.localeCompare(ce.workspace_name);return Oe!==0?Oe:(T.queue_index??0)-(ce.queue_index??0)}),ee.parallel_rows=Se;let Ye={};for(let[T,ce]of Z)typeof ce.root_dir=="string"&&ce.root_dir.length>0&&(Ye[T]=ce.root_dir);for(let T of ee.chain_lanes)for(let ce of T.rows)!Object.hasOwn(Ye,ce.id)&&ce.root_dir.length>0&&d.has(ce.root_dir)&&(Ye[ce.id]=ce.root_dir);ee.owner_of=Ye;let ue=ee.runnable.length;ee.runnable_all=ee.runnable.slice();let Ue=ee.runnable;a.show_blocked||(Ue=Ue.filter(T=>T.blocked!==!0));let gt=Ue.length;a.spec==="with"?Ue=Ue.filter(T=>T.published===!0):a.spec==="without"&&(Ue=Ue.filter(T=>T.published!==!0)),ee.runnable_hidden={blocked:ue-gt,spec:gt-Ue.length};let St=(T,ce)=>{let Oe=Ca(ce.updated_at)-Ca(T.updated_at);return Oe!==0?Oe:T.id.localeCompare(ce.id)},ft=l==="repo_spec"?(T,ce)=>{let Oe=T.published===!0?0:1,Me=ce.published===!0?0:1;return Oe!==Me?Oe-Me:St(T,ce)}:St;if(l==="updated_flat")ee.runnable=Ue.slice().sort(St),ee.runnable_sections=[];else{let T=new Map;for(let Me of Ue){let Qe=T.get(Me.root_dir);Qe?Qe.push(Me):T.set(Me.root_dir,[Me])}let ce=[],Oe=[];for(let Me of Te){if(!Me||typeof Me.root_dir!="string")continue;let Qe=(T.get(Me.root_dir)||[]).slice().sort(ft);T.delete(Me.root_dir),Qe.length!==0&&(ce.push({root_dir:Me.root_dir,name:Me.name||Me.root_dir,items:Qe.map(st=>({...st,workspace_name:""}))}),Oe.push(...Qe))}for(let[Me,Qe]of T){let st=Qe.slice().sort(ft);ce.push({root_dir:Me,name:st[0]?.workspace_name||Me,items:st.map(bt=>({...bt,workspace_name:""}))}),Oe.push(...st)}ee.runnable=Oe,ee.runnable_sections=ce}return ee}var Cp="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C",ty=1e4;function Rp(e){return typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)?e.lane:e.lane==="running"&&e.serial_lane_id?e.serial_lane_id:null}function Op(e){return e.lane==="runnable"||e.lane==="queue"||typeof e.lane=="string"&&/^s[1-5]$/.test(e.lane)}var Mp="bdui.monitor.done-range",Dp="bdui.monitor.running_sort",Np="bdui.monitor.candidate_sort",qp="beads-ui.monitor.candidate-filter",Fp="beads-ui.monitor.sections";function ny(){try{let e=window.localStorage.getItem(qp);if(!e)return{...es};let t=JSON.parse(e);return!t||typeof t!="object"?{...es}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:es.show_blocked,spec:_l.some(n=>n.value===t.spec)?t.spec:"all"}}catch{return{...es}}}function Lp(e){try{window.localStorage.setItem(qp,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function ry(){try{let e=window.localStorage.getItem(Np);return Vs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function sy(e){try{window.localStorage.setItem(Np,e)}catch{}}function oy(){try{let e=window.localStorage.getItem(Fp);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Ip(e){try{window.localStorage.setItem(Fp,JSON.stringify(e))}catch{}}function ay(){try{let e=window.localStorage.getItem(Mp);return e===null?"today":Un(e)}catch{return"today"}}function iy(e){try{window.localStorage.setItem(Mp,e)}catch{}}function ly(){try{return window.localStorage.getItem(Dp)==="repo"?"repo":"started"}catch{return"started"}}function cy(e){try{window.localStorage.setItem(Dp,e)}catch{}}var jp="tab:monitor:pipeline",uy=1e3,dy=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Pp="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function py(e){return e>=1&&e<=Pp.length?Pp[e-1]:`(${e})`}function Bp(e,t){let n=Gt("views:monitor"),r=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.openDoc,l=t.switchWorkspace,u=t.router,d=t.now||(()=>Date.now()),_=t.confirm||(p=>typeof globalThis.confirm!="function"||globalThis.confirm(p)),h=ay(),b=ly(),k=ny(),D=ry(),B=oy(),Y=null,le=null,K=null,N=null,M=[],G=null,L=null,I=null,te=null;function xe(p){return te===null&&(te=Ze()),ep(p,te)}function ke(p,g){fe(),!(g<=0)&&(L={lane_id:p,corrected:g},I=setTimeout(()=>{I=null,L=null,v()},ty))}function fe(){I!==null&&(clearTimeout(I),I=null),L=null}function ae(){let p=Mr.find(g=>g.value===h);return p?p.label:""}let Te=document.createElement("div");Te.className="mon",e.appendChild(Te);let Ie=document.createElement("div");Ie.className="worker-drawer-overlay",Ie.hidden=!0;let $e=document.createElement("div");$e.className="worker-drawer-overlay__backdrop";let ee=document.createElement("div");ee.className="worker-drawer-host mon2-drawer",Ie.append($e,ee),e.appendChild(Ie);let Z=ml(null,null),Ce=new Map,z=new Map,ne=null,ge=null,Se=null,Ye=Vr(ee,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{Y=null,Ie.hidden=!0,v()}});async function ue(p,g,y,$,W=!0){if(!o||!y)return null;let V=await o(p,{...g,root_dir:y,expected_revision:$});if(V&&V.conflict&&W){V.queue&&z.set(y,V.queue);let se=V.queue&&typeof V.queue.revision=="number"?V.queue.revision:$;V=await o(p,{...g,root_dir:y,expected_revision:se})}return V&&V.queue&&y&&z.set(y,V.queue),V}function Ue(p,g){let y=z.get(p),$=s&&s.get?s.get():null,W=(Array.isArray($)?$:[]).find(se=>se?.root_dir===p);return(y||W)?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action}async function gt(p,g,y,$){let W=await ue(p,g,y,$),V=z.get(y)?.revision??W?.queue?.revision??$;return Yn(W,(se,ye)=>ue(p,{...g,continuation:se,decision_token:ye},y,V,!1),{refresh:se=>ue(p,g,y,se?.queue?.revision??z.get(y)?.revision??V,!1)})}async function St(p,g,y,$){let W=await Yn({continuation_mismatch:$},(se,ye)=>ue("worker-merge-queue-add",{bead_id:g,continuation:se,decision_token:ye},p,y,!1)),V=W?.queue?.merge_queue?.find(se=>se.bead_id===g)?.continuation_action;W?.applied!==!0&&V?.continuation===null&&V.mismatch&&await St(p,g,W.queue.revision,V.mismatch)}async function xt(p,g,y){let $=await ue("worker-discard",p,g,y);if($&&$.discarded===!0){de(pa($),"success",5e3);return}if($&&$.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${$.reason}`,"error");return}if($&&$.accepted&&$.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if($&&$.accepted){de(`\uD3D0\uAE30 \uC9C4\uD589: ${$.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}$&&!$.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function ft(p,g,y){return!o||!y?null:await o(p,{...g,root_dir:y})}async function T(){let p=new Map;for(let g of Z.pr_wait)p.has(g.root_dir)||p.set(g.root_dir,g.expected_revision);for(let[g,y]of p)await ue("worker-merge-queue-add-all",{},g,y)}function ce(p){let g=B[p];return!!(g&&g.runnable===!0)}function Oe(p){let g={...B[p]||{}};g.runnable=!g.runnable,B={...B,[p]:g},Ip(B),v()}function Me(p){return B[p]===!0}function Qe(p){B={...B,[p]:B[p]!==!0},Ip(B),v()}function st(p){let g=Z.queue_groups.find(y=>y.root_dir===p);if(!g)return null;for(let y=0;y<g.serial_lane_count;y+=1){let $=`s${y+1}`,W=g.sublanes.serial.find(V=>V.id===$);if(!W||W.raw_length===0&&W.occupied_by.length===0)return $}return null}function bt(p,g){let y=Z.queue_groups.find(W=>W.root_dir===p),$=y?y.sublanes.serial.find(W=>W.id===g):void 0;return $?$.raw_length:0}function yt(p,g){let y=Ce.get(p),$=Ce.get(g);if(!y||!$)return{kind:"note",text:"\uC0C1\uB300\uC758 \uD604\uC7AC \uC704\uCE58\uB97C \uC54C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"};let W=Rp(y),V=Rp($);if(W!==null&&W===V&&y.root_dir===$.root_dir)return{kind:"note",text:"\uC774\uBBF8 \uAC19\uC740 \uC9C1\uB82C \uB808\uC778 \u2014 \uC21C\uC11C\uAC00 \uC788\uC2B5\uB2C8\uB2E4"};let se=Op(y),ye=Op($);if(se&&V!==null){let et=V;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${p}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:$.root_dir,ops:[{bead_id:p,lane:et,index:bt($.root_dir,et)}]}}if(W!==null&&ye&&V===null){let et=W;return{kind:"ops",title:`${et} \uB05D\uC5D0 ${g}\uB97C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:g,lane:et,index:bt(y.root_dir,et)}]}}if(se&&W===null&&ye&&V===null){let et=st(y.root_dir);return et===null?{kind:"disabled",title:"\uBE48 \uC9C1\uB82C \uB808\uC778 \uC5C6\uC74C \u2014 Worker \uD0ED\uC5D0\uC11C \uB808\uC778 \uC218 \uC870\uC808"}:{kind:"ops",title:`${et} \uB808\uC778\uC5D0 ${g} \u2192 ${p} \uC21C\uC11C\uB85C \uB123\uC2B5\uB2C8\uB2E4`,root_dir:y.root_dir,ops:[{bead_id:g,lane:et,index:0},{bead_id:p,lane:et,index:1}]}}return!se&&!ye?{kind:"note",text:"\uB458 \uB2E4 \uC774\uBBF8 \uCD9C\uBC1C \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}:se?{kind:"note",text:`${Ds($.lane)} \u2014 \uC885\uB8CC \uD6C4 \uCD9C\uBC1C\uD558\uB824\uBA74 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}:{kind:"note",text:`${Ds(y.lane)} \u2014 \uC21C\uC11C\uB97C \uB9CC\uB4E4\uB824\uBA74 \uC0C1\uB300\uB97C \uC9C1\uB82C \uB808\uC778\uC5D0 \uB450\uC138\uC694`}}function re(p,g){let y=yt(p,g.id);return{id:g.id,title:g.title,location_label:g.location_label,prefixes:g.prefixes,action:y.kind==="note"?{kind:"note",text:y.text}:y.kind==="disabled"?{kind:"disabled",label:Cp,title:y.title}:{kind:"place",label:Cp,title:y.title}}}function Q(p,g){if(!K||K.bead_id!==p)return null;let y=K.counterpart_id,$=g.filter(W=>W.id===y);return $.length===0?null:{rows:$.map(W=>re(p,W))}}function je(p){let g=p.dependency_chips||null,y=p.overlap_chips||[],$=p.scope_state==="missing",W=p.cross_lane_chip,V=p.armed_lane_chip;if(!g&&y.length===0&&!$&&!W&&!V)return null;let se=Q(p.id,y);return{...g||{},...y.length>0?{overlaps:y}:{},...$?{scope_missing:!0}:{},...W?{cross_lane:{lane_id:W.lane_id,label:W.label}}:{},...V?{armed_lane:V}:{},...se?{popover:se}:{}}}function it(p){let g=je(p);return g?{...p,dependency_chips:g}:p}async function We(p,g){let y=yt(p,g);if(K=null,y.kind!=="ops"){v();return}let $=tt(y.root_dir,y.ops[0].bead_id);for(let W of y.ops){let V=await we(W,y.root_dir,$);if(V===null)break;$=V}v()}async function we(p,g,y){try{let $=await ue("worker-queue-place",p,g,y,!1);if($&&$.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!$||$.applied!==!0)return de($&&typeof $.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${$.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let W=$.queue?$.queue.revision:void 0;return typeof W!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):W}catch($){return de(ht($),"error"),null}}function Ge(p){let g=ce(p.root_dir);return c`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${p.root_dir}
        data-section="runnable"
        aria-expanded=${g?"false":"true"}
        aria-label=${`${p.name} \uC139\uC158 ${g?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${g?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${p.root_dir}>${p.name}</span>
      <span class="mon2-sec__count">${p.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${p.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function dt(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="candidate"
      data-root-dir=${p.root_dir}
    >
      ${g}
    </div>`}function _t(p){if(le!==p.id)return null;let g=Z.queue_groups.find(V=>V.root_dir===p.root_dir),y=p.place_lanes||[],$=Z.cross_lanes_revision!==null,W=[{id:"parallel",label:"\uBCD1\uB82C",count:p.place_index??0}];for(let V of Z.chain_lanes)W.push({id:`lane:${V.lane_id}`,label:`\uC5F0\uACB0 ${V.number} (${V.draft?"draft":"\uD655\uC815"}) \uB05D\uC5D0`,count:V.rows.length,group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$});W.push({id:"new-lane",label:"+ \uC0C8 \uC5F0\uACB0 \uB808\uC778",group:"\uC5F0\uACB0 \uB808\uC778",disabled:!$,title:$?"\uC774 \uC774\uC288\uB9CC \uB4E0 draft \uB808\uC778\uC744 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"});for(let V of y)W.push({id:`serial:${V.id}`,label:`\uC9C1\uB82C ${Number(V.id.slice(1))}`,count:V.length,group:`${g?g.name:""} \uC9C1\uB82C`});return{bead_id:p.id,lanes:W}}function mt(){let p=[],g=new Set,y=($,W)=>{for(let V of $)g.has(V.id)||(g.add(V.id),p.push({bead_id:V.id,root_dir:V.root_dir,workspace_name:V.workspace_name,title:V.title,lane:W}))};return y(Z.running,"running"),y(Z.pr_wait,"pr_wait"),y(Z.queue,"queue"),y(Z.runnable_all,"runnable"),p}function Pt(p){if(!N||N.bead_id!==p)return"";let g=rn(),y=mt(),$=new Map;for(let ye of y)$.set(ye.bead_id,ye);let W=(g.get(p)||[]).filter(ye=>$.has(ye)),V=pp(dp(p,{issues:y,blocked_by_map:g}),N.query),se=Z.owner_of[p];return c`<div
      class="mon-deppanel"
      data-bead-id=${p}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${W.length===0?c`<span class="mon-deppanel__empty">막는 이슈 없음</span>`:""}
        ${W.map(ye=>c`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${ye}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${p}
                data-dep-b=${ye}
                aria-label=${`${ye} \uC5F0\uACB0 \uD574\uC81C`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`)}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${N.query}
      />
      <div class="mon-deppanel__list">
        ${V.length===0?c`<div class="mon-deppanel__empty">후보 없음</div>`:V.map(ye=>c`<button
                  type="button"
                  class="mon-deppanel__cand${ye.disabled?" is-disabled":""}"
                  data-dep-cand=${ye.bead_id}
                  ?disabled=${ye.disabled}
                  title=${ye.reason||ye.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${ye.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${ye.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${ye.title}</span
                  >${ye.reason?c`<span class="mon-deppanel__cand-reason"
                        >${ye.reason}</span
                      >`:""}
                </button>`)}
      </div>
      ${se===void 0?c`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`:""}
    </div>`}function Kt(p){return dt(p,c`${Yi(it(p),_t(p),{exec_chips_mode:"pinned_only",dep_action:!0,onOpenDoc:i?(g,y)=>i(y,p.root_dir):void 0})}${Pt(p.id)}`)}function Ht(){return Z.runnable_flat?c`<div class="mon2-flat" data-drop="candidate">
        ${Z.runnable.map(p=>Kt(p))}
      </div>`:c`${Z.runnable_sections.map(p=>{let g=ce(p.root_dir);return c`<section
        class="mon2-sec${g?" is-collapsed":""}"
        data-root-dir=${p.root_dir}
        data-section="runnable"
      >
        ${Ge({root_dir:p.root_dir,name:p.name,count:p.items.length})}
        ${g?"":c`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${p.items.map(y=>Kt(y))}
            </div>`}
      </section>`})}`}function Ct(p,g){return c`<div
      class="mon2-item"
      data-bead-id=${p.id}
      data-drag-kind="parallel"
      data-root-dir=${p.root_dir}
      data-row-index=${g}
      data-queue-index=${String(p.queue_index??0)}
    >
      ${lr(it(p))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${p.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${p.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${p.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${Pt(p.id)}
    </div>`}function Lt(){let p=Me("parallel");return c`<section
      class="mon2-area mon2-parallel${p?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${Z.parallel_rows.length}</span>
      </header>
      ${p?"":c`<div class="mon2-area__body" data-drop="parallel">
            ${Z.parallel_rows.length===0?c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:Z.parallel_rows.map((g,y)=>Ct(g,y))}
          </div>`}
    </section>`}function Xe(p,g,y,$){return c`<div
      class="mon2-crow${g.fixed?" mon2-crow--fixed":""}"
      draggable=${g.draggable?"true":"false"}
      data-bead-id=${g.id}
      data-drag-kind="chain"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.lane_id}
      data-row-index=${y}
      data-queue-index=${typeof g.queue_index=="number"?String(g.queue_index):""}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${py(g.seq)}</span
      >
      ${g.workspace_name?c`<span class="worker-mini__repo" title=${g.root_dir}
            >${g.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${g.id}</span>
      <span class="mon2-crow__title">${g.title}</span>
      ${g.mismatch?c`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`:""}
      ${$.includes(g.id)?c`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`:""}
      <span class="mon2-crow__where" title=${g.location_title}
        >${g.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${g.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`}function De(p){let g=Z.cross_lanes_revision!==null,y=xe(p.lane_id),$=y?.held===!0,W=y?.cycle===!0,V=y?y.mismatched:[],se=L&&L.lane_id===p.lane_id?L.corrected:0;return c`<div class="mon2-clane" data-lane-id=${p.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${p.label}</span>
        <span class="mon2-clane__count">${p.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${p.state}"
          >${p.badge}</span
        >
        ${se>0?c`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${se}건 자동 교정</span
            >`:""}
        ${W?c`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`:""}
        ${$?c`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${xa}</span
            >`:""}
        ${p.draft?c`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${p.lane_id}
              ?disabled=${!g||!p.can_confirm||$}
              title=${$?xa:p.can_confirm?"\uC778\uC811 \uC758\uC874\uC744 \uAC78\uACE0 \uBBF8\uC801\uC7AC \uBA64\uBC84\uB97C \uAC01\uC790 \uB808\uD3EC \uBCD1\uB82C \uD050 \uB05D\uC5D0 \uC62C\uB9BD\uB2C8\uB2E4":"\uBA64\uBC84\uAC00 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD655\uC815\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4"}
            >
              확정
            </button>`:""}
        ${p.run_label!==null?c`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${p.run_label}
            </button>`:""}
        ${p.state==="confirmed"&&p.has_mismatch?c`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`:""}
        ${p.can_stop?c`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${p.lane_id}
              ?disabled=${!g}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`:""}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${p.lane_id}
          ?disabled=${!g}
          title=${p.draft?"\uC774 draft \uB808\uC778\uC744 \uC9C0\uC6C1\uB2C8\uB2E4":"\uC774 \uB808\uC778\uACFC \uB808\uC778\uC774 \uB9CC\uB4E0 \uC758\uC874\uC744 \uD568\uAED8 \uC9C0\uC6C1\uB2C8\uB2E4"}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${p.lane_id}
      >
        ${p.rows.length===0?c`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:p.rows.map((ye,et)=>Xe(p,ye,et,V))}
      </div>
    </div>`}function P(p,g,y){return c`<div
      class="mon2-item"
      data-bead-id=${g.id}
      data-drag-kind="repo-serial"
      data-root-dir=${g.root_dir}
      data-lane-id=${p.id}
      data-row-index=${y}
      data-queue-index=${String(g.queue_index??0)}
    >
      ${lr(it(g))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${g.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${Pt(g.id)}
    </div>`}function J(p){if(p.length===0)return"";let g=p.length-1;return`${p[0].id} \uC810\uC720${g>0?` +${g}`:""}`}function ve(p){return c`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${p.id}
    >
      ${lr({id:p.id,title:p.title,lane:"running",draggable:!1,ghost:!0,badges:[p.badge]})}
    </div>`}function E(p,g){return c`<div
      class="mon2-lane${g.empty?" mon2-lane--empty":""}"
      data-root-dir=${p.root_dir}
      data-lane-length=${String(g.raw_length)}
    >
      ${Ln({id:"",lane:g.id,title:`${p.name} \xB7 \uC9C1\uB82C ${g.index+1}`,items:g.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:c`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${p.root_dir}
          data-lane-id=${g.id}
          data-lane-length=${String(g.raw_length)}
        >
          ${g.occupants.map(y=>ve(y))}
          ${g.items.length>0?g.items.map((y,$)=>P(g,y,$)):g.occupants.length>0?"":c`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,header_control:c`<span
            class="mon2-lane__badge${g.occupants.length>0?" mon2-lane__badge--held":""}"
            title=${g.occupants.length>0?g.occupants.map(y=>`${y.id} \u2014 ${y.badge}`).join(`
`):""}
            >${J(g.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${p.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${g.empty?c`<div class="mon2-lane__hint">
            ${p.name} 직렬 ${g.index+1} 비어 있음
          </div>`:""}
      ${g.cycle?c`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(g.cross_wait_peers||[]).map(y=>c`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${y.workspace_name}·${y.lane}과 교차 대기
          </div>`)}
    </div>`}function H(){let p=Me("serial"),g=Z.cross_lanes_revision!==null,y=Z.chain_lanes.some($=>$.draft&&$.rows.length===0);return c`<section
      class="mon2-area mon2-serial${p?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${p?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${p?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${p?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${y||!g}
          title=${g?y?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4":"\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${p?"":c`<div class="mon2-area__body">
            ${Z.cross_lanes_unreadable?c`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`:""}
            ${Z.chain_lanes.map($=>De($))}
            ${Z.queue_groups.map($=>$.sublanes.serial.map(W=>E($,W)))}
          </div>`}
    </section>`}function Re(){return c`<div class="mon2-wait">${Lt()}${H()}</div>`}function x(p){return c`<div class="worker-rungrid">
      ${Z.running.length===0?c`<div class="worker-rungrid__empty">실행 세션 없음</div>`:Z.running.map(g=>Ji({bead_id:g.id,attempt_id:g.attempt_id||"",title:g.title,runner:g.runner??null,model:g.model??null,effort:g.effort??null,speed:g.speed??null,started_at:g.started_at??null,kind:g.kind,...g.kind==="session"?{updated_at:g.updated_at,session_refs:g.session_refs||[]}:{},workflow:g.workflow||null,resumed_from:g.resumed_from??null,continuation_mode:g.continuation_mode??null,paused:g.run_state==="paused",failed:g.run_state==="failed",status:g.status,status_label:g.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:g.can_resume!==!1,can_pause:g.can_pause!==!1,exec_chips:g.exec_chips||null,usage:g.usage||null,discard:g.discard},p,Y,{monitor:{repo:g.workspace_name,root_dir:g.root_dir,serial_lane_id:g.serial_lane_id,last_activity:g.last_activity||null,legs:g.legs||[],dependency_chips:je(g)}}))}
    </div>`}function R(p){let g={runnable:Z.runnable,queue:Z.queue,running:Z.running,pr_wait:Z.pr_wait,done:Z.done};return c`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${dy.map(y=>{let $=g[y.lane],W=y.lane==="runnable"?Z.runnable_flat?$.length>0?Ht():void 0:Z.runnable_sections.length>0?Ht():void 0:y.lane==="queue"?Z.queue_groups.length>0||Z.chain_lanes.length>0||Z.parallel_rows.length>0?Re():void 0:y.lane==="running"?x(p):$.length>0?c`${$.map(V=>lr(V))}`:void 0;return Ln({id:`monitor-${y.lane}`,lane:y.pane,title:y.lane==="done"?`\uC644\uB8CC\xB7${ae()}`:y.title,items:$,empty:y.empty,body:W,live:y.lane==="running"&&$.length>0,controls:y.lane==="runnable"?X():void 0,header_control:_e(y.lane,$.length)})})}
      </div>`}function X(){return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${k.show_blocked}
        />
        🔒
        blocked${Z.runnable_hidden.blocked>0?` ${Z.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${_l.map(p=>c`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${k.spec===p.value?" is-active":""}"
              data-spec=${p.value}
              aria-pressed=${k.spec===p.value?"true":"false"}
            >
              ${p.label}
            </button>`)}
        ${Z.runnable_hidden.spec>0?c`<span class="worker-filter__hidden"
              >숨김 ${Z.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function _e(p,g){return p==="runnable"?c`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${D}
      >
        ${Vs.map(y=>c`<option
              value=${y.value}
              ?selected=${D===y.value}
            >
              ${y.label}
            </option>`)}
      </select>`:p==="running"?c`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${b}
      >
        <option value="started" ?selected=${b==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${b==="repo"}>
          레포순
        </option>
      </select>`:p==="pr_wait"&&g>0?c`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:p==="done"?c`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${h}
      >
        ${Mr.map(y=>c`<option value=${y.value} ?selected=${h===y.value}>
              ${y.label}
            </option>`)}
      </select>`:""}function Ae(p){let g=s&&s.get?s.get():null,y=s&&s.getWorkspacesState?s.getWorkspacesState():[],$=p===void 0?s&&s.crossLanes?s.crossLanes():void 0:p,W={done_since:yr(h,d()),running_sort:b,candidate_filter:k,candidate_sort:D};return $!==void 0&&(W.cross_lanes=$),ml(g,y,W)}function v(){let p=d();Z=Ae(),te=null,Ce=new Map;for(let g of[...Z.runnable,...Z.queue,...Z.running,...Z.pr_wait,...Z.done])!g.non_occupying&&!Ce.has(g.id)&&Ce.set(g.id,g);at(R(p),Te),ie()?.render(),U(),Ke()}function U(){let p=new Map;for(let g of Z.queue_groups)p.set(g.root_dir,g.auto_advance);for(let g of Array.from(Te.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let y=g.closest(".mon2-item")?.getAttribute("data-root-dir")||"",$=p.get(y);typeof $=="boolean"&&g.setAttribute("title",`${g.textContent||""} \xB7 ${$?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function ie(){if(Se)return Se;let p=Te.querySelector(".mon2-deck");return p?(Se=Xd(p,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>Z.done,rangeLabel:ae,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:be,onFocusChange:g=>{G=g,Ke()}}),Se):null}function Ke(){Te.classList.toggle("has-focus",G!==null);for(let p of Array.from(Te.querySelectorAll(".mon2-sec[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G);for(let p of Array.from(Te.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let g=Ce.get(p.getAttribute("data-bead-id")||"");p.classList.toggle("is-focus",G!==null&&!!g&&g.root_dir===G)}for(let p of Array.from(Te.querySelectorAll(".mon2-crow[data-root-dir]")))p.classList.toggle("is-focus",G!==null&&p.getAttribute("data-root-dir")===G)}function Be(p,g){let y=a?a():void 0;if(!g||!y||g===y||!l){r(p);return}l(g).then(()=>{r(p)}).catch($=>{n("workspace switch for %s failed: %o",g,$)})}function be(p){if(!p)return;let g=a?a():void 0,y=()=>{try{u?.gotoView("worker")}catch($){n("gotoView(worker) failed: %o",$)}};if(!l||g&&g===p){y();return}l(p).then(y).catch($=>{n("workspace switch for %s failed: %o",p,$),de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function Rt(p){xn(p).then(g=>{de(g?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",g?"success":"error",1400)})}function vt(p){let g=Ce.get(p)||null;return{item:g,root_dir:g?g.root_dir:"",revision:g?g.expected_revision:0}}function ht(p){if(typeof p=="string"&&p.length>0)return p;if(p&&typeof p=="object"){let g=p;if(typeof g.message=="string"&&g.message.length>0)return g.message;if(typeof g.error=="string"&&g.error.length>0)return g.error;if(g.error&&typeof g.error=="object"&&typeof g.error.message=="string")return g.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function Qt(p,g,y){let $=Z.owner_of[g];if(typeof $!="string"||$.length===0){de(`${g}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error");return}try{await ft(p,{a:g,b:y},$),await qt(p,g,y)}catch(W){de(ht(W),"error")}v()}async function qt(p,g,y){if(p!=="dep-add")return;let $=Z.chain_lanes.find(W=>W.rows.some(V=>V.id===g));!$||!$.rows.some(W=>W.id===y)||await wt(W=>ap($.lane_id,W),"",[{type:p,a:g,b:y}])}function an(p){return Z.runnable.some(g=>g.id===p)||Z.parallel_rows.some(g=>g.id===p)?!0:Z.queue_groups.some(g=>g.sublanes.serial.some(y=>y.items.some($=>$.id===p)))}function en(p){!p||!an(p)||(N=N&&N.bead_id===p?null:{bead_id:p,query:""},v())}function rn(){let p=new Map,g=s&&s.get?s.get():null,y=$=>Array.isArray($)?$.filter(W=>typeof W=="string"&&W.length>0):[];for(let $ of Array.isArray(g)?g:[]){if(!$||typeof $!="object")continue;let W=$.bead_blocked_by&&typeof $.bead_blocked_by=="object"?$.bead_blocked_by:{};for(let[V,se]of Object.entries(W))Array.isArray(se)&&p.set(V,y(se));for(let V of[...Array.isArray($.runnable)?$.runnable:[],...Array.isArray($.session_active)?$.session_active:[]])V&&typeof V.bead_id=="string"&&Array.isArray(V.blocked_by)&&V.blocked_by.length>0&&p.set(V.bead_id,y(V.blocked_by))}return p}function Xt(){let p=new Map,g=new Map,y=s&&s.get?s.get():null,$=W=>Array.isArray(W)?W.filter(V=>typeof V=="string"&&V.length>0):[];for(let W of Array.isArray(y)?y:[]){if(!W||typeof W!="object")continue;let V=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[se,ye]of Object.entries(V))Array.isArray(ye)&&p.set(se,$(ye));for(let se of Array.isArray(W.runnable)?W.runnable:[])se&&typeof se.bead_id=="string"&&Array.isArray(se.blocked_by)&&g.set(se.bead_id,$(se.blocked_by))}for(let W of M)for(let V of[p,g]){let se=V.get(W.a);se!==void 0&&V.set(W.a,W.type==="dep-remove"?se.filter(ye=>ye!==W.b):se.includes(W.b)?se:[...se,W.b])}return{snapshot:p,runnable:g}}function on(){let p=rn();for(let g of M){let y=(p.get(g.a)||[]).slice();g.type==="dep-remove"?p.set(g.a,y.filter($=>$!==g.b)):y.includes(g.b)||p.set(g.a,[...y,g.b])}return p}function Ze(p=Z,g=gn()){let y=new Map;for(let ct of Array.isArray(g?.lanes)?g.lanes:[]){let nn=new Map;for(let Ot of Array.isArray(ct?.entries)?ct.entries:[])Ot&&typeof Ot.bead_id=="string"&&nn.set(Ot.bead_id,Ot.dep_created_by_lane===!0);y.set(typeof ct?.id=="string"?ct.id:"",nn)}let $=new Map,W=new Map,V=new Set,se=new Set;for(let ct of p.chain_lanes){let nn=y.get(ct.lane_id);$.set(ct.lane_id,{status:ct.status,entries:ct.rows.map((Ot,Tn)=>({bead_id:Ot.id,root_dir:Ot.root_dir,...Tn===0?{}:{dep_created_by_lane:nn?.get(Ot.id)===!0}}))});for(let Ot of ct.rows)W.set(Ot.id,ct.lane_id),Ot.fixed&&V.add(Ot.id),Ot.unplaced||se.add(Ot.id)}let ye=new Map;for(let ct of p.parallel_rows)typeof ct.queue_index=="number"&&ye.set(ct.id,ct.queue_index);for(let ct of p.queue_groups)for(let nn of ct.sublanes.serial)for(let Ot of nn.items)typeof Ot.queue_index=="number"&&ye.set(Ot.id,Ot.queue_index);let et=Xt();return{blocked_by_map:on(),snapshot_blocked_by:et.snapshot,runnable_blocked_by:et.runnable,owner_of:new Map(Object.entries(p.owner_of)),cross_lanes:$,owner_lane_of:W,fixed_members:V,placed_members:se,parallel_rows:p.parallel_rows.map(ct=>({bead_id:ct.id,root_dir:ct.root_dir,queue_index:ct.queue_index??0})),parallel_raw_length:new Map(Object.entries(p.parallel_raw_length)),queue_index_of:ye}}function gn(){return(s&&s.crossLanes?s.crossLanes():null)??null}function tt(p,g){let y=Ce.get(g);if(y&&y.root_dir===p)return y.expected_revision;let $=Z.queue_groups.find(W=>W.root_dir===p);return $?$.revision:0}async function Pe(p,g,y){if(p.type==="worker-queue-disarm"){try{let $=await ue(p.type,p.payload,p.root_dir,y.get(p.root_dir)??tt(p.root_dir,g));$&&$.queue&&typeof $.queue.revision=="number"&&y.set(p.root_dir,$.queue.revision)}catch{}return!0}if(p.type==="worker-queue-place"||p.type==="worker-queue-reorder"||p.type==="worker-queue-remove")return await C(p.type,p.payload,p.root_dir,y,{bead_id:g})!==null;try{return(p.type==="dep-add"||p.type==="dep-remove")&&await ft(p.type,{a:p.a,b:p.b},p.root_dir),!0}catch($){return de(ht($),"error"),!1}}async function C(p,g,y,$,W){try{let V=await ue(p,g,y,$.get(y)??tt(y,W.bead_id));return!V||typeof V.applied!="boolean"?(de("\uD050 \uC694\uCCAD\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error"),null):(V.queue&&typeof V.queue.revision=="number"&&$.set(y,V.queue.revision),V.conflict?(de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null):V.applied===!1?(de(V.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${V.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null):V.queue&&typeof V.queue.revision=="number"?V.queue.revision:$.get(y)??0)}catch(V){return de(ht(V),"error"),null}}function he(p){(p.type==="dep-add"||p.type==="dep-remove")&&(M=[...M,{type:p.type,a:p.a,b:p.b}])}async function Ne(p,g){if(!o)return{ok:!1};try{let y=await o(p.type,{...p.payload,expected_revision:g});return!y||typeof y.revision!="number"?(de("\uC5F0\uACB0 \uB808\uC778 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{ok:!1}):{ok:!0,revision:y.revision}}catch(y){let $=y,W=$&&$.code==="conflict"?$.details?.cross_lanes:null;return W&&typeof W.revision=="number"&&Array.isArray(W.lanes)?{ok:!1,conflict:W}:(de(ht(y),"error"),{ok:!1})}}async function At(p,g,y){let $=new Map,W=[],V=p.ops.slice(0,p.lane_op_index),se=p.ops.slice(p.lane_op_index);for(let et of V){if(!await Pe(et,y,$))return{done:!0};he(et)}let ye=g;for(let et of p.lane_ops){if(ye===null)return de("\uC5F0\uACB0 \uB808\uC778 \uC800\uC7A5\uC18C\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error"),{done:!0};let ct=await Ne(et,ye);if(!ct.ok)return ct.conflict?{done:!1,conflict:ct.conflict}:{done:!0};ye=ct.revision}for(let et of se){if(!await Pe(et,y,$))return{done:!0};he(et),et.type==="dep-add"&&W.push(et)}for(let et of cp(W))ye=await Ft(et,ye);return{done:!0}}async function Ft(p,g){if(g===null||!o)return g;let y=p.pairs,$=g;for(let W=0;W<2;W+=1){if(y.length===0)return $;try{let V=await o("monitor-lane-provenance",{lane_id:p.lane_id,pairs:y.map(se=>({bead_id:se.bead_id,after:se.after,value:!0})),expected_revision:$});return V&&typeof V.revision=="number"?V.revision:$}catch(V){let se=V,ye=se&&se.code==="conflict"?se.details?.cross_lanes:null;if(!ye||typeof ye.revision!="number"||!Array.isArray(ye.lanes))return $;let et=ye.lanes.find(ct=>ct&&ct.id===p.lane_id);y=up(Array.isArray(et?.entries)?et.entries:[],y),$=ye.revision}}return $}async function wt(p,g,y=[]){M=y,fe();let $=Z,W=gn();for(let V=0;;V+=1){let se=p(Ze($,W));if("refused"in se){de(se.refused,"error");break}let ye=await At(se,$.cross_lanes_revision,g);if(ye.done){se.correction&&ke(se.correction.lane_id,se.correction.corrected);break}if(V>=1){de("\uB808\uC778\uC774 \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4","error");break}$=Ae(ye.conflict),W=ye.conflict}M=[],v()}async function jt(p,g){await wt(y=>al(p,g,y),p.bead_id)}async function tn(p,g){if(p==="run"){await wn(g);return}if(p==="stop"){await Bt(g);return}if(p==="create"){await wt(y=>il(null,y),"");return}if(p==="remove"){let y=lp(g,Ze());if(y!==null&&!_(y))return;await wt($=>ip(g,$),"");return}await wt(y=>p==="confirm"?sp(g,y):op(g,y),"")}function ln(p){let g=new Map;for(let y of p.rows){let $=Z.owner_of[y.id]||y.root_dir;typeof $!="string"||$.length===0||g.set($,[...g.get($)||[],y.id])}return g}async function wn(p){let g=Z.chain_lanes.find(V=>V.lane_id===p);if(!g||Z.cross_lanes_revision===null){v();return}fe();let y=new Map,$=new Map,W=ln(g);for(let V of g.rows){if(!V.unplaced)continue;let se=Z.owner_of[V.id]||V.root_dir;if(typeof se!="string"||se.length===0){de(`${V.id}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC801\uC7AC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`,"error"),v();return}let ye=$.get(se)??0;if(await C("worker-queue-place",{bead_id:V.id,lane:"parallel",index:(Z.parallel_raw_length[se]??0)+ye},se,y,{bead_id:V.id})===null){v();return}$.set(se,ye+1)}for(let[V,se]of W)if(await C("worker-queue-arm",{bead_ids:se,lane_id:p},V,y,{bead_id:se[0]})===null){de("\uC77C\uBD80 \uB808\uD3EC\uC5D0\uC11C \uC9C4\uD589\uC744 \uCF1C\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 [\u25B6 \uC774\uC5B4\uC11C \uC9C4\uD589]\uC73C\uB85C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694","error"),v();return}v()}async function Bt(p){let g=Z.chain_lanes.find($=>$.lane_id===p);if(!g||Z.cross_lanes_revision===null){v();return}fe();let y=new Map;for(let[$,W]of ln(g))if(await C("worker-queue-disarm",{lane_id:p},$,y,{bead_id:W[0]})===null)break;v()}async function En(p,g){let{root_dir:y,revision:$}=vt(p);if(y.length===0){v();return}await C("worker-queue-disarm",{bead_ids:[p],lane_id:g},y,new Map([[y,$]]),{bead_id:p}),v()}async function kn(p,g){let y=Ce.get(p);if(!y){v();return}let $={kind:"candidate",bead_id:p,root_dir:y.root_dir};if(g==="new-lane"){await wt(W=>il({bead_id:p,root_dir:y.root_dir},W),p);return}if(g.startsWith("lane:")){let W=g.slice(5);if(!Z.chain_lanes.find(se=>se.lane_id===W)){v();return}await wt(se=>al($,{kind:"chain",lane_id:W,marker_index:(se.cross_lanes.get(W)?.entries??[]).length},se),p);return}if(g.startsWith("serial:")){let W=g.slice(7),V=(y.place_lanes||[]).find(se=>se.id===W);await jt($,{kind:"repo-serial",root_dir:y.root_dir,lane_id:W,index:V?V.index:0});return}await jt($,{kind:"parallel",marker_index:Z.parallel_rows.length})}async function nr(p,g){let y=Z.parallel_rows,$=y.findIndex(ct=>ct.id===p);if($<0)return;let W=y[$].root_dir,V=[];y.forEach((ct,nn)=>{ct.root_dir===W&&V.push(nn)});let se=V.indexOf($),ye=V[se+g];if(typeof ye!="number")return;let et=g===-1?ye:V[se+2]??Math.min(y.length,ye+1);await jt({kind:"parallel",bead_id:p,root_dir:W,queue_index:y[$].queue_index??0},{kind:"parallel",marker_index:et})}async function S(p){for(let g of Z.chain_lanes){let y=g.rows.find($=>$.id===p);if(y){await jt({kind:"chain",bead_id:p,root_dir:y.root_dir,lane_id:g.lane_id,...typeof y.queue_index=="number"?{queue_index:y.queue_index}:{}},{kind:"parallel",marker_index:Z.parallel_rows.length});return}}}let O=null,qe=!1,ze=null;function lt(){ze!==null&&clearTimeout(ze),ze=setTimeout(()=>{ze=null,qe=!1},0)}function f(p,g){let y=g&&typeof g.closest=="function"?g.closest("[data-row-index]"):null;if(y&&p.contains(y)){let $=Number(y.getAttribute("data-row-index"));return Number.isFinite($)?$:0}return p.querySelectorAll("[data-row-index]").length}function w(p){let g=p.target,y=typeof g?.closest=="function"?g.closest("[data-drop]"):null;if(!y||!O)return null;let $=y.getAttribute("data-drop");if($==="candidate")return{zone:y,target:{kind:"candidate"}};if($==="parallel")return{zone:y,target:{kind:"parallel",marker_index:f(y,g)}};if($==="chain")return{zone:y,target:{kind:"chain",lane_id:y.getAttribute("data-lane-id")||"",marker_index:f(y,g)}};if($==="repo-serial"){let W=y.getAttribute("data-root-dir")||"";if(W!==O.root_dir)return null;let V=typeof g?.closest=="function"?g.closest("[data-queue-index]"):null,se=V&&y.contains(V)?V.getAttribute("data-queue-index"):y.getAttribute("data-lane-length"),ye=Number(se);return{zone:y,target:{kind:"repo-serial",root_dir:W,lane_id:y.getAttribute("data-lane-id")||"",index:Number.isFinite(ye)?ye:0}}}return null}function j(){for(let p of Array.from(Te.querySelectorAll(".is-drop-over")))p.classList.remove("is-drop-over")}function me(p){let g=p.target,y=typeof g?.closest=="function"?g.closest('[draggable="true"][data-bead-id]'):null,$=y?y.closest("[data-drag-kind]"):null;if(!$)return;let W=$.getAttribute("data-bead-id")||"",V=$.getAttribute("data-drag-kind")||"",se=$.getAttribute("data-root-dir")||"";if(!W||!V||!se)return;let ye=$.getAttribute("data-queue-index")||"",et=Number(ye),ct=$.getAttribute("data-lane-id")||"";O={kind:V,bead_id:W,root_dir:se,...ye!==""&&Number.isFinite(et)?{queue_index:et}:{},...ct?{lane_id:ct}:{}},qe=!0,le=null,Te.classList.add("is-dragging");try{p.dataTransfer?.setData("text/plain",W),p.dataTransfer&&(p.dataTransfer.effectAllowed="move")}catch{}}function Le(p){let g=w(p);g&&(p.preventDefault(),p.dataTransfer&&(p.dataTransfer.dropEffect="move"),g.zone.classList.add("is-drop-over"))}function pt(p){let g=p.target;typeof g?.closest=="function"&&g.closest("[data-drop]")?.classList.remove("is-drop-over")}function ot(){O=null,j(),Te.classList.remove("is-dragging"),lt()}function Ve(p){let g=w(p),y=O;O=null,j(),Te.classList.remove("is-dragging"),!(!g||!y)&&(p.preventDefault(),jt(y,g.target))}function A(p){return{runner:p.runner||void 0,model:p.model||void 0,effort:p.effort||void 0,status:p.run_state==="running"?"running":p.run_state,worktree:p.root_dir}}function oe(p,g){let{item:y,root_dir:$,revision:W}=vt(g),V=y?.attempt_id||"",se=p.classList;if(se.contains("mon2-rowops__up")||se.contains("mon2-rowops__down")){nr(g,se.contains("mon2-rowops__up")?-1:1);return}if(se.contains("mon2-rowops__remove")){ue("worker-queue-remove",{bead_id:g},$,W);return}if(se.contains("mon2-crow__detach")){S(g);return}if(se.contains("mon-dep__btn")){en(g);return}if(se.contains("worker-dep__open")){en(g);return}if(se.contains("mon2-arm__release")){En(g,p.getAttribute("data-lane-id")||"");return}if(se.contains("mon-lane__chip")){let ye=p.getAttribute("data-lane-id")||"";Te.querySelector(`.mon2-clane[data-lane-id="${ye}"]`)?.scrollIntoView({block:"nearest"});return}if(se.contains("mon-deppanel__unlink")){let ye=p.getAttribute("data-dep-a")||"",et=p.getAttribute("data-dep-b")||"";_(`${et}\uAC00 ${ye}\uB97C \uB9C9\uB294 \uC5F0\uACB0\uC744 \uB04A\uC744\uAE4C\uC694?`)&&Qt("dep-remove",ye,et);return}if(se.contains("mon-deppanel__cand")){let ye=p.getAttribute("data-dep-cand")||"";N&&ye&&Qt("dep-add",N.bead_id,ye);return}if(se.contains("mon-overlap__chip")){let ye=p.getAttribute("data-overlap-id")||"";K=!!K&&K.bead_id===g&&K.counterpart_id===ye?null:{bead_id:g,counterpart_id:ye},v();return}if(se.contains("mon-overlap__place")){We(g,p.getAttribute("data-counterpart-id")||"");return}if(se.contains("worker-card__place")){le=le===g?null:g,v();return}if(se.contains("worker-card__place-cancel")){le=null,v();return}if(se.contains("worker-card__place-lane")){let ye=p.getAttribute("data-lane")||"parallel";le=null,kn(g,ye);return}if(se.contains("rtile__session")){if(y&&y.kind==="session"){let ye=(y.session_refs||[]).find(et=>et&&et.current===!0);ye&&(Ie.hidden=!1,Ye.open(Io(ye,g,"in_progress",$)),v());return}Y=V,V&&y&&(Ie.hidden=!1,Ye.open({attempt_id:V,root_dir:$,meta:A(y)})),v();return}if(se.contains("rtile__pause")){ft("worker-attempt-pause",{attempt_id:V},$);return}if(se.contains("rtile__resume")){Wr().then(ye=>{if(ye!==null)return gt("worker-attempt-resume",{attempt_id:V,...ye!==""?{instructions:ye}:{}},$,W)});return}if(se.contains("rtile__dismiss")){ue("worker-attempt-dismiss",{attempt_id:V},$,W);return}if(se.contains("rtile__discard")){if(!_(Ms(g,"unmerged")))return;xt({bead_id:g,...V?{attempt_id:V}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,W);return}if(se.contains("worker-mini__merge")){let ye=Ue($,g);ye?.mismatch&&ye.continuation===null?St($,g,W,ye.mismatch):ue("worker-merge-queue-add",{bead_id:g},$,W);return}if(se.contains("worker-mini__merge-cancel")){ue("worker-merge-queue-remove",{bead_id:g},$,W);return}if(se.contains("worker-mini__discard")){let ye=p.dataset.discardMode==="merged"?"merged":"unmerged";if(!_(Ms(g,ye)))return;xt({bead_id:g,...p.dataset.attemptId?{attempt_id:p.dataset.attemptId}:{},...p.dataset.operationId?{operation_id:p.dataset.operationId}:{}},$,W);return}if(se.contains("worker-mini__revise-fix")){gt("worker-revise-fix",{bead_id:g},$,W);return}se.contains("worker-mini__revise-approve")&&ue("worker-revise-approve",{bead_id:g},$,W)}function F(p){let g=qe;qe=!1;let y=p.target;if(!y||typeof y.closest!="function"||y.closest("dialog")||y.closest(".worker-drawer-overlay")||y.closest("a"))return;let $=y.closest(".worker-card__id, .worker-mini__id, .rtile__id");if($){p.preventDefault();let Fe=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||$.textContent?.trim()||"";Fe&&Rt(Fe);return}let W=y.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(W){p.preventDefault();let Tn=W.getAttribute("data-root-dir")||Ce.get(y.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||W.getAttribute("title")||"";be(Tn);return}let V=y.closest(".mon2-sec__toggle");if(V){p.preventDefault(),Oe(V.getAttribute("data-root-dir")||"");return}let se=y.closest(".mon2-area__toggle");if(se){p.preventDefault(),Qe(se.getAttribute("data-area")||"parallel");return}if(y.closest(".mon2-newlane")){p.preventDefault(),tn("create","");return}let ye=y.closest(".mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop");if(ye){p.preventDefault();let Tn=ye.getAttribute("data-lane-id")||"",Fe=ye.classList;tn(Fe.contains("mon2-clane__confirm")?"confirm":Fe.contains("mon2-clane__reapply")?"reapply":Fe.contains("mon2-clane__run")?"run":Fe.contains("mon2-clane__stop")?"stop":"remove",Tn);return}if(y.closest(".mon-merge-all")){p.preventDefault(),T();return}let et=y.closest(".mon-filter__spec");if(et){p.preventDefault(),k={...k,spec:et.getAttribute("data-spec")||"all"},Lp(k),v();return}let ct=y.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!ct)return;let nn=ct.getAttribute("data-bead-id")||"",Ot=y.closest("button");if(Ot){p.preventDefault(),oe(Ot,nn);return}nn&&!g&&(p.preventDefault(),Be(nn,ct.getAttribute("data-root-dir")||vt(nn).root_dir))}function Ee(p){let g=p.target;if(!g||typeof g.closest!="function")return;let y=g.closest(".mon-filter__blocked");if(y){k={...k,show_blocked:y.checked},Lp(k),v();return}let $=g.closest(".mon-candidate-sort");if($){D=Vs.some(se=>se.value===$.value)?$.value:"repo_spec",sy(D),v();return}let W=g.closest(".mon-running-sort");if(W){b=W.value==="repo"?"repo":"started",cy(b),v();return}let V=g.closest(".mon-done-range");V&&(h=Un(V.value),iy(h),v())}function rt(p){let g=p.target,y=g&&typeof g.closest=="function"?W=>g.closest(W):()=>null,$=!1;K&&!y(".mon-overlap__popover, .mon-overlap__chip")&&(K=null,$=!0),N&&!y(".mon-deppanel, .mon-dep__btn, .worker-dep__open")&&(N=null,$=!0),$&&v()}function ut(p){p.key!=="Escape"||!K&&!N||(K=null,N=null,v())}function $t(p){let g=p.target;!g||typeof g.closest!="function"||!g.closest(".mon-deppanel__search")||!N||(N={...N,query:g.value},v())}e.addEventListener("click",F),e.addEventListener("change",Ee),e.addEventListener("input",$t),document.addEventListener("click",rt),document.addEventListener("keydown",ut),e.addEventListener("dragstart",me),e.addEventListener("dragover",Le),e.addEventListener("dragleave",pt),e.addEventListener("drop",Ve),e.addEventListener("dragend",ot),s&&typeof s.subscribe=="function"&&(ne=s.subscribe(()=>{try{z.clear(),v()}catch{}}));function Je(){ge!==null&&(clearInterval(ge),ge=null)}function Ut(){ze!==null&&(clearTimeout(ze),ze=null)}return{load(){n("load"),v(),ge===null&&(ge=setInterval(()=>{try{v()}catch{}},uy))},pause(){Je()},clear(){Je(),Ut(),ne&&(ne(),ne=null),Ye.destroy(),Ie.hidden=!0,Se?.destroy(),Se=null,e.removeEventListener("click",F),e.removeEventListener("change",Ee),e.removeEventListener("input",$t),document.removeEventListener("click",rt),document.removeEventListener("keydown",ut),e.removeEventListener("dragstart",me),e.removeEventListener("dragover",Le),e.removeEventListener("dragleave",pt),e.removeEventListener("drop",Ve),e.removeEventListener("dragend",ot),e.replaceChildren()}}}function Up(e,t,n){let r=Gt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(h){return b=>{b.preventDefault();let k=h==="monitor"&&l()==="monitor"?"worker":h;r("click tab %s",k),n.gotoView(k)}}function l(){let h=t.getState();return h.view==="worker"||h.view==="monitor"?h.view:"board"}function u(){let h=l();return c`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${h==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let h=l();return c`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${h==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${h==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function _(){s&&at(u(),s),o&&at(d(),o)}return _(),a=t.subscribe(()=>_()),{destroy(){a&&(a(),a=null),s&&at(c``,s),o&&at(c``,o)}}}var Wp=["bug","feature","task","epic","chore"];function zp(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var Hp=["Critical","High","Medium","Low","Backlog"];function Gp(e,t){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,e.appendChild(n);let r=n.querySelector("#new-issue-form"),s=n.querySelector("#new-title"),o=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),i=n.querySelector("#new-labels"),l=n.querySelector("#new-description"),u=n.querySelector("#new-issue-error"),d=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),h=n.querySelector(".new-issue__close");function b(){o.replaceChildren();let M=document.createElement("option");M.value="",M.textContent="\u2014 Select \u2014",o.appendChild(M);for(let G of Wp){let L=document.createElement("option");L.value=G,L.textContent=zp(G),o.appendChild(L)}a.replaceChildren();for(let G=0;G<=4;G+=1){let L=document.createElement("option");L.value=String(G);let I=Hp[G]||"Medium";L.textContent=`${G} \u2013 ${I}`,a.appendChild(L)}}b();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function D(M){s.disabled=M,o.disabled=M,a.disabled=M,i.disabled=M,l.disabled=M,d.disabled=M,_.disabled=M,_.textContent=M?"Creating\u2026":"Create"}function B(){u.textContent=""}function Y(M){u.textContent=M}function le(){try{let M=window.localStorage.getItem("beads-ui.new.type");M?o.value=M:o.value="";let G=window.localStorage.getItem("beads-ui.new.priority");G&&/^\d$/.test(G)?a.value=G:a.value="2"}catch{o.value="",a.value="2"}}function K(){let M=o.value||"",G=a.value||"";M.length>0&&window.localStorage.setItem("beads-ui.new.type",M),G.length>0&&window.localStorage.setItem("beads-ui.new.priority",G)}async function N(){B();let M=String(s.value||"").trim();if(M.length===0){Y("Title is required"),s.focus();return}let G=Number(a.value||"2");if(!(G>=0&&G<=4)){Y("Priority must be 0..4"),a.focus();return}let L=String(o.value||""),I=String(l.value||""),te={title:M};L.length>0&&(te.type=L),String(G).length>0&&(te.priority=G),I.length>0&&(te.description=I),D(!0);try{await t("create-issue",te)}catch{D(!1),Y("Failed to create issue");return}K(),D(!1),k()}return n.addEventListener("cancel",M=>{M.preventDefault(),k()}),h.addEventListener("click",()=>k()),d.addEventListener("click",()=>k()),n.addEventListener("keydown",M=>{M.key==="Enter"&&(M.ctrlKey||M.metaKey)&&(M.preventDefault(),N())}),r.addEventListener("submit",M=>{M.preventDefault(),N()}),{open(){r.reset(),B(),le();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){k()}}}var fy=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function _y(e,t){return ri(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function Kp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?c`<div class="settings-dialog__empty">라벨 없음</div>`:c`<div class="settings-dialog__pills">
            ${t.map(r=>{let s=_y(r,e);return c`<button
                type="button"
                class=${`settings-dialog__pill settings-dialog__pill--${s}`}
                data-label=${r}
                data-state=${s}
                @click=${()=>n(r)}
              >
                ${r}
              </button>`})}
          </div>`}
    </section>
  `}function Vp(e,t,n){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(r=>c`<span class="settings-dialog__prefix">
              ${r}
              <button
                type="button"
                class="settings-dialog__prefix-remove"
                aria-label=${`${r} \uADDC\uCE59 \uC81C\uAC70`}
                @click=${()=>n.onRemove(r)}
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
          @input=${r=>n.onDraft(String(r.target.value||""))}
        />
        <button
          type="button"
          class="settings-dialog__btn"
          @click=${n.onAdd}
        >
          추가
        </button>
      </div>
    </section>
  `}function Yp(e,t){return c`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${fy.map(([n,r])=>c`<label class="settings-dialog__toggle">
              <input
                type="checkbox"
                data-chip=${n}
                .checked=${e.chips[n]!==!1}
                @change=${()=>t(n)}
              />
              <span>${r}</span>
            </label>`)}
      </div>
    </section>
  `}var my=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function Zp(e,t){let{transport:n,policyStore:r,labelOptions:s}=t,o=t.notify||(ae=>de(ae,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",l=!1,u="",d=null;function _(){if(d)return d;let ae=a.querySelector('[data-pane="execution"]');return ae?(d=wa(ae,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:n,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function h(){return c`
      <section
        class=${`settings-dialog__pane${i==="execution"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-execution"
        aria-label="실행 설정"
      >
        <header class="settings-dialog__pane-head"><h2>실행 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          세션 기본값과 Worker 오케스트레이션을 한곳에서 편집합니다. 저장소와
          저장 경로는 설정 그룹별로 유지됩니다.
        </p>
        <div class="settings-dialog__pane-body" data-pane="execution"></div>
      </section>
    `}function b(){let ae=r.get();return c`
      <section
        class=${`settings-dialog__pane${i==="display"?" settings-dialog__pane--active":""}`}
        role="tabpanel"
        id="settings-pane-display"
        aria-label="표시 설정"
      >
        <header class="settings-dialog__pane-head"><h2>표시 설정</h2></header>
        <p class="settings-dialog__pane-sub">
          이 워크스페이스의 라벨·칩 표시 정책입니다.
        </p>
        ${ae?c`
              ${Kp(ae,s(),Y)}
              ${Vp(ae,u,{onDraft:Te=>{u=Te},onAdd:le,onRemove:K})}
              ${Yp(ae,N)}
            `:c`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function k(ae){let Te=r.get();if(Te)try{let Ie=await n("display-policy-set",{expected_revision:Te.revision,policy:ae(Te)});D(Ie),Ie&&Ie.conflict&&Ie.policy&&(Ie=await n("display-policy-set",{expected_revision:Ie.policy.revision,policy:ae(Ie.policy)}),D(Ie)),Ie&&Ie.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function D(ae){ae&&ae.policy&&typeof ae.policy=="object"&&r.set(ae.policy)}function B(ae){k(ae)}function Y(ae){let Te=r.get();if(!Te)return;let Ie=!gy(ae,Te);B($e=>by(ae,$e,Ie))}function le(){let ae=u.trim();ae.length!==0&&(u="",B(Te=>Te.hidden_prefixes.includes(ae)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,ae]}),M())}function K(ae){B(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(Ie=>Ie!==ae)}))}function N(ae){let Te=r.get();if(!Te)return;let Ie=Te.chips[ae]===!1;B(()=>({chips:{[ae]:Ie}}))}function M(){at(c`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${my.map(ae=>c`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ae.id}
                  aria-selected=${String(i===ae.id)}
                  aria-controls=${`settings-pane-${ae.id}`}
                  @click=${()=>G(ae.id)}
                >
                  <span class="settings-dialog__glyph">${ae.glyph}</span>
                  ${ae.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${fe}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${h()} ${b()}
          </div>
        </div>
      `,a),_()}function G(ae){i=ae,M()}let L=()=>{l=!1,t.onOpenChange?.(!1)};a.addEventListener("close",L),a.addEventListener("cancel",L);let I=ae=>{ae.target===a&&fe()};a.addEventListener("click",I);let te=null;r.subscribe&&(te=r.subscribe(()=>{l&&M()}));let xe=null;t.implPresetStore?.subscribe&&(xe=t.implPresetStore.subscribe(()=>{l&&d?.render()}));function ke(ae="execution"){l||(l=!0,t.onOpenChange?.(!0),i=ae,u="",M(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),_()?.load())}function fe(){l&&(l=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:ke,close:fe,sessionDraft:()=>d?.sessionDraft()??{},destroy(){l=!1,a.removeEventListener("close",L),a.removeEventListener("cancel",L),a.removeEventListener("click",I),te&&(te(),te=null),xe&&(xe(),xe=null),d?.destroy(),d=null,a.remove()}}}function gy(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(n=>n.length>0&&e.startsWith(n))}function by(e,t,n){if(!n)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let r=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:r,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:r}}var hy=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],Qp="usage-meter-card",yy="usage-meter-layer",gl=600,vy=["token_expired","relogin_required"];function Xp(e){return String(e).padStart(2,"0")}function wy(e,t){let n=Math.max(0,Math.ceil((e-t)/6e4)),r=Math.floor(n/1440),s=Math.floor(n%1440/60),o=n%60;return r>0?`${r}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function Jp(e,t=Date.now()){let n=Date.parse(e);if(!Number.isFinite(n))return"";let r=new Date(n),s=new Date(t),o=`${Xp(r.getHours())}:${Xp(r.getMinutes())}`,i=r.getFullYear()===s.getFullYear()&&r.getMonth()===s.getMonth()&&r.getDate()===s.getDate()?o:`${hy[r.getMonth()]} ${r.getDate()} ${o}`;return`${wy(n,t)} \xB7 ${i}`}function ky(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function ef(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function tf(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var nf=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function sf(e){let t=[];for(let n of e){if(!n||typeof n!="object")continue;let r=n;typeof r.key!="string"||r.key.length===0||typeof r.pct!="number"||!Number.isFinite(r.pct)||t.push({key:r.key,pct:r.pct,resetsAt:typeof r.resetsAt=="string"?r.resetsAt:""})}return t}function $y(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:sf(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function xy(e,t){if(!e||typeof e!="object")return null;let n=e,r=[];if(Array.isArray(n.accounts))for(let o of n.accounts){let a=$y(o);a&&r.push(a)}let s=n.available===!0&&Array.isArray(n.windows);return!s&&r.length===0?null:{available:s,windows:s?sf(n.windows):[],ageSeconds:typeof n.ageSeconds=="number"&&Number.isFinite(n.ageSeconds)?n.ageSeconds:null,accounts:r,receivedAtMs:t,held:!1}}function Ay(e,t){if(!e||typeof e!="object")return{kind:"error"};let n=xy(e,t);return n?{kind:"ok",snapshot:n}:Array.isArray(e.accounts)?{kind:"empty"}:{kind:"error"}}function of(e,t){return(e.ageSeconds===null?0:e.ageSeconds)+Math.max(0,t-e.receivedAtMs)/1e3}function Sy(e,t){return!e.held||of(e,t)<=gl?e:{...e,available:!1,windows:[],accounts:[]}}function rf(e,t){return`${e}:${t}`}function af(e){let t=!1,n=null,r=new Map,s=null,o=new Map,a=new Map,i=0,l=null;function u(){at(c``,e),e.hidden=!0,_()}function d(){if(l===null){let $e=e.ownerDocument;l=$e.createElement("div"),l.id=yy,l.className="usage-meter__layer",$e.body.appendChild(l)}return l}function _(){l!==null&&(at(c``,l),l.remove(),l=null)}function h($e){n!==$e&&(n===null&&(document.addEventListener("mousedown",k),document.addEventListener("keydown",B),window.addEventListener("resize",D)),n=$e)}function b(){n!==null&&(n=null,document.removeEventListener("mousedown",k),document.removeEventListener("keydown",B),window.removeEventListener("resize",D))}function k($e){let ee=$e.target;ee&&(e.contains(ee)||l!==null&&l.contains(ee))||(b(),fe())}function D(){fe()}function B($e){$e.key==="Escape"&&(b(),fe())}function Y($e){n===$e?b():h($e),fe()}function le(){b(),fe()}async function K($e,ee){if(r.has($e.key))return;let Z=rf($e.key,ee);r.set($e.key,ee),a.delete(Z),fe();let Ce=null;try{Ce=await(await fetch($e.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ee})})).json()}catch{Ce=null}if(t)return;if(r.delete($e.key),!Ce||Ce.ok!==!0){let ne=Ce&&typeof Ce.error=="string"&&Ce.error.length>0?Ce.error:"network_error";a.set(Z,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${ne}`}),fe();return}let z=Array.isArray(Ce.warnings)?Ce.warnings.filter(ne=>typeof ne=="string"&&ne.length>0):[];z.length>0&&a.set(Z,{kind:"warn",text:z.join(" \xB7 ")}),fe(),await Ie()}function N($e,ee,Z,Ce){let z=tf($e.pct),ge=`resets ${Jp($e.resetsAt,Ce)}${ee?` \xB7 ${Z}`:""}`;return c`<span
      class="usage-meter__window ${ef(z)}"
      style=${`--progress: ${z}%`}
      title=${ge}
    >
      <span class="usage-meter__label">${$e.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${z}%</span>
    </span>`}function M($e,ee,Z){let Ce=of(ee,Z),z=ee.available&&(ee.held||Ce>gl),ne=z?`${Math.floor(Ce/60)}\uBD84 \uC804 \uCE21\uC815`:"",ge=ee.accounts.filter(Ue=>!Ue.active).length,Se=`usage-meter__group${z?" usage-meter__group--stale":""}`,Ye=c`<span class="usage-meter__provider"
        >${$e.label}</span
      >
      ${ee.available?ee.windows.map(Ue=>N(Ue,z,ne,Z)):c`<span class="usage-meter__empty">사용량 없음</span>`}
      ${ge>0?c`<span class="usage-meter__badge">+${ge}</span>`:""}`;if(ee.accounts.length===0)return c`<span
        class=${Se}
        aria-label=${`${$e.label} usage`}
        >${Ye}</span
      >`;let ue=n===$e.key;return c`<button
      type="button"
      class=${`usage-meter__toggle ${Se}`}
      aria-label=${`${$e.label} usage`}
      aria-expanded=${ue?"true":"false"}
      aria-controls=${Qp}
      @click=${()=>Y($e.key)}
    >
      ${Ye}
    </button>`}function G($e,ee){return c`<span class="usage-meter" aria-label="Usage">
      ${$e.map(Z=>M(Z.provider,Z.snapshot,ee))}
    </span>`}function L($e,ee){let Z=tf($e.pct),Ce=Jp($e.resetsAt,ee);return c`<span
      class="usage-meter__account-window ${ef(Z)}"
      style=${`--progress: ${Z}%`}
    >
      <span class="usage-meter__account-key">${$e.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Z}%</span>
      <span class="usage-meter__account-reset"
        >${Ce.length>0?`\u21BB ${Ce}`:""}</span
      >
    </span>`}function I($e,ee){return vy.includes(ee)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${$e.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function te($e,ee,Z){let Ce=ee.status==="ok",z=typeof ee.ageSeconds=="number"&&ee.ageSeconds>gl,ne=a.get(rf($e.key,ee.number)),ge=r.get($e.key),Se=ge!==void 0,Ye=ge===ee.number,ue=["usage-meter__account"];return ee.active&&ue.push("usage-meter__account--active"),Ce||ue.push("usage-meter__account--unavailable"),z&&ue.push("usage-meter__account--stale"),c`<div class=${ue.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ee.email}
          >${ee.alias===null?ee.email:ee.alias}</span
        >
        ${ee.plan===null?"":c`<span class="usage-meter__account-tag">${ee.plan}</span>`}
        ${ee.active?c`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ee.ageSeconds===null?"":c`<span class="usage-meter__account-age"
              >${ky(ee.ageSeconds)}</span
            >`}
        ${ee.active?"":c`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Se}
              @click=${()=>{K($e,ee.number)}}
            >
              ${Ye?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${Ce?c`<div class="usage-meter__account-windows">
            ${ee.windows.map(Ue=>L(Ue,Z))}
          </div>`:c`<div class="usage-meter__account-status">
            ${I($e,ee.status)}
          </div>`}
      ${ne===void 0?"":c`<div
            class="usage-meter__account-message usage-meter__account-message--${ne.kind}"
          >
            ${ne.text}
          </div>`}
    </div>`}function xe($e,ee,Z){let Ce=ee.accounts.filter(z=>z.active).length;return c`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${$e.label} · 활성 ${Ce} / 전체
        ${ee.accounts.length}
      </h2>
      ${ee.accounts.map(z=>te($e,z,Z))}
    </section>`}function ke($e,ee){return c`<div
      class="usage-meter__card"
      id=${Qp}
      role="dialog"
      aria-label=${`${$e.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${xe($e.provider,$e.snapshot,ee)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function fe(){let $e=Date.now(),ee=[];for(let Ce of nf){let z=o.get(Ce.key);z&&ee.push({provider:Ce,snapshot:Sy(z,$e)})}if(ee.length===0){b(),u();return}let Z=ee.find(Ce=>Ce.provider.key===n&&Ce.snapshot.accounts.length>0);Z||b(),at(G(ee,$e),e),e.hidden=!1,Z?ae(Z,$e):_()}function ae($e,ee){let Z=d(),Ce=e.getBoundingClientRect(),z=e.ownerDocument.documentElement.clientWidth;Z.style.setProperty("--usage-meter-anchor-top",`${Ce.bottom}px`),Z.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,z-Ce.right)}px`),at(c`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${le}
        ></div>
        ${ke($e,ee)}`,Z)}async function Te($e){try{let ee=await fetch($e.endpoint);return ee.ok?Ay(await ee.json(),Date.now()):{kind:"error"}}catch{return{kind:"error"}}}async function Ie(){i+=1;let $e=i,ee=await Promise.all(nf.map(async Z=>({provider:Z,read:await Te(Z)})));if(!(t||$e!==i)){for(let Z of ee){let Ce=Z.provider.key;if(Z.read.kind==="ok"){o.set(Ce,Z.read.snapshot);continue}if(Z.read.kind==="empty"){o.delete(Ce);continue}let z=o.get(Ce);z!==void 0&&!z.held&&o.set(Ce,{...z,held:!0})}fe()}}return u(),Ie(),s=setInterval(()=>{Ie()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),b(),u()}}}function lf(e){let t=e.attempts?Object.values(e.attempts):[],n=new Map;for(let s of t)s&&(s.kind??"implementation")==="implementation"&&n.set(s.bead_id,s.attempt_id);let r=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&r.set(s.bead_id,s.added_at);return s=>{let o=n.get(s.bead_id)!==s.attempt_id,a=r.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var Ey="worker-ineligible";function Ys(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function cf(e){return Ys(e).includes(Ey)}var Ty="session-preferred",Cy=["exclusive_machine"];function uf(e,t){if(!Ys(e).includes(Ty)||typeof t!="object"||t===null)return"";let n=t.session_preferred_reason;return typeof n=="string"&&Cy.includes(n)?n:""}var Ry="worker-serial";function bl(e){return Ys(e).includes(Ry)}function hl(e,t,n){if(typeof t!="string"||typeof n!="string")return[];let r=e?.runners;if(!r||!Object.hasOwn(r,t))return[];let s=r[t],o=s?.models;if(!o||!Object.hasOwn(o,n))return[];let a=o[n]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var Oy=new Set(["done","failed","orphaned","stopped","discarded"]),Ly={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},Iy={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},Py={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function yl(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:Py[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function df(e,t){let{queueStore:n,analysisStore:r,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let l=new Map,u=new Map,d=!1,_=null,h=null,b=null,k=new Set,D=!1,B=0,Y=null,le=new Set;function K(){return n&&n.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function N(){return r&&r.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function M(){return o&&o()||""}async function G(){if(!s)return;let x=++B;D=!0,b=null,k.clear(),Xe();try{let R=await s("worker-parallel-analysis-targets",{root_dir:M()});if(x!==B||!De)return;let X=Array.isArray(R?.qualified)?R.qualified:[],_e=Array.isArray(R?.excluded)?R.excluded:[];b={qualified:X,excluded:_e};for(let Ae of X)Ae&&typeof Ae.id=="string"&&k.add(Ae.id)}catch{x===B&&De&&(b={qualified:[],excluded:[]},de("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{x===B&&(D=!1,De&&Xe())}}function L(x){return Array.isArray(x.runs)?x.runs:[]}function I(){let x=K(),R=new Set;for(let X of Object.values(x.attempts||{})){let _e=X;_e&&typeof _e.bead_id=="string"&&!Oy.has(_e.status)&&R.add(_e.bead_id)}for(let X of Array.isArray(x.pr_wait)?x.pr_wait:[])X&&typeof X.bead_id=="string"&&R.add(X.bead_id);for(let X of Object.values(x.discard_operations||{})){let _e=X;_e&&_e.phase!=="done"&&typeof _e.bead_id=="string"&&R.add(_e.bead_id)}return R}function te(x){return x.filter(R=>xe(R)===null)}function xe(x){let R=K();for(let X of Array.isArray(R.serial_lanes)?R.serial_lanes:[])if(Array.isArray(X?.entries)&&X.entries.some(_e=>_e.bead_id===x))return X.id;return(Array.isArray(R.queue)?R.queue:[]).some(X=>X.bead_id===x)?"parallel":null}function ke(x,R){let X=l.get(x);return X||[...R.order]}function fe(x){if(x.length<2)return!1;let R=xe(x[0]);if(!R||R==="parallel")return!1;let X=K(),_e=(Array.isArray(X.serial_lanes)?X.serial_lanes:[]).find(v=>v.id===R)?.entries.map(v=>v.bead_id);if(!Array.isArray(_e))return!1;let Ae=x.map(v=>_e.indexOf(v));return Ae.every(v=>v>=0)&&Ae.every((v,U)=>U===0||v>Ae[U-1])}function ae(){let x=K(),R=Array.isArray(x.serial_lanes)?x.serial_lanes:[],X=R.find(_e=>Array.isArray(_e.entries)&&_e.entries.length===0);return X?X.id:R[0]?.id||"s1"}function Te(x){let R=K().bead_titles||{};return typeof R[x]=="string"?R[x]:x}async function Ie(x,R){if(!s||d)return null;d=!0,Xe();try{return await s(x,R)}finally{d=!1,Xe()}}async function $e(x){r?.setPending?.(!0);try{let R=await Ie("worker-parallel-analysis-start",{force:x,target_ids:Array.from(k)});R&&R.applied===!1&&R.reason&&(R.reason==="target_not_qualified"&&Array.isArray(R.detail)?de(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${R.detail.join(", ")}`,"error",3200):de(`\uBD84\uC11D \uC2E4\uD328: ${R.reason}`,"error",2800))}finally{r?.setPending?.(!1)}}async function ee(){let x=N().job;!s||!x||await s("worker-parallel-analysis-cancel",{job_id:x.job_id})}async function Z(x){if(!(!s||le.has(x))){le.add(x),Xe();try{let R=await s("worker-parallel-analysis-prompt",{root_dir:M(),run_id:x});if(!De)return;if(R?.ok===!0&&typeof R.prompt=="string"){Y={run_id:x,prompt:R.prompt};return}de(R?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{le.delete(x),Xe()}}}function Ce(){Y=null,Xe()}async function z(){if(!Y)return;let x=await xn(Y.prompt);de(x?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",x?"success":"error",1400)}function ne(x,R){a&&a(x,yl(R))}function ge(){return K().runner_catalog}function Se(x){return Object.keys(ge()?.runners?.[x]?.models||{})}function Ye(x){let R=Se(x),X=ge()?.runners?.[x]?.default_model;return typeof X=="string"&&R.includes(X)?X:R[0]||""}function ue(){let x=N().settings,R=_||x.runner||"claude",X=Se(R),_e=_?Ye(R):x.model||X[0]||"",Ae=hl(ge(),R,_e),v=x.effort||"",U=Ae.includes(v)?v:Ae[0]||"";return{runner:R,model:_e,effort:U,models:X,efforts:Ae}}async function Ue(x){let R=N().settings,X=await Ie("worker-parallel-analysis-settings-update",{expected_revision:R.revision,runner:x.runner,model:x.model,effort:x.effort});(!X||X.applied!==!0)&&(_=null,Xe(),X&&X.reason&&de(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${X.reason}`,"error",2800))}function gt(x){_=x,Xe();let R=ue();Ue({runner:x,model:R.model,effort:R.effort})}function St(x){let R=ue(),X=hl(ge(),R.runner,x);Ue({runner:R.runner,model:x,effort:X.includes(R.effort)?R.effort:X[0]||""})}function xt(x){let R=ue();Ue({runner:R.runner,model:R.model,effort:x})}async function ft(x,R){if(!s||d)return;let X=ke(x,R),_e=N();if(X.length<2||!_e.last_good){de("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let Ae=u.get(x)||ae(),v=()=>({snapshot_digest:_e.last_good.identity_digest,group_index:x,lane:Ae,ordered_bead_ids:X,expected_revision:K().revision});d=!0,Xe();try{let U=await s("worker-parallel-analysis-submit",v());U&&U.queue&&n&&n.set(U.queue),U&&U.applied!==!0&&U.conflict===!0&&(U=await s("worker-parallel-analysis-submit",v()),U&&U.queue&&n&&n.set(U.queue)),U&&U.applied===!0?(l.delete(x),de(`\uC9C1\uB82C \uB808\uC778 ${Ae}\uC5D0 ${X.length}\uAC1C \uBC30\uCE58`,"success")):de(`\uC81C\uCD9C \uAC70\uBD80: ${U?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,Xe()}}function T(x,R,X){l.set(x,ke(x,R).filter(_e=>_e!==X)),Xe()}function ce(x){l.delete(x),Xe()}function Oe(x,R,X,_e){let Ae=[...ke(x,R)],v=Ae.indexOf(X),U=v+_e;v<0||U<0||U>=Ae.length||(Ae.splice(U,0,...Ae.splice(v,1)),l.set(x,Ae),Xe())}function Me(){let x=N().settings,R=Object.keys(ge()?.runners||{}),X=ue();return c`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${_e=>gt(_e.target.value)}
        >
          ${R.map(_e=>c`<option
                value=${_e}
                ?selected=${X.runner===_e}
              >
                ${_e}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${_e=>St(_e.target.value)}
        >
          ${X.models.map(_e=>c`<option
                value=${_e}
                ?selected=${X.model===_e}
              >
                ${_e}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${_e=>xt(_e.target.value)}
        >
          ${X.efforts.map(_e=>c`<option
                value=${_e}
                ?selected=${X.effort===_e}
              >
                ${_e}
              </option>`)}
        </select>
      </label>
      ${Qe(x)}
    </div>`}function Qe(x){return!bt(x)||st(x)?c`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:x.compatible===!1?c`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${x.runner}/${x.model} · effort
        ${x.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:x.is_default===!0?c`<span class="pa-settings__default">기본값</span>`:""}function st(x){return x.is_default===!0&&x.compatible===!1}function bt(x){return!!(x.runner&&x.model&&x.effort)}function yt(x){return bt(x)&&x.compatible!==!1}function re(x){let R=Math.max(0,Math.floor(x/1e3)),X=Math.floor(R/60),_e=R%60;return`${X}:${String(_e).padStart(2,"0")}`}function Q(x){let R=x.job;if(R){let X=typeof R.started_at=="number"?R.started_at:0,_e=`${R.runner||"?"}/${R.model||"?"}`,Ae=X?` \xB7 \uACBD\uACFC ${re(Date.now()-X)}`:"",v=typeof R.session_id=="string"?R.session_id:"",U=L(x).find(ie=>ie.run_id===R.job_id);return c`<span class="pa-meta__progress">
        <span
          >분석 중 — ${_e} · effort ${R.effort||"?"}${Ae}</span
        >
        ${v?c`<code class="pa-session-id" title=${v}
              >${v.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>ne(R.job_id,U||R)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${U?.prompt_saved!==!0||le.has(R.job_id)}
          @click=${()=>{Z(R.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return it()?c`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function je(x){let R=Q(x);return R===""?"":c`<div class="pa__strip">${R}</div>`}function it(){return r?.isPending?.()===!0}function We(x){let R=!!x.job,X=yt(x.settings),_e=b!==null&&k.size===0,Ae=R||d||it()||D;return c`<div class="pa-meta">
      ${x.last_good?c`<span class="pa-meta__at"
            >분석 ${new Date(x.last_good.at||0).toLocaleString()}</span
          >`:c`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!X||Ae||_e}
        @click=${()=>{$e(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!X||Ae||_e}
        @click=${()=>{$e(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!R}
        @click=${()=>{ee()}}
      >
        취소
      </button>
    </div>`}function we(x){return typeof x=="string"&&x.length>0?x:"\uBBF8\uBC30\uCE58"}function Ge(x,R){R?k.add(x):k.delete(x),Xe()}function dt(x){let R=Array.isArray(x.scope)?x.scope:[],X=Array.isArray(x.overlaps)?x.overlaps:[];return R.length===0&&X.length===0?c``:c`<span class="pa-target__signals">
      ${R.length>0?c`<details class="pa-target__scope" title=${R.join(`
`)}>
            <summary>scope ${R.length}</summary>
            <ul>
              ${R.map(_e=>c`<li><code>${_e}</code></li>`)}
            </ul>
          </details>`:""}
      ${X.length>0?c`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${X.join(", ")}`}
            >겹침 ${X.join(", ")}</span
          >`:""}
    </span>`}function _t(){let x=b?.qualified||[],R=b?.excluded||[];return c`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${D?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${x.length} \xB7 \uC81C\uC678 ${R.length}`}</span
        >
      </header>
      ${b&&x.length>0?c`<ul class="pa-targets__list">
            ${x.map(X=>c`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${X.id}
                      .checked=${k.has(X.id)}
                      @change=${_e=>Ge(X.id,_e.target.checked)}
                    />
                    <span class="pa-target__title">${X.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${dt(X)}
                    <span class="pa-target__route">${X.route}</span>
                    <span class="pa-target__lane"
                      >${we(X.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:b&&x.length===0?c`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${b&&R.length>0?c`<details class="pa-targets__excluded">
            <summary>제외 대상 ${R.length}</summary>
            <ul class="pa-targets__list">
              ${R.map(X=>c`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${X.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${Ly[X.reason]||X.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${we(X.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function mt(x){let R=typeof x.session_id=="string"&&x.session_id.length>0,X=R?x.session_id:"";return c`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${x.outcome}"
        >${Iy[x.outcome]||x.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(x.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${x.runner||"?"} / ${x.model||"?"} / ${x.effort||"?"}</span
      >
      ${R?c`<code class="pa-session-id" title=${X}
            >${X.slice(0,8)}</code
          >`:c`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${x.outcome==="failure"&&x.reason?c`<span class="pa-run-row__reason">${x.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>ne(x.run_id,x)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${x.prompt_saved!==!0||le.has(x.run_id)}
          @click=${()=>{Z(x.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function Pt(x){return c`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${x.length>0?c`<ul class="pa-runs__list">
            ${x.map(R=>mt(R))}
          </ul>`:c`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function Kt(){return Y?c`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${Ce}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${Y.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{z()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${Ce}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${Y.prompt}</pre
        >
      </section>
    </div>`:""}function Ht(x,R){let X=ke(x,R),_e=I(),Ae=X.filter(be=>_e.has(be)),v=te(X),U=fe(X),ie=Array.isArray(K().serial_lanes)?K().serial_lanes:[],Ke=u.get(x)||ae(),Be=R.eligible!==!0||X.length<2||Ae.length>0||v.length>0||U||d;return c`<section class="pa-group" data-group-index=${String(x)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${R.confidence}</span>
        ${R.categories.map(be=>c`<span class="pa-group__category">${be}</span>`)}
        ${U?c`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${R.eligible===!0?"":c`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${v.length>0?c`<span class="pa-group__stale"
              >stale — ${v.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${R.reason}</p>
      <ol class="pa-group__members">
        ${X.map((be,Rt)=>c`<li class="pa-member" data-bead-id=${be}>
              <span class="pa-member__seq">${Rt+1}</span>
              <span class="pa-member__title">${Te(be)}</span>
              ${_e.has(be)?c`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${be}
                ?disabled=${Rt===0}
                aria-label=${`${be} \uC704\uB85C`}
                @click=${()=>Oe(x,R,be,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${be}
                ?disabled=${Rt===X.length-1}
                aria-label=${`${be} \uC544\uB798\uB85C`}
                @click=${()=>Oe(x,R,be,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${be}
                aria-label=${`${be} \uC81C\uC678`}
                @click=${()=>T(x,R,be)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${R.evidence.map(be=>c`<li class="pa-evidence">
              <code>${be.path}</code>
              <span class="pa-evidence__locator">${be.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>ce(x)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${be=>{u.set(x,be.target.value),Xe()}}
          >
            ${ie.map((be,Rt)=>c`<option
                  value=${be.id}
                  ?selected=${Ke===be.id}
                >
                  직렬 ${Rt+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${Be}
          @click=${()=>{ft(x,R)}}
        >
          제출
        </button>
      </footer>
    </section>`}function Ct(x){let R=Array.isArray(x.issues)?x.issues:[],X=R.filter(Ae=>Ae.verdict==="parallel_ok").length,_e=R.filter(Ae=>Ae.verdict==="uncertain").length;return c`<div class="pa-summary">
      <span>parallel_ok ${X}</span>
      <span>uncertain ${_e}</span>
    </div>`}function Lt(){let x=De&&!!N().job;if(x&&h===null){h=setInterval(()=>Xe(),1e3);return}!x&&h!==null&&(clearInterval(h),h=null)}function Xe(){let x=N();_&&x.settings.runner===_&&(_=null);let R=x.last_good?.result;Lt(),at(c`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${Re}
            >
              ×
            </button>
          </header>
          ${je(x)}
          <div class="pa__body">
            ${Me()} ${We(x)} ${_t()}
            ${R?c`${R.groups.map((X,_e)=>Ht(_e,X))}
                ${R.groups.length===0?c`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${Ct(R)}`:c`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${Pt(L(x))}
          </div>
        </div>
        ${Kt()}
      `,i)}let De=!1,P=()=>{De=!1,Y=null,B+=1,Lt()},J=x=>{x.target===x.currentTarget&&Re()};i.addEventListener("close",P),i.addEventListener("cancel",P),i.addEventListener("click",J);let ve=null;n&&n.subscribe&&(ve=n.subscribe(()=>{De&&Xe()}));let E=null;r&&r.subscribe&&(E=r.subscribe(()=>{De&&Xe()}));function H(){De||(De=!0,Xe(),G(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function Re(){De&&(De=!1,Y=null,B+=1,Lt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:H,close:Re,destroy(){De=!1,h!==null&&(clearInterval(h),h=null),i.removeEventListener("close",P),i.removeEventListener("cancel",P),i.removeEventListener("click",J),ve&&(ve(),ve=null),E&&(E(),E=null),i.remove()}}}var pf=new Set(["sh","bash","zsh","dash","ksh"]),ff=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function _f(e){let t=e.split("/");return t[t.length-1]||""}function My(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let n=t.slice(2).trim().split(/\s+/).filter(Boolean);if(n.length===0)return!1;let r=_f(n[0]);if(r!=="env")return pf.has(r);let s=n.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&pf.has(_f(s))}function Dy(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function Ny(e){let t=[],n=0;ff.lastIndex=0;for(let r of e.matchAll(ff)){let s=r.index;s>n&&t.push({text:e.slice(n,s),kind:"plain"}),t.push({text:r[0],kind:Dy(r[0])}),n=s+r[0].length}return n<e.length&&t.push({text:e.slice(n),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function qy(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function mf(e){let t=e.getWorkspacePath,n=e.fetchImpl||globalThis.fetch?.bind(globalThis),r=document.createElement("div");r.className="repo-ops-script-viewer-root",document.body.appendChild(r);let s=null,o="loading",a="",i="",l=0,u=null,d=!1;function _(M,G){return G?Ny(M).map(L=>L.kind==="plain"?L.text:c`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${L.kind}"
            >${L.text}</span
          >`):M}function h(){if(!s)return c``;let M=o==="ready"&&My(a),G=o==="ready"?a.split(`
`):[];return c`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>K()}
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
              @click=${()=>K()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?c`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?c`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:c`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${G.map((L,I)=>c`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${I+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${_(L,M)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function b(){at(h(),r)}async function k(){if(o!=="ready")return;let M=await xn(a);de(M?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",M?"success":"error")}function D(M){M.key==="Escape"&&s&&(M.preventDefault(),K())}function B(){d||(document.addEventListener("keydown",D),d=!0)}function Y(){d&&(document.removeEventListener("keydown",D),d=!1)}async function le(M,G=null){let L=++l;B(),s={...M},u=G||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",b(),r.querySelector(".repo-ops-script-viewer__close")?.focus();let te=t?t():"";if(!te){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",b();return}if(!n){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",b();return}let xe="/api/repo-ops-script?workspace="+encodeURIComponent(te)+"&lane="+encodeURIComponent(M.lane)+"&base_sha="+encodeURIComponent(M.base_sha);try{let ke=await n(xe),fe=await ke.json().catch(()=>({}));if(L!==l)return;if((t?t():"")!==te){K();return}if(!ke.ok||!fe||fe.ok!==!0){o="error",i=qy(fe&&typeof fe.error=="string"?fe.error:""),b();return}s={lane:fe.lane,base_sha:fe.base_sha,path:fe.path,base_ref:fe.base_ref},a=String(fe.content),o="ready",b()}catch{if(L!==l)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",b()}}function K(){l+=1,Y(),s=null,a="",b();let M=u;u=null,M?.isConnected&&M.focus()}function N(){K(),r.remove()}return{open:le,close:K,destroy:N}}function gf(e){let t=e.queueStore,n=e.transport,r=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let L=o();return typeof L.revision=="number"?L.revision:0}function i(L){t&&L&&L.queue&&typeof L.queue=="object"&&t.set(L.queue)}function l(){let L=o().workspace_info;return L&&typeof L=="object"?L:{}}function u(L,I){return c`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${L}"
      >${I}</span
    >`}function d(L){if(typeof L!="number"||!Number.isFinite(L))return"";let I=L/6e4;return Number.isInteger(I)?`timeout ${I}\uBD84`:`timeout ${Math.round(L/1e3)}\uCD08`}function _(L){let I=d(L);return I?u("config",I):""}function h(L,I,te){return c`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${te.script}
      @click=${xe=>{s&&s({lane:L,base_sha:I.base_sha,path:te.script,base_ref:I.base_ref},xe.currentTarget)}}
    ></button>`}function b(){let L=o().repo_ops_opt_out;return{verify:L?.verify===!0,deploy:L?.deploy===!0}}function k(L,I){return c`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!I}
        @change=${te=>{le(L,!te.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function D(L){let I=typeof L.base_sha=="string"?L.base_sha:"",te=`${L.source_path||"repo-ops/config.toml"} @ ${L.base_ref||"?"}${I?`@${I.slice(0,7)}`:""}`,xe=b(),ke=!!L.verify&&xe.verify,fe=!!L.deploy&&xe.deploy;return c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${te}</span>
      </p>
      <div
        class="worker-repo-ops__lane${ke?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${L.verify?c`${h("verify",L,L.verify)}
              ${_(L.verify.timeout_ms)}
              ${ke?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${ke?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":L.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${L.verify?k("verify",xe.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${fe?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${L.deploy?c`${h("deploy",L,L.deploy)}
              ${_(L.deploy.timeout_ms)}
              ${fe?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:c`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${fe?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":L.deploy?c`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${L.deploy?k("deploy",xe.deploy):""}
      </div>
    </section>`}function B(L){let I=L.repo_ops&&typeof L.repo_ops=="object"?L.repo_ops:null;return I&&(I.status==="resolved"||I.status==="absent")?D(I):I&&(I.status==="pending"||I.status==="error")?c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${I.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":c`선언 읽기
              실패${I.error_code?c` — <code>${I.error_code}</code>`:""}`}
        </div>
      </section>`:c`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function Y(L){if(!n)return;let I=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});if(i(I),I&&I.conflict){let te=await n("worker-auto-repair-toggle",{on:L,expected_revision:a()});i(te)}r()}async function le(L,I){if(!n)return;let te=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});if(i(te),te&&te.conflict){let xe=await n("worker-repo-ops-opt-out-toggle",{kind:L,opted_out:I,expected_revision:a()});i(xe)}r()}let K={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function N(L,I,te){return c`<div class="worker-repo-ops__policy-group" data-policy=${te}>
      <div class="worker-repo-ops__policy-label">${L}</div>
      <ul class="worker-repo-ops__policy-list">
        ${I.map(xe=>c`<li data-token=${xe}>
              ${K[xe]||xe}
            </li>`)}
      </ul>
    </div>`}function M(L){return c`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${L.map(I=>{let te=[K[I.trigger]||I.trigger];return Number.isInteger(I.attempts_per_operation_attempt)?te.push(`operation\uB2F9 ${I.attempts_per_operation_attempt}\uD68C`):Number.isInteger(I.attempts)?te.push(`${K[I.budget]||I.budget} ${I.attempts}\uD68C`):Number.isInteger(I.sessions_per_user_action)&&te.push(`${I.sessions_per_user_action}\uD68C`,K[I.user_actions]||I.user_actions),I.applies_when&&te.push(K[I.applies_when]||I.applies_when),c`<li data-token=${I.id}>
            <strong>${K[I.id]||I.id}</strong>
            <span>${te.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function G(){let L=o(),I=L.auto_repair!==!1,te=L.repo_operation_policy&&typeof L.repo_operation_policy=="object"?L.repo_operation_policy:null,xe=Array.isArray(L.repo_operations)?L.repo_operations:[],ke=xe.find(Ie=>Ie.state==="repairing"),fe=xe.filter(Ie=>Ie.state==="failed"||Ie.state==="repairing"),ae=fe.length?Math.min(...fe.map(Ie=>typeof Ie.repair?.remaining=="number"?Ie.repair.remaining:0)):te?.auto_repair?.resolution_ladder?.find(Ie=>Ie.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(te?.auto_repair?.resolution_ladder)?te.auto_repair.resolution_ladder:[];return c`<section
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
          .checked=${I}
          @change=${Ie=>{Y(Ie.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${I?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ae}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${ke?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${ke.repair?.owner_bead||ke.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${te?c`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(te.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(te.never_automatic||[]).length}</span
              >
            </summary>
            ${N("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",te.worker_automatic||[],"worker-automatic")}
            ${te.supported===!1||te.schema_version!==2?c`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${te.schema_version})`}
                </div>`:M(Te)}
            ${N("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",te.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return c`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${B(l())} ${G()}
      </details>`}}}var vf=20,Fy=5,jy=new Set(["failed","repairing","running","queued","retry_pending"]),bf={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},hf={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function By(e,t,n=vf){let r=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||r.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||r.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return r.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),r.slice(0,Math.max(0,n))}function Uy(e){if(e.type==="cleanup")return!0;let t=e.operation;return jy.has(t.state)&&!t.dismissed&&!t.superseded_by}function Wy(e,t,n={}){let r=By(e,t,1/0),s=n.expanded===!0?vf:Fy,o=new Set(r.slice(0,s)),a=r.filter(i=>o.has(i)||Uy(i));return{visible:a,hidden:r.length-a.length}}function yf(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function zy(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function wf(e){let t=e.filter(n=>n.value);return t.length===0?"":c`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(n=>c`<div>
            <dt>${n.term}</dt>
            <dd>${n.value}</dd>
          </div>`)}
    </dl>
  </details>`}function kf(e,t="",n=!1){return!e&&!t?"":c`<p
    class="worker-ev__explain${n?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?c`<br />${t}`:""}
  </p>`}function Hy(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},n=typeof t.remaining=="number"?t.remaining:0,r=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=n<=0;return c`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(hf,r)?hf[r]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${n}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":c`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Gy(e){let t=e.operation,n=t.state==="failed",r=t.failure?t.failure.code:"";return c`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${da(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${yf(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(bf,t.kind)?bf[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${la(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${Ps(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${yf(e)}"
          >${zy(e)}</span
        >
        ${t.dismissed?c`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?c`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${n?kf(Ud(t.failure_kind,r)):""}
      ${Hy(t)}
      ${wf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:n?r:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${la(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ky(e){let t=e.cleanup,n=Tr(t.step);return c`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?cn(e.at):""}
      >${da(e.at)||"\u2014"}</span
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
        ${bp(t.step).map(r=>c`<li
              class="worker-step worker-step--${r.state}"
              data-step=${r.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${r.label}</span>
            </li>`)}
      </ol>
      ${kf(ya(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${n?` \u2014 ${n} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?c`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${wf([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Vy(e){let t=typeof e.hidden=="number"?e.hidden:0,n=e.expanded===!0;return c`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?c`<div class="worker-repo-drawer__empty">기록 없음</div>`:c`<ul class="worker-rail">
          ${e.events.map(r=>r.type==="cleanup"?Ky(r):Gy(r))}
        </ul>`}
    ${t>0||n?c`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${n?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function $f(e,t={}){let n=null;function r(){if(n===null){at(c``,e);return}let a=Wy(n.operations,n.cleanup_failures,{expanded:n.expanded});at(Vy({events:a.visible,hidden:a.hidden,expanded:n.expanded,repo:n.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&n&&(n.expanded=!n.expanded,r())});function s(a){n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},r()}function o(){n!==null&&(n=null,r(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>n!==null,refresh(a){n&&(n={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:n.expanded},r())}}}var Yy=Gt("views:worker"),Zy="tab:worker:ready",Qy="tab:worker:blocked",Xy="tab:worker:in-progress",Jy="tab:worker:resolved",ev="tab:worker:closed",Ra=1,xf=5;function Af(e){return Ss(e).evidence==="published"}var tv=new Set(["quick_fix","spec_backed","full_plan"]);function Sf(e){return typeof e=="string"&&tv.has(e)}var Rf="beads-ui.worker.candidate-filter",vl={show_blocked:!1,spec:"all"};function nv(){try{let e=window.localStorage.getItem(Rf);if(!e)return{...vl};let t=JSON.parse(e);if(!t||typeof t!="object")return{...vl};let n=t.spec;return{show_blocked:t.show_blocked===!0,spec:n==="with"||n==="without"?n:"all"}}catch{return{...vl}}}function rv(e){try{window.localStorage.setItem(Rf,JSON.stringify(e))}catch{}}function sv(e,t){let n=i=>t.show_blocked||!i.blocked,r=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let l=n(i),u=r(i);l&&u?s.push(i):!l&&u?o+=1:l&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var ov=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Of="bdui.worker.candidate_sort",Lf=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"},{value:"updated",label:"\uCD5C\uC2E0 \uC218\uC815\uC21C"}],kl="spec";function If(e){return Lf.some(t=>t.value===e)?e:kl}function av(){try{return If(window.localStorage.getItem(Of))}catch{return kl}}function iv(e){try{window.localStorage.setItem(Of,e)}catch{}}var Pf="bdui.worker.done-range";function lv(){try{let e=window.localStorage.getItem(Pf);return e===null?"today":Un(e)}catch{return"today"}}function cv(e){try{window.localStorage.setItem(Pf,e)}catch{}}var uv="(max-width: 640px)",Mf="beads-ui.worker.lane-collapsed",Zs={queue:!0,done:!0};function dv(){try{let e=window.localStorage.getItem(Mf);if(!e)return{...Zs};let t=JSON.parse(e);return!t||typeof t!="object"?{...Zs}:{queue:typeof t.queue=="boolean"?t.queue:Zs.queue,done:typeof t.done=="boolean"?t.done:Zs.done}}catch{return{...Zs}}}function pv(e){try{window.localStorage.setItem(Mf,JSON.stringify(e))}catch{}}function Ef(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let n=typeof t.title=="string"?t.title:t.id||"";return n.length>22?`${n.slice(0,22)}\u2026`:n}function fv(e,t,n){let r=Array.isArray(e)?e.slice():[];return t==="created"?r.sort(wr):t==="updated"?r.sort(bo):(r.sort(ho(n)),t==="board"?r:[...r.filter(Af),...r.filter(s=>!Af(s))])}function _v(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function mv(e){let t=e?.blocked_info;return t&&typeof t=="object"?Array.isArray(t.blockers)?t.blockers.filter(r=>typeof r=="string"&&r.length>0):[]:(Array.isArray(e?.dependencies)?e.dependencies:[]).map(r=>{if(typeof r=="string")return r;if(!r||typeof r!="object")return"";let s=r.type??r.dependency_type;return s!==void 0&&s!=="blocks"?"":r.depends_on_id||r.id||""}).filter(Boolean)}var gv="\u{1F512} blocked";function Tf(e){if(e.startsWith("receipt_unbacked:"))return`\uC2E4\uD589 \uC601\uC218\uC99D \uC790\uB3D9 \uAC80\uC99D \uBD88\uAC00(${e.slice(17)}) \u2014 [\uBA38\uC9C0] \uD074\uB9AD\uC73C\uB85C \uC218\uB3D9 \uC9C4\uD589 \uAC00\uB2A5`;switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function bv(e){let t=typeof e=="string"?e:"";return t==="review_failed"||t==="review_verdict_malformed"?{label:"\uB9AC\uBDF0\uC5B4 \uAC70\uBD80",action:"\uB9AC\uBDF0\uC5B4\uAC00 \uC2B9\uC778\uD558\uC9C0 \uC54A\uC558\uAC70\uB098 \uD310\uC815\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uCF54\uB4DC\uB97C \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t==="reviewer_selection_invalid"?{label:"\uB9AC\uBDF0\uC5B4 \uC124\uC815 \uC624\uB958",action:"\uB9AC\uBDF0\uC5B4 \uC120\uD0DD(Bead\xB7\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\xB7harness)\uC774 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4 \u2014 \uC124\uC815\uC744 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.startsWith("repair_")?{label:"\uC218\uB9AC \uC2E4\uD328",action:"REVISE \uB4A4 1\uD68C \uC790\uB3D9 \uC218\uB9AC\uAC00 \uC2E4\uD328\uD588\uAC70\uB098 \uC608\uC0B0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uACE0\uCE5C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:t.endsWith("_drift")||t.endsWith("_mismatch")||t==="head_drift_during_receipt"||t==="resolver_self_review_not_approved"?{label:"head \uBD88\uC77C\uCE58",action:"\uB9AC\uBDF0\uD55C head\uC640 \uD604\uC7AC head\uAC00 \uB2E4\uB985\uB2C8\uB2E4 \u2014 \uB204\uAC00 \uBE0C\uB79C\uCE58\uB97C \uBC14\uAFE8\uB294\uC9C0 \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}:{label:"\uC9C4\uD589 \uBD88\uAC00",action:"\uB9AC\uBDF0 \uC9C4\uD589\uC744 \uC774\uC5B4\uAC08 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uC0AC\uC720\uB97C \uD655\uC778\uD55C \uB4A4 \uB2E4\uC2DC [\uBA38\uC9C0]"}}function hv(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function yv(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let n=e.slice(19);if(n.length===0)return null;switch(n){case"gating":{let r=t?.repair_sessions_used;return typeof r=="number"&&r>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function vv(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function wv(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"\uBA38\uC9C0 \uC804 \uD655\uC778 \uC911",title:"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uB97C \uB36E\uB294\uC9C0 \uD655\uC778\uD558\uB294 \uC911 \u2014 \uB9AC\uBDF0\uC5B4\uB294 \uC544\uC9C1 \uBD80\uB974\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",live:!1,alert:!1};case"reviewing":return{badge:"\uB9AC\uBDF0 \uC9C4\uD589 \uC911",title:"implementation review \uC2E4\uD589 \uC911",live:!0,alert:!1};case"revising":return{badge:"\uB9AC\uBDF0 \uC218\uC815 \uC911 \xB7 1\uD68C",title:"review findings \uC218\uC815 \uC911 \u2014 1\uD68C\uB85C \uC81C\uD55C\uB429\uB2C8\uB2E4",live:!0,alert:!1};case"failed":{let n=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:n.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${n.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",title:n.trim(),live:!1,alert:!0}}default:return null}}function wl(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}var kv=new Set(["paused","needs_human","waiting_metadata","reviewing","retrying"]),$v=new Set(["waiting_metadata","reviewing","retrying"]);function xv(e,t){let n=e&&typeof e=="object"?e.auto_resolution:null,r=n&&typeof n=="object"&&!Array.isArray(n)?n:null;if(!r||!e)return null;let s=typeof r.origin_reason=="string"&&r.origin_reason.length>0?`\uC6D0 \uC0AC\uC720: ${r.origin_reason}`:"";switch(e.phase){case"waiting_metadata":return{label:"\uC815\uC815 \uB300\uAE30",details:[s,"\uBA54\uD0C0\uB370\uC774\uD130 \uC815\uC815\uC774 \uAD00\uCE21\uB418\uBA74 \uC790\uB3D9 \uC7AC\uAC1C"].filter(Boolean),live:!1};case"reviewing":{let o=typeof t?.reviewer=="string"?t.reviewer:"",a=typeof t?.effort=="string"?t.effort:"",i=t?.reviewer_source==="bead"||t?.reviewer_source==="harness"?t.reviewer_source:"";return{label:"\uC790\uB3D9 \uB9AC\uBDF0 \uC911",details:[o?`\uB9AC\uBDF0\uC5B4 ${o}${a?` \xB7 effort ${a}`:""}`:"",i?`\uB9AC\uBDF0\uC5B4 \uCD9C\uCC98 ${i}`:"",s].filter(Boolean),live:!0}}case"retrying":{let o=Number.isInteger(r.attempts)?Math.max(0,Number(r.attempts)):0,a=Number.isInteger(r.attempt_cap)&&Number(r.attempt_cap)>0?Number(r.attempt_cap):0,i=typeof r.next_at=="number"?cn(r.next_at):"",l=typeof r.last_error=="string"&&r.last_error.length>0?r.last_error:"";return{label:a>0?`\uC7AC\uC2DC\uB3C4 ${Math.min(o,a)}/${a}`:`\uC7AC\uC2DC\uB3C4 ${o}`,details:[s,i?`\uB2E4\uC74C \uC2DC\uAC01 ${i}`:"",l?`\uB9C8\uC9C0\uB9C9 \uC624\uB958: ${l}`:""].filter(Boolean),live:!0}}default:return null}}function Av(e){if(typeof e!="string")return"";for(let t of["retry_exhausted:","auto_review_exhausted:"])if(e.startsWith(t))return e.slice(t.length);return""}function Sv(e,t=null){if(!e||typeof e!="object")return null;let n=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,s=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,o=s&&typeof s.pr_number=="number"?s.pr_number:null,a="";switch(e.phase){case"gating":a=n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":a="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":a=o?`\uC218\uC815 PR #${o} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":a=e.subject_role==="repair"?o?`\uC218\uC815 PR #${o} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":a="\uB9C8\uBB34\uB9AC \uC911";break;case"waiting_metadata":case"reviewing":case"retrying":if(!t)return null;a=t.label;break;case"paused":a="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":a="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let i=[a,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${n}/${r}`];e.head_sha&&i.push(`head ${e.head_sha}`),e.base_sha&&i.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&i.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`);let l=Av(e.terminal_reason);l&&i.push(`\uC6D0 \uC0AC\uC720: ${l}`);for(let u of t?t.details:[])i.push(u);return e.active_attempt_id&&i.push(`attempt ${e.active_attempt_id}`),s&&typeof s.bead_id=="string"&&i.push(`repair ${s.bead_id}`),e.evidence&&i.push(e.evidence),e.log_path&&i.push(e.log_path),{badge:a,title:i.join(`
`),alert:e.phase==="needs_human",lock_actions:!kv.has(e.phase),repair_pr_url:s&&typeof s.pr_url=="string"?s.pr_url:"",repair_pr_number:o}}function Cf(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(n=>typeof n=="string"&&n.length>0):[]}function Ev(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",n=(r,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:r,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};if(e.continuation_required)return n("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0});if(e.queueing)return e.queueing==="cleanup"?n("\uC815\uB9AC \uC7AC\uAC1C \uC694\uCCAD \uC911",{title:"\uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4",live:!0}):n("\uD050 \uB4F1\uB85D \uC911",{title:"\uBA38\uC9C0 \uD050\uC5D0 \uB123\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4",live:!0});if(e.merge_step)return e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):n("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0});if(e.conflict_badge)return n(e.conflict_badge,{live:e.conflict_live===!0});if(e.auto_resolution)return n(e.auto_resolution.label,{title:e.auto_resolution.details.join(`
`),live:e.auto_resolution.live===!0});if(e.head_review&&e.head_review.state!=="failed")return n(e.head_review.badge,{title:e.head_review.title,live:e.head_review.live===!0});if(e.recovery?.lock_actions)return n(e.recovery.badge,{title:e.recovery.title,live:!0});if(e.cleanup_failed)return n(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0});if(e.base_exception)return n("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0});if(e.conflicting)return n("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="base_behind")return n("base \uAC31\uC2E0 \uD544\uC694",{alert:!0});if(e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale")return n("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0});if(e.gate?.reason==="spec_id_missing")return n("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0});if(e.gate?.reason==="review_receipt_invalid")return n("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0});if(Cf(e.receipt_check).length>0)return n("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${Cf(e.receipt_check).join(", ")}`,alert:!0});if(e.head_review?.state==="failed"){let r=bv(e.head_review.failure_reason);return n(`\uB9AC\uBDF0 \uC2E4\uD328: ${r.label}`,{title:e.head_review.failure_reason?`${r.action} (${e.head_review.failure_reason})`:r.action,alert:!0})}return e.recovery?n(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?n("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?n(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Tf(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?n(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Tf(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?n(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?n("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?n("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?n("\uB2EB\uD798",{alert:!0}):e.activity?n("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?n("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?n("\uD655\uC778 \uC911"):e.gate?.gate_badge?n(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function Tv(e,t,n,r,s=null,o=null,a=null,i=!1,l=null,u=!0,d=null,_=null,h=null,b={},k=!1,D=!1,B={},Y=null){let le=!!l&&l.position>0,K=!!l?.continuation_action&&l.continuation_action.continuation===null,N=!!l&&l.active===!0,M=l&&l.failure||null,G=yv(l?l.waiting:null,h),L=n[e]||null,I=L&&L.gate?L.gate:null,te=L&&L.pr?L.pr:null,xe=vv(l?l.resolution:null),ke=wv(l?l.head_review:null),fe=l&&l.head_review||null,ae=xv(h,fe),Te=Sv(h,ae),Ie=l&&l.authority||null,$e=!!fe&&["pending","reviewing","revising"].includes(fe.state),ee=!!h&&typeof h=="object"&&$v.has(h.phase),Z=le&&!N&&(fe?.state==="failed"||!Ie||ee||Ie.source==="automatic"&&!D),Ce=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":xe?xe.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":G,z=!!I&&I.base_badge==="\uCDA9\uB3CC",ne=!!I&&I.enabled===!0,ge=Gs({bead_id:e,merge_sha:B.merge_sha,cleanup_cursor:B.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:r,repo_operations:B.repo_operations}),Se=Ta(ge),Ye=o&&!ge&&(o.queueing??null)?o.queueing:null,ue=!!r&&["child_sweep","branch_cleanup","parent_close"].includes(r.step)&&!!I&&I.tier==="merged",Ue=i&&!!r&&!!I&&I.tier==="merged",gt=Z&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ue||Ue),St=i&&z&&u===!1,xt=jn(b,e,{external:i,merge_active:N||ge?.step==="merge",merge_queued:le,conflict_active:!!a,cleanup_active:Se,merged:!!r||I?.tier==="merged"}),ft=!!xt.operation,T=!ue&&!!r&&r.step==="repo_operations",ce=Ev({continuation_required:K,queueing:Ye,merge_step:ge,conflict_badge:Ce,conflict_live:xe?.live===!0||a==="running",head_review:fe&&ke?{...ke,state:fe.state,failure_reason:fe.failure_reason}:null,auto_resolution:ae,recovery:Te,cleanup_failed:r,cleanup_label:r?Tr(r.step):null,base_exception:_,conflicting:z,gate:I,receipt_check:L&&L.receipt_check?L.receipt_check:null,queue_failure:M,auto_skip:d,queued:le,queue_active:N,queue_position:l?l.position:0,activity:Ce?null:o&&o.activity||null}),Oe=ce?.live===!0&&ce.title?c`<span title=${ce.title}>${ce.label}</span>`:ce?.label||null;return{id:e,title:i?c`${t}<span class="muted"> · 세션</span>`:t,reason:r&&ge?.active!==!0?Ea(r.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:k,...Y?{dependency_chips:Y}:{},external:i,pr_number:te&&typeof te.number=="number"?te.number:null,pr_url:te&&typeof te.url=="string"?te.url:"",completion_badge:ce?.live!==!0&&ce?.title?ce.label:null,completion_title:ce?.title||"",completion_repair_pr_url:Te?Te.repair_pr_url:"",completion_repair_pr_number:Te?Te.repair_pr_number:null,badges:Oe?[Oe]:[],live_badge:ce?.live===!0?Oe:null,usage:s,alert:ce?.alert===!0,merge_action:I?.tier==="merged"&&!ue&&!Ue||T?!1:!le||K||Z,timeline_action:T,cancel_action:le&&!K,cancel_enabled:(!N||$e)&&!(Te&&Te.lock_actions),cancel_title:Te&&Te.lock_actions?`${Te.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:N&&!$e?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":$e?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:xt,discard_action:xt.action,merge_step:ge,discard_enabled:xt.enabled,discard_title:xt.title,merge_enabled:!ge&&!Ye&&!a&&!ft&&!_&&!(Te&&Te.lock_actions)&&!St&&!T&&(ne||z||I?.reason==="base_behind"||I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"||I?.reason==="review_receipt_undetermined"||ue||Ue||gt||ee&&!N),merge_label:K?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":ue||Ue?"\uC815\uB9AC \uC7AC\uAC1C":z&&!ge&&!ue?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":I?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":I?.reason==="review_receipt_missing"||I?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Z?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:ft?xt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${xt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${xt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:K?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":Ye?"\uC694\uCCAD\uC744 \uBCF4\uB0B4\uB294 \uC911 \u2014 \uC11C\uBC84 \uC751\uB2F5\uC744 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4":ge?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${ge.label}`:Ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":St?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":ue?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":z?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_missing"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uC5C6\uC74C \u2014 \uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_stale"?"head \uC7AC\uC791\uC131\uB428(\uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2D8) \u2014 \uC790\uB3D9 \uC7AC\uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":I?.reason==="review_receipt_undetermined"?"\uB9AC\uBDF0 \uC601\uC218\uC99D \uD310\uC815 \uBBF8\uACB0 \u2014 \uB2E4\uC74C \uAD00\uCE21\uC5D0\uC11C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4. \uC9C0\uAE08 \uBA38\uC9C0\uD558\uBA74 \uAD00\uCE21\uB41C head\uB97C \uB2E4\uC2DC \uD310\uC815\uD569\uB2C8\uB2E4":I?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":ne?`\uBA38\uC9C0 (${I.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:I&&I.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${I&&I.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function $l(e,t={}){let{transport:n,issueStores:r,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:l,getWorkspacePath:u,switchWorkspace:d,openDoc:_,doneRange:h,onDoneRangeChange:b}=t,k=r?vo(r,i):null,D=xo({transport:n,uiOrderStore:i}),B=null,Y=[],le=nv(),K=null,N=null,M={members_by_id:new Map,serial_raw_lengths:{},serial_lane_count:0,occupied_lanes:new Set},G=av(),L=h?Un(h):lv(),I=new Map;function te(){let f=Mr.find(w=>w.value===L);return f?f.label:"\uC624\uB298"}let xe=dv(),ke=!1,fe=new Set,ae=new Set,Te=new Set,Ie=new Set,$e=new Set,ee={},Z=null,Ce=0,z=null,ne=[];function ge(f){return Z===f?ee:{}}async function Se(){if(!n)return;let f=u?.()||"";if(Z===f||z&&z.key===f&&z.generation===Ce)return;let w=++Ce;z={key:f,generation:w};let j=null;try{j=await Promise.resolve(n("get-session-defaults",{}))}catch(me){if(w!==Ce)return;z=null,Yy("get-session-defaults failed: %o",me),Ze();return}w===Ce&&(ee=j&&typeof j.values=="object"&&j.values!==null?{...j.values}:{},Z=f,z=null,Ze())}function Ye(){Z=null,Ce+=1,Se()}let ue=document.createElement("div");ue.className="worker-console";let Ue=document.createElement("div");Ue.className="worker-top";let gt=document.createElement("div");gt.className="worker-drawer-overlay",gt.hidden=!0;let St=document.createElement("div");St.className="worker-drawer-overlay__backdrop";let xt=document.createElement("div");xt.className="worker-drawer-host";let ft=document.createElement("div");ft.className="worker-drawer-host",ft.hidden=!0,gt.append(St,xt,ft);let T=document.createElement("div");T.className="worker-lanes-host",ue.append(Ue,gt,T),e.appendChild(ue);let ce=null,Oe=null,Me=Vr(xt,{transport:n,sessionLogStore:a,onClose:()=>{ce=null,Oe=null,gt.hidden=!0,Ze()}}),Qe=$f(ft,{onClose:()=>{ft.hidden=!0,gt.hidden=!0,Ze()}}),st=mf({getWorkspacePath:u||(()=>"")}),bt=u&&u()||"",yt=gf({queueStore:s,transport:n,onChanged:()=>Ze(),onOpenScript:(f,w)=>{st.open(f,w)}}),re=o?df(ue,{queueStore:s,analysisStore:o,transport:n,getWorkspacePath:u,onOpenTranscript:(f,w)=>nr(f,w)}):null;function Q(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Ra,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function je(){let f=Q(),w=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,j=Array.isArray(f.serial_lanes)?f.serial_lanes:[],me=[];for(let pt of j){if(me.length>=w)break;!pt||typeof pt.id!="string"||!/^s[1-5]$/.test(pt.id)||!Array.isArray(pt.entries)||me.push({id:pt.id,label:`\uC9C1\uB82C ${pt.id.slice(1)}`,count:pt.entries.length})}return me.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...me]}function it(f){if(!K||!f.some(j=>j.id===K))return null;let w=je();return w?{bead_id:K,lanes:w}:null}function We(){let f=Q();return typeof f.revision=="number"?f.revision:0}function we(f){f&&f.queue&&s&&s.set(f.queue)}function Ge(){let f=Q().queue;return Array.isArray(f)?f.length:0}async function dt(f,w,j){if(!n)return;let me=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},...j===void 0?{}:{index:j},expected_revision:We()}),Le=await n("worker-queue-place",me());we(Le),Le&&Le.conflict&&await n("worker-queue-place",me()).then(we)}async function _t(f,w,j){if(!n)return;let me=()=>({bead_id:f,...w==="parallel"?{}:{lane:w},to_index:j,expected_revision:We()}),Le=await n("worker-queue-reorder",me());we(Le),Le&&Le.conflict&&await n("worker-queue-reorder",me()).then(we)}async function mt(f){if(!n)return;let w=await n("worker-queue-remove",{bead_id:f,expected_revision:We()});we(w),w&&w.conflict&&await n("worker-queue-remove",{bead_id:f,expected_revision:We()}).then(we)}async function Pt(f){if(!n||!f)return;let w=await n("worker-attempt-pause",{attempt_id:f});w&&w.paused===!1&&w.reason&&de(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Kt(f){if(!n||!f)return;let w=await Wr();if(w===null)return;let j=async(Le={})=>await n("worker-attempt-resume",{attempt_id:f,expected_revision:We(),...w!==""?{instructions:w}:{},...Le}),me=await j();we(me),me&&me.conflict&&(me=await j(),we(me)),me=await Yn(me,(Le,pt)=>j({continuation:Le,decision_token:pt}),{onResult:we,refresh:()=>j()}),me&&me.resumed===!1&&!me.conflict&&me.reason&&de(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${me.reason}`,"error",2400)}async function Ht(f){if(!n||!f)return;let w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:We()});we(w),w&&w.conflict&&(w=await n("worker-attempt-dismiss",{attempt_id:f,expected_revision:We()}),we(w)),w&&w.dismissed===!1&&!w.conflict&&w.reason&&de(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${w.reason}`,"error",2400)}async function Ct(f,w,j=!0){if(!n)return null;let me=n,Le=await me(f,{...w,expected_revision:We()});return we(Le),Le&&Le.conflict&&j&&(Le=await me(f,{...w,expected_revision:We()}),we(Le)),Le}async function Lt(f){if(!n||!f)return;let w=Q().merge_queue?.find(me=>me.bead_id===f)?.continuation_action;if(w?.mismatch&&w.continuation===null){await De(f,w.mismatch);return}fe.add(f),Ze();let j;try{j=await Ct("worker-merge-queue-add",{bead_id:f})}catch{de("\uBA38\uC9C0 \uD074\uB9AD\uC774 \uC11C\uBC84\uC5D0 \uC804\uB2EC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4(\uC5F0\uACB0 \uBB38\uC81C) \u2014 \uC5F0\uACB0 \uBCF5\uAD6C \uD6C4 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",3200);return}finally{fe.delete(f),Ze()}if(!(!j||j.applied)){if(j.conflict){de("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}de(hv(j.reason),"error",2400)}}async function Xe(f){if(!(!n||!f||ae.has(f))){ae.add(f),Ze();try{let w=await n("worker-cleanup-retry",{bead_id:f,expected_revision:We()});we(w),w&&!w.retried&&!w.conflict&&w.reason&&de(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${w.reason}`,"error",2400)}finally{ae.delete(f),Ze()}}}async function De(f,w){let j=await Yn({continuation_mismatch:w},(Le,pt)=>Ct("worker-merge-queue-add",{bead_id:f,continuation:Le,decision_token:pt},!1)),me=j?.queue?.merge_queue?.find(Le=>Le.bead_id===f)?.continuation_action;if(j?.applied!==!0&&me?.continuation===null&&me.mismatch){await De(f,me.mismatch);return}j&&j.applied===!1&&!j.conflict&&de("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function P(f){if(!n)return;let w=await Ct("worker-merge-auto-toggle",{on:f});!w||w.conflict||de(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function J(f){if(!n||!f)return;let w=await Ct("worker-merge-queue-remove",{bead_id:f});w&&!w.conflict&&!w.applied&&w.reason==="merge_active"&&de("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function ve(){await Ct("worker-merge-queue-remove",{all:!0})}async function E(f,w=null,j="unmerged",me=null){if(!n||!f)return;let Le=Ms(f,j);if(!(!!me||typeof globalThis.confirm!="function"||globalThis.confirm(Le)))return;let ot=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...me?{operation_id:me}:{},expected_revision:We()});if(we(ot),ot&&ot.conflict&&(ot=await n("worker-discard",{bead_id:f,...w?{attempt_id:w}:{},...me?{operation_id:me}:{},expected_revision:We()}),we(ot)),ot&&ot.discarded===!0){de(pa(ot),"success",5e3);return}if(ot&&ot.reason){de(`\uD3D0\uAE30 \uC2E4\uD328: ${ot.reason}`,"error",2800);return}if(ot&&ot.accepted&&ot.pending==="merged_revert"){de("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ot&&ot.accepted&&!ot.discarded){de(`\uD3D0\uAE30 \uC9C4\uD589: ${ot.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ot&&!ot.conflict&&de("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function H(f,w,j){if(!(!n||!w||!j||Ie.has(w))){Ie.add(w),Ze();try{let me=await n(f,{bead_id:w,action_id:j,expected_revision:We()});we(me),me?.conflict?de("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!me?.ok&&me?.reason&&de(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(me.reason)}`,"error",2800)}finally{Ie.delete(w),Ze()}}}async function Re(f,w){if(!n||!w||Te.has(w))return;Te.add(w),Ze();let j;try{let me=async(Le={})=>await n(f,{bead_id:w,expected_revision:We(),...Le});j=await me(),we(j),j&&j.conflict&&(j=await n(f,{bead_id:w,expected_revision:We()}),we(j)),f==="worker-revise-fix"&&(j=await Yn(j,(Le,pt)=>me({continuation:Le,decision_token:pt}),{onResult:we,refresh:()=>me()}))}finally{Te.delete(w),Ze()}if(!(!j||j.conflict)){if(j.ok){de(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}de(`\uCC98\uBD84 \uAC70\uBD80: ${j.reason||""}`,"error",3e3)}}async function x(f){if(!n)return;let w=await n("worker-automation-toggle",{on:f,expected_revision:We()});we(w),w&&w.conflict&&await n("worker-automation-toggle",{on:f,expected_revision:We()}).then(we)}async function R(f){if(!n||!f)return;let w=await n("worker-repo-operation-repair",{operation_id:f});if(we(w),w&&w.ok===!1){de(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${w.reason||""}`,"error",3e3);return}w&&w.ok===!0&&de("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function X(f){if(!n||!f)return;let w=await n("worker-repo-operation-dismiss",{operation_id:f});we(w),w&&w.ok===!1&&de(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${w.reason||""}`,"error",3e3)}async function _e(f){if(!n||!Number.isFinite(f))return;let w=Math.max(Ra,Math.floor(f)),j=await n("worker-queue-set-slots",{slots:w,expected_revision:We()});we(j),j&&j.conflict&&await n("worker-queue-set-slots",{slots:w,expected_revision:We()}).then(we)}async function Ae(f){if(!n||!Number.isInteger(f)||f<1||f>xf)return;let w=Q(),j=(Array.isArray(w.serial_lanes)?w.serial_lanes:[]).slice(f).reduce((pt,ot)=>pt+(Array.isArray(ot?.entries)?ot.entries.length:0),0),me=()=>({count:f,expected_revision:We()}),Le=await n("worker-queue-set-serial-lane-count",me());we(Le),Le&&Le.conflict&&(Le=await n("worker-queue-set-serial-lane-count",me()),we(Le)),Le&&Le.applied&&j>0&&de(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${j}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}let v="\uAC19\uC740 \uC9C1\uB82C \uB808\uC778\uC73C\uB85C";function U(f,w){let j=Zi(f,w.id,M);return{id:w.id,title:w.title,location_label:w.location_label,prefixes:w.prefixes,action:j.kind==="note"?{kind:"note",text:j.text}:j.kind==="disabled"?{kind:"disabled",label:v,title:j.title}:{kind:"place",label:v,title:j.title}}}function ie(f,w){if(!N||N.bead_id!==f)return null;let j=N.counterpart_id,me=w.filter(Le=>Le.id===j);return me.length===0?null:{rows:me.map(Le=>U(f,Le))}}async function Ke(f,w){let j=Zi(f,w,M);if(N=null,j.kind!=="ops"){Ze();return}let me=We();for(let Le of j.ops){let pt=await Be(Le,me);if(pt===null)break;me=pt}Ze()}async function Be(f,w){if(!n)return null;try{let j=await n("worker-queue-place",{bead_id:f.bead_id,lane:f.lane,index:f.index,expected_revision:w});if(we(j),j&&j.conflict)return de("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),null;if(!j||j.applied!==!0)return de(j&&typeof j.admission_reason=="string"?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${j.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),null;let me=j.queue?j.queue.revision:void 0;return typeof me!="number"?(de("\uD050 \uC751\uB2F5\uC5D0 revision\uC774 \uC5C6\uC2B5\uB2C8\uB2E4","error"),null):me}catch(j){return de(j instanceof Error&&j.message?j.message:"\uD050 \uC694\uCCAD \uC2E4\uD328","error"),null}}function be(){let f=Q(),w=k?k.selectBoardColumn(Zy,"ready"):[],j=k?k.selectBoardColumn(Qy,"blocked"):[],me=k?k.selectBoardColumn(ev,"closed"):[],Le=k?k.selectBoardColumn(Xy,"in_progress"):[],pt=k?k.selectBoardColumn(Jy,"resolved"):[],ot=ko([...w,...j,...Le,...pt,...me]),Ve=new Map;for(let m of[...w,...j,...Le])m&&m.id&&!Ve.has(m.id)&&Ve.set(m.id,m);let A={...ge(u?.()||"")};for(let m of["orchestration_model","orchestration_effort","orchestration_speed"]){let q=f[m];typeof q=="string"&&(A[m]=q)}function oe(m,q){let pe=Ve.get(m);if(!pe)return null;let He=pe.metadata&&typeof pe.metadata=="object"?pe.metadata:{},nt=pe.workflow?.route,Yt=He.route,Mt=Sf(nt)?nt:Sf(Yt)?Yt:null;return yn({pin:He,global:A,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Mt,controller_runtime:q})}function F(m){let q=m.runner||null,pe=oe(m.bead_id,q),He=Ns(m),nt=pe?dr(pe,q):null;return He||nt?{orchestration:He,worker:nt}:null}let Ee=new Map;function rt(m){if(Ee.has(m))return Ee.get(m)??null;let q=oe(m,null),pe=null;if(q){let He=Fn(f.runner_catalog??null,q.orchestration_model.value??""),nt=He===null?q:oe(m,He),Yt=Sr(nt,f.runner_catalog??null),Mt=dr(nt,He);pe=Yt||Mt?{orchestration:Yt,worker:Mt}:null}return Ee.set(m,pe),pe}function ut(m){let q=$o(ot,m);return q.total===0?null:q}let $t=f.bead_titles||{},Je=new Map;for(let[m,q]of Object.entries($t))typeof q=="string"&&q.length>0&&Je.set(m,q);for(let m of[...w,...j])Je.set(m.id,m.title||m.id);let Ut=new Map;for(let m of[...w,...j,...Le,...pt,...me])m&&m.id&&typeof m.from_id=="string"&&Ut.set(m.id,m.from_id);let p=new Map;for(let m of[...w,...j,...Le,...pt,...me])m&&m.id&&typeof m.priority=="number"&&p.set(m.id,m.priority);let g=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},y=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},$=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},W=new Map;for(let[m,q]of Object.entries(y))Array.isArray(q)&&W.set(m,bl(q));for(let m of[...w,...j]){let q=m.labels;Array.isArray(q)&&!W.has(m.id)&&W.set(m.id,bl(q))}let V=new Map,se=o?.get()?.last_good?.result?.groups;for(let m of Array.isArray(se)?se:[]){if(m?.eligible!==!0||!Array.isArray(m.members))continue;let q=m.members.map(He=>{let nt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(Yt=>Yt.entries.some(Mt=>Mt.bead_id===He));return nt?nt.id:null});if(!(q.every(He=>He!==null)&&new Set(q).size===1))for(let He of m.members)V.set(He,m.members.filter(nt=>nt!==He))}let ye=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},et=f.blocker_workspaces&&typeof f.blocker_workspaces=="object"&&!Array.isArray(f.blocker_workspaces)?f.blocker_workspaces:{},ct=new Map;for(let[m,q]of Object.entries(g))q&&typeof q=="object"&&ct.set(m,q);for(let m of[...w,...j])ct.set(m.id,{created_at:m.created_at,updated_at:m.updated_at});let nn=m=>ct.get(m)||{},Ot=f.pr_wait||[],Tn=f.pr_observations||{},Fe=f.pr_activity||{},Et=f.cleanup_failed||{},$n=Object.entries(Et).map(([m,q])=>({bead_id:m,step:q&&q.step?q.step:"",reason:q&&q.reason?q.reason:"",at:q&&typeof q.at=="number"?q.at:null,detail:q&&typeof q.detail=="string"?q.detail:null,output_tail:q&&typeof q.output_tail=="string"&&q.output_tail?q.output_tail:void 0,log_path:q&&typeof q.log_path=="string"&&q.log_path?q.log_path:void 0,retry_count:q&&typeof q.retry_count=="number"&&Number.isInteger(q.retry_count)&&q.retry_count>0?q.retry_count:0,failure_code:q&&typeof q.failure_code=="string"?q.failure_code:void 0,subject_id:q&&typeof q.subject_id=="string"?q.subject_id:void 0,repair_eligible:!!(q&&q.repair_eligible),repair:q&&q.repair?q.repair:void 0})),Oa=f.queue||[],Vf=new Set([...Oa.map(m=>m.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(m=>(Array.isArray(m?.entries)?m.entries:[]).map(q=>q.bead_id)),...Ot.map(m=>m.bead_id),...f.done.map(m=>m.bead_id)]),Yf=new Set(j.map(m=>m.id)),Zf=i?i.get()?.order||{}:{},El=new Set,Tl=[];for(let m of[...w,...j])Vf.has(m.id)||El.has(m.id)||_v(m)||(El.add(m.id),Tl.push(m));Y=fv(Tl,G,Zf);let Qf=f.admission||{},Cl=m=>{let q=Qf[m];if(!q)return"";if(q.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let pe=typeof q.reason=="string"?q.reason:"",He=pe.indexOf(":");return He>0&&He<pe.length-1?`\u26D4 ${pe.slice(0,He)} (${pe.slice(He+1)})`:`\u26D4 ${pe}`},Rl=new Map,Xf=Y.map(m=>{let q=Ss(m),pe=q.evidence==="published",He=m.workflow?.route==="quick_fix"||m.metadata&&m.metadata.route==="quick_fix",nt=!Object.hasOwn(m,"description")||typeof m.description=="string"&&m.description.trim().length>0,Yt=Object.hasOwn(m,"labels")&&cf(m.labels),Mt=Yt||!Object.hasOwn(m,"labels")?"":uf(m.labels,m.metadata),Lr=Mt.length>0,Dt=!Yt&&(He?nt:pe&&!q.conflict),oo=Yf.has(m.id),Gn=[];if(oo){let ao=mv(m);ao.length>0?Rl.set(m.id,ao):Gn.push(gv)}He&&!nt?Gn.push("missing_description"):!He&&q.conflict?Gn.push("spec_id_conflict"):!He&&q.evidence==="none"?Gn.push("spec \uC5C6\uC74C"):!He&&q.evidence==="draft"&&Gn.push("spec \uBBF8\uBC1C\uD589(draft)");let Ir=Cl(m.id);return Ir&&Gn.push(Ir),{id:m.id,title:m.title||m.id,reason:Gn.join(" \xB7 "),draggable:Dt,lane:"candidate",created_at:m.created_at,updated_at:m.updated_at,workflow:m.workflow,is_quick_fix:He,status:m.status,worker_ineligible:Yt,session_preferred:Lr,session_preferred_reason:Mt,blocked:oo,has_spec:pe,exec_chips:rt(m.id),from_id:m.from_id||void 0,priority:p.get(m.id)}}),La=sv(Xf,le),Ia=La.visible,Jf=f.revise_parked||{},Qs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Pa=(m,q)=>m.map((pe,He)=>{let nt=q!=="done",Yt=q!=="done"&&q!=="queue",Mt=nt?Jf[pe.bead_id]:null,Lr=nt?jn(Qs,pe.bead_id):null,Dt=Lr?.operation?Lr:null,oo=nt&&W.get(pe.bead_id)===!0,Gn=f.admission&&typeof f.admission=="object"?f.admission[pe.bead_id]:null,Ir=nt?Md(Gn,!!Dt||Ie.has(pe.bead_id)):null,ao=nt&&!Ir?Cl(pe.bead_id):null,p_=nt?[ao]:[],ac=[],za=nt?V.get(pe.bead_id):void 0;return za&&za.length>0&&ac.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${za.join(", ")}\uC640`),{id:pe.bead_id,title:Je.get(pe.bead_id)||pe.bead_id,reason:p_.filter(Boolean).join(" \xB7 "),draggable:nt&&!Dt&&!Ir,done:q==="done",lane:q,seq:Yt?He+1:void 0,worker_serial:oo,discard:Dt,stale_work:Ir,badges:[...ac,...Mt?["\u23F8 REVISE \uD30C\uD0B9"]:[],...q==="done"?ca(f.attempts||{},pe.bead_id):[]],alert:!!Mt,revise_action:!!Mt,revise_enabled:!!Mt&&!Dt&&!Te.has(pe.bead_id),revise_title:Mt?Mt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Mt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:q==="done"?Rn(f.attempts||{},pe.bead_id):null,work_ms:q==="done"?ua(f.attempts||{},pe.bead_id):null,done_at:q==="done"&&typeof pe.added_at=="number"?pe.added_at:void 0,exec_chips:nt?rt(pe.bead_id):null,workflow:nt&&$[pe.bead_id]||null,from_id:Ut.get(pe.bead_id)||void 0,priority:p.get(pe.bead_id),...nn(pe.bead_id)}}),Cr=f.attempts?Object.values(f.attempts).filter(Er):[],Ma=new Set;for(let m of Cr)m&&typeof m.resumed_from=="string"&&m.resumed_from.length>0&&Ma.add(m.resumed_from);let Ol=new Map;for(let m of Cr)Ol.set(m.bead_id,m.attempt_id);let ts=new Map;for(let m of Cr)ts.set(m.attempt_id,m);function Da(m){let q=new Set,pe=m;for(;pe&&!q.has(pe.attempt_id);){if(pe.conflict_resolution===!0)return!0;q.add(pe.attempt_id),pe=typeof pe.resumed_from=="string"&&pe.resumed_from.length>0&&ts.get(pe.resumed_from)||null}return!1}let Xs=typeof f.declared_base=="string"?f.declared_base:null;function e_(m){let q=null;for(let pe of Cr)!pe||pe.bead_id!==m||Da(pe)||(q===null||(typeof pe.started_at=="number"?pe.started_at:0)>=(typeof q.started_at=="number"?q.started_at:0))&&(q=pe);return q&&typeof q.target_base=="string"?q.target_base:null}let Na=[],Js=[],t_=lf(f),Ll=m=>{let q=typeof m.session_id=="string"&&m.session_id.length>0,pe=Ma.has(m.attempt_id);return{eligible:q&&!pe,reason:q?pe?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},In=null;for(let m of Cr){let q=m.status==="paused"&&!Ma.has(m.attempt_id);if(m.status==="running"||q)Js.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Je.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,paused:q,conflict_resolution:Da(m),base_exception:wl(Xs,m.target_base),can_pause:typeof m.session_id=="string"&&m.session_id.length>0,discard:jn(Qs,m.bead_id,{attempt_id:m.attempt_id}),workflow:$[m.bead_id]||null,priority:p.get(m.bead_id),usage:Rn(f.attempts||{},m.bead_id),rollup:ut(m.bead_id),rollup_expanded:$e.has(m.bead_id),exec_chips:F(m),...nn(m.bead_id)});else if((m.status==="failed"||m.status==="orphaned")&&t_(m)){let pe=Ll(m);Na.push({bead_id:m.bead_id,attempt_id:m.attempt_id,title:Je.get(m.bead_id)||m.bead_id,runner:m.runner||null,model:m.model||null,effort:m.effort||null,speed:m.speed||null,continuation_mode:m.continuation_mode||null,started_at:typeof m.started_at=="number"?m.started_at:null,resumed_from:m.resumed_from||null,failed:!0,status:m.status,status_label:m.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:jn(Qs,m.bead_id,{attempt_id:m.attempt_id}),resume_eligible:pe.eligible,resume_reason:pe.reason,conflict_resolution:Da(m),base_exception:wl(Xs,m.target_base),workflow:$[m.bead_id]||null,priority:p.get(m.bead_id),usage:Rn(f.attempts||{},m.bead_id),rollup:ut(m.bead_id),rollup_expanded:$e.has(m.bead_id),exec_chips:F(m),...nn(m.bead_id)}),In=m}}let Il=new Set([...Na,...Js].map(m=>m.bead_id)),Pl=new Map;for(let m of Array.isArray(f.session_active)?f.session_active:[]){let q=m&&m.bead_id;if(!(typeof q!="string"||q.length===0||Il.has(q))){if(Il.add(q),Array.isArray(m.blocked_by)){let pe=m.blocked_by.filter(He=>typeof He=="string"&&He.length>0);pe.length>0&&Pl.set(q,pe)}Js.push({bead_id:q,attempt_id:null,kind:"session",title:m.title||Je.get(q)||q,status:"in_progress",started_at:Wn(m.started_at)??Wn(m.updated_at),updated_at:Wn(m.updated_at),workflow:m.workflow||null,priority:p.get(q),runner:null,model:null,effort:null,speed:null,continuation_mode:null,resumed_from:null,paused:!1,can_pause:!1,conflict_resolution:!1,base_exception:null,discard:null,exec_chips:null,usage:null,rollup:null,rollup_expanded:!1})}}let Rr=[...Na,...Js].map(m=>{let q=ts.get(m.attempt_id),pe=q?.quickfix_landing;if(q?.quickfix_lane!==!0||!pe||typeof pe!="object")return m;let He=typeof pe.reason=="string"&&pe.reason.length>0?pe.reason:null,nt=Gs({bead_id:q.bead_id,merge_sha:pe.head_sha,cleanup_cursor:pe.cursor,cleanup_failed:He?{step:pe.cursor,reason:He}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return nt?{...m,landing:nt}:m}),Ml=null;if(In){let m=Ll(In),q=In.cause_detail;Ml={bead_id:In.bead_id,repo:In.repo||"",reason:In.cause||In.status,cause_detail:q&&typeof q.reason=="string"?{reason:q.reason,command:typeof q.command=="string"?q.command:null}:null,resume_attempt_id:In.attempt_id,resume_eligible:m.eligible,resume_reason:m.reason,discard:jn(Qs,In.bead_id,{attempt_id:In.attempt_id})}}let Dl=new Set(Rr.map(m=>m.bead_id)),qa=Array.isArray(f.merge_queue)?f.merge_queue:[],Nl=new Map,ql=new Map,Fl=new Map,jl=new Map,Bl=new Map;qa.forEach((m,q)=>{m&&typeof m.bead_id=="string"&&(Nl.set(m.bead_id,q+1),ql.set(m.bead_id,m.resolution),Fl.set(m.bead_id,m.continuation_action||null),jl.set(m.bead_id,m.head_review||null),Bl.set(m.bead_id,m.authority||null))});let Or=f.merge_queue_state||{active:null,failures:{}},n_=Or.failures||{},Ul=Or.waiting&&typeof Or.waiting.bead_id=="string"&&typeof Or.waiting.reason=="string"?Or.waiting:null,r_=f.auto_merge_skips||{},Wl=m=>{let q=r_[m];if(!q)return null;let pe=Tn[m],He=pe&&pe.pr?pe.pr.head_sha:null;return He&&He===q.head_sha?q.reason||"":null},eo=new Map;for(let m of Rr)m.failed!==!0&&m.conflict_resolution&&(m.paused?eo.has(m.bead_id)||eo.set(m.bead_id,"paused"):eo.set(m.bead_id,"running"));let zl=Rr.filter(m=>m.kind!=="session"&&!m.paused&&m.failed!==!0).length,Hl=(f.workspace_info||{}).slots,Gl=typeof Hl=="number"?Hl:typeof f.slots=="number"?f.slots:Ra,s_=zl>Gl,to=yr(L),o_=(Array.isArray(f.done)?f.done.slice():[]).filter(m=>to===void 0||typeof m.added_at!="number"||m.added_at>=to).sort((m,q)=>(q.added_at||0)-(m.added_at||0)),ns=Pa(o_,"done"),a_=new Set((Array.isArray(f.done)?f.done:[]).map(m=>m?.bead_id).filter(m=>typeof m=="string")),Kl=[],i_=u?.()||"";for(let m of me){let q=Wn(m.closed_at);if(typeof m.id!="string"||a_.has(m.id)||q===null||to!==void 0&&q<to||typeof m.comment_count!="number"||m.comment_count<=0)continue;let pe=`${i_}\0${m.id}\0${String(m.updated_at)}\0${m.comment_count}`,He=I.get(pe);He===void 0&&n&&(I.set(pe,"pending"),Promise.resolve(n("get-comments",{id:m.id})).then(nt=>{let Yt=Array.isArray(nt)&&nt.some(Mt=>Yo(typeof Mt?.text=="string"?Mt.text:"")?.lane==="session");I.set(pe,Yt?"session":"not-session"),Ze()}).catch(()=>{I.set(pe,"failed"),Ze()})),He==="session"&&Kl.push({id:m.id,title:m.title||m.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:q,created_at:m.created_at,updated_at:m.updated_at})}ns.push(...Kl),ns.sort((m,q)=>(q.done_at||0)-(m.done_at||0));let no={};for(let m of Hn)no[m]=0;let Vl=!1,Yl=0,Fa=0,Zl=0;for(let m of ns){let q=m.usage;if(q&&typeof q=="object"){let pe=!1;for(let He of Hn)Number.isFinite(q[He])&&(no[He]+=q[He],Vl=!0,pe=!0);pe&&(Fa+=1,Number.isFinite(q.total_cost_usd)&&(Yl+=q.total_cost_usd,Zl+=1))}}Fa>0&&Zl===Fa&&(no.total_cost_usd=Yl);let Ql=ns.map(m=>m.usage).filter(m=>m&&typeof m=="object"&&m.providers),l_=Ql.length>0?un(Mo(Ql)):Vl?Zn(no):null,Xl=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},Jl=Array.isArray(f.serial_lanes)?f.serial_lanes:[],ec=m=>{if(Ot.some(He=>He.bead_id===m))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let q=Cr.filter(He=>He&&He.bead_id===m),pe=q.length>0?q[q.length-1].status:null;return pe==="failed"||pe==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":pe==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},ro=Jl.filter(m=>m&&typeof m.id=="string"&&Array.isArray(m.entries)).map((m,q)=>{let pe=Xl[m.id]||{},He=new Map((Array.isArray(pe.corrections)?pe.corrections:[]).filter(Dt=>Dt&&typeof Dt.bead_id=="string"&&typeof Dt.after=="string").map(Dt=>[Dt.bead_id,Dt.after])),nt=Array.isArray(pe.occupied_by)?pe.occupied_by.filter(Dt=>typeof Dt=="string"):[],Yt=new Set(nt),Mt=Pa(m.entries.filter(Dt=>!Dl.has(Dt.bead_id)&&!Yt.has(Dt.bead_id)),m.id).map(Dt=>He.has(Dt.id)?{...Dt,badges:[`\u{1F517} ${He.get(Dt.id)} \uB4A4 (blocks \uC790\uB3D9)`,...Dt.badges]}:Dt),Lr=nt.map(Dt=>({id:Dt,title:Je.get(Dt)||Dt,draggable:!1,lane:m.id,ghost:!0,badges:[ec(Dt)]}));return{id:m.id,index:q+1,rows:[...Lr,...Mt],occupied:nt.length>0,badge:nt.length>0?ec(nt[0]):"\uB300\uAE30",cycle:pe.cycle===!0}}),tc=typeof f.serial_lane_count=="number"?f.serial_lane_count:ro.length,ja=Pa(Oa.filter(m=>!Dl.has(m.bead_id)),"queue"),nc=new Map,rc=new Set;for(let[m,q]of Object.entries(Xl)){if(!/^s[1-5]$/.test(m))continue;let pe=q&&Array.isArray(q.occupied_by)?q.occupied_by:[];for(let He of pe)typeof He=="string"&&nc.set(He,m);pe.length>0&&rc.add(m)}let rr=[];for(let m of Rr)typeof m.bead_id=="string"&&rr.push({id:m.bead_id,title:Je.get(m.bead_id)||m.bead_id,location_label:"\uC2E4\uD589\uC911",kind:"running",lane_id:nc.get(m.bead_id)??null});for(let m of Ot){let q=m&&m.bead_id;typeof q!="string"||q.length===0||rr.push({id:q,title:Je.get(q)||q,location_label:"PR \uB300\uAE30",kind:"pr_wait",lane_id:null})}for(let m of ro)for(let q of m.rows)q.ghost!==!0&&rr.push({id:q.id,title:q.title,location_label:`${m.id} #${q.seq??""}`.trim(),kind:"serial",lane_id:m.id});ja.forEach((m,q)=>{rr.push({id:m.id,title:m.title,location_label:`#${q+1}`,kind:"parallel",lane_id:null})});for(let m of Ia)rr.push({id:m.id,title:m.title,location_label:"\uD6C4\uBCF4",kind:"candidate",lane_id:null});let sc={};for(let m of Jl)m&&typeof m.id=="string"&&Array.isArray(m.entries)&&(sc[m.id]=m.entries.length);let Ba=new Map;for(let m of rr)Ba.has(m.id)||Ba.set(m.id,m);M={members_by_id:Ba,serial_raw_lengths:sc,serial_lane_count:tc,occupied_lanes:rc};let c_=qd(f.bead_scope,rr),so=new Map;for(let[m,q]of Pl)so.set(m,q);for(let[m,q]of Rl)so.set(m,q);for(let[m,q]of Object.entries(ye))Array.isArray(q)&&so.set(m,q.filter(pe=>typeof pe=="string"&&pe.length>0));let u_=yp(so,rr,et),Ua=(m,q=null)=>{let pe=c_.get(m),He=u_.get(m)||null,nt=pe&&pe.overlaps.length>0?pe.overlaps:null,Yt=!!pe&&pe.scope_missing;if(!He&&!nt&&!Yt)return q;let Mt=nt?ie(m,nt):null;return{...q||{},...He?{predecessors:He}:{},...nt?{overlaps:nt}:{},...Yt?{scope_missing:!0}:{},...Mt?{popover:Mt}:{}}},Wa=m=>{let q=Ua(m.id,m.dependency_chips||null);return q&&(m.dependency_chips=q),m};for(let m of ja)Wa(m);for(let m of ro)for(let q of m.rows)q.ghost!==!0&&Wa(q);for(let m of Ia)Wa(m);let oc=new Map;for(let m of Rr){let q=typeof m.bead_id=="string"?m.bead_id:"";if(q.length===0)continue;let pe=m.kind==="session",He=Ua(q),nt=typeof m.attempt_id=="string"&&m.attempt_id.length>0?ts.get(m.attempt_id):void 0,Yt=nt&&nt.last_activity&&typeof nt.last_activity=="object"?nt.last_activity:null,Mt=nt&&Array.isArray(nt.legs)?nt.legs:[];!He&&!Yt&&Mt.length===0&&!pe||oc.set(q,{...Yt?{last_activity:Yt}:{},...Mt.length>0?{legs:Mt}:{},...He?{dependency_chips:He}:{}})}let d_=Ot.map(m=>Tv(m.bead_id,Je.get(m.bead_id)||m.bead_id,Tn,Et[m.bead_id]||null,Rn(f.attempts||{},m.bead_id),Fe[m.bead_id]||(fe.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"merge"}:ae.has(m.bead_id)?{activity:null,merge_progress:null,queueing:"cleanup"}:null),eo.get(m.bead_id)||null,m.external===!0,{position:Nl.get(m.bead_id)||0,active:Or.active===m.bead_id,failure:n_[m.bead_id]||null,waiting:Ul?.bead_id===m.bead_id?Ul.reason:null,resolution:ql.get(m.bead_id),continuation_action:Fl.get(m.bead_id),head_review:jl.get(m.bead_id)||null,authority:Bl.get(m.bead_id)||null},m.wt_present!==!1,f.auto_merge===!0?Wl(m.bead_id):null,wl(Xs,e_(m.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[m.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ts.get(Ol.get(m.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:m.merge_sha,cleanup_cursor:m.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]},Ua(m.bead_id))).map(m=>({...m,workflow:$[m.id]||null,priority:p.get(m.id),...nn(m.id)}));return{queue:f,idToTitle:Je,candidates:Ia,candidate_hidden:{blocked:La.hidden_blocked,spec:La.hidden_spec},running:Rr,live_count:zl,slots:Gl,over_cap:s_,failure:Ml,waiting:ja,serial_lanes:ro,serial_lane_count:tc,running_overlays:oc,pr_wait:d_,merge_queue_length:qa.length,merge_queue_running:qa.length>0,auto_excluded:Ot.map(m=>m.bead_id).filter(m=>Wl(m)!==null),declared_base:Xs,done:ns,token_total:l_,cleanup_failures:$n,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Rt(){let w=!!o?.get()?.job,j=!w&&o?.isPending?.()===!0,me=w?"\uBD84\uC11D \uC911":j?"\uC900\uBE44 \uC911":"";return c`<button
      type="button"
      class=${me?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${me?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${me?c`<span class="worker-analysis-btn__badge">${me}</span>`:""}
    </button>`}function vt(f){let w=f.waiting.length>0?f.waiting[0].id:"\u2014",j=c`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,me=rn(f),Le=f.over_cap?c`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",pt=f.queue.auto_advance?0:(Array.isArray(f.queue.queue)?f.queue.queue:[]).filter(rt=>rt&&typeof rt.armed_by_lane=="string"&&rt.armed_by_lane.length>0).length,ot=pt>0?c`<span
            class="worker-kpi__chip worker-kpi__chip--armed"
            title="모니터 연결 레인이 발차한 대기 행입니다 — 이 레포의 자동 진행은 꺼진 채입니다"
            >⏸ 자동 진행 꺼짐 · 연결 레인 ${pt}건 진행 중</span
          >`:"",Ve=c`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${te()} 완료 <b>${f.done.length}</b></span
      >`,A=c`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,oe=c`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Ra}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:xf},(rt,ut)=>ut+1).map(rt=>c`<option
                value=${String(rt)}
                ?selected=${f.serial_lane_count===rt}
              >
                ${rt}
              </option>`)}
        </select>
      </label>
      ${o?Rt():""} `,F=zd({failure:f.failure}),Ee=Pd(f.repo_operations,f.cleanup_failures);return ke?c`<div class="worker-ribbon">
          ${j} ${me}
          <div class="worker-kpi worker-kpi--ribbon">
            ${Le}${ot}${Ve}
          </div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${oe}</div>
          <div class="worker-kpi">${A}</div>
        </div>
        ${Ee}${yt.template()}${F}`:c`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${j}${me}${oe}</div>
        <div class="worker-kpi">
          ${Le}${ot}${Ve}${A}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${te()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(rt=>c`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${rt.tooltip}
                >${te()} 완료 · 누적 ${rt.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${w}</b></span
          >
        </div>
      </div>
      ${Ee}${yt.template()}${F}`}function ht(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let w=f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0);return c`<section
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
          >${f.running.length+f.pr_wait.length}</span
        >
      </header>
      ${f.running.length>0?el(f.running,Date.now(),ce,f.running_overlays):""}
      ${f.pr_wait.map(j=>lr(j))}
    </section>`}function Qt(f){let w=f.candidate_hidden;return c`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${le.show_blocked}
        />
        🔒 blocked${w.blocked>0?` ${w.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ov.map(j=>c`<button
              type="button"
              class="worker-filter__chip${le.spec===j.value?" is-active":""}"
              data-spec=${j.value}
              aria-pressed=${le.spec===j.value?"true":"false"}
            >
              ${j.label}
            </button>`)}
        ${w.spec>0?c`<span class="worker-filter__hidden">숨김 ${w.spec}</span>`:""}
      </div>
    </div>`}function qt(){return c`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${G}
    >
      ${Lf.map(f=>c`<option value=${f.value} ?selected=${G===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function an(){return c`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${L}
      >
        ${Mr.map(f=>c`<option value=${f.value} ?selected=${L===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function en(f){let w=c`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,j=f.cycle?c`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return Ln({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:w,controls:j})}function rn(f){let w=f.queue.auto_merge===!0;if(f.merge_queue_running)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${w?" is-active":""}"
        title=${w?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${w?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(w)return c`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let j=new Set(f.auto_excluded),me=f.pr_wait.filter(Le=>Le.merge_action&&Le.merge_enabled&&!j.has(Le.id)).length;return c`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${me>0?` ${me}`:""}
    </button>`}function Xt(f){let w=Ln({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:qt(),controls:Qt(f),place_menu:it(f.candidates),onOpenDoc:_?(j,me)=>_(me):void 0});return ke?c`<div class="worker-lanes worker-lanes--mobile">
        ${ht(f)}
        ${Ln({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:xe.queue,preview:Ef(f.waiting)})}
        ${f.serial_lanes.map(j=>en(j))}
        ${w}
        ${Ln({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:an(),collapsible:!0,collapsed:xe.done,preview:Array.isArray(f.token_total)?f.token_total.map(j=>j.label).join(" \xB7 "):f.token_total||Ef(f.done)})}
      </div>`:c`<div class="worker-lanes">
      ${w}
      <div class="worker-wait">
        ${Ln({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(j=>en(j))}
      </div>
      ${Ln({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(j=>j.kind!=="session"&&!j.paused&&j.failed!==!0),body:el(f.running,Date.now(),ce,f.running_overlays)})}
      ${Ln({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${Ln({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${te()} ${f.done.length}`,items:f.done,empty:`${te()} \uC644\uB8CC \uC5C6\uC74C`,controls:an()})}
    </div>`}function on(f){xe={...xe,[f]:!xe[f]},pv(xe),Ze()}function Ze(){let f=be();at(vt(f),Ue),at(Xt(f),T)}function gn(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(uv);ke=!!f.matches;let w=j=>{let me=!!(j&&typeof j.matches=="boolean"?j.matches:f.matches);me!==ke&&(ke=me,Ze())};typeof f.addEventListener=="function"?(f.addEventListener("change",w),ne.push(()=>f.removeEventListener("change",w))):typeof f.addListener=="function"&&(f.addListener(w),ne.push(()=>f.removeListener(w)))}let tt=null;function Pe(f){tt=f.target instanceof Element?f.target:null}function C(f){let j=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!j)return;if(tt&&j.contains(tt)&&tt.closest("input, button, a")){f.preventDefault();return}let me=j.dataset.beadId||"",Le=j.dataset.lane||"";B={bead_id:me,from_lane:Le};try{f.dataTransfer?.setData("text/plain",me),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function he(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;let j=w.dataset.lane||"";j!=="candidate"&&j!=="queue"&&!/^s[1-5]$/.test(j)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),w.classList.add("worker-pane--drag-over"))}function Ne(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function At(f,w){let j=Y.find(ot=>ot.id===f);if(!j)return;let me=Y.filter(ot=>ot.id!==f),Le=me.length;if(w){let ot=w.dataset.beadId;if(ot===f)return;let Ve=me.findIndex(A=>A.id===ot);Ve>=0&&(Le=Ve)}let pt=me.slice();pt.splice(Le,0,j),D.applyReorder(f,pt,Le)}function Ft(f){let w=f.target?.closest?.(".worker-pane");if(!w)return;f.preventDefault(),w.classList.remove("worker-pane--drag-over");let j=w.dataset.lane||"",me=B?.bead_id||f.dataTransfer?.getData("text/plain")||"",Le=B?.from_lane||"";if(B=null,!me)return;let pt=f.target?.closest?.(".worker-mini, .worker-card"),ot=Array.from(w.querySelectorAll(".worker-mini, .worker-card")),Ve=ot.length;if(pt){let A=ot.indexOf(pt);A>=0&&(Ve=A)}if(Ve=Math.max(0,Ve-w.querySelectorAll(".worker-mini--ghost").length),w.classList.contains("worker-pane--collapsed")&&(Ve=Ge()),j==="candidate"){if(Le==="candidate"){At(me,pt);return}(Le==="queue"||/^s[1-5]$/.test(Le))&&mt(me);return}if(j==="queue"||/^s[1-5]$/.test(j)){let A=j==="queue"?"parallel":j;Le===j?_t(me,A,Ve):dt(me,A)}}function wt(f){le=f,rv(f),Ze()}function jt(f){G=If(f),iv(G),Ze()}function tn(f){L=Un(f),cv(L),b?.(L),Ze()}function ln(f){let w=f.target?.closest?.(".worker-serial-lane-count");if(w){let Ve=Number.parseInt(w.value,10);Number.isFinite(Ve)&&Ae(Ve).then(Ze);return}let j=f.target?.closest?.(".worker-filter__blocked");if(j){wt({...le,show_blocked:j.checked});return}let me=f.target?.closest?.(".worker-done-range");if(me){tn(me.value);return}let Le=f.target?.closest?.(".worker-sort");if(Le){jt(Le.value||kl);return}let pt=f.target?.closest?.(".worker-slots__input");if(!pt)return;let ot=Number.parseInt(pt.value,10);if(!Number.isFinite(ot)){Ze();return}_e(ot).then(Ze)}function wn(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function Bt(){let f=be();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function En(){ce&&Me.close(),ft.hidden=!1,gt.hidden=!1,Qe.open(Bt()),Ze()}function kn(f){let w=Q(),j=w.attempts?w.attempts[f]:null;ce=f,Oe=null,Qe.close(),ft.hidden=!0,gt.hidden=!1,Me.open({attempt_id:f,meta:wn(j)}),Ze()}function nr(f,w){ce=null,Oe=f,Qe.close(),ft.hidden=!0,gt.hidden=!1,Me.open({attempt_id:f,meta:w,hide_prompt:!0}),Ze()}function S(){if(Qe.isOpen()&&Qe.refresh(Bt()),Oe){let j=(o?.get()?.runs||[]).find(me=>me.run_id===Oe);j?Me.updateMeta(yl(j)):Me.close();return}if(!ce)return;let f=Q(),w=f.attempts?f.attempts[ce]:null;if(w){Me.updateMeta(wn(w));return}Me.close()}function O(f,w){if(f.length===0||!l)return;let j=u?u():void 0;if(w.length===0||!j||w===j||!d){l(f);return}Promise.resolve(d(w)).then(()=>{l(f)}).catch(()=>{de("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error",2400)})}function qe(f){let w=f.target;if(w?.closest?.(".worker-mini__serial, .worker-mini__grip")||w?.closest?.("#worker-parallel-analysis-dialog"))return;let j=w?.closest?.(".worker-dep__open");if(j){O(j.getAttribute("data-dep-id")||"",j.getAttribute("data-root-dir")||"");return}let me=w?.closest?.(".mon-overlap__chip");if(me){let Fe=me.closest("[data-bead-id]"),Et=Fe&&Fe.getAttribute("data-bead-id")||"";if(Et){let $n=me.getAttribute("data-overlap-id")||"";N=!!N&&N.bead_id===Et&&N.counterpart_id===$n?null:{bead_id:Et,counterpart_id:$n},Ze()}return}let Le=w?.closest?.(".mon-overlap__place");if(Le){let Fe=Le.closest("[data-bead-id]"),Et=Fe&&Fe.getAttribute("data-bead-id")||"";Et&&Ke(Et,Le.getAttribute("data-counterpart-id")||"");return}if(w?.closest?.(".mon-overlap__popover"))return;if(w?.closest?.(".worker-analysis-btn")){re?.open();return}if(w?.closest?.(".worker-repo-strip")||w?.closest?.(".worker-mini__timeline")){En();return}let pt=w?.closest?.(".worker-repo-op__session");if(pt){let Fe=pt.dataset.attemptId;Fe&&kn(Fe);return}let ot=w?.closest?.(".worker-repo-op__resolve");if(ot){R(ot.dataset.operationId||"");return}let Ve=w?.closest?.(".worker-repo-op__dismiss");if(Ve){X(Ve.dataset.operationId||"");return}let A=w?.closest?.(".worker-cleanup__resume");if(A){let Fe=A.dataset.beadId;Fe&&Xe(Fe);return}let oe=w?.closest?.(".worker-banner__resume");if(oe){let Fe=oe.dataset.attemptId;Fe&&Kt(Fe);return}let F=w?.closest?.(".worker-banner__discard");if(F){let Fe=F.dataset.confirmation==="merged"?"merged":"unmerged";E(F.dataset.beadId||"",F.dataset.attemptId||null,Fe,F.dataset.operationId||null);return}let Ee=w?.closest?.(".worker-banner__dismiss");if(Ee){let Fe=Ee.dataset.attemptId;Fe&&Ht(Fe);return}if(w?.closest?.(".worker-play")){x(!Q().auto_advance);return}let rt=w?.closest?.(".worker-merge-all");if(rt){rt.classList.contains("worker-merge-all--stop")?Q().auto_merge===!0?P(!1):ve():P(!0);return}let ut=w?.closest?.(".worker-pane__hd--toggle");if(ut){let Fe=ut.dataset.lane;(Fe==="queue"||Fe==="done")&&on(Fe);return}let $t=w?.closest?.(".worker-card__place-lane");if($t){let Fe=$t.dataset.beadId,Et=$t.dataset.lane;Fe&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(K=null,Ze(),dt(Fe,Et));return}if(w?.closest?.(".worker-card__place-cancel")){K=null,Ze();return}let Ut=w?.closest?.(".worker-card__place");if(Ut){let Fe=Ut.dataset.beadId;Fe&&!Ut.disabled&&(je()?(K=Fe,Ze()):dt(Fe,"parallel"));return}let p=w?.closest?.(".worker-filter__chip");if(p){let Fe=p.dataset.spec;(Fe==="all"||Fe==="with"||Fe==="without")&&wt({...le,spec:Fe});return}let g=w?.closest?.(".worker-mini__merge");if(g){let Fe=g.dataset.beadId||"";Q().cleanup_failed?.[Fe]?Xe(Fe):Lt(Fe);return}let y=w?.closest?.(".worker-mini__merge-cancel");if(y){J(y.dataset.beadId||"");return}let $=w?.closest?.(".worker-mini__discard");if($){E($.dataset.beadId||"",$.dataset.attemptId||null,$.dataset.discardMode==="merged"?"merged":"unmerged",$.dataset.operationId||null);return}let W=w?.closest?.(".worker-mini__stale-continue");if(W){H("worker-stale-work-continue",W.dataset.beadId||"",W.dataset.actionId||"");return}let V=w?.closest?.(".worker-mini__stale-backup");if(V){H("worker-stale-work-backup-fresh",V.dataset.beadId||"",V.dataset.actionId||"");return}let se=w?.closest?.(".worker-mini__stale-recheck");if(se){H("worker-stale-work-recheck",se.dataset.beadId||"",se.dataset.actionId||"");return}let ye=w?.closest?.(".worker-mini__revise-fix");if(ye){Re("worker-revise-fix",ye.dataset.beadId||"");return}let et=w?.closest?.(".worker-mini__revise-approve");if(et){Re("worker-revise-approve",et.dataset.beadId||"");return}if(w?.closest?.(".worker-mini__pr"))return;if(w?.closest?.(".rtile__discard")){let Fe=w?.closest?.(".rtile"),Et=Fe?.dataset?.beadId,$n=Fe?.dataset?.attemptId;Et&&E(Et,$n||null,"unmerged",w?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(w?.closest?.(".rtile__dismiss")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Ht(Et);return}if(w?.closest?.(".rtile__pause")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Pt(Et);return}if(w?.closest?.(".rtile__resume")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&Kt(Et);return}if(w?.closest?.(".rtile__session")){let Et=w?.closest?.(".rtile")?.dataset?.attemptId;Et&&kn(Et);return}if(w?.closest?.(".worker-drawer-overlay__backdrop")){Qe.close(),Me.close();return}if(w?.closest?.(".worker-drawer-host"))return;let ct=w?.closest?.(".rtile .board-card__roll-toggle");if(ct){let Fe=ct.dataset.rollParent;Fe&&($e.has(Fe)?$e.delete(Fe):$e.add(Fe),Ze());return}let nn=w?.closest?.(".rtile .board-card__roll-child");if(nn){let Fe=nn.dataset.childId;Fe&&l&&l(Fe);return}let Ot=w?.closest?.(".rtile");if(Ot){if(w?.closest?.(".rtile__id")){let Et=Ot.dataset.beadId;Et&&xn(Et).then($n=>{$n?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Fe=Ot.dataset.beadId;Fe&&l&&l(Fe);return}let Tn=w?.closest?.(".worker-mini, .worker-card");if(Tn){let Fe=Tn.dataset.beadId;if(w?.closest?.(".worker-mini__id, .worker-card__id")){Fe&&xn(Fe).then($n=>{$n?de("\uBCF5\uC0AC\uB428","success",1200):de("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Et=w?.closest?.(".ctl-chip--from");if(Et){let $n=Et.dataset.fromId;$n&&l&&l($n);return}Fe&&l&&l(Fe)}}e.addEventListener("pointerdown",Pe),e.addEventListener("dragstart",C),e.addEventListener("dragover",he),e.addEventListener("dragleave",Ne),e.addEventListener("drop",Ft),e.addEventListener("click",qe),e.addEventListener("change",ln);function ze(f){if(!N)return;let w=f.target;w&&typeof w.closest=="function"&&w.closest(".mon-overlap__popover, .mon-overlap__chip")||(N=null,Ze())}function lt(f){f.key!=="Escape"||!N||(N=null,Ze())}return document.addEventListener("click",ze),document.addEventListener("keydown",lt),ne.push(()=>{document.removeEventListener("click",ze),document.removeEventListener("keydown",lt)}),gn(),k&&ne.push(k.subscribe(()=>{for(let[f,w]of I)w==="failed"&&I.delete(f);Ze()})),s&&ne.push(s.subscribe(()=>{let f=u&&u()||"";f!==bt&&(bt=f,st.close()),Ze(),S()})),o&&typeof o.subscribe=="function"&&ne.push(o.subscribe(()=>{S(),Ze()})),Ze(),{load(){Se(),Ze()},refreshSessionDefaults:Ye,destroy(){for(let f of ne.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Pe),e.removeEventListener("dragstart",C),e.removeEventListener("dragover",he),e.removeEventListener("dragleave",Ne),e.removeEventListener("drop",Ft),e.removeEventListener("click",qe),e.removeEventListener("change",ln);try{Me.destroy()}catch{}gt.hidden=!0;try{re?.destroy()}catch{}try{st.destroy()}catch{}at(c``,e)}}}function xl(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Df(e,t,n,r=async()=>{},s=async()=>{}){let o=Gt("views:workspace-picker"),a=null,i=!1,l=!1,u=!1;async function d(G){let I=G.target.value,xe=t.getState().workspace?.current?.path||"";if(I&&I!==xe){o("switching workspace to %s",I),i=!0,M();try{await n(I)}catch(ke){o("workspace switch failed: %o",ke)}finally{i=!1,M()}}}async function _(){let G=t.getState(),L=G.workspace?.current?.path||G.workspace?.available?.[0]?.path||"";if(!(!L||l)){o("git-pulling workspace %s",L),l=!0,M();try{await r(L)}catch(I){o("workspace git pull failed: %o",I)}finally{l=!1,M()}}}function h(G){let L=G.target;L&&e.contains(L)||D()}function b(G){G.key==="Escape"&&D()}function k(){u||(u=!0,document.addEventListener("mousedown",h),document.addEventListener("keydown",b),M())}function D(){u&&(u=!1,document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),M())}function B(){u?D():k()}async function Y(G){let L=G.target,I=L.value,te=L.checked;o("toggling visibility %s \u2192 %s",I,String(te));try{await s(I,te)}catch(xe){o("workspace visibility toggle failed: %o",xe)}}function le(G){return G?c`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${_}
        ?disabled=${i||l}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:c``}function K(G,L){return c`
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
                ${G.map(I=>c`
                    <label
                      class="workspace-picker__manage-row"
                      title="${I.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${I.path}"
                        .checked=${!L.has(I.path)}
                        @change=${Y}
                      />
                      <span class="workspace-picker__manage-name"
                        >${xl(I.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function N(){let G=t.getState(),L=G.workspace?.current,I=G.workspace?.available||[],te=new Set(G.workspace?.hidden||[]),xe=L?.path||I[0]?.path||"";if(I.length===0)return c``;let ke=I.filter(fe=>!te.has(fe.path)||fe.path===xe);if(ke.length<=1){let fe=ke[0]||I[0],ae=xl(fe.path);return c`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${fe.path}"
            >${ae}</span
          >
          ${K(I,te)}
          ${le(xe)}
          ${l?c`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return c`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||l}
          aria-label="Select project workspace"
        >
          ${ke.map(fe=>c`
              <option
                value="${fe.path}"
                ?selected=${fe.path===xe}
                title="${fe.path}"
              >
                ${xl(fe.path)}
              </option>
            `)}
        </select>
        ${K(I,te)}
        ${le(xe)}
        ${i||l?c`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function M(){at(N(),e)}return M(),a=t.subscribe(()=>M()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",h),document.removeEventListener("keydown",b),at(c``,e)}}}var Nf=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","get-workspace-accounts","set-workspace-accounts","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","get-session-refs","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"];function Al(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function qf(e,t,n=Al()){return{id:n,type:e,payload:t}}function Ff(e={}){let t=Gt("ws"),n={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},r=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,l=!0,u=new Map,d=[],_=new Map,h=new Set;function b(N){for(let M of Array.from(h))try{M(N)}catch{}}function k(){if(!l||i)return;o="reconnecting",t("ws reconnecting\u2026"),b(o);let N=Math.min(n.maxMs||0,(n.initialMs||0)*Math.pow(n.factor||1,a)),M=(n.jitterRatio||0)*N,G=Math.max(0,Math.round(N+(Math.random()*2-1)*M));t("ws retry in %d ms (attempt %d)",G,a+1),i=setTimeout(()=>{i=null,K()},G)}function D(N){try{s?.send(JSON.stringify(N))}catch(M){t("ws send failed",M)}}function B(){for(o="open",t("ws open"),b(o),a=0;d.length;){let N=d.shift();N&&D(N)}}function Y(N){let M;try{M=JSON.parse(String(N.data))}catch{t("ws received non-JSON message");return}if(!M||typeof M.id!="string"||typeof M.type!="string"){t("ws received invalid envelope");return}if(u.has(M.id)){let L=u.get(M.id);u.delete(M.id),M.ok?L?.resolve(M.payload):L?.reject(M.error||new Error("ws error"));return}let G=_.get(M.type);if(G&&G.size>0)for(let L of Array.from(G))try{L(M.payload)}catch(I){t("ws event handler error",I)}else t("ws received unhandled message type: %s",M.type)}function le(){o="closed",t("ws closed"),b(o);for(let[N,M]of u.entries())M.reject(new Error("ws disconnected")),u.delete(N);a+=1,k()}function K(){if(!l)return;let N=r();try{s=new WebSocket(N),t("ws connecting %s",N),o="connecting",b(o),s.addEventListener("open",B),s.addEventListener("message",Y),s.addEventListener("error",()=>{}),s.addEventListener("close",le)}catch(M){t("ws connect failed %o",M),k()}}return K(),{send(N,M){if(!Nf.includes(N))return Promise.reject(new Error(`unknown message type: ${N}`));let G=Al(),L=qf(N,M,G);return t("send %s id=%s",N,G),new Promise((I,te)=>{u.set(G,{resolve:I,reject:te,type:N}),s&&s.readyState===s.OPEN?D(L):(t("queue %s id=%s (state=%s)",N,G,o),d.push(L))})},on(N,M){_.has(N)||_.set(N,new Set);let G=_.get(N);return G?.add(M),()=>{G?.delete(M)}},onConnection(N){return h.add(N),()=>{h.delete(N)}},reconnect(){l=!0,i&&(clearTimeout(i),i=null),a=0,K()},close(){l=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function Cv(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function Rv(e,t){try{let r=await(await fetch("/api/config")).json();e.setState({config:r})}catch(n){t("config refresh failed",n)}}var Sl=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],jf=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],pr="tab:worker:closed",Ov="bdui.worker.done-range",Bf=jp,Uf="worker:queue",Wf="worker:parallel-analysis",zf="ui:order",Hf="ui:display-policy",Gf="exec:presets",fr="tab:board:closed",Kf="beads-ui.board.closed-range";function Lv(e){let t=Gt("main");t("bootstrap start");let n=c`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;at(n,e);let r=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),l=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&af(a),i&&l&&u&&d){let ne=function(S,O){let qe="Request failed",ze="";if(S&&typeof S=="object"){let f=S;if(typeof f.message=="string"&&f.message.length>0&&(qe=f.message),typeof f.details=="string")ze=f.details;else if(f.details&&typeof f.details=="object")try{ze=JSON.stringify(f.details,null,2)}catch{ze=""}}else typeof S=="string"&&S.length>0&&(qe=S);let lt=O&&O.length>0?`Failed to load ${O}`:"Request failed";z.open(lt,qe,ze)},je=function(S){return`${tt.getState().workspace.current?.path||""}\0${S}`},it=function(){Oe&&(Oe().catch(()=>{}),Oe=null),Me=null,Qe=null},we=function(S){st=S;let O=()=>{st!==S||tt.getState().selected_id!==S||(st=null,We(S))};if(!re){yt.then(O);return}O()},mt=function(S,O,qe,ze,lt){return qe!==_t[O]?(lt().catch(()=>{}),!1):(S.set(ze,lt),!0)},Kt=function(){let S=tt.getState();De(S.view==="board"),Re(S.view==="worker"),Ae(S.view==="monitor"),R(S.view==="board"||S.view==="worker"||Pt||!!S.selected_id)},Lt=function(){let S=yr(Ht);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},Xe=function(){let S=yr(Ct);return S===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:S}}},De=function(S){if(S)for(let[O,qe]of Sl){if(Ge.has(O)||dt.has(O))continue;let ze=O===fr?Lt():{type:qe};try{ue.register(O,ze)}catch(w){t("register %s store failed: %o",O,w)}dt.add(O);let lt=_t.board,f=!1;Ye.subscribeList(O,ze).then(w=>{f=!mt(Ge,"board",lt,O,w)}).catch(w=>{t("subscribe %s failed: %o",O,w),ne(w,"board")}).finally(()=>{dt.delete(O),f&&Kt()})}else ve()},ve=function(){_t.board+=1;for(let[S]of Sl){let O=Ge.get(S);O&&(O().catch(()=>{}),Ge.delete(S));try{ue.unregister(S)}catch(qe){t("unregister %s failed: %o",S,qe)}}},Re=function(S){if(!S){x();return}for(let[O,qe]of jf){if(E.has(O)||dt.has(O))continue;let ze=O===pr?Xe():{type:qe};try{ue.register(O,ze)}catch(w){t("register %s store failed: %o",O,w)}dt.add(O);let lt=_t.worker,f=!1;Ye.subscribeList(O,ze).then(w=>{f=!mt(E,"worker",lt,O,w)}).catch(w=>{t("subscribe %s failed: %o",O,w),ne(w,"worker")}).finally(()=>{dt.delete(O),f&&Kt()})}},x=function(){_t.worker+=1;for(let[S]of jf){let O=E.get(S);O&&(O().catch(()=>{}),E.delete(S));try{ue.unregister(S)}catch(qe){t("unregister %s failed: %o",S,qe)}}},R=function(S){if(!S){X();return}H||(Se("subscribe-worker-queue",{id:Uf}).catch(O=>{t("subscribe-worker-queue failed: %o",O)}),Se("subscribe-worker-parallel-analysis",{id:Wf}).catch(O=>{t("subscribe-worker-parallel-analysis failed: %o",O)}),H=()=>(Se("unsubscribe-worker-parallel-analysis",{id:Wf}),Se("unsubscribe-worker-queue",{id:Uf})))},X=function(){H&&(H().catch(()=>{}),H=null),gt.clear()},Ae=function(S){if(!S){v();return}_e||(Se("subscribe-monitor-pipeline",{id:Bf}).catch(O=>{t("subscribe-monitor-pipeline failed: %o",O)}),_e=()=>Se("unsubscribe-monitor-pipeline",{id:Bf}))},v=function(){_e&&(_e().catch(()=>{}),_e=null)},ie=function(){U||(Se("subscribe-ui-order",{id:zf}).catch(S=>{t("subscribe-ui-order failed: %o",S)}),U=()=>Se("unsubscribe-ui-order",{id:zf}))},Ke=function(){U&&(U().catch(()=>{}),U=null),xt.clear()},be=function(){Be||(Se("subscribe-display-policy",{id:Hf}).catch(S=>{t("subscribe-display-policy failed: %o",S)}),Be=()=>Se("unsubscribe-display-policy",{id:Hf}))},Rt=function(){Be&&(Be().catch(()=>{}),Be=null),ft.clear()},ht=function(){vt||(Se("subscribe-impl-presets",{id:Gf}).catch(S=>{t("subscribe-impl-presets failed: %o",S)}),vt=()=>Se("unsubscribe-impl-presets",{id:Gf}))},Xt=function(S){if(!S)return"Unknown";let O=S.split("/").filter(Boolean);return O.length>0?O[O.length-1]:"Unknown"},tn=function(S,O){jt.open(S.path,{missing_state:S.missing_state,...O?{workspace:O}:{}})};var _=ne,h=je,b=it,k=we,D=mt,B=Kt,Y=Lt,le=Xe,K=De,N=ve,M=Re,G=x,L=R,I=X,te=Ae,xe=v,ke=ie,fe=Ke,ae=be,Te=Rt,Ie=ht,$e=Xt,ee=tn;let Z=document.getElementById("header-loading"),Ce=Wc(Z),z=Id(e),ge=Ff(),Se=Ce.wrapSend((S,O)=>ge.send(S,O)),Ye=Mc(Se),ue=Dc(),Ue=Fc(),gt=qc(),St=wc(),xt=Nc(),ft=yc(),T=vc(),ce=kc();ge.on("impl-presets-snapshot",S=>{let O=S;O&&typeof O.revision=="number"&&Array.isArray(O.presets)&&T.set({revision:O.revision,presets:O.presets})}),ge.on("monitor-pipeline-snapshot",S=>{let O=S;if(!(!O||!Array.isArray(O.workspaces)))try{St.set(O.workspaces,O.workspaces_state,O.cross_lanes)}catch{}}),ge.on("ui-order-snapshot",S=>{let O=S;if(O&&typeof O.revision=="number")try{xt.set({revision:O.revision,order:O.order&&typeof O.order=="object"?O.order:{}})}catch{}}),ge.on("display-policy-snapshot",S=>{let O=S;if(O&&O.policy&&typeof O.policy=="object")try{ft.set(O.policy)}catch{}}),ge.on("session-log-snapshot",S=>{let O=S;if(O&&typeof O.id=="string")try{ce.set(O.id,Array.isArray(O.lines)?O.lines:[],typeof O.last_event_at=="number"?O.last_event_at:null)}catch{}}),ge.on("session-log-append",S=>{let O=S;if(O&&typeof O.id=="string")try{ce.append(O.id,O.event)}catch{}}),ge.on("snapshot",S=>{let O=S,qe=O&&typeof O.id=="string"?O.id:"",ze=qe?ue.getStore(qe):null;if(ze&&O&&O.type==="snapshot")try{ze.applyPush(O)}catch{}}),ge.on("upsert",S=>{let O=S,qe=O&&typeof O.id=="string"?O.id:"",ze=qe?ue.getStore(qe):null;if(ze&&O&&O.type==="upsert")try{ze.applyPush(O)}catch{}}),ge.on("delete",S=>{let O=S,qe=O&&typeof O.id=="string"?O.id:"",ze=qe?ue.getStore(qe):null;if(ze&&O&&O.type==="delete")try{ze.applyPush(O)}catch{}});let Oe=null,Me=null,Qe=null,st=null,bt=()=>{},yt=new Promise(S=>{bt=()=>S(void 0)}),re=!1,Q=!1;async function We(S){let O=je(S);if(O===Me||O===Qe)return;Qe=O;let qe=`detail:${S}`,ze={type:"issue-detail",params:{id:S}};try{ue.register(qe,ze)}catch(lt){t("register detail store failed: %o",lt)}try{let lt=await Ye.subscribeList(qe,ze);if(tt.getState().selected_id!==S||je(S)!==O){await lt().catch(()=>{});return}Oe&&await Oe().catch(()=>{}),Oe=lt,Me=O}catch(lt){t("detail subscribe failed: %o",lt),ne(lt,"issue details")}finally{Qe===O&&(Qe=null)}}let Ge=new Map,dt=new Set,_t={board:0,worker:0},Pt=!1,Ht=_o;try{let S=window.localStorage.getItem(Kf);Xa(S)&&(Ht=S)}catch{}let Ct="today";try{let S=window.localStorage.getItem(Ov);S!==null&&(Ct=Un(S))}catch{}async function P(S){if(!Xa(S)||S===Ht)return;Ht=S;try{window.localStorage.setItem(Kf,S)}catch{}let O=Ge.get(fr);if(!O)return;Ge.delete(fr),await O().catch(()=>{});let qe=Lt();try{ue.register(fr,qe)}catch(ze){t("register %s store failed: %o",fr,ze)}try{let ze=await Ye.subscribeList(fr,qe);Ge.set(fr,ze)}catch(ze){t("re-subscribe %s failed: %o",fr,ze),ne(ze,"board")}}async function J(S){let O=Un(S);if(O===Ct)return;Ct=O;let qe=E.get(pr);if(!qe)return;E.delete(pr),await qe().catch(()=>{});let ze=Xe();try{ue.register(pr,ze)}catch(lt){t("register %s store failed: %o",pr,lt)}try{let lt=await Ye.subscribeList(pr,ze);E.set(pr,lt)}catch(lt){t("re-subscribe %s failed: %o",pr,lt),ne(lt,"worker")}}let E=new Map,H=null,_e=null,U=null,Be=null,vt=null;async function Qt(){Be=null,ft.clear(),vt=null,T.clear(),H=null,_e=null,Ge.clear(),E.clear(),_t.board+=1,_t.worker+=1,ht();let S=tt.getState().workspace.current?.path;if(S)try{await ge.send("set-workspace",{path:S})}catch(qe){t("workspace restore after reconnect failed: %o",qe);return}be();let O=tt.getState();De(O.view==="board"),Re(O.view==="worker"),Ae(O.view==="monitor"),R(O.view==="board"||O.view==="worker"||!!O.selected_id)}async function qt(){t("clearing all subscriptions for workspace switch"),ve(),x(),X(),Ue.clear(),Ke(),ie(),Rt(),be(),it();let S=tt.getState();if(S.selected_id)try{ue.unregister(`detail:${S.selected_id}`)}catch{}let O=tt.getState();De(O.view==="board"),Re(O.view==="worker"),Ae(O.view==="monitor"),R(O.view==="board"||O.view==="worker"||!!O.selected_id),O.selected_id&&we(O.selected_id)}async function an(S){t("requesting workspace switch to %s",S),Q=!0;try{let O=await ge.send("set-workspace",{path:S});t("workspace switch result: %o",O),O&&O.workspace&&(tt.setState({workspace:{current:{path:O.workspace.root_dir,database:O.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",S),O.changed&&(await qt(),de("Switched to "+Xt(S),"success",2e3)))}catch(O){throw t("workspace switch failed: %o",O),de("Failed to switch workspace","error",3e3),O}finally{Q=!1}}async function en(S){t("requesting workspace git pull for %s",S);try{let O=await ge.send("git-pull-workspace",{});t("workspace git pull result: %o",O);let qe=O?.status;if(qe==="up_to_date"){de("Already up to date","success",2e3);return}if(qe==="stash_pop_conflict"){de("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}de("Git pulled "+Xt(S),"success",2e3)}catch(O){t("workspace git pull failed: %o",O);let qe=O?.code,ze=O?.message;if(qe==="rebase_conflict"){de("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(qe==="rebase_conflict_abort_failed"){de("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(qe==="busy"){de("Git pull skipped: another operation is running","warning",3e3);return}let lt=ze?`: ${ze}`:"";throw de(`Git pull failed${lt}`,"error",3e3),O}}async function rn(S,O){t("setting workspace visibility %s \u2192 %s",S,String(O));try{await ge.send("set-workspace-visibility",{path:S,visible:O}),await on()}catch(qe){t("workspace visibility update failed: %o",qe),de("Failed to update project visibility","error",3e3)}}async function on(){try{let S=await ge.send("list-workspaces",{});if(t("workspaces loaded: %o",S),S&&Array.isArray(S.workspaces)){let O=S.workspaces.map(f=>({path:f.path,database:f.database,pid:f.pid,version:f.version})),qe=S.current?{path:S.current.root_dir,database:S.current.db_path}:null,ze=Array.isArray(S.hidden)?S.hidden.filter(f=>typeof f=="string"):[];tt.setState({workspace:{current:qe,available:O,hidden:ze}});let lt=window.localStorage.getItem("beads-ui.workspace");lt&&(!O.some(w=>w.path===lt)||ze.includes(lt)?window.localStorage.removeItem("beads-ui.workspace"):qe&&lt!==qe.path&&(t("restoring saved workspace preference: %s",lt),await an(lt)))}}catch(S){t("failed to load workspaces: %o",S)}}ge.on("workspace-changed",S=>{t("workspace-changed event: %o",S),S&&S.root_dir&&(tt.setState({workspace:{current:{path:S.root_dir,database:S.db_path}}}),on(),qt())});let Ze=!1;if(typeof ge.onConnection=="function"){let S=O=>{t("ws state %s",O),O==="reconnecting"||O==="closed"?(Ze=!0,de("Connection lost. Reconnecting\u2026","error",4e3)):O==="open"&&Ze&&(Ze=!1,de("Reconnected","success",2200),Rv(tt,(qe,ze)=>{t(`${qe}: %o`,ze)}),Qt())};ge.onConnection(S)}let gn="board";try{let S=window.localStorage.getItem("beads-ui.view");(S==="board"||S==="worker"||S==="monitor")&&(gn=S)}catch(S){t("view parse error: %o",S)}let tt=Uc({config:Cv(),view:gn});ge.on("worker-queue-snapshot",S=>{let O=S;if(!O||!O.queue)return;let qe=tt.getState().workspace.current?.path;if(typeof qe=="string"&&qe.length>0&&O.root_dir!==qe){t("dropping worker-queue snapshot for %s",String(O.root_dir));return}try{Ue.set(O.queue)}catch{}}),ge.on("worker-parallel-analysis-snapshot",S=>{let O=S;if(!O)return;let qe=tt.getState().workspace.current?.path;if(!(typeof qe=="string"&&qe.length>0&&typeof O.root_dir=="string"&&O.root_dir!==qe))try{gt.set({settings:O.settings,job:O.job??null,runs:Array.isArray(O.runs)?O.runs:[],last_good:O.last_good??null})}catch{}});let Pe=jc(tt);Pe.start();let C=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults","monitor-lane-create","monitor-lane-update","monitor-lane-confirm","monitor-lane-remove"]),he=async(S,O)=>{try{return await Se(S,O)}catch(qe){if(C.has(S))throw qe;return[]}};Up({global_element:r,repo_element:s},tt,Pe);let Ne=document.getElementById("workspace-picker");Ne&&Df(Ne,tt,an,en,rn);let At=Gp(e,(S,O)=>Se(S,O));try{let S=document.getElementById("new-issue-btn");S&&S.addEventListener("click",()=>At.open())}catch{}let Ft=Zp(e,{policyStore:ft,queueStore:Ue,implPresetStore:T,transport:(S,O)=>Se(S,O),onOpenChange:S=>{let O=Pt;Pt=S,Kt(),O&&S===!1&&wn.refreshSessionDefaults()},labelOptions:()=>{let S=new Set;for(let[O]of Sl)for(let qe of ue.snapshotFor(O)||[]){let ze=qe.labels;if(Array.isArray(ze))for(let lt of ze)typeof lt=="string"&&lt.length>0&&S.add(lt)}return Array.from(S).sort()}});try{let S=document.getElementById("display-settings-btn");S&&(S.setAttribute("aria-label","\uC124\uC815"),S.setAttribute("title","\uC124\uC815"),S.addEventListener("click",()=>Ft.open()))}catch{}let wt=document.createElement("div");wt.className="md-viewer-root",document.body.appendChild(wt);let jt=aa(wt,{getWorkspacePath:()=>tt.getState().workspace.current?.path}),ln=su(i,{gotoIssue:S=>Pe.gotoIssue(S),issueStores:ue,transport:he,workerQueueStore:Ue,uiOrderStore:xt,displayPolicyStore:ft,closedRange:Ht,onClosedRangeChange:S=>{P(S)},onNewIssue:()=>At.open(),openDoc:tn}),wn=$l(l,{transport:he,issueStores:ue,queueStore:Ue,analysisStore:gt,sessionLogStore:ce,uiOrderStore:xt,gotoIssue:S=>tt.setState({selected_id:S}),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:S=>an(S),openDoc:tn,doneRange:Ct,onDoneRangeChange:S=>{J(S)}}),Bt=Bp(u,{transport:he,pipelineStore:St,execPresetStore:T,sessionLogStore:ce,router:Pe,gotoIssue:S=>Pe.gotoIssue(S),getWorkspacePath:()=>tt.getState().workspace.current?.path,switchWorkspace:S=>an(S),openDoc:tn}),En=Ld(d,{issueStores:ue,transport:he,queueStore:Ue,execPresetStore:T,sessionLogStore:ce,getWorkspacePath:()=>tt.getState().workspace.current?.path,mdViewer:jt,onNavigate:S=>{tt.getState().view==="worker"?tt.setState({selected_id:S}):Pe.gotoIssue(S)},onClose:()=>{let S=tt.getState();tt.setState({selected_id:null});try{Pe.gotoView(S.view==="worker"||S.view==="monitor"?S.view:"board")}catch{}},onOpenExecPresets:()=>{Ft.open("execution")}}),kn=tt.getState().selected_id;kn&&(d.hidden=!1,En.load(kn),we(kn)),tt.subscribe(S=>{let O=S.selected_id;O?(d.hidden=!1,En.load(O),Q||we(O)):(En.clear(),d.hidden=!0,it())});let nr=S=>{i.hidden=S.view!=="board",l.hidden=S.view!=="worker",u.hidden=S.view!=="monitor",o&&o.classList.toggle("is-quiet",S.view==="monitor"),De(S.view==="board"),Re(S.view==="worker"),Ae(S.view==="monitor"),R(S.view==="board"||S.view==="worker"||Pt||!!S.selected_id),!S.selected_id&&S.view==="board"&&ln.load(),S.view==="worker"&&wn.load(),S.view==="monitor"?Bt.load():Bt.pause(),window.localStorage.setItem("beads-ui.view",S.view)};tt.subscribe(nr),nr(tt.getState()),ie(),be(),ht(),on().finally(()=>{re=!0,bt()}),window.addEventListener("keydown",S=>{let O=S.ctrlKey||S.metaKey,qe=String(S.key||"").toLowerCase(),ze=S.target,lt=ze&&ze.tagName?String(ze.tagName).toLowerCase():"",f=lt==="input"||lt==="textarea"||lt==="select"||ze&&typeof ze.isContentEditable=="boolean"&&ze.isContentEditable;O&&qe==="n"&&(f||(S.preventDefault(),At.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let n=window.localStorage.getItem("beads-ui.theme"),r=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=n==="dark"||n==="light"?n:r?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let n=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",n),window.localStorage.setItem("beads-ui.theme",n)});let t=document.getElementById("app");t&&Lv(t)});export{Lv as bootstrap,Cv as readBootstrapConfig,Rv as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
