
const Async = {
    recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
    alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
    getLeaderboard: (type, callback) => {
        fetch(type)
            .then(response => {
                return response.json()
            })
            .then(data => callback(data))
    }
}

export default Async;