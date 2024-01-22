const express = require('express');
const cors = require('cors');
const { isNil } = require('lodash');
const data = require('./data');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function containsClassifications(classifications, school) {
  
  if (!classifications) return true;

  const selectedClassifications = new Set(classifications.split(','));
  const schoolClassifications = school.classification;

  for (const classification of schoolClassifications) {
    if (selectedClassifications.has(classification)) {
      return true;
    }
  }

  return false;
}

function applyFilters(schools, { query, sort, classifications, minMedia, maxMedia }) {
  const filteredSchools = [];

  for (const school of schools) {
    if (query && !school.name.toLowerCase().includes(query.toLowerCase())) {
      continue;
    }

    if (!containsClassifications(classifications, school)) {
      continue;
    }

    if (!isNil(minMedia) && school.media / 100 < minMedia) {
      continue;
    }

    if (!isNil(maxMedia) && school.media / 100 > maxMedia) {
      continue;
    }

    filteredSchools.push(school);
  }

  return filteredSchools.sort((a, b) => {
    const { name, media } = a;
    const { name: nameB, media: mediaB } = b;

    switch (sort) {
      case 'mediaDesc':
        return mediaB - media;
      case 'mediaAsc':
        return media - mediaB;
      default:
        return name.localeCompare(nameB);
    }
  });
}

app.get('/items', (req, res) => {
  const maxMedia = Math.round(
    Math.max(...data.map((school) => school.media)),
  );

  // Simula a solicitação para um serviço de pesquisa de backend como o elasticsearch
  setTimeout(() => {
    res.json({ schools: applyFilters(data, req.query), maxMedia });
  }, 250);
});

app.listen(3001, () => {
  console.info('server listening on: 3001');
});
