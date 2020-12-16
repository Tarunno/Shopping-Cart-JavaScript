class Headphone {
	constructor(id, category, name, brandnew, title, price, specs, colors, image) {
		this.id = id
		this.category = category
		this.name = name
		this.brandnew = brandnew
		this.title = title
		this.price = price
		this.specs = specs
		this.colors = colors
		this.image = image

		this.constructor.headphones.push({
			id: this.id,
			category: this.category,
			name: this.name,
			brandnew: this.brandnew,
			title: this.title,
			price: this.price,
			specs: this.specs,
			colors: this.colors,
			image: this.image
		})
	}
	static headphones = []
}
class Cart extends Headphone{
	constructor(id, category, name, brandnew, title, price, specs, colors, image, quentity){
		super(id, category, name, brandnew, title, price, specs, colors, image)
		this.quentity = quentity
		try{
			this.constructor.cartList = JSON.parse(this.getCookie())
		}
		catch(err){
			console.log(err)
		}
		this.constructor.makeCookie()
	}
	static cartList = []
	static makeCookie(){
		document.cookie = "Cart=" + JSON.stringify(Cart.cartList) +"; max-age=" + 30*24*60*60
		var cookieList = []
		var cookies = document.cookie.split(";")
		cookies.forEach((item, i) => {
			if(item.split("=")[0].trim() == 'Cart'){
				cookieList = item.split("=")[1]
			}
		})
		Cart.cartList = JSON.parse(cookieList)
	}
	getCookie(){
		var cookieList = []
		var cookies = document.cookie.split(";")
		cookies.forEach((item, i) => {
			if(item.split("=")[0].trim() == 'Cart'){
				cookieList = item.split("=")[1]
			}
		})
		return cookieList
	}
	add(id){
		Headphone.headphones.forEach((item) => {
			if(item.id == id){
				if(Cart.cartList.length == 0){
					Cart.cartList.push({...item, quentity: 1})
				} else {
					var flag = false
					Cart.cartList.forEach((cart, i) => {
						if(cart.id == id){
							var activeItem = {...cart, quentity: cart.quentity + 1}
							Cart.cartList[i] = activeItem
							flag = true
						}
					})
					if(!flag){
						Cart.cartList.push({...item, quentity: 1})
					}
				}
			}
		})
		Cart.makeCookie()
	}
	remove(id){
		Cart.cartList.forEach((cart, i) => {
			if(cart.id == id){
				var activeItem = {...cart, quentity: Math.max(0, cart.quentity - 1)}
				Cart.cartList[i] = activeItem
			}
		})
		Cart.makeCookie()
	}
	delete(id){
		var carryList = []
		Cart.cartList.forEach((cart, i) => {
			if(cart.id != id){
				carryList.push(cart)
			}
		})
		Cart.cartList = carryList
		Cart.makeCookie()
	}
	clear(){
		Cart.cartList = []
		Cart.makeCookie()
	}
}
const headphone1 = new Headphone(
	1, 'ALWAYS-READY WIRELESS EARPHONES', 'Beats Flex', "inline", 'WIRELESS EARPHONES MADE FOR THE WAY YOU LIVE', 50.99,
	[
		'Magnetic earbuds with Auto-Play/Pause',
		'Powerful, precise sound',
		'Up to 12 hours of listening time',
		'Apple W1 Chip & Class 1 Wireless Bluetooth®'
	],
	['#111', 'lightblue', 'lightpink', 'lightgreen'],
	'https://www.beatsbydre.com/content/dam/beats/web/product/earphones/beats-flex/plp/bbd.plpassset.earphones.beatsflex.jpg.large.1x.jpg'
)

const headphone2 = new Headphone(
	2, 'HIGH‑PERFORMANCE WIRELESS EARPHONES', 'Powerbeats', 'none', 'LIGHTWEIGHT WIRELESS EARPHONES FOR ALL‑DAY ACTIVITY', 79.99,
	[
		'Magnetic earbuds with Auto-Play/Pause',
		'Powerful, precise sound',
		'Up to 12 hours of listening time',
		'Apple W1 Chip & Class 1 Wireless Bluetooth®'
	],
	['#111', 'pink', '#f4f4f4', 'lightgreen'],
	'https://www.beatsbydre.com/content/dam/beats/web/product/earphones/powerbeats/plp/bbd.plpassset.earphones.powerbeats.jpg.large.1x.jpg'
)

const headphone3 = new Headphone(
	3, 'HIGH‑PERFORMANCE WIRELESS EARPHONES', 'Powerbeats Pro', 'none', 'WIRELESS EARPHONES MADE FOR THE WAY YOU LIVE', 100.55,
	[
		'Magnetic earbuds with Auto-Play/Pause',
		'Powerful, precise sound',
		'Up to 12 hours of listening time',
		'Apple W1 Chip & Class 1 Wireless Bluetooth®'
	],
	['#111', 'lightgray', 'Crimson', 'lightgreen'],
	'https://www.beatsbydre.com/content/dam/beats/web/product/earphones/powerbeats-pro/plp/bbd.plpassset.earphones.powerbeatspro.jpg.large.1x.jpg'
)

