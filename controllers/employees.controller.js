const pool = require('../db')


const getEmployees = async (req, res, next) => {
  
  try {
    // throw new Error('Mi error')

    const [rows] = await pool.query('SELECT * FROM employee;')
    res.json(rows);
  }
  
  catch (error) {
    return res.status(500).json({
      msg: 'Algo ha ido mal'
    })
  }

}

const getEmployee = async ( req, res ) => {

  try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])

    if ( rows.length <= 0 ){
      return res.status(404).json({
        msg: 'Empleador no encontrado'
      })
    }
  
    res.json(rows[0])
  }

  catch (error) {
    return res.status(500).json({
      msg: 'Algo ha ido mal'
    })
  }
}

const createEmployee = async (req, res, next) => {
  try {
    const { name, salary } = req.body

    const [rows] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [name, salary])
    //console.log(name, salary)
    res.send({ 
      id: rows.insertId,
      name, 
      salary
     });
  }

  catch (error) {
    return res.status(500).json({
      msg: 'Algo ha ido mal'
    })
  }
}

const updateEmployee = async (req, res, next) => {

  try {
    const { id } = req.params
    const { name, salary } = req.body
    //console.log(id, name, salary)
  
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?,name) , salary = IFNULL(?,salary) WHERE id = ?', [name, salary, id])
    
    if ( result.affectedRows === 0 ){
      return res.status(404).json({
        msg: 'Empleador no encontrado'
      })
    }
  
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
  
    res.json(rows[0]);
  }

  catch (error) {
    return res.status(500).json({
      msg: 'Algo ha ido mal'
    })
  }
}

const deleteEmployee = async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id])
  
    if ( result.affectedRows <= 0 ){
      return res.status(404).json({
        msg: 'Empleador no encontrado'
      })
    }
  
    res.sendStatus(204)
  }

  catch (error) {
    return res.status(500).json({
      msg: 'Algo ha ido mal'
    })
  }
}

module.exports = { 
    getEmployees,
    createEmployee, 
    updateEmployee,
    deleteEmployee,
    getEmployee  
  }
