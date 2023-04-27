const StudentList = require('./student-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.studentList = new StudentList();

    this.socketEvents();
  }

  socketEvents() {
    //ESCUCHAR LOS CLIENTES QUE SE CONECTAN
    this.io.on('connection', (socket) => {
      // SE MUESTRA UN CONSOLE.LOG QUE DICE CLIENTE CONECTADO
      console.log('Cliente conectado');
      // EMITE POR EL CURRENT-STUDENTS LOS ESTUDIANTES DEL ARREGLO
      socket.emit('current-students', this.studentList.getStudents());

      socket.on('vote-student', (id)=>{
        this.studentList.increaseVotes(id),
        this.io.emit('current-students', this.studentList.getStudents());
      })
      socket.on('delete-student', (id)=>{
        this.studentList.removeStudent(id),
        this.io.emit('current-students', this.studentList.getStudents());
      })

      socket.on('update-student', ({id, name})=>{
        this.studentList.changeStudentName(id, name)
        this.io.emit('current-students', this.studentList.getStudents());
      })

      socket.on('created-student', ()=>{
        this.studentList.addStudent()
        this.io.emit('current-students', this.studentList.getStudents());
      })
    });
  }
}

module.exports = Sockets;
