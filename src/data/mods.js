// Known categories get a hand-picked color + icon shape. Add an entry here if
// you want a new category to look distinct instead of falling back to the
// generic circle/hashed-hue treatment below.
export const CAT_LABELS = {
  tech: 'Tech',
  storage: 'Storage',
  magic: 'Magic',
  exploration: 'Exploration',
  food: 'Food',
  combat: 'Combat',
  decoration: 'Decoration',
  villagers: 'Villagers',
};

const CAT_HUES = {
  all: 195,
  tech: 205,
  storage: 250,
  magic: 300,
  exploration: 140,
  food: 45,
  combat: 15,
  decoration: 85,
  villagers: 330,
};

const CAT_CLIP = {
  storage: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  magic: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  exploration: 'polygon(50% 0%, 100% 100%, 0% 100%)',
};

// Deterministic fallback hue so an unrecognized category (e.g. one you add
// yourself) still gets a stable, distinct color instead of always gray.
function hashHue(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 360;
  return hash;
}

function hue(key) {
  return CAT_HUES[key] ?? hashHue(key);
}

export function catColor(key) {
  return `oklch(0.75 0.15 ${hue(key)})`;
}
export function catColorBg(key) {
  return `oklch(0.75 0.15 ${hue(key)} / 0.14)`;
}
export function catColorBorder(key) {
  return `oklch(0.75 0.15 ${hue(key)} / 0.4)`;
}

export function catIconRadius(key) {
  return key === 'food' ? '50%' : key === 'tech' ? '8px' : '0';
}
export function catIconClip(key) {
  return CAT_CLIP[key] || 'none';
}

