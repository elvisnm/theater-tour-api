const regions = [
    {
        br: [
            {code: 'ac', name: 'Acre'},
            {code: 'al', name: 'Alagoas'},
            {code: 'ap', name: 'Amapá'},
            {code: 'am', name: 'Amazonas'},
            {code: 'ba', name: 'Bahia'},
            {code: 'ce', name: 'Ceará'},
            {code: 'df', name: 'Distrito Federal'},
            {code: 'es', name: 'Espírito Santo'},
            {code: 'go', name: 'Goiás'},
            {code: 'ma', name: 'Maranhão'},
            {code: 'mt', name: 'Mato Grosso'},
            {code: 'ms', name: 'Mato Grosso do Sul'},
            {code: 'mg', name: 'Minas Gerais'},
            {code: 'pa', name: 'Pará'},
            {code: 'pb', name: 'Paraíba'},
            {code: 'pr', name: 'Paraná'},
            {code: 'pe', name: 'Pernanbuco'},
            {code: 'pi', name: 'Piauí'},
            {code: 'rj', name: 'Rio de Janeiro'},
            {code: 'rn', name: 'Rio Grande do Norte'},
            {code: 'rs', name: 'Rio Grande do Sul'},
            {code: 'ro', name: 'Rondônia'},
            {code: 'rr', name: 'Roraima'},
            {code: 'sc', name: 'Santa Catarina'},
            {code: 'sp', name: 'São Paulo'},
            {code: 'se', name: 'Sergipe'},
            {code: 'to', name: 'Tocantins'}
        ]
    }
];

/**
 * Returns all regions available
 *
 * @returns {Promise} a promise that resolves or rejects when the query is finished
 */
export function getAll() {
    return new Promise(resolve => {
        process.nextTick(() => {
            resolve(regions);
        });
    });
}
