import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const A=atob('ACEkCEhQcHgAAAAAAAAAADAwMDAwMDAoMDAwKDAwMAAwMDAAAAAAAAAAAAAAAAAAAgoKAgAAAAAAAAAAAAAAACgQAAAAAAAAAAAAAAAAAAAICCAI');
function run(p,inp){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),out=new Uint8Array(65536);
let sp=0,cp=0,ol=0,ip=0,pc=0,st=0;
const done=c=>[out.slice(0,ol),c];
for(;;){
if(st===1e6)return done(10);
if(pc<0||pc>=p.length)return done(9);
const op=p[pc],v=A.charCodeAt(op);
if(!v&&op!==0&&op!==52)return done(5);
const im=v&7,po=(v>>3)&3,pu=(v>>5)&3;
if(pc+im>=p.length)return done(9);
st++;
const nx=pc+1+im;
if(sp<po)return done(2);
if(sp-po+pu>256)return done(3);
pc=nx;
if(op>=16&&op<=34&&op!==23&&op!==27){
const b=D[sp-1],a=D[sp-2];
let r=0;
if(op===16)r=(a+b)|0;
else if(op===17)r=(a-b)|0;
else if(op===18)r=Math.imul(a,b);
else if(op===19){if(b===0)return done(4);r=(a/b)|0;}
else if(op===20){if(b===0)return done(4);r=a%b|0;}
else if(op===21){if(b===0)return done(4);r=Math.floor((a>>>0)/(b>>>0))|0;}
else if(op===22){if(b===0)return done(4);r=(a>>>0)%(b>>>0)|0;}
else if(op===24)r=a&b;
else if(op===25)r=a|b;
else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);
else if(op===29)r=a>>(b&31);
else if(op===30)r=(a>>>(b&31))|0;
else if(op===32)r=a===b?1:0;
else if(op===33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
sp-=2;D[sp++]=r;
continue;
}
switch(op){
case 0:return done(0);
case 1:D[sp++]=(p[nx-1]<<24)>>24;break;
case 2:D[sp++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:sp--;break;
case 4:D[sp]=D[sp-1];sp++;break;
case 5:{const t=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=t;break;}
case 6:D[sp]=D[sp-2];sp++;break;
case 7:{const a=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=a;break;}
case 23:D[sp-1]=-D[sp-1]|0;break;
case 27:D[sp-1]=~D[sp-1];break;
case 48:pc=nx+(((p[nx-2]|(p[nx-1]<<8))<<16)>>16);break;
case 49:case 50:{const v=D[--sp];if((op===49)===(v===0))pc=nx+(((p[nx-2]|(p[nx-1]<<8))<<16)>>16);break;}
case 51:if(cp===64)return done(7);C[cp++]=nx;pc=p[nx-2]|(p[nx-1]<<8);break;
case 52:if(cp===0)return done(8);pc=C[--cp];break;
case 64:{const a=D[sp-1];if(a<0||a>=256)return done(6);D[sp-1]=M[a];break;}
case 65:{const a=D[sp-1],v=D[sp-2];if(a<0||a>=256)return done(6);sp-=2;M[a]=v;break;}
case 80:{const s=String(D[sp-1]);if(ol+s.length>65536)return done(11);sp--;for(let i=0;i<s.length;i++)out[ol++]=s.charCodeAt(i);break;}
case 81:if(ol+1>65536)return done(11);out[ol++]=D[--sp]&255;break;
case 82:D[sp++]=ip<inp.length?inp[ip++]:-1;break;
case 83:return done(D[--sp]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),r[0]);
writeFileSync(join(O,id,'exit.txt'),r[1]+'\n');
}
