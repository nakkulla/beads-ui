var Co=Object.create;var Jr=Object.defineProperty;var Ro=Object.getOwnPropertyDescriptor;var Io=Object.getOwnPropertyNames;var Lo=Object.getPrototypeOf,Do=Object.prototype.hasOwnProperty;var No=(t,e,r)=>e in t?Jr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Kr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Po=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Io(e))!Do.call(t,n)&&n!==r&&Jr(t,n,{get:()=>e[n],enumerable:!(s=Ro(e,n))||s.enumerable});return t};var Oo=(t,e,r)=>(r=t!=null?Co(Lo(t)):{},Po(e||!t||!t.__esModule?Jr(r,"default",{value:t,enumerable:!0}):r,t));var he=(t,e,r)=>No(t,typeof e!="symbol"?e+"":e,r);var Xs=Kr((Ja,Zs)=>{var Wt=1e3,Gt=Wt*60,Vt=Gt*60,Mt=Vt*24,zo=Mt*7,Ho=Mt*365.25;Zs.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return qo(t);if(r==="number"&&isFinite(t))return e.long?Wo(t):jo(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function qo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Ho;case"weeks":case"week":case"w":return r*zo;case"days":case"day":case"d":return r*Mt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Vt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Gt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Wt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function jo(t){var e=Math.abs(t);return e>=Mt?Math.round(t/Mt)+"d":e>=Vt?Math.round(t/Vt)+"h":e>=Gt?Math.round(t/Gt)+"m":e>=Wt?Math.round(t/Wt)+"s":t+"ms"}function Wo(t){var e=Math.abs(t);return e>=Mt?vr(t,e,Mt,"day"):e>=Vt?vr(t,e,Vt,"hour"):e>=Gt?vr(t,e,Gt,"minute"):e>=Wt?vr(t,e,Wt,"second"):t+" ms"}function vr(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var en=Kr((Ka,Qs)=>{function Go(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=l,r.humanize=Xs(),r.destroy=d,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let b=0;b<p.length;b++)h=(h<<5)-h+p.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,b=null,m,w;function g(...k){if(!g.enabled)return;let R=g,F=Number(new Date),v=F-(h||F);R.diff=v,R.prev=h,R.curr=F,h=F,k[0]=r.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let x=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(q,j)=>{if(q==="%%")return"%";x++;let M=r.formatters[j];if(typeof M=="function"){let O=k[x];q=M.call(R,O),k.splice(x,1),x--}return q}),r.formatArgs.call(R,k),(R.log||r.log).apply(R,k)}return g.namespace=p,g.useColors=r.useColors(),g.color=r.selectColor(p),g.extend=s,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(m!==r.namespaces&&(m=r.namespaces,w=r.enabled(p)),w),set:k=>{b=k}}),typeof r.init=="function"&&r.init(g),g}function s(p,h){let b=r(this.namespace+(typeof h>"u"?":":h)+p);return b.log=this.log,b}function n(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(p,h){let b=0,m=0,w=-1,g=0;for(;b<p.length;)if(m<h.length&&(h[m]===p[b]||h[m]==="*"))h[m]==="*"?(w=m,g=b,m++):(b++,m++);else if(w!==-1)m=w+1,g++,b=g;else return!1;for(;m<h.length&&h[m]==="*";)m++;return m===h.length}function o(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function l(p){for(let h of r.skips)if(i(p,h))return!1;for(let h of r.names)if(i(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Qs.exports=Go});var tn=Kr((Ke,xr)=>{Ke.formatArgs=Jo;Ke.save=Ko;Ke.load=Yo;Ke.useColors=Vo;Ke.storage=Zo();Ke.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();Ke.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Vo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Jo(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+xr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}Ke.log=console.debug||console.log||(()=>{});function Ko(t){try{t?Ke.storage.setItem("debug",t):Ke.storage.removeItem("debug")}catch{}}function Yo(){let t;try{t=Ke.storage.getItem("debug")||Ke.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Zo(){try{return localStorage}catch{}}xr.exports=en()(Ke);var{formatters:Xo}=xr.exports;Xo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Xt=globalThis,kr=Xt.trustedTypes,Bs=kr?kr.createPolicy("lit-html",{createHTML:t=>t}):void 0,Gs="$lit$",$t=`lit$${Math.random().toFixed(9).slice(2)}$`,Vs="?"+$t,Mo=`<${Vs}>`,Pt=document,Qt=()=>Pt.createComment(""),er=t=>t===null||typeof t!="object"&&typeof t!="function",rs=Array.isArray,Fo=t=>rs(t)||typeof t?.[Symbol.iterator]=="function",Yr=`[ 	
\f\r]`,Zt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,zs=/-->/g,Hs=/>/g,Dt=RegExp(`>|${Yr}(?:([^\\s"'>=/]+)(${Yr}*=${Yr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),qs=/'/g,js=/"/g,Js=/^(?:script|style|textarea|title)$/i,ss=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),_=ss(1),Ha=ss(2),qa=ss(3),Ot=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),Ws=new WeakMap,Nt=Pt.createTreeWalker(Pt,129);function Ks(t,e){if(!rs(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bs!==void 0?Bs.createHTML(e):e}var Uo=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=Zt;for(let l=0;l<r;l++){let a=t[l],d,p,h=-1,b=0;for(;b<a.length&&(o.lastIndex=b,p=o.exec(a),p!==null);)b=o.lastIndex,o===Zt?p[1]==="!--"?o=zs:p[1]!==void 0?o=Hs:p[2]!==void 0?(Js.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=Dt):p[3]!==void 0&&(o=Dt):o===Dt?p[0]===">"?(o=n??Zt,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?Dt:p[3]==='"'?js:qs):o===js||o===qs?o=Dt:o===zs||o===Hs?o=Zt:(o=Dt,n=void 0);let m=o===Dt&&t[l+1].startsWith("/>")?" ":"";i+=o===Zt?a+Mo:h>=0?(s.push(d),a.slice(0,h)+Gs+a.slice(h)+$t+m):a+$t+(h===-2?l:m)}return[Ks(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},tr=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[d,p]=Uo(e,r);if(this.el=t.createElement(d,s),Nt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=Nt.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(Gs)){let b=p[o++],m=n.getAttribute(h).split($t),w=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:w[2],strings:m,ctor:w[1]==="."?Xr:w[1]==="?"?Qr:w[1]==="@"?es:qt}),n.removeAttribute(h)}else h.startsWith($t)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Js.test(n.tagName)){let h=n.textContent.split($t),b=h.length-1;if(b>0){n.textContent=kr?kr.emptyScript:"";for(let m=0;m<b;m++)n.append(h[m],Qt()),Nt.nextNode(),a.push({type:2,index:++i});n.append(h[b],Qt())}}}else if(n.nodeType===8)if(n.data===Vs)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf($t,h+1))!==-1;)a.push({type:7,index:i}),h+=$t.length-1}i++}}static createElement(e,r){let s=Pt.createElement("template");return s.innerHTML=e,s}};function Ht(t,e,r=t,s){if(e===Ot)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=er(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=Ht(t,n._$AS(t,e.values),n,s)),e}var Zr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??Pt).importNode(r,!0);Nt.currentNode=n;let i=Nt.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new rr(i,i.nextSibling,this,e):a.type===1?d=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(d=new ts(i,this,e)),this._$AV.push(d),a=s[++l]}o!==a?.index&&(i=Nt.nextNode(),o++)}return Nt.currentNode=Pt,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},rr=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Ht(this,e,r),er(e)?e===$e||e==null||e===""?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==Ot&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Fo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==$e&&er(this._$AH)?this._$AA.nextSibling.data=e:this.T(Pt.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=tr.createElement(Ks(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Zr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=Ws.get(e.strings);return r===void 0&&Ws.set(e.strings,r=new tr(e)),r}k(e){rs(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Qt()),this.O(Qt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},qt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=$e}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=Ht(this,e,r,0),o=!er(e)||e!==this._$AH&&e!==Ot,o&&(this._$AH=e);else{let l=e,a,d;for(e=i[0],a=0;a<i.length-1;a++)d=Ht(this,l[s+a],r,a),d===Ot&&(d=this._$AH[a]),o||(o=!er(d)||d!==this._$AH[a]),d===$e?e=$e:e!==$e&&(e+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!n&&this.j(e)}j(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Xr=class extends qt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===$e?void 0:e}},Qr=class extends qt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==$e)}},es=class extends qt{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Ht(this,e,r,0)??$e)===Ot)return;let s=this._$AH,n=e===$e&&s!==$e||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==$e&&(s===$e||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ts=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Ht(this,e)}};var Bo=Xt.litHtmlPolyfillSupport;Bo?.(tr,rr),(Xt.litHtmlVersions??(Xt.litHtmlVersions=[])).push("3.3.1");var _e=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new rr(e.insertBefore(Qt(),i),i,void 0,r??{})}return n._$AI(t),n};function Ys(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function ot(t,e){let r=Ys(t.created_at),s=Ys(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function jt(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function Tt(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(ot)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(ot):o==="closed"?l.sort(jt):l.sort(ot),l}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(d=>String(d?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(ot)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var rn=Oo(tn(),1);function ge(t){return(0,rn.default)(`beads-ui:${t}`)}function sn(t){let e=ge("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function ns(t,e={}){let r=ge(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,l=!1,a=e.sort||ot;function d(){for(let b of Array.from(o))try{b()}catch{}}function p(){n=Array.from(s.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let m=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,m),!(m<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(m<=i)return;s.clear();let w=Array.isArray(b.issues)?b.issues:[];for(let g of w)g&&typeof g.id=="string"&&g.id.length>0&&s.set(g.id,g);p(),i=m,d();return}if(b.type==="upsert"){let w=b.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let g=s.get(w.id);if(!g)s.set(w.id,w);else{let k=Number.isFinite(g.updated_at)?g.updated_at:0,R=Number.isFinite(w.updated_at)?w.updated_at:0;if(k<=R){for(let F of Object.keys(g))F in w||delete g[F];for(let[F,v]of Object.entries(w))g[F]=v}}p()}i=m,d()}else if(b.type==="delete"){let w=String(b.issue_id||"");w&&(s.delete(w),p()),i=m,d()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(b){return s.get(b)},dispose(){l=!0,s.clear(),n=[],o.clear(),i=0}}}function Sr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function nn(t){let e=ge("subs"),r=new Map,s=new Map;function n(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=s.get(l);if(!d||d.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let m of Array.from(d)){let w=r.get(m);if(!w)continue;let g=w.itemsById;for(let k of p)typeof k=="string"&&k.length>0&&g.set(k,!0);for(let k of h)typeof k=="string"&&k.length>0&&g.set(k,!0);for(let k of b)typeof k=="string"&&k.length>0&&g.delete(k)}}async function i(l,a){let d=Sr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==d){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key)),r.set(l,{key:d,itemsById:new Map})}}s.has(d)||s.set(d,new Set);let p=s.get(d);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let m=s.get(b.key);m&&(m.delete(l),m.size===0&&s.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:Sr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let p of a.itemsById.keys())d[p]=!0;return d}}}}function on(){let t=ge("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,d,p){let h=d?Sr(d):"",b=r.get(a)||"",m=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),m&&b&&h&&b!==h){let w=e.get(a);if(w)try{w.dispose()}catch{}let g=n.get(a);if(g){try{g()}catch{}n.delete(a)}let k=ns(a,p);e.set(a,k);let R=k.subscribe(()=>i());n.set(a,R)}else if(!m){let w=ns(a,p);e.set(a,w);let g=w.subscribe(()=>i());n.set(a,g)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let p=n.get(a);if(p){try{p()}catch{}n.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function Et(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function Ar(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let l=new URLSearchParams(n).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Jt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function an(t){let e=ge("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let l=decodeURIComponent(n[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=Ar(s),o=Jt(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=Et(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?Et(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var $r=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),Qo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function ln(t){return JSON.parse(JSON.stringify(t))}function os(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function cn(t){if(!os(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!os(s)||typeof s.fg!="string"||!Qo.test(s.fg)||(e[r]={fg:s.fg});return e}function ei(t){return os(t)?{prefix:cn(t.prefix),exact:cn(t.exact)}:{prefix:{},exact:{}}}function dn(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=ei(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?ln(t.detail):ln($r.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}:{label_display_policy:{visible_prefixes:$r.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):$r.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}}function un(t={}){let e=ge("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:dn(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?dn(i.config):r.config},l=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((d,p)=>d!==r.config.label_display_policy.visible_prefixes[p])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((d,p)=>d!==r.config.label_display_policy.visible_exact[p])||JSON.stringify(o.config.label_display_policy.colors)!==JSON.stringify(r.config.label_display_policy.colors)||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((d,p)=>d===r.worker.show_closed_children[p])&&!l&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function pn(t){let e=ge("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),i()}function a(d){return async(h,b)=>{let m=n++,w=Date.now();s.set(m,{type:h,start_ts:w}),e("request start id=%d type=%s count=%d",m,h,r+1),o();let g=!1,k=()=>{g||(g=!0,s.delete(m),l())},R=setTimeout(()=>{g||(e("request TIMEOUT id=%d type=%s elapsed=%dms",m,h,Date.now()-w),k())},3e4);try{let F=await d(h,b),v=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",m,h,v),F}catch(F){let v=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",m,h,v,F),F}finally{clearTimeout(R),k()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(s.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:d-h.start_ts}))}}}function Q(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="warning"?s.style.background="#a36a00":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function Ct(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=s.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}var ti=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function Tr(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function hn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function fn(t){return!hn(t)||typeof t.fg!="string"?null:ti.test(t.fg)?t.fg:null}function ri(t,e){let r=fn(e?.exact?.[t]);if(r)return r;let s=e?.prefix;if(!hn(s))return null;let n="",i=null;for(let[o,l]of Object.entries(s)){let a=fn(l);a&&t.startsWith(o)&&o.length>n.length&&(n=o,i=a)}return i}function Er(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let s=null;t.startsWith("has:")?s="has":t.startsWith("reviewed:")?s="reviewed":t==="pr"&&(s="pr"),s&&r.classList.add(`label-badge--${s}`);let n=ri(t,e);return n&&r.style.setProperty("--label-badge-fg",n),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var Rt=["Critical","High","Medium","Low","Backlog"];function gn(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=si(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=sr(e)+" "+s,r}function si(t){let e=Math.max(0,Math.min(4,t));return Rt[e]||"Medium"}function sr(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function bn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Cr(t){let e=bn(t);return e===null?"":new Date(e).toISOString()}function Rr(t,e){let r=bn(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(n/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Ft(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var nr=["quick_edit","spec_backed","plan"],as=["current","worktree"],ls=["same","feature"],cs=["direct","pr"],or=["light","standard","deep"],ds="Default (standard)",ir=["codex","claude"],us="Default (config)",ni=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],oi={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},is={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",review_runtime:"Review runtime",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},ii=["spec","plan","impl"];function Be(t){return typeof t!="string"?"":t.trim()}function Lr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):Be(t)}function ps(t){let e=Be(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Kt(t){let e=Be(t.workspace_policy),r=Be(t.branch_policy),s=Be(t.finish_action),n=!!(e||r||s);for(let i of ni)if(e===i.workspace_policy&&r===i.branch_policy&&s===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function ai(t){let e=Be(t.review_profile);return e?or.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:ds}}function li(t){let e=Be(t.review_runtime);return e?ir.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review runtime"}:{kind:"default",value:null,label:us}}function fs(t,e,r,s,n,i){let o=Be(t),l=Be(e),a=Be(r),d=Be(s),p=n===null?"":Be(n),h=i===null?"":Be(i);return!nr.includes(o)||Kt({workspace_policy:l,branch_policy:a,finish_action:d}).kind!=="valid"||p&&!or.includes(p)||h&&!ir.includes(h)?null:{execution_lane:o,workspace_policy:l,branch_policy:a,finish_action:d,review_profile:p||null,review_runtime:h||null}}function yt(t,e,r={}){return{id:t,label:r.label||is[t]||t,value:Lr(e),kind:r.kind||"value",href:r.href}}function ci(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function di(t,e,r,s,n){switch(t){case"workflow_settings":return ui(e,s);case"artifacts":return pi(e,r,s);case"review_gates":return fi(e,s,n);case"delivery":return gi(e,s);case"freshness":case"followup":case"human":return bi(e,s);default:return[]}}function Ir(t,e,r,s=!1){return r.includes(e)&&!s?yt(t,e):e?yt(t,e,{kind:"invalid"}):null}function ui(t,e){let r=[],n=Kt(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=Ir(i,Be(e.execution_lane),nr);o&&r.push(o);continue}if(i==="workspace_policy"){let o=Ir(i,Be(e.workspace_policy),as,n);o&&r.push(o);continue}if(i==="branch_policy"){let o=Ir(i,Be(e.branch_policy),ls,n);o&&r.push(o);continue}if(i==="finish_action"){let o=Ir(i,Be(e.finish_action),cs,n);o&&r.push(o);continue}if(i==="review_profile"){let o=ai(e);r.push(yt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}));continue}if(i==="review_runtime"){let o=li(e);r.push(yt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function pi(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Lr(n[i]);o&&s.push(yt(i,o,{kind:"artifact"}))}return s}function fi(t,e,r){let s=[];for(let n of ii)for(let i of t){let o=hi(n,i,e,r);o&&s.push(o)}return s}function hi(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let p=`reviewed:${t}`;return s.includes(p)?yt(`${t}_${e}`,p,{label:`${t} ${is[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],d=a?Lr(r[a]):"";return d?yt(`${t}_${e}`,d,{label:`${t} ${is[e]||e}`}):null}function gi(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=ps(e.pr_url);n&&r.push(yt(s,"PR",{kind:"link",href:n.href}))}return r}function bi(t,e){let r=[];for(let s of t){let n=Lr(e[s]);n&&r.push(yt(s,n))}return r}function _n(t,e){let r=ci(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],d=di(o,l,t,r,s);d.length>0&&i.push({id:o,label:oi[o]||o,rows:d,editable_fields:a})}return i}var _i={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},yi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function yn(t,e,r,s,n=void 0,i=void 0,o=void 0){let l=ge("views:board"),a=[],d=[],p=[],h=[],b=[],m=[],w=[],g=i?Tt(i):null;function k(T){return String(T.status||"open")==="open"}let R="today",F=!1;if(s)try{let T=s.getState(),$=T&&T.board?String(T.board.closed_filter||"today"):"today";($==="today"||$==="3"||$==="7")&&(R=$),F=T?.board?.show_deferred_column===!0}catch{}function v(){let T=s?.getState?.().config?.label_display_policy,$=T?.visible_prefixes,H=T?.visible_exact,V=T?.colors;return{visible_prefixes:Array.isArray($)?$:["has:","reviewed:"],visible_exact:Array.isArray(H)?H:[],colors:V&&typeof V=="object"?V:{prefix:{},exact:{}}}}function x(T){return Array.isArray(T.labels)?T.labels.filter($=>$!=="pr"):[]}function E(T){let $=T.metadata||{},H=[],V=$.execution_lane||"",W=_i[V];W&&H.push({kind:"lane",text:W});let ie=Kt($);return ie.kind==="valid"&&H.push({kind:"route",text:ie.label}),ps($.pr_url)&&H.push({kind:"delivery",text:"PR"}),H}function q(){let T=b.length;return _`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${F?"is-active":""}"
            type="button"
            aria-pressed=${F?"true":"false"}
            @click=${X}
          >
            Deferred (${T})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${F?6:5}`}
        >
          ${j("Blocked","blocked-col",d)}
          ${j("Ready","ready-col",a)}
          ${j("In Progress","in-progress-col",p)}
          ${F?j("Deferred","deferred-col",b):""}
          ${j("Resolved","resolved-col",h)}
          ${j("Closed","closed-col",m)}
        </div>
      </div>
    `}function j(T,$,H){let V=Array.isArray(H)?H.length:0,W=V===1?"1 issue":`${V} issues`;return _`
      <section class="board-column" id=${$}>
        <header
          class="board-column__header"
          id=${$+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${T}</span>
            <span class="badge board-column__count" aria-label=${W}>
              ${V}
            </span>
          </div>
          ${$==="closed-col"?_`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${K}
                >
                  <option
                    value="today"
                    ?selected=${R==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${R==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${R==="7"}>
                    Last 7 days
                  </option>
                </select>
              </label>`:""}
        </header>
        <div
          class="board-column__body"
          role="list"
          aria-labelledby=${$+"-header"}
        >
          ${H.map(ie=>M(ie))}
        </div>
      </section>
    `}function M(T){let $=v(),H=E(T),V=Tr(x(T),$.visible_prefixes,$.visible_exact);return _`
      <article
        class="board-card"
        data-issue-id=${T.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${W=>B(W,T.id)}
        @dragstart=${W=>de(W,T.id)}
        @dragend=${ce}
      >
        <div class="board-card__title text-truncate">
          ${T.title||"(no title)"}
        </div>
        ${H.length>0?_`<div class="board-card__workflow">
              ${H.map(W=>_`<span class="workflow-chip workflow-chip--${W.kind}"
                    >${W.text}</span
                  >`)}
            </div>`:""}
        ${V.length>0?_`<div class="board-card__labels">
              ${V.map(W=>Er(W,$.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Ft(T.issue_type)} ${gn(T.priority)}
          ${Ct(T.id,{class_name:"mono"})}
          ${T.created_at?_`<span
                class="board-card__date"
                title=${Cr(T.created_at)}
                >${Rr(T.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let O=null;function B(T,$){O||r($)}function de(T,$){O=$,T.dataTransfer&&(T.dataTransfer.setData("text/plain",$),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging"),l("dragstart %s",$)}function ce(T){T.target.classList.remove("board-card--dragging"),Le(),setTimeout(()=>{O=null},0),l("dragend")}function Le(){let T=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let $ of T)$.classList.remove("board-column--drag-over")}async function Se(T,$){if(!o){l("no transport available, status update skipped"),Q("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",T,$),await o("update-status",{id:T,status:$}),Q("Status updated","success",1500)}catch(H){l("update-status failed: %o",H),Q("Failed to update status","error")}}function we(){_e(q(),t),S()}function S(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let $ of T){let H=$.querySelector(".board-column__body");if(!H)continue;let V=Array.from(H.querySelectorAll(".board-card")),W=$.querySelector(".board-column__header"),ie=W&&W.textContent?.trim()||"";for(let pe of V){let be=pe.querySelector(".board-card__title"),ae=be&&be.textContent?.trim()||"";pe.setAttribute("aria-label",`Issue ${ae||"(no title)"} \u2014 Column ${ie}`),pe.tabIndex=-1}V.length>0&&(V[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",T=>{let $=T.target;if(!$||!($ instanceof HTMLElement))return;let H=String($.tagName||"").toLowerCase();if(H==="input"||H==="textarea"||H==="select"||$.isContentEditable===!0)return;let V=$.closest(".board-card");if(!V)return;let W=String(T.key||"");if(W==="Enter"||W===" "){T.preventDefault();let Ae=V.getAttribute("data-issue-id");Ae&&r(Ae);return}if(W!=="ArrowUp"&&W!=="ArrowDown"&&W!=="ArrowLeft"&&W!=="ArrowRight")return;T.preventDefault();let ie=V.closest(".board-column");if(!ie)return;let pe=ie.querySelector(".board-column__body");if(!pe)return;let be=Array.from(pe.querySelectorAll(".board-card")),ae=be.indexOf(V);if(ae!==-1){if(W==="ArrowDown"&&ae<be.length-1){ee(be[ae],be[ae+1]);return}if(W==="ArrowUp"&&ae>0){ee(be[ae],be[ae-1]);return}if(W==="ArrowRight"||W==="ArrowLeft"){let Ae=Array.from(t.querySelectorAll(".board-column")),Y=Ae.indexOf(ie);if(Y===-1)return;let ve=W==="ArrowRight"?1:-1,Te=Y+ve,He=null;for(;Te>=0&&Te<Ae.length;){let Re=Ae[Te],Xe=Re.querySelector(".board-column__body");if((Xe?Array.from(Xe.querySelectorAll(".board-card")):[]).length>0){He=Re;break}Te+=ve}if(He){let Re=He.querySelector(".board-column__body .board-card");Re&&ee(V,Re)}return}}});let L=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let H=T.target.closest(".board-column");H&&H!==L&&(L&&L.classList.remove("board-column--drag-over"),H.classList.add("board-column--drag-over"),L=H)}),t.addEventListener("dragleave",T=>{let $=T.relatedTarget;(!$||!t.contains($))&&L&&(L.classList.remove("board-column--drag-over"),L=null)}),t.addEventListener("drop",T=>{T.preventDefault(),L&&(L.classList.remove("board-column--drag-over"),L=null);let H=T.target.closest(".board-column");if(!H)return;let V=H.id,W=yi[V];if(!W){l("drop on unknown column: %s",V);return}let ie=T.dataTransfer?.getData("text/plain");if(!ie){l("drop without issue id");return}l("drop %s on %s \u2192 %s",ie,V,W),Se(ie,W)});function ee(T,$){try{T.tabIndex=-1,$.tabIndex=0,$.focus()}catch{}}function oe(){l("applyClosedFilter %s",R);let T=Array.isArray(w)?[...w]:[],$=new Date,H=0;R==="today"?H=new Date($.getFullYear(),$.getMonth(),$.getDate(),0,0,0,0).getTime():R==="3"?H=$.getTime()-4320*60*1e3:R==="7"&&(H=$.getTime()-10080*60*1e3),T=T.filter(V=>{let W=Number.isFinite(V.closed_at)?V.closed_at:NaN;return Number.isFinite(W)?W>=H:!1}),T.sort(jt),m=T}function K(T){try{let $=T.target,H=String($.value||"today");if(R=H==="3"||H==="7"?H:"today",l("closed filter %s",R),s)try{s.setState({board:{closed_filter:R}})}catch{}oe(),we()}catch{}}function X(){if(F=!F,s)try{s.setState({board:{show_deferred_column:F}})}catch{}we()}function ke(){try{if(g){let T=g.selectBoardColumn("tab:board:in-progress","in_progress"),$=g.selectBoardColumn("tab:board:blocked","blocked"),H=g.selectBoardColumn("tab:board:ready","ready"),V=g.selectBoardColumn("tab:board:closed","closed"),W=g.selectBoardColumn("tab:board:deferred","deferred"),ie=g.selectBoardColumn("tab:board:resolved","resolved"),pe=new Set(T.map(ae=>ae.id));a=H.filter(ae=>k(ae)&&!pe.has(ae.id)),d=$.filter(ae=>k(ae)),p=T,b=W,h=ie,w=V}oe(),we()}catch{a=[],d=[],p=[],h=[],m=[],we()}}g&&g.subscribe(()=>{try{ke()}catch{}});let te=null;if(s?.subscribe){let T=JSON.stringify(v());te=s.subscribe(()=>{let $=JSON.stringify(v());$!==T&&(T=$,we())})}return{async load(){l("load"),ke();try{let T=!!(n&&n.selectors),$=ie=>{if(!T||!n)return 0;let pe=n.selectors;if(typeof pe.count=="function")return Number(pe.count(ie)||0);try{let be=pe.getIds(ie);return Array.isArray(be)?be.length:0}catch{return 0}},H=$("tab:board:ready")+$("tab:board:blocked")+$("tab:board:in-progress")+$("tab:board:deferred")+$("tab:board:resolved")+$("tab:board:closed"),V=e,W=V&&typeof V.getReady=="function"&&typeof V.getBlocked=="function"&&typeof V.getInProgress=="function"&&typeof V.getClosed=="function";if(H===0&&W){l("fallback fetch");let[ie,pe,be,ae,Ae]=await Promise.all([V.getReady().catch(()=>[]),V.getBlocked().catch(()=>[]),V.getInProgress().catch(()=>[]),(V.getResolved?.()??Promise.resolve([])).catch(()=>[]),V.getClosed().catch(()=>[])]),Y=Array.isArray(ie)?ie.map(ye=>ye):[],ve=Array.isArray(pe)?pe.map(ye=>ye):[],Te=Array.isArray(be)?be.map(ye=>ye):[],He=Array.isArray(ae)?ae.map(ye=>ye):[],Re=Array.isArray(Ae)?Ae.map(ye=>ye):[],Xe=new Set(Te.map(ye=>ye.id));Y=Y.filter(ye=>k(ye)&&!Xe.has(ye.id)),Y.sort(ot);let Ye=ve.filter(ye=>k(ye));Ye.sort(ot),Te.sort(ot),He.sort(ot),a=Y,d=Ye,p=Te,h=He,w=Re,oe(),we()}}catch{}},clear(){te&&(te(),te=null),t.replaceChildren(),a=[],d=[],p=[],h=[],m=[]}}}var{entries:Tn,setPrototypeOf:mn,isFrozen:mi,getPrototypeOf:wi,getOwnPropertyDescriptor:ki}=Object,{freeze:Ge,seal:it,create:ws}=Object,{apply:ks,construct:vs}=typeof Reflect<"u"&&Reflect;Ge||(Ge=function(e){return e});it||(it=function(e){return e});ks||(ks=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});vs||(vs=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var Dr=Ve(Array.prototype.forEach),vi=Ve(Array.prototype.lastIndexOf),wn=Ve(Array.prototype.pop),ar=Ve(Array.prototype.push),xi=Ve(Array.prototype.splice),Pr=Ve(String.prototype.toLowerCase),hs=Ve(String.prototype.toString),gs=Ve(String.prototype.match),lr=Ve(String.prototype.replace),Si=Ve(String.prototype.indexOf),Ai=Ve(String.prototype.trim),ct=Ve(Object.prototype.hasOwnProperty),We=Ve(RegExp.prototype.test),cr=$i(TypeError);function Ve(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ks(t,e,s)}}function $i(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return vs(t,r)}}function re(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Pr;mn&&mn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(mi(e)||(e[s]=i),n=i)}t[n]=!0}return t}function Ti(t){for(let e=0;e<t.length;e++)ct(t,e)||(t[e]=null);return t}function mt(t){let e=ws(null);for(let[r,s]of Tn(t))ct(t,r)&&(Array.isArray(s)?e[r]=Ti(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=mt(s):e[r]=s);return e}function dr(t,e){for(;t!==null;){let s=ki(t,e);if(s){if(s.get)return Ve(s.get);if(typeof s.value=="function")return Ve(s.value)}t=wi(t)}function r(){return null}return r}var kn=Ge(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),bs=Ge(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),_s=Ge(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ei=Ge(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ys=Ge(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Ci=Ge(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),vn=Ge(["#text"]),xn=Ge(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ms=Ge(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Sn=Ge(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Nr=Ge(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ri=it(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ii=it(/<%[\w\W]*|[\w\W]*%>/gm),Li=it(/\$\{[\w\W]*/gm),Di=it(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ni=it(/^aria-[\-\w]+$/),En=it(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pi=it(/^(?:\w+script|data):/i),Oi=it(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Cn=it(/^html$/i),Mi=it(/^[a-z][.\w]*(-[.\w]+)+$/i),An=Object.freeze({__proto__:null,ARIA_ATTR:Ni,ATTR_WHITESPACE:Oi,CUSTOM_ELEMENT:Mi,DATA_ATTR:Di,DOCTYPE_NAME:Cn,ERB_EXPR:Ii,IS_ALLOWED_URI:En,IS_SCRIPT_OR_DATA:Pi,MUSTACHE_EXPR:Ri,TMPLIT_EXPR:Li}),ur={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Fi=function(){return typeof window>"u"?null:window},Ui=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},$n=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Rn(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Fi(),e=z=>Rn(z);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==ur.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:d,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:m}=t,w=a.prototype,g=dr(w,"cloneNode"),k=dr(w,"remove"),R=dr(w,"nextSibling"),F=dr(w,"childNodes"),v=dr(w,"parentNode");if(typeof o=="function"){let z=r.createElement("template");z.content&&z.content.ownerDocument&&(r=z.content.ownerDocument)}let x,E="",{implementation:q,createNodeIterator:j,createDocumentFragment:M,getElementsByTagName:O}=r,{importNode:B}=s,de=$n();e.isSupported=typeof Tn=="function"&&typeof v=="function"&&q&&q.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ce,ERB_EXPR:Le,TMPLIT_EXPR:Se,DATA_ATTR:we,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:L,ATTR_WHITESPACE:ee,CUSTOM_ELEMENT:oe}=An,{IS_ALLOWED_URI:K}=An,X=null,ke=re({},[...kn,...bs,..._s,...ys,...vn]),te=null,T=re({},[...xn,...ms,...Sn,...Nr]),$=Object.seal(ws(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),H=null,V=null,W=Object.seal(ws(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ie=!0,pe=!0,be=!1,ae=!0,Ae=!1,Y=!0,ve=!1,Te=!1,He=!1,Re=!1,Xe=!1,Ye=!1,ye=!0,Qe=!1,kt="user-content-",ht=!0,gt=!1,pt={},Ze=null,bt=re({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ft=null,vt=re({},["audio","video","img","source","image","track"]),xt=null,It=re({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),St="http://www.w3.org/1998/Math/MathML",et="http://www.w3.org/2000/svg",Ee="http://www.w3.org/1999/xhtml",Pe=Ee,Oe=!1,Me=null,tt=re({},[St,et,Ee],hs),qe=re({},["mi","mo","mn","ms","mtext"]),je=re({},["annotation-xml"]),rt=re({},["title","style","font","a","script"]),Fe=null,st=["application/xhtml+xml","text/html"],Ue="text/html",G=null,nt=null,zt=r.createElement("form"),N=function(f){return f instanceof RegExp||f instanceof Function},_t=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(nt&&nt===f)){if((!f||typeof f!="object")&&(f={}),f=mt(f),Fe=st.indexOf(f.PARSER_MEDIA_TYPE)===-1?Ue:f.PARSER_MEDIA_TYPE,G=Fe==="application/xhtml+xml"?hs:Pr,X=ct(f,"ALLOWED_TAGS")?re({},f.ALLOWED_TAGS,G):ke,te=ct(f,"ALLOWED_ATTR")?re({},f.ALLOWED_ATTR,G):T,Me=ct(f,"ALLOWED_NAMESPACES")?re({},f.ALLOWED_NAMESPACES,hs):tt,xt=ct(f,"ADD_URI_SAFE_ATTR")?re(mt(It),f.ADD_URI_SAFE_ATTR,G):It,ft=ct(f,"ADD_DATA_URI_TAGS")?re(mt(vt),f.ADD_DATA_URI_TAGS,G):vt,Ze=ct(f,"FORBID_CONTENTS")?re({},f.FORBID_CONTENTS,G):bt,H=ct(f,"FORBID_TAGS")?re({},f.FORBID_TAGS,G):mt({}),V=ct(f,"FORBID_ATTR")?re({},f.FORBID_ATTR,G):mt({}),pt=ct(f,"USE_PROFILES")?f.USE_PROFILES:!1,ie=f.ALLOW_ARIA_ATTR!==!1,pe=f.ALLOW_DATA_ATTR!==!1,be=f.ALLOW_UNKNOWN_PROTOCOLS||!1,ae=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Ae=f.SAFE_FOR_TEMPLATES||!1,Y=f.SAFE_FOR_XML!==!1,ve=f.WHOLE_DOCUMENT||!1,Re=f.RETURN_DOM||!1,Xe=f.RETURN_DOM_FRAGMENT||!1,Ye=f.RETURN_TRUSTED_TYPE||!1,He=f.FORCE_BODY||!1,ye=f.SANITIZE_DOM!==!1,Qe=f.SANITIZE_NAMED_PROPS||!1,ht=f.KEEP_CONTENT!==!1,gt=f.IN_PLACE||!1,K=f.ALLOWED_URI_REGEXP||En,Pe=f.NAMESPACE||Ee,qe=f.MATHML_TEXT_INTEGRATION_POINTS||qe,je=f.HTML_INTEGRATION_POINTS||je,$=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&N(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&($.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&N(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&($.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&($.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ae&&(pe=!1),Xe&&(Re=!0),pt&&(X=re({},vn),te=[],pt.html===!0&&(re(X,kn),re(te,xn)),pt.svg===!0&&(re(X,bs),re(te,ms),re(te,Nr)),pt.svgFilters===!0&&(re(X,_s),re(te,ms),re(te,Nr)),pt.mathMl===!0&&(re(X,ys),re(te,Sn),re(te,Nr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?W.tagCheck=f.ADD_TAGS:(X===ke&&(X=mt(X)),re(X,f.ADD_TAGS,G))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?W.attributeCheck=f.ADD_ATTR:(te===T&&(te=mt(te)),re(te,f.ADD_ATTR,G))),f.ADD_URI_SAFE_ATTR&&re(xt,f.ADD_URI_SAFE_ATTR,G),f.FORBID_CONTENTS&&(Ze===bt&&(Ze=mt(Ze)),re(Ze,f.FORBID_CONTENTS,G)),ht&&(X["#text"]=!0),ve&&re(X,["html","head","body"]),X.table&&(re(X,["tbody"]),delete H.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw cr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw cr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=f.TRUSTED_TYPES_POLICY,E=x.createHTML("")}else x===void 0&&(x=Ui(m,n)),x!==null&&typeof E=="string"&&(E=x.createHTML(""));Ge&&Ge(f),nt=f}},Lt=re({},[...bs,..._s,...Ei]),y=re({},[...ys,...Ci]),u=function(f){let C=v(f);(!C||!C.tagName)&&(C={namespaceURI:Pe,tagName:"template"});let U=Pr(f.tagName),fe=Pr(C.tagName);return Me[f.namespaceURI]?f.namespaceURI===et?C.namespaceURI===Ee?U==="svg":C.namespaceURI===St?U==="svg"&&(fe==="annotation-xml"||qe[fe]):!!Lt[U]:f.namespaceURI===St?C.namespaceURI===Ee?U==="math":C.namespaceURI===et?U==="math"&&je[fe]:!!y[U]:f.namespaceURI===Ee?C.namespaceURI===et&&!je[fe]||C.namespaceURI===St&&!qe[fe]?!1:!y[U]&&(rt[U]||!Lt[U]):!!(Fe==="application/xhtml+xml"&&Me[f.namespaceURI]):!1},D=function(f){ar(e.removed,{element:f});try{v(f).removeChild(f)}catch{k(f)}},J=function(f,C){try{ar(e.removed,{attribute:C.getAttributeNode(f),from:C})}catch{ar(e.removed,{attribute:null,from:C})}if(C.removeAttribute(f),f==="is")if(Re||Xe)try{D(C)}catch{}else try{C.setAttribute(f,"")}catch{}},se=function(f){let C=null,U=null;if(He)f="<remove></remove>"+f;else{let xe=gs(f,/^[\r\n\t ]+/);U=xe&&xe[0]}Fe==="application/xhtml+xml"&&Pe===Ee&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let fe=x?x.createHTML(f):f;if(Pe===Ee)try{C=new b().parseFromString(fe,Fe)}catch{}if(!C||!C.documentElement){C=q.createDocument(Pe,"template",null);try{C.documentElement.innerHTML=Oe?E:fe}catch{}}let De=C.body||C.documentElement;return f&&U&&De.insertBefore(r.createTextNode(U),De.childNodes[0]||null),Pe===Ee?O.call(C,ve?"html":"body")[0]:ve?C.documentElement:De},c=function(f){return j.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},A=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof p)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},P=function(f){return typeof l=="function"&&f instanceof l};function I(z,f,C){Dr(z,U=>{U.call(e,f,C,nt)})}let ne=function(f){let C=null;if(I(de.beforeSanitizeElements,f,null),A(f))return D(f),!0;let U=G(f.nodeName);if(I(de.uponSanitizeElement,f,{tagName:U,allowedTags:X}),Y&&f.hasChildNodes()&&!P(f.firstElementChild)&&We(/<[/\w!]/g,f.innerHTML)&&We(/<[/\w!]/g,f.textContent)||f.nodeType===ur.progressingInstruction||Y&&f.nodeType===ur.comment&&We(/<[/\w]/g,f.data))return D(f),!0;if(!(W.tagCheck instanceof Function&&W.tagCheck(U))&&(!X[U]||H[U])){if(!H[U]&&lt(U)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,U)||$.tagNameCheck instanceof Function&&$.tagNameCheck(U)))return!1;if(ht&&!Ze[U]){let fe=v(f)||f.parentNode,De=F(f)||f.childNodes;if(De&&fe){let xe=De.length;for(let ze=xe-1;ze>=0;--ze){let Z=g(De[ze],!0);Z.__removalCount=(f.__removalCount||0)+1,fe.insertBefore(Z,R(f))}}}return D(f),!0}return f instanceof a&&!u(f)||(U==="noscript"||U==="noembed"||U==="noframes")&&We(/<\/no(script|embed|frames)/i,f.innerHTML)?(D(f),!0):(Ae&&f.nodeType===ur.text&&(C=f.textContent,Dr([ce,Le,Se],fe=>{C=lr(C,fe," ")}),f.textContent!==C&&(ar(e.removed,{element:f.cloneNode()}),f.textContent=C)),I(de.afterSanitizeElements,f,null),!1)},Ie=function(f,C,U){if(ye&&(C==="id"||C==="name")&&(U in r||U in zt))return!1;if(!(pe&&!V[C]&&We(we,C))){if(!(ie&&We(S,C))){if(!(W.attributeCheck instanceof Function&&W.attributeCheck(C,f))){if(!te[C]||V[C]){if(!(lt(f)&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,f)||$.tagNameCheck instanceof Function&&$.tagNameCheck(f))&&($.attributeNameCheck instanceof RegExp&&We($.attributeNameCheck,C)||$.attributeNameCheck instanceof Function&&$.attributeNameCheck(C,f))||C==="is"&&$.allowCustomizedBuiltInElements&&($.tagNameCheck instanceof RegExp&&We($.tagNameCheck,U)||$.tagNameCheck instanceof Function&&$.tagNameCheck(U))))return!1}else if(!xt[C]){if(!We(K,lr(U,ee,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&f!=="script"&&Si(U,"data:")===0&&ft[f])){if(!(be&&!We(L,lr(U,ee,"")))){if(U)return!1}}}}}}}return!0},lt=function(f){return f!=="annotation-xml"&&gs(f,oe)},Ce=function(f){I(de.beforeSanitizeAttributes,f,null);let{attributes:C}=f;if(!C||A(f))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0},fe=C.length;for(;fe--;){let De=C[fe],{name:xe,namespaceURI:ze,value:Z}=De,me=G(xe),At=Z,Ne=xe==="value"?At:Ai(At);if(U.attrName=me,U.attrValue=Ne,U.keepAttr=!0,U.forceKeepAttr=void 0,I(de.uponSanitizeAttribute,f,U),Ne=U.attrValue,Qe&&(me==="id"||me==="name")&&(J(xe,f),Ne=kt+Ne),Y&&We(/((--!?|])>)|<\/(style|title|textarea)/i,Ne)){J(xe,f);continue}if(me==="attributename"&&gs(Ne,"href")){J(xe,f);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){J(xe,f);continue}if(!ae&&We(/\/>/i,Ne)){J(xe,f);continue}Ae&&Dr([ce,Le,Se],Us=>{Ne=lr(Ne,Us," ")});let Fs=G(f.nodeName);if(!Ie(Fs,me,Ne)){J(xe,f);continue}if(x&&typeof m=="object"&&typeof m.getAttributeType=="function"&&!ze)switch(m.getAttributeType(Fs,me)){case"TrustedHTML":{Ne=x.createHTML(Ne);break}case"TrustedScriptURL":{Ne=x.createScriptURL(Ne);break}}if(Ne!==At)try{ze?f.setAttributeNS(ze,xe,Ne):f.setAttribute(xe,Ne),A(f)?D(f):wn(e.removed)}catch{J(xe,f)}}I(de.afterSanitizeAttributes,f,null)},Yt=function z(f){let C=null,U=c(f);for(I(de.beforeSanitizeShadowDOM,f,null);C=U.nextNode();)I(de.uponSanitizeShadowNode,C,null),ne(C),Ce(C),C.content instanceof i&&z(C.content);I(de.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(z){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,U=null,fe=null,De=null;if(Oe=!z,Oe&&(z="<!-->"),typeof z!="string"&&!P(z))if(typeof z.toString=="function"){if(z=z.toString(),typeof z!="string")throw cr("dirty is not a string, aborting")}else throw cr("toString is not a function");if(!e.isSupported)return z;if(Te||_t(f),e.removed=[],typeof z=="string"&&(gt=!1),gt){if(z.nodeName){let Z=G(z.nodeName);if(!X[Z]||H[Z])throw cr("root node is forbidden and cannot be sanitized in-place")}}else if(z instanceof l)C=se("<!---->"),U=C.ownerDocument.importNode(z,!0),U.nodeType===ur.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?C=U:C.appendChild(U);else{if(!Re&&!Ae&&!ve&&z.indexOf("<")===-1)return x&&Ye?x.createHTML(z):z;if(C=se(z),!C)return Re?null:Ye?E:""}C&&He&&D(C.firstChild);let xe=c(gt?z:C);for(;fe=xe.nextNode();)ne(fe),Ce(fe),fe.content instanceof i&&Yt(fe.content);if(gt)return z;if(Re){if(Xe)for(De=M.call(C.ownerDocument);C.firstChild;)De.appendChild(C.firstChild);else De=C;return(te.shadowroot||te.shadowrootmode)&&(De=B.call(s,De,!0)),De}let ze=ve?C.outerHTML:C.innerHTML;return ve&&X["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&We(Cn,C.ownerDocument.doctype.name)&&(ze="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+ze),Ae&&Dr([ce,Le,Se],Z=>{ze=lr(ze,Z," ")}),x&&Ye?x.createHTML(ze):ze},e.setConfig=function(){let z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};_t(z),Te=!0},e.clearConfig=function(){nt=null,Te=!1},e.isValidAttribute=function(z,f,C){nt||_t({});let U=G(z),fe=G(f);return Ie(U,fe,C)},e.addHook=function(z,f){typeof f=="function"&&ar(de[z],f)},e.removeHook=function(z,f){if(f!==void 0){let C=vi(de[z],f);return C===-1?void 0:xi(de[z],C,1)[0]}return wn(de[z])},e.removeHooks=function(z){de[z]=[]},e.removeAllHooks=function(){de=$n()},e}var In=Rn();var Ln={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Dn=t=>(...e)=>({_$litDirective$:t,values:e}),Or=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var pr=class extends Or{constructor(e){if(super(e),this.it=$e,e.type!==Ln.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===$e||e==null)return this._t=void 0,this.it=e;if(e===Ot)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};pr.directiveName="unsafeHTML",pr.resultType=1;var Nn=Dn(pr);function $s(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Bt=$s();function zn(t){Bt=t}var br={exec:()=>null};function le(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Je.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var Bi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Je={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},zi=/^(?:[ \t]*(?:\n|$))+/,Hi=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,qi=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,_r=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ji=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ts=/(?:[*+-]|\d{1,9}[.)])/,Hn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,qn=le(Hn).replace(/bull/g,Ts).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Wi=le(Hn).replace(/bull/g,Ts).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Es=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Gi=/^[^\n]+/,Cs=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Vi=le(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Cs).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ji=le(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Ts).getRegex(),Hr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Rs=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ki=le("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Rs).replace("tag",Hr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),jn=le(Es).replace("hr",_r).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex(),Yi=le(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",jn).getRegex(),Is={blockquote:Yi,code:Hi,def:Vi,fences:qi,heading:ji,hr:_r,html:Ki,lheading:qn,list:Ji,newline:zi,paragraph:jn,table:br,text:Gi},Pn=le("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",_r).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex(),Zi={...Is,lheading:Wi,table:Pn,paragraph:le(Es).replace("hr",_r).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Pn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Hr).getRegex()},Xi={...Is,html:le(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Rs).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:br,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:le(Es).replace("hr",_r).replace("heading",` *#{1,6} *[^
]`).replace("lheading",qn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ea=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Wn=/^( {2,}|\\)\n(?!\s*$)/,ta=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qr=/[\p{P}\p{S}]/u,Ls=/[\s\p{P}\p{S}]/u,Gn=/[^\s\p{P}\p{S}]/u,ra=le(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ls).getRegex(),Vn=/(?!~)[\p{P}\p{S}]/u,sa=/(?!~)[\s\p{P}\p{S}]/u,na=/(?:[^\s\p{P}\p{S}]|~)/u,oa=le(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Bi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Jn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ia=le(Jn,"u").replace(/punct/g,qr).getRegex(),aa=le(Jn,"u").replace(/punct/g,Vn).getRegex(),Kn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",la=le(Kn,"gu").replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Ls).replace(/punct/g,qr).getRegex(),ca=le(Kn,"gu").replace(/notPunctSpace/g,na).replace(/punctSpace/g,sa).replace(/punct/g,Vn).getRegex(),da=le("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Ls).replace(/punct/g,qr).getRegex(),ua=le(/\\(punct)/,"gu").replace(/punct/g,qr).getRegex(),pa=le(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),fa=le(Rs).replace("(?:-->|$)","-->").getRegex(),ha=le("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",fa).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ur=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,ga=le(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Ur).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Yn=le(/^!?\[(label)\]\[(ref)\]/).replace("label",Ur).replace("ref",Cs).getRegex(),Zn=le(/^!?\[(ref)\](?:\[\])?/).replace("ref",Cs).getRegex(),ba=le("reflink|nolink(?!\\()","g").replace("reflink",Yn).replace("nolink",Zn).getRegex(),On=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ds={_backpedal:br,anyPunctuation:ua,autolink:pa,blockSkip:oa,br:Wn,code:ea,del:br,emStrongLDelim:ia,emStrongRDelimAst:la,emStrongRDelimUnd:da,escape:Qi,link:ga,nolink:Zn,punctuation:ra,reflink:Yn,reflinkSearch:ba,tag:ha,text:ta,url:br},_a={...Ds,link:le(/^!?\[(label)\]\((.*?)\)/).replace("label",Ur).getRegex(),reflink:le(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ur).getRegex()},xs={...Ds,emStrongRDelimAst:ca,emStrongLDelim:aa,url:le(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",On).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:le(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",On).getRegex()},ya={...xs,br:le(Wn).replace("{2,}","*").getRegex(),text:le(xs.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Mr={normal:Is,gfm:Zi,pedantic:Xi},fr={normal:Ds,gfm:xs,breaks:ya,pedantic:_a},ma={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Mn=t=>ma[t];function wt(t,e){if(e){if(Je.escapeTest.test(t))return t.replace(Je.escapeReplace,Mn)}else if(Je.escapeTestNoEncode.test(t))return t.replace(Je.escapeReplaceNoEncode,Mn);return t}function Fn(t){try{t=encodeURI(t).replace(Je.percentDecode,"%")}catch{return null}return t}function Un(t,e){let r=t.replace(Je.findPipe,(i,o,l)=>{let a=!1,d=o;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),s=r.split(Je.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(Je.slashPipe,"|");return s}function hr(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function wa(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Bn(t,e,r,s,n){let i=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,a}function ka(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Br=class{constructor(t){he(this,"options");he(this,"rules");he(this,"lexer");this.options=t||Bt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:hr(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=ka(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=hr(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:hr(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=hr(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),p=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,n=n?`${n}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=h,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let m=b,w=m.raw+`
`+r.join(`
`),g=this.blockquote(w);i[i.length-1]=g,s=s.substring(0,s.length-m.raw.length)+g.raw,n=n.substring(0,n.length-m.text.length)+g.text;break}else if(b?.type==="list"){let m=b,w=m.raw+`
`+r.join(`
`),g=this.list(w);i[i.length-1]=g,s=s.substring(0,s.length-b.raw.length)+g.raw,n=n.substring(0,n.length-m.raw.length)+g.raw,r=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,d="",p="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=t.split(`
`,1)[0],m=!h.trim(),w=0;if(this.options.pedantic?(w=2,p=h.trimStart()):m?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,p=h.slice(w),w+=e[1].length),m&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let g=this.rules.other.nextBulletRegex(w),k=this.rules.other.hrRegex(w),R=this.rules.other.fencesBeginRegex(w),F=this.rules.other.headingBeginRegex(w),v=this.rules.other.htmlBeginRegex(w);for(;t;){let x=t.split(`
`,1)[0],E;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),E=b):E=b.replace(this.rules.other.tabCharGlobal,"    "),R.test(b)||F.test(b)||v.test(b)||g.test(b)||k.test(b))break;if(E.search(this.rules.other.nonSpaceChar)>=w||!b.trim())p+=`
`+E.slice(w);else{if(m||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||R.test(h)||F.test(h)||k.test(h))break;p+=`
`+b}!m&&!b.trim()&&(m=!0),d+=x+`
`,t=t.substring(x.length+1),h=E.slice(w)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0)),n.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),n.raw+=d}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=p.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!n.loose){let d=a.tokens.filter(h=>h.type==="space"),p=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=p}}if(n.loose)for(let a of n.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Un(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Un(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=hr(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=wa(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Bn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Bn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,l=n,a=0,d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+n);(s=d.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let p=[...s[0]][0].length,h=t.slice(0,n+s.index+p+o);if(Math.min(n,o)%2){let m=h.slice(1,-1);return{type:"em",raw:h,text:m,tokens:this.lexer.inlineTokens(m)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},dt=class Ss{constructor(e){he(this,"tokens");he(this,"options");he(this,"state");he(this,"inlineQueue");he(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Bt,this.options.tokenizer=this.options.tokenizer||new Br,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Je,block:Mr.normal,inline:fr.normal};this.options.pedantic?(r.block=Mr.pedantic,r.inline=fr.pedantic):this.options.gfm&&(r.block=Mr.gfm,this.options.breaks?r.inline=fr.breaks:r.inline=fr.gfm),this.tokenizer.rules=r}static get rules(){return{block:Mr,inline:fr}}static lex(e,r){return new Ss(r).lex(e)}static lexInline(e,r){return new Ss(r).inlineTokens(e)}lex(e){e=e.replace(Je.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(Je.tabCharGlobal,"    ").replace(Je.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=r.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},r.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),r.push(n);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(d=>{a=d.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let o=r.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n),s=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(m=>{b=m.call({lexer:this},h),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(d=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},zr=class{constructor(t){he(this,"options");he(this,"parser");this.options=t||Bt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(Je.notSpaceStart)?.[0],n=t.replace(Je.endingNewline,"")+`
`;return s?'<pre><code class="language-'+wt(s)+'">'+(r?n:wt(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:wt(n,!0))+`</code></pre>
`}blockquote({tokens:t}){return`<blockquote>
${this.parser.parse(t)}</blockquote>
`}html({text:t}){return t}def(t){return""}heading({tokens:t,depth:e}){return`<h${e}>${this.parser.parseInline(t)}</h${e}>
`}hr(t){return`<hr>
`}list(t){let e=t.ordered,r=t.start,s="";for(let o=0;o<t.items.length;o++){let l=t.items[o];s+=this.listitem(l)}let n=e?"ol":"ul",i=e&&r!==1?' start="'+r+'"':"";return"<"+n+i+`>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${wt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=Fn(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+wt(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=Fn(t);if(n===null)return wt(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${wt(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:wt(t.text)}},Ns=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ut=class As{constructor(e){he(this,"options");he(this,"renderer");he(this,"textRenderer");this.options=e||Bt,this.options.renderer=this.options.renderer||new zr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ns}static parse(e,r){return new As(r).parse(e)}static parseInline(e,r){return new As(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Fr,gr=(Fr=class{constructor(t){he(this,"options");he(this,"block");this.options=t||Bt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?dt.lex:dt.lexInline}provideParser(){return this.block?ut.parse:ut.parseInline}},he(Fr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),he(Fr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Fr),va=class{constructor(...t){he(this,"defaults",$s());he(this,"options",this.setOptions);he(this,"parse",this.parseMarkdown(!0));he(this,"parseInline",this.parseMarkdown(!1));he(this,"Parser",ut);he(this,"Renderer",zr);he(this,"TextRenderer",Ns);he(this,"Lexer",dt);he(this,"Tokenizer",Br);he(this,"Hooks",gr);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new zr(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=n[o];n[o]=(...d)=>{let p=l.apply(n,d);return p===!1&&(p=a.apply(n,d)),p||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Br(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=n[o];n[o]=(...d)=>{let p=l.apply(n,d);return p===!1&&(p=a.apply(n,d)),p}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new gr;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=n[o];gr.passThroughHooks.has(i)?n[o]=d=>{if(this.defaults.async&&gr.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await l.call(n,d);return a.call(n,h)})();let p=l.call(n,d);return a.call(n,p)}:n[o]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(n,d);return h===!1&&(h=await a.apply(n,d)),h})();let p=l.apply(n,d);return p===!1&&(p=a.apply(n,d)),p}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return dt.lex(t,e??this.defaults)}parser(t,e){return ut.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():t?dt.lex:dt.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let d=await(n.hooks?await n.hooks.provideParser():t?ut.parse:ut.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(d):d})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?dt.lex:dt.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():t?ut.parse:ut.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+wt(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Ut=new va;function ue(t,e){return Ut.parse(t,e)}ue.options=ue.setOptions=function(t){return Ut.setOptions(t),ue.defaults=Ut.defaults,zn(ue.defaults),ue};ue.getDefaults=$s;ue.defaults=Bt;ue.use=function(...t){return Ut.use(...t),ue.defaults=Ut.defaults,zn(ue.defaults),ue};ue.walkTokens=function(t,e){return Ut.walkTokens(t,e)};ue.parseInline=Ut.parseInline;ue.Parser=ut;ue.parser=ut.parse;ue.Renderer=zr;ue.TextRenderer=Ns;ue.Lexer=dt;ue.lexer=dt.lex;ue.Tokenizer=Br;ue.Hooks=gr;ue.parse=ue;var Hl=ue.options,ql=ue.setOptions,jl=ue.use,Wl=ue.walkTokens,Gl=ue.parseInline;var Vl=ut.parse,Jl=dt.lex;function yr(t){let e=ue.parse(t),r=In.sanitize(e);return Nn(r)}var jr=["open","in_progress","deferred","resolved","closed"];function at(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function xa(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function Sa(t){window.location.hash=t}function Xn(t,e,r=Sa,s=void 0,n=void 0){let i=ge("views:detail"),o=null,l=null,a=!1,d=!1,p=!1,h=!1,b=!1,m=!1,w=!1,g=!1,k="",R="",F="",v="",x="",E="",q="",j="",M=!1,O=null,B=()=>{};function de(){return O||(O=document.createElement("dialog"),O.id="delete-confirm-dialog",O.setAttribute("role","alertdialog"),O.setAttribute("aria-modal","true"),document.body.appendChild(O),O)}function ce(){if(!o)return;let c=de(),A=o.id,P=o.title||"(no title)";c.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${A}</strong> \u2014 <strong>${P}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let I=c.querySelector("#delete-cancel-btn"),ne=c.querySelector("#delete-confirm-btn");if(I?.addEventListener("click",()=>{typeof c.close=="function"&&c.close(),c.removeAttribute("open")}),ne?.addEventListener("click",async()=>{typeof c.close=="function"&&c.close(),c.removeAttribute("open"),await Le()}),c.addEventListener("cancel",Ie=>{Ie.preventDefault(),typeof c.close=="function"&&c.close(),c.removeAttribute("open")}),typeof c.showModal=="function")try{c.showModal(),c.setAttribute("open","")}catch{c.setAttribute("open","")}else c.setAttribute("open","")}async function Le(){if(!o)return;let c=o.id;try{await e("delete-issue",{id:c}),o=null,l=null,N();let A=Jt(window.location.hash||"");r(`#/${A}`)}catch(A){i("delete failed: %o",A),Q("Failed to delete issue","error")}}function Se(c){c.stopPropagation(),c.preventDefault(),ce()}function we(c){let A=Jt(window.location.hash||"");return Et(A==="worker"?"issues":A,c)}function S(c){_e(_`
        <div class="panel__body" id="detail-root">
          <p class="muted">${c}</p>
        </div>
      `,t)}function L(){if(!l||!s||typeof s.snapshotFor!="function")return;let c=s.snapshotFor(`detail:${l}`);Array.isArray(c)&&c.length>0&&(o=c.find(P=>String(P.id)===String(l))||c[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{L(),N()}catch(c){i("issue stores listener error %o",c)}}),n&&typeof n.subscribe=="function"&&(B=n.subscribe(()=>{try{N()}catch(c){i("store listener error %o",c)}}));let ee=()=>{d=!0,N()},oe=c=>{c.key==="Enter"?(d=!0,N()):c.key==="Escape"&&(d=!1,N())},K=async()=>{if(!o||a)return;let c=t.querySelector("h2 input"),A=o.title||"",P=c?c.value:"";if(P===A){d=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),P);let I=await e("edit-text",{id:o.id,field:"title",value:P});I&&typeof I=="object"&&(o=I,d=!1,N())}catch(I){i("save title failed %s %o",String(o.id),I),o.title=A,d=!1,N(),Q("Failed to save title","error")}finally{a=!1}},X=()=>{d=!1,N()},ke=()=>{w=!0,N()},te=c=>{c.key==="Enter"?(c.preventDefault(),w=!0,N()):c.key==="Escape"&&(c.preventDefault(),w=!1,N())},T=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .prop.assignee input"),A=o?.assignee??"",P=c?.value??"";if(P===A){w=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),P);let I=await e("update-assignee",{id:o.id,assignee:P});I&&typeof I=="object"&&(o=I,w=!1,N())}catch(I){i("save assignee failed %s %o",String(o.id),I),o.assignee=A,w=!1,N(),Q("Failed to update assignee","error")}finally{a=!1}},$=()=>{w=!1,N()},H=c=>{q=c.currentTarget.value||""};function V(c){c.key==="Enter"&&(c.preventDefault(),W())}async function W(){if(!o||a)return;let c=q.trim();if(c){a=!0;try{i("add label %s \u2192 %s",String(o.id),c);let A=await e("label-add",{id:o.id,label:c});A&&typeof A=="object"&&(o=A,q="",N())}catch(A){i("add label failed %s %o",String(o.id),A),Q("Failed to add label","error")}finally{a=!1}}}async function ie(c){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),c);let A=await e("label-remove",{id:o.id,label:c});A&&typeof A=="object"&&(o=A,N())}catch(A){i("remove label failed %s %o",String(o?.id||""),A),Q("Failed to remove label","error")}finally{a=!1}}}let pe=async c=>{if(!o||a){N();return}let A=c.currentTarget,P=o.status||"open",I=A.value;if(I!==P){a=!0,o.status=I,N();try{i("update status %s \u2192 %s",String(o.id),I);let ne=await e("update-status",{id:o.id,status:I});ne&&typeof ne=="object"&&(o=ne,N())}catch(ne){i("update status failed %s %o",String(o.id),ne),o.status=P,N(),Q("Failed to update status","error")}finally{a=!1}}},be=async c=>{if(!o||a){N();return}let A=c.currentTarget,P=typeof o.priority=="number"?o.priority:2,I=Number(A.value);if(I!==P){a=!0,o.priority=I,N();try{i("update priority %s \u2192 %d",String(o.id),I);let ne=await e("update-priority",{id:o.id,priority:I});ne&&typeof ne=="object"&&(o=ne,N())}catch(ne){i("update priority failed %s %o",String(o.id),ne),o.priority=P,N(),Q("Failed to update priority","error")}finally{a=!1}}},ae=()=>{p=!0,N()},Ae=c=>{if(c.key==="Escape")p=!1,N();else if(c.key==="Enter"&&c.ctrlKey){let A=t.querySelector("#detail-root .editable-actions button");A&&A.click()}},Y=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root textarea"),A=o.description||"",P=c?c.value:"";if(P===A){p=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save description %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"description",value:P});I&&typeof I=="object"&&(o=I,p=!1,N())}catch(I){i("save description failed %s %o",String(o?.id||""),I),o.description=A,p=!1,N(),Q("Failed to save description","error")}finally{a=!1}},ve=()=>{p=!1,N()},Te=()=>{h=!0,N();try{let c=t.querySelector("#detail-root .design textarea");c&&c.focus()}catch(c){i("focus design textarea failed %o",c)}},He=c=>{if(c.key==="Escape")h=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let A=t.querySelector("#detail-root .design .editable-actions button");A&&A.click()}},Re=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .design textarea"),A=o.design||"",P=c?c.value:"";if(P===A){h=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save design %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"design",value:P});I&&typeof I=="object"&&(o=I,h=!1,N())}catch(I){i("save design failed %s %o",String(o?.id||""),I),o.design=A,h=!1,N(),Q("Failed to save design","error")}finally{a=!1}},Xe=()=>{h=!1,N()},Ye=()=>{b=!0,N()},ye=c=>{if(c.key==="Escape")b=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let A=t.querySelector("#detail-root .notes .editable-actions button");A&&A.click()}},Qe=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .notes textarea"),A=o.notes||"",P=c?c.value:"";if(P===A){b=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save notes %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"notes",value:P});I&&typeof I=="object"&&(o=I,b=!1,N())}catch(I){i("save notes failed %s %o",String(o?.id||""),I),o.notes=A,b=!1,N(),Q("Failed to save notes","error")}finally{a=!1}},kt=()=>{b=!1,N()},ht=()=>{m=!0,N()},gt=c=>{if(c.key==="Escape")m=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let A=t.querySelector("#detail-root .acceptance .editable-actions button");A&&A.click()}},pt=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .acceptance textarea"),A=o.acceptance||"",P=c?c.value:"";if(P===A){m=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let I=await e("edit-text",{id:o.id,field:"acceptance",value:P});I&&typeof I=="object"&&(o=I,m=!1,N())}catch(I){i("save acceptance failed %s %o",String(o?.id||""),I),o.acceptance=A,m=!1,N(),Q("Failed to save acceptance","error")}finally{a=!1}},Ze=()=>{m=!1,N()},bt=c=>{let A=c.currentTarget,P=j.trim().length>0;j=A.value||"";let I=j.trim().length>0;P!==I&&N()},ft=async()=>{if(!(!o||M||!j.trim())){M=!0,N();try{i("add comment to %s",String(o.id));let c=await e("add-comment",{id:o.id,text:j.trim()});Array.isArray(c)&&(o.comments=c,j="",N())}catch(c){i("add comment failed %s %o",String(o.id),c),Q("Failed to add comment","error")}finally{M=!1,N()}}},vt=c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&(c.preventDefault(),ft())};function xt(c,A){let P=c==="Dependencies"?"add-dependency":"add-dependent";return _`
      <div class="props-card">
        <div>
          <div class="props-card__title">${c}</div>
        </div>
        <ul>
          ${!A||A.length===0?null:A.map(I=>{let ne=I.id,Ie=we(ne);return _`<li
                  data-href=${Ie}
                  @click=${()=>r(Ie)}
                >
                  ${Ft(I.issue_type||"")}
                  <span class="text-truncate">${I.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${ne}`}
                    @click=${_t(ne,c)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${P} />
          <button @click=${Lt(A,c)}>Add</button>
        </div>
      </div>
    `}function It(){if(!o||a)return;let c=o.metadata||{};k=typeof c.execution_lane=="string"?c.execution_lane:"",R=typeof c.workspace_policy=="string"?c.workspace_policy:"",F=typeof c.branch_policy=="string"?c.branch_policy:"",v=typeof c.finish_action=="string"?c.finish_action:"",x=typeof c.review_profile=="string"?c.review_profile:"",E=typeof c.review_runtime=="string"?c.review_runtime:"",g=!0,N()}function St(){g=!1,k="",R="",F="",v="",x="",E="",N()}async function et(){if(!o||a)return;let c=fs(k,R,F,v,x,E);if(!c){Q("Choose valid workflow settings","error"),N();return}a=!0,N();try{let A=await e("update-workflow-settings",{id:o.id,values:c});A&&typeof A=="object"&&!Array.isArray(A)&&(o=A),g=!1,k="",R="",F="",v="",x="",E=""}catch(A){i("save workflow settings failed %o",A),Q("Failed to save workflow settings","error")}finally{a=!1,N()}}function Ee(c){k=c.currentTarget.value,N()}function Pe(c){R=c.currentTarget.value,N()}function Oe(c){F=c.currentTarget.value,N()}function Me(c){v=c.currentTarget.value,N()}function tt(c){x=c.currentTarget.value,N()}function qe(c){E=c.currentTarget.value,N()}async function je(c){try{await navigator.clipboard.writeText(c),Q("Copied path")}catch(A){i("copy artifact path failed %o",A),Q("Failed to copy path","error")}}function rt(){return n?.getState?.().config?.detail?.workflow_summary||null}function Fe(c){let A=String(c.kind||"value"),P=String(c.label||""),I=String(c.value||""),ne=typeof c.href=="string"?c.href:"";return A==="artifact"?_`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${P}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${I}
          @click=${()=>je(I)}
        >
          ${I}
        </button>
      </div>`:A==="link"&&ne?_`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${P}</div>
        <div class="workflow-summary__value">
          <a href=${ne} target="_blank" rel="noreferrer noopener">${I}</a>
        </div>
      </div>`:_`<div
      class=${`workflow-summary__row ${A==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${P}</div>
      <div class="workflow-summary__value">${I}</div>
    </div>`}function st(c,A){return c&&!A.includes(c)?_`<option value=${c} selected>Invalid: ${c}</option>`:null}function Ue(c,A,P,I,ne,Ie){return _`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${c}>${A}</label>
      <select
        id=${c}
        data-testid=${c}
        .value=${P}
        ?disabled=${a}
        @change=${ne}
      >
        <option value="" ?selected=${P===""}>${Ie}</option>
        ${st(P,I)}
        ${I.map(lt=>_`<option value=${lt} ?selected=${lt===P}>
              ${lt}
            </option>`)}
      </select>
    </div>`}function G(c){let A=Array.isArray(c.editable_fields)?c.editable_fields:[],P=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile","review_runtime"].every(C=>A.includes(C));if(!g)return _`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${c.rows.map(C=>Fe(C))}
        </div>
        ${P?_`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${It}
            >
              Edit
            </button>`:null}
      </section>`;let I=!!(R&&F&&v),ne=Kt({workspace_policy:R,branch_policy:F,finish_action:v}),Ie=I&&ne.kind!=="valid",lt=x!==""&&!or.includes(x),Ce=E!==""&&!ir.includes(E),Yt=k!==""&&!nr.includes(k),f=!!fs(k,R,F,v,x,E);return _`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${Ue("workflow-settings-lane","Execution lane",k,nr,Ee,"Choose lane")}
        ${Ue("workflow-settings-workspace","Workspace",R,as,Pe,"Choose workspace")}
        ${Ue("workflow-settings-branch","Branch",F,ls,Oe,"Choose branch")}
        ${Ue("workflow-settings-finish","Finish",v,cs,Me,"Choose finish")}
        ${Ue("workflow-settings-review-profile","Review profile",x,or,tt,ds)}
        ${Ue("workflow-settings-review-runtime","Review runtime",E,ir,qe,us)}
        ${Yt?_`<div class="workflow-summary__row is-invalid">
              Invalid execution lane
            </div>`:null}
        ${Ie?_`<div class="workflow-summary__row is-invalid">
              Invalid route combination
            </div>`:null}
        ${lt?_`<div class="workflow-summary__row is-invalid">
              Invalid review profile
            </div>`:null}
        ${Ce?_`<div class="workflow-summary__row is-invalid">
              Invalid review runtime
            </div>`:null}
        <div class="workflow-summary__row">
          <div class="workflow-summary__label">Note</div>
          <div class="workflow-summary__value">
            Review profile affects future formal review gates and does not
            change existing review evidence. Review runtime overrides the
            default reviewer (codex/claude) for this Bead's review gates; select
            to match the runtime that will run review.
          </div>
        </div>
      </div>
      <div class="workflow-summary__actions">
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-save"
          ?disabled=${a||!f}
          @click=${et}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-cancel"
          ?disabled=${a}
          @click=${St}
        >
          Cancel
        </button>
      </div>
    </section>`}function nt(c){return c.id==="workflow_settings"?G(c):_`<section
      class="workflow-summary__section"
      data-section=${c.id}
    >
      <div class="workflow-summary__section-title">${c.label}</div>
      <div class="workflow-summary__list">
        ${c.rows.map(A=>Fe(A))}
      </div>
    </section>`}function zt(c){let A=_n(c,rt()),P=A.length>0?_`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${A.map(Z=>nt(Z))}
          </div>`:null,I=d?_`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${c.title||""}
              @keydown=${y}
            />
            <button @click=${K}>Save</button>
            <button @click=${X}>Cancel</button>
          </h2>
        </div>`:_`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${ee}
              @keydown=${oe}
              >${c.title||""}</span
            >
          </h2>
        </div>`,ne=_`<select
      class=${`badge-select badge--status is-${c.status||"open"}`}
      @change=${pe}
      .value=${c.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(c.status||"open");return jr.map(me=>_`<option value=${me} ?selected=${Z===me}>
              ${at(me)}
            </option>`)})()}
    </select>`,Ie=_`<select
      class=${`badge-select badge--priority is-p${String(typeof c.priority=="number"?c.priority:2)}`}
      @change=${be}
      .value=${String(typeof c.priority=="number"?c.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let Z=String(typeof c.priority=="number"?c.priority:2);return Rt.map((me,At)=>_`<option value=${String(At)} ?selected=${Z===String(At)}>
              ${sr(At)} ${me}
            </option>`)})()}
    </select>`,lt=p?_`<div class="description">
          <textarea
            @keydown=${Ae}
            .value=${c.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Y}>Save</button>
            <button @click=${ve}>Cancel</button>
          </div>
        </div>`:_`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${ae}
          @keydown=${u}
        >
          ${(()=>{let Z=c.description||"";return Z.trim()===""?_`<div class="muted">Description</div>`:yr(Z)})()}
        </div>`,Ce=(()=>{let Z=c;return String(c.acceptance||Z.acceptance_criteria||"")})(),Yt=m?_`<div class="acceptance">
          ${Ce.trim().length>0?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${gt}
            .value=${Ce}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${pt}>Save</button>
            <button @click=${Ze}>Cancel</button>
          </div>
        </div>`:_`<div class="acceptance">
          ${(()=>{let Z=Ce,me=Z.trim().length>0;return _`${me?_`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${ht}
                @keydown=${D}
              >
                ${me?yr(Z):_`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,z=String(c.notes||""),f=b?_`<div class="notes">
          ${z.trim().length>0?_`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${ye}
            .value=${z}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Qe}>Save</button>
            <button @click=${kt}>Cancel</button>
          </div>
        </div>`:_`<div class="notes">
          ${(()=>{let Z=z,me=Z.trim().length>0;return _`${me?_`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${Ye}
                @keydown=${J}
              >
                ${me?yr(Z):_`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,C=Array.isArray(c.labels)?c.labels:[],U=_`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${C.map(Z=>_`<li>
              <span class="badge" title=${Z}
                >${Z}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+Z}
                  @click=${()=>ie(Z)}
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
          .value=${q}
          @input=${H}
          @keydown=${V}
        />
        <button @click=${W}>Add</button>
      </div>
    </div>`,fe=String(c.design||""),De=h?_`<div class="design">
          ${fe.trim().length>0?_`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${He}
            .value=${fe}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Re}>Save</button>
            <button @click=${Xe}>Cancel</button>
          </div>
        </div>`:_`<div class="design">
          ${(()=>{let Z=fe,me=Z.trim().length>0;return _`${me?_`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${Te}
                @keydown=${se}
              >
                ${me?yr(Z):_`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,xe=Array.isArray(c.comments)?c.comments:[],ze=_`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${xe.length===0?_`<div class="muted">No comments yet</div>`:xe.map(Z=>_`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${Z.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${xa(Z.created_at)}</span
                  >
                </div>
                <div class="comment-text">${Z.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${j}
          @input=${bt}
          @keydown=${vt}
          ?disabled=${M}
        ></textarea>
        <button
          @click=${ft}
          ?disabled=${M||!j.trim()}
        >
          ${M?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return _`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${I} ${lt} ${De} ${f}
            ${Yt} ${ze}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${Se}>
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
                    ${Ft(c.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${ne}</div>
                </div>
                ${c.close_reason?_`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${c.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${Ie}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${w?_`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${c.assignee||""}
                              size=${Math.min(40,Math.max(12,(c.assignee||"").length+3))}
                              @keydown=${Z=>{Z.key==="Escape"?(Z.preventDefault(),$()):Z.key==="Enter"&&(Z.preventDefault(),T())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${T}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${$}
                            >
                              Cancel
                            </button>`:_`${(()=>{let Z=c.assignee||"",me=Z.trim().length>0;return _`<span
                              class=${me?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${ke}
                              @keydown=${te}
                              >${me?Z:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${U}
              ${P}
              ${xt("Dependencies",c.dependencies||[])}
              ${xt("Dependents",c.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function N(){if(!o){S(l?"Loading\u2026":"No issue selected");return}_e(zt(o),t)}function _t(c,A){return async P=>{if(P.stopPropagation(),!(!o||a)){a=!0;try{if(A==="Dependencies"){let I=await e("dep-remove",{a:o.id,b:c,view_id:o.id});I&&typeof I=="object"&&(o=I,N())}else{let I=await e("dep-remove",{a:c,b:o.id,view_id:o.id});I&&typeof I=="object"&&(o=I,N())}}catch(I){i("dep-remove failed %o",I)}finally{a=!1}}}}function Lt(c,A){return async P=>{if(!o||a)return;let I=P.currentTarget,ne=I.previousElementSibling,Ie=ne?ne.value.trim():"";if(!Ie||Ie===o.id){Q("Enter a different issue id");return}if(new Set((c||[]).map(Ce=>Ce.id)).has(Ie)){Q("Link already exists");return}a=!0,I&&(I.disabled=!0),ne&&(ne.disabled=!0);try{if(A==="Dependencies"){let Ce=await e("dep-add",{a:o.id,b:Ie,view_id:o.id});Ce&&typeof Ce=="object"&&(o=Ce,N())}else{let Ce=await e("dep-add",{a:Ie,b:o.id,view_id:o.id});Ce&&typeof Ce=="object"&&(o=Ce,N())}}catch(Ce){i("dep-add failed %o",Ce),Q("Failed to add dependency","error")}finally{a=!1}}}function y(c){c.key==="Escape"?(d=!1,N()):c.key==="Enter"&&(c.preventDefault(),K())}function u(c){c.key==="Enter"&&ae()}function D(c){c.key==="Enter"&&ht()}function J(c){c.key==="Enter"&&Ye()}function se(c){c.key==="Enter"&&Te()}return{async load(c){if(!c){S("No issue selected");return}if(l=String(c),o=null,L(),o||S("Loading\u2026"),a=!1,j="",M=!1,N(),o&&!o.comments)try{let A=await e("get-comments",{id:l});Array.isArray(A)&&o&&l===c&&(o.comments=A,N())}catch(A){i("fetch comments failed %s %o",c,A)}},clear(){S("Select an issue to view details")},destroy(){B(),t.replaceChildren(),O&&O.parentNode&&(O.parentNode.removeChild(O),O=null)}}}function Wr(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",d=t.show_deps??!0,p=new Set;function h(g,k,R,F=""){let v=`${g}:${k}`;return p.has(v)?_`<span>
        <input
          type="text"
          .value=${R}
          class="inline-edit"
          @keydown=${async E=>{if(E.key==="Escape")p.delete(v),s();else if(E.key==="Enter"){let j=E.currentTarget.value||"";j!==R&&await r(g,{[k]:j}),p.delete(v),s()}}}
          @blur=${async E=>{let j=E.currentTarget.value||"";j!==R&&await r(g,{[k]:j}),p.delete(v),s()}}
          autofocus
        />
      </span>`:_`<span
      class="editable text-truncate ${R?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${E=>{E.stopPropagation(),E.preventDefault(),p.add(v),s()}}
      @keydown=${E=>{E.key==="Enter"&&(E.preventDefault(),E.stopPropagation(),p.add(v),s())}}
      >${R||F}</span
    >`}function b(g,k){return async R=>{let v=R.currentTarget.value||"",x={};x[k]=k==="priority"?Number(v):v,await r(g,x)}}function m(g){return k=>{let R=k.target;R&&(R.tagName==="INPUT"||R.tagName==="SELECT")||e(g)}}function w(g){let k=String(g.status||"open"),R=String(g.priority??2),F=n()===g.id;return _`<tr
      role="row"
      class="${a} ${F?"selected":""}"
      data-issue-id=${g.id}
      @click=${m(g.id)}
    >
      <td role="gridcell" class="mono">${Ct(g.id)}</td>
      <td role="gridcell">${Ft(g.issue_type)}</td>
      <td role="gridcell">${h(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${Tr(g.labels,i(),o()).map(v=>Er(v,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${k}"
          .value=${k}
          @change=${b(g.id,"status")}
        >
          ${jr.map(v=>_`<option value=${v} ?selected=${k===v}>
                ${at(v)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${h(g.id,"assignee",g.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+R}"
          .value=${R}
          @change=${b(g.id,"priority")}
        >
          ${Rt.map((v,x)=>_`<option
                value=${String(x)}
                ?selected=${R===String(x)}
              >
                ${sr(x)} ${v}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Cr(g.created_at)}
      >
        ${g.created_at?Rr(g.created_at):""}
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
    </tr>`}return w}function Qn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],l=new Set,a=new Set,d=new Map,p=n?Tt(n):null;p&&p.subscribe(()=>{let v=o.length===0;if(o=F(),m(),v&&o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&R(x)}});function h(){let v=i?.getState?.().config?.label_display_policy,x=v?.colors;return{visible_prefixes:Array.isArray(v?.visible_prefixes)?v.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(v?.visible_exact)?v.visible_exact:[],colors:x&&typeof x=="object"?x:{prefix:{},exact:{}}}}let b=Wr({navigate:v=>r(v),onUpdate:k,requestRender:m,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,getLabelColorPolicy:()=>h().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let v=JSON.stringify(h());i.subscribe(()=>{let x=JSON.stringify(h());x!==v&&(v=x,m())})}function m(){_e(w(),t)}function w(){return o.length?_`${o.map(v=>g(v))}`:_`<div class="panel__header muted">No epics found.</div>`}function g(v){let x=v.epic||{},E=String(x.id||""),q=l.has(E),j=p?p.selectEpicChildren(E):[],M=a.has(E);return _`
      <div class="epic-group" data-epic-id=${E}>
        <div
          class="epic-header"
          @click=${()=>R(E)}
          role="button"
          tabindex="0"
          aria-expanded=${q}
        >
          ${Ct(E,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${x.title||"(no title)"}</span
          >
          <span
            class="epic-progress"
            style="margin-left:auto; display:flex; align-items:center; gap:8px;"
          >
            <progress
              value=${Number(v.closed_children||0)}
              max=${Math.max(1,Number(v.total_children||0))}
            ></progress>
            <span class="muted mono"
              >${v.closed_children}/${v.total_children}</span
            >
          </span>
        </div>
        ${q?_`<div class="epic-children">
              ${M?_`<div class="muted">Loading…</div>`:j.length===0?_`<div class="muted">No issues found</div>`:_`<table class="table">
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
                        ${j.map(O=>b(O))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function k(v,x){try{await e.updateIssue({id:v,...x}),m()}catch{}}async function R(v){if(l.has(v)){if(l.delete(v),d.has(v)){try{let x=d.get(v);x&&await x()}catch{}d.delete(v);try{n&&n.unregister&&n.unregister(`detail:${v}`)}catch{}}}else{if(l.add(v),a.add(v),m(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${v}`,{type:"issue-detail",params:{id:v}})}catch{}let x=await s.subscribeList(`detail:${v}`,{type:"issue-detail",params:{id:v}});d.set(v,x)}catch{}a.delete(v)}m()}function F(){let v=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],x=[];for(let E of v){let q=Array.isArray(E.dependents)?E.dependents:[],j=Number.isFinite(E.total_children),M=Number.isFinite(E.closed_children),O=j?Number(E.total_children)||0:q.length,B=M&&Number(E.closed_children)||0;if(!M)for(let de of q)String(de.status||"")==="closed"&&B++;x.push({epic:E,total_children:O,closed_children:B})}return x}return{async load(){o=F(),m();try{if(o.length>0){let v=String(o[0].epic?.id||"");v&&!l.has(v)&&await R(v)}}catch{}}}}function eo(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,p,h="")=>{r&&(r.textContent=d||"Unexpected Error"),s&&(s.textContent=p||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(n&&(b.length>0?(n.textContent=b,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function to(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function l(m){i.replaceChildren(),i.appendChild(Ct(m))}s.addEventListener("mousedown",m=>{m.target===s&&(m.preventDefault(),d())}),s.addEventListener("cancel",m=>{m.preventDefault(),d()}),o.addEventListener("click",()=>d());let a=null;function d(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}b()}function p(m){try{let w=document.activeElement;w&&w instanceof HTMLElement?a=w:a=null}catch{a=null}l(m);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:p,close:h,getMount(){return n}}}var Gr=["bug","feature","task","epic","chore"];function mr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function ro(t,e,r,s,n=void 0,i=void 0){let o=ge("views:list"),l=[],a="",d=[],p=[],h=s?s.getState().selected_id:null,b=null,m=!1,w=!1;function g(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function k(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function R(){let S=s?.getState?.().config?.label_display_policy,L=S?.colors;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[],colors:L&&typeof L=="object"?L:{prefix:{},exact:{}}}}let F=Wr({navigate:S=>{let L=r||(oe=>window.location.hash=oe),ee=s?s.getState().view:"issues";L(Et(ee,S))},onUpdate:Le,requestRender:ce,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>R().visible_prefixes,getVisibleLabelExact:()=>R().visible_exact,getLabelColorPolicy:()=>R().colors,row_class:"issue-row"}),v=async S=>{l.includes(S)?l=l.filter(L=>L!==S):l=[...l,S],o("status toggle %s -> %o",S,l),s&&s.setState({filters:{status:l}}),await Se()},x=S=>{a=S.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),ce()},E=S=>{p.includes(S)?p=p.filter(L=>L!==S):p=[...p,S],o("type toggle %s -> %o",S,p),s&&s.setState({filters:{type:p}}),ce()},q=S=>{S.stopPropagation(),m=!m,w=!1,ce()},j=S=>{S.stopPropagation(),w=!w,m=!1,ce()};function M(S,L,ee){return S.length===0?`${L}: Any`:S.length===1?`${L}: ${ee(S[0])}`:`${L} (${S.length})`}if(s){let S=s.getState();S&&S.filters&&typeof S.filters=="object"&&(l=g(S.filters.status),a=S.filters.search||"",p=k(S.filters.type))}let O=i?Tt(i):null;function B(){if(!O)return[];let S=O.selectIssuesFor("tab:issues"),L=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),ee=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!L&&!ee)return S;let oe=new Map;for(let K of S)oe.set(String(K.id),K);if(L){let K=O.selectIssuesFor("tab:issues:resolved");for(let X of K)oe.set(String(X.id),X)}if(ee){let K=O.selectIssuesFor("tab:issues:deferred");for(let X of K)oe.set(String(X.id),X)}return Array.from(oe.values())}function de(){let S=d;if(l.length>0&&!l.includes("ready")&&(S=S.filter(L=>l.includes(String(L.status||"")))),a){let L=a.toLowerCase();S=S.filter(ee=>{let oe=String(ee.id).toLowerCase(),K=String(ee.title||"").toLowerCase();return oe.includes(L)||K.includes(L)})}return p.length>0&&(S=S.filter(L=>p.includes(String(L.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(jt)),_`
      <div class="panel__header">
        <div class="filter-dropdown ${m?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${q}
          >
            ${M(l,"Status",at)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(L=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(L)}
                    @change=${()=>v(L)}
                  />
                  ${L==="ready"?"Ready":at(L)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${w?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${j}>
            ${M(p,"Types",mr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Gr.map(L=>_`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${p.includes(L)}
                    @change=${()=>E(L)}
                  />
                  ${mr(L)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${x}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${S.length===0?_`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:_`<div class="issues-block">
              <table
                class="table"
                role="grid"
                aria-rowcount=${String(S.length)}
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
                  ${S.map(L=>F(L))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function ce(){_e(de(),t)}ce();async function Le(S,L){try{o("updateInline %s %o",S,Object.keys(L)),typeof L.title=="string"&&await e("edit-text",{id:S,field:"title",value:L.title}),typeof L.assignee=="string"&&await e("update-assignee",{id:S,assignee:L.assignee}),typeof L.status=="string"&&await e("update-status",{id:S,status:L.status}),typeof L.priority=="number"&&await e("update-priority",{id:S,priority:L.priority})}catch{}}async function Se(){o("load");let S=t.querySelector("#list-root"),L=S?S.scrollTop:0;try{O?d=B():d=[]}catch(ee){o("load failed: %o",ee),d=[]}ce();try{let ee=t.querySelector("#list-root");ee&&L>0&&(ee.scrollTop=L)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let K=S.target;if((K&&typeof K.closest=="function"?K.closest("#list-root table.table"):null)&&!!!(K&&typeof K.closest=="function"&&(K.closest("input")||K.closest("textarea")||K.closest("select")))){let te=K&&typeof K.closest=="function"?K.closest("td"):null;if(te&&te.parentElement){let T=te.parentElement,$=T.parentElement;if($&&$.querySelectorAll){let H=Array.from($.querySelectorAll("tr")),V=Math.max(0,H.indexOf(T)),W=te.cellIndex||0,ie=S.key==="ArrowDown"?Math.min(V+1,H.length-1):Math.max(V-1,0),pe=H[ie],be=pe&&pe.cells?pe.cells[W]:null;if(be){let ae=be.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(ae&&typeof ae.focus=="function"){S.preventDefault(),ae.focus();return}}}}}}let L=t.querySelector("#list-root tbody"),ee=L?L.querySelectorAll("tr"):[];if(ee.length===0)return;let oe=0;if(h&&(oe=Array.from(ee).findIndex(X=>(X.getAttribute("data-issue-id")||"")===h),oe<0&&(oe=0)),S.key==="ArrowDown"){S.preventDefault();let K=ee[Math.min(oe+1,ee.length-1)],X=K?K.getAttribute("data-issue-id"):"",ke=X||null;s&&ke&&s.setState({selected_id:ke}),h=ke,ce()}else if(S.key==="ArrowUp"){S.preventDefault();let K=ee[Math.max(oe-1,0)],X=K?K.getAttribute("data-issue-id"):"",ke=X||null;s&&ke&&s.setState({selected_id:ke}),h=ke,ce()}else if(S.key==="Enter"){S.preventDefault();let K=ee[oe],X=K?K.getAttribute("data-issue-id"):"";if(X){let ke=r||(T=>window.location.hash=T),te=s?s.getState().view:"issues";ke(Et(te,X))}}});let we=S=>{let L=S.target;L&&!L.closest(".filter-dropdown")&&(m||w)&&(m=!1,w=!1,ce())};if(document.addEventListener("click",we),s){let S=JSON.stringify(R());b=s.subscribe(L=>{if(L.selected_id!==h&&(h=L.selected_id,o("selected %s",h||"(none)"),ce()),L.filters&&typeof L.filters=="object"){let ee=g(L.filters.status),oe=L.filters.search||"",K=!1;if(JSON.stringify(ee)!==JSON.stringify(l)){l=ee,Se();return}oe!==a&&(a=oe,K=!0);let ke=k(L.filters.type);JSON.stringify(ke)!==JSON.stringify(p)&&(p=ke,K=!0);let T=JSON.stringify(R());T!==S&&(S=T,K=!0),K&&ce()}})}return O&&O.subscribe(()=>{try{d=B(),ce()}catch{}}),{load:Se,destroy(){t.replaceChildren(),document.removeEventListener("click",we),b&&(b(),b=null)}}}function so(t,e,r){let s=ge("views:nav"),n=null;function i(a){return d=>{d.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let d=e.getState().view||"issues";return _`
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
    `}function l(){_e(o(),t)}return l(),n=e.subscribe(()=>l()),{destroy(){n&&(n(),n=null),_e(_``,t)}}}function no(t,e,r,s){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),l=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),d=n.querySelector("#new-labels"),p=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),b=n.querySelector("#btn-cancel"),m=n.querySelector("#btn-create"),w=n.querySelector(".new-issue__close");function g(){l.replaceChildren();let M=document.createElement("option");M.value="",M.textContent="\u2014 Select \u2014",l.appendChild(M);for(let O of Gr){let B=document.createElement("option");B.value=O,B.textContent=mr(O),l.appendChild(B)}a.replaceChildren();for(let O=0;O<=4;O+=1){let B=document.createElement("option");B.value=String(O);let de=Rt[O]||"Medium";B.textContent=`${O} \u2013 ${de}`,a.appendChild(B)}}g();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function R(M){o.disabled=M,l.disabled=M,a.disabled=M,d.disabled=M,p.disabled=M,b.disabled=M,m.disabled=M,m.textContent=M?"Creating\u2026":"Create"}function F(){h.textContent=""}function v(M){h.textContent=M}function x(){try{let M=window.localStorage.getItem("beads-ui.new.type");M?l.value=M:l.value="";let O=window.localStorage.getItem("beads-ui.new.priority");O&&/^\d$/.test(O)?a.value=O:a.value="2"}catch{l.value="",a.value="2"}}function E(){let M=l.value||"",O=a.value||"";M.length>0&&window.localStorage.setItem("beads-ui.new.type",M),O.length>0&&window.localStorage.setItem("beads-ui.new.priority",O)}function q(M){let O=/-(\d+)$/.exec(String(M||""));return O&&O[1]?Number(O[1]):-1}async function j(){F();let M=String(o.value||"").trim();if(M.length===0){v("Title is required"),o.focus();return}let O=Number(a.value||"2");if(!(O>=0&&O<=4)){v("Priority must be 0..4"),a.focus();return}let B=String(l.value||""),de=String(p.value||""),ce=String(d.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),Le={title:M};B.length>0&&(Le.type=B),String(O).length>0&&(Le.priority=O),de.length>0&&(Le.description=de),R(!0);try{await e("create-issue",Le)}catch{R(!1),v("Failed to create issue");return}E();let Se=null;try{Se=await e("list-issues",{filters:{status:"open",limit:50}})}catch{Se=null}let we="";if(Array.isArray(Se)){let S=Se.filter(L=>String(L.title||"")===M);if(S.length>0){let L=S[0];for(let ee of S){let oe=q(L.id||"");q(ee.id||"")>oe&&(L=ee)}we=String(L.id||"")}}if(we&&ce.length>0)for(let S of ce)try{await e("label-add",{id:we,label:S})}catch{}if(we){try{r.gotoIssue(we)}catch{}try{s&&s.setState({selected_id:we})}catch{}}R(!1),k()}return n.addEventListener("cancel",M=>{M.preventDefault(),k()}),w.addEventListener("click",()=>k()),b.addEventListener("click",()=>k()),n.addEventListener("keydown",M=>{M.key==="Enter"&&(M.ctrlKey||M.metaKey)&&(M.preventDefault(),j())}),i.addEventListener("submit",M=>{M.preventDefault(),j()}),{open(){i.reset(),F(),x();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var oo={open:0,in_progress:.5,resolved:.85,closed:1},co=new Set(["queued","starting","running","cancelling"]),io={in_progress:0,open:1,resolved:2,closed:3};function ao(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function Aa(t){return t&&t in oo?oo[t]:0}function lo(t){return t&&t in io?io[t]:Number.MAX_SAFE_INTEGER}function Ps(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function $a(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Ta(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function uo(t,e){return e.filter(r=>Ta(r)===t)}function Ea(t,e){return uo(t,e).some(r=>typeof r.status=="string"&&co.has(r.status))}function Vr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function Ca(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+Aa(s),0);return Math.round(e/t.length*100)}function Ra(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:Ps(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function Ia(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(g=>g.status!=="closed"),i=e.filter(g=>g.status==="closed").length,o=e.map(g=>String(g.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=uo(t.id,l),d=a.find(g=>typeof g.status=="string"&&co.has(g.status))||null,p=d?a.filter(g=>g.id!==d.id).slice(0,3):a.slice(0,3),h=d!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),m={open:e.filter(g=>g.status==="open").length,in_progress:e.filter(g=>g.status==="in_progress").length,resolved:e.filter(g=>g.status==="resolved").length,closed:e.filter(g=>g.status==="closed").length},w=Ra(t,{is_parent:!0,has_spec_id:Ps(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:m,progress_percent:Ca(o),current_job:d,current_job_elapsed_label:Vr(d?.elapsedMs),recent_jobs:p,has_active_job:h,has_open_pr:b>0,open_pr_count:b,runnable:w}}function po(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of l)s.has(b.id)||a.push({...b,parent:i.id});let d=Array.isArray(e.jobs)?e.jobs:[],p=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||Ea(i.id,d)||p>0||$a(i)&&Ps(i))&&n.push(Ia(i,a,e))}return n.sort(La),n}function La(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=lo(t.status)-lo(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=ao(e.updated_at??e.created_at)-ao(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function fo(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function ho(t,e){return t.length===0?_`<section class="worker-pr-panel">No open PRs</section>`:_`
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
  `}function go(t){return _`
    <section class="worker-pr-summary">
      ${t.length===0?_`<div>No workspace PRs</div>`:t.map(e=>_`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function bo(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",l=!1,a="";function d(){_e(_`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?_`
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

          ${l?_`
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
      `,t)}function p(){l=!0,o=i,a="",d()}function h(){l=!1,o=i,a="",d()}async function b(){let m=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let w=await r(m,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),g=await w.json();if(w.ok===!1)throw new Error(typeof g?.error=="string"&&g.error.length>0?g.error:"Failed to save spec");i=g.content||o,o=i,l=!1,a="",d()}catch(w){a=w instanceof Error&&w.message.length>0?w.message:"Failed to save spec",d()}}return{async load(m,w){s=m,n=w;let g=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(g)).json()).content||""}catch{i=""}o=i,l=!1,a="",d()},clear(){s="",n="",i="",o="",l=!1,a="",_e(_``,t)}}}function _o(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],l="";async function a(d=[],p=[]){let h=s,b=h?i.filter(g=>g.issueId===h.id):[],m=b.find(g=>["queued","starting","running","cancelling"].includes(String(g.status)))||null,w=m?b.filter(g=>g.id!==m.id):b;if(_e(_`
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
                          <div>${Vr(m.elapsedMs)}</div>
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
                          ${l?_`<p>${l}</p>`:o.length>0?_`<pre>${o.join(`
`)}</pre>`:_`<p>No log output yet.</p>`}
                        </div>
                      `:_`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${w.map(g=>_`
                        <li>
                          <span>${g.status}</span>
                          <span>${Vr(g.elapsedMs)}</span>
                          ${g.errorSummary?_`<span>${g.errorSummary}</span>`:null}
                          ${g.wasForceKilled?_`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${ho(d,{onRunPrReview:g=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:g.number})})}
          ${go(p)}
        </section>
      `,t),s){let g=s,k=t.querySelector("#worker-detail-spec-host");k&&await bo(k,{fetch_impl:r}).load(g.id,n)}}return{async load(d,p,h=[]){if(s=d,n=p,i=h,o=[],l="",!d||!p){await a([],[]);return}let b={items:[]},m={items:[]};try{b=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(p)}`)).json()}catch{b={items:[]}}try{m=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(p)}`)).json()}catch{m={items:[]}}let w=i.find(g=>g.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(g.status)));if(w?.id)try{let g=await r(`/api/worker/jobs/${encodeURIComponent(w.id)}/log?workspace=${encodeURIComponent(p)}&tail=20`);if(!g.ok)throw new Error("log not ok");let k=await g.json();o=Array.isArray(k.tail)?k.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(b.items)?b.items:[],Array.isArray(m.items)?m.items:[])},clear(){s=null,n="",i=[],o=[],l="",_e(_``,t)}}}function yo(t,e){return _`
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
  `}function mo(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return _`
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
        >${at(t.status)}</span
      >
    </div>
  `}var Da=new Set(["bug","feature","task","epic","chore","decision"]);function Na(t){let e=(t||"").toString().toLowerCase();return Da.has(e)?e:"neutral"}function Pa(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function wo(t,e){let r=t.current_job||null,s=Pa(t.status),n=Na(t.issue_type);return _`
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
          >${at(t.status)}</span
        >
        ${t.spec_id?_`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:_`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?_`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?_`
              <span class="worker-badge worker-badge--active"
                >● ${at(r.status||"running")}</span
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
  `}function ko(t,e){return t.length===0?_`<div class="worker-empty">No worker parents found.</div>`:_`
    <div class="worker-tree">
      ${t.map(r=>{let s=e.expanded_ids.has(r.id),n=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return _`
          <article class="worker-tree__item">
            ${wo(r,{expanded:s,selected:e.selected_parent_id===r.id,pr_review_enabled:n,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${s?_`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(i=>mo(i))}
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
  `}function vo(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(d){let p=e.store.getState(),h=Array.isArray(p.worker?.show_closed_children)?p.worker.show_closed_children:[],b=h.includes(d)?h.filter(m=>m!==d):[...h,d];e.store.setState({worker:{show_closed_children:b}})}function o(){let d=e.store.getState(),p=!!d.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],b=d.worker?.selected_parent_id||null,m=fo(po(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:p,show_closed_children:d.worker?.show_closed_children||[]}),n),w=b&&m.find(k=>k.id===b)||null;_e(_`
        <section
          class="worker-layout ${w?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${yo(n,{onSearchInput(k){n={...n,search:k},o()},onStatusChange(k){n={...n,status:k},o()},onRunnableToggle(k){n={...n,runnable_only:k},o()},onOpenPrToggle(k){n={...n,has_open_pr_only:k},o()}})}
            ${ko(m,{expanded_ids:r,selected_parent_id:b,onSelectParent(k){let R=b===k?null:k;e.store.setState({worker:{selected_parent_id:R}})},onToggleExpand(k){r.has(k)?r.delete(k):r.add(k),o()},onToggleClosed(k){i(k),o()},onRunRalph(k){e.onRunRalph?.(k)},onRunPrReview(k){e.onRunPrReview?.(k)},onCancelJob(k){e.onCancelJob?.(k)}})}
          </aside>

          ${w?_`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let g=t.querySelector("#worker-detail-mount");g?(s||(s=_o(g,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(w,d.workspace?.current?.path||"",h)):s?.clear()}let l=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),_e(_``,t)},destroy(){l(),a(),s?.clear(),_e(_``,t)}}}function xo(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function So(t,e,r,s=async()=>{},n=async()=>{}){let i=ge("views:workspace-picker"),o=null,l=!1,a=!1,d=!1;async function p(R){let v=R.target.value,E=e.getState().workspace?.current?.path||"";if(v&&v!==E){i("switching workspace to %s",v),l=!0,k();try{await r(v)}catch(q){i("workspace switch failed: %o",q)}finally{l=!1,k()}}}async function h(){let R=e.getState(),F=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!F||a||d)){i("syncing workspace %s",F),a=!0,k();try{await s(F)}catch(v){i("workspace sync failed: %o",v)}finally{a=!1,k()}}}async function b(){let R=e.getState(),F=R.workspace?.current?.path||R.workspace?.available?.[0]?.path||"";if(!(!F||a||d)){i("git-pulling workspace %s",F),d=!0,k();try{await n(F)}catch(v){i("workspace git pull failed: %o",v)}finally{d=!1,k()}}}function m(R){return R?_`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${h}
        ?disabled=${l||a||d}
        aria-label="Sync current workspace"
      >
        ${a?"Syncing\u2026":"Sync"}
      </button>
    `:_``}function w(R){return R?_`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${l||a||d}
        aria-label="Git pull current workspace"
      >
        ${d?"Pulling\u2026":"Git Pull"}
      </button>
    `:_``}function g(){let R=e.getState(),F=R.workspace?.current,v=R.workspace?.available||[],x=F?.path||v[0]?.path||"";if(v.length===0)return _``;if(v.length===1){let E=xo(v[0].path);return _`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${v[0].path}"
            >${E}</span
          >
          ${m(x)} ${w(x)}
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
          ?disabled=${l||a||d}
          aria-label="Select project workspace"
        >
          ${v.map(E=>_`
              <option
                value="${E.path}"
                ?selected=${E.path===x}
                title="${E.path}"
              >
                ${xo(E.path)}
              </option>
            `)}
        </select>
        ${m(x)} ${w(x)}
        ${l||a||d?_`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function k(){_e(g(),t)}return k(),o=e.subscribe(()=>k()),{destroy(){o&&(o(),o=null),_e(_``,t)}}}var Ao=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace","git-pull-workspace"];function Os(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function $o(t,e,r=Os()){return{id:r,type:t,payload:e}}function To(t={}){let e=ge("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,l=null,a=!0,d=new Map,p=[],h=new Map,b=new Set;function m(x){for(let E of Array.from(b))try{E(x)}catch{}}function w(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),m(i);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),E=(r.jitterRatio||0)*x,q=Math.max(0,Math.round(x+(Math.random()*2-1)*E));e("ws retry in %d ms (attempt %d)",q,o+1),l=setTimeout(()=>{l=null,v()},q)}function g(x){try{n?.send(JSON.stringify(x))}catch(E){e("ws send failed",E)}}function k(){for(i="open",e("ws open"),m(i),o=0;p.length;){let x=p.shift();x&&g(x)}}function R(x){let E;try{E=JSON.parse(String(x.data))}catch{e("ws received non-JSON message");return}if(!E||typeof E.id!="string"||typeof E.type!="string"){e("ws received invalid envelope");return}if(d.has(E.id)){let j=d.get(E.id);d.delete(E.id),E.ok?j?.resolve(E.payload):j?.reject(E.error||new Error("ws error"));return}let q=h.get(E.type);if(q&&q.size>0)for(let j of Array.from(q))try{j(E.payload)}catch(M){e("ws event handler error",M)}else e("ws received unhandled message type: %s",E.type)}function F(){i="closed",e("ws closed"),m(i);for(let[x,E]of d.entries())E.reject(new Error("ws disconnected")),d.delete(x);o+=1,w()}function v(){if(!a)return;let x=s();try{n=new WebSocket(x),e("ws connecting %s",x),i="connecting",m(i),n.addEventListener("open",k),n.addEventListener("message",R),n.addEventListener("error",()=>{}),n.addEventListener("close",F)}catch(E){e("ws connect failed %o",E),w()}}return v(),{send(x,E){if(!Ao.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let q=Os(),j=$o(x,E,q);return e("send %s id=%s",x,q),new Promise((M,O)=>{d.set(q,{resolve:M,reject:O,type:x}),n&&n.readyState===n.OPEN?g(j):(e("queue %s id=%s (state=%s)",x,q,i),p.push(j))})},on(x,E){h.has(x)||h.set(x,new Set);let q=h.get(x);return q?.add(E),()=>{q?.delete(E)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{n?.close()}catch{}},getState(){return i}}}var Oa=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,wr={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function Ms(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function Eo(t){if(!Ms(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!Ms(s)||typeof s.fg!="string"||!Oa.test(s.fg)||(e[r]={fg:s.fg});return e}function Ma(t){return Ms(t)?{prefix:Eo(t.prefix),exact:Eo(t.exact)}:{prefix:{},exact:{}}}function Fa(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Ma(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):wr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(wr.detail))}:{label_display_policy:{visible_prefixes:wr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):wr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(wr.detail))}}async function Ua(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function Ba(t){let e=ge("main");e("bootstrap start");let r=_`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;_e(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&n&&i&&o&&l&&d){let q=function(y,u){let D="Request failed",J="";if(y&&typeof y=="object"){let c=y;if(typeof c.message=="string"&&c.message.length>0&&(D=c.message),typeof c.details=="string")J=c.details;else if(c.details&&typeof c.details=="object")try{J=JSON.stringify(c.details,null,2)}catch{J=""}}else typeof y=="string"&&y.length>0&&(D=y);let se=u&&u.length>0?`Failed to load ${u}`:"Request failed";E.open(se,D,J)},K=function(y){return`${Y.getState().workspace.current?.path||""}\0${y}`},X=function(){ce&&(ce().catch(()=>{}),ce=null),Le=null,Se=null},te=function(y){we=y;let u=()=>{we!==y||Y.getState().selected_id!==y||(we=null,ke(y))};if(!ee){L.then(u);return}u()},W=function(y){if(!y)return"Unknown";let u=y.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"},vt=function(){bt&&(clearInterval(bt),bt=null)},nt=function(y){let u=y?.status;return Array.isArray(u)?u.map(D=>String(D)).filter(Boolean):typeof u=="string"&&u!==""&&u!=="all"?[u]:[]},zt=function(y){let u=nt(y),[D]=u;return u.length===1&&D==="ready"?{type:"ready-issues"}:u.length===1&&D==="in_progress"?{type:"in-progress-issues"}:u.length===1&&D==="deferred"?{type:"deferred-issues"}:u.length===1&&D==="closed"?{type:"closed-issues"}:u.length===1&&D==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},_t=function(y){if(y.view==="issues"){let u=zt(y.filters||{}),D=nt(y.filters||{}),J=D.includes("resolved")&&!D.includes("ready")&&!(D.length===1&&D[0]==="resolved"),se=D.includes("deferred")&&!(D.length===1&&D[0]==="deferred"),c=JSON.stringify(u);try{B.register("tab:issues",u)}catch(P){e("register issues store failed: %o",P)}let A=`tab:issues:${c}`;if((!Ee||c!==N)&&!G.has(A)&&(G.add(A),O.subscribeList("tab:issues",u).then(P=>{Ee=P,N=c}).catch(P=>{e("subscribe issues failed: %o",P),q(P,"issues list")}).finally(()=>{G.delete(A)})),J&&!Oe&&!G.has("tab:issues:resolved")){try{B.register("tab:issues:resolved",{type:"resolved-issues"})}catch(P){e("register issues:resolved store failed: %o",P)}G.add("tab:issues:resolved"),O.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(P=>Oe=P).catch(P=>{e("subscribe issues resolved failed: %o",P),q(P,"issues list (Resolved)")}).finally(()=>{G.delete("tab:issues:resolved")})}if(se&&!Me&&!G.has("tab:issues:deferred")){try{B.register("tab:issues:deferred",{type:"deferred-issues"})}catch(P){e("register issues:deferred store failed: %o",P)}G.add("tab:issues:deferred"),O.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(P=>Me=P).catch(P=>{e("subscribe issues deferred failed: %o",P),q(P,"issues list (Deferred)")}).finally(()=>{G.delete("tab:issues:deferred")})}if(!J&&Oe){Oe().catch(()=>{}),Oe=null;try{B.unregister("tab:issues:resolved")}catch(P){e("unregister issues:resolved failed: %o",P)}}if(!se&&Me){Me().catch(()=>{}),Me=null;try{B.unregister("tab:issues:deferred")}catch(P){e("unregister issues:deferred failed: %o",P)}}}else if(Ee){Ee().catch(()=>{}),Ee=null,N=null;try{B.unregister("tab:issues")}catch(u){e("unregister issues store failed: %o",u)}if(Oe){Oe().catch(()=>{}),Oe=null;try{B.unregister("tab:issues:resolved")}catch(u){e("unregister issues:resolved failed: %o",u)}}if(Me){Me().catch(()=>{}),Me=null;try{B.unregister("tab:issues:deferred")}catch(u){e("unregister issues:deferred failed: %o",u)}}}if(y.view==="worker"){try{B.register("tab:worker:all",{type:"all-issues"})}catch(u){e("register worker store failed: %o",u)}!tt&&!G.has("tab:worker:all")&&(G.add("tab:worker:all"),O.subscribeList("tab:worker:all",{type:"all-issues"}).then(u=>{tt=u}).catch(u=>{e("subscribe worker failed: %o",u),q(u,"worker")}).finally(()=>{G.delete("tab:worker:all")}))}else if(tt){tt().catch(()=>{}),tt=null;try{B.unregister("tab:worker:all")}catch(u){e("unregister worker store failed: %o",u)}}if(y.view==="epics"){try{B.register("tab:epics",{type:"epics"})}catch(u){e("register epics store failed: %o",u)}!Pe&&!G.has("tab:epics")&&(G.add("tab:epics"),O.subscribeList("tab:epics",{type:"epics"}).then(u=>{Pe=u}).catch(u=>{e("subscribe epics failed: %o",u),q(u,"epics")}).finally(()=>{G.delete("tab:epics")}))}else if(Pe){Pe().catch(()=>{}),Pe=null;try{B.unregister("tab:epics")}catch(u){e("unregister epics store failed: %o",u)}}if(y.view==="board"){if(!qe&&!G.has("tab:board:ready")){try{B.register("tab:board:ready",{type:"ready-issues"})}catch(u){e("register board:ready store failed: %o",u)}G.add("tab:board:ready"),O.subscribeList("tab:board:ready",{type:"ready-issues"}).then(u=>qe=u).catch(u=>{e("subscribe board ready failed: %o",u),q(u,"board (Ready)")}).finally(()=>{G.delete("tab:board:ready")})}if(!je&&!G.has("tab:board:in-progress")){try{B.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(u){e("register board:in-progress store failed: %o",u)}G.add("tab:board:in-progress"),O.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(u=>je=u).catch(u=>{e("subscribe board in-progress failed: %o",u),q(u,"board (In Progress)")}).finally(()=>{G.delete("tab:board:in-progress")})}if(!rt&&!G.has("tab:board:deferred")){try{B.register("tab:board:deferred",{type:"deferred-issues"})}catch(u){e("register board:deferred store failed: %o",u)}G.add("tab:board:deferred"),O.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(u=>rt=u).catch(u=>{e("subscribe board deferred failed: %o",u),q(u,"board (Deferred)")}).finally(()=>{G.delete("tab:board:deferred")})}if(!Fe&&!G.has("tab:board:resolved")){try{B.register("tab:board:resolved",{type:"resolved-issues"})}catch(u){e("register board:resolved store failed: %o",u)}G.add("tab:board:resolved"),O.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(u=>Fe=u).catch(u=>{e("subscribe board resolved failed: %o",u),q(u,"board (Resolved)")}).finally(()=>{G.delete("tab:board:resolved")})}if(!st&&!G.has("tab:board:closed")){try{B.register("tab:board:closed",{type:"closed-issues"})}catch(u){e("register board:closed store failed: %o",u)}G.add("tab:board:closed"),O.subscribeList("tab:board:closed",{type:"closed-issues"}).then(u=>st=u).catch(u=>{e("subscribe board closed failed: %o",u),q(u,"board (Closed)")}).finally(()=>{G.delete("tab:board:closed")})}if(!Ue&&!G.has("tab:board:blocked")){try{B.register("tab:board:blocked",{type:"blocked-issues"})}catch(u){e("register board:blocked store failed: %o",u)}G.add("tab:board:blocked"),O.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(u=>Ue=u).catch(u=>{e("subscribe board blocked failed: %o",u),q(u,"board (Blocked)")}).finally(()=>{G.delete("tab:board:blocked")})}}else{if(qe){qe().catch(()=>{}),qe=null;try{B.unregister("tab:board:ready")}catch(u){e("unregister board:ready failed: %o",u)}}if(je){je().catch(()=>{}),je=null;try{B.unregister("tab:board:in-progress")}catch(u){e("unregister board:in-progress failed: %o",u)}}if(rt){rt().catch(()=>{}),rt=null;try{B.unregister("tab:board:deferred")}catch(u){e("unregister board:deferred failed: %o",u)}}if(Fe){Fe().catch(()=>{}),Fe=null;try{B.unregister("tab:board:resolved")}catch(u){e("unregister board:resolved failed: %o",u)}}if(st){st().catch(()=>{}),st=null;try{B.unregister("tab:board:closed")}catch(u){e("unregister board:closed failed: %o",u)}}if(Ue){Ue().catch(()=>{}),Ue=null;try{B.unregister("tab:board:blocked")}catch(u){e("unregister board:blocked failed: %o",u)}}}};var p=q,h=K,b=X,m=te,w=W,g=vt,k=nt,R=zt,F=_t;let v=document.getElementById("header-loading"),x=pn(v),E=eo(t),j=To(),M=x.wrapSend((y,u)=>j.send(y,u)),O=nn(M),B=on();j.on("snapshot",y=>{let u=y,D=u&&typeof u.id=="string"?u.id:"",J=D?B.getStore(D):null;if(J&&u&&u.type==="snapshot")try{J.applyPush(u)}catch{}}),j.on("upsert",y=>{let u=y,D=u&&typeof u.id=="string"?u.id:"",J=D?B.getStore(D):null;if(J&&u&&u.type==="upsert")try{J.applyPush(u)}catch{}}),j.on("delete",y=>{let u=y,D=u&&typeof u.id=="string"?u.id:"",J=D?B.getStore(D):null;if(J&&u&&u.type==="delete")try{J.applyPush(u)}catch{}});let de=Tt(B),ce=null,Le=null,Se=null,we=null,S=()=>{},L=new Promise(y=>{S=()=>y(void 0)}),ee=!1,oe=!1;async function ke(y){let u=K(y);if(u===Le||u===Se)return;Se=u;let D=`detail:${y}`,J={type:"issue-detail",params:{id:y}};try{B.register(D,J)}catch(se){e("register detail store failed: %o",se)}try{let se=await O.subscribeList(D,J);if(Y.getState().selected_id!==y||K(y)!==u){await se().catch(()=>{});return}ce&&await ce().catch(()=>{}),ce=se,Le=u}catch(se){e("detail subscribe failed: %o",se),q(se,"issue details")}finally{Se===u&&(Se=null)}}async function T(){e("clearing all subscriptions for workspace switch"),Ee&&(Ee().catch(()=>{}),Ee=null),Me&&(Me().catch(()=>{}),Me=null),Pe&&(Pe().catch(()=>{}),Pe=null),qe&&(qe().catch(()=>{}),qe=null),je&&(je().catch(()=>{}),je=null),rt&&(rt().catch(()=>{}),rt=null),Oe&&(Oe().catch(()=>{}),Oe=null),tt&&(tt().catch(()=>{}),tt=null),Fe&&(Fe().catch(()=>{}),Fe=null),st&&(st().catch(()=>{}),st=null),Ue&&(Ue().catch(()=>{}),Ue=null);let y=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let J of y)try{B.unregister(J)}catch{}X();let u=Y.getState();if(u.selected_id)try{B.unregister(`detail:${u.selected_id}`)}catch{}N=null;let D=Y.getState();_t(D),D.selected_id&&te(D.selected_id)}async function $(y){e("requesting workspace switch to %s",y),oe=!0;try{let u=await j.send("set-workspace",{path:y});e("workspace switch result: %o",u),u&&u.workspace&&(Y.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",y),u.changed&&(await T(),Q("Switched to "+W(y),"success",2e3)))}catch(u){throw e("workspace switch failed: %o",u),Q("Failed to switch workspace","error",3e3),u}finally{oe=!1}}async function H(y){e("requesting workspace sync for %s",y);try{let u=await j.send("sync-workspace",{});if(e("workspace sync result: %o",u),u?.workspace&&Y.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),u?.pulled===!0&&u?.pushed===!1){let D=u?.push_error?`: ${u.push_error}`:"";Q(`Pulled, but push failed${D}`,"warning",4e3);return}Q("Synced "+W(y),"success",2e3)}catch(u){e("workspace sync failed: %o",u);let D=u?.code,J=u?.message;if(D==="busy"){Q("Sync skipped: another operation is running","warning",3e3);return}let se=J?`: ${J}`:"";throw Q(`Sync failed${se}`,"error",3e3),u}}async function V(y){e("requesting workspace git pull for %s",y);try{let u=await j.send("git-pull-workspace",{});e("workspace git pull result: %o",u);let D=u?.status;if(D==="up_to_date"){Q("Already up to date","success",2e3);return}if(D==="stash_pop_conflict"){Q("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Q("Git pulled "+W(y),"success",2e3)}catch(u){e("workspace git pull failed: %o",u);let D=u?.code,J=u?.message;if(D==="rebase_conflict"){Q("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(D==="rebase_conflict_abort_failed"){Q("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(D==="busy"){Q("Git pull skipped: another operation is running","warning",3e3);return}let se=J?`: ${J}`:"";throw Q(`Git pull failed${se}`,"error",3e3),u}}async function ie(){try{let y=await j.send("list-workspaces",{});if(e("workspaces loaded: %o",y),y&&Array.isArray(y.workspaces)){let u=y.workspaces.map(c=>({path:c.path,database:c.database,pid:c.pid,version:c.version})),D=y.current?{path:y.current.root_dir,database:y.current.db_path}:null;Y.setState({workspace:{current:D,available:u}});let J=Y.getState().config.workspace_config.default_workspace,se=window.localStorage.getItem("beads-ui.workspace");if(J&&D?.path===J){window.localStorage.setItem("beads-ui.workspace",J);return}se&&D&&se!==D.path&&(u.some(A=>A.path===se)?(e("restoring saved workspace preference: %s",se),await $(se)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(y){e("failed to load workspaces: %o",y)}}j.on("workspace-changed",y=>{e("workspace-changed event: %o",y),y&&y.root_dir&&(Y.setState({workspace:{current:{path:y.root_dir,database:y.db_path}}}),ie(),T())});let pe=!1;if(typeof j.onConnection=="function"){let y=u=>{e("ws state %s",u),u==="reconnecting"||u==="closed"?(pe=!0,Q("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&pe&&(pe=!1,Q("Reconnected","success",2200),Ua(Y,(D,J)=>{e(`${D}: %o`,J)}))};j.onConnection(y)}let be={status:"all",search:"",type:""};try{let y=window.localStorage.getItem("beads-ui.filters");if(y){let u=JSON.parse(y);if(u&&typeof u=="object"){let D=["bug","feature","task","epic","chore"],J="";if(typeof u.type=="string"&&D.includes(u.type))J=u.type;else if(Array.isArray(u.types)){let se="";for(let c of u.types)if(D.includes(String(c))){se=c;break}J=se}be={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(u.status)?u.status:"all",search:typeof u.search=="string"?u.search:"",type:J}}}}catch(y){e("filters parse error: %o",y)}let ae="issues";try{let y=window.localStorage.getItem("beads-ui.view");(y==="issues"||y==="epics"||y==="board"||y==="worker")&&(ae=y)}catch(y){e("view parse error: %o",y)}let Ae={closed_filter:"today",show_deferred_column:!1};try{let y=window.localStorage.getItem("beads-ui.board");if(y){let u=JSON.parse(y);if(u&&typeof u=="object"){let D=String(u.closed_filter||"today");(D==="today"||D==="3"||D==="7")&&(Ae.closed_filter=D)}}}catch(y){e("board prefs parse error: %o",y)}let Y=un({config:Fa(),filters:be,view:ae,board:Ae}),ve=an(Y);ve.start();let Te=async(y,u)=>{try{return await M(y,u)}catch{return[]}};s&&so(s,Y,ve);let He=document.getElementById("workspace-picker");He&&So(He,Y,$,H,V);let Re=no(t,(y,u)=>M(y,u),ve,Y);try{let y=document.getElementById("new-issue-btn");y&&y.addEventListener("click",()=>Re.open())}catch{}let Ye=ro(a,async(y,u)=>{if(y==="list-issues")try{return de.selectIssuesFor("tab:issues")}catch(D){return e("list selectors failed: %o",D),[]}return Te(y,u)},y=>{let u=Ar(y);u&&ve.gotoIssue(u)},Y,O,B);Y.subscribe(y=>{let u={status:y.filters.status,search:y.filters.search,type:typeof y.filters.type=="string"?y.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(u))}),Y.subscribe(y=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:y.board.closed_filter}))}),Ye.load();let ye=to(d,Y,()=>{let y=Y.getState();Y.setState({selected_id:null});try{let u=y.view||"issues";ve.gotoView(u)}catch{}}),Qe=null;Qe=Xn(ye.getMount(),Te,y=>{let u=Ar(y);if(u)ve.gotoIssue(u);else{let D=Jt(y);ve.gotoView(D)}},B,Y);let kt=Y.getState().selected_id;kt&&(d.hidden=!1,ye.open(kt),Qe&&Qe.load(kt),te(kt)),Y.subscribe(y=>{let u=y.selected_id;if(u)d.hidden=!1,ye.open(u),Qe&&Qe.load(u),oe||te(u);else{try{ye.close()}catch{}Qe&&Qe.clear(),d.hidden=!0,X()}});let ht=sn(Te),gt=Qn(i,ht,y=>ve.gotoIssue(y),O,B,Y),pt=yn(o,ht,y=>ve.gotoIssue(y),Y,O,B,Te),Ze=[],bt=null;async function ft(){let y=Y.getState().workspace.current?.path;if(!y){Ze=[];return}try{let D=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(y)}`)).json();Ze=Array.isArray(D.items)?D.items:[]}catch{Ze=[]}}async function xt(){vt(),await ft(),et.load(),bt=setInterval(()=>{ft().then(()=>et.load())},3e3)}async function It(y,u){let D=Y.getState().workspace.current?.path;D&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:y,workspace:D,issueId:u.issueId,prNumber:u.prNumber})}),await ft(),et.load())}async function St(y){let u=Y.getState().workspace.current?.path;u&&(await fetch(`/api/worker/jobs/${encodeURIComponent(y)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:u})}),await ft(),et.load())}let et=vo(l,{store:Y,issue_stores:B,fetch_impl:fetch,getWorkerJobs:()=>Ze,onRunRalph:y=>{It("bd-ralph",{issueId:y})},onRunPrReview:y=>{It("pr-review",{issueId:typeof y=="string"?y:y?.issueId??void 0,prNumber:typeof y=="object"&&typeof y?.prNumber=="number"?y.prNumber:void 0})},onCancelJob:y=>{St(y)}}),Ee=null,Pe=null,Oe=null,Me=null,tt=null,qe=null,je=null,rt=null,Fe=null,st=null,Ue=null,G=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(G),getActivityCount:()=>x.getCount(),getActiveRequests:()=>x.getActiveRequests()};let N=null,Lt=y=>{n&&i&&o&&l&&d&&(n.hidden=y.view!=="issues",i.hidden=y.view!=="epics",o.hidden=y.view!=="board",l.hidden=y.view!=="worker"),_t(y),!y.selected_id&&y.view==="epics"&&gt.load(),!y.selected_id&&y.view==="board"&&pt.load(),y.view==="worker"?(xt(),et.load()):vt(),window.localStorage.setItem("beads-ui.view",y.view)};Y.subscribe(Lt),Lt(Y.getState()),ie().finally(()=>{ee=!0,S()}),window.addEventListener("keydown",y=>{let u=y.ctrlKey||y.metaKey,D=String(y.key||"").toLowerCase(),J=y.target,se=J&&J.tagName?String(J.tagName).toLowerCase():"",c=se==="input"||se==="textarea"||se==="select"||J&&typeof J.isContentEditable=="boolean"&&J.isContentEditable;u&&D==="n"&&(c||(y.preventDefault(),Re.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ba(e)});export{Ba as bootstrap,Fa as readBootstrapConfig,Ua as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
