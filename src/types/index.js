/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {number} price
 * @property {number} stock
 * @property {string} unit
 * @property {string} [image]
 * @property {string} [branch]
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} customerName
 * @property {number} items
 * @property {number} total
 * @property {'pending'|'completed'|'cancelled'} status
 * @property {string} date
 * @property {string} [branch]
 * @property {string} [payment]
 */

/**
 * @typedef {Object} Customer
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {number} totalOrders
 * @property {number} totalSpent
 * @property {string} joinDate
 * @property {'active'|'inactive'} status
 * @property {string} [branch]
 * @property {'new'|'returning'|'high-value'} [customerType]
 * @property {string} [lastOrderDate]
 */

/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {'alert'|'success'|'info'|'warning'} type
 * @property {string} title
 * @property {string} message
 * @property {string} time
 * @property {boolean} isRead
 */

/**
 * @typedef {Object} DeliveryBoy
 * @property {string} id
 * @property {string} name
 * @property {string} area
 * @property {number} orders
 * @property {number} rating
 * @property {'active'|'inactive'} status
 * @property {string} [avatar]
 * @property {string} [email]
 * @property {string} [phone]
 * @property {string} [branch]
 * @property {string} [joinedDate]
 * @property {number} [completedOrders]
 * @property {string} [avgDeliveryTime]
 * @property {number} [currentOrders]
 * @property {number} [weekOrders]
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {'active'|'inactive'} status
 * @property {string} joinDate
 */

/**
 * @typedef {Object} Branch
 * @property {string} id
 * @property {string} name
 * @property {string} location
 * @property {string} manager
 * @property {number} orders
 * @property {number} revenue
 * @property {'active'|'inactive'} status
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [pincode]
 * @property {string} [address]
 * @property {string} [contactNumber]
 * @property {string} [adminEmail]
 * @property {string} [openingHours]
 * @property {number} [seatingCapacity]
 */

// This file provides JSDoc typedefs for editor/typehint purposes.
export {};