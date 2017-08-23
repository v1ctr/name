const names = [
    'Software-Schmiede GmbH',
    'Schröder Software AG',
    'Restaurant Feinschmecker',
    'Maier & Müller GbR',
    'WebTech AG',
    'Cafe Gute Aussicht',
    'Hotel 2 Sterne',
    'CodeCompany',
    'Internetz GmbH & Co. KG',
    'Weber WebDesign'
];
const pitches = [
    'Wir überzeugen durch unsere Leistung',
    'Wir stehen für Dynamik und Teamgeist',
    'Wir bieten ein junges, dynamisches Team und flache Hierarchien',
    'Unser Team ist unser Kapital',
    'Professionalität, Zuverlässigkeit und Effizienz - Dafür stehen wir mit unserem Namen',
    'Unser Unternehmen ist Weltmarktführer!',
    'Wir bieten Positionen mit viel Eigenverantwortung',
    'Unser Team ist international und gut vernetzt'
];
const cities = [
    'Hamburg',
    'Bremen',
    'Berlin',
    'München',
    'Stuttgart',
    'Köln',
    'Frankfurt',
    'Düsseldorf'
];
const streets = [
    'Haupstraße',
    'Dorfstraße',
    'Schlossallee',
    'Parkstraße',
    'Opernplatz',
    'Goethestraße',
    'Schillerstraße',
    'Turmstraße',
    'Elisenstraße'
];
const partner = [
    'Frau Müller',
    'Herr Möller',
    'Doris Schulz',
    'Andreas Meier',
    'Der Chef',
    'Claas Hansen',
    'Dieter',
    'Fabian',
    'Frau Kowlaski'
];
const berufsfeld = [
    '/db/Berufsfeld/8c93c740-2fa2-41b8-ad1d-60783e3f3ba3',
    '/db/Berufsfeld/1df0bdec-1642-4c9d-be08-4df5d39a09c7'
];
const bilder = [
    '/file/www/Dateien/Logo/Karte0.png',
    '/file/www/Dateien/Logo/Karte1.png',
    '/file/www/Dateien/Logo/Karte2.png',
    '/file/www/Dateien/Logo/Karte3.png',
    '/file/www/Dateien/Logo/KarteR.png'
];

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const unternehmen = [];
for (var i = 0; i < 50; i++) {
    unternehmen.push({
        'strasse': getRandomValue(streets),
        'name': getRandomValue(names),
        'gruendung': new Date('04/10/1963'),
        'pitch': getRandomValue(pitches),
        'ort': getRandomValue(cities),
        'plz': '12345',
        'hausnummer': '42',
        'adresszusatz': '12. Etage',
        'telefonnummer': '112',
        'branche': getRandomValue(berufsfeld),
        'userid': '/db/User/' + (272 + i),
        'mitarbeiterAnzahl': '5000',
        'homepage': 'www.website.com',
        'ansprechpartner': getRandomValue(partner),
        'logo': getRandomValue(bilder),
        'bild': getRandomValue(bilder)
    });
}
console.log(JSON.stringify(unternehmen));
