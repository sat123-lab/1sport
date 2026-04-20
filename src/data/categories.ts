import badminton from "@/assets/cat-badminton.jpg";
import cricket from "@/assets/cat-cricket.jpg";
import football from "@/assets/cat-football.jpg";
import tennis from "@/assets/cat-tennis.jpg";
import fitness from "@/assets/cat-fitness.jpg";
import skates from "@/assets/cat-skates.jpg";

export type Category = {
  slug: string;
  name: string;
  image: string;
  subcategories: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: "badminton",
    name: "Badminton",
    image: badminton,
    subcategories: ["Rackets", "Shuttlecocks", "Shoes", "Kits / Combo Sets", "Strings", "Grips", "Bags", "Accessories"],
  },
  {
    slug: "cricket",
    name: "Cricket",
    image: cricket,
    subcategories: ["Bats", "Balls", "Gloves", "Pads", "Helmets", "Shoes", "Kits", "Accessories"],
  },
  {
    slug: "football",
    name: "Football",
    image: football,
    subcategories: ["Shoes / Studs", "Balls", "Jerseys", "Shin Guards", "Goalkeeper Gloves", "Accessories"],
  },
  {
    slug: "tennis",
    name: "Tennis",
    image: tennis,
    subcategories: ["Rackets", "Balls", "Shoes", "Strings", "Bags", "Accessories"],
  },
  {
    slug: "squash",
    name: "Squash",
    image: tennis,
    subcategories: ["Rackets", "Balls", "Shoes", "Grips", "Accessories"],
  },
  {
    slug: "endurance",
    name: "Endurance",
    image: fitness,
    subcategories: ["Running Shoes", "Gym Equipment", "Dumbbells", "Resistance Bands", "Yoga Mats", "Smart Watches", "Accessories"],
  },
  {
    slug: "volleyball",
    name: "Volleyball",
    image: football,
    subcategories: ["Volleyballs", "Shoes", "Nets", "Knee Pads", "Jerseys", "Accessories"],
  },
  {
    slug: "skates",
    name: "Skates",
    image: skates,
    subcategories: ["Roller Skates", "Inline Skates", "Skateboards", "Protective Gear", "Wheels & Parts", "Accessories"],
  },
  {
    slug: "scooters",
    name: "Scooters",
    image: skates,
    subcategories: ["Kids Scooters", "Adult Scooters", "Electric Scooters", "Helmets", "Spare Parts", "Accessories"],
  },
];
