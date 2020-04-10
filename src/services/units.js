import pluralize from 'pluralize';
import intl from 'intl';
import 'intl/locale-data/jsonp/en.js';

const formatter = new intl.NumberFormat('en');

const parseUnit = (unitVal) => {
  const [value, unit] = unitVal.split(':');

  return {value, unit};
}

const unitToString = (unitVal) => {
  const {value, unit} = parseUnit(unitVal);
  return `${formatter.format(value)} ${pluralize(unit, Number.parseFloat(value))}`;
}

export { parseUnit, unitToString };


