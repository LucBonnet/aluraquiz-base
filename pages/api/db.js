import db from '../../db.json';

export default function dbHandler(req, res) {
  if(req.method === 'OPTIONS'){
    res.status(200).end();
    return;
  }

  res.sendHeader('Access-Control-Allow-Credentials', true);
  res.sendHeader('Access-Control-Allow-Origin', '*');
  res.sendHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  res.json(db);
}