export default function (start = "+7") {
  let data = this;

  if (data.includes(start)) {
    data = data.slice(data.indexOf(start) + start.length);
  }

  if (!/^\d+$/.test(data)) {
    return start;
  }

  let result = start;

  if (!data.length) {
    return result;
  }

  result += ` (${data.slice(0, 3)})`;

  if (data.length < 4) {
    return result;
  }

  result += ` ${data.slice(3, 6)}`;

  if (data.length < 7) {
    return result;
  }

  result += ` ${data.slice(6, 8)}`;

  if (data.length < 9) {
    return result;
  }

  return result + `-${data.slice(8)}`;
}
