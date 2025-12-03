// src/models/Usuario.js

import { DataTypes } from 'sequelize';
// ⚠️ AJUSTE ESTE CAMINHO: É o caminho do models/usuario.js até o seu config/db.js
import sequelize from '../config/db.js'; 

const usuario = sequelize.define('usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: { // Este campo guardará a senha CRIPTOGRAFADA
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  }
}, {
  tableName: 'usuarios', // É o nome da sua tabela no banco de dados
  timestamps: true,
});

export default usuario;