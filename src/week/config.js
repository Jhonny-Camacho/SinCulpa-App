// Solo enlaces públicos: no pongas claves API ni credenciales en variables VITE_.
export function safePublicUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export function marketingConfig(env=import.meta.env||{}){return {formUrl:safePublicUrl(env.VITE_LEAD_FORM_URL),checkoutUrl:safePublicUrl(env.VITE_CHECKOUT_URL),contactEmail:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(env.VITE_CONTACT_EMAIL||'')?env.VITE_CONTACT_EMAIL:'',price:19,currency:'USD',pdfUrl:'/downloads/SinCulpa-7-dias.pdf'};}
export const config=marketingConfig();
