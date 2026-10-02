// Contrasta el motor de index.html con una transcripción independiente de la norma. Uso: node tests/tablas_iso2859.test.js
const fs=require("fs");
const html=fs.readFileSync(process.argv[2] || require("path").join(__dirname,"..","index.html"),"utf8");
const js=html.slice(html.indexOf("const LETRAS"), html.indexOf("/* ===================================================================\n   3."));
const eng=new Function(js+";return {letraCodigo,resolverAtributos,PLANES,NMUESTRA};")();
const L="ABCDEFGHJKLMNPQR".split("");
// Referencia transcrita a mano de las Tablas 1, 2-A, 2-B y 2-C de la NTE INEN-ISO 2859-1 (columnas AQL 1,0 / 4,0 / 10).
const D="v",U="^";
const REF={
 normal:{ "1.0":[D,D,D,D,[0,1],U,D,[1,2],[2,3],[3,4],[5,6],[7,8],[10,11],[14,15],[21,22],U],
          "4.0":[D,[0,1],U,D,[1,2],[2,3],[3,4],[5,6],[7,8],[10,11],[14,15],[21,22],U,U,U,U],
          "10": [D,D,[1,2],[2,3],[3,4],[5,6],[7,8],[10,11],[14,15],[21,22],U,U,U,U,U,U]},
 estricta:{"1.0":[D,D,D,D,D,[0,1],D,D,[1,2],[2,3],[3,4],[5,6],[8,9],[12,13],[18,19],U],
          "4.0":[D,D,[0,1],D,D,[1,2],[2,3],[3,4],[5,6],[8,9],[12,13],[18,19],U,U,U,U],
          "10": [[0,1],D,D,[1,2],[2,3],[3,4],[5,6],[8,9],[12,13],[18,19],U,U,U,U,U,U]},
 reducida:{"1.0":[D,D,D,D,[0,1],U,D,D,[1,2],[2,3],[3,4],[5,6],[6,7],[8,9],[10,11],U],
          "4.0":[D,[0,1],U,D,D,[1,2],[2,3],[3,4],[5,6],[6,7],[8,9],[10,11],U,U,U,U],
          "10": [D,D,D,[1,2],[2,3],[3,4],[5,6],[6,7],[8,9],[10,11],U,U,U,U,U,U]}};
const T1={I:"AABCCDEFGHJKLMN",II:"ABCDEFGHJKLMNPQ",III:"BCDEFGHJKLMNPQR"};
const lim=[2,9,16,26,51,91,151,281,501,1201,3201,10001,35001,150001,500001];
let fallos=0,ok=0;
const chk=(c,m)=>{c?ok++:(fallos++,console.log("FALLO:",m));};
// Tabla 1: todos los bordes
for(const niv of ["I","II","III"]) lim.forEach((a,i)=>{
  const b=i<14?lim[i+1]-1:1e7;
  for(const N of [a,b]) chk(eng.letraCodigo(N,niv)===T1[niv][i],`T1 ${niv} N=${N} -> ${eng.letraCodigo(N,niv)} esperado ${T1[niv][i]}`);
});
chk(eng.letraCodigo(1,"II")===null,"N=1 debe ser nulo");
// Celdas
for(const s in REF) for(const a in REF[s]) L.forEach((x,i)=>{
  chk(JSON.stringify(eng.PLANES[s][a][i])===JSON.stringify(REF[s][a][i]),`celda ${s} AQL ${a} ${x}: app=${JSON.stringify(eng.PLANES[s][a][i])} norma=${JSON.stringify(REF[s][a][i])}`);
});
// Resolución de flechas: recorrido independiente
function ref(N,niv,s,a){
  const li=lim.findIndex((v,i)=>N>=v&&(i==14||N<lim[i+1])); const le=T1[niv][li]; let i=L.indexOf(le);
  const col=REF[s][a]; let fl=null;
  if(col[i]===D){fl="abajo";while(col[i]===D)i++;} else if(col[i]===U){fl="arriba";while(col[i]===U)i--;}
  const n=eng.NMUESTRA[s][L[i]]; return {letra:le,letraUsada:L[i],n,ac:col[i][0],re:col[i][1],flecha:fl,cien:n>=N};
}
for(const niv of ["I","II","III"]) for(const s in REF) for(const a in REF[s]) for(const N of [2,3,5,8,9,13,15,16,20,25,26,41,50,51,90,91,150,151,280,281,500,501,1200,1201,3200,3201,10000,10001,35000,35001,150000,150001,500000,500001,2e6]){
  const r=eng.resolverAtributos(N,niv,s,a), e=ref(N,niv,s,a);
  for(const k of ["letra","letraUsada","n","ac","re","flecha","cien"]) chk(r[k]===e[k],`resolver N=${N} ${niv} ${s} AQL ${a}: ${k} app=${r[k]} norma=${e[k]}`);
}
console.log(`\n${ok} comprobaciones OK, ${fallos} fallos`);
process.exit(fallos?1:0);
