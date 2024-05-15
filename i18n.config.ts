import { createRuRule } from "~/shared/lib/i18n/plural-rules/ru";

export default defineI18nConfig(() => {
  return {
    fallbackLocale: "ru",
    pluralRules: {
      ru: createRuRule
    },
    datetimeFormats: {
      ru: {
        long: {
          dateStyle: "short",
          timeStyle: "short"
        },
        short: {
          dateStyle: "short"
        },
        day: {
          day: "2-digit"
        },
        dayWithMonth: {
          day: "2-digit",
          month: "2-digit"
        }
      }
    },
    numberFormats: {
      ru: {
        currency: {
          minimumFractionDigits: 2
        },
        "currency-short": {
          minimumFractionDigits: 0,
          currency: "RUB",
          style: "currency"
        }
      }
    }
  };
});
