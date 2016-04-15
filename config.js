'use strict';

// database connection configuration
let connectionString = process.env.DATABASE_URL || 'postgres://postgres:@localhost:5432/products';

module.exports = connectionString;