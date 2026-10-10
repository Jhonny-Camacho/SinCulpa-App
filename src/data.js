import {menuForDay} from "./menus.js";
export {menuForDay,breakfasts,lunches,dinners,morningSnacks,afternoonSnacks} from "./menus.js";
export function shoppingForDay(day) {
 const meals=menuForDay(day); const items=new Map();
 Object.values(meals).forEach(meal=>meal.ingredients.forEach(i=>{const [name,amount]=i.split(' · '); if(!items.has(name))items.set(name,[]);items.get(name).push(amount);}));
 return [...items].map(([name,amounts])=>({name,amounts:amounts.join(' + ')}));
}
export {workoutForDay} from "./workouts.js";
export const dateKey = () => new Date().toLocaleDateString('en-CA');
export const hydrationGoal = () => 8;
export function cravingAdvice(hunger,feeling,taste='sweet') {
 const options=(cravingFoods[taste]||cravingFoods.sweet).map(option=>({...option}));
 const note='Elige una opción como punto de partida, no un límite. Ajusta la cantidad según tu hambre y satisfacción; no necesitas comer todas las opciones. Revisa alergias y tus necesidades personales.';
 if(hunger==='hungry')return {color:'green',title:'Tu hambre merece atención',text:'Puedes comer ahora. Si toca una comida principal o tu hambre es intensa, elige un plato completo del menú; estos snacks también pueden acompañarlo.',options,note};
 if(feeling==='stress')return {color:'amber',title:'Haz una pausa amable',text:'Respira y reconoce lo que necesitas. Si deseas comer, aquí tienes ideas concretas para disfrutar sin compensarlo con ejercicio ni saltarte comidas.',options,note};
 return {color:'rose',title:'Date permiso para disfrutar',text:'Un antojo no es un error. Elige el sabor que deseas, sírvelo y disfrútalo con atención. Puedes repetir si sigues con hambre; ningún alimento define tu día.',options,note};
}

export const cravingFoods = {
 sweet:[{food:'Yogur natural con plátano',portion:'¾ taza de yogur + ½ plátano'},{food:'Pan con mantequilla de maní',portion:'1 rebanada de pan + 1 cucharada de mantequilla de maní'},{food:'Galletas que te gusten',portion:'2–3 pequeñas (aprox. 30 g), como punto de partida'}],
 salty:[{food:'Queso fresco con tortilla',portion:'30–40 g de queso + 1 tortilla de maíz'},{food:'Palomitas caseras',portion:'2–3 tazas ya preparadas; usa poco aceite y sal a tu gusto'},{food:'Hummus con zanahoria',portion:'¼ taza de hummus + 1 zanahoria en bastones'}],
 fresh:[{food:'Fruta con frutos secos',portion:'1 fruta mediana o 1 taza en cubos + 15 g de nueces o maní'},{food:'Pepino con queso fresco',portion:'½ pepino + 30 g de queso'},{food:'Yogur con papaya',portion:'½–¾ taza de yogur + ½ taza de papaya'}],
 chocolate:[{food:'Chocolate que disfrutes',portion:'20–30 g (mira el peso del envase; los cuadrados varían)'},{food:'Yogur con cacao y nueces',portion:'¾ taza de yogur + 1 cucharadita de cacao + 10 g de nueces'},{food:'Fresas con chocolate',portion:'1 taza de fresas + 15–20 g de chocolate'}]
};
