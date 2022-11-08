import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('Put to the database');
const jateDb = await openDB('jate', 1);
const text = jateDb.transaction('jate', 'readwrite');
const store = text.objectStore('jate');
const request = store.put({ id: 1, content: content });
const result = await request;
console.log('Jate infor data saved to the database', result);

};

// console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request =store.get(1);
  const result = await request;
  console.log('result.value', result);
  return result?.value;
};

// console.error('getDb not implemented');

initdb();