// JavaScript source code

function generateDeck() {
    var url = getImgURL();
    //Need alternative to get around CORZ
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    fetch(proxy+url)
        .then(res => res.json())
        .then(data => {
            obj = data;
            console.log('keke')
            createImage(obj);
            
        })
        .then(() => {
            console.log(obj);
        });

    console.log('Done');
}
function createImage(obj) {   
    const blurryDomain = "https://www.encoredecks.com/images/";
    const deckSize = 50;
    for (let i = 0; i < deckSize; i++) {

        var imagePath = obj.cards[i].imagepath;
        var cardCode = obj.cards[i].cardcode;   
        var cardType = obj.cards[i].cardtype;   //Determine ch/e/cx
        var img = new Image();
        //Allow user to choose between jp/en later

        //Change dimension if card is climax
        if (cardType == "CX") {
            img = new Image(336, 240);
        } else {
            img = new Image(240, 336);
        }

        //Convert cardcode to imagepath
        var englishPath = formatEnglishPath(cardCode);
        var blurryPath = blurryDomain + imagePath;
        //img.src = englishPath;
        img.src = blurryPath;
        document.body.appendChild(img);
    }
    
}



function formatEnglishPath(path) {  //Does not work 
    //const domain = "https://www.encoredecks.com/images/";

    const domain = "https://en.ws-tcg.com/wp/wp-content/images/cardimages/";

    var convertedPath = path.replaceAll("/", "_");
    convertedPath = convertedPath.replaceAll("-", "_");
    return domain + convertedPath + ".png"; //Specifically for domain2
}
  

//Japanese conversion todo

function getImgURL() {
    //Should append api/ to URL 
    var domainStr = "https://www.encoredecks.com/api/deck/";
    var url = document.getElementById('textbox_id').value;
    var urlId = url.substring(url.length - 9, url.length);
    console.log(urlId);
    //Todo error checking link
    
    document.getElementById('textbox_id').value = "";
    return domainStr+urlId;
}


