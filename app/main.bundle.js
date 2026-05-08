var To=Object.create;var Vr=Object.defineProperty;var Eo=Object.getOwnPropertyDescriptor;var Co=Object.getOwnPropertyNames;var Ro=Object.getPrototypeOf,Io=Object.prototype.hasOwnProperty;var Lo=(t,e,r)=>e in t?Vr(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var Jr=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Do=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Co(e))!Io.call(t,n)&&n!==r&&Vr(t,n,{get:()=>e[n],enumerable:!(s=Eo(e,n))||s.enumerable});return t};var No=(t,e,r)=>(r=t!=null?To(Ro(t)):{},Do(e||!t||!t.__esModule?Vr(r,"default",{value:t,enumerable:!0}):r,t));var fe=(t,e,r)=>Lo(t,typeof e!="symbol"?e+"":e,r);var Ys=Jr((Wa,Ks)=>{var Mt=1e3,Ft=Mt*60,Bt=Ft*60,Rt=Bt*24,Bo=Rt*7,Uo=Rt*365.25;Ks.exports=function(t,e){e=e||{};var r=typeof t;if(r==="string"&&t.length>0)return zo(t);if(r==="number"&&isFinite(t))return e.long?qo(t):Ho(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function zo(t){if(t=String(t),!(t.length>100)){var e=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(t);if(e){var r=parseFloat(e[1]),s=(e[2]||"ms").toLowerCase();switch(s){case"years":case"year":case"yrs":case"yr":case"y":return r*Uo;case"weeks":case"week":case"w":return r*Bo;case"days":case"day":case"d":return r*Rt;case"hours":case"hour":case"hrs":case"hr":case"h":return r*Bt;case"minutes":case"minute":case"mins":case"min":case"m":return r*Ft;case"seconds":case"second":case"secs":case"sec":case"s":return r*Mt;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return r;default:return}}}}function Ho(t){var e=Math.abs(t);return e>=Rt?Math.round(t/Rt)+"d":e>=Bt?Math.round(t/Bt)+"h":e>=Ft?Math.round(t/Ft)+"m":e>=Mt?Math.round(t/Mt)+"s":t+"ms"}function qo(t){var e=Math.abs(t);return e>=Rt?yr(t,e,Rt,"day"):e>=Bt?yr(t,e,Bt,"hour"):e>=Ft?yr(t,e,Ft,"minute"):e>=Mt?yr(t,e,Mt,"second"):t+" ms"}function yr(t,e,r,s){var n=e>=r*1.5;return Math.round(t/r)+" "+s+(n?"s":"")}});var Xs=Jr((Ga,Zs)=>{function jo(t){r.debug=r,r.default=r,r.coerce=a,r.disable=o,r.enable=n,r.enabled=l,r.humanize=Ys(),r.destroy=d,Object.keys(t).forEach(u=>{r[u]=t[u]}),r.names=[],r.skips=[],r.formatters={};function e(u){let h=0;for(let b=0;b<u.length;b++)h=(h<<5)-h+u.charCodeAt(b),h|=0;return r.colors[Math.abs(h)%r.colors.length]}r.selectColor=e;function r(u){let h,b=null,_,w;function g(...k){if(!g.enabled)return;let C=g,H=Number(new Date),v=H-(h||H);C.diff=v,C.prev=h,C.curr=H,h=H,k[0]=r.coerce(k[0]),typeof k[0]!="string"&&k.unshift("%O");let x=0;k[0]=k[0].replace(/%([a-zA-Z%])/g,(B,D)=>{if(B==="%%")return"%";x++;let P=r.formatters[D];if(typeof P=="function"){let G=k[x];B=P.call(C,G),k.splice(x,1),x--}return B}),r.formatArgs.call(C,k),(C.log||r.log).apply(C,k)}return g.namespace=u,g.useColors=r.useColors(),g.color=r.selectColor(u),g.extend=s,g.destroy=r.destroy,Object.defineProperty(g,"enabled",{enumerable:!0,configurable:!1,get:()=>b!==null?b:(_!==r.namespaces&&(_=r.namespaces,w=r.enabled(u)),w),set:k=>{b=k}}),typeof r.init=="function"&&r.init(g),g}function s(u,h){let b=r(this.namespace+(typeof h>"u"?":":h)+u);return b.log=this.log,b}function n(u){r.save(u),r.namespaces=u,r.names=[],r.skips=[];let h=(typeof u=="string"?u:"").trim().replace(/\s+/g,",").split(",").filter(Boolean);for(let b of h)b[0]==="-"?r.skips.push(b.slice(1)):r.names.push(b)}function i(u,h){let b=0,_=0,w=-1,g=0;for(;b<u.length;)if(_<h.length&&(h[_]===u[b]||h[_]==="*"))h[_]==="*"?(w=_,g=b,_++):(b++,_++);else if(w!==-1)_=w+1,g++,b=g;else return!1;for(;_<h.length&&h[_]==="*";)_++;return _===h.length}function o(){let u=[...r.names,...r.skips.map(h=>"-"+h)].join(",");return r.enable(""),u}function l(u){for(let h of r.skips)if(i(u,h))return!1;for(let h of r.names)if(i(u,h))return!0;return!1}function a(u){return u instanceof Error?u.stack||u.message:u}function d(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return r.enable(r.load()),r}Zs.exports=jo});var Qs=Jr((tt,_r)=>{tt.formatArgs=Go;tt.save=Vo;tt.load=Jo;tt.useColors=Wo;tt.storage=Ko();tt.destroy=(()=>{let t=!1;return()=>{t||(t=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})();tt.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function Wo(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let t;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(t=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(t[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function Go(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+_r.exports.humanize(this.diff),!this.useColors)return;let e="color: "+this.color;t.splice(1,0,e,"color: inherit");let r=0,s=0;t[0].replace(/%[a-zA-Z%]/g,n=>{n!=="%%"&&(r++,n==="%c"&&(s=r))}),t.splice(s,0,e)}tt.log=console.debug||console.log||(()=>{});function Vo(t){try{t?tt.storage.setItem("debug",t):tt.storage.removeItem("debug")}catch{}}function Jo(){let t;try{t=tt.storage.getItem("debug")||tt.storage.getItem("DEBUG")}catch{}return!t&&typeof process<"u"&&"env"in process&&(t=process.env.DEBUG),t}function Ko(){try{return localStorage}catch{}}_r.exports=Xs()(tt);var{formatters:Yo}=_r.exports;Yo.j=function(t){try{return JSON.stringify(t)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}});var Wt=globalThis,br=Wt.trustedTypes,Fs=br?br.createPolicy("lit-html",{createHTML:t=>t}):void 0,js="$lit$",_t=`lit$${Math.random().toFixed(9).slice(2)}$`,Ws="?"+_t,Po=`<${Ws}>`,Et=document,Gt=()=>Et.createComment(""),Vt=t=>t===null||typeof t!="object"&&typeof t!="function",ts=Array.isArray,Oo=t=>ts(t)||typeof t?.[Symbol.iterator]=="function",Kr=`[ 	
\f\r]`,jt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Us=/>/g,$t=RegExp(`>|${Kr}(?:([^\\s"'>=/]+)(${Kr}*=${Kr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),zs=/'/g,Hs=/"/g,Gs=/^(?:script|style|textarea|title)$/i,rs=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),y=rs(1),Ba=rs(2),Ua=rs(3),Ct=Symbol.for("lit-noChange"),Ae=Symbol.for("lit-nothing"),qs=new WeakMap,Tt=Et.createTreeWalker(Et,129);function Vs(t,e){if(!ts(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Fs!==void 0?Fs.createHTML(e):e}var Mo=(t,e)=>{let r=t.length-1,s=[],n,i=e===2?"<svg>":e===3?"<math>":"",o=jt;for(let l=0;l<r;l++){let a=t[l],d,u,h=-1,b=0;for(;b<a.length&&(o.lastIndex=b,u=o.exec(a),u!==null);)b=o.lastIndex,o===jt?u[1]==="!--"?o=Bs:u[1]!==void 0?o=Us:u[2]!==void 0?(Gs.test(u[2])&&(n=RegExp("</"+u[2],"g")),o=$t):u[3]!==void 0&&(o=$t):o===$t?u[0]===">"?(o=n??jt,h=-1):u[1]===void 0?h=-2:(h=o.lastIndex-u[2].length,d=u[1],o=u[3]===void 0?$t:u[3]==='"'?Hs:zs):o===Hs||o===zs?o=$t:o===Bs||o===Us?o=jt:(o=$t,n=void 0);let _=o===$t&&t[l+1].startsWith("/>")?" ":"";i+=o===jt?a+Po:h>=0?(s.push(d),a.slice(0,h)+js+a.slice(h)+_t+_):a+_t+(h===-2?l:_)}return[Vs(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]},Jt=class t{constructor({strings:e,_$litType$:r},s){let n;this.parts=[];let i=0,o=0,l=e.length-1,a=this.parts,[d,u]=Mo(e,r);if(this.el=t.createElement(d,s),Tt.currentNode=this.el.content,r===2||r===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(n=Tt.nextNode())!==null&&a.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let h of n.getAttributeNames())if(h.endsWith(js)){let b=u[o++],_=n.getAttribute(h).split(_t),w=/([.?@])?(.*)/.exec(b);a.push({type:1,index:i,name:w[2],strings:_,ctor:w[1]==="."?Zr:w[1]==="?"?Xr:w[1]==="@"?Qr:Pt}),n.removeAttribute(h)}else h.startsWith(_t)&&(a.push({type:6,index:i}),n.removeAttribute(h));if(Gs.test(n.tagName)){let h=n.textContent.split(_t),b=h.length-1;if(b>0){n.textContent=br?br.emptyScript:"";for(let _=0;_<b;_++)n.append(h[_],Gt()),Tt.nextNode(),a.push({type:2,index:++i});n.append(h[b],Gt())}}}else if(n.nodeType===8)if(n.data===Ws)a.push({type:2,index:i});else{let h=-1;for(;(h=n.data.indexOf(_t,h+1))!==-1;)a.push({type:7,index:i}),h+=_t.length-1}i++}}static createElement(e,r){let s=Et.createElement("template");return s.innerHTML=e,s}};function Nt(t,e,r=t,s){if(e===Ct)return e;let n=s!==void 0?r._$Co?.[s]:r._$Cl,i=Vt(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,r,s)),s!==void 0?(r._$Co??(r._$Co=[]))[s]=n:r._$Cl=n),n!==void 0&&(e=Nt(t,n._$AS(t,e.values),n,s)),e}var Yr=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:s}=this._$AD,n=(e?.creationScope??Et).importNode(r,!0);Tt.currentNode=n;let i=Tt.nextNode(),o=0,l=0,a=s[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new Kt(i,i.nextSibling,this,e):a.type===1?d=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(d=new es(i,this,e)),this._$AV.push(d),a=s[++l]}o!==a?.index&&(i=Tt.nextNode(),o++)}return Tt.currentNode=Et,n}p(e){let r=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,r),r+=s.strings.length-2):s._$AI(e[r])),r++}},Kt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,s,n){this.type=2,this._$AH=Ae,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=s,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=Nt(this,e,r),Vt(e)?e===Ae||e==null||e===""?(this._$AH!==Ae&&this._$AR(),this._$AH=Ae):e!==this._$AH&&e!==Ct&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Oo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Ae&&Vt(this._$AH)?this._$AA.nextSibling.data=e:this.T(Et.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:s}=e,n=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Jt.createElement(Vs(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===n)this._$AH.p(r);else{let i=new Yr(n,this),o=i.u(this.options);i.p(r),this.T(o),this._$AH=i}}_$AC(e){let r=qs.get(e.strings);return r===void 0&&qs.set(e.strings,r=new Jt(e)),r}k(e){ts(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,s,n=0;for(let i of e)n===r.length?r.push(s=new t(this.O(Gt()),this.O(Gt()),this,this.options)):s=r[n],s._$AI(i),n++;n<r.length&&(this._$AR(s&&s._$AB.nextSibling,n),r.length=n)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let s=e.nextSibling;e.remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Pt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,s,n,i){this.type=1,this._$AH=Ae,this._$AN=void 0,this.element=e,this.name=r,this._$AM=n,this.options=i,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Ae}_$AI(e,r=this,s,n){let i=this.strings,o=!1;if(i===void 0)e=Nt(this,e,r,0),o=!Vt(e)||e!==this._$AH&&e!==Ct,o&&(this._$AH=e);else{let l=e,a,d;for(e=i[0],a=0;a<i.length-1;a++)d=Nt(this,l[s+a],r,a),d===Ct&&(d=this._$AH[a]),o||(o=!Vt(d)||d!==this._$AH[a]),d===Ae?e=Ae:e!==Ae&&(e+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!n&&this.j(e)}j(e){e===Ae?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Zr=class extends Pt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ae?void 0:e}},Xr=class extends Pt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Ae)}},Qr=class extends Pt{constructor(e,r,s,n,i){super(e,r,s,n,i),this.type=5}_$AI(e,r=this){if((e=Nt(this,e,r,0)??Ae)===Ct)return;let s=this._$AH,n=e===Ae&&s!==Ae||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,i=e!==Ae&&(s===Ae||n);n&&this.element.removeEventListener(this.name,this,s),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},es=class{constructor(e,r,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Nt(this,e)}};var Fo=Wt.litHtmlPolyfillSupport;Fo?.(Jt,Kt),(Wt.litHtmlVersions??(Wt.litHtmlVersions=[])).push("3.3.1");var me=(t,e,r)=>{let s=r?.renderBefore??e,n=s._$litPart$;if(n===void 0){let i=r?.renderBefore??null;s._$litPart$=n=new Kt(e.insertBefore(Gt(),i),i,void 0,r??{})}return n._$AI(t),n};function Js(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function nt(t,e){let r=Js(t.created_at),s=Js(e.created_at);if(r!==s)return r<s?1:-1;let n=t.priority??2,i=e.priority??2;if(n!==i)return n-i;let o=t.id,l=e.id;return o<l?-1:o>l?1:0}function Ot(t,e){let r=t.closed_at??0,s=e.closed_at??0;if(r!==s)return r<s?1:-1;let n=t?.id,i=e?.id;return n<i?-1:n>i?1:0}function mt(t=void 0){function e(i){return!t||typeof t.snapshotFor!="function"?[]:t.snapshotFor(i).slice().sort(nt)}function r(i,o){let l=t&&t.snapshotFor?t.snapshotFor(i).slice():[];return o==="in_progress"||o==="resolved"?l.sort(nt):o==="closed"?l.sort(Ot):l.sort(nt),l}function s(i){if(!t||typeof t.snapshotFor!="function")return[];let l=(t.snapshotFor(`detail:${i}`)||[]).find(d=>String(d?.id||"")===String(i));return(Array.isArray(l?.dependents)?l.dependents:[]).slice().sort(nt)}function n(i){return t&&typeof t.subscribe=="function"?t.subscribe(i):()=>{}}return{selectIssuesFor:e,selectBoardColumn:r,selectEpicChildren:s,subscribe:n}}var en=No(Qs(),1);function he(t){return(0,en.default)(`beads-ui:${t}`)}function tn(t){let e=he("data");async function r(s){let{id:n}=s;e("updateIssue %s %o",n,Object.keys(s));let i=null;return typeof s.title=="string"&&(i=await t("edit-text",{id:n,field:"title",value:s.title})),typeof s.acceptance=="string"&&(i=await t("edit-text",{id:n,field:"acceptance",value:s.acceptance})),typeof s.notes=="string"&&(i=await t("edit-text",{id:n,field:"notes",value:s.notes})),typeof s.design=="string"&&(i=await t("edit-text",{id:n,field:"design",value:s.design})),typeof s.status=="string"&&(i=await t("update-status",{id:n,status:s.status})),typeof s.priority=="number"&&(i=await t("update-priority",{id:n,priority:s.priority})),typeof s.assignee=="string"&&(i=await t("update-assignee",{id:n,assignee:s.assignee})),e("updateIssue done %s",n),i}return{updateIssue:r}}function ss(t,e={}){let r=he(`issue-store:${t}`),s=new Map,n=[],i=0,o=new Set,l=!1,a=e.sort||nt;function d(){for(let b of Array.from(o))try{b()}catch{}}function u(){n=Array.from(s.values()).sort(a)}function h(b){if(l||!b||b.id!==t)return;let _=Number(b.revision)||0;if(r("apply %s rev=%d",b.type,_),!(_<=i&&b.type!=="snapshot")){if(b.type==="snapshot"){if(_<=i)return;s.clear();let w=Array.isArray(b.issues)?b.issues:[];for(let g of w)g&&typeof g.id=="string"&&g.id.length>0&&s.set(g.id,g);u(),i=_,d();return}if(b.type==="upsert"){let w=b.issue;if(w&&typeof w.id=="string"&&w.id.length>0){let g=s.get(w.id);if(!g)s.set(w.id,w);else{let k=Number.isFinite(g.updated_at)?g.updated_at:0,C=Number.isFinite(w.updated_at)?w.updated_at:0;if(k<=C){for(let H of Object.keys(g))H in w||delete g[H];for(let[H,v]of Object.entries(w))g[H]=v}}u()}i=_,d()}else if(b.type==="delete"){let w=String(b.issue_id||"");w&&(s.delete(w),u()),i=_,d()}}}return{id:t,subscribe(b){return o.add(b),()=>{o.delete(b)}},applyPush:h,snapshot(){return n},size(){return s.size},getById(b){return s.get(b)},dispose(){l=!0,s.clear(),n=[],o.clear(),i=0}}}function mr(t){let e=String(t.type||"").trim(),r={};if(t.params&&typeof t.params=="object"){let n=Object.keys(t.params).sort();for(let i of n){let o=t.params[i];r[i]=String(o)}}let s=new URLSearchParams(r).toString();return s.length>0?`${e}?${s}`:e}function rn(t){let e=he("subs"),r=new Map,s=new Map;function n(l,a){e("applyDelta %s +%d ~%d -%d",l,(a.added||[]).length,(a.updated||[]).length,(a.removed||[]).length);let d=s.get(l);if(!d||d.size===0)return;let u=Array.isArray(a.added)?a.added:[],h=Array.isArray(a.updated)?a.updated:[],b=Array.isArray(a.removed)?a.removed:[];for(let _ of Array.from(d)){let w=r.get(_);if(!w)continue;let g=w.itemsById;for(let k of u)typeof k=="string"&&k.length>0&&g.set(k,!0);for(let k of h)typeof k=="string"&&k.length>0&&g.set(k,!0);for(let k of b)typeof k=="string"&&k.length>0&&g.delete(k)}}async function i(l,a){let d=mr(a);if(e("subscribe %s key=%s",l,d),!r.has(l))r.set(l,{key:d,itemsById:new Map});else{let h=r.get(l);if(h&&h.key!==d){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key)),r.set(l,{key:d,itemsById:new Map})}}s.has(d)||s.set(d,new Set);let u=s.get(d);u&&u.add(l);try{await t("subscribe-list",{id:l,type:a.type,params:a.params})}catch(h){let b=r.get(l)||null;if(b){let _=s.get(b.key);_&&(_.delete(l),_.size===0&&s.delete(b.key))}throw r.delete(l),h}return async()=>{e("unsubscribe %s key=%s",l,d);try{await t("unsubscribe-list",{id:l})}catch{}let h=r.get(l)||null;if(h){let b=s.get(h.key);b&&(b.delete(l),b.size===0&&s.delete(h.key))}r.delete(l)}}return{subscribeList:i,_applyDelta:n,_subKeyOf:mr,selectors:{getIds(l){let a=r.get(l);return a?Array.from(a.itemsById.keys()):[]},has(l,a){let d=r.get(l);return d?d.itemsById.has(a):!1},count(l){let a=r.get(l);return a?a.itemsById.size:0},getItemsById(l){let a=r.get(l),d={};if(!a)return d;for(let u of a.itemsById.keys())d[u]=!0;return d}}}}function sn(){let t=he("issue-stores"),e=new Map,r=new Map,s=new Set,n=new Map;function i(){for(let a of Array.from(s))try{a()}catch{}}function o(a,d,u){let h=d?mr(d):"",b=r.get(a)||"",_=e.has(a);if(t("register %s key=%s (prev=%s)",a,h,b),_&&b&&h&&b!==h){let w=e.get(a);if(w)try{w.dispose()}catch{}let g=n.get(a);if(g){try{g()}catch{}n.delete(a)}let k=ss(a,u);e.set(a,k);let C=k.subscribe(()=>i());n.set(a,C)}else if(!_){let w=ss(a,u);e.set(a,w);let g=w.subscribe(()=>i());n.set(a,g)}return r.set(a,h),()=>l(a)}function l(a){t("unregister %s",a),r.delete(a);let d=e.get(a);d&&(d.dispose(),e.delete(a));let u=n.get(a);if(u){try{u()}catch{}n.delete(a)}}return{register:o,unregister:l,getStore(a){return e.get(a)||null},snapshotFor(a){let d=e.get(a);return d?d.snapshot().slice():[]},subscribe(a){return s.add(a),()=>s.delete(a)}}}function wt(t,e){return`#/${t==="epics"||t==="board"||t==="worker"?t:"issues"}?issue=${encodeURIComponent(e)}`}function wr(t){let e=String(t||""),r=e.startsWith("#")?e.slice(1):e,s=r.indexOf("?"),n=s>=0?r.slice(s+1):"";if(n){let l=new URLSearchParams(n).get("issue");if(l)return decodeURIComponent(l)}let i=/^\/issue\/([^\s?#]+)/.exec(r);return i&&i[1]?decodeURIComponent(i[1]):null}function Ut(t){let e=String(t||"");return/^#\/epics(\b|\/|$)/.test(e)?"epics":/^#\/board(\b|\/|$)/.test(e)?"board":/^#\/worker(\b|\/|$)/.test(e)?"worker":"issues"}function nn(t){let e=he("router"),r=()=>{let s=window.location.hash||"",n=/^#\/issue\/([^\s?#]+)/.exec(s);if(n&&n[1]){let l=decodeURIComponent(n[1]);t.setState({selected_id:l,view:"issues"});let a=`#/issues?issue=${encodeURIComponent(l)}`;if(window.location.hash!==a){window.location.hash=a;return}}let i=wr(s),o=Ut(s);e("hash change \u2192 view=%s id=%s",o,i),t.setState({selected_id:o==="worker"?null:i,view:o,worker:{selected_parent_id:o==="worker"?i:null}})};return{start(){window.addEventListener("hashchange",r),r()},stop(){window.removeEventListener("hashchange",r)},gotoIssue(s){let i=(t.getState?t.getState():{view:"issues"}).view||"issues",o=wt(i,s);e("goto issue %s (view=%s)",s,i),window.location.hash!==o?window.location.hash=o:t.setState({selected_id:i==="worker"?null:s,view:i,worker:{selected_parent_id:i==="worker"?s:null}})},gotoView(s){let n=t.getState?t.getState():{selected_id:null,worker:{selected_parent_id:null}},i=s==="worker"?n.worker?.selected_parent_id:n.selected_id,o=i?wt(s,i):`#/${s}`;e("goto view %s (id=%s)",s,i||""),window.location.hash!==o?window.location.hash=o:t.setState({view:s,selected_id:s==="worker"?null:n.selected_id})}}}var kr=Object.freeze({label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}}),Zo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function on(t){return JSON.parse(JSON.stringify(t))}function ns(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function an(t){if(!ns(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!ns(s)||typeof s.fg!="string"||!Zo.test(s.fg)||(e[r]={fg:s.fg});return e}function Xo(t){return ns(t)?{prefix:an(t.prefix),exact:an(t.exact)}:{prefix:{},exact:{}}}function ln(t){let e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Xo(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null,i=t?.detail&&typeof t.detail=="object"?on(t.detail):on(kr.detail);return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(o=>typeof o=="string"),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):kr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}:{label_display_policy:{visible_prefixes:kr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(o=>typeof o=="string"):kr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:i}}function cn(t={}){let e=he("state"),r={selected_id:t.selected_id??null,view:t.view??"issues",filters:{status:t.filters?.status??"all",search:t.filters?.search??"",type:typeof t.filters?.type=="string"?t.filters?.type:""},board:{closed_filter:t.board?.closed_filter==="3"||t.board?.closed_filter==="7"||t.board?.closed_filter==="today"?t.board?.closed_filter:"today",show_deferred_column:t.board?.show_deferred_column===!0},worker:{selected_parent_id:t.worker?.selected_parent_id??null,show_closed_children:Array.isArray(t.worker?.show_closed_children)?t.worker.show_closed_children:[]},workspace:{current:t.workspace?.current??null,available:t.workspace?.available??[]},config:ln(t.config)},s=new Set;function n(){for(let i of Array.from(s))try{i(r)}catch{}}return{getState(){return r},setState(i){let o={...r,...i,filters:{...r.filters,...i.filters||{}},board:{...r.board,...i.board||{}},worker:{...r.worker,...i.worker||{}},workspace:{current:i.workspace?.current!==void 0?i.workspace.current:r.workspace.current,available:i.workspace?.available!==void 0?i.workspace.available:r.workspace.available},config:i.config!==void 0?ln(i.config):r.config},l=o.workspace.current?.path!==r.workspace.current?.path||o.workspace.available.length!==r.workspace.available.length,a=o.config.label_display_policy.visible_prefixes.length!==r.config.label_display_policy.visible_prefixes.length||o.config.label_display_policy.visible_prefixes.some((d,u)=>d!==r.config.label_display_policy.visible_prefixes[u])||o.config.label_display_policy.visible_exact.length!==r.config.label_display_policy.visible_exact.length||o.config.label_display_policy.visible_exact.some((d,u)=>d!==r.config.label_display_policy.visible_exact[u])||JSON.stringify(o.config.label_display_policy.colors)!==JSON.stringify(r.config.label_display_policy.colors)||o.config.workspace_config.default_workspace!==r.config.workspace_config.default_workspace||JSON.stringify(o.config.detail)!==JSON.stringify(r.config.detail);o.selected_id===r.selected_id&&o.view===r.view&&o.filters.status===r.filters.status&&o.filters.search===r.filters.search&&o.filters.type===r.filters.type&&o.board.closed_filter===r.board.closed_filter&&o.board.show_deferred_column===r.board.show_deferred_column&&o.worker.selected_parent_id===r.worker.selected_parent_id&&o.worker.show_closed_children.length===r.worker.show_closed_children.length&&o.worker.show_closed_children.every((d,u)=>d===r.worker.show_closed_children[u])&&!l&&!a||(r=o,e("state change %o",{selected_id:r.selected_id,view:r.view,filters:r.filters,board:r.board,worker:r.worker,workspace:r.workspace.current?.path,config:{visible_prefixes:r.config.label_display_policy.visible_prefixes,default_workspace:r.config.workspace_config.default_workspace}}),n())},subscribe(i){return s.add(i),()=>s.delete(i)}}}function dn(t){let e=he("activity"),r=0,s=new Map,n=1;function i(){if(!t)return;let d=r>0;t.toggleAttribute("hidden",!d),t.setAttribute("aria-busy",d?"true":"false")}function o(){r+=1,e("start count=%d",r),i()}function l(){let d=r;r=Math.max(0,r-1),d<=0?e("done called but count was already %d",d):e("done count=%d\u2192%d",d,r),i()}function a(d){return async(h,b)=>{let _=n++,w=Date.now();s.set(_,{type:h,start_ts:w}),e("request start id=%d type=%s count=%d",_,h,r+1),o();let g=!1,k=()=>{g||(g=!0,s.delete(_),l())},C=setTimeout(()=>{g||(e("request TIMEOUT id=%d type=%s elapsed=%dms",_,h,Date.now()-w),k())},3e4);try{let H=await d(h,b),v=Date.now()-w;return e("request done id=%d type=%s elapsed=%dms",_,h,v),H}catch(H){let v=Date.now()-w;throw e("request error id=%d type=%s elapsed=%dms err=%o",_,h,v,H),H}finally{clearTimeout(C),k()}}}return i(),{wrapSend:a,start:o,done:l,getCount:()=>r,getActiveRequests:()=>{let d=Date.now();return Array.from(s.entries()).map(([u,h])=>({id:u,type:h.type,elapsed_ms:d-h.start_ts}))}}}function ie(t,e="info",r=2800){let s=document.createElement("div");s.className="toast",s.textContent=t,s.style.position="fixed",s.style.right="12px",s.style.bottom="12px",s.style.zIndex="1000",s.style.color="#fff",s.style.padding="8px 10px",s.style.borderRadius="4px",s.style.fontSize="12px",e==="success"?s.style.background="#156d36":e==="error"?s.style.background="#9f2011":s.style.background="rgba(0,0,0,0.85)",(document.body||document.documentElement).appendChild(s),setTimeout(()=>{try{s.remove()}catch{}},r)}function kt(t,e){let r=typeof e?.duration_ms=="number"?e.duration_ms:1200,s=document.createElement("button");s.className=(e?.class_name?e.class_name+" ":"")+"mono id-copy",s.type="button",s.setAttribute("aria-live","polite"),s.setAttribute("title","Copy issue ID"),s.setAttribute("aria-label",`Copy issue ID ${t}`),s.textContent=t;async function n(){try{let i=!1;if(navigator.clipboard&&typeof navigator.clipboard.writeText=="function")await navigator.clipboard.writeText(String(t)),i=!0;else{let o=document.createElement("textarea");o.value=String(t),o.style.position="fixed",o.style.left="-9999px",o.style.opacity="0";let l=s.closest("dialog[open]")||document.body;l.appendChild(o),o.focus(),o.select();try{i=document.execCommand("copy")}finally{l.removeChild(o)}}if(i){s.textContent="Copied";let o=s.getAttribute("aria-label")||"";s.setAttribute("aria-label","Copied"),setTimeout(()=>{s.textContent=t,s.setAttribute("aria-label",o)},Math.max(80,r))}}catch{}}return s.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation(),n()}),s.addEventListener("keydown",i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),i.stopPropagation(),n())}),s}var Qo=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;function vr(t,e,r=[]){if(!Array.isArray(t))return[];let s=Array.isArray(e)?e:[],n=Array.isArray(r)?r:[];return t.filter(i=>n.includes(i)||s.some(o=>i.startsWith(o)))}function pn(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function un(t){return!pn(t)||typeof t.fg!="string"?null:Qo.test(t.fg)?t.fg:null}function ei(t,e){let r=un(e?.exact?.[t]);if(r)return r;let s=e?.prefix;if(!pn(s))return null;let n="",i=null;for(let[o,l]of Object.entries(s)){let a=un(l);a&&t.startsWith(o)&&o.length>n.length&&(n=o,i=a)}return i}function xr(t,e=void 0){let r=document.createElement("span");r.className="label-badge";let s=null;t.startsWith("has:")?s="has":t.startsWith("reviewed:")?s="reviewed":t==="pr"&&(s="pr"),s&&r.classList.add(`label-badge--${s}`);let n=ei(t,e);return n&&r.style.setProperty("--label-badge-fg",n),r.setAttribute("title",t),r.setAttribute("aria-label",`Label: ${t}`),r.textContent=t,r}var vt=["Critical","High","Medium","Low","Backlog"];function fn(t){let e=typeof t=="number"?t:2,r=document.createElement("span");r.className="priority-badge",r.classList.add(`is-p${Math.max(0,Math.min(4,e))}`),r.setAttribute("role","img");let s=ti(e);return r.setAttribute("title",s),r.setAttribute("aria-label",`Priority: ${s}`),r.textContent=Yt(e)+" "+s,r}function ti(t){let e=Math.max(0,Math.min(4,t));return vt[e]||"Medium"}function Yt(t){switch(t){case 0:return"\u{1F525}";case 1:return"\u26A1\uFE0F";case 2:return"\u{1F527}";case 3:return"\u{1FAB6}";case 4:return"\u{1F4A4}";default:return"\u{1F527}"}}function hn(t){if(!t)return null;if(typeof t=="number")return Number.isFinite(t)?t:null;let e=Date.parse(t);return Number.isFinite(e)?e:null}function Sr(t){let e=hn(t);return e===null?"":new Date(e).toISOString()}function Ar(t,e){let r=hn(t);if(r===null)return"";let n=(typeof e=="number"?e:Date.now())-r;if(n<6e4)return"\uBC29\uAE08";let i=Math.floor(n/6e4);if(i<60)return`${i}\uBD84 \uC804`;let o=Math.floor(n/36e5);if(o<24)return`${o}\uC2DC\uAC04 \uC804`;let l=Math.floor(n/864e5);if(l<7)return`${l}\uC77C \uC804`;let a=Math.floor(l/7);if(l<30)return`${a}\uC8FC \uC804`;let d=Math.floor(l/30);return d<12?`${d}\uAC1C\uC6D4 \uC804`:`${Math.floor(l/365)}\uB144 \uC804`}function It(t){let e=document.createElement("span");e.className="type-badge";let r=(t||"").toString().toLowerCase(),s=new Set(["bug","feature","task","epic","chore"]),n=s.has(r)?r:"neutral";e.classList.add(`type-badge--${n}`),e.setAttribute("role","img");let i=s.has(r)?r==="bug"?"Bug":r==="feature"?"Feature":r==="task"?"Task":r==="epic"?"Epic":"Chore":"\u2014";return e.setAttribute("aria-label",s.has(r)?`Issue type: ${i}`:"Issue type: unknown"),e.setAttribute("title",s.has(r)?`Type: ${i}`:"Type: unknown"),e.textContent=i,e}var Zt=["quick_edit","spec_backed","plan"],is=["current","worktree"],as=["same","feature"],ls=["direct","pr"],Xt=["light","standard","deep"],cs="Default (standard)",ri=[{id:"current_same_direct",workspace_policy:"current",branch_policy:"same",finish_action:"direct",label:"Direct"},{id:"current_feature_direct",workspace_policy:"current",branch_policy:"feature",finish_action:"direct",label:"Current direct"},{id:"current_feature_pr",workspace_policy:"current",branch_policy:"feature",finish_action:"pr",label:"Current PR"},{id:"worktree_feature_direct",workspace_policy:"worktree",branch_policy:"feature",finish_action:"direct",label:"Worktree direct"},{id:"worktree_feature_pr",workspace_policy:"worktree",branch_policy:"feature",finish_action:"pr",label:"Worktree PR"}],si={workflow_settings:"Workflow settings",artifacts:"Artifacts",review_gates:"Review gates",freshness:"Freshness",delivery:"Delivery",followup:"Follow-up",human:"Human blocker"},os={execution_lane:"Execution lane",workspace_policy:"Workspace",branch_policy:"Branch",finish_action:"Finish",review_profile:"Review profile",spec_id:"Spec",plan:"Plan",handoff:"Handoff",status:"Status",verdict:"Verdict",final_source:"Source",external_attempts:"Attempts",reviewed_at_sha:"Reviewed at SHA",content_hash:"Content hash",execution_base_sha:"Execution base SHA",spec_freshness_checked_at_sha:"Spec freshness SHA",plan_freshness_checked_at_sha:"Plan freshness SHA",spec_handoff_at_sha:"Spec handoff SHA",spec_handoff_content_hash:"Spec handoff hash",pr_url:"PR",followup_kind:"Kind",source_repo:"Source repo",source_bead:"Source bead",source_artifact:"Source artifact",source_pr:"Source PR",target_repo:"Target repo",target_paths:"Target paths",required_action:"Required action",human_decision_required:"Human decision required"},ni=["spec","plan","impl"];function Ge(t){return typeof t!="string"?"":t.trim()}function Tr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):Ge(t)}function ds(t){let e=Ge(t);if(!e)return null;try{let r=new URL(e);return r.protocol==="http:"||r.protocol==="https:"?r:null}catch{return null}}function zt(t){let e=Ge(t.workspace_policy),r=Ge(t.branch_policy),s=Ge(t.finish_action),n=!!(e||r||s);for(let i of ri)if(e===i.workspace_policy&&r===i.branch_policy&&s===i.finish_action)return{kind:"valid",id:i.id,label:i.label};return n?{kind:"invalid",value:null}:{kind:"absent",value:null}}function oi(t){let e=Ge(t.review_profile);return e?Xt.includes(e)?{kind:"valid",value:e,label:e}:{kind:"invalid",value:e,label:"Invalid review profile"}:{kind:"default",value:null,label:cs}}function us(t,e,r,s,n){let i=Ge(t),o=Ge(e),l=Ge(r),a=Ge(s),d=n===null?"":Ge(n);return!Zt.includes(i)||zt({workspace_policy:o,branch_policy:l,finish_action:a}).kind!=="valid"||d&&!Xt.includes(d)?null:{execution_lane:i,workspace_policy:o,branch_policy:l,finish_action:a,review_profile:d||null}}function xt(t,e,r={}){return{id:t,label:r.label||os[t]||t,value:Tr(e),kind:r.kind||"value",href:r.href}}function ii(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function ai(t,e,r,s,n){switch(t){case"workflow_settings":return li(e,s);case"artifacts":return ci(e,r,s);case"review_gates":return di(e,s,n);case"delivery":return pi(e,s);case"freshness":case"followup":case"human":return fi(e,s);default:return[]}}function $r(t,e,r,s=!1){return r.includes(e)&&!s?xt(t,e):e?xt(t,e,{kind:"invalid"}):null}function li(t,e){let r=[],n=zt(e).kind==="invalid";for(let i of t)if(i!=="topology"){if(i==="execution_lane"){let o=$r(i,Ge(e.execution_lane),Zt);o&&r.push(o);continue}if(i==="workspace_policy"){let o=$r(i,Ge(e.workspace_policy),is,n);o&&r.push(o);continue}if(i==="branch_policy"){let o=$r(i,Ge(e.branch_policy),as,n);o&&r.push(o);continue}if(i==="finish_action"){let o=$r(i,Ge(e.finish_action),ls,n);o&&r.push(o);continue}if(i==="review_profile"){let o=oi(e);r.push(xt(i,o.label,{kind:o.kind==="invalid"?"invalid":"value"}))}}return r}function ci(t,e,r){let s=[],n={spec_id:e?.spec_id,plan:r.plan,handoff:r.handoff};for(let i of t){let o=Tr(n[i]);o&&s.push(xt(i,o,{kind:"artifact"}))}return s}function di(t,e,r){let s=[];for(let n of ni)for(let i of t){let o=ui(n,i,e,r);o&&s.push(o)}return s}function ui(t,e,r,s){let n=`${t}_review`,i=`${t}_reviewed_at_sha`,o=`${t}_content_hash`;if(e==="status"){let u=`reviewed:${t}`;return s.includes(u)?xt(`${t}_${e}`,u,{label:`${t} ${os[e]}`}):null}let a={verdict:`${n}_verdict`,final_source:`${n}_final_source`,external_attempts:`${n}_external_attempts`,reviewed_at_sha:i,content_hash:o}[e],d=a?Tr(r[a]):"";return d?xt(`${t}_${e}`,d,{label:`${t} ${os[e]||e}`}):null}function pi(t,e){let r=[];for(let s of t){if(s!=="pr_url")continue;let n=ds(e.pr_url);n&&r.push(xt(s,"PR",{kind:"link",href:n.href}))}return r}function fi(t,e){let r=[];for(let s of t){let n=Tr(e[s]);n&&r.push(xt(s,n))}return r}function gn(t,e){let r=ii(t?.metadata)?t.metadata:{},s=Array.isArray(t?.labels)?t.labels:[],n=Array.isArray(e?.sections)?e.sections:[],i=[];for(let o of n){let l=Array.isArray(e?.[o]?.fields)?e[o].fields:[],a=Array.isArray(e?.[o]?.editable_fields)?e[o].editable_fields:[],d=ai(o,l,t,r,s);d.length>0&&i.push({id:o,label:si[o]||o,rows:d,editable_fields:a})}return i}var hi={plan:"Plan",quick_edit:"Quick edit",spec_backed:"Spec-backed"},gi={"blocked-col":"open","ready-col":"open","in-progress-col":"in_progress","deferred-col":"deferred","resolved-col":"resolved","closed-col":"closed"};function bn(t,e,r,s,n=void 0,i=void 0,o=void 0){let l=he("views:board"),a=[],d=[],u=[],h=[],b=[],_=[],w=[],g=i?mt(i):null;function k(T){return String(T.status||"open")==="open"}let C="today",H=!1;if(s)try{let T=s.getState(),A=T&&T.board?String(T.board.closed_filter||"today"):"today";(A==="today"||A==="3"||A==="7")&&(C=A),H=T?.board?.show_deferred_column===!0}catch{}function v(){let T=s?.getState?.().config?.label_display_policy,A=T?.visible_prefixes,F=T?.visible_exact,z=T?.colors;return{visible_prefixes:Array.isArray(A)?A:["has:","reviewed:"],visible_exact:Array.isArray(F)?F:[],colors:z&&typeof z=="object"?z:{prefix:{},exact:{}}}}function x(T){return Array.isArray(T.labels)?T.labels.filter(A=>A!=="pr"):[]}function I(T){let A=T.metadata||{},F=[],z=A.execution_lane||"",q=hi[z];q&&F.push({kind:"lane",text:q});let ne=zt(A);return ne.kind==="valid"&&F.push({kind:"route",text:ne.label}),ds(A.pr_url)&&F.push({kind:"delivery",text:"PR"}),F}function B(){let T=b.length;return y`
      <div class="panel__body">
        <div class="board-toolbar">
          <button
            class="btn board-deferred-toggle ${H?"is-active":""}"
            type="button"
            aria-pressed=${H?"true":"false"}
            @click=${K}
          >
            Deferred (${T})
          </button>
        </div>
        <div
          class="board-root"
          style=${`--board-column-count: ${H?6:5}`}
        >
          ${D("Blocked","blocked-col",d)}
          ${D("Ready","ready-col",a)}
          ${D("In Progress","in-progress-col",u)}
          ${H?D("Deferred","deferred-col",b):""}
          ${D("Resolved","resolved-col",h)}
          ${D("Closed","closed-col",_)}
        </div>
      </div>
    `}function D(T,A,F){let z=Array.isArray(F)?F.length:0,q=z===1?"1 issue":`${z} issues`;return y`
      <section class="board-column" id=${A}>
        <header
          class="board-column__header"
          id=${A+"-header"}
          role="heading"
          aria-level="2"
        >
          <div class="board-column__title">
            <span class="board-column__title-text">${T}</span>
            <span class="badge board-column__count" aria-label=${q}>
              ${z}
            </span>
          </div>
          ${A==="closed-col"?y`<label class="board-closed-filter">
                <span class="visually-hidden">Filter closed issues</span>
                <select
                  id="closed-filter"
                  aria-label="Filter closed issues"
                  @change=${J}
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
          ${F.map(ne=>P(ne))}
        </div>
      </section>
    `}function P(T){let A=v(),F=I(T),z=vr(x(T),A.visible_prefixes,A.visible_exact);return y`
      <article
        class="board-card"
        data-issue-id=${T.id}
        role="listitem"
        tabindex="-1"
        draggable="true"
        @click=${q=>ve(q,T.id)}
        @dragstart=${q=>ae(q,T.id)}
        @dragend=${ue}
      >
        <div class="board-card__title text-truncate">
          ${T.title||"(no title)"}
        </div>
        ${F.length>0?y`<div class="board-card__workflow">
              ${F.map(q=>y`<span class="workflow-chip workflow-chip--${q.kind}"
                    >${q.text}</span
                  >`)}
            </div>`:""}
        ${z.length>0?y`<div class="board-card__labels">
              ${z.map(q=>xr(q,A.colors))}
            </div>`:""}
        <div class="board-card__meta">
          ${It(T.issue_type)} ${fn(T.priority)}
          ${kt(T.id,{class_name:"mono"})}
          ${T.created_at?y`<span
                class="board-card__date"
                title=${Sr(T.created_at)}
                >${Ar(T.created_at)}</span
              >`:""}
        </div>
      </article>
    `}let G=null;function ve(T,A){G||r(A)}function ae(T,A){G=A,T.dataTransfer&&(T.dataTransfer.setData("text/plain",A),T.dataTransfer.effectAllowed="move"),T.target.classList.add("board-card--dragging"),l("dragstart %s",A)}function ue(T){T.target.classList.remove("board-card--dragging"),Pe(),setTimeout(()=>{G=null},0),l("dragend")}function Pe(){let T=Array.from(t.querySelectorAll(".board-column--drag-over"));for(let A of T)A.classList.remove("board-column--drag-over")}async function $e(T,A){if(!o){l("no transport available, status update skipped"),ie("Cannot update status: not connected","error");return}try{l("update-status %s \u2192 %s",T,A),await o("update-status",{id:T,status:A}),ie("Status updated","success",1500)}catch(F){l("update-status failed: %o",F),ie("Failed to update status","error")}}function we(){me(B(),t),S()}function S(){try{let T=Array.from(t.querySelectorAll(".board-column"));for(let A of T){let F=A.querySelector(".board-column__body");if(!F)continue;let z=Array.from(F.querySelectorAll(".board-card")),q=A.querySelector(".board-column__header"),ne=q&&q.textContent?.trim()||"";for(let ge of z){let be=ge.querySelector(".board-card__title"),re=be&&be.textContent?.trim()||"";ge.setAttribute("aria-label",`Issue ${re||"(no title)"} \u2014 Column ${ne}`),ge.tabIndex=-1}z.length>0&&(z[0].tabIndex=0)}}catch{}}t.addEventListener("keydown",T=>{let A=T.target;if(!A||!(A instanceof HTMLElement))return;let F=String(A.tagName||"").toLowerCase();if(F==="input"||F==="textarea"||F==="select"||A.isContentEditable===!0)return;let z=A.closest(".board-card");if(!z)return;let q=String(T.key||"");if(q==="Enter"||q===" "){T.preventDefault();let Se=z.getAttribute("data-issue-id");Se&&r(Se);return}if(q!=="ArrowUp"&&q!=="ArrowDown"&&q!=="ArrowLeft"&&q!=="ArrowRight")return;T.preventDefault();let ne=z.closest(".board-column");if(!ne)return;let ge=ne.querySelector(".board-column__body");if(!ge)return;let be=Array.from(ge.querySelectorAll(".board-card")),re=be.indexOf(z);if(re!==-1){if(q==="ArrowDown"&&re<be.length-1){M(be[re],be[re+1]);return}if(q==="ArrowUp"&&re>0){M(be[re],be[re-1]);return}if(q==="ArrowRight"||q==="ArrowLeft"){let Se=Array.from(t.querySelectorAll(".board-column")),Ce=Se.indexOf(ne);if(Ce===-1)return;let Re=q==="ArrowRight"?1:-1,Ue=Ce+Re,je=null;for(;Ue>=0&&Ue<Se.length;){let Le=Se[Ue],De=Le.querySelector(".board-column__body");if((De?Array.from(De.querySelectorAll(".board-card")):[]).length>0){je=Le;break}Ue+=Re}if(je){let Le=je.querySelector(".board-column__body .board-card");Le&&M(z,Le)}return}}});let R=null;t.addEventListener("dragover",T=>{T.preventDefault(),T.dataTransfer&&(T.dataTransfer.dropEffect="move");let F=T.target.closest(".board-column");F&&F!==R&&(R&&R.classList.remove("board-column--drag-over"),F.classList.add("board-column--drag-over"),R=F)}),t.addEventListener("dragleave",T=>{let A=T.relatedTarget;(!A||!t.contains(A))&&R&&(R.classList.remove("board-column--drag-over"),R=null)}),t.addEventListener("drop",T=>{T.preventDefault(),R&&(R.classList.remove("board-column--drag-over"),R=null);let F=T.target.closest(".board-column");if(!F)return;let z=F.id,q=gi[z];if(!q){l("drop on unknown column: %s",z);return}let ne=T.dataTransfer?.getData("text/plain");if(!ne){l("drop without issue id");return}l("drop %s on %s \u2192 %s",ne,z,q),$e(ne,q)});function M(T,A){try{T.tabIndex=-1,A.tabIndex=0,A.focus()}catch{}}function X(){l("applyClosedFilter %s",C);let T=Array.isArray(w)?[...w]:[],A=new Date,F=0;C==="today"?F=new Date(A.getFullYear(),A.getMonth(),A.getDate(),0,0,0,0).getTime():C==="3"?F=A.getTime()-4320*60*1e3:C==="7"&&(F=A.getTime()-10080*60*1e3),T=T.filter(z=>{let q=Number.isFinite(z.closed_at)?z.closed_at:NaN;return Number.isFinite(q)?q>=F:!1}),T.sort(Ot),_=T}function J(T){try{let A=T.target,F=String(A.value||"today");if(C=F==="3"||F==="7"?F:"today",l("closed filter %s",C),s)try{s.setState({board:{closed_filter:C}})}catch{}X(),we()}catch{}}function K(){if(H=!H,s)try{s.setState({board:{show_deferred_column:H}})}catch{}we()}function xe(){try{if(g){let T=g.selectBoardColumn("tab:board:in-progress","in_progress"),A=g.selectBoardColumn("tab:board:blocked","blocked"),F=g.selectBoardColumn("tab:board:ready","ready"),z=g.selectBoardColumn("tab:board:closed","closed"),q=g.selectBoardColumn("tab:board:deferred","deferred"),ne=g.selectBoardColumn("tab:board:resolved","resolved"),ge=new Set(T.map(re=>re.id));a=F.filter(re=>k(re)&&!ge.has(re.id)),d=A.filter(re=>k(re)),u=T,b=q,h=ne,w=z}X(),we()}catch{a=[],d=[],u=[],h=[],_=[],we()}}g&&g.subscribe(()=>{try{xe()}catch{}});let ee=null;if(s?.subscribe){let T=JSON.stringify(v());ee=s.subscribe(()=>{let A=JSON.stringify(v());A!==T&&(T=A,we())})}return{async load(){l("load"),xe();try{let T=!!(n&&n.selectors),A=ne=>{if(!T||!n)return 0;let ge=n.selectors;if(typeof ge.count=="function")return Number(ge.count(ne)||0);try{let be=ge.getIds(ne);return Array.isArray(be)?be.length:0}catch{return 0}},F=A("tab:board:ready")+A("tab:board:blocked")+A("tab:board:in-progress")+A("tab:board:deferred")+A("tab:board:resolved")+A("tab:board:closed"),z=e,q=z&&typeof z.getReady=="function"&&typeof z.getBlocked=="function"&&typeof z.getInProgress=="function"&&typeof z.getClosed=="function";if(F===0&&q){l("fallback fetch");let[ne,ge,be,re,Se]=await Promise.all([z.getReady().catch(()=>[]),z.getBlocked().catch(()=>[]),z.getInProgress().catch(()=>[]),(z.getResolved?.()??Promise.resolve([])).catch(()=>[]),z.getClosed().catch(()=>[])]),Ce=Array.isArray(ne)?ne.map(le=>le):[],Re=Array.isArray(ge)?ge.map(le=>le):[],Ue=Array.isArray(be)?be.map(le=>le):[],je=Array.isArray(re)?re.map(le=>le):[],Le=Array.isArray(Se)?Se.map(le=>le):[],De=new Set(Ue.map(le=>le.id));Ce=Ce.filter(le=>k(le)&&!De.has(le.id)),Ce.sort(nt);let Ie=Re.filter(le=>k(le));Ie.sort(nt),Ue.sort(nt),je.sort(nt),a=Ce,d=Ie,u=Ue,h=je,w=Le,X(),we()}}catch{}},clear(){ee&&(ee(),ee=null),t.replaceChildren(),a=[],d=[],u=[],h=[],_=[]}}}var{entries:An,setPrototypeOf:yn,isFrozen:bi,getPrototypeOf:yi,getOwnPropertyDescriptor:_i}=Object,{freeze:Je,seal:ot,create:_s}=Object,{apply:ms,construct:ws}=typeof Reflect<"u"&&Reflect;Je||(Je=function(e){return e});ot||(ot=function(e){return e});ms||(ms=function(e,r){for(var s=arguments.length,n=new Array(s>2?s-2:0),i=2;i<s;i++)n[i-2]=arguments[i];return e.apply(r,n)});ws||(ws=function(e){for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return new e(...s)});var Er=Ke(Array.prototype.forEach),mi=Ke(Array.prototype.lastIndexOf),_n=Ke(Array.prototype.pop),Qt=Ke(Array.prototype.push),wi=Ke(Array.prototype.splice),Rr=Ke(String.prototype.toLowerCase),ps=Ke(String.prototype.toString),fs=Ke(String.prototype.match),er=Ke(String.prototype.replace),ki=Ke(String.prototype.indexOf),vi=Ke(String.prototype.trim),ct=Ke(Object.prototype.hasOwnProperty),Ve=Ke(RegExp.prototype.test),tr=xi(TypeError);function Ke(t){return function(e){e instanceof RegExp&&(e.lastIndex=0);for(var r=arguments.length,s=new Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];return ms(t,e,s)}}function xi(t){return function(){for(var e=arguments.length,r=new Array(e),s=0;s<e;s++)r[s]=arguments[s];return ws(t,r)}}function Q(t,e){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Rr;yn&&yn(t,null);let s=e.length;for(;s--;){let n=e[s];if(typeof n=="string"){let i=r(n);i!==n&&(bi(e)||(e[s]=i),n=i)}t[n]=!0}return t}function Si(t){for(let e=0;e<t.length;e++)ct(t,e)||(t[e]=null);return t}function ht(t){let e=_s(null);for(let[r,s]of An(t))ct(t,r)&&(Array.isArray(s)?e[r]=Si(s):s&&typeof s=="object"&&s.constructor===Object?e[r]=ht(s):e[r]=s);return e}function rr(t,e){for(;t!==null;){let s=_i(t,e);if(s){if(s.get)return Ke(s.get);if(typeof s.value=="function")return Ke(s.value)}t=yi(t)}function r(){return null}return r}var mn=Je(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),hs=Je(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gs=Je(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Ai=Je(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),bs=Je(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),$i=Je(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wn=Je(["#text"]),kn=Je(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),ys=Je(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),vn=Je(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Cr=Je(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Ti=ot(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Ei=ot(/<%[\w\W]*|[\w\W]*%>/gm),Ci=ot(/\$\{[\w\W]*/gm),Ri=ot(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ii=ot(/^aria-[\-\w]+$/),$n=ot(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Li=ot(/^(?:\w+script|data):/i),Di=ot(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Tn=ot(/^html$/i),Ni=ot(/^[a-z][.\w]*(-[.\w]+)+$/i),xn=Object.freeze({__proto__:null,ARIA_ATTR:Ii,ATTR_WHITESPACE:Di,CUSTOM_ELEMENT:Ni,DATA_ATTR:Ri,DOCTYPE_NAME:Tn,ERB_EXPR:Ei,IS_ALLOWED_URI:$n,IS_SCRIPT_OR_DATA:Li,MUSTACHE_EXPR:Ti,TMPLIT_EXPR:Ci}),sr={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Pi=function(){return typeof window>"u"?null:window},Oi=function(e,r){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null,n="data-tt-policy-suffix";r&&r.hasAttribute(n)&&(s=r.getAttribute(n));let i="dompurify"+(s?"#"+s:"");try{return e.createPolicy(i,{createHTML(o){return o},createScriptURL(o){return o}})}catch{return console.warn("TrustedTypes policy "+i+" could not be created."),null}},Sn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function En(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Pi(),e=j=>En(j);if(e.version="3.3.0",e.removed=[],!t||!t.document||t.document.nodeType!==sr.document||!t.Element)return e.isSupported=!1,e;let{document:r}=t,s=r,n=s.currentScript,{DocumentFragment:i,HTMLTemplateElement:o,Node:l,Element:a,NodeFilter:d,NamedNodeMap:u=t.NamedNodeMap||t.MozNamedAttrMap,HTMLFormElement:h,DOMParser:b,trustedTypes:_}=t,w=a.prototype,g=rr(w,"cloneNode"),k=rr(w,"remove"),C=rr(w,"nextSibling"),H=rr(w,"childNodes"),v=rr(w,"parentNode");if(typeof o=="function"){let j=r.createElement("template");j.content&&j.content.ownerDocument&&(r=j.content.ownerDocument)}let x,I="",{implementation:B,createNodeIterator:D,createDocumentFragment:P,getElementsByTagName:G}=r,{importNode:ve}=s,ae=Sn();e.isSupported=typeof An=="function"&&typeof v=="function"&&B&&B.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:ue,ERB_EXPR:Pe,TMPLIT_EXPR:$e,DATA_ATTR:we,ARIA_ATTR:S,IS_SCRIPT_OR_DATA:R,ATTR_WHITESPACE:M,CUSTOM_ELEMENT:X}=xn,{IS_ALLOWED_URI:J}=xn,K=null,xe=Q({},[...mn,...hs,...gs,...bs,...wn]),ee=null,T=Q({},[...kn,...ys,...vn,...Cr]),A=Object.seal(_s(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),F=null,z=null,q=Object.seal(_s(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),ne=!0,ge=!0,be=!1,re=!0,Se=!1,Ce=!0,Re=!1,Ue=!1,je=!1,Le=!1,De=!1,Ie=!1,le=!0,ze=!1,He="user-content-",Ze=!0,qe=!1,Oe={},Me=null,Xe=Q({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),rt=null,Qe=Q({},["audio","video","img","source","image","track"]),Z=null,bt=Q({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ft="http://www.w3.org/1998/Math/MathML",at="http://www.w3.org/2000/svg",We="http://www.w3.org/1999/xhtml",lt=We,m=!1,p=null,O=Q({},[ft,at,We],ps),Y=Q({},["mi","mo","mn","ms","mtext"]),ce=Q({},["annotation-xml"]),ye=Q({},["title","style","font","a","script"]),Fe=null,pe=["application/xhtml+xml","text/html"],qr="text/html",Te=null,N=null,jr=r.createElement("form"),fr=function(f){return f instanceof RegExp||f instanceof Function},Ht=function(){let f=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(N&&N===f)){if((!f||typeof f!="object")&&(f={}),f=ht(f),Fe=pe.indexOf(f.PARSER_MEDIA_TYPE)===-1?qr:f.PARSER_MEDIA_TYPE,Te=Fe==="application/xhtml+xml"?ps:Rr,K=ct(f,"ALLOWED_TAGS")?Q({},f.ALLOWED_TAGS,Te):xe,ee=ct(f,"ALLOWED_ATTR")?Q({},f.ALLOWED_ATTR,Te):T,p=ct(f,"ALLOWED_NAMESPACES")?Q({},f.ALLOWED_NAMESPACES,ps):O,Z=ct(f,"ADD_URI_SAFE_ATTR")?Q(ht(bt),f.ADD_URI_SAFE_ATTR,Te):bt,rt=ct(f,"ADD_DATA_URI_TAGS")?Q(ht(Qe),f.ADD_DATA_URI_TAGS,Te):Qe,Me=ct(f,"FORBID_CONTENTS")?Q({},f.FORBID_CONTENTS,Te):Xe,F=ct(f,"FORBID_TAGS")?Q({},f.FORBID_TAGS,Te):ht({}),z=ct(f,"FORBID_ATTR")?Q({},f.FORBID_ATTR,Te):ht({}),Oe=ct(f,"USE_PROFILES")?f.USE_PROFILES:!1,ne=f.ALLOW_ARIA_ATTR!==!1,ge=f.ALLOW_DATA_ATTR!==!1,be=f.ALLOW_UNKNOWN_PROTOCOLS||!1,re=f.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Se=f.SAFE_FOR_TEMPLATES||!1,Ce=f.SAFE_FOR_XML!==!1,Re=f.WHOLE_DOCUMENT||!1,Le=f.RETURN_DOM||!1,De=f.RETURN_DOM_FRAGMENT||!1,Ie=f.RETURN_TRUSTED_TYPE||!1,je=f.FORCE_BODY||!1,le=f.SANITIZE_DOM!==!1,ze=f.SANITIZE_NAMED_PROPS||!1,Ze=f.KEEP_CONTENT!==!1,qe=f.IN_PLACE||!1,J=f.ALLOWED_URI_REGEXP||$n,lt=f.NAMESPACE||We,Y=f.MATHML_TEXT_INTEGRATION_POINTS||Y,ce=f.HTML_INTEGRATION_POINTS||ce,A=f.CUSTOM_ELEMENT_HANDLING||{},f.CUSTOM_ELEMENT_HANDLING&&fr(f.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(A.tagNameCheck=f.CUSTOM_ELEMENT_HANDLING.tagNameCheck),f.CUSTOM_ELEMENT_HANDLING&&fr(f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(A.attributeNameCheck=f.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),f.CUSTOM_ELEMENT_HANDLING&&typeof f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(A.allowCustomizedBuiltInElements=f.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Se&&(ge=!1),De&&(Le=!0),Oe&&(K=Q({},wn),ee=[],Oe.html===!0&&(Q(K,mn),Q(ee,kn)),Oe.svg===!0&&(Q(K,hs),Q(ee,ys),Q(ee,Cr)),Oe.svgFilters===!0&&(Q(K,gs),Q(ee,ys),Q(ee,Cr)),Oe.mathMl===!0&&(Q(K,bs),Q(ee,vn),Q(ee,Cr))),f.ADD_TAGS&&(typeof f.ADD_TAGS=="function"?q.tagCheck=f.ADD_TAGS:(K===xe&&(K=ht(K)),Q(K,f.ADD_TAGS,Te))),f.ADD_ATTR&&(typeof f.ADD_ATTR=="function"?q.attributeCheck=f.ADD_ATTR:(ee===T&&(ee=ht(ee)),Q(ee,f.ADD_ATTR,Te))),f.ADD_URI_SAFE_ATTR&&Q(Z,f.ADD_URI_SAFE_ATTR,Te),f.FORBID_CONTENTS&&(Me===Xe&&(Me=ht(Me)),Q(Me,f.FORBID_CONTENTS,Te)),Ze&&(K["#text"]=!0),Re&&Q(K,["html","head","body"]),K.table&&(Q(K,["tbody"]),delete F.tbody),f.TRUSTED_TYPES_POLICY){if(typeof f.TRUSTED_TYPES_POLICY.createHTML!="function")throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof f.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw tr('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');x=f.TRUSTED_TYPES_POLICY,I=x.createHTML("")}else x===void 0&&(x=Oi(_,n)),x!==null&&typeof I=="string"&&(I=x.createHTML(""));Je&&Je(f),N=f}},hr=Q({},[...hs,...gs,...Ai]),gr=Q({},[...bs,...$i]),Wr=function(f){let E=v(f);(!E||!E.tagName)&&(E={namespaceURI:lt,tagName:"template"});let U=Rr(f.tagName),_e=Rr(E.tagName);return p[f.namespaceURI]?f.namespaceURI===at?E.namespaceURI===We?U==="svg":E.namespaceURI===ft?U==="svg"&&(_e==="annotation-xml"||Y[_e]):!!hr[U]:f.namespaceURI===ft?E.namespaceURI===We?U==="math":E.namespaceURI===at?U==="math"&&ce[_e]:!!gr[U]:f.namespaceURI===We?E.namespaceURI===at&&!ce[_e]||E.namespaceURI===ft&&!Y[_e]?!1:!gr[U]&&(ye[U]||!hr[U]):!!(Fe==="application/xhtml+xml"&&p[f.namespaceURI]):!1},st=function(f){Qt(e.removed,{element:f});try{v(f).removeChild(f)}catch{k(f)}},c=function(f,E){try{Qt(e.removed,{attribute:E.getAttributeNode(f),from:E})}catch{Qt(e.removed,{attribute:null,from:E})}if(E.removeAttribute(f),f==="is")if(Le||De)try{st(E)}catch{}else try{E.setAttribute(f,"")}catch{}},$=function(f){let E=null,U=null;if(je)f="<remove></remove>"+f;else{let W=fs(f,/^[\r\n\t ]+/);U=W&&W[0]}Fe==="application/xhtml+xml"&&lt===We&&(f='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+f+"</body></html>");let _e=x?x.createHTML(f):f;if(lt===We)try{E=new b().parseFromString(_e,Fe)}catch{}if(!E||!E.documentElement){E=B.createDocument(lt,"template",null);try{E.documentElement.innerHTML=m?I:_e}catch{}}let Ne=E.body||E.documentElement;return f&&U&&Ne.insertBefore(r.createTextNode(U),Ne.childNodes[0]||null),lt===We?G.call(E,Re?"html":"body")[0]:Re?E.documentElement:Ne},V=function(f){return D.call(f.ownerDocument||f,f,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},L=function(f){return f instanceof h&&(typeof f.nodeName!="string"||typeof f.textContent!="string"||typeof f.removeChild!="function"||!(f.attributes instanceof u)||typeof f.removeAttribute!="function"||typeof f.setAttribute!="function"||typeof f.namespaceURI!="string"||typeof f.insertBefore!="function"||typeof f.hasChildNodes!="function")},te=function(f){return typeof l=="function"&&f instanceof l};function ke(j,f,E){Er(j,U=>{U.call(e,f,E,N)})}let pt=function(f){let E=null;if(ke(ae.beforeSanitizeElements,f,null),L(f))return st(f),!0;let U=Te(f.nodeName);if(ke(ae.uponSanitizeElement,f,{tagName:U,allowedTags:K}),Ce&&f.hasChildNodes()&&!te(f.firstElementChild)&&Ve(/<[/\w!]/g,f.innerHTML)&&Ve(/<[/\w!]/g,f.textContent)||f.nodeType===sr.progressingInstruction||Ce&&f.nodeType===sr.comment&&Ve(/<[/\w]/g,f.data))return st(f),!0;if(!(q.tagCheck instanceof Function&&q.tagCheck(U))&&(!K[U]||F[U])){if(!F[U]&&qt(U)&&(A.tagNameCheck instanceof RegExp&&Ve(A.tagNameCheck,U)||A.tagNameCheck instanceof Function&&A.tagNameCheck(U)))return!1;if(Ze&&!Me[U]){let _e=v(f)||f.parentNode,Ne=H(f)||f.childNodes;if(Ne&&_e){let W=Ne.length;for(let se=W-1;se>=0;--se){let et=g(Ne[se],!0);et.__removalCount=(f.__removalCount||0)+1,_e.insertBefore(et,C(f))}}}return st(f),!0}return f instanceof a&&!Wr(f)||(U==="noscript"||U==="noembed"||U==="noframes")&&Ve(/<\/no(script|embed|frames)/i,f.innerHTML)?(st(f),!0):(Se&&f.nodeType===sr.text&&(E=f.textContent,Er([ue,Pe,$e],_e=>{E=er(E,_e," ")}),f.textContent!==E&&(Qt(e.removed,{element:f.cloneNode()}),f.textContent=E)),ke(ae.afterSanitizeElements,f,null),!1)},Ee=function(f,E,U){if(le&&(E==="id"||E==="name")&&(U in r||U in jr))return!1;if(!(ge&&!z[E]&&Ve(we,E))){if(!(ne&&Ve(S,E))){if(!(q.attributeCheck instanceof Function&&q.attributeCheck(E,f))){if(!ee[E]||z[E]){if(!(qt(f)&&(A.tagNameCheck instanceof RegExp&&Ve(A.tagNameCheck,f)||A.tagNameCheck instanceof Function&&A.tagNameCheck(f))&&(A.attributeNameCheck instanceof RegExp&&Ve(A.attributeNameCheck,E)||A.attributeNameCheck instanceof Function&&A.attributeNameCheck(E,f))||E==="is"&&A.allowCustomizedBuiltInElements&&(A.tagNameCheck instanceof RegExp&&Ve(A.tagNameCheck,U)||A.tagNameCheck instanceof Function&&A.tagNameCheck(U))))return!1}else if(!Z[E]){if(!Ve(J,er(U,M,""))){if(!((E==="src"||E==="xlink:href"||E==="href")&&f!=="script"&&ki(U,"data:")===0&&rt[f])){if(!(be&&!Ve(R,er(U,M,"")))){if(U)return!1}}}}}}}return!0},qt=function(f){return f!=="annotation-xml"&&fs(f,X)},yt=function(f){ke(ae.beforeSanitizeAttributes,f,null);let{attributes:E}=f;if(!E||L(f))return;let U={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ee,forceKeepAttr:void 0},_e=E.length;for(;_e--;){let Ne=E[_e],{name:W,namespaceURI:se,value:et}=Ne,At=Te(W),Gr=et,Be=W==="value"?Gr:vi(Gr);if(U.attrName=At,U.attrValue=Be,U.keepAttr=!0,U.forceKeepAttr=void 0,ke(ae.uponSanitizeAttribute,f,U),Be=U.attrValue,ze&&(At==="id"||At==="name")&&(c(W,f),Be=He+Be),Ce&&Ve(/((--!?|])>)|<\/(style|title|textarea)/i,Be)){c(W,f);continue}if(At==="attributename"&&fs(Be,"href")){c(W,f);continue}if(U.forceKeepAttr)continue;if(!U.keepAttr){c(W,f);continue}if(!re&&Ve(/\/>/i,Be)){c(W,f);continue}Se&&Er([ue,Pe,$e],Ms=>{Be=er(Be,Ms," ")});let Os=Te(f.nodeName);if(!Ee(Os,At,Be)){c(W,f);continue}if(x&&typeof _=="object"&&typeof _.getAttributeType=="function"&&!se)switch(_.getAttributeType(Os,At)){case"TrustedHTML":{Be=x.createHTML(Be);break}case"TrustedScriptURL":{Be=x.createScriptURL(Be);break}}if(Be!==Gr)try{se?f.setAttributeNS(se,W,Be):f.setAttribute(W,Be),L(f)?st(f):_n(e.removed)}catch{c(W,f)}}ke(ae.afterSanitizeAttributes,f,null)},St=function j(f){let E=null,U=V(f);for(ke(ae.beforeSanitizeShadowDOM,f,null);E=U.nextNode();)ke(ae.uponSanitizeShadowNode,E,null),pt(E),yt(E),E.content instanceof i&&j(E.content);ke(ae.afterSanitizeShadowDOM,f,null)};return e.sanitize=function(j){let f=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},E=null,U=null,_e=null,Ne=null;if(m=!j,m&&(j="<!-->"),typeof j!="string"&&!te(j))if(typeof j.toString=="function"){if(j=j.toString(),typeof j!="string")throw tr("dirty is not a string, aborting")}else throw tr("toString is not a function");if(!e.isSupported)return j;if(Ue||Ht(f),e.removed=[],typeof j=="string"&&(qe=!1),qe){if(j.nodeName){let et=Te(j.nodeName);if(!K[et]||F[et])throw tr("root node is forbidden and cannot be sanitized in-place")}}else if(j instanceof l)E=$("<!---->"),U=E.ownerDocument.importNode(j,!0),U.nodeType===sr.element&&U.nodeName==="BODY"||U.nodeName==="HTML"?E=U:E.appendChild(U);else{if(!Le&&!Se&&!Re&&j.indexOf("<")===-1)return x&&Ie?x.createHTML(j):j;if(E=$(j),!E)return Le?null:Ie?I:""}E&&je&&st(E.firstChild);let W=V(qe?j:E);for(;_e=W.nextNode();)pt(_e),yt(_e),_e.content instanceof i&&St(_e.content);if(qe)return j;if(Le){if(De)for(Ne=P.call(E.ownerDocument);E.firstChild;)Ne.appendChild(E.firstChild);else Ne=E;return(ee.shadowroot||ee.shadowrootmode)&&(Ne=ve.call(s,Ne,!0)),Ne}let se=Re?E.outerHTML:E.innerHTML;return Re&&K["!doctype"]&&E.ownerDocument&&E.ownerDocument.doctype&&E.ownerDocument.doctype.name&&Ve(Tn,E.ownerDocument.doctype.name)&&(se="<!DOCTYPE "+E.ownerDocument.doctype.name+`>
`+se),Se&&Er([ue,Pe,$e],et=>{se=er(se,et," ")}),x&&Ie?x.createHTML(se):se},e.setConfig=function(){let j=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Ht(j),Ue=!0},e.clearConfig=function(){N=null,Ue=!1},e.isValidAttribute=function(j,f,E){N||Ht({});let U=Te(j),_e=Te(f);return Ee(U,_e,E)},e.addHook=function(j,f){typeof f=="function"&&Qt(ae[j],f)},e.removeHook=function(j,f){if(f!==void 0){let E=mi(ae[j],f);return E===-1?void 0:wi(ae[j],E,1)[0]}return _n(ae[j])},e.removeHooks=function(j){ae[j]=[]},e.removeAllHooks=function(){ae=Sn()},e}var Cn=En();var Rn={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},In=t=>(...e)=>({_$litDirective$:t,values:e}),Ir=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,s){this._$Ct=e,this._$AM=r,this._$Ci=s}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var nr=class extends Ir{constructor(e){if(super(e),this.it=Ae,e.type!==Rn.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===Ae||e==null)return this._t=void 0,this.it=e;if(e===Ct)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};nr.directiveName="unsafeHTML",nr.resultType=1;var Ln=In(nr);function Ss(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Dt=Ss();function Bn(t){Dt=t}var lr={exec:()=>null};function oe(t,e=""){let r=typeof t=="string"?t:t.source,s={replace:(n,i)=>{let o=typeof i=="string"?i:i.source;return o=o.replace(Ye.caret,"$1"),r=r.replace(n,o),s},getRegex:()=>new RegExp(r,e)};return s}var Mi=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),Ye={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceTabs:/^\t+/,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,unescapeTest:/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:t=>new RegExp(`^( {0,3}${t})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}#`),htmlBeginRegex:t=>new RegExp(`^ {0,${Math.min(3,t-1)}}<(?:[a-z].*>|!--)`,"i")},Fi=/^(?:[ \t]*(?:\n|$))+/,Bi=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ui=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,cr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,zi=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,As=/(?:[*+-]|\d{1,9}[.)])/,Un=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,zn=oe(Un).replace(/bull/g,As).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Hi=oe(Un).replace(/bull/g,As).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$s=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,qi=/^[^\n]+/,Ts=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ji=oe(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ts).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Wi=oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,As).getRegex(),Mr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Es=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Gi=oe("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Es).replace("tag",Mr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Hn=oe($s).replace("hr",cr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),Vi=oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Hn).getRegex(),Cs={blockquote:Vi,code:Bi,def:ji,fences:Ui,heading:zi,hr:cr,html:Gi,lheading:zn,list:Wi,newline:Fi,paragraph:Hn,table:lr,text:qi},Dn=oe("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",cr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex(),Ji={...Cs,lheading:Hi,table:Dn,paragraph:oe($s).replace("hr",cr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Dn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Mr).getRegex()},Ki={...Cs,html:oe(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Es).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:lr,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:oe($s).replace("hr",cr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",zn).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Yi=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Zi=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,qn=/^( {2,}|\\)\n(?!\s*$)/,Xi=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Fr=/[\p{P}\p{S}]/u,Rs=/[\s\p{P}\p{S}]/u,jn=/[^\s\p{P}\p{S}]/u,Qi=oe(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Rs).getRegex(),Wn=/(?!~)[\p{P}\p{S}]/u,ea=/(?!~)[\s\p{P}\p{S}]/u,ta=/(?:[^\s\p{P}\p{S}]|~)/u,ra=oe(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Mi?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Gn=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,sa=oe(Gn,"u").replace(/punct/g,Fr).getRegex(),na=oe(Gn,"u").replace(/punct/g,Wn).getRegex(),Vn="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",oa=oe(Vn,"gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,Fr).getRegex(),ia=oe(Vn,"gu").replace(/notPunctSpace/g,ta).replace(/punctSpace/g,ea).replace(/punct/g,Wn).getRegex(),aa=oe("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,jn).replace(/punctSpace/g,Rs).replace(/punct/g,Fr).getRegex(),la=oe(/\\(punct)/,"gu").replace(/punct/g,Fr).getRegex(),ca=oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),da=oe(Es).replace("(?:-->|$)","-->").getRegex(),ua=oe("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",da).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Nr=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,pa=oe(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label",Nr).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Jn=oe(/^!?\[(label)\]\[(ref)\]/).replace("label",Nr).replace("ref",Ts).getRegex(),Kn=oe(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ts).getRegex(),fa=oe("reflink|nolink(?!\\()","g").replace("reflink",Jn).replace("nolink",Kn).getRegex(),Nn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Is={_backpedal:lr,anyPunctuation:la,autolink:ca,blockSkip:ra,br:qn,code:Zi,del:lr,emStrongLDelim:sa,emStrongRDelimAst:oa,emStrongRDelimUnd:aa,escape:Yi,link:pa,nolink:Kn,punctuation:Qi,reflink:Jn,reflinkSearch:fa,tag:ua,text:Xi,url:lr},ha={...Is,link:oe(/^!?\[(label)\]\((.*?)\)/).replace("label",Nr).getRegex(),reflink:oe(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Nr).getRegex()},ks={...Is,emStrongRDelimAst:ia,emStrongLDelim:na,url:oe(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",Nn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:oe(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",Nn).getRegex()},ga={...ks,br:oe(qn).replace("{2,}","*").getRegex(),text:oe(ks.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Lr={normal:Cs,gfm:Ji,pedantic:Ki},or={normal:Is,gfm:ks,breaks:ga,pedantic:ha},ba={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pn=t=>ba[t];function gt(t,e){if(e){if(Ye.escapeTest.test(t))return t.replace(Ye.escapeReplace,Pn)}else if(Ye.escapeTestNoEncode.test(t))return t.replace(Ye.escapeReplaceNoEncode,Pn);return t}function On(t){try{t=encodeURI(t).replace(Ye.percentDecode,"%")}catch{return null}return t}function Mn(t,e){let r=t.replace(Ye.findPipe,(i,o,l)=>{let a=!1,d=o;for(;--d>=0&&l[d]==="\\";)a=!a;return a?"|":" |"}),s=r.split(Ye.splitPipe),n=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;n<s.length;n++)s[n]=s[n].trim().replace(Ye.slashPipe,"|");return s}function ir(t,e,r){let s=t.length;if(s===0)return"";let n=0;for(;n<s;){let i=t.charAt(s-n-1);if(i===e&&!r)n++;else if(i!==e&&r)n++;else break}return t.slice(0,s-n)}function ya(t,e){if(t.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<t.length;s++)if(t[s]==="\\")s++;else if(t[s]===e[0])r++;else if(t[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function Fn(t,e,r,s,n){let i=e.href,o=e.title||null,l=t[1].replace(n.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:t[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:o,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,a}function _a(t,e,r){let s=t.match(r.other.indentCodeCompensation);if(s===null)return e;let n=s[1];return e.split(`
`).map(i=>{let o=i.match(r.other.beginningSpace);if(o===null)return i;let[l]=o;return l.length>=n.length?i.slice(n.length):i}).join(`
`)}var Pr=class{constructor(t){fe(this,"options");fe(this,"rules");fe(this,"lexer");this.options=t||Dt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:ir(r,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let r=e[0],s=_a(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=ir(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:ir(e[0],`
`)}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let r=ir(e[0],`
`).split(`
`),s="",n="",i=[];for(;r.length>0;){let o=!1,l=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))l.push(r[a]),o=!0;else if(!o)l.push(r[a]);else break;r=r.slice(a);let d=l.join(`
`),u=d.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${d}`:d,n=n?`${n}
${u}`:u;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,i,!0),this.lexer.state.top=h,r.length===0)break;let b=i.at(-1);if(b?.type==="code")break;if(b?.type==="blockquote"){let _=b,w=_.raw+`
`+r.join(`
`),g=this.blockquote(w);i[i.length-1]=g,s=s.substring(0,s.length-_.raw.length)+g.raw,n=n.substring(0,n.length-_.text.length)+g.text;break}else if(b?.type==="list"){let _=b,w=_.raw+`
`+r.join(`
`),g=this.list(w);i[i.length-1]=g,s=s.substring(0,s.length-b.raw.length)+g.raw,n=n.substring(0,n.length-_.raw.length)+g.raw,r=w.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let r=e[1].trim(),s=r.length>1,n={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),o=!1;for(;t;){let a=!1,d="",u="";if(!(e=i.exec(t))||this.rules.block.hr.test(t))break;d=e[0],t=t.substring(d.length);let h=e[2].split(`
`,1)[0].replace(this.rules.other.listReplaceTabs,g=>" ".repeat(3*g.length)),b=t.split(`
`,1)[0],_=!h.trim(),w=0;if(this.options.pedantic?(w=2,u=h.trimStart()):_?w=e[1].length+1:(w=e[2].search(this.rules.other.nonSpaceChar),w=w>4?1:w,u=h.slice(w),w+=e[1].length),_&&this.rules.other.blankLine.test(b)&&(d+=b+`
`,t=t.substring(b.length+1),a=!0),!a){let g=this.rules.other.nextBulletRegex(w),k=this.rules.other.hrRegex(w),C=this.rules.other.fencesBeginRegex(w),H=this.rules.other.headingBeginRegex(w),v=this.rules.other.htmlBeginRegex(w);for(;t;){let x=t.split(`
`,1)[0],I;if(b=x,this.options.pedantic?(b=b.replace(this.rules.other.listReplaceNesting,"  "),I=b):I=b.replace(this.rules.other.tabCharGlobal,"    "),C.test(b)||H.test(b)||v.test(b)||g.test(b)||k.test(b))break;if(I.search(this.rules.other.nonSpaceChar)>=w||!b.trim())u+=`
`+I.slice(w);else{if(_||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||C.test(h)||H.test(h)||k.test(h))break;u+=`
`+b}!_&&!b.trim()&&(_=!0),d+=x+`
`,t=t.substring(x.length+1),h=I.slice(w)}}n.loose||(o?n.loose=!0:this.rules.other.doubleBlankLine.test(d)&&(o=!0)),n.items.push({type:"list_item",raw:d,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),n.raw+=d}let l=n.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;n.raw=n.raw.trimEnd();for(let a of n.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let d=this.rules.other.listTaskCheckbox.exec(a.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};a.checked=u.checked,n.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=u.raw+a.tokens[0].raw,a.tokens[0].text=u.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(u)):a.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):a.tokens.unshift(u)}}if(!n.loose){let d=a.tokens.filter(h=>h.type==="space"),u=d.length>0&&d.some(h=>this.rules.other.anyLine.test(h.raw));n.loose=u}}if(n.loose)for(let a of n.items){a.loose=!0;for(let d of a.tokens)d.type==="text"&&(d.type="paragraph")}return n}}html(t){let e=this.rules.block.html.exec(t);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(t){let e=this.rules.block.def.exec(t);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",n=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:n}}}table(t){let e=this.rules.block.table.exec(t);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=Mn(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),n=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<r.length;o++)i.header.push({text:r[o],tokens:this.lexer.inline(r[o]),header:!0,align:i.align[o]});for(let o of n)i.rows.push(Mn(o,i.header.length).map((l,a)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[a]})));return i}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=ir(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=ya(e[2],"()");if(i===-2)return;if(i>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let s=e[2],n="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],n=i[3])}else n=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),Fn(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:n&&n.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(t,e){let r;if((r=this.rules.inline.reflink.exec(t))||(r=this.rules.inline.nolink.exec(t))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),n=e[s.toLowerCase()];if(!n){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return Fn(r,n,r[0],this.lexer,this.rules)}}emStrong(t,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(t);if(!(!s||s[3]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[2])||!r||this.rules.inline.punctuation.exec(r))){let n=[...s[0]].length-1,i,o,l=n,a=0,d=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+n);(s=d.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(o=[...i].length,s[3]||s[4]){l+=o;continue}else if((s[5]||s[6])&&n%3&&!((n+o)%3)){a+=o;continue}if(l-=o,l>0)continue;o=Math.min(o,o+l+a);let u=[...s[0]][0].length,h=t.slice(0,n+s.index+u+o);if(Math.min(n,o)%2){let _=h.slice(1,-1);return{type:"em",raw:h,text:_,tokens:this.lexer.inlineTokens(_)}}let b=h.slice(2,-2);return{type:"strong",raw:h,text:b,tokens:this.lexer.inlineTokens(b)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),n=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&n&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t){let e=this.rules.inline.autolink.exec(t);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(t){let e;if(e=this.rules.inline.url.exec(t)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let n;do n=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(n!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(t){let e=this.rules.inline.text.exec(t);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},dt=class vs{constructor(e){fe(this,"tokens");fe(this,"options");fe(this,"state");fe(this,"inlineQueue");fe(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Dt,this.options.tokenizer=this.options.tokenizer||new Pr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:Ye,block:Lr.normal,inline:or.normal};this.options.pedantic?(r.block=Lr.pedantic,r.inline=or.pedantic):this.options.gfm&&(r.block=Lr.gfm,this.options.breaks?r.inline=or.breaks:r.inline=or.gfm),this.tokenizer.rules=r}static get rules(){return{block:Lr,inline:or}}static lex(e,r){return new vs(r).lex(e)}static lexInline(e,r){return new vs(r).inlineTokens(e)}lex(e){e=e.replace(Ye.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.options.pedantic&&(e=e.replace(Ye.tabCharGlobal,"    ").replace(Ye.spaceLine,""));e;){let n;if(this.options.extensions?.block?.some(o=>(n=o.call({lexer:this},e,r))?(e=e.substring(n.raw.length),r.push(n),!0):!1))continue;if(n=this.tokenizer.space(e)){e=e.substring(n.raw.length);let o=r.at(-1);n.raw.length===1&&o!==void 0?o.raw+=`
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
`+n.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):r.push(n);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){let s=e,n=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(n=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(n[0].slice(n[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,n.index)+"["+"a".repeat(n[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(n=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,n.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(n=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=n[2]?n[2].length:0,s=s.slice(0,n.index+i)+"["+"a".repeat(n[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let o=!1,l="";for(;e;){o||(l=""),o=!1;let a;if(this.options.extensions?.inline?.some(u=>(a=u.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let u=r.at(-1);a.type==="text"&&u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,l)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let d=e;if(this.options.extensions?.startInline){let u=1/0,h=e.slice(1),b;this.options.extensions.startInline.forEach(_=>{b=_.call({lexer:this},h),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(d=e.substring(0,u+1))}if(a=this.tokenizer.inlineText(d)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(l=a.raw.slice(-1)),o=!0;let u=r.at(-1);u?.type==="text"?(u.raw+=a.raw,u.text+=a.text):r.push(a);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return r}},Or=class{constructor(t){fe(this,"options");fe(this,"parser");this.options=t||Dt}space(t){return""}code({text:t,lang:e,escaped:r}){let s=(e||"").match(Ye.notSpaceStart)?.[0],n=t.replace(Ye.endingNewline,"")+`
`;return s?'<pre><code class="language-'+gt(s)+'">'+(r?n:gt(n,!0))+`</code></pre>
`:"<pre><code>"+(r?n:gt(n,!0))+`</code></pre>
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
`}strong({tokens:t}){return`<strong>${this.parser.parseInline(t)}</strong>`}em({tokens:t}){return`<em>${this.parser.parseInline(t)}</em>`}codespan({text:t}){return`<code>${gt(t,!0)}</code>`}br(t){return"<br>"}del({tokens:t}){return`<del>${this.parser.parseInline(t)}</del>`}link({href:t,title:e,tokens:r}){let s=this.parser.parseInline(r),n=On(t);if(n===null)return s;t=n;let i='<a href="'+t+'"';return e&&(i+=' title="'+gt(e)+'"'),i+=">"+s+"</a>",i}image({href:t,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let n=On(t);if(n===null)return gt(r);t=n;let i=`<img src="${t}" alt="${r}"`;return e&&(i+=` title="${gt(e)}"`),i+=">",i}text(t){return"tokens"in t&&t.tokens?this.parser.parseInline(t.tokens):"escaped"in t&&t.escaped?t.text:gt(t.text)}},Ls=class{strong({text:t}){return t}em({text:t}){return t}codespan({text:t}){return t}del({text:t}){return t}html({text:t}){return t}text({text:t}){return t}link({text:t}){return""+t}image({text:t}){return""+t}br(){return""}checkbox({raw:t}){return t}},ut=class xs{constructor(e){fe(this,"options");fe(this,"renderer");fe(this,"textRenderer");this.options=e||Dt,this.options.renderer=this.options.renderer||new Or,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ls}static parse(e,r){return new xs(r).parse(e)}static parseInline(e,r){return new xs(r).parseInline(e)}parse(e){let r="";for(let s=0;s<e.length;s++){let n=e[s];if(this.options.extensions?.renderers?.[n.type]){let o=n,l=this.options.extensions.renderers[o.type].call({parser:this},o);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){r+=l||"";continue}}let i=n;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return r}parseInline(e,r=this.renderer){let s="";for(let n=0;n<e.length;n++){let i=e[n];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let o=i;switch(o.type){case"escape":{s+=r.text(o);break}case"html":{s+=r.html(o);break}case"link":{s+=r.link(o);break}case"image":{s+=r.image(o);break}case"checkbox":{s+=r.checkbox(o);break}case"strong":{s+=r.strong(o);break}case"em":{s+=r.em(o);break}case"codespan":{s+=r.codespan(o);break}case"br":{s+=r.br(o);break}case"del":{s+=r.del(o);break}case"text":{s+=r.text(o);break}default:{let l='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},Dr,ar=(Dr=class{constructor(t){fe(this,"options");fe(this,"block");this.options=t||Dt}preprocess(t){return t}postprocess(t){return t}processAllTokens(t){return t}emStrongMask(t){return t}provideLexer(){return this.block?dt.lex:dt.lexInline}provideParser(){return this.block?ut.parse:ut.parseInline}},fe(Dr,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),fe(Dr,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Dr),ma=class{constructor(...t){fe(this,"defaults",Ss());fe(this,"options",this.setOptions);fe(this,"parse",this.parseMarkdown(!0));fe(this,"parseInline",this.parseMarkdown(!1));fe(this,"Parser",ut);fe(this,"Renderer",Or);fe(this,"TextRenderer",Ls);fe(this,"Lexer",dt);fe(this,"Tokenizer",Pr);fe(this,"Hooks",ar);this.use(...t)}walkTokens(t,e){let r=[];for(let s of t)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let n=s;for(let i of n.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of n.rows)for(let o of i)r=r.concat(this.walkTokens(o.tokens,e));break}case"list":{let n=s;r=r.concat(this.walkTokens(n.items,e));break}default:{let n=s;this.defaults.extensions?.childTokens?.[n.type]?this.defaults.extensions.childTokens[n.type].forEach(i=>{let o=n[i].flat(1/0);r=r.concat(this.walkTokens(o,e))}):n.tokens&&(r=r.concat(this.walkTokens(n.tokens,e)))}}return r}use(...t){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return t.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(n=>{if(!n.name)throw new Error("extension name required");if("renderer"in n){let i=e.renderers[n.name];i?e.renderers[n.name]=function(...o){let l=n.renderer.apply(this,o);return l===!1&&(l=i.apply(this,o)),l}:e.renderers[n.name]=n.renderer}if("tokenizer"in n){if(!n.level||n.level!=="block"&&n.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[n.level];i?i.unshift(n.tokenizer):e[n.level]=[n.tokenizer],n.start&&(n.level==="block"?e.startBlock?e.startBlock.push(n.start):e.startBlock=[n.start]:n.level==="inline"&&(e.startInline?e.startInline.push(n.start):e.startInline=[n.start]))}"childTokens"in n&&n.childTokens&&(e.childTokens[n.name]=n.childTokens)}),s.extensions=e),r.renderer){let n=this.defaults.renderer||new Or(this.defaults);for(let i in r.renderer){if(!(i in n))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,l=r.renderer[o],a=n[o];n[o]=(...d)=>{let u=l.apply(n,d);return u===!1&&(u=a.apply(n,d)),u||""}}s.renderer=n}if(r.tokenizer){let n=this.defaults.tokenizer||new Pr(this.defaults);for(let i in r.tokenizer){if(!(i in n))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,l=r.tokenizer[o],a=n[o];n[o]=(...d)=>{let u=l.apply(n,d);return u===!1&&(u=a.apply(n,d)),u}}s.tokenizer=n}if(r.hooks){let n=this.defaults.hooks||new ar;for(let i in r.hooks){if(!(i in n))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,l=r.hooks[o],a=n[o];ar.passThroughHooks.has(i)?n[o]=d=>{if(this.defaults.async&&ar.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await l.call(n,d);return a.call(n,h)})();let u=l.call(n,d);return a.call(n,u)}:n[o]=(...d)=>{if(this.defaults.async)return(async()=>{let h=await l.apply(n,d);return h===!1&&(h=await a.apply(n,d)),h})();let u=l.apply(n,d);return u===!1&&(u=a.apply(n,d)),u}}s.hooks=n}if(r.walkTokens){let n=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(o){let l=[];return l.push(i.call(this,o)),n&&(l=l.concat(n.call(this,o))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(t){return this.defaults={...this.defaults,...t},this}lexer(t,e){return dt.lex(t,e??this.defaults)}parser(t,e){return ut.parse(t,e??this.defaults)}parseMarkdown(t){return(e,r)=>{let s={...r},n={...this.defaults,...s},i=this.onError(!!n.silent,!!n.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(n.hooks&&(n.hooks.options=n,n.hooks.block=t),n.async)return(async()=>{let o=n.hooks?await n.hooks.preprocess(e):e,l=await(n.hooks?await n.hooks.provideLexer():t?dt.lex:dt.lexInline)(o,n),a=n.hooks?await n.hooks.processAllTokens(l):l;n.walkTokens&&await Promise.all(this.walkTokens(a,n.walkTokens));let d=await(n.hooks?await n.hooks.provideParser():t?ut.parse:ut.parseInline)(a,n);return n.hooks?await n.hooks.postprocess(d):d})().catch(i);try{n.hooks&&(e=n.hooks.preprocess(e));let o=(n.hooks?n.hooks.provideLexer():t?dt.lex:dt.lexInline)(e,n);n.hooks&&(o=n.hooks.processAllTokens(o)),n.walkTokens&&this.walkTokens(o,n.walkTokens);let l=(n.hooks?n.hooks.provideParser():t?ut.parse:ut.parseInline)(o,n);return n.hooks&&(l=n.hooks.postprocess(l)),l}catch(o){return i(o)}}}onError(t,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,t){let s="<p>An error occurred:</p><pre>"+gt(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},Lt=new ma;function de(t,e){return Lt.parse(t,e)}de.options=de.setOptions=function(t){return Lt.setOptions(t),de.defaults=Lt.defaults,Bn(de.defaults),de};de.getDefaults=Ss;de.defaults=Dt;de.use=function(...t){return Lt.use(...t),de.defaults=Lt.defaults,Bn(de.defaults),de};de.walkTokens=function(t,e){return Lt.walkTokens(t,e)};de.parseInline=Lt.parseInline;de.Parser=ut;de.parser=ut.parse;de.Renderer=Or;de.TextRenderer=Ls;de.Lexer=dt;de.lexer=dt.lex;de.Tokenizer=Pr;de.Hooks=ar;de.parse=de;var Bl=de.options,Ul=de.setOptions,zl=de.use,Hl=de.walkTokens,ql=de.parseInline;var jl=ut.parse,Wl=dt.lex;function dr(t){let e=de.parse(t),r=Cn.sanitize(e);return Ln(r)}var Br=["open","in_progress","deferred","resolved","closed"];function it(t){switch((t||"").toString()){case"open":return"Open";case"in_progress":return"In progress";case"deferred":return"Deferred";case"resolved":return"Resolved";case"closed":return"Closed";case"queued":return"Queued";case"starting":return"Starting";case"running":return"Running";case"cancelling":return"Cancelling";case"succeeded":return"Succeeded";case"failed":return"Failed";case"cancelled":return"Cancelled";default:return(t||"").toString()||"Open"}}function wa(t){if(!t)return"";try{return new Date(t).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}catch{return t}}function ka(t){window.location.hash=t}function Yn(t,e,r=ka,s=void 0,n=void 0){let i=he("views:detail"),o=null,l=null,a=!1,d=!1,u=!1,h=!1,b=!1,_=!1,w=!1,g=!1,k="",C="",H="",v="",x="",I="",B="",D=!1,P=null,G=()=>{};function ve(){return P||(P=document.createElement("dialog"),P.id="delete-confirm-dialog",P.setAttribute("role","alertdialog"),P.setAttribute("aria-modal","true"),document.body.appendChild(P),P)}function ae(){if(!o)return;let c=ve(),$=o.id,V=o.title||"(no title)";c.innerHTML=`
      <div class="delete-confirm">
        <h2 class="delete-confirm__title">Delete Issue</h2>
        <p class="delete-confirm__message">
          Are you sure you want to delete issue <strong>${$}</strong> \u2014 <strong>${V}</strong>? This action cannot be undone.
        </p>
        <div class="delete-confirm__actions">
          <button type="button" class="btn" id="delete-cancel-btn">Cancel</button>
          <button type="button" class="btn danger" id="delete-confirm-btn">Delete</button>
        </div>
      </div>
    `;let L=c.querySelector("#delete-cancel-btn"),te=c.querySelector("#delete-confirm-btn");if(L?.addEventListener("click",()=>{typeof c.close=="function"&&c.close(),c.removeAttribute("open")}),te?.addEventListener("click",async()=>{typeof c.close=="function"&&c.close(),c.removeAttribute("open"),await ue()}),c.addEventListener("cancel",ke=>{ke.preventDefault(),typeof c.close=="function"&&c.close(),c.removeAttribute("open")}),typeof c.showModal=="function")try{c.showModal(),c.setAttribute("open","")}catch{c.setAttribute("open","")}else c.setAttribute("open","")}async function ue(){if(!o)return;let c=o.id;try{await e("delete-issue",{id:c}),o=null,l=null,N();let $=Ut(window.location.hash||"");r(`#/${$}`)}catch($){i("delete failed: %o",$),ie("Failed to delete issue","error")}}function Pe(c){c.stopPropagation(),c.preventDefault(),ae()}function $e(c){let $=Ut(window.location.hash||"");return wt($==="worker"?"issues":$,c)}function we(c){me(y`
        <div class="panel__body" id="detail-root">
          <p class="muted">${c}</p>
        </div>
      `,t)}function S(){if(!l||!s||typeof s.snapshotFor!="function")return;let c=s.snapshotFor(`detail:${l}`);Array.isArray(c)&&c.length>0&&(o=c.find(V=>String(V.id)===String(l))||c[0])}s&&typeof s.subscribe=="function"&&s.subscribe(()=>{try{S(),N()}catch(c){i("issue stores listener error %o",c)}}),n&&typeof n.subscribe=="function"&&(G=n.subscribe(()=>{try{N()}catch(c){i("store listener error %o",c)}}));let R=()=>{d=!0,N()},M=c=>{c.key==="Enter"?(d=!0,N()):c.key==="Escape"&&(d=!1,N())},X=async()=>{if(!o||a)return;let c=t.querySelector("h2 input"),$=o.title||"",V=c?c.value:"";if(V===$){d=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save title %s \u2192 %s",String(o.id),V);let L=await e("edit-text",{id:o.id,field:"title",value:V});L&&typeof L=="object"&&(o=L,d=!1,N())}catch(L){i("save title failed %s %o",String(o.id),L),o.title=$,d=!1,N(),ie("Failed to save title","error")}finally{a=!1}},J=()=>{d=!1,N()},K=()=>{w=!0,N()},xe=c=>{c.key==="Enter"?(c.preventDefault(),w=!0,N()):c.key==="Escape"&&(c.preventDefault(),w=!1,N())},ee=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .prop.assignee input"),$=o?.assignee??"",V=c?.value??"";if(V===$){w=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save assignee %s \u2192 %s",String(o.id),V);let L=await e("update-assignee",{id:o.id,assignee:V});L&&typeof L=="object"&&(o=L,w=!1,N())}catch(L){i("save assignee failed %s %o",String(o.id),L),o.assignee=$,w=!1,N(),ie("Failed to update assignee","error")}finally{a=!1}},T=()=>{w=!1,N()},A=c=>{I=c.currentTarget.value||""};function F(c){c.key==="Enter"&&(c.preventDefault(),z())}async function z(){if(!o||a)return;let c=I.trim();if(c){a=!0;try{i("add label %s \u2192 %s",String(o.id),c);let $=await e("label-add",{id:o.id,label:c});$&&typeof $=="object"&&(o=$,I="",N())}catch($){i("add label failed %s %o",String(o.id),$),ie("Failed to add label","error")}finally{a=!1}}}async function q(c){if(!(!o||a)){a=!0;try{i("remove label %s \u2192 %s",String(o?.id||""),c);let $=await e("label-remove",{id:o.id,label:c});$&&typeof $=="object"&&(o=$,N())}catch($){i("remove label failed %s %o",String(o?.id||""),$),ie("Failed to remove label","error")}finally{a=!1}}}let ne=async c=>{if(!o||a){N();return}let $=c.currentTarget,V=o.status||"open",L=$.value;if(L!==V){a=!0,o.status=L,N();try{i("update status %s \u2192 %s",String(o.id),L);let te=await e("update-status",{id:o.id,status:L});te&&typeof te=="object"&&(o=te,N())}catch(te){i("update status failed %s %o",String(o.id),te),o.status=V,N(),ie("Failed to update status","error")}finally{a=!1}}},ge=async c=>{if(!o||a){N();return}let $=c.currentTarget,V=typeof o.priority=="number"?o.priority:2,L=Number($.value);if(L!==V){a=!0,o.priority=L,N();try{i("update priority %s \u2192 %d",String(o.id),L);let te=await e("update-priority",{id:o.id,priority:L});te&&typeof te=="object"&&(o=te,N())}catch(te){i("update priority failed %s %o",String(o.id),te),o.priority=V,N(),ie("Failed to update priority","error")}finally{a=!1}}},be=()=>{u=!0,N()},re=c=>{if(c.key==="Escape")u=!1,N();else if(c.key==="Enter"&&c.ctrlKey){let $=t.querySelector("#detail-root .editable-actions button");$&&$.click()}},Se=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root textarea"),$=o.description||"",V=c?c.value:"";if(V===$){u=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save description %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"description",value:V});L&&typeof L=="object"&&(o=L,u=!1,N())}catch(L){i("save description failed %s %o",String(o?.id||""),L),o.description=$,u=!1,N(),ie("Failed to save description","error")}finally{a=!1}},Ce=()=>{u=!1,N()},Re=()=>{h=!0,N();try{let c=t.querySelector("#detail-root .design textarea");c&&c.focus()}catch(c){i("focus design textarea failed %o",c)}},Ue=c=>{if(c.key==="Escape")h=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let $=t.querySelector("#detail-root .design .editable-actions button");$&&$.click()}},je=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .design textarea"),$=o.design||"",V=c?c.value:"";if(V===$){h=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save design %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"design",value:V});L&&typeof L=="object"&&(o=L,h=!1,N())}catch(L){i("save design failed %s %o",String(o?.id||""),L),o.design=$,h=!1,N(),ie("Failed to save design","error")}finally{a=!1}},Le=()=>{h=!1,N()},De=()=>{b=!0,N()},Ie=c=>{if(c.key==="Escape")b=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let $=t.querySelector("#detail-root .notes .editable-actions button");$&&$.click()}},le=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .notes textarea"),$=o.notes||"",V=c?c.value:"";if(V===$){b=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save notes %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"notes",value:V});L&&typeof L=="object"&&(o=L,b=!1,N())}catch(L){i("save notes failed %s %o",String(o?.id||""),L),o.notes=$,b=!1,N(),ie("Failed to save notes","error")}finally{a=!1}},ze=()=>{b=!1,N()},He=()=>{_=!0,N()},Ze=c=>{if(c.key==="Escape")_=!1,N();else if(c.key==="Enter"&&(c.ctrlKey||c.metaKey)){let $=t.querySelector("#detail-root .acceptance .editable-actions button");$&&$.click()}},qe=async()=>{if(!o||a)return;let c=t.querySelector("#detail-root .acceptance textarea"),$=o.acceptance||"",V=c?c.value:"";if(V===$){_=!1,N();return}a=!0,c&&(c.disabled=!0);try{i("save acceptance %s",String(o?.id||""));let L=await e("edit-text",{id:o.id,field:"acceptance",value:V});L&&typeof L=="object"&&(o=L,_=!1,N())}catch(L){i("save acceptance failed %s %o",String(o?.id||""),L),o.acceptance=$,_=!1,N(),ie("Failed to save acceptance","error")}finally{a=!1}},Oe=()=>{_=!1,N()},Me=c=>{let $=c.currentTarget,V=B.trim().length>0;B=$.value||"";let L=B.trim().length>0;V!==L&&N()},Xe=async()=>{if(!(!o||D||!B.trim())){D=!0,N();try{i("add comment to %s",String(o.id));let c=await e("add-comment",{id:o.id,text:B.trim()});Array.isArray(c)&&(o.comments=c,B="",N())}catch(c){i("add comment failed %s %o",String(o.id),c),ie("Failed to add comment","error")}finally{D=!1,N()}}},rt=c=>{c.key==="Enter"&&(c.ctrlKey||c.metaKey)&&(c.preventDefault(),Xe())};function Qe(c,$){let V=c==="Dependencies"?"add-dependency":"add-dependent";return y`
      <div class="props-card">
        <div>
          <div class="props-card__title">${c}</div>
        </div>
        <ul>
          ${!$||$.length===0?null:$.map(L=>{let te=L.id,ke=$e(te);return y`<li
                  data-href=${ke}
                  @click=${()=>r(ke)}
                >
                  ${It(L.issue_type||"")}
                  <span class="text-truncate">${L.title||""}</span>
                  <button
                    aria-label=${`Remove dependency ${te}`}
                    @click=${jr(te,c)}
                  >
                    ×
                  </button>
                </li>`})}
        </ul>
        <div class="props-card__footer">
          <input type="text" placeholder="Issue ID" data-testid=${V} />
          <button @click=${fr($,c)}>Add</button>
        </div>
      </div>
    `}function Z(){if(!o||a)return;let c=o.metadata||{};k=typeof c.execution_lane=="string"?c.execution_lane:"",C=typeof c.workspace_policy=="string"?c.workspace_policy:"",H=typeof c.branch_policy=="string"?c.branch_policy:"",v=typeof c.finish_action=="string"?c.finish_action:"",x=typeof c.review_profile=="string"?c.review_profile:"",g=!0,N()}function bt(){g=!1,k="",C="",H="",v="",x="",N()}async function ft(){if(!o||a)return;let c=us(k,C,H,v,x);if(!c){ie("Choose valid workflow settings","error"),N();return}a=!0,N();try{let $=await e("update-workflow-settings",{id:o.id,values:c});$&&typeof $=="object"&&!Array.isArray($)&&(o=$),g=!1,k="",C="",H="",v="",x=""}catch($){i("save workflow settings failed %o",$),ie("Failed to save workflow settings","error")}finally{a=!1,N()}}function at(c){k=c.currentTarget.value,N()}function We(c){C=c.currentTarget.value,N()}function lt(c){H=c.currentTarget.value,N()}function m(c){v=c.currentTarget.value,N()}function p(c){x=c.currentTarget.value,N()}async function O(c){try{await navigator.clipboard.writeText(c),ie("Copied path")}catch($){i("copy artifact path failed %o",$),ie("Failed to copy path","error")}}function Y(){return n?.getState?.().config?.detail?.workflow_summary||null}function ce(c){let $=String(c.kind||"value"),V=String(c.label||""),L=String(c.value||""),te=typeof c.href=="string"?c.href:"";return $==="artifact"?y`<div class="workflow-summary__row workflow-artifact">
        <div class="workflow-summary__label">${V}</div>
        <button
          type="button"
          class="workflow-summary__value workflow-artifact__value"
          title=${L}
          @click=${()=>O(L)}
        >
          ${L}
        </button>
      </div>`:$==="link"&&te?y`<div class="workflow-summary__row">
        <div class="workflow-summary__label">${V}</div>
        <div class="workflow-summary__value">
          <a href=${te} target="_blank" rel="noreferrer noopener">${L}</a>
        </div>
      </div>`:y`<div
      class=${`workflow-summary__row ${$==="invalid"?"is-invalid":""}`}
    >
      <div class="workflow-summary__label">${V}</div>
      <div class="workflow-summary__value">${L}</div>
    </div>`}function ye(c,$){return c&&!$.includes(c)?y`<option value=${c} selected>Invalid: ${c}</option>`:null}function Fe(c,$,V,L,te,ke){return y`<div class="workflow-summary__row">
      <label class="workflow-summary__label" for=${c}>${$}</label>
      <select
        id=${c}
        data-testid=${c}
        .value=${V}
        ?disabled=${a}
        @change=${te}
      >
        <option value="">${ke}</option>
        ${ye(V,L)}
        ${L.map(pt=>y`<option value=${pt}>${pt}</option>`)}
      </select>
    </div>`}function pe(c){let $=Array.isArray(c.editable_fields)?c.editable_fields:[],V=["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"].every(St=>$.includes(St));if(!g)return y`<section
        class="workflow-summary__section"
        data-section="workflow_settings"
      >
        <div class="workflow-summary__section-title">Workflow settings</div>
        <div class="workflow-summary__list">
          ${c.rows.map(St=>ce(St))}
        </div>
        ${V?y`<button
              type="button"
              class="btn"
              data-testid="workflow-settings-edit"
              ?disabled=${a}
              @click=${Z}
            >
              Edit
            </button>`:null}
      </section>`;let L=!!(C&&H&&v),te=zt({workspace_policy:C,branch_policy:H,finish_action:v}),ke=L&&te.kind!=="valid",pt=x!==""&&!Xt.includes(x),Ee=k!==""&&!Zt.includes(k),yt=!!us(k,C,H,v,x);return y`<section
      class="workflow-summary__section"
      data-section="workflow_settings"
    >
      <div class="workflow-summary__section-title">Workflow settings</div>
      <div class="workflow-summary__list">
        ${Fe("workflow-settings-lane","Execution lane",k,Zt,at,"Choose lane")}
        ${Fe("workflow-settings-workspace","Workspace",C,is,We,"Choose workspace")}
        ${Fe("workflow-settings-branch","Branch",H,as,lt,"Choose branch")}
        ${Fe("workflow-settings-finish","Finish",v,ls,m,"Choose finish")}
        ${Fe("workflow-settings-review-profile","Review profile",x,Xt,p,cs)}
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
          ?disabled=${a||!yt}
          @click=${ft}
        >
          Save
        </button>
        <button
          type="button"
          class="btn"
          data-testid="workflow-settings-cancel"
          ?disabled=${a}
          @click=${bt}
        >
          Cancel
        </button>
      </div>
    </section>`}function qr(c){return c.id==="workflow_settings"?pe(c):y`<section
      class="workflow-summary__section"
      data-section=${c.id}
    >
      <div class="workflow-summary__section-title">${c.label}</div>
      <div class="workflow-summary__list">
        ${c.rows.map($=>ce($))}
      </div>
    </section>`}function Te(c){let $=gn(c,Y()),V=$.length>0?y`<div class="props-card workflow-summary">
            <div class="props-card__title">Workflow summary</div>
            ${$.map(W=>qr(W))}
          </div>`:null,L=d?y`<div class="detail-title">
          <h2>
            <input
              type="text"
              aria-label="Edit title"
              .value=${c.title||""}
              @keydown=${Ht}
            />
            <button @click=${X}>Save</button>
            <button @click=${J}>Cancel</button>
          </h2>
        </div>`:y`<div class="detail-title">
          <h2>
            <span
              class="editable"
              tabindex="0"
              role="button"
              aria-label="Edit title"
              @click=${R}
              @keydown=${M}
              >${c.title||""}</span
            >
          </h2>
        </div>`,te=y`<select
      class=${`badge-select badge--status is-${c.status||"open"}`}
      @change=${ne}
      .value=${c.status||"open"}
      ?disabled=${a}
    >
      ${(()=>{let W=String(c.status||"open");return Br.map(se=>y`<option value=${se} ?selected=${W===se}>
              ${it(se)}
            </option>`)})()}
    </select>`,ke=y`<select
      class=${`badge-select badge--priority is-p${String(typeof c.priority=="number"?c.priority:2)}`}
      @change=${ge}
      .value=${String(typeof c.priority=="number"?c.priority:2)}
      ?disabled=${a}
    >
      ${(()=>{let W=String(typeof c.priority=="number"?c.priority:2);return vt.map((se,et)=>y`<option value=${String(et)} ?selected=${W===String(et)}>
              ${Yt(et)} ${se}
            </option>`)})()}
    </select>`,pt=u?y`<div class="description">
          <textarea
            @keydown=${re}
            .value=${c.description||""}
            rows="8"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${Se}>Save</button>
            <button @click=${Ce}>Cancel</button>
          </div>
        </div>`:y`<div
          class="md editable"
          tabindex="0"
          role="button"
          aria-label="Edit description"
          @click=${be}
          @keydown=${hr}
        >
          ${(()=>{let W=c.description||"";return W.trim()===""?y`<div class="muted">Description</div>`:dr(W)})()}
        </div>`,Ee=(()=>{let W=c;return String(c.acceptance||W.acceptance_criteria||"")})(),qt=_?y`<div class="acceptance">
          ${Ee.trim().length>0?y`<div class="props-card__title">Acceptance Criteria</div>`:""}
          <textarea
            @keydown=${Ze}
            .value=${Ee}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${qe}>Save</button>
            <button @click=${Oe}>Cancel</button>
          </div>
        </div>`:y`<div class="acceptance">
          ${(()=>{let W=Ee,se=W.trim().length>0;return y`${se?y`<div class="props-card__title">Acceptance Criteria</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit acceptance criteria"
                @click=${He}
                @keydown=${gr}
              >
                ${se?dr(W):y`<div class="muted">Add acceptance criteria…</div>`}
              </div>`})()}
        </div>`,yt=String(c.notes||""),St=b?y`<div class="notes">
          ${yt.trim().length>0?y`<div class="props-card__title">Notes</div>`:""}
          <textarea
            @keydown=${Ie}
            .value=${yt}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${le}>Save</button>
            <button @click=${ze}>Cancel</button>
          </div>
        </div>`:y`<div class="notes">
          ${(()=>{let W=yt,se=W.trim().length>0;return y`${se?y`<div class="props-card__title">Notes</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit notes"
                @click=${De}
                @keydown=${Wr}
              >
                ${se?dr(W):y`<div class="muted">Add notes…</div>`}
              </div>`})()}
        </div>`,j=Array.isArray(c.labels)?c.labels:[],f=y`<div class="props-card labels">
      <div>
        <div class="props-card__title">Labels</div>
      </div>
      <ul>
        ${j.map(W=>y`<li>
              <span class="badge" title=${W}
                >${W}
                <button
                  class="icon-button"
                  title="Remove label"
                  aria-label=${"Remove label "+W}
                  @click=${()=>q(W)}
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
          .value=${I}
          @input=${A}
          @keydown=${F}
        />
        <button @click=${z}>Add</button>
      </div>
    </div>`,E=String(c.design||""),U=h?y`<div class="design">
          ${E.trim().length>0?y`<div class="props-card__title">Design</div>`:""}
          <textarea
            @keydown=${Ue}
            .value=${E}
            rows="6"
            style="width:100%"
          ></textarea>
          <div class="editable-actions">
            <button @click=${je}>Save</button>
            <button @click=${Le}>Cancel</button>
          </div>
        </div>`:y`<div class="design">
          ${(()=>{let W=E,se=W.trim().length>0;return y`${se?y`<div class="props-card__title">Design</div>`:""}
              <div
                class="md editable"
                tabindex="0"
                role="button"
                aria-label="Edit design"
                @click=${Re}
                @keydown=${st}
              >
                ${se?dr(W):y`<div class="muted">Add design…</div>`}
              </div>`})()}
        </div>`,_e=Array.isArray(c.comments)?c.comments:[],Ne=y`<div class="comments">
      <div class="props-card__title">Comments</div>
      ${_e.length===0?y`<div class="muted">No comments yet</div>`:_e.map(W=>y`
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
          @input=${Me}
          @keydown=${rt}
          ?disabled=${D}
        ></textarea>
        <button
          @click=${Xe}
          ?disabled=${D||!B.trim()}
        >
          ${D?"Adding...":"Add Comment"}
        </button>
      </div>
    </div>`;return y`
      <div class="panel__body" id="detail-root">
        <div class="detail-layout">
          <div class="detail-main">
            ${L} ${pt} ${U} ${St}
            ${qt} ${Ne}
          </div>
          <div class="detail-side">
            <div class="props-card">
              <div class="props-card__header">
                <div class="props-card__title">Properties</div>
                <button class="delete-issue-btn" title="Delete issue" aria-label="Delete issue" @click=${Pe}>
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
                    ${It(c.issue_type)}
                  </div>
                </div>
                <div class="prop">
                  <div class="label">Status</div>
                  <div class="value">${te}</div>
                </div>
                ${c.close_reason?y`<div class="prop">
                        <div class="label">Close Reason</div>
                        <div class="value">${c.close_reason}</div>
                      </div>`:""}
                <div class="prop">
                  <div class="label">Priority</div>
                  <div class="value">${ke}</div>
                </div>
                <div class="prop assignee">
                  <div class="label">Assignee</div>
                  <div class="value">
                    ${w?y`<input
                              type="text"
                              aria-label="Edit assignee"
                              .value=${c.assignee||""}
                              size=${Math.min(40,Math.max(12,(c.assignee||"").length+3))}
                              @keydown=${W=>{W.key==="Escape"?(W.preventDefault(),T()):W.key==="Enter"&&(W.preventDefault(),ee())}}
                            />
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${ee}
                            >
                              Save
                            </button>
                            <button
                              class="btn"
                              style="margin-left:6px"
                              @click=${T}
                            >
                              Cancel
                            </button>`:y`${(()=>{let W=c.assignee||"",se=W.trim().length>0;return y`<span
                              class=${se?"editable":"editable muted"}
                              tabindex="0"
                              role="button"
                              aria-label="Edit assignee"
                              @click=${K}
                              @keydown=${xe}
                              >${se?W:"Unassigned"}</span
                            >`})()}`}
                  </div>
                </div>
              </div>
              ${f}
              ${V}
              ${Qe("Dependencies",c.dependencies||[])}
              ${Qe("Dependents",c.dependents||[])}
            </div>
          </div>
        </div>
      </div>
    `}function N(){if(!o){we(l?"Loading\u2026":"No issue selected");return}me(Te(o),t)}function jr(c,$){return async V=>{if(V.stopPropagation(),!(!o||a)){a=!0;try{if($==="Dependencies"){let L=await e("dep-remove",{a:o.id,b:c,view_id:o.id});L&&typeof L=="object"&&(o=L,N())}else{let L=await e("dep-remove",{a:c,b:o.id,view_id:o.id});L&&typeof L=="object"&&(o=L,N())}}catch(L){i("dep-remove failed %o",L)}finally{a=!1}}}}function fr(c,$){return async V=>{if(!o||a)return;let L=V.currentTarget,te=L.previousElementSibling,ke=te?te.value.trim():"";if(!ke||ke===o.id){ie("Enter a different issue id");return}if(new Set((c||[]).map(Ee=>Ee.id)).has(ke)){ie("Link already exists");return}a=!0,L&&(L.disabled=!0),te&&(te.disabled=!0);try{if($==="Dependencies"){let Ee=await e("dep-add",{a:o.id,b:ke,view_id:o.id});Ee&&typeof Ee=="object"&&(o=Ee,N())}else{let Ee=await e("dep-add",{a:ke,b:o.id,view_id:o.id});Ee&&typeof Ee=="object"&&(o=Ee,N())}}catch(Ee){i("dep-add failed %o",Ee),ie("Failed to add dependency","error")}finally{a=!1}}}function Ht(c){c.key==="Escape"?(d=!1,N()):c.key==="Enter"&&(c.preventDefault(),X())}function hr(c){c.key==="Enter"&&be()}function gr(c){c.key==="Enter"&&He()}function Wr(c){c.key==="Enter"&&De()}function st(c){c.key==="Enter"&&Re()}return{async load(c){if(!c){we("No issue selected");return}if(l=String(c),o=null,S(),o||we("Loading\u2026"),a=!1,B="",D=!1,N(),o&&!o.comments)try{let $=await e("get-comments",{id:l});Array.isArray($)&&o&&l===c&&(o.comments=$,N())}catch($){i("fetch comments failed %s %o",c,$)}},clear(){we("Select an issue to view details")},destroy(){G(),t.replaceChildren(),P&&P.parentNode&&(P.parentNode.removeChild(P),P=null)}}}function Ur(t){let e=t.navigate,r=t.onUpdate,s=t.requestRender,n=t.getSelectedId||(()=>null),i=t.getVisibleLabelPrefixes||(()=>["has:","reviewed:"]),o=t.getVisibleLabelExact||(()=>[]),l=t.getLabelColorPolicy||(()=>({prefix:{},exact:{}})),a=t.row_class||"issue-row",d=t.show_deps??!0,u=new Set;function h(g,k,C,H=""){let v=`${g}:${k}`;return u.has(v)?y`<span>
        <input
          type="text"
          .value=${C}
          class="inline-edit"
          @keydown=${async I=>{if(I.key==="Escape")u.delete(v),s();else if(I.key==="Enter"){let D=I.currentTarget.value||"";D!==C&&await r(g,{[k]:D}),u.delete(v),s()}}}
          @blur=${async I=>{let D=I.currentTarget.value||"";D!==C&&await r(g,{[k]:D}),u.delete(v),s()}}
          autofocus
        />
      </span>`:y`<span
      class="editable text-truncate ${C?"":"muted"}"
      tabindex="0"
      role="button"
      @click=${I=>{I.stopPropagation(),I.preventDefault(),u.add(v),s()}}
      @keydown=${I=>{I.key==="Enter"&&(I.preventDefault(),I.stopPropagation(),u.add(v),s())}}
      >${C||H}</span
    >`}function b(g,k){return async C=>{let v=C.currentTarget.value||"",x={};x[k]=k==="priority"?Number(v):v,await r(g,x)}}function _(g){return k=>{let C=k.target;C&&(C.tagName==="INPUT"||C.tagName==="SELECT")||e(g)}}function w(g){let k=String(g.status||"open"),C=String(g.priority??2),H=n()===g.id;return y`<tr
      role="row"
      class="${a} ${H?"selected":""}"
      data-issue-id=${g.id}
      @click=${_(g.id)}
    >
      <td role="gridcell" class="mono">${kt(g.id)}</td>
      <td role="gridcell">${It(g.issue_type)}</td>
      <td role="gridcell">${h(g.id,"title",g.title||"")}</td>
      <td role="gridcell">
        ${vr(g.labels,i(),o()).map(v=>xr(v,l()))}
      </td>
      <td role="gridcell">
        <select
          class="badge-select badge--status is-${k}"
          .value=${k}
          @change=${b(g.id,"status")}
        >
          ${Br.map(v=>y`<option value=${v} ?selected=${k===v}>
                ${it(v)}
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
          ${vt.map((v,x)=>y`<option
                value=${String(x)}
                ?selected=${C===String(x)}
              >
                ${Yt(x)} ${v}
              </option>`)}
        </select>
      </td>
      <td
        role="gridcell"
        class="date-cell"
        title=${Sr(g.created_at)}
      >
        ${g.created_at?Ar(g.created_at):""}
      </td>
      ${d?y`<td role="gridcell" class="deps-col">
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
    </tr>`}return w}function Zn(t,e,r,s=void 0,n=void 0,i=void 0){let o=[],l=new Set,a=new Set,d=new Map,u=n?mt(n):null;u&&u.subscribe(()=>{let v=o.length===0;if(o=H(),_(),v&&o.length>0){let x=String(o[0].epic?.id||"");x&&!l.has(x)&&C(x)}});function h(){let v=i?.getState?.().config?.label_display_policy,x=v?.colors;return{visible_prefixes:Array.isArray(v?.visible_prefixes)?v.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(v?.visible_exact)?v.visible_exact:[],colors:x&&typeof x=="object"?x:{prefix:{},exact:{}}}}let b=Ur({navigate:v=>r(v),onUpdate:k,requestRender:_,getSelectedId:()=>null,getVisibleLabelPrefixes:()=>h().visible_prefixes,getVisibleLabelExact:()=>h().visible_exact,getLabelColorPolicy:()=>h().colors,row_class:"epic-row",show_deps:!1});if(i?.subscribe){let v=JSON.stringify(h());i.subscribe(()=>{let x=JSON.stringify(h());x!==v&&(v=x,_())})}function _(){me(w(),t)}function w(){return o.length?y`${o.map(v=>g(v))}`:y`<div class="panel__header muted">No epics found.</div>`}function g(v){let x=v.epic||{},I=String(x.id||""),B=l.has(I),D=u?u.selectEpicChildren(I):[],P=a.has(I);return y`
      <div class="epic-group" data-epic-id=${I}>
        <div
          class="epic-header"
          @click=${()=>C(I)}
          role="button"
          tabindex="0"
          aria-expanded=${B}
        >
          ${kt(I,{class_name:"mono"})}
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
        ${B?y`<div class="epic-children">
              ${P?y`<div class="muted">Loading…</div>`:D.length===0?y`<div class="muted">No issues found</div>`:y`<table class="table">
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
                        ${D.map(G=>b(G))}
                      </tbody>
                    </table>`}
            </div>`:null}
      </div>
    `}async function k(v,x){try{await e.updateIssue({id:v,...x}),_()}catch{}}async function C(v){if(l.has(v)){if(l.delete(v),d.has(v)){try{let x=d.get(v);x&&await x()}catch{}d.delete(v);try{n&&n.unregister&&n.unregister(`detail:${v}`)}catch{}}}else{if(l.add(v),a.add(v),_(),s&&typeof s.subscribeList=="function")try{try{n&&n.register&&n.register(`detail:${v}`,{type:"issue-detail",params:{id:v}})}catch{}let x=await s.subscribeList(`detail:${v}`,{type:"issue-detail",params:{id:v}});d.set(v,x)}catch{}a.delete(v)}_()}function H(){let v=n&&n.snapshotFor?n.snapshotFor("tab:epics")||[]:[],x=[];for(let I of v){let B=Array.isArray(I.dependents)?I.dependents:[],D=Number.isFinite(I.total_children),P=Number.isFinite(I.closed_children),G=D?Number(I.total_children)||0:B.length,ve=P&&Number(I.closed_children)||0;if(!P)for(let ae of B)String(ae.status||"")==="closed"&&ve++;x.push({epic:I,total_children:G,closed_children:ve})}return x}return{async load(){o=H(),_();try{if(o.length>0){let v=String(o[0].epic?.id||"");v&&!l.has(v)&&await C(v)}}catch{}}}}function Xn(t){let e=document.createElement("dialog");e.id="fatal-error-dialog",e.setAttribute("role","alertdialog"),e.setAttribute("aria-modal","true"),e.innerHTML=`
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
    </div>`,t.appendChild(e);let r=e.querySelector("#fatal-error-title"),s=e.querySelector("#fatal-error-message"),n=e.querySelector("#fatal-error-detail"),i=e.querySelector("#fatal-error-reload"),o=e.querySelector("#fatal-error-close"),l=()=>{if(typeof e.close=="function")try{e.close()}catch{}e.removeAttribute("open")},a=(d,u,h="")=>{r&&(r.textContent=d||"Unexpected Error"),s&&(s.textContent=u||"An unrecoverable error occurred.");let b=typeof h=="string"?h.trim():"";if(n&&(b.length>0?(n.textContent=b,n.removeAttribute("hidden")):(n.textContent="No additional diagnostics available.",n.setAttribute("hidden",""))),typeof e.showModal=="function")try{e.showModal(),e.setAttribute("open","")}catch{e.setAttribute("open","")}else e.setAttribute("open","")};return i&&i.addEventListener("click",()=>{window.location.reload()}),o&&o.addEventListener("click",()=>l()),e.addEventListener("cancel",d=>{d.preventDefault(),l()}),{open:a,close:l,getElement(){return e}}}function Qn(t,e,r){let s=document.createElement("dialog");s.id="issue-dialog",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.innerHTML=`
    <div class="issue-dialog__container" part="container">
      <header class="issue-dialog__header">
        <div class="issue-dialog__title">
          <span class="mono" id="issue-dialog-title"></span>
        </div>
        <button type="button" class="issue-dialog__close" aria-label="Close">\xD7</button>
      </header>
      <div class="issue-dialog__body" id="issue-dialog-body"></div>
    </div>
  `,t.appendChild(s);let n=s.querySelector("#issue-dialog-body"),i=s.querySelector("#issue-dialog-title"),o=s.querySelector(".issue-dialog__close");function l(_){i.replaceChildren(),i.appendChild(kt(_))}s.addEventListener("mousedown",_=>{_.target===s&&(_.preventDefault(),d())}),s.addEventListener("cancel",_=>{_.preventDefault(),d()}),o.addEventListener("click",()=>d());let a=null;function d(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}try{r()}catch{}b()}function u(_){try{let w=document.activeElement;w&&w instanceof HTMLElement?a=w:a=null}catch{a=null}l(_);try{"showModal"in s&&typeof s.showModal=="function"?s.showModal():s.setAttribute("open",""),setTimeout(()=>{try{o.focus()}catch{}},0)}catch{s.setAttribute("open","")}}function h(){try{typeof s.close=="function"?s.close():s.removeAttribute("open")}catch{s.removeAttribute("open")}b()}function b(){try{a&&document.contains(a)&&a.focus()}catch{}finally{a=null}}return{open:u,close:h,getMount(){return n}}}var zr=["bug","feature","task","epic","chore"];function ur(t){switch((t||"").toString().toLowerCase()){case"bug":return"Bug";case"feature":return"Feature";case"task":return"Task";case"epic":return"Epic";case"chore":return"Chore";default:return""}}function eo(t,e,r,s,n=void 0,i=void 0){let o=he("views:list"),l=[],a="",d=[],u=[],h=s?s.getState().selected_id:null,b=null,_=!1,w=!1;function g(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""&&S!=="all"?[S]:[]}function k(S){return Array.isArray(S)?S:typeof S=="string"&&S!==""?[S]:[]}function C(){let S=s?.getState?.().config?.label_display_policy,R=S?.colors;return{visible_prefixes:Array.isArray(S?.visible_prefixes)?S.visible_prefixes:["has:","reviewed:"],visible_exact:Array.isArray(S?.visible_exact)?S.visible_exact:[],colors:R&&typeof R=="object"?R:{prefix:{},exact:{}}}}let H=Ur({navigate:S=>{let R=r||(X=>window.location.hash=X),M=s?s.getState().view:"issues";R(wt(M,S))},onUpdate:Pe,requestRender:ue,getSelectedId:()=>h,getVisibleLabelPrefixes:()=>C().visible_prefixes,getVisibleLabelExact:()=>C().visible_exact,getLabelColorPolicy:()=>C().colors,row_class:"issue-row"}),v=async S=>{l.includes(S)?l=l.filter(R=>R!==S):l=[...l,S],o("status toggle %s -> %o",S,l),s&&s.setState({filters:{status:l}}),await $e()},x=S=>{a=S.currentTarget.value,o("search input %s",a),s&&s.setState({filters:{search:a}}),ue()},I=S=>{u.includes(S)?u=u.filter(R=>R!==S):u=[...u,S],o("type toggle %s -> %o",S,u),s&&s.setState({filters:{type:u}}),ue()},B=S=>{S.stopPropagation(),_=!_,w=!1,ue()},D=S=>{S.stopPropagation(),w=!w,_=!1,ue()};function P(S,R,M){return S.length===0?`${R}: Any`:S.length===1?`${R}: ${M(S[0])}`:`${R} (${S.length})`}if(s){let S=s.getState();S&&S.filters&&typeof S.filters=="object"&&(l=g(S.filters.status),a=S.filters.search||"",u=k(S.filters.type))}let G=i?mt(i):null;function ve(){if(!G)return[];let S=G.selectIssuesFor("tab:issues"),R=l.includes("resolved")&&!l.includes("ready")&&!(l.length===1&&l[0]==="resolved"),M=l.includes("deferred")&&!(l.length===1&&l[0]==="deferred");if(!R&&!M)return S;let X=new Map;for(let J of S)X.set(String(J.id),J);if(R){let J=G.selectIssuesFor("tab:issues:resolved");for(let K of J)X.set(String(K.id),K)}if(M){let J=G.selectIssuesFor("tab:issues:deferred");for(let K of J)X.set(String(K.id),K)}return Array.from(X.values())}function ae(){let S=d;if(l.length>0&&!l.includes("ready")&&(S=S.filter(R=>l.includes(String(R.status||"")))),a){let R=a.toLowerCase();S=S.filter(M=>{let X=String(M.id).toLowerCase(),J=String(M.title||"").toLowerCase();return X.includes(R)||J.includes(R)})}return u.length>0&&(S=S.filter(R=>u.includes(String(R.issue_type||"")))),l.length===1&&l[0]==="closed"&&(S=S.slice().sort(Ot)),y`
      <div class="panel__header">
        <div class="filter-dropdown ${_?"is-open":""}">
          <button
            class="filter-dropdown__trigger"
            @click=${B}
          >
            ${P(l,"Status",it)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${["ready","open","in_progress","deferred","resolved","closed"].map(R=>y`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${l.includes(R)}
                    @change=${()=>v(R)}
                  />
                  ${R==="ready"?"Ready":it(R)}
                </label>
              `)}
          </div>
        </div>
        <div class="filter-dropdown ${w?"is-open":""}">
          <button class="filter-dropdown__trigger" @click=${D}>
            ${P(u,"Types",ur)}
            <span class="filter-dropdown__arrow">▾</span>
          </button>
          <div class="filter-dropdown__menu">
            ${zr.map(R=>y`
                <label class="filter-dropdown__option">
                  <input
                    type="checkbox"
                    .checked=${u.includes(R)}
                    @change=${()=>I(R)}
                  />
                  ${ur(R)}
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
                  ${S.map(R=>H(R))}
                </tbody>
              </table>
            </div>`}
      </div>
    `}function ue(){me(ae(),t)}ue();async function Pe(S,R){try{o("updateInline %s %o",S,Object.keys(R)),typeof R.title=="string"&&await e("edit-text",{id:S,field:"title",value:R.title}),typeof R.assignee=="string"&&await e("update-assignee",{id:S,assignee:R.assignee}),typeof R.status=="string"&&await e("update-status",{id:S,status:R.status}),typeof R.priority=="number"&&await e("update-priority",{id:S,priority:R.priority})}catch{}}async function $e(){o("load");let S=t.querySelector("#list-root"),R=S?S.scrollTop:0;try{G?d=ve():d=[]}catch(M){o("load failed: %o",M),d=[]}ue();try{let M=t.querySelector("#list-root");M&&R>0&&(M.scrollTop=R)}catch{}}t.tabIndex=0,t.addEventListener("keydown",S=>{if(S.key==="ArrowDown"||S.key==="ArrowUp"){let J=S.target;if((J&&typeof J.closest=="function"?J.closest("#list-root table.table"):null)&&!!!(J&&typeof J.closest=="function"&&(J.closest("input")||J.closest("textarea")||J.closest("select")))){let ee=J&&typeof J.closest=="function"?J.closest("td"):null;if(ee&&ee.parentElement){let T=ee.parentElement,A=T.parentElement;if(A&&A.querySelectorAll){let F=Array.from(A.querySelectorAll("tr")),z=Math.max(0,F.indexOf(T)),q=ee.cellIndex||0,ne=S.key==="ArrowDown"?Math.min(z+1,F.length-1):Math.max(z-1,0),ge=F[ne],be=ge&&ge.cells?ge.cells[q]:null;if(be){let re=be.querySelector('button:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href], select:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled])');if(re&&typeof re.focus=="function"){S.preventDefault(),re.focus();return}}}}}}let R=t.querySelector("#list-root tbody"),M=R?R.querySelectorAll("tr"):[];if(M.length===0)return;let X=0;if(h&&(X=Array.from(M).findIndex(K=>(K.getAttribute("data-issue-id")||"")===h),X<0&&(X=0)),S.key==="ArrowDown"){S.preventDefault();let J=M[Math.min(X+1,M.length-1)],K=J?J.getAttribute("data-issue-id"):"",xe=K||null;s&&xe&&s.setState({selected_id:xe}),h=xe,ue()}else if(S.key==="ArrowUp"){S.preventDefault();let J=M[Math.max(X-1,0)],K=J?J.getAttribute("data-issue-id"):"",xe=K||null;s&&xe&&s.setState({selected_id:xe}),h=xe,ue()}else if(S.key==="Enter"){S.preventDefault();let J=M[X],K=J?J.getAttribute("data-issue-id"):"";if(K){let xe=r||(T=>window.location.hash=T),ee=s?s.getState().view:"issues";xe(wt(ee,K))}}});let we=S=>{let R=S.target;R&&!R.closest(".filter-dropdown")&&(_||w)&&(_=!1,w=!1,ue())};if(document.addEventListener("click",we),s){let S=JSON.stringify(C());b=s.subscribe(R=>{if(R.selected_id!==h&&(h=R.selected_id,o("selected %s",h||"(none)"),ue()),R.filters&&typeof R.filters=="object"){let M=g(R.filters.status),X=R.filters.search||"",J=!1;if(JSON.stringify(M)!==JSON.stringify(l)){l=M,$e();return}X!==a&&(a=X,J=!0);let xe=k(R.filters.type);JSON.stringify(xe)!==JSON.stringify(u)&&(u=xe,J=!0);let T=JSON.stringify(C());T!==S&&(S=T,J=!0),J&&ue()}})}return G&&G.subscribe(()=>{try{d=ve(),ue()}catch{}}),{load:$e,destroy(){t.replaceChildren(),document.removeEventListener("click",we),b&&(b(),b=null)}}}function to(t,e,r){let s=he("views:nav"),n=null;function i(a){return d=>{d.preventDefault(),s("click tab %s",a),r.gotoView(a)}}function o(){let d=e.getState().view||"issues";return y`
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
  `,t.appendChild(n);let i=n.querySelector("#new-issue-form"),o=n.querySelector("#new-title"),l=n.querySelector("#new-type"),a=n.querySelector("#new-priority"),d=n.querySelector("#new-labels"),u=n.querySelector("#new-description"),h=n.querySelector("#new-issue-error"),b=n.querySelector("#btn-cancel"),_=n.querySelector("#btn-create"),w=n.querySelector(".new-issue__close");function g(){l.replaceChildren();let P=document.createElement("option");P.value="",P.textContent="\u2014 Select \u2014",l.appendChild(P);for(let G of zr){let ve=document.createElement("option");ve.value=G,ve.textContent=ur(G),l.appendChild(ve)}a.replaceChildren();for(let G=0;G<=4;G+=1){let ve=document.createElement("option");ve.value=String(G);let ae=vt[G]||"Medium";ve.textContent=`${G} \u2013 ${ae}`,a.appendChild(ve)}}g();function k(){try{typeof n.close=="function"?n.close():n.removeAttribute("open")}catch{n.removeAttribute("open")}}function C(P){o.disabled=P,l.disabled=P,a.disabled=P,d.disabled=P,u.disabled=P,b.disabled=P,_.disabled=P,_.textContent=P?"Creating\u2026":"Create"}function H(){h.textContent=""}function v(P){h.textContent=P}function x(){try{let P=window.localStorage.getItem("beads-ui.new.type");P?l.value=P:l.value="";let G=window.localStorage.getItem("beads-ui.new.priority");G&&/^\d$/.test(G)?a.value=G:a.value="2"}catch{l.value="",a.value="2"}}function I(){let P=l.value||"",G=a.value||"";P.length>0&&window.localStorage.setItem("beads-ui.new.type",P),G.length>0&&window.localStorage.setItem("beads-ui.new.priority",G)}function B(P){let G=/-(\d+)$/.exec(String(P||""));return G&&G[1]?Number(G[1]):-1}async function D(){H();let P=String(o.value||"").trim();if(P.length===0){v("Title is required"),o.focus();return}let G=Number(a.value||"2");if(!(G>=0&&G<=4)){v("Priority must be 0..4"),a.focus();return}let ve=String(l.value||""),ae=String(u.value||""),ue=String(d.value||"").split(",").map(S=>S.trim()).filter(S=>S.length>0),Pe={title:P};ve.length>0&&(Pe.type=ve),String(G).length>0&&(Pe.priority=G),ae.length>0&&(Pe.description=ae),C(!0);try{await e("create-issue",Pe)}catch{C(!1),v("Failed to create issue");return}I();let $e=null;try{$e=await e("list-issues",{filters:{status:"open",limit:50}})}catch{$e=null}let we="";if(Array.isArray($e)){let S=$e.filter(R=>String(R.title||"")===P);if(S.length>0){let R=S[0];for(let M of S){let X=B(R.id||"");B(M.id||"")>X&&(R=M)}we=String(R.id||"")}}if(we&&ue.length>0)for(let S of ue)try{await e("label-add",{id:we,label:S})}catch{}if(we){try{r.gotoIssue(we)}catch{}try{s&&s.setState({selected_id:we})}catch{}}C(!1),k()}return n.addEventListener("cancel",P=>{P.preventDefault(),k()}),w.addEventListener("click",()=>k()),b.addEventListener("click",()=>k()),n.addEventListener("keydown",P=>{P.key==="Enter"&&(P.ctrlKey||P.metaKey)&&(P.preventDefault(),D())}),i.addEventListener("submit",P=>{P.preventDefault(),D()}),{open(){i.reset(),H(),x();try{"showModal"in n&&typeof n.showModal=="function"?n.showModal():n.setAttribute("open","")}catch{n.setAttribute("open","")}setTimeout(()=>{try{o.focus()}catch{}},0)},close(){k()}}}var so={open:0,in_progress:.5,resolved:.85,closed:1},ao=new Set(["queued","starting","running","cancelling"]),no={in_progress:0,open:1,resolved:2,closed:3};function oo(t){if(typeof t=="number")return Number.isFinite(t)?t:0;if(typeof t=="string"){let e=Date.parse(t);return Number.isFinite(e)?e:0}return 0}function va(t){return t&&t in so?so[t]:0}function io(t){return t&&t in no?no[t]:Number.MAX_SAFE_INTEGER}function Ds(t){return typeof t.spec_id=="string"&&t.spec_id.trim().length>0}function xa(t){return(!t.parent||t.parent.length===0)&&(t.issue_type==="feature"||t.issue_type==="epic")}function Sa(t){return typeof t.parent_id=="string"&&t.parent_id.length>0?t.parent_id:typeof t.parentId=="string"&&t.parentId.length>0?t.parentId:typeof t.issue_id=="string"&&t.issue_id.length>0?t.issue_id:typeof t.issueId=="string"?t.issueId:""}function lo(t,e){return e.filter(r=>Sa(r)===t)}function Aa(t,e){return lo(t,e).some(r=>typeof r.status=="string"&&ao.has(r.status))}function Hr(t){if(!t||t<=0)return"0s";let e=Math.floor(t/1e3),r=Math.floor(e/60),s=e%60;return r>0?`${r}m ${s}s`:`${s}s`}function $a(t){if(!Array.isArray(t)||t.length===0)return 0;let e=t.reduce((r,s)=>r+va(s),0);return Math.round(e/t.length*100)}function Ta(t,e){let r=e.is_parent??!1,s=e.has_spec_id!==void 0?e.has_spec_id:Ds(t),n=e.has_active_job??!1,i=e.workspace_is_valid??!1;return r&&s&&!n&&i&&String(t.status||"")!=="closed"}function Ea(t,e,r={}){let s=Array.isArray(r.show_closed_children)?r.show_closed_children:[],n=s.includes(t.id)||s.includes("*")?e.slice():e.filter(g=>g.status!=="closed"),i=e.filter(g=>g.status==="closed").length,o=e.map(g=>String(g.status||"open")),l=Array.isArray(r.jobs)?r.jobs:[],a=lo(t.id,l),d=a.find(g=>typeof g.status=="string"&&ao.has(g.status))||null,u=d?a.filter(g=>g.id!==d.id).slice(0,3):a.slice(0,3),h=d!==null,b=Array.isArray(r.open_pr_ids_by_parent?.[t.id])?r.open_pr_ids_by_parent[t.id].length:Number(t.open_pr_count||0),_={open:e.filter(g=>g.status==="open").length,in_progress:e.filter(g=>g.status==="in_progress").length,resolved:e.filter(g=>g.status==="resolved").length,closed:e.filter(g=>g.status==="closed").length},w=Ta(t,{is_parent:!0,has_spec_id:Ds(t),has_active_job:h,workspace_is_valid:r.workspace_is_valid??!1});return{...t,children:e.slice(),visible_children:n,hidden_closed_count:i,child_counts:_,progress_percent:$a(o),current_job:d,current_job_elapsed_label:Hr(d?.elapsedMs),recent_jobs:u,has_active_job:h,has_open_pr:b>0,open_pr_count:b,runnable:w}}function co(t,e={}){let r=new Map,s=new Map;for(let i of t)if(s.set(i.id,i),typeof i.parent=="string"&&i.parent.length>0){let o=r.get(i.parent)||[];o.push(i),r.set(i.parent,o)}let n=[];for(let i of t){let o=r.get(i.id)||[],l=Array.isArray(i.dependents)?i.dependents.filter(b=>!!b?.id):[],a=[];if(o.length>0)a.push(...o);else for(let b of l)s.has(b.id)||a.push({...b,parent:i.id});let d=Array.isArray(e.jobs)?e.jobs:[],u=Array.isArray(e.open_pr_ids_by_parent?.[i.id])?e.open_pr_ids_by_parent[i.id].length:Number(i.open_pr_count||0);(a.length>0||typeof i.total_children=="number"&&i.total_children>0||Aa(i.id,d)||u>0||xa(i)&&Ds(i))&&n.push(Ea(i,a,e))}return n.sort(Ca),n}function Ca(t,e){if(t.has_active_job!==e.has_active_job)return t.has_active_job?-1:1;if(t.runnable!==e.runnable)return t.runnable?-1:1;let r=io(t.status)-io(e.status);if(r!==0)return r;let s=(t.priority??2)-(e.priority??2);if(s!==0)return s;let n=oo(e.updated_at??e.created_at)-oo(t.updated_at??t.created_at);return n!==0?n:String(t.id).localeCompare(String(e.id))}function uo(t,e={}){let r=String(e.search||"").trim().toLowerCase(),s=String(e.status||"all");return t.filter(n=>!(s!=="all"&&String(n.status||"")!==s||e.runnable_only&&!n.runnable||e.has_open_pr_only&&!n.has_open_pr||r.length>0&&!`${String(n.id)} ${String(n.title||"")}`.toLowerCase().includes(r)))}function po(t,e){return t.length===0?y`<section class="worker-pr-panel">No open PRs</section>`:y`
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
  `}function ho(t,e={}){let r=e.fetch_impl||fetch,s="",n="",i="",o="",l=!1,a="";function d(){me(y`
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
                  <button type="button" data-worker-spec-edit @click=${u}>
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
      `,t)}function u(){l=!0,o=i,a="",d()}function h(){l=!1,o=i,a="",d()}async function b(){let _=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{let w=await r(_,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:o})}),g=await w.json();if(w.ok===!1)throw new Error(typeof g?.error=="string"&&g.error.length>0?g.error:"Failed to save spec");i=g.content||o,o=i,l=!1,a="",d()}catch(w){a=w instanceof Error&&w.message.length>0?w.message:"Failed to save spec",d()}}return{async load(_,w){s=_,n=w;let g=`/api/worker/spec/${encodeURIComponent(s)}?workspace=${encodeURIComponent(n)}`;try{i=(await(await r(g)).json()).content||""}catch{i=""}o=i,l=!1,a="",d()},clear(){s="",n="",i="",o="",l=!1,a="",me(y``,t)}}}function go(t,e={}){let r=e.fetch_impl||fetch,s=null,n="",i=[],o=[],l="";async function a(d=[],u=[]){let h=s,b=h?i.filter(g=>g.issueId===h.id):[],_=b.find(g=>["queued","starting","running","cancelling"].includes(String(g.status)))||null,w=_?b.filter(g=>g.id!==_.id):b;if(me(y`
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
                          <div>${Hr(_.elapsedMs)}</div>
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
                    ${w.map(g=>y`
                        <li>
                          <span>${g.status}</span>
                          <span>${Hr(g.elapsedMs)}</span>
                          ${g.errorSummary?y`<span>${g.errorSummary}</span>`:null}
                          ${g.wasForceKilled?y`<span>Force killed</span>`:null}
                        </li>
                      `)}
                  </ul>
                </section>
              `:null}

          <section id="worker-detail-spec-host"></section>
          ${po(d,{onRunPrReview:g=>e.onRunPrReview?.({issueId:h?.id||"",prNumber:g.number})})}
          ${fo(u)}
        </section>
      `,t),s){let g=s,k=t.querySelector("#worker-detail-spec-host");k&&await ho(k,{fetch_impl:r}).load(g.id,n)}}return{async load(d,u,h=[]){if(s=d,n=u,i=h,o=[],l="",!d||!u){await a([],[]);return}let b={items:[]},_={items:[]};try{b=await(await r(`/api/worker/prs/${encodeURIComponent(d.id)}?workspace=${encodeURIComponent(u)}`)).json()}catch{b={items:[]}}try{_=await(await r(`/api/worker/prs?workspace=${encodeURIComponent(u)}`)).json()}catch{_={items:[]}}let w=i.find(g=>g.issueId===d.id&&["queued","starting","running","cancelling"].includes(String(g.status)));if(w?.id)try{let g=await r(`/api/worker/jobs/${encodeURIComponent(w.id)}/log?workspace=${encodeURIComponent(u)}&tail=20`);if(!g.ok)throw new Error("log not ok");let k=await g.json();o=Array.isArray(k.tail)?k.tail:[]}catch{o=[],l="Failed to load log preview."}await a(Array.isArray(b.items)?b.items:[],Array.isArray(_.items)?_.items:[])},clear(){s=null,n="",i=[],o=[],l="",me(y``,t)}}}function bo(t,e){return y`
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
        >${it(t.status)}</span
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
          >${it(t.status)}</span
        >
        ${t.spec_id?y`<span class="worker-badge worker-badge--spec">✓ Spec</span>`:y`<span class="worker-badge worker-badge--muted">No spec</span>`}
        ${t.has_open_pr?y`<span class="worker-badge worker-badge--pr">PR open</span>`:null}
        ${r?y`
              <span class="worker-badge worker-badge--active"
                >● ${it(r.status||"running")}</span
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
  `}function wo(t,e){let r=new Set,s=null,n={search:"",status:"all",runnable_only:!1,has_open_pr_only:!1};function i(d){let u=e.store.getState(),h=Array.isArray(u.worker?.show_closed_children)?u.worker.show_closed_children:[],b=h.includes(d)?h.filter(_=>_!==d):[...h,d];e.store.setState({worker:{show_closed_children:b}})}function o(){let d=e.store.getState(),u=!!d.workspace?.current,h=typeof e.getWorkerJobs=="function"?e.getWorkerJobs():[],b=d.worker?.selected_parent_id||null,_=uo(co(e.issue_stores.snapshotFor("tab:worker:all"),{jobs:h,workspace_is_valid:u,show_closed_children:d.worker?.show_closed_children||[]}),n),w=b&&_.find(k=>k.id===b)||null;me(y`
        <section
          class="worker-layout ${w?"worker-layout--with-detail":"worker-layout--overview"}"
        >
          <aside class="worker-layout__left">
            ${bo(n,{onSearchInput(k){n={...n,search:k},o()},onStatusChange(k){n={...n,status:k},o()},onRunnableToggle(k){n={...n,runnable_only:k},o()},onOpenPrToggle(k){n={...n,has_open_pr_only:k},o()}})}
            ${mo(_,{expanded_ids:r,selected_parent_id:b,onSelectParent(k){let C=b===k?null:k;e.store.setState({worker:{selected_parent_id:C}})},onToggleExpand(k){r.has(k)?r.delete(k):r.add(k),o()},onToggleClosed(k){i(k),o()},onRunRalph(k){e.onRunRalph?.(k)},onRunPrReview(k){e.onRunPrReview?.(k)},onCancelJob(k){e.onCancelJob?.(k)}})}
          </aside>

          ${w?y`<section
                class="worker-layout__right"
                id="worker-detail-mount"
              ></section>`:null}
        </section>
      `,t);let g=t.querySelector("#worker-detail-mount");g?(s||(s=go(g,{fetch_impl:e.fetch_impl,onRunRalph:e.onRunRalph,onRunPrReview:e.onRunPrReview,onCancelJob:e.onCancelJob})),s.load(w,d.workspace?.current?.path||"",h)):s?.clear()}let l=e.store.subscribe(()=>o()),a=typeof e.issue_stores.subscribe=="function"?e.issue_stores.subscribe(()=>o()):()=>{};return o(),{load(){o()},clear(){s?.clear(),me(y``,t)},destroy(){l(),a(),s?.clear(),me(y``,t)}}}function ko(t){if(!t)return"Unknown";let e=t.split("/").filter(Boolean);return e.length>0?e[e.length-1]:"Unknown"}function vo(t,e,r,s=async()=>{}){let n=he("views:workspace-picker"),i=null,o=!1,l=!1;async function a(_){let g=_.target.value,C=e.getState().workspace?.current?.path||"";if(g&&g!==C){n("switching workspace to %s",g),o=!0,b();try{await r(g)}catch(H){n("workspace switch failed: %o",H)}finally{o=!1,b()}}}async function d(){let _=e.getState(),w=_.workspace?.current?.path||_.workspace?.available?.[0]?.path||"";if(!(!w||l)){n("syncing workspace %s",w),l=!0,b();try{await s(w)}catch(g){n("workspace sync failed: %o",g)}finally{l=!1,b()}}}function u(_){return _?y`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${d}
        ?disabled=${o||l}
        aria-label="Sync current workspace"
      >
        ${l?"Syncing\u2026":"Sync"}
      </button>
    `:y``}function h(){let _=e.getState(),w=_.workspace?.current,g=_.workspace?.available||[],k=w?.path||g[0]?.path||"";if(g.length===0)return y``;if(g.length===1){let C=ko(g[0].path);return y`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${g[0].path}"
            >${C}</span
          >
          ${u(k)}
          ${l?y`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`:""}
        </div>
      `}return y`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${a}
          ?disabled=${o||l}
          aria-label="Select project workspace"
        >
          ${g.map(C=>y`
              <option
                value="${C.path}"
                ?selected=${C.path===k}
                title="${C.path}"
              >
                ${ko(C.path)}
              </option>
            `)}
        </select>
        ${u(k)}
        ${o||l?y`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`:""}
      </div>
    `}function b(){me(h(),t)}return b(),i=e.subscribe(()=>b()),{destroy(){i&&(i(),i=null),me(y``,t)}}}var xo=["list-issues","update-status","edit-text","update-priority","create-issue","list-ready","dep-add","dep-remove","epic-status","update-assignee","update-workflow-settings","label-add","label-remove","subscribe-list","unsubscribe-list","snapshot","upsert","delete","get-comments","add-comment","delete-issue","list-workspaces","set-workspace","get-workspace","workspace-changed","sync-workspace"];function Ns(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`${t}-${e}`}function So(t,e,r=Ns()){return{id:r,type:t,payload:e}}function Ao(t={}){let e=he("ws"),r={initialMs:t.backoff?.initialMs??1e3,maxMs:t.backoff?.maxMs??3e4,factor:t.backoff?.factor??2,jitterRatio:t.backoff?.jitterRatio??.2},s=()=>t.url&&t.url.length>0?t.url:typeof location<"u"?(location.protocol==="https:"?"wss://":"ws://")+location.host+"/ws":"ws://localhost/ws",n=null,i="closed",o=0,l=null,a=!0,d=new Map,u=[],h=new Map,b=new Set;function _(x){for(let I of Array.from(b))try{I(x)}catch{}}function w(){if(!a||l)return;i="reconnecting",e("ws reconnecting\u2026"),_(i);let x=Math.min(r.maxMs||0,(r.initialMs||0)*Math.pow(r.factor||1,o)),I=(r.jitterRatio||0)*x,B=Math.max(0,Math.round(x+(Math.random()*2-1)*I));e("ws retry in %d ms (attempt %d)",B,o+1),l=setTimeout(()=>{l=null,v()},B)}function g(x){try{n?.send(JSON.stringify(x))}catch(I){e("ws send failed",I)}}function k(){for(i="open",e("ws open"),_(i),o=0;u.length;){let x=u.shift();x&&g(x)}}function C(x){let I;try{I=JSON.parse(String(x.data))}catch{e("ws received non-JSON message");return}if(!I||typeof I.id!="string"||typeof I.type!="string"){e("ws received invalid envelope");return}if(d.has(I.id)){let D=d.get(I.id);d.delete(I.id),I.ok?D?.resolve(I.payload):D?.reject(I.error||new Error("ws error"));return}let B=h.get(I.type);if(B&&B.size>0)for(let D of Array.from(B))try{D(I.payload)}catch(P){e("ws event handler error",P)}else e("ws received unhandled message type: %s",I.type)}function H(){i="closed",e("ws closed"),_(i);for(let[x,I]of d.entries())I.reject(new Error("ws disconnected")),d.delete(x);o+=1,w()}function v(){if(!a)return;let x=s();try{n=new WebSocket(x),e("ws connecting %s",x),i="connecting",_(i),n.addEventListener("open",k),n.addEventListener("message",C),n.addEventListener("error",()=>{}),n.addEventListener("close",H)}catch(I){e("ws connect failed %o",I),w()}}return v(),{send(x,I){if(!xo.includes(x))return Promise.reject(new Error(`unknown message type: ${x}`));let B=Ns(),D=So(x,I,B);return e("send %s id=%s",x,B),new Promise((P,G)=>{d.set(B,{resolve:P,reject:G,type:x}),n&&n.readyState===n.OPEN?g(D):(e("queue %s id=%s (state=%s)",x,B,i),u.push(D))})},on(x,I){h.has(x)||h.set(x,new Set);let B=h.get(x);return B?.add(I),()=>{B?.delete(I)}},onConnection(x){return b.add(x),()=>{b.delete(x)}},close(){a=!1,l&&(clearTimeout(l),l=null);try{n?.close()}catch{}},getState(){return i}}}var Da=/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,pr={label_display_policy:{visible_prefixes:["has:","reviewed:"],visible_exact:[],colors:{prefix:{},exact:{}}},workspace_config:{default_workspace:null},detail:{workflow_summary:{sections:["workflow_settings","artifacts","review_gates","freshness","delivery","followup","human"],workflow_settings:{fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"],editable_fields:["execution_lane","workspace_policy","branch_policy","finish_action","review_profile"]},artifacts:{fields:["spec_id","plan","handoff"]},review_gates:{fields:["status","verdict","final_source","external_attempts","reviewed_at_sha","content_hash"]},freshness:{fields:["execution_base_sha","spec_freshness_checked_at_sha","plan_freshness_checked_at_sha","spec_handoff_at_sha","spec_handoff_content_hash"]},delivery:{fields:["pr_url"]},followup:{fields:["followup_kind","source_repo","source_bead","source_artifact","source_pr","target_repo","target_paths","required_action"]},human:{fields:["human_decision_required"]}}}};function Ps(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}function $o(t){if(!Ps(t))return{};let e={};for(let[r,s]of Object.entries(t))r.length===0||!Ps(s)||typeof s.fg!="string"||!Da.test(s.fg)||(e[r]={fg:s.fg});return e}function Na(t){return Ps(t)?{prefix:$o(t.prefix),exact:$o(t.exact)}:{prefix:{},exact:{}}}function Pa(){let t=window.__BDUI_BOOTSTRAP__,e=t?.label_display_policy?.visible_prefixes,r=t?.label_display_policy?.visible_exact,s=Na(t?.label_display_policy?.colors),n=typeof t?.workspace_config?.default_workspace=="string"&&t.workspace_config.default_workspace.length>0?t.workspace_config.default_workspace:null;return Array.isArray(e)?{label_display_policy:{visible_prefixes:e.filter(i=>typeof i=="string"),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):pr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(pr.detail))}:{label_display_policy:{visible_prefixes:pr.label_display_policy.visible_prefixes.slice(),visible_exact:Array.isArray(r)?r.filter(i=>typeof i=="string"):pr.label_display_policy.visible_exact.slice(),colors:s},workspace_config:{default_workspace:n},detail:t?.detail&&typeof t.detail=="object"?JSON.parse(JSON.stringify(t.detail)):JSON.parse(JSON.stringify(pr.detail))}}async function Oa(t,e){try{let s=await(await fetch("/api/config")).json();t.setState({config:s})}catch(r){e("config refresh failed",r)}}function Ma(t){let e=he("main");e("bootstrap start");let r=y`
    <section id="issues-root" class="route issues">
      <aside id="list-panel" class="panel"></aside>
    </section>
    <section id="epics-root" class="route epics" hidden></section>
    <section id="board-root" class="route board" hidden></section>
    <section id="worker-root" class="route worker" hidden></section>
    <section id="detail-panel" class="route detail" hidden></section>
  `;me(r,t);let s=document.getElementById("top-nav"),n=document.getElementById("issues-root"),i=document.getElementById("epics-root"),o=document.getElementById("board-root"),l=document.getElementById("worker-root"),a=document.getElementById("list-panel"),d=document.getElementById("detail-panel");if(a&&n&&i&&o&&l&&d){let v=function(m,p){let O="Request failed",Y="";if(m&&typeof m=="object"){let ye=m;if(typeof ye.message=="string"&&ye.message.length>0&&(O=ye.message),typeof ye.details=="string")Y=ye.details;else if(ye.details&&typeof ye.details=="object")try{Y=JSON.stringify(ye.details,null,2)}catch{Y=""}}else typeof m=="string"&&m.length>0&&(O=m);let ce=p&&p.length>0?`Failed to load ${p}`:"Request failed";H.open(ce,O,Y)},ue=function(m){if(!m)return"Unknown";let p=m.split("/").filter(Boolean);return p.length>0?p[p.length-1]:"Unknown"},Re=function(){Se&&(clearInterval(Se),Se=null)},bt=function(m){let p=m?.status;return Array.isArray(p)?p.map(O=>String(O)).filter(Boolean):typeof p=="string"&&p!==""&&p!=="all"?[p]:[]},ft=function(m){let p=bt(m),[O]=p;return p.length===1&&O==="ready"?{type:"ready-issues"}:p.length===1&&O==="in_progress"?{type:"in-progress-issues"}:p.length===1&&O==="deferred"?{type:"deferred-issues"}:p.length===1&&O==="closed"?{type:"closed-issues"}:p.length===1&&O==="resolved"?{type:"resolved-issues"}:{type:"all-issues"}},We=function(m){if(m.view==="issues"){let p=ft(m.filters||{}),O=bt(m.filters||{}),Y=O.includes("resolved")&&!O.includes("ready")&&!(O.length===1&&O[0]==="resolved"),ce=O.includes("deferred")&&!(O.length===1&&O[0]==="deferred"),ye=JSON.stringify(p);try{D.register("tab:issues",p)}catch(pe){e("register issues store failed: %o",pe)}let Fe=`tab:issues:${ye}`;if((!Ie||ye!==at)&&!Z.has(Fe)&&(Z.add(Fe),B.subscribeList("tab:issues",p).then(pe=>{Ie=pe,at=ye}).catch(pe=>{e("subscribe issues failed: %o",pe),v(pe,"issues list")}).finally(()=>{Z.delete(Fe)})),Y&&!ze&&!Z.has("tab:issues:resolved")){try{D.register("tab:issues:resolved",{type:"resolved-issues"})}catch(pe){e("register issues:resolved store failed: %o",pe)}Z.add("tab:issues:resolved"),B.subscribeList("tab:issues:resolved",{type:"resolved-issues"}).then(pe=>ze=pe).catch(pe=>{e("subscribe issues resolved failed: %o",pe),v(pe,"issues list (Resolved)")}).finally(()=>{Z.delete("tab:issues:resolved")})}if(ce&&!He&&!Z.has("tab:issues:deferred")){try{D.register("tab:issues:deferred",{type:"deferred-issues"})}catch(pe){e("register issues:deferred store failed: %o",pe)}Z.add("tab:issues:deferred"),B.subscribeList("tab:issues:deferred",{type:"deferred-issues"}).then(pe=>He=pe).catch(pe=>{e("subscribe issues deferred failed: %o",pe),v(pe,"issues list (Deferred)")}).finally(()=>{Z.delete("tab:issues:deferred")})}if(!Y&&ze){ze().catch(()=>{}),ze=null;try{D.unregister("tab:issues:resolved")}catch(pe){e("unregister issues:resolved failed: %o",pe)}}if(!ce&&He){He().catch(()=>{}),He=null;try{D.unregister("tab:issues:deferred")}catch(pe){e("unregister issues:deferred failed: %o",pe)}}}else if(Ie){Ie().catch(()=>{}),Ie=null,at=null;try{D.unregister("tab:issues")}catch(p){e("unregister issues store failed: %o",p)}if(ze){ze().catch(()=>{}),ze=null;try{D.unregister("tab:issues:resolved")}catch(p){e("unregister issues:resolved failed: %o",p)}}if(He){He().catch(()=>{}),He=null;try{D.unregister("tab:issues:deferred")}catch(p){e("unregister issues:deferred failed: %o",p)}}}if(m.view==="worker"){try{D.register("tab:worker:all",{type:"all-issues"})}catch(p){e("register worker store failed: %o",p)}!Ze&&!Z.has("tab:worker:all")&&(Z.add("tab:worker:all"),B.subscribeList("tab:worker:all",{type:"all-issues"}).then(p=>{Ze=p}).catch(p=>{e("subscribe worker failed: %o",p),v(p,"worker")}).finally(()=>{Z.delete("tab:worker:all")}))}else if(Ze){Ze().catch(()=>{}),Ze=null;try{D.unregister("tab:worker:all")}catch(p){e("unregister worker store failed: %o",p)}}if(m.view==="epics"){try{D.register("tab:epics",{type:"epics"})}catch(p){e("register epics store failed: %o",p)}!le&&!Z.has("tab:epics")&&(Z.add("tab:epics"),B.subscribeList("tab:epics",{type:"epics"}).then(p=>{le=p}).catch(p=>{e("subscribe epics failed: %o",p),v(p,"epics")}).finally(()=>{Z.delete("tab:epics")}))}else if(le){le().catch(()=>{}),le=null;try{D.unregister("tab:epics")}catch(p){e("unregister epics store failed: %o",p)}}if(m.view==="board"){if(!qe&&!Z.has("tab:board:ready")){try{D.register("tab:board:ready",{type:"ready-issues"})}catch(p){e("register board:ready store failed: %o",p)}Z.add("tab:board:ready"),B.subscribeList("tab:board:ready",{type:"ready-issues"}).then(p=>qe=p).catch(p=>{e("subscribe board ready failed: %o",p),v(p,"board (Ready)")}).finally(()=>{Z.delete("tab:board:ready")})}if(!Oe&&!Z.has("tab:board:in-progress")){try{D.register("tab:board:in-progress",{type:"in-progress-issues"})}catch(p){e("register board:in-progress store failed: %o",p)}Z.add("tab:board:in-progress"),B.subscribeList("tab:board:in-progress",{type:"in-progress-issues"}).then(p=>Oe=p).catch(p=>{e("subscribe board in-progress failed: %o",p),v(p,"board (In Progress)")}).finally(()=>{Z.delete("tab:board:in-progress")})}if(!Me&&!Z.has("tab:board:deferred")){try{D.register("tab:board:deferred",{type:"deferred-issues"})}catch(p){e("register board:deferred store failed: %o",p)}Z.add("tab:board:deferred"),B.subscribeList("tab:board:deferred",{type:"deferred-issues"}).then(p=>Me=p).catch(p=>{e("subscribe board deferred failed: %o",p),v(p,"board (Deferred)")}).finally(()=>{Z.delete("tab:board:deferred")})}if(!Xe&&!Z.has("tab:board:resolved")){try{D.register("tab:board:resolved",{type:"resolved-issues"})}catch(p){e("register board:resolved store failed: %o",p)}Z.add("tab:board:resolved"),B.subscribeList("tab:board:resolved",{type:"resolved-issues"}).then(p=>Xe=p).catch(p=>{e("subscribe board resolved failed: %o",p),v(p,"board (Resolved)")}).finally(()=>{Z.delete("tab:board:resolved")})}if(!rt&&!Z.has("tab:board:closed")){try{D.register("tab:board:closed",{type:"closed-issues"})}catch(p){e("register board:closed store failed: %o",p)}Z.add("tab:board:closed"),B.subscribeList("tab:board:closed",{type:"closed-issues"}).then(p=>rt=p).catch(p=>{e("subscribe board closed failed: %o",p),v(p,"board (Closed)")}).finally(()=>{Z.delete("tab:board:closed")})}if(!Qe&&!Z.has("tab:board:blocked")){try{D.register("tab:board:blocked",{type:"blocked-issues"})}catch(p){e("register board:blocked store failed: %o",p)}Z.add("tab:board:blocked"),B.subscribeList("tab:board:blocked",{type:"blocked-issues"}).then(p=>Qe=p).catch(p=>{e("subscribe board blocked failed: %o",p),v(p,"board (Blocked)")}).finally(()=>{Z.delete("tab:board:blocked")})}}else{if(qe){qe().catch(()=>{}),qe=null;try{D.unregister("tab:board:ready")}catch(p){e("unregister board:ready failed: %o",p)}}if(Oe){Oe().catch(()=>{}),Oe=null;try{D.unregister("tab:board:in-progress")}catch(p){e("unregister board:in-progress failed: %o",p)}}if(Me){Me().catch(()=>{}),Me=null;try{D.unregister("tab:board:deferred")}catch(p){e("unregister board:deferred failed: %o",p)}}if(Xe){Xe().catch(()=>{}),Xe=null;try{D.unregister("tab:board:resolved")}catch(p){e("unregister board:resolved failed: %o",p)}}if(rt){rt().catch(()=>{}),rt=null;try{D.unregister("tab:board:closed")}catch(p){e("unregister board:closed failed: %o",p)}}if(Qe){Qe().catch(()=>{}),Qe=null;try{D.unregister("tab:board:blocked")}catch(p){e("unregister board:blocked failed: %o",p)}}}};var u=v,h=ue,b=Re,_=bt,w=ft,g=We;let k=document.getElementById("header-loading"),C=dn(k),H=Xn(t),x=Ao(),I=C.wrapSend((m,p)=>x.send(m,p)),B=rn(I),D=sn();x.on("snapshot",m=>{let p=m,O=p&&typeof p.id=="string"?p.id:"",Y=O?D.getStore(O):null;if(Y&&p&&p.type==="snapshot")try{Y.applyPush(p)}catch{}}),x.on("upsert",m=>{let p=m,O=p&&typeof p.id=="string"?p.id:"",Y=O?D.getStore(O):null;if(Y&&p&&p.type==="upsert")try{Y.applyPush(p)}catch{}}),x.on("delete",m=>{let p=m,O=p&&typeof p.id=="string"?p.id:"",Y=O?D.getStore(O):null;if(Y&&p&&p.type==="delete")try{Y.applyPush(p)}catch{}});let P=mt(D);async function G(){e("clearing all subscriptions for workspace switch"),Ie&&(Ie().catch(()=>{}),Ie=null),He&&(He().catch(()=>{}),He=null),le&&(le().catch(()=>{}),le=null),qe&&(qe().catch(()=>{}),qe=null),Oe&&(Oe().catch(()=>{}),Oe=null),Me&&(Me().catch(()=>{}),Me=null),ze&&(ze().catch(()=>{}),ze=null),Ze&&(Ze().catch(()=>{}),Ze=null),Xe&&(Xe().catch(()=>{}),Xe=null),rt&&(rt().catch(()=>{}),rt=null),Qe&&(Qe().catch(()=>{}),Qe=null);let m=["tab:issues","tab:issues:resolved","tab:issues:deferred","tab:worker:all","tab:epics","tab:board:ready","tab:board:in-progress","tab:board:deferred","tab:board:resolved","tab:board:closed","tab:board:blocked"];for(let O of m)try{D.unregister(O)}catch{}let p=M.getState();if(p.selected_id)try{D.unregister(`detail:${p.selected_id}`)}catch{}at=null,We(M.getState())}async function ve(m){e("requesting workspace switch to %s",m);try{let p=await x.send("set-workspace",{path:m});e("workspace switch result: %o",p),p&&p.workspace&&(M.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),window.localStorage.setItem("beads-ui.workspace",m),p.changed&&(await G(),ie("Switched to "+ue(m),"success",2e3)))}catch(p){throw e("workspace switch failed: %o",p),ie("Failed to switch workspace","error",3e3),p}}async function ae(m){e("requesting workspace sync for %s",m);try{let p=await x.send("sync-workspace",{});e("workspace sync result: %o",p),p?.workspace&&M.setState({workspace:{current:{path:p.workspace.root_dir,database:p.workspace.db_path}}}),ie("Synced "+ue(m),"success",2e3)}catch(p){throw e("workspace sync failed: %o",p),ie("Sync failed","error",3e3),p}}async function Pe(){try{let m=await x.send("list-workspaces",{});if(e("workspaces loaded: %o",m),m&&Array.isArray(m.workspaces)){let p=m.workspaces.map(ye=>({path:ye.path,database:ye.database,pid:ye.pid,version:ye.version})),O=m.current?{path:m.current.root_dir,database:m.current.db_path}:null;M.setState({workspace:{current:O,available:p}});let Y=M.getState().config.workspace_config.default_workspace,ce=window.localStorage.getItem("beads-ui.workspace");if(Y&&O?.path===Y){window.localStorage.setItem("beads-ui.workspace",Y);return}ce&&O&&ce!==O.path&&(p.some(Fe=>Fe.path===ce)?(e("restoring saved workspace preference: %s",ce),await ve(ce)):window.localStorage.removeItem("beads-ui.workspace"))}}catch(m){e("failed to load workspaces: %o",m)}}x.on("workspace-changed",m=>{e("workspace-changed event: %o",m),m&&m.root_dir&&(M.setState({workspace:{current:{path:m.root_dir,database:m.db_path}}}),Pe(),G())});let $e=!1;if(typeof x.onConnection=="function"){let m=p=>{e("ws state %s",p),p==="reconnecting"||p==="closed"?($e=!0,ie("Connection lost. Reconnecting\u2026","error",4e3)):p==="open"&&$e&&($e=!1,ie("Reconnected","success",2200),Oa(M,(O,Y)=>{e(`${O}: %o`,Y)}))};x.onConnection(m)}let we={status:"all",search:"",type:""};try{let m=window.localStorage.getItem("beads-ui.filters");if(m){let p=JSON.parse(m);if(p&&typeof p=="object"){let O=["bug","feature","task","epic","chore"],Y="";if(typeof p.type=="string"&&O.includes(p.type))Y=p.type;else if(Array.isArray(p.types)){let ce="";for(let ye of p.types)if(O.includes(String(ye))){ce=ye;break}Y=ce}we={status:["all","open","in_progress","deferred","resolved","closed","ready"].includes(p.status)?p.status:"all",search:typeof p.search=="string"?p.search:"",type:Y}}}}catch(m){e("filters parse error: %o",m)}let S="issues";try{let m=window.localStorage.getItem("beads-ui.view");(m==="issues"||m==="epics"||m==="board"||m==="worker")&&(S=m)}catch(m){e("view parse error: %o",m)}let R={closed_filter:"today",show_deferred_column:!1};try{let m=window.localStorage.getItem("beads-ui.board");if(m){let p=JSON.parse(m);if(p&&typeof p=="object"){let O=String(p.closed_filter||"today");(O==="today"||O==="3"||O==="7")&&(R.closed_filter=O)}}}catch(m){e("board prefs parse error: %o",m)}let M=cn({config:Pa(),filters:we,view:S,board:R}),X=nn(M);X.start();let J=async(m,p)=>{try{return await I(m,p)}catch{return[]}};s&&to(s,M,X);let K=document.getElementById("workspace-picker");K&&vo(K,M,ve,ae),Pe();let xe=ro(t,(m,p)=>I(m,p),X,M);try{let m=document.getElementById("new-issue-btn");m&&m.addEventListener("click",()=>xe.open())}catch{}let T=eo(a,async(m,p)=>{if(m==="list-issues")try{return P.selectIssuesFor("tab:issues")}catch(O){return e("list selectors failed: %o",O),[]}return J(m,p)},m=>{let p=wr(m);p&&X.gotoIssue(p)},M,B,D);M.subscribe(m=>{let p={status:m.filters.status,search:m.filters.search,type:typeof m.filters.type=="string"?m.filters.type:""};window.localStorage.setItem("beads-ui.filters",JSON.stringify(p))}),M.subscribe(m=>{window.localStorage.setItem("beads-ui.board",JSON.stringify({closed_filter:m.board.closed_filter}))}),T.load();let A=Qn(d,M,()=>{let m=M.getState();M.setState({selected_id:null});try{let p=m.view||"issues";X.gotoView(p)}catch{}}),F=null;F=Yn(A.getMount(),J,m=>{let p=wr(m);if(p)X.gotoIssue(p);else{let O=Ut(m);X.gotoView(O)}},D,M);let z=M.getState().selected_id;if(z){d.hidden=!1,A.open(z),F&&F.load(z);let m=`detail:${z}`,p={type:"issue-detail",params:{id:z}};try{D.register(m,p)}catch(O){e("register detail store failed: %o",O)}B.subscribeList(m,p).catch(O=>{e("detail subscribe failed: %o",O),v(O,"issue details")})}let q=null;M.subscribe(m=>{let p=m.selected_id;if(p){d.hidden=!1,A.open(p),F&&F.load(p);let O=`detail:${p}`,Y={type:"issue-detail",params:{id:p}};try{D.register(O,Y)}catch{}B.subscribeList(O,Y).then(ce=>{q&&q().catch(()=>{}),q=ce}).catch(ce=>{e("detail subscribe failed: %o",ce),v(ce,"issue details")})}else{try{A.close()}catch{}F&&F.clear(),d.hidden=!0,q&&(q().catch(()=>{}),q=null)}});let ne=tn(J),ge=Zn(i,ne,m=>X.gotoIssue(m),B,D,M),be=bn(o,ne,m=>X.gotoIssue(m),M,B,D,J),re=[],Se=null;async function Ce(){let m=M.getState().workspace.current?.path;if(!m){re=[];return}try{let O=await(await fetch(`/api/worker/jobs?workspace=${encodeURIComponent(m)}`)).json();re=Array.isArray(O.items)?O.items:[]}catch{re=[]}}async function Ue(){Re(),await Ce(),De.load(),Se=setInterval(()=>{Ce().then(()=>De.load())},3e3)}async function je(m,p){let O=M.getState().workspace.current?.path;O&&(await fetch("/api/worker/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:m,workspace:O,issueId:p.issueId,prNumber:p.prNumber})}),await Ce(),De.load())}async function Le(m){let p=M.getState().workspace.current?.path;p&&(await fetch(`/api/worker/jobs/${encodeURIComponent(m)}/cancel`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:p})}),await Ce(),De.load())}let De=wo(l,{store:M,issue_stores:D,fetch_impl:fetch,getWorkerJobs:()=>re,onRunRalph:m=>{je("bd-ralph",{issueId:m})},onRunPrReview:m=>{je("pr-review",{issueId:typeof m=="string"?m:m?.issueId??void 0,prNumber:typeof m=="object"&&typeof m?.prNumber=="number"?m.prNumber:void 0})},onCancelJob:m=>{Le(m)}}),Ie=null,le=null,ze=null,He=null,Ze=null,qe=null,Oe=null,Me=null,Xe=null,rt=null,Qe=null,Z=new Set;window.__bdui_debug={getPendingSubscriptions:()=>Array.from(Z),getActivityCount:()=>C.getCount(),getActiveRequests:()=>C.getActiveRequests()};let at=null,lt=m=>{n&&i&&o&&l&&d&&(n.hidden=m.view!=="issues",i.hidden=m.view!=="epics",o.hidden=m.view!=="board",l.hidden=m.view!=="worker"),We(m),!m.selected_id&&m.view==="epics"&&ge.load(),!m.selected_id&&m.view==="board"&&be.load(),m.view==="worker"?(Ue(),De.load()):Re(),window.localStorage.setItem("beads-ui.view",m.view)};M.subscribe(lt),lt(M.getState()),window.addEventListener("keydown",m=>{let p=m.ctrlKey||m.metaKey,O=String(m.key||"").toLowerCase(),Y=m.target,ce=Y&&Y.tagName?String(Y.tagName).toLowerCase():"",ye=ce==="input"||ce==="textarea"||ce==="select"||Y&&typeof Y.isContentEditable=="boolean"&&Y.isContentEditable;p&&O==="n"&&(ye||(m.preventDefault(),xe.open()))})}}typeof window<"u"&&typeof document<"u"&&window.addEventListener("DOMContentLoaded",()=>{try{let r=window.localStorage.getItem("beads-ui.theme"),s=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=r==="dark"||r==="light"?r:s?"dark":"light";document.documentElement.setAttribute("data-theme",n);let i=document.getElementById("theme-switch");i&&(i.checked=n==="dark")}catch{}let t=document.getElementById("theme-switch");t&&t.addEventListener("change",()=>{let r=t.checked?"dark":"light";document.documentElement.setAttribute("data-theme",r),window.localStorage.setItem("beads-ui.theme",r)});let e=document.getElementById("app");e&&Ma(e)});export{Ma as bootstrap,Pa as readBootstrapConfig,Oa as refreshConfigSnapshot};
//# sourceMappingURL=main.bundle.js.map
