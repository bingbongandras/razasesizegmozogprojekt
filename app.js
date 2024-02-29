
    /* * *  Rudak és korongok kialakítása  * * */ 
    
    
    korongok = document.getElementsByClassName('korong')
    
    
    function Rud( r_azon )
    {
    this.poz  = r_azon*160-16
    this.tomb = new Array()

    this.felrak = function( k_azon )
    {
        uj = this.tomb.length
        this.tomb[uj] = new Korong( this , k_azon , uj )
    }
    }


    function Korong( rud , k_azon , div_azon )
    {
    this.azonosito  = k_azon
    this.div_azon   = div_azon

    this.szel       = k_azon*14 +48
    this.x          = rud.poz-this.szel/2
    this.y          = 62 + rud.tomb.length*26

    korongok[this.div_azon].style.width  = this.szel + 'px'
    korongok[this.div_azon].style.left   = this.x    + 'px'
    korongok[this.div_azon].style.bottom = this.y    + 'px'
    korongok[this.div_azon].innerHTML    = this.azonosito
    }



    rudak = new Array()
    rudak[1] = new Rud(1)
    rudak[2] = new Rud(2)
    rudak[3] = new Rud(3)

    for( i=1 ; i<=8 ; i++ )   rudak[1].felrak(9-i)




/* * *  Hanoi futtatása: az eredmény a pakolas_sorrend[] tömbbe kerül * * */ 


    function mozgat( honnan , hova )    // Tömbelemek mozgatása a memóriában
    {
    mozgatando    = honnan.tomb[honnan.tomb.length-1]

    pakolas_sorrend[ pakolas_sorrend.length ] = new pakolas( mozgatando , mozgatando.x, mozgatando.y , hova.poz-mozgatando.szel/2, 62 + hova.tomb.length*26 )

    mozgatando.x  = hova.poz-mozgatando.szel/2
    mozgatando.y  = 62 + hova.tomb.length*26

    elem = honnan.tomb.pop()
    hova.tomb.push(elem)
    }


    function hanoi( db , honnan, hova, seged )    //  A rekurzív megvalósítás
    {
    if( db==1 )   mozgat( honnan, hova )
    else
    {
        hanoi( db-1 , honnan, seged, hova )
        mozgat( honnan, hova )
        hanoi( db-1 , seged, hova, honnan )
    }
    }



    pakolas_sorrend = new Array()
    db = rudak[1].tomb.length
    hanoi( db , rudak[1] , rudak[2] , rudak[3] )




/* * *  Szemléltetés: a pakolas_sorrend[] tömb bemutatása  * * */ 


    function pakolas( korong , x1, y1 , x2, y2 )    //  A korongok mozgását tároló adatstruktúra kialakítása
    {
    this.mozgatando = korong
    this.x1         = x1
    this.y1         = y1
    this.x2         = x2
    this.y2         = y2
    }


    function pakolas_mutatas(i)    //  A mozgatás megjelenítése képernyőn
    {
    i = i || 0

    elem = pakolas_sorrend[i]

    korongok[elem.mozgatando.div_azon].style.left   = elem.x2 + 'px'
    korongok[elem.mozgatando.div_azon].style.bottom = elem.y2 + 'px'

    document.getElementById('idojelzo_csik').style.width = i/(pakolas_sorrend.length-1)*520             + 'px'
    document.getElementById('idojelzo_text').innerHTML   = parseInt( i/(pakolas_sorrend.length-1)*100 ) + '%'

    if( i<pakolas_sorrend.length-1 )  setTimeout( function(){ pakolas_mutatas(i+1) } , Math.pow(10,document.urlap.kesleltetes.value/1000)  )
    else
    {
        document.urlap.startgomb.value    = 'Újra'
        document.urlap.startgomb.disabled = false
    }
    }


    function start( gomb )    // Indítás és újraindítás megvalósítása
    {
    if( gomb.value=='Start' )
    {
        gomb.disabled = true
        pakolas_mutatas()
    }

    if( gomb.value=='Újra'  )
    {
        location.href = location.href
    }
    }