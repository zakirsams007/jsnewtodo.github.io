
// -----Select All elements----------

const clearAll = document.querySelector(".clear");
const displayDate = document.querySelector("#date");
const allList = document.querySelector("#list");
const listInput = document.querySelector("#input");

// -----------class names-----------
const Check = "fa-check";
const uncheck = "fa-circle-notch";
const lineThrough = "lineThrough";

//initiate list array and id-----

let list=[];
let id=0;



//----setData in local storage---------
// localStorage.setItem('TODO', JSON.stringify(list))

//-------getData in local storage-----
let data = localStorage.getItem("TODO")

//--check data is empty?---
if(data){
  list = JSON.parse(data);
  id = list.length; // set id to the last one of the list
  load(list) //load latest data
}
else{
  // ----if data is empty-----
  list=[];
  id=0;
}

//----- load items to the user screen---
// const load=(array)=>{ // why arrow function here not work
  function load(array){
  array.forEach(function(items){
        addToDo(items.name, items.id, items.done, items.trash)    
  });
  console.log(array) 
}


// ----------clear all data by clicking button--------
clearAll.addEventListener('click', ()=>{
  localStorage.clear();
  location.reload();
})


// ----------show date------
const moreOption = {weekday:"long", month:"short", day:"numeric"}
const currentDate = new Date()
displayDate.innerHTML= currentDate.toLocaleDateString("en-US", moreOption)

//----------list adding function----------

function addToDo(items, id, done, trash){
         
            if(trash){
              return;
            }

       const listDone = done? Check :  uncheck;
       const throughLine = done? lineThrough:""; 

  const listItems = `
                <li class="items">
                  <i class="fas ${listDone} complete" job="complete" id=${id}></i>
                  <p class="text ${throughLine}">${items}</p>
                  <i class="fas fa-trash-alt delete" job="delete" id=${id}></i> 
                </li>
               `;
          allList.insertAdjacentHTML("beforeend", listItems); 
}

//------take user input---------
document.addEventListener('keyup', function click(event){
  if(event.keyCode === 13){
    const toDo = listInput.value;

//----handle empty input------
        if(toDo){
          addToDo(toDo, id, false, false)
          list.push({
            name:toDo,
            id:id,
            done:false,
            trash:false
          })
          id++;
          //----setData in local storage---------
        localStorage.setItem('TODO', JSON.stringify(list))

        }
      listInput.value="";
  }
});

const completeToDo=(element)=>{
  element.classList.toggle(Check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  list[element.id].done = list[element.id].done ? false :  true;
}


// delete list --------------

const removeList=(element)=>{
  element.parentNode.parentNode.removeChild(element.parentNode);
  list[element.id].trash=true;
}

//------created items dynamicaly-------

//return the clicked element inside list
allList.addEventListener('click', function(e){
  const elements = e.target;

  //complete or delete
  const elementJob = elements.attributes.job.value;

  if(elementJob === 'complete'){
    completeToDo(elements)
  }
  else if(elementJob === 'delete'){
    removeList(elements)
  }
   //----setData in local storage---------
localStorage.setItem('TODO', JSON.stringify(list))
});



