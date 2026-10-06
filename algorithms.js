(function(root){
 'use strict';
 function traceSort(input, field='price', direction='asc', algorithm='merge') {
  if(!['price','stock','name'].includes(field)||!['asc','desc'].includes(direction)||!['merge','quick'].includes(algorithm))throw Error('Invalid sorting options');
  const a=input.map(x=>({...x})),events=[],stats={comparisons:0,moves:0};
  const cmp=(x,y)=>{stats.comparisons++;let d=field==='name'?x.name.toLowerCase().localeCompare(y.name.toLowerCase(),'en'):x[field]-y[field];return direction==='asc'?d:-d;};
  const emit=(text,active=[],range=null,kind='info',extra={})=>events.push({text,active,range,kind,items:a.map(x=>({...x})),comparisons:stats.comparisons,moves:stats.moves,...extra});
  emit('Start with your inventory. Choose Next step to see the first decision.');
  if(algorithm==='merge'){
   function merge(lo,hi){if(lo>=hi){if(lo===hi)emit('A single product is already sorted.',[lo],[lo,hi],'base');return;}
    const mid=Math.floor((lo+hi)/2);emit(`Split positions ${lo+1}–${hi+1} into two smaller groups.`,[],[lo,hi],'split',{left:a.slice(lo,mid+1),right:a.slice(mid+1,hi+1)});
    merge(lo,mid);merge(mid+1,hi);
    const left=a.slice(lo,mid+1),right=a.slice(mid+1,hi+1);let i=0,j=0,k=lo;const output=[];
    emit('Both halves are sorted. Merge them by comparing their front products.',[],[lo,hi],'merge',{left:left.slice(),right:right.slice(),output:[]});
    while(i<left.length&&j<right.length){const l=left[i],r=right[j],takeLeft=cmp(l,r)<=0;emit(`Compare ${l.name} and ${r.name}. ${takeLeft?l.name:r.name} comes next${cmpValue(l,r)===0?' (tie: keep the left product first)':''}.`,[a.findIndex(x=>x.id===l.id),a.findIndex(x=>x.id===r.id)],[lo,hi],'compare',{left:left.slice(i),right:right.slice(j),compared:[l,r],output:output.slice()});output.push(takeLeft?left[i++]:right[j++]);stats.moves++;emit(`Write ${output[output.length-1].name} into temporary output slot ${k-lo+1}.`,[k],[lo,hi],'write',{left:left.slice(i),right:right.slice(j),output:output.slice()});k++;}
    while(i<left.length||j<right.length){output.push(i<left.length?left[i++]:right[j++]);stats.moves++;emit(`Copy remaining product ${output[output.length-1].name} into temporary output slot ${k-lo+1}.`,[k],[lo,hi],'write',{left:left.slice(i),right:right.slice(j),output:output.slice()});k++;}
    for(let t=0;t<output.length;t++)a[lo+t]=output[t];
    emit(`Copy the merged output back. Positions ${lo+1}–${hi+1} are now sorted.`,[],[lo,hi],'merged');
   }merge(0,a.length-1);
  }else{
   function swap(i,j){if(i!==j){[a[i],a[j]]=[a[j],a[i]];stats.moves++;}}
   function quick(lo,hi){if(lo>=hi){if(lo===hi)emit('A single product is already sorted.',[lo],[lo,hi],'base');return;}
    const pivot=a[hi];let boundary=lo;emit(`Choose ${pivot.name} (last product) as pivot for positions ${lo+1}–${hi+1}.`,[hi],[lo,hi],'pivot',{pivot});
    for(let j=lo;j<hi;j++){const x=a[j],belongs=cmp(x,pivot)<=0;emit(`Compare ${x.name} with pivot ${pivot.name}. ${belongs?'It belongs before or with the pivot.':'It belongs after the pivot.'}`,[j,hi],[lo,hi],'compare',{pivot,compared:[x,pivot]});if(belongs){const different=boundary!==j;swap(boundary,j);emit(different?`Swap positions ${boundary+1} and ${j+1}, then advance the partition boundary.`:'Product is already at the boundary; advance without swapping.',[boundary,j],[lo,hi],'swap',{pivot});boundary++;}}
    const different=boundary!==hi;swap(boundary,hi);emit(`Place pivot ${pivot.name} at position ${boundary+1}${different?' by swapping':' (already in place)'}. Its final position is fixed.`,[boundary],[lo,hi],'partition',{pivot});quick(lo,boundary-1);quick(boundary+1,hi);
   }quick(0,a.length-1);
  }
  function cmpValue(x,y){return field==='name'?x.name.toLowerCase().localeCompare(y.name.toLowerCase(),'en'):x[field]-y[field];}
  emit('Sorting complete. Every product is preserved, and the chosen field is in order.',[],null,'done');
  return {events,items:a,comparisons:stats.comparisons,moves:stats.moves};
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={traceSort};else root.StockAlgorithms={traceSort};
})(typeof globalThis!=='undefined'?globalThis:this);
