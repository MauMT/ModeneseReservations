

const OrdenModel = (sequelize, DataTypes) => {
    const Orden = sequelize.define(
      'orden',
      {
        fecha: {
            type: DataTypes.DATE,
        },
        estado:{
            type: DataTypes.ENUM('En preparación', 'en camino', 'lista', 'cerrada', 'cancelada'),
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
        },
        nombre: {
            type: DataTypes.STRING(200),
        },
        telefono: {
            type: DataTypes.STRING(200),
        },

      },
      {
        timestamps: true,
        modelName: 'Orden',
      }
    );

    return Orden;
};
    
module.exports = OrdenModel;