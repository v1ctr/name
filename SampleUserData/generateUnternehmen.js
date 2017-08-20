names = [
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
pitches = [
    'Wir überzeugen durch unsere Leistung',
    'Wir stehen für Dynamik und Teamgeist',
    'Wir bieten ein junges, dynamisches Team und flache Hierarchien',
    'Unser Team ist unser Kapital',
    'Professionalität, Zuverlässigkeit und Effizienz - Dafür stehen wir mit unserem Namen',
    'Unser Unternehmen ist Weltmarktführer!',
    'Wir bieten Positionen mit viel Eigenverantwortung',
    'Unser Team ist international und gut vernetzt'
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
partner = [
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
berufsfeld = [
    '/db/Berufsfeld/8c93c740-2fa2-41b8-ad1d-60783e3f3ba3',
    '/db/Berufsfeld/1df0bdec-1642-4c9d-be08-4df5d39a09c7'
];

function getRandomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const branche = [0, 1, 0];

const unternehmen = [];
for (var i = 0; i < 50; i++) {
    const type = getRandomValue(branche);
    unternehmen.push({
        'strasse': getRandomValue(streets),
        'vorname': getRandomValue(firstNames),
        'nachname': getRandomValue(lastNames),
        'geburtsdatum': new Date('04/05/1987'),
        'mindestMonatsGehalt': getRandomValue(salary),
        'startdatum': new Date('01/01/2018'),
        'pitch': getRandomValue(pitches[type]),
        'wohnort': getRandomValue(cities),
        'plz': '12345',
        'hausnummer': '42',
        'softskills': getRandomValue(softSkills),
        'fachkompetenzen': getRandomValue(fachKompetenzen[type]),
        'arbeitsort': getRandomValue(cities),
        'jobBezeichnung': getRandomValue(jobName[type]),
        'ausbildung': getRandomValue(education),
        'telefonnummer': '112',
        'berufsfeld': berufsfeld[type],
        'user': '/db/User/' + (272 + i)
    });
}
console.log(JSON.stringify(unternehmen));
