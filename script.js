const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});



const joinOptions = document.querySelectorAll('.join-option');
const selectedJoinOption = document.querySelector('#selectedJoinOption');
joinOptions.forEach((option) => {
  option.addEventListener('click', () => {
    joinOptions.forEach((item) => item.classList.remove('active'));
    option.classList.add('active');
    if (selectedJoinOption) selectedJoinOption.value = option.dataset.option || option.textContent.trim();
  });
});

document.querySelectorAll('.support-form .button').forEach((button) => {
  button.addEventListener('click', () => {
    const form = button.closest('.support-form');
    const note = form?.querySelector('.form-note');
    if (!note) return;
    note.textContent = form.classList.contains('login-form')
      ? 'Demo prijava je prikazana samo u ovom prototipu. Autentikacija nije aktivna.'
      : 'Demo unos je zabilježen samo u ovom prototipu. Slanje nije aktivno.';
  });
});

const wireChoiceGroup = (selector, detailSelector, formatter) => {
  const buttons = document.querySelectorAll(selector);
  const detail = document.querySelector(detailSelector);
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      if (detail) detail.innerHTML = formatter(button);
    });
    button.addEventListener('mouseenter', () => button.click());
  });
};

wireChoiceGroup('.ward-letter', '.ward-detail', (button) => button.dataset.ward || '');

wireChoiceGroup('.orbit-node', '.ecosystem-detail', (button) => (
  `${button.textContent}: ${button.dataset.ecosystem}.`
));

wireChoiceGroup('.infra-pin', '.infra-detail', (button) => {
  const [title, text] = (button.dataset.infra || '').split('|');
  return `<strong>${title}</strong><span>${text}</span>`;
});

wireChoiceGroup('.region-dot', '.region-detail', (button) => {
  const [title, text] = (button.dataset.region || '').split('|');
  return `<strong>${title}</strong><span>${text}</span>`;
});



const simulationCard = document.querySelector('.simulation-card');
const simChoices = document.querySelector('#simChoices');
const simStepNumber = document.querySelector('#simStepNumber');
const simStepLabel = document.querySelector('#simStepLabel');
const simTitle = document.querySelector('#simTitle');
const simText = document.querySelector('#simText');
const simMentor = document.querySelector('#simMentor');
const ideaLog = document.querySelector('#ideaLog');
const ideaMeter = document.querySelector('#ideaMeter');
const simSummary = document.querySelector('#simSummary');
const progressPills = document.querySelectorAll('.progress-pill');

const simulationSteps = [
  {
    number: '01',
    label: 'Dolazak s idejom',
    title: 'Počinješ s korisnom, ali još širokom idejom.',
    text: 'Želiš razviti rješenje koje školama pomaže vidjeti gdje se troši energija. Ideja zvuči dobro, ali još nije jasno tko ima najveći problem i koja bi promjena stvarno pomogla.',
    mentor: 'Mentor: Krenimo od pitanja. Tko će prvi osjetiti vrijednost rješenja?',
    choices: [
      ['Kreni od razgovora s korisnicima', 'Odlučeno je prvo razumjeti svakodnevne probleme škole.'],
      ['Kreni od tehničkog rješenja', 'Ideja dobiva tehnički smjer, ali mentor traži dokaz stvarne potrebe.']
    ]
  },
  {
    number: '02',
    label: 'Razgovor s mentorom',
    title: 'Mentor ti pomaže suziti problem.',
    text: 'Umjesto razvoja velike platforme, razgovarate o jednoj situaciji: učionice ostaju osvijetljene i nakon nastave. To je dovoljno konkretno za prvu provjeru.',
    mentor: 'Mentor: Dobra rana ideja ne mora biti velika. Mora biti dovoljno jasna da je možeš provjeriti.',
    choices: [
      ['Smanji opseg ideje', 'Fokus se sužava na jednu školsku zonu i jedan mjerljiv problem.'],
      ['Zadrži širi koncept', 'Koncept ostaje ambiciozan, ali treba više podataka prije razvoja.']
    ]
  },
  {
    number: '03',
    label: 'Zadatak s radionice',
    title: 'Mapiraš korisnika, problem i dokaz.',
    text: 'Na radionici zapisuješ tko odlučuje, tko koristi prostor i tko vidi korist od promjene. Ideja se pretvara u pretpostavku koju možeš testirati.',
    mentor: 'Zadatak: napiši jednu pretpostavku koju bi mogao provjeriti u tjedan dana.',
    choices: [
      ['Testiraj ponašanje korisnika', 'Pretpostavka: nastavnici i domari mogu brzo uočiti nepotrebnu potrošnju.'],
      ['Testiraj interes uprave', 'Pretpostavka: ravnateljstvo želi jednostavan pregled potrošnje prije ulaganja.']
    ]
  },
  {
    number: '04',
    label: 'Jednostavni alat',
    title: 'Koristiš alat za procjenu potencijala ideje.',
    text: 'Alat ne donosi odluku umjesto tebe. Pomaže ti usporediti jasnoću problema, dostupnost korisnika, izvedivost prototipa i dokaz vrijednosti.',
    mentor: 'AI Lab: rezultat nije ocjena, nego popis pitanja koja trebaš razjasniti.',
    choices: [
      ['Pogledaj rizike', 'Najveći rizik je pristup stvarnim podacima i dogovor s korisnicima.'],
      ['Pogledaj prilike', 'Najveća prilika je brz pilot s jednostavnim mjerenjem i jasnom uštedom.']
    ]
  },
  {
    number: '05',
    label: 'Povratna informacija',
    title: 'Dobivaš realniji pogled na ideju.',
    text: 'Mentor i potencijalni korisnik ističu da školi nije potreban složen sustav, nego jasan prikaz problema i prijedlog prvih promjena.',
    mentor: 'Feedback: počni s dokazom vrijednosti, ne s kompletnim proizvodom.',
    choices: [
      ['Pripremi mali pilot', 'Ideja se okreće prema pilot-prototipu u jednoj zoni škole.'],
      ['Pripremi kratku prezentaciju', 'Ideja se oblikuje u jasan prijedlog za odluku i podršku.']
    ]
  },
  {
    number: '06',
    label: 'Prilagodba ideje',
    title: 'Ideja izlazi iz simulacije jasnija nego što je ušla.',
    text: 'Nakon nekoliko koraka znaš što treba provjeriti, kome se obratiti i koji bi najmanji prototip imao smisla. To je tipičan ishod predinkubacije.',
    mentor: 'Sljedeći korak: razviti dalje, doraditi ideju ili promijeniti smjer na temelju dokaza.',
    choices: [
      ['Pogledaj sažetak puta', 'Simulacija završena.'],
      ['Kreni ponovno', 'reset']
    ]
  }
];

