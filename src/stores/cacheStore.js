import Promise from 'babybird';
import Sync from '../sync';
import { NetworkStore } from './networkstore';
import { AuthType, HttpMethod } from '../enums';
import { KinveyError, NotFoundError } from '../errors';
import { LocalRequest } from '../requests/local';
import { DeltaFetchRequest } from '../requests/deltafetch';
import { Query } from '../query';
import { Aggregation } from '../aggregation';
import { Log } from '../log';
import { Metadata } from '../metadata';
import filter from 'lodash/filter';
import url from 'url';
import assign from 'lodash/assign';
import result from 'lodash/result';
import isArray from 'lodash/isArray';
import keyBy from 'lodash/keyBy';
import map from 'lodash/map';
import differenceBy from 'lodash/differenceBy';
const idAttribute = process.env.KINVEY_ID_ATTRIBUTE || '_id';
const syncEnabledSymbol = Symbol();

/**
 * The CacheStore class is used to find, save, update, remove, count and group enitities
 * in a collection on the network using a cache on the device.
 */
export class CacheStore extends NetworkStore {
  /**
   * Creates a new instance of the CacheStore class.
   *
   * @param   {string}  name   Name of the collection
   *
   * @throws  {KinveyError}   If the name provided is not a string.
   */
  constructor(name) {
    super(name);

    /**
     * @type {Number}
     */
    this.ttl = undefined;

    /**
     * @type {Sync}
     */
    this.sync = new Sync();
    this.sync.client = this.client;

    // Enable sync
    this.enableSync();
  }

  get client() {
    return super.client;
  }

  set client(client) {
    super.client = client;
    this.sync.client = client;
  }

  disableSync() {
    this[syncEnabledSymbol] = false;
  }

  enableSync() {
    this[syncEnabledSymbol] = true;
  }

  isSyncEnabled() {
    return !!this[syncEnabledSymbol];
  }

