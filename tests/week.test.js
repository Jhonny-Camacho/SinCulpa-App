import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {days,menuForWeekDay,movementForWeekDay,weeklyShopping,shoppingText} from '../src/week/content.js';
import {marketingConfig,safePublicUrl} from '../src/week/config.js';

test('la guía limita contenido a 7 días con 35 recetas y movimientos únicos',()=>{
 assert.equal(days.length,7);const recipes=new Set(),moves=new Set();for(let day=1;day<=7;day++){assert.equal(days[day-1].checklist.length,3);assert.ok(days[day-1].prompt.length>20);for(const r of Object.values(menuForWeekDay(day)))recipes.add(r.id);for(const e of movementForWeekDay(day).exercises){assert.ok(!moves.has(e.key));moves.add(e.key);}}assert.equal(recipes.size,35);assert.equal(moves.size,14);assert.throws(()=>menuForWeekDay(8),RangeError);assert.throws(()=>movementForWeekDay(0),RangeError);
});
test('la compra semanal suma unidades equivalentes y permite excluir snacks y despensa',()=>{
 const items=weeklyShopping(),meals=weeklyShopping(false);assert.ok(items.length>meals.length);assert.equal(new Set(items.map(i=>i.name)).size,items.length);for(let day=1;day<=7;day++)for(const r of Object.values(menuForWeekDay(day)))for(const ingredient of r.ingredients)assert.ok(items.some(i=>i.name===ingredient.split(' · ')[0]));const text=shoppingText(items,[items[0].name]);assert.ok(!text.includes('☐ '+items[0].name+':'));assert.ok(text.includes('☐ '+items[1].name+':'));assert.match(items.find(i=>i.name==='Avena').amount,/taza/);
});
test('las conexiones aceptan enlaces públicos HTTPS y no inventan captura ni cobro',()=>{
 for(const url of ['javascript:alert(1)','http://example.com','https://user:secret@example.com','nota'])assert.equal(safePublicUrl(url),'');assert.equal(marketingConfig({}).formUrl,'');assert.equal(marketingConfig({}).checkoutUrl,'');const c=marketingConfig({VITE_LEAD_FORM_URL:'https://example.com/form',VITE_CHECKOUT_URL:'https://example.com/pay',VITE_CONTACT_EMAIL:'hola@example.com'});assert.equal(c.price,19);assert.equal(c.currency,'USD');assert.equal(c.contactEmail,'hola@example.com');assert.equal(c.formUrl,'https://example.com/form');
});
test('el ebook descargable es un PDF generado, no un enlace vacío',()=>{const pdf=readFileSync(new URL('../public/downloads/SinCulpa-7-dias.pdf',import.meta.url));assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.ok(pdf.length>100000);});
