import { validPositiveInteger, validRate, validMoney } from "@/utils/validate";

// 校验正整数
export const intValidator = (rule, value, callback) => {
  if (value && validPositiveInteger(value)) {
    callback();
  } else {
    callback(new Error("请输入正整数"));
  }
};

// 校验比例（不大于100，保留2位小数）
export const rateValidator = (rule, value, callback) => {
  if (value && validRate(value)) {
    callback();
  } else {
    callback(new Error("请输入正确格式，不大于100，最多保留2位小数"));
  }
};

// 校验金额（保留2位小数）
export const moneyValidator = (rule, value, callback) => {
  if (value && validMoney(value)) {
    callback();
  } else {
    callback(new Error("请输入正确格式，最多保留2位小数"));
  }
};
