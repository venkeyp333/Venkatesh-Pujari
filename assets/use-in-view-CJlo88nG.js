import{r as g}from"./index-B-Tlipcz.js";function p(e,r,o){return typeof e=="string"?e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}const E={some:0,all:1};function h(e,r,{root:o,margin:c,amount:n="some"}={}){const f=p(e),s=new WeakMap,u=a=>{a.forEach(t=>{const l=s.get(t.target);if(t.isIntersecting!==!!l)if(t.isIntersecting){const d=r(t);typeof d=="function"?s.set(t.target,d):i.unobserve(t.target)}else l&&(l(t),s.delete(t.target))})},i=new IntersectionObserver(u,{root:o,rootMargin:c,threshold:typeof n=="number"?n:E[n]});return f.forEach(a=>i.observe(a)),()=>i.disconnect()}function w(e,{root:r,margin:o,amount:c,once:n=!1}={}){const[f,s]=g.useState(!1);return g.useEffect(()=>{if(!e.current||n&&f)return;const u=()=>(s(!0),n?void 0:()=>s(!1)),i={root:r&&r.current||void 0,margin:o,amount:c};return h(e.current,u,i)},[r,e,o,n,c]),f}export{p as r,w as u};
