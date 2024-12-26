import Mammoth from 'mammoth';
import { cyrilicToLatin } from 'serbian-script-converter';
import { fieldsForFormating } from './consts';
import { PatchType, TextRun, patchDocument } from 'docx';

function getCurrentDate() {
  const today = new Date();
  return today.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatField(key, value, fieldsForFormating) {
  const fieldName = key.split('_')[0];
  return fieldsForFormating.includes(fieldName)
    ? formatOnlyFirstUpper(value)
    : value;
}

function formatOnlyFirstUpper(string) {
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

export async function convertDocToHtml(arrayBuffer) {
  try {
    const result = await Mammoth.convertToHtml({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error('Failed to convert document to HTML');
  }
}

export async function fillWordDocument(wordBin, readFields) {
  const patches = {};
  Object.keys(readFields).forEach((key) => {
    const val = formatField(key, readFields[key], fieldsForFormating);
    patches[key] = {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({ text: val, underline: { type: 'single' } })],
    };
  });

  const res = await patchDocument(wordBin, { patches });
  return res;
}

export function getDate() {
  const objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();

  let format = day + '.' + month + '.' + year;

  return format;
}

export function addCustomFields(fields) {
  const updatedFields = Object.entries(fields).reduce((acc, [key, value]) => {
    acc[key] = typeof value === 'string' ? cyrilicToLatin(value) : value;
    return acc;
  }, {});

  updatedFields['name_1'] =
    `${updatedFields['GivenName_1']} ${updatedFields['Surname_1']}`;
  updatedFields['name_2'] =
    `${updatedFields['GivenName_2']} ${updatedFields['Surname_2']}`;
  updatedFields['date'] = getCurrentDate();

  return updatedFields;
}
