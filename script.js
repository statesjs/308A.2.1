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
for (let i of adventurer.inventory) {
  console.log(i);
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

//Part2: Class Fantasy

class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
}
