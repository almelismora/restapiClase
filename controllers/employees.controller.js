const pool = require('../db')


const getEmployees = async (req, res, next) => {
 

    const [rows] = await pool.query('SELECT * FROM employee;')

    res.json(rows);
}

const getEmployee = ( req, res ) => {
  res.send('Obteniendo empleador')
}

const createEmployee = async (req, res, next) => {
  const { name, salary } = req.body

    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
    //console.log(name, salary)
    res.send({ 
      id: rows.insertId,
      name, 
      salary
     });
}

const updateEmployee = (req, res, next) => {
  res.send('Actualizando empleados');
}

const deleteEmployee =  (req, res, next) => {
  res.send('Eliminando empleados');
}

module.exports = { 
    getEmployees,
    createEmployee, 
    updateEmployee,
    deleteEmployee,
    getEmployee  
  }
