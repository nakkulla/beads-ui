var Tp=Object.create;var Vo=Object.defineProperty;var Cp=Object.getOwnPropertyDescriptor;var Rp=Object.getOwnPropertyNames;var Ip=Object.getPrototypeOf,Op=Object.prototype.hasOwnProperty;var Lp=(e,t,r)=>t in e?Vo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ko=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Mp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Rp(t))!Op.call(e,s)&&s!==r&&Vo(e,s,{get:()=>t[s],enumerable:!(n=Cp(t,s))||n.enumerable});return e};var Pp=(e,t,r)=>(r=e!=null?Tp(Ip(e)):{},Mp(t||!e||!e.__esModule?Vo(r,"default",{value:e,enumerable:!0}):r,e));var $t=(e,t,r)=>Lp(e,typeof t!="symbol"?t+"":t,r);var ul=Ko((kb,cl)=>{var _n=1e3,mn=_n*60,gn=mn*60,Qr=gn*24,qp=Qr*7,Fp=Qr*365.25;cl.exports=function(e,t){t=t||{};var r=typeof e;if(r==="string"&&e.length>0)return jp(e);if(r==="number"&&isFinite(e))return t.long?Up(e):Bp(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))};function jp(e){if(e=String(e),!(e.length>100)){var t=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(t){var r=parseFloat(t[1]),n=(t[2]||"ms").toLowerCase();switch(n){case"years":case"year":case"yrs":case"yr":case"y":return r*Fp;case"weeks":case"week":case"w":return r*qp;case"days":case"day":case"d":return r*Qr;case"hours":case"hour":case"hrs":case"hr":case"h":return r*gn;case"minutes":case"minute":case"mins":case"min":case"m":return r*mn;case"seconds":case"second":case"secs":case"sec":case"s":return r*_n;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Bp(e){var t=Math.abs(e);return t>=Qr?Math.round(e/Qr)+"d":t>=gn?Math.round(e/gn)+"h":t>=mn?Math.round(e/mn)+"m":t>=_n?Math.round(e/_n)+"s":e+"ms"}function Up(e){var t=Math.abs(e);return t>=Qr?Ms(e,t,Qr,"day"):t>=gn?Ms(e,t,gn,"hour"):t>=mn?Ms(e,t,mn,"minute"):t>=_n?Ms(e,t,_n,"second"):e+" ms"}function Ms(e,t,r,n){var s=t>=r*1.5;return Math.round(e/r)+" "+n+(s?"s":"")}});var pl=Ko(($b,dl)=>{function Wp(e){r.debug=r,r.default=r,r.coerce=c,r.disable=a,r.enable=s,r.enabled=i,r.humanize=ul(),r.destroy=u,Object.keys(e).forEach(d=>{r[d]=e[d]}),r.names=[],r.skips=[],r.formatters={};function t(d){let p=0;for(let _=0;_<d.length;_++)p=(p<<5)-p+d.charCodeAt(_),p|=0;return r.colors[Math.abs(p)%r.colors.length]}r.selectColor=t;function r(d){let p,_=null,h,$;function L(...j){if(!L.enabled)return;let V=L,H=Number(new Date),P=H-(p||H);V.diff=P,V.prev=p,V.curr=H,p=H,j[0]=r.coerce(j[0]),typeof j[0]!="string"&&j.unshift("%O");let D=0;j[0]=j[0].replace(/%([a-zA-Z%])/g,(U,b)=>{if(U==="%%")return"%";D++;let B=r.formatters[b];if(typeof B=="function"){let ee=j[D];U=B.call(V,ee),j.splice(D,1),D--}return U}),r.formatArgs.call(V,j),(V.log||r.log).apply(V,j)}return L.namespace=d,L.useColors=r.useColors(),L.color=r.selectColor(d),L.extend=n,L.destroy=r.destroy,Object.defineProperty(L,"enabled",{enumerable:!0,configurable:!1,get:()=>_!==null?_:(h!==r.namespaces&&(h=r.namespaces,$=r.enabled(d)),$),set:j=>{_=j}}),typeof r.init=="function"&&r.init(L),L}function n(d,p){let _=r(this.namespace+(typeof p>"u"?":":p)+d);return _.log=this.log,_}function s(d){r.save(d),r.namespaces=d,r.names=[],r.skips=[];let p=(typeof d=="string"?d:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let _ of p)_[0]==="-"?r.skips.push(_.slice(1)):r.names.push(_)}function o(d,p){let _=0,h=0,$=-1,L=0;for(;_<d.length;)if(h<p.length&&(p[h]===d[_]||p[h]==="*"))p[h]==="*"?($=h,L=_,h++):(_++,h++);else if($!==-1)h=$+1,L++,_=L;else return!1;for(;h<p.length&&p[h]==="*";)h++;return h===p.length}function a(){let d=[...r.names,...r.skips.map(p=>"-"+p)].join(",");return r.enable(""),d}function i(d){for(let p of r.skips)if(o(d,p))return!1;for(let p of r.names)if(o(d,p))return!0;return!1}function c(d){return d instanceof Error?d.stack||d.message:d}function u(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}dl.exports=Wp});var fl=Ko((Zt,Ps)=>{Zt.formatArgs=Hp;Zt.save=Gp;Zt.load=Vp;Zt.useColors=zp;Zt.storage=Kp();Zt.destroy=(()=>{let e=!1;return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Zt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function zp(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let e;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(e=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(e[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Hp(e){if(e[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+e[0]+(this.useColors?"%c ":" ")+"+"+Ps.exports.humanize(this.diff),!this.useColors)return;let t="color: "+this.color;e.splice(1,0,t,"color: inherit");let r=0,n=0;e[0].replace(/%[a-zA-Z%]/g,s=>{s!=="%%"&&(r++,s==="%c"&&(n=r))}),e.splice(n,0,t)}Zt.log=console.debug||console.log||(()=>{});function Gp(e){try{e?Zt.storage.setItem("debug",e):Zt.storage.removeItem("debug")}catch{}}function Vp(){let e;try{e=Zt.storage.getItem("debug")||Zt.storage.getItem("DEBUG")}catch{}return!e&&typeof process<"u"&&"env"in process&&(e=process.env.DEBUG),e}function Kp(){try{return localStorage}catch{}}Ps.exports=pl()(Zt);var{formatters:Yp}=Ps.exports;Yp.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}}});var Fn=globalThis,Ts=Fn.trustedTypes,Ki=Ts?Ts.createPolicy("lit-html",{createHTML:e=>e}):void 0,Zo="$lit$",wr=`lit$${Math.random().toFixed(9).slice(2)}$`,Qo="?"+wr,Dp=`<${Qo}>`,Vr=document,jn=()=>Vr.createComment(""),Bn=e=>e===null||typeof e!="object"&&typeof e!="function",Xo=Array.isArray,el=e=>Xo(e)||typeof e?.[Symbol.iterator]=="function",Yo=`[ 	
\f\r]`,qn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yi=/-->/g,Zi=/>/g,Hr=RegExp(`>|${Yo}(?:([^\\s"'>=/]+)(${Yo}*=${Yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qi=/'/g,Xi=/"/g,tl=/^(?:script|style|textarea|title)$/i,Jo=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),l=Jo(1),fn=Jo(2),mb=Jo(3),or=Symbol.for("lit-noChange"),Ot=Symbol.for("lit-nothing"),Ji=new WeakMap,Gr=Vr.createTreeWalker(Vr,129);function rl(e,t){if(!Xo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ki!==void 0?Ki.createHTML(t):t}var nl=(e,t)=>{let r=e.length-1,n=[],s,o=t===2?"<svg>":t===3?"<math>":"",a=qn;for(let i=0;i<r;i++){let c=e[i],u,d,p=-1,_=0;for(;_<c.length&&(a.lastIndex=_,d=a.exec(c),d!==null);)_=a.lastIndex,a===qn?d[1]==="!--"?a=Yi:d[1]!==void 0?a=Zi:d[2]!==void 0?(tl.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=Hr):d[3]!==void 0&&(a=Hr):a===Hr?d[0]===">"?(a=s??qn,p=-1):d[1]===void 0?p=-2:(p=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?Hr:d[3]==='"'?Xi:Qi):a===Xi||a===Qi?a=Hr:a===Yi||a===Zi?a=qn:(a=Hr,s=void 0);let h=a===Hr&&e[i+1].startsWith("/>")?" ":"";o+=a===qn?c+Dp:p>=0?(n.push(u),c.slice(0,p)+Zo+c.slice(p)+wr+h):c+wr+(p===-2?i:h)}return[rl(e,o+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),n]},Un=class e{constructor({strings:t,_$litType$:r},n){let s;this.parts=[];let o=0,a=0,i=t.length-1,c=this.parts,[u,d]=nl(t,r);if(this.el=e.createElement(u,n),Gr.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=Gr.nextNode())!==null&&c.length<i;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Zo)){let _=d[a++],h=s.getAttribute(p).split(wr),$=/([.?@])?(.*)/.exec(_);c.push({type:1,index:o,name:$[2],strings:h,ctor:$[1]==="."?Rs:$[1]==="?"?Is:$[1]==="@"?Os:Yr}),s.removeAttribute(p)}else p.startsWith(wr)&&(c.push({type:6,index:o}),s.removeAttribute(p));if(tl.test(s.tagName)){let p=s.textContent.split(wr),_=p.length-1;if(_>0){s.textContent=Ts?Ts.emptyScript:"";for(let h=0;h<_;h++)s.append(p[h],jn()),Gr.nextNode(),c.push({type:2,index:++o});s.append(p[_],jn())}}}else if(s.nodeType===8)if(s.data===Qo)c.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(wr,p+1))!==-1;)c.push({type:7,index:o}),p+=wr.length-1}o++}}static createElement(t,r){let n=Vr.createElement("template");return n.innerHTML=t,n}};function Kr(e,t,r=e,n){if(t===or)return t;let s=n!==void 0?r._$Co?.[n]:r._$Cl,o=Bn(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(e),s._$AT(e,r,n)),n!==void 0?(r._$Co??(r._$Co=[]))[n]=s:r._$Cl=s),s!==void 0&&(t=Kr(e,s._$AS(e,t.values),s,n)),t}var Cs=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:n}=this._$AD,s=(t?.creationScope??Vr).importNode(r,!0);Gr.currentNode=s;let o=Gr.nextNode(),a=0,i=0,c=n[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new pn(o,o.nextSibling,this,t):c.type===1?u=new c.ctor(o,c.name,c.strings,this,t):c.type===6&&(u=new Ls(o,this,t)),this._$AV.push(u),c=n[++i]}a!==c?.index&&(o=Gr.nextNode(),a++)}return Gr.currentNode=Vr,s}p(t){let r=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,r),r+=n.strings.length-2):n._$AI(t[r])),r++}},pn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,n,s){this.type=2,this._$AH=Ot,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=n,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=Kr(this,t,r),Bn(t)?t===Ot||t==null||t===""?(this._$AH!==Ot&&this._$AR(),this._$AH=Ot):t!==this._$AH&&t!==or&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):el(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==Ot&&Bn(this._$AH)?this._$AA.nextSibling.data=t:this.T(Vr.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:n}=t,s=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=Un.createElement(rl(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===s)this._$AH.p(r);else{let o=new Cs(s,this),a=o.u(this.options);o.p(r),this.T(a),this._$AH=o}}_$AC(t){let r=Ji.get(t.strings);return r===void 0&&Ji.set(t.strings,r=new Un(t)),r}k(t){Xo(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,n,s=0;for(let o of t)s===r.length?r.push(n=new e(this.O(jn()),this.O(jn()),this,this.options)):n=r[s],n._$AI(o),s++;s<r.length&&(this._$AR(n&&n._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Yr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,n,s,o){this.type=1,this._$AH=Ot,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=o,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ot}_$AI(t,r=this,n,s){let o=this.strings,a=!1;if(o===void 0)t=Kr(this,t,r,0),a=!Bn(t)||t!==this._$AH&&t!==or,a&&(this._$AH=t);else{let i=t,c,u;for(t=o[0],c=0;c<o.length-1;c++)u=Kr(this,i[n+c],r,c),u===or&&(u=this._$AH[c]),a||(a=!Bn(u)||u!==this._$AH[c]),u===Ot?t=Ot:t!==Ot&&(t+=(u??"")+o[c+1]),this._$AH[c]=u}a&&!s&&this.j(t)}j(t){t===Ot?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Rs=class extends Yr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ot?void 0:t}},Is=class extends Yr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==Ot)}},Os=class extends Yr{constructor(t,r,n,s,o){super(t,r,n,s,o),this.type=5}_$AI(t,r=this){if((t=Kr(this,t,r,0)??Ot)===or)return;let n=this._$AH,s=t===Ot&&n!==Ot||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==Ot&&(n===Ot||s);s&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ls=class{constructor(t,r,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){Kr(this,t)}},sl={M:Zo,P:wr,A:Qo,C:1,L:nl,R:Cs,D:el,V:Kr,I:pn,H:Yr,N:Is,U:Os,B:Rs,F:Ls},Np=Fn.litHtmlPolyfillSupport;Np?.(Un,pn),(Fn.litHtmlVersions??(Fn.litHtmlVersions=[])).push("3.3.1");var Ye=(e,t,r)=>{let n=r?.renderBefore??t,s=n._$litPart$;if(s===void 0){let o=r?.renderBefore??null;n._$litPart$=s=new pn(t.insertBefore(jn(),o),o,void 0,r??{})}return s._$AI(e),s};var er="today",Mr=[{value:"today",label:"\uC624\uB298"},{value:"7d",label:"\uCD5C\uADFC 7\uC77C"},{value:"30d",label:"\uCD5C\uADFC 30\uC77C"},{value:"all",label:"\uC804\uCCB4"}];function ar(e){return e==="today"||e==="7d"||e==="30d"||e==="all"}function Zr(e,t=Date.now()){switch(e){case"today":{let r=new Date(t);return r.setHours(0,0,0,0),r.getTime()}case"7d":return t-7*864e5;case"30d":return t-30*864e5;case"all":default:return}}function ol(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function al(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function il(){let e=null,t=[],r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},getWorkspacesState(){return t},set(s,o){e=Array.isArray(s)?s:null,t=Array.isArray(o)?o:[],n()},clear(){e=null,t=[],n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function ll(){let e=new Map,t=new Set;function r(s){return s.startsWith("session-log:")?s:`session-log:${s}`}function n(){for(let s of Array.from(t))try{s()}catch{}}return{set(s,o,a=null){e.set(r(s),{lines:Array.isArray(o)?[...o]:[],last_event_at:typeof a=="number"?a:null}),n()},append(s,o){let a=r(s),i=e.get(a)||{lines:[],last_event_at:null};i.lines=[...i.lines,o],i.last_event_at=Date.now(),e.set(a,i),n()},get(s){return e.get(r(s))||null},clear(s){typeof s=="string"?e.delete(r(s)):e.clear(),n()},subscribe(s){return t.add(s),()=>t.delete(s)}}}var _l=Pp(fl(),1);function Tt(e){return(0,_l.default)(`beads-ui:${e}`)}function pr(e){if(typeof e=="number")return Number.isFinite(e)?e:0;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function Xr(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?1:-1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function hl(e,t){let r=pr(e.created_at),n=pr(t.created_at);if(r!==n)return r<n?-1:1;let s=e.priority??2,o=t.priority??2;if(s!==o)return s-o;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function bl(e,t){let r=pr(e.updated_at),n=pr(t.updated_at);if(r!==n)return r<n?1:-1;let s=e.id,o=t.id;return s<o?-1:s>o?1:0}function yl(e,t){let r=e.priority??2,n=t.priority??2;if(r!==n)return r-n;let s=pr(e.created_at),o=pr(t.created_at);if(s!==o)return s<o?1:-1;let a=e.id,i=t.id;return a<i?-1:a>i?1:0}function vl(e,t){let r=e.closed_at??0,n=t.closed_at??0;if(r!==n)return r<n?1:-1;let s=e?.id,o=t?.id;return s<o?-1:s>o?1:0}var Zp=/^(?:[A-Za-z][A-Za-z0-9]*(?:-[A-Za-z0-9]+)+\s+)?(?:Task|Phase|T)\s*(\d+)/i;function ml(e){let t=e&&e.metadata,r=t?t.task_order:void 0;if(r==null||r==="")return Number.POSITIVE_INFINITY;let n=Number(r);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function gl(e){let t=e&&e.title;if(typeof t!="string")return Number.POSITIVE_INFINITY;let r=Zp.exec(t);if(!r)return Number.POSITIVE_INFINITY;let n=Number(r[1]);return Number.isFinite(n)?n:Number.POSITIVE_INFINITY}function wl(e,t){let r=ml(e),n=ml(t);if(r!==n)return r<n?-1:1;let s=gl(e),o=gl(t);if(s!==o)return s<o?-1:1;let a=pr(e&&e.created_at),i=pr(t&&t.created_at);if(a!==i)return a<i?-1:1;let c=e&&e.id,u=t&&t.id;return c===u?0:String(c)<String(u)?-1:1}var ea=2**20;function hn(e,t){let r=e&&e.id;return t&&typeof r=="string"&&Object.prototype.hasOwnProperty.call(t,r)&&typeof t[r]=="number"&&Number.isFinite(t[r])?t[r]:-pr(e&&e.created_at)}function Ds(e){return(t,r)=>{let n=hn(t,e),s=hn(r,e);if(n!==s)return n<s?-1:1;let o=t?.id,a=r?.id;return o<a?-1:o>a?1:0}}function ta(e,t,r){let n=Array.isArray(e)?e:[],s=n.length,o=Math.max(0,Math.min(t,s-1)),a=o-1>=0?n[o-1]:null,i=o+1<s?n[o+1]:null;if(!a&&!i)return{rank:0};if(!a)return{rank:hn(i,r)-ea};if(!i)return{rank:hn(a,r)+ea};let c=hn(a,r),u=hn(i,r),d=(c+u)/2;return c<d&&d<u?{rank:d}:{renormalize:n.map((p,_)=>({bead_id:p.id,rank:_*ea}))}}function ra(e,t={}){let r=Tt(`issue-store:${e}`),n=new Map,s=[],o=0,a=new Set,i=!1,c=t.sort||Xr;function u(){for(let _ of Array.from(a))try{_()}catch{}}function d(){s=Array.from(n.values()).sort(c)}function p(_){if(i||!_||_.id!==e)return;let h=Number(_.revision)||0;if(r("apply %s rev=%d",_.type,h),!(h<=o&&_.type!=="snapshot")){if(_.type==="snapshot"){if(h<=o)return;n.clear();let $=Array.isArray(_.issues)?_.issues:[];for(let L of $)L&&typeof L.id=="string"&&L.id.length>0&&n.set(L.id,L);d(),o=h,u();return}if(_.type==="upsert"){let $=_.issue;if($&&typeof $.id=="string"&&$.id.length>0){let L=n.get($.id);if(!L)n.set($.id,$);else{let j=Number.isFinite(L.updated_at)?L.updated_at:0,V=Number.isFinite($.updated_at)?$.updated_at:0;if(j<=V){for(let H of Object.keys(L))H in $||delete L[H];for(let[H,P]of Object.entries($))L[H]=P}}d()}o=h,u()}else if(_.type==="delete"){let $=String(_.issue_id||"");$&&(n.delete($),d()),o=h,u()}}}return{id:e,subscribe(_){return a.add(_),()=>{a.delete(_)}},applyPush:p,snapshot(){return s},size(){return n.size},getById(_){return n.get(_)},dispose(){i=!0,n.clear(),s=[],a.clear(),o=0}}}function Ns(e){let t=String(e.type||"").trim(),r={};if(e.params&&typeof e.params=="object"){let s=Object.keys(e.params).sort();for(let o of s){let a=e.params[o];r[o]=String(a)}}let n=new URLSearchParams(r).toString();return n.length>0?`${t}?${n}`:t}function kl(e){let t=Tt("subs"),r=new Map,n=new Map;function s(i,c){t("applyDelta %s +%d ~%d -%d",i,(c.added||[]).length,(c.updated||[]).length,(c.removed||[]).length);let u=n.get(i);if(!u||u.size===0)return;let d=Array.isArray(c.added)?c.added:[],p=Array.isArray(c.updated)?c.updated:[],_=Array.isArray(c.removed)?c.removed:[];for(let h of Array.from(u)){let $=r.get(h);if(!$)continue;let L=$.itemsById;for(let j of d)typeof j=="string"&&j.length>0&&L.set(j,!0);for(let j of p)typeof j=="string"&&j.length>0&&L.set(j,!0);for(let j of _)typeof j=="string"&&j.length>0&&L.delete(j)}}async function o(i,c){let u=Ns(c);if(t("subscribe %s key=%s",i,u),!r.has(i))r.set(i,{key:u,itemsById:new Map});else{let p=r.get(i);if(p&&p.key!==u){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key)),r.set(i,{key:u,itemsById:new Map})}}n.has(u)||n.set(u,new Set);let d=n.get(u);d&&d.add(i);try{await e("subscribe-list",{id:i,type:c.type,params:c.params})}catch(p){let _=r.get(i)||null;if(_){let h=n.get(_.key);h&&(h.delete(i),h.size===0&&n.delete(_.key))}throw r.delete(i),p}return async()=>{t("unsubscribe %s key=%s",i,u);try{await e("unsubscribe-list",{id:i})}catch{}let p=r.get(i)||null;if(p){let _=n.get(p.key);_&&(_.delete(i),_.size===0&&n.delete(p.key))}r.delete(i)}}return{subscribeList:o,_applyDelta:s,_subKeyOf:Ns,selectors:{getIds(i){let c=r.get(i);return c?Array.from(c.itemsById.keys()):[]},has(i,c){let u=r.get(i);return u?u.itemsById.has(c):!1},count(i){let c=r.get(i);return c?c.itemsById.size:0},getItemsById(i){let c=r.get(i),u={};if(!c)return u;for(let d of c.itemsById.keys())u[d]=!0;return u}}}}function $l(){let e=Tt("issue-stores"),t=new Map,r=new Map,n=new Set,s=new Map;function o(){for(let c of Array.from(n))try{c()}catch{}}function a(c,u,d){let p=u?Ns(u):"",_=r.get(c)||"",h=t.has(c);if(e("register %s key=%s (prev=%s)",c,p,_),h&&_&&p&&_!==p){let $=t.get(c);if($)try{$.dispose()}catch{}let L=s.get(c);if(L){try{L()}catch{}s.delete(c)}let j=ra(c,d);t.set(c,j);let V=j.subscribe(()=>o());s.set(c,V)}else if(!h){let $=ra(c,d);t.set(c,$);let L=$.subscribe(()=>o());s.set(c,L)}return r.set(c,p),()=>i(c)}function i(c){e("unregister %s",c),r.delete(c);let u=t.get(c);u&&(u.dispose(),t.delete(c));let d=s.get(c);if(d){try{d()}catch{}s.delete(c)}}return{register:a,unregister:i,getStore(c){return t.get(c)||null},snapshotFor(c){let u=t.get(c);return u?u.snapshot().slice():[]},subscribe(c){return n.add(c),()=>n.delete(c)}}}function xl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function Al(){let e=null,t=!1,r=new Set;function n(){for(let s of Array.from(r))try{s()}catch{}}return{get(){return e},set(s){e=s,n()},isPending(){return t},setPending(s){let o=s===!0;o!==t&&(t=o,n())},clear(){e=null,t=!1,n()},subscribe(s){return r.add(s),()=>r.delete(s)}}}function Sl(){let e=null,t=new Set;function r(){for(let n of Array.from(t))try{n()}catch{}}return{get(){return e},set(n){e=n,r()},clear(){e=null,r()},subscribe(n){return t.add(n),()=>t.delete(n)}}}function na(e,t){return`#/${e==="worker"||e==="monitor"?e:"board"}?issue=${encodeURIComponent(t)}`}function Qp(e){let t=String(e||""),r=t.startsWith("#")?t.slice(1):t,n=r.indexOf("?"),s=n>=0?r.slice(n+1):"";if(s){let i=new URLSearchParams(s).get("issue");if(i)return decodeURIComponent(i)}let o=/^\/issue\/([^\s?#]+)/.exec(r);return o&&o[1]?decodeURIComponent(o[1]):null}function Xp(e){let t=String(e||"");return/^#\/worker(\b|\/|$)/.test(t)?"worker":/^#\/monitor(\b|\/|$)/.test(t)?"monitor":"board"}function El(e){let t=Tt("router"),r=()=>{let n=window.location.hash||"",s=/^#\/issue\/([^\s?#]+)/.exec(n),o=s&&s[1]?decodeURIComponent(s[1]):Qp(n),a=Xp(n);if(t("hash change \u2192 view=%s id=%s",a,o),e.setState({selected_id:a==="worker"?null:o,view:a,worker:{selected_parent_id:a==="worker"?o:null}}),!!s||/^#\/(issues|epics)(\b|\/|\?|$)/.test(n)){let c=o?`#/${a}?issue=${encodeURIComponent(o)}`:`#/${a}`;window.location.hash!==c&&(window.location.hash=c)}};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(n){let s=e.getState?e.getState():{view:"board"},o=s.view==="worker"||s.view==="monitor"?s.view:"board",a=na(o,n);t("goto issue %s (view=%s)",n,o),window.location.hash!==a?window.location.hash=a:e.setState({selected_id:o==="worker"?null:n,view:o,worker:{selected_parent_id:o==="worker"?n:null}})},gotoView(n){let s=e.getState?e.getState():{selected_id:null,worker:{selected_parent_id:null}},o=n==="worker"?s.worker?.selected_parent_id:s.selected_id,a=o?na(n,o):`#/${n}`;t("goto view %s (id=%s)",n,o||""),window.location.hash!==a?window.location.hash=a:e.setState({view:n,selected_id:n==="worker"?null:s.selected_id})}}}var Jp=Object.freeze({workspace_config:{default_workspace:null}});function Tl(e){return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:Jp.workspace_config.default_workspace}}}function Cl(e={}){let t=Tt("state"),r={selected_id:e.selected_id??null,view:e.view??"board",filters:{status:e.filters?.status??"all",search:e.filters?.search??"",type:typeof e.filters?.type=="string"?e.filters?.type:""},board:{closed_filter:e.board?.closed_filter==="3"||e.board?.closed_filter==="7"||e.board?.closed_filter==="today"?e.board?.closed_filter:"today"},worker:{selected_parent_id:e.worker?.selected_parent_id??null,show_closed_children:Array.isArray(e.worker?.show_closed_children)?e.worker.show_closed_children:[]},workspace:{current:e.workspace?.current??null,available:e.workspace?.available??[],hidden:e.workspace?.hidden??[]},config:Tl(e.config)},n=new Set;function s(){for(let o of Array.from(n))try{o(r)}catch{}}return{getState(){return r},setState(o){let a={...r,...o,filters:{...r.filters,...o.filters||{}},board:{...r.board,...o.board||{}},worker:{...r.worker,...o.worker||{}},workspace:{current:o.workspace?.current!==void 0?o.workspace.current:r.workspace.current,available:o.workspace?.available!==void 0?o.workspace.available:r.workspace.available,hidden:o.workspace?.hidden!==void 0?o.workspace.hidden:r.workspace.hidden},config:o.config!==void 0?Tl(o.config):r.config},i=a.workspace.current?.path!==r.workspace.current?.path||a.workspace.available.length!==r.workspace.available.length||a.workspace.hidden.length!==r.workspace.hidden.length||a.workspace.hidden.some((u,d)=>u!==r.workspace.hidden[d]),c=a.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace;a.selected_id===r.selected_id&&a.view===r.view&&a.filters.status===r.filters.status&&a.filters.search===r.filters.search&&a.filters.type===r.filters.type&&a.board.closed_filter===r.board.closed_filter&&a.worker.selected_parent_id===r.worker.selected_parent_id&&a.worker.show_closed_children.length===r.worker.show_closed_children.length&&a.worker.show_closed_children.every((u,d)=>u===r.worker.show_closed_children[d])&&!i&&!c||(r=a,t("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{default_workspace:r.config.workspace_config.default_workspace}}),s())},subscribe(o){return n.add(o),()=>n.delete(o)}}}function Rl(e){let t=Tt("activity"),r=0,n=new Map,s=1;function o(){if(!e)return;let u=r>0;e.toggleAttribute("hidden",!u),e.setAttribute("aria-busy",u?"true":"false")}function a(){r+=1,t("start count=%d",r),o()}function i(){let u=r;r=Math.max(0,r-1),u<=0?t("done called but count was already %d",u):t("done count=%d\u2192%d",u,r),o()}function c(u){return async(p,_)=>{let h=s++,$=Date.now();n.set(h,{type:p,start_ts:$}),t("request start id=%d type=%s count=%d",h,p,r+1),a();let L=!1,j=()=>{L||(L=!0,n.delete(h),i())},V=setTimeout(()=>{L||(t("request TIMEOUT id=%d type=%s elapsed=%dms",h,p,Date.now()-$),j())},3e4);try{let H=await u(p,_),P=Date.now()-$;return t("request done id=%d type=%s elapsed=%dms",h,p,P),H}catch(H){let P=Date.now()-$;throw t("request error id=%d type=%s elapsed=%dms err=%o",h,p,P,H),H}finally{clearTimeout(V),j()}}}return o(),{wrapSend:c,start:a,done:i,getCount:()=>r,getActiveRequests:()=>{let u=Date.now();return Array.from(n.entries()).map(([d,p])=>({id:d,type:p.type,elapsed_ms:u-p.start_ts}))}}}function me(e,t="info",r=2800){let n=document.createElement("div");n.className="toast",n.textContent=e,n.style.position="fixed",n.style.right="12px",n.style.bottom="12px",n.style.zIndex="1000",n.style.color="#fff",n.style.padding="8px 10px",n.style.borderRadius="4px",n.style.fontSize="12px",t==="success"?n.style.background="#156d36":t==="warning"?n.style.background="#a36a00":t==="error"?n.style.background="#9f2011":n.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(n),setTimeout(()=>{try{n.remove()}catch{}},r)}function qs(e=void 0,t=void 0){function r(){if(!t||typeof t.get!="function")return null;let o=t.get();return o&&o.order?o.order:{}}function n(o,a,i){let c=e&&e.snapshotFor?e.snapshotFor(o).slice():[];if(a==="closed")return c.sort(vl),c;switch(i){case"created_desc":return c.sort(Xr),c;case"created_asc":return c.sort(hl),c;case"updated_desc":return c.sort(bl),c;case"priority":return c.sort(yl),c;case"manual":default:{let u=r();return u?c.sort(Ds(u)):c.sort(Xr),c}}}function s(o){let a=[];return e&&typeof e.subscribe=="function"&&a.push(e.subscribe(o)),t&&typeof t.subscribe=="function"&&a.push(t.subscribe(o)),()=>{for(let i of a)try{i()}catch{}}}return{selectBoardColumn:n,subscribe:s}}function Jr(e){if(!e)return null;if(typeof e=="number")return Number.isFinite(e)?e:null;let t=Date.parse(e);return Number.isFinite(t)?t:null}function Ht(e){let t=Jr(e);if(t===null)return"";let r=new Date(t),n=s=>String(s).padStart(2,"0");return`${r.getFullYear()}-${n(r.getMonth()+1)}-${n(r.getDate())} ${n(r.getHours())}:${n(r.getMinutes())}`}function tr(e,t){let r=Jr(e);if(r===null)return"";let s=(typeof t=="number"?t:Date.now())-r;if(s<6e4)return"\uBC29\uAE08";let o=Math.floor(s/6e4);if(o<60)return`${o}\uBD84 \uC804`;let a=Math.floor(s/36e5);if(a<24)return`${a}\uC2DC\uAC04 \uC804`;let i=Math.floor(s/864e5);if(i<7)return`${i}\uC77C \uC804`;let c=Math.floor(i/7);if(i<30)return`${c}\uC8FC \uC804`;let u=Math.floor(i/30);return u<12?`${u}\uAC1C\uC6D4 \uC804`:`${Math.floor(i/365)}\uB144 \uC804`}function Il(e){if(!Array.isArray(e))return null;let t=null,r=-1;for(let n of e){if(!n||n.status!=="in_progress")continue;let s=Jr(n.updated_at)??0;if(t===null||s>r){t=n,r=s;continue}s===r&&String(n.id)<String(t.id)&&(t=n)}return t}function Fs(e){let t=e&&e.parent;return typeof t=="string"?t:t&&t.id?String(t.id):""}function js(e){let t=new Map;for(let n of e)n&&n.id&&!t.has(n.id)&&t.set(n.id,n);let r=new Map;for(let n of t.values()){let s=Fs(n);if(!s)continue;let o=r.get(s);o||(o=[],r.set(s,o)),o.push({id:n.id,title:n.title,status:n.status,metadata:n.metadata,workflow:n.workflow,created_at:n.created_at,updated_at:n.updated_at})}return r}function Bs(e,t){let r=e.get(t)||[],n=0;for(let o of r)(o.status==="resolved"||o.status==="closed")&&(n+=1);let s=Il(r);return{total:r.length,count:n,current:s,children:r}}function Us(e){let t=e.transport,r=e.uiOrderStore;function n(a,i){return"renormalize"in a?a.renormalize:[{bead_id:i,rank:a.rank}]}function s(a,i){let c={...a.order};for(let u of i)c[u.bead_id]=u.rank;r&&r.set({revision:a.revision,order:c})}async function o(a,i,c){if(!t||!r)return;let u=r.get()||{revision:0,order:{}},d=n(ta(i,c,u.order),a);s(u,d);let p=await t("ui-order-set",{expected_revision:u.revision,entries:d});if(p&&p.conflict){let _={revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}};r.set(_);let h=n(ta(i,c,_.order),a);s(_,h);let $=await t("ui-order-set",{expected_revision:_.revision,entries:h});$&&$.applied&&r.set({revision:typeof $.revision=="number"?$.revision:0,order:$.order||{}})}else p&&p.applied&&r.set({revision:typeof p.revision=="number"?p.revision:0,order:p.order||{}})}return{applyReorder:o}}function Ws(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function sa(e,t){return!t||typeof e!="string"||e.length===0||Ws(t.visible_labels).includes(e)?!0:Ws(t.hidden_labels).includes(e)?!1:!Ws(t.hidden_prefixes).some(r=>r.length>0&&e.startsWith(r))}function Ol(e,t){return Ws(e).filter(r=>sa(r,t))}function Pr(e,t){let r=e&&e.chips?e.chips[t]:void 0;return typeof r=="boolean"?r:!0}function ef(e){switch(e){case"in_progress":return"board-card__dot board-card__dot--progress";case"resolved":return"board-card__dot board-card__dot--resolved";case"closed":return"board-card__dot board-card__dot--closed";case"blocked":return"board-card__dot board-card__dot--blocked";default:return"board-card__dot"}}function tf(e,t,r,n,s){return l`<button
    type="button"
    class="board-card__roll-toggle"
    data-roll-parent=${e}
    aria-expanded=${n?"true":"false"}
    @click=${s}
  >
    children ${t}/${r} ${n?"\u25B4":"\u25BE"}
  </button>`}function rf(e,t,r,n){return l`<button
    type="button"
    class="board-card__roll-child"
    data-child-id=${e.id}
    @click=${n?s=>n(s,e.id):void 0}
  >
    <span class=${ef(e.status)}>●</span>
    <span class="board-card__roll-child-ord">${t}</span>
    <span class="board-card__roll-child-title">${e.title||e.id}</span>
    ${r}
  </button>`}function zs(e,t){let r=e.total||0,n=!!t.expanded,s=t.trailing??"",o=typeof t.empty_label=="string"&&t.empty_label.length>0?t.empty_label:null;if(r===0&&o===null)return"";let a=Array.isArray(e.children)?e.children:[],i=r>0?a.slice().sort(wl):a;return l`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${r>0?tf(t.parent_id,e.count,r,n,t.onToggle):l`<span class="board-card__roll-none">${o}</span>`}
        ${s}
      </div>
      ${r>0&&e.current?l`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${e.current.title||e.current.id}</span
            >
          </div>`:""}
      ${n&&r>0?l`<div class="board-card__roll-list">
            ${i.map((c,u)=>rf(c,u+1,t.childChips?t.childChips(c):null,t.onChildClick))}
          </div>`:""}
    </div>
  `}var nf={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"mrg",close:"mrg"},Ml={spec:"spec",plan:"plan",impl:"impl",pr:"pr",merge:"merge",close:"close"},Ll={quick_fix:["impl","close"],spec_backed:["spec","impl","pr","merge"],full_plan:["spec","plan","impl","pr","merge"]},sf={review:"\u2713",skip:"\u2298"},Dr={none:"\uBBF8\uB3C4\uB2EC",dim:"\uC9C4\uD589 \uC911",stale:"\uC7AC\uAC80\uD1A0 \uD544\uC694",review:"\uAC80\uD1A0 \uC644\uB8CC",skip:"\uAC80\uD1A0 \uC0DD\uB7B5",done:"\uC644\uB8CC"};function of(e,t,r){if(!(r==="in_progress"||r==="resolved"))return null;for(let s of e){let o=t[s];if(o&&o.fill==="dim"&&o.stale!==!0)return s}return null}function Pl(e){let t=e&&e.fill||"none";return t==="none"?Dr.none:e&&e.stale===!0?Dr.stale:t==="dim"?Dr.dim:e&&e.glyph==="review"?Dr.review:e&&e.glyph==="skip"?Dr.skip:Dr.done}function af(e){if(!e||e.fill==="none"||!e.approval_state)return Pl(e);let t=[];return e.glyph==="review"?t.push(Dr.review):e.glyph==="skip"&&t.push(Dr.skip),e.approval_state==="missing"?t.push("\uC2B9\uC778 \uD544\uC694"):e.approval_state==="stale"?t.push("\uC7AC\uC2B9\uC778 \uD544\uC694"):e.approval_state==="unknown"?t.push("\uC2B9\uC778 \uD655\uC778 \uBD88\uAC00"):t.push("\uC2B9\uC778 \uC644\uB8CC"),t.join(" \xB7 ")}function lf(e,t,r){let n=nf[e]||e,s=t&&t.fill||"none",o=!!t&&t.stale===!0,a=sf[t&&t.glyph||""]||"",i="bar";s==="dim"?i+=` b-${n} dim`:s==="full"&&(i+=` b-${n} full`),o&&(i+=" stale"),r&&(i+=" cur");let c=s==="none"?"lbl":`lbl l-${n} on`,u=r?`color: var(--stage-${n}-on)`:"";return l`
    <div class="seg">
      <div class=${i} style=${u}>${a}</div>
      <div class=${c}>
        ${Ml[e]||e}
      </div>
    </div>
  `}function bn(e,t){if(!e||!e.stages)return"";let r=Ll[e.route]||Ll.spec_backed,n=e.stages,s=of(r,n,String(t||"open")),o=`\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uC9C4\uD589: ${r.map(a=>`${Ml[a]||a} ${a==="plan"?af(n[a]||{}):Pl(n[a]||{})}`).join(" \xB7 ")}`;return l`
    <div class="stp" role="img" aria-label=${o}>
      ${r.map(a=>lf(a,n[a]||{},a===s))}
    </div>
  `}function cf(e){return typeof e!="number"||!Number.isFinite(e)?"":`P${Math.max(0,Math.min(4,e))}`}var Dl=2;function uf(e){if(!e)return[];let t=[];if(e.external){let n=e.reason?`\u23F8 blocked: ${e.reason}`:"\u23F8 blocked";t.push(l`<span class="ctl-chip ctl-chip--blocked">${n}</span>`)}let r=Array.isArray(e.blockers)?e.blockers:[];if(r.length>0){let n=r.slice(0,Dl).join(", "),s=r.length-Dl,o=`\u26D3 blocked: ${n}${s>0?` +${s}`:""}`;t.push(l`<span class="ctl-chip ctl-chip--blocked-dep">${o}</span>`)}return t}function oa(e){return e==="delegated"?"\uC704\uC784":e==="main"?"\uBA54\uC778":null}function Hs(e){return e.effort?`${e.actor}:${e.effort}`:e.actor}function kr(e){return`${e.kind}:${Hs(e)}@${e.sha}`}function Gs(e,t){if(!e)return null;let r=oa(e.kind),n=e.reason,s=e.kind==="delegated"?n===null:typeof n=="string"&&n.trim().length>0&&!/[\r\n]/.test(n);if(!r||!s)return null;let o=oa(t?.kind),a=o!==null&&t?.kind!==e.kind,i=`\uACC4\uD68D \xB7 ${r}${a?` \u2192 ${o}`:""}`,c=`planned_execution ${e.kind}${typeof n=="string"?`:${n}`:""}`,u=t?` \xB7 exec_receipt ${kr(t)}`:"";return{kind:e.kind,label:i,title:`${c}${u}`}}function Nl(e,t){let r=Gs(e,t);return r?l`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${r.kind}
        title=${r.title}
        >${r.label}</span
      >`:null}function df(e){if(!e)return null;let t=oa(e.kind);return t?l`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${kr(e)}`}
    >${`\uC2E4\uD589 \xB7 ${t}`}</span
  >`:null}function pf(e,t){let r=t.policy||null,n=e.workflow&&e.workflow.chips||{},s=[];if(n.route&&Pr(r,"route")){let i=n.route_source==="derived";s.push(l`<span
        class="ctl-chip ctl-chip--route${i?" is-derived":""}"
        title=${i?"route \uBBF8\uD540 (metadata unset)":"route"}
        >${i?"unset":n.route}</span
      >`)}if(n.fast_track&&Pr(r,"fast_track")&&s.push(l`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`),n.pr&&Pr(r,"pr")){let i=n.pr.number;s.push(l`<span class="ctl-chip ctl-chip--pr"
        >${`PR${i!=null?` #${i}`:""}`}</span
      >`)}let o=Nl(n.planned_execution,n.exec_receipt);if(o&&s.push(o),n.exec_receipt){let i=n.exec_receipt;s.push(l`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${kr(i)}`}
        >${`exec ${i.kind==="delegated"?Hs(i):`main:${i.actor}`} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}if(n.impl_entry){let i=n.impl_entry;s.push(l`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${i.actor}@${i.sha}`}
        >${`impl ${i.actor} \xB7 ${i.sha.slice(0,7)}`}</span
      >`)}for(let i of Ol(e.labels,r))s.push(l`<span class="ctl-chip ctl-chip--label">${i}</span>`);return e.from_id&&Pr(r,"from")&&s.push(l`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`\uCD9C\uCC98 ${e.from_id} \uC5F4\uAE30`}
        @click=${i=>{i.stopPropagation(),t.onFromChipClick&&t.onFromChipClick(i,String(e.from_id))}}
      >
        ↩ from ${e.from_id}
      </button>`),Pr(r,"blocked")&&s.push(...uf(e.blocked_info)),t.cleanupFailureFor&&t.cleanupFailureFor(e.id)&&Pr(r,"blocked")&&s.push(l`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`),s.length===0?"":l`<div class="board-card__chips">${s}</div>`}function ff(e){let t=tr(e.created_at),r=tr(e.updated_at);return!t&&!r?"":l`<span class="board-card__times">
    ${t?l`<span
          class="board-card__time"
          title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}
    ${t&&r?l`<span class="board-card__time-sep">·</span>`:""}
    ${r?l`<span
          class="board-card__time"
          title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </span>`}function _f(e,t){let r=t.rollupFor?t.rollupFor(e.id):{total:0,count:0,current:null,children:[]};return zs(r,{parent_id:e.id,expanded:t.isExpanded?t.isExpanded(e.id):!0,trailing:ff(e),empty_label:"children \uC5C6\uC74C",childChips:aa,onToggle:n=>t.onRollupToggle&&t.onRollupToggle(n,e.id),onChildClick:(n,s)=>t.onChildClick&&t.onChildClick(n,s)})}function aa(e){let t=e?.workflow?.chips?.planned_execution,r=e?.workflow?.chips?.exec_receipt;return Gs(t,r)?l`<span class="board-card__roll-child-chips">
    ${Nl(t,r)}
    ${df(r)}
  </span>`:null}function Vs(e,t){let r=cf(e.priority);return l`
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
      ${pf(e,t)}
      ${e.workflow&&Pr(t.policy||null,"stepper")?bn(e.workflow,e.status):""}
      ${_f(e,t)}
    </article>
  `}function yn(e,t){let r=Array.isArray(e.items)?e.items.length:0,n=e.is_closed===!0;return l`
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
              ${Mr.map(o=>l`<option
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
        ${e.items.map(o=>Vs(o,t))}
      </div>
    </section>
  `}function ql(e,t,r){return l`
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
          ${e.items.length===0?l`<div class="deferred-popup__empty">Deferred 이슈 없음</div>`:e.items.map(n=>Vs(n,t))}
        </div>
      </div>
    </dialog>
  `}var mf=[{value:"",label:"\uC6B0\uC120\uC21C\uC704"},{value:"0",label:"P0"},{value:"1",label:"P1"},{value:"2",label:"P2"},{value:"3",label:"P3"},{value:"4",label:"P4"}],gf=[{value:"",label:"\uD0C0\uC785"},{value:"bug",label:"bug"},{value:"feature",label:"feature"},{value:"task",label:"task"},{value:"epic",label:"epic"},{value:"chore",label:"chore"}],hf=[{value:"created_desc",label:"\uC0DD\uC131 \uCD5C\uC2E0\uC21C"},{value:"created_asc",label:"\uC0DD\uC131 \uC624\uB798\uB41C\uC21C"},{value:"updated_desc",label:"\uC218\uC815 \uCD5C\uC2E0\uC21C"},{value:"priority",label:"\uC6B0\uC120\uC21C\uC704\uC21C"},{value:"manual",label:"\uC218\uB3D9(\uB4DC\uB798\uADF8)"}];function bf(e,t,r){let n=e.labels.length,s=n>0?`\uB77C\uBCA8 ${n}`:"\uB77C\uBCA8";return l`
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
  `}function Fl(e,t,r){return l`
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
        ${mf.map(n=>l`<option
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
        ${gf.map(n=>l`<option
              value=${n.value}
              ?selected=${e.type===n.value}
            >
              ${n.label}
            </option>`)}
      </select>
      ${bf(e,t,r)}
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
        ${hf.map(n=>l`<option
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
  `}var yf=200,vf={"ready-col":"open","in-progress-col":"in_progress","resolved-col":"resolved","closed-col":"closed"},wf=new Set(["blocked-col","ready-col","in-progress-col","resolved-col"]),jl="beads-ui.board.sort",Bl=new Set(["created_desc","created_asc","updated_desc","priority","manual"]);function kf(){try{let e=window.localStorage.getItem(jl);if(e&&Bl.has(e))return e}catch{}return"created_desc"}function Ul(e,t){let r=Tt("views:board"),n=t.gotoIssue,s=t.issueStores,o=t.transport,a=t.uiOrderStore,i=t.displayPolicyStore,c=t.workerQueueStore,u=t.onClosedRangeChange,d=t.onNewIssue,p=t.closedRange||er,_=s?qs(s,a):null,h=Us({transport:o,uiOrderStore:a}),$=[],L=[],j=[],V=[],H=[],P=[],D=!1,O=0,U=kf(),b=new Map,B=new Map,ee=new Map,Ae=new Set,Z={search:"",priority:"",type:"",labels:[]},le=!1,ge=null;function Te(X){return String(X.status||"open")==="open"}function Le(X){let E=String(X.status||"open");return E==="open"||E==="blocked"}function se(X){let E=Z.search.trim().toLowerCase(),F=Z.priority,y=Z.type,C=Z.labels;return X.filter(M=>{if(E){let Y=String(M.id||"").toLowerCase(),xe=String(M.title||"").toLowerCase();if(!Y.includes(E)&&!xe.includes(E))return!1}if(F!==""&&String(M.priority)!==F||y!==""&&String(M.issue_type||"")!==y)return!1;if(C.length>0){let Y=Array.isArray(M.labels)?M.labels:[];if(!C.some(xe=>Y.includes(xe)))return!1}return!0})}function ae(){let X=new Set;for(let E of[$,L,j,V,H,P])for(let F of E){let y=Array.isArray(F.labels)?F.labels:[];for(let C of y)typeof C=="string"&&C.length>0&&X.add(C)}return Array.from(X).sort()}function Me(){return Z.search.trim()!==""||Z.priority!==""||Z.type!==""||Z.labels.length>0}function N(){try{if(_){let X=_.selectBoardColumn("tab:board:in-progress","in_progress",U),E=_.selectBoardColumn("tab:board:blocked","blocked",U).filter(Le),F=new Set(X.map(Fe=>Fe.id)),y=_.selectBoardColumn("tab:board:ready","ready",U).filter(Fe=>Te(Fe)&&!F.has(Fe.id)),C=_.selectBoardColumn("tab:board:resolved","resolved",U),M=_.selectBoardColumn("tab:board:deferred","deferred",U),Y=_.selectBoardColumn("tab:board:closed","closed").slice(0,yf),xe=[...E,...y,...X,...C,...Y];ne(xe);let he=new Set;for(let Fe of xe)Fe&&Fe.id&&!Fs(Fe)&&he.add(Fe.id);let Ee=!Me();$=Ee?Wn(E,he):E,L=Ee?Wn(y,he):y,j=Ee?Wn(X,he):X,V=Ee?Wn(C,he):C,H=M,O=M.length,P=Ee?Wn(Y,he):Y,b=new Map;for(let Fe of $)b.set(Fe.id,"open");for(let Fe of L)b.set(Fe.id,"open");for(let Fe of j)b.set(Fe.id,"in_progress");for(let Fe of V)b.set(Fe.id,"resolved");for(let Fe of H)b.set(Fe.id,"deferred");for(let Fe of P)b.set(Fe.id,"closed");B=new Map;for(let Fe of $)B.set(Fe.id,"blocked-col");for(let Fe of L)B.set(Fe.id,"ready-col");for(let Fe of j)B.set(Fe.id,"in-progress-col");for(let Fe of V)B.set(Fe.id,"resolved-col");for(let Fe of P)B.set(Fe.id,"closed-col")}Xe()}catch{$=[],L=[],j=[],V=[],H=[],P=[],ee=new Map,Xe()}}function ne(X){ee=js(X)}function oe(X){return Bs(ee,X)}function ke(X){return!Ae.has(X)}function Ce(X,E){X.preventDefault(),X.stopPropagation(),Ae.has(E)?Ae.delete(E):Ae.add(E),Xe()}function Ne(X,E){X.preventDefault(),X.stopPropagation(),n(E)}function x(X,E){X.preventDefault(),X.stopPropagation(),n(E)}function fe(X,E){ge||n(E)}function De(X,E){X.preventDefault(),X.stopPropagation(),$f(E).then(F=>{F&&me("\uBCF5\uC0AC\uB428","success",1200)})}function ve(X,E){ge=E,X.dataTransfer&&(X.dataTransfer.setData("text/plain",E),X.dataTransfer.effectAllowed="move"),X.target.classList.add("board-card--dragging")}function ze(X){X.target.classList.remove("board-card--dragging"),wt(),setTimeout(()=>{ge=null},0)}function We(X){let E=String(X.target.value||"");!E||E===p||(p=E,u&&u(E),Xe())}function Ve(){return i?i.get():null}function Je(X){let E=c?c.get():null,F=E?E.cleanup_failed:null;if(!F||typeof F!="object"||Array.isArray(F))return null;let y=F[X];return!y||typeof y!="object"||Array.isArray(y)?null:y}let ot={onCardClick:fe,onCopyId:De,onDragStart:ve,onDragEnd:ze,onClosedRangeChange:We,rollupFor:oe,isExpanded:ke,onRollupToggle:Ce,onChildClick:Ne,onFromChipClick:x,cleanupFailureFor:Je,get policy(){return Ve()}};function K(X,E){ge||(te(),n(E))}function Q(X,E){X.preventDefault(),X.stopPropagation(),te(),n(E)}let Se={...ot,onCardClick:K,onChildClick:Q,onFromChipClick:Q,get policy(){return Ve()}};function Qe(X){let E=X.target,F=e.querySelector(".board-filter__labels");E&&F&&F.contains(E)||R()}function Ge(X){X.key==="Escape"&&R()}function pe(){le||(le=!0,document.addEventListener("mousedown",Qe),document.addEventListener("keydown",Ge),Xe())}function R(){le&&(le=!1,document.removeEventListener("mousedown",Qe),document.removeEventListener("keydown",Ge),Xe())}function J(X){X.key==="Escape"&&te()}function ie(){D||(D=!0,document.addEventListener("keydown",J),Xe())}function te(){D&&(D=!1,document.removeEventListener("keydown",J),Xe())}let qe={onClose:te,onOverlayClick(X){X.target===X.currentTarget&&te()}},at={onSearchInput(X){Z.search=String(X.target.value||""),N()},onPriorityChange(X){Z.priority=String(X.target.value||""),N()},onTypeChange(X){Z.type=String(X.target.value||""),N()},onSortChange(X){let E=String(X.target.value||"");if(!(!Bl.has(E)||E===U)){U=E;try{window.localStorage.setItem(jl,E)}catch{}N()}},onDeferredToggle(){D?te():ie()},onLabelMenuToggle(){le?R():pe()},onLabelToggle(X){let E=Z.labels.indexOf(X);E===-1?Z.labels.push(X):Z.labels.splice(E,1),N()},onLabelClear(){Z.labels.length!==0&&(Z.labels=[],N())},onNewIssue(){d&&d()}};function it(){return l`
      <div class="board-view">
        ${Fl(Z,at,{sort_mode:U,deferred_popup_open:D,deferred_count:O,label_options:ae(),label_menu_open:le})}
        <div class="board-root">
          ${yn({title:"Blocked",id:"blocked-col",items:se($)},ot)}
          ${yn({title:"Ready",id:"ready-col",items:se(L)},ot)}
          ${yn({title:"In progress",id:"in-progress-col",items:se(j)},ot)}
          ${yn({title:"Resolved",id:"resolved-col",items:se(V)},ot)}
          ${yn({title:"Closed",id:"closed-col",items:se(P),is_closed:!0,closed_range:p},ot)}
        </div>
        ${D?ql({items:se(H),count:O},Se,qe):""}
      </div>
    `}function Xe(){Ye(it(),e),mt()}function mt(){try{let X=e.querySelector("#deferred-popup");X&&!X.open&&(typeof X.showModal=="function"?X.showModal():X.setAttribute("open",""));let E=Array.from(e.querySelectorAll(".board-column, .deferred-popup__body"));for(let F of E)Array.from(F.querySelectorAll(".board-card")).forEach((C,M)=>{C.tabIndex=M===0?0:-1})}catch{}}async function ht(X,E){if(!o){me("\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC544 \uC0C1\uD0DC\uB97C \uBCC0\uACBD\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error");return}try{await o("update-status",{id:X,status:E}),me("\uC0C1\uD0DC \uBCC0\uACBD\uB428","success",1500)}catch(F){r("update-status failed: %o",F),me("\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328","error")}}function bt(X){switch(X){case"blocked-col":return $;case"ready-col":return L;case"in-progress-col":return j;case"resolved-col":return V;default:return[]}}function pt(X,E,F){if(!o||!a)return;let y=bt(X),C=y.find(Ee=>Ee.id===E);if(!C)return;let M=y.filter(Ee=>Ee.id!==E),Y=F.closest?F.closest(".board-card"):null,xe=M.length;if(Y){let Ee=Y.getAttribute("data-issue-id");if(Ee===E)return;let Fe=M.findIndex(_t=>_t.id===Ee);Fe>=0&&(xe=Fe)}let he=M.slice();he.splice(xe,0,C),h.applyReorder(E,he,xe)}function wt(){for(let X of Array.from(e.querySelectorAll(".board-column--drag-over")))X.classList.remove("board-column--drag-over")}let He=null;e.addEventListener("dragover",X=>{X.preventDefault(),X.dataTransfer&&(X.dataTransfer.dropEffect="move");let F=X.target.closest(".board-column");F&&F!==He&&(He&&He.classList.remove("board-column--drag-over"),F.classList.add("board-column--drag-over"),He=F)}),e.addEventListener("dragleave",X=>{let E=X.relatedTarget;(!E||!e.contains(E))&&He&&(He.classList.remove("board-column--drag-over"),He=null)}),e.addEventListener("drop",X=>{X.preventDefault(),He&&(He.classList.remove("board-column--drag-over"),He=null);let E=X.target,F=E.closest(".board-column");if(!F)return;let y=X.dataTransfer?.getData("text/plain")||"";if(!y)return;let C=F.id,M=B.get(y);if(M&&M===C){if(wf.has(C)){if(U!=="manual"){me("\uC218\uB3D9(\uB4DC\uB798\uADF8) \uC815\uB82C \uBAA8\uB4DC\uC5D0\uC11C\uB9CC \uC21C\uC11C\uB97C \uBC14\uAFC0 \uC218 \uC788\uC2B5\uB2C8\uB2E4","warning",2e3);return}pt(C,y,E)}return}let Y=vf[C];if(!Y){me("\uC5EC\uAE30\uB85C\uB294 \uC62E\uAE38 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","warning",1500);return}b.get(y)!==Y&&ht(y,Y)}),e.addEventListener("keydown",X=>{let E=X.target;if(!(E instanceof HTMLElement))return;let F=String(E.tagName||"").toLowerCase();if(F==="input"||F==="textarea"||F==="select"||F==="button"||F==="a"||E.isContentEditable===!0)return;let y=E.closest(".board-card");if(!y)return;let C=String(X.key||"");if(C==="Enter"||C===" "){X.preventDefault();let he=y.getAttribute("data-issue-id");he&&n(he);return}if(C!=="ArrowUp"&&C!=="ArrowDown"&&C!=="ArrowLeft"&&C!=="ArrowRight")return;X.preventDefault();let M=y.closest(".board-column");if(!M)return;let Y=Array.from(M.querySelectorAll(".board-card")),xe=Y.indexOf(y);if(C==="ArrowDown"&&xe<Y.length-1){et(y,Y[xe+1]);return}if(C==="ArrowUp"&&xe>0){et(y,Y[xe-1]);return}if(C==="ArrowLeft"||C==="ArrowRight"){let he=Array.from(e.querySelectorAll(".board-column")),Ee=he.indexOf(M),Fe=C==="ArrowRight"?1:-1,_t=Ee+Fe;for(;_t>=0&&_t<he.length;){let yt=he[_t].querySelector(".board-card");if(yt){et(y,yt);return}_t+=Fe}}});function et(X,E){try{X.tabIndex=-1,E.tabIndex=0,E.focus()}catch{}}let Pe=null;_&&_.subscribe&&(Pe=_.subscribe(()=>{try{N()}catch{}}));let ct=null;i&&i.subscribe&&(ct=i.subscribe(()=>{try{N()}catch{}}));let xt=null;return c&&c.subscribe&&(xt=c.subscribe(()=>{Xe()})),{async load(){r("load"),N()},clear(){R(),te(),Pe&&(Pe(),Pe=null),ct&&(ct(),ct=null),xt&&(xt(),xt=null),e.replaceChildren(),$=[],L=[],j=[],V=[],H=[],P=[],b=new Map,B=new Map}}}function Wn(e,t){return e.filter(r=>{let n=Fs(r);return!(n&&t.has(n))})}async function $f(e){try{if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")return await navigator.clipboard.writeText(String(e)),!0;let t=document.createElement("textarea");t.value=String(e),t.style.position="fixed",t.style.left="-9999px",document.body.appendChild(t),t.select();let r=!1;try{r=document.execCommand("copy")}finally{t.remove()}return r}catch{return!1}}async function rr(e){let t=String(e);if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")try{return await navigator.clipboard.writeText(t),!0}catch{}try{let r=document.createElement("textarea");r.value=t,r.style.position="fixed",r.style.left="-9999px",document.body.appendChild(r),r.select();let n=!1;try{n=document.execCommand("copy")}finally{r.remove()}return n}catch{return!1}}function en(e){return[typeof e.runner=="string"?e.runner:null,typeof e.model=="string"?e.model:null,typeof e.effort=="string"?e.effort:null,e.speed==="fast"?"Fast":null].filter(Boolean).join(" \xB7 ")}function zn(e){return typeof e.resumed_from!="string"||e.resumed_from.length===0?null:`${e.continuation_mode==="session"?"session \uC774\uC5B4\uBC1B\uC74C":e.continuation_mode==="fresh"?"\uC0C8 session\uC73C\uB85C \uC774\uC5B4\uBC1B\uC74C":"\uC774\uC804 attempt\uC5D0\uC11C \uC774\uC5B4\uBC1B\uC74C"} (from ${e.resumed_from})`}function xf(e,t=document){let r=t.createElement("dialog");r.className="continuation-dialog";let n=t.createElement("button"),s=t.createElement("button"),o=t.createElement("button"),a=t.createElement("h2"),i=t.createElement("p");return a.textContent="\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4",i.textContent=`${en(e.prior||{})||"\uC774\uC804 \uC124\uC815"} \u2192 ${en(e.current||{})||"\uD604\uC7AC \uC124\uC815"}`,n.type="button",n.textContent="\uAE30\uC874 session \uC774\uC5B4\uD558\uAE30",n.disabled=e.prior_available===!1,s.type="button",s.textContent="\uD604\uC7AC preset\uC73C\uB85C \uC0C8 session",o.type="button",o.textContent="\uCDE8\uC18C",r.append(a,i,n,s,o),t.body.append(r),new Promise(c=>{let u=d=>{typeof r.close=="function"&&r.close(),r.remove(),c(d)};n.addEventListener("click",()=>u("prior_session")),s.addEventListener("click",()=>u("fresh_current")),o.addEventListener("click",()=>u(null)),r.addEventListener("cancel",d=>{d.preventDefault(),u(null)}),typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")})}async function $r(e,t,r={}){let n=e;for(r.onResult?.(n);n?.continuation_mismatch;){let s=n.continuation_mismatch,o=await xf(s);if(o===null)return n;n=await t(o,s.decision_token),r.onResult?.(n),n?.conflict&&r.refresh&&(n=await r.refresh(n),r.onResult?.(n))}return n}var Af=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed","quick_fix_impl_model","orchestration_model","orchestration_effort","orchestration_speed"],Wl={spec_review_effort:"spec_review_model",plan_review_effort:"plan_review_model",impl_review_effort:"impl_review_model"},Sf=new Set(["native-fixed-posture","unsupported","claude-runner-model-default","catalog-validated","provider-tier-or-runtime-model-default","actual-effort"]);function qt(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Rt(e){return typeof e=="string"&&e.length>0?e:null}function vn(e){return e.startsWith("gpt-")?e.slice(4):e}function St(e,t,r,n,s){return{value:e,source:t,display:r,full_value:n,resolution:s}}function Hl(e,t,r){let n=Rt(t[e]);if(n!==null)return{value:n,source:"pin"};let s=Rt(r[e]);return s===null?null:{value:s,source:"global"}}function Hn(e,t,r,n){return Hl(e,t,r)||{value:n,source:"base"}}function ia(e,t,r,n){let s=r?.implementation?.model_catalog;if(t&&qt(s?.[t])){let a=Rt(s[t][e]);if(a!==null)return a}if(t&&Array.isArray(s?.[t])&&s[t].includes(e))return e;if(!t&&qt(s)){for(let a of Object.values(s))if(qt(a)){let i=Rt(a[e]);if(i!==null)return i}else if(Array.isArray(a)&&a.includes(e))return e}let o=n?.model_index?.[e];return Rt(n?.runners?.[o]?.models?.[e]?.id)||e}function Ef(e,t){return Rt(t?.review?.reviewers?.[e]?.model)||e}function wn(e,t,r=!1){if(e==="default")return St(e,t,`default (\uC77C\uBC18 \xB7 ${t==="pin"?"\uD540":"\uC804\uC5ED \uACE0\uC815"})`,e,"explicit");let n=r?vn(e):e;return St(e,t,n,e,"explicit")}function Gl(e,t,r){let n=t?.implementation?.model_catalog?.[e],s=[];qt(n)?s.push(...Object.keys(n)):Array.isArray(n)&&s.push(...n.filter(a=>typeof a=="string"));let o=r?.runners?.[e]?.models;if(qt(o))for(let a of Object.keys(o))s.includes(a)||s.push(a);return s}function Tf(e,t){let r=[],n=e?.implementation?.model_catalog;qt(n)&&r.push(...Object.keys(n));let s=t?.runners;if(qt(s))for(let o of Object.keys(s))r.includes(o)||r.push(o);return r}function Cf(e,t,r){if(e===null)return{runtime:null,offered:!1};let n=!1;for(let s of Tf(t,r)){let o=Gl(s,t,r);if(o.length>0&&(n=!0),o.includes(e))return{runtime:s,offered:!0}}return{runtime:null,offered:n}}function la(e){return St(e.value,e.source,`${e.value} (\uBE44\uD638\uD658)`,e.value,"incompatible")}function zl(e,t,r){let n=Hl(e,t,r);return n?wn(n.value,n.source):St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable")}function Qt(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.execution_defaults)?e.execution_defaults:null,s=n?.supported===!0&&qt(n.session)?n.session:null,o=n?.supported===!0&&qt(n.orchestration)?n.orchestration:null,a=qt(e.runner_catalog)?e.runner_catalog:null,i=Rt(r.quick_fix_impl_model),c=Cf(i,s,a),u={};if(s){let d=Hn("workflow_mode",t,r,Rt(s.workflow_mode_default));u.workflow_mode=d.source==="base"?St(d.value,"base",d.value||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",d.value,"default"):wn(d.value,d.source);for(let P of["spec_review","plan_review","impl_review"]){let D=`${P}_model`,O=Rt(P==="plan_review"?d.value==="fast_track"?s.plan_review?.fast_track_default:s.plan_review?.standard_recommended:s.review?.default),U=Hn(D,t,r,O);if(U.value===null)u[D]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");else if(U.value!=="self"&&U.value!=="skip"&&!qt(s.review?.reviewers?.[U.value]))u[D]=la(St(U.value,U.source,"",null,"explicit"));else{let b=Ef(U.value,s);u[D]=St(U.value,U.source,vn(b),b,U.source==="base"?"default":"explicit")}}for(let[P,D]of Object.entries(Wl)){let O=u[D].value;if(O==="self"||O==="skip"){u[P]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable");continue}let U=Rt(s.review?.reviewers?.[O||""]?.effort),b=Hn(P,t,r,U);u[P]=b.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(b.value,b.source,b.value,b.value,b.source==="base"?"default":"explicit")}let p=qt(s.implementation?.default)?s.implementation.default:{},_=Rt(e.route),h=_!==null&&["quick_fix","spec_backed","full_plan"].includes(_),$=qt(s.implementation?.route_defaults)?s.implementation.route_defaults:{},L=h&&qt($[_])?$[_]:{};for(let P of["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]){let D=Hn(P,t,r,P==="impl_dispatch"?Rt(L.dispatch)||Rt(p.dispatch):Rt(p[P.replace("impl_","")]));u[P]=D.value===null?St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable"):St(D.value,D.source,D.value,D.value,D.source==="base"?"default":"explicit")}let j=Rt(t.impl_runtime),V=j==="inherit"?Rt(e.controller_runtime):j,H=_==="quick_fix"&&Rt(t.impl_dispatch)===null&&c.runtime!==null&&(j===null||V===c.runtime);if(H){let P=c.runtime,D=i;u.impl_dispatch=St("delegated","global","\uC704\uC784 (\uC804\uC5ED quick_fix)","delegated","explicit"),j===null&&(u.impl_runtime=St(P,"global",`${P} (\uC720\uB3C4)`,P,"explicit")),Rt(t.impl_model)===null&&(u.impl_model=St(D,"global",D,D,"explicit"))}if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let P of["impl_runtime","impl_model","impl_effort","impl_speed"])u[P]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else{if(u.impl_dispatch.value==="delegated"&&!H&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_model.value!==null){let P=u.impl_runtime.value==="inherit"?Rt(e.controller_runtime):u.impl_runtime.value,D=P?Gl(P,s,a):[];if(u.impl_model.value!=="auto"&&D.length>0&&!D.includes(u.impl_model.value))u.impl_model=la(u.impl_model);else{let O=ia(u.impl_model.value,P,s,a);u.impl_model.display=vn(O),u.impl_model.full_value=O}}if(u.impl_effort.value==="auto"){let P=Rt(e.transport)||(u.impl_runtime.value==="codex"?"codex-native-spawn":u.impl_runtime.value==="claude"?"implement-claude":null),D=P?Rt(s.implementation?.effort_by_transport?.[P]?.auto):null;D&&!Sf.has(D)?(u.impl_effort.display=`${D} (\uBE44\uD638\uD658)`,u.impl_effort.full_value=D,u.impl_effort.resolution="incompatible"):(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}u.impl_speed.value==="default"&&(u.impl_speed=u.impl_speed.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):wn("default",u.impl_speed.source))}}else for(let d of Af.filter(p=>!p.startsWith("orchestration_")))u[d]=zl(d,t,r);if(!s){for(let[d,p]of Object.entries(Wl))(u[p].value==="self"||u[p].value==="skip")&&(u[d]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable"));if(u.impl_dispatch.value==="main"){u.impl_dispatch.display="\uBA54\uC778";for(let d of["impl_runtime","impl_model","impl_effort","impl_speed"])u[d]=St(null,"base","\uD574\uB2F9 \uC5C6\uC74C",null,"not_applicable")}else u.impl_dispatch.value==="delegated"&&(u.impl_dispatch.display="\uC704\uC784"),u.impl_runtime.value==="inherit"&&(u.impl_runtime.display=e.controller_runtime?`inherit (${e.controller_runtime})`:"inherit (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_runtime.resolution="dynamic"),u.impl_effort.value==="auto"&&(u.impl_effort.display="auto (\uC2E4\uD589 \uC2DC \uACB0\uC815)",u.impl_effort.resolution="dynamic")}for(let d of["orchestration_model","orchestration_effort","orchestration_speed"]){if(!o){u[d]=zl(d,t,r);continue}let p=d.replace("orchestration_",""),_=Rt(o[p]),h=Hn(d,t,r,_);if(d==="orchestration_effort"&&h.source==="base"){u[d]=St(null,"base","CLI \uAE30\uBCF8 (\uBBF8\uC9C0\uC815)",null,"default");continue}if(h.value===null){u[d]=St(null,"base","\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00",null,"unavailable");continue}if(d==="orchestration_model"){let $=h.source==="base"?Rt(o.model_id)||h.value:ia(h.value,null,s,a);u[d]=St(h.value,h.source,vn($),$,h.source==="base"?"default":"explicit");continue}if(h.value==="default"){u[d]=h.source==="base"?St("default","base","default (\uC77C\uBC18)","default","default"):wn("default",h.source);continue}u[d]=wn(h.value,h.source)}if(s)if(i===null){let d=u.orchestration_model.full_value;u.quick_fix_impl_model=St(null,"base",d===null?"\uBA54\uC778":`\uBA54\uC778 (orchestration ${vn(d)})`,null,"default")}else if(c.runtime!==null){let d=ia(i,c.runtime,s,a);u.quick_fix_impl_model=St(i,"global",vn(d),d,"explicit")}else c.offered?u.quick_fix_impl_model=la(St(i,"global","",null,"explicit")):u.quick_fix_impl_model=wn(i,"global");return u}function Rf(e,t){let r=t&&e.value==="default"?"default (\uC77C\uBC18)":e.display;if(!t||e.source==="pin")return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${e.display}`;let n=e.source==="global"?"\uC804\uC5ED":"harness";return`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 ${r} (${n})`}function Ks(e){let t=qt(e.pin)?e.pin:{},r=qt(e.global)?e.global:{},n=qt(e.resolution_global)?{...e.resolution_global}:{};delete n[e.key];let s=p=>{let _={...n,...p};return Qt({pin:e.layer==="pin"?_:t,global:e.layer==="pin"?r:_,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog,route:e.route,controller_runtime:e.controller_runtime})},o=e.layer==="pin"?t:r,a={...o};delete a[e.key];let i=s(a)[e.key],c=s(o)[e.key],u=Rt(o[e.key]),d=[...e.choices];return u!==null&&!d.includes(u)&&d.unshift(u),{unset_label:Rf(i,e.layer==="pin"),full_value:i.full_value,unavailable:i.resolution==="unavailable",disabled:c?.resolution==="not_applicable",options:d.map(p=>{let _=s({...o,[e.key]:p})[e.key];return{value:p,label:_.display,full_value:_.full_value}})}}function kn(e=document){let t=e.createElement("dialog");t.className="resume-instructions-dialog";let r=e.createElement("h2"),n=e.createElement("textarea"),s=e.createElement("div"),o=e.createElement("button"),a=e.createElement("button");return r.textContent="\uC138\uC158 \uC774\uC5B4\uD558\uAE30",n.placeholder="\uCD94\uAC00 \uC9C0\uCE68 (\uC120\uD0DD) \u2014 \uBE44\uC6CC\uB450\uBA74 \uAE30\uBCF8 \uC808\uCC28\uB85C \uC7AC\uAC1C",n.maxLength=4e3,s.className="resume-instructions-dialog__actions",o.type="button",o.textContent="\uC774\uC5B4\uD558\uAE30",a.type="button",a.textContent="\uCDE8\uC18C",s.append(o,a),t.append(r,n,s),e.body.append(t),new Promise(i=>{let c=!1,u=p=>{c||(c=!0,typeof t.close=="function"&&t.close(),t.remove(),i(p))},d=()=>u(n.value.trim());o.addEventListener("click",d),a.addEventListener("click",()=>u(null)),n.addEventListener("keydown",p=>{p.key==="Enter"&&(p.ctrlKey||p.metaKey)&&(p.preventDefault(),d())}),t.addEventListener("cancel",p=>{p.preventDefault(),u(null)}),typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""),n.focus()})}var Ql="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4";function Bt(e){return typeof e=="number"&&Number.isFinite(e)?e:0}var xr=["input_tokens","output_tokens","cache_read_input_tokens","cache_creation_input_tokens"],Gn=[...xr,"reasoning_output_tokens"],If={codex:["implementation","review-consult"],claude:["subagent"]};function ca(e){let t=0;for(let r of xr)t+=Bt(e?.[r]);return t}function Of(e){return!e||typeof e!="object"?!1:xr.some(t=>Number.isFinite(e[t]))}function Vl(e){return!e||typeof e!="object"?!1:Gn.some(t=>Number.isFinite(e[t]))}function Lf(e){let t={};for(let r of Gn)e&&Number.isFinite(e[r])&&(t[r]=e[r]);return t}function Kl(e){let t={};for(let r of Gn)Number.isFinite(e[r])&&(t[r]=e[r]);return e.replayed===!0&&(t.replayed=!0),typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&(t.total_cost_usd=e.total_cost_usd),t}function Yl(e,t){return e==="codex"?Bt(t.input_tokens)+Bt(t.output_tokens):ca(t)}function Mf(e){return e==="claude"?"Claude":"Codex"}function Pf(e){return`\u03C4 ${Xl(e)}`}function Df(e,t){let r=t.breakdown||{},n=[`\uC785\uB825 ${Bt(r.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(r.output_tokens).toLocaleString("en-US")}`];e==="claude"?n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`):(n.push(`\uCE90\uC2DC\uC77D\uAE30 ${Bt(r.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC4F0\uAE30 ${Bt(r.cache_creation_input_tokens).toLocaleString("en-US")}`),Number.isFinite(r.reasoning_output_tokens)&&n.push(`\uCD94\uB860\uCD9C\uB825 ${Bt(r.reasoning_output_tokens).toLocaleString("en-US")}`));let o=[e==="claude"?"Claude subtotal = \uC785\uB825 + \uCD9C\uB825 + \uCE90\uC2DC\uC77D\uAE30 + \uCE90\uC2DC\uC0DD\uC131":"Codex subtotal = \uC785\uB825 + \uCD9C\uB825; \uCE90\uC2DC\uC77D\uAE30\xB7\uCE90\uC2DC\uC4F0\uAE30\xB7\uCD94\uB860\uCD9C\uB825\uC740 subtotal\uC5D0 \uD3EC\uD568\uB418\uC9C0 \uC54A\uB294 subset",`\uCD1D ${t.subtotal.toLocaleString("en-US")}`,n.join(" \xB7 ")];return typeof t.total_cost_usd=="number"&&Number.isFinite(t.total_cost_usd)&&o.push(`$${t.total_cost_usd.toFixed(2)}`),t.replayed&&o.push(Ql),o.join(`
`)}function Wt(e){let t=[];if(!e||typeof e!="object"||!("providers"in e)||!e.providers)return t;for(let r of["claude","codex"]){let n=e.providers[r];n&&t.push({provider:r,label:`${Mf(r)} ${Pf(n.subtotal)}${typeof n.total_cost_usd=="number"&&Number.isFinite(n.total_cost_usd)?` \xB7 $${n.total_cost_usd.toFixed(2)}`:""}`,tooltip:Df(r,n)})}return t}function Zs(e){let t={},r={claude:!0,codex:!1},n={claude:0,codex:0};for(let s of e)if(!(!s||!s.providers))for(let o of["claude","codex"]){let a=s.providers[o];if(!a)continue;let i=t[o];i||(i={subtotal:0,breakdown:{}},t[o]=i),i.subtotal+=a.subtotal;for(let c of Gn)Number.isFinite(a.breakdown[c])&&(i.breakdown[c]=Bt(i.breakdown[c])+Bt(a.breakdown[c]));a.replayed&&(i.replayed=!0),o==="claude"&&(typeof a.total_cost_usd=="number"&&Number.isFinite(a.total_cost_usd)?n.claude+=a.total_cost_usd:r.claude=!1)}return t.claude&&r.claude&&(t.claude.total_cost_usd=n.claude),Object.keys(t).length===0?null:{providers:t,roles:{}}}function ua(e){return!e||typeof e!="object"?null:ir({attempt:{...e,bead_id:"__attempt__"}},"__attempt__")}function Nf(e){return e==="codex"?"codex":"claude"}function br(){return{subtotal:0,breakdown:Lf(null),legs:[],replayed:!1,outer_count:0,outer_cost:0,outer_cost_count:0}}function Ys(e,t,r){e.subtotal+=t.subtotal;for(let n of Gn)Number.isFinite(t.usage[n])&&(e.breakdown[n]=Bt(e.breakdown[n])+Bt(t.usage[n]));e.legs.push(t),t.replayed===!0&&(e.replayed=!0),r&&(e.outer_count+=1,typeof t.usage.total_cost_usd=="number"&&Number.isFinite(t.usage.total_cost_usd)&&(e.outer_cost+=t.usage.total_cost_usd,e.outer_cost_count+=1))}function Zl(e,t){let r={subtotal:e.subtotal,breakdown:e.breakdown};return t&&(r.legs=e.legs),e.replayed&&(r.replayed=!0),r}function Xl(e){return e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${(e/1e3).toFixed(1)}k`:String(e)}function $n(e){return Of(e)?`\u03C4 ${Xl(ca(e))}`:null}function Ar(e){let t=$n(e);if(!t)return null;let r=e?.total_cost_usd;return typeof r=="number"&&Number.isFinite(r)?`${t} \xB7 $${r.toFixed(2)}`:t}function Vn(e){if(!e||typeof e!="object")return"";let t=[`\uC785\uB825 ${Bt(e.input_tokens).toLocaleString("en-US")}`,`\uCD9C\uB825 ${Bt(e.output_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC77D\uAE30 ${Bt(e.cache_read_input_tokens).toLocaleString("en-US")}`,`\uCE90\uC2DC\uC0DD\uC131 ${Bt(e.cache_creation_input_tokens).toLocaleString("en-US")}`];typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)&&t.push(`$${e.total_cost_usd.toFixed(2)}`);let r=[`\uCD1D ${ca(e).toLocaleString("en-US")}`,t.join(" \xB7 ")];return e.replayed&&r.push(Ql),r.join(`
`)}function ir(e,t){let r={claude:br(),codex:br()},n={orchestrator:{claude:br(),codex:br()},implementation:{claude:br(),codex:br()},"review-consult":{claude:br(),codex:br()},subagent:{claude:br(),codex:br()}},s=new Set;for(let i of Object.values(e||{})){if(!i||i.bead_id!==t)continue;let c=i.usage;if(Vl(c)){let d=Nf(i.runner),p=Kl(c),_={provider:d,role:"orchestrator",attempt_id:String(i.attempt_id||""),usage:p,subtotal:Yl(d,p)};p.replayed===!0&&(_.replayed=!0),typeof i.model=="string"&&(_.model=i.model),typeof i.session_id=="string"&&(_.session_id=i.session_id),Ys(r[d],_,!0),Ys(n.orchestrator[d],_,!0)}let u=Array.isArray(i.usage_legs)?i.usage_legs:[];for(let d of u){let p=d&&d.provider==="claude"?"claude":"codex";if(!d||d.provider!=="codex"&&d.provider!=="claude"||!If[p].includes(d.role)||!Vl(d.usage))continue;let _=typeof d.receipt_id=="string"&&d.receipt_id.length>0?d.receipt_id:null;if(!_||s.has(_))continue;s.add(_);let h=Kl(d.usage),$={provider:p,role:d.role,attempt_id:String(i.attempt_id||""),usage:h,subtotal:Yl(p,h)};$.receipt_id=_,typeof d.agent_type=="string"&&($.agent_type=d.agent_type),typeof d.agent_id=="string"&&($.agent_id=d.agent_id),typeof d.model=="string"&&($.model=d.model),typeof d.effort=="string"&&d.effort.trim().length>0&&($.effort=d.effort),typeof d.session_id=="string"?$.session_id=d.session_id:typeof d.thread_id=="string"&&($.session_id=d.thread_id),typeof d.turn_id=="string"&&($.turn_id=d.turn_id),(typeof d.completed_at=="string"||typeof d.completed_at=="number"&&Number.isFinite(d.completed_at))&&($.completed_at=d.completed_at),h.replayed===!0&&($.replayed=!0),Ys(r[p],$,!1),Ys(n[$.role][p],$,!1)}}let o={};for(let i of["claude","codex"]){let c=r[i];if(c.legs.length===0)continue;let u=Zl(c,!1);i==="claude"&&c.outer_count>0&&c.outer_cost_count===c.outer_count&&(u.total_cost_usd=c.outer_cost),o[i]=u}if(Object.keys(o).length===0)return null;let a={};for(let i of["orchestrator","implementation","review-consult","subagent"]){let c={};for(let u of["claude","codex"]){let d=n[i][u];d.legs.length>0&&(c[u]={...Zl(d,!0),legs:d.legs})}Object.keys(c).length>0&&(a[i]=c)}return{providers:o,roles:a}}var{entries:ic,setPrototypeOf:Jl,isFrozen:qf,getPrototypeOf:Ff,getOwnPropertyDescriptor:jf}=Object,{freeze:Vt,seal:lr,create:ha}=Object,{apply:ba,construct:ya}=typeof Reflect<"u"&&Reflect;Vt||(Vt=function(t){return t});lr||(lr=function(t){return t});ba||(ba=function(t,r){for(var n=arguments.length,s=new Array(n>2?n-2:0),o=2;o<n;o++)s[o-2]=arguments[o];return t.apply(r,s)});ya||(ya=function(t){for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return new t(...n)});var Qs=Kt(Array.prototype.forEach),Bf=Kt(Array.prototype.lastIndexOf),ec=Kt(Array.prototype.pop),Kn=Kt(Array.prototype.push),Uf=Kt(Array.prototype.splice),Js=Kt(String.prototype.toLowerCase),da=Kt(String.prototype.toString),pa=Kt(String.prototype.match),Yn=Kt(String.prototype.replace),Wf=Kt(String.prototype.indexOf),zf=Kt(String.prototype.trim),fr=Kt(Object.prototype.hasOwnProperty),Gt=Kt(RegExp.prototype.test),Zn=Hf(TypeError);function Kt(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var r=arguments.length,n=new Array(r>1?r-1:0),s=1;s<r;s++)n[s-1]=arguments[s];return ba(e,t,n)}}function Hf(e){return function(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return ya(e,r)}}function lt(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Js;Jl&&Jl(e,null);let n=t.length;for(;n--;){let s=t[n];if(typeof s=="string"){let o=r(s);o!==s&&(qf(t)||(t[n]=o),s=o)}e[s]=!0}return e}function Gf(e){for(let t=0;t<e.length;t++)fr(e,t)||(e[t]=null);return e}function Sr(e){let t=ha(null);for(let[r,n]of ic(e))fr(e,r)&&(Array.isArray(n)?t[r]=Gf(n):n&&typeof n=="object"&&n.constructor===Object?t[r]=Sr(n):t[r]=n);return t}function Qn(e,t){for(;e!==null;){let n=jf(e,t);if(n){if(n.get)return Kt(n.get);if(typeof n.value=="function")return Kt(n.value)}e=Ff(e)}function r(){return null}return r}var tc=Vt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),fa=Vt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_a=Vt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Vf=Vt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ma=Vt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Kf=Vt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),rc=Vt(["#text"]),nc=Vt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ga=Vt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),sc=Vt(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Xs=Vt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Yf=lr(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Zf=lr(/<%[\w\W]*|[\w\W]*%>/gm),Qf=lr(/\$\{[\w\W]*/gm),Xf=lr(/^data-[\-\w.\u00B7-\uFFFF]+$/),Jf=lr(/^aria-[\-\w]+$/),lc=lr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),e_=lr(/^(?:\w+script|data):/i),t_=lr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),cc=lr(/^html$/i),r_=lr(/^[a-z][.\w]*(-[.\w]+)+$/i),oc=Object.freeze({__proto__:null,ARIA_ATTR:Jf,ATTR_WHITESPACE:t_,CUSTOM_ELEMENT:r_,DATA_ATTR:Xf,DOCTYPE_NAME:cc,ERB_EXPR:Zf,IS_ALLOWED_URI:lc,IS_SCRIPT_OR_DATA:e_,MUSTACHE_EXPR:Yf,TMPLIT_EXPR:Qf}),Xn={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},n_=function(){return typeof window>"u"?null:window},s_=function(t,r){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let n=null,s="data-tt-policy-suffix";r&&r.hasAttribute(s)&&(n=r.getAttribute(s));let o="dompurify"+(n?"#"+n:"");try{return t.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},ac=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function uc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:n_(),t=Ie=>uc(Ie);if(t.version="3.3.0",t.removed=[],!e||!e.document||e.document.nodeType!==Xn.document||!e.Element)return t.isSupported=!1,t;let{document:r}=e,n=r,s=n.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:i,Element:c,NodeFilter:u,NamedNodeMap:d=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:p,DOMParser:_,trustedTypes:h}=e,$=c.prototype,L=Qn($,"cloneNode"),j=Qn($,"remove"),V=Qn($,"nextSibling"),H=Qn($,"childNodes"),P=Qn($,"parentNode");if(typeof a=="function"){let Ie=r.createElement("template");Ie.content&&Ie.content.ownerDocument&&(r=Ie.content.ownerDocument)}let D,O="",{implementation:U,createNodeIterator:b,createDocumentFragment:B,getElementsByTagName:ee}=r,{importNode:Ae}=n,Z=ac();t.isSupported=typeof ic=="function"&&typeof P=="function"&&U&&U.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:ge,TMPLIT_EXPR:Te,DATA_ATTR:Le,ARIA_ATTR:se,IS_SCRIPT_OR_DATA:ae,ATTR_WHITESPACE:Me,CUSTOM_ELEMENT:N}=oc,{IS_ALLOWED_URI:ne}=oc,oe=null,ke=lt({},[...tc,...fa,..._a,...ma,...rc]),Ce=null,Ne=lt({},[...nc,...ga,...sc,...Xs]),x=Object.seal(ha(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),fe=null,De=null,ve=Object.seal(ha(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ze=!0,We=!0,Ve=!1,Je=!0,ot=!1,K=!0,Q=!1,Se=!1,Qe=!1,Ge=!1,pe=!1,R=!1,J=!0,ie=!1,te="user-content-",qe=!0,at=!1,it={},Xe=null,mt=lt({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ht=null,bt=lt({},["audio","video","img","source","image","track"]),pt=null,wt=lt({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),He="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",Pe="http://www.w3.org/1999/xhtml",ct=Pe,xt=!1,X=null,E=lt({},[He,et,Pe],da),F=lt({},["mi","mo","mn","ms","mtext"]),y=lt({},["annotation-xml"]),C=lt({},["title","style","font","a","script"]),M=null,Y=["application/xhtml+xml","text/html"],xe="text/html",he=null,Ee=null,Fe=r.createElement("form"),_t=function(T){return T instanceof RegExp||T instanceof Function},yt=function(){let T=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Ee&&Ee===T)){if((!T||typeof T!="object")&&(T={}),T=Sr(T),M=Y.indexOf(T.PARSER_MEDIA_TYPE)===-1?xe:T.PARSER_MEDIA_TYPE,he=M==="application/xhtml+xml"?da:Js,oe=fr(T,"ALLOWED_TAGS")?lt({},T.ALLOWED_TAGS,he):ke,Ce=fr(T,"ALLOWED_ATTR")?lt({},T.ALLOWED_ATTR,he):Ne,X=fr(T,"ALLOWED_NAMESPACES")?lt({},T.ALLOWED_NAMESPACES,da):E,pt=fr(T,"ADD_URI_SAFE_ATTR")?lt(Sr(wt),T.ADD_URI_SAFE_ATTR,he):wt,ht=fr(T,"ADD_DATA_URI_TAGS")?lt(Sr(bt),T.ADD_DATA_URI_TAGS,he):bt,Xe=fr(T,"FORBID_CONTENTS")?lt({},T.FORBID_CONTENTS,he):mt,fe=fr(T,"FORBID_TAGS")?lt({},T.FORBID_TAGS,he):Sr({}),De=fr(T,"FORBID_ATTR")?lt({},T.FORBID_ATTR,he):Sr({}),it=fr(T,"USE_PROFILES")?T.USE_PROFILES:!1,ze=T.ALLOW_ARIA_ATTR!==!1,We=T.ALLOW_DATA_ATTR!==!1,Ve=T.ALLOW_UNKNOWN_PROTOCOLS||!1,Je=T.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ot=T.SAFE_FOR_TEMPLATES||!1,K=T.SAFE_FOR_XML!==!1,Q=T.WHOLE_DOCUMENT||!1,Ge=T.RETURN_DOM||!1,pe=T.RETURN_DOM_FRAGMENT||!1,R=T.RETURN_TRUSTED_TYPE||!1,Qe=T.FORCE_BODY||!1,J=T.SANITIZE_DOM!==!1,ie=T.SANITIZE_NAMED_PROPS||!1,qe=T.KEEP_CONTENT!==!1,at=T.IN_PLACE||!1,ne=T.ALLOWED_URI_REGEXP||lc,ct=T.NAMESPACE||Pe,F=T.MATHML_TEXT_INTEGRATION_POINTS||F,y=T.HTML_INTEGRATION_POINTS||y,x=T.CUSTOM_ELEMENT_HANDLING||{},T.CUSTOM_ELEMENT_HANDLING&&_t(T.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(x.tagNameCheck=T.CUSTOM_ELEMENT_HANDLING.tagNameCheck),T.CUSTOM_ELEMENT_HANDLING&&_t(T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(x.attributeNameCheck=T.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),T.CUSTOM_ELEMENT_HANDLING&&typeof T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(x.allowCustomizedBuiltInElements=T.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ot&&(We=!1),pe&&(Ge=!0),it&&(oe=lt({},rc),Ce=[],it.html===!0&&(lt(oe,tc),lt(Ce,nc)),it.svg===!0&&(lt(oe,fa),lt(Ce,ga),lt(Ce,Xs)),it.svgFilters===!0&&(lt(oe,_a),lt(Ce,ga),lt(Ce,Xs)),it.mathMl===!0&&(lt(oe,ma),lt(Ce,sc),lt(Ce,Xs))),T.ADD_TAGS&&(typeof T.ADD_TAGS=="function"?ve.tagCheck=T.ADD_TAGS:(oe===ke&&(oe=Sr(oe)),lt(oe,T.ADD_TAGS,he))),T.ADD_ATTR&&(typeof T.ADD_ATTR=="function"?ve.attributeCheck=T.ADD_ATTR:(Ce===Ne&&(Ce=Sr(Ce)),lt(Ce,T.ADD_ATTR,he))),T.ADD_URI_SAFE_ATTR&&lt(pt,T.ADD_URI_SAFE_ATTR,he),T.FORBID_CONTENTS&&(Xe===mt&&(Xe=Sr(Xe)),lt(Xe,T.FORBID_CONTENTS,he)),qe&&(oe["#text"]=!0),Q&&lt(oe,["html","head","body"]),oe.table&&(lt(oe,["tbody"]),delete fe.tbody),T.TRUSTED_TYPES_POLICY){if(typeof T.TRUSTED_TYPES_POLICY.createHTML!="function")throw Zn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof T.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Zn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');D=T.TRUSTED_TYPES_POLICY,O=D.createHTML("")}else D===void 0&&(D=s_(h,s)),D!==null&&typeof O=="string"&&(O=D.createHTML(""));Vt&&Vt(T),Ee=T}},Ze=lt({},[...fa,..._a,...Vf]),Ft=lt({},[...ma,...Kf]),zt=function(T){let ce=P(T);(!ce||!ce.tagName)&&(ce={namespaceURI:ct,tagName:"template"});let Re=Js(T.tagName),ft=Js(ce.tagName);return X[T.namespaceURI]?T.namespaceURI===et?ce.namespaceURI===Pe?Re==="svg":ce.namespaceURI===He?Re==="svg"&&(ft==="annotation-xml"||F[ft]):!!Ze[Re]:T.namespaceURI===He?ce.namespaceURI===Pe?Re==="math":ce.namespaceURI===et?Re==="math"&&y[ft]:!!Ft[Re]:T.namespaceURI===Pe?ce.namespaceURI===et&&!y[ft]||ce.namespaceURI===He&&!F[ft]?!1:!Ft[Re]&&(C[Re]||!Ze[Re]):!!(M==="application/xhtml+xml"&&X[T.namespaceURI]):!1},je=function(T){Kn(t.removed,{element:T});try{P(T).removeChild(T)}catch{j(T)}},Lt=function(T,ce){try{Kn(t.removed,{attribute:ce.getAttributeNode(T),from:ce})}catch{Kn(t.removed,{attribute:null,from:ce})}if(ce.removeAttribute(T),T==="is")if(Ge||pe)try{je(ce)}catch{}else try{ce.setAttribute(T,"")}catch{}},Ut=function(T){let ce=null,Re=null;if(Qe)T="<remove></remove>"+T;else{let kt=pa(T,/^[\r\n\t ]+/);Re=kt&&kt[0]}M==="application/xhtml+xml"&&ct===Pe&&(T='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+T+"</body></html>");let ft=D?D.createHTML(T):T;if(ct===Pe)try{ce=new _().parseFromString(ft,M)}catch{}if(!ce||!ce.documentElement){ce=U.createDocument(ct,"template",null);try{ce.documentElement.innerHTML=xt?O:ft}catch{}}let Pt=ce.body||ce.documentElement;return T&&Re&&Pt.insertBefore(r.createTextNode(Re),Pt.childNodes[0]||null),ct===Pe?ee.call(ce,Q?"html":"body")[0]:Q?ce.documentElement:Pt},Mt=function(T){return b.call(T.ownerDocument||T,T,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},k=function(T){return T instanceof p&&(typeof T.nodeName!="string"||typeof T.textContent!="string"||typeof T.removeChild!="function"||!(T.attributes instanceof d)||typeof T.removeAttribute!="function"||typeof T.setAttribute!="function"||typeof T.namespaceURI!="string"||typeof T.insertBefore!="function"||typeof T.hasChildNodes!="function")},w=function(T){return typeof i=="function"&&T instanceof i};function I(Ie,T,ce){Qs(Ie,Re=>{Re.call(t,T,ce,Ee)})}let W=function(T){let ce=null;if(I(Z.beforeSanitizeElements,T,null),k(T))return je(T),!0;let Re=he(T.nodeName);if(I(Z.uponSanitizeElement,T,{tagName:Re,allowedTags:oe}),K&&T.hasChildNodes()&&!w(T.firstElementChild)&&Gt(/<[/\w!]/g,T.innerHTML)&&Gt(/<[/\w!]/g,T.textContent)||T.nodeType===Xn.progressingInstruction||K&&T.nodeType===Xn.comment&&Gt(/<[/\w]/g,T.data))return je(T),!0;if(!(ve.tagCheck instanceof Function&&ve.tagCheck(Re))&&(!oe[Re]||fe[Re])){if(!fe[Re]&&we(Re)&&(x.tagNameCheck instanceof RegExp&&Gt(x.tagNameCheck,Re)||x.tagNameCheck instanceof Function&&x.tagNameCheck(Re)))return!1;if(qe&&!Xe[Re]){let ft=P(T)||T.parentNode,Pt=H(T)||T.childNodes;if(Pt&&ft){let kt=Pt.length;for(let Dt=kt-1;Dt>=0;--Dt){let f=L(Pt[Dt],!0);f.__removalCount=(T.__removalCount||0)+1,ft.insertBefore(f,V(T))}}}return je(T),!0}return T instanceof c&&!zt(T)||(Re==="noscript"||Re==="noembed"||Re==="noframes")&&Gt(/<\/no(script|embed|frames)/i,T.innerHTML)?(je(T),!0):(ot&&T.nodeType===Xn.text&&(ce=T.textContent,Qs([le,ge,Te],ft=>{ce=Yn(ce,ft," ")}),T.textContent!==ce&&(Kn(t.removed,{element:T.cloneNode()}),T.textContent=ce)),I(Z.afterSanitizeElements,T,null),!1)},ye=function(T,ce,Re){if(J&&(ce==="id"||ce==="name")&&(Re in r||Re in Fe))return!1;if(!(We&&!De[ce]&&Gt(Le,ce))){if(!(ze&&Gt(se,ce))){if(!(ve.attributeCheck instanceof Function&&ve.attributeCheck(ce,T))){if(!Ce[ce]||De[ce]){if(!(we(T)&&(x.tagNameCheck instanceof RegExp&&Gt(x.tagNameCheck,T)||x.tagNameCheck instanceof Function&&x.tagNameCheck(T))&&(x.attributeNameCheck instanceof RegExp&&Gt(x.attributeNameCheck,ce)||x.attributeNameCheck instanceof Function&&x.attributeNameCheck(ce,T))||ce==="is"&&x.allowCustomizedBuiltInElements&&(x.tagNameCheck instanceof RegExp&&Gt(x.tagNameCheck,Re)||x.tagNameCheck instanceof Function&&x.tagNameCheck(Re))))return!1}else if(!pt[ce]){if(!Gt(ne,Yn(Re,Me,""))){if(!((ce==="src"||ce==="xlink:href"||ce==="href")&&T!=="script"&&Wf(Re,"data:")===0&&ht[T])){if(!(Ve&&!Gt(ae,Yn(Re,Me,"")))){if(Re)return!1}}}}}}}return!0},we=function(T){return T!=="annotation-xml"&&pa(T,N)},be=function(T){I(Z.beforeSanitizeAttributes,T,null);let{attributes:ce}=T;if(!ce||k(T))return;let Re={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Ce,forceKeepAttr:void 0},ft=ce.length;for(;ft--;){let Pt=ce[ft],{name:kt,namespaceURI:Dt,value:f}=Pt,A=he(kt),G=f,m=kt==="value"?G:zf(G);if(Re.attrName=A,Re.attrValue=m,Re.keepAttr=!0,Re.forceKeepAttr=void 0,I(Z.uponSanitizeAttribute,T,Re),m=Re.attrValue,ie&&(A==="id"||A==="name")&&(Lt(kt,T),m=te+m),K&&Gt(/((--!?|])>)|<\/(style|title|textarea)/i,m)){Lt(kt,T);continue}if(A==="attributename"&&pa(m,"href")){Lt(kt,T);continue}if(Re.forceKeepAttr)continue;if(!Re.keepAttr){Lt(kt,T);continue}if(!Je&&Gt(/\/>/i,m)){Lt(kt,T);continue}ot&&Qs([le,ge,Te],de=>{m=Yn(m,de," ")});let v=he(T.nodeName);if(!ye(v,A,m)){Lt(kt,T);continue}if(D&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!Dt)switch(h.getAttributeType(v,A)){case"TrustedHTML":{m=D.createHTML(m);break}case"TrustedScriptURL":{m=D.createScriptURL(m);break}}if(m!==G)try{Dt?T.setAttributeNS(Dt,kt,m):T.setAttribute(kt,m),k(T)?je(T):ec(t.removed)}catch{Lt(kt,T)}}I(Z.afterSanitizeAttributes,T,null)},tt=function Ie(T){let ce=null,Re=Mt(T);for(I(Z.beforeSanitizeShadowDOM,T,null);ce=Re.nextNode();)I(Z.uponSanitizeShadowNode,ce,null),W(ce),be(ce),ce.content instanceof o&&Ie(ce.content);I(Z.afterSanitizeShadowDOM,T,null)};return t.sanitize=function(Ie){let T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},ce=null,Re=null,ft=null,Pt=null;if(xt=!Ie,xt&&(Ie="<!-->"),typeof Ie!="string"&&!w(Ie))if(typeof Ie.toString=="function"){if(Ie=Ie.toString(),typeof Ie!="string")throw Zn("dirty is not a string, aborting")}else throw Zn("toString is not a function");if(!t.isSupported)return Ie;if(Se||yt(T),t.removed=[],typeof Ie=="string"&&(at=!1),at){if(Ie.nodeName){let f=he(Ie.nodeName);if(!oe[f]||fe[f])throw Zn("root node is forbidden and cannot be sanitized in-place")}}else if(Ie instanceof i)ce=Ut("<!---->"),Re=ce.ownerDocument.importNode(Ie,!0),Re.nodeType===Xn.element&&Re.nodeName==="BODY"||Re.nodeName==="HTML"?ce=Re:ce.appendChild(Re);else{if(!Ge&&!ot&&!Q&&Ie.indexOf("<")===-1)return D&&R?D.createHTML(Ie):Ie;if(ce=Ut(Ie),!ce)return Ge?null:R?O:""}ce&&Qe&&je(ce.firstChild);let kt=Mt(at?Ie:ce);for(;ft=kt.nextNode();)W(ft),be(ft),ft.content instanceof o&&tt(ft.content);if(at)return Ie;if(Ge){if(pe)for(Pt=B.call(ce.ownerDocument);ce.firstChild;)Pt.appendChild(ce.firstChild);else Pt=ce;return(Ce.shadowroot||Ce.shadowrootmode)&&(Pt=Ae.call(n,Pt,!0)),Pt}let Dt=Q?ce.outerHTML:ce.innerHTML;return Q&&oe["!doctype"]&&ce.ownerDocument&&ce.ownerDocument.doctype&&ce.ownerDocument.doctype.name&&Gt(cc,ce.ownerDocument.doctype.name)&&(Dt="<!DOCTYPE "+ce.ownerDocument.doctype.name+`>
`+Dt),ot&&Qs([le,ge,Te],f=>{Dt=Yn(Dt,f," ")}),D&&R?D.createHTML(Dt):Dt},t.setConfig=function(){let Ie=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};yt(Ie),Se=!0},t.clearConfig=function(){Ee=null,Se=!1},t.isValidAttribute=function(Ie,T,ce){Ee||yt({});let Re=he(Ie),ft=he(T);return ye(Re,ft,ce)},t.addHook=function(Ie,T){typeof T=="function"&&Kn(Z[Ie],T)},t.removeHook=function(Ie,T){if(T!==void 0){let ce=Bf(Z[Ie],T);return ce===-1?void 0:Uf(Z[Ie],ce,1)[0]}return ec(Z[Ie])},t.removeHooks=function(Ie){Z[Ie]=[]},t.removeAllHooks=function(){Z=ac()},t}var dc=uc();var Er={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},eo=e=>(...t)=>({_$litDirective$:e,values:t}),xn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,n){this._$Ct=t,this._$AM=r,this._$Ci=n}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Jn=class extends xn{constructor(t){if(super(t),this.it=Ot,t.type!==Er.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===Ot||t==null)return this._t=void 0,this.it=t;if(t===or)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};Jn.directiveName="unsafeHTML",Jn.resultType=1;var pc=eo(Jn);function $a(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var rn=$a();function yc(e){rn=e}var ns={exec:()=>null};function gt(e,t=""){let r=typeof e=="string"?e:e.source,n={replace:(s,o)=>{let a=typeof o=="string"?o:o.source;return a=a.replace(Yt.caret,"$1"),r=r.replace(s,a),n},getRegex:()=>new RegExp(r,t)};return n}var o_=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Yt={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>new RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i")},a_=/^(?:[ \t]*(?:\n|$))+/,i_=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,l_=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,ss=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,c_=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,xa=/(?:[*+-]|\d{1,9}[.)])/,vc=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,wc=gt(vc).replace(/bull/g,xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),u_=gt(vc).replace(/bull/g,xa).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Aa=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,d_=/^[^\n]+/,Sa=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,p_=gt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Sa).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),f_=gt(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,xa).getRegex(),ao="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ea=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,__=gt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ea).replace("tag",ao).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),kc=gt(Aa).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),m_=gt(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",kc).getRegex(),Ta={blockquote:m_,code:i_,def:p_,fences:l_,heading:c_,hr:ss,html:__,lheading:wc,list:f_,newline:a_,paragraph:kc,table:ns,text:d_},fc=gt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex(),g_={...Ta,lheading:u_,table:fc,paragraph:gt(Aa).replace("hr",ss).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",fc).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",ao).getRegex()},h_={...Ta,html:gt(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ea).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ns,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:gt(Aa).replace("hr",ss).replace("heading",` *#{1,6} *[^
]`).replace("lheading",wc).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},b_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,y_=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$c=/^( {2,}|\\)\n(?!\s*$)/,v_=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,io=/[\p{P}\p{S}]/u,Ca=/[\s\p{P}\p{S}]/u,xc=/[^\s\p{P}\p{S}]/u,w_=gt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ca).getRegex(),Ac=/(?!~)[\p{P}\p{S}]/u,k_=/(?!~)[\s\p{P}\p{S}]/u,$_=/(?:[^\s\p{P}\p{S}]|~)/u,x_=gt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",o_?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Sc=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,A_=gt(Sc,"u").replace(/punct/g,io).getRegex(),S_=gt(Sc,"u").replace(/punct/g,Ac).getRegex(),Ec="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",E_=gt(Ec,"gu").replace(/notPunctSpace/g,xc).replace(/punctSpace/g,Ca).replace(/punct/g,io).getRegex(),T_=gt(Ec,"gu").replace(/notPunctSpace/g,$_).replace(/punctSpace/g,k_).replace(/punct/g,Ac).getRegex(),C_=gt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xc).replace(/punctSpace/g,Ca).replace(/punct/g,io).getRegex(),R_=gt(/\\(punct)/,"gu").replace(/punct/g,io).getRegex(),I_=gt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),O_=gt(Ea).replace("(?:-->|$)","-->").getRegex(),L_=gt("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",O_).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),no=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,M_=gt(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",no).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Tc=gt(/^!?\[(label)\]\[(ref)\]/).replace("label",no).replace("ref",Sa).getRegex(),Cc=gt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Sa).getRegex(),P_=gt("reflink|nolink(?!\\()","g").replace("reflink",Tc).replace("nolink",Cc).getRegex(),_c=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ra={_backpedal:ns,anyPunctuation:R_,autolink:I_,blockSkip:x_,br:$c,code:y_,del:ns,emStrongLDelim:A_,emStrongRDelimAst:E_,emStrongRDelimUnd:C_,escape:b_,link:M_,nolink:Cc,punctuation:w_,reflink:Tc,reflinkSearch:P_,tag:L_,text:v_,url:ns},D_={...Ra,link:gt(/^!?\[(label)\]\((.*?)\)/).replace("label",no).getRegex(),reflink:gt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",no).getRegex()},va={...Ra,emStrongRDelimAst:T_,emStrongLDelim:S_,url:gt(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",_c).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:gt(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",_c).getRegex()},N_={...va,br:gt($c).replace("{2,}","*").getRegex(),text:gt(va.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},to={normal:Ta,gfm:g_,pedantic:h_},es={normal:Ra,gfm:va,breaks:N_,pedantic:D_},q_={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},mc=e=>q_[e];function Tr(e,t){if(t){if(Yt.escapeTest.test(e))return e.replace(Yt.escapeReplace,mc)}else if(Yt.escapeTestNoEncode.test(e))return e.replace(Yt.escapeReplaceNoEncode,mc);return e}function gc(e){try{e=encodeURI(e).replace(Yt.percentDecode,"%")}catch{return null}return e}function hc(e,t){let r=e.replace(Yt.findPipe,(o,a,i)=>{let c=!1,u=a;for(;--u>=0&&i[u]==="\\";)c=!c;return c?"|":" |"}),n=r.split(Yt.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(Yt.slashPipe,"|");return n}function ts(e,t,r){let n=e.length;if(n===0)return"";let s=0;for(;s<n;){let o=e.charAt(n-s-1);if(o===t&&!r)s++;else if(o!==t&&r)s++;else break}return e.slice(0,n-s)}function F_(e,t){if(e.indexOf(t[1])===-1)return-1;let r=0;for(let n=0;n<e.length;n++)if(e[n]==="\\")n++;else if(e[n]===t[0])r++;else if(e[n]===t[1]&&(r--,r<0))return n;return r>0?-2:-1}function bc(e,t,r,n,s){let o=t.href,a=t.title||null,i=e[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let c={type:e[0].charAt(0)==="!"?"image":"link",raw:r,href:o,title:a,text:i,tokens:n.inlineTokens(i)};return n.state.inLink=!1,c}function j_(e,t,r){let n=e.match(r.other.indentCodeCompensation);if(n===null)return t;let s=n[1];return t.split(`
`).map(o=>{let a=o.match(r.other.beginningSpace);if(a===null)return o;let[i]=a;return i.length>=s.length?o.slice(s.length):o}).join(`
`)}var so=class{constructor(e){$t(this,"options");$t(this,"rules");$t(this,"lexer");this.options=e||rn}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let r=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ts(r,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let r=t[0],n=j_(r,t[3]||"",this.rules);return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let r=t[2].trim();if(this.rules.other.endingHash.test(r)){let n=ts(r,"#");(this.options.pedantic||!n||this.rules.other.endingSpaceChar.test(n))&&(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:ts(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let r=ts(t[0],`
`).split(`
`),n="",s="",o=[];for(;r.length>0;){let a=!1,i=[],c;for(c=0;c<r.length;c++)if(this.rules.other.blockquoteStart.test(r[c]))i.push(r[c]),a=!0;else if(!a)i.push(r[c]);else break;r=r.slice(c);let u=i.join(`
`),d=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}
${u}`:u,s=s?`${s}
${d}`:d;let p=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=p,r.length===0)break;let _=o.at(-1);if(_?.type==="code")break;if(_?.type==="blockquote"){let h=_,$=h.raw+`
`+r.join(`
`),L=this.blockquote($);o[o.length-1]=L,n=n.substring(0,n.length-h.raw.length)+L.raw,s=s.substring(0,s.length-h.text.length)+L.text;break}else if(_?.type==="list"){let h=_,$=h.raw+`
`+r.join(`
`),L=this.list($);o[o.length-1]=L,n=n.substring(0,n.length-_.raw.length)+L.raw,s=s.substring(0,s.length-h.raw.length)+L.raw,r=$.substring(o.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:n,tokens:o,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let r=t[1].trim(),n=r.length>1,s={type:"list",raw:"",ordered:n,start:n?+r.slice(0,-1):"",loose:!1,items:[]};r=n?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=n?r:"[*+-]");let o=this.rules.other.listItemRegex(r),a=!1;for(;e;){let c=!1,u="",d="";if(!(t=o.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let p=t[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,L=>" ".repeat(3*L.length)),_=e.split(`
`,1)[0],h=!p.trim(),$=0;if(this.options.pedantic?($=2,d=p.trimStart()):h?$=t[1].length+1:($=t[2].search(this.rules.other.nonSpaceChar),$=$>4?1:$,d=p.slice($),$+=t[1].length),h&&this.rules.other.blankLine.test(_)&&(u+=_+`
`,e=e.substring(_.length+1),c=!0),!c){let L=this.rules.other.nextBulletRegex($),j=this.rules.other.hrRegex($),V=this.rules.other.fencesBeginRegex($),H=this.rules.other.headingBeginRegex($),P=this.rules.other.htmlBeginRegex($);for(;e;){let D=e.split(`
`,1)[0],O;if(_=D,this.options.pedantic?(_=_.replace(this.rules.other.listReplaceNesting,"  "),O=_):O=_.replace(this.rules.other.tabCharGlobal,"    "),V.test(_)||H.test(_)||P.test(_)||L.test(_)||j.test(_))break;if(O.search(this.rules.other.nonSpaceChar)>=$||!_.trim())d+=`
`+O.slice($);else{if(h||p.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||V.test(p)||H.test(p)||j.test(p))break;d+=`
`+_}!h&&!_.trim()&&(h=!0),u+=D+`
`,e=e.substring(D.length+1),p=O.slice($)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),s.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),s.raw+=u}let i=s.items.at(-1);if(i)i.raw=i.raw.trimEnd(),i.text=i.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let c of s.items){if(this.lexer.state.top=!1,c.tokens=this.lexer.blockTokens(c.text,[]),c.task){if(c.text=c.text.replace(this.rules.other.listReplaceTask,""),c.tokens[0]?.type==="text"||c.tokens[0]?.type==="paragraph"){c.tokens[0].raw=c.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),c.tokens[0].text=c.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(c.raw);if(u){let d={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};c.checked=d.checked,s.loose?c.tokens[0]&&["paragraph","text"].includes(c.tokens[0].type)&&"tokens"in c.tokens[0]&&c.tokens[0].tokens?(c.tokens[0].raw=d.raw+c.tokens[0].raw,c.tokens[0].text=d.raw+c.tokens[0].text,c.tokens[0].tokens.unshift(d)):c.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):c.tokens.unshift(d)}}if(!s.loose){let u=c.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));s.loose=d}}if(s.loose)for(let c of s.items){c.loose=!0;for(let u of c.tokens)u.type==="text"&&(u.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let r=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:r,raw:t[0],href:n,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let r=hc(t[1]),n=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],o={type:"table",raw:t[0],header:[],align:[],rows:[]};if(r.length===n.length){for(let a of n)this.rules.other.tableAlignRight.test(a)?o.align.push("right"):this.rules.other.tableAlignCenter.test(a)?o.align.push("center"):this.rules.other.tableAlignLeft.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<r.length;a++)o.header.push({text:r[a],tokens:this.lexer.inline(r[a]),header:!0,align:o.align[a]});for(let a of s)o.rows.push(hc(a,o.header.length).map((i,c)=>({text:i,tokens:this.lexer.inline(i),header:!1,align:o.align[c]})));return o}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t)return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:this.lexer.inline(t[1])}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let r=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let o=ts(r.slice(0,-1),"\\");if((r.length-o.length)%2===0)return}else{let o=F_(t[2],"()");if(o===-2)return;if(o>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let n=t[2],s="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(n);o&&(n=o[1],s=o[3])}else s=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?n=n.slice(1):n=n.slice(1,-1)),bc(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){let n=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[n.toLowerCase()];if(!s){let o=r[0].charAt(0);return{type:"text",raw:o,text:o}}return bc(r,s,r[0],this.lexer,this.rules)}}emStrong(e,t,r=""){let n=this.rules.inline.emStrongLDelim.exec(e);if(!(!n||n[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(n[1]||n[2])||!r||this.rules.inline.punctuation.exec(r))){let s=[...n[0]].length-1,o,a,i=s,c=0,u=n[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(u.lastIndex=0,t=t.slice(-1*e.length+s);(n=u.exec(t))!=null;){if(o=n[1]||n[2]||n[3]||n[4]||n[5]||n[6],!o)continue;if(a=[...o].length,n[3]||n[4]){i+=a;continue}else if((n[5]||n[6])&&s%3&&!((s+a)%3)){c+=a;continue}if(i-=a,i>0)continue;a=Math.min(a,a+i+c);let d=[...n[0]][0].length,p=e.slice(0,s+n.index+d+a);if(Math.min(s,a)%2){let h=p.slice(1,-1);return{type:"em",raw:p,text:h,tokens:this.lexer.inlineTokens(h)}}let _=p.slice(2,-2);return{type:"strong",raw:p,text:_,tokens:this.lexer.inlineTokens(_)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let r=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(r),s=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return n&&s&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:t[0],text:r}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e){let t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let r,n;return t[2]==="@"?(r=t[1],n="mailto:"+r):(r=t[1],n=r),{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let r,n;if(t[2]==="@")r=t[0],n="mailto:"+r;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);r=t[0],t[1]==="www."?n="http://"+t[0]:n=t[0]}return{type:"link",raw:t[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let r=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:r}}}},_r=class wa{constructor(t){$t(this,"tokens");$t(this,"options");$t(this,"state");$t(this,"inlineQueue");$t(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||rn,this.options.tokenizer=this.options.tokenizer||new so,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Yt,block:to.normal,inline:es.normal};this.options.pedantic?(r.block=to.pedantic,r.inline=es.pedantic):this.options.gfm&&(r.block=to.gfm,this.options.breaks?r.inline=es.breaks:r.inline=es.gfm),this.tokenizer.rules=r}static get rules(){return{block:to,inline:es}}static lex(t,r){return new wa(r).lex(t)}static lexInline(t,r){return new wa(r).inlineTokens(t)}lex(t){t=t.replace(Yt.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let n=this.inlineQueue[r];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,r=[],n=!1){for(this.options.pedantic&&(t=t.replace(Yt.tabCharGlobal,"    ").replace(Yt.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,r))?(t=t.substring(s.raw.length),r.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=r.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:r.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},r.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),r.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),r.push(s);continue}let o=t;if(this.options.extensions?.startBlock){let a=1/0,i=t.slice(1),c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},i),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(o))){let a=r.at(-1);n&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s),n=o.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=r.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):r.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,r}inline(t,r=[]){return this.inlineQueue.push({src:t,tokens:r}),r}inlineTokens(t,r=[]){let n=t,s=null;if(this.tokens.links){let c=Object.keys(this.tokens.links);if(c.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(n))!=null;)c.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(n))!=null;)n=n.slice(0,s.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let o;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(n))!=null;)o=s[2]?s[2].length:0,n=n.slice(0,s.index+o)+"["+"a".repeat(s[0].length-o-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let a=!1,i="";for(;t;){a||(i=""),a=!1;let c;if(this.options.extensions?.inline?.some(d=>(c=d.call({lexer:this},t,r))?(t=t.substring(c.raw.length),r.push(c),!0):!1))continue;if(c=this.tokenizer.escape(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.tag(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.link(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(c.raw.length);let d=r.at(-1);c.type==="text"&&d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(c=this.tokenizer.emStrong(t,n,i)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.codespan(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.br(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.del(t)){t=t.substring(c.raw.length),r.push(c);continue}if(c=this.tokenizer.autolink(t)){t=t.substring(c.raw.length),r.push(c);continue}if(!this.state.inLink&&(c=this.tokenizer.url(t))){t=t.substring(c.raw.length),r.push(c);continue}let u=t;if(this.options.extensions?.startInline){let d=1/0,p=t.slice(1),_;this.options.extensions.startInline.forEach(h=>{_=h.call({lexer:this},p),typeof _=="number"&&_>=0&&(d=Math.min(d,_))}),d<1/0&&d>=0&&(u=t.substring(0,d+1))}if(c=this.tokenizer.inlineText(u)){t=t.substring(c.raw.length),c.raw.slice(-1)!=="_"&&(i=c.raw.slice(-1)),a=!0;let d=r.at(-1);d?.type==="text"?(d.raw+=c.raw,d.text+=c.text):r.push(c);continue}if(t){let d="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(d);break}else throw new Error(d)}}return r}},oo=class{constructor(e){$t(this,"options");$t(this,"parser");this.options=e||rn}space(e){return""}code({text:e,lang:t,escaped:r}){let n=(t||"").match(Yt.notSpaceStart)?.[0],s=e.replace(Yt.endingNewline,"")+`
`;return n?'<pre><code class="language-'+Tr(n)+'">'+(r?s:Tr(s,!0))+`</code></pre>
`:"<pre><code>"+(r?s:Tr(s,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Tr(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:r}){let n=this.parser.parseInline(r),s=gc(e);if(s===null)return n;e=s;let o='<a href="'+e+'"';return t&&(o+=' title="'+Tr(t)+'"'),o+=">"+n+"</a>",o}image({href:e,title:t,text:r,tokens:n}){n&&(r=this.parser.parseInline(n,this.parser.textRenderer));let s=gc(e);if(s===null)return Tr(r);e=s;let o=`<img src="${e}" alt="${r}"`;return t&&(o+=` title="${Tr(t)}"`),o+=">",o}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:Tr(e.text)}},Ia=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},mr=class ka{constructor(t){$t(this,"options");$t(this,"renderer");$t(this,"textRenderer");this.options=t||rn,this.options.renderer=this.options.renderer||new oo,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ia}static parse(t,r){return new ka(r).parse(t)}static parseInline(t,r){return new ka(r).parseInline(t)}parse(t){let r="";for(let n=0;n<t.length;n++){let s=t[n];if(this.options.extensions?.renderers?.[s.type]){let a=s,i=this.options.extensions.renderers[a.type].call({parser:this},a);if(i!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){r+=i||"";continue}}let o=s;switch(o.type){case"space":{r+=this.renderer.space(o);break}case"hr":{r+=this.renderer.hr(o);break}case"heading":{r+=this.renderer.heading(o);break}case"code":{r+=this.renderer.code(o);break}case"table":{r+=this.renderer.table(o);break}case"blockquote":{r+=this.renderer.blockquote(o);break}case"list":{r+=this.renderer.list(o);break}case"checkbox":{r+=this.renderer.checkbox(o);break}case"html":{r+=this.renderer.html(o);break}case"def":{r+=this.renderer.def(o);break}case"paragraph":{r+=this.renderer.paragraph(o);break}case"text":{r+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return r}parseInline(t,r=this.renderer){let n="";for(let s=0;s<t.length;s++){let o=t[s];if(this.options.extensions?.renderers?.[o.type]){let i=this.options.extensions.renderers[o.type].call({parser:this},o);if(i!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){n+=i||"";continue}}let a=o;switch(a.type){case"escape":{n+=r.text(a);break}case"html":{n+=r.html(a);break}case"link":{n+=r.link(a);break}case"image":{n+=r.image(a);break}case"checkbox":{n+=r.checkbox(a);break}case"strong":{n+=r.strong(a);break}case"em":{n+=r.em(a);break}case"codespan":{n+=r.codespan(a);break}case"br":{n+=r.br(a);break}case"del":{n+=r.del(a);break}case"text":{n+=r.text(a);break}default:{let i='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return n}},ro,rs=(ro=class{constructor(e){$t(this,"options");$t(this,"block");this.options=e||rn}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(){return this.block?_r.lex:_r.lexInline}provideParser(){return this.block?mr.parse:mr.parseInline}},$t(ro,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),$t(ro,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),ro),B_=class{constructor(...e){$t(this,"defaults",$a());$t(this,"options",this.setOptions);$t(this,"parse",this.parseMarkdown(!0));$t(this,"parseInline",this.parseMarkdown(!1));$t(this,"Parser",mr);$t(this,"Renderer",oo);$t(this,"TextRenderer",Ia);$t(this,"Lexer",_r);$t(this,"Tokenizer",so);$t(this,"Hooks",rs);this.use(...e)}walkTokens(e,t){let r=[];for(let n of e)switch(r=r.concat(t.call(this,n)),n.type){case"table":{let s=n;for(let o of s.header)r=r.concat(this.walkTokens(o.tokens,t));for(let o of s.rows)for(let a of o)r=r.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=n;r=r.concat(this.walkTokens(s.items,t));break}default:{let s=n;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(o=>{let a=s[o].flat(1/0);r=r.concat(this.walkTokens(a,t))}):s.tokens&&(r=r.concat(this.walkTokens(s.tokens,t)))}}return r}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(r=>{let n={...r};if(n.async=this.defaults.async||n.async||!1,r.extensions&&(r.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let o=t.renderers[s.name];o?t.renderers[s.name]=function(...a){let i=s.renderer.apply(this,a);return i===!1&&(i=o.apply(this,a)),i}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let o=t[s.level];o?o.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),n.extensions=t),r.renderer){let s=this.defaults.renderer||new oo(this.defaults);for(let o in r.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;let a=o,i=r.renderer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}n.renderer=s}if(r.tokenizer){let s=this.defaults.tokenizer||new so(this.defaults);for(let o in r.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;let a=o,i=r.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.tokenizer=s}if(r.hooks){let s=this.defaults.hooks||new rs;for(let o in r.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;let a=o,i=r.hooks[a],c=s[a];rs.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async&&rs.passThroughHooksRespectAsync.has(o))return(async()=>{let p=await i.call(s,u);return c.call(s,p)})();let d=i.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{if(this.defaults.async)return(async()=>{let p=await i.apply(s,u);return p===!1&&(p=await c.apply(s,u)),p})();let d=i.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}n.hooks=s}if(r.walkTokens){let s=this.defaults.walkTokens,o=r.walkTokens;n.walkTokens=function(a){let i=[];return i.push(o.call(this,a)),s&&(i=i.concat(s.call(this,a))),i}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return _r.lex(e,t??this.defaults)}parser(e,t){return mr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,r)=>{let n={...r},s={...this.defaults,...n},o=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&n.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,i=await(s.hooks?await s.hooks.provideLexer():e?_r.lex:_r.lexInline)(a,s),c=s.hooks?await s.hooks.processAllTokens(i):i;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let u=await(s.hooks?await s.hooks.provideParser():e?mr.parse:mr.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(u):u})().catch(o);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer():e?_r.lex:_r.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let i=(s.hooks?s.hooks.provideParser():e?mr.parse:mr.parseInline)(a,s);return s.hooks&&(i=s.hooks.postprocess(i)),i}catch(a){return o(a)}}}onError(e,t){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let n="<p>An error occurred:</p><pre>"+Tr(r.message+"",!0)+"</pre>";return t?Promise.resolve(n):n}if(t)return Promise.reject(r);throw r}}},tn=new B_;function vt(e,t){return tn.parse(e,t)}vt.options=vt.setOptions=function(e){return tn.setOptions(e),vt.defaults=tn.defaults,yc(vt.defaults),vt};vt.getDefaults=$a;vt.defaults=rn;vt.use=function(...e){return tn.use(...e),vt.defaults=tn.defaults,yc(vt.defaults),vt};vt.walkTokens=function(e,t){return tn.walkTokens(e,t)};vt.parseInline=tn.parseInline;vt.Parser=mr;vt.parser=mr.parse;vt.Renderer=oo;vt.TextRenderer=Ia;vt.Lexer=_r;vt.lexer=_r.lex;vt.Tokenizer=so;vt.Hooks=rs;vt.parse=vt;var Gy=vt.options,Vy=vt.setOptions,Ky=vt.use,Yy=vt.walkTokens,Zy=vt.parseInline;var Qy=mr.parse,Xy=_r.lex;function Nr(e){let t=vt.parse(e),r=dc.sanitize(t);return pc(r)}function Cr(e,t){return l`<div class="prompt-block">
    <div class="prompt-block__label">${e}</div>
    <pre class="prompt-block__body">${t}</pre>
  </div>`}function An(e){return e.loading?l`<div class="prompt-block__status">불러오는 중…</div>`:e.error?l`<div class="prompt-block__status prompt-block__status--error">
      프롬프트를 불러오지 못했습니다
    </div>`:""}function lo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=n=>String(n).padStart(2,"0");return`${t.getFullYear()}-${r(t.getMonth()+1)}-${r(t.getDate())} ${r(t.getHours())}:${r(t.getMinutes())}`}var Ic={Read:"\u{1F4D6}",Edit:"\u270E",MultiEdit:"\u270E",Write:"\u{1F4DD}",Bash:"\u26A1",Grep:"\u{1F50E}",Glob:"\u{1F50E}",Task:"\u{1F916}",Agent:"\u{1F916}",WebFetch:"\u{1F310}",WebSearch:"\u{1F310}"},U_={command_execution:"\uBA85\uB839 \uC2E4\uD589",file_change:"\uD30C\uC77C \uBCC0\uACBD",mcp_call:"MCP \uD638\uCD9C",web_search:"\uC6F9 \uAC80\uC0C9",plan:"\uACC4\uD68D"},W_=/^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/,z_=/^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;function yr(e){return!!e&&typeof e=="object"}function Oa(e){return typeof e!="string"||e.length===0?[]:e.split(/\r?\n/)}function La(e,t){let r=Oa(e),n=Oa(t),s=new Map;for(let i of r)s.set(i,(s.get(i)||0)+1);let o=0;for(let i of n){let c=s.get(i)||0;c>0?s.set(i,c-1):o+=1}let a=0;for(let i of s.values())a+=i;return{added:o,removed:a}}function Oc(e){let t="";typeof e=="string"?t=e:Array.isArray(e)?t=e.map(s=>yr(s)&&typeof s.text=="string"?s.text:"").join(""):yr(e)&&typeof e.text=="string"&&(t=e.text);let n=(String(t).split(/\r?\n/).find(s=>s.trim().length>0)||"").trim();return n.length>120?`${n.slice(0,117)}\u2026`:n}function H_(e){let t=String(e.name||""),r=e.input||{},n={kind:"tool",tool:t,icon:Ic[t]||"\u{1F527}",input:r,expandable:!0};if((t==="Read"||t==="Write")&&(n.path=String(r.file_path||r.path||"")),t==="Write"&&(n.added=Oa(r.content).length),t==="Edit"){n.path=String(r.file_path||r.path||"");let{added:s,removed:o}=La(r.old_string,r.new_string);n.added=s,n.removed=o}if(t==="MultiEdit"){n.path=String(r.file_path||r.path||"");let s=0,o=0,a=Array.isArray(r.edits)?r.edits:[];for(let i of a){let c=La(yr(i)?i.old_string:"",yr(i)?i.new_string:"");s+=c.added,o+=c.removed}n.added=s,n.removed=o}return t==="Bash"&&(n.command=String(r.command||"")),(t==="Grep"||t==="Glob")&&(n.command=String(r.pattern||r.query||"")),t==="Agent"&&(typeof e.id=="string"&&e.id.length>0&&(n.launch_id=e.id),typeof r.description=="string"&&(n.command=r.description)),n}function Ma(e){return typeof e!="string"||e.trim().length===0?null:{kind:"thinking",text:e}}function Pa(e){let t=e.split(/\r?\n/).find(n=>n.trim().length>0)||"",r=W_.exec(t);return r?{kind:"gate",gate:r[2]==="implementation"?"impl":r[2],reviewer:r[3],verdict:r[4],time:r[5]?r[5].trim():void 0,text:t.trim()}:z_.test(t)&&t.trim().length<=80?{kind:"phase",text:t.trim()}:{kind:"assistant",text:e}}function G_(e,t){let r=typeof e.parent_tool_use_id=="string"&&e.parent_tool_use_id.length>0?e.parent_tool_use_id:null;if(e.type==="assistant"){let n=e.message,s=n&&Array.isArray(n.content)?n.content:[],o=[];for(let a of s)if(yr(a)){if(a.type==="text"&&typeof a.text=="string")o.push(Pa(a.text));else if(a.type==="thinking"){let i=Ma(a.thinking);i&&o.push(i)}else if(a.type==="tool_use"){let i=H_(a);typeof a.id=="string"&&t.set(a.id,i),o.push(i)}}return r?Rc(o,r):o}if(e.type==="user"){let n=e.message,s=n&&Array.isArray(n.content)?n.content:[];for(let o of s)if(yr(o)&&o.type==="tool_result"){let a=t.get(String(o.tool_use_id));if(a){let i=Oc(o.content);a.result=i,a.output=typeof o.content=="string"?o.content:i,o.is_error===!0&&(a.is_error=!0)}}return[]}if(e.type==="result"){let n=e.is_error===!1&&e.subtype==="success",s={kind:"result",success:n,text:typeof e.result=="string"?e.result:n?"DONE":""};return r?Rc([s],r):[s]}return[]}function Rc(e,t){for(let r of e)r.parent_tool_use_id=t;return e}function V_(e){let t=typeof e.command=="string"?e.command:"",r=Oc(e.aggregated_output===void 0?e.output:e.aggregated_output),s=[typeof e.exit_code=="number"&&Number.isFinite(e.exit_code)?`exit ${e.exit_code}`:typeof e.status=="string"&&e.status.length>0?e.status:"",r].filter(a=>a.length>0).join(" \xB7 "),o={kind:"tool",tool:"shell",icon:Ic.Bash,command:t,input:{command:t},expandable:!0};return s.length>0&&(o.result=s),typeof e.aggregated_output=="string"&&(o.output=e.aggregated_output),o}function K_(e){if(e.type==="item.completed"&&yr(e.item)){let t=e.item;if(t.type==="agent_message"&&typeof t.text=="string")return[Pa(t.text)];if(t.type==="reasoning"){let r=Ma(t.text);return r?[r]:[]}return t.type==="error"?[{kind:"error",text:String(t.message||"")}]:t.type==="command_execution"?[V_(t)]:[]}if(e.type==="turn.completed")return[{kind:"result",success:!0,text:"DONE"}];if(e.type==="turn.failed"){let t=e.error;return[{kind:"error",text:t&&typeof t.message=="string"?t.message:"turn failed"}]}return e.type==="error"?[{kind:"error",text:String(e.message||"")}]:[]}function Y_(e){if(e.schema!=="codex-delegation-monitor-v1"||!yr(e.event))return[];let t=e.event;if(t.type==="session.started"||t.type==="turn.started")return[];if((t.type==="item.started"||t.type==="item.completed")&&yr(t.item)){let r=t.item;if(typeof r.id!="string"||r.id.length===0)return[];if(t.type==="item.completed"&&r.kind==="agent_message"&&typeof r.text=="string"&&r.text.trim().length>0)return[Pa(r.text)];if(t.type==="item.completed"&&r.kind==="reasoning"){let i=Ma(r.text);return i?[i]:[]}if(r.kind!=="activity"||typeof r.activity!="string")return[];let n=U_[r.activity];if(!n)return[];let s="\uC2DC\uC791",o="\u2026",a={kind:"tool",tool:"",icon:o,expandable:!1};if(t.type==="item.completed"){if(r.status==="completed")s="\uC644\uB8CC",o="\u2713";else if(r.status==="failed")s="\uC2E4\uD328",o="\u2717";else return[];a.result=""}return a.tool=`${n} \xB7 ${s}`,a.icon=o,[a]}return t.type==="turn.completed"&&t.status==="completed"?[{kind:"result",success:!0,text:"DONE"}]:t.type==="turn.failed"&&(t.status==="failed"||t.status==="interrupted")&&typeof t.error_code=="string"&&t.error_code.length>0?[{kind:"error",text:t.error_code}]:[]}function Z_(e){let t=e.type;return typeof t=="string"&&(t==="error"||t.startsWith("thread.")||t.startsWith("turn.")||t.startsWith("item."))}function Q_(e){let t=e;if(typeof e=="string"){let r=e.trim();if(r.length===0)return null;try{t=JSON.parse(r)}catch{return null}}return yr(t)?t:null}function Lc(e={}){let t=e.skip_delegated===!0,r=new Map;return{push(n){let s=Q_(n);return s?t&&typeof s.parent_tool_use_id=="string"&&s.parent_tool_use_id.length>0?[]:s.schema==="codex-delegation-monitor-v1"?Y_(s):Z_(s)?K_(s):G_(s,r):[]}}}function Da(e){let t=[],r=Lc(),n=Array.isArray(e)?e:[];for(let s of n)for(let o of r.push(s))t.push(o);return t}var X_=5,J_=10,em=/Task\s+#(\d+)/,tm=/\bgh\s+pr\s+create\b|\bgit\s+push\b/,rm=/\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;function co(e){return typeof e!="string"?"":(e.split(/\r?\n/).find(t=>t.trim().length>0)||"").trim()}function nm(e){return typeof e!="string"||e.length===0?0:e.split(/\r?\n/).length}function sm(e){for(let t=e.length-1;t>=0;t-=1){let r=e[t];if(r.kind==="phase"||r.kind==="gate")return r.text||null}return null}function om(e){let t=new Map,r=0;for(let s of e){if(s.kind!=="tool")continue;r+=1;let o=s.input||{};if(s.tool==="TaskCreate"){let c=em.exec(s.output||s.result||""),u=String(o.activeForm||o.subject||"").trim();if(!c||u.length===0)continue;t.set(c[1],{label:u,active:o.status==="in_progress"?r:0});continue}if(s.tool!=="TaskUpdate")continue;let a=t.get(String(o.taskId??""));if(!a)continue;let i=o.activeForm||o.subject;typeof i=="string"&&i.trim().length>0&&(a.label=i.trim()),typeof o.status=="string"&&(a.active=o.status==="in_progress"?r:0)}let n=null;for(let s of t.values())s.active>0&&(!n||s.active>n.active)&&(n=s);return n?n.label:null}function am(e){if(e.tool==="Bash"){let t=e.command||"";return tm.test(t)?"~ PR/\uAC8C\uC2DC \uC911":rm.test(t)?"~ \uAC80\uC99D \uC911":null}return e.tool==="Edit"||e.tool==="Write"||e.tool==="MultiEdit"?"~ \uAD6C\uD604 \uC911":e.tool==="Read"||e.tool==="Grep"||e.tool==="Glob"?"~ \uD0D0\uC0C9 \uC911":null}function im(e){let t=e.filter(s=>s.kind==="tool").slice(-J_),r=new Map;t.forEach((s,o)=>{let a=am(s);if(!a)return;let i=r.get(a)||{count:0,last:-1};i.count+=1,i.last=o,r.set(a,i)});let n=null;for(let[s,o]of r)(!n||o.count>n.count||o.count===n.count&&o.last>n.last)&&(n={label:s,count:o.count,last:o.last});return n?n.label:null}function lm(e){let t=sm(e);if(t)return{text:t,guess:!1};let r=om(e);if(r)return{text:r,guess:!1};let n=im(e);return n?{text:n,guess:!0}:null}function cm(e,t){if(typeof e!="number")return"";let r=Math.max(0,Math.floor((t-e)/1e3));return r<60?`${r}\uCD08 \uC804`:tr(e,t)}function Sn(e,t={}){let{transport:r,sessionLogStore:n,onClose:s}=t,o=null,a=null,i=null,c=null,u=!1,d={},p=!0,_=new Set,h=new Set,$=null,L=null,j=!1,V=!1,H=!1,P=null,D=null;function O(){j=!1,V=!1,H=!1,P=null,D=null}async function U(K){if(r){V=!0,H=!1,x();try{let Q=await Promise.resolve(r("get-attempt-prompt",{attempt_id:K,...c?{root_dir:c}:{}}));if(o!==K)return;!Q||typeof Q!="object"||Array.isArray(Q)?H=!0:(P=Q,D=K)}catch{o===K&&(H=!0)}finally{o===K&&(V=!1,x())}}}function b(){if(j=!j,j&&o&&D!==o){U(o);return}x()}function B(){if(!j)return"";let K=An({loading:V,error:H});if(K)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        ${K}
      </div>`;if(!P)return"";if(P.missing)return l`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;let Q=lo(P.recorded_at);return l`<div class="sv__prompt" data-seam="attempt-prompt">
      ${Q?l`<div class="prompt-block__meta">${Q} 발송</div>`:""}
      ${typeof P.task_prompt=="string"?Cr("\uACFC\uC5C5 (user)",P.task_prompt):""}
      ${typeof P.system_prompt=="string"?Cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",P.system_prompt):""}
    </div>`}function ee(){if(!i||!n)return[];let K=n.get(i);return Da(K?K.lines:[])}function Ae(){if(!i||!n)return null;let K=n.get(i),Q=K?K.last_event_at:null;return typeof Q=="number"?Q:null}function Z(){return d.status==="running"}function le(){if(Z()&&o){L||(L=setInterval(()=>x(),1e3));return}ge()}function ge(){L&&(clearInterval(L),L=null)}function Te(K){let Q=[],Se=0;for(;Se<K.length;){let{idx:Qe,line:Ge}=K[Se];if(Ge.kind==="tool"){let pe=Se;for(;pe<K.length&&K[pe].line.kind==="tool"&&K[pe].line.tool===Ge.tool;)pe+=1;if(pe-Se>=X_&&!h.has(Qe)){Q.push({kind:"group",idx:Qe,tool:Ge.tool||"",lines:K.slice(Se,pe)}),Se=pe;continue}}Q.push({kind:"line",idx:Qe,line:Ge}),Se+=1}return Q}function Le(K){let Q=[],Se=new Map;for(let pe=0;pe<K.length;pe+=1){let R=K[pe],J=R.parent_tool_use_id;if(typeof J=="string"&&J.length>0){let ie=Se.get(J);ie||(ie={kind:"subagent",idx:pe,launch_id:J,agent_type:null,header:null,lines:[]},Se.set(J,ie),Q.push(ie)),ie.lines.push({idx:pe,line:R});continue}if(R.kind==="tool"&&R.tool==="Agent"&&typeof R.launch_id=="string"&&R.launch_id.length>0){let ie=se(R),te=Se.get(R.launch_id);if(te){te.header={idx:pe,line:R},te.agent_type=ie;continue}let qe={kind:"subagent",idx:pe,launch_id:R.launch_id,agent_type:ie,header:{idx:pe,line:R},lines:[]};Se.set(R.launch_id,qe),Q.push(qe);continue}Q.push({kind:"entry",idx:pe,line:R})}let Qe=[],Ge=0;for(;Ge<Q.length;){if(Q[Ge].kind!=="entry"){Qe.push(Q[Ge]),Ge+=1;continue}let pe=Ge;for(;pe<Q.length&&Q[pe].kind==="entry";)pe+=1;Qe.push(...Te(Q.slice(Ge,pe))),Ge=pe}return Qe}function se(K){let Q=K.input;return Q&&typeof Q.subagent_type=="string"?Q.subagent_type:null}function ae(K){for(let Q=K.length-1;Q>=0;Q-=1){let Se=K[Q];if(Se.kind==="result"||Se.kind==="error")return null;if(Se.kind==="tool"&&!Object.hasOwn(Se,"result"))return Se}return null}function Me(K){for(let Q=K.length-1;Q>=0;Q-=1)if(K[Q].kind==="thinking")return K[Q];return null}function N(K,Q){if(Q.kind==="gate")return l`<div class="sv__gate">${Q.text}</div>`;if(Q.kind==="phase")return l`<div class="sv__phase">${Q.text}</div>`;if(Q.kind==="result")return l`<div
        class="sv__result${Q.success?" sv__result--ok":" sv__result--fail"}"
      >
        <span class="sv__result-glyph">${Q.success?"\u2713":"\u2717"}</span>
        <span class="sv__result-body"
          >${Nr(Q.text||(Q.success?"DONE":"\uC2E4\uD328"))}</span
        >
      </div>`;if(Q.kind==="thinking"){let Se=_.has(K);return l`<div
        class="sv__think${Se?" sv__think--expanded":""}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>De(K)}
      >
        <span class="sv__think-line">💭 ${co(Q.text)}</span>
        ${Se?l`<pre class="sv__think-expand">${Q.text}</pre>`:""}
      </div>`}if(Q.kind==="error")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="blocker")return l`<div class="sv__error">⛔ ${Q.text}</div>`;if(Q.kind==="tool"){let Se=_.has(K),Qe=Q.tool==="Bash"?nm(Q.command):0,Ge=Q.tool==="Bash"?Qe>1?co(Q.command):Q.command:Q.path||Q.command||"";return l`<div
        class="sv__tool${Se?" sv__tool--expanded":""}"
        role="button"
        tabindex="0"
        @click=${()=>De(K)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${Q.icon}</span>
          <span class="sv__tool-name">${Q.tool}</span>
          ${Ge?l`<span class="sv__tool-detail">${Ge}</span>`:""}
          ${Qe>1?l`<span class="sv__tool-more">⋯ ${Qe}줄</span>`:""}
          ${typeof Q.added=="number"?l`<span class="sv__diff-add">+${Q.added}</span>`:""}
          ${typeof Q.removed=="number"?l`<span class="sv__diff-del">−${Q.removed}</span>`:""}
          ${Q.result?l`<span class="sv__tool-ok">→ ${Q.result}</span>`:""}
        </span>
        ${Se?l`<pre class="sv__tool-expand">${ne(Q)}</pre>`:""}
      </div>`}return l`<div class="sv__as">${Nr(Q.text||"")}</div>`}function ne(K){let Q=[];if(K.tool==="Bash"&&typeof K.command=="string"&&K.command.length>0)Q.push(K.command);else if(K.input!==void 0)try{Q.push(`input: ${JSON.stringify(K.input,null,2)}`)}catch{}return typeof K.output=="string"&&K.output.length>0&&Q.push(`output:
${K.output}`),Q.join(`

`)}function oe(){if(!o)return l``;let K=ee(),Q=(a?[d.agent_type,d.model,d.effort]:[d.runner,d.model,d.effort]).filter(Boolean).join(" \xB7 "),Se=d.session_id||"",Qe=`\uB77C\uC774\uBE0C \uB530\uB77C\uAC00\uAE30 ${p?"ON":"OFF"}`,Ge=Z(),pe=Ge?cm(Ae(),Date.now()):"",R=Ge?ae(K):null,J=Ge?Me(K):null,ie=lm(K);return l`<div class="sv" data-attempt-id=${o}>
      <div class="sv__bar">
        <span class="sv__id">${a?d.role||"":o}</span>
        ${ie?l`<span
              class="sv__stage${ie.guess?" sv__stage--guess":""}"
              title=${ie.text}
              >${ie.text}</span
            >`:""}
        ${Ge?l`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${pe?`\uC9C4\uD589 \uC911 \xB7 \uB9C8\uC9C0\uB9C9 \uC774\uBCA4\uD2B8 ${pe}`:"\uC9C4\uD589 \uC911"}
              ><span class="sv__live-dot" aria-hidden="true"></span>${pe?l`<span class="sv__live-ago">${pe}</span>`:""}</span
            >`:""}
        ${Se?l`<button
              type="button"
              class="sv__session"
              title=${Se}
              aria-label=${`\uC138\uC158 ID \uBCF5\uC0AC: ${Se}`}
              @click=${()=>ze(Se)}
            >
              ⧉ ${Se.slice(0,8)}
            </button>`:""}
        ${Q?l`<span class="sv__meta">${Q}</span>`:""}
        ${d.worktree?l`<span class="sv__wt" title=${d.worktree}
              >${d.worktree}</span
            >`:""}
        ${a||u?"":l`<button
              type="button"
              class="sv__prompt-toggle${j?" sv__prompt-toggle--on":""}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${j?"true":"false"}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${b}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${p?" sv__follow--on":""}"
          aria-pressed=${p?"true":"false"}
          aria-label=${Qe}
          @click=${ve}
        >
          <span class="sv__follow-full">⇣ ${Qe}</span>
          <span class="sv__follow-short">⇣ ${p?"ON":"OFF"}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${()=>ot()}
        >
          ✕
        </button>
      </div>
      ${a||u?"":B()}
      <div class="sv__body">
        ${K.length===0?l`<div class="sv__empty">세션 로그 없음</div>`:Le(K).map(te=>te.kind==="subagent"?Ce(te):te.kind==="group"?ke(te):N(te.idx,te.line))}
      </div>
      ${R||J?l`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${R?l`<span class="sv__now-icon">${R.icon}</span>
                  <span class="sv__now-name">${R.tool}</span>
                  <span class="sv__now-detail"
                    >${R.tool==="Bash"?co(R.command):R.path||R.command||""}</span
                  >`:""}
            ${J?l`<span class="sv__now-think"
                  >💭 ${co(J.text)}</span
                >`:""}
          </div>`:""}
    </div>`}function ke(K){return l`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${()=>Ne(K.idx)}
    >
      <span class="sv__group-icon">${K.lines[0].line.icon}</span>
      <span class="sv__group-name">${K.tool}</span>
      <span class="sv__group-count">${K.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`}function Ce(K){let Q=h.has(K.idx),Se=K.header?K.header.line:null,Qe=Se?Se.is_error===!0?"\u2717":typeof Se.result=="string"?"\u2713":"\u27F3":"",Ge=Se&&Se.command?Se.command:"";return l`<div class="sv__sub${Q?" sv__sub--open":""}">
      <div
        class="sv__sub-head"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${()=>Ne(K.idx)}
      >
        <span class="sv__sub-icon" aria-hidden="true">🤖</span>
        <span class="sv__sub-name">${K.agent_type||"subagent"}</span>
        ${Ge?l`<span class="sv__sub-detail">${Ge}</span>`:""}
        <span class="sv__sub-count">${K.lines.length}줄</span>
        ${Qe?l`<span class="sv__sub-state">${Qe}</span>`:""}
        ${Q?"":l`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
      </div>
      ${Q?l`<div class="sv__sub-body">
            ${Te(K.lines).map(pe=>pe.kind==="group"?ke(pe):N(pe.idx,pe.line))}
          </div>`:""}
    </div>`}function Ne(K){h.add(K),x()}function x(){Ye(oe(),e),le(),p&&fe()}function fe(){let K=e.querySelector(".sv__body");K&&(K.scrollTop=K.scrollHeight)}function De(K){_.has(K)?_.delete(K):_.add(K),x()}function ve(){p=!p,x()}function ze(K){rr(K).then(Q=>{Q?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function We(K){!o||!K||(d={...d,...K},x())}function Ve(K){let Q=K.target;if(!Q||!Q.classList||!Q.classList.contains("sv__body"))return;!(Q.scrollHeight-Q.scrollTop-Q.clientHeight<=4)&&p&&(p=!1,x())}e.addEventListener("scroll",Ve,!0);function Je(K){let Q=K&&K.attempt_id;if(!Q)return;let Se=i;o=Q,a=typeof K.launch_id=="string"&&K.launch_id.length>0?K.launch_id:null,i=a?`session-log:${o}:${a}`:`session-log:${o}`,r&&Se&&Se!==i&&Promise.resolve(r("unsubscribe-session-log",{id:Se})).catch(()=>{}),c=typeof K.root_dir=="string"&&K.root_dir.length>0?K.root_dir:null,d=K.meta||{},u=K.hide_prompt===!0,p=!0,_.clear(),h.clear(),O(),!$&&n&&($=n.subscribe(x)),r&&Promise.resolve(r("subscribe-session-log",{id:i,attempt_id:o,...a?{launch_id:a}:{},...c?{root_dir:c}:{}})).catch(()=>{}),x()}function ot(){let K=i;o=null,a=null,i=null,c=null,u=!1,_.clear(),h.clear(),O(),ge(),r&&K&&Promise.resolve(r("unsubscribe-session-log",{id:K})).catch(()=>{}),Ye(l``,e),s&&s()}return{open:Je,updateMeta:We,close:ot,isOpen(){return o!==null},destroy(){ge(),$&&($(),$=null),e.removeEventListener("scroll",Ve,!0),o=null,a=null,i=null,c=null,u=!1,Ye(l``,e)}}}function uo(e){let t=e&&typeof e=="object"?e:{},r=t.metadata&&typeof t.metadata=="object"?t.metadata:{},n=Na(t.spec_id),s=Na(r.spec_id);return n?{path:n,source:"native",conflict:s.length>0&&s!==n}:s?{path:s,source:"metadata",conflict:!1}:{path:"",source:"none",conflict:!1}}function Na(e){return typeof e=="string"?e.trim():""}function Mc(e){let t=uo(e);if(t.path)return t;let r=Na(um(e).spec_path);return r?{path:r,source:"draft",conflict:!1}:t}function um(e){let t=e&&typeof e=="object"?e:{};return t.metadata&&typeof t.metadata=="object"?t.metadata:{}}function dm(e){return["plan_review","plan_approval","plan_check"].some(t=>{let r=e[t];return typeof r=="string"&&r.trim().length>0})}function pm(e){let t=e&&e.metadata||{},r=Mc(e),n=[];return r.path&&n.push({kind:"spec",path:r.path,missing_state:r.source==="draft"?"spec_draft":null}),typeof t.plan_path=="string"&&t.plan_path.trim().length>0&&n.push({kind:"plan",path:t.plan_path.trim(),missing_state:dm(t)?null:"plan_pending"}),n}function Pc(e,t){let r=pm(e);return l`
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
                ${n.missing_state==="spec_draft"?l`<span class="detail-art__badge">draft</span>`:null}
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
  `}var fm="## \u{1F916} \uC791\uC5C5 \uBCF4\uACE0\uC11C",_m=/^> (worker · attempt|session · sid) ([A-Za-z0-9._-]{1,64}) · (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/,mm=/^\*\*결론\*\* — (.+)$/;function po(e){if(typeof e!="string"||e.length===0)return null;let t=e.split(/\r?\n/);if(t[0]!==fm)return null;let r=_m.exec(t[1]||"");if(!r)return null;let n=r[1].split(" ")[0],s=r[2],o=r[3],a=2;for(;a<t.length&&t[a].trim().length===0;)a+=1;let i=a<t.length?mm.exec(t[a]):null,c=i?i[1].replace(/\s+/g," ").trim():"",u=i?a+1:a;return{lane:n,identifier:s,timestamp:o,conclusion:c,body:t.slice(u).join(`
`).trim()}}var Dc=20;function Nc(e){if(e==null||e==="")return"";let t=new Date(e);if(Number.isNaN(t.getTime()))return"";let r=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),s=String(t.getHours()).padStart(2,"0"),o=String(t.getMinutes()).padStart(2,"0");return`${r}-${n} ${s}:${o}`}function gm(e){return e.length>Dc?`${e.slice(0,Dc)}\u2026`:e}function hm(e,t,r,n){let s=`${t.lane} ${gm(t.identifier)}`;return l`<div class="detail-report">
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
        <span class="detail-report__time">${Nc(t.timestamp)}</span>
      </span>
      <span class="detail-report__concl">${t.conclusion}</span>
    </button>
    ${n&&t.body.length>0?l`<div class="detail-report__body">
          ${Nr(t.body)}
        </div>`:""}
  </div>`}function bm(e){return l`<div class="detail-comment" data-comment-id=${e.id}>
    <div class="detail-comment__meta">
      <span class="detail-comment__author"
        >${e.author||"(\uC791\uC131\uC790 \uC5C6\uC74C)"}</span
      >
      <span class="detail-comment__time"
        >${Nc(e.created_at)}</span
      >
    </div>
    <div class="detail-comment__body">
      ${Nr(typeof e.text=="string"?e.text:"")}
    </div>
  </div>`}function qc(e,t={},r={}){let n=Array.isArray(e)?e.filter(Boolean):[],s=r.expanded||new Set,o=typeof r.draft=="string"?r.draft:"",a=r.sending===!0,i=n.slice().sort((c,u)=>String(u.created_at||"").localeCompare(String(c.created_at||"")));return l`
    <div class="detail-section-label">댓글 (${n.length})</div>
    ${r.error?l`<div class="detail-empty" data-seam="comments-error">
          댓글을 불러오지 못했습니다
        </div>`:i.length===0?l`<div class="detail-empty" data-seam="comments">댓글 없음</div>`:l`<div class="detail-comments" data-seam="comments">
            ${i.map(c=>{let u=po(typeof c.text=="string"?c.text:"");return u?hm(c,u,t,s.has(c.id)):bm(c)})}
          </div>`}
    <div class="detail-comment-compose">
      <textarea
        class="detail-comment-compose__input"
        aria-label="댓글 추가"
        placeholder="댓글 추가"
        rows="3"
        ?disabled=${a}
        .value=${o}
        @input=${c=>t.onDraftInput&&t.onDraftInput(c.target.value)}
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
  `}var{I:Lv}=sl;var Fc=e=>e.strings===void 0;var ym={},jc=(e,t=ym)=>e._$AH=t;var nn=eo(class extends xn{constructor(e){if(super(e),e.type!==Er.PROPERTY&&e.type!==Er.ATTRIBUTE&&e.type!==Er.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Fc(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===or||t===Ot)return t;let r=e.element,n=e.name;if(e.type===Er.PROPERTY){if(t===r[n])return or}else if(e.type===Er.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(n))return or}else if(e.type===Er.ATTRIBUTE&&r.getAttribute(n)===t+"")return or;return jc(e),t}});var fo=["workflow_mode","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"],Fa=[...fo.filter(e=>e!=="impl_dispatch"),"quick_fix_impl_model"],Rr=["orchestration_model","orchestration_effort","orchestration_speed"],_o=[...fo,...Rr],vm=Fa.filter(e=>_o.includes(e)),Bc=["delegated","main"],mo=["inherit","claude","codex"],os=["default","fast"],as=["standard","fast_track"],is=["codex","opus","fable","self","skip"],go=["codex","fable","skip"],ho=["low","medium","high","xhigh"],sr="auto";function nr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Uc(e){if(!nr(e)||!nr(e.runners))return[];let t=[];for(let[r,n]of Object.entries(e.runners))nr(n)&&nr(n.models)&&t.push([r,Object.keys(n.models)]);return t}function En(e,t){let r=Uc(e),n=t&&t!=="inherit"?r.filter(([s])=>s===t):r;return[sr,...n.flatMap(([,s])=>s)]}function Wc(e,t,r,n){if(!nr(e)||!nr(e.runners))return[sr];let s=[];for(let[o,a]of Object.entries(e.runners))if(!(!nr(a)||!nr(a.models))&&!(t&&t!=="inherit"&&o!==t))for(let[i,c]of Object.entries(a.models)){if(r&&r!==sr&&i!==r)continue;let u=n(a,c);if(Array.isArray(u))for(let d of u)typeof d=="string"&&!s.includes(d)&&s.push(d)}return[sr,...s]}function Tn(e,t,r){return Wc(e,t,r,(n,s)=>nr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function ja(e,t,r){return Wc(e,t,r,(n,s)=>nr(s)&&Array.isArray(s.orchestration_efforts)?s.orchestration_efforts:nr(s)&&Array.isArray(s.efforts)?s.efforts:n.efforts)}function ls(e,t){let r=Uc(e);return(t?r.filter(([s])=>s===t):r).flatMap(([,s])=>s)}function zc(e,t,r){let n={impl_runtime:e?.impl_runtime,impl_model:e?.impl_model,impl_effort:e?.impl_effort},s=n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:n.impl_runtime==="inherit"?r:null;return s&&(n.impl_model&&!En(t,s).includes(n.impl_model)&&(n.impl_model=void 0),n.impl_effort&&!Tn(t,s,n.impl_model||sr).includes(n.impl_effort)&&(n.impl_effort=void 0)),n}var wm={workflow_mode:"\uC6CC\uD06C\uD50C\uB85C \uBAA8\uB4DC",spec_review_model:"\uC2A4\uD399 \uB9AC\uBDF0\uC5B4",spec_review_effort:"\uC2A4\uD399 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0\uC5B4",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0\uC5B4",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uAD6C\uD604 \uBAA8\uB378",impl_effort:"\uAD6C\uD604 effort",impl_speed:"\uAD6C\uD604 \uC18D\uB3C4",orchestration_model:"\uC6CC\uCEE4 \uBAA8\uB378",orchestration_effort:"\uC6CC\uCEE4 effort",orchestration_speed:"\uC6CC\uCEE4 \uC18D\uB3C4"},qa=[...vm,...Rr],km=[..._o,...Fa].filter((e,t,r)=>r.indexOf(e)===t&&!qa.includes(e));function Hc(e,t){let r=nr(e)?e:{},n=nr(t)?t:{},s=[];for(let a of qa){let i=r[a]??null,c=n[a]??null;i!==c&&s.push({key:a,label:wm[a]||a,before:i,after:c,kind:i===null?"added":c===null?"removed":"changed"})}let o=[];for(let a of[...km,...Object.keys(n)])!qa.includes(a)&&!o.includes(a)&&Object.hasOwn(n,a)&&o.push(a);return{rows:s,ignored_keys:o}}function Ba(e,t,r,n,s,o){return Ks({key:e,choices:t,layer:"global",global:r,resolution_global:o,execution_defaults:n,runner_catalog:s})}function Gc(e,t){let r={};for(let n of Fa){let s=e?.[n],o=t?.[n];s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}function Vc(e,t){let r={};for(let n of Rr){let s=e?.[n]??null,o=t?.[n]??null;s!==o&&(r[n]=typeof o=="string"&&o.length>0?o:null)}return r}var Ua=[{id:"workflow",label:"\uC6CC\uD06C\uD50C\uB85C\uC6B0",keys:["workflow_mode"]},{id:"review",label:"\uB9AC\uBDF0",keys:["spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort"]},{id:"implementation",label:"\uAD6C\uD604",keys:["impl_dispatch","impl_runtime","impl_model","impl_effort","impl_speed"]},{id:"worker",label:"Worker",keys:[...Rr]}],qr={workflow_mode:"\uBAA8\uB4DC",spec_review_model:"\uC0AC\uC591 \uB9AC\uBDF0",spec_review_effort:"\uC0AC\uC591 \uB9AC\uBDF0 effort",plan_review_model:"\uACC4\uD68D \uB9AC\uBDF0",plan_review_effort:"\uACC4\uD68D \uB9AC\uBDF0 effort",impl_review_model:"\uAD6C\uD604 \uB9AC\uBDF0",impl_review_effort:"\uAD6C\uD604 \uB9AC\uBDF0 effort",impl_dispatch:"\uC2E4\uD589 \uBC29\uC2DD",impl_runtime:"\uC704\uC784 \uB300\uC0C1",impl_model:"\uBAA8\uB378",impl_effort:"effort",impl_speed:"\uC18D\uB3C4",orchestration_model:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uBAA8\uB378",orchestration_effort:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 effort",orchestration_speed:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uC18D\uB3C4"},bo={pin:"\uD540",global:"\uC804\uC5ED",base:"\uAE30\uBCF8"};function Wa(e,t,r,n,s,o=null){let a=Qt({pin:t,global:r,execution_defaults:n,runner_catalog:s,route:t&&typeof t.route=="string"?t.route:null,controller_runtime:o});return e.map(i=>({key:i,...a[i]}))}function Kc(e,t,r,n,s,o=null){let a={pin:0,global:0,base:0};for(let i of Wa(e,t,r,n,s,o))a[i.source]+=1;return a}function Yc(e,t,r){return{id:e,key:t,value:typeof r=="string"?r:""}}function Zc(e,t,r){return typeof t!="string"||t.length===0?null:{id:e,preset_id:t,expected_revision:r}}var zv=[...fo,...Rr];var $m=[{id:"spec",label:"spec \uB9AC\uBDF0",receipt:"spec_review"},{id:"impl",label:"\uAD6C\uD604",receipt:null},{id:"impl_review",label:"impl \uB9AC\uBDF0",receipt:"impl_review"},{id:"pr",label:"PR",receipt:null}],xm={pin:"pin",global:"global",base:"base"};function Am(e){return l`<span
    class=${`detail-layer-rail detail-layer-rail--${xm[e]}`}
    data-source=${e}
    aria-hidden="true"
    ><i></i><i></i><i></i
  ></span>`}function Sm(e,t,r){switch(e){case"workflow_mode":return as;case"spec_review_model":case"impl_review_model":return is;case"plan_review_model":return go;case"spec_review_effort":case"plan_review_effort":case"impl_review_effort":return ho;case"impl_dispatch":return Bc;case"impl_runtime":return mo;case"impl_model":return En(r,t.impl_runtime);case"impl_effort":return Tn(r,t.impl_runtime,t.impl_model);case"impl_speed":case"orchestration_speed":return os;case"orchestration_model":return ls(r,null);case"orchestration_effort":return Tn(r,void 0,t.orchestration_model||sr).filter(n=>n!==sr);default:return[]}}function Em(e,t){return l`<div class="detail-effective__row" data-key=${e.key}>
    ${Am(e.source)}
    <span class="detail-effective__k"
      >${qr[e.key]||e.key}</span
    >
    <span
      class=${`detail-effective__v${e.source==="base"?" detail-effective__v--dim":""}`}
      title=${e.full_value||""}
      >${e.display}</span
    >
    <span
      class=${`detail-effective__badge detail-effective__badge--${e.source}`}
      >${bo[e.source]}</span
    >
    ${t.expanded?l`<select
          class="detail-effective__edit"
          data-edit-key=${e.key}
          aria-label=${`${qr[e.key]||e.key} \uD3B8\uC9D1`}
          ?disabled=${e.resolution==="not_applicable"}
          @change=${r=>{let n=String(r.target.value);t.onEdit(e.key,n.length===0?null:n)}}
        >
          <option
            value=""
            title=${t.default_full_value||""}
            ?selected=${e.source!=="pin"}
          >
            ${t.default_label}
          </option>
          ${t.options.map(r=>l`<option
                value=${r.value}
                title=${r.full_value||""}
                ?selected=${e.source==="pin"&&e.value===r.value}
              >
                ${r.label}
              </option>`)}
        </select>`:""}
  </div>`}function Qc(e,t){let r=Ua.flatMap(c=>c.keys),n=Wa(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),s=Kc(r,e.metadata,e.workspace_values,e.execution_defaults,e.catalog,e.controller_runtime||null),o=Object.fromEntries(n.map(c=>[c.key,c])),a=Object.fromEntries(n.filter(c=>c.value!==null).map(c=>[c.key,c.value])),i=n.filter(c=>c.full_value&&c.display!==c.full_value).map(c=>c.full_value).join(" \xB7 ");return l`<details
    class=${`detail-effective${e.expanded?" detail-effective--open":""}`}
    data-seam="effective-settings"
    ?open=${e.expanded}
    @toggle=${c=>t.onToggle(c.currentTarget.open)}
  >
    <summary
      class="detail-effective__head"
      data-seam="effective-settings-toggle"
      @click=${c=>{c.preventDefault();let u=c.currentTarget.parentElement;t.onToggle(!u.open)}}
    >
      <span class="detail-effective__t">유효 실행 설정</span>
      <span class="detail-effective__summary" title=${i}
        >${Tm(o)}</span
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
    ${e.expanded?l`<div class="detail-effective__body">
          ${Ua.map(c=>l`
              <div class="detail-effective__subhead">${c.label}</div>
              ${n.filter(u=>c.keys.includes(u.key)).map(u=>{let d=Ks({key:u.key,choices:Sm(u.key,a,e.catalog),layer:"pin",pin:e.metadata,global:e.workspace_values,execution_defaults:e.execution_defaults,runner_catalog:e.catalog,route:typeof e.metadata?.route=="string"?e.metadata.route:null,controller_runtime:e.controller_runtime||null});return Em(u,{expanded:e.expanded,options:d.options,default_label:d.unset_label,default_full_value:d.full_value,onEdit:t.onEdit})})}
            `)}
          <div class="detail-effective__foot">
            <select
              data-impl-preset-select
              aria-label="실행 프리셋"
              .value=${nn(e.preset_id)}
              ?disabled=${e.preset_busy}
              @change=${c=>t.onPresetSelect(String(c.target.value))}
            >
              <option value="" ?selected=${e.preset_id===""}>
                실행 프리셋…
              </option>
              ${e.presets.map(c=>l`<option
                    value=${c.id}
                    ?selected=${c.id===e.preset_id}
                  >
                    ${c.name}${c.compatible===!1?" (\uBE44\uD638\uD658)":""}
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
            ${(e.skipped_orchestration_keys||[]).length>0?l`<span
                  class="detail-effective__hint"
                  data-preset-skip-notice
                  >오케스트레이션 3키는 Bead에 핀할 수 없어 건너뜀</span
                >`:""}
          </div>
        </div>`:""}
  </details>`}function Tm(e){let t=[];if(e.workflow_mode&&t.push(e.workflow_mode.display),e.impl_dispatch?.value==="main")t.push("\uBA54\uC778");else if(e.impl_dispatch?.value==="delegated"){let r=e.impl_runtime?` ${e.impl_runtime.display}`:"";t.push(`\uC704\uC784${r}`)}for(let r of["impl_model","impl_effort","impl_speed"])e[r]?.resolution!=="not_applicable"&&t.push(e[r]?.display||"\uAE30\uBCF8\uAC12 \uD655\uC778 \uBD88\uAC00");return t.join(" \xB7 ")}function Cm(e){if(!e||typeof e!="object")return null;let{kind:t,actor:r,effort:n,sha:s}=e;return typeof t!="string"||typeof r!="string"||typeof s!="string"?null:{kind:t,actor:r,effort:typeof n=="string"?n:null,sha:s}}function Xc(e){let t=e&&typeof e.metadata=="object"&&e.metadata?e.metadata:{},r=e&&typeof e.workflow=="object"&&e.workflow?e.workflow:{},n=r.stages||{},s=r.route||t.route||null,o=typeof t.pr_url=="string"?t.pr_url:"",a=typeof t.exec_receipt=="string"?t.exec_receipt:"",i=Cm(r.exec_receipt),c=i?kr(i):a,u=i?`${i.kind}:${i.actor}`:a.split("@")[0],d=Gs(r.planned_execution,r.exec_receipt);return l`<section class="detail-summary" data-seam="detail-summary">
    <div class="detail-summary__chips">
      <span class="detail-summary__chip detail-summary__chip--status"
        >${e?.status||"\u2014"}</span
      >
      ${s?l`<span class="detail-summary__chip detail-summary__chip--route"
            >${s}</span
          >`:""}
      ${t.workflow_mode==="fast_track"?l`<span class="detail-summary__chip detail-summary__chip--mode"
            >fast_track</span
          >`:""}
      ${o?l`<a
            class="detail-summary__chip detail-summary__chip--pr"
            href=${o}
            target="_blank"
            rel="noreferrer"
            >PR</a
          >`:""}
      ${d?l`<span
            class="detail-summary__chip detail-summary__chip--planned ctl-chip--planned"
            data-kind=${d.kind}
            title=${d.title}
            >${d.label}</span
          >`:""}
      ${c?l`<span
            class="detail-summary__chip detail-summary__chip--receipt"
            title=${c}
            >${u}${i?.effort?l`${" "}<span
                    class="detail-summary__chip-effort"
                    data-seam="exec-receipt-effort"
                    >${i.effort}</span
                  >`:""}</span
          >`:""}
    </div>
    <div class="detail-summary__gates">
      ${$m.map(p=>{let _=p.receipt&&typeof t[p.receipt]=="string"?String(t[p.receipt]):"",h=n[p.id],$=_.length>0||h?.fill==="full",L=!$&&h?.fill==="dim",j=h?.stale===!0;return l`<span
          class=${`detail-summary__gate${$?" detail-summary__gate--on":""}${L?" detail-summary__gate--current":""}${j?" detail-summary__gate--stale":""}`}
          data-gate=${p.id}
        >
          <span class="detail-summary__gate-pill">${p.label}</span>
          ${_?l`<span class="detail-summary__gate-sha"
                >${_.split("@")[1]?.slice(0,7)||""}</span
              >`:""}
        </span>`})}
    </div>
  </section>`}function ru(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function Jc(e){return ru(e)&&typeof e.key=="string"&&e.key.length>0&&typeof e.email=="string"&&e.email.length>0}function eu(e,t){let r=e&&e[t];if(!ru(r)||!Array.isArray(r.accounts))return null;let n=r.accounts.filter(Jc),s=Jc(r.active)?r.active:null;return{accounts:n,active:s||n.find(o=>o.active===!0)||null}}function nu(e){return typeof e.alias=="string"&&e.alias.length>0?` (${e.alias})`:""}function Rm(e){let t=typeof e.status=="string"&&e.status!=="ok"?` \xB7 ${e.status}`:"";return`${e.email}${nu(e)}${t}`}function su(e){let t=typeof e.plan=="string"&&e.plan.length>0?e.plan:"plan \uD655\uC778 \uBD88\uAC00";return`${e.email} \xB7 ${t}${nu(e)}`}function Im(e,t){return t?t.active?`\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(${e==="claude"?t.active.email:su({...t.active,alias:null})})`:"\uAE30\uBCF8\uAC12 \uC0AC\uC6A9 \u2014 \uD604\uC7AC \uB85C\uADF8\uC778(\uD655\uC778 \uBD88\uAC00)":"(\uAE30\uBCF8)"}function tu(e){let t=e.provider_key==="claude"?Rm:su,r=!!e.provider?.accounts.some(n=>n.key===e.selected);return l`<div class="detail-kv" data-exec-account-row=${e.key}>
    <span class="detail-kv__k">${e.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${e.selected?"detail-kv__v detail-kv__v--sel":"detail-kv__v"}
        aria-label=${e.title}
        data-exec-key=${e.key}
        @change=${n=>e.handlers.onExecChange(e.key,n.target.value)}
      >
        <option value="" ?selected=${e.selected.length===0}>
          ${Im(e.provider_key,e.provider)}
        </option>
        ${e.selected&&!r?l`<option value=${e.selected} selected>
              ${e.selected} (목록에 없음)
            </option>`:""}
        ${e.provider?.accounts.map(n=>l`<option
              value=${n.key}
              ?selected=${n.key===e.selected}
            >
              ${t(n)}
            </option>`)||""}
      </select>
      ${e.hint?l`<small class="detail-effective__hint">${e.hint}</small>`:""}
      ${e.provider?"":l`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`}function ou({md:e,catalog:t,handlers:r}){let n=typeof e.claude_account=="string"?e.claude_account:"",s=typeof e.codex_account=="string"?e.codex_account:"";return l`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${tu({key:"claude_account",title:"Claude \uACC4\uC815",provider_key:"claude",provider:eu(t,"claude"),selected:n,handlers:r,hint:"\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uB7F0\uD0C0\uC784\uC774 claude\uC77C \uB54C \uC801\uC6A9\uB429\uB2C8\uB2E4"})}
      ${tu({key:"codex_account",title:"Codex \uACC4\uC815",provider_key:"codex",provider:eu(t,"codex"),selected:s,handlers:r})}
    </div>
  </section>`}var au=["orchestration_model","orchestration_effort","orchestration_speed","spec_review_model","spec_review_effort","plan_review_model","plan_review_effort","impl_review_model","impl_review_effort","impl_runtime","impl_model","impl_effort"];function cs(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}function yo(e){if(!cs(e)||!cs(e.runners))return null;let t=Object.entries(e.runners).filter(([,r])=>cs(r)&&cs(r.models));return t.length>0?t:null}function gr(e,t){let r=yo(e);if(!r||!t)return null;for(let[n,s]of r)if(Object.hasOwn(s.models,t))return n;return null}function iu(e,t){return cs(t)&&Array.isArray(t.efforts)?t.efforts.slice():Array.isArray(e.efforts)?e.efforts.slice():[]}function lu(e,t){let r=yo(e);if(!r||!t)return[];for(let[,n]of r)if(Object.hasOwn(n.models,t))return iu(n,n.models[t]);return[]}function Om(e){let t=yo(e);if(!t)return[];let r=[];for(let[,n]of t)for(let s of Object.values(n.models))for(let o of iu(n,s))r.includes(o)||r.push(o);return r}function Lm(e,t){if(!t)return Om(e);let n=yo(e)?.find(([o])=>o===t)?.[1];if(!n)return[];let s=[];for(let o of Object.keys(n.models))for(let a of lu(e,o))s.includes(a)||s.push(a);return s}function cu(e,t,r){let n={impl_runtime:e.impl_runtime||"",impl_model:e.impl_model||"",impl_effort:e.impl_effort||""},s=n.impl_runtime==="inherit"?r:n.impl_runtime==="claude"||n.impl_runtime==="codex"?n.impl_runtime:null;if(n.impl_runtime==="inherit"&&!s)return n.impl_model="",n.impl_effort="",n;let o=gr(t,n.impl_model);if(n.impl_model&&(!s||o!==s))return n.impl_model="",n.impl_effort="",n;let a=n.impl_model?lu(t,n.impl_model):Lm(t,s);return n.impl_effort&&a.length>0&&!a.includes(n.impl_effort)&&(n.impl_effort=""),n}function Mm(e){return String(e||"").replace(/^docs\/(superpowers\/)?/,"")}function Pm(e){let t=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(e);if(!t)return{front:null,body:e};let r=t[1].trim();return{front:r.length>0?r:null,body:e.slice(t[0].length)}}function uu(e,t){let r=t.getWorkspacePath,n=t.fetchImpl||globalThis.fetch?.bind(globalThis),s=null,o="loading",a="",i=null,c="";function u(L){L.key==="Escape"&&s&&(L.preventDefault(),h())}document.addEventListener("keydown",u);function d(){return s?l`
      <div class="mv-overlay" role="dialog" aria-modal="true">
        <div class="mv-overlay__backdrop" @click=${()=>h()}></div>
        <div class="mv">
          <div class="mv__bar">
            <span class="mv__path" title=${s}
              >${Mm(s)}</span
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
            ${o==="loading"?l`<div class="mv__status">불러오는 중…</div>`:o==="pending"?l`<div class="mv__status">${c}</div>`:o==="error"?l`<div class="mv__status mv__status--error">
                      ${c||"\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"}
                    </div>`:l`${i===null?null:l`<pre class="mv__front">
${i}</pre
                        >`}${Nr(a)}`}
          </div>
        </div>
      </div>
    `:l``}function p(){Ye(d(),e)}async function _(L,j={}){s=L,o="loading",a="",i=null,c="",p();let V=r?r():"";if(!V){o="error",c="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4",p();return}if(!n){o="error",c="fetch\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",p();return}let H="/api/doc?workspace="+encodeURIComponent(V)+"&path="+encodeURIComponent(L);try{let P=await n(H),D=await P.json().catch(()=>({}));if(!P.ok||!D||D.ok!==!0){if(D?.error==="not_found"&&j.missing_state==="plan_pending"){o="pending",c="\uACC4\uD68D \uC791\uC131 \uC804 \xB7 \uACBD\uB85C\uB9CC \uC608\uC57D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4",p();return}o="error",c="\uBB38\uC11C\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 ("+String(D&&D.error||P.status)+")",p();return}let O=Pm(String(D.content||""));i=O.front,a=O.body,o="ready",p()}catch{o="error",c="\uBB38\uC11C \uC694\uCCAD \uC2E4\uD328",p()}}function h(){s=null,Ye(l``,e)}function $(){document.removeEventListener("keydown",u),h()}return{open:_,close:h,destroy:$}}var Dm=[{key:"input_tokens",label:"\uC785\uB825"},{key:"output_tokens",label:"\uCD9C\uB825"},{key:"cache_read_input_tokens",label:"\uCE90\uC2DC \uC77D\uAE30"}],pu="\uC11C\uBC84 \uC7AC\uC2DC\uC791 \uBCF5\uAD6C \u2014 \uBD80\uBD84 \uC9D1\uACC4",vo=[{role:"implementation",provider:"codex"},{role:"review-consult",provider:"codex"},{role:"subagent",provider:"claude"}],Nm=["running","done","failed","interrupted"],qm={running:"\u25CF",done:"\u2713",failed:"\u2717",interrupted:"\u26A0"};function Fm(e){return typeof e=="number"&&Number.isFinite(e)?e:0}function jm(e){let t=Wt(e);if(t.length>0)return t.map(s=>l`<span class="detail-usage-total" title=${s.tooltip}
          >${s.label}</span
        >`);let r=$n(e);if(!r||!e)return"";let n=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?` \xB7 $${e.total_cost_usd.toFixed(2)}`:"";return l`<span
      class="detail-usage-total"
      title="이 이슈의 모든 attempt 토큰 합계 (입력+출력+캐시)"
      >${r.replace(/^τ /,"\u03C4 \uCD1D ")}${n}</span
    >${e.replayed?l`<span class="detail-usage-partial" title=${pu}
          >부분 집계</span
        >`:""}`}function du(e){return!e||!e.roles.orchestrator?null:{providers:e.roles.orchestrator,roles:{}}}function Ga(e){if(typeof e=="number")return wo(e);if(typeof e!="string")return"";let t=Date.parse(e);return Number.isFinite(t)?wo(t):""}function Bm(e){return typeof e=="string"?e.replace(/-\d{8}$/,""):""}function Um(e,t){if(e.provider!=="claude")return{text:e.session_id.slice(0,8),title:e.session_id};let r=t&&typeof t.agent_id=="string"?t.agent_id:"";return r.length>0?{text:r.slice(0,8),title:r}:{text:e.launch_id.slice(-8),title:e.launch_id}}function za(e){return e===null||typeof e=="string"&&e.trim().length>0}function Ha(e){return e===null||typeof e=="number"&&Number.isFinite(e)}function Wm(e){if(!e||typeof e!="object"||Array.isArray(e))return null;let t=e,r=t.provider==="claude";return typeof t.launch_id!="string"||t.launch_id.length===0||!vo.some(n=>n.role===t.role&&n.provider===t.provider)||!(r?za(t.model):typeof t.model=="string"&&t.model.length>0)||!(!("effort"in t)||za(t.effort))||!(!("agent_type"in t)||za(t.agent_type))||typeof t.session_id!="string"||t.session_id.length===0||!Nm.includes(t.status)||!(t.turn_id===null||typeof t.turn_id=="string")?null:r?!Ha(t.started_at)||!Ha(t.last_event_at)||!Ha(t.completed_at)?null:t:typeof t.started_at!="number"||!Number.isFinite(t.started_at)||typeof t.last_event_at!="number"||!Number.isFinite(t.last_event_at)||!(t.completed_at===null||typeof t.completed_at=="string"&&Number.isFinite(Date.parse(t.completed_at)))?null:t}function zm(e,t,r){let s=Wt({providers:{[t]:{subtotal:r.subtotal,breakdown:r.usage,...r.replayed?{replayed:!0}:{}}},roles:{}})[0];return l`<div class="detail-session__leg detail-session__usage-detail">
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${[r.provider,r.model,r.effort].filter(Boolean).join(" \xB7 ")}</span
    >
    ${r.session_id?l`<span
          class="detail-session__leg-sid detail-session__sid"
          title=${r.session_id}
          >${r.session_id.slice(0,8)}</span
        >`:""}
    ${Ga(r.completed_at)?l`<span class="detail-session__leg-time detail-session__time"
          >${Ga(r.completed_at)}</span
        >`:""}
    ${s?l`<span class="detail-session__usage" title=${s.tooltip}
          >${s.label}</span
        >`:""}
  </div>`}function Hm(e,t,r,n){let s=e.status==="running"?null:t,a=(s?Wt({providers:{[e.provider]:{subtotal:s.subtotal,breakdown:s.usage,...s.replayed?{replayed:!0}:{}}},roles:{}}):[])[0],i=e.status==="running"?wo(e.last_event_at):s?Ga(s.completed_at):"",c=(e.provider==="claude"?["Claude",e.agent_type,Bm(e.model)]:["codex",e.model,e.effort]).filter(Boolean).join(" \xB7 "),u=Um(e,s);return l`<button
    type="button"
    class="detail-session__leg detail-session__usage-detail detail-session__leg--${e.status}"
    data-launch-id=${e.launch_id}
    @click=${()=>n.onOpenDelegation&&n.onOpenDelegation(r,e.launch_id)}
  >
    <span class="detail-session__leg-glyph" aria-hidden="true"
      >${qm[e.status]}</span
    >
    <span class="detail-session__leg-role detail-session__usage-label"
      >${e.role}</span
    >
    <span class="detail-session__leg-meta detail-session__usage-value"
      >${c}</span
    >
    <span
      class="detail-session__leg-sid detail-session__sid"
      title=${u.title}
      >${u.text}</span
    >
    ${i?l`<span class="detail-session__leg-time detail-session__time"
          >${i}</span
        >`:""}
    ${a?l`<span class="detail-session__usage" title=${a.tooltip}
          >${a.label}</span
        >`:""}
  </button>`}function Gm(e,t){return e.role===t.role&&(e.model===null||t.model===void 0||e.model===t.model)&&e.session_id===t.session_id}function Vm(e,t,r){let n=[],s=new Set,o=Array.isArray(e.delegation_sessions)?e.delegation_sessions:[];for(let d of o){let p=Wm(d);!p||s.has(p.launch_id)||(s.add(p.launch_id),n.push(p))}n.sort((d,p)=>(d.started_at||0)-(p.started_at||0));let a={};for(let{role:d,provider:p}of vo){let _=t?t.roles[d]?.[p]:null;a[d]=_?[..._.legs]:[]}let i=vo.flatMap(({role:d})=>a[d]),c=new Set,u=[];for(let{role:d,provider:p}of vo){for(let _ of n.filter(h=>h.role===d&&h.provider===p)){let h=i.find($=>$.receipt_id===_.launch_id)||null;h&&!Gm(_,h)||(h&&c.add(h.receipt_id),u.push(Hm(_,h,e.attempt_id,r)))}for(let _ of a[d])c.has(_.receipt_id)||u.push(zm(d,p,_))}return u}function Km(e,t){let r=typeof e.total_cost_usd=="number"&&Number.isFinite(e.total_cost_usd)?e.total_cost_usd:null,n=[...Dm,{key:"cache_creation_input_tokens",label:t==="codex"?"\uCE90\uC2DC \uC4F0\uAE30":"\uCE90\uC2DC \uC0DD\uC131"},...t==="codex"&&typeof e.reasoning_output_tokens=="number"&&Number.isFinite(e.reasoning_output_tokens)?[{key:"reasoning_output_tokens",label:"\uCD94\uB860 \uCD9C\uB825"}]:[]];return l`<div class="detail-session__usage-detail">
    ${n.map(s=>l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">${s.label}</span
          ><span class="detail-session__usage-value"
            >${Fm(e[s.key]).toLocaleString("en-US")}</span
          ></span
        >`)}
    ${r===null?"":l`<span class="detail-session__usage-field"
          ><span class="detail-session__usage-label">비용</span
          ><span class="detail-session__usage-value"
            >$${r.toFixed(2)}</span
          ></span
        >`}
    ${e.replayed?l`<span class="detail-session__usage-note">${pu}</span>`:""}
  </div>`}var Ym={running:"\u25CF",done:"\u2713",failed:"\u2717",orphaned:"\u26A0"};function wo(e){if(typeof e!="number"||!Number.isFinite(e))return"";let t=new Date(e),r=String(t.getHours()).padStart(2,"0"),n=String(t.getMinutes()).padStart(2,"0");return`${r}:${n}`}function Zm(e){if(typeof e.exec_default_preset_id!="string"||e.exec_default_preset_id.length===0)return"";let t=e.exec_values&&typeof e.exec_values=="object"?Object.entries(e.exec_values).filter(([,n])=>typeof n=="string"&&n.length>0).map(([n,s])=>`${n}=${s}`).join(" \xB7 "):"",r=typeof e.exec_default_preset_revision=="number"?` r${e.exec_default_preset_revision}`:"";return l`<div
    class="detail-session__preset-audit"
    data-attempt-preset-audit
  >
    <strong>외부 실행 preset</strong>
    <span>${e.exec_default_preset_id}${r}</span>
    ${t?l`<small>${t}</small>`:""}
    <small>내부 workflow 실행 영수증과 별도 기록</small>
  </div>`}function fu(e,t={},r={}){let n=Array.isArray(e)?e:[],s=r.expanded||new Set;if(n.length===0)return l`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;let o=new Set;for(let u of n)u&&typeof u.resumed_from=="string"&&u.resumed_from.length>0&&o.add(u.resumed_from);let a=u=>{if(!(u.status==="failed"||u.status==="orphaned"))return"";let p=typeof u.session_id=="string"&&u.session_id.length>0,_=o.has(u.attempt_id),h=p&&!_,$=p?_?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uC774 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00";return l`<button
      type="button"
      class="detail-session__resume"
      data-attempt-id=${u.attempt_id}
      ?disabled=${!h}
      title=${$}
      @click=${L=>{L.stopPropagation(),h&&t.onResume&&t.onResume(u.attempt_id)}}
    >
      ↻ 이어하기
    </button>`},i=u=>{if(!(u.status==="failed"||u.status==="orphaned")||typeof u.cause!="string"||u.cause==="")return"";let p=u.cause_detail,_=p&&typeof p.reason=="string"&&p.reason.length>0?typeof p.command=="string"&&p.command.length>0?`${p.reason} \xB7 ${p.command}`:p.reason:u.cause;return l`<div class="detail-session__cause" title=${_}>
      ${u.cause}
    </div>`},c=u=>{let d=du(ua(u));if(Wt(d).length===0&&!$n(u.usage))return"";let p=s.has(u.attempt_id);return l`<button
      type="button"
      class="detail-session__usage-toggle"
      data-attempt-id=${u.attempt_id}
      aria-expanded=${p?"true":"false"}
      title=${p?"\uD1A0\uD070 \uB0B4\uC5ED \uC811\uAE30":"\uD1A0\uD070 \uB0B4\uC5ED \uD3BC\uCE58\uAE30"}
      @click=${_=>{_.stopPropagation(),t.onToggleUsage&&t.onToggleUsage(u.attempt_id)}}
    >
      τ 자세히
    </button>`};return l`
    <div class="detail-section-label">
      세션 이력${jm(r.total)}
    </div>
    <div class="detail-sessions" data-seam="session-history">
      ${n.map(u=>{let d=ua(u),p=du(d),_=Wt(p);return l`<div class="detail-session-row">
          <button
            type="button"
            class="detail-session detail-session--${u.status||"unknown"}"
            data-attempt-id=${u.attempt_id}
            @click=${()=>t.onOpen&&t.onOpen(u.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${Ym[u.status||""]||"\xB7"}</span
            >
            <span class="detail-session__id">${u.attempt_id}</span>
            ${zn(u)?l`<span
                  class="detail-session__resumed"
                  title=${zn(u)}
                  >↻</span
                >`:""}
            <span class="detail-session__meta">${en(u)}</span>
            ${_.length>0?l`<span class="detail-session__role">orchestrator</span>`:""}
            ${u.session_id?l`<span class="detail-session__sid" title=${u.session_id}
                  >${String(u.session_id).slice(0,8)}</span
                >`:""}
            ${_.length>0?_.map(h=>l`<span
                      class="detail-session__usage"
                      title=${h.tooltip}
                      >${h.label}</span
                    >`):$n(u.usage)?l`<span class="detail-session__usage"
                    >${$n(u.usage)}</span
                  >`:""}
            <span class="detail-session__time">${wo(u.started_at)}</span>
          </button>
          ${c(u)} ${a(u)} ${i(u)} ${Zm(u)}
          ${s.has(u.attempt_id)&&u.usage?Km(u.usage,u.runner==="codex"?"codex":"claude"):""}
          ${Vm(u,d,t)}
        </div>`})}
    </div>
  `}function _u(e,t={}){return l`
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
          ${Qm(e)}
        </div>`:""}
  `}function Qm(e){let t=An(e);if(t)return t;let r=e.data;if(!r)return"";if(r.missing)return l`<div class="detail-prompt__missing">
        기록 없음 — 아직 이 이슈로 디스패치된 세션이 없습니다. 아래는 다음
        디스패치가 보낼 기본 과업입니다.
      </div>
      ${typeof r.default_task_prompt=="string"?Cr("\uC608\uC0C1 \uAE30\uBCF8 \uACFC\uC5C5",r.default_task_prompt):""}`;let n=lo(r.recorded_at);return l`<div class="detail-prompt__meta">
      ${r.attempt_id}${n?` \xB7 ${n}`:""}
    </div>
    ${typeof r.task_prompt=="string"?Cr("\uACFC\uC5C5 (user)",r.task_prompt):""}
    ${typeof r.system_prompt=="string"?Cr("\uC2DC\uC2A4\uD15C \uACC4\uC57D (--append-system-prompt)",r.system_prompt):""}`}var Xm=["open","in_progress","deferred","resolved","closed"],Jm=[0,1,2,3,4];function mu(e,t){let r=t.issueStores,n=t.onClose,s=t.transport,o=t.onNavigate,a=t.queueStore,i=t.execPresetStore,c=t.sessionLogStore,u=null,d=null,p={},_="",h=!1,$=[],L=!1,j={},V={claude:null,codex:null},H=null,P=0,D=!1,O=!1,U="",b="",B="";function ee(){D=!1,O=!1,U="",b="",B=""}function Ae(){V={claude:null,codex:null},H=null,P+=1}async function Z(S){try{let re=await fetch(S);if(!re.ok)return null;let q=await re.json();if(!q||typeof q!="object"||!Array.isArray(q.accounts))return null;let Oe=q.accounts.filter(ut=>ut!==null&&typeof ut=="object"&&!Array.isArray(ut));return{accounts:Oe,active:Oe.find(ut=>ut.active===!0)||null}}catch{return null}}async function le(S){H=S;let re=++P,[q,Oe]=await Promise.all([Z("/api/claude-usage"),Z("/api/codex-usage")]);re!==P||S!==u||(V={claude:q,codex:Oe},$e())}let ge=[],Te=null,Le=null,se=!1,ae="",Me=!1,N=0,ne=new Set;function oe(){ge=[],Te=null,Le=null,se=!1,ae="",Me=!1,N+=1,ne.clear()}async function ke(S){if(!s)return;let re=++N;try{let q=await Promise.resolve(s("get-comments",{id:S}));if(re!==N||S!==u)return;ge=Array.isArray(q)?q:[],se=!1}catch{if(re!==N||S!==u)return;se=!0}$e()}function Ce(){if(!s||!u)return;let S=d&&typeof d.comment_count=="number"?d.comment_count:null;if(Te!==u){Te=u,Le=S,ke(u);return}S!==null&&S!==Le&&(Le=S,ke(u))}function Ne(S){ne.has(S)?ne.delete(S):ne.add(S),$e()}function x(S){let re=ae.trim().length===0;ae=S,re!==(S.trim().length===0)&&$e()}async function fe(){let S=ae.trim();if(!s||!u||S.length===0||Me)return;let re=u;Me=!0,$e();let q=!1;try{let Oe=await Promise.resolve(s("add-comment",{id:re,text:S}));Array.isArray(Oe)&&Oe.length>0&&(q=!0,re===u&&(ge=Oe,se=!1,ae="",Le=Oe.length))}catch{q=!1}q||me("\uB313\uAE00 \uCD94\uAC00 \uC2E4\uD328","error"),re===u&&(Me=!1),$e()}let De={onToggle:Ne,onDraftInput:x,onSubmit:fe},ve=document.createElement("div");ve.className="md-viewer-root",document.body.appendChild(ve);let ze=uu(ve,{getWorkspacePath:t.getWorkspacePath||(()=>"")}),We=document.createElement("div");We.className="session-log-root",document.body.appendChild(We);let Ve=Sn(We,{transport:s?(S,re)=>Promise.resolve(s(S,re)):void 0,sessionLogStore:c}),Je=!1,ot=!1,K=!1,Q=null,Se=null,Qe=0;function Ge(S){return`${t.getWorkspacePath&&t.getWorkspacePath()||""}::${S}`}function pe(){Je=!1,ot=!1,K=!1,Q=null,Se=null,Qe+=1}async function R(S){if(!s)return;let re=++Qe;ot=!0,K=!1,$e();try{let q=await Promise.resolve(s("get-bead-prompt",{bead_id:S}));if(re!==Qe)return;!q||typeof q!="object"||Array.isArray(q)?K=!0:(Q=q,Se=Ge(S))}catch{re===Qe&&(K=!0)}finally{re===Qe&&(ot=!1,$e())}}function J(){if(Je=!Je,Je&&u&&Se!==Ge(u)){Q=null,R(u);return}$e()}function ie(){if(!a||!u)return[];let S=a.get();return(S&&S.attempts?Object.values(S.attempts):[]).filter(q=>q&&q.bead_id===u).sort((q,Oe)=>(Oe.started_at||0)-(q.started_at||0)).map(q=>({attempt_id:q.attempt_id,bead_id:q.bead_id,status:q.status,started_at:typeof q.started_at=="number"?q.started_at:null,runner:q.runner||null,model:q.model||null,effort:q.effort||q.observed_effort||null,speed:q.speed||null,session_id:q.session_id||null,resumed_from:q.resumed_from||null,continuation_mode:q.continuation_mode||null,dismissed_at:typeof q.dismissed_at=="number"?q.dismissed_at:null,cause:typeof q.cause=="string"?q.cause:null,cause_detail:q.cause_detail||null,exec_default_preset_id:typeof q.exec_default_preset_id=="string"?q.exec_default_preset_id:null,exec_default_preset_revision:typeof q.exec_default_preset_revision=="number"?q.exec_default_preset_revision:null,exec_values:q.exec_values&&typeof q.exec_values=="object"?q.exec_values:null,usage:q.usage||null,usage_legs:Array.isArray(q.usage_legs)?q.usage_legs:[],delegation_sessions:Array.isArray(q.delegation_sessions)?q.delegation_sessions:[]}))}function te(){if(!a||!u)return null;let S=a.get();return ir(S&&S.attempts||{},u)}let qe=new Set;function at(S){qe.has(S)?qe.delete(S):qe.add(S),$e()}function it(S){let re=a?a.get():null,q=re&&re.attempts?re.attempts[S]:null;Ve.open({attempt_id:S,meta:q?{runner:q.runner||void 0,model:q.model||void 0,effort:q.effort||void 0,status:q.status||void 0,session_id:q.session_id||void 0}:{}})}function Xe(S,re){let q=a?a.get():null,Oe=q&&q.attempts?q.attempts[S]:null,st=(Oe&&Array.isArray(Oe.delegation_sessions)?Oe.delegation_sessions:[]).find(rt=>rt&&typeof rt=="object"&&rt.launch_id===re);st&&Ve.open({attempt_id:S,launch_id:re,meta:{runner:st.provider==="claude"?"claude":"codex",role:st.role,...typeof st.agent_type=="string"?{agent_type:st.agent_type}:{},model:st.model,effort:st.effort,session_id:st.session_id,status:st.status}})}async function mt(S){if(!s||!S)return;let re=await kn();if(re===null)return;let q=()=>{let rt=a?a.get():null;return rt&&typeof rt.revision=="number"?rt.revision:0},Oe=async(rt={},nt=q())=>await s("worker-attempt-resume",{attempt_id:S,expected_revision:nt,...re!==""?{instructions:re}:{},...rt}),ut=rt=>{rt?.queue&&a?.set&&a.set(rt.queue)},st=await Oe();if(ut(st),st&&st.conflict){let rt=st.queue&&typeof st.queue.revision=="number"?st.queue.revision:q();st=await Oe({},rt),ut(st)}st=await $r(st,(rt,nt)=>Oe({continuation:rt,decision_token:nt}),{onResult:ut,refresh:()=>Oe()}),st&&st.resumed===!1&&!st.conflict&&st.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${st.reason}`,"error",2400)}let ht={onOpen:it,onOpenDelegation:Xe,onResume:mt,onToggleUsage:at};function bt(){let S=a?a.get():null,re={...j};for(let q of["orchestration_model","orchestration_effort","orchestration_speed"]){let Oe=S&&S[q];typeof Oe=="string"&&(re[q]=Oe)}return re}async function pt(){if(s){try{let S=await Promise.resolve(s("get-session-defaults",{}));j=S&&S.values&&typeof S.values=="object"?S.values:{}}catch{j={}}$e()}}function wt(){let S=a?a.get():null;return S&&S.runner_catalog||null}function He(){let S=a?a.get():null;return S&&typeof S.execution_defaults=="object"?S.execution_defaults:null}function et(){let S=d?.metadata&&typeof d.metadata=="object"?d.metadata:{},q=Qt({pin:{...S,...p},global:bt(),execution_defaults:He(),runner_catalog:wt(),route:typeof S.route=="string"?S.route:null}).orchestration_model.value||"";return gr(wt(),q)}function Pe(){let S=i?i.get():null;return!S||typeof S.revision!="number"?null:{revision:S.revision,presets:Array.isArray(S.presets)?S.presets:[]}}function ct(S){return S?.compatible===!1}function xt(S){i&&S&&typeof S.revision=="number"&&Array.isArray(S.presets)&&i.set({revision:S.revision,presets:S.presets})}async function X(){let S=Pe(),re=S?.presets.find(q=>q.id===_);if(!(!s||!u||!S||!re||ct(re)||h)){h=!0,$=[],$e();try{let q=await Promise.resolve(s("apply-impl-preset",Zc(u,re.id,S.revision)));if(q&&q.conflict){xt(q),me("\uD504\uB9AC\uC14B\uC774 \uBCC0\uACBD\uB410\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uBAA9\uB85D\uC5D0\uC11C \uB2E4\uC2DC \uC801\uC6A9\uD558\uC138\uC694.","error",4e3);return}let Oe=q&&Array.isArray(q.issue)?q.issue[0]:q?.issue;if(q&&q.applied&&Oe&&typeof Oe=="object"){d=Oe,$=Array.isArray(q.skipped_orchestration_keys)?q.skipped_orchestration_keys.filter(ut=>typeof ut=="string"):[];for(let ut of au)delete p[ut];me($.length>0?"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4. \uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 3\uD0A4\uB294 Bead\uC5D0 \uD540\uD560 \uC218 \uC5C6\uC5B4 \uAC74\uB108\uB6F0\uC5C8\uC2B5\uB2C8\uB2E4.":"\uC2E4\uD589 \uD504\uB9AC\uC14B\uC744 \uC801\uC6A9\uD588\uC2B5\uB2C8\uB2E4.","success",4e3);return}q&&q.error==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}catch(q){q&&typeof q=="object"&&q.code==="bd_readback_failed"?me("\uC124\uC815\uC740 \uC804\uC1A1\uB410\uC9C0\uB9CC \uC801\uC6A9 \uC5EC\uBD80 \uD655\uC778\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.","error",4e3):me("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328","error",4e3)}finally{h=!1,$e()}}}let E=null;r&&r.subscribe&&(E=r.subscribe(()=>M()));let F=null;a&&typeof a.subscribe=="function"&&(F=a.subscribe(()=>{u&&$e()}));let y=null;i&&typeof i.subscribe=="function"&&(y=i.subscribe(()=>{u&&$e()}));function C(S){S.key==="Escape"&&u&&(S.preventDefault(),n())}document.addEventListener("keydown",C);function M(){if(u){if(r&&typeof r.snapshotFor=="function"){let S=r.snapshotFor("detail:"+u)||[];d=S.find(q=>q&&q.id===u)||S[0]||d}Ce(),$e()}}function Y(S){rr(S).then(re=>{re?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)})}function xe(S){S.preventDefault(),S.stopPropagation(),u&&Y(u)}function he(S,re){S.preventDefault(),S.stopPropagation(),Y(re)}function Ee(S,re,q){S.preventDefault(),S.stopPropagation(),ze.open(re,{missing_state:q})}function Fe(S,re){p[S]=re,$e(),!(!s||!u)&&Promise.resolve(s("update-exec-settings",Yc(u,S,re.length===0?null:re))).catch(()=>{me("\uC2E4\uD589 \uC124\uC815 \uBCC0\uACBD \uC2E4\uD328","error")})}function _t(S,re){let q=d||{},Oe=q.metadata&&typeof q.metadata=="object"?q.metadata:{},ut={};for(let nt of["impl_runtime","impl_model","impl_effort"])ut[nt]=Object.hasOwn(p,nt)?p[nt]:typeof Oe[nt]=="string"?Oe[nt]:"";ut[S]=re;let st=cu(ut,wt(),et()),rt={};for(let nt of["impl_runtime","impl_model","impl_effort"])rt[nt]=p[nt],p[nt]=st[nt]||"";$e(),!(!s||!u)&&Promise.resolve(s("update-impl-target",{id:u,...st,orchestration_runtime:et()})).then(nt=>{let It=Array.isArray(nt)?nt[0]:nt;if(!It||typeof It!="object"||!It.id)throw new Error("implementation target readback failed");d=It;for(let Jt of["impl_runtime","impl_model","impl_effort"])delete p[Jt];$e()}).catch(()=>{for(let nt of["impl_runtime","impl_model","impl_effort"])rt[nt]===void 0?delete p[nt]:p[nt]=rt[nt];$e(),me("\uAD6C\uD604 target \uBCC0\uACBD \uC2E4\uD328","error")})}async function yt(S,re,q){if(!s||!u)return!1;try{let Oe=await Promise.resolve(s(S,re)),ut=Array.isArray(Oe)?Oe[0]:Oe;return ut&&typeof ut=="object"&&ut.id?(d=ut,!0):(me(q,"error"),!1)}catch{return me(q,"error"),!1}}function Ze(S){setTimeout(()=>{try{let re=e.querySelector(S);re&&typeof re.focus=="function"&&re.focus()}catch{}},0)}function Ft(){D=!0,U=d&&d.title||"",$e(),Ze('.detail-edit__input[data-edit="title"]')}function zt(S){U=S.target.value}function je(){D=!1,U="",$e()}function Lt(){yt("edit-text",{id:u,field:"title",value:U},"\uC81C\uBAA9 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(D=!1,U=""),$e()})}function Ut(){O=!0,b=d&&d.description||"",$e(),Ze('.detail-edit__textarea[data-edit="description"]')}function Mt(S){b=S.target.value}function k(){O=!1,b="",$e()}function w(){yt("edit-text",{id:u,field:"description",value:b},"\uC124\uBA85 \uC800\uC7A5 \uC2E4\uD328").then(re=>{re&&(O=!1,b=""),$e()})}function I(S,re,q,Oe){if(S.key==="Escape"){S.stopPropagation(),q();return}S.key==="Enter"&&(!Oe||S.ctrlKey||S.metaKey)&&(S.preventDefault(),re())}function W(S){let re=S.target.value;yt("update-status",{id:u,status:re},"\uC0C1\uD0DC \uBCC0\uACBD \uC2E4\uD328").then(()=>$e())}function ye(S){let re=Number(S.target.value);yt("update-priority",{id:u,priority:re},"\uC6B0\uC120\uC21C\uC704 \uBCC0\uACBD \uC2E4\uD328").then(()=>$e())}function we(S){B=S.target.value}function be(){let S=B.trim();S.length!==0&&yt("label-add",{id:u,label:S},"\uB77C\uBCA8 \uCD94\uAC00 \uC2E4\uD328").then(re=>{re&&(B=""),$e()})}function tt(S){if(S.key==="Escape"){S.stopPropagation(),B="",$e();return}S.key==="Enter"&&(S.preventDefault(),be())}function Ie(S){yt("label-remove",{id:u,label:S},"\uB77C\uBCA8 \uC81C\uAC70 \uC2E4\uD328").then(()=>$e())}let T={onCopyPath:he,onOpenDoc:Ee};function ce(S){return typeof S=="string"?S:S&&typeof S=="object"?String(S.id||S.to||S.issue_id||S.depends_on||""):""}function Re(S){switch(S&&typeof S=="object"?String(S.dependency_type||S.type||""):""){case"blocks":return"\u26D3";case"discovered-from":return"\u21A9";case"parent-child":return"\u2338";default:return""}}function ft(S){let q=(Array.isArray(S.dependencies)?S.dependencies:[]).map(Oe=>({id:ce(Oe),icon:Re(Oe)})).filter(Oe=>Oe.id.length>0);return l`
      <div class="detail-section-label">의존성</div>
      ${q.length===0?l`<div class="detail-empty">의존성 없음</div>`:l`<div class="detail-deps">
            ${q.map(Oe=>o?l`<button
                    type="button"
                    class="detail-dep detail-dep--link"
                    @click=${()=>o(Oe.id)}
                  >
                    ${Oe.icon?`${Oe.icon} `:""}${Oe.id}
                  </button>`:l`<span class="detail-dep"
                    >${Oe.icon?`${Oe.icon} `:""}${Oe.id}</span
                  >`)}
          </div>`}
    `}function Pt(S){let re=S.metadata||{},q=S.workflow||{},Oe=q.stages||{},ut=Oe.spec&&Oe.spec.stale,st=Oe.impl&&Oe.impl.stale,rt=Oe.plan||null,nt=q.route_source==="derived",It=q.route||re.route||"\u2014";return l`
      <div class="detail-section-label">워크플로우</div>
      <div class="detail-kv">
        <span class="detail-kv__k">route</span>
        <span
          class="detail-kv__v${nt?" detail-kv__v--derived":""}"
          title=${nt?"route \uBBF8\uD540 (metadata unset)":"route"}
          >${nt?"unset":It}</span
        >
      </div>
      ${q.route!=="quick_fix"||Object.hasOwn(re,"spec_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">spec_review</span>
            <span class="detail-kv__v"
              >${re.spec_review||"\uC5C6\uC74C"}${ut?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.route==="full_plan"?l`<div class="detail-kv">
              <span class="detail-kv__k">plan_review</span>
              <span class="detail-kv__v">${rt?.receipt||"\uC5C6\uC74C"}</span>
            </div>
            <div class="detail-kv">
              <span class="detail-kv__k">plan_approval</span>
              <span class="detail-kv__v"
                >${rt?.approval_receipt||"\uC5C6\uC74C"}${rt?.approval_state==="stale"?" \xB7 stale":rt?.approval_state==="unknown"?" \xB7 unknown":""}</span
              >
            </div>`:""}
      ${q.route!=="quick_fix"||Object.hasOwn(re,"impl_review")?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_review</span>
            <span class="detail-kv__v"
              >${re.impl_review||"\uC5C6\uC74C"}${st?" \xB7 stale":""}</span
            >
          </div>`:""}
      ${q.planned_execution?l`<div class="detail-kv">
              <span class="detail-kv__k">planned_execution</span>
              <span class="detail-kv__v">${q.planned_execution.kind}</span>
            </div>
            ${q.planned_execution.kind==="main"?l`<div class="detail-kv">
                  <span class="detail-kv__k">planned_execution_reason</span>
                  <span class="detail-kv__v detail-kv__v--wrap"
                    >${q.planned_execution.reason}</span
                  >
                </div>`:""}`:""}
      ${q.exec_receipt?l`<div class="detail-kv">
            <span class="detail-kv__k">exec_receipt</span>
            <span class="detail-kv__v detail-kv__v--wrap"
              >${kr(q.exec_receipt)}</span
            >
          </div>`:""}
      ${q.impl_entry?l`<div class="detail-kv">
            <span class="detail-kv__k">impl_entry</span>
            <span class="detail-kv__v"
              >${`${q.impl_entry.actor}@${q.impl_entry.sha}`}</span
            >
          </div>`:""}
      ${re.pr_url?l`<div class="detail-kv">
            <span class="detail-kv__k">pr_url</span>
            <span class="detail-kv__v detail-kv__v--wrap">${re.pr_url}</span>
          </div>`:""}
    `}let kt={route:["quick_fix","spec_backed","full_plan"]};async function Dt(S,re){let q=re.target.value;if(S==="route"&&d&&d.metadata&&d.metadata.route==="full_plan"&&q!=="full_plan"&&!window.confirm(`full_plan \u2192 ${q||"(\uBBF8\uC124\uC815)"} \uC804\uD658: \uC800\uC7A5\uB41C plan \uC2B9\uC778\uC740 \uD3EC\uAE30\uB418\uBA70, plan \uD30C\uC77C\xB7\uB9C8\uCEE4 \uC815\uB9AC\uB294 \uC138\uC158 \uACC4\uC57D\uC774 \uC218\uD589\uD569\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`)){$e();return}await yt("update-workflow-meta",{id:u,key:S,value:q},"\uC6CC\uD06C\uD50C\uB85C\uC6B0 \uBA54\uD0C0 \uBCC0\uACBD \uC2E4\uD328"),$e()}function f(S){let re=S.metadata||{};return l` ${((Oe,ut)=>{let st=kt[Oe],rt=typeof re[Oe]=="string"?re[Oe]:"";return l`<div class="detail-kv">
        <span class="detail-kv__k">${Oe}</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label=${Oe}
          data-edit=${`wfmeta-${Oe}`}
          @change=${nt=>Dt(Oe,nt)}
        >
          <option value="" ?selected=${!st.includes(rt)}>
            ${ut}
          </option>
          ${st.map(nt=>l`<option value=${nt} ?selected=${rt===nt}>${nt}</option>`)}
        </select>
      </div>`})("route","(unset)")} `}function A(S,re){return D?l`
        <div class="detail-edit">
          <input
            class="detail-edit__input"
            data-edit="title"
            aria-label="제목 편집"
            .value=${U}
            @input=${zt}
            @keydown=${q=>I(q,Lt,je,!1)}
          />
          <div class="detail-edit__actions">
            <button
              type="button"
              class="detail-edit__save"
              data-edit="title-save"
              @click=${Lt}
            >
              저장
            </button>
            <button
              type="button"
              class="detail-edit__cancel"
              data-edit="title-cancel"
              @click=${je}
            >
              취소
            </button>
          </div>
        </div>
      `:l`
      <div class="detail-title-row">
        <h2 class="detail-overlay__title">${S}</h2>
        ${Wt(re).map(q=>l`<span class="detail-usage-total" title=${q.tooltip}
              >${q.label}</span
            >`)}
        <button
          type="button"
          class="detail-edit-btn"
          data-edit="title"
          aria-label="제목 편집"
          @click=${Ft}
        >
          ✎
        </button>
      </div>
    `}function G(S){let re=Ht(S.created_at),q=Ht(S.updated_at);return!re&&!q?l``:l`
      ${re?l`<div class="detail-kv">
            <span class="detail-kv__k">생성</span>
            <span class="detail-kv__v detail-kv__v--time">${re}</span>
          </div>`:""}
      ${q?l`<div class="detail-kv">
            <span class="detail-kv__k">수정</span>
            <span class="detail-kv__v detail-kv__v--time">${q}</span>
          </div>`:""}
    `}function m(S,re){return l`
      <div class="detail-section-label">속성 (수정 가능)</div>
      <div class="detail-kv">
        <span class="detail-kv__k">status</span>
        <select
          class="detail-kv__v detail-kv__v--sel"
          aria-label="status"
          data-edit="status"
          @change=${W}
        >
          ${Xm.map(q=>l`<option value=${q} ?selected=${q===S}>${q}</option>`)}
        </select>
      </div>
      <div class="detail-kv">
        <span class="detail-kv__k">priority</span>
        <select
          class="detail-kv__v"
          aria-label="priority"
          data-edit="priority"
          @change=${ye}
        >
          ${Jm.map(q=>l`<option value=${String(q)} ?selected=${q===re}>
                P${q}
              </option>`)}
        </select>
      </div>
    `}function v(S){return l`
      <div class="detail-title-row">
        <div class="detail-overlay__section-label">설명</div>
        ${O?"":l`<button
              type="button"
              class="detail-edit-btn"
              data-edit="description"
              aria-label="설명 편집"
              @click=${Ut}
            >
              ✎
            </button>`}
      </div>
      ${O?l`<div class="detail-edit">
            <textarea
              class="detail-edit__textarea"
              data-edit="description"
              aria-label="설명 편집"
              rows="6"
              .value=${b}
              @input=${Mt}
              @keydown=${re=>I(re,w,k,!0)}
            ></textarea>
            <div class="detail-edit__actions">
              <button
                type="button"
                class="detail-edit__save"
                data-edit="description-save"
                @click=${w}
              >
                저장
              </button>
              <button
                type="button"
                class="detail-edit__cancel"
                data-edit="description-cancel"
                @click=${k}
              >
                취소
              </button>
            </div>
          </div>`:l`<div class="detail-overlay__desc">
            ${S||"(\uC124\uBA85 \uC5C6\uC74C)"}
          </div>`}
    `}function de(S){let re=typeof S.notes=="string"?S.notes:"";return re.trim().length===0?l``:l`
      <div class="detail-overlay__section-label">노트</div>
      <div class="detail-overlay__notes">${re}</div>
    `}function ue(S){let re=Array.isArray(S.labels)?S.labels:[];return l`
      <div class="detail-section-label">라벨</div>
      <div class="detail-labels">
        ${re.map(q=>l`<span class="detail-label-chip"
              >${q}<button
                type="button"
                class="detail-label-chip__x"
                data-label=${q}
                aria-label=${"\uB77C\uBCA8 \uC81C\uAC70: "+q}
                @click=${()=>Ie(q)}
              >
                ×
              </button></span
            >`)}
        <span class="detail-label-add">
          <input
            class="detail-label-add__input"
            aria-label="라벨 추가"
            placeholder="라벨 추가"
            .value=${B}
            @input=${we}
            @keydown=${tt}
          />
          <button
            type="button"
            class="detail-label-add__btn"
            @click=${be}
          >
            추가
          </button>
        </span>
      </div>
    `}function Be(){if(!u)return l``;let S=d||{},re=String(S.id||u),q=S.title||"(\uC81C\uBAA9 \uC5C6\uC74C)",Oe=te(),ut=S.status||"open",st=typeof S.priority=="number"?Math.max(0,Math.min(4,S.priority)):"",rt=S.description||"",nt={...S,metadata:{...S.metadata||{},...p}};return l`
      <div class="detail-overlay" role="dialog" aria-modal="true">
        <div class="detail-overlay__backdrop" @click=${()=>n()}></div>
        <div class="detail-overlay__panel">
          <div class="detail-overlay__bar">
            <button
              type="button"
              class="detail-overlay__id"
              title="ID 복사"
              @click=${xe}
            >
              ${re}
            </button>
            <button
              type="button"
              class="detail-overlay__close"
              aria-label="닫기"
              @click=${()=>n()}
            >
              ✕
            </button>
          </div>
          ${A(q,Oe)}
          ${Xc(nt)}
          ${Qc({metadata:nt.metadata,workspace_values:bt(),catalog:wt(),execution_defaults:He(),expanded:L,presets:Pe()?.presets||[],preset_id:_,preset_busy:h,skipped_orchestration_keys:$},{onToggle:It=>{L=It,$e()},onEdit:(It,Jt)=>{if(It==="impl_runtime"||It==="impl_model"||It==="impl_effort"){_t(It,Jt??"");return}Fe(It,Jt??"")},onPresetSelect:It=>{_=It,$=[],$e()},onPresetApply:()=>{X()}})}
          ${ou({md:nt.metadata,catalog:V,handlers:{onExecChange:Fe}})}
          ${m(ut,st)} ${G(S)}
          ${v(rt)}
          ${qc(ge,De,{expanded:ne,draft:ae,sending:Me,error:se})}
          ${de(S)} ${ue(S)} ${ft(S)}
          ${Pt(S)} ${f(S)}
          ${Pc(S,T)}
          ${_u({expanded:Je,loading:ot,error:K,data:Q},{onToggle:J})}
          ${fu(ie(),ht,{total:Oe,expanded:qe})}
        </div>
      </div>
    `}function $e(){Ye(Be(),e)}return{load(S){S!==u&&(p={},_="",$=[],L=!1,ee(),oe(),pe(),Ae()),u=S,d=null,M(),pt(),H!==S&&le(S)},clear(){u=null,d=null,p={},_="",h=!1,$=[],L=!1,ee(),oe(),pe(),Ae(),ze.close(),Ve.close(),Ye(l``,e)},destroy(){E&&(E(),E=null),F&&(F(),F=null),y&&(y(),y=null),document.removeEventListener("keydown",C),ze.destroy(),ve.parentNode&&ve.parentNode.removeChild(ve),Ve.destroy(),We.parentNode&&We.parentNode.removeChild(We),u=null,d=null,Ae(),_="",h=!1,$=[],oe(),pe(),Ye(l``,e)}}}function gu(e){let t=document.createElement("dialog");t.id="fatal-error-dialog",t.setAttribute("role","alertdialog"),t.setAttribute("aria-modal","true"),t.innerHTML=`
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
    </div>`,e.appendChild(t);let r=t.querySelector("#fatal-error-title"),n=t.querySelector("#fatal-error-message"),s=t.querySelector("#fatal-error-detail"),o=t.querySelector("#fatal-error-reload"),a=t.querySelector("#fatal-error-close"),i=()=>{if(typeof t.close=="function")try{t.close()}catch{}t.removeAttribute("open")},c=(u,d,p="")=>{r&&(r.textContent=u||"Unexpected Error"),n&&(n.textContent=d||"An unrecoverable error occurred.");let _=typeof p=="string"?p.trim():"";if(s&&(_.length>0?(s.textContent=_,s.removeAttribute("hidden")):(s.textContent="No additional diagnostics available.",s.setAttribute("hidden",""))),typeof t.showModal=="function")try{t.showModal(),t.setAttribute("open","")}catch{t.setAttribute("open","")}else t.setAttribute("open","")};return o&&o.addEventListener("click",()=>{window.location.reload()}),a&&a.addEventListener("click",()=>i()),t.addEventListener("cancel",u=>{u.preventDefault(),i()}),{open:c,close:i,getElement(){return t}}}function ko(e){return typeof e=="string"&&e.length>=7?e.slice(0,7):"\u2014"}function ds(e){if(typeof e!="number"||!Number.isFinite(e)||e<0)return"\u2014";if(e<1e3)return`${Math.round(e)}ms`;let t=e/1e3;if(t<60)return`${t.toFixed(1)}\uCD08`;let r=Math.floor(t/60);if(r<60)return`${r}\uBD84 ${Math.round(t-r*60)}\uCD08`;let n=Math.floor(r/60),s=r%60;return`${n}\uC2DC\uAC04 ${s}\uBD84`}function $o(e,t){if(typeof e!="object"||e===null)return null;let r=0,n=!1;for(let s of Object.values(e)){if(typeof s!="object"||s===null)continue;let o=s;if(o.bead_id!==t)continue;let a=o.started_at,i=o.finished_at;typeof a!="number"||typeof i!="number"||!Number.isFinite(a)||!Number.isFinite(i)||i<a||(r+=i-a,n=!0)}return n?r:null}function xo(e){if(typeof e!="number"||!Number.isFinite(e)||e<=0)return"";let t=new Date(e);return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function eg(e,t){let r=Array.isArray(e)?e:[],n=Array.isArray(t)?t:[];if(r.length===0&&n.length===0)return null;let s=null;for(let i of r)i.kind!=="deploy"||i.state!=="succeeded"||typeof i.target_sha!="string"||(!s||(typeof i.finished_at=="number"?i.finished_at:0)>(typeof s.finished_at=="number"?s.finished_at:0))&&(s=i);let o=r.filter(i=>i.state==="failed"&&!i.dismissed&&!i.superseded_by).length+n.length,a=r.some(i=>i.state==="repairing");return{deploy:s?{sha:ko(s.target_sha),at:typeof s.finished_at=="number"?s.finished_at:null,elapsed_ms:typeof s.elapsed_ms=="number"?s.elapsed_ms:null}:null,unresolved:o,repairing:a,badge:o>0?{tone:"act",label:`\uD574\uACB0 \uD544\uC694 ${o}`}:a?{tone:"live",label:"\uC790\uB3D9 \uD574\uACB0 \uC911"}:{tone:"quiet",label:"\uBAA8\uB450 \uC815\uC0C1"}}}function hu(e,t){let r=eg(e,t);return r?l`<button
    type="button"
    class="worker-repo-strip"
    data-seam="repo-ops-strip"
    aria-label="저장소 작업 타임라인 열기"
  >
    <span class="worker-repo-strip__cue" aria-hidden="true">▸</span>
    <span class="worker-repo-strip__name">저장소 작업</span>
    ${r.deploy?l`<span class="worker-repo-strip__fact">
          배포
          <code class="worker-repo-strip__sha">${r.deploy.sha}</code>
          <span class="worker-repo-strip__ok">✓ 최신</span>
          <span
            class="worker-repo-strip__ago"
            title=${r.deploy.at?Ht(r.deploy.at):""}
            >${xo(r.deploy.at)}${r.deploy.elapsed_ms!==null?` \xB7 ${ds(r.deploy.elapsed_ms)}`:""}</span
          >
        </span>`:""}
    <span class="worker-repo-strip__spacer"></span>
    <span
      class="worker-repo-strip__badge worker-repo-strip__badge--${r.badge.tone}"
      >${r.badge.label}</span
    >
  </button>`:""}function Cn(e){let t=tr(e.created_at),r=tr(e.updated_at);return!t&&!r?"":l`<div class="worker-mini__meta">
    ${t?l`<span title=${`\uC0DD\uC131 ${Ht(e.created_at)}`}
          >생성 ${t}</span
        >`:""}${t&&r?l`<span>·</span>`:""}${r?l`<span title=${`\uC218\uC815 ${Ht(e.updated_at)}`}
          >수정 ${r}</span
        >`:""}
  </div>`}function tg(e){return!e||e==="requested"?"\uBC31\uC5C5 \uC911":e==="backup_verified"||e==="signaled"?"runner \uC885\uB8CC \uC911":e==="merged_revert"||e.startsWith("revert_")?"revert PR \uB300\uAE30":e.startsWith("rollback_")?"\uC6D0\uBCF5 \uBC30\uD3EC \uC911":e==="runner_terminated"||e.startsWith("pr_")||e.includes("ref_")||e.includes("worktree")||e.startsWith("bead_")?"PR \uC815\uB9AC \uC911":`\uD3D0\uAE30 \uCC98\uB9AC \uC911 (${e})`}function ps(e,t){return t==="merged"?`${e}: \uC774\uBBF8 merge\uB41C \uAD6C\uD604\uC785\uB2C8\uB2E4. \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 revert PR\uC744 \uC0DD\uC131\uD558\uBA70, \uC2E4\uC81C \uC6D0\uBCF5\uC740 \uC0AC\uB78C\uC774 \uADF8 PR\uC744 merge\uD55C \uB4A4 \uC644\uB8CC\uB429\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`:`${e}: \uBCF5\uAD6C archive\uB97C \uB9CC\uB4E0 \uB4A4 runner/PR/branch/worktree\uB97C \uC815\uB9AC\uD558\uACE0 \uC774\uC288\uB97C \uD6C4\uBCF4\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?`}function Ao(e){let t=["\uD3D0\uAE30 \uC644\uB8CC"];return e.operation_id&&t.push(`\uC791\uC5C5 ${e.operation_id}`),e.receipt?.archive_path&&t.push(`\uBC31\uC5C5 ${e.receipt.archive_path}`),e.receipt?.original_pr?.url&&t.push(`\uC6D0\uBCF8 PR ${e.receipt.original_pr.url}`),e.receipt?.revert_pr?.url&&t.push(`revert PR ${e.receipt.revert_pr.url}`),t.join(" \xB7 ")}function vr(e,t,r={}){let s=Object.values(e&&typeof e=="object"?e:{}).filter(p=>p&&p.bead_id===t&&p.phase!=="done").sort((p,_)=>(p.requested_at||0)-(_.requested_at||0)).at(-1),o=typeof r.attempt_id=="string"&&r.attempt_id.length>0?r.attempt_id:typeof s?.attempt_id=="string"?s.attempt_id:null,a=r.external?"\uC678\uBD80 PR\uC740 Worker\uAC00 \uC18C\uC720\uD558\uC9C0 \uC54A\uC544 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.done?"\uC644\uB8CC\uB41C \uC791\uC5C5\uC740 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_active?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":r.merge_queued?"\uBA38\uC9C0 \uD050\uC5D0 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 [\uCDE8\uC18C]\uD558\uC138\uC694":r.conflict_active?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC788\uC74C \u2014 \uD3D0\uAE30\uD558\uB824\uBA74 \uBA3C\uC800 \uC138\uC158\uC744 \uC815\uB9AC\uD558\uC138\uC694":r.cleanup_active?"\uC815\uB9AC \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":null,i=typeof s?.last_error=="string"?s.last_error:null,c=s?tg(s.phase):null,u=s?.kind==="stale_work_backup_fresh",d=r.merged||s?.mode==="merged_revert"?"merged":"unmerged";return{action:!r.external&&!r.done,enabled:!a&&(!s||!!i),label:u?i?"\uBC31\uC5C5 \uC815\uB9AC \uC7AC\uC2DC\uB3C4":"\uBC31\uC5C5 \uD6C4 \uC0C8\uB85C \uC2DC\uC791":i?"\uC7AC\uC2DC\uB3C4":"\uD3D0\uAE30",title:a||(i?u?`\uBC31\uC5C5 \uB4A4 \uC815\uB9AC \uC2E4\uD328: ${i} \u2014 \uC6D0\uBCF8\uACFC \uAC80\uC99D \uC601\uC218\uC99D\uC744 \uBCF4\uC874\uD55C \uCC44 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:`\uD3D0\uAE30 \uC2E4\uD328: ${i} \u2014 \uAC19\uC740 \uC791\uC5C5\uC744 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4`:s?`${c||"\uD3D0\uAE30 \uCC98\uB9AC \uC911"} \u2014 \uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694`:d==="merged"?"\uBCD1\uD569\uB41C \uBCC0\uACBD\uC744 \uC6D0\uBCF5 PR\uB85C \uB418\uB3CC\uB9BD\uB2C8\uB2E4":"\uBC31\uC5C5 \uD6C4 runner\xB7PR\xB7\uC6CC\uD06C\uD2B8\uB9AC\xB7\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4"),attempt_id:o,operation:s||null,progress:c,error:i,confirmation:d}}function us(e){let t=e.discard;if(!t||!t.operation)return"";let r=t.operation,n=r.kind==="stale_work_backup_fresh"&&!t.error?null:r.backup?.path,s=r.original_pr,o=r.revert_pr;return l`<div
    class="worker-discard-receipt"
    role=${t.error?"alert":"status"}
  >
    <span>${t.progress}</span>
    ${t.error?l`<span>폐기 실패: ${t.error}</span>`:""}
    <code>작업: ${r.operation_id}</code>
    ${n?l`<code>백업: ${n}</code>`:t.error?l`<span>아직 아무것도 삭제하지 않음</span>`:""}
    ${s?.url?l`<a href=${s.url} target="_blank" rel="noreferrer noopener"
          >원본 PR #${s.number||"?"}</a
        >`:""}
    ${o?.url?l`<a href=${o.url} target="_blank" rel="noreferrer noopener"
          >revert PR #${o.number||"?"} ·
          ${o.state||"\uC0C1\uD0DC \uBBF8\uD655\uC778"}</a
        >`:""}
  </div>`}var rg={dirty_unique:"\uCD5C\uC2E0 base\uC5D0 \uC5C6\uB294 \uB85C\uCEEC \uBCC0\uACBD\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",untracked_present:"\uCD94\uC801\uB418\uC9C0 \uC54A\uC740 \uD30C\uC77C\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",branch_ahead:"\uB85C\uCEEC branch\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",head_ahead:"worktree HEAD\uC5D0 \uACE0\uC720 commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_not_contained:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 \uCD5C\uC2E0 base\uC5D0 \uD3EC\uD568\uB410\uC74C\uC744 \uC99D\uBA85\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ahead_merge_commit:"\uB85C\uCEEC branch\uC5D0 \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 merge commit\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",ahead_submodule_path:"\uB85C\uCEEC branch\uC758 \uACE0\uC720 commit\uC774 submodule \uACBD\uB85C\uB97C \uBCC0\uACBD\uD569\uB2C8\uB2E4",archive_failed:"\uACE0\uC720 commit \uBC31\uC5C5\uC744 \uC548\uC804\uD558\uAC8C \uAC80\uC99D\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",ref_delete_failed:"\uD655\uC778\uB41C local branch\uB97C \uC548\uC804\uD558\uAC8C \uC0AD\uC81C\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",resume_available:"\uC774\uC5B4\uAC08 \uC218 \uC788\uB294 \uC774\uC804 Worker session\uC774 \uC788\uC2B5\uB2C8\uB2E4",observe_failed:"Git \uC0C1\uD0DC\uB97C \uC548\uC804\uD558\uAC8C \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4",identity_changed:"\uD655\uC778 \uC911 worktree \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4",ownership_unknown:"Worker \uC18C\uC720 worktree\uC778\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4"};function bu(e,t=!1){if(!e||typeof e!="object")return null;let r=e;if(r.reason!=="worktree_stale_work"||!r.stale_work||typeof r.stale_work!="object")return null;let n=r.stale_work,s=n.residue==="branch"?"branch":"worktree",o=n.state==="unique"?"unique":"unknown",a=n.summary&&typeof n.summary=="object"?n.summary:{};function i(u){return Number.isInteger(a[u])?Number(a[u]):0}let c=typeof n.cause=="string"?n.cause:"observe_failed";return{residue:s,state:o,title:s==="branch"?"\uC774\uC804 \uBE0C\uB79C\uCE58 \uBCF4\uC874\uB428":o==="unique"?"\uC774\uC804 \uC791\uC5C5 \uBCF4\uC874\uB428":"\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",cause:rg[c]||"\uC548\uC804\uD558\uAC8C \uC790\uB3D9 \uC815\uB9AC\uD560 \uC218 \uC5C6\uB294 \uC774\uC804 \uC791\uC5C5\uC774 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4",summary:s==="branch"?`\uACE0\uC720 commit ${i("branch_ahead")}`:[`staged ${i("staged_count")}`,`unstaged ${i("unstaged_count")}`,`untracked ${i("untracked_count")}`,`branch ahead ${i("branch_ahead")}`,`HEAD ahead ${i("head_ahead")}`].join(" \xB7 "),action_id:typeof n.action_id=="string"?n.action_id:"",can_resume:n.can_resume===!0,can_continue:n.can_continue===!0,can_backup_fresh:n.can_backup_fresh===!0,can_recheck:n.can_recheck===!0,locked:t}}function So(e,t={}){if(!e||!e.orchestration&&!e.worker)return"";let r=t.pin===!0?" exec-chip--pin":"",n=t.pin===!0?`
\uC774\uC288 \uD540 \u2014 \uB808\uD3EC \uAE30\uBCF8\uAC12\uACFC \uB2E4\uB984`:"";return l`${e.orchestration?l`<span
        class="exec-chip exec-chip--orch${r}"
        title=${`${e.orchestration.title}${n}`}
        ><span class="exec-chip__k">오케</span
        ><span class="exec-chip__v">${e.orchestration.text}</span></span
      >`:""}${e.worker?l`<span
        class="exec-chip exec-chip--worker${r}"
        title=${`${e.worker.title}${n}`}
        ><span class="exec-chip__k">워커</span
        ><span class="exec-chip__v">${e.worker.text}</span></span
      >`:""}`}function Eo(e){if(!e)return"";let t=Array.isArray(e.predecessors)?e.predecessors:[],r=Array.isArray(e.successors)?e.successors:[],n=Array.isArray(e.warnings)?e.warnings:[];return t.length===0&&r.length===0&&n.length===0?"":l`<div class="worker-deps">
    ${t.map(s=>l`<span class="worker-dep worker-dep--pred" title=${s.title||""}
          ><span class="worker-dep__label">${s.label}</span
          ><button
            type="button"
            class="worker-dep__remove"
            data-blocker-id=${s.id}
            aria-label=${`\uC120\uD589 ${s.id} \uC5F0\uACB0 \uD574\uC81C`}
            title="선행 연결 해제"
          >
            ✕
          </button></span
        >`)}${r.map(s=>l`<span class="worker-dep worker-dep--succ" title=${s.title||""}
          >${s.label}</span
        >`)}${n.map(s=>l`<span class="worker-dep worker-dep--warn">${s}</span>`)}
  </div>`}function Rn(e){if(!e)return"";let t=e.chips||{},r=t.route||e.route,n=t.route_source==="derived"||e.route_source==="derived";return r?l`<span
    class="ctl-chip ctl-chip--route${n?" is-derived":""}"
    title=${n?"route \uBBF8\uD540 (metadata unset)":"route"}
    >${n?"unset":r}</span
  >`:""}function ng(e){let t=Array.isArray(e.badges)?e.badges:[],r=Wt(e.usage),n=Ar(e.usage),s=tr(e.done_at);return l`<div
    class="worker-mini worker-mini--static worker-mini--done worker-mini--three-line"
    draggable="false"
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-mini__row1">
      ${e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${e.id}</span>
      ${s?l`<span
            class="worker-mini__done-at"
            title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
            >완료 ${s}</span
          >`:""}
      ${t.map(o=>l`<span
            class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
            >${o}</span
          >`)}
    </div>
    <div class="worker-mini__row2">
      <span class="worker-mini__title">${e.title}</span>
    </div>
    <div class="worker-mini__row3">
      ${r.length>0?r.map(o=>l`<span class="worker-usage" title=${o.tooltip}
                >${o.label}</span
              >`):n?l`<span class="worker-usage" title=${Vn(e.usage)}
              >${n}</span
            >`:""}
      ${typeof e.work_ms=="number"?l`<span
            class="worker-mini__work"
            title="attempt 실행 시간 합산 (재개 세션 포함)"
            >작업 ${ds(e.work_ms)}</span
          >`:""}
    </div>
  </div>`}function sn(e){if(e.lane==="done"&&e.done_layout==="three_line")return ng(e);let t=e.draggable&&!e.done,r=Array.isArray(e.badges)?e.badges:[],n=Wt(e.usage),s=Ar(e.usage),o=e.merge_step||null,a=e.lane==="pr_wait"||!!e.revise_action||!!e.stale_work,i=e.lane==="done"&&!a,c=i?tr(e.done_at):"",u=t?l`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`:"",d=typeof e.seq=="number"?l`<span class="worker-mini__seq" aria-hidden="true"
          >${e.seq}</span
        >`:"",p=e.worker_serial===!0?l`<span
          class="worker-mini__serial worker-mini__serial--legacy"
          title="legacy worker-serial 라벨 잔재 — 스케줄링에 사용되지 않습니다"
          >worker-serial</span
        >`:"",_=e.workspace_name?l`<span class="worker-mini__repo" title=${e.root_dir||""}
        >${e.workspace_name}</span
      >`:"",h=l`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${e.id}</span
  >`,$=e.lane==="done"?"":Rn(e.workflow),L=l`<span class="worker-mini__title">${e.title}</span>`,j=e.pr_url&&e.pr_number?l`<a
          class="worker-mini__pr"
          href=${e.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${e.pr_number} ↗</a
        >`:"",V=e.completion_repair_pr_url&&e.completion_repair_pr_number?l`<a
          class="worker-mini__pr worker-mini__repair-pr"
          href=${e.completion_repair_pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="repair PR 열기"
          >repair #${e.completion_repair_pr_number} ↗</a
        >`:"",H=r.map(N=>N===e.live_badge?l`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${N}</span
        >`:l`<span
          class="worker-mini__badge${e.alert?" worker-mini__badge--alert":""}"
          title=${N===e.completion_badge&&e.completion_title||""}
          >${N}</span
        >`),P=e.reason?l`<span class="worker-mini__reason">${e.reason}</span>`:"",D=n.length>0?n.map(N=>l`<span class="worker-usage" title=${N.tooltip}
              >${N.label}</span
            >`):s?l`<span class="worker-usage" title=${Vn(e.usage)}
            >${s}</span
          >`:"",O=o?l`<span
        class="merge-step${o.failed?" merge-step--failed":""}"
        style=${`--progress: ${o.percent}%`}
        >${o.label}${o.index>0?l`<span class="merge-step__n"
              >${o.index}/${o.total}</span
            >`:""}</span
      >`:"",U=e.merge_action?l`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${e.id}
        ?disabled=${e.merge_enabled===!1}
        title=${e.merge_title||""}
      >
        ${e.merge_label||"\uBA38\uC9C0"}
      </button>`:"",b=e.cancel_action?l`<button
        type="button"
        class="worker-mini__merge-cancel"
        data-bead-id=${e.id}
        ?disabled=${e.cancel_enabled===!1}
        title=${e.cancel_title||""}
      >
        취소
      </button>`:"",B=e.timeline_action?l`<button
        type="button"
        class="worker-mini__timeline"
        data-bead-id=${e.id}
        title="저장소 작업이 끝나지 않아 머지 액션이 잠겼습니다 — 타임라인에서 원인과 해결 버튼을 볼 수 있습니다"
      >
        저장소 작업 보기
      </button>`:"",ee=e.discard,Ae=ee?.action||e.discard_action?l`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${e.id}
          data-attempt-id=${ee?.attempt_id||""}
          data-operation-id=${ee?.operation?.operation_id||""}
          data-discard-mode=${ee?.confirmation||"unmerged"}
          ?disabled=${ee?!ee.enabled:e.discard_enabled===!1}
          title=${ee?ee.title:e.discard_enabled===!1?e.discard_title||"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uD3D0\uAE30\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"PR\uC744 \uB2EB\uACE0 \uC6CC\uD06C\uD2B8\uB9AC/\uBE0C\uB79C\uCE58\uB97C \uD3D0\uAE30\uD569\uB2C8\uB2E4 (\uB418\uB3CC\uB9B4 \uC218 \uC5C6\uC74C). \uB2E4\uC2DC \uC2E4\uD589\uD558\uB824\uBA74 \uD6C4\uBCF4 \uB808\uC778\uC5D0\uC11C \uB300\uAE30 \uB808\uC778\uC73C\uB85C \uC62E\uAE30\uC138\uC694"}
        >
          ${ee?.label||"\uD3D0\uAE30"}
        </button>`:"",Z=e.stale_work||null,le=Z?l`${Z.can_resume||Z.can_continue?l`<button
            type="button"
            class="worker-mini__stale-continue"
            data-bead-id=${e.id}
            data-action-id=${Z.action_id}
            ?disabled=${Z.locked}
          >
            기존 작업 이어가기
          </button>`:""}${Z.can_backup_fresh?l`<button
            type="button"
            class="worker-mini__stale-backup"
            data-bead-id=${e.id}
            data-action-id=${Z.action_id}
            ?disabled=${Z.locked}
          >
            백업 후 새로 시작
          </button>`:""}${Z.can_recheck?l`<button
            type="button"
            class="worker-mini__stale-recheck"
            data-bead-id=${e.id}
            data-action-id=${Z.action_id}
            ?disabled=${Z.locked}
          >
            다시 확인
          </button>`:""}`:"",ge=Z?l`<div class="worker-mini__stale">
        <strong>${Z.title}</strong>
        <span>${Z.summary}</span>
        <span>${Z.cause}</span>
        ${Z.can_backup_fresh?l`<small
              >Git-ignored dependency/build output은 archive에 포함되지
              않습니다</small
            >`:""}
      </div>`:"",Te=e.revise_action?l`<button
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
        </button>`:"",Le=e.lane!=="pr_wait"&&!e.done&&e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${So(e.exec_chips,{pin:e.exec_chips_pinned===!0})}
        </div>`:"",se=Eo(e.dependency_chips),ae=us(e),Me=!!(s||o||e.merge_action||e.cancel_action||e.timeline_action||e.discard_action||ee?.operation||e.revise_action||Z);return l`<div
    class="worker-mini${a?" worker-mini--card":""}${t?"":" worker-mini--static"}${e.done?" worker-mini--done":""}${e.ghost?" worker-mini--ghost":""}${o?" worker-mini--merging":""}${o?.failed?" worker-mini--merge-failed":""}${e.external?" worker-mini--external":""}"
    style=${o?`--progress: ${o.percent}%`:""}
    draggable=${t?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    ${i?l`<div class="worker-mini__row1">${_}${h}${L}</div>
          <div class="worker-mini__row2">
            ${D}${c?l`<span
                  class="worker-mini__done-at"
                  title=${`\uC644\uB8CC ${Ht(e.done_at)}`}
                  >완료 ${c}</span
                >`:""}${typeof e.work_ms=="number"?l`<span
                  class="worker-mini__work"
                  title="attempt 실행 시간 합산 (재개 세션 포함)"
                  >작업 ${ds(e.work_ms)}</span
                >`:""}${H}${O}
            <span class="worker-mini__actions"
              >${U}${b}${B}${Ae}</span
            >
            ${Cn(e)}
          </div>`:a?l`<div class="worker-mini__head">
              ${u}${d}${_}${h}${$}${j}${V}${H}${p}${P}
            </div>
            <div class="worker-mini__body">${L}${ge}</div>
            ${se}${Le}${Me?l`<div class="worker-mini__foot">
                  ${D}${O}
                  <span class="worker-mini__actions"
                    >${U}${b}${B}${Ae}${Te}${le}</span
                  >
                  ${us(e)}
                </div>`:""}
            ${Cn(e)}`:l`<div class="worker-mini__line">
              ${u}${d}${_}${h}${$}${L}${j}${V}${H}${p}${P}${D}${O}${U}${b}${B}${Ae}
            </div>
            ${se}${Le}${ae} ${Cn(e)}`}
  </div>`}function Va(e,t=null,r={}){let n=e.worker_ineligible===!0,s=e.draggable&&!e.done&&!n,o=s&&t&&t.bead_id===e.id,a=e.workflow,i=typeof e.reason=="string"&&e.reason.split(" \xB7 ").includes("missing_description"),c=typeof e.reason=="string"&&e.reason.startsWith("\u26D4"),u=Eo(e.dependency_chips);return l`<div
    class="worker-card${s?"":" worker-card--static"}${n?" worker-card--ineligible":""}"
    draggable=${s?"true":"false"}
    data-bead-id=${e.id}
    data-lane=${e.lane}
  >
    <div class="worker-card__head">
      ${s?l`<span class="worker-card__grip" aria-hidden="true">⠿</span>`:""}
      ${e.workspace_name?l`<span class="worker-card__repo" title=${e.root_dir||""}
            >${e.workspace_name}</span
          >`:""}
      <span class="worker-card__id" title="클릭하면 ID 복사">${e.id}</span>
      ${n?l`<span
            class="ctl-chip worker-card__ineligible"
            title="worker-ineligible label이 붙어 워커 실행 대상이 아닙니다"
            >⛔ worker-ineligible</span
          >`:""}
      ${Rn(a)}
    </div>
    <div class="worker-card__title">${e.title}</div>
    ${a?bn(a,e.status):""}${u}
    ${e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?l`<div class="worker-mini__exec">
          ${So(e.exec_chips,{pin:r.exec_chips_mode==="pinned_only"})}
        </div>`:""}
    <div
      class="worker-card__foot${e.reason?"":" worker-card__foot--actions-only"}"
    >
      ${o?l`<div class="worker-card__place-menu">
            ${t.lanes.map(d=>l`<button
                  type="button"
                  class="worker-card__place-lane"
                  data-bead-id=${e.id}
                  data-lane=${d.id}
                  title="${d.label} 대기 맨 뒤에 추가"
                >
                  <span>${d.label}</span>
                  <span class="worker-card__place-count">${d.count}</span>
                </button>`)}
            <button
              type="button"
              class="worker-card__place-cancel"
              data-bead-id=${e.id}
              title="레인 선택 취소"
              aria-label="레인 선택 취소"
            >
              ✕
            </button>
          </div>`:l`${e.reason?l`<span
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
              ?disabled=${!s}
              title=${s?"\uB300\uAE30 \uD050 \uB9E8 \uB4A4\uC5D0 \uCD94\uAC00":n?"worker-ineligible label\uB85C \uC6CC\uCEE4\uC5D0\uC11C \uC2E4\uD589\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":i?"description\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"spec\uC774 \uC5C6\uC5B4 \uB300\uAE30 \uD050\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"}
            >
              대기로 ↴
            </button>`}
    </div>
    ${Cn(e)}
  </div>`}function cr(e){let t=!!e.collapsible&&!!e.collapsed,r=l`<span
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
                  </div>`:e.items.map(n=>e.lane==="candidate"?Va(n,e.place_menu):sn(n))}
          </div>`}
  </section>`}var yu={verify_failed:"\uAC80\uC99D \uC2E4\uD328",verify_cmd_failed:"\uAC80\uC99D \uC2E4\uD328",verify_script_failure:"\uAC80\uC99D \uC2E4\uD328",deploy_failed:"\uBC30\uD3EC \uC2E4\uD328",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328",interrupted_without_terminal_exit:"\uC911\uB2E8\uB428"},vu={repo_ops_worktree_unowned:"\uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC\uAC00 \uC544\uC9C1 Worker \uC18C\uC720\uAC00 \uC544\uB2C8\uC5B4\uC11C \uC2A4\uD06C\uB9BD\uD2B8 \uC2E4\uD589 \uC804\uC5D0 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",verify_cmd_failed:"\uBA38\uC9C0 \uD6C4 \uAC80\uC99D \uBA85\uB839\uC774 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",gh_observation_failed:"GitHub\uC5D0\uC11C PR \uC0C1\uD0DC\uB97C \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",verify_script_failure:"\uAC80\uC99D \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",deploy_script_failure:"\uBC30\uD3EC \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",interrupted_without_terminal_exit:"\uC791\uC5C5\uC774 \uC885\uB8CC \uAE30\uB85D \uC5C6\uC774 \uC911\uB2E8\uB410\uC2B5\uB2C8\uB2E4.",base_unresolved:"PR\uC774 \uC5B4\uB290 base \uBE0C\uB79C\uCE58\uB85C \uBA38\uC9C0\uB418\uB294\uC9C0 \uD655\uC815\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ref_unobserved:"PR\uC758 base \uBE0C\uB79C\uCE58\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",merge_sha_unobserved:"\uBA38\uC9C0 \uCEE4\uBC0B SHA\uB97C \uC544\uC9C1 \uAD00\uCE21\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_fetch_failed:"\uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uB97C fetch\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_rev_unavailable:"fetch\uD55C \uC6D0\uACA9 base \uBE0C\uB79C\uCE58\uC758 \uCEE4\uBC0B\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.",base_ff_diverged:"\uB85C\uCEEC base \uBE0C\uB79C\uCE58\uAC00 \uC6D0\uACA9\uACFC \uAC08\uB77C\uC838 fast-forward\uB85C \uC815\uB82C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",deployment_target_not_covering_merge:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",deployment_candidate_ancestry_check_failed:"\uBC30\uD3EC \uB300\uC0C1 base\uAC00 \uC774 \uBA38\uC9C0 \uCEE4\uBC0B\uC744 \uD3EC\uD568\uD558\uB294\uC9C0 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."};function wu(e){return typeof e!="string"||e.length===0?[]:e.split(":").filter(t=>t.length>0)}function Ka(e){for(let t of wu(e))if(Object.hasOwn(yu,t))return yu[t];return null}function Ya(e){let t=null;for(let r of wu(e))Object.hasOwn(vu,r)&&(t=vu[r]);return t}function To(e){let t=Ka(e),r=Ya(e);return t&&r?`${t} \u2014 ${r}`:t||r?t||r:typeof e=="string"?e:""}function ku(e,t){let r=Ka(e)??Ka(t),n=Ya(t)??Ya(e);return r&&n?`${r} \u2014 ${n}`:r||n?r||n:typeof t=="string"?t:""}var $u=160;function sg(e){return e.length>$u?`${e.slice(0,$u)}\u2026`:e}function og(e){return!e||!e.reason?"":l`<div class="worker-banner__detail">
    가드:
    ${e.reason}${e.command?l` · <code>${sg(e.command)}</code>`:""}
  </div>`}function ag(e){return e?l`<details class="worker-banner__raw">
    <summary>세부</summary>
    <dl class="worker-banner__kv">
      <div>
        <dt>실패 코드</dt>
        <dd>${e}</dd>
      </div>
    </dl>
  </details>`:""}function ig(e){if(!Number.isFinite(e)||e<0)return"0s";let t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return r>0?`${r}m ${String(n).padStart(2,"0")}s`:`${n}s`}function xu(e){let t=e.failure?To(e.failure.reason):"";return l`<div class="worker-banners">
    ${e.failure?l`<div class="worker-banner worker-banner--failure" role="alert">
          ⛔ ${e.failure.repo||"repo"} 세션 실패 —
          ${t}${t&&!t.endsWith(".")?".":""}
          자동 진행을 껐습니다, 수동 ▶ 필요.
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__resume"
                data-attempt-id=${e.failure.resume_attempt_id}
                ?disabled=${!e.failure.resume_eligible}
                title=${e.failure.resume_eligible?"\uCD5C\uADFC \uC2E4\uD328 \uC138\uC158\uC744 \uAC19\uC740 \uC6CC\uD06C\uD2B8\uB9AC\uC5D0\uC11C \uC774\uC5B4\uC11C \uC9C4\uD589":e.failure.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}
              >
                ↻ 이어하기
              </button>`:""}
          ${e.failure.discard?.action?l`<button
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
          ${e.failure.resume_attempt_id?l`<button
                type="button"
                class="worker-banner__dismiss"
                data-attempt-id=${e.failure.resume_attempt_id}
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="배너 닫기"
              >
                ✕
              </button>`:""}
          ${og(e.failure.cause_detail)}
          ${ag(e.failure.reason)}
          ${us({discard:e.failure.discard})}
        </div>`:""}
  </div>`}function lg(e){return e?l`${e.repo?l`<span
        class="worker-card__repo rtile__repo"
        title=${e.root_dir||""}
        >${e.repo}</span
      >`:""}${e.serial_lane_id?l`<span class="rtile__lane">${e.serial_lane_id}</span>`:""}`:""}function cg(e,t,r,n=null){if(!e)return"";let s=e.workflow||null,o=e.last_activity||null,a=o&&typeof o.text=="string"?o.text:"",i=o&&typeof o.at=="number"?o.at:null,c=n||!Array.isArray(e.legs)?[]:e.legs,u=c.filter(h=>h&&h.state==="live"),d=c.filter(h=>h&&h.state!=="live"),p=Eo(e.dependency_chips),_=n?tr(n.updated_at,t):"";return l`${s?bn(s,"in_progress"):""}
  ${a?l`<div class="rtile__activity${r?" is-paused":""}">
        <span class="rtile__activity-dot" aria-hidden="true"></span>
        <span class="rtile__activity-text">${a}</span>
        ${i!==null?l`<span class="rtile__activity-age"
              >${tr(i,t)}</span
            >`:""}
      </div>`:_?l`<div class="rtile__activity rtile__activity--session">
          <span class="rtile__activity-dot" aria-hidden="true"></span>
          <span class="rtile__activity-text">갱신 ${_}</span>
        </div>`:""}${u.length>0||d.length>0?l`<div class="rtile__legs">
        ${u.map(h=>l`<span class="rtile__leg rtile__leg--live"
              >⟳ ${h.label}</span
            >`)}${d.length>0?l`<span
              class="rtile__leg rtile__leg--done"
              title=${`\uC644\uB8CC\uB41C \uC704\uC784: ${d.map(h=>h.label).join(", ")}`}
              >✓ ${d.length}</span
            >`:""}
      </div>`:""}${p}`}function Za(e,t,r=null,n={}){let s=e.kind==="session",o=e.failed===!0,a=!!e.paused,i=o?e.status_label||(e.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328"):a?"\uC77C\uC2DC\uC815\uC9C0":typeof e.started_at=="number"?ig(t-e.started_at):"\u2014",c=e.exec_chips&&(e.exec_chips.orchestration||e.exec_chips.worker)?e.exec_chips:null,u=zn(e),d=Wt(e.usage),p=Ar(e.usage),_=e.conflict_resolution?a?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":"\uCDA9\uB3CC \uD574\uC18C":null,h=e.base_exception||null,$=e.landing,L=e.attempt_id&&e.attempt_id===r,j=n.monitor||null,V=lg(j),H=cg(j,t,a,s?{updated_at:e.updated_at??null}:null),P=s&&e.workflow?.chips?.exec_receipt||null,D=P?l`<div class="rtile__meta">
        <span
          class="ctl-chip ctl-chip--exec-receipt"
          title=${`exec_receipt ${kr(P)}`}
          >${`${P.kind}:${Hs(P)}`}</span
        >
      </div>`:"",O=s?"":Cn(e),U=e.discard?.action?l`<button
        type="button"
        class="rtile__discard"
        data-operation-id=${e.discard.operation?.operation_id||""}
        ?disabled=${!e.discard.enabled}
        title=${e.discard.title}
        aria-label=${e.discard.label}
      >
        ${e.discard.label}
      </button>`:"";return l`<div
    class="rtile${L?" rtile--sel":""}${a?" rtile--paused":""}${o?" rtile--failed":""}${s?" rtile--session":""}"
    data-bead-id=${e.bead_id}
    data-attempt-id=${e.attempt_id||""}
  >
    <div class="rtile__hd">
      <span
        class="rtile__dot${s?" rtile__dot--session":""}"
        aria-hidden="true"
      ></span>
      <span class="rtile__id" title="클릭하면 ID 복사">${e.bead_id}</span>
      ${Rn(e.workflow)}${V}${u?l`<span class="rtile__resumed" title=${u}>↻</span>`:""}
      ${s?l`${typeof e.started_at=="number"?l`<span class="rtile__elapsed">${i}</span>`:""}<span
              class="rtile__session-badge"
              title="Worker가 아닌 세션이 in_progress로 잡은 이슈"
              >세션</span
            >`:l`<span class="rtile__elapsed">${i}</span>`}
      ${s?"":o?l`<button
                type="button"
                class="rtile__resume"
                ?disabled=${e.resume_eligible===!1}
                title=${e.resume_eligible===!1?e.resume_reason||"\uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":"\uAC19\uC740 \uC138\uC158\uC73C\uB85C \uC774\uC5B4\uC11C \uC9C4\uD589"}
                aria-label="이어하기"
              >
                ↻ 이어하기
              </button>
              ${U}
              <button
                type="button"
                class="rtile__dismiss"
                title="실패 알림 닫기 — 레인에는 남습니다"
                aria-label="실패 기록 닫기"
              >
                ✕
              </button>`:l`<button
                type="button"
                class="rtile__session"
                title="라이브 세션 열기"
                aria-label="라이브 세션 열기"
              >
                ▤ 세션
              </button>
              ${a?l`<button
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
              ${U}`}
    </div>
    <div class="rtile__title">${e.title}</div>
    ${H}${e.rollup?zs(e.rollup,{parent_id:e.bead_id,expanded:e.rollup_expanded===!0,childChips:aa}):""}
    ${$?l`<div class="rtile__landing">
          <span
            class="merge-step${$.failed?" merge-step--failed":""}"
            style=${`--progress: ${$.percent}%`}
            >${$.label}${$.index>0?l`<span class="merge-step__n"
                  >${$.index}/${$.total}</span
                >`:""}</span
          >
        </div>`:""}
    ${s?D:c||d.length>0||p||_||h?l`<div class="rtile__meta">
            ${_?l`<span class="worker-mini__badge">${_}</span>`:""}
            ${h?l`<span
                  class="worker-mini__badge"
                  title="이 세션의 target base가 워크스페이스 선언 base와 다릅니다"
                  >${h}</span
                >`:""}
            ${So(e.exec_chips)}
            ${d.length>0?d.map(b=>l`<span class="worker-usage" title=${b.tooltip}
                      >${b.label}</span
                    >`):p?l`<span
                    class="worker-usage"
                    title=${Vn(e.usage)}
                    >${p}</span
                  >`:""}
          </div>`:""}
    ${O} ${us(e)}
    <!-- 살아있음만 말하는 비의미적 액센트 (UI-58y2 데스크톱 §실행 타일).
         quick_fix landing의 실제 진행은 위의 별도 진행 줄이 소유한다.
         일시정지된 타일은 살아있지 않으므로 액센트도 없다. -->
    ${o||a?"":l`<div class="rtile__accent" aria-hidden="true"></div>`}
  </div>`}function Qa(e,t=Date.now(),r=null){let n=Array.isArray(e)?e:[];return l`<div class="worker-rungrid" id="worker-rungrid">
    ${n.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:n.map(s=>Za(s,t,r))}
  </div>`}var Xa=new Set(["unavailable","not_applicable"]);function Fr(e,t){if(typeof e!="object"||e===null)return null;let r=e[t];return typeof r=="object"&&r!==null?r:null}function Au(e){return e.filter(t=>t!==null).join(" \xB7 ")}function jr(e,t){return t===null?null:`${qr[e]}: ${t.display} (${bo[t.source]})`}function Ja(e){return e.filter(t=>t!==null).join(`
`)}function Co(e){if(typeof e!="object"||e===null)return null;let t=en(e);if(t==="")return null;let r=(n,s)=>typeof s=="string"&&s.length>0?`${n}: ${s}`:null;return{text:t,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uC774 attempt\uC5D0 \uAE30\uB85D\uB41C \uC2E4\uD589\uAC12",r("runner",e.runner),r(qr.orchestration_model,e.model),r(qr.orchestration_effort,e.effort),r(qr.orchestration_speed,e.speed)])}}function on(e,t){let r=Fr(e,"orchestration_model");if(r===null||r.resolution==="unavailable")return null;let n=Fr(e,"orchestration_effort"),s=Fr(e,"orchestration_speed"),o=Au([gr(t,r.value??""),r.display,n!==null&&n.value!==null?n.display:null,s!==null&&s.value==="fast"?"Fast":null]);return o===""?null:{text:o,title:Ja(["\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uD050 \uAE30\uBCF8\uAC12)",jr("orchestration_model",r),jr("orchestration_effort",n),jr("orchestration_speed",s)])}}function ug(e,t){return e===null||e.value===null||Xa.has(e.resolution)?null:e.value!=="inherit"?e.value:t?`inherit\u2192${t}`:"inherit"}function dg(e){return e===null||Xa.has(e.resolution)?null:e.value==="auto"?"auto":e.display}function pg(e){return e===null?null:e.value==="auto"?"auto":Xa.has(e.resolution)?null:e.display}function Br(e,t){if(typeof e!="object"||e===null)return null;let r=Fr(e,"impl_dispatch"),n=Fr(e,"impl_runtime"),s=Fr(e,"impl_model"),o=Fr(e,"impl_effort"),a=Fr(e,"impl_speed"),i=r!==null&&r.value==="main"?"\uBA54\uC778":Au([ug(n,t??null),dg(s),pg(o),a!==null&&a.value==="fast"?"Fast":null]);return i===""?null:{text:i,title:Ja(["\uC6CC\uCEE4(\uAD6C\uD604 \uC704\uC784) \u2014 \uD604\uC7AC \uD574\uC11D\uAC12 (\uD540 > \uC804\uC5ED kv > \uAE30\uBCF8). \uC2E4\uD589 \uC911\uC774\uBA74 \uC138\uC158\uC774 \uC2DC\uC791 \uC2DC \uACE0\uC815\uD55C \uAC12\uACFC \uB2E4\uB97C \uC218 \uC788\uC74C",jr("impl_dispatch",r),jr("impl_runtime",n),jr("impl_model",s),jr("impl_effort",o),jr("impl_speed",a)])}}var Xt="",fg=["impl_runtime","impl_model","impl_effort"],_g=5,Ro=1;function Ir(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Io(e,t){let r=t.transport,n=typeof t.root_dir=="string"&&t.root_dir.length>0?t.root_dir:null,s=t.notify||(R=>me(R,"error",4e3)),o={},a={},i=[],c=!1,u=null,d={},p="",_="",h=!1,$=!1,L=!1,j=null,V=!1;function H(){let R=t.queue?t.queue():null;return Ir(R)?R:null}function P(){let R=H();return R?R.runner_catalog:null}function D(){let R=H();return R&&Ir(R.execution_defaults)?R.execution_defaults:null}function O(){let R=t.implPresetStore?.get();return Ir(R)&&Array.isArray(R.presets)?R:null}function U(){return n===null?{}:{root_dir:n}}async function b(R,J){return V||!r?null:await r(R,J)}function B(R){R&&Ir(R.queue)&&t.onQueueAdopt?.(R.queue)}async function ee(R,J){let ie=H();if(!ie||V)return null;let te=await b(R,{...J,...U(),expected_revision:ie.revision});if(B(te),n!==null&&te&&te.conflict){let qe=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:H()?.revision??ie.revision;te=await b(R,{...J,...U(),expected_revision:qe}),B(te)}return te}async function Ae(){c=!0,pe();try{let R=await b("get-session-defaults",{...U()});o=Ir(R?.values)?{...R.values}:{},a={...o},i=Array.isArray(R?.warnings)?R.warnings:[]}catch(R){i=["kv_read_failed"],s(`\uC138\uC158 \uAE30\uBCF8\uAC12\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4: ${R instanceof Error?R.message:String(R)}`)}finally{c=!1,pe()}}async function Z(){let R=Gc(o,a);if(Object.keys(R).length!==0){try{let J=await b("set-session-defaults",{values:R,...U()});o=Ir(J?.values)?{...J.values}:{},a={...o},i=Array.isArray(J?.warnings)?J.warnings:[]}catch(J){s(`\uC138\uC158 \uAE30\uBCF8\uAC12 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}pe()}}function le(R,J){if(fg.includes(R)){Le(R,J);return}J===Xt?delete a[R]:a[R]=J,pe(),Z()}function ge(){let R=Qe().orchestration_model,J=Qt({global:{orchestration_model:R??void 0},execution_defaults:D(),runner_catalog:P()}).orchestration_model.value;return J?gr(P(),J):null}function Te(R,J){typeof J=="string"&&J.length>0?a[R]=J:delete a[R]}function Le(R,J){let ie=J===Xt?void 0:J,te=zc({impl_runtime:R==="impl_runtime"?ie:a.impl_runtime,impl_model:R==="impl_model"?ie:a.impl_model,impl_effort:R==="impl_effort"?ie:a.impl_effort},P(),ge());Te("impl_runtime",te.impl_runtime),Te("impl_model",te.impl_model),Te("impl_effort",te.impl_effort),pe(),Z()}async function se(){let R=H();if(!R)return;let J={orchestration_model:R.orchestration_model??null,orchestration_effort:R.orchestration_effort??null,orchestration_speed:R.orchestration_speed??null},ie=Vc(J,{...J,...d});if(Object.keys(ie).length!==0){try{let te=await ee("worker-queue-set-orchestration-defaults",{values:ie});if(te&&te.applied===!1){s("Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC");return}d={}}catch(te){s(`Worker \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}pe()}}function ae(R,J){d[R]=J===Xt?null:J,pe(),se()}function Me(R){if(u=R,!R){pe();return}let J=P(),ie=Qe(),te=ie.orchestration_model;te&&!ls(J,R).includes(te)&&(d.orchestration_model=null,te=null);let qe=ie.orchestration_effort;qe&&!ja(J,R,te||sr).includes(qe)&&(d.orchestration_effort=null),pe(),se()}async function N(R){if(!(!H()||R<Ro)){try{await ee("worker-queue-set-slots",{slots:R})}catch(J){s(`slots \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}pe()}}async function ne(R){if(!(!H()||R<Ro||R>_g)){try{await ee("worker-queue-set-serial-lane-count",{count:R})}catch(J){s(`\uC9C1\uB82C \uB808\uC778 \uC800\uC7A5 \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}pe()}}async function oe(R,J){let ie=R==="auto_advance"?"worker-automation-toggle":R==="auto_merge"?"worker-merge-auto-toggle":"worker-auto-repair-toggle";try{await ee(ie,{on:J})}catch(te){s(`\uC790\uB3D9\uD654 \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}pe()}function ke(){let R={},J=Qe();for(let ie of _o){let te=Rr.includes(ie)?J[ie]:a[ie];typeof te=="string"&&te.length>0&&(R[ie]=te)}return R}async function Ce(){let R=O();if(!R)return;let J=ke();if(Object.keys(J).length===0){s("\uC800\uC7A5\uD560 \uC2E4\uD589 \uC124\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uBA3C\uC800 \uC2E4\uD589 \uAC12\uC744 \uC120\uD0DD\uD558\uC138\uC694");return}let ie=(R.presets||[]).find(qe=>qe.id===p),te=_.trim()||(ie?ie.name:"");if(!te){s("\uD504\uB9AC\uC14B \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694");return}try{let qe=ie?await b("impl-preset-update",{expected_revision:R.revision,id:ie.id,name:te,settings:J}):await b("impl-preset-create",{expected_revision:R.revision,name:te,settings:J});if(qe&&qe.applied){if(_="",!ie&&Array.isArray(qe.presets)){let at=qe.presets.find(it=>it.name===te);p=at?at.id:p}pe()}else s("\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),pe()}catch(qe){s(`\uD504\uB9AC\uC14B \uC800\uC7A5 \uC2E4\uD328: ${qe instanceof Error?qe.message:String(qe)}`)}}async function Ne(){let R=O();if(!(!R||p.length===0))try{let J=await b("impl-preset-delete",{expected_revision:R.revision,id:p});J&&J.applied?(p="",pe()):(s("\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: \uB2E4\uB978 \uACF3\uC5D0\uC11C \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4"),pe())}catch(J){s(`\uD504\uB9AC\uC14B \uC0AD\uC81C \uC2E4\uD328: ${J instanceof Error?J.message:String(J)}`)}}function x(R){o=Ir(R.values)?{...R.values}:{},a={...o},i=Array.isArray(R.warnings)?R.warnings:[],Ir(R.queue)&&(t.onQueueAdopt?.(R.queue),d={})}async function fe(){let R=O(),J=H();if(!R||!J||p.length===0)return;let ie=te=>({preset_id:p,expected_revision:R.revision,expected_queue_revision:te,...U()});try{let te=await b("apply-impl-preset-global",ie(J.revision));if(te&&te.applied&&x(te),n!==null&&te&&te.queue_applied===!1){let qe=te.queue&&typeof te.queue.revision=="number"?te.queue.revision:H()?.revision??J.revision;te=await b("apply-impl-preset-global",ie(qe)),te&&te.applied&&x(te)}te&&te.applied?te.queue_applied===!1&&s("\uC624\uCF00\uC2A4\uD2B8\uB808\uC774\uC158 \uAC12\uC740 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694"):te&&te.conflict&&s("\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: \uD504\uB9AC\uC14B\uC774 \uBC29\uAE08 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4")}catch(te){s(`\uC2E4\uD589 \uD504\uB9AC\uC14B \uC801\uC6A9 \uC2E4\uD328: ${te instanceof Error?te.message:String(te)}`)}pe()}async function De(){$=!0,L=!1,pe();try{let R=await b("get-worker-system-prompt",{});!R||typeof R!="object"||Array.isArray(R)?L=!0:j=R}catch{L=!0}finally{$=!1,pe()}}function ve(){if(h=!h,h&&!j){De();return}pe()}function ze(){let R=An({loading:$,error:L});if(R)return R;if(!j)return"";let J=Array.isArray(j.variants)?j.variants:[];return l`<div class="settings-dialog__sp-body">
      ${j.target_base_placeholder?l`<div class="prompt-block__meta">
            \`${j.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`:""}
      ${J.map(ie=>l`<div class="settings-dialog__sp-variant" data-variant=${ie.key}>
            <div class="settings-dialog__sp-cond">${ie.condition}</div>
            ${Cr(ie.label,ie.system_prompt)}
          </div>`)}
    </div>`}function We(){return l`<section
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
        aria-expanded=${h?"true":"false"}
        @click=${ve}
      >
        ${h?"\uC811\uAE30":"\uC804\uBB38 \uBCF4\uAE30"}
      </button>
      ${h?ze():""}
    </section>`}function Ve(R,J,ie,te,qe,at,it){let Xe=qe[R]??Xt,mt=Ba(R,ie,qe,D(),P(),it),ht=mt.options.find(pt=>pt.value===Xe),bt=Xe===Xt?mt.full_value:ht?.full_value;return l`<select
        class=${Xe===Xt?"settings-dialog__unset":""}
        data-key=${R}
        aria-label=${J}
        title=${bt||""}
        ?disabled=${at===!0||mt.disabled}
        .value=${nn(String(Xe))}
        @change=${pt=>te(R,String(pt.target.value))}
      >
        <option value=${Xt} ?selected=${Xe===Xt}>
          ${mt.unset_label}
        </option>
        ${mt.options.map(pt=>l`<option
              value=${pt.value}
              title=${pt.full_value||""}
              ?selected=${pt.value===Xe}
            >
              ${pt.label}
            </option>`)}
      </select>
      ${Xe===Xt?l`<span class="settings-dialog__source-badge">기본</span>`:""}`}function Je(R,J,ie,te,qe,at=!1,it){return l`<div
      class=${`settings-dialog__row${at?" settings-dialog__row--off":""}`}
    >
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        ${Ve(R,J,ie,te,qe,at,it)}
      </span>
    </div>`}function ot(R,J,ie,te,qe){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${J}-on)`}
        ></i>
        ${R}
      </span>
      <span class="settings-dialog__controls">
        ${Ve(ie,`${R} \uBAA8\uB378`,te,le,a,!1)}
        ${Ve(qe,`${R} effort`,ho,le,a,!1)}
      </span>
    </div>`}function K(R,J,ie,te){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${te?" is-on":""}`}
          data-automation=${R}
          aria-pressed=${te?"true":"false"}
          aria-label=${J}
          @click=${()=>oe(R,!te)}
        >
          ${te?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}
        </button>
        <span class="settings-dialog__hint">${ie}</span>
      </span>
    </div>`}function Q(R,J,ie,te){return l`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${J}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${R}>
          <button
            type="button"
            aria-label=${`${J} \uAC10\uC18C`}
            @click=${()=>te(ie-1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${ie}</span>
          <button
            type="button"
            aria-label=${`${J} \uC99D\uAC00`}
            @click=${()=>te(ie+1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`}function Se(R){return l`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${R.rows.length>0?`\uBCC0\uACBD ${R.rows.length}\uAC1C \xB7 \uC801\uC6A9\uD558\uBA74 \uC544\uB798\uC640 \uAC19\uC774 \uBC14\uB01D\uB2C8\uB2E4`:"\uD604\uC7AC \uC124\uC815\uACFC \uAC19\uC2B5\uB2C8\uB2E4 \u2014 \uC801\uC6A9\uD560 \uBCC0\uACBD\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"}
      </div>
      ${R.rows.map(J=>l`<div
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
      ${R.ignored_keys.length>0?l`<div class="settings-dialog__preset-diff-note">
            ${R.ignored_keys.join(", ")}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`:""}
    </div>`}function Qe(){let R=H(),J={};for(let ie of Rr)J[ie]=Object.prototype.hasOwnProperty.call(d,ie)?d[ie]:R&&typeof R[ie]=="string"?R[ie]:null;return J}function Ge(){let R=P(),J=a.impl_runtime,ie=a.impl_model,te=O(),qe=H(),at=Qe(),it=ls(R,u),Xe=En(R,void 0).filter(Pe=>Pe!==sr),mt=ja(R,u,at.orchestration_model||sr).filter(Pe=>Pe!==sr),ht=p?(te?.presets||[]).find(Pe=>Pe.id===p):null,bt=ht?Hc(ke(),Ir(ht.settings)?ht.settings:{}):null,pt=qe&&typeof qe.slots=="number"?qe.slots:Ro+1,wt=qe&&typeof qe.serial_lane_count=="number"?qe.serial_lane_count:Ro,He=D()?.supported===!0,et=Ba("workflow_mode",as,a,D(),R);return l`
      ${i.length>0?l`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${i.join(", ")}
          </div>`:""}
      ${He?"":l`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`}
      ${c?l`<div class="settings-dialog__empty">불러오는 중…</div>`:l`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${nn(p)}
                @change=${Pe=>{p=String(Pe.target.value),pe()}}
              >
                <option value="" ?selected=${p===""}>
                  실행 프리셋…
                </option>
                ${(te?.presets||[]).map(Pe=>l`<option
                      value=${Pe.id}
                      ?selected=${Pe.id===p}
                    >
                      ${Pe.name}
                    </option>`)}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!bt||bt.rows.length===0}
                @click=${fe}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${p?"\uC774\uB984 (\uBE44\uC6B0\uBA74 \uC720\uC9C0)":"\uC0C8 \uD504\uB9AC\uC14B \uC774\uB984"}
                aria-label="프리셋 이름"
                .value=${nn(_)}
                @input=${Pe=>{_=String(Pe.target.value)}}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${p?"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC774 \uD504\uB9AC\uC14B\uC5D0 \uC800\uC7A5\uD569\uB2C8\uB2E4 (\uD504\uB9AC\uC14B \u2192 \uC124\uC815 \uBC29\uD5A5\uC774 \uC544\uB2D8)":"\uD604\uC7AC \uD654\uBA74\uC758 \uC2E4\uD589 \uC124\uC815\uC744 \uC0C8 \uD504\uB9AC\uC14B\uC73C\uB85C \uC800\uC7A5\uD569\uB2C8\uB2E4"}
                @click=${Ce}
              >
                ${p?"\uD604\uC7AC \uC124\uC815\uC73C\uB85C \uB36E\uC5B4\uC4F0\uAE30":"\uC0C8 \uD504\uB9AC\uC14B \uC800\uC7A5"}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${p.length===0}
                @click=${Ne}
              >
                삭제
              </button>
            </div>
            ${bt?Se(bt):""}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${nn(u||Xt)}
                    @change=${Pe=>{let ct=String(Pe.target.value);Me(ct===Xt?null:ct)}}
                  >
                    <option value=${Xt} ?selected=${!u}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${u==="claude"}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${u==="codex"}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${Je("orchestration_model","\uBAA8\uB378",it,ae,at)}
              ${Je("orchestration_effort","effort",mt,ae,at)}
              ${Je("orchestration_speed","\uC18D\uB3C4",os,ae,at)}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${Xt}
                      aria-pressed=${String(!a.workflow_mode)}
                      @click=${()=>le("workflow_mode",Xt)}
                    >
                      ${et.unset_label}
                    </button>
                    ${a.workflow_mode?"":l`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`}
                    ${as.map(Pe=>l`<button
                          type="button"
                          data-mode=${Pe}
                          aria-pressed=${String(a.workflow_mode===Pe)}
                          @click=${()=>le("workflow_mode",Pe)}
                        >
                          ${Pe}
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
              ${ot("\uC0AC\uC591 \uB9AC\uBDF0","spec","spec_review_model",is,"spec_review_effort")}
              ${ot("\uACC4\uD68D \uB9AC\uBDF0","plan","plan_review_model",go,"plan_review_effort")}
              ${ot("\uAD6C\uD604 \uB9AC\uBDF0","impl","impl_review_model",is,"impl_review_effort")}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${Je("impl_runtime","\uC704\uC784 \uB300\uC0C1",mo,le,a)}
              ${Je("impl_model","\uBAA8\uB378",En(R,J),le,a)}
              ${Je("impl_effort","effort",Tn(R,J,ie),le,a)}
              ${Je("impl_speed","\uC18D\uB3C4",os,le,a)}
              ${Je("quick_fix_impl_model","quick_fix \uAD6C\uD604 \uBAA8\uB378",Xe,le,a,!1,{...a,...at})}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${K("auto_advance","\uC790\uB3D9\uD654","\uC2AC\uB86F\uC774 \uBE44\uBA74 \uB300\uAE30 \uC55E \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4",qe?.auto_advance===!0)}
              ${K("auto_merge","\uBA38\uC9C0","\uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4",qe?.auto_merge===!0)}
              ${K("auto_repair","\uC790\uB3D9 \uD574\uACB0","\uC2E4\uD328\uD55C \uC800\uC7A5\uC18C \uC791\uC5C5\uC744 \uC138\uC158\uC774 \uC790\uB3D9\uC73C\uB85C \uBCF5\uAD6C\uD569\uB2C8\uB2E4",qe?.auto_repair===!0)}
              ${Q("slots","\uB3D9\uC2DC \uC2E4\uD589",pt,Pe=>N(Pe))}
              ${Q("serial-lane-count","\uC9C1\uB82C \uB808\uC778",wt,Pe=>ne(Pe))}
            </div>
            ${We()}
          `}
    `}function pe(){V||Ye(Ge(),e)}return{load(){return d={},Ae()},render:pe,sessionDraft:()=>({...a}),destroy(){V=!0,Ye(l``,e)}}}function fs(e){return l`<svg
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
  </svg>`}function Su(){return fs(fn`<path d="M5.5 3.6 12 8l-6.5 4.4z" />`)}function Eu(){return fs(fn`<path d="M6 3.8v8.4M10 3.8v8.4" />`)}function Tu(){return fs(fn`<path
      d="M4.6 5.6v4.8M4.6 8.2h2.2A3.2 3.2 0 0 0 10 5"
    />
    <circle cx="4.6" cy="4" r="1.5" />
    <circle cx="4.6" cy="12" r="1.5" />
    <circle cx="11.4" cy="4" r="1.5" />`)}function Cu(){return fs(fn`<rect x="2.6" y="2.6" width="7.4" height="7.4" rx="1.2" />
    <path d="M6 13.4h6a1.4 1.4 0 0 0 1.4-1.4V6" />`)}function Ru(){return fs(fn`<circle cx="8" cy="8" r="2.1" />
    <path
      d="M8 1.9v1.8M8 12.3v1.8M1.9 8h1.8M12.3 8h1.8M3.7 3.7l1.3 1.3M11 11l1.3 1.3M12.3 3.7 11 5M5 11l-1.3 1.3"
    />`)}function Iu(e){return`${e} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}function Ou(e){let t=(Array.isArray(e)?e:[]).map(i=>i&&i.usage).filter(i=>i&&typeof i=="object"&&"providers"in i);if(t.length>0)return Wt(Zs(t));let r={};for(let i of xr)r[i]=0;let n=!1,s=0,o=0,a=0;for(let i of Array.isArray(e)?e:[]){let c=i&&i.usage;if(c&&typeof c=="object"){let u=!1;for(let d of xr){let p=c[d];typeof p=="number"&&Number.isFinite(p)&&(r[d]+=p,n=!0,u=!0)}if(u){o+=1;let d=c.total_cost_usd;typeof d=="number"&&Number.isFinite(d)&&(s+=d,a+=1)}}}return o>0&&a===o&&(r.total_cost_usd=s),n?Ar(r):null}function hr(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function In(e,t){let r=hr(e?.counts)?e.counts:null,n=r?r[t]:null;return typeof n=="number"&&Number.isFinite(n)?n:0}function mg(e,t){if(!hr(t))return e;let r={...e};for(let[n,s]of Object.entries(t))s!==void 0&&(r[n]=s);return r}function gg(e){if(!hr(e)||!hr(e.execution_defaults)||!hr(e.runner_catalog)||!hr(e.session_defaults))return null;let t={...e.session_defaults};for(let a of["orchestration_model","orchestration_effort","orchestration_speed"])typeof e[a]=="string"&&e[a].length>0&&(t[a]=e[a]);let r=Qt({global:t,execution_defaults:e.execution_defaults,runner_catalog:e.runner_catalog}),n=gr(e.runner_catalog,r.orchestration_model.value??""),s=on(r,e.runner_catalog),o=Br(r,n);return s===null&&o===null?null:{orchestration:s,worker:o}}function Lu(e,t){let r=t.notify||(N=>me(N,"error",4e3)),n=document.createElement("div");n.className="mon2-deck__main",e.appendChild(n);let s=document.createElement("div");s.className="mon2-deck__panel",s.hidden=!0;let o=document.createElement("div");o.className="mon2-deck__panel-hd";let a=document.createElement("span");a.className="mon2-deck__panel-title";let i=document.createElement("button");i.type="button",i.className="mon2-deck__panel-close",i.setAttribute("aria-label","\uC2E4\uD589 \uC124\uC815 \uB2EB\uAE30"),i.textContent="\u2715",o.append(a,i);let c=document.createElement("div");c.className="mon2-deck__panel-body",s.append(o,c),e.appendChild(s);let u=null,d=null,p=null,_=new Map;function h(){let N=t.workspacesState?t.workspacesState():[];return Array.isArray(N)?N.filter(ne=>hr(ne)):[]}function $(N){return h().find(ne=>ne.root_dir===N)||null}function L(N){return mg($(N),_.get(N))}function j(){for(let N of h()){let ne=_.get(N.root_dir);ne&&typeof ne.revision=="number"&&typeof N.revision=="number"&&N.revision>=ne.revision&&_.delete(N.root_dir)}}async function V(N,ne,oe){let ke=t.transport,Ce=L(ne);if(!(!ke||!hr(Ce))){try{let Ne=await ke(N,{...oe,root_dir:ne,expected_revision:Ce.revision});if(hr(Ne?.queue)&&_.set(ne,Ne.queue),Ne&&Ne.conflict){let x=hr(Ne.queue)&&typeof Ne.queue.revision=="number"?Ne.queue.revision:L(ne)?.revision;Ne=await ke(N,{...oe,root_dir:ne,expected_revision:x}),hr(Ne?.queue)&&_.set(ne,Ne.queue)}}catch(Ne){r(`\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: ${Ne instanceof Error?Ne.message:String(Ne)}`)}se()}}function H(N){u!==N&&(u=N,t.onFocusChange?.(u),se())}function P(N){H(u===N?null:N)}function D(N){if(d===N){U();return}O(),d=N;let ne=$(N);a.textContent=`${ne?.name||N} \uC2E4\uD589 \uC124\uC815 \xB7 Worker \uD0ED \u2699 \uC2E4\uD589 \uD0ED\uACFC \uAC19\uC740 \uC800\uC7A5\uC18C`,s.hidden=!1,p=Io(c,{root_dir:N,queue:()=>L(N),transport:t.transport,implPresetStore:t.implPresetStore,notify:r,onQueueAdopt:oe=>{_.set(N,oe),se()}}),p.load(),se()}function O(){p?.destroy(),p=null}function U(N){O(),d=null,s.hidden=!0,a.textContent="",N!==!0&&se()}let b=()=>U();i.addEventListener("click",b);function B(N){N.key==="Escape"&&u!==null&&H(null)}document.addEventListener("keydown",B);function ee(N,ne){let oe=Math.max(ne,N,1);return l`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`\uC2AC\uB86F ${ne}\uAC1C \uC911 ${N}\uAC1C \uC2E4\uD589 \uC911`}
    >
      ${Array.from({length:oe},(ke,Ce)=>Ce<N?l`<i class="mon2-deck__slot is-run"></i>`:l`<i class="mon2-deck__slot"></i>`)}
    </span>`}function Ae(N){let ne=N.auto_advance===!0,oe=N.auto_merge===!0;return l`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${ne?" is-on":""}`}
        data-act="auto"
        aria-pressed=${ne?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9\uD654`}
        title=${ne?"\uC790\uB3D9\uD654 \uCF1C\uC9D0 \u2014 \uC2AC\uB86F\uC774 \uBE44\uBA74 \uB2E4\uC74C \uD589\uC774 \uCD9C\uBC1C\uD569\uB2C8\uB2E4":"\uC790\uB3D9\uD654 \uAEBC\uC9D0 \u2014 \uB2E4\uC74C \uD589\uC740 \uC218\uB3D9\uC73C\uB85C\uB9CC \uCD9C\uBC1C\uD569\uB2C8\uB2E4"}
      >
        ${ne?Eu():Su()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${oe?" is-on":""}`}
        data-act="merge"
        aria-pressed=${oe?"true":"false"}
        aria-label=${`${N.name} \uC790\uB3D9 \uBA38\uC9C0`}
        title=${oe?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0"}
      >
        ${Tu()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${d===N.root_dir?" is-on":""}`}
        data-act="gear"
        aria-expanded=${d===N.root_dir?"true":"false"}
        aria-label=${`${N.name} \uC2E4\uD589 \uC124\uC815`}
        title="이 레포의 실행 설정"
      >
        ${Ru()}
      </button>`}function Z(N){let ne=gg(N);return ne?l`<div class="mon2-deck__chips">
      ${ne.orchestration?l`<span class="mon2-deck__chip" title=${ne.orchestration.title}
            >오케 ${ne.orchestration.text}</span
          >`:""}
      ${ne.worker?l`<span class="mon2-deck__chip" title=${ne.worker.title}
            >워커 ${ne.worker.text}</span
          >`:""}
    </div>`:""}function le(N){let ne=In(N,"running"),oe=typeof N.slots=="number"?N.slots:1;return l`<div
      class=${`mon2-deck__tile${u===N.root_dir?" is-focus":""}`}
      role="button"
      tabindex="0"
      data-root-dir=${N.root_dir}
      aria-pressed=${u===N.root_dir?"true":"false"}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${N.root_dir}>${N.name}</span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          title="이 레포의 Worker 탭으로 이동"
        >
          Worker ↗
        </button>
      </div>
      <div class="mon2-deck__slots">
        ${Cu()} ${ee(ne,oe)}
        <span class="mon2-deck__counts"
          >${ne}/${oe} 실행 · 대기 ${In(N,"queue")} · PR
          ${In(N,"pr_wait")}${In(N,"session_active")>0?` \xB7 \uC138\uC158 ${In(N,"session_active")}`:""}</span
        >
      </div>
      <div class="mon2-deck__ops">${Ae(N)}</div>
      ${Z(N)}
    </div>`}function ge(N){let ne=t.doneItems?t.doneItems():[],oe=t.rangeLabel?t.rangeLabel():"",ke=Ou(Array.isArray(ne)?ne:[]),Ce=Ne=>N.reduce((x,fe)=>x+In(fe,Ne),0);return l`<div
      class="mon2-deck__total"
      title=${`visible \uB808\uD3EC ${N.length}\uACF3\uC758 \uD569\uACC4\uC785\uB2C8\uB2E4 \u2014 \uC2E4\uD589\xB7\uB300\uAE30\xB7PR\uC740 \uC9C0\uAE08, \uC644\uB8CC\uB294 ${oe}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${Ce("running")} · 대기 ${Ce("queue")} · PR
        ${Ce("pr_wait")}${Ce("session_active")>0?` \xB7 \uC138\uC158 ${Ce("session_active")}`:""}
        · ${oe} 완료
        ${Array.isArray(ne)?ne.length:0}
      </div>
      ${ke===null?"":l`<div class="mon2-deck__total-tokens">
            ${typeof ke=="string"?l`<span
                  class="mon2-deck__tok"
                  title=${Iu(oe)}
                  >τ ${ke}</span
                >`:ke.map(Ne=>l`<span
                      class="mon2-deck__tok"
                      data-provider=${Ne.provider}
                      title=${Ne.tooltip}
                      >τ ${Ne.label}</span
                    >`)}
          </div>`}
    </div>`}function Te(){let N=h();return N.length===0?"":l`<div class="mon2-deck__row">
      ${ge(N)}
      <div class="mon2-deck__strip">
        ${N.map(ne=>le(ne))}
      </div>
    </div>`}function Le(){u!==null&&!$(u)&&(u=null,t.onFocusChange?.(null))}function se(){j(),Le(),d!==null&&!$(d)&&U(!0),Ye(Te(),n),p?.render()}function ae(N){let ne=N.target;if(!ne||typeof ne.closest!="function")return;let oe=ne.closest("[data-root-dir]");if(!oe)return;let ke=oe.getAttribute("data-root-dir")||"",Ce=ne.closest("[data-act]")?.getAttribute("data-act");if(Ce==="worker"){t.gotoWorkerTab?.(ke);return}if(Ce==="auto"){V("worker-automation-toggle",ke,{on:L(ke)?.auto_advance!==!0});return}if(Ce==="merge"){V("worker-merge-auto-toggle",ke,{on:L(ke)?.auto_merge!==!0});return}if(Ce==="gear"){D(ke);return}P(ke)}function Me(N){if(N.key!=="Enter"&&N.key!==" ")return;let ne=N.target;if(!ne||typeof ne.closest!="function")return;let oe=ne.closest('[data-root-dir][role="button"]');!oe||oe!==ne||(N.preventDefault(),P(oe.getAttribute("data-root-dir")||""))}return n.addEventListener("click",ae),n.addEventListener("keydown",Me),{render:se,focusRoot:()=>u,panelRoot:()=>d,destroy(){document.removeEventListener("keydown",B),n.removeEventListener("click",ae),n.removeEventListener("keydown",Me),i.removeEventListener("click",b),O(),Ye(l``,n),e.replaceChildren()}}}var hg="\uB2E4\uB978 \uB808\uD3EC \uC774\uC288\uB294 \uC774 \uC9C1\uB82C \uB808\uC778\uC5D0 \uB123\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",bg="Worker \uD0ED \uC9C1\uB82C \uB808\uC778\uC5D0\uC11C \uBA3C\uC800 \uBE7C \uC8FC\uC138\uC694";function ei(e,t){return`${e}\0${t}`}function yg(e){return`${e}\uC758 \uB808\uD3EC\uB97C \uC54C \uC218 \uC5C6\uC5B4 \uC758\uC874\uC744 \uBC14\uAFC0 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`}function vg(e){let t=new Map;for(let[r,n]of e)t.set(r,n.slice());return t}function wg(e,t,r){let n=new Set([t]),s=[t];for(;s.length>0;){let o=s.pop();for(let a of e.get(o)||[]){if(a===r)return!0;n.has(a)||(n.add(a),s.push(a))}}return!1}function kg(e,t){let r=new Set(t),n=new Map,s=new Map;for(let i of r){let c=Array.from(new Set((e.get(i)||[]).filter(u=>u!==i&&r.has(u))));n.set(i,c.length);for(let u of c){let d=s.get(u);d?d.push(i):s.set(u,[i])}}let o=[],a=Array.from(r).filter(i=>n.get(i)===0).sort();for(;a.length>0;){let i=a.shift();o.push(i);for(let c of(s.get(i)||[]).slice().sort()){let u=(n.get(c)||0)-1;n.set(c,u),u===0&&a.push(c)}}for(let i of t)o.includes(i)||o.push(i);return o}function $g(e,t){let r=new Set;for(let[a,i]of t)for(let c of i)r.add(ei(a,c));let n=new Map,s=new Map;for(let a of e){let i=ei(a.a,a.b);n.set(i,a),s.set(i,a.type==="dep-add")}let o=[];for(let a of e){let i=ei(a.a,a.b);n.get(i)===a&&s.get(i)!==r.has(i)&&o.push(a)}return o}function xg(e,t,r){let n=e.parallel_rows,s=Math.max(0,Math.min(n.length,r)),o=n[s];if(o&&o.root_dir===t)return o.queue_index;for(let a=s-1;a>=0;a--)if(n[a].root_dir===t)return n[a].queue_index+1;for(let a=s;a<n.length;a++)if(n[a].root_dir===t)return n[a].queue_index;return e.parallel_raw_length.get(t)??0}function Ag(e,t){return e.parallel_rows.some(r=>r.root_dir===t)}function ti(e,t,r,n){return{type:"worker-queue-place",payload:{bead_id:e,...n?{lane:n}:{},index:r},root_dir:t}}function Mu(e,t,r){let n=vg(r.blocked_by_map),s=[],o=null,a=h=>{let $=r.owner_of.get(h);return typeof $!="string"||$.length===0?(o=yg(h),null):$},i=(h,$)=>{if(o!==null||h===$)return;let L=n.get(h)||[];if(!L.includes($))return;let j=a(h);j!==null&&(n.set(h,L.filter(V=>V!==$)),s.push({type:"dep-remove",a:h,b:$,root_dir:j}))},c=(h,$)=>{if(o!==null||h===$)return;let L=n.get(h)||[];if(L.includes($))return;let j=a(h);if(j!==null){if(wg(n,$,h)){o=`\uC758\uC874 \uC0AC\uC774\uD074\uC774 \uC0DD\uAE41\uB2C8\uB2E4 \u2014 ${h}\uAC00 \uC774\uBBF8 ${$}\uB97C \uB9C9\uACE0 \uC788\uC2B5\uB2C8\uB2E4`;return}n.set(h,[...L,$]),s.push({type:"dep-add",a:h,b:$,root_dir:j})}},u=()=>{let h=r.lane_order.get(e.lane_id||"")||[],$=new Set(h),L=(n.get(e.bead_id)||[]).filter(V=>$.has(V)),j=h.filter(V=>(n.get(V)||[]).includes(e.bead_id));for(let V of L)i(e.bead_id,V);for(let V of j)i(V,e.bead_id);for(let V of L)for(let H of j)c(H,V);return h.filter(V=>V!==e.bead_id)},d=(h,$)=>{let L=r.lane_order.get(h)||[],j=L.indexOf(e.bead_id),V=kg(n,L.filter(O=>O!==e.bead_id)),H=h.startsWith("pending:")?V.length:Math.max(0,Math.min(V.length,j>=0&&$>j?$-1:$)),P=H>0?V[H-1]:null,D=H<V.length?V[H]:null;if(P===null){D!==null&&c(D,e.bead_id);return}c(e.bead_id,P),D!==null&&(n.get(D)||[]).includes(P)&&(i(D,P),c(D,e.bead_id))},p=typeof e.queue_index=="number"?e.queue_index:r.queue_index_of.get(e.bead_id);if(t.kind==="repo-serial"&&e.root_dir!==t.root_dir)return{refused:hg};if(t.kind==="chain"&&e.kind==="repo-serial")return{refused:bg};if(e.kind==="chain"&&u(),t.kind==="chain"&&d(t.lane_id,t.marker_index),o!==null)return{refused:o};let _=[];if(t.kind==="candidate")e.kind!=="candidate"&&_.push({type:"worker-queue-remove",payload:{bead_id:e.bead_id},root_dir:e.root_dir});else if(t.kind==="parallel"){let h=xg(r,e.root_dir,t.marker_index);if(e.kind==="candidate"||e.kind==="repo-serial")_.push(ti(e.bead_id,e.root_dir,h));else if(e.kind==="parallel"){let $=r.parallel_rows,L=$[Math.max(0,Math.min($.length,t.marker_index))];if(!(!!L&&L.bead_id===e.bead_id)&&Ag(r,e.root_dir)&&p!==void 0){let V=p>h?h:h-1;V>=0&&V!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,to_index:V},root_dir:e.root_dir})}}}else if(t.kind==="chain")e.kind==="candidate"&&_.push(ti(e.bead_id,e.root_dir,r.parallel_raw_length.get(e.root_dir)??0));else if(e.kind==="repo-serial"&&e.lane_id===t.lane_id){if(p!==void 0&&t.index!==p){let h=p>t.index?t.index:t.index-1;h>=0&&h!==p&&_.push({type:"worker-queue-reorder",payload:{bead_id:e.bead_id,lane:t.lane_id,to_index:h},root_dir:e.root_dir})}}else _.push(ti(e.bead_id,e.root_dir,t.index,t.lane_id));return{ops:[...$g(s,r.blocked_by_map),..._]}}var Pu={running:3,paused:2,failed:1};function Du(e,t){let r=Object.values(e||{}),n=new Set,s=new Map;for(let a of r)!a||typeof a.bead_id!="string"||(typeof a.resumed_from=="string"&&a.resumed_from.length>0&&n.add(a.resumed_from),s.set(a.bead_id,a.attempt_id));let o=new Map;for(let a of r){if(!a||typeof a.bead_id!="string"||a.bead_id.length===0)continue;let i=null;if(a.status==="running")i="running";else if(a.status==="paused"&&!n.has(a.attempt_id))i="paused";else if(a.status==="failed"||a.status==="orphaned"){let d=t.get(a.bead_id),p=typeof d=="number"&&d>0&&typeof a.finished_at=="number"&&d>=a.finished_at;s.get(a.bead_id)===a.attempt_id&&!p&&typeof a.dismissed_at!="number"&&(i="failed")}if(!i)continue;let c=typeof a.started_at=="number"?a.started_at:null,u=o.get(a.bead_id);if(u){let d=Pu[u.run_state],p=Pu[i];if(d>p||d===p&&(u.started_at??0)>(c??0))continue}o.set(a.bead_id,{attempt:a,run_state:i,started_at:c})}return{winners:o,resumed_from_ids:n}}var Nu=[{step:"merge",label:"\uBA38\uC9C0",index:1},{step:"base",label:"base",index:2},{step:"verify",label:"\uAC80\uC99D",index:3},{step:"deploy",label:"\uBC30\uD3EC",index:4},{step:"child",label:"\uC790\uC2DD",index:5},{step:"branch",label:"\uBE0C\uB79C\uCE58",index:6},{step:"close",label:"close",index:7}],_s=[{step:"base_containment",label:"base \uD3EC\uD568 \uD655\uC778"},{step:"repo_operations",label:"\uC800\uC7A5\uC18C \uC791\uC5C5"},{step:"child_sweep",label:"\uC790\uC2DD \uC815\uB9AC"},{step:"branch_cleanup",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC"},{step:"parent_close",label:"\uBD80\uBAA8 close"}];function Oo(e,t){let r=Nu.find(s=>s.step===e);if(!r)return null;let n=Nu.length;return{step:r.step,label:t,index:r.index,total:n,percent:Math.round(r.index/n*100)}}function qu(e){let t=_s.findIndex(r=>r.step===e);return _s.map((r,n)=>({step:r.step,label:r.label,state:t<0?"todo":n<t?"done":n===t?"stall":"todo"}))}function an(e){let t=_s.find(r=>r.step===e);return t?t.label:typeof e=="string"?e:""}function Sg(e){let t=_s.findIndex(r=>r.step===e);return t<0?null:{index:t+1,total:_s.length}}function Lo(e){let t=Sg(e);return t?`\uBA38\uC9C0 \uC644\uB8CC \xB7 \uC815\uB9AC ${t.total}\uB2E8\uACC4 \uC911 ${t.index}\uB2E8\uACC4\uC5D0\uC11C \uBA48\uCDA4`:"\uBA38\uC9C0\uB428 \xB7 \uC815\uB9AC \uBBF8\uC644"}var ni=new Set(["queued","running","retry_pending","repairing"]),Fu=new Set(["failed","succeeded"]),Eg={queued:"\uB300\uAE30",running:"\uC911",retry_pending:"\uC7AC\uC2DC\uB3C4 \uB300\uAE30",repairing:"\uC790\uB3D9 \uD574\uACB0 \uC911",failed:"\uC2E4\uD328",succeeded:"\uC644\uB8CC \xB7 \uC815\uB9AC \uC7AC\uAC1C \uB300\uAE30"},ms={base_containment:{step:"base",label:"base \uD655\uC778 \uC911"},child_sweep:{step:"child",label:"\uC790\uC2DD \uC815\uB9AC \uC911"},branch_cleanup:{step:"branch",label:"\uBE0C\uB79C\uCE58 \uC815\uB9AC \uC911"},parent_close:{step:"close",label:"\uBD80\uBAA8 close \uC911"}},Tg={merging:{step:"merge",label:"\uBA38\uC9C0 \uC911"},base_containment:ms.base_containment,child_sweep:ms.child_sweep,branch_cleanup:ms.branch_cleanup,parent_close:ms.parent_close};function Cg(e){return typeof e=="string"&&/^[0-9a-f]{40}$/.test(e)}function Rg(e,t,r){return!["verify","deploy"].includes(e.kind)||![...ni,...Fu].includes(e.state)||![null,void 0,""].includes(e.superseded_by)||!Array.isArray(e.subjects)?!1:e.subjects.some(n=>n&&typeof n=="object"&&n.bead_id===t&&n.merged_sha===r)}function Ig(e,t){let r=(t.kind==="deploy"?2:1)-(e.kind==="deploy"?2:1);if(r!==0)return r;let n=u=>u.state==="succeeded"?1:2,s=n(t)-n(e);if(s!==0)return s;let o=typeof e.requested_at=="number"?e.requested_at:0,a=typeof t.requested_at=="number"?t.requested_at:0;if(o!==a)return a-o;let i=typeof e.operation_id=="string"?e.operation_id:"",c=typeof t.operation_id=="string"?t.operation_id:"";return i.localeCompare(c)}function ri(e,t=!1){let r=e.kind,n=r==="verify"?"\uAC80\uC99D":"\uBC30\uD3EC",s=t?"failed":e.state,o=Eg[s];if(!o)return null;let a=Oo(r,`${n} ${o}`);return a?{...a,active:ni.has(s),failed:s==="failed"}:null}function Og(e){return!e||typeof e!="object"?null:Tg[e.step]||null}function gs(e){if(!e||typeof e.bead_id!="string")return null;let t=e.bead_id,r=e.merge_progress&&typeof e.merge_progress=="object"?e.merge_progress:{},n=Og(r),s=e.cleanup_failed&&typeof e.cleanup_failed=="object"?e.cleanup_failed:null,o=["child_sweep","branch_cleanup","parent_close"].includes(typeof e.cleanup_cursor=="string"?e.cleanup_cursor:""),a=!o&&(e.cleanup_cursor==="repo_operations"||r.step==="repo_operations"),i=Cg(e.merge_sha)?e.merge_sha:null,c=!o&&i&&Array.isArray(e.repo_operations)?e.repo_operations.filter($=>$&&typeof $=="object"&&Rg($,t,i)).sort(Ig):[],u=a?c:[],d=u.find($=>ni.has($.state));if(d)return ri(d);if(s)return s.step==="repo_operations"&&c[0]?ri(c[0],!0):null;let p=u.find($=>Fu.has($.state)?$.state!=="succeeded"||e.cleanup_cursor==="repo_operations":!1);if(p)return ri(p);if(n){let $=Oo(n.step,n.label);return $?{...$,active:!0,failed:!1}:null}let _=typeof e.cleanup_cursor=="string"?ms[e.cleanup_cursor]:null;if(!_)return null;let h=Oo(_.step,_.label);return h?{...h,active:!0,failed:!1}:null}function Mo(e){return!!e&&e.step!=="merge"&&e.failed!==!0}function si(e,t){return`${e}\0${t}`}function ju(e){let t=new Map;for(let r of Array.isArray(e?.running)?e.running:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"running",state:"running"});for(let r of Array.isArray(e?.pr_wait)?e.pr_wait:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"pr_wait",state:"pr_wait"});for(let r of Array.isArray(e?.queue_groups)?e.queue_groups:[]){let n=Array.isArray(r.sublanes?.parallel)?r.sublanes.parallel:Array.isArray(r.items)?r.items:[];for(let s of n)t.set(s.id,{root_dir:s.root_dir,workspace_name:s.workspace_name,lane:"parallel",position:s.queue_position});for(let s of Array.isArray(r.sublanes?.serial)?r.sublanes.serial:[])for(let o of s.items)t.set(o.id,{root_dir:o.root_dir,workspace_name:o.workspace_name,lane:s.id,position:o.queue_position})}for(let r of Array.isArray(e?.runnable)?e.runnable:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"runnable",state:"runnable"});for(let r of Array.isArray(e?.done)?e.done:[])t.set(r.id,{root_dir:r.root_dir,workspace_name:r.workspace_name,lane:"done",state:"done"});return t}function oi(e,t){let r=Array.isArray(t)?t:[],n=e.indexOf("-"),s=n>0?e.slice(0,n):e;return r.some(o=>typeof o?.issue_prefix=="string"&&o.issue_prefix===s)?"internal":r.length>0&&r.every(o=>typeof o?.issue_prefix=="string")?"external":"unknown"}function Lg(e,t){return e==="internal"&&t===void 0}function On(e){if(e.state==="running")return"\uC2E4\uD589\uC911";if(e.state==="pr_wait")return"PR \uB300\uAE30";if(e.state==="runnable")return"\uC2E4\uD589\uAC00\uB2A5";if(e.state==="done")return"\uC644\uB8CC";let t=e.lane==="parallel"?"\uBCD1\uB82C":e.lane;return`${e.workspace_name} \xB7 ${t} #${e.position}`}function Bu(e,t,r,n){let s=r.get(e);if(!!(s&&t&&s.root_dir===t.root_dir&&s.lane===t.lane&&typeof s.position=="number"&&typeof t.position=="number"&&s.position<t.position))return{id:e,label:`\u{1F512} ${e} (\uAC19\uC740 \uB808\uC778 \uC55E)`,location_label:"\uAC19\uC740 \uB808\uC778 \uC55E",scope:null,same_lane_ahead:!0,missing_internal:!1};if(s)return{id:e,label:`\u{1F512} ${e} (${On(s)})`,location_label:On(s),scope:null,same_lane_ahead:!1,missing_internal:!1};let a=oi(e,n),i=a==="internal"?"\uBBF8\uC801\uC7AC":a==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778";return{id:e,label:`\u{1F512} ${e} (${i})`,location_label:i,scope:a,same_lane_ahead:!1,missing_internal:Lg(a,s)}}function Uu(e){let t=Array.isArray(e)?e:[],r=new Map,n=new Map,s=new Map;for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=si(i.root_dir,c.id);r.set(u,{root_dir:i.root_dir,workspace_name:i.name,lane:c.id}),s.set(u,[]);for(let d of Array.isArray(c.items)?c.items:[])n.set(d.id,u)}for(let i of t)for(let c of Array.isArray(i.sublanes?.serial)?i.sublanes.serial:[]){let u=si(i.root_dir,c.id),d=Array.isArray(c.items)?c.items[0]:null,_=!!d&&d.queue_index===0&&(!Array.isArray(c.occupied_by)||c.occupied_by.length===0)&&Array.isArray(d.blocked_by)?d.blocked_by:[],h=s.get(u);if(h)for(let $ of _){let L=n.get($);L&&L!==u&&!h.includes(L)&&h.push(L)}}let o=(i,c)=>{let u=new Set,d=[i];for(;d.length>0;){let p=d.pop();if(p===c)return!0;!p||u.has(p)||(u.add(p),d.push(...s.get(p)||[]))}return!1},a=new Map;for(let[i,c]of s){let u=[];for(let d of c){let p=r.get(d);o(d,i)&&p&&u.push(p)}u.length>0&&a.set(i,u)}return a}function Wu(e,t){return si(e,t)}var zu=1,hs=[{value:"repo_spec",label:"\uB808\uD3EC \xB7 spec \uC6B0\uC120"},{value:"repo_updated",label:"\uB808\uD3EC \xB7 \uCD5C\uC2E0 \uC218\uC815"},{value:"updated_flat",label:"\uCD5C\uC2E0 \uC218\uC815(\uB808\uD3EC \uBB34\uC2DC)"}],ii=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Ln={show_blocked:!0,spec:"all"},Hu={auto_merge:"\uC790\uB3D9 \uBA38\uC9C0",merged:"\uBA38\uC9C0",merge:"\uBA38\uC9C0",pr_stop:"PR \uC911\uB2E8",stopped:"\uC911\uB2E8",failed:"\uC2E4\uD328"};function Mg(e,t){let r=null,n=-1/0;for(let s of Object.values(e)){if(!s||s.bead_id!==t||s.status==="running")continue;let o=typeof s.finished_at=="number"?s.finished_at:typeof s.started_at=="number"?s.started_at:0;o>=n&&(n=o,r=s)}return r}function Pg(e,t){let{winners:r,resumed_from_ids:n}=Du(e,t),s=new Map;for(let[o,a]of r){let i=a.attempt,c=a.run_state,u=a.started_at,d=typeof i.session_id=="string"&&i.session_id.length>0;s.set(o,{attempt_id:typeof i.attempt_id=="string"?i.attempt_id:"",run_state:c,started_at:u,last_event_at:typeof i.last_event_at=="number"?i.last_event_at:null,last_activity:i.last_activity&&typeof i.last_activity=="object"?i.last_activity:null,legs:Array.isArray(i.legs)?i.legs:[],runner:typeof i.runner=="string"?i.runner:null,model:typeof i.model=="string"?i.model:null,effort:typeof i.effort=="string"?i.effort:null,speed:typeof i.speed=="string"?i.speed:null,resumed_from:typeof i.resumed_from=="string"?i.resumed_from:null,continuation_mode:i.continuation_mode==="session"||i.continuation_mode==="fresh"?i.continuation_mode:null,status:typeof i.status=="string"?i.status:null,usage:ir(e,i.bead_id),can_pause:c==="running"&&d,can_resume:c!=="running"&&d&&!n.has(i.attempt_id)})}return s}function Gu(e,t){let r=e[t];if(!r)return"";if(r.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let n=typeof r.reason=="string"?r.reason:"",s=n.indexOf(":");return s>0&&s<n.length-1?`\u26D4 ${n.slice(0,s)} (${n.slice(s+1)})`:`\u26D4 ${n}`}function Ct(e){return e&&typeof e=="object"?e:{}}function Dg(e,t,r){let n=Ct(t);if(Object.keys(n).length===0)return null;let s=e.execution_defaults,o=e.runner_catalog,a=e.session_defaults;if(!s||!o||!a)return null;let i=_=>Qt({pin:_,global:a,execution_defaults:s,runner_catalog:o,route:r}),c,u;try{c=i(n),u=i(null)}catch{return null}let d=Vu(on(c,o),on(u,o)),p=Vu(Br(c,null),Br(u,null));return d||p?{orchestration:d,worker:p}:null}function Vu(e,t){return!e||t&&t.text===e.text?null:e}function Ng(e){return{id:e.id,label:`\u{1F512} \uC120\uD589 ${e.id} (${e.location_label})`,title:`\uC774 \uC774\uC288\uB294 ${e.id}\uAC00 close\uB420 \uB54C\uAE4C\uC9C0 \uCD9C\uBC1C\uD558\uC9C0 \uC54A\uB294\uB2E4`}}function qg(e,t){let r=t.get(e);return r?{id:e,label:`\u2192 \uD6C4\uC18D ${e} (${On(r)})`,title:`\uC774 \uC774\uC288\uAC00 close\uB418\uBA74 ${e}\uAC00 \uC790\uAE30 \uB808\uD3EC \uD050\uC5D0\uC11C \uCD9C\uBC1C\uD55C\uB2E4`}:null}function Fg(e,t,r){let n=new Map;for(let c of e)n.set(c,Array.from(r.get(c)||[]).filter(u=>e.includes(u)).length);let s=[],o=new Map,a=e.filter(c=>(n.get(c)||0)===0).sort();for(let c of a)o.set(c,0);let i=[...a];for(;i.length>0;){let c=i.shift();s.push(c);let u=Array.from(t.get(c)||[]).filter(p=>e.includes(p)).sort(),d=(o.get(c)||0)+(u.length>1?1:0);for(let p of u){let _=(n.get(p)||0)-1;n.set(p,_);let h=o.get(p);o.set(p,h===void 0?d:Math.min(h,d)),_===0&&i.push(p)}}return{order:s,indent:o,cycle:s.length!==e.length}}function jg(e,t,r){let n=new Map,s=new Map,o=new Set,a=(u,d,p)=>{let _=u.get(d);_?_.add(p):u.set(d,new Set([p]))};for(let[u,d]of e)for(let p of d)p!==u&&(o.add(p),o.add(u),a(n,p,u),a(s,u,p));let i=new Set,c=[];for(let u of Array.from(o).sort()){if(i.has(u))continue;let d=[],p=[u];for(i.add(u);p.length>0;){let H=p.pop();d.push(H);for(let P of[...n.get(H)||[],...s.get(H)||[]])i.has(P)||(i.add(P),p.push(P))}if(d.length<2)continue;let _=d.map(H=>t.get(H));if(_.every(H=>!!H&&/^s[1-5]$/.test(H.lane||""))&&_.every(H=>H&&_[0]&&H.root_dir===_[0].root_dir&&H.lane===_[0].lane))continue;let{order:$,indent:L,cycle:j}=Fg(d.slice().sort(),n,s),V=j?d.slice().sort():$;c.push({key:d.slice().sort().join("\0"),cycle:j,nodes:V.map(H=>{let P=t.get(H);return{id:H,workspace_name:P?P.workspace_name:"",root_dir:P?P.root_dir:"",location_label:P?On(P):Ku(H,r),indent:j?0:L.get(H)||0}})})}return c}function Ku(e,t){let r=oi(e,t);return r==="internal"?"\uBBF8\uC801\uC7AC":r==="external"?"\uC678\uBD80":"\uC704\uCE58 \uBBF8\uD655\uC778"}function Bg(e,t,r){let n=t.get(e);if(!n)return Ku(e,r);if(typeof n.position=="number"){if(n.lane==="parallel")return`#${n.position}`;if(/^s[1-5]$/.test(n.lane))return`${n.lane} #${n.position}`}return On(n)}function Ug(e,t,r){let n=[];for(let s of r.get(e)||[])s!==e&&t.has(s)&&!n.includes(s)&&n.push(s);return n}function Wg(e,t,r,n,s,o,a){let i=(p,_,h,$,L=!1)=>{let j=n.get(p),V=j&&j.lane==="parallel"&&typeof j.position=="number"?j.position-1:null;return{id:p,title:o.get(p)||p,workflow:a.get(p)||null,root_dir:j?j.root_dir:"",workspace_name:j?j.workspace_name:"",seq:_,indent:h,predecessors:$,location_label:Bg(p,n,s),draggable:!L&&V!==null,...V!==null?{queue_index:V}:{}}},c=[];for(let p of e.slice().sort((_,h)=>_.key<h.key?-1:1)){let _=new Set(p.nodes.map(h=>h.id));c.push({lane_id:`chain:${p.key}`,label:"",pending:!1,cycle:p.cycle,rows:p.nodes.map((h,$)=>i(h.id,$+1,p.cycle?0:h.indent,p.cycle?[]:Ug(h.id,_,r),p.cycle))})}let u=new Set;for(let p of c)for(let _ of p.rows)u.add(_.id);let d=[];return t.forEach((p,_)=>{let h=p&&typeof p.seed=="string"&&p.seed.length>0?p.seed:null;h!==null&&u.has(h)||(d.push(_),c.push({lane_id:`pending:${_}`,label:"",pending:!0,cycle:!1,rows:h===null?[]:[i(h,1,0,[])]}))}),c.forEach((p,_)=>{p.label=`\uC5F0\uACB0 ${_+1} \xB7 \uB808\uD3EC \uAC04`}),{chain_lanes:c,pending_lanes_kept:d}}function ai(e){if(typeof e=="number")return Number.isFinite(e)?e:null;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:null}return null}function Po(e){if(typeof e=="number"&&Number.isFinite(e))return e;if(typeof e=="string"){let t=Date.parse(e);return Number.isFinite(t)?t:0}return 0}function li(e,t,r){let n=Array.isArray(e)?e:[],s=Array.isArray(t)?t:[],o=r&&typeof r.done_since=="number"?r.done_since:void 0,a={...Ln,...r&&r.candidate_filter?r.candidate_filter:{}},i=r&&hs.some(x=>x.value===r.candidate_sort)?r.candidate_sort:"repo_spec",c=new Map;for(let x of s)x&&typeof x.root_dir=="string"&&c.set(x.root_dir,x);let u=[],d=[],p=[],_=[],h=[],$=[],L=new Map,j=new Map,V=new Map,H=new Map,P=new Map,D=new Map,O=new Map;for(let x of n){if(!x||typeof x.root_dir!="string")continue;let fe=x.root_dir,De=x.name||fe,ve=c.get(fe),ze=ve&&typeof ve.revision=="number"?ve.revision:typeof x.revision=="number"?x.revision:0,We=Ct(x.attempts),Ve=Ct(x.bead_titles);for(let[E,F]of Object.entries(Ve))typeof F=="string"&&F.length>0&&D.set(E,F);let Je=Ct(x.bead_times),ot=Ct(x.pr_observations),K=Ct(x.admission),Q=Ct(x.revise_parked),Se=Ct(x.merge_queue_state),Qe=Ct(x.cleanup_failed),Ge=Ct(x.discard_operations),pe=Ct(x.bead_blocked_by),R=Ct(x.bead_workflow);for(let[E,F]of Object.entries(R))F&&typeof F=="object"&&O.set(E,F);let J=Ct(x.pr_activity),ie=Array.isArray(x.repo_operations)?x.repo_operations:[],te=Array.isArray(x.merge_queue)?x.merge_queue:[],qe=new Set(te.filter(E=>E&&typeof E.bead_id=="string").map(E=>E.bead_id)),at=new Map(te.filter(E=>E&&typeof E.bead_id=="string").map(E=>[E.bead_id,E])),it=Array.isArray(x.queue)?x.queue:[],Xe=(Array.isArray(x.serial_lanes)?x.serial_lanes:[]).filter(E=>E&&/^s[1-5]$/.test(E.id)&&Array.isArray(E.entries)),mt=Ct(x.lane_states),ht=typeof x.serial_lane_count=="number"?Math.max(0,Math.min(5,Math.floor(x.serial_lane_count))):Math.min(5,Xe.length);V.set(fe,ht),H.set(fe,it.length);let bt=new Map(Xe.map(E=>[E.id,E])),pt=new Map;for(let E of Xe)for(let F of E.entries)F&&typeof F.bead_id=="string"&&pt.set(F.bead_id,E.id);for(let[E,F]of Object.entries(pe))Array.isArray(F)&&P.set(E,F.filter(y=>typeof y=="string"&&y.length>0));let wt=Array.isArray(x.done)?x.done:[];for(let E of wt)E&&typeof E.bead_id=="string"&&$.push({id:E.bead_id,root_dir:fe,workspace_name:De});let He=new Map;for(let E of wt)E&&typeof E.bead_id=="string"&&typeof E.added_at=="number"&&He.set(E.bead_id,E.added_at);let et=E=>({id:E,title:Ve[E]||E,root_dir:fe,workspace_name:De,expected_revision:ze,draggable:!1,...Ct(Je[E]).created_at?{created_at:Ct(Je[E]).created_at}:{},...Ct(Je[E]).updated_at?{updated_at:Ct(Je[E]).updated_at}:{}}),Pe=new Set;for(let[E,F]of Pg(We,He))Pe.add(E),d.push({...et(E),lane:"running",...pt.has(E)?{serial_lane_id:pt.get(E)}:{},attempt_id:F.attempt_id,run_state:F.run_state,status:F.status||void 0,workflow:R[E]||null,can_pause:F.can_pause,can_resume:F.can_resume,started_at:F.started_at,last_event_at:F.last_event_at,last_activity:F.last_activity,legs:F.legs,runner:F.runner,model:F.model,effort:F.effort,speed:F.speed,resumed_from:F.resumed_from,continuation_mode:F.continuation_mode,usage:F.usage,exec_chips:{orchestration:Co(F),worker:null},discard:vr(Ge,E,{attempt_id:F.attempt_id}),badges:F.run_state==="paused"?["\u23F8 \uC77C\uC2DC\uC815\uC9C0"]:F.run_state==="failed"?["\u26A0 \uC2E4\uD328"]:[],alert:F.run_state==="failed"});for(let E of Array.isArray(x.session_active)?x.session_active:[]){let F=E&&E.bead_id;typeof F!="string"||Pe.has(F)||(Pe.add(F),Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&P.set(F,E.blocked_by.filter(y=>typeof y=="string"&&y.length>0)),typeof E.title=="string"&&E.title.length>0&&D.set(F,E.title),E.workflow&&typeof E.workflow=="object"&&O.set(F,E.workflow),d.push({...et(F),title:E.title||Ve[F]||F,lane:"running",kind:"session",status:"in_progress",started_at:ai(E.started_at)??ai(E.updated_at)??void 0,updated_at:ai(E.updated_at)??void 0,workflow:E.workflow||null,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(y=>typeof y=="string"&&y.length>0)}:{},draggable:!1,can_pause:!1,can_resume:!1,exec_chips:null,usage:null,legs:[],last_activity:null,badges:[],alert:!1}))}for(let E of Array.isArray(x.pr_wait)?x.pr_wait:[]){let F=E&&E.bead_id;if(typeof F!="string"||Pe.has(F))continue;Pe.add(F);let y=Ct(ot[F]),C=Ct(y.pr),M=y.gate?Ct(y.gate):null,Y=qe.has(F),xe=at.get(F)?.continuation_action||null,he=!!xe&&xe.continuation===null,Ee=Se.active===F,Fe=E.external===!0,_t=Qe[F]||null,yt=Ct(J[F]),Ze=gs({bead_id:F,merge_sha:E.merge_sha,cleanup_cursor:E.cleanup_cursor,merge_progress:yt.merge_progress||null,cleanup_failed:_t,repo_operations:ie}),Ft=Mo(Ze),zt=!!M&&M.base_badge==="\uCDA9\uB3CC",je=!!_t&&["child_sweep","branch_cleanup","parent_close"].includes(_t.step)&&!!M&&M.tier==="merged",Lt=Fe&&!!_t&&!!M&&M.tier==="merged",Ut=!!M&&["closed_unmerged","review","undecidable"].includes(M.tier),Mt=vr(Ge,F,{external:Fe,merge_active:Ee||Ze?.step==="merge",merge_queued:Y,cleanup_active:Ft,merged:!!_t||M?.tier==="merged"}),k=!!Mt.operation;p.push({...et(F),lane:"pr_wait",workflow:R[F]||null,pr_number:typeof C.number=="number"?C.number:null,pr_url:typeof C.url=="string"?C.url:void 0,external:Fe,usage:ir(We,F),merge_step:Ze,badges:he?["\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694"]:Ze?[M?.tier==="merged"?"\uBA38\uC9C0\uB428":"\uBA38\uC9C0 \uC911"]:_t?[an(_t.step)?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${an(_t.step)}`:"\uC815\uB9AC \uBA48\uCDA4"]:typeof M?.gate_badge=="string"&&M.gate_badge.length>0?[M.gate_badge]:[],alert:Ze?Ze.failed===!0:!!_t||Ut,reason:_t&&Ze?.active!==!0?Lo(_t.step):"PR \uB300\uAE30",merge_action:M?.tier==="merged"&&!je&&!Lt?!1:!Y||he,merge_enabled:!k&&(he||M?.enabled===!0||zt||je||Lt),merge_label:he?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":Lt||je?"\uC815\uB9AC \uC7AC\uAC1C":zt&&!je?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":void 0,merge_title:he?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":k?Mt.error?`\uD3D0\uAE30 \uC2E4\uD328: ${Mt.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${Mt.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:Lt?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":je?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":zt?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":M?.enabled===!0?`\uBA38\uC9C0 (${M.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4`:`\uBA38\uC9C0 \uBD88\uAC00: ${M?.reason||"\uAD00\uCE21 \uB300\uAE30"}`,cancel_action:Y&&!he,cancel_enabled:!Ee,continuation_mismatch:xe?.mismatch||null,discard:Mt,discard_action:Mt.action,discard_enabled:Mt.enabled,discard_title:Mt.title})}let ct=(E,F,y,C)=>{let M=E&&E.bead_id;if(typeof M!="string"||Pe.has(M))return null;Pe.add(M);let Y=Q[M],xe=vr(Ge,M),he=xe.operation?xe:null,Ee={...et(M),lane:F,workflow:R[M]||null,draggable:!he,discard:he||void 0,reason:Gu(K,M),seq:y+1,queue_position:y+1,queue_index:y,queue_length:C,badges:Y?["\u23F8 REVISE \uD30C\uD0B9"]:[],alert:!!Y,revise_action:!!Y,revise_enabled:!!Y&&!he,revise_title:Y?Y.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Y.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":""};return Object.hasOwn(pe,M)&&(Ee.blocked_by=Array.isArray(pe[M])?pe[M].filter(Fe=>typeof Fe=="string"&&Fe.length>0):[]),Ee};for(let E=0;E<it.length;E++){let F=ct(it[E],"queue",E,it.length);if(!F)continue;_.push(F);let y=L.get(fe);y?y.push(F):L.set(fe,[F])}let xt=[];for(let E=0;E<Math.max(ht,Xe.length);E++){let F=`s${E+1}`,y=bt.get(F),C=y&&Array.isArray(y.entries)?y.entries:[],M=[];for(let he=0;he<C.length;he++){let Ee=ct(C[he],F,he,C.length);Ee&&(M.push(Ee),_.push(Ee))}let Y=Ct(mt[F]),xe=Array.isArray(Y.occupied_by)?Y.occupied_by.filter(he=>typeof he=="string"):[];M.length===0&&xe.length===0&&(ht<=1||E>=ht)||xt.push({id:F,index:E,items:M,raw_length:C.length,occupied_by:xe,corrections:Array.isArray(Y.corrections)?Y.corrections.length:0,cycle:Y.cycle===!0,...M.length===0&&xe.length===0?{empty:!0}:{}})}j.set(fe,xt);let X=Array.from({length:ht},(E,F)=>{let y=`s${F+1}`,C=bt.get(y),M=C&&Array.isArray(C.entries)?C.entries:[],Y=Ct(mt[y]);return{id:y,index:M.length,length:M.length,occupied_by:Array.isArray(Y.occupied_by)?Y.occupied_by.filter(xe=>typeof xe=="string"):[]}});for(let E of Array.isArray(x.runnable)?x.runnable:[]){let F=E&&E.bead_id;if(typeof F!="string"||Pe.has(F))continue;Pe.add(F);let y=E.workflow&&typeof E.workflow=="object"?E.workflow:null,C=y&&typeof y.route=="string"&&y.route||(typeof E.route=="string"?E.route:null),M=Dg(Ct(ve),E.exec_pins,C);Array.isArray(E.blocked_by)&&E.blocked_by.length>0&&P.set(F,E.blocked_by.filter(Y=>typeof Y=="string"&&Y.length>0)),typeof E.title=="string"&&E.title.length>0&&D.set(F,E.title),y&&O.set(F,y),u.push({...et(F),title:E.title||Ve[F]||F,lane:"runnable",draggable:!0,reason:Gu(K,F),created_at:E.created_at??void 0,updated_at:E.updated_at??void 0,status:typeof E.status=="string"?E.status:void 0,labels:Array.isArray(E.labels)?E.labels:[],spec_id:typeof E.spec_id=="string"?E.spec_id:"",workflow:y||(C?{route:C,chips:{route:C}}:null),...M?{exec_chips:M}:{},blocked:E.blocked===!0,...Array.isArray(E.blocked_by)?{blocked_by:E.blocked_by.filter(Y=>typeof Y=="string"&&Y.length>0)}:{},place_index:it.length,place_lanes:X})}for(let E of wt){let F=E&&E.bead_id;if(typeof F!="string"||Pe.has(F)||(Pe.add(F),o!==void 0&&typeof E.added_at=="number"&&E.added_at<o))continue;let y=Mg(We,F),C=y&&typeof y.done_kind=="string"?y.done_kind:null;h.push({...et(F),lane:"done",done:!0,done_layout:"three_line",usage:ir(We,F),work_ms:$o(We,F),done_at:typeof E.added_at=="number"?E.added_at:void 0,done_kind:C,badges:C&&Hu[C]?[Hu[C]]:[]})}}let U=new Map;s.forEach((x,fe)=>{x&&typeof x.root_dir=="string"&&U.set(x.root_dir,fe)});let b=r&&r.running_sort==="repo"?"repo":"started";d.sort((x,fe)=>{let De=x.kind==="session",ve=fe.kind==="session";if(De!==ve)return De?1:-1;if(De&&ve){let Ve=Po(fe.updated_at)-Po(x.updated_at);return Ve!==0?Ve:x.id.localeCompare(fe.id)}if(b==="repo"){let Ve=U.get(x.root_dir)??Number.MAX_SAFE_INTEGER,Je=U.get(fe.root_dir)??Number.MAX_SAFE_INTEGER;if(Ve!==Je)return Ve-Je}let ze=typeof x.started_at=="number"&&Number.isFinite(x.started_at)?x.started_at:null,We=typeof fe.started_at=="number"&&Number.isFinite(fe.started_at)?fe.started_at:null;return ze!==null&&We!==null&&ze!==We?ze-We:ze===null&&We!==null?1:ze!==null&&We===null?-1:x.id.localeCompare(fe.id)}),h.sort((x,fe)=>(fe.done_at??0)-(x.done_at??0));let B=s.length>0?s:n.map(x=>({root_dir:x&&x.root_dir,name:x&&x.name,auto_advance:x&&x.auto_advance,auto_merge:x&&x.auto_merge,slots:x&&x.slots,revision:x&&x.revision,runner_catalog:x&&x.runner_catalog})),ee=new Set(u.map(x=>x.root_dir)),Ae=[];for(let x of B){if(!x||typeof x.root_dir!="string")continue;let fe=L.get(x.root_dir)||[],De=j.get(x.root_dir)||[];!(fe.length>0||De.some(ze=>ze.items.length>0||ze.occupied_by.length>0))&&!ee.has(x.root_dir)||Ae.push({root_dir:x.root_dir,name:x.name||x.root_dir,auto_advance:x.auto_advance===!0,auto_merge:x.auto_merge===!0,slots:typeof x.slots=="number"&&x.slots>=zu?x.slots:zu,revision:typeof x.revision=="number"?x.revision:0,runner_catalog:Ct(x.runner_catalog),items:fe,sublanes:{parallel:fe,serial:De},serial_lane_count:V.get(x.root_dir)||0,raw_queue_length:H.get(x.root_dir)||0})}let Z={runnable:u,runnable_hidden:{blocked:0,spec:0},runnable_sections:[],runnable_flat:i==="updated_flat",queue:_,queue_groups:Ae,running:d,pr_wait:p,done:h,chains:[],parallel_rows:[],chain_lanes:[],parallel_raw_length:Object.fromEntries(H),owner_of:{},pending_lanes_kept:[]},le=ju(Z);for(let x of $)le.has(x.id)||le.set(x.id,{root_dir:x.root_dir,workspace_name:x.workspace_name,lane:"done",state:"done"});let ge=new Map;for(let[x,fe]of P)for(let De of fe){let ve=ge.get(De);ve?ve.includes(x)||ve.push(x):ge.set(De,[x])}for(let x of[...Z.queue,...Z.runnable]){if(!Object.hasOwn(x,"blocked_by"))continue;let fe=le.get(x.id);x.blockers=(x.blocked_by||[]).map(De=>Bu(De,fe,le,s)),x.blocker_warnings=x.blockers.filter(De=>De.missing_internal).map(De=>`\u26A0 \uC120\uD589 ${De.id}\uAC00 \uC5B4\uB290 \uB808\uC778\uC5D0\uB3C4 \uC5C6\uACE0 \uC2E4\uD589 \uC911\uB3C4 \uC544\uB2D8 \u2014 \uC218\uB3D9 \uAC1C\uC785 \uC804\uAE4C\uC9C0 \uC774 \uC790\uB9AC\uC5D0\uC11C \uC815\uC9C0`),x.blocker_warnings.length>0&&(x.alert=!0)}for(let x of[...Z.queue,...Z.runnable,...Z.running,...Z.pr_wait]){let fe=x.lane==="running"||x.lane==="pr_wait"?[]:(x.blockers||[]).map(Ng),De=[];for(let We of ge.get(x.id)||[]){let Ve=qg(We,le);Ve&&De.push(Ve)}let ve=x.lane==="running"||x.lane==="pr_wait"?[]:x.blocker_warnings||[];if(fe.length===0&&De.length===0&&ve.length===0)continue;let ze={predecessors:fe,successors:De,warnings:ve};x.dependency_chips=ze}Z.chains=jg(P,le,s);let Te=Uu(Z.queue_groups);for(let x of Z.queue_groups)for(let fe of x.sublanes.serial){let De=Te.get(Wu(x.root_dir,fe.id));De&&(fe.cross_wait_peers=De)}let Le=Wg(Z.chains,Array.isArray(r?.pending_lanes)?r.pending_lanes:[],P,le,s,D,O);Z.chain_lanes=Le.chain_lanes,Z.pending_lanes_kept=Le.pending_lanes_kept;let se=new Set;for(let x of Z.chain_lanes)for(let fe of x.rows)se.add(fe.id);let ae=[];for(let x of L.values())for(let fe of x)se.has(fe.id)||ae.push(fe);ae.sort((x,fe)=>{let De=x.workspace_name.localeCompare(fe.workspace_name);return De!==0?De:(x.queue_index??0)-(fe.queue_index??0)}),Z.parallel_rows=ae;let Me={};for(let[x,fe]of le)typeof fe.root_dir=="string"&&fe.root_dir.length>0&&(Me[x]=fe.root_dir);Z.owner_of=Me;let N=Z.runnable.length,ne=Z.runnable;a.show_blocked||(ne=ne.filter(x=>x.blocked!==!0));let oe=ne.length;a.spec==="with"?ne=ne.filter(x=>!!x.spec_id):a.spec==="without"&&(ne=ne.filter(x=>!x.spec_id)),Z.runnable_hidden={blocked:N-oe,spec:oe-ne.length};let ke=(x,fe)=>{let De=Po(fe.updated_at)-Po(x.updated_at);return De!==0?De:x.id.localeCompare(fe.id)},Ne=i==="repo_spec"?(x,fe)=>{let De=x.spec_id?0:1,ve=fe.spec_id?0:1;return De!==ve?De-ve:ke(x,fe)}:ke;if(i==="updated_flat")Z.runnable=ne.slice().sort(ke),Z.runnable_sections=[];else{let x=new Map;for(let ve of ne){let ze=x.get(ve.root_dir);ze?ze.push(ve):x.set(ve.root_dir,[ve])}let fe=[],De=[];for(let ve of B){if(!ve||typeof ve.root_dir!="string")continue;let ze=(x.get(ve.root_dir)||[]).slice().sort(Ne);x.delete(ve.root_dir),ze.length!==0&&(fe.push({root_dir:ve.root_dir,name:ve.name||ve.root_dir,items:ze.map(We=>({...We,workspace_name:""}))}),De.push(...ze))}for(let[ve,ze]of x){let We=ze.slice().sort(Ne);fe.push({root_dir:ve,name:We[0]?.workspace_name||ve,items:We.map(Ve=>({...Ve,workspace_name:""}))}),De.push(...We)}Z.runnable=De,Z.runnable_sections=fe}return Z}var Xu="bdui.monitor.done-range",Ju="bdui.monitor.running_sort",ed="bdui.monitor.candidate_sort",td="beads-ui.monitor.candidate-filter",rd="beads-ui.monitor.sections";function zg(){try{let e=window.localStorage.getItem(td);if(!e)return{...Ln};let t=JSON.parse(e);return!t||typeof t!="object"?{...Ln}:{show_blocked:typeof t.show_blocked=="boolean"?t.show_blocked:Ln.show_blocked,spec:ii.some(r=>r.value===t.spec)?t.spec:"all"}}catch{return{...Ln}}}function Yu(e){try{window.localStorage.setItem(td,JSON.stringify({show_blocked:e.show_blocked,spec:e.spec}))}catch{}}function Hg(){try{let e=window.localStorage.getItem(ed);return hs.some(t=>t.value===e)?e:"repo_spec"}catch{return"repo_spec"}}function Gg(e){try{window.localStorage.setItem(ed,e)}catch{}}function Vg(){try{let e=window.localStorage.getItem(rd);if(!e)return{};let t=JSON.parse(e);return t&&typeof t=="object"?t:{}}catch{return{}}}function Zu(e){try{window.localStorage.setItem(rd,JSON.stringify(e))}catch{}}function Kg(){try{let e=window.localStorage.getItem(Xu);return ar(e)?e:er}catch{return er}}function Yg(e){try{window.localStorage.setItem(Xu,e)}catch{}}function Zg(){try{return window.localStorage.getItem(Ju)==="repo"?"repo":"started"}catch{return"started"}}function Qg(e){try{window.localStorage.setItem(Ju,e)}catch{}}var nd="tab:monitor:pipeline",Xg=1e3,Jg=[{lane:"runnable",pane:"candidate",title:"\uC2E4\uD589\uAC00\uB2A5",empty:"\uC2E4\uD589 \uC790\uACA9\uC744 \uAC16\uCD98 \uC774\uC288 \uC5C6\uC74C"},{lane:"queue",pane:"queue",title:"\uB300\uAE30",empty:"\uD45C\uC2DC\uD560 \uB808\uD3EC \uC5C6\uC74C"},{lane:"running",pane:"running",title:"\uC2E4\uD589\uC911",empty:"\uC2E4\uD589 \uC911 \uC5C6\uC74C"},{lane:"pr_wait",pane:"pr_wait",title:"PR \uB300\uAE30",empty:"PR \uC5C6\uC74C"},{lane:"done",pane:"done",title:"\uC644\uB8CC",empty:"\uC644\uB8CC \uAE30\uB85D \uC5C6\uC74C"}],Qu="\u2460\u2461\u2462\u2463\u2464\u2465\u2466\u2467\u2468\u2469\u246A\u246B\u246C\u246D\u246E\u246F\u2470\u2471\u2472\u2473";function eh(e){return e>=1&&e<=Qu.length?Qu[e-1]:`(${e})`}function sd(e,t){let r=Tt("views:monitor"),n=t.gotoIssue,s=t.pipelineStore,o=t.transport,a=t.getWorkspacePath,i=t.switchWorkspace,c=t.router,u=t.now||(()=>Date.now()),d=t.confirm||(k=>typeof globalThis.confirm!="function"||globalThis.confirm(k)),p=Kg(),_=Zg(),h=zg(),$=Hg(),L=Vg(),j=null,V=null,H=[],P=null;function D(){let k=Mr.find(w=>w.value===p);return k?k.label:""}let O=document.createElement("div");O.className="mon",e.appendChild(O);let U=document.createElement("div");U.className="mon2-drawer",e.appendChild(U);let b=li(null,null),B=new Map,ee=new Map,Ae=null,Z=null,le=null,ge=Sn(U,{transport:o,sessionLogStore:t.sessionLogStore,onClose:()=>{j=null,ie()}});async function Te(k,w,I,W,ye=!0){if(!o||!I)return null;let we=await o(k,{...w,root_dir:I,expected_revision:W});if(we&&we.conflict&&ye){we.queue&&ee.set(I,we.queue);let be=we.queue&&typeof we.queue.revision=="number"?we.queue.revision:W;we=await o(k,{...w,root_dir:I,expected_revision:be})}return we&&we.queue&&I&&ee.set(I,we.queue),we}function Le(k,w){let I=ee.get(k),W=s&&s.get?s.get():null,ye=(Array.isArray(W)?W:[]).find(be=>be?.root_dir===k);return(I||ye)?.merge_queue?.find(be=>be.bead_id===w)?.continuation_action}async function se(k,w,I,W){let ye=await Te(k,w,I,W),we=ee.get(I)?.revision??ye?.queue?.revision??W;return $r(ye,(be,tt)=>Te(k,{...w,continuation:be,decision_token:tt},I,we,!1),{refresh:be=>Te(k,w,I,be?.queue?.revision??ee.get(I)?.revision??we,!1)})}async function ae(k,w,I,W){let ye=await $r({continuation_mismatch:W},(be,tt)=>Te("worker-merge-queue-add",{bead_id:w,continuation:be,decision_token:tt},k,I,!1)),we=ye?.queue?.merge_queue?.find(be=>be.bead_id===w)?.continuation_action;ye?.applied!==!0&&we?.continuation===null&&we.mismatch&&await ae(k,w,ye.queue.revision,we.mismatch)}async function Me(k,w,I){let W=await Te("worker-discard",k,w,I);if(W&&W.discarded===!0){me(Ao(W),"success",5e3);return}if(W&&W.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${W.reason}`,"error");return}if(W&&W.accepted&&W.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success");return}if(W&&W.accepted){me(`\uD3D0\uAE30 \uC9C4\uD589: ${W.phase||"\uBC31\uC5C5 \uC911"}`,"success");return}W&&!W.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error")}async function N(k,w,I){return!o||!I?null:await o(k,{...w,root_dir:I})}async function ne(){let k=new Map;for(let w of b.pr_wait)k.has(w.root_dir)||k.set(w.root_dir,w.expected_revision);for(let[w,I]of k)await Te("worker-merge-queue-add-all",{},w,I)}function oe(k){let w=L[k];return!!(w&&w.runnable===!0)}function ke(k){let w={...L[k]||{}};w.runnable=!w.runnable,L={...L,[k]:w},Zu(L),ie()}function Ce(k){return L[k]===!0}function Ne(k){L={...L,[k]:L[k]!==!0},Zu(L),ie()}function x(k){let w=oe(k.root_dir);return l`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${k.root_dir}
        data-section="runnable"
        aria-expanded=${w?"false":"true"}
        aria-label=${`${k.name} \uC139\uC158 ${w?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
      >
        ${w?"\u25B8":"\u25BE"}
      </button>
      <span class="mon2-sec__name" title=${k.root_dir}>${k.name}</span>
      <span class="mon2-sec__count">${k.count}</span>
      <button
        type="button"
        class="mon2-sec__worker"
        data-root-dir=${k.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`}function fe(k,w){return l`<div
      class="mon2-item"
      data-bead-id=${k.id}
      data-drag-kind="candidate"
      data-root-dir=${k.root_dir}
    >
      ${w}
    </div>`}function De(k){if(V!==k.id)return null;let w=b.queue_groups.find(W=>W.root_dir===k.root_dir),I=k.place_lanes||[];return{bead_id:k.id,lanes:[{id:"parallel",label:"\uBCD1\uB82C",count:k.place_index??0},...b.chain_lanes.map((W,ye)=>({id:`lane:${ye}`,label:`\uC5F0\uACB0 ${ye+1} \uB05D\uC5D0`,count:W.rows.length})),{id:"new-lane",label:"\uC0C8 \uC5F0\uACB0 \uB808\uC778",count:0},...I.map(W=>({id:`serial:${W.id}`,label:`${w?w.name:""} \uC9C1\uB82C ${Number(W.id.slice(1))}`,count:W.length}))]}}function ve(k){return fe(k,Va(k,De(k),{exec_chips_mode:"pinned_only"}))}function ze(){return b.runnable_flat?l`<div class="mon2-flat" data-drop="candidate">
        ${b.runnable.map(k=>ve(k))}
      </div>`:l`${b.runnable_sections.map(k=>{let w=oe(k.root_dir);return l`<section
        class="mon2-sec${w?" is-collapsed":""}"
        data-root-dir=${k.root_dir}
        data-section="runnable"
      >
        ${x({root_dir:k.root_dir,name:k.name,count:k.items.length})}
        ${w?"":l`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${k.items.map(I=>ve(I))}
            </div>`}
      </section>`})}`}function We(k,w){return l`<div
      class="mon2-item"
      data-bead-id=${k.id}
      data-drag-kind="parallel"
      data-root-dir=${k.root_dir}
      data-row-index=${w}
      data-queue-index=${String(k.queue_index??0)}
    >
      ${sn(k)}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${k.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${k.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${k.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
    </div>`}function Ve(){let k=Ce("parallel");return l`<section
      class="mon2-area mon2-parallel${k?" is-collapsed":""}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${k?"false":"true"}
          aria-label=${`\uBCD1\uB82C \uC601\uC5ED ${k?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${k?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${b.parallel_rows.length}</span>
      </header>
      ${k?"":l`<div class="mon2-area__body" data-drop="parallel">
            ${b.parallel_rows.length===0?l`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`:b.parallel_rows.map((w,I)=>We(w,I))}
          </div>`}
    </section>`}function Je(k,w,I){return l`<div
      class="mon2-crow"
      style=${`--indent: ${w.indent}`}
      draggable=${w.draggable?"true":"false"}
      data-bead-id=${w.id}
      data-drag-kind="chain"
      data-root-dir=${w.root_dir}
      data-lane-id=${k.lane_id}
      data-row-index=${I}
      data-queue-index=${typeof w.queue_index=="number"?String(w.queue_index):""}
    >
      ${k.cycle?"":l`<span class="mon2-crow__seq" aria-hidden="true"
            >${eh(w.seq)}</span
          >`}
      ${w.workspace_name?l`<span class="worker-mini__repo" title=${w.root_dir}
            >${w.workspace_name}</span
          >`:""}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${w.id}</span>
      ${Rn(w.workflow)}
      <span class="mon2-crow__title">${w.title}</span>
      ${w.predecessors.map(W=>l`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${W}</span></span
          >`)}
      <span class="mon2-crow__where"
        >${w.location_label==="\uC2E4\uD589\uC911"?`\u25CF ${w.location_label}`:w.location_label}</span
      >
      ${w.draggable?l`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${w.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`:""}
    </div>`}function ot(k){return l`<div class="mon2-clane" data-lane-id=${k.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${k.label}</span>
        <span class="mon2-clane__count">${k.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${k.lane_id}
      >
        ${k.cycle?l`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`:""}
        ${k.rows.length===0?l`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`:k.rows.map((w,I)=>Je(k,w,I))}
      </div>
    </div>`}function K(k,w,I){return l`<div
      class="mon2-item"
      data-bead-id=${w.id}
      data-drag-kind="repo-serial"
      data-root-dir=${w.root_dir}
      data-lane-id=${k.id}
      data-row-index=${I}
      data-queue-index=${String(w.queue_index??0)}
    >
      ${sn(w)}
    </div>`}function Q(k,w){return l`<div
      class="mon2-lane${w.empty?" mon2-lane--empty":""}"
      data-root-dir=${k.root_dir}
      data-lane-length=${String(w.raw_length)}
    >
      ${cr({id:"",lane:w.id,title:`${k.name} \xB7 \uC9C1\uB82C ${w.index+1}`,items:w.items,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uB4DC\uB798\uADF8\uB85C \uBC30\uCE58",body:l`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${k.root_dir}
          data-lane-id=${w.id}
          data-lane-length=${String(w.raw_length)}
        >
          ${w.items.length>0?w.items.map((I,W)=>K(w,I,W)):l`<div class="worker-pane__empty">
                비어 있음 — 드래그로 배치
              </div>`}
        </div>`,header_control:l`<span class="mon2-lane__badge"
            >${w.occupied_by.length>0?"\uC810\uC720":""}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${k.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`})}
      ${w.empty?l`<div class="mon2-lane__hint">
            ${k.name} 직렬 ${w.index+1} 비어 있음
          </div>`:""}
      ${w.cycle?l`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`:""}
      ${(w.cross_wait_peers||[]).map(I=>l`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${I.workspace_name}·${I.lane}과 교차 대기
          </div>`)}
    </div>`}function Se(){let k=Ce("serial"),w=b.chain_lanes.some(I=>I.pending&&I.rows.length===0);return l`<section
      class="mon2-area mon2-serial${k?" is-collapsed":""}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${k?"false":"true"}
          aria-label=${`\uC9C1\uB82C \uC601\uC5ED ${k?"\uD3BC\uCE58\uAE30":"\uC811\uAE30"}`}
        >
          ${k?"\u25B8":"\u25BE"}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
          type="button"
          class="mon2-newlane"
          ?disabled=${w}
          title=${w?"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4":"\uBE48 \uC5F0\uACB0 \uB808\uC778\uC744 \uD558\uB098 \uB9CC\uB4ED\uB2C8\uB2E4 \u2014 \uC0C8\uB85C\uACE0\uCE68\uD558\uBA74 \uC0AC\uB77C\uC9D1\uB2C8\uB2E4"}
        >
          + 연결 레인
        </button>
      </header>
      ${k?"":l`<div class="mon2-area__body">
            ${b.chain_lanes.map(I=>ot(I))}
            ${b.queue_groups.map(I=>I.sublanes.serial.map(W=>Q(I,W)))}
          </div>`}
    </section>`}function Qe(){return l`<div class="mon2-wait">${Ve()}${Se()}</div>`}function Ge(k){return l`<div class="worker-rungrid">
      ${b.running.length===0?l`<div class="worker-rungrid__empty">실행 세션 없음</div>`:b.running.map(w=>Za({bead_id:w.id,attempt_id:w.attempt_id||"",title:w.title,runner:w.runner??null,model:w.model??null,effort:w.effort??null,speed:w.speed??null,started_at:w.started_at??null,kind:w.kind,...w.kind==="session"?{updated_at:w.updated_at}:{},workflow:w.workflow||null,resumed_from:w.resumed_from??null,continuation_mode:w.continuation_mode??null,paused:w.run_state==="paused",failed:w.run_state==="failed",status:w.status,status_label:w.run_state==="failed"?"\uC2E4\uD328":void 0,resume_eligible:w.can_resume!==!1,can_pause:w.can_pause!==!1,exec_chips:w.exec_chips||null,usage:w.usage||null,discard:w.discard},k,j,{monitor:{repo:w.workspace_name,root_dir:w.root_dir,serial_lane_id:w.serial_lane_id,workflow:w.workflow||null,last_activity:w.last_activity||null,legs:w.legs||[],dependency_chips:w.dependency_chips||null}}))}
    </div>`}function pe(k){let w={runnable:b.runnable,queue:b.queue,running:b.running,pr_wait:b.pr_wait,done:b.done};return l`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${Jg.map(I=>{let W=w[I.lane],ye=I.lane==="runnable"?b.runnable_flat?W.length>0?ze():void 0:b.runnable_sections.length>0?ze():void 0:I.lane==="queue"?b.queue_groups.length>0||b.chain_lanes.length>0||b.parallel_rows.length>0?Qe():void 0:I.lane==="running"?Ge(k):W.length>0?l`${W.map(we=>sn(we))}`:void 0;return cr({id:`monitor-${I.lane}`,lane:I.pane,title:I.lane==="done"?`\uC644\uB8CC\xB7${D()}`:I.title,items:W,empty:I.empty,body:ye,live:I.lane==="running"&&W.length>0,controls:I.lane==="runnable"?R():void 0,header_control:J(I.lane,W.length)})})}
      </div>`}function R(){return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${h.show_blocked}
        />
        🔒
        blocked${b.runnable_hidden.blocked>0?` ${b.runnable_hidden.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${ii.map(k=>l`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${h.spec===k.value?" is-active":""}"
              data-spec=${k.value}
              aria-pressed=${h.spec===k.value?"true":"false"}
            >
              ${k.label}
            </button>`)}
        ${b.runnable_hidden.spec>0?l`<span class="worker-filter__hidden"
              >숨김 ${b.runnable_hidden.spec}</span
            >`:""}
      </div>
    </div>`}function J(k,w){return k==="runnable"?l`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${$}
      >
        ${hs.map(I=>l`<option
              value=${I.value}
              ?selected=${$===I.value}
            >
              ${I.label}
            </option>`)}
      </select>`:k==="running"?l`<select
        class="mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${_}
      >
        <option value="started" ?selected=${_==="started"}>
          시작순
        </option>
        <option value="repo" ?selected=${_==="repo"}>
          레포순
        </option>
      </select>`:k==="pr_wait"&&w>0?l`<button
        type="button"
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`:k==="done"?l`<select
        class="mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${p}
      >
        ${Mr.map(I=>l`<option value=${I.value} ?selected=${p===I.value}>
              ${I.label}
            </option>`)}
      </select>`:""}function ie(){let k=s&&s.get?s.get():null,w=s&&s.getWorkspacesState?s.getWorkspacesState():[],I=u(),W=()=>li(k,w,{done_since:Zr(p,I),running_sort:_,candidate_filter:h,candidate_sort:$,pending_lanes:H});b=W(),b.pending_lanes_kept.length!==H.length&&(H=b.pending_lanes_kept.map(ye=>H[ye]),b=W()),B=new Map;for(let ye of[...b.runnable,...b.queue,...b.running,...b.pr_wait,...b.done])B.has(ye.id)||B.set(ye.id,ye);Ye(pe(I),O),qe()?.render(),te(),at()}function te(){let k=new Map;for(let w of b.queue_groups)k.set(w.root_dir,w.auto_advance);for(let w of Array.from(O.querySelectorAll(".mon2-parallel .worker-mini__repo"))){let I=w.closest(".mon2-item")?.getAttribute("data-root-dir")||"",W=k.get(I);typeof W=="boolean"&&w.setAttribute("title",`${w.textContent||""} \xB7 ${W?"\uC790\uB3D9\uD654 \uCF1C\uC9D0":"\uC790\uB3D9\uD654 \uAEBC\uC9D0"}`)}}function qe(){if(le)return le;let k=O.querySelector(".mon2-deck");return k?(le=Lu(k,{workspacesState:()=>s&&s.getWorkspacesState?s.getWorkspacesState():[],doneItems:()=>b.done,rangeLabel:D,transport:o,implPresetStore:t.execPresetStore,gotoWorkerTab:Xe,onFocusChange:w=>{P=w,at()}}),le):null}function at(){O.classList.toggle("has-focus",P!==null);for(let k of Array.from(O.querySelectorAll(".mon2-sec[data-root-dir]")))k.classList.toggle("is-focus",P!==null&&k.getAttribute("data-root-dir")===P);for(let k of Array.from(O.querySelectorAll(".mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]"))){let w=B.get(k.getAttribute("data-bead-id")||"");k.classList.toggle("is-focus",P!==null&&!!w&&w.root_dir===P)}for(let k of Array.from(O.querySelectorAll(".mon2-crow[data-root-dir]")))k.classList.toggle("is-focus",P!==null&&k.getAttribute("data-root-dir")===P)}function it(k,w){let I=a?a():void 0;if(!w||!I||w===I||!i){n(k);return}i(w).then(()=>{n(k)}).catch(W=>{r("workspace switch for %s failed: %o",w,W)})}function Xe(k){if(!k)return;let w=a?a():void 0,I=()=>{try{c?.gotoView("worker")}catch(W){r("gotoView(worker) failed: %o",W)}};if(!i||w&&w===k){I();return}i(k).then(I).catch(W=>{r("workspace switch for %s failed: %o",k,W),me("\uB808\uD3EC \uC804\uD658\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4","error")})}function mt(k){rr(k).then(w=>{me(w?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",w?"success":"error",1400)})}function ht(k){let w=B.get(k)||null;return{item:w,root_dir:w?w.root_dir:"",revision:w?w.expected_revision:0}}function bt(k){if(typeof k=="string"&&k.length>0)return k;if(k&&typeof k=="object"){let w=k;if(typeof w.message=="string"&&w.message.length>0)return w.message;if(typeof w.error=="string"&&w.error.length>0)return w.error;if(w.error&&typeof w.error=="object"&&typeof w.error.message=="string")return w.error.message}return"\uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4"}async function pt(k,w,I){let{root_dir:W}=ht(w);if(!(!w||!I||I===w))try{await N(k,{a:w,b:I},W)}catch(ye){me(bt(ye),"error")}}function wt(){let k=new Map,w=s&&s.get?s.get():null,I=W=>Array.isArray(W)?W.filter(ye=>typeof ye=="string"&&ye.length>0):[];for(let W of Array.isArray(w)?w:[]){if(!W||typeof W!="object")continue;let ye=W.bead_blocked_by&&typeof W.bead_blocked_by=="object"?W.bead_blocked_by:{};for(let[we,be]of Object.entries(ye))Array.isArray(be)&&k.set(we,I(be));for(let we of[...Array.isArray(W.runnable)?W.runnable:[],...Array.isArray(W.session_active)?W.session_active:[]])we&&typeof we.bead_id=="string"&&Array.isArray(we.blocked_by)&&we.blocked_by.length>0&&k.set(we.bead_id,I(we.blocked_by))}return k}function He(){let k=new Map;for(let I of b.chain_lanes)k.set(I.lane_id,I.rows.map(W=>W.id));let w=new Map;for(let I of b.parallel_rows)typeof I.queue_index=="number"&&w.set(I.id,I.queue_index);for(let I of b.queue_groups)for(let W of I.sublanes.serial)for(let ye of W.items)typeof ye.queue_index=="number"&&w.set(ye.id,ye.queue_index);return{blocked_by_map:wt(),owner_of:new Map(Object.entries(b.owner_of)),lane_order:k,parallel_rows:b.parallel_rows.map(I=>({bead_id:I.id,root_dir:I.root_dir,queue_index:I.queue_index??0})),parallel_raw_length:new Map(Object.entries(b.parallel_raw_length)),queue_index_of:w}}function et(k,w){let I=B.get(w);if(I&&I.root_dir===k)return I.expected_revision;let W=b.queue_groups.find(ye=>ye.root_dir===k);return W?W.revision:0}async function Pe(k,w){try{if(k.type==="worker-queue-place"||k.type==="worker-queue-reorder"||k.type==="worker-queue-remove"){let I=await Te(k.type,k.payload,k.root_dir,et(k.root_dir,w));return I&&I.conflict?(me("\uD050\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694","error"),!1):I&&I.applied===!1?(me(I.admission_reason?`\uD050 \uC801\uC7AC \uAC70\uBD80: ${I.admission_reason}`:"\uD050 \uC694\uCCAD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4","error"),!1):!0}return(k.type==="dep-add"||k.type==="dep-remove")&&await N(k.type,{a:k.a,b:k.b},k.root_dir),!0}catch(I){return me(bt(I),"error"),!1}}async function ct(k,w){let I=Mu(k,w,He());if("refused"in I){me(I.refused,"error");return}if(w.kind==="chain"){let W=b.chain_lanes.find(we=>we.lane_id===w.lane_id),ye=W&&W.pending&&W.rows.length===0?Number(W.lane_id.slice(8)):-1;ye>=0&&H[ye]&&(H=H.map((we,be)=>be===ye?{seed:k.bead_id}:we))}for(let W of I.ops)if(!await Pe(W,k.bead_id))break;ie()}async function xt(k,w){let I=B.get(k);if(!I){ie();return}let W={kind:"candidate",bead_id:k,root_dir:I.root_dir};if(w==="new-lane"){H.some(we=>we.seed===null)||(H=[...H,{seed:null}]),ie();let ye=b.chain_lanes.find(we=>we.pending&&we.rows.length===0);if(!ye)return;await ct(W,{kind:"chain",lane_id:ye.lane_id,marker_index:0});return}if(w.startsWith("lane:")){let ye=b.chain_lanes[Number(w.slice(5))];if(!ye){ie();return}await ct(W,{kind:"chain",lane_id:ye.lane_id,marker_index:ye.rows.length});return}if(w.startsWith("serial:")){let ye=w.slice(7),we=(I.place_lanes||[]).find(be=>be.id===ye);await ct(W,{kind:"repo-serial",root_dir:I.root_dir,lane_id:ye,index:we?we.index:0});return}await ct(W,{kind:"parallel",marker_index:b.parallel_rows.length})}async function X(k,w){let I=b.parallel_rows,W=I.findIndex(T=>T.id===k);if(W<0)return;let ye=I[W].root_dir,we=[];I.forEach((T,ce)=>{T.root_dir===ye&&we.push(ce)});let be=we.indexOf(W),tt=we[be+w];if(typeof tt!="number")return;let Ie=w===-1?tt:we[be+2]??Math.min(I.length,tt+1);await ct({kind:"parallel",bead_id:k,root_dir:ye,queue_index:I[W].queue_index??0},{kind:"parallel",marker_index:Ie})}async function E(k){for(let w of b.chain_lanes){let I=w.rows.find(W=>W.id===k);if(!(!I||!I.draggable)){await ct({kind:"chain",bead_id:k,root_dir:I.root_dir,lane_id:w.lane_id,...typeof I.queue_index=="number"?{queue_index:I.queue_index}:{}},{kind:"parallel",marker_index:b.parallel_rows.length});return}}}let F=null,y=!1,C=null;function M(){C!==null&&clearTimeout(C),C=setTimeout(()=>{C=null,y=!1},0)}function Y(k,w){let I=w&&typeof w.closest=="function"?w.closest("[data-row-index]"):null;if(I&&k.contains(I)){let W=Number(I.getAttribute("data-row-index"));return Number.isFinite(W)?W:0}return k.querySelectorAll("[data-row-index]").length}function xe(k){let w=k.target,I=typeof w?.closest=="function"?w.closest("[data-drop]"):null;if(!I||!F)return null;let W=I.getAttribute("data-drop");if(W==="candidate")return{zone:I,target:{kind:"candidate"}};if(W==="parallel")return{zone:I,target:{kind:"parallel",marker_index:Y(I,w)}};if(W==="chain")return{zone:I,target:{kind:"chain",lane_id:I.getAttribute("data-lane-id")||"",marker_index:Y(I,w)}};if(W==="repo-serial"){let ye=I.getAttribute("data-root-dir")||"";if(ye!==F.root_dir)return null;let we=typeof w?.closest=="function"?w.closest("[data-queue-index]"):null,be=we&&I.contains(we)?we.getAttribute("data-queue-index"):I.getAttribute("data-lane-length"),tt=Number(be);return{zone:I,target:{kind:"repo-serial",root_dir:ye,lane_id:I.getAttribute("data-lane-id")||"",index:Number.isFinite(tt)?tt:0}}}return null}function he(){for(let k of Array.from(O.querySelectorAll(".is-drop-over")))k.classList.remove("is-drop-over")}function Ee(k){let w=k.target,I=typeof w?.closest=="function"?w.closest('[draggable="true"][data-bead-id]'):null,W=I?I.closest("[data-drag-kind]"):null;if(!W)return;let ye=W.getAttribute("data-bead-id")||"",we=W.getAttribute("data-drag-kind")||"",be=W.getAttribute("data-root-dir")||"";if(!ye||!we||!be)return;let tt=W.getAttribute("data-queue-index")||"",Ie=Number(tt),T=W.getAttribute("data-lane-id")||"";F={kind:we,bead_id:ye,root_dir:be,...tt!==""&&Number.isFinite(Ie)?{queue_index:Ie}:{},...T?{lane_id:T}:{}},y=!0,V=null,O.classList.add("is-dragging");try{k.dataTransfer?.setData("text/plain",ye),k.dataTransfer&&(k.dataTransfer.effectAllowed="move")}catch{}}function Fe(k){let w=xe(k);w&&(k.preventDefault(),k.dataTransfer&&(k.dataTransfer.dropEffect="move"),w.zone.classList.add("is-drop-over"))}function _t(k){let w=k.target;typeof w?.closest=="function"&&w.closest("[data-drop]")?.classList.remove("is-drop-over")}function yt(){F=null,he(),O.classList.remove("is-dragging"),M()}function Ze(k){let w=xe(k),I=F;F=null,he(),O.classList.remove("is-dragging"),!(!w||!I)&&(k.preventDefault(),ct(I,w.target))}function Ft(k){return{runner:k.runner||void 0,model:k.model||void 0,effort:k.effort||void 0,status:k.run_state==="running"?"running":k.run_state,worktree:k.root_dir}}function zt(k,w){let{item:I,root_dir:W,revision:ye}=ht(w),we=I?.attempt_id||"",be=k.classList;if(be.contains("worker-dep__remove")){pt("dep-remove",w,k.dataset.blockerId||"");return}if(be.contains("mon2-rowops__up")||be.contains("mon2-rowops__down")){X(w,be.contains("mon2-rowops__up")?-1:1);return}if(be.contains("mon2-rowops__remove")){Te("worker-queue-remove",{bead_id:w},W,ye);return}if(be.contains("mon2-crow__detach")){E(w);return}if(be.contains("worker-card__place")){V=V===w?null:w,ie();return}if(be.contains("worker-card__place-cancel")){V=null,ie();return}if(be.contains("worker-card__place-lane")){let tt=k.getAttribute("data-lane")||"parallel";V=null,xt(w,tt);return}if(be.contains("rtile__session")){j=we,we&&I&&ge.open({attempt_id:we,root_dir:W,meta:Ft(I)}),ie();return}if(be.contains("rtile__pause")){N("worker-attempt-pause",{attempt_id:we},W);return}if(be.contains("rtile__resume")){kn().then(tt=>{if(tt!==null)return se("worker-attempt-resume",{attempt_id:we,...tt!==""?{instructions:tt}:{}},W,ye)});return}if(be.contains("rtile__dismiss")){Te("worker-attempt-dismiss",{attempt_id:we},W,ye);return}if(be.contains("rtile__discard")){if(!d(ps(w,"unmerged")))return;Me({bead_id:w,...we?{attempt_id:we}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},W,ye);return}if(be.contains("worker-mini__merge")){let tt=Le(W,w);tt?.mismatch&&tt.continuation===null?ae(W,w,ye,tt.mismatch):Te("worker-merge-queue-add",{bead_id:w},W,ye);return}if(be.contains("worker-mini__merge-cancel")){Te("worker-merge-queue-remove",{bead_id:w},W,ye);return}if(be.contains("worker-mini__discard")){let tt=k.dataset.discardMode==="merged"?"merged":"unmerged";if(!d(ps(w,tt)))return;Me({bead_id:w,...k.dataset.attemptId?{attempt_id:k.dataset.attemptId}:{},...k.dataset.operationId?{operation_id:k.dataset.operationId}:{}},W,ye);return}if(be.contains("worker-mini__revise-fix")){se("worker-revise-fix",{bead_id:w},W,ye);return}be.contains("worker-mini__revise-approve")&&Te("worker-revise-approve",{bead_id:w},W,ye)}function je(k){let w=y;y=!1;let I=k.target;if(!I||typeof I.closest!="function"||I.closest("dialog")||I.closest(".mon2-drawer")||I.closest("a"))return;let W=I.closest(".worker-card__id, .worker-mini__id, .rtile__id");if(W){k.preventDefault();let ft=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini")?.getAttribute("data-bead-id")||W.textContent?.trim()||"";ft&&mt(ft);return}let ye=I.closest(".worker-mini__repo, .worker-card__repo, .mon2-sec__worker");if(ye){k.preventDefault();let Re=ye.getAttribute("data-root-dir")||B.get(I.closest(".mon2-item, .rtile, .worker-mini")?.getAttribute("data-bead-id")||"")?.root_dir||ye.getAttribute("title")||"";Xe(Re);return}let we=I.closest(".mon2-sec__toggle");if(we){k.preventDefault(),ke(we.getAttribute("data-root-dir")||"");return}let be=I.closest(".mon2-area__toggle");if(be){k.preventDefault(),Ne(be.getAttribute("data-area")||"parallel");return}if(I.closest(".mon2-newlane")){k.preventDefault(),H=[...H,{seed:null}],ie();return}if(I.closest(".mon-merge-all")){k.preventDefault(),ne();return}let tt=I.closest(".mon-filter__spec");if(tt){k.preventDefault(),h={...h,spec:tt.getAttribute("data-spec")||"all"},Yu(h),ie();return}let Ie=I.closest(".mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card");if(!Ie)return;let T=Ie.getAttribute("data-bead-id")||"",ce=I.closest("button");if(ce){k.preventDefault(),zt(ce,T);return}T&&!w&&(k.preventDefault(),it(T,Ie.getAttribute("data-root-dir")||ht(T).root_dir))}function Lt(k){let w=k.target;if(!w||typeof w.closest!="function")return;let I=w.closest(".mon-filter__blocked");if(I){h={...h,show_blocked:I.checked},Yu(h),ie();return}let W=w.closest(".mon-candidate-sort");if(W){$=hs.some(be=>be.value===W.value)?W.value:"repo_spec",Gg($),ie();return}let ye=w.closest(".mon-running-sort");if(ye){_=ye.value==="repo"?"repo":"started",Qg(_),ie();return}let we=w.closest(".mon-done-range");we&&(p=ar(we.value)?we.value:er,Yg(p),ie())}e.addEventListener("click",je),e.addEventListener("change",Lt),e.addEventListener("dragstart",Ee),e.addEventListener("dragover",Fe),e.addEventListener("dragleave",_t),e.addEventListener("drop",Ze),e.addEventListener("dragend",yt),s&&typeof s.subscribe=="function"&&(Ae=s.subscribe(()=>{try{ee.clear(),ie()}catch{}}));function Ut(){Z!==null&&(clearInterval(Z),Z=null)}function Mt(){C!==null&&(clearTimeout(C),C=null)}return{load(){r("load"),ie(),Z===null&&(Z=setInterval(()=>{try{ie()}catch{}},Xg))},pause(){Ut()},clear(){Ut(),Mt(),Ae&&(Ae(),Ae=null),ge.destroy(),le?.destroy(),le=null,e.removeEventListener("click",je),e.removeEventListener("change",Lt),e.removeEventListener("dragstart",Ee),e.removeEventListener("dragover",Fe),e.removeEventListener("dragleave",_t),e.removeEventListener("drop",Ze),e.removeEventListener("dragend",yt),e.replaceChildren()}}}function od(e,t,r){let n=Tt("views:nav"),{global_element:s,repo_element:o}=e,a=null;function i(_){return h=>{h.preventDefault(),n("click tab %s",_),r.gotoView(_)}}function c(){let _=t.getState();return _.view==="worker"||_.view==="monitor"?_.view:"board"}function u(){let _=c();return l`
      <a
        href="#/monitor"
        class="ctl-tab ctl-tab--monitor ${_==="monitor"?"is-active":""}"
        @click=${i("monitor")}
      >
        <span class="ctl-tab__dots" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        Monitor
      </a>
    `}function d(){let _=c();return l`
      <div class="ctl-tabs">
        <a
          href="#/board"
          class="ctl-tab ${_==="board"?"is-active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${_==="worker"?"is-active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </div>
    `}function p(){s&&Ye(u(),s),o&&Ye(d(),o)}return p(),a=t.subscribe(()=>p()),{destroy(){a&&(a(),a=null),s&&Ye(l``,s),o&&Ye(l``,o)}}}var ad=["bug","feature","task","epic","chore"];function id(e){switch((e||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}var ld=["Critical","High","Medium","Low","Backlog"];function cd(e,t){let r=document.createElement("dialog");r.id="new-issue-dialog",r.setAttribute("role","dialog"),r.setAttribute("aria-modal","true"),r.innerHTML=`
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
  `,e.appendChild(r);let n=r.querySelector("#new-issue-form"),s=r.querySelector("#new-title"),o=r.querySelector("#new-type"),a=r.querySelector("#new-priority"),i=r.querySelector("#new-labels"),c=r.querySelector("#new-description"),u=r.querySelector("#new-issue-error"),d=r.querySelector("#btn-cancel"),p=r.querySelector("#btn-create"),_=r.querySelector(".new-issue__close");function h(){o.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",o.appendChild(O);for(let U of ad){let b=document.createElement("option");b.value=U,b.textContent=id(U),o.appendChild(b)}a.replaceChildren();for(let U=0;U<=4;U+=1){let b=document.createElement("option");b.value=String(U);let B=ld[U]||"Medium";b.textContent=`${U} \u2013 ${B}`,a.appendChild(b)}}h();function $(){try{typeof r.close=="function"?r.close():r.removeAttribute("open")}catch{r.removeAttribute("open")}}function L(O){s.disabled=O,o.disabled=O,a.disabled=O,i.disabled=O,c.disabled=O,d.disabled=O,p.disabled=O,p.textContent=O?"Creating\u2026":"Create"}function j(){u.textContent=""}function V(O){u.textContent=O}function H(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?o.value=O:o.value="";let U=window.localStorage.getItem("beads-ui.new.priority");U&&/^\d$/.test(U)?a.value=U:a.value="2"}catch{o.value="",a.value="2"}}function P(){let O=o.value||"",U=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),U.length>0&&window.localStorage.setItem("beads-ui.new.priority",U)}async function D(){j();let O=String(s.value||"").trim();if(O.length===0){V("Title is required"),s.focus();return}let U=Number(a.value||"2");if(!(U>=0&&U<=4)){V("Priority must be 0..4"),a.focus();return}let b=String(o.value||""),B=String(c.value||""),ee={title:O};b.length>0&&(ee.type=b),String(U).length>0&&(ee.priority=U),B.length>0&&(ee.description=B),L(!0);try{await t("create-issue",ee)}catch{L(!1),V("Failed to create issue");return}P(),L(!1),$()}return r.addEventListener("cancel",O=>{O.preventDefault(),$()}),_.addEventListener("click",()=>$()),d.addEventListener("click",()=>$()),r.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),D())}),n.addEventListener("submit",O=>{O.preventDefault(),D()}),{open(){n.reset(),j(),H();try{"showModal"in r&&typeof r.showModal=="function"?r.showModal():r.setAttribute("open","")}catch{r.setAttribute("open","")}setTimeout(()=>{try{s.focus()}catch{}},0)},close(){$()}}}var th=[["route","route \uCE69"],["fast_track","\u26A1 fast_track \uCE69"],["pr","PR \uCE69"],["from","\u21A9 from \uCE69"],["blocked","blocked \uC0AC\uC720 \uCE69"],["stepper","stepper"]];function rh(e,t){return sa(e,t)?"shown":t.hidden_labels.includes(e)?"hidden_exact":"hidden_prefix"}function ud(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">라벨 표시</div>
      <p class="settings-dialog__hint-block">
        라벨을 눌러 표시/숨김을 전환합니다. prefix 규칙으로 숨겨진 라벨을 누르면
        그 라벨만 예외로 다시 표시됩니다.
      </p>
      ${t.length===0?l`<div class="settings-dialog__empty">라벨 없음</div>`:l`<div class="settings-dialog__pills">
            ${t.map(n=>{let s=rh(n,e);return l`<button
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
  `}function dd(e,t,r){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">숨김 prefix</div>
      <div class="settings-dialog__prefixes">
        ${e.hidden_prefixes.map(n=>l`<span class="settings-dialog__prefix">
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
  `}function pd(e,t){return l`
    <section class="settings-dialog__group">
      <div class="settings-dialog__group-title">카드 표시 요소</div>
      <div class="settings-dialog__toggles">
        ${th.map(([r,n])=>l`<label class="settings-dialog__toggle">
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
  `}var nh=[{id:"execution",label:"\uC2E4\uD589",glyph:"\u25C6"},{id:"display",label:"\uD45C\uC2DC",glyph:"\u25EB"}];function fd(e,t){let{transport:r,policyStore:n,labelOptions:s}=t,o=t.notify||(ge=>me(ge,"error",4e3)),a=document.createElement("dialog");a.id="settings-dialog",a.className="settings-dialog",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.setAttribute("aria-label","\uC124\uC815"),e.appendChild(a);let i="execution",c=!1,u="",d=null;function p(){if(d)return d;let ge=a.querySelector('[data-pane="execution"]');return ge?(d=Io(ge,{root_dir:null,queue:()=>t.queueStore?.get()??null,transport:r,implPresetStore:t.implPresetStore,notify:o,onQueueAdopt:Te=>t.queueStore?.set?.(Te)}),d):null}function _(){return l`
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
    `}function h(){let ge=n.get();return l`
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
        ${ge?l`
              ${ud(ge,s(),V)}
              ${dd(ge,u,{onDraft:Te=>{u=Te},onAdd:H,onRemove:P})}
              ${pd(ge,D)}
            `:l`<div class="settings-dialog__empty">
              표시 정책을 불러오는 중…
            </div>`}
      </section>
    `}async function $(ge){let Te=n.get();if(Te)try{let Le=await r("display-policy-set",{expected_revision:Te.revision,policy:ge(Te)});L(Le),Le&&Le.conflict&&Le.policy&&(Le=await r("display-policy-set",{expected_revision:Le.policy.revision,policy:ge(Le.policy)}),L(Le)),Le&&Le.conflict&&o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328: \uB2E4\uB978 \uD074\uB77C\uC774\uC5B8\uD2B8\uC640 \uCDA9\uB3CC")}catch{o("\uD45C\uC2DC \uC124\uC815 \uC800\uC7A5 \uC2E4\uD328")}}function L(ge){ge&&ge.policy&&typeof ge.policy=="object"&&n.set(ge.policy)}function j(ge){$(ge)}function V(ge){let Te=n.get();if(!Te)return;let Le=!sh(ge,Te);j(se=>oh(ge,se,Le))}function H(){let ge=u.trim();ge.length!==0&&(u="",j(Te=>Te.hidden_prefixes.includes(ge)?{hidden_prefixes:Te.hidden_prefixes}:{hidden_prefixes:[...Te.hidden_prefixes,ge]}),O())}function P(ge){j(Te=>({hidden_prefixes:Te.hidden_prefixes.filter(Le=>Le!==ge)}))}function D(ge){let Te=n.get();if(!Te)return;let Le=Te.chips[ge]===!1;j(()=>({chips:{[ge]:Le}}))}function O(){Ye(l`
        <div class="settings-dialog__container">
          <nav
            class="settings-dialog__rail"
            role="tablist"
            aria-orientation="vertical"
          >
            <div class="settings-dialog__rail-title">설정</div>
            ${nh.map(ge=>l`<button
                  type="button"
                  class="settings-dialog__tab"
                  role="tab"
                  data-tab=${ge.id}
                  aria-selected=${String(i===ge.id)}
                  aria-controls=${`settings-pane-${ge.id}`}
                  @click=${()=>U(ge.id)}
                >
                  <span class="settings-dialog__glyph">${ge.glyph}</span>
                  ${ge.label}
                </button>`)}
            <button
              type="button"
              class="settings-dialog__close"
              aria-label="닫기"
              @click=${le}
            >
              닫기
            </button>
          </nav>
          <div class="settings-dialog__panes">
            ${_()} ${h()}
          </div>
        </div>
      `,a),p()}function U(ge){i=ge,O()}let b=()=>{c=!1,t.onOpenChange?.(!1)};a.addEventListener("close",b),a.addEventListener("cancel",b);let B=ge=>{ge.target===a&&le()};a.addEventListener("click",B);let ee=null;n.subscribe&&(ee=n.subscribe(()=>{c&&O()}));let Ae=null;t.implPresetStore?.subscribe&&(Ae=t.implPresetStore.subscribe(()=>{c&&d?.render()}));function Z(ge="execution"){c||(c=!0,t.onOpenChange?.(!0),i=ge,u="",O(),typeof a.showModal=="function"?a.showModal():a.setAttribute("open",""),p()?.load())}function le(){c&&(c=!1,t.onOpenChange?.(!1),typeof a.close=="function"?a.close():a.removeAttribute("open"))}return{open:Z,close:le,sessionDraft:()=>d?.sessionDraft()??{},destroy(){c=!1,a.removeEventListener("close",b),a.removeEventListener("cancel",b),a.removeEventListener("click",B),ee&&(ee(),ee=null),Ae&&(Ae(),Ae=null),d?.destroy(),d=null,a.remove()}}}function sh(e,t){return t.visible_labels.includes(e)?!0:t.hidden_labels.includes(e)?!1:!t.hidden_prefixes.some(r=>r.length>0&&e.startsWith(r))}function oh(e,t,r){if(!r)return{hidden_labels:t.hidden_labels.includes(e)?t.hidden_labels:[...t.hidden_labels,e],visible_labels:t.visible_labels.filter(o=>o!==e)};let n=t.hidden_labels.filter(o=>o!==e);return t.hidden_prefixes.some(o=>o.length>0&&e.startsWith(o))?{hidden_labels:n,visible_labels:t.visible_labels.includes(e)?t.visible_labels:[...t.visible_labels,e]}:{hidden_labels:n}}var ah=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],_d="usage-meter-card",ih="usage-meter-layer",md=600,lh=["token_expired","relogin_required"];function gd(e){return String(e).padStart(2,"0")}function ch(e,t){let r=Math.max(0,Math.ceil((e-t)/6e4)),n=Math.floor(r/1440),s=Math.floor(r%1440/60),o=r%60;return n>0?`${n}d${s>0?` ${s}h`:""}`:s>0?`${s}h${o>0?` ${o}m`:""}`:`${o}m`}function hd(e,t=Date.now()){let r=Date.parse(e);if(!Number.isFinite(r))return"";let n=new Date(r),s=new Date(t),o=`${gd(n.getHours())}:${gd(n.getMinutes())}`,i=n.getFullYear()===s.getFullYear()&&n.getMonth()===s.getMonth()&&n.getDate()===s.getDate()?o:`${ah[n.getMonth()]} ${n.getDate()} ${o}`;return`${ch(r,t)} \xB7 ${i}`}function uh(e){let t=Math.max(0,Math.floor(e));return t<60?`${t}\uCD08 \uC804`:t<3600?`${Math.floor(t/60)}\uBD84 \uC804`:`${Math.floor(t/3600)}\uC2DC\uAC04 \uC804`}function bd(e){return e>=85?"usage-meter__window--danger":e>=60?"usage-meter__window--warn":"usage-meter__window--success"}function yd(e){let t=typeof e=="number"&&Number.isFinite(e)?e:0;return Math.min(100,Math.max(0,t))}var vd=[{key:"claude",label:"Claude",endpoint:"/api/claude-usage",switch_endpoint:"/api/claude-account/switch",tool:"cswap"},{key:"codex",label:"Codex",endpoint:"/api/codex-usage",switch_endpoint:"/api/codex-account/switch",tool:"codex-auth"}];function kd(e){let t=[];for(let r of e){if(!r||typeof r!="object")continue;let n=r;typeof n.key!="string"||n.key.length===0||typeof n.pct!="number"||!Number.isFinite(n.pct)||t.push({key:n.key,pct:n.pct,resetsAt:typeof n.resetsAt=="string"?n.resetsAt:""})}return t}function dh(e){if(!e||typeof e!="object")return null;let t=e;return!Number.isInteger(t.number)||t.number<=0||typeof t.email!="string"||t.email.length===0||typeof t.status!="string"||t.status.length===0||typeof t.active!="boolean"||!Array.isArray(t.windows)?null:{number:t.number,email:t.email,alias:typeof t.alias=="string"&&t.alias.length>0?t.alias:null,plan:typeof t.plan=="string"&&t.plan.length>0?t.plan:null,active:t.active,status:t.status,windows:kd(t.windows),fetchedAt:typeof t.fetchedAt=="string"?t.fetchedAt:null,ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null}}function ph(e){if(!e||typeof e!="object")return null;let t=e,r=[];if(Array.isArray(t.accounts))for(let s of t.accounts){let o=dh(s);o&&r.push(o)}let n=t.available===!0&&Array.isArray(t.windows);return!n&&r.length===0?null:{available:n,windows:n?kd(t.windows):[],ageSeconds:typeof t.ageSeconds=="number"&&Number.isFinite(t.ageSeconds)?t.ageSeconds:null,accounts:r}}function wd(e,t){return`${e}:${t}`}function $d(e){let t=!1,r=null,n=new Map,s=null,o=new Map,a=new Map,i=0,c=null;function u(){Ye(l``,e),e.hidden=!0,p()}function d(){if(c===null){let se=e.ownerDocument;c=se.createElement("div"),c.id=ih,c.className="usage-meter__layer",se.body.appendChild(c)}return c}function p(){c!==null&&(Ye(l``,c),c.remove(),c=null)}function _(se){r!==se&&(r===null&&(document.addEventListener("mousedown",$),document.addEventListener("keydown",j),window.addEventListener("resize",L)),r=se)}function h(){r!==null&&(r=null,document.removeEventListener("mousedown",$),document.removeEventListener("keydown",j),window.removeEventListener("resize",L))}function $(se){let ae=se.target;ae&&(e.contains(ae)||c!==null&&c.contains(ae))||(h(),le())}function L(){le()}function j(se){se.key==="Escape"&&(h(),le())}function V(se){r===se?h():_(se),le()}function H(){h(),le()}async function P(se,ae){if(n.has(se.key))return;let Me=wd(se.key,ae);n.set(se.key,ae),a.delete(Me),le();let N=null;try{N=await(await fetch(se.switch_endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({number:ae})})).json()}catch{N=null}if(t)return;if(n.delete(se.key),!N||N.ok!==!0){let oe=N&&typeof N.error=="string"&&N.error.length>0?N.error:"network_error";a.set(Me,{kind:"error",text:`\uC804\uD658 \uC2E4\uD328 \u2014 ${oe}`}),le();return}let ne=Array.isArray(N.warnings)?N.warnings.filter(oe=>typeof oe=="string"&&oe.length>0):[];ne.length>0&&a.set(Me,{kind:"warn",text:ne.join(" \xB7 ")}),le(),await Le()}function D(se,ae,Me,N){let ne=yd(se.pct),ke=`resets ${hd(se.resetsAt,N)}${ae?` \xB7 ${Me}`:""}`;return l`<span
      class="usage-meter__window ${bd(ne)}"
      style=${`--progress: ${ne}%`}
      title=${ke}
    >
      <span class="usage-meter__label">${se.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${ne}%</span>
    </span>`}function O(se,ae,Me){let N=ae.available&&typeof ae.ageSeconds=="number"&&ae.ageSeconds>md,ne=N&&typeof ae.ageSeconds=="number"?`${Math.floor(ae.ageSeconds/60)}\uBD84 \uC804 \uCE21\uC815`:"",oe=ae.accounts.filter(x=>!x.active).length,ke=`usage-meter__group${N?" usage-meter__group--stale":""}`,Ce=l`<span class="usage-meter__provider"
        >${se.label}</span
      >
      ${ae.available?ae.windows.map(x=>D(x,N,ne,Me)):l`<span class="usage-meter__empty">사용량 없음</span>`}
      ${oe>0?l`<span class="usage-meter__badge">+${oe}</span>`:""}`;if(ae.accounts.length===0)return l`<span
        class=${ke}
        aria-label=${`${se.label} usage`}
        >${Ce}</span
      >`;let Ne=r===se.key;return l`<button
      type="button"
      class=${`usage-meter__toggle ${ke}`}
      aria-label=${`${se.label} usage`}
      aria-expanded=${Ne?"true":"false"}
      aria-controls=${_d}
      @click=${()=>V(se.key)}
    >
      ${Ce}
    </button>`}function U(se,ae){return l`<span class="usage-meter" aria-label="Usage">
      ${se.map(Me=>O(Me.provider,Me.snapshot,ae))}
    </span>`}function b(se,ae){let Me=yd(se.pct),N=hd(se.resetsAt,ae);return l`<span
      class="usage-meter__account-window ${bd(Me)}"
      style=${`--progress: ${Me}%`}
    >
      <span class="usage-meter__account-key">${se.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${Me}%</span>
      <span class="usage-meter__account-reset"
        >${N.length>0?`\u21BB ${N}`:""}</span
      >
    </span>`}function B(se,ae){return lh.includes(ae)?`\uD1A0\uD070 \uB9CC\uB8CC \u2014 ${se.tool} \uC7AC\uB85C\uADF8\uC778 \uD544\uC694`:"\uC0AC\uC6A9\uB7C9 \uC5C6\uC74C"}function ee(se,ae,Me){let N=ae.status==="ok",ne=typeof ae.ageSeconds=="number"&&ae.ageSeconds>md,oe=a.get(wd(se.key,ae.number)),ke=n.get(se.key),Ce=ke!==void 0,Ne=ke===ae.number,x=["usage-meter__account"];return ae.active&&x.push("usage-meter__account--active"),N||x.push("usage-meter__account--unavailable"),ne&&x.push("usage-meter__account--stale"),l`<div class=${x.join(" ")}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${ae.email}
          >${ae.alias===null?ae.email:ae.alias}</span
        >
        ${ae.plan===null?"":l`<span class="usage-meter__account-tag">${ae.plan}</span>`}
        ${ae.active?l`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`:""}
        ${ae.ageSeconds===null?"":l`<span class="usage-meter__account-age"
              >${uh(ae.ageSeconds)}</span
            >`}
        ${ae.active?"":l`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${Ce}
              @click=${()=>{P(se,ae.number)}}
            >
              ${Ne?"\uC804\uD658 \uC911\u2026":"\uC804\uD658"}
            </button>`}
      </div>
      ${N?l`<div class="usage-meter__account-windows">
            ${ae.windows.map(fe=>b(fe,Me))}
          </div>`:l`<div class="usage-meter__account-status">
            ${B(se,ae.status)}
          </div>`}
      ${oe===void 0?"":l`<div
            class="usage-meter__account-message usage-meter__account-message--${oe.kind}"
          >
            ${oe.text}
          </div>`}
    </div>`}function Ae(se,ae,Me){let N=ae.accounts.filter(ne=>ne.active).length;return l`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${se.label} · 활성 ${N} / 전체
        ${ae.accounts.length}
      </h2>
      ${ae.accounts.map(ne=>ee(se,ne,Me))}
    </section>`}function Z(se,ae){return l`<div
      class="usage-meter__card"
      id=${_d}
      role="dialog"
      aria-label=${`${se.provider.label} \uACC4\uC815 \uC0AC\uC6A9\uB7C9`}
    >
      ${Ae(se.provider,se.snapshot,ae)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`}function le(){let se=[];for(let N of vd){let ne=o.get(N.key);ne&&se.push({provider:N,snapshot:ne})}if(se.length===0){h(),u();return}let ae=se.find(N=>N.provider.key===r&&N.snapshot.accounts.length>0);ae||h();let Me=Date.now();Ye(U(se,Me),e),e.hidden=!1,ae?ge(ae,Me):p()}function ge(se,ae){let Me=d(),N=e.getBoundingClientRect(),ne=e.ownerDocument.documentElement.clientWidth;Me.style.setProperty("--usage-meter-anchor-top",`${N.bottom}px`),Me.style.setProperty("--usage-meter-anchor-right",`${Math.max(0,ne-N.right)}px`),Ye(l`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${H}
        ></div>
        ${Z(se,ae)}`,Me)}async function Te(se){try{let ae=await fetch(se.endpoint);return ae.ok?ph(await ae.json()):null}catch{return null}}async function Le(){i+=1;let se=i,ae=await Promise.all(vd.map(async Me=>({provider:Me,snapshot:await Te(Me)})));if(!(t||se!==i)){for(let Me of ae)Me.snapshot?o.set(Me.provider.key,Me.snapshot):o.delete(Me.provider.key);le()}}return u(),Le(),s=setInterval(()=>{Le()},6e4),{destroy(){t=!0,s!==null&&(clearInterval(s),s=null),h(),u()}}}function xd(e){let t=e.attempts?Object.values(e.attempts):[],r=new Map;for(let s of t)s&&r.set(s.bead_id,s.attempt_id);let n=new Map;for(let s of e.done||[])s&&typeof s.bead_id=="string"&&typeof s.added_at=="number"&&n.set(s.bead_id,s.added_at);return s=>{let o=r.get(s.bead_id)!==s.attempt_id,a=n.get(s.bead_id),i=typeof a=="number"&&a>0&&typeof s.finished_at=="number"&&a>=s.finished_at;return!o&&!i&&typeof s.dismissed_at!="number"}}var fh="worker-ineligible";function ci(e){return Array.isArray(e)?e.filter(t=>typeof t=="string"):[]}function Ad(e){return ci(e).includes(fh)}var _h="worker-serial";function ui(e){return ci(e).includes(_h)}function di(e,t,r){if(typeof t!="string"||typeof r!="string")return[];let n=e?.runners;if(!n||!Object.hasOwn(n,t))return[];let s=n[t],o=s?.models;if(!o||!Object.hasOwn(o,r))return[];let a=o[r]?.efforts;return Array.isArray(a)?a.slice():Array.isArray(s.efforts)?s.efforts.slice():[]}var mh=new Set(["done","failed","orphaned","stopped","discarded"]),gh={spec_missing:"\uC2A4\uD399 \uC5C6\uC74C",route:"route \uBBF8\uB2EC",spec_review:"\uC2A4\uD399 \uB9AC\uBDF0 \uC5C6\uC74C",spec_conflict:"\uC2A4\uD399 \uCDA9\uB3CC",phase_child:"phase child",worker_ineligible:"worker \uC81C\uC678"},hh={running:"\uC2E4\uD589 \uC911",success:"\uC131\uACF5",failure:"\uC2E4\uD328",cancelled:"\uCDE8\uC18C",interrupted:"\uC911\uB2E8"},bh={running:"running",success:"done",failure:"failed",cancelled:"stopped",interrupted:"orphaned"};function pi(e){return{runner:e.runner||void 0,model:e.model||void 0,effort:e.effort||void 0,status:bh[e.outcome]||(typeof e.job_id=="string"?"running":void 0),session_id:e.session_id||void 0}}function Sd(e,t){let{queueStore:r,analysisStore:n,transport:s,getWorkspacePath:o,onOpenTranscript:a}=t,i=document.createElement("dialog");i.id="worker-parallel-analysis-dialog",i.className="pa",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),e.appendChild(i);let c=new Map,u=new Map,d=!1,p=null,_=null,h=null,$=new Set,L=!1,j=0,V=null,H=new Set;function P(){return r&&r.get()||{revision:0,queue:[],serial_lanes:[],serial_lane_count:0,attempts:{},pr_wait:[]}}function D(){return n&&n.get()||{settings:{revision:0,runner:null,model:null,effort:null},job:null,runs:[],last_good:null}}function O(){return o&&o()||""}async function U(){if(!s)return;let y=++j;L=!0,h=null,$.clear(),He();try{let C=await s("worker-parallel-analysis-targets",{root_dir:O()});if(y!==j||!et)return;let M=Array.isArray(C?.qualified)?C.qualified:[],Y=Array.isArray(C?.excluded)?C.excluded:[];h={qualified:M,excluded:Y};for(let xe of M)xe&&typeof xe.id=="string"&&$.add(xe.id)}catch{y===j&&et&&(h={qualified:[],excluded:[]},me("\uBD84\uC11D \uB300\uC0C1\uC744 \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800))}finally{y===j&&(L=!1,et&&He())}}function b(y){return Array.isArray(y.runs)?y.runs:[]}function B(){let y=P(),C=new Set;for(let M of Object.values(y.attempts||{})){let Y=M;Y&&typeof Y.bead_id=="string"&&!mh.has(Y.status)&&C.add(Y.bead_id)}for(let M of Array.isArray(y.pr_wait)?y.pr_wait:[])M&&typeof M.bead_id=="string"&&C.add(M.bead_id);for(let M of Object.values(y.discard_operations||{})){let Y=M;Y&&Y.phase!=="done"&&typeof Y.bead_id=="string"&&C.add(Y.bead_id)}return C}function ee(y){return y.filter(C=>Ae(C)===null)}function Ae(y){let C=P();for(let M of Array.isArray(C.serial_lanes)?C.serial_lanes:[])if(Array.isArray(M?.entries)&&M.entries.some(Y=>Y.bead_id===y))return M.id;return(Array.isArray(C.queue)?C.queue:[]).some(M=>M.bead_id===y)?"parallel":null}function Z(y,C){let M=c.get(y);return M||[...C.order]}function le(y){if(y.length<2)return!1;let C=Ae(y[0]);if(!C||C==="parallel")return!1;let M=P(),Y=(Array.isArray(M.serial_lanes)?M.serial_lanes:[]).find(he=>he.id===C)?.entries.map(he=>he.bead_id);if(!Array.isArray(Y))return!1;let xe=y.map(he=>Y.indexOf(he));return xe.every(he=>he>=0)&&xe.every((he,Ee)=>Ee===0||he>xe[Ee-1])}function ge(){let y=P(),C=Array.isArray(y.serial_lanes)?y.serial_lanes:[],M=C.find(Y=>Array.isArray(Y.entries)&&Y.entries.length===0);return M?M.id:C[0]?.id||"s1"}function Te(y){let C=P().bead_titles||{};return typeof C[y]=="string"?C[y]:y}async function Le(y,C){if(!s||d)return null;d=!0,He();try{return await s(y,C)}finally{d=!1,He()}}async function se(y){n?.setPending?.(!0);try{let C=await Le("worker-parallel-analysis-start",{force:y,target_ids:Array.from($)});C&&C.applied===!1&&C.reason&&(C.reason==="target_not_qualified"&&Array.isArray(C.detail)?me(`\uBD84\uC11D \uB300\uC0C1 \uC790\uACA9 \uBCC0\uACBD: ${C.detail.join(", ")}`,"error",3200):me(`\uBD84\uC11D \uC2E4\uD328: ${C.reason}`,"error",2800))}finally{n?.setPending?.(!1)}}async function ae(){let y=D().job;!s||!y||await s("worker-parallel-analysis-cancel",{job_id:y.job_id})}async function Me(y){if(!(!s||H.has(y))){H.add(y),He();try{let C=await s("worker-parallel-analysis-prompt",{root_dir:O(),run_id:y});if(!et)return;if(C?.ok===!0&&typeof C.prompt=="string"){V={run_id:y,prompt:C.prompt};return}me(C?.reason==="not_found"?"\uC800\uC7A5\uB41C \uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":"\uBD84\uC11D \uD504\uB86C\uD504\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4","error",2800)}finally{H.delete(y),He()}}}function N(){V=null,He()}async function ne(){if(!V)return;let y=await rr(V.prompt);me(y?"\uBCF5\uC0AC\uB428":"\uBCF5\uC0AC \uC2E4\uD328",y?"success":"error",1400)}function oe(y,C){a&&a(y,pi(C))}function ke(){return P().runner_catalog}function Ce(y){return Object.keys(ke()?.runners?.[y]?.models||{})}function Ne(y){let C=Ce(y),M=ke()?.runners?.[y]?.default_model;return typeof M=="string"&&C.includes(M)?M:C[0]||""}function x(){let y=D().settings,C=p||y.runner||"claude",M=Ce(C),Y=p?Ne(C):y.model||M[0]||"",xe=di(ke(),C,Y),he=y.effort||"",Ee=xe.includes(he)?he:xe[0]||"";return{runner:C,model:Y,effort:Ee,models:M,efforts:xe}}async function fe(y){let C=D().settings,M=await Le("worker-parallel-analysis-settings-update",{expected_revision:C.revision,runner:y.runner,model:y.model,effort:y.effort});(!M||M.applied!==!0)&&(p=null,He(),M&&M.reason&&me(`\uBD84\uC11D \uC124\uC815 \uAC70\uBD80: ${M.reason}`,"error",2800))}function De(y){p=y,He();let C=x();fe({runner:y,model:C.model,effort:C.effort})}function ve(y){let C=x(),M=di(ke(),C.runner,y);fe({runner:C.runner,model:y,effort:M.includes(C.effort)?C.effort:M[0]||""})}function ze(y){let C=x();fe({runner:C.runner,model:C.model,effort:y})}async function We(y,C){if(!s||d)return;let M=Z(y,C),Y=D();if(M.length<2||!Y.last_good){me("\uC81C\uCD9C\uD558\uB824\uBA74 2\uAC1C \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4","warning");return}let xe=u.get(y)||ge(),he=()=>({snapshot_digest:Y.last_good.identity_digest,group_index:y,lane:xe,ordered_bead_ids:M,expected_revision:P().revision});d=!0,He();try{let Ee=await s("worker-parallel-analysis-submit",he());Ee&&Ee.queue&&r&&r.set(Ee.queue),Ee&&Ee.applied!==!0&&Ee.conflict===!0&&(Ee=await s("worker-parallel-analysis-submit",he()),Ee&&Ee.queue&&r&&r.set(Ee.queue)),Ee&&Ee.applied===!0?(c.delete(y),me(`\uC9C1\uB82C \uB808\uC778 ${xe}\uC5D0 ${M.length}\uAC1C \uBC30\uCE58`,"success")):me(`\uC81C\uCD9C \uAC70\uBD80: ${Ee?.reason||"conflict"} (\uD050 \uBB34\uBCC0\uACBD)`,"error",2800)}finally{d=!1,He()}}function Ve(y,C,M){c.set(y,Z(y,C).filter(Y=>Y!==M)),He()}function Je(y){c.delete(y),He()}function ot(y,C,M,Y){let xe=[...Z(y,C)],he=xe.indexOf(M),Ee=he+Y;he<0||Ee<0||Ee>=xe.length||(xe.splice(Ee,0,...xe.splice(he,1)),c.set(y,xe),He())}function K(){let y=D().settings,C=Object.keys(ke()?.runners||{}),M=x();return l`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${Y=>De(Y.target.value)}
        >
          ${C.map(Y=>l`<option
                value=${Y}
                ?selected=${M.runner===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${Y=>ve(Y.target.value)}
        >
          ${M.models.map(Y=>l`<option
                value=${Y}
                ?selected=${M.model===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${Y=>ze(Y.target.value)}
        >
          ${M.efforts.map(Y=>l`<option
                value=${Y}
                ?selected=${M.effort===Y}
              >
                ${Y}
              </option>`)}
        </select>
      </label>
      ${Q(y)}
    </div>`}function Q(y){return!Qe(y)||Se(y)?l`<span class="pa-settings__unset">분석 모델 설정 필요</span>`:y.compatible===!1?l`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${y.runner}/${y.model} · effort
        ${y.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`:y.is_default===!0?l`<span class="pa-settings__default">기본값</span>`:""}function Se(y){return y.is_default===!0&&y.compatible===!1}function Qe(y){return!!(y.runner&&y.model&&y.effort)}function Ge(y){return Qe(y)&&y.compatible!==!1}function pe(y){let C=Math.max(0,Math.floor(y/1e3)),M=Math.floor(C/60),Y=C%60;return`${M}:${String(Y).padStart(2,"0")}`}function R(y){let C=y.job;if(C){let M=typeof C.started_at=="number"?C.started_at:0,Y=`${C.runner||"?"}/${C.model||"?"}`,xe=M?` \xB7 \uACBD\uACFC ${pe(Date.now()-M)}`:"",he=typeof C.session_id=="string"?C.session_id:"",Ee=b(y).find(Fe=>Fe.run_id===C.job_id);return l`<span class="pa-meta__progress">
        <span
          >분석 중 — ${Y} · effort ${C.effort||"?"}${xe}</span
        >
        ${he?l`<code class="pa-session-id" title=${he}
              >${he.slice(0,8)}</code
            >`:""}
        <button
          type="button"
          class="pa-monitor"
          @click=${()=>oe(C.job_id,Ee||C)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${Ee?.prompt_saved!==!0||H.has(C.job_id)}
          @click=${()=>{Me(C.job_id)}}
        >
          프롬프트
        </button>
      </span>`}return J()?l`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`:""}function J(){return n?.isPending?.()===!0}function ie(y){let C=!!y.job,M=Ge(y.settings),Y=h!==null&&$.size===0,xe=C||d||J()||L;return l`<div class="pa-meta">
      ${y.last_good?l`<span class="pa-meta__at"
            >분석 ${new Date(y.last_good.at||0).toLocaleString()}</span
          >`:l`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${R(y)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!M||xe||Y}
        @click=${()=>{se(!1)}}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!M||xe||Y}
        @click=${()=>{se(!0)}}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!C}
        @click=${()=>{ae()}}
      >
        취소
      </button>
    </div>`}function te(y){return typeof y=="string"&&y.length>0?y:"\uBBF8\uBC30\uCE58"}function qe(y,C){C?$.add(y):$.delete(y),He()}function at(y){let C=Array.isArray(y.scope)?y.scope:[],M=Array.isArray(y.overlaps)?y.overlaps:[];return C.length===0&&M.length===0?l``:l`<span class="pa-target__signals">
      ${C.length>0?l`<details class="pa-target__scope" title=${C.join(`
`)}>
            <summary>scope ${C.length}</summary>
            <ul>
              ${C.map(Y=>l`<li><code>${Y}</code></li>`)}
            </ul>
          </details>`:""}
      ${M.length>0?l`<span
            class="pa-target__overlaps"
            title=${`\uACB9\uCE68: ${M.join(", ")}`}
            >겹침 ${M.join(", ")}</span
          >`:""}
    </span>`}function it(){let y=h?.qualified||[],C=h?.excluded||[];return l`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${L?"\uC870\uD68C \uC911\u2026":`\uC790\uACA9 ${y.length} \xB7 \uC81C\uC678 ${C.length}`}</span
        >
      </header>
      ${h&&y.length>0?l`<ul class="pa-targets__list">
            ${y.map(M=>l`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${M.id}
                      .checked=${$.has(M.id)}
                      @change=${Y=>qe(M.id,Y.target.checked)}
                    />
                    <span class="pa-target__title">${M.title}</span>
                  </label>
                  <span class="pa-target__meta">
                    ${at(M)}
                    <span class="pa-target__route">${M.route}</span>
                    <span class="pa-target__lane"
                      >${te(M.lane)}</span
                    >
                  </span>
                </li>`)}
          </ul>`:h&&y.length===0?l`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`:""}
      ${h&&C.length>0?l`<details class="pa-targets__excluded">
            <summary>제외 대상 ${C.length}</summary>
            <ul class="pa-targets__list">
              ${C.map(M=>l`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${M.title}</span>
                    </label>
                    <span class="pa-target__meta">
                      <span class="pa-target__reason"
                        >${gh[M.reason]||M.reason}</span
                      >
                      <span class="pa-target__lane"
                        >${te(M.lane)}</span
                      >
                    </span>
                  </li>`)}
            </ul>
          </details>`:""}
    </section>`}function Xe(y){let C=typeof y.session_id=="string"&&y.session_id.length>0,M=C?y.session_id:"";return l`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${y.outcome}"
        >${hh[y.outcome]||y.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(y.started_at||0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${y.runner||"?"} / ${y.model||"?"} / ${y.effort||"?"}</span
      >
      ${C?l`<code class="pa-session-id" title=${M}
            >${M.slice(0,8)}</code
          >`:l`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${y.outcome==="failure"&&y.reason?l`<span class="pa-run-row__reason">${y.reason}</span>`:""}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${()=>oe(y.run_id,y)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${y.prompt_saved!==!0||H.has(y.run_id)}
          @click=${()=>{Me(y.run_id)}}
        >
          프롬프트
        </button>
      </span>
    </li>`}function mt(y){return l`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${y.length>0?l`<ul class="pa-runs__list">
            ${y.map(C=>Xe(C))}
          </ul>`:l`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`}function ht(){return V?l`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${N}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${V.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${()=>{ne()}}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${N}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${V.prompt}</pre
        >
      </section>
    </div>`:""}function bt(y,C){let M=Z(y,C),Y=B(),xe=M.filter(Ze=>Y.has(Ze)),he=ee(M),Ee=le(M),Fe=Array.isArray(P().serial_lanes)?P().serial_lanes:[],_t=u.get(y)||ge(),yt=C.eligible!==!0||M.length<2||xe.length>0||he.length>0||Ee||d;return l`<section class="pa-group" data-group-index=${String(y)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${C.confidence}</span>
        ${C.categories.map(Ze=>l`<span class="pa-group__category">${Ze}</span>`)}
        ${Ee?l`<span class="pa-group__applied">✓ 이미 반영됨</span>`:""}
        ${C.eligible===!0?"":l`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
        ${he.length>0?l`<span class="pa-group__stale"
              >stale — ${he.join(", ")} 대기 영역 이탈</span
            >`:""}
      </header>
      <p class="pa-group__reason">${C.reason}</p>
      <ol class="pa-group__members">
        ${M.map((Ze,Ft)=>l`<li class="pa-member" data-bead-id=${Ze}>
              <span class="pa-member__seq">${Ft+1}</span>
              <span class="pa-member__title">${Te(Ze)}</span>
              ${Y.has(Ze)?l`<span class="pa-member__active">실행 중</span>`:""}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${Ze}
                ?disabled=${Ft===0}
                aria-label=${`${Ze} \uC704\uB85C`}
                @click=${()=>ot(y,C,Ze,-1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${Ze}
                ?disabled=${Ft===M.length-1}
                aria-label=${`${Ze} \uC544\uB798\uB85C`}
                @click=${()=>ot(y,C,Ze,1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${Ze}
                aria-label=${`${Ze} \uC81C\uC678`}
                @click=${()=>Ve(y,C,Ze)}
              >
                ✕
              </button>
            </li>`)}
      </ol>
      <ul class="pa-group__evidence">
        ${C.evidence.map(Ze=>l`<li class="pa-evidence">
              <code>${Ze.path}</code>
              <span class="pa-evidence__locator">${Ze.locator}</span>
            </li>`)}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${()=>Je(y)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${Ze=>{u.set(y,Ze.target.value),He()}}
          >
            ${Fe.map((Ze,Ft)=>l`<option
                  value=${Ze.id}
                  ?selected=${_t===Ze.id}
                >
                  직렬 ${Ft+1}
                </option>`)}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${yt}
          @click=${()=>{We(y,C)}}
        >
          제출
        </button>
      </footer>
    </section>`}function pt(y){let C=Array.isArray(y.issues)?y.issues:[],M=C.filter(xe=>xe.verdict==="parallel_ok").length,Y=C.filter(xe=>xe.verdict==="uncertain").length;return l`<div class="pa-summary">
      <span>parallel_ok ${M}</span>
      <span>uncertain ${Y}</span>
    </div>`}function wt(){let y=et&&!!D().job;if(y&&_===null){_=setInterval(()=>He(),1e3);return}!y&&_!==null&&(clearInterval(_),_=null)}function He(){let y=D();p&&y.settings.runner===p&&(p=null);let C=y.last_good?.result;wt(),Ye(l`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${F}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${K()} ${ie(y)} ${it()}
            ${C?l`${C.groups.map((M,Y)=>bt(Y,M))}
                ${C.groups.length===0?l`<p class="pa-empty">직렬 권장 그룹 없음</p>`:""}
                ${pt(C)}`:l`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
            ${mt(b(y))}
          </div>
        </div>
        ${ht()}
      `,i)}let et=!1,Pe=()=>{et=!1,V=null,j+=1,wt()},ct=y=>{y.target===y.currentTarget&&F()};i.addEventListener("close",Pe),i.addEventListener("cancel",Pe),i.addEventListener("click",ct);let xt=null;r&&r.subscribe&&(xt=r.subscribe(()=>{et&&He()}));let X=null;n&&n.subscribe&&(X=n.subscribe(()=>{et&&He()}));function E(){et||(et=!0,He(),U(),typeof i.showModal=="function"?i.showModal():i.setAttribute("open",""))}function F(){et&&(et=!1,V=null,j+=1,wt(),typeof i.close=="function"?i.close():i.removeAttribute("open"))}return{open:E,close:F,destroy(){et=!1,_!==null&&(clearInterval(_),_=null),i.removeEventListener("close",Pe),i.removeEventListener("cancel",Pe),i.removeEventListener("click",ct),xt&&(xt(),xt=null),X&&(X(),X=null),i.remove()}}}var Ed=new Set(["sh","bash","zsh","dash","ksh"]),Td=/('(?:[^']*)'|"(?:\\.|[^"\\])*"|#.*|\$(?:\{[^}\n]*\}|[A-Za-z_][A-Za-z0-9_]*|[?#@*!$0-9-])|\b(?:if|then|else|elif|fi|for|while|until|do|done|case|esac|in|function|select|time)\b)/g;function Cd(e){let t=e.split("/");return t[t.length-1]||""}function yh(e){let t=e.split(`
`,1)[0];if(!t.startsWith("#!"))return!1;let r=t.slice(2).trim().split(/\s+/).filter(Boolean);if(r.length===0)return!1;let n=Cd(r[0]);if(n!=="env")return Ed.has(n);let s=r.slice(1).find(o=>!o.startsWith("-")&&!o.includes("="));return s!==void 0&&Ed.has(Cd(s))}function vh(e){return e.startsWith("#")?"comment":e.startsWith("'")||e.startsWith('"')?"string":e.startsWith("$")?"variable":"keyword"}function wh(e){let t=[],r=0;Td.lastIndex=0;for(let n of e.matchAll(Td)){let s=n.index;s>r&&t.push({text:e.slice(r,s),kind:"plain"}),t.push({text:n[0],kind:vh(n[0])}),r=s+n[0].length}return r<e.length&&t.push({text:e.slice(r),kind:"plain"}),t.length===0&&t.push({text:e,kind:"plain"}),t}function kh(e){return{bad_request:"\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC774 \uC62C\uBC14\uB974\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",forbidden:"\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB294 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",lane_not_declared:"\uD604\uC7AC \uACE0\uC815 \uC120\uC5B8\uC5D0 \uD574\uB2F9 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",stale_declaration:"\uC800\uC7A5\uC18C \uC791\uC5C5 \uC120\uC5B8\uC774 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uD654\uBA74\uC5D0\uC11C \uB2E4\uC2DC \uC5F4\uC5B4 \uC8FC\uC138\uC694.",too_large:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uB108\uBB34 \uCEE4\uC11C \uD654\uBA74\uC5D0 \uD45C\uC2DC\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",unsupported_content:"\uD14D\uC2A4\uD2B8 \uD615\uC2DD\uC758 \uC2A4\uD06C\uB9BD\uD2B8\uB9CC \uD45C\uC2DC\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",unreadable:"\uACE0\uC815\uB41C \uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9\uC744 \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}[e]||"\uC2A4\uD06C\uB9BD\uD2B8\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4."}function Rd(e){let t=e.getWorkspacePath,r=e.fetchImpl||globalThis.fetch?.bind(globalThis),n=document.createElement("div");n.className="repo-ops-script-viewer-root",document.body.appendChild(n);let s=null,o="loading",a="",i="",c=0,u=null,d=!1;function p(O,U){return U?wh(O).map(b=>b.kind==="plain"?b.text:l`<span
            class="repo-ops-script-viewer__token repo-ops-script-viewer__token--${b.kind}"
            >${b.text}</span
          >`):O}function _(){if(!s)return l``;let O=o==="ready"&&yh(a),U=o==="ready"?a.split(`
`):[];return l`<div
      class="repo-ops-script-viewer"
      role="dialog"
      aria-modal="true"
      aria-label=${`\uC2A4\uD06C\uB9BD\uD2B8 \uB0B4\uC6A9: ${s.path}`}
    >
      <div
        class="repo-ops-script-viewer__backdrop"
        @click=${()=>P()}
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
              @click=${()=>{$()}}
            >
              복사
            </button>
            <button
              type="button"
              class="repo-ops-script-viewer__close"
              aria-label="스크립트 팝업 닫기"
              @click=${()=>P()}
            >
              ✕
            </button>
          </div>
        </header>
        <div class="repo-ops-script-viewer__body" aria-live="polite">
          ${o==="loading"?l`<div class="repo-ops-script-viewer__status">
                스크립트 불러오는 중…
              </div>`:o==="error"?l`<div
                  class="repo-ops-script-viewer__status repo-ops-script-viewer__status--error"
                >
                  ${i}
                </div>`:l`<div class="repo-ops-script-viewer__code" tabindex="0">
                  ${U.map((b,B)=>l`<div class="repo-ops-script-viewer__row">
                        <span
                          class="repo-ops-script-viewer__line-number"
                          aria-hidden="true"
                          >${B+1}</span
                        ><code class="repo-ops-script-viewer__code-line"
                          >${p(b,O)}</code
                        >
                      </div>`)}
                </div>`}
        </div>
      </section>
    </div>`}function h(){Ye(_(),n)}async function $(){if(o!=="ready")return;let O=await rr(a);me(O?"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC\uB428":"\uC2A4\uD06C\uB9BD\uD2B8 \uBCF5\uC0AC \uC2E4\uD328",O?"success":"error")}function L(O){O.key==="Escape"&&s&&(O.preventDefault(),P())}function j(){d||(document.addEventListener("keydown",L),d=!0)}function V(){d&&(document.removeEventListener("keydown",L),d=!1)}async function H(O,U=null){let b=++c;j(),s={...O},u=U||(document.activeElement instanceof HTMLElement?document.activeElement:null),o="loading",a="",i="",h(),n.querySelector(".repo-ops-script-viewer__close")?.focus();let ee=t?t():"";if(!ee){o="error",i="\uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uD0DD\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",h();return}if(!r){o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD \uAE30\uB2A5\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",h();return}let Ae="/api/repo-ops-script?workspace="+encodeURIComponent(ee)+"&lane="+encodeURIComponent(O.lane)+"&base_sha="+encodeURIComponent(O.base_sha);try{let Z=await r(Ae),le=await Z.json().catch(()=>({}));if(b!==c)return;if((t?t():"")!==ee){P();return}if(!Z.ok||!le||le.ok!==!0){o="error",i=kh(le&&typeof le.error=="string"?le.error:""),h();return}s={lane:le.lane,base_sha:le.base_sha,path:le.path,base_ref:le.base_ref},a=String(le.content),o="ready",h()}catch{if(b!==c)return;o="error",i="\uC2A4\uD06C\uB9BD\uD2B8 \uC694\uCCAD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.",h()}}function P(){c+=1,V(),s=null,a="",h();let O=u;u=null,O?.isConnected&&O.focus()}function D(){P(),n.remove()}return{open:H,close:P,destroy:D}}function Id(e){let t=e.queueStore,r=e.transport,n=e.onChanged||(()=>{}),s=e.onOpenScript;function o(){return t&&t.get()||{}}function a(){let b=o();return typeof b.revision=="number"?b.revision:0}function i(b){t&&b&&b.queue&&typeof b.queue=="object"&&t.set(b.queue)}function c(){let b=o().workspace_info;return b&&typeof b=="object"?b:{}}function u(b,B){return l`<span
      class="worker-repo-ops__vd-badge worker-repo-ops__vd-badge--${b}"
      >${B}</span
    >`}function d(b){if(typeof b!="number"||!Number.isFinite(b))return"";let B=b/6e4;return Number.isInteger(B)?`timeout ${B}\uBD84`:`timeout ${Math.round(b/1e3)}\uCD08`}function p(b){let B=d(b);return B?u("config",B):""}function _(b,B,ee){return l`<button
      type="button"
      class="worker-repo-ops__vd-cmd worker-repo-ops__vd-cmd--link"
      .textContent=${ee.script}
      @click=${Ae=>{s&&s({lane:b,base_sha:B.base_sha,path:ee.script,base_ref:B.base_ref},Ae.currentTarget)}}
    ></button>`}function h(){let b=o().repo_ops_opt_out;return{verify:b?.verify===!0,deploy:b?.deploy===!0}}function $(b,B){return l`<label class="worker-repo-ops__lane-run">
      <input
        type="checkbox"
        .checked=${!B}
        @change=${ee=>{H(b,!ee.target.checked)}}
      />
      이 workspace에서 실행
    </label>`}function L(b){let B=typeof b.base_sha=="string"?b.base_sha:"",ee=`${b.source_path||"repo-ops/config.toml"} @ ${b.base_ref||"?"}${B?`@${B.slice(0,7)}`:""}`,Ae=h(),Z=!!b.verify&&Ae.verify,le=!!b.deploy&&Ae.deploy;return l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">
        저장소 작업 선언
        <span class="worker-repo-ops__vd-src">${ee}</span>
      </p>
      <div
        class="worker-repo-ops__lane${Z?" worker-repo-ops__lane--skipped":""}"
        data-lane="verify"
      >
        <span class="worker-repo-ops__lane-k">머지 전 검증</span>
        <span class="worker-repo-ops__lane-v"
          >${b.verify?l`${_("verify",b,b.verify)}
              ${p(b.verify.timeout_ms)}
              ${Z?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","verify \uC5C6\uC774 \uD310\uC815")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${Z?"\uC774 workspace\uC5D0\uC11C\uB294 \uAC80\uC99D \uC5C6\uC774 \uD310\uC815\uD569\uB2C8\uB2E4.":b.verify?"\uBA38\uC9C0 \uC804\uC5D0 \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD1B5\uACFC\uD574\uC57C \uC790\uACA9\uC744 \uC5BB\uC2B5\uB2C8\uB2E4.":"\uBA38\uC9C0 \uC790\uACA9\uC740 PR/base/head \uC2E0\uC120\uB3C4\xB7mergeability\xB7\uB9AC\uBDF0 \uC601\uC218\uC99D\uC73C\uB85C\uB9CC \uD310\uC815\uD569\uB2C8\uB2E4."}</span
        >
        ${b.verify?$("verify",Ae.verify):""}
      </div>
      <div
        class="worker-repo-ops__lane${le?" worker-repo-ops__lane--skipped":""}"
        data-lane="deploy"
      >
        <span class="worker-repo-ops__lane-k">머지 후 배포</span>
        <span class="worker-repo-ops__lane-v"
          >${b.deploy?l`${_("deploy",b,b.deploy)}
              ${p(b.deploy.timeout_ms)}
              ${le?u("skipped","\uC774 workspace\uC5D0\uC11C \uAC74\uB108\uB700"):""}`:l`선언 없음${u("absent","\uBC30\uD3EC \uC5C6\uC74C")}`}</span
        >
        <span class="worker-repo-ops__lane-d"
          >${le?"\uC774 workspace\uC5D0\uC11C\uB294 \uBC30\uD3EC \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4.":b.deploy?l`Worker가 <code>.worktrees/.repo-ops-deploy</code>에서 대상
                  SHA로 정렬한 뒤 1회 실행합니다.`:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC \uB2E8\uACC4 \uC5C6\uC774 \uACE7\uBC14\uB85C \uC815\uB9AC\uB85C \uB118\uC5B4\uAC11\uB2C8\uB2E4."}</span
        >
        ${b.deploy?$("deploy",Ae.deploy):""}
      </div>
    </section>`}function j(b){let B=b.repo_ops&&typeof b.repo_ops=="object"?b.repo_ops:null;return B&&(B.status==="resolved"||B.status==="absent")?L(B):B&&(B.status==="pending"||B.status==="error")?l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
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
          ${B.status==="pending"?"\uC120\uC5B8 \uD655\uC778 \uC911":l`선언 읽기
              실패${B.error_code?l` — <code>${B.error_code}</code>`:""}`}
        </div>
      </section>`:l`<section class="worker-repo-ops__vd" data-seam="repo-ops">
      <p class="worker-repo-ops__vd-title">저장소 작업 선언</p>
      <div class="worker-repo-ops__vd-line worker-repo-ops__vd-absent">
        선언 확인 중
      </div>
    </section>`}async function V(b){if(!r)return;let B=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});if(i(B),B&&B.conflict){let ee=await r("worker-auto-repair-toggle",{on:b,expected_revision:a()});i(ee)}n()}async function H(b,B){if(!r)return;let ee=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:B,expected_revision:a()});if(i(ee),ee&&ee.conflict){let Ae=await r("worker-repo-ops-opt-out-toggle",{kind:b,opted_out:B,expected_revision:a()});i(Ae)}n()}let P={owned_deploy_worktree_fetch_detached_alignment_recreate:"\uC804\uC6A9 \uBC30\uD3EC \uC6CC\uD06C\uD2B8\uB9AC \uC815\uB82C\xB7\uBCF5\uAD6C",recovered_pre_execution_fetch_timeout_retry_once:"fetch \uD0C0\uC784\uC544\uC6C3 1\uD68C \uBCF5\uAD6C",repo_serial_lock_wait:"\uC800\uC7A5\uC18C \uC21C\uCC28 \uC2E4\uD589 \uB300\uAE30",restart_operation_adoption:"\uC7AC\uC2DC\uC791 \uD6C4 \uC791\uC5C5 \uC778\uACC4",exact_input_exit_zero_evidence_adoption:"\uB3D9\uC77C \uC785\uB825 \uC131\uACF5 \uC99D\uAC70 \uC778\uACC4",descendant_success_covers_ancestor_rows:"\uCD5C\uC2E0 SHA \uC131\uACF5\uC774 \uC774\uC804 \uD589 \uCEE4\uBC84",owned_verify_candidate_cleanup:"\uAC80\uC99D \uC784\uC2DC \uCCB4\uD06C\uC544\uC6C3 \uC815\uB9AC",script_retry:"\uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4",auto_repair_session:"\uC790\uB3D9 \uD574\uACB0 \uC138\uC158",user_triggered_session:"\uC0AC\uC6A9\uC790 \uD574\uACB0 \uC138\uC158",automatic:"\uC790\uB3D9",user_action_only:"\uC0AC\uC6A9\uC790 \uD074\uB9AD",script_identity_present:"\uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uC788\uC744 \uB54C\uB9CC",per_completion_chain:"\uC644\uB8CC \uCCB4\uC778\uB2F9",unbounded:"\uD69F\uC218 \uC81C\uD55C \uC5C6\uC74C",bounded_single_script_retry_exceeded:"\uB2E8\uC77C \uC2A4\uD06C\uB9BD\uD2B8 \uC7AC\uC2DC\uB3C4 \uD55C\uB3C4 \uCD08\uACFC",baseline_failure_ignore:"\uAE30\uC874 \uC2E4\uD328 \uBB34\uC2DC",config_or_script_deletion_to_bypass_gate:"\uC124\uC815\xB7\uC2A4\uD06C\uB9BD\uD2B8 \uC0AD\uC81C\uB85C \uAC8C\uC774\uD2B8 \uC6B0\uD68C",credential_entry:"\uC790\uACA9\uC99D\uBA85 \uC785\uB825\xB7\uCD9C\uB825",destructive_action:"\uD30C\uAD34\uC801 \uC791\uC5C5",history_rewrite:"\uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131",agent_self_report_as_success:"\uC138\uC158 \uC790\uAE30\uBCF4\uACE0\uB97C \uC131\uACF5 \uCC98\uB9AC",unbounded_repair_session_retry:"\uBB34\uD55C \uD574\uACB0 \uC138\uC158 \uBC18\uBCF5"};function D(b,B,ee){return l`<div class="worker-repo-ops__policy-group" data-policy=${ee}>
      <div class="worker-repo-ops__policy-label">${b}</div>
      <ul class="worker-repo-ops__policy-list">
        ${B.map(Ae=>l`<li data-token=${Ae}>
              ${P[Ae]||Ae}
            </li>`)}
      </ul>
    </div>`}function O(b){return l`<div
      class="worker-repo-ops__policy-group"
      data-policy="resolution-ladder"
    >
      <div class="worker-repo-ops__policy-label">해결 사다리</div>
      <ol class="worker-repo-ops__policy-list">
        ${b.map(B=>{let ee=[P[B.trigger]||B.trigger];return Number.isInteger(B.attempts_per_operation_attempt)?ee.push(`operation\uB2F9 ${B.attempts_per_operation_attempt}\uD68C`):Number.isInteger(B.attempts)?ee.push(`${P[B.budget]||B.budget} ${B.attempts}\uD68C`):Number.isInteger(B.sessions_per_user_action)&&ee.push(`${B.sessions_per_user_action}\uD68C`,P[B.user_actions]||B.user_actions),B.applies_when&&ee.push(P[B.applies_when]||B.applies_when),l`<li data-token=${B.id}>
            <strong>${P[B.id]||B.id}</strong>
            <span>${ee.filter(Boolean).join(" \xB7 ")}</span>
          </li>`})}
      </ol>
    </div>`}function U(){let b=o(),B=b.auto_repair!==!1,ee=b.repo_operation_policy&&typeof b.repo_operation_policy=="object"?b.repo_operation_policy:null,Ae=Array.isArray(b.repo_operations)?b.repo_operations:[],Z=Ae.find(Le=>Le.state==="repairing"),le=Ae.filter(Le=>Le.state==="failed"||Le.state==="repairing"),ge=le.length?Math.min(...le.map(Le=>typeof Le.repair?.remaining=="number"?Le.repair.remaining:0)):ee?.auto_repair?.resolution_ladder?.find(Le=>Le.id==="auto_repair_session")?.attempts??1,Te=Array.isArray(ee?.auto_repair?.resolution_ladder)?ee.auto_repair.resolution_ladder:[];return l`<section
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
          .checked=${B}
          @change=${Le=>{V(Le.target.checked)}}
        />
        검증·배포 실패를 자동으로 해결 시도
      </label>
      <div class="worker-repo-ops__repair-state">
        <span
          class="worker-repo-ops__repair-value"
          data-seam="auto-repair-value"
          >${B?"\uCF1C\uC9D0":"\uAEBC\uC9D0"}</span
        >
        <span
          class="worker-repo-ops__repair-budget"
          data-seam="auto-repair-budget"
          >남은 자동 해결 ${ge}회</span
        >
        <span
          class="worker-repo-ops__repair-session"
          data-seam="auto-repair-session"
          >${Z?`\uD574\uACB0 \uC138\uC158 \uC2E4\uD589 \uC911 \xB7 ${Z.repair?.owner_bead||Z.operation_id}`:"\uC2E4\uD589 \uC911\uC778 \uD574\uACB0 \uC138\uC158 \uC5C6\uC74C"}</span
        >
      </div>
      ${ee?l`<details
            class="worker-repo-ops__policy"
            data-seam="policy-lists"
          >
            <summary>
              Worker 자동 처리 기준
              <span class="worker-repo-ops__policy-count"
                >자동 ${(ee.worker_automatic||[]).length} · 해결 사다리
                ${Te.length} · 금지
                ${(ee.never_automatic||[]).length}</span
              >
            </summary>
            ${D("Worker\uAC00 \uC790\uB3D9 \uCC98\uB9AC",ee.worker_automatic||[],"worker-automatic")}
            ${ee.supported===!1||ee.schema_version!==2?l`<div
                  class="worker-repo-ops__policy-group"
                  data-policy="resolution-ladder"
                >
                  ${`\uACC4\uC57D \uC2A4\uD0A4\uB9C8 \uBD88\uC77C\uCE58 \u2014 \uC790\uB3D9 \uD574\uACB0\uC774 \uC815\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4 (v${ee.schema_version})`}
                </div>`:O(Te)}
            ${D("\uC790\uB3D9\uC73C\uB85C \uD558\uC9C0 \uC54A\uC74C",ee.never_automatic||[],"never-automatic")}
          </details>`:""}
    </section>`}return{template(){return l`<details class="worker-repo-ops-settings">
        <summary class="worker-repo-ops-settings__summary">
          저장소 작업 · 검증/배포 선언 · 자동 해결
        </summary>
        ${j(c())} ${U()}
      </details>`}}}var Pd=20,$h=5,xh=new Set(["failed","repairing","running","queued","retry_pending"]),Od={verify:"\uBA38\uC9C0 \uC804 \uAC80\uC99D",deploy:"\uBA38\uC9C0 \uD6C4 \uBC30\uD3EC"},Ld={verify_script_failure:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0",verify_script_failure_pre_merge:"\uAC80\uC99D \uC2E4\uD328 \uD574\uACB0 \uD6C4 \uBA38\uC9C0",deploy_script_failure:"\uBC30\uD3EC \uC2E4\uD328 \uD574\uACB0",interrupted_without_terminal_exit:"\uC911\uB2E8\uB41C \uC791\uC5C5 \uC9C4\uB2E8"};function Ah(e,t,r=Pd){let n=[];for(let s of Array.isArray(e)?e:[])!s||typeof s!="object"||n.push({type:"operation",id:s.operation_id,at:typeof s.finished_at=="number"?s.finished_at:typeof s.requested_at=="number"?s.requested_at:null,operation:s});for(let s of Array.isArray(t)?t:[])!s||typeof s!="object"||n.push({type:"cleanup",id:s.bead_id,at:typeof s.at=="number"?s.at:null,cleanup:s});return n.sort((s,o)=>s.at===null&&o.at===null?String(s.id||"").localeCompare(String(o.id||"")):s.at===null?1:o.at===null?-1:o.at-s.at),n.slice(0,Math.max(0,r))}function Sh(e){if(e.type==="cleanup")return!0;let t=e.operation;return xh.has(t.state)&&!t.dismissed&&!t.superseded_by}function Eh(e,t,r={}){let n=Ah(e,t,1/0),s=r.expanded===!0?Pd:$h,o=new Set(n.slice(0,s)),a=n.filter(i=>o.has(i)||Sh(i));return{visible:a,hidden:n.length-a.length}}function Md(e){if(e.type==="cleanup")return"warn";let t=e.operation.state;return t==="succeeded"?"ok":t==="failed"?"fail":"live"}function Th(e){if(e.type==="cleanup")return"\uBA48\uCDA4";switch(e.operation.state){case"succeeded":return"\uC131\uACF5";case"failed":return"\uC2E4\uD328";case"repairing":return"\uC790\uB3D9 \uD574\uACB0 \uC911";case"retry_pending":return"\uC7AC\uC2DC\uB3C4 \uC911";case"running":return"\uC2E4\uD589 \uC911";default:return"\uB300\uAE30"}}function Dd(e){let t=e.filter(r=>r.value);return t.length===0?"":l`<details class="worker-ev__details">
    <summary>세부</summary>
    <dl class="worker-ev__kv">
      ${t.map(r=>l`<div>
            <dt>${r.term}</dt>
            <dd>${r.value}</dd>
          </div>`)}
    </dl>
  </details>`}function Nd(e,t="",r=!1){return!e&&!t?"":l`<p
    class="worker-ev__explain${r?" worker-ev__explain--warn":""}"
  >
    <span class="worker-ev__cause">${e}</span>${t?l`<br />${t}`:""}
  </p>`}function Ch(e){if(e.state!=="failed"||e.superseded_by)return"";let t=e.repair||{},r=typeof t.remaining=="number"?t.remaining:0,n=e.failure_kind==="verify_script_failure"&&e.verify_stage==="pre_merge"?"verify_script_failure_pre_merge":e.failure_kind||"",s=r<=0;return l`<div class="worker-ev__acts">
    <button
      type="button"
      class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
      data-operation-id=${e.operation_id}
      data-failure-kind=${e.failure_kind||""}
      title="해결 세션을 엽니다"
    >
      ${Object.hasOwn(Ld,n)?Ld[n]:"\uC2E4\uD328 \uD574\uACB0 \uC138\uC158 \uC2DC\uC791"}
    </button>
    <span class="worker-ev__btn-sub"
      >${s?"\uC790\uB3D9 \uD574\uACB0\uC744 \uB2E4 \uC37C\uC2B5\uB2C8\uB2E4 \xB7 \uB20C\uB7EC\uC11C \uD574\uACB0 \uC138\uC158\uC744 \uC5FD\uB2C8\uB2E4":`\uC790\uB3D9 \uD574\uACB0 ${r}\uD68C\uAC00 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4`}</span
    >
    ${t.attempt_id?l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__session"
          data-attempt-id=${t.attempt_id}
        >
          해결 세션 보기
        </button>`:""}
    ${e.dismissed?"":l`<button
          type="button"
          class="worker-ev__btn worker-repo-op__dismiss"
          data-operation-id=${e.operation_id}
          title="사람이 확인한 실패로 접수합니다 — 기록은 그대로 남고 해결 필요 집계에서만 빠집니다"
        >
          기록 닫기
        </button>`}
  </div>`}function Rh(e){let t=e.operation,r=t.state==="failed",n=t.failure?t.failure.code:"";return l`<li
    class="worker-ev"
    data-operation-id=${t.operation_id}
    data-state=${t.state}
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${xo(e.at)||"\u2014"}</span
    >
    <span class="worker-ev__node" aria-hidden="true"
      ><span class="worker-ev__dot worker-ev__dot--${Md(e)}"></span
    ></span>
    <div class="worker-ev__body">
      <div class="worker-ev__line1">
        <span class="worker-ev__what"
          >${Object.hasOwn(Od,t.kind)?Od[t.kind]:t.kind}</span
        >
        <span class="worker-ev__meta"
          >${t.target_base}@${ko(t.target_sha)}${typeof t.elapsed_ms=="number"?` \xB7 ${ds(t.elapsed_ms)}`:""}</span
        >
        <span class="worker-ev__st worker-ev__st--${Md(e)}"
          >${Th(e)}</span
        >
        ${t.dismissed?l`<span class="worker-ev__st worker-ev__st--quiet">접수됨</span>`:""}
        ${t.superseded_by?l`<span class="worker-ev__st worker-ev__st--quiet">덮임</span>`:""}
      </div>
      ${r?Nd(ku(t.failure_kind,n)):""}
      ${Ch(t)}
      ${Dd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:r?n:""},{term:"script",value:[t.script_path||"",t.script_blob_sha?`blob ${ko(t.script_blob_sha)}`:"",Number.isInteger(t.exit_code)?`exit ${t.exit_code}`:""].filter(Boolean).join(" \xB7 ")},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Ih(e){let t=e.cleanup,r=an(t.step);return l`<li
    class="worker-ev"
    data-bead-id=${t.bead_id}
    data-state="cleanup_stalled"
  >
    <span
      class="worker-ev__t"
      title=${e.at?Ht(e.at):""}
      >${xo(e.at)||"\u2014"}</span
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
        ${qu(t.step).map(n=>l`<li
              class="worker-step worker-step--${n.state}"
              data-step=${n.step}
            >
              <span class="worker-step__pip" aria-hidden="true"></span>
              <span class="worker-step__lb">${n.label}</span>
            </li>`)}
      </ol>
      ${Nd(To(t.reason),typeof t.retry_count=="number"&&t.retry_count>0?`${t.retry_count}\uD68C \uC790\uB3D9 \uC7AC\uC2DC\uB3C4 \uD6C4\uC5D0\uB3C4 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.`:"\uC815\uB9AC\uB97C \uC7AC\uAC1C\uD558\uBA74 \uBA48\uCD98 \uB2E8\uACC4\uBD80\uD130 \uB2E4\uC2DC \uC9C4\uD589\uD569\uB2C8\uB2E4.",!0)}
      <div class="worker-ev__acts">
        <button
          type="button"
          class="worker-ev__btn worker-ev__btn--warn worker-cleanup__resume"
          data-bead-id=${t.bead_id}
        >
          정리 재개${r?` \u2014 ${r} \uB2E8\uACC4\uBD80\uD130`:""}
        </button>
        ${t.repair_eligible?l`<button
              type="button"
              class="worker-ev__btn worker-ev__btn--primary worker-repo-op__resolve"
              data-operation-id=${`cleanup:${t.bead_id}`}
              data-failure-kind=${t.failure_code||t.reason||""}
            >
              실패 해결 세션 시작
            </button>`:""}
      </div>
      ${Dd([{term:"\uC2E4\uD328 \uCF54\uB4DC",value:t.reason||""},{term:"\uC9C4\uB2E8",value:t.detail||""},{term:"\uB85C\uADF8",value:t.log_path||""},{term:"\uCD9C\uB825",value:t.output_tail||""}])}
    </div>
  </li>`}function Oh(e){let t=typeof e.hidden=="number"?e.hidden:0,r=e.expanded===!0;return l`<section class="worker-repo-drawer" data-seam="repo-ops-timeline">
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
    ${e.events.length===0?l`<div class="worker-repo-drawer__empty">기록 없음</div>`:l`<ul class="worker-rail">
          ${e.events.map(n=>n.type==="cleanup"?Ih(n):Rh(n))}
        </ul>`}
    ${t>0||r?l`<div class="worker-repo-drawer__more">
          <button
            type="button"
            class="worker-ev__btn"
            data-seam="repo-ops-more"
          >
            ${r?"\uC811\uAE30":`\uC774\uC804 ${t}\uAC1C \uB354 \uBCF4\uAE30`}
          </button>
        </div>`:""}
  </section>`}function qd(e,t={}){let r=null;function n(){if(r===null){Ye(l``,e);return}let a=Eh(r.operations,r.cleanup_failures,{expanded:r.expanded});Ye(Oh({events:a.visible,hidden:a.hidden,expanded:r.expanded,repo:r.repo}),e)}e.addEventListener("click",a=>{let i=a.target;if(i?.closest?.('[data-seam="repo-ops-close"]')){o();return}i?.closest?.('[data-seam="repo-ops-more"]')&&r&&(r.expanded=!r.expanded,n())});function s(a){r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:!1},n()}function o(){r!==null&&(r=null,n(),t.onClose&&t.onClose())}return{open:s,close:o,isOpen:()=>r!==null,refresh(a){r&&(r={operations:a.operations,cleanup_failures:a.cleanup_failures,repo:a.repo||"",expanded:r.expanded},n())}}}var Lh=Tt("views:worker"),Mh="tab:worker:ready",Ph="tab:worker:blocked",Dh="tab:worker:in-progress",Nh="tab:worker:resolved",qh="tab:worker:closed",Do=1,Fd=5;function jd(e){return uo(e).path.length>0}var Fh=new Set(["quick_fix","spec_backed","full_plan"]);function Bd(e){return typeof e=="string"&&Fh.has(e)}var Hd="beads-ui.worker.candidate-filter",fi={show_blocked:!1,spec:"all"};function jh(){try{let e=window.localStorage.getItem(Hd);if(!e)return{...fi};let t=JSON.parse(e);if(!t||typeof t!="object")return{...fi};let r=t.spec;return{show_blocked:t.show_blocked===!0,spec:r==="with"||r==="without"?r:"all"}}catch{return{...fi}}}function Bh(e){try{window.localStorage.setItem(Hd,JSON.stringify(e))}catch{}}function Uh(e,t){let r=i=>t.show_blocked||!i.blocked,n=i=>t.spec==="all"||(t.spec==="with"?i.has_spec:!i.has_spec),s=[],o=0,a=0;for(let i of e){let c=r(i),u=n(i);c&&u?s.push(i):!c&&u?o+=1:c&&!u&&(a+=1)}return{visible:s,hidden_blocked:o,hidden_spec:a}}var Wh=[{value:"all",label:"\uC804\uCCB4"},{value:"with",label:"spec \uC788\uC74C"},{value:"without",label:"spec \uC5C6\uC74C"}],Gd="bdui.worker.candidate_sort",zh=[{value:"spec",label:"spec \uC6B0\uC120"},{value:"board",label:"Board \uC21C\uC11C"},{value:"created",label:"\uCD5C\uC2E0 \uC0DD\uC131\uC21C"}],No="spec";function Hh(){try{let e=window.localStorage.getItem(Gd);return e==="board"||e==="created"||e==="spec"?e:No}catch{return No}}function Gh(e){try{window.localStorage.setItem(Gd,e)}catch{}}var Vd="bdui.worker.done-range";function Vh(){try{let e=window.localStorage.getItem(Vd);return ar(e)?e:er}catch{return er}}function Kh(e){try{window.localStorage.setItem(Vd,e)}catch{}}var Yh="(max-width: 640px)",Kd="beads-ui.worker.lane-collapsed",bs={queue:!0,done:!0};function Zh(){try{let e=window.localStorage.getItem(Kd);if(!e)return{...bs};let t=JSON.parse(e);return!t||typeof t!="object"?{...bs}:{queue:typeof t.queue=="boolean"?t.queue:bs.queue,done:typeof t.done=="boolean"?t.done:bs.done}}catch{return{...bs}}}function Qh(e){try{window.localStorage.setItem(Kd,JSON.stringify(e))}catch{}}function Ud(e){let t=Array.isArray(e)&&e.length>0?e[0]:null;if(!t)return"";let r=typeof t.title=="string"?t.title:t.id||"";return r.length>22?`${r.slice(0,22)}\u2026`:r}function Xh(e,t,r){let n=Array.isArray(e)?e.slice():[];return t==="created"?n.sort(Xr):(n.sort(Ds(r)),t==="board"?n:[...n.filter(jd),...n.filter(s=>!jd(s))])}function Jh(e){let t=e&&e.parent;return(typeof t=="string"?t.length>0:!!(t&&t.id))||/\.\d+$/.test(e&&e.id||"")}function eb(e){let t=e?.blocked_info;if(t&&typeof t=="object"){let s=Array.isArray(t.blockers)?t.blockers.filter(o=>typeof o=="string"&&o.length>0):[];return s.length>0?`\u{1F512} ${s.join(", ")}`:"\u{1F512} blocked"}let n=(Array.isArray(e?.dependencies)?e.dependencies:[]).map(s=>{if(typeof s=="string")return s;if(!s||typeof s!="object")return"";let o=s.type??s.dependency_type;return o!==void 0&&o!=="blocks"?"":s.depends_on_id||s.id||""}).filter(Boolean);return n.length>0?`\u{1F512} ${n.join(", ")}`:"\u{1F512} blocked"}function Wd(e){switch(e){case"not_in_pr_wait":return"PR \uB300\uAE30 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2E4\uD328";case"resolution_round_cap":return"\uCDA9\uB3CC \uD574\uC18C 2\uD68C \uCD08\uACFC";case"resolution_timeout":return"\uCDA9\uB3CC \uD574\uC18C \uB300\uAE30 \uC2DC\uAC04 \uCD08\uACFC";case"resolution_refused":return"\uD574\uC18C \uC138\uC158 \uB514\uC2A4\uD328\uCE58 \uAC70\uBD80";case"worktree_missing":return"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uD574\uC18C \uD544\uC694";case"merge_unconfirmed_timeout":return"\uBA38\uC9C0 \uD655\uC778 \uC2DC\uAC04 \uCD08\uACFC";case"pr_closed_unmerged":return"PR \uB2EB\uD798";case"merge_error":return"\uBA38\uC9C0 \uC624\uB958";case"spec_id_missing":return"\uC2A4\uD399 ID \uAE30\uB85D \uC5C6\uC74C";default:return e}}function tb(e){if(e==="lane_occupied")return"\uC2E4\uD589 \uB808\uC778\uC5D0 \uB0A8\uC544 \uC788\uC5B4 \uBA38\uC9C0 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4";let t="\uBA38\uC9C0 \uD050\uC5D0 \uB123\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uC774\uBBF8 \uB300\uAE30 \uC911\uC774\uAC70\uB098 \uB300\uC0C1 \uC544\uB2D8)";return typeof e=="string"&&e.length>0?`${t}: ${e}`:t}function rb(e,t=null){if(e==="worker_sessions_busy")return"\uD574\uC18C \uB300\uAE30 \u2014 \uC2E4\uD589 \uC2AC\uB86F \uB300\uAE30 \uC911";if(typeof e!="string"||!e.startsWith("completion_waiting:"))return null;let r=e.slice(19);if(r.length===0)return null;switch(r){case"gating":{let n=t?.repair_sessions_used;return typeof n=="number"&&n>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911"}case"repairing":return"\uC790\uB3D9 \uC218\uC815 \uC911";case"waiting_repair_pr":return"\uC218\uC815 PR \uB300\uAE30 \uC911";case"merging":return"\uBA38\uC9C0 \uC911";case"cleaning":return"\uB9C8\uBB34\uB9AC \uC911";case"paused":return"\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";case"needs_human":return"\uD655\uC778 \uD544\uC694";default:return null}}function nb(e){if(!e||typeof e!="object")return null;switch(e.state){case"waiting":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC911",live:!0};case"yielded":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uACC4\uC18D \uC911 \xB7 \uC644\uB8CC \uD6C4 \uC6B0\uC120 \uBA38\uC9C0",live:!0};case"ready":return{badge:"\uCDA9\uB3CC \uD574\uC18C \uC644\uB8CC \xB7 \uC7AC\uAC80\uC99D \uB300\uAE30",live:!1};default:return null}}function sb(e){if(!e||typeof e!="object")return null;switch(e.state){case"pending":return{badge:"implementation review \uB300\uAE30",live:!1,alert:!1};case"reviewing":return{badge:"implementation review \uC911",live:!0,alert:!1};case"revising":return{badge:"review \uC218\uC815 \uC911 \xB7 1\uD68C",live:!0,alert:!1};case"failed":{let r=(typeof e.failure_reason=="string"?e.failure_reason:"").replace(/[\u0000-\u001f\u007f]/g," ").slice(0,120);return{badge:r.trim().length>0?`review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328: ${r.trim()}`:"review \uC790\uB3D9 \uC9C4\uD589 \uC2E4\uD328",live:!1,alert:!0}}default:return null}}function _i(e,t){return typeof e!="string"||e.length===0||typeof t!="string"||t.length===0||t===e?null:`\u2192 ${t}`}function ob(e){if(!e||typeof e!="object")return null;let t=Number.isInteger(e.repair_sessions_used)?Math.max(0,e.repair_sessions_used):0,r=Number.isInteger(e.repair_session_cap)?Math.max(0,e.repair_session_cap):0,n=e.current_repair&&typeof e.current_repair=="object"?e.current_repair:null,s=n&&typeof n.pr_number=="number"?n.pr_number:null,o="";switch(e.phase){case"gating":o=t>0?"\uC218\uC815 \uACB0\uACFC \uC7AC\uD655\uC778 \uC911":"\uBA38\uC9C0 \uC870\uAC74 \uD655\uC778 \uC911";break;case"repairing":o="\uC790\uB3D9 \uC218\uC815 \uC911";break;case"waiting_repair_pr":o=s?`\uC218\uC815 PR #${s} \uB300\uAE30 \uC911`:"\uC218\uC815 PR \uB300\uAE30 \uC911";break;case"merging":o=e.subject_role==="repair"?s?`\uC218\uC815 PR #${s} \uBA38\uC9C0 \uC911`:"\uC218\uC815 PR \uBA38\uC9C0 \uC911":"\uBA38\uC9C0 \uC911";break;case"cleaning":o="\uB9C8\uBB34\uB9AC \uC911";break;case"paused":o="\uC790\uB3D9 \uC9C4\uD589 \uC77C\uC2DC\uC815\uC9C0";break;case"needs_human":o="\uD655\uC778 \uD544\uC694";break;case"completed":return null;default:return null}let a=[o,`\uC790\uB3D9 \uC218\uC815 \uD69F\uC218 ${t}/${r}`];return e.head_sha&&a.push(`head ${e.head_sha}`),e.base_sha&&a.push(`base ${e.base_sha}`),(e.failure_stage||e.failure_reason)&&a.push(`${e.failure_stage||"failure"} \xB7 ${e.failure_reason||"\uC6D0\uC778 \uBBF8\uC0C1"}`),e.active_attempt_id&&a.push(`attempt ${e.active_attempt_id}`),n&&typeof n.bead_id=="string"&&a.push(`repair ${n.bead_id}`),e.evidence&&a.push(e.evidence),e.log_path&&a.push(e.log_path),{badge:o,title:a.join(`
`),alert:e.phase==="needs_human",lock_actions:e.phase!=="paused"&&e.phase!=="needs_human",repair_pr_url:n&&typeof n.pr_url=="string"?n.pr_url:"",repair_pr_number:s}}function zd(e){if(!e||typeof e!="object")return[];let t=e.blocking_codes;return Array.isArray(t)?t.filter(r=>typeof r=="string"&&r.length>0):[]}function ab(e){let t=e.queue_failure?`\uBA38\uC9C0 \uC2E4\uD328 \uC6D0\uBB38: ${e.queue_failure}`:e.auto_skip?`\uC790\uB3D9 \uC81C\uC678 \uC6D0\uBB38: ${e.auto_skip}`:"",r=(n,s={})=>{let o=[s.title||"",t].filter(Boolean);return{label:n,title:o.join(`
`),live:s.live===!0,alert:s.alert===!0}};return e.continuation_required?r("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD \uD544\uC694",{alert:!0}):e.merge_step?e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428",{title:e.merge_step.label,alert:e.merge_step.failed===!0}):r("\uBA38\uC9C0 \uC911",{title:e.merge_step.label,live:!0}):e.conflict_badge?r(e.conflict_badge,{live:e.conflict_live===!0}):e.head_review&&e.head_review.state!=="failed"?r("\uB9AC\uBDF0 \uC9C4\uD589 \uC911",{title:e.head_review.badge,live:e.head_review.live===!0}):e.recovery?.lock_actions?r(e.recovery.badge,{title:e.recovery.title,live:!0}):e.cleanup_failed?r(e.cleanup_label?`\uC815\uB9AC \uBA48\uCDA4 \xB7 ${e.cleanup_label}`:"\uC815\uB9AC \uBA48\uCDA4",{title:e.cleanup_failed.reason||"",alert:!0}):e.base_exception?r("\uB2E4\uB978 base \uB300\uC0C1",{title:e.base_exception,alert:!0}):e.conflicting?r("\uCDA9\uB3CC \uD574\uACB0 \uD544\uC694",{alert:!0}):e.gate?.reason==="base_behind"?r("base \uAC31\uC2E0 \uD544\uC694",{alert:!0}):e.gate?.reason==="review_receipt_missing"||e.gate?.reason==="review_receipt_stale"?r("\uCD5C\uC885 \uBCC0\uACBD \uB9AC\uBDF0 \uD544\uC694",{title:e.gate.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uD604\uC7AC head\uC758 \uC870\uC0C1\uC774 \uC544\uB2C8\uAC70\uB098 \uC870\uC0C1 \uD655\uC778\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4 \u2014 \uD788\uC2A4\uD1A0\uB9AC \uC7AC\uC791\uC131\xB7\uBE0C\uB79C\uCE58 \uB9AC\uC14B \uBCF5\uAD6C \uACBD\uB85C\uB85C, \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB2E4\uC2DC \uB9AC\uBDF0\uD569\uB2C8\uB2E4":"\uB9AC\uBDF0 \uC601\uC218\uC99D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4 \u2014 \uAD00\uCE21\uB41C \uCD5C\uC885 head \uC804\uCCB4\uB97C \uB9AC\uBDF0\uD574\uC57C \uBA38\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",alert:!0}):e.gate?.reason==="spec_id_missing"?r("\uC2A4\uD399 ID \uB204\uB77D",{title:"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id \uD544\uC694",alert:!0}):e.gate?.reason==="review_receipt_invalid"?r("\uB9AC\uBDF0 \uAE30\uB85D \uC624\uB958",{title:"review_receipt_invalid",alert:!0}):zd(e.receipt_check).length>0?r("\uC601\uC218\uC99D \uD655\uC778 \uD544\uC694",{title:`\uC131\uB9BD\uD558\uC9C0 \uC54A\uB294 \uC2E4\uD589 \uC601\uC218\uC99D \u2014 ${zd(e.receipt_check).join(", ")}`,alert:!0}):e.head_review?.state==="failed"?r("\uB9AC\uBDF0 \uC2E4\uD328",{title:e.head_review.failure_reason||"",alert:!0}):e.recovery?r(e.recovery.badge,{title:e.recovery.title,alert:!0}):e.gate?.tier==="verify"&&e.gate.gate_badge==="\uAC80\uC99D \uC2E4\uD328"?r("\uAC80\uC99D \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.queue_failure?r(`\uBA38\uC9C0 \uC2E4\uD328 \u2014 ${Wd(e.queue_failure)}`,{title:e.queue_failure,alert:!0}):e.auto_skip?r(`\uC790\uB3D9 \uC81C\uC678 \u2014 ${Wd(e.auto_skip)}`,{title:e.auto_skip,alert:!0}):e.queued&&!e.queue_active?r(`\uBA38\uC9C0 \uB300\uAE30 #${e.queue_position}`):e.gate?.enabled===!0?r("\uBA38\uC9C0 \uAC00\uB2A5"):e.gate?.tier==="merged"?r("\uBA38\uC9C0\uB428"):e.gate?.tier==="closed_unmerged"?r("\uB2EB\uD798",{alert:!0}):e.activity?r("\uD655\uC778 \uC911",{live:!0}):e.gate?.tier==="undecidable"||e.gate?.reason==="mergeability_unknown"?r("\uC0C1\uD0DC \uD655\uC778 \uC2E4\uD328",{title:e.gate.reason||"",alert:!0}):e.gate?.tier==="unobserved"||e.gate?.tier==="verify"||e.gate?.gate_badge==="\uAD00\uCE21 \uB300\uAE30"?r("\uD655\uC778 \uC911"):e.gate?.gate_badge?r(e.gate.gate_badge,{title:e.gate.reason||"",alert:e.gate.enabled!==!0}):null}function ib(e,t,r,n,s=null,o=null,a=null,i=!1,c=null,u=!0,d=null,p=null,_=null,h={},$=!1,L=!1,j={}){let V=!!c&&c.position>0,H=!!c?.continuation_action&&c.continuation_action.continuation===null,P=!!c&&c.active===!0,D=c&&c.failure||null,O=rb(c?c.waiting:null,_),U=r[e]||null,b=U&&U.gate?U.gate:null,B=U&&U.pr?U.pr:null,ee=ob(_),Ae=nb(c?c.resolution:null),Z=sb(c?c.head_review:null),le=c&&c.head_review||null,ge=c&&c.authority||null,Te=!!le&&["pending","reviewing","revising"].includes(le.state),Le=V&&!P&&(le?.state==="failed"||!ge||ge.source==="automatic"&&!L),se=a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC77C\uC2DC\uC815\uC9C0":Ae?Ae.badge:a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC911":O,ae=!!b&&b.base_badge==="\uCDA9\uB3CC",Me=!!b&&b.enabled===!0,N=gs({bead_id:e,merge_sha:j.merge_sha,cleanup_cursor:j.cleanup_cursor,merge_progress:o&&o.merge_progress?o.merge_progress:null,cleanup_failed:n,repo_operations:j.repo_operations}),ne=Mo(N),oe=!!n&&["child_sweep","branch_cleanup","parent_close"].includes(n.step)&&!!b&&b.tier==="merged",ke=i&&!!n&&!!b&&b.tier==="merged",Ce=Le&&(Me||ae||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||oe||ke),Ne=i&&ae&&u===!1,x=vr(h,e,{external:i,merge_active:P||N?.step==="merge",merge_queued:V,conflict_active:!!a,cleanup_active:ne,merged:!!n||b?.tier==="merged"}),fe=!!x.operation,De=!oe&&!!n&&n.step==="repo_operations",ve=ab({continuation_required:H,merge_step:N,conflict_badge:se,conflict_live:Ae?.live===!0||a==="running",head_review:le&&Z?{...Z,state:le.state,failure_reason:le.failure_reason}:null,recovery:ee,cleanup_failed:n,cleanup_label:n?an(n.step):null,base_exception:p,conflicting:ae,gate:b,receipt_check:U&&U.receipt_check?U.receipt_check:null,queue_failure:D,auto_skip:d,queued:V,queue_active:P,queue_position:c?c.position:0,activity:se?null:o&&o.activity||null}),ze=ve?.live===!0&&ve.title?l`<span title=${ve.title}>${ve.label}</span>`:ve?.label||null;return{id:e,title:i?l`${t}<span class="muted"> · 세션</span>`:t,reason:n&&N?.active!==!0?Lo(n.step):"PR \uB300\uAE30",draggable:!1,done:!0,lane:"pr_wait",worker_serial:$,external:i,pr_number:B&&typeof B.number=="number"?B.number:null,pr_url:B&&typeof B.url=="string"?B.url:"",completion_badge:ve?.live!==!0&&ve?.title?ve.label:null,completion_title:ve?.title||"",completion_repair_pr_url:ee?ee.repair_pr_url:"",completion_repair_pr_number:ee?ee.repair_pr_number:null,badges:ze?[ze]:[],live_badge:ve?.live===!0?ze:null,usage:s,alert:ve?.alert===!0,merge_action:b?.tier==="merged"&&!oe&&!ke||De?!1:!V||H||Le,timeline_action:De,cancel_action:V&&!H,cancel_enabled:(!P||Te)&&!(ee&&ee.lock_actions),cancel_title:ee&&ee.lock_actions?`${ee.badge} \u2014 \uC911\uB2E8\uD558\uB824\uBA74 \uC0C1\uB2E8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8\uC744 \uC0AC\uC6A9\uD558\uC138\uC694`:P&&!Te?"\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4":Te?"review \uC9C4\uD589\uC744 \uCDE8\uC18C\uD558\uACE0 \uBA38\uC9C0 \uAD8C\uD55C\uC744 \uD3D0\uAE30\uD569\uB2C8\uB2E4":"\uBA38\uC9C0 \uD050\uC5D0\uC11C \uC774 \uD56D\uBAA9\uC744 \uBE8D\uB2C8\uB2E4 (\uB2E4\uC2DC [\uBA38\uC9C0]\uB85C \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4)",discard:x,discard_action:x.action,merge_step:N,discard_enabled:x.enabled,discard_title:x.title,merge_enabled:!N&&!a&&!fe&&!p&&!(ee&&ee.lock_actions)&&!Ne&&!De&&(Me||ae||b?.reason==="base_behind"||b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"||oe||ke||Ce),merge_label:H?"\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD":oe||ke?"\uC815\uB9AC \uC7AC\uAC1C":ae&&!N&&!oe?"\uCDA9\uB3CC \uD574\uC18C \uD6C4 \uBA38\uC9C0":b?.reason==="base_behind"?"base \uAC31\uC2E0 \uD6C4 \uBA38\uC9C0":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uB9AC\uBDF0 \uD6C4 \uBA38\uC9C0":Le?"\uB2E4\uC2DC \uBA38\uC9C0":void 0,merge_title:fe?x.error?`\uD3D0\uAE30 \uC2E4\uD328: ${x.error} \u2014 [\uC7AC\uC2DC\uB3C4]\uD558\uAC70\uB098 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694`:`\uD3D0\uAE30 \uC9C4\uD589 \uC911 \u2014 ${x.progress||"\uC644\uB8CC\uB97C \uAE30\uB2E4\uB9AC\uC138\uC694"}`:H?"\uC2E4\uD589 provider\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4 \u2014 \uC774\uC5B4\uAC08 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD558\uC138\uC694":N?`\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 ${N.label}`:ke?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uC2E4\uD328\uD55C \uC815\uB9AC\uB97C \uC7AC\uAC1C\uD569\uB2C8\uB2E4":Ne?"\uC6CC\uD06C\uD2B8\uB9AC \uC5C6\uC74C \u2014 \uC138\uC158\uC5D0\uC11C \uC9C1\uC811 \uD574\uC18C\uD558\uC138\uC694":a==="running"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC2E4\uD589 \uC911 \u2014 \uC644\uB8CC \uD6C4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":a==="paused"?"\uCDA9\uB3CC \uD574\uC18C \uC138\uC158 \uC77C\uC2DC\uC815\uC9C0 \u2014 \uC7AC\uAC1C \uD6C4 \uC644\uB8CC\uB418\uBA74 \uBA38\uC9C0\uD558\uC138\uC694":oe?"\uBA38\uC9C0 \uC644\uB8CC \u2014 \uD074\uB9AD\uD558\uBA74 \uB0A8\uC740 \uC815\uB9AC\uB97C \uC2E4\uD328 \uB2E8\uACC4\uBD80\uD130 \uC7AC\uAC1C\uD569\uB2C8\uB2E4":ae?"\uCDA9\uB3CC \u2014 \uD050\uC5D0 \uB123\uC73C\uBA74 \uD574\uC18C \uC138\uC158\uC744 \uB744\uC6B0\uACE0 \uC644\uB8CC \uD6C4 \uC790\uB3D9\uC73C\uB85C \uC7AC\uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="base_behind"?"base\uB97C \uC790\uB3D9 \uAC31\uC2E0\uD55C \uB4A4 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="review_receipt_missing"||b?.reason==="review_receipt_stale"?"\uC790\uB3D9 \uB9AC\uBDF0 \uC138\uC158 \uD6C4 \uC2B9\uC778\uB418\uBA74 \uBA38\uC9C0\uD569\uB2C8\uB2E4":b?.reason==="spec_id_missing"?"native spec_id \uBBF8\uAE30\uB85D \u2014 bd update --spec-id\uB85C \uAE30\uB85D\uD55C \uB4A4 \uB2E4\uC2DC \uBA38\uC9C0\uD558\uC138\uC694":Me?`\uBA38\uC9C0 (${b.gate_badge}) \u2014 \uD050\uC5D0 \uB123\uC5B4 \uC21C\uC11C\uB300\uB85C \uBA38\uC9C0\uD569\uB2C8\uB2E4 (\uCC28\uB840\uAC00 \uB418\uBA74 \uB2E4\uC2DC \uD655\uC778)`:b&&b.tier==="merged"?"\uBA38\uC9C0\uB428 \u2014 \uBA38\uC9C0 \uD6C4 \uC815\uB9AC \uC9C4\uD589 \uC911":`\uBA38\uC9C0 \uBD88\uAC00: ${b&&b.reason||"\uAD00\uCE21 \uB300\uAE30"}`}}function mi(e,t={}){let{transport:r,issueStores:n,queueStore:s,analysisStore:o,sessionLogStore:a,uiOrderStore:i,gotoIssue:c,getWorkspacePath:u,doneRange:d,onDoneRangeChange:p}=t,_=n?qs(n,i):null,h=Us({transport:r,uiOrderStore:i}),$=null,L=[],j=jh(),V=null,H=Hh(),P=ar(d)?d:Vh(),D=new Map;function O(){let f=Mr.find(A=>A.value===P);return f?f.label:"\uC624\uB298"}let U=Zh(),b=!1,B=new Set,ee=new Set,Ae=new Set,Z=new Set,le=new Set,ge={},Te=null,Le=0,se=null,ae=[];function Me(f){return Te===f?ge:{}}async function N(){if(!r)return;let f=u?.()||"";if(Te===f||se&&se.key===f&&se.generation===Le)return;let A=++Le;se={key:f,generation:A};let G=null;try{G=await Promise.resolve(r("get-session-defaults",{}))}catch(m){if(A!==Le)return;se=null,Lh("get-session-defaults failed: %o",m),je();return}A===Le&&(ge=G&&typeof G.values=="object"&&G.values!==null?{...G.values}:{},Te=f,se=null,je())}function ne(){Te=null,Le+=1,N()}let oe=document.createElement("div");oe.className="worker-console";let ke=document.createElement("div");ke.className="worker-top";let Ce=document.createElement("div");Ce.className="worker-drawer-overlay",Ce.hidden=!0;let Ne=document.createElement("div");Ne.className="worker-drawer-overlay__backdrop";let x=document.createElement("div");x.className="worker-drawer-host";let fe=document.createElement("div");fe.className="worker-drawer-host",fe.hidden=!0,Ce.append(Ne,x,fe);let De=document.createElement("div");De.className="worker-lanes-host",oe.append(ke,Ce,De),e.appendChild(oe);let ve=null,ze=null,We=Sn(x,{transport:r,sessionLogStore:a,onClose:()=>{ve=null,ze=null,Ce.hidden=!0,je()}}),Ve=qd(fe,{onClose:()=>{fe.hidden=!0,Ce.hidden=!0,je()}}),Je=Rd({getWorkspacePath:u||(()=>"")}),ot=u&&u()||"",K=Id({queueStore:s,transport:r,onChanged:()=>je(),onOpenScript:(f,A)=>{Je.open(f,A)}}),Q=o?Sd(oe,{queueStore:s,analysisStore:o,transport:r,getWorkspacePath:u,onOpenTranscript:(f,A)=>Pt(f,A)}):null;function Se(){return s&&s.get()||{revision:0,auto_advance:!1,auto_merge:!1,slots:Do,queue:[],serial_lanes:[],serial_lane_count:0,pr_wait:[],done:[]}}function Qe(){let f=Se(),A=typeof f.serial_lane_count=="number"&&Number.isInteger(f.serial_lane_count)&&f.serial_lane_count>0?Math.min(f.serial_lane_count,5):0,G=Array.isArray(f.serial_lanes)?f.serial_lanes:[],m=[];for(let de of G){if(m.length>=A)break;!de||typeof de.id!="string"||!/^s[1-5]$/.test(de.id)||!Array.isArray(de.entries)||m.push({id:de.id,label:`\uC9C1\uB82C ${de.id.slice(1)}`,count:de.entries.length})}return m.length===0?null:[{id:"parallel",label:"\uBCD1\uB82C",count:(Array.isArray(f.queue)?f.queue:[]).length},...m]}function Ge(f){if(!V||!f.some(G=>G.id===V))return null;let A=Qe();return A?{bead_id:V,lanes:A}:null}function pe(){let f=Se();return typeof f.revision=="number"?f.revision:0}function R(f){f&&f.queue&&s&&s.set(f.queue)}function J(){let f=Se().queue;return Array.isArray(f)?f.length:0}async function ie(f,A,G){if(!r)return;let m=()=>({bead_id:f,...A==="parallel"?{}:{lane:A},...G===void 0?{}:{index:G},expected_revision:pe()}),v=await r("worker-queue-place",m());R(v),v&&v.conflict&&await r("worker-queue-place",m()).then(R)}async function te(f,A,G){if(!r)return;let m=()=>({bead_id:f,...A==="parallel"?{}:{lane:A},to_index:G,expected_revision:pe()}),v=await r("worker-queue-reorder",m());R(v),v&&v.conflict&&await r("worker-queue-reorder",m()).then(R)}async function qe(f){if(!r)return;let A=await r("worker-queue-remove",{bead_id:f,expected_revision:pe()});R(A),A&&A.conflict&&await r("worker-queue-remove",{bead_id:f,expected_revision:pe()}).then(R)}async function at(f){if(!r||!f)return;let A=await r("worker-attempt-pause",{attempt_id:f});A&&A.paused===!1&&A.reason&&me(`\uC77C\uC2DC\uC815\uC9C0 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function it(f){if(!r||!f)return;let A=await kn();if(A===null)return;let G=async(v={})=>await r("worker-attempt-resume",{attempt_id:f,expected_revision:pe(),...A!==""?{instructions:A}:{},...v}),m=await G();R(m),m&&m.conflict&&(m=await G(),R(m)),m=await $r(m,(v,de)=>G({continuation:v,decision_token:de}),{onResult:R,refresh:()=>G()}),m&&m.resumed===!1&&!m.conflict&&m.reason&&me(`\uC774\uC5B4\uD558\uAE30 \uAC70\uBD80: ${m.reason}`,"error",2400)}async function Xe(f){if(!r||!f)return;let A=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:pe()});R(A),A&&A.conflict&&(A=await r("worker-attempt-dismiss",{attempt_id:f,expected_revision:pe()}),R(A)),A&&A.dismissed===!1&&!A.conflict&&A.reason&&me(`\uBC30\uB108 \uB2EB\uAE30 \uAC70\uBD80: ${A.reason}`,"error",2400)}async function mt(f,A,G=!0){if(!r)return null;let m=r,v=await m(f,{...A,expected_revision:pe()});return R(v),v&&v.conflict&&G&&(v=await m(f,{...A,expected_revision:pe()}),R(v)),v}async function ht(f){if(!r||!f)return;let A=Se().merge_queue?.find(m=>m.bead_id===f)?.continuation_action;if(A?.mismatch&&A.continuation===null){await pt(f,A.mismatch);return}B.add(f),je();let G;try{G=await mt("worker-merge-queue-add",{bead_id:f})}finally{B.delete(f),je()}if(!(!G||G.applied)){if(G.conflict){me("\uD050\uAC00 \uBC14\uB00C\uC5B4 \uBA38\uC9C0 \uD074\uB9AD\uC774 \uC801\uC6A9\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4 \u2014 \uB2E4\uC2DC \uB20C\uB7EC\uC8FC\uC138\uC694","error",2400);return}me(tb(G.reason),"error",2400)}}async function bt(f){if(!(!r||!f||ee.has(f))){ee.add(f),je();try{let A=await r("worker-cleanup-retry",{bead_id:f,expected_revision:pe()});R(A),A&&!A.retried&&!A.conflict&&A.reason&&me(`\uC815\uB9AC \uC7AC\uAC1C \uAC70\uBD80: ${A.reason}`,"error",2400)}finally{ee.delete(f),je()}}}async function pt(f,A){let G=await $r({continuation_mismatch:A},(v,de)=>mt("worker-merge-queue-add",{bead_id:f,continuation:v,decision_token:de},!1)),m=G?.queue?.merge_queue?.find(v=>v.bead_id===f)?.continuation_action;if(G?.applied!==!0&&m?.continuation===null&&m.mismatch){await pt(f,m.mismatch);return}G&&G.applied===!1&&!G.conflict&&me("\uC774\uC5B4\uD558\uAE30 \uC120\uD0DD\uC774 \uCD5C\uC2E0 \uC0C1\uD0DC\uC640 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4","error",2800)}async function wt(f){if(!r)return;let A=await mt("worker-merge-auto-toggle",{on:f});!A||A.conflict||me(f?"\uC790\uB3D9 \uBA38\uC9C0 \uCF1C\uC9D0 \u2014 \uC790\uACA9\uC774 \uC0DD\uAE30\uB294 PR\uC744 \uACC4\uC18D \uBA38\uC9C0\uD569\uB2C8\uB2E4":"\uC790\uB3D9 \uBA38\uC9C0 \uAEBC\uC9D0 \u2014 \uB300\uAE30 \uD56D\uBAA9\uC744 \uBE44\uC6E0\uC2B5\uB2C8\uB2E4",f?"success":"info",2400)}async function He(f){if(!r||!f)return;let A=await mt("worker-merge-queue-remove",{bead_id:f});A&&!A.conflict&&!A.applied&&A.reason==="merge_active"&&me("\uBA38\uC9C0 \uC9C4\uD589 \uC911 \u2014 \uCDE8\uC18C\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4","error",2400)}async function et(){await mt("worker-merge-queue-remove",{all:!0})}async function Pe(f,A=null,G="unmerged",m=null){if(!r||!f)return;let v=ps(f,G);if(!(!!m||typeof globalThis.confirm!="function"||globalThis.confirm(v)))return;let ue=await r("worker-discard",{bead_id:f,...A?{attempt_id:A}:{},...m?{operation_id:m}:{},expected_revision:pe()});if(R(ue),ue&&ue.conflict&&(ue=await r("worker-discard",{bead_id:f,...A?{attempt_id:A}:{},...m?{operation_id:m}:{},expected_revision:pe()}),R(ue)),ue&&ue.discarded===!0){me(Ao(ue),"success",5e3);return}if(ue&&ue.reason){me(`\uD3D0\uAE30 \uC2E4\uD328: ${ue.reason}`,"error",2800);return}if(ue&&ue.accepted&&ue.pending==="merged_revert"){me("revert PR \uB300\uAE30 \uC0C1\uD0DC\uB85C \uC804\uD658\uD588\uC2B5\uB2C8\uB2E4","success",2400);return}if(ue&&ue.accepted&&!ue.discarded){me(`\uD3D0\uAE30 \uC9C4\uD589: ${ue.phase||"\uBC31\uC5C5 \uC911"}`,"success",2400);return}ue&&!ue.conflict&&me("\uD3D0\uAE30 \uAC70\uBD80: unknown","error",2800)}async function ct(f,A,G){if(!(!r||!A||!G||Z.has(A))){Z.add(A),je();try{let m=await r(f,{bead_id:A,action_id:G,expected_revision:pe()});R(m),m?.conflict?me("\uC774\uC804 \uC791\uC5C5 \uC0C1\uD0DC\uAC00 \uBC14\uB00C\uC5C8\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uC138\uC694.","error",2800):!m?.ok&&m?.reason&&me(`\uC774\uC804 \uC791\uC5C5 \uCC98\uB9AC \uAC70\uBD80: ${String(m.reason)}`,"error",2800)}finally{Z.delete(A),je()}}}async function xt(f,A){if(!r||!A||Ae.has(A))return;Ae.add(A),je();let G;try{let m=async(v={})=>await r(f,{bead_id:A,expected_revision:pe(),...v});G=await m(),R(G),G&&G.conflict&&(G=await r(f,{bead_id:A,expected_revision:pe()}),R(G)),f==="worker-revise-fix"&&(G=await $r(G,(v,de)=>m({continuation:v,decision_token:de}),{onResult:R,refresh:()=>m()}))}finally{Ae.delete(A),je()}if(!(!G||G.conflict)){if(G.ok){me(f==="worker-revise-fix"?"\uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4 \u2014 \uC218\uB9AC \uD6C4 \uAD6C\uD604\uC774 \uC7AC\uB514\uC2A4\uD328\uCE58\uB429\uB2C8\uB2E4":"\uB378\uD0C0 \uC2B9\uC778 \uC644\uB8CC \u2014 \uC601\uC218\uC99D \uAC31\uC2E0 + \uD30C\uD0B9 \uD574\uC81C","success",2800);return}me(`\uCC98\uBD84 \uAC70\uBD80: ${G.reason||""}`,"error",3e3)}}async function X(f){if(!r)return;let A=await r("worker-automation-toggle",{on:f,expected_revision:pe()});R(A),A&&A.conflict&&await r("worker-automation-toggle",{on:f,expected_revision:pe()}).then(R)}async function E(f){if(!r||!f)return;let A=await r("worker-repo-operation-repair",{operation_id:f});if(R(A),A&&A.ok===!1){me(`\uD574\uACB0 \uC138\uC158 \uAC70\uBD80: ${A.reason||""}`,"error",3e3);return}A&&A.ok===!0&&me("\uD574\uACB0 \uC138\uC158\uC744 \uB744\uC6E0\uC2B5\uB2C8\uB2E4","success",2400)}async function F(f){if(!r||!f)return;let A=await r("worker-repo-operation-dismiss",{operation_id:f});R(A),A&&A.ok===!1&&me(`\uAE30\uB85D \uB2EB\uAE30 \uAC70\uBD80: ${A.reason||""}`,"error",3e3)}async function y(f){if(!r||!Number.isFinite(f))return;let A=Math.max(Do,Math.floor(f)),G=await r("worker-queue-set-slots",{slots:A,expected_revision:pe()});R(G),G&&G.conflict&&await r("worker-queue-set-slots",{slots:A,expected_revision:pe()}).then(R)}async function C(f){if(!r||!Number.isInteger(f)||f<1||f>Fd)return;let A=Se(),G=(Array.isArray(A.serial_lanes)?A.serial_lanes:[]).slice(f).reduce((de,ue)=>de+(Array.isArray(ue?.entries)?ue.entries.length:0),0),m=()=>({count:f,expected_revision:pe()}),v=await r("worker-queue-set-serial-lane-count",m());R(v),v&&v.conflict&&(v=await r("worker-queue-set-serial-lane-count",m()),R(v)),v&&v.applied&&G>0&&me(`\uC9C1\uB82C \uB808\uC778 \uCD95\uC18C \u2014 ${G}\uAC1C \uD56D\uBAA9\uC774 \uBCD1\uB82C \uB300\uAE30\uB85C \uC774\uB3D9`)}function M(){let f=Se(),A=_?_.selectBoardColumn(Mh,"ready"):[],G=_?_.selectBoardColumn(Ph,"blocked"):[],m=_?_.selectBoardColumn(qh,"closed"):[],v=_?_.selectBoardColumn(Dh,"in_progress"):[],de=_?_.selectBoardColumn(Nh,"resolved"):[],ue=js([...A,...G,...v,...de,...m]),Be=new Map;for(let g of[...A,...G,...v])g&&g.id&&!Be.has(g.id)&&Be.set(g.id,g);let $e={...Me(u?.()||"")};for(let g of["orchestration_model","orchestration_effort","orchestration_speed"]){let z=f[g];typeof z=="string"&&($e[g]=z)}function S(g,z){let _e=Be.get(g);if(!_e)return null;let Ke=_e.metadata&&typeof _e.metadata=="object"?_e.metadata:{},dt=_e.workflow?.route,jt=Ke.route,Nt=Bd(dt)?dt:Bd(jt)?jt:null;return Qt({pin:Ke,global:$e,execution_defaults:f.execution_defaults??null,runner_catalog:f.runner_catalog??null,route:Nt,controller_runtime:z})}function re(g){let z=g.runner||null,_e=S(g.bead_id,z),Ke=Co(g),dt=_e?Br(_e,z):null;return Ke||dt?{orchestration:Ke,worker:dt}:null}let q=new Map;function Oe(g){if(q.has(g))return q.get(g)??null;let z=S(g,null),_e=null;if(z){let Ke=gr(f.runner_catalog??null,z.orchestration_model.value??""),dt=Ke===null?z:S(g,Ke),jt=on(dt,f.runner_catalog??null),Nt=Br(dt,Ke);_e=jt||Nt?{orchestration:jt,worker:Nt}:null}return q.set(g,_e),_e}function ut(g){let z=Bs(ue,g);return z.total===0?null:z}let st=f.bead_titles||{},rt=new Map;for(let[g,z]of Object.entries(st))typeof z=="string"&&z.length>0&&rt.set(g,z);for(let g of[...A,...G])rt.set(g.id,g.title||g.id);let nt=f.bead_times&&typeof f.bead_times=="object"&&!Array.isArray(f.bead_times)?f.bead_times:{},It=f.bead_labels&&typeof f.bead_labels=="object"&&!Array.isArray(f.bead_labels)?f.bead_labels:{},Jt=f.bead_workflow&&typeof f.bead_workflow=="object"&&!Array.isArray(f.bead_workflow)?f.bead_workflow:{},Or=new Map;for(let[g,z]of Object.entries(It))Array.isArray(z)&&Or.set(g,ui(z));for(let g of[...A,...G]){let z=g.labels;Array.isArray(z)&&!Or.has(g.id)&&Or.set(g.id,ui(z))}let ln=new Map,Mn=o?.get()?.last_good?.result?.groups;for(let g of Array.isArray(Mn)?Mn:[]){if(g?.eligible!==!0||!Array.isArray(g.members))continue;let z=g.members.map(Ke=>{let dt=(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).find(jt=>jt.entries.some(Nt=>Nt.bead_id===Ke));return dt?dt.id:null});if(!(z.every(Ke=>Ke!==null)&&new Set(z).size===1))for(let Ke of g.members)ln.set(Ke,g.members.filter(dt=>dt!==Ke))}let ys=f.bead_blocked_by&&typeof f.bead_blocked_by=="object"&&!Array.isArray(f.bead_blocked_by)?f.bead_blocked_by:{},cn=new Map;for(let[g,z]of Object.entries(nt))z&&typeof z=="object"&&cn.set(g,z);for(let g of[...A,...G])cn.set(g.id,{created_at:g.created_at,updated_at:g.updated_at});let zr=g=>cn.get(g)||{},Lr=f.pr_wait||[],Pn=f.pr_observations||{},Ue=f.pr_activity||{},Et=f.cleanup_failed||{},Dn=Object.entries(Et).map(([g,z])=>({bead_id:g,step:z&&z.step?z.step:"",reason:z&&z.reason?z.reason:"",at:z&&typeof z.at=="number"?z.at:null,detail:z&&typeof z.detail=="string"?z.detail:null,output_tail:z&&typeof z.output_tail=="string"&&z.output_tail?z.output_tail:void 0,log_path:z&&typeof z.log_path=="string"&&z.log_path?z.log_path:void 0,retry_count:z&&typeof z.retry_count=="number"&&Number.isInteger(z.retry_count)&&z.retry_count>0?z.retry_count:0,failure_code:z&&typeof z.failure_code=="string"?z.failure_code:void 0,subject_id:z&&typeof z.subject_id=="string"?z.subject_id:void 0,repair_eligible:!!(z&&z.repair_eligible),repair:z&&z.repair?z.repair:void 0})),yi=f.queue||[],ip=new Set([...yi.map(g=>g.bead_id),...(Array.isArray(f.serial_lanes)?f.serial_lanes:[]).flatMap(g=>(Array.isArray(g?.entries)?g.entries:[]).map(z=>z.bead_id)),...Lr.map(g=>g.bead_id),...f.done.map(g=>g.bead_id)]),lp=new Set(G.map(g=>g.id)),cp=i?i.get()?.order||{}:{},vi=new Set,wi=[];for(let g of[...A,...G])ip.has(g.id)||vi.has(g.id)||Jh(g)||(vi.add(g.id),wi.push(g));L=Xh(wi,H,cp);let up=f.admission||{},ki=g=>{let z=up[g];if(!z)return"";if(z.stale===!0)return"\u267B\uFE0F stale\u2192\uC7AC\uB9AC\uBDF0";let _e=typeof z.reason=="string"?z.reason:"",Ke=_e.indexOf(":");return Ke>0&&Ke<_e.length-1?`\u26D4 ${_e.slice(0,Ke)} (${_e.slice(Ke+1)})`:`\u26D4 ${_e}`},dp=L.map(g=>{let z=uo(g),_e=z.path.length>0,Ke=g.workflow?.route==="quick_fix"||g.metadata&&g.metadata.route==="quick_fix",dt=!Object.hasOwn(g,"description")||typeof g.description=="string"&&g.description.trim().length>0,jt=Object.hasOwn(g,"labels")&&Ad(g.labels),Nt=!jt&&(Ke?dt:_e&&!z.conflict),At=lp.has(g.id),dr=[];At&&dr.push(eb(g)),Ke&&!dt?dr.push("missing_description"):!Ke&&z.conflict?dr.push("spec_id_conflict"):!Ke&&!_e&&dr.push("spec \uC5C6\uC74C");let Es=ki(g.id);return Es&&dr.push(Es),{id:g.id,title:g.title||g.id,reason:dr.join(" \xB7 "),draggable:Nt,lane:"candidate",created_at:g.created_at,updated_at:g.updated_at,workflow:g.workflow,is_quick_fix:Ke,status:g.status,worker_ineligible:jt,blocked:At,has_spec:_e,exec_chips:Oe(g.id)}}),qo=Uh(dp,j),pp=qo.visible,fp=f.revise_parked||{},vs=f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},Fo=(g,z)=>g.map((_e,Ke)=>{let dt=z!=="done",jt=z!=="done"&&z!=="queue",Nt=dt?fp[_e.bead_id]:null,At=dt?vr(vs,_e.bead_id):null,dr=At?.operation?At:null,Es=dt&&Or.get(_e.bead_id)===!0,Gi=ys[_e.bead_id]||[],zo=f.admission&&typeof f.admission=="object"?f.admission[_e.bead_id]:null,Ho=dt?bu(zo,!!dr||Z.has(_e.bead_id)):null,Sp=dt&&!Ho?ki(_e.bead_id):null,Ep=dt?[Sp]:[],Vi=dt&&Gi.length>0&&typeof zo?.reason=="string"&&zo.reason.startsWith("not_ready")?[`\u23F8 ${Gi.join(", ")} \uC644\uB8CC \uB300\uAE30 (blocks)`]:[],Go=dt?ln.get(_e.bead_id):void 0;return Go&&Go.length>0&&Vi.push(`\u2733 serial \uAD8C\uC7A5 \xB7 ${Go.join(", ")}\uC640`),{id:_e.bead_id,title:rt.get(_e.bead_id)||_e.bead_id,reason:Ep.filter(Boolean).join(" \xB7 "),draggable:dt&&!dr&&!Ho,done:z==="done",lane:z,seq:jt?Ke+1:void 0,worker_serial:Es,discard:dr,stale_work:Ho,badges:[...Vi,...Nt?["\u23F8 REVISE \uD30C\uD0B9"]:[]],alert:!!Nt,revise_action:!!Nt,revise_enabled:!!Nt&&!dr&&!Ae.has(_e.bead_id),revise_title:Nt?Nt.notes_tail?`REVISE findings (\uC790\uC138\uD788\uB294 \uCE74\uB4DC \uD074\uB9AD \u2192 \uC774\uC288 \uC0C1\uC138):
${Nt.notes_tail}`:"notes\uC758 REVISE finding\uC744 \uC2A4\uD399\uC5D0 \uBC18\uC601\uD558\uB294 \uCC98\uBD84 \uC138\uC158\uC744 \uB744\uC6C1\uB2C8\uB2E4":"",usage:z==="done"?ir(f.attempts||{},_e.bead_id):null,work_ms:z==="done"?$o(f.attempts||{},_e.bead_id):null,done_at:z==="done"&&typeof _e.added_at=="number"?_e.added_at:void 0,exec_chips:dt?Oe(_e.bead_id):null,workflow:dt&&Jt[_e.bead_id]||null,...zr(_e.bead_id)}}),un=f.attempts?Object.values(f.attempts):[],jo=new Set;for(let g of un)g&&typeof g.resumed_from=="string"&&g.resumed_from.length>0&&jo.add(g.resumed_from);let $i=new Map;for(let g of un)$i.set(g.bead_id,g.attempt_id);let ws=new Map;for(let g of un)ws.set(g.attempt_id,g);function Bo(g){let z=new Set,_e=g;for(;_e&&!z.has(_e.attempt_id);){if(_e.conflict_resolution===!0)return!0;z.add(_e.attempt_id),_e=typeof _e.resumed_from=="string"&&_e.resumed_from.length>0&&ws.get(_e.resumed_from)||null}return!1}let ks=typeof f.declared_base=="string"?f.declared_base:null;function _p(g){let z=null;for(let _e of un)!_e||_e.bead_id!==g||Bo(_e)||(z===null||(typeof _e.started_at=="number"?_e.started_at:0)>=(typeof z.started_at=="number"?z.started_at:0))&&(z=_e);return z&&typeof z.target_base=="string"?z.target_base:null}let xi=[],Ai=[],mp=xd(f),Si=g=>{let z=typeof g.session_id=="string"&&g.session_id.length>0,_e=jo.has(g.attempt_id);return{eligible:z&&!_e,reason:z?_e?"\uC774\uBBF8 \uC774\uC5B4\uBC1B\uC740 attempt (child attempt \uC874\uC7AC) \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00":null:"session_id \uC5C6\uB294 \uAD6C attempt \u2014 \uC774\uC5B4\uD558\uAE30 \uBD88\uAC00"}},ur=null;for(let g of un){let z=g.status==="paused"&&!jo.has(g.attempt_id);if(g.status==="running"||z)Ai.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:rt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,paused:z,conflict_resolution:Bo(g),base_exception:_i(ks,g.target_base),can_pause:typeof g.session_id=="string"&&g.session_id.length>0,discard:vr(vs,g.bead_id,{attempt_id:g.attempt_id}),workflow:Jt[g.bead_id]||null,usage:ir(f.attempts||{},g.bead_id),rollup:ut(g.bead_id),rollup_expanded:le.has(g.bead_id),exec_chips:re(g),...zr(g.bead_id)});else if((g.status==="failed"||g.status==="orphaned")&&mp(g)){let _e=Si(g);xi.push({bead_id:g.bead_id,attempt_id:g.attempt_id,title:rt.get(g.bead_id)||g.bead_id,runner:g.runner||null,model:g.model||null,effort:g.effort||null,speed:g.speed||null,continuation_mode:g.continuation_mode||null,started_at:typeof g.started_at=="number"?g.started_at:null,resumed_from:g.resumed_from||null,failed:!0,status:g.status,status_label:g.status==="orphaned"?"\uC911\uB2E8\uB428":"\uC2E4\uD328",discard:vr(vs,g.bead_id,{attempt_id:g.attempt_id}),resume_eligible:_e.eligible,resume_reason:_e.reason,conflict_resolution:Bo(g),base_exception:_i(ks,g.target_base),workflow:Jt[g.bead_id]||null,usage:ir(f.attempts||{},g.bead_id),rollup:ut(g.bead_id),rollup_expanded:le.has(g.bead_id),exec_chips:re(g),...zr(g.bead_id)}),ur=g}}let $s=[...xi,...Ai].map(g=>{let z=ws.get(g.attempt_id),_e=z?.quickfix_landing;if(z?.quickfix_lane!==!0||!_e||typeof _e!="object")return g;let Ke=typeof _e.reason=="string"&&_e.reason.length>0?_e.reason:null,dt=gs({bead_id:z.bead_id,merge_sha:_e.head_sha,cleanup_cursor:_e.cursor,cleanup_failed:Ke?{step:_e.cursor,reason:Ke}:null,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]});return dt?{...g,landing:dt}:g}),Ei=null;if(ur){let g=Si(ur),z=ur.cause_detail;Ei={bead_id:ur.bead_id,repo:ur.repo||"",reason:ur.cause||ur.status,cause_detail:z&&typeof z.reason=="string"?{reason:z.reason,command:typeof z.command=="string"?z.command:null}:null,resume_attempt_id:ur.attempt_id,resume_eligible:g.eligible,resume_reason:g.reason,discard:vr(vs,ur.bead_id,{attempt_id:ur.attempt_id})}}let Ti=new Set($s.map(g=>g.bead_id)),Uo=Array.isArray(f.merge_queue)?f.merge_queue:[],Ci=new Map,Ri=new Map,Ii=new Map,Oi=new Map,Li=new Map;Uo.forEach((g,z)=>{g&&typeof g.bead_id=="string"&&(Ci.set(g.bead_id,z+1),Ri.set(g.bead_id,g.resolution),Ii.set(g.bead_id,g.continuation_action||null),Oi.set(g.bead_id,g.head_review||null),Li.set(g.bead_id,g.authority||null))});let dn=f.merge_queue_state||{active:null,failures:{}},gp=dn.failures||{},Mi=dn.waiting&&typeof dn.waiting.bead_id=="string"&&typeof dn.waiting.reason=="string"?dn.waiting:null,hp=f.auto_merge_skips||{},Pi=g=>{let z=hp[g];if(!z)return null;let _e=Pn[g],Ke=_e&&_e.pr?_e.pr.head_sha:null;return Ke&&Ke===z.head_sha?z.reason||"":null},xs=new Map;for(let g of $s)g.failed!==!0&&g.conflict_resolution&&(g.paused?xs.has(g.bead_id)||xs.set(g.bead_id,"paused"):xs.set(g.bead_id,"running"));let Di=$s.filter(g=>!g.paused&&g.failed!==!0).length,Ni=(f.workspace_info||{}).slots,qi=typeof Ni=="number"?Ni:typeof f.slots=="number"?f.slots:Do,bp=Di>qi,As=Zr(P),yp=(Array.isArray(f.done)?f.done.slice():[]).filter(g=>As===void 0||typeof g.added_at!="number"||g.added_at>=As).sort((g,z)=>(z.added_at||0)-(g.added_at||0)),Nn=Fo(yp,"done"),vp=new Set((Array.isArray(f.done)?f.done:[]).map(g=>g?.bead_id).filter(g=>typeof g=="string")),Fi=[],wp=u?.()||"";for(let g of m){let z=Jr(g.closed_at);if(typeof g.id!="string"||vp.has(g.id)||z===null||As!==void 0&&z<As||typeof g.comment_count!="number"||g.comment_count<=0)continue;let _e=`${wp}\0${g.id}\0${String(g.updated_at)}\0${g.comment_count}`,Ke=D.get(_e);Ke===void 0&&r&&(D.set(_e,"pending"),Promise.resolve(r("get-comments",{id:g.id})).then(dt=>{let jt=Array.isArray(dt)&&dt.some(Nt=>po(typeof Nt?.text=="string"?Nt.text:"")?.lane==="session");D.set(_e,jt?"session":"not-session"),je()}).catch(()=>{D.set(_e,"failed"),je()})),Ke==="session"&&Fi.push({id:g.id,title:g.title||g.id,reason:"",draggable:!1,done:!0,lane:"done",selectable:!1,selected:!1,worker_serial:!1,badges:["\uC138\uC158 \uC791\uC5C5"],alert:!1,usage:null,work_ms:null,done_at:z,created_at:g.created_at,updated_at:g.updated_at})}Nn.push(...Fi),Nn.sort((g,z)=>(z.done_at||0)-(g.done_at||0));let Ss={};for(let g of xr)Ss[g]=0;let ji=!1,Bi=0,Wo=0,Ui=0;for(let g of Nn){let z=g.usage;if(z&&typeof z=="object"){let _e=!1;for(let Ke of xr)Number.isFinite(z[Ke])&&(Ss[Ke]+=z[Ke],ji=!0,_e=!0);_e&&(Wo+=1,Number.isFinite(z.total_cost_usd)&&(Bi+=z.total_cost_usd,Ui+=1))}}Wo>0&&Ui===Wo&&(Ss.total_cost_usd=Bi);let Wi=Nn.map(g=>g.usage).filter(g=>g&&typeof g=="object"&&g.providers),kp=Wi.length>0?Wt(Zs(Wi)):ji?Ar(Ss):null,$p=f.lane_states&&typeof f.lane_states=="object"&&!Array.isArray(f.lane_states)?f.lane_states:{},xp=Array.isArray(f.serial_lanes)?f.serial_lanes:[],zi=g=>{if(Lr.some(Ke=>Ke.bead_id===g))return"PR \uB300\uAE30 \xB7 \uC810\uC720";let z=un.filter(Ke=>Ke&&Ke.bead_id===g),_e=z.length>0?z[z.length-1].status:null;return _e==="failed"||_e==="orphaned"?"\uC2E4\uD328 \xB7 \uC810\uC720 \uC720\uC9C0":_e==="paused"?"\uC77C\uC2DC\uC815\uC9C0 \xB7 \uC810\uC720":"\uC2E4\uD589 \uC911 \xB7 \uC810\uC720"},Hi=xp.filter(g=>g&&typeof g.id=="string"&&Array.isArray(g.entries)).map((g,z)=>{let _e=$p[g.id]||{},Ke=new Map((Array.isArray(_e.corrections)?_e.corrections:[]).filter(At=>At&&typeof At.bead_id=="string"&&typeof At.after=="string").map(At=>[At.bead_id,At.after])),dt=Fo(g.entries.filter(At=>!Ti.has(At.bead_id)),g.id).map(At=>Ke.has(At.id)?{...At,badges:[`\u{1F517} ${Ke.get(At.id)} \uB4A4 (blocks \uC790\uB3D9)`,...At.badges]}:At),jt=Array.isArray(_e.occupied_by)?_e.occupied_by.filter(At=>typeof At=="string"):[],Nt=jt.map(At=>({id:At,title:rt.get(At)||At,draggable:!1,lane:g.id,ghost:!0,badges:[zi(At)]}));return{id:g.id,index:z+1,rows:[...Nt,...dt],occupied:jt.length>0,badge:jt.length>0?zi(jt[0]):"\uB300\uAE30",cycle:_e.cycle===!0}}),Ap=typeof f.serial_lane_count=="number"?f.serial_lane_count:Hi.length;return{queue:f,idToTitle:rt,candidates:pp,candidate_hidden:{blocked:qo.hidden_blocked,spec:qo.hidden_spec},running:$s,live_count:Di,slots:qi,over_cap:bp,failure:Ei,waiting:Fo(yi.filter(g=>!Ti.has(g.bead_id)),"queue"),serial_lanes:Hi,serial_lane_count:Ap,pr_wait:Lr.map(g=>ib(g.bead_id,rt.get(g.bead_id)||g.bead_id,Pn,Et[g.bead_id]||null,ir(f.attempts||{},g.bead_id),Ue[g.bead_id]||(B.has(g.bead_id)||ee.has(g.bead_id)?{activity:null,merge_progress:{step:"merging"}}:null),xs.get(g.bead_id)||null,g.external===!0,{position:Ci.get(g.bead_id)||0,active:dn.active===g.bead_id,failure:gp[g.bead_id]||null,waiting:Mi?.bead_id===g.bead_id?Mi.reason:null,resolution:Ri.get(g.bead_id),continuation_action:Ii.get(g.bead_id),head_review:Oi.get(g.bead_id)||null,authority:Li.get(g.bead_id)||null},g.wt_present!==!1,f.auto_merge===!0?Pi(g.bead_id):null,_i(ks,_p(g.bead_id)),f.completion_status&&typeof f.completion_status=="object"&&!Array.isArray(f.completion_status)&&f.completion_status[g.bead_id]||null,f.discard_operations&&typeof f.discard_operations=="object"&&!Array.isArray(f.discard_operations)?f.discard_operations:{},ws.get($i.get(g.bead_id)||"")?.worker_serial===!0,f.auto_merge===!0,{merge_sha:g.merge_sha,cleanup_cursor:g.cleanup_cursor,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]})).map(g=>({...g,workflow:Jt[g.id]||null,...zr(g.id)})),merge_queue_length:Uo.length,merge_queue_running:Uo.length>0,auto_excluded:Lr.map(g=>g.bead_id).filter(g=>Pi(g)!==null),declared_base:ks,done:Nn,token_total:kp,cleanup_failures:Dn,repo_operations:Array.isArray(f.repo_operations)?f.repo_operations:[]}}function Y(){let A=!!o?.get()?.job,G=!A&&o?.isPending?.()===!0,m=A?"\uBD84\uC11D \uC911":G?"\uC900\uBE44 \uC911":"";return l`<button
      type="button"
      class=${m?"worker-analysis-btn worker-analysis-btn--running":"worker-analysis-btn"}
      aria-busy=${m?"true":"false"}
      title="대기 이슈의 병렬 실행 가능성을 분석해 직렬 그룹을 제안합니다 (클릭할 때만 실행)"
    >
      ✳ 병렬성
      분석${m?l`<span class="worker-analysis-btn__badge">${m}</span>`:""}
    </button>`}function xe(f){let A=f.waiting.length>0?f.waiting[0].id:"\u2014",G=l`<button
      type="button"
      class="worker-play${f.queue.auto_advance?" is-active":""}"
    >
      ${f.queue.auto_advance?"\u23F8 \uC790\uB3D9\uD654 \uBA48\uCDA4":"\u25B6 \uC790\uB3D9\uD654"}
    </button>`,m=Ze(f),v=f.over_cap?l`<span
          class="worker-overcap"
          title="수동 재개(▶)는 슬롯 cap을 초과할 수 있습니다 — 자동 진행은 cap을 지킵니다"
          >cap 초과</span
        >`:"",de=l`<span class="worker-kpi__chip worker-kpi__chip--running"
        >실행 <b>${f.live_count}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--pr"
        >PR 대기 <b>${f.pr_wait.length}</b></span
      >
      <span class="worker-kpi__chip worker-kpi__chip--done"
        >${O()} 완료 <b>${f.done.length}</b></span
      >`,ue=l`<span
      class="worker-kpi__chip worker-kpi__chip--base"
      title=${f.declared_base?"\uC774 \uC6CC\uD06C\uC2A4\uD398\uC774\uC2A4\uAC00 \uC120\uC5B8\uD55C target base (docs/agents/repo-ops.toml). \uB514\uC2A4\uD328\uCE58 \uC2DC\uC810\uC758 \uAC80\uC99D\uC740 \uBCC4\uB3C4":"\uC120\uC5B8 \uD30C\uC77C\uC744 \uC77D\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 \u2014 target base \uD655\uC778 \uBD88\uAC00"}
      >base ${f.declared_base||"?"}</span
    >`,Be=l`<label class="worker-tgl worker-slots"
        >동시 실행
        <input
          type="number"
          class="worker-slots__input"
          min=${Do}
          step="1"
          .value=${String(f.slots)}
          title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
      /></label>
      <label
        class="worker-tgl worker-serial-lanes"
        title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
        >직렬 레인
        <select class="worker-serial-lane-count" aria-label="직렬 레인 수">
          ${Array.from({length:Fd},(re,q)=>q+1).map(re=>l`<option
                value=${String(re)}
                ?selected=${f.serial_lane_count===re}
              >
                ${re}
              </option>`)}
        </select>
      </label>
      ${o?Y():""} `,$e=xu({failure:f.failure}),S=hu(f.repo_operations,f.cleanup_failures);return b?l`<div class="worker-ribbon">
          ${G} ${m}
          <div class="worker-kpi worker-kpi--ribbon">${v}${de}</div>
        </div>
        <div class="worker-ctrl worker-ctrl--mobile">
          <div class="worker-ctrl__ops">${Be}</div>
          <div class="worker-kpi">${ue}</div>
        </div>
        ${S}${K.template()}${$e}`:l`<div class="worker-ctrl">
        <div class="worker-ctrl__ops">${G}${m}${Be}</div>
        <div class="worker-kpi">
          ${v}${de}${ue}
          ${(Array.isArray(f.token_total)?f.token_total:f.token_total?[{label:f.token_total,tooltip:`${O()} \uC644\uB8CC\uB41C \uC774\uC288\uB4E4\uC774 \uC0DD\uC560 \uC804\uCCB4\uC5D0 \uC4F4 \uD1A0\uD070 \uB204\uC801 (\uC785\uB825+\uCD9C\uB825+\uCE90\uC2DC). \uC774 \uAE30\uAC04\uC5D0 \uC18C\uBAA8\uB41C \uC591\uC774 \uC544\uB2C8\uB2E4`}]:[]).map(re=>l`<span
                class="worker-kpi__chip worker-kpi__chip--tokens"
                title=${re.tooltip}
                >${O()} 완료 · 누적 ${re.label}</span
              >`)}
          <span class="worker-kpi__next worker-stat"
            >다음 <b>${A}</b></span
          >
        </div>
      </div>
      ${S}${K.template()}${$e}`}function he(f){if(f.running.length===0&&f.pr_wait.length===0)return"";let A=f.running.some(G=>!G.paused&&G.failed!==!0);return l`<section
      class="worker-now${A?" worker-pane--live":""}"
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
      ${f.running.length>0?Qa(f.running,Date.now(),ve):""}
      ${f.pr_wait.map(G=>sn(G))}
    </section>`}function Ee(f){let A=f.candidate_hidden;return l`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시 (기본 숨김)">
        <input
          type="checkbox"
          class="worker-filter__blocked"
          .checked=${j.show_blocked}
        />
        🔒 blocked${A.blocked>0?` ${A.blocked}`:""}
      </label>
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${Wh.map(G=>l`<button
              type="button"
              class="worker-filter__chip${j.spec===G.value?" is-active":""}"
              data-spec=${G.value}
              aria-pressed=${j.spec===G.value?"true":"false"}
            >
              ${G.label}
            </button>`)}
        ${A.spec>0?l`<span class="worker-filter__hidden">숨김 ${A.spec}</span>`:""}
      </div>
    </div>`}function Fe(){return l`<select
      class="worker-sort"
      aria-label="후보 정렬"
      title="후보 정렬"
      .value=${H}
    >
      ${zh.map(f=>l`<option value=${f.value} ?selected=${H===f.value}>
            ${f.label}
          </option>`)}
    </select>`}function _t(){return l`<div class="worker-done-controls">
      <select
        class="worker-sort worker-done-range"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${P}
      >
        ${Mr.map(f=>l`<option value=${f.value} ?selected=${P===f.value}>
              ${f.label}
            </option>`)}
      </select>
    </div>`}function yt(f){let A=l`<span
      class="worker-lane__badge${f.occupied?" worker-lane__badge--held":""}"
      >${f.badge}</span
    >`,G=f.cycle?l`<div class="worker-lane__cycle">
          ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
        </div>`:"";return cr({id:`worker-pane-lane-${f.id}`,lane:f.id,title:`\uC9C1\uB82C ${f.index}`,items:f.rows,empty:"\uBE44\uC5B4 \uC788\uC74C \u2014 \uD589\uC744 \uC5EC\uAE30\uB85C \uB4DC\uB798\uADF8",header_control:A,controls:G})}function Ze(f){let A=f.queue.auto_merge===!0;if(f.merge_queue_running)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop${A?" is-active":""}"
        title=${A?"\uC790\uB3D9 \uBA38\uC9C0\uB97C \uB044\uACE0 \uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)":"\uB300\uAE30 \uC911\uC778 \uD56D\uBAA9\uC744 \uBAA8\uB450 \uBE8D\uB2C8\uB2E4 (\uC9C4\uD589 \uC911\uC778 \uD56D\uBAA9\uC740 \uB05D\uAE4C\uC9C0 \uC218\uD589)"}
      >
        ${A?"\u23F8 \uC790\uB3D9 \uBA38\uC9C0 \uC911\uB2E8":"\uC77C\uAD04 \uBA38\uC9C0 \uC911\uB2E8"} ${f.merge_queue_length}
      </button>`;if(A)return l`<button
        type="button"
        class="worker-merge-all worker-merge-all--stop is-active"
        title="자동 머지 켜짐 — 자격이 생기는 PR을 계속 큐에 넣습니다. 클릭하면 끕니다"
      >
        ⏸ 자동 머지
      </button>`;let G=new Set(f.auto_excluded),m=f.pr_wait.filter(v=>v.merge_action&&v.merge_enabled&&!G.has(v.id)).length;return l`<button
      type="button"
      class="worker-merge-all"
      title="켜 두면 자격이 생기는 PR을 계속 큐에 넣어 순서대로 충돌 해소·머지합니다"
    >
      ▶ 자동 머지${m>0?` ${m}`:""}
    </button>`}function Ft(f){let A=cr({id:"worker-pane-candidate",lane:"candidate",title:"\uD6C4\uBCF4 \xB7 Board \uC5F0\uB3D9",items:f.candidates,src:!0,empty:"\uD6C4\uBCF4 \uC5C6\uC74C",header_control:Fe(),controls:Ee(f),place_menu:Ge(f.candidates)});return b?l`<div class="worker-lanes worker-lanes--mobile">
        ${he(f)}
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8 \uB610\uB294 [\uB300\uAE30\uB85C \u21B4]\uB85C \uBC30\uCE58",collapsible:!0,collapsed:U.queue,preview:Ud(f.waiting)})}
        ${f.serial_lanes.map(G=>yt(G))}
        ${A}
        ${cr({id:"worker-pane-done",lane:"done",title:"\uC644\uB8CC",items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:_t(),collapsible:!0,collapsed:U.done,preview:Array.isArray(f.token_total)?f.token_total.map(G=>G.label).join(" \xB7 "):f.token_total||Ud(f.done)})}
      </div>`:l`<div class="worker-lanes">
      ${A}
      <div class="worker-wait">
        ${cr({id:"worker-pane-queue",lane:"queue",title:"\uBCD1\uB82C \uB300\uAE30",items:f.waiting,empty:"\uB4DC\uB798\uADF8\uB85C \uBC30\uCE58"})}
        ${f.serial_lanes.map(G=>yt(G))}
      </div>
      ${cr({id:"worker-pane-running",lane:"running",title:`\uC2E4\uD589 \uC911 \xB7 \uC2AC\uB86F ${f.slots}`,items:f.running,live:f.running.some(G=>!G.paused&&G.failed!==!0),body:Qa(f.running,Date.now(),ve)})}
      ${cr({id:"worker-pane-pr-wait",lane:"pr_wait",title:"PR \uB300\uAE30",items:f.pr_wait,empty:"PR \uB300\uAE30 \uC5C6\uC74C"})}
      ${cr({id:"worker-pane-done",lane:"done",title:`\uC644\uB8CC \xB7 ${O()} ${f.done.length}`,items:f.done,empty:`${O()} \uC644\uB8CC \uC5C6\uC74C`,controls:_t()})}
    </div>`}function zt(f){U={...U,[f]:!U[f]},Qh(U),je()}function je(){let f=M();Ye(xe(f),ke),Ye(Ft(f),De)}function Lt(){if(typeof window.matchMedia!="function")return;let f=window.matchMedia(Yh);b=!!f.matches;let A=G=>{let m=!!(G&&typeof G.matches=="boolean"?G.matches:f.matches);m!==b&&(b=m,je())};typeof f.addEventListener=="function"?(f.addEventListener("change",A),ae.push(()=>f.removeEventListener("change",A))):typeof f.addListener=="function"&&(f.addListener(A),ae.push(()=>f.removeListener(A)))}let Ut=null;function Mt(f){Ut=f.target instanceof Element?f.target:null}function k(f){let G=f.target?.closest?.('.worker-mini[draggable="true"], .worker-card[draggable="true"]');if(!G)return;if(Ut&&G.contains(Ut)&&Ut.closest("input, button, a")){f.preventDefault();return}let m=G.dataset.beadId||"",v=G.dataset.lane||"";$={bead_id:m,from_lane:v};try{f.dataTransfer?.setData("text/plain",m),f.dataTransfer&&(f.dataTransfer.effectAllowed="move")}catch{}}function w(f){let A=f.target?.closest?.(".worker-pane");if(!A)return;let G=A.dataset.lane||"";G!=="candidate"&&G!=="queue"&&!/^s[1-5]$/.test(G)||(f.preventDefault(),f.dataTransfer&&(f.dataTransfer.dropEffect="move"),A.classList.add("worker-pane--drag-over"))}function I(f){f.target?.closest?.(".worker-pane")?.classList.remove("worker-pane--drag-over")}function W(f,A){let G=L.find(ue=>ue.id===f);if(!G)return;let m=L.filter(ue=>ue.id!==f),v=m.length;if(A){let ue=A.dataset.beadId;if(ue===f)return;let Be=m.findIndex($e=>$e.id===ue);Be>=0&&(v=Be)}let de=m.slice();de.splice(v,0,G),h.applyReorder(f,de,v)}function ye(f){let A=f.target?.closest?.(".worker-pane");if(!A)return;f.preventDefault(),A.classList.remove("worker-pane--drag-over");let G=A.dataset.lane||"",m=$?.bead_id||f.dataTransfer?.getData("text/plain")||"",v=$?.from_lane||"";if($=null,!m)return;let de=f.target?.closest?.(".worker-mini, .worker-card"),ue=Array.from(A.querySelectorAll(".worker-mini, .worker-card")),Be=ue.length;if(de){let $e=ue.indexOf(de);$e>=0&&(Be=$e)}if(Be=Math.max(0,Be-A.querySelectorAll(".worker-mini--ghost").length),A.classList.contains("worker-pane--collapsed")&&(Be=J()),G==="candidate"){if(v==="candidate"){W(m,de);return}(v==="queue"||/^s[1-5]$/.test(v))&&qe(m);return}if(G==="queue"||/^s[1-5]$/.test(G)){let $e=G==="queue"?"parallel":G;v===G?te(m,$e,Be):ie(m,$e)}}function we(f){j=f,Bh(f),je()}function be(f){H=f==="board"||f==="created"||f==="spec"?f:No,Gh(H),je()}function tt(f){P=ar(f)?f:er,Kh(P),p?.(P),je()}function Ie(f){let A=f.target?.closest?.(".worker-serial-lane-count");if(A){let Be=Number.parseInt(A.value,10);Number.isFinite(Be)&&C(Be).then(je);return}let G=f.target?.closest?.(".worker-filter__blocked");if(G){we({...j,show_blocked:G.checked});return}let m=f.target?.closest?.(".worker-done-range");if(m){tt(m.value);return}let v=f.target?.closest?.(".worker-sort");if(v){be(v.value||No);return}let de=f.target?.closest?.(".worker-slots__input");if(!de)return;let ue=Number.parseInt(de.value,10);if(!Number.isFinite(ue)){je();return}y(ue).then(je)}function T(f){return f?{runner:f.runner||void 0,model:f.model||void 0,effort:f.effort||void 0,worktree:f.worktree||void 0,status:f.status||void 0,session_id:f.session_id||void 0}:{}}function ce(){let f=M();return{operations:f.repo_operations,cleanup_failures:f.cleanup_failures,repo:u&&u()||""}}function Re(){ve&&We.close(),fe.hidden=!1,Ce.hidden=!1,Ve.open(ce()),je()}function ft(f){let A=Se(),G=A.attempts?A.attempts[f]:null;ve=f,ze=null,Ve.close(),fe.hidden=!0,Ce.hidden=!1,We.open({attempt_id:f,meta:T(G)}),je()}function Pt(f,A){ve=null,ze=f,Ve.close(),fe.hidden=!0,Ce.hidden=!1,We.open({attempt_id:f,meta:A,hide_prompt:!0}),je()}function kt(){if(Ve.isOpen()&&Ve.refresh(ce()),ze){let G=(o?.get()?.runs||[]).find(m=>m.run_id===ze);G?We.updateMeta(pi(G)):We.close();return}if(!ve)return;let f=Se(),A=f.attempts?f.attempts[ve]:null;if(A){We.updateMeta(T(A));return}We.close()}function Dt(f){let A=f.target;if(A?.closest?.(".worker-mini__serial, .worker-mini__grip")||A?.closest?.("#worker-parallel-analysis-dialog"))return;if(A?.closest?.(".worker-analysis-btn")){Q?.open();return}if(A?.closest?.(".worker-repo-strip")||A?.closest?.(".worker-mini__timeline")){Re();return}let G=A?.closest?.(".worker-repo-op__session");if(G){let Ue=G.dataset.attemptId;Ue&&ft(Ue);return}let m=A?.closest?.(".worker-repo-op__resolve");if(m){E(m.dataset.operationId||"");return}let v=A?.closest?.(".worker-repo-op__dismiss");if(v){F(v.dataset.operationId||"");return}let de=A?.closest?.(".worker-cleanup__resume");if(de){let Ue=de.dataset.beadId;Ue&&bt(Ue);return}let ue=A?.closest?.(".worker-banner__resume");if(ue){let Ue=ue.dataset.attemptId;Ue&&it(Ue);return}let Be=A?.closest?.(".worker-banner__discard");if(Be){let Ue=Be.dataset.confirmation==="merged"?"merged":"unmerged";Pe(Be.dataset.beadId||"",Be.dataset.attemptId||null,Ue,Be.dataset.operationId||null);return}let $e=A?.closest?.(".worker-banner__dismiss");if($e){let Ue=$e.dataset.attemptId;Ue&&Xe(Ue);return}if(A?.closest?.(".worker-play")){X(!Se().auto_advance);return}let S=A?.closest?.(".worker-merge-all");if(S){S.classList.contains("worker-merge-all--stop")?Se().auto_merge===!0?wt(!1):et():wt(!0);return}let re=A?.closest?.(".worker-pane__hd--toggle");if(re){let Ue=re.dataset.lane;(Ue==="queue"||Ue==="done")&&zt(Ue);return}let q=A?.closest?.(".worker-card__place-lane");if(q){let Ue=q.dataset.beadId,Et=q.dataset.lane;Ue&&(Et==="parallel"||/^s[1-5]$/.test(Et||""))&&(V=null,je(),ie(Ue,Et));return}if(A?.closest?.(".worker-card__place-cancel")){V=null,je();return}let ut=A?.closest?.(".worker-card__place");if(ut){let Ue=ut.dataset.beadId;Ue&&!ut.disabled&&(Qe()?(V=Ue,je()):ie(Ue,"parallel"));return}let st=A?.closest?.(".worker-filter__chip");if(st){let Ue=st.dataset.spec;(Ue==="all"||Ue==="with"||Ue==="without")&&we({...j,spec:Ue});return}let rt=A?.closest?.(".worker-mini__merge");if(rt){let Ue=rt.dataset.beadId||"";Se().cleanup_failed?.[Ue]?bt(Ue):ht(Ue);return}let nt=A?.closest?.(".worker-mini__merge-cancel");if(nt){He(nt.dataset.beadId||"");return}let It=A?.closest?.(".worker-mini__discard");if(It){Pe(It.dataset.beadId||"",It.dataset.attemptId||null,It.dataset.discardMode==="merged"?"merged":"unmerged",It.dataset.operationId||null);return}let Jt=A?.closest?.(".worker-mini__stale-continue");if(Jt){ct("worker-stale-work-continue",Jt.dataset.beadId||"",Jt.dataset.actionId||"");return}let Or=A?.closest?.(".worker-mini__stale-backup");if(Or){ct("worker-stale-work-backup-fresh",Or.dataset.beadId||"",Or.dataset.actionId||"");return}let ln=A?.closest?.(".worker-mini__stale-recheck");if(ln){ct("worker-stale-work-recheck",ln.dataset.beadId||"",ln.dataset.actionId||"");return}let Mn=A?.closest?.(".worker-mini__revise-fix");if(Mn){xt("worker-revise-fix",Mn.dataset.beadId||"");return}let ys=A?.closest?.(".worker-mini__revise-approve");if(ys){xt("worker-revise-approve",ys.dataset.beadId||"");return}if(A?.closest?.(".worker-mini__pr"))return;if(A?.closest?.(".rtile__discard")){let Ue=A?.closest?.(".rtile"),Et=Ue?.dataset?.beadId,Dn=Ue?.dataset?.attemptId;Et&&Pe(Et,Dn||null,"unmerged",A?.closest?.(".rtile__discard")?.dataset.operationId||null);return}if(A?.closest?.(".rtile__dismiss")){let Et=A?.closest?.(".rtile")?.dataset?.attemptId;Et&&Xe(Et);return}if(A?.closest?.(".rtile__pause")){let Et=A?.closest?.(".rtile")?.dataset?.attemptId;Et&&at(Et);return}if(A?.closest?.(".rtile__resume")){let Et=A?.closest?.(".rtile")?.dataset?.attemptId;Et&&it(Et);return}if(A?.closest?.(".rtile__session")){let Et=A?.closest?.(".rtile")?.dataset?.attemptId;Et&&ft(Et);return}if(A?.closest?.(".worker-drawer-overlay__backdrop")){Ve.close(),We.close();return}if(A?.closest?.(".worker-drawer-host"))return;let cn=A?.closest?.(".rtile .board-card__roll-toggle");if(cn){let Ue=cn.dataset.rollParent;Ue&&(le.has(Ue)?le.delete(Ue):le.add(Ue),je());return}let zr=A?.closest?.(".rtile .board-card__roll-child");if(zr){let Ue=zr.dataset.childId;Ue&&c&&c(Ue);return}let Lr=A?.closest?.(".rtile");if(Lr){if(A?.closest?.(".rtile__id")){let Et=Lr.dataset.beadId;Et&&rr(Et).then(Dn=>{Dn?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}let Ue=Lr.dataset.beadId;Ue&&c&&c(Ue);return}let Pn=A?.closest?.(".worker-mini, .worker-card");if(Pn){let Ue=Pn.dataset.beadId;if(A?.closest?.(".worker-mini__id, .worker-card__id")){Ue&&rr(Ue).then(Et=>{Et?me("\uBCF5\uC0AC\uB428","success",1200):me("\uBCF5\uC0AC \uC2E4\uD328","error",1600)});return}Ue&&c&&c(Ue)}}return e.addEventListener("pointerdown",Mt),e.addEventListener("dragstart",k),e.addEventListener("dragover",w),e.addEventListener("dragleave",I),e.addEventListener("drop",ye),e.addEventListener("click",Dt),e.addEventListener("change",Ie),Lt(),_&&ae.push(_.subscribe(()=>{for(let[f,A]of D)A==="failed"&&D.delete(f);je()})),s&&ae.push(s.subscribe(()=>{let f=u&&u()||"";f!==ot&&(ot=f,Je.close()),je(),kt()})),o&&typeof o.subscribe=="function"&&ae.push(o.subscribe(()=>{kt(),je()})),je(),{load(){N(),je()},refreshSessionDefaults:ne,destroy(){for(let f of ae.splice(0))try{f()}catch{}e.removeEventListener("pointerdown",Mt),e.removeEventListener("dragstart",k),e.removeEventListener("dragover",w),e.removeEventListener("dragleave",I),e.removeEventListener("drop",ye),e.removeEventListener("click",Dt),e.removeEventListener("change",Ie);try{We.destroy()}catch{}Ce.hidden=!0;try{Q?.destroy()}catch{}try{Je.destroy()}catch{}Ye(l``,e)}}}function gi(e){if(!e)return"Unknown";let t=e.split("/").filter(Boolean);return t.length>0?t[t.length-1]:"Unknown"}function Yd(e,t,r,n=async()=>{},s=async()=>{}){let o=Tt("views:workspace-picker"),a=null,i=!1,c=!1,u=!1;async function d(U){let B=U.target.value,Ae=t.getState().workspace?.current?.path||"";if(B&&B!==Ae){o("switching workspace to %s",B),i=!0,O();try{await r(B)}catch(Z){o("workspace switch failed: %o",Z)}finally{i=!1,O()}}}async function p(){let U=t.getState(),b=U.workspace?.current?.path||U.workspace?.available?.[0]?.path||"";if(!(!b||c)){o("git-pulling workspace %s",b),c=!0,O();try{await n(b)}catch(B){o("workspace git pull failed: %o",B)}finally{c=!1,O()}}}function _(U){let b=U.target;b&&e.contains(b)||L()}function h(U){U.key==="Escape"&&L()}function $(){u||(u=!0,document.addEventListener("mousedown",_),document.addEventListener("keydown",h),O())}function L(){u&&(u=!1,document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),O())}function j(){u?L():$()}async function V(U){let b=U.target,B=b.value,ee=b.checked;o("toggling visibility %s \u2192 %s",B,String(ee));try{await s(B,ee)}catch(Ae){o("workspace visibility toggle failed: %o",Ae)}}function H(U){return U?l`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${p}
        ?disabled=${i||c}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `:l``}function P(U,b){return l`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${j}
          aria-haspopup="true"
          aria-expanded=${u?"true":"false"}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${u?l`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${U.map(B=>l`
                    <label
                      class="workspace-picker__manage-row"
                      title="${B.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${B.path}"
                        .checked=${!b.has(B.path)}
                        @change=${V}
                      />
                      <span class="workspace-picker__manage-name"
                        >${gi(B.path)}</span
                      >
                    </label>
                  `)}
              </div>
            `:""}
      </div>
    `}function D(){let U=t.getState(),b=U.workspace?.current,B=U.workspace?.available||[],ee=new Set(U.workspace?.hidden||[]),Ae=b?.path||B[0]?.path||"";if(B.length===0)return l``;let Z=B.filter(le=>!ee.has(le.path)||le.path===Ae);if(Z.length<=1){let le=Z[0]||B[0],ge=gi(le.path);return l`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${le.path}"
            >${ge}</span
          >
          ${P(B,ee)}
          ${H(Ae)}
          ${c?l`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return l`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${d}
          ?disabled=${i||c}
          aria-label="Select project workspace"
        >
          ${Z.map(le=>l`
              <option
                value="${le.path}"
                ?selected=${le.path===Ae}
                title="${le.path}"
              >
                ${gi(le.path)}
              </option>
            `)}
        </select>
        ${P(B,ee)}
        ${H(Ae)}
        ${i||c?l`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function O(){Ye(D(),e)}return O(),a=t.subscribe(()=>O()),{destroy(){a&&(a(),a=null),document.removeEventListener("mousedown",_),document.removeEventListener("keydown",h),Ye(l``,e)}}}var Zd=["update-status","edit-text","update-priority","create-issue","dep-add","dep-remove","update-assignee","update-exec-settings","update-impl-target","get-session-defaults","set-session-defaults","update-workflow-meta","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","set-workspace-visibility","get-workspace","workspace-changed","git-pull-workspace","subscribe-worker-queue","unsubscribe-worker-queue","worker-queue-snapshot","worker-queue-place","worker-queue-reorder","worker-queue-toggle","worker-automation-toggle","worker-auto-repair-toggle","worker-repo-ops-opt-out-toggle","worker-repo-operation-repair","worker-repo-operation-dismiss","worker-queue-set-slots","worker-queue-set-serial-lane-count","subscribe-worker-parallel-analysis","unsubscribe-worker-parallel-analysis","worker-parallel-analysis-snapshot","worker-parallel-analysis-targets","worker-parallel-analysis-prompt","worker-parallel-analysis-start","worker-parallel-analysis-cancel","worker-parallel-analysis-settings-update","worker-parallel-analysis-submit","worker-queue-set-orchestration-defaults","worker-queue-remove","worker-attempt-pause","worker-attempt-stop","worker-attempt-resume","worker-attempt-dismiss","worker-cleanup-retry","worker-merge-queue-add","worker-merge-queue-add-all","worker-merge-auto-toggle","worker-merge-queue-remove","worker-discard","worker-stale-work-continue","worker-stale-work-backup-fresh","worker-stale-work-recheck","worker-pr-discard","worker-revise-fix","worker-revise-approve","subscribe-ui-order","unsubscribe-ui-order","ui-order-set","ui-order-snapshot","subscribe-display-policy","unsubscribe-display-policy","display-policy-set","display-policy-snapshot","subscribe-session-log","unsubscribe-session-log","session-log-snapshot","session-log-append","get-attempt-prompt","get-bead-prompt","get-worker-system-prompt","subscribe-monitor-pipeline","unsubscribe-monitor-pipeline","monitor-pipeline-snapshot","subscribe-impl-presets","unsubscribe-impl-presets","impl-presets-snapshot","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","monitor-auto-toggle"];function hi(){let e=Date.now().toString(36),t=Math.random().toString(36).slice(2,8);return`${e}-${t}`}function Qd(e,t,r=hi()){return{id:r,type:e,payload:t}}function Xd(e={}){let t=Tt("ws"),r={initialMs:e.backoff?.initialMs??1e3,maxMs:e.backoff?.maxMs??3e4,factor:e.backoff?.factor??2,jitterRatio:e.backoff?.jitterRatio??.2},n=()=>e.url&&e.url.length>0?e.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",s=null,o="closed",a=0,i=null,c=!0,u=new Map,d=[],p=new Map,_=new Set;function h(D){for(let O of Array.from(_))try{O(D)}catch{}}function $(){if(!c||i)return;o="reconnecting",t("ws reconnecting\u2026"),h(o);let D=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,a)),O=(r.jitterRatio||0)*D,U=Math.max(0,Math.round(D+(Math.random()*2-1)*O));t("ws retry in %d ms (attempt %d)",U,a+1),i=setTimeout(()=>{i=null,P()},U)}function L(D){try{s?.send(JSON.stringify(D))}catch(O){t("ws send failed",O)}}function j(){for(o="open",t("ws open"),h(o),a=0;d.length;){let D=d.shift();D&&L(D)}}function V(D){let O;try{O=JSON.parse(String(D.data))}catch{t("ws received non-JSON message");return}if(!O||typeof O.id!="string"||typeof O.type!="string"){t("ws received invalid envelope");return}if(u.has(O.id)){let b=u.get(O.id);u.delete(O.id),O.ok?b?.resolve(O.payload):b?.reject(O.error||new Error("ws error"));return}let U=p.get(O.type);if(U&&U.size>0)for(let b of Array.from(U))try{b(O.payload)}catch(B){t("ws event handler error",B)}else t("ws received unhandled message type: %s",O.type)}function H(){o="closed",t("ws closed"),h(o);for(let[D,O]of u.entries())O.reject(new Error("ws disconnected")),u.delete(D);a+=1,$()}function P(){if(!c)return;let D=n();try{s=new WebSocket(D),t("ws connecting %s",D),o="connecting",h(o),s.addEventListener("open",j),s.addEventListener("message",V),s.addEventListener("error",()=>{}),s.addEventListener("close",H)}catch(O){t("ws connect failed %o",O),$()}}return P(),{send(D,O){if(!Zd.includes(D))return Promise.reject(new Error(`unknown message type: ${D}`));let U=hi(),b=Qd(D,O,U);return t("send %s id=%s",D,U),new Promise((B,ee)=>{u.set(U,{resolve:B,reject:ee,type:D}),s&&s.readyState===s.OPEN?L(b):(t("queue %s id=%s (state=%s)",D,U,o),d.push(b))})},on(D,O){p.has(D)||p.set(D,new Set);let U=p.get(D);return U?.add(O),()=>{U?.delete(O)}},onConnection(D){return _.add(D),()=>{_.delete(D)}},reconnect(){c=!0,i&&(clearTimeout(i),i=null),a=0,P()},close(){c=!1,i&&(clearTimeout(i),i=null);try{s?.close()}catch{}},getState(){return o}}}function lb(){let e=window.__BDUI_BOOTSTRAP__;return{workspace_config:{default_workspace:typeof e?.workspace_config?.default_workspace=="string"&&e.workspace_config.default_workspace.length>0?e.workspace_config.default_workspace:null}}}async function cb(e,t){try{let n=await(await fetch("/api/config")).json();e.setState({config:n})}catch(r){t("config refresh failed",r)}}var bi=[["tab:board:ready","ready-issues"],["tab:board:blocked","blocked-issues"],["tab:board:in-progress","in-progress-issues"],["tab:board:resolved","resolved-issues"],["tab:board:deferred","deferred-issues"],["tab:board:closed","closed-issues"]],Jd=[["tab:worker:ready","ready-issues"],["tab:worker:blocked","blocked-issues"],["tab:worker:in-progress","in-progress-issues"],["tab:worker:resolved","resolved-issues"],["tab:worker:closed","closed-issues"]],Ur="tab:worker:closed",ub="bdui.worker.done-range",ep=nd,tp="worker:queue",rp="worker:parallel-analysis",np="ui:order",sp="ui:display-policy",op="exec:presets",Wr="tab:board:closed",ap="beads-ui.board.closed-range";function db(e){let t=Tt("main");t("bootstrap start");let r=l`
    <section id="board-root" class="route board"></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="monitor-root" class="route monitor" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;Ye(r,e);let n=document.getElementById("global-nav"),s=document.getElementById("top-nav"),o=document.getElementById("repo-scope"),a=document.getElementById("usage-meter"),i=document.getElementById("board-root"),c=document.getElementById("worker-root"),u=document.getElementById("monitor-root"),d=document.getElementById("detail-panel");if(a&&$d(a),i&&c&&u&&d){let ne=function(m,v){let de="Request failed",ue="";if(m&&typeof m=="object"){let $e=m;if(typeof $e.message=="string"&&$e.message.length>0&&(de=$e.message),typeof $e.details=="string")ue=$e.details;else if($e.details&&typeof $e.details=="object")try{ue=JSON.stringify($e.details,null,2)}catch{ue=""}}else typeof m=="string"&&m.length>0&&(de=m);let Be=v&&v.length>0?`Failed to load ${v}`:"Request failed";N.open(Be,de,ue)},R=function(m){return`${be.getState().workspace.current?.path||""}\0${m}`},J=function(){Je&&(Je().catch(()=>{}),Je=null),ot=null,K=null},te=function(m){Q=m;let v=()=>{Q!==m||be.getState().selected_id!==m||(Q=null,ie(m))};if(!Ge){Qe.then(v);return}v()},Xe=function(m,v,de,ue,Be){return de!==it[v]?(Be().catch(()=>{}),!1):(m.set(ue,Be),!0)},ht=function(){let m=be.getState();et(m.view==="board"),F(m.view==="worker"),xe(m.view==="monitor"),C(m.view==="board"||m.view==="worker"||mt||!!m.selected_id)},wt=function(){let m=Zr(bt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},He=function(){let m=Zr(pt);return m===void 0?{type:"closed-issues"}:{type:"closed-issues",params:{since:m}}},et=function(m){if(m)for(let[v,de]of bi){if(qe.has(v)||at.has(v))continue;let ue=v===Wr?wt():{type:de};try{Ne.register(v,ue)}catch(S){t("register %s store failed: %o",v,S)}at.add(v);let Be=it.board,$e=!1;Ce.subscribeList(v,ue).then(S=>{$e=!Xe(qe,"board",Be,v,S)}).catch(S=>{t("subscribe %s failed: %o",v,S),ne(S,"board")}).finally(()=>{at.delete(v),$e&&ht()})}else xt()},xt=function(){it.board+=1;for(let[m]of bi){let v=qe.get(m);v&&(v().catch(()=>{}),qe.delete(m));try{Ne.unregister(m)}catch(de){t("unregister %s failed: %o",m,de)}}},F=function(m){if(!m){y();return}for(let[v,de]of Jd){if(X.has(v)||at.has(v))continue;let ue=v===Ur?He():{type:de};try{Ne.register(v,ue)}catch(S){t("register %s store failed: %o",v,S)}at.add(v);let Be=it.worker,$e=!1;Ce.subscribeList(v,ue).then(S=>{$e=!Xe(X,"worker",Be,v,S)}).catch(S=>{t("subscribe %s failed: %o",v,S),ne(S,"worker")}).finally(()=>{at.delete(v),$e&&ht()})}},y=function(){it.worker+=1;for(let[m]of Jd){let v=X.get(m);v&&(v().catch(()=>{}),X.delete(m));try{Ne.unregister(m)}catch(de){t("unregister %s failed: %o",m,de)}}},C=function(m){if(!m){M();return}E||(ke("subscribe-worker-queue",{id:tp}).catch(v=>{t("subscribe-worker-queue failed: %o",v)}),ke("subscribe-worker-parallel-analysis",{id:rp}).catch(v=>{t("subscribe-worker-parallel-analysis failed: %o",v)}),E=()=>(ke("unsubscribe-worker-parallel-analysis",{id:rp}),ke("unsubscribe-worker-queue",{id:tp})))},M=function(){E&&(E().catch(()=>{}),E=null),fe.clear()},xe=function(m){if(!m){he();return}Y||(ke("subscribe-monitor-pipeline",{id:ep}).catch(v=>{t("subscribe-monitor-pipeline failed: %o",v)}),Y=()=>ke("unsubscribe-monitor-pipeline",{id:ep}))},he=function(){Y&&(Y().catch(()=>{}),Y=null)},Fe=function(){Ee||(ke("subscribe-ui-order",{id:np}).catch(m=>{t("subscribe-ui-order failed: %o",m)}),Ee=()=>ke("unsubscribe-ui-order",{id:np}))},_t=function(){Ee&&(Ee().catch(()=>{}),Ee=null),ve.clear()},Ze=function(){yt||(ke("subscribe-display-policy",{id:sp}).catch(m=>{t("subscribe-display-policy failed: %o",m)}),yt=()=>ke("unsubscribe-display-policy",{id:sp}))},Ft=function(){yt&&(yt().catch(()=>{}),yt=null),ze.clear()},je=function(){zt||(ke("subscribe-impl-presets",{id:op}).catch(m=>{t("subscribe-impl-presets failed: %o",m)}),zt=()=>ke("unsubscribe-impl-presets",{id:op}))},I=function(m){if(!m)return"Unknown";let v=m.split("/").filter(Boolean);return v.length>0?v[v.length-1]:"Unknown"};var p=ne,_=R,h=J,$=te,L=Xe,j=ht,V=wt,H=He,P=et,D=xt,O=F,U=y,b=C,B=M,ee=xe,Ae=he,Z=Fe,le=_t,ge=Ze,Te=Ft,Le=je,se=I;let ae=document.getElementById("header-loading"),Me=Rl(ae),N=gu(e),oe=Xd(),ke=Me.wrapSend((m,v)=>oe.send(m,v)),Ce=kl(ke),Ne=$l(),x=Sl(),fe=Al(),De=il(),ve=xl(),ze=ol(),We=al(),Ve=ll();oe.on("impl-presets-snapshot",m=>{let v=m;v&&typeof v.revision=="number"&&Array.isArray(v.presets)&&We.set({revision:v.revision,presets:v.presets})}),oe.on("monitor-pipeline-snapshot",m=>{let v=m;if(!(!v||!Array.isArray(v.workspaces)))try{De.set(v.workspaces,v.workspaces_state)}catch{}}),oe.on("ui-order-snapshot",m=>{let v=m;if(v&&typeof v.revision=="number")try{ve.set({revision:v.revision,order:v.order&&typeof v.order=="object"?v.order:{}})}catch{}}),oe.on("display-policy-snapshot",m=>{let v=m;if(v&&v.policy&&typeof v.policy=="object")try{ze.set(v.policy)}catch{}}),oe.on("session-log-snapshot",m=>{let v=m;if(v&&typeof v.id=="string")try{Ve.set(v.id,Array.isArray(v.lines)?v.lines:[],typeof v.last_event_at=="number"?v.last_event_at:null)}catch{}}),oe.on("session-log-append",m=>{let v=m;if(v&&typeof v.id=="string")try{Ve.append(v.id,v.event)}catch{}}),oe.on("snapshot",m=>{let v=m,de=v&&typeof v.id=="string"?v.id:"",ue=de?Ne.getStore(de):null;if(ue&&v&&v.type==="snapshot")try{ue.applyPush(v)}catch{}}),oe.on("upsert",m=>{let v=m,de=v&&typeof v.id=="string"?v.id:"",ue=de?Ne.getStore(de):null;if(ue&&v&&v.type==="upsert")try{ue.applyPush(v)}catch{}}),oe.on("delete",m=>{let v=m,de=v&&typeof v.id=="string"?v.id:"",ue=de?Ne.getStore(de):null;if(ue&&v&&v.type==="delete")try{ue.applyPush(v)}catch{}});let Je=null,ot=null,K=null,Q=null,Se=()=>{},Qe=new Promise(m=>{Se=()=>m(void 0)}),Ge=!1,pe=!1;async function ie(m){let v=R(m);if(v===ot||v===K)return;K=v;let de=`detail:${m}`,ue={type:"issue-detail",params:{id:m}};try{Ne.register(de,ue)}catch(Be){t("register detail store failed: %o",Be)}try{let Be=await Ce.subscribeList(de,ue);if(be.getState().selected_id!==m||R(m)!==v){await Be().catch(()=>{});return}Je&&await Je().catch(()=>{}),Je=Be,ot=v}catch(Be){t("detail subscribe failed: %o",Be),ne(Be,"issue details")}finally{K===v&&(K=null)}}let qe=new Map,at=new Set,it={board:0,worker:0},mt=!1,bt=er;try{let m=window.localStorage.getItem(ap);ar(m)&&(bt=m)}catch{}let pt=er;try{let m=window.localStorage.getItem(ub);ar(m)&&(pt=m)}catch{}async function Pe(m){if(!ar(m)||m===bt)return;bt=m;try{window.localStorage.setItem(ap,m)}catch{}let v=qe.get(Wr);if(!v)return;qe.delete(Wr),await v().catch(()=>{});let de=wt();try{Ne.register(Wr,de)}catch(ue){t("register %s store failed: %o",Wr,ue)}try{let ue=await Ce.subscribeList(Wr,de);qe.set(Wr,ue)}catch(ue){t("re-subscribe %s failed: %o",Wr,ue),ne(ue,"board")}}async function ct(m){if(!ar(m)||m===pt)return;pt=m;let v=X.get(Ur);if(!v)return;X.delete(Ur),await v().catch(()=>{});let de=He();try{Ne.register(Ur,de)}catch(ue){t("register %s store failed: %o",Ur,ue)}try{let ue=await Ce.subscribeList(Ur,de);X.set(Ur,ue)}catch(ue){t("re-subscribe %s failed: %o",Ur,ue),ne(ue,"worker")}}let X=new Map,E=null,Y=null,Ee=null,yt=null,zt=null;async function Lt(){yt=null,ze.clear(),zt=null,We.clear(),E=null,Y=null,qe.clear(),X.clear(),it.board+=1,it.worker+=1,je();let m=be.getState().workspace.current?.path;if(m)try{await oe.send("set-workspace",{path:m})}catch(de){t("workspace restore after reconnect failed: %o",de);return}Ze();let v=be.getState();et(v.view==="board"),F(v.view==="worker"),xe(v.view==="monitor"),C(v.view==="board"||v.view==="worker"||!!v.selected_id)}async function Ut(){t("clearing all subscriptions for workspace switch"),xt(),y(),M(),x.clear(),_t(),Fe(),Ft(),Ze(),J();let m=be.getState();if(m.selected_id)try{Ne.unregister(`detail:${m.selected_id}`)}catch{}let v=be.getState();et(v.view==="board"),F(v.view==="worker"),xe(v.view==="monitor"),C(v.view==="board"||v.view==="worker"||!!v.selected_id),v.selected_id&&te(v.selected_id)}async function Mt(m){t("requesting workspace switch to %s",m),pe=!0;try{let v=await oe.send("set-workspace",{path:m});t("workspace switch result: %o",v),v&&v.workspace&&(be.setState({workspace:{current:{path:v.workspace.root_dir,database:v.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),v.changed&&(await Ut(),me("Switched to "+I(m),"success",2e3)))}catch(v){throw t("workspace switch failed: %o",v),me("Failed to switch workspace","error",3e3),v}finally{pe=!1}}async function k(m){t("requesting workspace git pull for %s",m);try{let v=await oe.send("git-pull-workspace",{});t("workspace git pull result: %o",v);let de=v?.status;if(de==="up_to_date"){me("Already up to date","success",2e3);return}if(de==="stash_pop_conflict"){me("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}me("Git pulled "+I(m),"success",2e3)}catch(v){t("workspace git pull failed: %o",v);let de=v?.code,ue=v?.message;if(de==="rebase_conflict"){me("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(de==="rebase_conflict_abort_failed"){me("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(de==="busy"){me("Git pull skipped: another operation is running","warning",3e3);return}let Be=ue?`: ${ue}`:"";throw me(`Git pull failed${Be}`,"error",3e3),v}}async function w(m,v){t("setting workspace visibility %s \u2192 %s",m,String(v));try{await oe.send("set-workspace-visibility",{path:m,visible:v}),await W()}catch(de){t("workspace visibility update failed: %o",de),me("Failed to update project visibility","error",3e3)}}async function W(){try{let m=await oe.send("list-workspaces",{});if(t("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let v=m.workspaces.map($e=>({path:$e.path,database:$e.database,pid:$e.pid,version:$e.version})),de=m.current?{path:m.current.root_dir,database:m.current.db_path}:null,ue=Array.isArray(m.hidden)?m.hidden.filter($e=>typeof $e=="string"):[];be.setState({workspace:{current:de,available:v,hidden:ue}});let Be=window.localStorage.getItem("beads-ui.workspace");Be&&(!v.some(S=>S.path===Be)||ue.includes(Be)?window.localStorage.removeItem("beads-ui.workspace"):de&&Be!==de.path&&(t("restoring saved workspace preference: %s",Be),await Mt(Be)))}}catch(m){t("failed to load workspaces: %o",m)}}oe.on("workspace-changed",m=>{t("workspace-changed event: %o",m),m&&m.root_dir&&(be.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),W(),Ut())});let ye=!1;if(typeof oe.onConnection=="function"){let m=v=>{t("ws state %s",v),v==="reconnecting"||v==="closed"?(ye=!0,me("Connection lost. Reconnecting\u2026","error",4e3)):v==="open"&&ye&&(ye=!1,me("Reconnected","success",2200),cb(be,(de,ue)=>{t(`${de}: %o`,ue)}),Lt())};oe.onConnection(m)}let we="board";try{let m=window.localStorage.getItem("beads-ui.view");(m==="board"||m==="worker"||m==="monitor")&&(we=m)}catch(m){t("view parse error: %o",m)}let be=Cl({config:lb(),view:we});oe.on("worker-queue-snapshot",m=>{let v=m;if(!v||!v.queue)return;let de=be.getState().workspace.current?.path;if(typeof de=="string"&&de.length>0&&v.root_dir!==de){t("dropping worker-queue snapshot for %s",String(v.root_dir));return}try{x.set(v.queue)}catch{}}),oe.on("worker-parallel-analysis-snapshot",m=>{let v=m;if(!v)return;let de=be.getState().workspace.current?.path;if(!(typeof de=="string"&&de.length>0&&typeof v.root_dir=="string"&&v.root_dir!==de))try{fe.set({settings:v.settings,job:v.job??null,runs:Array.isArray(v.runs)?v.runs:[],last_good:v.last_good??null})}catch{}});let tt=El(be);tt.start();let Ie=new Set(["get-comments","dep-add","dep-remove","impl-preset-create","impl-preset-update","impl-preset-delete","apply-impl-preset","apply-impl-preset-global","get-session-defaults","set-session-defaults"]),T=async(m,v)=>{try{return await ke(m,v)}catch(de){if(Ie.has(m))throw de;return[]}};od({global_element:n,repo_element:s},be,tt);let ce=document.getElementById("workspace-picker");ce&&Yd(ce,be,Mt,k,w);let Re=cd(e,(m,v)=>ke(m,v));try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>Re.open())}catch{}let ft=fd(e,{policyStore:ze,queueStore:x,implPresetStore:We,transport:(m,v)=>ke(m,v),onOpenChange:m=>{let v=mt;mt=m,ht(),v&&m===!1&&kt.refreshSessionDefaults()},labelOptions:()=>{let m=new Set;for(let[v]of bi)for(let de of Ne.snapshotFor(v)||[]){let ue=de.labels;if(Array.isArray(ue))for(let Be of ue)typeof Be=="string"&&Be.length>0&&m.add(Be)}return Array.from(m).sort()}});try{let m=document.getElementById("display-settings-btn");m&&(m.setAttribute("aria-label","\uC124\uC815"),m.setAttribute("title","\uC124\uC815"),m.addEventListener("click",()=>ft.open()))}catch{}let Pt=Ul(i,{gotoIssue:m=>tt.gotoIssue(m),issueStores:Ne,transport:T,workerQueueStore:x,uiOrderStore:ve,displayPolicyStore:ze,closedRange:bt,onClosedRangeChange:m=>{Pe(m)},onNewIssue:()=>Re.open()}),kt=mi(c,{transport:T,issueStores:Ne,queueStore:x,analysisStore:fe,sessionLogStore:Ve,uiOrderStore:ve,gotoIssue:m=>be.setState({selected_id:m}),getWorkspacePath:()=>be.getState().workspace.current?.path,doneRange:pt,onDoneRangeChange:m=>{ct(m)}}),Dt=sd(u,{transport:T,pipelineStore:De,execPresetStore:We,sessionLogStore:Ve,router:tt,gotoIssue:m=>tt.gotoIssue(m),getWorkspacePath:()=>be.getState().workspace.current?.path,switchWorkspace:m=>Mt(m)}),f=mu(d,{issueStores:Ne,transport:T,queueStore:x,execPresetStore:We,sessionLogStore:Ve,getWorkspacePath:()=>be.getState().workspace.current?.path,onNavigate:m=>{be.getState().view==="worker"?be.setState({selected_id:m}):tt.gotoIssue(m)},onClose:()=>{let m=be.getState();be.setState({selected_id:null});try{tt.gotoView(m.view==="worker"||m.view==="monitor"?m.view:"board")}catch{}},onOpenExecPresets:()=>{ft.open("execution")}}),A=be.getState().selected_id;A&&(d.hidden=!1,f.load(A),te(A)),be.subscribe(m=>{let v=m.selected_id;v?(d.hidden=!1,f.load(v),pe||te(v)):(f.clear(),d.hidden=!0,J())});let G=m=>{i.hidden=m.view!=="board",c.hidden=m.view!=="worker",u.hidden=m.view!=="monitor",o&&o.classList.toggle("is-quiet",m.view==="monitor"),et(m.view==="board"),F(m.view==="worker"),xe(m.view==="monitor"),C(m.view==="board"||m.view==="worker"||mt||!!m.selected_id),!m.selected_id&&m.view==="board"&&Pt.load(),m.view==="worker"&&kt.load(),m.view==="monitor"?Dt.load():Dt.pause(),window.localStorage.setItem("beads-ui.view",m.view)};be.subscribe(G),G(be.getState()),Fe(),Ze(),je(),W().finally(()=>{Ge=!0,Se()}),window.addEventListener("keydown",m=>{let v=m.ctrlKey||m.metaKey,de=String(m.key||"").toLowerCase(),ue=m.target,Be=ue&&ue.tagName?String(ue.tagName).toLowerCase():"",$e=Be==="input"||Be==="textarea"||Be==="select"||ue&&typeof ue.isContentEditable=="boolean"&&ue.isContentEditable;v&&de==="n"&&($e||(m.preventDefault(),Re.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),n=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,s=r==="dark"||r==="light"?r:n?"dark":"light";document.documentElement.setAttribute("data-theme",s);let o=document.getElementById("theme-switch");o&&(o.checked=s==="dark")}catch{}let e=document.getElementById("theme-switch");e&&e.addEventListener("change",()=>{let r=e.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let t=document.getElementById("app");t&&db(t)});export{db as bootstrap,lb as readBootstrapConfig,cb as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
