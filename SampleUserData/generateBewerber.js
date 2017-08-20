titles = ['Dr.', 'Dipl-Ing', ''];
firstNames = [
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
lastNames = [
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
fachKompetenzen = [
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
softSkills = [
    'pünktlich',
    'kommunikativ',
    'teamfähig',
    'optimistisch',
    'risokobereit',
    'freundlich'
];
pitches = [
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
cities = [
    'Hamburg',
    'Bremen',
    'Berlin',
    'München',
    'Stuttgart',
    'Köln',
    'Frankfurt',
    'Düsseldorf'
];
streets = [
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
salary = [4000, 4100, 4200, 4300, 4400, 4500, 5000, 6000, 5500, 3500, 3000, 2000, 2500];
jobName = [
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
education = ['Master of Science', 'Bachelor', 'Doktor', 'Abitur', 'Dipl.-Ing.'];
berufsfeld = [
    '/db/Berufsfeld/8c93c740-2fa2-41b8-ad1d-60783e3f3ba3',
    '/db/Berufsfeld/1df0bdec-1642-4c9d-be08-4df5d39a09c7'
];
bilder = [
    '/file/www/Dateien/Logo/Karte0.png',
    '/file/www/Dateien/Logo/Karte1.png',
    '/file/www/Dateien/Logo/Karte2.png',
    '/file/www/Dateien/Logo/Karte3.png',
    '/file/www/Dateien/Logo/KarteR.png'
];

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomValues(array) {
    const number = Math.ceil(Math.random() * 3);
    const result = [];
    for (var i = 1; i <= number; i++) {
        var nextVal = getRandomValue(array);
        while (nextVal.in(result)) {
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
        'profilbild': getRandomValue(bilder)
    });
}
console.log(JSON.stringify(bewerber));
