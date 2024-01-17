import Clothes from "./expense/Clothes.vue";
import Education from "./expense/Education.vue";
import Food from "./expense/Food.vue";
import Fun from "./expense/Fun.vue";
import Grocery from "./expense/Grocery.vue";
import Home from "./expense/Home.vue";
import Transport from "./expense/Transport.vue";
import Travel from "./expense/Travel.vue";
import Income from "./income/IncomeIcon"
import Expenses from "./expense/ExpenseCategory"

export const iconsMap = {
  income: {
    default: Income,
    travel: Travel,

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
    salon:Grocery,
  },
};
