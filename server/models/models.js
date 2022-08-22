import sequelize from '../db.js'
import { DataTypes } from 'sequelize'

const Users = sequelize.define('users', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    email: { type: DataTypes.STRING, unique: true }, 
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Carts = sequelize.define('carts', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 }
})

const CartsProducts = sequelize.define('carts_products', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 }
})

const Products = sequelize.define('products', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false }
})

const Types = sequelize.define('types', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Brands = sequelize.define('brands', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const Ratings = sequelize.define('ratings', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

const ProductInfos = sequelize.define('product_infos', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const TypeBrands = sequelize.define('type_brands', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
})

Users.hasOne(Carts)
Carts.belongsTo(Users)

Users.hasMany(Ratings)
Ratings.belongsTo(Users)

Carts.hasMany(CartsProducts)
CartsProducts.belongsTo(Carts)

Products.hasMany(CartsProducts)
CartsProducts.belongsTo(Products)

Types.hasMany(Products)
Products.belongsTo(Types)

Brands.hasMany(Products)
Products.belongsTo(Brands)

Products.hasMany(Ratings)
Ratings.belongsTo(Products)

Products.hasMany(ProductInfos, { as:'info' })
ProductInfos.belongsTo(Products)

Types.belongsToMany(Brands, { through: TypeBrands })
Brands.belongsToMany(Types, { through: TypeBrands })

export {
    Users,
    Carts, 
    CartsProducts,
    Products, 
    ProductInfos,
    Ratings,
    Types,
    Brands,
    TypeBrands
}