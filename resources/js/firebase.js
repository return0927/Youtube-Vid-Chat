var config = {
    apiKey: "AIzaSyAW4y8WUu8f82T-GHVeRq4q6HAUejS6OYQ",
    authDomain: "r3turndev.firebaseapp.com",
    databaseURL: "https://r3turndev.firebaseio.com",
    projectId: "r3turndev",
    storageBucket: "r3turndev.appspot.com",
    messagingSenderId: "833054179795"
};
firebase.initializeApp(config);

var auth, authProvider, database, authenUser, UserName;
auth = firebase.auth();
authProvider = new firebase.auth.GoogleAuthProvider();
refreshAuthButton();

function GoogleApiLogin() {
    if (auth.currentUser === null) {
        auth.signInWithPopup(authProvider).then(
            function (user) {
                if (user) {
                    console.log("success");
                    console.log(user);
                    authenUser = auth.currentUser.uid;
                    UserName = user.user.displayName;

                    database = firebase.database();

                    refreshAuthButton();
                } else {
                    console.log("failed");
                    alert("로그인에 실패하였습니다.");
                }
            }, function (error) {
                console.log(error);
            });
    } else {
        console.log("already");
        // TODO: Refresh firebase connection
    }
    refreshAuthButton();
}

function Logout() {
    auth.signOut().then(function () {
        alert("로그아웃되었습니다.");
        refreshAuthButton();
    }, function (error) {
        alert("오류가 발생하였습니다.");
        refreshAuthButton();
        console.log(error);
    });
}

function refreshAuthButton() {
    if (auth.currentUser) {
        $(".login").removeAttr("style").hide();
        $(".logout").removeAttr("style").show();
    } else {
        $(".login").removeAttr("style").show();
        $(".logout").removeAttr("style").hide();
    }
    if (UserName) {
        $(".username").html(UserName);
    } else {
        if (auth.currentUser && auth.currentUser.displayName) {
            UserName = auth.currentUser.displayName;
            $(".username").html(UserName);
        }
    }
}

function getChatting(vid) {
    var dbRef = firebase.database().ref(vid);
    dbRef.on("child_added", function (data) {
        data.val();
    })
}

function loadData(vid) {
    var dbRef = firebase.database().ref(vid), ret;
    dbRef.on("value", function(data){
        ret = data;
    });
    return ret;
}