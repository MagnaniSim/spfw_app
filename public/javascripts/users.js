
const logger = require("../../util/logger");

function deleteUser(userId) {
    $.ajax({
        url: '/user/' + userId + '/delete-json',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({userId: userId}),
        type: 'POST',
        success: ((res) => {
            // Replace follow button with unfollow.
            console.log("Result: ", res)
            $("#"+userId).remove();
        }),
        error: ((error) => {
            console.log("Error:", error);
        })
    });
}