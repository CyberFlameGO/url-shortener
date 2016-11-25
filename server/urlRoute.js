import express from 'express';
import firebase from 'firebase';
import { decode, encode } from '../app/scripts/base58';

const fireConfig = {
  apiKey: 'AIzaSyDZoKc_3Fm3tUe-ip7ebzEMK2bhhjEt4Wk',
  authDomain: 'urls-3ee47.firebaseapp.com',
  databaseURL: 'https://urls-3ee47.firebaseio.com',
};

const fireRef = firebase.initializeApp(fireConfig);
const router = express.Router();
const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}[.]{0,1}/;

router.post('/api/submit', (req, res) => {
  if (!re.test(req.body.url)) {
    res.json({ error: 'Not a valid url' });
    return false;
  }
  return fireRef.database().ref('count').once('value', snap => snap.val())
    .then((c) => {
      const count = c.val();
      const newCount = count + 1;
      const short = encode(newCount);

      fireRef.database().ref(`urls/${newCount}`).set({
        url: req.body.url,
        short,
      }).then(() => {
        fireRef.database().ref('count').set(newCount);
        res.json({ short });
      });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id.startsWith('__') || id === 'favicon.ico') return false;

  return fireRef.database().ref(`urls/${decode(id)}`).once('value', snap => snap.val())
    .then((urlRef) => {
      const { url } = urlRef.val();
      res.redirect(url);
    });
});

export default router;
