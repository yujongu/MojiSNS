var getRoomName = (user1, user2) => {
    if(user1.localeCompare(user2) === 1) {
        return `${user2}_to_${user1}`
    } else if (user1.localeCompare(user2) === -1) {
        return `${user1}_to_${user2}`
    } else {
        return `${user1}_and_${user2}`
    }
}
export default getRoomName;