let simulationIndex = 0;
let simulationLog = ['Početna ideja: praćenje potrošnje energije u školama.'];

const renderSimulation = () => {
  if (!simulationCard || !simChoices) return;
  const step = simulationSteps[simulationIndex];
  simStepNumber.textContent = step.number;
  simStepLabel.textContent = step.label;
  simTitle.textContent = step.title;
  simText.textContent = step.text;
  simMentor.textContent = step.mentor;
  simChoices.innerHTML = '';
  progressPills.forEach((pill, index) => pill.classList.toggle('active', index === simulationIndex));
  if (ideaMeter) ideaMeter.style.width = `${Math.max(14, ((simulationIndex + 1) / simulationSteps.length) * 100)}%`;
  step.choices.forEach(([label, log], choiceIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `sim-choice${choiceIndex ? ' secondary' : ''}`;
    button.textContent = label;
    button.addEventListener('click', () => {
      if (log === 'reset') {
        simulationIndex = 0;
        simulationLog = ['Početna ideja: praćenje potrošnje energije u školama.'];
        if (simSummary) simSummary.hidden = true;
        renderSimulation();
        return;
      }
      simulationLog.push(log);
      if (ideaLog) {
        ideaLog.innerHTML = simulationLog.map((item) => `<li>${item}</li>`).join('');
      }
      if (simulationIndex < simulationSteps.length - 1) {
        simulationIndex += 1;
        renderSimulation();
      } else if (simSummary) {
        simSummary.hidden = false;
        simSummary.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    simChoices.appendChild(button);
  });
};

renderSimulation();

const successSlides = document.querySelectorAll('.success-slide');
const successDots = document.querySelectorAll('.success-dots button');
successDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    successSlides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
    successDots.forEach((item, dotIndex) => item.classList.toggle('active', dotIndex === index));
  });
});

const showLoginPassword = document.querySelector('#showLoginPassword');
const loginPassword = document.querySelector('#loginPassword');
showLoginPassword?.addEventListener('change', () => {
  if (loginPassword) loginPassword.type = showLoginPassword.checked ? 'text' : 'password';
});

const lmsSearch = document.querySelector('#lmsCourseSearch');
const lmsArea = document.querySelector('#lmsCourseArea');
const lmsCards = document.querySelectorAll('[data-course-card]');

const filterLmsCourses = () => {
  const query = (lmsSearch?.value || '').trim().toLowerCase();
  const area = lmsArea?.value || 'all';

  lmsCards.forEach((card) => {
    const matchesText = !query || card.textContent.toLowerCase().includes(query);
    const matchesArea = area === 'all' || card.dataset.area === area;
    card.hidden = !(matchesText && matchesArea);
  });
};

lmsSearch?.addEventListener('input', filterLmsCourses);
lmsArea?.addEventListener('change', filterLmsCourses);

const ideaPath = document.querySelector('[data-idea-path]');
if (ideaPath) {
  const steps = Array.from(ideaPath.querySelectorAll('.idea-path-step'));
  const title = ideaPath.querySelector('[data-idea-title]');
  const copy = ideaPath.querySelector('[data-idea-copy]');
  const stage = ideaPath.querySelector('[data-idea-stage]');
  let activeIdeaIndex = 0;
  let ideaPathTimer;

  const activateIdeaStep = (index) => {
    const step = steps[index];
    if (!step) return;
    activeIdeaIndex = index;
    steps.forEach((item, itemIndex) => {
      const isActive = itemIndex === index;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    title.textContent = step.dataset.title;
    if (stage) stage.textContent = `${step.dataset.title} — ${step.dataset.stage}`;
    copy.textContent = step.dataset.copy;
    ideaPath.classList.toggle('show-outcomes', index === steps.length - 1);
  };

  const startIdeaPathAuto = () => {
    window.clearInterval(ideaPathTimer);
    ideaPathTimer = window.setInterval(() => {
      activateIdeaStep((activeIdeaIndex + 1) % steps.length);
    }, 1800);
  };

  steps.forEach((step, index) => {
    const selectStep = () => {
      activateIdeaStep(index);
      startIdeaPathAuto();
    };
    step.addEventListener('mouseenter', selectStep);
    step.addEventListener('focus', selectStep);
    step.addEventListener('click', selectStep);
  });

  activateIdeaStep(0);
  startIdeaPathAuto();
}
