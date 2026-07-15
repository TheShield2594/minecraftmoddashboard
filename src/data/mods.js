export const CATEGORIES = [
  { key: 'all', label: 'All Mods' },
  { key: 'tech', label: 'Tech' },
  { key: 'storage', label: 'Storage' },
  { key: 'magic', label: 'Magic' },
  { key: 'exploration', label: 'Exploration' },
  { key: 'food', label: 'Food' },
];

export const CAT_LABELS = {
  tech: 'Tech',
  storage: 'Storage',
  magic: 'Magic',
  exploration: 'Exploration',
  food: 'Food',
};

const CAT_HUES = { all: 195, tech: 205, storage: 250, magic: 300, exploration: 140, food: 45 };

export function catColor(key) {
  return `oklch(0.75 0.15 ${CAT_HUES[key] ?? 200})`;
}
export function catColorBg(key) {
  return `oklch(0.75 0.15 ${CAT_HUES[key] ?? 200} / 0.14)`;
}
export function catColorBorder(key) {
  return `oklch(0.75 0.15 ${CAT_HUES[key] ?? 200} / 0.4)`;
}

const CAT_CLIP = {
  storage: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
  magic: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
  exploration: 'polygon(50% 0%, 100% 100%, 0% 100%)',
};

export function catIconRadius(key) {
  return key === 'food' ? '50%' : key === 'tech' ? '8px' : '0';
}
export function catIconClip(key) {
  return CAT_CLIP[key] || 'none';
}

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
    id: 'mekanism',
    name: 'Mekanism',
    category: 'tech',
    description: 'Deep ore-processing chains, gas and fluid systems, jetpacks, and eventually a fusion reactor.',
    machines: [
      { name: 'Digital Miner', desc: 'Automatically mines a configurable radius and filters output.' },
      { name: 'Enrichment Chamber', desc: 'Second stage of ore processing, doubling most raw ores.' },
      { name: 'Factory (Tiers 1-3)', desc: 'Combines multiple machine processes into one multi-slot block.' },
    ],
    recipes: [
      { ingredients: '1x Osmium Ingot, 1x Redstone', output: 'Basic Control Circuit' },
      { ingredients: '4x Steel, 4x Osmium Ingot', output: 'Digital Miner' },
      { ingredients: '1x Refined Obsidian, 1x Advanced Circuit', output: 'Elite Control Circuit' },
    ],
    progression: [
      'Build a Crusher and Enrichment Chamber for 2x ore output.',
      'Add Purification and Injection stages for 3x-5x output.',
      'Automate with a Digital Miner once you have a power source.',
      'Unlock Factories to consolidate multi-step processing.',
      'Push toward a Fusion Reactor for endgame power.',
    ],
    resourceChains: [
      { resource: 'Osmium', chain: 'Osmium Ore → Enrichment Chamber → 2x Osmium Ingot' },
      { resource: 'Iron (5x)', chain: 'Iron Ore → Crusher → Purification → Injection → Osmium Compressor → 5x Iron Ingot' },
    ],
    tips: [
      "Gas pipes and fluid pipes are different networks — don't mix them up when wiring a Factory.",
      'The Jetpack needs Hydrogen, produced by an Electrolytic Separator.',
      'QIO storage supersedes the old Digital Storage drives late-game.',
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
    id: 'refined-storage',
    name: 'Refined Storage',
    category: 'storage',
    description: 'A leaner alternative to full ME networks — same digital storage idea, simpler setup.',
    machines: [
      { name: 'Controller', desc: "Powers the whole network; sized by RF/FE tier." },
      { name: 'Disk Drive', desc: "Holds Storage Disks, the network's actual capacity." },
      { name: 'Crafter', desc: 'Handles a single recipe for network auto-crafting.' },
    ],
    recipes: [
      { ingredients: '4x Quartz, 4x Redstone', output: 'Cable (16x)' },
      { ingredients: '1x Quartz Enriched Iron', output: 'Storage Housing' },
      { ingredients: '1x Silicon, 1x Storage Housing', output: '1k Storage Disk' },
    ],
    progression: [
      'Craft Cable and a Controller, then power it.',
      'Add a Disk Drive with a couple of Storage Disks.',
      'Attach an External Storage to pull in existing chests.',
      'Chain Crafters together for multi-step auto-crafting.',
      'Add a Wireless Transmitter for a portable Grid.',
    ],
    resourceChains: [
      { resource: 'Silicon', chain: 'Quartz → Solidifier / Furnace → Silicon' },
      { resource: 'Quartz Enriched Iron', chain: 'Iron + Quartz → Solidifier → Quartz Enriched Iron' },
    ],
    tips: [
      'Priorities on External Storage decide where items land first.',
      'Crafter chains need a Crafter Manager once you exceed a handful of recipes.',
      "Disks aren't destroyed on removal — pull them before scrapping a Drive.",
    ],
  },
  {
    id: 'thermal-expansion',
    name: 'Thermal Expansion',
    category: 'tech',
    description: 'The classic RF-powered machine set — pulverizers, smelters, and simple, reliable automation.',
    machines: [
      { name: 'Pulverizer', desc: 'Doubles most ores into dusts before smelting.' },
      { name: 'Induction Smelter', desc: 'Smelts ores with an added catalyst (e.g. Flux) for a bonus output.' },
      { name: 'Redstone Furnace', desc: 'A faster, RF-powered vanilla furnace replacement.' },
    ],
    recipes: [
      { ingredients: '1x Iron Ore', output: '2x Iron Dust (via Pulverizer)' },
      { ingredients: '2x Iron Dust, 1x Flux', output: '2x Iron Ingot (via Induction Smelter)' },
      { ingredients: '4x Invar Ingot, 4x Redstone', output: 'Machine Frame' },
    ],
    progression: [
      'Craft a Redstone Furnace for faster basic smelting.',
      'Add a Pulverizer to start doubling ores.',
      'Upgrade to an Induction Smelter with Flux for bonus ingots.',
      'Build a Dynamo (Steam or Magmatic) for RF power.',
      'Set up an Energy Cell to buffer power for machine banks.',
    ],
    resourceChains: [
      { resource: 'Iron', chain: 'Iron Ore → Pulverizer → 2x Iron Dust → Induction Smelter (+Flux) → 2x Iron Ingot' },
      { resource: 'Redstone', chain: 'Redstone Ore → Pulverizer → 2x Redstone (no smelting needed)' },
    ],
    tips: [
      'Machine upgrades (Redstone/Augment slots) can be swapped without breaking the block.',
      "Flux is a byproduct of Induction Smelting Iron — you'll rarely run short once started.",
      'Tesseracts let you teleport items/power/fluids between linked frequencies.',
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
    id: 'tinkers-construct',
    name: "Tinker's Construct",
    category: 'tech',
    description: 'Build tools piece by piece from a Smeltery and pattern set — every material changes stats.',
    machines: [
      { name: 'Smeltery', desc: 'Multiblock that melts metal blocks/ores into liquid for casting.' },
      { name: 'Tool Station', desc: 'Assembles tool parts (head, binding, handle) into a finished tool.' },
      { name: 'Part Builder', desc: 'Cuts wooden/metal patterns into tool part shapes.' },
    ],
    recipes: [
      { ingredients: '1x Seared Brick (x~40 for multiblock)', output: 'Smeltery Structure' },
      { ingredients: 'Pick Head + Binding + Tool Rod', output: 'Pickaxe (Tool Station)' },
      { ingredients: 'Molten Metal + Ingot Cast', output: 'Cast Ingot' },
    ],
    progression: [
      'Craft a Part Builder and basic wood patterns.',
      'Build a small Seared Brick Smeltery.',
      'Melt your first ore/ingots and cast a Pickaxe head.',
      'Assemble tools at a Tool Station and add Modifiers.',
      'Upgrade Smeltery size and try alloys like Manyullyn.',
    ],
    resourceChains: [
      { resource: 'Seared Stone', chain: 'Grout (Sand+Gravel+Clay) → Smelt → Seared Stone/Brick' },
      { resource: 'Manyullyn', chain: 'Cobalt + Ardite (molten, 1:1) → Manyullyn Ingot' },
    ],
    tips: [
      'Tool material affects mining speed, durability, and special abilities — mix head/handle materials freely.',
      'A Smeltery drains fast without a lid — cover the top to reduce heat loss.',
      'Modifiers (Diamond, Redstone, etc.) stack — plan slots before adding them.',
    ],
  },
  {
    id: 'botania',
    name: 'Botania',
    category: 'magic',
    description: 'Nature-powered magic — mana flowers instead of mob grinders, with a huge functional-flower toolkit.',
    machines: [
      { name: 'Mana Pool', desc: 'Central mana reservoir that flowers and tools draw from.' },
      { name: 'Mana Generating Flowers', desc: 'Convert an in-world action (e.g. lava, growth) into mana.' },
      { name: 'Functional Flowers', desc: 'Perform utility tasks — smelting, farming, damage — using mana.' },
    ],
    recipes: [
      { ingredients: '1x Livingwood, 1x Petal', output: 'Mana Flower (varies by petal color)' },
      { ingredients: '4x Livingwood, 4x Livingrock', output: 'Mana Pool' },
      { ingredients: '1x Terrasteel, Mana Pool access', output: 'Terra Shatterer (tool)' },
    ],
    progression: [
      'Punch trees into Livingwood/Livingrock using the Lexica Botania guide.',
      'Plant your first Mana Generating Flower and build a Mana Pool.',
      'Add Functional Flowers for farming, smelting, or mob effects.',
      'Craft Mana Tablets to carry mana between pools.',
      'Work toward Terrasteel gear for late-game tools.',
    ],
    resourceChains: [
      { resource: 'Livingwood', chain: 'Vanilla Log + Lexica Botania recipe → Livingwood → tool/flower crafting' },
      { resource: 'Manasteel → Terrasteel', chain: 'Iron + Mana → Manasteel → (+Elementium+Pixie Dust) → Terrasteel' },
    ],
    tips: [
      'No mob grinding required — most early mana comes from passive flowers.',
      'Pool mana caps out — spread flowers across multiple pools for bigger projects.',
      'The Lexica Botania (in-game book) documents nearly every recipe — check it before searching wikis.',
    ],
  },
  {
    id: 'ars-nouveau',
    name: 'Ars Nouveau',
    category: 'magic',
    description: 'Build your own spells from glyphs — chain effects, augments, and forms in an Arcane spellbook.',
    machines: [
      { name: 'Arcane Pedestal + Enchanting Apparatus', desc: 'Crafts higher-tier magic items from recipe rituals.' },
      { name: 'Mana Jar / Vein', desc: 'Stores mana used to cast and sustain spells.' },
      { name: 'Imbuement Altar', desc: 'Imbues raw items with magic properties over time.' },
    ],
    recipes: [
      { ingredients: '1x Spellbook, Glyphs of choice', output: 'Custom Spell' },
      { ingredients: '1x Wixie Jar / Familiar recipe', output: 'Familiar (spell-assist companion)' },
      { ingredients: 'Source Gem + Casting components', output: 'Ring / Trinket' },
    ],
    progression: [
      'Get a starter Spellbook and learn the Novice glyphs.',
      'Build a Mana Jar or Vein to store casting resource (Source).',
      'Combine Form + Effect + Augment glyphs into your first spell.',
      'Unlock Apprentice/Advanced glyphs via in-world exploration.',
      'Automate rituals with the Enchanting Apparatus for gear upgrades.',
    ],
    resourceChains: [
      { resource: 'Source', chain: 'Source Gem / Source Berries → Mana Jar → spell casting' },
      { resource: 'Wilden drops', chain: 'Wilden mobs → Wilden Tribute/Horn → advanced glyph unlocks' },
    ],
    tips: [
      'Spell order matters — Form glyphs go first, then Effects, then Augments.',
      'Familiars can auto-cast bound spells, saving you from manual casting.',
      'Check glyph tooltips for Source cost before building expensive spell chains.',
    ],
  },
  {
    id: 'blood-magic',
    name: 'Blood Magic',
    category: 'magic',
    description: 'Sacrificial magic built around the Blood Altar — trade life essence and health for powerful rituals and gear.',
    machines: [
      { name: 'Blood Altar', desc: 'Central crafting block; fills with Life Essence (LP) from sacrifice.' },
      { name: 'Ritual Diviner + Master Ritual Stone', desc: 'Places world-affecting rituals (e.g. Regeneration, Growth).' },
      { name: 'Blood Tank', desc: 'Stores overflow Life Essence for bigger rituals.' },
    ],
    recipes: [
      { ingredients: 'Self-sacrifice (Athame) or Sacrificial Dagger', output: 'Life Essence (LP) in Altar' },
      { ingredients: '1x Weak Blood Orb, Altar tier 1 recipe', output: 'Blood Altar upgrade items' },
      { ingredients: 'Reagents + full Altar', output: 'Living Armor components' },
    ],
    progression: [
      'Craft a Weak Blood Orb and basic Altar.',
      'Use the Sacrificial Dagger to fill the Altar with LP.',
      'Upgrade the Altar tier to unlock stronger recipes.',
      'Set up Rituals via a Master Ritual Stone for passive effects.',
      'Work toward Living Armor and higher Orb tiers.',
    ],
    resourceChains: [
      { resource: 'Life Essence (LP)', chain: 'Self/mob sacrifice → Blood Altar → stored LP → rituals/crafting' },
      { resource: 'Demon Will', chain: 'Tartaric Gateway mobs → Will drops → Sentient tools/upgrades' },
    ],
    tips: [
      "Self-sacrifice has a health floor by default — it won't kill you outright.",
      "Altar tier gates recipes — check the tier requirement before assuming a recipe is broken.",
      'Rituals drain LP continuously — keep a full Blood Tank nearby for demanding ones.',
    ],
  },
  {
    id: 'twilight-forest',
    name: 'Twilight Forest',
    category: 'exploration',
    description: 'A sprawling magical dimension of dungeons and bosses, gated by progression keys and unique biomes.',
    machines: [
      { name: 'Twilight Portal', desc: 'A lake + flowers ritual opens the dimension entrance.' },
      { name: 'Boss Key Structures', desc: "Labyrinth-like dungeons guarding each boss's key item." },
      { name: 'Trophy Pedestals', desc: 'Display defeated boss trophies, some granting passive buffs.' },
    ],
    recipes: [
      { ingredients: 'Diamond block ring + Flowers + Water', output: 'Twilight Forest Portal' },
      { ingredients: 'Naga Scale / Lich Wand drops', output: 'Progression key items' },
      { ingredients: 'Boss trophy + Pedestal', output: 'Passive world buff' },
    ],
    progression: [
      'Build the portal ritual to enter the Twilight Forest.',
      'Clear early bosses (Naga, Lich) for progression items.',
      'Unlock Twilight biome-specific dungeons and gear.',
      'Progress through boss-gated areas in the intended order.',
      'Fight endgame bosses for the best Twilight-exclusive loot.',
    ],
    resourceChains: [
      { resource: 'Ironwood', chain: 'Twilight Forest trees → Ironwood Logs → early Twilight tools/armor' },
      { resource: 'Fiery/Knightmetal', chain: 'Boss drops → Fiery Ingot / Knightmetal → high-tier Twilight gear' },
    ],
    tips: [
      'Progression is boss-gated — some areas are walled off until you beat an earlier boss.',
      'Bring food and a shield; several dungeons are maze-like and drawn out.',
      "Trophies aren't just decorative — many grant a passive buff once placed.",
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
];
