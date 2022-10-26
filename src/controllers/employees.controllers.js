import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    // throw new Error('My Error')
    const [rows] = await pool.query("SElECT * FROM employees"); // Devuelve como respuesta las filas
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployeeId = async (req, res) => {
  // console.log(req.params.id)
  // res.send('Resibiendo empleado')
  try {
    // throw new Error('My Error')
    const [rows] = await pool.query("SELECT * FROM employees WHERE id= ?", [
      req.params.id,
    ]);
    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee, not found",
      });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const postEmployees = async (req, res) => {
  const { name, salary } = req.body;
  try {
    // throw new Error('My Error')
    const [rows] = await pool.query(
      "INSERT INTO employees(name, salary) VALUES (?, ?)",
      [name, salary]
    );
    console.log(req.body);
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const putEmployees = async (req, res) => {
  // const id = req.params.id //Es lo mismo quelo de abajo
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    // throw new Error('My Error')
    const [result] = await pool.query(
      "UPDATE employees SET name = ?, salary = ? WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not Found" });
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
    console.log(result);
    // console.log(id, name, salary)
    // res.json({message: 'Reseived'})
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const patchEmployees = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    // throw new Error('My Error')
    const [result] = await pool.query(
      "UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.status(404), json({ message: "Employee Not Found" });
    const [rows] = await pool.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    // throw new Error('My Error')
    const [result] = await pool.query("DELETE FROM employees WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not Found",
      });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Something goes wrong" });
  }
};
