const titles = ['Dr.', 'Dipl-Ing', ''];
const firstNames = [
    'Angela',
    'Peter',
    'Bert',
    'Daniel',
    'Caroline',
    'Esther',
    'Felix',
    'Greta',
    'Hans',
    'Ida'
];
const lastNames = [
    'Müller',
    'Meier',
    'Franke',
    'Schulz',
    'Hansen',
    'Svensson',
    'Jansen',
    'Liebig',
    'Mann',
    'Neumann',
    'Wagner'
];
const fachKompetenzen = [
    [
        'CSS',
        'HTML',
        'Excel',
        'Word',
        'Java',
        'Angular',
        'Baqend',
        'C/C++',
        'SQL',
        'Internet'
    ],
    [
        'Kochen',
        'Servieren',
        'Geschirr spülen',
        'Grillen',
        'Torten backen',
        'Cocktails mixen'
    ]
];
const softSkills = [
    'pünktlich',
    'kommunikativ',
    'teamfähig',
    'optimistisch',
    'risokobereit',
    'freundlich'
];
const pitches = [
    [
        'Ich mach alles mit <a href=#>Links</a> :D',
        'Ich kann das ganze Internet auswendig!',
        'Bei FrontEnd-Entwicklung macht mir niemand was vor.',
        'Bin ein Profi in allen Fragen der Web-Entwicklung.',
        'Ich hab schon programmiert als Mark Zuckerberg noch im Kindergarten war.',
        'Windows hätte ICH besser hinbekommen.'
    ],
    [
        'Meine Torten sind deutschlandweit beliebt.',
        'Ich kann 20 Teller auf einmal abräumen',
        'Wenn ich grill, dann wird der Henssler blass vor Neid!'
    ]
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
const salary = [4000, 4100, 4200, 4300, 4400, 4500, 5000, 6000, 5500, 3500, 3000, 2000, 2500];
const jobName = [
    [
        'Software Engineer',
        'Frontend-Entwickler',
        'Administrator',
        'Software-Architekt',
        'System-Admin'
    ],
    [
        'Koch',
        'Küchenhilfe',
        'Sommelier',
        'Barkeeper',
        'Kellner'
    ]
];
const education = ['Master of Science', 'Bachelor', 'Doktor', 'Abitur', 'Dipl.-Ing.'];
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
const sprachen = [
    "/db/Sprache/10907c96-f4e8-4fd7-abc6-745109c91eb0",
    "/db/Sprache/1c6fdc9e-84af-48eb-895a-37735d2aa8f3",
    "/db/Sprache/3dd8f67e-7318-4328-938b-3f3378a06765",
    "/db/Sprache/5dc28165-5960-44cb-98e8-174bf7a0b761",
    "/db/Sprache/65774ca9-d34e-4b6a-b2d5-02f006972870",
    "/db/Sprache/7f76e6cf-95fb-4962-b9eb-e14d74bfcefb",
    "/db/Sprache/aca1ac23-c473-4a46-ad85-591e2f3bff6d",
    "/db/Sprache/b02b01b1-cabb-453d-91ac-75f85018b193",
    "/db/Sprache/bd8ceff5-daf7-4051-a33c-a1bb652f129b",
    "/db/Sprache/c3862a19-179b-40a6-a582-ed771c445eb0",
    "/db/Sprache/c408d836-1862-4e76-aa3a-92663bec74cf"
];
const arbeitsverhaeltnisse = [
    "/db/Arbeitsverhaeltnis/1d4f0647-1d3e-45f2-90e9-7c27ad8db272",
    "/db/Arbeitsverhaeltnis/67a16883-6231-4626-9b08-b05083538338",
    "/db/Arbeitsverhaeltnis/f1fe78c3-8b2c-4f0d-9efc-a60905b7cc17"
];
const vertragsarten = [
    "/db/Vertragsart/0a2e2da9-2dc7-47f6-8eb9-fe9d2dbcdb54",
    "/db/Vertragsart/406f4f88-45a2-44b7-a683-85f6afbeaa22",
    "/db/Vertragsart/4c7ed177-f54f-46be-9bc1-7adde9f6be5e",
    "/db/Vertragsart/75b54d7f-be51-4c27-98ac-dc5002e0b3af",
    "/db/Vertragsart/9c3d63b2-4f75-4223-b4b5-47c6c0b21bb6",
    "/db/Vertragsart/9f2c6457-da70-4dd9-9b67-4d18e62aaf2e",
    "/db/Vertragsart/cd1882d0-5c73-41c0-b579-0acecf8643d0"
];

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomValues(array) {
    const number = Math.ceil(Math.random() * 3);
    const result = [];
    for (var i = 1; i <= number; i++) {
        var nextVal = getRandomValue(array);
        while (result.indexOf(nextVal) !== -1) {
            nextVal = getRandomValue(array);
        }
        result.push(nextVal);
    }
    return result;
}

bewerberType = [0, 1, 0];

bewerber = [];
for (var i = 0; i < 200; i++) {
    const type = getRandomValue(bewerberType);
    bewerber.push({
        'titel': getRandomValue(titles),
        'strasse': getRandomValue(streets),
        'vorname': getRandomValue(firstNames),
        'nachname': getRandomValue(lastNames),
        'geburtsdatum': new Date('04/05/1987'),
        'mindestMonatsGehalt': getRandomValue(salary),
        'startdatum': new Date('01/01/2018'),
        'pitch': getRandomValue(pitches[type]),
        'wohnort': getRandomValue(cities),
        'plz': '22769',
        'hausnummer': '42',
        'adresszusatz': '1. Stock',
        'homepage': 'www.meine-home-page.ru',
        'softskills': getRandomValues(softSkills).join(', '),
        'fachkompetenzen': getRandomValues(fachKompetenzen[type]).join(', '),
        'arbeitsort': getRandomValue(cities),
        'jobBezeichnung': getRandomValue(jobName[type]),
        'ausbildung': getRandomValue(education),
        'telefonnummer': '110',
        'berufsfeld': berufsfeld[type],
        'user': '/db/User/' + (72 + i),
        'profilbild': getRandomValue(bilder),
        'sprachen': getRandomValues(sprachen),
        'vertragsarten': getRandomValues(vertragsarten),
        'arbeitsverhaeltnis': getRandomValue(arbeitsverhaeltnisse)
    });
}
console.log(JSON.stringify(bewerber));
