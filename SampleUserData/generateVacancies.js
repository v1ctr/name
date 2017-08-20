const unternehmen = [
    "/db/Unternehmen/de9682a2-a623-41eb-807f-65faf47f2d70",
    "/db/Unternehmen/9a12d71e-dfe9-4478-b8f9-84a6c218ce2d",
    "/db/Unternehmen/1595744e-7da8-4ae4-b57e-e77fef1098cc",
    "/db/Unternehmen/51dcf5a7-52e2-4224-87ee-920c1babc950",
    "/db/Unternehmen/2422c398-9a89-402d-93da-50168ee96306",
    "/db/Unternehmen/ee1172f5-019d-47bc-8df8-b16f0ac7fcc0",
    "/db/Unternehmen/3538c3e7-3105-44db-9c85-6bae37bbeeb5",
    "/db/Unternehmen/07bed6dd-a666-478f-87a8-1c7c25c7e452",
    "/db/Unternehmen/e1b3db9a-eb0c-422c-97d5-3d32f210014f",
    "/db/Unternehmen/3cc44349-a87f-4fa5-82b0-6622a00eb679",
    "/db/Unternehmen/ffab2bd0-49bd-48bd-93fe-0f6676aa56f7",
    "/db/Unternehmen/81bb8a22-7490-48f6-a4d0-eed6c9d47f7a",
    "/db/Unternehmen/e89abcd2-6a50-4656-a90b-b0940cbfd8b5",
    "/db/Unternehmen/5a1c9ec3-ad10-46d0-8f04-0ee1dea5370e",
    "/db/Unternehmen/406ebb2f-44dc-4ebc-8a69-8ed3ff58c67c",
    "/db/Unternehmen/1b88a001-ae59-45d1-8b2f-c07b250ef94d",
    "/db/Unternehmen/faae08a5-763f-4a4a-ae9e-a0b3031a6d4b",
    "/db/Unternehmen/0054cb01-2b5b-447d-8daa-ecc0cc454f05",
    "/db/Unternehmen/e52c23a4-f9f3-40ff-817b-15b877e8bda8",
    "/db/Unternehmen/e6120757-e468-4589-925b-22caf924ce91",
    "/db/Unternehmen/14f097dc-6e72-4a76-956f-51dcd2ee7958",
    "/db/Unternehmen/57d312cc-dc3c-433e-8d52-1c7b6844d1c8",
    "/db/Unternehmen/31d80287-42ce-43df-83d4-fdabe7d1d20a",
    "/db/Unternehmen/fbdefe94-254c-40a3-be21-2c7520dd8517",
    "/db/Unternehmen/ac645731-f2b0-425f-8d6d-cccd1404248f",
    "/db/Unternehmen/d1423fa5-4863-4f6d-80f5-f748f5f66938",
    "/db/Unternehmen/9114eeea-1591-41a3-a141-92abf7f6dc00",
    "/db/Unternehmen/c4cf185c-fa99-46eb-8da3-83c6c18ba78e",
    "/db/Unternehmen/75898bc3-81e7-4720-bd77-8c5ec22f6981",
    "/db/Unternehmen/a4533d29-c8b7-4ca6-b033-c3b0772f6206",
    "/db/Unternehmen/e630b7b9-701a-42ef-badc-4430114a823d",
    "/db/Unternehmen/7427fe7c-9837-4a39-a54a-eb123de55bf4",
    "/db/Unternehmen/a3c7b209-a38f-45f1-a602-0bd2ff6faa6b",
    "/db/Unternehmen/e3730b9b-dfef-4d39-bcae-58d4065daa2b",
    "/db/Unternehmen/2af46413-e828-4e6d-8c35-c9169e5078fe",
    "/db/Unternehmen/4cbab526-0614-4c17-a224-37573b4505d4",
    "/db/Unternehmen/2577f3b5-9bd4-41a5-9863-5c6f2bec5a78",
    "/db/Unternehmen/f706ab98-b1d6-4c88-a8e6-d314cb372782",
    "/db/Unternehmen/8bd2b66d-8ae1-4bb4-b483-79c33290d47f",
    "/db/Unternehmen/a27d3105-1cae-4150-8b01-0b7da2ba61ae",
    "/db/Unternehmen/91070c95-09e5-4212-a30c-d838e511da6d",
    "/db/Unternehmen/14b9cb96-7d7a-4ef2-a757-a0897bc729eb",
    "/db/Unternehmen/296b92d2-6bbd-48b6-b170-d05eb4f14235",
    "/db/Unternehmen/afde087b-1a4c-4b65-add0-7f994fb91e92",
    "/db/Unternehmen/66b0ae43-9e61-4193-b65a-714d8609a24d",
    "/db/Unternehmen/477f399f-4cee-43ea-ae77-c653babc2e4e",
    "/db/Unternehmen/70691813-1cf6-4cd2-bff0-a7c87a60b482",
    "/db/Unternehmen/473498b6-2dd7-43c3-a4ab-72f6c1891ab2",
    "/db/Unternehmen/2d415a54-d4db-4fff-bde7-12a23e6f21d4",
    "/db/Unternehmen/4dac0015-9e9d-4d58-8ce6-e3f5fcb7144f"
];
const befristet = [true, false];
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
const salary = [4000, 4100, 4200, 4300, 4400, 4500, 5000, 6000, 5500, 3500, 3000, 2000, 2500];
const jobName = [
    [
        'Software Engineer',
        'Frontend-Entwickler',
        'Administrator',
        'Software-Architekt',
        'System-Admin',
        'Backend-Experte'
    ],
    [
        'Koch',
        'Küchenhilfe',
        'Sommelier',
        'Barkeeper',
        'Kellner',
        'Bäcker'
    ]
];
const berufsfeld = [
    '/db/Berufsfeld/8c93c740-2fa2-41b8-ad1d-60783e3f3ba3',
    '/db/Berufsfeld/1df0bdec-1642-4c9d-be08-4df5d39a09c7'
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
const vertragsarten = [
    "/db/Vertragsart/0a2e2da9-2dc7-47f6-8eb9-fe9d2dbcdb54",
    "/db/Vertragsart/406f4f88-45a2-44b7-a683-85f6afbeaa22",
    "/db/Vertragsart/4c7ed177-f54f-46be-9bc1-7adde9f6be5e",
    "/db/Vertragsart/75b54d7f-be51-4c27-98ac-dc5002e0b3af",
    "/db/Vertragsart/9c3d63b2-4f75-4223-b4b5-47c6c0b21bb6",
    "/db/Vertragsart/9f2c6457-da70-4dd9-9b67-4d18e62aaf2e",
    "/db/Vertragsart/cd1882d0-5c73-41c0-b579-0acecf8643d0"
];
const anforderungen = [
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
        'Internet',
        'Pünktlichkeit',
        'Kommunikativität',
        'Teamfähigkeit',
        'Risokobereitschaft',
        'Freundlichkeit',
        'Leistungsbereitschaft'
    ],
    [
        'Kochen',
        'Servieren',
        'Geschirr spülen',
        'Grillen',
        'Torten backen',
        'Cocktails mixen',
        'Pünktlichkeit',
        'Kommunikativität',
        'Teamfähigkeit',
        'Risokobereitschaft',
        'Freundlichkeit',
        'Leistungsbereitschaft'
    ]
];
const descriptions = [
    [
        'Sie arbeiten in einem dynamischen Umfeld mit einem motivierten Team zusammen.',
        'Der Job bedeutet für Sie viel Eigenverantwortung.',
        'Die Stelle fordert Sie bis zum Äußersten heraus.',
        'Die Stelle erfordert Eigenverantwortung und Kommunikationstalent.'
    ],
    [
        'Für den Kundenkontakt ist freundliches Auftreten ein Muss.',
        'Die Stelle verlangt einen professionellen Umgang mit Konflikten und Stress.',
        'Sie bereiten erstklassige Gerichte für Gäste aus aller Welt zu.',
        'Die Arbeitszeiten können teils sehr flexibel gestaltet sein.'
    ]
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

vacancyType = [0, 1, 0];

vacancies = [];
for (var i = 0; i < 200; i++) {
    const type = getRandomValue(vacancyType);
    vacancies.push({
        'bezeichnung': getRandomValue(jobName[type]),
        'beschreibung': getRandomValue(descriptions[type]),
        'partner': getRandomValue(partner),
        'anforderung': getRandomValue(anforderungen[type]),
        'aktiv': true,
        'unternehmen': getRandomValue(unternehmen),
        'sprache': getRandomValues(sprachen),
        'vertragsarten': getRandomValues(vertragsarten),
        'berufsfeld': berufsfeld[type],
        'arbeitsort': getRandomValue(cities),
        'monatsgehalt': getRandomValue(salary),
        'befristetesArbeitsverhaeltnis': getRandomValue(befristet),
        'start': new Date('01/01/2018')
    });
}
console.log(JSON.stringify(vacancies));