let itemsData = []
let cart = []

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
    toastr["info"]("Signed out successfully!")
}

window.onload = () => {
    _("load").classList.add("shrink")
    axios.get("./assets/cart.json")
        .then(res => {
            itemsData = res.data
            makeItems("all")
        })
}

let remItems = (id) => {
    const parent = _(id)
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let makeItems = (type) => {
    remItems("itemcont")
    if (type === "all") {
        itemsData.forEach(element => {
            let item = document.createElement("div")
            item.classList.add("item")
            let top = document.createElement("div")
            top.classList.add("top")
            let img = document.createElement("img")
            img.src = element.img
            top.appendChild(img)
            item.appendChild(top)
            let bottom = document.createElement("div")
            bottom.classList.add("bottom")
            let h1 = document.createElement("h1")
            h1.textContent = element.name
            let p = document.createElement("p")
            p.textContent = `Rs.${element.price}`
            let num = document.createElement("input")
            num.setAttribute("type", "number");
            num.setAttribute("id", `quantity${element.id}`);
            num.setAttribute("min", "1");
            num.setAttribute("max", "99");
            num.setAttribute("value", "1");
            let button = document.createElement("button")
            button.textContent = "Add to cart"
            button.setAttribute("onclick", `addToCart(${element.id})`);
            bottom.append(h1, p, num, button)
            item.appendChild(bottom)
            _("itemcont").appendChild(item)
        });
    } else {
        itemsData.filter((item) => {
            return item.type === type
        }).forEach(element => {
            let item = document.createElement("div")
            item.classList.add("item")
            let top = document.createElement("div")
            top.classList.add("top")
            let img = document.createElement("img")
            img.src = element.img
            top.appendChild(img)
            item.appendChild(top)
            let bottom = document.createElement("div")
            bottom.classList.add("bottom")
            let h1 = document.createElement("h1")
            h1.textContent = element.name
            let p = document.createElement("p")
            p.textContent = `Rs.${element.price}`
            let num = document.createElement("input")
            num.setAttribute("id", `quantity${element.id}`);
            num.setAttribute("type", "number");
            num.setAttribute("min", "1");
            num.setAttribute("max", "99");
            num.setAttribute("value", "1");
            let button = document.createElement("button")
            button.textContent = "Add to cart"
            button.setAttribute("onclick", `addToCart(${element.id})`);
            bottom.append(h1, p, num, button)
            item.appendChild(bottom)
            _("itemcont").appendChild(item)
        });
    }
}

let searchItems = () => {
    remItems("itemcont")
    itemsData.filter((item) => {
        return item.name.includes(_("search").value.toLowerCase())
    }).forEach(element => {
        let item = document.createElement("div")
        item.classList.add("item")
        let top = document.createElement("div")
        top.classList.add("top")
        let img = document.createElement("img")
        img.src = element.img
        top.appendChild(img)
        item.appendChild(top)
        let bottom = document.createElement("div")
        bottom.classList.add("bottom")
        let h1 = document.createElement("h1")
        h1.textContent = element.name
        let p = document.createElement("p")
        p.textContent = `Rs.${element.price}`
        let num = document.createElement("input")
        num.setAttribute("id", `quantity${element.id}`);
        num.setAttribute("type", "number");
        num.setAttribute("min", "1");
        num.setAttribute("max", "99");
        num.setAttribute("value", "1");
        let button = document.createElement("button")
        button.textContent = "Add to cart"
        button.setAttribute("onclick", `addToCart(${element.id})`);
        bottom.append(h1, p, num, button)
        item.appendChild(bottom)
        _("itemcont").appendChild(item)
    });
}

let closeCart = () => {
    _("cart-cont").classList.add("shrink")
}

let openCart = () => {
    _("cart-cont").classList.remove("shrink")
}

let addToCart = (id) => {
    let itemId = itemsData.findIndex((i) => i.id === id)
    let obj = {
        img: itemsData[itemId].img,
        name: itemsData[itemId].name,
        price: itemsData[itemId].price,
        quantity: _(`quantity${itemId+1}`).value
    }
    cart.push(obj)
    addToCheckout()
    updateTotal()
    toastr["info"](`${itemsData[itemId].name} added to cart!`)
}

let addToCheckout = () => {
    remItems("cartItemsList")
    cart.forEach((element) => {
        let selItem = document.createElement("div")
        selItem.classList.add("selItem")
        let img = document.createElement("img")
        img.src = element.img
        let name = document.createElement("p")
        name.textContent = element.name
        let price = document.createElement("p")
        price.textContent = `Rs.${element.price}`
        let quantity = document.createElement("p")
        quantity.textContent = element.quantity
        selItem.append(img, name, price, quantity)
        _("cartItemsList").appendChild(selItem)
    })
}

let updateTotal = () => {
    let total = 0
    cart.forEach((item) => {
        total += item.quantity * item.price
    })
    _("totalCost").textContent = `Rs.${total}`
}