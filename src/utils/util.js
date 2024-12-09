export function getDate() {
  const objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();

  let format = day + '.' + month + '.' + year;

  return format;
}

export function formatOnlyFirstUpper(string) {
  let words = string.split(' ');
  for (let i in words) {
    let firstLetterIdx = 0;
    if (words[i].charAt(0) === `'`) {
      firstLetterIdx++;
    }
    words[i] =
      words[i].slice(0, firstLetterIdx) +
      words[i].charAt(firstLetterIdx) +
      words[i].slice(firstLetterIdx + 1).toLowerCase();
  }
  return words.join(' ');
}
