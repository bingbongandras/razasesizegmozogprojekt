//tobb tornyot megcsinalni - kész
//valahogy rajonni hogy kell majd elemeket kicserelni oszlopok kozt
//gombra randomizalja meg, meg generalja le - kész
//blokkok mozgathatova tetele kattolassal vagy huzassal csak legyen meg jelenleg
//megcsinalni hogy az utolso elemek (legalsok) egy szinten legyenek

tornyokLista = [
    elsoTorony = {
        toronyNeve:"torony-1",
        tartalom: []
    },
    
    masodikTorony = {
        toronyNeve:"torony-2",
        tartalom: []
    },
    
    harmadikTorony = {
        toronyNeve:"torony-3",
        tartalom: []
    }
]





//oszlop kirakasa weboldalra
function oszlopKiIrasa(oszlop){

    document.getElementById(`${oszlop.toronyNeve}`).innerHTML = ""

    for(elem of oszlop.tartalom){
        document.getElementById(`${oszlop.toronyNeve}`).innerHTML += elem.tartalom
    }
}

//oszlop sorrend randomizalasa, kimasoltam a gecibe lmao
function OszlopRandomizalas(oszlop){
    mostaniIndex = oszlop.length

    while(mostaniIndex > 0){
        randomIndex = Math.floor(Math.random()*mostaniIndex)
        mostaniIndex--;

        [oszlop[mostaniIndex], oszlop[randomIndex]] = [oszlop[randomIndex],oszlop[mostaniIndex]]
    }

    return oszlop;
}

//oszlop legenerálása



//oszlopok kozott a blokkok mozgatasa

function BlokkCsere(oszlop,oszlop2){

}

OszlopRandomizalas(tornyokLista[0])
OszlopRandomizalas(tornyokLista[1])
OszlopRandomizalas(tornyokLista[2])

document.getElementById("startGomb").onclick=function(){
    //Többszöri lenyomásra többször megjelenik több különböző torony
    
    for(x in tornyokLista){
        x.tartalom = []
    }

    for(let e = 1;e < 6;e++){
        tempElem = {
            tartalom: `<div class="blokk" style="width:${e*10}%; height:5vh; margin-left:${(100-(e*10))/2}%;" id="doboz-${e}">${e}</div>`,
            sorSzam: e
        }
    
        tornyokLista[Math.floor(Math.random() * 3)].tartalom.push(tempElem)
    }

    oszlopKiIrasa(tornyokLista[0])
    oszlopKiIrasa(tornyokLista[1])
    oszlopKiIrasa(tornyokLista[2])
}
