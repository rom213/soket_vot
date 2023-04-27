import { useState, useEffect } from "react";

export const StudentList = ({ data, vote, delet, blur }) => {
  const [students, setStudents] = useState(data);

  useEffect(() => {
    setStudents(data);
  }, [data]);

  const changeName = (event, id) => {
    const newName = event.target.value;
    setStudents((students) =>
      students.map((student) => {
        if (student.id === id) {
          student.name = newName;
        }
        return student;
      })

    );
  };




  const createRows = () => {
    return students.map((student) => (
      <tr key={student.id}>
        <td>
          <button className="btn btn-outline-success" onClick={()=>vote(student.id)}> +1 </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={student.name}
            placeholder="ingresa un nombre"
            onChange={(event) => changeName(event, student.id)}
            onBlur={(event)=>blur(event,student.id)}
          />
        </td>
        <td>
          <h3>{student.votes}</h3>
        </td>
        <td>
          <button type="button" className="btn btn-outline-danger" onClick={()=>delet(student.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <h3>Estudiantes Actuales</h3>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
