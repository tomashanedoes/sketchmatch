export const audiences = {
  children: {
    label: 'Kinderen',
    eyebrow: 'Voor kleine handen',
    description: 'Eenvoudige vormen uit de wereld om je heen.',
  },
  adults: {
    label: 'Volwassenen',
    eyebrow: 'Voor een eigen moment',
    description: 'Een rustige aanleiding om te kijken en te tekenen.',
  },
};

export const prompts = [
  {
    id: 'apple',
    audience: 'children',
    title: 'Een appel',
    invitation: 'Teken een ronde appel. Misschien geef je hem een steeltje en een blaadje.',
    shape: 'apple',
  },
  {
    id: 'sun',
    audience: 'children',
    title: 'De zon',
    invitation: 'Begin met een cirkel en laat de zonnestralen rustig naar buiten groeien.',
    shape: 'sun',
  },
  {
    id: 'snail',
    audience: 'children',
    title: 'Een slak',
    invitation: 'Teken eerst het huisje met zijn spiraal. Daarna mag de slak op pad.',
    shape: 'snail',
  },
  {
    id: 'leaf',
    audience: 'children',
    title: 'Een blad',
    invitation: 'Kijk naar de vorm van een blad. Welke lijnen lopen er vanuit het hart?',
    shape: 'leaf',
  },
  {
    id: 'tree',
    audience: 'adults',
    title: 'Een jonge boom',
    invitation: 'Teken de stam als een rustige opgaande lijn. Laat de takken hun eigen richting zoeken.',
    shape: 'tree',
  },
  {
    id: 'shell',
    audience: 'adults',
    title: 'Een schelp',
    invitation: 'Begin klein in het midden en laat een lijn langzaam naar buiten draaien.',
    shape: 'shell',
  },
  {
    id: 'vase',
    audience: 'adults',
    title: 'Een vaas met tak',
    invitation: 'Zoek eerst de stille vorm van de vaas. Voeg daarna één tak toe.',
    shape: 'vase',
  },
  {
    id: 'hills',
    audience: 'adults',
    title: 'Een landschap',
    invitation: 'Laat drie zachte heuvels achter elkaar verschijnen. Waar valt het licht?',
    shape: 'hills',
  },
];

export function getPrompt(audience, excludedIds = []) {
  const choices = prompts.filter(
    (prompt) => prompt.audience === audience && !excludedIds.includes(prompt.id),
  );
  const available = choices.length ? choices : prompts.filter((prompt) => prompt.audience === audience);

  return available[Math.floor(Math.random() * available.length)];
}
