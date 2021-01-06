    // ==== proměnné ====
    var no = 0;
    var count = 0;
    var pocet = 0;
    var i = 0;
    var x = 0;
    var number = new Array();
    var dictionary = new Array();
    var vygenerovanoEn = new Array();
    var odpoved = new Array();
    var cz = new Array();
    var en = new Array();
    var max = 0; var counter = 0; var dil = 0;
    delay = 200;
    // ==== slovník-mix ====
    dictionary[0] = new Array();
    dictionary[1] = new Array();
    

    //========== POKUS NAVÍC ==========
    function zahrnLekci(){
        dictionary[0] = [];
        dictionary[1] = [];
        for (var i = 0; i < 8; i++){
            if(document.getElementById("lekce" + i).checked){
                cz[i].forEach(item => dictionary[0].push(item));
                en[i].forEach(item => dictionary[1].push(item));
            }
        }
        // ==== max. počet slov ====
        document.getElementById("pocetSlov").max = dictionary[0].length;
        document.getElementById("pocetSlov").placeholder = "max: " + dictionary[0].length;
        // ==== pole použitých slov ====
        for (var j = 0; j < dictionary[0].length; j++){
            number[j] = j;
        }
        // ==== ZMIZÍ STARÉ POLE A OBJEVÍ SE POČ. ČÍSEL ====
        document.getElementById("formLekceList").style.visibility = "hidden";
        document.getElementById("formPocetSlov").style.visibility = "visible";
        document.getElementById("pocetSlov").focus();
    }


    function startX(){
        pocet = document.getElementById("pocetSlov").value;
        if (pocet > dictionary[0].length || pocet <= 0){
            alert("Invalid input");
        } else {
            max = pocet;
            generujSlova();
            //document.getElementById("start").disabled = true;
            document.getElementById("formPocetSlov").style.visibility = "hidden";
            document.getElementById("predek-gif").style.visibility = "hidden";
            document.getElementById("game").style.visibility = "visible";
            document.getElementById("box-2").focus();
        }
    }

    function generujSlova(){
        no = 555;
        while(!number.includes(no) && pocet != 0){
            no = Math.floor(Math.random() * dictionary[0].length);
        }

        if(number.includes(no)){
            pocet--;
            vygenerovanoEn[x] = dictionary[1][no];
            x++;
            document.getElementById("box").value = dictionary[0][no];
            number.splice(number.indexOf(no), 1);
        } else {
            ukazTabulku();
        }
    }

    function search(ele) {
    if(event.key === 'Enter') {
        if(document.getElementById("box-2").value != dictionary[1][no]){
            document.getElementById("box-2").style.animation = "trep 0.1s linear 5";
            document.getElementById("pocet_chyb").style.animation = "trep2 0.1s linear 5";
            setTimeout(netrepSa, 500);
            count++;
        }
        odpoved[i] = document.getElementById("box-2").value;
        i++;
        document.getElementById("pocet_chyb").textContent = count;
        document.getElementById("prehled").textContent = i + "/" + max;
        document.getElementById("box-2").value = "";
        zvys();
        generujSlova(); 
        } 
    }

    function ukazTabulku(){
        document.getElementById("game").style.visibility = "hidden";
        document.getElementById("tabulkaVysledky").style.visibility = "visible";
        document.getElementById("zadek-gif").style.visibility = "visible";
        document.getElementById("pocet_chyb2").textContent = count;
        var body = document.getElementById("tabulkaVysledky"),
        tbl  = document.createElement('table');

        for(var i = 0; i < odpoved.length; i++){
            var tr = tbl.insertRow();
            for(var j = 0; j < 2; j++){
                var td = tr.insertCell();
                if (j == 0){
                    td.appendChild(document.createTextNode(vygenerovanoEn[i]));
                } else {
                    if(odpoved[i] == ""){
                        td.appendChild(document.createTextNode("X"));
                    }else {
                        td.appendChild(document.createTextNode(odpoved[i]));
                    }
                }
                if(odpoved[i] != vygenerovanoEn[i]){
                    td.style.color = 'red';
                }
            }
        }
        body.appendChild(tbl);

        //===== final msg =====
        var prumer = count / odpoved.length;    // chyb/celkem
        if (max == odpoved.length){             //pokud user odpověděl na všechna slova
            if(prumer <= 0.2){
                document.getElementById("wellDone").textContent='WELL DONE!';
            }else if(prumer >= 0.8){
                document.getElementById("wellDone").textContent='LOSER!';
            }else{
                document.getElementById("wellDone").textContent='NOT GREAT NOT TERRIBLE';
            }
            document.getElementById("wellDone").style.animation='msg 1s ease-out 1';
        }
    }



    function zvys(){
        dil = 200 / max;
        counter++;
        document.getElementById('level').style.width = dil + "px";
        document.getElementById('level').style.width = dil * counter + "px";
        //document.getElementById('prehled').nodeValue
    }

    /* ========== ANIMACE ČUDLIKU ===========*/
    function pokus(ele){
        if(event.key === 'Enter') {
            startX();
        }
    }
    
    function netrepSa(){
        document.getElementById("box-2").style.animation = "none";
        document.getElementById("pocet_chyb").style.animation = "none";
    }