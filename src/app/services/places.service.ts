import { Injectable } from '@angular/core';

export interface Place {
  name: string;
  imgUrl: string;
  uniqueRole: string;
  generalRole: string;
  info: string;
}

export interface PlaceGroup {
  name: string;
  playWithGroup: boolean;
  places: Place[];
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private gt: PlaceGroup = {name: 'Platser från GT', playWithGroup: false, places: [
    {
      name : 'Dalen med torra ben', imgUrl : '../../assets/placesImages/DryBones.jpg',
      uniqueRole : 'Hesekiel',
      generalRole: 'ett skelett', info : 'Hesekiels syn då han får se torra ben som sedan får kött och liv.',
    },
    {
      name : 'Fiskens mage', imgUrl : '../../assets/placesImages/JonaFish.jpg',
      uniqueRole : 'Jona',
      generalRole : 'en svald fisk',
      info : 'När en stor fisk svalde Jona (och säkert andra mindre fiskar)',
    },
    {
      name : 'Sinai berg', imgUrl : '../../assets/placesImages/SinaiMount.jpg',
      uniqueRole : 'Mose',
      generalRole : 'en Israelit',
      info : 'När Mose fick lagen på berget och folket stod nedanför och väntade',
    },
    {
      name : 'Lejongropen', imgUrl : '../../assets/placesImages/DanielLion.jpg',
      uniqueRole : 'Daniel',
      generalRole: 'ett lejon', info : 'När Daniel var i lejongropen',
    },
    {
      name : 'Röda havet', imgUrl: '../../assets/placesImages/RedSea.jpg',
      uniqueRole : 'Mose', generalRole : 'en Israelit',
      info : 'När Gud delade röda havet',
    },
    {
      name : 'Brinnande busken', imgUrl : '../../assets/placesImages/FieryBush.jpg',
      uniqueRole : 'Mose',
      generalRole: 'ett får', info : 'När Gud talade ur den brinnande busken när Mose vaktade fåren',
    },
    {
      name : 'Brinnande ugnen', imgUrl: '../../assets/placesImages/FieryFurnace.jpg',
      uniqueRole: 'Nebukadnessar', generalRole: 'en av de tre vännerna',
      info: `Daniel 3:1-27 - Kung Nebukadnessar lät göra en staty av guld... [Han] kallade samman... alla...
      makthavare i provinserna... När ni hör ljudet av.. alla slags instrument, ska ni falla ner och tillbe
      den gyllene statyn... [Nebukadnessar] "Är det sant att ni Shadrak, Meshak och Abed-Nego, inte... tillber
      den gyllene statyn[?]... Om ni inte tillber ska ni i samma stund kastas i den brinnande ugnen, och vilken
      gud kan då rädda er ur mina händer?" [De tre vännerna] "Om det blir så, är vår Gud... mäktig att rädda oss...
      Men om inte, så ska du veta, o konung, att vi ändå inte... tillber guldstatyn..." Då fylldes Nebukadnessar
      av vrede... så att hans ansiktsuttryck förvandlades. Han befallde att man skulle göra ugnen sju gånger hetare...
      Så bands de... och kastades i den brinnande ugnen... Då blev kun Nebukadnessar förskräckt. Han
      reste sig hastigt och frågade sina rådsherrar: "Var det inte tre män vi band och kastade i elden?...
      Men nu ser jag fyra män gå lösa och lediga inne i elde, helt oskadda. Och den fjärde ser ut som en gudason."...
      Man kunde inte ens känna att de luktade bränt.`,
    }
  ]};

  private nt: PlaceGroup = {name: 'Platser från NT', playWithGroup: false, places: [
    {
      name : 'Snickar -verkstaden', imgUrl : '../../assets/placesImages/CarpenterShop.jpg',
      uniqueRole : 'Josef',
      generalRole: 'en kund', info : 'Jesus snickarverkstad som han och Josef jobbade i.',
    },
    {
      name : 'Genesarets sjö', imgUrl : '../../assets/placesImages/PeterOnWater.jpg',
      uniqueRole : 'Petrus',
      generalRole: 'en lärjunge',
      info : 'När Petrus gick på vattnet',
    },
    {
      name : 'Slätten', imgUrl : '../../assets/placesImages/BoyWithBread.jpg',
      uniqueRole : 'pojken med 5 bröd och 2 fiskar',
      generalRole: 'en av folket',
      info : 'Slätten där Jesus mättade 5000',
    },
    {
      name : 'Bröllopet i Kanan', imgUrl : '../../assets/placesImages/Wedding.jpg',
      uniqueRole : 'bruden', generalRole : 'en gäst',
      info : 'Bröllopet där Jesus gjorde vatten till vin',
    },
    {
      name : 'Dammen i Betesda', imgUrl : '../../assets/placesImages/Bethesda.jpg',
      uniqueRole : 'den lame som Jesus senare botade',
      generalRole : 'en av de som tränger sig före',
      info : 'Dammen som man trodde att man blev frisk om man hoppade i, men andra trängde sig före den lame',
    },
    {
      name : 'Huset med den lame mannen', imgUrl : '../../assets/placesImages/LameHouse.jpg',
      uniqueRole : 'den lame',
      generalRole : 'en lärjunge',
      info : 'Huset där den lames vänner bröt upp taket och firade ner honom',
    },
    {
      name : 'Korset', imgUrl : '../../assets/placesImages/Cross.jpg',
      uniqueRole : 'rövaren som trodde',
      generalRole : 'en lärjunge',
      info : 'När Jesus blev korsfäst',
    },
    {
      name : 'Stallet i Betlehem', imgUrl : '../../assets/placesImages/SableBethlehem.jpg',
      uniqueRole : 'Maria',
      generalRole : 'en Åsna', info : 'När Jesus föddes',
    },
  ]};

  private demo: PlaceGroup = {name: 'Demo platser', playWithGroup: false, places: [
    {
      name : 'Demo1', imgUrl : '../../assets/placesImages/demo1.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
    {
      name : 'Demo2', imgUrl : '../../assets/placesImages/demo2.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
    {
      name : 'Demo3', imgUrl : '../../assets/placesImages/demo3.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
    {
      name : 'Demo4', imgUrl : '../../assets/placesImages/demo4.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
    {
      name : 'Demo5', imgUrl : '../../assets/placesImages/demo5.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
    {
      name : 'Demo6', imgUrl : '../../assets/placesImages/demo6.jpg',
      uniqueRole : 'En fotograf',
      generalRole: 'en turist', info : 'Här är lite info om demo platsen. Demo demo demo demo...',
    },
  ]};


  private placeGroups: PlaceGroup[] = [this.demo, this.nt, this.gt];

  getPlaceGroups() {
      return this.placeGroups;
  }

  getPlaces(names: string[]) {
    const places: Place[] = [];
    names.forEach(name => {
      this.placeGroups.forEach(group => {
        if (name === group.name) {
          group.places.forEach(place => {
            places.push(place);
          });
        }
      });
    });
    return places;
  }

  getPlace(placeName: string): Place {
    let place: Place;
    this.placeGroups.forEach(group => {
      group.places.forEach(pl => {
        if (placeName === pl.name) {
          place = pl;
        }
      });
    });
    return place;
  }

}
