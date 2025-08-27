import { enUS } from "date-fns/locale";

const strictLocale = {
   ...enUS,
   formatDistance: (token, count, options) => {
      const result = enUS.formatDistance(token, count, options);
      // remove "about", "over", "almost"
      return result.replace(/about |over |almost /g, '');
   }
};

export default strictLocale;