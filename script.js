const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
  },
};
//PART 1
for (let item of adventurer.inventory) {
  console.log(item);
}

adventurer.companion.companion = {
  name: "Frank",
  type: "flea",
  inventory: ["small hat", "sunglasses"],
};

function roll(mod) {
  const result = Math.floor(Math.random() * 20) + 1 + mod;
  console.log(`${this.name} rolled a ${result}.`);
}
adventurer.roll = roll;
adventurer.roll(2);
console.log(adventurer);
//Part2: Class Fantasy

class Character {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
}

//create the robin using the character class
//let each companion also inherit the roll
const robin = new Character("Robin");
robin.inventory = ["sword", "potion", "artifact"];

robin.companion = new Character("Leo");
robin.companion.type = "Cat";

robin.companion.companion = new Character("Frank");
robin.companion.companion.type = "Flea";
robin.companion.companion.inventory = ["small hat", "sunglasses"];

robin.roll();
robin.companion.roll();
robin.companion.companion.roll();

//part 3: Class Features

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
    super(name);

    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(
        `Invalid role: ${role}. Must be one of: ${Adventurer.ROLES.join(", ")}`
      );
    }

    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    this.roll();
  }
}

//companion classes

class Companion extends Character {
  constructor(name, type, ability) {
    super(name);
    this.type = type;
    this.ability = ability;
    this.loyalty = 5; // Scale of 1–10
  }

  assist() {
    console.log(`${this.name} the ${this.type} assists their adventurer!`);
    this.increaseLoyalty();
  }

  increaseLoyalty() {
    if (this.loyalty < 10) {
      this.loyalty++;
      console.log(`${this.name}'s loyalty increased to ${this.loyalty}.`);
    } else {
      console.log(`${this.name} is already at max loyalty!`);
    }
  }

  useAbility() {
    console.log(`${this.name} uses their special ability: ${this.ability}!`);
    this.roll(); // maybe ability success depends on a roll
  }
}

const robin = new Adventurer("Robin", "Fighter");
robin.inventory.push("sword", "potion", "artifact");

const leo = new Companion("Leo", "Cat", "Stealth Pounce");
const frank = new Companion("Frank", "Flea", "Buzzy Distraction");
frank.inventory.push("small hat", "sunglasses");

leo.companion = frank;
robin.companion = leo;

robin.scout();
leo.assist();
frank.useAbility();

//Part 4: Class Uniforms

console.log("Character max health:", Character.MAX_HEALTH);
console.log("Available roles:", Adventurer.ROLES);

//part 5

class AdventurerFactory {
  constructor(role) {
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role for factory: ${role}`);
    }

    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }

  listAll() {
    return this.adventurers.map((a) => a.name);
  }
}

//test

const healerGuild = new AdventurerFactory("Healer");

const robin = healerGuild.generate("Robin");
const jesse = healerGuild.generate("Jesse");
const kai = healerGuild.generate("Kai");

console.log(healerGuild.findByName("Jesse"));
