$(document).ready(function () {
    fillAllUsersTable();
});

$(document).on('click', '#eBtn', function () {
    $('.editUserModal #editModalID').modal('show')
    fetch("/api" + $(this).attr('value'))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $("#editID").val(data.id);
            $("#editFirstName").val(data.firstName);
            $("#editLastName").val(data.lastName);
            $("#editAge").val(data.age);
            $("#editEmail").val(data.email);
            $("#editPassword").val(data.password);
        });
});

$(document).on('click', '#dBtn', function () {
    $('.deleteUserModal #deleteModalID').modal('show')
    fetch("/api" + $(this).attr('value'))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            $("#deleteId").val(data.id);
            $("#deleteFirstName").val(data.firstName);
            $("#deleteLastName").val(data.lastName);
            $("#deleteAge").val(data.age);
            $("#deleteEmail").val(data.email);
        });
});

$(document).on('click', '#addUserButton', function () {
    let userRoles = []
    console.log($('#newRole').val())
    for(let i = 0; i < $('#newRole').val().length; i++){
        userRoles.push({role:$('#newRole').val()[i]})
    }
    let user = {
        name: $('#addFirstName').val(),
        surname: $('#addLastName').val(),
        age: $('#addAge').val(),
        mail: $('#addEmail').val(),
        password: $('#addPassword').val(),
        roles: userRoles
    }
    fetch('/api', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(fillAllUsersTable).then($('#usersNav').tab('show'));
});

$(document).on('click', '#editModalButton', function () {
    let userRoles = []
    for(let i = 0; i < $('#editRoles').val().length; i++){
        userRoles.push({role:$('#editRoles').val()[i]})
    }
    let user = {
        id: $('#editID').val(),
        firstName: $('#editFirstName').val(),
        lastName: $('#editLastName').val(),
        age: $('#editAge').val(),
        mail: $('#editEmail').val(),
        password: $('#editPassword').val(),
        roles: userRoles
    }
    fetch('/api', {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(fillAllUsersTable);
});

$(document).on('click', '#deleteModalButton', function () {
    fetch('/api/' + $("#deleteId").val(), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(fillAllUsersTable).then($('.deleteUserModal #deleteModalID').modal('hide'));
});

function fillAllUsersTable() {
    let allUsersTable = $("#allUsersTable")
    allUsersTable.children().remove();
    fetch("/api")
        .then((response) => {
            response.json().then(data => data.forEach(function (user) {
                let TableRow = createTableRow(user);
                allUsersTable.append(TableRow);

            }));
        }).catch(error => {
        console.log(error);
    });
}

function createTableRow(u) {
    let userRole = "";
    for (let i = 0; i < u.roles.length; i++) {
        userRole += u.roles[i].role?.substring(5) + " ";
    }
    return `<tr id="user_table_row">
            <td>${u.id}</td>
            <td>${u.firstName}</td>
            <td>${u.lastName}</td>
            <td>${u.age}</td>
            <td>${u.mail}</td>
            <td>${userRole}</td>
            <td>
            <button type="button" id="eBtn" value="${u.id}" class="btn btn-info text-white">Edit</button>
            </td>
            <td>
            <button type="button" id="dBtn" value="${u.id}" class="btn btn-danger">Delete</button>
            </td>
        </tr>`;
}