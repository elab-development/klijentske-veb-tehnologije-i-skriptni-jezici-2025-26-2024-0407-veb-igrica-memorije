# Flip and Find - Veb igrica memorije

Veb igrica memorije u kojoj dva igrača naizmenično okreću kartice i
traže parove sa istim životinjama.

Igra podržava registraciju i prijavu korisnika, izbor protivnika i veličine
table, čuvanje rezultata odigranih partija, pregled istorije sa filtriranjem i
paginacijom, kao i statistiku prikazanu grafikonima. Svi podaci se čuvaju
lokalno.

## Tehnologije

- **React** + **TypeScript**
- **Vite** - razvojni server i build alat
- **React Router** - navigacija između stranica
- **Tailwind CSS** - stilizovanje
- **Chart.js** - grafikoni

## Preduslovi

Potrebno imati instaliran **Node.js**  koji dolazi zajedno sa **npm**-om.

Verziju možete proveriti komandama:

```bash
node -v
npm -v
```

## Povlačenje i pokretanje projekta

1. **Kloniranje repozitorijuma**

   ```bash
   git clone https://github.com/elab-development/klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2024-0407-veb-igrica-memorije.git

   cd klijentske-veb-tehnologije-i-skriptni-jezici-2025-26-2024-0407-veb-igrica-memorije
   ```

2. **Instalacija zavisnosti**

   ```bash
   npm install
   ```

3. **Pokretanje razvojnog servera**

   ```bash
   npm run dev
   ```

   Nakon pokretanja, igra će biti dostupna na adresi localhost:3000.
  

## Funkcionalnosti

- **Registracija i prijava** - korisnik kreira nalog
  i prijavljuje se. Podaci o korisnicima čuvaju se u localStorage.
- **Podešavanja partije** - pre igre se unosi ime protivnika i bira veličina
  table: 4×4 6×4 ili 6×5.
- **Igra memorije** - dva igrača naizmenično okreću po dve kartice. Kada
  pronađu par, idalje igraju; u suprotnom red prelazi na protivnika. Prati se
  broj poena i broj poteza za svakog igrača, a na kraju se prikazuje pobednik.
- **Čuvanje rezultata** - završetkom partije rezultat se pamti u localStorage.
- **Istorija partija** - pregled odigranih partija sa filtriranjem po ishodu, veličini table i imenu protivnika, uz paginaciju.
- **Profil** - prikaz korisničkog imena, ukupnog broja pobeda i poraza, kao i
  mogućnost promene korisničkog imena.
- **Statistika** - grafički prikaz podataka pomoću Chart.js:
  - odnos pobeda i poraza,
  - broj savršenih partija,
  - broj poteza u poslednjih 10 partija.

## Struktura projekta

```text
├── public/
│   └── animalsData.json
├── src/
│   ├── auth/
│   ├── classes/ 
│   ├── components/ 
│   ├── pages/ 
│   ├── App.tsx
│   └── main.tsx 
├── index.html
├── package.json
└── vite.config.ts
```

## Rute aplikacije

| Ruta              | Stranica            | Opis                                  |
| ----------------- | ------------------- | ------------------------------------- |
| `/`               | Home                | Početna strana sa dugmetom Start.   |
| `/login`          | Login               | Prijava korisnika.                    |
| `/register`       | Register            | Registracija novog korisnika.         |
| `/game-settings`  | Game Settings       | Izbor protivnika i veličine table.    |
| `/game`           | Game                | Sama igra memorije.                   |
| `/history`        | History             | Istorija partija sa filterima.        |
| `/profile`        | Profile             | Profil i promena imena.               |
| `/statistics`     | Statistics          | Statistika sa grafikonima.            |

## Napomena

Svi podaci (korisnici i
rezultati partija) čuvaju se u localStorage browsera. Brisanjem podataka
browsera brišu se i svi nalozi i rezultati.
