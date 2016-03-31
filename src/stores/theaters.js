import _omit from 'lodash/omit';
import Theater from '../models/theater';

/**
 * Returns all theaters available (including unpublished ones)
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getAll() {
    return Theater.find()
        .then(theaters => theaters.map(theater => {
            try {

                return theater;
            } catch (e) {
                return null;
            }
        }).filter(theater => theater !== null));
}

/**
 * Returns the requested theater, if it exists
 * @param {string} id the theater ID
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getById(id) {
    return Theater.findById(id)
        .then(theater => {
            if (!theater) {
                throw new Error(`There is no page with the id ${id}`);
            }

            return theater;
        });
}

/**
 * Saves a theater in DB
 *
 * @param {Object} theater theater data
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function save(theater) {
    // Creating new theater
    if (!theater.id) {
        return Theater.create(theater)
            .then(newTheater => newTheater);
    }

    // Updating a theater
    return getById(theater.id)
        .then(oldTheater => {
            // If the user has somehow changed the published flag, we have to ignore it
            // The publish/unpublish method should be the way to handle this
            theater.published = oldTheater.published;

            // @todo: Move to model
            theater.lastModified = new Date();

            return Theater.findByIdAndUpdate(
                theater.id,
                theater,
                {new: true, runValidators: true}
            );
        });
}

/**
 * Removes and unpublishes a theater
 *
 * @param {string} id the theater ID
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function remove(id) {
    let theater;

    return getById(id)
        .then(c => {
            theater = c;

            unpublishTheater(theater);
        })
        .then(() => Theater.findByIdAndRemove(id))
        .then(() => theater);
}
