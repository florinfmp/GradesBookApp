// variables
const database = [];
const inputName = document.getElementById("inputName");
const addStudent = document.getElementById("addStudent");
let formValidity = true;
let globalIdStudent = 1;
let positionOfStudentId = -1;
const accordionStudents = document.getElementById("accordionStudents");

// listeners
addStudent.addEventListener("click", studentsList);

accordionStudents.addEventListener("click", (e) => {
  // console.log(e);
  deleteStudent(e);
});

// functions
function studentsList() {
  // validate input
  formValidity = true;
  validateSimpleInput(inputName);
  if (formValidity) {
    // create database
    addStudentToDb();
    // reset input
    resetInputForm(inputName);
    // reset accordion of students
    resetAccordionStudents(accordionStudents);
    // display students
    renderStudentsList(database);
  }
}

function validateSimpleInput(element) {
  let inputText = element.value;
  if (inputText === "") {
    element.classList.add("formInputInvalid");
    formValidity = false;
  } else {
    element.classList.remove("formInputInvalid");
  }
}

function addStudentToDb() {
  let itemInputName = inputName.value;
  let newStudent = {
    id: globalIdStudent,
    name: itemInputName,
    involvment: "active",
    average: 0,
    grades: [],
    project: 0,
    exam: 0,
    finalGrade: 0,
    assesment: "Passed",
  };
  globalIdStudent++;
  database.push(newStudent);
  positionOfStudentId = -1;
}

function resetInputForm(element) {
  element.value = "";
  element.focus();
}

function resetAccordionStudents(element) {
  element.innerHTML = "";
}

function renderStudentsList(students) {
  let output = "";
  students.forEach((student) => {
    output += `
        <!-- Student Nr. 1 -->
        <div class="accordion-item">
            <h2 class="accordion-header" id="heading${student.id}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${student.id}" aria-expanded="true" aria-controls="collapse${student.id}"># ${student.name}</button>
            </h2>
            <div id="collapse${student.id}" class="accordion-collapse collapse showXXX" aria-labelledby="heading${student.id}" data-bs-parent="#accordionStudents">
                <div class="accordion-body">
                    <!-- Student Infos -->
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 g-0">
                                <div class="d-flex justify-content-between align-items-center" style="border: solid 1px red;">
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue">
                                        <p class="m-0 p-0">Involvment</p>
                                        <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                                            <option selected disabled>Choose</option>
                                            <option value="active">Active</option>
                                            <option value="pasive">Pasive</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue; height: 100%;">
                                        <p class="m-0 p-0">Average</p>
                                        <p class="mb-1 p-0" style="border: solid 1px green;">${student.average}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue; height: 100%;">
                                        <p class="m-0 p-0">Project</p>
                                        <p class="mb-1 p-0" style="border: solid 1px green;">${student.project}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue; height: 100%;">
                                        <p class="m-0 p-0">Exam</p>
                                        <p class="mb-1 p-0" style="border: solid 1px green;">${student.exam}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue; height: 100%;">
                                        <p class="m-0 p-0">Final Grade</p>
                                        <p class="mb-1 p-0" style="border: solid 1px green;">${student.finalGrade}</p>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between align-items-center" style="border: solid 1px blue; height: 100%;">
                                        <p class="m-0 p-0">Assesment</p>
                                        <p class="mb-1 p-0" style="border: solid 1px green;">${student.assesment}</p>
                                    </div>
                                    <button id="delStudent-${student.id}" type="button" class="btn-close applyDeleteStudent" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    accordionStudents.innerHTML = output;
  });
}

function deleteStudent(e) {
  if (e.target.classList.contains("applyDeleteStudent")) {
    let id = e.target.getAttribute("id");
    let studentId = id.split("-");
    // student to delete is studentId[1];
    if (database) {
      for (let i = 0; i < database.length; i++) {
        if (database[i].id === parseInt(studentId[1])) {
          database.splice(i, 1);
        }
      }
      // reset accordion of students
      resetAccordionStudents(accordionStudents);
      // display students
      renderStudentsList(database);
    }
  }
}
