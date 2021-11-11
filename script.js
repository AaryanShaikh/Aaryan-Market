function _(id) {
    return document.getElementById(id)
}

let validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let validatePass = (pass) => {
    var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return re.test(String(pass).toLowerCase());
}

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states: {
        "default-state": {
            gradients: [
                ['#B3FFAB', '#12FFF7'],
                ['#ADD100', '#7B920A'],
                ['#1A2980', '#26D0CE']
            ]
        }
    }
});

_("login-form").addEventListener('submit', (event) => {
    event.preventDefault();
    let email = _("lemail").value
    let pass = _("lpass").value
    if (email === "" || pass === "") {
        toastr["warning"]("Please fill in all the fields!")
    } else {
        if (email === localStorage.getItem("email") && pass === localStorage.getItem("pass")) {
            toastr["success"]("login Successfull!")
            _("logreg").classList.add("shrink")
            _("body").classList.remove("shrink")
        } else {
            toastr["error"]("Email or password is invalid!")
        }
    }
});

_("reg-form").addEventListener('submit', (event) => {
    event.preventDefault();
    let name = _("rname").value
    let email = _("remail").value
    let pass = _("rpass").value
    if (email === "" || pass === "" || name === "") {
        toastr["warning"]("Please fill in all the fields!")
    } else {
        if (validateEmail(email)) {
            if (validatePass(pass)) {
                localStorage.setItem("name", name)
                localStorage.setItem("email", email)
                localStorage.setItem("pass", pass)
                toastr["success"]("Registered Successfully!")
                _("logreg").classList.add("shrink")
                _("body").classList.remove("shrink")
            } else {
                toastr["error"]("Password should be 6-16 characters long & should have atleast 1 number & atleast 1 special character!")
            }
        } else {
            toastr["error"]("Email is Invalid!")
        }
    }
})

let signOut = () => {
    _("logreg").classList.remove("shrink")
    _("body").classList.add("shrink")
}

// fetch("https://raw.githubusercontent.com/AaryanShaikh/myportfolio/main/src/res/projects.json")
// .then(res=>res.json())
// .then(data=>{
//   console.log(data.length)
// })
// .catch(err=>{
//   console.log(err)
// })