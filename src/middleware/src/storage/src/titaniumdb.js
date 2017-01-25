import { NotFoundError } from './errors';
import Promise from 'es6-promise';
import map from 'lodash/map';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
const idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';
let isSupported;

export default class TitaniumDB {
  constructor(name = 'kinvey') {
    this.name = name;
  }

  execute(collection, query, parameters) {
    const escapedCollection = `"${collection}"`;
    const isMulti = isArray(query);
    query = isMulti ? query : [[query, parameters]];

    try {
      if (!this.db) {
        this.db = Ti.Database.open(this.name);
      }

      // Start a transaction
      this.db.execute('BEGIN TRANSACTION');

      // Create the table if it does not exist yet
      this.db.execute(`CREATE TABLE IF NOT EXISTS ${escapedCollection} ` +
        '(key BLOB PRIMARY KEY NOT NULL, value BLOB NOT NULL)');

      // Execute queries
      const response = map(query, (parts) => {
        const sql = parts[0].replace('#{collection}', escapedCollection);
        const cursor = this.db.execute(sql, parts[1]);
        const response = { rowCount: this.db.getRowsAffected(), result: null };

        if (cursor) {
          response.result = [];

          while (cursor.isValidRow()) {
            const entity = JSON.parse(cursor.fieldByName('value'));
            response.result.push(entity);
            cursor.next();
          }

          cursor.close();
        }

        return response;
      });

      // Commit the transaction
      this.db.execute('COMMIT TRANSACTION');

      return Promise.resolve(isMulti ? response : response.shift());
    } catch (error) {
      return Promise.reject(error);
    }
  }

  find(collection) {
    const sql = 'SELECT value FROM #{collection}';
    const promise = this.execute(collection, sql, []).then(response => response.result).catch((error) => {
      if (error instanceof NotFoundError) {
        return [];
      }

      throw error;
    });
    return promise;
  }

  findById(collection, id) {
    const sql = 'SELECT value FROM #{collection} WHERE key = ?';
    const promise = this.execute(collection, sql, [id]).then((response) => {
      const entities = response.result;

      if (entities.length === 0) {
        throw new NotFoundError(`An entity with _id = ${id} was not found in the ${collection} ` +
          `collection on the ${this.name} webSQL database.`);
      }

      return entities[0];
    });
    return promise;
  }

  save(collection, entities) {
    const queries = [];
    entities = map(entities, (entity) => {
      queries.push([
        'INSERT OR REPLACE INTO #{collection} (key, value) VALUES (?, ?)',
        [entity[idAttribute], JSON.stringify(entity)]
      ]);

      return entity;
    });

    const promise = this.execute(collection, queries, null).then(() => entities);
    return promise;
  }

  removeById(collection, id) {
    const promise = this.execute(collection, [
      ['SELECT value FROM #{collection} WHERE key = ?', [id]],
      ['DELETE FROM #{collection} WHERE key = ?', [id]],
    ], null).then((response) => {
      const entities = response[0].result;
      const count = response[1].rowCount || entities.length;

      if (count === 0) {
        throw new NotFoundError(`An entity with _id = ${id} was not found in the ${collection} ` +
          `collection on the ${this.name} webSQL database.`);
      }

      return entities[0];
    });

    return promise;
  }

  clear() {
    if (!this.db) {
      this.db = Ti.Database.open(this.name);
    }

    if (isFunction(this.db.remove)) { // Android
      this.db.remove();
      return Promise.resolve(null);
    }

    if (this.db.file && this.db.file.deleteFile()) { // iOS
      return Promise.resolve(null);
    }

    return Promise.reject(new Error('The ability to delete the database is not implemented for this platform.'));
  }

  static loadAdapter(name) {
    const db = new TitaniumDB(name);

    if (typeof isSupported !== 'undefined') {
      if (isSupported) {
        return Promise.resolve(db);
      }

      return Promise.resolve(undefined);
    }

    if (typeof Ti === 'undefined' || typeof Ti.Database === 'undefined') {
      isSupported = false;
      return Promise.resolve(undefined);
    }

    return db.save('__testSupport', { _id: '1' })
      .then(() => {
        isSupported = true;
        return db;
      })
      .catch(() => {
        isSupported = false;
        return undefined;
      });
  }
}
