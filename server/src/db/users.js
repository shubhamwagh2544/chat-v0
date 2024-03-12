const users = []

function addUser({ id, name, room }) {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const existingUser = users.find((user) => user.id === id && user.name === name)
    if (existingUser) {
        return {
            error: 'user already exists!!!'
        }
    }

    const user = { id, name, room }
    users.push(user)

    return {
        user
    }
}

function removeUser(id) {
    const index = users.findIndex((user) => user.id === id)
    if (index != 1) {
        return users.splice(index, 1)[0]
    }
    else {
        return {
            error: 'user do not exist'
        }
    }
}

function getUser(id) {
    return users.find((user) => user.id === id)
}

function getUsersInRoom(room) {
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}