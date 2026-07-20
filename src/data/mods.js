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
//   machines: [{ name: '...', desc: '...' }, ...],
//   recipes: [{ ingredients: '...', output: '...' }, ...],
//   progression: ['Step 1 text', 'Step 2 text', ...],   // ordered, checkable
//   resourceChains: [{ resource: '...', chain: '...' }, ...],
//   tips: ['...', '...'],
// }
// ---------------------------------------------------------------------------
export const MODS = [
  {
    id: 'immersive-engineering',
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
    progression: [
      "Craft an Engineer's Hammer — required to assemble every multiblock.",
      'Build a Coke Oven to produce Coal Coke and Creosote Oil.',
      'Assemble the Blast Furnace multiblock to unlock Steel.',
      'Set up a Metal Press for Plates, Rods, and Gears.',
      'Wire power from a Kinetic Dynamo or Diesel Generator to your base.',
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
    progression: [
      'Mine Certus Quartz and craft basic ME Cable.',
      'Build a small Controller network with a Drive and Terminal.',
      'Set up an Inscriber line for Processors (Logic/Calc/Engineering).',
      'Add Storage Buses on external chests to absorb existing storage.',
      'Automate crafting with Molecular Assemblers and Pattern Providers.',
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
    progression: [
      'Build a Water Wheel or Windmill for early rotational power.',
      'Chain Shafts and Cogwheels to distribute power across your base.',
      'Add a Millstone and Mechanical Press for basic processing.',
      'Build a Mechanical Crafter line for automated crafting.',
      'Graduate to Trains once you have Tracks and a Schedule.',
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
    progression: [
      'Plant new crops (Tomato, Onion, Cabbage, Rice) early on.',
      'Craft a Cutting Board for prep steps like slicing meat.',
      'Add a Cooking Pot for multi-ingredient meals with buffs.',
      'Set up a Smoker Extension for faster meat processing.',
      'Cook higher-tier meals for longer, stronger food buffs.',
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
    progression: [
      'Open the starter Blueprint Package for Tool Rod, Pickaxe, Shovel, Axe, Hoe and Sword blueprints.',
      'Craft rods and heads from basic materials like wood, stone, and iron, then assemble your first set of tools.',
      'Build a Salvager so you can reclaim materials any time you want to rebuild a tool with better parts.',
      'Set up a Material Grader to push key materials toward higher quality grades for stronger stat bonuses.',
      "Seek out Silent Gear's own ores and metals, such as Crimson Iron and Azure Silver, for higher-tier parts.",
      "Mix materials across a tool's head, rod, and extras to balance harvest speed, durability, and special traits.",
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
    progression: [
      "Gear up with strong late-game vanilla combat gear before seeking out Cataclysm's bosses — most hit far harder than vanilla mobs.",
      'Track down and defeat the Netherite Monstrosity in the Nether for an early boost to your combat gear.',
      'Summon and defeat the Harbinger by placing a Nether Star in its chest cavity to earn weapons like the Meat Shredder and Laser Gatling.',
      'Challenge Maledictus for the Annihilator maces, the Soul Render halberd, and the Cursed Bow.',
      "Take on Ignis, the mod's hardest fight, for Ignitium ingots and top-tier flame-themed gear.",
      "Forge each boss's drops into matching armor and weapon sets before pushing on to later bosses like Scylla, Leviathan, and the Ancient Remnant.",
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
    progression: [
      'Craft a basic Leather Backpack from a Chest and Leather for extra portable storage.',
      'Work up through the tiers — Iron, Gold, Diamond, Netherite — for more slots and more upgrade capacity.',
      'Add a Pickup Upgrade so drops from mining, farming, or fighting get vacuumed straight into the backpack.',
      'Add a Tank Upgrade to haul fluids alongside items without carrying separate buckets.',
      'Slot in Stack Upgrades to multiply how much each backpack slot can hold.',
      'Once you have several specialized backpacks, use an Inception Upgrade to nest them all inside one master backpack.',
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
    progression: [
      'Craft a handful of 1x1 or 2x2 Drawers from planks and a chest to start consolidating stacks of ores, blocks, and crops.',
      'Place a Drawer Controller nearby and connect your drawers to browse and insert into the whole network from one block.',
      'Use Trim to extend drawer walls and link distant drawers back to the controller without adding unnecessary storage.',
      'Add Storage Upgrades to individual drawers to multiply how many stacks each slot can hold.',
      'Build Compacting Drawers for ore-to-ingot-to-block chains so you never manually compress or decompress materials again.',
      'Add Redstone or Void Upgrades where you need fill-level signals or automatic overflow disposal.',
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
    progression: [
      "Get Create's basic rotational power running (Water Wheel or Windmill) and stock up on Brass.",
      'Build a Rolling Mill to turn spare ingots into Rods and Wires.',
      'Place small and large Connectors and run Wires to link machines and storage across your base.',
      'Add an Electric Motor or Alternator to bridge Create power with any FE-based tech mods in your pack.',
      'Craft a Musket for ranged combat once you have Iron Rods and Brass to spare.',
      'Use Redstone Relays and Accumulators for larger, logic-gated power networks.',
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
    progression: [
      "Finish Create's early rotational power and stock up on Andesite Alloy and Brass.",
      'Lay Track in the wood style that matches your build and set up a Station.',
      'Build a Boiler fed by Water and a fuel source (coal, etc.) to power a Steam Locomotive.',
      'Attach Couplers and Buffers to link additional cars into a full multi-car train.',
      'Place Signal Blocks and Semaphores at junctions so trains wait instead of colliding.',
      'Give the locomotive a Whistle and a Schedule to automate routes between stations.',
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
    progression: [
      'Gather Planks in your preferred wood type — nearly every Handcrafted item is available in all wood variants.',
      'Craft basic seating and Tables to furnish a dining area.',
      'Add storage furniture like Cabinets and Drawers to declutter chests-only storage.',
      'Use Cushions and Sheets to dye and re-color couches and beds without recrafting them.',
      'Fill out rooms with small details — Shelves, Pots, Clocks, and Mailboxes.',
      'Mix wood types and styles (medieval, steampunk, fantasy) to theme different rooms or builds.',
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
    progression: [
      'Talk to and gift villagers to build hearts with them.',
      'Craft an Engagement Ring and gift it at 50 hearts to become engaged.',
      'Reach 100 hearts, then craft and gift a Wedding Ring to marry.',
      'Move in together and have children, who start out as babies.',
      'Assign children chores like farming or lumberjacking as they grow into adults.',
      'Recruit or rely on Guards to protect your growing family and village.',
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
    progression: [
      'Earn Hero of the Village by defending a raid, or find a village with guards already spawned.',
      'Shift-right-click a nitwit or unemployed villager with a sword or crossbow to make it a guard.',
      'Right-click the guard to open its inventory and equip armor and a weapon.',
      'Give it a shield or food/potion for its offhand slot.',
      'Use the Patrol button to station it, or Follow (needs Hero of the Village) to bring it with you.',
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
    progression: [
      'Install the Cristel Lib dependency, which is required for the mod to load.',
      'Generate a new world (or explore unloaded chunks) so the new structures can spawn.',
      'Explore plains, desert, taiga, and other biomes to find their unique village variants.',
      'Search deep ocean biomes for fleets of villager trading ships.',
      'Raid or defend against the new pillager outpost variants like forts, towers, and ruins.',
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
    progression: [
      'Install the mod (Forge or Fabric) before generating your world for full effect.',
      "Explore different biomes to see each one's unique overhauled village layout.",
      'Trade and loot through the larger structures for expanded early-game resources.',
      'Seek out pillager outposts to find one of the 14 redesigned variants.',
      'Use the bigger villages as a home base since they include more houses and job sites.',
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