const headphone4 = new Headphone(
	4, 'EVERYDAY WIRELESS ON‑EAR HEADPHONES', 'Solo Pro', 'none', 'NOISE CANCELLING WIRELESS HEADPHONES TO STAY INSPIRED', 279.99,
	[
		'Magnetic earbuds with Auto-Play/Pause',
		'Powerful, precise sound',
		'Up to 12 hours of listening time',
		'Apple W1 Chip & Class 1 Wireless Bluetooth®'
	],
	['lightgray', 'lightpink', 'crimson', '#e1ff6b'],
	'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo-pro/plp/bbd.plpassset.headphones.solopro.jpg.large.1x.jpg'
)

const headphone5 = new Headphone(
	5, 'EVERYDAY WIRELESS ON‑EAR HEADPHONES', 'Beats Solo3 Wireless', 'none', 'CLASSIC ALL‑DAY HEADPHONES', 159.99,
	[
		'Magnetic earbuds with Auto-Play/Pause',
		'Powerful, precise sound',
		'Up to 12 hours of listening time',
		'Apple W1 Chip & Class 1 Wireless Bluetooth®'
	],
	['#d472ed', 'lightpink', '#333', '#e1ff6b'],
	'https://www.beatsbydre.com/content/dam/beats/web/product/headphones/solo3-wireless/plp/bbd.plpassset.headphones.solo3wireless.jpg.large.1x.jpg'
)

const cart = new Cart()

countCart()
pushToSite()
cartWindow()

function countCart(){
	const cartNumber = document.querySelector('.cart-number')
	cartNumber.innerHTML = Cart.cartList.length
	console.log(Cart.cartList)
}

function addToCart(id){
	cart.add(id)
	const cartNumber = document.querySelector('.cart-number')
	cartNumber.innerHTML = Cart.cartList.length
	console.log(Cart.cartList)
	cartWindow()
}

function removeFromCart(id){
	cart.remove(id)
	const cartNumber = document.querySelector('.cart-number')
	cartNumber.innerHTML = Cart.cartList.length
	console.log(Cart.cartList)
	cartWindow()
}
function deleteFromCart(id){
	cart.delete(id)
	const cartNumber = document.querySelector('.cart-number')
	cartNumber.innerHTML = Cart.cartList.length
	console.log(Cart.cartList)
	cartWindow()
}
function clearCart(){
	cart.clear()
	const cartNumber = document.querySelector('.cart-number')
	cartNumber.innerHTML = Cart.cartList.length
	console.log(Cart.cartList)
	cartWindow()
}

function pushToSite() {
	var productSection = document.querySelectorAll('.product-section')
	Headphone.headphones.forEach((headphone, index) => {
		productSection.forEach((section) => {
			if (headphone.category === section.dataset.category) {
				section.innerHTML += `
				<div class="product-container">
					<div class="product-description">
						<h3 class="product-name"> <span class="new" style="display: ${headphone.brandnew};"> New - </span>Beats Flex</h3>
						<h1 class="title">${headphone.title}</h1>
						<div class="product-colors"></div>
						<ul class="product-spec"></ul>
						<h3 class="product-price">$${headphone.price}</h3>
						<div class="cart-btn-container" onclick="addToCart(${headphone.id})">
							<div class="cart-btn">
								<div class="cart-btn-inner">
								</div>
							</div>
							<h1 class="cart-btn-text"> ADD TO CART</h1>
						</div>
					</div>
					<div class="product-image">
						<img src="${headphone.image}">
					</div>
				</div>`
				var productColor = document.querySelectorAll('.product-colors')
				headphone.colors.forEach((item) => {
					productColor[index].innerHTML += `<div class="color" style="background: ${item};"></div>`
				})
				var productSpec = document.querySelectorAll('.product-spec')
				headphone.specs.forEach((item) => {
					productSpec[index].innerHTML += `<li>${item}</li>`
				});
			}
		})
	})
}

function cartWindow(live){
	const cartProductContainer = document.querySelector(".cart-product-container")
	cartProductContainer.innerHTML = null
	Cart.cartList.forEach((item) => {
		cartProductContainer.innerHTML +=
		`<div class="cart-product">
			<div class="cart-product-section">
				<img src="${item.image}">
				<div class="cart-product-description">
					<h3 class="cart-product-namae">${item.name}</h3>
					<h5 class="cart-product-price">$${item.price}</h5>
					<h5 class="remove-cart-product" onclick="deleteFromCart(${item.id})">Remove</h5>
				</div>
			</div>
			<div class="cart-product-quentity">
				<div class="cart-up" onclick="addToCart(${item.id})"></div>
				<div class="cart-quentity"><h3>${item.quentity}</h3></div>
				<div class="cart-down" onclick="removeFromCart(${item.id})"></div>
			</div>
		</div>`
	})
}
