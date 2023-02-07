const pool = require('../db')


const getEmployees = async (req, res, next) => {
 

    const [rows] = await pool.query('SELECT * FROM employee;')

    res.json(rows);
}

const getEmployee = async ( req, res ) => {

  const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

  if ( rows.length <= 0 ){
    return res.status(404).json({
      msg: 'Empleador no encontrado'
    })
  }

  res.json(rows[0])
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

const deleteEmployee = async (req, res, next) => {
  const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
  
  if ( result.affectedRows <= 0 ){
    return res.status(404).json({
      msg: 'Empleador no encontrado'
    })
  }

  res.sendStatus(204)
}

module.exports = { 
    getEmployees,
    createEmployee, 
    updateEmployee,
    deleteEmployee,
    getEmployee  
  }
