const showCategories = [
    {
        id: 'comedy',
        name: 'Comédia',
        path: 'comedia'
    },
    {
        id: 'drama',
        name: 'Drama',
        path: 'drama'
    }
];

/**
 * Returns all showCategories available
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getAll() {
    return new Promise(resolve => {
        process.nextTick(() => {
            resolve(showCategories);
        });
    });
}

/**
 * Returns the requested showCategories, if it exists
 * @param {string} id the showCategories ID
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getById(id) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            const showCategory = showCategories.filter(s => s.id === id)[0];

            if (!showCategory) {
                return reject(new Error(`There is no show category with the ID '${id}'.`));
            }

            return resolve(showCategory);
        });
    });
}
