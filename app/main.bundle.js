var To=Object.create;var Vr=Object.defineProperty;var Eo=Object.getOwnPropertyDescriptor;var Co=Object.getOwnPropertyNames;var Ro=Object.getPrototypeOf,Io=Object.prototype.hasOwnProperty;var Lo=(t,e,r)=>e in t?Vr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Jr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Do=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Co(e))!Io.call(t,n)&&n!==r&&Vr(t,n,{get:()=>e[n],enumerable:!(s=Eo(e,n))||s.enumerable});return t};var No=(t,e,r)=>(r=t!=null?To(Ro(t)):{},Do(e||!t||!t.__esModule?Vr(r,"default",{value:t,enumerable:!0}):r,t));var he=(t,e,r)=>Lo(t,typeof e!="symbol"?e+"":e,r);var Ys=Jr((Wa,Ks)=>{var Ft=1e3,Bt=Ft*60,Ut=Bt*60,It=Ut*24,Bo=It*7,Uo=It*365.25;Ks.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return zo(t);if(r==="number"&&isFinite(t))return e.long?qo(t):Ho(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*Bo;case"days":case"day":case"d":return r*It;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Ut;case"minutes":case"minute":case"mins":case"min":case"m":return r*Bt;case"seconds":case"second":case"secs":case"sec":case"s":return r*Ft;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ho(t){var e=Math.abs(t);return e>=It?Math.round(t/It)+"d":e>=Ut?Math.round(t/Ut)+"h":e>=Bt?Math.round(t/Bt)+"m":e>=Ft?Math.round(t/Ft)+"s":t+"ms"}function qo(t){var e=Math.abs(t);return e>=It?_r(t,e,It,"day"):e>=Ut?_r(t,e,Ut,"hour"):e>=Bt?_r(t,e,Bt,"minute"):e>=Ft?_r(t,e,Ft,"second"):t+" ms"}function _r(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var Xs=Jr((Ga,Zs)=>{function jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=l,r.humanize=Ys(),r.destroy=c,Object.keys(t).forEach(p=>{r[p]=t[p]}),r.names=[],r.skips=[],r.formatters={};function e(p){let h=0;for(let b=0;b<p.length;b++)h=(h<<5)-h+p.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(p){let h,b=null,_,k;function g(...x){if(!g.enabled)return;let T=g,M=Number(new Date),w=M-(h||M);T.diff=w,T.prev=h,T.curr=M,h=M,x[0]=r.coerce(x[0]),typeof x[0]!="string"&&x.unshift("%O");let v=0;x[0]=x[0].replace(/%([a-zA-Z%])/g,(F,N)=>{if(F==="%%")return"%";v++;let O=r.formatters[N];if(typeof O=="function"){let V=x[v];F=O.call(T,V),x.splice(v,1),v--}return F}),r.formatArgs.call(T,x),(T.log||r.log).apply(T,x)}return g.namespace=p,g.useColors=r.useColors(),g.color=r.selectColor(p),g.extend=s,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(_!==r.namespaces&&(_=r.namespaces,k=r.enabled(p)),k),set:x=>{b=x}}),typeof r.init=="function"&&r.init(g),g}function s(p,h){let b=r(this.namespace+(typeof h>"u"?":":h)+p);return b.log=this.log,b}function n(p){r.save(p),r.namespaces=p,r.names=[],r.skips=[];let h=(typeof p=="string"?p:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(p,h){let b=0,_=0,k=-1,g=0;for(;b<p.length;)if(_<h.length&&(h[_]===p[b]||h[_]==="*"))h[_]==="*"?(k=_,g=b,_++):(b++,_++);else if(k!==-1)_=k+1,g++,b=g;else return!1;for(;_<h.length&&h[_]==="*";)_++;return _===h.length}function o(){let p=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),p}function l(p){for(let h of r.skips)if(i(p,h))return!1;for(let h of r.names)if(i(p,h))return!0;return!1}function a(p){return p instanceof Error?p.stack||p.message:p}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Zs.exports=jo});var Qs=Jr((et,mr)=>{et.formatArgs=Go;et.save=Vo;et.load=Jo;et.useColors=Wo;et.storage=Ko();et.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();et.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Wo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Go(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+mr.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}et.log=console.debug||console.log||(()=>{});function Vo(t){try{t?et.storage.setItem("debug",t):et.storage.removeItem("debug")}catch{}}function Jo(){let t;try{t=et.storage.getItem("debug")||et.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}mr.exports=Xs()(et);var{formatters:Yo}=mr.exports;Yo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Gt=globalThis,yr=Gt.trustedTypes,Fs=yr?yr.createPolicy("lit-html",{createHTML:t=>t}):void 0,js="$lit$",mt=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+mt,Po=`<${Ws}>`,Ct=document,Vt=()=>Ct.createComment(""),Jt=t=>t===null||typeof t!="object"&&typeof t!="function",ts=Array.isArray,Oo=t=>ts(t)||typeof t?.[Symbol.iterator]=="function",Kr=`[ 	
\f\r]`,Wt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Us=/>/g,Tt=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zs=/'/g,Hs=/"/g,Gs=/^(?:script|style|textarea|title)$/i,rs=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),y=rs(1),Ba=rs(2),Ua=rs(3),Rt=Symbol.for("lit-noChange"),Ae=Symbol.for("lit-nothing"),qs=new WeakMap,Et=Ct.createTreeWalker(Ct,129);function Vs(t,e){if(!ts(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fs!==void 0?Fs.createHTML(e):e}var Mo=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=Wt;for(let l=0;l<r;l++){let a=t[l],c,p,h=-1,b=0;for(;b<a.length&&(o.lastIndex=b,p=o.exec(a),p!==null);)b=o.lastIndex,o===Wt?p[1]==="!--"?o=Bs:p[1]!==void 0?o=Us:p[2]!==void 0?(Gs.test(p[2])&&(n=RegExp("</"+p[2],"g")),o=Tt):p[3]!==void 0&&(o=Tt):o===Tt?p[0]===">"?(o=n??Wt,h=-1):p[1]===void 0?h=-2:(h=o.lastIndex-p[2].length,c=p[1],o=p[3]===void 0?Tt:p[3]==='"'?Hs:zs):o===Hs||o===zs?o=Tt:o===Bs||o===Us?o=Wt:(o=Tt,n=void 0);let _=o===Tt&&t[l+1].startsWith("/>")?" ":"";i+=o===Wt?a+Po:h>=0?(s.push(c),a.slice(0,h)+js+a.slice(h)+mt+_):a+mt+(h===-2?l:_)}return[Vs(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Kt=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[c,p]=Mo(e,r);if(this.el=t.createElement(c,s),Et.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=Et.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(js)){let b=p[o++],_=n.getAttribute(h).split(mt),k=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:k[2],strings:_,ctor:k[1]==="."?Zr:k[1]==="?"?Xr:k[1]==="@"?Qr:Ot}),n.removeAttribute(h)}else h.startsWith(mt)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Gs.test(n.tagName)){let h=n.textContent.split(mt),b=h.length-1;if(b>0){n.textContent=yr?yr.emptyScript:"";for(let _=0;_<b;_++)n.append(h[_],Vt()),Et.nextNode(),a.push({type:2,index:++i});n.append(h[b],Vt())}}}else if(n.nodeType===8)if(n.data===Ws)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(mt,h+1))!==-1;)a.push({type:7,index:i}),h+=mt.length-1}i++}}static createElement(e,r){let s=Ct.createElement("template");return s.innerHTML=e,s}};function Pt(t,e,r=t,s){if(e===Rt)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=Jt(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=Pt(t,n._$AS(t,e.values),n,s)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??Ct).importNode(r,!0);Et.currentNode=n;let i=Et.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let c;a.type===2?c=new Yt(i,i.nextSibling,this,e):a.type===1?c=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(c=new es(i,this,e)),this._$AV.push(c),a=s[++l]}o!==a?.index&&(i=Et.nextNode(),o++)}return Et.currentNode=Ct,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},Yt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=Ae,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Pt(this,e,r),Jt(e)?e===Ae||e==null||e===""?(this._$AH!==Ae&&this._$AR(),this._$AH=Ae):e!==this._$AH&&e!==Rt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ae&&Jt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ct.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Kt.createElement(Vs(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Yr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=qs.get(e.strings);return r===void 0&&qs.set(e.strings,r=new Kt(e)),r}k(e){ts(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Vt()),this.O(Vt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ot=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=Ae,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Ae}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=Pt(this,e,r,0),o=!Jt(e)||e!==this._$AH&&e!==Rt,o&&(this._$AH=e);else{let l=e,a,c;for(e=i[0],a=0;a<i.length-1;a++)c=Pt(this,l[s+a],r,a),c===Rt&&(c=this._$AH[a]),o||(o=!Jt(c)||c!==this._$AH[a]),c===Ae?e=Ae:e!==Ae&&(e+=(c??"")+i[a+1]),this._$AH[a]=c}o&&!n&&this.j(e)}j(e){e===Ae?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Zr=class extends Ot{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ae?void 0:e}},Xr=class extends Ot{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ae)}},Qr=class extends Ot{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Pt(this,e,r,0)??Ae)===Rt)return;let s=this._$AH,n=e===Ae&&s!==Ae||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==Ae&&(s===Ae||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},es=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Pt(this,e)}};var Fo=Gt.litHtmlPolyfillSupport;Fo?.(Kt,Yt),(Gt.litHtmlVersions??(Gt.litHtmlVersions=[])).push("3.3.1");var me=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new Yt(e.insertBefore(Vt(),i),i,void 0,r??{})}return n._$AI(t),n};function Js(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function ot(t,e){let r=Js(t.created_at),s=Js(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Mt(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function wt(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(ot)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(ot):o==="closed"?l.sort(Mt):l.sort(ot),l}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(c=>String(c?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(ot)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var en=No(Qs(),1);function ge(t){return(0,en.default)(`beads-ui:${t}`)}function tn(t){let e=ge("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function ss(t,e={}){let r=ge(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,l=!1,a=e.sort||ot;function c(){for(let b of Array.from(o))try{b()}catch{}}function p(){n=Array.from(s.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let _=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,_),!(_<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(_<=i)return;s.clear();let k=Array.isArray(b.issues)?b.issues:[];for(let g of k)g&&typeof g.id=="string"&&g.id.length>0&&s.set(g.id,g);p(),i=_,c();return}if(b.type==="upsert"){let k=b.issue;if(k&&typeof k.id=="string"&&k.id.length>0){let g=s.get(k.id);if(!g)s.set(k.id,k);else{let x=Number.isFinite(g.updated_at)?g.updated_at:0,T=Number.isFinite(k.updated_at)?k.updated_at:0;if(x<=T){for(let M of Object.keys(g))M in k||delete g[M];for(let[M,w]of Object.entries(k))g[M]=w}}p()}i=_,c()}else if(b.type==="delete"){let k=String(b.issue_id||"");k&&(s.delete(k),p()),i=_,c()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(b){return s.get(b)},dispose(){l=!0,s.clear(),n=[],o.clear(),i=0}}}function wr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function rn(t){let e=ge("subs"),r=new Map,s=new Map;function n(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let c=s.get(l);if(!c||c.size===0)return;let p=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(c)){let k=r.get(_);if(!k)continue;let g=k.itemsById;for(let x of p)typeof x=="string"&&x.length>0&&g.set(x,!0);for(let x of h)typeof x=="string"&&x.length>0&&g.set(x,!0);for(let x of b)typeof x=="string"&&x.length>0&&g.delete(x)}}async function i(l,a){let c=wr(a);if(e("subscribe %s key=%s",l,c),!r.has(l))r.set(l,{key:c,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==c){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key)),r.set(l,{key:c,itemsById:new Map})}}s.has(c)||s.set(c,new Set);let p=s.get(c);p&&p.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let _=s.get(b.key);_&&(_.delete(l),_.size===0&&s.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,c);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:wr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let c=r.get(l);return c?c.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),c={};if(!a)return c;for(let p of a.itemsById.keys())c[p]=!0;return c}}}}function sn(){let t=ge("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,c,p){let h=c?wr(c):"",b=r.get(a)||"",_=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),_&&b&&h&&b!==h){let k=e.get(a);if(k)try{k.dispose()}catch{}let g=n.get(a);if(g){try{g()}catch{}n.delete(a)}let x=ss(a,p);e.set(a,x);let T=x.subscribe(()=>i());n.set(a,T)}else if(!_){let k=ss(a,p);e.set(a,k);let g=k.subscribe(()=>i());n.set(a,g)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let c=e.get(a);c&&(c.dispose(),e.delete(a));let p=n.get(a);if(p){try{p()}catch{}n.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let c=e.get(a);return c?c.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function kt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function kr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let l=new URLSearchParams(n).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function zt(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function nn(t){let e=ge("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let l=decodeURIComponent(n[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=kr(s),o=zt(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=kt(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?kt(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var vr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),Zo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function on(t){return JSON.parse(JSON.stringify(t))}function ns(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function an(t){if(!ns(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!ns(s)||typeof s.fg!="string"||!Zo.test(s.fg)||(e[r]={fg:s.fg});return e}function Xo(t){return ns(t)?{prefix:an(t.prefix),exact:an(t.exact)}:{prefix:{},exact:{}}}function ln(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Xo(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?on(t.detail):on(vr.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):vr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}:{label_display_policy:{visible_prefixes:vr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):vr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}}function cn(t={}){let e=ge("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:ln(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?ln(i.config):r.config},l=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((c,p)=>c!==r.config.label_display_policy.visible_prefixes[p])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((c,p)=>c!==r.config.label_display_policy.visible_exact[p])||JSON.stringify(o.config.label_display_policy.colors)!==JSON.stringify(r.config.label_display_policy.colors)||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((c,p)=>c===r.worker.show_closed_children[p])&&!l&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function dn(t){let e=ge("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let c=r>0;t.toggleAttribute("hidden",!c),t.setAttribute("aria-busy",c?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let c=r;r=Math.max(0,r-1),c<=0?e("done called but count was already %d",c):e("done count=%d\u2192%d",c,r),i()}function a(c){return async(h,b)=>{let _=n++,k=Date.now();s.set(_,{type:h,start_ts:k}),e("request start id=%d type=%s count=%d",_,h,r+1),o();let g=!1,x=()=>{g||(g=!0,s.delete(_),l())},T=setTimeout(()=>{g||(e("request TIMEOUT id=%d type=%s elapsed=%dms",_,h,Date.now()-k),x())},3e4);try{let M=await c(h,b),w=Date.now()-k;return e("request done id=%d type=%s elapsed=%dms",_,h,w),M}catch(M){let w=Date.now()-k;throw e("request error id=%d type=%s elapsed=%dms err=%o",_,h,w,M),M}finally{clearTimeout(T),x()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let c=Date.now();return Array.from(s.entries()).map(([p,h])=>({id:p,type:h.type,elapsed_ms:c-h.start_ts}))}}}function Z(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="warning"?s.style.background="#a36a00":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function vt(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=s.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}var Qo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function xr(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function pn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function un(t){return!pn(t)||typeof t.fg!="string"?null:Qo.test(t.fg)?t.fg:null}function ei(t,e){let r=un(e?.exact?.[t]);if(r)return r;let s=e?.prefix;if(!pn(s))return null;let n="",i=null;for(let[o,l]of Object.entries(s)){let a=un(l);a&&t.startsWith(o)&&o.length>n.length&&(n=o,i=a)}return i}function Sr(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let s=null;t.startsWith("has:")?s="has":t.startsWith("reviewed:")?s="reviewed":t==="pr"&&(s="pr"),s&&r.classList.add(`label-badge--${s}`);let n=ei(t,e);return n&&r.style.setProperty("--label-badge-fg",n),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var xt=["Critical","High","Medium","Low","Backlog"];function fn(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=ti(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=Zt(e)+" "+s,r}function ti(t){let e=Math.max(0,Math.min(4,t));return xt[e]||"Medium"}function Zt(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Ar(t){let e=hn(t);return e===null?"":new Date(e).toISOString()}function $r(t,e){let r=hn(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(n/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let c=Math.floor(l/30);return c<12?`${c}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function Lt(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var Xt=["quick_edit","spec_backed","plan"],is=["current","worktree"],as=["same","feature"],ls=["direct","pr"],Qt=["light","standard","deep"],cs="Default (standard)",ri=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],si={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},os={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},ni=["spec","plan","impl"];function qe(t){return typeof t!="string"?"":t.trim()}function Er(t){return typeof t=="number"&&Number.isFinite(t)?String(t):qe(t)}function ds(t){let e=qe(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function Ht(t){let e=qe(t.workspace_policy),r=qe(t.branch_policy),s=qe(t.finish_action),n=!!(e||r||s);for(let i of ri)if(e===i.workspace_policy&&r===i.branch_policy&&s===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function oi(t){let e=qe(t.review_profile);return e?Qt.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:cs}}function us(t,e,r,s,n){let i=qe(t),o=qe(e),l=qe(r),a=qe(s),c=n===null?"":qe(n);return!Xt.includes(i)||Ht({workspace_policy:o,branch_policy:l,finish_action:a}).kind!=="valid"||c&&!Qt.includes(c)?null:{execution_lane:i,workspace_policy:o,branch_policy:l,finish_action:a,review_profile:c||null}}function St(t,e,r={}){return{id:t,label:r.label||os[t]||t,value:Er(e),kind:r.kind||"value",href:r.href}}function ii(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ai(t,e,r,s,n){switch(t){case"workflow_settings":return li(e,s);case"artifacts":return ci(e,r,s);case"review_gates":return di(e,s,n);case"delivery":return pi(e,s);case"freshness":case"followup":case"human":return fi(e,s);default:return[]}}function Tr(t,e,r,s=!1){return r.includes(e)&&!s?St(t,e):e?St(t,e,{kind:"invalid"}):null}function li(t,e){let r=[],n=Ht(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=Tr(i,qe(e.execution_lane),Xt);o&&r.push(o);continue}if(i==="workspace_policy"){let o=Tr(i,qe(e.workspace_policy),is,n);o&&r.push(o);continue}if(i==="branch_policy"){let o=Tr(i,qe(e.branch_policy),as,n);o&&r.push(o);continue}if(i==="finish_action"){let o=Tr(i,qe(e.finish_action),ls,n);o&&r.push(o);continue}if(i==="review_profile"){let o=oi(e);r.push(St(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function ci(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Er(n[i]);o&&s.push(St(i,o,{kind:"artifact"}))}return s}function di(t,e,r){let s=[];for(let n of ni)for(let i of t){let o=ui(n,i,e,r);o&&s.push(o)}return s}function ui(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let p=`reviewed:${t}`;return s.includes(p)?St(`${t}_${e}`,p,{label:`${t} ${os[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],c=a?Er(r[a]):"";return c?St(`${t}_${e}`,c,{label:`${t} ${os[e]||e}`}):null}function pi(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=ds(e.pr_url);n&&r.push(St(s,"PR",{kind:"link",href:n.href}))}return r}function fi(t,e){let r=[];for(let s of t){let n=Er(e[s]);n&&r.push(St(s,n))}return r}function gn(t,e){let r=ii(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],c=ai(o,l,t,r,s);c.length>0&&i.push({id:o,label:si[o]||o,rows:c,editable_fields:a})}return i}var hi={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},gi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function bn(t,e,r,s,n=void 0,i=void 0,o=void 0){let l=ge("views:board"),a=[],c=[],p=[],h=[],b=[],_=[],k=[],g=i?wt(i):null;function x(E){return String(E.status||"open")==="open"}let T="today",M=!1;if(s)try{let E=s.getState(),A=E&&E.board?String(E.board.closed_filter||"today"):"today";(A==="today"||A==="3"||A==="7")&&(T=A),M=E?.board?.show_deferred_column===!0}catch{}function w(){let E=s?.getState?.().config?.label_display_policy,A=E?.visible_prefixes,U=E?.visible_exact,z=E?.colors;return{visible_prefixes:Array.isArray(A)?A:["has:","reviewed:"],visible_exact:Array.isArray(U)?U:[],colors:z&&typeof z=="object"?z:{prefix:{},exact:{}}}}function v(E){return Array.isArray(E.labels)?E.labels.filter(A=>A!=="pr"):[]}function R(E){let A=E.metadata||{},U=[],z=A.execution_lane||"",W=hi[z];W&&U.push({kind:"lane",text:W});let re=Ht(A);return re.kind==="valid"&&U.push({kind:"route",text:re.label}),ds(A.pr_url)&&U.push({kind:"delivery",text:"PR"}),U}function F(){let E=b.length;return y`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${M?"is-active":""}"
            type="button"
            aria-pressed=${M?"true":"false"}
            @click=${Y}
          >
            Deferred (${E})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${M?6:5}`}
        >
          ${N("Blocked","blocked-col",c)}
          ${N("Ready","ready-col",a)}
          ${N("In Progress","in-progress-col",p)}
          ${M?N("Deferred","deferred-col",b):""}
          ${N("Resolved","resolved-col",h)}
          ${N("Closed","closed-col",_)}
        </div>
      </div>
    `}function N(E,A,U){let z=Array.isArray(U)?U.length:0,W=z===1?"1 issue":`${z} issues`;return y`
      <section class="board-column" id=${A}>
        <header
          class="board-column__header"
          id=${A+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${E}</span>
            <span class="badge board-column__count" aria-label=${W}>
              ${z}
            </span>
          </div>
          ${A==="closed-col"?y`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${G}
                >
                  <option
                    value="today"
                    ?selected=${T==="today"}
                  >
                    Today
                  </option>
                  <option value="3" ?selected=${T==="3"}>
                    Last 3 days
                  </option>
                  <option value="7" ?selected=${T==="7"}>
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
          ${U.map(re=>O(re))}
        </div>
      </section>
    `}function O(E){let A=w(),U=R(E),z=xr(v(E),A.visible_prefixes,A.visible_exact);return y`
      <article
        class="board-card"
        data-issue-id=${E.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${W=>ve(W,E.id)}
        @dragstart=${W=>ae(W,E.id)}
        @dragend=${we}
      >
        <div class="board-card__title text-truncate">
          ${E.title||"(no title)"}
        </div>
        ${U.length>0?y`<div class="board-card__workflow">
              ${U.map(W=>y`<span class="workflow-chip workflow-chip--${W.kind}"
                    >${W.text}</span
                  >`)}
            </div>`:""}
        ${z.length>0?y`<div class="board-card__labels">
              ${z.map(W=>Sr(W,A.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${Lt(E.issue_type)} ${fn(E.priority)}
          ${vt(E.id,{class_name:"mono"})}
          ${E.created_at?y`<span
                class="board-card__date"
                title=${Ar(E.created_at)}
                >${$r(E.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let V=null;function ve(E,A){V||r(A)}function ae(E,A){V=A,E.dataTransfer&&(E.dataTransfer.setData("text/plain",A),E.dataTransfer.effectAllowed="move"),E.target.classList.add("board-card--dragging"),l("dragstart %s",A)}function we(E){E.target.classList.remove("board-card--dragging"),Ce(),setTimeout(()=>{V=null},0),l("dragend")}function Ce(){let E=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let A of E)A.classList.remove("board-column--drag-over")}async function Re(E,A){if(!o){l("no transport available, status update skipped"),Z("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",E,A),await o("update-status",{id:E,status:A}),Z("Status updated","success",1500)}catch(U){l("update-status failed: %o",U),Z("Failed to update status","error")}}function be(){me(F(),t),S()}function S(){try{let E=Array.from(t.querySelectorAll(".board-column"));for(let A of E){let U=A.querySelector(".board-column__body");if(!U)continue;let z=Array.from(U.querySelectorAll(".board-card")),W=A.querySelector(".board-column__header"),re=W&&W.textContent?.trim()||"";for(let pe of z){let ye=pe.querySelector(".board-card__title"),le=ye&&ye.textContent?.trim()||"";pe.setAttribute("aria-label",`Issue ${le||"(no title)"} \u2014 Column ${re}`),pe.tabIndex=-1}z.length>0&&(z[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",E=>{let A=E.target;if(!A||!(A instanceof HTMLElement))return;let U=String(A.tagName||"").toLowerCase();if(U==="input"||U==="textarea"||U==="select"||A.isContentEditable===!0)return;let z=A.closest(".board-card");if(!z)return;let W=String(E.key||"");if(W==="Enter"||W===" "){E.preventDefault();let Se=z.getAttribute("data-issue-id");Se&&r(Se);return}if(W!=="ArrowUp"&&W!=="ArrowDown"&&W!=="ArrowLeft"&&W!=="ArrowRight")return;E.preventDefault();let re=z.closest(".board-column");if(!re)return;let pe=re.querySelector(".board-column__body");if(!pe)return;let ye=Array.from(pe.querySelectorAll(".board-card")),le=ye.indexOf(z);if(le!==-1){if(W==="ArrowDown"&&le<ye.length-1){X(ye[le],ye[le+1]);return}if(W==="ArrowUp"&&le>0){X(ye[le],ye[le-1]);return}if(W==="ArrowRight"||W==="ArrowLeft"){let Se=Array.from(t.querySelectorAll(".board-column")),Ie=Se.indexOf(re);if(Ie===-1)return;let $e=W==="ArrowRight"?1:-1,De=Ie+$e,Je=null;for(;De>=0&&De<Se.length;){let Le=Se[De],Ke=Le.querySelector(".board-column__body");if((Ke?Array.from(Ke.querySelectorAll(".board-card")):[]).length>0){Je=Le;break}De+=$e}if(Je){let Le=Je.querySelector(".board-column__body .board-card");Le&&X(z,Le)}return}}});let I=null;t.addEventListener("dragover",E=>{E.preventDefault(),E.dataTransfer&&(E.dataTransfer.dropEffect="move");let U=E.target.closest(".board-column");U&&U!==I&&(I&&I.classList.remove("board-column--drag-over"),U.classList.add("board-column--drag-over"),I=U)}),t.addEventListener("dragleave",E=>{let A=E.relatedTarget;(!A||!t.contains(A))&&I&&(I.classList.remove("board-column--drag-over"),I=null)}),t.addEventListener("drop",E=>{E.preventDefault(),I&&(I.classList.remove("board-column--drag-over"),I=null);let U=E.target.closest(".board-column");if(!U)return;let z=U.id,W=gi[z];if(!W){l("drop on unknown column: %s",z);return}let re=E.dataTransfer?.getData("text/plain");if(!re){l("drop without issue id");return}l("drop %s on %s \u2192 %s",re,z,W),Re(re,W)});function X(E,A){try{E.tabIndex=-1,A.tabIndex=0,A.focus()}catch{}}function H(){l("applyClosedFilter %s",T);let E=Array.isArray(k)?[...k]:[],A=new Date,U=0;T==="today"?U=new Date(A.getFullYear(),A.getMonth(),A.getDate(),0,0,0,0).getTime():T==="3"?U=A.getTime()-4320*60*1e3:T==="7"&&(U=A.getTime()-10080*60*1e3),E=E.filter(z=>{let W=Number.isFinite(z.closed_at)?z.closed_at:NaN;return Number.isFinite(W)?W>=U:!1}),E.sort(Mt),_=E}function G(E){try{let A=E.target,U=String(A.value||"today");if(T=U==="3"||U==="7"?U:"today",l("closed filter %s",T),s)try{s.setState({board:{closed_filter:T}})}catch{}H(),be()}catch{}}function Y(){if(M=!M,s)try{s.setState({board:{show_deferred_column:M}})}catch{}be()}function xe(){try{if(g){let E=g.selectBoardColumn("tab:board:in-progress","in_progress"),A=g.selectBoardColumn("tab:board:blocked","blocked"),U=g.selectBoardColumn("tab:board:ready","ready"),z=g.selectBoardColumn("tab:board:closed","closed"),W=g.selectBoardColumn("tab:board:deferred","deferred"),re=g.selectBoardColumn("tab:board:resolved","resolved"),pe=new Set(E.map(le=>le.id));a=U.filter(le=>x(le)&&!pe.has(le.id)),c=A.filter(le=>x(le)),p=E,b=W,h=re,k=z}H(),be()}catch{a=[],c=[],p=[],h=[],_=[],be()}}g&&g.subscribe(()=>{try{xe()}catch{}});let te=null;if(s?.subscribe){let E=JSON.stringify(w());te=s.subscribe(()=>{let A=JSON.stringify(w());A!==E&&(E=A,be())})}return{async load(){l("load"),xe();try{let E=!!(n&&n.selectors),A=re=>{if(!E||!n)return 0;let pe=n.selectors;if(typeof pe.count=="function")return Number(pe.count(re)||0);try{let ye=pe.getIds(re);return Array.isArray(ye)?ye.length:0}catch{return 0}},U=A("tab:board:ready")+A("tab:board:blocked")+A("tab:board:in-progress")+A("tab:board:deferred")+A("tab:board:resolved")+A("tab:board:closed"),z=e,W=z&&typeof z.getReady=="function"&&typeof z.getBlocked=="function"&&typeof z.getInProgress=="function"&&typeof z.getClosed=="function";if(U===0&&W){l("fallback fetch");let[re,pe,ye,le,Se]=await Promise.all([z.getReady().catch(()=>[]),z.getBlocked().catch(()=>[]),z.getInProgress().catch(()=>[]),(z.getResolved?.()??Promise.resolve([])).catch(()=>[]),z.getClosed().catch(()=>[])]),Ie=Array.isArray(re)?re.map(ce=>ce):[],$e=Array.isArray(pe)?pe.map(ce=>ce):[],De=Array.isArray(ye)?ye.map(ce=>ce):[],Je=Array.isArray(le)?le.map(ce=>ce):[],Le=Array.isArray(Se)?Se.map(ce=>ce):[],Ke=new Set(De.map(ce=>ce.id));Ie=Ie.filter(ce=>x(ce)&&!Ke.has(ce.id)),Ie.sort(ot);let Be=$e.filter(ce=>x(ce));Be.sort(ot),De.sort(ot),Je.sort(ot),a=Ie,c=Be,p=De,h=Je,k=Le,H(),be()}}catch{}},clear(){te&&(te(),te=null),t.replaceChildren(),a=[],c=[],p=[],h=[],_=[]}}}var{entries:An,setPrototypeOf:yn,isFrozen:bi,getPrototypeOf:yi,getOwnPropertyDescriptor:_i}=Object,{freeze:We,seal:it,create:_s}=Object,{apply:ms,construct:ws}=typeof Reflect<"u"&&Reflect;We||(We=function(e){return e});it||(it=function(e){return e});ms||(ms=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});ws||(ws=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var Cr=Ge(Array.prototype.forEach),mi=Ge(Array.prototype.lastIndexOf),_n=Ge(Array.prototype.pop),er=Ge(Array.prototype.push),wi=Ge(Array.prototype.splice),Ir=Ge(String.prototype.toLowerCase),ps=Ge(String.prototype.toString),fs=Ge(String.prototype.match),tr=Ge(String.prototype.replace),ki=Ge(String.prototype.indexOf),vi=Ge(String.prototype.trim),lt=Ge(Object.prototype.hasOwnProperty),je=Ge(RegExp.prototype.test),rr=xi(TypeError);function Ge(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ms(t,e,s)}}function xi(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return ws(t,r)}}function ee(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ir;yn&&yn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(bi(e)||(e[s]=i),n=i)}t[n]=!0}return t}function Si(t){for(let e=0;e<t.length;e++)lt(t,e)||(t[e]=null);return t}function gt(t){let e=_s(null);for(let[r,s]of An(t))lt(t,r)&&(Array.isArray(s)?e[r]=Si(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=gt(s):e[r]=s);return e}function sr(t,e){for(;t!==null;){let s=_i(t,e);if(s){if(s.get)return Ge(s.get);if(typeof s.value=="function")return Ge(s.value)}t=yi(t)}function r(){return null}return r}var mn=We(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hs=We(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gs=We(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ai=We(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bs=We(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$i=We(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wn=We(["#text"]),kn=We(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ys=We(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vn=We(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rr=We(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ti=it(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ei=it(/<%[\w\W]*|[\w\W]*%>/gm),Ci=it(/\$\{[\w\W]*/gm),Ri=it(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ii=it(/^aria-[\-\w]+$/),$n=it(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Li=it(/^(?:\w+script|data):/i),Di=it(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tn=it(/^html$/i),Ni=it(/^[a-z][.\w]*(-[.\w]+)+$/i),xn=Object.freeze({__proto__:null,ARIA_ATTR:Ii,ATTR_WHITESPACE:Di,CUSTOM_ELEMENT:Ni,DATA_ATTR:Ri,DOCTYPE_NAME:Tn,ERB_EXPR:Ei,IS_ALLOWED_URI:$n,IS_SCRIPT_OR_DATA:Li,MUSTACHE_EXPR:Ti,TMPLIT_EXPR:Ci}),nr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Pi=function(){return typeof window>"u"?null:window},Oi=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Sn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function En(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pi(),e=q=>En(q);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==nr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:c,NamedNodeMap:p=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:_}=t,k=a.prototype,g=sr(k,"cloneNode"),x=sr(k,"remove"),T=sr(k,"nextSibling"),M=sr(k,"childNodes"),w=sr(k,"parentNode");if(typeof o=="function"){let q=r.createElement("template");q.content&&q.content.ownerDocument&&(r=q.content.ownerDocument)}let v,R="",{implementation:F,createNodeIterator:N,createDocumentFragment:O,getElementsByTagName:V}=r,{importNode:ve}=s,ae=Sn();e.isSupported=typeof An=="function"&&typeof w=="function"&&F&&F.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:we,ERB_EXPR:Ce,TMPLIT_EXPR:Re,DATA_ATTR:be,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:I,ATTR_WHITESPACE:X,CUSTOM_ELEMENT:H}=xn,{IS_ALLOWED_URI:G}=xn,Y=null,xe=ee({},[...mn,...hs,...gs,...bs,...wn]),te=null,E=ee({},[...kn,...ys,...vn,...Rr]),A=Object.seal(_s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),U=null,z=null,W=Object.seal(_s(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),re=!0,pe=!0,ye=!1,le=!0,Se=!1,Ie=!0,$e=!1,De=!1,Je=!1,Le=!1,Ke=!1,Be=!1,ce=!0,tt=!1,Ue="user-content-",Pe=!0,ze=!1,Oe={},Me=null,Ye=ee({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),rt=null,Ze=ee({},["audio","video","img","source","image","track"]),Xe=null,Q=ee({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ut="http://www.w3.org/1998/Math/MathML",ft="http://www.w3.org/2000/svg",He="http://www.w3.org/1999/xhtml",st=He,yt=!1,m=null,u=ee({},[ut,ft,He],ps),D=ee({},["mi","mo","mn","ms","mtext"]),K=ee({},["annotation-xml"]),de=ee({},["title","style","font","a","script"]),se=null,ht=["application/xhtml+xml","text/html"],fe="text/html",Te=null,P=null,jr=r.createElement("form"),hr=function(f){return f instanceof RegExp||f instanceof Function},qt=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(P&&P===f)){if((!f||typeof f!="object")&&(f={}),f=gt(f),se=ht.indexOf(f.PARSER_MEDIA_TYPE)===-1?fe:f.PARSER_MEDIA_TYPE,Te=se==="application/xhtml+xml"?ps:Ir,Y=lt(f,"ALLOWED_TAGS")?ee({},f.ALLOWED_TAGS,Te):xe,te=lt(f,"ALLOWED_ATTR")?ee({},f.ALLOWED_ATTR,Te):E,m=lt(f,"ALLOWED_NAMESPACES")?ee({},f.ALLOWED_NAMESPACES,ps):u,Xe=lt(f,"ADD_URI_SAFE_ATTR")?ee(gt(Q),f.ADD_URI_SAFE_ATTR,Te):Q,rt=lt(f,"ADD_DATA_URI_TAGS")?ee(gt(Ze),f.ADD_DATA_URI_TAGS,Te):Ze,Me=lt(f,"FORBID_CONTENTS")?ee({},f.FORBID_CONTENTS,Te):Ye,U=lt(f,"FORBID_TAGS")?ee({},f.FORBID_TAGS,Te):gt({}),z=lt(f,"FORBID_ATTR")?ee({},f.FORBID_ATTR,Te):gt({}),Oe=lt(f,"USE_PROFILES")?f.USE_PROFILES:!1,re=f.ALLOW_ARIA_ATTR!==!1,pe=f.ALLOW_DATA_ATTR!==!1,ye=f.ALLOW_UNKNOWN_PROTOCOLS||!1,le=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=f.SAFE_FOR_TEMPLATES||!1,Ie=f.SAFE_FOR_XML!==!1,$e=f.WHOLE_DOCUMENT||!1,Le=f.RETURN_DOM||!1,Ke=f.RETURN_DOM_FRAGMENT||!1,Be=f.RETURN_TRUSTED_TYPE||!1,Je=f.FORCE_BODY||!1,ce=f.SANITIZE_DOM!==!1,tt=f.SANITIZE_NAMED_PROPS||!1,Pe=f.KEEP_CONTENT!==!1,ze=f.IN_PLACE||!1,G=f.ALLOWED_URI_REGEXP||$n,st=f.NAMESPACE||He,D=f.MATHML_TEXT_INTEGRATION_POINTS||D,K=f.HTML_INTEGRATION_POINTS||K,A=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&hr(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(A.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&hr(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(A.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(A.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(pe=!1),Ke&&(Le=!0),Oe&&(Y=ee({},wn),te=[],Oe.html===!0&&(ee(Y,mn),ee(te,kn)),Oe.svg===!0&&(ee(Y,hs),ee(te,ys),ee(te,Rr)),Oe.svgFilters===!0&&(ee(Y,gs),ee(te,ys),ee(te,Rr)),Oe.mathMl===!0&&(ee(Y,bs),ee(te,vn),ee(te,Rr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?W.tagCheck=f.ADD_TAGS:(Y===xe&&(Y=gt(Y)),ee(Y,f.ADD_TAGS,Te))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?W.attributeCheck=f.ADD_ATTR:(te===E&&(te=gt(te)),ee(te,f.ADD_ATTR,Te))),f.ADD_URI_SAFE_ATTR&&ee(Xe,f.ADD_URI_SAFE_ATTR,Te),f.FORBID_CONTENTS&&(Me===Ye&&(Me=gt(Me)),ee(Me,f.FORBID_CONTENTS,Te)),Pe&&(Y["#text"]=!0),$e&&ee(Y,["html","head","body"]),Y.table&&(ee(Y,["tbody"]),delete U.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw rr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw rr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');v=f.TRUSTED_TYPES_POLICY,R=v.createHTML("")}else v===void 0&&(v=Oi(_,n)),v!==null&&typeof R=="string"&&(R=v.createHTML(""));We&&We(f),P=f}},gr=ee({},[...hs,...gs,...Ai]),br=ee({},[...bs,...$i]),Wr=function(f){let C=w(f);(!C||!C.tagName)&&(C={namespaceURI:st,tagName:"template"});let B=Ir(f.tagName),_e=Ir(C.tagName);return m[f.namespaceURI]?f.namespaceURI===ft?C.namespaceURI===He?B==="svg":C.namespaceURI===ut?B==="svg"&&(_e==="annotation-xml"||D[_e]):!!gr[B]:f.namespaceURI===ut?C.namespaceURI===He?B==="math":C.namespaceURI===ft?B==="math"&&K[_e]:!!br[B]:f.namespaceURI===He?C.namespaceURI===ft&&!K[_e]||C.namespaceURI===ut&&!D[_e]?!1:!br[B]&&(de[B]||!gr[B]):!!(se==="application/xhtml+xml"&&m[f.namespaceURI]):!1},nt=function(f){er(e.removed,{element:f});try{w(f).removeChild(f)}catch{x(f)}},d=function(f,C){try{er(e.removed,{attribute:C.getAttributeNode(f),from:C})}catch{er(e.removed,{attribute:null,from:C})}if(C.removeAttribute(f),f==="is")if(Le||Ke)try{nt(C)}catch{}else try{C.setAttribute(f,"")}catch{}},$=function(f){let C=null,B=null;if(Je)f="<remove></remove>"+f;else{let j=fs(f,/^[\r\n\t ]+/);B=j&&j[0]}se==="application/xhtml+xml"&&st===He&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let _e=v?v.createHTML(f):f;if(st===He)try{C=new b().parseFromString(_e,se)}catch{}if(!C||!C.documentElement){C=F.createDocument(st,"template",null);try{C.documentElement.innerHTML=yt?R:_e}catch{}}let Ne=C.body||C.documentElement;return f&&B&&Ne.insertBefore(r.createTextNode(B),Ne.childNodes[0]||null),st===He?V.call(C,$e?"html":"body")[0]:$e?C.documentElement:Ne},J=function(f){return N.call(f.ownerDocument||f,f,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},L=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof p)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},ne=function(f){return typeof l=="function"&&f instanceof l};function ke(q,f,C){Cr(q,B=>{B.call(e,f,C,P)})}let pt=function(f){let C=null;if(ke(ae.beforeSanitizeElements,f,null),L(f))return nt(f),!0;let B=Te(f.nodeName);if(ke(ae.uponSanitizeElement,f,{tagName:B,allowedTags:Y}),Ie&&f.hasChildNodes()&&!ne(f.firstElementChild)&&je(/<[/\w!]/g,f.innerHTML)&&je(/<[/\w!]/g,f.textContent)||f.nodeType===nr.progressingInstruction||Ie&&f.nodeType===nr.comment&&je(/<[/\w]/g,f.data))return nt(f),!0;if(!(W.tagCheck instanceof Function&&W.tagCheck(B))&&(!Y[B]||U[B])){if(!U[B]&&jt(B)&&(A.tagNameCheck instanceof RegExp&&je(A.tagNameCheck,B)||A.tagNameCheck instanceof Function&&A.tagNameCheck(B)))return!1;if(Pe&&!Me[B]){let _e=w(f)||f.parentNode,Ne=M(f)||f.childNodes;if(Ne&&_e){let j=Ne.length;for(let oe=j-1;oe>=0;--oe){let Qe=g(Ne[oe],!0);Qe.__removalCount=(f.__removalCount||0)+1,_e.insertBefore(Qe,T(f))}}}return nt(f),!0}return f instanceof a&&!Wr(f)||(B==="noscript"||B==="noembed"||B==="noframes")&&je(/<\/no(script|embed|frames)/i,f.innerHTML)?(nt(f),!0):(Se&&f.nodeType===nr.text&&(C=f.textContent,Cr([we,Ce,Re],_e=>{C=tr(C,_e," ")}),f.textContent!==C&&(er(e.removed,{element:f.cloneNode()}),f.textContent=C)),ke(ae.afterSanitizeElements,f,null),!1)},Ee=function(f,C,B){if(ce&&(C==="id"||C==="name")&&(B in r||B in jr))return!1;if(!(pe&&!z[C]&&je(be,C))){if(!(re&&je(S,C))){if(!(W.attributeCheck instanceof Function&&W.attributeCheck(C,f))){if(!te[C]||z[C]){if(!(jt(f)&&(A.tagNameCheck instanceof RegExp&&je(A.tagNameCheck,f)||A.tagNameCheck instanceof Function&&A.tagNameCheck(f))&&(A.attributeNameCheck instanceof RegExp&&je(A.attributeNameCheck,C)||A.attributeNameCheck instanceof Function&&A.attributeNameCheck(C,f))||C==="is"&&A.allowCustomizedBuiltInElements&&(A.tagNameCheck instanceof RegExp&&je(A.tagNameCheck,B)||A.tagNameCheck instanceof Function&&A.tagNameCheck(B))))return!1}else if(!Xe[C]){if(!je(G,tr(B,X,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&f!=="script"&&ki(B,"data:")===0&&rt[f])){if(!(ye&&!je(I,tr(B,X,"")))){if(B)return!1}}}}}}}return!0},jt=function(f){return f!=="annotation-xml"&&fs(f,H)},_t=function(f){ke(ae.beforeSanitizeAttributes,f,null);let{attributes:C}=f;if(!C||L(f))return;let B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:te,forceKeepAttr:void 0},_e=C.length;for(;_e--;){let Ne=C[_e],{name:j,namespaceURI:oe,value:Qe}=Ne,$t=Te(j),Gr=Qe,Fe=j==="value"?Gr:vi(Gr);if(B.attrName=$t,B.attrValue=Fe,B.keepAttr=!0,B.forceKeepAttr=void 0,ke(ae.uponSanitizeAttribute,f,B),Fe=B.attrValue,tt&&($t==="id"||$t==="name")&&(d(j,f),Fe=Ue+Fe),Ie&&je(/((--!?|])>)|<\/(style|title|textarea)/i,Fe)){d(j,f);continue}if($t==="attributename"&&fs(Fe,"href")){d(j,f);continue}if(B.forceKeepAttr)continue;if(!B.keepAttr){d(j,f);continue}if(!le&&je(/\/>/i,Fe)){d(j,f);continue}Se&&Cr([we,Ce,Re],Ms=>{Fe=tr(Fe,Ms," ")});let Os=Te(f.nodeName);if(!Ee(Os,$t,Fe)){d(j,f);continue}if(v&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!oe)switch(_.getAttributeType(Os,$t)){case"TrustedHTML":{Fe=v.createHTML(Fe);break}case"TrustedScriptURL":{Fe=v.createScriptURL(Fe);break}}if(Fe!==Gr)try{oe?f.setAttributeNS(oe,j,Fe):f.setAttribute(j,Fe),L(f)?nt(f):_n(e.removed)}catch{d(j,f)}}ke(ae.afterSanitizeAttributes,f,null)},At=function q(f){let C=null,B=J(f);for(ke(ae.beforeSanitizeShadowDOM,f,null);C=B.nextNode();)ke(ae.uponSanitizeShadowNode,C,null),pt(C),_t(C),C.content instanceof i&&q(C.content);ke(ae.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(q){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,B=null,_e=null,Ne=null;if(yt=!q,yt&&(q="<!-->"),typeof q!="string"&&!ne(q))if(typeof q.toString=="function"){if(q=q.toString(),typeof q!="string")throw rr("dirty is not a string, aborting")}else throw rr("toString is not a function");if(!e.isSupported)return q;if(De||qt(f),e.removed=[],typeof q=="string"&&(ze=!1),ze){if(q.nodeName){let Qe=Te(q.nodeName);if(!Y[Qe]||U[Qe])throw rr("root node is forbidden and cannot be sanitized in-place")}}else if(q instanceof l)C=$("<!---->"),B=C.ownerDocument.importNode(q,!0),B.nodeType===nr.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?C=B:C.appendChild(B);else{if(!Le&&!Se&&!$e&&q.indexOf("<")===-1)return v&&Be?v.createHTML(q):q;if(C=$(q),!C)return Le?null:Be?R:""}C&&Je&&nt(C.firstChild);let j=J(ze?q:C);for(;_e=j.nextNode();)pt(_e),_t(_e),_e.content instanceof i&&At(_e.content);if(ze)return q;if(Le){if(Ke)for(Ne=O.call(C.ownerDocument);C.firstChild;)Ne.appendChild(C.firstChild);else Ne=C;return(te.shadowroot||te.shadowrootmode)&&(Ne=ve.call(s,Ne,!0)),Ne}let oe=$e?C.outerHTML:C.innerHTML;return $e&&Y["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&je(Tn,C.ownerDocument.doctype.name)&&(oe="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+oe),Se&&Cr([we,Ce,Re],Qe=>{oe=tr(oe,Qe," ")}),v&&Be?v.createHTML(oe):oe},e.setConfig=function(){let q=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};qt(q),De=!0},e.clearConfig=function(){P=null,De=!1},e.isValidAttribute=function(q,f,C){P||qt({});let B=Te(q),_e=Te(f);return Ee(B,_e,C)},e.addHook=function(q,f){typeof f=="function"&&er(ae[q],f)},e.removeHook=function(q,f){if(f!==void 0){let C=mi(ae[q],f);return C===-1?void 0:wi(ae[q],C,1)[0]}return _n(ae[q])},e.removeHooks=function(q){ae[q]=[]},e.removeAllHooks=function(){ae=Sn()},e}var Cn=En();var Rn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},In=t=>(...e)=>({_$litDirective$:t,values:e}),Lr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var or=class extends Lr{constructor(e){if(super(e),this.it=Ae,e.type!==Rn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ae||e==null)return this._t=void 0,this.it=e;if(e===Rt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};or.directiveName="unsafeHTML",or.resultType=1;var Ln=In(or);function Ss(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Nt=Ss();function Bn(t){Nt=t}var cr={exec:()=>null};function ie(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Ve.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var Mi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ve={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Fi=/^(?:[ \t]*(?:\n|$))+/,Bi=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ui=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,dr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,zi=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,As=/(?:[*+-]|\d{1,9}[.)])/,Un=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zn=ie(Un).replace(/bull/g,As).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Hi=ie(Un).replace(/bull/g,As).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$s=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qi=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ji=ie(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wi=ie(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,As).getRegex(),Fr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Gi=ie("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Fr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hn=ie($s).replace("hr",dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex(),Vi=ie(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hn).getRegex(),Cs={blockquote:Vi,code:Bi,def:ji,fences:Ui,heading:zi,hr:dr,html:Gi,lheading:zn,list:Wi,newline:Fi,paragraph:Hn,table:cr,text:qi},Dn=ie("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex(),Ji={...Cs,lheading:Hi,table:Dn,paragraph:ie($s).replace("hr",dr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Dn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Fr).getRegex()},Ki={...Cs,html:ie(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:cr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ie($s).replace("hr",dr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qn=/^( {2,}|\\)\n(?!\s*$)/,Xi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Br=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,jn=/[^\s\p{P}\p{S}]/u,Qi=ie(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),Wn=/(?!~)[\p{P}\p{S}]/u,ea=/(?!~)[\s\p{P}\p{S}]/u,ta=/(?:[^\s\p{P}\p{S}]|~)/u,ra=ie(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Gn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sa=ie(Gn,"u").replace(/punct/g,Br).getRegex(),na=ie(Gn,"u").replace(/punct/g,Wn).getRegex(),Vn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",oa=ie(Vn,"gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,Br).getRegex(),ia=ie(Vn,"gu").replace(/notPunctSpace/g,ta).replace(/punctSpace/g,ea).replace(/punct/g,Wn).getRegex(),aa=ie("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,Br).getRegex(),la=ie(/\\(punct)/,"gu").replace(/punct/g,Br).getRegex(),ca=ie(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),da=ie(Es).replace("(?:-->|$)","-->").getRegex(),ua=ie("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Pr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pa=ie(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Pr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Jn=ie(/^!?\[(label)\]\[(ref)\]/).replace("label",Pr).replace("ref",Ts).getRegex(),Kn=ie(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),fa=ie("reflink|nolink(?!\\()","g").replace("reflink",Jn).replace("nolink",Kn).getRegex(),Nn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:cr,anyPunctuation:la,autolink:ca,blockSkip:ra,br:qn,code:Zi,del:cr,emStrongLDelim:sa,emStrongRDelimAst:oa,emStrongRDelimUnd:aa,escape:Yi,link:pa,nolink:Kn,punctuation:Qi,reflink:Jn,reflinkSearch:fa,tag:ua,text:Xi,url:cr},ha={...Is,link:ie(/^!?\[(label)\]\((.*?)\)/).replace("label",Pr).getRegex(),reflink:ie(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Pr).getRegex()},ks={...Is,emStrongRDelimAst:ia,emStrongLDelim:na,url:ie(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Nn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ie(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Nn).getRegex()},ga={...ks,br:ie(qn).replace("{2,}","*").getRegex(),text:ie(ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Dr={normal:Cs,gfm:Ji,pedantic:Ki},ir={normal:Is,gfm:ks,breaks:ga,pedantic:ha},ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pn=t=>ba[t];function bt(t,e){if(e){if(Ve.escapeTest.test(t))return t.replace(Ve.escapeReplace,Pn)}else if(Ve.escapeTestNoEncode.test(t))return t.replace(Ve.escapeReplaceNoEncode,Pn);return t}function On(t){try{t=encodeURI(t).replace(Ve.percentDecode,"%")}catch{return null}return t}function Mn(t,e){let r=t.replace(Ve.findPipe,(i,o,l)=>{let a=!1,c=o;for(;--c>=0&&l[c]==="\\";)a=!a;return a?"|":" |"}),s=r.split(Ve.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(Ve.slashPipe,"|");return s}function ar(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function ya(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Fn(t,e,r,s,n){let i=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,a}function _a(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Or=class{constructor(t){he(this,"options");he(this,"rules");he(this,"lexer");this.options=t||Nt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ar(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=_a(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=ar(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:ar(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=ar(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let c=l.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${c}`:c,n=n?`${n}
${p}`:p;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,i,!0),this.lexer.state.top=h,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let _=b,k=_.raw+`
`+r.join(`
`),g=this.blockquote(k);i[i.length-1]=g,s=s.substring(0,s.length-_.raw.length)+g.raw,n=n.substring(0,n.length-_.text.length)+g.text;break}else if(b?.type==="list"){let _=b,k=_.raw+`
`+r.join(`
`),g=this.list(k);i[i.length-1]=g,s=s.substring(0,s.length-b.raw.length)+g.raw,n=n.substring(0,n.length-_.raw.length)+g.raw,r=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,c="",p="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;c=e[0],t=t.substring(c.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=t.split(`
`,1)[0],_=!h.trim(),k=0;if(this.options.pedantic?(k=2,p=h.trimStart()):_?k=e[1].length+1:(k=e[2].search(this.rules.other.nonSpaceChar),k=k>4?1:k,p=h.slice(k),k+=e[1].length),_&&this.rules.other.blankLine.test(b)&&(c+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let g=this.rules.other.nextBulletRegex(k),x=this.rules.other.hrRegex(k),T=this.rules.other.fencesBeginRegex(k),M=this.rules.other.headingBeginRegex(k),w=this.rules.other.htmlBeginRegex(k);for(;t;){let v=t.split(`
`,1)[0],R;if(b=v,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),R=b):R=b.replace(this.rules.other.tabCharGlobal,"    "),T.test(b)||M.test(b)||w.test(b)||g.test(b)||x.test(b))break;if(R.search(this.rules.other.nonSpaceChar)>=k||!b.trim())p+=`
`+R.slice(k);else{if(_||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(h)||M.test(h)||x.test(h))break;p+=`
`+b}!_&&!b.trim()&&(_=!0),c+=v+`
`,t=t.substring(v.length+1),h=R.slice(k)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0)),n.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),n.raw+=c}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=p.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=p.raw+a.tokens[0].raw,a.tokens[0].text=p.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(p)):a.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):a.tokens.unshift(p)}}if(!n.loose){let c=a.tokens.filter(h=>h.type==="space"),p=c.length>0&&c.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=p}}if(n.loose)for(let a of n.items){a.loose=!0;for(let c of a.tokens)c.type==="text"&&(c.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Mn(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Mn(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=ar(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=ya(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Fn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Fn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,l=n,a=0,c=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*t.length+n);(s=c.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let p=[...s[0]][0].length,h=t.slice(0,n+s.index+p+o);if(Math.min(n,o)%2){let _=h.slice(1,-1);return{type:"em",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},ct=class vs{constructor(e){he(this,"tokens");he(this,"options");he(this,"state");he(this,"inlineQueue");he(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Nt,this.options.tokenizer=this.options.tokenizer||new Or,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ve,block:Dr.normal,inline:ir.normal};this.options.pedantic?(r.block=Dr.pedantic,r.inline=ir.pedantic):this.options.gfm&&(r.block=Dr.gfm,this.options.breaks?r.inline=ir.breaks:r.inline=ir.gfm),this.tokenizer.rules=r}static get rules(){return{block:Dr,inline:ir}}static lex(e,r){return new vs(r).lex(e)}static lexInline(e,r){return new vs(r).inlineTokens(e)}lex(e){e=e.replace(Ve.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(Ve.tabCharGlobal,"    ").replace(Ve.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=r.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
`:r.push(n);continue}if(n=this.tokenizer.code(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(n=this.tokenizer.fences(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.heading(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.hr(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.blockquote(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.list(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.html(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.def(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title},r.push(n));continue}if(n=this.tokenizer.table(e)){e=e.substring(n.raw.length),r.push(n);continue}if(n=this.tokenizer.lheading(e)){e=e.substring(n.raw.length),r.push(n);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,l=e.slice(1),a;this.options.extensions.startBlock.forEach(c=>{a=c.call({lexer:this},l),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(i))){let o=r.at(-1);s&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n),s=i.length!==e.length,e=e.substring(n.raw.length);continue}if(n=this.tokenizer.text(e)){e=e.substring(n.raw.length);let o=r.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+n.raw,o.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(p=>(a=p.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let p=r.at(-1);a.type==="text"&&p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let c=e;if(this.options.extensions?.startInline){let p=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(_=>{b=_.call({lexer:this},h),typeof b=="number"&&b>=0&&(p=Math.min(p,b))}),p<1/0&&p>=0&&(c=e.substring(0,p+1))}if(a=this.tokenizer.inlineText(c)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let p=r.at(-1);p?.type==="text"?(p.raw+=a.raw,p.text+=a.text):r.push(a);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return r}},Mr=class{constructor(t){he(this,"options");he(this,"parser");this.options=t||Nt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(Ve.notSpaceStart)?.[0],n=t.replace(Ve.endingNewline,"")+`
`;return s?'<pre><code class="language-'+bt(s)+'">'+(r?n:bt(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:bt(n,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${bt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=On(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+bt(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=On(t);if(n===null)return bt(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${bt(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:bt(t.text)}},Ls=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},dt=class xs{constructor(e){he(this,"options");he(this,"renderer");he(this,"textRenderer");this.options=e||Nt,this.options.renderer=this.options.renderer||new Mr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(e,r){return new xs(r).parse(e)}static parseInline(e,r){return new xs(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Nr,lr=(Nr=class{constructor(t){he(this,"options");he(this,"block");this.options=t||Nt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?ct.lex:ct.lexInline}provideParser(){return this.block?dt.parse:dt.parseInline}},he(Nr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),he(Nr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Nr),ma=class{constructor(...t){he(this,"defaults",Ss());he(this,"options",this.setOptions);he(this,"parse",this.parseMarkdown(!0));he(this,"parseInline",this.parseMarkdown(!1));he(this,"Parser",dt);he(this,"Renderer",Mr);he(this,"TextRenderer",Ls);he(this,"Lexer",ct);he(this,"Tokenizer",Or);he(this,"Hooks",lr);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new Mr(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=n[o];n[o]=(...c)=>{let p=l.apply(n,c);return p===!1&&(p=a.apply(n,c)),p||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Or(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=n[o];n[o]=(...c)=>{let p=l.apply(n,c);return p===!1&&(p=a.apply(n,c)),p}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new lr;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=n[o];lr.passThroughHooks.has(i)?n[o]=c=>{if(this.defaults.async&&lr.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await l.call(n,c);return a.call(n,h)})();let p=l.call(n,c);return a.call(n,p)}:n[o]=(...c)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(n,c);return h===!1&&(h=await a.apply(n,c)),h})();let p=l.apply(n,c);return p===!1&&(p=a.apply(n,c)),p}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return ct.lex(t,e??this.defaults)}parser(t,e){return dt.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():t?ct.lex:ct.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let c=await(n.hooks?await n.hooks.provideParser():t?dt.parse:dt.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(c):c})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?ct.lex:ct.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():t?dt.parse:dt.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+bt(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Dt=new ma;function ue(t,e){return Dt.parse(t,e)}ue.options=ue.setOptions=function(t){return Dt.setOptions(t),ue.defaults=Dt.defaults,Bn(ue.defaults),ue};ue.getDefaults=Ss;ue.defaults=Nt;ue.use=function(...t){return Dt.use(...t),ue.defaults=Dt.defaults,Bn(ue.defaults),ue};ue.walkTokens=function(t,e){return Dt.walkTokens(t,e)};ue.parseInline=Dt.parseInline;ue.Parser=dt;ue.parser=dt.parse;ue.Renderer=Mr;ue.TextRenderer=Ls;ue.Lexer=ct;ue.lexer=ct.lex;ue.Tokenizer=Or;ue.Hooks=lr;ue.parse=ue;var Bl=ue.options,Ul=ue.setOptions,zl=ue.use,Hl=ue.walkTokens,ql=ue.parseInline;var jl=dt.parse,Wl=ct.lex;function ur(t){let e=ue.parse(t),r=Cn.sanitize(e);return Ln(r)}var Ur=["open","in_progress","deferred","resolved","closed"];function at(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function wa(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ka(t){window.location.hash=t}function Yn(t,e,r=ka,s=void 0,n=void 0){let i=ge("views:detail"),o=null,l=null,a=!1,c=!1,p=!1,h=!1,b=!1,_=!1,k=!1,g=!1,x="",T="",M="",w="",v="",R="",F="",N=!1,O=null,V=()=>{};function ve(){return O||(O=document.createElement("dialog"),O.id="delete-confirm-dialog",O.setAttribute("role","alertdialog"),O.setAttribute("aria-modal","true"),document.body.appendChild(O),O)}function ae(){if(!o)return;let d=ve(),$=o.id,J=o.title||"(no title)";d.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${$}</strong> \u2014 <strong>${J}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let L=d.querySelector("#delete-cancel-btn"),ne=d.querySelector("#delete-confirm-btn");if(L?.addEventListener("click",()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),ne?.addEventListener("click",async()=>{typeof d.close=="function"&&d.close(),d.removeAttribute("open"),await we()}),d.addEventListener("cancel",ke=>{ke.preventDefault(),typeof d.close=="function"&&d.close(),d.removeAttribute("open")}),typeof d.showModal=="function")try{d.showModal(),d.setAttribute("open","")}catch{d.setAttribute("open","")}else d.setAttribute("open","")}async function we(){if(!o)return;let d=o.id;try{await e("delete-issue",{id:d}),o=null,l=null,P();let $=zt(window.location.hash||"");r(`#/${$}`)}catch($){i("delete failed: %o",$),Z("Failed to delete issue","error")}}function Ce(d){d.stopPropagation(),d.preventDefault(),ae()}function Re(d){let $=zt(window.location.hash||"");return kt($==="worker"?"issues":$,d)}function be(d){me(y`
        <div class="panel__body" id="detail-root">
          <p class="muted">${d}</p>
        </div>
      `,t)}function S(){if(!l||!s||typeof s.snapshotFor!="function")return;let d=s.snapshotFor(`detail:${l}`);Array.isArray(d)&&d.length>0&&(o=d.find(J=>String(J.id)===String(l))||d[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{S(),P()}catch(d){i("issue stores listener error %o",d)}}),n&&typeof n.subscribe=="function"&&(V=n.subscribe(()=>{try{P()}catch(d){i("store listener error %o",d)}}));let I=()=>{c=!0,P()},X=d=>{d.key==="Enter"?(c=!0,P()):d.key==="Escape"&&(c=!1,P())},H=async()=>{if(!o||a)return;let d=t.querySelector("h2 input"),$=o.title||"",J=d?d.value:"";if(J===$){c=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),J);let L=await e("edit-text",{id:o.id,field:"title",value:J});L&&typeof L=="object"&&(o=L,c=!1,P())}catch(L){i("save title failed %s %o",String(o.id),L),o.title=$,c=!1,P(),Z("Failed to save title","error")}finally{a=!1}},G=()=>{c=!1,P()},Y=()=>{k=!0,P()},xe=d=>{d.key==="Enter"?(d.preventDefault(),k=!0,P()):d.key==="Escape"&&(d.preventDefault(),k=!1,P())},te=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .prop.assignee input"),$=o?.assignee??"",J=d?.value??"";if(J===$){k=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),J);let L=await e("update-assignee",{id:o.id,assignee:J});L&&typeof L=="object"&&(o=L,k=!1,P())}catch(L){i("save assignee failed %s %o",String(o.id),L),o.assignee=$,k=!1,P(),Z("Failed to update assignee","error")}finally{a=!1}},E=()=>{k=!1,P()},A=d=>{R=d.currentTarget.value||""};function U(d){d.key==="Enter"&&(d.preventDefault(),z())}async function z(){if(!o||a)return;let d=R.trim();if(d){a=!0;try{i("add label %s \u2192 %s",String(o.id),d);let $=await e("label-add",{id:o.id,label:d});$&&typeof $=="object"&&(o=$,R="",P())}catch($){i("add label failed %s %o",String(o.id),$),Z("Failed to add label","error")}finally{a=!1}}}async function W(d){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),d);let $=await e("label-remove",{id:o.id,label:d});$&&typeof $=="object"&&(o=$,P())}catch($){i("remove label failed %s %o",String(o?.id||""),$),Z("Failed to remove label","error")}finally{a=!1}}}let re=async d=>{if(!o||a){P();return}let $=d.currentTarget,J=o.status||"open",L=$.value;if(L!==J){a=!0,o.status=L,P();try{i("update status %s \u2192 %s",String(o.id),L);let ne=await e("update-status",{id:o.id,status:L});ne&&typeof ne=="object"&&(o=ne,P())}catch(ne){i("update status failed %s %o",String(o.id),ne),o.status=J,P(),Z("Failed to update status","error")}finally{a=!1}}},pe=async d=>{if(!o||a){P();return}let $=d.currentTarget,J=typeof o.priority=="number"?o.priority:2,L=Number($.value);if(L!==J){a=!0,o.priority=L,P();try{i("update priority %s \u2192 %d",String(o.id),L);let ne=await e("update-priority",{id:o.id,priority:L});ne&&typeof ne=="object"&&(o=ne,P())}catch(ne){i("update priority failed %s %o",String(o.id),ne),o.priority=J,P(),Z("Failed to update priority","error")}finally{a=!1}}},ye=()=>{p=!0,P()},le=d=>{if(d.key==="Escape")p=!1,P();else if(d.key==="Enter"&&d.ctrlKey){let $=t.querySelector("#detail-root .editable-actions button");$&&$.click()}},Se=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root textarea"),$=o.description||"",J=d?d.value:"";if(J===$){p=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save description %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"description",value:J});L&&typeof L=="object"&&(o=L,p=!1,P())}catch(L){i("save description failed %s %o",String(o?.id||""),L),o.description=$,p=!1,P(),Z("Failed to save description","error")}finally{a=!1}},Ie=()=>{p=!1,P()},$e=()=>{h=!0,P();try{let d=t.querySelector("#detail-root .design textarea");d&&d.focus()}catch(d){i("focus design textarea failed %o",d)}},De=d=>{if(d.key==="Escape")h=!1,P();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let $=t.querySelector("#detail-root .design .editable-actions button");$&&$.click()}},Je=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .design textarea"),$=o.design||"",J=d?d.value:"";if(J===$){h=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save design %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"design",value:J});L&&typeof L=="object"&&(o=L,h=!1,P())}catch(L){i("save design failed %s %o",String(o?.id||""),L),o.design=$,h=!1,P(),Z("Failed to save design","error")}finally{a=!1}},Le=()=>{h=!1,P()},Ke=()=>{b=!0,P()},Be=d=>{if(d.key==="Escape")b=!1,P();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let $=t.querySelector("#detail-root .notes .editable-actions button");$&&$.click()}},ce=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .notes textarea"),$=o.notes||"",J=d?d.value:"";if(J===$){b=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save notes %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"notes",value:J});L&&typeof L=="object"&&(o=L,b=!1,P())}catch(L){i("save notes failed %s %o",String(o?.id||""),L),o.notes=$,b=!1,P(),Z("Failed to save notes","error")}finally{a=!1}},tt=()=>{b=!1,P()},Ue=()=>{_=!0,P()},Pe=d=>{if(d.key==="Escape")_=!1,P();else if(d.key==="Enter"&&(d.ctrlKey||d.metaKey)){let $=t.querySelector("#detail-root .acceptance .editable-actions button");$&&$.click()}},ze=async()=>{if(!o||a)return;let d=t.querySelector("#detail-root .acceptance textarea"),$=o.acceptance||"",J=d?d.value:"";if(J===$){_=!1,P();return}a=!0,d&&(d.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"acceptance",value:J});L&&typeof L=="object"&&(o=L,_=!1,P())}catch(L){i("save acceptance failed %s %o",String(o?.id||""),L),o.acceptance=$,_=!1,P(),Z("Failed to save acceptance","error")}finally{a=!1}},Oe=()=>{_=!1,P()},Me=d=>{let $=d.currentTarget,J=F.trim().length>0;F=$.value||"";let L=F.trim().length>0;J!==L&&P()},Ye=async()=>{if(!(!o||N||!F.trim())){N=!0,P();try{i("add comment to %s",String(o.id));let d=await e("add-comment",{id:o.id,text:F.trim()});Array.isArray(d)&&(o.comments=d,F="",P())}catch(d){i("add comment failed %s %o",String(o.id),d),Z("Failed to add comment","error")}finally{N=!1,P()}}},rt=d=>{d.key==="Enter"&&(d.ctrlKey||d.metaKey)&&(d.preventDefault(),Ye())};function Ze(d,$){let J=d==="Dependencies"?"add-dependency":"add-dependent";return y`
      <div class="props-card">
        <div>
          <div class="props-card__title">${d}</div>
        </div>
        <ul>
          ${!$||$.length===0?null:$.map(L=>{let ne=L.id,ke=Re(ne);return y`<li
                  data-href=${ke}
                  @click=${()=>r(ke)}
                >
                  ${Lt(L.issue_type||"")}
                  <span class="text-truncate">${L.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${ne}`}
                    @click=${jr(ne,d)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${J} />
          <button @click=${hr($,d)}>Add</button>
        </div>
      </div>
    `}function Xe(){if(!o||a)return;let d=o.metadata||{};x=typeof d.execution_lane=="string"?d.execution_lane:"",T=typeof d.workspace_policy=="string"?d.workspace_policy:"",M=typeof d.branch_policy=="string"?d.branch_policy:"",w=typeof d.finish_action=="string"?d.finish_action:"",v=typeof d.review_profile=="string"?d.review_profile:"",g=!0,P()}function Q(){g=!1,x="",T="",M="",w="",v="",P()}async function ut(){if(!o||a)return;let d=us(x,T,M,w,v);if(!d){Z("Choose valid workflow settings","error"),P();return}a=!0,P();try{let $=await e("update-workflow-settings",{id:o.id,values:d});$&&typeof $=="object"&&!Array.isArray($)&&(o=$),g=!1,x="",T="",M="",w="",v=""}catch($){i("save workflow settings failed %o",$),Z("Failed to save workflow settings","error")}finally{a=!1,P()}}function ft(d){x=d.currentTarget.value,P()}function He(d){T=d.currentTarget.value,P()}function st(d){M=d.currentTarget.value,P()}function yt(d){w=d.currentTarget.value,P()}function m(d){v=d.currentTarget.value,P()}async function u(d){try{await navigator.clipboard.writeText(d),Z("Copied path")}catch($){i("copy artifact path failed %o",$),Z("Failed to copy path","error")}}function D(){return n?.getState?.().config?.detail?.workflow_summary||null}function K(d){let $=String(d.kind||"value"),J=String(d.label||""),L=String(d.value||""),ne=typeof d.href=="string"?d.href:"";return $==="artifact"?y`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${J}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${L}
          @click=${()=>u(L)}
        >
          ${L}
        </button>
      </div>`:$==="link"&&ne?y`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${J}</div>
        <div class="workflow-summary__value">
          <a href=${ne} target="_blank" rel="noreferrer noopener">${L}</a>
        </div>
      </div>`:y`<div
      class=${`workflow-summary__row ${$==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${J}</div>
      <div class="workflow-summary__value">${L}</div>
    </div>`}function de(d,$){return d&&!$.includes(d)?y`<option value=${d} selected>Invalid: ${d}</option>`:null}function se(d,$,J,L,ne,ke){return y`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${d}>${$}</label>
      <select
        id=${d}
        data-testid=${d}
        .value=${J}
        ?disabled=${a}
        @change=${ne}
      >
        <option value="">${ke}</option>
        ${de(J,L)}
        ${L.map(pt=>y`<option value=${pt}>${pt}</option>`)}
      </select>
    </div>`}function ht(d){let $=Array.isArray(d.editable_fields)?d.editable_fields:[],J=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"].every(At=>$.includes(At));if(!g)return y`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${d.rows.map(At=>K(At))}
        </div>
        ${J?y`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${Xe}
            >
              Edit
            </button>`:null}
      </section>`;let L=!!(T&&M&&w),ne=Ht({workspace_policy:T,branch_policy:M,finish_action:w}),ke=L&&ne.kind!=="valid",pt=v!==""&&!Qt.includes(v),Ee=x!==""&&!Xt.includes(x),_t=!!us(x,T,M,w,v);return y`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${se("workflow-settings-lane","Execution lane",x,Xt,ft,"Choose lane")}
        ${se("workflow-settings-workspace","Workspace",T,is,He,"Choose workspace")}
        ${se("workflow-settings-branch","Branch",M,as,st,"Choose branch")}
        ${se("workflow-settings-finish","Finish",w,ls,yt,"Choose finish")}
        ${se("workflow-settings-review-profile","Review profile",v,Qt,m,cs)}
        ${Ee?y`<div class="workflow-summary__row is-invalid">
              Invalid execution lane
            </div>`:null}
        ${ke?y`<div class="workflow-summary__row is-invalid">
              Invalid route combination
            </div>`:null}
        ${pt?y`<div class="workflow-summary__row is-invalid">
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
          ?disabled=${a||!_t}
          @click=${ut}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-cancel"
          ?disabled=${a}
          @click=${Q}
        >
          Cancel
        </button>
      </div>
    </section>`}function fe(d){return d.id==="workflow_settings"?ht(d):y`<section
      class="workflow-summary__section"
      data-section=${d.id}
    >
      <div class="workflow-summary__section-title">${d.label}</div>
      <div class="workflow-summary__list">
        ${d.rows.map($=>K($))}
      </div>
    </section>`}function Te(d){let $=gn(d,D()),J=$.length>0?y`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${$.map(j=>fe(j))}
          </div>`:null,L=c?y`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${d.title||""}
              @keydown=${qt}
            />
            <button @click=${H}>Save</button>
            <button @click=${G}>Cancel</button>
          </h2>
        </div>`:y`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${I}
              @keydown=${X}
              >${d.title||""}</span
            >
          </h2>
        </div>`,ne=y`<select
      class=${`badge-select badge--status is-${d.status||"open"}`}
      @change=${re}
      .value=${d.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let j=String(d.status||"open");return Ur.map(oe=>y`<option value=${oe} ?selected=${j===oe}>
              ${at(oe)}
            </option>`)})()}
    </select>`,ke=y`<select
      class=${`badge-select badge--priority is-p${String(typeof d.priority=="number"?d.priority:2)}`}
      @change=${pe}
      .value=${String(typeof d.priority=="number"?d.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let j=String(typeof d.priority=="number"?d.priority:2);return xt.map((oe,Qe)=>y`<option value=${String(Qe)} ?selected=${j===String(Qe)}>
              ${Zt(Qe)} ${oe}
            </option>`)})()}
    </select>`,pt=p?y`<div class="description">
          <textarea
            @keydown=${le}
            .value=${d.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Se}>Save</button>
            <button @click=${Ie}>Cancel</button>
          </div>
        </div>`:y`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${ye}
          @keydown=${gr}
        >
          ${(()=>{let j=d.description||"";return j.trim()===""?y`<div class="muted">Description</div>`:ur(j)})()}
        </div>`,Ee=(()=>{let j=d;return String(d.acceptance||j.acceptance_criteria||"")})(),jt=_?y`<div class="acceptance">
          ${Ee.trim().length>0?y`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${Pe}
            .value=${Ee}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ze}>Save</button>
            <button @click=${Oe}>Cancel</button>
          </div>
        </div>`:y`<div class="acceptance">
          ${(()=>{let j=Ee,oe=j.trim().length>0;return y`${oe?y`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${Ue}
                @keydown=${br}
              >
                ${oe?ur(j):y`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,_t=String(d.notes||""),At=b?y`<div class="notes">
          ${_t.trim().length>0?y`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${Be}
            .value=${_t}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${ce}>Save</button>
            <button @click=${tt}>Cancel</button>
          </div>
        </div>`:y`<div class="notes">
          ${(()=>{let j=_t,oe=j.trim().length>0;return y`${oe?y`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${Ke}
                @keydown=${Wr}
              >
                ${oe?ur(j):y`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,q=Array.isArray(d.labels)?d.labels:[],f=y`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${q.map(j=>y`<li>
              <span class="badge" title=${j}
                >${j}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+j}
                  @click=${()=>W(j)}
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
          @keydown=${U}
        />
        <button @click=${z}>Add</button>
      </div>
    </div>`,C=String(d.design||""),B=h?y`<div class="design">
          ${C.trim().length>0?y`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${De}
            .value=${C}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Je}>Save</button>
            <button @click=${Le}>Cancel</button>
          </div>
        </div>`:y`<div class="design">
          ${(()=>{let j=C,oe=j.trim().length>0;return y`${oe?y`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${$e}
                @keydown=${nt}
              >
                ${oe?ur(j):y`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,_e=Array.isArray(d.comments)?d.comments:[],Ne=y`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${_e.length===0?y`<div class="muted">No comments yet</div>`:_e.map(j=>y`
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">${j.author||"Unknown"}</span>
                  <span class="comment-date"
                    >${wa(j.created_at)}</span
                  >
                </div>
                <div class="comment-text">${j.text}</div>
              </div>
            `)}
      <div class="comment-input">
        <textarea
          placeholder="Add a comment... (Ctrl+Enter to submit)"
          rows="3"
          .value=${F}
          @input=${Me}
          @keydown=${rt}
          ?disabled=${N}
        ></textarea>
        <button
          @click=${Ye}
          ?disabled=${N||!F.trim()}
        >
          ${N?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return y`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${L} ${pt} ${B} ${At}
            ${jt} ${Ne}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${Ce}>
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
                    ${Lt(d.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${ne}</div>
                </div>
                ${d.close_reason?y`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${d.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${ke}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${k?y`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${d.assignee||""}
                              size=${Math.min(40,Math.max(12,(d.assignee||"").length+3))}
                              @keydown=${j=>{j.key==="Escape"?(j.preventDefault(),E()):j.key==="Enter"&&(j.preventDefault(),te())}}
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
                              @click=${E}
                            >
                              Cancel
                            </button>`:y`${(()=>{let j=d.assignee||"",oe=j.trim().length>0;return y`<span
                              class=${oe?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${Y}
                              @keydown=${xe}
                              >${oe?j:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${f}
              ${J}
              ${Ze("Dependencies",d.dependencies||[])}
              ${Ze("Dependents",d.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function P(){if(!o){be(l?"Loading\u2026":"No issue selected");return}me(Te(o),t)}function jr(d,$){return async J=>{if(J.stopPropagation(),!(!o||a)){a=!0;try{if($==="Dependencies"){let L=await e("dep-remove",{a:o.id,b:d,view_id:o.id});L&&typeof L=="object"&&(o=L,P())}else{let L=await e("dep-remove",{a:d,b:o.id,view_id:o.id});L&&typeof L=="object"&&(o=L,P())}}catch(L){i("dep-remove failed %o",L)}finally{a=!1}}}}function hr(d,$){return async J=>{if(!o||a)return;let L=J.currentTarget,ne=L.previousElementSibling,ke=ne?ne.value.trim():"";if(!ke||ke===o.id){Z("Enter a different issue id");return}if(new Set((d||[]).map(Ee=>Ee.id)).has(ke)){Z("Link already exists");return}a=!0,L&&(L.disabled=!0),ne&&(ne.disabled=!0);try{if($==="Dependencies"){let Ee=await e("dep-add",{a:o.id,b:ke,view_id:o.id});Ee&&typeof Ee=="object"&&(o=Ee,P())}else{let Ee=await e("dep-add",{a:ke,b:o.id,view_id:o.id});Ee&&typeof Ee=="object"&&(o=Ee,P())}}catch(Ee){i("dep-add failed %o",Ee),Z("Failed to add dependency","error")}finally{a=!1}}}function qt(d){d.key==="Escape"?(c=!1,P()):d.key==="Enter"&&(d.preventDefault(),H())}function gr(d){d.key==="Enter"&&ye()}function br(d){d.key==="Enter"&&Ue()}function Wr(d){d.key==="Enter"&&Ke()}function nt(d){d.key==="Enter"&&$e()}return{async load(d){if(!d){be("No issue selected");return}if(l=String(d),o=null,S(),o||be("Loading\u2026"),a=!1,F="",N=!1,P(),o&&!o.comments)try{let $=await e("get-comments",{id:l});Array.isArray($)&&o&&l===d&&(o.comments=$,P())}catch($){i("fetch comments failed %s %o",d,$)}},clear(){be("Select an issue to view details")},destroy(){V(),t.replaceChildren(),O&&O.parentNode&&(O.parentNode.removeChild(O),O=null)}}}function zr(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",c=t.show_deps??!0,p=new Set;function h(g,x,T,M=""){let w=`${g}:${x}`;return p.has(w)?y`<span>
        <input
          type="text"
          .value=${T}
          class="inline-edit"
          @keydown=${async R=>{if(R.key==="Escape")p.delete(w),s();else if(R.key==="Enter"){let N=R.currentTarget.value||"";N!==T&&await r(g,{[x]:N}),p.delete(w),s()}}}
          @blur=${async R=>{let N=R.currentTarget.value||"";N!==T&&await r(g,{[x]:N}),p.delete(w),s()}}
          autofocus
        />
      </span>`:y`<span
      class="editable text-truncate ${T?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${R=>{R.stopPropagation(),R.preventDefault(),p.add(w),s()}}
      @keydown=${R=>{R.key==="Enter"&&(R.preventDefault(),R.stopPropagation(),p.add(w),s())}}
      >${T||M}</span
    >`}function b(g,x){return async T=>{let w=T.currentTarget.value||"",v={};v[x]=x==="priority"?Number(w):w,await r(g,v)}}function _(g){return x=>{let T=x.target;T&&(T.tagName==="INPUT"||T.tagName==="SELECT")||e(g)}}function k(g){let x=String(g.status||"open"),T=String(g.priority??2),M=n()===g.id;return y`<tr
      role="row"
      class="${a} ${M?"selected":""}"
      data-issue-id=${g.id}
      @click=${_(g.id)}
    >
      <td role="gridcell" class="mono">${vt(g.id)}</td>
      <td role="gridcell">${Lt(g.issue_type)}</td>
      <td role="gridcell">${h(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${xr(g.labels,i(),o()).map(w=>Sr(w,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${x}"
          .value=${x}
          @change=${b(g.id,"status")}
        >
          ${Ur.map(w=>y`<option value=${w} ?selected=${x===w}>
                ${at(w)}
              </option>`)}
        </select>
      </td>
      <td role="gridcell">
        ${h(g.id,"assignee",g.assignee||"","Unassigned")}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--priority ${"is-p"+T}"
          .value=${T}
          @change=${b(g.id,"priority")}
        >
          ${xt.map((w,v)=>y`<option
                value=${String(v)}
                ?selected=${T===String(v)}
              >
                ${Zt(v)} ${w}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Ar(g.created_at)}
      >
        ${g.created_at?$r(g.created_at):""}
      </td>
      ${c?y`<td role="gridcell" class="deps-col">
            ${(g.dependency_count||0)>0||(g.dependent_count||0)>0?y`<span class="deps-indicator"
                  >${(g.dependency_count||0)>0?y`<span
                        class="dep-count"
                        title="${g.dependency_count} ${(g.dependency_count||0)===1?"dependency":"dependencies"}"
                        >→${g.dependency_count}</span
                      >`:""}${(g.dependent_count||0)>0?y`<span
                        class="dependent-count"
                        title="${g.dependent_count} ${(g.dependent_count||0)===1?"dependent":"dependents"}"
                        >←${g.dependent_count}</span
                      >`:""}</span
                >`:""}
          </td>`:""}
    </tr>`}return k}function Zn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],l=new Set,a=new Set,c=new Map,p=n?wt(n):null;p&&p.subscribe(()=>{let w=o.length===0;if(o=M(),_(),w&&o.length>0){let v=String(o[0].epic?.id||"");v&&!l.has(v)&&T(v)}});function h(){let w=i?.getState?.().config?.label_display_policy,v=w?.colors;return{visible_prefixes:Array.isArray(w?.visible_prefixes)?w.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(w?.visible_exact)?w.visible_exact:[],colors:v&&typeof v=="object"?v:{prefix:{},exact:{}}}}let b=zr({navigate:w=>r(w),onUpdate:x,requestRender:_,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,getLabelColorPolicy:()=>h().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let w=JSON.stringify(h());i.subscribe(()=>{let v=JSON.stringify(h());v!==w&&(w=v,_())})}function _(){me(k(),t)}function k(){return o.length?y`${o.map(w=>g(w))}`:y`<div class="panel__header muted">No epics found.</div>`}function g(w){let v=w.epic||{},R=String(v.id||""),F=l.has(R),N=p?p.selectEpicChildren(R):[],O=a.has(R);return y`
      <div class="epic-group" data-epic-id=${R}>
        <div
          class="epic-header"
          @click=${()=>T(R)}
          role="button"
          tabindex="0"
          aria-expanded=${F}
        >
          ${vt(R,{class_name:"mono"})}
          <span class="text-truncate" style="margin-left:8px"
            >${v.title||"(no title)"}</span
          >
          <span
            class="epic-progress"
            style="margin-left:auto; display:flex; align-items:center; gap:8px;"
          >
            <progress
              value=${Number(w.closed_children||0)}
              max=${Math.max(1,Number(w.total_children||0))}
            ></progress>
            <span class="muted mono"
              >${w.closed_children}/${w.total_children}</span
            >
          </span>
        </div>
        ${F?y`<div class="epic-children">
              ${O?y`<div class="muted">Loading…</div>`:N.length===0?y`<div class="muted">No issues found</div>`:y`<table class="table">
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
                        ${N.map(V=>b(V))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function x(w,v){try{await e.updateIssue({id:w,...v}),_()}catch{}}async function T(w){if(l.has(w)){if(l.delete(w),c.has(w)){try{let v=c.get(w);v&&await v()}catch{}c.delete(w);try{n&&n.unregister&&n.unregister(`detail:${w}`)}catch{}}}else{if(l.add(w),a.add(w),_(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${w}`,{type:"issue-detail",params:{id:w}})}catch{}let v=await s.subscribeList(`detail:${w}`,{type:"issue-detail",params:{id:w}});c.set(w,v)}catch{}a.delete(w)}_()}function M(){let w=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],v=[];for(let R of w){let F=Array.isArray(R.dependents)?R.dependents:[],N=Number.isFinite(R.total_children),O=Number.isFinite(R.closed_children),V=N?Number(R.total_children)||0:F.length,ve=O&&Number(R.closed_children)||0;if(!O)for(let ae of F)String(ae.status||"")==="closed"&&ve++;v.push({epic:R,total_children:V,closed_children:ve})}return v}return{async load(){o=M(),_();try{if(o.length>0){let w=String(o[0].epic?.id||"");w&&!l.has(w)&&await T(w)}}catch{}}}}function Xn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(c,p,h="")=>{r&&(r.textContent=c||"Unexpected Error"),s&&(s.textContent=p||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(n&&(b.length>0?(n.textContent=b,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",c=>{c.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Qn(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function l(_){i.replaceChildren(),i.appendChild(vt(_))}s.addEventListener("mousedown",_=>{_.target===s&&(_.preventDefault(),c())}),s.addEventListener("cancel",_=>{_.preventDefault(),c()}),o.addEventListener("click",()=>c());let a=null;function c(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}b()}function p(_){try{let k=document.activeElement;k&&k instanceof HTMLElement?a=k:a=null}catch{a=null}l(_);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:p,close:h,getMount(){return n}}}var Hr=["bug","feature","task","epic","chore"];function pr(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function eo(t,e,r,s,n=void 0,i=void 0){let o=ge("views:list"),l=[],a="",c=[],p=[],h=s?s.getState().selected_id:null,b=null,_=!1,k=!1;function g(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function x(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function T(){let S=s?.getState?.().config?.label_display_policy,I=S?.colors;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[],colors:I&&typeof I=="object"?I:{prefix:{},exact:{}}}}let M=zr({navigate:S=>{let I=r||(H=>window.location.hash=H),X=s?s.getState().view:"issues";I(kt(X,S))},onUpdate:Ce,requestRender:we,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>T().visible_prefixes,getVisibleLabelExact:()=>T().visible_exact,getLabelColorPolicy:()=>T().colors,row_class:"issue-row"}),w=async S=>{l.includes(S)?l=l.filter(I=>I!==S):l=[...l,S],o("status toggle %s -> %o",S,l),s&&s.setState({filters:{status:l}}),await Re()},v=S=>{a=S.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),we()},R=S=>{p.includes(S)?p=p.filter(I=>I!==S):p=[...p,S],o("type toggle %s -> %o",S,p),s&&s.setState({filters:{type:p}}),we()},F=S=>{S.stopPropagation(),_=!_,k=!1,we()},N=S=>{S.stopPropagation(),k=!k,_=!1,we()};function O(S,I,X){return S.length===0?`${I}: Any`:S.length===1?`${I}: ${X(S[0])}`:`${I} (${S.length})`}if(s){let S=s.getState();S&&S.filters&&typeof S.filters=="object"&&(l=g(S.filters.status),a=S.filters.search||"",p=x(S.filters.type))}let V=i?wt(i):null;function ve(){if(!V)return[];let S=V.selectIssuesFor("tab:issues"),I=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),X=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!I&&!X)return S;let H=new Map;for(let G of S)H.set(String(G.id),G);if(I){let G=V.selectIssuesFor("tab:issues:resolved");for(let Y of G)H.set(String(Y.id),Y)}if(X){let G=V.selectIssuesFor("tab:issues:deferred");for(let Y of G)H.set(String(Y.id),Y)}return Array.from(H.values())}function ae(){let S=c;if(l.length>0&&!l.includes("ready")&&(S=S.filter(I=>l.includes(String(I.status||"")))),a){let I=a.toLowerCase();S=S.filter(X=>{let H=String(X.id).toLowerCase(),G=String(X.title||"").toLowerCase();return H.includes(I)||G.includes(I)})}return p.length>0&&(S=S.filter(I=>p.includes(String(I.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(Mt)),y`
      <div class="panel__header">
        <div class="filter-dropdown ${_?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${F}
          >
            ${O(l,"Status",at)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(I=>y`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(I)}
                    @change=${()=>w(I)}
                  />
                  ${I==="ready"?"Ready":at(I)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${k?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${N}>
            ${O(p,"Types",pr)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${Hr.map(I=>y`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${p.includes(I)}
                    @change=${()=>R(I)}
                  />
                  ${pr(I)}
                </label>
              `)}
          </div>
        </div>
        <input
          type="search"
          placeholder="Search…"
          @input=${v}
          .value=${a}
        />
      </div>
      <div class="panel__body" id="list-root">
        ${S.length===0?y`<div class="issues-block">
              <div class="muted" style="padding:10px 12px;">No issues</div>
            </div>`:y`<div class="issues-block">
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
                  ${S.map(I=>M(I))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function we(){me(ae(),t)}we();async function Ce(S,I){try{o("updateInline %s %o",S,Object.keys(I)),typeof I.title=="string"&&await e("edit-text",{id:S,field:"title",value:I.title}),typeof I.assignee=="string"&&await e("update-assignee",{id:S,assignee:I.assignee}),typeof I.status=="string"&&await e("update-status",{id:S,status:I.status}),typeof I.priority=="number"&&await e("update-priority",{id:S,priority:I.priority})}catch{}}async function Re(){o("load");let S=t.querySelector("#list-root"),I=S?S.scrollTop:0;try{V?c=ve():c=[]}catch(X){o("load failed: %o",X),c=[]}we();try{let X=t.querySelector("#list-root");X&&I>0&&(X.scrollTop=I)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let G=S.target;if((G&&typeof G.closest=="function"?G.closest("#list-root table.table"):null)&&!!!(G&&typeof G.closest=="function"&&(G.closest("input")||G.closest("textarea")||G.closest("select")))){let te=G&&typeof G.closest=="function"?G.closest("td"):null;if(te&&te.parentElement){let E=te.parentElement,A=E.parentElement;if(A&&A.querySelectorAll){let U=Array.from(A.querySelectorAll("tr")),z=Math.max(0,U.indexOf(E)),W=te.cellIndex||0,re=S.key==="ArrowDown"?Math.min(z+1,U.length-1):Math.max(z-1,0),pe=U[re],ye=pe&&pe.cells?pe.cells[W]:null;if(ye){let le=ye.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(le&&typeof le.focus=="function"){S.preventDefault(),le.focus();return}}}}}}let I=t.querySelector("#list-root tbody"),X=I?I.querySelectorAll("tr"):[];if(X.length===0)return;let H=0;if(h&&(H=Array.from(X).findIndex(Y=>(Y.getAttribute("data-issue-id")||"")===h),H<0&&(H=0)),S.key==="ArrowDown"){S.preventDefault();let G=X[Math.min(H+1,X.length-1)],Y=G?G.getAttribute("data-issue-id"):"",xe=Y||null;s&&xe&&s.setState({selected_id:xe}),h=xe,we()}else if(S.key==="ArrowUp"){S.preventDefault();let G=X[Math.max(H-1,0)],Y=G?G.getAttribute("data-issue-id"):"",xe=Y||null;s&&xe&&s.setState({selected_id:xe}),h=xe,we()}else if(S.key==="Enter"){S.preventDefault();let G=X[H],Y=G?G.getAttribute("data-issue-id"):"";if(Y){let xe=r||(E=>window.location.hash=E),te=s?s.getState().view:"issues";xe(kt(te,Y))}}});let be=S=>{let I=S.target;I&&!I.closest(".filter-dropdown")&&(_||k)&&(_=!1,k=!1,we())};if(document.addEventListener("click",be),s){let S=JSON.stringify(T());b=s.subscribe(I=>{if(I.selected_id!==h&&(h=I.selected_id,o("selected %s",h||"(none)"),we()),I.filters&&typeof I.filters=="object"){let X=g(I.filters.status),H=I.filters.search||"",G=!1;if(JSON.stringify(X)!==JSON.stringify(l)){l=X,Re();return}H!==a&&(a=H,G=!0);let xe=x(I.filters.type);JSON.stringify(xe)!==JSON.stringify(p)&&(p=xe,G=!0);let E=JSON.stringify(T());E!==S&&(S=E,G=!0),G&&we()}})}return V&&V.subscribe(()=>{try{c=ve(),we()}catch{}}),{load:Re,destroy(){t.replaceChildren(),document.removeEventListener("click",be),b&&(b(),b=null)}}}function to(t,e,r){let s=ge("views:nav"),n=null;function i(a){return c=>{c.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let c=e.getState().view||"issues";return y`
      <nav class="header-nav" aria-label="Primary">
        <a
          href="#/issues"
          class="tab ${c==="issues"?"active":""}"
          @click=${i("issues")}
          >Issues</a
        >
        <a
          href="#/epics"
          class="tab ${c==="epics"?"active":""}"
          @click=${i("epics")}
          >Epics</a
        >
        <a
          href="#/board"
          class="tab ${c==="board"?"active":""}"
          @click=${i("board")}
          >Board</a
        >
        <a
          href="#/worker"
          class="tab ${c==="worker"?"active":""}"
          @click=${i("worker")}
          >Worker</a
        >
      </nav>
    `}function l(){me(o(),t)}return l(),n=e.subscribe(()=>l()),{destroy(){n&&(n(),n=null),me(y``,t)}}}function ro(t,e,r,s){let n=document.createElement("dialog");n.id="new-issue-dialog",n.setAttribute("role","dialog"),n.setAttribute("aria-modal","true"),n.innerHTML=`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),l=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),c=n.querySelector("#new-labels"),p=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),b=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),k=n.querySelector(".new-issue__close");function g(){l.replaceChildren();let O=document.createElement("option");O.value="",O.textContent="\u2014 Select \u2014",l.appendChild(O);for(let V of Hr){let ve=document.createElement("option");ve.value=V,ve.textContent=pr(V),l.appendChild(ve)}a.replaceChildren();for(let V=0;V<=4;V+=1){let ve=document.createElement("option");ve.value=String(V);let ae=xt[V]||"Medium";ve.textContent=`${V} \u2013 ${ae}`,a.appendChild(ve)}}g();function x(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function T(O){o.disabled=O,l.disabled=O,a.disabled=O,c.disabled=O,p.disabled=O,b.disabled=O,_.disabled=O,_.textContent=O?"Creating\u2026":"Create"}function M(){h.textContent=""}function w(O){h.textContent=O}function v(){try{let O=window.localStorage.getItem("beads-ui.new.type");O?l.value=O:l.value="";let V=window.localStorage.getItem("beads-ui.new.priority");V&&/^\d$/.test(V)?a.value=V:a.value="2"}catch{l.value="",a.value="2"}}function R(){let O=l.value||"",V=a.value||"";O.length>0&&window.localStorage.setItem("beads-ui.new.type",O),V.length>0&&window.localStorage.setItem("beads-ui.new.priority",V)}function F(O){let V=/-(\d+)$/.exec(String(O||""));return V&&V[1]?Number(V[1]):-1}async function N(){M();let O=String(o.value||"").trim();if(O.length===0){w("Title is required"),o.focus();return}let V=Number(a.value||"2");if(!(V>=0&&V<=4)){w("Priority must be 0..4"),a.focus();return}let ve=String(l.value||""),ae=String(p.value||""),we=String(c.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),Ce={title:O};ve.length>0&&(Ce.type=ve),String(V).length>0&&(Ce.priority=V),ae.length>0&&(Ce.description=ae),T(!0);try{await e("create-issue",Ce)}catch{T(!1),w("Failed to create issue");return}R();let Re=null;try{Re=await e("list-issues",{filters:{status:"open",limit:50}})}catch{Re=null}let be="";if(Array.isArray(Re)){let S=Re.filter(I=>String(I.title||"")===O);if(S.length>0){let I=S[0];for(let X of S){let H=F(I.id||"");F(X.id||"")>H&&(I=X)}be=String(I.id||"")}}if(be&&we.length>0)for(let S of we)try{await e("label-add",{id:be,label:S})}catch{}if(be){try{r.gotoIssue(be)}catch{}try{s&&s.setState({selected_id:be})}catch{}}T(!1),x()}return n.addEventListener("cancel",O=>{O.preventDefault(),x()}),k.addEventListener("click",()=>x()),b.addEventListener("click",()=>x()),n.addEventListener("keydown",O=>{O.key==="Enter"&&(O.ctrlKey||O.metaKey)&&(O.preventDefault(),N())}),i.addEventListener("submit",O=>{O.preventDefault(),N()}),{open(){i.reset(),M(),v();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){x()}}}var so={open:0,in_progress:.5,resolved:.85,closed:1},ao=new Set(["queued","starting","running","cancelling"]),no={in_progress:0,open:1,resolved:2,closed:3};function oo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function va(t){return t&&t in so?so[t]:0}function io(t){return t&&t in no?no[t]:Number.MAX_SAFE_INTEGER}function Ds(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function xa(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Sa(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function lo(t,e){return e.filter(r=>Sa(r)===t)}function Aa(t,e){return lo(t,e).some(r=>typeof r.status=="string"&&ao.has(r.status))}function qr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function $a(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+va(s),0);return Math.round(e/t.length*100)}function Ta(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:Ds(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function Ea(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(g=>g.status!=="closed"),i=e.filter(g=>g.status==="closed").length,o=e.map(g=>String(g.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=lo(t.id,l),c=a.find(g=>typeof g.status=="string"&&ao.has(g.status))||null,p=c?a.filter(g=>g.id!==c.id).slice(0,3):a.slice(0,3),h=c!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),_={open:e.filter(g=>g.status==="open").length,in_progress:e.filter(g=>g.status==="in_progress").length,resolved:e.filter(g=>g.status==="resolved").length,closed:e.filter(g=>g.status==="closed").length},k=Ta(t,{is_parent:!0,has_spec_id:Ds(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:_,progress_percent:$a(o),current_job:c,current_job_elapsed_label:qr(c?.elapsedMs),recent_jobs:p,has_active_job:h,has_open_pr:b>0,open_pr_count:b,runnable:k}}function co(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of l)s.has(b.id)||a.push({...b,parent:i.id});let c=Array.isArray(e.jobs)?e.jobs:[],p=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||Aa(i.id,c)||p>0||xa(i)&&Ds(i))&&n.push(Ea(i,a,e))}return n.sort(Ca),n}function Ca(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=io(t.status)-io(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=oo(e.updated_at??e.created_at)-oo(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function uo(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function po(t,e){return t.length===0?y`<section class="worker-pr-panel">No open PRs</section>`:y`
    <section class="worker-pr-panel">
      ${t.map(r=>y`
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
  `}function fo(t){return y`
    <section class="worker-pr-summary">
      ${t.length===0?y`<div>No workspace PRs</div>`:t.map(e=>y`
              <div class="worker-pr-summary__item">
                <span class="mono">#${e.number}</span>
                <span>${e.title}</span>
              </div>
            `)}
    </section>
  `}function ho(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",l=!1,a="";function c(){me(y`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${l?y`
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
                `:y`
                  <button type="button" data-worker-spec-edit @click=${p}>
                    Edit spec
                  </button>
                `}
          </header>

          ${l?y`
                <textarea
                  .value=${o}
                  @input=${_=>{o=_.currentTarget.value}}
                ></textarea>
              `:y`<pre>${i}</pre>`}
          ${a?y`
                <p class="worker-spec-panel__error" role="alert">
                  ${a}
                </p>
              `:""}
        </section>
      `,t)}function p(){l=!0,o=i,a="",c()}function h(){l=!1,o=i,a="",c()}async function b(){let _=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let k=await r(_,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),g=await k.json();if(k.ok===!1)throw new Error(typeof g?.error=="string"&&g.error.length>0?g.error:"Failed to save spec");i=g.content||o,o=i,l=!1,a="",c()}catch(k){a=k instanceof Error&&k.message.length>0?k.message:"Failed to save spec",c()}}return{async load(_,k){s=_,n=k;let g=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(g)).json()).content||""}catch{i=""}o=i,l=!1,a="",c()},clear(){s="",n="",i="",o="",l=!1,a="",me(y``,t)}}}function go(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],l="";async function a(c=[],p=[]){let h=s,b=h?i.filter(g=>g.issueId===h.id):[],_=b.find(g=>["queued","starting","running","cancelling"].includes(String(g.status)))||null,k=_?b.filter(g=>g.id!==_.id):b;if(me(y`
        <section class="worker-detail">
          ${h?y`
                <header class="worker-detail__summary">
                  <h2>${h.id}</h2>
                  <p>${h.title||"(no title)"}</p>
                  <div class="worker-detail__badges">
                    <span>${h.status||"open"}</span>
                    ${_?y`<span class="worker-badge worker-badge--active"
                          >${_.status}</span
                        >`:null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!_}
                      @click=${()=>{s&&e.onRunRalph?.(s.id)}}
                    >
                      Run bd-ralph
                    </button>
                  </div>
                </header>
              `:y`<div class="worker-empty">No parent selected.</div>`}
          ${h?y`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${_?y`
                        <div class="worker-detail__job-card">
                          <div>${_.command||"worker job"}</div>
                          <div>${_.status}</div>
                          <div>${qr(_.elapsedMs)}</div>
                          ${_.wasForceKilled?y`<div>Force killed</div>`:null}
                          ${_.isCancellable?y`
                                <button
                                  type="button"
                                  data-cancel-job=${_.id}
                                  @click=${()=>{_.id&&e.onCancelJob?.(_.id)}}
                                >
                                  Cancel
                                </button>
                              `:null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${l?y`<p>${l}</p>`:o.length>0?y`<pre>${o.join(`
`)}</pre>`:y`<p>No log output yet.</p>`}
                        </div>
                      `:y`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${k.map(g=>y`
                        <li>
                          <span>${g.status}</span>
                          <span>${qr(g.elapsedMs)}</span>
                          ${g.errorSummary?y`<span>${g.errorSummary}</span>`:null}
                          ${g.wasForceKilled?y`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${po(c,{onRunPrReview:g=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:g.number})})}
          ${fo(p)}
        </section>
      `,t),s){let g=s,x=t.querySelector("#worker-detail-spec-host");x&&await ho(x,{fetch_impl:r}).load(g.id,n)}}return{async load(c,p,h=[]){if(s=c,n=p,i=h,o=[],l="",!c||!p){await a([],[]);return}let b={items:[]},_={items:[]};try{b=await(await r(`/api/worker/prs/${encodeURIComponent(c.id)}?workspace=${encodeURIComponent(p)}`)).json()}catch{b={items:[]}}try{_=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(p)}`)).json()}catch{_={items:[]}}let k=i.find(g=>g.issueId===c.id&&["queued","starting","running","cancelling"].includes(String(g.status)));if(k?.id)try{let g=await r(`/api/worker/jobs/${encodeURIComponent(k.id)}/log?workspace=${encodeURIComponent(p)}&tail=20`);if(!g.ok)throw new Error("log not ok");let x=await g.json();o=Array.isArray(x.tail)?x.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(b.items)?b.items:[],Array.isArray(_.items)?_.items:[])},clear(){s=null,n="",i=[],o=[],l="",me(y``,t)}}}function bo(t,e){return y`
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
  `}function yo(t){let e=(t.status||"open").toString().toLowerCase().replace(/\s+/g,"_");return y`
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
  `}var Ra=new Set(["bug","feature","task","epic","chore","decision"]);function Ia(t){let e=(t||"").toString().toLowerCase();return Ra.has(e)?e:"neutral"}function La(t){return(t||"open").toString().toLowerCase().replace(/\s+/g,"_")}function _o(t,e){let r=t.current_job||null,s=La(t.status),n=Ia(t.issue_type);return y`
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
        ${t.spec_id?y`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:y`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?y`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?y`
              <span class="worker-badge worker-badge--active"
                >● ${at(r.status||"running")}</span
              >
              <span class="worker-badge worker-badge--elapsed mono"
                >${t.current_job_elapsed_label}</span
              >
            `:t.runnable?y`<span class="worker-badge worker-badge--ready"
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
        ${t.child_counts.open>0?y`<span class="worker-count worker-count--open"
              ><b>${t.child_counts.open}</b> open</span
            >`:null}
        ${t.child_counts.in_progress>0?y`<span class="worker-count worker-count--in-progress"
              ><b>${t.child_counts.in_progress}</b> in progress</span
            >`:null}
        ${t.child_counts.resolved>0?y`<span class="worker-count worker-count--resolved"
              ><b>${t.child_counts.resolved}</b> resolved</span
            >`:null}
        ${t.child_counts.closed>0?y`<span class="worker-count worker-count--closed"
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
        ${r?.isCancellable?y`
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
  `}function mo(t,e){return t.length===0?y`<div class="worker-empty">No worker parents found.</div>`:y`
    <div class="worker-tree">
      ${t.map(r=>{let s=e.expanded_ids.has(r.id),n=r.open_pr_count===1&&!r.has_active_job&&r.status!=="closed";return y`
          <article class="worker-tree__item">
            ${_o(r,{expanded:s,selected:e.selected_parent_id===r.id,pr_review_enabled:n,onSelect:()=>e.onSelectParent(r.id),onToggleExpand:()=>e.onToggleExpand(r.id),onRunRalph:()=>e.onRunRalph(r.id),onRunPrReview:()=>e.onRunPrReview(r.id),onCancelJob:e.onCancelJob})}
            ${s?y`
                  <div class="worker-tree__children">
                    ${r.visible_children.map(i=>yo(i))}
                    ${r.hidden_closed_count>0?y`
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
  `}function wo(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(c){let p=e.store.getState(),h=Array.isArray(p.worker?.show_closed_children)?p.worker.show_closed_children:[],b=h.includes(c)?h.filter(_=>_!==c):[...h,c];e.store.setState({worker:{show_closed_children:b}})}function o(){let c=e.store.getState(),p=!!c.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],b=c.worker?.selected_parent_id||null,_=uo(co(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:p,show_closed_children:c.worker?.show_closed_children||[]}),n),k=b&&_.find(x=>x.id===b)||null;me(y`
        <section
          class="worker-layout ${k?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${bo(n,{onSearchInput(x){n={...n,search:x},o()},onStatusChange(x){n={...n,status:x},o()},onRunnableToggle(x){n={...n,runnable_only:x},o()},onOpenPrToggle(x){n={...n,has_open_pr_only:x},o()}})}
            ${mo(_,{expanded_ids:r,selected_parent_id:b,onSelectParent(x){let T=b===x?null:x;e.store.setState({worker:{selected_parent_id:T}})},onToggleExpand(x){r.has(x)?r.delete(x):r.add(x),o()},onToggleClosed(x){i(x),o()},onRunRalph(x){e.onRunRalph?.(x)},onRunPrReview(x){e.onRunPrReview?.(x)},onCancelJob(x){e.onCancelJob?.(x)}})}
          </aside>

          ${k?y`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let g=t.querySelector("#worker-detail-mount");g?(s||(s=go(g,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(k,c.workspace?.current?.path||"",h)):s?.clear()}let l=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),me(y``,t)},destroy(){l(),a(),s?.clear(),me(y``,t)}}}function ko(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function vo(t,e,r,s=async()=>{},n=async()=>{}){let i=ge("views:workspace-picker"),o=null,l=!1,a=!1,c=!1;async function p(T){let w=T.target.value,R=e.getState().workspace?.current?.path||"";if(w&&w!==R){i("switching workspace to %s",w),l=!0,x();try{await r(w)}catch(F){i("workspace switch failed: %o",F)}finally{l=!1,x()}}}async function h(){let T=e.getState(),M=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!M||a||c)){i("syncing workspace %s",M),a=!0,x();try{await s(M)}catch(w){i("workspace sync failed: %o",w)}finally{a=!1,x()}}}async function b(){let T=e.getState(),M=T.workspace?.current?.path||T.workspace?.available?.[0]?.path||"";if(!(!M||a||c)){i("git-pulling workspace %s",M),c=!0,x();try{await n(M)}catch(w){i("workspace git pull failed: %o",w)}finally{c=!1,x()}}}function _(T){return T?y`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${h}
        ?disabled=${l||a||c}
        aria-label="Sync current workspace"
      >
        ${a?"Syncing\u2026":"Sync"}
      </button>
    `:y``}function k(T){return T?y`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${b}
        ?disabled=${l||a||c}
        aria-label="Git pull current workspace"
      >
        ${c?"Pulling\u2026":"Git Pull"}
      </button>
    `:y``}function g(){let T=e.getState(),M=T.workspace?.current,w=T.workspace?.available||[],v=M?.path||w[0]?.path||"";if(w.length===0)return y``;if(w.length===1){let R=ko(w[0].path);return y`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${w[0].path}"
            >${R}</span
          >
          ${_(v)} ${k(v)}
          ${a||c?y`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return y`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${p}
          ?disabled=${l||a||c}
          aria-label="Select project workspace"
        >
          ${w.map(R=>y`
              <option
                value="${R.path}"
                ?selected=${R.path===v}
                title="${R.path}"
              >
                ${ko(R.path)}
              </option>
            `)}
        </select>
        ${_(v)} ${k(v)}
        ${l||a||c?y`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function x(){me(g(),t)}return x(),o=e.subscribe(()=>x()),{destroy(){o&&(o(),o=null),me(y``,t)}}}var xo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace","git-pull-workspace"];function Ns(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=Ns()){return{id:r,type:t,payload:e}}function Ao(t={}){let e=ge("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,l=null,a=!0,c=new Map,p=[],h=new Map,b=new Set;function _(v){for(let R of Array.from(b))try{R(v)}catch{}}function k(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),_(i);let v=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),R=(r.jitterRatio||0)*v,F=Math.max(0,Math.round(v+(Math.random()*2-1)*R));e("ws retry in %d ms (attempt %d)",F,o+1),l=setTimeout(()=>{l=null,w()},F)}function g(v){try{n?.send(JSON.stringify(v))}catch(R){e("ws send failed",R)}}function x(){for(i="open",e("ws open"),_(i),o=0;p.length;){let v=p.shift();v&&g(v)}}function T(v){let R;try{R=JSON.parse(String(v.data))}catch{e("ws received non-JSON message");return}if(!R||typeof R.id!="string"||typeof R.type!="string"){e("ws received invalid envelope");return}if(c.has(R.id)){let N=c.get(R.id);c.delete(R.id),R.ok?N?.resolve(R.payload):N?.reject(R.error||new Error("ws error"));return}let F=h.get(R.type);if(F&&F.size>0)for(let N of Array.from(F))try{N(R.payload)}catch(O){e("ws event handler error",O)}else e("ws received unhandled message type: %s",R.type)}function M(){i="closed",e("ws closed"),_(i);for(let[v,R]of c.entries())R.reject(new Error("ws disconnected")),c.delete(v);o+=1,k()}function w(){if(!a)return;let v=s();try{n=new WebSocket(v),e("ws connecting %s",v),i="connecting",_(i),n.addEventListener("open",x),n.addEventListener("message",T),n.addEventListener("error",()=>{}),n.addEventListener("close",M)}catch(R){e("ws connect failed %o",R),k()}}return w(),{send(v,R){if(!xo.includes(v))return Promise.reject(new Error(`unknown message type: ${v}`));let F=Ns(),N=So(v,R,F);return e("send %s id=%s",v,F),new Promise((O,V)=>{c.set(F,{resolve:O,reject:V,type:v}),n&&n.readyState===n.OPEN?g(N):(e("queue %s id=%s (state=%s)",v,F,i),p.push(N))})},on(v,R){h.has(v)||h.set(v,new Set);let F=h.get(v);return F?.add(R),()=>{F?.delete(R)}},onConnection(v){return b.add(v),()=>{b.delete(v)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{n?.close()}catch{}},getState(){return i}}}var Da=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,fr={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function Ps(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function $o(t){if(!Ps(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!Ps(s)||typeof s.fg!="string"||!Da.test(s.fg)||(e[r]={fg:s.fg});return e}function Na(t){return Ps(t)?{prefix:$o(t.prefix),exact:$o(t.exact)}:{prefix:{},exact:{}}}function Pa(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Na(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):fr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(fr.detail))}:{label_display_policy:{visible_prefixes:fr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):fr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(fr.detail))}}async function Oa(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function Ma(t){let e=ge("main");e("bootstrap start");let r=y`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;me(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),c=document.getElementById("detail-panel");if(a&&n&&i&&o&&l&&c){let w=function(m,u){let D="Request failed",K="";if(m&&typeof m=="object"){let se=m;if(typeof se.message=="string"&&se.message.length>0&&(D=se.message),typeof se.details=="string")K=se.details;else if(se.details&&typeof se.details=="object")try{K=JSON.stringify(se.details,null,2)}catch{K=""}}else typeof m=="string"&&m.length>0&&(D=m);let de=u&&u.length>0?`Failed to load ${u}`:"Request failed";M.open(de,D,K)},Ce=function(m){if(!m)return"Unknown";let u=m.split("/").filter(Boolean);return u.length>0?u[u.length-1]:"Unknown"},De=function(){Ie&&(clearInterval(Ie),Ie=null)},ut=function(m){let u=m?.status;return Array.isArray(u)?u.map(D=>String(D)).filter(Boolean):typeof u=="string"&&u!==""&&u!=="all"?[u]:[]},ft=function(m){let u=ut(m),[D]=u;return u.length===1&&D==="ready"?{type:"ready-issues"}:u.length===1&&D==="in_progress"?{type:"in-progress-issues"}:u.length===1&&D==="deferred"?{type:"deferred-issues"}:u.length===1&&D==="closed"?{type:"closed-issues"}:u.length===1&&D==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},st=function(m){if(m.view==="issues"){let u=ft(m.filters||{}),D=ut(m.filters||{}),K=D.includes("resolved")&&!D.includes("ready")&&!(D.length===1&&D[0]==="resolved"),de=D.includes("deferred")&&!(D.length===1&&D[0]==="deferred"),se=JSON.stringify(u);try{N.register("tab:issues",u)}catch(fe){e("register issues store failed: %o",fe)}let ht=`tab:issues:${se}`;if((!ce||se!==He)&&!Q.has(ht)&&(Q.add(ht),F.subscribeList("tab:issues",u).then(fe=>{ce=fe,He=se}).catch(fe=>{e("subscribe issues failed: %o",fe),w(fe,"issues list")}).finally(()=>{Q.delete(ht)})),K&&!Ue&&!Q.has("tab:issues:resolved")){try{N.register("tab:issues:resolved",{type:"resolved-issues"})}catch(fe){e("register issues:resolved store failed: %o",fe)}Q.add("tab:issues:resolved"),F.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(fe=>Ue=fe).catch(fe=>{e("subscribe issues resolved failed: %o",fe),w(fe,"issues list (Resolved)")}).finally(()=>{Q.delete("tab:issues:resolved")})}if(de&&!Pe&&!Q.has("tab:issues:deferred")){try{N.register("tab:issues:deferred",{type:"deferred-issues"})}catch(fe){e("register issues:deferred store failed: %o",fe)}Q.add("tab:issues:deferred"),F.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(fe=>Pe=fe).catch(fe=>{e("subscribe issues deferred failed: %o",fe),w(fe,"issues list (Deferred)")}).finally(()=>{Q.delete("tab:issues:deferred")})}if(!K&&Ue){Ue().catch(()=>{}),Ue=null;try{N.unregister("tab:issues:resolved")}catch(fe){e("unregister issues:resolved failed: %o",fe)}}if(!de&&Pe){Pe().catch(()=>{}),Pe=null;try{N.unregister("tab:issues:deferred")}catch(fe){e("unregister issues:deferred failed: %o",fe)}}}else if(ce){ce().catch(()=>{}),ce=null,He=null;try{N.unregister("tab:issues")}catch(u){e("unregister issues store failed: %o",u)}if(Ue){Ue().catch(()=>{}),Ue=null;try{N.unregister("tab:issues:resolved")}catch(u){e("unregister issues:resolved failed: %o",u)}}if(Pe){Pe().catch(()=>{}),Pe=null;try{N.unregister("tab:issues:deferred")}catch(u){e("unregister issues:deferred failed: %o",u)}}}if(m.view==="worker"){try{N.register("tab:worker:all",{type:"all-issues"})}catch(u){e("register worker store failed: %o",u)}!ze&&!Q.has("tab:worker:all")&&(Q.add("tab:worker:all"),F.subscribeList("tab:worker:all",{type:"all-issues"}).then(u=>{ze=u}).catch(u=>{e("subscribe worker failed: %o",u),w(u,"worker")}).finally(()=>{Q.delete("tab:worker:all")}))}else if(ze){ze().catch(()=>{}),ze=null;try{N.unregister("tab:worker:all")}catch(u){e("unregister worker store failed: %o",u)}}if(m.view==="epics"){try{N.register("tab:epics",{type:"epics"})}catch(u){e("register epics store failed: %o",u)}!tt&&!Q.has("tab:epics")&&(Q.add("tab:epics"),F.subscribeList("tab:epics",{type:"epics"}).then(u=>{tt=u}).catch(u=>{e("subscribe epics failed: %o",u),w(u,"epics")}).finally(()=>{Q.delete("tab:epics")}))}else if(tt){tt().catch(()=>{}),tt=null;try{N.unregister("tab:epics")}catch(u){e("unregister epics store failed: %o",u)}}if(m.view==="board"){if(!Oe&&!Q.has("tab:board:ready")){try{N.register("tab:board:ready",{type:"ready-issues"})}catch(u){e("register board:ready store failed: %o",u)}Q.add("tab:board:ready"),F.subscribeList("tab:board:ready",{type:"ready-issues"}).then(u=>Oe=u).catch(u=>{e("subscribe board ready failed: %o",u),w(u,"board (Ready)")}).finally(()=>{Q.delete("tab:board:ready")})}if(!Me&&!Q.has("tab:board:in-progress")){try{N.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(u){e("register board:in-progress store failed: %o",u)}Q.add("tab:board:in-progress"),F.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(u=>Me=u).catch(u=>{e("subscribe board in-progress failed: %o",u),w(u,"board (In Progress)")}).finally(()=>{Q.delete("tab:board:in-progress")})}if(!Ye&&!Q.has("tab:board:deferred")){try{N.register("tab:board:deferred",{type:"deferred-issues"})}catch(u){e("register board:deferred store failed: %o",u)}Q.add("tab:board:deferred"),F.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(u=>Ye=u).catch(u=>{e("subscribe board deferred failed: %o",u),w(u,"board (Deferred)")}).finally(()=>{Q.delete("tab:board:deferred")})}if(!rt&&!Q.has("tab:board:resolved")){try{N.register("tab:board:resolved",{type:"resolved-issues"})}catch(u){e("register board:resolved store failed: %o",u)}Q.add("tab:board:resolved"),F.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(u=>rt=u).catch(u=>{e("subscribe board resolved failed: %o",u),w(u,"board (Resolved)")}).finally(()=>{Q.delete("tab:board:resolved")})}if(!Ze&&!Q.has("tab:board:closed")){try{N.register("tab:board:closed",{type:"closed-issues"})}catch(u){e("register board:closed store failed: %o",u)}Q.add("tab:board:closed"),F.subscribeList("tab:board:closed",{type:"closed-issues"}).then(u=>Ze=u).catch(u=>{e("subscribe board closed failed: %o",u),w(u,"board (Closed)")}).finally(()=>{Q.delete("tab:board:closed")})}if(!Xe&&!Q.has("tab:board:blocked")){try{N.register("tab:board:blocked",{type:"blocked-issues"})}catch(u){e("register board:blocked store failed: %o",u)}Q.add("tab:board:blocked"),F.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(u=>Xe=u).catch(u=>{e("subscribe board blocked failed: %o",u),w(u,"board (Blocked)")}).finally(()=>{Q.delete("tab:board:blocked")})}}else{if(Oe){Oe().catch(()=>{}),Oe=null;try{N.unregister("tab:board:ready")}catch(u){e("unregister board:ready failed: %o",u)}}if(Me){Me().catch(()=>{}),Me=null;try{N.unregister("tab:board:in-progress")}catch(u){e("unregister board:in-progress failed: %o",u)}}if(Ye){Ye().catch(()=>{}),Ye=null;try{N.unregister("tab:board:deferred")}catch(u){e("unregister board:deferred failed: %o",u)}}if(rt){rt().catch(()=>{}),rt=null;try{N.unregister("tab:board:resolved")}catch(u){e("unregister board:resolved failed: %o",u)}}if(Ze){Ze().catch(()=>{}),Ze=null;try{N.unregister("tab:board:closed")}catch(u){e("unregister board:closed failed: %o",u)}}if(Xe){Xe().catch(()=>{}),Xe=null;try{N.unregister("tab:board:blocked")}catch(u){e("unregister board:blocked failed: %o",u)}}}};var p=w,h=Ce,b=De,_=ut,k=ft,g=st;let x=document.getElementById("header-loading"),T=dn(x),M=Xn(t),v=Ao(),R=T.wrapSend((m,u)=>v.send(m,u)),F=rn(R),N=sn();v.on("snapshot",m=>{let u=m,D=u&&typeof u.id=="string"?u.id:"",K=D?N.getStore(D):null;if(K&&u&&u.type==="snapshot")try{K.applyPush(u)}catch{}}),v.on("upsert",m=>{let u=m,D=u&&typeof u.id=="string"?u.id:"",K=D?N.getStore(D):null;if(K&&u&&u.type==="upsert")try{K.applyPush(u)}catch{}}),v.on("delete",m=>{let u=m,D=u&&typeof u.id=="string"?u.id:"",K=D?N.getStore(D):null;if(K&&u&&u.type==="delete")try{K.applyPush(u)}catch{}});let O=wt(N);async function V(){e("clearing all subscriptions for workspace switch"),ce&&(ce().catch(()=>{}),ce=null),Pe&&(Pe().catch(()=>{}),Pe=null),tt&&(tt().catch(()=>{}),tt=null),Oe&&(Oe().catch(()=>{}),Oe=null),Me&&(Me().catch(()=>{}),Me=null),Ye&&(Ye().catch(()=>{}),Ye=null),Ue&&(Ue().catch(()=>{}),Ue=null),ze&&(ze().catch(()=>{}),ze=null),rt&&(rt().catch(()=>{}),rt=null),Ze&&(Ze().catch(()=>{}),Ze=null),Xe&&(Xe().catch(()=>{}),Xe=null);let m=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let D of m)try{N.unregister(D)}catch{}let u=H.getState();if(u.selected_id)try{N.unregister(`detail:${u.selected_id}`)}catch{}He=null,st(H.getState())}async function ve(m){e("requesting workspace switch to %s",m);try{let u=await v.send("set-workspace",{path:m});e("workspace switch result: %o",u),u&&u.workspace&&(H.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),u.changed&&(await V(),Z("Switched to "+Ce(m),"success",2e3)))}catch(u){throw e("workspace switch failed: %o",u),Z("Failed to switch workspace","error",3e3),u}}async function ae(m){e("requesting workspace sync for %s",m);try{let u=await v.send("sync-workspace",{});if(e("workspace sync result: %o",u),u?.workspace&&H.setState({workspace:{current:{path:u.workspace.root_dir,database:u.workspace.db_path}}}),u?.pulled===!0&&u?.pushed===!1){let D=u?.push_error?`: ${u.push_error}`:"";Z(`Pulled, but push failed${D}`,"warning",4e3);return}Z("Synced "+Ce(m),"success",2e3)}catch(u){e("workspace sync failed: %o",u);let D=u?.code,K=u?.message;if(D==="busy"){Z("Sync skipped: another operation is running","warning",3e3);return}let de=K?`: ${K}`:"";throw Z(`Sync failed${de}`,"error",3e3),u}}async function we(m){e("requesting workspace git pull for %s",m);try{let u=await v.send("git-pull-workspace",{});e("workspace git pull result: %o",u);let D=u?.status;if(D==="up_to_date"){Z("Already up to date","success",2e3);return}if(D==="stash_pop_conflict"){Z("Git pulled, but stash pop conflicted (check git stash list)","warning",4e3);return}Z("Git pulled "+Ce(m),"success",2e3)}catch(u){e("workspace git pull failed: %o",u);let D=u?.code,K=u?.message;if(D==="rebase_conflict"){Z("Git pull conflicts \u2014 reverted (manual resolve required)","error",4e3);return}if(D==="rebase_conflict_abort_failed"){Z("Git pull conflicts AND rebase --abort failed \u2014 repo left mid-rebase, run 'git rebase --abort' manually","error",6e3);return}if(D==="busy"){Z("Git pull skipped: another operation is running","warning",3e3);return}let de=K?`: ${K}`:"";throw Z(`Git pull failed${de}`,"error",3e3),u}}async function Re(){try{let m=await v.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let u=m.workspaces.map(se=>({path:se.path,database:se.database,pid:se.pid,version:se.version})),D=m.current?{path:m.current.root_dir,database:m.current.db_path}:null;H.setState({workspace:{current:D,available:u}});let K=H.getState().config.workspace_config.default_workspace,de=window.localStorage.getItem("beads-ui.workspace");if(K&&D?.path===K){window.localStorage.setItem("beads-ui.workspace",K);return}de&&D&&de!==D.path&&(u.some(ht=>ht.path===de)?(e("restoring saved workspace preference: %s",de),await ve(de)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(m){e("failed to load workspaces: %o",m)}}v.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(H.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Re(),V())});let be=!1;if(typeof v.onConnection=="function"){let m=u=>{e("ws state %s",u),u==="reconnecting"||u==="closed"?(be=!0,Z("Connection lost. Reconnecting\u2026","error",4e3)):u==="open"&&be&&(be=!1,Z("Reconnected","success",2200),Oa(H,(D,K)=>{e(`${D}: %o`,K)}))};v.onConnection(m)}let S={status:"all",search:"",type:""};try{let m=window.localStorage.getItem("beads-ui.filters");if(m){let u=JSON.parse(m);if(u&&typeof u=="object"){let D=["bug","feature","task","epic","chore"],K="";if(typeof u.type=="string"&&D.includes(u.type))K=u.type;else if(Array.isArray(u.types)){let de="";for(let se of u.types)if(D.includes(String(se))){de=se;break}K=de}S={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(u.status)?u.status:"all",search:typeof u.search=="string"?u.search:"",type:K}}}}catch(m){e("filters parse error: %o",m)}let I="issues";try{let m=window.localStorage.getItem("beads-ui.view");(m==="issues"||m==="epics"||m==="board"||m==="worker")&&(I=m)}catch(m){e("view parse error: %o",m)}let X={closed_filter:"today",show_deferred_column:!1};try{let m=window.localStorage.getItem("beads-ui.board");if(m){let u=JSON.parse(m);if(u&&typeof u=="object"){let D=String(u.closed_filter||"today");(D==="today"||D==="3"||D==="7")&&(X.closed_filter=D)}}}catch(m){e("board prefs parse error: %o",m)}let H=cn({config:Pa(),filters:S,view:I,board:X}),G=nn(H);G.start();let Y=async(m,u)=>{try{return await R(m,u)}catch{return[]}};s&&to(s,H,G);let xe=document.getElementById("workspace-picker");xe&&vo(xe,H,ve,ae,we),Re();let te=ro(t,(m,u)=>R(m,u),G,H);try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>te.open())}catch{}let A=eo(a,async(m,u)=>{if(m==="list-issues")try{return O.selectIssuesFor("tab:issues")}catch(D){return e("list selectors failed: %o",D),[]}return Y(m,u)},m=>{let u=kr(m);u&&G.gotoIssue(u)},H,F,N);H.subscribe(m=>{let u={status:m.filters.status,search:m.filters.search,type:typeof m.filters.type=="string"?m.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(u))}),H.subscribe(m=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:m.board.closed_filter}))}),A.load();let U=Qn(c,H,()=>{let m=H.getState();H.setState({selected_id:null});try{let u=m.view||"issues";G.gotoView(u)}catch{}}),z=null;z=Yn(U.getMount(),Y,m=>{let u=kr(m);if(u)G.gotoIssue(u);else{let D=zt(m);G.gotoView(D)}},N,H);let W=H.getState().selected_id;if(W){c.hidden=!1,U.open(W),z&&z.load(W);let m=`detail:${W}`,u={type:"issue-detail",params:{id:W}};try{N.register(m,u)}catch(D){e("register detail store failed: %o",D)}F.subscribeList(m,u).catch(D=>{e("detail subscribe failed: %o",D),w(D,"issue details")})}let re=null;H.subscribe(m=>{let u=m.selected_id;if(u){c.hidden=!1,U.open(u),z&&z.load(u);let D=`detail:${u}`,K={type:"issue-detail",params:{id:u}};try{N.register(D,K)}catch{}F.subscribeList(D,K).then(de=>{re&&re().catch(()=>{}),re=de}).catch(de=>{e("detail subscribe failed: %o",de),w(de,"issue details")})}else{try{U.close()}catch{}z&&z.clear(),c.hidden=!0,re&&(re().catch(()=>{}),re=null)}});let pe=tn(Y),ye=Zn(i,pe,m=>G.gotoIssue(m),F,N,H),le=bn(o,pe,m=>G.gotoIssue(m),H,F,N,Y),Se=[],Ie=null;async function $e(){let m=H.getState().workspace.current?.path;if(!m){Se=[];return}try{let D=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(m)}`)).json();Se=Array.isArray(D.items)?D.items:[]}catch{Se=[]}}async function Je(){De(),await $e(),Be.load(),Ie=setInterval(()=>{$e().then(()=>Be.load())},3e3)}async function Le(m,u){let D=H.getState().workspace.current?.path;D&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:m,workspace:D,issueId:u.issueId,prNumber:u.prNumber})}),await $e(),Be.load())}async function Ke(m){let u=H.getState().workspace.current?.path;u&&(await fetch(`/api/worker/jobs/${encodeURIComponent(m)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:u})}),await $e(),Be.load())}let Be=wo(l,{store:H,issue_stores:N,fetch_impl:fetch,getWorkerJobs:()=>Se,onRunRalph:m=>{Le("bd-ralph",{issueId:m})},onRunPrReview:m=>{Le("pr-review",{issueId:typeof m=="string"?m:m?.issueId??void 0,prNumber:typeof m=="object"&&typeof m?.prNumber=="number"?m.prNumber:void 0})},onCancelJob:m=>{Ke(m)}}),ce=null,tt=null,Ue=null,Pe=null,ze=null,Oe=null,Me=null,Ye=null,rt=null,Ze=null,Xe=null,Q=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(Q),getActivityCount:()=>T.getCount(),getActiveRequests:()=>T.getActiveRequests()};let He=null,yt=m=>{n&&i&&o&&l&&c&&(n.hidden=m.view!=="issues",i.hidden=m.view!=="epics",o.hidden=m.view!=="board",l.hidden=m.view!=="worker"),st(m),!m.selected_id&&m.view==="epics"&&ye.load(),!m.selected_id&&m.view==="board"&&le.load(),m.view==="worker"?(Je(),Be.load()):De(),window.localStorage.setItem("beads-ui.view",m.view)};H.subscribe(yt),yt(H.getState()),window.addEventListener("keydown",m=>{let u=m.ctrlKey||m.metaKey,D=String(m.key||"").toLowerCase(),K=m.target,de=K&&K.tagName?String(K.tagName).toLowerCase():"",se=de==="input"||de==="textarea"||de==="select"||K&&typeof K.isContentEditable=="boolean"&&K.isContentEditable;u&&D==="n"&&(se||(m.preventDefault(),te.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ma(e)});export{Ma as bootstrap,Pa as readBootstrapConfig,Oa as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
