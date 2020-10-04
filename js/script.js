let estatSexoMasculino = 0;
let estatSexoFeminino = 0;
let estatSomaIdades = 0;
let estatMediaIdades = 0;
let usuariosEncontrados = null;
let btnBusk = null;
let busk = null;

window.addEventListener('load', () => {
  loader = document.querySelector('.loader');
  busk = document.querySelector('#busk');
  btnBusk = document.querySelector('#btnBusk');
  totalUsuariosEncontrados = document.querySelector('#totalUsuariosEncontrados');
  usuariosEncontrados = document.querySelector('#usuariosEncontrados');
  estatSexoFeminino = document.querySelector("#SexoFeminino");
  estatSexoMasculino = document.querySelector("#SexoMasculino");
  estatSomaIdades = document.querySelector("#SomaIdades");
  estatMediaIdades = document.querySelector("#MediaIdades");
  fetchPeople();
  loadEvents();
  ocultLoader();
});

const ocultLoader = () => {
  busk.disabled = true;
  btnBusk.disabled = true;
  setTimeout(() => {
    loader.style.display = "none";
    busk.disabled = false;
    btnBusk.disabled = false;
    inputUsuario.focus();
  }, 1200);
};


async function fetchPeople() {
  const res = await fetch(' https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();
  allPeople = json.results.map(people => {
    const { pictureLarge, name, age, gender } = people;

    return {
      pictureLarge: people.picture.large,
      name: `${people.name.first} ${people.name.last}`,
      age: people.dob.age,
      gender :  people.gender
    };
  });
}

const loadEvents = ()=>{
  btnBusk.addEventListener('click', () =>{search()});
  busk.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      search();
    }
  });
}

const search = () =>{
  let inputFilter =  busk.value.trim();
  
  findPeople = allPeople.filter((people) =>
    people.name.toLowerCase().includes(inputFilter.toLowerCase())
  );
  renderFinderPeopleList();
  updateStatistics();
}


const renderFinderPeopleList = () =>{
  let peopleboxHTML = '<ul class="peopleList">';
  findPeople.forEach(people => {
    const{name, pictureLarge, age, gender} = people;
    const peopleHTML = `<li><img src="${pictureLarge}"> <span>${name}, ${age} anos</span></li>`
    peopleboxHTML += peopleHTML;
  });
  peopleboxHTML += '</ul>';
  usuariosEncontrados.innerHTML = peopleboxHTML;
 
}

const updateStatistics = () =>{
  totalUsuariosEncontrados.textContent = findPeople.length;
  const countAge =  findPeople.reduce((a, b)=>{
    return a + b.age;
  }, 0)

  const countFemale = findPeople.filter(
    (people) => people.gender ==='female'
   ); 
  estatSexoFeminino.innerHTML = countFemale.length;  
  estatSexoMasculino.innerHTML = (findPeople.length - countFemale.length);
  estatSomaIdades.innerHTML = countAge;
  estatMediaIdades.innerHTML = (countAge / findPeople.length).toFixed(2);
}

