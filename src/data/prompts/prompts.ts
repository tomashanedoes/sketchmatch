import type { Audience, AudienceInfo, Prompt } from './types';

export const audiences: Record<Audience, AudienceInfo> = {
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

export const prompts: Prompt[] = [
  {
    id: 'apple',
    audience: 'children',
    title: 'Een appel',
    invitation: 'Teken een ronde appel. Misschien geef je hem een steeltje en een blaadje.',
    shape: 'apple',
    category: 'natuur',
    difficulty: 'zacht',
    description: 'Een eenvoudige ronde appel met een steeltje.',
    active: true,
  },
  {
    id: 'sun',
    audience: 'children',
    title: 'De zon',
    invitation: 'Begin met een cirkel en laat de zonnestralen rustig naar buiten groeien.',
    shape: 'sun',
    category: 'lucht',
    difficulty: 'zacht',
    description: 'Een ronde zon met stralen.',
    active: true,
  },
  {
    id: 'snail',
    audience: 'children',
    title: 'Een slak',
    invitation: 'Teken eerst het huisje met zijn spiraal. Daarna mag de slak op pad.',
    shape: 'snail',
    category: 'dieren',
    difficulty: 'zacht',
    description: 'Een slak met een rond huisje.',
    active: true,
  },
  {
    id: 'leaf',
    audience: 'children',
    title: 'Een blad',
    invitation: 'Kijk naar de vorm van een blad. Welke lijnen lopen er vanuit het hart?',
    shape: 'leaf',
    category: 'natuur',
    difficulty: 'zacht',
    description: 'Een blad met een nerf in het midden.',
    active: true,
  },
  {
    id: 'tree',
    audience: 'adults',
    title: 'Een jonge boom',
    invitation: 'Teken de stam als een rustige opgaande lijn. Laat de takken hun eigen richting zoeken.',
    shape: 'tree',
    category: 'natuur',
    difficulty: 'verdiepend',
    description: 'Een jonge boom met stam en vertakkende takken.',
    active: true,
  },
  {
    id: 'shell',
    audience: 'adults',
    title: 'Een schelp',
    invitation: 'Begin klein in het midden en laat een lijn langzaam naar buiten draaien.',
    shape: 'shell',
    category: 'natuur',
    difficulty: 'verdiepend',
    description: 'Een schelp met een draaiende lijn.',
    active: true,
  },
  {
    id: 'vase',
    audience: 'adults',
    title: 'Een vaas met tak',
    invitation: 'Zoek eerst de stille vorm van de vaas. Voeg daarna één tak toe.',
    shape: 'vase',
    category: 'thuis',
    difficulty: 'verdiepend',
    description: 'Een stille vaas met een enkele tak.',
    active: true,
  },
  {
    id: 'hills',
    audience: 'adults',
    title: 'Een landschap',
    invitation: 'Laat drie zachte heuvels achter elkaar verschijnen. Waar valt het licht?',
    shape: 'hills',
    category: 'landschap',
    difficulty: 'verdiepend',
    description: 'Drie zachte heuvels in een landschap.',
    active: true,
  },
];

export function getCategories(audience: Audience): string[] {
  return [
    ...new Set(
      prompts
        .filter((prompt) => prompt.audience === audience && prompt.active)
        .map((prompt) => prompt.category),
    ),
  ];
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.id === id);
}

export function filterPrompts(
  audience: Audience,
  excludedIds: string[] = [],
  categories: string[] = [],
): Prompt[] {
  const filtered = prompts.filter(
    (prompt) =>
      prompt.audience === audience &&
      prompt.active &&
      !excludedIds.includes(prompt.id) &&
      (!categories.length || categories.includes(prompt.category)),
  );

  if (filtered.length) return filtered;

  return prompts.filter(
    (prompt) =>
      prompt.audience === audience &&
      prompt.active &&
      (!categories.length || categories.includes(prompt.category)),
  );
}

export function getPrompt(
  audience: Audience,
  excludedIds: string[] = [],
  categories: string[] = [],
): Prompt {
  const available = filterPrompts(audience, excludedIds, categories);
  return available[Math.floor(Math.random() * available.length)];
}
