import $ from 'jquery';

const Async = {
    RECENT: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
    ALL_TIME: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
    getLeaderboard: (type, run) => {
        $.ajax(type, {
            success: data => run(data)
        });
    }
}

export default Async;