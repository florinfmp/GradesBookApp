// variables
const database = [];
const inputName = document.getElementById("inputName");
const addStudent = document.getElementById("addStudent");
let formValidity = true;
let globalIdStudent = 1;
let positionOfStudentId = -1;
const accordionStudents = document.getElementById("accordionStudents");
const addBtnContact = document.getElementById('addBtnContact');

const contactDetailsProfile = document.getElementById('contactDetailsProfile');
const studentGradesProfile = document.getElementById('studentGradesProfile');
// let shownStudentId;
// let statusShownStudentId = 'notShow'; // show, notShow
// let counter = 0; // 1-show, 2-notShow
containerContact = document.getElementById('containerContact');
containerGrades = document.getElementById('containerGrades');

// listeners
addStudent.addEventListener("click", studentsList);

accordionStudents.addEventListener("click", (e) => {
  // console.log(e);
  deleteStudent(e);
  showContact(e);
  showGrades(e);
});

addBtnContact.addEventListener('click', (e) => {
  e.preventDefault();
  addInfosForContact(shownStudentId);
})

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
                <button id="btnShowStudent-${student.id}" class="accordion-button applyShowProfile" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${student.id}" aria-expanded="true" aria-controls="collapse${student.id}" style="border: solid 1px red;"># ${student.name}</button>
            </h2>
            <div id="collapse${student.id}" class="accordion-collapse collapse" aria-labelledby="heading${student.id}" data-bs-parent="#accordionStudents">
                <div class="accordion-body">
                    <!-- Student Infos -->
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-12 g-0" style="border:solid 1px red;">
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
                                </div>
                                <div class="d-grid gap-2 d-md-block text-center mt-1 p-0" style="border: solid 1px black;">
                                  <button id="showContactDetails-${student.id}" type="button" class="btn btn-primary btn-sm applyShowContact">Contact</button>
                                  <button id="showStudentGrades-${student.id}" type="button" class="btn btn-primary btn-sm applyShowGrades">Grades</button>
                                  <button id="delStudent-${student.id}" type="button" class="btn btn-secondary btn-sm applyDeleteStudent">Delete</button>
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


function showContact(e) {
  if (e.target.classList.contains("applyShowContact")) {
    let id = e.target.getAttribute("id");
    let studentId = id.split("-");
    // profile to show is studentId[1];
    if (database) {
      for (let i = 0; i < database.length; i++) {
        if (database[i].id === parseInt(studentId[1])) {
          // reset what was before in Contact
          containerContact.innerHTML = '';
          // build Contact profile
          containerContact.innerHTML = `
            <div class="mb-1 d-flex flex-column justify-content-start align-items-start" style="border: solid 1px rgb(46, 124, 9);">
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">Gender</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">Age</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">Birthdate</p>
              <p class="mb-1 height2Row" style="border: solid 1px yellow;">Address</p>
              <p class="mb-1 height2Row" style="border: solid 1px yellow;">Email</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">Mobile</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">Skype</p>
              <p class="mb-0 height3Row" style="border: solid 1px yellow;">Github</p>
            </div>
            <div class="d-flex flex-column justify-content-start align-items-start" style="border: solid 1px rgb(230, 110, 12); width: 370px;">
              <p class="mb-1 height1Row" class="" style="border: solid 1px yellow;">Male</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">32</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">24.09.1991</p>
              <p class="mb-1 height2Row" style="border: solid 1px yellow;">99 Str Console Log, judetul Armoniei, tara belsugului, Europa</p> 
              <p class="mb-1 height2Row text-break" style="border: solid 1px yellow;">gorgeascadaniela@anamariadous@gmail.com</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">0799856236</p>
              <p class="mb-1 height1Row" style="border: solid 1px yellow;">xAlin</p>
              <p class="mb-0 height3Row text-break" style="border: solid 1px yellow;">code;kjhf;kljshf;lgj'lfkji;lkj;kasdjbhfkljaghlhjas'lkjalsfjh;kjhkjaghskyugewljhfeglkhgfaskgfjhsdgfljhgfkjhgaskjhg</p>
            </div>
          `;
          // add attribute to show to Contacts
          studentGradesProfile.classList.add('d-none');
          contactDetailsProfile.classList.remove('d-none');
        }
      }
    }
  }
}

function showGrades(e) {
  if (e.target.classList.contains("applyShowGrades")) {
    let id = e.target.getAttribute("id");
    let studentId = id.split("-");
    // profile to show is studentId[1];
    if (database) {
      for (let i = 0; i < database.length; i++) {
        if (database[i].id === parseInt(studentId[1])) {
          // reset what was before in Contact
          studentGradesProfile.innerHTML = '';
          // build Contact profile
          buildGrades(database[i].grades);
          // add attribute to show to Contacts
          studentGradesProfile.classList.remove('d-none');
          contactDetailsProfile.classList.add('d-none');
        }
      }
    }
  }
}

function buildGrades(grades) {
  let output = "";
  grades.forEach((grade) => {
    output += `
      <div class="d-flex justify-content-between align-items-center mb-3" style="border: solid 1px red;">
        <p class="m-0 p-0" style="border: solid 1px green;">1</p>
        <p class="m-0 p-0 text-center" style="border: solid 1px green; width: 310px;">Adding strings to box</p>
        <p class="m-0 p-0" style="border: solid 1px green;">${grade}</p>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
    `;
    studentGradesProfile.innerHTML = output;
  });
}