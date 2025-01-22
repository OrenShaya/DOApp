export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    save,
  }
  
  function query(entityType, delay = 1) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
  }
  
  function get(entityType, entityId) {
    return query(entityType)
      .then((entities) => {
        const entity = entities.find((entity) => entity.id === entityId)
        if (!entity)
          throw new Error(
            `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
          )
        return entity
      })
  }
  
  function post(entityType, newEntity) {
    newEntity = { ...newEntity }
    newEntity.id = _makeId()
    return query(entityType)
      .then((entities) => {
        entities.unshift(newEntity)
        save(entityType, entities)
        return newEntity
      })
  }
  
  function put(entityType, updatedEntity) {
    return query(entityType)
      .then((entities) => {
        const idx = entities.findIndex((entity) => entity.id === updatedEntity.id)
        if (idx < 0)
          throw new Error(
            `Update failed, cannot find entity with id: ${entityId} in: ${entityType}`
          )
        entities.splice(idx, 1, updatedEntity)
        save(entityType, entities)
        return updatedEntity
      })
  }
  
  function remove(entityType, entityId) {
    return query(entityType)
      .then((entities) => {
        const idx = entities.findIndex((entity) => entity.id === entityId)
        if (idx < 0)
          throw new Error(
            `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
          )
        entities.splice(idx, 1)
        save(entityType, entities)
      })
  }
  
  //** Private functions 
  
  function save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
  }