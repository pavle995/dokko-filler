import React from 'react';
import { formatOnlyFirstUpper } from '~utils/util';
import { downloadFile, getDocForm } from '~utils/fileDownloader';
import { PatchType, TextRun, patchDocument } from 'docx';

const fieldsForFormating = [
  'name',
  'Street',
  'Place',
  'GivenName',
  'Surname',
  'ParentGivenName',
  'PlaceOfBirth',
  'CommunityOfBirth',
  'StateOfBirth',
  'Community',
];

function formatField(key, value) {
  const fieldName = key.split('_')[0];
  if (fieldsForFormating.includes(fieldName)) {
    return formatOnlyFirstUpper(value);
  }

  return value;
}

async function fillWordDocument(wordBin, readFields) {
  const patches = {};
  Object.keys(readFields).forEach((key) => {
    const val = formatField(key, readFields[key]);
    patches[key] = {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({ text: val, underline: { type: 'single' } })],
    };
  });
  const res = await patchDocument(wordBin, { patches }).then((doc) => doc);

  return res;
}

function DocumentGenerator({ templateURL, readFields }) {
  const saveWord = async () => {
    console.log(readFields);
    const docS3Bytes = await getDocForm(templateURL);
    const filledBytes = await fillWordDocument(docS3Bytes, readFields);
    const filledBlob = new Blob([filledBytes]);

    const fileName = `template-word.docx`;
    downloadFile(filledBlob, fileName);
    // logFill('1', fileName);
  };

  return <button onClick={saveWord}>Generate Word Document</button>;
}

export default DocumentGenerator;