export function catLabel(key) {
  return CAT_LABELS[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

// Guide steps may be authored as plain strings (title only) or objects with
// { title, detail } — normalize to the object form for rendering.
export function normalizeStep(step) {
  return typeof step === 'string' ? { title: step, detail: '' } : { detail: '', ...step };
}

// ---------------------------------------------------------------------------
// Mod data. Add your own mods here — this is the only file you need to touch
// to grow the codex. Shape of one entry:
//
// {
//   id: 'kebab-case-unique-id',       // used in the URL: /mod/<id>
//   name: 'Display Name',
//   category: 'tech',                 // any string; pick one of CAT_LABELS
//                                      // above for a hand-picked color, or
//                                      // use a new word — it still works.
//   description: 'One or two sentences shown on the card and detail hero.',
//   guideUrl: 'https://...',          // optional external guide/wiki link
//                                      //  (e.g. minecraft-guides.com); shows
//                                      //  a button on the detail hero
//   machines: [{ name: '...', desc: '...' }, ...],
//   recipes: [{ ingredients: '...', output: '...' }, ...],
//   guides: [                          // one or more step-by-step guides,
//     {                                //  each with its own checkable steps
//       id: 'progression',             // stable key for saved progress; keep
//                                      //  the first guide's id 'progression'
//       title: 'Core Progression',
//       steps: [
//         { title: 'Short step name', detail: 'Longer how/why text.' },
//         'A plain string also works (title only).',
//       ],
//     },
//   ],
//   resourceChains: [{ resource: '...', chain: '...' }, ...],
//   tips: ['...', '...'],
// }
// ---------------------------------------------------------------------------
export const MODS = [
  {
    id: 'immersive-engineering',
    guideUrl: 'https://www.minecraft-guides.com/mod/immersive-engineering/',
    name: 'Immersive Engineering',
    category: 'tech',
    description:
      'Grounded, retro-industrial machines built from real-looking multiblock structures — power lines, high explosives, and a revolver to boot.',
    machines: [
      { name: "Engineer's Blast Furnace", desc: 'Multiblock furnace that smelts Iron + Coal Coke into Steel.' },
      { name: 'Metal Press', desc: 'Stamps ingots into plates, rods, and gears using swappable molds.' },
      { name: 'Arc Furnace', desc: 'Late-game multiblock for alloys and recycling scrap into ingots.' },
    ],
    recipes: [
      { ingredients: '4x Iron Ingot, 2x Coal Coke', output: 'Steel Ingot' },
      { ingredients: '1x Steel Ingot, Mold: Plate', output: 'Steel Plate' },
      { ingredients: '6x Steel Ingot, 4x Electrum', output: "Engineer's Hammer" },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: "Craft an Engineer's Hammer",
            detail:
              'The Hammer is required to form every IE multiblock — you right-click the finished structure with it to assemble the machine. Keep one on your hotbar for the whole playthrough.',
          },
          {
            title: 'Build a Coke Oven',
            detail:
              'The Coke Oven slowly converts Coal into Coal Coke (a better furnace fuel and the key Blast Furnace ingredient) and produces Creosote Oil as a byproduct for Treated Wood.',
          },
          {
            title: 'Assemble the Blast Furnace',
            detail:
              'The Crude Blast Furnace multiblock smelts Iron with Coal Coke into Steel — the gateway material for nearly every IE machine that follows.',
          },
          {
            title: 'Set up a Metal Press',
            detail:
              'With swappable molds, the Metal Press stamps ingots into Plates, Rods, and Gears. Batch-produce plates early; almost every recipe wants them.',
          },
          {
            title: 'Wire up base power',
            detail:
              "Start with a Kinetic Dynamo (windmill/water wheel) or jump to a Diesel Generator, then run wire coils to your machines. Use the Engineer's Wire Cutters to manage connections.",
          },
        ],
      },
      {
        id: 'coke-oven',
        title: 'Build a Coke Oven',
        steps: [
          {
            title: 'Craft 27 Coke Oven Bricks',
            detail: 'Coke Oven Bricks are crafted from Clay, Bricks, and Sandstone — cheap early-game materials. You need 27 for one oven.',
          },
          {
            title: 'Place a solid 3×3×3 cube',
            detail: 'Stack the bricks into a full 3×3×3 cube (no hollow center). Orientation does not matter yet.',
          },
          {
            title: "Form the multiblock with the Engineer's Hammer",
            detail: 'Right-click the center block of any face with the Hammer. The structure visibly changes and gains a door — it is now one working machine.',
          },
          {
            title: 'Load Coal and wait',
            detail: 'Insert Coal through the interface. Each piece slowly bakes into Coal Coke, with Creosote Oil accumulating in the internal tank.',
          },
          {
            title: 'Drain the Creosote and automate',
            detail: 'Pull Creosote out with fluid containers or pipes and use it with Wooden Planks to make Treated Wood. Hopper Coal in and Coke out to keep it running unattended.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Iron', chain: 'Raw Iron → Crusher (optional) → Blast Furnace → Steel Ingot → Metal Press → Steel Plate' },
      { resource: 'Oil', chain: 'Excavator / Pump → Crude Oil → Refinery → Diesel or Plastic' },
    ],
    tips: [
      'Wire Coils only connect when placed with the Wire Coil item, not just adjacent blocks.',
      'Check blast radius before placing Engineering explosives — they are not toys.',
      'The Revolver accepts different barrels, hammers, and drums — mix and match for range vs. rate of fire.',
    ],
  },
  {
    id: 'applied-energistics-2',
    name: 'Applied Energistics 2',
    category: 'storage',
    description: 'A digital storage and crafting network — one cable run replaces a wall of chests.',
    machines: [
      { name: 'ME Controller', desc: 'Backbone of the network; links drives, terminals, and cables.' },
      { name: 'ME Drive', desc: 'Houses storage cells that hold thousands of item types.' },
      { name: 'Molecular Assembler', desc: 'Auto-crafts recipes submitted from the ME Terminal.' },
    ],
    recipes: [
      { ingredients: '1x Quartz Glass, 1x Certus Quartz Crystal', output: 'Charged Certus Quartz' },
      { ingredients: '4x Certus Quartz, 4x Redstone', output: 'ME Cable (16x)' },
      { ingredients: '1x Logic Processor, 1x Engineering Processor', output: 'ME Drive' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Mine Certus Quartz and craft ME Cable',
            detail:
              'Certus Quartz is the foundational AE2 resource. Charge it in a Charger, combine with Nether Quartz and Redstone for Fluix, and craft your first run of Glass Cable.',
          },
          {
            title: 'Build a starter network',
            detail:
              'A Controller, an ME Drive with a 1k Storage Cell, and an ME Terminal on a short cable run gives you searchable digital storage. Power it with an Energy Acceptor from any FE source.',
          },
          {
            title: 'Set up an Inscriber line',
            detail:
              'Inscribers stamp Logic, Calculation, and Engineering Processors from Gold, Certus, and Diamond using their Presses (found in meteorites). Everything advanced needs processors — automate them early.',
          },
          {
            title: 'Absorb your old storage',
            detail:
              'Put Storage Buses on your existing chests and drawers to expose their contents through the ME Terminal without moving a single item.',
          },
          {
            title: 'Automate crafting',
            detail:
              'Encode Patterns, put them in Pattern Providers feeding Molecular Assemblers, and the network crafts on demand — request 200 cable and walk away.',
          },
        ],
      },
      {
        id: 'autocrafting',
        title: 'Set Up Autocrafting',
        steps: [
          {
            title: 'Craft a Pattern Encoding Terminal',
            detail: 'Upgrade a standard terminal so you can turn Blank Patterns into encoded crafting patterns for any recipe.',
          },
          {
            title: 'Encode your first Patterns',
            detail: 'Lay out the recipe in the encoding grid and encode it onto a Blank Pattern — start with things you craft constantly, like cables and processors.',
          },
          {
            title: 'Place Pattern Providers with Molecular Assemblers',
            detail: 'A Pattern Provider holding your patterns, with Molecular Assemblers touching each face, is the basic autocrafting engine. One provider can drive several assemblers.',
          },
          {
            title: 'Add a Crafting CPU',
            detail: 'Build a small multiblock of Crafting Storage (and Co-Processing Units for parallelism). The CPU plans and buffers multi-step jobs.',
          },
          {
            title: 'Request a craft from the terminal',
            detail: 'Search the item, click it, set a quantity, and watch the network resolve the whole dependency tree — including intermediate steps — on its own.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Certus Quartz', chain: 'Certus Quartz Ore → Charged (Charger) → Cable/Processor components' },
      { resource: 'Fluix', chain: 'Certus Quartz + Redstone + Nether Quartz → Growth Accelerator → Fluix Crystal' },
    ],
    tips: [
      'The network needs energy (AE) even before it needs an actual Controller.',
      "Storage Cells are tiered — don't waste a 64k cell on a low-value overflow chest.",
      'Pattern Providers replace the old Interface for crafting automation.',
    ],
  },
  {
    id: 'create',
    guideUrl: 'https://www.minecraft-guides.com/wiki/create/',
    name: 'Create',
    category: 'tech',
    description: 'Mechanical, physically-animated contraptions — rotating shafts, gearboxes, and moving trains, all visible in the world.',
    machines: [
      { name: 'Mechanical Press', desc: 'Flattens ingots into plates using rotational power.' },
      { name: 'Millstone', desc: 'Grinds items — ores, food, and more — with kinetic power.' },
      { name: 'Sequenced Gearshift / Contraptions', desc: 'Drives moving assemblies like carts and elevators.' },
    ],
    recipes: [
      { ingredients: '1x Andesite Alloy, 1x Shaft', output: 'Cogwheel' },
      { ingredients: '2x Andesite Alloy, 1x Water Wheel base', output: 'Water Wheel' },
      { ingredients: '1x Iron Ingot (via Mechanical Press)', output: 'Iron Sheet' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Build a Water Wheel or Windmill',
            detail:
              'Early rotational power is free: a Water Wheel on flowing water, or a Windmill Bearing with wool/sail blocks. Windmills scale with sail count if you need more stress capacity.',
          },
          {
            title: 'Distribute power with Shafts and Cogwheels',
            detail:
              'Chain Shafts for straight runs, Cogwheels to turn corners and change speed — a large cog driving a small one doubles speed at the cost of doubled stress.',
          },
          {
            title: 'Add a Millstone and Mechanical Press',
            detail:
              'These two unlock basic processing: grinding ores and grains, and pressing ingots into Sheets that Create recipes use everywhere.',
          },
          {
            title: 'Build a Mechanical Crafter line',
            detail:
              'Brass-tier Mechanical Crafters arranged in a grid automate shaped recipes. They need Brass, so set up a Mixer for Zinc + Copper first.',
          },
          {
            title: 'Graduate to Trains',
            detail:
              'Lay Track, build a Station, assemble a locomotive with a Train Controls block, and give it a Schedule — trains can haul players, items, and fluids between bases.',
          },
        ],
      },
      {
        id: 'ore-processing',
        title: 'Automate Ore Processing',
        steps: [
          {
            title: 'Build Crushing Wheels',
            detail: 'A pair of counter-rotating Crushing Wheels crushes raw ore into Crushed Ore — the entry point for doubling your ore yield.',
          },
          {
            title: 'Wash Crushed Ore with an Encased Fan',
            detail: 'An Encased Fan blowing through water ("bulk washing") turns Crushed Ore into metal nuggets with a bonus chance — free extra ingots.',
          },
          {
            title: 'Belt the stages together',
            detail: 'Feed ore in with Mechanical Belts and Chutes: hopper → Crushing Wheels → belt through the washing zone → collection.',
          },
          {
            title: 'Smelt and store the output',
            detail: 'Route washed nuggets into furnaces (or a Bulk Blasting setup with a lava fan) and send finished ingots to your storage system.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Andesite Alloy', chain: 'Andesite + Iron Nugget (or Zinc) → Andesite Alloy → Shafts/Cogwheels' },
      { resource: 'Brass', chain: 'Zinc + Copper → Mixing → Brass Ingot → advanced machine casings' },
    ],
    tips: [
      "Speed and Stress are separate resources — check a machine's Stress rating before chaining it on.",
      'Contraptions (moving structures) need a controller like a Piston or Bearing to actually move.',
      "Copper doesn't need Zinc for basic parts — only Brass does.",
    ],
  },
  {
    id: 'farmers-delight',
    guideUrl: 'https://www.minecraft-guides.com/mod/farmers-delight/',
    name: "Farmer's Delight",
    category: 'food',
    description: 'A cozy cooking expansion — new crops, a cutting board, cooking pot, and hearty multi-ingredient meals.',
    machines: [
      { name: 'Cutting Board', desc: 'Slices food/ingredients with a knife for prep steps.' },
      { name: 'Cooking Pot', desc: 'Combines multiple ingredients into a stew or hearty meal.' },
      { name: 'Smoker Extension', desc: 'Villager-adjacent block for smoking meats faster.' },
    ],
    recipes: [
      { ingredients: '1x Wheat, 1x Egg, 1x Milk', output: 'Pie Crust → Fruit/Meat Pie' },
      { ingredients: '3x Vegetables + 1x Broth', output: 'Vegetable Soup (Cooking Pot)' },
      { ingredients: '1x Wheat Dough, Cutting Board', output: 'Pasta / Noodle base' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Plant the new crops early',
            detail:
              'Tomatoes, Onions, Cabbage, and Rice feed most recipes. Get seeds in the ground on day one — Rice grows in water like sugar cane.',
          },
          {
            title: 'Craft a Cutting Board',
            detail:
              'With a knife, the Cutting Board handles prep work: slicing meat into portions, making dough, and splitting ingredients for better yields than raw crafting.',
          },
          {
            title: 'Add a Cooking Pot',
            detail:
              'Place it over a heat source (campfire or stove) and combine multiple ingredients into stews and meals that grant nourishment buffs plain food never gives.',
          },
          {
            title: 'Set up faster meat processing',
            detail: 'A dedicated smoking/cooking station keeps raw meat moving — cook in bulk so hearty meal ingredients are always stocked.',
          },
          {
            title: 'Cook higher-tier meals',
            detail:
              'Late recipes with more ingredients give longer, stronger buffs. Keep a stack of top-tier meals for mining trips and boss fights.',
          },
        ],
      },
      {
        id: 'first-kitchen',
        title: 'Set Up a Kitchen',
        steps: [
          {
            title: 'Build a heat source',
            detail: 'A campfire or stove provides the heat the Cooking Pot needs — put it where the pot will sit before anything else.',
          },
          {
            title: 'Place the Cutting Board and craft a knife',
            detail: 'The board plus a knife handles all prep work: slicing meat into portions, making dough, and splitting ingredients.',
          },
          {
            title: 'Set the Cooking Pot over the heat',
            detail: 'Place the pot directly above the campfire or stove — it only cooks while heated from below.',
          },
          {
            title: 'Stock the larder',
            detail: 'Keep chests of Tomatoes, Onions, Cabbage, Rice, and meats next to the station so every recipe is within reach.',
          },
          {
            title: 'Cook your first stew',
            detail: 'Start simple: three vegetables and broth make Vegetable Soup. Once that works, move up to the multi-ingredient feasts.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Wheat Dough', chain: 'Wheat + Water (Cutting Board) → Wheat Dough → Pasta/Pie Crust' },
      { resource: 'Broth', chain: 'Meat/Bones + Water (Cooking Pot) → Broth → Soups & Stews' },
    ],
    tips: [
      'Cooking Pot meals give a longer, stacked saturation buff versus vanilla food.',
      'Rice needs to be grown in water, similar to sugar cane placement.',
      'Most recipes are forgiving on ingredient substitution — check the book for valid swaps.',
    ],
  },
  {
    id: 'silent-gear',
    guideUrl: 'https://www.minecraft-guides.com/mod/silent-gear/',
    name: 'Silent Gear',
    category: 'tech',
    description:
      'A parts-based tool and armor system — every pickaxe, sword, or chestplate is built from separately crafted heads, rods, and extras, with stats driven entirely by the materials you choose.',
    machines: [
      { name: 'Salvager', desc: 'Breaks finished tools and armor back down into their component parts and materials, letting you reclaim resources when upgrading to a new tier.' },
      { name: 'Material Grader', desc: 'Refines raw materials, pushing their quality grade from E up through S, SS, SSS and MAX for stronger stat rolls in the parts built from them.' },
      { name: 'Blueprints', desc: 'Consumable templates (Tool Rod, Sword Blade, Pickaxe Head, etc.) that turn any eligible material into a specific gear part when crafted together.' },
      { name: 'Part Assembly', desc: 'Combine a main part (head or blade), a rod, and optional extras like a bowstring or coating on a crafting table to finish a usable tool or weapon.' },
    ],
    recipes: [
      { ingredients: 'Tool Rod Blueprint, 2x Wood Planks (or other material)', output: 'Wooden Tool Rod' },
      { ingredients: 'Pickaxe Head Blueprint, 2x Iron Ingot', output: 'Iron Pickaxe Head' },
      { ingredients: 'Iron Pickaxe Head, Wooden Tool Rod', output: 'Assembled Iron Pickaxe (stats set by the parts used)' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Open the starter Blueprint Package',
            detail:
              'You spawn with a Blueprint Package containing Tool Rod, Pickaxe, Shovel, Axe, Hoe, and Sword blueprints — the templates every part is crafted through.',
          },
          {
            title: 'Assemble your first tool set',
            detail:
              'Craft rods and heads from wood, stone, or iron using the blueprints, then combine a head with a rod on any crafting grid. The stats come entirely from the materials you picked.',
          },
          {
            title: 'Build a Salvager',
            detail:
              'The Salvager breaks finished tools back into their parts and materials, so upgrading to a better head never wastes the old investment.',
          },
          {
            title: 'Set up a Material Grader',
            detail:
              'Grading pushes material quality from E toward MAX, and higher grades roll stronger stat bonuses. Grade before you build anything expensive.',
          },
          {
            title: "Mine Silent Gear's own metals",
            detail:
              'Crimson Iron (Nether) and Azure Silver (End) unlock higher-tier parts with traits vanilla materials cannot match.',
          },
          {
            title: 'Mix materials for hybrid stats',
            detail:
              "A tool's head, rod, and extras each contribute stats and traits — pair a hard-hitting head with a lightweight rod to balance speed, durability, and special effects.",
          },
        ],
      },
      {
        id: 'first-pickaxe',
        title: 'Forge a Custom Pickaxe',
        steps: [
          {
            title: 'Choose your head material',
            detail: 'The head sets harvest tier, speed, and most of the durability — compare tooltips before committing your ingots.',
          },
          {
            title: 'Craft the Pickaxe Head',
            detail: 'Combine the Pickaxe Head Blueprint with your chosen material (e.g. 2x Iron Ingot) in the crafting grid.',
          },
          {
            title: 'Craft a Tool Rod',
            detail: 'The Tool Rod Blueprint plus planks (or a fancier material) makes the handle — lighter rods trade durability for other bonuses.',
          },
          {
            title: 'Assemble head and rod',
            detail: 'Put the head and rod together on any crafting grid. The finished pickaxe inherits every stat and trait from its parts.',
          },
          {
            title: 'Inspect, then iterate',
            detail: 'Read the tooltip to see the stat rolls you got. Not happy? Salvage it and rebuild with graded or higher-tier materials — nothing is wasted.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Iron', chain: 'Iron Ore → Furnace → Iron Ingot → Blueprint + Ingots → Gear Part (Head/Blade) → Assemble with Rod → Finished Tool' },
      { resource: 'Old Gear', chain: 'Outdated Tool/Armor → Salvager → Reclaimed Parts and Materials → Reinvested into new, higher-grade gear' },
    ],
    tips: [
      "Mixing materials between a tool's head and rod lets you combine two different stat bonuses, like a hard-hitting head on a lightweight rod.",
      'Grade your materials before building expensive top-tier gear — a higher grade can turn a mediocre roll into a great one.',
      'Always run old tools through the Salvager before scrapping them; the parts and materials go straight back into your inventory.',
    ],
  },
  {
    id: 'cataclysm',
    guideUrl: 'https://www.minecraft-guides.com/wiki/cataclysm/',
    name: 'Cataclysm',
    category: 'combat',
    description:
      "A boss-rush combat mod that adds a lineup of towering, mechanically complex bosses — Ignis, the Netherite Monstrosity, the Harbinger, Maledictus, and more — each guarding unique weapons and armor.",
    machines: [
      { name: 'Netherite Monstrosity', desc: 'A Nether brute that hurls lava and hits harder as the fight drags on, enraging into a faster, fire-covered state below a third health.' },
      { name: 'The Harbinger', desc: 'A mechanical Wither variant awakened by inserting a Nether Star into its chest, fighting with missiles, lasers, and devastating charge attacks.' },
      { name: 'Maledictus', desc: 'A winged ghost possessing a suit of armor, with high mobility, powerful melee combos, and multi-phase attack patterns.' },
      { name: 'Ignis', desc: 'A colossal floating armored swordsman wreathed in flame — widely considered the hardest fight the mod offers.' },
    ],
    recipes: [
      { ingredients: 'Ignitium Ingots (dropped by Ignis)', output: 'Ignitium Armor, the Incinerator, or the Bulwark of the Flame' },
      { ingredients: 'Materials dropped by Maledictus', output: 'Twin Annihilator Maces, the Soul Render halberd, or the Cursed Bow' },
      { ingredients: 'Materials dropped by the Harbinger', output: 'Meat Shredder, Laser Gatling, or Wither Assault Shoulder Weapon' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Boss Progression',
        steps: [
          {
            title: 'Gear up before your first boss',
            detail:
              "Most Cataclysm bosses are balanced around Netherite-tier loadouts. Bring enchanted armor, golden apples, and potions — they hit far harder than vanilla mobs.",
          },
          {
            title: 'Defeat the Netherite Monstrosity',
            detail:
              'Found in the Nether, it hurls lava and enrages below a third health. Its drops give an early boost to your combat gear.',
          },
          {
            title: 'Awaken and defeat the Harbinger',
            detail:
              'Insert a Nether Star into its chest cavity to start the fight. It attacks with missiles, lasers, and charges; winning earns the Meat Shredder and Laser Gatling.',
          },
          {
            title: 'Challenge Maledictus',
            detail:
              'A highly mobile, multi-phase armored ghost. Its materials forge the Annihilator maces, the Soul Render halberd, and the Cursed Bow.',
          },
          {
            title: 'Take on Ignis',
            detail:
              "Widely considered the mod's hardest fight — a colossal flame-wreathed swordsman. Victory yields Ignitium Ingots for top-tier gear.",
          },
          {
            title: 'Forge boss gear between fights',
            detail:
              "Turn each boss's drops into their matching armor and weapon sets before moving on to later bosses like Scylla, the Leviathan, and the Ancient Remnant.",
          },
        ],
      },
      {
        id: 'fight-prep',
        title: 'Prepare for a Boss Fight',
        steps: [
          {
            title: 'Max out your gear first',
            detail: 'Netherite-tier armor with strong enchants is the baseline. Bring your best weapon and a backup — fights are long.',
          },
          {
            title: 'Brew a consumables kit',
            detail: 'Golden apples, healing, strength, and (for Nether bosses) fire resistance potions. Stock more than you think you need.',
          },
          {
            title: 'Check the summoning requirement',
            detail: "Some bosses need an item to start — the Harbinger takes a Nether Star in its chest. Confirm before you travel so the trip isn't wasted.",
          },
          {
            title: 'Prepare the arena',
            detail: 'Clear obstacles, light the area, and plan your escape route. Terrain kills as often as the boss does.',
          },
          {
            title: 'Learn the tells before committing',
            detail: 'Every boss telegraphs its big attacks and most enrage at low health. Spend the first phase watching patterns, not chasing damage.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Ignitium', chain: 'Defeat Ignis → Ignitium Ingots → Forge → Ignitium Armor / Incinerator / Bulwark of the Flame' },
      { resource: 'Nether Star', chain: 'Wither kill → Nether Star → Insert into Harbinger → Boss Fight → Meat Shredder / Laser Gatling / Wither Assault Shoulder Weapon' },
    ],
    tips: [
      "Don't fight these bosses in plain diamond gear — most Cataclysm bosses are balanced around Netherite-and-beyond loadouts.",
      "Check each boss's summoning requirements ahead of time, like the Nether Star for the Harbinger, so you don't waste a trip.",
      'Boss fights have multiple phases and enrage thresholds — learn the attack tells before committing to melee range.',
    ],
  },
  {
    id: 'sophisticated-backpacks',
    guideUrl: 'https://www.minecraft-guides.com/mod/sophisticated-backpacks/',
    name: 'Sophisticated Backpacks',
    category: 'storage',
    description:
      'Portable, upgradeable backpacks that carry their own inventory and upgrade slots, turning a single item slot into a mobile storage and automation hub.',
    machines: [
      { name: 'Backpack Tiers', desc: 'Six progressive tiers from Leather up to Netherite, each with more base inventory slots and more upgrade slots.' },
      { name: 'Pickup Upgrade', desc: 'Automatically collects dropped items you walk over straight into the backpack, keeping your hotbar clear while mining or farming.' },
      { name: 'Tank Upgrade', desc: 'Converts backpack slots into fluid storage that holds any liquid, including modded fluids, and scales with Stack Upgrades.' },
      { name: 'Inception Upgrade', desc: 'Lets you store a backpack inside a backpack, nesting specialized storage inside a single master backpack.' },
    ],
    recipes: [
      { ingredients: '4x Leather, 4x String, 1x Chest', output: 'Leather Backpack' },
      { ingredients: '4x Iron Ingot, 1x Leather Backpack', output: 'Upgrade Base (used to craft most upgrades)' },
      { ingredients: '1x Upgrade Base, 1x Hopper', output: 'Pickup Upgrade' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Craft a Leather Backpack',
            detail: 'Four Leather, four String, and a Chest gets you portable storage that keeps its contents when you die (config-dependent) and never clutters your inventory.',
          },
          {
            title: 'Upgrade through the tiers',
            detail: 'Iron, Gold, Diamond, and Netherite tiers each add inventory slots and upgrade slots. Upgrading in-place keeps everything inside.',
          },
          {
            title: 'Add a Pickup Upgrade',
            detail: 'Drops from mining, farming, or fighting get vacuumed straight into the backpack. Pair it with filters to keep junk out of your main inventory.',
          },
          {
            title: 'Add a Tank Upgrade',
            detail: 'Converts slots into fluid storage — haul lava, water, or modded fluids without juggling buckets.',
          },
          {
            title: 'Slot in Stack Upgrades',
            detail: 'Each Stack Upgrade multiplies per-slot capacity, and the multiplier applies to Tank Upgrades too — install before filling.',
          },
          {
            title: 'Nest with an Inception Upgrade',
            detail: 'Store specialized backpacks inside one master backpack and access them all without unpacking anything.',
          },
        ],
      },
      {
        id: 'mining-backpack',
        title: 'Build a Mining Backpack',
        steps: [
          {
            title: 'Upgrade to Iron tier or better',
            detail: 'Higher tiers add the upgrade slots this build needs — Leather alone will not fit the full loadout.',
          },
          {
            title: 'Slot a Pickup Upgrade',
            detail: 'Every ore, cobble, and drop you mine over gets vacuumed straight in — your hotbar stays clean for tools.',
          },
          {
            title: 'Filter what gets picked up',
            detail: 'Configure the pickup filter so ores and valuables come in while junk stays on the ground (or void the junk).',
          },
          {
            title: 'Add Stack Upgrades',
            detail: 'Deep mining sessions fill slots fast — Stack Upgrades multiply capacity so one trip carries the whole vein.',
          },
          {
            title: 'Empty it in one click',
            detail: 'Back at base, use the deposit controls against your storage to unload the entire haul at once.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Backpack Tiers', chain: 'Leather Backpack → Iron Backpack → Gold Backpack → Diamond Backpack → Netherite Backpack (more slots and upgrade slots at each step)' },
      { resource: 'Upgrades', chain: 'Upgrade Base + specific item (Hopper/Bucket/Backpack) → Pickup / Tank / Inception Upgrade → Slotted into any compatible backpack' },
    ],
    tips: [
      'Shift-right-click a backpack to open its upgrade and settings screen instead of the main inventory.',
      'Stack Upgrades apply to both item slots and Tank Upgrades, so slot one in before filling a backpack with fluids.',
      'Keep a dedicated Pickup Upgrade backpack for farming runs so drops never clutter your hotbar.',
    ],
  },
  {
    id: 'storage-drawers',
    name: 'Storage Drawers',
    category: 'storage',
    description:
      'Bulk, low-lag block storage where each drawer shows exactly what and how much it holds on its front face, linked together with trim and controllers into large, browsable stockpiles.',
    machines: [
      { name: '1x1 / 2x2 / 4x4 Drawers', desc: 'Wooden drawer blocks holding 1, 4, or 16 item slots respectively, each face displaying the stored item and a live item count.' },
      { name: 'Compacting Drawer', desc: 'Stores a material across its compressed forms at once — nuggets, ingots, and blocks — letting you insert or withdraw whichever form you need.' },
      { name: 'Drawer Controller', desc: 'Links a whole network of connected drawers into one interface, with a default 12-block reach across a 25x25x25 area of chained drawers and trim.' },
      { name: 'Trim', desc: 'A non-storage connector block used to chain drawers and controllers together or cap off a drawer wall without wasting an extra storage slot.' },
    ],
    recipes: [
      { ingredients: '8x Planks, 1x Chest', output: '1x1 Drawer' },
      { ingredients: '4x Planks, 1x 1x1 Drawer', output: '2x2 Drawer' },
      { ingredients: '8x Sticks, 1x Any Drawer', output: 'Upgrade Template (used to craft Storage, Void, and Redstone Upgrades)' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Craft your first drawers',
            detail:
              'A handful of 1x1 or 2x2 Drawers from planks and a chest starts consolidating bulk stacks — ores, cobble, crops — with the count visible on the face.',
          },
          {
            title: 'Place a Drawer Controller',
            detail:
              'Connect your drawers to a Controller and you can insert into and browse the whole wall from one block — throw a full inventory at it and everything sorts itself.',
          },
          {
            title: 'Extend with Trim',
            detail:
              'Trim is a cheap connector that chains distant drawers back to the Controller (12-block reach by default) without wasting slots on storage you do not need.',
          },
          {
            title: 'Add Storage Upgrades',
            detail: 'Upgrades multiply how many stacks each slot holds — put big upgrades on your highest-volume drawers (cobble, gravel, wheat).',
          },
          {
            title: 'Build Compacting Drawers',
            detail:
              'One Compacting Drawer stores nuggets, ingots, and blocks as a single pool — insert any form, withdraw any form, no manual compression ever again.',
          },
          {
            title: 'Finish with Redstone and Void Upgrades',
            detail: 'Redstone Upgrades emit fill-level signals for automation; Void Upgrades delete overflow so infinite farms never back up.',
          },
        ],
      },
      {
        id: 'drawer-wall',
        title: 'Build a Drawer Wall',
        steps: [
          {
            title: 'Plan the layout',
            detail: 'Bulk items (cobble, dirt, wood) get 1x1 drawers at waist height; variety items get 2x2 and 4x4 higher up. Sketch it before placing.',
          },
          {
            title: 'Place the drawers',
            detail: 'Build the wall face-out so every label is visible. Leave a spot at eye level, center, for the Controller.',
          },
          {
            title: 'Add the Drawer Controller',
            detail: 'One Controller makes the whole wall a single deposit point — shift-click stacks (or double-click to dump matching items) and everything routes itself.',
          },
          {
            title: 'Connect the corners with Trim',
            detail: 'Any drawer more than a block gap away needs Trim to stay linked. It matches the wood style, so the wall still looks uniform.',
          },
          {
            title: 'Upgrade the heavy hitters',
            detail: 'Put Storage Upgrades in the drawers that fill fastest, and a Void Upgrade on cobblestone so mining never backs up.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Cobblestone / Ores', chain: 'Mining → dumped into linked Drawers via Controller → auto-sorted by item type → withdrawn in any quantity from the drawer face' },
      { resource: 'Compressible Materials', chain: 'Raw Ingots → Compacting Drawer → auto-converted pool of Nuggets / Ingots / Blocks → withdraw whichever form you need' },
    ],
    tips: [
      "Shift-scroll on a drawer's front face to quickly pull out a partial stack instead of a whole one.",
      "Size up a drawer's Storage Upgrade before you fill it — swapping upgrades later doesn't lose items, but it's easier to plan ahead.",
      "Use Trim generously; it's cheap and keeps drawer walls connected to a single Controller without eating extra inventory slots.",
    ],
  },
  {
    id: 'create-crafts-additions',
    guideUrl: 'https://www.minecraft-guides.com/mod/create-crafts-additions/',
    name: 'Create: Crafts & Additions',
    category: 'tech',
    description: 'A Create addon that bridges Forge Energy and rotational power, adding wiring, new mechanical crafting stations, and a craftable Musket built from Create-style parts.',
    machines: [
      { name: 'Electric Motor', desc: 'Converts Forge Energy into rotational power, letting FE-based tech mods drive Create contraptions.' },
      { name: 'Alternator', desc: 'Converts rotational power back into Forge Energy for FE-only machines.' },
      { name: 'Rolling Mill', desc: 'Draws ingots through rollers to produce Rods and Wires for wiring and crafting.' },
      { name: 'Connector (Small/Large)', desc: 'Anchors and relays low-current or high-current Wires between machines and storage.' },
    ],
    recipes: [
      { ingredients: '1x Iron Ingot (via Rolling Mill)', output: 'Iron Rod' },
      { ingredients: '1x Copper Ingot (via Rolling Mill)', output: 'Copper Wire' },
      { ingredients: 'Iron Rod, Brass Ingot, Gunpowder', output: 'Musket' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Get Create power running first',
            detail: "This addon builds on base Create — you need working rotational power (Water Wheel or Windmill) and a Brass supply before its machines are useful.",
          },
          {
            title: 'Build a Rolling Mill',
            detail: 'The Rolling Mill draws spare ingots into Rods and Wires — the two components nearly everything else in the addon consumes.',
          },
          {
            title: 'Run wiring with Connectors',
            detail: 'Small Connectors carry low-current signals, Large Connectors carry high-current FE. String Wires between them to link machines and storage across the base.',
          },
          {
            title: 'Bridge Create and FE power',
            detail: 'An Electric Motor turns FE into rotation; an Alternator turns rotation into FE. Together they let Create contraptions and FE tech mods share one power grid.',
          },
          {
            title: 'Craft a Musket',
            detail: 'With Iron Rods and Brass to spare, the Musket gives you a hard-hitting ranged option with craftable ammunition.',
          },
          {
            title: 'Scale up with Relays and Accumulators',
            detail: 'Redstone Relays gate power flow with logic, and Accumulators buffer FE for burst loads — the building blocks of a larger network.',
          },
        ],
      },
      {
        id: 'fe-bridge',
        title: 'Bridge Create and FE Power',
        steps: [
          {
            title: 'Spin up an Alternator',
            detail: 'Attach an Alternator to a shaft off your main Create power line — it converts the rotation into Forge Energy.',
          },
          {
            title: 'Wire it to storage',
            detail: 'Place Large Connectors on the Alternator and an Accumulator, then link them with Wire. The Accumulator becomes your battery bank.',
          },
          {
            title: 'Feed your FE machines',
            detail: 'Run more wire from the Accumulator to any FE-based machines in the pack — they draw power like from any other mod’s generator.',
          },
          {
            title: 'Convert back where needed',
            detail: 'An Electric Motor at the far end turns stored FE back into rotation, letting you run remote Create contraptions without a second power source.',
          },
          {
            title: 'Watch your stress budget',
            detail: 'The Alternator adds stress load like any machine — check the network with a Stress-o-meter and add capacity before it grinds to a halt.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Wire', chain: 'Iron/Copper Ingot → Rolling Mill → Rod/Wire → Connectors → powered machines' },
      { resource: 'Musket', chain: 'Iron Rod + Brass Ingot + Gunpowder → Musket → craftable ammunition for ranged combat' },
    ],
    tips: [
      'Small Connectors handle low-current wiring (redstone-scale signals); Large Connectors are for high-current FE transfer.',
      "The Electric Motor and Alternator are the mod's key trick for mixing Create with FE-based tech mods in the same pack.",
      'Keep a Rolling Mill running early — Rods and Wires are needed for almost everything else the addon offers.',
    ],
  },
  {
    id: 'create-steam-n-rails',
    guideUrl: 'https://www.minecraft-guides.com/mod/create-steam-n-rails/',
    name: "Create: Steam 'n' Rails",
    category: 'tech',
    description: "A Create addon that expands the base mod's train system with steam-powered locomotives, dozens of cosmetic track types, signal blocks, and couplers for building long multi-car trains.",
    machines: [
      { name: 'Boiler', desc: 'Heated by a fuel source below to turn water into steam, powering a Steam Engine-driven locomotive.' },
      { name: 'Track (wood variants)', desc: 'Dozens of cosmetic track styles matching every wood type, functionally identical to base Create track.' },
      { name: 'Signal Block / Semaphore', desc: 'Marks track sections as occupied so trains stop instead of colliding at junctions.' },
      { name: 'Coupler / Buffer', desc: 'Links multiple train cars together into a single multi-car train and cushions collisions.' },
    ],
    recipes: [
      { ingredients: '1x Andesite Alloy, 1x Iron Ingot, 1x Redstone', output: 'Track Signal' },
      { ingredients: 'Planks (any wood) + Iron Nugget', output: 'Track (matching wood style)' },
      { ingredients: '1x Brass Ingot, 1x Copper Ingot', output: 'Whistle' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Core Progression',
        steps: [
          {
            title: 'Finish early Create first',
            detail: "Trains sit at Create's Brass tier — have rotational power running and stockpile Andesite Alloy and Brass before laying rail.",
          },
          {
            title: 'Lay Track and build a Station',
            detail: 'Pick the wood-styled Track matching your build (all variants are functionally identical) and place a Station block where trains will assemble and stop.',
          },
          {
            title: 'Build a steam Boiler',
            detail: 'Feed it Water and fuel (coal or charcoal) to raise steam pressure for the Steam Engine driving your locomotive — bigger trains need bigger boilers.',
          },
          {
            title: 'Couple up more cars',
            detail: 'Couplers link additional cars into one multi-car train; Buffers cap the ends and cushion collisions.',
          },
          {
            title: 'Signal your junctions',
            detail: 'Signal Blocks mark track sections as occupied so trains stop at a red instead of colliding — place one before every junction.',
          },
          {
            title: 'Automate routes with a Schedule',
            detail: 'Give the locomotive a Whistle and drop a Schedule into the controls — it will run station-to-station routes, wait conditions and all, unattended.',
          },
        ],
      },
      {
        id: 'first-line',
        title: 'Run Your First Train Line',
        steps: [
          {
            title: 'Pick two endpoints',
            detail: 'Your base and one outpost (a mine, a farm, a village) make the ideal first route — short enough to debug, useful enough to keep.',
          },
          {
            title: 'Lay the track and place Stations',
            detail: 'Run track between the two points and place a Station block at each end — trains assemble, stop, and load at Stations.',
          },
          {
            title: 'Assemble the train',
            detail: 'At a Station, build the locomotive (steam engine, controls, whistle) plus any cargo or passenger cars, then assemble it into a train.',
          },
          {
            title: 'Write the Schedule',
            detail: 'A Schedule listing both stations with wait conditions (e.g. wait 10 seconds, or until cargo is full) makes the loop fully automatic.',
          },
          {
            title: 'Test one full loop',
            detail: 'Ride the first circuit yourself to catch missing signals, tight turns, or an underpowered boiler before trusting it with cargo.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Steam Power', chain: "Water + fuel (coal/charcoal) → heated Boiler → steam pressure → drives the Locomotive's Steam Engine" },
      { resource: 'Track', chain: 'Wood Planks (any type) + Iron Nugget → styled Track → cosmetic rail network matching your build' },
    ],
    tips: [
      'All the wood-styled Track variants function identically — pick whichever matches your build.',
      'Place a Signal Block before every junction; trains stop and wait at a red signal instead of derailing into each other.',
      'A longer train needs a bigger Boiler — undersized steam power will stall a fully-loaded multi-car train on grades.',
    ],
  },
  {
    id: 'handcrafted',
    name: 'Handcrafted',
    category: 'decoration',
    description: 'A furniture and decoration mod adding hundreds of cosmetic (and some functional) blocks — chairs, tables, cabinets, shelves, mailboxes, and cushions — in every wood type to furnish and decorate builds.',
    machines: [
      { name: 'Chair / Bench', desc: 'Sit-able seating craftable in every wood type; can be dyed with Cushions.' },
      { name: 'Cabinet / Drawer', desc: 'Storage furniture that doubles as a functional container, styled to match its wood type.' },
      { name: 'Shelf', desc: 'Displays books, pots, and small items for detailing walls and rooms.' },
      { name: 'Mailbox', desc: 'A decorative outdoor block for finishing the front of a house or village build.' },
    ],
    recipes: [
      { ingredients: '4x Planks, 2x Stick', output: 'Chair' },
      { ingredients: '6x Planks, 2x Slab (same wood)', output: 'Table' },
      { ingredients: '5x Planks, 1x Trapdoor', output: 'Cabinet' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Furnishing Guide',
        steps: [
          {
            title: 'Gather Planks in your wood of choice',
            detail: 'Nearly every Handcrafted piece exists in all wood variants, so furniture can match an existing build exactly — stock the wood before you start.',
          },
          {
            title: 'Furnish a dining area',
            detail: 'Chairs, Benches, and Tables are the cheapest pieces and immediately make a build feel lived-in. Chairs are actually sit-able.',
          },
          {
            title: 'Add storage furniture',
            detail: 'Cabinets and Drawers are real containers styled to their wood type — declutter a chests-only room without losing capacity.',
          },
          {
            title: 'Dye with Cushions and Sheets',
            detail: 'Re-color couches and beds by swapping Cushions and Sheets — no breaking and recrafting required.',
          },
          {
            title: 'Detail the rooms',
            detail: 'Shelves, Pots, Clocks, and Mailboxes fill the small visual gaps that make interiors read as finished.',
          },
          {
            title: 'Theme rooms with mixed styles',
            detail: 'Mixing wood types and style sets (medieval, steampunk, fantasy) gives each room or build its own identity.',
          },
        ],
      },
      {
        id: 'dining-room',
        title: 'Build a Cozy Dining Room',
        steps: [
          {
            title: 'Pick one wood type',
            detail: 'A single wood keeps the room coherent — match the house’s floor or trim so the furniture looks built-in.',
          },
          {
            title: 'Place the table and seating',
            detail: 'A long table with Chairs and a Bench mixes seat heights and makes the room feel used, not staged.',
          },
          {
            title: 'Add Cushions for color',
            detail: 'Dyed Cushions on the seating tie the room to your palette — swap them any time without recrafting.',
          },
          {
            title: 'Dress the walls',
            detail: 'Shelves with pots, plates, and books at eye level fill the empty wall space that makes rooms feel bare.',
          },
          {
            title: 'Finish with a Cabinet',
            detail: 'A matching-wood Cabinet in the corner adds working storage for food and dishes — decoration that earns its slot.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Furniture Set', chain: "Planks (any wood) → Handcrafted recipes → matching Chair/Table/Cabinet/Shelf set in that wood's color" },
      { resource: 'Wool', chain: 'Wool → Cushions/Sheets → re-dye seating and bedding without breaking and recrafting' },
    ],
    tips: [
      'Every piece is craftable in all vanilla wood types, so furniture can match an existing build exactly.',
      'Use Cushions and Sheets to change colors on the fly instead of breaking and recrafting furniture.',
      'Install JEI alongside Handcrafted — with 250+ items, browsing recipes in-game is much faster than memorizing them.',
    ],
  },
  {
    id: 'minecraft-comes-alive-reborn',
    guideUrl: 'https://www.minecraft-guides.com/mod/minecaft-comes-alive-reborn/',
    name: 'Minecraft Comes Alive: Reborn',
    category: 'villagers',
    description: 'Overhauls vanilla villagers into fully human NPCs with unique genders, voices, and appearances, plus deep relationship, marriage, and family systems.',
    machines: [
      { name: 'Human Villagers', desc: 'Villagers gain unique skins, genders, and voiced dialogue instead of generic mob grunts.' },
      { name: 'Guards', desc: 'A new villager profession that arms itself and defends the village from raiders and monsters.' },
      { name: 'Relationship System', desc: 'A hearts-based trust/love meter built through conversation and gifting.' },
      { name: 'Children', desc: 'Born after marriage; can be assigned chores and grow through life stages over real time.' },
    ],
    recipes: [
      { ingredients: '7 Gold Ingots + 1 Diamond', output: 'Engagement Ring (gift at 50 hearts to get engaged)' },
      { ingredients: '8 Gold Ingots', output: 'Wedding Ring (gift at 100 hearts to marry)' },
      { ingredients: 'Married spouse + assigned chore (farming, lumber, etc.)', output: 'A working spouse who contributes resources' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Relationship Progression',
        steps: [
          {
            title: 'Build hearts with villagers',
            detail: 'Talking, joking, and gifting all raise the hearts meter. Check a villager’s mood first — the same gift lands differently on a bad day.',
          },
          {
            title: 'Get engaged at 50 hearts',
            detail: 'Craft an Engagement Ring (7 Gold Ingots + 1 Diamond) and gift it once you reach 50 hearts.',
          },
          {
            title: 'Marry at 100 hearts',
            detail: 'Reach 100 hearts, then craft and gift a Wedding Ring (8 Gold Ingots) to tie the knot.',
          },
          {
            title: 'Start a family',
            detail: 'Married couples can have children, who start as babies and grow through life stages over real-world time.',
          },
          {
            title: 'Assign chores to children',
            detail: 'Farming, lumberjacking, and other chores make growing children productive members of the household.',
          },
          {
            title: 'Protect the village with Guards',
            detail: 'Recruit or rely on the Guard profession to defend your family from raiders and monsters.',
          },
        ],
      },
      {
        id: 'raise-family',
        title: 'Raise a Family',
        steps: [
          {
            title: 'Settle into a shared home',
            detail: 'After marrying, establish a house with beds for the whole family — your spouse and children live there.',
          },
          {
            title: 'Welcome the baby',
            detail: 'Children start as babies you can carry, name, and watch grow through toddler and child stages over real-world time.',
          },
          {
            title: 'Assign chores early',
            detail: 'Farming, lumberjacking, and other chores make growing kids productive — several real hours pass before adulthood, so put the time to work.',
          },
          {
            title: 'Keep relationships warm',
            detail: 'Family members still track hearts — keep talking and gifting so the household stays happy.',
          },
          {
            title: 'Guard the homestead',
            detail: 'Station Guards near the family home; raids and night mobs do not care that you have a baby to protect.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Gold Ingots + Diamond', chain: 'Mining → Engagement Ring / Wedding Ring → marriage and family progression' },
      { resource: 'Children', chain: 'Marriage → newborn → assigned chores → grown adult villager' },
    ],
    tips: [
      "Both conversation and gifts raise hearts, so check a villager's mood before choosing what to give.",
      "Guards won't tolerate strangers stealing from the village, so be careful looting chests near them.",
      'Children take several real-world hours to grow up, so assign chores early to make the wait productive.',
    ],
  },
  {
    id: 'guard-villagers',
    guideUrl: 'https://www.minecraft-guides.com/mod/guard-villagers/',
    name: 'Guard Villagers',
    category: 'villagers',
    description: 'Adds hireable villager guards that you can equip, station on patrol, or bring along to defend villages from monsters and raiders.',
    machines: [
      { name: 'Guard Villager', desc: 'Converted from a nitwit or unemployed villager; also spawns pre-armed in groups in villages.' },
      { name: 'Guard Inventory', desc: 'Right-click a guard to open gear slots for armor, a weapon, and an offhand item.' },
      { name: 'Patrol Mode', desc: 'Orders a guard to hold and defend a fixed spot.' },
      { name: 'Follow Mode', desc: 'With Hero of the Village active, orders a guard to follow and fight alongside the player.' },
    ],
    recipes: [
      { ingredients: 'Shift + right-click a Nitwit or unemployed Villager with an Iron Sword', output: 'Melee Guard' },
      { ingredients: 'Shift + right-click a Nitwit or unemployed Villager with a Crossbow', output: 'Ranged Guard' },
      { ingredients: 'Guard + Shield or Food/Potion in the offhand slot', output: 'A guard that blocks attacks, or eats/drinks when low on health' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Guard Setup',
        steps: [
          {
            title: 'Find or earn your first guards',
            detail: 'Guards spawn pre-armed in groups of six in villages, or you can earn Hero of the Village by defending a raid to unlock full control.',
          },
          {
            title: 'Convert a villager into a guard',
            detail: 'Shift-right-click a nitwit or unemployed villager while holding an Iron Sword (melee) or Crossbow (ranged).',
          },
          {
            title: 'Equip armor and a weapon',
            detail: 'Right-click the guard to open its gear slots — armor, main-hand weapon, and an offhand item.',
          },
          {
            title: 'Fill the offhand slot',
            detail: 'A Shield lets it block; food or a potion lets it self-heal during long fights.',
          },
          {
            title: 'Station or bring them along',
            detail: 'Patrol holds a fixed defensive position; Follow (requires Hero of the Village) brings the guard with you as a fighting companion.',
          },
        ],
      },
      {
        id: 'village-defense',
        title: 'Fortify a Village',
        steps: [
          {
            title: 'Count your defenders',
            detail: 'Villages spawn with about six armed guards — walk the perimeter and note where coverage is thin before converting more.',
          },
          {
            title: 'Convert extra guards',
            detail: 'Nitwits and unemployed villagers are free manpower: sword for melee at the gates, crossbow for towers and rooftops.',
          },
          {
            title: 'Upgrade their gear',
            detail: 'Iron or better armor on every guard, shields for the melee line, and food in offhands so they outlast a raid wave.',
          },
          {
            title: 'Set patrol positions',
            detail: 'Station melee guards at entrances and choke points, ranged guards on elevated spots with clear sightlines.',
          },
          {
            title: 'Stress-test with a raid',
            detail: 'The next raid shows the gaps — reposition after each wave and the village eventually defends itself without you.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Iron Sword / Crossbow', chain: 'Smithing or looting → weapon → shift-right-click unemployed villager → dedicated Guard' },
      { resource: 'Hero of the Village', chain: 'Defend a raid → Hero of the Village buff → unlocks the Follow command on guards' },
    ],
    tips: [
      "Guards already spawn in groups of six in villages, so you don't need to convert your own right away.",
      "Shield-equipped crossbow guards can't kick attackers while blocking, so weigh survivability against damage output.",
      "Keep food or a potion in a guard's offhand slot so it can self-sustain during long fights.",
    ],
  },
  {
    id: 'towns-and-towers',
    guideUrl: 'https://www.minecraft-guides.com/mod/towns-and-towers/',
    name: 'Towns and Towers',
    category: 'villagers',
    description: 'Adds over 50 new village, pillager outpost, and ship structures spread across many biomes, with more detailed, real-world-inspired architecture layered onto vanilla generation.',
    machines: [
      { name: 'Biome Village Variants', desc: 'Reworked village layouts themed to match their surrounding biome.' },
      { name: 'Watchtowers & Outposts', desc: 'New pillager outpost variants including forts, towers, and ruins.' },
      { name: 'Villager Ships', desc: 'Fleets of trading ships that spawn in deep ocean biomes.' },
      { name: 'Points of Interest', desc: 'New job-site and decorative structures scattered through villages.' },
    ],
    recipes: [
      { ingredients: 'Install the Cristel Lib dependency mod', output: 'Enables Towns and Towers structure generation' },
      { ingredients: 'Explore a themed biome village', output: 'New trade-ready villagers plus loot chests in themed structures' },
      { ingredients: 'Board a Villager Ship at sea', output: 'Trading villagers and lootable chests without a land village' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Exploration Guide',
        steps: [
          {
            title: 'Install the Cristel Lib dependency',
            detail: 'Towns and Towers requires Cristel Lib to load — without it, none of its structures generate.',
          },
          {
            title: 'Generate fresh chunks',
            detail: 'Start a new world or push into unexplored territory; already-generated chunks never retroactively gain the new structures.',
          },
          {
            title: 'Tour the biome villages',
            detail: 'Plains, desert, taiga, and other biomes each get unique village variants with themed loot and trades.',
          },
          {
            title: 'Hunt for villager ships',
            detail: 'Fleets of trading ships spawn in deep ocean biomes — easy to miss, so watch the horizon while boating.',
          },
          {
            title: 'Raid the new outposts',
            detail: 'Pillager outposts now come as forts, towers, and ruins — raid them or defend against them for captain drops.',
          },
        ],
      },
      {
        id: 'find-ship',
        title: 'Find a Villager Ship',
        steps: [
          {
            title: 'Build a fast boat',
            detail: 'You will cover a lot of open water — bring a boat, food, and spare wood for repairs or a dock.',
          },
          {
            title: 'Head for deep ocean',
            detail: 'Ships spawn in deep ocean biomes, far from shore — coastal waters will not have them.',
          },
          {
            title: 'Scan the horizon',
            detail: 'Masts and sails are the giveaway silhouette. They are easy to miss, so sweep your view constantly while sailing.',
          },
          {
            title: 'Board and trade',
            detail: 'The crew are working trade villagers — a floating market when you are days from any land village.',
          },
          {
            title: 'Mark the coordinates',
            detail: 'Log the position (or map marker) before sailing on — a known ship is a renewable trading stop on future voyages.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Village exploration', chain: 'New biome village → themed loot + trades → early-game gear and emeralds' },
      { resource: 'Villager Ships', chain: 'Deep ocean exploration → boarded ship → trades and loot far from any land village' },
    ],
    tips: [
      "Install Cristel Lib first — Towns and Towers won't generate its structures without it.",
      'Ocean villager ships are easy to miss; watch the horizon while boating through deep ocean biomes.',
      "Existing worlds need newly generated chunks to see the new structures, since old chunks won't retroactively change.",
    ],
  },
  {
    id: 'overhauled-villages',
    guideUrl: 'https://www.minecraft-guides.com/mod/overhauled-villages/',
    name: 'Overhauled Villages',
    category: 'villagers',
    description: 'Replaces vanilla village and pillager outpost generation with 23 larger, biome-styled village variants and 14 detailed outpost variants, built entirely from vanilla blocks.',
    machines: [
      { name: 'Biome-Styled Villages', desc: "23 village variants that reflect their surrounding biome's palette and theme." },
      { name: 'Pillager Outpost Variants', desc: '14 redesigned outposts styled as forts, homes, towers, or ruins.' },
      { name: 'Expanded Layouts', desc: 'Larger, more detailed structures than vanilla, using only vanilla blocks.' },
      { name: 'Forge/Fabric Support', desc: 'Available as a full mod for both major loaders (originally a datapack).' },
    ],
    recipes: [
      { ingredients: 'Generate a new world with the mod installed', output: 'Overhauled village layouts replace vanilla ones' },
      { ingredients: 'Explore a biome (desert, taiga, savanna, etc.)', output: "That biome's unique overhauled village variant" },
      { ingredients: 'Locate a pillager outpost', output: 'One of 14 redesigned outpost styles (fort, tower, ruin, etc.)' },
    ],
    guides: [
      {
        id: 'progression',
        title: 'Exploration Guide',
        steps: [
          {
            title: 'Install before world generation',
            detail: 'The mod replaces vanilla village generation, so install it (Forge or Fabric) before creating your world for full effect.',
          },
          {
            title: 'Explore biome by biome',
            detail: 'All 23 village variants are biome-styled — each biome you visit shows a different overhauled layout built from vanilla blocks.',
          },
          {
            title: 'Trade and loot the bigger villages',
            detail: 'Larger structures mean more villagers, more job sites, and more loot chests — a strong early-game resource boost.',
          },
          {
            title: 'Find the redesigned outposts',
            detail: 'Pillager outposts come in 14 variants — forts, homes, towers, and ruins — so watch silhouettes rather than one memorized shape.',
          },
          {
            title: 'Settle in as a home base',
            detail: 'The expanded villages have enough houses and job sites to serve as a ready-made base while you establish yourself.',
          },
        ],
      },
      {
        id: 'village-base',
        title: 'Claim a Village Home Base',
        steps: [
          {
            title: 'Scout a few variants first',
            detail: 'With 23 biome-styled layouts, villages differ a lot — visit two or three before choosing where to settle.',
          },
          {
            title: 'Pick your house',
            detail: 'The overhauled builds are larger than vanilla — claim one with room for storage, a bed, and a crafting corner.',
          },
          {
            title: 'Light everything',
            detail: 'Bigger villages have more dark corners than vanilla ones — torch the streets and interiors before the first night.',
          },
          {
            title: 'Use the job sites',
            detail: 'More houses means more workstations — cycle villagers onto the professions you need for trades.',
          },
          {
            title: 'Expand in the same style',
            detail: 'The structures are pure vanilla blocks, so you can extend any building with matching materials and it reads as original.',
          },
        ],
      },
    ],
    resourceChains: [
      { resource: 'Biome variety', chain: 'World generation → biome-matched village style → themed loot and trades unique to that biome' },
      { resource: 'Outpost variants', chain: 'Pillager outpost generation → one of 14 styles → raid-ready loot and captain drops' },
    ],
    tips: [
      'No new blocks or items are added, so this is a pure generation/structure overhaul that stays compatible with most content mods.',
      "Start a new world (or explore fresh chunks) to see the overhauled structures — existing villages won't retroactively update.",
      'Outposts now come in more shapes, so rely on terrain and silhouette rather than a single memorized layout to spot them.',
    ],
  },
];

// Category chip list, derived from whatever categories actually show up in
// MODS — add a mod with a new category string and a chip appears for it
// automatically, no other file to edit.
export const CATEGORIES = [
  { key: 'all', label: 'All Mods' },
  ...[...new Set(MODS.map((m) => m.category))].sort().map((key) => ({ key, label: catLabel(key) })),
];

export function countsByCategory(mods = MODS) {
  const counts = { all: mods.length };
  for (const m of mods) counts[m.category] = (counts[m.category] || 0) + 1;
  return counts;
}