  /**
   * Finds all entities in a collection. A query can be optionally provided to return
   * a subset of all entities in a collection or omitted to return all entities in
   * a collection. The number of entities returned will adhere to the limits specified
   * at http://devcenter.kinvey.com/rest/guides/datastore#queryrestrictions. A
   * promise will be returned that will be resolved with the entities or rejected with
   * an error.
   *
   * @param   {Query}                 [query]                                   Query used to filter result.
   * @param   {Object}                [options]                                 Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data retrieved
   *                                                                            from the cache.
   * @return  {Promise}                                                         Promise
   */
  async find(query, options = {}) {
    options = assign({
      useDeltaFetch: true
    }, options);

    if (query && !(query instanceof Query)) {
      throw new KinveyError('Invalid query. It must be an instance of the Query class.');
    }

    const request = new LocalRequest({
      method: HttpMethod.GET,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: this._pathname
      }),
      properties: options.properties,
      query: query,
      timeout: options.timeout,
      client: this.client
    });
    const cachedEntities = await request.execute().then(response => response.data);
    const promise = this.syncCount().then(count => {
      if (count > 0) {
        return this.push().then(() => this.syncCount());
      }

      return count;
    }).then(count => {
      if (count > 0) {
        throw new KinveyError(`Unable to load data from the network. There are ${count} entities that need ` +
          'to be synced before data is loaded from the network.');
      }

      if (options.useDeltaFetch) {
        const request = new DeltaFetchRequest({
          method: HttpMethod.GET,
          authType: AuthType.Default,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: this._pathname
          }),
          properties: options.properties,
          query: query,
          timeout: options.timeout,
          client: this.client
        });
        return request.execute().then(response => response.data);
      }

      return super.find(query, options);
    }).then(networkEntities => {
      const removedEntities = differenceBy(cachedEntities, networkEntities, idAttribute);
      const removedEntityIds = Object.keys(keyBy(removedEntities, idAttribute));
      const removeQuery = new Query();
      removeQuery.contains(idAttribute, removedEntityIds);
      const request = new LocalRequest({
        method: HttpMethod.DELETE,
        url: url.format({
          protocol: this.client.protocol,
          host: this.client.host,
          pathname: this._pathname
        }),
        properties: options.properties,
        query: removeQuery,
        timeout: options.timeout,
        client: this.client
      });
      return request.execute().then(() => this._cache(networkEntities));
    });

    return {
      cache: cachedEntities,
      networkPromise: promise
    };
  }

  /**
   * Groups entities in a collection. An aggregation can be optionally provided to group
   * a subset of entities in a collection or omitted to group all the entities
   * in a collection. A promise will be returned that will be resolved with the result
   * or rejected with an error.
   *
   * @param   {Aggregation}           aggregation                               Aggregation used to group entities.
   * @param   {Object}                [options]                                 Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data retrieved
   *                                                                            from the cache.
   * @return  {Promise}                                                         Promise
   */
  async group(aggregation, options = {}) {
    if (!(aggregation instanceof Aggregation)) {
      throw new KinveyError('Invalid aggregation. It must be an instance of the Aggregation class.');
    }

    const request = new LocalRequest({
      method: HttpMethod.GET,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this._pathname}/_group`
      }),
      properties: options.properties,
      data: aggregation.toJSON(),
      timeout: options.timeout,
      client: this.client
    });
    const cachedResult = await request.execute().then(response => response.data);
    const promise = this.syncCount().then(count => {
      if (count > 0) {
        return this.push().then(() => this.syncCount());
      }

      return count;
    }).then(count => {
      if (count > 0) {
        throw new KinveyError(`Unable to load data from the network. There are ${count} entities that need ` +
          'to be synced before data is loaded from the network.');
      }

      return super.group(aggregation, options);
    });

    return {
      cache: cachedResult,
      networkPromise: promise
    };
  }

  /**
   * Counts entities in a collection. A query can be optionally provided to count
   * a subset of entities in a collection or omitted to count all the entities
   * in a collection. A promise will be returned that will be resolved with the count
   * or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query to count a subset of entities.
   * @param   {Object}                [options]                                 Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data retrieved
   *                                                                            from the cache.
   * @return  {Promise}                                                         Promise
   */
  async count(query, options = {}) {
    if (query && !(query instanceof Query)) {
      throw new KinveyError('Invalid query. It must be an instance of the Query class.');
    }
    const request = new LocalRequest({
      method: HttpMethod.GET,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this._pathname}/_count`
      }),
      properties: options.properties,
      query: query,
      timeout: options.timeout,
      client: this.client
    });
    const cachedCount = await request.execute().then(response => response.data);
    const promise = this.syncCount().then(count => {
      if (count > 0) {
        return this.push().then(() => this.syncCount());
      }

      return count;
    }).then(count => {
      if (count > 0) {
        throw new KinveyError(`Unable to load data from the network. There are ${count} entities that need ` +
          'to be synced before data is loaded from the network.');
      }

      return super.count(query, options);
    });

    return {
      cache: cachedCount,
      networkPromise: promise
    };
  }

  /**
   * Retrieves a single entity in a collection by id. A promise will be returned that will
   * be resolved with the entity or rejected with an error.
   *
   * @param   {string}                id                                        Document Id
   * @param   {Object}                [options]                                 Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data retrieved
   *                                                                            from the cache.
   * @return  {Promise}                                                         Promise
   */
  async findById(id, options = {}) {
    options = assign({
      useDeltaFetch: true
    }, options);

    if (!id) {
      Log.warn('No id was provided to retrieve an entity.', id);
      return null;
    }

    const request = new LocalRequest({
      method: HttpMethod.GET,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this._pathname}/${id}`
      }),
      properties: options.properties,
      timeout: options.timeout,
      client: this.client
    });
    let cachedEntity = null;

    try {
      cachedEntity = await request.execute().then(response => response.data);
    } catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw error;
      }

      cachedEntity = null;
    }

    const promise = this.syncCount().then(count => {
      if (count > 0) {
        return this.push().then(() => this.syncCount());
      }

      return count;
    }).then(count => {
      if (count > 0) {
        throw new KinveyError(`Unable to load data from the network. There are ${count} entities that need ` +
         'to be synced before data is loaded from the network.');
      }

      if (options.useDeltaFetch) {
        const request = new DeltaFetchRequest({
          method: HttpMethod.GET,
          authType: AuthType.Default,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this._pathname}/${id}`
          }),
          properties: options.properties,
          timeout: options.timeout,
          client: this.client
        });
        return request.execute().then(response => response.data);
      }

      return super.findById(id, options);
    }).then(data => this._cache(data)).catch(error => {
      if (error instanceof NotFoundError) {
        const request = new LocalRequest({
          method: HttpMethod.DELETE,
          authType: AuthType.Default,
          url: url.format({
            protocol: this.client.protocol,
            host: this.client.host,
            pathname: `${this._pathname}/${id}`
          }),
          properties: options.properties,
          timeout: options.timeout,
          client: this.client
        });
        return request.execute().then(() => {
          throw error;
        });
      }

      throw error;
    });

    return {
      cache: cachedEntity,
      networkPromise: promise
    };
  }

  /**
   * Save a entity or an array of entities to a collection. A promise will be returned that
   * will be resolved with the saved entity/entities or rejected with an error.
   *
   * @param   {Object|Array}          entities                                  Entity or entities to save.
   * @param   {Object}                [options]                                 Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data saved
   *                                                                            in the cache.
   * @return  {Promise}                                                         Promise
   */
  async save(entities, options = {}) {
    let singular = false;

    if (!entities) {
      Log.warn('No entity was provided to be saved.', entities);
      return Promise.resolve(null);
    }

    const request = new LocalRequest({
      method: HttpMethod.POST,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: this._pathname
      }),
      properties: options.properties,
      body: entities,
      timeout: options.timeout
    });

    if (entities[idAttribute]) {
      request.method = HttpMethod.PUT;
      request.url = url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this._pathname}/${entities[idAttribute]}`
      });
    }

    entities = await request.execute().then(response => response.data);

    if (!isArray(entities)) {
      singular = true;
      entities = [entities];
    }

    await Promise.all(map(entities, entity => this.sync.save(this.name, entity, options)));
    const ids = Object.keys(keyBy(entities, idAttribute));
    const query = new Query().contains(idAttribute, ids);
    let push = await this.push(query, options);
    push = filter(push, result => !result.error);
    entities = map(push, result => result.entity);
    return singular ? entities[0] : entities;
  }

  /**
   * Remove entities in a collection. A query can be optionally provided to remove
   * a subset of entities in a collection or omitted to remove all entities in a
   * collection. A promise will be returned that will be resolved with a count of the
   * number of entities removed or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   */
  async remove(query, options = {}) {
    if (query && !(query instanceof Query)) {
      return Promise.reject(new KinveyError('Invalid query. It must be an instance of the Query class.'));
    }

    const request = new LocalRequest({
      method: HttpMethod.DELETE,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: this._pathname
      }),
      properties: options.properties,
      query: query,
      timeout: options.timeout,
      client: this.client
    });
    const result = await request.execute().then(response => response.data);
    const entities = filter(result.entities, entity => {
      const metadata = new Metadata(entity);
      return !metadata.isLocal();
    });
    await this._sync(entities, options);
    const pushQuery = new Query().contains(idAttribute, Object.keys(keyBy(entities, idAttribute)));
    await this.push(pushQuery, options);
    return result;
  }

  /**
   * Remove an entity in a collection. A promise will be returned that will be
   * resolved with a count of the number of entities removed or rejected with an error.
   *
   * @param   {string}                id                                        Document Id
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   */
  async removeById(id, options = {}) {
    if (!id) {
      Log.warn('No id was provided to be removed.');
      return Promise.resolve(null);
    }

    const request = new LocalRequest({
      method: HttpMethod.DELETE,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: `${this._pathname}/${id}`
      }),
      properties: options.properties,
      authType: AuthType.Default,
      timeout: options.timeout,
      client: this.client
    });
    const result = await request.execute().then(response => response.data);
    const entities = filter(result.entities, entity => {
      const metadata = new Metadata(entity);
      return !metadata.isLocal();
    });
    await this._sync(entities, options);
    const query = new Query().contains(idAttribute, Object.keys(keyBy(entities, idAttribute)));
    await this.push(query, options);
    return result;
  }

  /**
   * Push sync items for a collection to the network. A promise will be returned that will be
   * resolved with the result of the push or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query to push a subset of items.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   *
   * @example
   * var store = Kinvey.DataStore.getInstance('books');
   * store.push().then(function(result) {
   *   ...
   * }).catch(function(err) {
   *   ...
   * });
   */
  push(query, options = {}) {
    if (!this.isSyncEnabled()) {
      return Promise.reject(new KinveyError('Sync is disabled.'));
    }

    return this.sync.execute(this.name, query, options);
  }

  /**
   * Pull items for a collection from the network to your local cache. A promise will be
   * returned that will be resolved with the result of the pull or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query to pull a subset of items.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   *
   * @example
   * var store = Kinvey.Store.getInstance('books');
   * store.pull().then(function(result) {
   *   ...
   * }).catch(function(err) {
   *   ...
   * });
   */
  async pull(query, options = {}) {
    const count = await this.syncCount(null, options);

    if (count > 0) {
      throw new KinveyError('Unable to pull data. You must push the pending sync items first.',
        'Call store.push() to push the pending sync items before you pull new data.');
    }

    return this.find(query, options).then(result => result.networkPromise);
  }

  /**
   * Sync items for a collection. This will push pending sync items first and then
   * pull items from the network into your local cache. A promise will be
   * returned that will be resolved with the result of the pull or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query to pull a subset of items.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   *
   * @example
   * var store = Kinvey.Store.getInstance('books');
   * store.sync().then(function(result) {
   *   ...
   * }).catch(function(err) {
   *   ...
   * });
   */
  async sync(query, options = {}) {
    const push = await this.push(null, options);
    const pull = await this.pull(query, options);
    return {
      push: push,
      pull: pull
    };
  }

  /**
   * Count the number of entities waiting to be pushed to the network. A promise will be
   * returned with the count of entities or rejected with an error.
   *
   * @param   {Query}                 [query]                                   Query to count a subset of entities.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @param   {Number}                [options.ttl]                             Time to live for data retrieved
   *                                                                            from the local cache.
   * @return  {Promise}                                                         Promise
   *
   * @example
   * var store = Kinvey.Store.getInstance('books');
   * store.syncCount().then(function(count) {
   *   ...
   * }).catch(function(err) {
   *   ...
   * });
   */
  syncCount(query, options = {}) {
    if (!(query instanceof Query)) {
      query = new Query(result(query, 'toJSON', query));
    }

    query.equalTo('collection', this.name);
    return this.sync.count(query, options);
  }

  /**
   * Add or update entities stored in the cache. A promise will be returned with the entities
   * or rejected with an error.
   *
   * @param   {Object|Array}          entities                                  Entity(s) to add or update in the cache.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   */
  _cache(entities, options = {}) {
    return new LocalRequest({
      method: HttpMethod.PUT,
      url: url.format({
        protocol: this.client.protocol,
        host: this.client.host,
        pathname: this._pathname
      }),
      properties: options.properties,
      data: entities,
      timeout: options.timeout,
      client: this.client
    }).execute().then(response => response.data);
  }

  /**
   * Add entities to be pushed. A promise will be returned with null or rejected with an error.
   *
   * @param   {Object|Array}          entities                                  Entity(s) to add to the sync table.
   * @param   {Object}                options                                   Options
   * @param   {Properties}            [options.properties]                      Custom properties to send with
   *                                                                            the request.
   * @param   {Number}                [options.timeout]                         Timeout for the request.
   * @return  {Promise}                                                         Promise
   */
  async _sync(entities, options = {}) {
    let singuler = false;

    if (!this.isSyncEnabled()) {
      return null;
    }

    if (!isArray(entity)) {

    }

    return this.sync.notify(this.name, entities, options);
  }
}