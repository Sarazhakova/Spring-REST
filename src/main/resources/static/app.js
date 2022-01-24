let arrUsers = []

const userFetch = {
    head: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer': null
    },
    findAllUsers: async () => await fetch('api/admin'),
    // findOneUser: async (id) => await fetch(`api/admin/${id}`),
    addNewUser: async (user) => await fetch('api/admin', {method: 'POST', headers: userFetch.head, body: JSON.stringify(user)}),
    updateUser: async (user, id) => await fetch(`api/admin/${id}`, {method: 'PUT', headers: userFetch.head, body: JSON.stringify(user)}),
    deleteUser: async (id) => await fetch(`api/admin/${id}`, {method: 'DELETE', headers: userFetch.head})
}

getAllUsers()

function getAllUsers() {
    userFetch.findAllUsers().then(res => {
        console.log(res.statusText + res.status)
        if (res.ok) {
            res.json().then(users => {
                users.forEach(user => {
                    console.log(user)
                    addUser(user).then(r => r.json)
                    arrUsers.push(user)
                })
            })
            console.log(arrUsers)
        } else {
            console.error(res.statusText + res.status)
        }
    })
}

async function addUser() {
    $('#tableAllUsers').click(async () => {
        let addUserForm = $('#addNewUser')
        let firstName = addUserForm.find('#newFirstName').val().trim()
        let lastName = addUserForm.find('#newLastName').val().trim()
        let age = addUserForm.find('#newAge').val().trim()
        let email = addUserForm.find('#newEmail').val().trim()
        let data = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email
        }
        const response = await userFetch.addNewUser(data)
        if (response.ok) {
            getAllUsers();
            addUserForm.find('#newFirstName').val('')
            addUserForm.find('#newLastName').val('')
            addUserForm.find('#newAge').val('')
            addUserForm.find('#newEmail').val('')
        } else {
            let body = await response.json()
            let alert = `<div class="alert alert-danger alert-dismissible fade show col-12" role="alert" id="messageError">
                            ${body.info}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>`;
            addUserForm.prepend(alert)
        }
    })
}

async function editUser(id) {
    userFetch.updateUser(id).then(res => {
        res.json().then(user => {
            $('#editID').val(user.id)
            $('#editFirstName').val(user.firstName)
            $('#editLastName').val(user.lastName)
            $('#editAge').val(user.age)
            $('#editEmail').val(user.email)
            $('#editRole').val(user.roles)
            console.log(user)
        })
    })
}

function editButton() {
    let editUser = {
        id: document.getElementById('editID').value,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        age: document.getElementById('editAge').value,
        email: document.getElementById('editEmail').value,
        role: roleList()
    }
    console.log(editUser)

    let roleList = () => {
        let array = []
        let options = document.querySelector('#editRole').options
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                let role = {
                    id: options[i].value,
                    name: options[i].text
                }
                array.push(role)
            }
        }
        return array
    }

    let userEditId = ($('editID').val())
    console.log(userEditId)
    userFetch.updateUser(id).then(res => {
        res.json().then(userEdit => {
            console.log(userEdit)
            $('#tableAllUsers').empty()
            arrUsers.forEach(user => {
                addUser(user)
            })
        })
        $('#editModal').modal('hide')
    })
}

function deleteUserById(id) {
    userFetch.deleteUser(id).then(res => {
        res.json().then(user => {
            $('#deleteID').val(user.id)
            $('#deleteFirstName').val(user.firstName)
            $('#deleteLastName').val(user.lastName)
            $('#deleteAge').val(user.age)
            $('#deleteEmail').val(user.email)
            $('#deleteRole').val(user.roles)
        })
    })
}

function deleteButton() {
    let userId = ($('#deleteId').val())
    console.log(userId)
    userFetch.deleteUser(id).then(res => {
        $('#tableAllUsers').empty()
        arrUsers = arrUsers.filter(user => user.id !== Number(userId))
        console.log(arrUsers)
        arrUsers.forEach(user => {
            addUser(user)
        })
        $('deleteModal').modal('hide')
    })
}