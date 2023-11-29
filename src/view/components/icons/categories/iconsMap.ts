import { Clothes } from "./expense/Clothes";
import { Education } from "./expense/Education";

import { Food } from "./expense/Food";
import { Fun } from "./expense/Fun";
import { Grocery } from "./expense/Grocery";
import { Home } from "./expense/Home";
import { Transport } from "./expense/Transport";
import { Travel } from "./expense/Travel";
import Income from "./income/IncomeIcon"
import Expenses from "./expense/ExpenseCategory"

export const iconsMap = {
  income: {
    default: Income,
  },
  expense: {
    default: Expenses,
    food: Food,
    fun: Fun,
    grocery: Grocery,
    home: Home,
    education: Education,
    clothes: Clothes,
    transport: Transport,
    travel: Travel,
  },
};
