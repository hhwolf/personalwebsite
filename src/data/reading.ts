import type { StaticImageData } from "next/image";
import carelessPeople from "@/assets/books/careless-people.jpg";
import cryingInHMart from "@/assets/books/crying-in-h-mart.jpg";
import illusionOfChoice from "@/assets/books/illusion-of-choice.jpg";
import meaningOfYourLife from "@/assets/books/meaning-of-your-life.jpg";
import psychologyOfMoney from "@/assets/books/psychology-of-money.jpg";
import threeBodyProblem from "@/assets/books/three-body-problem.jpg";
import untetheredSoul from "@/assets/books/untethered-soul.jpg";

export type Book = {
  title: string;
  author?: string;
  /** Cover image (static import from src/assets/books). Without one, a typographic card is shown. */
  cover?: StaticImageData;
};

/** What I'm reading, roughly in order. */
export const reading: Book[] = [
  { title: "The Three-Body Problem", author: "Liu Cixin", cover: threeBodyProblem },
  { title: "The Illusion of Choice", author: "Richard Shotton", cover: illusionOfChoice },
  { title: "The Untethered Soul", author: "Michael A. Singer", cover: untetheredSoul },
  { title: "Crying in H Mart", author: "Michelle Zauner", cover: cryingInHMart },
  { title: "The Psychology of Money", author: "Morgan Housel", cover: psychologyOfMoney },
  { title: "Careless People", author: "Sarah Wynn-Williams", cover: carelessPeople },
  { title: "The Meaning of Your Life", author: "Arthur C. Brooks", cover: meaningOfYourLife },
];
