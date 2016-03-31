import slugify from 'slug';
import Show from '../models/show';
import {getById as getCategoryById} from './show-categories';

/**
 * Returns all shows available (including unpublished ones)
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getAll() {
    return Show.find()
        .then(shows => shows.map(show => {
            try {

                return show;
            } catch (e) {
                return null;
            }
        }).filter(show => show !== null));
}

/**
 * Returns the requested Show, if it exists
 * @param {string} id the Show ID
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getById(id) {
    return Show.findById(id)
        .then(show => {
            if (!show) {
                throw new Error(`There is no Show with the id ${id}`);
            }

            return show;
        });
}

/**
 * Returns the requested Show, if it exists
 * @param {string} category the Show category
 * @param {string} slug     the Show slug
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getByCategoryAndSlug(category, slug) {
    return Show.findOne({
        category,
        slug
    }).then(show => {
        if (!show) {
            throw new Error(`There is no Show with category ${category} and slug ${slug}`);
        }

        return show;
    });
}

/**
 * Publishes the Show with the given ID, if it exists
 *
 * @param {string} slug the Show ID
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function publish(category, slug) {
    return getByCategoryAndSlug(category, slug)
        .then(show => {
            show.published = true;
            show.publishedAt = new Date();

            return show.save();
        });
}

/**
 * Unpublishes the Show with the given ID, if it exists
 *
 * @param {string} slug the Show ID
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function unpublish(category, slug) {
    return getByCategoryAndSlug(category, slug)
        .then(show => {
            show.published = false;
            show.publishedAt = null;

            return show.save();
        });
}

/**
 * Saves a Show in DB
 *
 * @param {Object} Show Show data
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function save(show) {
    // Creating new Show
    if (!show.id) {
        return getCategoryById(show.category)
            .then(category => {
                show.slug = slugify(show.name.toLowerCase());
                show.url = `${category.path}/${show.slug}`;

                return Show.create(show)
                    .then(newShow => newShow);
            });
    }

    // Updating a Show
    return getById(show.id)
        .then(oldShow => {
            // If the user has somehow changed the published flag, we have to ignore it
            // The publish/unpublish method should be the way to handle this
            show.published = oldShow.published;
            oldShow.merge(show);

            return oldShow.save()
                .then(updatedShow => updatedShow);
        });
}

/**
 * Removes a Show
 *
 * @param {string} category the Show category
 * @param {string} slug     the Show slug
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function remove(category, slug) {
    return getByCategoryAndSlug(category, slug)
        .then(show => show.remove())
        .then(show => show);
}
