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

  duel(opponent) {
    console.log(`⚔️ ${this.name} challenges ${opponent.name} to a duel!`);

    while (this.health > 50 && opponent.health > 50) {
      const myRoll = this.roll();
      const opponentRoll = opponent.roll();

      if (myRoll > opponentRoll) {
        opponent.health -= 1;
        console.log(
          `${this.name} wins the round. ${opponent.name}'s health: ${opponent.health}`
        );
      } else if (opponentRoll > myRoll) {
        this.health -= 1;
        console.log(
          `${opponent.name} wins the round. ${this.name}'s health: ${this.health}`
        );
      } else {
        console.log("It's a tie! No damage dealt.");
      }
    }

    const winner = this.health > 50 ? this.name : opponent.name;
    console.log(`🏆 The duel is over! ${winner} is victorious!`);
  }
}

//companion classes

class Companion extends Character {
  constructor(name, type, ability) {
    super(name);
    this.type = type;
    this.ability = ability;
    this.loyalty = 5;
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
    this.roll(); 
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

//part 6

// duel(opponent) {
//   console.log(`⚔️ ${this.name} challenges ${opponent.name} to a duel!`);

//   while (this.health > 50 && opponent.health > 50) {
//     const myRoll = this.roll();
//     const opponentRoll = opponent.roll();

//     if (myRoll > opponentRoll) {
//       opponent.health -= 1;
//       console.log(`${this.name} wins the round. ${opponent.name}'s health: ${opponent.health}`);
//     } else if (opponentRoll > myRoll) {
//       this.health -= 1;
//       console.log(`${opponent.name} wins the round. ${this.name}'s health: ${this.health}`);
//     } else {
//       console.log("It's a tie! No damage dealt.");
//     }
//   }

//   const winner = this.health > 50 ? this.name : opponent.name;
//   console.log(`🏆 The duel is over! ${winner} is victorious!`);
// }

const fighter1 = new Adventurer("Thorne", "Fighter");
const fighter2 = new Adventurer("Mira", "Fighter");

fighter1.duel(fighter2);

//part 7

class SWE extends Character {
  constructor(name, element) {
    super(name);
    this.element = element;
    this.health = 300;
    this.inventory.push("Linux Computer");
  }

  socialAwkwardness(target) {
    const damage = Math.floor(Math.random() * 10) + 5;
    target.health -= damage;
    console.log(
      `${this.name} gives ${this.element} to ${target.name}, dealing ${damage} social damage 🙀!`
    );
  }
}

const Jesse = new SWE("Jesse", "anxiety");
Jesse.socialAwkwardness(robin);

class upperManagment extends Character {
  constructor(name, element) {
    super(name);
    this.element = element;
    this.health = 1;
    this.inventory.push("Jira Tickets🔖");
  }

  performanceReview(target) {
    const damage = Math.floor(Math.random() * 10) + 5;
    target.health -= damage;
    console.log(
      `${this.name} gives ${target.name} a performance review 📊! It deals ${damage} damage 💣!`
    );
  }
}
