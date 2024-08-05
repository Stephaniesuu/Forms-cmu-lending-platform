export function compareValues(a: string, b: string) {
    const parseValue = (value: string) => {
      const number = parseFloat(value.slice(1, -1));
      const unit = value.slice(-1);
      let multiplier = 1;
  
      if (unit === 'M') {
        multiplier = 1000;
      } else if (unit === 'K') {
        multiplier = 1;
      }
  
      return number * multiplier;
    };
  
    const valueA = parseValue(a);
    const valueB = parseValue(b);
  
    if (valueA > valueB) return 1;
    if (valueA < valueB) return -1;
    return 0;
  }
  
  export function compareDates(date1: string, date2: string) {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('-').map(Number);
      // Assuming the year is in the format 'yy', convert it to 'yyyy'
      const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust as needed for your use case
      return new Date(fullYear, month - 1, day); // month is 0-indexed in Date
    };
  
    const dateObj1 = parseDate(date1);
    const dateObj2 = parseDate(date2);
  
    if (dateObj1 > dateObj2) return 1;
    if (dateObj1 < dateObj2) return -1;
    return 0;
  }
  
  export const formatAddress = (address: string): string => {
    return `${address.slice(0, 4)}...${address.slice(-3)}`;
  };
