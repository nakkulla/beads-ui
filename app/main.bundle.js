var To=Object.create;var Vr=Object.defineProperty;var Eo=Object.getOwnPropertyDescriptor;var Co=Object.getOwnPropertyNames;var Ro=Object.getPrototypeOf,Io=Object.prototype.hasOwnProperty;var Lo=(t,e,r)=>e in t?Vr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Jr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Do=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Co(e))!Io.call(t,n)&&n!==r&&Vr(t,n,{get:()=>e[n],enumerable:!(s=Eo(e,n))||s.enumerable});return t};var No=(t,e,r)=>(r=t!=null?To(Ro(t)):{},Do(e||!t||!t.__esModule?Vr(r,"default",{value:t,enumerable:!0}):r,t));var fe=(t,e,r)=>Lo(t,typeof e!="symbol"?e+"":e,r);var Ys=Jr((Wa,Ks)=>{var jt=1e3,Wt=jt*60,Gt=Wt*60,Ot=Gt*24,Bo=Ot*7,Uo=Ot*365.25;Ks.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return zo(t);if(r==="number"&&isFinite(t))return e.long?qo(t):Ho(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*Bo;case"days":case"day":case"d":return r*Ot;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Gt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Wt;case"seconds":case"second":case"secs":case"sec":case"s":return r*jt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ho(t){var e=Math.abs(t);return e>=Ot?Math.round(t/Ot)+"d":e>=Gt?Math.round(t/Gt)+"h":e>=Wt?Math.round(t/Wt)+"m":e>=jt?Math.round(t/jt)+"s":t+"ms"}function qo(t){var e=Math.abs(t);return e>=Ot?wr(t,e,Ot,"day"):e>=Gt?wr(t,e,Gt,"hour"):e>=Wt?wr(t,e,Wt,"minute"):e>=jt?wr(t,e,jt,"second"):t+" ms"}function wr(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var Xs=Jr((Ga,Zs)=>{function jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=c,r.humanize=Ys(),r.destroy=d,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let b=0;b<p.length;b++)h=(h<<5)-h+p.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,b=null,m,k;function g(...v){if(!g.enabled)return;let C=g,M=Number(new Date),x=M-(h||M);C.diff=x,C.prev=h,C.curr=M,h=M,v[0]=r.coerce(v[0]),typeof v[0]!="string"&&v.unshift("%O");let S=0;v[0]=v[0].replace(/%([a-zA-Z%])/g,(B,K)=>{if(B==="%%")return"%";S++;let O=r.formatters[K];if(typeof O=="function"){let F=v[S];B=O.call(C,F),v.splice(S,1),S--}return B}),r.formatArgs.call(C,v),(C.log||r.log).apply(C,v)}return g.namespace=p,g.useColors=r.useColors(),g.color=r.selectColor(p),g.extend=s,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(m!==r.namespaces&&(m=r.namespaces,k=r.enabled(p)),k),set:v=>{b=v}}),typeof r.init=="function"&&r.init(g),g}function s(p,h){let b=r(this.namespace+(typeof h>"u"?":":h)+p);return b.log=this.log,b}function n(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(p,h){let b=0,m=0,k=-1,g=0;for(;b<p.length;)if(m<h.length&&(h[m]===p[b]||h[m]==="*"))h[m]==="*"?(k=m,g=b,m++):(b++,m++);else if(k!==-1)m=k+1,g++,b=g;else return!1;for(;m<h.length&&h[m]==="*";)m++;return m===h.length}function o(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function c(p){for(let h of r.skips)if(i(p,h))return!1;for(let h of r.names)if(i(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Zs.exports=jo});var Qs=Jr((We,kr)=>{We.formatArgs=Go;We.save=Vo;We.load=Jo;We.useColors=Wo;We.storage=Ko();We.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();We.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Wo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Go(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+kr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}We.log=console.debug||console.log||(()=>{});function Vo(t){try{t?We.storage.setItem("debug",t):We.storage.removeItem("debug")}catch{}}function Jo(){let t;try{t=We.storage.getItem("debug")||We.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}kr.exports=Xs()(We);var{formatters:Yo}=kr.exports;Yo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Zt=globalThis,mr=Zt.trustedTypes,Fs=mr?mr.createPolicy("lit-html",{createHTML:t=>t}):void 0,js="$lit$",kt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+kt,Po=`<${Ws}>`,Nt=document,Xt=()=>Nt.createComment(""),Qt=t=>t===null||typeof t!="object"&&typeof t!="function",ts=Array.isArray,Oo=t=>ts(t)||typeof t?.[Symbol.iterator]=="function",Kr=`[ 	
\f\r]`,Yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Us=/>/g,Lt=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zs=/'/g,Hs=/"/g,Gs=/^(?:script|style|textarea|title)$/i,rs=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=rs(1),Ba=rs(2),Ua=rs(3),Pt=Symbol.for("lit-noChange"),Se=Symbol.for("lit-nothing"),qs=new WeakMap,Dt=Nt.createTreeWalker(Nt,129);function Vs(t,e){if(!ts(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fs!==void 0?Fs.createHTML(e):e}var Mo=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=Yt;for(let c=0;c<r;c++){let a=t[c],d,p,h=-1,b=0;for(;b<a.length&&(o.lastIndex=b,p=o.exec(a),p!==null);)b=o.lastIndex,o===Yt?p[1]==="!--"?o=Bs:p[1]!==void 0?o=Us:p[2]!==void 0?(Gs.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=Lt):p[3]!==void 0&&(o=Lt):o===Lt?p[0]===">"?(o=n??Yt,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?Lt:p[3]==='"'?Hs:zs):o===Hs||o===zs?o=Lt:o===Bs||o===Us?o=Yt:(o=Lt,n=void 0);let m=o===Lt&&t[c+1].startsWith("/>")?" ":"";i+=o===Yt?a+Po:h>=0?(s.push(d),a.slice(0,h)+js+a.slice(h)+kt+m):a+kt+(h===-2?c:m)}return[Vs(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},er=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,c=e.length-1,a=this.parts,[d,p]=Mo(e,r);if(this.el=t.createElement(d,s),Dt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=Dt.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(js)){let b=p[o++],m=n.getAttribute(h).split(kt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:k[2],strings:m,ctor:k[1]==="."?Zr:k[1]==="?"?Xr:k[1]==="@"?Qr:Ht}),n.removeAttribute(h)}else h.startsWith(kt)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Gs.test(n.tagName)){let h=n.textContent.split(kt),b=h.length-1;if(b>0){n.textContent=mr?mr.emptyScript:"";for(let m=0;m<b;m++)n.append(h[m],Xt()),Dt.nextNode(),a.push({type:2,index:++i});n.append(h[b],Xt())}}}else if(n.nodeType===8)if(n.data===Ws)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(kt,h+1))!==-1;)a.push({type:7,index:i}),h+=kt.length-1}i++}}static createElement(e,r){let s=Nt.createElement("template");return s.innerHTML=e,s}};function zt(t,e,r=t,s){if(e===Pt)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=Qt(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=zt(t,n._$AS(t,e.values),n,s)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??Nt).importNode(r,!0);Dt.currentNode=n;let i=Dt.nextNode(),o=0,c=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new tr(i,i.nextSibling,this,e):a.type===1?d=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(d=new es(i,this,e)),this._$AV.push(d),a=s[++c]}o!==a?.index&&(i=Dt.nextNode(),o++)}return Dt.currentNode=Nt,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},tr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=Se,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=zt(this,e,r),Qt(e)?e===Se||e==null||e===""?(this._$AH!==Se&&this._$AR(),this._$AH=Se):e!==this._$AH&&e!==Pt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Se&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Nt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=er.createElement(Vs(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Yr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=qs.get(e.strings);return r===void 0&&qs.set(e.strings,r=new er(e)),r}k(e){ts(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Xt()),this.O(Xt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ht=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=Se,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Se}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=zt(this,e,r,0),o=!Qt(e)||e!==this._$AH&&e!==Pt,o&&(this._$AH=e);else{let c=e,a,d;for(e=i[0],a=0;a<i.length-1;a++)d=zt(this,c[s+a],r,a),d===Pt&&(d=this._$AH[a]),o||(o=!Qt(d)||d!==this._$AH[a]),d===Se?e=Se:e!==Se&&(e+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!n&&this.j(e)}j(e){e===Se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Zr=class extends Ht{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Se?void 0:e}},Xr=class extends Ht{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Se)}},Qr=class extends Ht{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=zt(this,e,r,0)??Se)===Pt)return;let s=this._$AH,n=e===Se&&s!==Se||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==Se&&(s===Se||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},es=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){zt(this,e)}};var Fo=Zt.litHtmlPolyfillSupport;Fo?.(er,tr),(Zt.litHtmlVersions??(Zt.litHtmlVersions=[])).push("3.3.1");var _e=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new tr(e.insertBefore(Xt(),i),i,void 0,r??{})}return n._$AI(t),n};function Js(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function tt(t,e){let r=Js(t.created_at),s=Js(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,c=e.id;return o<c?-1:o>c?1:0}function qt(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function vt(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(tt)}function r(i,o){let c=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?c.sort(tt):o==="closed"?c.sort(qt):c.sort(tt),c}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let c=(t.snapshotFor(`detail:${i}`)||[]).find(d=>String(d?.id||"")===String(i));return(Array.isArray(c?.dependents)?c.dependents:[]).slice().sort(tt)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var en=No(Qs(),1);function he(t){return(0,en.default)(`beads-ui:${t}`)}function tn(t){let e=he("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function ss(t,e={}){let r=he(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,c=!1,a=e.sort||tt;function d(){for(let b of Array.from(o))try{b()}catch{}}function p(){n=Array.from(s.values()).sort(a)}function h(b){if(c||!b||b.id!==t)return;let m=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,m),!(m<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(m<=i)return;s.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let g of k)g&&typeof g.id=="string"&&g.id.length>0&&s.set(g.id,g);p(),i=m,d();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let g=s.get(k.id);if(!g)s.set(k.id,k);else{let v=Number.isFinite(g.updated_at)?g.updated_at:0,C=Number.isFinite(k.updated_at)?k.updated_at:0;if(v<=C){for(let M of Object.keys(g))M in k||delete g[M];for(let[M,x]of Object.entries(k))g[M]=x}}p()}i=m,d()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(s.delete(k),p()),i=m,d()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(b){return s.get(b)},dispose(){c=!0,s.clear(),n=[],o.clear(),i=0}}}function vr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function rn(t){let e=he("subs"),r=new Map,s=new Map;function n(c,a){e("applyDelta %s +%d ~%d -%d",c,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=s.get(c);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(d)){let k=r.get(m);if(!k)continue;let g=k.itemsById;for(let v of p)typeof v=="string"&&v.length>0&&g.set(v,!0);for(let v of h)typeof v=="string"&&v.length>0&&g.set(v,!0);for(let v of b)typeof v=="string"&&v.length>0&&g.delete(v)}}async function i(c,a){let d=vr(a);if(e("subscribe %s key=%s",c,d),!r.has(c))r.set(c,{key:d,itemsById:new Map});else{let h=r.get(c);if(h&&h.key!==d){let b=s.get(h.key);b&&(b.delete(c),b.size===0&&s.delete(h.key)),r.set(c,{key:d,itemsById:new Map})}}s.has(d)||s.set(d,new Set);let p=s.get(d);p&&p.add(c);try{await t("subscribe-list",{id:c,type:a.type,params:a.params})}catch(h){let b=r.get(c)||null;if(b){let m=s.get(b.key);m&&(m.delete(c),m.size===0&&s.delete(b.key))}throw r.delete(c),h}return async()=>{e("unsubscribe %s key=%s",c,d);try{await t("unsubscribe-list",{id:c})}catch{}let h=r.get(c)||null;if(h){let b=s.get(h.key);b&&(b.delete(c),b.size===0&&s.delete(h.key))}r.delete(c)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:vr,selectors:{getIds(c){let a=r.get(c);return a?Array.from(a.itemsById.keys()):[]},has(c,a){let d=r.get(c);return d?d.itemsById.has(a):!1},count(c){let a=r.get(c);return a?a.itemsById.size:0},getItemsById(c){let a=r.get(c),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function sn(){let t=he("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,d,p){let h=d?vr(d):"",b=r.get(a)||"",m=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),m&&b&&h&&b!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let g=n.get(a);if(g){try{g()}catch{}n.delete(a)}let v=ss(a,p);e.set(a,v);let C=v.subscribe(()=>i());n.set(a,C)}else if(!m){let k=ss(a,p);e.set(a,k);let g=k.subscribe(()=>i());n.set(a,g)}return r.set(a,h),()=>c(a)}function c(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let p=n.get(a);if(p){try{p()}catch{}n.delete(a)}}return{register:o,unregister:c,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function xt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function xr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let c=new URLSearchParams(n).get("issue");if(c)return decodeURIComponent(c)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Vt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function nn(t){let e=he("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let c=decodeURIComponent(n[1]);t.setState({selected_id:c,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(c)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=xr(s),o=Vt(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=xt(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?xt(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var Sr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),Zo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function on(t){return JSON.parse(JSON.stringify(t))}function ns(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function an(t){if(!ns(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!ns(s)||typeof s.fg!="string"||!Zo.test(s.fg)||(e[r]={fg:s.fg});return e}function Xo(t){return ns(t)?{prefix:an(t.prefix),exact:an(t.exact)}:{prefix:{},exact:{}}}function ln(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Xo(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?on(t.detail):on(Sr.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):Sr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}:{label_display_policy:{visible_prefixes:Sr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):Sr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}}function cn(t={}){let e=he("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:ln(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?ln(i.config):r.config},c=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((d,p)=>d!==r.config.label_display_policy.visible_prefixes[p])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((d,p)=>d!==r.config.label_display_policy.visible_exact[p])||JSON.stringify(o.config.label_display_policy.colors)!==JSON.stringify(r.config.label_display_policy.colors)||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!c&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function dn(t){let e=he("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function c(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),i()}function a(d){return async(h,b)=>{let m=n++,k=Date.now();s.set(m,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",m,h,r+1),o();let g=!1,v=()=>{g||(g=!0,s.delete(m),c())},C=setTimeout(()=>{g||(e("request TIMEOUT id=%d type=%s elapsed=%dms",m,h,Date.now()-k),v())},3e4);try{let M=await d(h,b),x=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",m,h,x),M}catch(M){let x=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",m,h,x,M),M}finally{clearTimeout(C),v()}}}return i(),{wrapSend:a,start:o,done:c,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(s.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:d-h.start_ts}))}}}function Q(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="warning"?s.style.background="#a36a00":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function St(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let c=s.closest("dialog[open]")||document.body;c.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{c.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}var Qo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function $r(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function pn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function un(t){return!pn(t)||typeof t.fg!="string"?null:Qo.test(t.fg)?t.fg:null}function ei(t,e){let r=un(e?.exact?.[t]);if(r)return r;let s=e?.prefix;if(!pn(s))return null;let n="",i=null;for(let[o,c]of Object.entries(s)){let a=un(c);a&&t.startsWith(o)&&o.length>n.length&&(n=o,i=a)}return i}function Ar(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let s=null;t.startsWith("has:")?s="has":t.startsWith("reviewed:")?s="reviewed":t==="pr"&&(s="pr"),s&&r.classList.add(`label-badge--${s}`);let n=ei(t,e);return n&&r.style.setProperty("--label-badge-fg",n),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var $t=["Critical","High","Medium","Low","Backlog"];function fn(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=ti(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=rr(e)+" "+s,r}function ti(t){let e=Math.max(0,Math.min(4,t));return $t[e]||"Medium"}function rr(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Tr(t){let e=hn(t);return e===null?"":new Date(e).toISOString()}function Er(t,e){let r=hn(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let c=Math.floor(n/864e5);if(c<7)return`${c}\uC77C \uC804`;let a=Math.floor(c/7);if(c<30)return`${a}\uC8FC \uC804`;let d=Math.floor(c/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(c/365)}\uB144 \uC804`}function Mt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var sr=["quick_edit","spec_backed","plan"],is=["current","worktree"],as=["same","feature"],ls=["direct","pr"],nr=["light","standard","deep"],cs="Default (standard)",ri=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],si={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},os={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},ni=["spec","plan","impl"];function Be(t){return typeof t!="string"?"":t.trim()}function Rr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):Be(t)}function ds(t){let e=Be(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Jt(t){let e=Be(t.workspace_policy),r=Be(t.branch_policy),s=Be(t.finish_action),n=!!(e||r||s);for(let i of ri)if(e===i.workspace_policy&&r===i.branch_policy&&s===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function oi(t){let e=Be(t.review_profile);return e?nr.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:cs}}function us(t,e,r,s,n){let i=Be(t),o=Be(e),c=Be(r),a=Be(s),d=n===null?"":Be(n);return!sr.includes(i)||Jt({workspace_policy:o,branch_policy:c,finish_action:a}).kind!=="valid"||d&&!nr.includes(d)?null:{execution_lane:i,workspace_policy:o,branch_policy:c,finish_action:a,review_profile:d||null}}function At(t,e,r={}){return{id:t,label:r.label||os[t]||t,value:Rr(e),kind:r.kind||"value",href:r.href}}function ii(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ai(t,e,r,s,n){switch(t){case"workflow_settings":return li(e,s);case"artifacts":return ci(e,r,s);case"review_gates":return di(e,s,n);case"delivery":return pi(e,s);case"freshness":case"followup":case"human":return fi(e,s);default:return[]}}function Cr(t,e,r,s=!1){return r.includes(e)&&!s?At(t,e):e?At(t,e,{kind:"invalid"}):null}function li(t,e){let r=[],n=Jt(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=Cr(i,Be(e.execution_lane),sr);o&&r.push(o);continue}if(i==="workspace_policy"){let o=Cr(i,Be(e.workspace_policy),is,n);o&&r.push(o);continue}if(i==="branch_policy"){let o=Cr(i,Be(e.branch_policy),as,n);o&&r.push(o);continue}if(i==="finish_action"){let o=Cr(i,Be(e.finish_action),ls,n);o&&r.push(o);continue}if(i==="review_profile"){let o=oi(e);r.push(At(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function ci(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Rr(n[i]);o&&s.push(At(i,o,{kind:"artifact"}))}return s}function di(t,e,r){let s=[];for(let n of ni)for(let i of t){let o=ui(n,i,e,r);o&&s.push(o)}return s}function ui(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let p=`reviewed:${t}`;return s.includes(p)?At(`${t}_${e}`,p,{label:`${t} ${os[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],d=a?Rr(r[a]):"";return d?At(`${t}_${e}`,d,{label:`${t} ${os[e]||e}`}):null}function pi(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=ds(e.pr_url);n&&r.push(At(s,"PR",{kind:"link",href:n.href}))}return r}function fi(t,e){let r=[];for(let s of t){let n=Rr(e[s]);n&&r.push(At(s,n))}return r}function gn(t,e){let r=ii(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let c=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],d=ai(o,c,t,r,s);d.length>0&&i.push({id:o,label:si[o]||o,rows:d,editable_fields:a})}return i}var hi={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},gi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function bn(t,e,r,s,n=void 0,i=void 0,o=void 0){let c=he("views:board"),a=[],d=[],p=[],h=[],b=[],m=[],k=[],g=i?vt(i):null;function v(T){return String(T.status||"open")==="open"}let C="today",M=!1;if(s)try{let T=s.getState(),A=T&&T.board?String(T.board.closed_filter||"today"):"today";(A==="today"||A==="3"||A==="7")&&(C=A),M=T?.board?.show_deferred_column===!0}catch{}function x(){let T=s?.getState?.().config?.label_display_policy,A=T?.visible_prefixes,H=T?.visible_exact,G=T?.colors;return{visible_prefixes:Array.isArray(A)?A:["has:","reviewed:"],visible_exact:Array.isArray(H)?H:[],colors:G&&typeof G=="object"?G:{prefix:{},exact:{}}}}function S(T){return Array.isArray(T.labels)?T.labels.filter(A=>A!=="pr"):[]}function R(T){let A=T.metadata||{},H=[],G=A.execution_lane||"",V=hi[G];V&&H.push({kind:"lane",text:V});let oe=Jt(A);return oe.kind==="valid"&&H.push({kind:"route",text:oe.label}),ds(A.pr_url)&&H.push({kind:"delivery",text:"PR"}),H}function B(){let T=b.length;return _`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${M?"is-active":""}"
            type="button"
            aria-pressed=${M?"true":"false"}
            @click=${X}
          >
            Deferred (${T})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${M?6:5}`}
        >
          ${K("Blocked","blocked-col",d)}
          ${K("Ready","ready-col",a)}
          ${K("In Progress","in-progress-col",p)}
          ${M?K("Deferred","deferred-col",b):""}
          ${K("Resolved","resolved-col",h)}
          ${K("Closed","closed-col",m)}
        </div>
      </div>
    `}function K(T,A,H){let G=Array.isArray(H)?H.length:0,V=G===1?"1 issue":`${G} issues`;return _`
      <section class="board-column" id=${A}>
        <header
          class="board-column__header"
          id=${A+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${T}</span>
            <span class="badge board-column__count" aria-label=${V}>
              ${G}
            </span>
          </div>
          ${A==="closed-col"?_`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${Y}
                >
                  <option
                    value="today"
                    ?selected=${C==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${C==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${C==="7"}>
                    Last 7 days
                  </option>
                </select>
              </label>`:""}
        </header>
        <div
          class="board-column__body"
          role="list"
          aria-labelledby=${A+"-header"}
        >
          ${H.map(oe=>O(oe))}
        </div>
      </section>
    `}function O(T){let A=x(),H=R(T),G=$r(S(T),A.visible_prefixes,A.visible_exact);return _`
      <article
        class="board-card"
        data-issue-id=${T.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${V=>z(V,T.id)}
        @dragstart=${V=>ce(V,T.id)}
        @dragend=${ae}
      >
        <div class="board-card__title text-truncate">
          ${T.title||"(no title)"}
        </div>
        ${H.length>0?_`<div class="board-card__workflow">
              ${H.map(V=>_`<span class="workflow-chip workflow-chip--${V.kind}"
                    >${V.text}</span
                  >`)}
            </div>`:""}
        ${G.length>0?_`<div class="board-card__labels">
              ${G.map(V=>Ar(V,A.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Mt(T.issue_type)} ${fn(T.priority)}
          ${St(T.id,{class_name:"mono"})}
          ${T.created_at?_`<span
                class="board-card__date"
                title=${Tr(T.created_at)}
                >${Er(T.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let F=null;function z(T,A){F||r(A)}function ce(T,A){F=A,T.dataTransfer&&(T.dataTransfer.setData("text/plain",A),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging"),c("dragstart %s",A)}function ae(T){T.target.classList.remove("board-card--dragging"),Re(),setTimeout(()=>{F=null},0),c("dragend")}function Re(){let T=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let A of T)A.classList.remove("board-column--drag-over")}async function ve(T,A){if(!o){c("no transport available, status update skipped"),Q("Cannot update status: not connected","error");return}try{c("update-status %s \u2192 %s",T,A),await o("update-status",{id:T,status:A}),Q("Status updated","success",1500)}catch(H){c("update-status failed: %o",H),Q("Failed to update status","error")}}function ge(){_e(B(),t),$()}function $(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let A of T){let H=A.querySelector(".board-column__body");if(!H)continue;let G=Array.from(H.querySelectorAll(".board-card")),V=A.querySelector(".board-column__header"),oe=V&&V.textContent?.trim()||"";for(let ue of G){let pe=ue.querySelector(".board-card__title"),le=pe&&pe.textContent?.trim()||"";ue.setAttribute("aria-label",`Issue ${le||"(no title)"} \u2014 Column ${oe}`),ue.tabIndex=-1}G.length>0&&(G[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",T=>{let A=T.target;if(!A||!(A instanceof HTMLElement))return;let H=String(A.tagName||"").toLowerCase();if(H==="input"||H==="textarea"||H==="select"||A.isContentEditable===!0)return;let G=A.closest(".board-card");if(!G)return;let V=String(T.key||"");if(V==="Enter"||V===" "){T.preventDefault();let xe=G.getAttribute("data-issue-id");xe&&r(xe);return}if(V!=="ArrowUp"&&V!=="ArrowDown"&&V!=="ArrowLeft"&&V!=="ArrowRight")return;T.preventDefault();let oe=G.closest(".board-column");if(!oe)return;let ue=oe.querySelector(".board-column__body");if(!ue)return;let pe=Array.from(ue.querySelectorAll(".board-card")),le=pe.indexOf(G);if(le!==-1){if(V==="ArrowDown"&&le<pe.length-1){ee(pe[le],pe[le+1]);return}if(V==="ArrowUp"&&le>0){ee(pe[le],pe[le-1]);return}if(V==="ArrowRight"||V==="ArrowLeft"){let xe=Array.from(t.querySelectorAll(".board-column")),Z=xe.indexOf(oe);if(Z===-1)return;let we=V==="ArrowRight"?1:-1,Ee=Z+we,Me=null;for(;Ee>=0&&Ee<xe.length;){let Ce=xe[Ee],Ge=Ce.querySelector(".board-column__body");if((Ge?Array.from(Ge.querySelectorAll(".board-card")):[]).length>0){Me=Ce;break}Ee+=we}if(Me){let Ce=Me.querySelector(".board-column__body .board-card");Ce&&ee(G,Ce)}return}}});let D=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let H=T.target.closest(".board-column");H&&H!==D&&(D&&D.classList.remove("board-column--drag-over"),H.classList.add("board-column--drag-over"),D=H)}),t.addEventListener("dragleave",T=>{let A=T.relatedTarget;(!A||!t.contains(A))&&D&&(D.classList.remove("board-column--drag-over"),D=null)}),t.addEventListener("drop",T=>{T.preventDefault(),D&&(D.classList.remove("board-column--drag-over"),D=null);let H=T.target.closest(".board-column");if(!H)return;let G=H.id,V=gi[G];if(!V){c("drop on unknown column: %s",G);return}let oe=T.dataTransfer?.getData("text/plain");if(!oe){c("drop without issue id");return}c("drop %s on %s \u2192 %s",oe,G,V),ve(oe,V)});function ee(T,A){try{T.tabIndex=-1,A.tabIndex=0,A.focus()}catch{}}function se(){c("applyClosedFilter %s",C);let T=Array.isArray(k)?[...k]:[],A=new Date,H=0;C==="today"?H=new Date(A.getFullYear(),A.getMonth(),A.getDate(),0,0,0,0).getTime():C==="3"?H=A.getTime()-4320*60*1e3:C==="7"&&(H=A.getTime()-10080*60*1e3),T=T.filter(G=>{let V=Number.isFinite(G.closed_at)?G.closed_at:NaN;return Number.isFinite(V)?V>=H:!1}),T.sort(qt),m=T}function Y(T){try{let A=T.target,H=String(A.value||"today");if(C=H==="3"||H==="7"?H:"today",c("closed filter %s",C),s)try{s.setState({board:{closed_filter:C}})}catch{}se(),ge()}catch{}}function X(){if(M=!M,s)try{s.setState({board:{show_deferred_column:M}})}catch{}ge()}function ke(){try{if(g){let T=g.selectBoardColumn("tab:board:in-progress","in_progress"),A=g.selectBoardColumn("tab:board:blocked","blocked"),H=g.selectBoardColumn("tab:board:ready","ready"),G=g.selectBoardColumn("tab:board:closed","closed"),V=g.selectBoardColumn("tab:board:deferred","deferred"),oe=g.selectBoardColumn("tab:board:resolved","resolved"),ue=new Set(T.map(le=>le.id));a=H.filter(le=>v(le)&&!ue.has(le.id)),d=A.filter(le=>v(le)),p=T,b=V,h=oe,k=G}se(),ge()}catch{a=[],d=[],p=[],h=[],m=[],ge()}}g&&g.subscribe(()=>{try{ke()}catch{}});let te=null;if(s?.subscribe){let T=JSON.stringify(x());te=s.subscribe(()=>{let A=JSON.stringify(x());A!==T&&(T=A,ge())})}return{async load(){c("load"),ke();try{let T=!!(n&&n.selectors),A=oe=>{if(!T||!n)return 0;let ue=n.selectors;if(typeof ue.count=="function")return Number(ue.count(oe)||0);try{let pe=ue.getIds(oe);return Array.isArray(pe)?pe.length:0}catch{return 0}},H=A("tab:board:ready")+A("tab:board:blocked")+A("tab:board:in-progress")+A("tab:board:deferred")+A("tab:board:resolved")+A("tab:board:closed"),G=e,V=G&&typeof G.getReady=="function"&&typeof G.getBlocked=="function"&&typeof G.getInProgress=="function"&&typeof G.getClosed=="function";if(H===0&&V){c("fallback fetch");let[oe,ue,pe,le,xe]=await Promise.all([G.getReady().catch(()=>[]),G.getBlocked().catch(()=>[]),G.getInProgress().catch(()=>[]),(G.getResolved?.()??Promise.resolve([])).catch(()=>[]),G.getClosed().catch(()=>[])]),Z=Array.isArray(oe)?oe.map(ye=>ye):[],we=Array.isArray(ue)?ue.map(ye=>ye):[],Ee=Array.isArray(pe)?pe.map(ye=>ye):[],Me=Array.isArray(le)?le.map(ye=>ye):[],Ce=Array.isArray(xe)?xe.map(ye=>ye):[],Ge=new Set(Ee.map(ye=>ye.id));Z=Z.filter(ye=>v(ye)&&!Ge.has(ye.id)),Z.sort(tt);let Je=we.filter(ye=>v(ye));Je.sort(tt),Ee.sort(tt),Me.sort(tt),a=Z,d=Je,p=Ee,h=Me,k=Ce,se(),ge()}}catch{}},clear(){te&&(te(),te=null),t.replaceChildren(),a=[],d=[],p=[],h=[],m=[]}}}var{entries:$n,setPrototypeOf:_n,isFrozen:bi,getPrototypeOf:_i,getOwnPropertyDescriptor:yi}=Object,{freeze:ze,seal:rt,create:ys}=Object,{apply:ms,construct:ws}=typeof Reflect<"u"&&Reflect;ze||(ze=function(e){return e});rt||(rt=function(e){return e});ms||(ms=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});ws||(ws=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var Ir=He(Array.prototype.forEach),mi=He(Array.prototype.lastIndexOf),yn=He(Array.prototype.pop),or=He(Array.prototype.push),wi=He(Array.prototype.splice),Dr=He(String.prototype.toLowerCase),ps=He(String.prototype.toString),fs=He(String.prototype.match),ir=He(String.prototype.replace),ki=He(String.prototype.indexOf),vi=He(String.prototype.trim),ot=He(Object.prototype.hasOwnProperty),Ue=He(RegExp.prototype.test),ar=xi(TypeError);function He(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ms(t,e,s)}}function xi(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return ws(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Dr;_n&&_n(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(bi(e)||(e[s]=i),n=i)}t[n]=!0}return t}function Si(t){for(let e=0;e<t.length;e++)ot(t,e)||(t[e]=null);return t}function bt(t){let e=ys(null);for(let[r,s]of $n(t))ot(t,r)&&(Array.isArray(s)?e[r]=Si(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=bt(s):e[r]=s);return e}function lr(t,e){for(;t!==null;){let s=yi(t,e);if(s){if(s.get)return He(s.get);if(typeof s.value=="function")return He(s.value)}t=_i(t)}function r(){return null}return r}var mn=ze(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hs=ze(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gs=ze(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$i=ze(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bs=ze(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ai=ze(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wn=ze(["#text"]),kn=ze(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_s=ze(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vn=ze(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Lr=ze(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ti=rt(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ei=rt(/<%[\w\W]*|[\w\W]*%>/gm),Ci=rt(/\$\{[\w\W]*/gm),Ri=rt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ii=rt(/^aria-[\-\w]+$/),An=rt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Li=rt(/^(?:\w+script|data):/i),Di=rt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tn=rt(/^html$/i),Ni=rt(/^[a-z][.\w]*(-[.\w]+)+$/i),xn=Object.freeze({__proto__:null,ARIA_ATTR:Ii,ATTR_WHITESPACE:Di,CUSTOM_ELEMENT:Ni,DATA_ATTR:Ri,DOCTYPE_NAME:Tn,ERB_EXPR:Ei,IS_ALLOWED_URI:An,IS_SCRIPT_OR_DATA:Li,MUSTACHE_EXPR:Ti,TMPLIT_EXPR:Ci}),cr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Pi=function(){return typeof window>"u"?null:window},Oi=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Sn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function En(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pi(),e=j=>En(j);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==cr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:c,Element:a,NodeFilter:d,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:m}=t,k=a.prototype,g=lr(k,"cloneNode"),v=lr(k,"remove"),C=lr(k,"nextSibling"),M=lr(k,"childNodes"),x=lr(k,"parentNode");if(typeof o=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let S,R="",{implementation:B,createNodeIterator:K,createDocumentFragment:O,getElementsByTagName:F}=r,{importNode:z}=s,ce=Sn();e.isSupported=typeof $n=="function"&&typeof x=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ae,ERB_EXPR:Re,TMPLIT_EXPR:ve,DATA_ATTR:ge,ARIA_ATTR:$,IS_SCRIPT_OR_DATA:D,ATTR_WHITESPACE:ee,CUSTOM_ELEMENT:se}=xn,{IS_ALLOWED_URI:Y}=xn,X=null,ke=re({},[...mn,...hs,...gs,...bs,...wn]),te=null,T=re({},[...kn,..._s,...vn,...Lr]),A=Object.seal(ys(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),H=null,G=null,V=Object.seal(ys(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),oe=!0,ue=!0,pe=!1,le=!0,xe=!1,Z=!0,we=!1,Ee=!1,Me=!1,Ce=!1,Ge=!1,Je=!1,ye=!0,Ke=!1,dt="user-content-",yt=!0,ut=!1,lt={},Ve=null,ct=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),pt=null,ft=re({},["audio","video","img","source","image","track"]),Tt=null,Et=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),mt="http://www.w3.org/1998/Math/MathML",Ye="http://www.w3.org/2000/svg",$e="http://www.w3.org/1999/xhtml",Le=$e,De=!1,Ne=null,Ze=re({},[mt,Ye,$e],ps),Fe=re({},["mi","mo","mn","ms","mtext"]),Oe=re({},["annotation-xml"]),Xe=re({},["title","style","font","a","script"]),Ae=null,Qe=["application/xhtml+xml","text/html"],et="text/html",J=null,N=null,Ut=r.createElement("form"),ht=function(f){return f instanceof RegExp||f instanceof Function},gt=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(N&&N===f)){if((!f||typeof f!="object")&&(f={}),f=bt(f),Ae=Qe.indexOf(f.PARSER_MEDIA_TYPE)===-1?et:f.PARSER_MEDIA_TYPE,J=Ae==="application/xhtml+xml"?ps:Dr,X=ot(f,"ALLOWED_TAGS")?re({},f.ALLOWED_TAGS,J):ke,te=ot(f,"ALLOWED_ATTR")?re({},f.ALLOWED_ATTR,J):T,Ne=ot(f,"ALLOWED_NAMESPACES")?re({},f.ALLOWED_NAMESPACES,ps):Ze,Tt=ot(f,"ADD_URI_SAFE_ATTR")?re(bt(Et),f.ADD_URI_SAFE_ATTR,J):Et,pt=ot(f,"ADD_DATA_URI_TAGS")?re(bt(ft),f.ADD_DATA_URI_TAGS,J):ft,Ve=ot(f,"FORBID_CONTENTS")?re({},f.FORBID_CONTENTS,J):ct,H=ot(f,"FORBID_TAGS")?re({},f.FORBID_TAGS,J):bt({}),G=ot(f,"FORBID_ATTR")?re({},f.FORBID_ATTR,J):bt({}),lt=ot(f,"USE_PROFILES")?f.USE_PROFILES:!1,oe=f.ALLOW_ARIA_ATTR!==!1,ue=f.ALLOW_DATA_ATTR!==!1,pe=f.ALLOW_UNKNOWN_PROTOCOLS||!1,le=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,xe=f.SAFE_FOR_TEMPLATES||!1,Z=f.SAFE_FOR_XML!==!1,we=f.WHOLE_DOCUMENT||!1,Ce=f.RETURN_DOM||!1,Ge=f.RETURN_DOM_FRAGMENT||!1,Je=f.RETURN_TRUSTED_TYPE||!1,Me=f.FORCE_BODY||!1,ye=f.SANITIZE_DOM!==!1,Ke=f.SANITIZE_NAMED_PROPS||!1,yt=f.KEEP_CONTENT!==!1,ut=f.IN_PLACE||!1,Y=f.ALLOWED_URI_REGEXP||An,Le=f.NAMESPACE||$e,Fe=f.MATHML_TEXT_INTEGRATION_POINTS||Fe,Oe=f.HTML_INTEGRATION_POINTS||Oe,A=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&ht(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(A.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&ht(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(A.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(A.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),xe&&(ue=!1),Ge&&(Ce=!0),lt&&(X=re({},wn),te=[],lt.html===!0&&(re(X,mn),re(te,kn)),lt.svg===!0&&(re(X,hs),re(te,_s),re(te,Lr)),lt.svgFilters===!0&&(re(X,gs),re(te,_s),re(te,Lr)),lt.mathMl===!0&&(re(X,bs),re(te,vn),re(te,Lr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?V.tagCheck=f.ADD_TAGS:(X===ke&&(X=bt(X)),re(X,f.ADD_TAGS,J))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?V.attributeCheck=f.ADD_ATTR:(te===T&&(te=bt(te)),re(te,f.ADD_ATTR,J))),f.ADD_URI_SAFE_ATTR&&re(Tt,f.ADD_URI_SAFE_ATTR,J),f.FORBID_CONTENTS&&(Ve===ct&&(Ve=bt(Ve)),re(Ve,f.FORBID_CONTENTS,J)),yt&&(X["#text"]=!0),we&&re(X,["html","head","body"]),X.table&&(re(X,["tbody"]),delete H.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw ar('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ar('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');S=f.TRUSTED_TYPES_POLICY,R=S.createHTML("")}else S===void 0&&(S=Oi(m,n)),S!==null&&typeof R=="string"&&(R=S.createHTML(""));ze&&ze(f),N=f}},Ct=re({},[...hs,...gs,...$i]),y=re({},[...bs,...Ai]),u=function(f){let E=x(f);(!E||!E.tagName)&&(E={namespaceURI:Le,tagName:"template"});let U=Dr(f.tagName),be=Dr(E.tagName);return Ne[f.namespaceURI]?f.namespaceURI===Ye?E.namespaceURI===$e?U==="svg":E.namespaceURI===mt?U==="svg"&&(be==="annotation-xml"||Fe[be]):!!Ct[U]:f.namespaceURI===mt?E.namespaceURI===$e?U==="math":E.namespaceURI===Ye?U==="math"&&Oe[be]:!!y[U]:f.namespaceURI===$e?E.namespaceURI===Ye&&!Oe[be]||E.namespaceURI===mt&&!Fe[be]?!1:!y[U]&&(Xe[U]||!Ct[U]):!!(Ae==="application/xhtml+xml"&&Ne[f.namespaceURI]):!1},L=function(f){or(e.removed,{element:f});try{x(f).removeChild(f)}catch{v(f)}},l=function(f,E){try{or(e.removed,{attribute:E.getAttributeNode(f),from:E})}catch{or(e.removed,{attribute:null,from:E})}if(E.removeAttribute(f),f==="is")if(Ce||Ge)try{L(E)}catch{}else try{E.setAttribute(f,"")}catch{}},w=function(f){let E=null,U=null;if(Me)f="<remove></remove>"+f;else{let W=fs(f,/^[\r\n\t ]+/);U=W&&W[0]}Ae==="application/xhtml+xml"&&Le===$e&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let be=S?S.createHTML(f):f;if(Le===$e)try{E=new b().parseFromString(be,Ae)}catch{}if(!E||!E.documentElement){E=B.createDocument(Le,"template",null);try{E.documentElement.innerHTML=De?R:be}catch{}}let Ie=E.body||E.documentElement;return f&&U&&Ie.insertBefore(r.createTextNode(U),Ie.childNodes[0]||null),Le===$e?F.call(E,we?"html":"body")[0]:we?E.documentElement:Ie},P=function(f){return K.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},I=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof p)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},q=function(f){return typeof c=="function"&&f instanceof c};function me(j,f,E){Ir(j,U=>{U.call(e,f,E,N)})}let nt=function(f){let E=null;if(me(ce.beforeSanitizeElements,f,null),I(f))return L(f),!0;let U=J(f.nodeName);if(me(ce.uponSanitizeElement,f,{tagName:U,allowedTags:X}),Z&&f.hasChildNodes()&&!q(f.firstElementChild)&&Ue(/<[/\w!]/g,f.innerHTML)&&Ue(/<[/\w!]/g,f.textContent)||f.nodeType===cr.progressingInstruction||Z&&f.nodeType===cr.comment&&Ue(/<[/\w]/g,f.data))return L(f),!0;if(!(V.tagCheck instanceof Function&&V.tagCheck(U))&&(!X[U]||H[U])){if(!H[U]&&Kt(U)&&(A.tagNameCheck instanceof RegExp&&Ue(A.tagNameCheck,U)||A.tagNameCheck instanceof Function&&A.tagNameCheck(U)))return!1;if(yt&&!Ve[U]){let be=x(f)||f.parentNode,Ie=M(f)||f.childNodes;if(Ie&&be){let W=Ie.length;for(let ne=W-1;ne>=0;--ne){let je=g(Ie[ne],!0);je.__removalCount=(f.__removalCount||0)+1,be.insertBefore(je,C(f))}}}return L(f),!0}return f instanceof a&&!u(f)||(U==="noscript"||U==="noembed"||U==="noframes")&&Ue(/<\/no(script|embed|frames)/i,f.innerHTML)?(L(f),!0):(xe&&f.nodeType===cr.text&&(E=f.textContent,Ir([ae,Re,ve],be=>{E=ir(E,be," ")}),f.textContent!==E&&(or(e.removed,{element:f.cloneNode()}),f.textContent=E)),me(ce.afterSanitizeElements,f,null),!1)},Te=function(f,E,U){if(ye&&(E==="id"||E==="name")&&(U in r||U in Ut))return!1;if(!(ue&&!G[E]&&Ue(ge,E))){if(!(oe&&Ue($,E))){if(!(V.attributeCheck instanceof Function&&V.attributeCheck(E,f))){if(!te[E]||G[E]){if(!(Kt(f)&&(A.tagNameCheck instanceof RegExp&&Ue(A.tagNameCheck,f)||A.tagNameCheck instanceof Function&&A.tagNameCheck(f))&&(A.attributeNameCheck instanceof RegExp&&Ue(A.attributeNameCheck,E)||A.attributeNameCheck instanceof Function&&A.attributeNameCheck(E,f))||E==="is"&&A.allowCustomizedBuiltInElements&&(A.tagNameCheck instanceof RegExp&&Ue(A.tagNameCheck,U)||A.tagNameCheck instanceof Function&&A.tagNameCheck(U))))return!1}else if(!Tt[E]){if(!Ue(Y,ir(U,ee,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&f!=="script"&&ki(U,"data:")===0&&pt[f])){if(!(pe&&!Ue(D,ir(U,ee,"")))){if(U)return!1}}}}}}}return!0},Kt=function(f){return f!=="annotation-xml"&&fs(f,se)},wt=function(f){me(ce.beforeSanitizeAttributes,f,null);let{attributes:E}=f;if(!E||I(f))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0},be=E.length;for(;be--;){let Ie=E[be],{name:W,namespaceURI:ne,value:je}=Ie,It=J(W),Gr=je,Pe=W==="value"?Gr:vi(Gr);if(U.attrName=It,U.attrValue=Pe,U.keepAttr=!0,U.forceKeepAttr=void 0,me(ce.uponSanitizeAttribute,f,U),Pe=U.attrValue,Ke&&(It==="id"||It==="name")&&(l(W,f),Pe=dt+Pe),Z&&Ue(/((--!?|])>)|<\/(style|title|textarea)/i,Pe)){l(W,f);continue}if(It==="attributename"&&fs(Pe,"href")){l(W,f);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){l(W,f);continue}if(!le&&Ue(/\/>/i,Pe)){l(W,f);continue}xe&&Ir([ae,Re,ve],Ms=>{Pe=ir(Pe,Ms," ")});let Os=J(f.nodeName);if(!Te(Os,It,Pe)){l(W,f);continue}if(S&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ne)switch(m.getAttributeType(Os,It)){case"TrustedHTML":{Pe=S.createHTML(Pe);break}case"TrustedScriptURL":{Pe=S.createScriptURL(Pe);break}}if(Pe!==Gr)try{ne?f.setAttributeNS(ne,W,Pe):f.setAttribute(W,Pe),I(f)?L(f):yn(e.removed)}catch{l(W,f)}}me(ce.afterSanitizeAttributes,f,null)},Rt=function j(f){let E=null,U=P(f);for(me(ce.beforeSanitizeShadowDOM,f,null);E=U.nextNode();)me(ce.uponSanitizeShadowNode,E,null),nt(E),wt(E),E.content instanceof i&&j(E.content);me(ce.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(j){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,U=null,be=null,Ie=null;if(De=!j,De&&(j="<!-->"),typeof j!="string"&&!q(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw ar("dirty is not a string, aborting")}else throw ar("toString is not a function");if(!e.isSupported)return j;if(Ee||gt(f),e.removed=[],typeof j=="string"&&(ut=!1),ut){if(j.nodeName){let je=J(j.nodeName);if(!X[je]||H[je])throw ar("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof c)E=w("<!---->"),U=E.ownerDocument.importNode(j,!0),U.nodeType===cr.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?E=U:E.appendChild(U);else{if(!Ce&&!xe&&!we&&j.indexOf("<")===-1)return S&&Je?S.createHTML(j):j;if(E=w(j),!E)return Ce?null:Je?R:""}E&&Me&&L(E.firstChild);let W=P(ut?j:E);for(;be=W.nextNode();)nt(be),wt(be),be.content instanceof i&&Rt(be.content);if(ut)return j;if(Ce){if(Ge)for(Ie=O.call(E.ownerDocument);E.firstChild;)Ie.appendChild(E.firstChild);else Ie=E;return(te.shadowroot||te.shadowrootmode)&&(Ie=z.call(s,Ie,!0)),Ie}let ne=we?E.outerHTML:E.innerHTML;return we&&X["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Ue(Tn,E.ownerDocument.doctype.name)&&(ne="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+ne),xe&&Ir([ae,Re,ve],je=>{ne=ir(ne,je," ")}),S&&Je?S.createHTML(ne):ne},e.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};gt(j),Ee=!0},e.clearConfig=function(){N=null,Ee=!1},e.isValidAttribute=function(j,f,E){N||gt({});let U=J(j),be=J(f);return Te(U,be,E)},e.addHook=function(j,f){typeof f=="function"&&or(ce[j],f)},e.removeHook=function(j,f){if(f!==void 0){let E=mi(ce[j],f);return E===-1?void 0:wi(ce[j],E,1)[0]}return yn(ce[j])},e.removeHooks=function(j){ce[j]=[]},e.removeAllHooks=function(){ce=Sn()},e}var Cn=En();var Rn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},In=t=>(...e)=>({_$litDirective$:t,values:e}),Nr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var dr=class extends Nr{constructor(e){if(super(e),this.it=Se,e.type!==Rn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Se||e==null)return this._t=void 0,this.it=e;if(e===Pt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dr.directiveName="unsafeHTML",dr.resultType=1;var Ln=In(dr);function Ss(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Bt=Ss();function Bn(t){Bt=t}var hr={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(qe.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var Mi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),qe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Fi=/^(?:[ \t]*(?:\n|$))+/,Bi=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ui=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,gr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,zi=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,$s=/(?:[*+-]|\d{1,9}[.)])/,Un=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zn=ie(Un).replace(/bull/g,$s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Hi=ie(Un).replace(/bull/g,$s).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),As=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qi=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ji=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wi=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,$s).getRegex(),Ur="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Gi=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Ur).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hn=ie(As).replace("hr",gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ur).getRegex(),Vi=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hn).getRegex(),Cs={blockquote:Vi,code:Bi,def:ji,fences:Ui,heading:zi,hr:gr,html:Gi,lheading:zn,list:Wi,newline:Fi,paragraph:Hn,table:hr,text:qi},Dn=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ur).getRegex(),Ji={...Cs,lheading:Hi,table:Dn,paragraph:ie(As).replace("hr",gr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Dn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ur).getRegex()},Ki={...Cs,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:hr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie(As).replace("hr",gr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qn=/^( {2,}|\\)\n(?!\s*$)/,Xi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,zr=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,jn=/[^\s\p{P}\p{S}]/u,Qi=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),Wn=/(?!~)[\p{P}\p{S}]/u,ea=/(?!~)[\s\p{P}\p{S}]/u,ta=/(?:[^\s\p{P}\p{S}]|~)/u,ra=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Gn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sa=ie(Gn,"u").replace(/punct/g,zr).getRegex(),na=ie(Gn,"u").replace(/punct/g,Wn).getRegex(),Vn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",oa=ie(Vn,"gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,zr).getRegex(),ia=ie(Vn,"gu").replace(/notPunctSpace/g,ta).replace(/punctSpace/g,ea).replace(/punct/g,Wn).getRegex(),aa=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,zr).getRegex(),la=ie(/\\(punct)/,"gu").replace(/punct/g,zr).getRegex(),ca=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),da=ie(Es).replace("(?:-->|$)","-->").getRegex(),ua=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Mr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pa=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Mr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Jn=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",Mr).replace("ref",Ts).getRegex(),Kn=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),fa=ie("reflink|nolink(?!\\()","g").replace("reflink",Jn).replace("nolink",Kn).getRegex(),Nn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:hr,anyPunctuation:la,autolink:ca,blockSkip:ra,br:qn,code:Zi,del:hr,emStrongLDelim:sa,emStrongRDelimAst:oa,emStrongRDelimUnd:aa,escape:Yi,link:pa,nolink:Kn,punctuation:Qi,reflink:Jn,reflinkSearch:fa,tag:ua,text:Xi,url:hr},ha={...Is,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",Mr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Mr).getRegex()},ks={...Is,emStrongRDelimAst:ia,emStrongLDelim:na,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Nn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Nn).getRegex()},ga={...ks,br:ie(qn).replace("{2,}","*").getRegex(),text:ie(ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Pr={normal:Cs,gfm:Ji,pedantic:Ki},ur={normal:Is,gfm:ks,breaks:ga,pedantic:ha},ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pn=t=>ba[t];function _t(t,e){if(e){if(qe.escapeTest.test(t))return t.replace(qe.escapeReplace,Pn)}else if(qe.escapeTestNoEncode.test(t))return t.replace(qe.escapeReplaceNoEncode,Pn);return t}function On(t){try{t=encodeURI(t).replace(qe.percentDecode,"%")}catch{return null}return t}function Mn(t,e){let r=t.replace(qe.findPipe,(i,o,c)=>{let a=!1,d=o;for(;--d>=0&&c[d]==="\\";)a=!a;return a?"|":" |"}),s=r.split(qe.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(qe.slashPipe,"|");return s}function pr(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function _a(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Fn(t,e,r,s,n){let i=e.href,o=e.title||null,c=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,a}function ya(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[c]=o;return c.length>=n.length?i.slice(n.length):i}).join(`
`)}var Fr=class{constructor(t){fe(this,"options");fe(this,"rules");fe(this,"lexer");this.options=t||Bt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:pr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=ya(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=pr(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:pr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=pr(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,c=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),o=!0;else if(!o)c.push(r[a]);else break;r=r.slice(a);let d=c.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,n=n?`${n}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=h,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let m=b,k=m.raw+`
`+r.join(`
`),g=this.blockquote(k);i[i.length-1]=g,s=s.substring(0,s.length-m.raw.length)+g.raw,n=n.substring(0,n.length-m.text.length)+g.text;break}else if(b?.type==="list"){let m=b,k=m.raw+`
`+r.join(`
`),g=this.list(k);i[i.length-1]=g,s=s.substring(0,s.length-b.raw.length)+g.raw,n=n.substring(0,n.length-m.raw.length)+g.raw,r=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,d="",p="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=t.split(`
`,1)[0],m=!h.trim(),k=0;if(this.options.pedantic?(k=2,p=h.trimStart()):m?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=h.slice(k),k+=e[1].length),m&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let g=this.rules.other.nextBulletRegex(k),v=this.rules.other.hrRegex(k),C=this.rules.other.fencesBeginRegex(k),M=this.rules.other.headingBeginRegex(k),x=this.rules.other.htmlBeginRegex(k);for(;t;){let S=t.split(`
`,1)[0],R;if(b=S,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),R=b):R=b.replace(this.rules.other.tabCharGlobal,"    "),C.test(b)||M.test(b)||x.test(b)||g.test(b)||v.test(b))break;if(R.search(this.rules.other.nonSpaceChar)>=k||!b.trim())p+=`
`+R.slice(k);else{if(m||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||C.test(h)||M.test(h)||v.test(h))break;p+=`
`+b}!m&&!b.trim()&&(m=!0),d+=S+`
`,t=t.substring(S.length+1),h=R.slice(k)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0)),n.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),n.raw+=d}let c=n.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!n.loose){let d=a.tokens.filter(h=>h.type==="space"),p=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=p}}if(n.loose)for(let a of n.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Mn(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Mn(o,i.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=pr(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=_a(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Fn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Fn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,c=n,a=0,d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+n);(s=d.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){c+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(c-=o,c>0)continue;o=Math.min(o,o+c+a);let p=[...s[0]][0].length,h=t.slice(0,n+s.index+p+o);if(Math.min(n,o)%2){let m=h.slice(1,-1);return{type:"em",raw:h,text:m,tokens:this.lexer.inlineTokens(m)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},it=class vs{constructor(e){fe(this,"tokens");fe(this,"options");fe(this,"state");fe(this,"inlineQueue");fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Bt,this.options.tokenizer=this.options.tokenizer||new Fr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:qe,block:Pr.normal,inline:ur.normal};this.options.pedantic?(r.block=Pr.pedantic,r.inline=ur.pedantic):this.options.gfm&&(r.block=Pr.gfm,this.options.breaks?r.inline=ur.breaks:r.inline=ur.gfm),this.tokenizer.rules=r}static get rules(){return{block:Pr,inline:ur}}static lex(e,r){return new vs(r).lex(e)}static lexInline(e,r){return new vs(r).inlineTokens(e)}lex(e){e=e.replace(qe.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(qe.tabCharGlobal,"    ").replace(qe.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=r.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},r.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),r.push(n);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,c=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},c),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let o=r.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n),s=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,c="";for(;e;){o||(c=""),o=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(m=>{b=m.call({lexer:this},h),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),o=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Br=class{constructor(t){fe(this,"options");fe(this,"parser");this.options=t||Bt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(qe.notSpaceStart)?.[0],n=t.replace(qe.endingNewline,"")+`
`;return s?'<pre><code class="language-'+_t(s)+'">'+(r?n:_t(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:_t(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,s="";for(let o=0;o<t.items.length;o++){let c=t.items[o];s+=this.listitem(c)}let n=e?"ol":"ul",i=e&&r!==1?' start="'+r+'"':"";return"<"+n+i+`>
`+s+"</"+n+`>
`}listitem(t){return`<li>${this.parser.parse(t.tokens)}</li>
`}checkbox({checked:t}){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:t}){return`<p>${this.parser.parseInline(t)}</p>
`}table(t){let e="",r="";for(let n=0;n<t.header.length;n++)r+=this.tablecell(t.header[n]);e+=this.tablerow({text:r});let s="";for(let n=0;n<t.rows.length;n++){let i=t.rows[n];r="";for(let o=0;o<i.length;o++)r+=this.tablecell(i[o]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:t}){return`<tr>
${t}</tr>
`}tablecell(t){let e=this.parser.parseInline(t.tokens),r=t.header?"th":"td";return(t.align?`<${r} align="${t.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${_t(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=On(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+_t(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=On(t);if(n===null)return _t(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${_t(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:_t(t.text)}},Ls=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},at=class xs{constructor(e){fe(this,"options");fe(this,"renderer");fe(this,"textRenderer");this.options=e||Bt,this.options.renderer=this.options.renderer||new Br,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(e,r){return new xs(r).parse(e)}static parseInline(e,r){return new xs(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=c||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let c=this.options.extensions.renderers[i.type].call({parser:this},i);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=c||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let c='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},Or,fr=(Or=class{constructor(t){fe(this,"options");fe(this,"block");this.options=t||Bt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?it.lex:it.lexInline}provideParser(){return this.block?at.parse:at.parseInline}},fe(Or,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),fe(Or,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Or),ma=class{constructor(...t){fe(this,"defaults",Ss());fe(this,"options",this.setOptions);fe(this,"parse",this.parseMarkdown(!0));fe(this,"parseInline",this.parseMarkdown(!1));fe(this,"Parser",at);fe(this,"Renderer",Br);fe(this,"TextRenderer",Ls);fe(this,"Lexer",it);fe(this,"Tokenizer",Fr);fe(this,"Hooks",fr);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let c=n.renderer.apply(this,o);return c===!1&&(c=i.apply(this,o)),c}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new Br(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,c=r.renderer[o],a=n[o];n[o]=(...d)=>{let p=c.apply(n,d);return p===!1&&(p=a.apply(n,d)),p||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Fr(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,c=r.tokenizer[o],a=n[o];n[o]=(...d)=>{let p=c.apply(n,d);return p===!1&&(p=a.apply(n,d)),p}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new fr;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,c=r.hooks[o],a=n[o];fr.passThroughHooks.has(i)?n[o]=d=>{if(this.defaults.async&&fr.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await c.call(n,d);return a.call(n,h)})();let p=c.call(n,d);return a.call(n,p)}:n[o]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await c.apply(n,d);return h===!1&&(h=await a.apply(n,d)),h})();let p=c.apply(n,d);return p===!1&&(p=a.apply(n,d)),p}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let c=[];return c.push(i.call(this,o)),n&&(c=c.concat(n.call(this,o))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return it.lex(t,e??this.defaults)}parser(t,e){return at.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,c=await(n.hooks?await n.hooks.provideLexer():t?it.lex:it.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(c):c;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let d=await(n.hooks?await n.hooks.provideParser():t?at.parse:at.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(d):d})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?it.lex:it.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let c=(n.hooks?n.hooks.provideParser():t?at.parse:at.parseInline)(o,n);return n.hooks&&(c=n.hooks.postprocess(c)),c}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+_t(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Ft=new ma;function de(t,e){return Ft.parse(t,e)}de.options=de.setOptions=function(t){return Ft.setOptions(t),de.defaults=Ft.defaults,Bn(de.defaults),de};de.getDefaults=Ss;de.defaults=Bt;de.use=function(...t){return Ft.use(...t),de.defaults=Ft.defaults,Bn(de.defaults),de};de.walkTokens=function(t,e){return Ft.walkTokens(t,e)};de.parseInline=Ft.parseInline;de.Parser=at;de.parser=at.parse;de.Renderer=Br;de.TextRenderer=Ls;de.Lexer=it;de.lexer=it.lex;de.Tokenizer=Fr;de.Hooks=fr;de.parse=de;var Bl=de.options,Ul=de.setOptions,zl=de.use,Hl=de.walkTokens,ql=de.parseInline;var jl=at.parse,Wl=it.lex;function br(t){let e=de.parse(t),r=Cn.sanitize(e);return Ln(r)}var Hr=["open","in_progress","deferred","resolved","closed"];function st(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function wa(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ka(t){window.location.hash=t}function Yn(t,e,r=ka,s=void 0,n=void 0){let i=he("views:detail"),o=null,c=null,a=!1,d=!1,p=!1,h=!1,b=!1,m=!1,k=!1,g=!1,v="",C="",M="",x="",S="",R="",B="",K=!1,O=null,F=()=>{};function z(){return O||(O=document.createElement("dialog"),O.id="delete-confirm-dialog",O.setAttribute("role","alertdialog"),O.setAttribute("aria-modal","true"),document.body.appendChild(O),O)}function ce(){if(!o)return;let l=z(),w=o.id,P=o.title||"(no title)";l.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${w}</strong> \u2014 <strong>${P}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let I=l.querySelector("#delete-cancel-btn"),q=l.querySelector("#delete-confirm-btn");if(I?.addEventListener("click",()=>{typeof l.close=="function"&&l.close(),l.removeAttribute("open")}),q?.addEventListener("click",async()=>{typeof l.close=="function"&&l.close(),l.removeAttribute("open"),await ae()}),l.addEventListener("cancel",me=>{me.preventDefault(),typeof l.close=="function"&&l.close(),l.removeAttribute("open")}),typeof l.showModal=="function")try{l.showModal(),l.setAttribute("open","")}catch{l.setAttribute("open","")}else l.setAttribute("open","")}async function ae(){if(!o)return;let l=o.id;try{await e("delete-issue",{id:l}),o=null,c=null,N();let w=Vt(window.location.hash||"");r(`#/${w}`)}catch(w){i("delete failed: %o",w),Q("Failed to delete issue","error")}}function Re(l){l.stopPropagation(),l.preventDefault(),ce()}function ve(l){let w=Vt(window.location.hash||"");return xt(w==="worker"?"issues":w,l)}function ge(l){_e(_`
        <div class="panel__body" id="detail-root">
          <p class="muted">${l}</p>
        </div>
      `,t)}function $(){if(!c||!s||typeof s.snapshotFor!="function")return;let l=s.snapshotFor(`detail:${c}`);Array.isArray(l)&&l.length>0&&(o=l.find(P=>String(P.id)===String(c))||l[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{$(),N()}catch(l){i("issue stores listener error %o",l)}}),n&&typeof n.subscribe=="function"&&(F=n.subscribe(()=>{try{N()}catch(l){i("store listener error %o",l)}}));let D=()=>{d=!0,N()},ee=l=>{l.key==="Enter"?(d=!0,N()):l.key==="Escape"&&(d=!1,N())},se=async()=>{if(!o||a)return;let l=t.querySelector("h2 input"),w=o.title||"",P=l?l.value:"";if(P===w){d=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),P);let I=await e("edit-text",{id:o.id,field:"title",value:P});I&&typeof I=="object"&&(o=I,d=!1,N())}catch(I){i("save title failed %s %o",String(o.id),I),o.title=w,d=!1,N(),Q("Failed to save title","error")}finally{a=!1}},Y=()=>{d=!1,N()},X=()=>{k=!0,N()},ke=l=>{l.key==="Enter"?(l.preventDefault(),k=!0,N()):l.key==="Escape"&&(l.preventDefault(),k=!1,N())},te=async()=>{if(!o||a)return;let l=t.querySelector("#detail-root .prop.assignee input"),w=o?.assignee??"",P=l?.value??"";if(P===w){k=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),P);let I=await e("update-assignee",{id:o.id,assignee:P});I&&typeof I=="object"&&(o=I,k=!1,N())}catch(I){i("save assignee failed %s %o",String(o.id),I),o.assignee=w,k=!1,N(),Q("Failed to update assignee","error")}finally{a=!1}},T=()=>{k=!1,N()},A=l=>{R=l.currentTarget.value||""};function H(l){l.key==="Enter"&&(l.preventDefault(),G())}async function G(){if(!o||a)return;let l=R.trim();if(l){a=!0;try{i("add label %s \u2192 %s",String(o.id),l);let w=await e("label-add",{id:o.id,label:l});w&&typeof w=="object"&&(o=w,R="",N())}catch(w){i("add label failed %s %o",String(o.id),w),Q("Failed to add label","error")}finally{a=!1}}}async function V(l){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),l);let w=await e("label-remove",{id:o.id,label:l});w&&typeof w=="object"&&(o=w,N())}catch(w){i("remove label failed %s %o",String(o?.id||""),w),Q("Failed to remove label","error")}finally{a=!1}}}let oe=async l=>{if(!o||a){N();return}let w=l.currentTarget,P=o.status||"open",I=w.value;if(I!==P){a=!0,o.status=I,N();try{i("update status %s \u2192 %s",String(o.id),I);let q=await e("update-status",{id:o.id,status:I});q&&typeof q=="object"&&(o=q,N())}catch(q){i("update status failed %s %o",String(o.id),q),o.status=P,N(),Q("Failed to update status","error")}finally{a=!1}}},ue=async l=>{if(!o||a){N();return}let w=l.currentTarget,P=typeof o.priority=="number"?o.priority:2,I=Number(w.value);if(I!==P){a=!0,o.priority=I,N();try{i("update priority %s \u2192 %d",String(o.id),I);let q=await e("update-priority",{id:o.id,priority:I});q&&typeof q=="object"&&(o=q,N())}catch(q){i("update priority failed %s %o",String(o.id),q),o.priority=P,N(),Q("Failed to update priority","error")}finally{a=!1}}},pe=()=>{p=!0,N()},le=l=>{if(l.key==="Escape")p=!1,N();else if(l.key==="Enter"&&l.ctrlKey){let w=t.querySelector("#detail-root .editable-actions button");w&&w.click()}},xe=async()=>{if(!o||a)return;let l=t.querySelector("#detail-root textarea"),w=o.description||"",P=l?l.value:"";if(P===w){p=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save description %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"description",value:P});I&&typeof I=="object"&&(o=I,p=!1,N())}catch(I){i("save description failed %s %o",String(o?.id||""),I),o.description=w,p=!1,N(),Q("Failed to save description","error")}finally{a=!1}},Z=()=>{p=!1,N()},we=()=>{h=!0,N();try{let l=t.querySelector("#detail-root .design textarea");l&&l.focus()}catch(l){i("focus design textarea failed %o",l)}},Ee=l=>{if(l.key==="Escape")h=!1,N();else if(l.key==="Enter"&&(l.ctrlKey||l.metaKey)){let w=t.querySelector("#detail-root .design .editable-actions button");w&&w.click()}},Me=async()=>{if(!o||a)return;let l=t.querySelector("#detail-root .design textarea"),w=o.design||"",P=l?l.value:"";if(P===w){h=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save design %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"design",value:P});I&&typeof I=="object"&&(o=I,h=!1,N())}catch(I){i("save design failed %s %o",String(o?.id||""),I),o.design=w,h=!1,N(),Q("Failed to save design","error")}finally{a=!1}},Ce=()=>{h=!1,N()},Ge=()=>{b=!0,N()},Je=l=>{if(l.key==="Escape")b=!1,N();else if(l.key==="Enter"&&(l.ctrlKey||l.metaKey)){let w=t.querySelector("#detail-root .notes .editable-actions button");w&&w.click()}},ye=async()=>{if(!o||a)return;let l=t.querySelector("#detail-root .notes textarea"),w=o.notes||"",P=l?l.value:"";if(P===w){b=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save notes %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"notes",value:P});I&&typeof I=="object"&&(o=I,b=!1,N())}catch(I){i("save notes failed %s %o",String(o?.id||""),I),o.notes=w,b=!1,N(),Q("Failed to save notes","error")}finally{a=!1}},Ke=()=>{b=!1,N()},dt=()=>{m=!0,N()},yt=l=>{if(l.key==="Escape")m=!1,N();else if(l.key==="Enter"&&(l.ctrlKey||l.metaKey)){let w=t.querySelector("#detail-root .acceptance .editable-actions button");w&&w.click()}},ut=async()=>{if(!o||a)return;let l=t.querySelector("#detail-root .acceptance textarea"),w=o.acceptance||"",P=l?l.value:"";if(P===w){m=!1,N();return}a=!0,l&&(l.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"acceptance",value:P});I&&typeof I=="object"&&(o=I,m=!1,N())}catch(I){i("save acceptance failed %s %o",String(o?.id||""),I),o.acceptance=w,m=!1,N(),Q("Failed to save acceptance","error")}finally{a=!1}},lt=()=>{m=!1,N()},Ve=l=>{let w=l.currentTarget,P=B.trim().length>0;B=w.value||"";let I=B.trim().length>0;P!==I&&N()},ct=async()=>{if(!(!o||K||!B.trim())){K=!0,N();try{i("add comment to %s",String(o.id));let l=await e("add-comment",{id:o.id,text:B.trim()});Array.isArray(l)&&(o.comments=l,B="",N())}catch(l){i("add comment failed %s %o",String(o.id),l),Q("Failed to add comment","error")}finally{K=!1,N()}}},pt=l=>{l.key==="Enter"&&(l.ctrlKey||l.metaKey)&&(l.preventDefault(),ct())};function ft(l,w){let P=l==="Dependencies"?"add-dependency":"add-dependent";return _`
      <div class="props-card">
        <div>
          <div class="props-card__title">${l}</div>
        </div>
        <ul>
          ${!w||w.length===0?null:w.map(I=>{let q=I.id,me=ve(q);return _`<li
                  data-href=${me}
                  @click=${()=>r(me)}
                >
                  ${Mt(I.issue_type||"")}
                  <span class="text-truncate">${I.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${q}`}
                    @click=${Ut(q,l)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${P} />
          <button @click=${ht(w,l)}>Add</button>
        </div>
      </div>
    `}function Tt(){if(!o||a)return;let l=o.metadata||{};v=typeof l.execution_lane=="string"?l.execution_lane:"",C=typeof l.workspace_policy=="string"?l.workspace_policy:"",M=typeof l.branch_policy=="string"?l.branch_policy:"",x=typeof l.finish_action=="string"?l.finish_action:"",S=typeof l.review_profile=="string"?l.review_profile:"",g=!0,N()}function Et(){g=!1,v="",C="",M="",x="",S="",N()}async function mt(){if(!o||a)return;let l=us(v,C,M,x,S);if(!l){Q("Choose valid workflow settings","error"),N();return}a=!0,N();try{let w=await e("update-workflow-settings",{id:o.id,values:l});w&&typeof w=="object"&&!Array.isArray(w)&&(o=w),g=!1,v="",C="",M="",x="",S=""}catch(w){i("save workflow settings failed %o",w),Q("Failed to save workflow settings","error")}finally{a=!1,N()}}function Ye(l){v=l.currentTarget.value,N()}function $e(l){C=l.currentTarget.value,N()}function Le(l){M=l.currentTarget.value,N()}function De(l){x=l.currentTarget.value,N()}function Ne(l){S=l.currentTarget.value,N()}async function Ze(l){try{await navigator.clipboard.writeText(l),Q("Copied path")}catch(w){i("copy artifact path failed %o",w),Q("Failed to copy path","error")}}function Fe(){return n?.getState?.().config?.detail?.workflow_summary||null}function Oe(l){let w=String(l.kind||"value"),P=String(l.label||""),I=String(l.value||""),q=typeof l.href=="string"?l.href:"";return w==="artifact"?_`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${P}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${I}
          @click=${()=>Ze(I)}
        >
          ${I}
        </button>
      </div>`:w==="link"&&q?_`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${P}</div>
        <div class="workflow-summary__value">
          <a href=${q} target="_blank" rel="noreferrer noopener">${I}</a>
        </div>
      </div>`:_`<div
      class=${`workflow-summary__row ${w==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${P}</div>
      <div class="workflow-summary__value">${I}</div>
    </div>`}function Xe(l,w){return l&&!w.includes(l)?_`<option value=${l} selected>Invalid: ${l}</option>`:null}function Ae(l,w,P,I,q,me){return _`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${l}>${w}</label>
      <select
        id=${l}
        data-testid=${l}
        .value=${P}
        ?disabled=${a}
        @change=${q}
      >
        <option value="" ?selected=${P===""}>${me}</option>
        ${Xe(P,I)}
        ${I.map(nt=>_`<option value=${nt} ?selected=${nt===P}>
              ${nt}
            </option>`)}
      </select>
    </div>`}function Qe(l){let w=Array.isArray(l.editable_fields)?l.editable_fields:[],P=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"].every(Rt=>w.includes(Rt));if(!g)return _`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${l.rows.map(Rt=>Oe(Rt))}
        </div>
        ${P?_`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${Tt}
            >
              Edit
            </button>`:null}
      </section>`;let I=!!(C&&M&&x),q=Jt({workspace_policy:C,branch_policy:M,finish_action:x}),me=I&&q.kind!=="valid",nt=S!==""&&!nr.includes(S),Te=v!==""&&!sr.includes(v),wt=!!us(v,C,M,x,S);return _`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${Ae("workflow-settings-lane","Execution lane",v,sr,Ye,"Choose lane")}
        ${Ae("workflow-settings-workspace","Workspace",C,is,$e,"Choose workspace")}
        ${Ae("workflow-settings-branch","Branch",M,as,Le,"Choose branch")}
        ${Ae("workflow-settings-finish","Finish",x,ls,De,"Choose finish")}
        ${Ae("workflow-settings-review-profile","Review profile",S,nr,Ne,cs)}
        ${Te?_`<div class="workflow-summary__row is-invalid">
              Invalid execution lane
            </div>`:null}
        ${me?_`<div class="workflow-summary__row is-invalid">
              Invalid route combination
            </div>`:null}
        ${nt?_`<div class="workflow-summary__row is-invalid">
              Invalid review profile
            </div>`:null}
        <div class="workflow-summary__row">
          <div class="workflow-summary__label">Note</div>
          <div class="workflow-summary__value">
            Review profile affects future formal review gates and does not
            change existing review evidence.
          </div>
        </div>
      </div>
      <div class="workflow-summary__actions">
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-save"
          ?disabled=${a||!wt}
          @click=${mt}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-cancel"
          ?disabled=${a}
          @click=${Et}
        >
          Cancel
        </button>
      </div>
    </section>`}function et(l){return l.id==="workflow_settings"?Qe(l):_`<section
      class="workflow-summary__section"
      data-section=${l.id}
    >
      <div class="workflow-summary__section-title">${l.label}</div>
      <div class="workflow-summary__list">
        ${l.rows.map(w=>Oe(w))}
      </div>
    </section>`}function J(l){let w=gn(l,Fe()),P=w.length>0?_`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${w.map(W=>et(W))}
          </div>`:null,I=d?_`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${l.title||""}
              @keydown=${gt}
            />
            <button @click=${se}>Save</button>
            <button @click=${Y}>Cancel</button>
          </h2>
        </div>`:_`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${D}
              @keydown=${ee}
              >${l.title||""}</span
            >
          </h2>
        </div>`,q=_`<select
      class=${`badge-select badge--status is-${l.status||"open"}`}
      @change=${oe}
      .value=${l.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let W=String(l.status||"open");return Hr.map(ne=>_`<option value=${ne} ?selected=${W===ne}>
              ${st(ne)}
            </option>`)})()}
    </select>`,me=_`<select
      class=${`badge-select badge--priority is-p${String(typeof l.priority=="number"?l.priority:2)}`}
      @change=${ue}
      .value=${String(typeof l.priority=="number"?l.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let W=String(typeof l.priority=="number"?l.priority:2);return $t.map((ne,je)=>_`<option value=${String(je)} ?selected=${W===String(je)}>
              ${rr(je)} ${ne}
            </option>`)})()}
    </select>`,nt=p?_`<div class="description">
          <textarea
            @keydown=${le}
            .value=${l.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${xe}>Save</button>
            <button @click=${Z}>Cancel</button>
          </div>
        </div>`:_`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${pe}
          @keydown=${Ct}
        >
          ${(()=>{let W=l.description||"";return W.trim()===""?_`<div class="muted">Description</div>`:br(W)})()}
        </div>`,Te=(()=>{let W=l;return String(l.acceptance||W.acceptance_criteria||"")})(),Kt=m?_`<div class="acceptance">
          ${Te.trim().length>0?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${yt}
            .value=${Te}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ut}>Save</button>
            <button @click=${lt}>Cancel</button>
          </div>
        </div>`:_`<div class="acceptance">
          ${(()=>{let W=Te,ne=W.trim().length>0;return _`${ne?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${dt}
                @keydown=${y}
              >
                ${ne?br(W):_`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,wt=String(l.notes||""),Rt=b?_`<div class="notes">
          ${wt.trim().length>0?_`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${Je}
            .value=${wt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ye}>Save</button>
            <button @click=${Ke}>Cancel</button>
          </div>
        </div>`:_`<div class="notes">
          ${(()=>{let W=wt,ne=W.trim().length>0;return _`${ne?_`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${Ge}
                @keydown=${u}
              >
                ${ne?br(W):_`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,j=Array.isArray(l.labels)?l.labels:[],f=_`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${j.map(W=>_`<li>
              <span class="badge" title=${W}
                >${W}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+W}
                  @click=${()=>V(W)}
                  style="margin-left:6px"
                >
                  ×
                </button></span
              >
            </li>`)}
      </ul>
      <div class="props-card__footer">
        <input
          type="text"
          placeholder="Label"
          size="12"
          .value=${R}
          @input=${A}
          @keydown=${H}
        />
        <button @click=${G}>Add</button>
      </div>
    </div>`,E=String(l.design||""),U=h?_`<div class="design">
          ${E.trim().length>0?_`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${Ee}
            .value=${E}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Me}>Save</button>
            <button @click=${Ce}>Cancel</button>
          </div>
        </div>`:_`<div class="design">
          ${(()=>{let W=E,ne=W.trim().length>0;return _`${ne?_`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${we}
                @keydown=${L}
              >
                ${ne?br(W):_`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,be=Array.isArray(l.comments)?l.comments:[],Ie=_`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${be.length===0?_`<div class="muted">No comments yet</div>`:be.map(W=>_`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${W.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${wa(W.created_at)}</span
                  >
                </div>
                <div class="comment-text">${W.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${B}
          @input=${Ve}
          @keydown=${pt}
          ?disabled=${K}
        ></textarea>
        <button
          @click=${ct}
          ?disabled=${K||!B.trim()}
        >
          ${K?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return _`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${I} ${nt} ${U} ${Rt}
            ${Kt} ${Ie}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${Re}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  <span class="tooltip">Delete issue</span>
                </button>
              </div>
                <div class="prop">
                  <div class="label">Type</div>
                  <div class="value">
                    ${Mt(l.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${q}</div>
                </div>
                ${l.close_reason?_`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${l.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${me}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${k?_`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${l.assignee||""}
                              size=${Math.min(40,Math.max(12,(l.assignee||"").length+3))}
                              @keydown=${W=>{W.key==="Escape"?(W.preventDefault(),T()):W.key==="Enter"&&(W.preventDefault(),te())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${te}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${T}
                            >
                              Cancel
                            </button>`:_`${(()=>{let W=l.assignee||"",ne=W.trim().length>0;return _`<span
                              class=${ne?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${X}
                              @keydown=${ke}
                              >${ne?W:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${f}
              ${P}
              ${ft("Dependencies",l.dependencies||[])}
              ${ft("Dependents",l.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function N(){if(!o){ge(c?"Loading\u2026":"No issue selected");return}_e(J(o),t)}function Ut(l,w){return async P=>{if(P.stopPropagation(),!(!o||a)){a=!0;try{if(w==="Dependencies"){let I=await e("dep-remove",{a:o.id,b:l,view_id:o.id});I&&typeof I=="object"&&(o=I,N())}else{let I=await e("dep-remove",{a:l,b:o.id,view_id:o.id});I&&typeof I=="object"&&(o=I,N())}}catch(I){i("dep-remove failed %o",I)}finally{a=!1}}}}function ht(l,w){return async P=>{if(!o||a)return;let I=P.currentTarget,q=I.previousElementSibling,me=q?q.value.trim():"";if(!me||me===o.id){Q("Enter a different issue id");return}if(new Set((l||[]).map(Te=>Te.id)).has(me)){Q("Link already exists");return}a=!0,I&&(I.disabled=!0),q&&(q.disabled=!0);try{if(w==="Dependencies"){let Te=await e("dep-add",{a:o.id,b:me,view_id:o.id});Te&&typeof Te=="object"&&(o=Te,N())}else{let Te=await e("dep-add",{a:me,b:o.id,view_id:o.id});Te&&typeof Te=="object"&&(o=Te,N())}}catch(Te){i("dep-add failed %o",Te),Q("Failed to add dependency","error")}finally{a=!1}}}function gt(l){l.key==="Escape"?(d=!1,N()):l.key==="Enter"&&(l.preventDefault(),se())}function Ct(l){l.key==="Enter"&&pe()}function y(l){l.key==="Enter"&&dt()}function u(l){l.key==="Enter"&&Ge()}function L(l){l.key==="Enter"&&we()}return{async load(l){if(!l){ge("No issue selected");return}if(c=String(l),o=null,$(),o||ge("Loading\u2026"),a=!1,B="",K=!1,N(),o&&!o.comments)try{let w=await e("get-comments",{id:c});Array.isArray(w)&&o&&c===l&&(o.comments=w,N())}catch(w){i("fetch comments failed %s %o",l,w)}},clear(){ge("Select an issue to view details")},destroy(){F(),t.replaceChildren(),O&&O.parentNode&&(O.parentNode.removeChild(O),O=null)}}}function qr(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),c=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",d=t.show_deps??!0,p=new Set;function h(g,v,C,M=""){let x=`${g}:${v}`;return p.has(x)?_`<span>
        <input
          type="text"
          .value=${C}
          class="inline-edit"
          @keydown=${async R=>{if(R.key==="Escape")p.delete(x),s();else if(R.key==="Enter"){let K=R.currentTarget.value||"";K!==C&&await r(g,{[v]:K}),p.delete(x),s()}}}
          @blur=${async R=>{let K=R.currentTarget.value||"";K!==C&&await r(g,{[v]:K}),p.delete(x),s()}}
          autofocus
        />
      </span>`:_`<span
      class="editable text-truncate ${C?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${R=>{R.stopPropagation(),R.preventDefault(),p.add(x),s()}}
      @keydown=${R=>{R.key==="Enter"&&(R.preventDefault(),R.stopPropagation(),p.add(x),s())}}
      >${C||M}</span
    >`}function b(g,v){return async C=>{let x=C.currentTarget.value||"",S={};S[v]=v==="priority"?Number(x):x,await r(g,S)}}function m(g){return v=>{let C=v.target;C&&(C.tagName==="INPUT"||C.tagName==="SELECT")||e(g)}}function k(g){let v=String(g.status||"open"),C=String(g.priority??2),M=n()===g.id;return _`<tr
      role="row"
      class="${a} ${M?"selected":""}"
      data-issue-id=${g.id}
      @click=${m(g.id)}
    >
      <td role="gridcell" class="mono">${St(g.id)}</td>
      <td role="gridcell">${Mt(g.issue_type)}</td>
      <td role="gridcell">${h(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${$r(g.labels,i(),o()).map(x=>Ar(x,c()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${v}"
          .value=${v}
          @change=${b(g.id,"status")}
        >
          ${Hr.map(x=>_`<option value=${x} ?selected=${v===x}>
                ${st(x)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${h(g.id,"assignee",g.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+C}"
          .value=${C}
          @change=${b(g.id,"priority")}
        >
          ${$t.map((x,S)=>_`<option
                value=${String(S)}
                ?selected=${C===String(S)}
              >
                ${rr(S)} ${x}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Tr(g.created_at)}
      >
        ${g.created_at?Er(g.created_at):""}
      </td>
      ${d?_`<td role="gridcell" class="deps-col">
            ${(g.dependency_count||0)>0||(g.dependent_count||0)>0?_`<span class="deps-indicator"
                  >${(g.dependency_count||0)>0?_`<span
                        class="dep-count"
                        title="${g.dependency_count} ${(g.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${g.dependency_count}</span
                      >`:""}${(g.dependent_count||0)>0?_`<span
                        class="dependent-count"
                        title="${g.dependent_count} ${(g.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${g.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return k}function Zn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],c=new Set,a=new Set,d=new Map,p=n?vt(n):null;p&&p.subscribe(()=>{let x=o.length===0;if(o=M(),m(),x&&o.length>0){let S=String(o[0].epic?.id||"");S&&!c.has(S)&&C(S)}});function h(){let x=i?.getState?.().config?.label_display_policy,S=x?.colors;return{visible_prefixes:Array.isArray(x?.visible_prefixes)?x.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(x?.visible_exact)?x.visible_exact:[],colors:S&&typeof S=="object"?S:{prefix:{},exact:{}}}}let b=qr({navigate:x=>r(x),onUpdate:v,requestRender:m,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,getLabelColorPolicy:()=>h().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let x=JSON.stringify(h());i.subscribe(()=>{let S=JSON.stringify(h());S!==x&&(x=S,m())})}function m(){_e(k(),t)}function k(){return o.length?_`${o.map(x=>g(x))}`:_`<div class="panel__header muted">No epics found.</div>`}function g(x){let S=x.epic||{},R=String(S.id||""),B=c.has(R),K=p?p.selectEpicChildren(R):[],O=a.has(R);return _`
      <div class="epic-group" data-epic-id=${R}>
        <div
          class="epic-header"
          @click=${()=>C(R)}
          role="button"
          tabindex="0"
          aria-expanded=${B}
        >
          ${St(R,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${S.title||"(no title)"}</span
          >
          <span
            class="epic-progress"
            style="margin-left:auto; display:flex; align-items:center; gap:8px;"
          >
            <progress
              value=${Number(x.closed_children||0)}
              max=${Math.max(1,Number(x.total_children||0))}
            ></progress>
            <span class="muted mono"
              >${x.closed_children}/${x.total_children}</span
            >
          </span>
        </div>
        ${B?_`<div class="epic-children">
              ${O?_`<div class="muted">Loading…</div>`:K.length===0?_`<div class="muted">No issues found</div>`:_`<table class="table">
                      <colgroup>
                        <col style="width: 100px" />
                        <col style="width: 120px" />
                        <col />
                        <col style="width: 140px" />
                        <col style="width: 120px" />
                        <col style="width: 160px" />
                        <col style="width: 130px" />
                        <col style="width: 90px" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Type</th>
                          <th>Title</th>
                          <th>Labels</th>
                          <th>Status</th>
                          <th>Assignee</th>
                          <th>Priority</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${K.map(F=>b(F))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function v(x,S){try{await e.updateIssue({id:x,...S}),m()}catch{}}async function C(x){if(c.has(x)){if(c.delete(x),d.has(x)){try{let S=d.get(x);S&&await S()}catch{}d.delete(x);try{n&&n.unregister&&n.unregister(`detail:${x}`)}catch{}}}else{if(c.add(x),a.add(x),m(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${x}`,{type:"issue-detail",params:{id:x}})}catch{}let S=await s.subscribeList(`detail:${x}`,{type:"issue-detail",params:{id:x}});d.set(x,S)}catch{}a.delete(x)}m()}function M(){let x=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],S=[];for(let R of x){let B=Array.isArray(R.dependents)?R.dependents:[],K=Number.isFinite(R.total_children),O=Number.isFinite(R.closed_children),F=K?Number(R.total_children)||0:B.length,z=O&&Number(R.closed_children)||0;if(!O)for(let ce of B)String(ce.status||"")==="closed"&&z++;S.push({epic:R,total_children:F,closed_children:z})}return S}return{async load(){o=M(),m();try{if(o.length>0){let x=String(o[0].epic?.id||"");x&&!c.has(x)&&await C(x)}}catch{}}}}function Xn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),c=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,p,h="")=>{r&&(r.textContent=d||"Unexpected Error"),s&&(s.textContent=p||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(n&&(b.length>0?(n.textContent=b,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>c()),e.addEventListener("cancel",d=>{d.preventDefault(),c()}),{open:a,close:c,getElement(){return e}}}function Qn(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function c(m){i.replaceChildren(),i.appendChild(St(m))}s.addEventListener("mousedown",m=>{m.target===s&&(m.preventDefault(),d())}),s.addEventListener("cancel",m=>{m.preventDefault(),d()}),o.addEventListener("click",()=>d());let a=null;function d(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}b()}function p(m){try{let k=document.activeElement;k&&k instanceof HTMLElement?a=k:a=null}catch{a=null}c(m);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:p,close:h,getMount(){return n}}}var jr=["bug","feature","task","epic","chore"];function _r(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function eo(t,e,r,s,n=void 0,i=void 0){let o=he("views:list"),c=[],a="",d=[],p=[],h=s?s.getState().selected_id:null,b=null,m=!1,k=!1;function g($){return Array.isArray($)?$:typeof $=="string"&&$!==""&&$!=="all"?[$]:[]}function v($){return Array.isArray($)?$:typeof $=="string"&&$!==""?[$]:[]}function C(){let $=s?.getState?.().config?.label_display_policy,D=$?.colors;return{visible_prefixes:Array.isArray($?.visible_prefixes)?$.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray($?.visible_exact)?$.visible_exact:[],colors:D&&typeof D=="object"?D:{prefix:{},exact:{}}}}let M=qr({navigate:$=>{let D=r||(se=>window.location.hash=se),ee=s?s.getState().view:"issues";D(xt(ee,$))},onUpdate:Re,requestRender:ae,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>C().visible_prefixes,getVisibleLabelExact:()=>C().visible_exact,getLabelColorPolicy:()=>C().colors,row_class:"issue-row"}),x=async $=>{c.includes($)?c=c.filter(D=>D!==$):c=[...c,$],o("status toggle %s -> %o",$,c),s&&s.setState({filters:{status:c}}),await ve()},S=$=>{a=$.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),ae()},R=$=>{p.includes($)?p=p.filter(D=>D!==$):p=[...p,$],o("type toggle %s -> %o",$,p),s&&s.setState({filters:{type:p}}),ae()},B=$=>{$.stopPropagation(),m=!m,k=!1,ae()},K=$=>{$.stopPropagation(),k=!k,m=!1,ae()};function O($,D,ee){return $.length===0?`${D}: Any`:$.length===1?`${D}: ${ee($[0])}`:`${D} (${$.length})`}if(s){let $=s.getState();$&&$.filters&&typeof $.filters=="object"&&(c=g($.filters.status),a=$.filters.search||"",p=v($.filters.type))}let F=i?vt(i):null;function z(){if(!F)return[];let $=F.selectIssuesFor("tab:issues"),D=c.includes("resolved")&&!c.includes("ready")&&!(c.length===1&&c[0]==="resolved"),ee=c.includes("deferred")&&!(c.length===1&&c[0]==="deferred");if(!D&&!ee)return $;let se=new Map;for(let Y of $)se.set(String(Y.id),Y);if(D){let Y=F.selectIssuesFor("tab:issues:resolved");for(let X of Y)se.set(String(X.id),X)}if(ee){let Y=F.selectIssuesFor("tab:issues:deferred");for(let X of Y)se.set(String(X.id),X)}return Array.from(se.values())}function ce(){let $=d;if(c.length>0&&!c.includes("ready")&&($=$.filter(D=>c.includes(String(D.status||"")))),a){let D=a.toLowerCase();$=$.filter(ee=>{let se=String(ee.id).toLowerCase(),Y=String(ee.title||"").toLowerCase();return se.includes(D)||Y.includes(D)})}return p.length>0&&($=$.filter(D=>p.includes(String(D.issue_type||"")))),c.length===1&&c[0]==="closed"&&($=$.slice().sort(qt)),_`
      <div class="panel__header">
        <div class="filter-dropdown ${m?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${B}
          >
            ${O(c,"Status",st)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(D=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${c.includes(D)}
                    @change=${()=>x(D)}
                  />
                  ${D==="ready"?"Ready":st(D)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${k?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${K}>
            ${O(p,"Types",_r)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${jr.map(D=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${p.includes(D)}
                    @change=${()=>R(D)}
                  />
                  ${_r(D)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${S}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${$.length===0?_`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:_`<div class="issues-block">
              <table
                class="table"
                role="grid"
                aria-rowcount=${String($.length)}
                aria-colcount="9"
              >
                <colgroup>
                  <col style="width: 100px" />
                  <col style="width: 120px" />
                  <col />
                  <col style="width: 140px" />
                  <col style="width: 120px" />
                  <col style="width: 160px" />
                  <col style="width: 130px" />
                  <col style="width: 90px" />
                  <col style="width: 80px" />
                </colgroup>
                <thead>
                  <tr role="row">
                    <th role="columnheader">ID</th>
                    <th role="columnheader">Type</th>
                    <th role="columnheader">Title</th>
                    <th role="columnheader">Labels</th>
                    <th role="columnheader">Status</th>
                    <th role="columnheader">Assignee</th>
                    <th role="columnheader">Priority</th>
                    <th role="columnheader">Created</th>
                    <th role="columnheader">Deps</th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  ${$.map(D=>M(D))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function ae(){_e(ce(),t)}ae();async function Re($,D){try{o("updateInline %s %o",$,Object.keys(D)),typeof D.title=="string"&&await e("edit-text",{id:$,field:"title",value:D.title}),typeof D.assignee=="string"&&await e("update-assignee",{id:$,assignee:D.assignee}),typeof D.status=="string"&&await e("update-status",{id:$,status:D.status}),typeof D.priority=="number"&&await e("update-priority",{id:$,priority:D.priority})}catch{}}async function ve(){o("load");let $=t.querySelector("#list-root"),D=$?$.scrollTop:0;try{F?d=z():d=[]}catch(ee){o("load failed: %o",ee),d=[]}ae();try{let ee=t.querySelector("#list-root");ee&&D>0&&(ee.scrollTop=D)}catch{}}t.tabIndex=0,t.addEventListener("keydown",$=>{if($.key==="ArrowDown"||$.key==="ArrowUp"){let Y=$.target;if((Y&&typeof Y.closest=="function"?Y.closest("#list-root table.table"):null)&&!!!(Y&&typeof Y.closest=="function"&&(Y.closest("input")||Y.closest("textarea")||Y.closest("select")))){let te=Y&&typeof Y.closest=="function"?Y.closest("td"):null;if(te&&te.parentElement){let T=te.parentElement,A=T.parentElement;if(A&&A.querySelectorAll){let H=Array.from(A.querySelectorAll("tr")),G=Math.max(0,H.indexOf(T)),V=te.cellIndex||0,oe=$.key==="ArrowDown"?Math.min(G+1,H.length-1):Math.max(G-1,0),ue=H[oe],pe=ue&&ue.cells?ue.cells[V]:null;if(pe){let le=pe.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(le&&typeof le.focus=="function"){$.preventDefault(),le.focus();return}}}}}}let D=t.querySelector("#list-root tbody"),ee=D?D.querySelectorAll("tr"):[];if(ee.length===0)return;let se=0;if(h&&(se=Array.from(ee).findIndex(X=>(X.getAttribute("data-issue-id")||"")===h),se<0&&(se=0)),$.key==="ArrowDown"){$.preventDefault();let Y=ee[Math.min(se+1,ee.length-1)],X=Y?Y.getAttribute("data-issue-id"):"",ke=X||null;s&&ke&&s.setState({selected_id:ke}),h=ke,ae()}else if($.key==="ArrowUp"){$.preventDefault();let Y=ee[Math.max(se-1,0)],X=Y?Y.getAttribute("data-issue-id"):"",ke=X||null;s&&ke&&s.setState({selected_id:ke}),h=ke,ae()}else if($.key==="Enter"){$.preventDefault();let Y=ee[se],X=Y?Y.getAttribute("data-issue-id"):"";if(X){let ke=r||(T=>window.location.hash=T),te=s?s.getState().view:"issues";ke(xt(te,X))}}});let ge=$=>{let D=$.target;D&&!D.closest(".filter-dropdown")&&(m||k)&&(m=!1,k=!1,ae())};if(document.addEventListener("click",ge),s){let $=JSON.stringify(C());b=s.subscribe(D=>{if(D.selected_id!==h&&(h=D.selected_id,o("selected %s",h||"(none)"),ae()),D.filters&&typeof D.filters=="object"){let ee=g(D.filters.status),se=D.filters.search||"",Y=!1;if(JSON.stringify(ee)!==JSON.stringify(c)){c=ee,ve();return}se!==a&&(a=se,Y=!0);let ke=v(D.filters.type);JSON.stringify(ke)!==JSON.stringify(p)&&(p=ke,Y=!0);let T=JSON.stringify(C());T!==$&&($=T,Y=!0),Y&&ae()}})}return F&&F.subscribe(()=>{try{d=z(),ae()}catch{}}),{load:ve,destroy(){t.replaceChildren(),document.removeEventListener("click",ge),b&&(b(),b=null)}}}function to(t,e,r){let s=he("views:nav"),n=null;function i(a){return d=>{d.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let d=e.getState().view||"issues";return _`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${d==="issues"?"active":""}"
          @click=${i("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${d==="epics"?"active":""}"
          @click=${i("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${d==="board"?"active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${d==="worker"?"active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </nav>
    `}function c(){_e(o(),t)}return c(),n=e.subscribe(()=>c()),{destroy(){n&&(n(),n=null),_e(_``,t)}}}function ro(t,e,r,s){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),c=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),d=n.querySelector("#new-labels"),p=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),b=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),k=n.querySelector(".new-issue__close");function g(){c.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",c.appendChild(O);for(let F of jr){let z=document.createElement("option");z.value=F,z.textContent=_r(F),c.appendChild(z)}a.replaceChildren();for(let F=0;F<=4;F+=1){let z=document.createElement("option");z.value=String(F);let ce=$t[F]||"Medium";z.textContent=`${F} \u2013 ${ce}`,a.appendChild(z)}}g();function v(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(O){o.disabled=O,c.disabled=O,a.disabled=O,d.disabled=O,p.disabled=O,b.disabled=O,m.disabled=O,m.textContent=O?"Creating\u2026":"Create"}function M(){h.textContent=""}function x(O){h.textContent=O}function S(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?c.value=O:c.value="";let F=window.localStorage.getItem("beads-ui.new.priority");F&&/^\d$/.test(F)?a.value=F:a.value="2"}catch{c.value="",a.value="2"}}function R(){let O=c.value||"",F=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),F.length>0&&window.localStorage.setItem("beads-ui.new.priority",F)}function B(O){let F=/-(\d+)$/.exec(String(O||""));return F&&F[1]?Number(F[1]):-1}async function K(){M();let O=String(o.value||"").trim();if(O.length===0){x("Title is required"),o.focus();return}let F=Number(a.value||"2");if(!(F>=0&&F<=4)){x("Priority must be 0..4"),a.focus();return}let z=String(c.value||""),ce=String(p.value||""),ae=String(d.value||"").split(",").map($=>$.trim()).filter($=>$.length>0),Re={title:O};z.length>0&&(Re.type=z),String(F).length>0&&(Re.priority=F),ce.length>0&&(Re.description=ce),C(!0);try{await e("create-issue",Re)}catch{C(!1),x("Failed to create issue");return}R();let ve=null;try{ve=await e("list-issues",{filters:{status:"open",limit:50}})}catch{ve=null}let ge="";if(Array.isArray(ve)){let $=ve.filter(D=>String(D.title||"")===O);if($.length>0){let D=$[0];for(let ee of $){let se=B(D.id||"");B(ee.id||"")>se&&(D=ee)}ge=String(D.id||"")}}if(ge&&ae.length>0)for(let $ of ae)try{await e("label-add",{id:ge,label:$})}catch{}if(ge){try{r.gotoIssue(ge)}catch{}try{s&&s.setState({selected_id:ge})}catch{}}C(!1),v()}return n.addEventListener("cancel",O=>{O.preventDefault(),v()}),k.addEventListener("click",()=>v()),b.addEventListener("click",()=>v()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),K())}),i.addEventListener("submit",O=>{O.preventDefault(),K()}),{open(){i.reset(),M(),S();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){v()}}}var so={open:0,in_progress:.5,resolved:.85,closed:1},ao=new Set(["queued","starting","running","cancelling"]),no={in_progress:0,open:1,resolved:2,closed:3};function oo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function va(t){return t&&t in so?so[t]:0}function io(t){return t&&t in no?no[t]:Number.MAX_SAFE_INTEGER}function Ds(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function xa(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Sa(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function lo(t,e){return e.filter(r=>Sa(r)===t)}function $a(t,e){return lo(t,e).some(r=>typeof r.status=="string"&&ao.has(r.status))}function Wr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function Aa(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+va(s),0);return Math.round(e/t.length*100)}function Ta(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:Ds(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function Ea(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(g=>g.status!=="closed"),i=e.filter(g=>g.status==="closed").length,o=e.map(g=>String(g.status||"open")),c=Array.isArray(r.jobs)?r.jobs:[],a=lo(t.id,c),d=a.find(g=>typeof g.status=="string"&&ao.has(g.status))||null,p=d?a.filter(g=>g.id!==d.id).slice(0,3):a.slice(0,3),h=d!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),m={open:e.filter(g=>g.status==="open").length,in_progress:e.filter(g=>g.status==="in_progress").length,resolved:e.filter(g=>g.status==="resolved").length,closed:e.filter(g=>g.status==="closed").length},k=Ta(t,{is_parent:!0,has_spec_id:Ds(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:m,progress_percent:Aa(o),current_job:d,current_job_elapsed_label:Wr(d?.elapsedMs),recent_jobs:p,has_active_job:h,has_open_pr:b>0,open_pr_count:b,runnable:k}}function co(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],c=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of c)s.has(b.id)||a.push({...b,parent:i.id});let d=Array.isArray(e.jobs)?e.jobs:[],p=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||$a(i.id,d)||p>0||xa(i)&&Ds(i))&&n.push(Ea(i,a,e))}return n.sort(Ca),n}function Ca(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=io(t.status)-io(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=oo(e.updated_at??e.created_at)-oo(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function uo(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function po(t,e){return t.length===0?_`<section class="worker-pr-panel">No open PRs</section>`:_`
    <section class="worker-pr-panel">
      ${t.map(r=>_`
          <div class="worker-pr-panel__item">
            <span class="mono">#${r.number}</span>
            <span>${r.title}</span>
            <button
              type="button"
              data-run-pr-review-number=${r.number}
              @click=${()=>e.onRunPrReview(r)}
            >
              Run pr-review
            </button>
          </div>
        `)}
    </section>
  `}function fo(t){return _`
    <section class="worker-pr-summary">
      ${t.length===0?_`<div>No workspace PRs</div>`:t.map(e=>_`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function ho(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",c=!1,a="";function d(){_e(_`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${c?_`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${b}>
                      Save
                    </button>
                    <button
                      type="button"
                      data-worker-spec-cancel
                      @click=${h}
                    >
                      Cancel
                    </button>
                  </div>
                `:_`
                  <button type="button" data-worker-spec-edit @click=${p}>
                    Edit spec
                  </button>
                `}
          </header>

          ${c?_`
                <textarea
                  .value=${o}
                  @input=${m=>{o=m.currentTarget.value}}
                ></textarea>
              `:_`<pre>${i}</pre>`}
          ${a?_`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function p(){c=!0,o=i,a="",d()}function h(){c=!1,o=i,a="",d()}async function b(){let m=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let k=await r(m,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),g=await k.json();if(k.ok===!1)throw new Error(typeof g?.error=="string"&&g.error.length>0?g.error:"Failed to save spec");i=g.content||o,o=i,c=!1,a="",d()}catch(k){a=k instanceof Error&&k.message.length>0?k.message:"Failed to save spec",d()}}return{async load(m,k){s=m,n=k;let g=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(g)).json()).content||""}catch{i=""}o=i,c=!1,a="",d()},clear(){s="",n="",i="",o="",c=!1,a="",_e(_``,t)}}}function go(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],c="";async function a(d=[],p=[]){let h=s,b=h?i.filter(g=>g.issueId===h.id):[],m=b.find(g=>["queued","starting","running","cancelling"].includes(String(g.status)))||null,k=m?b.filter(g=>g.id!==m.id):b;if(_e(_`
        <section class="worker-detail">
          ${h?_`
                <header class="worker-detail__summary">
                  <h2>${h.id}</h2>
                  <p>${h.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${h.status||"open"}</span>
                    ${m?_`<span class="worker-badge worker-badge--active"
                          >${m.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!m}
                      @click=${()=>{s&&e.onRunRalph?.(s.id)}}
                    >
                      Run bd-ralph
                    </button>
                  </div>
                </header>
              `:_`<div class="worker-empty">No parent selected.</div>`}
          ${h?_`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${m?_`
                        <div class="worker-detail__job-card">
                          <div>${m.command||"worker job"}</div>
                          <div>${m.status}</div>
                          <div>${Wr(m.elapsedMs)}</div>
                          ${m.wasForceKilled?_`<div>Force killed</div>`:null}
                          ${m.isCancellable?_`
                                <button
                                  type="button"
                                  data-cancel-job=${m.id}
                                  @click=${()=>{m.id&&e.onCancelJob?.(m.id)}}
                                >
                                  Cancel
                                </button>
                              `:null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${c?_`<p>${c}</p>`:o.length>0?_`<pre>${o.join(`
`)}</pre>`:_`<p>No log output yet.</p>`}
                        </div>
                      `:_`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${k.map(g=>_`
                        <li>
                          <span>${g.status}</span>
                          <span>${Wr(g.elapsedMs)}</span>
                          ${g.errorSummary?_`<span>${g.errorSummary}</span>`:null}
                          ${g.wasForceKilled?_`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${po(d,{onRunPrReview:g=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:g.number})})}
          ${fo(p)}
        </section>
      `,t),s){let g=s,v=t.querySelector("#worker-detail-spec-host");v&&await ho(v,{fetch_impl:r}).load(g.id,n)}}return{async load(d,p,h=[]){if(s=d,n=p,i=h,o=[],c="",!d||!p){await a([],[]);return}let b={items:[]},m={items:[]};try{b=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(p)}`)).json()}catch{b={items:[]}}try{m=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(p)}`)).json()}catch{m={items:[]}}let k=i.find(g=>g.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(g.status)));if(k?.id)try{let g=await r(`/api/worker/jobs/${encodeURIComponent(k.id)}/log?workspace=${encodeURIComponent(p)}&tail=20`);if(!g.ok)throw new Error("log not ok");let v=await g.json();o=Array.isArray(v.tail)?v.tail:[]}catch{o=[],c="Failed to load log preview."}await a(Array.isArray(b.items)?b.items:[],Array.isArray(m.items)?m.items:[])},clear(){s=null,n="",i=[],o=[],c="",_e(_``,t)}}}function bo(t,e){return _`
    <section class="worker-toolbar">
      <label class="worker-toolbar__field">
        <span>Search</span>
        <input
          type="search"
          name="worker-search"
          .value=${t.search}
          @input=${r=>e.onSearchInput(r.currentTarget.value)}
        />
      </label>

      <label class="worker-toolbar__field">
        <span>Status</span>
        <select
          name="worker-status-filter"
          .value=${t.status}
          @change=${r=>e.onStatusChange(r.currentTarget.value)}
        >
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-runnable-only"
          .checked=${t.runnable_only}
          @change=${r=>e.onRunnableToggle(r.currentTarget.checked)}
        />
        <span>Runnable only</span>
      </label>

      <label class="worker-toolbar__toggle">
        <input
          type="checkbox"
          name="worker-open-pr-only"
          .checked=${t.has_open_pr_only}
          @change=${r=>e.onOpenPrToggle(r.currentTarget.checked)}
        />
        <span>Has open PR only</span>
      </label>
    </section>
  `}function _o(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return _`
    <div
      class="worker-child-row is-status-${e}"
      data-worker-child=${t.id}
    >
      <span class="worker-child-row__dot" aria-hidden="true"></span>
      <span class="worker-child-row__id mono">${t.id}</span>
      <span class="worker-child-row__title"
        >${t.title||"(no title)"}</span
      >
      <span class="worker-badge worker-badge--status is-${e}"
        >${st(t.status)}</span
      >
    </div>
  `}var Ra=new Set(["bug","feature","task","epic","chore","decision"]);function Ia(t){let e=(t||"").toString().toLowerCase();return Ra.has(e)?e:"neutral"}function La(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function yo(t,e){let r=t.current_job||null,s=La(t.status),n=Ia(t.issue_type);return _`
    <div
      class="worker-parent-row is-status-${s} ${e.selected?"is-selected":""}"
      data-worker-parent=${t.id}
    >
      <div class="worker-parent-row__header">
        <button
          type="button"
          class="worker-parent-row__expand"
          data-expand-parent=${t.id}
          @click=${e.onToggleExpand}
          aria-expanded=${e.expanded}
        >
          ${e.expanded?"\u25BE":"\u25B8"}
        </button>

        <button
          type="button"
          class="worker-parent-row__summary"
          @click=${e.onSelect}
        >
          <span class="worker-parent-row__id mono">${t.id}</span>
          <span class="worker-parent-row__title"
            >${t.title||"(no title)"}</span
          >
        </button>
      </div>

      <div class="worker-parent-row__meta">
        <span class="worker-badge worker-badge--type is-type-${n}"
          >${t.issue_type||"issue"}</span
        >
        <span class="worker-badge worker-badge--status is-${s}"
          >${st(t.status)}</span
        >
        ${t.spec_id?_`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:_`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?_`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?_`
              <span class="worker-badge worker-badge--active"
                >● ${st(r.status||"running")}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${t.current_job_elapsed_label}</span
              >
            `:t.runnable?_`<span class="worker-badge worker-badge--ready"
                >Runnable</span
              >`:null}
      </div>

      <div class="worker-parent-row__progress">
        <div class="worker-progress" data-pct=${t.progress_percent}>
          <div
            class="worker-progress__fill"
            style="width:${t.progress_percent}%"
          ></div>
        </div>
        <span class="worker-parent-row__progress-label mono"
          >${t.progress_percent}%</span
        >
      </div>

      <div class="worker-parent-row__counts">
        ${t.child_counts.open>0?_`<span class="worker-count worker-count--open"
              ><b>${t.child_counts.open}</b> open</span
            >`:null}
        ${t.child_counts.in_progress>0?_`<span class="worker-count worker-count--in-progress"
              ><b>${t.child_counts.in_progress}</b> in progress</span
            >`:null}
        ${t.child_counts.resolved>0?_`<span class="worker-count worker-count--resolved"
              ><b>${t.child_counts.resolved}</b> resolved</span
            >`:null}
        ${t.child_counts.closed>0?_`<span class="worker-count worker-count--closed"
              ><b>${t.child_counts.closed}</b> closed</span
            >`:null}
      </div>

      <div class="worker-parent-row__actions">
        <button
          type="button"
          class="worker-btn worker-btn--primary"
          data-run-ralph=${t.id}
          ?disabled=${!t.runnable}
          @click=${e.onRunRalph}
        >
          ▶ Run bd-ralph
        </button>
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          data-run-pr-review=${t.id}
          ?disabled=${!e.pr_review_enabled}
          @click=${e.onRunPrReview}
        >
          Run pr-review
        </button>
        ${r?.isCancellable?_`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                data-cancel-job=${r.id}
                @click=${()=>e.onCancelJob(r.id)}
              >
                Cancel
              </button>
            `:null}
      </div>
    </div>
  `}function mo(t,e){return t.length===0?_`<div class="worker-empty">No worker parents found.</div>`:_`
    <div class="worker-tree">
      ${t.map(r=>{let s=e.expanded_ids.has(r.id),n=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return _`
          <article class="worker-tree__item">
            ${yo(r,{expanded:s,selected:e.selected_parent_id===r.id,pr_review_enabled:n,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${s?_`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(i=>_o(i))}
                    ${r.hidden_closed_count>0?_`
                          <button
                            type="button"
                            class="worker-tree__show-closed"
                            data-show-closed=${r.id}
                            @click=${()=>e.onToggleClosed(r.id)}
                          >
                            Show closed (${r.hidden_closed_count})
                          </button>
                        `:null}
                  </div>
                `:null}
          </article>
        `})}
    </div>
  `}function wo(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(d){let p=e.store.getState(),h=Array.isArray(p.worker?.show_closed_children)?p.worker.show_closed_children:[],b=h.includes(d)?h.filter(m=>m!==d):[...h,d];e.store.setState({worker:{show_closed_children:b}})}function o(){let d=e.store.getState(),p=!!d.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],b=d.worker?.selected_parent_id||null,m=uo(co(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:p,show_closed_children:d.worker?.show_closed_children||[]}),n),k=b&&m.find(v=>v.id===b)||null;_e(_`
        <section
          class="worker-layout ${k?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${bo(n,{onSearchInput(v){n={...n,search:v},o()},onStatusChange(v){n={...n,status:v},o()},onRunnableToggle(v){n={...n,runnable_only:v},o()},onOpenPrToggle(v){n={...n,has_open_pr_only:v},o()}})}
            ${mo(m,{expanded_ids:r,selected_parent_id:b,onSelectParent(v){let C=b===v?null:v;e.store.setState({worker:{selected_parent_id:C}})},onToggleExpand(v){r.has(v)?r.delete(v):r.add(v),o()},onToggleClosed(v){i(v),o()},onRunRalph(v){e.onRunRalph?.(v)},onRunPrReview(v){e.onRunPrReview?.(v)},onCancelJob(v){e.onCancelJob?.(v)}})}
          </aside>

          ${k?_`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let g=t.querySelector("#worker-detail-mount");g?(s||(s=go(g,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(k,d.workspace?.current?.path||"",h)):s?.clear()}let c=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),_e(_``,t)},destroy(){c(),a(),s?.clear(),_e(_``,t)}}}function ko(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function vo(t,e,r,s=async()=>{},n=async()=>{}){let i=he("views:workspace-picker"),o=null,c=!1,a=!1,d=!1;async function p(C){let x=C.target.value,R=e.getState().workspace?.current?.path||"";if(x&&x!==R){i("switching workspace to %s",x),c=!0,v();try{await r(x)}catch(B){i("workspace switch failed: %o",B)}finally{c=!1,v()}}}async function h(){let C=e.getState(),M=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!M||a||d)){i("syncing workspace %s",M),a=!0,v();try{await s(M)}catch(x){i("workspace sync failed: %o",x)}finally{a=!1,v()}}}async function b(){let C=e.getState(),M=C.workspace?.current?.path||C.workspace?.available?.[0]?.path||"";if(!(!M||a||d)){i("git-pulling workspace %s",M),d=!0,v();try{await n(M)}catch(x){i("workspace git pull failed: %o",x)}finally{d=!1,v()}}}function m(C){return C?_`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${h}
        ?disabled=${c||a||d}
        aria-label="Sync current workspace"
      >
        ${a?"Syncing\u2026":"Sync"}
      </button>
    `:_``}function k(C){return C?_`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${c||a||d}
        aria-label="Git pull current workspace"
      >
        ${d?"Pulling\u2026":"Git Pull"}
      </button>
    `:_``}function g(){let C=e.getState(),M=C.workspace?.current,x=C.workspace?.available||[],S=M?.path||x[0]?.path||"";if(x.length===0)return _``;if(x.length===1){let R=ko(x[0].path);return _`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${x[0].path}"
            >${R}</span
          >
          ${m(S)} ${k(S)}
          ${a||d?_`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return _`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${c||a||d}
          aria-label="Select project workspace"
        >
          ${x.map(R=>_`
              <option
                value="${R.path}"
                ?selected=${R.path===S}
                title="${R.path}"
              >
                ${ko(R.path)}
              </option>
            `)}
        </select>
        ${m(S)} ${k(S)}
        ${c||a||d?_`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function v(){_e(g(),t)}return v(),o=e.subscribe(()=>v()),{destroy(){o&&(o(),o=null),_e(_``,t)}}}var xo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace","git-pull-workspace"];function Ns(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=Ns()){return{id:r,type:t,payload:e}}function $o(t={}){let e=he("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,c=null,a=!0,d=new Map,p=[],h=new Map,b=new Set;function m(S){for(let R of Array.from(b))try{R(S)}catch{}}function k(){if(!a||c)return;i="reconnecting",e("ws reconnecting\u2026"),m(i);let S=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),R=(r.jitterRatio||0)*S,B=Math.max(0,Math.round(S+(Math.random()*2-1)*R));e("ws retry in %d ms (attempt %d)",B,o+1),c=setTimeout(()=>{c=null,x()},B)}function g(S){try{n?.send(JSON.stringify(S))}catch(R){e("ws send failed",R)}}function v(){for(i="open",e("ws open"),m(i),o=0;p.length;){let S=p.shift();S&&g(S)}}function C(S){let R;try{R=JSON.parse(String(S.data))}catch{e("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){e("ws received invalid envelope");return}if(d.has(R.id)){let K=d.get(R.id);d.delete(R.id),R.ok?K?.resolve(R.payload):K?.reject(R.error||new Error("ws error"));return}let B=h.get(R.type);if(B&&B.size>0)for(let K of Array.from(B))try{K(R.payload)}catch(O){e("ws event handler error",O)}else e("ws received unhandled message type: %s",R.type)}function M(){i="closed",e("ws closed"),m(i);for(let[S,R]of d.entries())R.reject(new Error("ws disconnected")),d.delete(S);o+=1,k()}function x(){if(!a)return;let S=s();try{n=new WebSocket(S),e("ws connecting %s",S),i="connecting",m(i),n.addEventListener("open",v),n.addEventListener("message",C),n.addEventListener("error",()=>{}),n.addEventListener("close",M)}catch(R){e("ws connect failed %o",R),k()}}return x(),{send(S,R){if(!xo.includes(S))return Promise.reject(new Error(`unknown message type: ${S}`));let B=Ns(),K=So(S,R,B);return e("send %s id=%s",S,B),new Promise((O,F)=>{d.set(B,{resolve:O,reject:F,type:S}),n&&n.readyState===n.OPEN?g(K):(e("queue %s id=%s (state=%s)",S,B,i),p.push(K))})},on(S,R){h.has(S)||h.set(S,new Set);let B=h.get(S);return B?.add(R),()=>{B?.delete(R)}},onConnection(S){return b.add(S),()=>{b.delete(S)}},close(){a=!1,c&&(clearTimeout(c),c=null);try{n?.close()}catch{}},getState(){return i}}}var Da=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,yr={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function Ps(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Ao(t){if(!Ps(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!Ps(s)||typeof s.fg!="string"||!Da.test(s.fg)||(e[r]={fg:s.fg});return e}function Na(t){return Ps(t)?{prefix:Ao(t.prefix),exact:Ao(t.exact)}:{prefix:{},exact:{}}}function Pa(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Na(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):yr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(yr.detail))}:{label_display_policy:{visible_prefixes:yr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):yr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(yr.detail))}}async function Oa(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function Ma(t){let e=he("main");e("bootstrap start");let r=_`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;_e(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),c=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&n&&i&&o&&c&&d){let B=function(y,u){let L="Request failed",l="";if(y&&typeof y=="object"){let P=y;if(typeof P.message=="string"&&P.message.length>0&&(L=P.message),typeof P.details=="string")l=P.details;else if(P.details&&typeof P.details=="object")try{l=JSON.stringify(P.details,null,2)}catch{l=""}}else typeof y=="string"&&y.length>0&&(L=y);let w=u&&u.length>0?`Failed to load ${u}`:"Request failed";R.open(w,L,l)},Y=function(y){return`${Z.getState().workspace.current?.path||""}\0${y}`},X=function(){ae&&(ae().catch(()=>{}),ae=null),Re=null,ve=null},te=function(y){ge=y;let u=()=>{ge!==y||Z.getState().selected_id!==y||(ge=null,ke(y))};if(!ee){D.then(u);return}u()},V=function(y){if(!y)return"Unknown";let u=y.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"},ft=function(){ct&&(clearInterval(ct),ct=null)},N=function(y){let u=y?.status;return Array.isArray(u)?u.map(L=>String(L)).filter(Boolean):typeof u=="string"&&u!==""&&u!=="all"?[u]:[]},Ut=function(y){let u=N(y),[L]=u;return u.length===1&&L==="ready"?{type:"ready-issues"}:u.length===1&&L==="in_progress"?{type:"in-progress-issues"}:u.length===1&&L==="deferred"?{type:"deferred-issues"}:u.length===1&&L==="closed"?{type:"closed-issues"}:u.length===1&&L==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},gt=function(y){if(y.view==="issues"){let u=Ut(y.filters||{}),L=N(y.filters||{}),l=L.includes("resolved")&&!L.includes("ready")&&!(L.length===1&&L[0]==="resolved"),w=L.includes("deferred")&&!(L.length===1&&L[0]==="deferred"),P=JSON.stringify(u);try{z.register("tab:issues",u)}catch(q){e("register issues store failed: %o",q)}let I=`tab:issues:${P}`;if((!$e||P!==ht)&&!J.has(I)&&(J.add(I),F.subscribeList("tab:issues",u).then(q=>{$e=q,ht=P}).catch(q=>{e("subscribe issues failed: %o",q),B(q,"issues list")}).finally(()=>{J.delete(I)})),l&&!De&&!J.has("tab:issues:resolved")){try{z.register("tab:issues:resolved",{type:"resolved-issues"})}catch(q){e("register issues:resolved store failed: %o",q)}J.add("tab:issues:resolved"),F.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(q=>De=q).catch(q=>{e("subscribe issues resolved failed: %o",q),B(q,"issues list (Resolved)")}).finally(()=>{J.delete("tab:issues:resolved")})}if(w&&!Ne&&!J.has("tab:issues:deferred")){try{z.register("tab:issues:deferred",{type:"deferred-issues"})}catch(q){e("register issues:deferred store failed: %o",q)}J.add("tab:issues:deferred"),F.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(q=>Ne=q).catch(q=>{e("subscribe issues deferred failed: %o",q),B(q,"issues list (Deferred)")}).finally(()=>{J.delete("tab:issues:deferred")})}if(!l&&De){De().catch(()=>{}),De=null;try{z.unregister("tab:issues:resolved")}catch(q){e("unregister issues:resolved failed: %o",q)}}if(!w&&Ne){Ne().catch(()=>{}),Ne=null;try{z.unregister("tab:issues:deferred")}catch(q){e("unregister issues:deferred failed: %o",q)}}}else if($e){$e().catch(()=>{}),$e=null,ht=null;try{z.unregister("tab:issues")}catch(u){e("unregister issues store failed: %o",u)}if(De){De().catch(()=>{}),De=null;try{z.unregister("tab:issues:resolved")}catch(u){e("unregister issues:resolved failed: %o",u)}}if(Ne){Ne().catch(()=>{}),Ne=null;try{z.unregister("tab:issues:deferred")}catch(u){e("unregister issues:deferred failed: %o",u)}}}if(y.view==="worker"){try{z.register("tab:worker:all",{type:"all-issues"})}catch(u){e("register worker store failed: %o",u)}!Ze&&!J.has("tab:worker:all")&&(J.add("tab:worker:all"),F.subscribeList("tab:worker:all",{type:"all-issues"}).then(u=>{Ze=u}).catch(u=>{e("subscribe worker failed: %o",u),B(u,"worker")}).finally(()=>{J.delete("tab:worker:all")}))}else if(Ze){Ze().catch(()=>{}),Ze=null;try{z.unregister("tab:worker:all")}catch(u){e("unregister worker store failed: %o",u)}}if(y.view==="epics"){try{z.register("tab:epics",{type:"epics"})}catch(u){e("register epics store failed: %o",u)}!Le&&!J.has("tab:epics")&&(J.add("tab:epics"),F.subscribeList("tab:epics",{type:"epics"}).then(u=>{Le=u}).catch(u=>{e("subscribe epics failed: %o",u),B(u,"epics")}).finally(()=>{J.delete("tab:epics")}))}else if(Le){Le().catch(()=>{}),Le=null;try{z.unregister("tab:epics")}catch(u){e("unregister epics store failed: %o",u)}}if(y.view==="board"){if(!Fe&&!J.has("tab:board:ready")){try{z.register("tab:board:ready",{type:"ready-issues"})}catch(u){e("register board:ready store failed: %o",u)}J.add("tab:board:ready"),F.subscribeList("tab:board:ready",{type:"ready-issues"}).then(u=>Fe=u).catch(u=>{e("subscribe board ready failed: %o",u),B(u,"board (Ready)")}).finally(()=>{J.delete("tab:board:ready")})}if(!Oe&&!J.has("tab:board:in-progress")){try{z.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(u){e("register board:in-progress store failed: %o",u)}J.add("tab:board:in-progress"),F.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(u=>Oe=u).catch(u=>{e("subscribe board in-progress failed: %o",u),B(u,"board (In Progress)")}).finally(()=>{J.delete("tab:board:in-progress")})}if(!Xe&&!J.has("tab:board:deferred")){try{z.register("tab:board:deferred",{type:"deferred-issues"})}catch(u){e("register board:deferred store failed: %o",u)}J.add("tab:board:deferred"),F.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(u=>Xe=u).catch(u=>{e("subscribe board deferred failed: %o",u),B(u,"board (Deferred)")}).finally(()=>{J.delete("tab:board:deferred")})}if(!Ae&&!J.has("tab:board:resolved")){try{z.register("tab:board:resolved",{type:"resolved-issues"})}catch(u){e("register board:resolved store failed: %o",u)}J.add("tab:board:resolved"),F.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(u=>Ae=u).catch(u=>{e("subscribe board resolved failed: %o",u),B(u,"board (Resolved)")}).finally(()=>{J.delete("tab:board:resolved")})}if(!Qe&&!J.has("tab:board:closed")){try{z.register("tab:board:closed",{type:"closed-issues"})}catch(u){e("register board:closed store failed: %o",u)}J.add("tab:board:closed"),F.subscribeList("tab:board:closed",{type:"closed-issues"}).then(u=>Qe=u).catch(u=>{e("subscribe board closed failed: %o",u),B(u,"board (Closed)")}).finally(()=>{J.delete("tab:board:closed")})}if(!et&&!J.has("tab:board:blocked")){try{z.register("tab:board:blocked",{type:"blocked-issues"})}catch(u){e("register board:blocked store failed: %o",u)}J.add("tab:board:blocked"),F.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(u=>et=u).catch(u=>{e("subscribe board blocked failed: %o",u),B(u,"board (Blocked)")}).finally(()=>{J.delete("tab:board:blocked")})}}else{if(Fe){Fe().catch(()=>{}),Fe=null;try{z.unregister("tab:board:ready")}catch(u){e("unregister board:ready failed: %o",u)}}if(Oe){Oe().catch(()=>{}),Oe=null;try{z.unregister("tab:board:in-progress")}catch(u){e("unregister board:in-progress failed: %o",u)}}if(Xe){Xe().catch(()=>{}),Xe=null;try{z.unregister("tab:board:deferred")}catch(u){e("unregister board:deferred failed: %o",u)}}if(Ae){Ae().catch(()=>{}),Ae=null;try{z.unregister("tab:board:resolved")}catch(u){e("unregister board:resolved failed: %o",u)}}if(Qe){Qe().catch(()=>{}),Qe=null;try{z.unregister("tab:board:closed")}catch(u){e("unregister board:closed failed: %o",u)}}if(et){et().catch(()=>{}),et=null;try{z.unregister("tab:board:blocked")}catch(u){e("unregister board:blocked failed: %o",u)}}}};var p=B,h=Y,b=X,m=te,k=V,g=ft,v=N,C=Ut,M=gt;let x=document.getElementById("header-loading"),S=dn(x),R=Xn(t),K=$o(),O=S.wrapSend((y,u)=>K.send(y,u)),F=rn(O),z=sn();K.on("snapshot",y=>{let u=y,L=u&&typeof u.id=="string"?u.id:"",l=L?z.getStore(L):null;if(l&&u&&u.type==="snapshot")try{l.applyPush(u)}catch{}}),K.on("upsert",y=>{let u=y,L=u&&typeof u.id=="string"?u.id:"",l=L?z.getStore(L):null;if(l&&u&&u.type==="upsert")try{l.applyPush(u)}catch{}}),K.on("delete",y=>{let u=y,L=u&&typeof u.id=="string"?u.id:"",l=L?z.getStore(L):null;if(l&&u&&u.type==="delete")try{l.applyPush(u)}catch{}});let ce=vt(z),ae=null,Re=null,ve=null,ge=null,$=()=>{},D=new Promise(y=>{$=()=>y(void 0)}),ee=!1,se=!1;async function ke(y){let u=Y(y);if(u===Re||u===ve)return;ve=u;let L=`detail:${y}`,l={type:"issue-detail",params:{id:y}};try{z.register(L,l)}catch(w){e("register detail store failed: %o",w)}try{let w=await F.subscribeList(L,l);if(Z.getState().selected_id!==y||Y(y)!==u){await w().catch(()=>{});return}ae&&await ae().catch(()=>{}),ae=w,Re=u}catch(w){e("detail subscribe failed: %o",w),B(w,"issue details")}finally{ve===u&&(ve=null)}}async function T(){e("clearing all subscriptions for workspace switch"),$e&&($e().catch(()=>{}),$e=null),Ne&&(Ne().catch(()=>{}),Ne=null),Le&&(Le().catch(()=>{}),Le=null),Fe&&(Fe().catch(()=>{}),Fe=null),Oe&&(Oe().catch(()=>{}),Oe=null),Xe&&(Xe().catch(()=>{}),Xe=null),De&&(De().catch(()=>{}),De=null),Ze&&(Ze().catch(()=>{}),Ze=null),Ae&&(Ae().catch(()=>{}),Ae=null),Qe&&(Qe().catch(()=>{}),Qe=null),et&&(et().catch(()=>{}),et=null);let y=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let l of y)try{z.unregister(l)}catch{}X();let u=Z.getState();if(u.selected_id)try{z.unregister(`detail:${u.selected_id}`)}catch{}ht=null;let L=Z.getState();gt(L),L.selected_id&&te(L.selected_id)}async function A(y){e("requesting workspace switch to %s",y),se=!0;try{let u=await K.send("set-workspace",{path:y});e("workspace switch result: %o",u),u&&u.workspace&&(Z.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),u.changed&&(await T(),Q("Switched to "+V(y),"success",2e3)))}catch(u){throw e("workspace switch failed: %o",u),Q("Failed to switch workspace","error",3e3),u}finally{se=!1}}async function H(y){e("requesting workspace sync for %s",y);try{let u=await K.send("sync-workspace",{});if(e("workspace sync result: %o",u),u?.workspace&&Z.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),u?.pulled===!0&&u?.pushed===!1){let L=u?.push_error?`: ${u.push_error}`:"";Q(`Pulled, but push failed${L}`,"warning",4e3);return}Q("Synced "+V(y),"success",2e3)}catch(u){e("workspace sync failed: %o",u);let L=u?.code,l=u?.message;if(L==="busy"){Q("Sync skipped: another operation is running","warning",3e3);return}let w=l?`: ${l}`:"";throw Q(`Sync failed${w}`,"error",3e3),u}}async function G(y){e("requesting workspace git pull for %s",y);try{let u=await K.send("git-pull-workspace",{});e("workspace git pull result: %o",u);let L=u?.status;if(L==="up_to_date"){Q("Already up to date","success",2e3);return}if(L==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+V(y),"success",2e3)}catch(u){e("workspace git pull failed: %o",u);let L=u?.code,l=u?.message;if(L==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(L==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(L==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let w=l?`: ${l}`:"";throw Q(`Git pull failed${w}`,"error",3e3),u}}async function oe(){try{let y=await K.send("list-workspaces",{});if(e("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let u=y.workspaces.map(P=>({path:P.path,database:P.database,pid:P.pid,version:P.version})),L=y.current?{path:y.current.root_dir,database:y.current.db_path}:null;Z.setState({workspace:{current:L,available:u}});let l=Z.getState().config.workspace_config.default_workspace,w=window.localStorage.getItem("beads-ui.workspace");if(l&&L?.path===l){window.localStorage.setItem("beads-ui.workspace",l);return}w&&L&&w!==L.path&&(u.some(I=>I.path===w)?(e("restoring saved workspace preference: %s",w),await A(w)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(y){e("failed to load workspaces: %o",y)}}K.on("workspace-changed",y=>{e("workspace-changed event: %o",y),y&&y.root_dir&&(Z.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),oe(),T())});let ue=!1;if(typeof K.onConnection=="function"){let y=u=>{e("ws state %s",u),u==="reconnecting"||u==="closed"?(ue=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&ue&&(ue=!1,Q("Reconnected","success",2200),Oa(Z,(L,l)=>{e(`${L}: %o`,l)}))};K.onConnection(y)}let pe={status:"all",search:"",type:""};try{let y=window.localStorage.getItem("beads-ui.filters");if(y){let u=JSON.parse(y);if(u&&typeof u=="object"){let L=["bug","feature","task","epic","chore"],l="";if(typeof u.type=="string"&&L.includes(u.type))l=u.type;else if(Array.isArray(u.types)){let w="";for(let P of u.types)if(L.includes(String(P))){w=P;break}l=w}pe={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(u.status)?u.status:"all",search:typeof u.search=="string"?u.search:"",type:l}}}}catch(y){e("filters parse error: %o",y)}let le="issues";try{let y=window.localStorage.getItem("beads-ui.view");(y==="issues"||y==="epics"||y==="board"||y==="worker")&&(le=y)}catch(y){e("view parse error: %o",y)}let xe={closed_filter:"today",show_deferred_column:!1};try{let y=window.localStorage.getItem("beads-ui.board");if(y){let u=JSON.parse(y);if(u&&typeof u=="object"){let L=String(u.closed_filter||"today");(L==="today"||L==="3"||L==="7")&&(xe.closed_filter=L)}}}catch(y){e("board prefs parse error: %o",y)}let Z=cn({config:Pa(),filters:pe,view:le,board:xe}),we=nn(Z);we.start();let Ee=async(y,u)=>{try{return await O(y,u)}catch{return[]}};s&&to(s,Z,we);let Me=document.getElementById("workspace-picker");Me&&vo(Me,Z,A,H,G);let Ce=ro(t,(y,u)=>O(y,u),we,Z);try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>Ce.open())}catch{}let Je=eo(a,async(y,u)=>{if(y==="list-issues")try{return ce.selectIssuesFor("tab:issues")}catch(L){return e("list selectors failed: %o",L),[]}return Ee(y,u)},y=>{let u=xr(y);u&&we.gotoIssue(u)},Z,F,z);Z.subscribe(y=>{let u={status:y.filters.status,search:y.filters.search,type:typeof y.filters.type=="string"?y.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(u))}),Z.subscribe(y=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:y.board.closed_filter}))}),Je.load();let ye=Qn(d,Z,()=>{let y=Z.getState();Z.setState({selected_id:null});try{let u=y.view||"issues";we.gotoView(u)}catch{}}),Ke=null;Ke=Yn(ye.getMount(),Ee,y=>{let u=xr(y);if(u)we.gotoIssue(u);else{let L=Vt(y);we.gotoView(L)}},z,Z);let dt=Z.getState().selected_id;dt&&(d.hidden=!1,ye.open(dt),Ke&&Ke.load(dt),te(dt)),Z.subscribe(y=>{let u=y.selected_id;if(u)d.hidden=!1,ye.open(u),Ke&&Ke.load(u),se||te(u);else{try{ye.close()}catch{}Ke&&Ke.clear(),d.hidden=!0,X()}});let yt=tn(Ee),ut=Zn(i,yt,y=>we.gotoIssue(y),F,z,Z),lt=bn(o,yt,y=>we.gotoIssue(y),Z,F,z,Ee),Ve=[],ct=null;async function pt(){let y=Z.getState().workspace.current?.path;if(!y){Ve=[];return}try{let L=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(y)}`)).json();Ve=Array.isArray(L.items)?L.items:[]}catch{Ve=[]}}async function Tt(){ft(),await pt(),Ye.load(),ct=setInterval(()=>{pt().then(()=>Ye.load())},3e3)}async function Et(y,u){let L=Z.getState().workspace.current?.path;L&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:y,workspace:L,issueId:u.issueId,prNumber:u.prNumber})}),await pt(),Ye.load())}async function mt(y){let u=Z.getState().workspace.current?.path;u&&(await fetch(`/api/worker/jobs/${encodeURIComponent(y)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:u})}),await pt(),Ye.load())}let Ye=wo(c,{store:Z,issue_stores:z,fetch_impl:fetch,getWorkerJobs:()=>Ve,onRunRalph:y=>{Et("bd-ralph",{issueId:y})},onRunPrReview:y=>{Et("pr-review",{issueId:typeof y=="string"?y:y?.issueId??void 0,prNumber:typeof y=="object"&&typeof y?.prNumber=="number"?y.prNumber:void 0})},onCancelJob:y=>{mt(y)}}),$e=null,Le=null,De=null,Ne=null,Ze=null,Fe=null,Oe=null,Xe=null,Ae=null,Qe=null,et=null,J=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(J),getActivityCount:()=>S.getCount(),getActiveRequests:()=>S.getActiveRequests()};let ht=null,Ct=y=>{n&&i&&o&&c&&d&&(n.hidden=y.view!=="issues",i.hidden=y.view!=="epics",o.hidden=y.view!=="board",c.hidden=y.view!=="worker"),gt(y),!y.selected_id&&y.view==="epics"&&ut.load(),!y.selected_id&&y.view==="board"&&lt.load(),y.view==="worker"?(Tt(),Ye.load()):ft(),window.localStorage.setItem("beads-ui.view",y.view)};Z.subscribe(Ct),Ct(Z.getState()),oe().finally(()=>{ee=!0,$()}),window.addEventListener("keydown",y=>{let u=y.ctrlKey||y.metaKey,L=String(y.key||"").toLowerCase(),l=y.target,w=l&&l.tagName?String(l.tagName).toLowerCase():"",P=w==="input"||w==="textarea"||w==="select"||l&&typeof l.isContentEditable=="boolean"&&l.isContentEditable;u&&L==="n"&&(P||(y.preventDefault(),Ce.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ma(e)});export{Ma as bootstrap,Pa as readBootstrapConfig,Oa as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
